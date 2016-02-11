'use strict';

// Load modules
import path from 'path';

// Create an empty config
export default {
	entry: [
		path.join(__dirname, 'entry.js')
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	hotReloadServer: {
		address: 'localhost',
		port: 4000
	}
};
