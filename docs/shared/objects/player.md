---
sidebar_position: 14
---

# Player

Every connected player is represented by two different handles. A `PlayerHandle` is the player's **connection**: who they are (name, Steam ID, permissions) and the network link to their game (kick, ban, ping, sending them events). A `PlayerObjectHandle` is the player's **character in the world**: the networked object that has a position, health, a skin, weapons and animations. Use this page to know which one you have, how to get one from the other, and what each can do.

**Available on:** Server, Client

See also: [Player (server)](../../server/objects/player.md), [Player (client)](../../client/objects/player.md), [Players](./players.md)

## PlayerHandle or PlayerObjectHandle? {#playerhandle-or-playerobjecthandle}

| | `PlayerHandle` (the client) | `PlayerObjectHandle` (the character) |
|---|---|---|
| What it is | the player's connection and identity | the player's character, a networked object in the world |
| Exists | from the moment the player connects until they disconnect | on the server, once the player has joined; on a client, only while the character is streamed in (near the local player), always for the local player |
| Typical methods | `GetName`, `GetUserId`, `GetAcl`, `Kick`, `Ban`, `GetPing` | `GetPosition`, `SetHealth`, `SetSkin`, `GiveWeapon`, `Teleport`, `Respawn` |
| Base type | none | [ObjectHandle](./object-handle.md): every `ObjectHandle` method works on it |
| Used by | [Net (server)](../../server/net.md) functions that target a player (`Net.SendToPlayer`), `World.GetPlayers`, `OnPlayerJoin`/`OnPlayerQuit` | object functions and events about the character (`OnPlayerKilled`, `OnPlayerDamage`, `OnPlayerTeleport`) |

Variables named `client` usually hold a `PlayerHandle` and variables named `player` a `PlayerObjectHandle`, as in the examples on this page.

### From a PlayerHandle to its character {#from-a-playerhandle-to-its-character}

`client:GetPlayer()` returns the character as a plain [ObjectHandle](./object-handle.md). Call `:AsPlayer()` on it to get the `PlayerObjectHandle` with the player methods:

```lua
Event.Add("OnPlayerJoin", function(client)
	local player = client:GetPlayer():AsPlayer()

	player:SetSkin("mira")
end)
```

`GetPlayer()` returns `nil` when there is no character to return: on the server while the player is still joining (for example in `OnPlayerResourceAction` for a resource started during the join), and on a client while that player is too far away to be streamed in. Check it before calling `AsPlayer`:

```lua
local function getCharacter(client)
	local obj = client:GetPlayer()

	return obj and obj:AsPlayer()
end
```

### From a character to its PlayerHandle {#from-a-character-to-its-playerhandle}

`player:GetClient()` returns the `PlayerHandle` of the player that controls the character:

```lua
Event.Add("OnPlayerKilled", function(player, damager)
	local client = player:GetClient()

	if client then
		Chat.Broadcast(client:GetName() .. " died")
	end
end)
```

Both handles share the same network id: `client:GetNetId()` and `player:GetNetId()` return the same number for the same player.

### Handles that are no longer valid {#handles-that-are-no-longer-valid}

When a player disconnects, both handles become invalid. Methods on an invalid handle do nothing and return the default value documented for each method (usually `nil`, `0`, an empty string or `false`); they never raise an error. Methods that only make sense for a player who has joined (marked below) also treat a player who is still joining as invalid.

## PlayerHandle methods {#playerhandle-methods}

### client\:GetNetId() {#clientgetnetid}

Returns the player's network id. It is the same number on the server and on every client, and it is also the network id of the player's character (`client:GetPlayer():GetNetId()`).

Works for players who are still joining too. Returns `65535` if the player is gone.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `integer` | the network id, `65535` if the player is gone |

**Example**

```lua
Event.Add("OnPlayerJoin", function(client)
	print(string.format("%s joined with id %d", client:GetName(), client:GetNetId()))
end)
```

### client\:GetName() {#clientgetname}

Returns the player's nickname, as they set it in the launcher. It is at most 255 characters long.

Works for players who are still joining too, once the server has accepted their connection. Returns an empty string if the player is gone.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `string` | the nickname, `""` if the player is gone |

**Example**

```lua
Event.Add("OnPlayerQuit", function(client)
	Chat.Broadcast(client:GetName() .. " left the server")
end)
```

### client\:GetUserId() {#clientgetuserid}

Returns the player's unique user id: their Steam ID (SteamID64) as a string, for example `"76561198000000000"`. Unlike the name, it can't be changed by the player, so it is the value to use as a key for saved data, bans and permissions.

When the server allows several connections from the same Steam account (a development setting), the second and later connections get `"<steam id>_test1"`, `"<steam id>_test2"` and so on.

Works for players who are still joining too. Returns an empty string if the player is gone.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `string` | the Steam ID, `""` if the player is gone |

**Example**

```lua
-- server: load a player's saved money
Event.Add("OnPlayerJoin", function(client)
	local money = SQL.QueryValue("SELECT money FROM accounts WHERE steam_id = ?", client:GetUserId())

	print(client:GetName() .. " has $" .. tostring(money or 0))
end)
```

### client\:GetAcl() {#clientgetacl}

Returns the player's permission flags as an integer made of [AclLevel](../enums/acl-level.md) values: `AclLevel.Default` (0, no permissions), `AclLevel.Owner`, `AclLevel.Admin` and `AclLevel.Moderator`. Several flags can be combined.

When a player connects, the server gives them the level written for their Steam ID in the `acl` section of the server's `cfg/config.json` (`"owner"`, `"admin"` or `"moderator"`), or `AclLevel.Default`. Scripts can change it with `SetAcl`. Every client knows every player's flags, so client scripts can read them too (for example to show an admin badge).

Works for players who are still joining too. Returns `AclLevel.Default` (0) if the player is gone.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `integer` | a combination of [AclLevel](../enums/acl-level.md) flags |

**Example**

```lua
local function rankName(client)
	if client:HasAcl(AclLevel.Owner) then return "Owner" end
	if client:HasAcl(AclLevel.Admin) then return "Admin" end
	if client:HasAcl(AclLevel.Moderator) then return "Moderator" end

	return "Player"
end
```

### client\:HasAcl(flags) {#clienthasaclflags}

Returns `true` if the player has **all** the given [AclLevel](../enums/acl-level.md) flags. Pass several flags combined with `bit.bor` (or by adding them) to require all of them; to accept any one of several levels, call `HasAcl` once per level.

Works for players who are still joining too. Returns `false` if the player is gone.

**Parameters**

| Name | Type | Description |
|---|---|---|
| flags | `integer` | one or more [AclLevel](../enums/acl-level.md) flags |

**Returns**

| Type | Description |
|---|---|
| `boolean` | whether the player has every flag |

**Example**

```lua
local function isStaff(client)
	return client:HasAcl(AclLevel.Owner) or client:HasAcl(AclLevel.Admin) or client:HasAcl(AclLevel.Moderator)
end

Net.AddEvent("AdminHeal", function()
	local client = Net.Sender()

	if client and isStaff(client) then
		client:GetPlayer():SetHealth(1)
	end
end)
```

### client\:GetPlayer() {#clientgetplayer}

Returns the player's character as a plain [ObjectHandle](./object-handle.md). Call `:AsPlayer()` on the result to use the `PlayerObjectHandle` methods below.

Returns `nil` when the player has no character to return:

- **Server:** the player hasn't finished joining yet, or is gone.
- **Client:** the player's character isn't streamed in on this client (too far from the local player), or the player is gone. The local player's character is always available once it has spawned.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `ObjectHandle` or `nil` | the character |

**Example**

```lua
-- server: teleport every player to the same spot
local spot = vec3(2851.6, 541.1, -9920.1)

for _, client in ipairs(World.GetPlayers()) do
	local obj = client:GetPlayer()

	if obj then
		obj:AsPlayer():Teleport(spot)
	end
end
```

## PlayerObjectHandle methods {#playerobjecthandle-methods}

A `PlayerObjectHandle` is an [ObjectHandle](./object-handle.md), so it also has `GetPosition`, `GetHealth`, `SetHealth`, `GetData`, `SetData` and all the other methods on that page. The methods below are specific to player characters.

### player\:GetClient() {#playergetclient}

Returns the `PlayerHandle` (the connection) of the player that controls this character, or `nil` if the character is gone.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `PlayerHandle` or `nil` | the player's connection |

**Example**

```lua
Event.Add("OnPlayerTeleport", function(player)
	local client = player:GetClient()

	if client then
		print(client:GetName() .. " was teleported to " .. tostring(player:GetPosition()))
	end
end)
```

### player\:GetSkin() {#playergetskin}

Returns the id of the skin the player is wearing, as last set with `SetSkin` on the server. See the [skins list](../../lists/skins.md). Returns an empty string if no skin was ever set (the character wears the game's default), and `nil` if the character is gone.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `string` or `nil` | the skin id |

**Example**

```lua
-- server: save the skin when the player leaves
Event.Add("OnPlayerQuit", function(client)
	local obj = client:GetPlayer()

	if obj then
		SQL.Execute("UPDATE accounts SET skin = ? WHERE steam_id = ?", obj:AsPlayer():GetSkin(), client:GetUserId())
	end
end)
```

### player\:GetAnimation() {#playergetanimation}

Returns the custom animation the player is playing, as set with `PlayAnimation` (server) or `Local.PlayAnimation` (client), or an empty string when none is playing (or it was stopped). See the [animations list](../../lists/animations.md). Returns `nil` if the character is gone.

A non-looping animation keeps being reported here after it has finished playing, until another animation is set or it is stopped.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `string` or `nil` | the animation path, `""` if none |

**Example**

```lua
-- client: toggle a dance on the local player
local DANCE = "animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_trippy_airplane_loop.ban"

Cmd.Add("dance", function()
	local player = World.LocalPlayer():AsPlayer()

	if player:GetAnimation() == DANCE then
		Local.StopAnimation()
	else
		Local.PlayAnimation(DANCE, true)
	end
end)
```

### player\:GetVehicle() {#playergetvehicle}

Returns the vehicle the player is sitting in as a `VehicleHandle` (see [Vehicle](./vehicle.md)), or `nil` if they are on foot or the character is gone.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `VehicleHandle` or `nil` | the vehicle |

**Example**

```lua
local vehicle = player:GetVehicle()

if vehicle then
	print("driving " .. vehicle:GetId())
else
	print("on foot")
end
```

### player\:GetWeaponName(slot) {#playergetweaponnameslot}

Returns the name of the weapon the player has in a slot, or an empty string if the slot is empty. See the [weapons list](../../lists/weapons.md). Returns `nil` if the character is gone.

**Parameters**

| Name | Type | Description |
|---|---|---|
| slot | `integer` | a [WeaponSlot](../enums/weapon.md) value: `WeaponSlot.Primary`, `WeaponSlot.Secondary` or `WeaponSlot.Heavy`. Any other value raises a Lua error |

**Returns**

| Type | Description |
|---|---|
| `string` or `nil` | the weapon name, `""` if the slot is empty |

**Example**

```lua
for _, slot in ipairs({ WeaponSlot.Primary, WeaponSlot.Secondary, WeaponSlot.Heavy }) do
	local name = player:GetWeaponName(slot)

	print(slot, name ~= "" and name or "(empty)")
end
```

### player\:GetWeaponAmmo(slot, mode) {#playergetweaponammoslot-mode}

Returns the ammo loaded in the weapon in a slot, for one of its firing modes. The player's game reports its ammo as it changes (when firing and reloading), and `SetWeaponAmmo` changes it from the server. Returns `0` for an empty slot and `nil` if the character is gone.

**Parameters**

| Name | Type | Description |
|---|---|---|
| slot | `integer` | a [WeaponSlot](../enums/weapon.md) value (`Primary`, `Secondary` or `Heavy`); any other value raises a Lua error |
| mode | `integer` | a [WeaponMode](../enums/weapon.md) value: `WeaponMode.Primary` or `WeaponMode.Secondary`; any other value raises a Lua error |

**Returns**

| Type | Description |
|---|---|
| `integer` or `nil` | the ammo count |

**Example**

```lua
local ammo = player:GetWeaponAmmo(WeaponSlot.Primary, WeaponMode.Primary)

if ammo and ammo < 10 then
	print("running low on ammo")
end
```

### player\:GetInventoryAmmo(type) {#playergetinventoryammotype}

Returns how much spare ammo of a type the player carries in their inventory (the reserve used to reload). Returns `nil` if the character is gone.

**Parameters**

| Name | Type | Description |
|---|---|---|
| type | `integer` | an [AmmoType](../enums/weapon.md) value, for example `AmmoType.AssaultRifle`; an out-of-range value raises a Lua error |

**Returns**

| Type | Description |
|---|---|
| `integer` or `nil` | the ammo count |

**Example**

```lua
print("rockets left: " .. tostring(player:GetInventoryAmmo(AmmoType.Rockets)))
```