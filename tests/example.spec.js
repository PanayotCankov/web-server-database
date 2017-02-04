"use strict";
var MockHelloService = (function () {
    function MockHelloService() {
    }
    MockHelloService.prototype.sayHello = function () {
        return "Hello world!";
    };
    return MockHelloService;
}());
describe("HelloComponent", function () {
    it("should say 'Hello world!'", function () {
        var instance = new MockHelloService();
        expect(instance.sayHello()).toEqual("Hello world!");
    });
});
//# sourceMappingURL=example.spec.js.map