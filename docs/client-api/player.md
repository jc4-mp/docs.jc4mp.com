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
| Ability.Tether                   | Connects two objects or players together.|
| Ability.RetractTether            | Pulls tethered objects or players towards each other.                        |
| Ability.Wingsuit                 | Enables gliding through the air for fast traversal.                          |
| Ability.PlantedExplosives        | Allows placement of explosives that can be detonated remotely.               |
| Ability.Parachute                | Deploys a parachute for controlled descents and aerial maneuvers.            |
| Ability.ParachuteSlingshot       | Increases speed and altitude while parachuting by using the grappling hook.  |
| Ability.GrapplingHook            | Controls whether or not the grappling hook is enabled.             |
| Ability.Hammer                   | ???                                                  |
| Ability.MultiplePlantedExplosives| Enables placement of multiple explosives simultaneously.                    |
| Ability.Grenades                 | Equips Rico with throwable grenades for area damage.                        |
| Ability.ExitVehicle              | Allows Rico to quickly exit any vehicle he is operating.                     |

Example of enabling the local player's ability to use the wingsuit:
```lua
Players.Local():GetGamePlayer():EnableAbility(Ability.Wingsuit)
```


#### `Player:DisableAbility(ability: Ability)`

Disables an ability for a given Player. `ability` must be one of these abilities from the global `Ability` table (shown above).

Example of disabling the local player's ability to use the grappling hook:

```lua
Players.Local():GetGamePlayer():EnableAbility(Ability.GrapplingHook)
```

#### `Player:GetAimPosition(): vec3`

Returns the player's current aim position, based on the weapon they have equipped. For example, if the player does not have a weapon, this position will only reach out as far as the grappling hook goes (about 80m).