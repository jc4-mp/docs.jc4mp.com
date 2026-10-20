---
sidebar_position: 73
---

# GameUI

The `GameUI` table changes parts of Just Cause 4's own HUD: the region name shown on screen and the weapons display. For fully custom interfaces, use [webviews](./ui.md) instead.

**Available on:** Client

Both settings are client-wide while the resource runs: they are shared by all resources and only affect this player's screen. When the resource that changed them stops, its changes are undone (see each function), unless another resource has changed the setting since, in which case that change is kept.

## Functions {#functions}

### GameUI.SetRegionName(name) {#gameuisetregionnamename}

Overrides the name of the region the HUD shows (the area name the game normally takes from where the player is on the map). The override stays until it is changed again or the resource stops: if the region name is still the one this resource set, the game's own region name comes back.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | The text to show. `"NONE"` hides the region name entirely. `""` (empty) removes the override, so the game shows the real region name again. |

**Returns** nothing.

**Example**

```lua
-- show the game mode's arena name while the resource runs
GameUI.SetRegionName("Derby Arena")
```

### GameUI.EnableWeaponsHUD(enable) {#gameuienableweaponshudenable}

Shows or hides the game's weapons HUD (the current weapon and its ammunition). While disabled, it stays hidden even when the player switches weapons. Enabled by default. If the resource that hid it stops while it is still hidden, it is shown again.

**Parameters**

| Name | Type | Description |
|---|---|---|
| enable | `boolean` | `true` to show the weapons HUD, `false` to hide it. |

**Returns** nothing.

**Example**

```lua
-- a melee-only mode with its own HUD
GameUI.EnableWeaponsHUD(false)
```

### GameUI.IsWeaponsHUDEnabled() {#gameuiisweaponshudenabled}

Returns whether the weapons HUD is enabled (the last value passed to [`GameUI.EnableWeaponsHUD`](#gameuienableweaponshudenable), `true` by default).

**Returns** `boolean`.

**Example**

```lua
Cmd.Add("togglehud", function()
	GameUI.EnableWeaponsHUD(not GameUI.IsWeaponsHUDEnabled())
end)
```