# Events

These event APIs allow you to send and receive data between different scripts or resources. 

#### `Event.Add(event: string, handler: function, allowRemote?: bool)`

Adds an event handler for the specified event name. `allowRemote` is default false, meaning that it will not handle network events.

For more information on the `allowRemote` argument see:
 - **[Client networking](/client-api/network)**
 - **[Server networking](/server-api/network)**

#### `Event.Trigger(event: string, data: any)`

Triggers a corresponding event in any resource that has a handler `Event.Add` with the same event name.

Example usage:

```lua
-- resources/test/client/main.lua

Cmd.Add("test", function()
    Event.Trigger("testEvent", { data = 2 })
end)
```

A corresponding client script can listen for the event:
```lua
-- resources/other/client/hello.lua

Event.Add("test", function(args)
    print("Received: " .. tostring(args.data))
end)
```

#### `Event.Remove(event: string)`

Removes an event handler for the specified event name in a script.
