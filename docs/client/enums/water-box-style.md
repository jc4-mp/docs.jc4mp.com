---
sidebar_position: 86
---

# WaterBoxStyle

`WaterBoxStyle` picks how a water box (a block of water you spawn in the world, like a pool or a flood) is fitted to the terrain around it.

**Available on:** Client

## Values {#values}

### WaterBoxStyle {#waterboxstyle}

Used by [`World.SpawnWaterBox(position, size, style)`](../world.md) (client). The water box only exists in the local game; it is not synced to other players, so spawn it on every client that should see it.

| Name | Value | Meaning |
|---|---|---|
| `WaterBoxStyle.ClipToTerrain` | 0 | The water is cut off where the terrain rises above it, so it doesn't show inside hills. |
| `WaterBoxStyle.NoClip` | 1 | The whole box is water, whatever the terrain does. |
| `WaterBoxStyle.ShrinkWrap` | 2 | The water is fitted closely around the terrain inside the box. |

**Example**

```lua
-- client: flood an area next to the local player for 30 seconds
Cmd.Add("flood", function()
	local player = World.LocalPlayer()
	if not player then
		return
	end

	local box = World.SpawnWaterBox(player:GetPosition() + vec3(0, 0, 60), vec3(100, 20, 100), WaterBoxStyle.ClipToTerrain)

	if box then
		Timer.Set(function()
			box:Destroy()
		end, 30000, 1)
	end
end)
```