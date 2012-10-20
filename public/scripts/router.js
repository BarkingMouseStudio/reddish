(function() {

  window.Reddish || (window.Reddish = {});

  Reddish.Router = Backbone.Router.extend({
    routes: {
      'tour': 'tour'
    },
    tour: function() {
      return Reddish.Views.tour.render().show();
    }
  });

}).call(this);
