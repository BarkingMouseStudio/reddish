window.Reddish or= {}

Reddish.ValuesView = Backbone.View.extend

  el: '#values'

  initialize: ->
    _.bindAll(this, 'add', 'resize', 'scroll')

    @collection.bind('add', @add, this)
    @collection.bind('reset', @reset, this)
    @collection.bind('remove', @remove, this)

    @$el = $(@el)
    @$wrapper = @$el.children('#values-list-wrapper')
    @$values = @$wrapper.children('#values-list')
    @$empty = @$el.children('#values-empty')

    @$wrapper.on 'scroll', @scroll
    $(window).on 'resize', @resize

    @currScroll = @prevScroll = 0
    @startIndex = @prevStartIndex = 0

    @height = 0
    @minItemHeight = 92

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

    model = @collection.find (model) =>
      return top = model.get('top') >= @currScroll
    index = @collection.indexOf(model)

    @startIndex = index - @visibleItems
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
    for i, model of render_models
      @render(model, start_render_range + parseInt(i))

    remove_models = @collection.models.slice(start_remove_range, end_remove_range)
    @remove(model) for model in remove_models

    @prevScroll = @currScroll
  , 250

  add: (model) ->
    index = @collection.length - 1

    if @startIndex <= index < @endIndex
      @render(model)

    @$empty.hide()

  render: (model) ->
    view = new Reddish.ValueView(model: model, collection: @collection)
    @views[model.cid] = view

    el = view.render().el
    @$values.append(el)

    # only do this the first time its rendered
    unless model.has('top')
      $el = view.$el
      model.set(top: top = @height)
      @height += $el.outerHeight()
      @$values.css(height: @height)

    el.style.top = "#{model.get('top')}px"

  remove: (model) ->
    view = @views[model.cid]
    view?.close()
    delete @views[model.cid]

  reset: ->
    _.each @views, (view) ->
      view.close()

    @$values.css(height: @height = 0)

    ###
    if @collection.length
      @$empty.hide()
    else
      @$empty.show()
      ###

    @collection.each(@add)
