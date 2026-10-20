---
sidebar_position: 23
---

# AclLevel

`AclLevel` holds the permission flags a server gives its players: owner, admin and moderator. Use it to restrict commands, menus and server events to trusted players.

**Available on:** Server, Client

## Values {#values}

### AclLevel {#acllevel}

The values are bit flags, so a player can hold several at once: a player's ACL is the sum (bitwise OR) of its flags, and `AclLevel.Default` (0) means no permissions at all.

A player's ACL comes from the `acl` object of the server's `cfg/config.json`, which maps a Steam ID to `"owner"`, `"admin"` or `"moderator"` (one level per player). It is applied when the player is authorized. Scripts can change it at runtime with `SetAcl`. Every client knows every player's ACL, and a change made by the server is synced to all of them.

Used by (see [PlayerHandle](../objects/player.md)):

- `client:GetAcl()` (server and client): the player's flags as an integer. Returns `AclLevel.Default` for an invalid handle.
- `client:HasAcl(level)` (server and client): `true` when the player has every flag in `level`. `client:HasAcl(AclLevel.Default)` is always `true` for a valid handle. Returns `false` for an invalid handle.
- `client:SetAcl(flags)` (server): replaces the player's flags with `flags`. Does nothing for an invalid handle.

Levels are independent flags, not a ladder: an owner is not automatically an admin. To check "admin or higher", test each flag you accept.

| Name | Value | Meaning |
|---|---|---|
| `AclLevel.Default` | 0 | No permissions (a regular player). |
| `AclLevel.Owner` | 1 | Server owner. |
| `AclLevel.Admin` | 2 | Administrator. |
| `AclLevel.Moderator` | 4 | Moderator. |

To combine flags, use `bit.bor` or add them (each flag is a different bit): `bit.bor(AclLevel.Admin, AclLevel.Moderator)` and `AclLevel.Admin + AclLevel.Moderator` are both 6. To test a flag in a value, use `bit.band(flags, AclLevel.Admin) ~= 0` (see [Sandbox](../sandbox.md#bit)).

**Example**

```lua
-- server: only owners and admins may use the "heal" net event, and the first owner online promotes a player
local function is_staff(client)
	return client:HasAcl(AclLevel.Owner) or client:HasAcl(AclLevel.Admin)
end

Net.AddEvent("heal", function()
	local client = Net.Sender()
	if not is_staff(client) then
		return
	end

	local player = client:GetPlayer()
	if player then
		player:SetHealth(1.0)
	end
end)

Net.AddEvent("promote", function(target_nid)
	local client = Net.Sender()
	if not client:HasAcl(AclLevel.Owner) then
		return
	end

	for _, other in ipairs(World.GetPlayers()) do
		if other:GetNetId() == target_nid and not other:HasAcl(AclLevel.Moderator) then
			other:SetAcl(other:GetAcl() + AclLevel.Moderator)
		end
	end
end)
```