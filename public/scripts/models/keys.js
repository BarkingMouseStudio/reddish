(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.KeyModel = Backbone.Model.extend({
    defaults: {
      type: null,
      ttl: -1,
      val_cmd_name: null,
      val_cmd_args: null,
      val_cmd_str: null,
      del_cmd_name: null,
      del_cmd_args: null,
      del_cmd_str: null,
      deleted: false,
      active: false
    }
  });

  Reddish.KeysCollection = Backbone.Collection.extend({
    model: Reddish.KeyModel
  });

}).call(this);
