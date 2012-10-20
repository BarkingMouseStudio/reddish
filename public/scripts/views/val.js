(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.ValueView = Backbone.View.extend({
    events: {
      'click a.del': 'del',
      'click a.edit-toggle': 'toggle_edit',
      'click a.edit-cancel': 'hide_edit',
      'submit form.edit-view': 'submit_edit'
    },
    tagName: 'li',
    template: _.template($('#value-template').html()),
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      return this.$el = $(this.el);
    },
    toggle_edit: function(e) {
      var editing;
      e.preventDefault();
      if (editing = this.$el.hasClass('editing')) {
        return this.hide_edit(e);
      } else {
        return this.show_edit(e);
      }
    },
    show_edit: function(e) {
      e.preventDefault();
      this.$el.addClass('editing');
      return this.$edit_value.val(this.model.get('raw'));
    },
    hide_edit: function(e) {
      e.preventDefault();
      this.$el.removeClass('editing');
      return this.$edit_value.val('');
    },
    submit_edit: function(e) {
      var args, command, raw, _ref,
        _this = this;
      e.preventDefault();
      _ref = this.model.attributes, command = _ref.edit_cmd_name, args = _ref.edit_cmd_args;
      args.push(raw = this.$edit_value.val());
      Reddish.socket.emit('reddish:command', command, args, function(err, reply) {
        var value;
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
        value = Reddish.utils.escapeValue(raw);
        _this.model.set({
          value: value,
          raw: raw
        });
        return _this.hide_edit(e);
      });
      return args.pop();
    },
    del: function(e) {
      var args, command, del_cmd_str, _ref,
        _this = this;
      e.preventDefault();
      _ref = this.model.attributes, command = _ref.del_cmd_name, args = _ref.del_cmd_args, del_cmd_str = _ref.del_cmd_str;
      if (!confirm("Are you sure you want to delete this value?\n`" + del_cmd_str + "`")) {
        return;
      }
      return Reddish.socket.emit('reddish:command', command, args, function(err, reply) {
        var _ref1;
        if (err) {
          Reddish.colllections.messages.add({
            message: "" + command + ": " + err,
            type: 'error'
          });
          return;
        }
        Reddish.Collections.messages.add({
          message: "" + command + ": " + reply,
          type: 'info'
        });
        if (reply) {
          _this.model.set({
            deleted: true
          });
          return (_ref1 = Reddish.Collections.keys.get(_this.model.get('key'))) != null ? _ref1.set({
            deleted: true
          }) : void 0;
        }
      });
    },
    render_deleted: function() {
      var deleted;
      if (deleted = this.model.get('deleted')) {
        return this.$el.addClass('deleted');
      } else {
        return this.$el.removeClass('deleted');
      }
    },
    close: function() {
      this.remove();
      this.unbind();
      return this.model.unbind();
    },
    render: function() {
      this.el.innerHTML = this.template(this.model.toJSON());
      if (this.model.has('edit_cmd_name')) {
        this.$edit_view = this.$el.children('.edit-view');
        this.$edit_value = this.$edit_view.children('.edit-value');
      }
      return this;
    }
  });

}).call(this);
