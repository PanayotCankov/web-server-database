"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlize_1 = require("./server/database/sqlize");
var Sequelize = require("sequelize");
var Model = sqlize_1.sqlize.define('model', { key: Sequelize.STRING });
sqlize_1.sqlize.sync({ force: true }).then(function () {
    Model.create({ key: 'abcd' }).then(function () {
        console.log('created');
    });
});
//# sourceMappingURL=testSequelize.js.map