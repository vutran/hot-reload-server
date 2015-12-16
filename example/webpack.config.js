'use strict'

// Load modules
const path = require('path')

// Create an empty config
const config = {}

// Specify the hot-reload-server configs
config.hotReloadServer = {
	address: 'localhost',
	port: 4000
}

// webpack entry point
config.entry = [
	path.join(__dirname, '/entry.js')
]

// webpack output
config.output = {
	path: path.join(__dirname, '/dist'),
	filename: 'bundle.js'
}

// Export module
module.exports = config
