"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var config_1 = require("./config");
var config = config_1.GetDatabaseConfig();
exports.sqlize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql'
});
//# sourceMappingURL=sqlize.js.map