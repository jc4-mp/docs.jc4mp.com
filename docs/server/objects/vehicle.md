---
sidebar_position: 45
---

# VehicleHandle (server)

On the server, a [`VehicleHandle`](../../shared/objects/vehicle.md) changes the vehicle's paint, doors and lock state, and commands drones. These changes are synced to every player who sees the vehicle.

**Available on:** Server

**See also:** [VehicleHandle](../../shared/objects/vehicle.md), [VehicleHandle (client)](../../client/objects/vehicle.md)

## Methods {#methods}

### vehicle\:SetPrimaryColor(r, g, b) {#vehiclesetprimarycolorr-g-b}

Sets the vehicle's first paint tint (the main body color on most vehicles). Synced to everyone who sees the vehicle.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| r | `number` | red, normally `0` to `1` |
| g | `number` | green, normally `0` to `1` |
| b | `number` | blue, normally `0` to `1` |

**Returns:** nothing

**Notes:** values are not clamped; a non-finite value raises a Lua error. A newly spawned vehicle has all three tints at `(0, 0, 0)`.

**Example**

```lua
local vehicle = World.SpawnVehicle("v017_car_vintagemuscle_civilian", vec3(0, 200, 0))

vehicle:SetPrimaryColor(math.random(), math.random(), math.random())
```

### vehicle\:SetSecondaryColor(r, g, b) {#vehiclesetsecondarycolorr-g-b}

Sets the vehicle's second paint tint (secondary parts or stripes, depending on the model). Synced. Same rules as [SetPrimaryColor](#vehiclesetprimarycolorr-g-b).

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| r | `number` | red, normally `0` to `1` |
| g | `number` | green, normally `0` to `1` |
| b | `number` | blue, normally `0` to `1` |

**Returns:** nothing

**Example**

```lua
vehicle:SetSecondaryColor(1, 1, 1)
```

### vehicle\:SetTertiaryColor(r, g, b) {#vehiclesettertiarycolorr-g-b}

Sets the vehicle's third paint tint (details, depending on the model). Synced. Same rules as [SetPrimaryColor](#vehiclesetprimarycolorr-g-b).

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| r | `number` | red, normally `0` to `1` |
| g | `number` | green, normally `0` to `1` |
| b | `number` | blue, normally `0` to `1` |

**Returns:** nothing

**Example**

```lua
vehicle:SetTertiaryColor(0.1, 0.1, 0.1)
```

### vehicle\:SetSpecularGloss(value) {#vehiclesetspecularglossvalue}

Sets how glossy the paint is. Synced.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| value | `number` | the gloss, normally `0` to `1`. The default is `1` |

**Returns:** nothing

**Example**

```lua
vehicle:SetSpecularGloss(0.2) -- matte look
```

### vehicle\:SetClearCoat(value) {#vehiclesetclearcoatvalue}

Sets the strength of the paint's clear coat layer. Synced.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| value | `number` | the clear coat, normally `0` to `1`. The default is `0.5` |

**Returns:** nothing

**Example**

```lua
vehicle:SetClearCoat(1)
```

### vehicle\:SetMetallic(value) {#vehiclesetmetallicvalue}

Sets how metallic the paint is. Synced.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| value | `number` | the metallic factor, normally `0` to `1`. The default is `1` |

**Returns:** nothing

**Example**

```lua
vehicle:SetMetallic(math.random(0, 100) / 100)
```

### vehicle\:SetDirt(amount) {#vehiclesetdirtamount}

Sets how dirty the vehicle looks. Synced.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| amount | `number` | the dirt amount, `0` is clean (the default), normally up to `1` |

**Returns:** nothing

**Example**

```lua
-- a freshly washed car
vehicle:SetDirt(0)
```

### vehicle\:SetLocked(locked) {#vehiclesetlockedlocked}

Locks or unlocks the vehicle's doors: players cannot get into a locked vehicle. Synced to everyone who sees the vehicle.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| locked | `boolean` | `true` to lock, `false` to unlock |

**Returns:** nothing

**Example**

```lua
-- a vehicle only for its owner: lock it, and warp the owner in
local vehicle = World.SpawnVehicle("v017_car_vintagemuscle_civilian", position)

vehicle:SetLocked(true)
player:WarpIntoVehicle(vehicle, VehicleSeat.DriverSeat)
```

### vehicle\:SetPartState(part, state) {#vehiclesetpartstatepart-state}

Opens or closes one of the vehicle's articulated parts (doors, trunk, hood, cargo bay, folding wings, ...). Synced to everyone who sees the vehicle; each client fires `OnVehiclePartChangedState` (see [Client events](../../client/events.md)) when it applies a change. Players opening and closing parts in their own game are synced the same way.

`VehiclePartState.Open` opens the part; every other state closes it. A part the model does not have is ignored by the game.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| part | [`VehiclePart`](../../shared/enums/vehicle.md#vehiclepart) | the part, for example `VehiclePart.FrontLeft` (driver door), `Trunk`, `Hood`, `CargoBayDoor` |
| state | [`VehiclePartState`](../../shared/enums/vehicle.md#vehiclepartstate) | `Open`, `Opening`, `Closing` or `Closed` |

**Returns:** nothing

**Notes:** a part or state out of range raises a Lua error.

**Example**

```lua
-- open every door of a parked car
for _, part in ipairs({ VehiclePart.FrontLeft, VehiclePart.FrontRight, VehiclePart.RearLeft, VehiclePart.RearRight }) do
	vehicle:SetPartState(part, VehiclePartState.Open)
end
```

## Drone methods {#drone-methods}

Drones are vehicles whose driver seat is flown by the game's AI, for example `v254_helicopter_guarddrone_rebel`, `v250_helicopter_mediumattackdrone_rebel` or `v251_helicopter_rocketdrone_rebel` (see [Vehicles](../../lists/vehicles.md)). Spawn one with [World.SpawnVehicle](../world.md#worldspawnvehiclemodel-position-rotation-health) and give it orders with these methods. They do nothing on vehicles without an AI driver seat.

A drone has two orders, a **destination** and an **aim**, plus a **firing** switch:

- It flies toward its destination (at most 25 m/s, correcting its height more eagerly than its horizontal position) and hovers once it is within 1 m. A destination can be a fixed position or a moving object plus an offset.
- While it has an aim it turns to face it (its weapons only turn so far) and, while firing is on, fires at it. An aim can also be a position or an object plus an offset.
- An order whose object is not streamed in on the owner's game is ignored until it is: the drone stays where it is, or does not aim.
- With neither order set, the game's AI is left alone.

The AI runs in the game of the drone's owner (see [Ownership](../../shared/world.md#ownership-who-simulates-an-object)); the orders are kept on the server and sent to everyone who sees the drone, so a new owner continues them. All drone methods do nothing once the drone is destroyed (health `0`).

Offsets are in world axes (not turned with the target): `vec3(0, 6, 0)` is always 6 m above the target.

### vehicle\:DroneFlyTo(position) {#vehicledroneflytoposition}

Sends the drone to a fixed position, where it then hovers. Replaces any follow order.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | the destination in meters. `vec3(0, 0, 0)` clears the destination |

**Returns:** nothing

**Example**

```lua
-- hold position
drone:DroneFlyTo(drone:GetPosition())

-- fly 30 m above a spot
drone:DroneFlyTo(spot + vec3(0, 30, 0))
```

### vehicle\:DroneFollow(target, offset) {#vehicledronefollowtarget-offset}

Makes the drone follow an object (a player, vehicle, NPC, ...), staying at `offset` from it. Replaces any fly-to order. Does nothing if `target` no longer exists.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| target | `ObjectHandle` | the object to follow |
| offset | `vec3` | where to stay relative to the target's position, in world axes |

**Returns:** nothing

**Example**

```lua
-- a ring of drones over the player's head
local function ring(i, n, radius, height)
	local angle = 2 * math.pi * (i - 1) / n

	return vec3(math.cos(angle) * radius, height, math.sin(angle) * radius)
end

for i, drone in ipairs(drones) do
	drone:DroneFollow(player, ring(i, #drones, 5, 6))
end
```

### vehicle\:DroneAimAt(position) {#vehicledroneaimatposition}

### vehicle\:DroneAimAt(target, offset) {#vehicledroneaimattarget-offset}

Makes the drone aim at a fixed position, or at an object plus an offset (only while that object is visible to the drone's owner). The drone fires at its aim while [DroneSetFiring](#vehicledronesetfiringenable) is on. The object form does nothing if `target` no longer exists.

**Side:** Server

**Parameters (position)**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | the point to aim at. `vec3(0, 0, 0)` clears the aim |

**Parameters (object)**

| Name | Type | Description |
|---|---|---|
| target | `ObjectHandle` | the object to aim at |
| offset | `vec3` | added to the target's position, in world axes. `vec3(0, 1.2, 0)` aims at a character's chest |

**Returns:** nothing

**Example**

```lua
-- hunt a player: aim at their chest and fire
drone:DroneAimAt(prey:GetPlayer(), vec3(0, 1.2, 0))
drone:DroneSetFiring(true)
```

### vehicle\:DroneStopAiming() {#vehicledronestopaiming}

Clears the drone's aim. It stops firing (firing needs an aim) and goes back to facing where it flies.

**Side:** Server

**Parameters:** none

**Returns:** nothing

**Example**

```lua
drone:DroneStopAiming()
drone:DroneSetFiring(false)
```

### vehicle\:DroneSetFiring(enable) {#vehicledronesetfiringenable}

Turns the drone's guns on or off. It only fires while it also has an aim.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| enable | `boolean` | `true` to fire at the aim, `false` to hold fire |

**Returns:** nothing

**Example**

```lua
Net.AddEvent("DronesFire", function(aim)
	for _, drone in ipairs(drones) do
		if aim then
			drone:DroneAimAt(aim)
		else
			drone:DroneStopAiming()
		end

		drone:DroneSetFiring(aim ~= nil)
	end
end)
```