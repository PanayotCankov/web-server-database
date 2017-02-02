import {Express} from "express";
import {privateLogs} from "./logs";
import express = require('express');

export class APIModule {
	router: any;
	name: string;
}

/// Must be added before UseApi is called.
export let APIModules: APIModule[] = [];

export function UseApi(app: Express) {
	let router = express.Router();

	router.get('/logs', function (req: any, res: any) {
		res.json(privateLogs);
	});

	for (let i = 0; i < APIModules.length; ++i) {
		router.get('/' + APIModules[i].name, APIModules[i].router);
	}

	router.get('/', (req: any, res: any) => res.send('This is the root of the API of the api. Thank Trevor Von Seggern!'));
	app.use('/api', router);
}