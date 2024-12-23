# Network

These network APIs allow you to send data to the server and receive data from the server.

## `triggerServerEvent(event: string, data: any)`

Triggers a corresponding server event in any resource with the same event name. `data` is not required. Any type of data except functions is valid, including strings, numbers, tables, metatables, etc.

Example usage:

```lua
-- resources/test/client/main.lua

addCommand("test", function()
    triggerServerEvent("testServerEvent", { theNumber = 42})
end)

```

A corresponding server script in any resource can listen for this event:
```lua
-- resources/test/server/main.lua

addEvent("test", function(args)
    print("Received: " .. tostring(args.theNumber))
end, true) -- <- make sure to set allowRemote to true
```


## `addEvent(event: string, handler: function, allowRemote?: bool)`

Adds an event handler for a specific event with a string name. To listen for events from the server, set `allowRemote` to true. `allowRemote` is default false and not not a required argument.

Example (on the client):
```lua
-- resources/test/client/main.lua

addEvent("TestEventFromServer", function(args)
    print("Received: " .. tostring(args.value))
end, true)
```

And the server can send events to trigger the client event:
```lua
-- resources/test/server/main.lua

triggerClientEvent("testServerEvent", { value = "hello"})
```
