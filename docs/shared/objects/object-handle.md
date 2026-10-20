---
sidebar_position: 13
---

# ObjectHandle

An `ObjectHandle` is a script's reference to a networked object in the world: a player's character, a vehicle, a mounted gun, a rigid object, an NPC, a tether or a sandstorm. Every typed handle (`PlayerObjectHandle`, `VehicleHandle`, `MountedGunHandle`, `RigidObjectHandle`, `NPCHandle`, `TetherHandle`, `SandstormHandle`) is also an `ObjectHandle`, so every method on this page works on all of them.

**Available on:** Server, Client

See also: [ObjectHandle (server)](../../server/objects/object-handle.md), [ObjectHandle (client)](../../client/objects/object-handle.md)

A handle never keeps the object alive. When the object is destroyed (despawned, its resource stopped, its player disconnected), the handle stays in your variables but every method on it does nothing and returns a default value or `nil`, as described for each method below. Handles are cheap to keep in tables and safe to call after the object is gone.

## Getting a handle {#getting-a-handle}

You get handles from spawn functions (`World.SpawnVehicle` and the others, see [World (server)](../../server/world.md)), from lookups (`World.GetObjectByNID`, `World.GetAllByType` and `World.GetRandomPlayer`, see [World](../world.md) and [Players](./players.md); `World.LocalPlayer` on the client, see [Players (client)](../../client/objects/players.md)), from a [PlayerHandle](./player.md) (`client:GetPlayer()`) and from event arguments (see [server events](../../server/events.md) and [client events](../../client/events.md)).

Some of those functions return a plain `ObjectHandle` even when the object is a player or a vehicle: `World.GetObjectByNID`, `World.GetAllByType`, `World.GetRandomPlayer`, `World.LocalPlayer` and `PlayerHandle:GetPlayer` all do. A plain `ObjectHandle` only has the methods on this page. To use the methods of the object's type (for example `SetSkin` on a player or `SetLocked` on a vehicle), cast it with one of the `As*` methods below:

```lua
local obj = World.GetObjectByNID(nid)

if obj and obj:GetType() == NetObjectType.Vehicle then
	obj:AsVehicle():SetLocked(true)
end
```

## Sending handles over the network {#sending-handles-over-the-network}

Handles can be passed as arguments of network events (see [Net](../net.md)) and stored inside tables sent that way. They travel as the object's network id: on the receiving side they arrive as the typed handle of the object (`PlayerObjectHandle`, `VehicleHandle`, `MountedGunHandle`, `RigidObjectHandle`, `NPCHandle`, `TetherHandle` or `SandstormHandle`), even when a plain `ObjectHandle` was sent, or as `nil` if the receiver doesn't know that object (for example a client that is too far away to have it streamed in). Handles passed to [`Event.Fire`](../events.md#eventfirename-) arrive typed the same way. A `PlayerHandle` (the connection) arrives as a `PlayerHandle`.

So a received handle already has its type's methods. Calling `AsVehicle()`, `AsPlayer()`... on it is not needed, but still works (it returns a handle to the same object), so scripts written for plain handles keep working.

```lua
-- server
Net.Broadcast("vehicle:spawned", vehicle)

-- client
Net.AddEvent("vehicle:spawned", function(vehicle)
	if vehicle then
		print("new vehicle, id " .. vehicle:GetId())
	end
end)
```

## Server and client differences {#server-and-client-differences}

- On the **server**, a handle remembers exactly which object it was made for. If the object is destroyed and a new one later reuses the same network id, the old handle stays invalid.
- On the **client**, a handle is resolved by network id only. A handle kept after its object despawned can point to a different object if the server reuses that id later. Don't keep client handles across long periods without re-checking them, for example by comparing `GetType()` or listening to the object's despawn events.
- On the **client**, objects only exist while they are streamed in (near the local player). A handle to an object that went out of range behaves like a handle to a destroyed object until the object streams in again.
- The setters (`SetPosition`, `SetHealth`, ...) exist only on the server, where they change the object for every player (see [ObjectHandle (server)](../../server/objects/object-handle.md)). On the client only `SetData` exists, and it only changes this client's copy (see [ObjectHandle (client)](../../client/objects/object-handle.md)).

## Comparing handles {#comparing-handles}

Two handles are equal (`==`) when they refer to the same object, whatever their kinds: a `PlayerObjectHandle` and a plain `ObjectHandle` to the same player are equal, on the server and on the client. Handles of different objects are never equal.

```lua
-- works whatever the handle types are
if victim == killer then
	print("suicide")
end
```

Each handle is a separate userdata, so two handles to the same object are still different table keys: key your tables by `GetNetId()`.

## Methods {#methods}

### obj\:GetType() {#objgettype}

Returns the object's type as a [NetObjectType](../enums/net-object-type.md) value: `NetObjectType.Player`, `NetObjectType.Vehicle`, `NetObjectType.MountedGun`, `NetObjectType.RigidObject`, `NetObjectType.NPC`, `NetObjectType.Tether` or `NetObjectType.Sandstorm`.

If the object no longer exists, this returns the invalid type, `0`, which is none of the `NetObjectType` values. This makes `GetType()` a convenient way to check whether a handle is still valid.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `integer` | a [NetObjectType](../enums/net-object-type.md) value, or `0` if the object is gone |

**Example**

```lua
local function describe(obj)
	local t = obj:GetType()

	if t == NetObjectType.Player then
		return "a player"
	elseif t == NetObjectType.Vehicle then
		return "a vehicle"
	elseif t == 0 then
		return "an object that no longer exists"
	end

	return "another object"
end

print(describe(World.GetObjectByNID(12)))
```

### obj\:GetNetId() {#objgetnetid}

Returns the object's network id, a number from 0 to 65534 that identifies the object on the server and on every client. It is the same id on every machine, so it is the value to send in messages, store in tables or show in debug output. Use `World.GetObjectByNID(id)` to turn it back into a handle (see [World](../world.md)).

For a player's character, this is also the player's id: `client:GetNetId()` on its [PlayerHandle](./player.md) returns the same number.

If the object no longer exists, this returns `65535` (the invalid id).

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `integer` | the network id, or `65535` if the object is gone |

**Example**

```lua
Event.Add("OnPlayerJoin", function(client)
	local player = client:GetPlayer()

	print("player character id: " .. player:GetNetId())
end)
```

### obj\:GetPosition() {#objgetposition}

Returns the object's position in world coordinates, in meters. The Y axis points up.

On the server this is the last position the object's owner reported (or the one a script set). On the client it is this client's current copy of it.

If the object no longer exists, this returns `vec3(0, 0, 0)`.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `vec3` | the position, `vec3(0, 0, 0)` if the object is gone |

**Example**

```lua
local function distanceBetween(a, b)
	return a:GetPosition():distance(b:GetPosition())
end

Event.Add("OnPlayerJoin", function(client)
	local player = client:GetPlayer()

	for _, other in ipairs(World.GetPlayers()) do
		local otherPlayer = other:GetPlayer()

		if other ~= client and otherPlayer then
			print(string.format("%s is %.1f m away from %s", client:GetName(), distanceBetween(player, otherPlayer), other:GetName()))
		end
	end
end)
```

### obj\:GetRotation() {#objgetrotation}

Returns the object's rotation as a `quat` (see [Math](../math.md)). Use `GetEulerRotation` if you want angles instead.

If the object no longer exists, this returns a quaternion whose components are all zero, which is not a valid rotation.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `quat` | the rotation |

**Example**

```lua
-- server: make a vehicle face the same way as a player
vehicle:SetRotation(player:GetRotation())
```

### obj\:GetEulerRotation() {#objgeteulerrotation}

Returns the object's rotation as Euler angles in **radians**: `x` is the pitch, `y` the yaw (heading around the up axis) and `z` the roll.

Note that the spawn functions of [World (server)](../../server/world.md) take their rotation in **degrees**, so convert with `math.deg` when you pass this value to them.

If the object no longer exists, this returns `nil`.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `vec3` or `nil` | pitch, yaw and roll in radians, `nil` if the object is gone |

**Example**

```lua
local rotation = vehicle:GetEulerRotation()

if rotation then
	print(string.format("heading: %.0f degrees", math.deg(rotation.y)))
end
```

### obj\:GetTransform() {#objgettransform}

Returns the object's position and rotation together as one transform value. The transform has no fields or methods that scripts can read: its only use is to be passed to `SetTransform`, to copy one object's placement to another or to restore a saved placement later.

If the object no longer exists, this returns an empty transform (zero position, zero rotation).

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| transform | an opaque transform value |

**Example**

```lua
-- server: swap the placement of two vehicles
local a, b = vehicleA:GetTransform(), vehicleB:GetTransform()

vehicleA:SetTransform(b)
vehicleB:SetTransform(a)
```

### obj\:GetVelocity() {#objgetvelocity}

Returns the object's linear velocity in meters per second, in world coordinates.

If the object no longer exists, this returns `vec3(0, 0, 0)`.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `vec3` | the velocity in m/s |

**Example**

```lua
local speed = vehicle:GetVelocity():length() * 3.6

print(string.format("%.0f km/h", speed))
```

### obj\:GetAngularVelocity() {#objgetangularvelocity}

Returns the object's angular velocity (how fast it spins around each axis), in radians per second.

If the object no longer exists, this returns `vec3(0, 0, 0)`.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `vec3` | the angular velocity in rad/s |

**Example**

```lua
if vehicle:GetAngularVelocity():length() > 5 then
	print("that vehicle is spinning out of control")
end
```

### obj\:GetHealth() {#objgethealth}

Returns the object's health as a fraction from `0` (dead or destroyed) to `1` (full health).

If the object no longer exists, this returns `0`.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `number` | health, 0..1 |

**Example**

```lua
local player = client:GetPlayer()

Chat.Broadcast(string.format("%s has %d%% health", client:GetName(), math.floor(player:GetHealth() * 100)))
```

### obj\:GetData(key) {#objgetdatakey}

Reads a value from the object's data store. Every object has a small key/value store that scripts can use to attach their own information to it (a team, an owner, a price, ...). Values are written with `SetData`.

The value is returned exactly as it was stored: a `string`, `number`, `boolean`, `vec2`, `vec3`, `vec4` or `quat`. A key that was never set, or was removed, returns `nil`, so a stored `false` is never confused with a missing key.

On the client, the store holds the values the server set with `broadcast` enabled, plus any values this client set locally.

The store belongs to the object, not to a resource: every resource on the same side sees and can overwrite the same keys. Prefix your keys (for example `"cnr.team"`) if several resources may use the same objects.

If the object no longer exists, this returns `nil`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| key | `string` | the key to read |

**Returns**

| Type | Description |
|---|---|
| `string`, `number`, `boolean`, `vec2`, `vec3`, `vec4`, `quat` or `nil` | the stored value, `nil` if the key isn't set or the object is gone |

**Example**

```lua
-- client: color name tags by the team the server stored on each player
local team = player:GetData("team")

if team == "cops" then
	print("this player is a cop")
elseif team == nil then
	print("this player has no team yet")
end
```

### obj\:AsPlayer() {#objasplayer}

Returns this object as a `PlayerObjectHandle` if it is a player's character, `nil` otherwise (or if the object is gone). See [Player](./player.md) for the methods it adds.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `PlayerObjectHandle` or `nil` | the typed handle |

**Example**

```lua
Event.Add("OnPlayerJoin", function(client)
	local player = client:GetPlayer():AsPlayer()

	player:SetSkin("mira")
end)
```

### obj\:AsVehicle() {#objasvehicle}

Returns this object as a `VehicleHandle` if it is a vehicle, `nil` otherwise (or if the object is gone). See [Vehicle](./vehicle.md).

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `VehicleHandle` or `nil` | the typed handle |

**Example**

```lua
for _, obj in ipairs(World.GetAllByType(NetObjectType.Vehicle)) do
	obj:AsVehicle():SetLocked(false)
end
```

### obj\:AsMountedGun() {#objasmountedgun}

Returns this object as a `MountedGunHandle` if it is a mounted gun, `nil` otherwise (or if the object is gone). See [Mounted gun](./mounted-gun.md).

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `MountedGunHandle` or `nil` | the typed handle |

**Example**

```lua
local gun = World.GetObjectByNID(nid)
local mounted = gun and gun:AsMountedGun()

if mounted then
	print("mounted gun model: " .. mounted:GetId())
end
```

### obj\:AsRigidObject() {#objasrigidobject}

Returns this object as a `RigidObjectHandle` if it is a rigid object, `nil` otherwise (or if the object is gone). See [Rigid object](./rigid-object.md).

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `RigidObjectHandle` or `nil` | the typed handle |

**Example**

```lua
local rigid = obj:AsRigidObject()

if rigid then
	print("model: " .. rigid:GetModel())
end
```

### obj\:AsNPC() {#objasnpc}

Returns this object as an `NPCHandle` if it is an NPC, `nil` otherwise (or if the object is gone). See [NPC](./npc.md).

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `NPCHandle` or `nil` | the typed handle |

**Example**

```lua
for _, obj in ipairs(World.GetAllByType(NetObjectType.NPC)) do
	print("NPC " .. obj:AsNPC():GetId() .. " at " .. tostring(obj:GetPosition()))
end
```

### obj\:AsTether() {#objastether}

Returns this object as a `TetherHandle` if it is a tether, `nil` otherwise (or if the object is gone). See [Tether](./tether.md).

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `TetherHandle` or `nil` | the typed handle |

**Example**

```lua
local tethers = 0

for _, obj in ipairs(World.GetAllByType(NetObjectType.Tether)) do
	if obj:AsTether() then
		tethers = tethers + 1
	end
end

print(tethers .. " tethers in the world")
```

### obj\:AsSandstorm() {#objassandstorm}

Returns this object as a `SandstormHandle` if it is a sandstorm, `nil` otherwise (or if the object is gone). See [Sandstorm](./sandstorm.md).

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `SandstormHandle` or `nil` | the typed handle |

**Example**

```lua
for _, obj in ipairs(World.GetAllByType(NetObjectType.Sandstorm)) do
	local storm = obj:AsSandstorm()

	print("sandstorm with wind speed " .. storm:GetWindSpeed())
end
```

## Destroying objects {#destroying-objects}

There is no `Destroy` method on a handle. On the server, destroy an object with `World.Destroy(obj)` (see [World (server)](../../server/world.md)). Players can't be destroyed that way: disconnect them with `PlayerHandle:Kick` (see [Player (server)](../../server/objects/player.md)). Objects a resource spawned are also destroyed automatically when that resource stops.