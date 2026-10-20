---
sidebar_position: 58
---

# NPCHandle (client)

On the client, an [`NPCHandle`](../../shared/objects/npc.md) also reads the NPC's bounding box in the local player's game.

**Available on:** Client

**See also:** [NPCHandle](../../shared/objects/npc.md), [NPCHandle (server)](../../server/objects/npc.md)

## Methods {#methods}

### npc\:GetAABB() {#npcgetaabb}

Returns the NPC's bounding box in world space.

**Side:** Client

**Parameters:** none

**Returns:** `AABB` (with `min` and `max` `vec3`s, see [Math](../../shared/math.md)), or `nil` while the NPC is not spawned in this game.

**Example**

```lua
local box = npc:GetAABB()

if box then
	local top = box.max.y
end
```

### npc\:GetLocalAABB() {#npcgetlocalaabb}

Returns the NPC's bounding box in its own model space (not moved or turned with the NPC).

**Side:** Client

**Parameters:** none

**Returns:** `AABB`, or `nil` while the NPC is not spawned in this game.

**Example**

```lua
local box = npc:GetLocalAABB()

if box then
	local height = box.max.y - box.min.y
end
```