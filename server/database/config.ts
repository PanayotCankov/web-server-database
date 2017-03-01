// Created by trevor on 2/18/17.

export let defaultConfig = {
	database: process.env.DB_DATABASE || 'Quicksilver',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || 3306,
	user: process.env.DB_USERNAME || 'username',
	password: process.env.DB_PASSWORD || 'password',
	force: process.env.DB_FORCE || false,
	waitForConnections: true,
	connectionLimit: 50,
};

export function GetDatabaseConfig() {
	return defaultConfig;
}