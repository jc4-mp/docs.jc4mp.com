---
sidebar_position: 94
---

# Effects

Every particle effect file in the game (879 effects), for [`FX.Spawn`](../client/fx.md): explosions, fire, smoke, sparks, water splashes, weapon impacts, trails, weather and more.

**Available on:** Client

## Usage {#usage}

### FX.Spawn(effect, position, rotation) {#fxspawneffect-position-rotation}

Plays `effect` at `position` with `rotation` (euler angles in **radians**, `vec3`) and returns an `EffectInstance` (see [FX](../client/fx.md) and [game objects](../client/game-objects.md)). The effect only plays on the client that spawns it; send a [Net](../shared/net.md) event to every client if all players should see it.

- `effect` is the full path of an `.effc` file: the folder heading followed by the file name, lowercase, exactly as listed.
- Effects are loaded from the game files when spawned, so they don't need to be in use nearby.
- Effects in a folder marked with a DLC only exist for players who own that DLC.
- An effect plays once with its own duration; looping effects keep going until you call their `Stop` method.

**Example**

```lua
-- client: a firework where the player aims
Cmd.Add("firework", function()
	local obj = World.LocalPlayer()
	if not obj then return end

	local position = obj:AsPlayer():GetAimPosition()

	FX.Spawn("effects/confetti_fireworks_trail_01.effc", position, vec3(0, 0, 0))
end)
```

## Values {#values}

### dlc/agency/effects/ {#dlcagencyeffects}

- `camera_shake_generic_l_looping.effc`
- `hoverboard_magrail_loop.effc`
- `hoverpanel_complete_explosion.effc`
- `hoverpanel_idle.effc`
- `hoverpanel_overloaded.effc`
- `hoverpanel_primed.effc`
- `magrail_hitimpact_02.effc`

### dlc/agency/effects/vehicles/ (Sea Dogs Vehicle Pack) {#dlcagencyeffectsvehicles-sea-dogs-vehicle-pack}

- `armored_hovercraft_dmg_fire_engine.effc`
- `hoverboard_traversal_air.effc`
- `hoverboard_traversal_asphalt.effc`
- `hoverboard_traversal_asphalt_land.effc`
- `hoverboard_traversal_dirt.effc`
- `hoverboard_traversal_dirt_land.effc`
- `hoverboard_traversal_grass.effc`
- `hoverboard_traversal_grass_land.effc`
- `hoverboard_traversal_gravel.effc`
- `hoverboard_traversal_gravel_land.effc`
- `hoverboard_traversal_metal_land.effc`
- `hoverboard_traversal_mud.effc`
- `hoverboard_traversal_mud_land.effc`
- `hoverboard_traversal_sand.effc`
- `hoverboard_traversal_sand_land.effc`
- `hoverboard_traversal_snow.effc`
- `hoverboard_traversal_snow_land.effc`
- `hoverboard_traversal_water.effc`
- `hoverboard_traversal_water_land.effc`

### dlc/agency/effects/vehicles/agency_armored_hovercraft/ (Sea Dogs Vehicle Pack) {#dlcagencyeffectsvehiclesagency_armored_hovercraft-sea-dogs-vehicle-pack}

- `armored_hovercraft_sand_traversal.effc`
- `armored_hovercraft_water_traversal.effc`
- `canon_muzzleflash.effc`
- `hovercraft_groundshock.effc`
- `rotor_wash_asphalt.effc`
- `rotor_wash_dirt.effc`
- `rotor_wash_grass.effc`
- `rotor_wash_gravel.effc`
- `rotor_wash_medium.effc`
- `rotor_wash_snow.effc`

### dlc/agency/effects/vehicles/agency_helicopter/ (Danger Rising) {#dlcagencyeffectsvehiclesagency_helicopter-danger-rising}

- `helicopter_minigun_muzzleflash_02.effc`

### dlc/agency/effects/vehicles/agency_hovercraft/ (Danger Rising) {#dlcagencyeffectsvehiclesagency_hovercraft-danger-rising}

- `agency_rotor_wash_asphalt.effc`
- `agency_rotor_wash_dirt.effc`
- `agency_rotor_wash_grass.effc`
- `agency_rotor_wash_gravel.effc`
- `agency_rotor_wash_medium.effc`
- `agency_rotor_wash_sand.effc`
- `agency_rotor_wash_snow.effc`
- `agency_rotor_wash_water_02.effc`
- `hovercraft_muzzleflash.effc`

### dlc/agency/effects/weapons/ {#dlcagencyeffectsweapons}

- `explosivetrike_muzzle_flash.effc`
- `rico_smg_muzzleflash.effc`

### dlc/agency/effects/weapons/agency_handcannon/ (Danger Rising) {#dlcagencyeffectsweaponsagency_handcannon-danger-rising}

- `impact_blood_shotgun.effc`
- `impact_concrete_shotgun.effc`
- `impact_dirt_shotgun.effc`
- `impact_glass_shotgun.effc`
- `impact_grass_shotgun.effc`
- `impact_gravel_shotgun.effc`
- `impact_headshot_shotgun.effc`
- `impact_metal_car_shotgun.effc`
- `impact_metal_shotgun.effc`
- `impact_sand_shotgun.effc`
- `impact_snow_shotgun.effc`
- `impact_wood_shotgun.effc`
- `rico_grenade_handcannon_muzzle_flash.effc`
- `shell_eject_12ga.effc`

### dlc/agency/effects/weapons/agency_magnesis/ (Danger Rising) {#dlcagencyeffectsweaponsagency_magnesis-danger-rising}

- `magnesis_muzzle_flash.effc`
- `magnesis_muzzle_flash_burst.effc`
- `magnesis_muzzle_flash_hold.effc`
- `magnesis_muzzle_flash_release.effc`
- `magnesis_muzzle_flash_throw.effc`

### dlc/agency/effects/weapons/agency_smg/ (Danger Rising) {#dlcagencyeffectsweaponsagency_smg-danger-rising}

- `impact_blood_agency_smg.effc`
- `impact_concrete_agency_smg.effc`
- `impact_dirt_agency_smg.effc`
- `impact_fabric_agency_smg.effc`
- `impact_glass_agency_smg.effc`
- `impact_grass_agency_smg.effc`
- `impact_gravel_agency_smg.effc`
- `impact_grenade_agency_smg.effc`
- `impact_headshot_agency_smg.effc`
- `impact_metal_agency_smg.effc`
- `impact_plastic_agency_smg.effc`
- `impact_sand_agency_smg.effc`
- `impact_snow_agency_smg.effc`
- `impact_water_agency_smg.effc`
- `impact_wood_agency_smg.effc`
- `rico_grenade_launcher_muzzleflash.effc`

### dlc/agency/effects/weapons/agency_sniper/ (Danger Rising) {#dlcagencyeffectsweaponsagency_sniper-danger-rising}

- `agency_sniper_impact_blood.effc`
- `agency_sniper_impact_character.effc`
- `agency_sniper_impact_concrete.effc`
- `agency_sniper_impact_dirt.effc`
- `agency_sniper_impact_fabric.effc`
- `agency_sniper_impact_glass.effc`
- `agency_sniper_impact_grass.effc`
- `agency_sniper_impact_gravel.effc`
- `agency_sniper_impact_headshot.effc`
- `agency_sniper_impact_metal.effc`
- `agency_sniper_impact_plastic.effc`
- `agency_sniper_impact_sand.effc`
- `agency_sniper_impact_snow.effc`
- `agency_sniper_impact_water.effc`
- `agency_sniper_impact_wood.effc`
- `rico_agencysniper_drone_muzzleflash.effc`
- `rico_agencysniper_muzzleflash_02.effc`

### dlc/daredevil/effects/ (Brawler Mech) {#dlcdaredevileffects-brawler-mech}

- `fire_engine.effc`
- `mission_trigger_ring_dlc1_general.effc`

### dlc/daredevil/effects/attachments/ (Dare Devils of Destruction) {#dlcdaredevileffectsattachments-dare-devils-of-destruction}

- `jet_booster_lv1_postfx.effc`
- `side_booster_lv1_postfx.effc`
- `tire_pump_lv1_postfx.effc`

### dlc/daredevil/effects/trails/ (The Dragon) {#dlcdaredevileffectstrails-the-dragon}

- `firework_burn_trail.effc`
- `firework_burn_trail_red.effc`
- `firework_burn_trail_sm.effc`
- `spark_trail_anglegrinder_01.effc`

### dlc/demonios/effects/ (Los Demonios) {#dlcdemonioseffects-los-demonios}

- `aoe_steam.effc`
- `camera_shake_generic_l.effc`
- `camera_shake_generic_m.effc`
- `camera_shake_generic_m_looping.effc`
- `camera_shake_generic_s.effc`
- `camera_shake_generic_s_looping.effc`
- `crossbow_burst.effc`
- `dirt_explosion_s_01.effc`
- `dirt_explosion_s_01_postfx.effc`
- `dirt_explosion_s_02.effc`
- `explosion_organic_extrasmall_01.effc`
- `gore_explosion_jet_medium_01.effc`
- `gore_explosion_jet_medium_03.effc`
- `gore_explosion_jet_medium_04.effc`
- `gore_explosion_jet_medium_05.effc`
- `mission_trigger_ring_dlc2_general.effc`
- `steam_cylindrical.effc`
- `steam_cylindrical_02.effc`
- `steam_large.effc`
- `steam_wide_02.effc`
- `steam_wide_03.effc`
- `steam_wide_05.effc`

### dlc/demonios/effects/demon_drone/ (Los Demonios) {#dlcdemonioseffectsdemon_drone-los-demonios}

- `acid_trail_smoke.effc`

### effects/ {#effects}

- `blank.effc`
- `confetti_explosion.effc`
- `confetti_explosion_wide.effc`
- `confetti_fireworks_trail_01.effc`

### effects/cinematic/ {#effectscinematic}

- `aoe_air.effc`
- `aoe_air_thick.effc`
- `cin_door_open_pressure_smoke.effc`
- `cin_explosion_01.effc`
- `cin_stone_debris_falling_s.effc`
- `cin_windwalker_finale_tower_1060_smoke_fracture01.effc`
- `cin_windwalker_finale_tower_1130_ground_smoke.effc`
- `dmg_explosion_engine_plane.effc`
- `dmg_fire_engine_plane_top.effc`
- `dmg_fire_engine_plane_top_lblast.effc`
- `explosion_water.effc`
- `mm170_small_fire.effc`
- `mm180_spark_electric_trail_01.effc`
- `mm350_heli_belly_sparks.effc`
- `plane_impact_dirt.effc`

### effects/destruction/ (Los Demonios) {#effectsdestruction-los-demonios}

- `concussive_large_01.effc`
- `concussive_xlarge_01.effc`
- `explosion_base_01.effc`
- `explosion_base_03_directional_burn.effc`
- `explosion_base_missile.effc`
- `explosion_electric_base.effc`
- `explosion_emp_flatbed.effc`
- `explosion_jerrycan_sm.effc`
- `explosion_template_trail.effc`
- `explosion_template_trail_sm.effc`
- `firework_01.effc`
- `hex_glass_break.effc`

### effects/destruction/building/ {#effectsdestructionbuilding}

- `fracture_brick_med_01.effc`
- `fracture_concrete_med_01.effc`
- `fracture_concrete_xlarge_01a.effc`
- `fracture_glass_large_01.effc`
- `fracture_glass_med_01.effc`
- `fracture_glass_sm_01.effc`
- `fracture_metal_large_01.effc`
- `fracture_metal_med_01.effc`
- `fracture_wood_large_01.effc`
- `fracture_wood_med_01.effc`
- `fracture_wood_plank_01.effc`
- `fracture_wood_sm_01.effc`
- `impact_metal_med_01.effc`
- `impact_metal_sheet_large.effc`
- `oil_rig_metal_break.effc`
- `slide_concrete_med_01.effc`
- `slide_metal_med_01.effc`

### effects/destruction/electrical/ {#effectsdestructionelectrical}

- `elec_bolts_01.effc`
- `elec_bolts_medium_burst.effc`
- `elec_bolts_medium_loop.effc`
- `elec_bolts_small_loop.effc`
- `elec_burn_loop_01.effc`
- `elec_burn_loop_02_small.effc`
- `elec_burn_loop_10m.effc`
- `elec_burn_loop_10m_heavy.effc`
- `elec_burn_loop_2m.effc`
- `elec_burn_loop_2m_02.effc`
- `elec_detach_burn_01_sm.effc`
- `elec_drip_loop_50sec_01.effc`
- `elec_explosion_025m.effc`
- `elec_explosion_10m.effc`
- `elec_explosion_10m_postfx.effc`
- `elec_explosion_1m.effc`
- `elec_explosion_1m_b.effc`
- `elec_explosion_1m_b_postfx.effc`
- `elec_explosion_1m_delay.effc`
- `elec_explosion_1m_postfx.effc`
- `elec_explosion_2m_postfx.effc`
- `elec_explosion_3m_postfx.effc`
- `elec_explosion_4m_postfx.effc`
- `elec_fueling_pump_a_postfx.effc`
- `elec_zap_01.effc`
- `elec_zap_02.effc`
- `oil_rig_electric_explo_01.effc`
- `oil_rig_electric_sparks_01.effc`

### effects/destruction/fire/ (Dare Devils of Destruction) {#effectsdestructionfire-dare-devils-of-destruction}

- `fire_persistent_small.effc`

### effects/destruction/fuel/ (Danger Rising) {#effectsdestructionfuel-danger-rising}

- `explosion_fuel_l_postfx.effc`
- `explosion_fuel_medium_01.effc`
- `explosion_fuel_medium_postfx.effc`
- `explosion_fuel_small_postfx.effc`
- `explosion_fuel_xl_postfx.effc`

### effects/destruction/propane/ {#effectsdestructionpropane}

- `explosion_propane_l_postfx.effc`
- `explosion_propane_m_01.effc`
- `explosion_propane_m_postfx.effc`
- `explosion_propane_s_01.effc`
- `explosion_propane_s_postfx.effc`
- `explosion_propane_xl_postfx.effc`

### effects/destruction/props/ {#effectsdestructionprops}

- `balloon_burst_1m_yellow.effc`
- `explosion_barrel_01.effc`
- `explosion_barrel_02_postfx.effc`

### effects/destruction/smoke/ {#effectsdestructionsmoke}

- `smoke_aftermath_large.effc`

### effects/electrical/ (Danger Rising) {#effectselectrical-danger-rising}

- `electric_arcs_dish_large.effc`
- `electric_arcs_dish_noloop_medium_10sec.effc`
- `electric_arcs_radar_boxvolume_med.effc`
- `electric_arcs_radar_large_01_mid.effc`
- `electric_sparking_01_loop_2m.effc`

### effects/fire/ {#effectsfire}

- `distillation_tower_spray.effc`
- `ember_ash_10m.effc`
- `fire_barrel.effc`
- `fire_barrel_small.effc`
- `generic_candle_01.effc`
- `generic_fire_01.effc`
- `generic_fire_02.effc`
- `generic_fire_04.effc`
- `generic_fire_hemispherical_1m.effc`
- `generic_fire_sm_01.effc`
- `generic_fire_spherical_1m.effc`
- `generic_fire_spray_med_spurt_01.effc`
- `generic_fire_spray_med_spurt_02.effc`
- `generic_fire_spray_med_spurt_electric.effc`
- `oil_fire_spherical_2m.effc`
- `oil_fire_spherical_3m.effc`

### effects/flare/ {#effectsflare}

- `chaos_object_flare_02.effc`
- `grenade_blink_flare.effc`
- `headlight_flare_01.effc`
- `headlight_flare_round_01.effc`
- `headlight_flare_round_02.effc`
- `headlight_flare_tractor.effc`
- `industrial_green_01.effc`

### effects/ghost_ship/ {#effectsghost_ship}

- `ghost_fire_spherical_large_01.effc`
- `ghost_refraction_large_01.effc`
- `ghost_smoke_vertical_large_01.effc`

### effects/jc_characters/ {#effectsjc_characters}

- `decal_blood_splatter.effc`
- `post_death_burst.effc`
- `rico_ar_view.effc`
- `rico_ar_view_reverse.effc`
- `rico_near_death_loop.effc`
- `rico_near_death_view.effc`
- `skeleton_fire.effc`
- `skeleton_smoke.effc`

### effects/jc_characters/gore/ (Danger Rising) {#effectsjc_charactersgore-danger-rising}

- `character_death.effc`
- `character_death_blood.effc`

### effects/jc_characters/traversal/ (Danger Rising) {#effectsjc_characterstraversal-danger-rising}

- `npc_water_splash.effc`
- `rico_faceplant_concrete.effc`
- `rico_foot_step_asphalt.effc`
- `rico_foot_step_concrete.effc`
- `rico_foot_step_default.effc`
- `rico_foot_step_dirt.effc`
- `rico_foot_step_glass.effc`
- `rico_foot_step_grass.effc`
- `rico_foot_step_gravel.effc`
- `rico_foot_step_mud.effc`
- `rico_foot_step_sand.effc`
- `rico_foot_step_snow.effc`
- `rico_foot_step_vegetation.effc`
- `rico_foot_step_water.effc`
- `rico_landing_concrete.effc`
- `rico_landing_default.effc`
- `rico_landing_dirt.effc`
- `rico_landing_grass.effc`
- `rico_landing_gravel.effc`
- `rico_landing_sand.effc`
- `rico_landing_snow.effc`
- `rico_landing_vegetation.effc`
- `rico_landing_water.effc`
- `rico_roll_default.effc`
- `rico_roll_dirt.effc`
- `rico_roll_grass.effc`
- `rico_roll_sand.effc`
- `rico_roll_vegetation.effc`
- `rico_water_splash.effc`

### effects/jc_characters/traversal/aoe/ {#effectsjc_characterstraversalaoe}

- `rico_aoe_stunting.effc`
- `rico_aoe_windvolume.effc`

### effects/jc_characters/underwater/ {#effectsjc_charactersunderwater}

- `bubbles_swim.effc`
- `bubbles_swim_skeleton.effc`

### effects/jc_design_tools/ (Danger Rising) {#effectsjc_design_tools-danger-rising}

- `mission_trigger_ring_01_disabled.effc`
- `mission_trigger_ring_01_garland.effc`
- `mission_trigger_ring_01_general.effc`
- `mission_trigger_ring_01_javi.effc`
- `mission_trigger_ring_01_lorena.effc`
- `rebel_drop_cargo_dust.effc`

### effects/jc_environments/ {#effectsjc_environments}

- `bird_shot.effc`
- `scorpion_spawn.effc`

### effects/jc_environments/elements/ (Danger Rising) {#effectsjc_environmentselements-danger-rising}

- `pipe_electrical_spark.effc`

### effects/jc_environments/locations/ {#effectsjc_environmentslocations}

- `mm270_steamvent_01.effc`

### effects/jc_environments/props/ {#effectsjc_environmentsprops}

- `ac_vent_covered_smoke_02_fast.effc`
- `ac_vent_smoke_01_fast.effc`
- `generator_lg_exhaust.effc`

### effects/jc_environments/shared/ {#effectsjc_environmentsshared}

- `com_large_antenna_electrical_exp.effc`
- `com_large_antenna_electrical_exp_postfx.effc`
- `firetrail_com_large_antenna_04.effc`

### effects/jc_environments/structures/industrial/ {#effectsjc_environmentsstructuresindustrial}

- `dest_cardboard_box.effc`

### effects/jc_environments/structures/infrastructure/ (Danger Rising) {#effectsjc_environmentsstructuresinfrastructure-danger-rising}

- `billboard_piece_break_02.effc`
- `power_line_industrial_wire_64m.effc`
- `power_line_wire_b_24m.effc`

### effects/jc_environments/structures/military/ (Dare Devils of Destruction) {#effectsjc_environmentsstructuresmilitary-dare-devils-of-destruction}

- `bavarium_dragline_explosion.effc`
- `bavarium_dump_explosion.effc`
- `bavarium_enrich_explosion_int.effc`
- `checkpoint_boom_break_off.effc`
- `distillation_tower_debris_fire.effc`
- `distillation_tower_shell_damaged.effc`
- `exp_walking_dragline_addon_postfx.effc`
- `fuel_dome_strut_concrete_break.effc`
- `gas_station_final_explosion.effc`
- `tank_horiz_explosion.effc`
- `water_barrel_failure.effc`
- `water_tower_water_explosion.effc`
- `water_tower_water_explosion_small.effc`

### effects/jc_environments/structures/modern/ {#effectsjc_environmentsstructuresmodern}

- `chair_plastic_destruction_nosmoke.effc`
- `chair_wooden_destruction.effc`
- `table_plastic_destruction.effc`

### effects/jc_environments/vegetation/ {#effectsjc_environmentsvegetation}

- `ambient_red_flowers_01.effc`
- `dest_fence_chainlink_4m.effc`
- `dest_potted_plant_01.effc`
- `dest_stone_01.effc`
- `falling_leafs_decorative_tree.effc`
- `falling_leafs_lg.effc`
- `falling_leafs_med.effc`
- `falling_leafs_oak_tree.effc`
- `falling_leafs_orange_tree.effc`
- `grape_vine_dest_01.effc`
- `hay_bale_dest_01.effc`

### effects/jc_vehicles/ {#effectsjc_vehicles}

- `drone_rocket_impact.effc`
- `exp_corvette_water.effc`
- `v102_tesla_charged.effc`

### effects/jc_vehicles/collision/ (Danger Rising) {#effectsjc_vehiclescollision-danger-rising}

- `break_electric_sm_loop.effc`
- `cargo_chassis_impact_default.effc`
- `cargo_chassis_impact_dirt.effc`
- `cargo_chassis_impact_sand.effc`
- `cargo_chassis_impact_snow.effc`
- `cargo_chassis_impact_water.effc`
- `cargo_chassis_slide_dirt.effc`
- `cargo_chassis_slide_sand.effc`
- `cargo_chassis_slide_snow.effc`
- `monorail_impact_grass.effc`
- `monorail_impact_snow.effc`
- `monorail_slide_default.effc`
- `monorail_slide_dirt.effc`
- `monorail_slide_grass.effc`
- `monorail_slide_sand.effc`
- `monorail_slide_sm_default.effc`
- `monorail_slide_snow.effc`

### effects/jc_vehicles/damage/ {#effectsjc_vehiclesdamage}

- `dmg_break_cargo_engine.effc`
- `dmg_break_cargo_flap.effc`
- `dmg_break_cargo_wing_base.effc`
- `dmg_break_jet_aileron.effc`
- `dmg_break_jet_wing.effc`
- `dmg_engine_ground_flames_minetruck.effc`
- `dmg_fire_apc_hatch.effc`
- `dmg_fire_boat_noloop.effc`
- `dmg_fire_cargo_engine.effc`
- `dmg_fire_cargo_engine_trail.effc`
- `dmg_fire_cargo_wing_base.effc`
- `dmg_fire_engine.effc`
- `dmg_fire_engine_bike.effc`
- `dmg_fire_engine_helicopter.effc`
- `dmg_fire_engine_helicopter_heavy.effc`
- `dmg_fire_engine_helicopter_sm.effc`
- `dmg_fire_engine_helicopter_tail.effc`
- `dmg_fire_engine_helicopter_tail_heavy.effc`
- `dmg_fire_engine_helicopter_top_heavy.effc`
- `dmg_fire_engine_helicopter_trail_heavy.effc`
- `dmg_fire_engine_jet.effc`
- `dmg_fire_engine_minetruck.effc`
- `dmg_fire_engine_monorail.effc`
- `dmg_fire_engine_plane.effc`
- `dmg_fire_engine_plane_bottom.effc`
- `dmg_fire_engine_plane_top.effc`
- `dmg_fire_minetruck_side.effc`
- `dmg_fire_spread_armoredtruck_roof.effc`
- `dmg_fire_spread_base.effc`
- `dmg_fire_spread_base_medtank.effc`
- `dmg_fire_spread_boat_01.effc`
- `dmg_fire_spread_boat_02.effc`
- `dmg_fire_spread_boat_04.effc`
- `dmg_fire_spread_bus_01.effc`
- `dmg_fire_spread_bus_roof_01.effc`
- `dmg_fire_spread_mini_roof.effc`
- `dmg_fire_spread_minivan_roof.effc`
- `dmg_helicopter_rotorburst_01.effc`
- `dmg_helicopter_rotorburst_eubus_util_01.effc`
- `dmg_helicopter_rotorburst_heavy_01.effc`
- `dmg_helicopter_rotorburst_heavy_rear_01.effc`
- `dmg_helicopter_rotorburst_heavy_rebel_01.effc`
- `dmg_helicopter_rotorburst_heavy_rebel_rear_01.effc`
- `dmg_helicopter_rotorburst_lt_assault_01.effc`
- `dmg_helicopter_rotorburst_lt_assault_rebel_01.effc`
- `dmg_helicopter_rotorburst_rebel_01.effc`
- `dmg_helicopter_rotorburst_seascout_01.effc`
- `dmg_helicopter_tail_break.effc`
- `dmg_helicopter_tail_break_heavy.effc`
- `dmg_helicopter_tail_break_heavy_smoke.effc`
- `dmg_helicopter_tail_break_smoke.effc`
- `dmg_helicopter_tailpop_01.effc`
- `dmg_helicopter_tailpop_heavy_01.effc`
- `dmg_helicopter_window_01.effc`
- `dmg_helicopter_windshield_01.effc`
- `dmg_jet_glassburst.effc`
- `dmg_smoke_engine_boat_01.effc`
- `dmg_smoke_engine_heavy_helicopter.effc`
- `dmg_smoke_engine_helicopter_civ.effc`
- `dmg_smoke_engine_jet.effc`
- `dmg_smoke_engine_light_helicopter.effc`
- `dmg_smoke_engine_minetruck.effc`
- `dmg_smoke_engine_monorail.effc`
- `dmg_smoke_engine_tractor.effc`
- `dmg_smoke_engine_truck_van.effc`
- `dmg_window_break_bus_01.effc`
- `dmg_window_break_bus_tall_01.effc`
- `dmg_window_break_bus_tall_02.effc`
- `dmg_window_break_bus_wide_01.effc`
- `dmg_window_break_bus_windshield_01.effc`
- `dmg_window_break_oldtruck_windshield_01.effc`
- `dmg_window_tint_break.effc`
- `dmg_window_tint_break_windshield.effc`
- `exp_bike_01.effc`
- `exp_boat_02.effc`
- `exp_car_01_postfx.effc`
- `exp_helicopter_assault.effc`
- `exp_helicopter_assault_heavy.effc`
- `exp_helicopter_assault_heavy_ground.effc`
- `exp_helicopter_assault_postfx.effc`
- `exp_monorail_engine.effc`
- `exp_plane_01.effc`
- `exp_plane_cargo_air_01.effc`
- `exp_plane_cargo_interior_01.effc`
- `exp_tractor_01.effc`

### effects/jc_vehicles/exhaust/ {#effectsjc_vehiclesexhaust}

- `armored_transport_base.effc`
- `bomb_trail.effc`
- `car_cycle_base.effc`
- `car_cycle_base_dual.effc`
- `car_cycle_base_dual_tjump.effc`
- `helicopter_base.effc`
- `helicopter_base_nitrous.effc`
- `jet_cargo_exhaust_base.effc`
- `jet_exhaust_base.effc`
- `jet_exhaust_mild.effc`
- `large_dirty_exhaust_base.effc`
- `mech_loader_base_nitrous5.effc`
- `minetruck_cycle_base.effc`
- `minetruck_cycle_base_nitrous.effc`
- `minetruck_cycle_base_tjump.effc`
- `planetoybomber_exhaust_base_micro_02.effc`

### effects/jc_vehicles/jc_weapons/muzzle_flash/ (Toy Vehicle Pack) {#effectsjc_vehiclesjc_weaponsmuzzle_flash-toy-vehicle-pack}

- `toybomber_minigun_muzzleflash.effc`

### effects/jc_vehicles/traversal_air/ {#effectsjc_vehiclestraversal_air}

- `cargo_wash_asphalt.effc`
- `cargo_wash_dirt.effc`
- `cargo_wash_grass.effc`
- `cargo_wash_sand.effc`
- `cargo_wash_snow.effc`
- `cargo_wash_water.effc`
- `jet_wash_asphalt.effc`
- `jet_wash_default.effc`
- `jet_wash_dirt.effc`
- `jet_wash_grass.effc`
- `jet_wash_sand.effc`
- `jet_wash_snow.effc`
- `jet_wash_water.effc`
- `rotor_wash_asphalt.effc`
- `rotor_wash_default.effc`
- `rotor_wash_dirt.effc`
- `rotor_wash_grass.effc`
- `rotor_wash_gravel.effc`
- `rotor_wash_medium.effc`
- `rotor_wash_sand.effc`
- `rotor_wash_small_default.effc`
- `rotor_wash_snow.effc`
- `rotor_wash_water.effc`

### effects/jc_vehicles/traversal_water/ (Dare Devils of Destruction) {#effectsjc_vehiclestraversal_water-dare-devils-of-destruction}

- `apc_exhaust.effc`
- `apc_splash.effc`
- `boat_engine_rear.effc`
- `boat_splash_fishing.effc`
- `boat_splash_nitrous.effc`
- `boat_splash_racing.effc`
- `boat_splash_turbojump.effc`
- `front_dive_splash.effc`
- `jetski_splash_default.effc`
- `jetski_splash_nitrous.effc`
- `jetski_splash_turbojump.effc`

### effects/jc_vehicles/wheels/ {#effectsjc_vehicleswheels}

- `bike_rear_asphalt.effc`
- `bike_rear_grass.effc`
- `bike_rear_water.effc`
- `minetruck_front_asphalt.effc`
- `minetruck_front_dirt.effc`
- `minetruck_front_grass.effc`
- `minetruck_front_sand.effc`
- `minetruck_front_snow.effc`
- `minetruck_front_water.effc`
- `minetruck_rear_asphalt.effc`
- `minetruck_rear_dirt.effc`
- `minetruck_rear_grass.effc`
- `minetruck_rear_sand.effc`
- `minetruck_rear_snow.effc`
- `minetruck_rear_water.effc`
- `monster_rear_asphalt.effc`
- `monster_rear_dirt.effc`
- `monster_rear_grass.effc`
- `monster_rear_sand.effc`
- `monster_rear_snow.effc`
- `monster_rear_water.effc`
- `rear_asphalt.effc`
- `rear_asphalt_lg.effc`
- `rear_dirt_lg.effc`
- `rear_dirt_lg_linger.effc`
- `rear_grass_lg.effc`
- `rear_gravel_lg.effc`
- `rear_sand_lg.effc`
- `rear_sand_lg_linger.effc`
- `rear_sand_tractor.effc`
- `rear_snow_lg.effc`
- `rear_snow_tractor.effc`
- `rear_water_lg.effc`
- `rear_water_tractor.effc`
- `wheel_explosion_01.effc`

### effects/jc_vehicles/wheels/trail/ (Danger Rising) {#effectsjc_vehicleswheelstrail-danger-rising}

- `dust_trail_asphalt.effc`

### effects/jc_weapons/ (Danger Rising) {#effectsjc_weapons-danger-rising}

- `impact_electronic_02.effc`
- `impact_electronic_generic.effc`
- `tank_bodyshock.effc`
- `tank_groundshock_linger.effc`
- `tank_groundshock_linger_small.effc`
- `treadedtoytank_bodyshock.effc`
- `treadedtoytank_groundshock.effc`

### effects/jc_weapons/50_cal/ {#effectsjc_weapons50_cal}

- `bullet_eject_50cal.effc`
- `bullet_eject_capstone.effc`

### effects/jc_weapons/50_cal/impacts/ (Danger Rising) {#effectsjc_weapons50_calimpacts-danger-rising}

- `impact_blood_50cal.effc`
- `impact_character_50cal.effc`
- `impact_concrete_50cal.effc`
- `impact_dirt_50cal.effc`
- `impact_fabric_50cal.effc`
- `impact_glass_50cal.effc`
- `impact_grass_50cal.effc`
- `impact_gravel_50cal.effc`
- `impact_headshot_50cal.effc`
- `impact_metal_50cal.effc`
- `impact_plastic_50cal.effc`
- `impact_sand_50cal.effc`
- `impact_snow_50cal.effc`
- `impact_water_50cal.effc`
- `impact_wood_50cal.effc`

### effects/jc_weapons/aa_gun/ (Danger Rising) {#effectsjc_weaponsaa_gun-danger-rising}

- `aa_gun_concrete.effc`
- `aa_gun_dirt.effc`
- `aa_gun_grass.effc`
- `aa_gun_metal.effc`
- `aa_gun_sand.effc`
- `aa_gun_snow.effc`
- `aa_gun_water.effc`

### effects/jc_weapons/bomber/ (Danger Rising) {#effectsjc_weaponsbomber-danger-rising}

- `bomber_explosion_water.effc`

### effects/jc_weapons/dragon_gun/ (The Dragon) {#effectsjc_weaponsdragon_gun-the-dragon}

- `firework_explosion_air.effc`
- `firework_explosion_begin2.effc`
- `firework_explosion_end2.effc`
- `firework_explosion_end3.effc`
- `firework_explosion_water.effc`

### effects/jc_weapons/exp_bullets/ {#effectsjc_weaponsexp_bullets}

- `impact_concrete_exp_bullet.effc`
- `impact_fabric_exp_bullet.effc`
- `impact_metal_exp_bullet.effc`

### effects/jc_weapons/grapple/ (Danger Rising) {#effectsjc_weaponsgrapple-danger-rising}

- `grapple_fire.effc`
- `grapple_hammer_impact.effc`
- `impact_blood_grapple.effc`
- `impact_concrete_grapple.effc`
- `impact_dirt_grapple.effc`
- `impact_glass_grapple.effc`
- `impact_grapple_immune_metal.effc`
- `impact_grass_grapple.effc`
- `impact_metal_grapple.effc`
- `impact_sand_grapple.effc`
- `impact_snow_grapple.effc`
- `impact_vegetation_grapple.effc`
- `impact_water_grapple.effc`
- `impact_wood_grapple.effc`
- `tether_break.effc`

### effects/jc_weapons/hand_grenade/ (Danger Rising) {#effectsjc_weaponshand_grenade-danger-rising}

- `explosion_hand_grenade_default.effc`
- `hg_explosion_air.effc`
- `hg_explosion_concrete.effc`
- `hg_explosion_default.effc`
- `hg_explosion_dirt.effc`
- `hg_explosion_grass.effc`
- `hg_explosion_metal.effc`
- `hg_explosion_sand.effc`
- `hg_explosion_snow.effc`
- `hg_explosion_water.effc`

### effects/jc_weapons/heli_minigun/ (Danger Rising) {#effectsjc_weaponsheli_minigun-danger-rising}

- `impact_blood_heli_minigun.effc`
- `impact_character_heli_minigun.effc`
- `impact_concrete_heli_minigun.effc`
- `impact_dirt_heli_minigun.effc`
- `impact_grass_heli_minigun.effc`
- `impact_headshot_heli_minigun.effc`
- `impact_metal_heli_minigun.effc`
- `impact_sand_heli_minigun.effc`
- `impact_wood_heli_minigun.effc`

### effects/jc_weapons/lightning_gun/ {#effectsjc_weaponslightning_gun}

- `lightning_gun_endpoint.effc`
- `lightning_gun_impact.effc`
- `lightning_gun_muzzle.effc`

### effects/jc_weapons/mech_loader/ (Brawler Mech) {#effectsjc_weaponsmech_loader-brawler-mech}

- `mech_attract.effc`
- `mech_gravity_attract.effc`
- `mech_gravity_hold.effc`
- `mech_gravity_pickupobjects.effc`
- `mech_gravity_release.effc`
- `mech_gravity_throw.effc`
- `mech_punch_02_impact.effc`
- `mech_punch_03_muzzleflash.effc`
- `mech_punch_charge.effc`
- `mech_punch_impact.effc`

### effects/jc_weapons/minigun/ {#effectsjc_weaponsminigun}

- `bullet_eject_minigun.effc`

### effects/jc_weapons/minigun/impacts/ (Danger Rising) {#effectsjc_weaponsminigunimpacts-danger-rising}

- `impact_blood_minigun.effc`
- `impact_concrete_minigun.effc`
- `impact_dirt_minigun.effc`
- `impact_fabric_minigun.effc`
- `impact_glass_minigun.effc`
- `impact_grass_minigun.effc`
- `impact_gravel_minigun.effc`
- `impact_metal_car_minigun.effc`
- `impact_metal_minigun.effc`
- `impact_plastic_minigun.effc`
- `impact_sand_minigun.effc`
- `impact_sheet_metal_minigun.effc`
- `impact_snow_minigun.effc`
- `impact_vegetation_minigun.effc`
- `impact_water_minigun.effc`
- `impact_wood_minigun.effc`

### effects/jc_weapons/missile/ (Danger Rising) {#effectsjc_weaponsmissile-danger-rising}

- `missile_explosion_water.effc`
- `missile_launch_helicopter.effc`
- `silo_smoke_column_idle.effc`

### effects/jc_weapons/muzzle_flash/ (Danger Rising) {#effectsjc_weaponsmuzzle_flash-danger-rising}

- `aa_gun_muzzleflash.effc`
- `ai_minigun_muzzleflash.effc`
- `helicopter_minigun_muzzleflash.effc`
- `rico_50cal_muzzleflash.effc`
- `rico_grenade_launcher_muzzleflash.effc`
- `rico_grenade_upu_muzzleflash.effc`
- `rico_m176_stupka_muzzleflash.effc`
- `rico_minigun_muzzleflash.effc`
- `rico_pistol_muzzleflash.effc`
- `rico_revolver_mflash.effc`
- `rico_rifle_muzzleflash.effc`
- `rico_rifle_muzzleflash_single.effc`
- `rico_rpg142_muzzleflash.effc`
- `rico_rpg_muzzleflash.effc`
- `rico_shotgun_muzzleflash.effc`
- `rico_smg_muzzleflash.effc`
- `rico_sniper_muzzleflash.effc`
- `rocketdrone_muzzle.effc`
- `sharkcar_rifle_muzzleflash.effc`
- `sportsmuscle_missile_muzzleflash.effc`
- `tank_canon_muzzleflash.effc`
- `treaded_toy_tank_canon_muzzleflash.effc`
- `turret_missile_muzzleflash.effc`
- `wpn_050_warmup.effc`

### effects/jc_weapons/pistol/ (Danger Rising) {#effectsjc_weaponspistol-danger-rising}

- `bullet_eject_smg.effc`
- `impact_character_pistol.effc`
- `impact_concrete_pistol.effc`
- `impact_default_pistol.effc`
- `impact_dirt_pistol.effc`
- `impact_glass_pistol.effc`
- `impact_grass_pistol.effc`
- `impact_gravel_pistol.effc`
- `impact_metal_car_pistol.effc`
- `impact_metal_pistol.effc`
- `impact_plastic_pistol.effc`
- `impact_sand_pistol.effc`
- `impact_snow_pistol.effc`
- `impact_vegetation_pistol.effc`
- `impact_water_pistol.effc`
- `impact_wood_pistol.effc`

### effects/jc_weapons/planted_explosive/ {#effectsjc_weaponsplanted_explosive}

- `c4_upgrade_jet_lvl2.effc`
- `plant_explosion_air.effc`
- `plant_explosion_concrete.effc`
- `plant_explosion_dirt.effc`
- `plant_explosion_grass.effc`
- `plant_explosion_metal.effc`
- `plant_explosion_sand.effc`
- `plant_explosion_snow.effc`
- `plant_explosion_water.effc`

### effects/jc_weapons/rifle/ (Danger Rising) {#effectsjc_weaponsrifle-danger-rising}

- `bullet_eject_556.effc`
- `impact_blood_rifle.effc`
- `impact_character_rifle.effc`
- `impact_concrete_fracture_rifle.effc`
- `impact_concrete_rifle.effc`
- `impact_dirt_rifle.effc`
- `impact_fabric_rifle.effc`
- `impact_glass_rifle.effc`
- `impact_grass_rifle.effc`
- `impact_gravel_rifle.effc`
- `impact_headshot_rifle.effc`
- `impact_immune_metal.effc`
- `impact_metal_car_rifle.effc`
- `impact_metal_gas_rifle.effc`
- `impact_metal_rifle.effc`
- `impact_plastic_rifle.effc`
- `impact_sand_rifle.effc`
- `impact_snow_rifle.effc`
- `impact_vegetation_rifle.effc`
- `impact_water_rifle.effc`
- `impact_wood_rifle.effc`

### effects/jc_weapons/rpg_launcher/ {#effectsjc_weaponsrpg_launcher}

- `rpg_leech_separate.effc`
- `rpg_trail_airbrake.effc`
- `rpg_trail_leech.effc`

### effects/jc_weapons/shotgun/impacts/ {#effectsjc_weaponsshotgunimpacts}

- `impact_blood_shotgun.effc`
- `impact_concussion_shotgun.effc`
- `impact_metal_shotgun.effc`
- `shell_eject_12ga.effc`

### effects/jc_weapons/shrapnel/ {#effectsjc_weaponsshrapnel}

- `impact_blood_shrapnel.effc`
- `impact_character_shrapnel.effc`
- `impact_concrete_shrapnel.effc`
- `impact_dirt_shrapnel.effc`
- `impact_glass_shrapnel.effc`
- `impact_grass_shrapnel.effc`
- `impact_gravel_shrapnel.effc`
- `impact_headshot_shrapnel.effc`
- `impact_metal_car_shrapnel.effc`
- `impact_metal_shrapnel.effc`
- `impact_sand_shrapnel.effc`
- `impact_snow_shrapnel.effc`
- `impact_vegetation_shrapnel.effc`
- `impact_wood_shrapnel.effc`

### effects/jc_weapons/sniper/ (Danger Rising) {#effectsjc_weaponssniper-danger-rising}

- `laser_flare.effc`

### effects/jc_weapons/sniper/impacts/ (Danger Rising) {#effectsjc_weaponssniperimpacts-danger-rising}

- `impact_blood_sniper.effc`
- `impact_bullet_immune.effc`
- `impact_bullet_immune_small.effc`
- `impact_concrete_sniper.effc`
- `impact_dirt_sniper.effc`
- `impact_glass_sniper.effc`
- `impact_gravel_sniper.effc`
- `impact_metal_car_sniper.effc`
- `impact_metal_sniper.effc`
- `impact_sand_sniper.effc`
- `impact_snow_sniper.effc`
- `impact_vegetation_sniper.effc`
- `impact_wood_sniper.effc`

### effects/jc_weapons/turret_stationary/ (Danger Rising) {#effectsjc_weaponsturret_stationary-danger-rising}

- `portable_railgun_charged_loop_01.effc`
- `portable_railgun_charged_loop_01_ai.effc`
- `portable_railgun_charged_loop_03.effc`
- `portable_railgun_impact_01.effc`
- `portable_railgun_muzzle_01.effc`
- `portable_railgun_muzzle_titan.effc`
- `turret_grenade_launcher_muzzle.effc`
- `turret_railgun_charge.effc`
- `turret_railgun_impact.effc`
- `turret_railgun_impact_bigger_titan.effc`
- `turret_railgun_muzzle.effc`
- `turret_repulsor_charge.effc`
- `turret_repulsor_discharge.effc`

### effects/npcs/ {#effectsnpcs}

- `npc_context_arc_welding.effc`
- `npc_context_camera_flash.effc`
- `npc_context_dust_rake.effc`
- `npc_context_dust_sweep.effc`
- `npc_context_light_cigarette.effc`
- `npc_context_pickaxe.effc`
- `npc_context_scrub_clothes.effc`
- `npc_context_scrub_fish.effc`
- `npc_context_smoke_cigarette.effc`
- `npc_context_spear_fishing.effc`
- `npc_context_water_frolic_loop.effc`
- `npc_context_water_frolic_splash.effc`

### effects/old/ {#effectsold}

- `fire_gen_medium_outside.effc`

### effects/physics/bridge_concrete/ (Los Demonios) {#effectsphysicsbridge_concrete-los-demonios}

- `slide_bridge_big_default.effc`
- `slide_bridge_big_dirt.effc`
- `slide_bridge_default.effc`

### effects/physics/concrete/ {#effectsphysicsconcrete}

- `fracture_statue_big_01.effc`

### effects/physics/wood/ (Danger Rising) {#effectsphysicswood-danger-rising}

- `break_wood_01.effc`

### effects/powerup/ {#effectspowerup}

- `confetti_pop.effc`
- `lantern_fire.effc`

### effects/props/ {#effectsprops}

- `balloon_exhale_loop.effc`
- `balloon_inhale_loop.effc`
- `drone_activate_pop.effc`
- `emp_trail_spark.effc`
- `gate_lock_burst.effc`
- `gate_lock_pistonscrape.effc`
- `grill_embers.effc`
- `hydrant_burst_01.effc`
- `retooler_explosion_01.effc`
- `weapon_locker_open.effc`

### effects/smoke/ {#effectssmoke}

- `exhaust_smoke_l.effc`
- `puff_of_smoke.effc`
- `smoke_ash_fall.effc`
- `smoke_chimney_dark_sm_01.effc`
- `smoke_dark_lg_01.effc`
- `smoke_dark_med_01.effc`
- `smoke_dark_sm_whispy_01.effc`
- `smoke_dark_whispy_lg_01.effc`
- `smoke_electrical.effc`
- `smoke_generic_01.effc`
- `smoke_generic_02.effc`
- `smoke_groundfog_10.effc`
- `smoke_groundfog_64.effc`
- `smoke_light_lg_01.effc`
- `smoke_light_lg_whispy_01.effc`
- `smoke_light_med_whispy_01.effc`
- `smoke_light_sm_whispy_01.effc`
- `smoke_light_whispy_sm_01.effc`
- `smoke_small_1m_wide_burst.effc`
- `timetravel_smoke.effc`

### effects/test/ (Los Demonios) {#effectstest-los-demonios}

- `chemical_explosion.effc`

### effects/trails/ {#effectstrails}

- `aa_gun_smoke.effc`
- `bavarium_trail_01.effc`
- `bavarium_trail_03.effc`
- `bavarium_trail_04.effc`
- `confetti_fireworks_trail_01.effc`
- `debris_trail_01.effc`
- `dirt_trail_02.effc`
- `drone_trail_01.effc`
- `explosion_trail_02.effc`
- `explosion_trail_03.effc`
- `explosion_trail_03_sm.effc`
- `explosion_trail_03_xsm.effc`
- `firework_burn_trail.effc`
- `firework_burn_trail_sm.effc`
- `firework_trail_01.effc`
- `packing_peanut_trail_01.effc`
- `sand_trail_01.effc`
- `smoke_trail_light_sm_01.effc`
- `snow_trail.effc`
- `spark_electric_trail_01.effc`
- `spark_electric_trail_01_blue.effc`
- `spark_electric_trail_01_orange.effc`
- `spark_electric_trail_01_orange_02.effc`
- `spark_electric_trail_01_orange_lg.effc`
- `spark_electric_trail_01_orange_sm.effc`
- `spark_electric_trail_01_sm.effc`
- `spark_electric_trail_01b.effc`
- `spark_electric_trail_01b_large.effc`
- `spark_electric_trail_01b_loop.effc`
- `spark_electric_trail_02.effc`
- `spark_electric_trail_03.effc`
- `spark_electric_trail_03b_loop.effc`
- `spark_electric_trail_04.effc`
- `spark_electric_trail_06.effc`
- `spark_electric_trail_07.effc`
- `spark_electric_trail_08.effc`
- `spark_electric_trail_08b.effc`
- `spark_shower_01.effc`
- `spark_smoke_trail_01.effc`
- `spark_trail_02_med.effc`
- `spark_trail_03.effc`
- `trail_bright_fingersmoke.effc`
- `water_trail_02.effc`

### effects/water/ {#effectswater}

- `fountain_stream_medium_01.effc`
- `fountain_stream_medium_splash_01.effc`
- `fountain_stream_medium_surface_splash_01.effc`
- `fountain_stream_medium_surface_splash_02.effc`
- `rain_splash.effc`
- `splash_out_01.effc`
- `waterfall_base_mist_01.effc`
- `waterfall_base_mist_long_01.effc`
- `waterfall_splash_02.effc`
- `waterfall_splashes_top.effc`
- `waterfall_stream_350m_01.effc`

### effects/weather_extreme/ {#effectsweather_extreme}

- `lightning_streamer_core.effc`
- `lightningbolt_impact_25m.effc`
- `weather_persistent_rain_ambient_droplets.effc`
- `weather_persistent_rain_droplets.effc`
- `weather_persistent_snow_droplets.effc`
- `weather_persistent_snow_droplets_refractive.effc`

### effects/wind/ {#effectswind}

- `wind_cannon_down_25.effc`
- `wind_vis_natural_11.effc`
- `wind_vis_test_tube_50_thin.effc`

### effects/world_at_war/ {#effectsworld_at_war}

- `waw_bullet.effc`
- `waw_gunfire_lights_100m_radius.effc`
- `waw_gunfire_spoof_individual.effc`