'use strict'

// Load dependencies
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

// Export the module
module.exports = function(webpackConfig, devMiddlewareConfig) {

  // Create the webpack compiler
  const webpackCompiler = webpack(webpackConfig)

  // Create the hot reload server
  let app = express()

  // Set the address/port
  webpackConfig.hotReloadServer = Object.assign({}, {
    address: 'localhost',
    port: 4000
  }, webpackConfig.hotReloadServer)

  // Set the default webpack-dev-middleware configs
  let defaults = {
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 1000,
      poll: 1000
    }
  }

  return {
    // starts the hot-reload-server
    start: function() {
      // Override webpack-dev-middleware configs
      devMiddlewareConfig = Object.assign({}, defaults, devMiddlewareConfig)

      // Attach webpack-dev-middleware and webpack-hot-middleware
      app.use(webpackDevMiddleware(webpackCompiler, devMiddlewareConfig))
      app.use(webpackHotMiddleware(webpackCompiler))

      // Create static directories
      app.use(path.basename(webpackConfig.output.path), express.static(webpackConfig.output.path))

      // Listen to the port
      let server = app.listen(webpackConfig.hotReloadServer.port, function(err, result) {
        if (err) {
          console.log(err)
        }
        console.log('hot-reload-server running on http://%s:%s', webpackConfig.hotReloadServer.address, webpackConfig.hotReloadServer.port)
      })
    },
    // expose the express module
    express : express,
    app : app
  }

}
