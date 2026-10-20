---
sidebar_position: 57
---

# RigidObjectHandle (client)

On the client, a [`RigidObjectHandle`](../../shared/objects/rigid-object.md) also reads the object's bounding box in the local player's game.

**Available on:** Client

**See also:** [RigidObjectHandle](../../shared/objects/rigid-object.md), [RigidObjectHandle (server)](../../server/objects/rigid-object.md)

## Methods {#methods}

### rigidObject\:GetAABB() {#rigidobjectgetaabb}

Returns the object's bounding box in world space.

**Side:** Client

**Parameters:** none

**Returns:** `AABB` (with `min` and `max` `vec3`s, see [Math](../../shared/math.md)), or `nil` while the object is not spawned in this game (out of range, or its files are not loaded here).

**Example**

```lua
local box = rigidObject:GetAABB()

if box then
	local size = box.max - box.min

	print("prop size: " .. tostring(size))
end
```

### rigidObject\:GetLocalAABB() {#rigidobjectgetlocalaabb}

Returns the object's bounding box in its own model space (not moved or turned with the object).

**Side:** Client

**Parameters:** none

**Returns:** `AABB`, or `nil` while the object is not spawned in this game.

**Example**

```lua
local box = rigidObject:GetLocalAABB()

if box then
	local height = box.max.y - box.min.y
end