'use strict';

// Load dependencies
import debug from 'debug';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// create a debugger
let logger = debug('hot-reload-server');
logger.log = console.log.bind(console);

// Export the module
export default function(webpackConfig, devMiddlewareConfig) {

  // Create the webpack compiler
  const webpackCompiler = webpack(webpackConfig);

  // Create the hot reload server
  let app = express();

  // Set the configs
  const configs = Object.assign({}, {
    address: 'localhost',
    port: 4000
  }, webpackConfig.hotReloadServer);

  // Set the default webpack-dev-middleware configs
  let defaults = {
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 1000,
      poll: 1000
    }
  };

  // Override webpack-dev-middleware configs
  devMiddlewareConfig = Object.assign({}, defaults, devMiddlewareConfig);

  // Attach webpack-dev-middleware and webpack-hot-middleware
  app.use(webpackDevMiddleware(webpackCompiler, devMiddlewareConfig));
  app.use(webpackHotMiddleware(webpackCompiler));

  // Create static directories
  app.use(path.basename(webpackConfig.output.path), express.static(webpackConfig.output.path));

  return {
    // starts the hot-reload-server
    start: () => {
      // Listen to the port
      let server = app.listen(configs.port, (err, result) => {
        if (err) {
          logger(err);
        }
        logger('Running on http://%s:%s', configs.address, configs.port);
      });
    },
    // expose configs
    configs,
    // expose the express module
    express,
    // expose the express app
    app
  };

};
