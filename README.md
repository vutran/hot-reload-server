# webpack hot-reload-server

Simple hot reload server.

[![NPM](https://nodei.co/npm/hot-reload-server.png?compact=true)](https://nodei.co/npm/hot-reload-server/)

# Usage

**server.js**

````js
import path from 'path';
import webpackConfig from './webpack.config';
import hotReloadServer from '../index';

// create the server
let server = hotReloadServer(webpackConfig);

// expose the public directory
server.expose(path.join(__dirname, 'public'));

// start the server
server.start();
````

**webpack.config.js**

````js
// Load modules
import path from 'path';
import webpack from 'webpack';

// Create an empty config
export default {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'entry.js')
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  hotReloadServer: {
    address: 'localhost',
    port: 4000
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
````

**entry.js**

````js
document.write('It works!');

// check if HMR is enabled
if (module.hot) {
    // accept itself
    module.hot.accept();
}
````

**index.html**

````js
<script type="text/javascript" language="javascript" src="bundle.js"></script>
````

# Changelog

## 0.1.0
 - Rewritten as ES6 module
 - Updated example

## 0.0.4
 - Exposed express and expres app instance
