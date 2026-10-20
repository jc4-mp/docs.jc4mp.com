---
sidebar_position: 72
---

# Weapon

A weapon inside the game. Giving, removing and reading the weapons of players is done on the player objects instead (see [Player](../shared/objects/player.md)), with weapon names from the [weapons list](../lists/weapons.md).

**Available on:** Client

A weapon inside the game, returned by [`player:GetWeapon()`](./objects/player.md) (the weapon the player currently holds). It is a [game object](./game-objects.md): local to this client, owned by the game, and only valid while that weapon exists. Fetch it again when you need it instead of storing it; after the player switches or drops the weapon, an old `Weapon` value must not be used.

It has the [methods every game object type has](./game-objects.md#methods-every-type-has): `GetPosition`, `GetRotation` and `GetEulerRotation` give the weapon's real transform, and `GO` returns its [`GameObject`](./game-objects.md#gameobject) part. `Destroy` does nothing on a weapon, since scripts never spawn weapons.

**Example**

```lua
-- mark where the local player's current weapon is
Event.Add("OnRender", function()
	local weapon = World.LocalPlayer():AsPlayer():GetWeapon()

	if weapon then
		Render.DrawSphere(weapon:GetPosition(), 0.05, vec4(1, 0, 0, 1), false)
	end
end)
```