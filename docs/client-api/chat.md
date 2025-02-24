# Chat

Chat-related APIs.

#### `Chat.Print(text: string)`

Prints a string of text to the chat. The chat message only appears on this client's chat.

Example:
```lua
-- Print a message to this client's chat
Chat.Print("Welcome to the server!")
```

#### `Chat.SetEnabled(enabled: bool)`

Sets whether or not that chat is enabled. If set to false, the chat window will disappear.

Example:
```lua
-- Hide the chat window
Chat.SetEnabled(false)

-- You could toggle chat visibility with a key press
Events.Subscribe("KeyPress", function(key)
    if key == Key.F3 then
        Chat.SetEnabled(not Chat.IsEnabled())
    end
end)
```

#### `Chat.IsEnabled(): bool`

Returns true if the chat is enabled, and false otherwise.

Example:
```lua
-- Check if chat is enabled
if Chat.IsEnabled() then
    print("Chat is currently visible")
else
    print("Chat is currently hidden")
end
```