---
sidebar_position: 93
---

# Animations

Animation file paths for `PlayAnimation`. The game plays a custom animation on the character's main body layer and reads it as an animation made for the civilian ("world_sim") skeleton, so the civilian animations below are the ones that play correctly: dances, music, sitting, working, idles and more.

**Available on:** Server, Client

## Usage {#usage}

### player\:PlayAnimation(animation, loop?) {#playerplayanimationanimation-loop}

Server. Plays `animation` on a [PlayerObjectHandle](../shared/objects/player.md), looping it when `loop` is `true` (default `false`). The animation is synced to every player and kept for players who join later. `player:StopAnimation()` stops it.

### Local.PlayAnimation(animation, loop?) {#localplayanimationanimation-loop}

Client. Asks the server to play `animation` on the local player, the same as `player:PlayAnimation`; `Local.StopAnimation()` stops it (see [Local](../client/local.md)).

- `animation` is the full path of a `.ban` file, lowercase, exactly as listed.
- File names ending in `_loop` are the game's looping animations; the others are one-shot animations, which `loop = true` restarts each time they end.
- A path the game doesn't have, or that fails to load, is skipped (the client logs an error).

**Example**

```lua
-- client: /dance plays a looping dance, /stop stops it
Cmd.Add("dance", function()
	Local.PlayAnimation("animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_rave_groove_loop.ban", true)
end)

Cmd.Add("stop", function()
	Local.StopAnimation()
end)
```

## Values {#values}

The named animations are the 428 animations of the default `animation-menu` resource, which plays all of them looped.

### Dancing {#dancing}

| Name | Animation |
|---|---|
| Airplane | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_trippy_airplane_loop.ban` |
| Clapping | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_gentle_clapping_loop.ban` |
| Clapping (2) | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_rave_clapping_loop.ban` |
| DJ Santosi | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_mhc_djsantosi_loop.ban` |
| Glowsticks | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_rave_glowsticks_loop.ban` |
| Green Man | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_mhc_greenman_loop.ban` |
| Groove | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_rave_groove_loop.ban` |
| Hands Up | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_trippy_handsup_loop.ban` |
| Idle | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_gentle_loop.ban` |
| Jump | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_rave_jump_loop.ban` |
| On Spot | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_rave_onspot_loop.ban` |
| Praise The Sun | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_trippy_praisethesun_loop.ban` |
| Reach For The Stars | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_trippy_reachforthestars_loop.ban` |
| Shimmy | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_rave_shimmy_loop.ban` |
| Side To Side | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_rave_sidetoside_loop.ban` |
| Snapping Fingers | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_gentle_snappingfinger_loop.ban` |
| Spinning | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_trippy_spinning_loop.ban` |
| Stepping Side To Side | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_rave_steppingsidetoside_loop.ban` |
| Street Dance | `animations/characters/contextact/civilian/systemic/dancing/ca_civ_systemic_dance_loop.ban` |
| Stumbling | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_trippy_stumbling_loop.ban` |
| Wave Arms | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_rave_wavearms_loop.ban` |
| Weaving Arms | `animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_rave_weavingarms_loop.ban` |

### Music {#music}

| Name | Animation |
|---|---|
| Busker Duet Guitar | `animations/characters/contextact/civilian/staged/buskers/duet/ca_civ_staged_buskers_duet_guitar.ban` |
| Busker Duet Quena | `animations/characters/contextact/civilian/staged/buskers/duet/ca_civ_staged_buskers_duet_quena.ban` |
| Listen To Music Sitting Arms Crossed | `animations/characters/contextact/civilian/staged/listentomusic/ca_civ_staged_listentomusic_sitting_armscrossed_loop.ban` |
| Listen To Music Sitting Lean Forward | `animations/characters/contextact/civilian/staged/listentomusic/ca_civ_staged_listentomusic_sitting_leanforward_loop.ban` |
| Listen To Music Standing Arms Crossed | `animations/characters/contextact/civilian/staged/listentomusic/ca_civ_staged_listentomusic_standing_armscrossed_loop.ban` |
| Listen To Music Standing Hands Behind Back | `animations/characters/contextact/civilian/staged/listentomusic/ca_civ_staged_listentomusic_standing_handsbehindback_loop.ban` |
| Peruvian Busker Cuatro | `animations/characters/contextact/civilian/staged/buskers/peruvian/ca_civ_staged_buskers_peruvian_cuatro.ban` |
| Peruvian Busker Pandeiro | `animations/characters/contextact/civilian/staged/buskers/peruvian/ca_civ_staged_buskers_peruvian_pandeiro.ban` |
| Peruvian Busker Panflute | `animations/characters/contextact/civilian/staged/buskers/peruvian/ca_civ_staged_buskers_peruvian_panflute.ban` |
| Peruvian Busker Quena | `animations/characters/contextact/civilian/staged/buskers/peruvian/ca_civ_staged_buskers_peruvian_quena.ban` |
| Samba Busker Cuatro | `animations/characters/contextact/civilian/staged/buskers/samba/ca_civ_staged_buskers_samba_cuatro.ban` |
| Samba Busker Guitar | `animations/characters/contextact/civilian/staged/buskers/samba/ca_civ_staged_buskers_samba_guitar.ban` |
| Samba Busker Pandeiro | `animations/characters/contextact/civilian/staged/buskers/samba/ca_civ_staged_buskers_samba_pandeiro.ban` |
| Solo Busker Drummer | `animations/characters/contextact/civilian/staged/buskers/solo/ca_civ_staged_buskers_solo_drummer.ban` |
| Solo Busker Panflute | `animations/characters/contextact/civilian/staged/buskers/solo/ca_civ_staged_buskers_solo_panflute.ban` |

### Sports {#sports}

| Name | Animation |
|---|---|
| Burpees | `animations/characters/contextact/civilian/staged/workout/ca_civ_staged_workout_burpees_loop.ban` |
| Golf | `animations/characters/contextact/civilian/staged/golfing/ca_civ_staged_golfing_loop.ban` |
| Golf Hit Ball | `animations/characters/contextact/civilian/staged/golfing/ca_civ_staged_golfing_oneoff_hitball.ban` |
| Jumping Jacks | `animations/characters/contextact/civilian/staged/workout/ca_civ_staged_workout_jumpingjack_loop.ban` |
| Push-ups | `animations/characters/contextact/civilian/staged/workout/ca_civ_staged_workout_pushup_loop.ban` |
| Sit-ups | `animations/characters/contextact/civilian/staged/workout/ca_civ_staged_workout_situp_loop.ban` |
| Soccer Tricks | `animations/characters/contextact/civilian/staged/soccertrickonknee/ca_civ_staged_soccertrickonknee_loop.ban` |

### Emotes {#emotes}

| Name | Animation |
|---|---|
| Angry | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_loop.ban` |
| Angry 2 | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_loop_var01.ban` |
| Angry 3 | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_loop_var02.ban` |
| Angry Arms Wave | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_resolve_turning_armswave.ban` |
| Angry Bye Shrug | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_resolve_turning_byeshrug.ban` |
| Angry Ciao | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_resolve_turning_ciao.ban` |
| Angry Come At Me | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_oneoff_comeatme.ban` |
| Angry Cursing | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_oneoff_cursing.ban` |
| Angry Gone Cuckoo | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_oneoff_gonecuckoo.ban` |
| Angry Raise Hand | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_oneoff_raisehand.ban` |
| Angry Suit Yourself | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_resolve_turning_suityourself.ban` |
| Angry Threaten Punch | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_oneoff_threatenpunch.ban` |
| Angry What You Doing | `animations/characters/civilian_dlc/locomotion/idle/civ_male_loco_idle_observe_angry_oneoff_whatyoudoing.ban` |
| Bang On Door | `animations/characters/contextact/civilian/systemic/bangondoorpanic/ca_civ_systemic_bangondoorpanic_loop.ban` |
| Bang On Door Duck | `animations/characters/contextact/civilian/systemic/bangondoorpanic/ca_civ_systemic_bangondoorpanic_oneff_duck.ban` |
| Bang On Door Turn Around | `animations/characters/contextact/civilian/systemic/bangondoorpanic/ca_civ_systemic_bangondoorpanic_oneff_turnaround.ban` |
| Cower Peek Kneel | `animations/characters/contextact/civilian/staged/cower/ca_civ_staged_cower_oneoff_peekkneel.ban` |
| Cower Peek Stand Up Quick | `animations/characters/contextact/civilian/staged/cower/ca_civ_staged_cower_oneoff_peekstandupquick.ban` |
| Cower Peek Stand Up Slow | `animations/characters/contextact/civilian/staged/cower/ca_civ_staged_cower_oneoff_peekstandupslow.ban` |
| Curious | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_observe_curious.ban` |
| Curious (Female) | `animations/characters/civilian/locomotion/idle/civ_female_loco_idle_observe_curious.ban` |
| Curious Disapproval | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_observe_curious_oneoff_disapproval.ban` |
| Curious Finger Snap | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_observe_curious_oneoff_fingersnap.ban` |
| Curious Hands On Chest (Female) | `animations/characters/civilian/locomotion/idle/civ_female_loco_idle_observe_curious_oneoff_handsonchest.ban` |
| Curious Impressed | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_observe_curious_oneoff_impressed.ban` |
| Curious Phone Call (Female) | `animations/characters/civilian/locomotion/idle/civ_female_loco_idle_observe_curious_oneoff_phonecall.ban` |
| Curious Phone Picture | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_observe_curious_oneoff_cellphonepic.ban` |
| Curious Phone Picture (Female) | `animations/characters/civilian/locomotion/idle/civ_female_loco_idle_observe_curious_oneoff_cellphonepic.ban` |
| Idle | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle.ban` |
| Idle (Female) | `animations/characters/civilian/locomotion/idle/civ_female_loco_idle.ban` |
| Inspect Body Bend Forward | `animations/characters/contextact/civilian/dynamic/inspectdeadbody/ca_civ_dynamic_inspectdeadbody_bendforward_loop.ban` |
| Inspect Body Bend Forward Puking | `animations/characters/contextact/civilian/dynamic/inspectdeadbody/ca_civ_dynamic_inspectdeadbody_bendforward_oneoff_puking.ban` |
| Inspect Body Bend Forward Squatting | `animations/characters/contextact/civilian/dynamic/inspectdeadbody/ca_civ_dynamic_inspectdeadbody_bendforward_oneoff_squatting.ban` |
| Knock On Door | `animations/characters/contextact/civilian/staged/bangondoorconcern/ca_civ_staged_bangondoorconcern_loop.ban` |
| Nervous | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_observe_nervous.ban` |
| Nervous (Female) | `animations/characters/civilian/locomotion/idle/civ_female_loco_idle_observe_nervous.ban` |
| Nervous Catch Breath | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_observe_nervous_oneoff_catchbreath.ban` |
| Nervous Gasping | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_observe_nervous_oneoff_gasping.ban` |
| Nervous Hand On Head | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_observe_nervous_oneoff_handonhead.ban` |
| Nervous Hand On Mouth (Female) | `animations/characters/civilian/locomotion/idle/civ_female_loco_idle_observe_nervous_oneoff_handonmouthhead.ban` |
| Nervous Hand Over Mouth | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_observe_nervous_oneoff_handcovermouth.ban` |
| Nervous Hands On Knees (Female) | `animations/characters/civilian/locomotion/idle/civ_female_loco_idle_observe_nervous_oneoff_handsonknee.ban` |
| Nervous Look Back (Female) | `animations/characters/civilian/locomotion/idle/civ_female_loco_idle_observe_nervous_oneoff_lookback.ban` |
| Nervous Look Back Point (Female) | `animations/characters/civilian/locomotion/idle/civ_female_loco_idle_observe_nervous_oneoff_lookbackpoint.ban` |
| Pacing Angry | `animations/characters/contextact/civilian/staged/prisonerpacingonspot/ca_civ_staged_prisonerpacingonspot_angry_loop.ban` |
| Pacing Frustrated | `animations/characters/contextact/civilian/staged/prisonerpacingonspot/ca_civ_staged_prisonerpacingonspot_frustrated_loop.ban` |
| Panic Cower | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_panic_cower.ban` |
| Rain | `animations/characters/civilian/locomotion/idle/civ_male_loco_idle_rain.ban` |
| Rain (Female) | `animations/characters/civilian/locomotion/idle/civ_female_loco_idle_rain.ban` |
| Vagrant Begging | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_begging_loop.ban` |
| Vagrant Begging Batting Flies | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_begging_oneoff_battingflies.ban` |
| Vagrant Begging Check Cup | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_begging_oneoff_checkcup.ban` |
| Vagrant Begging Falling Asleep | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_begging_oneoff_fallingasleep.ban` |
| Vagrant Begging Look Around | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_begging_oneoff_lookaround.ban` |
| Vagrant Rummage Trash Crouched | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_rummagetrash_crouched_loop.ban` |
| Vagrant Rummage Trash Crouched Inspect Keep | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_rummagetrash_crouched_oneoff_inspectkeep.ban` |
| Vagrant Rummage Trash Crouched Inspect Throw Away | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_rummagetrash_crouched_oneoff_inspectthrowaway.ban` |
| Vagrant Rummage Trash Standing | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_rummagetrash_standing_loop.ban` |
| Vagrant Rummage Trash Standing Inspect | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_rummagetrash_standing_oneoff_inspect.ban` |
| Vagrant Rummage Trash Standing Inspect Stand Up | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_rummagetrash_standing_oneoff_inspectstandup.ban` |
| Vagrant Sleep On Bench | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_sleeponbench_loop.ban` |
| Vagrant Sleep On Bench Readjust | `animations/characters/contextact/civilian/staged/vagrant/ca_civ_staged_vagrant_sleeponbench_oneoff_readjust.ban` |

### Standing {#standing}

| Name | Animation |
|---|---|
| Binoculars Brief Talk | `animations/characters/contextact/civilian/staged/usebinoculars/ca_civ_staged_usebinoculars_briefrico_talk_loop.ban` |
| Binoculars Brief Watch | `animations/characters/contextact/civilian/staged/usebinoculars/ca_civ_staged_usebinoculars_briefrico_watch_loop.ban` |
| Bouncer | `animations/characters/contextact/civilian/staged/clubbouncer/ca_civ_staged_clubbouncer_loop.ban` |
| Bouncer Arms Crossed | `animations/characters/contextact/civilian/staged/clubbouncer/ca_civ_staged_clubbouncer_crossarm_loop.ban` |
| Conversation Stand Left Listen | `animations/characters/contextact/civilian/systemic/conversation/civ_male_conversation_stand_lft_listen_generic_loop.ban` |
| Conversation Stand Left Talk | `animations/characters/contextact/civilian/systemic/conversation/civ_male_conversation_stand_lft_talk_generic_loop.ban` |
| Conversation Stand Right Listen | `animations/characters/contextact/civilian/systemic/conversation/civ_male_conversation_stand_rgt_listen_generic_loop.ban` |
| Conversation Stand Right Talk | `animations/characters/contextact/civilian/systemic/conversation/civ_male_conversation_stand_rgt_talk_generic_loop.ban` |
| Direct Plane Proceed | `animations/characters/contextact/civilian/staged/directingplane/ca_civ_staged_directingplane_proceed_loop.ban` |
| Direct Plane Waving | `animations/characters/contextact/civilian/staged/directingplane/ca_civ_staged_directingplane_waving_loop.ban` |
| Drinking | `animations/characters/contextact/civilian/staged/standingaround/ca_civ_staged_standingaround_drinking_loop.ban` |
| Huddle Arms Crossed | `animations/characters/contextact/civilian/systemic/huddleawning/ca_civ_systemic_huddleawning_crossarm_loop.ban` |
| Huddle Arms Crossed (2) | `animations/characters/contextact/civilian/systemic/huddleawning/ca_civ_systemic_huddleawning_crossarm_resolve.ban` |
| Huddle Arms Crossed Female | `animations/characters/contextact/civilian/systemic/huddleawning/ca_civ_systemic_huddleawning_crossarmfemale_loop.ban` |
| Huddle Arms Crossed Female (2) | `animations/characters/contextact/civilian/systemic/huddleawning/ca_civ_systemic_huddleawning_crossarmfemale_resolve.ban` |
| Huddle Arms Crossed Shake Water | `animations/characters/contextact/civilian/systemic/huddleawning/ca_civ_systemic_huddleawning_crossarm_oneoff_rhandshakewater.ban` |
| Huddle Arms Crossed Touch Nose | `animations/characters/contextact/civilian/systemic/huddleawning/ca_civ_systemic_huddleawning_crossarm_oneoff_touchnose.ban` |
| Investigate | `animations/characters/contextact/civilian/staged/investigate/ca_civ_staged_standinvestigate_loop.ban` |
| Investigate Crouch Down | `animations/characters/contextact/civilian/staged/investigate/ca_civ_staged_standinvestigate_oneoff_crouchdown.ban` |
| Investigate Crouched | `animations/characters/contextact/civilian/staged/investigate/ca_civ_staged_crouchinvestigate_loop.ban` |
| Investigate Look Back | `animations/characters/contextact/civilian/staged/investigate/ca_civ_staged_standinvestigate_oneoff_lookback.ban` |
| Phone Call Angry | `animations/characters/contextact/civilian/staged/standingaround/ca_civ_staged_standingaround_talkonphone_angry_loop.ban` |
| Phone Call Angry 2 | `animations/characters/contextact/civilian/staged/standingaround/ca_civ_staged_standingaround_talkonphone_angryvar01_loop.ban` |
| Phone Call Casual | `animations/characters/contextact/civilian/staged/standingaround/ca_civ_staged_standingaround_talkonphone_casual_loop.ban` |
| Phone Call Casual 2 | `animations/characters/contextact/civilian/staged/standingaround/ca_civ_staged_standingaround_talkonphone_casualvar01_loop.ban` |
| Phone Picture | `animations/characters/contextact/civilian/staged/phonepicture/ca_civ_staged_phonepicture_loop.ban` |
| Phone Picture Lean Back | `animations/characters/contextact/civilian/staged/phonepicture/ca_civ_staged_phonepicture_oneoff_takeapictureleanback.ban` |
| Phone Picture Lean Forward | `animations/characters/contextact/civilian/staged/phonepicture/ca_civ_staged_phonepicture_oneoff_takeapictureleanforward.ban` |
| Selfie | `animations/characters/contextact/civilian/staged/takeselfie/ca_civ_staged_takeselfie_loop.ban` |
| Selfie (2) | `animations/characters/contextact/civilian/staged/takeselfie/ca_civ_staged_takeselfie_oneoff.ban` |
| Selfie 2 | `animations/characters/contextact/civilian/staged/takeselfie/ca_civ_staged_takeselfievar01_loop.ban` |
| Selfie 2 (2) | `animations/characters/contextact/civilian/staged/takeselfie/ca_civ_staged_takeselfievar01_oneoff.ban` |
| Smoking | `animations/characters/contextact/civilian/staged/standingaround/ca_civ_staged_standingaround_smoking_loop.ban` |
| Smoking 2 | `animations/characters/contextact/civilian/staged/standingaround/ca_civ_staged_standingaround_smokingvar01_loop.ban` |
| Smoking Check Cigarette | `animations/characters/contextact/civilian/staged/standingaround/ca_civ_staged_standingaround_smoking_oneoff_checkcigarette.ban` |
| Smoking Look Around | `animations/characters/contextact/civilian/staged/standingaround/ca_civ_staged_standingaround_smoking_oneoff_lookaround.ban` |
| Spying | `animations/characters/contextact/civilian/staged/idlespying/ca_civ_staged_idlespying_loop.ban` |
| Spying Lean On Wall | `animations/characters/contextact/civilian/staged/idlespying/ca_civ_staged_idlespying_leanonwall_loop.ban` |
| Spying Look Around | `animations/characters/contextact/civilian/staged/idlespying/ca_civ_staged_idlespying_oneoff_lookaround.ban` |
| Spying Peak | `animations/characters/contextact/civilian/staged/idlespying/ca_civ_staged_idlespying_oneoff_peak.ban` |
| Stroll And Collect | `animations/characters/contextact/civilian/staged/strollandcollect/ca_civ_staged_strollandcollect_loop.ban` |
| Take Picture | `animations/characters/contextact/civilian/staged/takepicture/ca_civ_staged_takepicture_loop.ban` |
| Take Picture (2) | `animations/characters/contextact/civilian/systemic/henryhong/ca_civ_systemic_henryhong_takepicture_loop.ban` |
| Take Picture Look | `animations/characters/contextact/civilian/staged/takepicture/ca_civ_staged_takepicture_oneoff_look.ban` |
| Talk Child Arms | `animations/characters/contextact/civilian/staged/standtalk_normal/arms/civ_male_standtalk_normal_child_arms.ban` |
| Talk Child Hands | `animations/characters/contextact/civilian/staged/standtalk_normal/hands/civ_male_standtalk_normal_child_hands.ban` |
| Talk Child No Arms | `animations/characters/contextact/civilian/staged/standtalk_normal/noarms/civ_male_standtalk_normal_child_noarms.ban` |
| Talk Parent Arms | `animations/characters/contextact/civilian/staged/standtalk_normal/arms/civ_male_standtalk_normal_parent_arms.ban` |
| Talk Parent Hands | `animations/characters/contextact/civilian/staged/standtalk_normal/hands/civ_male_standtalk_normal_parent_hands.ban` |
| Talk Parent No Arms | `animations/characters/contextact/civilian/staged/standtalk_normal/noarms/civ_male_standtalk_normal_parent_noarms.ban` |
| Telescope Child | `animations/characters/contextact/civilian/staged/usetelescope/ca_civ_staged_usetelescope_child_loop.ban` |
| Telescope Child Look Up | `animations/characters/contextact/civilian/staged/usetelescope/ca_civ_staged_usetelescope_child_oneoff_lookup.ban` |
| Telescope Child Take Turns | `animations/characters/contextact/civilian/staged/usetelescope/ca_civ_staged_usetelescope_child_oneoff_taketurns.ban` |
| Telescope Parent | `animations/characters/contextact/civilian/staged/usetelescope/ca_civ_staged_usetelescope_parent_loop.ban` |
| Telescope Parent Look Up | `animations/characters/contextact/civilian/staged/usetelescope/ca_civ_staged_usetelescope_parent_oneoff_lookup.ban` |
| Telescope Parent Take Turns | `animations/characters/contextact/civilian/staged/usetelescope/ca_civ_staged_usetelescope_parent_oneoff_taketurns.ban` |
| Texting | `animations/characters/contextact/civilian/staged/standingaround/ca_civ_staged_standingaround_texting_loop.ban` |
| Vendor | `animations/characters/contextact/civilian/spsc/vendorbuyer/ca_civ_spsc_vendorbuyer_vendor_idle_loop.ban` |
| Vendor Buyer | `animations/characters/contextact/civilian/spsc/vendorbuyer/ca_civ_spsc_vendorbuyer_buyer_var00_loop.ban` |
| Vendor Buyer Listen | `animations/characters/contextact/civilian/spsc/vendorbuyer/ca_civ_spsc_vendorbuyer_conversation_buyer_listen_loop.ban` |
| Vendor Buyer Step Forward | `animations/characters/contextact/civilian/spsc/vendorbuyer/ca_civ_spsc_vendorbuyer_buyer_var00_oneoff_stepforward.ban` |
| Vendor Buyer Talk | `animations/characters/contextact/civilian/spsc/vendorbuyer/ca_civ_spsc_vendorbuyer_conversation_buyer_talk_loop.ban` |
| Vendor Buyer Talk To Self | `animations/characters/contextact/civilian/spsc/vendorbuyer/ca_civ_spsc_vendorbuyer_buyer_var00_oneoff_talktoself.ban` |
| Vendor Listen | `animations/characters/contextact/civilian/spsc/vendorbuyer/ca_civ_spsc_vendorbuyer_conversation_vendor_listen_loop.ban` |
| Vendor Promote Goods | `animations/characters/contextact/civilian/spsc/vendorbuyer/ca_civ_spsc_vendorbuyer_promotegoods_vendor_loop.ban` |
| Vendor Promote Goods Buyer | `animations/characters/contextact/civilian/spsc/vendorbuyer/ca_civ_spsc_vendorbuyer_promotegoods_buyer_loop.ban` |
| Vendor Talk | `animations/characters/contextact/civilian/spsc/vendorbuyer/ca_civ_spsc_vendorbuyer_conversation_vendor_talk_loop.ban` |
| Wait For Bus | `animations/characters/contextact/civilian/systemic/waitforbus/ca_civ_systemic_waitforbus_loop.ban` |
| Wait For Bus Arms Crossed | `animations/characters/contextact/civilian/systemic/waitforbus/ca_civ_systemic_waitforbus_oneoff_crossarm.ban` |
| Wait For Bus Fan Self | `animations/characters/contextact/civilian/systemic/waitforbus/ca_civ_systemic_waitforbus_oneoff_fanself.ban` |
| Wait For Bus Look At Watch | `animations/characters/contextact/civilian/systemic/waitforbus/ca_civ_systemic_waitforbus_oneoff_lookatwatch.ban` |
| Wait For Bus Look For Bus | `animations/characters/contextact/civilian/systemic/waitforbus/ca_civ_systemic_waitforbus_oneoff_lookforbus.ban` |
| Wait For Bus Scratch | `animations/characters/contextact/civilian/systemic/waitforbus/ca_civ_systemic_waitforbus_oneoff_scratch.ban` |
| Wait In Line Arms Crossed | `animations/characters/contextact/civilian/staged/waitinline/ca_civ_staged_waitinline_crossarm_loop.ban` |
| Wait In Line Hand On Waist | `animations/characters/contextact/civilian/staged/waitinline/ca_civ_staged_waitinline_onehandonwaist_loop.ban` |
| Wait In Line Hands Behind Back | `animations/characters/contextact/civilian/staged/waitinline/ca_civ_staged_waitinline_handsback_loop.ban` |
| Wait In Line Hands On Waist | `animations/characters/contextact/civilian/staged/waitinline/ca_civ_staged_waitinline_handsonwaist_loop.ban` |
| Wait In Line Happy Child | `animations/characters/contextact/civilian/staged/waitinline/ca_civ_staged_waitinline_frontbackhappy_child_loop.ban` |
| Wait In Line Happy Parent | `animations/characters/contextact/civilian/staged/waitinline/ca_civ_staged_waitinline_frontbackhappy_parent_loop.ban` |
| Wait In Line Look Around | `animations/characters/contextact/civilian/staged/waitinline/ca_civ_staged_waitinline_lookaround_loop.ban` |
| Wait In Line Look Around 2 | `animations/characters/contextact/civilian/staged/waitinline/ca_civ_staged_waitinline_lookaroundvar01_loop.ban` |
| Waiting | `animations/characters/contextact/civilian/staged/waitingforfriend/ca_civ_staged_waitingforfriend_generic_loop.ban` |
| Waiting Arms Crossed | `animations/characters/contextact/civilian/staged/waitingforfriend/ca_civ_staged_waitingforfriend_crossarm_loop.ban` |
| Waiting Hand On Hip | `animations/characters/contextact/civilian/staged/waitingforfriend/ca_civ_staged_waitingforfriend_onehandonhip_loop.ban` |
| Waiting Hands Behind Back | `animations/characters/contextact/civilian/staged/waitingforfriend/ca_civ_staged_waitingforfriend_handsback_loop.ban` |
| Waiting Hands On Hips | `animations/characters/contextact/civilian/staged/waitingforfriend/ca_civ_staged_waitingforfriend_handsonhip_loop.ban` |
| Waiting Look At Watch | `animations/characters/contextact/civilian/staged/waitingforfriend/ca_civ_staged_waitingforfriend_generic_oneoff_lookatwatch.ban` |
| Waiting Scratch | `animations/characters/contextact/civilian/staged/waitingforfriend/ca_civ_staged_waitingforfriend_generic_oneoff_scratch.ban` |
| Window Shopping | `animations/characters/contextact/civilian/systemic/windowshopping/ca_civ_systemic_windowshopping_loop.ban` |
| Window Shopping Argue Child | `animations/characters/contextact/civilian/staged/windowshopping/ca_civ_staged_windowshopping_argue_child.ban` |
| Window Shopping Argue Parent | `animations/characters/contextact/civilian/staged/windowshopping/ca_civ_staged_windowshopping_argue_parent.ban` |
| Window Shopping Arms Crossed | `animations/characters/contextact/civilian/systemic/windowshopping/ca_civ_systemic_windowshopping_armscrossed_loop.ban` |
| Window Shopping Browsing | `animations/characters/contextact/civilian/systemic/windowshopping/ca_civ_systemic_windowshopping_browsing_loop.ban` |
| Window Shopping Browsing Look Back | `animations/characters/contextact/civilian/systemic/windowshopping/ca_civ_systemic_windowshopping_browsing_oneoff_lookback.ban` |
| Window Shopping Hand On Hip | `animations/characters/contextact/civilian/systemic/windowshopping/ca_civ_systemic_windowshopping_onehandonhip_loop.ban` |
| Window Shopping Hands Behind Back | `animations/characters/contextact/civilian/systemic/windowshopping/ca_civ_systemic_windowshopping_handsbehindback_loop.ban` |
| Window Shopping Look Closer | `animations/characters/contextact/civilian/systemic/windowshopping/ca_civ_systemic_windowshopping_oneoff_lookcloser.ban` |
| Window Shopping Look Down Closer | `animations/characters/contextact/civilian/systemic/windowshopping/ca_civ_systemic_windowshopping_oneoff_lookdowncloser.ban` |
| Window Shopping Romantic Child | `animations/characters/contextact/civilian/staged/windowshopping/ca_civ_staged_windowshopping_romantic_child.ban` |
| Window Shopping Romantic Parent | `animations/characters/contextact/civilian/staged/windowshopping/ca_civ_staged_windowshopping_romantic_parent.ban` |
| Worried Talk Child | `animations/characters/contextact/civilian/staged/standconversationconcern/ca_civ_staged_standconversationconcern_child_talk_loop.ban` |
| Worried Talk Child Listen | `animations/characters/contextact/civilian/staged/standconversationconcern/ca_civ_staged_standconversationconcern_child_listen_loop.ban` |
| Worried Talk Parent | `animations/characters/contextact/civilian/staged/standconversationconcern/ca_civ_staged_standconversationconcern_parent_talk_loop.ban` |
| Worried Talk Parent Listen | `animations/characters/contextact/civilian/staged/standconversationconcern/ca_civ_staged_standconversationconcern_parent_listen_loop.ban` |

### Leaning {#leaning}

| Name | Animation |
|---|---|
| Lean Off Railing Arms Crossed | `animations/characters/contextact/civilian/staged/leanoffrailing/ca_civ_staged_leanoffrailing_armscrossed_loop.ban` |
| Lean Off Railing Elbows Up | `animations/characters/contextact/civilian/staged/leanoffrailing/ca_civ_staged_leanoffrailing_elbowsup_loop.ban` |
| Lean Off Railing Lean Back | `animations/characters/contextact/civilian/staged/leanoffrailing/ca_civ_staged_leanoffrailing_leanback_loop.ban` |
| Lean Off Railing Lean Left | `animations/characters/contextact/civilian/staged/leanoffrailing/ca_civ_staged_leanoffrailing_leanleft_loop.ban` |
| Lean Off Railing Lean Right | `animations/characters/contextact/civilian/staged/leanoffrailing/ca_civ_staged_leanoffrailing_leanright_loop.ban` |
| Lean Off Railing Legs Crossed | `animations/characters/contextact/civilian/staged/leanoffrailing/ca_civ_staged_leanoffrailing_legscrossed_loop.ban` |
| Lean On Bar Alone | `animations/characters/contextact/civilian/staged/leanonbar/ca_civ_staged_leanonbar_alone_loop.ban` |
| Lean On Bar Alone Looking Back | `animations/characters/contextact/civilian/staged/leanonbar/ca_civ_staged_leanonbar_alone_oneoff_lookingback.ban` |
| Lean On Bar Alone Sipping | `animations/characters/contextact/civilian/staged/leanonbar/ca_civ_staged_leanonbar_alone_oneoff_sipping.ban` |
| Lean On Railing | `animations/characters/contextact/civilian/staged/leanonrailing/ca_civ_staged_leanonrailing_generic_loop.ban` |
| Lean On Railing Arms Crossed | `animations/characters/contextact/civilian/staged/leanonrailing/ca_civ_staged_leanonrailing_armscrossed_loop.ban` |
| Lean On Railing Hands Clasped | `animations/characters/contextact/civilian/staged/leanonrailing/ca_civ_staged_leanonrailing_handsclasped_loop.ban` |
| Lean On Railing Lean Left | `animations/characters/contextact/civilian/staged/leanonrailing/ca_civ_staged_leanonrailing_leanleft_loop.ban` |
| Lean On Railing Lean Right | `animations/characters/contextact/civilian/staged/leanonrailing/ca_civ_staged_leanonrailing_leanright_loop.ban` |
| Lean On Railing Tiptoes | `animations/characters/contextact/civilian/staged/leanonrailing/ca_civ_staged_leanonrailing_tiptoes_loop.ban` |
| Lean On Wall Legs Crossed | `animations/characters/contextact/civilian/systemic/leanonwall/generic/ca_civ_systemic_leanonwall_generic_crossleg_loop.ban` |
| Lean On Wall Legs Crossed Pat Wall | `animations/characters/contextact/civilian/systemic/leanonwall/generic/ca_civ_systemic_leanonwall_generic_crossleg_oneoff_handpatwall.ban` |
| Lean On Wall Smoking Legs Crossed | `animations/characters/contextact/civilian/systemic/leanonwall/smoking/ca_civ_systemic_leanonwall_smoking_crossleg_loop.ban` |
| Lean On Wall Smoking Legs Crossed Inhale | `animations/characters/contextact/civilian/systemic/leanonwall/smoking/ca_civ_systemic_leanonwall_smoking_crossleg_oneoff_inhale.ban` |
| Lean On Wall Texting | `animations/characters/contextact/civilian/systemic/leanonwall/texting/ca_civ_systemic_leanonwall_texing_plain_loop.ban` |
| Lean On Wall Texting Legs Crossed | `animations/characters/contextact/civilian/systemic/leanonwall/texting/ca_civ_systemic_leanonwall_texting_crossleg_loop.ban` |
| Ledge Talk Child | `animations/characters/contextact/civilian/staged/leanonledgeconversation/ca_civ_staged_leanonledgeconversation_child_talk_loop.ban` |
| Ledge Talk Child Listen | `animations/characters/contextact/civilian/staged/leanonledgeconversation/ca_civ_staged_leanonledgeconversation_child_listen_loop.ban` |
| Ledge Talk Parent | `animations/characters/contextact/civilian/staged/leanonledgeconversation/ca_civ_staged_leanonledgeconversation_parent_talk_loop.ban` |
| Ledge Talk Parent Listen | `animations/characters/contextact/civilian/staged/leanonledgeconversation/ca_civ_staged_leanonledgeconversation_parent_listen_loop.ban` |
| Prisoner Lean Legs Crossed | `animations/characters/contextact/civilian/systemic/prisonerleanonwall/ca_civ_systemic_prisonerleanonwall_generic_crossleg_loop.ban` |
| Stunt Driver Cool Hang | `animations/characters/contextact/civilian/staged/stuntdriver/ca_civ_staged_stuntdriver_coolhang_loop.ban` |
| Stunt Driver Cool Hang Hands On Head | `animations/characters/contextact/civilian/staged/stuntdriver/ca_civ_staged_stuntdriver_coolhang_oneoff_handsonhead.ban` |
| Stunt Driver Cool Hang Look Back | `animations/characters/contextact/civilian/staged/stuntdriver/ca_civ_staged_stuntdriver_coolhang_oneoff_lookback.ban` |
| Stunt Driver Cool Hang Stretch | `animations/characters/contextact/civilian/staged/stuntdriver/ca_civ_staged_stuntdriver_coolhang_oneoff_stretch.ban` |

### Sitting {#sitting}

| Name | Animation |
|---|---|
| Beach Chair Hands In Lap | `animations/characters/contextact/civilian/staged/sitonbeachchair/ca_civ_staged_sitonbeachchair_handsinlap_loop.ban` |
| Beach Chair Hands In Lap 2 | `animations/characters/contextact/civilian/staged/sitonbeachchair/ca_civ_staged_sitonbeachchair_handsinlapvar01_loop.ban` |
| Beach Chair Hands On Head | `animations/characters/contextact/civilian/staged/sitonbeachchair/ca_civ_staged_sitonbeachchair_handsonhead_loop.ban` |
| Beach Chair Legs Crossed | `animations/characters/contextact/civilian/staged/sitonbeachchair/ca_civ_staged_sitonbeachchair_crossleg_loop.ban` |
| Beach Chair Upright | `animations/characters/contextact/civilian/staged/sitonbeachchair/ca_civ_staged_sitonbeachchair_upright_loop.ban` |
| Beach Chair Upright 2 | `animations/characters/contextact/civilian/staged/sitonbeachchair/ca_civ_staged_sitonbeachchair_uprightvar01_loop.ban` |
| Bench Phone Call | `animations/characters/contextact/civilian/systemic/sitonbench/ca_civ_systemic_sitonbench_talkonphone_loop.ban` |
| Bench Talk Child | `animations/characters/contextact/civilian/staged/sitonbenchtalk/civ_male_sitonbenchtalk_child.ban` |
| Bench Talk Child 2 | `animations/characters/contextact/civilian/staged/sitonbenchtalk/civ_male_sitonbenchtalk_child_var01.ban` |
| Bench Talk Child 3 | `animations/characters/contextact/civilian/staged/sitonbenchtalk/civ_male_sitonbenchtalk_child_var02.ban` |
| Bench Talk Parent | `animations/characters/contextact/civilian/staged/sitonbenchtalk/civ_male_sitonbenchtalk_parent.ban` |
| Bench Talk Parent 2 | `animations/characters/contextact/civilian/staged/sitonbenchtalk/civ_male_sitonbenchtalk_parent_var01.ban` |
| Bench Talk Parent 3 | `animations/characters/contextact/civilian/staged/sitonbenchtalk/civ_male_sitonbenchtalk_parent_var02.ban` |
| Bench Texting | `animations/characters/contextact/civilian/systemic/sitonbench/ca_civ_systemic_sitonbench_textonphone_loop.ban` |
| Car Drinking Legs Crossed | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_drink_crossleg_loop.ban` |
| Car Eating | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_eat_loop.ban` |
| Car Lean Back | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_generic_leanback_loop.ban` |
| Car Lean Back Leg Swing | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_generic_leanback_oneoff_legswing.ban` |
| Car Lean Back Shift Weight | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_generic_leanback_oneoff_shiftweight.ban` |
| Car Lean Forward | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_generic_leanforward_loop.ban` |
| Car Lean Forward Touch Nose | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_generic_leanforward_oneoff_touchnose.ban` |
| Car Lean Forward Wipe Forehead | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_generic_leanforward_oneoff_wipeforehead.ban` |
| Car Reading Legs Crossed | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_read_crossleg_loop.ban` |
| Car Smoking Left Leg Up | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_smoke_leftlegup_loop.ban` |
| Car Smoking Legs Crossed | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_smoke_crossleg_loop.ban` |
| Car Texting | `animations/characters/contextact/civilian/staged/sitoncar/ca_civ_staged_sitoncar_texting_plain_loop.ban` |
| Chair Drinking | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_drinking_loop.ban` |
| Chair Eating Sandwich | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_eatingsandwich_loop.ban` |
| Chair Elbows On Legs | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_generic_elbowsonleg_loop.ban` |
| Chair Hands On Head | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_generic_handsonhead_loop.ban` |
| Chair Legs Crossed | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_generic_crossleg_loop.ban` |
| Chair Phone Call | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_talkonphone_loop.ban` |
| Chair Phone Call Elbow Up | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_talkonphoneelbowup_loop.ban` |
| Chair Reading | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_reading_loop.ban` |
| Chair Smoking | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_smoking_loop.ban` |
| Chair Texting | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_textonphone_loop.ban` |
| Chair Upright | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_generic_upright_loop.ban` |
| Chair Upright Female | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_generic_uprightfemale_loop.ban` |
| Chair Upright Female Hand On Thigh | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_generic_uprightfemale_oneoff_handonthigh.ban` |
| Chair Upright Female Weight Change | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_generic_uprightfemale_oneoff_weightchange.ban` |
| Chair Upright Lean Forward | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_generic_upright_oneoff_leanforward.ban` |
| Chair Upright Wipe Face | `animations/characters/contextact/civilian/staged/sitonchair/ca_civ_staged_sitonchair_generic_upright_oneoff_wipeface.ban` |
| Computer | `animations/characters/contextact/civilian/staged/situsecomputer/ca_civ_staged_situsecomputer.ban` |
| Crew On Audio Case Smoking | `animations/characters/contextact/civilian/staged/garlandcrew/ca_civ_staged_garlandcrew_sitonaudiocase_smoke_loop.ban` |
| Crew Squat Drink Soda | `animations/characters/contextact/civilian/staged/garlandcrew/ca_civ_staged_garlandcrew_squat_drinksoda_loop.ban` |
| Crew Squat Smoking | `animations/characters/contextact/civilian/staged/garlandcrew/ca_civ_staged_garlandcrew_squat_smoke_loop.ban` |
| Crew Stand Smoking | `animations/characters/contextact/civilian/staged/garlandcrew/ca_civ_staged_garlandcrew_stand_smoke_loop.ban` |
| Crew Stand Smoking Check Cigarette | `animations/characters/contextact/civilian/staged/garlandcrew/ca_civ_staged_garlandcrew_stand_smoke_oneoff_checkcigarette.ban` |
| Crew Stand Smoking Look Around | `animations/characters/contextact/civilian/staged/garlandcrew/ca_civ_staged_garlandcrew_stand_smoke_oneoff_lookaround.ban` |
| Fishing | `animations/characters/contextact/civilian/staged/sitandfish/ca_civ_staged_sitandfish_loop.ban` |
| Ground Browse Phone Cross-legged | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_browsephone_crosslegged_loop.ban` |
| Ground Browse Phone Cross-legged Look Up | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_browsephone_crosslegged_oneoff_lookup.ban` |
| Ground Browse Phone Lying Down | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_browsephone_layingdown_loop.ban` |
| Ground Cross-legged Lean Back | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_crosslegged_leanback_loop.ban` |
| Ground Cross-legged Lean Forward | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_crosslegged_leanforward_loop.ban` |
| Ground Cross-legged Lean Left | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_crosslegged_leanleft_loop.ban` |
| Ground Cross-legged Lean Right | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_crosslegged_leanright_loop.ban` |
| Ground Hands On Left Knee | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_handsonleftknee_loop.ban` |
| Ground Hands On Right Knee | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_handsonrightknee_loop.ban` |
| Ground Knees Up | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_kneesup_loop.ban` |
| Ground Lean Back Left Leg Up | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_leanbackleftlegup_loop.ban` |
| Ground Left Leg Up Lean Back | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_leftlegup_leanback_loop.ban` |
| Ground Legs Crossed | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_legscrossed_loop.ban` |
| Ground Phone Call Lean Back Left | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_talkonphone_leanbackleft_loop.ban` |
| Ground Phone Call Lean Back Right | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_talkonphone_leanbackright_loop.ban` |
| Ground Phone Call Right Arm Up | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_talkonphone_rightarmup_loop.ban` |
| Ground Phone Left Arm Up | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_talkatphone_leftarmup_loop.ban` |
| Ground Right Leg Up | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_rightlegup_loop.ban` |
| Ground Right Leg Up Lean Back | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_rightlegup_leanback_loop.ban` |
| Ground Right Leg Up Look At Sky | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_rightlegup_oneoff_lookatsky.ban` |
| Ground Spread Eagle | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_spreadeagle_loop.ban` |
| Ground Spread Eagle Check For Rain | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_spreadeagle_oneoff_checkforrain.ban` |
| Ground Spread Eagle Leg Adjust | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_spreadeagle_oneoff_legadjust.ban` |
| Ground Spread Eagle Weight Adjust | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_spreadeagle_oneoff_weightadjust.ban` |
| Ground Texting Squatting | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_texting_squatting_loop.ban` |
| Ground Texting Squatting Look Around | `animations/characters/contextact/civilian/staged/sitonground/ca_civ_staged_sitonground_texting_squatting_oneoff_lookaround.ban` |
| Ledge | `animations/characters/contextact/civilian/staged/sitonledge/ca_civ_staged_sitonledge_generic_loop.ban` |
| Ledge Arms On Legs | `animations/characters/contextact/civilian/staged/sitonledge/ca_civ_staged_sitonledge_armsonlegs_loop.ban` |
| Ledge Drinking | `animations/characters/contextact/civilian/staged/sitonledge/ca_civ_staged_sitonledge_drinking_loop.ban` |
| Ledge Lean Back | `animations/characters/contextact/civilian/staged/sitonledge/ca_civ_staged_sitonledge_leanback_loop.ban` |
| Ledge Leg Up | `animations/characters/contextact/civilian/staged/sitonledge/ca_civ_staged_sitonledge_legup_loop.ban` |
| Ledge Legs Crossed | `animations/characters/contextact/civilian/staged/sitonledge/ca_civ_staged_sitonledge_legscrossed_loop.ban` |
| Ledge Smoking | `animations/characters/contextact/civilian/staged/sitonledge/ca_civ_staged_sitonledge_smoking_loop.ban` |
| Ledge Talk Child | `animations/characters/contextact/civilian/staged/sitonledgeconversation/ca_civ_staged_sitonledgeconversation_child_talk_loop.ban` |
| Ledge Talk Child Listen | `animations/characters/contextact/civilian/staged/sitonledgeconversation/ca_civ_staged_sitonledgeconversation_child_listen_loop.ban` |
| Ledge Talk Parent | `animations/characters/contextact/civilian/staged/sitonledgeconversation/ca_civ_staged_sitonledgeconversation_parent_talk_loop.ban` |
| Ledge Talk Parent Listen | `animations/characters/contextact/civilian/staged/sitonledgeconversation/ca_civ_staged_sitonledgeconversation_parent_listen_loop.ban` |
| Picnic Cosy Couple Child | `animations/characters/contextact/civilian/staged/picnic/ca_civ_staged_picnic_cosycouple_child_loop.ban` |
| Picnic Cosy Couple Parent | `animations/characters/contextact/civilian/staged/picnic/ca_civ_staged_picnic_cosycouple_parent_loop.ban` |
| Picnic Relaxed Couple Child | `animations/characters/contextact/civilian/staged/picnic/ca_civ_staged_picnic_relaxedcouple_child_loop.ban` |
| Picnic Relaxed Couple Parent | `animations/characters/contextact/civilian/staged/picnic/ca_civ_staged_picnic_relaxedcouple_parent_loop.ban` |
| Prisoner Bench Sad | `animations/characters/contextact/civilian/staged/prisonersitonbench/ca_civ_staged_prisonersitonbench_generic_sadafraid_loop.ban` |
| Prisoner Ground Sad | `animations/characters/contextact/civilian/systemic/prisonersitonground/ca_civ_systemic_prisonersitonground_generic_sadafraid_loop.ban` |
| Table Drinking | `animations/characters/contextact/civilian/staged/sitattable/ca_civ_staged_sitattable_drinking_loop.ban` |
| Table Eating Sandwich | `animations/characters/contextact/civilian/staged/sitattable/ca_civ_staged_sitattable_eatingsandwich_loop.ban` |
| Table Phone Call | `animations/characters/contextact/civilian/staged/sitattable/ca_civ_staged_sitattable_talkonphone_loop.ban` |
| Table Phone Call Elbow Up | `animations/characters/contextact/civilian/staged/sitattable/ca_civ_staged_sitattable_talkonphoneelbowup_loop.ban` |
| Table Reading | `animations/characters/contextact/civilian/staged/sitattable/ca_civ_staged_sitattable_reading_loop.ban` |
| Table Smoking | `animations/characters/contextact/civilian/staged/sitattable/ca_civ_staged_sitattable_smoking_loop.ban` |
| Table Texting | `animations/characters/contextact/civilian/staged/sitattable/ca_civ_staged_sitattable_textonphone_loop.ban` |
| Table Upright | `animations/characters/contextact/civilian/staged/sitattable/ca_civ_staged_sitattable_generic_upright_loop.ban` |
| Table Upright Female | `animations/characters/contextact/civilian/staged/sitattable/ca_civ_staged_sitattable_generic_uprightfemale_loop.ban` |
| Talk Child Face Right | `animations/characters/contextact/civilian/spsc/sitconversation/ca_spsc_civ_sitconversation_child_faceright_talk_loop.ban` |
| Talk Child Face Right Listen | `animations/characters/contextact/civilian/spsc/sitconversation/ca_spsc_civ_sitconversation_child_faceright_listen_loop.ban` |
| Talk Parent Face Left | `animations/characters/contextact/civilian/spsc/sitconversation/ca_spsc_civ_sitconversation_parent_faceleft_idle.ban` |
| Talk Parent Face Left (2) | `animations/characters/contextact/civilian/spsc/sitconversation/ca_spsc_civ_sitconversation_parent_faceleft_talk_loop.ban` |
| Talk Parent Face Left Listen | `animations/characters/contextact/civilian/spsc/sitconversation/ca_spsc_civ_sitconversation_parent_faceleft_listen_loop.ban` |

### Lying {#lying}

| Name | Animation |
|---|---|
| Beach Lying Down | `animations/characters/contextact/civilian/staged/loungeonbeach/ca_civ_staged_loungeonbeach_layingdown_loop.ban` |
| Beach Lying Down 2 | `animations/characters/contextact/civilian/staged/loungeonbeach/ca_civ_staged_loungeonbeach_layingdownvar01_loop.ban` |
| Beach Lying Down 3 | `animations/characters/contextact/civilian/staged/loungeonbeach/ca_civ_staged_loungeonbeach_layingdownvar02_loop.ban` |
| Beach Sitting | `animations/characters/contextact/civilian/staged/loungeonbeach/ca_civ_staged_loungeonbeach_sitting_loop.ban` |
| Beach Sitting 2 | `animations/characters/contextact/civilian/staged/loungeonbeach/ca_civ_staged_loungeonbeach_sittingvar01_loop.ban` |
| Beach Sitting 3 | `animations/characters/contextact/civilian/staged/loungeonbeach/ca_civ_staged_loungeonbeach_sittingvar02_loop.ban` |
| Massage Child | `animations/characters/contextact/civilian/staged/massage/ca_civ_staged_massage_child_loop.ban` |
| Massage Child Deep Tissue | `animations/characters/contextact/civilian/staged/massage/ca_civ_staged_massage_child_oneoff_deeptissue.ban` |
| Massage Child Spine | `animations/characters/contextact/civilian/staged/massage/ca_civ_staged_massage_child_oneoff_gentlespine.ban` |
| Massage Parent | `animations/characters/contextact/civilian/staged/massage/ca_civ_staged_massage_parent_loop.ban` |
| Massage Parent Deep Tissue | `animations/characters/contextact/civilian/staged/massage/ca_civ_staged_massage_parent_oneoff_deeptissue.ban` |
| Massage Parent Spine | `animations/characters/contextact/civilian/staged/massage/ca_civ_staged_massage_parent_oneoff_gentlespine.ban` |

### Working {#working}

| Name | Animation |
|---|---|
| Bartender Mixing | `animations/characters/contextact/civilian/staged/bartender/ca_civ_staged_bartender_mixing_loop.ban` |
| Bartender Mixing Look Around | `animations/characters/contextact/civilian/staged/bartender/ca_civ_staged_bartender_mixing_loop_oneoff_lookaround.ban` |
| Bartender Wipe Glass | `animations/characters/contextact/civilian/staged/bartender/ca_civ_staged_bartender_wipingwineglass_loop.ban` |
| Bartender Wipe Glass Inspect Glass | `animations/characters/contextact/civilian/staged/bartender/ca_civ_staged_bartender_wipingwineglass_oneoff_inspectglass01.ban` |
| Bartender Wipe Glass Inspect Glass 2 | `animations/characters/contextact/civilian/staged/bartender/ca_civ_staged_bartender_wipingwineglass_oneoff_inspectglass02.ban` |
| Check Under Hood | `animations/characters/contextact/civilian/staged/checkunderhood/ca_civ_staged_checkunderhood_loop.ban` |
| Clean Car Crouched | `animations/characters/contextact/civilian/staged/cleancar/ca_civ_staged_cleancar_crouched_loop.ban` |
| Clean Car Crouched Different Strokes | `animations/characters/contextact/civilian/staged/cleancar/ca_civ_staged_cleancar_crouched_oneoff_differentstrokes.ban` |
| Clean Car Crouched Shake Sponge | `animations/characters/contextact/civilian/staged/cleancar/ca_civ_staged_cleancar_crouched_oneoff_shakesponge.ban` |
| Clean Car Standing | `animations/characters/contextact/civilian/staged/cleancar/ca_civ_staged_cleancar_standing_loop.ban` |
| Clean Fish | `animations/characters/contextact/civilian/staged/cleanfish/ca_civ_staged_cleanfish_loop.ban` |
| Clean Fish Pause To Examine | `animations/characters/contextact/civilian/staged/cleanfish/ca_civ_staged_cleanfish_oneoff_pausetoexam.ban` |
| Clean Window Standing | `animations/characters/contextact/civilian/staged/cleanwindow/ca_civ_staged_cleanwindow_standing_loop.ban` |
| Clipboard | `animations/characters/contextact/civilian/staged/garlandpa/ca_civ_staged_garlandpa_clipboard_loop.ban` |
| Clipboard Child | `animations/characters/contextact/civilian/staged/reviewclipboard/ca_civ_staged_reviewclipboard_child_loop.ban` |
| Clipboard Parent | `animations/characters/contextact/civilian/staged/reviewclipboard/ca_civ_staged_reviewclipboard_parent_loop.ban` |
| Fix Tire | `animations/characters/contextact/civilian/staged/fixtire/ca_civ_staged_fixtire_loop.ban` |
| Gas Pump | `animations/characters/contextact/civilian/staged/usegaspump/ca_civ_staged_usegaspump_loop.ban` |
| Graffiti | `animations/characters/contextact/civilian/staged/graffiti/ca_civ_staged_graffiti_loop.ban` |
| Graffiti Shake Can | `animations/characters/contextact/civilian/staged/graffiti/ca_civ_staged_graffiti_oneoff_shakecan.ban` |
| Graffiti Step Back | `animations/characters/contextact/civilian/staged/graffiti/ca_civ_staged_graffiti_oneoff_stepback.ban` |
| Grill BBQ | `animations/characters/contextact/civilian/staged/grilling/ca_civ_staged_grilling_bbqgrill_loop.ban` |
| Grill BBQ Fan Self | `animations/characters/contextact/civilian/staged/grilling/ca_civ_staged_grilling_bbqgrill_oneoff_fanself.ban` |
| Grill BBQ Scratch | `animations/characters/contextact/civilian/staged/grilling/ca_civ_staged_grilling_bbqgrill_oneoff_scratch.ban` |
| Grill BBQ Turn Meat | `animations/characters/contextact/civilian/staged/grilling/ca_civ_staged_grilling_bbqgrill_oneoff_turnmeat.ban` |
| Hacking | `animations/characters/contextact/civilian/systemic/usehackingconsole/ca_civ_systemic_usehackingconsole_loop.ban` |
| Hacking Check Line | `animations/characters/contextact/civilian/systemic/usehackingconsole/ca_civ_systemic_usehackingconsole_oneoff_checkline.ban` |
| Inspect Supply Stand | `animations/characters/contextact/civilian/staged/inspectsupply/ca_civ_staged_inspectsupply_stand_loop.ban` |
| Lab Typing | `animations/characters/contextact/civilian/staged/labtyping/civ_male_contextact_laboratory_typing.ban` |
| Laundry | `animations/characters/contextact/civilian/staged/handwashlaundry/ca_civ_staged_handwashlaundry_loop.ban` |
| Laundry (2) | `animations/characters/contextact/civilian/staged/handwashlaundry/ca_civ_staged_handwashlaundry_oneoff.ban` |
| Metal Detector | `animations/characters/contextact/civilian/staged/usemetaldetector/ca_civ_staged_usemetaldetector_loop.ban` |
| Metal Detector Bad Contact | `animations/characters/contextact/civilian/staged/usemetaldetector/ca_civ_staged_usemetaldetector_oneoff_badcontact.ban` |
| Metal Detector Glimpse At Screen | `animations/characters/contextact/civilian/staged/usemetaldetector/ca_civ_staged_usemetaldetector_oneoff_glimpseatscreen.ban` |
| Miner Ground Digging | `animations/characters/contextact/civilian/staged/miner/ca_civ_staged_miner_ground_digging_loop.ban` |
| Miner Ground Digging Wipe Dust | `animations/characters/contextact/civilian/staged/miner/ca_civ_staged_miner_ground_digging_oneoff_wipedustvar01.ban` |
| Miner Ground Digging Wipe Dust 2 | `animations/characters/contextact/civilian/staged/miner/ca_civ_staged_miner_ground_digging_oneoff_wipedustvar02.ban` |
| Miner Ground Dusting | `animations/characters/contextact/civilian/staged/miner/ca_civ_staged_miner_ground_dusting_loop.ban` |
| Miner Ground Dusting Inspect | `animations/characters/contextact/civilian/staged/miner/ca_civ_staged_miner_ground_dusting_oneoff_inspect.ban` |
| Miner Wall Digging | `animations/characters/contextact/civilian/staged/miner/ca_civ_staged_miner_wall_digging_loop.ban` |
| Miner Wall Digging Wipe Dust | `animations/characters/contextact/civilian/staged/miner/ca_civ_staged_miner_wall_digging_oneoff_wipedustvar01.ban` |
| Miner Wall Digging Wipe Dust 2 | `animations/characters/contextact/civilian/staged/miner/ca_civ_staged_miner_wall_digging_oneoff_wipedustvar02.ban` |
| Miner Wall Dusting Crouch | `animations/characters/contextact/civilian/staged/miner/ca_civ_staged_miner_wall_dusting_crouch_loop.ban` |
| Miner Wall Dusting Crouch Inspect | `animations/characters/contextact/civilian/staged/miner/ca_civ_staged_miner_wall_dusting_crouch_oneoff_inspect.ban` |
| Pickaxe Hip Drop | `animations/characters/contextact/civilian/staged/swingpickaxe/ca_civ_staged_swingpickaxe_hipdrop_loop.ban` |
| Pickaxe Hip Drop Pull Pickaxe Up | `animations/characters/contextact/civilian/staged/swingpickaxe/ca_civ_staged_swingpickaxe_hipdrop_oneoff_pullpickaxeup.ban` |
| Polish Shovel | `animations/characters/contextact/civilian/staged/polishshovel/ca_civ_staged_polishshovel_loop.ban` |
| Rake | `animations/characters/contextact/civilian/staged/rakeground/ca_civ_staged_rakeground_default_loop.ban` |
| Rake 2 | `animations/characters/contextact/civilian/staged/rakeground/ca_civ_staged_rakeground_var01_loop.ban` |
| Rake 2 Shake Soil Off | `animations/characters/contextact/civilian/staged/rakeground/ca_civ_staged_rakeground_var01_oneoff_shakesoiloff.ban` |
| Rake Wipe Forehead | `animations/characters/contextact/civilian/staged/rakeground/ca_civ_staged_rakeground_default_oneoff_wipeforehead.ban` |
| Soda Machine | `animations/characters/contextact/civilian/systemic/usesodamachine/ca_civ_systemic_usesodamachine_loop.ban` |
| Sweep | `animations/characters/contextact/civilian/staged/sweep/ca_civ_staged_sweep_loop.ban` |
| Sweep Step Forward | `animations/characters/contextact/civilian/staged/sweep/ca_civ_staged_sweep_oneoff_stepforward.ban` |
| Throw Trash | `animations/characters/contextact/civilian/systemic/throwtrash/ca_civ_systemic_throwtrash_oneoff.ban` |
| Weld Crouched | `animations/characters/contextact/civilian/staged/welding/ca_civ_staged_welding_crouched_loop.ban` |
| Weld Crouched Burn Hand | `animations/characters/contextact/civilian/staged/welding/ca_civ_staged_welding_crouched_oneoff_burnhand.ban` |
| Weld Crouched Pause | `animations/characters/contextact/civilian/staged/welding/ca_civ_staged_welding_crouched_oneoff_pause.ban` |
| Weld Standing | `animations/characters/contextact/civilian/staged/welding/ca_civ_staged_welding_standing_loop.ban` |
| Weld Standing Blinded | `animations/characters/contextact/civilian/staged/welding/ca_civ_staged_welding_standing_oneoff_blinded.ban` |
| Weld Standing Brush Off Leg | `animations/characters/contextact/civilian/staged/welding/ca_civ_staged_welding_standing_oneoff_brushoffleg.ban` |

### Water {#water}

| Name | Animation |
|---|---|
| Fishing | `animations/characters/contextact/civilian/staged/standandfish/ca_civ_staged_standandfish_loop.ban` |
| Spearfishing | `animations/characters/contextact/civilian/staged/spearfishing/ca_civ_staged_spearfishing_loop.ban` |
| Spearfishing Legs Bent | `animations/characters/contextact/civilian/staged/spearfishing/ca_civ_staged_spearfishing_legsbent_loop.ban` |
| Spearfishing Legs Bent (2) | `animations/characters/contextact/civilian/staged/spearfishing/ca_civ_staged_spearfishing_legsbent_oneoff.ban` |
| Splash Alone Crouched | `animations/characters/contextact/civilian/staged/frolickinginwater/ca_civ_staged_frolickinginwater_alone_crouched_loop.ban` |
| Splash Alone Standing | `animations/characters/contextact/civilian/staged/frolickinginwater/ca_civ_staged_frolickinginwater_alone_standing_loop.ban` |
| Splash Child | `animations/characters/contextact/civilian/staged/frolickinginwater/ca_civ_staged_frolickinginwater_child_loop.ban` |
| Splash Parent | `animations/characters/contextact/civilian/staged/frolickinginwater/ca_civ_staged_frolickinginwater_parent_loop.ban` |

## All civilian animations {#all-civilian-animations}

Every animation file in the civilian folders (916 files), grouped by folder. The path to pass is the folder followed by the file name, for example `animations/characters/contextact/civilian/staged/dancing/` + `ca_civ_staged_dancing_rave_groove_loop.ban`.

#### animations/characters/civilian/death/ {#animationscharactersciviliandeath}

- `civ_male_death_explosion_back.ban`
- `civ_male_death_explosion_back_var01.ban`
- `civ_male_death_explosion_front.ban`
- `civ_male_death_explosion_front_var01.ban`
- `civ_male_death_explosion_left.ban`
- `civ_male_death_explosion_left_var01.ban`
- `civ_male_death_explosion_right.ban`
- `civ_male_death_explosion_right_var01.ban`

#### animations/characters/civilian/hands_bank/hands/ {#animationscharacterscivilianhands_bankhands}

- `pose_hands_civ_male_relaxed_hands.ban`

#### animations/characters/civilian/hitreaction/moving/ {#animationscharacterscivilianhitreactionmoving}

- `civ_male_hitreact_run_front_rightshoulder.ban`
- `civ_male_hitreact_run_front_torso.ban`

#### animations/characters/civilian/hitreaction/notmoving/ {#animationscharacterscivilianhitreactionnotmoving}

- `civ_male_hitreact_stand_heavy_back_armleft_180r_var01.ban`
- `civ_male_hitreact_stand_heavy_back_armleft_var01.ban`
- `civ_male_hitreact_stand_heavy_back_armright_180l_var01.ban`
- `civ_male_hitreact_stand_heavy_back_armright_var01.ban`
- `civ_male_hitreact_stand_heavy_back_chest_180l_var01.ban`
- `civ_male_hitreact_stand_heavy_back_chest_180r_var01.ban`
- `civ_male_hitreact_stand_heavy_back_legleft_180l_var01.ban`
- `civ_male_hitreact_stand_heavy_back_legleft_180r_var01.ban`
- `civ_male_hitreact_stand_heavy_back_legright_180l_var01.ban`
- `civ_male_hitreact_stand_heavy_back_legright_180r_var01.ban`
- `civ_male_hitreact_stand_heavy_front_armleft_var01.ban`
- `civ_male_hitreact_stand_heavy_front_armleft_var02.ban`
- `civ_male_hitreact_stand_heavy_front_armright_var01.ban`
- `civ_male_hitreact_stand_heavy_front_armright_var02.ban`
- `civ_male_hitreact_stand_heavy_front_chest_var01.ban`
- `civ_male_hitreact_stand_heavy_front_chest_var02.ban`
- `civ_male_hitreact_stand_heavy_front_gut_var01.ban`
- `civ_male_hitreact_stand_heavy_front_gut_var02.ban`
- `civ_male_hitreact_stand_heavy_front_legleft_var01.ban`
- `civ_male_hitreact_stand_heavy_front_legleft_var02.ban`
- `civ_male_hitreact_stand_heavy_front_legright_var01.ban`
- `civ_male_hitreact_stand_heavy_front_legright_var02.ban`
- `civ_male_hitreact_stand_heavy_left_lowerbody_270r_var01.ban`
- `civ_male_hitreact_stand_heavy_left_lowerbody_90l_var01.ban`
- `civ_male_hitreact_stand_heavy_left_upperbody_90l_var01.ban`
- `civ_male_hitreact_stand_heavy_left_upperbody_90l_var02.ban`
- `civ_male_hitreact_stand_heavy_right_lowerbody_270l_var01.ban`
- `civ_male_hitreact_stand_heavy_right_lowerbody_90r_var01.ban`
- `civ_male_hitreact_stand_heavy_right_upperbody_90r_var01.ban`
- `civ_male_hitreact_stand_heavy_right_upperbody_90r_var02.ban`

#### animations/characters/civilian/locomotion/idle/ {#animationscharacterscivilianlocomotionidle}

- `civ_female_loco_idle.ban`
- `civ_female_loco_idle_observe_curious.ban`
- `civ_female_loco_idle_observe_curious_oneoff_cellphonepic.ban`
- `civ_female_loco_idle_observe_curious_oneoff_handsonchest.ban`
- `civ_female_loco_idle_observe_curious_oneoff_phonecall.ban`
- `civ_female_loco_idle_observe_nervous.ban`
- `civ_female_loco_idle_observe_nervous_exit.ban`
- `civ_female_loco_idle_observe_nervous_oneoff_handonmouthhead.ban`
- `civ_female_loco_idle_observe_nervous_oneoff_handsonknee.ban`
- `civ_female_loco_idle_observe_nervous_oneoff_lookback.ban`
- `civ_female_loco_idle_observe_nervous_oneoff_lookbackpoint.ban`
- `civ_female_loco_idle_oneoff_weightshift.ban`
- `civ_female_loco_idle_rain.ban`
- `civ_male_loco_idle.ban`
- `civ_male_loco_idle_observe_curious.ban`
- `civ_male_loco_idle_observe_curious_oneoff_cellphonepic.ban`
- `civ_male_loco_idle_observe_curious_oneoff_disapproval.ban`
- `civ_male_loco_idle_observe_curious_oneoff_fingersnap.ban`
- `civ_male_loco_idle_observe_curious_oneoff_impressed.ban`
- `civ_male_loco_idle_observe_nervous.ban`
- `civ_male_loco_idle_observe_nervous_exit.ban`
- `civ_male_loco_idle_observe_nervous_oneoff_catchbreath.ban`
- `civ_male_loco_idle_observe_nervous_oneoff_gasping.ban`
- `civ_male_loco_idle_observe_nervous_oneoff_handcovermouth.ban`
- `civ_male_loco_idle_observe_nervous_oneoff_handonhead.ban`
- `civ_male_loco_idle_oneoff_weightshift.ban`
- `civ_male_loco_idle_panic_cower.ban`
- `civ_male_loco_idle_panic_cower_enter.ban`
- `civ_male_loco_idle_panic_cower_exit.ban`
- `civ_male_loco_idle_rain.ban`
- `civ_male_loco_idle_rotonspot_dir0.ban`
- `civ_male_loco_idle_rotonspot_dir180l.ban`
- `civ_male_loco_idle_rotonspot_dir180r.ban`
- `civ_male_loco_idle_rotonspot_dir90l.ban`
- `civ_male_loco_idle_rotonspot_dir90r.ban`

#### animations/characters/civilian/locomotion/idle/add/ {#animationscharacterscivilianlocomotionidleadd}

- `civ_male_loco_idle_75down_add.ban`
- `civ_male_loco_idle_75up_add.ban`
- `civ_male_loco_idle_observe_oneoff_far_cellphonepic_75down_add.ban`
- `civ_male_loco_idle_observe_oneoff_far_cellphonepic_75up_add.ban`

#### animations/characters/civilian/locomotion/idle/observe/partial/arms/ {#animationscharacterscivilianlocomotionidleobservepartialarms}

- `civ_male_loco_idle_observe_armscrossed_prtl_arms.ban`
- `civ_male_loco_idle_observe_armsonhips_prtl_arms.ban`

#### animations/characters/civilian/locomotion/idle/observe/partial/larm/ {#animationscharacterscivilianlocomotionidleobservepartiallarm}

- `civ_male_loco_idle_observe_armsonhips_prtl_larm.ban`

#### animations/characters/civilian/locomotion/idle/observe/partial/rarm/ {#animationscharacterscivilianlocomotionidleobservepartialrarm}

- `civ_male_loco_idle_observe_armsonhips_prtl_rarm.ban`

#### animations/characters/civilian/locomotion/jog/ {#animationscharacterscivilianlocomotionjog}

- `civ_male_loco_jog_anxious.ban`

#### animations/characters/civilian/locomotion/run/ {#animationscharacterscivilianlocomotionrun}

- `civ_female_loco_run_panic_hunch.ban`
- `civ_female_loco_run_panic_hunch_oneoffs_movingreactgunfire.ban`
- `civ_female_loco_run_panic_hunch_oneoffs_stumble.ban`
- `civ_female_loco_run_panic_hunch_var01.ban`
- `civ_female_loco_run_panic_normal.ban`
- `civ_female_loco_run_panic_start_dir0_hunch_lookleft.ban`
- `civ_female_loco_run_panic_start_dir0_hunch_lookright.ban`
- `civ_female_loco_run_panic_start_dir0_hunch_nolookat.ban`
- `civ_female_loco_run_panic_start_dir0_upright_lookleft.ban`
- `civ_female_loco_run_panic_start_dir0_upright_lookleft_var01.ban`
- `civ_female_loco_run_panic_start_dir0_upright_nolookat.ban`
- `civ_female_loco_run_panic_start_dir120l_hunch_lookleft.ban`
- `civ_female_loco_run_panic_start_dir120l_hunch_lookright.ban`
- `civ_female_loco_run_panic_start_dir120l_hunch_nolookat.ban`
- `civ_female_loco_run_panic_start_dir120r_hunch_lookleft.ban`
- `civ_female_loco_run_panic_start_dir120r_hunch_lookright.ban`
- `civ_female_loco_run_panic_start_dir120r_hunch_nolookat.ban`
- `civ_female_loco_run_panic_upright_oneoff_lookleftlookright.ban`
- `civ_female_loco_run_panic_upright_oneoff_tripped.ban`
- `civ_female_loco_run_panic_upright_var01.ban`
- `civ_male_loco_run_panic_exit.ban`
- `civ_male_loco_run_panic_exit_var01.ban`
- `civ_male_loco_run_panic_hunch.ban`
- `civ_male_loco_run_panic_hunch_oneoff_movingreactgunfire.ban`
- `civ_male_loco_run_panic_hunch_oneoffs_lookleft.ban`
- `civ_male_loco_run_panic_hunch_oneoffs_lookright.ban`
- `civ_male_loco_run_panic_hunch_oneoffs_stumble.ban`
- `civ_male_loco_run_panic_hunch_var02.ban`
- `civ_male_loco_run_panic_start_dir0_hunch_lookleft.ban`
- `civ_male_loco_run_panic_start_dir0_hunch_nolookat.ban`
- `civ_male_loco_run_panic_start_dir0_upright_lookleft.ban`
- `civ_male_loco_run_panic_start_dir0_upright_lookleft_var01.ban`
- `civ_male_loco_run_panic_start_dir0_upright_lookright.ban`
- `civ_male_loco_run_panic_start_dir0_upright_nolookat.ban`
- `civ_male_loco_run_panic_start_dir120l_upright_lookleft.ban`
- `civ_male_loco_run_panic_start_dir120l_upright_lookright.ban`
- `civ_male_loco_run_panic_start_dir120l_upright_nolookat.ban`
- `civ_male_loco_run_panic_start_dir120r_upright_lookleft.ban`
- `civ_male_loco_run_panic_start_dir120r_upright_lookright.ban`
- `civ_male_loco_run_panic_start_dir120r_upright_nolookat.ban`
- `civ_male_loco_run_panic_stop_dir0_upright.ban`
- `civ_male_loco_run_panic_stop_to_cower_dir0.ban`
- `civ_male_loco_run_panic_upright.ban`
- `civ_male_loco_run_panic_upright_oneoff_lookleft.ban`
- `civ_male_loco_run_panic_upright_oneoff_lookleftrightstop.ban`
- `civ_male_loco_run_panic_upright_oneoff_movingreactexplosion.ban`
- `civ_male_loco_run_panic_upright_oneoff_tripped.ban`
- `civ_male_loco_run_panic_upright_var01.ban`

#### animations/characters/civilian/locomotion/walk/ {#animationscharacterscivilianlocomotionwalk}

- `civ_female_loco_walk_nervous_fast_generic.ban`
- `civ_female_loco_walk_nervous_fast_generic_exit.ban`
- `civ_female_loco_walk_nervous_fast_generic_oneoff_lookleft.ban`
- `civ_female_loco_walk_nervous_fast_generic_oneoff_speedboost.ban`
- `civ_female_loco_walk_nervous_fast_generic_start_dir0.ban`
- `civ_female_loco_walk_nervous_fast_generic_start_dir120l.ban`
- `civ_female_loco_walk_nervous_fast_generic_start_dir120r.ban`
- `civ_female_loco_walk_nervous_fast_generic_stop_dir0.ban`
- `civ_female_loco_walk_nervous_fast_generic_stop_dir120l.ban`
- `civ_female_loco_walk_nervous_fast_generic_stop_dir120r.ban`
- `civ_female_loco_walk_rain_fast_upright.ban`
- `civ_female_loco_walk_rain_fast_upright_start_dir0.ban`
- `civ_female_loco_walk_rain_fast_upright_start_dir120l.ban`
- `civ_female_loco_walk_rain_fast_upright_start_dir120r.ban`
- `civ_female_loco_walk_rain_fast_upright_stop_dir0.ban`
- `civ_female_loco_walk_rain_fast_upright_stop_dir120l.ban`
- `civ_female_loco_walk_rain_fast_upright_stop_dir120r.ban`
- `civ_female_loco_walk_relax_fast_generic.ban`
- `civ_female_loco_walk_relax_fast_generic_start_dir0.ban`
- `civ_female_loco_walk_relax_fast_generic_start_dir120l.ban`
- `civ_female_loco_walk_relax_fast_generic_start_dir120r.ban`
- `civ_female_loco_walk_relax_fast_generic_stop_dir0.ban`
- `civ_female_loco_walk_relax_fast_generic_stop_dir120l.ban`
- `civ_female_loco_walk_relax_fast_generic_stop_dir120r.ban`
- `civ_female_loco_walk_relax_fast_generic_var01.ban`
- `civ_female_loco_walk_relax_normal_generic.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_adjustpants.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_adjustundergarment.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_bugbitescratch.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_checkpocket.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_checksky.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_coughintohand.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_curiouslook.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_dustpants.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_gettinglost.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_pickupmoney.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_sneezeintohand.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_stepongum.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_stretch.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_tieshoelace.ban`
- `civ_female_loco_walk_relax_normal_generic_oneoff_tripped.ban`
- `civ_female_loco_walk_relax_normal_generic_start_dir0.ban`
- `civ_female_loco_walk_relax_normal_generic_start_dir120l.ban`
- `civ_female_loco_walk_relax_normal_generic_start_dir120r.ban`
- `civ_female_loco_walk_relax_normal_generic_stop_dir0.ban`
- `civ_female_loco_walk_relax_normal_generic_stop_dir120l.ban`
- `civ_female_loco_walk_relax_normal_generic_stop_dir120r.ban`
- `civ_female_loco_walk_relax_slow_generic.ban`
- `civ_female_loco_walk_relax_slow_generic_start_dir0.ban`
- `civ_female_loco_walk_relax_slow_generic_start_dir120l.ban`
- `civ_female_loco_walk_relax_slow_generic_start_dir120r.ban`
- `civ_female_loco_walk_relax_slow_generic_stop_dir0.ban`
- `civ_female_loco_walk_relax_slow_generic_stop_dir120l.ban`
- `civ_female_loco_walk_relax_slow_generic_stop_dir120r.ban`
- `civ_male_loco_walk_initpanic_backoff.ban`
- `civ_male_loco_walk_nervous_fast_generic.ban`
- `civ_male_loco_walk_nervous_fast_generic_exit.ban`
- `civ_male_loco_walk_nervous_fast_generic_oneoff_lookleft.ban`
- `civ_male_loco_walk_nervous_fast_generic_oneoff_lookright.ban`
- `civ_male_loco_walk_nervous_fast_generic_start_dir0.ban`
- `civ_male_loco_walk_nervous_fast_generic_start_dir120l.ban`
- `civ_male_loco_walk_nervous_fast_generic_start_dir120r.ban`
- `civ_male_loco_walk_nervous_fast_generic_stop_dir0.ban`
- `civ_male_loco_walk_nervous_fast_generic_stop_dir120l.ban`
- `civ_male_loco_walk_nervous_fast_generic_stop_dir120r.ban`
- `civ_male_loco_walk_rain_fast_upright.ban`
- `civ_male_loco_walk_rain_fast_upright_start_dir0.ban`
- `civ_male_loco_walk_rain_fast_upright_start_dir120l.ban`
- `civ_male_loco_walk_rain_fast_upright_start_dir120r.ban`
- `civ_male_loco_walk_rain_fast_upright_stop_dir0.ban`
- `civ_male_loco_walk_rain_fast_upright_stop_dir120l.ban`
- `civ_male_loco_walk_rain_fast_upright_stop_dir120r.ban`
- `civ_male_loco_walk_relax_fast_generic.ban`
- `civ_male_loco_walk_relax_fast_generic_start_dir0.ban`
- `civ_male_loco_walk_relax_fast_generic_start_dir120l.ban`
- `civ_male_loco_walk_relax_fast_generic_start_dir120r.ban`
- `civ_male_loco_walk_relax_fast_generic_stop_dir0.ban`
- `civ_male_loco_walk_relax_fast_generic_stop_dir120l.ban`
- `civ_male_loco_walk_relax_fast_generic_stop_dir120r.ban`
- `civ_male_loco_walk_relax_normal_generic.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_adjustpants.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_checksky.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_coughintohand.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_curiouslook.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_dustshoulder.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_gettinglost.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_pickupmoney.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_smackbug.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_sneezeintohand.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_stepongum.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_stretch.ban`
- `civ_male_loco_walk_relax_normal_generic_oneoff_tripped.ban`
- `civ_male_loco_walk_relax_normal_generic_start_dir0.ban`
- `civ_male_loco_walk_relax_normal_generic_start_dir120l.ban`
- `civ_male_loco_walk_relax_normal_generic_start_dir120r.ban`
- `civ_male_loco_walk_relax_normal_generic_stop_dir0.ban`
- `civ_male_loco_walk_relax_normal_generic_stop_dir120l.ban`
- `civ_male_loco_walk_relax_normal_generic_stop_dir120r.ban`
- `civ_male_loco_walk_relax_normal_oneoff_checkpocket.ban`
- `civ_male_loco_walk_relax_normal_oneoff_tieshoelace.ban`
- `civ_male_loco_walk_relax_slow_generic.ban`
- `civ_male_loco_walk_relax_slow_generic_start_dir0.ban`
- `civ_male_loco_walk_relax_slow_generic_start_dir120l.ban`
- `civ_male_loco_walk_relax_slow_generic_start_dir120r.ban`
- `civ_male_loco_walk_relax_slow_generic_stop_dir0.ban`
- `civ_male_loco_walk_relax_slow_generic_stop_dir120l.ban`
- `civ_male_loco_walk_relax_slow_generic_stop_dir120r.ban`
- `civ_male_loco_walk_stairs_down.ban`
- `civ_male_loco_walk_stairs_up.ban`
- `civ_male_loco_walk_stop_dir0.ban`
- `civ_male_loco_walk_stop_dir120l.ban`
- `civ_male_loco_walk_stop_dir120r.ban`

#### animations/characters/civilian/locomotion/walk/lower/ {#animationscharacterscivilianlocomotionwalklower}

- `civ_male_loco_walk_stairs_down_lower.ban`
- `civ_male_loco_walk_stairs_up_lower.ban`

#### animations/characters/civilian/partial/arms_head/ {#animationscharacterscivilianpartialarms_head}

- `civ_male_oneoffs_sneeze_prtl_armshead.ban`
- `civ_male_readbook_prtl_armshead.ban`
- `civ_male_smokecigarette_enter_prtl_armshead.ban`
- `civ_male_textonphone_enter_prtl_armshead.ban`
- `civ_male_textonphone_exit_prtl_armshead.ban`
- `civ_male_textonphone_prtl_armshead.ban`

#### animations/characters/civilian/partial/left_arm/ {#animationscharacterscivilianpartialleft_arm}

- `civ_male_holdingbook_prtl_leftarm.ban`
- `civ_male_holdingbriefcase_prtl_leftarm.ban`
- `civ_male_holdingclutchbag_prtl_leftarm.ban`
- `civ_male_holdingnewspaper_prtl_leftarm.ban`
- `civ_male_holdingpurse_prtl_leftarm.ban`
- `civ_male_holdingpursevar02_prtl_leftarm.ban`
- `civ_male_holdingpursevar03_prtl_leftarm.ban`
- `civ_male_holdingshopingbag_prtl_leftarm.ban`
- `civ_male_holdingshopingbagvar01_prtl_leftarm.ban`
- `civ_male_holdingsoda_prtl_leftarm.ban`

#### animations/characters/civilian/partial/left_arm_head/ {#animationscharacterscivilianpartialleft_arm_head}

- `civ_male_oneoffs_cough_prtl_leftarmhead.ban`
- `civ_male_oneoffs_sniffles_prtl_leftarmhead.ban`
- `civ_male_smokecigarette_exit_prtl_leftarmhead.ban`
- `civ_male_smokecigarette_prtl_leftarmhead.ban`
- `civ_male_talkonphone_enter_prtl_leftarmhead.ban`
- `civ_male_talkonphone_exit_prtl_leftarmhead.ban`
- `civ_male_talkonphone_prtl_leftarmhead.ban`

#### animations/characters/civilian/partial/right_arm/ {#animationscharacterscivilianpartialright_arm}

- `civ_male_holdingnewspaper_prtl_rightarm.ban`

#### animations/characters/civilian/partial/right_arm_head/ {#animationscharacterscivilianpartialright_arm_head}

- `civ_male_oneoffs_bitenails_prtl_rightarmhead.ban`
- `civ_male_oneoffs_deepthought_prtl_rightarmhead.ban`
- `civ_male_oneoffs_flyswat_prtl_rightarmhead.ban`
- `civ_male_oneoffs_rubneck_prtl_rightarmhead.ban`
- `civ_male_oneoffs_scratchhead_prtl_rightarmhead.ban`

#### animations/characters/civilian/reaction/ {#animationscharacterscivilianreaction}

- `civ_female_react_high_dir0_hunchforward.ban`
- `civ_female_react_high_dir0_hunchleft.ban`
- `civ_female_react_high_dir0_hunchright.ban`
- `civ_female_react_high_dir0_uprightforward.ban`
- `civ_female_react_high_dir0_uprightleft.ban`
- `civ_female_react_high_dir0_uprightleft_var01.ban`
- `civ_female_react_high_dir0_uprightleft_var02.ban`
- `civ_female_react_high_dir0_uprightright.ban`
- `civ_female_react_high_dir120l_hunchforward.ban`
- `civ_female_react_high_dir120l_hunchleft.ban`
- `civ_female_react_high_dir120l_hunchright.ban`
- `civ_female_react_high_dir120l_uprightforward.ban`
- `civ_female_react_high_dir120l_uprightleft.ban`
- `civ_female_react_high_dir120l_uprightright.ban`
- `civ_female_react_high_dir120r_hunchforward.ban`
- `civ_female_react_high_dir120r_hunchleft.ban`
- `civ_female_react_high_dir120r_hunchright.ban`
- `civ_female_react_high_dir120r_uprightforward.ban`
- `civ_female_react_high_dir120r_uprightleft.ban`
- `civ_female_react_high_dir120r_uprightright.ban`
- `civ_female_react_med_dir120l_curious_toplayers_var01.ban`
- `civ_female_react_med_dir120r_curious_toplayers_var02.ban`
- `civ_female_react_med_dir120r_curious_toplayers_var03.ban`
- `civ_male_react_bump_dir0.ban`
- `civ_male_react_bump_dir120l.ban`
- `civ_male_react_bump_dir120r.ban`
- `civ_male_react_hi_threat_run_var01.ban`
- `civ_male_react_high_dir0.ban`
- `civ_male_react_high_dir0_hunchforward.ban`
- `civ_male_react_high_dir0_hunchleft.ban`
- `civ_male_react_high_dir0_hunchright.ban`
- `civ_male_react_high_dir0_uprightforward.ban`
- `civ_male_react_high_dir0_uprightleft.ban`
- `civ_male_react_high_dir0_uprightright.ban`
- `civ_male_react_high_dir120l.ban`
- `civ_male_react_high_dir120l_hunchforward.ban`
- `civ_male_react_high_dir120l_hunchleft.ban`
- `civ_male_react_high_dir120l_hunchright.ban`
- `civ_male_react_high_dir120l_uprightforward.ban`
- `civ_male_react_high_dir120l_uprightleft.ban`
- `civ_male_react_high_dir120l_uprightright.ban`
- `civ_male_react_high_dir120r_hunchforward.ban`
- `civ_male_react_high_dir120r_hunchleft.ban`
- `civ_male_react_high_dir120r_hunchright.ban`
- `civ_male_react_high_dir120r_uprightforward.ban`
- `civ_male_react_high_dir120r_uprightleft.ban`
- `civ_male_react_high_dir120r_uprightright.ban`
- `civ_male_react_init_panic_stumble.ban`
- `civ_male_react_lowmed_dir0.ban`
- `civ_male_react_lowmed_dir0_var01.ban`
- `civ_male_react_lowmed_dir0_var02.ban`
- `civ_male_react_lowmed_dir0_var03.ban`
- `civ_male_react_lowmed_dir0_var04.ban`
- `civ_male_react_lowmed_dir120l.ban`
- `civ_male_react_lowmed_dir120l_var03.ban`
- `civ_male_react_lowmed_dir120l_var04.ban`
- `civ_male_react_lowmed_dir120r.ban`
- `civ_male_react_lowmed_dir120r_var01.ban`
- `civ_male_react_lowmed_dir120r_var02.ban`
- `civ_male_react_med_dir0_curious_toplayers_var01.ban`
- `civ_male_react_med_dir0_curious_toplayers_var02.ban`
- `civ_male_react_med_dir120l_curious_toplayers.ban`
- `civ_male_react_med_dir120l_curious_toplayers_var01.ban`
- `civ_male_react_med_dir120r_curious_toplayers.ban`
- `civ_male_react_med_dir120r_curious_toplayers_var01.ban`

#### animations/characters/civilian/vehicle/car/low/ {#animationscharacterscivilianvehiclecarlow}

- `civ_male_vehi_car_low_driver_jumpout.ban`

#### animations/characters/civilian/vehicle/car/med/ {#animationscharacterscivilianvehiclecarmed}

- `civ_male_vehi_car_med_driver_jumpout.ban`

#### animations/characters/civilian_dlc/locomotion/idle/ {#animationscharacterscivilian_dlclocomotionidle}

- `civ_male_loco_idle_observe_angry_loop.ban`
- `civ_male_loco_idle_observe_angry_loop_var01.ban`
- `civ_male_loco_idle_observe_angry_loop_var02.ban`
- `civ_male_loco_idle_observe_angry_oneoff_comeatme.ban`
- `civ_male_loco_idle_observe_angry_oneoff_cursing.ban`
- `civ_male_loco_idle_observe_angry_oneoff_gonecuckoo.ban`
- `civ_male_loco_idle_observe_angry_oneoff_raisehand.ban`
- `civ_male_loco_idle_observe_angry_oneoff_threatenpunch.ban`
- `civ_male_loco_idle_observe_angry_oneoff_whatyoudoing.ban`
- `civ_male_loco_idle_observe_angry_resolve_turning_armswave.ban`
- `civ_male_loco_idle_observe_angry_resolve_turning_byeshrug.ban`
- `civ_male_loco_idle_observe_angry_resolve_turning_ciao.ban`
- `civ_male_loco_idle_observe_angry_resolve_turning_suityourself.ban`

#### animations/characters/contextact/civilian/dynamic/inspectdeadbody/ (Los Demonios) {#animationscharacterscontextactciviliandynamicinspectdeadbody-los-demonios}

- `ca_civ_dynamic_inspectdeadbody_bendforward_enter.ban`
- `ca_civ_dynamic_inspectdeadbody_bendforward_exit.ban`
- `ca_civ_dynamic_inspectdeadbody_bendforward_loop.ban`
- `ca_civ_dynamic_inspectdeadbody_bendforward_oneoff_puking.ban`
- `ca_civ_dynamic_inspectdeadbody_bendforward_oneoff_squatting.ban`

#### animations/characters/contextact/civilian/spsc/sitconversation/ {#animationscharacterscontextactcivilianspscsitconversation}

- `ca_spsc_civ_sitconversation_child_faceright_enter_135l.ban`
- `ca_spsc_civ_sitconversation_child_faceright_enter_135r.ban`
- `ca_spsc_civ_sitconversation_child_faceright_exit.ban`
- `ca_spsc_civ_sitconversation_child_faceright_listen_loop.ban`
- `ca_spsc_civ_sitconversation_child_faceright_listen_transto_talk.ban`
- `ca_spsc_civ_sitconversation_child_faceright_talk_loop.ban`
- `ca_spsc_civ_sitconversation_child_faceright_talk_transto_listen.ban`
- `ca_spsc_civ_sitconversation_parent_faceleft_enter.ban`
- `ca_spsc_civ_sitconversation_parent_faceleft_exit.ban`
- `ca_spsc_civ_sitconversation_parent_faceleft_idle.ban`
- `ca_spsc_civ_sitconversation_parent_faceleft_listen_loop.ban`
- `ca_spsc_civ_sitconversation_parent_faceleft_listen_transto_talk.ban`
- `ca_spsc_civ_sitconversation_parent_faceleft_talk_loop.ban`
- `ca_spsc_civ_sitconversation_parent_faceleft_talk_transto_listen.ban`

#### animations/characters/contextact/civilian/spsc/vendorbuyer/ {#animationscharacterscontextactcivilianspscvendorbuyer}

- `ca_civ_spsc_vendorbuyer_buyer_var00_enter_45l.ban`
- `ca_civ_spsc_vendorbuyer_buyer_var00_enter_45r.ban`
- `ca_civ_spsc_vendorbuyer_buyer_var00_exit.ban`
- `ca_civ_spsc_vendorbuyer_buyer_var00_loop.ban`
- `ca_civ_spsc_vendorbuyer_buyer_var00_oneoff_stepforward.ban`
- `ca_civ_spsc_vendorbuyer_buyer_var00_oneoff_talktoself.ban`
- `ca_civ_spsc_vendorbuyer_conversation_buyer_enter_45l.ban`
- `ca_civ_spsc_vendorbuyer_conversation_buyer_enter_45r.ban`
- `ca_civ_spsc_vendorbuyer_conversation_buyer_exit.ban`
- `ca_civ_spsc_vendorbuyer_conversation_buyer_listen_loop.ban`
- `ca_civ_spsc_vendorbuyer_conversation_buyer_listen_to_talk_transto.ban`
- `ca_civ_spsc_vendorbuyer_conversation_buyer_talk_loop.ban`
- `ca_civ_spsc_vendorbuyer_conversation_buyer_talk_to_listen_transto.ban`
- `ca_civ_spsc_vendorbuyer_conversation_vendor_enter.ban`
- `ca_civ_spsc_vendorbuyer_conversation_vendor_exit.ban`
- `ca_civ_spsc_vendorbuyer_conversation_vendor_listen_loop.ban`
- `ca_civ_spsc_vendorbuyer_conversation_vendor_listen_to_talk_transto.ban`
- `ca_civ_spsc_vendorbuyer_conversation_vendor_talk_loop.ban`
- `ca_civ_spsc_vendorbuyer_conversation_vendor_talk_to_listen_transto.ban`
- `ca_civ_spsc_vendorbuyer_promotegoods_buyer_enter_45l.ban`
- `ca_civ_spsc_vendorbuyer_promotegoods_buyer_enter_45r.ban`
- `ca_civ_spsc_vendorbuyer_promotegoods_buyer_exit.ban`
- `ca_civ_spsc_vendorbuyer_promotegoods_buyer_loop.ban`
- `ca_civ_spsc_vendorbuyer_promotegoods_vendor_enter.ban`
- `ca_civ_spsc_vendorbuyer_promotegoods_vendor_exit.ban`
- `ca_civ_spsc_vendorbuyer_promotegoods_vendor_loop.ban`
- `ca_civ_spsc_vendorbuyer_vendor_idle_loop.ban`

#### animations/characters/contextact/civilian/staged/bangondoorconcern/ {#animationscharacterscontextactcivilianstagedbangondoorconcern}

- `ca_civ_staged_bangondoorconcern_loop.ban`

#### animations/characters/contextact/civilian/staged/bartender/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedbartender-dare-devils-of-destruction}

- `ca_civ_staged_bartender_mixing_loop.ban`
- `ca_civ_staged_bartender_mixing_loop_oneoff_lookaround.ban`
- `ca_civ_staged_bartender_wipingwineglass_loop.ban`
- `ca_civ_staged_bartender_wipingwineglass_oneoff_inspectglass01.ban`
- `ca_civ_staged_bartender_wipingwineglass_oneoff_inspectglass02.ban`

#### animations/characters/contextact/civilian/staged/buskers/duet/ {#animationscharacterscontextactcivilianstagedbuskersduet}

- `ca_civ_staged_buskers_duet_guitar.ban`
- `ca_civ_staged_buskers_duet_quena.ban`

#### animations/characters/contextact/civilian/staged/buskers/peruvian/ {#animationscharacterscontextactcivilianstagedbuskersperuvian}

- `ca_civ_staged_buskers_peruvian_cuatro.ban`
- `ca_civ_staged_buskers_peruvian_pandeiro.ban`
- `ca_civ_staged_buskers_peruvian_panflute.ban`
- `ca_civ_staged_buskers_peruvian_quena.ban`

#### animations/characters/contextact/civilian/staged/buskers/samba/ {#animationscharacterscontextactcivilianstagedbuskerssamba}

- `ca_civ_staged_buskers_samba_cuatro.ban`
- `ca_civ_staged_buskers_samba_guitar.ban`
- `ca_civ_staged_buskers_samba_pandeiro.ban`

#### animations/characters/contextact/civilian/staged/buskers/solo/ {#animationscharacterscontextactcivilianstagedbuskerssolo}

- `ca_civ_staged_buskers_solo_drummer.ban`
- `ca_civ_staged_buskers_solo_panflute.ban`

#### animations/characters/contextact/civilian/staged/checkunderhood/ {#animationscharacterscontextactcivilianstagedcheckunderhood}

- `ca_civ_staged_checkunderhood_loop.ban`

#### animations/characters/contextact/civilian/staged/cleancar/ {#animationscharacterscontextactcivilianstagedcleancar}

- `ca_civ_staged_cleancar_crouched_loop.ban`
- `ca_civ_staged_cleancar_crouched_oneoff_differentstrokes.ban`
- `ca_civ_staged_cleancar_crouched_oneoff_shakesponge.ban`
- `ca_civ_staged_cleancar_standing_loop.ban`

#### animations/characters/contextact/civilian/staged/cleanfish/ {#animationscharacterscontextactcivilianstagedcleanfish}

- `ca_civ_staged_cleanfish_loop.ban`
- `ca_civ_staged_cleanfish_oneoff_pausetoexam.ban`

#### animations/characters/contextact/civilian/staged/cleanwindow/ {#animationscharacterscontextactcivilianstagedcleanwindow}

- `ca_civ_staged_cleanwindow_standing_loop.ban`

#### animations/characters/contextact/civilian/staged/clubbouncer/ {#animationscharacterscontextactcivilianstagedclubbouncer}

- `ca_civ_staged_clubbouncer_crossarm_loop.ban`
- `ca_civ_staged_clubbouncer_loop.ban`

#### animations/characters/contextact/civilian/staged/cower/ {#animationscharacterscontextactcivilianstagedcower}

- `ca_civ_staged_cower_oneoff_peekkneel.ban`
- `ca_civ_staged_cower_oneoff_peekstandupquick.ban`
- `ca_civ_staged_cower_oneoff_peekstandupslow.ban`

#### animations/characters/contextact/civilian/staged/dancing/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstageddancing-dare-devils-of-destruction}

- `ca_civ_staged_dancing_gentle_clapping_loop.ban`
- `ca_civ_staged_dancing_gentle_loop.ban`
- `ca_civ_staged_dancing_gentle_snappingfinger_loop.ban`
- `ca_civ_staged_dancing_mhc_djsantosi_loop.ban`
- `ca_civ_staged_dancing_mhc_greenman_loop.ban`
- `ca_civ_staged_dancing_rave_clapping_loop.ban`
- `ca_civ_staged_dancing_rave_glowsticks_loop.ban`
- `ca_civ_staged_dancing_rave_groove_loop.ban`
- `ca_civ_staged_dancing_rave_jump_loop.ban`
- `ca_civ_staged_dancing_rave_onspot_loop.ban`
- `ca_civ_staged_dancing_rave_shimmy_loop.ban`
- `ca_civ_staged_dancing_rave_sidetoside_loop.ban`
- `ca_civ_staged_dancing_rave_steppingsidetoside_loop.ban`
- `ca_civ_staged_dancing_rave_wavearms_loop.ban`
- `ca_civ_staged_dancing_rave_weavingarms_loop.ban`
- `ca_civ_staged_dancing_trippy_airplane_loop.ban`
- `ca_civ_staged_dancing_trippy_handsup_loop.ban`
- `ca_civ_staged_dancing_trippy_praisethesun_loop.ban`
- `ca_civ_staged_dancing_trippy_reachforthestars_loop.ban`
- `ca_civ_staged_dancing_trippy_spinning_loop.ban`
- `ca_civ_staged_dancing_trippy_stumbling_loop.ban`

#### animations/characters/contextact/civilian/staged/directingplane/ {#animationscharacterscontextactcivilianstageddirectingplane}

- `ca_civ_staged_directingplane_proceed_loop.ban`
- `ca_civ_staged_directingplane_waving_loop.ban`

#### animations/characters/contextact/civilian/staged/fixtire/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedfixtire-dare-devils-of-destruction}

- `ca_civ_staged_fixtire_interrupt.ban`
- `ca_civ_staged_fixtire_loop.ban`

#### animations/characters/contextact/civilian/staged/frolickinginwater/ {#animationscharacterscontextactcivilianstagedfrolickinginwater}

- `ca_civ_staged_frolickinginwater_alone_crouched_loop.ban`
- `ca_civ_staged_frolickinginwater_alone_standing_loop.ban`
- `ca_civ_staged_frolickinginwater_child_loop.ban`
- `ca_civ_staged_frolickinginwater_parent_loop.ban`

#### animations/characters/contextact/civilian/staged/garlandcrew/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedgarlandcrew-dare-devils-of-destruction}

- `ca_civ_staged_garlandcrew_sitonaudiocase_smoke_loop.ban`
- `ca_civ_staged_garlandcrew_squat_drinksoda_loop.ban`
- `ca_civ_staged_garlandcrew_squat_smoke_loop.ban`
- `ca_civ_staged_garlandcrew_stand_smoke_loop.ban`
- `ca_civ_staged_garlandcrew_stand_smoke_oneoff_checkcigarette.ban`
- `ca_civ_staged_garlandcrew_stand_smoke_oneoff_lookaround.ban`

#### animations/characters/contextact/civilian/staged/garlandpa/ {#animationscharacterscontextactcivilianstagedgarlandpa}

- `ca_civ_staged_garlandpa_clipboard_loop.ban`

#### animations/characters/contextact/civilian/staged/golfing/ {#animationscharacterscontextactcivilianstagedgolfing}

- `ca_civ_staged_golfing_loop.ban`
- `ca_civ_staged_golfing_oneoff_hitball.ban`

#### animations/characters/contextact/civilian/staged/graffiti/ {#animationscharacterscontextactcivilianstagedgraffiti}

- `ca_civ_staged_graffiti_loop.ban`
- `ca_civ_staged_graffiti_oneoff_shakecan.ban`
- `ca_civ_staged_graffiti_oneoff_stepback.ban`

#### animations/characters/contextact/civilian/staged/grilling/ {#animationscharacterscontextactcivilianstagedgrilling}

- `ca_civ_staged_grilling_bbqgrill_loop.ban`
- `ca_civ_staged_grilling_bbqgrill_oneoff_fanself.ban`
- `ca_civ_staged_grilling_bbqgrill_oneoff_scratch.ban`
- `ca_civ_staged_grilling_bbqgrill_oneoff_turnmeat.ban`

#### animations/characters/contextact/civilian/staged/handwashlaundry/ {#animationscharacterscontextactcivilianstagedhandwashlaundry}

- `ca_civ_staged_handwashlaundry_loop.ban`
- `ca_civ_staged_handwashlaundry_oneoff.ban`

#### animations/characters/contextact/civilian/staged/idlespying/ {#animationscharacterscontextactcivilianstagedidlespying}

- `ca_civ_staged_idlespying_exit.ban`
- `ca_civ_staged_idlespying_leanonwall_loop.ban`
- `ca_civ_staged_idlespying_loop.ban`
- `ca_civ_staged_idlespying_oneoff_lookaround.ban`
- `ca_civ_staged_idlespying_oneoff_peak.ban`

#### animations/characters/contextact/civilian/staged/inspectsupply/ (Danger Rising) {#animationscharacterscontextactcivilianstagedinspectsupply-danger-rising}

- `ca_civ_staged_inspectsupply_stand_loop.ban`

#### animations/characters/contextact/civilian/staged/investigate/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedinvestigate-dare-devils-of-destruction}

- `ca_civ_staged_crouchinvestigate_loop.ban`
- `ca_civ_staged_standinvestigate_loop.ban`
- `ca_civ_staged_standinvestigate_oneoff_crouchdown.ban`
- `ca_civ_staged_standinvestigate_oneoff_lookback.ban`

#### animations/characters/contextact/civilian/staged/labtyping/ {#animationscharacterscontextactcivilianstagedlabtyping}

- `civ_male_contextact_laboratory_typing.ban`

#### animations/characters/contextact/civilian/staged/leanoffrailing/ {#animationscharacterscontextactcivilianstagedleanoffrailing}

- `ca_civ_staged_leanoffrailing_armscrossed_loop.ban`
- `ca_civ_staged_leanoffrailing_elbowsup_loop.ban`
- `ca_civ_staged_leanoffrailing_leanback_loop.ban`
- `ca_civ_staged_leanoffrailing_leanleft_loop.ban`
- `ca_civ_staged_leanoffrailing_leanright_loop.ban`
- `ca_civ_staged_leanoffrailing_legscrossed_loop.ban`

#### animations/characters/contextact/civilian/staged/leanonbar/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedleanonbar-dare-devils-of-destruction}

- `ca_civ_staged_leanonbar_alone_loop.ban`
- `ca_civ_staged_leanonbar_alone_oneoff_lookingback.ban`
- `ca_civ_staged_leanonbar_alone_oneoff_sipping.ban`

#### animations/characters/contextact/civilian/staged/leanonledgeconversation/ {#animationscharacterscontextactcivilianstagedleanonledgeconversation}

- `ca_civ_staged_leanonledgeconversation_child_listen_loop.ban`
- `ca_civ_staged_leanonledgeconversation_child_listen_to_talk.ban`
- `ca_civ_staged_leanonledgeconversation_child_talk_loop.ban`
- `ca_civ_staged_leanonledgeconversation_child_talk_to_listen.ban`
- `ca_civ_staged_leanonledgeconversation_parent_listen_loop.ban`
- `ca_civ_staged_leanonledgeconversation_parent_listen_to_talk.ban`
- `ca_civ_staged_leanonledgeconversation_parent_talk_loop.ban`
- `ca_civ_staged_leanonledgeconversation_parent_talk_to_listen.ban`

#### animations/characters/contextact/civilian/staged/leanonrailing/ {#animationscharacterscontextactcivilianstagedleanonrailing}

- `ca_civ_staged_leanonrailing_armscrossed_loop.ban`
- `ca_civ_staged_leanonrailing_generic_loop.ban`
- `ca_civ_staged_leanonrailing_handsclasped_loop.ban`
- `ca_civ_staged_leanonrailing_leanleft_loop.ban`
- `ca_civ_staged_leanonrailing_leanright_loop.ban`
- `ca_civ_staged_leanonrailing_tiptoes_loop.ban`

#### animations/characters/contextact/civilian/staged/listentomusic/ {#animationscharacterscontextactcivilianstagedlistentomusic}

- `ca_civ_staged_listentomusic_sitting_armscrossed_loop.ban`
- `ca_civ_staged_listentomusic_sitting_leanforward_loop.ban`
- `ca_civ_staged_listentomusic_standing_armscrossed_loop.ban`
- `ca_civ_staged_listentomusic_standing_handsbehindback_loop.ban`

#### animations/characters/contextact/civilian/staged/loungeonbeach/ {#animationscharacterscontextactcivilianstagedloungeonbeach}

- `ca_civ_staged_loungeonbeach_layingdown_interrupt.ban`
- `ca_civ_staged_loungeonbeach_layingdown_loop.ban`
- `ca_civ_staged_loungeonbeach_layingdownvar01_loop.ban`
- `ca_civ_staged_loungeonbeach_layingdownvar02_loop.ban`
- `ca_civ_staged_loungeonbeach_sitting_interrupt.ban`
- `ca_civ_staged_loungeonbeach_sitting_loop.ban`
- `ca_civ_staged_loungeonbeach_sittingvar01_loop.ban`
- `ca_civ_staged_loungeonbeach_sittingvar02_loop.ban`

#### animations/characters/contextact/civilian/staged/massage/ {#animationscharacterscontextactcivilianstagedmassage}

- `ca_civ_staged_massage_child_loop.ban`
- `ca_civ_staged_massage_child_oneoff_deeptissue.ban`
- `ca_civ_staged_massage_child_oneoff_gentlespine.ban`
- `ca_civ_staged_massage_parent_interrupt.ban`
- `ca_civ_staged_massage_parent_loop.ban`
- `ca_civ_staged_massage_parent_oneoff_deeptissue.ban`
- `ca_civ_staged_massage_parent_oneoff_gentlespine.ban`

#### animations/characters/contextact/civilian/staged/miner/ {#animationscharacterscontextactcivilianstagedminer}

- `ca_civ_staged_miner_ground_digging_loop.ban`
- `ca_civ_staged_miner_ground_digging_oneoff_wipedustvar01.ban`
- `ca_civ_staged_miner_ground_digging_oneoff_wipedustvar02.ban`
- `ca_civ_staged_miner_ground_dusting_loop.ban`
- `ca_civ_staged_miner_ground_dusting_oneoff_inspect.ban`
- `ca_civ_staged_miner_wall_digging_loop.ban`
- `ca_civ_staged_miner_wall_digging_oneoff_wipedustvar01.ban`
- `ca_civ_staged_miner_wall_digging_oneoff_wipedustvar02.ban`
- `ca_civ_staged_miner_wall_dusting_crouch_loop.ban`
- `ca_civ_staged_miner_wall_dusting_crouch_oneoff_inspect.ban`

#### animations/characters/contextact/civilian/staged/phonepicture/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedphonepicture-dare-devils-of-destruction}

- `ca_civ_staged_phonepicture_loop.ban`
- `ca_civ_staged_phonepicture_oneoff_takeapictureleanback.ban`
- `ca_civ_staged_phonepicture_oneoff_takeapictureleanforward.ban`

#### animations/characters/contextact/civilian/staged/picnic/ {#animationscharacterscontextactcivilianstagedpicnic}

- `ca_civ_staged_picnic_cosycouple_child_interrupt.ban`
- `ca_civ_staged_picnic_cosycouple_child_loop.ban`
- `ca_civ_staged_picnic_cosycouple_parent_interrupt.ban`
- `ca_civ_staged_picnic_cosycouple_parent_loop.ban`
- `ca_civ_staged_picnic_relaxedcouple_child_interrupt.ban`
- `ca_civ_staged_picnic_relaxedcouple_child_loop.ban`
- `ca_civ_staged_picnic_relaxedcouple_parent_interrupt.ban`
- `ca_civ_staged_picnic_relaxedcouple_parent_loop.ban`

#### animations/characters/contextact/civilian/staged/polishshovel/ {#animationscharacterscontextactcivilianstagedpolishshovel}

- `ca_civ_staged_polishshovel_loop.ban`

#### animations/characters/contextact/civilian/staged/prisonerpacingonspot/ {#animationscharacterscontextactcivilianstagedprisonerpacingonspot}

- `ca_civ_staged_prisonerpacingonspot_angry_loop.ban`
- `ca_civ_staged_prisonerpacingonspot_frustrated_loop.ban`

#### animations/characters/contextact/civilian/staged/prisonersitonbench/ {#animationscharacterscontextactcivilianstagedprisonersitonbench}

- `ca_civ_staged_prisonersitonbench_generic_sadafraid_loop.ban`

#### animations/characters/contextact/civilian/staged/rakeground/ {#animationscharacterscontextactcivilianstagedrakeground}

- `ca_civ_staged_rakeground_default_loop.ban`
- `ca_civ_staged_rakeground_default_oneoff_wipeforehead.ban`
- `ca_civ_staged_rakeground_var01_loop.ban`
- `ca_civ_staged_rakeground_var01_oneoff_shakesoiloff.ban`

#### animations/characters/contextact/civilian/staged/reviewclipboard/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedreviewclipboard-dare-devils-of-destruction}

- `ca_civ_staged_reviewclipboard_child_loop.ban`
- `ca_civ_staged_reviewclipboard_parent_loop.ban`

#### animations/characters/contextact/civilian/staged/sitandfish/ {#animationscharacterscontextactcivilianstagedsitandfish}

- `ca_civ_staged_sitandfish_interrupt.ban`
- `ca_civ_staged_sitandfish_loop.ban`

#### animations/characters/contextact/civilian/staged/sitattable/ {#animationscharacterscontextactcivilianstagedsitattable}

- `ca_civ_staged_sitattable_drinking_loop.ban`
- `ca_civ_staged_sitattable_eatingsandwich_loop.ban`
- `ca_civ_staged_sitattable_generic_upright_loop.ban`
- `ca_civ_staged_sitattable_generic_uprightfemale_loop.ban`
- `ca_civ_staged_sitattable_reading_loop.ban`
- `ca_civ_staged_sitattable_smoking_loop.ban`
- `ca_civ_staged_sitattable_talkonphone_loop.ban`
- `ca_civ_staged_sitattable_talkonphoneelbowup_loop.ban`
- `ca_civ_staged_sitattable_textonphone_loop.ban`

#### animations/characters/contextact/civilian/staged/sitonbeachchair/ {#animationscharacterscontextactcivilianstagedsitonbeachchair}

- `ca_civ_staged_sitonbeachchair_crossleg_loop.ban`
- `ca_civ_staged_sitonbeachchair_handsinlap_loop.ban`
- `ca_civ_staged_sitonbeachchair_handsinlapvar01_loop.ban`
- `ca_civ_staged_sitonbeachchair_handsonhead_loop.ban`
- `ca_civ_staged_sitonbeachchair_upright_loop.ban`
- `ca_civ_staged_sitonbeachchair_uprightvar01_loop.ban`

#### animations/characters/contextact/civilian/staged/sitonbenchtalk/ {#animationscharacterscontextactcivilianstagedsitonbenchtalk}

- `civ_male_sitonbenchtalk_child.ban`
- `civ_male_sitonbenchtalk_child_var01.ban`
- `civ_male_sitonbenchtalk_child_var02.ban`
- `civ_male_sitonbenchtalk_parent.ban`
- `civ_male_sitonbenchtalk_parent_var01.ban`
- `civ_male_sitonbenchtalk_parent_var02.ban`

#### animations/characters/contextact/civilian/staged/sitoncar/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedsitoncar-dare-devils-of-destruction}

- `ca_civ_staged_sitoncar_drink_crossleg_interrupt.ban`
- `ca_civ_staged_sitoncar_drink_crossleg_loop.ban`
- `ca_civ_staged_sitoncar_eat_loop.ban`
- `ca_civ_staged_sitoncar_generic_leanback_interrupt_jumpdown.ban`
- `ca_civ_staged_sitoncar_generic_leanback_loop.ban`
- `ca_civ_staged_sitoncar_generic_leanback_oneoff_legswing.ban`
- `ca_civ_staged_sitoncar_generic_leanback_oneoff_shiftweight.ban`
- `ca_civ_staged_sitoncar_generic_leanforward_interrupt_sittingsurface.ban`
- `ca_civ_staged_sitoncar_generic_leanforward_loop.ban`
- `ca_civ_staged_sitoncar_generic_leanforward_oneoff_touchnose.ban`
- `ca_civ_staged_sitoncar_generic_leanforward_oneoff_wipeforehead.ban`
- `ca_civ_staged_sitoncar_interrupt_generic.ban`
- `ca_civ_staged_sitoncar_read_crossleg_interrupt.ban`
- `ca_civ_staged_sitoncar_read_crossleg_loop.ban`
- `ca_civ_staged_sitoncar_smoke_crossleg_interrupt.ban`
- `ca_civ_staged_sitoncar_smoke_crossleg_loop.ban`
- `ca_civ_staged_sitoncar_smoke_leftlegup_interrupt.ban`
- `ca_civ_staged_sitoncar_smoke_leftlegup_loop.ban`
- `ca_civ_staged_sitoncar_texting_plain_loop.ban`

#### animations/characters/contextact/civilian/staged/sitonchair/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedsitonchair-dare-devils-of-destruction}

- `ca_civ_staged_sitonchair_drinking_loop.ban`
- `ca_civ_staged_sitonchair_eatingsandwich_loop.ban`
- `ca_civ_staged_sitonchair_generic_crossleg_loop.ban`
- `ca_civ_staged_sitonchair_generic_elbowsonleg_loop.ban`
- `ca_civ_staged_sitonchair_generic_handsonhead_loop.ban`
- `ca_civ_staged_sitonchair_generic_upright_loop.ban`
- `ca_civ_staged_sitonchair_generic_upright_oneoff_leanforward.ban`
- `ca_civ_staged_sitonchair_generic_upright_oneoff_wipeface.ban`
- `ca_civ_staged_sitonchair_generic_uprightfemale_loop.ban`
- `ca_civ_staged_sitonchair_generic_uprightfemale_oneoff_handonthigh.ban`
- `ca_civ_staged_sitonchair_generic_uprightfemale_oneoff_weightchange.ban`
- `ca_civ_staged_sitonchair_interrupt.ban`
- `ca_civ_staged_sitonchair_leftinterrupt.ban`
- `ca_civ_staged_sitonchair_reading_loop.ban`
- `ca_civ_staged_sitonchair_rightinterrupt.ban`
- `ca_civ_staged_sitonchair_smoking_loop.ban`
- `ca_civ_staged_sitonchair_talkonphone_loop.ban`
- `ca_civ_staged_sitonchair_talkonphoneelbowup_loop.ban`
- `ca_civ_staged_sitonchair_textonphone_loop.ban`

#### animations/characters/contextact/civilian/staged/sitonground/ {#animationscharacterscontextactcivilianstagedsitonground}

- `ca_civ_staged_sitonground_browsephone_crosslegged_loop.ban`
- `ca_civ_staged_sitonground_browsephone_crosslegged_oneoff_lookup.ban`
- `ca_civ_staged_sitonground_browsephone_layingdown_loop.ban`
- `ca_civ_staged_sitonground_crosslegged_leanback_loop.ban`
- `ca_civ_staged_sitonground_crosslegged_leanforward_loop.ban`
- `ca_civ_staged_sitonground_crosslegged_leanleft_loop.ban`
- `ca_civ_staged_sitonground_crosslegged_leanright_loop.ban`
- `ca_civ_staged_sitonground_handsonleftknee_loop.ban`
- `ca_civ_staged_sitonground_handsonrightknee_loop.ban`
- `ca_civ_staged_sitonground_interrupt.ban`
- `ca_civ_staged_sitonground_kneesup_loop.ban`
- `ca_civ_staged_sitonground_leanbackleftlegup_loop.ban`
- `ca_civ_staged_sitonground_leftlegup_leanback_loop.ban`
- `ca_civ_staged_sitonground_legscrossed_loop.ban`
- `ca_civ_staged_sitonground_rightlegup_leanback_loop.ban`
- `ca_civ_staged_sitonground_rightlegup_loop.ban`
- `ca_civ_staged_sitonground_rightlegup_oneoff_lookatsky.ban`
- `ca_civ_staged_sitonground_spreadeagle_loop.ban`
- `ca_civ_staged_sitonground_spreadeagle_oneoff_checkforrain.ban`
- `ca_civ_staged_sitonground_spreadeagle_oneoff_legadjust.ban`
- `ca_civ_staged_sitonground_spreadeagle_oneoff_weightadjust.ban`
- `ca_civ_staged_sitonground_talkatphone_leftarmup_loop.ban`
- `ca_civ_staged_sitonground_talkonphone_leanbackleft_loop.ban`
- `ca_civ_staged_sitonground_talkonphone_leanbackright_loop.ban`
- `ca_civ_staged_sitonground_talkonphone_rightarmup_loop.ban`
- `ca_civ_staged_sitonground_texting_squatting_loop.ban`
- `ca_civ_staged_sitonground_texting_squatting_oneoff_lookaround.ban`
- `ca_civ_staged_sitonground_texting_squatting_oneoff_weightshift.ban`

#### animations/characters/contextact/civilian/staged/sitonledge/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedsitonledge-dare-devils-of-destruction}

- `ca_civ_staged_sitonledge_armsonlegs_loop.ban`
- `ca_civ_staged_sitonledge_drinking_loop.ban`
- `ca_civ_staged_sitonledge_generic_loop.ban`
- `ca_civ_staged_sitonledge_interrupt.ban`
- `ca_civ_staged_sitonledge_leanback_loop.ban`
- `ca_civ_staged_sitonledge_legscrossed_loop.ban`
- `ca_civ_staged_sitonledge_legup_loop.ban`
- `ca_civ_staged_sitonledge_smoking_loop.ban`

#### animations/characters/contextact/civilian/staged/sitonledgeconversation/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedsitonledgeconversation-dare-devils-of-destruction}

- `ca_civ_staged_sitonledgeconversation_child_listen_loop.ban`
- `ca_civ_staged_sitonledgeconversation_child_listen_to_talk_transto.ban`
- `ca_civ_staged_sitonledgeconversation_child_talk_loop.ban`
- `ca_civ_staged_sitonledgeconversation_child_talk_to_listen_transto.ban`
- `ca_civ_staged_sitonledgeconversation_parent_listen_loop.ban`
- `ca_civ_staged_sitonledgeconversation_parent_listen_to_talk_transto.ban`
- `ca_civ_staged_sitonledgeconversation_parent_talk_loop.ban`
- `ca_civ_staged_sitonledgeconversation_parent_talk_to_listen_transto.ban`

#### animations/characters/contextact/civilian/staged/situsecomputer/ {#animationscharacterscontextactcivilianstagedsitusecomputer}

- `ca_civ_staged_situsecomputer.ban`
- `ca_civ_staged_situsecomputer_interrupt.ban`

#### animations/characters/contextact/civilian/staged/soccertrickonknee/ {#animationscharacterscontextactcivilianstagedsoccertrickonknee}

- `ca_civ_staged_soccertrickonknee_loop.ban`

#### animations/characters/contextact/civilian/staged/spearfishing/ {#animationscharacterscontextactcivilianstagedspearfishing}

- `ca_civ_staged_spearfishing_legsbent_loop.ban`
- `ca_civ_staged_spearfishing_legsbent_oneoff.ban`
- `ca_civ_staged_spearfishing_loop.ban`

#### animations/characters/contextact/civilian/staged/standandfish/ {#animationscharacterscontextactcivilianstagedstandandfish}

- `ca_civ_staged_standandfish_loop.ban`

#### animations/characters/contextact/civilian/staged/standconversationconcern/ {#animationscharacterscontextactcivilianstagedstandconversationconcern}

- `ca_civ_staged_standconversationconcern_child_listen_loop.ban`
- `ca_civ_staged_standconversationconcern_child_listen_to_talk_transto.ban`
- `ca_civ_staged_standconversationconcern_child_talk_loop.ban`
- `ca_civ_staged_standconversationconcern_child_talk_to_listen_transto.ban`
- `ca_civ_staged_standconversationconcern_parent_listen_loop.ban`
- `ca_civ_staged_standconversationconcern_parent_listen_to_talk_transto.ban`
- `ca_civ_staged_standconversationconcern_parent_talk_loop.ban`
- `ca_civ_staged_standconversationconcern_parent_talk_to_listen_transto.ban`

#### animations/characters/contextact/civilian/staged/standingaround/ {#animationscharacterscontextactcivilianstagedstandingaround}

- `ca_civ_staged_standingaround_drinking_loop.ban`
- `ca_civ_staged_standingaround_smoking_loop.ban`
- `ca_civ_staged_standingaround_smoking_oneoff_checkcigarette.ban`
- `ca_civ_staged_standingaround_smoking_oneoff_lookaround.ban`
- `ca_civ_staged_standingaround_smokingvar01_loop.ban`
- `ca_civ_staged_standingaround_talkonphone_angry_loop.ban`
- `ca_civ_staged_standingaround_talkonphone_angryvar01_loop.ban`
- `ca_civ_staged_standingaround_talkonphone_casual_loop.ban`
- `ca_civ_staged_standingaround_talkonphone_casualvar01_loop.ban`
- `ca_civ_staged_standingaround_texting_loop.ban`

#### animations/characters/contextact/civilian/staged/standtalk_normal/arms/ {#animationscharacterscontextactcivilianstagedstandtalk_normalarms}

- `civ_male_standtalk_normal_child_arms.ban`
- `civ_male_standtalk_normal_parent_arms.ban`

#### animations/characters/contextact/civilian/staged/standtalk_normal/hands/ {#animationscharacterscontextactcivilianstagedstandtalk_normalhands}

- `civ_male_standtalk_normal_child_hands.ban`
- `civ_male_standtalk_normal_parent_hands.ban`

#### animations/characters/contextact/civilian/staged/standtalk_normal/noarms/ {#animationscharacterscontextactcivilianstagedstandtalk_normalnoarms}

- `civ_male_standtalk_normal_child_noarms.ban`
- `civ_male_standtalk_normal_parent_noarms.ban`

#### animations/characters/contextact/civilian/staged/strollandcollect/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedstrollandcollect-dare-devils-of-destruction}

- `ca_civ_staged_strollandcollect_loop.ban`
- `ca_civ_staged_strollandcollect_loop_f000_lookbackleft.ban`
- `ca_civ_staged_strollandcollect_loop_f037_pickup.ban`
- `ca_civ_staged_strollandcollect_loop_f376_lookbackleft.ban`
- `ca_civ_staged_strollandcollect_loop_f413_pickup.ban`

#### animations/characters/contextact/civilian/staged/stuntdriver/ {#animationscharacterscontextactcivilianstagedstuntdriver}

- `ca_civ_staged_stuntdriver_coolhang_exit.ban`
- `ca_civ_staged_stuntdriver_coolhang_loop.ban`
- `ca_civ_staged_stuntdriver_coolhang_oneoff_handsonhead.ban`
- `ca_civ_staged_stuntdriver_coolhang_oneoff_lookback.ban`
- `ca_civ_staged_stuntdriver_coolhang_oneoff_stretch.ban`

#### animations/characters/contextact/civilian/staged/sweep/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedsweep-dare-devils-of-destruction}

- `ca_civ_staged_sweep_loop.ban`
- `ca_civ_staged_sweep_oneoff_stepforward.ban`

#### animations/characters/contextact/civilian/staged/swingpickaxe/ {#animationscharacterscontextactcivilianstagedswingpickaxe}

- `ca_civ_staged_swingpickaxe_hipdrop_loop.ban`
- `ca_civ_staged_swingpickaxe_hipdrop_oneoff_pullpickaxeup.ban`

#### animations/characters/contextact/civilian/staged/takepicture/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedtakepicture-dare-devils-of-destruction}

- `ca_civ_staged_takepicture_loop.ban`
- `ca_civ_staged_takepicture_oneoff_look.ban`

#### animations/characters/contextact/civilian/staged/takeselfie/ {#animationscharacterscontextactcivilianstagedtakeselfie}

- `ca_civ_staged_takeselfie_loop.ban`
- `ca_civ_staged_takeselfie_oneoff.ban`
- `ca_civ_staged_takeselfievar01_loop.ban`
- `ca_civ_staged_takeselfievar01_oneoff.ban`

#### animations/characters/contextact/civilian/staged/usebinoculars/ (Los Demonios) {#animationscharacterscontextactcivilianstagedusebinoculars-los-demonios}

- `ca_civ_staged_usebinoculars_briefrico_talk_loop.ban`
- `ca_civ_staged_usebinoculars_briefrico_talk_to_watch_transto.ban`
- `ca_civ_staged_usebinoculars_briefrico_watch_loop.ban`
- `ca_civ_staged_usebinoculars_briefrico_watch_to_talk_transto.ban`

#### animations/characters/contextact/civilian/staged/usegaspump/ {#animationscharacterscontextactcivilianstagedusegaspump}

- `ca_civ_staged_usegaspump_loop.ban`

#### animations/characters/contextact/civilian/staged/usemetaldetector/ {#animationscharacterscontextactcivilianstagedusemetaldetector}

- `ca_civ_staged_usemetaldetector_loop.ban`
- `ca_civ_staged_usemetaldetector_oneoff_badcontact.ban`
- `ca_civ_staged_usemetaldetector_oneoff_glimpseatscreen.ban`

#### animations/characters/contextact/civilian/staged/usetelescope/ {#animationscharacterscontextactcivilianstagedusetelescope}

- `ca_civ_staged_usetelescope_child_loop.ban`
- `ca_civ_staged_usetelescope_child_oneoff_lookup.ban`
- `ca_civ_staged_usetelescope_child_oneoff_taketurns.ban`
- `ca_civ_staged_usetelescope_parent_loop.ban`
- `ca_civ_staged_usetelescope_parent_oneoff_lookup.ban`
- `ca_civ_staged_usetelescope_parent_oneoff_taketurns.ban`

#### animations/characters/contextact/civilian/staged/vagrant/ {#animationscharacterscontextactcivilianstagedvagrant}

- `ca_civ_staged_vagrant_begging_interrupt.ban`
- `ca_civ_staged_vagrant_begging_loop.ban`
- `ca_civ_staged_vagrant_begging_oneoff_battingflies.ban`
- `ca_civ_staged_vagrant_begging_oneoff_checkcup.ban`
- `ca_civ_staged_vagrant_begging_oneoff_fallingasleep.ban`
- `ca_civ_staged_vagrant_begging_oneoff_lookaround.ban`
- `ca_civ_staged_vagrant_rummagetrash_crouched_loop.ban`
- `ca_civ_staged_vagrant_rummagetrash_crouched_oneoff_inspectkeep.ban`
- `ca_civ_staged_vagrant_rummagetrash_crouched_oneoff_inspectthrowaway.ban`
- `ca_civ_staged_vagrant_rummagetrash_standing_loop.ban`
- `ca_civ_staged_vagrant_rummagetrash_standing_oneoff_inspect.ban`
- `ca_civ_staged_vagrant_rummagetrash_standing_oneoff_inspectstandup.ban`
- `ca_civ_staged_vagrant_sleeponbench_interrupt.ban`
- `ca_civ_staged_vagrant_sleeponbench_loop.ban`
- `ca_civ_staged_vagrant_sleeponbench_oneoff_readjust.ban`

#### animations/characters/contextact/civilian/staged/waitingforfriend/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedwaitingforfriend-dare-devils-of-destruction}

- `ca_civ_staged_waitingforfriend_crossarm_loop.ban`
- `ca_civ_staged_waitingforfriend_generic_loop.ban`
- `ca_civ_staged_waitingforfriend_generic_oneoff_lookatwatch.ban`
- `ca_civ_staged_waitingforfriend_generic_oneoff_scratch.ban`
- `ca_civ_staged_waitingforfriend_handsback_loop.ban`
- `ca_civ_staged_waitingforfriend_handsonhip_loop.ban`
- `ca_civ_staged_waitingforfriend_onehandonhip_loop.ban`

#### animations/characters/contextact/civilian/staged/waitinline/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedwaitinline-dare-devils-of-destruction}

- `ca_civ_staged_waitinline_crossarm_loop.ban`
- `ca_civ_staged_waitinline_frontbackhappy_child_loop.ban`
- `ca_civ_staged_waitinline_frontbackhappy_parent_loop.ban`
- `ca_civ_staged_waitinline_handsback_loop.ban`
- `ca_civ_staged_waitinline_handsonwaist_loop.ban`
- `ca_civ_staged_waitinline_lookaround_loop.ban`
- `ca_civ_staged_waitinline_lookaroundvar01_loop.ban`
- `ca_civ_staged_waitinline_onehandonwaist_loop.ban`

#### animations/characters/contextact/civilian/staged/welding/ (Dare Devils of Destruction) {#animationscharacterscontextactcivilianstagedwelding-dare-devils-of-destruction}

- `ca_civ_staged_welding_crouched_loop.ban`
- `ca_civ_staged_welding_crouched_oneoff_burnhand.ban`
- `ca_civ_staged_welding_crouched_oneoff_pause.ban`
- `ca_civ_staged_welding_standing_loop.ban`
- `ca_civ_staged_welding_standing_oneoff_blinded.ban`
- `ca_civ_staged_welding_standing_oneoff_brushoffleg.ban`

#### animations/characters/contextact/civilian/staged/windowshopping/ {#animationscharacterscontextactcivilianstagedwindowshopping}

- `ca_civ_staged_windowshopping_argue_child.ban`
- `ca_civ_staged_windowshopping_argue_parent.ban`
- `ca_civ_staged_windowshopping_romantic_child.ban`
- `ca_civ_staged_windowshopping_romantic_parent.ban`

#### animations/characters/contextact/civilian/staged/workout/ {#animationscharacterscontextactcivilianstagedworkout}

- `ca_civ_staged_workout_burpees_interrupt_air.ban`
- `ca_civ_staged_workout_burpees_interrupt_ground.ban`
- `ca_civ_staged_workout_burpees_loop.ban`
- `ca_civ_staged_workout_jumpingjack_loop.ban`
- `ca_civ_staged_workout_pushup_interrupt.ban`
- `ca_civ_staged_workout_pushup_loop.ban`
- `ca_civ_staged_workout_situp_interrupt.ban`
- `ca_civ_staged_workout_situp_loop.ban`

#### animations/characters/contextact/civilian/systemic/bangondoorpanic/ (Dare Devils of Destruction) {#animationscharacterscontextactciviliansystemicbangondoorpanic-dare-devils-of-destruction}

- `ca_civ_systemic_bangondoorpanic_enter_0.ban`
- `ca_civ_systemic_bangondoorpanic_enter_90l.ban`
- `ca_civ_systemic_bangondoorpanic_enter_90r.ban`
- `ca_civ_systemic_bangondoorpanic_exit.ban`
- `ca_civ_systemic_bangondoorpanic_loop.ban`
- `ca_civ_systemic_bangondoorpanic_oneff_duck.ban`
- `ca_civ_systemic_bangondoorpanic_oneff_turnaround.ban`

#### animations/characters/contextact/civilian/systemic/conversation/ (Danger Rising) {#animationscharacterscontextactciviliansystemicconversation-danger-rising}

- `civ_male_conversation_stand_lft_listen_generic_loop.ban`
- `civ_male_conversation_stand_lft_talk_generic_enter_from_stand_listen_generic.ban`
- `civ_male_conversation_stand_lft_talk_generic_exit_to_stand_listen_generic.ban`
- `civ_male_conversation_stand_lft_talk_generic_loop.ban`
- `civ_male_conversation_stand_rgt_listen_generic_loop.ban`
- `civ_male_conversation_stand_rgt_talk_generic_enter_from_stand_listen_generic.ban`
- `civ_male_conversation_stand_rgt_talk_generic_exit_to_stand_listen_generic.ban`
- `civ_male_conversation_stand_rgt_talk_generic_loop.ban`

#### animations/characters/contextact/civilian/systemic/dancing/ {#animationscharacterscontextactciviliansystemicdancing}

- `ca_civ_systemic_dance_enter_0.ban`
- `ca_civ_systemic_dance_enter_120l.ban`
- `ca_civ_systemic_dance_enter_120r.ban`
- `ca_civ_systemic_dance_exit.ban`
- `ca_civ_systemic_dance_loop.ban`

#### animations/characters/contextact/civilian/systemic/henryhong/ (Dare Devils of Destruction) {#animationscharacterscontextactciviliansystemichenryhong-dare-devils-of-destruction}

- `ca_civ_systemic_henryhong_takepicture_enter_0.ban`
- `ca_civ_systemic_henryhong_takepicture_enter_120l.ban`
- `ca_civ_systemic_henryhong_takepicture_enter_120r.ban`
- `ca_civ_systemic_henryhong_takepicture_exit.ban`
- `ca_civ_systemic_henryhong_takepicture_loop.ban`

#### animations/characters/contextact/civilian/systemic/huddleawning/ {#animationscharacterscontextactciviliansystemichuddleawning}

- `ca_civ_systemic_huddleawning_crossarm_enter_135l.ban`
- `ca_civ_systemic_huddleawning_crossarm_enter_135r.ban`
- `ca_civ_systemic_huddleawning_crossarm_loop.ban`
- `ca_civ_systemic_huddleawning_crossarm_oneoff_rhandshakewater.ban`
- `ca_civ_systemic_huddleawning_crossarm_oneoff_touchnose.ban`
- `ca_civ_systemic_huddleawning_crossarm_resolve.ban`
- `ca_civ_systemic_huddleawning_crossarmfemale_enter_135l.ban`
- `ca_civ_systemic_huddleawning_crossarmfemale_enter_135r.ban`
- `ca_civ_systemic_huddleawning_crossarmfemale_loop.ban`
- `ca_civ_systemic_huddleawning_crossarmfemale_resolve.ban`

#### animations/characters/contextact/civilian/systemic/leanonwall/generic/ (Dare Devils of Destruction) {#animationscharacterscontextactciviliansystemicleanonwallgeneric-dare-devils-of-destruction}

- `ca_civ_systemic_leanonwall_generic_crossleg_enter_135l.ban`
- `ca_civ_systemic_leanonwall_generic_crossleg_enter_135r.ban`
- `ca_civ_systemic_leanonwall_generic_crossleg_exit.ban`
- `ca_civ_systemic_leanonwall_generic_crossleg_loop.ban`
- `ca_civ_systemic_leanonwall_generic_crossleg_oneoff_handpatwall.ban`

#### animations/characters/contextact/civilian/systemic/leanonwall/smoking/ {#animationscharacterscontextactciviliansystemicleanonwallsmoking}

- `ca_civ_systemic_leanonwall_smoking_crossleg_enter_135l.ban`
- `ca_civ_systemic_leanonwall_smoking_crossleg_enter_135r.ban`
- `ca_civ_systemic_leanonwall_smoking_crossleg_exit.ban`
- `ca_civ_systemic_leanonwall_smoking_crossleg_loop.ban`
- `ca_civ_systemic_leanonwall_smoking_crossleg_oneoff_inhale.ban`

#### animations/characters/contextact/civilian/systemic/leanonwall/texting/ {#animationscharacterscontextactciviliansystemicleanonwalltexting}

- `ca_civ_systemic_leanonwall_texing_plain_enter_135l.ban`
- `ca_civ_systemic_leanonwall_texing_plain_enter_135r.ban`
- `ca_civ_systemic_leanonwall_texing_plain_exit.ban`
- `ca_civ_systemic_leanonwall_texing_plain_loop.ban`
- `ca_civ_systemic_leanonwall_texting_crossleg_enter_135l.ban`
- `ca_civ_systemic_leanonwall_texting_crossleg_enter_135r.ban`
- `ca_civ_systemic_leanonwall_texting_crossleg_exit.ban`
- `ca_civ_systemic_leanonwall_texting_crossleg_loop.ban`

#### animations/characters/contextact/civilian/systemic/prisonerleanonwall/ {#animationscharacterscontextactciviliansystemicprisonerleanonwall}

- `ca_civ_systemic_prisonerleanonwall_generic_crossleg_enter_135l.ban`
- `ca_civ_systemic_prisonerleanonwall_generic_crossleg_enter_135r.ban`
- `ca_civ_systemic_prisonerleanonwall_generic_crossleg_exit.ban`
- `ca_civ_systemic_prisonerleanonwall_generic_crossleg_loop.ban`

#### animations/characters/contextact/civilian/systemic/prisonersitonground/ {#animationscharacterscontextactciviliansystemicprisonersitonground}

- `ca_civ_systemic_prisonersitonground_generic_sadafraid_enter_45l.ban`
- `ca_civ_systemic_prisonersitonground_generic_sadafraid_enter_45r.ban`
- `ca_civ_systemic_prisonersitonground_generic_sadafraid_exit.ban`
- `ca_civ_systemic_prisonersitonground_generic_sadafraid_interrupt.ban`
- `ca_civ_systemic_prisonersitonground_generic_sadafraid_loop.ban`

#### animations/characters/contextact/civilian/systemic/sitonbench/ {#animationscharacterscontextactciviliansystemicsitonbench}

- `ca_civ_systemic_sitonbench_talkonphone_enter_135l.ban`
- `ca_civ_systemic_sitonbench_talkonphone_enter_135r.ban`
- `ca_civ_systemic_sitonbench_talkonphone_exit.ban`
- `ca_civ_systemic_sitonbench_talkonphone_loop.ban`
- `ca_civ_systemic_sitonbench_textonphone_enter_135l.ban`
- `ca_civ_systemic_sitonbench_textonphone_enter_135r.ban`
- `ca_civ_systemic_sitonbench_textonphone_exit.ban`
- `ca_civ_systemic_sitonbench_textonphone_loop.ban`

#### animations/characters/contextact/civilian/systemic/sitonchair/add/ (Danger Rising) {#animationscharacterscontextactciviliansystemicsitonchairadd-danger-rising}

- `civ_male_sitonchair_75down_add.ban`
- `civ_male_sitonchair_75l_add.ban`
- `civ_male_sitonchair_75r_add.ban`
- `civ_male_sitonchair_75up_add.ban`

#### animations/characters/contextact/civilian/systemic/throwtrash/ {#animationscharacterscontextactciviliansystemicthrowtrash}

- `ca_civ_systemic_throwtrash_enter_45l.ban`
- `ca_civ_systemic_throwtrash_enter_45r.ban`
- `ca_civ_systemic_throwtrash_exit.ban`
- `ca_civ_systemic_throwtrash_oneoff.ban`

#### animations/characters/contextact/civilian/systemic/usehackingconsole/ {#animationscharacterscontextactciviliansystemicusehackingconsole}

- `ca_civ_systemic_usehackingconsole_enter_0.ban`
- `ca_civ_systemic_usehackingconsole_enter_90l.ban`
- `ca_civ_systemic_usehackingconsole_enter_90r.ban`
- `ca_civ_systemic_usehackingconsole_exit.ban`
- `ca_civ_systemic_usehackingconsole_loop.ban`
- `ca_civ_systemic_usehackingconsole_oneoff_checkline.ban`

#### animations/characters/contextact/civilian/systemic/usesodamachine/ {#animationscharacterscontextactciviliansystemicusesodamachine}

- `ca_civ_systemic_usesodamachine_enter_45l.ban`
- `ca_civ_systemic_usesodamachine_enter_45r.ban`
- `ca_civ_systemic_usesodamachine_exit.ban`
- `ca_civ_systemic_usesodamachine_loop.ban`

#### animations/characters/contextact/civilian/systemic/waitforbus/ (Dare Devils of Destruction) {#animationscharacterscontextactciviliansystemicwaitforbus-dare-devils-of-destruction}

- `ca_civ_systemic_waitforbus_enter_45l.ban`
- `ca_civ_systemic_waitforbus_enter_45r.ban`
- `ca_civ_systemic_waitforbus_exit.ban`
- `ca_civ_systemic_waitforbus_loop.ban`
- `ca_civ_systemic_waitforbus_oneoff_crossarm.ban`
- `ca_civ_systemic_waitforbus_oneoff_fanself.ban`
- `ca_civ_systemic_waitforbus_oneoff_lookatwatch.ban`
- `ca_civ_systemic_waitforbus_oneoff_lookforbus.ban`
- `ca_civ_systemic_waitforbus_oneoff_scratch.ban`

#### animations/characters/contextact/civilian/systemic/windowshopping/ {#animationscharacterscontextactciviliansystemicwindowshopping}

- `ca_civ_systemic_windowshopping_armscrossed_enter_45l.ban`
- `ca_civ_systemic_windowshopping_armscrossed_enter_45r.ban`
- `ca_civ_systemic_windowshopping_armscrossed_exit.ban`
- `ca_civ_systemic_windowshopping_armscrossed_loop.ban`
- `ca_civ_systemic_windowshopping_browsing_enter_45l.ban`
- `ca_civ_systemic_windowshopping_browsing_enter_45r.ban`
- `ca_civ_systemic_windowshopping_browsing_exit.ban`
- `ca_civ_systemic_windowshopping_browsing_loop.ban`
- `ca_civ_systemic_windowshopping_browsing_oneoff_lookback.ban`
- `ca_civ_systemic_windowshopping_enter_45l.ban`
- `ca_civ_systemic_windowshopping_enter_45r.ban`
- `ca_civ_systemic_windowshopping_exit.ban`
- `ca_civ_systemic_windowshopping_handsbehindback_enter_45l.ban`
- `ca_civ_systemic_windowshopping_handsbehindback_enter_45r.ban`
- `ca_civ_systemic_windowshopping_handsbehindback_exit.ban`
- `ca_civ_systemic_windowshopping_handsbehindback_loop.ban`
- `ca_civ_systemic_windowshopping_loop.ban`
- `ca_civ_systemic_windowshopping_onehandonhip_enter_45l.ban`
- `ca_civ_systemic_windowshopping_onehandonhip_enter_45r.ban`
- `ca_civ_systemic_windowshopping_onehandonhip_exit.ban`
- `ca_civ_systemic_windowshopping_onehandonhip_loop.ban`
- `ca_civ_systemic_windowshopping_oneoff_lookcloser.ban`
- `ca_civ_systemic_windowshopping_oneoff_lookdowncloser.ban`

#### animations/characters/dialogue/world_sim/ {#animationscharactersdialogueworld_sim}

- `world_sim_face_base.ban`
- `world_sim_face_brows_dn_add.ban`
- `world_sim_face_brows_up_add.ban`
- `world_sim_face_corner_dn_add.ban`
- `world_sim_face_corner_up_add.ban`
- `world_sim_face_lowlip_in_add.ban`
- `world_sim_face_mo_close_add.ban`
- `world_sim_face_mo_open_add.ban`
- `world_sim_face_narrow_closed_add.ban`
- `world_sim_face_narrow_open_add.ban`
- `world_sim_face_nosecheek_add.ban`
- `world_sim_face_uplid_dn_add.ban`
- `world_sim_face_uplid_up_add.ban`
- `world_sim_face_uplip_dn_add.ban`
- `world_sim_face_uplip_up_add.ban`

## Other animation folders {#other-animation-folders}

The game has 38718 animation files in total. The rest were made for other skeletons (Rico, enemies, animals, vehicles) or for cutscenes; they are not listed one by one because they are not made for the skeleton `PlayAnimation` uses, and how they play has not been tested.

| Folder | Files |
|---|---|
| `animations/characters/animal/cow/` | 40 |
| `animations/characters/animal/deer/` | 41 |
| `animations/characters/animal/dog/` | 10 |
| `animations/characters/animal/goat/` | 38 |
| `animations/characters/animal/llama/` | 37 |
| `animations/characters/animal/pig/` | 33 |
| `animations/characters/contextact/contspec/` | 16 |
| `animations/characters/contextact/enemy/` | 69 |
| `animations/characters/contextact/garland/` | 5 |
| `animations/characters/contextact/mira/` | 2 |
| `animations/characters/contextact/rebel/` | 65 |
| `animations/characters/contextact/rico/` | 3 |
| `animations/characters/dialogue/combatant/` | 15 |
| `animations/characters/dialogue/rico/` | 15 |
| `animations/characters/enemy/ghost/` | 90 |
| `animations/characters/enemy/private/` | 1143 |
| `animations/characters/enemy/shielder/` | 34 |
| `animations/characters/enemy/titan/` | 113 |
| `animations/characters/enemy/vehicle/` | 244 |
| `animations/characters/enemy_dlc/agent/` | 72 |
| `animations/characters/enemy_dlc/private/` | 18 |
| `animations/characters/enemy_dlc/shielder/` | 1 |
| `animations/characters/rebel/action/` | 4 |
| `animations/characters/rebel/cover/` | 87 |
| `animations/characters/rebel/locomotion/` | 160 |
| `animations/characters/rico/aagun/` | 4 |
| `animations/characters/rico/aim_target/` | 7 |
| `animations/characters/rico/contextact/` | 25 |
| `animations/characters/rico/eggs/` | 4 |
| `animations/characters/rico/face_bank/` | 11 |
| `animations/characters/rico/freefall/` | 10 |
| `animations/characters/rico/grapple/` | 655 |
| `animations/characters/rico/hands_bank/` | 39 |
| `animations/characters/rico/hitreaction/` | 35 |
| `animations/characters/rico/hoverboard/` | 246 |
| `animations/characters/rico/interstitial/` | 1 |
| `animations/characters/rico/locomotion/` | 1142 |
| `animations/characters/rico/misc/` | 3 |
| `animations/characters/rico/mountedweapon/` | 7 |
| `animations/characters/rico/parachute/` | 106 |
| `animations/characters/rico/partial/` | 199 |
| `animations/characters/rico/poses/` | 51 |
| `animations/characters/rico/ragdoll/` | 2 |
| `animations/characters/rico/swimming/` | 83 |
| `animations/characters/rico/vehicle/` | 412 |
| `animations/characters/rico/weaponinteraction/` | 3 |
| `animations/characters/rico/wingsuit/` | 27 |
| `animations/cinematics/ingame/fast_travel/` | 1 |
| `animations/cinematics/ingame/wingsuit/` | 2 |
| `animations/cinematics/scenes/garland/` | 246 |
| `animations/cinematics/scenes/interstitial/` | 91 |
| `animations/cinematics/scenes/intro/` | 6369 |
| `animations/cinematics/scenes/javi/` | 529 |
| `animations/cinematics/scenes/module_destruction/` | 6 |
| `animations/cinematics/scenes/outro/` | 2771 |
| `animations/cinematics/scenes/sandstinger/` | 2887 |
| `animations/cinematics/scenes/sargento/` | 531 |
| `animations/cinematics/scenes/thunderbarge/` | 2419 |
| `animations/cinematics/scenes/windwalker/` | 4359 |
| `animations/dialogue/eng/` | 11640 |
| `animations/jc_aero/enemy_parachute/` | 3 |
| `animations/jc_characters/dialogue/generic_face_shapes/` | 17 |
| `animations/objects/cameras/` | 1 |
| `animations/objects/parachute/` | 15 |
| `animations/objects/parachute/idle/` | 4 |
| `animations/objects/parachute/move/` | 4 |
| `animations/objects/retooler/` | 5 |
| `animations/objects/retooler/wire/` | 2 |
| `animations/objects/wingsuit/` | 28 |
| `animations/objects/wingsuit/add/` | 11 |
| `animations/turrets/rocket_barrage/` | 1 |
| `animations/turrets/shared/` | 4 |
| `animations/turrets/shared/add/` | 2 |
| `animations/turrets/turret_001/add/` | 2 |
| `animations/turrets/turret_003/add/` | 2 |
| `animations/weapons/wpn_001_assault_rifle/` | 2 |
| `animations/weapons/wpn_003_assault_rifle/` | 1 |
| `animations/weapons/wpn_010_machinegun/` | 1 |
| `animations/weapons/wpn_011_machinegun/` | 10 |
| `animations/weapons/wpn_020_shotgun/` | 2 |
| `animations/weapons/wpn_021_shotgun/` | 2 |
| `animations/weapons/wpn_022_shotgun/` | 2 |
| `animations/weapons/wpn_031_sniper_rifle/` | 2 |
| `animations/weapons/wpn_032_sniper_rifle/` | 1 |
| `animations/weapons/wpn_061_rpg/` | 2 |
| `animations/weapons/wpn_063_rpg/` | 2 |
| `animations/weapons/wpn_070_glauncher/` | 5 |
| `animations/weapons/wpn_071_mlauncher/` | 4 |
| `animations/weapons/wpn_080_experimental/` | 1 |
| `animations/weapons/wpn_081_experimental/` | 1 |
| `animations/weapons/wpn_100_railgun/` | 2 |
| `dlc/agency/animations/characters/` | 1 |
| `dlc/agency/animations/dialogue/` | 52 |
| `dlc/agency/animations/objects/` | 4 |
| `dlc/daredevil/animations/characters/` | 99 |
| `dlc/demonios/animations/characters/` | 58 |
| `dlc/demonios/animations/cinematics/` | 10 |
| `dlc/demonios/animations/dialogue/` | 38 |
| `dlc/demonios/animations/environments/` | 72 |
| `dlc/demonios/animations/weapons/` | 7 |
| `dlc/v600_mech_loader/animations/vehicles/` | 42 |