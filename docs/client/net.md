---
sidebar_position: 49
---

# Net (client)

Client scripts send events to the server with `Net.Send`; how remote events work, what can be sent and how to receive events with `Net.AddEvent` is on the shared [Net](../shared/net.md) page.

**Available on:** Client

See also: [Net](../shared/net.md), [Net (server)](../server/net.md)

## Functions {#functions}

### Net.Send(name, ...) {#netsendname-}

Sends the event `name` with the given arguments to the server, where the `Net.AddEvent` handlers of that name are called and `Net.Sender()` returns this client's player.

Nothing is sent when `name` is an empty string.

> Client scripts start just **before** the client finishes joining. An event sent from the top level of a script or from `OnResourceStart` reaches the server while the player isn't joined yet, so the server can read it but its `Net.SendToPlayer` answers to that player are dropped. To ask the server for initial data, send the request when the client has joined: in `OnClientJoin`, plus right away when the resource starts on a client that is already in game (see the example).

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | string | the event name |
| ... | any | the arguments, see [Values you can send](../shared/net.md#values-you-can-send) |

**Returns** nothing

**Example**

```lua
-- client: ask the server for this resource's state once we're in the game
local function request_state()
	Net.Send("garage:get_state")
end

Event.Add("OnClientJoin", request_state)

-- the resource was (re)started while we were already playing
if World.LocalPlayer() then
	request_state()
end

Event.Add("OnKeyDown", function(key)
	if key == Key.G then
		local position = World.LocalPlayer():GetPosition()

		Net.Send("garage:spawn", "v046_car_racingbuggy_civilian", position)
	end
end)
```