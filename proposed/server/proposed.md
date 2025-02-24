# Proposed API

These are proposed API changes for the server.


## `Server` class

- `GetPlayers()`
- `GetPlayer(playerId: number)`
- `GetPlayerCount()`
- `GetVehicles()`

## `Chat` class

- `Broadcast(message: string, color: Color)`
- `Send(player: Player, message: string, color: Color)`

## `Player` class

### Static Methods
- `GetById(id: number): Player`
- `Match(pattern: string): table`

### Methods
- `Ban()`
- `Ban(reason: string)`
- `ClearInventory()`
- `DisableAutoAim(player: Player)`
- `DisableCollision(group: CollisionGroup)`
- `EnableAutoAim(player: Player)`
- `EnableCollision(group: CollisionGroup)`
- `EnterVehicle(vehicle: Vehicle, seat: VehicleSeat)`
- `GetAimTarget(): table`
- `GetAngle(): Angle`
- `GetCameraPosition(): Vector3`
- `GetEquippedSlot(): WeaponSlot`
- `GetEquippedWeapon(): Weapon`
- `GetHealth(): number`
- `GetId(): number`
- `GetIP(): string`
- `GetInventory(): table`
- `GetLinearVelocity(): Vector3`
- `GetModelId(): number`
- `GetMoney(): number`
- `GetName(): string`
- `GetParachuting(): boolean`
- `GetPing(): number`
- `GetPosition(): Vector3`
- `GetState(): PlayerState`
- `GetSteamId(): SteamId`
- `GetValue(key: string): object`
- `GetVehicle(): Vehicle`
- `GetWeatherSeverity(): number`
- `GiveWeapon(slot: number, weapon: Weapon)`
- `HasVehicleDLC(vehicleId: VehicleId): boolean`
- `HasWeaponDLC(weaponId: WeaponId): boolean`
- `InVehicle(): boolean`
- `IsFullyAuthenticated(): boolean`
- `Kick()`
- `Kick(reason: string)`
- `SendChatMessage(message: string, color: Color)`
- `SetAngle(angle: Angle)`
- `SetColor(color: Color)`
- `SetHealth(health: number)`
- `SetModelId(modelId: number)`
- `SetMoney(amount: number)`
- `SetNetworkValue(key: string, value: object)`
- `SetPosition(position: Vector3)`
- `SetWeatherSeverity(severity: number)`
- `SetValue(key: string, value: object)`

### Operators
- `Player == Player: boolean`
- `tostring(Player): string`

## `Vehicle` class

### Static Methods
- `Create(modelId: number, position: Vector3, angle: Angle): Vehicle`
- `Create(config: table): Vehicle`
- `GetById(id: number): Vehicle`

### Methods
- `GetAngle(): Angle`
- `GetAngularVelocity(): Vector3`
- `GetDriver(): Player`
- `GetHealth(): number`
- `GetId(): number`
- `GetInvulnerable(): boolean`
- `GetLinearVelocity(): Vector3`
- `GetMass(): number`
- `GetModelId(): number`
- `GetName(): string`
- `GetOccupants(): table`
- `GetPosition(): Vector3`
- `Remove()`
- `Respawn()`
- `SetAngle(angle: Angle)`
- `SetAngularVelocity(velocity: Vector3)`
- `SetHealth(health: number)`
- `SetInvulnerable(invulnerable: boolean)`
- `SetLinearVelocity(velocity: Vector3)`
- `SetMass(mass: number)`
- `SetPosition(position: Vector3)`

## `StaticObject` class

### Static Methods
- `Create(position: Vector3, angle: Angle, model: string): StaticObject`
- `Create(config: table): StaticObject`
- `GetById(id: number): StaticObject`

### Methods
- `GetAngle(): Angle`
- `GetCollision(): string`
- `GetId(): number`
- `GetModel(): string`
- `GetPosition(): Vector3`
- `Remove()`
- `Respawn()`
- `SetAngle(angle: Angle)`
- `SetPosition(position: Vector3)`
- `Teleport(position: Vector3, angle: Angle)`

### Inherited from StreamableObject
- `GetCellId(): CellID`
- `GetEnabled(): boolean`
- `GetStreamDistance(): number`
- `GetWorld(): World`
- `SetEnabled(enabled: boolean)`
- `SetStreamDistance(distance: number)`
- `SetWorld(world: World)`

### Operators
- `StaticObject == StaticObject: boolean`

## `StreamableObject` class

### Methods
- `GetCellId(): CellID`
- `GetEnabled(): boolean`
- `GetStreamDistance(): number`
- `GetWorld(): World`
- `SetEnabled(enabled: boolean)`
- `SetStreamDistance(distance: number)`
- `SetWorld(world: World)`
