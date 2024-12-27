# Network

These network APIs allow you to send data to the server and receive data from the server.

#### `Net.Send(event: string, data: any)`

Triggers a corresponding server event in any resource with the same event name. `data` is not required. Any type of data except functions is valid, including strings, numbers, tables, metatables, etc.

Example usage:

```lua
-- resources/test/client/main.lua

Cmd.Add("test", function()
    Net.Send("testServerEvent", { theNumber = 42})
end)

```

A corresponding server script in any resource can listen for this event:
```lua
-- resources/test/server/main.lua

Net.AddEvent("test", function(args)
    print("Received: " .. tostring(args.theNumber))
end)
```


#### `Net.AddEvent(event: string, handler: function)`

Adds an event handler for a specific network event with a string name.

Example (on the client):
```lua
-- resources/test/client/main.lua

Net.AddEvent("TestEventFromServer", function(args)
    print("Received: " .. tostring(args.value))
end)
```

And the server can send events to trigger the client event:
```lua
-- resources/test/server/main.lua

Net.Send("testServerEvent", { value = "hello"})
```


#### `Net.RemoveEvent(event: string)`

Removes a network event handler.
