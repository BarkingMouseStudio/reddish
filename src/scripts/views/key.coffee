window.Reddish or= {}

Reddish.KeyView = Backbone.View.extend

  events:
    'click a.open': 'open'
    'click a.del': 'del'

  tagName: 'li'

  template: _.template $('#key-template').html()

  initialize: ->
    _.bindAll(this, 'render')

    @model.bind('change:ttl', @render_ttl, this)
    @model.bind('change:deleted', @render_deleted, this)
    @model.bind('change:active', @render_active, this)
    @model.bind('remove', @close, this)

    @$el = $(@el)

  open: (e) ->
    e.preventDefault()

    @model.set(opened: true)

    { val_cmd_name: command, val_cmd_args: args } = @model.attributes

    Reddish.socket.emit 'reddish:command', command, args, (err, reply) =>
      if err
        Reddish.Collections.messages.add(message: "#{command}: #{err}", type: 'error')
        return

      Reddish.Collections.messages.add(message: "#{command}: #{reply}", type: 'info')

  del: (e) ->
    e.preventDefault()

    { del_cmd_name: command, del_cmd_args: args } = @model.attributes

    return unless confirm """
      Are you sure you want to delete this key?
      `#{@model.get('del_cmd_str')}`
      """

    Reddish.socket.emit 'reddish:command', command, args, (err, reply) =>
      if err
        Reddish.Collections.messages.add(message: "#{command}: #{err}", type: 'error')
        return

      Reddish.Collections.messages.add(message: "#{command}: #{reply}", type: 'info')
      @model.set(deleted: true) if reply

  render_active: ->
    if active = @model.get('active')
      @$el.addClass('active')
    else
      @$el.removeClass('active')

  render_deleted: ->
    if deleted = @model.get('deleted')
      @$el.addClass('deleted')
    else
      @$el.removeClass('deleted')

  render_ttl: ->
    ttl = @model.get('ttl')

    if ttl > 0
      time = Reddish.utils.relativeTime(Date.now() + (ttl * 1000))
      @$ttl.text(time)
      @update_ttl()

  update_ttl: ->
    clearTimeout(@timeout)
    ttl = @model.get('ttl')

    if ttl is 0
      @model.set(deleted: true)
      return

    if ttl > 0
      @timeout = setTimeout =>
        @model.set(ttl: --ttl)
      , 1000

  close: ->
    clearTimeout(@timeout)
    @remove()
    @unbind()
    @model.unbind()

  render: ->
    @el.innerHTML = @template(@model.toJSON())
    @$ttl = @$('.ttl')
    @update_ttl()
    return this
