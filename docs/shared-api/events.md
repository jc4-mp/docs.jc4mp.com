# Events

These event APIs allow you to send and receive data between different scripts or resources. Events only work cross-resources within the same context. For example:
 - A client script fires an event. Only other client scripts can listen for this event.
 - A server script fires an event. Only other server scripts can listen for this event.
 - A shared script fires an event. Client, server, or shared scripts can listen for this event.

### Important Note

You may only subscribe **once** per event per file. If you subscribe multiple times, only the first subscription will work properly. For example:

```lua
Event.Add("Render", function() -- Works!
	Render.DrawLine(vec2(200, 200), vec2(200, 1000), 100, vec4(0.0, 1, 0.0, 1.0))  
end)

Event.Add("Render", function() -- Does not work
	Render.DrawLine(vec2(200, 200), vec2(200, 1000), 1000, vec4(1, 1, 0.0, 1.0))  
end)
```

In the above example, only the first `Render` event will work properly and draw a line to the screen. The second render event will not work - a line will not be drawn to the screen because an event with the name `Render` has already been added.

## Global Methods

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
