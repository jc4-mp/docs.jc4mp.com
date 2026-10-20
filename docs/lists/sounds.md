---
sidebar_position: 97
---

# Sounds

The [`Sound`](../client/sound.md) table plays sound files that your resource ships, not the game's own sounds, so there is no built-in list of sound names: you choose the names when you load the files.

**Available on:** Client

## Usage {#usage}

### Sound.Create(name, file) {#soundcreatename-file}

Loads `file` from your resource and registers it under `name`. Returns `true` on success; `false` when `name` is empty or already taken (by any resource), the file is missing or empty, or the audio can't be decoded.

- `file` is a path relative to the folder of the script that calls `Sound.Create` (the default `sounds` resource keeps `test.wav` next to `client/client.lua`).
- The file is decoded by FMOD, the game's audio engine, so the usual formats work: WAV, MP3, OGG Vorbis and FLAC among others. The default resources use WAV.
- Names are shared by every resource on the client, so prefix them with your resource's name.

### Sound.Play2D(name, loop) and Sound.Play3D(name, position, loop) {#soundplay2dname-loop-and-soundplay3dname-position-loop}

Play a sound loaded with `Sound.Create`. `Play2D` plays it flat (music, UI sounds); `Play3D` plays it at `position`, fading out linearly from 1 m to 20 m. Both return a sound channel, or `nil` when `name` isn't loaded. See [Sound](../client/sound.md) for the channel methods (volume, pitch, position, pause).

## Values {#values}

These are the sound names the default resources register, as examples of the pattern:

| Name | File | Resource |
|---|---|---|
| `ay` | `test.wav` | sounds |
| `car_song0` | `song0.wav` | car-radio |
| `car_song1` | `song1.wav` | car-radio |

## Game sounds {#game-sounds}

The game's own sounds live in FMOD banks inside the game archives and are played by game objects (weapons, vehicles, effects), not by name. The Lua API has no function to play them directly. The closest options are:

- [effects](./effects.md): many effects have their own sound, such as explosions and fireworks.
- [explosions](./explosions.md): `World.SpawnExplosion` plays the explosion's sound for everyone.
- the character attached effects of `PlayAttachedEffect`, listed in the [character attached effect enum](../client/enums/character-attached-effect.md).

**Example**

```lua
-- client: a hit sound that plays where the local player stands (hit.wav sits next to this script)
if not Sound.Create("myrsrc_hit", "hit.wav") then
	print("hit.wav couldn't be loaded")
end

Cmd.Add("hit", function()
	local obj = World.LocalPlayer()
	if not obj then return end

	local channel = Sound.Play3D("myrsrc_hit", obj:GetPosition(), false)

	if channel then
		channel:SetVolume(0.8)
	end
end)
```