let webpack = require('webpack');
let path = require('path');
let process = require('process');
let fs = require('fs');

let entry = process.env.SERVER_TARGET || 'client.js';
entry = path.resolve(process.cwd(), entry);

export default {
	devtool: '#eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		entry
	],
	output: {
		publicPath: '/',
		path: process.cwd(),
		filename: 'bundle.js'
	},
	externals: {
		'crypto': 'crypto',
		'$': "$",
	},
	resolve: {
		extensions: ['', '.js'],
		modulesDirectories: ['node_modules', 'bower_components']
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(false),
		new webpack.HotModuleReplacementPlugin()
	],
	target: 'node',
	node: {
		fs: 'empty',
		helmet: 'empty',
	},
	module: {}
};