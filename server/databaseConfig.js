"use strict";
var process = require('process');
exports.defaultConfig = {
    database: process.env.DB_DATABASE || 'Quicksilver',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',
    waitForConnections: true,
    connectionLimit: 50,
};
function GetDatabaseConfig() {
    return exports.defaultConfig;
}
exports.GetDatabaseConfig = GetDatabaseConfig;
//# sourceMappingURL=databaseConfig.js.map