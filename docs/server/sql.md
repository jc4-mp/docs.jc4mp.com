---
sidebar_position: 37
---

# SQL

The `SQL` table gives server scripts a SQLite database for anything that must survive a restart: accounts, bans, money, saved vehicles, statistics.

**Available on:** Server

## The database {#the-database}

- There is one database for the whole server, the file `database.db` in the server's folder (its working directory). Every resource uses the same database, so prefix your table names with your resource name (`race_times`, `shop_items`) to avoid clashes.
- The file is created the first time a script uses `SQL`; a server whose scripts never use it gets no database file.
- It is a normal SQLite 3 database. You can open it with any SQLite tool, but a tool holding a write lock makes script statements wait up to 5 seconds and then fail with `database is locked`.
- Foreign key constraints are enforced.
- **Calls are synchronous**: the server waits for each statement. Simple statements on indexed tables take microseconds, but avoid huge queries in frequently called code.
- Every failing call logs `[<resource>] SQL error: <message> (<statement>)` in the server console, in addition to returning the error.

## Binding values {#binding-values}

Never build SQL text by concatenating values (especially values a player sent): pass them as parameters. A statement uses `?` (or `?1`, `?2`...) for positional parameters, and `:name`, `@name` or `$name` for named ones.

Values are passed after the statement, one argument per `?`:

```lua
SQL.Query("SELECT * FROM accounts WHERE steam_id = ? AND banned = ?", steam_id, false)
```

Or as one table: its array part fills positional parameters and its string keys fill named parameters (the key is the name without the `:`, `@` or `$`):

```lua
SQL.Query("SELECT * FROM accounts WHERE steam_id = :id AND level >= :level", { id = steam_id, level = 5 })
```

Every parameter in the statement needs a value: a missing one is an error, not an implicit `NULL`.

| Lua value | Stored as |
|---|---|
| `nil` (as a separate argument), [SQL.Null](#sqlnull) | `NULL`. Inside a parameter table `nil` can't be stored, use `SQL.Null` there |
| `boolean` | `INTEGER` 1 or 0 (it reads back as a number, not a boolean) |
| whole number | `INTEGER` |
| other number | `REAL` |
| `string` | `TEXT` |
| [SQL.Blob(data)](#sqlblobdata) | `BLOB` |

Any other type (tables, vectors, handles) is an error. Store tables with [JSON.Stringify](../shared/json.md) and vectors as separate columns.

## Reading values {#reading-values}

| SQLite value | Lua value |
|---|---|
| `NULL` | `nil` |
| `INTEGER`, `REAL` | number. Integers bigger than 2^53 (in magnitude) are returned as strings so no digit is lost (e.g. 64-bit IDs) |
| `TEXT`, `BLOB` | string |

A row is a table of column name to value. Columns that are `NULL` are absent from the row table. When two columns have the same name (`SELECT a.id, b.id ...`) the first one is kept: give them aliases (`SELECT a.id AS a_id, b.id AS b_id`).

## Values {#values}

### SQL.Null {#sqlnull}

A value that binds `NULL`. Use it where `nil` can't be used, inside a parameter table. `tostring(SQL.Null)` is `"SQL.Null"`.

**Example**

```lua
SQL.Execute("UPDATE accounts SET clan = :clan WHERE steam_id = :id", { clan = SQL.Null, id = steam_id })
```

## Functions {#functions}

### SQL.Blob(data) {#sqlblobdata}

Wraps a string so it is bound as a `BLOB` instead of `TEXT`. Blobs read back as plain strings. `#blob` gives the size in bytes and `tostring(blob)` gives `SQL.Blob(<n> bytes)`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| data | string | the bytes to store |

**Returns** a blob value, only useful as an SQL parameter.

**Example**

```lua
local data = string.char(0, 1, 2, 255)

SQL.Execute("INSERT INTO files (name, data) VALUES (?, ?)", "small.bin", SQL.Blob(data))

local stored = SQL.QueryValue("SELECT data FROM files WHERE name = ?", "small.bin")

print(#stored == 4) -- true
```

### SQL.Execute(statement, ...) {#sqlexecutestatement-}

Runs one statement that changes the database (`CREATE`, `INSERT`, `UPDATE`, `DELETE`...). Rows a statement returns (a `SELECT`, or a `RETURNING` clause) are ignored; use the `Query` functions to read them.

`statement` must hold a **single** statement: two statements separated by `;` are an error. Use [SQL.ExecuteScript](#sqlexecutescriptsql) for several.

**Parameters**

| Name | Type | Description |
|---|---|---|
| statement | string | the SQL statement |
| ... | any | optional, the parameter values (see [Binding values](#binding-values)) |

**Returns** on success a table:

| Field | Type | Description |
|---|---|---|
| changes | number | the rows inserted, updated or deleted by the statement (not counting triggers). `0` for other statements |
| last_insert_id | number or nil | the rowid of the last row the statement inserted, `nil` when it inserted none |

On failure: `nil` and the error message.

**Example**

```lua
local ok, err = SQL.Execute([[
	CREATE TABLE IF NOT EXISTS bank_accounts (
		steam_id TEXT PRIMARY KEY,
		balance INTEGER NOT NULL DEFAULT 0
	)
]])

if not ok then
	print("could not create the table: " .. err)
end

local result = SQL.Execute("INSERT OR IGNORE INTO bank_accounts (steam_id) VALUES (?)", "76561198000000000")

if result and result.changes > 0 then
	print("new account")
end
```

### SQL.ExecuteScript(sql) {#sqlexecutescriptsql}

Runs several statements separated by `;`, in order. It stops at the first statement that fails; the statements before it stay applied (wrap it in [SQL.Transaction](#sqltransactionfn) to make it all-or-nothing). The statements can't take parameters.

**Parameters**

| Name | Type | Description |
|---|---|---|
| sql | string | the statements |

**Returns** `true`, or `nil` and the error message.

**Example**

```lua
local ok, err = SQL.ExecuteScript([[
	CREATE TABLE IF NOT EXISTS race_tracks (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);
	CREATE TABLE IF NOT EXISTS race_times (
		track_id INTEGER NOT NULL REFERENCES race_tracks(id) ON DELETE CASCADE,
		steam_id TEXT NOT NULL,
		time_ms INTEGER NOT NULL
	);
	CREATE INDEX IF NOT EXISTS race_times_track ON race_times (track_id, time_ms);
]])

if not ok then
	print("race tables: " .. err)
end
```

### SQL.Query(statement, ...) {#sqlquerystatement-}

Runs a statement and returns every row it produces. An error while reading, even after some rows, fails the whole query.

**Parameters**

| Name | Type | Description |
|---|---|---|
| statement | string | the SQL statement, usually a `SELECT` |
| ... | any | optional, the parameter values |

**Returns** an array of row tables (empty when there are no rows), or `nil` and the error message.

**Example**

```lua
local rows, err = SQL.Query("SELECT steam_id, time_ms FROM race_times WHERE track_id = ? ORDER BY time_ms LIMIT 10", 1)

if not rows then
	print("leaderboard failed: " .. err)
	return
end

for i, row in ipairs(rows) do
	print(i, row.steam_id, row.time_ms / 1000 .. " s")
end
```

### SQL.QueryRow(statement, ...) {#sqlqueryrowstatement-}

Runs a statement and returns only its first row. The other rows aren't read.

**Parameters**

| Name | Type | Description |
|---|---|---|
| statement | string | the SQL statement |
| ... | any | optional, the parameter values |

**Returns** the first row as a table, `nil` when there is no row, or `nil` and the error message. Check the second value to tell "no row" from an error.

**Example**

```lua
local row, err = SQL.QueryRow("SELECT balance FROM bank_accounts WHERE steam_id = ?", client:GetUserId())

if err then
	print("bank error: " .. err)
elseif not row then
	print("no account yet")
else
	print("balance: " .. row.balance)
end
```

### SQL.QueryValue(statement, ...) {#sqlqueryvaluestatement-}

Runs a statement and returns the first column of its first row, the simplest way to read a count or a single field.

**Parameters**

| Name | Type | Description |
|---|---|---|
| statement | string | the SQL statement |
| ... | any | optional, the parameter values |

**Returns** the value (`number`, `string`), `nil` when there is no row or the value is `NULL`, or `nil` and the error message.

**Example**

```lua
local count = SQL.QueryValue("SELECT COUNT(*) FROM bank_accounts") or 0

print(count .. " accounts")

local balance = SQL.QueryValue("SELECT balance FROM bank_accounts WHERE steam_id = ?", "76561198000000000") or 0
```

### SQL.Transaction(fn) {#sqltransactionfn}

Calls `fn` inside a transaction: every statement `fn` runs is applied together, or not at all.

- If `fn` returns normally, the transaction is committed.
- If `fn` returns `false`, it is rolled back without logging anything.
- If `fn` raises an error, it is rolled back and the error is logged.
- A failing `SQL.Execute` inside `fn` does **not** roll back by itself, because it only returns `nil, err`. Check the results and `return false` or `error(...)` to cancel.

Transactions can be nested (an inner `SQL.Transaction` only rolls back its own part). `fn` receives no arguments.

**Parameters**

| Name | Type | Description |
|---|---|---|
| fn | function | the work to do in the transaction |

**Returns** `true` when committed, otherwise `false` and the reason (the error message, or `"the transaction was rolled back"` when `fn` returned `false`).

**Example**

```lua
-- move money between two accounts, all or nothing
local function transfer(from_id, to_id, amount)
	return SQL.Transaction(function()
		local balance = SQL.QueryValue("SELECT balance FROM bank_accounts WHERE steam_id = ?", from_id)

		if not balance or balance < amount then
			return false
		end

		assert(SQL.Execute("UPDATE bank_accounts SET balance = balance - ? WHERE steam_id = ?", amount, from_id))
		assert(SQL.Execute("UPDATE bank_accounts SET balance = balance + ? WHERE steam_id = ?", amount, to_id))
	end)
end

local ok, err = transfer("76561198000000001", "76561198000000002", 500)

print(ok and "transferred" or ("transfer cancelled: " .. err))
```

### SQL.TableExists(name) {#sqltableexistsname}

Tells whether a table exists in the database (temporary tables included).

**Parameters**

| Name | Type | Description |
|---|---|---|
| name | string | the table name |

**Returns** `boolean`. `false` (with an error in the console) when the database can't be opened.

**Example**

```lua
if not SQL.TableExists("bank_accounts") then
	print("first start: creating the bank tables")

	SQL.ExecuteScript([[
		CREATE TABLE bank_accounts (steam_id TEXT PRIMARY KEY, balance INTEGER NOT NULL DEFAULT 0);
		CREATE TABLE bank_log (steam_id TEXT, change INTEGER, at INTEGER);
	]])
end
```