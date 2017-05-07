import {GetDatabaseConfig} from "./database/config";
import {sqlize} from "./database/sqlize";
import {Sequelize} from "sequelize";

export class Database {
	DatabaseConfig = GetDatabaseConfig();
	sqlize: Sequelize = sqlize;
}

