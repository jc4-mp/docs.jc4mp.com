# Render

You can use `Render` methods to draw primitives to the screen, such as lines, shapes, and text. Render methods must be called inside the `Render` or `PostRender` event.

## Events

### `Render` Event

This event is called every frame. Use the `Render` event to draw elements to the screen underneath the JC4MP UI, such as the chat window.

### `PostRender` Event

This event is called every frame. Use the `PostRender` event to draw elements to the screen on top of the JC4MP UI, such as the chat window. This is good for full-screen overlays, such as fading to black for transitions.

## Methods

#### `Render.DrawLine(start: vec2, end: vec2, thickness: number, color: vec4)`

Draws a line between `start` and `end` positions on the screen. Thickness should be greater than 0. Values for `color` range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a red diagonal line:

```lua
Event.Add("Render", function()
    Render.DrawLine(vec2(100, 100), vec2(200, 200), 5, vec4(1, 0, 0, 1))
end)
```

#### `Render.DrawTriangle(p0: vec2, p1: vec2, p2: vec2, color: vec4)`

Draws a triangle defined by three points on the screen. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a green triangle:

```lua
Event.Add("Render", function()
    Render.DrawTriangle(vec2(100, 100), vec2(200, 100), vec2(150, 150), vec4(0, 1, 0, 1))
end)
```

#### `Render.FillTriangle(p0: vec2, p1: vec2, p2: vec2, color: vec4)`

Draws a filled triangle defined by three points on the screen. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a filled blue triangle:

```lua
Event.Add("Render", function()
    Render.FillTriangle(vec2(300, 100), vec2(400, 100), vec2(350, 150), vec4(0, 0, 1, 1))
end)
```

#### `Render.DrawRect(pos: vec2, size: vec2, color: vec4)`

Draws a rectangle on the screen. `pos` is the top-left corner position, and `size` defines the width and height of the rectangle. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a yellow rectangle:

```lua
Event.Add("Render", function()
    Render.DrawRect(vec2(100, 200), vec2(50, 30), vec4(1, 1, 0, 1))
end)
```

#### `Render.FillRect(pos: vec2, size: vec2, color: vec4)`

Draws a filled rectangle on the screen. `pos` is the top-left corner position, and `size` defines the width and height of the rectangle. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a filled magenta rectangle:

```lua
Event.Add("Render", function()
    Render.FillRect(vec2(200, 200), vec2(50, 30), vec4(1, 0, 1, 1))
end)
```


#### `Render.FillRectMultiColor(pps: vec2, size: vec2, c1: vec4, c2: vec4, c3: vec4, c4: vec4)`

Draws a filled rectangle on the screen with a different color at each corner. `pos` is the top-left corner position, and `size` defines the width and height of the rectangle. `c1`, `c2`, `c3`, and `c4` are the colors for the top-left, top-right, bottom-right, and bottom-left corners, respectively. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a filled rectangle with different colors at each corner:

```lua
Event.Add("Render", function()
    Render.FillRectMultiColor(vec2(200, 400), vec2(50, 30), vec4(1, 0, 0, 1), vec4(0, 1, 0, 1), vec4(0, 0, 1, 1), vec4(1, 1, 0, 1))
end)
```

#### `Render.DrawCircle(center: vec2, radius: number, thickness: number, segs: number, color: vec4)`

Draws a circle on the screen. `center` is the center position, `radius` is the radius of the circle, `thickness` is the thickness of the circle's line, `segs` is the number of segments used to draw the circle (higher values result in a smoother circle). Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a cyan circle:

```lua
Event.Add("Render", function()
    Render.DrawCircle(vec2(300, 300), 25, 3, 24, vec4(0, 1, 1, 1))
end)
```

#### `Render.FillCircle(center: vec2, radius: number, segs: number, color: vec4)`

Draws a filled circle on the screen. `center` is the center position, `radius` is the radius of the circle, `segs` is the number of segments used to draw the circle (higher values result in a smoother circle). Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a filled orange circle:

```lua
Event.Add("Render", function()
    Render.FillCircle(vec2(400, 300), 25, 24, vec4(1, 0.5, 0, 1))
end)
```


#### `Render.DrawEllipse(center: vec2, radius_x: number, radius_y: number, segs: number, thickness: number, color: vec4, rot: number)`

Draws an ellipse on the screen. `center` is the center position, `radius_x` and `radius_y` are the radii of the ellipse along the x and y axes, `segs` is the number of segments used to draw the ellipse (higher values result in a smoother ellipse), `thickness` is the thickness of the ellipse's line, `color` is the color of the ellipse, and `rot` is the rotation of the ellipse in radians. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a rotated white ellipse every frame:

```lua
Event.Add("Render", function()
    Render.DrawEllipse(vec2(300, 400), 30, 20, 24, 2, vec4(1, 1, 1, 1), 0.5)
end)
```

#### `Render.FillEllipse(center: vec2, radius_x: number, radius_y: number, segs: number, color: vec4, rot: number)`

Draws a filled ellipse on the screen. `center` is the center position, `radius_x` and `radius_y` are the radii of the ellipse along the x and y axes, `segs` is the number of segments used to draw the ellipse (higher values result in a smoother ellipse), `color` is the color of the ellipse, and `rot` is the rotation of the ellipse in radians. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a filled, rotated gray ellipse:

```lua
Event.Add("Render", function()
    Render.FillEllipse(vec2(400, 400), 30, 20, 24, vec4(0.5, 0.5, 0.5, 1), -0.5)
end)
```

#### `Render.DrawPolygon(points: table, thickness: number, color: vec4)`

Draws a polygon on the screen. `points` is a table containing the points that define the polygon. Each entry in the table should be a `vec2` representing a point. `thickness` is the thickness of the polygon's line, and `color` is the color of the polygon. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a white polygon:

```lua
local points = {
    vec2(100, 100),
    vec2(200, 100),
    vec2(250, 150),
    vec2(200, 200),
    vec2(100, 200)
}
Event.Add("Render", function()
    Render.DrawPolygon(points, 2, vec4(1, 1, 1, 1))
end)
```

#### `Render.FillPolygon(points: table, color: vec4)`

Draws a filled polygon on the screen. `points` is a table containing the points that define the polygon. Each entry in the table should be a `vec2` representing a point. `color` is the color of the polygon. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a filled gray polygon:

```lua
local points = {
    vec2(300, 100),
    vec2(400, 100),
    vec2(450, 150),
    vec2(400, 200),
    vec2(300, 200)
}
Event.Add("Render", function()
    Render.FillPolygon(points, vec4(0.5, 0.5, 0.5, 1))
end)
```

#### `Render.DrawText(text: string, pos: vec2, scale: number, color: vec4, center: boolean, shadow: number, wrap: number)`

Draws text on the screen. `text` is the string to draw, `pos` is the position of the text, `scale` is the scale of the text, `color` is the color of the text. If `center` is true, the text will be centered on the `pos` position. `shadow` is the size of the shadow behind the text. `wrap` is the width at which the text will wrap to the next line. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws centered white text with a shadow:

```lua
Event.Add("Render", function()
    Render.DrawText("Hello, World!", vec2(100, 400), 1, vec4(1, 1, 1, 1), true, 1)
end)
```

#### `Render.SetClip(enabled: boolean, start: vec2, end: vec2)`

Sets the clipping area for the current rendering call to be between `start` and `end` positions on the screen - anything outside of that clipping area will not be drawn. Set enabled to `true` to enable it, and `false` to disable it.

Example usage that draws a small transparent red square:

```lua
Event.Add("Render", function()
    Render.SetClip(true, vec2(0, 0), vec2(100, 100))
	Render.FillRect(vec2(0, 0), Render.GetSize(), vec4(1, 0, 0, 0.5))
    Render.SetClip(false, vec2(0, 0), vec2(100, 100))
end)
```


#### `Render.GetSize(): vec2`

Returns the size of the screen in pixels in the form of a `vec2`.

Example usage that gets the screen size:

```lua
local size = Render.GetSize() -- If playing on a 1920x1080 display, it will return vec2(1920, 1080)
```



#### `Render.WorldToScreen(pos: vec3): vec2`

Converts world coordinates to screen coordinates. If the world position provided is on the screen, it will return a `vec2` with the screen coordinates of that world position. If the world position is off-screen, it will return nil.

Example usage that draws a circle at a specified position:

```lua
Event.Add("Render", function()
    local pos = vec3(1000, 1000, 1000)
    local screen_pos = Render.WorldToScreen(pos)
    if screen_pos then
        -- Draw a circle on the position if it is on the screen
        Render.FillCircle(pos, 20, 24, vec4(1.0, 1.0, 1.0, 1.0))
    end
end)
```


#### `Render.DrawSphere(pos: vec3, radius: number, color: vec4, wireframe: boolean)`

Draws a 3D depth-tested sphere in the game world at `pos` position with specific radius and color. Set wireframe to true to draw the sphere as a wireframe, or false for a fully filled sphere.

Example usage that draws a semi-transparent blue sphere on the local player's head:

```lua
Event.Add("Render", function()
    local localPlayer = Players.Local():GetGamePlayer()
    local char = localPlayer:GetCharacter()
    local head_pos = char:GetBonePosition(Bone.Head)
    Render.DrawSphere(head_pos, 0.5, vec4(0, 1, 0, 0.5), false)
end)
```

