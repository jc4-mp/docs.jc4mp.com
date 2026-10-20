---
sidebar_position: 54
---

# Player (client)

The client-only methods of `PlayerObjectHandle`, which read or change a player's character directly in this client's game.

**Available on:** Client

See also: [Player](../../shared/objects/player.md), [Player (server)](../../server/objects/player.md)

## PlayerObjectHandle methods {#playerobjecthandle-methods}

These methods read or change the player's character directly in this client's game. They work on any player whose character exists in this client's game: the local player, and remote players while they are streamed in.

They only work while the character actually exists in the game. Right after a player streams in or spawns, the character appears on the next frame; until then, and once it is gone, getters return `nil` and setters do nothing.

Changes made by these setters are **local to this client**: other players don't see them. To change something for everyone, do it from the server.

### player\:GetCharacter() {#playergetcharacter}

Returns the game character of this player, a `Character` object with lower-level methods (see [Game objects](../game-objects.md)). Returns `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `Character` or `nil` | the game character |

**Example**

```lua
local character = World.LocalPlayer():AsPlayer():GetCharacter()

if character then
	print(character)
end
```

### player\:GoRagdoll() {#playergoragdoll}

Makes the character fall into ragdoll (go limp and tumble), as if hit by a strong force. On a remote player, only this client sees it.

**Parameters:** none

**Returns:** nothing

**Example**

```lua
Cmd.Add("faint", function()
	World.LocalPlayer():AsPlayer():GoRagdoll()
end)
```

### player\:GetWeapon() {#playergetweapon}

Returns the weapon the character is holding, as a `Weapon` object (see [Weapons](../weapons.md)), or `nil` if they hold none or the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `Weapon` or `nil` | the held weapon |

**Example**

```lua
local weapon = World.LocalPlayer():AsPlayer():GetWeapon()

print(weapon and "armed" or "unarmed")
```

### player\:GetInventory() {#playergetinventory}

Returns the character's inventory as a game object. The inventory currently has no methods or fields available to scripts; the value is only useful to check that the character has one. Returns `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| inventory or `nil` | an opaque inventory object |

**Example**

```lua
if World.LocalPlayer():AsPlayer():GetInventory() then
	print("the local character is ready")
end
```

### player\:UsingParachute() {#playerusingparachute}

Returns whether the character has the parachute open, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether the parachute is open |

**Example**

```lua
Event.Add("OnUpdate", function()
	local player = World.LocalPlayer()

	if player and player:AsPlayer():UsingParachute() then
		-- show an altitude meter while parachuting
	end
end)
```

### player\:UsingWingsuit() {#playerusingwingsuit}

Returns whether the character is flying with the wingsuit, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether the wingsuit is in use |

**Example**

```lua
local player = World.LocalPlayer():AsPlayer()

if player:UsingWingsuit() then
	print(string.format("wingsuit speed: %.0f m/s", player:GetVelocity():length()))
end
```

### player\:IsReeledIn() {#playerisreeledin}

Returns whether the character has been pulled in all the way by the grappling hook, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether the character is reeled in |

**Example**

```lua
if player:IsReeledIn() then
	print("hanging from the grapple point")
end
```

### player\:IsReelingIn() {#playerisreelingin}

Returns whether the character is currently being pulled by the grappling hook, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether the character is reeling in |

**Example**

```lua
if player:IsReelingIn() then
	print("grappling")
end
```

### player\:IsRagdolling() {#playerisragdolling}

Returns whether the character is in ragdoll (limp, tumbling), `nil` if the character doesn't exist in the game. See also the `OnPlayerRagdollStart` and `OnPlayerRagdollEnd` [client events](../events.md).

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether the character is ragdolling |

**Example**

```lua
if player:IsRagdolling() then
	print("down!")
end
```

### player\:IsGettingUpFromRagdoll() {#playerisgettingupfromragdoll}

Returns whether the character is standing back up after a ragdoll, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether the character is getting up |

**Example**

```lua
local busy = player:IsRagdolling() or player:IsGettingUpFromRagdoll()
```

### player\:IsHeadUnderwater() {#playerisheadunderwater}

Returns whether the character's head is under water (the character is losing oxygen), `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether the head is under water |

**Example**

```lua
local player = World.LocalPlayer():AsPlayer()

if player:IsHeadUnderwater() then
	print(string.format("oxygen: %.0f / %.0f", player:GetOxygen(), player:GetMaxOxygen()))
end
```

### player\:IsSwimming() {#playerisswimming}

Returns whether the character is swimming, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether the character is swimming |

**Example**

```lua
if player:IsSwimming() then
	print("splash")
end
```

### player\:IsCloaked() {#playeriscloaked}

Returns whether the character is cloaked (the game's invisibility effect) on this client, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether the character is cloaked |

**Example**

```lua
local player = World.LocalPlayer():AsPlayer()

player:SetCloaked(not player:IsCloaked())
```

### player\:SetCloaked(enabled) {#playersetcloakedenabled}

Turns the cloak (the game's invisibility effect) on or off for the character, in this client's game only. To make a player invisible to everyone, each client must do it, for example from a [Net](../../shared/net.md) event sent by the server.

**Parameters**

| Name | Type | Description |
|---|---|---|
| enabled | `boolean` | `true` to cloak, `false` to uncloak |

**Returns:** nothing

**Example**

```lua
-- client: the server tells everyone who is invisible
Net.AddEvent("SetInvisible", function(target, enabled)
	-- target arrives as a PlayerObjectHandle, or nil when that player isn't streamed in
	if target then
		target:SetCloaked(enabled)
	end
end)
```

### player\:SetGhostMode(enabled) {#playersetghostmodeenabled}

Turns the game's ghost mode on or off for the character, in this client's game only.

**Parameters**

| Name | Type | Description |
|---|---|---|
| enabled | `boolean` | `true` to enable ghost mode |

**Returns:** nothing

**Example**

```lua
World.LocalPlayer():AsPlayer():SetGhostMode(true)
```

### player\:SetOpacity(opacity) {#playersetopacityopacity}

Sets how opaque the character is drawn, in this client's game only. `1` is fully visible; lower values make the character more transparent.

**Parameters**

| Name | Type | Description |
|---|---|---|
| opacity | `number` | the opacity, `1` for fully visible |

**Returns:** nothing

**Example**

```lua
-- fade spectated players
for _, client in ipairs(World.GetPlayers()) do
	local obj = client:GetPlayer()

	if obj and client ~= World.LocalClient() then
		obj:AsPlayer():SetOpacity(0.4)
	end
end
```

### player\:GetBonePosition(bone) {#playergetbonepositionbone}

Returns the world position (in meters) of one of the character's skeleton bones, `nil` if the character doesn't exist in the game. Useful to attach effects, draw markers above the head or aim at a body part.

**Parameters**

| Name | Type | Description |
|---|---|---|
| bone | `integer` | a [Bone](../enums/bone.md) value, for example `Bone.Hips` |

**Returns**

| Type | Description |
|---|---|
| `vec3` or `nil` | the bone's position |

**Example**

```lua
local hips = World.LocalPlayer():AsPlayer():GetBonePosition(Bone.Hips)

if hips then
	print("hips at " .. tostring(hips))
end
```

### player\:GetAimPosition() {#playergetaimposition}

Returns the world position (in meters) the character is aiming at, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `vec3` or `nil` | the aim position |

**Example**

```lua
-- client: tell the server where the local player is aiming
Cmd.Add("mark", function()
	local aim = World.LocalPlayer():AsPlayer():GetAimPosition()

	if aim then
		Net.Send("Mark", aim)
	end
end)
```

### player\:GetGrappleTargetObject() {#playergetgrappletargetobject}

Returns the networked object the character's grappling hook is currently targeting, as its typed handle (`PlayerObjectHandle`, `VehicleHandle`, `MountedGunHandle`, `RigidObjectHandle`, `NPCHandle`, `TetherHandle` or `SandstormHandle`). Returns `nil` if the grapple targets nothing, targets something that isn't a networked object (terrain, a building), or the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| typed handle or `nil` | the targeted object |

**Example**

```lua
local target = World.LocalPlayer():AsPlayer():GetGrappleTargetObject()

if target and target:GetType() == NetObjectType.Vehicle then
	print("grapple is on vehicle " .. target:GetId())
end
```

### player\:GetAABB() {#playergetaabb}

Returns the character's bounding box in world coordinates, as an `AABB` with `min` and `max` corners (see [Math](../../shared/math.md)). Returns `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `AABB` or `nil` | the world-space bounding box |

**Example**

```lua
local box = player:GetAABB()

if box then
	print("height: " .. (box.max.y - box.min.y))
end
```

### player\:GetLocalAABB() {#playergetlocalaabb}

Returns the character's bounding box in model space (relative to the character's own position and rotation), as an `AABB`. Returns `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `AABB` or `nil` | the model-space bounding box |

**Example**

```lua
local box = player:GetLocalAABB()

if box then
	print(tostring(box))
end
```

### player\:GetOxygen() {#playergetoxygen}

Returns the character's current oxygen (used while under water), `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `number` or `nil` | the current oxygen |

**Example**

```lua
local player = World.LocalPlayer():AsPlayer()
local ratio = player:GetOxygen() / player:GetMaxOxygen()

print(string.format("oxygen: %d%%", math.floor(ratio * 100)))
```

### player\:GetMaxOxygen() {#playergetmaxoxygen}

Returns the character's maximum oxygen, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `number` or `nil` | the maximum oxygen |

**Example**

```lua
print("max oxygen: " .. World.LocalPlayer():AsPlayer():GetMaxOxygen())
```

### player\:GetOxygenRecoveryRate() {#playergetoxygenrecoveryrate}

Returns how fast the character's oxygen recovers out of water, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `number` or `nil` | the recovery rate |

**Example**

```lua
print("oxygen recovery: " .. World.LocalPlayer():AsPlayer():GetOxygenRecoveryRate())
```

### player\:SetOxygen(oxygen) {#playersetoxygenoxygen}

Sets the character's current oxygen, in this client's game only.

**Parameters**

| Name | Type | Description |
|---|---|---|
| oxygen | `number` | the new current oxygen |

**Returns:** nothing

**Example**

```lua
-- refill the local player's breath
local player = World.LocalPlayer():AsPlayer()

player:SetOxygen(player:GetMaxOxygen())
```

### player\:SetMaxOxygen(oxygen) {#playersetmaxoxygenoxygen}

Sets the character's maximum oxygen, in this client's game only. A higher value lets the player stay under water longer.

**Parameters**

| Name | Type | Description |
|---|---|---|
| oxygen | `number` | the new maximum oxygen |

**Returns:** nothing

**Example**

```lua
-- double the time the local player can hold their breath
local player = World.LocalPlayer():AsPlayer()

player:SetMaxOxygen(player:GetMaxOxygen() * 2)
```

### player\:SetOxygenRecoveryRate(rate) {#playersetoxygenrecoveryraterate}

Sets how fast the character's oxygen recovers out of water, in this client's game only.

**Parameters**

| Name | Type | Description |
|---|---|---|
| rate | `number` | the new recovery rate |

**Returns:** nothing

**Example**

```lua
local player = World.LocalPlayer():AsPlayer()

player:SetOxygenRecoveryRate(player:GetOxygenRecoveryRate() * 3)
```

### player\:GetWetFactor() {#playergetwetfactor}

Returns how wet the character looks, `nil` if the character doesn't exist in the game. `0` is dry; it rises when the character is in water or rain.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `number` or `nil` | the wetness |

**Example**

```lua
if World.LocalPlayer():AsPlayer():GetWetFactor() > 0 then
	print("you're wet")
end
```

### player\:SetWetFactor(factor) {#playersetwetfactorfactor}

Sets how wet the character looks, in this client's game only. `0` or less dries the character completely.

**Parameters**

| Name | Type | Description |
|---|---|---|
| factor | `number` | the wetness, `0` or less to dry |

**Returns:** nothing

**Example**

```lua
-- dry off when leaving the water
World.LocalPlayer():AsPlayer():SetWetFactor(0)
```

### player\:GetSnowFactor() {#playergetsnowfactor}

Returns how much snow covers the character, `nil` if the character doesn't exist in the game. `0` is no snow.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `number` or `nil` | the snow cover |

**Example**

```lua
print("snow: " .. World.LocalPlayer():AsPlayer():GetSnowFactor())
```

### player\:SetSnowFactor(factor) {#playersetsnowfactorfactor}

Sets how much snow covers the character, in this client's game only. `0` removes the snow.

**Parameters**

| Name | Type | Description |
|---|---|---|
| factor | `number` | the snow cover, `0` for none |

**Returns:** nothing

**Example**

```lua
World.LocalPlayer():AsPlayer():SetSnowFactor(1)
```

### player\:PlayAttachedEffect(effect, restartIfPlaying) {#playerplayattachedeffecteffect-restartifplaying}

Plays one of the game's character effects (screen and body effects such as the concussion or near-death effect) on the character, in this client's game only.

**Parameters**

| Name | Type | Description |
|---|---|---|
| effect | `integer` | a [CharacterAttachedEffect](../enums/character-attached-effect.md) value, for example `CharacterAttachedEffect.Concussion` |
| restartIfPlaying | `boolean` | whether to start the effect over if it is already playing |

**Returns:** nothing

**Example**

```lua
Event.Add("OnPlayerDamage", function(player)
	if player == World.LocalPlayer():AsPlayer() then
		player:PlayAttachedEffect(CharacterAttachedEffect.Concussion, false)
	end
end)
```

### player\:IsReloading() {#playerisreloading}

Returns whether the character is reloading, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether the character is reloading |

**Example**

```lua
if World.LocalPlayer():AsPlayer():IsReloading() then
	print("reloading...")
end
```

### player\:IsFiring() {#playerisfiring}

Returns whether the character is firing their weapon, `nil` if the character doesn't exist in the game.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether the character is firing |

**Example**

```lua
Event.Add("OnUpdate", function()
	local player = World.LocalPlayer()

	if player and player:AsPlayer():IsFiring() then
		-- draw a hit marker overlay, play a sound, ...
	end
end)
```

### player\:HasFiredWeaponRecently(threshold) {#playerhasfiredweaponrecentlythreshold}

Returns whether the character fired a weapon within the last `threshold` amount of time, `nil` if the character doesn't exist in the game. The time unit is the game's own; it is presumably seconds, but this hasn't been verified.

**Parameters**

| Name | Type | Description |
|---|---|---|
| threshold | `number` | the time window to look back over |

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | whether a shot was fired within the window |

**Example**

```lua
-- only allow healing when the player hasn't been shooting
if not World.LocalPlayer():AsPlayer():HasFiredWeaponRecently(5) then
	Net.Send("RequestHeal")
end
```