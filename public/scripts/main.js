(function() {
  var first_ready, handle_disconnect;

  window.Reddish || (window.Reddish = {});

  Reddish.socket = io.connect();

  Reddish.Collections = {
    connections: new Reddish.ConnectionsCollection(),
    keys: new Reddish.KeysCollection(),
    vals: new Reddish.ValuesCollection(),
    messages: new Reddish.MessagesCollection(),
    tour: new Reddish.TourCollection()
  };

  Reddish.Views = {
    cli: new Reddish.CLIView(),
    connections: new Reddish.ConnectionsView({
      collection: Reddish.Collections.connections
    }),
    keys: new Reddish.KeysView({
      collection: Reddish.Collections.keys
    }),
    vals: new Reddish.ValuesView({
      collection: Reddish.Collections.vals
    }),
    message: new Reddish.MessageView({
      collection: Reddish.Collections.messages
    }),
    tour: new Reddish.TourView({
      collection: Reddish.Collections.tour
    })
  };

  Reddish.router = new Reddish.Router();

  first_ready = true;

  Reddish.socket.on('error', function(err) {
    return Reddish.Collections.messages.add({
      message: err,
      type: 'error'
    });
  });

  Reddish.socket.on('connect', function() {
    return Reddish.Collections.connections.fetch();
  });

  Reddish.socket.on('redis:ready', function() {
    var command,
      _this = this;
    if (!first_ready) {
      return;
    }
    first_ready = false;
    return Reddish.socket.emit('reddish:command', command = 'KEYS', '*', function(err, reply) {
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
  });

  Reddish.socket.on('redis:reset:vals', function() {
    return Reddish.Collections.vals.reset();
  });

  Reddish.socket.on('redis:reset:keys', function() {
    var info;
    return Reddish.Collections.keys.reset(info = {
      id: 'INFO',
      type: 'info',
      val_cmd_name: 'INFO',
      val_cmd_str: 'INFO'
    });
  });

  handle_disconnect = function() {
    first_ready = true;
    Reddish.Collections.keys.reset();
    Reddish.Collections.vals.reset();
    return Reddish.Collections.connections.forEach(function(model) {
      return model.set({
        state: 'disconnected'
      });
    });
  };

  Reddish.socket.on('disconnect', handle_disconnect);

  Reddish.socket.on('redis:end', handle_disconnect);

  Reddish.socket.on('redis:key', function(key) {
    var model;
    if (model = Reddish.Collections.keys.get(key.id)) {
      key.deleted = false;
      model.clear({
        silent: true
      }).set(key);
      return;
    }
    return Reddish.Collections.keys.add(key);
  });

  Reddish.socket.on('redis:key:remove', function(key) {
    var model;
    if (model = Reddish.Collections.keys.get(key.id)) {
      return model.set({
        deleted: true
      });
    }
  });

  Reddish.socket.on('redis:val', function(val) {
    var model;
    if (model = Reddish.Collections.vals.get(val.id)) {
      model.clear({
        silent: true
      }).set(val);
      return;
    }
    return Reddish.Collections.vals.add(val);
  });

  Reddish.socket.on('redis:val:remove', function(val) {
    var model;
    if (model = Reddish.Collections.vals.get(val.id)) {
      return model.set({
        deleted: true
      });
    }
  });

}).call(this);
