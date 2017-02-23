"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateLogs = [];
function logs(log) {
    console.log(log);
    exports.privateLogs.push(log);
}
exports.default = logs;
//# sourceMappingURL=logs.js.map