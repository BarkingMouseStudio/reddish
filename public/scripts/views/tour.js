(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.TourView = Backbone.View.extend({
    el: '#tour',
    template: _.template($('#tour-template').html()),
    events: {
      'click a#tour-next': 'next',
      'click a#tour-cancel': 'hide'
    },
    initialize: function() {
      _.bindAll(this, 'hide');
      this.$el = $(this.el);
      this.$overlay = $('#overlay');
      this.$overlay.on('click', this.hide);
      return this.index = 0;
    },
    show: function() {
      this.$el.fadeIn(500);
      return this.$overlay.fadeIn(500);
    },
    hide: function() {
      var prevFocusSelector, prevModel;
      this.$el.fadeOut(500);
      this.$overlay.fadeOut(500);
      prevModel = this.collection.at(this.index);
      if (prevModel && (prevFocusSelector = prevModel.focusSelector)) {
        $(prevFocusSelector).removeClass('focused');
      }
      return this.index = 0;
    },
    next: function() {
      if (!(this.index < this.collection.length - 1)) {
        this.hide();
        return;
      }
      return this.render(++this.index);
    },
    render: function() {
      var callback, focusSelector, model, prevFocusSelector, prevModel;
      prevModel = this.collection.at(this.index - 1);
      model = this.collection.at(this.index);
      model.set({
        index: this.index + 1
      });
      model.set({
        length: this.collection.length
      });
      this.el.innerHTML = this.template(model.toJSON());
      this.el.className = model.get('className');
      if (prevModel && (prevFocusSelector = prevModel.get('focusSelector'))) {
        $(prevFocusSelector).removeClass('focused');
      }
      if (focusSelector = model.get('focusSelector')) {
        $(focusSelector).addClass('focused');
      }
      if (callback = model.get('callback')) {
        callback();
      }
      return this;
    }
  });

}).call(this);
