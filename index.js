"use strict";
var expressHelper_1 = require("./expressHelper");
var module_1 = require('./module');
var express = require('express');
var app = new express();
expressHelper_1.MakeExpressAppMoreSecure(app);
expressHelper_1.CommonExpressConfig(app);
module_1.UseApi(app);
expressHelper_1.ExposeApp(app);
//# sourceMappingURL=index.js.map