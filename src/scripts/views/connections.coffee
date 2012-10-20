window.Reddish or= {}

Reddish.ConnectionsView = Backbone.View.extend

  el: '#connections'

  events:
    'click #connections-toggle': 'toggle'
    'submit #connection-create': 'submit'

  initialize: ->
    _.bindAll(this, 'add')

    @collection.bind('add', @add, this)
    @collection.bind('remove', @remove, this)
    @collection.bind('reset', @reset, this)
    @collection.bind('change:state', @update, this)

    @$el = $(@el)
    @$list = @$('#connections-list')
    @$last = @$list.children('li:last-child')
    @$form = @$('#connection-create')
    @$name = @$form.find('#connection-name')
    @$pass = @$form.find('#connection-pass')
    @$toggle = @$('#connections-toggle')

    @open = false

    @views = {}

  hide: ->
    @open = false
    @$toggle.removeClass('active')
    @$list.slideUp()

  show: ->
    @open = true
    @$toggle.addClass('active')
    @$list.slideDown()

  update: (model, state) ->
    return unless model.get('state') is 'disconnected'

    @$list.children('li:not(:last-child)').removeClass('connected')
      .find('.button')
      .removeClass('disconnect connecting')
      .text('Connect')

    Reddish.Collections.keys.reset()
    Reddish.Collections.vals.reset()

  toggle: (e) ->
    e.preventDefault()
    @open = not @open

    @$toggle.toggleClass('active')
    @$list.slideToggle()

  submit: (e) ->
    e.preventDefault()

    $.post @$form.attr('action'), @$form.serialize(), (reply) =>
      if err = reply.error
        Reddish.Collections.messages.add(message: err, type: 'error')
        return

      if reply
        existing = @collection.get(reply.id)

        if existing
          existing.set(reply)
        else
          @collection.add(reply)

        @$name.val('')
        @$pass.attr('checked', false)

  add: (model) ->
    view = new Reddish.ConnectionView(model: model)
    @views[model.cid] = view
    @$last.before(view.render().el)

  remove: (model) ->
    view = @views[model.cid]
    view?.close()
    delete @views[model.cid]

  reset: -> 
    _.each @views, (view) ->
      view.close()

    # start the tour if they have no connections
    unless @collection.length
      Reddish.Views.tour.render().show()
      return

    @collection.each(@add)
