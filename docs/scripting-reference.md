---
sidebar_position: 5
sidebar_label: "Scripting Reference"
sidebar_class_name: "sidebar-scripting-reference"
---

# JC4MP scripting reference

JC4MP servers run Lua resources: gamemodes, menus, UIs and tools. Each resource can have server scripts, client scripts and shared scripts, and players download the client and shared parts when they join. This reference covers everything a resource can use: the Lua API on both sides, every event, every enum, the JavaScript bridge for web UIs, and lists of the game names scripts pass in (vehicles, weapons, skins, NPCs, effects and more).

Scripts run on LuaJIT (Lua 5.1 syntax). The reference is grouped by where the API runs:

- **Shared:** available to both server and client scripts, plus the concepts that apply to both
- **Server:** only available to server scripts
- **Client:** only available to client scripts

Many types have a page on each side: the shared page explains the type and its common methods, and the server and client pages add what only that side can do.

New to JC4MP scripting? Start with [Getting started](./get-started/first-resource.md), then read [Resources](./shared/resources.md) and [Net](./shared/net.md). Porting resources written for the old JC4MP API? See [Porting](./porting.md).

## Shared {#shared}

| Page | What it covers |
|---|---|
| [Resources](./shared/resources.md) | Folder layout, `client`/`server`/`shared`, lifecycle, `require`, downloads, the `Resources` table |
| [Sandbox](./shared/sandbox.md) | Which Lua libraries and globals exist on each side, limits, error reporting |
| [Events](./shared/events.md) | `Event.Add`, `Event.Remove`, `Event.Fire`, `Event.Cancel` and how dispatch works |
| [Net](./shared/net.md) | How messages between client and server scripts work, `Net.AddEvent`, what values can be sent |
| [Timer](./shared/timer.md) | Delayed and repeating callbacks |
| [Hash](./shared/hash.md) | `Hash`, the game's 32-bit hash of a name |
| [JSON](./shared/json.md) | Parsing and writing JSON |
| [Math types](./shared/math.md) | `vec2`, `vec3`, `vec4`, `quat`, `mat4`, `AABB` |
| [World](./shared/world.md) | Handles, streaming, ownership, what is synced, finding objects |
| [Weather](./shared/weather.md) | How weather sync works, sandstorms |
| [ObjectHandle](./shared/objects/object-handle.md) | Methods every networked object has, casting to typed handles |
| [Player](./shared/objects/player.md) | `PlayerHandle` (the connection) and `PlayerObjectHandle` (the character) |
| [Players](./shared/objects/players.md) | Finding players |
| [VehicleHandle](./shared/objects/vehicle.md) | Vehicle id, paint, dirt and parts |
| [MountedGunHandle](./shared/objects/mounted-gun.md) | Mounted guns |
| [RigidObjectHandle](./shared/objects/rigid-object.md) | Physics props |
| [NPCHandle](./shared/objects/npc.md) | NPCs and how they are driven |
| [TetherHandle](./shared/objects/tether.md) | Grappling tethers |
| [SandstormHandle](./shared/objects/sandstorm.md) | Sandstorms |
| [Enums](./shared/enums/README.md) | Index of every enum table on both sides |

Shared enums: [AclLevel](./shared/enums/acl-level.md), [Key](./shared/enums/key.md), [NetObjectType](./shared/enums/net-object-type.md), [MoveType, MoveStyle, LookType](./shared/enums/npc.md), [POIType, POIDisplayMode](./shared/enums/poi.md), [Resource, ResourceAction, ResourceStatus](./shared/enums/resource.md), [RigidObjectMotionType](./shared/enums/rigid-object.md), [VehiclePart, VehiclePartState, VehicleSeat, VehicleType](./shared/enums/vehicle.md), [WeaponSlot, WeaponMode, AmmoType](./shared/enums/weapon.md), [WeatherAct, WeatherProperty, TornadoState](./shared/enums/weather.md).

## Server {#server}

| Page | What it covers |
|---|---|
| [Server events](./server/events.md) | Every event fired on the server |
| [Resources](./server/resources.md) | Starting, stopping and restarting resources, startup configuration |
| [Net](./server/net.md) | Sending messages to players, `Net.Sender` |
| [HTTP](./server/http.md) | `Net.Fetch` web requests |
| [SQL](./server/sql.md) | The server's SQLite database |
| [Server](./server/server.md) | Server information |
| [Chat](./server/chat.md) | Chat messages |
| [Server console](./server/console.md) | Console commands |
| [World](./server/world.md) | Spawning and destroying objects, explosions |
| [Weather](./server/weather.md) | Syncing tornadoes, clouds and weather properties |
| [ObjectHandle](./server/objects/object-handle.md) | Moving objects, setting health, velocity and data |
| [Player](./server/objects/player.md) | Kicking, banning, permissions, skins, weapons, animations, teleporting |
| [VehicleHandle](./server/objects/vehicle.md) | Paint, locking, parts and drones |
| [RigidObjectHandle](./server/objects/rigid-object.md) | Motion type and collision |
| [NPCHandle](./server/objects/npc.md) | NPC orders: move, follow, aim, fire, throw grenades, melee |

## Client {#client}

| Page | What it covers |
|---|---|
| [Client events](./client/events.md) | Every event fired on the client |
| [Net](./client/net.md) | Sending messages to the server |
| [Commands](./client/commands.md) | Console commands (`Cmd`) |
| [World](./client/world.md) | Time, gravity, waypoints, water and client-side objects |
| [Weather](./client/weather.md) | Lightning |
| [ObjectHandle](./client/objects/object-handle.md) | Client-side data |
| [Player](./client/objects/player.md) | Character state, bones, effects and appearance |
| [Players](./client/objects/players.md) | The local player and name tags |
| [VehicleHandle](./client/objects/vehicle.md) | Client-only vehicle methods |
| [RigidObjectHandle](./client/objects/rigid-object.md) | Bounding boxes |
| [NPCHandle](./client/objects/npc.md) | Bounding boxes |
| [Local](./client/local.md) | The local player |
| [Client](./client/client.md) | Client version, uptime and network statistics |
| [Game](./client/game.md) | Game state |
| [Game objects](./client/game-objects.md) | Client-side objects: POIs, water boxes, force pulses, effects and their base types |
| [Input](./client/input.md) | Keyboard, mouse, game input and the clipboard |
| [Camera](./client/camera.md) | Camera position, direction and shakes |
| [Render](./client/render.md) | Screen size and debug drawing |
| [FX](./client/fx.md) | Playing particle effects |
| [Sound](./client/sound.md) | Playing sounds and controlling channels |
| [Physics](./client/physics.md) | Raycasts |
| [Terrain](./client/terrain.md) | Terrain information and vegetation shockwaves |
| [NavMesh](./client/navmesh.md) | Navigation mesh queries |
| [RoadGraph](./client/road-graph.md) | Roads, sea and air routes, paths and railways |
| [Weapon](./client/weapons.md) | The weapon a player holds |
| [GameUI](./client/game-ui.md) | The game's own HUD |
| [Asset](./client/asset.md) | Checking whether game assets are loaded |
| [UI and WebView](./client/ui.md) | Web UIs from Lua: creating, showing and messaging webviews |
| [WebView pages (JavaScript)](./client/webview.md) | The `JC4MP` bridge inside a webview page |

Client enums: [Ability](./client/enums/ability.md), [Action, InputAction](./client/enums/action.md), [Bone](./client/enums/bone.md), [CameraShakeType](./client/enums/camera-shake-type.md), [CharacterAttachedEffect](./client/enums/character-attached-effect.md), [ForcePulseCategory, ForcePulseTuning](./client/enums/force-pulse.md), [GameState](./client/enums/game-state.md), [PfxLayer](./client/enums/pfx-layer.md), [RoadGraphType](./client/enums/road-graph-type.md), [WaterBoxStyle](./client/enums/water-box-style.md).

## Game name lists {#game-name-lists}

Names that scripts pass to spawn and play functions. See the [lists index](./lists/README.md).

| Page | Used by |
|---|---|
| [Vehicles](./lists/vehicles.md) | `World.SpawnVehicle` |
| [Mounted guns](./lists/mounted-guns.md) | `World.SpawnMountedGun` |
| [Weapons](./lists/weapons.md) | `GiveWeapon` |
| [Skins](./lists/skins.md) | `SetSkin` |
| [NPCs](./lists/npcs.md) | `World.SpawnNPC` |
| [Animations](./lists/animations.md) | `PlayAnimation` |
| [Effects](./lists/effects.md) | `FX.Spawn` |
| [Explosions](./lists/explosions.md) | `World.SpawnExplosion` |
| [Rigid objects](./lists/rigid-objects.md) | `World.SpawnRigidObject` |
| [Sounds](./lists/sounds.md) | `Sound` |