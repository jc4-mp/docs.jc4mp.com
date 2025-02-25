# Input

Input-related APIs.

## Events

#### `KeyDown: (key: number)`

The `KeyDown` event fires every time a key on the keyboard is pressed. The first argument is the numerical value of the key that was pressed. To get a list of non-numerical key values (such as the delete key), see [Key](/client-api/key).

Example that teleports the local player to their aim position when they press F:

```lua
Event.Add("KeyDown", function(key)
    if key == Key.F then
        local localPlayer = Players.Local():GetGamePlayer()
        local char = localPlayer:GetCharacter()
        local aimPos = localPlayer:GetAimPosition()
        char:SetPosition(aimPos)
    end
end)
```

#### `KeyUp: (key: number)`

The `KeyUp` event fires every time a key on the keyboard is pressed. The first argument is the numerical value of the key that was pressed. To get a list of non-numerical key values (such as the delete key), see [Key](/client-api/key).

Example that teleports the local player to their aim position when they press F:

```lua
Event.Add("KeyUp", function(key)
    if key == Key.F then
        local localPlayer = Players.Local():GetGamePlayer()
        local char = localPlayer:GetCharacter()
        local aimPos = localPlayer:GetAimPosition()
        char:SetPosition(aimPos)
    end
end)
```

#### `MouseDown`

The `MouseDown` event fires every time a button on the mouse is pressed down. Use `Key.MouseLeft` for left clicks, `Key.MouseRight` for right clicks, and `Key.MouseMid` for middle clicks.

Example that teleports the local player to their aim position when they left clicking:

```lua
Event.Add("MouseDown", function(key)
    if key == Key.MouseLeft then
        local localPlayer = Players.Local():GetGamePlayer()
        local char = localPlayer:GetCharacter()
        local aimPos = localPlayer:GetAimPosition()
        char:SetPosition(aimPos)
    end
end)
```

#### `LocalPlayerInput: (action: Action)`

The `LocalPlayerInput` event fires every time an input action occurs for the local player. The first argument is the numerical value of the [Action](/client-api/action). To get a list of actions (such as the jump action), see [Action](/client-api/action). Actions are not guarantees that something actually happened - for example, pressing spacebar to jump while already jumping will trigger `Action.Jump`, but it will not jump again.

Example that prints a message to chat when the jump action occurs:

```lua
Event.Add("LocalPlayerInput", function(action)
    if action == Action.Jump then
        Chat.Print("Local player jumped!")
    end
end)
```

## Methods

#### `Input.SetEnabled(enabled: boolean)`

Enables or disables player input. If disabled, all player input will be disabled - the player will not be able to move their character or camera. This is the same functionality that happens when you press T to open the chat window.

This is ref counted, meaning that for each time you disable input, you must enable input to restore player input. For example:

```lua
Input.SetEnabled(false)
Input.SetEnabled(false)
-- Requires 2 enables to fully enable input again
Input.SetEnabled(true)
Input.SetEnabled(true)
```

#### `Input.IsEnabled(): boolean`

Returns true if input is enabled, false otherwise.


#### `Input.IsKeyPressed(key: number): boolean`

Returns true if the key is currently being pressed, false otherwise. Refer to [Key](/client-api/key) for a list of keys to use.


#### `Input.IsKeyDown(key: number): boolean`

Returns true if the key is currently down, false otherwise. Refer to [Key](/client-api/key) for a list of keys to use.


#### `Input.IsKeyReleased(key: number): boolean`

Returns true if the key is released, false otherwise. Refer to [Key](/client-api/key) for a list of keys to use.


#### `Input.GetValue(action: Action): number`

Returns greater than 0 if the action is currently active, 0 otherwise. Refer to [Action](/client-api/action) for a list of actions to use.

