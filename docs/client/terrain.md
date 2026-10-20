---
sidebar_position: 69
---

# Terrain

The `Terrain` table queries the island's ground (the heightmap terrain, not buildings or props) and lets you push the vegetation around. Use it to find the ground under a point without a physics raycast, for example to place objects or spawn points on the ground, and for cosmetic effects such as grass and trees bending away from a blast.

**Available on:** Client

Everything here is local to the calling client: nothing is sent to the server or to other players.

## Functions {#functions}

### Terrain.GetInfo(position) {#terraingetinfoposition}

Asks the game's terrain map about the ground at `position`. Only the terrain itself is considered: roads, buildings, rocks placed as objects, vehicles and water are ignored. To hit everything that has collision, use [`Physics.Raycast`](./physics.md#physicsraycastfrom-to-layer) instead.

When the game finds no terrain for the position, `hasHit` is `false`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | World position to query, in meters. Only its horizontal position (`x`, `z`) matters for finding the ground column. |

**Returns** a new `table` with these fields:

| Field | Type | Description |
|---|---|---|
| hasHit | `boolean` | `true` when the game found terrain for this position. When `false` the other fields are not meaningful. |
| hitPos | `vec3` | The point on the terrain surface the game found for `position`. |
| normal | `vec3` | The terrain's surface normal at `hitPos` (a unit vector pointing away from the ground; `vec3(0, 1, 0)` on flat ground). |
| height | `number` | The terrain height the game reports for this position, in meters. |

**Example**

```lua
-- put a marker sphere on the ground in front of the local player
Event.Add("OnRender", function()
	local player = World.LocalPlayer()
	if not player then return end

	local info = Terrain.GetInfo(player:GetPosition() + vec3(0, 0, 5))

	if info.hasHit then
		Render.DrawSphere(info.hitPos, 0.5, vec4(0, 1, 0, 0.6), false)

		-- how steep is the ground there, in degrees
		local slope = math.deg(math.acos(info.normal.y))
		print(string.format("ground at %.1f m, slope %.0f deg", info.hitPos.y, slope))
	end
end)
```

### Terrain.SpawnVegetationShockwave(position, startWidth, endWidth, startHeight, endHeight, duration, intensity, falloff) {#terrainspawnvegetationshockwaveposition-startwidth-endwidth-startheight-endheight-duration-intensity-falloff}

Starts a shockwave in the game's vegetation interaction system: grass, bushes and trees around `position` bend away from it, the same way they react to the game's own explosions. It is purely visual: it applies no force to objects, deals no damage and makes no sound. Combine it with [`FX.Spawn`](./fx.md#fxspawnname-position-rotation) or a [ForcePulse](./game-objects.md#forcepulse) for a full explosion.

The wave grows from its start size to its end size over `duration`. The arguments are handed to the game unchanged and their exact units are not documented: the sizes are most likely meters and the duration seconds, so start from the values in the example and tune by eye. All eight arguments are required.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | Center of the shockwave, in world coordinates. |
| startWidth | `number` | Width (radius) of the wave when it starts. |
| endWidth | `number` | Width (radius) of the wave when it ends. |
| startHeight | `number` | Height of the wave when it starts. |
| endHeight | `number` | Height of the wave when it ends. |
| duration | `number` | How long the wave takes to go from its start size to its end size. |
| intensity | `number` | How strongly the vegetation is pushed. |
| falloff | `number` | How quickly the push weakens away from the wave front. |

**Returns** nothing.

**Example**

```lua
-- press G to blow the grass away around the point the player aims at
Event.Add("OnKeyDown", function(key)
	if key ~= Key.G then return end

	local player = World.LocalPlayer():AsPlayer()
	local target = player:GetAimPosition()

	if target then
		Terrain.SpawnVegetationShockwave(target, 1, 25, 2, 6, 1.5, 1, 1)
	end
end)
```