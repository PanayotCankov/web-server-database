"use strict";
var databaseConfig_1 = require("../databaseConfig");
var mysql = require("mysql");
var settings = databaseConfig_1.GetDatabaseConfig();
settings.multipleStatements = true;
var Connection = (function () {
    function Connection() {
        this.requestPool = [];
    }
    Connection.format = function (query, inserts) {
        return mysql.format(query, inserts);
    };
    Connection.createPoolConnection = function () {
        if (Connection.pool == undefined) {
            Connection.pool = mysql.createPool(settings);
        }
    };
    Connection.query = function (query) {
        return new Promise(function (resolve, reject) {
            Connection.createPoolConnection();
            Connection.pool.getConnection(function (error, mysqlCon) {
                if (error) {
                    mysqlCon && mysqlCon.release();
                    console.log(error);
                    reject(error);
                    return;
                }
                mysqlCon.query(query, function (error, data) {
                    if (error)
                        reject(error);
                    else
                        resolve(data);
                });
                mysqlCon.release();
            });
        });
    };
    Connection.executeQueryRequestOnConnection = function (mysqlCon, requestPool, finishedCallback) {
        if (requestPool == undefined || requestPool == null || requestPool == [] || requestPool.length <= 0) {
            finishedCallback();
            return;
        }
        var request = requestPool.shift();
        mysqlCon.query(request.query, function (data) {
            request.callback(data);
            if (requestPool.length == 0) {
                finishedCallback();
            }
            else {
                Connection.executeQueryRequestOnConnection(mysqlCon, requestPool, finishedCallback);
            }
        });
    };
    Connection.prototype.executePool = function (savedAllCallback) {
        if (this.requestPool == undefined || this.requestPool.length == undefined || this.requestPool.length <= 0) {
            return;
        }
        Connection.createPoolConnection();
        var connections_to_create = (settings.connectionLimit - Connection.poolActiveConnections);
        for (var c = 0; c < connections_to_create; c++) {
            Connection.pool.getConnection(function (error, mysqlCon) {
                if (error) {
                    mysqlCon && mysqlCon.release();
                    console.log(error);
                    return;
                }
                Connection.poolActiveConnections++;
                Connection.executeQueryRequestOnConnection(mysqlCon, this.requestPool, function () {
                    Connection.poolActiveConnections--;
                    mysqlCon.release();
                    savedAllCallback();
                });
            });
        }
    };
    return Connection;
}());
Connection.pool = undefined;
Connection.poolActiveConnections = 0;
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map