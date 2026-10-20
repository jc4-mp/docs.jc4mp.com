---
sidebar_position: 52
---

# Weather (client)

On the client, the `Weather` table strikes local lightning.

**Available on:** Client

**See also:** [Weather](../shared/weather.md) (how weather sync works, sandstorms), [Weather (server)](../server/weather.md)

## Functions {#functions}

### Weather.StrikeLightning(position, color) {#weatherstrikelightningposition-color}

Strikes a lightning bolt at a position in this player's game, in the given color. Local only: other players do not see it. To show it to everyone, send the position from the server with a `Net` event and strike it in each client.

The bolt uses the game's lightning, which is only available while the game's weather has an active lightning system; when it has none, nothing happens.

**Side:** Client

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | where the bolt hits |
| color | `vec3` | the bolt's color (`x`, `y`, `z` = red, green, blue) |

**Returns:** nothing

**Example**

```lua
-- client: strike where the server says, in blue
Net.AddEvent("Lightning", function(position)
	Weather.StrikeLightning(position, vec3(0.4, 0.6, 1.0))
end)
```

```lua
-- server: strike every player every 20 seconds
Timer.Set(function()
	for _, client in ipairs(World.GetPlayers()) do
		local player = client:GetPlayer()

		if player then
			Net.Broadcast("Lightning", player:GetPosition())
		end
	end
end, 20000, 0)
```