---
sidebar_position: 28
---

# Resource, ResourceAction and ResourceStatus

These tables describe resources (the folders of scripts a server runs and sends to its players): `Resource.Name` is the name of the resource the script belongs to, `ResourceStatus` is whether a resource is running, and `ResourceAction` is what a player's game just did with one of its resources. See [Resources](../resources.md) for how resources work.

**Available on:** Server, Client

## Values {#values}

### Resource {#resource}

A table with one field, set separately in every resource.

| Name | Type | Meaning |
|---|---|---|
| `Resource.Name` | `string` | The name of the resource this script belongs to (its folder name), for example `"deathmatch"`. |

### ResourceStatus {#resourcestatus}

Used by [`resource:GetStatus()`](../resources.md) (server and client) on the resource objects that [`Resources.GetAll()`](../resources.md) returns.

| Name | Value | Meaning |
|---|---|---|
| `ResourceStatus.Stopped` | 0 | The resource is not running. |
| `ResourceStatus.Running` | 1 | The resource is running. |
| `ResourceStatus.Starting` | 2 | The resource's scripts are loading. It can't be started or stopped again until that is done. |

### ResourceAction {#resourceaction}

Used by the server event [`OnPlayerResourceAction(client, name, action)`](../../server/events.md): a player's game started or stopped one of its resources. The event comes as soon as the player is authorized, so the resources a client starts while joining are reported before `OnPlayerJoin` (and before the player has a character in the world).

| Name | Value | Meaning |
|---|---|---|
| `ResourceAction.Stop` | 0 | The player's game stopped the resource. |
| `ResourceAction.Start` | 1 | The player's game started the resource. |

**Example**

```lua
-- server: respawn a player once its game has started this resource's client scripts
Event.Add("OnPlayerResourceAction", function(client, name, action)
	if name ~= Resource.Name or action ~= ResourceAction.Start then
		return
	end

	local player = client:GetPlayer()
	if player then
		player:AsPlayer():Respawn(vec3(2851.6, 541.1, -9920.1))
	end
end)

-- list every resource and whether it runs
for _, resource in ipairs(Resources.GetAll()) do
	local running = resource:GetStatus() == ResourceStatus.Running
	print(resource:GetName() .. (running and " is running" or " is not running"))
end
```