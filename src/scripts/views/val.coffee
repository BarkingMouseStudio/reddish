window.Reddish or= {}

Reddish.ValueView = Backbone.View.extend

  events:
    'click a.del': 'del'
    'click a.edit-toggle': 'toggle_edit'
    'click a.edit-cancel': 'hide_edit'
    'submit form.edit-view': 'submit_edit'

  tagName: 'li'

  template: _.template $('#value-template').html()

  initialize: ->
    _.bindAll(this, 'render')

    @model.bind('change', @render)

    @$el = $(@el)

  toggle_edit: (e) ->
    e.preventDefault()

    if editing = @$el.hasClass('editing')
      @hide_edit(e)
    else
      @show_edit(e)

  show_edit: (e) ->
    e.preventDefault()
    @$el.addClass('editing')
    @$edit_value.val(@model.get('raw'))

  hide_edit: (e) ->
    e.preventDefault()
    @$el.removeClass('editing')
    @$edit_value.val('')

  submit_edit: (e) ->
    e.preventDefault()

    { edit_cmd_name: command, edit_cmd_args: args } = @model.attributes
    args.push(raw = @$edit_value.val())

    Reddish.socket.emit 'reddish:command', command, args, (err, reply) =>
      if err
        Reddish.Collections.messages.add(message: "#{command}: #{err}", type: 'error')
        return

      Reddish.Collections.messages.add(message: "#{command}: #{reply}", type: 'info')

      value = Reddish.utils.escapeValue(raw)
      @model.set(value: value, raw: raw)
      @hide_edit(e)

    args.pop()

  del: (e) ->
    e.preventDefault()

    { del_cmd_name: command, del_cmd_args: args, del_cmd_str } = @model.attributes
    return unless confirm """
      Are you sure you want to delete this value?
      `#{del_cmd_str}`
      """

    Reddish.socket.emit 'reddish:command', command, args, (err, reply) =>
      if err
        Reddish.colllections.messages.add(message: "#{command}: #{err}", type: 'error')
        return

      Reddish.Collections.messages.add(message: "#{command}: #{reply}", type: 'info')

      if reply
        @model.set(deleted: true)
        Reddish.Collections.keys.get(@model.get('key'))?.set(deleted: true)

  render_deleted: ->
    if deleted = @model.get('deleted')
      @$el.addClass('deleted')
    else
      @$el.removeClass('deleted')

  close: ->
    @remove()
    @unbind()
    @model.unbind()

  render: ->
    @el.innerHTML = @template(@model.toJSON())
    if @model.has('edit_cmd_name')
      @$edit_view = @$el.children('.edit-view')
      @$edit_value = @$edit_view.children('.edit-value')
    return this
