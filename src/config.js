const webpack = (config) => Object.assign({}, {
  address: 'localhost',
  port: 4000,
}, config.hotReloadServer);

const devMiddleware = (config, devConfig) => Object.assign({}, {
  noInfo: true,
  publicPath: '/',
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1000,
  },
}, devConfig);

export default { webpack, devMiddleware };
