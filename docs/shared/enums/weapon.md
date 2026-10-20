---
sidebar_position: 31
---

# WeaponSlot, WeaponMode and AmmoType

These tables describe a player's weapons: which inventory slot a weapon is in (`WeaponSlot`), which of its two firing modes you mean (`WeaponMode`), and which ammunition pool you mean (`AmmoType`). Use them to give, remove and inspect weapons and ammo.

**Available on:** Server, Client

## Values {#values}

### WeaponSlot {#weaponslot}

A player carries up to one weapon per slot.

Used by (see [PlayerObjectHandle](../objects/player.md)):

- `player:GetWeaponName(slot)`, `player:GetWeaponAmmo(slot, mode)` (server and client)
- `player:GiveWeapon(name, ammo, slot)`, `player:RemoveWeapon(slot)`, `player:SetWeaponAmmo(slot, mode, ammo)` (server)

These functions accept the four slots below (the integers 0 to 3). Anything else raises the Lua error `invalid weapon slot <n>`.

| Name | Value | Meaning |
|---|---|---|
| `WeaponSlot.Primary` | 0 | The primary weapon slot. |
| `WeaponSlot.Secondary` | 1 | The secondary weapon slot. |
| `WeaponSlot.Heavy` | 2 | The heavy weapon slot. |
| `WeaponSlot.HandGrenade` | 3 | The hand grenade slot, for thrown weapons such as `w301_frag_grenade`. |

### WeaponMode {#weaponmode}

Every weapon has a primary and a secondary fire mode (in Just Cause 4 most weapons have an alternate fire), each with its own loaded ammo.

Used by (see [PlayerObjectHandle](../objects/player.md)):

- `player:GetWeaponAmmo(slot, mode)` (server and client)
- `player:SetWeaponAmmo(slot, mode, ammo)` (server)

Any value other than 0 or 1 raises the Lua error `invalid weapon mode <n>`.

| Name | Value | Meaning |
|---|---|---|
| `WeaponMode.Primary` | 0 | The weapon's primary fire. |
| `WeaponMode.Secondary` | 1 | The weapon's secondary (alternate) fire. |

### AmmoType {#ammotype}

A player's spare ammunition is kept per ammo type, shared by every weapon that uses that type.

Used by (see [PlayerObjectHandle](../objects/player.md)):

- `player:GetInventoryAmmo(type)` (server and client)
- `player:SetInventoryAmmo(type, ammo)` (server)

Any value outside 0..44 raises the Lua error `invalid ammo type <n>`. Which weapon uses which type is decided by the game's weapon data; see the [weapons list](../../lists/weapons.md).

| Name | Value | Meaning |
|---|---|---|
| `AmmoType.Pistol` | 0 | Pistol ammo. |
| `AmmoType.Shotgun` | 1 | Shotgun shells. |
| `AmmoType.SMG` | 2 | Submachine gun ammo. |
| `AmmoType.AssaultRifle` | 3 | Assault rifle ammo. |
| `AmmoType.CombatRifle` | 4 | Combat rifle ammo. |
| `AmmoType.MachineGun` | 5 | Machine gun ammo. |
| `AmmoType.Sniper` | 6 | Sniper rifle ammo. |
| `AmmoType.Rockets` | 7 | Rockets for rocket launchers. |
| `AmmoType.Explosives` | 8 | Explosives. |
| `AmmoType.HandGrenade` | 9 | Hand grenades. |
| `AmmoType.GrenadeLauncher` | 10 | Grenade launcher grenades. |
| `AmmoType.SunGun` | 11 | Sun gun ammo. |
| `AmmoType.MissileStrike` | 12 | Missile strikes. |
| `AmmoType.Unlimited` | 13 | Used by weapons with unlimited ammunition. |
| `AmmoType.Beacon` | 14 | Beacons. |
| `AmmoType.NoAmmo` | 15 | Used by weapons that use no ammunition. |
| `AmmoType.Flare` | 16 | Flares. |
| `AmmoType.EMP` | 17 | EMP ammo. |
| `AmmoType.Mine` | 18 | Mines. |
| `AmmoType.Battery` | 19 | Batteries. |
| `AmmoType.TripwireMine` | 20 | Tripwire mines. |
| `AmmoType.Railgun` | 21 | Railgun ammo. |
| `AmmoType.Arrows` | 22 | Arrows. |
| `AmmoType.MiniRockets` | 23 | Mini rockets. |
| `AmmoType.ConcussionGrenade` | 24 | Concussion grenades. |
| `AmmoType.SmokeGrenade` | 25 | Smoke grenades. |
| `AmmoType.AttackDrone` | 26 | Attack drones. |
| `AmmoType.GuardDrone` | 27 | Guard drones. |
| `AmmoType.ExplosiveBullets` | 28 | Explosive bullets. |
| `AmmoType.StormGrenade` | 29 | Storm grenades. |
| `AmmoType.AirCartridge` | 30 | Air cartridges. |
| `AmmoType.BurstRifle` | 31 | Burst rifle ammo. |
| `AmmoType.RocketsAOC` | 32 | Rockets, AOC weapon variant. |
| `AmmoType.AssaultRifleAOC` | 33 | Assault rifle ammo, AOC weapon variant. |
| `AmmoType.ShotgunAOC` | 34 | Shotgun shells, AOC weapon variant. |
| `AmmoType.SniperAOC` | 35 | Sniper rifle ammo, AOC weapon variant. |
| `AmmoType.MachineGunAOC` | 36 | Machine gun ammo, AOC weapon variant. |
| `AmmoType.DlcSlot1` | 37 | Ammo slot reserved for DLC weapons (1). |
| `AmmoType.DlcSlot2` | 38 | Ammo slot reserved for DLC weapons (2). |
| `AmmoType.DlcSlot3` | 39 | Ammo slot reserved for DLC weapons (3). |
| `AmmoType.DlcSlot4` | 40 | Ammo slot reserved for DLC weapons (4). |
| `AmmoType.DlcSlot5` | 41 | Ammo slot reserved for DLC weapons (5). |
| `AmmoType.DlcSlot6` | 42 | Ammo slot reserved for DLC weapons (6). |
| `AmmoType.DlcSlot7` | 43 | Ammo slot reserved for DLC weapons (7). |
| `AmmoType.DlcSlot8` | 44 | Ammo slot reserved for DLC weapons (8). |

**Example**

```lua
-- server: give a joining player a loadout, then set their ammo
Event.Add("OnPlayerJoin", function(client)
	local player = client:GetPlayer()
	if not player then
		return
	end

	player = player:AsPlayer()

	player:GiveWeapon("wpn_000_assault_rifle", 240, WeaponSlot.Primary)
	player:GiveWeapon("wpn_022_shotgun", 40, WeaponSlot.Secondary)
	player:SetWeaponAmmo(WeaponSlot.Secondary, WeaponMode.Primary, 8)
	player:SetInventoryAmmo(AmmoType.AssaultRifle, 500)

	print(client:GetName() .. " has " .. player:GetInventoryAmmo(AmmoType.AssaultRifle) .. " spare rifle rounds")
end)
```