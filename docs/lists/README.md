---
sidebar_position: 87
---

# Asset Lists

Reference lists of every game asset name a script can pass to the JC4MP API: vehicle models, mounted guns, weapons, skins, NPCs, animations, effects, explosions and rigid object models. They were generated from the retail game's own data (spawn definitions and the archive file list, base game and every DLC), so they cover everything the installed game has.

**Available on:** Server, Client

## Lists {#lists}

| List | Used by | Entries |
|---|---|---|
| [Vehicles](./vehicles.md) | `World.SpawnVehicle` | 318 models, 231 prototype entries |
| [Mounted guns](./mounted-guns.md) | `World.SpawnMountedGun` | 9 models, 11 prototype entries |
| [Weapons](./weapons.md) | `player:GiveWeapon`, `npc:GiveWeapon` | 37 weapons, 27 prototype entries |
| [Skins](./skins.md) | `player:SetSkin` | 199 characters, 196 prototype entries |
| [NPCs](./npcs.md) | `World.SpawnNPC` | 220 characters and animals, 196 prototype entries |
| [Animations](./animations.md) | `player:PlayAnimation`, `Local.PlayAnimation` | 428 named, 916 civilian animation files |
| [Effects](./effects.md) | `FX.Spawn` | 879 effects |
| [Explosions](./explosions.md) | `World.SpawnExplosion` | 61 entities |
| [Rigid objects](./rigid-objects.md) | `World.SpawnRigidObject` | 4356 models |
| [Sounds](./sounds.md) | `Sound.Create`, `Sound.Play2D`, `Sound.Play3D` | your own files |

## Values {#values}

### Spawn names {#spawn-names}

Vehicles, mounted guns, weapons, skins and NPCs use the game's **spawn names**: the name of an entry in the game's spawn system, such as `v000_car_atv_civilian_01` or `wpn_001_assault_rifle`.

- Names are lowercase and must be typed exactly as listed. An unknown name spawns or gives nothing; it doesn't raise a Lua error (on the server, only a name or path longer than 255 characters does).
- The server only sends the name: every player's game spawns the asset from its own files. So the same name gives every player the same model.
- The spawn system also accepts **tags** in place of a name, separated by commas or spaces (`"vehicle,air,helicopter"`), and a tag can be excluded with a leading `-` or `!`. Tags pick a random entry with all of them, and every player's game makes that pick separately, so players can end up seeing different models. Use tags for quick tests only and unique names in real scripts. Each list shows the tags of every entry.
- Each list also has a **Prototype entries** section: the game registers every exported entity a second time under its file name plus `_debug`. Those names spawn in the retail game too, and they reach a few assets that have no regular name, but they were made for the developers' debug menu and have not been tested with JC4MP.

### Asset paths {#asset-paths}

Animations, effects, explosions and rigid objects use **file paths** inside the game archives, such as `effects/confetti_explosion.effc`. Paths are lowercase, use `/`, include the extension and must match exactly; the lists group them by folder to keep them short.

### DLC content {#dlc-content}

Assets marked with a DLC are only installed for players who own that DLC. A player without it can't spawn or see the asset, so a server that uses DLC assets should require the DLC. List the Steam app ids in `required_dlcs` in the server's `cfg/config.json`, and the launcher stops Steam players who don't own them from joining:

```json
{
	"required_dlcs": ["971760", "972350"]
}
```

| DLC | Steam app id | Archive folder |
|---|---|---|
| Adversary Vehicle Pack | `1087122` | `market3` |
| Brawler Mech | `1087130` | `market5` |
| Danger Rising | `972350` | `agency` |
| Dare Devils of Destruction | `971760` | `daredevil` |
| Deathstalker Scorpion Pack | `868420` | `cp_deathstalker` |
| Digital Deluxe Content | `868422` | `cp_digitaldeluxe` |
| Golden Gear Pack | `868423` | `cp_goldengear` |
| Los Demonios | `972351` | `demonios` |
| Neon Racer Pack | `868428` | `cp_neonracer` |
| Renegade Pack | `868429` | `cp_renegade` |
| Sea Dogs Vehicle Pack | `1087123` | `market4` |
| Shark & Bark Vehicle Pack | `1087131` | `market6` |
| Soaring Speed Vehicle Pack | `1087121` | `market2` |
| The Dragon | `1028920` | `wpn_904_dragon` |
| Toy Vehicle Pack | `1087120` | `market1` |

Some garage vehicles (the Rubber Ducky boat, the Tuk-Tuk Boom Boom and the Chevalier Ice Breaker) and the Cluster Bomb ship in the base game's own files and need no DLC.

**Example**

```lua
-- server: a random civilian car for every player who asks, using unique names only
local CARS = {
	"v000_car_atv_civilian_01",
	"v002_car_vintagesuv_civilian",
	"v017_car_vintagemuscle_civilian",
	"v024_car_ecosuper_civilian_01",
}

Net.AddEvent("RandomCar", function()
	local obj = Net.Sender():GetPlayer()
	if not obj then return end

	World.SpawnVehicle(CARS[math.random(#CARS)], obj:GetPosition() + vec3(4, 1, 0))
end)
```