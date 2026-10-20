---
sidebar_position: 25
---

# NetObjectType

`NetObjectType` names the kinds of networked objects in the world: players, vehicles, mounted guns, rigid objects, NPCs, tethers and sandstorms. Use it to list every object of one kind, or to tell what kind of object a generic handle points to.

**Available on:** Server, Client

## Values {#values}

### NetObjectType {#netobjecttype}

Used by:

- [`World.GetAllByType(type)`](../world.md) (server and client): a table with every object of that type (on the client, the objects the client currently knows about).
- [`object:GetType()`](../objects/object-handle.md) (server and client): the type of the object behind a handle, one of these values. It returns 0 (not in the table) for an invalid or destroyed handle.

Once you know the type, convert the generic `ObjectHandle` to its typed handle with the matching `As*` method (`AsPlayer`, `AsVehicle`, ...), see [ObjectHandle](../objects/object-handle.md).

| Name | Value | Meaning | Typed handle |
|---|---|---|---|
| `NetObjectType.Player` | 1 | A player's character in the world. | [`PlayerObjectHandle`](../objects/player.md) |
| `NetObjectType.Vehicle` | 2 | A vehicle. | [`VehicleHandle`](../objects/vehicle.md) |
| `NetObjectType.MountedGun` | 3 | A mounted gun (a stationary turret). | [`MountedGunHandle`](../objects/mounted-gun.md) |
| `NetObjectType.RigidObject` | 4 | A rigid physics object (a prop built from a model and a physics file). | [`RigidObjectHandle`](../objects/rigid-object.md) |
| `NetObjectType.NPC` | 5 | A non-player character. | [`NPCHandle`](../objects/npc.md) |
| `NetObjectType.Tether` | 6 | A tether (a grappling hook wire between two points or objects). | [`TetherHandle`](../objects/tether.md) |
| `NetObjectType.Sandstorm` | 7 | A sandstorm volume. | [`SandstormHandle`](../objects/sandstorm.md) |

**Example**

```lua
-- server: count the vehicles, and handle a generic object by its type
local vehicles = World.GetAllByType(NetObjectType.Vehicle)
print("there are " .. #vehicles .. " vehicles")

local function describe(object)
	local type = object:GetType()

	if type == NetObjectType.Player then
		local client = object:AsPlayer():GetClient()
		return "player " .. (client and client:GetName() or "?")
	elseif type == NetObjectType.Vehicle then
		return "vehicle " .. object:AsVehicle():GetId()
	elseif type == NetObjectType.NPC then
		return "NPC " .. object:AsNPC():GetId()
	end

	return "object of type " .. tostring(type)
end

for _, player in ipairs(World.GetAllByType(NetObjectType.Player)) do
	print(describe(player))
end
```