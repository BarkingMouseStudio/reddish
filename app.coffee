path = require 'path'

stylus = require 'stylus'

io = require 'socket.io'
express = require 'express'

RedisStore = require('connect-redis')(express)
{ redis } = require './lib/common'
{ session_secret, port, endpoint_ports, secure } = require './lib/config'
{ md5 } = require './lib/utils'

certs = require './certs' if secure


# Initialize express app

app = express.createServer(certs)
app.configure ->
  cwd = process.cwd()

  public_path = path.join(cwd, 'public')
  src_path = path.join(cwd, 'src')

  @use stylus.middleware({
    debug: true,
    src: src_path,
    dest: public_path,
    compile: (str) -> stylus(str).set('compress', true)
  })
  @use express.bodyParser()
  @use express.cookieParser()
  @use express.query()
  @use express.session({
    secret: session_secret,
    store: store = new RedisStore({
      client: redis, prefix: 'session:'
    }),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, # 1 day
      secure: secure
    }
  })
  @use express.compiler({
    src: src_path,
    dest: public_path,
    enable: ['coffeescript']
  })
  @use express.favicon(path.join(public_path, 'favicon.png'))
  @use express.static(public_path, maxAge: 1000 * 60 * 60 * 24)
  @use express.errorHandler({
    stack: true
    message: true
    dump: true
  })
  @use express.logger('dev')

{ get: connections_get, post: connections_post, del: connections_del } = require './lib/routes'

app.get '/connections', connections_get
app.post '/connections', connections_post
app.del '/connections/:id', connections_del

app.listen(port)
console.log "app:listening:#{port}"


# Initialize socket.io

socketio = require 'socket.io'

io = socketio.listen(app)
io.configure ->
  @set 'log level', 2
  @set 'authorization', handle_auth = (data, callback) ->
    unless sessionId = data.headers?.cookie?.replace(/.*connect.sid=(.+)(?:;|$)/, '$1')
      callback(new Error("session:invalid:#{sessionId}"), false)
      return

    data.sessionId = decodeURIComponent(sessionId)
    callback(null, true)

Client = require './lib/redis/Client'

io.sockets.on 'connection', (socket) -> new Client(socket)


# Initialize reddish-proxy endpoint

Endpoint = require './lib/Endpoint'

[standard_endpoint_port, monitor_endpoint_port] = endpoint_ports

if secure
  { key, cert, ca } = certs
  options = key: key, cert: cert, ca: [ca]
else
  options = allowHalfOpen: true

new Endpoint standard_endpoint_port, 'STANDARD', secure, options
new Endpoint monitor_endpoint_port, 'MONITOR', secure, options
