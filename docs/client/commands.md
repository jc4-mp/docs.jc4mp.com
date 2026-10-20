---
sidebar_position: 50
---

# Commands

Client scripts can register named commands with the `Cmd` table, and run them by name with `Cmd.Execute`. Chat resources use this for "slash commands": when a player types `/name arg1 arg2`, the chat script calls `Cmd.Execute("name", { "arg1", "arg2" })`, and every handler registered for `name` runs. Commands are not tied to the chat, though: any client script can execute them, for example from a key binding or a menu button. The server has no `Cmd` table: server console commands are built in and can't be extended by scripts, see [Server console](../server/console.md).

**Available on:** Client

See also: [Server console](../server/console.md)

## Functions {#functions}

### Cmd.Add(name, handler) {#cmdaddname-handler}

Registers `handler` for the command `name`. When the command is executed, the handler is called with each argument as a separate string parameter: `Cmd.Execute("give", { "smg", "200" })` calls `handler("smg", "200")`. Its return value is ignored.

Each script file can register one handler per command name. Several files or resources can register the same name, and all of their handlers run when it is executed. Handlers are removed when their resource stops.

Adding or removing a handler for a command while that same command is running (from inside one of its handlers) raises a Lua error.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | string | the command name without any `/`, case-sensitive |
| handler | function | called with the command's arguments as strings |

**Returns**

| Type | Description |
|---|---|
| boolean | `true` when the handler was added |
| string or nil | the reason when it wasn't (`"Command already registered in this script"`, `"Invalid function"`) |

**Example**

```lua
-- client: /tp x y z
Cmd.Add("tp", function(x, y, z)
	x, y, z = tonumber(x), tonumber(y), tonumber(z)

	if not (x and y and z) then
		error("usage: /tp <x> <y> <z>")
	end

	Net.Send("admin:teleport", vec3(x, y, z))
end)
```

### Cmd.Remove(name) {#cmdremovename}

Removes this script file's handler for the command `name`. Handlers registered by other files keep working.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | string | the command name |

**Returns**

| Type | Description |
|---|---|
| boolean | `true` when the handler was removed |
| string or nil | the reason when nothing was removed (`"Command '<name>' does not exist anywhere"`) |

**Example**

```lua
-- client: a command that is only available during the tutorial
Cmd.Add("skip", function()
	Net.Send("tutorial:skip")
end)

Net.AddEvent("tutorial:finished", function()
	Cmd.Remove("skip")
end)
```

### Cmd.Execute(name, args?) {#cmdexecutename-args}

Runs the command `name`: every handler registered for it, in every resource, is called with the arguments.

If a handler raises an error, `Cmd.Execute` stops there (the remaining handlers don't run) and returns `false` with the error message, so a handler can report bad usage with `error("usage: ...")`.

Two names are built in and always available:

| Command | What it does |
|---|---|
| `dbg` | shows or hides the in-game script debugger (the list of script errors and messages) |
| `cldbg` | clears the script debugger |

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | string | the command name |
| args | table | optional, an array of the arguments: strings, or numbers (passed to the handlers as strings). Any other value raises a Lua error. Default: no arguments |

**Returns**

| Type | Description |
|---|---|
| boolean | `true` when the command ran without errors |
| string | `""` on success, otherwise the error: `"Command '<name>' does not exist"` or the message a handler raised |

**Example**

```lua
-- client: turn "/name a b c" chat text into a command
local function run_chat_command(text)
	local name, rest = text:match("^/(%S+)%s*(.*)")

	if not name then
		return false
	end

	local args = {}

	for arg in rest:gmatch("%S+") do
		args[#args + 1] = arg
	end

	local ok, err = Cmd.Execute(name, args)

	if not ok then
		print(err)
	end

	return true
end

run_chat_command("/tp 100 300 -200")
run_chat_command("/dbg")
```