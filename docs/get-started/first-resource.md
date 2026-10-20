---
sidebar_position: 7
sidebar_label: "Your First Resource"
---

# Getting started

This guide takes you from an empty folder to a working resource with a server half and a client half that talk to each other over the network. It assumes you know Lua and have a JC4MP server you can start and join. Everything it uses is explained in depth on the pages it links to.

**Available on:** Server, Client

## 1. What you are building {#1-what-you-are-building}

A resource is a folder of scripts the server runs and sends to the players (see [Resources](../shared/resources.md)). We will build a resource called `hello` that:

- greets every player in the chat when they join,
- lets a player press **H** to ask the server how far they are from a meeting point,
- has the server answer that player only,
- adds a `/where` command that does the same thing from the chat.

## 2. Create the folder {#2-create-the-folder}

Resources live in the `resources` folder next to the server. Create this layout (the folder name is the resource name):

```
resources/
	hello/
		shared/
			config.lua
		server/
			main.lua
		client/
			main.lua
```

- `server/` runs only on the server and is never sent to players.
- `client/` is downloaded by every player and runs in their game.
- `shared/` is downloaded too and runs on both sides.

There is no manifest file. Every `.lua` file is a separate script with its own globals, so use `local` and share code with `require`.

## 3. Shared settings {#3-shared-settings}

`shared/config.lua` is a module: it returns a table that both sides load with `require`. Module names are paths from the `resources` folder with dots, so this file is `hello.shared.config`.

```lua
-- resources/hello/shared/config.lua
return {
	meeting_point = vec3(10030, 616, 3904),
	greeting = "Welcome to the server",
	cooldown = 2, -- seconds between two H presses
}
```

Note that the file also runs once on its own when the resource starts (every `.lua` file does); that is harmless because it only returns a table.

## 4. The server script {#4-the-server-script}

```lua
-- resources/hello/server/main.lua
local config = require("hello.shared.config")

local last_request = {}

Event.Add("OnResourceStart", function(name)
	-- this event fires for every resource that starts, check that it's ours
	if name == Resource.Name then
		print("hello is running, meeting point at " .. tostring(config.meeting_point))
	end
end)

Event.Add("OnPlayerJoin", function(client)
	Chat.Broadcast(config.greeting .. ", " .. client:GetName() .. "!")
end)

-- a client asks how far it is from the meeting point, saying how it asked ("key" or "command")
Net.AddEvent("hello:where", function(source)
	local client = Net.Sender()

	-- never trust what a client sends
	if not client or (source ~= "key" and source ~= "command") then
		return
	end

	local id = client:GetUserId()
	local now = Server.GetElapsedSeconds()

	if last_request[id] and now - last_request[id] < config.cooldown then
		return
	end

	last_request[id] = now

	-- the server knows where every player is, no need to ask the client
	local player = client:GetPlayer()

	if not player then
		return
	end

	local distance = player:GetPosition():distance(config.meeting_point)

	print(client:GetName() .. " asked with " .. source)

	Net.SendToPlayer(client, "hello:distance", math.floor(distance))
end)

-- every 5 minutes, remind everyone where to meet
Timer.Set(function()
	Net.Broadcast("hello:reminder", config.meeting_point)
end, 5 * 60 * 1000, 0)
```

What it uses:

- [Event.Add](../shared/events.md) for local events like `OnResourceStart` and [`OnPlayerJoin`](../server/events.md).
- [Chat.Broadcast](../server/chat.md) to write in everyone's chat.
- [Net.AddEvent](../shared/net.md#netaddeventname-handler) to receive an event from clients, and [Net.Sender](../server/net.md#netsender) to know who sent it.
- [Net.SendToPlayer](../server/net.md#netsendtoplayerplayer-name-) and [Net.Broadcast](../server/net.md#netbroadcastname-) to answer.
- [Timer.Set](../shared/timer.md) for the periodic reminder, and [Server.GetElapsedSeconds](../server/server.md) for the cooldown.
- `client` is a [PlayerHandle](../shared/objects/player.md) (the connection), `client:GetPlayer()` is the player's character in the world.

## 5. The client script {#5-the-client-script}

```lua
-- resources/hello/client/main.lua
local config = require("hello.shared.config")

local function ask_distance(source)
	Net.Send("hello:where", source)
end

Net.AddEvent("hello:distance", function(meters)
	print("You are " .. meters .. " m from the meeting point")
end)

Net.AddEvent("hello:reminder", function(position)
	print("Meet everyone at " .. tostring(position))
end)

-- H asks the server
Event.Add("OnKeyDown", function(key)
	if key == Key.H then
		ask_distance("key")
	end
end)

-- /where in the chat does the same
Cmd.Add("where", function()
	ask_distance("command")
end)

-- client scripts start just before the player joins: say hello once we're in
local function on_ready()
	print("hello client ready, meeting point at " .. tostring(config.meeting_point))
end

Event.Add("OnClientJoin", on_ready)

-- the resource was (re)started while we were already playing
if World.LocalPlayer() then
	on_ready()
end
```

What it uses:

- [Net.Send](../client/net.md#netsendname-) to send an event with a string argument to the server (see [what can be sent](../shared/net.md#values-you-can-send)); the server's `hello:reminder` event sends a `vec3` the other way.
- [Net.AddEvent](../shared/net.md#netaddeventname-handler) to receive the server's answers.
- The [`OnKeyDown`](../client/events.md) event and the `Key` enum ([Enums](../shared/enums/README.md)).
- [Cmd.Add](../client/commands.md) for the `/where` command. The bundled chat resources turn `/where` into `Cmd.Execute("where")`.
- [World.LocalPlayer](../client/objects/players.md) for the local player's character.
- `print` writes to the client's console and log (enable the client console in the launcher to see it). It writes numbers the way `tostring` does (see [Sandbox](../shared/sandbox.md#print)).

## 6. Start it {#6-start-it}

Start the server, then type in its console:

```
start hello
```

The console shows `[hello] | hello is running, ...`. Players who are connected download the client files and start the client half right away. To start it automatically with the server, add it to `startup_resources` in `cfg/config.json`:

```json
{
	"startup_resources": [
		"chat",
		"hello"
	]
}
```

Join the server, press **H**, or type `/where` in the chat (with a chat resource running), and the answer appears in the client console.

## 7. Change and reload {#7-change-and-reload}

Edit any file, then type `restart hello` in the server console. The server reloads its scripts, and every player downloads the changed files and restarts the client half. There is no need to restart the server or reconnect.

When something goes wrong:

- Server errors appear in the server console, and both server and client errors appear in the in-game script debugger (`/dbg` in the bundled chats toggles it, see [Commands](../client/commands.md)).
- An error at the top level of a file cancels the start of the whole resource; fix it and `start` again.
- `list` in the server console shows which resources are running.

## 8. Things to remember {#8-things-to-remember}

- Check the arguments of every `Net.AddEvent` handler on the server: players can send anything.
- Never put secrets in `client/` or `shared/`, players can read those files (see [Script protection](../shared/resources.md#script-protection)).
- Objects your resource spawns on the server, its timers, events and commands are cleaned up automatically when it stops.
- Event names are global across resources: prefix them (`hello:where`).
- Answers sent to a player before they finished joining are dropped, which is why the client waits for `OnClientJoin` before talking to the server (see [Net.Send](../client/net.md#netsendname-)).

## Where to go next {#where-to-go-next}

- [Resources](../shared/resources.md): layout, lifecycle, `require`, starting and stopping from scripts.
- [Net](../shared/net.md) and [Events](../shared/events.md): everything about events.
- [World](../shared/world.md): spawning vehicles, NPCs and objects; [ObjectHandle](../shared/objects/object-handle.md) and [players](../shared/objects/player.md).
- [SQL](../server/sql.md) to save data, [JSON](../shared/json.md), [HTTP](../server/http.md), [Timer](../shared/timer.md), [Math](../shared/math.md).
- Client side: [Local player](../client/local.md), [UI](../client/ui.md) and [webviews](../client/webview.md) for menus and HUDs.
- [Sandbox](../shared/sandbox.md): which Lua libraries are available on each side.