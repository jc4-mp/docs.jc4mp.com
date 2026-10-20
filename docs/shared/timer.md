---
sidebar_position: 7
---

# Timer

The `Timer` table runs a function later, once or repeatedly: delays, countdowns, periodic saves, cooldowns. Timers belong to the resource that created them and are removed when it stops.

**Available on:** Server, Client

## How timers run {#how-timers-run}

- Timers are checked once per update: every server tick (a few milliseconds) on the server, every game frame on the client. A timer runs at the first update after its interval has passed, so the real delay is the interval rounded up to the next update, and on the client it depends on the frame rate.
- After each run the next interval starts from that moment, so a repeating timer slowly drifts. For accurate clocks, compare against `os.time()` or [Server.GetElapsedSeconds](../server/server.md) instead of counting runs.
- An error inside a timer function is reported (console and script debugger) and the timer keeps running.
- **A timer function can't create timers.** Calling `Timer.Set` from inside a timer function, or from anything a timer function triggers (for example an event handler run by `Event.Fire` inside it), raises the error `Timers cannot be created from inside a timer callback`. Use one repeating timer with a state variable instead, or create the timers from an event handler.
- `Timer.Kill` is safe anywhere, including inside the timer's own function.

## Functions {#functions}

### Timer.Set(fn, interval, times, ...) {#timersetfn-interval-times-}

Creates a timer that calls `fn` after `interval` milliseconds, `times` times. Any extra arguments are passed to `fn` on every call (the same values each time: a table argument is the same table, not a copy).

The first call happens one interval after `Timer.Set`, never immediately.

**Parameters**

| Name | Type | Description |
|---|---|---|
| fn | function | the function to call |
| interval | integer | the delay between calls, in milliseconds. `0` runs it on every update |
| times | integer | how many times to call it. `0` or a negative number repeats it until it is killed or the resource stops |
| ... | any | optional, arguments passed to `fn` |

**Returns** a timer value to pass to [Timer.Kill](#timerkilltimer). It has no fields or methods of its own.

**Example**

```lua
-- server: respawn a killed player after 5 seconds
Event.Add("OnPlayerKilled", function(player, damager, loss, weapon, position)
	Timer.Set(function(p, where)
		p:Respawn(where)
	end, 5000, 1, player, position)
end)
```

```lua
-- server: save every player's position every minute, forever
Timer.Set(function()
	for _, client in ipairs(World.GetPlayers()) do
		local player = client:GetPlayer()

		if player then
			local p = player:GetPosition()

			SQL.Execute("INSERT OR REPLACE INTO last_position (steam_id, x, y, z) VALUES (?, ?, ?, ?)", client:GetUserId(), p.x, p.y, p.z)
		end
	end
end, 60000, 0)
```

```lua
-- client: a 3, 2, 1 countdown
local count = 3

Timer.Set(function()
	print(count > 0 and count or "GO!")

	count = count - 1
end, 1000, 4)
```

### Timer.Kill(timer) {#timerkilltimer}

Stops a timer. It never runs again, even if it was due in the same update.

A resource can only kill its own timers. Killing a timer that already finished (a one-shot timer that ran, or a timer that ran all its `times`) or that was already killed returns `false` and does nothing, so it is safe to call on a timer you aren't sure about.

**Parameters**

| Name | Type | Description |
|---|---|---|
| timer | timer | the value returned by `Timer.Set` |

**Returns** `boolean`: `true` when the timer was running and is now stopped.

**Example**

```lua
-- server: a round that ends after 5 minutes, or earlier when someone wins
local round_timer

local function end_round(winner)
	if round_timer then
		Timer.Kill(round_timer)

		round_timer = nil
	end

	Chat.Broadcast(winner and (winner:GetName() .. " won the round") or "Time is up")
end

Event.Add("OnResourceStart", function(name)
	if name == Resource.Name then
		round_timer = Timer.Set(function()
			round_timer = nil

			end_round()
		end, 5 * 60 * 1000, 1)
	end
end)
```

```lua
-- a timer that stops itself after a condition is met
local tries = 0
local poll

poll = Timer.Set(function()
	tries = tries + 1

	if tries >= 10 then
		Timer.Kill(poll)
	end
end, 500, 0)
```