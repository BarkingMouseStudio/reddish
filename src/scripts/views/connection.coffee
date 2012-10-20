window.Reddish or= {}

Reddish.ConnectionView = Backbone.View.extend

  events:
    'click a.remove': 'destroy'
    'click a.connect': 'connect'
    'click a.disconnect': 'disconnect'

  tagName: 'li'

  template: _.template $('#connection-template').html()

  initialize: (options) ->
    @model.bind('change', @render, this)
    @model.bind('destroy', @close, this)
    @$el = $(@el)

  connect: (e) ->
    e.preventDefault()

    return if @model.get('state') isnt 'disconnected'

    model_json = @model.toJSON()

    { type, requires_pass } = @model.attributes

    model_json.password = @$password.val() if type is 'url' and requires_pass

    @$el.find('.button')
      .removeClass('disconnect')
      .addClass('connecting')
      .text('Connecting...')

    @model.set(state: 'connecting')

    Reddish.socket.emit 'reddish:connect', model_json, (err, reply) =>
      unless reply
        @model.set(state: 'disconnected')
        return

      @model.set(state: 'connected')
      @$el.find('.button')
        .removeClass('connecting')
        .addClass('disconnect')
        .text('Disconnect')
      @$el.addClass('connected')

  close: ->
    @remove()
    @unbind()
    @model.unbind()

  disconnect: (e) ->
    e.preventDefault()
    Reddish.socket.emit 'reddish:disconnect', (err, reply) =>
      @model.set(state: 'disconnected') unless reply

  destroy: (e) ->
    e.preventDefault()
    return unless confirm """
      Are you sure you want to remove this connection?
      """
    @model.destroy()

  render: ->
    @el.innerHTML = @template(@model.toJSON())
    @$password = @$el.find('input.password')
    return this
