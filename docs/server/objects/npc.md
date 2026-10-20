---
sidebar_position: 47
---

# NPCHandle (server)

On the server, an [`NPCHandle`](../../shared/objects/npc.md) gives the NPC its orders: movement, look, weapon, aim, firing and one-off actions.

**Available on:** Server

**See also:** [NPCHandle](../../shared/objects/npc.md), [NPCHandle (client)](../../client/objects/npc.md)

## Methods {#methods}

### npc\:Move(direction, moveType, moveStyle) {#npcmovedirection-movetype-movestyle}

Makes the NPC move in a direction until told otherwise, or stand still. Replaces any previous movement or follow order. Synced.

The NPC keeps going in that direction (it does not stop at a destination): to walk to a point, recompute the direction regularly and send `MoveType.Idle` when it arrives.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| direction | `vec3` | the world direction to move in, normally horizontal and normalized. Ignored with `MoveType.Idle` (pass `vec3(0, 0, 0)`) |
| moveType | [`MoveType`](../../shared/enums/npc.md#movetype) | `Walk`, `Run`, `Sprint` or `Idle` (stand still) |
| moveStyle | [`MoveStyle`](../../shared/enums/npc.md#movestyle) | the movement animation set: `Normal`, `Search`, `NervousBackoff`, `Patrol`, `Concerned` or `NervousWalk` |

**Returns:** nothing

**Notes:** a move type or style out of range, or a non-finite direction, raises a Lua error.

**Example**

```lua
-- walk an NPC to a target point, then stop
local function walkTo(npc, target)
	Timer.Set(function()
		local position = npc:GetPosition()

		if not position then
			return
		end

		local delta = vec3(target.x - position.x, 0, target.z - position.z)

		if delta:length() < 1.5 then
			npc:Move(vec3(0, 0, 0), MoveType.Idle, MoveStyle.Normal)
		else
			npc:Move(delta:normalize(), MoveType.Walk, MoveStyle.Normal)
		end
	end, 500, 0)
end
```

### npc\:Follow(target, moveType, moveStyle) {#npcfollowtarget-movetype-movestyle}

Makes the NPC keep moving toward an object (a player, vehicle, another NPC, ...). It heads straight at the target's position every frame and does not stop by itself when it gets there: switch to `Move(vec3(0, 0, 0), MoveType.Idle, ...)` when it is close enough. Replaces any previous movement order. Synced.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| target | `ObjectHandle` | the object to follow |
| moveType | [`MoveType`](../../shared/enums/npc.md#movetype) | `Walk`, `Run`, `Sprint` or `Idle` |
| moveStyle | [`MoveStyle`](../../shared/enums/npc.md#movestyle) | the movement animation set |

**Returns:** nothing

**Notes:** does nothing if `target` no longer exists. A move type or style out of range raises a Lua error.

**Example**

```lua
-- chase the player, stop within 3 m
Timer.Set(function()
	local player = client:GetPlayer()

	if not player then
		return
	end

	if npc:GetPosition():distance(player:GetPosition()) > 3 then
		npc:Follow(player, MoveType.Sprint, MoveStyle.Normal)
	else
		npc:Move(vec3(0, 0, 0), MoveType.Idle, MoveStyle.Normal)
	end
end, 250, 0)
```

### npc\:LookAt(position, lookType) {#npclookatposition-looktype}

Makes the NPC look at a point, with its head only or by turning its whole body. Stays in effect until replaced. Synced. While the NPC aims (see [AimAt](#npcaimatposition)) the aim decides where its body faces.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | the world point to look at. `vec3(0, 0, 0)` stops looking |
| lookType | [`LookType`](../../shared/enums/npc.md#looktype) | `Head` (turn the head only) or `Body` (turn the whole body) |

**Returns:** nothing

**Example**

```lua
npc:LookAt(player:GetPosition() + vec3(0, 1.6, 0), LookType.Head)
```

### npc\:GiveWeapon(weapon) {#npcgiveweaponweapon}

Gives the NPC a weapon and makes it hold it. The NPC never runs out of ammunition. Every NPC also carries hand grenades for [ThrowGrenade](#npcthrowgrenadeposition). Synced.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| weapon | `string` | the weapon name (see [Weapons](../../lists/weapons.md)) |

**Returns:** nothing

**Notes:** a name longer than 255 characters raises a Lua error. Whether an animal can hold a weapon is up to the game.

**Example**

```lua
local soldier = World.SpawnNPC(model, position)

soldier:GiveWeapon(weaponName)
```

### npc\:AimAt(position) {#npcaimatposition}

### npc\:AimAt(target, offset) {#npcaimattarget-offset}

Makes the NPC aim its weapon at a fixed point, or at an object plus an offset (only while that object is visible to the NPC's owner). While it aims it turns its body toward the aim, and it fires at it while [SetFiring](#npcsetfiringenable) is on. Synced.

**Side:** Server

**Parameters (position)**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | the world point to aim at. `vec3(0, 0, 0)` stops aiming |

**Parameters (object)**

| Name | Type | Description |
|---|---|---|
| target | `ObjectHandle` | the object to aim at |
| offset | `vec3` | added to the target's position, in world axes. `vec3(0, 1.2, 0)` aims at a character's chest |

**Returns:** nothing

**Notes:** the object form does nothing if `target` no longer exists.

**Example**

```lua
npc:AimAt(player, vec3(0, 1.2, 0))
npc:SetFiring(true)
```

### npc\:StopAiming() {#npcstopaiming}

Clears the NPC's aim. It stops firing too (firing needs an aim), but [SetFiring](#npcsetfiringenable) stays on, so it fires again as soon as it gets a new aim.

**Side:** Server

**Parameters:** none

**Returns:** nothing

**Example**

```lua
npc:StopAiming()
npc:SetFiring(false)
```

### npc\:SetFiring(enable) {#npcsetfiringenable}

Turns the NPC's firing on or off. It only fires while it also aims at something, and only once its weapon points close enough to the aim.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| enable | `boolean` | `true` to fire at the aim, `false` to hold fire |

**Returns:** nothing

**Example**

```lua
-- shoot in bursts of 2 seconds
npc:AimAt(player, vec3(0, 1.2, 0))

Timer.Set(function()
	npc:SetFiring(true)

	Timer.Set(function() npc:SetFiring(false) end, 2000, 1)
end, 4000, 0)
```

### npc\:ThrowGrenade(position) {#npcthrowgrenadeposition}

Makes the NPC throw one hand grenade at a point. It is a one-off action: only players who see the NPC at that moment see the throw.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | the world point to throw at |

**Returns:** nothing

**Example**

```lua
local player = client:GetPlayer()

if player and npc:GetPosition():distance(player:GetPosition()) < 25 then
	npc:ThrowGrenade(player:GetPosition())
end
```

### npc\:Melee(target) {#npcmeleetarget}

Makes the NPC swing at a player or another NPC. A walking or running NPC keeps moving while it swings. It is a one-off action: only players who see the NPC at that moment see it, and it is dropped in a game where the target is not spawned.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| target | `ObjectHandle` | the player object or NPC to hit |

**Returns:** nothing

**Notes:** does nothing if `target` no longer exists or is not a character.

**Example**

```lua
local player = client:GetPlayer()

if player and npc:GetPosition():distance(player:GetPosition()) < 2 then
	npc:Melee(player)
end
```