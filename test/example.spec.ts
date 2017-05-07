import {BaseModel} from 'web-base-model';
let asdf = BaseModel;
class MockHelloService {

	public sayHello(): string {
		return "Hello world!";
	}
}

describe("HelloComponent", () => {
	it("should say 'Hello world!'", () => {
		console.log(BaseModel);
		let instance = new MockHelloService();
		expect(instance.sayHello()).toEqual("Hello world!");
		expect(asdf).toBeDefined();
	});
});
