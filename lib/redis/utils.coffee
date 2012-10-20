url = require 'url'

key_regex = /^[a-f0-9]{40}$/
{ proxies } = require '../common'

{ reply_types,
  val_commands,
  del_commands,
  edit_commands,
  modify_commands,
  available_commands,
  input_commands,
  output_commands,
  check_commands } = require './maps'

redis = require 'redis'
RedisClient = redis.RedisClient


# Format for JSON and escape xml/html strings for proper front-end display

exports.formatValue = (value) ->
  return '(nil)' unless value
  try value = JSON.stringify(JSON.parse(value), null, 2)
  if value?
    return value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  else return '(nil)'


# Create a redis client either raw or wrapping a socket

exports.createClient = (connection, is_monitor) ->
  max_attempts = 3
  { type, key, name } = connection

  if type is 'url'
    { hostname, port } = url.parse(name)

    port = 6379 unless port

    unless hostname
      throw new Error('Invalid connection')
      return

    instance = redis.createClient(port, hostname, max_attempts: max_attempts)
  else
    unless key_regex.test(key)
      throw new Error('Invalid connection key')
      return

    proxy_key = unless is_monitor then "#{key}:STANDARD" else "#{key}:MONITOR"
    proxy = proxies.get(proxy_key)

    unless proxy
      throw new Error('Proxy not found')
      return

    instance = new RedisClient(proxy, max_attempts: max_attempts)
    instance.is_proxy = true

    # Assume the proxy is already connected
    # and initialize the redis connection
    instance.on_connect()

  return instance


# Cleans up an instance (normal or proxy)

exports.endClient = (instance, connection) ->
  return unless instance and instance.connected

  unless instance.is_proxy
    instance.quit()
  else
    instance.end()
    instance.stream.on 'error', (err) ->

    # TODO: Move this to an event handler
    if connection.type is 'name' and connection.key
      proxies.del(connection.key)


exports.handleKey = (instance, key, callback) ->
  instance.type key, (err, type) ->
    if err
      callback(err)
      return

    instance.ttl key, (err, ttl) ->
      if err
        callback(err)
        return

      val_cmd_name = val_commands[type]
      del_cmd_name = del_commands['key']

      switch type
        when 'zset' then val_cmd_args = [key, 0, -1, 'WITHSCORES']
        when 'list' then val_cmd_args = [key, 0, -1]
        else val_cmd_args = [key]

      del_cmd_args = [key]

      val_cmd_str = "#{val_cmd_name} #{val_cmd_args.join(' ')}"
      del_cmd_str = "#{del_cmd_name} #{del_cmd_args.join(' ')}"

      key =
        id: key
        type: type
        ttl: ttl
        val_cmd_name: val_cmd_name
        val_cmd_args: val_cmd_args
        val_cmd_str: val_cmd_str
        del_cmd_name: del_cmd_name
        del_cmd_args: del_cmd_args
        del_cmd_str: del_cmd_str

      callback(null, key)
