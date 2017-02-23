"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require('webpack');
var path = require('path');
var process = require('process');
var fs = require('fs');
var entry = '';
if (process.env.SERVER_TARGET) {
    entry = process.env.SERVER_TARGET;
}
else {
    if (fs.existsSync(path.join(process.cwd(), './package.json'))) {
        var pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf8'));
        if (pkg && pkg.main)
            entry = pkg.main;
    }
    if (entry !== '') {
        if (fs.existsSync(path.join(process.cwd(), './index.js'))) {
            entry = './index.js';
        }
        else if (fs.existsSync(path.join(process.cwd(), './module.js'))) {
            entry = './module.js';
        }
    }
}
entry = path.resolve(process.cwd(), entry);
exports.default = {
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
//# sourceMappingURL=webpack.config.js.map