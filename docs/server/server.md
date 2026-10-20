---
sidebar_position: 38
---

# Server

The `Server` table holds information about the running server itself.

**Available on:** Server

## Values {#values}

### Server.Version {#serverversion}

The JC4MP version of the server as a string, e.g. `"1.2.0"`. Development builds report `"0.0.0"`. Players can only join a server whose version matches their client (the launcher downloads the matching client), so this is also the clients' version.

**Type** `string`

**Example**

```lua
Event.Add("OnPlayerJoin", function(client)
	Net.SendToPlayer(client, "about:info", "Running JC4MP " .. Server.Version)
end)
```

## Functions {#functions}

### Server.GetElapsedSeconds() {#servergetelapsedseconds}

The time since the server process started, in seconds, with a fractional part. It uses a steady clock, so it never jumps when the system clock changes, which makes it the right tool to measure durations, uptime and cooldowns.

The value is a 32-bit float: after several days of uptime its precision drops to a few milliseconds, which is still fine for cooldowns and uptime displays.

**Parameters** none

**Returns** `number`, seconds since the server started.

**Example**

```lua
-- uptime in the chat every hour
Timer.Set(function()
	local total = math.floor(Server.GetElapsedSeconds())
	local hours = math.floor(total / 3600)
	local minutes = math.floor(total % 3600 / 60)

	Chat.Broadcast(string.format("Server uptime: %dh %02dm", hours, minutes))
end, 60 * 60 * 1000, 0)
```

```lua
-- a 30 second cooldown per player
local last_use = {}

Net.AddEvent("ability:use", function()
	local client = Net.Sender()

	if not client then
		return
	end

	local id = client:GetUserId()
	local now = Server.GetElapsedSeconds()

	if last_use[id] and now - last_use[id] < 30 then
		return
	end

	last_use[id] = now

	print(client:GetName() .. " used the ability")
end)
```