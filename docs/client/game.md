---
sidebar_position: 61
---

# Game

The `Game` table reports the state of the game itself (title screen, loading, in game...). Use it to wait until the game has finished loading before doing something that needs the world, or to tell whether the player is in a menu.

**Available on:** Client

## Functions {#functions}

### Game.GetState() {#gamegetstate}

Returns the current state of the game's front end, the state machine that goes from the title screen through loading into the game.

During the join flow the state passes through the loading states (`LoadGlobal`, `WaitingForGlobal`, `LoadSpawn`, `LoadWait`...) before the world is ready. Compare the result with the [`GameState`](./enums/game-state.md) values; a state without a name in that table can also be returned, so handle unknown values.

**Returns** `integer`, one of the [`GameState`](./enums/game-state.md) values.

**Example**

```lua
-- names for printing the state
local names = {}
for name, value in pairs(GameState) do names[value] = name end

local last

Event.Add("OnUpdate", function()
	local state = Game.GetState()

	if state ~= last then
		last = state
		print("game state is now " .. (names[state] or tostring(state)))
	end
end)
```