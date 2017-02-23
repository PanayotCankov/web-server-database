"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var logs_1 = require("./logs");
var webpack_config_1 = require("../webpack.config");
var helmet = require("helmet");
var bodyParser = require("body-parser");
var Application = (function () {
    function Application() {
        this.APIModules = [];
        this.webpackConfig = webpack_config_1.default;
        this.express = express();
        this.middleware();
    }
    Application.prototype.middleware = function () {
        this.express.use(helmet({ hidePoweredBy: false }));
        this.express.use(function (req, res, next) {
            res.header("X-Powered-By", "Blood, sweat, and tears!");
            next();
        });
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
        this.express.get('/logs', function (req, res) {
            res.json(logs_1.privateLogs);
        });
    };
    Application.prototype.api = function () {
        var router = express.Router();
        for (var i = 0; i < this.APIModules.length; ++i) {
            router.use('/' + this.APIModules[i].name, this.APIModules[i].router);
        }
        router.get('/', function (req, res) { return res.send('This is the root of the API of the api. Thank Trevor Von Seggern!'); });
        this.express.use('/api', router);
    };
    Application.prototype.listen = function (port) {
        this.api();
        if (!port)
            port = process.env.PORT || 3000;
        var env = process.env.NODE_ENV || 'dev';
        if (env === 'dev') {
            var webpack = require('webpack');
            var webpackDevMiddleware = require('webpack-dev-middleware');
            var webpackHotMiddleware = require('webpack-hot-middleware');
            var compiler = webpack(this.webpackConfig);
            this.express.use(webpackDevMiddleware(compiler, {
                publicPath: this.webpackConfig.output.publicPath,
                stats: { colors: true }
            }));
            this.express.use(webpackHotMiddleware(compiler, {
                log: console.log,
                noInfo: true,
                reload: true,
            }));
            this.express.set('views', process.cwd());
            this.express.engine('html', require('ejs').renderFile);
            this.express.set('view engine', 'html');
            this.express.get('/', function (req, res, next) { return res.render('index'); });
        }
        else {
            console.log('Production env. Make sure that bundle.js script exists!');
        }
        this.express.use('/', express.static(process.cwd()));
        this.express.listen(port, function () { return logs_1.default('listening on port: ' + port + ' - ' + env); });
    };
    return Application;
}());
exports.Application = Application;
var app = new Application();
exports.App = app;
exports.default = app;
//# sourceMappingURL=App.js.map