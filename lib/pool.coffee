# Simple in-memory pool

module.exports = class Pool

    # Initialize an empty pool or set from pool argument

    constructor: (@pool = {}) ->


    # Return the value at the pool's key

    get: (key) -> return @pool[key]


    # Set a value at the pool's key

    set: (key, val) -> return @pool[key] = val


    # Delete the value at the pool's key

    del: (key) ->
      val = @pool[key]
      delete @pool[key]
      return val
