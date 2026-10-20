---
sidebar_position: 3
---

# Net

The `Net` table sends script events between the server and its clients. A script registers a handler for an event name with `Net.AddEvent`, and the other side triggers it with `Net.Send` (client to server, see [Net (client)](../client/net.md)) or one of the `Net.SendTo...` / `Net.Broadcast` functions (server to clients, see [Net (server)](../server/net.md)). This is how the client and server halves of a resource talk to each other. For events that stay on one side, use `Event.Add` / `Event.Fire` (see [Events](./events.md)).

**Available on:** Server, Client

See also: [Net (server)](../server/net.md), [Net (client)](../client/net.md)

## How remote events work {#how-remote-events-work}

- Remote events are sent **reliably and in order**: every event arrives, and events sent by the same side arrive in the order they were sent.
- A remote event only reaches handlers added with `Net.AddEvent`. Handlers added with `Event.Add` can never be triggered by the other side, so a client can't fire your server's internal events.
- Handlers of every resource that registered the name are called, not only the resource that sent it. Prefix your event names to avoid clashes, e.g. `"race:join"`.
- `Net.AddEvent` handlers are also called by a local `Event.Fire` of the same name.
- On the server, [`Net.Sender()`](../server/net.md#netsender) tells you which player sent the event. The client always receives events from the server, so it has no `Net.Sender`.
- Never trust what a client sends: check the types and ranges of every argument in server handlers.
- If a handler raises an error, the error is reported (server console and the in-game script debugger) and the remaining handlers of that event are skipped.
- An event that arrives with no `Net.AddEvent` handler for its name logs a warning on the receiving side and is otherwise ignored.

### Values you can send {#values-you-can-send}

Any number of arguments (up to 255) can follow the event name. Each one can be:

| Type | Notes |
|---|---|
| `nil` | arrives as `nil` |
| `boolean` | |
| `number` | sent as a 64-bit float, so integers up to 2^53 are exact |
| `string` | may contain any bytes |
| `table` | copied with all nested tables (up to 64 levels deep, at most 65535 entries per table). Keys must be strings shorter than 256 bytes or numbers. Values of other types inside a table (functions, unsupported userdata) are dropped |
| `vec2`, `vec3`, `vec4`, `quat` | arrive as the same type |
| `PlayerHandle` | arrives as a `PlayerHandle` for the same player, or `nil` if the receiver doesn't know that player (or it left) |
| `ObjectHandle` and its typed handles | arrive as the typed handle of the object (`PlayerObjectHandle`, `VehicleHandle`, `MountedGunHandle`, `RigidObjectHandle`, `NPCHandle`, `TetherHandle` or `SandstormHandle`), even when a plain `ObjectHandle` was sent, so its type's methods work without a cast (calling `:AsVehicle()`, `:AsPlayer()`... on it still works, see [ObjectHandle](./objects/object-handle.md)). It arrives as `nil` when the receiver doesn't have that object, for example a client that is too far away to have it streamed in |

Do not send functions or other userdata (timers, SQL values, resources): they are not supported, an error is logged, and the event may arrive with a wrong argument or be dropped. All the arguments of one event must fit in a single network packet of 1 MB, so send large data in several events.

Tables arrive as new tables: changing them on the receiving side does not affect the sender, and a table referenced twice arrives as two separate copies. A table that contains itself can't be sent.

## Functions {#functions}

### Net.AddEvent(name, handler) {#netaddeventname-handler}

Registers `handler` to be called when the other side sends the event `name`. The handler receives the event's arguments in the order they were sent.

Each script file can register one handler per name: a second `Net.AddEvent` (or `Event.Add`) with the same name in the same file fails. Different files and different resources can each register their own handler for the same name, and all of them are called.

Handlers are removed automatically when the resource stops. Adding or removing a handler for an event while that same event is being dispatched (from inside one of its handlers) raises a Lua error.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | string | the event name, case-sensitive |
| handler | function | called with the event's arguments |

**Returns**

| Type | Description |
|---|---|
| boolean | `true` when the handler was added |
| string or nil | the reason when it wasn't (e.g. `"Event already registered in this script"`) |

**Example**

```lua
-- server
Net.AddEvent("shop:buy", function(item_id, amount)
	local client = Net.Sender()

	if not client or type(item_id) ~= "string" or type(amount) ~= "number" then
		return
	end

	amount = math.max(1, math.min(math.floor(amount), 10))

	print(client:GetName() .. " bought " .. amount .. " x " .. item_id)
end)
```

```lua
-- client
local ok, err = Net.AddEvent("shop:result", function(success, message)
	print(success and "bought it" or ("failed: " .. message))
end)

if not ok then
	print("could not register shop:result: " .. err)
end
```

### Net.RemoveEvent(name) {#netremoveeventname}

Removes this script file's handler for the event `name`. It removes the handler whether it was added with `Net.AddEvent` or `Event.Add` (they share the same names), and only the one registered by the calling file.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | string | the event name |

**Returns**

| Type | Description |
|---|---|
| boolean | `true` when a handler was removed |
| string or nil | the reason when nothing was removed (`"Event '<name>' does not exist"`) |

**Example**

```lua
-- client: accept the server's welcome message only once
Net.AddEvent("welcome", function(text)
	print(text)

	Timer.Set(function() Net.RemoveEvent("welcome") end, 0, 1)
end)
```

The removal is deferred with a timer because a handler can't remove its own event while that event is being dispatched.