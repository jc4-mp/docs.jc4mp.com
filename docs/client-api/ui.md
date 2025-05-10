# UI

Create and manage user inferface elements, such as buttons, text, images, and menus.

## Global Methods

All UI methods are part of the global `UI` table. For example, to begin a new window, you would call `UI.Begin("My Window")`.

### Mouse Utilities

Functions related to mouse input and cursor.

#### `UI.GetMousePos(): vec2`
Returns the current mouse position in normalized screen coordinates (i.e., `{x,y}` where `x` and `y` are typically between 0.0 and 1.0, relative to the game window).

#### `UI.SetCursorVisible(visible: boolean)`
Shows or hides the operating system's mouse cursor.

### Window Management

Functions for creating and managing UI windows and child regions.

#### `UI.Begin(name: string): boolean`
Starts a new ImGui window. All subsequent UI elements are rendered within this window until `UI.End()` is called.
Returns `false` if the window is collapsed or clipped, `true` otherwise. You should typically only call rendering functions if `Begin` returns `true`.

#### `UI.Begin(name: string, flags: ImGuiWindowFlags): boolean`
Starts a new ImGui window with the specified `flags`.
Returns `false` if the window is collapsed or clipped, `true` otherwise.

#### `UI.End()`
Ends the current ImGui window definition. Must be called after a `UI.Begin()` that returned `true`.

#### `UI.BeginChild(name: string, size: vec2, child_flags: ImGuiChildFlags, window_flags: ImGuiWindowFlags): boolean`
Begins a child window area within the current window. Child windows have their own scrolling and layout.
`name`: A unique identifier for the child window.
`size`: The size of the child window. `{x=0, y=0}` means use available content region.
`child_flags`: Flags for the child region behavior.
`window_flags`: ImGui window flags to apply to the child window.
Returns `true` if the child window is visible and rendering should occur.

#### `UI.EndChild()`
Ends the current child window definition. Must be called after `UI.BeginChild()` returns `true`.

### Text Display

Functions for rendering various styles of text.

#### `UI.Text(text: string)`
Renders simple text.

#### `UI.TextColored(color: vec4, text: string)`
Renders text in the specified `color` (e.g., `{x=1, y=0, z=0, w=1}` for red).

#### `UI.TextDisabled(text: string)`
Renders text with a disabled appearance.

#### `UI.TextWrapped(text: string)`
Renders text, automatically wrapping it within the current window or region width.

#### `UI.LabelText(label: string, text: string)`
Renders a label followed by text on the same line (e.g., "MyLabel: SomeValue").

#### `UI.BulletText(text: string)`
Renders text preceded by a bullet point.

#### `UI.SeparatorText(text: string)`
Renders text embedded within a horizontal separator.

#### `UI.TextUnformatted(text: string)`
Renders text without formatting. Faster than `UI.Text` for long strings where no formatting is needed.

### Buttons

Functions for creating interactive buttons.

#### `UI.Button(label: string): boolean`
Renders a standard button with the given `label`.
Returns `true` if the button was clicked in this frame.

#### `UI.Button(label: string, size: vec2): boolean`
Renders a standard button with the given `label` and `size`.
Returns `true` if the button was clicked in this frame.

#### `UI.Button(label: string, callback: function)`
Renders a button. If clicked, the provided `callback` function is executed.

#### `UI.Button(label: string, callback: function, size: vec2)`
Renders a button with a specific `size`. If clicked, the provided `callback` function is executed.

#### `UI.SmallButton(label: string): boolean`
Renders a smaller version of a standard button.
Returns `true` if the button was clicked.

#### `UI.SmallButton(label: string, callback: function)`
Renders a small button. If clicked, the `callback` function is executed.

#### `UI.InvisibleButton(str_id: string, size: vec2, flags: ImGuiButtonFlags): boolean`
Creates an invisible button covering a rectangular area. Useful for creating custom clickable areas.
Returns `true` if the button was clicked.

#### `UI.ArrowButton(str_id: string, dir: ImGuiDir): boolean`
Renders a button with an arrow pointing in the specified direction (`dir` is an ImGui direction enum, e.g., `ImGuiDir_Left`).
Returns `true` if the button was clicked.

#### `UI.RadioButton(label: string, active: boolean): boolean`
Renders a radio button. `active` indicates if this button is currently selected.
Returns `true` if the button was clicked. The caller is responsible for managing the state of a group of radio buttons.

#### `UI.RadioButton(label: string, value_holder: table, value_for_this_button: number): boolean`
Renders a radio button that is part of a group.
`value_holder`: A table (e.g., `{ selected_id = 1 }`) where the `selected_id` field (or similar) holds the integer value of the currently active button in the group. This field will be updated if this radio button is clicked.
`value_for_this_button`: The integer value this specific radio button represents.
Returns `true` if this radio button was clicked, causing `value_holder`'s field to change.

#### `UI.ProgressBar(fraction: number, size_arg: vec2, overlay: string)`
Renders a progress bar.
`fraction`: The progress, from 0.0 to 1.0.
`size_arg`: The size of the progress bar. A negative value for x or y means auto-sizing on that axis.
`overlay`: Optional text to display on top of the progress bar.

#### `UI.Bullet()`
Renders a single bullet point.

### Input Fields

Functions for creating widgets that accept user input.

#### `UI.InputText(label: string, buffer: userdata, buffer_size: number, flags?: ImGuiInputTextFlags): boolean`
Creates a text input field.
`label`: A descriptive label for the input field.
`buffer`: A userdata object representing a text buffer (e.g., created via a specific API function if available, or a pre-allocated mutable string structure). This buffer is modified in-place by user input.
`buffer_size`: The maximum number of characters the `buffer` can hold.
`flags`: Optional `ImGuiInputTextFlags` to customize behavior (e.g., password input, read-only).
Returns `true` if the content of the `buffer` was changed by the user in this frame.

### Layout & Spacing

Functions to control the positioning and arrangement of UI elements.

#### `UI.SameLine(offset_x?: number, spacing?: number)`
Places the next UI element on the same line as the previous one.
`offset_x`: Optional horizontal offset from the start of the line (default: 0).
`spacing`: Optional horizontal spacing between the previous element and the next one (default: use style default).

#### `UI.NewLine()`
Moves the cursor to the beginning of the next line.

#### `UI.Separator()`
Renders a horizontal separator line.

#### `UI.Spacing()`
Adds a small amount of vertical spacing, based on the current style.

#### `UI.GetContentRegionAvail(): vec2`
Returns the available content region within the current window, as a `vec2` (e.g., `{x, y}`). This is useful for responsive layouts.

#### `UI.GetContentRegionMax(): vec2`
Returns the maximum coordinates of the content region within the current window, as a `vec2`.

### Checkboxes

#### `UI.Checkbox(label: string, is_checked: boolean): boolean`
Renders a checkbox.
`label`: The text label displayed next to the checkbox.
`is_checked`: The current state of the checkbox (true for checked, false for unchecked).
Returns `true` if the checkbox was clicked by the user in this frame. The caller is responsible for updating their `is_checked` state variable based on this return value (e.g., if it returns true, toggle your state: `my_checked_var = not my_checked_var`).

### Selectables

#### `UI.Selectable(label: string, selected: boolean): boolean`
Renders a selectable item. Can be used for list items, menu items, etc.
`label`: The text of the selectable item.
`selected`: Whether the item is currently marked as selected.
Returns `true` if the item was clicked.

### Sliders

Functions for creating draggable sliders to select numerical values.

#### `UI.SliderFloat(label: string, current_value: number, min_value: number, max_value: number): number`
Renders a slider for floating-point values.
`label`: The label for the slider.
`current_value`: The current value of the slider.
`min_value`: The minimum value the slider can represent.
`max_value`: The maximum value the slider can represent.
Returns the new value of the slider if it was changed, otherwise `current_value`.

#### `UI.SliderInt(label: string, current_value: number, min_value: number, max_value: number): boolean, number`
Renders a slider for integer values.
`label`: The label for the slider.
`current_value`: The current integer value of the slider.
`min_value`: The minimum integer value.
`max_value`: The maximum integer value.
Returns two values:
1.  `changed (boolean)`: `true` if the slider's value was modified by the user in this frame.
2.  `new_value (number)`: The (potentially) updated integer value of the slider.

### Tables

Functions for creating and managing data tables.

#### `UI.BeginTable(str_id: string, column_count: number, flags?: ImGuiTableFlags, outer_size?: vec2, inner_width?: number): boolean`
Begins a new table layout.
`str_id`: A unique identifier for the table.
`column_count`: The number of columns in the table.
`flags`: Optional `ImGuiTableFlags` to customize table behavior (e.g., borders, resizable columns).
`outer_size`: Optional external size of the table. `{x=0, y=0}` uses available width/height.
`inner_width`: Optional desired total width of content, used for horizontal scrolling.
Returns `true` if the table is visible and should be rendered. Must be paired with `UI.EndTable()`.

#### `UI.EndTable()`
Ends the current table definition. Call this after `UI.BeginTable()` and rendering table content.

#### `UI.TableNextRow(row_flags?: ImGuiTableRowFlags, min_row_height?: number)`
Submits the current row and starts a new one.
`row_flags`: Optional `ImGuiTableRowFlags` for the new row.
`min_row_height`: Optional minimum height for the row.

#### `UI.TableNextColumn(): boolean`
Moves to the next column in the current row.
Returns `true` if the column is visible. Content for this cell should only be submitted if it returns `true`.

#### `UI.TableSetColumnIndex(column_index: number): boolean`
Moves to a specific column index (0-based) in the current row.
Returns `true` if the target column is visible.

#### `UI.TableSetupColumn(label: string, flags?: ImGuiTableColumnFlags, init_width_or_weight?: number, user_id?: ImGuiID)`
Defines a column's properties. This should be called after `UI.BeginTable()` and before any rows.
`label`: The name of the column, displayed in the header if headers are enabled.
`flags`: Optional `ImGuiTableColumnFlags` for the column.
`init_width_or_weight`: Initial width of the column or its weight for sizing.
`user_id`: Optional user-defined ID for the column.

#### `UI.TableSetupScrollFreeze(leading_cols: number, leading_rows: number)`
Freezes a specified number of leading columns and rows, making them stay visible when scrolling.

#### `UI.TableHeader(label: string)`
Renders a table header cell. Typically used within a `UI.TableHeadersRow()`.

#### `UI.TableHeadersRow()`
Renders a row of table headers, using the labels provided in `UI.TableSetupColumn()`.

#### `UI.TableAngledHeadersRow()`
Renders a row of table headers with angled text. Experimental feature.

#### `UI.TableGetColumnCount(): number`
Returns the number of columns in the current table.

#### `UI.TableGetColumnIndex(): number`
Returns the current column index (0-based).

#### `UI.TableGetRowIndex(): number`
Returns the current row index (0-based).

#### `UI.TableGetColumnName(column_index?: number): string`
Returns the name of the specified column (or current column if `column_index` is omitted).

#### `UI.TableGetColumnFlags(column_index?: number): ImGuiTableColumnFlags`
Returns the flags of the specified column (or current column if `column_index` is omitted).

#### `UI.TableSetColumnEnabled(column_index: number, enabled: boolean)`
Enables or disables a column. Disabled columns are not displayed.

#### `UI.TableSetBgColor(target: ImGuiTableBgTarget, color: ImU32, column_index?: number)`
Sets the background color for a specific table target (e.g., row, cell).
`target`: An `ImGuiTableBgTarget` enum specifying what to color.
`color`: The color value (typically an packed integer, e.g., from `UI.ColorConvertFloat4ToU32` if available).
`column_index`: Target column index, behavior depends on `target`.

### Tab Bars & Tabs

Functions for creating tabbed interfaces.

#### `UI.BeginTabBar(str_id: string, flags?: ImGuiTabBarFlags): boolean`
Begins a tab bar. Must be paired with `UI.EndTabBar()`.
`str_id`: A unique identifier for the tab bar.
`flags`: Optional `ImGuiTabBarFlags` to customize behavior.
Returns `true` if the tab bar is visible.

#### `UI.EndTabBar()`
Ends the current tab bar definition.

#### `UI.BeginTabItem(label: string): boolean`
Begins a new tab item within a tab bar. Must be paired with `UI.EndTabItem()`.
`label`: The text displayed on the tab.
Returns `true` if this tab is selected and its content should be rendered.

#### `UI.EndTabItem()`
Ends the current tab item definition.

#### `UI.TabItemButton(label: string, flags?: ImGuiTabItemFlags): boolean`
Renders a button that looks like a tab item. Useful for special actions within a tab bar.
Returns `true` if the button was clicked.

#### `UI.SetTabItemClosed(tab_label: string)`
Marks a tab (by its `tab_label`) to be closed. The tab bar must have the `ImGuiTabBarFlags_Reorderable` flag for close buttons to appear.

### Window Position/Size Utilities

Functions to programmatically control the position and size of the *next* window to be drawn. These must be called before `UI.Begin()`.

#### `UI.SetNextWindowPos(pos: vec2, cond?: ImGuiCond)`
Sets the position of the next window to be created.
`pos`: The desired `vec2` position on screen.
`cond`: An `ImGuiCond` flag specifying when the position should be applied (e.g., `ImGuiCond_Always`, `ImGuiCond_FirstUseEver`).

#### `UI.SetNextWindowSize(size: vec2, cond?: ImGuiCond)`
Sets the size of the next window to be created.
`size`: The desired `vec2` size.
`cond`: An `ImGuiCond` flag specifying when the size should be applied.

### Window Style

Functions to temporarily modify ImGui styling. These usually work in a stack (Push/Pop).

#### `UI.PushStyleColor(idx: ImGuiCol, col: vec4)`
Pushes a new color onto the style stack for a specific UI element part.
`idx`: An `ImGuiCol` enum value specifying which color to change (e.g., `ImGuiCol_Text`, `ImGuiCol_Button`).
`col`: The `vec4` color to apply.
Must be paired with `UI.PopStyleColor()`.

#### `UI.PopStyleColor(count?: number)`
Pops one or more colors from the style stack, restoring previous values.
`count`: The number of colors to pop (default is 1).

