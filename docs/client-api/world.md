# World

APIs related to the Just Cause 4 game world.

#### `World.SetTime(value: number)`

Sets the current world time. 12 is noon, and 0 is midnight.

Example usage:

#### `World.GetTime(): number`

Gets the current time of the world.

#### `World.SetTimescale(value: number)`

Sets the world timescale. This value determines how fast the day/night cycle runs. The default value is 1. Higher values make the day pass by quicker, and a value of 0 means that the time will never change.

#### `World.GetTimescale(): number`

Gets the current timescale of the world.

#### `World.SetGravity(value: vec3)`

Sets the world gravity. This affects everything in the world _except_ for regular player movement. If a player enters ragdoll, this will affect the ragdoll gravity.

Example usage to enable anti-gravity:
```lua
World.SetGravity(vec3(0,0,0))
```

#### `World.GetGravity(): vec3`

Gets the current gravity of the world. Default is `vec3(0, -9.8, 0)`.
