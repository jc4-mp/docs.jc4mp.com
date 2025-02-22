# Players

These APIs allow you to interface with Players in the game.

#### `Players.Respawn(player: Player, health?: number, max_health?: number)`

Respawns a Player. The `health` and `max_health` arguments are optional - specify them to set the current health and maximum health of the respawned player.

#### `Players.GetCount(): number`

Returns the number of players that are currently connected to the server.