---
sidebar_position: 48
---

# Client events

Every built-in event the client fires to its scripts. Register a handler with [`Event.Add`](../shared/events.md#eventaddname-handler) in any client or shared script; see [Events](../shared/events.md) for how handlers, cancelling and custom events work. Messages sent by the server with `Net.SendToPlayer`/`Net.Broadcast` are not events of this list, see [Net](../shared/net.md).

**Available on:** Client

Shared scripts also run on the server, where a different set of events fires: see [Server events](../server/events.md). `OnResourceStart`, `OnResourceStop`, `OnPlayerJoin`, `OnPlayerQuit`, `OnChat`, `OnPlayerTeleport`, `OnPlayerDamage`, `OnPlayerKilled`, `OnVehicleDamage` and `OnVehicleDestroy` exist on both sides, with differences described on each page.

Unless an event says otherwise:

- it can't be cancelled (`Event.Cancel()` has no effect),
- what the handler returns is ignored,
- it only concerns this player's game: other players' games fire their own events, and nothing is sent to the server.

Events about objects (players, vehicles) only fire for networked objects this client knows about, that is the ones streamed in around the local player (see [World](../shared/world.md)). The game's own objects that aren't networked never fire them.

| Event | When |
|---|---|
| [OnResourceStart](#onresourcestartname) | a resource started on this client |
| [OnResourceStop](#onresourcestopname) | a resource is stopping on this client |
| [OnClientJoin](#onclientjoin) | this client finished joining the server |
| [OnPlayerJoin](#onplayerjoinclient) | another player joined |
| [OnPlayerQuit](#onplayerquitclient) | another player left |
| [OnUpdate](#onupdate) | every game update, before the multiplayer update |
| [OnPostUpdate](#onpostupdate) | every game update, after the multiplayer update |
| [OnRender](#onrender) | every frame, before the UI is drawn |
| [OnPostRender](#onpostrender) | every frame, after the UI is drawn |
| [OnKeyDown](#onkeydownkey) | a key or mouse button was pressed |
| [OnKeyUp](#onkeyupkey) | a key or mouse button was released |
| [OnMouseDown](#onmousedownbutton) | the left or right mouse button was pressed |
| [OnMouseWheel](#onmousewheeldelta) | the mouse wheel moved |
| [OnLocalPlayerInput](#onlocalplayerinputaction) | the game read an active input action (cancellable) |
| [OnWaypointPlace](#onwaypointplaceposition) | the player is placing a map waypoint (cancellable) |
| [OnWaypointRemove](#onwaypointremoveautomatic) | the map waypoint is being removed (cancellable) |
| [OnScanStart](#onscanstart) | the scan overlay is opening (cancellable) |
| [OnScanEnd](#onscanend) | the scan overlay is closing (cancellable) |
| [OnChat](#onchatsender-text) | a chat message arrived |
| [OnPlayerTeleport](#onplayerteleportplayer) | a player finished a scripted teleport or respawn |
| [OnPlayerRagdollStart](#onplayerragdollstartplayer) | a player started ragdolling |
| [OnPlayerRagdollEnd](#onplayerragdollendplayer) | a player stopped ragdolling |
| [OnPlayerKicked](#onplayerkickedplayer) | a player's character was kicked |
| [OnPlayerGrappleHit](#onplayergrapplehitplayer-position-direction) | a player's character was hit by a grappling hook |
| [OnPlayerDamage](#onplayerdamageplayer-damager-damage-weapon-position) | a player was damaged |
| [OnPlayerKilled](#onplayerkilledplayer-damager-damage-weapon-position) | a player's health reached 0 |
| [OnVehicleDamage](#onvehicledamagevehicle-damager-damage-weapon-position) | a vehicle was damaged |
| [OnVehicleDestroy](#onvehicledestroyvehicle-damager-damage-weapon-position) | a vehicle's health reached 0 |
| [OnVehicleExplode](#onvehicleexplodevehicle) | a vehicle exploded in this game |
| [OnVehicleCollision](#onvehiclecollisionvehicle-position-normal-impulse) | a vehicle collided |
| [OnVehiclePartChangedState](#onvehiclepartchangedstatevehicle-part-state) | a vehicle door or part opened or closed |
| [OnVehicleNitrousUse](#onvehiclenitroususevehicle) | a vehicle is using nitrous |
| [OnVehicleTurboJump](#onvehicleturbojumpvehicle) | a vehicle turbo jumped |
| [OnVehicleHornPlay](#onvehiclehornplayvehicle) | a vehicle's horn started |
| [OnVehicleHornStop](#onvehiclehornstopvehicle) | a vehicle's horn stopped |
| [OnVehicleRender](#onvehiclerendervehicle) | every frame, for each vehicle |

## Resources and connection {#resources-and-connection}

### OnResourceStart(name) {#onresourcestartname}

Fires when a resource has started on this client: all its client and shared scripts have run their top level without errors. It fires in every running resource, including the one that just started, so compare `name` with `Resource.Name` to react only to your own start. It doesn't fire for resources that were already running when your resource started.

The client starts the resources the server is running when it joins (before [OnClientJoin](#onclientjoin)), and again every time the server starts, restarts or updates one of them. A start asked for from inside an event handler happens at the next resource update. A restart fires `OnResourceStop` and then `OnResourceStart`. The server learns about each start through [OnPlayerResourceAction](../server/events.md#onplayerresourceactionclient-name-action).

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | The name of the resource that started. |

**Frequency:** once per resource start.

**Example**

```lua
Event.Add("OnResourceStart", function(name)
	if name == Resource.Name then
		Local.UnlockAbility(Ability.Parachute)
		Local.UnlockAbility(Ability.Wingsuit)
	end
end)
```

### OnResourceStop(name) {#onresourcestopname}

Fires when a resource is about to stop on this client, before its scripts are shut down: its own handlers still run. It fires in every running resource, including the one that is stopping. Use it to undo what your resource changed in the game (abilities, UI, weather...), since the game doesn't undo it for you.

A resource stops when the server stops, restarts or updates it, and every running resource stops when the client disconnects or the game closes.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | The name of the resource that is stopping. |

**Frequency:** once per resource stop.

**Example**

```lua
Event.Add("OnResourceStop", function(name)
	if name == Resource.Name then
		-- give back the abilities this mode removed
		Local.UnlockAbility(Ability.Tether)
	end
end)
```

### OnClientJoin() {#onclientjoin}

Fires once per connection, when this client has finished its first resource sync with the server, has started the resources the server is running, and has told the server it joined. It's the moment to send the server your first `Net` messages.

It doesn't fire again for the same connection, so a resource started later (for example one the server restarts while you play) never sees it. Such a resource can check at the top level whether the client already joined, as in the example.

**Parameters** none.

**Frequency:** once per connection.

**Example**

```lua
local function ask_state()
	Net.Send("drones_state")
end

Event.Add("OnClientJoin", ask_state)

-- the resource was (re)started after the join: no OnClientJoin will come
if World.LocalPlayer() then
	ask_state()
end
```

### OnPlayerJoin(client) {#onplayerjoinclient}

Fires when another player finishes joining the server while this client is connected. The players that were already on the server when this client joined don't fire it (they are already in the player list), and neither does this client itself (see [OnClientJoin](#onclientjoin)).

**Parameters**

| Name | Type | Description |
|---|---|---|
| client | `PlayerHandle` | The player that joined. See [Player](../shared/objects/player.md). |

**Frequency:** once per player joining.

**Example**

```lua
Event.Add("OnPlayerJoin", function(client)
	print(client:GetName() .. " joined")
end)
```

### OnPlayerQuit(client) {#onplayerquitclient}

Fires when another player leaves the server. The player is still in the player list while the handlers run, so you can still read its name; it is removed right after.

**Parameters**

| Name | Type | Description |
|---|---|---|
| client | `PlayerHandle` | The player that is leaving. |

**Frequency:** once per player leaving.

**Example**

```lua
local scoreboard = {}

Event.Add("OnPlayerQuit", function(client)
	scoreboard[client:GetNetId()] = nil
end)
```

## Frame {#frame}

### OnUpdate() {#onupdate}

Fires on every game update (once per game frame), before the multiplayer systems update: the resource update (timers, queued resource actions), the players and the network sync all run after it. Game logic goes here: reading and changing the game, players, vehicles and the world. Use `World.GetUpdateDeltaTime()` (see [World](../shared/world.md)) for the time since the last update.

It starts firing once the game has loaded past its boot (from the main menu or the loading screen on).

**Parameters** none.

**Frequency:** every game frame. Keep handlers light: a slow handler lowers the frame rate.

**Example**

```lua
local last = 0

Event.Add("OnUpdate", function()
	local now = Client.GetElapsedSeconds()

	if now - last >= 1 then
		last = now

		local player = World.LocalPlayer()

		if player then
			print("health: " .. player:GetHealth())
		end
	end
end)
```

### OnPostUpdate() {#onpostupdate}

Fires on every game update, right after [OnUpdate](#onupdate) and the multiplayer update (timers, players, network), before the game runs its own update. Use it for work that must see the latest network state of this frame.

**Parameters** none.

**Frequency:** every game frame.

**Example**

```lua
Event.Add("OnPostUpdate", function()
	local player = World.LocalPlayer()

	if player and player:GetPosition().y < -50 then
		Net.Send("fell_out_of_world")
	end
end)
```

### OnRender() {#onrender}

Fires every time a frame is presented, before the name tags and the webview pages (see [UI](./ui.md)) are drawn over it, so anything you draw here ends up under the UI. It comes from the game's rendering, not from its update: use it to draw and to feed screen positions to pages (see [Render](./render.md) and [Camera](./camera.md)), and keep game logic and game queries in [OnUpdate](#onupdate). It fires on every frame, including loading screens and menus.

**Parameters** none.

**Frequency:** every rendered frame.

**Example**

```lua
-- "marker_page" is a webview this resource created (see UI)
local target = vec3(2370, 300, 1210)

Event.Add("OnRender", function()
	local screen = Camera.WorldToScreen(target)

	if screen then
		WebView.SendMessage("marker_page", "marker", { x = screen.x, y = screen.y })
	end
end)
```

### OnPostRender() {#onpostrender}

Fires every time a frame is presented, after the name tags and the webview pages were drawn, so anything you draw here ends up over the UI.

**Parameters** none.

**Frequency:** every rendered frame.

**Example**

```lua
local frames = 0

Event.Add("OnPostRender", function()
	frames = frames + 1
end)

Timer.Set(function()
	print("fps: " .. frames)
	frames = 0
end, 1000, -1)
```

## Input {#input}

The key and mouse events come straight from the game window's messages, before the game sees them. They fire whether or not the game's input is enabled (`Input.SetEnabled`, see [Input](./input.md)), and also in menus and loading screens. They don't fire for input that goes to a webview: keys typed while a page has keyboard focus, clicks and wheel over a focused page, and all of them while the UI captures the game's input (see [UI](./ui.md)).

### OnKeyDown(key) {#onkeydownkey}

Fires when a key is pressed, including system keys (`Alt` combinations, `F10`). Holding a key down repeats the event at the keyboard's repeat rate, so keep a "held" state if you want to act once per press (see the example). It also fires when a mouse button is pressed, with the button's code (`Key.MouseLeft`...).

**Parameters**

| Name | Type | Description |
|---|---|---|
| key | `integer` | The Windows virtual-key code of the key, a [`Key`](../shared/enums/key.md) value (e.g. `Key.F1`). |

**Notes**

- Shift, Ctrl and Alt fire it twice: once with the side-specific code (`Key.LeftShift`...) and once with the generic code (`Key.Shift`...).

**Frequency:** once per press, then repeatedly while held.

**Example**

```lua
local held = {}

Event.Add("OnKeyDown", function(key)
	if held[key] then return end -- auto-repeat

	held[key] = true

	if key == Key.F2 then
		Net.Send("menu_open")
	end
end)

Event.Add("OnKeyUp", function(key)
	held[key] = nil
end)
```

### OnKeyUp(key) {#onkeyupkey}

Fires when a key or mouse button is released, with its code. For Shift, Ctrl and Alt it fires with the side-specific code, and with the generic code once neither side is held any more.

**Parameters**

| Name | Type | Description |
|---|---|---|
| key | `integer` | The Windows virtual-key code of the released key, a [`Key`](../shared/enums/key.md) value. |

**Frequency:** once per release.

**Example**

```lua
Event.Add("OnKeyUp", function(key)
	if key == Key.F7 then
		Net.Send("toggle_spawn_menu")
	end
end)
```

### OnMouseDown(button) {#onmousedownbutton}

Fires when a mouse button is pressed over the game, right before the matching [OnKeyDown](#onkeydownkey). Releases don't fire it (use [OnKeyUp](#onkeyupkey)). A double click fires it twice.

**Parameters**

| Name | Type | Description |
|---|---|---|
| button | `integer` | `Key.MouseLeft`, `Key.MouseRight`, `Key.MouseMid`, `Key.MouseX4` or `Key.MouseX5`. |

**Frequency:** once per click.

**Example**

```lua
Event.Add("OnMouseDown", function(button)
	if button == Key.MouseRight then
		print("right click")
	end
end)
```

### OnMouseWheel(delta) {#onmousewheeldelta}

Fires when the mouse wheel moves over the game.

**Parameters**

| Name | Type | Description |
|---|---|---|
| delta | `vec2` | `x` is always `0`. `y` is the movement in wheel notches: positive when the wheel is rolled away from the user, negative towards the user (a fast spin can give more than 1 per event). A horizontal wheel is reported in `y` too. |

**Frequency:** once per wheel message.

**Example**

```lua
local zoom = 10

Event.Add("OnMouseWheel", function(delta)
	zoom = math.max(2, math.min(50, zoom - delta.y))
end)
```

### OnLocalPlayerInput(action) {#onlocalplayerinputaction}

Fires when the game reads one of the local player's input actions (jump, fire, enter vehicle, steer...) and it is active: a pressed button or a non-zero analog value. Cancelling it hides the input from the game for that read, which is how you block game actions while a menu or the chat is open.

The game reads many actions every frame, some several times, so this fires very often while the player is pressing something: keep the handler fast. It doesn't fire while the game input is disabled with `Input.SetEnabled(false)` (all input is already blocked then).

**Parameters**

| Name | Type | Description |
|---|---|---|
| action | `integer` | The game's 32-bit hash of the input action's name. The [`InputAction`](./enums/action.md#inputaction) table has the named ones (`InputAction.Jump`), and [`Hash`](../shared/hash.md) computes it from a name (`Hash("jump") == InputAction.Jump`). |

**Cancellable:** yes. Cancelling makes the game see the action as not pressed (or `0` for an analog value) for that read. Other reads of the same action in the same frame fire the event again, so cancel every time.

**Frequency:** every read of an active action, often several times per frame.

**Example**

```lua
local menu_open = false

-- no jumping while the menu is open
Event.Add("OnLocalPlayerInput", function(action)
	if menu_open and action == InputAction.Jump then
		Event.Cancel()
	end
end)
```

## Map and HUD {#map-and-hud}

### OnWaypointPlace(position) {#onwaypointplaceposition}

Fires when the player places a waypoint on the map, before it is placed. Setting it from a script with `World.SetWaypoint` (see [World](../shared/world.md)) doesn't fire it.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | Where the waypoint is being placed, in world coordinates. |

**Cancellable:** yes. Cancelling it doesn't place the waypoint (any previous waypoint stays).

**Frequency:** once per waypoint placed.

**Example**

```lua
Event.Add("OnWaypointPlace", function(position)
	-- in this mode waypoints teleport the player instead
	Event.Cancel()
	Net.Send("teleport_to", position)
end)
```

### OnWaypointRemove(automatic) {#onwaypointremoveautomatic}

Fires when the map waypoint is about to be removed, before it is removed. Clearing it from a script with `World.ClearWaypoint` doesn't fire it.

**Parameters**

| Name | Type | Description |
|---|---|---|
| automatic | `boolean` | `true` when the game removes it by itself during its map marker update (for example when the player reaches it), `false` when it's removed some other way, such as the player clearing it on the map. |

**Cancellable:** yes. Cancelling it keeps the waypoint.

**Frequency:** once per removal attempt.

**Example**

```lua
Event.Add("OnWaypointRemove", function(automatic)
	if automatic then
		print("waypoint reached")
	end
end)
```

### OnScanStart() {#onscanstart}

Fires when the game is about to show the scan overlay (the vision mode that highlights points of interest), before it is shown. `Local.ShowScan(true)` (see [Local](./local.md)) doesn't fire it.

**Parameters** none.

**Cancellable:** yes. Cancelling it keeps the overlay from opening.

**Frequency:** once per opening.

**Example**

```lua
-- no scanning in this game mode
Event.Add("OnScanStart", function()
	Event.Cancel()
end)
```

### OnScanEnd() {#onscanend}

Fires when the game is about to hide the scan overlay, before it is hidden. `Local.ShowScan(false)` doesn't fire it.

**Parameters** none.

**Cancellable:** yes. Cancelling it keeps the overlay open.

**Frequency:** once per closing.

**Example**

```lua
Event.Add("OnScanEnd", function()
	print("scan closed")
end)
```

## Chat {#chat}

### OnChat(sender, text) {#onchatsender-text}

Fires when a chat message arrives from the server. Messages written by players arrive after the server let them through (see the server's [OnChat](../server/events.md#onchatclient-text)), with the sender's name already in the text, and this includes the local player's own messages. Messages broadcast by server scripts with `Chat.Broadcast` (see [Chat](../server/chat.md)) arrive with no sender.

**Parameters**

| Name | Type | Description |
|---|---|---|
| sender | `PlayerHandle` or `nil` | The player that wrote it, `nil` for a message from the server. |
| text | `string` | The text to show. For a player's message it is `"<name>: <message>"`. |

**Frequency:** once per message.

**Example**

```lua
Event.Add("OnChat", function(sender, text)
	local me = World.LocalClient()

	if sender and me and sender:GetNetId() == me:GetNetId() then
		print("(me) " .. text)
	else
		print(text)
	end
end)
```

## Players {#players}

### OnPlayerTeleport(player) {#onplayerteleportplayer}

Fires when the server confirms that a player finished a teleport or respawn a server script asked for (see the server's [OnPlayerTeleport](../server/events.md#onplayerteleportplayer)). It fires on the teleported player's client and on the clients that see that player.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The player's character. See [Player](../shared/objects/player.md). |

**Frequency:** once per scripted teleport or respawn of a player this client sees.

**Example**

```lua
Event.Add("OnPlayerTeleport", function(player)
	local me = World.LocalPlayer()

	if me and player:GetNetId() == me:GetNetId() then
		print("teleported to " .. tostring(player:GetPosition()))
	end
end)
```

### OnPlayerRagdollStart(player) {#onplayerragdollstartplayer}

Fires when a player's character starts ragdolling (falls limp after an explosion, a hit, a crash...). For the local player it fires when the game puts it in ragdoll; for other players when their synced state says so.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The player's character. |

**Frequency:** once each time the player starts ragdolling.

**Example**

```lua
Event.Add("OnPlayerRagdollStart", function(player)
	local me = World.LocalPlayer()

	if me and player:GetNetId() == me:GetNetId() then
		print("down!")
	end
end)
```

### OnPlayerRagdollEnd(player) {#onplayerragdollendplayer}

Fires when a player's character stops ragdolling.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The player's character. |

**Frequency:** once each time the player stops ragdolling.

**Example**

```lua
Event.Add("OnPlayerRagdollEnd", function(player)
	local me = World.LocalPlayer()

	if me and player:GetNetId() == me:GetNetId() then
		print("back on your feet")
	end
end)
```

### OnPlayerKicked(player) {#onplayerkickedplayer}

Fires when the game runs its "kicked" reaction on a player's character, that is when the character is physically kicked in the game. It has nothing to do with being kicked from the server. It fires before the game applies the reaction.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The player's character that was kicked. |

**Frequency:** once per kick.

**Example**

```lua
Event.Add("OnPlayerKicked", function(player)
	local client = player:GetClient()

	if client then
		print(client:GetName() .. " got kicked")
	end
end)
```

### OnPlayerGrappleHit(player, position, direction) {#onplayergrapplehitplayer-position-direction}

Fires when a player's character is hit by a grappling hook, before the game plays its hit reaction.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The player's character that was hit. |
| position | `vec3` | Where the hook hit, in world coordinates. |
| direction | `vec3` | The direction of the hit, as the game reports it. |

**Frequency:** once per hit.

**Example**

```lua
Event.Add("OnPlayerGrappleHit", function(player, position, direction)
	local me = World.LocalPlayer()

	if me and player:GetNetId() == me:GetNetId() then
		print("you've been hooked at " .. tostring(position))
	end
end)
```

### OnPlayerDamage(player, damager, damage, weapon, position) {#onplayerdamageplayer-damager-damage-weapon-position}

Fires when the server relays a hit on a player that this client sees, the local player included. Hits are reported to the server by the game of the player who caused them, and the server relays the ones its scripts didn't cancel (see the server's [OnPlayerDamage](../server/events.md#onplayerdamageplayer-damager-damage-weapon-position)). The health is lowered right after the handlers, and [OnPlayerKilled](#onplayerkilledplayer-damager-damage-weapon-position) follows if the hit took it from above 0 to 0.

Health changes the server makes without a hit (for example a server script calling `SetHealth`) don't fire it on the client.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The damaged player's character. |
| damager | `PlayerObjectHandle`, `VehicleHandle`, `MountedGunHandle`, `RigidObjectHandle`, `NPCHandle`, `TetherHandle`, `SandstormHandle` or `nil` | What caused the damage, as its typed handle. `nil` when unknown or when this client doesn't know that object. |
| damage | `number` | The health lost, as a fraction of the maximum health (health goes from 0 to 1). |
| weapon | `integer` | The game's 32-bit hash of the weapon's name (see [Hash](../shared/hash.md)), `0` when there's none. |
| position | `vec3` | Where the hit landed, in world coordinates. |

**Frequency:** once per relayed hit.

**Example**

```lua
Event.Add("OnPlayerDamage", function(player, damager, damage)
	local me = World.LocalPlayer()

	if me and player:GetNetId() == me:GetNetId() then
		print(string.format("you lost %d%% health", damage * 100))
	end
end)
```

### OnPlayerKilled(player, damager, damage, weapon, position) {#onplayerkilledplayer-damager-damage-weapon-position}

Fires when a relayed hit takes a player's health from above 0 to 0, right after its [OnPlayerDamage](#onplayerdamageplayer-damager-damage-weapon-position), with the same arguments. Only players this client sees fire it. Later hits on the dead player don't fire it again; once the player respawns, it can be killed again and fires it again.

**Parameters**

| Name | Type | Description |
|---|---|---|
| player | `PlayerObjectHandle` | The player that died. |
| damager | typed handle or `nil` | What dealt the killing damage, `nil` when unknown. |
| damage | `number` | The health lost by the killing hit (fraction of the maximum). |
| weapon | `integer` | The weapon's name hash (see [Hash](../shared/hash.md)), `0` when there's none. |
| position | `vec3` | Where the killing hit landed. |

**Frequency:** once per death of a player this client sees.

**Example**

```lua
Event.Add("OnPlayerKilled", function(player, damager)
	local killer = damager and damager:AsPlayer()

	if killer and killer:GetNetId() ~= player:GetNetId() then
		local victim_client = player:GetClient()
		local killer_client = killer:GetClient()

		if victim_client and killer_client then
			print(killer_client:GetName() .. " killed " .. victim_client:GetName())
		end
	end
end)
```

## Vehicles {#vehicles}

### OnVehicleDamage(vehicle, damager, damage, weapon, position) {#onvehicledamagevehicle-damager-damage-weapon-position}

Fires when the server relays a hit on a vehicle this client sees, the same way as [OnPlayerDamage](#onplayerdamageplayer-damager-damage-weapon-position) (see the server's [OnVehicleDamage](../server/events.md#onvehicledamagevehicle-damager-damage-weapon-position)). The game then applies the damage to the vehicle, and [OnVehicleDestroy](#onvehicledestroyvehicle-damager-damage-weapon-position) follows if its health reached 0.

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | The damaged vehicle. See [Vehicle](./objects/vehicle.md). |
| damager | typed handle or `nil` | What caused the damage, `nil` when unknown. |
| damage | `number` | The health lost, as a fraction of the vehicle's maximum health. |
| weapon | `integer` | The weapon's name hash (see [Hash](../shared/hash.md)), `0` when there's none. |
| position | `vec3` | Where the hit landed. |

**Frequency:** once per relayed hit.

**Example**

```lua
Event.Add("OnVehicleDamage", function(vehicle, damager, damage)
	local player = World.LocalPlayer()
	local current = player and player:AsPlayer():GetVehicle()

	if current and current:GetNetId() == vehicle:GetNetId() then
		print(string.format("your vehicle lost %d%% health", damage * 100))
	end
end)
```

### OnVehicleDestroy(vehicle, damager, damage, weapon, position) {#onvehicledestroyvehicle-damager-damage-weapon-position}

Fires when a relayed hit takes a vehicle's health from above 0 to 0, right after its [OnVehicleDamage](#onvehicledamagevehicle-damager-damage-weapon-position), with the same arguments. Further hits on the destroyed vehicle still fire `OnVehicleDamage`, but not `OnVehicleDestroy` again.

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
Event.Add("OnVehicleDestroy", function(vehicle, damager)
	print("vehicle " .. vehicle:GetNetId() .. " was destroyed")
end)
```

### OnVehicleExplode(vehicle) {#onvehicleexplodevehicle}

Fires when a vehicle explodes in this client's game, before the game plays the explosion. Each client fires it from its own game, so it's a client-only event: the server has no equivalent (use [OnVehicleDestroy](../server/events.md#onvehicledestroyvehicle-damager-damage-weapon-position) there).

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | The vehicle that exploded. |

**Frequency:** once per explosion.

**Example**

```lua
Event.Add("OnVehicleExplode", function(vehicle)
	print("boom at " .. tostring(vehicle:GetPosition()))
end)
```

### OnVehicleCollision(vehicle, position, normal, impulse) {#onvehiclecollisionvehicle-position-normal-impulse}

Fires every time the game reports a collision for a vehicle on this client: against the ground, buildings, objects or other vehicles. A vehicle scraping along a wall reports collisions continuously, so expect many events per second; filter by `impulse` to react only to real crashes.

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | The vehicle that collided. |
| position | `vec3` | The contact point, in world coordinates. |
| normal | `vec3` | The contact normal. |
| impulse | `number` | The physical impulse the collision applied (in the physics engine's units; larger means a harder hit). |

**Frequency:** once per reported collision, often several per frame.

**Example**

```lua
Event.Add("OnVehicleCollision", function(vehicle, position, normal, impulse)
	if impulse > 5000 then
		print("hard crash: " .. impulse)
	end
end)
```

### OnVehiclePartChangedState(vehicle, part, state) {#onvehiclepartchangedstatevehicle-part-state}

Fires when a door or other moving part of a vehicle (trunk, hood, cargo bay door, folding wings...) is told to open or close: when it happens in this client's game, and when the change comes from the server (another player's vehicle, or a vehicle streaming in with a part in a different state).

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | The vehicle. |
| part | `integer` | The part, a `VehiclePart` value (e.g. `VehiclePart.Trunk`). See [Enums](../shared/enums/README.md). |
| state | `integer` | The new state, `VehiclePartState.Open` or `VehiclePartState.Closed`. |

**Frequency:** once per change.

**Example**

```lua
Event.Add("OnVehiclePartChangedState", function(vehicle, part, state)
	if part == VehiclePart.CargoBayDoor and state == VehiclePartState.Open then
		print("cargo bay opened")
	end
end)
```

### OnVehicleNitrousUse(vehicle) {#onvehiclenitroususevehicle}

Fires on every game update in which a vehicle's nitrous is active, whoever drives it.

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | The vehicle using nitrous. |

**Frequency:** every game frame while nitrous is active.

**Example**

```lua
local boosting = {}

Event.Add("OnVehicleNitrousUse", function(vehicle)
	boosting[vehicle:GetNetId()] = Client.GetElapsedSeconds()
end)
```

### OnVehicleTurboJump(vehicle) {#onvehicleturbojumpvehicle}

Fires once when a vehicle performs a turbo jump, at the moment it starts.

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | The vehicle that jumped. |

**Frequency:** once per jump.

**Example**

```lua
Event.Add("OnVehicleTurboJump", function(vehicle)
	print("vehicle " .. vehicle:GetNetId() .. " jumped")
end)
```

### OnVehicleHornPlay(vehicle) {#onvehiclehornplayvehicle}

Fires when a vehicle's horn starts playing.

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | The vehicle honking. |

**Frequency:** once each time the horn starts.

**Example**

```lua
local honking = {}

Event.Add("OnVehicleHornPlay", function(vehicle)
	honking[vehicle:GetNetId()] = true
end)

Event.Add("OnVehicleHornStop", function(vehicle)
	honking[vehicle:GetNetId()] = nil
end)
```

### OnVehicleHornStop(vehicle) {#onvehiclehornstopvehicle}

Fires when a vehicle's horn stops playing.

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | The vehicle that stopped honking. |

**Frequency:** once each time the horn stops.

**Example**

```lua
Event.Add("OnVehicleHornStop", function(vehicle)
	print("horn released on vehicle " .. vehicle:GetNetId())
end)
```

### OnVehicleRender(vehicle) {#onvehiclerendervehicle}

Fires every frame for every vehicle on this client, while the game updates the vehicle for rendering, as part of the game update (not the render step of [OnRender](#onrender)). Use it for per-vehicle work that must run every frame.

**Parameters**

| Name | Type | Description |
|---|---|---|
| vehicle | `VehicleHandle` | The vehicle being updated. |

**Frequency:** every frame, once per vehicle. With many vehicles around this adds up quickly: keep the handler minimal.

**Example**

```lua
local closest, closest_distance

Event.Add("OnUpdate", function()
	closest, closest_distance = nil, math.huge
end)

Event.Add("OnVehicleRender", function(vehicle)
	local player = World.LocalPlayer()

	if player then
		local distance = (vehicle:GetPosition() - player:GetPosition()):length()

		if distance < closest_distance then
			closest, closest_distance = vehicle, distance
		end
	end
end)
```