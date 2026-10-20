---
sidebar_position: 41
---

# World (server)

On the server, the `World` table spawns and destroys networked objects (vehicles, mounted guns, rigid objects, NPCs, tethers, sandstorms) and sets off explosions.

**Available on:** Server

**See also:** [World](../shared/world.md) (how networked objects work, lookups), [World (client)](../client/world.md)

## Spawn arguments {#spawn-arguments}

The server spawn functions share two optional trailing arguments:

| Name | Type | Description |
|---|---|---|
| rotation | `vec3` | optional, default no rotation. Euler angles in **degrees**: `vec3(pitch, yaw, roll)`, where yaw turns around the vertical (Y) axis |
| health | `number` | optional, default `1`. Starting health as a fraction from `0` to `1` |

Passing `health` requires passing `rotation` too (use `vec3(0, 0, 0)`).

All spawn functions raise a Lua error for invalid input: a non-finite number (NaN or infinity) in a position, rotation or size, a health outside `0..1`, an enum value out of range, or a model or name string longer than 255 characters.

## Functions {#functions}

### World.SpawnVehicle(model, position, rotation?, health?) {#worldspawnvehiclemodel-position-rotation-health}

Spawns a vehicle. The vehicle exists on the server at once and appears in the game of every player within streaming range (see [Streaming](../shared/world.md#streaming-objects-only-exist-where-they-are-needed)). It starts with no paint tint, all doors and parts closed and unlocked.

Drones are vehicles too: spawn one with its vehicle model (for example `v254_helicopter_guarddrone_rebel`) and steer it with the [drone methods](./objects/vehicle.md#vehicledroneflytoposition).

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| model | `string` | the vehicle model, for example `"v017_car_vintagemuscle_civilian"`. See [Vehicles](../lists/vehicles.md) |
| position | `vec3` | where to spawn it, in meters |
| rotation | `vec3` | optional, default no rotation. Euler angles in degrees, `vec3(pitch, yaw, roll)` |
| health | `number` | optional, default `1`. Starting health from `0` to `1` |

**Returns:** [`VehicleHandle`](../shared/objects/vehicle.md)

**Notes:** an unknown model name is not rejected by the server, but players' games cannot spawn it. The vehicle is destroyed when the resource stops.

**Example**

```lua
-- spawn a car 5 m in front of the player who asked, facing the same way
Net.AddEvent("SpawnCar", function()
	local player = Net.Sender():GetPlayer()

	if not player then
		return
	end

	local yaw = math.deg(player:GetEulerRotation().y) -- GetEulerRotation is in radians
	local forward = player:GetRotation() * vec3(0, 0, 5)
	local vehicle = World.SpawnVehicle("v017_car_vintagemuscle_civilian", player:GetPosition() + forward + vec3(0, 1, 0), vec3(0, yaw, 0))

	vehicle:SetPrimaryColor(0.8, 0.1, 0.1)
end)
```

### World.SpawnMountedGun(model, position, rotation?, health?) {#worldspawnmountedgunmodel-position-rotation-health}

Spawns a mounted gun (a turret that players can operate). While a player uses it, that player owns it (see [Ownership](../shared/world.md#ownership-who-simulates-an-object)).

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| model | `string` | the mounted gun model. See [Mounted guns](../lists/mounted-guns.md) |
| position | `vec3` | where to spawn it, in meters |
| rotation | `vec3` | optional, default no rotation. Euler angles in degrees, `vec3(pitch, yaw, roll)` |
| health | `number` | optional, default `1`. Starting health from `0` to `1` |

**Returns:** [`MountedGunHandle`](../shared/objects/mounted-gun.md)

**Example**

```lua
Net.AddEvent("SpawnTurret", function(model, position)
	local client = Net.Sender()

	if not client:HasAcl(AclLevel.Admin) then
		return
	end

	World.SpawnMountedGun(model, position, vec3(0, 90, 0))
end)
```

### World.SpawnRigidObject(position, model, pfx, motionType, rotation?, health?) {#worldspawnrigidobjectposition-model-pfx-motiontype-rotation-health}

Spawns a physics prop from a model file and its physics (collision) file. The client has a function of the same name that spawns a local prop instead (see [World (client)](../client/world.md#worldspawnrigidobjectposition-model-pfx-motiontype-rotation)).

Spawns a networked rigid object that every player in range sees and that is kept in sync (see [Rigid object](../shared/objects/rigid-object.md)).

A player's game only shows the object once both files are already loaded in that game (check with `Asset.IsLoaded` on the client, see [Asset](../client/asset.md)). Use models from [Rigid objects](../lists/rigid-objects.md) that the game has loaded everywhere, otherwise some players may not see the object.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | where to spawn it, in meters |
| model | `string` | path of the model file (`.modelc`). See [Rigid objects](../lists/rigid-objects.md) |
| pfx | `string` | path of the physics file (`.pfxc`) that goes with the model |
| motionType | [`RigidObjectMotionType`](../shared/enums/rigid-object.md#rigidobjectmotiontype) | `Static` (never moves), `Keyframed` (moved only by setting its transform) or `Dynamic` (simulated by physics) |
| rotation | `vec3` | optional, default no rotation. Euler angles in degrees, `vec3(pitch, yaw, roll)` |
| health | `number` | optional, default `1`. Starting health from `0` to `1` |

**Returns:** [`RigidObjectHandle`](../shared/objects/rigid-object.md)

**Example**

```lua
-- drop a barrel where the player aims
local BARREL = "models/environments/locale_global/mil_prop_barrel_a/mil_prop_barrel_a_barrel_a"

Net.AddEvent("SpawnBarrel", function(position)
	World.SpawnRigidObject(position + vec3(0, 1, 0), BARREL .. ".modelc", BARREL .. "_col.pfxc", RigidObjectMotionType.Dynamic)
end)
```

### World.SpawnNPC(model, position, rotation?, health?) {#worldspawnnpcmodel-position-rotation-health}

Spawns a non-player character. The NPC stands still until you give it orders with its methods (`Move`, `Follow`, `AimAt`, `SetFiring`, ...; see [NPC](./objects/npc.md)). Its AI runs in the game of its owner.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| model | `string` | the character to spawn, for example an animal or a civilian. See [NPCs](../lists/npcs.md) |
| position | `vec3` | where to spawn it, in meters |
| rotation | `vec3` | optional, default no rotation. Euler angles in degrees, `vec3(pitch, yaw, roll)` |
| health | `number` | optional, default `1`. Starting health from `0` to `1` |

**Returns:** [`NPCHandle`](../shared/objects/npc.md)

**Example**

```lua
-- a pig that follows the player who called it
Net.AddEvent("CallPig", function()
	local player = Net.Sender():GetPlayer()

	if not player then
		return
	end

	local pig = World.SpawnNPC("domestic_pig", player:GetPosition() + vec3(2, 0, 0))

	pig:Follow(player, MoveType.Run, MoveStyle.Normal)
end)
```

### World.SpawnTether(origin, target, offset) {#worldspawntetherorigin-target-offset}

### World.SpawnTether(originObject, originOffset, target, targetOffset) {#worldspawntetheroriginobject-originoffset-target-targetoffset}

Connects two things with a grappling-hook tether (the wire Rico fires), drawn and simulated by every player's game in range. It has two forms:

- **World point to object:** the first end is fixed at the world position `origin`, the second end is attached to `target` at `offset`.
- **Object to object:** the first end is attached to `originObject` at `originOffset`, the second to `target` at `targetOffset`.

Offsets are in the attached object's own space: `vec3(0, 2, 0)` is 2 m above the object's origin, and it moves and turns with the object. Each end can be any networked object, including a player's object.

On each client the wire is only created once every attached object is spawned in that client's game, so a tether whose objects are out of range appears later. The tether itself streams around the position it was spawned at (the world point, or the first object's position at spawn time).

**Side:** Server

**Parameters (world point to object)**

| Name | Type | Description |
|---|---|---|
| origin | `vec3` | the world position of the first end |
| target | `ObjectHandle` | the object the second end is attached to |
| offset | `vec3` | where on `target` the second end is, in the object's space |

**Parameters (object to object)**

| Name | Type | Description |
|---|---|---|
| originObject | `ObjectHandle` | the object the first end is attached to |
| originOffset | `vec3` | where on `originObject` the first end is |
| target | `ObjectHandle` | the object the second end is attached to |
| targetOffset | `vec3` | where on `target` the second end is |

**Returns:** [`TetherHandle`](../shared/objects/tether.md), or `nil` when an object passed in no longer exists.

**Example**

```lua
-- tie a vehicle's roof to a point 20 m above it
local tether = World.SpawnTether(vehicle:GetPosition() + vec3(0, 20, 0), vehicle, vec3(0, 1.5, 0))

-- tie two vehicles together, bumper to bumper
local tow = World.SpawnTether(truck, vec3(0, 0.5, -3), car, vec3(0, 0.5, 2))

if not tow then
	print("one of the vehicles is gone")
end
```

### World.SpawnSandstorm(position, size, windSpeed, rotation?) {#worldspawnsandstormposition-size-windspeed-rotation}

Spawns a sandstorm: a box-shaped volume full of blowing sand, with a wall of sand on its front face and the sandstorm look (sky, light, fog) for anyone inside. The wind blows along the box's forward direction, which the rotation sets.

Sandstorms are visible from far away, so they are streamed to **every** player wherever they are. Their size and wind speed are fixed at spawn; move or turn them with `SetPosition`/`SetRotation`/`SetTransform`, and remove them with [World.Destroy](#worlddestroyobject).

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | the center of the box, in meters |
| size | `vec3` | the box's width, height and depth in meters. Every component must be greater than 0. The game's own desert sandstorm is `vec3(2000, 600, 1000)` |
| windSpeed | `number` | the wind's speed. The game's own sandstorm uses `45` |
| rotation | `vec3` | optional, default no rotation. Euler angles in degrees; the yaw sets which way the wind blows |

**Returns:** [`SandstormHandle`](../shared/objects/sandstorm.md)

**Notes:** raises a Lua error if a size component is 0 or less, or not finite.

**Example**

```lua
-- a storm 1 km away whose wind blows toward the player
local function spawnStormToward(player)
	local position = player:GetPosition() + vec3(0, 150, -1000)
	local from = player:GetPosition()
	local yaw = math.deg(math.atan2(from.x - position.x, from.z - position.z))

	return World.SpawnSandstorm(position, vec3(2000, 600, 1000), 45, vec3(0, yaw, 0))
end
```

### World.SpawnExplosion(position, entity) {#worldspawnexplosionposition-entity}

Sets off an explosion from a game explosion entity at a position. It is not an object: nothing is returned and nothing stays in the world.

The explosion is sent to every joined player, whatever their distance. Each player's game plays the effect and applies the blast's physics, and each player's game only reports the damage done to its own player, so the damage players take is synced normally. An entity that contains no explosion does nothing.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | where it explodes, in meters |
| entity | `string` | the explosion entity's path (a `.blo` file). See [Explosions](../lists/explosions.md) |

**Returns:** nothing

**Example**

```lua
Net.AddEvent("Airstrike", function(position)
	if not Net.Sender():HasAcl(AclLevel.Admin) then
		return
	end

	for i = 0, 4 do
		Timer.Set(function()
			World.SpawnExplosion(position + vec3(i * 8, 0, 0), "locations/node/node_military_12/node_military_12_main.blo")
		end, i * 300, 1)
	end
end)
```

### World.Destroy(object) {#worlddestroyobject}

Destroys a networked object: it is removed from the server and from every player's game. Any handle to it stops working. Works on any object, whichever resource spawned it (also tethers made by players).

Players cannot be destroyed this way: use `PlayerHandle:Kick` (see [Player](./objects/player.md)). Trying logs a warning and returns `false`.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| object | `ObjectHandle` | the object to destroy (any typed handle works) |

**Returns:** `boolean`: `true` if the object was destroyed, `false` if it no longer existed or is a player.

**Example**

```lua
-- remove a vehicle 10 seconds after it was destroyed
Event.Add("OnVehicleDestroy", function(vehicle)
	Timer.Set(function()
		World.Destroy(vehicle)
	end, 10000, 1)
end)
```