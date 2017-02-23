"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Connection_1 = require("./database/Connection");
var BaseModel_1 = require("./database/BaseModel");
var QueryRequest_1 = require("./database/QueryRequest");
var config_1 = require("./database/config");
var sqlize_1 = require("./database/sqlize");
var Database = (function () {
    function Database() {
        this.DatabaseConfig = config_1.GetDatabaseConfig();
        this.Connection = Connection_1.Connection;
        this.QueryRequest = QueryRequest_1.QueryRequest;
        this.mapObjectToObject = BaseModel_1.mapObjectToObject;
        this.hashString = BaseModel_1.hashString;
        this.NewUID = BaseModel_1.NewUID;
        this.ServerModel = BaseModel_1.ServerModel;
        this.sqlize = sqlize_1.sqlize;
    }
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=databaseConfig.js.map