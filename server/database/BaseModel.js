"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var Connection_1 = require("./Connection");
function hashString(input, _salt) {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(input, _salt, function (err, hash) {
            if (err)
                reject(err);
            else
                resolve(hash);
        });
    });
}
exports.hashString = hashString;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function GenerateUID(len) {
    var buf = [], chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, chars.length - 1)]);
    }
    return buf.join('');
}
function NewUID() {
    return GenerateUID(30);
}
exports.NewUID = NewUID;
var mapIgnoredItems = ['modelType', 'existingModel'];
function mapObjectToObject(from, to, schema) {
    var keys = schema;
    if (schema && this.schema && this.schema.attributes)
        keys = Object.keys(this.schema.attributes);
    if (from === undefined || to === undefined)
        return;
    if (!keys)
        keys = Object.keys(from);
    for (var key in keys) {
        var index = keys[key];
        if (mapIgnoredItems.indexOf(index) > -1)
            continue;
        if (from)
            to[index] = from[index];
        else
            to[index] = undefined;
    }
}
exports.mapObjectToObject = mapObjectToObject;
var ServerModel = (function () {
    function ServerModel(instance, modelType) {
        this.modelType = modelType;
        if (instance)
            mapObjectToObject(instance, this);
        this.existingModel = !!(instance && instance._id);
    }
    ServerModel.prototype.presave = function () {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    ServerModel.prototype.saveScript = function (modelInstance) {
        return new Promise(function (resolve) { return resolve(""); });
    };
    ;
    ServerModel.prototype.save = function () {
        var _this = this;
        if (!this.existingModel)
            return this.create();
        return new Promise(function (resolve, reject) {
            _this.presave().then(function () {
                _this.saveScript(_this).then(function (query) {
                    return Connection_1.Connection.query(query).then(function (data) {
                        if (data === undefined) {
                            reject('no result from the database');
                        }
                        else if (data.affectedRows === 1 && data.changedRows === 1 && data.serverStatus === 2) {
                            resolve(_this);
                        }
                        else
                            resolve(undefined);
                    }, function (error) {
                        reject(error);
                    });
                }, function (error) {
                    console.log('error injecting save script.');
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    ServerModel.prototype.createScript = function (modelInstance) {
        return new Promise(function (resolve) { return resolve(""); });
    };
    ;
    ServerModel.prototype.create = function () {
        var _this = this;
        this._id = NewUID();
        return new Promise(function (resolve, reject) {
            _this.presave().then(function () {
                _this.createScript(_this).then(function (query) {
                    return Connection_1.Connection.query(query).then(function (data) {
                        if (data === undefined) {
                            reject('no result from the database');
                        }
                        else if (data.affectedRows === 1 && data.changedRows === 0 && data.serverStatus === 2) {
                            resolve(_this);
                        }
                        else
                            resolve(undefined);
                    }, function (error) {
                        reject(error);
                    });
                }, function (error) {
                    console.log('error injecting create script.');
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    ServerModel.prototype.removeByIdScript = function (id) {
        return new Promise(function (resolve) { return resolve(""); });
    };
    ;
    ServerModel.prototype.removeById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!id)
                reject('id is a non string');
            _this.removeByIdScript(id).then(function (query) {
                return Connection_1.Connection.query(query).then(function () {
                    resolve();
                }, function (error) {
                    reject(error);
                });
            }, function (error) {
                console.log('error injecting remove by id script.');
                reject(error);
            });
        });
    };
    ServerModel.prototype.remove = function () {
        return this.removeById(this._id);
    };
    ServerModel.prototype.getOneByIdScript = function (id) {
        return new Promise(function (resolve) { return resolve(""); });
    };
    ;
    ServerModel.prototype.getOneById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getOneByIdScript(id).then(function (query) {
                return Connection_1.Connection.query(query).then(function (data) {
                    if (!data || data.length === 0)
                        resolve(undefined);
                    else
                        resolve(new _this.modelType(data[0]));
                }, function (error) {
                    reject(error);
                });
            }, function (error) {
                console.log('error injecting remove by id script.');
                reject(error);
            });
        });
    };
    ServerModel.prototype.getAllScript = function (limit, skip) {
        return new Promise(function (resolve) { return resolve(""); });
    };
    ;
    ServerModel.prototype.all = function (limit, skip) {
        var _this = this;
        if (!skip || skip < 0)
            skip = 0;
        return new Promise(function (resolve, reject) {
            _this.getAllScript(limit, skip).then(function (query) {
                return Connection_1.Connection.query(query).then(function (data) {
                    resolve(data);
                }, function (error) {
                    reject(error);
                });
            }, function (error) {
                console.log('error injecting all script.');
                reject(error);
            });
        });
    };
    ServerModel.prototype.getCountScript = function () {
        return new Promise(function (resolve) { return resolve(""); });
    };
    ;
    ServerModel.prototype.getCount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getCountScript().then(function (query) {
                return Connection_1.Connection.query(query).then(function (data) {
                    if (data === undefined)
                        resolve(0);
                    else if (data.length === 1 && data[0].size !== undefined && data[0].size >= 0)
                        resolve(data[0].size);
                    else
                        reject('Undefined output getting count.');
                }, function (error) {
                    reject(error);
                });
            }, function (error) {
                console.log('error injecting count script.');
                reject(error);
            });
        });
    };
    return ServerModel;
}());
exports.ServerModel = ServerModel;
//# sourceMappingURL=BaseModel.js.map