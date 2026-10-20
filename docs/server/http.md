---
sidebar_position: 36
---

# HTTP

Server scripts can call web services (a Discord webhook, a stats API, your own website) with `Net.Fetch`. It is part of the [Net](../shared/net.md) table and exists only on the server; client scripts have no HTTP access.

**Available on:** Server

## Functions {#functions}

### Net.Fetch(url, options?, callback) {#netfetchurl-options-callback}

Sends an HTTP request to `url` and calls `callback` with the response once it is done.

**The call doesn't wait.** `Net.Fetch` returns right away and the request runs on another thread, so the server keeps ticking, firing events and syncing players while it is in flight. When the request finishes or fails, `callback(result)` is called on the main thread, from the server's update like [timers](../shared/timer.md). Code written after `Net.Fetch` runs before the answer arrives: put whatever needs the response inside the callback.

Details:

- The method is `GET` when `options` is omitted and **`POST` when an `options` table is given** without a `method`, even an empty one. Set `method = "GET"` explicitly if you pass options to a GET request.
- `method` is sent as given, so any method works (`"PUT"`, `"PATCH"`, `"DELETE"`...).
- Redirects are followed.
- HTTPS certificates are **not verified**, so don't rely on it to prove the identity of the server you talk to.
- Responses compressed with gzip or deflate are decompressed.
- The default timeout is 10 seconds.
- `success` only tells whether an HTTP response was received. A `404` or `500` answer is still `success = true`, so always check `status` as well.
- A failed request (bad URL, DNS failure, connection refused, timeout) logs `Failed to fetch data from <url>` in the server console and calls `callback` with `success = false`, `status = 0` and an empty `response`.
- If the resource stops (or restarts) before the request finishes, `callback` is never called.
- An error raised inside `callback` is reported like any other script error.
- A missing `callback`, a `callback` that isn't a function, or `options` that aren't a table raise the Lua error `Net.Fetch(url, [options], callback): callback must be a function and options a table`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| url | string | the full URL, including `http://` or `https://`. Query parameters go in the URL and must already be URL-encoded |
| options | table | optional, see below |
| callback | function | called once with the result table (see below) when the request is done |

**Options**

| Field | Type | Description |
|---|---|---|
| method | string | optional, the HTTP method. Default `"POST"` when `options` is given (`"GET"` without `options`) |
| body | string | optional, the request body. Encode tables first, e.g. with [JSON.Stringify](../shared/json.md) |
| content_type | string | optional, the `Content-Type` header, e.g. `"application/json"`. `contentType` is accepted too |
| authorization | string | optional, the `Authorization` header value, e.g. `"Bearer abc123"` |
| accept | string | optional, the `Accept` header value |
| headers | table | optional, more headers as `{ ["Header-Name"] = "value" }`. Only string keys with string values are used |
| timeout | integer | optional, the maximum time for the whole request, in **seconds**. Default 10 |

**Returns** nothing. The result goes to `callback` as a table:

| Field | Type | Description |
|---|---|---|
| success | boolean | `true` when a response was received, whatever its status |
| status | integer | the HTTP status code (`200`, `404`...), `0` when the request failed |
| response | string | the response body, an empty string when the request failed |

**Example**

```lua
-- server: read a JSON API
Net.Fetch("https://api.example.com/v1/motd", {
	method = "GET",
	accept = "application/json",
	timeout = 3,
}, function(result)
	if result.success and result.status == 200 then
		local data = JSON.Parse(result.response)

		if data and data.message then
			Chat.Broadcast("Message of the day: " .. data.message)
		end
	else
		print("motd request failed, status " .. result.status)
	end
end)
```

```lua
-- server: post a message to a Discord webhook when a player joins
local WEBHOOK = "https://discord.com/api/webhooks/<id>/<token>"

Event.Add("OnPlayerJoin", function(client)
	Net.Fetch(WEBHOOK, {
		body = JSON.Stringify({ content = client:GetName() .. " joined the server" }),
		content_type = "application/json",
		timeout = 2,
	}, function(result)
		if result.status ~= 204 and result.status ~= 200 then
			print("webhook failed: " .. result.status .. " " .. result.response)
		end
	end)
end)
```

```lua
-- server: custom headers and another method
Net.Fetch("https://api.example.com/v1/players/76561198000000000", {
	method = "DELETE",
	headers = {
		["X-Api-Key"] = "my-key",
		["X-Server"] = "jc4mp",
	},
	timeout = 5,
}, function(result)
	print(result.status)
end)
```

```lua
-- server: a GET without options; the player may have left by the time the answer arrives
Event.Add("OnPlayerJoin", function(client)
	Net.Fetch("https://api.example.com/v1/banned?steam_id=" .. client:GetUserId(), function(result)
		-- Kick does nothing if the player has already disconnected
		if result.status == 200 and result.response == "true" then
			client:Kick("Banned on the community website")
		end
	end)
end)
```