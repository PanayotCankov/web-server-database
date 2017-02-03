"use strict";
var express = require("express");
var helmet = require("helmet");
var logs_1 = require("./server/logs");
var bodyParser = require("body-parser");
var APIModule = (function () {
    function APIModule() {
    }
    return APIModule;
}());
exports.APIModule = APIModule;
var App = (function () {
    function App() {
        this.APIModules = [];
        this.express = express();
        this.middleware();
    }
    App.prototype.middleware = function () {
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
    App.prototype.api = function () {
        var router = express.Router();
        for (var i = 0; i < this.APIModules.length; ++i) {
            router.use('/' + this.APIModules[i].name, this.APIModules[i].router);
        }
        router.get('/', function (req, res) { return res.send('This is the root of the API of the api. Thank Trevor Von Seggern!'); });
        this.express.use('/api', router);
    };
    App.prototype.listen = function (port) {
        this.api();
        if (!port)
            port = process.env.PORT || 3000;
        var env = process.env.NODE_ENV || 'dev';
        if (env === 'dev') {
            this.express.set('views', process.cwd());
            this.express.engine('html', require('ejs').renderFile);
            this.express.set('view engine', 'html');
            this.express.get('/', function (req, res, next) { return res.render('index'); });
        }
        this.express.listen(port, function () { return logs_1.default('listening on port: ' + port + ' - ' + env); });
    };
    return App;
}());
exports.App = App;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App();
//# sourceMappingURL=App.js.map