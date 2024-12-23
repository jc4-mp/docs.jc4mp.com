# Network

These network APIs allow you to send data to players and receive data from players.

## `triggerClientEvent(player: Player, event: string, data: any)`

Triggers a corresponding client event for a specific player in any resource with the same event name. `data` is not required. Any type of data except functions is valid, including strings, numbers, tables, metatables, etc.

## `triggerClientEvent(event: string, data: any)`

Triggers a corresponding client event for all players.

Example usage:

```lua
-- resources/test/server/main.lua

triggerClientEvent("broadcastEvent", { value = "hello all!"})
```

A corresponding client script in any resource can listen for this event:
```lua
-- resources/test/client/main.lua

addEvent("test", function(args)
    print("Received: " .. tostring(args.theNumber))
end, true) -- <- make sure to set allowRemote to true
```


## `addEvent(event: string, handler: function, allowRemote?: bool)`

Adds an event handler for a specific event with a string name. To listen for events from players, set `allowRemote` to true. `allowRemote` is default false and not not a required argument.

Example (on the server):
```lua
-- resources/test/server/main.lua

addEvent("TestEventFromClient", function(args)
    print("Received: " .. tostring(args.value))
end, true)
```

And the client can send events to trigger the client event:
```lua
-- resources/test/client/main.lua

triggerServerEvent("TestEventFromClient", { value = "hello"})
```