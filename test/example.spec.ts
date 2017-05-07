import {BaseModel} from 'web-base-model';
import * as assert from "assert";
let asdf = BaseModel;
class MockHelloService {
	public sayHello(): string {
		return "Hello world!";
	}
}

describe("HelloComponent", () => {
	it("should say 'Hello world!'", () => {
		let instance = new MockHelloService();
		assert.equal(instance.sayHello(), "Hello world!");
		assert.equal(asdf, asdf);
	});
});
