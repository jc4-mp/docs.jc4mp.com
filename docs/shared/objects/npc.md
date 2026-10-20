---
sidebar_position: 19
---

# NPCHandle

An `NPCHandle` refers to a networked non-player character: a soldier, civilian or animal driven by script orders. You get one from [World.SpawnNPC](../../server/world.md#worldspawnnpcmodel-position-rotation-health), or by casting an [ObjectHandle](./object-handle.md) with `AsNPC()`.

**Available on:** Server, Client

**See also:** [NPCHandle (server)](../../server/objects/npc.md), [NPCHandle (client)](../../client/objects/npc.md)

An `NPCHandle` is also an [ObjectHandle](./object-handle.md): position, rotation, velocity, health, script data and the casts work on it too (see that page). If the NPC no longer exists, or on a client is not streamed in (see [Streaming](../world.md#streaming-objects-only-exist-where-they-are-needed)), every method does nothing and every getter returns `nil`.

## How NPCs are driven {#how-npcs-are-driven}

An NPC does nothing on its own: it does not wander, flee or attack by itself. It follows the orders a server script gives it:

- **Movement:** one order at a time, either [Move](../../server/objects/npc.md#npcmovedirection-movetype-movestyle) (walk in a direction) or [Follow](../../server/objects/npc.md#npcfollowtarget-movetype-movestyle) (keep moving toward an object). Each new movement order replaces the last. A newly spawned NPC is idle.
- **Look:** [LookAt](../../server/objects/npc.md#npclookatposition-looktype) turns its head or body toward a point.
- **Weapon and aim:** [GiveWeapon](../../server/objects/npc.md#npcgiveweaponweapon), [AimAt](../../server/objects/npc.md#npcaimatposition) / [StopAiming](../../server/objects/npc.md#npcstopaiming) and [SetFiring](../../server/objects/npc.md#npcsetfiringenable). While it aims, it turns its body toward the aim.
- **One-off actions:** [ThrowGrenade](../../server/objects/npc.md#npcthrowgrenadeposition) and [Melee](../../server/objects/npc.md#npcmeleetarget).

The NPC's AI runs in the game of its owner (see [Ownership](../world.md#ownership-who-simulates-an-object)), which sends its position, velocity and health to everyone else. The orders (movement, look, weapon, aim, firing) are kept on the server and sent to every player who sees the NPC, also to players who come into range later and to a new owner, so the NPC carries on. Grenade throws and melee swings are only sent to the players who see the NPC at that moment.

Every order is ignored while the NPC is dead (health `0`). Orders that take a target object do nothing if that object no longer exists; a target that exists but is not streamed in on a player's game is followed or aimed at there only once it streams in.

## Methods {#methods}

### npc\:GetId() {#npcgetid}

Returns the character name the NPC was spawned with.

**Side:** Server, Client

**Parameters:** none

**Returns:** `string` (see [NPCs](../../lists/npcs.md)), or `nil` if the NPC is gone.

**Example**

```lua
print("spawned a " .. npc:GetId())
```