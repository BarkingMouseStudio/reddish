{ proxies, proxies_set } = require './common'

module.exports = class Endpoint
  @keyRegex: /^[a-f0-9]{40}$/

  handleError: (err) =>
    console.error "#{@name}-proxy:close", err?.message

  handleConnect: (@proxy) =>
    console.log "#{@name}-proxy:connected"

    @proxy.on 'close', @handleError
    @proxy.on 'error', @handleError
    @proxy.on 'data', @handleData

  handleListen: =>
    console.log "#{@name}-proxy:listening:#{@port}"

  handleHandshake: (err, reply) =>
    if err or not reply
      console.error "#{@name}-@proxy:handshake:failed:invalid"
      @proxy.end(JSON.stringify(error: 'Invalid connection key'))
      return

    # Dummy connect fn to support redis reconnects
    @proxy.connect = ->

    @proxy.removeAllListeners('data')
    @proxy.write(JSON.stringify(success: true))
    proxies.set(proxy_key = "#{@key}:#{@postfix}", @proxy)
    console.log "#{@name}-@proxy:handshake:success", proxy_key

  handleData: (data) =>
    try
      json = JSON.parse(data.toString())

      { @key } = json

      unless @key and Endpoint.keyRegex.test(@key)
        console.error "#{@name}-@proxy:handshake:failed:invalid"
        @proxy.end JSON.stringify(error: 'Invalid connection key')
        return

      proxies_set.exists @key, @handleHandshake
    catch err
      console.error "#{@name}-@proxy:handshake:failed:error", err?.message
      @proxy.end(JSON.stringify(error: 'Invalid handshake data'))

  constructor: (@port, @postfix, @is_secure, @options) ->
    @name = @postfix.toLowerCase()
    if @is_secure
      tls = require 'tls'
      @endpoint = tls.createServer @options, @handleConnect
    else
      net = require 'net'
      @endpoint = net.createServer @options, @handleConnect

    @endpoint.listen @port, @handleListen
