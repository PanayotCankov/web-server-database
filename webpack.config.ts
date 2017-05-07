import * as path from 'path';
import * as process from 'process';

let entry = path.join(process.cwd(), process.env.SERVER_TARGET || 'client');

export default {
	devtool: '#inline-source-map',
	context: process.cwd(),
	entry: [
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
		extensions: ['.js'],
	},
	plugins: [
	],
	target: 'node',
	node: {
		fs: 'empty',
		helmet: 'empty',
	},
	module: {}
};