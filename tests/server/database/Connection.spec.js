"use strict";
var Connection_1 = require("../../../server/database/Connection");
describe("SQL Format Object", function () {
    it("Outputs string null object", function () {
        var input = 'hello world';
        var output = Connection_1.Connection.formatObject(input, null);
        expect(input).toEqual(output);
    });
    it("Outputs string undefined object", function () {
        var input = 'hello world';
        var output = Connection_1.Connection.formatObject(input, null);
        expect(input).toEqual(output);
    });
    it("inputs the _id string into the query", function () {
        var input = 'hello :_id';
        var instance = { _id: 'world' };
        var output = Connection_1.Connection.formatObject(input, instance);
        console.log(output);
        expect("hello 'world'").toEqual(output);
    });
    it("inputs the _id number into the query", function () {
        var input = 'hello :_id';
        var instance = { _id: 123456 };
        var output = Connection_1.Connection.formatObject(input, instance);
        console.log(output);
        expect("hello 123456").toEqual(output);
    });
    it("inputs the _id array into the query", function () {
        var input = 'hello :_id';
        var instance = { _id: [1, 2, 3] };
        var output = Connection_1.Connection.formatObject(input, instance);
        console.log(output);
        expect("hello 1, 2, 3").toEqual(output);
    });
});
//# sourceMappingURL=Connection.spec.js.map