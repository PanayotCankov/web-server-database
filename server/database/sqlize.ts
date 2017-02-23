// Created by trevor on 2/18/17.
import * as Sequelize from "sequelize";
import {GetDatabaseConfig} from './config';
let process = require('process');
let config = GetDatabaseConfig();


export let sqlize = new Sequelize(config.database, config.user, config.password, {
	host: config.host,
	port: config.port,
	dialect: 'mysql'
});
