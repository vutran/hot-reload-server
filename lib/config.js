'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var webpack = function webpack(config) {
  return Object.assign({}, {
    address: 'localhost',
    port: 4000
  }, config.hotReloadServer);
};

var devMiddleware = function devMiddleware(config, devConfig) {
  return Object.assign({}, {
    noInfo: true,
    publicPath: '/',
    watchOptions: {
      aggregateTimeout: 1000,
      poll: 1000
    }
  }, devConfig);
};

exports.default = { webpack: webpack, devMiddleware: devMiddleware };