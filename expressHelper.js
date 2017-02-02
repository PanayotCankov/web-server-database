"use strict";
var helmet = require("helmet");
var bodyParser = require("body-parser");
function MakeExpressAppMoreSecure(app) {
    app.use(helmet({ hidePoweredBy: false }));
    app.use(function (req, res, next) {
        res.header("X-Powered-By", "Blood, sweat, and tears!");
        next();
    });
}
exports.MakeExpressAppMoreSecure = MakeExpressAppMoreSecure;
function CommonExpressConfig(app) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
}
exports.CommonExpressConfig = CommonExpressConfig;
function ExposeApp(app) {
    var env = process.env.NODE_ENV || 'dev';
    if (env === 'dev') {
        app.set('views', process.cwd());
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
        app.get('/', function (req, res, next) { return res.render('index'); });
    }
    var port = 3000;
    if (process.env.PORT)
        port = process.env.PORT;
    app.listen(port, function () { return console.log('listening on port: ' + port); });
}
exports.ExposeApp = ExposeApp;
//# sourceMappingURL=expressHelper.js.map