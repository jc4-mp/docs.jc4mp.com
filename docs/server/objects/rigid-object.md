---
sidebar_position: 46
---

# RigidObjectHandle (server)

On the server, a [`RigidObjectHandle`](../../shared/objects/rigid-object.md) changes how the object moves and whether it collides. These changes are synced to every player who sees it.

**Available on:** Server

**See also:** [RigidObjectHandle](../../shared/objects/rigid-object.md), [RigidObjectHandle (client)](../../client/objects/rigid-object.md)

## Methods {#methods}

### rigidObject\:SetMotionType(motionType) {#rigidobjectsetmotiontypemotiontype}

Changes how the object moves. Synced to everyone who sees it, including players who come into range later.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| motionType | [`RigidObjectMotionType`](../../shared/enums/rigid-object.md#rigidobjectmotiontype) | `Static` (never moves), `Keyframed` (moved only by setting its transform, pushes others but is not pushed) or `Dynamic` (falls and can be pushed, simulated by physics) |

**Returns:** nothing

**Notes:** a value out of range raises a Lua error.

**Example**

```lua
-- a crate that hangs in the air until someone shoots it
local crate = World.SpawnRigidObject(position, model, pfx, RigidObjectMotionType.Keyframed)

Net.AddEvent("CrateShot", function(netId)
	if netId == crate:GetNetId() then
		crate:SetMotionType(RigidObjectMotionType.Dynamic)
	end
end)
```

### rigidObject\:EnableCollision(enable) {#rigidobjectenablecollisionenable}

Turns the object's collisions on or off: with collisions off, players, vehicles and other objects pass through it. Synced to everyone who sees it. Collisions are on for a newly spawned object.

**Side:** Server

**Parameters**

| Name | Type | Description |
|---|---|---|
| enable | `boolean` | `true` for solid, `false` to let everything pass through |

**Returns:** nothing

**Example**

```lua
-- a ghost wall that opens for 5 seconds
wall:EnableCollision(false)

Timer.Set(function()
	wall:EnableCollision(true)
end, 5000, 1)
```