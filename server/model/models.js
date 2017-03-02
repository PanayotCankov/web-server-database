"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var process = require("process");
var Sequelize = require("sequelize");
var sqlize_1 = require("../database/sqlize");
var setting = sqlize_1.sqlize.define('Setting', {
    key: { type: Sequelize.STRING },
    value: { type: Sequelize.STRING }
});
var finishedSync = false;
var finishSync = [];
function FinishSyncronization(cb) {
    if (finishedSync)
        return cb();
    finishSync.push(cb);
}
exports.FinishSyncronization = FinishSyncronization;
function syncNotifyAll() {
    finishedSync = true;
    for (var i = 0; i < finishSync.length; ++i) {
        finishSync[i]();
    }
    finishSync = [];
}
function SyncDatabase() {
    var options = { force: process.env.DB_FORCE };
    sqlize_1.sqlize.sync(options).then(function () {
        syncNotifyAll();
        if (options.force)
            console.log('Dropped/Created all tables');
        console.log('Synced Database');
    });
}
exports.SyncDatabase = SyncDatabase;
if (path.join(process.cwd(), '/server/database/sequelize') == __dirname)
    SyncDatabase();
exports.DBSetting = setting;
//# sourceMappingURL=models.js.map