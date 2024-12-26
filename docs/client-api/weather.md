# Weather

#### `Weather.StrikeLightning(position: vec3, color: vec3)`

Create a lightning strike at a position with the specified color (r, g, b). The color values should be in the range from 0 to 1.

Example usage:

```lua
-- resources/test/client/main.lua

Cmd.Add("lightning", function()
    Weather.StrikeLightning(vec3(1000, 1000, 1000), vec3(1, 0, 0)) -- Creates red lightning
end)

```
