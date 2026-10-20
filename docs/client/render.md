---
sidebar_position: 65
---

# Render

The `Render` table gives the size of the game's drawing area and draws simple debug shapes into the 3D world. Use `Render.GetSize` to lay out webviews and convert between pixels and screen fractions, and `Render.DrawSphere` to visualize positions, radii and areas while building a script.

**Available on:** Client

## Functions {#functions}

### Render.GetSize() {#rendergetsize}

Returns the size of the game window's drawing area (the client area, without the title bar and borders), in pixels. This is the coordinate space used by [`Camera.WorldToScreen`](./camera.md#cameraworldtoscreenposition) and by webview positions and sizes. The value follows window resizes and resolution changes, so read it again when you need it rather than caching it forever.

**Returns** `vec2`: `x` is the width and `y` the height, in pixels.

**Example**

```lua
-- a webview docked to the right edge of the screen, vertically centered
local size = Render.GetSize()
local WIDTH, HEIGHT = 400, 300

local panel = WebView.Create("my-hud:panel", {
	url = "resource://my-hud/client/panel.html",
	position = vec2(size.x - WIDTH - 20, (size.y - HEIGHT) / 2),
	size = vec2(WIDTH, HEIGHT),
	visible = true,
})
```

### Render.DrawSphere(position, radius, color, wireframe) {#renderdrawsphereposition-radius-color-wireframe}

Draws a filled sphere with the game's debug renderer. The sphere is only drawn for the current frame, so call this every frame (from `OnRender`) for as long as it should stay visible. It is only seen on this client.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | Center of the sphere, in world coordinates. |
| radius | `number` | Radius, in meters. |
| color | `vec4` | Color as `vec4(red, green, blue, alpha)`, each from 0 to 1. Values outside 0..1 are clamped. An alpha below 1 makes the sphere see-through. |
| wireframe | `boolean` | `true` also draws the sphere's wireframe over the fill. |

**Returns** nothing.

**Example**

```lua
-- show a 25 m capture zone around a point, red when the local player is outside, green inside
local ZONE_CENTER, ZONE_RADIUS = vec3(-3800, 120, 2200), 25

Event.Add("OnRender", function()
	local player = World.LocalPlayer()
	if not player then return end

	local inside = (player:GetPosition() - ZONE_CENTER):length() <= ZONE_RADIUS
	local color = inside and vec4(0, 1, 0, 0.25) or vec4(1, 0, 0, 0.25)

	Render.DrawSphere(ZONE_CENTER, ZONE_RADIUS, color, true)
end)
```