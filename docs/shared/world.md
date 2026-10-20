---
sidebar_position: 11
---

# World

The `World` table is the entry point to everything that exists in the game world. This page explains how networked objects work and documents the lookup functions that work the same on both sides.

**Available on:** Server, Client

**See also:** [World (server)](../server/world.md) (spawning and destroying networked objects, explosions), [World (client)](../client/world.md) (time of day, gravity, time scale, the map waypoint and purely local game objects)

## How networked objects work {#how-networked-objects-work}

Read this section once before using the spawn functions: it explains why a handle can suddenly return `nil`, why `World.GetObjectByNID` sometimes finds nothing on a client, and who decides where an object is.

### Handles {#handles}

Scripts never hold an object itself, only a **handle** to it. Every spawn function returns a typed handle (`VehicleHandle`, `NPCHandle`, ...) and every typed handle is also an [ObjectHandle](./objects/object-handle.md), so the base methods (`GetPosition`, `SetPosition`, `GetHealth`, `GetNetId`, `SetData`, ...) work on all of them.

A handle stays valid only while its object exists. Once the object is destroyed, or on a client once it has streamed out (see below), every method of the handle quietly does nothing: setters are ignored and getters return `nil`. Always be ready for a getter to return `nil`:

```lua
local position = vehicle:GetPosition()

if not position then
	return -- the vehicle is gone (destroyed, or out of range on this client)
end
```

Functions that return a plain `ObjectHandle` (such as [World.GetObjectByNID](#worldgetobjectbynidnetid) and [World.GetAllByType](#worldgetallbytypetype)) only have the base methods. To call the methods of a specific type, cast it with `AsVehicle()`, `AsMountedGun()`, `AsRigidObject()`, `AsNPC()`, `AsTether()`, `AsSandstorm()` or `AsPlayer()`, each of which returns `nil` when the object is not of that type (see [ObjectHandle](./objects/object-handle.md)). Event handlers already receive typed handles.

### Streaming: objects only exist where they are needed {#streaming-objects-only-exist-where-they-are-needed}

The server holds every object. A client only knows about the objects that are **streamed** to it:

- The world is split into square cells of 400 m. A player receives every object in the cells within two cells of their own cell, which is an area of 2000 m × 2000 m around them (at least 800 m in each horizontal direction). Height does not matter.
- When an object enters that area it is created on the client (with all its current state), and when it leaves the area it is removed from that client again.
- Only players that have fully joined receive objects.
- [Sandstorms](./objects/sandstorm.md) are the exception: they are streamed to every player wherever they are.

As a consequence, on a client:

- `World.GetObjectByNID` returns `nil` for an object that exists on the server but is out of range.
- `World.GetAllByType` only lists the objects currently streamed to this client.
- A handle kept in a variable stops working when its object streams out, and works again if the same object streams back in (the network id stays the same).
- Client-only methods that read the game entity (for example `vehicle:IsInAir()`) also return `nil` for a moment right after the object streamed in, until the game has finished spawning its model.

On the server, objects never stream out: a handle stays valid until the object is destroyed.

### Ownership: who simulates an object {#ownership-who-simulates-an-object}

The physics and AI of an object run in a player's game, not on the server. For every object that at least one player can see, the server picks one of those players as its **owner**:

- The owner's game simulates the object and sends its position, rotation, velocity and health to the server, which forwards them to everyone else who sees it. The other players smoothly follow (interpolate) those updates.
- By default the closest player that sees the object is the owner (distance measured in 3D). To avoid flip-flopping, another player only takes over once they are about 20% closer than the current owner and the current owner has held the object for at least one second. If the owner can no longer see the object, the closest other player takes over at once.
- Nobody owns an object that no player sees. It simply stays where it was last reported.
- A vehicle is owned by its driver while someone is in the driver seat, whatever the distance. A mounted gun is owned by the player using it.
- A player always owns their own character.

Server scripts can always override the simulated state: `SetPosition`, `SetRotation`, `SetTransform`, `SetVelocity`, `SetAngularVelocity` and `SetHealth` on an [ObjectHandle](../server/objects/object-handle.md) are applied on the server and sent to the owner and every player that sees the object. Client scripts cannot change synced state; client-only setters (for example `vehicle:SetCloak`) only change what that one player sees.

### What is synced {#what-is-synced}

| Object | State kept in sync for everyone who sees it |
|---|---|
| Every object | Position, rotation, health (0..1), script data set with `SetData(key, value, true)` |
| [Vehicle](./objects/vehicle.md) | Velocity and angular velocity, model, paint (three colors, specular gloss, clear coat, metallic, dirt), door and part states, lock state, drone orders, damage |
| [Mounted gun](./objects/mounted-gun.md) | Model |
| [Rigid object](./objects/rigid-object.md) | Velocity and angular velocity, model, physics file, motion type, collision on/off |
| [NPC](./objects/npc.md) | Velocity, model, movement or follow order, look target, weapon, aim, firing. Grenade throws and melee swings are one-off actions |
| [Tether](./objects/tether.md) | Both ends (attached objects and offsets) |
| [Sandstorm](./objects/sandstorm.md) | Size and wind speed |

Lasting state (paint, part states, NPC orders, ...) is part of the object, so a player who streams the object in later still gets it. One-off actions (an NPC's grenade throw or melee swing) only reach the players who see the object at that moment.

### Lifetime {#lifetime}

An object spawned by a script belongs to the script's resource: when the resource stops (or restarts), every object it spawned and that still exists is destroyed. Destroy an object earlier with [World.Destroy](../server/world.md#worlddestroyobject). Objects spawned by players' games (for example tethers fired with the grappling hook) are not tied to any resource.

## Functions {#functions}

### World.GetObjectByNID(netId) {#worldgetobjectbynidnetid}

Looks an object up by its network id (the number `object:GetNetId()` returns). Network ids are the same on the server and on every client, so they are the usual way to refer to an object in a `Net` event.

On the server it finds any existing object. On a client it only finds objects currently streamed to that client, so it returns `nil` for an object that exists but is out of range.

The result is a plain [ObjectHandle](./objects/object-handle.md): cast it with `AsVehicle()`, `AsNPC()`, ... to use the type's own methods. It can also be a player's object (cast with `AsPlayer()`).

**Side:** Server, Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| netId | `integer` | the object's network id |

**Returns:** `ObjectHandle`, or `nil` when no such object exists (on a client: no such object is streamed in).

**Example**

```lua
-- server: a client asks to repaint "its" vehicle by network id
Net.AddEvent("PaintVehicle", function(netId, r, g, b)
	local object = World.GetObjectByNID(netId)
	local vehicle = object and object:AsVehicle()

	if not vehicle then
		return
	end

	vehicle:SetPrimaryColor(r, g, b)
end)
```

### World.GetAllByType(type) {#worldgetallbytypetype}

Returns every object of one type. On the server this is every object of that type in the world; on a client it is only the objects of that type currently streamed to that client.

**Side:** Server, Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| type | [`NetObjectType`](./enums/net-object-type.md) | `NetObjectType.Player`, `Vehicle`, `MountedGun`, `RigidObject`, `NPC`, `Tether` or `Sandstorm` |

**Returns:** a Lua array (use `ipairs` and `#`) of `ObjectHandle`s, empty when there are none or the type is unknown. The handles are the base type: cast them with `AsVehicle()` and the like.

**Example**

```lua
-- server: repaint every vehicle in the world
for _, object in ipairs(World.GetAllByType(NetObjectType.Vehicle)) do
	local vehicle = object:AsVehicle()

	if vehicle then
		vehicle:SetPrimaryColor(1, 1, 1)
	end
end

-- client: how many NPCs are streamed in around me
local count = #World.GetAllByType(NetObjectType.NPC)

print("NPCs in the world: " .. count)
```

### Player helpers {#player-helpers}

These `World` functions are about players and are documented in [Players](./objects/players.md):

| Function | Side | Returns |
|---|---|---|
| `World.GetPlayers()` | Server, Client | every joined player's `PlayerHandle` |
| `World.GetRandomClient()` | Server, Client | a random `PlayerHandle`, or `nil` |
| `World.GetRandomPlayer()` | Server, Client | a random player object as an `ObjectHandle`, or `nil` |

The client-only player helpers (`World.LocalClient()`, `World.LocalPlayer()`) are listed in [World (client)](../client/world.md#player-helpers).