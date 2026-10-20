---
sidebar_position: 16
---

# VehicleHandle

A `VehicleHandle` refers to a networked vehicle: cars, bikes, boats, planes, helicopters and drones. You get one from [World.SpawnVehicle](../../server/world.md#worldspawnvehiclemodel-position-rotation-health), from vehicle events (`OnPlayerVehicleEnter`, `OnVehicleDamage`, `OnVehicleDestroy`, ...; see [Server events](../../server/events.md) and [Client events](../../client/events.md)), from `player:GetVehicle()`, or by casting an [ObjectHandle](./object-handle.md) with `AsVehicle()`.

Use it to read and change the vehicle's paint, doors and lock state on the server, to command drones, and on the client to read the vehicle's driving state.

**Available on:** Server, Client

**See also:** [VehicleHandle (server)](../../server/objects/vehicle.md), [VehicleHandle (client)](../../client/objects/vehicle.md)

A `VehicleHandle` is also an [ObjectHandle](./object-handle.md): position, rotation, velocity, health, script data and the casts work on it too (see that page). If the vehicle no longer exists, or on a client is not streamed in (see [Streaming](../world.md#streaming-objects-only-exist-where-they-are-needed)), every setter does nothing and every getter returns `nil`.

The vehicle's paint, part states, lock state and drone orders are kept on the server and sent to every player who sees the vehicle, including players who come into range later.

## Methods {#methods}

### vehicle\:GetId() {#vehiclegetid}

Returns the model name the vehicle was spawned with.

**Side:** Server, Client

**Parameters:** none

**Returns:** `string`, for example `"v017_car_vintagemuscle_civilian"` (see [Vehicles](../../lists/vehicles.md)), or `nil` if the vehicle is gone.

**Example**

```lua
Event.Add("OnPlayerVehicleEnter", function(player, vehicle, seat)
	print("entered a " .. vehicle:GetId())
end)
```

### vehicle\:GetPrimaryColor() {#vehiclegetprimarycolor}

### vehicle\:GetSecondaryColor() {#vehiclegetsecondarycolor}

### vehicle\:GetTertiaryColor() {#vehiclegettertiarycolor}

Return the paint tints last set with the matching setter. On a client they return the synced value.

**Side:** Server, Client

**Parameters:** none

**Returns:** `vec3` with the color in `x` (red), `y` (green), `z` (blue), or `nil` if the vehicle is gone.

**Example**

```lua
-- copy the paint of one vehicle onto another
local c1, c2, c3 = source:GetPrimaryColor(), source:GetSecondaryColor(), source:GetTertiaryColor()

target:SetPrimaryColor(c1.x, c1.y, c1.z)
target:SetSecondaryColor(c2.x, c2.y, c2.z)
target:SetTertiaryColor(c3.x, c3.y, c3.z)
```

### vehicle\:GetSpecularGloss() {#vehiclegetspeculargloss}

### vehicle\:GetClearCoat() {#vehiclegetclearcoat}

### vehicle\:GetMetallic() {#vehiclegetmetallic}

Return the paint values last set with the matching setter (or the defaults: gloss `1`, clear coat `0.5`, metallic `1`).

**Side:** Server, Client

**Parameters:** none

**Returns:** `number`, or `nil` if the vehicle is gone.

**Example**

```lua
print(string.format("gloss %.2f, clear coat %.2f, metallic %.2f", vehicle:GetSpecularGloss(), vehicle:GetClearCoat(), vehicle:GetMetallic()))
```

### vehicle\:GetDirt() {#vehiclegetdirt}

Returns the dirt amount last set with [SetDirt](../../server/objects/vehicle.md#vehiclesetdirtamount).

**Side:** Server, Client

**Parameters:** none

**Returns:** `number`, or `nil` if the vehicle is gone.

**Example**

```lua
if vehicle:GetDirt() > 0.5 then
	vehicle:SetDirt(0)
end
```

### vehicle\:GetPartState(part) {#vehiclegetpartstatepart}

Returns the last known state of one of the vehicle's parts, whether a script or a player changed it. All parts start `Closed`.

**Side:** Server, Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| part | [`VehiclePart`](../enums/vehicle.md#vehiclepart) | the part to read |

**Returns:** [`VehiclePartState`](../enums/vehicle.md#vehiclepartstate) value (integer), or `nil` if the vehicle is gone.

**Example**

```lua
if vehicle:GetPartState(VehiclePart.Trunk) == VehiclePartState.Open then
	print("the trunk is open")
end
```