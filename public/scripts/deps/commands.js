(function() {
  window.Reddish || (window.Reddish = {});

  Reddish.commands = {
    "APPEND": {
      "summary": "Append a value to a key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "1.3.3",
      "group": "string"
    },
    "AUTH": {
      "summary": "Authenticate to the server",
      "arguments": [
        {
          "name": "password",
          "type": "string"
        }
      ],
      "since": "0.08",
      "group": "connection"
    },
    "BGREWRITEAOF": {
      "summary": "Asynchronously rewrite the append-only file",
      "since": "1.07",
      "group": "server"
    },
    "BGSAVE": {
      "summary": "Asynchronously save the dataset to disk",
      "since": "0.07",
      "group": "server"
    },
    "BLPOP": {
      "summary": "Remove and get the first element in a list, or block until one is available",
      "arguments": [
        {
          "name": "key",
          "type": "key",
          "multiple": true
        },
        {
          "name": "timeout",
          "type": "integer"
        }
      ],
      "since": "1.3.1",
      "group": "list"
    },
    "BRPOP": {
      "summary": "Remove and get the last element in a list, or block until one is available",
      "arguments": [
        {
          "name": "key",
          "type": "key",
          "multiple": true
        },
        {
          "name": "timeout",
          "type": "integer"
        }
      ],
      "since": "1.3.1",
      "group": "list"
    },
    "BRPOPLPUSH": {
      "summary": "Pop a value from a list, push it to another list and return it; or block until one is available",
      "arguments": [
        {
          "name": "source",
          "type": "key"
        },
        {
          "name": "destination",
          "type": "key"
        },
        {
          "name": "timeout",
          "type": "integer"
        }
      ],
      "since": "2.1.7",
      "group": "list"
    },
    "CONFIG GET": {
      "summary": "Get the value of a configuration parameter",
      "arguments": [
        {
          "name": "parameter",
          "type": "string"
        }
      ],
      "since": "2.0",
      "group": "server"
    },
    "CONFIG SET": {
      "summary": "Set a configuration parameter to the given value",
      "arguments": [
        {
          "name": "parameter",
          "type": "string"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "2.0",
      "group": "server"
    },
    "CONFIG RESETSTAT": {
      "summary": "Reset the stats returned by INFO",
      "since": "2.0",
      "group": "server"
    },
    "DBSIZE": {
      "summary": "Return the number of keys in the selected database",
      "since": "0.07",
      "group": "server"
    },
    "DEBUG OBJECT": {
      "summary": "Get debugging information about a key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.101",
      "group": "server"
    },
    "DEBUG SEGFAULT": {
      "summary": "Make the server crash",
      "since": "0.101",
      "group": "server"
    },
    "DECR": {
      "summary": "Decrement the integer value of a key by one",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "string"
    },
    "DECRBY": {
      "summary": "Decrement the integer value of a key by the given number",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "decrement",
          "type": "integer"
        }
      ],
      "since": "0.07",
      "group": "string"
    },
    "DEL": {
      "summary": "Delete a key",
      "arguments": [
        {
          "name": "key",
          "type": "key",
          "multiple": true
        }
      ],
      "since": "0.07",
      "group": "generic"
    },
    "DISCARD": {
      "summary": "Discard all commands issued after MULTI",
      "since": "1.3.3",
      "group": "transactions"
    },
    "ECHO": {
      "summary": "Echo the given string",
      "arguments": [
        {
          "name": "message",
          "type": "string"
        }
      ],
      "since": "0.07",
      "group": "connection"
    },
    "EXEC": {
      "summary": "Execute all commands issued after MULTI",
      "since": "1.1.95",
      "group": "transactions"
    },
    "EXISTS": {
      "summary": "Determine if a key exists",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "generic"
    },
    "EXPIRE": {
      "summary": "Set a key's time to live in seconds",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "seconds",
          "type": "integer"
        }
      ],
      "since": "0.09",
      "group": "generic"
    },
    "EXPIREAT": {
      "summary": "Set the expiration for a key as a UNIX timestamp",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "timestamp",
          "type": "posix time"
        }
      ],
      "since": "1.1",
      "group": "generic"
    },
    "FLUSHALL": {
      "summary": "Remove all keys from all databases",
      "since": "0.07",
      "group": "server"
    },
    "FLUSHDB": {
      "summary": "Remove all keys from the current database",
      "since": "0.07",
      "group": "server"
    },
    "GET": {
      "summary": "Get the value of a key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "string"
    },
    "GETBIT": {
      "summary": "Returns the bit value at offset in the string value stored at key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "offset",
          "type": "integer"
        }
      ],
      "since": "2.1.8",
      "group": "string"
    },
    "GETRANGE": {
      "summary": "Get a substring of the string stored at a key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "start",
          "type": "integer"
        },
        {
          "name": "end",
          "type": "integer"
        }
      ],
      "since": "1.3.4",
      "group": "string"
    },
    "GETSET": {
      "summary": "Set the string value of a key and return its old value",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "0.091",
      "group": "string"
    },
    "HDEL": {
      "summary": "Delete one or more hash fields",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "field",
          "type": "string",
          "multiple": true
        }
      ],
      "since": "1.3.10",
      "group": "hash"
    },
    "HEXISTS": {
      "summary": "Determine if a hash field exists",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "field",
          "type": "string"
        }
      ],
      "since": "1.3.10",
      "group": "hash"
    },
    "HGET": {
      "summary": "Get the value of a hash field",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "field",
          "type": "string"
        }
      ],
      "since": "1.3.10",
      "group": "hash"
    },
    "HGETALL": {
      "summary": "Get all the fields and values in a hash",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "1.3.10",
      "group": "hash"
    },
    "HINCRBY": {
      "summary": "Increment the integer value of a hash field by the given number",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "field",
          "type": "string"
        },
        {
          "name": "increment",
          "type": "integer"
        }
      ],
      "since": "1.3.10",
      "group": "hash"
    },
    "HKEYS": {
      "summary": "Get all the fields in a hash",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "1.3.10",
      "group": "hash"
    },
    "HLEN": {
      "summary": "Get the number of fields in a hash",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "1.3.10",
      "group": "hash"
    },
    "HMGET": {
      "summary": "Get the values of all the given hash fields",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "field",
          "type": "string",
          "multiple": true
        }
      ],
      "since": "1.3.10",
      "group": "hash"
    },
    "HMSET": {
      "summary": "Set multiple hash fields to multiple values",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": ["field", "value"],
          "type": ["string", "string"],
          "multiple": true
        }
      ],
      "since": "1.3.8",
      "group": "hash"
    },
    "HSET": {
      "summary": "Set the string value of a hash field",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "field",
          "type": "string"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "1.3.10",
      "group": "hash"
    },
    "HSETNX": {
      "summary": "Set the value of a hash field, only if the field does not exist",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "field",
          "type": "string"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "1.3.8",
      "group": "hash"
    },
    "HVALS": {
      "summary": "Get all the values in a hash",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "1.3.10",
      "group": "hash"
    },
    "INCR": {
      "summary": "Increment the integer value of a key by one",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "string"
    },
    "INCRBY": {
      "summary": "Increment the integer value of a key by the given number",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "increment",
          "type": "integer"
        }
      ],
      "since": "0.07",
      "group": "string"
    },
    "INFO": {
      "summary": "Get information and statistics about the server",
      "since": "0.07",
      "group": "server"
    },
    "KEYS": {
      "summary": "Find all keys matching the given pattern",
      "arguments": [
        {
          "name": "pattern",
          "type": "pattern"
        }
      ],
      "since": "0.07",
      "group": "generic"
    },
    "LASTSAVE": {
      "summary": "Get the UNIX time stamp of the last successful save to disk",
      "since": "0.07",
      "group": "server"
    },
    "LINDEX": {
      "summary": "Get an element from a list by its index",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "index",
          "type": "integer"
        }
      ],
      "since": "0.07",
      "group": "list"
    },
    "LINSERT": {
      "summary": "Insert an element before or after another element in a list",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "where",
          "type": "enum",
          "enum": ["BEFORE", "AFTER"]
        },
        {
          "name": "pivot",
          "type": "string"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "2.1.1",
      "group": "list"
    },
    "LLEN": {
      "summary": "Get the length of a list",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "list"
    },
    "LPOP": {
      "summary": "Remove and get the first element in a list",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "list"
    },
    "LPUSH": {
      "summary": "Prepend one or multiple values to a list",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "value",
          "type": "string",
          "multiple": true
        }
      ],
      "since": "0.07",
      "group": "list"
    },
    "LPUSHX": {
      "summary": "Prepend a value to a list, only if the list exists",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "2.1.1",
      "group": "list"
    },
    "LRANGE": {
      "summary": "Get a range of elements from a list",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "start",
          "type": "integer"
        },
        {
          "name": "stop",
          "type": "integer"
        }
      ],
      "since": "0.07",
      "group": "list"
    },
    "LREM": {
      "summary": "Remove elements from a list",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "count",
          "type": "integer"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "0.07",
      "group": "list"
    },
    "LSET": {
      "summary": "Set the value of an element in a list by its index",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "index",
          "type": "integer"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "0.07",
      "group": "list"
    },
    "LTRIM": {
      "summary": "Trim a list to the specified range",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "start",
          "type": "integer"
        },
        {
          "name": "stop",
          "type": "integer"
        }
      ],
      "since": "0.07",
      "group": "list"
    },
    "MGET": {
      "summary": "Get the values of all the given keys",
      "arguments": [
        {
          "name": "key",
          "type": "key",
          "multiple": true
        }
      ],
      "since": "0.07",
      "group": "string"
    },
    "MONITOR": {
      "summary": "Listen for all requests received by the server in real time",
      "since": "0.07",
      "group": "server"
    },
    "MOVE": {
      "summary": "Move a key to another database",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "db",
          "type": "integer"
        }
      ],
      "since": "0.07",
      "group": "generic"
    },
    "MSET": {
      "summary": "Set multiple keys to multiple values",
      "arguments": [
        {
          "name": ["key", "value"],
          "type": ["key", "string"],
          "multiple": true
        }
      ],
      "since": "1.001",
      "group": "string"
    },
    "MSETNX": {
      "summary": "Set multiple keys to multiple values, only if none of the keys exist",
      "arguments": [
        {
          "name": ["key", "value"],
          "type": ["key", "string"],
          "multiple": true
        }
      ],
      "since": "1.001",
      "group": "string"
    },
    "MULTI": {
      "summary": "Mark the start of a transaction block",
      "since": "1.1.95",
      "group": "transactions"
    },
    "OBJECT": {
      "summary": "Inspect the internals of Redis objects",
      "since": "2.2.3",
      "group": "generic",
      "arguments": [
        {
          "name": "subcommand",
          "type": "string"
        },
        {
          "name": "arguments",
          "type": "string",
          "optional": true,
          "multiple": true
        }
      ]
    },
    "PERSIST": {
      "summary": "Remove the expiration from a key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "2.1.2",
      "group": "generic"
    },
    "PING": {
      "summary": "Ping the server",
      "since": "0.07",
      "group": "connection"
    },
    "PSUBSCRIBE": {
      "summary": "Listen for messages published to channels matching the given patterns",
      "arguments": [
        {
          "name": ["pattern"],
          "type": ["pattern"],
          "multiple": true
        }
      ],
      "since": "1.3.8",
      "group": "pubsub"
    },
    "PUBLISH": {
      "summary": "Post a message to a channel",
      "arguments": [
        {
          "name": "channel",
          "type": "string"
        },
        {
          "name": "message",
          "type": "string"
        }
      ],
      "since": "1.3.8",
      "group": "pubsub"
    },
    "PUNSUBSCRIBE": {
      "summary": "Stop listening for messages posted to channels matching the given patterns",
      "arguments": [
        {
          "name": "pattern",
          "type": "pattern",
          "optional": true,
          "multiple": true
        }
      ],
      "since": "1.3.8",
      "group": "pubsub"
    },
    "QUIT": {
      "summary": "Close the connection",
      "since": "0.07",
      "group": "connection"
    },
    "RANDOMKEY": {
      "summary": "Return a random key from the keyspace",
      "since": "0.07",
      "group": "generic"
    },
    "RENAME": {
      "summary": "Rename a key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "newkey",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "generic"
    },
    "RENAMENX": {
      "summary": "Rename a key, only if the new key does not exist",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "newkey",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "generic"
    },
    "RPOP": {
      "summary": "Remove and get the last element in a list",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "list"
    },
    "RPOPLPUSH": {
      "summary": "Remove the last element in a list, append it to another list and return it",
      "arguments": [
        {
          "name": "source",
          "type": "key"
        },
        {
          "name": "destination",
          "type": "key"
        }
      ],
      "since": "1.1",
      "group": "list"
    },
    "RPUSH": {
      "summary": "Append one or multiple values to a list",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "value",
          "type": "string",
          "multiple": true
        }
      ],
      "since": "0.07",
      "group": "list"
    },
    "RPUSHX": {
      "summary": "Append a value to a list, only if the list exists",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "2.1.1",
      "group": "list"
    },
    "SADD": {
      "summary": "Add one or more members to a set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "member",
          "type": "string",
          "multiple": true
        }
      ],
      "since": "0.07",
      "group": "set"
    },
    "SAVE": {
      "summary": "Synchronously save the dataset to disk",
      "since": "0.07",
      "group": "server"
    },
    "SCARD": {
      "summary": "Get the number of members in a set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "set"
    },
    "SDIFF": {
      "summary": "Subtract multiple sets",
      "arguments": [
        {
          "name": "key",
          "type": "key",
          "multiple": true
        }
      ],
      "since": "0.100",
      "group": "set"
    },
    "SDIFFSTORE": {
      "summary": "Subtract multiple sets and store the resulting set in a key",
      "arguments": [
        {
          "name": "destination",
          "type": "key"
        },
        {
          "name": "key",
          "type": "key",
          "multiple": true
        }
      ],
      "since": "0.100",
      "group": "set"
    },
    "SELECT": {
      "summary": "Change the selected database for the current connection",
      "arguments": [
        {
          "name": "index",
          "type": "integer"
        }
      ],
      "since": "0.07",
      "group": "connection"
    },
    "SET": {
      "summary": "Set the string value of a key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "0.07",
      "group": "string"
    },
    "SETBIT": {
      "summary": "Sets or clears the bit at offset in the string value stored at key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "offset",
          "type": "integer"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "2.1.8",
      "group": "string"
    },
    "SETEX": {
      "summary": "Set the value and expiration of a key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "seconds",
          "type": "integer"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "1.3.10",
      "group": "string"
    },
    "SETNX": {
      "summary": "Set the value of a key, only if the key does not exist",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "0.07",
      "group": "string"
    },
    "SETRANGE": {
      "summary": "Overwrite part of a string at key starting at the specified offset",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "offset",
          "type": "integer"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "since": "2.1.8",
      "group": "string"
    },
    "SHUTDOWN": {
      "summary": "Synchronously save the dataset to disk and then shut down the server",
      "since": "0.07",
      "group": "server"
    },
    "SINTER": {
      "summary": "Intersect multiple sets",
      "arguments": [
        {
          "name": "key",
          "type": "key",
          "multiple": true
        }
      ],
      "since": "0.07",
      "group": "set"
    },
    "SINTERSTORE": {
      "summary": "Intersect multiple sets and store the resulting set in a key",
      "arguments": [
        {
          "name": "destination",
          "type": "key"
        },
        {
          "name": "key",
          "type": "key",
          "multiple": true
        }
      ],
      "since": "0.07",
      "group": "set"
    },
    "SISMEMBER": {
      "summary": "Determine if a given value is a member of a set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "member",
          "type": "string"
        }
      ],
      "since": "0.07",
      "group": "set"
    },
    "SLAVEOF": {
      "summary": "Make the server a slave of another instance, or promote it as master",
      "arguments": [
        {
          "name": "host",
          "type": "string"
        },
        {
          "name": "port",
          "type": "string"
        }
      ],
      "since": "0.100",
      "group": "server"
    },
    "SLOWLOG": {
      "summary": "Manages the Redis slow queries log",
      "arguments": [
        {
          "name": "subcommand",
          "type": "string"
        },
        {
          "name": "argument",
          "type": "string",
          "optional": true
        }
      ],
      "since": "2.2.12",
      "group": "server"
    },
    "SMEMBERS": {
      "summary": "Get all the members in a set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "set"
    },
    "SMOVE": {
      "summary": "Move a member from one set to another",
      "arguments": [
        {
          "name": "source",
          "type": "key"
        },
        {
          "name": "destination",
          "type": "key"
        },
        {
          "name": "member",
          "type": "string"
        }
      ],
      "since": "0.091",
      "group": "set"
    },
    "SORT": {
      "summary": "Sort the elements in a list, set or sorted set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "command": "BY",
          "name": "pattern",
          "type": "pattern",
          "optional": true
        },
        {
          "command": "LIMIT",
          "name": ["offset", "count"],
          "type": ["integer", "integer"],
          "optional": true
        },
        {
          "command": "GET",
          "name": "pattern",
          "type": "string",
          "optional": true,
          "multiple": true
        },
        {
          "name": "order",
          "type": "enum",
          "enum": ["ASC", "DESC"],
          "optional": true
        },
        {
          "name": "sorting",
          "type": "enum",
          "enum": ["ALPHA"],
          "optional": true
        },
        {
          "command": "STORE",
          "name": "destination",
          "type": "key",
          "optional": true
        }
      ],
      "since": "0.07",
      "group": "generic"
    },
    "SPOP": {
      "summary": "Remove and return a random member from a set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.101",
      "group": "set"
    },
    "SRANDMEMBER": {
      "summary": "Get a random member from a set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "1.001",
      "group": "set"
    },
    "SREM": {
      "summary": "Remove one or more members from a set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "member",
          "type": "string",
          "multiple": true
        }
      ],
      "since": "0.07",
      "group": "set"
    },
    "STRLEN": {
      "summary": "Get the length of the value stored in a key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "2.1.2",
      "group": "string"
    },
    "SUBSCRIBE": {
      "summary": "Listen for messages published to the given channels",
      "arguments": [
        {
          "name": ["channel"],
          "type": ["string"],
          "multiple": true
        }
      ],
      "since": "1.3.8",
      "group": "pubsub"
    },
    "SUNION": {
      "summary": "Add multiple sets",
      "arguments": [
        {
          "name": "key",
          "type": "key",
          "multiple": true
        }
      ],
      "since": "0.091",
      "group": "set"
    },
    "SUNIONSTORE": {
      "summary": "Add multiple sets and store the resulting set in a key",
      "arguments": [
        {
          "name": "destination",
          "type": "key"
        },
        {
          "name": "key",
          "type": "key",
          "multiple": true
        }
      ],
      "since": "0.091",
      "group": "set"
    },
    "SYNC": {
      "summary": "Internal command used for replication",
      "since": "0.07",
      "group": "server"
    },
    "TTL": {
      "summary": "Get the time to live for a key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.100",
      "group": "generic"
    },
    "TYPE": {
      "summary": "Determine the type stored at key",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "0.07",
      "group": "generic"
    },
    "UNSUBSCRIBE": {
      "summary": "Stop listening for messages posted to the given channels",
      "arguments": [
        {
          "name": "channel",
          "type": "string",
          "optional": true,
          "multiple": true
        }
      ],
      "since": "1.3.8",
      "group": "pubsub"
    },
    "UNWATCH": {
      "summary": "Forget about all watched keys",
      "since": "2.1.0",
      "group": "transactions"
    },
    "WATCH": {
      "summary": "Watch the given keys to determine execution of the MULTI/EXEC block",
      "arguments": [
        {
          "name": "key",
          "type": "key",
          "multiple": true
        }
      ],
      "since": "2.1.0",
      "group": "transactions"
    },
    "ZADD": {
      "summary": "Add one or more members to a sorted set, or update its score if it already exists",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "score",
          "type": "double"
        },
        {
          "name": "member",
          "type": "string"
        },
        {
          "name": "score",
          "type": "double",
          "optional": true
        },
        {
          "name": "member",
          "type": "string",
          "optional": true
        }
      ],
      "since": "1.1",
      "group": "sorted_set"
    },
    "ZCARD": {
      "summary": "Get the number of members in a sorted set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        }
      ],
      "since": "1.1",
      "group": "sorted_set"
    },
    "ZCOUNT": {
      "summary": "Count the members in a sorted set with scores within the given values",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "min",
          "type": "double"
        },
        {
          "name": "max",
          "type": "double"
        }
      ],
      "since": "1.3.3",
      "group": "sorted_set"
    },
    "ZINCRBY": {
      "summary": "Increment the score of a member in a sorted set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "increment",
          "type": "integer"
        },
        {
          "name": "member",
          "type": "string"
        }
      ],
      "since": "1.1",
      "group": "sorted_set"
    },
    "ZINTERSTORE": {
      "summary": "Intersect multiple sorted sets and store the resulting sorted set in a new key",
      "arguments": [
        {
          "name": "destination",
          "type": "key"
        },
        {
          "name": "numkeys",
          "type": "integer"
        },
        {
          "name": "key",
          "type": "key",
          "multiple": true
        },
        {
          "command": "WEIGHTS",
          "name": "weight",
          "type": "integer",
          "variadic": true,
          "optional": true
        },
        {
          "command": "AGGREGATE",
          "name": "aggregate",
          "type": "enum",
          "enum": ["SUM", "MIN", "MAX"],
          "optional": true
        }
      ],
      "since": "1.3.10",
      "group": "sorted_set"
    },
    "ZRANGE": {
      "summary": "Return a range of members in a sorted set, by index",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "start",
          "type": "integer"
        },
        {
          "name": "stop",
          "type": "integer"
        },
        {
          "name": "withscores",
          "type": "enum",
          "enum": ["WITHSCORES"],
          "optional": true
        }
      ],
      "since": "1.1",
      "group": "sorted_set"
    },
    "ZRANGEBYSCORE": {
      "summary": "Return a range of members in a sorted set, by score",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "min",
          "type": "double"
        },
        {
          "name": "max",
          "type": "double"
        },
        {
          "name": "withscores",
          "type": "enum",
          "enum": ["WITHSCORES"],
          "optional": true
        },
        {
          "command": "LIMIT",
          "name": ["offset", "count"],
          "type": ["integer", "integer"],
          "optional": true
        }
      ],
      "since": "1.050",
      "group": "sorted_set"
    },
    "ZRANK": {
      "summary": "Determine the index of a member in a sorted set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "member",
          "type": "string"
        }
      ],
      "since": "1.3.4",
      "group": "sorted_set"
    },
    "ZREM": {
      "summary": "Remove one or more members from a sorted set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "member",
          "type": "string",
          "multiple": true
        }
      ],
      "since": "1.1",
      "group": "sorted_set"
    },
    "ZREMRANGEBYRANK": {
      "summary": "Remove all members in a sorted set within the given indexes",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "start",
          "type": "integer"
        },
        {
          "name": "stop",
          "type": "integer"
        }
      ],
      "since": "1.3.4",
      "group": "sorted_set"
    },
    "ZREMRANGEBYSCORE": {
      "summary": "Remove all members in a sorted set within the given scores",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "min",
          "type": "double"
        },
        {
          "name": "max",
          "type": "double"
        }
      ],
      "since": "1.1",
      "group": "sorted_set"
    },
    "ZREVRANGE": {
      "summary": "Return a range of members in a sorted set, by index, with scores ordered from high to low",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "start",
          "type": "integer"
        },
        {
          "name": "stop",
          "type": "integer"
        },
        {
          "name": "withscores",
          "type": "enum",
          "enum": ["WITHSCORES"],
          "optional": true
        }
      ],
      "since": "1.1",
      "group": "sorted_set"
    },
    "ZREVRANGEBYSCORE": {
      "summary": "Return a range of members in a sorted set, by score, with scores ordered from high to low",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "max",
          "type": "double"
        },
        {
          "name": "min",
          "type": "double"
        },
        {
          "name": "withscores",
          "type": "enum",
          "enum": ["WITHSCORES"],
          "optional": true
        },
        {
          "command": "LIMIT",
          "name": ["offset", "count"],
          "type": ["integer", "integer"],
          "optional": true
        }
      ],
      "since": "2.1.6",
      "group": "sorted_set"
    },
    "ZREVRANK": {
      "summary": "Determine the index of a member in a sorted set, with scores ordered from high to low",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "member",
          "type": "string"
        }
      ],
      "since": "1.3.4",
      "group": "sorted_set"
    },
    "ZSCORE": {
      "summary": "Get the score associated with the given member in a sorted set",
      "arguments": [
        {
          "name": "key",
          "type": "key"
        },
        {
          "name": "member",
          "type": "string"
        }
      ],
      "since": "1.1",
      "group": "sorted_set"
    },
    "ZUNIONSTORE": {
      "summary": "Add multiple sorted sets and store the resulting sorted set in a new key",
      "arguments": [
        {
          "name": "destination",
          "type": "key"
        },
        {
          "name": "numkeys",
          "type": "integer"
        },
        {
          "name": "key",
          "type": "key",
          "multiple": true
        },
        {
          "command": "WEIGHTS",
          "name": "weight",
          "type": "integer",
          "variadic": true,
          "optional": true
        },
        {
          "command": "AGGREGATE",
          "name": "aggregate",
          "type": "enum",
          "enum": ["SUM", "MIN", "MAX"],
          "optional": true
        }
      ],
      "since": "1.3.10",
      "group": "sorted_set"
    },
    "EVAL": {
      "summary": "Execute a Lua script server side",
      "arguments": [
        {
          "name": "script",
          "type": "string"
        },
        {
          "name": "numkeys",
          "type": "integer"
        },
        {
          "name": "key",
          "type": "key",
          "multiple": true
        },
        {
          "name": "arg",
          "type": "string",
          "multiple": true
        }
      ],
      "since": "2.6.0",
      "group": "generic"
    }
  }
}).call(this);
