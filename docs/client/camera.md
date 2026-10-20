---
sidebar_position: 64
---

# Camera

The `Camera` table works with the game camera the player currently sees through: projecting world positions to the screen (for name tags, markers and other 2D overlays), reading its position, changing its field of view, and shaking it.

**Available on:** Client

All functions act on the active camera of this client only. When no camera is active (for example while loading), they fall back to the values described for each function.

## Functions {#functions}

### Camera.WorldToScreen(position) {#cameraworldtoscreenposition}

Projects a world position onto the screen. The result is in pixels from the top-left corner of the game's drawing area, the same space as [`Render.GetSize`](./render.md#rendergetsize) and webview positions.

Returns `nil` when the position is behind the camera (or too close to its plane to project), and when no camera is active. A position in front of the camera but outside the view still returns a point, outside the `0..width` / `0..height` range, so check the bounds if you only want visible points.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | World position to project. |

**Returns** `vec2` (pixels) or `nil`.

**Example**

```lua
-- keep a small webview label above a world position
local TARGET = vec3(-3800, 125, 2200)

Event.Add("OnRender", function()
	local screen = Camera.WorldToScreen(TARGET)
	local size = Render.GetSize()

	local visible = screen ~= nil and screen.x >= 0 and screen.y >= 0 and screen.x <= size.x and screen.y <= size.y

	WebView.SetVisible(label, visible)

	if visible then
		WebView.SetPosition(label, screen - vec2(50, 20))
	end
end)
```

### Camera.GetPosition() {#cameragetposition}

Returns the active camera's world position. In third person this is behind and above the player; use it as the origin for "what is the player looking at" rays.

**Returns** `vec3`. `vec3(0, 0, 0)` when no camera is active.

**Example**

```lua
local distance = (Camera.GetPosition() - World.LocalPlayer():GetPosition()):length()

print(string.format("camera is %.1f m from the player", distance))
```

### Camera.GetFOV() {#cameragetfov}

Returns the active camera's field of view, in **radians**.

**Returns** `number`. `0` when no camera is active.

**Example**

```lua
print(string.format("FOV: %.1f degrees", math.deg(Camera.GetFOV())))
```

### Camera.SetFOV(fov) {#camerasetfovfov}

Sets the active camera's field of view, in **radians**. Smaller values zoom in. The game's own camera logic (aiming, vehicles, the sniper scope zoom) also sets the field of view, so a value you set can be replaced; to hold a field of view, set it again every frame. Does nothing when no camera is active.

**Parameters**

| Name | Type | Description |
|---|---|---|
| fov | `number` | Field of view in radians, for example `math.rad(40)`. |

**Returns** nothing.

**Example**

```lua
-- hold Z to zoom in (binoculars)
local normal_fov

Event.Add("OnUpdate", function()
	if Input.IsKeyDown(Key.Z) then
		normal_fov = normal_fov or Camera.GetFOV()
		Camera.SetFOV(math.rad(15))
	elseif normal_fov then
		Camera.SetFOV(normal_fov)
		normal_fov = nil
	end
end)
```

### Camera.SpawnShake(type, position, amplitude, frequency, falloff, time, radialBlur) {#cameraspawnshaketype-position-amplitude-frequency-falloff-time-radialblur}

Starts a camera shake through the game's camera shake system, like the ones the game plays for nearby explosions. The shake is local to this client.

**Parameters**

| Name | Type | Description |
|---|---|---|
| type | [`CameraShakeType`](./enums/camera-shake-type.md) | The shake type: the translation types shake the camera's position (`amplitude` is an x, y, z offset), the rotation types shake its orientation (`amplitude` is pitch, yaw, roll). |
| position | `vec3` | World position the shake comes from. Only the `Spatial` types use it; the `Absolute` types shake the camera the same wherever it is. |
| amplitude | `vec3` | Strength of the shake on each axis, see `type`. |
| frequency | `number` | How fast the camera oscillates. |
| falloff | `number` | For the `Spatial` types, the distance in meters from `position` at which the shake fades out completely: its strength is `1 - (distance / falloff)²`, full at `position`. `0` means no falloff. The `Absolute` types ignore it. |
| time | `number` | How long the shake lasts, in seconds. Its amplitude fades linearly from full to nothing over that time. |
| radialBlur | `number` | Strength of the radial blur added during the shake, `0` for none. |

**Returns** nothing.

**Example**

```lua
-- shake the camera when a script-made explosion goes off nearby
local function boom(position)
	FX.Spawn("effects/fire/fire_barrel.effc", position, vec3(0, 0, 0))
	Camera.SpawnShake(CameraShakeType.SpatialTranslation, position, vec3(0.3, 0.3, 0.3), 20, 50, 1.5, 0.2)
end
```