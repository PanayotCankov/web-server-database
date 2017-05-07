import * as assert from "assert";
import {httpRequest} from "./httpHelper";

describe('Logs', function () {
	this.timeout(15000);
	it('happens after listening', (done) => {
		httpRequest('/logs', (body) => {
			body = JSON.parse(body);
			assert.equal(body.length, 2);
			done();
		});
	});
});
