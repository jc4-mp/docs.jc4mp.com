---
sidebar_position: 2
---

# Server Configuration

Every server needs to have a valid configuration file.

Default config (located at `cfg/config.json`):
```json
{
    "name": "Just Cause 4 Multiplayer Server",
    "description": "A default server for Just Cause 4 Multiplayer",
    "port": 7777,
    "max_players": 100,
    "password": "",
    "announce": true,
    "key": "",
    "update_url": "https://servers.jc4mp.com/api/v1/servers",
    "startup_resources": [
        "resource1",
        "resource2",
        "resource3"
    ]
}
```


#### `name` (string)

This is the name of your server that will appear in the server list.

#### `description` (string)

This is the description of your server that will appear in the server list.

#### `port` (number)

This is the port that your server will use to allow players to connect to it. This value should be between 1 and 1024.

#### `max_players` (number)

This is the maximum players that can be connected to your server at the same time.

#### `password` (string)

This is the password for your server. If it is a valid string, then players who want to connect to your server will be required to enter the correct password before connecting. The default value is an empty string, which means that there will be no password for the server and anyone can connect.

#### `announce` (boolean)

Set this to true if you would like to announce your server to the [JC4MP server list](https://servers.jc4mp.com), allowing anyone to see it and connect to it. If this is false, your server will still run properly, but it will not appear in the server list, so players will need to direct connect with your server's IP instead.

Keep in mind that you also need to have a valid `key` and `update_url` for your server to appear on the server list - setting this to true is not enough.

#### `startup_resources` (string array)

This field is a list of resources to load when the server starts up. 

#### `key` (string)

This is your personal server key obtained from the **[JC4MP Server Dashboard](https://servers.jc4mp.com/dashboard)**. It should be in this format: `JC4MP_pBJVVEZXi3V1e3FDTC039hnc2QYAXloP`, where it begins with `JC4MP_` and has a random sequence of letters and numbers after it. This server key is used to announce your server to the [JC4MP server list](https://servers.jc4mp.com/). Only one key may be used by a single server at the same time. If you have multiple servers running at the same time that you want on the server list, you should use different server keys.

If this field is empty or the key is not valid, the server will not appear on the server list.


#### `update_url` (string)

This field describes the update URL to be used to announce the server to the [JC4MP server list](https://servers.jc4mp.com/). The default value is `https://servers.jc4mp.com/api/v1/servers` and usually should not be changed.

If this field is empty, the server will not appear the server list.
