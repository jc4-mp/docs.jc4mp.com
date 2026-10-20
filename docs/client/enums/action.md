---
sidebar_position: 78
---

# Action and InputAction

`Action` holds the character acts of Just Cause 4: the events that drive a character's animation and behavior graph (jump, crouch, ragdoll, enter a vehicle, open the parachute, ...). `InputAction` holds the names of player input actions (what a button press means to the game, like "jump"). Use `Action` to make the local character do something, and `InputAction` to read or block the local player's input.

**Available on:** Client

## Values {#values}

### Action {#action}

Each value is a 32-bit hash of the game's act name (shown in the second column), the same value [`Hash`](../../shared/hash.md) returns for that name: `Hash("ACT_JUMP") == Action.Jump`. The values are opaque numbers: compare and pass them, don't do math on them.

Used by:

- [`Local.PlayAction(action)`](../local.md#localplayactionaction): queues the act on the local player's character, as if the game had triggered it. Whether the character actually performs it depends on its current state (an act that makes no sense in the current state, like `ExitVehicle` while on foot, is ignored by the game). Only the local character is affected and nothing is synced by this call itself; the movement it causes is synced like any other movement of the local player.

Notes:

- Many acts are internal steps the game queues itself (direction-specific starts and stops, vehicle animation inputs, cover sub-states). Queuing them from a script may do nothing, or may put the character in an odd state. The most useful ones for scripts are the general ones such as `Jump`, `Crouch`, `Stand`, `FullRagdoll`, `Evade`, `Reload`, `TriggerParachute`, `CloseParachute`, `TriggerWingsuit`, `CloseWingsuit`, `ExitVehicle` and `AbortCustomAnimation`.
- In the directional names, `0` is straight ahead, `90R` / `90L` is 90 degrees to the right / left, `180` is behind, and so on.

| Name | Game act | Meaning |
|---|---|---|
| `Action.Update` | `ACT_UPDATE` | The generic per-update act of the character's action graph. |
| `Action.None` | `ACT_NONE` | The empty act. Does nothing. |
| `Action.HitreactVehicleImpactLow0` | `ACT_HITREACT_VEHICLE_IMPACT_LOW_0` | Hit by a vehicle, low impact, from the front. |
| `Action.HitreactVehicleImpactLow120R` | `ACT_HITREACT_VEHICLE_IMPACT_LOW_120R` | Hit by a vehicle, low impact, from 120 degrees to the right. |
| `Action.HitreactVehicleImpactLow120L` | `ACT_HITREACT_VEHICLE_IMPACT_LOW_120L` | Hit by a vehicle, low impact, from 120 degrees to the left. |
| `Action.HitreactVehicleImpactMidFront` | `ACT_HITREACT_VEHICLE_IMPACT_MID_FRONT` | Hit by a vehicle, medium impact, from the front. |
| `Action.HitreactVehicleImpactMidBack` | `ACT_HITREACT_VEHICLE_IMPACT_MID_BACK` | Hit by a vehicle, medium impact, from behind. |
| `Action.HitreactVehicleImpactHighLeft` | `ACT_HITREACT_VEHICLE_IMPACT_HIGH_LEFT` | Hit by a vehicle, high impact, from the left. |
| `Action.HitreactVehicleImpactHigh` | `ACT_HITREACT_VEHICLE_IMPACT_HIGH` | Hit by a vehicle, high impact. |
| `Action.HitreactVehicleImpactHighRight` | `ACT_HITREACT_VEHICLE_IMPACT_HIGH_RIGHT` | Hit by a vehicle, high impact, from the right. |
| `Action.HitreactBullet` | `ACT_HITREACT_BULLET` | Flinch from a bullet hit. |
| `Action.HitreactStumble` | `ACT_HITREACT_STUMBLE` | Stumble. |
| `Action.HitreactStumbleBullet` | `ACT_HITREACT_STUMBLE_BULLET` | Stumble from a bullet hit. |
| `Action.HitreactStumbleMelee` | `ACT_HITREACT_STUMBLE_MELEE` | Stumble from a melee hit. |
| `Action.HitreactFly` | `ACT_HITREACT_FLY` | Knocked off the feet and sent flying. |
| `Action.HitreactGrapple` | `ACT_HITREACT_GRAPPLE` | Reaction to being hit by a grapple. |
| `Action.HitreactRagdoll` | `ACT_HITREACT_RAGDOLL` | Hit reaction that ends in ragdoll. |
| `Action.HitreactReelKick0` | `ACT_HITREACT_REEL_KICK_0` | Kicked by someone reeling in on the grapple, hit from straight ahead (0 degrees). |
| `Action.HitreactReelKick90R` | `ACT_HITREACT_REEL_KICK_90R` | Kicked by someone reeling in on the grapple, hit from 90 degrees to the right. |
| `Action.HitreactReelKick90L` | `ACT_HITREACT_REEL_KICK_90L` | Kicked by someone reeling in on the grapple, hit from 90 degrees to the left. |
| `Action.HitreactReelKick180` | `ACT_HITREACT_REEL_KICK_180` | Kicked by someone reeling in on the grapple, hit from 180 degrees (behind). |
| `Action.GrappleRagdoll` | `ACT_GRAPPLE_RAGDOLL` | Pulled into ragdoll by a grapple. |
| `Action.GrappleVehicleYank` | `ACT_GRAPPLE_VEHICLE_YANK` | Yanked by a grapple, vehicle variant. |
| `Action.GrappleFwdYank` | `ACT_GRAPPLE_FWD_YANK` | Yanked forward by a grapple. |
| `Action.GrappleBwdYank` | `ACT_GRAPPLE_BWD_YANK` | Yanked backward by a grapple. |
| `Action.GrappleFwdLeftYank` | `ACT_GRAPPLE_FWD_LEFT_YANK` | Yanked forward and to the left by a grapple. |
| `Action.GrappleFwdRightYank` | `ACT_GRAPPLE_FWD_RIGHT_YANK` | Yanked forward and to the right by a grapple. |
| `Action.GrappleBwdLeftYank` | `ACT_GRAPPLE_BWD_LEFT_YANK` | Yanked backward and to the left by a grapple. |
| `Action.GrappleBwdRightYank` | `ACT_GRAPPLE_BWD_RIGHT_YANK` | Yanked backward and to the right by a grapple. |
| `Action.GrappleFwdYankDown` | `ACT_GRAPPLE_FWD_YANK_DOWN` | Yanked forward and down to the ground by a grapple. |
| `Action.GrappleBwdYankDown` | `ACT_GRAPPLE_BWD_YANK_DOWN` | Yanked backward and down to the ground by a grapple. |
| `Action.GrappleLeftYankDown` | `ACT_GRAPPLE_LEFT_YANK_DOWN` | Yanked to the left and down to the ground by a grapple. |
| `Action.GrappleRightYankDown` | `ACT_GRAPPLE_RIGHT_YANK_DOWN` | Yanked to the right and down to the ground by a grapple. |
| `Action.SlingsuitToReel` | `ACT_SLINGSUIT_TO_REEL` | Go from wingsuit flight straight into a grapple reel-in. |
| `Action.ClimbObstacle` | `ACT_CLIMB_OBSTACLE` | Climb over an obstacle. |
| `Action.Jump` | `ACT_JUMP` | Jump. |
| `Action.Stand` | `ACT_STAND` | Stand up (leave the crouch). |
| `Action.Crouch` | `ACT_CROUCH` | Crouch. |
| `Action.ForceDeathRagdoll` | `ACT_FORCE_DEATH_RAGDOLL` | Force the death ragdoll. |
| `Action.Fall` | `ACT_FALL` | Start falling. |
| `Action.FullRagdoll` | `ACT_FULL_RAGDOLL` | Go fully ragdoll (the same act `player:GoRagdoll()` uses). |
| `Action.RagdollImpact` | `ACT_RAGDOLL_IMPACT` | Ragdoll impact reaction. |
| `Action.StepBackward` | `ACT_STEP_BACKWARD` | Take a step backward. |
| `Action.WindGust` | `ACT_WIND_GUST` | React to a gust of wind. |
| `Action.CloseLeftDoorFromInside` | `ACT_CLOSE_LEFT_DOOR_FROM_INSIDE` | Close the left vehicle door from inside. |
| `Action.CloseRightDoorFromInside` | `ACT_CLOSE_RIGHT_DOOR_FROM_INSIDE` | Close the right vehicle door from inside. |
| `Action.RagdollInairStabilizationBwd` | `ACT_RAGDOLL_INAIR_STABILIZATION_BWD` | Recover in the air from a ragdoll, falling backward. |
| `Action.RagdollInairStabilizationFwd` | `ACT_RAGDOLL_INAIR_STABILIZATION_FWD` | Recover in the air from a ragdoll, falling forward. |
| `Action.IdleVehicle` | `ACT_IDLE_VEHICLE` | Idle while seated in a vehicle. |
| `Action.SwitchSeat` | `ACT_SWITCH_SEAT` | Switch to another seat of the current vehicle. |
| `Action.EnterVehicle` | `ACT_ENTER_VEHICLE` | Enter a vehicle. |
| `Action.EnterVehicleMountedWeapon` | `ACT_ENTER_VEHICLE_MOUNTED_WEAPON` | Enter a vehicle's mounted weapon seat. |
| `Action.EnterVehicleCargoBay` | `ACT_ENTER_VEHICLE_CARGO_BAY` | Enter a vehicle through its cargo bay. |
| `Action.EnterVehicleRight` | `ACT_ENTER_VEHICLE_RIGHT` | Enter a vehicle from the right side. |
| `Action.StuntVehicle` | `ACT_STUNT_VEHICLE` | Climb onto the vehicle into a stunt position. |
| `Action.ExitVehicle` | `ACT_EXIT_VEHICLE` | Exit the vehicle. |
| `Action.ExitVehicle0` | `ACT_EXIT_VEHICLE_0` | Exit the vehicle, leaving straight ahead (0 degrees). |
| `Action.ExitVehicle90R` | `ACT_EXIT_VEHICLE_90R` | Exit the vehicle, leaving 90 degrees to the right. |
| `Action.ExitVehicle90L` | `ACT_EXIT_VEHICLE_90L` | Exit the vehicle, leaving 90 degrees to the left. |
| `Action.ExitVehicle180` | `ACT_EXIT_VEHICLE_180` | Exit the vehicle, leaving 180 degrees (behind). |
| `Action.ExitVehicleHijack` | `ACT_EXIT_VEHICLE_HIJACK` | Get thrown out of the vehicle by a hijacker. |
| `Action.ExitVehicleRight` | `ACT_EXIT_VEHICLE_RIGHT` | Exit the vehicle on the right side. |
| `Action.AccForward` | `ACT_ACC_FORWARD` | Vehicle animation input: accelerating forward. |
| `Action.AccBackward` | `ACT_ACC_BACKWARD` | Vehicle animation input: accelerating backward. |
| `Action.NoAcc` | `ACT_NO_ACC` | Vehicle animation input: not accelerating. |
| `Action.TurnLeft` | `ACT_TURN_LEFT` | Vehicle animation input: steering left. |
| `Action.TurnRight` | `ACT_TURN_RIGHT` | Vehicle animation input: steering right. |
| `Action.NoTurn` | `ACT_NO_TURN` | Vehicle animation input: not steering. |
| `Action.NoVelocityVehicle` | `ACT_NO_VELOCITY_VEHICLE` | Vehicle animation input: the vehicle is standing still. |
| `Action.HaveVelocityVehicle` | `ACT_HAVE_VELOCITY_VEHICLE` | Vehicle animation input: the vehicle is moving. |
| `Action.ReverseMotorbike` | `ACT_REVERSE_MOTORBIKE` | Reverse on a motorbike. |
| `Action.PanicExitVehicle` | `ACT_PANIC_EXIT_VEHICLE` | Bail out of the vehicle in a panic. |
| `Action.TeleportExit` | `ACT_TELEPORT_EXIT` | Exit the vehicle as part of a teleport. |
| `Action.FastTravelFreefallZombie` | `ACT_FAST_TRAVEL_FREEFALL_ZOMBIE` | Fast travel freefall pose. |
| `Action.FastTravelFreefallDrop` | `ACT_FAST_TRAVEL_FREEFALL_DROP` | Drop out of the fast travel freefall. |
| `Action.StuntTransition` | `ACT_STUNT_TRANSITION` | Move between stunt positions on a vehicle. |
| `Action.EnterMountedWeapon` | `ACT_ENTER_MOUNTED_WEAPON` | Get on a mounted weapon. |
| `Action.ExitMountedWeapon` | `ACT_EXIT_MOUNTED_WEAPON` | Get off a mounted weapon. |
| `Action.PickupMountedWeapon` | `ACT_PICKUP_MOUNTED_WEAPON` | Rip a mounted weapon off its mount and carry it. |
| `Action.PickupWeapon` | `ACT_PICKUP_WEAPON` | Pick up a weapon. |
| `Action.WeaponSetting1` | `ACT_WEAPON_SETTING1` | Switch the weapon to its firing setting 1. |
| `Action.WeaponSetting2` | `ACT_WEAPON_SETTING2` | Switch the weapon to its firing setting 2. |
| `Action.WeaponSetting3` | `ACT_WEAPON_SETTING3` | Switch the weapon to its firing setting 3. |
| `Action.MgunStopAiming` | `ACT_MGUN_STOP_AIMING` | Stop aiming a mounted gun. |
| `Action.MortarStartAiming` | `ACT_MORTAR_START_AIMING` | Start aiming a mortar. |
| `Action.MortarFire` | `ACT_MORTAR_FIRE` | Fire a mortar. |
| `Action.MortarStopAiming` | `ACT_MORTAR_STOP_AIMING` | Stop aiming a mortar. |
| `Action.OnUnequipWeaponSlow` | `ACT_ON_UNEQUIP_WEAPON_SLOW` | Put the weapon away slowly. |
| `Action.Pullchord` | `ACT_PULLCHORD` | Pull the parachute ripcord. |
| `Action.LocomotionReactionAccDirectional` | `ACT_LOCOMOTION_REACTION_ACC_DIRECTIONAL` | Body reaction to a sudden directional acceleration. |
| `Action.LocomotionReactionAccDirectionalHeavy` | `ACT_LOCOMOTION_REACTION_ACC_DIRECTIONAL_HEAVY` | Heavy body reaction to a sudden directional acceleration. |
| `Action.LocomotionReactionAccBump` | `ACT_LOCOMOTION_REACTION_ACC_BUMP` | Body reaction to a bump. |
| `Action.LocomotionReactionAccBumpHeavy` | `ACT_LOCOMOTION_REACTION_ACC_BUMP_HEAVY` | Heavy body reaction to a bump. |
| `Action.LocomotionReactionAdditive` | `ACT_LOCOMOTION_REACTION_ADDITIVE` | Additive (layered on top) locomotion reaction. |
| `Action.StuntVehicleExit` | `ACT_STUNT_VEHICLE_EXIT` | Leave the stunt position on a vehicle. |
| `Action.EnterMountedGun` | `ACT_ENTER_MOUNTED_GUN` | Get on a mounted gun. |
| `Action.SwitchDrivingDirection` | `ACT_SWITCH_DRIVING_DIRECTION` | Switch the driving direction. |
| `Action.Fire` | `ACT_FIRE` | Fire the weapon. |
| `Action.Reload` | `ACT_RELOAD` | Reload the weapon. |
| `Action.KeepHanging` | `ACT_KEEP_HANGING` | Keep hanging. |
| `Action.EjectFromVehicle` | `ACT_EJECT_FROM_VEHICLE` | Eject from the vehicle. |
| `Action.EjectFromVehicleMg` | `ACT_EJECT_FROM_VEHICLE_MG` | Eject from a vehicle's mounted gun. |
| `Action.IdledForALongLongTime` | `ACT_IDLED_FOR_A_LONG_LONG_TIME` | Trigger the long idle animation. |
| `Action.AbortCustomAnimation` | `ACT_ABORT_CUSTOM_ANIMATION` | Abort a custom (scripted) animation. |
| `Action.RotateCw` | `ACT_ROTATE_CW` | Rotate clockwise. |
| `Action.RotateCcw` | `ACT_ROTATE_CCW` | Rotate counterclockwise. |
| `Action.Evade` | `ACT_EVADE` | Evade (dodge roll). |
| `Action.Pickup` | `ACT_PICKUP` | Pick up an item. |
| `Action.GetHijack` | `ACT_GET_HIJACK` | Get hijacked. |
| `Action.Idle` | `ACT_IDLE` | Go idle. |
| `Action.OnStartingAim` | `ACT_ON_STARTING_AIM` | Start aiming. |
| `Action.Aim` | `ACT_AIM` | Aim. |
| `Action.OnLeavingAim` | `ACT_ON_LEAVING_AIM` | Stop aiming. |
| `Action.ExitContextAction` | `ACT_EXIT_CONTEXT_ACTION` | Exit the current context action (an interaction with the world). |
| `Action.InterruptContextAction` | `ACT_INTERRUPT_CONTEXT_ACTION` | Interrupt the current context action. |
| `Action.ExtToIdle` | `ACT_EXT_TO_IDLE` | Exit into idle. |
| `Action.StartVault` | `ACT_START_VAULT` | Start vaulting over something. |
| `Action.EndVault` | `ACT_END_VAULT` | Finish a vault. |
| `Action.ToIdle` | `ACT_TO_IDLE` | Go to idle. |
| `Action.ToPrecisionIdle` | `ACT_TO_PRECISION_IDLE` | Go to the precision aim idle. |
| `Action.ToIdleOneOff` | `ACT_TO_IDLE_ONE_OFF` | Go to idle once (one-off transition). |
| `Action.StuntTurn0` | `ACT_STUNT_TURN_0` | Turn on a stunt position, straight ahead (0 degrees). |
| `Action.StuntTurn120R` | `ACT_STUNT_TURN_120R` | Turn on a stunt position, 120 degrees to the right. |
| `Action.StuntTurn120L` | `ACT_STUNT_TURN_120L` | Turn on a stunt position, 120 degrees to the left. |
| `Action.Flick0` | `ACT_FLICK_0` | Quick flick turn, straight ahead (0 degrees). |
| `Action.Flick120R` | `ACT_FLICK_120R` | Quick flick turn, 120 degrees to the right. |
| `Action.Flick120L` | `ACT_FLICK_120L` | Quick flick turn, 120 degrees to the left. |
| `Action.Flick0NoAim` | `ACT_FLICK_0_NO_AIM` | Quick flick turn without aiming, straight ahead (0 degrees). |
| `Action.Flick120RNoAim` | `ACT_FLICK_120R_NO_AIM` | Quick flick turn without aiming, 120 degrees to the right. |
| `Action.Flick120LNoAim` | `ACT_FLICK_120L_NO_AIM` | Quick flick turn without aiming, 120 degrees to the left. |
| `Action.Flick0Aim` | `ACT_FLICK_0_AIM` | Quick flick turn while aiming, straight ahead (0 degrees). |
| `Action.Flick90RAim` | `ACT_FLICK_90R_AIM` | Quick flick turn while aiming, 90 degrees to the right. |
| `Action.Flick90LAim` | `ACT_FLICK_90L_AIM` | Quick flick turn while aiming, 90 degrees to the left. |
| `Action.Flick180Aim` | `ACT_FLICK_180_AIM` | Quick flick turn while aiming, 180 degrees (behind). |
| `Action.MoveRelativeFocus90R` | `ACT_MOVE_RELATIVE_FOCUS_90R` | Move relative to the focus direction, 90 degrees to the right. |
| `Action.MoveRelativeFocus90L` | `ACT_MOVE_RELATIVE_FOCUS_90L` | Move relative to the focus direction, 90 degrees to the left. |
| `Action.MoveRelativeFocus180` | `ACT_MOVE_RELATIVE_FOCUS_180` | Move relative to the focus direction, 180 degrees (behind). |
| `Action.TrailRight` | `ACT_TRAIL_RIGHT` | Trailing movement to the right. |
| `Action.TrailLeft` | `ACT_TRAIL_LEFT` | Trailing movement to the left. |
| `Action.TrailExit` | `ACT_TRAIL_EXIT` | End the trailing movement. |
| `Action.AimFocusRotate90L` | `ACT_AIM_FOCUS_ROTATE_90L` | Rotate while aiming, 90 degrees to the left. |
| `Action.AimFocusRotate90R` | `ACT_AIM_FOCUS_ROTATE_90R` | Rotate while aiming, 90 degrees to the right. |
| `Action.StuntRotate` | `ACT_STUNT_ROTATE` | Rotate on a stunt position. |
| `Action.RotateRightStart` | `ACT_ROTATE_RIGHT_START` | Start rotating to the right. |
| `Action.RotateLeftStart` | `ACT_ROTATE_LEFT_START` | Start rotating to the left. |
| `Action.RotateEnd` | `ACT_ROTATE_END` | Stop rotating. |
| `Action.Rotate45L` | `ACT_ROTATE_45L` | Rotate in place, 45 degrees to the left. |
| `Action.Rotate45R` | `ACT_ROTATE_45R` | Rotate in place, 45 degrees to the right. |
| `Action.Rotate180L` | `ACT_ROTATE_180L` | Rotate in place, 180 degrees to the left. |
| `Action.Rotate180R` | `ACT_ROTATE_180R` | Rotate in place, 180 degrees to the right. |
| `Action.Rotate90L` | `ACT_ROTATE_90L` | Rotate in place, 90 degrees to the left. |
| `Action.Rotate90R` | `ACT_ROTATE_90R` | Rotate in place, 90 degrees to the right. |
| `Action.ShuffleRotateSmall` | `ACT_SHUFFLE_ROTATE_SMALL` | Small shuffling rotation in place. |
| `Action.ShuffleRotateR` | `ACT_SHUFFLE_ROTATE_R` | Shuffling rotation to the right. |
| `Action.ShuffleRotateL` | `ACT_SHUFFLE_ROTATE_L` | Shuffling rotation to the left. |
| `Action.FlankedRotateR` | `ACT_FLANKED_ROTATE_R` | Rotate to the right when flanked. |
| `Action.FlankedRotateL` | `ACT_FLANKED_ROTATE_L` | Rotate to the left when flanked. |
| `Action.Turn180L` | `ACT_TURN_180L` | Turn, 180 degrees to the left. |
| `Action.Turn180R` | `ACT_TURN_180R` | Turn, 180 degrees to the right. |
| `Action.Turn90L` | `ACT_TURN_90L` | Turn, 90 degrees to the left. |
| `Action.Turn90R` | `ACT_TURN_90R` | Turn, 90 degrees to the right. |
| `Action.Turn0` | `ACT_TURN_0` | Turn, straight ahead (0 degrees). |
| `Action.Rotate180LWarp` | `ACT_ROTATE_180L_WARP` | Rotate in place with a warp (snap), 180 degrees to the left. |
| `Action.Rotate180RWarp` | `ACT_ROTATE_180R_WARP` | Rotate in place with a warp (snap), 180 degrees to the right. |
| `Action.Rotate90LWarp` | `ACT_ROTATE_90L_WARP` | Rotate in place with a warp (snap), 90 degrees to the left. |
| `Action.Rotate90RWarp` | `ACT_ROTATE_90R_WARP` | Rotate in place with a warp (snap), 90 degrees to the right. |
| `Action.ReactExplosionFront` | `ACT_REACT_EXPLOSION_FRONT` | React to an explosion in front. |
| `Action.ReactExplosionRight` | `ACT_REACT_EXPLOSION_RIGHT` | React to an explosion on the right. |
| `Action.ReactExplosionBack` | `ACT_REACT_EXPLOSION_BACK` | React to an explosion behind. |
| `Action.ReactExplosionLeft` | `ACT_REACT_EXPLOSION_LEFT` | React to an explosion on the left. |
| `Action.ReactExplosion` | `ACT_REACT_EXPLOSION` | React to an explosion. |
| `Action.Move0` | `ACT_MOVE_0` | Move, straight ahead (0 degrees). |
| `Action.Move90R` | `ACT_MOVE_90R` | Move, 90 degrees to the right. |
| `Action.Move90L` | `ACT_MOVE_90L` | Move, 90 degrees to the left. |
| `Action.IdleToStart0` | `ACT_IDLE_TO_START_0` | Start moving from idle, straight ahead (0 degrees). |
| `Action.IdleToStart90R` | `ACT_IDLE_TO_START_90R` | Start moving from idle, 90 degrees to the right. |
| `Action.IdleToStart90L` | `ACT_IDLE_TO_START_90L` | Start moving from idle, 90 degrees to the left. |
| `Action.IdleToStart180R` | `ACT_IDLE_TO_START_180R` | Start moving from idle, 180 degrees to the right. |
| `Action.IdleToStart180L` | `ACT_IDLE_TO_START_180L` | Start moving from idle, 180 degrees to the left. |
| `Action.IdleToWalkStart0` | `ACT_IDLE_TO_WALK_START_0` | Start walking from idle, straight ahead (0 degrees). |
| `Action.IdleToWalkStart90R` | `ACT_IDLE_TO_WALK_START_90R` | Start walking from idle, 90 degrees to the right. |
| `Action.IdleToWalkStart90L` | `ACT_IDLE_TO_WALK_START_90L` | Start walking from idle, 90 degrees to the left. |
| `Action.IdleToWalkStart180R` | `ACT_IDLE_TO_WALK_START_180R` | Start walking from idle, 180 degrees to the right. |
| `Action.IdleToWalkStart180L` | `ACT_IDLE_TO_WALK_START_180L` | Start walking from idle, 180 degrees to the left. |
| `Action.Stop` | `ACT_STOP` | Stop moving. |
| `Action.StopTurn0` | `ACT_STOP_TURN_0` | Stop moving and turn, straight ahead (0 degrees). |
| `Action.StopTurn90R` | `ACT_STOP_TURN_90R` | Stop moving and turn, 90 degrees to the right. |
| `Action.StopTurn90L` | `ACT_STOP_TURN_90L` | Stop moving and turn, 90 degrees to the left. |
| `Action.StopTurn180R` | `ACT_STOP_TURN_180R` | Stop moving and turn, 180 degrees to the right. |
| `Action.StopTurn180L` | `ACT_STOP_TURN_180L` | Stop moving and turn, 180 degrees to the left. |
| `Action.MoveAimFocus0` | `ACT_MOVE_AIM_FOCUS_0` | Move while aiming, straight ahead (0 degrees) relative to the aim. |
| `Action.MoveAimFocus45R` | `ACT_MOVE_AIM_FOCUS_45R` | Move while aiming, 45 degrees to the right relative to the aim. |
| `Action.MoveAimFocus45L` | `ACT_MOVE_AIM_FOCUS_45L` | Move while aiming, 45 degrees to the left relative to the aim. |
| `Action.MoveAimFocus90R` | `ACT_MOVE_AIM_FOCUS_90R` | Move while aiming, 90 degrees to the right relative to the aim. |
| `Action.MoveAimFocus90L` | `ACT_MOVE_AIM_FOCUS_90L` | Move while aiming, 90 degrees to the left relative to the aim. |
| `Action.MoveAimFocus135R` | `ACT_MOVE_AIM_FOCUS_135R` | Move while aiming, 135 degrees to the right relative to the aim. |
| `Action.MoveAimFocus135L` | `ACT_MOVE_AIM_FOCUS_135L` | Move while aiming, 135 degrees to the left relative to the aim. |
| `Action.MoveAimFocus180` | `ACT_MOVE_AIM_FOCUS_180` | Move while aiming, 180 degrees (behind) relative to the aim. |
| `Action.MoveWalkAimFocus0` | `ACT_MOVE_WALK_AIM_FOCUS_0` | Walk while aiming, straight ahead (0 degrees) relative to the aim. |
| `Action.MoveWalkAimFocus90R` | `ACT_MOVE_WALK_AIM_FOCUS_90R` | Walk while aiming, 90 degrees to the right relative to the aim. |
| `Action.MoveWalkAimFocus90L` | `ACT_MOVE_WALK_AIM_FOCUS_90L` | Walk while aiming, 90 degrees to the left relative to the aim. |
| `Action.MoveWalkAimFocus180` | `ACT_MOVE_WALK_AIM_FOCUS_180` | Walk while aiming, 180 degrees (behind) relative to the aim. |
| `Action.IdleToAccelCurve` | `ACT_IDLE_TO_ACCEL_CURVE` | Accelerate out of idle. |
| `Action.MoveCinematicMode` | `ACT_MOVE_CINEMATIC_MODE` | Move in cinematic mode. |
| `Action.MovePrecisionMode` | `ACT_MOVE_PRECISION_MODE` | Move in precision aim mode. |
| `Action.MoveAimStrafe` | `ACT_MOVE_AIM_STRAFE` | Strafe while aiming. |
| `Action.MoveNoAim` | `ACT_MOVE_NO_AIM` | Move without aiming. |
| `Action.Move180Backpedal` | `ACT_MOVE_180_BACKPEDAL` | Backpedal (move backward facing forward). |
| `Action.MoveInput` | `ACT_MOVE_INPUT` | There is movement input. |
| `Action.NoMoveInput` | `ACT_NO_MOVE_INPUT` | There is no movement input. |
| `Action.MoveWalk0` | `ACT_MOVE_WALK_0` | Walk straight ahead. |
| `Action.MoveRelaxed` | `ACT_MOVE_RELAXED` | Move in a relaxed manner. |
| `Action.Move45R` | `ACT_MOVE_45R` | Move, 45 degrees to the right. |
| `Action.Move45L` | `ACT_MOVE_45L` | Move, 45 degrees to the left. |
| `Action.MoveBack0` | `ACT_MOVE_BACK_0` | Move backward, straight ahead (0 degrees). |
| `Action.MoveBack45R` | `ACT_MOVE_BACK_45R` | Move backward, 45 degrees to the right. |
| `Action.MoveBack90R` | `ACT_MOVE_BACK_90R` | Move backward, 90 degrees to the right. |
| `Action.MoveBack45L` | `ACT_MOVE_BACK_45L` | Move backward, 45 degrees to the left. |
| `Action.MoveBack90L` | `ACT_MOVE_BACK_90L` | Move backward, 90 degrees to the left. |
| `Action.IdleToWalkStartR` | `ACT_IDLE_TO_WALK_START_R` | Start walking from idle, to the right. |
| `Action.IdleToWalkStartL` | `ACT_IDLE_TO_WALK_START_L` | Start walking from idle, to the left. |
| `Action.IdleToRunStart0` | `ACT_IDLE_TO_RUN_START_0` | Start running from idle, straight ahead (0 degrees). |
| `Action.IdleToRunStart0LookL` | `ACT_IDLE_TO_RUN_START_0_LOOKL` | Start running from idle, straight ahead, looking left. |
| `Action.IdleToRunStart0LookR` | `ACT_IDLE_TO_RUN_START_0_LOOKR` | Start running from idle, straight ahead, looking right. |
| `Action.IdleToRunStartR` | `ACT_IDLE_TO_RUN_START_R` | Start running from idle, to the right. |
| `Action.IdleToRunStartRLookL` | `ACT_IDLE_TO_RUN_START_R_LOOKL` | Start running from idle, to the right, looking left. |
| `Action.IdleToRunStartRLookR` | `ACT_IDLE_TO_RUN_START_R_LOOKR` | Start running from idle, to the right, looking right. |
| `Action.IdleToRunStartL` | `ACT_IDLE_TO_RUN_START_L` | Start running from idle, to the left. |
| `Action.IdleToRunStartLLookL` | `ACT_IDLE_TO_RUN_START_L_LOOKL` | Start running from idle, to the left, looking left. |
| `Action.IdleToRunStartLLookR` | `ACT_IDLE_TO_RUN_START_L_LOOKR` | Start running from idle, to the left, looking right. |
| `Action.IdleToWalkStartBack0` | `ACT_IDLE_TO_WALK_START_BACK_0` | Start walking backward from idle, straight ahead (0 degrees). |
| `Action.IdleToWalkStartBackR` | `ACT_IDLE_TO_WALK_START_BACK_R` | Start walking backward from idle, to the right. |
| `Action.IdleToWalkStartBackL` | `ACT_IDLE_TO_WALK_START_BACK_L` | Start walking backward from idle, to the left. |
| `Action.IdleToRunStartBack0` | `ACT_IDLE_TO_RUN_START_BACK_0` | Start running backward from idle, straight back. |
| `Action.StopTurnR` | `ACT_STOP_TURN_R` | Stop moving and turn, to the right. |
| `Action.StopTurnL` | `ACT_STOP_TURN_L` | Stop moving and turn, to the left. |
| `Action.StopBackTurn0` | `ACT_STOP_BACK_TURN_0` | Stop moving backward and turn, straight ahead (0 degrees). |
| `Action.StopBackTurnR` | `ACT_STOP_BACK_TURN_R` | Stop moving backward and turn, to the right. |
| `Action.StopBackTurnL` | `ACT_STOP_BACK_TURN_L` | Stop moving backward and turn, to the left. |
| `Action.BackToFrontMoveTransitionTurnR` | `ACT_BACK_TO_FRONT_MOVE_TRANSITION_TURN_R` | Switch from moving backward to moving forward, turning right. |
| `Action.BackToFrontMoveTransitionTurnL` | `ACT_BACK_TO_FRONT_MOVE_TRANSITION_TURN_L` | Switch from moving backward to moving forward, turning left. |
| `Action.FrontToBackMoveTransitionTurnR` | `ACT_FRONT_TO_BACK_MOVE_TRANSITION_TURN_R` | Switch from moving forward to moving backward, turning right. |
| `Action.FrontToBackMoveTransitionTurnL` | `ACT_FRONT_TO_BACK_MOVE_TRANSITION_TURN_L` | Switch from moving forward to moving backward, turning left. |
| `Action.StopAndEnterCover` | `ACT_STOP_AND_ENTER_COVER` | Stop and take cover. |
| `Action.InvalidateCover` | `ACT_INVALIDATE_COVER` | The current cover is no longer valid, leave it. |
| `Action.CoverToIdle` | `ACT_COVER_TO_IDLE` | Leave cover into idle. |
| `Action.ExceptionCoverToIdle` | `ACT_EXCEPTION_COVER_TO_IDLE` | Leave cover into idle (interrupted). |
| `Action.CrouchHideCover` | `ACT_CROUCH_HIDE_COVER` | Hide behind low cover, crouching. |
| `Action.StandHideCover` | `ACT_STAND_HIDE_COVER` | Hide behind high cover, standing. |
| `Action.CrouchAttackOverCover` | `ACT_CROUCH_ATTACK_OVER_COVER` | From cover (crouching), shoot aimed over the cover. |
| `Action.CrouchBlindfireOverCover` | `ACT_CROUCH_BLINDFIRE_OVER_COVER` | From cover (crouching), blind fire over the cover. |
| `Action.CrouchLookOverCover` | `ACT_CROUCH_LOOK_OVER_COVER` | From cover (crouching), peek over the cover. |
| `Action.CrouchGrenadeThrowOverCover` | `ACT_CROUCH_GRENADETHROW_OVER_COVER` | From cover (crouching), throw a grenade over the cover. |
| `Action.CrouchAttackLeftCover` | `ACT_CROUCH_ATTACK_LEFT_COVER` | From cover (crouching), shoot aimed around the left side of the cover. |
| `Action.CrouchBlindfireLeftCover` | `ACT_CROUCH_BLINDFIRE_LEFT_COVER` | From cover (crouching), blind fire around the left side of the cover. |
| `Action.CrouchLookLeftCover` | `ACT_CROUCH_LOOK_LEFT_COVER` | From cover (crouching), peek around the left side of the cover. |
| `Action.CrouchGrenadeThrowLeftCover` | `ACT_CROUCH_GRENADETHROW_LEFT_COVER` | From cover (crouching), throw a grenade around the left side of the cover. |
| `Action.CrouchAttackRightCover` | `ACT_CROUCH_ATTACK_RIGHT_COVER` | From cover (crouching), shoot aimed around the right side of the cover. |
| `Action.CrouchBlindfireRightCover` | `ACT_CROUCH_BLINDFIRE_RIGHT_COVER` | From cover (crouching), blind fire around the right side of the cover. |
| `Action.CrouchLookRightCover` | `ACT_CROUCH_LOOK_RIGHT_COVER` | From cover (crouching), peek around the right side of the cover. |
| `Action.CrouchGrenadeThrowRightCover` | `ACT_CROUCH_GRENADETHROW_RIGHT_COVER` | From cover (crouching), throw a grenade around the right side of the cover. |
| `Action.StandAttackLeftCover` | `ACT_STAND_ATTACK_LEFT_COVER` | From cover (standing), shoot aimed around the left side of the cover. |
| `Action.StandBlindfireLeftCover` | `ACT_STAND_BLINDFIRE_LEFT_COVER` | From cover (standing), blind fire around the left side of the cover. |
| `Action.StandLookLeftCover` | `ACT_STAND_LOOK_LEFT_COVER` | From cover (standing), peek around the left side of the cover. |
| `Action.StandGrenadeThrowLeftCover` | `ACT_STAND_GRENADETHROW_LEFT_COVER` | From cover (standing), throw a grenade around the left side of the cover. |
| `Action.StandAttackRightCover` | `ACT_STAND_ATTACK_RIGHT_COVER` | From cover (standing), shoot aimed around the right side of the cover. |
| `Action.StandBlindfireRightCover` | `ACT_STAND_BLINDFIRE_RIGHT_COVER` | From cover (standing), blind fire around the right side of the cover. |
| `Action.StandLookRightCover` | `ACT_STAND_LOOK_RIGHT_COVER` | From cover (standing), peek around the right side of the cover. |
| `Action.StandGrenadeThrowRightCover` | `ACT_STAND_GRENADETHROW_RIGHT_COVER` | From cover (standing), throw a grenade around the right side of the cover. |
| `Action.Invalidate0` | `ACT_INVALIDATE_0` | Cancel the current movement, straight ahead (0 degrees). |
| `Action.InvalidateR` | `ACT_INVALIDATE_R` | Cancel the current movement, to the right. |
| `Action.InvalidateL` | `ACT_INVALIDATE_L` | Cancel the current movement, to the left. |
| `Action.StepOver` | `ACT_STEP_OVER` | Step over something. |
| `Action.Fire0` | `ACT_FIRE_0` | Fire, straight ahead (0 degrees). |
| `Action.Fire90R` | `ACT_FIRE_90R` | Fire, 90 degrees to the right. |
| `Action.Fire90L` | `ACT_FIRE_90L` | Fire, 90 degrees to the left. |
| `Action.Fire180R` | `ACT_FIRE_180R` | Fire, 180 degrees to the right. |
| `Action.Fire180L` | `ACT_FIRE_180L` | Fire, 180 degrees to the left. |
| `Action.AimWeaponOrGrapple` | `ACT_AIM_WEAPON_OR_GRAPPLE` | Aim the weapon or the grapple. |
| `Action.ToAimFocusWeapon` | `ACT_TO_AIM_FOCUS_WEAPON` | Bring the weapon up to aim. |
| `Action.FromAimFocusWeapon` | `ACT_FROM_AIM_FOCUS_WEAPON` | Lower the weapon from aiming. |
| `Action.GrappleFire` | `ACT_GRAPPLE_FIRE` | Fire the grappling hook. |
| `Action.GrappleTetherFire` | `ACT_GRAPPLE_TETHER_FIRE` | Fire a grapple tether. |
| `Action.PreReel` | `ACT_PRE_REEL` | Prepare to reel in on the grapple. |
| `Action.GrappleLandCharacter` | `ACT_GRAPPLE_LAND_CHARACTER` | Land on a character at the end of a grapple reel-in. |
| `Action.GrappleAttach` | `ACT_GRAPPLE_ATTACH` | Attach to the grapple point. |
| `Action.GrappleUpsidedown` | `ACT_GRAPPLE_UPSIDEDOWN` | Hang upside down from the grapple. |
| `Action.GrappleHang` | `ACT_GRAPPLE_HANG` | Hang from the grapple. |
| `Action.GrappleLand` | `ACT_GRAPPLE_LAND` | Land at the end of a grapple reel-in. |
| `Action.GrappleLandSlide` | `ACT_GRAPPLE_LAND_SLIDE` | Land sliding at the end of a grapple reel-in. |
| `Action.GrappleStuntLand` | `ACT_GRAPPLE_STUNT_LAND` | Land on a stunt position at the end of a grapple reel-in. |
| `Action.GrappleStuntHangLand` | `ACT_GRAPPLE_STUNT_HANG_LAND` | Land hanging on a stunt position at the end of a grapple reel-in. |
| `Action.GrappleCancel` | `ACT_GRAPPLE_CANCEL` | Cancel the grapple. |
| `Action.GrplJumpAway` | `ACT_GRPL_JUMP_AWAY` | Jump away from the grapple point. |
| `Action.GrplJumpAwayTurn` | `ACT_GRPL_JUMP_AWAY_TURN` | Jump away from the grapple point, turning. |
| `Action.GrplJumpUp` | `ACT_GRPL_JUMP_UP` | Jump up from the grapple point. |
| `Action.GrplClimb` | `ACT_GRPL_CLIMB` | Climb up from the grapple point. |
| `Action.GrplRelease` | `ACT_GRPL_RELEASE` | Release the grapple. |
| `Action.GrplForceRelease` | `ACT_GRPL_FORCE_RELEASE` | Force the grapple to release. |
| `Action.GrplJumpAway0` | `ACT_GRPL_JUMP_AWAY_0` | Jump away from the grapple point, straight ahead (0 degrees). |
| `Action.GrplJumpAway120R` | `ACT_GRPL_JUMP_AWAY_120R` | Jump away from the grapple point, 120 degrees to the right. |
| `Action.GrplJumpAway120L` | `ACT_GRPL_JUMP_AWAY_120L` | Jump away from the grapple point, 120 degrees to the left. |
| `Action.TriggerParachute` | `ACT_TRIGGER_PARACHUTE` | Open the parachute. |
| `Action.CloseParachute` | `ACT_CLOSE_PARACHUTE` | Close the parachute. |
| `Action.TriggerWingsuit` | `ACT_TRIGGER_WINGSUIT` | Open the wingsuit. |
| `Action.CloseWingsuit` | `ACT_CLOSE_WINGSUIT` | Close the wingsuit. |
| `Action.TriggerHoverboard` | `ACT_TRIGGER_HOVERBOARD` | Get on the hoverboard. |
| `Action.CloseHoverboard` | `ACT_CLOSE_HOVERBOARD` | Get off the hoverboard. |
| `Action.ForceParachuteIdle` | `ACT_FORCE_PARACHUTE_IDLE` | Force the parachute idle. |
| `Action.SequenceTriggerWingsuit` | `ACT_SEQUENCE_TRIGGER_WINGSUIT` | Open the wingsuit (scripted sequence variant). |
| `Action.SequenceTriggerFreefall` | `ACT_SEQUENCE_TRIGGER_FREEFALL` | Start freefalling (scripted sequence variant). |
| `Action.PushGrapple` | `ACT_PUSH_GRAPPLE` | Push with the grapple. |
| `Action.PullGrapple` | `ACT_PULL_GRAPPLE` | Pull with the grapple. |
| `Action.StuntMelee` | `ACT_STUNT_MELEE` | Melee attack from a stunt position. |
| `Action.UrgentMelee` | `ACT_URGENT_MELEE` | Urgent melee attack. |
| `Action.NpcThrowGrenade` | `ACT_NPC_THROW_GRENADE` | Throw a grenade (the NPC variant). |
| `Action.GrenadeFire0` | `ACT_GRENADE_FIRE_0` | Throw a grenade, straight ahead (0 degrees). |
| `Action.GrenadeFire45R` | `ACT_GRENADE_FIRE_45R` | Throw a grenade, 45 degrees to the right. |
| `Action.GrenadeFire45L` | `ACT_GRENADE_FIRE_45L` | Throw a grenade, 45 degrees to the left. |
| `Action.GrenadeFire90R` | `ACT_GRENADE_FIRE_90R` | Throw a grenade, 90 degrees to the right. |
| `Action.GrenadeFire90L` | `ACT_GRENADE_FIRE_90L` | Throw a grenade, 90 degrees to the left. |
| `Action.GrenadeFire180R` | `ACT_GRENADE_FIRE_180R` | Throw a grenade, 180 degrees to the right. |
| `Action.GrenadeFire180L` | `ACT_GRENADE_FIRE_180L` | Throw a grenade, 180 degrees to the left. |
| `Action.ReeledInGrenadeFire` | `ACT_REELED_IN_GRENADE_FIRE` | Throw a grenade while reeled in. |
| `Action.GrenadeFire120R` | `ACT_GRENADE_FIRE_120R` | Throw a grenade, 120 degrees to the right. |
| `Action.GrenadeFire120L` | `ACT_GRENADE_FIRE_120L` | Throw a grenade, 120 degrees to the left. |
| `Action.UnpackShieldedMachinegun` | `ACT_UNPACK_SHIELDED_MACHINEGUN` | Unpack a shielded machine gun. |
| `Action.PackShieldedMachinegun` | `ACT_PACK_SHIELDED_MACHINEGUN` | Pack up a shielded machine gun. |
| `Action.SurfaceSwimStart0` | `ACT_SURFACE_SWIM_START_0` | Start swimming on the surface, straight ahead (0 degrees). |
| `Action.SurfaceSwimStart120R` | `ACT_SURFACE_SWIM_START_120R` | Start swimming on the surface, 120 degrees to the right. |
| `Action.SurfaceSwimStart120L` | `ACT_SURFACE_SWIM_START_120L` | Start swimming on the surface, 120 degrees to the left. |
| `Action.SurfaceSwimIdle` | `ACT_SURFACE_SWIM_IDLE` | Tread water on the surface. |
| `Action.SurfaceSwimCrawl` | `ACT_SURFACE_SWIM_CRAWL` | Swim front crawl on the surface. |
| `Action.SurfaceSwimToUw` | `ACT_SURFACE_SWIM_TO_UW` | Dive from the surface to underwater. |
| `Action.SurfaceIdleQuickturn120R` | `ACT_SURFACE_IDLE_QUICKTURN_120R` | Quick turn while treading water, 120 degrees to the right. |
| `Action.SurfaceIdleQuickturn120L` | `ACT_SURFACE_IDLE_QUICKTURN_120L` | Quick turn while treading water, 120 degrees to the left. |
| `Action.UwSwimIdle` | `ACT_UW_SWIM_IDLE` | Idle underwater. |
| `Action.UwSwimFrog` | `ACT_UW_SWIM_FROG` | Swim underwater (breaststroke). |
| `Action.UwToSurfaceSwim` | `ACT_UW_TO_SURFACE_SWIM` | Surface from underwater. |
| `Action.UwSwimIdleTurn120R` | `ACT_UW_SWIM_IDLE_TURN_120R` | Turn while idle underwater, 120 degrees to the right. |
| `Action.UwSwimIdleTurn120L` | `ACT_UW_SWIM_IDLE_TURN_120L` | Turn while idle underwater, 120 degrees to the left. |
| `Action.Gt2JcParachuteOpen` | `ACT_GT2_JC_PARACHUTE_OPEN` | Open the parachute (special transition variant). |
| `Action.Gt2JcWingsuitOpen` | `ACT_GT2_JC_WINGSUIT_OPEN` | Open the wingsuit (special transition variant). |
| `Action.DieExplosionFront` | `ACT_DIE_EXPLOSION_FRONT` | Die from an explosion in front. |
| `Action.DieExplosionLeft` | `ACT_DIE_EXPLOSION_LEFT` | Die from an explosion on the left. |
| `Action.DieExplosionRight` | `ACT_DIE_EXPLOSION_RIGHT` | Die from an explosion on the right. |
| `Action.DieExplosionBack` | `ACT_DIE_EXPLOSION_BACK` | Die from an explosion behind. |
| `Action.ForceFreefall` | `ACT_FORCE_FREEFALL` | Force freefall. |
| `Action.ForceFastfall` | `ACT_FORCE_FASTFALL` | Force a fast (dive) fall. |
| `Action.RpgFire0Additive` | `ACT_RPG_FIRE_0_ADDITIVE` | Rocket launcher fire recoil (additive), straight ahead (0 degrees). |
| `Action.RpgFire90RAdditive` | `ACT_RPG_FIRE_90R_ADDITIVE` | Rocket launcher fire recoil (additive), 90 degrees to the right. |
| `Action.RpgFire90LAdditive` | `ACT_RPG_FIRE_90L_ADDITIVE` | Rocket launcher fire recoil (additive), 90 degrees to the left. |
| `Action.NullGlobalPartial` | `ACT_NULL_GLOBAL_PARTIAL` | Empty act for the global partial (upper body) layer. |
| `Action.DemonPassive` | `ACT_DEMON_PASSIVE` | Demon passive state. |
| `Action.DemonHumanPossessionStruggleInto` | `ACT_DEMON_HUMAN_POSSESSION_STRUGGLE_INTO` | Start struggling against a demon possession. |
| `Action.HoverboardAimTransLToR` | `ACT_HOVERBOARD_AIM_TRANS_L_TO_R` | On the hoverboard, move the aim from the left side to the right side. |
| `Action.HoverboardAimTransRToL` | `ACT_HOVERBOARD_AIM_TRANS_R_TO_L` | On the hoverboard, move the aim from the right side to the left side. |

### InputAction {#inputaction}

Each value is a 32-bit hash of the game's input action name, the same value [`Hash`](../../shared/hash.md) returns for that name: `Hash("jump") == InputAction.Jump`. For an input action that has no entry here, compare with `Hash` of its name.

Used by:

- [`Input.GetValue(inputAction)`](../input.md): the local player's current value for that input action.
- The client event [`OnLocalPlayerInput(inputAction)`](../events.md#onlocalplayerinputaction): its argument is the hash of the input action the local player triggered; compare it with these values. Cancelling the event with `Event.Cancel()` blocks that input.

| Name | Game input action | Meaning |
|---|---|---|
| `InputAction.Jump` | `jump` | The jump input (the jump button). |

**Example**

```lua
-- client: block jumping while a menu is open, and make the character crouch with C
local menu_open = false

Event.Add("OnLocalPlayerInput", function(input_action)
	if menu_open and input_action == InputAction.Jump then
		Event.Cancel()
	end
end)

Event.Add("OnKeyDown", function(key)
	if key == Key.F1 then
		menu_open = not menu_open
	elseif key == Key.C then
		Local.PlayAction(Action.Crouch)
	elseif key == Key.V then
		Local.PlayAction(Action.Stand)
	end
end)
```