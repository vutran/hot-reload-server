# webpack hot-reload-server

Launch a simple hot reload server via Express, webpack-dev-middleware, and webpack-hot-middleware.

[![NPM](https://nodei.co/npm/hot-reload-server.png?compact=true)](https://nodei.co/npm/hot-reload-server/)

# Usage

````js
// load the webpack config file
const webpackConfig = require('./webpack.config')

// load the hot-reload-server module
let hotReloadServer = require('../hot-reload-server')

// create and start the server
hotReloadServer(webpackConfig, {
  publicPath: '/dist'
}).start()
````
