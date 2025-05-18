# Players

These APIs allow you to interface with Players in the game.

## Global Methods

#### `Players.GetJoined(): PlayerClient[]`

Returns an array of all [players](/shared-api/playerclient) that are currently connected to the server.

#### `Players.GetRandom(): PlayerClient`

Returns a random [player](/shared-api/playerclient) that is currently connected to the server.

#### `Players.GetCount(): number`

Returns the number of players that are currently connected to the server.