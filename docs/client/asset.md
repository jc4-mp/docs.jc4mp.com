---
sidebar_position: 74
---

# Asset

The `Asset` table tells you whether a game asset (a model, a collision shape, an effect, a texture...) is currently loaded in the game's resource cache on this client, and loads your own 3D models into it. Just Cause 4 streams most assets in and out as the player moves around, and some spawn functions only work, or only look right, when the assets they need are already loaded. Check first with `Asset.IsLoaded` to avoid spawning invisible or collisionless objects.

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

### Asset.LoadGLB(file, callback, options?) {#assetloadglbfile-callback-options}

Converts a `.glb` model file of your resource into a game model and its collision, loads both into the game, then calls `callback`. Afterwards the model can be spawned like any game prop with [`World.SpawnRigidObject`](./world.md#worldspawnrigidobjectposition-model-pfx-motiontype-rotation), on the client, or on the server for every player (see [World (server)](../server/world.md#worldspawnrigidobjectposition-model-pfx-motiontype-rotation-health)).

`file` is relative to the folder of the calling script, like in [`Sound.Create`](./sound.md#soundcreatename-filename): from `client/main.lua`, `"models/chair.glb"` means `client/models/chair.glb`. The file must be in the resource's `client/` or `shared/` folder so players download it when they join. The conversion runs in the background, so the game doesn't freeze; it usually takes well under a second, longer for large textures.

The model is named after the resource and the file name without its extension, whatever folder the file is in: `model.glb` in the resource `test` is `test_model`, and loads as:

- model: `"models/jc4mp/test_model.modelc"`
- collision: `"models/jc4mp/test_model_col.pfxc"`

Because the names are fixed, a server script can spawn the model with these paths too. Every player whose client loaded the model sees the object; on a client that hasn't loaded it (yet), the object waits until it has.

What is converted:

- **Geometry:** every mesh of the GLB's default scene with its node transforms, `scale` applied. Y is up, and the model's pivot is moved to the bottom center of its bounds, so a model spawned on the ground stands on it.
- **Materials:** the base color texture and factor, the normal texture, and the metallic-roughness texture (an approximate mapping) on the game's standard shader. Back faces are hidden unless the material is double sided.
- **Collision:** one box that fills the model's bounds (at least 4 cm thick), not the model's exact shape.

The GLB has to be static, opaque and self-contained: triangles with embedded images (PNG or JPEG) and one embedded buffer. Skins, animations, morph targets, sparse accessors, compressed meshes (Draco, meshopt), transparent or emissive materials, material extensions, required extensions, texture transforms and textures on another UV set than the first are refused with an error. Meshes with more than 65535 vertices are split, nothing is simplified.

The game keeps what it loaded under a name until it restarts. Loading the same name again (another script, or after a resource restart) gives the same paths right away without converting again, even if the file changed. To see changes to a model, restart the game, or give the file a new name. Loading a different file under a name that is already taken (two `model.glb` in different folders of the same resource) fails.

If the resource stops before the conversion is done, the callback is not called.

**Parameters**

| Name | Type | Description |
|---|---|---|
| file | `string` | path of the `.glb` file, relative to the calling script's folder |
| callback | `function` | called as `callback(model, collision)` when the model is loaded, or `callback(nil, error)` when it could not be converted or loaded. `error` is a `string` that says why |
| options | `table` | optional. `scale` (`number`, default `1`): size multiplier, the GLB's units are meters. `maxTextureSize` (`number`, 16 to 2048, default `2048`): larger textures are shrunk to fit |

**Returns:** nothing. The result goes to `callback`.

**Example**

```lua
-- client/main.lua of the resource "props": load models/chair.glb, then spawn a chair in front of the player
Asset.LoadGLB("models/chair.glb", function(model, collision)
	if not model then
		print("could not load the chair: " .. collision)
		return
	end

	-- model is "models/jc4mp/props_chair.modelc", collision is "models/jc4mp/props_chair_col.pfxc"
	local position = World.LocalPlayer():GetPosition() + vec3(0, 0, 3)

	World.SpawnRigidObject(position, model, collision, RigidObjectMotionType.Dynamic)
end, { scale = 1.5 })
```