// Created by trevor on 2/18/17.
import * as path from 'path';

export let defaultConfig = {
	databaseType: process.env.DB_DATABASE_TYPE || 'mysql',
	database: process.env.DB_DATABASE || 'Quicksilver',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || 3306,
	user: process.env.DB_USERNAME || 'username',
	password: process.env.DB_PASSWORD || 'password',
	force: process.env.DB_FORCE || false,
	logging: process.env.DB_LOGGING || false,
	waitForConnections: true,
	connectionLimit: 50,
	sqliteStorage: process.env.DB_DATABASE_STORAGE || path.join(__dirname, 'sqlite.db'),
};

export function GetDatabaseConfig() {
	return defaultConfig;
}