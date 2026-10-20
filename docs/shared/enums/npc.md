---
sidebar_position: 26
---

# MoveType, MoveStyle and LookType

These tables control how an NPC moves and looks around: `MoveType` is its speed (walk, run, sprint, stand), `MoveStyle` is the attitude it moves with (normal, searching, patrolling, nervous, ...), and `LookType` is whether it turns only its head or its whole body to look at something.

**Available on:** Server, Client (the tables exist on both sides, but only the server's NPC methods take them)

## Values {#values}

### MoveType {#movetype}

How fast the NPC moves.

Used by (see [NPCHandle](../objects/npc.md), server):

- `npc:Move(direction, moveType, moveStyle)`
- `npc:Follow(target, moveType, moveStyle)`

A value outside 0..3 raises the Lua error `invalid move type <n>`.

| Name | Value | Meaning |
|---|---|---|
| `MoveType.Walk` | 0 | Walk. |
| `MoveType.Run` | 1 | Run. |
| `MoveType.Sprint` | 2 | Sprint. |
| `MoveType.Idle` | 3 | Stand still. |

### MoveStyle {#movestyle}

The attitude the NPC moves with, which changes its movement animations.

Used by (see [NPCHandle](../objects/npc.md), server):

- `npc:Move(direction, moveType, moveStyle)`
- `npc:Follow(target, moveType, moveStyle)`

A value outside 0..5 raises the Lua error `invalid move style <n>`.

| Name | Value | Meaning |
|---|---|---|
| `MoveStyle.Normal` | 0 | Normal movement. |
| `MoveStyle.Search` | 1 | Searching, looking around for something. |
| `MoveStyle.NervousBackoff` | 2 | Nervously backing off. |
| `MoveStyle.Patrol` | 3 | Patrolling. |
| `MoveStyle.Concerned` | 4 | Concerned, on alert. |
| `MoveStyle.NervousWalk` | 5 | Walking nervously. |

### LookType {#looktype}

What the NPC turns to look at a position.

Used by [`npc:LookAt(position, lookType)`](../../server/objects/npc.md) (server). A value outside 0..1 raises the Lua error `invalid look type <n>`.

| Name | Value | Meaning |
|---|---|---|
| `LookType.Head` | 0 | Turn only the head. |
| `LookType.Body` | 1 | Turn the whole body. |

**Example**

```lua
-- server: spawn a guard that patrols after a random player, then stops and looks at them
local position = vec3(2851.6, 541.1, -9920.1)
local guard = World.SpawnNPC("ghost_enemy_001", position)

local target = World.GetRandomPlayer()

if target then
	guard:Follow(target, MoveType.Walk, MoveStyle.Patrol)

	Timer.Set(function()
		guard:Move(vec3(0, 0, 0), MoveType.Idle, MoveStyle.Normal)
		guard:LookAt(target:GetPosition(), LookType.Body)
	end, 10000, 1)
end
```