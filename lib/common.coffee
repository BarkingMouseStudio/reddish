{ redis_auth } = require '../config'

exports.redis = redis = require('redis').createClient()
redis.on 'error', (err) -> console.error(err)
redis.auth(redis_auth) if redis_auth

exports.redback = redback = require('redback').createClient()
redback.client.on 'error', (err) -> console.error(err)
redback.client.auth(redis_auth) if redis_auth

exports.proxies_set = redback.createSet('keys:connections')

Pool = require './Pool'
exports.proxies = new Pool()
