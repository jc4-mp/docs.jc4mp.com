---
sidebar_position: 95
---

# Explosions

Every game entity [`World.SpawnExplosion`](../server/world.md) can set off (61 entities). An explosion is the game's own force pulse taken from an entity file: its blast radius, push, damage types and the effect it plays all come from that file.

**Available on:** Server

## Usage {#usage}

### World.SpawnExplosion(position, entity) {#worldspawnexplosionposition-entity}

Sets off the explosion of `entity` at `position` for every joined player. Each player's game plays the effect and applies the force pulse, and each one only syncs the damage done to its own player, so players are hurt and pushed the same way they would be by that explosion in the single player game.

- `entity` is the full path of the entity file (the **Entity** column), lowercase, exactly as listed.
- The game reads the first force pulse it finds in the file. A file without a usable force pulse (no effect table) does nothing; every entity below has one.
- **Radius** is the blast radius in meters, **Pressure** and **Velocity** how hard objects are pushed, **Damage** the extra damage types, and **Default effect** the visual played on ordinary ground (the pulse picks another one for water, snow, sand and so on).
- Nothing is spawned or kept: the explosion happens once and there is no handle.

**Example**

```lua
-- an airstrike: five tank shell explosions around a position, half a second apart
Net.AddEvent("Airstrike", function(position)
	for i = 1, 5 do
		Timer.Set(function()
			local offset = vec3(math.random(-15, 15), 0, math.random(-15, 15))

			World.SpawnExplosion(position + offset, "editor/entities/vehicles/01_land/v801_treaded_mediumtank/v801_treaded_mediumtank_military_01.epe")
		end, i * 500, 1)
	end
end)
```

## Values {#values}

### Vehicles {#vehicles}

| Entity | Pulse | Radius (m) | Pressure | Velocity | Damage | Default effect | DLC |
|---|---|---|---|---|---|---|---|
| `editor/entities/vehicles/01_land/v015_car_cannontruck/v015_car_cannontruck_military.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v015_car_cannontruck/v015_car_cannontruck_rebel.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v505_train_armoredweaponcarriage/v505_train_armoredweaponcarriage_military_01.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v505_train_armoredweaponcarriage/v505_train_armoredweaponcarriage_rebel.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v506_train_armoredhowitzer/v506_train_armoredhowitzer_base.epe` | wpn_604_tank_cannon | 8 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v506_train_armoredhowitzer/v506_train_armoredhowitzer_military.epe` | wpn_604_tank_cannon | 8 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v506_train_armoredhowitzer/v506_train_armoredhowitzer_military_covered.epe` | wpn_604_tank_cannon | 8 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v506_train_armoredhowitzer/v506_train_armoredhowitzer_rebel.epe` | wpn_604_tank_cannon | 8 | 100 | 100 | fire, core | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v506_train_armoredhowitzer/v506_train_armoredhowitzer_rebel_decouple_immune.epe` | wpn_604_tank_cannon | 8 | 100 | 100 | fire, core | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v800_treaded_modernheavytank/v800_treaded_modernheavytank_military_01.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v800_treaded_modernheavytank/v800_treaded_modernheavytank_rebel_01.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v801_treaded_mediumtank/v801_treaded_mediumtank_military_01.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v801_treaded_mediumtank/v801_treaded_mediumtank_rebel_01.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v802_treaded_aatank/v802_treaded_aatank_military.epe` | wpn_611_antiair | 10 | 100 | 100 | fire | aa_gun_concrete.effc |  |
| `editor/entities/vehicles/01_land/v802_treaded_aatank/v802_treaded_aatank_rebel.epe` | wpn_611_antiair | 10 | 100 | 100 | fire | aa_gun_concrete.effc |  |
| `editor/entities/vehicles/01_land/v803_treaded_flexturrettank/v803_treaded_flexturrettank_military.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/01_land/v803_treaded_flexturrettank/v803_treaded_flexturrettank_rebel.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/02_air/v251_helicopter_rocketdrone/v251_helicopter_rocketdrone_military.epe` | CForcePulse | 1 | 100 | 10 | fire | drone_rocket_impact.effc |  |
| `editor/entities/vehicles/02_air/v251_helicopter_rocketdrone/v251_helicopter_rocketdrone_rebel.epe` | CForcePulse | 1 | 100 | 10 | fire | drone_rocket_impact.effc |  |
| `editor/entities/vehicles/03_sea/v103_boat_corvette/v103_boat_corvette_military_01.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `editor/entities/vehicles/03_sea/v103_boat_corvette/v103_boat_corvette_rebel_01.epe` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |

### Weapons {#weapons}

| Entity | Pulse | Radius (m) | Pressure | Velocity | Damage | Default effect | DLC |
|---|---|---|---|---|---|---|---|
| `editor/entities/weapons/01_wielded/wpn_001_assault_rifle/wpn_001_assault_rifle.epe` | CForcePulse | 6 | 100 | 30 | fire | hg_explosion_concrete.effc |  |
| `editor/entities/weapons/01_wielded/wpn_003_assault_rifle/wpn_003_assault_rifle.epe` | ForcePulse | 10 | 100 | 100 | fire | hg_explosion_concrete.effc |  |
| `editor/entities/weapons/01_wielded/wpn_021_shotgun/wpn_021_shotgun.epe` | CForcePulse | 12 | 100 | 100 | concussion |  |  |
| `editor/entities/weapons/01_wielded/wpn_031_sniper_rifle/wpn_031_sniper_rifle.epe` | ForcePulse | 3 | 100 | 100 | fire | missile_explosion_default.vfxc |  |
| `editor/entities/weapons/01_wielded/wpn_032_sniper_rifle/wpn_032_sniper_rifle.epe` | ForcePulse | 10 | 100 | 100 | fire | plant_explosion_concrete.effc |  |
| `editor/entities/weapons/01_wielded/wpn_050_smg/wpn_050_smg.epe` | CForcePulse | 10 | 100 | 100 | fire | hg_explosion_concrete.effc |  |
| `editor/entities/weapons/01_wielded/wpn_060_rpg/wpn_060_rpg.epe` | explosion_force_pulse | 10 | 100 | 100 | fire | missile_explosion_default.vfxc |  |
| `editor/entities/weapons/01_wielded/wpn_061_rpg/wpn_061_rpg.epe` | explosion_force_pulse | 10 | 100 | 100 | fire | missile_explosion_default.vfxc |  |
| `editor/entities/weapons/01_wielded/wpn_063_rpg/wpn_063_rpg.epe` | explosion_force_pulse | 5 | 100 | 100 | fire | missile_explosion_default.vfxc |  |
| `editor/entities/weapons/01_wielded/wpn_070_glauncher/wpn_070_glauncher.epe` | CForcePulse | 7.5 | 75 | 75 | fire | hg_explosion_concrete.effc |  |
| `editor/entities/weapons/01_wielded/wpn_071_mlauncher/wpn_071_mlauncher.epe` | ForcePulse | 10 | 100 | 100 | fire | plant_explosion_concrete.effc |  |
| `editor/entities/weapons/01_wielded/wpn_081_experimental/wpn_081_experimental.epe` | explosion_force_pulse | 5 | 100 | 100 | fire | elec_explosion_1m_b.effc |  |
| `editor/entities/weapons/01_wielded/wpn_100_railgun/wpn_100_railgun.epe` | ForcePulse | 10 | 100 | 100 | fire | hg_explosion_concrete.effc |  |
| `editor/entities/weapons/03_thrown/w301_grenade/w301_grenade.epe` | CForcePulse | 10 | 100 | 100 | none | hg_explosion_concrete.effc |  |
| `editor/entities/weapons/03_thrown/w303_concussion_grenade/w303_concussion_grenade.epe` | CForcePulse | 0.85 | 60 | 75 | concussion | hg_explosion_concrete.effc |  |
| `editor/entities/weapons/03_thrown/w304_death_dropped_grenade/w304_death_dropped_grenade.epe` | CForcePulse | 7.5 | 75 | 75 | none | hg_explosion_concrete.effc |  |
| `editor/entities/weapons/04_stationary/wpn_203_aa_gun/wpn_203_aa_gun.epe` | wpn_203_antiair | 10 | 100 | 100 | fire | aa_gun_concrete.effc |  |
| `editor/entities/weapons/06_special/illapa_defence_weapon.epe` | ForcePulse | 17 | 500 | 500 | fire | missile_explosion_default.vfxc |  |

### World locations {#world-locations}

| Entity | Pulse | Radius (m) | Pressure | Velocity | Damage | Default effect | DLC |
|---|---|---|---|---|---|---|---|
| `global/global_blizzard.blo` | lightning_ForcePulse | 5 | 500 | 100 | electricity | lightningbolt_impact_25m.vfxc |  |
| `global/tropical_storm.blo` | lightning_ForcePulse | 5 | 500 | 100 | electricity | lightningbolt_impact_25m.vfxc |  |
| `locations/cutscenes/binked_scenes/bink_cutscene_thunderbarge_finale_end_part01.blo` | explosion_force_pulse | 5 | 100 | 100 | fire | missile_explosion_default.vfxc |  |
| `locations/cutscenes/interstitials/interstitial_sandstorm_module.blo` | wpn_604_tank_cannon | 3.5 | 100 | 100 | fire | defense_cannon_impact.vfxc |  |
| `locations/cutscenes/interstitials/interstitial_tropicalstorm_module.blo` | wpn_604_tank_cannon | 3.5 | 100 | 100 | fire | defense_cannon_impact.vfxc |  |
| `locations/cutscenes/sandstorm/cutscene_sandstorm_finale_start.blo` | wpn_604_tank_cannon | 8 | 100 | 100 | fire, core | tank_explosive_default.vfxc |  |
| `locations/cutscenes/sandstorm/cutscene_sandstorm_stealweapon_end.blo` | wpn_604_tank_cannon | 8 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `locations/cutscenes/windwalker/cutscene_windwalker_stormchaser_end.blo` | wpn_604_tank_cannon | 5 | 100 | 100 | fire | tank_explosive_default.vfxc |  |
| `locations/node/node_factory_02/node_factory_02_friendly_ai.blo` | CForcePulse | 2.5 | 250 | 10 | fire, concussion | turret_railgun_impact.effc |  |
| `locations/node/node_factory_02/node_factory_02_hostile_ai.blo` | CForcePulse | 2.5 | 250 | 10 | fire, concussion | turret_railgun_impact.effc |  |
| `locations/node/node_factory_02/node_factory_02_main.blo` | wpn_604_tank_cannon | 3.5 | 100 | 100 | fire | defense_cannon_impact.vfxc |  |
| `locations/node/node_factory_04/node_factory_04_main.blo` | wpn_604_tank_cannon | 3.5 | 100 | 100 | fire | defense_cannon_impact.vfxc |  |
| `locations/node/node_industrial_08/node_industrial_08_main.blo` | CForcePulse | 2.5 | 250 | 10 | fire, concussion | turret_railgun_impact.effc |  |
| `locations/node/node_military_01/node_military_01_main.blo` | wpn_604_tank_cannon | 3.5 | 100 | 100 | fire | defense_cannon_impact.vfxc |  |
| `locations/node/node_military_05/node_military_05_main.blo` | wpn_604_tank_cannon | 3.5 | 100 | 100 | fire | defense_cannon_impact.vfxc |  |
| `locations/node/node_military_08/node_military_08_hostile_ai.blo` | CForcePulse | 2.5 | 250 | 10 | fire, concussion | turret_railgun_impact.effc |  |
| `locations/node/node_military_12/node_military_12_main.blo` | ForcePulse | 17 | 500 | 500 | fire | missile_explosion_default.vfxc |  |
| `locations/node/node_military_12/node_military_12_module_desert.blo` | wpn_604_tank_cannon | 3.5 | 100 | 100 | fire | defense_cannon_impact.vfxc |  |
| `locations/node/node_military_12/node_military_12_module_grasslands.blo` | wpn_604_tank_cannon | 3.5 | 100 | 100 | fire | defense_cannon_impact.vfxc |  |
| `locations/node/node_military_12/node_military_12_module_rainforest.blo` | wpn_604_tank_cannon | 3.5 | 100 | 100 | fire | defense_cannon_impact.vfxc |  |
| `locations/node/node_science_02/node_science_02_hostile_ai.blo` | CForcePulse | 2.5 | 250 | 10 | fire, concussion | turret_railgun_impact.effc |  |
| `locations/quests/questa17_junkgraveyard_turrets.blo` | CForcePulse | 2.5 | 250 | 10 | fire, concussion | turret_railgun_impact.effc |  |