window.Reddish or= {}

Reddish.CLIView = Backbone.View.extend

  el: '#cli'

  trim_regex: /^\s+|\s+$/g
  trim_quotes_regex: /^(["'])(.*?)\1$/g
  token_regex: /^(["']).*\1\s+$|^[^"'].*\s+$/
  config_regex: /^CONFIG\s$/i
  tokenize_regex: /(["'])(?:\\\1|.)*?[^\\]\1|\S+/g # use for paste

  template: _.template $('#tag-template').html()

  events:
    'keydown input.text': 'keyDown'
    'keyup input.text': 'keyUp'

  initialize: (options) ->
    @$el = $(@el)

    @$tags = @$el.children('ul.tags')
    @$last = @$tags.children('li:last-child')
    @$label = @$last.find('.label')
    @$input = @$last.find('input')
    @$tip = @$el.children('.tip')

    @tags = []
    @history = []
    @index = 0

  keyDown: (e) ->
    { keyCode, target } = e
    value = target.value

    # if they backspaced (8: backspace)
    return unless keyCode is 8 and not value.length and @tags.length

    # cancel keyUp to prevent removing last character of new value
    e.preventDefault()

    @$tags.children('li')
      .eq(@tags.length - 1)
      .remove()

    target.value = @tags.pop()

    [command, args...] = @tags

    if @tags.length
      command = command.toUpperCase()
      command_description = Reddish.commands[command]

      if command_description
        { arguments: expected_args } = command_description
        [prev_label, optional] = @get_arg_label(expected_args, arg_index = @tags.length - 1)
    else
      @$tip.text('')
      prev_label = 'command'

    prev_label or= '?'
    @$label.text(if optional then "(#{prev_label})" else prev_label)

  parse: (value) ->
    # check that `value` either has opening and closing quotes
    # or no leading quotes and has whitespace
    # and remove trailing and leading whitespace
    return false unless @token_regex.test(value) and not @config_regex.test(value) and value = value.replace(@trim_regex, '')

    @tags.push(value)
    [command, args...] = @tags

    command = command.toUpperCase()
    command_description = Reddish.commands[command]

    if command_description
      { summary, arguments: expected_args } = command_description

      tags_length = @tags.length

      if @tags.length is 1
        @$tip.removeClass('error').text(summary)
        value = command
        label = 'command'

        if expected_args and expected_args.length
          [next_label, next_optional] = @get_arg_label(expected_args, arg_index = tags_length - 1)
      else
        if expected_args and expected_args.length
          [next_label, next_optional] = @get_arg_label(expected_args, arg_index = tags_length - 1)
          [label, optional] = @get_arg_label(expected_args, arg_index = tags_length - 2)
    else
      @$tip.addClass('error').text('ERR Invalid command')
      label = next_label = '?'

    @$label.text(if next_optional then "(#{next_label})" else next_label or '?')
    @render_tag(value: value, label: label or '?', optional: optional)

    return true

  keyUp: (e) ->
    { keyCode, target } = e

    value = target.value
    value += ' ' if keyCode is 13

    if keyCode is 38 # UP
      e.preventDefault()
      @reset()
      @index--
      @index = @history.length - 1 if @index < 0
      history = @history[@index]
      for val in history.match(@tokenize_regex)
        @parse("#{val} ")
      return

    if keyCode is 40 # DOWN
      e.preventDefault()
      @reset()
      @index++
      @index %= @history.length
      history = @history[@index]
      for val in history.match(@tokenize_regex)
        @parse("#{val} ")
      return

    has_parsed = @parse(value)

    # clear input
    target.value = '' if has_parsed

    # handle submit (13: enter)
    @submit() if keyCode is 13 

  submit: ->
    @index = 0

    [command, args...] = @tags

    args = _.map args, (arg) ->
      arg.replace(@trim_quotes_regex, '$2')

    Reddish.socket.emit 'reddish:command', command, args, (err, reply) =>
      if err
        Reddish.Collections.messages.add(message: "#{command}: #{err}", type: 'error')
        return

      Reddish.Collections.messages.add(message: "#{command}: #{reply}", type: 'info')

      @history.push @tags.join(' ')
      @reset()

  reset: ->
    @tags = []
    @$tags.children('li:not(:last)').remove()
    @$tip.removeClass('error').text('')
    @$input.val('')
    @$label.text('command')

  render_tag: (tag) ->
    @$last.before(@template(tag))

  get_arg_label: (expected_args, arg_index) ->
    max_arg_index = expected_args.length - 1

    if arg_index > max_arg_index
      expected_arg = expected_args[max_arg_index]

      if expected_arg and expected_arg.multiple
        names = expected_arg.name

        if _.isArray(names)
          sub_index = (arg_index - max_arg_index) % names.length
          label = names[sub_index]
        else
          label = names
    else if arg_index is max_arg_index
      expected_arg = expected_args[max_arg_index]

      if expected_arg
        names = expected_arg.name

        if expected_arg.multiple and _.isArray(names)
          sub_index = (arg_index - max_arg_index) % names.length
          label = names[sub_index]
        else
          label = names
    else
      expected_arg = expected_args[arg_index]

      if expected_arg
        label = expected_arg.name

    optional = !!expected_arg.optional

    return [label, optional]
