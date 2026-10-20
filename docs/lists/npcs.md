---
sidebar_position: 92
---

# NPC Models

Every character name that [`World.SpawnNPC`](../server/world.md) can spawn: enemies, rebels, civilians, story characters, DLC characters and animals. It is the same list as the [skins](./skins.md), plus animals.

**Available on:** Server

## Usage {#usage}

### World.SpawnNPC(model, position, rotation?, health?) {#worldspawnnpcmodel-position-rotation-health}

`model` is the **Character** column below. The server creates the NPC and every client spawns that character from its own game files; you then drive it with the [NPCHandle](../shared/objects/npc.md) methods (`Move`, `Follow`, `AimAt`, `SetFiring`, `Melee`, ...) and arm it with `npc:GiveWeapon` and a name from the [weapons list](./weapons.md).

- `rotation` is optional euler angles in degrees (`vec3`), `health` an optional starting health from 0 to 1.
- Names are typed exactly as listed (lowercase). A name the game doesn't know spawns nothing on the clients.
- Tag strings (for example `"civilian"`) make every client pick a random character on its own, so players could see different NPCs: always pass a unique name.
- Rows with a **DLC** value only exist for players who own and installed that DLC (see [DLC content](./README.md#dlc-content)).

**Example**

```lua
-- an armed enemy that hunts the player who called it
Net.AddEvent("SpawnHunter", function()
	local player = Net.Sender():GetPlayer()
	if not player then return end

	local npc = World.SpawnNPC("ghost_enemy_001", player:GetPosition() + vec3(15, 0, 0))

	npc:GiveWeapon("wpn_000_assault_rifle")
	npc:AimAt(player, vec3(0, 1.2, 0))
	npc:SetFiring(true)
end)
```

## Values {#values}

### Main Characters {#main-characters}

| Name | Character | Tags | DLC |
|---|---|---|---|
| Cesar | `cesar` |  |  |
| Gabriela | `gabriela` |  |  |
| Garland | `garland` |  |  |
| Izzy | `izzy` |  |  |
| Javi | `javi` |  |  |
| Lanza | `lanza` |  |  |
| Mira | `mira` |  |  |
| Oscar | `oscar` | gustavo |  |
| Sargento | `sargento` |  |  |
| Sheldon | `sheldon` |  |  |
| Sheldon (Agency) | `sheldon_dlc3` |  | Danger Rising |

### Military {#military}

| Name | Character | Tags | DLC |
|---|---|---|---|
|  | `demon` |  | Los Demonios |
| Elite Enemy | `elite_enemy_001` | military, enemy, elite |  |
| Ghost Enemy | `ghost_enemy_001` | military, enemy, ghost |  |
| Grenadier Enemy | `grenadier_enemy_001` | military, enemy, grenadier |  |
| Machinegunner Enemy | `machinegunner_enemy_001` | military, enemy, machinegunner, male |  |
| Private Enemy 1 | `private_enemy_001` | military, enemy, grunt, private, male |  |
| Private Enemy 2 | `private_enemy_002` | military, enemy, grunt, private, female |  |
| Rpg Enemy | `rpg_enemy_001` | military, enemy, rpg |  |
| Shielder Enemy | `shielder_enemy_001` | military, enemy, shielder, shield, shieldbearer |  |
| Sniper Enemy | `sniper_enemy_001` | military, enemy, sniper |  |
| Super Elite Enemy | `super_elite_enemy_001` | military, enemy, super_elite |  |
| Titan Enemy | `titan_enemy_001` | military, enemy, titan |  |

### Paratroopers {#paratroopers}

| Name | Character | Tags | DLC |
|---|---|---|---|
|  | `paratrooper_elite_enemy_001` | enemy_paratrooper, elite_paratrooper |  |

### Rebel {#rebel}

| Name | Character | Tags | DLC |
|---|---|---|---|
|  | `female_rebel_001` | rebel, female |  |
|  | `female_rebel_002` | rebel, female |  |
|  | `female_rebel_003` | rebel, female |  |
|  | `female_rebel_004` | rebel, female |  |
| Female Rebel Prisoner 1 | `female_rebel_prisoner_01` | rebel_prisoner, female |  |
| Female Rebel Prisoner 2 | `female_rebel_prisoner_02` | rebel_prisoner, female |  |
| Female Rebel Prisoner 3 | `female_rebel_prisoner_03` | rebel_prisoner, female |  |
| Female Rebel Tier 1 1 | `female_rebel_tier_1_01` | female, rebel_part_prototype, aoc_tier_1 |  |
| Female Rebel Tier 1 2 | `female_rebel_tier_1_02` | female, rebel_part_prototype, aoc_tier_1 |  |
| Female Rebel Tier 1 3 | `female_rebel_tier_1_03` | female, rebel_part_prototype, aoc_tier_1 |  |
| Female Rebel Tier 2 1 | `female_rebel_tier_2_01` | female, rebel_part_prototype, aoc_tier_2 |  |
| Female Rebel Tier 2 2 | `female_rebel_tier_2_02` | female, rebel_part_prototype, aoc_tier_2 |  |
| Female Rebel Tier 2 3 | `female_rebel_tier_2_03` | female, rebel_part_prototype, aoc_tier_2 |  |
| Female Rebel Tier 3 1 | `female_rebel_tier_3_01` | female, rebel_part_prototype, aoc_tier_3 |  |
| Female Rebel Tier 3 2 | `female_rebel_tier_3_02` | female, rebel_part_prototype, aoc_tier_3 |  |
| Female Rebel Tier 3 3 | `female_rebel_tier_3_03` | female, rebel_part_prototype, aoc_tier_3 |  |
|  | `male_rebel_001` | rebel, male |  |
|  | `male_rebel_002` | rebel, male |  |
|  | `male_rebel_003` | rebel, male |  |
|  | `male_rebel_004` | rebel, male |  |
| Male Rebel Prisoner 1 | `male_rebel_prisoner_01` | rebel_prisoner, male |  |
| Male Rebel Prisoner 2 | `male_rebel_prisoner_02` | rebel_prisoner, male |  |
| Male Rebel Prisoner 3 | `male_rebel_prisoner_03` | rebel_prisoner, male |  |
| Male Rebel Tier 1 1 | `male_rebel_tier_1_01` | male, rebel_part_prototype, aoc_tier_1 |  |
| Male Rebel Tier 1 2 | `male_rebel_tier_1_02` | male, rebel_part_prototype, aoc_tier_1 |  |
| Male Rebel Tier 1 3 | `male_rebel_tier_1_03` | male, rebel_part_prototype, aoc_tier_1 |  |
| Male Rebel Tier 1 4 | `male_rebel_tier_1_04` | male, rebel_part_prototype, aoc_tier_1 |  |
| Male Rebel Tier 2 1 | `male_rebel_tier_2_01` | male, rebel_part_prototype, aoc_tier_2 |  |
| Male Rebel Tier 2 2 | `male_rebel_tier_2_02` | male, rebel_part_prototype, aoc_tier_2 |  |
| Male Rebel Tier 2 3 | `male_rebel_tier_2_03` | male, rebel_part_prototype, aoc_tier_2 |  |
| Male Rebel Tier 2 4 | `male_rebel_tier_2_04` | male, rebel_part_prototype, aoc_tier_2 |  |
| Male Rebel Tier 3 1 | `male_rebel_tier_3_01` | male, rebel_part_prototype, aoc_tier_3 |  |
| Male Rebel Tier 3 2 | `male_rebel_tier_3_02` | male, rebel_part_prototype, aoc_tier_3 |  |
| Male Rebel Tier 3 3 | `male_rebel_tier_3_03` | male, rebel_part_prototype, aoc_tier_3 |  |
| Male Rebel Tier 3 4 | `male_rebel_tier_3_04` | male, rebel_part_prototype, aoc_tier_3 |  |
| Sargentos Rebel Female 1 | `sargentos_rebel_female_01` | sargento_rebel, female |  |
| Sargentos Rebel Female 2 | `sargentos_rebel_female_02` | sargento_rebel, female |  |
| Sargentos Rebel Female 3 | `sargentos_rebel_female_03` | sargento_rebel, female |  |
| Sargentos Rebel Male 1 | `sargentos_rebel_male_01` | sargento_rebel, male |  |
| Sargentos Rebel Male 2 | `sargentos_rebel_male_02` | sargento_rebel, male |  |
| Sargentos Rebel Male 3 | `sargentos_rebel_male_03` | sargento_rebel, male |  |

### Civilian {#civilian}

| Name | Character | Tags | DLC |
|---|---|---|---|
|  | `bouncer001` | bouncer, male |  |
| Airport Worker Female | `civ_airport_worker_female_01` | airport, female |  |
| Airport Worker Male | `civ_airport_worker_male_01` | airport, male |  |
| Alpine Scientist Female | `civ_alpine_scientist_female` | alpine_scientist, female |  |
| Alpine Scientist Male | `civ_alpine_scientist_male` | alpine_scientist, male |  |
| Alpine Worker Female | `civ_alpine_worker_female_01` | alpine_worker, female |  |
| Alpine Worker Male | `civ_alpine_worker_male_01` | alpine_worker, male |  |
| Art Vendor Female | `civ_art_vendor_female_01` | civilian, female, vendor, art, art_vendor |  |
| Art Vendor Male | `civ_art_vendor_male_01` | civilian, male, vendor, art, art_vendor |  |
| Athletic Female | `civ_athletic_female_001` | athletic, athlete, female |  |
| Athletic Male | `civ_athletic_male_001` | athletic, athlete, male |  |
| Bartender Female | `civ_bartender_female_01` | civilian, female, bartender, waitor |  |
| Bartender Male | `civ_bartender_male_01` | civilian, male, bartender, waitor |  |
| Beachgoer Female | `civ_beachgoer_female_01` | civilian, female, beach, beachgoer |  |
| Beachgoer Male | `civ_beachgoer_male_01` | civilian, male, beach, beachgoer |  |
| Bolo Santosi | `civ_bolo_santosi_01` | bolo_santosi, mhc |  |
| Brrd Male | `civ_brrd_male_01` | brrd, male |  |
| Business Female | `civ_business_female_001` | civilian, female, worldsim, business, grassland, wealthycity |  |
| Business Male | `civ_business_male_001` | civilian, male, worldsim, business, grassland, wealthycity |  |
| Construction Worker Female | `civ_construction_worker_female_01` | civilian, female, construction |  |
| Construction Worker Male | `civ_construction_worker_male_01` | civilian, male, construction |  |
| Desert Female | `civ_desert_female_01` | civilian, female, worldsim, desert |  |
| Desert Male | `civ_desert_male_01` | civilian, male, worldsim, desert |  |
| Dockworker Female | `civ_dockworker_female_01` | civilian, female, dock, dockworker, harbor |  |
| Dockworker Male | `civ_dockworker_male_01` | civilian, male, dock, dockworker, harbor |  |
| Evil Target Female | `civ_evil_target_female_01` | backer_evil_target, female |  |
| Evil Target Male | `civ_evil_target_male_01` | backer_evil_target, male |  |
| Factory Worker Female | `civ_factory_worker_female_01` | civilian, female, factory |  |
| Factory Worker Male | `civ_factory_worker_male_01` | civilian, male, factory |  |
| Farmer Female | `civ_farmer_female_01` | civilian, female, farmer |  |
| Farmer Male | `civ_farmer_male_01` | civilian, male, farmer |  |
| Favela Female | `civ_favela_female_01` | civilian, female, worldsim, rainforest, favela |  |
| Favela Male | `civ_favela_male_01` | civilian, male, worldsim, rainforest, favela |  |
| Food Vendor Female | `civ_food_vendor_female_01` | civilian, female, vendor, food_truck, foodtruck |  |
| Food Vendor Male | `civ_food_vendor_male_01` | civilian, male, vendor, food_truck, foodtruck |  |
| Garland Crew Female | `civ_garland_crew_female_01` | garland_crew, female |  |
| Garland Crew Male | `civ_garland_crew_male_01` | garland_crew, male |  |
| Garland Location Scout | `civ_garland_location_scout_001` | garland_scout, male, henry_hong, henry |  |
| Garland Pa | `civ_garland_pa_001` | garland_pa, garland_crew, female |  |
| Garland Pa Male | `civ_garland_pa_male_01` | garland_pa, garland_crew, male |  |
| Garland Stuntperson Helmet Female | `civ_garland_stuntperson_helmet_female_01` | garland_stunt_helmet, female, helmet |  |
| Garland Stuntperson Helmet Male | `civ_garland_stuntperson_helmet_male_01` | garland_stunt_helmet, male, helmet |  |
| Gas Station Female | `civ_gas_station_female_01` | gas_station, gas, female |  |
| Gas Station Male | `civ_gas_station_male_01` | gas_station, gas, male |  |
| Graffitiartist Female | `civ_graffitiartist_female_01` | graffiti, female |  |
| Graffitiartist Male | `civ_graffitiartist_male_01` | graffiti, male |  |
| Grasslands Female | `civ_grasslands_female_01` | civilian, female, worldsim, grassland |  |
| Grasslands Male | `civ_grasslands_male_01` | civilian, male, worldsim, grassland |  |
| Greenman Female | `civ_greenman_female_01` | greenman_female, mhc |  |
| Greenman Male | `civ_greenman_male_01` | greenman_male, mhc |  |
| Javi Soldier | `civ_javi_soldier_001` | javi_soldier, male |  |
| Javi Soldier Full Body | `civ_javi_soldier_full_body` | male |  |
| Lumberyard Female | `civ_lumberyard_female_01` | civilian, female, lumber, lumberyard |  |
| Lumberyard Male | `civ_lumberyard_male_01` | civilian, male, lumber, lumberyard |  |
| Matsuda Male | `civ_matsuda_male_01` | matsuda, male |  |
| Mechanic Female | `civ_mechanic_female_01` | civilian, female, mechanic |  |
| Mechanic Male | `civ_mechanic_male_01` | civilian, male, mechanic |  |
| Miner Male | `civ_miner_male` | miner, male, construction |  |
| Node Hacker Male 1 | `civ_node_hacker_male_01` | node_hacker, male |  |
| Node Hacker Male 2 | `civ_node_hacker_male_02` | node_hacker, male |  |
| Node Hacker Male 3 | `civ_node_hacker_male_03` | node_hacker, male |  |
| Node Hacker Male 4 | `civ_node_hacker_male_04` | node_hacker, male |  |
| Prisoner Female | `civ_prisoner_female` | prisoner, female |  |
| Prisoner Male | `civ_prisoner_male` | prisoner, male |  |
| Rainforest Female | `civ_rainforest_female_01` | civilian, female, worldsim, rainforest, village |  |
| Rainforest Male | `civ_rainforest_male_01` | civilian, male, worldsim, rainforest, village |  |
| Rome Male | `civ_rome_male_01` | rome, male |  |
| Sargento Soldier Female | `civ_sargento_soldier_female_01` | sargento_soldier, female |  |
| Sargento Soldier Male | `civ_sargento_soldier_male_01` | sargento_soldier, male |  |
| Scientist Female | `civ_scientist_female` | scientist, female |  |
| Scientist Male | `civ_scientist_male` | scientist, male |  |
| Soccer Aa Female | `civ_soccer_aa_female_01` | athletic, soccer, female, aa |  |
| Soccer Aa Male | `civ_soccer_aa_male_01` | athletic, soccer, male, aa |  |
| Soccer Esp Female | `civ_soccer_esp_female_01` | athletic, soccer, female, esp |  |
| Soccer Esp Male | `civ_soccer_esp_male_01` | athletic, soccer, male, esp |  |
| Soccer Female | `civ_soccer_female_001` | athletic, soccer, female |  |
| Soccer Male | `civ_soccer_male_001` | athletic, soccer, male |  |
| Steelworker Female | `civ_steelworker_female_01` | industrial, steelworker, female |  |
|  | `civ_steelworker_male_01` | industrial, steelworker, male |  |
| Street Musician Female | `civ_street_musician_female_01` | street_musician, busker, female |  |
| Street Musician Male | `civ_street_musician_male_01` | street_musician, busker, male |  |
| Techengineer Female | `civ_techengineer_female` | engineer, female |  |
| Techengineer Male | `civ_techengineer_male` | engineer, male |  |
| Upperclass Female | `civ_upperclass_female_01` | civilian, female, worldsim, grassland, upperclass, wealthycity |  |
| Upperclass Male | `civ_upperclass_male_01` | civilian, male, worldsim, grassland, upperclass, wealthycity |  |
| Vagrant Female | `civ_vagrant_female_001` | civilian, female, vagrant |  |
| Vagrant Male | `civ_vagrant_male_001` | civilian, male, vagrant |  |
|  | `civilian_gen_female_001` | civilian, female, worldsim, grassland, desert, ocean, rainforest |  |
|  | `civilian_gen_female_002` | civilian, female, worldsim, alpine, ocean |  |
|  | `civilian_gen_female_003` | civilian, female, worldsim, grassland, desert, ocean, rainforest |  |
|  | `civilian_gen_female_004` | civilian, female, worldsim, grassland, desert, ocean, rainforest |  |
|  | `civilian_gen_female_005` | civilian, female, worldsim, grassland, desert, ocean, rainforest |  |
|  | `civilian_gen_female_006` | civilian, female, worldsim, grassland, desert, ocean, rainforest |  |
|  | `civilian_gen_male_001` | civilian, male, worldsim, grassland, desert, ocean, rainforest |  |
|  | `civilian_gen_male_002` | civilian, male, worldsim, alpine |  |
|  | `civilian_gen_male_003` | civilian, male, worldsim, grassland, desert, ocean, rainforest |  |
|  | `civilian_gen_male_004` | civilian, male, worldsim, grassland, desert, ocean, rainforest |  |
|  | `civilian_gen_male_005` | civilian, male, worldsim, grassland, desert, ocean, rainforest |  |
|  | `civilian_gen_male_006` | civilian, male, worldsim, grassland, desert, ocean, rainforest |  |
|  | `spearfisher001` | spear_fisherman, spear_fisher, male, rainforest, village |  |

### Daredevil civilians {#daredevil-civilians}

| Name | Character | Tags | DLC |
|---|---|---|---|
| Ex-Convict Racer Female 1 | `civ_exconvict_racer_female_01` | female, exconvict, racer, nonhero | Dare Devils of Destruction |
| Ex-Convict Racer Female 2 | `civ_exconvict_racer_female_02` | female, exconvict, racer, nonhero | Dare Devils of Destruction |
| Ex-Convict Racer Female 3 | `civ_exconvict_racer_female_03` | female, exconvict, racer, nonhero | Dare Devils of Destruction |
| Ex-Convict Racer Male 1 | `civ_exconvict_racer_male_01` | male, exconvict, racer, nonhero | Dare Devils of Destruction |
| Ex-Convict Racer Male 2 | `civ_exconvict_racer_male_02` | male, exconvict, racer, nonhero | Dare Devils of Destruction |
| Ex-Convict Racer Male 3 | `civ_exconvict_racer_male_03` | male, exconvict, racer, nonhero | Dare Devils of Destruction |
| Mechanic Racer Female 1 | `civ_mechanic_racer_female_01` | female, mechanic_racer, racer, nonhero | Dare Devils of Destruction |
| Mechanic Racer Female 2 | `civ_mechanic_racer_female_02` | female, mechanic_racer, racer, nonhero | Dare Devils of Destruction |
| Mechanic Racer Female 3 | `civ_mechanic_racer_female_03` | female, mechanic_racer, racer, nonhero | Dare Devils of Destruction |
| Mechanic Racer Male 1 | `civ_mechanic_racer_male_01` | male, mechanic_racer, racer, nonhero | Dare Devils of Destruction |
| Mechanic Racer Male 2 | `civ_mechanic_racer_male_02` | male, mechanic_racer, racer, nonhero | Dare Devils of Destruction |
| Mechanic Racer Male 3 | `civ_mechanic_racer_male_03` | male, mechanic_racer, racer, nonhero | Dare Devils of Destruction |
| Trendy Racer Escarlata | `civ_trendy_racer_escarlata` | escarlata | Dare Devils of Destruction |
| Trendy Racer Female 1 | `civ_trendy_racer_female_01` | female, trendy, racer, nonhero | Dare Devils of Destruction |
| Trendy Racer Female 2 | `civ_trendy_racer_female_02` | female, trendy, racer, nonhero, helmet | Dare Devils of Destruction |
| Trendy Racer Female 3 | `civ_trendy_racer_female_03` | female, trendy, racer, nonhero, helmet | Dare Devils of Destruction |
| Trendy Racer Male 1 | `civ_trendy_racer_male_01` | male, trendy, racer, nonhero | Dare Devils of Destruction |
| Trendy Racer Male 2 | `civ_trendy_racer_male_02` | male, trendy, racer, nonhero, helmet | Dare Devils of Destruction |
| Trendy Racer Male 3 | `civ_trendy_racer_male_03` | male, trendy, racer, nonhero, helmet | Dare Devils of Destruction |

### Agency (Danger Rising) {#agency-danger-rising}

| Name | Character | Tags | DLC |
|---|---|---|---|
| Agent Enemy Female 1 | `agency_agent_enemy_female_001` | agency, agent, enemy, female | Danger Rising |
| Agent Enemy Male 1 | `agency_agent_enemy_male_001` | agency, agent, enemy, male | Danger Rising |
| Agent Enemy VIP Female 1 | `agency_agent_enemy_vip_female01` |  | Danger Rising |
| Agent Enemy VIP Female 2 | `agency_agent_enemy_vip_female02` |  | Danger Rising |
| Agent Enemy VIP Female 3 | `agency_agent_enemy_vip_female03` |  | Danger Rising |
| Agent Enemy VIP Male 1 | `agency_agent_enemy_vip_male01` |  | Danger Rising |
| Agent Enemy VIP Male 2 | `agency_agent_enemy_vip_male02` |  | Danger Rising |
| Agent Enemy VIP Male 3 | `agency_agent_enemy_vip_male03` |  | Danger Rising |
| Agent Enemy VIP Titan 1 | `agency_agent_enemy_vip_titan01` |  | Danger Rising |
| Footsoldier Enemy Female 1 | `agency_footsoldier_enemy_female_001` | agency, footsoldier, enemy, basic, female | Danger Rising |
| Footsoldier Enemy Male 1 | `agency_footsoldier_enemy_male_001` | agency, footsoldier, enemy, basic, male | Danger Rising |
| Sniper Enemy Female 1 | `agency_sniper_enemy_female_001` | agency, agency_sniper_character, enemy, female | Danger Rising |
| Sniper Enemy Male 1 | `agency_sniper_enemy_male_001` | agency, agency_sniper_character, enemy, male | Danger Rising |
| Agent Miller | `agent_miller` | miller, emerson, emerson_miller | Danger Rising |

### Easter egg {#easter-egg}

| Name | Character | Tags | DLC |
|---|---|---|---|
|  | `civ_female_aha_dancer_follower` | aha_dancer_follower |  |

### Animals {#animals}

Animals are characters in the game too, so they spawn as NPCs. The NPC commands were made for people; how well an animal follows them has not been tested.

| Name | Character | Tags | DLC |
|---|---|---|---|
| Capybara | `capybara` | worldsim, rainforest, grassland |  |
| Cow Caracu 01 | `cow_caracu_01` | cow, caracu, female, herd, worldsim, grassland |  |
| Cow Caracu 02 | `cow_caracu_02` | cow, caracu, male, bull, herd, worldsim, grassland |  |
| Cow Generic 01 | `cow_generic_01` | cow, cow_generic, female, herd, worldsim, grassland |  |
| Cow Holando Argentino 01 | `cow_holando_argentino_01` | cow, holando_argentino, female, worldsim, domestic |  |
| Cow Holando Argentino 02 | `cow_holando_argentino_02` | cow, holando_argentino, male, bull, worldsim, domestic |  |
| Cow Indo Brazilian 01 | `cow_indo_brazilian_01` | cow, indo_brazilian, female, herd, worldsim, grassland, rainforest |  |
| Cow Indo Brazilian 02 | `cow_indo_brazilian_02` | cow, indo_brazilian, male, bull, herd, worldsim, grassland, rainforest |  |
| Deer Buck | `deer_buck` | deer, buck, worldsim, grassland, alpine |  |
| Deer Doe | `deer_doe` | deer, doe, worldsim, grassland, alpine |  |
| Dog | `dog` | character |  |
| Domestic Pig | `domestic_pig` | worldsim, domestic |  |
| Feral Hog | `feral_hog` | worldsim, grassland, rainforest |  |
| Goat Bhuj | `goat_bhuj` | goat, bhuj, worldsim, grassland, desert |  |
| Goat Generic | `goat_generic` | goat, generic, worldsim, grassland, alpine, desert |  |
| Goat Repartida | `goat_repartida` | goat, repartida, worldsim, grassland, desert |  |
| Llama 01 | `llama_01` | llama, worldsim, herd, alpine, grassland |  |
| Llama 02 | `llama_02` | llama, worldsim, herd, alpine, grassland |  |
| Llama 03 Sheared | `llama_03_sheared` | llama_03, llama_sheared, worldsim, domestic |  |
| Tapir | `tapir` | worldsim, rainforest |  |
| Wild Boar | `wild_boar` | worldsim, grassland, rainforest |  |

## Prototype entries {#prototype-entries}

The game also registers every exported entity under a second name ending in `_debug` (the editor's prototype spawn list). These names are valid spawn names in the retail game, but they were not made for regular gameplay and have not been tested with JC4MP, so prefer the names above and test a `_debug` name before you rely on it.

#### animals/cow {#animalscow}

| Character | DLC |
|---|---|
| `caracu_cow_01_debug` |  |
| `caracu_cow_02_debug` |  |
| `cow_base_debug` |  |
| `holando_argentino_cow_01_debug` |  |
| `holando_argentino_cow_02_debug` |  |
| `indo_brazilian_cattle01_bull_debug` |  |
| `indo_brazilian_cattle01_cow_debug` |  |
| `power_cow_debug` |  |

#### animals/deer {#animalsdeer}

| Character | DLC |
|---|---|
| `deer_buck_debug` |  |
| `deer_doe_debug` |  |

#### animals/dog {#animalsdog}

| Character | DLC |
|---|---|
| `dog_debug` |  |

#### animals/goat {#animalsgoat}

| Character | DLC |
|---|---|
| `bhuj_goat_debug` |  |
| `goat_generic_debug` |  |
| `repartida_goat_debug` |  |
| `tapir_debug` |  |

#### animals/llama {#animalsllama}

| Character | DLC |
|---|---|
| `llama_02_debug` |  |
| `llama_03_sheared_debug` |  |
| `llama_debug` |  |

#### animals/pigs {#animalspigs}

| Character | DLC |
|---|---|
| `capybara_debug` |  |
| `domestic_pig_debug` |  |
| `feral_hog_debug` |  |
| `wild_boar_debug` |  |

#### civilians/01_generic/female {#civilians01_genericfemale}

| Character | DLC |
|---|---|
| `civ_female_gen_001_debug` |  |
| `civ_female_gen_002_debug` |  |
| `civ_female_gen_003_debug` |  |
| `civ_female_gen_004_debug` |  |
| `civ_female_gen_005_debug` |  |
| `civ_female_gen_006_debug` |  |

#### civilians/01_generic/male {#civilians01_genericmale}

| Character | DLC |
|---|---|
| `civ_male_gen_001_debug` |  |
| `civ_male_gen_002_debug` |  |
| `civ_male_gen_003_debug` |  |
| `civ_male_gen_004_debug` |  |
| `civ_male_gen_005_debug` |  |
| `civ_male_gen_006_debug` |  |

#### civilians/02_scientists {#civilians02_scientists}

| Character | DLC |
|---|---|
| `civ_alpine_scientist_001_debug` |  |
| `civ_alpine_scientist_002_debug` |  |
| `civ_alpine_scientist_female_debug` |  |
| `civ_alpine_scientist_male_debug` |  |
| `civ_scientist_female_debug` |  |
| `civ_scientist_male_debug` |  |

#### civilians/03_engineers {#civilians03_engineers}

| Character | DLC |
|---|---|
| `civ_alpine_worker_female_01_debug` |  |
| `civ_alpine_worker_male_01_debug` |  |
| `civ_node_hacker_male_01_debug` |  |
| `civ_node_hacker_male_02_debug` |  |
| `civ_node_hacker_male_03_debug` |  |
| `civ_node_hacker_male_04_debug` |  |
| `civ_techengineer_female_debug` |  |
| `civ_techengineer_male_debug` |  |

#### civilians/04_miners {#civilians04_miners}

| Character | DLC |
|---|---|
| `civ_miner_male_debug` |  |

#### civilians/05_industrial {#civilians05_industrial}

| Character | DLC |
|---|---|
| `civ_construction_worker_female_01_debug` |  |
| `civ_construction_worker_male_01_debug` |  |
| `civ_lumberyard_female_01_debug` |  |
| `civ_lumberyard_male_01_debug` |  |
| `civ_mechanic_female_01_debug` |  |
| `civ_mechanic_male_01_debug` |  |
| `civ_steelworker_001_debug` |  |
| `civ_steelworker_female_01_debug` |  |

#### civilians/06_backer_content {#civilians06_backer_content}

| Character | DLC |
|---|---|
| `civ_evil_target_female_01_debug` |  |
| `civ_evil_target_male_01_debug` |  |
| `civ_garland_crew_female_01_debug` |  |
| `civ_garland_crew_male_01_debug` |  |
| `civ_garland_location_scout_001_debug` |  |
| `civ_garland_pa_001_debug` |  |
| `civ_garland_pa_male_01_debug` |  |
| `civ_garland_stuntperson_helmet_female_01_debug` |  |
| `civ_garland_stuntperson_helmet_male_01_debug` |  |
| `civ_javi_soldier_001_debug` |  |
| `civ_javi_soldier_full_body_debug` |  |
| `civ_sargento_soldier_female_01_debug` |  |
| `civ_sargento_soldier_male_01_debug` |  |

#### civilians/07_prisoners {#civilians07_prisoners}

| Character | DLC |
|---|---|
| `civ_prisoner_female_debug` |  |
| `civ_prisoner_male_debug` |  |

#### civilians/08_social {#civilians08_social}

| Character | DLC |
|---|---|
| `civ_bolo_santosi_01_debug` |  |
| `civ_bouncer_001_debug` |  |
| `civ_brrd_male_01_debug` |  |
| `civ_greenman_female_01_debug` |  |
| `civ_greenman_male_01_debug` |  |
| `civ_matsuda_male_01_debug` |  |
| `civ_rome_male_01_debug` |  |

#### civilians/09_maritime {#civilians09_maritime}

| Character | DLC |
|---|---|
| `civ_beachgoer_female_01_debug` |  |
| `civ_beachgoer_male_01_debug` |  |
| `civ_dockworker_female_01_debug` |  |
| `civ_dockworker_male_01_debug` |  |
| `civ_spear_fisherman_001_debug` |  |

#### civilians/10_rainforest {#civilians10_rainforest}

| Character | DLC |
|---|---|
| `civ_favela_female_01_debug` |  |
| `civ_favela_male_01_debug` |  |
| `civ_rainforest_female_01_debug` |  |
| `civ_rainforest_male_01_debug` |  |

#### civilians/11_desert {#civilians11_desert}

| Character | DLC |
|---|---|
| `civ_desert_female_01_debug` |  |
| `civ_desert_male_01_debug` |  |

#### civilians/12_grasslands {#civilians12_grasslands}

| Character | DLC |
|---|---|
| `civ_grasslands_female_01_debug` |  |
| `civ_grasslands_male_01_debug` |  |

#### civilians/14_business {#civilians14_business}

| Character | DLC |
|---|---|
| `civ_business_female_001_debug` |  |
| `civ_business_male_001_debug` |  |

#### civilians/15_poor {#civilians15_poor}

| Character | DLC |
|---|---|
| `civ_vagrant_female_001_debug` |  |
| `civ_vagrant_male_001_debug` |  |

#### civilians/16_athletic {#civilians16_athletic}

| Character | DLC |
|---|---|
| `civ_athletic_female_001_debug` |  |
| `civ_athletic_male_001_debug` |  |
| `civ_soccer_aa_female_01_debug` |  |
| `civ_soccer_aa_male_01_debug` |  |
| `civ_soccer_esp_female_01_debug` |  |
| `civ_soccer_esp_male_01_debug` |  |
| `civ_soccer_female_001_debug` |  |
| `civ_soccer_male_001_debug` |  |

#### civilians/17_upperclass {#civilians17_upperclass}

| Character | DLC |
|---|---|
| `civ_upperclass_female_01_debug` |  |
| `civ_upperclass_male_01_debug` |  |

#### civilians/18_farmers {#civilians18_farmers}

| Character | DLC |
|---|---|
| `civ_farmer_female_01_debug` |  |
| `civ_farmer_male_01_debug` |  |

#### civilians/19_service {#civilians19_service}

| Character | DLC |
|---|---|
| `civ_bartender_female_01_debug` |  |
| `civ_bartender_male_01_debug` |  |

#### civilians/20_civilservants {#civilians20_civilservants}

| Character | DLC |
|---|---|
| `civ_airport_worker_female_01_debug` |  |
| `civ_airport_worker_male_01_debug` |  |
| `civ_art_vendor_female_01_debug` |  |
| `civ_art_vendor_male_01_debug` |  |
| `civ_factory_worker_female_01_debug` |  |
| `civ_factory_worker_male_01_debug` |  |
| `civ_food_vendor_female_01_debug` |  |
| `civ_food_vendor_male_01_debug` |  |
| `civ_gas_station_female_01_debug` |  |
| `civ_gas_station_male_01_debug` |  |

#### civilians/21_graffiti {#civilians21_graffiti}

| Character | DLC |
|---|---|
| `civ_graffitiartist_female_01_debug` |  |
| `civ_graffitiartist_male_01_debug` |  |

#### civilians/22_musician {#civilians22_musician}

| Character | DLC |
|---|---|
| `civ_street_musician_female_01_debug` |  |
| `civ_street_musician_male_01_debug` |  |

#### combatants/enemy/elite {#combatantsenemyelite}

| Character | DLC |
|---|---|
| `elite_enemy_001_debug` |  |

#### combatants/enemy/ghost {#combatantsenemyghost}

| Character | DLC |
|---|---|
| `ghost_enemy_001_debug` |  |

#### combatants/enemy/grenadier {#combatantsenemygrenadier}

| Character | DLC |
|---|---|
| `grenadier_enemy_001_debug` |  |

#### combatants/enemy/machinegunner {#combatantsenemymachinegunner}

| Character | DLC |
|---|---|
| `machinegunner_enemy_001_debug` |  |

#### combatants/enemy/paratrooper {#combatantsenemyparatrooper}

| Character | DLC |
|---|---|
| `elite_paratrooper_debug` |  |

#### combatants/enemy/private {#combatantsenemyprivate}

| Character | DLC |
|---|---|
| `private_enemy_001_debug` |  |
| `private_enemy_002_debug` |  |

#### combatants/enemy/rpg {#combatantsenemyrpg}

| Character | DLC |
|---|---|
| `rpg_enemy_001_debug` |  |

#### combatants/enemy/shielder {#combatantsenemyshielder}

| Character | DLC |
|---|---|
| `shielder_enemy_001_debug` |  |

#### combatants/enemy/sniper {#combatantsenemysniper}

| Character | DLC |
|---|---|
| `sniper_enemy_001_debug` |  |

#### combatants/enemy/super_elite {#combatantsenemysuper_elite}

| Character | DLC |
|---|---|
| `super_elite_enemy_001_debug` |  |

#### combatants/enemy/titan {#combatantsenemytitan}

| Character | DLC |
|---|---|
| `titan_enemy_001_debug` |  |

#### combatants/rebels {#combatantsrebels}

| Character | DLC |
|---|---|
| `female_rebel_001_avg_debug` |  |
| `female_rebel_002_avg_debug` |  |
| `female_rebel_003_avg_debug` |  |
| `female_rebel_004_avg_debug` |  |
| `female_rebel_prisoner_01_debug` |  |
| `female_rebel_prisoner_02_debug` |  |
| `female_rebel_prisoner_03_debug` |  |
| `female_rebel_tier_1_01_debug` |  |
| `female_rebel_tier_1_02_debug` |  |
| `female_rebel_tier_1_03_debug` |  |
| `female_rebel_tier_2_01_debug` |  |
| `female_rebel_tier_2_02_debug` |  |
| `female_rebel_tier_2_03_debug` |  |
| `female_rebel_tier_3_01_debug` |  |
| `female_rebel_tier_3_02_debug` |  |
| `female_rebel_tier_3_03_debug` |  |
| `male_rebel_001_avg_debug` |  |
| `male_rebel_002_avg_debug` |  |
| `male_rebel_003_avg_debug` |  |
| `male_rebel_004_avg_debug` |  |
| `male_rebel_prisoner_01_debug` |  |
| `male_rebel_prisoner_02_debug` |  |
| `male_rebel_prisoner_03_debug` |  |
| `male_rebel_tier_1_01_debug` |  |
| `male_rebel_tier_1_02_debug` |  |
| `male_rebel_tier_1_03_debug` |  |
| `male_rebel_tier_1_04_debug` |  |
| `male_rebel_tier_2_01_debug` |  |
| `male_rebel_tier_2_02_debug` |  |
| `male_rebel_tier_2_03_debug` |  |
| `male_rebel_tier_2_04_debug` |  |
| `male_rebel_tier_3_01_debug` |  |
| `male_rebel_tier_3_02_debug` |  |
| `male_rebel_tier_3_03_debug` |  |
| `male_rebel_tier_3_04_debug` |  |

#### combatants/rebels/sargento_quest_rebels {#combatantsrebelssargento_quest_rebels}

| Character | DLC |
|---|---|
| `sargentos_rebel_female_01_debug` |  |
| `sargentos_rebel_female_02_debug` |  |
| `sargentos_rebel_female_03_debug` |  |
| `sargentos_rebel_male_01_debug` |  |
| `sargentos_rebel_male_02_debug` |  |
| `sargentos_rebel_male_03_debug` |  |

#### easter_egg {#easter_egg}

| Character | DLC |
|---|---|
| `civ_female_aha_dancer_follower_debug` |  |

#### main_characters {#main_characters}

| Character | DLC |
|---|---|
| `cesar_debug` |  |
| `dictator_debug` |  |
| `dictator_guard_debug` |  |
| `gabriela_debug` |  |
| `garland_debug` |  |
| `izzy_debug` |  |
| `javi_debug` |  |
| `lanza_debug` |  |
| `miguel_rodriguez_debug` |  |
| `mira_debug` |  |
| `oscar_debug` |  |
| `oscar_young_debug` |  |
| `rico_debug` |  |
| `sargento_debug` |  |
| `sheldon_debug` |  |

#### previewer {#previewer}

| Character | DLC |
|---|---|
| `civilian_previewer_debug` |  |
| `enemy_previewer_debug` |  |
| `rico_preview_debug` |  |