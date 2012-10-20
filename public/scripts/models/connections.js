(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.ConnectionModel = Backbone.Model.extend({
    defaults: {
      key: null,
      name: null,
      password: null,
      requires_pass: false,
      type: 'name',
      state: 'disconnected'
    }
  });

  Reddish.ConnectionsCollection = Backbone.Collection.extend({
    url: '/connections',
    model: Reddish.ConnectionModel
  });

}).call(this);
