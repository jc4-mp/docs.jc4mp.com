---
sidebar_position: 29
---

# RigidObjectMotionType

`RigidObjectMotionType` decides how a rigid object (a physics prop built from a model and a collision file) moves: not at all, only where you put it, or freely under physics.

**Available on:** Server, Client

## Values {#values}

### RigidObjectMotionType {#rigidobjectmotiontype}

Used by:

- [`World.SpawnRigidObject(position, model, pfx, motionType, ...)`](../../client/world.md) (server: a synced object; client: an object only in the local player's game)
- [`rigidObject:SetMotionType(type)`](../../server/objects/rigid-object.md) (server, synced to every player)
- [`RigidObject:SetMotionType(type)`](../../client/game-objects.md) on the client-only game object

On the server a value outside 0..2 raises the Lua error `invalid motion type <n>`. The client functions pass the value to the game without checking it.

| Name | Value | Meaning |
|---|---|---|
| `RigidObjectMotionType.Static` | 0 | Does not move. Other things collide with it as with a wall. |
| `RigidObjectMotionType.Keyframed` | 1 | Moves only where scripts put it (position and rotation changes). Forces, hits and gravity don't move it, but it pushes what it moves into. |
| `RigidObjectMotionType.Dynamic` | 2 | Fully simulated: falls, gets pushed, shot, blown up and tethered around. |

**Example**

```lua
-- server: drop a barrel that players can push around, then freeze it after 30 seconds
local base = "models/environments/locale_global/gas_station_a/gas_station_prop_a_barrel_01"

local barrel = World.SpawnRigidObject(vec3(2851.6, 545.0, -9920.1), base .. ".modelc", base .. "_col.pfxc", RigidObjectMotionType.Dynamic)

Timer.Set(function()
	barrel:SetMotionType(RigidObjectMotionType.Static)
end, 30000, 1)
```