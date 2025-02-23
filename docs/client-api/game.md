# Game

#### `Game.SetFOV(value: number)`

Sets the FOV of the game. The default value is 1.

Example usage:

```lua
Game.SetFOV(1.5)
```

#### `Game.GetFOV(): number`

Gets the current FOV of the game.

Example usage:

```lua
print(Game.GetFOV())
```

#### `Game.GetState(): GameState`

Gets the current state of the game. See [GameState](/client-api/gamestate) for a list of all possible game states.

Example usage:

```lua
print(Game.GetState() == GameState.MainMenu) -- Prints true or false
```
