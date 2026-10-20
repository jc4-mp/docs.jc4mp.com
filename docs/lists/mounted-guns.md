---
sidebar_position: 89
---

# Mounted Guns

Every mounted gun and stationary turret name the game's spawn system knows, for [`World.SpawnMountedGun`](../server/world.md).

**Available on:** Server

## Usage {#usage}

### World.SpawnMountedGun(model, position, rotation?, health?) {#worldspawnmountedgunmodel-position-rotation-health}

`model` is the **Model** column below. The server creates the mounted gun and every client spawns that model from its own game files; players can then use it like any mounted gun (see [MountedGunHandle](../shared/objects/mounted-gun.md)).

- `rotation` is optional euler angles in degrees (`vec3`), `health` an optional starting health from 0 to 1.
- Names are typed exactly as listed (lowercase). A name the game doesn't know spawns nothing on the clients.
- The name must spawn a mounted gun: passing a hand-held weapon or a vehicle name here doesn't make a mounted gun.
- The `_aoc` models are the rebel (Army of Chaos) versions. Rows with a **DLC** value only exist for players who own and installed that DLC (see [DLC content](./README.md#dlc-content)).

**Example**

```lua
-- two anti-air guns guarding a base
local base = vec3(1200, 210, -3400)

World.SpawnMountedGun("wpn_203_aa_gun", base + vec3(10, 0, 0), vec3(0, 0, 0))
World.SpawnMountedGun("wpn_203_aa_gun", base + vec3(-10, 0, 0), vec3(0, 180, 0))
```

## Values {#values}

### Mounted guns {#mounted-guns}

| Name | Model | Tags | DLC |
|---|---|---|---|
| Mounted Minigun | `wpn_201_minigun` | mounted, heavy, minigun, urga, vulcan, w201, wpn_201, stationary |  |
| Mounted Minigun (Rebel) | `wpn_201_minigun_aoc` | mounted, heavy, minigun, w201, wpn_201, rebel, aoc, stationary |  |
| Cannon | `wpn_202_cannon` | turret, cannon, wpn_202, stationary |  |
| Cannon (Rebel) | `wpn_202_cannon_aoc` | turret, cannon, wpn_202, rebel, aoc, stationary |  |
| Anti-Air Gun | `wpn_203_aa_gun` | turret, aa, capstone, wpn_203, stationary |  |
| Anti-Air Gun (Rebel) | `wpn_203_aa_gun_aoc` | turret, aa, wpn_203, rebel, aoc, stationary |  |
| Mounted Mortar | `wpn_204_mortar_mounted` | turret, mortar_mounted, wpn_204, stationary |  |
| Mounted Mortar (Rebel) | `wpn_204_mortar_mounted_aoc` | turret, mortar_mounted, wpn_204, rebel, aoc, stationary |  |
| Agency AA Gun | `wpn_205_agency_aa_gun` | turret, aa, wpn_205, stationary | Danger Rising |

## Prototype entries {#prototype-entries}

The game also registers every exported entity under a second name ending in `_debug` (the editor's prototype spawn list). These names are valid spawn names in the retail game, but they were not made for regular gameplay and have not been tested with JC4MP, so prefer the names above and test a `_debug` name before you rely on it. This includes mounted guns that have no regular name, such as the .50 cal (`w206_mounted_capstone_m2hm_debug`) and the Illapa defence weapon (`illapa_defence_weapon_debug`).

| Model | DLC |
|---|---|
| `illapa_defence_weapon_debug` |  |
| `w201_minigun_mount_debug` |  |
| `w201_minigun_mount_rebel_debug` |  |
| `w206_mounted_capstone_m2hm_debug` |  |
| `wpn_201_minigun_debug` |  |
| `wpn_202_cannon_debug` |  |
| `wpn_202_cannon_rebel_debug` |  |
| `wpn_203_aa_gun_debug` |  |
| `wpn_203_aa_gun_rebel_debug` |  |
| `wpn_204_mortar_mounted_debug` |  |
| `wpn_204_mortar_mounted_rebel_debug` |  |