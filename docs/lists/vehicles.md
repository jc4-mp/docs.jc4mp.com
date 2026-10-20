---
sidebar_position: 88
---

# Vehicle Models

Every vehicle model name the game's spawn system knows, for [`World.SpawnVehicle`](../server/world.md). The list was built from the retail game's spawn definitions (base game and every DLC), so each name below is one the game accepts. Use it to pick a model for a spawn menu, a gamemode or a garage.

**Available on:** Server

## Usage {#usage}

### World.SpawnVehicle(model, position, rotation?, health?) {#worldspawnvehiclemodel-position-rotation-health}

`model` is the **Model** column of the tables below. The server creates the vehicle and every client spawns that model from its own game files, so a model must be a unique name, typed exactly as listed (lowercase).

- `rotation` is optional euler angles in degrees (`vec3`), `health` an optional starting health from 0 to 1. See [World](../shared/world.md) for the full reference.
- The game also accepts tag strings (for example `"vehicle,air,helicopter"`), which pick a random vehicle that has all the tags. Every client makes that pick on its own, so players could see different vehicles: always pass a unique model name.
- A name the game doesn't know spawns nothing on the clients: the handle exists on the server but no vehicle appears.
- Drones (`v250_*`, `v251_*`, `v252_*`, `v254_*`, `v270_*`) work with the drone methods on [VehicleHandle](../shared/objects/vehicle.md).

The **Name** column is the in-game name where one is known (taken from the default resources' spawn lists), **Tags** are the spawn tags the game gives the model and **DLC** names the DLC the model needs. Rows with a **DLC** value only exist for players who own and installed that DLC (see [DLC content](./README.md#dlc-content)).

**Example**

```lua
-- spawns a Prisa Temerario ATV next to the player who asks for it, facing east
Net.AddEvent("SpawnATV", function()
	local player = Net.Sender():GetPlayer()
	if not player then return end

	local vehicle = World.SpawnVehicle("v000_car_atv_civilian_01", player:GetPosition() + vec3(3, 1, 0), vec3(0, 90, 0))

	vehicle:SetPrimaryColor(1, 0.2, 0.1)
end)
```

## Values {#values}

### Land Vehicle / Agency DLC {#land-vehicle--agency-dlc}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Pugilista SUV (Mission) | `v002_car_vintagesuv_rebel_mission_special_dlc3_intro` | mission_special |  |
| Agency Hovercraft | `v851_car_hovercraft_agency` | sea, boat, agency, armed, hovercraft, amphibious | Danger Rising |
| Agency Hovercraft (Mission) | `v851_car_hovercraft_agency_mission_special_dlc3_outro` | amphibious, mission | Danger Rising |
| Agency SAM Launcher | `v908_trailer_agencysmallmobileweapon_agency` | land, trailer, agency, sam, armed | Danger Rising |

### Land Vehicle / Backer {#land-vehicle--backer}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Prisa Temerario ATV | `v000_car_atv_javi` | land, javi_vehicle, javi_atv |  |
|  | `v002_car_vintagesuv_javi` | land, javi_vehicle, javi_jeep, javi_suv |  |
| Cadadía '83 Hatchback | `v011_car_oldtwodoorhatch_sargento` | land, sargento_vehicle, sargento_hatch |  |
| Garland King Studios Van | `v035_car_modernvan_garland` | land, garland_vehicle, garland_van |  |
| Prisa Hidalgo | `v040_car_oldcompact_sargento` | land, sargento_vehicle, sargento_oldcompact |  |
| Prisa Maradona Z | `v308_bike_trials_javi` | land, javi_vehicle, javi_bike |  |

### Land Vehicle / Bomb {#land-vehicle--bomb}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Rigged Coyle Mambo | `v017_car_vintagemuscle_bomb_special` | land, car, bomb_special |  |
| Rigged Chupacabra | `v018_car_monstertruck_bomb_special` | land, car, bomb_special |  |
| Rigged Charmant Limo | `v019_car_modernlimo_bomb_special` | land, car, bomb_special |  |
| Rigged Serpente S | `v021_car_sportsmuscle_bomb_special` | land, car, bomb_special |  |
| Rigged Mugello Farina Trio | `v022_car_moderncircuitracer_bomb_special` | land, car, bomb_special |  |
| Rigged Mugello Vistosa | `v023_car_racingsuper_bomb_special` | land, car, bomb_special |  |
| Rigged Verdeleon Eco | `v024_car_ecosuper_bomb_special` | land, car, bomb_special |  |
| Rigged Quipozza G | `v025_car_vintagesuper_bomb_special` | land, car, bomb_special |  |
| Rigged Raffinati | `v026_car_vintagesports_bomb_special` | land, car, bomb_special |  |
| Rigged Mugello V405 | `v303_bike_modernsuper_bomb_special` | land, bike, bomb_special |  |
| Rigged Furia Bike | `v304_bike_modernsport_bomb_special` | land, bike, bomb_special |  |

### Land Vehicle / Civilian {#land-vehicle--civilian}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Prisa Temerario ATV | `v000_car_atv_civilian_01` | land, car, civilian, atv, worldsim, alpine, rainforest, ocean |  |
| Pugilista SUV | `v002_car_vintagesuv_civilian` | land, car, civilian, worldsim, desert, rainforest |  |
| Ritmo Rickshaw | `v008_car_taxitrike_civilian` | land, car, trike, civilian, taxi, worldsim, rainforest |  |
| Cadadía '83 Hatchback | `v011_car_oldtwodoorhatch_civilian_01` | land, car, civilian, worldsim, desert, rainforest, ocean |  |
| Coyle Mambo | `v017_car_vintagemuscle_civilian` | land, car, civilian, sport, worldsim, rainforest, alpine, modern |  |
| Chupacabra | `v018_car_monstertruck_civilian_01` | land, car, monstertruck |  |
| Kerner Charmant Limo | `v019_car_modernlimo_civilian_01` | land, car, civilian, limo, vip, modern |  |
| Kerner '16 Vigeur | `v020_car_moderngrandtourer_civilian_01` | land, car, civilian, takedown, vip, worldsim, alpine, desert, modern |  |
| Kerner Serpente S | `v021_car_sportsmuscle_civilian_01` | land, car, civilian, takedown, sport, worldsim, grassland, alpine, modern |  |
| Mugello Farina Trio | `v022_car_moderncircuitracer_civilian_01` | land, car, civilian, takedown |  |
| 2019 Vistosa Supercar | `v023_car_racingsuper_civilian_01` | land, car, civilian, takedown, sport, worldsim, grassland, ocean, modern |  |
| Verdeleon Eco | `v024_car_ecosuper_civilian_01` | land, car, civilian, takedown, sport, worldsim, desert, grassland, alpine, modern |  |
| Mugello Quipozza G | `v025_car_vintagesuper_civilian_01` | land, car, civilian, takedown, sport, worldsim, desert, alpine, rainforest, modern |  |
| '69 Mugello Raffinati | `v026_car_vintagesports_civilian_01` | land, car, civilian, sport, worldsim, desert, modern |  |
| Verdad 1 Stormchaser | `v027_car_hurricanetruck_civilian` | land, car, civilian, stormchaser, hurricane |  |
| Cúmbila Sedan | `v029_car_smallmodernsedan_civilian_01` | land, car, civilian, worldsim, grassland, desert, modern |  |
| Cúmbila Sedan (Scratched) | `v029_car_smallmodernsedan_civilian_02` | land, car, civilian, worldsim, grassland, desert, modern |  |
| Prisa Fresca | `v030_car_oldmini_civilian_01` | land, car, civilian, worldsim, alpine, grassland |  |
| Prisa Rayo Sport | `v031_car_racinghothatch_civilian_01` | land, car, civilian, worldsim, alpine, modern |  |
| Prisa Rayo Sport (Takedown) | `v031_car_racinghothatch_encounter_takedown` | land, encounter_car_takedown_target |  |
| Sol 21 Sport Sedan | `v032_car_luxurysportssedan_civilian_01` | land, car, civilian, takedown, sport, worldsim, rainforest, alpine, modern |  |
| Prisa Fresca X | `v033_car_modernmini_civilian_01` | land, car, civilian, worldsim, grassland, ocean, modern |  |
| Pasofino Pickup | `v036_car_modernpickup_civilian_01` | land, car, civilian, worldsim, alpine, grassland, ocean, modern |  |
| Prisa Viento SUV | `v038_car_modernsuv_civilian_01` | land, car, civilian, worldsim, grassland, alpine, modern |  |
| Caravana Camper | `v039_car_oldcampervan_civilian_01` | land, car, civilian, worldsim, desert, rainforest |  |
| Prisa Hidalgo | `v040_car_oldcompact_civilian_01` | land, car, civilian, worldsim, desert, alpine, ocean |  |
| Prisa Azor 3 | `v042_car_racingsedan_civilian` | land, car, civilian, sport, worldsim, grassland, rainforest, modern |  |
| Vagabundo Buggy | `v046_car_racingbuggy_civilian` | land, car, civilian, buggy, worldsim, desert, rainforest, modern |  |
| Toy Offroader | `v050_car_toyjeep_civilian` | land, car, toy, jeep, heat_easteregg |  |
| Mugello V405 Bike | `v303_bike_modernsuper_civilian_01` | land, bike, civilian, sport, worldsim, grassland, modern |  |
| Furia Sportbike | `v304_bike_modernsport_civilian_01` | land, bike, civilian, sport, grassland, desert, modern, worldsim |  |
| Prisa X-2 Bike | `v305_bike_oldroad_civilian_01` | land, bike, civilian, rainforest, alpine, worldsim |  |
| Prisa Viveza Bike | `v306_bike_modernroad_civilian_01` | land, bike, civilian, sport, grassland, desert, modern, worldsim |  |
| Prisa Tía Moped | `v307_bike_oldmoped_civilian_01` | land, bike, civilian, rainforest, alpine, worldsim |  |
| Prisa Maradona Z | `v308_bike_trials_civilian_01` | land, bike, civilian, worldsim, desert, rainforest |  |
| Alpinista Snowmobile | `v804_treaded_snowmobile_civilian` | land, snowmobile, civilian |  |

### Land Vehicle / Commercial {#land-vehicle--commercial}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Camión Truck | `v004_car_articulatedtruck_commercial_01` | land, truck, civilian |  |
| Camión Truck With Cargo Trailer | `v004_car_articulatedtruck_commercial_cargo_trailer` | land, truck, civilian, cargo, worldsim, grassland, modern |  |
| Camión Truck With Car Trailer | `v004_car_articulatedtruck_commercial_cartransport_trailer` | land, truck, civilian, cargo |  |
| Camión Truck With Flatbed Trailer | `v004_car_articulatedtruck_commercial_lowloader_trailer` | land, truck, civilian, cargo, worldsim, rainforest, modern |  |
| Camión Truck With Signaljammer Trailer | `v004_car_articulatedtruck_commercial_radarjammer_trailer` | land, truck, civilian, cargo |  |
| Camión Truck With Random Trailer | `v004_car_articulatedtruck_commercial_randomtrailer` | land, truck, civilian |  |
| Camión Truck With SAM Trailer | `v004_car_articulatedtruck_commercial_smallmobileweapon_trailer` | land, truck, civilian, cargo |  |
| Forzudo Armored Van | `v009_car_armoredtruck_commercial_01` | land, car, van, civilian, worldsim, alpine, modern |  |
| Ranchero Truck | `v034_car_oldtruck_commercial_01` | land, truck, civilian, cargo, worldsim, rainforest, desert |  |
| Ranchero Truck With Explosive Barrels | `v034_car_oldtruck_commercial_cargo_barrel` | land, truck, civilian, cargo |  |
| Ranchero Truck With Random Cargo | `v034_car_oldtruck_commercial_cargo_random` | land, truck, civilian |  |
| Prisa Calzada Van Truck | `v035_car_modernvan_civic_ambulance_01` | land, van, civilian, ambulance |  |
| Calzada Ambulancia | `v035_car_modernvan_commercial_01` | land, car, van, civilian, worldsim, rainforest, desert, modern |  |
| Prisa Viajero Bus | `v037_car_modernbus_commercial_01` | land, bus, civilian, worldsim, grassland, modern |  |
| Car Trailer | `v901_trailer_cartransport_commercial` | land, trailer |  |

### Land Vehicle / Daredevil DLC {#land-vehicle--daredevil-dlc}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Reptile AAV (Daredevil) | `v012_car_apc_daredevil` | land, daredevil | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_allgold_level_3` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_collectible_level_3` | land, daredevil, v051 | Dare Devils of Destruction |
| Battle Muscle | `v051_car_battlemuscle_daredevil` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_deathraceace_level_1` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_deathraceace_level_2` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_deathraceace_level_3` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_intro_level_1` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_intro_level_2` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_intro_level_3` | land, daredevil, v051 | Dare Devils of Destruction |
| Battle Muscle (Base) | `v051_car_battlemuscle_level_0` | land, car, daredevil, v051, worldsim | Dare Devils of Destruction |
| Battle Muscle (Metal) | `v051_car_battlemuscle_metal01` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_outro_level_1` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_outro_level_2` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_outro_level_3` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_rampagerallyace_level_1` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_rampagerallyace_level_2` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_rampagerallyace_level_3` | land, daredevil, v051 | Dare Devils of Destruction |
| Battle Muscle (Rust) | `v051_car_battlemuscle_rust01` | land, daredevil, v051 | Dare Devils of Destruction |
| Battle Muscle (Stripe 1) | `v051_car_battlemuscle_stripe01` | land, daredevil, v051 | Dare Devils of Destruction |
| Battle Muscle (Stripe 2) | `v051_car_battlemuscle_stripe02` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_survivalraceace_level_1` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_survivalraceace_level_2` | land, daredevil, v051 | Dare Devils of Destruction |
|  | `v051_car_battlemuscle_survivalraceace_level_3` | land, daredevil, v051 | Dare Devils of Destruction |
| Battle Muscle (Tiger) | `v051_car_battlemuscle_tiger01` | land, daredevil, v051 | Dare Devils of Destruction |
| Offroad Truck Level 0 | `v070_car_offroadtruckdlc1_level_0` | land, daredevil, v070, team_mechanics | Dare Devils of Destruction |
| Offroad Truck Level 1 | `v070_car_offroadtruckdlc1_level_1` | land, daredevil, v070, team_mechanics | Dare Devils of Destruction |
| Offroad Truck Level 2 | `v070_car_offroadtruckdlc1_level_2` | land, daredevil, v070, team_mechanics | Dare Devils of Destruction |
| Offroad Truck Level 3 | `v070_car_offroadtruckdlc1_level_3` | land, daredevil, v070, team_mechanics | Dare Devils of Destruction |
| Modern Pickup Level 0 | `v071_car_modernpickupdlc1_level_0` | land, daredevil, v071, team_mechanics | Dare Devils of Destruction |
| Modern Pickup Level 1 | `v071_car_modernpickupdlc1_level_1` | land, daredevil, v071, team_mechanics | Dare Devils of Destruction |
| Modern Pickup Level 2 | `v071_car_modernpickupdlc1_level_2` | land, daredevil, v071, team_mechanics | Dare Devils of Destruction |
| Modern Pickup Level 3 | `v071_car_modernpickupdlc1_level_3` | land, daredevil, v071, team_mechanics | Dare Devils of Destruction |
| Vintage SUV Level 0 | `v072_car_vintagesuvdlc1_level_0` | land, daredevil, v072, team_convicts | Dare Devils of Destruction |
| Vintage SUV Level 1 | `v072_car_vintagesuvdlc1_level_1` | land, daredevil, v072, team_convicts | Dare Devils of Destruction |
| Vintage SUV Level 2 | `v072_car_vintagesuvdlc1_level_2` | land, daredevil, v072, team_convicts | Dare Devils of Destruction |
| Vintage SUV Level 3 | `v072_car_vintagesuvdlc1_level_3` | land, daredevil, v072, team_convicts | Dare Devils of Destruction |
| Luxury Sports Sedan Level 0 | `v073_car_luxurysportssedandlc1_level_0` | land, daredevil, v073, team_racers | Dare Devils of Destruction |
| Luxury Sports Sedan Level 1 | `v073_car_luxurysportssedandlc1_level_1` | land, daredevil, v073, team_racers | Dare Devils of Destruction |
| Luxury Sports Sedan Level 2 | `v073_car_luxurysportssedandlc1_level_2` | land, daredevil, v073, team_racers | Dare Devils of Destruction |
| Luxury Sports Sedan Level 3 | `v073_car_luxurysportssedandlc1_level_3` | land, daredevil, v073, team_racers | Dare Devils of Destruction |
| Eco Super Level 0 | `v074_car_ecosuperdlc1_level_0` | land, daredevil, v074, team_racers | Dare Devils of Destruction |
| Eco Super Level 1 | `v074_car_ecosuperdlc1_level_1` | land, daredevil, v074, team_racers | Dare Devils of Destruction |
| Eco Super Level 2 | `v074_car_ecosuperdlc1_level_2` | land, daredevil, v074, team_racers | Dare Devils of Destruction |
| Eco Super Level 3 | `v074_car_ecosuperdlc1_level_3` | land, daredevil, v074, team_racers | Dare Devils of Destruction |
| Vintage Super Level 0 | `v075_car_vintagesuperdlc1_level_0` | land, daredevil, v075, team_convicts | Dare Devils of Destruction |
| Vintage Super Level 1 | `v075_car_vintagesuperdlc1_level_1` | land, daredevil, v075, team_convicts | Dare Devils of Destruction |
| Vintage Super Level 2 | `v075_car_vintagesuperdlc1_level_2` | land, daredevil, v075, team_convicts | Dare Devils of Destruction |
| Vintage Super Level 3 | `v075_car_vintagesuperdlc1_level_3` | land, daredevil, v075, team_convicts | Dare Devils of Destruction |
| Racing Buggy Level 0 | `v076_car_racingbuggydlc1_level_0` | land, daredevil, v076, team_convicts | Dare Devils of Destruction |
| Racing Buggy Level 1 | `v076_car_racingbuggydlc1_level_1` | land, daredevil, v076, team_convicts | Dare Devils of Destruction |
| Racing Buggy Level 2 | `v076_car_racingbuggydlc1_level_2` | land, daredevil, v076, team_convicts | Dare Devils of Destruction |
| Racing Buggy Level 3 | `v076_car_racingbuggydlc1_level_3` | land, daredevil, v076, team_convicts | Dare Devils of Destruction |
| Offroad Racing Sedan Level 0 | `v077_car_offroadracingsedandlc1_level_0` | land, daredevil, v077, team_racers | Dare Devils of Destruction |
| Offroad Racing Sedan Level 1 | `v077_car_offroadracingsedandlc1_level_1` | land, daredevil, v077, team_racers | Dare Devils of Destruction |
| Offroad Racing Sedan Level 2 | `v077_car_offroadracingsedandlc1_level_2` | land, daredevil, v077, team_racers | Dare Devils of Destruction |
| Offroad Racing Sedan Level 3 | `v077_car_offroadracingsedandlc1_level_3` | land, daredevil, v077, team_racers | Dare Devils of Destruction |
| Monster Truck Level 0 | `v078_car_monstertruckdlc1_level_0` | land, daredevil, v078, team_mechanics | Dare Devils of Destruction |
| Monster Truck Level 1 | `v078_car_monstertruckdlc1_level_1` | land, daredevil, v078, team_mechanics | Dare Devils of Destruction |
| Monster Truck Level 2 | `v078_car_monstertruckdlc1_level_2` | land, daredevil, v078, team_mechanics | Dare Devils of Destruction |
| Monster Truck Level 3 | `v078_car_monstertruckdlc1_level_3` | land, daredevil, v078, team_mechanics | Dare Devils of Destruction |

### Land Vehicle / Garage DLC {#land-vehicle--garage-dlc}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Coyle Rattler | `v053_car_hotrod_garage` | land, car, worldsim, garage | Soaring Speed Vehicle Pack |
| Rattler Custom | `v053_car_hotrod_ratrod` | land, car, garage | Soaring Speed Vehicle Pack |
| SS Borracho | `v080_car_galleonfloat_garage` | land, truck, garage | Sea Dogs Vehicle Pack |
| Prospero Shade | `v081_car_interceptor` | land, car, military, garage | Adversary Vehicle Pack |
| Thresher | `v082_car_shark_garage` | land, truck, garage | Shark & Bark Vehicle Pack |
| '84 Sheepdog | `v083_car_dog_garage` | land, truck, garage | Shark & Bark Vehicle Pack |
| Chevalier Ice Breaker | `v084_car_icecreamtruck_garage` | land, buggy, garage |  |
| Tuk-tuk Boom Boom | `v085_car_explosivetrike_garage` | land, trike, garage |  |
| Flying Car (Land) | `v086_car_flyingcar_garage` | land, garage | Soaring Speed Vehicle Pack |
| Brawler Mech | `v600_mech_loader_garage` | land, plane, ocean, desert, grassland | Brawler Mech |
| El Tanquecito | `v820_treaded_toytank_garage` | land, tank, heat_easteregg | Toy Vehicle Pack |
| Hellbender | `v850_car_hovercraft_armored_garage` | land, car, tank, garage | Sea Dogs Vehicle Pack |

### Land Vehicle / Industrial {#land-vehicle--industrial}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Armadillo Forklift | `v001_car_forklift_industrial` | land, forklift, industrial |  |
| Armadillo Crane Truck | `v003_car_crane_industrial` | land, crane, civilian, industrial |  |
| Wheel Loader | `v005_car_wheelloader_industrial` | land, wheelloader, civilian, industrial |  |
| Banda Conveyor | `v006_car_conveyorcrane_industrial` | land, conveyor, civilian, industrial |  |
| Modelo 4 Tractor | `v010_car_oldtractor_civilian_01` | land, tractor, civilian |  |
| Armadillo 9M | `v045_car_minetruck_commercial_01` | land, minetruck, civilian, industrial |  |
| Flatbed Trailer | `v902_trailer_lowloader_commercial` | land, trailer, civilian |  |
|  | `v902_trailer_lowloader_mobile_radar_attached` | v902_trailer_lowloader_mobile_radar_folded |  |
| Flatbed Trailer with Radar (Folded, AI) | `v902_trailer_lowloader_mobile_radar_folded_sargento_aiproxy_enabled` | land, mission |  |
| Flatbed Trailer with Radar (Extended) | `v902_trailer_lowloader_mobile_radar_upright` |  |  |
| Flatbed Trailer with Radar (Extended, AI) | `v902_trailer_lowloader_mobile_radar_upright_sargento_aiproxy_enabled` | land, mission |  |
| Cargo Trailer | `v903_trailer_cargo_commercial` | land, trailer, cargo, civilian |  |

### Land Vehicle / Military {#land-vehicle--military}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Reptile AAV | `v012_car_apc_military_01` | land, truck, apc, military, armed, heat_worldsim, rainforest, grassland, oppressed |  |
| Cavalry Armored Truck | `v013_car_armoredtransport_military_01` | land, truck, military, armed, heat_worldsim, desert, grassland, oppressed |  |
| Warrior Offroader | `v014_car_offroadtruck_military_01` | land, car, military, heat_worldsim, alpine, grassland |  |
| Longbow Cannon Truck | `v015_car_cannontruck_military` | land, truck, military, cannon, armed, heat_worldsim, desert, oppressed |  |
| Prospero Hauler | `v016_car_armoredarticulatedtruck_military` | land, truck, military |  |
| Prospero Hauler With Generator | `v016_car_armoredarticulatedtruck_military_generator` | land, military, heat_worldsim, desert, rainforest, grassland, alpine |  |
| Vagabundo Buggy (Military) | `v046_car_racingbuggy_military` | land, car, military, heat_worldsim, desert, rainforest |  |
| Prospero Hunter Bike | `v301_bike_combatdirt_military_01` | land, bike, military, heat_worldsim, rainforest, grassland, desert |  |
| Warchief Assault Tank | `v800_treaded_modernheavytank_military_01` | land, tank, military, heat_worldsim, grassland, oppressed, armed, scanner_v800 |  |
| Prizefighter Tank | `v801_treaded_mediumtank_military_01` | land, tank, military, armed, heat_worldsim, desert, alpine, oppressed |  |
| Falconer AA Tank | `v802_treaded_aatank_military` | land, tank, military, aa, armed, heat_worldsim, liberated, alpine, rainforest, desert |  |
| Pointman Scout Tank | `v803_treaded_flexturrettank_military` | land, tank, military, armed, heat_worldsim, rainforest, oppressed, scanner_v803 |  |
| Huntsman SAM Launcher | `v904_trailer_smallmobileweapon_military` | land, trailer, military, sam, armed |  |
| Prospero Signal Jammer | `v907_trailer_radarjammer_military` | land, trailer, military, radar |  |

### Land Vehicle / Mission {#land-vehicle--mission}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Ion Coil Stormchaser | `v027_car_hurricanetruck_tesla` | land, mission |  |
| Tied Down Ion Coil Stormchaser | `v027_car_hurricanetruck_transport` | land, mission |  |
| Ranchero Truck With Explosive Barrels (Mission) | `v034_car_oldtruck_commercial_cargo_barrel_mission_special` | land, mission |  |
| Ranchero Truck With Weapon Shipment Box | `v034_car_oldtruck_commercial_cargo_sargento_intro` | land, mission |  |
| Alpinista Snowmobile (Mission) | `v804_treaded_snowmobile_civilian_mission_special` | land, mission |  |

### Land Vehicle / Preorder {#land-vehicle--preorder}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Verdeleon Eco (Preorder) | `v024_car_ecosuper_preorder_01` | land, car, civilian, sport, desert | Neon Racer Pack |
| Racing Buggy (Preorder) | `v046_car_racingbuggy_preorder_01` | land, car, buggy, desert, rainforest | Deathstalker Scorpion Pack |

### Land Vehicle / Racing {#land-vehicle--racing}

| Name | Model | Tags | DLC |
|---|---|---|---|
| 2019 Vistosa Supercar (Racing, unused) | `v023_car_racingsuper_racing_01` | land, car, racing, takedown |  |
| Verdeleon Eco (Racing, unused) | `v024_car_ecosuper_racing_01` | land, car, racing, takedown |  |
| Prisa Azor 3 (Racing, unused) | `v042_car_racingsedan_racing_01` | land, car, racing |  |
| Vagabundo Buggy (Racing, unused) | `v046_car_racingbuggy_racing_01` | land, car, racing, buggy |  |

### Land Vehicle / Rebel {#land-vehicle--rebel}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Pugilista SUV | `v002_car_vintagesuv_rebel` | land, car, rebel, heat_worldsim, grassland, alpine, rainforest |  |
| Reptile AAV | `v012_car_apc_rebel_01` | land, truck, apc, rebel, armed, heat_worldsim, rainforest, grassland |  |
|  | `v012_car_apc_rebel_01_mission_special` | land, mission |  |
| Cavalry Armored Truck | `v013_car_armoredtransport_rebel_01` | land, truck, rebel, armed, heat_worldsim, desert, rainforest, liberated |  |
| Warrior Offroader | `v014_car_offroadtruck_rebel_01` | land, car, rebel, heat_worldsim, desert, grassland, rainforest, alpine |  |
| Longbow Cannon Truck | `v015_car_cannontruck_rebel` | land, truck, rebel, cannon, armed |  |
| Prospero Hauler | `v016_car_armoredarticulatedtruck_rebel` | land, truck, rebel, heat_worldsim, desert, rainforest, liberated |  |
| Prospero Hunter Bike | `v301_bike_combatdirt_rebel_01` | land, bike, rebel, heat_worldsim, rainforest, desert |  |
| Warchief Assault Tank | `v800_treaded_modernheavytank_rebel_01` | land, tank, rebel, armed, scanner_v800, heat_worldsim, grassland, liberated |  |
| Prizefighter Tank | `v801_treaded_mediumtank_rebel_01` | land, tank, rebel, armed, heat_worldsim, rainforest, desert, liberated |  |
| Falconer AA Tank | `v802_treaded_aatank_rebel` | land, tank, rebel, aa, armed |  |
| Pointman Scout Tank | `v803_treaded_flexturrettank_rebel` | land, tank, rebel, armed, scanner_v803 |  |
| Huntsman SAM Launcher | `v904_trailer_smallmobileweapon_rebel` | land, trailer, sam, rebel, armed |  |

### Land Vehicle / Rico {#land-vehicle--rico}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Coyle Mambo (Black, unused) | `v017_car_vintagemuscle_civilian_02` | land, car, rico |  |
| Coyle Mambo (Rico) | `v017_car_vintagemuscle_rico` | land, car, rico | Deathstalker Scorpion Pack |

### Sea Vehicle / Agency DLC {#sea-vehicle--agency-dlc}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Agency Spy Boat | `v123_boat_agencyspy_agency` | sea, boat, agency, armed | Danger Rising |

### Sea Vehicle / Bomb {#sea-vehicle--bomb}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Rigged Dame de la Mer | `v106_boat_motoryacht_bomb_special` | sea, boat, bomb_special |  |
| Rigged Pescespada SX | `v107_boat_racingboat_bomb_special` | sea, boat, bomb_special |  |

### Sea Vehicle / Civilian {#sea-vehicle--civilian}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Dondequiera Fanboat | `v100_boat_fanboat_civilian` | sea, boat, civilian, worldsim, rainforest |  |
| Kerner Brise 42 | `v105_boat_sailboat_civilian_01` | sea, boat, civilian, worldsim, modern |  |
| Dame De La Mer Yacht | `v106_boat_motoryacht_civilian_01` | sea, boat, civilian, worldsim, grassland, rainforest, ocean, modern |  |
| Mugello Pescespada SX | `v107_boat_racingboat_civilian_01` | sea, boat, civilian, worldsim, grassland, ocean, modern |  |
| Fishing Boat | `v108_boat_largeoldfishing_civilian_01` | sea, boat, civilian, fishing, worldsim, desert, rainforest, ocean |  |
| Prisa Chapoteo | `v110_boat_jetski_civilian_01` | sea, jetski, civilian, worldsim, grassland, rainforest, modern |  |

### Sea Vehicle / Commercial {#sea-vehicle--commercial}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Spearhead Transport | `v104_boat_landingtransport_commercial` | sea, ship, transport, military |  |
| Barco Roro Ferry | `v109_boat_ferry_commercial` | sea, ferry, civilian |  |

### Sea Vehicle / Garage DLC {#sea-vehicle--garage-dlc}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Rubber Ducky | `v117_boat_duck_garage` | sea, boat, ship, garage, ocean |  |
| El Buquecito | `v122_boat_toypatrol_garage` | sea, boat, ship, garage, ocean, heat_easteregg | Toy Vehicle Pack |

### Sea Vehicle / Military {#sea-vehicle--military}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Daggershark Jetboat | `v101_boat_smalljet_military` | sea, boat, military, armed, heat_worldsim, rainforest, scanner_v101 |  |
| Stromwater Patrol Boat | `v102_boat_heavypatrol_military_01` | sea, boat, military, armed, heat_worldsim, rainforest, ocean, oppressed, scanner_v102 |  |
| Conquistador Warship | `v103_boat_corvette_military_01` | sea, boat, ship, military, armed, heat_worldsim, ocean |  |

### Sea Vehicle / Mission {#sea-vehicle--mission}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Thunderbarge | `v102_boat_heavypatrol_lightning` | sea, mission |  |
| Spearhead Transport | `v104_boat_landingtransport_commercial_lightningrod_escort` | sea, mission |  |
| Spearhead Transport With Signal Jammer | `v104_boat_landingtransport_commercial_signal_jammer` | sea, mission |  |
| Fishing Boat | `v108_boat_largeoldfishing_civilian_01_garland_intro` | sea, mission |  |
| Barco Roro Ferry With Explosive Barrels | `v109_boat_ferry_commercial_garlandintro` | sea, mission |  |

### Sea Vehicle / Rebel {#sea-vehicle--rebel}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Daggershark Jetboat | `v101_boat_smalljet_rebel` | sea, boat, rebel, armed, heat_worldsim, rainforest, ocean, scanner_v101 |  |
| Stromwater Patrol Boat | `v102_boat_heavypatrol_rebel_01` | sea, boat, rebel, armed, heat_worldsim, rainforest, ocean, liberated, scanner_v102 |  |
| Conquistador Warship | `v103_boat_corvette_rebel_01` | sea, ship, rebel, armed, heat_worldsim, ocean, liberated |  |

### Air Vehicle / Agency DLC {#air-vehicle--agency-dlc}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Agency Spy Helicopter | `v221_helicopter_agencyspy_agency` | air, helicopter, agency, armed | Danger Rising |
| Agency Drone | `v270_helicopter_agencydrone_agency` | air, drone, agency, armed, agent_grapple | Danger Rising |
| Agency Drone (Rebel) | `v270_helicopter_agencydrone_rebel` | air, drone, agency_rebel, armed, rebel | Danger Rising |

### Air Vehicle / Cinematics {#air-vehicle--cinematics}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Dropzone Helicopter (Black Hand) | `v202_helicopter_heavytroop_gabriela` | air, mission |  |
| Dropzone Helicopter (Rebel) | `v202_helicopter_heavytroop_mira` | air, mission |  |

### Air Vehicle / Civilian {#air-vehicle--civilian}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Emvasion Utility Heli | `v205_helicopter_utility_civilian_01` | air, helicopter, civilian, vip, worldsim, grassland, desert, ocean |  |
| Emvasion News Heli | `v205_helicopter_utility_commercial_news` | air, helicopter, civilian, news, worldsim, alpine, rainforest |  |
| Emvasion Float Heli | `v206_helicopter_bubblescout_civilian_01` | air, helicopter, civilian, worldsim, ocean, rainforest |  |
| EM-909 Private Jet | `v404_plane_privatejet_civilian` | air, plane, jet, civilian, worldsim, modern, grassland, desert |  |
| EM-979 Airliner | `v405_plane_commercialcargo_commercial` | air, plane, civilian, jet, worldsim, ocean, modern |  |
| Emvasion Floatplane | `v406_plane_smallprop_civilian_01` | air, plane, civilian, propeller, worldsim, rainforest |  |
| Emvasion Cropduster | `v407_plane_mediumprop_civilian_01` | air, plane, civilian, propeller, worldsim, grassland, desert, ocean |  |
| Ultralight | `v408_plane_ultralight_civilian` | air, plane, civilian, propeller, worldsim, rainforest, desert |  |
| Emvasion Airship | `v700_balloon_dirigible_civilian` | air, civilian, dirigible, worldsim, grassland, rainforest, modern |  |

### Air Vehicle / Collectible {#air-vehicle--collectible}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Emvasion Airship | `v700_balloon_dirigible_collectible` | air, civilian, dirigible, unarmed, unarmored, large, collectible |  |

### Air Vehicle / Garage DLC {#air-vehicle--garage-dlc}

| Name | Model | Tags | DLC |
|---|---|---|---|
| El Pajarito | `v420_plane_toybomber_garage` | air, plane, heat_easteregg | Toy Vehicle Pack |
| X700 Flycatcher | `v422_plane_vtoljet_garage` | air, plane, armed, ocean, desert, grassland | Adversary Vehicle Pack |

### Air Vehicle / Military {#air-vehicle--military}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Prospero Sky Crane | `v200_helicopter_heavylift_military` | air, helicopter, military, winch |  |
| Prospero Sky Crane With Sphere Tank | `v200_helicopter_heavylift_military_chaos_sphere_tank` | air, military, heat_worldsim, desert, rainforest, grassland |  |
| Spectre Attack Heli | `v201_helicopter_mediumattack_military_01` | air, helicopter, military, armed, heat_worldsim, oppressed, alpine, desert |  |
| Dropzone Chopper | `v202_helicopter_heavytroop_military_01` | air, helicopter, transport, military, heat_worldsim, rainforest, desert, oppressed |  |
| Firebrand Scout Chopper | `v203_helicopter_lightattack_military_01` | air, helicopter, military, armed, heat_worldsim, rainforest, grassland |  |
| Bloodhound Siege Heli | `v204_helicopter_heavyassault_military_01` | air, helicopter, military, armed, heat_worldsim, desert, oppressed |  |
| PR83 Attack Drone | `v250_helicopter_mediumattackdrone_military` | air, drone, military, armed |  |
| PR17 Rocket Drone | `v251_helicopter_rocketdrone_military` | air, drone, military, armed |  |
| Suicide Drone | `v252_helicopter_suicidedrone_military` | air, drone, military |  |
| Guard Drone | `v254_helicopter_guarddrone_military` | air, drone, military, titan_drone, armed |  |
| Fellhawk Jet Fighter | `v400_plane_fighterjet_military_01` | air, plane, military, armed, heat_worldsim, ocean, desert, rainforest, grassland |  |
| Skycastle Cargo Jet | `v401_plane_cargotransport_military_01` | air, plane, military, cargo, transport |  |
| Skycastle Cargo Jet | `v401_plane_cargotransport_military_01_paratrooper` | air, plane, military, paratrooper |  |
| Thunderhead Bomber Jet | `v402_plane_fighterbomber_military_01` | air, plane, military, armed, heat_worldsim, desert, rainforest, grassland, oppressed |  |
| PA Microfighter | `v403_plane_microjet_military` | air, plane, military, armed, heat_worldsim, desert, ocean, oppressed |  |
| Emvasion Airship | `v700_balloon_dirigible_military_01` | air, dirigible, military |  |

### Air Vehicle / Mission {#air-vehicle--mission}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Prospero Sky Crane With Container | `v200_helicopter_heavylift_rebel_mission_special` | air, mission |  |
| Garland Kind Studios Chopper | `v205_helicopter_utility_garland` | air, mission |  |
| Emvasion Float Heli | `v206_helicopter_bubblescout_javi` | air, mission |  |
| PR83 Attack Drone | `v250_helicopter_mediumattackdrone_tornado` | air, mission |  |
| Skycastle Cargo Jet | `v401_plane_cargotransport_signal_jammer` | air, mission |  |
| Emvasion Airship | `v700_balloon_dirigible_node_science_01` | air, civilian, dirigible |  |

### Air Vehicle / Preorder {#air-vehicle--preorder}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Decoy Drone (Preorder) | `v253_helicopter_decoydrone_preorder` | air, drone, preorder, weapon_drone, armed |  |
| PA Microfighter (Preorder) | `v403_plane_microjet_preorder_01` | air, plane, preorder, armed | Digital Deluxe Content |

### Air Vehicle / Rebel {#air-vehicle--rebel}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Prospero Sky Crane | `v200_helicopter_heavylift_rebel_01` | air, helicopter, rebel, winch |  |
| Spectre Attack Heli | `v201_helicopter_mediumattack_rebel_01` | air, helicopter, rebel, armed, heat_worldsim, rainforest, liberated |  |
| Dropzone Chopper | `v202_helicopter_heavytroop_rebel_01` | air, helicopter, rebel, transport, heat_worldsim, desert, rainforest, liberated |  |
| Firebrand Scout Chopper | `v203_helicopter_lightattack_rebel_01` | air, helicopter, rebel, armed, heat_worldsim, grassland, rainforest |  |
| Bloodhound Siege Heli | `v204_helicopter_heavyassault_rebel_01` | air, helicopter, rebel, armed |  |
| Attack drone | `v250_helicopter_mediumattackdrone_rebel` | air, drone, rebel, armed |  |
| Rocket drone | `v251_helicopter_rocketdrone_rebel` | air, drone, rebel, armed |  |
| Suicide Drone | `v252_helicopter_suicidedrone_rebel` | air, drone, rebel |  |
| Decoy Drone | `v253_helicopter_decoydrone_rebel` | air, drone, rebel, weapon_drone, armed |  |
| Guard drone | `v254_helicopter_guarddrone_rebel` | air, drone, rebel, weapon_drone, armed |  |
| Fellhawk Jet Fighter | `v400_plane_fighterjet_rebel_01` | air, plane, rebel, armed, heat_worldsim, ocean, rainforest, grassland, desert |  |
| Skycastle Cargo Jet | `v401_plane_cargotransport_rebel_01` | air, plane, rebel, cargo, transport |  |
| Thunderhead Bomber Jet | `v402_plane_fighterbomber_rebel_01` | air, plane, rebel, armed, heat_worldsim, grassland, rainforest, liberated |  |
| PA Microfighter | `v403_plane_microjet_rebel` | air, plane, rebel, armed, heat_worldsim, rainforest, liberated |  |

### Trains {#trains}

| Name | Model | Tags | DLC |
|---|---|---|---|
|  | `v500_train_industrialengine_industrial_01` | train, industrial, worldsim, desert |  |
|  | `v501_train_containercarriage_industrial` | wagon, industrial, flatbed, cargo |  |
| Train 1 | `v502_train_armoredengine_military_01` | train, military, worldsim, alpine, oppressed |  |
|  | `v502_train_armoredengine_military_01_mission_special_steal_the_weapon_tech` | train, military |  |
|  | `v502_train_armoredengine_military_01_node_military_05` | train, military |  |
|  | `v502_train_armoredengine_military_02` | train, military, notwide, worldsim, desert |  |
|  | `v502_train_armoredengine_military_03` | train, military, notwide, worldsim, desert |  |
|  | `v502_train_armoredengine_military_04` | train, military, notwide, worldsim, alpine, oppressed |  |
|  | `v502_train_armoredengine_rebel` | train, rebel, worldsim, alpine, liberated |  |
|  | `v502_train_armoredengine_rebel_02` | train, rebel, worldsim, desert, liberated |  |
|  | `v502_train_armoredengine_rebel_03` | train, rebel, worldsim, desert, liberated |  |
|  | `v502_train_armoredengine_rebel_04` | train, rebel, worldsim, alpine, liberated |  |
|  | `v502_train_armoredengine_rebel_mission_special_outro` | train, rebel |  |
|  | `v502_train_armoredengine_rebel_mission_special_sandstorm_finale` | train, rebel, mission_special_sandstorm_finale |  |
|  | `v503_train_armoredcargocarriage_military_containers` | wagon, military, flatbed, cargo |  |
|  | `v503_train_armoredcargocarriage_military_empty` | wagon, military, flatbed, empty |  |
|  | `v503_train_armoredcargocarriage_rebel` | wagon, rebel, flatbed, cargo |  |
|  | `v503_train_armoredcargocarriage_rebel_containers` | wagon, rebel, flatbed, cargo |  |
|  | `v503_train_armoredcargocarriage_rebel_empty` | wagon, rebel, flatbed, cargo |  |
|  | `v503_train_armoredcargocarriage_rebel_empty_decouple_immune` | mission_special |  |
|  | `v504_train_armoredfuelcarriage_military` | wagon, military, flatbed, fuel |  |
|  | `v504_train_armoredfuelcarriage_rebel` | wagon, rebel, flatbed, fuel |  |
|  | `v504_train_armoredfuelcarriage_rebel_not_targetable` | mission_special |  |
|  | `v505_train_armoredweaponcarriage_military_01` | wagon, military, missile |  |
|  | `v505_train_armoredweaponcarriage_rebel` | wagon, rebel, missile |  |
|  | `v506_train_armoredhowitzer_military` | wagon, military, howitzer |  |
|  | `v506_train_armoredhowitzer_military_covered` | wagon, military, flatbed, cargo, howitzer |  |
|  | `v506_train_armoredhowitzer_rebel` | wagon, rebel, howitzer |  |
|  | `v506_train_armoredhowitzer_rebel_decouple_immune` | mission_special |  |

### Demon DLC Substrate Weapons {#demon-dlc-substrate-weapons}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Substrate AA Gun | `dlc2_substrate_weapon_aa_gun_01` |  | Los Demonios |
| Substrate AA Tank | `dlc2_substrate_weapon_aa_tank_01` |  | Los Demonios |
| Substrate APC | `dlc2_substrate_weapon_apc_01` |  | Los Demonios |
| Substrate Cannon Truck | `dlc2_substrate_weapon_cannon_truck_01` |  | Los Demonios |
| Substrate Helicopter | `dlc2_substrate_weapon_heli_light_01` |  | Los Demonios |
| Substrate Modern Tank | `dlc2_substrate_weapon_modern_tank_01` |  | Los Demonios |
| Substrate Mortar | `dlc2_substrate_weapon_mortar_01` |  | Los Demonios |

### Demon DLC Substrate Weapons / Outro {#demon-dlc-substrate-weapons--outro}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Substrate AA Gun (Outro) | `dlc2_substrate_weapon_aa_gun_01_outro` |  | Los Demonios |
| Substrate AA Tank (Outro) | `dlc2_substrate_weapon_aa_tank_01_outro` |  | Los Demonios |
| Substrate APC (Outro) | `dlc2_substrate_weapon_apc_01_outro` |  | Los Demonios |
| Substrate Cannon Truck (Outro) | `dlc2_substrate_weapon_cannon_truck_01_outro` |  | Los Demonios |
| Substrate Modern Tank (Outro) | `dlc2_substrate_weapon_modern_tank_01_outro` |  | Los Demonios |
| Substrate Mortar (Outro) | `dlc2_substrate_weapon_mortar_01_outro` |  | Los Demonios |

## Prototype entries {#prototype-entries}

The game also registers every exported entity under a second name ending in `_debug` (the editor's prototype spawn list). These names are valid spawn names in the retail game, but they were not made for regular gameplay and have not been tested with JC4MP, so prefer the names above and test a `_debug` name before you rely on it.

### Prototype: AirPlanes {#prototype-airplanes}

| Model | DLC |
|---|---|
| `v400_plane_fighterjet_military_01_debug` |  |
| `v400_plane_fighterjet_rebel_01_debug` |  |
| `v401_plane_cargotransport_military_01_debug` |  |
| `v401_plane_cargotransport_military_cargo_paratrooper_debug` |  |
| `v401_plane_cargotransport_rebel_01_debug` |  |
| `v401_plane_cargotransport_signal_jammer_debug` |  |
| `v402_plane_fighterbomber_military_01_debug` |  |
| `v402_plane_fighterbomber_rebel_01_debug` |  |
| `v403_plane_microjet_military_debug` |  |
| `v403_plane_microjet_rebel_debug` |  |
| `v404_plane_privatejet_civilian_debug` |  |
| `v405_plane_commercialcargo_commercial_debug` |  |
| `v406_plane_smallprop_civilian_01_debug` |  |
| `v407_plane_mediumprop_civilian_01_debug` |  |
| `v408_plane_ultralight_civilian_debug` |  |

### Prototype: Boats {#prototype-boats}

| Model | DLC |
|---|---|
| `v100_boat_fanboat_civilian_debug` |  |
| `v101_boat_smalljet_military_debug` |  |
| `v101_boat_smalljet_rebel_debug` |  |
| `v102_boat_heavypatrol_lightning_debug` |  |
| `v102_boat_heavypatrol_military_01_debug` |  |
| `v102_boat_heavypatrol_rebel_01_debug` |  |
| `v102_boat_heavypatrol_rebel_01_mm210_debug` |  |
| `v103_boat_corvette_military_01_debug` |  |
| `v103_boat_corvette_rebel_01_debug` |  |
| `v104_boat_landingtransport_commercial_debug` |  |
| `v104_boat_landingtransport_commercial_lightningrod_escort_debug` |  |
| `v104_boat_landingtransport_commercial_signal_jammer_debug` |  |
| `v104_boat_landingtransport_rebel_debug` |  |
| `v105_boat_sailboat_civilian_01_debug` |  |
| `v106_boat_motoryacht_bomb_special_debug` |  |
| `v106_boat_motoryacht_civilian_01_debug` |  |
| `v107_boat_racingboat_bomb_special_debug` |  |
| `v107_boat_racingboat_civilian_01_debug` |  |
| `v108_boat_largeoldfishing_civilian_01_debug` |  |
| `v108_boat_largeoldfishing_civilian_01_garland_intro_debug` |  |
| `v109_boat_ferry_commercial_debug` |  |
| `v109_boat_ferry_commercial_garlandintro_debug` |  |
| `v110_boat_jetski_civilian_01_debug` |  |

### Prototype: Cars {#prototype-cars}

| Model | DLC |
|---|---|
| `v000_car_atv_civilian_01_debug` |  |
| `v000_car_atv_javi_debug` |  |
| `v001_car_forklift_industrial_debug` |  |
| `v002_car_vintagesuv_civilian_02_debug` |  |
| `v002_car_vintagesuv_civilian_debug` |  |
| `v002_car_vintagesuv_javi_debug` |  |
| `v002_car_vintagesuv_rebel_debug` |  |
| `v003_car_crane_industrial_debug` |  |
| `v004_car_articulatedtruck_commercial_01_debug` |  |
| `v004_car_articulatedtruck_commercial_cargo_trailer_debug` |  |
| `v004_car_articulatedtruck_commercial_cartransport_trailer_debug` |  |
| `v004_car_articulatedtruck_commercial_lowloader_trailer_debug` |  |
| `v004_car_articulatedtruck_commercial_radarjammer_trailer_debug` |  |
| `v004_car_articulatedtruck_commercial_randomtrailer_debug` |  |
| `v004_car_articulatedtruck_commercial_smallmobileweapon_trailer_debug` |  |
| `v005_car_wheelloader_industrial_debug` |  |
| `v006_car_conveyorcrane_industrial_debug` |  |
| `v008_car_taxitrike_civilian_debug` |  |
| `v009_car_armoredtruck_commercial_01_debug` |  |
| `v010_car_oldtractor_civilian_01_debug` |  |
| `v011_car_oldtwodoorhatch_civilian_01_debug` |  |
| `v011_car_oldtwodoorhatch_sargento_debug` |  |
| `v012_car_apc_military_01_debug` |  |
| `v012_car_apc_rebel_01_debug` |  |
| `v012_car_apc_rebel_01_mission_special_debug` |  |
| `v013_car_armoredtransport_military_01_debug` |  |
| `v013_car_armoredtransport_rebel_01_debug` |  |
| `v014_car_offroadtruck_military_01_debug` |  |
| `v014_car_offroadtruck_rebel_01_debug` |  |
| `v015_car_cannontruck_military_debug` |  |
| `v015_car_cannontruck_rebel_debug` |  |
| `v016_car_armoredarticulatedtruck_military_debug` |  |
| `v016_car_armoredarticulatedtruck_military_generator_debug` |  |
| `v016_car_armoredarticulatedtruck_rebel_debug` |  |
| `v017_car_vintagemuscle_bomb_special_debug` |  |
| `v017_car_vintagemuscle_civilian_02_debug` |  |
| `v017_car_vintagemuscle_civilian_debug` |  |
| `v018_car_monstertruck_bomb_special_debug` |  |
| `v018_car_monstertruck_civilian_01_debug` |  |
| `v019_car_modernlimo_bomb_special_debug` |  |
| `v019_car_modernlimo_civilian_01_debug` |  |
| `v020_car_moderngrandtourer_civilian_01_debug` |  |
| `v021_car_sportsmuscle_bomb_special_debug` |  |
| `v021_car_sportsmuscle_civilian_01_debug` |  |
| `v022_car_moderncircuitracer_bomb_special_debug` |  |
| `v022_car_moderncircuitracer_civilian_01_debug` |  |
| `v023_car_racingsuper_bomb_special_debug` |  |
| `v023_car_racingsuper_civilian_01_debug` |  |
| `v023_car_racingsuper_racing_01_debug` |  |
| `v024_car_ecosuper_bomb_special_debug` |  |
| `v024_car_ecosuper_civilian_01_debug` |  |
| `v024_car_ecosuper_racing_01_debug` |  |
| `v025_car_vintagesuper_bomb_special_debug` |  |
| `v025_car_vintagesuper_civilian_01_debug` |  |
| `v026_car_vintagesports_bomb_special_debug` |  |
| `v026_car_vintagesports_civilian_01_debug` |  |
| `v027_car_hurricanetruck_civilian_debug` |  |
| `v027_car_hurricanetruck_tesla_debug` |  |
| `v027_car_hurricanetruck_transport_debug` |  |
| `v029_car_smallmodernsedan_civilian_01_debug` |  |
| `v029_car_smallmodernsedan_civilian_02_debug` |  |
| `v030_car_oldmini_civilian_01_debug` |  |
| `v030_car_oldmini_civilian_02_debug` |  |
| `v031_car_racinghothatch_civilian_01_debug` |  |
| `v031_car_racinghothatch_encounter_takedown_debug` |  |
| `v032_car_luxurysportssedan_civilian_01_debug` |  |
| `v033_car_modernmini_civilian_01_debug` |  |
| `v033_car_modernmini_civilian_02_debug` |  |
| `v034_car_oldtruck_commercial_01_debug` |  |
| `v034_car_oldtruck_commercial_cargo_barrel_debug` |  |
| `v034_car_oldtruck_commercial_cargo_barrel_mission_special_debug` |  |
| `v034_car_oldtruck_commercial_cargo_random_debug` |  |
| `v034_car_oldtruck_commercial_cargo_sargento_intro_debug` |  |
| `v035_car_modernvan_civic_ambulance_01_debug` |  |
| `v035_car_modernvan_commercial_01_debug` |  |
| `v035_car_modernvan_garland_debug` |  |
| `v036_car_modernpickup_civilian_01_debug` |  |
| `v036_car_modernpickup_civilian_02_debug` |  |
| `v037_car_modernbus_commercial_01_debug` |  |
| `v038_car_modernsuv_civilian_01_debug` |  |
| `v038_car_modernsuv_civilian_02_debug` |  |
| `v039_car_oldcampervan_civilian_01_debug` |  |
| `v039_car_oldcampervan_civilian_02_debug` |  |
| `v040_car_oldcompact_civilian_01_debug` |  |
| `v040_car_oldcompact_sargento_debug` |  |
| `v042_car_racingsedan_civilian_debug` |  |
| `v042_car_racingsedan_racing_01_debug` |  |
| `v045_car_minetruck_commercial_01_debug` |  |
| `v046_car_racingbuggy_civilian_debug` |  |
| `v046_car_racingbuggy_military_debug` |  |
| `v046_car_racingbuggy_racing_01_debug` |  |
| `v050_car_toyjeep_civilian_debug` |  |
| `v800_treaded_modernheavytank_military_01_debug` |  |
| `v800_treaded_modernheavytank_rebel_01_debug` |  |
| `v801_treaded_mediumtank_military_01_debug` |  |
| `v801_treaded_mediumtank_rebel_01_debug` |  |
| `v802_treaded_aatank_military_debug` |  |
| `v802_treaded_aatank_rebel_debug` |  |
| `v803_treaded_flexturrettank_military_debug` |  |
| `v803_treaded_flexturrettank_rebel_debug` |  |
| `v804_treaded_snowmobile_civilian_debug` |  |
| `v804_treaded_snowmobile_civilian_mission_special_debug` |  |
| `v901_trailer_cartransport_commercial_debug` |  |
| `v902_trailer_lowloader_commercial_debug` |  |
| `v902_trailer_lowloader_mobile_radar_folded_debug` |  |
| `v902_trailer_lowloader_mobile_radar_folded_sargento_aiproxy_enabled_debug` |  |
| `v902_trailer_lowloader_mobile_radar_upright_debug` |  |
| `v902_trailer_lowloader_mobile_radar_upright_sargento_aiproxy_enabled_debug` |  |
| `v903_trailer_cargo_commercial_debug` |  |
| `v904_trailer_smallmobileweapon_military_debug` |  |
| `v904_trailer_smallmobileweapon_rebel_debug` |  |
| `v907_trailer_radarjammer_military_debug` |  |

### Prototype: Dirigibles {#prototype-dirigibles}

| Model | DLC |
|---|---|
| `v700_balloon_dirigible_civilian_debug` |  |
| `v700_balloon_dirigible_collectible_debug` |  |
| `v700_balloon_dirigible_military_01_debug` |  |
| `v700_balloon_dirigible_node_science_01_debug` |  |

### Prototype: Helicopters {#prototype-helicopters}

| Model | DLC |
|---|---|
| `v200_helicopter_heavylift_military_chaos_sphere_tank_debug` |  |
| `v200_helicopter_heavylift_military_debug` |  |
| `v200_helicopter_heavylift_military_quest_special_debug` |  |
| `v200_helicopter_heavylift_rebel_01_debug` |  |
| `v200_helicopter_heavylift_rebel_mission_special_debug` |  |
| `v201_helicopter_mediumattack_military_01_debug` |  |
| `v201_helicopter_mediumattack_rebel_01_debug` |  |
| `v202_helicopter_heavytroop_gabriela_debug` |  |
| `v202_helicopter_heavytroop_military_01_debug` |  |
| `v202_helicopter_heavytroop_mira_debug` |  |
| `v202_helicopter_heavytroop_rebel_01_debug` |  |
| `v203_helicopter_lightattack_military_01_debug` |  |
| `v203_helicopter_lightattack_rebel_01_debug` |  |
| `v204_helicopter_heavyassault_military_01_debug` |  |
| `v204_helicopter_heavyassault_rebel_01_debug` |  |
| `v205_helicopter_utility_civilian_01_debug` |  |
| `v205_helicopter_utility_commercial_news_debug` |  |
| `v205_helicopter_utility_garland_debug` |  |
| `v206_helicopter_bubblescout_civilian_01_debug` |  |
| `v206_helicopter_bubblescout_javi_debug` |  |
| `v250_helicopter_mediumattackdrone_lead_military_debug` |  |
| `v250_helicopter_mediumattackdrone_military_debug` |  |
| `v250_helicopter_mediumattackdrone_rebel_debug` |  |
| `v250_helicopter_mediumattackdrone_tornado_debug` |  |
| `v251_helicopter_rocketdrone_military_debug` |  |
| `v251_helicopter_rocketdrone_rebel_debug` |  |
| `v252_helicopter_suicidedrone_military_debug` |  |
| `v252_helicopter_suicidedrone_rebel_debug` |  |
| `v253_helicopter_decoydrone_preorder_debug` |  |
| `v253_helicopter_decoydrone_rebel_debug` |  |
| `v254_helicopter_guarddrone_military_debug` |  |
| `v254_helicopter_guarddrone_rebel_debug` |  |

### Prototype: MotorBikes {#prototype-motorbikes}

| Model | DLC |
|---|---|
| `v301_bike_combatdirt_military_01_debug` |  |
| `v301_bike_combatdirt_rebel_01_debug` |  |
| `v303_bike_modernsuper_bomb_special_debug` |  |
| `v303_bike_modernsuper_civilian_01_debug` |  |
| `v304_bike_modernsport_bomb_special_debug` |  |
| `v304_bike_modernsport_civilian_01_debug` |  |
| `v305_bike_oldroad_civilian_01_debug` |  |
| `v306_bike_modernroad_civilian_01_debug` |  |
| `v307_bike_oldmoped_civilian_01_debug` |  |
| `v308_bike_trials_civilian_01_debug` |  |
| `v308_bike_trials_javi_debug` |  |

### Prototype: Trains {#prototype-trains}

| Model | DLC |
|---|---|
| `v500_train_industrialengine_industrial_01_debug` |  |
| `v500_train_industrialengine_industrial_debug` |  |
| `v500_train_industrialengine_rebel_debug` |  |
| `v501_train_containercarriage_industrial_debug` |  |
| `v501_train_containercarriage_rebel_debug` |  |
| `v502_train_armoredengine_military_01_debug` |  |
| `v502_train_armoredengine_military_01_mission_special_steal_the_weapon_tech_debug` |  |
| `v502_train_armoredengine_military_01_node_military_05_debug` |  |
| `v502_train_armoredengine_military_02_debug` |  |
| `v502_train_armoredengine_military_03_debug` |  |
| `v502_train_armoredengine_military_04_debug` |  |
| `v502_train_armoredengine_rebel_02_debug` |  |
| `v502_train_armoredengine_rebel_03_debug` |  |
| `v502_train_armoredengine_rebel_04_debug` |  |
| `v502_train_armoredengine_rebel_debug` |  |
| `v502_train_armoredengine_rebel_mission_special_outro_debug` |  |
| `v502_train_armoredengine_rebel_mission_special_sandstorm_finale_debug` |  |
| `v503_train_armoredcargocarriage_military_catwalk_debug` |  |
| `v503_train_armoredcargocarriage_military_containers_debug` |  |
| `v503_train_armoredcargocarriage_military_empty_debug` |  |
| `v503_train_armoredcargocarriage_rebel_containers_debug` |  |
| `v503_train_armoredcargocarriage_rebel_debug` |  |
| `v503_train_armoredcargocarriage_rebel_empty_debug` |  |
| `v503_train_armoredcargocarriage_rebel_empty_decouple_immune_debug` |  |
| `v504_train_armoredfuelcarriage_military_debug` |  |
| `v504_train_armoredfuelcarriage_rebel_debug` |  |
| `v504_train_armoredfuelcarriage_rebel_not_targetable_debug` |  |
| `v505_train_armoredweaponcarriage_military_01_debug` |  |
| `v505_train_armoredweaponcarriage_rebel_debug` |  |
| `v506_train_armoredhowitzer_base_debug` |  |
| `v506_train_armoredhowitzer_military_covered_debug` |  |
| `v506_train_armoredhowitzer_military_debug` |  |
| `v506_train_armoredhowitzer_rebel_debug` |  |
| `v506_train_armoredhowitzer_rebel_decouple_immune_debug` |  |