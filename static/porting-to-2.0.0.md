# Porting resources to JC4MP on KrausNet

This guide is for server owners and script authors who have Lua resources written against the old JC4MP scripting API and want them to run on the current JC4MP, which now runs on the KrausNet networking and scripting layer. It walks through every change a resource may need, in the order you are likely to hit them, then lists every renamed, moved, changed and removed item of the old API, and ends with the problems that came up while porting the bundled `default-scripts` resources.

**Available on:** Server, Client

New to the current API? Read [Getting started](https://docs.jc4mp.com/get-started/first-resource) first. The full reference starts at the [docs index](https://docs.jc4mp.com/scripting-reference).

## Overview

What changed, in short:

- **Lua 5.4 became LuaJIT (Lua 5.1).** No integer subtype, no `//`, no bitwise operators (the `bit` library replaces them), no `utf8`, no `table.unpack`. Most scripts only need a handful of edits, but code that relied on integers or bit operations needs care. See [Sandbox](https://docs.jc4mp.com/shared/sandbox).
- **Scripts hold handles, not objects.** Every object a script sees (a player's character, a vehicle, an NPC...) is a typed handle (`PlayerObjectHandle`, `VehicleHandle`...) that is also an `ObjectHandle`. A handle never dangles: once the object is gone, or on a client once it has streamed out of range, its getters return `nil` and its setters do nothing. Lookups return plain `ObjectHandle`s that you cast with `AsPlayer()`, `AsVehicle()`... See [ObjectHandle](https://docs.jc4mp.com/shared/objects/object-handle).
- **Players are two handles.** `PlayerHandle` is the connection (name, Steam ID, ACL, kick, ping) and replaces the old `PlayerClient`. `PlayerObjectHandle` is the character in the world and replaces the old `NetPlayer`. The `Players` table moved into `World`. See [Player](https://docs.jc4mp.com/shared/objects/player).
- **Health is a fraction from 0 to 1** everywhere: getters, setters, spawn arguments, damage events. Max health is gone.
- **Functions that can fail return `ok, err`** (`true`, or `false` and a message) instead of an error string.
- **Renamed and removed functions and events.** `Net.SendToTarget` is `Net.SendToPlayer`, `GetNick` is `GetName`, `GetSteamId` is `GetUserId`, the damage events lost their `hitBone` argument, the built-in chat and every ImGui/2D drawing function are gone (all UI is now web pages in a [WebView](https://docs.jc4mp.com/client/ui)).
- **Resource starts and stops requested from inside an event, command or timer are queued** to the next update.
- **The sandbox is stricter on clients** (no `package`, no `loadfile`, bytecode refused) and more capable on the server (`ffi`).
- **Clients only have the objects near them.** Handles sent over the network arrive as `nil` when the receiver doesn't have the object.
- **Scripts sent to players are obfuscated with a per-server key**, and each server gets its own client cache.

Why it matters: an unported resource usually fails at load time (a `//` or `&` is a syntax error under LuaJIT, a call to `Players.GetJoined` raises "attempt to index a nil value"), but some changes are silent: a client `vehicle:GetType()` now returns the object type instead of the vehicle type, `obj:GetData(key)` returns `nil` instead of `false` for a missing key, health of `800` is now invalid, and `OnPlayerKilled` handlers that still declare `hitBone` read the weapon as the position. Go through every step below even if a resource loads without errors.

### Finding what to change

Search your resources for these patterns; each one points to a step below.

| Search for | Step |
|---|---|
| `//`, `&`, `\|`, `~`, `<<`, `>>`, `table.unpack`, `table.pack`, `utf8.`, `math.tointeger`, `math.type`, `math.atan(` with two arguments, `<const>`, `<close>`, `_ENV` | [2](#2-lua-syntax-lua-54-to-luajit) |
| `package.`, `loadfile`, `dofile`, `os.` | [3](#3-libraries-and-the-sandbox) |
| `Players.`, `GetNetPlayer`, `GetNick`, `GetSteamId`, `GetAclLevel`, `SetAclLevel`, `LocalClient`, `LocalPlayer` | [8](#8-players-playerhandle-and-playerobjecthandle), [17](#17-acl-permissions) |
| `SendToTarget`, `SendToTargets`, `Net.Send` in server scripts, `Net.Fetch` | [7](#7-net-messaging) |
| `OnPlayerKilled`, `OnPlayerDamage`, `OnVehicleDamage`, `OnVehicleDestroy`, `OnChat` | [6](#6-events) |
| `SetHealth`, `GetHealth`, `GetMaxHealth`, `SetMaxHealth`, `Respawn` | [12](#12-health-is-a-fraction-from-0-to-1) |
| `GetData`, `SetData` | [13](#13-the-object-data-store) |
| `SQL.` | [19](#19-sql) |
| `Chat.Print`, `Chat.IsTyping`, `UI.Begin`, `UI.Button`, `Render.Draw`, `Render.Fill`, `WindowFlags`, `TabItemFlag` | [21](#21-chat), [22](#22-ui-imgui-menus-become-webviews), [23](#23-2d-drawing-becomes-a-webview-overlay) |
| `Resources.Start`, `Resources.Stop`, `Resources.Restart`, `OnResourceStop` | [18](#18-resources) |
| `Local.SetSkin`, `Input.SetValue` | [14](#14-players-characters-and-weapons) |
| `:GetType()` on a vehicle in a client script | [15](#15-vehicles-mounted-guns-rigid-objects-and-npcs) |

## Step-by-step checklist

### 1. Folder layout and server configuration

Nothing to change. A resource is still a folder with `client/`, `server/` and/or `shared/` subfolders, there is still no manifest, and every `.lua` file is still its own script with its own Lua state. The server's `cfg/config.json` keeps the same keys (`name`, `port`, `key`, `steam_web_api_key`, `acl`, `startup_resources`, `required_dlcs`...). Two optional keys were added: `peer_timeout` (seconds before a silent player is dropped) and `crash_upload` (default `true`).

```json
{
	"startup_resources": [
		"chat",
		"freeroam"
	],
	"acl": {
		"76561198000000000": "owner"
	},
	"peer_timeout": 30
}
```

See [Resources](https://docs.jc4mp.com/shared/resources), [Resources (server)](https://docs.jc4mp.com/server/resources) and [Server console](https://docs.jc4mp.com/server/console).

### 2. Lua syntax: Lua 5.4 to LuaJIT

Scripts now run on LuaJIT 2.1, which is Lua 5.1 with a few extensions. Rewrite anything in this table:

| Lua 5.4 | LuaJIT |
|---|---|
| `a // b` | `math.floor(a / b)` |
| `a & b`, `a \| b`, `a ~ b`, `~a`, `a << n`, `a >> n` | `bit.band(a, b)`, `bit.bor(a, b)`, `bit.bxor(a, b)`, `bit.bnot(a)`, `bit.lshift(a, n)`, `bit.rshift(a, n)` (32-bit, see below) |
| `math.tointeger(x)`, `math.type(x)`, `math.maxinteger`, `math.mininteger` | don't exist: every number is a double, integers are exact up to 2^53 |
| `math.atan(y, x)` | `math.atan2(y, x)`. `math.atan` takes one argument and **silently ignores** the second |
| `math.random(0.0, 1.0)` for a random float | `math.random()` (with two arguments LuaJIT returns an integer) |
| `table.unpack(t)` | `unpack(t)` |
| `table.pack(...)` | `{ n = select("#", ...), ... }` |
| `utf8.char`, `utf8.len`... | no replacement, use string patterns |
| `string.pack`, `string.unpack`, `string.packsize` | no replacement |
| `local x <const> = 1`, `<close>` | plain `local x = 1` |
| `local _ENV = env` | `setfenv(fn, env)`, or `load(text, name, "t", env)` |
| `__pairs`, `__len`, `__close`, `__idiv` and bitwise metamethods on tables | ignored by LuaJIT |
| `string.format("%d", 3.7)` raises an error | it truncates to `3` |
| `tostring(10 / 2)` is `"5.0"` | it is `"5"`: there are no float-looking integers any more |

`goto` and labels, `table.move`, `math.pow`, `loadstring`, `unpack`, `setfenv`/`getfenv` and the `\u{...}` escape all work. `coroutine` is now available (the old API didn't load it).

Bit operations become calls to LuaJIT's `bit` library, loaded on both sides. It works on 32-bit integers, so values above 2^31 come back as different (negative or wrapped) numbers:

```lua
-- before (Lua 5.4)
local flags = FLAG_A | FLAG_B
local has_b = flags & FLAG_B ~= 0
local half = count // 2
local yaw = math.atan(dir.x, dir.z)
local t = table.unpack(list)
```

```lua
-- after (LuaJIT)
local flags = bit.bor(FLAG_A, FLAG_B)
local has_b = bit.band(flags, FLAG_B) ~= 0
local half = math.floor(count / 2)
local yaw = math.atan2(dir.x, dir.z)
local t = unpack(list)
```

Numbers above 2^53 lose precision. Keep IDs such as Steam IDs as strings (`client:GetUserId()` returns a string).

See [Sandbox](https://docs.jc4mp.com/shared/sandbox#lua-version) and [bit](https://docs.jc4mp.com/shared/sandbox#bit).

### 3. Libraries and the sandbox

| | Old | Server now | Client now |
|---|---|---|---|
| `package`, C modules | yes on both | yes | **removed** |
| `loadfile`, `dofile` | yes | source text only | **removed** |
| `load`, `loadstring` | yes | source text only, bytecode refused | source text only, bytecode refused |
| `string.dump` | yes | yes | **removed** |
| `ffi` | no | **new** | no |
| `jit` | no | yes | `on`, `off`, `flush`, `status`, `version`, `version_num`, `os`, `arch` |
| `os` | `time`, `date` | `time`, `date` (only C89 `%` specifiers) | `time`, `date` (only C89 `%` specifiers) |
| `coroutine` | no | yes | yes |
| `bit` | no | **new** | **new** |
| `io`, `debug`, `utf8` | no | no | no |

`math.random` is seeded per script state, so you can drop your `math.randomseed(os.time())`. An `os.date` format with a specifier outside `%a %A %b %B %c %d %H %I %j %m %M %p %S %U %w %W %x %X %y %Y %Z %%` now raises an error.

```lua
-- before (client)
local chunk = loadfile("data.lua")
local stamp = os.date("%F %T")
```

```lua
-- after (client): ship the data as a module and use C89 specifiers
local data = require("my-res.shared.data")
local stamp = os.date("%Y-%m-%d %H:%M:%S")
```

Also new: events, commands and timers can't nest deeper than 64 levels, and errors in timers are now reported instead of silently ignored. See [Sandbox](https://docs.jc4mp.com/shared/sandbox).

### 4. require

Module names are unchanged: dotted paths from the `resources` folder (`require("race.shared.config")`) or next to the requiring file (`require("tracks")`). What changed:

- On clients `require` is a restricted function, not the `package` one: there is no `package.loaded`, no `package.path`, names can't contain `..`, `\` or `:` or start with `/`, and each script state keeps its own cache. A module that returns `nil` runs again on the next `require`.
- On both sides modules must be Lua source; precompiled bytecode is refused.

```lua
-- before (client)
package.loaded["config"] = nil
local config = require("config")
```

```lua
-- after (client): there is no package table, require once at the top
local config = require("my-res.shared.config")
```

See [Sandbox: require](https://docs.jc4mp.com/shared/sandbox#require) and [Resources: require](https://docs.jc4mp.com/shared/resources#require).

### 5. Functions that can fail return ok, err

`Event.Add`, `Event.Remove`, `Net.AddEvent`, `Net.RemoveEvent`, `Cmd.Add`, `Cmd.Remove`, `Resources.Start`, `Resources.Stop` and `Resources.Restart` used to return a string: empty on success, the message on failure. Both are truthy in Lua, so `if Resources.Start(name) then` never detected a failure. They now return `true`, or `false` and the message.

```lua
-- before
local err = Resources.Start(name)
if err ~= "" then print("failed: " .. err) end
```

```lua
-- after
local ok, err = Resources.Start(name)
if not ok then print("failed: " .. err) end
```

`Cmd.Execute` (new) returns `true, ""` or `false, message`. The SQL functions return their result or `nil, message` (see [step 19](#19-sql)).

### 6. Events

The registry works as before (one handler per event name per script file, `Net.AddEvent` and `Event.Add` share names, `Event.Fire` also calls `Net.AddEvent` handlers), with these changes:

- Adding or removing a handler for an event while that event is being dispatched raises a Lua error. Remove a handler from inside its own event with a `Timer.Set(..., 0, 1)`.
- `Event.Fire` passes every object handle as the typed handle of its object (`PlayerObjectHandle`, `VehicleHandle`...), even one you passed as a plain `ObjectHandle`, and drops functions.
- **The damage events lost their `hitBone` argument**, the damage is a fraction of the maximum health, and the damager is a typed handle (`PlayerObjectHandle`, `VehicleHandle`, `NPCHandle`...) or `nil`. This applies to `OnPlayerDamage`, `OnPlayerKilled`, `OnVehicleDamage` and `OnVehicleDestroy` on both sides.
- `OnChat` now passes a `PlayerHandle` (server) or a `PlayerHandle`/`nil` (client) instead of the character.
- `OnPlayerJoin`, `OnPlayerQuit` and `OnPlayerResourceAction` pass a `PlayerHandle` instead of a `PlayerClient`. Clients now also get `OnPlayerJoin` and `OnPlayerQuit` for other players.
- `OnPlayerKilled` and `OnVehicleDestroy` fire once, on the hit that takes the health from above 0 to 0. Later hits on the dead player or destroyed vehicle only fire the damage events.
- `Event.Fire` returns `false` when one of its handlers called `Event.Cancel()`, `true` otherwise. `Event.Cancel()` only cancels the innermost event being dispatched.

```lua
-- before
Event.Add("OnPlayerKilled", function(player, damager, loss, hitBone, weapon, position)
	local killer = damager and damager:AsPlayer()

	if killer then
		Chat.Broadcast(killer:GetNick() .. " killed " .. player:GetNick() .. " (" .. loss .. " hp)")
	end
end)

Event.Add("OnChat", function(player, text)
	print(player:GetNick() .. ": " .. text)
end)
```

```lua
-- after
local function name_of(player)
	local client = player:GetClient()

	return client and client:GetName() or "?"
end

Event.Add("OnPlayerKilled", function(player, damager, damage, weapon, position)
	local killer = damager and damager:AsPlayer()

	if killer then
		Chat.Broadcast(name_of(killer) .. " killed " .. name_of(player) .. " (" .. math.floor(damage * 100) .. "%)")
	end
end)

Event.Add("OnChat", function(client, text)
	print(client:GetName() .. ": " .. text)
end)
```

See [Events](https://docs.jc4mp.com/shared/events), [Server events](https://docs.jc4mp.com/server/events) and [Client events](https://docs.jc4mp.com/client/events).

### 7. Net messaging

| Old | New |
|---|---|
| `Net.SendToTarget(pc, name, ...)` | `Net.SendToPlayer(client, name, ...)` |
| `Net.SendToTargets(list, name, ...)` | `Net.SendToPlayers(list, name, ...)` |
| `Net.Sender()` returns a `PlayerClient` | returns a `PlayerHandle` or `nil` |
| (none) | `Net.SendToPlayersVisibleTo(object, name, ...)` sends to the players that have `object` streamed in |

`Net.Broadcast`, `Net.Send` (client), `Net.AddEvent` and `Net.RemoveEvent` keep their names (the last two now return `ok, err`). The server never had `Net.Send`; a server script that called it must use `Net.SendToPlayer` or `Net.Broadcast`.

**`Net.Fetch` (server) no longer blocks.** The old `Net.Fetch(url, options?)` stopped the server until the answer came and returned the result. It now takes a callback as its last argument, `Net.Fetch(url, callback)` or `Net.Fetch(url, options, callback)`, returns nothing, and runs the request on another thread while the server keeps ticking. The callback gets the same `{ success, status, response }` table on the main thread once the request is done, and is never called if the resource stops first. The options are unchanged (passing them still makes the default method `POST`). Move the code that used the result into the callback:

```lua
-- before (server)
local result = Net.Fetch("https://api.example.com/v1/motd")

if result.status == 200 then
	Chat.Broadcast(result.response)
end
```

```lua
-- after (server)
Net.Fetch("https://api.example.com/v1/motd", function(result)
	if result.status == 200 then
		Chat.Broadcast(result.response)
	end
end)
```

What arrives on the other side changed:

- Every object handle arrives as the typed handle of its object (`PlayerObjectHandle`, `VehicleHandle`, `NPCHandle`...), also inside tables, so it has its type's methods without a cast. Old code that still calls `AsVehicle()`, `AsPlayer()`... on it keeps working. It arrives as `nil` when the receiver doesn't have the object (a client out of range of it).
- A `PlayerHandle` arrives as a `PlayerHandle`, or `nil` if the receiver doesn't know the player.
- Numbers are doubles, tables are limited to 64 levels and 65535 entries each, table keys must be strings shorter than 256 bytes or numbers, and one event must fit in 1 MB.
- Don't send your own client handle to identify yourself: the server knows the sender.

```lua
-- before, client
Net.Send("weapon", item.id, Players.LocalClient())

-- before, server
Net.AddEvent("weapon", function(weapon_id, player)
	player:GetNetPlayer():GiveWeapon(weapon_id, 500, WeaponSlot.Primary)
end)

Net.AddEvent("playSong", function(vehicle, song)
	Net.Send("playSong", vehicle, song)
end)
```

```lua
-- after, client
Net.Send("weapon", item.id)

-- after, server
Net.AddEvent("weapon", function(weapon_id)
	local client = Net.Sender()
	local player = client and client:GetPlayer()

	if player and type(weapon_id) == "string" then
		player:AsPlayer():GiveWeapon(weapon_id, 500, WeaponSlot.Primary)
	end
end)

Net.AddEvent("playSong", function(vehicle, song)
	Net.Broadcast("playSong", vehicle, song)
end)
```

```lua
-- after, client: a handle from the server can be nil
Net.AddEvent("playSong", function(vehicle, song)
	if not vehicle then return end

	Sound.Play3D(song, vehicle:GetPosition(), false)
end)
```

See [Net](https://docs.jc4mp.com/shared/net), [Net (server)](https://docs.jc4mp.com/server/net) and [Net (client)](https://docs.jc4mp.com/client/net).

### 8. Players: PlayerHandle and PlayerObjectHandle

The old `PlayerClient` (connection) became `PlayerHandle`, and the old `NetPlayer` (character) became `PlayerObjectHandle`. The `Players` table's lookups moved to `World`; on the client `Players` only keeps the name tag functions.

| Old | New |
|---|---|
| `Players.GetJoined()` | `World.GetPlayers()` (array of `PlayerHandle`) |
| `Players.GetCount()` | `#World.GetPlayers()` |
| `Players.GetRandom()` | `World.GetRandomClient()` (may not have joined yet), or `World.GetRandomPlayer()` for a character |
| `Players.LocalClient()` | `World.LocalClient()` |
| `Players.LocalPlayer()` | `World.LocalPlayer():AsPlayer()` (`World.LocalPlayer()` is `nil` before the join) |
| `pc:GetNetPlayer()`, client `pc:GetPlayer()` | `client:GetPlayer()`, a plain `ObjectHandle` or `nil` |
| `pc:GetNick()`, `player:GetNick()` | `client:GetName()`, `player:GetClient():GetName()` |
| `pc:GetSteamId()` | `client:GetUserId()` |
| `pc:GetPing()` (both sides) | `client:GetPing()`, server only, whole milliseconds |

```lua
-- before (server)
for _, pc in ipairs(Players.GetJoined()) do
	local player = pc:GetNetPlayer()

	print(pc:GetNick(), pc:GetSteamId(), pc:GetPing())
	player:Teleport(spawn)
end
```

```lua
-- after (server)
for _, client in ipairs(World.GetPlayers()) do
	local obj = client:GetPlayer()

	print(client:GetName(), client:GetUserId(), client:GetPing())

	if obj then
		obj:AsPlayer():Teleport(spawn)
	end
end
```

```lua
-- before (client)
local me = Players.LocalPlayer()
Net.Send("spawn", id, me:GetAimPosition())
```

```lua
-- after (client)
local me = World.LocalPlayer()

if me then
	Net.Send("spawn", id, me:AsPlayer():GetAimPosition())
end
```

On a client, `World.GetPlayers()` lists every joined player, but `client:GetPlayer()` is `nil` for players whose character isn't streamed in. Clients have no pings any more: if a scoreboard shows them, have the server send them (see [pitfalls](#common-pitfalls)).

See [Player](https://docs.jc4mp.com/shared/objects/player), [Player (server)](https://docs.jc4mp.com/server/objects/player), [Player (client)](https://docs.jc4mp.com/client/objects/player), [Players](https://docs.jc4mp.com/shared/objects/players) and [Players (client)](https://docs.jc4mp.com/client/objects/players).

### 9. Handles, casts and comparisons

Every object reference is a handle. Lookups (`World.GetObjectByNID`, `World.GetAllByType`, `World.GetRandomPlayer`, `World.LocalPlayer`, `client:GetPlayer()`) return a plain `ObjectHandle` with only the base methods: cast it. Spawn functions, built-in event arguments and handles received over `Net` or `Event.Fire` are already typed (casting them again with `As*` is harmless).

```lua
-- before
local obj = World.GetObjectByNID(nid)
obj:SetLocked(true) -- the old object already had its type's methods
```

```lua
-- after
local obj = World.GetObjectByNID(nid)
local vehicle = obj and obj:AsVehicle()

if vehicle then
	vehicle:SetLocked(true)
end
```

Comparisons: two handles are equal with `==` when they refer to the same object, whatever their kinds, so a `PlayerObjectHandle` and a plain `ObjectHandle` to the same player are equal. Handles are userdata, so two handles to the same object are still different table keys: key your tables by `GetNetId()` or, for players, by `GetUserId()`.

```lua
-- before
squads[player] = squad
if victim == killer then print("suicide") end
```

```lua
-- after
squads[client:GetUserId()] = squad
if victim == killer then print("suicide") end
```

See [ObjectHandle](https://docs.jc4mp.com/shared/objects/object-handle#comparing-handles).

### 10. Streaming: client objects only exist in range

A client only has the objects within about 1 km of its player (2000 m × 2000 m of 400 m cells around it; sandstorms everywhere). Outside that range `World.GetObjectByNID` returns `nil`, `World.GetAllByType` doesn't list the object, handles to it return `nil` from their getters, and handles sent to that client arrive as `nil`. A handle starts working again when the object streams back in. Client getters that read the game entity (`IsInAir`, `GetAimPosition`...) also return `nil` for a moment after the object streams in.

Old code that kept vehicles in a table and read them every frame must handle `nil`:

```lua
-- before (client)
Event.Add("OnUpdate", function()
	for vehicle, channel in pairs(songs) do
		channel:Set3DAttributes(vehicle:GetPosition(), vehicle:GetVelocity())
	end
end)
```

```lua
-- after (client)
Event.Add("OnUpdate", function()
	for vehicle, channel in pairs(songs) do
		local position = vehicle:GetPosition()

		if position then
			channel:Set3DAttributes(position, vehicle:GetVelocity())
		else
			songs[vehicle] = nil -- streamed out or destroyed
		end
	end
end)
```

When a client needs data about a far object (another player's position for a "warp to" button), ask the server, which always has every object. See [World: streaming](https://docs.jc4mp.com/shared/world#streaming-objects-only-exist-where-they-are-needed).

### 11. Spawning objects

Spawn functions keep their names and argument order but return typed handles, and their optional arguments are checked:

- `rotation` is a `vec3` of Euler angles in **degrees**. A `quat` raises an error; set a quaternion afterwards with `SetRotation`.
- `health` (the old fifth/fourth argument, which was ignored) is now applied and must be 0..1.
- Positions, rotations and sizes must be finite numbers, strings (model ids) at most 255 characters, enum arguments valid values. Anything else raises a Lua error instead of sending garbage.
- `World.SpawnTether` returns `nil` when an end object is gone.
- `World.Destroy(obj)` returns `true`/`false` and refuses players (kick them instead).
- New on the server: `World.SpawnExplosion(position, entity)` and `World.SpawnSandstorm(position, size, windSpeed, rotation?)`. New on the client: `World.SpawnWaterBox` and `World.SpawnForcePulse`, plus `GameObject:Destroy()` for client game objects.

```lua
-- before (server)
local rot = quat(0, math.sin(half_yaw), 0, math.cos(half_yaw))
local veh = World.SpawnVehicle(model, pos, rot)
veh:SetMaxHealth(5000)
veh:SetHealth(5000)
```

```lua
-- after (server)
local veh = World.SpawnVehicle(model, pos, vec3(0, math.deg(yaw), 0), 1)
```

Objects a resource spawns are still destroyed when it stops. See [World (server)](https://docs.jc4mp.com/server/world), [World (client)](https://docs.jc4mp.com/client/world) and the [vehicle](https://docs.jc4mp.com/lists/vehicles), [NPC](https://docs.jc4mp.com/lists/npcs) and [rigid object](https://docs.jc4mp.com/lists/rigid-objects) lists.

### 12. Health is a fraction from 0 to 1

Health used to be raw game units (players 800, NPCs 500, mounted guns and rigid objects 2000, vehicles per model). It is now `0` (dead or destroyed) to `1` (full) on every object, on both sides. `GetMaxHealth` and `SetMaxHealth` are gone, and the damage events report the lost fraction.

| Old | New |
|---|---|
| `player:SetHealth(800)` | `player:SetHealth(1)` |
| `vehicle:SetHealth(-10000)` (to destroy) | `vehicle:SetHealth(0)` |
| `obj:GetHealth() / obj:GetMaxHealth()` | `obj:GetHealth()` |
| `player:Respawn(pos, 100, 800)` (health in percent, max health) | `player:Respawn(pos, 1)` |
| `loss` in damage events (units) | `damage` (fraction) |

`SetHealth`, `Respawn` and the spawn functions raise a Lua error for a health outside 0..1, so convert and clamp old values yourself:

```lua
-- before: a UI that asks for 0-800
targetPlayer:SetHealth(hp)
```

```lua
-- after
targetPlayer:SetHealth(math.max(0, math.min(hp / 800, 1)))
```

See [ObjectHandle](https://docs.jc4mp.com/shared/objects/object-handle) and [ObjectHandle (server)](https://docs.jc4mp.com/server/objects/object-handle).

### 13. The object data store

`GetData`/`SetData` used to be a local table on each side that was never synced, and `GetData` returned `false` for a missing key. Now:

- `obj:GetData(key)` returns `nil` for a missing key (a stored `false` stays `false`). Its second argument, if your code passed a default, is ignored: use `or`.
- On the server, `obj:SetData(key, value, broadcast)` takes a third argument. With `true` the value is sent to every client that sees the object (and to those that see it later), so client scripts can read it. With `false` it stays on the server.
- `SetData(key, nil, ...)` removes the key (it used to fail).
- It returns `true`/`false`. Keys are 1 to 64 bytes, strings at most 1024 bytes, at most 128 keys and 8 KB per object, and only strings, numbers, booleans, `vec2`, `vec3`, `vec4` and `quat` can be stored (store a handle's `GetNetId()`).
- On a client, `SetData(key, value)` only changes that client's copy.
- The store belongs to the object, shared by every resource: prefix your keys.

```lua
-- before (server)
if player:GetData("robber", false) then ... end
player:SetData("robber", true)
```

```lua
-- after (server)
if player:GetData("cnr.robber") then ... end
player:SetData("cnr.robber", true, true) -- also visible to client scripts
player:SetData("cnr.robber", nil, true) -- removed everywhere
```

See [ObjectHandle](https://docs.jc4mp.com/shared/objects/object-handle) and [ObjectHandle (server)](https://docs.jc4mp.com/server/objects/object-handle).

### 14. Players' characters and weapons

The character methods keep their names. Changes:

- `player:GetNick()` is gone: `player:GetClient():GetName()` (`GetClient` can return `nil`).
- `player:Respawn(position?, health?)`, health 0..1 (see [step 12](#12-health-is-a-fraction-from-0-to-1)).
- `player:WarpIntoVehicle(vehicle, seat)` needs a `VehicleHandle` and a valid `VehicleSeat` value: a typo such as `VehicleSeat.Driver` (which is `nil`) now raises an error instead of doing nothing. The player's own game must have the vehicle streamed in for the warp to happen.
- Weapon slots, modes and ammo types are validated: `GiveWeapon(name, ammo, slot)` with a `nil` slot raises an error.
- **`Local.SetSkin` is gone: clients can no longer change their own skin.** Only the server's `player:SetSkin(skin)` can. A client that wants a skin sends a request (`Net.Send("skin", name)`) and the server decides and applies it (see the example below and the [skins list](https://docs.jc4mp.com/lists/skins#changing-the-skin-from-a-client)).
- `Input.SetValue(action)` is now `Local.PlayAction(action)`, with the same behavior: the local character performs an [`Action`](https://docs.jc4mp.com/client/enums/action).
- New on the server: `player:PlayAnimation(animation, loop?)`, `player:StopAnimation()`; on both sides `player:GetAnimation()`. On the client, `Local.PlayAnimation`, `Local.StopAnimation`, `Local.SetHoverboardEnabled` and `Local.IsHoverboardEnabled`.
- Client methods that read the game character (`GetAimPosition`, `IsRagdolling`...) return `nil` until the character has spawned in the game.

```lua
-- before (server)
robber:WarpIntoVehicle(car, VehicleSeat.Driver)
robber:GiveWeapon(weapon, 500)
```

```lua
-- after (server)
robber:WarpIntoVehicle(car, VehicleSeat.DriverSeat)
robber:GiveWeapon(weapon, 500, WeaponSlot.Primary)
```

```lua
-- before (client)
Local.SetSkin("mira")
Input.SetValue(Action.Crouch)
```

```lua
-- after (client)
Net.Send("skin", "mira")
Local.PlayAction(Action.Crouch)

-- after (server)
Net.AddEvent("skin", function(name)
	local client = Net.Sender()
	local player = client and client:GetPlayer()

	if player and type(name) == "string" then
		player:AsPlayer():SetSkin(name)
	end
end)
```

See [Player (server)](https://docs.jc4mp.com/server/objects/player), [Player (client)](https://docs.jc4mp.com/client/objects/player), [Local](https://docs.jc4mp.com/client/local), the [weapon enums](https://docs.jc4mp.com/shared/enums/weapon) and the [weapons](https://docs.jc4mp.com/lists/weapons), [skins](https://docs.jc4mp.com/lists/skins) and [animations](https://docs.jc4mp.com/lists/animations) lists.

### 15. Vehicles, mounted guns, rigid objects and NPCs

- **Client `vehicle:GetType()` now returns the object type** (`NetObjectType.Vehicle`), like on every other object. The vehicle type (car, helicopter...) is `vehicle:GetVehicleType()`. Code comparing `GetType()` with `VehicleType.*` silently stops matching.
- `vehicle:GetTrailingVehicle()` returns a `VehicleHandle` or `nil`.
- Paint values must be finite; the colors take three numbers from 0 to 1.
- Mounted guns now have a `MountedGunHandle` with `GetId()`.
- New: vehicle drone orders on the server (`DroneFlyTo`, `DroneFollow`, `DroneAimAt`, `DroneStopAiming`, `DroneSetFiring`), NPC combat orders (`GiveWeapon`, `AimAt`, `StopAiming`, `SetFiring`, `ThrowGrenade`, `Melee`), sandstorms (`SandstormHandle`).

```lua
-- before (client)
if vehicle:GetType() == VehicleType.Helicopter then ... end
veh:SetPrimaryColor(math.random(0.0, 1.0), math.random(0.0, 1.0), math.random(0.0, 1.0))
```

```lua
-- after (client)
if vehicle:GetVehicleType() == VehicleType.Helicopter then ... end
veh:SetPrimaryColor(math.random(), math.random(), math.random())
```

See [VehicleHandle](https://docs.jc4mp.com/shared/objects/vehicle), [MountedGunHandle](https://docs.jc4mp.com/shared/objects/mounted-gun), [RigidObjectHandle](https://docs.jc4mp.com/shared/objects/rigid-object), [NPCHandle](https://docs.jc4mp.com/shared/objects/npc), [TetherHandle](https://docs.jc4mp.com/shared/objects/tether), [SandstormHandle](https://docs.jc4mp.com/shared/objects/sandstorm) and the [vehicle enums](https://docs.jc4mp.com/shared/enums/vehicle).

### 16. Weather and sandstorms

`Weather.SyncAct` and `Weather.SyncProperty` keep their names and arguments, but:

- The server now remembers the tornado and the last value of every property and sends them to players who join later. You no longer need to resend the weather in `OnPlayerJoin`.
- Cloud property values are sent as numbers; the old API truncated them to integers, so fractional values that did nothing before now apply.
- `TornadoState` values and every argument are checked: a wrong value raises an error.
- Sandstorms are objects now: `World.SpawnSandstorm(position, size, windSpeed, rotation?)` instead of a weather property, removed with `World.Destroy`.

```lua
-- before (server)
Net.AddEvent("setSandstorm", function(position)
	Weather.SyncProperty(WeatherProperty.SandstormPosition, position)
end)
```

```lua
-- after (server)
local storms = {}

Net.AddEvent("spawnSandstorm", function(position)
	local client = Net.Sender()

	if client and client:HasAcl(AclLevel.Admin) then
		storms[#storms + 1] = World.SpawnSandstorm(position + vec3(0, 150, 0), vec3(2000, 600, 1000), 45)
	end
end)
```

See [Weather](https://docs.jc4mp.com/shared/weather), [Weather (server)](https://docs.jc4mp.com/server/weather), [Weather (client)](https://docs.jc4mp.com/client/weather) and the [weather enums](https://docs.jc4mp.com/shared/enums/weather).

### 17. ACL permissions

`AclLevel` is now available on both sides, and so are `GetAcl`/`HasAcl`, so client scripts can show staff badges.

| Old | New |
|---|---|
| `AclLevel.Normal` | `AclLevel.Default` |
| `pc:GetAclLevel()` | `client:GetAcl()` (flags) |
| `pc:GetAclLevel() == AclLevel.Admin` | `client:HasAcl(AclLevel.Admin)` |
| `pc:SetAclLevel(level)` | `client:SetAcl(flags)` |

The levels are bit flags, not a ladder. Test each level you accept:

```lua
-- before
local acl = sender:GetAclLevel()
if acl == AclLevel.Admin or acl == AclLevel.Owner then ... end
```

```lua
-- after
if sender:HasAcl(AclLevel.Admin) or sender:HasAcl(AclLevel.Owner) then ... end
```

See [AclLevel](https://docs.jc4mp.com/shared/enums/acl-level).

### 18. Resources

- `Resources.Start`, `Resources.Stop` and `Resources.Restart` return `ok, err` ([step 5](#5-functions-that-can-fail-return-ok-err)).
- Called from an event handler, a command or a timer, they are **queued** and run at the next update. They return `true` right away, and a failure is only logged. The `OnResourceStart`/`OnResourceStop` of the queued action come later, not before the call returns.
- `OnResourceStart` and `OnResourceStop` fire in every resource for every resource. A handler that doesn't compare `name` with `Resource.Name` reacts to other resources stopping.
- `Resources.GetAll()` returns a plain array. `ResourceStatus.Starting` is new.

```lua
-- before (server)
local err = Resources.Restart(name)
Net.SendToTarget(sender, "result", "Resource '" .. name .. "' restarted")

Event.Add("OnResourceStop", function()
	endRound()
end)
```

```lua
-- after (server)
local ok, err = Resources.Restart(name)
Net.SendToPlayer(sender, "result", ok and ("Sent restart to '" .. name .. "'") or ("Failed: " .. tostring(err)))

Event.Add("OnResourceStop", function(name)
	if name == Resource.Name then
		endRound()
	end
end)
```

See [Resources](https://docs.jc4mp.com/shared/resources) and [Resources (server)](https://docs.jc4mp.com/server/resources).

### 19. SQL

| Old | New |
|---|---|
| `SQL.Execute(sql, ...)` returns `{ success, error, changes, last_insert_id }` | returns `{ changes, last_insert_id }`, or `nil, err` |
| `SQL.Query(sql, ...)` returns rows (an empty table on error) | returns rows, or `nil, err` |
| `SQL.ExecuteAsync(sql, ..., callback)`, `SQL.QueryAsync(sql, ..., callback)` (if your build had them) | no replacement: use the synchronous `SQL.Execute` / `SQL.Query` |

New: `SQL.QueryRow`, `SQL.QueryValue`, `SQL.ExecuteScript`, `SQL.Transaction`, `SQL.TableExists`, `SQL.Null` and `SQL.Blob`, and parameter tables with named parameters. Every failing statement is also logged in the server console, so statements that used to fail quietly (an `INSERT` of an existing key) now print errors: write `INSERT OR IGNORE` when that is intended.

```lua
-- before
local result = SQL.Execute("INSERT INTO accounts (steam_id) VALUES (?)", steam_id)

if not result.success then
	print(result.error)
end

SQL.QueryAsync("SELECT * FROM vehicles", function(rows, err)
	send(rows)
end)
```

```lua
-- after
local result, err = SQL.Execute("INSERT OR IGNORE INTO accounts (steam_id) VALUES (?)", steam_id)

if not result then
	print(err)
end

local rows, query_err = SQL.Query("SELECT * FROM vehicles")

send(rows or {})
```

See [SQL](https://docs.jc4mp.com/server/sql).

### 20. JSON

`JSON.Parse` and `JSON.Stringify` keep their names. Changes:

- Every number parsed is a Lua number (there are no integers in LuaJIT anyway).
- `JSON.Stringify` writes `vec2`, `vec3`, `vec4` and `quat` as arrays (`[x, y, z]`). Other userdata, functions and non-string, non-number keys now raise an error, where the old version wrote the string `"unsupported_type"` or returned `"{}"`.
- Nesting deeper than 64 levels raises an error both ways. Wrap untrusted input in `pcall`.

```lua
-- before
local text = JSON.Stringify({ pos = player:GetPosition() }) -- {"pos":"unsupported_type"}
```

```lua
-- after
local text = JSON.Stringify({ pos = player:GetPosition() }) -- {"pos":[x,y,z]}
local ok, data = pcall(JSON.Parse, untrusted)
```

See [JSON](https://docs.jc4mp.com/shared/json).

### 21. Chat

The game no longer has a built-in chat: chat windows are resources (the bundled `chat`, or your own). The client `Chat` table is gone. The server keeps `Chat.Broadcast(text)`, which reaches the clients' `OnChat(nil, text)` handlers.

| Old (client) | New |
|---|---|
| `Chat.Print(text)` | fire your chat resource's event, e.g. `Event.Fire("AddChatMessage", { parts = { { text = text } } })` for the chat used by the default scripts, or `print` |
| `Chat.IsTyping()` | no replacement: a focused chat webview takes all keys, so key events don't fire while typing |
| `Chat.IsEnabled()`, `Chat.SetEnabled(enabled)` | no replacement: control your chat resource |

```lua
-- before (client)
Event.Add("OnKeyUp", function(key)
	if Chat.IsTyping() then return end

	if key == Key.P then toggle() end
end)

Net.AddEvent("result", function(msg)
	Chat.Print(msg)
end)
```

```lua
-- after (client)
Event.Add("OnKeyUp", function(key)
	if key == Key.P then toggle() end
end)

Net.AddEvent("result", function(msg)
	Event.Fire("AddChatMessage", { parts = { { text = msg } } })
end)
```

Typed `/commands` are run by the chat resource with `Cmd.Execute` (see [step 25](#25-commands)). See [Chat](https://docs.jc4mp.com/server/chat).

### 22. UI: ImGui menus become webviews

Every ImGui function of the `UI` table is gone (`UI.Begin`, `UI.Button`, `UI.BeginTable`...), as are the `WindowFlags` and `TabItemFlag` tables and the `UI.WindowFlags_*`, `UI.TableFlags_*` and `UI.TableColumnFlags_*` constants. Only `UI.GetMousePos()` and `UI.SetCursorVisible(visible)` remain. Menus are now HTML pages shown in a `WebView`: the Lua side opens and closes the page and exchanges messages with it.

```lua
-- before (client)
Event.Add("OnRender", function()
	if not open then return end

	if UI.Begin("Spawn Menu", WindowFlags.NoCollapse) then
		for i, item in ipairs(items) do
			if UI.Button(item.name .. "##" .. i) then
				Net.Send("spawn", item.id)
			end
		end

		UI.End()
	end
end)
```

```lua
-- after (client)
local webview = WebView.Create("spawn-menu", {
	url = "resource://spawn-menu/client/ui.html",
	size = Render.GetSize(),
	visible = false,
})

local function set_open(value)
	open = value
	Input.SetEnabled(not open)
	UI.SetCursorVisible(open)
	WebView.SetVisible(webview, open)
	WebView.SetInputEnabled(webview, open)

	if open then
		WebView.BringToFront(webview)
		WebView.Focus(webview)
	else
		WebView.BlurAll()
	end
end

WebView.SetMessageHandler(webview, function(event, data)
	if event == "close" then
		set_open(false)
	elseif event == "spawn" then
		Net.Send("spawn", items[data.index].id)
	end
end)

WebView.SendMessage(webview, "init", { items = items })
```

```html
<!-- spawn-menu/client/ui.html -->
<ul id="list"></ul>
<script>
	JC4MP.on("init", (data) => {
		data.items.forEach((item, i) => {
			const li = document.createElement("li")
			li.textContent = item.name
			li.onclick = () => JC4MP.sendMessage("spawn", { index: i + 1 })
			document.getElementById("list").appendChild(li)
		})
	})

	// the game gets no keys while the page is focused: the page closes itself
	addEventListener("keydown", (e) => { if (e.key === "Escape") JC4MP.sendMessage("close") })
</script>
```

While a webview is focused the game receives no input, so the page must offer a way to close (a button or Escape). See [UI and WebView](https://docs.jc4mp.com/client/ui#typical-open-and-close-pattern) and [WebView pages (JavaScript)](https://docs.jc4mp.com/client/webview).

### 23. 2D drawing becomes a webview overlay

The `Render` drawing functions are gone (`DrawLine`, `DrawTriangle`, `FillTriangle`, `DrawRect`, `FillRect`, `FillRectMultiColor`, `DrawCircle`, `FillCircle`, `DrawEllipse`, `FillEllipse`, `DrawPolygon`, `FillPolygon`, `DrawText`, `SetClip`). `Render.GetSize()` and `Render.DrawSphere()` remain. Draw HUDs, text and markers in a full-screen webview with input disabled, and send it what to draw. `OnRender` still fires every frame, so world-to-screen projections can be sent from there.

```lua
-- before (client)
Event.Add("OnRender", function()
	Render.FillRect(vec2(10, 10), vec2(200, 40), vec4(0, 0, 0, 0.5))
	Render.DrawText("Score: " .. score, vec2(20, 20), 16, vec4(1, 1, 1, 1), false)
end)
```

```lua
-- after (client)
local hud = WebView.Create("my-hud", {
	url = "resource://my-hud/client/hud.html",
	size = Render.GetSize(),
	visible = true,
	input_enabled = false,
})

local function set_score(value)
	score = value
	WebView.SendMessage(hud, "score", score)
end
```

Read game data that is only valid on the update thread (such as `Client.GetNetStats()`) in `OnUpdate`, not `OnRender`. See [Render](https://docs.jc4mp.com/client/render) and [Camera](https://docs.jc4mp.com/client/camera).

### 24. WebView changes

The `WebView` functions keep their names and still identify webviews by string id, and the page's `window.JC4MP` bridge (`sendMessage`, `on`, `off`, `onMessage`, `getWebViewId`, `isAvailable`, `jc4mp:<event>` DOM events) is the same. Pages now run in Chromium (CEF) with these differences:

- A webview belongs to the resource that created it. Other resources' webviews can't be touched, and every webview is destroyed when its resource stops.
- `resource://` URLs may only name the calling resource's own files, and pages can only load their own resource's files. `http://`, `file://`, `data:` pages and private network `https://` hosts are refused.
- `WebView.Create("", config)` generates an id. Ids are global, so prefix them with your resource name.
- The bridge exists before the page's scripts run (no need to wait for it), only in the top document (not in iframes), and messages sent before the page loaded are queued. Payloads are limited to 4 MB of JSON.
- `localStorage`, `sessionStorage`, `indexedDB`, workers, `alert`/`confirm`/`prompt`, pop-ups and the clipboard are disabled. Keep state in Lua and use `Input.GetClipboard`/`Input.SetClipboard`.

```js
// before: a page that waited for the bridge and saved settings locally
const settings = JSON.parse(localStorage.getItem("settings") || "{}")
```

```js
// after: Lua sends the settings, the page asks Lua to keep them
JC4MP.on("settings", (settings) => apply(settings))
JC4MP.sendMessage("save_settings", { volume: 0.5 })
```

See [UI and WebView](https://docs.jc4mp.com/client/ui) and [WebView pages (JavaScript)](https://docs.jc4mp.com/client/webview).

### 25. Commands

`Cmd.Add` and `Cmd.Remove` return `ok, err`, and a command can't add or remove a handler of itself while it runs. New: `Cmd.Execute(name, args?)` runs a command (every handler in every resource) and returns `ok, err`, which is how chat resources run `/name args`. The built-in `dbg` and `cldbg` commands toggle and clear the script debugger. A handler can report bad usage with `error(...)`.

```lua
-- before (client): commands typed in the built-in chat ran directly
Cmd.Add("tp", function(x, y, z) ... end)
```

```lua
-- after (client): a chat resource turns "/tp 1 2 3" into
local ok, err = Cmd.Execute("tp", { "1", "2", "3" })

if not ok then
	print(err)
end
```

See [Commands](https://docs.jc4mp.com/client/commands).

### 26. Timers

`Timer.Set(fn, interval, times, ...)` and `Timer.Kill(timer)` keep their signatures (`times` of `0` or less still repeats forever). Two changes:

- **A timer callback can't create timers.** `Timer.Set` from inside a timer, or from anything a timer triggers, raises `Timers cannot be created from inside a timer callback`. Use one repeating timer with state instead.
- Errors inside a timer are now reported (console and script debugger) and the timer keeps running.

```lua
-- before (server): a countdown that scheduled the next step from each step
local function step(n)
	Chat.Broadcast(n)

	if n > 0 then
		Timer.Set(step, 1000, 1, n - 1)
	end
end

step(3)
```

```lua
-- after (server)
local n = 3

Timer.Set(function()
	Chat.Broadcast(n > 0 and tostring(n) or "GO!")

	n = n - 1
end, 1000, 4)
```

See [Timer](https://docs.jc4mp.com/shared/timer).

### 27. Join order and the first messages

On the server, a joining player's client starts its resources **before** it joins, so `OnPlayerResourceAction` comes before `OnPlayerJoin`, while `client:GetPlayer()` is still `nil`. `Net.SendToPlayer` answers to a player that hasn't joined are dropped. On the client, scripts start before `OnClientJoin`.

```lua
-- before (server)
Event.Add("OnPlayerResourceAction", function(pc, name, action)
	if name == Resource.Name and action == ResourceAction.Start then
		respawnPlayer(pc:GetNetPlayer())
	end
end)
```

```lua
-- after (server)
Event.Add("OnPlayerResourceAction", function(client, name, action)
	local player = client:GetPlayer()

	-- during the join there is no character yet: OnPlayerJoin handles those players
	if name == Resource.Name and action == ResourceAction.Start and player then
		respawnPlayer(player:AsPlayer())
	end
end)

Event.Add("OnPlayerJoin", function(client)
	respawnPlayer(client:GetPlayer():AsPlayer())
end)
```

```lua
-- after (client): ask the server for initial state once joined
local function request_state()
	Net.Send("my-res:state")
end

Event.Add("OnClientJoin", request_state)

-- the resource (re)started while already in game: no OnClientJoin will come
if World.LocalPlayer() then
	request_state()
end
```

See [Server events](https://docs.jc4mp.com/server/events) and [Net (client)](https://docs.jc4mp.com/client/net#netsendname-).

### 28. Enums and argument checks

- Enum arguments are checked against their range everywhere (`WeaponSlot`, `VehicleSeat`, `VehiclePart`, `RigidObjectMotionType`, `MoveType`, `WeatherAct`, `Key` in `Input.IsKeyDown`...). A `nil` (a misspelled enum name) or out-of-range value raises a Lua error.
- Floats and vectors sent to objects must be finite: `NaN` or infinity raises an error.
- Strings that objects sync (model ids, skins, animations, weapon names) are at most 255 characters.
- `Key` is now available on the server too, and `AclLevel` on the client.
- New enum tables: `WaterBoxStyle`, `ForcePulseCategory`, `ForcePulseTuning`, `RoadGraphType` (client), `NetObjectType.Sandstorm`, `ResourceStatus.Starting`.

```lua
-- before: a typo did nothing
player:WarpIntoVehicle(vehicle, VehicleSeat.Driver)
```

```lua
-- after: the typo raises a Lua error; use the real name
player:WarpIntoVehicle(vehicle, VehicleSeat.DriverSeat)
```

See the [enums index](https://docs.jc4mp.com/shared/enums/).

### 29. Script protection and the client cache

Client and shared Lua files are still obfuscated before they are sent, but the key is now per server: it is derived from the server's `steam_web_api_key`, so it stays the same across restarts and changes when that key changes. Each server has its own cache on the players' computers, cleared when its key changes. Nothing changes in your scripts, but the rule stays: never put secrets in `client/` or `shared/` files. See [Script protection](https://docs.jc4mp.com/shared/resources#script-protection).

## Reference tables

Every global table, function, method, event, enum and constant of the old API that was renamed, moved, changed or removed. Items that kept their name, arguments and behavior are not listed. "Side" is S (server), C (client) or both.

### Global tables

| Old | Side | New |
|---|---|---|
| `Players` | both | lookups moved to `World` (see below); the client `Players` table keeps only `SetTagsEnabled` and `AreTagsEnabled`; the server has no `Players` |
| `PlayerClient` (type) | both | `PlayerHandle` |
| `NetObjectBase`, `NetObject` (types) | both | `ObjectHandle` |
| `NetPlayer`, `NetPlayerBase` (types) | both | `PlayerObjectHandle` |
| `NetVehicle`, `NetVehicleBase` (types) | both | `VehicleHandle` |
| `NetMountedGun` (type) | both | `MountedGunHandle` |
| `NetRigidObject`, `NetRigidObjectBase` (types) | both | `RigidObjectHandle` |
| `NetNPC`, `NetNPCBase` (types) | both | `NPCHandle` |
| `NetTether` (type) | both | `TetherHandle` |
| `ResourceBase` (type) | both | `Resource` (methods unchanged) |
| `Chat` | C | removed: no built-in chat, use a chat resource |
| `Chat` | S | unchanged (`Chat.Broadcast`) |
| `UI` | C | only `GetMousePos` and `SetCursorVisible` remain, see [UI](#ui-and-render) |
| `WindowFlags` | C | removed, no replacement (WebView) |
| `TabItemFlag` | C | removed, no replacement (WebView) |
| `Key` | C | moved to both sides |
| `AclLevel` | S | moved to both sides, `Normal` renamed `Default` |
| `package` | C | removed |
| `coroutine` | both | added |
| `ffi`, `jit` | S | added (`jit` partly on C) |
| `bit32` (requested, not available in Lua 5.4) | both | not available; use LuaJIT's `bit` instead |
| `bit` | both | added |

### Language and standard library

| Old (Lua 5.4) | New (LuaJIT) |
|---|---|
| `//` operator | `math.floor(a / b)` |
| `&`, `\|`, `~`, `<<`, `>>` operators | `bit.band`, `bit.bor`, `bit.bxor`/`bit.bnot`, `bit.lshift`, `bit.rshift` (32-bit) |
| integer subtype | none, every number is a double |
| `math.tointeger`, `math.type`, `math.maxinteger`, `math.mininteger`, `math.ult` | no replacement |
| `math.atan(y, x)` | `math.atan2(y, x)` (`math.atan` ignores a second argument) |
| `math.random(m, n)` with floats | `math.random()` for floats; with two arguments it returns an integer |
| `table.unpack` | `unpack` |
| `table.pack` | no replacement, `{ n = select("#", ...), ... }` |
| `utf8` | no replacement |
| `string.pack`, `string.unpack`, `string.packsize` | no replacement |
| `<const>`, `<close>` | no replacement |
| `_ENV` | `setfenv`, `load(text, name, "t", env)` |
| `__pairs`, `__len` (tables), `__close`, `__idiv`, `__band` and other bitwise metamethods | ignored |
| `string.format("%d", x)` with a fractional `x` raised an error | truncates |
| `tostring(1.0)` was `"1.0"` | `"1"` |
| `load`/`loadstring` accepted bytecode | source text only |
| `loadfile`, `dofile` (C) | removed |
| `loadfile`, `dofile` (S) | source text only |
| `string.dump` (C) | removed |
| `os.date` with any specifier | only C89 specifiers, others raise an error |
| `math.random` unseeded | seeded per script state |
| `require` (C) through `package` | restricted `require`, no `package.loaded`/`package.path` |

### Return values

| Old | Side | New |
|---|---|---|
| `Event.Add(name, fn)` returned `""` or an error string | both | `true` or `false, err`; raises an error while `name` is dispatching |
| `Event.Remove(name)` returned `""` or an error string | both | `true` or `false, err`; raises an error while `name` is dispatching |
| `Net.AddEvent(name, fn)` returned `""` or an error string | both | `true` or `false, err` |
| `Net.RemoveEvent(name)` returned `""` or an error string | both | `true` or `false, err` |
| `Cmd.Add(name, fn)` returned `""` or an error string | C | `true` or `false, err` |
| `Cmd.Remove(name)` returned `""` or an error string | C | `true` or `false, err` |
| `Resources.Start(name)` returned `""` or an error string | S | `true` or `false, err`; queued from handlers, commands and timers |
| `Resources.Stop(name)` returned `""` or an error string | S | `true` or `false, err`; queued |
| `Resources.Restart(name)` returned `""` or an error string | S | `true` or `false, err`; queued |

### Event, Timer, Resources

| Old | Side | New |
|---|---|---|
| `Event.Fire(name, ...)` passed objects with their type | both | handles arrive as the typed handle of their object, functions arrive as `nil` (the other arguments keep their positions) |
| `Event.Fire` nesting | both | at most 64 nested dispatches |
| `Event.Fire(name, ...)` returned nothing | both | returns whether it was cancelled: `false` when a handler called `Event.Cancel()`, `true` otherwise |
| `Timer.Set(fn, interval, times, ...)` | both | raises an error when called from inside a timer callback |
| timer errors ignored | both | reported, the timer keeps running |
| `Resources.GetAll()` returned a container | both | returns a plain array |
| `ResourceStatus` | both | adds `ResourceStatus.Starting` |

### Net

| Old | Side | New |
|---|---|---|
| `Net.SendToTarget(pc, name, ...)` | S | `Net.SendToPlayer(client, name, ...)` |
| `Net.SendToTargets(targets, name, ...)` | S | `Net.SendToPlayers(targets, name, ...)` (values must be `PlayerHandle`) |
| `Net.Sender()` returned `PlayerClient` | S | returns `PlayerHandle` or `nil` |
| `Net.Send` used in a server script | S | never existed on the server: `Net.SendToPlayer` / `Net.Broadcast` |
| net objects received with their type | both | arrive as the typed handle of their object (`PlayerObjectHandle`, `VehicleHandle`...), `nil` if the receiver doesn't have the object |
| `PlayerClient` received | both | arrives as `PlayerHandle`, `nil` if unknown |
| table size limit | both | 64 levels, 65535 entries per table, keys shorter than 256 bytes, 1 MB per event |
| `Net.Fetch(url, options?)` blocked and returned the result | S | `Net.Fetch(url, options?, callback)` returns nothing and calls `callback(result)` on the main thread when done; same result table and options |

### World and players

| Old | Side | New |
|---|---|---|
| `Players.GetJoined()` | both | `World.GetPlayers()` |
| `Players.GetCount()` | both | `#World.GetPlayers()` |
| `Players.GetRandom()` | both | `World.GetRandomClient()`; `World.GetRandomPlayer()` returns a character |
| `Players.LocalClient()` | C | `World.LocalClient()` |
| `Players.LocalPlayer()` returned `NetPlayer` | C | `World.LocalPlayer()` returns an `ObjectHandle` or `nil`: add `:AsPlayer()` |
| `World.GetObjectByNID(nid)` returned the typed object | both | returns an `ObjectHandle` or `nil` (`nil` on a client when out of range) |
| `World.GetAllByType(type)` returned typed objects | both | returns an array of `ObjectHandle` (on a client, only the streamed-in ones) |
| `World.Destroy(obj)` | S | returns `true`/`false`; refuses players (use `client:Kick`) |
| `World.SpawnVehicle(id, pos, rot?, health?)` | S | returns `VehicleHandle`; `rot` is a finite Euler `vec3` in degrees (a `quat` raises an error); `health` (was ignored) is applied, 0..1 |
| `World.SpawnMountedGun(id, pos, rot?, health?)` | S | returns `MountedGunHandle`; same argument rules |
| `World.SpawnRigidObject(pos, model, pfx, motion, rot?, health?)` | S | returns `RigidObjectHandle`; same argument rules, `motion` validated |
| `World.SpawnNPC(id, pos, rot?, health?)` | S | returns `NPCHandle`; same argument rules |
| `World.SpawnTether(...)` (both overloads) | S | returns `TetherHandle`, or `nil` when an end object is gone |
| `World.SpawnWaterBox(pos, size, style)` (if your build had it) | C | unchanged name, `style` is a `WaterBoxStyle` value |
| `WeatherProperty.SandstormPosition` (if your build had it) | S | `World.SpawnSandstorm(position, size, windSpeed, rotation?)` |

### PlayerClient to PlayerHandle

| Old | Side | New |
|---|---|---|
| `pc:GetNetPlayer()` | both | `client:GetPlayer()`, an `ObjectHandle` or `nil` (`:AsPlayer()`) |
| `pc:GetPlayer()` | C | `client:GetPlayer()`, now an `ObjectHandle` or `nil` |
| `pc:GetNick()` | both | `client:GetName()` |
| `pc:GetSteamId()` | both | `client:GetUserId()` |
| `pc:GetPing()` | both | `client:GetPing()`, server only, integer milliseconds; no replacement on the client |
| `pc:GetAclLevel()` | S | `client:GetAcl()`, both sides; `client:HasAcl(flags)` |
| `pc:SetAclLevel(level)` | S | `client:SetAcl(flags)` |
| `pc:Kick(reason)` | S | `client:Kick(reason?)`, reason optional |
| `pc:Ban(reason)` | S | `client:Ban(reason?)`, reason optional |
| `pc:GetNetId()` | both | unchanged, same value as the character's `GetNetId()` |

### NetObject to ObjectHandle

| Old | Side | New |
|---|---|---|
| `obj:GetMaxHealth()` | both | removed, health is 0..1 |
| `obj:SetMaxHealth(v)` | S | removed, no replacement |
| `obj:GetHealth()` (units) | both | fraction 0..1 |
| `obj:SetHealth(v)` (units) | S | fraction 0..1, a value outside it raises a Lua error |
| `obj:GetData(key)` returned `false` when missing | both | returns `nil` when missing or when the object is gone |
| `obj:SetData(key, value)` (local, never synced) | S | `obj:SetData(key, value, broadcast)`: `true` syncs to clients; `nil` removes; returns `true`/`false`; size limits |
| `obj:SetData(key, value)` | C | unchanged signature, `nil` removes, returns `true`/`false`, local only |
| `obj:GetType()` on an invalid object | both | returns `0` |
| getters on a destroyed object (undefined, could crash) | both | return `nil` (or the documented default) |
| `obj:AsPlayer()` ... `obj:AsTether()` | both | return the typed handle or `nil`; `AsSandstorm()` added |
| `obj:SetPosition(v)`, `SetRotation`, `SetVelocity`, `SetAngularVelocity` | S | unchanged names; values must be finite; `SetTransform`/`GetTransform` added |

### NetPlayer to PlayerObjectHandle

| Old | Side | New |
|---|---|---|
| `player:GetNick()` | both | `player:GetClient():GetName()` |
| `player:GetClient()` returned `PlayerClient` | both | returns `PlayerHandle` or `nil` |
| `player:GetVehicle()` returned `NetVehicle` | both | returns `VehicleHandle` or `nil` |
| `player:GetWeaponName(slot)`, `GetWeaponAmmo(slot, mode)`, `GetInventoryAmmo(type)` | both | unchanged names, arguments validated |
| `player:Respawn(position, healthPercent, maxHealth)` | S | `player:Respawn(position?, health?)`, health 0..1, no max health |
| `player:GiveWeapon(name, ammo, slot)`, `RemoveWeapon(slot)`, `SetWeaponAmmo(slot, mode, ammo)`, `SetInventoryAmmo(type, ammo)` | S | unchanged names, enum arguments validated |
| `player:Teleport(position)` | S | unchanged, position must be finite |
| `player:WarpIntoVehicle(vehicle, seat)` | S | needs a `VehicleHandle` and a valid `VehicleSeat` |
| `player:SetSkin(skin)` | S | unchanged, at most 255 characters |
| `Local.SetSkin(skin)` | C | removed: ask the server, which calls `player:SetSkin(skin)` |
| `player:GetGrappleTargetObject()` returned a `NetObject` | C | returns a typed handle or `nil` |
| client character methods (`GetAimPosition`, `GoRagdoll`, `IsRagdolling`...) | C | unchanged names; return `nil`/do nothing until the character has spawned |

### Vehicles, mounted guns, rigid objects, NPCs

| Old | Side | New |
|---|---|---|
| `vehicle:GetType()` returned the vehicle type | C | `vehicle:GetVehicleType()`; `GetType()` now returns `NetObjectType.Vehicle` |
| `vehicle:GetTrailingVehicle()` returned a `NetVehicle` (crashed without one) | C | returns `VehicleHandle` or `nil` |
| `vehicle:SetPrimaryColor/SetSecondaryColor/SetTertiaryColor(r, g, b)`, `SetDirt`, `SetSpecularGloss`, `SetClearCoat`, `SetMetallic` | S | unchanged names, values must be finite |
| `vehicle:SetPartState(part, state)`, `vehicle:GetPartState(part)` | both | unchanged names, arguments validated |
| mounted gun (no script type) | both | `MountedGunHandle` with `GetId()` |
| `rigid:SetMotionType(type)` | S | unchanged name, validated |
| `npc:Move(direction, moveType, moveStyle)`, `npc:Follow(target, moveType, moveStyle)`, `npc:LookAt(position, lookType)` | S | unchanged names, arguments validated, `Follow` takes any `ObjectHandle` |

### Weather

| Old | Side | New |
|---|---|---|
| `Weather.SyncAct(act, ...)` relayed only | S | the server keeps the tornado and sends it to later joiners; arguments validated |
| `Weather.SyncProperty(property, value)` sent cloud values as integers | S | sends them as numbers; values kept for later joiners; `TornadoState` validated |

### SQL and JSON

| Old | Side | New |
|---|---|---|
| `SQL.Execute(sql, ...)` returned `{ success, error, changes, last_insert_id }` | S | `{ changes, last_insert_id }` or `nil, err`; errors logged |
| `SQL.Query(sql, ...)` returned rows, empty on error | S | rows or `nil, err`; errors logged |
| `SQL.ExecuteAsync`, `SQL.QueryAsync` (if your build had them) | S | removed, use `SQL.Execute` / `SQL.Query` |
| `JSON.Parse` integers | both | every number is a double; nesting over 64 levels raises an error |
| `JSON.Stringify` wrote `"unsupported_type"` / returned `"{}"` on error | both | vectors and quats become arrays; other unsupported values raise an error |

### Chat

| Old | Side | New |
|---|---|---|
| `Chat.Print(text)` | C | removed; fire your chat resource's event (`AddChatMessage` for the default scripts' chat) |
| `Chat.IsTyping()` | C | removed, no replacement (a focused webview takes the keys) |
| `Chat.IsEnabled()` | C | removed, no replacement |
| `Chat.SetEnabled(enabled)` | C | removed, no replacement |
| `Chat.Broadcast(text)` | S | unchanged; clients get `OnChat(nil, text)`; cut at 1023 bytes |

### UI and Render

| Old | Side | New |
|---|---|---|
| `UI.Begin`, `UI.End`, `UI.BeginChild`, `UI.EndChild` | C | removed, use a WebView |
| `UI.Text`, `UI.TextColored`, `UI.TextDisabled`, `UI.TextWrapped`, `UI.LabelText`, `UI.BulletText`, `UI.SeparatorText`, `UI.TextUnformatted` | C | removed, use a WebView |
| `UI.Button`, `UI.SmallButton`, `UI.InvisibleButton`, `UI.ArrowButton`, `UI.RadioButton`, `UI.ProgressBar`, `UI.Bullet` | C | removed, use a WebView |
| `UI.InputText`, `UI.Checkbox`, `UI.Selectable`, `UI.SliderFloat`, `UI.SliderInt`, `UI.BeginDisabled`, `UI.EndDisabled` | C | removed, use a WebView |
| `UI.SameLine`, `UI.NewLine`, `UI.Separator`, `UI.Spacing`, `UI.GetContentRegionAvail`, `UI.GetContentRegionMax` | C | removed, use a WebView |
| `UI.BeginTable`, `UI.EndTable`, `UI.TableNextRow`, `UI.TableNextColumn`, `UI.TableSetColumnIndex`, `UI.TableSetupColumn`, `UI.TableSetupScrollFreeze`, `UI.TableHeader`, `UI.TableHeadersRow`, `UI.TableAngledHeadersRow`, `UI.TableGetColumnCount`, `UI.TableGetColumnIndex`, `UI.TableGetRowIndex`, `UI.TableGetColumnName`, `UI.TableGetColumnFlags`, `UI.TableSetColumnEnabled`, `UI.TableSetBgColor` | C | removed, use a WebView |
| `UI.BeginTabBar`, `UI.EndTabBar`, `UI.BeginTabItem`, `UI.EndTabItem`, `UI.TabItemButton`, `UI.SetTabItemClosed` | C | removed, use a WebView |
| `UI.SetNextWindowPos`, `UI.SetNextWindowSize`, `UI.PushStyleColor`, `UI.PopStyleColor` | C | removed, use a WebView |
| `UI.WindowFlags_*`, `UI.TableFlags_*`, `UI.TableColumnFlags_*` constants | C | removed, no replacement |
| `UI.GetMousePos()`, `UI.SetCursorVisible(visible)` | C | unchanged |
| `Render.DrawLine`, `Render.DrawTriangle`, `Render.FillTriangle`, `Render.DrawRect`, `Render.FillRect`, `Render.FillRectMultiColor` | C | removed, draw in a WebView overlay |
| `Render.DrawCircle`, `Render.FillCircle`, `Render.DrawEllipse`, `Render.FillEllipse`, `Render.DrawPolygon`, `Render.FillPolygon` | C | removed, draw in a WebView overlay |
| `Render.DrawText`, `Render.SetClip` | C | removed, draw in a WebView overlay |
| `Render.GetSize()`, `Render.DrawSphere(...)` | C | unchanged |

### WebView

| Old | Side | New |
|---|---|---|
| `WebView.Create(id, config)` | C | same signature; an empty id generates one; `resource://` only for the calling resource; `http://` and private hosts refused |
| any `WebView.*` call on another resource's webview | C | refused (returns `false`/empty and logs) |
| webviews left after a resource stopped | C | destroyed with their resource |
| `WebView.LoadUrl(id, url)` | C | same URL rules as `Create` |
| `WebView.SendMessage(id, event, data)` | C | event names 1 to 256 characters, payload at most 4 MB of JSON |
| `WebView.ExecuteScript(id, script)` | C | size-limited; while the page loads, scripts are kept (up to 256) and run once it has loaded |
| `window.JC4MP` injected after load, also in iframes | C | available before the page's scripts run, only in the top document of a page of the same resource |
| `localStorage`, `sessionStorage`, `alert`, pop-ups in pages | C | disabled |

### Input, Local, Cmd and other client tables

| Old | Side | New |
|---|---|---|
| `Input.IsKeyDown(key)`, `Input.IsKeyPressed(key)`, `Input.IsKeyReleased(key)` | C | `key` validated, an invalid value raises an error |
| `Input.SetValue(action)` | C | `Local.PlayAction(action)`, same behavior |
| `Physics.Raycast(...).netObject` was a `NetObject` | C | a typed handle or `nil` |
| `Physics.Raycast(...).hitDistance` was a 0..1 fraction of the ray | C | meters from `from` to the hit |
| `SoundChannel:Get3DMinMaxDistance()` / `Get3DAttributes()` read back wrong values and could corrupt memory | C | return what was set |
| `Sound.Create` of a file that isn't audio kept the name taken | C | returns `false` and leaves the name free |
| `Physics.Raycast(...).gameObject` transform methods returned garbage | C | the hit object's real transform |
| client game objects' `GetPosition`, `GetRotation`, `GetEulerRotation`, `Destroy` missing or reading the wrong transform on some types | C | on every type (`Character`, `Vehicle`, `RigidObject`, `POI`, `WaterBox`, `ForcePulse`, `Weapon`), with the real transform; `Destroy` also works through `GO()` |
| client `World.SpawnRigidObject(...)` crashed the game on a bad model or physics file | C | returns `nil` and logs a warning |
| `GameUI.SetRegionName`, `GameUI.EnableWeaponsHUD(false)` outlived the resource | C | undone when the resource stops, unless another resource changed the setting since |
| `Weapons.RegisterNew`, `Weapons.UnregisterNew` (the whole `Weapons` table) | C | removed, new weapons are no longer supported |
| `Camera.SpawnShake(type, ...)` ignored `type` and shook nothing | C | shakes the camera with that type |
| `Local.SetPosition(position)`, `Local.SetLinearVelocity(velocity)` | C | values must be finite |
| `Cmd.Add`, `Cmd.Remove` | C | `ok, err` returns, see above; can't change a command while it runs |

### Events

| Old | Side | New |
|---|---|---|
| `OnPlayerKilled(player, damager, loss, hitBone, weapon, position)` | both | `OnPlayerKilled(player, damager, damage, weapon, position)`: no `hitBone`, `damage` is a fraction, `damager` a typed handle or `nil` |
| `OnPlayerDamage(player, damager, loss, hitBone, weapon, position)` | both | `OnPlayerDamage(player, damager, damage, weapon, position)` (cancellable on the server) |
| `OnVehicleDestroy(vehicle, damager, loss, hitBone, weapon, position)` | both | `OnVehicleDestroy(vehicle, damager, damage, weapon, position)`; fires once, on the hit that takes the health to 0 |
| `OnVehicleDamage(vehicle, damager, loss, hitBone, weapon, position)` | both | `OnVehicleDamage(vehicle, damager, damage, weapon, position)` (cancellable on the server) |
| `OnChat(player, text)`, `player` a `NetPlayer` | S | `OnChat(client, text)`, `client` a `PlayerHandle` |
| `OnChat(player, text)`, `player` a `NetPlayer` | C | `OnChat(sender, text)`, `sender` a `PlayerHandle` or `nil` (server message) |
| `OnPlayerJoin(pc)` | S | `OnPlayerJoin(client)`, a `PlayerHandle` |
| `OnPlayerQuit(pc)` | S | `OnPlayerQuit(client)`, a `PlayerHandle` |
| `OnPlayerResourceAction(pc, name, action)` | S | `OnPlayerResourceAction(client, name, action)`; for a joining player it comes before `OnPlayerJoin`, with no character |
| (server only) `OnPlayerJoin`, `OnPlayerQuit` | C | now also fire on clients for other players |
| `OnPlayerTeleport(player)`, `OnPlayerVehicleEnter(player, vehicle, seat, previous)`, `OnPlayerVehicleExit(player, vehicle, seat)` | both | same arguments, as typed handles |
| `OnPlayerRagdollStart`, `OnPlayerRagdollEnd`, `OnPlayerKicked`, `OnPlayerGrappleHit`, `OnVehicleCollision`, `OnVehiclePartChangedState`, `OnVehicleNitrousUse`, `OnVehicleTurboJump`, `OnVehicleRender`, `OnVehicleHornPlay`, `OnVehicleHornStop`, `OnVehicleExplode` | C | same arguments, as typed handles; only for streamed-in objects |
| `OnResourceStart(name)`, `OnResourceStop(name)` | both | unchanged; actions queued from handlers fire them at the next update |

### Enums and constants

| Old | Side | New |
|---|---|---|
| `AclLevel.Normal` | S | `AclLevel.Default` (both sides) |
| `AclLevel.Owner`, `AclLevel.Admin`, `AclLevel.Moderator` | S | unchanged values, now on both sides |
| `Key.*` | C | now on both sides |
| `WindowFlags.*` (all) | C | removed |
| `TabItemFlag.*` (all) | C | removed |
| `NetObjectType` | both | adds `NetObjectType.Sandstorm` (7) |
| `ResourceStatus` | both | adds `ResourceStatus.Starting` (2) |
| `WeaponSlot.Max`, `WeaponSlot.None` | both | removed (no function took them); `WeaponSlot.HandGrenade` (3) added |
| `VehiclePartState`, `VehicleSeat` | both | add `VehiclePartState.Missing` (3), `VehicleSeat.UseItem` (25), `VehicleSeat.FakeStuntPoint` (41) |
| `ResourceAction.Restart` | both | removed: a restart is reported as `Stop` then `Start` |
| `GameState.MainMenu` | C | renamed `GameState.InGame` (the state of a loaded world being played) |
| every enum passed to a function | both | validated: `nil` or out of range raises an error |

### New in the current API

Not needed for a port, but worth knowing:

| Item | Side | Page |
|---|---|---|
| `Hash(text)` | both | [Hash](https://docs.jc4mp.com/shared/hash) |
| `Net.SendToPlayersVisibleTo` | S | [Net (server)](https://docs.jc4mp.com/server/net) |
| `World.GetRandomPlayer`, `World.LocalClient` | both, C | [Players](https://docs.jc4mp.com/shared/objects/players), [Players (client)](https://docs.jc4mp.com/client/objects/players) |
| `World.SpawnExplosion`, `World.SpawnSandstorm` | S | [World (server)](https://docs.jc4mp.com/server/world) |
| `World.SpawnForcePulse`, `GameObject:Destroy`, `ForcePulse:Explode` | C | [World (client)](https://docs.jc4mp.com/client/world), [Game objects](https://docs.jc4mp.com/client/game-objects) |
| `ObjectHandle:GetTransform`, `SetTransform` | both, S | [ObjectHandle](https://docs.jc4mp.com/shared/objects/object-handle) |
| `PlayerObjectHandle:PlayAnimation`, `StopAnimation`, `GetAnimation` | S, both | [Player (server)](https://docs.jc4mp.com/server/objects/player) |
| vehicle drone orders, NPC combat orders, `SandstormHandle` | S | [VehicleHandle](https://docs.jc4mp.com/shared/objects/vehicle), [NPCHandle](https://docs.jc4mp.com/shared/objects/npc), [SandstormHandle](https://docs.jc4mp.com/shared/objects/sandstorm) |
| `SQL.QueryRow`, `QueryValue`, `ExecuteScript`, `Transaction`, `TableExists`, `Null`, `Blob` | S | [SQL](https://docs.jc4mp.com/server/sql) |
| `Cmd.Execute` | C | [Commands](https://docs.jc4mp.com/client/commands) |
| `Local.PlayAnimation`, `StopAnimation`, `SetHoverboardEnabled`, `IsHoverboardEnabled` | C | [Local](https://docs.jc4mp.com/client/local) |
| `Client.GetNetStats`, `Client.SetNetSim`, `Client.GetNetSim` | C | [Client](https://docs.jc4mp.com/client/client) |
| `NavMesh`, `RoadGraph` | C | [NavMesh](https://docs.jc4mp.com/client/navmesh), [RoadGraph](https://docs.jc4mp.com/client/road-graph) |

## Common pitfalls

These came up while porting the `default-scripts` resources.

- **Names and pings from the wrong handle.** `player:GetNick()` no longer exists, and `player:GetClient()` can be `nil`. The ports added a small `getName(player)` helper that returns `"?"` when there is no client. Pings are only known on the server: the dashboard and player menu now ask the server to send them every second while they are open (`Net.SendToPlayers` to the players that have the menu open).
- **`OnPlayerResourceAction` before the join.** deathmatch and login-system called `client:GetPlayer()` in `OnPlayerResourceAction` and got `nil` for joining players. Handle those players in `OnPlayerJoin` (login-system keeps a `pendingLoads[user id]` table until the join).
- **Warping into a freshly spawned vehicle.** cnr spawned the robber's car and warped the robber in at once; the warp is done by the player's game, which doesn't have the car yet when it is far away. Teleport the player next to the car first and warp on the next timer tick.
- **Queued resource actions.** The admin menu used to report "started successfully" right after `Resources.Start`; it now reports "sent start" and refreshes the admins' lists in `OnResourceStart`/`OnResourceStop`. In `OnResourceStop` the stopping resource is still listed as running, so mark it as stopped yourself.
- **`OnResourceStop` without a name check.** derby ended its round whenever any resource stopped. Compare `name` with `Resource.Name`.
- **Handles as table keys.** car-radio and drones keep handles in tables; key by `GetUserId()` or `GetNetId()` when the same object can come from different places.
- **Handles that go `nil` on clients.** car-radio crashed reading the position of a vehicle that had streamed out; a vehicle passed in a `Net` event arrives as `nil` for clients out of range. Check every getter result and every received handle.
- **The player menu warp.** The client read the target player's position to teleport there, but far players aren't streamed in. It now sends the target's net id and the server, which has every player, does the teleport.
- **`math.atan(y, x)`.** derby computed vehicle yaw with the two-argument `math.atan` from Lua 5.4; under LuaJIT that silently ignores `x`. Use `math.atan2`.
- **Quaternion where Euler angles are expected.** derby passed a `quat` as the spawn rotation; spawn rotations are Euler degrees (`vec3(0, math.deg(yaw), 0)`), and a quaternion goes to `SetRotation`.
- **Misspelled enum values.** derby's `VehicleSeat.Driver` was `nil` and silently did nothing before; it now raises an error. The real name is `VehicleSeat.DriverSeat`.
- **Raw health values.** derby destroyed vehicles with `SetHealth(-10000)` and cnr gave the robber car `SetMaxHealth(5000)`; the dashboard's health field took 0-800. Use `0`, drop max health, and divide by the old maximum.
- **`math.random(0.0, 1.0)`.** spawn-menu used it for colors and only ever got 0 or 1. Use `math.random()`.
- **`Net.Send` on the server.** car-radio's server relayed with `Net.Send`, which never existed on the server; derby passed the target player as the last argument of `Net.Send`. Use `Net.Broadcast` and `Net.SendToPlayer(player, name, ...)`.
- **SQL results.** login-system checked `result.success` and `result.error`; it now uses `local result, err = SQL.Execute(...)`. Its unconditional `INSERT` started logging an error on every join for returning players: `INSERT OR IGNORE` fixed it. The dashboard's async callbacks became straight-line code.
- **Timers that schedule timers.** A `Timer.Set` inside a timer callback now raises an error. cnr's start-round timer became one repeating timer that handles both the pending warp and the round start.
- **`Chat.IsTyping` checks.** Menus checked it before handling keys; with a focused chat webview the game gets no keys at all, so the checks were simply removed. weather's key handler checks `World.LocalPlayer()` instead, since keys can arrive before the player exists.
- **Asking the server too early.** Client scripts run before the join; drones sends its first request in `OnClientJoin` and again at the top level when `World.LocalPlayer()` already exists (resource restarted in game).
- **Reading net stats in `OnRender`.** `Client.GetNetStats()` must be read in `OnUpdate`; net-stats builds its lines there and sends them to its webview.
- **`Sound.Play2D`/`Sound.Play3D` returning `nil`.** sounds called methods on the result without checking; a sound that isn't loaded returns `nil`.
- **Rigid objects whose model isn't loaded.** A rigid object only appears where the clients have its model and physics file loaded; freeroam's `/barrel` checks `Asset.IsLoaded` on the client before asking the server to spawn one.
- **Admin-only actions.** weather let anyone spawn tornadoes; every server handler that changes the world now checks `Net.Sender():HasAcl(...)`. Treat every `Net.AddEvent` argument and every resource name from `OnPlayerResourceAction` as untrusted.