"use strict";
var logs_1 = require("./logs");
var express = require("express");
var APIModule = (function () {
    function APIModule() {
    }
    return APIModule;
}());
exports.APIModule = APIModule;
exports.APIModules = [];
function UseApi(app) {
    var router = express.Router();
    router.get('/logs', function (req, res) {
        res.json(logs_1.privateLogs);
    });
    for (var i = 0; i < exports.APIModules.length; ++i) {
        router.get('/' + exports.APIModules[i].name, exports.APIModules[i].router);
    }
    router.get('/', function (req, res) { return res.send('This is the root of the API of the api. Thank Trevor Von Seggern!'); });
    app.use('/api', router);
}
exports.UseApi = UseApi;
//# sourceMappingURL=module.js.map