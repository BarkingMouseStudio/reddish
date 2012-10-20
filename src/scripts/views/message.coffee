window.Reddish or= {}

Reddish.MessageView = Backbone.View.extend

  el: '#message'

  template: _.template $('#message-template').html()

  initialize: ->
    @collection.bind('add', @add, this)
    @collection.bind('remove', @remove, this)

    @$el = $(@el)

  add: (model) ->
    @show(model) if @collection.length is 1

  remove: (model) ->
    @$el.fadeOut 500, =>
      return unless @collection.length
      @show(@collection.first())

  show: (model) ->
    @el.innerHTML = @template(model.toJSON())

    @$el.fadeIn 500, =>
      setTimeout =>
        @collection.remove(model)
      , 2000
