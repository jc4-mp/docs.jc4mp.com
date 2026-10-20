---
sidebar_position: 42
---

# Weather (server)

On the server, the `Weather` table syncs the world's tornado and cloud settings to every player.

**Available on:** Server

**See also:** [Weather](../shared/weather.md) (how weather sync works, sandstorms), [Weather (client)](../client/weather.md)

## Functions {#functions}

### Weather.SyncAct(act, ...) {#weathersyncactact-}

Performs a weather action for every player: spawn or despawn the world tornado. The arguments after `act` depend on the action:

| act | Arguments | What it does |
|---|---|---|
| `WeatherAct.SpawnTornado` | `position` (`vec3`), `formTime` (`number`) | (re)starts the tornado at `position`; it takes `formTime` to form |
| `WeatherAct.DespawnTornado` | `time` (`number`) | makes the tornado dissipate over `time` |

The times are passed to the game as they are; the default scripts use `5.0`, which reads as seconds. Spawning a tornado while one exists restarts it at the new position.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| act | [`WeatherAct`](../shared/enums/weather.md#weatheract) | the action |
| ... | | the action's arguments, see the table above |

**Returns:** nothing

**Notes:** raises a Lua error for an `act` out of range, a missing argument, or a non-finite position or time.

**Example**

```lua
local function isAdmin(client)
	return client:HasAcl(AclLevel.Admin) or client:HasAcl(AclLevel.Owner)
end

Net.AddEvent("SpawnTornado", function(position)
	if isAdmin(Net.Sender()) then
		Weather.SyncAct(WeatherAct.SpawnTornado, position, 5.0)
	end
end)

Net.AddEvent("DespawnTornado", function()
	if isAdmin(Net.Sender()) then
		Weather.SyncAct(WeatherAct.DespawnTornado, 5.0)
	end
end)
```

### Weather.SyncProperty(property, value) {#weathersyncpropertyproperty-value}

Sets one weather property for every player. The value's type depends on the property:

| Property | Value |
|---|---|
| `WeatherProperty.TornadoPosition` | `vec3`: moves the tornado to this position |
| `WeatherProperty.TornadoState` | [`TornadoState`](../shared/enums/weather.md#tornadostate): `Forming`, `Moving`, `Stopping`, `Stopped`, `Dissipating`, `Disappearing` or `WaitingBeforeResetting` |
| `WeatherProperty.CloudsAmbientSkylightColor` | `vec3`: the color of the light from the sky (`x`, `y`, `z` = red, green, blue) |
| `WeatherProperty.CloudsDirectSunlightColor` | `vec3`: the color of the direct sunlight through the clouds |
| `WeatherProperty.CloudsAmbientSaturation` | `number` |
| `WeatherProperty.CloudsAmbientIntensity` | `number` |
| `WeatherProperty.CloudsSunIntensity` | `number` |
| `WeatherProperty.CloudsScatteringCoeff` | `number`: how much the clouds scatter light |
| `WeatherProperty.CloudsExtinctionCoeff` | `number`: how much the clouds absorb light (denser, darker clouds) |
| `WeatherProperty.CloudsForwardAnisoScattering` | `number` |
| `WeatherProperty.CloudsBackwardAnisoScattering` | `number` |
| `WeatherProperty.CloudsMaxLightConeDistance` | `number` |
| `WeatherProperty.CloudsMaxPrecipitationDarkeningFactor` | `number`: how much rain clouds darken |
| `WeatherProperty.CloudsLayerHeightLow` | `number`: the height of the cloud layer's bottom |
| `WeatherProperty.CloudsLayerHeightHigh` | `number`: the height of the cloud layer's top |

The cloud values go straight into the game's cloud renderer; their useful ranges are the game's and are not documented here, so start from small changes. The tornado properties only do something while a tornado exists. See [WeatherProperty](../shared/enums/weather.md#weatherproperty) for the full list.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| property | [`WeatherProperty`](../shared/enums/weather.md#weatherproperty) | which property to set |
| value | `vec3`, `integer` or `number` | the new value, see the table above |

**Returns:** nothing

**Notes:** called without a value it does nothing. Raises a Lua error for a property out of range, a value of the wrong type, a non-finite value, or a tornado state out of range.

**Example**

```lua
-- move the tornado to where an admin aims
Net.AddEvent("MoveTornado", function(position)
	local client = Net.Sender()

	if client:HasAcl(AclLevel.Admin) then
		Weather.SyncProperty(WeatherProperty.TornadoPosition, position)
	end
end)

-- a stormy sky for everyone, also for players who join later
Weather.SyncProperty(WeatherProperty.CloudsSunIntensity, 0.2)
Weather.SyncProperty(WeatherProperty.CloudsDirectSunlightColor, vec3(0.6, 0.6, 0.7))

-- stop the tornado where it is
Weather.SyncProperty(WeatherProperty.TornadoState, TornadoState.Stopped)
```