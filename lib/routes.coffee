connections = require './connections'


# Get all connections

exports.get = (req, res) ->
  connections.get req.sessionID, (err, connections) ->
    if err
      res.send(error: err.message)
      return

    res.send(connections)


# Create or update a connection

exports.post = (req, res) ->
  connections.post req.sessionID, connection = req.body, (err, connection) ->
    if err
      res.send(error: err.message)
      return

    res.send(connection)


# Delete a connection

exports.del = (req, res) ->
  connections.del req.sessionID, id = req.params.id, (err, reply) ->
    if err
      res.send(error: err.message)
      return

    res.send(!!reply)
