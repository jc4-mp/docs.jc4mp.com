# Proposed API

These are proposed API changes for the client environment.

## `Render` class

### Functions
- `DrawCircle(position: Vector2, radius: number, color: Color)`
- `DrawCircle(position: Vector3, radius: number, color: Color)`
- `DrawLine(start: Vector3, end: Vector3, color: Color)`
- `DrawLine(start: Vector2, end: Vector2, color: Color)` 
- `DrawText(position: Vector2, text: string, color: Color, size?: number, scale?: number)`
- `DrawText(position: Vector3, text: string, color: Color, size?: number, scale?: number)`
- `FillArea(start: Vector2, end: Vector2, color: Color)`
- `FillArea(start: Vector3, end: Vector3, color: Color)`
- `FillCircle(position: Vector2, radius: number, color: Color)`
- `FillCircle(position: Vector3, radius: number, color: Color)`
- `FillTriangle(p1: Vector2, p2: Vector2, p3: Vector2, color: Color)`
- `GetTextHeight(text: string, size?: number, scale?: number): number`
- `GetTextSize(text: string, size?: number, scale?: number): Vector2`
- `GetTextWidth(text: string, size?: number, scale?: number): number`
- `ResetTransform()`
- `SetClip(enabled: boolean, start?: Vector2, end?: Vector2)`
- `SetTransform(transform: Transform2)`
- `WorldToScreen(position: Vector3): Vector2, boolean`
- `WorldToMinimap(position: Vector3): Vector2, boolean`

### Properties
- `Height: number`
- `Width: number` 
- `Size: Vector2`

## `LocalPlayer` class

### Methods
- `GetAimTarget(): table`
- `GetMoney(): number`
- `SetBaseState(state: AnimationState)`
- `SetUpperBodyState(state: AnimationState)`

### Inherited from Player
- `GetAngle(): Angle`
- `GetBaseState(): AnimationState`
- `GetBonePosition(boneName: string): Vector3`
- `GetBones(): table`
- `GetColor(): Color`
- `GetEquippedSlot(): number`
- `GetEquippedWeapon(): Weapon`
- `GetHealth(): number`
- `GetId(): number`
- `GetInventory(): table`
- `GetLinearVelocity(): Vector3`
- `GetModelId(): number`
- `GetName(): string`
- `GetPosition(): Vector3`
- `GetState(): PlayerState`
- `GetSteamId(): SteamId`
- `GetVehicle(): Vehicle`
- `GetWorld(): World`
- `InVehicle(): boolean`
- `IsValid(): boolean`

## `Vehicle` class

### Static Methods
- `GetById(id: number): Vehicle`
- `GetMassByModelId(modelId: number): number`
- `GetNameByModelId(modelId: number): string`

### Methods
- `GetAngle(): Angle`
- `GetAngularVelocity(): Vector3`
- `GetBoundingBox(): Vector3, Vector3`
- `GetCenterOfMass(): Vector3`
- `GetColors(): Color, Color`
- `GetDecal(): string`
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
- `GetTemplate(): string`
- `IsValid(): boolean`

### Operators
- `Vehicle == Vehicle: boolean`
- `tostring(Vehicle): string`

## `ClientLight` class

### Static Methods
- `Create(config: table): ClientLight`
- `Play(config: table)`

### Methods
- `GetColor(): Color`
- `GetConstantAttenuation(): number`
- `GetEnabled(): boolean`
- `GetFadeInDuration(): number`
- `GetFadeOutDuration(): number`
- `GetLinearAttenuation(): number`
- `GetMultiplier(): number`
- `GetRadius(): number`
- `GetQuadraticAttenuation(): number`
- `Remove()`
- `SetColor(color: Color)`
- `SetConstantAttenuation(value: number)`
- `SetEnabled(enabled: boolean)`
- `SetFadeInDuration(duration: number)`
- `SetFadeOutDuration(duration: number)`
- `SetLinearAttenuation(value: number)`
- `SetMultiplier(value: number)`
- `SetRadius(radius: number)`
- `SetQuadraticAttenuation(value: number)`

## `Input` class

### Methods
- `GetEnabled(): boolean`
- `GetValue(action: Action): number`
- `SetEnabled(enabled: boolean)`
- `SetValue(action: Action, value: number)`
- `SetValue(action: Action, value: number, force: boolean)`

## `Waypoint` class

### Methods
- `GetPosition(): Vector3, boolean`
- `Remove()`
- `SetPosition(position: Vector3)`

## `Game` class

### Methods
- `FireEvent(eventName: string)`
- `GetHeat(): table`
- `GetSetting(setting: GameSetting): number`
- `GetState(): GUIState`
- `GetTime(): number`
- `SetHeat(level: HeatLevel, value: number)`
- `ResetHeat()`
- `ShowPopup(text: string, useGameTime: boolean)`

## `Physics` class

### Methods
- `GetTerrainHeight(position: Vector3): number`
- `GetTerrainHeight(position: Vector2): number`
- `Raycast(origin: Vector3, direction: Vector3, minDistance: number, maxDistance: number): table`

## `Mouse` class

### Methods
- `GetPosition(): Vector2`
- `GetVisible(): boolean`
- `SetPosition(position: Vector2)`
- `SetVisible(visible: boolean)`

## `Key` class

### Methods
- `IsDown(keyCode: number): boolean`

## `Client` class

### Methods
- `GetElapsedSeconds(): number`
- `GetPlayers(): iterator`
- `GetStaticObjects(): iterator`
- `GetStreamedPlayers(): iterator`
- `GetVehicles(): iterator`

## `Chat` class

### Methods
- `GetActive(): boolean`
- `GetEnabled(): boolean`
- `Print(text: string, color: Color)`
- `SetActive(active: boolean)`
- `SetEnabled(enabled: boolean)`

## `ClientEffect` class

### Static Methods
- `Create(location: AssetLocation, config: table): ClientEffect`
- `Play(location: AssetLocation, config: table)`

### Methods
- `GetEffectId(): number`
- `IsPlaying(): boolean`
- `Play()`
- `Remove()`
- `Stop()`

## `ClientParticleSystem` class

### Static Methods
- `Create(config: table): ClientParticleSystem`
- `Play(config: table)`

### Methods
- `GetPath(): string`
- `IsPlaying(): boolean`
- `Play()`
- `Remove()`
- `Stop()`

## `ClientSound` class

### Static Methods
- `Create(location: AssetLocation, config: table): ClientSound`
- `Play(location: AssetLocation, config: table)`

### Methods
- `GetBankId(): number`
- `GetSoundId(): number`
- `IsPlaying(): boolean`
- `Play()`
- `Remove()`
- `SetParameter(param: number, value: number)`
- `Stop()`

## `ClientStaticObject` class

### Static Methods
- `Create(config: table): ClientStaticObject`

### Methods
- `Remove()`

## `GUIState` enum

### Values
- `Game = 4`
- `Loading = 3`
- `Menu = 2`
- `PDA = 5`

