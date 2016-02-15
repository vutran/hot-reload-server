'use strict';

// Load dependencies

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (webpackConfig) {
  var devMiddlewareConfig = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


  // Create the webpack compiler
  var webpackCompiler = (0, _webpack2.default)(webpackConfig);

  // Set the configs
  var hrsConfigs = _config2.default.webpack(webpackConfig);

  // Override webpack-dev-middleware configs
  devMiddlewareConfig = _config2.default.devMiddleware(devMiddlewareConfig);

  // Create the hot reload server
  var app = (0,
  // expose the express module
  _express2.default)();

  // Attach webpack-dev-middleware and webpack-hot-middleware
  app.use((0, _webpackDevMiddleware2.default)(webpackCompiler, webpackConfig, devMiddlewareConfig));
  app.use((0, _webpackHotMiddleware2.default)(webpackCompiler));

  // Create static directories
  app.use(_path2.default.basename(webpackConfig.output.path), _express2.default.static(webpackConfig.output.path));

  return {
    /**
     * Starts the hot-reload-server
     */
    start: function start() {
      // Listen to the port
      var server = app.listen(hrsConfigs.port, function (err, result) {
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
    expose: function expose(directory) {
      app.use(_express2.default.static(directory));
    },
    // expose hrsConfigs
    hrsConfigs: hrsConfigs, express: _express2.default,
    // expose the express app
    app: app
  };
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug');

// create a debugger
var info = debug('hot-reload-server:info');
info.log = console.log.bind(console);

/**
 * @param webpackConfig
 * @param object devMiddlewareConfig          See options: https://github.com/webpack/webpack-dev-middleware
 */
;