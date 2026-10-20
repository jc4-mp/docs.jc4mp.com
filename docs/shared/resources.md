---
sidebar_position: 2
---

# Resources

Everything a JC4MP server runs is a **resource**: a folder of Lua scripts (and any files they need, such as webview pages and images) that can be started, stopped and restarted on its own. A gamemode, a chat, an admin menu and a login system are all separate resources. This page explains how resources are laid out, how they start and stop, how their files reach the players, and the parts of the `Resources` API available on both sides; starting, stopping and restarting resources from scripts is on [Resources (server)](../server/resources.md).

**Available on:** Server, Client

See also: [Resources (server)](../server/resources.md), [Server console](../server/console.md)

## Folder layout {#folder-layout}

Resources live in the `resources` folder next to the server. A resource is any folder, at any depth inside `resources`, that contains at least one of the folders `client`, `server` or `shared`. There is no manifest or meta file: the folder layout is all there is.

```
resources/
	race/                     a resource named "race"
		server/
			main.lua              runs on the server only
			tracks.lua
		client/
			main.lua              runs on every player's game
			ui/
				index.html        a webview page (any file type is fine)
				logo.png
		shared/
			config.lua            runs on both sides
	my-pack/                  just a folder that groups resources
		shop/                 a resource named "shop"
			server/main.lua
			client/main.lua
```

- **The resource name is the folder name** (`race`, `shop`), whatever folders it is grouped in. Names must be unique across the whole `resources` folder: when two folders have the same name, only one of them is used.
- `server/` files never leave the server.
- `client/` files are downloaded by every player and run in their game.
- `shared/` files are downloaded by every player and run on both the server and the clients.
- Only the top folder decides the side: `client/ui/menu/main.lua` is a client file. Don't create folders named `client`, `server` or `shared` deeper inside a resource, since such a folder makes its parent look like another resource.
- Files directly in the resource folder, or in any other top folder, are neither run nor sent to players. Use them for notes, sources or build files.
- A resource with no `client/` or `shared/` files is not sent to players at all.

## Scripts {#scripts}

Every `.lua` file under `server/`, `client/` or `shared/` (subfolders included) is a **separate script** with its own Lua state:

- Global variables and functions are not shared between files, even in the same resource. Use `local` everywhere and share code with [require](#require), share data with events (`Event.Fire` / `Event.Add`, see [Events](./events.md)).
- The order in which the files of a resource start is not defined. Don't rely on another file having run first; do your setup in `OnResourceStart` if it depends on other files.
- A file you only use as a module (`require`d by other files) is still started as a script of its own when the resource starts. That is harmless for a file that only defines and returns a table, but don't give module files side effects.
- Each file can register one handler per event name and one per command name.
- `print` writes to the console with the resource name in front (see [Sandbox](./sandbox.md#print)).

Which Lua libraries a script can use depends on the side, see [Sandbox](./sandbox.md).

## Lifecycle {#lifecycle}

### Starting {#starting}

A resource starts when the server starts (if it is listed in `startup_resources`), when an admin types `start <name>` in the server console, or when a script calls [Resources.Start](../server/resources.md#resourcesstartname).

1. The `resources` folder is scanned again, so new resources and new or changed files are picked up without restarting the server.
2. The status becomes `ResourceStatus.Starting` and every script file of the resource is loaded and its top-level code runs.
3. If any file fails (a syntax error, or an error raised at its top level), the start is cancelled: everything the resource's files registered (events, commands, timers, spawned objects) is removed, the status goes back to `Stopped`, and the error is reported in the server console and in the in-game script debugger.
4. Otherwise the status becomes `ResourceStatus.Running` and the event `OnResourceStart` fires with the resource name.
5. On the server, every joined player is then synced: their game downloads the resource's new or changed files and starts its client side, which fires `OnResourceStart` in their client scripts.

`OnResourceStart` fires in **every** running script, of every resource, each time any resource starts. Always compare the name:

```lua
Event.Add("OnResourceStart", function(name)
	if name == Resource.Name then
		print("my resource is running")
	end
end)
```

### Stopping {#stopping}

A resource stops when an admin types `stop <name>`, when a script calls [Resources.Stop](../server/resources.md#resourcesstopname), when the server shuts down, or on a client when the server stops it or the player disconnects.

1. `OnResourceStop` fires with the resource name, in every running script (the stopping resource's scripts are still running and can clean up or save).
2. All its event handlers, commands and timers are removed.
3. On the server, every object the resource spawned (`World.SpawnVehicle`, `World.SpawnNPC`... see [World (server)](../server/world.md)) is destroyed. On a client, the game objects, sounds, effects and webviews its client scripts created are removed.
4. The Lua states of its scripts are closed and the status becomes `ResourceStatus.Stopped`.

Players' clients stop the resource too.

### Restarting {#restarting}

A restart stops the resource and starts it again with the current files. On the server, players' clients then download the files that changed and restart the resource on their side as well, even when no client file changed. This is the normal way to apply changes while developing: edit the files, then type `restart <name>` in the server console.

## How players get the client files {#how-players-get-the-client-files}

- When a player connects, their game compares its cached files with the server's and downloads only the `client/` and `shared/` files that are missing or changed (the files of every resource that has some, running or not). Files the server no longer has are deleted from the cache.
- The cache is kept per server on the player's computer, so reconnecting to the same server is fast. It is cleared when the server's script key changes. The key is derived from the server's Steam Web API key, so it stays the same across restarts; changing that key makes players download the client files again.
- When the download is done the player's game loads the world and starts the resources the server is running, then the player joins (`OnClientJoin` on the client, `OnPlayerJoin` on the server). Client scripts therefore start **before** the join; see [Net.Send](../client/net.md#netsendname-) for what that means for the first messages.
- Whenever the server starts, stops or restarts a resource, every joined player is synced the same way.
- A single file can be at most 64 MB.

### Script protection {#script-protection}

Lua files sent to players are obfuscated with a key the server generates each time it starts, stored obfuscated in the players' cache and only decoded in memory when they run. Other files (HTML, images...) are sent as they are.

This only stops casual reading of the cache: the key is sent to every player, so a determined player can recover your client scripts. **Never put secrets (passwords, API keys, admin lists) in `client/` or `shared/` files**, and keep all checks that matter on the server. `server/` files never leave the server.

## require {#require}

`require(name)` loads a Lua module (a file that returns a value, usually a table) and returns what it returned. Module names are paths with dots instead of slashes and without `.lua`. A module is searched:

1. from the `resources` folder: `require("race.shared.config")` loads `resources/race/shared/config.lua`, and a resource in a group folder includes it: `require("my-pack.shop.shared.items")`;
2. next to the requiring file: `require("tracks")` from `race/server/main.lua` loads `race/server/tracks.lua`.

The same names work on both sides, because the clients' cache has the same layout. On a client, only `client/` and `shared/` files exist, so a client script can't require a `server/` file.

Each script file has its own module cache: two files requiring the same module each run it once and get separate copies. On the client, module names can't contain `..`, `\` or `:` and can't start with `/`, and only Lua source is accepted (no precompiled bytecode). On the server `require` is the standard Lua `require` with those search paths added, also limited to source files. See [Sandbox](./sandbox.md#require) for the details.

**Example**

```lua
-- race/shared/config.lua
return {
	laps = 3,
	max_players = 8,
	checkpoint_radius = 12,
}
```

```lua
-- race/server/main.lua
local config = require("race.shared.config")

print("races have " .. config.laps .. " laps")
```

## Values {#values}

### Resource.Name {#resourcename}

The name of the resource the current script belongs to (its folder name).

**Type** `string`

**Example**

```lua
Event.Add("OnResourceStop", function(name)
	if name == Resource.Name then
		print(Resource.Name .. " is stopping, saving data")
	end
end)
```

### ResourceStatus {#resourcestatus}

The states a resource can be in, returned by [resource:GetStatus()](#resourcegetstatus).

| Name | Value | Meaning |
|---|---|---|
| `ResourceStatus.Stopped` | 0 | not running |
| `ResourceStatus.Running` | 1 | running |
| `ResourceStatus.Starting` | 2 | its scripts are being loaded; it can't be started or stopped again until that is done |

### ResourceAction {#resourceaction}

What happened to a resource, passed to the server event `OnPlayerResourceAction(player, name, action)`, which fires when a player's client starts or stops one of its resources (see [server events](../server/events.md)). A joining player's resources start before `OnPlayerJoin`, so this event comes first for them.

| Name | Value | Meaning |
|---|---|---|
| `ResourceAction.Stop` | 0 | the resource was stopped |
| `ResourceAction.Start` | 1 | the resource was started |

**Example**

```lua
-- server: give the player a car once our client side is running on their game
Event.Add("OnPlayerResourceAction", function(client, name, action)
	if name ~= Resource.Name or action ~= ResourceAction.Start then
		return
	end

	local player = client:GetPlayer()

	if player then
		World.SpawnVehicle("v046_car_racingbuggy_civilian", player:GetPosition() + vec3(5, 0, 0))
	end
end)
```

## Functions {#functions}

### Resources.GetAll() {#resourcesgetall}

Returns every resource known on this side, running or not, sorted by name. On the server these are the resources found in the `resources` folder at the last scan (the folder is rescanned whenever a resource starts). On a client these are the resources downloaded from the server.

**Parameters** none

**Returns** an array of [Resource](#resource-methods) objects.

**Example**

```lua
for _, resource in ipairs(Resources.GetAll()) do
	local running = resource:GetStatus() == ResourceStatus.Running

	print(resource:GetName(), running and "running" or "stopped")
end
```

## Resource methods {#resource-methods}

The objects returned by `Resources.GetAll` have these methods.

### resource\:GetName() {#resourcegetname}

The resource's name (its folder name).

**Returns** `string`

**Example**

```lua
local names = {}

for _, resource in ipairs(Resources.GetAll()) do
	names[#names + 1] = resource:GetName()
end

print(table.concat(names, ", "))
```

### resource\:GetStatus() {#resourcegetstatus}

The resource's current state, one of the [ResourceStatus](#resourcestatus) values.

**Returns** `integer`

**Example**

```lua
-- server: send the resource list to an admin menu
Net.AddEvent("admin:list_resources", function()
	local client = Net.Sender()

	if not client or not client:HasAcl(AclLevel.Admin) then
		return
	end

	local list = {}

	for _, resource in ipairs(Resources.GetAll()) do
		list[#list + 1] = { name = resource:GetName(), running = resource:GetStatus() == ResourceStatus.Running }
	end

	Net.SendToPlayer(client, "admin:resources", list)
end)
```