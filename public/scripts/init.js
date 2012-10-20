
  Reddish.Collections.tour.reset([
    {
      message: '<strong>Welcome to Reddish!</strong> Click <strong>next</strong> to start the tour.',
      className: 'tour tour-welcome'
    }, {
      message: 'In Reddish there are two types of <strong>connections</strong> for redis stores...',
      className: 'tour tour-connections',
      focusSelector: '#connections',
      callback: function() {
        return Reddish.Views.connections.show();
      }
    }, {
      message: '<strong>Connections</strong> to public instances can be created using a redis url (e.g. "redis://my_domain_name")...',
      className: 'tour tour-connections',
      focusSelector: '#connections'
    }, {
      message: '<strong>Connections</strong> to local instances can be created using the <a href="https://github.com/FreeFlow/reddish-proxy" target="_blank">reddish-proxy</a> tool. Just enter a string name like &quot;Test&quot;...',
      className: 'tour tour-connections',
      focusSelector: '#connections'
    }, {
      message: 'If your instance uses a <strong>password</strong> you can either enter it in the url (e.g. "redis://:my_password@my_domain_name")<br> or check the password checkbox so it won\'t be stored on our servers (but you\'ll need to enter it each time you connect).',
      className: 'tour tour-connections',
      focusSelector: '#connections'
    }, {
      message: 'The <strong>keys</strong> panel displays a list of keys available in the current database.',
      className: 'tour tour-keys',
      focusSelector: '#keys'
    }, {
      message: 'The <strong>values</strong> panel displays a list of values on the selected key.',
      className: 'tour tour-vals',
      focusSelector: '#values'
    }, {
      message: 'The <strong>CLI</strong> allows entering arbitrary commands.',
      className: 'tour tour-cli',
      focusSelector: '#cli'
    }
  ]);

  Backbone.history.start();
