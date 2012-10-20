window.Reddish or= {}

Reddish.TourModel = Backbone.Model.extend

  defaults:
    message: null
    className: 'tour'


Reddish.TourCollection = Backbone.Collection.extend

  model: Reddish.TourModel
