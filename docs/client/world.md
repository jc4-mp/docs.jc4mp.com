---
sidebar_position: 51
---

# World (client)

On the client, the `World` table controls world-wide settings such as time of day, gravity, time scale and the map waypoint, and spawns purely local game objects.

**Available on:** Client

**See also:** [World](../shared/world.md) (how networked objects work, lookups), [World (server)](../server/world.md)

## Functions {#functions}

### Player helpers {#player-helpers}

These `World` functions are about the local player and are documented in [Players (client)](./objects/players.md):

| Function | Side | Returns |
|---|---|---|
| `World.LocalClient()` | Client | the local `PlayerHandle`, or `nil` |
| `World.LocalPlayer()` | Client | the local player's object as an `ObjectHandle`, or `nil` |

The player helpers available on both sides are listed in [World](../shared/world.md#player-helpers).

### World.SpawnRigidObject(position, model, pfx, motionType, rotation?) {#worldspawnrigidobjectposition-model-pfx-motiontype-rotation}

Spawns a physics prop from a model file and its physics (collision) file. The server has a function of the same name that spawns a networked prop instead (see [World (server)](../server/world.md#worldspawnrigidobjectposition-model-pfx-motiontype-rotation-health)).

Spawns a **local** rigid object that only this player sees. It is not networked and not a handle: it returns a `RigidObject` game object (see [Game objects](./game-objects.md#rigidobject)) with methods such as `SetMotionType`, `EnableCollision`, `SetPosition` and `Destroy`. The client loads the files itself. It is destroyed when the resource stops, or earlier with its `Destroy` method.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | where to spawn it, in meters |
| model | `string` | path of the model file (`.modelc`). See [Rigid objects](../lists/rigid-objects.md) |
| pfx | `string` | path of the physics file (`.pfxc`) that goes with the model |
| motionType | [`RigidObjectMotionType`](../shared/enums/rigid-object.md#rigidobjectmotiontype) | `Static` (never moves), `Keyframed` (moved only by setting its transform) or `Dynamic` (simulated by physics) |
| rotation | `vec3` | optional, default no rotation. Euler angles in degrees, `vec3(pitch, yaw, roll)` |

**Returns:** a `RigidObject` game object, or `nil` when the model or physics file cannot be loaded (a warning is written to the client log).

**Notes:** the motion type is not range-checked. Check the result for `nil` before using it.

**Example**

```lua
-- a local barrel only this player sees, only if the game has its files loaded
local BARREL = "models/environments/locale_global/mil_prop_barrel_a/mil_prop_barrel_a_barrel_a"

if Asset.IsLoaded(BARREL .. ".modelc") and Asset.IsLoaded(BARREL .. "_col.pfxc") then
	local barrel = World.SpawnRigidObject(World.LocalPlayer():GetPosition() + vec3(0, 2, 3), BARREL .. ".modelc", BARREL .. "_col.pfxc", RigidObjectMotionType.Dynamic)

	if not barrel then
		print("could not spawn the barrel")
	end
end
```

### World.GetTime() {#worldgettime}

Returns the game's time of day on this client.

**Side:** Client

**Parameters:** none

**Returns:** `number`: the time of day in hours (for example `13.5` is half past one in the afternoon).

**Example**

```lua
local hour = World.GetTime()

if hour >= 20 or hour < 6 then
	print("it's night")
end
```

### World.SetTime(time) {#worldsettimetime}

Sets the time of day on this client only. It is not synced: to give everyone the same time, send it from the server with a `Net` event and set it in each client.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| time | `number` | the time of day in hours, for example `8` for 8 AM |

**Returns:** nothing

**Example**

```lua
-- client: always morning
Event.Add("OnResourceStart", function()
	World.SetTime(8)
end)

-- client: follow the server's clock
Net.AddEvent("SetTime", function(hour)
	World.SetTime(hour)
end)
```

### World.GetTimescale() {#worldgettimescale}

Returns how fast game time runs on this client, `1` being normal speed.

**Side:** Client

**Parameters:** none

**Returns:** `number`

**Example**

```lua
print("time scale: " .. World.GetTimescale())
```

### World.SetTimescale(timescale) {#worldsettimescaletimescale}

Changes how fast the game runs on this client (slow motion below `1`, fast forward above `1`). Local only, not synced.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| timescale | `number` | the speed factor, `1` is normal speed |

**Returns:** nothing

**Example**

```lua
-- a short slow-motion effect
World.SetTimescale(0.3)

Timer.Set(function()
	World.SetTimescale(1)
end, 2000, 1)
```

### World.GetUpdateDeltaTime() {#worldgetupdatedeltatime}

Returns the duration of the current game update step in seconds.

**Side:** Client

**Parameters:** none

**Returns:** `number`: seconds

**Example**

```lua
local angle = 0

Event.Add("OnUpdate", function()
	angle = angle + 90 * World.GetUpdateDeltaTime() -- 90 degrees per second
end)
```

### World.GetRenderDeltaTime() {#worldgetrenderdeltatime}

Returns the duration of the last rendered frame in seconds.

**Side:** Client

**Parameters:** none

**Returns:** `number`: seconds

**Example**

```lua
Event.Add("OnRender", function()
	local fps = 1 / math.max(World.GetRenderDeltaTime(), 0.0001)
end)
```

### World.GetGravity() {#worldgetgravity}

Returns the physics gravity on this client.

**Side:** Client

**Parameters:** none

**Returns:** `vec3`: the gravity acceleration vector (pointing down for normal gravity).

**Example**

```lua
print("gravity: " .. tostring(World.GetGravity()))
```

### World.SetGravity(gravity) {#worldsetgravitygravity}

Changes the physics gravity in this client's game. Local only: objects owned by this player fall differently, and since the owner's game simulates objects (see [Ownership](../shared/world.md#ownership-who-simulates-an-object)), others see that result. For a consistent experience, set the same gravity on every client.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| gravity | `vec3` | the gravity acceleration vector |

**Returns:** nothing

**Example**

```lua
local normal = World.GetGravity()

-- moon gravity
World.SetGravity(normal * (1 / 6))
```

### World.SetWaypoint(position) {#worldsetwaypointposition}

Places the player's map waypoint at a position, as if they had placed it on the map. Local only.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | where to place the waypoint |

**Returns:** nothing

**Example**

```lua
Net.AddEvent("MarkTarget", function(position)
	World.SetWaypoint(position)
end)
```

### World.ClearWaypoint() {#worldclearwaypoint}

Removes the player's map waypoint.

**Side:** Client

**Parameters:** none

**Returns:** nothing

**Example**

```lua
World.ClearWaypoint()
```

### World.GetWaypoint() {#worldgetwaypoint}

Returns the player's map waypoint as a game object.

**Side:** Client

**Parameters:** none

**Returns:** a `POI` game object (see [Game objects](./game-objects.md#poi)), or `nil` when no waypoint is placed.

**Example**

```lua
local waypoint = World.GetWaypoint()

if waypoint then
	print("waypoint at " .. tostring(waypoint:GetPosition()))
end
```

### World.GetWaypointPosition() {#worldgetwaypointposition}

Returns the position of the player's map waypoint.

**Side:** Client

**Parameters:** none

**Returns:** `vec3`: the waypoint's position, or `vec3(0, 0, 0)` when no waypoint is placed.

**Example**

```lua
-- send the waypoint to the server so it can teleport the player there
Cmd.Add("tpwp", function()
	local position = World.GetWaypointPosition()

	if position:length() > 0 then
		Net.Send("TeleportTo", position)
	end
end)
```

### World.GetWaterLevel(position) {#worldgetwaterlevelposition}

Returns the height of the water surface at a position (oceans, lakes, rivers and waterfalls).

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | where to look for water |

**Returns:** two values: `number` the water surface height, and `boolean` `true` when the water there is a waterfall.

**Example**

```lua
local position = World.LocalPlayer():GetPosition()
local level, isWaterfall = World.GetWaterLevel(position)

if position.y < level then
	print(isWaterfall and "in a waterfall" or "under water")
end
```

### World.SpawnPOI(position, type, displayMode, minDistance, maxDistance) {#worldspawnpoiposition-type-displaymode-mindistance-maxdistance}

Places a point of interest marker (an icon in the world and/or on the map with a distance label and GPS route) for this player only. Not synced.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | where the marker is |
| type | [`POIType`](../shared/enums/poi.md#poitype) | the icon, for example `POIType.UserPlaced` or `POIType.SupplyDrop` |
| displayMode | [`POIDisplayMode`](../shared/enums/poi.md#poidisplaymode) | `World`, `Map` or `WorldAndMap` |
| minDistance | `number` | the distance in meters from which the marker is shown |
| maxDistance | `number` | the distance in meters up to which the marker (and its distance label) is shown |

**Returns:** a `POI` game object (see [Game objects](./game-objects.md#poi)). It is removed when the resource stops, or with its `Destroy` method.

**Example**

```lua
local marker = World.SpawnPOI(vec3(1200, 30, -800), POIType.SupplyDrop, POIDisplayMode.WorldAndMap, 0, 5000)

-- later
marker:Destroy()
```

### World.SpawnWaterBox(position, size, style) {#worldspawnwaterboxposition-size-style}

Creates a box of water in this client's game (players can swim in it, boats float). Local only, not synced: spawn the same box on every client for a shared pool.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | the box's position |
| size | `vec3` | the box's size in meters |
| style | [`WaterBoxStyle`](./enums/water-box-style.md) | `ClipToTerrain`, `NoClip` or `ShrinkWrap` |

**Returns:** a `WaterBox` game object (see [Game objects](./game-objects.md#waterbox)), or `nil` if the game could not create it. It is removed when the resource stops, or with its `Destroy` method.

**Example**

```lua
local pool = World.SpawnWaterBox(World.LocalPlayer():AsPlayer():GetAimPosition(), vec3(10, 5, 10), WaterBoxStyle.NoClip)

if pool then
	Timer.Set(function() pool:Destroy() end, 60000, 1)
end
```

### World.SpawnForcePulse(position, tuning, radius, category, velocity, pressure) {#worldspawnforcepulseposition-tuning-radius-category-velocity-pressure}

Creates a force pulse (the physical push of an explosion, without the visual effect) in this client's game. It does nothing until you call its `Explode` method. Local only, not synced: for a synced explosion use [World.SpawnExplosion](../server/world.md#worldspawnexplosionposition-entity) on the server.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | the pulse's center |
| tuning | [`ForcePulseTuning`](./enums/force-pulse.md#forcepulsetuning) | the game's tuning preset, for example `ForcePulseTuning.Generic5m` |
| radius | `number` | the radius in meters |
| category | [`ForcePulseCategory`](./enums/force-pulse.md#forcepulsecategory) | the kind of explosion, for example `ForcePulseCategory.Manual` |
| velocity | `number` | the explosion velocity |
| pressure | `number` | the explosion pressure |

**Returns:** a `ForcePulse` game object (see [Game objects](./game-objects.md#forcepulse)), or `nil` if the game could not create it. It is removed when the resource stops, or with its `Destroy` method.

**Example**

```lua
local pulse = World.SpawnForcePulse(World.LocalPlayer():GetPosition(), ForcePulseTuning.Generic10m, 10, ForcePulseCategory.Manual, 20, 5)

if pulse then
	pulse:Explode()
end
```