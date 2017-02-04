import {} from 'jasmine';
import {Connection} from "../../../server/database/Connection";

describe("SQL Format Object", () => {
	it("Outputs string null object", () => {
		let input = 'hello world';
		let output = Connection.formatObject(input, null);
		expect(input).toEqual(output);
	});
	
	it("Outputs string undefined object", () => {
		let input = 'hello world';
		let output = Connection.formatObject(input, null);
		expect(input).toEqual(output);
	});

	it("inputs the _id string into the query", () => {
		let input = 'hello :_id';
		let instance = {_id: 'world'};
		let output = Connection.formatObject(input, instance);
		console.log(output);
		expect("hello 'world'").toEqual(output);
	});

	it("inputs the _id number into the query", () => {
		let input = 'hello :_id';
		let instance = {_id: 123456};
		let output = Connection.formatObject(input, instance);
		console.log(output);
		expect("hello 123456").toEqual(output);
	});

	it("inputs the _id array into the query", () => {
		let input = 'hello :_id';
		let instance = {_id: [1, 2, 3]};
		let output = Connection.formatObject(input, instance);
		console.log(output);
		expect("hello 1, 2, 3").toEqual(output);
	});
});
