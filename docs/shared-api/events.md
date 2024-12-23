# Events

These event APIs allow you to send and receive data between different scripts or resources. 

## `addEvent(event: string, handler: function, allowRemote?: bool)`

Adds an event handler for the specified event name. `allowRemote` is default false, meaning that it will not handle network events.

For more information on the `allowRemote` argument see:
 - **[Client networking](/docs/client-api/network)**
 - **[Server networking](/docs/server-api/network)**

## `triggerEvent(event: string, data: any)`

Triggers a corresponding event in any resource that has a handler `addEvent` with the same event name.

Example usage:

```lua
-- resources/test/client/main.lua

addCommand("test", function()
    triggerEvent("testEvent", { data = 2 })
end)

```

A corresponding client script can listen for the event:
```lua
-- resources/other/client/hello.lua

addEvent("test", function(args)
    print("Received: " .. tostring(args.data))
end)
```