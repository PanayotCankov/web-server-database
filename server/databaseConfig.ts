// Created by trevor on 2/2/17.
export let defaultConfig = {
	database: 'Quicksilver',
	host: 'localhost',
	port: 3306,
	user: 'username',
	password: 'password',
	waitForConnections: true,
	connectionLimit: 50,
};

export function GetDatabaseConfig() {
	return defaultConfig;
}