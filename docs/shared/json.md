---
sidebar_position: 9
---

# JSON

The `JSON` table converts between Lua values and JSON text. Use it to store tables in a database column or a file, to talk to web APIs with [Net.Fetch](../server/http.md), or to pass structured data to a webview page.

**Available on:** Server, Client

## Functions {#functions}

### JSON.Parse(text) {#jsonparsetext}

Parses a JSON text and returns the matching Lua value.

| JSON | Lua |
|---|---|
| object | table with string keys |
| array | table with keys `1..n` |
| string | string |
| number | number (every JSON number becomes a Lua number, a 64-bit float) |
| `true` / `false` | boolean |
| `null` | `nil` |

Because `null` becomes `nil`, an object member whose value is `null` is missing from the table, and a `null` inside an array leaves a hole (so `#t` may not count past it).

When the text is not valid JSON, `JSON.Parse` logs `JSON.Parse error: ...` and returns `nil`. Text nested deeper than 64 levels of arrays/objects raises a Lua error instead, so wrap the call in `pcall` when parsing data you don't control (for example something a client sent).

**Parameters**

| Name | Type | Description |
|---|---|---|
| text | string | the JSON text |

**Returns** the parsed value (`table`, `string`, `number`, `boolean`), or `nil` for invalid JSON and for the text `null`.

**Example**

```lua
local data = JSON.Parse('{"name": "Rico", "level": 12, "tags": ["admin", "vip"], "clan": null}')

print(data.name, data.level, data.tags[2], data.clan) -- Rico	12	vip	nil
```

```lua
-- server: parse untrusted text from a client safely
Net.AddEvent("settings:save", function(text)
	if type(text) ~= "string" or #text > 4096 then
		return
	end

	local ok, settings = pcall(JSON.Parse, text)

	if not ok or type(settings) ~= "table" then
		return
	end

	print("volume: " .. tostring(settings.volume))
end)
```

### JSON.Stringify(value) {#jsonstringifyvalue}

Converts a Lua value to compact JSON text (no spaces or line breaks).

| Lua | JSON |
|---|---|
| `nil` | `null` |
| boolean | `true` / `false` |
| number | a whole number that fits exactly (up to 2^53) is written as an integer (`3`, not `3.0`), others as a decimal. `nan` and infinities become `null` |
| string | string. Bytes that aren't valid UTF-8 are replaced instead of failing |
| table with keys exactly `1..n` | array |
| any other table, including an empty one | object. Number keys become strings (`[5] = "x"` gives `"5": "x"`) |
| `vec2`, `vec3`, `vec4` | array of the components, written as decimals: `vec3(1, 2, 3)` gives `[1.0,2.0,3.0]` |
| `quat` | array `[x, y, z, w]` |

An empty table becomes `{}`, not `[]`. A table with both array and string keys becomes an object. The order of an object's members follows Lua's table traversal, so it is not predictable.

`JSON.Stringify` raises a Lua error for values JSON can't hold: functions, other userdata (object handles, timers...), table keys that aren't strings or numbers, and tables nested deeper than 64 levels, which includes a table that contains itself.

**Parameters**

| Name | Type | Description |
|---|---|---|
| value | any | the value to convert, usually a table |

**Returns** `string`

**Example**

```lua
local text = JSON.Stringify({
	name = "Rico",
	position = vec3(10, 20.5, 30),
	weapons = { "pistol", "smg" },
	alive = true,
})

print(text) -- e.g. {"alive":true,"name":"Rico","position":[10.0,20.5,30.0],"weapons":["pistol","smg"]}
```

```lua
-- server: keep a table in a TEXT column
local function save_loadout(steam_id, loadout)
	SQL.Execute("INSERT OR REPLACE INTO loadouts (steam_id, data) VALUES (?, ?)", steam_id, JSON.Stringify(loadout))
end

local function load_loadout(steam_id)
	local text = SQL.QueryValue("SELECT data FROM loadouts WHERE steam_id = ?", steam_id)

	return text and JSON.Parse(text) or {}
end
```

```lua
-- object handles can't be written: send their net id instead
local vehicle = World.SpawnVehicle("v046_car_racingbuggy_civilian", vec3(0, 300, 0))

print(JSON.Stringify({ vehicle = vehicle:GetNetId() }))
```