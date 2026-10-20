---
sidebar_position: 35
---

# Net (server)

Server scripts send events to players' clients with the `Net.SendTo...` / `Net.Broadcast` functions, find out who sent an event with `Net.Sender`, and make HTTP requests with `Net.Fetch`; how remote events work, what can be sent and how to receive events with `Net.AddEvent` is on the shared [Net](../shared/net.md) page.

**Available on:** Server

See also: [Net](../shared/net.md), [Net (client)](../client/net.md)

## Functions {#functions}

### Net.SendToPlayer(player, name, ...) {#netsendtoplayerplayer-name-}

Sends the event `name` to one player's client.

Nothing is sent when `player` is no longer valid (the player left) or hasn't finished joining, or when `name` is empty. No error is raised in those cases.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | PlayerHandle | the receiving player (a client/connection handle, see [PlayerHandle](../shared/objects/player.md)) |
| name | string | the event name |
| ... | any | the arguments, see [Values you can send](../shared/net.md#values-you-can-send) |

**Returns** nothing

**Example**

```lua
-- server
Net.AddEvent("garage:get_state", function()
	local client = Net.Sender()

	if client then
		Net.SendToPlayer(client, "garage:state", { slots = 3, owned = { "v046_car_racingbuggy_civilian" } })
	end
end)
```

### Net.SendToPlayers(players, name, ...) {#netsendtoplayersplayers-name-}

Sends the event `name` to several players at once. The arguments are serialized only once, so this is cheaper than calling `Net.SendToPlayer` in a loop.

Every value of the `players` table is looked at (the keys don't matter): `PlayerHandle` values of joined players receive the event, anything else is silently skipped.

**Parameters**

| Name | Type | Description |
|---|---|---|
| players | table | a table whose values are `PlayerHandle`s |
| name | string | the event name |
| ... | any | the arguments, see [Values you can send](../shared/net.md#values-you-can-send) |

**Returns** nothing

**Example**

```lua
-- server: tell one team that the round started
local team_red = {}

Event.Add("OnPlayerJoin", function(client)
	team_red[#team_red + 1] = client
end)

local function start_round()
	Net.SendToPlayers(team_red, "round:start", "red", 300)
end
```

### Net.SendToPlayersVisibleTo(object, name, ...) {#netsendtoplayersvisibletoobject-name-}

Sends the event `name` to every player whose client currently has `object` streamed in, that is the players close enough to see it. Use it for effects that only matter to the players around something (a sound at a vehicle, a marker on an NPC).

Nothing is sent when `object` is no longer valid. Whether a player counts as seeing their own player object is not documented; if that player must receive the event, send it to them with `Net.SendToPlayer` as well.

**Parameters**

| Name | Type | Description |
|---|---|---|
| object | ObjectHandle | any object handle (player, vehicle, NPC...) |
| name | string | the event name |
| ... | any | the arguments, see [Values you can send](../shared/net.md#values-you-can-send) |

**Returns** nothing

**Example**

```lua
-- server: play the car alarm for the players near the car
Event.Add("OnVehicleDamage", function(vehicle, damager, loss)
	if loss > 0.1 then
		Net.SendToPlayersVisibleTo(vehicle, "alarm:play", vehicle)
	end
end)
```

```lua
-- client
Net.AddEvent("alarm:play", function(vehicle)
	if vehicle then
		print("alarm at " .. tostring(vehicle:GetPosition()))
	end
end)
```

### Net.Broadcast(name, ...) {#netbroadcastname-}

Sends the event `name` to every joined player. Players that are still connecting don't receive it.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | string | the event name |
| ... | any | the arguments, see [Values you can send](../shared/net.md#values-you-can-send) |

**Returns** nothing

**Example**

```lua
-- server: a countdown every player sees
local seconds = 10

Timer.Set(function()
	Net.Broadcast("race:countdown", seconds)

	seconds = seconds - 1
end, 1000, 11)
```

### Net.Sender() {#netsender}

Inside a `Net.AddEvent` handler, returns the `PlayerHandle` of the client that sent the event being handled. Anywhere else (in an `Event.Add` handler, a timer, or after the handler returned) it returns `nil`.

The sender can be a player that is authorized but hasn't finished joining yet (see the note in [Net.Send](../client/net.md#netsendname-)). Use `sender:GetPlayer()` to get their in-world character, which can be `nil` at that point.

Store the handle in a local at the start of the handler if you need it later, for example in a timer: `Net.Sender()` won't return it any more by then.

**Returns** `PlayerHandle` or `nil`

**Example**

```lua
-- server
Net.AddEvent("admin:kick", function(target, reason)
	local sender = Net.Sender()

	if not sender or not sender:HasAcl(AclLevel.Admin) then
		return
	end

	if target then
		target:Kick(type(reason) == "string" and reason or "Kicked by an admin")
	end
end)
```

### Net.Fetch(url, options?, callback) {#netfetchurl-options-callback}

Makes an HTTP request on another thread and calls `callback(result)` on the main thread once the answer arrives; it returns nothing right away and doesn't block the server. See [HTTP](./http.md) for the full description.

**Example**

```lua
Net.Fetch("https://example.com/status.json", function(result)
	if result.success and result.status == 200 then
		print(result.response)
	end
end)
```