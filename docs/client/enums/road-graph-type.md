---
sidebar_position: 85
---

# RoadGraphType

`RoadGraphType` holds the kinds of routes in the game's road graph (the network of roads, sea lanes, flight paths, footpaths and railways the AI travels on). Use it to ask the road graph for one kind of route only, and to tell what kind a returned route is.

**Available on:** Client

## Values {#values}

### RoadGraphType {#roadgraphtype}

The values are bit flags: combine several to accept several kinds at once with `bit.bor` or by adding them, and test a flag with `bit.band` (see [Sandbox](../../shared/sandbox.md#bit)). Each edge has exactly one kind, so compare a returned `type` with `==`.

Used by (see [RoadGraph](../road-graph.md)):

- `RoadGraph.GetSamples(position, radius, types)`: `types` (optional, default `RoadGraphType.Any`) limits the samples to edges of those kinds. Each sample's `type` field is the kind of its edge.
- `RoadGraph.GetEdge(id)`: the returned table's `type` field is the kind of that edge.

| Name | Value | Meaning |
|---|---|---|
| `RoadGraphType.Land` | 2 | Roads for land vehicles. |
| `RoadGraphType.Sea` | 4 | Routes for boats. |
| `RoadGraphType.Air` | 8 | Routes for aircraft. |
| `RoadGraphType.Pedestrian` | 16 | Paths for people on foot. |
| `RoadGraphType.Railway` | 32 | Railways. |
| `RoadGraphType.Any` | 62 | Every kind above combined. |

**Example**

```lua
-- client: find road or railway points within 200 m of the local player
Cmd.Add("roads", function()
	local player = World.LocalPlayer()
	if not player then
		return
	end

	local types = RoadGraphType.Land + RoadGraphType.Railway
	local samples = RoadGraph.GetSamples(player:GetPosition(), 200, types)

	for _, sample in ipairs(samples) do
		local kind = sample.type == RoadGraphType.Railway and "railway" or "road"
		print(string.format("%s at %.0f %.0f %.0f (edge %d)", kind, sample.position.x, sample.position.y, sample.position.z, sample.edge))
	end
end)
```