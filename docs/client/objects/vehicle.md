---
sidebar_position: 56
---

# VehicleHandle (client)

On the client, a [`VehicleHandle`](../../shared/objects/vehicle.md) also reads the vehicle's driving state in the local player's game and changes local-only settings such as its cloak and lights.

**Available on:** Client

**See also:** [VehicleHandle](../../shared/objects/vehicle.md), [VehicleHandle (server)](../../server/objects/vehicle.md)

## Methods {#methods}

These read or change the vehicle in the local player's game. They return `nil` (or do nothing) while the vehicle is not spawned in this game: when it is out of range, or for a moment right after it streams in. Setters here are local only and not synced.

### vehicle\:IsInAir() {#vehicleisinair}

Returns whether the vehicle is airborne (no contact with the ground).

**Side:** Client

**Parameters:** none

**Returns:** `boolean`, or `nil` if the vehicle is not spawned here.

**Example**

```lua
local airTime = 0

Event.Add("OnUpdate", function()
	local vehicle = World.LocalPlayer():AsPlayer():GetVehicle()

	if vehicle and vehicle:IsInAir() then
		airTime = airTime + World.GetUpdateDeltaTime()
	else
		airTime = 0
	end
end)
```

### vehicle\:GetNumberOfWheelsOnGround() {#vehiclegetnumberofwheelsonground}

Returns how many of the vehicle's wheels touch the ground.

**Side:** Client

**Parameters:** none

**Returns:** `integer`, or `nil` if the vehicle is not spawned here.

**Example**

```lua
if vehicle:GetNumberOfWheelsOnGround() == 2 then
	print("wheelie!")
end
```

### vehicle\:IsWheelDrifting(wheel, threshold) {#vehicleiswheeldriftingwheel-threshold}

Returns whether a wheel is skidding: its skid mark amount is above `threshold`.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| wheel | `integer` | the wheel index, starting at `0` (the order depends on the model) |
| threshold | `number` | the skid amount above which the wheel counts as drifting, clamped to `0..1` |

**Returns:** `boolean`, or `nil` if the vehicle is not spawned here.

**Example**

```lua
local drifting = vehicle:IsWheelDrifting(2, 0.5) or vehicle:IsWheelDrifting(3, 0.5)
```

### vehicle\:GetVehicleType() {#vehiclegetvehicletype}

Returns the kind of vehicle.

**Side:** Client

**Parameters:** none

**Returns:** [`VehicleType`](../../shared/enums/vehicle.md#vehicletype) value (`Motorbike`, `Car`, `SeaVehicle`, `Airplane`, `Helicopter`, `Dirigible`), or `nil` if the vehicle is not spawned here.

**Example**

```lua
if vehicle:GetVehicleType() == VehicleType.Helicopter then
	print("chopper")
end
```

### vehicle\:IsHornPlaying() {#vehicleishornplaying}

Returns whether the vehicle's horn is sounding.

**Side:** Client

**Parameters:** none

**Returns:** `boolean`, or `nil` if the vehicle is not spawned here.

**Example**

```lua
if vehicle:IsHornPlaying() then
	print("beep")
end
```

### vehicle\:SetCloak(enable) {#vehiclesetcloakenable}

Turns the vehicle's cloak (the game's invisibility effect) on or off in this player's game only.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| enable | `boolean` | `true` to cloak |

**Returns:** nothing

**Example**

```lua
vehicle:SetCloak(true)
```

### vehicle\:IsCloaked() {#vehicleiscloaked}

Returns whether the vehicle is cloaked in this player's game.

**Side:** Client

**Parameters:** none

**Returns:** `boolean`, or `nil` if the vehicle is not spawned here.

**Example**

```lua
vehicle:SetCloak(not vehicle:IsCloaked())
```

### vehicle\:UseLight(index, on) {#vehicleuselightindex-on}

Turns one of the vehicle's lights on or off in this player's game only.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| index | `integer` | the light's index; which lights exist depends on the model |
| on | `boolean` | `true` to turn it on, `false` to turn it off |

**Returns:** nothing

**Example**

```lua
-- flash light 0 every half second
local on = false

Timer.Set(function()
	on = not on
	vehicle:UseLight(0, on)
end, 500, 20)
```

### vehicle\:GetTrailingVehicle() {#vehiclegettrailingvehicle}

Returns the vehicle this one is towing (for example a trailer), if it is a networked vehicle.

**Side:** Client

**Parameters:** none

**Returns:** `VehicleHandle`, or `nil` when it tows nothing, the towed vehicle is not networked, or this vehicle is not spawned here.

**Example**

```lua
local trailer = vehicle:GetTrailingVehicle()

if trailer then
	print("towing a " .. trailer:GetId())
end
```

### vehicle\:GetAABB() {#vehiclegetaabb}

Returns the vehicle's bounding box in world space.

**Side:** Client

**Parameters:** none

**Returns:** `AABB` (with `min` and `max` `vec3`s, see [Math](../../shared/math.md)), or `nil` if the vehicle is not spawned here.

**Example**

```lua
local box = vehicle:GetAABB()

if box then
	print("vehicle spans from " .. tostring(box.min) .. " to " .. tostring(box.max))
end
```

### vehicle\:GetLocalAABB() {#vehiclegetlocalaabb}

Returns the vehicle's bounding box in its own model space (not moved or turned with the vehicle).

**Side:** Client

**Parameters:** none

**Returns:** `AABB`, or `nil` if the vehicle is not spawned here.

**Example**

```lua
local box = vehicle:GetLocalAABB()
local length = box.max.z - box.min.z
```