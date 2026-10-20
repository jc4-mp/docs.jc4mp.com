---
sidebar_position: 67
---

# Sound

The `Sound` table plays your own audio files in the game: music, voice lines, UI sounds, or positional sounds placed in the world. You load a file shipped with your resource under a name of your choice, then play it as many times as you like. Every play returns a [`SoundChannel`](#soundchannel) that controls that one playback (volume, pitch, pause, position).

**Available on:** Client

Sounds play only on the client that plays them. To make every player hear something, send a [`Net`](../shared/net.md) event from the server and play the sound in each client's handler.

## Lifetime {#lifetime}

- A sound created with `Sound.Create` belongs to the resource that created it. It is released when that resource stops, which also stops every channel still playing it.
- Sound names are shared by all resources on the client. A name already in use (by your resource or any other) cannot be created again until its owner stops; pick names unlikely to collide, for example prefixed with your resource name.
- Any resource can play any loaded sound by name.

## Functions {#functions}

### Sound.Create(name, filename) {#soundcreatename-filename}

Loads an audio file from the calling resource and registers it as `name`. The whole file is read into memory once, so later plays start instantly.

`filename` is relative to the folder of the script that calls `Sound.Create`: from `client/main.lua`, `"song.ogg"` means `client/song.ogg` and `"sfx/hit.wav"` means `client/sfx/hit.wav`. The file must be in the resource's `client/` or `shared/` folder so players download it when they join. Common formats such as WAV, OGG, MP3 and FLAC work.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | The name to play the sound by. Must not be empty. |
| filename | `string` | Path of the audio file, relative to the calling script's folder. |

**Returns** `boolean`: `true` when the sound was loaded; `false` when `name` is empty, the file is missing or empty, the name is already taken, or the file is not audio the game can decode. When it returns `false`, the name stays free.

**Example**

```lua
-- client/main.lua of a resource "radio", with client/song0.ogg next to it
Event.Add("OnResourceStart", function(name)
	if name ~= Resource.Name then return end

	if not Sound.Create("radio_song0", "song0.ogg") then
		print("could not load song0.ogg")
	end
end)
```

### Sound.Play2D(name, loop) {#soundplay2dname-loop}

Plays a loaded sound without position: it is heard at the same volume wherever the camera is, like music or a UI sound. Playback starts immediately.

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | Name given to `Sound.Create`. |
| loop | `boolean` | `true` to repeat the sound until it is stopped, `false` to play it once. |

**Returns** [`SoundChannel`](#soundchannel), or `nil` when `name` is empty or no sound is loaded under that name.

**Example**

```lua
local music

Cmd.Add("music", function()
	if music and music:IsPlaying() then
		music:SetPaused(true)
		music = nil
		return
	end

	music = Sound.Play2D("radio_song0", true)

	if music then
		music:SetVolume(0.5)
	end
end)
```

### Sound.Play3D(name, position, loop) {#soundplay3dname-position-loop}

Plays a loaded sound at a position in the world. It is heard from where the game listens (the camera), getting quieter with distance: full volume within 1 m and, by default, silent beyond 20 m, fading linearly in between. Use [`soundChannel:Set3DMinMaxDistance`](#soundchannelset3dminmaxdistancemin-max) to change that range, and [`soundChannel:Set3DAttributes`](#soundchannelset3dattributesposition-velocity) to move the sound (for example to follow a vehicle).

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | `string` | Name given to `Sound.Create`. |
| position | `vec3` | World position of the sound. |
| loop | `boolean` | `true` to repeat the sound until it is stopped, `false` to play it once. |

**Returns** [`SoundChannel`](#soundchannel), or `nil` when `name` is empty, no sound is loaded under that name, or it could not be played.

**Example**

```lua
-- a car radio that follows the vehicle
local radio

Cmd.Add("radio", function()
	local vehicle = World.LocalPlayer():AsPlayer():GetVehicle()
	if not vehicle then return end

	radio = Sound.Play3D("radio_song0", vehicle:GetPosition(), true)

	if radio then
		radio:Set3DMinMaxDistance(2, 40)
	end
end)

Event.Add("OnUpdate", function()
	local vehicle = World.LocalPlayer():AsPlayer():GetVehicle()

	if radio and vehicle then
		radio:Set3DAttributes(vehicle:GetPosition(), vec3(0, 0, 0))
	end
end)
```

## SoundChannel {#soundchannel}

One playback of a sound, returned by [`Sound.Play2D`](#soundplay2dname-loop) and [`Sound.Play3D`](#soundplay3dname-position-loop). A channel ends when a non-looping sound finishes or when its sound is released (its resource stopped). After that, setters do nothing, `IsPlaying` returns `false`, and the other getters return `0` (or zero vectors). There is no stop function: pause the channel and drop it.

### soundChannel\:IsPlaying() {#soundchannelisplaying}

Returns whether the channel still exists: `true` while the sound is playing **or paused**, `false` once it has ended.

**Returns** `boolean`.

**Example**

```lua
local channel = Sound.Play2D("ui_click", false)

Timer.Set(function()
	print(channel and channel:IsPlaying() and "still playing" or "done")
end, 2000, 1)
```

### soundChannel\:SetPaused(paused) {#soundchannelsetpausedpaused}

Pauses or resumes the channel. A paused channel keeps its place and resumes from there.

**Parameters**

| Name | Type | Description |
|---|---|---|
| paused | `boolean` | `true` to pause, `false` to resume. |

**Returns** nothing.

**Example**

```lua
local paused = false

Event.Add("OnKeyDown", function(key)
	if key == Key.P and music then
		paused = not paused
		music:SetPaused(paused)
	end
end)
```

### soundChannel\:GetPosition() {#soundchannelgetposition}

Returns the current playback position in the sound.

**Returns** `integer`, in milliseconds from the start.

**Example**

```lua
print(string.format("at %.1f s", music:GetPosition() / 1000))
```

### soundChannel\:SetPosition(ms) {#soundchannelsetpositionms}

Jumps to a playback position in the sound.

**Parameters**

| Name | Type | Description |
|---|---|---|
| ms | `integer` | Position in milliseconds from the start. |

**Returns** nothing.

**Example**

```lua
-- restart the song
music:SetPosition(0)
```

### soundChannel\:GetVolume() {#soundchannelgetvolume}

Returns the channel's volume.

**Returns** `number`: `1` is the sound's original volume, `0` silent.

**Example**

```lua
print("volume " .. music:GetVolume())
```

### soundChannel\:SetVolume(volume) {#soundchannelsetvolumevolume}

Sets the channel's volume.

**Parameters**

| Name | Type | Description |
|---|---|---|
| volume | `number` | `0` silent, `1` the sound's original volume. Values above 1 amplify (and can distort). |

**Returns** nothing.

**Example**

```lua
-- fade the music out over 2 seconds
local fade = 1

Event.Add("OnUpdate", function()
	if fade > 0 and music then
		fade = math.max(0, fade - World.GetUpdateDeltaTime() / 2)
		music:SetVolume(fade)
	end
end)
```

### soundChannel\:GetPitch() {#soundchannelgetpitch}

Returns the channel's pitch multiplier.

**Returns** `number`: `1` is the normal pitch.

**Example**

```lua
print("pitch " .. engine:GetPitch())
```

### soundChannel\:SetPitch(pitch) {#soundchannelsetpitchpitch}

Sets the channel's pitch multiplier, which also changes its playback speed: `2` plays an octave higher and twice as fast, `0.5` an octave lower and half as fast.

**Parameters**

| Name | Type | Description |
|---|---|---|
| pitch | `number` | Pitch multiplier, `1` for normal. |

**Returns** nothing.

**Example**

```lua
-- an engine loop whose pitch follows the vehicle's speed
local engine = Sound.Play3D("my_engine", vehicle:GetPosition(), true)

Event.Add("OnUpdate", function()
	local speed = vehicle:GetVelocity():length()
	engine:SetPitch(0.8 + math.min(speed / 40, 1.2))
	engine:Set3DAttributes(vehicle:GetPosition(), vehicle:GetVelocity())
end)
```

### soundChannel\:Set3DMinMaxDistance(min, max) {#soundchannelset3dminmaxdistancemin-max}

For a sound played with `Sound.Play3D`: sets the distances over which it fades. Within `min` meters of the listener it plays at full volume; it fades linearly to silence at `max` meters and stays silent beyond. `Sound.Play3D` starts with `1` and `20`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| min | `number` | Distance in meters up to which the sound is at full volume. |
| max | `number` | Distance in meters at which the sound becomes silent. |

**Returns** nothing.

**Example**

```lua
-- an alarm that can be heard across the base
local alarm = Sound.Play3D("base_alarm", vec3(-3800, 120, 2200), true)

if alarm then
	alarm:Set3DMinMaxDistance(10, 300)
end
```

### soundChannel\:Get3DMinMaxDistance() {#soundchannelget3dminmaxdistance}

Returns the two distances set with `Set3DMinMaxDistance` (by default 1 and 20 for a `Sound.Play3D` channel).

**Returns** two `number`s: `min` and `max`.

**Example**

```lua
alarm:Set3DMinMaxDistance(10, 300)

local min, max = alarm:Get3DMinMaxDistance()
print(string.format("audible from %d m, fades out by %d m", min, max))
```

### soundChannel\:Set3DAttributes(position, velocity) {#soundchannelset3dattributesposition-velocity}

For a sound played with `Sound.Play3D`: moves it to `position` and sets its velocity. The velocity is used for the Doppler effect (the pitch shift of a sound moving toward or away from the listener); pass `vec3(0, 0, 0)` for a sound that does not move. Call it every frame to make a sound follow a moving object.

**Parameters**

| Name | Type | Description |
|---|---|---|
| position | `vec3` | World position, in meters. |
| velocity | `vec3` | Velocity in meters per second. |

**Returns** nothing.

**Example**

```lua
Event.Add("OnUpdate", function()
	if siren and siren:IsPlaying() then
		siren:Set3DAttributes(police_car:GetPosition(), police_car:GetVelocity())
	end
end)
```

### soundChannel\:Get3DAttributes() {#soundchannelget3dattributes}

Returns the world position and velocity set with `Set3DAttributes` (or by `Sound.Play3D`).

**Returns** two `vec3`s: `position` and `velocity`.

**Example**

```lua
-- how far the siren is from the local player
local position = siren:Get3DAttributes()

print(string.format("siren %.0f m away", (position - World.LocalPlayer():GetPosition()):length()))
```