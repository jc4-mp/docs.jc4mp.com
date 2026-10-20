---
sidebar_position: 70
---

# NavMesh

The `NavMesh` table reads the game's navigation mesh: the walkable surface the game's AI uses to find paths on foot. Use it to check whether a point is reachable on foot, to snap positions to walkable ground (for spawn points, NPC destinations or checkpoints), or to visualize the walkable area.

**Available on:** Client

The navmesh is streamed: only the 3 x 3 tiles of 512 m around the camera are loaded at any time (about 1.5 km x 1.5 km). Everything outside that area is invisible to these functions, and results near the edge can change as the camera moves. For the road and sidewalk network of the whole map, see [RoadGraph](./road-graph.md).

## Functions {#functions}

### NavMesh.GetClosestPosition(position, maxDistance) {#navmeshgetclosestpositionposition-maxdistance}

Finds the closest point on the loaded navmesh to `position`, searching at most `maxDistance` away.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | World position to search from. |
| maxDistance | `number` | Search radius, in meters. |

**Returns** `vec3` (a point on the navmesh) or `nil` when there is no navmesh within `maxDistance`, or no navmesh loaded.

**Example**

```lua
-- is the point the player aims at walkable?
Cmd.Add("walkable", function()
	local target = World.LocalPlayer():AsPlayer():GetAimPosition()
	local on_mesh = NavMesh.GetClosestPosition(target, 1)

	print(on_mesh and "walkable" or "not walkable")
end)
```

### NavMesh.GetVertices(position, radius) {#navmeshgetverticesposition-radius}

Returns every vertex (polygon corner) of the loaded navmesh within `radius` of `position`. The distance is measured in 3D. Large radii in dense areas can return many thousands of points, so keep the radius small if you call this often.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | Center of the search. |
| radius | `number` | Search radius, in meters. |

**Returns** `table`: a list (1-based array) of `vec3` positions, empty when none is found.

**Example**

```lua
-- draw the navmesh vertices around the camera
Event.Add("OnRender", function()
	for _, vertex in ipairs(NavMesh.GetVertices(Camera.GetPosition(), 30)) do
		Render.DrawSphere(vertex, 0.1, vec4(0, 0.6, 1, 1), false)
	end
end)
```

### NavMesh.GetPolygons(position, radius) {#navmeshgetpolygonsposition-radius}

Returns the navmesh polygons that have at least one corner within `radius` of `position` (measured in 3D). Each polygon is given as its corners in order around its edge, so consecutive corners (and the last and first) form its sides.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | Center of the search. |
| radius | `number` | Search radius, in meters. |

**Returns** `table`: a list of polygons, each a list of `vec3` corners. Empty when none is found.

**Example**

```lua
-- count the walkable polygons around the player and their area
Cmd.Add("navinfo", function()
	local polygons = NavMesh.GetPolygons(World.LocalPlayer():GetPosition(), 20)
	local area = 0

	for _, corners in ipairs(polygons) do
		-- triangle fan from the first corner, area on the horizontal plane
		for i = 2, #corners - 1 do
			local a, b, c = corners[1], corners[i], corners[i + 1]
			area = area + math.abs((b.x - a.x) * (c.z - a.z) - (c.x - a.x) * (b.z - a.z)) / 2
		end
	end

	print(string.format("%d polygons, %.0f square meters", #polygons, area))
end)
```