window.Reddish or= {}

Reddish.KeysView = Backbone.View.extend

  el: '#keys'

  events:
    'submit #keys-filter': 'submit'

  initialize: ->
    _.bindAll(this, 'add', 'resize', 'scroll')

    @collection.bind('add', @add, this)
    @collection.bind('reset', @reset, this)
    @collection.bind('remove', @remove, this)

    @$el = $(@el)
    @$wrapper = @$el.children('#keys-list-wrapper')
    @$keys = @$wrapper.children('#keys-list')
    @$empty = @$el.children('#keys-empty')
    @$filter = @$el.find('#keys-filter-input')

    @$wrapper.on 'scroll', @scroll
    $(window).on 'resize', @resize

    @currScroll = @prevScroll = 0
    @startIndex = @prevStartIndex = 0

    @minItemHeight = 68
    @wrapperHeight = @$wrapper.outerHeight()

    @visibleItems = Math.ceil @wrapperHeight / @minItemHeight
    @endIndex = @prevEndIndex = @bufferSize = @visibleItems * 3

    @views = {}

  resize: _.debounce ->
    @wrapperHeight = @$wrapper.outerHeight()
    @visibleItems = Math.ceil @wrapperHeight / @minItemHeight
    @bufferSize = @visibleItems * 3
  , 250

  scroll: _.throttle ->
    @currScroll = @$wrapper.scrollTop()

    if @currScroll > @prevScroll
      direction = 'down'
    else if @currScroll < @prevScroll
      direction = 'up'
    else return

    @prevStartIndex = @startIndex
    @prevEndIndex = @endIndex
    @startIndex = Math.floor(@currScroll / @minItemHeight) - @visibleItems
    @startIndex = 0 if @startIndex < 0

    @endIndex = @startIndex + @bufferSize

    if direction is 'down'
      start_render_range = Math.max(@prevEndIndex, @startIndex)
      end_render_range = @endIndex

      start_remove_range = @prevStartIndex
      end_remove_range = @startIndex
    else
      start_render_range = @startIndex
      end_render_range = Math.min(@prevStartIndex, @endIndex)

      start_remove_range = @endIndex
      end_remove_range = @prevEndIndex

    render_models = @collection.models.slice(start_render_range, end_render_range)
    @render(model, start_render_range + parseInt(i)) for i, model of render_models

    remove_models = @collection.models.slice(start_remove_range, end_remove_range)
    @remove(model) for model in remove_models

    @prevScroll = @currScroll
  , 250

  submit: (e) ->
    e.preventDefault()

    @$filter.val(filter = @$filter.val() or '*')

    Reddish.socket.emit 'reddish:command', command = 'KEYS', filter, (err, reply) =>
      if err
        Reddish.Collections.messages.add(message: "#{command}: #{err}", type: 'error')
        return

      Reddish.Collections.messages.add(message: "#{command}: #{reply}", type: 'info')

  add: (model) ->
    length = @collection.length
    index = length - 1

    if @startIndex <= index < @endIndex
      @render(model, index)

    @$keys.css(height: length * @minItemHeight)
    @$empty.hide()

  render: (model, index) ->
    view = new Reddish.KeyView(model: model)
    @views[model.cid] = view

    el = view.render().el
    el.style.top = "#{index * @minItemHeight}px"

    @$keys.append(el)

  remove: (model) ->
    view = @views[model.cid]
    view?.close()
    delete @views[model.cid]

  reset: ->
    _.each @views, (view) ->
      view.close()

    @$keys.css(height: 0)

    if @collection.length
      @$empty.hide()
    else
      @$empty.show()

    @collection.each(@add)
