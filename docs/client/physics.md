---
sidebar_position: 68
---

# Physics

The `Physics` table queries the game's physics world. Its raycast finds the first thing with collision along a line: the ground, buildings, props, vehicles, characters. Use it for line of sight checks, to find where a shot or a look ray lands, to snap things to surfaces, or to find which synced object the player is looking at.

**Available on:** Client

The query runs on this client's copy of the world, so it only sees what is streamed in around this player.

## Functions {#functions}

### Physics.Raycast(from, to, layer) {#physicsraycastfrom-to-layer}

Casts a ray from `from` to `to` and returns the first hit. `layer` selects which kinds of collision the ray hits: [`PfxLayer.RaycastDefault`](./enums/pfx-layer.md) is the usual choice; `PfxLayer.RaycastEverythingPhysical` is meant to hit every physical body.

The ray can hit the local player's own character. Start it a little away from the player (or beside them) when you cast from the player's position.

**Parameters**

| Name | Type | Description |
|---|---|---|
| from | `vec3` | Start of the ray, in world coordinates. |
| to | `vec3` | End of the ray, in world coordinates. |
| layer | [`PfxLayer`](./enums/pfx-layer.md) | The collision layer of the ray, which decides what it collides with. |

**Returns** a new `table`:

| Field | Type | Description |
|---|---|---|
| hasHit | `boolean` | `true` when the ray hit something between `from` and `to`. The other fields are only present when it is `true`. |
| hitPos | `vec3` | The point that was hit. |
| normal | `vec3` | The surface normal at the hit point (a unit vector pointing out of the surface). |
| hitDistance | `number` | The distance in meters from `from` to the hit point. |
| gameObject | [`GameObject`](./game-objects.md#gameobject) or `nil` | The game object that was hit, `nil` when what was hit has no game object (terrain, for example). Its `GetPosition`, `GetRotation` and `GetEulerRotation` give the object's transform. |
| netObject | handle or `nil` | The synced object that was hit, as its typed handle ([`PlayerObjectHandle`](../shared/objects/player.md), [`VehicleHandle`](../shared/objects/vehicle.md), [`MountedGunHandle`](../shared/objects/mounted-gun.md), [`RigidObjectHandle`](../shared/objects/rigid-object.md), [`NPCHandle`](../shared/objects/npc.md), [`TetherHandle`](../shared/objects/tether.md) or [`SandstormHandle`](../shared/objects/sandstorm.md)). `nil` when the hit is not a synced object. |

**Example**

```lua
-- what is the player looking at? (camera ray, 300 m)
Cmd.Add("look", function()
	local from = Camera.GetPosition()
	local aim = World.LocalPlayer():AsPlayer():GetAimPosition()
	local to = from + (aim - from):normalize() * 300

	local hit = Physics.Raycast(from, to, PfxLayer.RaycastDefault)

	if not hit.hasHit then
		print("nothing within 300 m")
		return
	end

	print(string.format("hit at %.1f m, normal %s", hit.hitDistance, tostring(hit.normal)))

	if hit.netObject then
		print("that is a synced object, net id " .. hit.netObject:GetNetId())
	end
end)
```

```lua
-- snap a position to the ground below it
local function ground_below(position)
	local hit = Physics.Raycast(position + vec3(0, 50, 0), position - vec3(0, 200, 0), PfxLayer.RaycastDefault)

	return hit.hasHit and hit.hitPos or nil
end
```