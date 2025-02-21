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
-- resources/test/client/main.lua

Event.Add("Render", function()
    Render.DrawLine(vec2(100, 100), vec2(200, 200), 5, vec4(1, 0, 0, 1))
end)
```

#### `Render.DrawTriangle(p0: vec2, p1: vec2, p2: vec2, color: vec4)`

Draws a triangle defined by three points on the screen. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a green triangle:

```lua
-- resources/test/client/main.lua

Event.Add("Render", function()
    Render.DrawTriangle(vec2(100, 100), vec2(200, 100), vec2(150, 150), vec4(0, 1, 0, 1))
end)
```

#### `Render.FillTriangle(p0: vec2, p1: vec2, p2: vec2, color: vec4)`

Draws a filled triangle defined by three points on the screen. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a filled blue triangle:

```lua
-- resources/test/client/main.lua

Event.Add("Render", function()
    Render.FillTriangle(vec2(300, 100), vec2(400, 100), vec2(350, 150), vec4(0, 0, 1, 1))
end)
```

#### `Render.DrawRect(pos: vec2, size: vec2, color: vec4)`

Draws a rectangle on the screen. `pos` is the top-left corner position, and `size` defines the width and height of the rectangle. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a yellow rectangle:

```lua
-- resources/test/client/main.lua

Event.Add("Render", function()
    Render.DrawRect(vec2(100, 200), vec2(50, 30), vec4(1, 1, 0, 1))
end)
```

#### `Render.FillRect(pos: vec2, size: vec2, color: vec4)`

Draws a filled rectangle on the screen. `pos` is the top-left corner position, and `size` defines the width and height of the rectangle. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a filled magenta rectangle:

```lua
-- resources/test/client/main.lua

Event.Add("Render", function()
    Render.FillRect(vec2(200, 200), vec2(50, 30), vec4(1, 0, 1, 1))
end)
```

#### `Render.DrawCircle(center: vec2, radius: number, thickness: number, segs: number, color: vec4)`

Draws a circle on the screen. `center` is the center position, `radius` is the radius of the circle, `thickness` is the thickness of the circle's line, `segs` is the number of segments used to draw the circle (higher values result in a smoother circle). Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a cyan circle:

```lua
-- resources/test/client/main.lua

Event.Add("Render", function()
    Render.DrawCircle(vec2(300, 300), 25, 3, 24, vec4(0, 1, 1, 1))
end)
```

#### `Render.FillCircle(center: vec2, radius: number, segs: number, color: vec4)`

Draws a filled circle on the screen. `center` is the center position, `radius` is the radius of the circle, `segs` is the number of segments used to draw the circle (higher values result in a smoother circle). Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws a filled orange circle:

```lua
-- resources/test/client/main.lua

Event.Add("Render", function()
    Render.FillCircle(vec2(400, 300), 25, 24, vec4(1, 0.5, 0, 1))
end)
```

#### `Render.DrawText(text: string, pos: vec2, scale: number, color: vec4, center: boolean, shadow: number, wrap: number)`

Draws text on the screen. `text` is the string to draw, `pos` is the position of the text, `scale` is the scale of the text, `color` is the color of the text. If `center` is true, the text will be centered on the `pos` position. `shadow` is the size of the shadow behind the text. `wrap` is the width at which the text will wrap to the next line. Values for color range between 0 and 1, with the last value being the alpha (transparency) value.

Example usage that draws centered white text with a shadow:

```lua
-- resources/test/client/main.lua

Event.Add("Render", function()
    Render.DrawText("Hello, World!", vec2(100, 400), 1, vec4(1, 1, 1, 1), true, 1)
end)
```
