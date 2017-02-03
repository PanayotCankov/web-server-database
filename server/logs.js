"use strict";
exports.privateLogs = [];
function logs(log) {
    console.log(log);
    exports.privateLogs.push(log);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logs;
//# sourceMappingURL=logs.js.map