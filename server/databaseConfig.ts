import {Connection} from './database/Connection';
import {mapObjectToObject, hashString, NewUID, ServerModel} from './database/BaseModel';
import {QueryRequest} from './database/QueryRequest';
import {GetDatabaseConfig} from "./database/config";
import {sqlize} from "./database/sqlize";
import {Sequelize} from "sequelize";

export class Database {
	DatabaseConfig = GetDatabaseConfig();
	Connection = Connection;
	QueryRequest = QueryRequest;
	mapObjectToObject = mapObjectToObject;
	hashString = hashString;
	NewUID = NewUID;
	ServerModel = ServerModel;
	sqlize: Sequelize = sqlize;
}

