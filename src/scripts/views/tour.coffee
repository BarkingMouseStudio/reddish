window.Reddish or= {}

Reddish.TourView = Backbone.View.extend

  el: '#tour'

  template: _.template $('#tour-template').html()

  events:
    'click a#tour-next': 'next'
    'click a#tour-cancel': 'hide'

  initialize: ->
    _.bindAll(this, 'hide')

    @$el = $(@el)

    @$overlay = $('#overlay')
    @$overlay.on 'click', @hide

    @index = 0

  show: ->
    @$el.fadeIn(500)
    @$overlay.fadeIn(500)

  hide: ->
    @$el.fadeOut(500)
    @$overlay.fadeOut(500)

    prevModel = @collection.at(@index)

    if prevModel and prevFocusSelector = prevModel.focusSelector
      $(prevFocusSelector).removeClass('focused')

    @index = 0

  next: ->
    unless @index < @collection.length - 1
      @hide()
      return

    @render(++@index)

  render: ->
    prevModel = @collection.at(@index - 1)
    model = @collection.at(@index)

    model.set(index: @index + 1)
    model.set(length: @collection.length)

    @el.innerHTML = @template(model.toJSON())
    @el.className = model.get('className')

    if prevModel and prevFocusSelector = prevModel.get('focusSelector')
      $(prevFocusSelector).removeClass('focused')

    if focusSelector = model.get('focusSelector')
      $(focusSelector).addClass('focused')

    if callback = model.get('callback')
      callback()

    return this
