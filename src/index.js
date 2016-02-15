'use strict';

// Load dependencies
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './config';
const debug = require('debug');

// create a debugger
let info = debug('hot-reload-server:info');
info.log = console.log.bind(console);

/**
 * @param webpackConfig
 * @param object devMiddlewareConfig          See options: https://github.com/webpack/webpack-dev-middleware
 */
export default function(webpackConfig, devMiddlewareConfig = {}) {

  // Create the webpack compiler
  const webpackCompiler = webpack(webpackConfig);

  // Set the configs
  const hrsConfigs = config.webpack(webpackConfig);

  // Override webpack-dev-middleware configs
  devMiddlewareConfig = config.devMiddleware(devMiddlewareConfig);

  // Create the hot reload server
  let app = express();

  // Attach webpack-dev-middleware and webpack-hot-middleware
  app.use(webpackDevMiddleware(webpackCompiler, webpackConfig, devMiddlewareConfig));
  app.use(webpackHotMiddleware(webpackCompiler));

  // Create static directories
  app.use(path.basename(webpackConfig.output.path), express.static(webpackConfig.output.path));

  return {
    /**
     * Starts the hot-reload-server
     */
    start: () => {
      // Listen to the port
      let server = app.listen(hrsConfigs.port, (err, result) => {
        if (err) {
          info(err);
        }
        info('Running on http://%s:%s', hrsConfigs.address, hrsConfigs.port);
      });
    },
    /**
     * Exposes a public directory
     *
     * @param string directory
     */
    expose: (directory) => {
      app.use(express.static(directory));
    },
    // expose hrsConfigs
    hrsConfigs,
    // expose the express module
    express,
    // expose the express app
    app
  };

};
