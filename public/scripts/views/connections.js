(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.ConnectionsView = Backbone.View.extend({
    el: '#connections',
    events: {
      'click #connections-toggle': 'toggle',
      'submit #connection-create': 'submit'
    },
    initialize: function() {
      _.bindAll(this, 'add');
      this.collection.bind('add', this.add, this);
      this.collection.bind('remove', this.remove, this);
      this.collection.bind('reset', this.reset, this);
      this.collection.bind('change:state', this.update, this);
      this.$el = $(this.el);
      this.$list = this.$('#connections-list');
      this.$last = this.$list.children('li:last-child');
      this.$form = this.$('#connection-create');
      this.$name = this.$form.find('#connection-name');
      this.$pass = this.$form.find('#connection-pass');
      this.$toggle = this.$('#connections-toggle');
      this.open = false;
      return this.views = {};
    },
    hide: function() {
      this.open = false;
      this.$toggle.removeClass('active');
      return this.$list.slideUp();
    },
    show: function() {
      this.open = true;
      this.$toggle.addClass('active');
      return this.$list.slideDown();
    },
    update: function(model, state) {
      if (model.get('state') !== 'disconnected') {
        return;
      }
      this.$list.children('li:not(:last-child)').removeClass('connected').find('.button').removeClass('disconnect connecting').text('Connect');
      Reddish.Collections.keys.reset();
      return Reddish.Collections.vals.reset();
    },
    toggle: function(e) {
      e.preventDefault();
      this.open = !this.open;
      this.$toggle.toggleClass('active');
      return this.$list.slideToggle();
    },
    submit: function(e) {
      var _this = this;
      e.preventDefault();
      return $.post(this.$form.attr('action'), this.$form.serialize(), function(reply) {
        var err, existing;
        if (err = reply.error) {
          Reddish.Collections.messages.add({
            message: err,
            type: 'error'
          });
          return;
        }
        if (reply) {
          existing = _this.collection.get(reply.id);
          if (existing) {
            existing.set(reply);
          } else {
            _this.collection.add(reply);
          }
          _this.$name.val('');
          return _this.$pass.attr('checked', false);
        }
      });
    },
    add: function(model) {
      var view;
      view = new Reddish.ConnectionView({
        model: model
      });
      this.views[model.cid] = view;
      return this.$last.before(view.render().el);
    },
    remove: function(model) {
      var view;
      view = this.views[model.cid];
      if (view != null) {
        view.close();
      }
      return delete this.views[model.cid];
    },
    reset: function() {
      _.each(this.views, function(view) {
        return view.close();
      });
      if (!this.collection.length) {
        Reddish.Views.tour.render().show();
        return;
      }
      return this.collection.each(this.add);
    }
  });

}).call(this);
