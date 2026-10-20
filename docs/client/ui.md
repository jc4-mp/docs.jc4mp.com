---
sidebar_position: 75
---

# UI and WebView

Every custom interface in JC4MP is a web page (HTML, CSS and JavaScript) rendered by an embedded Chromium browser and drawn over the game. The `WebView` table creates and controls these pages from a client script: where they sit on screen, whether they are shown, whether they take the mouse and keyboard, and how messages travel between Lua and the page's JavaScript. The small `UI` table holds the cursor helpers that go with them. The JavaScript side of a page is documented in [WebView pages (JavaScript)](./webview.md).

**Available on:** Client

## How webviews work {#how-webviews-work}

- Each webview is a rectangle on top of the game, positioned in pixels from the top-left corner of the game window's client area. Its page has a transparent background unless the page paints one.
- A webview is identified by a string id. Ids are global for the whole client: two resources cannot both create a webview called `"menu"`. Use the resource name in the id (or let `WebView.Create` generate one) to avoid collisions.
- A webview belongs to the resource that created it. Every other `WebView` function only works on webviews owned by the calling resource; calls on another resource's webview fail with an error in the client log and return `false` (or an empty value).
- When a resource stops, every webview it owns is destroyed automatically. You never need to clean up in a stop handler.
- Pages normally come from the resource itself, through `resource://<resource>/<path>` URLs (see [Resource URLs](#resource-urls)). Only pages loaded this way get the `window.JC4MP` bridge and can exchange messages with Lua.
- Webviews draw even while the game has focus. To let the player interact with one it must be **visible**, have **input enabled** and be **focused**. While such a webview is focused, the game receives no keyboard or mouse input at all (the player stops moving, `OnKeyDown` and the other key events do not fire, and `Input` reads nothing). The page must therefore offer its own way to close (a close button, or a JavaScript `keydown` handler that sends a message to Lua).
- All `WebView` functions report failure by returning `false` (or `""`, or an empty table) and writing the reason to the client log. They do not raise Lua errors, except when an argument has the wrong Lua type.

### Resource URLs {#resource-urls}

A `resource://` URL names a file inside a resource folder, starting with the resource name:

```
resource://<resource name>/<path inside the resource folder>
```

For example, a resource `admin-menu` with the file `admin-menu/client/ui.html` uses `resource://admin-menu/client/ui.html`. Every file under a resource's `client/` and `shared/` folders is downloaded by players when they join, so HTML, CSS, JavaScript, images, fonts, audio and video placed there are available to its pages. Files under `server/` are never sent to players and cannot be loaded.

Rules:

- A resource may only load its own files. `WebView.Create` and `WebView.LoadUrl` reject a `resource://` URL that names another resource, and a page cannot load files (images, scripts, `fetch`) from another resource either.
- Paths containing `..` are rejected. Files larger than 256 MB are refused.
- Inside the page, relative URLs (`style.css`, `img/logo.png`, `fetch("data.json")`) resolve against the page's folder, which is the simplest way to reference assets. See [Referencing assets](./webview.md#referencing-assets).

### Allowed URLs {#allowed-urls}

`WebView.Create` and `WebView.LoadUrl` accept:

- `resource://` URLs of the calling resource.
- `https://` URLs of public internet hosts. Pages loaded this way are displayed but do **not** get the `window.JC4MP` bridge, so they cannot talk to Lua.
- An empty string, which shows a blank page.

Everything else is rejected: `http://`, `file://`, `data:`, `javascript:` and other schemes, and `https://` URLs that point to a private network (`localhost`, `127.0.0.1`, `192.168.x.x`, `10.x.x.x`, `*.local`, `*.lan`, `*.internal`, single-label host names and similar).

### Input and focus {#input-and-focus}

Only one webview in the whole client is focused at a time. A webview receives the mouse and keyboard only when all three of these hold:

1. it is visible (`WebView.SetVisible(id, true)` or `visible = true` at creation),
2. its input is enabled (`WebView.SetInputEnabled(id, true)` or `input_enabled = true`),
3. it is focused (`WebView.Focus(id)`).

Mouse events are delivered only while the cursor is inside the focused webview's rectangle; other webviews never receive the mouse, even where they are visible. Hiding a focused webview or disabling its input blurs it immediately, and the game gets its input back.

The key that opened a menu does not leak into it as typed text: if a key press focuses a webview, the character from that same key press is discarded.

The Windows cursor is not shown automatically when a webview is focused. Call [`UI.SetCursorVisible`](#uisetcursorvisiblevisible) yourself.

### Typical open and close pattern {#typical-open-and-close-pattern}

```lua
local open_key = Key.F2

local menu = WebView.Create("my-menu", {
	url = "resource://my-menu/client/ui.html",
	size = Render.GetSize(),
	visible = false,
})

local open = false

local function set_open(value)
	if open == value then return end

	open = value
	UI.SetCursorVisible(open)
	WebView.SetVisible(menu, open)
	WebView.SetInputEnabled(menu, open)

	if open then
		WebView.BringToFront(menu)
		WebView.Focus(menu)
	else
		WebView.BlurAll()
	end
end

-- the game gets no keys while the menu is focused, so only the opening is handled here;
-- the page sends "close" when the player presses Escape or the close button
Event.Add("OnKeyDown", function(key)
	if key == open_key then set_open(true) end
end)

WebView.SetMessageHandler(menu, function(event, data)
	if event == "close" then
		set_open(false)
	end
end)
```

## Functions {#functions}

### UI.GetMousePos() {#uigetmousepos}

Returns the cursor position over the game window, normalized so that `(0, 0)` is the top-left corner of the window's client area and `(1, 1)` its bottom-right corner. The value is computed from the Windows cursor position, so it keeps changing while the cursor is hidden and goes below 0 or above 1 when the cursor is outside the window.

Multiply by `Render.GetSize()` to get pixels (the same coordinate space as webview positions).

**Parameters**

None.

**Returns** `vec2`: the cursor position, each axis from 0 to 1 inside the window.

**Example**

```lua
-- show a small tooltip webview next to the cursor while it is open
local tip = WebView.Create("my-hud:tooltip", {
	url = "resource://my-hud/client/tooltip.html",
	size = vec2(220, 60),
})

Event.Add("OnUpdate", function()
	local pixels = UI.GetMousePos() * Render.GetSize()

	WebView.SetPosition(tip, pixels + vec2(16, 16))
end)
```

### UI.SetCursorVisible(visible) {#uisetcursorvisiblevisible}

Shows or hides the Windows mouse cursor over the game. Use it when a webview takes input, so the player can see where they click.

This uses the Windows display counter: each `true` call increments it and each `false` call decrements it, and the cursor is visible only while the counter is zero or above. Calls must therefore be balanced: calling `UI.SetCursorVisible(true)` twice and `UI.SetCursorVisible(false)` once leaves the cursor visible. Keep your own open/closed flag and call it only when that flag changes, as in the example.

The counter is shared by every resource on the client, so two resources that both show the cursor each need to hide it again.

**Parameters**

| Name | Type | Description |
|---|---|---|
| visible | `boolean` | `true` to show the cursor (increment), `false` to hide it (decrement). |

**Returns** nothing.

**Example**

```lua
local cursor_shown = false

local function set_cursor(show)
	if show == cursor_shown then return end -- keep the calls balanced

	cursor_shown = show
	UI.SetCursorVisible(show)
end

Event.Add("OnKeyDown", function(key)
	if key == Key.F3 then set_cursor(not cursor_shown) end
end)
```

### WebView.Create(id, config) {#webviewcreateid-config}

Creates a webview owned by the calling resource and starts loading its page. The page loads in the background; messages sent with [`WebView.SendMessage`](#webviewsendmessageid-event-data) before it is ready are queued and delivered once it is.

`config` is a table; every field is optional:

| Field | Type | Description |
|---|---|---|
| url | `string` | Page to load: a `resource://` URL of this resource or a public `https://` URL (see [Allowed URLs](#allowed-urls)). Default `""` (blank page). |
| position | `vec2` | Top-left corner in pixels from the top-left of the game window. Must be finite; clamped to -8192..8192. Default `vec2(0, 0)`. |
| size | `vec2` | Width and height in pixels. Must be finite and greater than 0; clamped to 1..8192. Default `vec2(800, 600)`. |
| visible | `boolean` | Whether it is drawn. Default `true`. |
| input_enabled | `boolean` | Whether it may take the mouse and keyboard once focused. Default `false`. |
| z_order | `integer` | Stacking order; higher values are drawn on top. Clamped to -1000000..1000000. Default `0`. |

The size is not updated when the game window is resized. Read `Render.GetSize()` again if you need to follow it.

Creation fails, returning `""`, when:

- the id is invalid: longer than 128 characters, or containing characters other than letters, digits, `_`, `-`, `.` and `:`;
- a webview with that id already exists (in any resource);
- the URL is not allowed, or is a `resource://` URL of another resource;
- `position` or `size` is not finite, or `size` is not positive;
- the browser could not be initialized on this client (for example a missing or broken browser runtime).

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Unique id for the webview. Pass `""` to get a generated id of the form `auto:<resource>:<number>`. |
| config | `table` | Settings described above. Pass `{}` for all defaults. |

**Returns** `string`: the id of the new webview (the generated one if `id` was `""`), or `""` on failure.

**Example**

```lua
local screen = Render.GetSize()
local size = vec2(700, 400)

local chat = WebView.Create("my-chat", {
	url = "resource://my-chat/client/ui/index.html",
	position = vec2(5, screen.y - size.y - 40),
	size = size,
	visible = true,
	input_enabled = false,
	z_order = 10,
})

if chat == "" then
	print("my-chat: could not create the chat webview")
	return
end
```

### WebView.Destroy(id) {#webviewdestroyid}

Destroys a webview of the calling resource right away: it disappears from the screen, its page is unloaded, its message handler is dropped and any queued messages are discarded. If it was focused, the game gets its input back.

You do not need to call this when your resource stops: all of its webviews are destroyed automatically.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |

**Returns** `boolean`: `true` if it was destroyed, `false` if no webview of this resource has that id.

**Example**

```lua
local popup = WebView.Create("", {
	url = "resource://notices/client/popup.html",
	position = vec2(20, 20),
	size = vec2(360, 120),
})

-- remove the popup after 5 seconds
Timer.Set(function()
	WebView.Destroy(popup)
end, 5000, 1)
```

### WebView.LoadUrl(id, url) {#webviewloadurlid-url}

Navigates a webview to another page. The same URL rules as [`WebView.Create`](#webviewcreateid-config) apply. The old page is discarded; messages sent afterwards are queued until the new page is ready.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |
| url | `string` | New page: a `resource://` URL of this resource, a public `https://` URL, or `""` for a blank page. |

**Returns** `boolean`: `true` if the navigation was started, `false` if the URL is not allowed or the webview is not found.

**Example**

```lua
local view = WebView.Create("my-tabs", { url = "resource://my-tabs/client/home.html" })

Net.AddEvent("my-tabs:show", function(page)
	-- page is "home", "rules" or "shop"
	WebView.LoadUrl(view, "resource://my-tabs/client/" .. page .. ".html")
end)
```

### WebView.SetPosition(id, position) {#webviewsetpositionid-position}

Moves a webview. The position is the top-left corner in pixels from the top-left of the game window, clamped to -8192..8192 on each axis.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |
| position | `vec2` | New top-left corner in pixels. Must be finite. |

**Returns** `boolean`: `true` on success, `false` if the webview is not found or the position is not finite.

**Example**

```lua
local hud = WebView.Create("my-hud", { url = "resource://my-hud/client/hud.html", size = vec2(300, 80) })

-- keep the HUD in the bottom-right corner
local function place()
	local screen = Render.GetSize()

	WebView.SetPosition(hud, vec2(screen.x - 300 - 20, screen.y - 80 - 20))
end

place()
```

### WebView.SetSize(id, size) {#webviewsetsizeid-size}

Resizes a webview. The page is laid out again at the new size (CSS `vw`/`vh` and media queries follow it).

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |
| size | `vec2` | New width and height in pixels. Must be finite and greater than 0; clamped to 1..8192. |

**Returns** `boolean`: `true` on success, `false` if the webview is not found or the size is invalid.

**Example**

```lua
local panel = WebView.Create("my-panel", {
	url = "resource://my-panel/client/ui.html",
	size = vec2(320, 48),
})

local expanded = false

WebView.SetMessageHandler(panel, function(event)
	if event == "toggle" then
		expanded = not expanded
		WebView.SetSize(panel, expanded and vec2(320, 400) or vec2(320, 48))
	end
end)
```

### WebView.SetVisible(id, visible) {#webviewsetvisibleid-visible}

Shows or hides a webview. A hidden webview keeps its page loaded and keeps receiving messages; it is only not drawn. Hiding a focused webview also blurs it, so the game gets its input back.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |
| visible | `boolean` | `true` to show it, `false` to hide it. |

**Returns** `boolean`: `true` on success, `false` if the webview is not found.

**Example**

```lua
local stats = WebView.Create("my-stats", {
	url = "resource://my-stats/client/ui.html",
	size = vec2(260, 120),
	visible = false,
})

local shown = false

Event.Add("OnKeyDown", function(key)
	if key == Key.F7 then
		shown = not shown
		WebView.SetVisible(stats, shown)
	end
end)
```

### WebView.SetInputEnabled(id, enabled) {#webviewsetinputenabledid-enabled}

Allows or forbids a webview to take the mouse and keyboard. Enabling input alone does not give the webview the input: it must also be visible and focused with [`WebView.Focus`](#webviewfocusid). Disabling input on a focused webview blurs it, so the game gets its input back.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |
| enabled | `boolean` | `true` to allow input, `false` to forbid it. |

**Returns** `boolean`: `true` on success, `false` if the webview is not found.

**Example**

```lua
-- a chat box that is always drawn, but only takes the keyboard while typing
local chat = WebView.Create("my-chat", {
	url = "resource://my-chat/client/ui.html",
	position = vec2(10, 300),
	size = vec2(600, 300),
	input_enabled = false,
})

local function start_typing()
	WebView.SetInputEnabled(chat, true)
	WebView.Focus(chat)
	WebView.SendMessage(chat, "start_typing", {})
end

local function stop_typing()
	WebView.SetInputEnabled(chat, false) -- also blurs it
end

Event.Add("OnKeyDown", function(key)
	if key == Key.T then start_typing() end
end)

WebView.SetMessageHandler(chat, function(event)
	if event == "done" then stop_typing() end
end)
```

### WebView.IsInputEnabled(id) {#webviewisinputenabledid}

Returns whether a webview of the calling resource has input enabled.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |

**Returns** `boolean`: `true` if input is enabled, `false` if it is not or the webview is not found.

**Example**

```lua
if not WebView.IsInputEnabled("my-chat") then
	WebView.SetInputEnabled("my-chat", true)
end
```

### WebView.Focus(id) {#webviewfocusid}

Gives a webview the keyboard and mouse. The previously focused webview (of any resource) is blurred first. The webview must already be visible and have input enabled; otherwise nothing is focused and `false` is returned.

While the webview stays focused, the game receives no keyboard or mouse input. The focus is lost when the webview is hidden, its input is disabled, it is destroyed, [`WebView.BlurAll`](#webviewblurall) is called, or the game window loses focus (alt-tab).

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |

**Returns** `boolean`: `true` if the webview is now focused, `false` if it is not found, hidden, or has input disabled.

**Example**

```lua
local menu = WebView.Create("my-menu", { url = "resource://my-menu/client/ui.html", visible = false })

local function open_menu()
	WebView.SetVisible(menu, true)
	WebView.SetInputEnabled(menu, true)

	if not WebView.Focus(menu) then
		print("my-menu: could not focus the menu")
	end
end
```

### WebView.BlurAll() {#webviewblurall}

Removes the focus from every webview of the calling resource. If one of them held the input, the game gets it back. Webviews of other resources keep their focus.

**Parameters**

None.

**Returns** `boolean`: `true` on success, `false` if the browser is not initialized on this client.

**Example**

```lua
local function close_menu()
	WebView.SetInputEnabled("my-menu", false)
	WebView.SetVisible("my-menu", false)
	WebView.BlurAll()
	UI.SetCursorVisible(false)
end
```

### WebView.IsFocused(id) {#webviewisfocusedid}

Returns whether a webview of the calling resource is the focused one.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |

**Returns** `boolean`: `true` if it is focused, `false` if it is not or the webview is not found.

**Example**

```lua
Event.Add("OnUpdate", function()
	-- dim the world behind the menu while it has the input
	if WebView.IsFocused("my-menu") then
		-- ...
	end
end)
```

### WebView.GetFocused() {#webviewgetfocused}

Returns the id of the focused webview, if it belongs to the calling resource.

**Parameters**

None.

**Returns** `string`: the focused webview's id, or `""` if no webview is focused or the focused one belongs to another resource.

**Example**

```lua
local focused = WebView.GetFocused()

if focused ~= "" then
	print("my resource's webview " .. focused .. " has the input")
end
```

### WebView.BringToFront(id) {#webviewbringtofrontid}

Draws a webview above every other webview, including those of other resources, by setting its z-order to one more than the highest z-order in use.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |

**Returns** `boolean`: `true` on success, `false` if the webview is not found.

**Example**

```lua
local function open_menu()
	WebView.SetVisible("my-menu", true)
	WebView.SetInputEnabled("my-menu", true)
	WebView.BringToFront("my-menu") -- above the chat and HUDs
	WebView.Focus("my-menu")
end
```

### WebView.SendToBack(id) {#webviewsendtobackid}

Draws a webview below every other webview, including those of other resources, by setting its z-order to one less than the lowest z-order in use.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |

**Returns** `boolean`: `true` on success, `false` if the webview is not found.

**Example**

```lua
local backdrop = WebView.Create("my-hud:backdrop", {
	url = "resource://my-hud/client/backdrop.html",
	size = Render.GetSize(),
})

WebView.SendToBack(backdrop)
```

### WebView.SendMessage(id, event, data?) {#webviewsendmessageid-event-data}

Sends a message to the page of a webview. In the page it reaches the listeners registered with `JC4MP.on(event, ...)`, the `JC4MP.onMessage` handler, and a `jc4mp:<event>` DOM event on `window` (see [Receiving messages from Lua](./webview.md#receiving-messages-from-lua)).

`data` is converted to JSON:

| Lua value | JavaScript value |
|---|---|
| `nil` | `null` |
| `boolean` | `boolean` |
| `number` | `number` |
| `string` | `string` |
| table with keys `1..n` and no holes | `Array` |
| any other table (string keys, holes, or empty) | `Object` (number keys become strings) |
| functions, `vec2`/`vec3`/`quat` and other userdata, handles | `null` |

An empty table becomes `{}`, not `[]`: on the page, check with `Array.isArray` before treating a list as an array. Convert vectors to plain tables (`{ x = v.x, y = v.y, z = v.z }`) and handles to ids before sending. Nesting deeper than 16 levels arrives as `null`.

If the page has not finished loading (or is navigating), the message is queued and delivered once it is ready; at most 256 messages (16 MB in total) are queued per webview, the oldest being dropped first.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |
| event | `string` | Message name: 1 to 256 characters, no control characters. |
| data | any | optional, default `nil`. Payload, converted to JSON as described above. At most 4 MB once converted. |

**Returns** `boolean`: `true` if the message was sent or queued, `false` if the webview is not found, the event name is invalid or the payload is too large.

**Example**

```lua
local board = WebView.Create("my-scoreboard", { url = "resource://my-scoreboard/client/ui.html" })

local function refresh()
	local rows = {}

	for _, player in ipairs(World.GetPlayers()) do
		rows[#rows + 1] = { id = player:GetNetId(), name = player:GetName() }
	end

	WebView.SendMessage(board, "players", rows)
end

Timer.Set(refresh, 1000, -1)
```

### WebView.SetMessageHandler(id, handler) {#webviewsetmessagehandlerid-handler}

Sets the Lua function that receives the messages the page sends with `JC4MP.sendMessage(event, data)`. A webview has one handler; setting a new one replaces the previous one. Messages that arrive while no handler is set are dropped.

The handler is called on the next game frame after the page sent the message, as `handler(event, data)`:

- `event` is the message name (`string`).
- `data` is the page's payload decoded from JSON: objects become tables with string keys, arrays become tables indexed from 1, `null` and `undefined` become `nil`, numbers become numbers. If the payload cannot be decoded, it is passed as the raw string.

Errors raised inside the handler are written to the client log and do not stop later messages.

Only pages loaded from a `resource://` URL of the owning resource can send messages; `https://` pages cannot.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |
| handler | `function` | `function(event, data)` called for each message from the page. |

**Returns** `boolean`: `true` on success, `false` if the webview is not found.

**Example**

```lua
local shop = WebView.Create("my-shop", {
	url = "resource://my-shop/client/ui.html",
	visible = false,
})

WebView.SetMessageHandler(shop, function(event, data)
	if event == "buy" then
		-- data = { item = "grenade", amount = 2 }
		Net.Send("my-shop:buy", data.item, data.amount)
	elseif event == "close" then
		WebView.SetVisible(shop, false)
		UI.SetCursorVisible(false)
	end
end)
```

### WebView.ExecuteScript(id, script) {#webviewexecutescriptid-script}

Runs a piece of JavaScript inside the page of a webview. The code runs as is, with no result returned to Lua. If the page is still loading (for example right after [`WebView.Create`](#webviewcreateid-config)), the script is kept and runs once the page has loaded; after a [`WebView.LoadUrl`](#webviewloadurlid-url), scripts wait for the new page the same way. At most 256 scripts are kept per webview while it loads: more are dropped with a warning in the client log. Prefer [`WebView.SendMessage`](#webviewsendmessageid-event-data) to pass data, and keep `ExecuteScript` for one-off actions. It also works on `https://` pages, which have no message bridge.

Never build the script by concatenating untrusted text (such as player names or chat messages) into it; send such text with `WebView.SendMessage` instead.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |
| script | `string` | JavaScript source. Must not be empty; at most 4 MB. |

**Returns** `boolean`: `true` if the script was sent to the page, `false` if the webview is not found or the script is empty or too large.

**Example**

```lua
-- scroll the log page to the bottom
WebView.ExecuteScript("my-log", "window.scrollTo(0, document.body.scrollHeight)")
```

### WebView.GetInfo(id) {#webviewgetinfoid}

Returns the current settings of a webview of the calling resource.

**Parameters**

| Name | Type | Description |
|---|---|---|
| id | `string` | Id of the webview. |

**Returns** `table`: with the fields below, or an empty table if the webview is not found.

| Field | Type | Description |
|---|---|---|
| url | `string` | The URL it was given (`resource://` URLs are returned in that form), `""` for a blank page. |
| position | `vec2` | Top-left corner in pixels, after clamping. |
| size | `vec2` | Size in pixels, after clamping. |
| visible | `boolean` | Whether it is drawn. |
| input_enabled | `boolean` | Whether input is enabled. |
| z_order | `integer` | Current z-order (changed by `BringToFront` and `SendToBack`). |

**Example**

```lua
local info = WebView.GetInfo("my-menu")

if info.url then
	print(("my-menu: %s at %d,%d size %dx%d z %d"):format(
		info.url, info.position.x, info.position.y, info.size.x, info.size.y, info.z_order))
end
```

### WebView.GetAll() {#webviewgetall}

Returns the ids of every webview owned by the calling resource, ordered from the bottom-most to the top-most.

**Parameters**

None.

**Returns** `table`: array of `string` ids (empty if the resource has none).

**Example**

```lua
-- hide every webview of this resource
for _, id in ipairs(WebView.GetAll()) do
	WebView.SetVisible(id, false)
end
```