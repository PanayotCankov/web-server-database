"use strict";
function CheckNumberParameter(input) {
    var result = 0;
    if (input) {
        if ((typeof input) == "number")
            result = input;
        else if ((typeof input) == "string")
            result = parseInt(input);
        if (result < 0)
            result = 0;
    }
    return result;
}
exports.CheckNumberParameter = CheckNumberParameter;
//# sourceMappingURL=helper.js.map