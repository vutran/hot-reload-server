// enable debugging
process.env.DEBUG = '*';
process.env.DEBUG_COLORS = 1;

import path from 'path';
import webpackConfig from './webpack.config';
import hotReloadServer from '../lib/index';

// create the server
const server = hotReloadServer(webpackConfig);

// expose the public directory
server.expose(path.join(__dirname, 'public'));

// start the server
server.start();
