'use strict';

// enable debugging
process.env.DEBUG = '*';
process.env.DEBUG_COLORS = 1;

import path from 'path';
import webpackConfig from './webpack.config';
import hotReloadServer from '../index';

// create the server
let server = hotReloadServer(webpackConfig);

// expose the public directory
server.expose(path.join(__dirname, 'public'));

// start the server
server.start();
