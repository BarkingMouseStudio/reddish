(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.KeyView = Backbone.View.extend({
    events: {
      'click a.open': 'open',
      'click a.del': 'del'
    },
    tagName: 'li',
    template: _.template($('#key-template').html()),
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change:ttl', this.render_ttl, this);
      this.model.bind('change:deleted', this.render_deleted, this);
      this.model.bind('change:active', this.render_active, this);
      this.model.bind('remove', this.close, this);
      return this.$el = $(this.el);
    },
    open: function(e) {
      var args, command, _ref,
        _this = this;
      e.preventDefault();
      this.model.set({
        opened: true
      });
      _ref = this.model.attributes, command = _ref.val_cmd_name, args = _ref.val_cmd_args;
      return Reddish.socket.emit('reddish:command', command, args, function(err, reply) {
        if (err) {
          Reddish.Collections.messages.add({
            message: "" + command + ": " + err,
            type: 'error'
          });
          return;
        }
        return Reddish.Collections.messages.add({
          message: "" + command + ": " + reply,
          type: 'info'
        });
      });
    },
    del: function(e) {
      var args, command, _ref,
        _this = this;
      e.preventDefault();
      _ref = this.model.attributes, command = _ref.del_cmd_name, args = _ref.del_cmd_args;
      if (!confirm("Are you sure you want to delete this key?\n`" + (this.model.get('del_cmd_str')) + "`")) {
        return;
      }
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
        if (reply) {
          return _this.model.set({
            deleted: true
          });
        }
      });
    },
    render_active: function() {
      var active;
      if (active = this.model.get('active')) {
        return this.$el.addClass('active');
      } else {
        return this.$el.removeClass('active');
      }
    },
    render_deleted: function() {
      var deleted;
      if (deleted = this.model.get('deleted')) {
        return this.$el.addClass('deleted');
      } else {
        return this.$el.removeClass('deleted');
      }
    },
    render_ttl: function() {
      var time, ttl;
      ttl = this.model.get('ttl');
      if (ttl > 0) {
        time = Reddish.utils.relativeTime(Date.now() + (ttl * 1000));
        this.$ttl.text(time);
        return this.update_ttl();
      }
    },
    update_ttl: function() {
      var ttl,
        _this = this;
      clearTimeout(this.timeout);
      ttl = this.model.get('ttl');
      if (ttl === 0) {
        this.model.set({
          deleted: true
        });
        return;
      }
      if (ttl > 0) {
        return this.timeout = setTimeout(function() {
          return _this.model.set({
            ttl: --ttl
          });
        }, 1000);
      }
    },
    close: function() {
      clearTimeout(this.timeout);
      this.remove();
      this.unbind();
      return this.model.unbind();
    },
    render: function() {
      this.el.innerHTML = this.template(this.model.toJSON());
      this.$ttl = this.$('.ttl');
      this.update_ttl();
      return this;
    }
  });

}).call(this);
