"use strict";
exports.privateLogs = [];
function logs(log) {
    console.log(log);
    exports.privateLogs.push(log);
}
exports.logs = logs;
//# sourceMappingURL=logs.js.map