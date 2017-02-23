"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var logs_1 = require("./logs");
var logs_2 = require("./logs");
var helper_1 = require("./helper");
var databaseConfig_1 = require("./databaseConfig");
var ModuleClass = (function () {
    function ModuleClass() {
        this.Logs = {
            logs: logs_1.default,
            privateLogs: logs_2.privateLogs
        };
        this.Server = {
            App: App_1.App,
            NumberChecker: helper_1.CheckNumberParameter,
            Database: new databaseConfig_1.Database(),
        };
    }
    return ModuleClass;
}());
exports.ModuleClass = ModuleClass;
exports.Module = new ModuleClass();
//# sourceMappingURL=module.js.map