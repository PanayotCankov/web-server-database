"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
var models_2 = require("./models");
var BaseModel_1 = require("../database/BaseModel");
var logs_1 = require("../logs");
var web_encryption_wrapper_1 = require("web-encryption-wrapper");
var Setting = (function () {
    function Setting(instance) {
        BaseModel_1.mapObjectToObject(instance, this);
    }
    Setting.all = function (limit, skip) {
        return new Promise(function (resolve, reject) {
            models_1.DBSetting.findAll().then(function (items) {
                resolve(items);
            }, function (error) { return reject(error); });
        });
    };
    ;
    Setting.prototype.save = function () {
        return Setting.save(this);
    };
    ;
    Setting.save = function (setting) {
        if (setting.id)
            return new Promise(function (resolve, reject) {
                models_1.DBSetting.update(setting, { where: { id: setting.id } }).then(function (item) {
                    resolve();
                }, function (error) { return reject(error); });
            });
        return Setting.create(setting);
    };
    Setting.create = function (setting) {
        return new Promise(function (resolve, reject) {
            models_1.DBSetting.create(setting).then(function (item) {
                resolve();
            }, function (error) { return reject(error); });
        });
    };
    Setting.getOneByName = function (name) {
        return new Promise(function (resolve, reject) {
            models_1.DBSetting.findOne({ where: { name: name } }).then(function (item) {
                resolve(new Setting(item));
            }, function (error) { return reject(error); });
        });
    };
    return Setting;
}());
exports.Setting = Setting;
models_2.FinishSyncronization(function () {
    Setting.getOneByName('ServerSalt').then(function (item) {
        web_encryption_wrapper_1.SetServerSalt(item.value);
    }, function () {
        var defaultSalt = '$2a$06$7A/WgchbB8iK3.gVFYP.NO';
        web_encryption_wrapper_1.SetServerSalt(defaultSalt);
        Setting.save({ key: 'ServerSalt', value: defaultSalt }).then(function () { return logs_1.default('Saved Default salt'); }, function () { return logs_1.default('Could not save salt'); });
    });
    Setting.getOneByName('ClientSalt').then(function (item) {
        web_encryption_wrapper_1.SetClientSalt(item.value);
    }, function () {
        var defaultSalt = '$2a$10$fiQiVTgSLOu1MfrFUg3HRe';
        web_encryption_wrapper_1.SetClientSalt(defaultSalt);
        Setting.save({ key: 'ClientSalt', value: defaultSalt }).then(function () { return logs_1.default('Saved Default salt'); }, function () { return logs_1.default('Could not save salt'); });
    });
});
//# sourceMappingURL=Setting.js.map