---
sidebar_position: 90
---

# Weapons

Every hand-held and thrown weapon name the game's spawn system knows, for `GiveWeapon` on players and NPCs. Built from the retail game's spawn definitions, base game and DLC.

**Available on:** Server

## Usage {#usage}

### player\:GiveWeapon(weapon, ammo, slot) {#playergiveweaponweapon-ammo-slot}

Gives a [PlayerObjectHandle](../shared/objects/player.md) the weapon named `weapon` (the **Weapon** column below) with `ammo` rounds, in `slot` from [WeaponSlot](../shared/enums/weapon.md) (`WeaponSlot.Primary`, `WeaponSlot.Secondary`, `WeaponSlot.Heavy`, or `WeaponSlot.HandGrenade` for the grenades below). Whatever was in that slot is removed first. The weapon is given on every client, and players who join later get it too.

### npc\:GiveWeapon(weapon) {#npcgiveweaponweapon}

Gives an [NPCHandle](../shared/objects/npc.md) the weapon, equipped in its primary slot with 9999 rounds.

- Names are typed exactly as listed (lowercase). A name the game doesn't know gives nothing.
- The game also accepts tag strings (for example `"rpg"`), which pick a random weapon with all those tags on every client separately, so different players could see different weapons: always pass a unique name.
- The **Name** column is the in-game name where one is known. Rows with a **DLC** value only exist for players who own and installed that DLC (see [DLC content](./README.md#dlc-content)).

**Example**

```lua
-- a deathmatch loadout
Net.AddEvent("Loadout", function()
	local obj = Net.Sender():GetPlayer()
	if not obj then return end

	local player = obj:AsPlayer()

	player:GiveWeapon("wpn_001_assault_rifle", 240, WeaponSlot.Primary)
	player:GiveWeapon("wpn_050_smg", 180, WeaponSlot.Secondary)
	player:GiveWeapon("wpn_061_rpg", 6, WeaponSlot.Heavy)
	player:GiveWeapon("w301_frag_grenade", 5, WeaponSlot.HandGrenade)
end)
```

## Values {#values}

### Hand-held weapons {#hand-held-weapons}

| Name | Weapon | Tags | DLC |
|---|---|---|---|
| SW2 Rodelero Rifle | `wpn_000_assault_rifle` | aoc, aoc_private, aoc_gen_frontline |  |
| SW9 Assault Rifle | `wpn_001_assault_rifle` | private, elite, grunt, super_elite, weaponlocker_slot_1, aoc_gen_frontline_t2, dlc_2_slot_1 |  |
| SW7-PBA Assault Rifle | `wpn_003_assault_rifle` |  |  |
| Bárbaro Machine Gun | `wpn_010_machinegun` | wpn_010_machine_gun, aoc, aoc_private, aoc_gen_frontline |  |
| Defender Machine Gun | `wpn_011_machinegun` | two_handed, bullet, aoc_gen_frontline_t2, dlc_2_slot_1 |  |
| Cazador 18 Shotgun | `wpn_020_shotgun` | aoc, aoc_private |  |
| CC10 Shotgun | `wpn_021_shotgun` | shotgun, private, elite, weaponlocker_slot_2 |  |
| PBX Auto-Slug 4 | `wpn_022_shotgun` | dlc_2_slot_1 |  |
| Zopilote Sniper Rifle | `wpn_030_sniper_rifle` | wpn_030_sniper, aoc, aoc_sniper |  |
| LRD-3 Sniper | `wpn_031_sniper_rifle` | sniper, weaponlocker_slot_2 |  |
| PBX Super-Sniper 4 | `wpn_032_sniper_rifle` |  |  |
| 21-J Smart-Rifle | `wpn_040_combat_rifle` | elite, private, weaponlocker_slot_1, aoc_gen_frontline_t2, dlc_2_slot_1 |  |
| SMG-2 | `wpn_050_smg` | secondary_smg, ghost, private, elite, shielder, weaponlocker_slot_1, aoc_gen_frontline_t2, dlc_2_slot_1 |  |
| Anti-Tanque-1 RPG | `wpn_060_rpg` | aoc, aoc_rpg |  |
| AT7 RPG | `wpn_061_rpg` | rpg, weaponlocker_slot_3, dlc_2_slot_2, dlc_2_slot_3_special |  |
| AT3-X RPG | `wpn_063_rpg` | dlc_2_slot_2, dlc_2_slot_3_special |  |
| PGL-6 Grenade Launcher | `wpn_070_glauncher` | grenade_launcher, grenadelauncher, grenadier, weaponlocker_slot_3 |  |
| PBX Mine Launcher 2A7 | `wpn_071_mlauncher` | dlc_2_slot_2, dlc_2_slot_3_special |  |
| PWC V4.2 "Wind Gun" | `wpn_080_experimental` |  |  |
| DA 9.3 "Lightning Gun" | `wpn_081_experimental` | dlc_2_slot_3, dlc_2_slot_3_special |  |
| RG-PBA 9 Railgun | `wpn_100_railgun` | railgun, titan, dlc_2_slot_3, dlc_2_slot_3_special |  |
| Cow Gun | `wpn_901_combat_rifle_cow_gun` | cow_gun |  |
| Cluster Bomb | `wpn_905_clusterbomb` |  |  |
| Railgun (Miller) | `wpn_100_railgun_miller` | miller, miller_railgun | Danger Rising |
| Agency Handcannon | `wpn_450_agency_handcannon` | agency, agency_handcannon, agency_pistol | Danger Rising |
| Agency SMG | `wpn_460_agency_smg` | agency, agency_smg | Danger Rising |
| Agency Sniper | `wpn_461_agency_sniper` | agency, agency_sniper | Danger Rising |
| Magnesis | `wpn_463_magnesis` | magnesis | Danger Rising |
| Deathstalker Scorpion Rifle | `wpn_901_signature_rifle` |  | Deathstalker Scorpion Pack |
| Golden Shotgun | `wpn_902_golden_shotgun` |  | Golden Gear Pack |
| Crossbow | `wpn_102_crossbow` |  | Los Demonios |
| Seed Gun | `wpn_808_combat_rifle_seed_gun` |  | Los Demonios |
| Renegade Drone Rifle | `wpn_903_rebel_machinegun` | wpn_903_renegade_assault_rifle | Renegade Pack |
| The Dragon | `wpn_904_dragon` |  | The Dragon |

### Thrown weapons {#thrown-weapons}

| Name | Weapon | Tags | DLC |
|---|---|---|---|
| Frag Grenade | `w301_frag_grenade` | thrown, explosive, grenade, frag, urga, w301 |  |
| Concussion Grenade | `w303_concussion_grenade` | thrown, urga, w303, concussion, concussion_grenade |  |
| Death-Dropped Grenade | `w304_death_dropped_grenade` | thrown, w304, death_dropped_grenade |  |

## Prototype entries {#prototype-entries}

The game also registers every exported entity under a second name ending in `_debug` (the editor's prototype spawn list). These names are valid spawn names in the retail game, but they were not made for regular gameplay and have not been tested with JC4MP, so prefer the names above and test a `_debug` name before you rely on it.

| Weapon | DLC |
|---|---|
| `w301_grenade_debug` |  |
| `w303_concussion_grenade_debug` |  |
| `w304_death_dropped_grenade_debug` |  |
| `wpn_000_assault_rifle_debug` |  |
| `wpn_001_assault_rifle_debug` |  |
| `wpn_003_assault_rifle_debug` |  |
| `wpn_010_machine_gun_debug` |  |
| `wpn_011_machinegun_debug` |  |
| `wpn_020_shotgun_debug` |  |
| `wpn_021_shotgun_debug` |  |
| `wpn_022_shotgun_debug` |  |
| `wpn_030_sniper_rifle_debug` |  |
| `wpn_031_sniper_rifle_debug` |  |
| `wpn_032_sniper_rifle_debug` |  |
| `wpn_040_combat_rifle_debug` |  |
| `wpn_050_smg_debug` |  |
| `wpn_060_rpg_debug` |  |
| `wpn_061_rpg_debug` |  |
| `wpn_063_rpg_debug` |  |
| `wpn_070_glauncher_debug` |  |
| `wpn_071_mlauncher_debug` |  |
| `wpn_080_experimental_debug` |  |
| `wpn_081_experimental_debug` |  |
| `wpn_100_railgun_debug` |  |
| `wpn_102_crossbow_debug` |  |
| `wpn_800_combat_rifle_cow_gun_debug` |  |
| `wpn_990_premium_wingsuit_bullet_streamer_debug` |  |