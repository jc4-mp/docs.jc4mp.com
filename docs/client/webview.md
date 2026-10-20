---
sidebar_position: 76
---

# WebView pages (JavaScript)

A webview shows an ordinary web page (HTML, CSS and JavaScript, rendered by Chromium) on top of the game. This page documents what is available to JavaScript inside such a page: the `window.JC4MP` bridge object used to exchange messages with the resource's Lua scripts, how to reference the resource's own files, and the browser features that are restricted. Creating and controlling webviews from Lua is covered in [UI and WebView](./ui.md).

**Available on:** Client (inside webview pages)

## When the bridge exists {#when-the-bridge-exists}

`window.JC4MP` is defined only in a page that:

- was loaded from a `resource://` URL (see [Resource URLs](./ui.md#resource-urls)), and
- belongs to the same resource that created the webview, and
- is the webview's top document (an `<iframe>` inside your page does not get the bridge).

Pages loaded from `https://` URLs are displayed but have no `window.JC4MP`. If the page navigates to another file of the same resource, the new page gets a fresh bridge.

The bridge is installed before any of the page's own scripts run, so an inline `<script>` can use `window.JC4MP` immediately; there is no need to wait for `DOMContentLoaded` or poll for it. To write a page that also works in a desktop browser while you design it, check for its presence:

```js
const jc = window.JC4MP || { on() {}, off() {}, sendMessage() { return false } }
```

## Messages {#messages}

Messages are named events with an optional JSON payload, flowing both ways:

- **Lua to page:** `WebView.SendMessage(id, event, data)` in Lua, received in the page with `JC4MP.on(event, callback)`, `JC4MP.onMessage` or a `jc4mp:<event>` DOM event.
- **Page to Lua:** `JC4MP.sendMessage(event, data)` in the page, received in Lua by the function set with `WebView.SetMessageHandler(id, handler)`.

Event names are strings of 1 to 256 characters with no control characters. The name `__jc4mp_bridge_ready` is reserved by the bridge. Payloads are limited to 4 MB of JSON.

Messages are asynchronous and do not return values: to ask Lua for something, send a request event and listen for a reply event.

### Payload conversion {#payload-conversion}

From the page to Lua, the payload is converted with `JSON.stringify` and decoded into Lua values:

| JavaScript value | Lua value |
|---|---|
| `undefined`, `null`, a function | `nil` |
| `boolean`, `number`, `string` | `boolean`, `number`, `string` |
| `Array` | table indexed from 1 |
| `Object` | table with string keys |
| `NaN`, `Infinity` | `nil` |

From Lua to the page, the conversion is the one described in [`WebView.SendMessage`](./ui.md#webviewsendmessageid-event-data). Remember that an empty Lua table arrives as an empty object `{}` rather than an array, and that vectors and handles arrive as `null`.

### Receiving messages from Lua {#receiving-messages-from-lua}

Every message from Lua is delivered in three ways at once, so use whichever style you prefer:

1. Each callback registered with `JC4MP.on(event, callback)` for that event, called as `callback(data)`.
2. The `JC4MP.onMessage` function, if set, called as `onMessage(event, data)` for every event.
3. A `CustomEvent` named `jc4mp:<event>` dispatched on `window`, with the payload in `event.detail`.

Messages are never lost because the page was not ready:

- Messages Lua sends before the page has loaded are queued by the client and delivered when the bridge starts (up to 256 messages per webview, oldest dropped first).
- A message that arrives while no `JC4MP.on` callback for its event and no `onMessage` handler exist is kept by the bridge (up to 256 messages) and delivered as soon as such a callback or handler is registered. Messages only seen by `jc4mp:` DOM listeners are kept the same way, and are delivered to the DOM event again when a callback is registered later.

An exception thrown by a callback is logged and does not stop the other callbacks.

## Functions {#functions}

### JC4MP.sendMessage(event, data?) {#jc4mpsendmessageevent-data}

Sends a message to the resource's Lua script. Lua receives it on the next game frame through the handler set with [`WebView.SetMessageHandler`](./ui.md#webviewsetmessagehandlerid-handler), as `handler(event, data)`. If no handler is set, the message is dropped.

`data` is converted with `JSON.stringify`; omit it (or pass `undefined`) to send `nil`.

Throws a `TypeError` if the event name is empty, longer than 256 characters or contains control characters, and an error if the payload exceeds 4 MB.

`JC4MP.emit` and `JC4MP.postMessage` are aliases of this function.

**Parameters**

| Name | Type | Description |
|---|---|---|
| event | `string` | Message name. |
| data | any | optional, default `undefined` (`nil` in Lua). Any JSON-serializable value. |

**Returns** `boolean`: `true` once the message has been handed to the game.

**Example**

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
	html, body { margin: 0; height: 100%; background: transparent; font: 14px "Segoe UI", sans-serif; color: #fff; }
	.panel { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 16px; background: rgba(16, 18, 26, 0.94); border-radius: 8px; }
	button { font: inherit; margin: 4px; }
</style>
</head>
<body>
<div class="panel">
	<button data-item="pistol">Pistol</button>
	<button data-item="grenade">Grenade</button>
	<button id="close">Close</button>
</div>
<script>
	const jc = window.JC4MP

	for (const button of document.querySelectorAll('[data-item]'))
		button.onclick = () => jc.sendMessage('buy', { item: button.dataset.item, amount: 1 })

	document.getElementById('close').onclick = () => jc.sendMessage('close')

	// the game gets no keys while this page has the focus, so Escape is handled here
	addEventListener('keydown', e => e.key === 'Escape' && jc.sendMessage('close'))
</script>
</body>
</html>
```

The matching client script:

```lua
local shop = WebView.Create("my-shop", {
	url = "resource://my-shop/client/ui.html",
	size = Render.GetSize(),
	visible = false,
})

local function set_open(open)
	UI.SetCursorVisible(open)
	WebView.SetVisible(shop, open)
	WebView.SetInputEnabled(shop, open)

	if open then WebView.Focus(shop) else WebView.BlurAll() end
end

WebView.SetMessageHandler(shop, function(event, data)
	if event == "buy" then
		Net.Send("my-shop:buy", data.item, data.amount)
	elseif event == "close" then
		set_open(false)
	end
end)

Event.Add("OnKeyDown", function(key)
	if key == Key.F4 then set_open(true) end
end)
```

### JC4MP.on(event, callback) {#jc4mponevent-callback}

Registers a callback for one message name sent from Lua with `WebView.SendMessage`. Several callbacks can be registered for the same event; they run in registration order. Registering a callback also delivers any messages of that event that arrived earlier and were waiting for a listener.

Logs an error and does nothing if `callback` is not a function. Throws a `TypeError` if the event name is invalid.

**Parameters**

| Name | Type | Description |
|---|---|---|
| event | `string` | Message name to listen to. |
| callback | `function` | `callback(data)`, called with the decoded payload (`null` when Lua sent `nil`). |

**Returns** nothing.

**Example**

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
	html, body { margin: 0; background: transparent; font: 13px Consolas, monospace; color: #fff; }
	#rows div { padding: 2px 6px; background: rgba(0, 0, 0, 0.5); }
</style>
</head>
<body>
<div id="rows"></div>
<script>
	const list = v => Array.isArray(v) ? v : [] // an empty Lua table arrives as {}

	JC4MP.on('players', players => {
		document.getElementById('rows').replaceChildren(...list(players).map(p =>
			Object.assign(document.createElement('div'), { textContent: `${p.id}  ${p.name}` })))
	})
</script>
</body>
</html>
```

Sent from Lua with:

```lua
WebView.SendMessage("my-scoreboard", "players", { { id = 1, name = "Rico" }, { id = 2, name = "Mira" } })
```

### JC4MP.off(event, callback?) {#jc4mpoffevent-callback}

Removes a callback registered with `JC4MP.on`. Without `callback`, removes every callback of that event. Throws a `TypeError` if the event name is invalid.

**Parameters**

| Name | Type | Description |
|---|---|---|
| event | `string` | Message name. |
| callback | `function` | optional. The exact function passed to `JC4MP.on`. When omitted, all callbacks of the event are removed. |

**Returns** nothing.

**Example**

```js
function onCountdown(seconds) {
	document.getElementById('timer').textContent = seconds

	if (seconds <= 0)
		JC4MP.off('countdown', onCountdown) // stop listening once the round started
}

JC4MP.on('countdown', onCountdown)
```

### JC4MP.onMessage {#jc4mponmessage}

A property holding a single function that receives every message from Lua, as `onMessage(event, data)`. Assigning a function also delivers all messages that were waiting for a listener; assigning anything that is not a function clears it (`null`). It runs before the `JC4MP.on` callbacks of the same message.

This is convenient for pages that route all events through one `switch`, such as framework-built pages.

**Example**

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
	html, body { margin: 0; background: transparent; color: #fff; font: 16px "Segoe UI", sans-serif; }
	#banner { display: none; padding: 12px 20px; background: rgba(200, 40, 40, 0.85); }
</style>
</head>
<body>
<div id="banner"></div>
<script>
	const banner = document.getElementById('banner')

	JC4MP.onMessage = (event, data) => {
		switch (event) {
		case 'show':
			banner.textContent = data.text
			banner.style.display = 'block'
			break
		case 'hide':
			banner.style.display = 'none'
			break
		}
	}
</script>
</body>
</html>
```

```lua
WebView.SendMessage("my-banner", "show", { text = "Capture the flag starts in 10 seconds" })
```

### JC4MP.getWebViewId() {#jc4mpgetwebviewid}

Returns the id of the webview the page runs in (the id passed to or generated by `WebView.Create`). Useful when one HTML file is shared by several webviews and must tell Lua which one sent a message.

**Parameters**

None.

**Returns** `string`: the webview id.

**Example**

```js
document.getElementById('ok').onclick = () =>
	JC4MP.sendMessage('confirm', { from: JC4MP.getWebViewId() })
```

### JC4MP.isAvailable() {#jc4mpisavailable}

Always returns `true`. It exists so that code shared with a desktop browser can test `window.JC4MP && window.JC4MP.isAvailable()`.

**Parameters**

None.

**Returns** `boolean`: `true`.

**Example**

```js
const inGame = !!(window.JC4MP && window.JC4MP.isAvailable())

if (!inGame)
	document.body.classList.add('preview') // show placeholder data when opened in a normal browser
```

### window event "jc4mp:&lt;event&gt;" {#window-event-jc4mplteventgt}

Every message from Lua is also dispatched on `window` as a `CustomEvent` whose type is `jc4mp:` followed by the event name, with the payload in `detail`. It does not bubble and cannot be cancelled. Use it when you prefer standard DOM listeners or a framework that binds to window events.

**Example**

```js
addEventListener('jc4mp:health', e => {
	document.getElementById('bar').style.width = `${Math.round(e.detail.value * 100)}%`
})
```

```lua
Event.Add("OnUpdate", function()
	local player = World.LocalPlayer()

	if player then
		WebView.SendMessage("my-hud", "health", { value = player:GetHealth() })
	end
end)
```

## Referencing assets {#referencing-assets}

A page loaded from `resource://my-res/client/ui/index.html` is served from a private origin of the form `https://r-my-res-<hash>.resources.local.jc4mp/my-res/client/ui/index.html`. You never need to write that address: relative URLs resolve against the page's folder, so they are the simplest way to reference the resource's files:

```html
<link rel="stylesheet" href="style.css">
<script src="app.js"></script>
<img src="img/logo.png">
<audio src="../sounds/click.ogg"></audio>
```

```js
const config = await (await fetch('config.json')).json()
```

Root-relative URLs also work if they start with the resource name, for example `/my-res/shared/fonts/title.woff2`.

Notes:

- Any file in the resource's `client/` or `shared/` folder can be loaded; `server/` files are never downloaded by players.
- A page can only load files of its own resource. Files of other resources are refused, even with a full URL.
- `..` can be used to go up inside the resource, but never above the resource folder.
- Files are served with a content type based on their extension (`.html`, `.css`, `.js`/`.mjs`, `.json`, `.png`, `.jpg`/`.jpeg`, `.gif`, `.svg`, `.ico`, `.webp`, `.woff`, `.woff2`, `.ttf`, `.otf`, `.mp4`, `.webm`, `.mp3`, `.ogg`; anything else as binary). Files over 256 MB are refused.
- Files are not cached between loads, so a resource restart always shows the latest version.
- Assets can also come from public `https://` and `wss://` addresses (web fonts, CDNs, WebSockets) and from `data:image/...`, `data:font/...` and `blob:` URLs. `http://` addresses and private network hosts (`localhost`, LAN addresses) are blocked.

Built single-page applications (Svelte, React, Vue) work as long as their build uses relative asset paths (for example `base: './'` in Vite).

## Browser restrictions {#browser-restrictions}

Webview pages run in a locked-down Chromium. In resource pages:

- `localStorage` and `sessionStorage` throw when accessed, and `indexedDB` and `caches` are unavailable. Keep persistent state in Lua (or on the server) and send it to the page.
- Web Workers, Shared Workers, Service Workers, WebRTC, notifications, push, the microphone and camera are disabled.
- Reading the clipboard is refused. Use Lua's `Input.GetClipboard` / `Input.SetClipboard` and pass the text through messages.
- `alert`, `confirm` and `prompt` do not show anything. Build dialogs in HTML.
- Pop-up windows (`window.open`, `target="_blank"`), downloads, file pickers and the right-click context menu are disabled.
- Browser shortcuts are blocked: F5, F11, F12, Ctrl+R, Ctrl+W, Ctrl+T, Ctrl+N, Ctrl+P, Ctrl+S, Ctrl+F, Ctrl+L, Ctrl+O, Ctrl+U, zoom keys, Alt+Left/Right and the developer tools shortcuts.
- Audio and video may autoplay without a click.
- The device scale factor is always 1: CSS pixels equal screen pixels.

The page only receives the mouse and keyboard while its webview is visible, has input enabled and is focused (see [Input and focus](./ui.md#input-and-focus)). While it has them, the game receives none, so the page must provide the way to close itself (a button, or Escape in a `keydown` listener that sends a message to Lua).

Uncaught errors and `console.error` messages are written to the client log with the file and line; other console output is not recorded.

## Complete example {#complete-example}

A resource `my-notes` with a small notes window toggled by F6. The files are `my-notes/client/main.lua` and `my-notes/client/ui.html`.

`client/ui.html`:

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Notes</title>
<style>
	* { box-sizing: border-box; }
	html, body { margin: 0; height: 100%; overflow: hidden; background: transparent; font: 14px "Segoe UI", sans-serif; color: #e8e8ee; }
	.panel { position: absolute; left: 50%; top: 50%; width: 420px; transform: translate(-50%, -50%); padding: 14px; background: rgba(16, 18, 26, 0.94); border: 1px solid #2c3040; border-radius: 8px; }
	textarea { width: 100%; height: 200px; resize: none; font: inherit; color: inherit; background: #1c2030; border: 1px solid #3a4258; }
	footer { display: flex; justify-content: space-between; margin-top: 8px; }
</style>
</head>
<body>
<div class="panel">
	<textarea id="text" placeholder="Write something..."></textarea>
	<footer>
		<span id="status"></span>
		<span><button id="save">Save</button> <button id="close">Close</button></span>
	</footer>
</div>
<script>
	const jc = window.JC4MP
	const text = document.getElementById('text')
	const status = document.getElementById('status')

	// Lua sends the stored text when the window opens
	jc.on('open', data => {
		text.value = data.text || ''
		status.textContent = ''
		text.focus()
	})

	jc.on('saved', () => status.textContent = 'Saved')

	document.getElementById('save').onclick = () => jc.sendMessage('save', { text: text.value })

	const close = () => jc.sendMessage('close')
	document.getElementById('close').onclick = close
	addEventListener('keydown', e => e.key === 'Escape' && close())
</script>
</body>
</html>
```

`client/main.lua`:

```lua
local notes = WebView.Create("my-notes", {
	url = "resource://my-notes/client/ui.html",
	size = Render.GetSize(),
	visible = false,
	z_order = 100,
})

if notes == "" then return end

local open = false
local stored_text = ""

local function set_open(value)
	if open == value then return end

	open = value
	UI.SetCursorVisible(open)
	WebView.SetVisible(notes, open)
	WebView.SetInputEnabled(notes, open)

	if open then
		WebView.BringToFront(notes)
		WebView.Focus(notes)
		WebView.SendMessage(notes, "open", { text = stored_text })
	else
		WebView.BlurAll()
	end
end

WebView.SetMessageHandler(notes, function(event, data)
	if event == "save" then
		stored_text = data.text
		WebView.SendMessage(notes, "saved")
	elseif event == "close" then
		set_open(false)
	end
end)

Event.Add("OnKeyDown", function(key)
	if key == Key.F6 then set_open(true) end
end)
```