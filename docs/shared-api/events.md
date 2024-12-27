# Events

These event APIs allow you to send and receive data between different scripts or resources. Events only work cross-resources within the same context. For example:
 - A client script fires an event. Only other client scripts can listen for this event.
 - A server script fires an event. Only other server scripts can listen for this event.
 - A shared script fires an event. Client, server, or shared scripts can listen for this event.

#### `Event.Add(event: string, handler: function)`

Adds an event handler for the specified event name.

#### `Event.Fire(event: string, data: any)`

Triggers a corresponding event in any resource that has a handler `Event.Add` with the same event name.

Example usage:

```lua
-- resources/test/client/main.lua

Cmd.Add("test", function()
    Event.Fire("testEvent", { data = 2 })
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
