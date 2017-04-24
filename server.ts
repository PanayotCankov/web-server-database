// Created by trevor on 2/2/17.
import {Module} from "./server/module";
import e = require("express");
import './testSequelize';
import {Setting} from "./server/model/Setting";

let testRouter = e.Router();
testRouter.get('/', function (request, response) {
	Setting.all().then((settings) => {
		response.json(settings);
	});
});

// test database
Module.Server.App.APIModules.push({name: 'test', router: testRouter});

Module.Server.App.listen();