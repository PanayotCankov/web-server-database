let webpack = require('webpack');
let path = require('path');
let process = require('process');
let fs = require('fs');

let entry = '';
// try to load from package.json
if (process.env.SERVER_TARGET) {
	entry = process.env.SERVER_TARGET;
} else {
	if (fs.existsSync(path.join(process.cwd(), './package.json'))) {
		let pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf8'));
		if (pkg && pkg.main)
			entry = pkg.main;
	}
	if (entry !== '') {
		if (fs.existsSync(path.join(process.cwd(), './index.js'))) {
			entry = './index.js';
		} else if (fs.existsSync(path.join(process.cwd(), './module.js'))) {
			entry = './module.js';
		}
	}
}
entry = path.resolve(process.cwd(), entry);


export default {
	devtool: '#inline-source-map',

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