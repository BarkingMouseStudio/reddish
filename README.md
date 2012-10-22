reddish
=======

A self-hosted version of reddish, a redis visual admin. Use it to inspect
and monitor your redis instances.

Check out the hosted service at http://reddi.sh or
https://reddish.herokuapp.com (for SSL)

[Project page](http://freeflow.github.com/reddish)

[Docco docs](http://freeflow.github.com/reddish/docs/main.html)


Install
-------

`npm install -g reddish`


Run
---

1. Start a redis server to store connection info: `redis-server`
2. Start reddish: `reddish`


Configuration
-------------

Options you can modify in the `config.json` file installed with reddish:

  * `port`: The port to serve the webapp from. Default: `3000`

  * `endpoint_ports`: Two ports for reddish-proxy to connect to.
                      Default: `[8000, 8001]`

  * `session_secret`: Secret used to create session keys.
                      Default: `REDDISH_SESSION_SECRET_GOES_HERE`

  * `proxy_key_salt`: Salt used to create proxy keys.
                      Default: `REDDISH_PROXY_KEY_SALT_GOES_HERE`

  * `secure`: Whether or not to use SSL (for the app) and TLS (for the proxy).
              Will look for `./certs/` in the reddish installation. This
              folder should contain an `index.js` that exports the loaded
              certificate files that Express2 expects:

        // index.js
        var fs = require('fs');

        module.exports = {
          key: fs.readFileSync(__dirname + '/certificate.key').toString(),
          cert: fs.readFileSync(__dirname + '/certificate.cert').toString(),
          ca: fs.readFileSync(__dirname + '/certificate.ca').toString()
        }


    Default: `false`

  * `redis_auth`: Password to use when connecting to the local redis instance.
                  Default: `false`


Proxying
--------

Reddish supports connecting to local redis instances via a proxy that
can connect to any publically accessible reddish server and proxy commands.

See: https://github.com/FreeFlow/reddish-proxy


Contributing
------------

Please do! There are a lot of redis commands and potential features that would be great
to support.
