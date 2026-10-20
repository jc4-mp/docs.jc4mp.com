---
sidebar_position: 55
---

# Players (client)

The client-only functions for finding players: the local player's handles from the [World](../world.md) table, and the `Players` table, which controls the name tags drawn above players. For what you can do with the handles these functions return, see [Player](../../shared/objects/player.md) and [Player (client)](./player.md).

**Available on:** Client

See also: [Players](../../shared/objects/players.md)

## Functions {#functions}

### World.LocalClient() {#worldlocalclient}

Returns the `PlayerHandle` of the local player (the player running this client), or `nil` before this client has been accepted by the server.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `PlayerHandle` or `nil` | the local player's connection |

**Example**

```lua
local me = World.LocalClient()

if me and me:HasAcl(AclLevel.Admin) then
	print("you are an admin on this server")
end
```

### World.LocalPlayer() {#worldlocalplayer}

Returns the local player's character as a plain [ObjectHandle](../../shared/objects/object-handle.md), or `nil` while the local player has no character (before it has spawned). Call `:AsPlayer()` on it to use the [PlayerObjectHandle](../../shared/objects/player.md) methods. For actions that only the local player can do, see [Local](../local.md).

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `ObjectHandle` or `nil` | the local player's character |

**Example**

```lua
Cmd.Add("where", function()
	local obj = World.LocalPlayer()

	if not obj then
		return
	end

	local player = obj:AsPlayer()
	local vehicle = player:GetVehicle()

	print("position: " .. tostring(player:GetPosition()))
	print(vehicle and ("in vehicle " .. vehicle:GetId()) or "on foot")
end)
```

### Players.SetTagsEnabled(enabled) {#playerssettagsenabledenabled}

Shows or hides the name tags drawn above other players' heads. The setting applies to the whole client, not just the calling resource: it stays as set after the resource stops, until a script changes it again. Name tags are shown by default.

**Parameters**

| Name | Type | Description |
|---|---|---|
| enabled | `boolean` | `true` to show name tags, `false` to hide them |

**Returns:** nothing

**Example**

```lua
-- hide name tags during a hide-and-seek round, the server tells clients when it starts and ends
Net.AddEvent("HideAndSeek", function(active)
	Players.SetTagsEnabled(not active)
end)
```

### Players.AreTagsEnabled() {#playersaretagsenabled}

Returns whether the name tags above players are currently shown.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `boolean` | `true` if name tags are shown |

**Example**

```lua
Cmd.Add("tags", function()
	Players.SetTagsEnabled(not Players.AreTagsEnabled())
	print("name tags " .. (Players.AreTagsEnabled() and "on" or "off"))
end)
```