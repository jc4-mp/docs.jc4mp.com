# Proposed Client Events

These events are only available on the client-side.

## Camera Events

### CalcView
- Return: `false` to disable local player
- Description: Called every frame to update camera position/rotation
- Note: Only place camera changes should be made

## Input Events 

### CharPress
- Arguments: `character: string`
- Description: Fired when a character key is pressed
- Note: Only printable characters, repeats when held

### KeyDown
- Arguments: `key: Key` 
- Description: Fired when any key is pressed
- Note: Repeats when held

### KeyUp
- Arguments: `key: Key`
- Description: Fired when any key is released

### LocalPlayerInput
- Arguments:
  - `input: Action` 
  - `state: number`
- Return: `false` to block the action
- Description: Fired when player uses a game action
- Note: State ranges from 0-1 for analog inputs

### MouseDown
- Arguments: `button: number`
- Description: Fired when mouse button pressed
- Button values:
  - 1: Left click
  - 2: Right click 
  - 3: Middle click
  - 4: Back button
  - 5: Forward button

### MouseMove
- Arguments: `position: Vector2`
- Description: Fired when mouse moves
- Note: (0,0) is top-left of screen

### MouseScroll
- Arguments: `delta: number`
- Description: Fired when mouse wheel scrolled
- Note: Delta usually ±1, can be larger

### MouseUp
- Arguments: `button: number` 
- Description: Fired when mouse button released

## Player Events

### LocalPlayerBulletHit
- Arguments:
  - `attacker: Player`
  - `damage: number`
- Return: `false` to block damage
- Description: Fired when local player hit by bullet

### LocalPlayerChat
- Arguments: `text: string`
- Return: `false` to block message
- Description: Fired when local player sends chat message

### LocalPlayerDeath
- Arguments:
  - `attacker: Player`
  - `type: DamageEntity`
- Description: Fired when local player dies

### LocalPlayerEnterVehicle
- Arguments:
  - `vehicle: Vehicle`
  - `is_driver: boolean`
- Description: Fired when entering vehicle

### LocalPlayerExitVehicle  
- Arguments: `vehicle: Vehicle`
- Description: Fired when exiting vehicle

### LocalPlayerExplosionHit
- Arguments:
  - `attacker: Player`
  - `damage: number`
- Return: `false` to block damage
- Description: Fired when hit by explosion

## Render Events

### GameLoad
- Description: Fired after loading screen when spawning

### InputPoll
- Description: Called every frame
- Note: Only place Input:SetValue should be used

### PostRender
- Description: After JC2-MP renders
- Note: Renders on top of UI elements

### Render
- Description: Before JC2-MP renders  
- Note: Renders behind UI elements

### ResolutionChange
- Arguments: `size: Vector2`
- Description: Fired when game resolution changes
- Note: Render.Size contains previous resolution

## Vehicle Events

### VehicleCollide
- Arguments:
  - `attacker: Vehicle`
  - `vehicle: Vehicle`
  - `player: Player`
- Description: Vehicle collision with player/vehicle
- Note: Only one of vehicle/player is valid
