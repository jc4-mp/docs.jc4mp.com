---
sidebar_position: 8
---

# Hash

`Hash` computes the game's 32-bit hash of a string. Just Cause 4 identifies many things by the hash of their name instead of the name itself: character acts, input actions, weapons, effect parameters, bones and more. The hash values scripts receive and the hash-based enums are these hashes, so `Hash` lets you compare them with a name you know, or build one the API has no enum value for.

**Available on:** Server, Client

## Functions {#functions}

### Hash(text) {#hashtext}

Returns the game's 32-bit hash of `text`, the same hash the game uses for names. The same text always gives the same value, on both sides and on every machine.

The hash is computed from the exact characters: it is case sensitive, and spaces or a different spelling give a completely different value. Spell names the way the game does (`"ACT_JUMP"` for an act, `"jump"` for an input action).

Where hashes appear:

- The [`Action` and `InputAction`](../client/enums/action.md) values are hashes of the game's act and input action names: `Hash("ACT_JUMP") == Action.Jump` and `Hash("jump") == InputAction.Jump`.
- The client event [`OnLocalPlayerInput(action)`](../client/events.md#onlocalplayerinputaction) passes the hash of the input action's name.
- The `weapon` argument of the damage and death events ([server](../server/events.md#damage), [client](../client/events.md#onplayerdamageplayer-damager-damage-weapon-position)) is the hash of the weapon's name.
- [`effectInstance:SetParameter`](../client/game-objects.md#effectinstancesetparameterhash-value-discrete) takes the hash of the parameter's name.

**Parameters**

| Name | Type | Description |
|---|---|---|
| text | `string` | The name to hash. |

**Returns**

| Type | Description |
|---|---|
| `integer` | The hash, from `0` to `4294967295` (`0xFFFFFFFF`). |

**Example**

```lua
print(Hash("jump") == InputAction.Jump) -- true
print(Hash("ACT_JUMP") == Action.Jump)  -- true
print(string.format("0x%08X", Hash("ACT_JUMP")))
```

```lua
-- client: block the jump input while a menu is open
local JUMP = Hash("jump")
local menu_open = false

Event.Add("OnLocalPlayerInput", function(action)
	if menu_open and action == JUMP then
		Event.Cancel()
	end
end)

Event.Add("OnKeyDown", function(key)
	if key == Key.F1 then
		menu_open = not menu_open
	end
end)
```