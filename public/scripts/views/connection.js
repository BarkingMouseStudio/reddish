(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.ConnectionView = Backbone.View.extend({
    events: {
      'click a.remove': 'destroy',
      'click a.connect': 'connect',
      'click a.disconnect': 'disconnect'
    },
    tagName: 'li',
    template: _.template($('#connection-template').html()),
    initialize: function(options) {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.close, this);
      return this.$el = $(this.el);
    },
    connect: function(e) {
      var model_json, requires_pass, type, _ref,
        _this = this;
      e.preventDefault();
      if (this.model.get('state') !== 'disconnected') {
        return;
      }
      model_json = this.model.toJSON();
      _ref = this.model.attributes, type = _ref.type, requires_pass = _ref.requires_pass;
      if (type === 'url' && requires_pass) {
        model_json.password = this.$password.val();
      }
      this.$el.find('.button').removeClass('disconnect').addClass('connecting').text('Connecting...');
      this.model.set({
        state: 'connecting'
      });
      return Reddish.socket.emit('reddish:connect', model_json, function(err, reply) {
        if (!reply) {
          _this.model.set({
            state: 'disconnected'
          });
          return;
        }
        _this.model.set({
          state: 'connected'
        });
        _this.$el.find('.button').removeClass('connecting').addClass('disconnect').text('Disconnect');
        return _this.$el.addClass('connected');
      });
    },
    close: function() {
      this.remove();
      this.unbind();
      return this.model.unbind();
    },
    disconnect: function(e) {
      var _this = this;
      e.preventDefault();
      return Reddish.socket.emit('reddish:disconnect', function(err, reply) {
        if (!reply) {
          return _this.model.set({
            state: 'disconnected'
          });
        }
      });
    },
    destroy: function(e) {
      e.preventDefault();
      if (!confirm("Are you sure you want to remove this connection?")) {
        return;
      }
      return this.model.destroy();
    },
    render: function() {
      this.el.innerHTML = this.template(this.model.toJSON());
      this.$password = this.$el.find('input.password');
      return this;
    }
  });

}).call(this);
