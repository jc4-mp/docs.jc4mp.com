---
sidebar_position: 17
---

# MountedGunHandle

A `MountedGunHandle` refers to a networked mounted gun: a stationary turret (machine gun, mortar, rocket launcher, ...) that players can operate. You get one from [World.SpawnMountedGun](../../server/world.md#worldspawnmountedgunmodel-position-rotation-health), or by casting an [ObjectHandle](./object-handle.md) with `AsMountedGun()`.

**Available on:** Server, Client

A `MountedGunHandle` is also an [ObjectHandle](./object-handle.md): position, rotation, health, script data and the casts work on it too (see that page). If the mounted gun no longer exists, or on a client is not streamed in (see [Streaming](../world.md#streaming-objects-only-exist-where-they-are-needed)), its methods return `nil`.

What is synced: the model, its position and rotation (sent by its owner) and the base object state. While a player is using the gun, that player owns it whatever the distance, so their aim is what everyone sees; when they leave it, ownership goes back to the closest player (see [Ownership](../world.md#ownership-who-simulates-an-object)).

## Methods {#methods}

### mountedGun\:GetId() {#mountedgungetid}

Returns the model name the mounted gun was spawned with.

**Side:** Server, Client

**Parameters:** none

**Returns:** `string` (see [Mounted guns](../../lists/mounted-guns.md)), or `nil` if the mounted gun is gone.

**Example**

```lua
-- server: list every mounted gun in the world
for _, object in ipairs(World.GetAllByType(NetObjectType.MountedGun)) do
	local gun = object:AsMountedGun()

	print(gun:GetNetId(), gun:GetId(), gun:GetPosition())
end
```