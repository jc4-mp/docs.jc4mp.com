# Player

Player-related APIs. To use these, you must first have a reference to a player, such as the Local Player. You can get a reference to the Local Player like so:

```lua
local playerClient = Players.Local()
local localPlayer = playerClient:GetGamePlayer()
```

#### `Player:GetCharacter(): Character`

Returns the Player's [Character](/client-api/character).

#### `Player:EnableAbility(ability: Ability)`

Enables an ability for a given Player. `ability` must be one of these abilities from the global `Ability` table:

| Ability                           | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| `Ability.Tether`                   | Allows the player to connect two objects or players together with the grapplehook.|
| `Ability.RetractTether`            | Allows the player to pull tethered objects or players towards each other.                        |
| `Ability.Wingsuit`                 | Allows the player to use the wingsuit.                          |
| `Ability.PlantedExplosives`        | Allows placement of explosives that can be detonated remotely.               |
| `Ability.Parachute`                | Allows the player to use the parachute.            |
| `Ability.ParachuteSlingshot`       | Allows the player to use the grapplehook while parachuting.  |
| `Ability.GrapplingHook`            | Controls whether or not the grappling hook is enabled.             |
| `Ability.Hammer`                   | Allows the player to use the grapplehook melee ability.                                                  |
| `Ability.MultiplePlantedExplosives`| Enables placement of multiple explosives simultaneously.                    |
| `Ability.Grenades`                 | Allows the player to use grenades.                        |
| `Ability.ExitVehicle`              | Allows the player to quickly exit any vehicle.                     |

Example of enabling the local player's ability to use the wingsuit:
```lua
Players.Local():GetGamePlayer():EnableAbility(Ability.Wingsuit)
```


#### `Player:DisableAbility(ability: Ability)`

Disables an ability for a given Player. `ability` must be one of the abilities from the global `Ability` table (shown above).

Example of disabling the local player's ability to use the grappling hook:

```lua
Players.Local():GetGamePlayer():EnableAbility(Ability.GrapplingHook)
```

#### `Player:IsAbilityEnabled(ability: Ability)`

Returns true if the given ability is enabled for the Player, false if disabled. `ability` must be one of the abilities from the global `Ability` table (shown above).


#### `Player:GetAimPosition(): vec3`

Returns the player's current aim position, based on the weapon they have equipped. For example, if the player does not have a weapon, this position will only reach out as far as the grappling hook goes (about 80m).