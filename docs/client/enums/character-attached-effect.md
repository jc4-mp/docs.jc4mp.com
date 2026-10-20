---
sidebar_position: 81
---

# CharacterAttachedEffect

`CharacterAttachedEffect` holds the visual effects the game attaches to a character's body: the near-death screen effect, catching fire, splashing water, snow falling off, wingsuit trails, hoverboard effects and more. Use it to play one of them on a player.

**Available on:** Client

## Values {#values}

### CharacterAttachedEffect {#characterattachedeffect}

Used by [`player:PlayAttachedEffect(effect, restartIfPlaying)`](../objects/player.md) (client): plays the effect on that player's character, if it is spawned in the local game (the call does nothing otherwise). `restartIfPlaying` restarts the effect when it is already playing. The effect is only played in the local game; it is not synced to other players.

Several effects come in parts the game normally plays in sequence (`NearDeathEnter` / `NearDeathLoop` / `NearDeathExit`, `AREffectEnter` / `AREffectExit`). Play the parts in the same order.

| Name | Value | Meaning |
|---|---|---|
| `CharacterAttachedEffect.AREffectEnter` | `0x17A48` | Start of the AR (augmented reality scan) effect. |
| `CharacterAttachedEffect.AREffectExit` | `0x17A49` | End of the AR (augmented reality scan) effect. |
| `CharacterAttachedEffect.Concussion` | `0x17A4A` | Concussion effect (hit by a concussion blast). |
| `CharacterAttachedEffect.NearDeathEnter` | `0x17A4B` | Start of the near-death effect (very low health). |
| `CharacterAttachedEffect.NearDeathExit` | `0x17A4C` | End of the near-death effect. |
| `CharacterAttachedEffect.NearDeathLoop` | `0x17A4D` | The looping part of the near-death effect. |
| `CharacterAttachedEffect.Died` | `0x17A4E` | Death effect. |
| `CharacterAttachedEffect.RemoveSnow` | `0x17A4F` | Snow falling off the character. |
| `CharacterAttachedEffect.Wingsuiting` | `0x17A50` | Effect while flying the wingsuit. |
| `CharacterAttachedEffect.Stunting` | `0x17A51` | Effect while on a stunt position. |
| `CharacterAttachedEffect.Hoverboard` | `0x17A52` | Effect while riding the hoverboard. |
| `CharacterAttachedEffect.Magrail` | `0x17A53` | Effect while grinding a magnetic rail. |
| `CharacterAttachedEffect.GetOffHoverboard` | `0x17A54` | Getting off the hoverboard. |
| `CharacterAttachedEffect.HoverboardJump` | `0x17A55` | Jumping with the hoverboard. |
| `CharacterAttachedEffect.HoverboardLand` | `0x17A56` | Landing with the hoverboard. |
| `CharacterAttachedEffect.HoverboardPushOff` | `0x17A57` | Pushing off with the hoverboard. |
| `CharacterAttachedEffect.HoverboardBump` | `0x17A58` | The hoverboard bumping into something. |
| `CharacterAttachedEffect.Persistent` | `0x17A59` | The character's persistent (always on) effect. |
| `CharacterAttachedEffect.Underwater` | `0x17A5A` | Effect while underwater (bubbles). |
| `CharacterAttachedEffect.Parachuting` | `0x17A5B` | Effect while under the parachute. |
| `CharacterAttachedEffect.Swimming` | `0x17A5C` | Effect while swimming. |
| `CharacterAttachedEffect.Freefalling` | `0x17A5D` | Effect while freefalling. |
| `CharacterAttachedEffect.GrappleCharge` | `0x17A5E` | The grapple charging up. |
| `CharacterAttachedEffect.WaterSplash` | `0x17A5F` | A water splash. |
| `CharacterAttachedEffect.EvadeLand` | `0x17A60` | Landing from an evade (dodge roll). |
| `CharacterAttachedEffect.Fire` | `0x17A61` | The character is on fire. |
| `CharacterAttachedEffect.Melee` | `0x17A62` | A melee hit. |
| `CharacterAttachedEffect.Gib` | `0x17A63` | Gibbing (a violent death effect). |
| `CharacterAttachedEffect.BulletDamage` | `0x17A64` | Hit by a bullet. |
| `CharacterAttachedEffect.HeavyBulletDamage` | `0x17A65` | Hit by a heavy bullet. |

**Example**

```lua
-- client: when the server says a player was hit by a flamethrower, set them on fire in this game
Net.AddEvent("playerBurned", function(net_id)
	local object = World.GetObjectByNID(net_id)
	local player = object and object:AsPlayer()

	if player then
		player:PlayAttachedEffect(CharacterAttachedEffect.Fire, true)
	end
end)
```