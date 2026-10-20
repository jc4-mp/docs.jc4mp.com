---
sidebar_position: 83
---

# GameState

`GameState` holds the states of the game's startup and front-end flow, from launching to playing in the world. Use it to tell whether the world is loaded.

**Available on:** Client

## Values {#values}

### GameState {#gamestate}

Used by [`Game.GetState()`](../game.md) (client): returns the current state.

Client scripts only start once the player has joined the server, and the join waits until the game reaches `GameState.InGame`, which is the state the game is in while the world is loaded and the player plays. So in practice `Game.GetState()` returns `GameState.InGame` while your scripts run; the other states are passed through during startup and loading.

| Name | Value | Meaning |
|---|---|---|
| `GameState.Entry` | 0 | The game has just started. |
| `GameState.AwaitUnload` | 1 | Waiting for data to unload. |
| `GameState.StreamingInstall` | 2 | Streaming install in progress. |
| `GameState.Logout` | 3 | Logging out of the platform account. |
| `GameState.Title` | 4 | The title screen. |
| `GameState.Login` | 5 | Logging in to the platform account. |
| `GameState.EnumerateDLC` | 6 | Checking which DLCs are installed. |
| `GameState.LoadGlobal` | 7 | Loading the game's global data. |
| `GameState.WaitingForSave` | 8 | Waiting for the save data. |
| `GameState.GDPR` | 9 | The data privacy (GDPR) consent step. |
| `GameState.WaitingForGlobal` | 10 | Waiting for the global data to finish loading. While the client downloads the server's resources, the game stays here. |
| `GameState.LoadSpawn` | 11 | Loading the area the player spawns in. |
| `GameState.LoadWait` | 12 | Waiting for the world to finish loading. |
| `GameState.NewGamePlus` | 13 | Starting a New Game+. |
| `GameState.FadeOutTitle` | 14 | Fading out of the title screen. |
| `GameState.FadeToMain` | 15 | Fading into the game. |
| `GameState.InGame` | 16 | In the game: the world is loaded and the player is playing. |
| `GameState.Quit` | 17 | The game is quitting. |

**Example**

```lua
-- client: only do world work once the game is in its playing state
Cmd.Add("state", function()
	if Game.GetState() == GameState.InGame then
		print("in game")
	else
		print("still loading, state " .. Game.GetState())
	end
end)
```