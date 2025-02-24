# Proposed API

These are proposed API changes for the shared environment.

## `Vector3` class

### Static Methods
- `Cross(a: Vector3, b: Vector3): Vector3`
- `Distance(a: Vector3, b: Vector3): number`
- `Distance2D(a: Vector3, b: Vector3): number`
- `DistanceSqr(a: Vector3, b: Vector3): number`
- `DistanceSqr2D(a: Vector3, b: Vector3): number`
- `Dot(a: Vector3, b: Vector3): number`

### Methods
- `Cross(other: Vector3): Vector3`
- `Distance(other: Vector3): number`
- `Distance2D(other: Vector3): number`
- `DistanceSqr(other: Vector3): number`
- `DistanceSqr2D(other: Vector3): number`
- `Dot(other: Vector3): number`
- `Length(): number`
- `LengthSqr(): number`
- `Normalize()`
- `Normalized(): Vector3`

### Properties
- `x: number`
- `y: number`
- `z: number`

### Static Values
- `Zero: Vector3(0, 0, 0)`
- `One: Vector3(1, 1, 1)`
- `Forward: Vector3(0, 0, -1)`
- `Backward: Vector3(0, 0, 1)`
- `Up: Vector3(0, 1, 0)`
- `Down: Vector3(0, -1, 0)`
- `Left: Vector3(-1, 0, 0)`
- `Right: Vector3(1, 0, 0)`

### Operators
- `Vector3 + Vector3: Vector3`
- `Vector3 - Vector3: Vector3`
- `Vector3 * number: Vector3`
- `number * Vector3: Vector3`
- `Vector3 / number: Vector3`
- `Vector3 == Vector3: boolean`
- `-Vector3: Vector3`
- `tostring(Vector3): string`

## `Vector2` class

### Static Methods
- `Distance(a: Vector2, b: Vector2): number`
- `DistanceSqr(a: Vector2, b: Vector2): number`
- `Dot(a: Vector2, b: Vector2): number`

### Methods
- `Distance(other: Vector2): number`
- `DistanceSqr(other: Vector2): number`
- `Dot(other: Vector2): number`
- `Length(): number`
- `LengthSqr(): number`
- `Normalize()`
- `Normalized(): Vector2`

### Properties
- `x: number`
- `y: number`

### Static Values
- `Zero: Vector2(0, 0)`
- `One: Vector2(1, 1)`
- `Up: Vector2(0, -1)`
- `Down: Vector2(0, 1)`
- `Left: Vector2(-1, 0)`
- `Right: Vector2(1, 0)`

### Operators
- `Vector2 + Vector2: Vector2`
- `Vector2 - Vector2: Vector2`
- `Vector2 * number: Vector2`
- `number * Vector2: Vector2`
- `Vector2 / number: Vector2`
- `Vector2 == Vector2: boolean`
- `-Vector2: Vector2`
- `tostring(Vector2): string`

## `Weapon` class

### Constructor
- `Weapon(weaponId: WeaponId, ammoClip?: number, ammoReserve?: number)`

### Properties
- `ammo_clip: number`
- `ammo_reserve: number`
- `id: number`

## `WeaponSlot` enum

- `Left = 0`
- `Right = 1`
- `Primary = 2`

## `Timer` class

### Methods
- `GetHours(): number`
- `GetMicroseconds(): number`
- `GetMilliseconds(): number`
- `GetMinutes(): number`
- `GetSeconds(): number`
- `Restart()`

## `Events` class

### Methods
- `Fire(eventName: string, data?: object): boolean`
- `Subscribe(eventName: string, callback: function, context?: object): Event`
- `Unsubscribe(event: Event)`
- `UnsubscribeAll()`

## `Network` class

### Methods
- `Broadcast(eventName: string, data?: object)`
- `Send(player: Player, eventName: string, data?: object)`
- `Send(eventName: string, data?: object)`
- `SendNearby(player: Player, eventName: string, data?: object)`
- `SendToPlayers(players: table, eventName: string, data?: object)`
