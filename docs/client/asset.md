---
sidebar_position: 74
---

# Asset

The `Asset` table tells you whether a game asset (a model, a collision shape, an effect, a texture...) is currently loaded in the game's resource cache on this client. Just Cause 4 streams most assets in and out as the player moves around, and some spawn functions only work, or only look right, when the assets they need are already loaded. Check first with `Asset.IsLoaded` to avoid spawning invisible or collisionless objects.

**Available on:** Client

## Functions {#functions}

### Asset.IsLoaded(name) {#assetisloadedname}

Returns whether the asset with the given path is loaded right now. The path is the asset's file path inside the game archives, with its extension, for example `"models/environments/locale_global/mil_prop_barrel_a/mil_prop_barrel_a_barrel_a.modelc"` (a model) or `"models/environments/locale_global/mil_prop_barrel_a/mil_prop_barrel_a_barrel_a_col.pfxc"` (its collision). The name is hashed exactly as written, so spell it the way the game does (lowercase, forward slashes). See the [lists](../lists/README.md) for asset names.

The answer can change from one moment to the next: an asset that is loaded while the player is nearby may be unloaded after they travel away, and an asset that is not loaded now may be streamed in later. Check again right before you use it.

`Asset.IsLoaded` never loads anything itself. An unknown or misspelled name simply returns `false`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | The asset's path in the game archives, with extension. |

**Returns** `boolean`: `true` when the asset is in the resource cache, `false` otherwise.

**Example**

```lua
-- only spawn a rigid object when both its model and its collision are loaded on this client
local function try_spawn_barrel(position)
	local base = "models/environments/locale_global/mil_prop_barrel_a/mil_prop_barrel_a_barrel_a"
	local model, collision = base .. ".modelc", base .. "_col.pfxc"

	if not (Asset.IsLoaded(model) and Asset.IsLoaded(collision)) then
		print("barrel assets are not loaded here, skipping")
		return nil
	end

	return World.SpawnRigidObject(position, model, collision, RigidObjectMotionType.Dynamic)
end
```