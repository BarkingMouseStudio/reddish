(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.utils = {
    escapeValue: function(value) {
      if (!value) {
        return '(nil)';
      }
      try {
        value = JSON.stringify(JSON.parse(value), null, 2);
      } catch (_error) {}
      value = value != null ? value.replace(/</g, '&lt;').replace(/>/g, '&gt;') : void 0;
      return value;
    },
    timeSpan: function(span) {
      var conversions, key, units, value;
      units = null;
      conversions = {
        millisecond: 1,
        second: 1000,
        minute: 60,
        hour: 60,
        day: 24,
        month: 30,
        year: 12
      };
      for (key in conversions) {
        value = conversions[key];
        if (span < value) {
          break;
        }
        units = key;
        span = span / value;
      }
      span = Math.floor(span);
      if (span !== 1) {
        units += 's';
      }
      return [span, units].join(' ');
    },
    relativeTime: function(date, now_threshold, past_tense) {
      var delta, tense, timespan;
      if (date == null) {
        date = Date.now();
      }
      if (now_threshold == null) {
        now_threshold = 1000;
      }
      if (past_tense == null) {
        past_tense = false;
      }
      if (past_tense) {
        tense = 'ago';
        delta = Date.now() - date;
      } else {
        tense = 'from now';
        delta = date - Date.now();
      }
      now_threshold = parseInt(now_threshold, 10);
      if (isNaN(now_threshold)) {
        now_threshold = 0;
      }
      if (delta <= now_threshold) {
        return 'just now';
      }
      timespan = Reddish.utils.timeSpan(delta);
      return [timespan, tense].join(' ');
    }
  };

}).call(this);
