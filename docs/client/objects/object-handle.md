---
sidebar_position: 53
---

# ObjectHandle (client)

The client-only methods of every `ObjectHandle`.

**Available on:** Client

See also: [ObjectHandle](../../shared/objects/object-handle.md), [ObjectHandle (server)](../../server/objects/object-handle.md)

## Methods {#methods}

### obj\:SetData(key, value) {#objsetdatakey-value}

Stores a value in the object's data store, or removes a key when `value` is `nil`. Read it back with `GetData`.

The value must be a `string`, `number`, `boolean`, `vec2`, `vec3`, `vec4` or `quat`. Tables, functions and handles can't be stored (store a handle's `GetNetId()` instead).

The store has limits so that it always fits in the network packets that sync it:

- keys are 1 to 64 bytes long
- string values are at most 1024 bytes
- an object holds at most 128 keys
- an object's keys and values add up to at most 8 KB (a key counts its length; a value counts its length for strings, 8 bytes for numbers, 1 for booleans, 8/12/16 bytes for `vec2`/`vec3`/`vec4` and 16 for `quat`)

Replacing an existing key is always accepted as long as the new value fits.

There is no `broadcast` argument on the client: the value is only stored in this client's copy of the object and is never sent anywhere. A later value broadcast by the server for the same key replaces it. The data is lost when the object streams out.

**Parameters**

| Name | Type | Description |
|---|---|---|
| key | `string` | the key, 1 to 64 bytes |
| value | `string`, `number`, `boolean`, `vec2`, `vec3`, `vec4`, `quat` or `nil` | the value to store, `nil` removes the key |

**Returns**

| Type | Description |
|---|---|
| `boolean` | `true` if the value was stored (or the key was removed); `false` if the value has a type that can't be stored, breaks one of the limits, the key to remove wasn't set, or the object is gone |

**Example**

```lua
-- client: remember locally that this player was already greeted, the server never sees it
if not player:GetData("greeted") then
	player:SetData("greeted", true)
end
```