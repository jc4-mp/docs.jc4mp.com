# Proposed Events API

These are proposed events for the server.

## Player Events

### ClientModuleLoad
- Arguments: `player: Player`
- Fired when a player finishes loading their client-side scripts, either on join or module reload
- Wait for this before sending network messages to ensure client is ready

### PlayerAuthenticate  
- Arguments: `player: Player`
- Fired when a player is fully authenticated by Steam
- Use this to verify player identity before granting privileged access

### PlayerDeath
- Arguments: 
  - `player: Player` - The player that died
  - `reason: DamageEntity` - The cause of death
  - `killer: Player` - The player that caused the death (optional)
- Fired when a player dies

## Entity Events

### EntityRemove
- Arguments: `entity: object`
- Fired when an entity is removed from the game
- Entity types:
  - Player
  - Vehicle  
  - Checkpoint
  - StaticObject
  - ClientStaticObject
  - ClientEffect
  - ClientSound
- Access type via `entity.__type`

## System Events

### ServerStart
- Arguments: none
- Fired after all modules have been loaded on server startup

