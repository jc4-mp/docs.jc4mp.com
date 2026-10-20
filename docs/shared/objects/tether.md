---
sidebar_position: 20
---

# TetherHandle

A `TetherHandle` refers to a networked tether: a grappling-hook wire that connects a world point or an object to another object. Tethers come from two places:

- **Scripts** spawn them with [World.SpawnTether](../../server/world.md#worldspawntetherorigin-target-offset).
- **Players** make them with their grappling hook in their own game. These are synced to everyone too and show up as tethers in `World.GetAllByType(NetObjectType.Tether)`. A player can have at most 10 at a time, and a player's tethers are destroyed when they leave the server.

Get a handle from `World.SpawnTether`, or by casting an [ObjectHandle](./object-handle.md) with `AsTether()`.

**Available on:** Server, Client

## Behavior {#behavior}

Each end of a tether is either a fixed world point or attached to an object at an offset in that object's own space (it moves and turns with the object). The ends are fixed when the tether is created; to change them, destroy the tether and spawn a new one.

Every player's game in range draws the wire and simulates it with the game's grappling-hook physics. On a given client the wire only appears once every object it is attached to is spawned in that client's game, so a tether between objects that are out of range appears later. The tether itself streams around the position where it was created (see [Streaming](../world.md#streaming-objects-only-exist-where-they-are-needed)).

A tether lives until it is destroyed with [World.Destroy](../../server/world.md#worlddestroyobject), until the resource that spawned it stops, or, for a player's tether, until the player releases it or leaves.

## Methods {#methods}

`TetherHandle` has no methods of its own. It is an [ObjectHandle](./object-handle.md), so all of that page's methods work on it: `GetNetId`, `GetPosition` (the position the tether was created at), `GetData`/`SetData` and the casts. If the tether no longer exists, or on a client is not streamed in, they return `nil`.

**Example**

```lua
-- server: anchor the asking player's vehicle to the ground below it for 10 seconds
Net.AddEvent("Anchor", function()
	local player = Net.Sender():GetPlayer()
	local vehicle = player and player:AsPlayer():GetVehicle()

	if not vehicle then
		return
	end

	local tether = World.SpawnTether(vehicle:GetPosition() - vec3(0, 1, 0), vehicle, vec3(0, 0, 0))

	if tether then
		Timer.Set(function()
			World.Destroy(tether)
		end, 10000, 1)
	end
end)

-- server: remove every tether in the world (players' too)
local function clearTethers()
	for _, object in ipairs(World.GetAllByType(NetObjectType.Tether)) do
		World.Destroy(object)
	end
end
```