import {Connection} from './database/Connection';
import {QueryRequest} from './database/QueryRequest';
import {GetDatabaseConfig} from "./database/config";
import {sqlize} from "./database/sqlize";
import {Sequelize} from "sequelize";

export class Database {
	DatabaseConfig = GetDatabaseConfig();
	Connection = Connection;
	QueryRequest = QueryRequest;
	sqlize: Sequelize = sqlize;
}

