_ = require 'underscore'

{ reply_types,
  val_commands,
  del_commands,
  edit_commands,
  modify_key_commands,
  modify_val_commands,
  available_commands,
  input_commands,
  output_commands,
  check_commands } = require './maps'

{ endClient,
  formatValue,
  createClient,
  handleKey } = require './utils'


# Limits

keys_limit = 10000
vals_limit = 10000
monitor_queue_limit = 10000


# Rate limits (ms)

connection_rate_limit = 1000 # ms
command_rate_limit = 250 # ms
monitor_rate_limit = 250 # ms


module.exports = class Client

  # Initialize a websocket client connection

  constructor: (@socket) ->
    _.bindAll(this)

    @last_keys_pattern = '*'
    @monitor_events_queue = []

    @socket.on 'reddish:connect', @handle_connect
    @socket.on 'reddish:disconnect', @handle_disconnect
    @socket.on 'reddish:command', @send_command
    @socket.on 'disconnect', (err, callback) =>
      @handle_disconnect(callback)


  # Send a command to the connected redis instance

  send_command: _.throttle (command, args, callback) ->
    unless command
      callback(err = "ERR Invalid command: \"#{command}\"") if callback
      return

    if typeof args is 'function'
      callback = args
      args = []

    unless @instance
      err = 'ERR No connection'
      callback(err) if callback
      return

    args = [args] if _.isString(args) or _.isNumber(args)
    unless args then args = []

    command = command.toUpperCase()

    unless command and command of available_commands
      callback(err = "ERR Invalid command: \"#{command}\"") if callback
      return

    send_command = =>
      @instance.send_command command.toLowerCase(), args, (err, reply) =>
        if err
          callback(err.message) if callback
          return

        unless reply?
          err = new Error('ERR Empty reply')
          callback(err.message) if callback
          return

        reply_type = reply_types[command]

        if command is 'INFO'
          replies = reply.split(/\r\n/g)
          callback(null, replies.length) if callback
          @socket.emit('redis:reset:vals')

          _.each replies, (reply) =>
            [field, raw] = reply.split(/:/)
            value =
              id: "INFO_#{field}"
              field: field
              value: formatValue(raw)
              key: 'INFO'
              type: reply_type
              raw: raw
            @socket.emit('redis:val', value)

          return

        if command is 'KEYS'
          @socket.emit('redis:reset:keys')
          @last_keys_pattern = args[0] or '*'

        else if command is 'SELECT'
          @instance.selected_db = args[0] or 0
          @check_db_size(@refresh_keys)

        switch reply_type
          when 'status'
            callback(null, reply) if callback
            @socket.emit('redis:status', reply, command, args)
            return
          when 'integer'
            callback(null, reply) if callback
            @socket.emit('redis:status', reply, command, args)
            return
          when 'key'
            callback(null, reply.length) if callback

            _.each reply, (key) =>
              handleKey @instance, key, (err, key) =>
                @socket.emit('redis:key', key)
            return

        if callback
          if reply_type is 'hash'
            callback(null, _.size(reply)) # hgetall returns a hash
          else
            callback(null, reply.length or 0)
        
        @socket.emit('redis:reset:vals')

        key = args[0]
        reply_type = 'string' if reply_type is 'bulk'

        if reply_type is 'zset' and 'WITHSCORES' in args
          values = []
          scores = []

          _.each reply, (value, i) ->
            if i % 2 is 0
              values.push(value)
            else
              scores.push(value)

          _.each values, (raw, i) =>
            value =
              id: "#{key}_#{i}"
              field: scores[i]
              value: formatValue(raw)
              key: key
              type: reply_type
              raw: raw

            value['del_cmd_name'] = del_cmd_name = del_commands[reply_type]
            value['del_cmd_str'] = "#{del_cmd_name} #{key} #{raw}"
            value['del_cmd_args'] = [key, raw]

            @socket.emit('redis:val', value)
        else if reply_type in ['hash', 'list', 'set', 'zset']
          _.each reply, (raw, field) =>
            value =
              id: "#{key}_#{field}"
              field: field
              value: formatValue(raw)
              key: key
              type: reply_type
              raw: raw

            if reply_type in ['hash', 'list']
              value['edit_cmd_name'] = edit_cmd_name = edit_commands[reply_type]
              value['edit_cmd_str'] = "#{edit_cmd_name} #{key} #{field} &quot;...&quot;"
              value['edit_cmd_args'] = [key, field]

              value['del_cmd_name'] = del_cmd_name = del_commands[reply_type]
              value['del_cmd_str'] = "#{del_cmd_name} #{key} #{field}"
              value['del_cmd_args'] = [key, field]

            if reply_type in ['set', 'zset']
              value['del_cmd_name'] = del_cmd_name = del_commands[reply_type]
              value['del_cmd_str'] = "#{del_cmd_name} #{key} #{raw}"
              value['del_cmd_args'] = [key, raw]

            @socket.emit('redis:val', value)
        else
          value =
            id: "#{key}_"
            value: formatValue(reply)
            key: key
            type: reply_type
            raw: reply

          value['edit_cmd_name'] = edit_cmd_name = edit_commands[reply_type]
          value['edit_cmd_str'] = "#{edit_cmd_name} #{key} &quot;...&quot;"
          value['edit_cmd_args'] = [key]

          value['del_cmd_name'] = del_cmd_name = del_commands[reply_type]
          value['del_cmd_str'] = "#{del_cmd_name} #{key}"
          value['del_cmd_args'] = [key]

          @socket.emit('redis:val', value)

    if command of check_commands
      @check_key_size(key = args[0], send_command)
    else send_command()
  , command_rate_limit


  # End the instance connection safely

  end: (reason) ->
    @monitor_events_queue = []

    endClient(@instance, @connection)
    endClient(@monitor, @connection)

    @instance = @monitor = null

    @socket.emit 'error', reason if reason


  # Check that the number of keys is within the limit

  check_db_size: (callback) ->
    @instance.dbsize (err, keys_count) =>
      if err or keys_count > keys_limit
        @end("DB too large: #{keys_count} keys over the #{keys_limit} keys limit")
      else if callback then callback()


  # Check that the number of values is within the limit

  check_key_size: (key, callback) ->
    args = [key]

    callback_wrapper = (err, vals_count) =>
      if err or vals_count > vals_limit
        @socket.emit 'error', "Key too large: #{vals_count} values (over the #{vals_limit} values limit)"
      else if callback
        callback()

    @instance.type key, (err, type) =>
      switch type
        when 'list' then @instance.llen(key, callback_wrapper)
        when 'set' then @instance.scard(key, callback_wrapper)
        when 'zset' then @instance.zcard(key, callback_wrapper)
        when 'hash' then @instance.hlen(key, callback_wrapper)
        else callback_wrapper(null, 0)


  # Handle a client issuing a connection

  handle_connect: _.throttle (@connection, callback) ->
    { password } = connection

    @end()

    try
      @instance = createClient(connection)
      @monitor = createClient(connection, true)
    catch err
      if err
        @socket.emit 'error', err.message
        callback(null, false)
      return

    @instance.on 'error', (err) =>
      return unless err
      @socket.emit 'error', err.message

    @monitor.on 'error', (err) ->

    if password
      handle_auth = _.once (err) =>
        return unless err
        @socket.emit 'error', err

      @instance.auth(password, handle_auth)
      @monitor.auth(password, handle_auth)
        
    @monitor.monitor()
    @monitor.on('monitor', @handle_monitor)

    @instance.on 'ready', =>
      @socket.emit('redis:ready')
      @check_db_size ->
        callback(null, true)

    @instance.on 'end', =>
      @socket.emit('redis:end')
  , connection_rate_limit


  # Handle a client issuing a disconnection

  handle_disconnect: (callback) ->
    @end()
    callback(null, false) if callback


  # Refreshes the keys list

  refresh_keys: ->
    @socket.emit('redis:reset:keys')
    @socket.emit('redis:reset:vals')
    @send_command('KEYS', @last_keys_pattern)

  handle_monitor_event: (args) ->
    # Every modify command has a rule for what to tell the client about
    # Some commands return a new key
    # Some commands modify, add or remove a value

    command = args.shift().toUpperCase()

    if command of modify_val_commands
      console.log command, key = args.shift(), val = args.shift()

    if command of modify_key_commands
      if command in ['FLUSHDB', 'FLUSHALL']
        @check_db_size(@refresh_keys)
        return

      @instance.exists key = args.shift(), (err, does_exist) =>
        unless does_exist
          @socket.emit('redis:key:remove', id: key)
          return

        handleKey @instance, key, (err, key) =>
          @socket.emit('redis:key', key)


  # Sends queued MONITOR "events" to the client

  handle_monitor_events: _.debounce ->
    if @monitor_events_queue.length > monitor_queue_limit
      @end("MONITOR too active: received #{monitor_queue_limit} events over #{monitor_rate_limit}ms")
      return

    _.each @monitor_events_queue, @handle_monitor_event

    @monitor_events_queue = []
  , monitor_rate_limit


  # Queues MONITOR "events"

  handle_monitor: (time, args) ->
    @monitor_events_queue.push(args)
    @handle_monitor_events()
