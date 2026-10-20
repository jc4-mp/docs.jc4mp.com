---
sidebar_position: 6
---

# Events

Events are how your scripts react to things happening in the game and on the server: a player joining, a key being pressed, a vehicle exploding, a frame being drawn. You register a handler (a Lua function) for an event by name, and every time that event fires your handler is called with the event's arguments. You can also fire your own custom events to let scripts and resources talk to each other on the same side.

The built-in events are listed in [Server events](../server/events.md) and [Client events](../client/events.md). Events that travel between the client and the server are a separate mechanism, see [Net](./net.md).

**Available on:** Server, Client

## How events work {#how-events-work}

- **One handler per event per script file.** Every script file (each `.lua` file of a resource's `client/`, `server/` or `shared/` folder) runs in its own Lua state, and each file can register one handler per event name. Registering the same event twice in the same file fails (`Event.Add` returns `false, "Event already registered in this script"`). Different files, in the same resource or in other resources, can each have their own handler for the same event.
- **Every handler runs.** When an event fires, all handlers registered for it on that side are called, one after the other, in every running resource. Handlers of the same resource run in the order they were added; the order between resources is not defined, so don't rely on it.
- **Arguments.** Each event passes its own arguments (listed on the event pages). Lua ignores extra arguments, so a handler can take only the first ones it needs, or none.
- **Return values are ignored.** Whatever a handler returns is discarded. To stop the action behind an event, call [`Event.Cancel()`](#eventcancel) instead.
- **Errors don't stop the event.** If a handler raises an error, the error is reported as a script error (on the client in the script debugger, on the server it is sent to the joined players' script debuggers) and the remaining handlers still run.
- **Events are global on their side.** Built-in events are delivered to every resource, not only the one they concern. For example `OnResourceStart` fires in every running resource when any resource starts, so compare the name it passes with `Resource.Name` (see [Resources](./resources.md)).
- **Handlers are removed automatically** when their resource stops. You only need [`Event.Remove`](#eventremovename) to stop listening while the resource keeps running.
- **Changing an event while it dispatches.** Inside a handler you can't add or remove a handler of an event that is currently being dispatched (the one running, or any event that fired it): `Event.Add`/`Event.Remove` raise a Lua error in that case. Starting, stopping or restarting a resource from inside a handler is allowed, but it is queued and happens at the next resource update instead of immediately.
- **Nesting limit.** A handler can fire other events (with `Event.Fire` or by calling functions that cause built-in events), but dispatches can't nest deeper than 64 levels. Past that, a Lua error is raised, which protects the game or server from a script that fires events recursively without end.
- **Net events share the registry.** Handlers added with `Net.AddEvent` (see [Net](./net.md)) live in the same list as the ones added with `Event.Add`. That means a script file can't register both an `Event.Add` and a `Net.AddEvent` handler under the same name, `Event.Remove` also removes a handler added with `Net.AddEvent`, and `Event.Fire` also calls `Net.AddEvent` handlers of that name. The opposite isn't true: a message from the other side only reaches handlers added with `Net.AddEvent`, never the ones added with `Event.Add`.

## Functions {#functions}

### Event.Add(name, handler) {#eventaddname-handler}

Registers `handler` to be called every time the event `name` fires on this side. `name` can be a built-in event (see [Server events](../server/events.md) and [Client events](../client/events.md)) or any name of your own for a [custom event](#custom-events). Event names are case sensitive.

The handler belongs to the script file that called `Event.Add` and is removed automatically when its resource stops.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | The event name, e.g. `"OnPlayerJoin"`. |
| handler | `function` | Called with the event's arguments every time it fires. |

**Returns**

| Type | Description |
|---|---|
| `boolean` | `true` if the handler was added, `false` otherwise. |
| `string` or `nil` | The error when it failed (`"Event already registered in this script"`), `nil` on success. |

**Errors:** raises a Lua error if `name` is being dispatched right now (adding a handler to the event you are handling, or to one that fired it).

**Example**

```lua
local ok, err = Event.Add("OnPlayerJoin", function(client)
	print(client:GetName() .. " joined the server")
end)

if not ok then
	print("could not listen to OnPlayerJoin: " .. err)
end
```

### Event.Remove(name) {#eventremovename}

Removes the handler this script file registered for the event `name`. Handlers of other script files and other resources are not touched. It also removes a handler this file added with `Net.AddEvent` under that name, since both share the same registry.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | The event name. |

**Returns**

| Type | Description |
|---|---|
| `boolean` | `true` if a handler was removed. |
| `string` or `nil` | `"Event '<name>' does not exist"` when this script had no handler for it, `nil` on success. |

**Errors:** raises a Lua error if `name` is being dispatched right now. To stop listening from inside the event's own handler, remove it a moment later with a timer.

**Example**

```lua
-- server: greet the players who join during the first minute only

Event.Add("OnPlayerJoin", function(client)
	Chat.Broadcast("Early bird: " .. client:GetName())
end)

Timer.Set(function()
	local ok, err = Event.Remove("OnPlayerJoin")

	if not ok then
		print(err)
	end
end, 60000, 1)
```

### Event.Fire(name, ...) {#eventfirename-}

Fires the event `name` on this side, calling every handler registered for it in every running resource (including the calling script's own handler), right away, before `Event.Fire` returns. Use it for [custom events](#custom-events). It only reaches handlers on the same side and the same machine: to reach the other side use [Net](./net.md).

You can also fire a built-in event name, which calls the scripts' handlers for it as if it had happened, but nothing happens in the game: firing `"OnPlayerJoin"` doesn't make anyone join.

Every handler receives its own copy of the arguments:

- `nil`, booleans, numbers and strings are copied as they are.
- Tables are copied deeply, so a handler that changes a table it received doesn't change the caller's table. Keys must be strings or numbers. Metatables are not copied, and a table that contains itself can't be passed.
- `vec2`, `vec3`, `vec4`, `quat`, `PlayerHandle` and object handles are copied. Object handles, also inside tables, arrive as the typed handle of their object (`PlayerObjectHandle`, `VehicleHandle`, `MountedGunHandle`, `RigidObjectHandle`, `NPCHandle`, `TetherHandle` or `SandstormHandle`), even when a plain `ObjectHandle` was passed, so no cast is needed; calling an `As...` cast on it (see [ObjectHandle](./objects/object-handle.md)) still works.
- Functions, coroutines and other values can't be passed: each one arrives as `nil` in its place, so the arguments after it keep their positions. Don't pass them.

A handler can call [`Event.Cancel()`](#eventcancel) to cancel an event fired with `Event.Fire`. Nothing happens in the game either way, but `Event.Fire` then returns `false`, so the script that fired the event can skip the action it announced. The remaining handlers still run.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | The event to fire. |
| ... | any of the types above | optional, the arguments passed to every handler. |

**Returns**

| Type | Description |
|---|---|
| `boolean` | `true`, or `false` when one of the handlers called `Event.Cancel()`. |

**Example**

```lua
-- resource "scoreboard", client/main.lua
Event.Add("ScoreChanged", function(name, score, extra)
	print(name .. " now has " .. score .. " points (" .. extra.reason .. ")")
end)

-- resource "deathmatch", client/main.lua
Event.Fire("ScoreChanged", "Rico", 15, { reason = "kill" })
```

```lua
-- resource "race", server/main.lua: let other resources veto the start of a race
local function startRace(track)
	if not Event.Fire("race:Starting", track) then
		print("race start cancelled by another resource")
		return
	end

	-- start the race...
end

-- resource "events", server/main.lua
Event.Add("race:Starting", function(track)
	if #World.GetPlayers() < 2 then
		Event.Cancel()
	end
end)
```

### Event.Cancel() {#eventcancel}

Cancels the event being dispatched, telling the game or server not to carry out the action behind it: a cancelled `OnChat` on the server isn't broadcast, a cancelled `OnWaypointPlace` doesn't place the waypoint, and so on. Each event's page says whether it can be cancelled and what cancelling does; for built-in events that can't be cancelled, `Event.Cancel()` has no effect. A cancelled event fired with [`Event.Fire`](#eventfirename-) makes `Event.Fire` return `false`.

Cancelling doesn't stop the dispatch: the remaining handlers of the event still run, and they have no way to know that an earlier handler cancelled it. Calling `Event.Cancel()` more than once in the same event is the same as calling it once, and there is no way to undo it.

Call it directly from the handler. Outside of a handler (at the top level of a script, or from a timer) it does nothing.

**Parameters** none.

**Returns** nothing.

**Notes**

- Each dispatch has its own cancel scope: `Event.Cancel()` cancels the innermost event being dispatched, whether it is a built-in event or one fired with `Event.Fire`.
- A handler that fires another event (with `Event.Fire`, or by doing something that causes a built-in event, such as lowering a player's health, which fires `OnPlayerDamage`) can still cancel its own event afterwards.
- Calling `Event.Cancel()` in the handlers of the inner event only cancels the inner event, never the one around it.

**Example**

```lua
-- server: block chat messages that contain a link
Event.Add("OnChat", function(client, text)
	if text:find("http://", 1, true) or text:find("https://", 1, true) then
		Event.Cancel()
	end
end)
```

## Custom events {#custom-events}

Any name that isn't a built-in event can be used as a custom event. They are the way for scripts on the same side to talk to each other, including scripts of different resources and different files of the same resource (each file has its own Lua state, so they can't share globals).

- Pick names that won't collide with built-in events or with other resources, for example by prefixing them with your resource's name (`"race:Finished"`). Names starting with `On` followed by an uppercase letter are used by the built-in events.
- A custom event with no handlers does nothing when fired, and that is not an error.
- Arguments are copied for each handler, see [`Event.Fire`](#eventfirename-) for what can be passed.
- To send an event to the other side (client to server or server to clients), use [Net](./net.md) instead.

**Example**

```lua
-- resource "chat", client/main.lua: lets other resources add lines to the chat
Event.Add("chat:AddLine", function(text, color)
	addLine(text, color or "#ffffff")
end)

-- resource "race", client/main.lua
Event.Add("OnClientJoin", function()
	Event.Fire("chat:AddLine", "Welcome to the race server!", "#ffcc00")
end)
```