import * as assert from "assert";
import {httpRequest} from "./httpHelper";

describe('Production Environment', function () {
	this.timeout(15000);
	beforeEach(() => {
		process.env.NODE_ENV = 'production';
	});
	it('should respond', (done) => {
		httpRequest('/', (body, statusCode) => {
			assert.equal(body != null, true, 'body should not be null');
			assert.equal(body.length > 0, true, 'should not be empty');
			assert.equal(statusCode, 200, 'responds with 500 status code');
			done();
		});
	});

	it('bundle.js request', (done) => {
		httpRequest('/bundle.js', (body, statusCode) => {
			assert.equal(body != null, true, 'body should not be null');
			assert.equal(body.length > 0, true, 'should not be empty');
			assert.equal(statusCode, 200, 'responds with 500 status code');
			done();
		});
	});
});
