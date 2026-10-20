---
sidebar_position: 43
---

# ObjectHandle (server)

The server-only methods of every `ObjectHandle`: the setters that change an object for every player, and the server's `SetData`.

**Available on:** Server

See also: [ObjectHandle](../../shared/objects/object-handle.md), [ObjectHandle (client)](../../client/objects/object-handle.md)

## Methods {#methods}

### obj\:SetData(key, value, broadcast) {#objsetdatakey-value-broadcast}

Stores a value in the object's data store, or removes a key when `value` is `nil`. Read it back with `GetData`.

The value must be a `string`, `number`, `boolean`, `vec2`, `vec3`, `vec4` or `quat`. Tables, functions and handles can't be stored (store a handle's `GetNetId()` instead).

The store has limits so that it always fits in the network packets that sync it:

- keys are 1 to 64 bytes long
- string values are at most 1024 bytes
- an object holds at most 128 keys
- an object's keys and values add up to at most 8 KB (a key counts its length; a value counts its length for strings, 8 bytes for numbers, 1 for booleans, 8/12/16 bytes for `vec2`/`vec3`/`vec4` and 16 for `quat`)

Replacing an existing key is always accepted as long as the new value fits.

With `broadcast` set to `true`, the value is sent to every player who currently sees the object (and to the player who controls it), and to every player who sees it later, so their client scripts can read it with `GetData`. With `broadcast` set to `false`, the value stays on the server only. Removing a key (`value` = `nil`) also removes it on the clients if it had been broadcast.

If you overwrite a broadcast key with `broadcast` set to `false`, clients that already received the old value keep it, and players who see the object later don't get the key at all. Remove the key first if you want clients to forget it.

**Parameters**

| Name | Type | Description |
|---|---|---|
| key | `string` | the key, 1 to 64 bytes |
| value | `string`, `number`, `boolean`, `vec2`, `vec3`, `vec4`, `quat` or `nil` | the value to store, `nil` removes the key |
| broadcast | `boolean` | whether clients receive the value |

**Returns**

| Type | Description |
|---|---|
| `boolean` | `true` if the value was stored (or the key was removed); `false` if the value has a type that can't be stored, breaks one of the limits, the key to remove wasn't set, or the object is gone |

**Example**

```lua
-- server: put every joining player on a random team, visible to all clients
Event.Add("OnPlayerJoin", function(client)
	local player = client:GetPlayer()
	local team = math.random(1, 2) == 1 and "cops" or "robbers"

	if not player:SetData("team", team, true) then
		print("couldn't store the team of " .. client:GetName())
	end

	-- server-only bookkeeping, never sent to clients
	player:SetData("joinTime", Server.GetElapsedSeconds(), false)
end)

-- server: clear it when the round ends
local function endRound()
	for _, client in ipairs(World.GetPlayers()) do
		local player = client:GetPlayer()

		if player then
			player:SetData("team", nil, true)
		end
	end
end
```

### obj\:SetPosition(position) {#objsetpositionposition}

Moves the object to a new position, keeping its rotation. The change is forced on the object's owner and sent to every player who sees the object.

When used on a player's character, the player's own game moves the character there, but this does not fire `OnPlayerTeleport`. Use `PlayerObjectHandle:Teleport` (see [Player (server)](./player.md)) to move a player with that event.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | the new position, in meters |

**Returns:** nothing

**Example**

```lua
-- lift a vehicle 10 m into the air
local pos = vehicle:GetPosition()

vehicle:SetPosition(vec3(pos.x, pos.y + 10, pos.z))
```

### obj\:SetRotation(rotation) {#objsetrotationrotation}

Rotates the object, keeping its position. The change is forced on the object's owner and sent to every player who sees the object.

**Parameters**

| Name | Type | Description |
|---|---|---|
| rotation | `quat` | the new rotation |

**Returns:** nothing

**Example**

```lua
-- turn a vehicle to face the same way as another one
vehicleA:SetRotation(vehicleB:GetRotation())
```

### obj\:SetTransform(transform) {#objsettransformtransform}

Sets the object's position and rotation at once, from a transform returned by `GetTransform`. The change is forced on the object's owner and sent to every player who sees the object.

**Parameters**

| Name | Type | Description |
|---|---|---|
| transform | transform | a value returned by `GetTransform` |

**Returns:** nothing

**Example**

```lua
-- server: remember where a vehicle was and put it back later
local saved = vehicle:GetTransform()

Timer.Set(function()
	vehicle:SetTransform(saved)
	vehicle:SetVelocity(vec3(0, 0, 0))
end, 10000, 1)
```

### obj\:SetVelocity(velocity) {#objsetvelocityvelocity}

Sets the object's linear velocity, in meters per second. The change is forced on the object's owner and sent to every player who sees the object.

**Parameters**

| Name | Type | Description |
|---|---|---|
| velocity | `vec3` | the new velocity, in m/s |

**Returns:** nothing

**Example**

```lua
-- launch a vehicle upwards
vehicle:SetVelocity(vehicle:GetVelocity() + vec3(0, 30, 0))
```

### obj\:SetAngularVelocity(velocity) {#objsetangularvelocityvelocity}

Sets the object's angular velocity, in radians per second around each axis. The change is forced on the object's owner and sent to every player who sees the object.

**Parameters**

| Name | Type | Description |
|---|---|---|
| velocity | `vec3` | the new angular velocity, in rad/s |

**Returns:** nothing

**Example**

```lua
-- stop a rigid object from spinning
rock:SetAngularVelocity(vec3(0, 0, 0))
```

### obj\:SetHealth(health) {#objsethealthhealth}

Sets the object's health, as a fraction from `0` to `1`. The change is forced on the object's owner and sent to every player who sees the object. Lowering an object's health this way counts as damage, so the damage events fire for it (see [server events](../events.md)). A player or object whose health reaches `0` is dead or destroyed.

A value outside 0..1 raises the Lua error `invalid health <v>, it's a fraction (0..1)`, as the spawn functions and `Respawn` do.

**Parameters**

| Name | Type | Description |
|---|---|---|
| health | `number` | the new health, 0..1 (anything else raises a Lua error) |

**Returns:** nothing

**Example**

```lua
-- heal every player
for _, client in ipairs(World.GetPlayers()) do
	local player = client:GetPlayer()

	if player then
		player:SetHealth(1)
	end
end
```