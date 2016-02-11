'use strict';

import webpackConfig from './webpack.config';
import hotReloadServer from '../index';

// enable debugging
process.env.DEBUG = '*';

// create the server
let server = hotReloadServer(webpackConfig, {
  publicPath: '/dist'
});

// start the server
server.start();
