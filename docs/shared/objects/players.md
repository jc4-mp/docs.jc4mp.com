---
sidebar_position: 15
---

# Players

The player functions of the [World](../world.md) table that exist on both sides: all players and a random player. For what you can do with the handles these functions return, see [Player](./player.md), which also explains the difference between a `PlayerHandle` (the connection) and a `PlayerObjectHandle` (the character).

**Available on:** Server, Client

See also: [Players (client)](../../client/objects/players.md)

## Functions {#functions}

### World.GetPlayers() {#worldgetplayers}

Returns a list of the `PlayerHandle`s of every player who has joined the server. Players who are still connecting (authenticating or downloading resources) are not included.

The result is a plain Lua array, so use `ipairs` and `#` on it. It is a snapshot: players who join or leave afterwards don't change it.

#### Server {#server}

Every joined player is in the list.

#### Client {#client}

Every joined player is in the list too, including the local player and players who are far away. Being in the list doesn't mean the player's character is streamed in: `client:GetPlayer()` returns `nil` for players too far from the local player.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `table` | an array of `PlayerHandle` |

**Example**

```lua
-- server: print the player list
local players = World.GetPlayers()

print(#players .. " players online")

for i, client in ipairs(players) do
	print(i, client:GetName(), client:GetUserId())
end
```

### World.GetRandomClient() {#worldgetrandomclient}

Returns the `PlayerHandle` of a random player, or `nil` if there is none.

#### Server {#server-1}

The player is picked among every connected player, which can include a player who hasn't finished joining yet. Methods that need a joined player (see [Player](./player.md)) treat such a player as invalid, so check `client:GetPlayer()` if you need a player who is in the game.

#### Client {#client-1}

The player is picked among every player this client knows about, the local player included.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `PlayerHandle` or `nil` | a random player |

**Example**

```lua
-- server: pick a random player as the first target
local client = World.GetRandomClient()

if client and client:GetPlayer() then
	Chat.Broadcast(client:GetName() .. " is the target!")
end
```

### World.GetRandomPlayer() {#worldgetrandomplayer}

Returns the character of a random player as a plain [ObjectHandle](./object-handle.md), or `nil` if there is none. Call `:AsPlayer()` on it to use the [PlayerObjectHandle](./player.md) methods.

#### Server {#server-2}

The player is picked among every connected player; if the picked one hasn't joined yet (it has no character), the result is `nil` even if other players are in the game.

#### Client {#client-2}

The player is picked among the players whose character is streamed in on this client (the local player and nearby players).

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `ObjectHandle` or `nil` | a random player's character |

**Example**

```lua
-- server: a random player becomes the "it" of a game of tag
local obj = World.GetRandomPlayer()

if obj then
	local player = obj:AsPlayer()

	player:SetData("tag.it", true, true)
	Chat.Broadcast(player:GetClient():GetName() .. " is it!")
end
```