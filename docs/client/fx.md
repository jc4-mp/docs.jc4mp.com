---
sidebar_position: 66
---

# FX

The `FX` table plays the game's visual effects (fire, smoke, sparks, explosions' particles, impacts, water splashes, trails...) anywhere in the world. Use it for cosmetic feedback: a marker flare, an impact where a script-made shot lands, smoke over a capture point.

**Available on:** Client

Effects are local to the client that spawns them: other players only see an effect if their own client spawns it too (for example in response to a [`Net`](../shared/net.md) event from the server). Effects have no gameplay impact: no damage, no physics force and no sound. For an actual blast, see [`World.SpawnForcePulse`](./world.md) and the [ForcePulse](./game-objects.md#forcepulse) object.

## Functions {#functions}

### FX.Spawn(name, position, rotation) {#fxspawnname-position-rotation}

Loads the effect called `name` (and everything it uses) if the game does not already have it loaded, then starts it at `position` with `rotation`. The effect plays once with its own duration; looping effects (fires, smoke columns) keep going until you stop them.

The returned [`EffectInstance`](./game-objects.md#effectinstance) belongs to the calling resource. It stays usable after the effect finishes: call [`Play`](./game-objects.md#effectinstanceplayposition) to replay it somewhere else, or [`Stop`](./game-objects.md#effectinstancestopinstant) to end a looping effect. Every effect a resource spawned is stopped automatically when the resource stops. There is no function to release an instance earlier, so reuse instances (`Play`) for effects you trigger often instead of calling `FX.Spawn` each time.

An unknown name does not raise an error: an `EffectInstance` is still returned, nothing is shown, and its `Play` returns `false`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | Path of the effect in the game archives, ending in `.effc`, for example `"effects/fire/generic_fire_sm_01.effc"`. See the [effects list](../lists/effects.md). |
| position | `vec3` | World position, in meters. |
| rotation | `vec3` | Euler angles in radians, `vec3(x, y, z)` (rotations around the X, Y and Z axes). Use `vec3(0, 0, 0)` for the effect's default orientation. |

**Returns** [`EffectInstance`](./game-objects.md#effectinstance).

**Example**

```lua
-- a burning barrel fire at the point the player aims at, put out after 20 seconds
Cmd.Add("fire", function()
	local target = World.LocalPlayer():AsPlayer():GetAimPosition()
	local fire = FX.Spawn("effects/fire/fire_barrel.effc", target, vec3(0, 0, 0))

	Timer.Set(function() fire:Stop(false) end, 20000, 1)
end)
```

```lua
-- one reusable impact effect, replayed wherever the camera ray hits
local impact = FX.Spawn("effects/jc_weapons/pistol/impact_default_pistol.effc", vec3(0, -1000, 0), vec3(0, 0, 0))

Event.Add("OnKeyDown", function(key)
	if key ~= Key.F then return end

	local from = Camera.GetPosition()
	local to = World.LocalPlayer():AsPlayer():GetAimPosition()
	local hit = Physics.Raycast(from, from + (to - from):normalize() * 500, PfxLayer.RaycastDefault)

	if hit.hasHit then
		impact:Play(hit.hitPos)
	end
end)
```