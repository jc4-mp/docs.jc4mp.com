---
sidebar_position: 60
---

# Client

The `Client` table describes the JC4MP client itself: its version, how long it has been running, and detailed statistics about its connection to the server. Use it for version checks, client-side timing, and network debug overlays.

**Available on:** Client

The server has its own equivalent, the [`Server`](../server/server.md) table.

## Values {#values}

### Client.Version {#clientversion}

The JC4MP client version as a string, for example `"1.4.0"`. Development builds report `"0.0.0"`.

**Example**

```lua
print("running JC4MP client " .. Client.Version)
```

## Functions {#functions}

### Client.GetElapsedSeconds() {#clientgetelapsedseconds}

Returns the number of seconds since the JC4MP client started (when the game was launched with the mod), as a fraction with sub-millisecond precision. It is a steady clock: it never jumps when the system time changes and is not affected by [`World.SetTimescale`](./world.md) or game pauses. Use it to measure intervals and drive animations.

**Returns** `number`, in seconds.

**Example**

```lua
-- run something at most once every 2 seconds from OnUpdate
local last = 0

Event.Add("OnUpdate", function()
	local now = Client.GetElapsedSeconds()

	if now - last >= 2 then
		last = now
		print("tick at " .. string.format("%.2f", now))
	end
end)
```

### Client.GetNetStats() {#clientgetnetstats}

Returns a snapshot of the network diagnostics for the connection to the server, or `nil` while the client is not connected.

The statistics are updated by the network update, so call this from `OnUpdate` (or a timer), **not** from `OnRender`, which runs on another thread.

Traffic totals are running totals; rates are measured over a 1 second window and peaks are the highest rate seen so far.

**Returns** `table` or `nil`. The table has this shape:

| Field | Type | Description |
|---|---|---|
| wire | flow | What actually went over the network: UDP datagrams, including the transport's own headers, acknowledgements, pings, resends and compression. |
| app | flow | Packets as scripts and the game sent and received them, before compression and transport headers. |
| channels | table | One flow per packet channel, in the keys `ReliableHigh`, `ReliableLow`, `Unreliable` and `Position`. |
| compression | table | Packet compression, see below. |
| peer | table | The connection to the server, see below. |
| config | table | The connection settings, see below. |

A **flow** is a table `{ sent = traffic, received = traffic }`, and a **traffic** table has:

| Field | Type | Description |
|---|---|---|
| packets | `integer` | Total packets. |
| bytes | `integer` | Total bytes. |
| packetsPerSec | `number` | Packets per second over the last second. |
| bytesPerSec | `number` | Bytes per second over the last second. |
| peakPacketsPerSec | `number` | Highest `packetsPerSec` seen. |
| peakBytesPerSec | `number` | Highest `bytesPerSec` seen. |

`compression`:

| Field | Type | Description |
|---|---|---|
| enabled | `boolean` | Whether outgoing datagrams are compressed. |
| level | `integer` | Compression level. |
| compressedPackets | `integer` | Datagrams sent compressed. |
| compressedInBytes | `integer` | Their size before compression. |
| compressedOutBytes | `integer` | Their size after compression (header included). |
| decompressedPackets | `integer` | Compressed datagrams received. |
| decompressedInBytes | `integer` | Their compressed size. |
| decompressedOutBytes | `integer` | Their size after decompression. |
| skipped | `integer` | Datagrams sent uncompressed because compressing them was not worth it. |
| failed | `integer` | Received datagrams that failed to decompress. |

`peer`:

| Field | Type | Description |
|---|---|---|
| connectedSeconds | `number` | Seconds since the connection was established. |
| rtt | `integer` | Smoothed round trip time (ping), in milliseconds. |
| rttVariance | `integer` | Variance of the round trip time, in milliseconds (jitter). |
| lastRtt | `integer` | The most recent round trip time measured, in milliseconds. |
| lowestRtt | `integer` | The lowest round trip time measured, in milliseconds. |
| mtu | `integer` | Maximum datagram size of this connection, in bytes. |
| windowSize | `integer` | The transport's send window, in bytes. |
| packetLoss | `number` | Packet loss, in percent (0..100). |
| packetLossVariance | `number` | Variance of the packet loss, in percent. |
| throttle | `number` | How much of the unreliable traffic the transport currently lets through, in percent (100 = no throttling). |
| reliableSent | `integer` | Reliable messages sent to the server. |
| reliableLost | `integer` | Reliable messages that had to be resent because they were not acknowledged in time. |
| reliableInFlightBytes | `integer` | Bytes of reliable data sent and not acknowledged yet. |
| awaitingAck | `integer` | Number of reliable messages waiting for an acknowledgement. |
| waitingBytes | `integer` | Bytes queued to be sent. |

`config`:

| Field | Type | Description |
|---|---|---|
| mtu | `integer` | Default maximum datagram size, in bytes. |
| timeout | `integer` | Seconds without an answer before the connection is considered lost. |
| pingInterval | `integer` | Milliseconds between pings. |
| packetIdBits | `integer` | Number of bits used for packet ids. |

**Example**

```lua
-- print a one-line network summary every second
local last_print = 0

Event.Add("OnUpdate", function()
	local now = Client.GetElapsedSeconds()
	if now - last_print < 1 then return end
	last_print = now

	local stats = Client.GetNetStats()
	if not stats then
		print("not connected")
		return
	end

	print(string.format("ping %d ms, loss %.1f%%, up %.1f KB/s, down %.1f KB/s",
		stats.peer.rtt,
		stats.peer.packetLoss,
		stats.wire.sent.bytesPerSec / 1024,
		stats.wire.received.bytesPerSec / 1024))
end)
```

### Client.SetNetSim(ping, jitter) {#clientsetnetsimping-jitter}

Simulates a worse connection on this client, to test how a script or game mode behaves for players far from the server. `ping` is added to the round trip time; with `jitter`, every packet received is additionally held back by a random delay from 0 to `jitter` milliseconds (packets still arrive in order). `Client.SetNetSim(0, 0)` turns the simulation off.

Only affects this client. Connect and disconnect events are never delayed.

**Not available in release builds:** the function only exists in development builds of the client, so check it before calling it.

**Parameters**

| Name | Type | Description |
|---|---|---|
| ping | `integer` | Extra round trip time, in milliseconds. `0` for none. |
| jitter | `integer` | Maximum extra random delay per received packet, in milliseconds. `0` for none. |

**Returns** nothing.

**Example**

```lua
if Client.SetNetSim then
	Cmd.Add("lag", function(ms)
		Client.SetNetSim(tonumber(ms) or 200, 50)
	end)

	Cmd.Add("nolag", function()
		Client.SetNetSim(0, 0)
	end)
end
```

### Client.GetNetSim() {#clientgetnetsim}

Returns the current simulated network conditions set with [`Client.SetNetSim`](#clientsetnetsimping-jitter).

**Not available in release builds:** like `SetNetSim`, it only exists in development builds.

**Returns** two `integer`s: the simulated ping and the jitter, in milliseconds (`0, 0` when off).

**Example**

```lua
if Client.GetNetSim then
	local ping, jitter = Client.GetNetSim()
	print(string.format("simulating +%d ms ping, %d ms jitter", ping, jitter))
end
```