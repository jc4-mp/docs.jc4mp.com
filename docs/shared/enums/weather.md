---
sidebar_position: 32
---

# WeatherAct, WeatherProperty and TornadoState

These tables are used to control the weather from the server: `WeatherAct` names one-off weather actions (spawn or remove the tornado), `WeatherProperty` names a weather setting to change (the tornado's position and state, and the look of the clouds), and `TornadoState` holds the states the tornado can be put in.

**Available on:** Server, Client (the tables exist on both sides, but only the server's [Weather](../weather.md) functions take them)

## Values {#values}

### WeatherAct {#weatheract}

Used by [`Weather.SyncAct(act, ...)`](../../server/weather.md) (server). The extra arguments depend on the act. Any other value raises the Lua error `invalid weather act <n>`. The act is sent to every player in the server at that moment; the server does not remember it, so players who join later don't get it.

| Name | Value | Meaning | Extra arguments |
|---|---|---|---|
| `WeatherAct.SpawnTornado` | 0 | Spawn the world's tornado. | `position` (`vec3`, where it forms), `formTime` (`number`, how long it takes to form) |
| `WeatherAct.DespawnTornado` | 1 | Remove the world's tornado. | `time` (`number`, how long it takes to go away) |

### WeatherProperty {#weatherproperty}

Used by [`Weather.SyncProperty(property, value)`](../../server/weather.md) (server). The type of `value` depends on the property. Any other property value raises the Lua error `invalid weather property <n>`. Like acts, properties are sent to the players in the server at that moment only.

| Name | Value | Value type | Meaning |
|---|---|---|---|
| `WeatherProperty.TornadoPosition` | 0 | `vec3` | Move the tornado to this position (needs a spawned tornado). |
| `WeatherProperty.TornadoState` | 1 | [`TornadoState`](#tornadostate) | Put the tornado in this state (needs a spawned tornado). |
| `WeatherProperty.CloudsAmbientSaturation` | 2 | `number` | Color saturation of the ambient light on the clouds. |
| `WeatherProperty.CloudsAmbientIntensity` | 3 | `number` | Intensity of the ambient light on the clouds. |
| `WeatherProperty.CloudsSunIntensity` | 4 | `number` | Intensity of the sunlight on the clouds. |
| `WeatherProperty.CloudsScatteringCoeff` | 5 | `number` | How much light the clouds scatter. |
| `WeatherProperty.CloudsExtinctionCoeff` | 6 | `number` | How much light the clouds absorb. |
| `WeatherProperty.CloudsForwardAnisoScattering` | 7 | `number` | Forward scattering of light through the clouds (the bright glow around the sun). |
| `WeatherProperty.CloudsBackwardAnisoScattering` | 8 | `number` | Backward scattering of light off the clouds. |
| `WeatherProperty.CloudsMaxLightConeDistance` | 9 | `number` | The maximum distance light is traced through the clouds when shading them. |
| `WeatherProperty.CloudsMaxPrecipitationDarkeningFactor` | 10 | `number` | How much rain clouds are darkened at most. |
| `WeatherProperty.CloudsAmbientSkylightColor` | 11 | `vec3` | Color (red, green, blue) of the ambient sky light on the clouds. |
| `WeatherProperty.CloudsDirectSunlightColor` | 12 | `vec3` | Color (red, green, blue) of the direct sunlight on the clouds. |
| `WeatherProperty.CloudsLayerHeightLow` | 13 | `number` | Height of the bottom of the cloud layer. |
| `WeatherProperty.CloudsLayerHeightHigh` | 14 | `number` | Height of the top of the cloud layer. |

Every number and every `vec3` component must be finite, or the call raises a Lua error.

### TornadoState {#tornadostate}

The states of the world's tornado, used as the value of `WeatherProperty.TornadoState`. A value outside 0..6 raises the Lua error `invalid tornado state <n>`.

| Name | Value | Meaning |
|---|---|---|
| `TornadoState.Forming` | 0 | The tornado is forming. |
| `TornadoState.Moving` | 1 | The tornado is moving. |
| `TornadoState.Stopping` | 2 | The tornado is slowing down to a stop. |
| `TornadoState.Stopped` | 3 | The tornado stands still. |
| `TornadoState.Dissipating` | 4 | The tornado is dissipating. |
| `TornadoState.Disappearing` | 5 | The tornado is disappearing. |
| `TornadoState.WaitingBeforeResetting` | 6 | The tornado is gone and waits before it resets. |

**Example**

```lua
-- server: an admin command that spawns the tornado at the sender, stops it after a minute, then removes it
Net.AddEvent("tornadoHere", function()
	local client = Net.Sender()
	if not client:HasAcl(AclLevel.Admin) then
		return
	end

	local player = client:GetPlayer()
	if not player then
		return
	end

	Weather.SyncAct(WeatherAct.SpawnTornado, player:GetPosition(), 5.0)
	Weather.SyncProperty(WeatherProperty.CloudsDirectSunlightColor, vec3(1.0, 0.6, 0.4))

	Timer.Set(function()
		Weather.SyncProperty(WeatherProperty.TornadoState, TornadoState.Stopped)
	end, 60000, 1)

	Timer.Set(function()
		Weather.SyncAct(WeatherAct.DespawnTornado, 5.0)
	end, 70000, 1)
end)
```