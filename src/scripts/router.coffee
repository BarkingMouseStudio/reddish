window.Reddish or= {}

Reddish.Router = Backbone.Router.extend

  routes:
    'tour': 'tour'

  tour: ->
    Reddish.Views.tour.render().show()
