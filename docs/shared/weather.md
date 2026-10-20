---
sidebar_position: 12
---

# Weather

The `Weather` table controls the weather that players see. On the server it syncs the world's tornado and cloud settings to every player; on the client it strikes local lightning. Sandstorms are networked objects instead, spawned with [World.SpawnSandstorm](../server/world.md#worldspawnsandstormposition-size-windspeed-rotation) (see [Sandstorm](./objects/sandstorm.md)).

**Available on:** Server, Client

**See also:** [Weather (server)](../server/weather.md), [Weather (client)](../client/weather.md)

## How weather sync works {#how-weather-sync-works}

Each player's game runs its own weather. The server does not simulate weather; it only keeps what scripts set with [`Weather.SyncAct`](../server/weather.md#weathersyncactact-) and [`Weather.SyncProperty`](../server/weather.md#weathersyncpropertyproperty-value) and sends it out:

- Every call is sent at once to every joined player, wherever they are.
- The server remembers the current tornado (while it is alive) and the last value of every property, and sends them to each player who joins later, so everyone ends up with the same weather.
- Spawning or despawning the tornado forgets the tornado properties set before (position and state), since they no longer apply.

Nothing in this table returns state: there are no getters. Keep the values you set in your own variables if you need them.

There is one world tornado. Its movement after it formed is run by each player's game, so two players can see it drift apart over time; set its position again with `WeatherProperty.TornadoPosition` to bring everyone back in line.

## Sandstorms {#sandstorms}

Sandstorms are objects, not a `Weather` setting: spawn them with [World.SpawnSandstorm](../server/world.md#worldspawnsandstormposition-size-windspeed-rotation), move them like any object and remove them with [World.Destroy](../server/world.md#worlddestroyobject). Each one is a box with its own size and wind speed, and every player sees it wherever they are. See [Sandstorm](./objects/sandstorm.md).

```lua
-- server: a storm 1 km from the origin, turned around so its wind blows back toward the origin
local storm = World.SpawnSandstorm(vec3(0, 150, 1000), vec3(2000, 600, 1000), 45, vec3(0, 180, 0))
```