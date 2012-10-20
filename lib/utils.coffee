# Simple utility functions to handle encoding and encryption

crypto = require 'crypto'


# sha1

exports.sha1 = (data, salt) ->
  return crypto.createHmac('sha1', salt).update(data).digest('hex')


# md5

exports.md5 = (data) ->
  return crypto.createHash('md5').update(data).digest('hex')


# base64

exports.base64 = (value) ->
  return new Buffer(value).toString('base64')
