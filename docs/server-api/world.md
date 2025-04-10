# World

Server-related APIs.

#### `World.SpawnVehicle(name: string, vec3: position): Vehicle`

Spawns a vehicle at the given position.

Example:
```lua
-- Spawn a car at the airport
World.SpawnVehicle("v024_car_ecosuper_racing_01", vec3(9503, 517, 8463))
```