import {setQuiet} from "../../server/logs";
setQuiet(false);
import app from '../../server';
import * as http from "http";
import * as assert from "assert";

describe('Logs', function () {
	this.timeout(15000);
	it('happens after listening', (done) => {
		app.registerListenCallback(() => {
			let options = {
				host: 'localhost',
				port: 3000,
				path: '/logs'
			};
			http.get(options, function (res) {
				let body = '';
				res.on('data', function (chunk) {
					body += chunk;
				});
				res.on('end', function () {
					body = JSON.parse(body);
					console.log(body);
					assert.equal(body.length, 2);
					done();
				});
			}).on('error', function (e) {
				console.log("Got error: " + e.message);
			});
		});
	});
});
