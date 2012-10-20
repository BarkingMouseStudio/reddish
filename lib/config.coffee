fs = require 'fs'
path = require 'path'

config_json = fs.readFileSync(path.join(__dirname, '../config.json'))

if config_json
  try
    config = JSON.parse(config_json)
  catch err
    console.error err

module.exports = config or {}
