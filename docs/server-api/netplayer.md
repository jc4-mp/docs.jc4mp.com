# NetPlayer

This is the server-side class for [NetPlayer](/shared-api/netplayer). It has all the same methods and properties as the shared class, plus the following on this page.


## Player Class Hierarchy

The diagram shows the inheritance hierarchy of player-related classes. To navigate between classes:
- Get a `PlayerClient`
- Get the `NetPlayer` from a `PlayerClient` using `:GetNetPlayer()`


```mermaid
flowchart LR
  PlayerClient --> NetPlayer
  click PlayerClient href "/server-api/playerclient" "PlayerClient"
  click NetPlayer href "/server-api/netplayer" "NetPlayer"
```

## Class Instance Methods

#### `NetPlayer:GiveWeapon(string name, int ammo, bool equip, WeaponSlot slot)`

Gives a weapon to the player with specified ammo count and optional equipping. View the full list of [weapons here](/reference/weapons-list).

#### `NetPlayer:RemoveWeapon(WeaponSlot slot)`

Removes a weapon from the specified [weapon slot](/shared-api/weaponslot).

