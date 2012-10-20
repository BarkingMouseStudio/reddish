(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.MessageModel = Backbone.Model.extend({
    defaults: {
      type: 'info',
      message: null
    }
  });

  Reddish.MessagesCollection = Backbone.Collection.extend({
    model: Reddish.MessageModel
  });

}).call(this);
