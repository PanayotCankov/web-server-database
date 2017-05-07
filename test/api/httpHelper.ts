import {setQuiet} from "../../server/logs";
setQuiet(false);
import * as http from "http";
import app from '../../server';
export let host = 'localhost';
export let port = 3000;

export function httpRequest(path: string, cb: (data, statusCode) => void): void {
	let options = {
		host: host,
		port: port,
		path: path
	};
	app.registerListenCallback(() => {
		http.get(options, function (res) {
			let body = '';
			res.on('data', function (chunk) {
				body += chunk;
			});
			res.on('end', function () {
				cb(body, res.statusCode);
			});
		}).on('error', function (e) {
			console.log("Got error: " + e.message);
		});
	});
}
