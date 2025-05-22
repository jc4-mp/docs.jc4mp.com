# Network

These network APIs allow you to send data to players and receive data from players.

## Global Methods

#### `Net.Send(player: Player, event: string, data: any)`

Triggers a corresponding client event for a specific player in any resource with the same event name. `data` is not required. Any type of data except functions is valid, including strings, numbers, tables, metatables, etc.

#### `Net.Send(players: Player[], event: string, data: any)`

Triggers a corresponding client event for a table of players.

#### `Net.Send(event: string, data: any)`

Triggers a corresponding client event for all players.

Example usage:

```lua
-- resources/test/server/main.lua

Net.Send("BroadcastEvent", { value = "hello all!"})
```

A corresponding client script in any resource can listen for this event:
```lua
-- resources/test/client/main.lua

Net.AddEvent("BroadcastEvent", function(args)
    print("Received: " .. tostring(args.value))
end)
```


#### `Net.AddEvent(event: string, handler: function)`

Adds an event handler for a specific network event with a string name.

Example (on the server):
```lua
-- resources/test/server/main.lua

Net.AddEvent("TestEventFromClient", function(args)
    print("Received: " .. tostring(args.value))
end)
```

And the client can send events to trigger the client event:
```lua
-- resources/test/client/main.lua

Net.Send("TestEventFromClient", { value = "hello"})
```

**Another example**: To get the player who sent the event, you can send the local player in the arguments:

```lua
-- resources/test/client/main.lua

-- Send the local PlayerClient to the server
Net.Send("PrintMySkin", Players.Local())
```

```lua
-- resources/test/server/main.lua

-- Receive the PlayerClient, get NetPlayer from it, and print their skin
Net.AddEvent("PrintMySkin", function(playerClient)
    local player = playerClient:GetNetPlayer()
    print("Player skin: " .. tostring(player:GetSkin()))
end)
```

#### `Net.RemoveEvent(event: string)`

Removes a network event handler.
