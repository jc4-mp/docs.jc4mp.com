---
sidebar_position: 82
---

# ForcePulseCategory and ForcePulseTuning

A force pulse is the physical push of an explosion: it shoves objects, characters and vehicles away from its center. These tables are used when you spawn one yourself: `ForcePulseTuning` picks one of the game's built-in explosion tunings, and `ForcePulseCategory` picks the kind of explosion, which decides how strongly it pushes.

**Available on:** Client

## Values {#values}

Both tables are used by [`World.SpawnForcePulse(position, tuning, radius, category, velocity, pressure)`](../world.md) (client). It returns a [`ForcePulse`](../game-objects.md) game object, which you set off with `forcePulse:Explode()`. The pulse only exists in the local game and is not synced to other players. `radius` is in meters.

### ForcePulseCategory {#forcepulsecategory}

The kind of explosion. Every category except `Manual` uses the game's preset push strength for that kind of explosion, and the `velocity` and `pressure` arguments are not used. With `Manual`, the pulse uses the `velocity` and `pressure` you pass instead of a preset.

| Name | Value | Meaning |
|---|---|---|
| `ForcePulseCategory.Handgrenade` | 0 | Pushes like a hand grenade. |
| `ForcePulseCategory.FuelBarrel` | 1 | Pushes like an exploding fuel barrel. |
| `ForcePulseCategory.C4` | 2 | Pushes like C4 (planted explosives). |
| `ForcePulseCategory.Vehicle` | 3 | Pushes like an exploding vehicle. |
| `ForcePulseCategory.FuelTruck` | 4 | Pushes like an exploding fuel truck. |
| `ForcePulseCategory.Manual` | -1 | Uses the `velocity` and `pressure` arguments instead of a preset. |

### ForcePulseTuning {#forcepulsetuning}

The game's built-in explosion tunings: the full catalog of force pulse settings that ship with the game. Each value is a 32-bit hash identifying one of them. The generic ones are named after their size; the others are the tunings the game uses for that weapon, vehicle or object.

| Name | Value | Meaning |
|---|---|---|
| `ForcePulseTuning.Generic05mNoDamage` | `0x65F06325` | Generic pulse, 0.5 m, no damage. |
| `ForcePulseTuning.Generic1m` | `0x7D1B192D` | Generic pulse, 1 m. |
| `ForcePulseTuning.Generic1mHighDamage` | `0x429A5BE3` | Generic pulse, 1 m, high damage. |
| `ForcePulseTuning.Generic3m` | `0x7C72DBAC` | Generic pulse, 3 m. |
| `ForcePulseTuning.Generic5m` | `0xCD1014C8` | Generic pulse, 5 m. |
| `ForcePulseTuning.Generic5mNoDamage` | `0x52A0D542` | Generic pulse, 5 m, no damage. |
| `ForcePulseTuning.Generic8m` | `0x0C7F628C` | Generic pulse, 8 m. |
| `ForcePulseTuning.Generic10m` | `0x385471F7` | Generic pulse, 10 m. |
| `ForcePulseTuning.Generic15m` | `0x6095E7C3` | Generic pulse, 15 m. |
| `ForcePulseTuning.Generic20m` | `0x896CFFD5` | Generic pulse, 20 m. |
| `ForcePulseTuning.GenericDamagePulse1m` | `0xE3DD8F8C` | Generic damage pulse, 1 m. |
| `ForcePulseTuning.HandGrenade` | `0x61878FBA` | A hand grenade explosion. |
| `ForcePulseTuning.GrenadeLauncher` | `0xA9778ADD` | A grenade launcher grenade. |
| `ForcePulseTuning.ConcussionGrenade` | `0xF7C59BA8` | A concussion grenade. |
| `ForcePulseTuning.PlantedExplosive` | `0xBB2CE1C5` | A planted explosive. |
| `ForcePulseTuning.TurretPropulsion` | `0x6399907C` | Turret propulsion blast. |
| `ForcePulseTuning.W203AntiAir` | `0x10E360A9` | The anti-air weapon (`w203`). |
| `ForcePulseTuning.W304DeathDroppedGrenade` | `0x03324F11` | The grenade an enemy drops when killed (`w304`). |
| `ForcePulseTuning.DebugRpg` | `0x72949518` | A rocket launcher rocket. |
| `ForcePulseTuning.CarMedium` | `0x8C9F685A` | A medium car exploding. |
| `ForcePulseTuning.BikeMedium` | `0x4772553B` | A medium motorbike exploding. |
| `ForcePulseTuning.BoatMedium` | `0x846954E6` | A medium boat exploding. |
| `ForcePulseTuning.BoatLarge` | `0xDEF0EEC0` | A large boat exploding. |
| `ForcePulseTuning.HelicopterMedium` | `0x3516F595` | A medium helicopter exploding. |
| `ForcePulseTuning.AirplaneMedium` | `0x2E5C99E0` | A medium airplane exploding. |
| `ForcePulseTuning.TrainMedium` | `0xC66D548C` | A medium train exploding. |
| `ForcePulseTuning.Barrel` | `0x758E107E` | An explosive barrel. |
| `ForcePulseTuning.FuelTank` | `0x9D17A841` | A fuel tank. |
| `ForcePulseTuning.FuelTankControlbox2m` | `0x3FC6C088` | A fuel tank control box, 2 m. |
| `ForcePulseTuning.FuelTankSpherical` | `0x491A7075` | A spherical fuel tank. |
| `ForcePulseTuning.SpringMine` | `0x85CD095F` | A spring mine. |
| `ForcePulseTuning.Lightning` | `0x47971D51` | A lightning strike. |
| `ForcePulseTuning.Retooler` | `0x2ECF0027` | The retooler. |

**Example**

```lua
-- client: push everything around the local player's aim point away, like a car exploding
Cmd.Add("blast", function()
	local player = World.LocalPlayer()
	if not player then
		return
	end

	local position = player:AsPlayer():GetAimPosition()
	local pulse = World.SpawnForcePulse(position, ForcePulseTuning.CarMedium, 10, ForcePulseCategory.Vehicle, 0, 0)

	if pulse then
		pulse:Explode()
	end
end)

-- a custom, very strong push
Cmd.Add("bigpush", function()
	local position = World.LocalPlayer():AsPlayer():GetAimPosition()
	local pulse = World.SpawnForcePulse(position, ForcePulseTuning.Generic20m, 20, ForcePulseCategory.Manual, 60, 50)

	if pulse then
		pulse:Explode()
	end
end)
```