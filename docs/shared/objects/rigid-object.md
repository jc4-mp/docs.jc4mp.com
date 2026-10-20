---
sidebar_position: 18
---

# RigidObjectHandle

A `RigidObjectHandle` refers to a networked physics prop built from a model file and a physics (collision) file: barrels, crates, rocks and any other loose object. You get one from [World.SpawnRigidObject](../../server/world.md#worldspawnrigidobjectposition-model-pfx-motiontype-rotation-health) on the server, or by casting an [ObjectHandle](./object-handle.md) with `AsRigidObject()`.

This page is about the networked handle. The client's [World.SpawnRigidObject](../../client/world.md#worldspawnrigidobjectposition-model-pfx-motiontype-rotation) instead creates a local, unsynced `RigidObject` game object, documented in [Game objects](../../client/game-objects.md#rigidobject).

**Available on:** Server, Client

**See also:** [RigidObjectHandle (server)](../../server/objects/rigid-object.md), [RigidObjectHandle (client)](../../client/objects/rigid-object.md)

A `RigidObjectHandle` is also an [ObjectHandle](./object-handle.md): position, rotation, velocity, health, script data and the casts work on it too (see that page). If the object no longer exists, or on a client is not streamed in (see [Streaming](../world.md#streaming-objects-only-exist-where-they-are-needed)), every setter does nothing and every getter returns `nil`.

What is synced: the model and physics file, the motion type, whether collisions are on, and its position, rotation, velocity and angular velocity. A `Dynamic` object is simulated by its owner's game (see [Ownership](../world.md#ownership-who-simulates-an-object)) and the other players follow it smoothly; `Static` and `Keyframed` objects are simply placed where the server or owner puts them.

A player's game only shows the object once both its model and physics files are already loaded in that game; until then it is invisible to that player. Use models the game has loaded everywhere (see [Rigid objects](../../lists/rigid-objects.md)).

## Methods {#methods}

### rigidObject\:GetModel() {#rigidobjectgetmodel}

Returns the path of the model file the object was spawned with.

**Side:** Server, Client

**Parameters:** none

**Returns:** `string`, for example `"models/environments/locale_global/mil_prop_barrel_a/mil_prop_barrel_a_barrel_a.modelc"`, or `nil` if the object is gone.

**Example**

```lua
print("prop model: " .. rigidObject:GetModel())
```

### rigidObject\:GetPfx() {#rigidobjectgetpfx}

Returns the path of the physics (collision) file the object was spawned with.

**Side:** Server, Client

**Parameters:** none

**Returns:** `string`, for example `"models/environments/locale_global/mil_prop_barrel_a/mil_prop_barrel_a_barrel_a_col.pfxc"`, or `nil` if the object is gone.

**Example**

```lua
-- clone a prop 2 m higher
local copy = World.SpawnRigidObject(rigidObject:GetPosition() + vec3(0, 2, 0), rigidObject:GetModel(), rigidObject:GetPfx(), RigidObjectMotionType.Dynamic)
```