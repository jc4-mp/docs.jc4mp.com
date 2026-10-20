---
sidebar_position: 30
---

# VehiclePart, VehiclePartState, VehicleSeat and VehicleType

These tables describe vehicles: their moving parts such as doors and hatches (`VehiclePart`) and whether those are open (`VehiclePartState`), the seats a player can sit in (`VehicleSeat`), and the kind of vehicle (`VehicleType`).

**Available on:** Server, Client

## Values {#values}

### VehiclePart {#vehiclepart}

The articulated (moving) parts of a vehicle. A vehicle only has some of them: a car has doors, a trunk and a hood, an airplane may have a cargo bay door or folding wings. Setting a part the vehicle doesn't have does nothing visible.

Used by (see [VehicleHandle](../objects/vehicle.md)):

- `vehicle:GetPartState(part)` (server and client)
- `vehicle:SetPartState(part, state)` (server, synced to every player)
- The client event [`OnVehiclePartChangedState(vehicle, part, state)`](../../client/events.md)

Any value outside 0..15 raises the Lua error `invalid vehicle part <n>`.

| Name | Value | Meaning |
|---|---|---|
| `VehiclePart.FrontLeft` | 0 | The driver's door (front left). |
| `VehiclePart.FrontRight` | 1 | The front passenger's door (front right). |
| `VehiclePart.RearLeft` | 2 | The rear left passenger door. |
| `VehiclePart.RearRight` | 3 | The rear right passenger door. |
| `VehiclePart.CenterLeft` | 4 | The center left passenger door. |
| `VehiclePart.CenterRight` | 5 | The center right passenger door. |
| `VehiclePart.TurretDoor` | 6 | The turret door (hatch). |
| `VehiclePart.Trunk` | 7 | The trunk. |
| `VehiclePart.Hood` | 8 | The hood. |
| `VehiclePart.RearDoor` | 9 | The rear door. |
| `VehiclePart.CargoBayDoor` | 10 | The cargo bay door of a cargo aircraft or helicopter. |
| `VehiclePart.FoldingWing` | 11 | Folding wings. |
| `VehiclePart.MissileHatch` | 12 | The missile hatch. |
| `VehiclePart.TrailerLandingGear` | 13 | A trailer's landing gear (the legs it stands on when unhitched). |
| `VehiclePart.VTOL` | 14 | The VTOL (vertical take-off) rotors or nozzles. |
| `VehiclePart.EngineOperated` | 15 | A part that is open while the engine runs and closed while it doesn't. |

### VehiclePartState {#vehiclepartstate}

The state of a vehicle part.

Used by (see [VehicleHandle](../objects/vehicle.md)):

- `vehicle:GetPartState(part)` returns one of these (server and client)
- `vehicle:SetPartState(part, state)` (server). It accepts the integers 0 to 4; anything else raises the Lua error `invalid vehicle part state <n>`. On the players' games only `Open` makes a difference: `VehiclePartState.Open` opens the part, and every other state closes it. `GetPartState` returns the state exactly as it was set.
- The client event [`OnVehiclePartChangedState(vehicle, part, state)`](../../client/events.md). When the change comes from the game itself (a player opening a door, for example) `state` is `Open` or `Closed`.

| Name | Value | Meaning |
|---|---|---|
| `VehiclePartState.Open` | 0 | The part is open. |
| `VehiclePartState.Opening` | 1 | The part is opening. |
| `VehiclePartState.Closing` | 2 | The part is closing. |
| `VehiclePartState.Missing` | 3 | The part is gone, for example a door that was torn off. |
| `VehiclePartState.Closed` | 4 | The part is closed. |

### VehicleSeat {#vehicleseat}

The seats of a vehicle, and the stunt and entry positions on it. Which ones exist depends on the vehicle model.

Used by:

- [`player:WarpIntoVehicle(vehicle, seat)`](../../server/objects/player.md) (server). It accepts the integers 0 to 41; anything else raises the Lua error `invalid vehicle seat <n>`.
- The events [`OnPlayerVehicleEnter`](../../server/events.md) and [`OnPlayerVehicleExit`](../../server/events.md), whose seat argument is one of these values.

| Name | Value | Meaning |
|---|---|---|
| `VehicleSeat.DriverSeat` | 0 | The driver's seat. |
| `VehicleSeat.PassengerSeat1` | 1 | The front passenger seat (next to the driver). |
| `VehicleSeat.PassengerSeat2` | 2 | The seat behind the driver. |
| `VehicleSeat.PassengerSeat3` | 3 | The seat behind the front passenger. |
| `VehicleSeat.PassengerSeat4` | 4 | The back left seat. |
| `VehicleSeat.PassengerSeat5` | 5 | The back right seat. |
| `VehicleSeat.PassengerSeat6` | 24 | A sixth passenger seat. |
| `VehicleSeat.GunnerSeat` | 6 | The gunner's seat (a mounted weapon on the vehicle). |
| `VehicleSeat.GunnerSeat2` | 7 | The second gunner's seat. |
| `VehicleSeat.StuntSeat` | 8 | A stunt position (standing on the vehicle). |
| `VehicleSeat.FrontStunt` | 9 | The stunt position at the front of the vehicle. |
| `VehicleSeat.DriverSide` | 10 | The driver's side entry point (counts as the driver's seat once inside). |
| `VehicleSeat.StuntSide` | 11 | The stunt position on the side of the vehicle (counts as the driver's seat once inside). |
| `VehicleSeat.RearStunt` | 12 | The stunt position at the rear of the vehicle. |
| `VehicleSeat.LeftStunt` | 13 | The stunt position on the left of the vehicle. |
| `VehicleSeat.RightStunt` | 14 | The stunt position on the right of the vehicle. |
| `VehicleSeat.DriverOnGround` | 15 | The driver's entry point from the ground (counts as the driver's seat once inside). |
| `VehicleSeat.DriverOnGroundRight` | 16 | The driver's entry point from the ground on the right side (counts as the driver's seat once inside). |
| `VehicleSeat.DriverSideRight` | 17 | The driver's entry point on the right side (counts as the driver's seat once inside). |
| `VehicleSeat.PassengerSide` | 18 | The front passenger's side entry point (counts as `PassengerSeat1` once inside). |
| `VehicleSeat.PassengerOnGround` | 19 | The front passenger's entry point from the ground (counts as `PassengerSeat1` once inside). |
| `VehicleSeat.CargoBayDriverDoor` | 28 | The driver's entry through the cargo bay. |
| `VehicleSeat.GunnerDetached` | 39 | A gunner position detached from the vehicle body. |
| `VehicleSeat.GunnerDetached2` | 40 | A second gunner position detached from the vehicle body. |
| `VehicleSeat.UseItem` | 25 | The position for using an item mounted on the vehicle. |
| `VehicleSeat.FakeStuntPoint` | 41 | A stunt position that isn't a real seat. |

### VehicleType {#vehicletype}

The kind of vehicle. The values are 32-bit hashes, not small integers: always compare against the table.

Used by:

- [`vehicle:GetVehicleType()`](../../client/objects/vehicle.md) (client, while the vehicle is spawned in the player's game) returns one of these, or `nil` while the vehicle isn't spawned in the local game. A vehicle the game doesn't classify returns a value that is not in the table.

| Name | Value | Meaning |
|---|---|---|
| `VehicleType.Motorbike` | `0x0847F3D0` | Motorbikes. |
| `VehicleType.Car` | `0x25651EF2` | Land vehicles: cars, trucks, tanks and other wheeled or tracked vehicles. |
| `VehicleType.SeaVehicle` | `0x6FA8D546` | Boats and other sea vehicles. |
| `VehicleType.Airplane` | `0xCC9B20E3` | Airplanes and jets. |
| `VehicleType.Helicopter` | `0x37777B4C` | Helicopters. |
| `VehicleType.Dirigible` | `0x30CD5569` | Airships. |

**Example**

```lua
-- server: spawn a car, put a player in the driver's seat and open the trunk
Event.Add("OnPlayerJoin", function(client)
	local player = client:GetPlayer()
	if not player then
		return
	end

	player = player:AsPlayer()

	local car = World.SpawnVehicle("v025_car_vintagesuper_civilian_01", player:GetPosition() + vec3(5, 0, 0))

	Timer.Set(function()
		if player:WarpIntoVehicle(car, VehicleSeat.DriverSeat) then
			car:SetPartState(VehiclePart.Trunk, VehiclePartState.Open)
		end
	end, 1000, 1)
end)

Event.Add("OnPlayerVehicleExit", function(player, vehicle, seat)
	if seat == VehicleSeat.DriverSeat then
		print("the driver got out")
	end
end)
```

```lua
-- client: tell the kind of vehicle the local player is in
Cmd.Add("vehicletype", function()
	local player = World.LocalPlayer()
	local vehicle = player and player:AsPlayer():GetVehicle()

	if vehicle and vehicle:GetVehicleType() == VehicleType.Helicopter then
		print("you are flying a helicopter")
	end
end)
```