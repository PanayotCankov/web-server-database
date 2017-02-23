// Created by trevor on 2/3/17.

import {App, Application} from "./App";
import logs from "./logs";
import {privateLogs} from "./logs";
import {CheckNumberParameter} from "./helper";
import {Database} from "./databaseConfig";
import * as e from "express";

export interface APIModule {
	router: e.Router;
	name: string;
}

export class ModuleClass {
	Logs = {
		logs: logs,
		privateLogs: privateLogs
	};

	Server = {
		App: App,
		NumberChecker: CheckNumberParameter,
		Database: new Database(),
	};
}

export let Module = new ModuleClass();