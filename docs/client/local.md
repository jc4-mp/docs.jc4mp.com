---
sidebar_position: 59
---

# Local

The `Local` table holds actions that only make sense for the local player, the player running this client: playing animations and game actions on their character, unlocking abilities, enabling the hoverboard, moving their character directly and showing the scan view. To read information about the local player, get their character with `World.LocalPlayer()` and use the [PlayerObjectHandle](../shared/objects/player.md) methods; see [Players](../shared/objects/players.md).

Some of these functions only change this client's game, others ask the server to change the player for everyone. Each entry says which.

The functions that act on the character (`PlayAction`, `SetPosition`, `SetLinearVelocity`) and the ability and hoverboard functions need the local player to be in the game. Call them from events and commands once the local player has spawned (for example after checking that `World.LocalPlayer()` isn't `nil`), never at the top level of a script that starts while the game is still loading.

**Available on:** Client

## Functions {#functions}

### Local.PlayAnimation(animation, loop?) {#localplayanimationanimation-loop}

Asks the server to play a custom animation on the local player's character. The server applies it exactly as the server-side `player:PlayAnimation` does: every player who sees the character sees the animation, and `player:GetAnimation()` returns it on every side. See the [animations list](../lists/animations.md).

If the game can't play the animation (an unknown path, for example), nothing visible happens and an error is written to the client's log.

**Parameters**

| Name | Type | Description |
|---|---|---|
| animation | `string` | the animation path, at most 255 characters (longer raises a Lua error) |
| loop | `boolean` | optional, default `false`. Whether the animation repeats until stopped |

**Returns:** nothing

**Example**

```lua
local CLAP = "animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_gentle_clapping_loop.ban"

Cmd.Add("clap", function()
	Local.PlayAnimation(CLAP, true)
end)

Cmd.Add("stop", function()
	Local.StopAnimation()
end)
```

### Local.StopAnimation() {#localstopanimation}

Asks the server to stop the custom animation the local player is playing, for everyone.

**Parameters:** none

**Returns:** nothing

**Example**

```lua
-- stop dancing as soon as the player takes damage
Event.Add("OnPlayerDamage", function(player)
	local me = World.LocalPlayer()

	if me and player == me:AsPlayer() and player:GetAnimation() ~= "" then
		Local.StopAnimation()
	end
end)
```

### Local.PlayAction(action) {#localplayactionaction}

Makes the local player's character perform a game **action** (an animation and behavior from the character's action set, such as a hit reaction, a stumble or crouching), the same way the game itself triggers them. The action starts up to a frame later. Whether the character actually performs it depends on its current state: an action that makes no sense in that state, like `ExitVehicle` while on foot, is ignored by the game.

It only acts in this client's game and nothing is sent by the call itself; other players see the resulting movement through the normal movement sync. It does nothing while the local player's character does not exist (before joining and spawning).

**Parameters**

| Name | Type | Description |
|---|---|---|
| action | `integer` | an [Action](./enums/action.md#action) value, for example `Action.HitreactStumble` |

**Returns:** nothing

**Example**

```lua
-- make the local player stumble
Cmd.Add("stumble", function()
	Local.PlayAction(Action.HitreactStumble)
end)
```

### Local.UnlockAbility(ability) {#localunlockabilityability}

Unlocks one of the local player's abilities (wingsuit, parachute, grappling hook, ...), so they can use it. Abilities are a property of this client's game: the change isn't sent to the server or to other players, so a gamemode that wants every player to have an ability unlocks it in its client script.

**Parameters**

| Name | Type | Description |
|---|---|---|
| ability | `integer` | an [Ability](./enums/ability.md) value, for example `Ability.Wingsuit` |

**Returns:** nothing

**Example**

```lua
Event.Add("OnResourceStart", function(name)
	if Resource.Name == name then
		Local.UnlockAbility(Ability.Parachute)
		Local.UnlockAbility(Ability.Wingsuit)
		Local.UnlockAbility(Ability.GrapplingHook)
		Local.UnlockAbility(Ability.ExitVehicle)
	end
end)
```

### Local.LockAbility(ability) {#locallockabilityability}

Locks one of the local player's abilities so they can't use it, in this client's game only.

**Parameters**

| Name | Type | Description |
|---|---|---|
| ability | `integer` | an [Ability](./enums/ability.md) value |

**Returns:** nothing

**Example**

```lua
-- a ground-only race: no wingsuit and no parachute
Local.LockAbility(Ability.Wingsuit)
Local.LockAbility(Ability.Parachute)
```

### Local.IsAbilityUnlocked(ability) {#localisabilityunlockedability}

Returns whether one of the local player's abilities is currently unlocked.

**Parameters**

| Name | Type | Description |
|---|---|---|
| ability | `integer` | an [Ability](./enums/ability.md) value |

**Returns**

| Type | Description |
|---|---|
| `boolean` | `true` if the ability is unlocked |

**Example**

```lua
if not Local.IsAbilityUnlocked(Ability.Wingsuit) then
	print("find a wingsuit vendor first!")
end
```

### Local.SetHoverboardEnabled(enabled) {#localsethoverboardenabledenabled}

Allows or forbids the local player to use the hoverboard. It is forbidden by default. The hoverboard only becomes usable if the player owns the game DLC that adds it; for players without it, enabling it has no effect.

When the local player rides the hoverboard, other players see it too.

It can be called before the local player exists, for example in `OnResourceStart` (a resource starts before the player has joined): the setting is kept and applies once the player is in the game. It stays until it is changed again.

**Parameters**

| Name | Type | Description |
|---|---|---|
| enabled | `boolean` | `true` to allow the hoverboard |

**Returns:** nothing

**Example**

```lua
Event.Add("OnResourceStart", function(name)
	if Resource.Name == name then
		Local.SetHoverboardEnabled(true)
	end
end)
```

### Local.IsHoverboardEnabled() {#localishoverboardenabled}

Returns whether scripts have allowed the local player to use the hoverboard with `SetHoverboardEnabled`. It returns `true` after `SetHoverboardEnabled(true)` even for players who don't own the DLC.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` | whether the hoverboard is allowed |

**Example**

```lua
Cmd.Add("hoverboard", function()
	Local.SetHoverboardEnabled(not Local.IsHoverboardEnabled())
end)
```

### Local.SetPosition(position) {#localsetpositionposition}

Moves the local player's character to a position immediately, keeping its rotation. The move happens in this client's game; other players see the character at the new position through the normal movement sync. It does nothing while the local character doesn't exist (before joining or spawning). Unlike the server-side `player:Teleport`, this doesn't fire `OnPlayerTeleport`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | the destination in meters; must be finite (a NaN or infinite value raises a Lua error) |

**Returns:** nothing

**Example**

```lua
-- teleport to the map waypoint
Cmd.Add("tpwp", function()
	if World.GetWaypoint() then
		Local.SetPosition(World.GetWaypointPosition() + vec3(0, 2, 0))
	end
end)
```

### Local.SetLinearVelocity(velocity) {#localsetlinearvelocityvelocity}

Sets the local player's character velocity, in meters per second in world coordinates. Use it to launch, push or stop the character. It does nothing while the local character doesn't exist. Like `SetPosition`, it acts in this client's game and other players see the result through the normal movement sync.

**Parameters**

| Name | Type | Description |
|---|---|---|
| velocity | `vec3` | the new velocity in m/s; must be finite (a NaN or infinite value raises a Lua error) |

**Returns:** nothing

**Example**

```lua
-- super jump
Cmd.Add("jump", function()
	Local.SetLinearVelocity(vec3(0, 40, 0))
end)
```

### Local.ShowScan(show) {#localshowscanshow}

Opens or closes the game's scan view on the local player's screen. Opening or closing it this way doesn't fire the `OnScanStart` and `OnScanEnd` [client events](./events.md), which only fire when the player opens or closes it.

**Parameters**

| Name | Type | Description |
|---|---|---|
| show | `boolean` | `true` to open the scan view, `false` to close it |

**Returns:** nothing

**Example**

```lua
-- block the player's own scan, but show it for 5 seconds when the round starts
Event.Add("OnScanStart", function()
	Event.Cancel()
end)

Net.AddEvent("RoundStart", function()
	Local.ShowScan(true)

	Timer.Set(function()
		Local.ShowScan(false)
	end, 5000, 1)
end)
```