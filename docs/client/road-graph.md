---
sidebar_position: 71
---

# RoadGraph

The `RoadGraph` table reads the game's road graph: the network of roads, sea lanes, air routes, sidewalks and railways that the game's traffic follows (cars drive the land roads, civilians walk the pedestrian paths on the sidewalks). Use it to find roads near a point, to spawn vehicles or NPCs on roads and sidewalks, or to build routes.

**Available on:** Client

Unlike the [navmesh](./navmesh.md), the road graph covers the whole map and is loaded all at once. While the game has no road graph loaded (during loading), the functions return empty lists and `nil`.

The graph is made of **nodes** (junctions and road ends) joined by **edges** (the roads between them). Each edge has a [`RoadGraphType`](./enums/road-graph-type.md). Along every edge the game also stores **samples**, points spaced along the road's curve, which follow the road more closely than the straight line between its two nodes.

Node and edge ids are integers starting at **0** (unlike Lua arrays). The lists these functions return are ordinary 1-based Lua arrays.

## Functions {#functions}

### RoadGraph.GetSamples(position, radius, types?) {#roadgraphgetsamplesposition-radius-types}

Returns the road samples within `radius` of `position` (measured in 3D) whose edge type matches `types`. The sample heights are stored with a 0.1 m precision.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | Center of the search. |
| radius | `number` | Search radius, in meters. |
| types | [`RoadGraphType`](./enums/road-graph-type.md) | optional, default `RoadGraphType.Any`. The edge types to include. Combine several with `bit.bor` or by adding them, for example `bit.bor(RoadGraphType.Land, RoadGraphType.Railway)` or `RoadGraphType.Land + RoadGraphType.Railway`. |

**Returns** `table`: a list of samples, each a table:

| Field | Type | Description |
|---|---|---|
| position | `vec3` | The point on the road. |
| edge | `integer` | Id of the edge the sample belongs to (see [`RoadGraph.GetEdge`](#roadgraphgetedgeid)). |
| type | [`RoadGraphType`](./enums/road-graph-type.md) | The edge's type. |

**Example**

```lua
-- pick a random sidewalk point near the player
local function random_sidewalk_point(center)
	local samples = RoadGraph.GetSamples(center, 150, RoadGraphType.Pedestrian)

	if #samples == 0 then
		return nil
	end

	return samples[math.random(#samples)].position
end

Cmd.Add("sidewalk", function()
	local point = random_sidewalk_point(World.LocalPlayer():GetPosition())
	print(point and ("sidewalk at " .. tostring(point)) or "no sidewalk nearby")
end)
```

### RoadGraph.GetNodes(position, radius) {#roadgraphgetnodesposition-radius}

Returns the nodes within `radius` of `position` (measured in 3D).

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | Center of the search. |
| radius | `number` | Search radius, in meters. |

**Returns** `table`: a list of nodes, each a table `{ id = integer, position = vec3 }`. Empty when none is found.

**Example**

```lua
-- draw the junctions around the camera
Event.Add("OnRender", function()
	for _, node in ipairs(RoadGraph.GetNodes(Camera.GetPosition(), 200)) do
		Render.DrawSphere(node.position, 1, vec4(1, 1, 0, 0.8), false)
	end
end)
```

### RoadGraph.GetNode(id) {#roadgraphgetnodeid}

Returns one node by id.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `integer` | Node id, from 0. |

**Returns** `table` `{ position = vec3 }`, or `nil` when the id does not exist.

**Example**

```lua
local node = RoadGraph.GetNode(0)

if node then
	print("first node at " .. tostring(node.position))
end
```

### RoadGraph.GetEdge(id) {#roadgraphgetedgeid}

Returns one edge (road) by id.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `integer` | Edge id, from 0, for example the `edge` of a sample. |

**Returns** `table` or `nil` when the id does not exist:

| Field | Type | Description |
|---|---|---|
| nodeA | `integer` | Id of the node at one end. |
| nodeB | `integer` | Id of the node at the other end. |
| length | `integer` | The road's length as the game stores it (a whole number, presumably meters). |
| type | [`RoadGraphType`](./enums/road-graph-type.md) | What the road is for. |

**Example**

```lua
-- which road is the player standing next to, and where does it lead?
Cmd.Add("road", function()
	local samples = RoadGraph.GetSamples(World.LocalPlayer():GetPosition(), 20, RoadGraphType.Land)

	if #samples == 0 then
		print("no road within 20 m")
		return
	end

	local edge = RoadGraph.GetEdge(samples[1].edge)
	local a, b = RoadGraph.GetNode(edge.nodeA), RoadGraph.GetNode(edge.nodeB)

	print(string.format("road %d, length %d, from %s to %s", samples[1].edge, edge.length, tostring(a.position), tostring(b.position)))
end)
```