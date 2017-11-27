'use strict'
const config = require('config')

const basepath = config.basepath

module.exports = {
  get: (req, res) => {
    res.send({basepath})
  }
}
