url = require 'url'
_ = require 'underscore'

{ redback, proxies_set } = require './common'
{ sha1, base64 } = require './utils'
{ proxy_key_salt } = require './config'

exports.get = (sessionId, callback) ->
  connections = redback.createHash(key = "connections:#{sessionId}")

  connections.get (err, connections) ->
    if err
      callback(err)
      return

    connections = _.map connections, (connection) ->
      return JSON.parse(connection)

    callback(null, connections)


exports.post = (sessionId, connection, callback) ->
  connections = redback.createHash(key = "connections:#{sessionId}")

  { name, requires_pass } = connection

  unless name
    callback(new Error('Name or url required'))
    return

  { hostname, protocol, port } = name_parts = url.parse(name)

  unless hostname and protocol is 'redis:'
    id = base64(name)
    key = sha1("#{name}.#{Date.now()}", proxy_key_salt)

    connection =
      type: 'name'
      name: name
      id: id
      key: key
      requires_pass: false
  else
    name = url.format(name_parts)
    
    connection =
      type: 'url'
      name: name
      id: id = base64(name)
      key: null
      requires_pass: !!requires_pass

    { auth } = name_parts

    if auth
      [username, password] = auth.split(':')
      connection['password'] = password if password

  connections.set id, JSON.stringify(connection), (err, reply) ->
    if err
      callback(err)
      return

    { key } = connection
    proxies_set.add(key) if key

    callback(null, connection)


exports.del = (sessionId, id, callback) ->
  key = "connections:#{sessionId}"
  connections = redback.createHash(key)

  connections.del id, (err, reply) ->
    if err
      callback(err)
      return

    proxies_set.remove(key)
    callback(null, !!reply)
