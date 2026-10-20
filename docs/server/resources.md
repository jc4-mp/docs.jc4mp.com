---
sidebar_position: 34
---

# Resources (server)

Server scripts can start, stop and restart resources with the `Resources` table, and the server configuration decides which resources start with the server; the resource layout, lifecycle, `require` and the functions available on both sides are on the shared [Resources](../shared/resources.md) page.

**Available on:** Server

See also: [Resources](../shared/resources.md), [Server console](./console.md)

## Configuration {#configuration}

The resources started with the server are listed, in order, in the `startup_resources` array of `cfg/config.json`:

```json
{
	"startup_resources": [
		"chat",
		"freeroam",
		"race"
	]
}
```

The server console commands `start`, `stop`, `restart` and `list` control resources at run time, see [Server console](./console.md).

## Functions {#functions}

### Resources.Start(name) {#resourcesstartname}

Starts the resource `name`, rescanning the `resources` folder first. Joined players are then synced and start its client side.

A resource can't start itself. When called from an event handler, a command or a timer (which is where nearly all script code runs, except the top level of a file), the start is **queued** until the current event finishes and happens on the next server update: the call then returns `true` right away, and an error during the actual start is only logged in the console. Check the status later with [`Resources.GetAll`](../shared/resources.md#resourcesgetall) if you need to know the outcome.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | string | the resource (folder) name |

**Returns**

| Type | Description |
|---|---|
| boolean | `true` when started (or queued) |
| string or nil | the error otherwise: `"Already running"`, `"Resource does not exist"`, `"A resource cannot start itself"`, `"Resource '<name>' is still starting"`, or a script error from one of its files |

**Example**

```lua
-- server: start the race when enough players are online
Event.Add("OnPlayerJoin", function()
	if #World.GetPlayers() >= 4 then
		local ok, err = Resources.Start("race")

		if not ok and err ~= "Already running" then
			print("could not start race: " .. err)
		end
	end
end)
```

### Resources.Stop(name) {#resourcesstopname}

Stops the resource `name`, on the server and on every player's client. Everything it spawned is destroyed.

A resource can't stop itself. Like `Resources.Start`, a call from an event handler, command or timer is queued until the next server update and returns `true` immediately.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | string | the resource name |

**Returns**

| Type | Description |
|---|---|
| boolean | `true` when stopped (or queued) |
| string or nil | the error otherwise: `"Already stopped"`, `"Resource does not exist"`, `"A resource cannot stop itself"`, `"Resource '<name>' is still starting"` |

**Example**

```lua
-- server: an admin-only event to stop any resource
Net.AddEvent("admin:stop_resource", function(name)
	local client = Net.Sender()

	if not client or not client:HasAcl(AclLevel.Admin) or type(name) ~= "string" then
		return
	end

	local ok, err = Resources.Stop(name)

	Net.SendToPlayer(client, "admin:result", ok, err)
end)
```

### Resources.Restart(name) {#resourcesrestartname}

Stops and starts the resource `name` with its current files. Players download the changed files and restart it on their side too.

A resource can't restart itself. A call from an event handler, command or timer is queued until the next server update and returns `true` immediately.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | string | the resource name |

**Returns**

| Type | Description |
|---|---|
| boolean | `true` when restarted (or queued) |
| string or nil | the error otherwise (`"Resource does not exist"`, `"Already stopped"`, `"A resource cannot restart itself"`, a script error...) |

**Example**

```lua
-- server: restart the gamemode every 2 hours to start a fresh map
Timer.Set(function()
	Chat.Broadcast("Restarting the gamemode...")

	Resources.Restart("freeroam")
end, 2 * 60 * 60 * 1000, 0)
```