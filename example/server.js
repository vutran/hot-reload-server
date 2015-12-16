'use strict'

const webpackConfig = require('./webpack.config')

let hotReloadServer = require('../hot-reload-server')

hotReloadServer(webpackConfig, {
  publicPath: '/dist'
}).start()
