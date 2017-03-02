// Created by trevor on 2/18/17.
import * as Sequelize from "sequelize";
import {GetDatabaseConfig} from './config';
import * as path from 'path';
import * as process from 'process';

let config = GetDatabaseConfig();

export let sqlize = new Sequelize(config.database, config.user, config.password, {
	host: config.host,
	port: config.port,
	dialect: 'mysql'
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