# webpack hot-reload-server

A simple webpack hot reload server using [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)

# Usage

````
// load the webpack config file
const webpackConfig = require('./webpack.config')

// load the hot-reload-server module
let hotReloadServer = require('../hot-reload-server')

// create and start the server
hotReloadServer(webpackConfig, {
  publicPath: '/dist'
}).start()
````
