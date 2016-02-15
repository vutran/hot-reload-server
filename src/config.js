'use strict';

let webpack = (config) => {

  return Object.assign({}, {
    address: 'localhost',
    port: 4000
  }, config.hotReloadServer);

};

let devMiddleware = (config, devConfig) => {

  // Override configs
  return Object.assign({}, {
    noInfo: true,
    publicPath: '/',
    watchOptions: {
      aggregateTimeout: 1000,
      poll: 1000
    }
  }, devConfig);

};

export default { webpack, devMiddleware };
