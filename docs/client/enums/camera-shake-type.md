---
sidebar_position: 80
---

# CameraShakeType

`CameraShakeType` picks how a camera shake moves the camera: by shifting it or by rotating it, and relative to the world or to where the camera looks.

**Available on:** Client

## Values {#values}

### CameraShakeType {#camerashaketype}

Used by [`Camera.SpawnShake(type, position, amplitude, frequency, falloff, time, radialBlur)`](../camera.md) (client). The shake only happens in the local game. What `amplitude` (a `vec3`) means depends on the type, as the table says.

| Name | Value | Meaning |
|---|---|---|
| `CameraShakeType.SpatialTranslation` | 0 | Shakes the camera's position, relative to the camera. `amplitude` is the x, y, z distance to shake. |
| `CameraShakeType.SpatialRotation` | 1 | Shakes the camera's rotation, relative to the camera. `amplitude` is the pitch, yaw, roll to rotate. |
| `CameraShakeType.AbsoluteTranslation` | 2 | Shakes the camera's position, along the world axes. `amplitude` is the x, y, z distance to shake. |
| `CameraShakeType.AbsoluteRotation` | 3 | Shakes the camera's rotation, around the world axes. `amplitude` is the pitch, yaw, roll to rotate. |
| `CameraShakeType.Disabled` | 4 | No shake. |

**Example**

```lua
-- client: shake the camera when an explosion goes off near the local player
Net.AddEvent("bigExplosion", function(position)
	Camera.SpawnShake(CameraShakeType.SpatialRotation, position, vec3(2, 2, 1), 20, 50, 1.5, 0.5)
end)
```