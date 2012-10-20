(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.MessageView = Backbone.View.extend({
    el: '#message',
    template: _.template($('#message-template').html()),
    initialize: function() {
      this.collection.bind('add', this.add, this);
      this.collection.bind('remove', this.remove, this);
      return this.$el = $(this.el);
    },
    add: function(model) {
      if (this.collection.length === 1) {
        return this.show(model);
      }
    },
    remove: function(model) {
      var _this = this;
      return this.$el.fadeOut(500, function() {
        if (!_this.collection.length) {
          return;
        }
        return _this.show(_this.collection.first());
      });
    },
    show: function(model) {
      var _this = this;
      this.el.innerHTML = this.template(model.toJSON());
      return this.$el.fadeIn(500, function() {
        return setTimeout(function() {
          return _this.collection.remove(model);
        }, 2000);
      });
    }
  });

}).call(this);
