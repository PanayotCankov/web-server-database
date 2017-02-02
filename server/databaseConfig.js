"use strict";
exports.defaultConfig = {
    database: 'Quicksilver',
    host: 'localhost',
    port: 3306,
    user: 'username',
    password: 'password',
    waitForConnections: true,
    connectionLimit: 50,
};
function GetDatabaseConfig() {
    return exports.defaultConfig;
}
exports.GetDatabaseConfig = GetDatabaseConfig;
//# sourceMappingURL=databaseConfig.js.map