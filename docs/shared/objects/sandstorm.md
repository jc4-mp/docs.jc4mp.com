---
sidebar_position: 21
---

# SandstormHandle

A `SandstormHandle` refers to a networked sandstorm: a box-shaped volume of blowing sand with a wall of sand on its front face, which gives anyone inside it the sandstorm look (sky, light and fog). You get one from [World.SpawnSandstorm](../../server/world.md#worldspawnsandstormposition-size-windspeed-rotation), or by casting an [ObjectHandle](./object-handle.md) with `AsSandstorm()`.

**Available on:** Server, Client

## Behavior {#behavior}

- The handle's position is the center of the box, and the wind blows along the box's forward direction (its rotation's yaw).
- Sandstorms are visible from kilometers away, so unlike other objects they are streamed to **every** player wherever they are (see [Streaming](../world.md#streaming-objects-only-exist-where-they-are-needed)). On a client, a handle to a sandstorm stays valid for as long as the sandstorm exists.
- Size and wind speed are set when the storm is spawned and cannot be changed. Moving or turning it with `SetPosition`, `SetRotation` or `SetTransform` (see [ObjectHandle](./object-handle.md)) is synced to every player.
- Several sandstorms can exist at once.
- It lives until it is destroyed with [World.Destroy](../../server/world.md#worlddestroyobject) or the resource that spawned it stops.

A `SandstormHandle` is also an [ObjectHandle](./object-handle.md), so all of that page's methods work on it.

## Methods {#methods}

### sandstorm\:GetSize() {#sandstormgetsize}

Returns the size of the storm's box.

**Side:** Server, Client

**Parameters:** none

**Returns:** `vec3`: width, height and depth in meters, or `nil` if the sandstorm is gone.

**Example**

```lua
local size = sandstorm:GetSize()

print(string.format("the storm is %d m wide", size.x))
```

### sandstorm\:GetWindSpeed() {#sandstormgetwindspeed}

Returns the storm's wind speed, as given to `World.SpawnSandstorm`.

**Side:** Server, Client

**Parameters:** none

**Returns:** `number`, or `nil` if the sandstorm is gone.

**Example**

```lua
-- server: replace a storm with a stronger one at the same place
local function strengthen(sandstorm)
	local position, size, wind = sandstorm:GetPosition(), sandstorm:GetSize(), sandstorm:GetWindSpeed()
	local yaw = math.deg(sandstorm:GetEulerRotation().y)

	World.Destroy(sandstorm)

	return World.SpawnSandstorm(position, size, wind * 2, vec3(0, yaw, 0))
end
```

## Example {#example}

```lua
-- server: an admin command that rolls a storm toward the players and removes it after 5 minutes
Net.AddEvent("Sandstorm", function(position)
	local client = Net.Sender()

	if not client:HasAcl(AclLevel.Admin) then
		return
	end

	local player = client:GetPlayer()

	if not player then
		return
	end

	-- the wind blows from the storm toward the player; the box's center is 150 m above the ground
	local from = player:GetPosition()
	local yaw = math.deg(math.atan2(from.x - position.x, from.z - position.z))
	local storm = World.SpawnSandstorm(position + vec3(0, 150, 0), vec3(2000, 600, 1000), 45, vec3(0, yaw, 0))

	Timer.Set(function()
		World.Destroy(storm)
	end, 5 * 60 * 1000, 1)
end)
```