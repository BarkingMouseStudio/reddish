(function() {
  var __slice = [].slice;

  window.Reddish || (window.Reddish = {});

  Reddish.CLIView = Backbone.View.extend({
    el: '#cli',
    trim_regex: /^\s+|\s+$/g,
    trim_quotes_regex: /^(["'])(.*?)\1$/g,
    token_regex: /^(["']).*\1\s+$|^[^"'].*\s+$/,
    config_regex: /^CONFIG\s$/i,
    tokenize_regex: /(["'])(?:\\\1|.)*?[^\\]\1|\S+/g,
    template: _.template($('#tag-template').html()),
    events: {
      'keydown input.text': 'keyDown',
      'keyup input.text': 'keyUp'
    },
    initialize: function(options) {
      this.$el = $(this.el);
      this.$tags = this.$el.children('ul.tags');
      this.$last = this.$tags.children('li:last-child');
      this.$label = this.$last.find('.label');
      this.$input = this.$last.find('input');
      this.$tip = this.$el.children('.tip');
      this.tags = [];
      this.history = [];
      return this.index = 0;
    },
    keyDown: function(e) {
      var arg_index, args, command, command_description, expected_args, keyCode, optional, prev_label, target, value, _ref, _ref1;
      keyCode = e.keyCode, target = e.target;
      value = target.value;
      if (!(keyCode === 8 && !value.length && this.tags.length)) {
        return;
      }
      e.preventDefault();
      this.$tags.children('li').eq(this.tags.length - 1).remove();
      target.value = this.tags.pop();
      _ref = this.tags, command = _ref[0], args = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
      if (this.tags.length) {
        command = command.toUpperCase();
        command_description = Reddish.commands[command];
        if (command_description) {
          expected_args = command_description["arguments"];
          _ref1 = this.get_arg_label(expected_args, arg_index = this.tags.length - 1), prev_label = _ref1[0], optional = _ref1[1];
        }
      } else {
        this.$tip.text('');
        prev_label = 'command';
      }
      prev_label || (prev_label = '?');
      return this.$label.text(optional ? "(" + prev_label + ")" : prev_label);
    },
    parse: function(value) {
      var arg_index, args, command, command_description, expected_args, label, next_label, next_optional, optional, summary, tags_length, _ref, _ref1, _ref2, _ref3;
      if (!(this.token_regex.test(value) && !this.config_regex.test(value) && (value = value.replace(this.trim_regex, '')))) {
        return false;
      }
      this.tags.push(value);
      _ref = this.tags, command = _ref[0], args = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
      command = command.toUpperCase();
      command_description = Reddish.commands[command];
      if (command_description) {
        summary = command_description.summary, expected_args = command_description["arguments"];
        tags_length = this.tags.length;
        if (this.tags.length === 1) {
          this.$tip.removeClass('error').text(summary);
          value = command;
          label = 'command';
          if (expected_args && expected_args.length) {
            _ref1 = this.get_arg_label(expected_args, arg_index = tags_length - 1), next_label = _ref1[0], next_optional = _ref1[1];
          }
        } else {
          if (expected_args && expected_args.length) {
            _ref2 = this.get_arg_label(expected_args, arg_index = tags_length - 1), next_label = _ref2[0], next_optional = _ref2[1];
            _ref3 = this.get_arg_label(expected_args, arg_index = tags_length - 2), label = _ref3[0], optional = _ref3[1];
          }
        }
      } else {
        this.$tip.addClass('error').text('ERR Invalid command');
        label = next_label = '?';
      }
      this.$label.text(next_optional ? "(" + next_label + ")" : next_label || '?');
      this.render_tag({
        value: value,
        label: label || '?',
        optional: optional
      });
      return true;
    },
    keyUp: function(e) {
      var has_parsed, history, keyCode, target, val, value, _i, _j, _len, _len1, _ref, _ref1;
      keyCode = e.keyCode, target = e.target;
      value = target.value;
      if (keyCode === 13) {
        value += ' ';
      }
      if (keyCode === 38) {
        e.preventDefault();
        this.reset();
        this.index--;
        if (this.index < 0) {
          this.index = this.history.length - 1;
        }
        history = this.history[this.index];
        _ref = history.match(this.tokenize_regex);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          val = _ref[_i];
          this.parse("" + val + " ");
        }
        return;
      }
      if (keyCode === 40) {
        e.preventDefault();
        this.reset();
        this.index++;
        this.index %= this.history.length;
        history = this.history[this.index];
        _ref1 = history.match(this.tokenize_regex);
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          val = _ref1[_j];
          this.parse("" + val + " ");
        }
        return;
      }
      has_parsed = this.parse(value);
      if (has_parsed) {
        target.value = '';
      }
      if (keyCode === 13) {
        return this.submit();
      }
    },
    submit: function() {
      var args, command, _ref,
        _this = this;
      this.index = 0;
      _ref = this.tags, command = _ref[0], args = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
      args = _.map(args, function(arg) {
        return arg.replace(this.trim_quotes_regex, '$2');
      });
      return Reddish.socket.emit('reddish:command', command, args, function(err, reply) {
        if (err) {
          Reddish.Collections.messages.add({
            message: "" + command + ": " + err,
            type: 'error'
          });
          return;
        }
        Reddish.Collections.messages.add({
          message: "" + command + ": " + reply,
          type: 'info'
        });
        _this.history.push(_this.tags.join(' '));
        return _this.reset();
      });
    },
    reset: function() {
      this.tags = [];
      this.$tags.children('li:not(:last)').remove();
      this.$tip.removeClass('error').text('');
      this.$input.val('');
      return this.$label.text('command');
    },
    render_tag: function(tag) {
      return this.$last.before(this.template(tag));
    },
    get_arg_label: function(expected_args, arg_index) {
      var expected_arg, label, max_arg_index, names, optional, sub_index;
      max_arg_index = expected_args.length - 1;
      if (arg_index > max_arg_index) {
        expected_arg = expected_args[max_arg_index];
        if (expected_arg && expected_arg.multiple) {
          names = expected_arg.name;
          if (_.isArray(names)) {
            sub_index = (arg_index - max_arg_index) % names.length;
            label = names[sub_index];
          } else {
            label = names;
          }
        }
      } else if (arg_index === max_arg_index) {
        expected_arg = expected_args[max_arg_index];
        if (expected_arg) {
          names = expected_arg.name;
          if (expected_arg.multiple && _.isArray(names)) {
            sub_index = (arg_index - max_arg_index) % names.length;
            label = names[sub_index];
          } else {
            label = names;
          }
        }
      } else {
        expected_arg = expected_args[arg_index];
        if (expected_arg) {
          label = expected_arg.name;
        }
      }
      optional = !!expected_arg.optional;
      return [label, optional];
    }
  });

}).call(this);
