let webpack = require('webpack');
let path = require('path');

export default {
	devtool: '#eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.resolve(__dirname, './module.js')
	],
	output: {
		publicPath: '/',
		path: __dirname,
		filename: 'bundle.js'
	},
	externals: {
		'angular': 'angular',
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
	target: 'web',
	module: {}
};