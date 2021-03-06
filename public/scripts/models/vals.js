(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.ValueModel = Backbone.Model.extend({
    defaults: {
      field: null,
      value: null,
      key: null,
      raw: null,
      type: null,
      deleted: false
    }
  });

  Reddish.ValuesCollection = Backbone.Collection.extend({
    model: Reddish.ValueModel
  });

}).call(this);
