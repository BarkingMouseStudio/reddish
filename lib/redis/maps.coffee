# Given a command, what type of reply can be expected

exports.reply_types =
  APPEND: 'integer'
  AUTH: 'status'
  BGREWRITEAOF: 'status'
  BGSAVE: 'status'
  BLPOP: null
  BRPOP: null
  BRPOPLPUSH: null
  'CONFIG GET': null
  'CONFIG SET': null
  'CONFIG RESETSTAT': null
  DBSIZE: 'integer'
  DECR: 'integer'
  DECRBY: 'integer'
  DEL: 'integer'
  DISCARD: 'status'
  ECHO: 'status'
  EXEC: 'status'
  EXISTS: 'integer'
  EXPIRE: 'integer'
  EXPIREAT: 'integer'
  FLUSHALL: 'status'
  FLUSHDB: 'status'
  GET: 'string'
  GETBIT: 'integer'
  GETRANGE: 'string'
  GETSET: 'string'
  HDEL: 'integer'
  HEXISTS: 'integer'
  HGET: 'string'
  HGETALL: 'hash'
  HINCRBY: 'integer'
  HKEYS: 'list'
  HLEN: 'integer'
  HMGET: 'list'
  HMSET: 'status'
  HSET: 'integer'
  HSETNX: 'integer'
  HVALS: 'list'
  INCR: 'integer'
  INCRBY: 'integer'
  INFO: 'string'
  KEYS: 'key'
  LASTSAVE: 'integer'
  LINDEX: 'string'
  LINSERT: 'integer'
  LLEN: 'integer'
  LPOP: 'string'
  LPUSH: 'integer'
  LPUSHX: 'integer'
  LRANGE: 'list'
  LREM: 'integer'
  LSET: 'status'
  LTRIM: 'status'
  MGET: 'list'
  MONITOR: null
  MOVE: 'integer'
  MSET: 'status'
  MSETNX: 'integer'
  MULTI: 'status'
  OBJECT: null
  PERSIST: 'integer'
  PING: 'status'
  PSUBSCRIBE: null
  PUBLISH: 'integer'
  PUNSUBSCRIBE: null
  QUIT: 'status'
  RANDOMKEY: 'string'
  RENAME: 'status'
  RENAMENX: 'integer'
  RPOP: 'string'
  RPOPLPUSH: 'string'
  RPUSH: 'integer'
  RPUSHX: 'integer'
  SADD: 'integer'
  SAVE: null
  SCARD: 'integer'
  SDIFF: 'list'
  SDIFFSTORE: 'integer'
  SELECT: 'status'
  SET: 'status'
  SETBIT: 'integer'
  SETEX: 'status'
  SETNX: 'integer'
  SETRANGE: 'integer'
  SHUTDOWN: 'status'
  SINTER: 'list'
  SINTERSTORE: 'integer'
  SISMEMBER: 'integer'
  SLAVEOF: 'status'
  SMEMBERS: 'set'
  SMOVE: 'integer'
  SORT: 'list'
  SPOP: 'string'
  SRANDMEMBER: 'string'
  SREM: 'integer'
  STRLEN: 'integer'
  SUBSCRIBE: null
  SUNION: 'list'
  SUNIONSTORE: 'integer'
  SYNC: null
  TTL: 'integer'
  TYPE: 'status'
  UNSUBSCRIBE: null
  UNWATCH: 'status'
  WATCH: 'status'
  ZADD: 'integer'
  ZCARD: 'integer'
  ZCOUNT: 'integer'
  ZINCRBY: 'string'
  ZINTERSTORE: 'integer'
  ZRANGE: 'zset'
  ZRANGEBYSCORE: 'zset'
  ZRANK: 'integer'
  ZREM: 'integer'
  ZREMRANGEBYRANK: 'integer'
  ZREMRANGEBYSCORE: 'integer'
  ZREVRANGE: 'zset'
  ZREVRANGEBYSCORE: 'zset'
  ZREVRANK: 'integer'
  ZSCORE: 'string'
  ZUNIONSTORE: 'integer'


# Given a key type, what command can be used to retrieve all of the keys values

exports.val_commands =
  string: 'GET'
  hash: 'HGETALL'
  list: 'LRANGE'
  set: 'SMEMBERS'
  zset: 'ZRANGE'


# Given a type, what command can be used to delete the key or value

exports.del_commands =
  key: 'DEL'
  string: 'DEL'
  hash: 'HDEL'
  set: 'SREM'
  zset: 'ZREM'
  # list: 'LREM'


# Given a type, what command can be used to edit the value

exports.edit_commands =
  string: 'SET' # key value
  hash: 'HSET' # key field value
  list: 'LSET' # key index value


# Given a type, what command can be used to add a new value

exports.add_commands =
  string: 'SETNX'
  hash: 'HSETNX'
  list: 'LPUSH'
  set: 'SADD'
  zset: 'ZADD'


# List of commands, considered "input" commands

exports.input_commands =
  APPEND: true
  BLPOP: true
  BRPOP: true
  BRPOPLPUSH: true
  DECR: true
  DECRBY: true
  DEL: true
  EXPIRE: true
  EXPIREAT: true
  HDEL: true
  HINCRBY: true
  HMSET: true
  HSET: true
  HSETNX: true
  INCR: true
  INCRBY: true
  LINSERT: true
  LPOP: true
  LPUSH: true
  LPUSHX: true
  LREM: true
  LSET: true
  LTRIM: true
  MOVE: true
  MSET: true
  MSETNX: true
  PERSIST: true
  RENAME: true
  RENAMENX: true
  RPOP: true
  RPOPLPUSH: true
  RPUSH: true
  RPUSHX: true
  SADD: true
  SDIFFSTORE: true
  SET: true
  SETBIT: true
  SETEX: true
  SETNX: true
  SETRANGE: true
  SINTERSTORE: true
  SMOVE: true
  SPOP: true
  SREM: true
  SUNIONSTORE: true
  ZADD: true
  ZINCRBY: true
  ZINTERSTORE: true
  ZREM: true
  ZREMRANGEBYRANK: true
  ZREMRANGEBYSCORE: true
  ZUNIONSTORE: true


# List of commands, considered "output" commands

exports.output_commands =
  EXISTS: true
  GET: true
  GETBIT: true
  GETRANGE: true
  HEXISTS: true
  HGET: true
  HGETALL: true
  HKEYS: true
  HLEN: true
  HMGET: true
  HVALS: true
  INFO: true
  KEYS: true
  LINDEX: true
  LLEN: true
  LRANGE: true
  MGET: true
  RANDOMKEY: true
  SCARD: true
  SDIFF: true
  SINTER: true
  SISMEMBER: true
  SMEMBERS: true
  SORT: true
  SRANDMEMBER: true
  STRLEN: true
  SUNION: true
  TTL: true
  TYPE: true
  ZCARD: true
  ZCOUNT: true
  ZRANGE: true
  ZRANGEBYSCORE: true
  ZRANK: true
  ZREVRANGE: true
  ZREVRANGEBYSCORE: true
  ZREVRANK: true
  ZSCORE: true


# List of commands, considered "modify" commands

exports.modify_val_commands =
  BRPOPLPUSH: true
  HINCRBY: true
  HMSET: true
  HSET: true
  HSETNX: true
  LINSERT: true
  LPUSH: true
  LPUSHX: true
  LSET: true
  LTRIM: true
  MSET: true
  MSETNX: true
  RPUSH: true
  RPUSHX: true
  SADD: true
  SET: true
  SETBIT: true
  SETEX: true
  SETNX: true
  SETRANGE: true
  ZADD: true
  ZINCRBY: true


# List of commands, considered "move" commands
exports.move_val_commands =
  BRPOPLPUSH: true
  RPOPLPUSH: true
  SMOVE: true


# List of commands, considered "remove" commands

exports.remove_val_commands =
  BLPOP: true
  BRPOP: true
  HDEL: true
  LPOP: true
  LREM: true
  RPOP: true
  SPOP: true
  SREM: true
  ZREM: true
  ZREMRANGEBYRANK: true
  ZREMRANGEBYSCORE: true


# List of commands, considered "modify" commands

exports.modify_key_commands =
  APPEND: true
  BLPOP: true
  BRPOP: true
  BRPOPLPUSH: true
  DECR: true
  DECRBY: true
  DEL: true
  EXEC: true
  EXPIRE: true
  EXPIREAT: true
  FLUSHALL: true
  FLUSHDB: true
  HDEL: true
  HINCRBY: true
  HMSET: true
  HSET: true
  HSETNX: true
  INCR: true
  INCRBY: true
  LINSERT: true
  LPOP: true
  LPUSH: true
  LPUSHX: true
  LREM: true
  LSET: true
  LTRIM: true
  MOVE: true
  MSET: true
  MSETNX: true
  PERSIST: true
  RENAME: true
  RENAMENX: true
  RPOP: true
  RPOPLPUSH: true
  RPUSH: true
  RPUSHX: true
  SADD: true
  SET: true
  SETBIT: true
  SETEX: true
  SETNX: true
  SETRANGE: true
  SMOVE: true
  SPOP: true
  SREM: true
  ZADD: true
  ZINCRBY: true
  ZREM: true
  ZREMRANGEBYRANK: true
  ZREMRANGEBYSCORE: true


# List of available commands, permitted by Reddish

exports.available_commands =
  APPEND: true
  AUTH: true
  BGREWRITEAOF: true
  BGSAVE: true
  BLPOP: true
  BRPOP: true
  BRPOPLPUSH: true
  'CONFIG GET': true
  'CONFIG SET': true
  'CONFIG RESETSTAT': true
  DBSIZE: true
  DECR: true
  DECRBY: true
  DEL: true
  DISCARD: true
  ECHO: true
  EXEC: true
  EXISTS: true
  EXPIRE: true
  EXPIREAT: true
  FLUSHALL: true
  FLUSHDB: true
  GET: true
  GETBIT: true
  GETRANGE: true
  GETSET: true
  HDEL: true
  HEXISTS: true
  HGET: true
  HGETALL: true
  HINCRBY: true
  HKEYS: true
  HLEN: true
  HMGET: true
  HMSET: true
  HSET: true
  HSETNX: true
  HVALS: true
  INCR: true
  INCRBY: true
  INFO: true
  KEYS: true
  LASTSAVE: true
  LINDEX: true
  LINSERT: true
  LLEN: true
  LPOP: true
  LPUSH: true
  LPUSHX: true
  LRANGE: true
  LREM: true
  LSET: true
  LTRIM: true
  MGET: true
  MONITOR: true
  MOVE: true
  MSET: true
  MSETNX: true
  MULTI: true
  OBJECT: true
  PERSIST: true
  PING: true
  PSUBSCRIBE: true
  PUBLISH: true
  PUNSUBSCRIBE: true
  QUIT: true
  RANDOMKEY: true
  RENAME: true
  RENAMENX: true
  RPOP: true
  RPOPLPUSH: true
  RPUSH: true
  RPUSHX: true
  SADD: true
  SAVE: true
  SCARD: true
  SDIFF: true
  SDIFFSTORE: true
  SELECT: true
  SET: true
  SETBIT: true
  SETEX: true
  SETNX: true
  SETRANGE: true
  SHUTDOWN: true
  SINTER: true
  SINTERSTORE: true
  SISMEMBER: true
  SLAVEOF: true
  SMEMBERS: true
  SMOVE: true
  SORT: true
  SPOP: true
  SRANDMEMBER: true
  SREM: true
  STRLEN: true
  SUBSCRIBE: true
  SUNION: true
  SUNIONSTORE: true
  SYNC: true
  TTL: true
  TYPE: true
  UNSUBSCRIBE: true
  UNWATCH: true
  WATCH: true
  ZADD: true
  ZCARD: true
  ZCOUNT: true
  ZINCRBY: true
  ZINTERSTORE: true
  ZRANGE: true
  ZRANGEBYSCORE: true
  ZRANK: true
  ZREM: true
  ZREMRANGEBYRANK: true
  ZREMRANGEBYSCORE: true
  ZREVRANGE: true
  ZREVRANGEBYSCORE: true
  ZREVRANK: true
  ZSCORE: true
  ZUNIONSTORE: true


# List of commands to be checked for key size

exports.check_commands =
  HGETALL: true
  HKEYS: true
  HMGET: true
  HVALS: true
  LRANGE: true
  MGET: true
  SDIFF: true
  SINTER: true
  SMEMBERS: true
  SORT: true
  SUNION: true
  ZRANGE: true
  ZRANGEBYSCORE: true
  ZREVRANGE: true
  ZREVRANGEBYSCORE: true
