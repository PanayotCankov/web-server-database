// Created by trevor on 2/2/17.
import e = require("express");
import {Setting} from "./server/model/Setting";
import {App} from "./server/App";

let testRouter = e.Router();
testRouter.get('/', function (request, response) {
	Setting.all().then((settings) => {
		response.json(settings);
	});
});

// test database
App.APIModules.push({name: 'test', router: testRouter});

App.listen();

export default App;