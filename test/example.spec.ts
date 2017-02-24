class MockHelloService {

	public sayHello(): string {
		return "Hello world!";
	}
}

describe("HelloComponent", () => {
	it("should say 'Hello world!'", () => {
		let instance = new MockHelloService();
		expect(instance.sayHello()).toEqual("Hello world!");
	});
});
