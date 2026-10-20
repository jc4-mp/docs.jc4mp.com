---
sidebar_position: 44
---

# Player (server)

The server-only methods of `PlayerHandle` (kicking, banning, ping and permissions) and of `PlayerObjectHandle` (changing a player's character for everyone).

**Available on:** Server

See also: [Player](../../shared/objects/player.md), [Player (client)](../../client/objects/player.md)

## PlayerHandle methods {#playerhandle-methods}

### client\:Kick(reason?) {#clientkickreason}

Disconnects the player from the server. The reason is sent to the player's game and shown to them, and the server log records it. The player is disconnected right after the reason is delivered; `OnPlayerQuit` then fires as for any other disconnect (if they had joined).

This also works for players who are still joining (for example during resource download), which makes it usable in `OnPlayerResourceAction`.

Kicking a player who is gone, or already being disconnected, does nothing.

**Parameters**

| Name | Type | Description |
|---|---|---|
| reason | `string` | optional, default `""`. Shown to the player; cut to 255 characters |

**Returns:** nothing

**Example**

```lua
Event.Add("OnPlayerJoin", function(client)
	if #client:GetName() < 3 then
		client:Kick("Your nickname must be at least 3 characters long.")
	end
end)
```

### client\:Ban(reason?) {#clientbanreason}

Adds the player's Steam ID to the server's ban list and kicks them. Their game shows the ban screen with the reason instead of the usual kick screen. The ban list is saved to `bans.txt` in the server's folder, so it survives restarts, and banned players are refused when they try to connect again. Remove a ban with the `unban` server console command.

Like `Kick`, this works for players who are still joining. Banning a player who is gone does nothing.

**Parameters**

| Name | Type | Description |
|---|---|---|
| reason | `string` | optional, default `""`. Shown on the player's ban screen; cut to 249 characters |

**Returns:** nothing

**Example**

```lua
Net.AddEvent("AdminBan", function(targetNid, reason)
	local sender = Net.Sender()

	if not (sender and sender:HasAcl(AclLevel.Admin)) then
		return
	end

	for _, client in ipairs(World.GetPlayers()) do
		if client:GetNetId() == targetNid then
			Chat.Broadcast(client:GetName() .. " was banned by " .. sender:GetName())
			client:Ban(reason)
		end
	end
end)
```

### client\:GetPing() {#clientgetping}

Returns the player's current round-trip time to the server, in milliseconds.

Only the server knows the players' pings. If client scripts need them (for example for a scoreboard), send them from the server with [Net](../net.md).

Returns `0` if the player is gone or hasn't joined yet.

**Parameters:** none

**Returns**

| Type | Description |
|---|---|
| `integer` | the ping in milliseconds |

**Example**

```lua
-- send every player's ping to everyone once per second
Timer.Set(function()
	local pings = {}

	for _, client in ipairs(World.GetPlayers()) do
		pings[#pings + 1] = { id = client:GetNetId(), ping = client:GetPing() }
	end

	Net.Broadcast("Pings", pings)
end, 1000, -1)
```

### client\:SetAcl(flags) {#clientsetaclflags}

Replaces the player's permission flags with the given [AclLevel](../../shared/enums/acl-level.md) value. The new value is synced to every client, so `GetAcl`/`HasAcl` return it on all sides.

The change only lasts until the player disconnects: on their next connection the level comes from the server config again. Save it yourself (for example with [SQL](../sql.md)) and set it again in `OnPlayerJoin` if it must persist.

Only works on players who have joined; does nothing otherwise.

**Parameters**

| Name | Type | Description |
|---|---|---|
| flags | `integer` | one or more [AclLevel](../../shared/enums/acl-level.md) flags, combined by adding them; `AclLevel.Default` removes every permission |

**Returns:** nothing

**Example**

```lua
-- make a player both admin and moderator
client:SetAcl(AclLevel.Admin + AclLevel.Moderator)

-- remove every permission
client:SetAcl(AclLevel.Default)
```

## PlayerObjectHandle methods {#playerobjecthandle-methods}

### player\:SetSkin(skin) {#playersetskinskin}

Changes the player's skin (character model) for everyone, including the player themself. The skin id is stored on the server, so players who see the character later also get it. See the [skins list](../../lists/skins.md) for the ids.

An id that matches no skin leaves the current model as it is. A name or tag only applies an entry that isn't a vehicle or a weapon, so `"rico"`, a tag only two vehicles have, changes nothing (Rico's model is `rico_debug`). An empty string is stored but doesn't change the model back.

Does nothing if the character is gone.

This is the only way to change a skin: client scripts can't change any player's skin, their own included. A client that wants a skin sends a request (for example `Net.Send("skin", name)`) and the server applies it, see the second example.

**Parameters**

| Name | Type | Description |
|---|---|---|
| skin | `string` | the skin id, at most 255 characters (longer raises a Lua error) |

**Returns:** nothing

**Example**

```lua
-- server: cops wear one skin, robbers another
local function applyTeamSkin(player, team)
	player:SetSkin(team == "cops" and "sargento" or "mira")
end
```

```lua
-- server: a client asked for a skin with Net.Send("skin", name)
Net.AddEvent("skin", function(name)
	local obj = Net.Sender():GetPlayer()

	if obj and type(name) == "string" then
		obj:AsPlayer():SetSkin(name)
	end
end)
```

### player\:PlayAnimation(animation, loop?) {#playerplayanimationanimation-loop}

Plays a custom animation on the player's character for everyone, including the player themself. It replaces any custom animation already playing. Players who see the character later also see the animation. See the [animations list](../../lists/animations.md).

If the game can't play the animation (an unknown path, for example), nothing visible happens and an error is written to the client's log.

Does nothing if the character is gone.

**Parameters**

| Name | Type | Description |
|---|---|---|
| animation | `string` | the animation path, at most 255 characters (longer raises a Lua error) |
| loop | `boolean` | optional, default `false`. Whether the animation repeats until stopped |

**Returns:** nothing

**Example**

```lua
-- server: everyone claps when someone wins
local CLAP = "animations/characters/contextact/civilian/staged/dancing/ca_civ_staged_dancing_gentle_clapping_loop.ban"

local function celebrate()
	for _, client in ipairs(World.GetPlayers()) do
		local obj = client:GetPlayer()

		if obj then
			obj:AsPlayer():PlayAnimation(CLAP, true)
		end
	end

	Timer.Set(function()
		for _, client in ipairs(World.GetPlayers()) do
			local obj = client:GetPlayer()

			if obj then
				obj:AsPlayer():StopAnimation()
			end
		end
	end, 5000, 1)
end
```

### player\:StopAnimation() {#playerstopanimation}

Stops the custom animation the player is playing, for everyone. Does nothing if the character is gone.

**Parameters:** none

**Returns:** nothing

**Example**

```lua
Event.Add("OnPlayerDamage", function(player)
	if player:GetAnimation() ~= "" then
		player:StopAnimation()
	end
end)
```

### player\:Respawn(position?, health?) {#playerrespawnposition-health}

Revives the player with the given health and then teleports them to `position`. This is how you bring a dead player back; it also works on a living player (it sets their health and moves them).

The teleport fires `OnPlayerTeleport` once the player's game has moved the character (see [server events](../events.md)).

`position` defaults to `vec3(0, 0, 0)`, the world origin, so always pass a spawn point in practice.

Does nothing if the character is gone.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | optional, default `vec3(0, 0, 0)`. Where the player reappears, in meters; must be finite (a NaN or infinite value raises a Lua error) |
| health | `number` | optional, default `1`. The health to revive with, 0..1 (outside that range raises a Lua error) |

**Returns:** nothing

**Example**

```lua
local spawnpoints =
{
	vec3(2851.6, 541.1, -9920.1),
	vec3(2834.4, 516.5, -9991.2),
}

Event.Add("OnPlayerKilled", function(player)
	Timer.Set(function(p)
		p:Respawn(spawnpoints[math.random(1, #spawnpoints)])
	end, 3000, 1, player)
end)
```

### player\:Teleport(position) {#playerteleportposition}

Moves a living player to a position. The player's own game moves the character, and `OnPlayerTeleport` fires on the server once it has (see [server events](../events.md)). The character keeps its rotation.

A dead player can't be teleported: use `Respawn` instead.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | the destination in meters; must be finite (a NaN or infinite value raises a Lua error) |

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | `true` if the teleport was sent, `false` if the player is dead, `nil` if the character is gone |

**Example**

```lua
Net.AddEvent("TeleportToWaypoint", function(position)
	local client = Net.Sender()
	local obj = client and client:GetPlayer()

	if obj and not obj:AsPlayer():Teleport(position) then
		Net.SendToPlayer(client, "Notify", "You can't teleport while dead.")
	end
end)
```

### player\:WarpIntoVehicle(vehicle, seat) {#playerwarpintovehiclevehicle-seat}

Puts a living player directly into a seat of a vehicle, without the enter animation. Every player who sees the character sees them in the vehicle.

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | the vehicle (see [Vehicle](../../shared/objects/vehicle.md)) |
| seat | `integer` | a [VehicleSeat](../../shared/enums/vehicle.md) value, for example `VehicleSeat.DriverSeat`; a value outside the seat range raises a Lua error |

**Returns**

| Type | Description |
|---|---|
| `boolean` or `nil` | `true` if the warp was sent, `false` if the vehicle is gone or the player is dead, `nil` if the character is gone |

**Example**

```lua
-- spawn a car next to a player and put them behind the wheel
local function giveCar(player)
	local car = World.SpawnVehicle("v000_car_atv_civilian_01", player:GetPosition() + vec3(3, 0, 0))

	player:WarpIntoVehicle(car, VehicleSeat.DriverSeat)
end
```

### player\:GiveWeapon(name, ammo, slot) {#playergiveweaponname-ammo-slot}

Gives the player a weapon in a slot, for everyone who sees the character. If the player already has a weapon in that slot, it is replaced. Ammo beyond what the weapon holds goes into the player's inventory as spare ammo. See the [weapons list](../../lists/weapons.md) for the names.

Does nothing if the character is gone.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | the weapon name, at most 255 characters (longer raises a Lua error) |
| ammo | `integer` | the ammo to give with it, 0 to 65535 |
| slot | `integer` | a [WeaponSlot](../../shared/enums/weapon.md) value: `WeaponSlot.Primary`, `WeaponSlot.Secondary` or `WeaponSlot.Heavy`. Any other value raises a Lua error |

**Returns:** nothing

**Example**

```lua
Event.Add("OnPlayerJoin", function(client)
	local player = client:GetPlayer():AsPlayer()

	player:GiveWeapon("wpn_000_assault_rifle", 240, WeaponSlot.Primary)
	player:GiveWeapon("wpn_022_shotgun", 40, WeaponSlot.Secondary)
end)
```

### player\:RemoveWeapon(slot) {#playerremoveweaponslot}

Removes the weapon from a slot, for everyone who sees the character. If it was the weapon in the player's hands, they end up with no weapon selected.

Does nothing if the character is gone.

**Parameters**

| Name | Type | Description |
|---|---|---|
| slot | `integer` | a [WeaponSlot](../../shared/enums/weapon.md) value (`Primary`, `Secondary` or `Heavy`); any other value raises a Lua error |

**Returns:** nothing

**Example**

```lua
-- disarm a player completely
for _, slot in ipairs({ WeaponSlot.Primary, WeaponSlot.Secondary, WeaponSlot.Heavy }) do
	player:RemoveWeapon(slot)
end
```

### player\:SetWeaponAmmo(slot, mode, ammo) {#playersetweaponammoslot-mode-ammo}

Sets the ammo loaded in the weapon in a slot, for one of its firing modes. The player's game and every player who sees the character are updated. Nothing happens if the slot is empty or the character is gone.

**Parameters**

| Name | Type | Description |
|---|---|---|
| slot | `integer` | a [WeaponSlot](../../shared/enums/weapon.md) value (`Primary`, `Secondary` or `Heavy`); any other value raises a Lua error |
| mode | `integer` | a [WeaponMode](../../shared/enums/weapon.md) value (`Primary` or `Secondary`); any other value raises a Lua error |
| ammo | `integer` | the new ammo count, 0 to 65535 |

**Returns:** nothing

**Example**

```lua
-- refill the magazine of the primary weapon
player:SetWeaponAmmo(WeaponSlot.Primary, WeaponMode.Primary, 30)
```

### player\:SetInventoryAmmo(type, ammo) {#playersetinventoryammotype-ammo}

Sets how much spare ammo of a type the player carries. The player's game and every player who sees the character are updated. Does nothing if the character is gone.

**Parameters**

| Name | Type | Description |
|---|---|---|
| type | `integer` | an [AmmoType](../../shared/enums/weapon.md) value, for example `AmmoType.Sniper`; an out-of-range value raises a Lua error |
| ammo | `integer` | the new ammo count, 0 to 65535 |

**Returns:** nothing

**Example**

```lua
-- a sniper-only round
player:GiveWeapon("wpn_032_sniper_rifle", 10, WeaponSlot.Primary)
player:SetInventoryAmmo(AmmoType.Sniper, 50)
```