---
sidebar_position: 40
---

# Server console

These commands are typed in the server's console window. They are listed here for server owners; scripts can't add or call them (scripts use [Resources (server)](./resources.md) and the player functions instead).

**Available on:** Server

See also: [Commands](../client/commands.md)

## Commands {#commands}

| Command | What it does |
|---|---|
| `start <name>`, `load <name>` | starts a resource |
| `stop <name>`, `unload <name>` | stops a resource |
| `restart <name>`, `reload <name>` | stops and starts a resource again, picking up changed files; clients download the changes and restart it too |
| `list`, `ls` | lists every resource and its status (running, stopped, starting) |
| `kick <steam_id> [reason]` | kicks the player with that Steam ID; the reason is the rest of the line |
| `ban <steam_id>` | adds the Steam ID to the ban list and kicks the player if connected |
| `unban <steam_id>` | removes the Steam ID from the ban list |
| `stop`, `exit`, `x` | shuts the server down (`stop` without a resource name) |
| `help`, `h`, `?` | shows this list |

Command names are not case-sensitive.