# Modules

Modules are a great way to share data, functions, classes, and other functionality between scripts. Modules work on client, server, and shared scripts.

## Create a module

To create a module, all you need is a table and a return statement, like so:

```lua
-- resources/test/client/numbers.lua

local data = { theNumber = 42 }

data.addNumbers = function(a, b)
    return a + b
end

return data -- <- You MUST return a table for a script to be a module
```

## Import a module

Modules can only be imported in the following ways:
 - Client scripts can only import other client modules and shared modules
 - Server scripts can import any modules (including client modules)
 - Shared modules can only import other shared modules

Data imported from a module is read-only, meaning that if you modify the imported data, it will not reflect in other scripts that also import this module. To share and modify data across scripts during runtime, use **[Events](/docs/shared-api/events)**.

To import the module from above:

```lua
-- resources/other_script/client/main.lua

local numbers = import("resources/test/client/numbers")

print(numbers.theNumber) -- Prints 42
print(numbers.addNumbers(5, 7)) -- Prints 12
```

If a module is in the same directory as the script importing it, you can import with shorthand syntax (using the same module from above):

```lua
-- resources/test/client/main.lua

local numbers = import("numbers")
```