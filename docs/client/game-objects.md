---
sidebar_position: 62
---

# Game objects

Besides the synced network objects (players, vehicles, NPCs... reached through [object handles](./objects/object-handle.md)), client scripts can hold direct references to objects inside this client's game: a point of interest on the map, a client-only rigid object, a water box, a force pulse, a player's character, a visual effect. These references are the usertypes on this page.

They are **local to the client that holds them**. Nothing you do through them is sent to the server or seen by other players, and they are not handles: there is no validation, so a reference to an object that no longer exists must not be used (see [Lifetime](#lifetime)).

**Available on:** Client

## Where they come from {#where-they-come-from}

| Type | Returned by |
|---|---|
| [`POI`](#poi) | [`World.SpawnPOI`](./world.md) (client) |
| [`RigidObject`](#rigidobject) | [`World.SpawnRigidObject`](./world.md) (client) |
| [`WaterBox`](#waterbox) | [`World.SpawnWaterBox`](./world.md) (client) |
| [`ForcePulse`](#forcepulse) | [`World.SpawnForcePulse`](./world.md) (client) |
| [`Character`](#character) | [`player:GetCharacter()`](./objects/player.md) |
| [`Weapon`](./weapons.md) | [`player:GetWeapon()`](./objects/player.md) |
| [`GameObject`](#gameobject) | the `GO()` method of every type below, and the `gameObject` field of [`Physics.Raycast`](./physics.md#physicsraycastfrom-to-layer) |
| [`EffectInstance`](#effectinstance) | [`FX.Spawn`](./fx.md#fxspawnname-position-rotation) |

`Vehicle` exists as a type, but no function currently returns it directly.

## Types and their methods {#types-and-their-methods}

```
Character    common methods, GetHP
Vehicle      common methods, GetHP
RigidObject  common methods, GetHP, SetMotionType, EnableCollision, SetPosition, SetRotation
POI          common methods
WaterBox     common methods
ForcePulse   common methods, Explode
Weapon       common methods
GameObject      GetPosition, GetRotation, GetEulerRotation, Destroy
EffectInstance  Play, SetParameter, Stop   (not a GameObject)
```

The common methods are `GetPosition`, `GetRotation`, `GetEulerRotation`, `Destroy` and `GO`, documented once in [Methods every type has](#methods-every-type-has). They read the object's real transform, so `obj:GetPosition()` gives the same result as `obj:GO():GetPosition()`. The one exception is the [`POI`](#poi).

## Lifetime {#lifetime}

- Everything a resource spawns through `World.SpawnPOI`, `World.SpawnRigidObject`, `World.SpawnWaterBox`, `World.SpawnForcePulse` and `FX.Spawn` is owned by that resource. When the resource stops (or restarts), all of it is destroyed automatically: POIs disappear from the map, rigid objects, water boxes and force pulses are removed from the world, and effects are stopped.
- `POI`, `RigidObject`, `WaterBox` and `ForcePulse` objects can be destroyed early with [`Destroy`](#objectdestroy).
- `Character` and `Weapon` values belong to the game, not to your script. They stay valid only while that player's character (or the weapon) exists; respawns, disconnections and weapon switches replace them. Fetch them again when you need them instead of storing them.
- None of these types is checked before use. Calling a method on an object that was destroyed can crash the game. After `Destroy`, set your variable to `nil`.

## Methods every type has {#methods-every-type-has}

`Character`, `Vehicle`, `RigidObject`, `POI`, `WaterBox`, `ForcePulse` and [`Weapon`](./weapons.md) all have these methods. `GetHP` is only on `Character`, `Vehicle` and `RigidObject`.

### object\:GetPosition() {#objectgetposition}

Returns the object's world position.

For a `POI` it is the POI's own position, where it was spawned. A POI's `GO()` part is not moved with it and stays at the world origin, so use `poi:GetPosition()`, not `poi:GO():GetPosition()`.

**Returns** `vec3`, in meters. `vec3(0, 0, 0)` when called on `nil`.

**Example**

```lua
local poi = World.SpawnPOI(vec3(-3800, 120, 2200), POIType.UserPlaced, POIDisplayMode.WorldAndMap, 0, 5000)
local distance = (poi:GetPosition() - World.LocalPlayer():GetPosition()):length()

print(string.format("%.0f m to the marker", distance))
```

### object\:GetRotation() {#objectgetrotation}

Returns the object's world rotation.

**Returns** `quat`. The identity quaternion when called on `nil`.

**Example**

```lua
local character = World.LocalPlayer():AsPlayer():GetCharacter()

if character then
	local forward = character:GetRotation() * vec3(0, 0, 1)
	print("facing " .. tostring(forward))
end
```

### object\:GetEulerRotation() {#objectgeteulerrotation}

Returns the object's world rotation as Euler angles, in **radians**, as `vec3(pitch, yaw, roll)` (yaw is the rotation around the vertical axis). This is the same convention as [`rigidObject:SetRotation`](#rigidobjectsetrotationrotation).

**Returns** `vec3`. `vec3(0, 0, 0)` when called on `nil`.

**Example**

```lua
local character = World.LocalPlayer():AsPlayer():GetCharacter()

if character then
	local heading = math.deg(character:GetEulerRotation().y)
	print(string.format("heading %.0f degrees", heading))
end
```

### object\:Destroy() {#objectdestroy}

Releases the calling resource's ownership of an object it spawned and removes it from the world right away. It works on the spawned value and on its `GO()` alike:

```lua
poi:Destroy()
rigidObject:GO():Destroy()
```

Calling it again, or calling it on an object your resource did not spawn (a player's character, a weapon, a vehicle), does nothing.

Do not use the value after destroying it.

**Returns** nothing.

**Example**

```lua
-- a temporary map marker that disappears after 30 seconds
local marker = World.SpawnPOI(vec3(-3800, 120, 2200), POIType.UserPlaced, POIDisplayMode.WorldAndMap, 0, 5000)

Timer.Set(function()
	marker:Destroy()
	marker = nil
end, 30000, 1)
```

### object\:GO() {#objectgo}

Returns the object's [`GameObject`](#gameobject) part. You rarely need it, since every type has the transform methods and `Destroy` itself.

**Returns** `GameObject`.

**Example**

```lua
-- given a Vehicle value
local position = vehicle:GO():GetPosition() -- same as vehicle:GetPosition()
```

### object\:GetHP() {#objectgethp}

Only on `Character`, `Vehicle` and `RigidObject`. Returns the object's current hit points as the game stores them: a whole number of HP, **not** the 0..1 health fraction used by the synced object handles. An object with 0 HP or less is dead or destroyed.

**Returns** `integer`.

**Example**

```lua
local character = World.LocalPlayer():AsPlayer():GetCharacter()

if character then
	print("raw character HP: " .. character:GetHP())
end
```

## GameObject {#gameobject}

The game's base part of an object, returned by `GO()` and by [`Physics.Raycast`](./physics.md#physicsraycastfrom-to-layer). It has `GetPosition`, `GetRotation`, `GetEulerRotation` and `Destroy`, which behave like the [methods every type has](#methods-every-type-has); it has no `GO`.

## POI {#poi}

A point of interest: a marker on the map, minimap and HUD (with distance label and GPS route), created with [`World.SpawnPOI`](./world.md). It only exists on the client that spawned it. It has the [methods every type has](#methods-every-type-has); read its position with `poi:GetPosition()`, since its `GO()` part stays at the world origin.

## Character {#character}

A player's in-game character (the body that walks, ragdolls and holds weapons), returned by [`player:GetCharacter()`](./objects/player.md). It has the [methods every type has](#methods-every-type-has) and [`GetHP`](#objectgethp).

**Example**

```lua
Event.Add("OnRender", function()
	for _, object in ipairs(World.GetAllByType(NetObjectType.Player)) do
		local character = object:AsPlayer():GetCharacter()

		if character then
			Render.DrawSphere(character:GetPosition() + vec3(0, 2.2, 0), 0.15, vec4(1, 0.8, 0, 1), false)
		end
	end
end)
```

## Vehicle {#vehicle}

A vehicle inside the game. Scripts normally use the synced [`VehicleHandle`](../shared/objects/vehicle.md) instead; no function currently returns this type. It has the [methods every type has](#methods-every-type-has) and [`GetHP`](#objectgethp).

## RigidObject {#rigidobject}

A physics prop (barrel, crate, debris...) spawned on this client only with [`World.SpawnRigidObject`](./world.md). It is not synced: other players do not see it. For a synced prop, spawn it from the server, which gives a [`RigidObjectHandle`](../shared/objects/rigid-object.md). It has the [methods every type has](#methods-every-type-has), [`GetHP`](#objectgethp) and the methods below.

### rigidObject\:SetMotionType(motionType) {#rigidobjectsetmotiontypemotiontype}

Changes how physics moves the object.

**Parameters**

| Name | Type | Description |
|---|---|---|
| motionType | [`RigidObjectMotionType`](../shared/enums/rigid-object.md) | `Static` never moves, `Keyframed` only moves when you set its transform (it pushes other objects but nothing pushes it), `Dynamic` is fully simulated (falls, gets pushed, reacts to explosions). |

**Returns** nothing.

**Example**

```lua
-- freeze a prop in place, then let it fall 5 seconds later
barrel:SetMotionType(RigidObjectMotionType.Keyframed)

Timer.Set(function()
	barrel:SetMotionType(RigidObjectMotionType.Dynamic)
end, 5000, 1)
```

### rigidObject\:EnableCollision(enable) {#rigidobjectenablecollisionenable}

Turns the object's collision on or off. With collision off, players, vehicles and other objects pass through it. Turning it back on restores the collision layer that matches its current motion type.

**Parameters**

| Name | Type | Description |
|---|---|---|
| enable | `boolean` | `true` to collide, `false` to let everything pass through. |

**Returns** nothing.

**Example**

```lua
-- a ghost crate the player can walk through
crate:EnableCollision(false)
```

### rigidObject\:SetPosition(position) {#rigidobjectsetpositionposition}

Teleports the object to `position`, keeping its rotation. The move is instant (no sweep), works whatever the motion type, and also moves a sleeping, static or keyframed body.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | New world position, in meters. |

**Returns** nothing.

**Example**

```lua
-- move a keyframed platform up and down
local base = platform:GetPosition()

Event.Add("OnUpdate", function()
	local t = Client.GetElapsedSeconds()
	platform:SetPosition(base + vec3(0, math.sin(t) * 3, 0))
end)
```

### rigidObject\:SetRotation(rotation) {#rigidobjectsetrotationrotation}

Sets the object's rotation, keeping its position. The move is instant, like `SetPosition`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| rotation | `vec3` | Euler angles in **radians**, `vec3(pitch, yaw, roll)`, the same convention as [`GetEulerRotation`](#objectgeteulerrotation). |

**Returns** nothing.

**Example**

```lua
-- spin a prop around the vertical axis
local yaw = 0

Event.Add("OnUpdate", function()
	yaw = yaw + World.GetUpdateDeltaTime()
	crate:SetRotation(vec3(0, yaw, 0))
end)
```

## WaterBox {#waterbox}

A box of swimmable water created with [`World.SpawnWaterBox`](./world.md). It only exists on the client that spawned it. Its shape is chosen with [`WaterBoxStyle`](./enums/water-box-style.md). It has the [methods every type has](#methods-every-type-has).

**Example**

```lua
local water = World.SpawnWaterBox(World.LocalPlayer():AsPlayer():GetAimPosition(), vec3(10, 5, 10), WaterBoxStyle.NoClip)

if water then
	print("pool at " .. tostring(water:GetPosition()))

	-- remove it after a minute
	Timer.Set(function() water:Destroy() end, 60000, 1)
end
```

## ForcePulse {#forcepulse}

An explosion force created with [`World.SpawnForcePulse`](./world.md): when it explodes it pushes physics objects, characters and vehicles away and deals the damage of its [`ForcePulseTuning`](./enums/force-pulse.md#forcepulsetuning). It is local to this client and has no visual effect or sound of its own; pair it with [`FX.Spawn`](./fx.md#fxspawnname-position-rotation) for the visuals. It has the [methods every type has](#methods-every-type-has) and `Explode`.

### forcePulse\:Explode() {#forcepulseexplode}

Detonates the pulse. The explosion is scheduled and happens on the next game tick, not during the call. A spawned pulse does nothing until you call `Explode`. The pulse object stays after exploding; call [`Destroy`](#objectdestroy) when you no longer need it.

The pulse's tuning must be one of the [`ForcePulseTuning`](./enums/force-pulse.md#forcepulsetuning) values. A made-up tuning value can crash the game when the pulse explodes.

**Returns** nothing.

**Example**

```lua
-- an invisible shockwave that throws everything around the aim point
Cmd.Add("push", function()
	local target = World.LocalPlayer():AsPlayer():GetAimPosition()
	local pulse = World.SpawnForcePulse(target, ForcePulseTuning.Generic10m, 10, ForcePulseCategory.Manual, 150, 150)

	if pulse then
		pulse:Explode()
		Timer.Set(function() pulse:Destroy() end, 1000, 1)
	end
end)
```

## EffectInstance {#effectinstance}

A visual effect (particles, fire, smoke, decals...) playing in the world, returned by [`FX.Spawn`](./fx.md#fxspawnname-position-rotation). It is not a `GameObject`. It is local to this client and owned by the resource that spawned it: when the resource stops every effect it spawned is stopped.

### effectInstance\:Play(position) {#effectinstanceplayposition}

Plays the same effect again at `position`, with no rotation. Useful to replay a one-shot effect (an impact, a muzzle flash) without spawning a new instance each time.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | World position to play the effect at. |

**Returns** `boolean`: `true` when the game started the effect, `false` when this instance never played successfully (for example `FX.Spawn` was given an unknown effect name).

**Example**

```lua
local spark = FX.Spawn("effects/jc_weapons/pistol/impact_default_pistol.effc", vec3(0, 0, 0), vec3(0, 0, 0))

Event.Add("OnKeyDown", function(key)
	if key == Key.F then
		spark:Play(World.LocalPlayer():AsPlayer():GetAimPosition())
	end
end)
```

### effectInstance\:SetParameter(hash, value, discrete) {#effectinstancesetparameterhash-value-discrete}

Sets one of the effect's tunable parameters, for effects that expose them (color, intensity, size... depending on how the effect was authored). Parameters are identified by the 32-bit hash of their name: pass [`Hash`](../shared/hash.md) of the name.

**Parameters**

| Name | Type | Description |
|---|---|---|
| hash | `integer` | Hash of the parameter's name, from [`Hash`](../shared/hash.md). |
| value | `vec4` | New value. Parameters with fewer components use the first ones. |
| discrete | `boolean` | Passed to the game with the value; `false` is the normal choice. Always pass it explicitly. |

**Returns** nothing.

**Example**

```lua
local PARAM_COLOR = Hash("color") -- use the name of a parameter the effect exposes

fx:SetParameter(PARAM_COLOR, vec4(1, 0, 0, 1), false)
```

### effectInstance\:Stop(instant) {#effectinstancestopinstant}

Stops the effect. The instance is kept by its resource, so you can [`Play`](#effectinstanceplayposition) it again later.

**Parameters**

| Name | Type | Description |
|---|---|---|
| instant | `boolean` | `true` removes the effect immediately; `false` asks the game to end it its normal way, which for most effects lets what is already visible finish. Always pass it explicitly. |

**Returns** `boolean`: what the game reports for the stop request.

**Example**

```lua
local fire = FX.Spawn("effects/fire/generic_fire_sm_01.effc", position, vec3(0, 0, 0))

-- put the fire out after 10 seconds, letting the flames die down
Timer.Set(function() fire:Stop(false) end, 10000, 1)
```