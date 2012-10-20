window.Reddish or= {}

Reddish.utils =

  escapeValue: (value) ->
    return '(nil)' unless value
    try value = JSON.stringify(JSON.parse(value), null, 2)
    value = value?.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return value


  timeSpan: (span) ->
    units = null

    conversions =
      millisecond : 1    # ms    -> ms
      second      : 1000 # ms    -> sec
      minute      : 60   # sec   -> min
      hour        : 60   # min   -> hour
      day         : 24   # hour  -> day
      month       : 30   # day   -> month (roughly)
      year        : 12   # month -> year

    for key, value of conversions
      break if span < value

      units = key # keeps track of the selected key over the iteration
      span = span / value #/

    # pluralize a unit when the difference is greater than 1
    span = Math.floor(span)
    units += 's' if span isnt 1

    return [span, units].join(' ')


  relativeTime: (date = Date.now(), now_threshold = 1000, past_tense = false) ->
    if past_tense
      tense = 'ago'
      delta = Date.now() - date
    else
      tense = 'from now'
      delta = date - Date.now()

    now_threshold = parseInt(now_threshold, 10)
    now_threshold = 0 if isNaN(now_threshold)

    return 'just now' if delta <= now_threshold

    timespan = Reddish.utils.timeSpan(delta)

    return [timespan, tense].join(' ')
