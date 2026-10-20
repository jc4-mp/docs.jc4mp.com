---
sidebar_position: 5
---

# Sandbox

This page lists what a script's Lua environment contains on each side: the Lua version, the standard libraries that are available, the changes made to some standard functions, and the limits scripts run under. Client scripts run code the server sent on the players' computers, so they get a restricted environment; server scripts are chosen by the server owner and get more.

**Available on:** Server, Client

## Lua version {#lua-version}

Scripts run on **LuaJIT 2.1**, which implements Lua 5.1 with a few extensions. If you know Lua 5.3 or 5.4, note the differences:

- There is no integer type: every number is a 64-bit float. Integers are exact up to 2^53.
- No `//` integer division (use `math.floor(a / b)`), no `&`, `|`, `~`, `<<`, `>>` operators (use the [`bit` library](#bit) instead), and no `utf8` library.
- `unpack` is a global function (there is no `table.unpack` or `table.pack`), and there is no `math.tointeger`. `table.move` is available.
- `goto` and labels work, as does `load` with a string.
- LuaJIT's `bit` library is loaded on both sides for bitwise operations (see [bit](#bit)).

## Script isolation {#script-isolation}

Every `.lua` file of a resource runs in its own Lua state (see [Resources](./resources.md#scripts)). Globals are not shared between files or resources. Files talk to each other through events and share code through [require](#require).

## Libraries per side {#libraries-per-side}

| Library or global | Server | Client |
|---|---|---|
| base functions (`pairs`, `ipairs`, `type`, `tostring`, `tonumber`, `pcall`, `xpcall`, `error`, `assert`, `select`, `rawget`, `setmetatable`, `getfenv`, `setfenv`, `collectgarbage`...) | yes | yes |
| `coroutine` | yes | yes |
| `string` | yes | yes, without `string.dump` |
| `table` | yes | yes |
| `math` | yes | yes |
| `os` | only `os.time` and `os.date` | only `os.time` and `os.date` |
| `load`, `loadstring` | source text only | source text only |
| `loadfile`, `dofile` | source text only | not available |
| `require` | standard Lua `require` with the resources folder added | a restricted `require` that only loads resource files |
| `package` | yes (including `package.loadlib` and C modules) | not available |
| `jit` | yes | only `jit.on`, `jit.off`, `jit.flush`, `jit.status`, `jit.version`, `jit.version_num`, `jit.os`, `jit.arch` |
| `ffi` | yes | not available |
| `io` | not available | not available |
| `debug` | not available | not available |
| `bit` | yes | yes |

Server scripts can reach native code through `ffi` and `package.loadlib`, so only run server resources you trust, the same as any program on the server machine.

## bit {#bit}

The `bit` library is LuaJIT's bitwise operations library, loaded on both sides. Its functions work on 32-bit integers: the arguments are converted to 32-bit integers and the results are signed 32-bit numbers.

| Function | Result |
|---|---|
| `bit.band(a, b, ...)` | bitwise AND |
| `bit.bor(a, b, ...)` | bitwise OR |
| `bit.bxor(a, b, ...)` | bitwise XOR |
| `bit.bnot(a)` | bitwise NOT |
| `bit.lshift(a, n)` | `a` shifted left by `n` bits |
| `bit.rshift(a, n)` | `a` shifted right by `n` bits, filling with zeros |
| `bit.arshift(a, n)` | `a` shifted right by `n` bits, keeping the sign bit |
| `bit.rol(a, n)`, `bit.ror(a, n)` | `a` rotated left or right by `n` bits |
| `bit.bswap(a)` | `a` with its four bytes in reverse order |
| `bit.tobit(a)` | `a` converted to a signed 32-bit number |
| `bit.tohex(a, n)` | `a` as a hexadecimal string of `n` digits (8 by default, upper case when `n` is negative) |

```lua
local flags = bit.bor(AclLevel.Admin, AclLevel.Moderator)

print(flags)                                  -- 6
print(bit.band(flags, AclLevel.Admin) ~= 0)   -- true
print(bit.lshift(1, 4), bit.tohex(255, 2))    -- 16	ff
```

## Changed functions {#changed-functions}

### print {#print}

`print(...)` writes one line to the console, prefixed with the resource name: `[race] | hello`. On the server it goes to the server console and its log; on a client, to the client's console window (when enabled in the launcher) and its log file. It does not show in the chat or in the script debugger.

The arguments are separated by tabs. Strings, booleans and `nil` are written as usual, and numbers, tables and userdata the way `tostring` writes them: `print(5)` prints `5`, `print(0.1)` prints `0.1` and `print(1e20)` prints `1e+20`. Use `string.format` to control the formatting.

```lua
local laps = 3

print("laps:", laps)                  -- [race] | laps:	3
print("laps: " .. laps)               -- [race] | laps: 3
print(string.format("%.1f s", 12.345)) -- [race] | 12.3 s
print(vec3(1, 2, 3), true, nil)       -- [race] | vec3(1.000000, 2.000000, 3.000000)	true	nil
```

### os.time and os.date {#ostime-and-osdate}

`os.time` is the standard function. `os.date` only accepts the C89 conversion specifiers `%a %A %b %B %c %d %H %I %j %m %M %p %S %U %w %W %x %X %y %Y %Z %%` (plus the `"*t"` and `"!*t"` formats and the `!` UTC prefix). Any other specifier, such as `%e` or `%F`, raises an error.

`os.clock`, `os.getenv`, `os.execute`, `os.remove`, `os.rename`, `os.tmpname` and `os.exit` don't exist. Measure durations with `os.time()`, or on the server with [Server.GetElapsedSeconds](../server/server.md).

```lua
print(os.date("%Y-%m-%d %H:%M:%S"))      -- 2026-10-19 18:04:51
print(os.date("!%H:%M UTC"))             -- 16:04 UTC

local t = os.date("*t")

print(t.year .. "-" .. t.month .. "-" .. t.day)
```

### load, loadstring, loadfile, dofile {#load-loadstring-loadfile-dofile}

These only accept Lua source text. Precompiled bytecode is refused (it would bypass the sandbox). On the client, `loadfile` and `dofile` don't exist at all: the client's scripts can only load the resource files the server sent.

```lua
local fn = load("return 1 + 2")

print(fn()) -- 3

local env = { x = 10 }
local with_env = load("return x * 2", "calc", "t", env)

print(with_env()) -- 20
```

### math.random {#mathrandom}

Each script state is seeded with the current time when it starts, so `math.random` gives a different sequence every run without calling `math.randomseed`.

### require {#require}

`require(name)` looks for `name` (dots replaced by slashes, `.lua` added) first in the `resources` folder and then in the folder of the requiring script. See [Resources](./resources.md#require) for examples.

- **Server**: the standard Lua `require` with those two paths added to `package.path`, so `package.loaded` and `package.path` work as usual. Lua modules must be source text.
- **Client**: a restricted `require` that only searches the downloaded resource files, refuses names containing `..`, `\` or `:` or starting with `/`, and keeps its own cache per script state. A module that returns `nil` is run again by the next `require` of the same name. A missing module raises `require failed: module '<name>' not found`.

## Execution limits {#execution-limits}

- Scripts run on the server's or the game's main thread, between ticks or frames. There is no time limit: a long loop freezes the server (every player lags) or the player's game until it ends. Spread heavy work over several timer runs.
- Events, commands and timers can trigger each other (a handler firing an event, a timer running a command...), but not more than 64 levels deep: past that, the call raises `Dispatches can't nest deeper than 64 levels`. This protects against handlers that trigger themselves forever.
- While an event or command is being dispatched, adding or removing a handler for that same name raises an error. `Timer.Set` inside a timer callback raises an error (see [Timer](./timer.md)).
- Starting, stopping and restarting resources from an event handler, command or timer is deferred to the next update (see [Resources.Start](../server/resources.md#resourcesstartname)).

## Errors {#errors}

An error raised by a script (at its top level, in an event handler, a command or a timer) is caught and reported:

- **Server errors** are written to the server console and sent to the in-game script debugger of every joined player.
- **Client errors** are shown in that player's script debugger.

The script debugger is toggled with the `dbg` command (`/dbg` in the bundled chats, see [Commands](../client/commands.md)). An error in a handler doesn't stop the resource: the next event or timer runs normally. An error at the top level of a file while the resource is starting cancels the whole start.

Use `pcall` around code that may fail on bad input:

```lua
local ok, result = pcall(JSON.Parse, untrusted_text)

if not ok then
	print("bad data: " .. tostring(result))
end
```

## Global API tables {#global-api-tables}

Besides the standard libraries, scripts get the JC4MP API as global tables:

| Side | Tables |
|---|---|
| Both | `Event` ([Events](./events.md)), `Net` ([Net](./net.md)), `Timer` ([Timer](./timer.md)), `JSON` ([JSON](./json.md)), the `Hash` function ([Hash](./hash.md)), `Resources`, `Resource` ([Resources](./resources.md)), `World` ([World](./world.md)), `Weather` ([Weather](./weather.md)), the math types `vec2`, `vec3`, `vec4`, `quat`, `mat4`, `AABB` ([Math](./math.md)), and the enum tables ([Enums](./enums/README.md)) |
| Server | `SQL` ([SQL](../server/sql.md)), `Server` ([Server](../server/server.md)), `Chat` ([Chat](../server/chat.md)), `Net.Fetch` ([HTTP](../server/http.md)) |
| Client | `Cmd` ([Commands](../client/commands.md)), `Local`, `Players`, `Client`, `Game`, `GameUI`, `UI`, `WebView`, `Input`, `Camera`, `Render`, `FX`, `Sound`, `Physics`, `Terrain`, `Asset`, `NavMesh`, `RoadGraph` (see the client pages) |