// Created by trevor on 2/24/17.

import * as path from 'path';
import * as process from 'process';
import * as Sequelize from 'sequelize';
import {sqlize} from "../database/sqlize";

let setting = sqlize.define('Setting', {
	key: {type: Sequelize.STRING},
	value: {type: Sequelize.STRING}
});

let finishedSync: boolean = false;
let finishSync: (() => void)[] = [];

export function FinishSyncronization(cb: () => void) {
	if (finishedSync)
		return cb();
	finishSync.push(cb);
}

function syncNotifyAll() {
	finishedSync = true;
	for (let i = 0; i < finishSync.length; ++i) {
		finishSync[i]();
	}
	finishSync = [];
}

export function SyncDatabase() {
	// sync all tables...
	let options = {force: process.env.DB_FORCE};
	sqlize.sync(options).then(() => {
		syncNotifyAll();
		if (options.force)
			console.log('Dropped/Created all tables');
		console.log('Synced Database');
	});
}

// determine if it should sync
if (path.join(process.cwd(), '/server/database/sequelize') == __dirname)
	SyncDatabase();

export let DBSetting = setting;
