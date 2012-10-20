(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.KeysView = Backbone.View.extend({
    el: '#keys',
    events: {
      'submit #keys-filter': 'submit'
    },
    initialize: function() {
      _.bindAll(this, 'add', 'resize', 'scroll');
      this.collection.bind('add', this.add, this);
      this.collection.bind('reset', this.reset, this);
      this.collection.bind('remove', this.remove, this);
      this.$el = $(this.el);
      this.$wrapper = this.$el.children('#keys-list-wrapper');
      this.$keys = this.$wrapper.children('#keys-list');
      this.$empty = this.$el.children('#keys-empty');
      this.$filter = this.$el.find('#keys-filter-input');
      this.$wrapper.on('scroll', this.scroll);
      $(window).on('resize', this.resize);
      this.currScroll = this.prevScroll = 0;
      this.startIndex = this.prevStartIndex = 0;
      this.minItemHeight = 68;
      this.wrapperHeight = this.$wrapper.outerHeight();
      this.visibleItems = Math.ceil(this.wrapperHeight / this.minItemHeight);
      this.endIndex = this.prevEndIndex = this.bufferSize = this.visibleItems * 3;
      return this.views = {};
    },
    resize: _.debounce(function() {
      this.wrapperHeight = this.$wrapper.outerHeight();
      this.visibleItems = Math.ceil(this.wrapperHeight / this.minItemHeight);
      return this.bufferSize = this.visibleItems * 3;
    }, 250),
    scroll: _.throttle(function() {
      var direction, end_remove_range, end_render_range, i, model, remove_models, render_models, start_remove_range, start_render_range, _i, _len;
      this.currScroll = this.$wrapper.scrollTop();
      if (this.currScroll > this.prevScroll) {
        direction = 'down';
      } else if (this.currScroll < this.prevScroll) {
        direction = 'up';
      } else {
        return;
      }
      this.prevStartIndex = this.startIndex;
      this.prevEndIndex = this.endIndex;
      this.startIndex = Math.floor(this.currScroll / this.minItemHeight) - this.visibleItems;
      if (this.startIndex < 0) {
        this.startIndex = 0;
      }
      this.endIndex = this.startIndex + this.bufferSize;
      if (direction === 'down') {
        start_render_range = Math.max(this.prevEndIndex, this.startIndex);
        end_render_range = this.endIndex;
        start_remove_range = this.prevStartIndex;
        end_remove_range = this.startIndex;
      } else {
        start_render_range = this.startIndex;
        end_render_range = Math.min(this.prevStartIndex, this.endIndex);
        start_remove_range = this.endIndex;
        end_remove_range = this.prevEndIndex;
      }
      render_models = this.collection.models.slice(start_render_range, end_render_range);
      for (i in render_models) {
        model = render_models[i];
        this.render(model, start_render_range + parseInt(i));
      }
      remove_models = this.collection.models.slice(start_remove_range, end_remove_range);
      for (_i = 0, _len = remove_models.length; _i < _len; _i++) {
        model = remove_models[_i];
        this.remove(model);
      }
      return this.prevScroll = this.currScroll;
    }, 250),
    submit: function(e) {
      var command, filter,
        _this = this;
      e.preventDefault();
      this.$filter.val(filter = this.$filter.val() || '*');
      return Reddish.socket.emit('reddish:command', command = 'KEYS', filter, function(err, reply) {
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
    add: function(model) {
      var index, length;
      length = this.collection.length;
      index = length - 1;
      if ((this.startIndex <= index && index < this.endIndex)) {
        this.render(model, index);
      }
      this.$keys.css({
        height: length * this.minItemHeight
      });
      return this.$empty.hide();
    },
    render: function(model, index) {
      var el, view;
      view = new Reddish.KeyView({
        model: model
      });
      this.views[model.cid] = view;
      el = view.render().el;
      el.style.top = "" + (index * this.minItemHeight) + "px";
      return this.$keys.append(el);
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
      this.$keys.css({
        height: 0
      });
      if (this.collection.length) {
        this.$empty.hide();
      } else {
        this.$empty.show();
      }
      return this.collection.each(this.add);
    }
  });

}).call(this);
