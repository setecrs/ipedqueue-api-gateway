'use strict'

const SwaggerExpress = require('swagger-express-mw')
const config = require('config')
const app = require('express')()
module.exports = app // for testing

const swaggerConfig = {
  appRoot: __dirname // required config
}

SwaggerExpress.create(swaggerConfig, function (err, swaggerExpress) {
  if (err) { throw err }

  // enable SwaggerUI
  app.use(swaggerExpress.runner.swaggerTools.swaggerUi())

  // install middleware
  swaggerExpress.register(app)

  app.listen(config.port, err => {
    if (err) { return console.log(err) }
    console.log('Listening on port', config.port)
  })
})
