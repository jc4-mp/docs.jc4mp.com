---
sidebar_position: 84
---

# PfxLayer

`PfxLayer` holds the game's physics collision layers. Every physics body is in one layer, and a raycast is done with a filter layer that decides which bodies it can hit. Use it to pick what [`Physics.Raycast`](../physics.md) sees: only the static world, everything physical, only vehicles, and so on.

**Available on:** Client

## Values {#values}

### PfxLayer {#pfxlayer}

Used by [`Physics.Raycast(from, to, layer)`](../physics.md) (client): the ray hits what `layer` collides with. The value is passed to the game without checking it.

The layers a raycast is usually done with are the query layers near the end of the table: `RaycastDefault` for ordinary line-of-sight checks, `RaycastEverythingPhysical` to hit anything solid, `StaticAndDestruction` for the world only, and `AllDynamicObjects` for moving things only. The body layers (the first ones) describe what a body is; a ray cast with one of them hits what that kind of body collides with.

| Name | Value | Meaning |
|---|---|---|
| `PfxLayer.FullCollision` | 0 | Collides with everything. |
| `PfxLayer.NoCollision` | 1 | Collides with nothing except `FullCollision`. |
| `PfxLayer.Static` | 2 | Standard static objects (buildings, rocks, props that never move). |
| `PfxLayer.Terrain` | 3 | The terrain (heightfield). |
| `PfxLayer.Dynamic` | 4 | Standard dynamic objects (things physics moves around). |
| `PfxLayer.Destruction` | 5 | Destructible objects. |
| `PfxLayer.CharacterCollision` | 6 | The character capsule (the body that walks around). |
| `PfxLayer.CharacterGhostMode` | 7 | The character capsule while the character is in ghost mode. |
| `PfxLayer.CharacterRagdoll` | 8 | Ragdoll bodies that physics simulates. |
| `PfxLayer.CharacterRagdollKeyframed` | 9 | Ragdoll bodies that follow the animation. |
| `PfxLayer.CharacterAttachedDynamicRb` | 10 | Rigid bodies characters are attached to. |
| `PfxLayer.CharacterRagdollProxies` | 11 | The simplified ragdoll shapes used for aiming and shooting at characters. |
| `PfxLayer.Particle` | 12 | Physical particles. |
| `PfxLayer.Explosive` | 13 | Physical explosives, like grenades. |
| `PfxLayer.Projectile` | 14 | Physical projectiles, like missiles. |
| `PfxLayer.Weapons` | 15 | Weapons lying around in the world. |
| `PfxLayer.VehicleCollisionWheel` | 16 | Vehicle wheels. |
| `PfxLayer.VehicleCollisionDynamicOnly` | 17 | Vehicle bodies that only collide with other dynamic bodies. |
| `PfxLayer.VehicleCollision` | 18 | Vehicle bodies. |
| `PfxLayer.VehicleRaycast` | 19 | The vehicle raycast shape. |
| `PfxLayer.RaycastDefault` | 20 | Query layer: regular raycasts. |
| `PfxLayer.RaycastEverythingPhysical` | 21 | Query layer: hits everything physical. |
| `PfxLayer.RaycastWheels` | 22 | Query layer: hits everything physical, as used by wheels. |
| `PfxLayer.ShapeQueryDefault` | 23 | Query layer: default volume checks. |
| `PfxLayer.ShapeQueryTrigger` | 24 | Query layer: volume triggers. |
| `PfxLayer.ShapeQueryExplosion` | 25 | Query layer: explosion volumes. |
| `PfxLayer.ShapeQueryVehicles` | 26 | Query layer: vehicle volumes. |
| `PfxLayer.StaticAndDestruction` | 27 | Query layer: static objects, terrain and destructible objects. |
| `PfxLayer.AllDynamicObjects` | 28 | Query layer: every dynamic object. |
| `PfxLayer.ListenerEffects` | 29 | Query layer: low quality vehicles, terrain and rigid objects (used for audio listener effects). |
| `PfxLayer.ShapeQueryClimbing` | 30 | Query layer: things the player can climb on. |

**Example**

```lua
-- client: what is the local player aiming at? check the static world first, then anything physical
Cmd.Add("look", function()
	local player = World.LocalPlayer():AsPlayer()
	local from = Camera.GetPosition()
	local to = player:GetAimPosition()
	local dir = (to - from):normalize()
	local far = from + dir * 500

	local world_hit = Physics.Raycast(from, far, PfxLayer.StaticAndDestruction)
	if world_hit.hasHit then
		print(string.format("world at %.1f m", world_hit.hitDistance * 500))
	end

	local any_hit = Physics.Raycast(from, far, PfxLayer.RaycastEverythingPhysical)
	if any_hit.hasHit and any_hit.netObject then
		print("aiming at a networked object of type " .. any_hit.netObject:GetType())
	end
end)
```