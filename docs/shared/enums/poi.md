---
sidebar_position: 27
---

# POIType and POIDisplayMode

These tables describe points of interest (POIs): the markers the game draws in the world and on the map, like the waypoint marker. `POIType` picks the kind of marker and `POIDisplayMode` picks where it is shown.

**Available on:** Server, Client (the tables exist on both sides, but only the client can create POIs)

## Values {#values}

### POIType {#poitype}

The kind of marker, which decides how the game draws it. Some types belong to specific game systems (the comments in the table say so); they can still be created from a script, but they are drawn the way that system draws them.

Used by [`World.SpawnPOI(position, type, displayMode, minDistance, maxDistance)`](../../client/world.md) (client). The POI is only created in the local player's game, it is not synced to other players. The value is passed to the game as is, without checking it against the table.

| Name | Value | Meaning |
|---|---|---|
| `POIType.UserPlaced` | 0 | The player's own map waypoint. |
| `POIType.Grenade` | 2 | The grenade warning marker (normally used by the grenade system). |
| `POIType.LockOnTarget` | 3 | A lock-on target marker (normally used by the weapon system). |
| `POIType.WeaponReticleAuto` | 6 | The automatic weapon reticle marker. |
| `POIType.DesignerPlaceable` | 12 | A general purpose marker, the kind level designers place for objectives. |
| `POIType.SupplyDrop` | 15 | A supply drop marker (normally used by supply drops). |
| `POIType.JaviBall` | 16 | A mission marker from Javi's tomb missions (the ball). |
| `POIType.Plunger` | 17 | A plunger (detonator) marker. |
| `POIType.PressurePlate` | 18 | A pressure plate marker. |
| `POIType.JaviTomb` | 19 | A mission marker from Javi's tomb missions (the tomb). |
| `POIType.Demon` | 20 | A demon marker. |

### POIDisplayMode {#poidisplaymode}

Where the POI is shown.

Used by [`World.SpawnPOI(position, type, displayMode, minDistance, maxDistance)`](../../client/world.md) (client).

| Name | Value | Meaning |
|---|---|---|
| `POIDisplayMode.World` | 0 | Only in the 3D world (on the screen, over its position). |
| `POIDisplayMode.Map` | 1 | Only on the map. |
| `POIDisplayMode.WorldAndMap` | 2 | Both in the world and on the map. |

**Example**

```lua
-- client: mark a meeting point in the world and on the map, visible from 10 m to 2 km away
local poi = World.SpawnPOI(vec3(2851.6, 541.1, -9920.1), POIType.DesignerPlaceable, POIDisplayMode.WorldAndMap, 10, 2000)

-- remove it later
Timer.Set(function()
	poi:Destroy()
end, 60000, 1)
```