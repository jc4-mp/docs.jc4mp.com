# Proposed Shared Events

These are events that can be subscribed to on both client and server.

## Entity Events

### EntitySpawn
- Arguments: `entity: object`
- Description: Fired when an entity spawns or streams in
- Entity types:
  - Player
  - Vehicle 
  - Checkpoint
  - StaticObject
  - ClientStaticObject
  - ClientEffect
  - ClientSound
- Note: Use `entity.__type` to get the entity type

### EntityDespawn  
- Arguments: `entity: object`
- Description: Fired when an entity despawns or streams out
- Entity types: Same as EntitySpawn
- Note: Vehicles trigger this on auto-respawn

## Module Events

### ModuleLoad
- Description: Fired after all scripts have been loaded
- Note: Fires after individual script load events

### ModuleUnload
- Description: Fired when a module is unloaded or reloaded
- Triggers on:
  - `unload` console command
  - `reload` console command
  - Server shutdown
  - Client disconnect/quit

### ModulesLoad
- Description: Fires on:
  - Server startup (after all modules loaded)
  - When any module is loaded/reloaded

## Player Events

### PlayerChat
- Arguments: `player: Player, text: string`
- Returns: `false` to block message
- Description: Fired when a player sends a chat message

### PlayerEnterVehicle
- Arguments: 
  - `player: Player`
  - `vehicle: Vehicle`
  - `is_driver: boolean`
  - `old_driver: Player`
- Description: Fired when player enters vehicle (not stunt position)

### PlayerExitVehicle
- Arguments: `player: Player, vehicle: Vehicle`
- Description: Fired when player exits vehicle

### PlayerJoin
- Arguments: `player: Player`
- Description: Fired when player joins server

### PlayerQuit
- Arguments: `player: Player` 
- Description: Fired when player leaves server (kick/ban/disconnect)

### PlayerNetworkValueChange
- Arguments: `player: Player, key: string, value: object`
- Description: Fired when Player:SetNetworkValue is called
- Note: Not fired by Player:SetValue

### PlayerValueChange
- Arguments: `player: Player, key: string, value: object`
- Description: Fired when Player:SetValue is called
- Note: Values persist across modules but not client/server

## Tick Events

### PreTick
- Description: Fired before game/server logic runs
- Server: Rate varies with load (max 100 ticks/sec idle)
- Client: Once per frame

### PostTick
- Description: Fired after game/server logic runs
- Server: Rate varies with load (max 100 ticks/sec idle)
- Client: Once per frame
