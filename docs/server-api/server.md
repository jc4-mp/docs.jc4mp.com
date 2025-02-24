# Server

Server-related APIs.

#### `Server.Version`

Returns the current JC4MP server version (eg. 1.0.0) as a string.

Example:
```lua
-- Get the current server version
print("JC4MP Server Version: " .. Server.Version)
```

#### `Server.GetElapsedSeconds(): number`

Returns the number of seconds that have passed since the start started.

Example:
```lua
-- Get elapsed time since server start
local uptime = Server.GetElapsedSeconds()
print("Server has been running for " .. uptime .. " seconds")

-- You could use this for periodic server announcements
local last_announcement = 0
Events.Subscribe("PreTick", function()
    local uptime = math.floor(Server.GetElapsedSeconds())
    if uptime - last_announcement >= 300 then -- Every 5 minutes
        Chat.Broadcast("Server has been running for " .. uptime .. " seconds")
        last_announcement = uptime
    end
end)
```