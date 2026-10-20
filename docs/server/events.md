---
sidebar_position: 33
---

# Server events

Every built-in event the server fires to its scripts. Register a handler with [`Event.Add`](../shared/events.md#eventaddname-handler) in any server or shared script; see [Events](../shared/events.md) for how handlers, cancelling and custom events work. Messages sent by clients with `Net.Send` are not events of this list, see [Net](../shared/net.md).

**Available on:** Server

Shared scripts also run on the client, where a different set of events fires: see [Client events](../client/events.md). `OnResourceStart`, `OnResourceStop`, `OnPlayerJoin`, `OnPlayerQuit`, `OnChat`, `OnPlayerTeleport`, `OnPlayerDamage`, `OnPlayerKilled`, `OnVehicleDamage` and `OnVehicleDestroy` exist on both sides, with differences described on each page.

Unless an event says otherwise:

- it can't be cancelled (`Event.Cancel()` has no effect),
- what the handler returns is ignored,
- it runs on the server's main loop, so a slow handler delays the whole server tick.

| Event | When |
|---|---|
| [OnResourceStart](#onresourcestartname) | a resource started on the server |
| [OnResourceStop](#onresourcestopname) | a resource is stopping on the server |
| [OnPreTick](#onpretick) | start of every server tick |
| [OnPostTick](#onposttick) | end of every server tick |
| [OnPlayerJoin](#onplayerjoinclient) | a player finished joining |
| [OnPlayerQuit](#onplayerquitclient) | a joined player left |
| [OnPlayerResourceAction](#onplayerresourceactionclient-name-action) | a player's client started or stopped a resource |
| [OnChat](#onchatclient-text) | a player sent a chat message (cancellable) |
| [OnPlayerTeleport](#onplayerteleportplayer) | a player finished a teleport or respawn |
| [OnPlayerVehicleEnter](#onplayervehicleenterplayer-vehicle-seat-previous) | a player entered a vehicle seat |
| [OnPlayerVehicleExit](#onplayervehicleexitplayer-vehicle-seat) | a player left a vehicle seat |
| [OnPlayerDamage](#onplayerdamageplayer-damager-damage-weapon-position) | a player was damaged (cancellable) |
| [OnPlayerKilled](#onplayerkilledplayer-damager-damage-weapon-position) | a player's health reached 0 |
| [OnVehicleDamage](#onvehicledamagevehicle-damager-damage-weapon-position) | a vehicle was damaged (cancellable) |
| [OnVehicleDestroy](#onvehicledestroyvehicle-damager-damage-weapon-position) | a vehicle's health reached 0 |

## Resources {#resources}

### OnResourceStart(name) {#onresourcestartname}

Fires when a resource has started on the server: all its server and shared scripts have run their top level without errors. It fires in every running resource, including the one that just started (its scripts already ran, so their handlers are registered), so compare `name` with `Resource.Name` to react only to your own start. It doesn't fire for resources that were already running when your resource started.

A resource starts when the server boots, from the server console (`start`, `reload`) or from a script (see [Resources](../shared/resources.md)). A start asked for from inside an event handler happens at the next resource update. A restart fires `OnResourceStop` and then `OnResourceStart`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | The name of the resource that started (its folder name). |

**Frequency:** once per resource start.

**Example**

```lua
Event.Add("OnResourceStart", function(name)
	if name == Resource.Name then
		print("my resource is up")
	else
		print("resource " .. name .. " started")
	end
end)
```

### OnResourceStop(name) {#onresourcestopname}

Fires when a resource is about to stop, before its scripts are shut down: its own handlers still run, and the objects it spawned still exist (they are destroyed right after). It fires in every running resource, including the one that is stopping. Use it to save state or tell clients that something is going away.

A resource stops from the server console (`stop`, `reload`), from a script, or for every running resource when the server shuts down.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | The name of the resource that is stopping. |

**Frequency:** once per resource stop.

**Example**

```lua
local kills = {}

Event.Add("OnResourceStop", function(name)
	if name == Resource.Name then
		-- persist the session's kills before the Lua state is closed
		for user_id, count in pairs(kills) do
			print(user_id .. " got " .. count .. " kills")
		end
	end
end)
```

## Server loop {#server-loop}

### OnPreTick() {#onpretick}

Fires at the very start of every server tick, before the server reads the network packets received since the last tick, updates the world (streaming, ownership) and runs the resource update (timers, queued resource actions).

The server loop runs a tick and then sleeps about 4 ms, so this fires a few hundred times per second at most. The real rate depends on the machine and on how long each tick takes: don't count ticks to measure time, use [Timer](../shared/timer.md) or compare times.

**Parameters** none.

**Frequency:** every server tick.

**Example**

```lua
local last = os.clock()

Event.Add("OnPreTick", function()
	local now = os.clock()

	if now - last >= 1 then
		last = now
		-- once per second of server CPU time
	end
end)
```

### OnPostTick() {#onposttick}

Fires at the very end of every server tick, after the packets of the tick have been handled (so after the `Net` handlers and the player events they caused), the world has been updated and timers have run. Changes you make here are sent with the next updates.

**Parameters** none.

**Frequency:** every server tick, right after the work of [OnPreTick](#onpretick)'s tick.

**Example**

```lua
local pending = {}

-- other handlers queue work during the tick...
Event.Add("ScoreChanged", function(name) pending[name] = true end)

-- ...and it is flushed once at the end of the tick
Event.Add("OnPostTick", function()
	for name in pairs(pending) do
		Net.Broadcast("score_dirty", name)
	end

	pending = {}
end)
```

## Players {#players}

### OnPlayerJoin(client) {#onplayerjoinclient}

Fires when a player has finished joining: it passed authentication, its client downloaded and started the server's resources, and it is now part of the world. The player's character object already exists, so `client:GetPlayer()` returns it. The server's own join work (sending the current weather...) is done before scripts get the event.

The resources a client starts while joining fire [OnPlayerResourceAction](#onplayerresourceactionclient-name-action) before this event.

**Parameters**

| Name | Type | Description |
|---|---|---|
| client | `PlayerHandle` | The player that joined (the connection: name, Steam ID, ACL...). See [Player](../shared/objects/player.md). |

**Frequency:** once per player connection.

**Example**

```lua
Event.Add("OnPlayerJoin", function(client)
	Chat.Broadcast(client:GetName() .. " joined the server")

	local player = client:GetPlayer()

	if player then
		player:AsPlayer():Respawn(vec3(2370, 300, 1210))
	end
end)
```

### OnPlayerQuit(client) {#onplayerquitclient}

Fires when a player that had joined leaves the server, by disconnecting, timing out or being kicked or banned. The player and its character object still exist while the handlers run, so you can still read its name, data and position. Before the event, the server already took the player out of the vehicle it was driving and the mounted gun it was using (no [OnPlayerVehicleExit](#onplayervehicleexitplayer-vehicle-seat) fires for that).

Players that disconnect before finishing the join never fire it (and never fired [OnPlayerJoin](#onplayerjoinclient)).

**Parameters**

| Name | Type | Description |
|---|---|---|
| client | `PlayerHandle` | The player that is leaving. |

**Frequency:** once per joined player that leaves.

**Example**

```lua
Event.Add("OnPlayerQuit", function(client)
	Chat.Broadcast(client:GetName() .. " left the server")
end)
```

### OnPlayerResourceAction(client, name, action) {#onplayerresourceactionclient-name-action}

Fires when a player's client tells the server it started or stopped one of its resources. Clients start the resources the server is running when they join and every time the server starts, restarts or updates one, and they stop them when the server stops them. It starts arriving as soon as the player is authenticated, so the resources a joining client starts come before [OnPlayerJoin](#onplayerjoinclient), while the player has no character yet (`client:GetPlayer()` returns `nil`).

Use it to know when a client-side part of your resource is ready to receive `Net` messages, for example to send it its initial state.

The resource name is whatever the client sent: treat it as untrusted input.

**Parameters**

| Name | Type | Description |
|---|---|---|
| client | `PlayerHandle` | The player whose client acted. |
| name | `string` | The resource's name. |
| action | `ResourceAction` | `ResourceAction.Start` or `ResourceAction.Stop`. A restart on the client arrives as a `Stop` followed by a `Start`. See [Resources](../shared/resources.md). |

**Frequency:** once per resource start or stop on each client.

**Example**

```lua
Event.Add("OnPlayerResourceAction", function(client, name, action)
	-- our client script is running on this player's game: send it the current round
	if name == Resource.Name and action == ResourceAction.Start then
		Net.SendToPlayer(client, "round_state", currentRound)
	end
end)
```

## Chat {#chat}

### OnChat(client, text) {#onchatclient-text}

Fires when a player sends a chat message to the server, before it is relayed. If no handler cancels it, the server broadcasts it to every joined player as `"<name>: <text>"` (which fires `OnChat` on their clients, see [Client events](../client/events.md#onchatsender-text)) and logs it in the server console. Messages broadcast by scripts with `Chat.Broadcast` don't fire this event.

**Parameters**

| Name | Type | Description |
|---|---|---|
| client | `PlayerHandle` | The player that sent the message. |
| text | `string` | The message as the player typed it, without the name prefix (at most 1023 bytes). |

**Cancellable:** yes. Cancelling it drops the message: it is not broadcast to anyone and not logged.

**Frequency:** once per message.

**Example**

```lua
-- simple commands typed in the chat
Event.Add("OnChat", function(client, text)
	if text == "/kill" then
		Event.Cancel()

		local player = client:GetPlayer()

		if player then
			player:SetHealth(0)
		end
	end
end)
```

## Player character {#player-character}

### OnPlayerTeleport(player) {#onplayerteleportplayer}

Fires when a player's game has finished moving its character after a script called `player:Teleport(...)` or `player:Respawn(...)` (see [Player](../shared/objects/player.md)). The server then tells that player and the players near it that the teleport is complete, which fires `OnPlayerTeleport` on their clients too. Moves the server makes for other reasons don't fire it.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The player's character. |

**Frequency:** once per scripted teleport or respawn.

**Example**

```lua
Event.Add("OnPlayerTeleport", function(player)
	local client = player:GetClient()

	if client then
		print(client:GetName() .. " arrived at " .. tostring(player:GetPosition()))
	end
end)
```

### OnPlayerVehicleEnter(player, vehicle, seat, previous) {#onplayervehicleenterplayer-vehicle-seat-previous}

Fires when a player gets into a seat of a vehicle, as reported by the player's game. It doesn't fire when the vehicle is already destroyed or when the player is already in that seat. When it fires, the server hasn't updated the vehicle's occupants yet, so the vehicle still shows the previous occupant of that seat; right after the handlers, the player becomes the occupant and, in the driver seat, takes over the vehicle's synchronization.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The player's character. |
| vehicle | `VehicleHandle` | The vehicle. See [Vehicle](./objects/vehicle.md). |
| seat | `integer` | The seat, a `VehicleSeat` value (e.g. `VehicleSeat.DriverSeat`). See [Enums](../shared/enums/README.md). |
| previous | `PlayerObjectHandle` or `nil` | The player the server had in that seat before (for example the driver being hijacked), `nil` if it was empty. |

**Frequency:** once per vehicle entry.

**Example**

```lua
Event.Add("OnPlayerVehicleEnter", function(player, vehicle, seat, previous)
	if seat == VehicleSeat.DriverSeat and previous then
		local thief = player:GetClient()
		local victim = previous:GetClient()

		if thief and victim then
			Chat.Broadcast(thief:GetName() .. " hijacked " .. victim:GetName())
		end
	end
end)
```

### OnPlayerVehicleExit(player, vehicle, seat) {#onplayervehicleexitplayer-vehicle-seat}

Fires when a player leaves a vehicle seat, as reported by the player's game (any exit: normal, stunt, parachute...). When it fires, the server still has the player in the vehicle; right after, the player is removed from the seat and, in the driver seat, the vehicle's synchronization is released. It doesn't fire for the seat a player had when it quits the server.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The player's character. |
| vehicle | `VehicleHandle` | The vehicle. |
| seat | `integer` | The seat the player left, a `VehicleSeat` value. |

**Frequency:** once per vehicle exit.

**Example**

```lua
Event.Add("OnPlayerVehicleExit", function(player, vehicle, seat)
	if seat == VehicleSeat.DriverSeat then
		vehicle:SetData("last_driver", player:GetNetId())
	end
end)
```

## Damage {#damage}

The four damage events share the same arguments. A damage event fires in two situations:

- **A hit was reported.** Damage between players and vehicles is detected by the game of the player who caused it and reported to the server. The server fires the damage event (`OnPlayerDamage` or `OnVehicleDamage`) before applying it. If no handler cancels it, the server lowers the health, relays the hit to the players that see the victim (which fires the same events on their clients) and, if the hit took the health from above 0 to 0, fires the death event (`OnPlayerKilled` or `OnVehicleDestroy`). Hits on a player that is already dead are ignored.
- **The health dropped without a hit**, for example because a script lowered it with `SetHealth` or the object's owner reported a lower health. The damage event fires after the health changed, with no damager and weapon `0`, and cancelling it has no effect. The death event fires if the health went from above 0 to 0.

The death event fires once per death or destruction: later hits on an object that is already dead or destroyed don't fire it again, while the damage events still fire for every hit. A player that respawns can be killed again, which fires `OnPlayerKilled` again.

### OnPlayerDamage(player, damager, damage, weapon, position) {#onplayerdamageplayer-damager-damage-weapon-position}

Fires when a player's character is damaged, see [Damage](#damage) above.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The damaged player's character. |
| damager | `PlayerObjectHandle`, `VehicleHandle`, `MountedGunHandle`, `RigidObjectHandle`, `NPCHandle`, `TetherHandle`, `SandstormHandle` or `nil` | What caused the damage, as its typed handle (a player that shot, a vehicle that ran it over...). `nil` when unknown or when the health dropped without a hit. |
| damage | `number` | The health lost, as a fraction of the maximum health (health goes from 0 to 1, so `0.25` is a quarter of it). |
| weapon | `integer` | The game's 32-bit hash of the weapon's name (see [Hash](../shared/hash.md)), `0` when there's none. |
| position | `vec3` | Where the hit landed, in world coordinates. When the health dropped without a hit, the player's position. |

**Cancellable:** yes, for reported hits. Cancelling it doesn't apply the damage: the health doesn't change, the hit isn't relayed to any client and `OnPlayerKilled` doesn't fire.

**Frequency:** once per hit (an automatic weapon fires it many times per second).

**Example**

```lua
-- friendly fire off
Event.Add("OnPlayerDamage", function(player, damager, damage, weapon, position)
	local attacker = damager and damager:AsPlayer()

	if attacker and attacker:GetNetId() ~= player:GetNetId() and attacker:GetData("team") == player:GetData("team") then
		Event.Cancel()
	end
end)
```

### OnPlayerKilled(player, damager, damage, weapon, position) {#onplayerkilledplayer-damager-damage-weapon-position}

Fires when a hit takes a player's health from above 0 to 0, right after the [OnPlayerDamage](#onplayerdamageplayer-damager-damage-weapon-position) that killed it, with the same arguments. It doesn't fire again until the player is alive again. The player stays dead until a script revives it, usually with `player:Respawn(...)` (see [Player](../shared/objects/player.md)).

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The player that died. |
| damager | typed handle or `nil` | What dealt the killing damage, `nil` when unknown. |
| damage | `number` | The health lost by the killing hit (fraction of the maximum). |
| weapon | `integer` | The weapon's name hash (see [Hash](../shared/hash.md)), `0` when there's none. |
| position | `vec3` | Where the killing hit landed. |

**Frequency:** once per death.

**Example**

```lua
Event.Add("OnPlayerKilled", function(player, damager, damage, weapon, position)
	local killer = damager and damager:AsPlayer()
	local victim = player:GetClient()

	if killer and killer:GetNetId() ~= player:GetNetId() and victim then
		local killer_client = killer:GetClient()

		if killer_client then
			Chat.Broadcast(killer_client:GetName() .. " killed " .. victim:GetName())
		end
	end

	-- respawn 5 seconds later
	Timer.Set(function()
		player:Respawn(vec3(2370, 300, 1210))
	end, 5000, 1)
end)
```

### OnVehicleDamage(vehicle, damager, damage, weapon, position) {#onvehicledamagevehicle-damager-damage-weapon-position}

Fires when a vehicle is damaged, see [Damage](#damage) above. Melee hits on vehicles are not reported.

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | The damaged vehicle. |
| damager | typed handle or `nil` | What caused the damage (a player, another vehicle...), `nil` when unknown or when the health dropped without a hit. |
| damage | `number` | The health lost, as a fraction of the vehicle's maximum health. |
| weapon | `integer` | The weapon's name hash (see [Hash](../shared/hash.md)), `0` when there's none. |
| position | `vec3` | Where the hit landed (the vehicle's position when the game gave none). |

**Cancellable:** yes, for reported hits. Cancelling it doesn't apply the damage: the health doesn't change, the hit isn't relayed to any client and `OnVehicleDestroy` doesn't fire.

**Frequency:** once per hit.

**Example**

```lua
-- vehicles marked as protected can't be damaged
Event.Add("OnVehicleDamage", function(vehicle, damager, damage, weapon, position)
	if vehicle:GetData("protected") then
		Event.Cancel()
	end
end)
```

### OnVehicleDestroy(vehicle, damager, damage, weapon, position) {#onvehicledestroyvehicle-damager-damage-weapon-position}

Fires when a hit takes a vehicle's health from above 0 to 0, right after the [OnVehicleDamage](#onvehicledamagevehicle-damager-damage-weapon-position) that destroyed it, with the same arguments. Further hits on the destroyed vehicle still fire `OnVehicleDamage`, but not `OnVehicleDestroy` again.

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | The destroyed vehicle. |
| damager | typed handle or `nil` | What dealt the final damage, `nil` when unknown. |
| damage | `number` | The health lost by the final hit (fraction of the maximum). |
| weapon | `integer` | The weapon's name hash (see [Hash](../shared/hash.md)), `0` when there's none. |
| position | `vec3` | Where the final hit landed. |

**Frequency:** once per destruction.

**Example**

```lua
Event.Add("OnVehicleDestroy", function(vehicle)
	-- remove the wreck after 30 seconds
	Timer.Set(function()
		World.Destroy(vehicle)
	end, 30000, 1)
end)
```