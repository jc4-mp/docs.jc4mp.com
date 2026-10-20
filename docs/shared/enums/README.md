---
sidebar_position: 22
---

# Enums

Enums are global tables of named constants, such as `WeaponSlot.Primary` or `Key.F1`. Pass them to the functions that expect them instead of writing the raw numbers, and compare what functions and events return against them. This page lists every enum table, the side it exists on, and where it is documented.

**Available on:** Server, Client (see each table)

## Values {#values}

### How enums work {#how-enums-work}

- Every enum is a plain Lua table of numbers. `WeaponSlot.Primary` is just `0`, `Key.F1` is just `112`, so you can store, compare and send them over the network like any number.
- Some enums are small consecutive integers (`WeaponSlot`, `TornadoState`, ...). Functions that take them check the range and raise a Lua error such as `invalid weapon slot 7` for a value that doesn't exist.
- Some are bit flags (`AclLevel`, `RoadGraphType`) that can be combined with `bit.bor` or `+` and tested with `bit.band` (see [Sandbox](../sandbox.md#bit)), or with `HasAcl` for `AclLevel`.
- Some are 32-bit hashes of game names (`Action`, `Ability`, `Bone`, `VehicleType`, `ForcePulseTuning`, ...). Treat them as opaque identifiers. [`Hash`](../hash.md) computes the same hash from a name, for example `Hash("ACT_JUMP") == Action.Jump`.
- The tables are ordinary globals. Never assign to them: the functions don't read them, so changing a value only breaks your own comparisons.

To list a table's contents at runtime:

```lua
for name, value in pairs(WeaponSlot) do
	print(name, value)
end
```

### All enum tables {#all-enum-tables}

| Table | Side | What it is | Page |
|---|---|---|---|
| `AclLevel` | Server, Client | Player permission flags (owner, admin, moderator) | [acl-level.md](./acl-level.md) |
| `NetObjectType` | Server, Client | Kinds of networked objects (player, vehicle, NPC, ...) | [net-object-type.md](./net-object-type.md) |
| `Resource` | Server, Client | `Resource.Name`, the current resource's name | [resource.md](./resource.md) |
| `ResourceStatus` | Server, Client | Whether a resource is running | [resource.md](./resource.md) |
| `ResourceAction` | Server, Client | What a player's game did with a resource (start, stop) | [resource.md](./resource.md) |
| `Key` | Server, Client (used on the client) | Keyboard keys and mouse buttons | [key.md](./key.md) |
| `WeaponSlot` | Server, Client | A player's weapon slots | [weapon.md](./weapon.md) |
| `WeaponMode` | Server, Client | A weapon's primary and secondary fire | [weapon.md](./weapon.md) |
| `AmmoType` | Server, Client | Ammunition types | [weapon.md](./weapon.md) |
| `WeatherAct` | Server, Client (used on the server) | Weather actions: spawn and remove the tornado | [weather.md](./weather.md) |
| `WeatherProperty` | Server, Client (used on the server) | Weather settings: tornado and clouds | [weather.md](./weather.md) |
| `TornadoState` | Server, Client (used on the server) | States of the tornado | [weather.md](./weather.md) |
| `VehiclePart` | Server, Client | Doors, hatches and other moving parts of vehicles | [vehicle.md](./vehicle.md) |
| `VehiclePartState` | Server, Client | Open / closed state of a vehicle part | [vehicle.md](./vehicle.md) |
| `VehicleSeat` | Server, Client | Vehicle seats and stunt positions | [vehicle.md](./vehicle.md) |
| `VehicleType` | Server, Client (used on the client) | Kinds of vehicles (car, boat, helicopter, ...) | [vehicle.md](./vehicle.md) |
| `POIType` | Server, Client (used on the client) | Kinds of map and world markers | [poi.md](./poi.md) |
| `POIDisplayMode` | Server, Client (used on the client) | Where a marker is shown (world, map, both) | [poi.md](./poi.md) |
| `MoveType` | Server, Client (used on the server) | NPC movement speed | [npc.md](./npc.md) |
| `MoveStyle` | Server, Client (used on the server) | NPC movement attitude | [npc.md](./npc.md) |
| `LookType` | Server, Client (used on the server) | Whether an NPC looks with its head or body | [npc.md](./npc.md) |
| `RigidObjectMotionType` | Server, Client | Static, keyframed or dynamic rigid objects | [rigid-object.md](./rigid-object.md) |
| `Ability` | Client | The local player's unlockable abilities | [ability.md](../../client/enums/ability.md) |
| `Action` | Client | Character acts (jump, crouch, ragdoll, ...) | [action.md](../../client/enums/action.md) |
| `InputAction` | Client | Player input actions | [action.md](../../client/enums/action.md) |
| `PfxLayer` | Client | Physics collision layers for raycasts | [pfx-layer.md](../../client/enums/pfx-layer.md) |
| `Bone` | Client | Character skeleton bones | [bone.md](../../client/enums/bone.md) |
| `GameState` | Client | The game's startup and loading states | [game-state.md](../../client/enums/game-state.md) |
| `CharacterAttachedEffect` | Client | Visual effects played on a character | [character-attached-effect.md](../../client/enums/character-attached-effect.md) |
| `CameraShakeType` | Client | How a camera shake moves the camera | [camera-shake-type.md](../../client/enums/camera-shake-type.md) |
| `WaterBoxStyle` | Client | How a water box fits the terrain | [water-box-style.md](../../client/enums/water-box-style.md) |
| `ForcePulseCategory` | Client | Kinds of explosion push | [force-pulse.md](../../client/enums/force-pulse.md) |
| `ForcePulseTuning` | Client | The game's built-in explosion tunings | [force-pulse.md](../../client/enums/force-pulse.md) |
| `RoadGraphType` | Client | Kinds of AI routes (road, sea, air, footpath, railway) | [road-graph-type.md](../../client/enums/road-graph-type.md) |

### Where enums are used {#where-enums-are-used}

| Enum | Used by |
|---|---|
| `AclLevel` | `client:GetAcl()`, `client:HasAcl(level)`, `client:SetAcl(flags)` ([PlayerHandle](../objects/player.md)) |
| `NetObjectType` | [`World.GetAllByType(type)`](../world.md), [`object:GetType()`](../objects/object-handle.md) |
| `Resource`, `ResourceStatus`, `ResourceAction` | [`Resources.GetAll()`](../resources.md), `resource:GetStatus()`, the [`OnPlayerResourceAction`](../../server/events.md) event |
| `Key` | [`Input.IsKeyDown`, `Input.IsKeyPressed`, `Input.IsKeyReleased`](../../client/input.md), the [`OnKeyDown`, `OnKeyUp`, `OnMouseDown`](../../client/events.md) events |
| `WeaponSlot`, `WeaponMode`, `AmmoType` | `player:GiveWeapon`, `RemoveWeapon`, `GetWeaponName`, `GetWeaponAmmo`, `SetWeaponAmmo`, `GetInventoryAmmo`, `SetInventoryAmmo` ([PlayerObjectHandle](../objects/player.md)) |
| `WeatherAct`, `WeatherProperty`, `TornadoState` | [`Weather.SyncAct`, `Weather.SyncProperty`](../../server/weather.md) (server) |
| `VehiclePart`, `VehiclePartState` | `vehicle:GetPartState`, `vehicle:SetPartState` ([VehicleHandle](../objects/vehicle.md)), the [`OnVehiclePartChangedState`](../../client/events.md) event |
| `VehicleSeat` | [`player:WarpIntoVehicle`](../../server/objects/player.md), the [`OnPlayerVehicleEnter` and `OnPlayerVehicleExit`](../../server/events.md) events |
| `VehicleType` | [`vehicle:GetVehicleType()`](../../client/objects/vehicle.md) (client) |
| `POIType`, `POIDisplayMode` | [`World.SpawnPOI`](../../client/world.md) (client) |
| `MoveType`, `MoveStyle`, `LookType` | `npc:Move`, `npc:Follow`, `npc:LookAt` ([NPCHandle](../objects/npc.md), server) |
| `RigidObjectMotionType` | [`World.SpawnRigidObject`](../../client/world.md), [`rigidObject:SetMotionType`](../../server/objects/rigid-object.md), [`RigidObject:SetMotionType`](../../client/game-objects.md) |
| `Ability` | [`Local.LockAbility`, `Local.UnlockAbility`, `Local.IsAbilityUnlocked`](../../client/local.md) |
| `Action` | [`Local.PlayAction`](../../client/local.md#localplayactionaction) |
| `InputAction` | [`Input.GetValue`](../../client/input.md), the [`OnLocalPlayerInput`](../../client/events.md) event |
| `PfxLayer` | [`Physics.Raycast`](../../client/physics.md) |
| `Bone` | [`player:GetBonePosition`](../../client/objects/player.md) (client) |
| `GameState` | [`Game.GetState()`](../../client/game.md) |
| `CharacterAttachedEffect` | [`player:PlayAttachedEffect`](../../client/objects/player.md) (client) |
| `CameraShakeType` | [`Camera.SpawnShake`](../../client/camera.md) |
| `WaterBoxStyle` | [`World.SpawnWaterBox`](../../client/world.md) (client) |
| `ForcePulseCategory`, `ForcePulseTuning` | [`World.SpawnForcePulse`](../../client/world.md) (client) |
| `RoadGraphType` | [`RoadGraph.GetSamples`, `RoadGraph.GetEdge`](../../client/road-graph.md) |