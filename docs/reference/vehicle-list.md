# Vehicle List

This is a list of all vehicles available in JC4MP. You can spawn vehicles in the world using the [`World.SpawnVehicle`](/server-api/world) function.

Use the `name` field to spawn a specific vehicle. If you want to spawn a random vehicle with a specific tag, use a tag. For example:

```lua
-- Spawn a specific vehicle (in this case it's an ATV)
World.SpawnVehicle("v000_car_atv_civilian_01", vec3(0, 0, 0), vec3(0, 0, 0))

-- Spawn a random vehicle with the "atv" tag
World.SpawnVehicle("atv", vec3(0, 0, 0), vec3(0, 0, 0))
```

## Base Game Vehicles

These vehicles are included in the base Just Cause 4 game and are available to all players.


### Land Vehicles

#### Backer Vehicles
| Name | Tags |
| ---- | ----------- |
| Prisa Temerario ATV (brown paint only) <br/>`v000_car_atv_javi` | vehicle,land,javi_vehicle,javi_atv |
| Pugilista SUV (brown paint only) <br/>`v002_car_vintagesuv_javi` | vehicle,land,javi_vehicle,javi_jeep,javi_suv |
| Cadadía '83 hatchback <br/>`v011_car_oldtwodoorhatch_sargento` | vehicle,land,sargento_vehicle,sargento_hatch |
| Garland King studios van <br/>`v035_car_modernvan_garland` | vehicle,land,garland_vehicle,garland_van |
| Prisa Hidalgo <br/>`v040_car_oldcompact_sargento` | vehicle,land,sargento_vehicle,sargento_oldcompact |
| Prisa Maradona Z (brown paint only) <br/>`v308_bike_trials_javi` | vehicle,land,javi_vehicle,javi_bike |

#### Civilian Vehicles
| Name | Tags |
| ---- | ----------- |
| Prisa Temerario ATV <br/>`v000_car_atv_civilian_01` | vehicle,land,car,civilian,atv,worldsim,alpine,rainforest,ocean |
| Pugilista SUV <br/>`v002_car_vintagesuv_civilian` | vehicle,land,car,civilian,worldsim,desert,rainforest |
| Ritmo rickshaw <br/>`v008_car_taxitrike_civilian` | vehicle,land,car,trike,civilian,taxi,worldsim,rainforest |
| Cadadía '83 hatchback <br/>`v011_car_oldtwodoorhatch_civilian_01` | vehicle,land,car,civilian,worldsim,desert,rainforest,ocean |
| Coyle Mambo <br/>`v017_car_vintagemuscle_civilian` | vehicle,land,car,civilian,sport,worldsim,rainforest,alpine,modern |
| Chupacabra <br/>`v018_car_monstertruck_civilian_01` | vehicle,land,car,monstertruck |
| Kerner Charmant limo <br/>`v019_car_modernlimo_civilian_01` | vehicle,land,car,civilian,limo,vip,modern |
| Kerner '16 Vigeur <br/>`v020_car_moderngrandtourer_civilian_01` | vehicle,land,car,civilian,takedown,vip,worldsim,alpine,desert,modern |
| Kerner Serpente S <br/>`v021_car_sportsmuscle_civilian_01` | vehicle,land,car,civilian,takedown,sport,worldsim,grassland,alpine,modern |
| Mugello Farina trio <br/>`v022_car_moderncircuitracer_civilian_01` | vehicle,land,car,civilian,takedown |
| 2019 Vistosa supercar <br/>`v023_car_racingsuper_civilian_01` | vehicle,land,car,civilian,takedown,sport,worldsim,grassland,ocean,modern |
| 2019 Vistosa supercar (unused racing version) <br/>`v023_car_racingsuper_racing_01` | vehicle,land,car,racing,takedown |
| Verdeleon Eco <br/>`v024_car_ecosuper_civilian_01` | vehicle,land,car,civilian,takedown,sport,worldsim,desert,grassland,alpine,modern |
| Verdeleon Eco (unused racing version) <br/>`v024_car_ecosuper_racing_01` | vehicle,land,car,racing,takedown |
| Mugello Quipozza G <br/>`v025_car_vintagesuper_civilian_01` | vehicle,land,car,civilian,takedown,sport,worldsim,desert,alpine,rainforest,modern |
| '69 Mugello Raffinati <br/>`v026_car_vintagesports_civilian_01` | vehicle,land,car,civilian,sport,worldsim,desert,modern |
| Verdad 1 Stormchaser <br/>`v027_car_hurricanetruck_civilian` | vehicle,land,car,civilian,stormchaser,hurricane |
| Cúmbila sedan (clean) <br/>`v029_car_smallmodernsedan_civilian_01` | vehicle,land,car,civilian,worldsim,grassland,desert,modern |
| Cúmbila sedan (scratched) <br/>`v029_car_smallmodernsedan_civilian_02` | vehicle,land,car,civilian,worldsim,grassland,desert,modern |
| Prisa Fresca <br/>`v030_car_oldmini_civilian_01` | vehicle,land,car,civilian,worldsim,alpine,grassland |
| Prisa Rayo sport <br/>`v031_car_racinghothatch_civilian_01` | vehicle,land,car,civilian,worldsim,alpine,modern |
| Prisa Rayo sport <br/>`v031_car_racinghothatch_encounter_takedown` | vehicle,land,encounter_car_takedown_target |
| Sol 21 sport sedan <br/>`v032_car_luxurysportssedan_civilian_01` | vehicle,land,car,civilian,takedown,sport,worldsim,rainforest,alpine,modern |
| Prisa Fresca X <br/>`v033_car_modernmini_civilian_01` | vehicle,land,car,civilian,worldsim,grassland,ocean,modern |
| Pasofino pickup <br/>`v036_car_modernpickup_civilian_01` | vehicle,land,car,civilian,worldsim,alpine,grassland,ocean,modern |
| Prisa Viento SUV <br/>`v038_car_modernsuv_civilian_01` | vehicle,land,car,civilian,worldsim,grassland,alpine,modern |
| Caravana camper <br/>`v039_car_oldcampervan_civilian_01` | vehicle,land,car,civilian,worldsim,desert,rainforest |
| Prisa Hidalgo <br/>`v040_car_oldcompact_civilian_01` | vehicle,land,car,civilian,worldsim,desert,alpine,ocean |
| Prisa Azor 3 <br/>`v042_car_racingsedan_civilian` | vehicle,land,car,civilian,sport,worldsim,grassland,rainforest,modern |
| Prisa Azor 3 (unused racing version) <br/>`v042_car_racingsedan_racing_01` | vehicle,land,car,racing |
| Vagabundo buggy <br/>`v046_car_racingbuggy_civilian` | vehicle,land,car,civilian,buggy,worldsim,desert,rainforest,modern |
| Vagabundo buggy (unused racing version) <br/>`v046_car_racingbuggy_racing_01` | vehicle,land,car,racing,buggy |
| Toy offroader <br/>`v050_car_toyjeep_civilian` | vehicle,land,car,toy,jeep |
| Mugello V405 bike <br/>`v303_bike_modernsuper_civilian_01` | vehicle,land,bike,civilian,sport,worldsim,grassland,modern |
| Furia sportbike <br/>`v304_bike_modernsport_civilian_01` | vehicle,land,bike,civilian,sport,grassland,desert,modern,worldsim |
| Prisa X-2 bike <br/>`v305_bike_oldroad_civilian_01` | vehicle,land,bike,civilian,rainforest,alpine,worldsim |
| Prisa Viveza bike <br/>`v306_bike_modernroad_civilian_01` | vehicle,land,bike,civilian,sport,grassland,desert,modern,worldsim |
| Prisa Tía moped <br/>`v307_bike_oldmoped_civilian_01` | vehicle,land,bike,civilian,rainforest,alpine,worldsim |
| Prisa Maradona Z <br/>`v308_bike_trials_civilian_01` | vehicle,land,bike,civilian,worldsim,desert,rainforest |
| Alpinista snowmobile <br/>`v804_treaded_snowmobile_civilian` | vehicle,land,snowmobile,civilian |

#### Commercial Vehicles
| Name | Tags |
| ---- | ----------- |
| Camión truck <br/>`v004_car_articulatedtruck_commercial_01` | vehicle,land,truck,civilian |
| Camión truck with cargo trailer <br/>`v004_car_articulatedtruck_commercial_cargo_trailer` | vehicle,land,truck,civilian,cargo,worldsim,grassland,modern |
| Camión truck with car trailer <br/>`v004_car_articulatedtruck_commercial_cartransport_trailer` | vehicle,land,truck,civilian,cargo |
| Camión truck with flatbed trailer <br/>`v004_car_articulatedtruck_commercial_lowloader_trailer` | vehicle,land,truck,civilian,cargo,worldsim,rainforest,modern |
| Camión truck with signaljammer trailer <br/>`v004_car_articulatedtruck_commercial_radarjammer_trailer` | vehicle,land,truck,civilian,cargo |
| Camión truck with random trailer <br/>`v004_car_articulatedtruck_commercial_randomtrailer` | vehicle,land,truck,civilian |
| Camión truck with SAM trailer <br/>`v004_car_articulatedtruck_commercial_smallmobileweapon_trailer` | vehicle,land,truck,civilian,cargo |
| Forzudo armored VAN <br/>`v009_car_armoredtruck_commercial_01` | vehicle,land,car,van,civilian,worldsim,alpine,modern |
| Ranchero truck <br/>`v034_car_oldtruck_commercial_01` | vehicle,land,truck,civilian,cargo,worldsim,rainforest,desert |
| Ranchero truck with explosive barrels <br/>`v034_car_oldtruck_commercial_cargo_barrel` | vehicle,land,truck,civilian,cargo |
| Ranchero truck <br/>`v034_car_oldtruck_commercial_cargo_random` | vehicle,land,truck,civilian |
| Prisa Calzada van truck <br/>`v035_car_modernvan_civic_ambulance_01` | vehicle,land,van,civilian,ambulance |
| Calzada ambulancia <br/>`v035_car_modernvan_commercial_01` | vehicle,land,car,van,civilian,worldsim,rainforest,desert,modern |
| Prisa Viajero bus <br/>`v037_car_modernbus_commercial_01` | vehicle,land,bus,civilian,worldsim,grassland,modern |
| Car trailer <br/>`v901_trailer_cartransport_commercial` | vehicle,land,trailer |

#### Industrial Vehicles
| Name | Tags |
| ---- | ----------- |
| Armadillo forklift <br/>`v001_car_forklift_industrial` | vehicle,land,forklift,industrial |
| Armadillo crane truck <br/>`v003_car_crane_industrial` | vehicle,land,crane,civilian,industrial |
| Wheel loader <br/>`v005_car_wheelloader_industrial` | vehicle,land,wheelloader,civilian,industrial |
| Banda conveyor <br/>`v006_car_conveyorcrane_industrial` | vehicle,land,conveyor,civilian,industrial |
| Modelo 4 tractor <br/>`v010_car_oldtractor_civilian_01` | vehicle,land,tractor,civilian |
| Armadillo 9M <br/>`v045_car_minetruck_commercial_01` | vehicle,land,minetruck,civilian,industrial |
| Flatbed trailer <br/>`v902_trailer_lowloader_commercial` | vehicle,land,trailer,civilian |
| Flatbed trailer with radar (folded) <br/>`v902_trailer_lowloader_mobile_radar_folded` | v902_trailer_lowloader_mobile_radar_folded |
| Flatbed trailer with radar (folded) <br/>`v902_trailer_lowloader_mobile_radar_folded_sargento_aiproxy_enabled` | vehicle,land,mission |
| Flatbed trailer with radar (extended) <br/>`v902_trailer_lowloader_mobile_radar_upright` | v902_trailer_lowloader_mobile_radar_upright |
| Flatbed trailer with radar (extended) <br/>`v902_trailer_lowloader_mobile_radar_upright_sargento_aiproxy_enabled` | vehicle,land,mission |
| Cargo trailer <br/>`v903_trailer_cargo_commercial` | vehicle,land,trailer,cargo,civilian |

#### Military Vehicles
| Name | Tags |
| ---- | ----------- |
| Reptile AAV <br/>`v012_car_apc_military_01` | vehicle,land,truck,apc,military,armed,heat_worldsim,rainforest,grassland,oppressed |
| Cavalry armored truck <br/>`v013_car_armoredtransport_military_01` | vehicle,land,truck,military,armed,heat_worldsim,desert,grassland,oppressed |
| Warrior offroader <br/>`v014_car_offroadtruck_military_01` | vehicle,land,car,military,heat_worldsim,alpine,grassland |
| Longbow cannon truck <br/>`v015_car_cannontruck_military` | vehicle,land,truck,military,cannon,armed,heat_worldsim,desert,oppressed |
| Prospero hauler <br/>`v016_car_armoredarticulatedtruck_military` | vehicle,land,truck,military |
| Prospero hauler with generator <br/>`v016_car_armoredarticulatedtruck_military_generator` | vehicle,land,military,heat_worldsim,desert,rainforest,grassland,alpine |
| Vagabundo buggy <br/>`v046_car_racingbuggy_military` | vehicle,land,car,military,heat_worldsim,desert,rainforest |
| Prospero Hunter bike <br/>`v301_bike_combatdirt_military_01` | vehicle,land,bike,military,heat_worldsim,rainforest,grassland,desert |
| Warchief assault tank <br/>`v800_treaded_modernheavytank_military_01` | vehicle,land,tank,military,heat_worldsim,grassland,oppressed,armed,scanner_v800 |
| Prizefighter tank <br/>`v801_treaded_mediumtank_military_01` | vehicle,land,tank,military,armed,heat_worldsim,desert,alpine,oppressed |
| Falconer AA tank <br/>`v802_treaded_aatank_military` | vehicle,land,tank,military,aa,armed,heat_worldsim,liberated,alpine,rainforest,desert |
| Pointman scout tank <br/>`v803_treaded_flexturrettank_military` | vehicle,land,tank,military,armed,heat_worldsim,rainforest,oppressed,scanner_v803 |
| Huntsman SAM launcher <br/>`v904_trailer_smallmobileweapon_military` | vehicle,land,trailer,military,sam,armed |
| Prospero signal jammer <br/>`v907_trailer_radarjammer_military` | vehicle,land,trailer,military,radar |

#### Mission vehicles
| Name | Tags |
| ---- | ----------- |
| Ion coil Stormchaser <br/>`v027_car_hurricanetruck_tesla` | vehicle,land,mission |
| Tied down Ion coil Stormchaser (not usable) <br/>`v027_car_hurricanetruck_transport` | vehicle,land,mission |
| Ranchero truck with weapon shipment box <br/>`v034_car_oldtruck_commercial_cargo_sargento_intro` | vehicle,land,mission |
| Ranchero truck with explosive barrels <br/>`v034_car_oldtruck_commercial_cargo_barrel_mission_special` | vehicle,land,mission |
| Alpinista snowmobile <br/>`v804_treaded_snowmobile_civilian_mission_special` | vehicle,land,mission |

#### Rebel Vehicles
| Name | Tags |
| ---- | ----------- |
| Pugilista SUV <br/>`v002_car_vintagesuv_rebel` | vehicle,land,car,rebel,heat_worldsim,grassland,alpine,rainforest |
| Reptile AAV <br/>`v012_car_apc_rebel_01` | vehicle,land,truck,apc,rebel,armed,heat_worldsim,rainforest,grassland |
| Reptile AAV <br/>`v012_car_apc_rebel_01_mission_special` | vehicle,land,mission |
| Cavalry armored truck <br/>`v013_car_armoredtransport_rebel_01` | vehicle,land,truck,rebel,armed,heat_worldsim,desert,rainforest,liberated |
| Warrior offroader <br/>`v014_car_offroadtruck_rebel_01` | vehicle,land,car,rebel,heat_worldsim,desert,grassland,rainforest,alpine |
| Longbow cannon truck <br/>`v015_car_cannontruck_rebel` | vehicle,land,truck,rebel,cannon,armed |
| Prospero hauler <br/>`v016_car_armoredarticulatedtruck_rebel` | vehicle,land,truck,rebel,heat_worldsim,desert,rainforest,liberated |
| Prospero Hunter bike <br/>`v301_bike_combatdirt_rebel_01` | vehicle,land,bike,rebel,heat_worldsim,rainforest,desert |
| Warchief assault tank <br/>`v800_treaded_modernheavytank_rebel_01` | vehicle,land,tank,rebel,armed,scanner_v800,heat_worldsim,grassland,liberated |
| Prizefighter tank <br/>`v801_treaded_mediumtank_rebel_01` | vehicle,land,tank,rebel,armed,heat_worldsim,rainforest,desert,liberated |
| Falconer AA tank <br/>`v802_treaded_aatank_rebel` | vehicle,land,tank,rebel,aa,armed |
| Pointman scout tank <br/>`v803_treaded_flexturrettank_rebel` | vehicle,land,tank,rebel,armed,scanner_v803 |
| Huntsman SAM launcher <br/>`v904_trailer_smallmobileweapon_rebel` | vehicle,land,trailer,sam,rebel,armed |

#### Rico Vehicles
| Name | Tags |
| ---- | ----------- |
| Coyle Mambo (unused, black paint only) <br/>`v017_car_vintagemuscle_civilian_02` | vehicle,land,car,rico |

### Sea Vehicles

#### Mission/Event/Encounter Vehicles
| Name | Tags |
| ---- | ----------- |
| `v104_boat_landingtransport_commercial_signal_jammer` | vehicle,sea,mission |
| `v104_boat_landingtransport_commercial_lightningrod_escort` | vehicle,sea,mission |
| `v102_boat_heavypatrol_lightning` | vehicle,sea,mission |
| `v108_boat_largeoldfishing_civilian_01_garland_intro` | vehicle,sea,mission |
| `v109_boat_ferry_commercial_garlandintro` | vehicle,sea,mission |

#### Civilian Vehicles
| Name | Tags |
| ---- | ----------- |
| `v106_boat_motoryacht_civilian_01` | vehicle,sea,boat,civilian,worldsim,grassland,rainforest,ocean,modern |
| `v108_boat_largeoldfishing_civilian_01` | vehicle,sea,boat,civilian,fishing,worldsim,desert,rainforest,ocean |
| `v107_boat_racingboat_civilian_01` | vehicle,sea,boat,civilian,worldsim,grassland,ocean,modern |
| `v110_boat_jetski_civilian_01` | vehicle,sea,jetski,civilian,worldsim,grassland,rainforest,modern |
| `v105_boat_sailboat_civilian_01` | vehicle,sea,boat,civilian,worldsim,modern |
| `v100_boat_fanboat_civilian` | vehicle,sea,boat,civilian,worldsim,rainforest |
| `v109_boat_ferry_commercial` | vehicle,sea,ferry,civilian |

#### Military Vehicles
| Name | Tags |
| ---- | ----------- |
| `v101_boat_smalljet_military` | vehicle,sea,boat,military,armed,heat_worldsim,rainforest,scanner_v101 |
| `v102_boat_heavypatrol_military_01` | vehicle,sea,boat,military,armed,heat_worldsim,rainforest,ocean,oppressed,scanner_v102 |
| `v103_boat_corvette_military_01` | vehicle,sea,boat,ship,military,armed,heat_worldsim,ocean |
| `v104_boat_landingtransport_commercial` | vehicle,sea,ship,transport,military |

#### Rebel Vehicles
| Name | Tags |
| ---- | ----------- |
| `v101_boat_smalljet_rebel` | vehicle,sea,boat,rebel,armed,heat_worldsim,rainforest,ocean,scanner_v101 |
| `v102_boat_heavypatrol_rebel_01` | vehicle,sea,boat,rebel,armed,heat_worldsim,rainforest,ocean,liberated,scanner_v102 |
| `v103_boat_corvette_rebel_01` | vehicle,sea,ship,rebel,armed,heat_worldsim,ocean,liberated |

### Air Vehicles

#### Mission/Event/Encounter Vehicles
| Name | Tags |
| ---- | ----------- |
| `v250_helicopter_mediumattackdrone_tornado` | vehicle,air,mission |
| `v200_helicopter_heavylift_rebel_mission_special` | vehicle,air,mission |
| `v401_plane_cargotransport_signal_jammer` | vehicle,air,mission |
| `v205_helicopter_utility_garland` | vehicle,air,mission |
| `v206_helicopter_bubblescout_javi` | vehicle,air,mission |
| `v202_helicopter_heavytroop_mira` | vehicle,air,mission |
| `v202_helicopter_heavytroop_gabriela` | vehicle,air,mission |
| `v700_balloon_dirigible_node_science_01` | vehicle,air,civilian,dirigible |

#### Civilian Vehicles
| Name | Tags |
| ---- | ----------- |
| `v205_helicopter_utility_civilian_01` | vehicle,air,helicopter,civilian,vip,worldsim,grassland,desert,ocean |
| `v205_helicopter_utility_commercial_news` | vehicle,air,helicopter,civilian,news,worldsim,alpine,rainforest |
| `v407_plane_mediumprop_civilian_01` | vehicle,air,plane,civilian,propeller,worldsim,grassland,desert,ocean |
| `v406_plane_smallprop_civilian_01` | vehicle,air,plane,civilian,propeller,worldsim,rainforest |
| `v408_plane_ultralight_civilian` | vehicle,air,plane,civilian,propeller,worldsim,rainforest,desert |
| `v404_plane_privatejet_civilian` | vehicle,air,plane,jet,civilian,worldsim,modern,grassland,desert |
| `v405_plane_commercialcargo_commercial` | vehicle,air,plane,civilian,jet,worldsim,ocean,modern |
| `v700_balloon_dirigible_civilian` | vehicle,air,civilian,dirigible,worldsim,grassland,rainforest,modern |
| `v700_balloon_dirigible_collectible` | vehicle,air,civilian,dirigible,unarmed,unarmored,large,collectible |
| `v206_helicopter_bubblescout_civilian_01` | vehicle,air,helicopter,civilian,worldsim,ocean,rainforest |

#### Military Vehicles
| Name | Tags |
| ---- | ----------- |
| `v200_helicopter_heavylift_military` | vehicle,air,helicopter,military,winch |
| `v200_helicopter_heavylift_military_chaos_sphere_tank` | vehicle,air,military,heat_worldsim,desert,rainforest,grassland |
| `v201_helicopter_mediumattack_military_01` | vehicle,air,helicopter,military,armed,heat_worldsim,oppressed,alpine,desert |
| `v203_helicopter_lightattack_military_01` | vehicle,air,helicopter,military,armed,heat_worldsim,rainforest,grassland |
| `v202_helicopter_heavytroop_military_01` | vehicle,air,helicopter,transport,military,heat_worldsim,rainforest,desert,oppressed |
| `v204_helicopter_heavyassault_military_01` | vehicle,air,helicopter,military,armed,heat_worldsim,desert,oppressed |
| `v250_helicopter_mediumattackdrone_military` | vehicle,air,drone,military,armed |
| `v251_helicopter_rocketdrone_military` | vehicle,air,drone,military,armed |
| `v252_helicopter_suicidedrone_military` | vehicle,air,drone,military |
| `v254_helicopter_guarddrone_military` | vehicle,air,drone,military,titan_drone,armed |
| `v401_plane_cargotransport_military_01` | vehicle,air,plane,military,cargo,transport |
| `v401_plane_cargotransport_military_01_paratrooper` | vehicle,air,plane,military,paratrooper |
| `v400_plane_fighterjet_military_01` | vehicle,air,plane,military,armed,heat_worldsim,ocean,desert,rainforest,grassland |
| `v402_plane_fighterbomber_military_01` | vehicle,air,plane,military,armed,heat_worldsim,desert,rainforest,grassland,oppressed |
| `v403_plane_microjet_military` | vehicle,air,plane,military,armed,heat_worldsim,desert,ocean,oppressed |
| `v700_balloon_dirigible_military_01` | vehicle,air,dirigible,military |

#### Rebel Vehicles
| Name | Tags |
| ---- | ----------- |
| `v200_helicopter_heavylift_rebel_01` | vehicle,air,helicopter,rebel,winch |
| `v201_helicopter_mediumattack_rebel_01` | vehicle,air,helicopter,rebel,armed,heat_worldsim,rainforest,liberated |
| `v203_helicopter_lightattack_rebel_01` | vehicle,air,helicopter,rebel,armed,heat_worldsim,grassland,rainforest |
| `v202_helicopter_heavytroop_rebel_01` | vehicle,air,helicopter,rebel,transport,heat_worldsim,desert,rainforest,liberated |
| `v204_helicopter_heavyassault_rebel_01` | vehicle,air,helicopter,rebel,armed |
| `v251_helicopter_rocketdrone_rebel` | vehicle,air,drone,rebel,armed |
| `v252_helicopter_suicidedrone_rebel` | vehicle,air,drone,rebel |
| `v250_helicopter_mediumattackdrone_rebel` | vehicle,air,drone,rebel,armed |
| `v253_helicopter_decoydrone_rebel` | vehicle,air,drone,rebel,weapon_drone,armed |
| `v254_helicopter_guarddrone_rebel` | vehicle,air,drone,rebel,weapon_drone,armed |
| `v401_plane_cargotransport_rebel_01` | vehicle,air,plane,rebel,cargo,transport |
| `v400_plane_fighterjet_rebel_01` | vehicle,air,plane,rebel,armed,heat_worldsim,ocean,rainforest,grassland,desert |
| `v402_plane_fighterbomber_rebel_01` | vehicle,air,plane,rebel,armed,heat_worldsim,grassland,rainforest,liberated |
| `v403_plane_microjet_rebel` | vehicle,air,plane,rebel,armed,heat_worldsim,rainforest,liberated |

#### Preorder Vehicles
| Name | Tags |
| ---- | ----------- |
| `v253_helicopter_decoydrone_preorder` | vehicle,air,drone,preorder,weapon_drone,armed |


## DLC Vehicles

These vehicles are available in the DLC content packs.

### [Danger Rising](https://store.steampowered.com/app/972350/Just_Cause_4_Danger_Rising/)

| Name | Tags |
| ---- | ----------- |
| `v270_helicopter_agencydrone_agency` | vehicle,air,drone,agency,armed,agent_grapple |
| `v270_helicopter_agencydrone_rebel` | vehicle,air,drone,agency_rebel,armed,rebel |
| `v221_helicopter_agencyspy_agency` | vehicle,air,helicopter,agency,armed |
| `v123_boat_agencyspy_agency` | vehicle,sea,boat,agency,armed |
| `v851_car_hovercraft_agency` | vehicle,sea,boat,agency,armed,hovercraft,amphibious |
| `v908_trailer_agencysmallmobileweapon_agency` | vehicle,land,trailer,agency,sam,armed |

#### Mission/Event/Encounter Vehicles
| Name | Tags |
| ---- | ----------- |
| `v851_car_hovercraft_agency_mission_special_dlc3_outro` | vehicle,amphibious,mission |
| `v002_car_vintagesuv_rebel_mission_special_dlc3_intro` | vehicle,mission_special |

### [Dare Devils of Destruction](https://store.steampowered.com/app/971760/Just_Cause_4_Dare_Devils_of_Destruction/)

| Name | Tags |
| ---- | ----------- |
| `v012_car_apc_daredevil` | vehicle,land,daredevil |
| `v051_car_battlemuscle_daredevil` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_metal01` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_rust01` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_stripe01` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_stripe02` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_tiger01` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_level_0` | vehicle,land,car,daredevil,v051,worldsim |
| `v070_car_offroadtruckdlc1_level_0` | vehicle,land,daredevil,v070,team_mechanics |
| `v070_car_offroadtruckdlc1_level_1` | vehicle,land,daredevil,v070,team_mechanics |
| `v070_car_offroadtruckdlc1_level_2` | vehicle,land,daredevil,v070,team_mechanics |
| `v070_car_offroadtruckdlc1_level_3` | vehicle,land,daredevil,v070,team_mechanics |
| `v071_car_modernpickupdlc1_level_0` | vehicle,land,daredevil,v071,team_mechanics |
| `v071_car_modernpickupdlc1_level_1` | vehicle,land,daredevil,v071,team_mechanics |
| `v071_car_modernpickupdlc1_level_2` | vehicle,land,daredevil,v071,team_mechanics |
| `v071_car_modernpickupdlc1_level_3` | vehicle,land,daredevil,v071,team_mechanics |
| `v072_car_vintagesuvdlc1_level_0` | vehicle,land,daredevil,v072,team_convicts |
| `v072_car_vintagesuvdlc1_level_1` | vehicle,land,daredevil,v072,team_convicts |
| `v072_car_vintagesuvdlc1_level_2` | vehicle,land,daredevil,v072,team_convicts |
| `v072_car_vintagesuvdlc1_level_3` | vehicle,land,daredevil,v072,team_convicts |
| `v073_car_luxurysportssedandlc1_level_0` | vehicle,land,daredevil,v073,team_racers |
| `v073_car_luxurysportssedandlc1_level_1` | vehicle,land,daredevil,v073,team_racers |
| `v073_car_luxurysportssedandlc1_level_2` | vehicle,land,daredevil,v073,team_racers |
| `v073_car_luxurysportssedandlc1_level_3` | vehicle,land,daredevil,v073,team_racers |
| `v074_car_ecosuperdlc1_level_0` | vehicle,land,daredevil,v074,team_racers |
| `v074_car_ecosuperdlc1_level_1` | vehicle,land,daredevil,v074,team_racers |
| `v074_car_ecosuperdlc1_level_2` | vehicle,land,daredevil,v074,team_racers |
| `v074_car_ecosuperdlc1_level_3` | vehicle,land,daredevil,v074,team_racers |
| `v075_car_vintagesuperdlc1_level_0` | vehicle,land,daredevil,v075,team_convicts |
| `v075_car_vintagesuperdlc1_level_1` | vehicle,land,daredevil,v075,team_convicts |
| `v075_car_vintagesuperdlc1_level_2` | vehicle,land,daredevil,v075,team_convicts |
| `v075_car_vintagesuperdlc1_level_3` | vehicle,land,daredevil,v075,team_convicts |
| `v076_car_racingbuggydlc1_level_0` | vehicle,land,daredevil,v076,team_convicts |
| `v076_car_racingbuggydlc1_level_1` | vehicle,land,daredevil,v076,team_convicts |
| `v076_car_racingbuggydlc1_level_2` | vehicle,land,daredevil,v076,team_convicts |
| `v076_car_racingbuggydlc1_level_3` | vehicle,land,daredevil,v076,team_convicts |
| `v077_car_offroadracingsedandlc1_level_0` | vehicle,land,daredevil,v077,team_racers |
| `v077_car_offroadracingsedandlc1_level_1` | vehicle,land,daredevil,v077,team_racers |
| `v077_car_offroadracingsedandlc1_level_2` | vehicle,land,daredevil,v077,team_racers |
| `v077_car_offroadracingsedandlc1_level_3` | vehicle,land,daredevil,v077,team_racers |
| `v078_car_monstertruckdlc1_level_0` | vehicle,land,daredevil,v078,team_mechanics |
| `v078_car_monstertruckdlc1_level_1` | vehicle,land,daredevil,v078,team_mechanics |
| `v078_car_monstertruckdlc1_level_2` | vehicle,land,daredevil,v078,team_mechanics |
| `v078_car_monstertruckdlc1_level_3` | vehicle,land,daredevil,v078,team_mechanics |

#### Mission/Event/Encounter Vehicles
| Name | Tags |
| ---- | ----------- |
| `v051_car_battlemuscle_intro_level_1` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_intro_level_2` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_intro_level_3` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_rampagerallyace_level_1` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_rampagerallyace_level_2` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_rampagerallyace_level_3` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_deathraceace_level_1` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_deathraceace_level_2` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_deathraceace_level_3` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_survivalraceace_level_1` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_survivalraceace_level_2` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_survivalraceace_level_3` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_outro_level_1` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_outro_level_2` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_outro_level_3` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_allgold_level_3` | vehicle,land,daredevil,v051 |
| `v051_car_battlemuscle_collectible_level_3` | vehicle,land,daredevil,v051 |

### [Los Demonios](https://store.steampowered.com/app/972351/Just_Cause_4_Los_Demonios/)

None.

### [Brawler Mech](https://store.steampowered.com/app/1087130/Just_Cause_4_Brawler_Mech/)

| Name | Tags |
| ---- | ----------- |
| `v600_mech_loader_garage` | vehicle,land,plane,ocean,desert,grassland |

### [Shark & Bark Vehicle Pack](https://store.steampowered.com/app/1087131/Just_Cause_4__Shark__Bark_Vehicle_Pack/)

| Name | Tags |
| ---- | ----------- |
| `v082_car_shark_garage` | vehicle,land,truck,garage |
| `v083_car_dog_garage` | vehicle,land,truck,garage |

### [Sea Dogs Vehicle Pack](https://store.steampowered.com/app/1087123/Just_Cause_4_Sea_Dogs_Vehicle_Pack/)

| Name | Tags |
| ---- | ----------- |
| `v080_car_galleonfloat_garage` | vehicle,land,truck,garage |
| `v850_car_hovercraft_armored_garage` | vehicle,land,car,tank,garage |

### [Adversary Vehicle Pack](https://store.steampowered.com/app/1087122/Just_Cause_4_Adversary_Vehicle_Pack/)

| Name | Tags |
| ---- | ----------- |
| `v422_plane_vtoljet_garage` | vehicle,air,plane,armed,ocean,desert,grassland |
| `v081_car_interceptor` | vehicle,land,car,military,garage |

### [Soaring Speed Vehicle Pack](https://store.steampowered.com/app/1087121/Just_Cause_4_Soaring_Speed_Vehicle_Pack/)

| Name | Tags |
| ---- | ----------- |
| `v086_car_flyingcar_garage` | vehicle,land,garage |
| `v425_plane_flyingcar_garage` | vehicle,air,plane,ocean,desert,grassland |

### [Toy Vehicle Pack](https://store.steampowered.com/app/1087120/Just_Cause_4_Toy_Vehicle_Pack/)

| Name | Tags |
| ---- | ----------- |
| `v122_boat_toypatrol_garage` | vehicle,sea,boat,ship,garage,ocean,heat_easteregg |
| `v420_plane_toybomber_garage` | vehicle,air,plane,heat_easteregg |
| `v820_treaded_toytank_garage` | vehicle,land,tank,heat_easteregg |

### [The Dragon](https://store.steampowered.com/app/1028920/Just_Cause_4_The_Dragon/)

| Name | Tags |
| ---- | ----------- |
| `v046_car_racingbuggy_preorder_01` | vehicle,land,car,buggy,desert,rainforest |
| `v017_car_vintagemuscle_rico` | vehicle,land,car,rico |
| `v403_plane_microjet_preorder_01` | vehicle,air,plane,preorder,armed |
| `v024_car_ecosuper_preorder_01` | vehicle,land,car,civilian,sport,desert |
| `v053_car_hotrod_garage` | vehicle,land,car,worldsim,garage |
| `v053_car_hotrod_ratrod` | vehicle,land,car,garage |
| `v084_car_icecreamtruck_garage` | vehicle,land,buggy,garage |
| `v117_boat_duck_garage` | vehicle,sea,boat,ship,garage,ocean |

