---
sidebar_position: 77
---

# Ability

`Ability` holds the local player's unlockable abilities: the grappling hook, tethers, the wingsuit, the parachute and so on. Use it to take gear away from players (for example no wingsuit in a race) or to give it back.

**Available on:** Client

## Values {#values}

### Ability {#ability}

Each value is a 32-bit hash of the game's ability name (shown in the second column).

Used by (see [Local](../local.md)):

- `Local.LockAbility(ability)`: the local player can no longer use the ability.
- `Local.UnlockAbility(ability)`: the local player can use the ability again.
- `Local.IsAbilityUnlocked(ability)`: `true` while the local player can use it.

These only affect the local player's game and are not synced. To lock an ability for everyone, do it in every client (for example from a server event sent to all players).

| Name | Game ability | Meaning |
|---|---|---|
| `Ability.Tether` | `ability_dual_tether` | Tethering: attaching two things together with the grappling hook. |
| `Ability.RetractTether` | `ability_retract_tether` | Retracting tethers (pulling the two tethered things together). |
| `Ability.Wingsuit` | `ability_wingsuit` | The wingsuit. |
| `Ability.PlantedExplosives` | `ability_planted_explosives` | Planting explosives. |
| `Ability.Parachute` | `ability_parachute` | The parachute. |
| `Ability.ParachuteSlingshot` | `ability_parachute_slingshot` | The parachute slingshot (being pulled along by the grapple while under the parachute). |
| `Ability.GrapplingHook` | `ability_grappling_hook` | The grappling hook. |
| `Ability.Hammer` | `ability_hammer` | The hammer ability. |
| `Ability.MultiplePlantedExplosives` | `ability_multiple_planted_explosives` | Having more than one planted explosive out at the same time. |
| `Ability.Grenades` | `ability_grenades` | Throwing grenades. |
| `Ability.ExitVehicle` | `ability_exit_vehicle` | Getting out of a vehicle. |

**Example**

```lua
-- client: no wingsuit and no parachute during a race, given back when it ends
Net.AddEvent("raceStarted", function()
	Local.LockAbility(Ability.Wingsuit)
	Local.LockAbility(Ability.Parachute)
end)

Net.AddEvent("raceEnded", function()
	Local.UnlockAbility(Ability.Wingsuit)
	Local.UnlockAbility(Ability.Parachute)

	print("wingsuit unlocked: " .. tostring(Local.IsAbilityUnlocked(Ability.Wingsuit)))
end)
```