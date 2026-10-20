---
sidebar_position: 63
---

# Input

The `Input` table reads the keyboard and mouse, turns the player's game controls off and on (for menus), reads and triggers the local player's game actions, and accesses the Windows clipboard.

**Available on:** Client

Keys are identified by the values of the [`Key`](../shared/enums/key.md) table (`Key.F2`, `Key.E`, `Key.MouseLeft`...). For key presses as events instead of polling, see `OnKeyDown`, `OnKeyUp`, `OnMouseDown` and `OnMouseWheel` in the [client events](./events.md).

## How key states work {#how-key-states-work}

- The key state functions report what Windows told the game window. They work whether or not the game controls are enabled with [`Input.SetEnabled`](#inputsetenabledenabled).
- While a webview has the keyboard focus, keys go to the webview and none of these functions see them (see [UI and WebView](./ui.md#input-and-focus)).
- "Pressed" and "released" last for one game tick: they are set when the key goes down or up, and cleared at the end of the game update that follows. Poll them from `OnUpdate`. Holding a key makes Windows repeat the key-down, so `IsKeyPressed` is also `true` again on each repeat.
- Passing a number that is not a key (below 0 or 512 and above) raises a Lua error.
- Mouse buttons work like keys: `Key.MouseLeft`, `Key.MouseRight`, `Key.MouseMid`, `Key.MouseX4` and `Key.MouseX5` have correct down, pressed and released states.
- Shift, Ctrl and Alt can be checked per side (`Key.LeftShift`, `Key.RightCtrl`...) or with the generic code (`Key.Shift`...), which is down while either side is held.

## Functions {#functions}

### Input.SetEnabled(enabled) {#inputsetenabledenabled}

Turns the game's player controls off or on: with them off, the local player's character and vehicle stop responding to the player's controls. Use it while a menu is open. Key state functions and key events keep working.

The setting is **counted**: every `Input.SetEnabled(false)` must be balanced by one `Input.SetEnabled(true)`, and controls only come back once every `false` has been matched. Each resource keeps its own count and can only undo its own `false` calls, so two menus from different resources can both disable input without one re-enabling it under the other. Calling `Input.SetEnabled(true)` more times than `false` has no extra effect.

When a resource stops, every `false` it has not matched yet is undone automatically.

**Parameters**

| Name | Type | Description |
|---|---|---|
| enabled | `boolean` | `false` to take the controls away (adds one to the count), `true` to give them back (removes one). |

**Returns** nothing.

**Example**

```lua
local menu_open = false

local function set_menu_open(open)
	if open == menu_open then return end

	menu_open = open
	Input.SetEnabled(not open)
	UI.SetCursorVisible(open)
end

Event.Add("OnKeyDown", function(key)
	if key == Key.F4 then
		set_menu_open(not menu_open)
	end
end)

-- never leave the player without controls
Event.Add("OnResourceStop", function(name)
	if name == Resource.Name then
		set_menu_open(false)
	end
end)
```

### Input.IsEnabled() {#inputisenabled}

Returns whether the game controls are enabled, that is whether no resource currently holds them disabled with [`Input.SetEnabled(false)`](#inputsetenabledenabled).

**Returns** `boolean`.

**Example**

```lua
Event.Add("OnUpdate", function()
	if not Input.IsEnabled() then
		return -- a menu is open somewhere, ignore hotkeys
	end

	if Input.IsKeyPressed(Key.G) then
		print("G pressed in game")
	end
end)
```

### Input.IsKeyDown(key) {#inputiskeydownkey}

Returns whether `key` is currently held down.

**Parameters**

| Name | Type | Description |
|---|---|---|
| key | [`Key`](../shared/enums/key.md) | The key to check. |

**Returns** `boolean`.

**Example**

```lua
-- show a scoreboard while Tab is held
Event.Add("OnUpdate", function()
	WebView.SetVisible(scoreboard, Input.IsKeyDown(Key.Tab))
end)
```

### Input.IsKeyPressed(key) {#inputiskeypressedkey}

Returns whether `key` went down during the current game tick (see [How key states work](#how-key-states-work)).

**Parameters**

| Name | Type | Description |
|---|---|---|
| key | [`Key`](../shared/enums/key.md) | The key to check. |

**Returns** `boolean`.

**Example**

```lua
Event.Add("OnUpdate", function()
	if Input.IsKeyPressed(Key.F5) then
		Net.Send("RequestRespawn")
	end
end)
```

### Input.IsKeyReleased(key) {#inputiskeyreleasedkey}

Returns whether `key` was let go during the current game tick.

**Parameters**

| Name | Type | Description |
|---|---|---|
| key | [`Key`](../shared/enums/key.md) | The key to check. |

**Returns** `boolean`.

**Example**

```lua
-- push to talk style: start on press, stop on release
Event.Add("OnUpdate", function()
	if Input.IsKeyPressed(Key.V) then print("start") end
	if Input.IsKeyReleased(Key.V) then print("stop") end
end)
```

### Input.GetWheelValue() {#inputgetwheelvalue}

Returns how far the mouse wheel was turned during the current game tick, in wheel notches: `1` for one notch away from the user, `-1` for one notch toward the user, `0` when it did not move. The value is reset at the end of every game tick.

Only the `y` component is used; `x` is always `0`. A horizontal wheel (tilt) is also reported in `y`.

**Returns** `vec2`.

**Example**

```lua
-- zoom a custom map webview with the wheel
local zoom = 1

Event.Add("OnUpdate", function()
	local wheel = Input.GetWheelValue().y

	if wheel ~= 0 then
		zoom = math.max(0.25, math.min(4, zoom + wheel * 0.25))
		WebView.SendMessage(map, "zoom", zoom)
	end
end)
```

### Input.GetValue(action) {#inputgetvalueaction}

Returns the current value of one of the local player's game inputs, as recorded for syncing to other players: `0` when not pressed, up to `1` when fully pressed (analog inputs such as triggers and sticks give values in between). Actions the local player has not used yet return `0`.

Before the local player exists (not joined yet) it returns `0`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| action | [`InputAction`](./enums/action.md#inputaction) | The game input to read. The table currently only names `InputAction.Jump`. |

**Returns** `number`, from 0 to 1.

**Example**

```lua
Event.Add("OnUpdate", function()
	if Input.GetValue(InputAction.Jump) > 0 then
		print("jumping")
	end
end)
```

### Input.GetClipboard() {#inputgetclipboard}

Returns the text currently in the Windows clipboard, as a UTF-8 string. Returns an empty string when the clipboard holds no text or cannot be opened.

**Returns** `string`.

**Example**

```lua
Cmd.Add("paste", function()
	local text = Input.GetClipboard()

	if text ~= "" then
		Net.Send("ChatMessage", text:sub(1, 200))
	end
end)
```

### Input.SetClipboard(text) {#inputsetclipboardtext}

Replaces the content of the Windows clipboard with `text`, a UTF-8 string. It is stored as Unicode text, so accents, emoji and non-Latin scripts paste correctly.

**Parameters**

| Name | Type | Description |
|---|---|---|
| text | `string` | The text to copy. |

**Returns** `boolean`: `true` if the clipboard was set, `false` if it could not be opened (another program holds it) or written.

**Example**

```lua
-- copy the local player's position, e.g. to paste into a config file
Cmd.Add("copypos", function()
	local p = World.LocalPlayer():GetPosition()

	Input.SetClipboard(string.format("%.2f, %.2f, %.2f", p.x, p.y, p.z))
end)
```