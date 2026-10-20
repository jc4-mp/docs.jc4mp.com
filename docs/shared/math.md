---
sidebar_position: 10
---

# Math types

JC4MP gives scripts a small set of math types: `vec2`, `vec3`, `vec4`, `quat`, `mat4` and `AABB`. Positions, velocities and sizes are `vec3` (in meters), rotations are `quat`, and screen positions are usually `vec2`. These are the types the rest of the API takes and returns, and the vector and quaternion types can also be sent over the network with [Net](./net.md) and written by [JSON.Stringify](./json.md).

**Available on:** Server, Client

## Things to know first {#things-to-know-first}

- **32-bit floats.** Every component is stored as a 32-bit float (about 7 significant digits), even though Lua numbers are 64-bit. Reading `v.x` back after writing a large or very precise number can give a slightly different value.
- **Values are shared, not copied.** A vector is a userdata. `local b = a` makes `b` refer to the same vector, so `b.x = 5` also changes `a.x`. Make a copy with `vec3(a.x, a.y, a.z)` (or `a + 0`, which returns a new vector).
- **No `==`.** The types have no equality operator, so `vec3(1, 2, 3) == vec3(1, 2, 3)` is `false` (two different objects). Compare the components, or check `a:distanceSqr(b) < 0.0001`.
- **No unary minus.** `-v` raises an error; write `v * -1`.
- **Put the vector on the left.** Arithmetic with a number works as `v * 2`, `v + 1`, `v / 2`, but not `2 * v` (that raises an error).
- **Methods use `:`.** `v:length()`, `a:distance(b)`.
- `tostring(v)` and `print(v)` show the components, e.g. `vec3(1.000000, 2.000000, 3.000000)`. Plain numbers are printed the way `tostring` writes them (see [Sandbox](./sandbox.md#print)), and a component read back from a vector is a 32-bit float, so `print(vec3(0.1).x)` shows `0.10000000149012`.
- Dividing by zero gives `inf` or `nan` components, and normalizing a zero-length vector gives `nan` components. Most functions that take a position check for these and raise an error.

## vec2 {#vec2}

A 2D vector with `x` and `y`.

### vec2(x, y) {#vec2x-y}

Creates a vector. Called with a single number, every component gets that number: `vec2(5)` is `vec2(5, 5)`. Calling it with no arguments raises an error, so write `vec2(0)` (or `vec2(0, 0)`) for the zero vector.

**Parameters**

| Name | Type | Description |
|---|---|---|
| x | number | the x component, or the value of every component when it is the only argument |
| y | number | optional, the y component |

**Returns** `vec2`

**Example**

```lua
local screen_center = vec2(960, 540)
local margin = vec2(16)

print(screen_center, margin) -- vec2(960.000000, 540.000000)	vec2(16.000000, 16.000000)
```

### Fields {#fields}

| Field | Type | Description |
|---|---|---|
| x | number | readable and writable |
| y | number | readable and writable |

```lua
local size = vec2(400, 300)

size.x = size.x * 2

print(size.x, size.y) -- 800	300
```

### Methods {#methods}

#### v\:length() {#vlength}

The length (magnitude) of the vector.

**Returns** `number`

#### v\:lengthSqr() {#vlengthsqr}

The squared length. Faster than `length` and enough for comparisons.

**Returns** `number`

#### v\:normalize() {#vnormalize}

Returns a new vector with the same direction and a length of 1. The vector itself is not changed. A zero vector gives `nan` components.

**Returns** `vec2`

#### a\:distance(b) {#adistanceb}

The distance between the points `a` and `b`.

| Name | Type | Description |
|---|---|---|
| b | vec2 | the other point |

**Returns** `number`

#### a\:distanceSqr(b) {#adistancesqrb}

The squared distance between `a` and `b`, cheaper than `distance` for comparisons.

| Name | Type | Description |
|---|---|---|
| b | vec2 | the other point |

**Returns** `number`

#### a\:dot(b) {#adotb}

The dot product of `a` and `b`.

| Name | Type | Description |
|---|---|---|
| b | vec2 | the other vector |

**Returns** `number`

**Example**

```lua
local a = vec2(3, 4)
local b = vec2(0, 0)

print(a:length())          -- 5
print(a:lengthSqr())       -- 25
print(a:normalize())       -- vec2(0.600000, 0.800000)
print(a:distance(b))       -- 5
print(a:dot(vec2(1, 0)))   -- 3
```

### Operators {#operators}

| Expression | Result |
|---|---|
| `a + b`, `a - b` | component-wise sum or difference of two `vec2` |
| `a * b`, `a / b` | component-wise product or quotient of two `vec2` |
| `v + n`, `v - n`, `v * n`, `v / n` | the number `n` applied to every component (the vector must be on the left) |

```lua
local position = vec2(100, 100)
local velocity = vec2(2, -1)

position = position + velocity * 10

print(position) -- vec2(120.000000, 90.000000)
```

## vec3 {#vec3}

A 3D vector with `x`, `y` and `z`. In the game world `y` is up, and distances are in meters.

### vec3(x, y, z) {#vec3x-y-z}

Creates a vector. Called with a single number, every component gets that number: `vec3(0)` is the zero vector. Calling it with two arguments or none raises an error.

**Parameters**

| Name | Type | Description |
|---|---|---|
| x | number | the x component, or the value of every component when it is the only argument |
| y | number | optional, the y component (height) |
| z | number | optional, the z component |

**Returns** `vec3`

**Example**

```lua
local spawn = vec3(10030, 616, 3904)
local up = vec3(0, 1, 0)

local above_spawn = spawn + up * 50
```

### Fields {#fields-1}

| Field | Type | Description |
|---|---|---|
| x | number | readable and writable |
| y | number | readable and writable (height) |
| z | number | readable and writable |

```lua
-- server: lift a player 2 m
local function lift(client)
	local player = client:GetPlayer()

	if player then
		local position = player:GetPosition()

		position.y = position.y + 2 -- a copy: changing it doesn't move the player

		player:AsPlayer():Teleport(position)
	end
end
```

### Methods {#methods-1}

`vec3` has the same methods as `vec2`, plus `cross`.

#### v\:length() {#vlength-1}

The length of the vector.

**Returns** `number`

#### v\:lengthSqr() {#vlengthsqr-1}

The squared length.

**Returns** `number`

#### v\:normalize() {#vnormalize-1}

A new vector with the same direction and a length of 1 (`nan` components for a zero vector).

**Returns** `vec3`

#### a\:distance(b) {#adistanceb-1}

The distance between the points `a` and `b`, in meters for world positions.

| Name | Type | Description |
|---|---|---|
| b | vec3 | the other point |

**Returns** `number`

#### a\:distanceSqr(b) {#adistancesqrb-1}

The squared distance between `a` and `b`.

| Name | Type | Description |
|---|---|---|
| b | vec3 | the other point |

**Returns** `number`

#### a\:dot(b) {#adotb-1}

The dot product of `a` and `b`.

| Name | Type | Description |
|---|---|---|
| b | vec3 | the other vector |

**Returns** `number`

#### a\:cross(b) {#acrossb}

The cross product of `a` and `b`: a vector perpendicular to both.

| Name | Type | Description |
|---|---|---|
| b | vec3 | the other vector |

**Returns** `vec3`

**Example**

```lua
-- server: find the joined players within 100 m of a point
local function players_near(center, radius)
	local found = {}
	local radius_sqr = radius * radius

	for _, client in ipairs(World.GetPlayers()) do
		local player = client:GetPlayer()

		if player and player:GetPosition():distanceSqr(center) <= radius_sqr then
			found[#found + 1] = client
		end
	end

	return found
end

local nearby = players_near(vec3(10030, 616, 3904), 100)

print(#nearby .. " players near the airport")
```

```lua
local forward = vec3(0, 0, 1)
local up = vec3(0, 1, 0)
local side = forward:cross(up)

print(side, forward:dot(up)) -- side is perpendicular to both, the dot product is 0
```

### Operators {#operators-1}

| Expression | Result |
|---|---|
| `a + b`, `a - b` | component-wise sum or difference of two `vec3` |
| `a * b`, `a / b` | component-wise product or quotient of two `vec3` |
| `v + n`, `v - n`, `v * n`, `v / n` | the number `n` applied to every component (the vector must be on the left) |
| `q * v` | `v` rotated by the quaternion `q` (see [quat](#quat)) |

```lua
local from = vec3(0, 0, 0)
local to = vec3(30, 0, 40)

local direction = (to - from):normalize()
local halfway = from + (to - from) * 0.5

print(direction, halfway) -- vec3(0.600000, 0.000000, 0.800000)	vec3(15.000000, 0.000000, 20.000000)
```

## vec4 {#vec4}

A 4D vector with `x`, `y`, `z` and `w`. It is mostly used for colors (`r, g, b, a` as `x, y, z, w`) and for the columns of a `mat4`.

### vec4(x, y, z, w) {#vec4x-y-z-w}

Creates a vector. Called with a single number, every component gets that number. It takes exactly one or four numbers.

**Parameters**

| Name | Type | Description |
|---|---|---|
| x | number | the x component, or the value of every component when it is the only argument |
| y | number | optional, the y component |
| z | number | optional, the z component |
| w | number | optional, the w component |

**Returns** `vec4`

**Example**

```lua
local red = vec4(1, 0, 0, 1)
local half_transparent = red * vec4(1, 1, 1, 0.5)

print(half_transparent) -- vec4(1.000000, 0.000000, 0.000000, 0.500000)
```

### Fields {#fields-2}

| Field | Type | Description |
|---|---|---|
| x, y, z, w | number | readable and writable |

### Methods {#methods-2}

#### v\:length() {#vlength-2}

The length of the vector.

**Returns** `number`

#### v\:lengthSqr() {#vlengthsqr-2}

The squared length.

**Returns** `number`

#### v\:normalize() {#vnormalize-2}

A new vector with a length of 1.

**Returns** `vec4`

`vec4` has no `distance`, `distanceSqr`, `dot` or `cross`.

### Operators {#operators-2}

The same as `vec2` and `vec3`: `+ - * /` with another `vec4` (component-wise) or with a number on the right.

```lua
local color = vec4(0.2, 0.4, 0.6, 1)
local brighter = color * 1.5

print(brighter.x, brighter.y, brighter.z) -- about 0.3, 0.6 and 0.9 (32-bit floats)
```

## quat {#quat}

A rotation stored as a quaternion with the fields `x`, `y`, `z` and `w`. The identity (no rotation) has `w = 1` and `x = y = z = 0`.

### quat(x, y, z, w) {#quatx-y-z-w}

Creates a quaternion from four numbers, in the order `x`, `y`, `z`, `w`. `quat(0, 0, 0, 1)` is the identity, `quat(0, 0.7071068, 0, 0.7071068)` is a 90 degree turn around the y axis, and `tostring` prints the result in the same order.

The two-number form `quat(xyz, w)` sets `x`, `y` and `z` all to `xyz` and `w` to the second number.

Neither form normalizes the result. Call `:normalize()` when the numbers don't already describe a unit quaternion.

**Parameters**

| Name | Type | Description |
|---|---|---|
| x | number | the x component |
| y | number | the y component |
| z | number | the z component |
| w | number | the w (scalar) component |

**Returns** `quat`

**Example**

```lua
-- a rotation of `yaw` radians around the up (y) axis
local function yaw_rotation(yaw)
	local half = yaw * 0.5

	return quat(0, math.sin(half), 0, math.cos(half)) -- x, y, z, w
end

local facing_east = yaw_rotation(math.rad(90))

print(facing_east) -- quat(0.000000, 0.707107, 0.000000, 0.707107)
```

### Fields {#fields-3}

| Field | Type | Description |
|---|---|---|
| x, y, z | number | the vector part, readable and writable |
| w | number | the scalar part, readable and writable |

### Methods {#methods-3}

#### q\:normalize() {#qnormalize}

Returns a new quaternion with a length of 1. Rotations should always be normalized.

**Returns** `quat`

**Example**

```lua
local q = quat(0, 2, 0, 2):normalize()

print(q.y, q.w) -- about 0.7071 each (32-bit floats)
```

### Operators {#operators-3}

| Expression | Result |
|---|---|
| `q * v` (with a `vec3`) | the vector `v` rotated by `q` |
| `q * n` (with a number) | every component multiplied by `n` (not a rotation) |

Quaternions can't be multiplied together, added or compared with these bindings. To combine rotations, build the final rotation from angles (as in the example above), or use the Euler helpers on objects (`GetEulerRotation`, see [ObjectHandle](./objects/object-handle.md)).

```lua
-- server: spawn a car 5 m in front of a player
local function spawn_car_in_front(client)
	local player = client:GetPlayer()

	if not player then
		return
	end

	local forward = player:GetRotation() * vec3(0, 0, 1)

	return World.SpawnVehicle("v046_car_racingbuggy_civilian", player:GetPosition() + forward * 5)
end
```

## mat4 {#mat4}

A 4x4 matrix of numbers. Rows and columns are numbered from **0 to 3**. An index outside that range is not checked and must not be used.

### mat4() {#mat4-1}

Creates an identity matrix (1 on the diagonal, 0 elsewhere). It takes no arguments.

**Returns** `mat4`

**Example**

```lua
local m = mat4()

print(m:get(0, 0), m:get(0, 1)) -- 1	0
```

### Methods {#methods-4}

#### m\:get(row, column) {#mgetrow-column}

Reads one element.

| Name | Type | Description |
|---|---|---|
| row | integer | the row, 0 to 3 |
| column | integer | the column, 0 to 3 |

**Returns** `number`

#### m\:set(row, column, value) {#msetrow-column-value}

Writes one element of this matrix.

| Name | Type | Description |
|---|---|---|
| row | integer | the row, 0 to 3 |
| column | integer | the column, 0 to 3 |
| value | number | the new value |

**Returns** nothing

#### m\:col(column) {#mcolcolumn}

Reads a whole column as a `vec4` (a copy).

| Name | Type | Description |
|---|---|---|
| column | integer | the column, 0 to 3 |

**Returns** `vec4`

#### m\:col(column, value) {#mcolcolumn-value}

Writes a whole column.

| Name | Type | Description |
|---|---|---|
| column | integer | the column, 0 to 3 |
| value | vec4 | the new column |

**Returns** nothing

**Example**

```lua
-- a translation matrix: the position goes in the last column
local m = mat4()

m:col(3, vec4(100, 20, -50, 1))

local translation = m:col(3)

print(translation.x, translation.y, translation.z) -- 100	20	-50
print(m:get(1, 3)) -- 20 (row 1, column 3)
```

## AABB {#aabb}

An axis-aligned bounding box, given by its minimum and maximum corners.

### AABB(min, max) {#aabbmin-max}

Creates a box. The corners are stored as given, they are not sorted.

**Parameters**

| Name | Type | Description |
|---|---|---|
| min | vec3 | the corner with the smallest coordinates |
| max | vec3 | the corner with the largest coordinates |

**Returns** `AABB`

### Fields {#fields-4}

| Field | Type | Description |
|---|---|---|
| min | vec3 | read-only, a copy of the minimum corner |
| max | vec3 | read-only, a copy of the maximum corner |

`tostring` prints both corners. To change a box, create a new one.

**Example**

```lua
local zone = AABB(vec3(-100, 0, -100), vec3(100, 500, 100))

local function inside(box, p)
	local min, max = box.min, box.max

	return p.x >= min.x and p.x <= max.x and p.y >= min.y and p.y <= max.y and p.z >= min.z and p.z <= max.z
end

print(inside(zone, vec3(10, 20, 30))) -- true
```