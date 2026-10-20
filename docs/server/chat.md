---
sidebar_position: 39
---

# Chat

The `Chat` table sends server messages to every player's chat. The chat window itself is not built into the game: it is a resource (the bundled `chat` resource, or your own). Chat resources show messages when they receive the `OnChat` event on the client, and send the players' own messages to the server with [Net](../shared/net.md) events.

**Available on:** Server

## How chat messages flow {#how-chat-messages-flow}

1. A player types a message in a chat resource's window. The chat's client script sends it to the server with `Net.Send`, and the chat's server script decides what to do with it (filter it, add the player's name, handle `/commands`...).
2. The server script calls `Chat.Broadcast` with the final text.
3. Every joined player's client fires the client event `OnChat(sender, text)` with `sender` set to `nil` (the server sent it), and the chat resources display the text.

The client's `OnChat` has a `PlayerHandle` sender only for the game's built-in chat message, which no release-build script API sends: the server then fires its own cancellable `OnChat(player, text)` first and, unless a handler cancels it, relays `"<name>: <text>"` to everyone with that player as the sender. See [client events](../client/events.md) and [server events](./events.md) for `OnChat`.

## Functions {#functions}

### Chat.Broadcast(text) {#chatbroadcasttext}

Sends `text` to every joined player. On each client it fires `OnChat` with a `nil` sender and the text. It does not fire the server's own `OnChat` event, and it is not written to the server console.

Messages longer than 1023 bytes are cut at 1023 bytes, which can split a multi-byte UTF-8 character at the end. Players still connecting don't receive it.

The text is shown however the chat resource displays it; the bundled chat shows it as plain text.

**Parameters**

| Name | Type | Description |
|---|---|---|
| text | string | the message |

**Returns** nothing

**Example**

```lua
-- server: a chat relay with a name prefix and a length limit
Net.AddEvent("mychat:say", function(text)
	local client = Net.Sender()

	if not client or type(text) ~= "string" or not text:find("%S") then
		return
	end

	Chat.Broadcast(client:GetName() .. ": " .. text:sub(1, 200))
end)

Event.Add("OnPlayerJoin", function(client)
	Chat.Broadcast(client:GetName() .. " joined the server")
end)
```

```lua
-- client: show chat messages (a minimal chat display)
Event.Add("OnChat", function(sender, text)
	if sender then
		print("[" .. sender:GetName() .. "] " .. text)
	else
		print("[server] " .. text)
	end
end)
```

To send a message to a single player, send your own event with [Net.SendToPlayer](./net.md#netsendtoplayerplayer-name-) and have your chat script display it.