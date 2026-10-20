---
sidebar_position: 24
---

# Key

`Key` holds the codes of keyboard keys and mouse buttons. Use them with the client's input functions and key events to react to what the local player presses, for example to open a menu with F1.

**Available on:** Server, Client (the table exists on both sides, but only the client has functions and events that use it)

## Values {#values}

### Key {#key}

Every value is a Windows virtual key code (an integer). You are not limited to the names below: any integer from 0 to 511 is accepted where a key is expected, so keys without a name in this table can be used by their Windows virtual key code.

Used by:

- [`Input.IsKeyDown(key)`, `Input.IsKeyPressed(key)`, `Input.IsKeyReleased(key)`](../../client/input.md) (client). A value outside 0..511 raises the Lua error `invalid key <n>`.
- The client events [`OnKeyDown(key)`, `OnKeyUp(key)` and `OnMouseDown(key)`](../../client/events.md), whose `key` argument is one of these codes.

What gets reported, and what doesn't:

- Keys are reported as the game window receives them. While a webview has input focus, it gets the keys first and the ones it consumes never reach scripts.
- Holding a key down repeats `OnKeyDown` at the keyboard's repeat rate. Keep your own "is down" state if an action must happen only once per press.
- Shift, Ctrl and Alt are reported twice: with their side-specific code (`LeftShift`, `RightShift`, `LeftCtrl`, `RightCtrl`, `LeftAlt`, `RightAlt`) and with their generic code (`Key.Shift`, `Key.Control`, `Key.Alt`). The generic code stays down while either side is held, so `OnKeyUp(Key.Shift)` only fires once both Shift keys are released. The Windows keys (`LeftSuper`, `RightSuper`) are reported with their own codes.
- All five mouse buttons (`MouseLeft`, `MouseRight`, `MouseMid`, `MouseX4`, `MouseX5`) are reported like keys: pressing one fires `OnMouseDown` and `OnKeyDown` with its code, releasing it fires `OnKeyUp` with its code, and `Input.IsKeyDown` / `IsKeyPressed` / `IsKeyReleased` work for them. A double click is reported as two presses.

| Name | Value | Key |
|---|---|---|
| `Key.MouseLeft` | `0x01` (1) | Left mouse button. |
| `Key.MouseRight` | `0x02` (2) | Right mouse button. |
| `Key.MouseMid` | `0x04` (4) | Middle mouse button (wheel click). |
| `Key.MouseX4` | `0x05` (5) | Mouse side button 1 (back). |
| `Key.MouseX5` | `0x06` (6) | Mouse side button 2 (forward). |
| `Key.Backspace` | `0x08` (8) | Backspace. |
| `Key.Space` | `0x20` (32) | Space bar. |
| `Key.Comma` | `0xBC` (188) | Comma (`,`). |
| `Key.Minus` | `0xBD` (189) | Minus (`-`). |
| `Key.Period` | `0xBE` (190) | Period (`.`). |
| `Key.Slash` | `0xBF` (191) | Slash (`/`) on a US layout; the key in that position on other layouts. |
| `Key.Semicolon` | `0xBA` (186) | Semicolon (`;`) on a US layout; the key in that position on other layouts. |
| `Key.Equals` | `0xBB` (187) | Equals/plus (`=`) on a US layout; the key in that position on other layouts. |
| `Key.Grave` | `0xC0` (192) | Grave/tilde (`` ` ``) on a US layout; the key in that position on other layouts. |
| `Key.LeftBracket` | `0xDB` (219) | Left bracket (`[`) on a US layout; the key in that position on other layouts. |
| `Key.Backslash` | `0xDC` (220) | Backslash (`\`) on a US layout; the key in that position on other layouts. |
| `Key.RightBracket` | `0xDD` (221) | Right bracket (`]`) on a US layout; the key in that position on other layouts. |
| `Key.Quote` | `0xDE` (222) | Quote (`'`) on a US layout; the key in that position on other layouts. |
| `Key.Digit0` | `0x30` (48) | Number row 0 (not the numpad, see `Num0`). |
| `Key.Digit1` | `0x31` (49) | Number row 1 (not the numpad, see `Num1`). |
| `Key.Digit2` | `0x32` (50) | Number row 2 (not the numpad, see `Num2`). |
| `Key.Digit3` | `0x33` (51) | Number row 3 (not the numpad, see `Num3`). |
| `Key.Digit4` | `0x34` (52) | Number row 4 (not the numpad, see `Num4`). |
| `Key.Digit5` | `0x35` (53) | Number row 5 (not the numpad, see `Num5`). |
| `Key.Digit6` | `0x36` (54) | Number row 6 (not the numpad, see `Num6`). |
| `Key.Digit7` | `0x37` (55) | Number row 7 (not the numpad, see `Num7`). |
| `Key.Digit8` | `0x38` (56) | Number row 8 (not the numpad, see `Num8`). |
| `Key.Digit9` | `0x39` (57) | Number row 9 (not the numpad, see `Num9`). |
| `Key.Num0` | `0x60` (96) | Numpad 0. |
| `Key.Num1` | `0x61` (97) | Numpad 1. |
| `Key.Num2` | `0x62` (98) | Numpad 2. |
| `Key.Num3` | `0x63` (99) | Numpad 3. |
| `Key.Num4` | `0x64` (100) | Numpad 4. |
| `Key.Num5` | `0x65` (101) | Numpad 5. |
| `Key.Num6` | `0x66` (102) | Numpad 6. |
| `Key.Num7` | `0x67` (103) | Numpad 7. |
| `Key.Num8` | `0x68` (104) | Numpad 8. |
| `Key.Num9` | `0x69` (105) | Numpad 9. |
| `Key.NumAdd` | `0x6B` (107) | Numpad `+`. |
| `Key.NumDec` | `0x6E` (110) | Numpad `.` (decimal). |
| `Key.NumDivide` | `0x6F` (111) | Numpad `/`. |
| `Key.NumMultiply` | `0x6A` (106) | Numpad `*`. |
| `Key.NumSub` | `0x6D` (109) | Numpad `-`. |
| `Key.Capslock` | `0x14` (20) | Caps Lock. |
| `Key.Delete` | `0x2E` (46) | Delete. |
| `Key.Down` | `0x28` (40) | Down arrow. |
| `Key.End` | `0x23` (35) | End. |
| `Key.Enter` | `0x0D` (13) | Enter (both the main and the numpad Enter). |
| `Key.Escape` | `0x1B` (27) | Escape. |
| `Key.F1` | `0x70` (112) | Function key F1. |
| `Key.F2` | `0x71` (113) | Function key F2. |
| `Key.F3` | `0x72` (114) | Function key F3. |
| `Key.F4` | `0x73` (115) | Function key F4. |
| `Key.F5` | `0x74` (116) | Function key F5. |
| `Key.F6` | `0x75` (117) | Function key F6. |
| `Key.F7` | `0x76` (118) | Function key F7. |
| `Key.F8` | `0x77` (119) | Function key F8. |
| `Key.F9` | `0x78` (120) | Function key F9. |
| `Key.F10` | `0x79` (121) | Function key F10. |
| `Key.F11` | `0x7A` (122) | Function key F11. |
| `Key.F12` | `0x7B` (123) | Function key F12. |
| `Key.Home` | `0x24` (36) | Home. |
| `Key.Insert` | `0x2D` (45) | Insert. |
| `Key.Left` | `0x25` (37) | Left arrow. |
| `Key.Alt` | `0x12` (18) | Alt (either side). Same value as `Key.Menu`. |
| `Key.Shift` | `0x10` (16) | Shift (either side). |
| `Key.Control` | `0x11` (17) | Ctrl (either side). |
| `Key.LeftAlt` | `0xA4` (164) | Left Alt only. |
| `Key.LeftCtrl` | `0xA2` (162) | Left Ctrl only. |
| `Key.LeftShift` | `0xA0` (160) | Left Shift only. |
| `Key.LeftSuper` | `0x5B` (91) | Left Windows key. |
| `Key.Menu` | `0x12` (18) | Alt (either side). Same value as `Key.Alt`, it is not the context menu key. |
| `Key.NumLock` | `0x90` (144) | Num Lock. |
| `Key.PageDown` | `0x22` (34) | Page Down. |
| `Key.PageUp` | `0x21` (33) | Page Up. |
| `Key.Pause` | `0x13` (19) | Pause/Break. |
| `Key.PrintScrn` | `0x2C` (44) | Print Screen. Windows only reports its release, so it fires `OnKeyUp` but not `OnKeyDown`. |
| `Key.Right` | `0x27` (39) | Right arrow. |
| `Key.RightAlt` | `0xA5` (165) | Right Alt only. |
| `Key.RightCtrl` | `0xA3` (163) | Right Ctrl only. |
| `Key.RightShift` | `0xA1` (161) | Right Shift only. |
| `Key.RightSuper` | `0x5C` (92) | Right Windows key. |
| `Key.ScrollLock` | `0x91` (145) | Scroll Lock. |
| `Key.Tab` | `0x09` (9) | Tab. |
| `Key.Up` | `0x26` (38) | Up arrow. |
| `Key.A` | `0x41` (65) | Letter A. |
| `Key.B` | `0x42` (66) | Letter B. |
| `Key.C` | `0x43` (67) | Letter C. |
| `Key.D` | `0x44` (68) | Letter D. |
| `Key.E` | `0x45` (69) | Letter E. |
| `Key.F` | `0x46` (70) | Letter F. |
| `Key.G` | `0x47` (71) | Letter G. |
| `Key.H` | `0x48` (72) | Letter H. |
| `Key.I` | `0x49` (73) | Letter I. |
| `Key.J` | `0x4A` (74) | Letter J. |
| `Key.K` | `0x4B` (75) | Letter K. |
| `Key.L` | `0x4C` (76) | Letter L. |
| `Key.M` | `0x4D` (77) | Letter M. |
| `Key.N` | `0x4E` (78) | Letter N. |
| `Key.O` | `0x4F` (79) | Letter O. |
| `Key.P` | `0x50` (80) | Letter P. |
| `Key.Q` | `0x51` (81) | Letter Q. |
| `Key.R` | `0x52` (82) | Letter R. |
| `Key.S` | `0x53` (83) | Letter S. |
| `Key.T` | `0x54` (84) | Letter T. |
| `Key.U` | `0x55` (85) | Letter U. |
| `Key.V` | `0x56` (86) | Letter V. |
| `Key.W` | `0x57` (87) | Letter W. |
| `Key.X` | `0x58` (88) | Letter X. |
| `Key.Y` | `0x59` (89) | Letter Y. |
| `Key.Z` | `0x5A` (90) | Letter Z. |

**Example**

```lua
-- client: toggle a menu with F1, and react to Shift + R once per press
local menu_open = false
local r_held = false

Event.Add("OnKeyDown", function(key)
	if key == Key.F1 then
		menu_open = not menu_open
		print("menu open: " .. tostring(menu_open))
	elseif key == Key.R and not r_held then
		r_held = true

		if Input.IsKeyDown(Key.Shift) then
			print("Shift + R pressed")
		end
	elseif key == Key.Space then
		print("space")
	end
end)

Event.Add("OnKeyUp", function(key)
	if key == Key.R then
		r_held = false
	end
end)
```