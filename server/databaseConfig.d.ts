import { Connection } from './database/Connection';
import { mapObjectToObject, hashString, NewUID, ServerModel } from './database/BaseModel';
import { QueryRequest } from './database/QueryRequest';
import { Sequelize } from "sequelize";
export declare class Database {
    DatabaseConfig: {
        database: any;
        host: any;
        port: any;
        user: any;
        password: any;
        waitForConnections: boolean;
        connectionLimit: number;
    };
    Connection: typeof Connection;
    QueryRequest: typeof QueryRequest;
    mapObjectToObject: typeof mapObjectToObject;
    hashString: typeof hashString;
    NewUID: typeof NewUID;
    ServerModel: typeof ServerModel;
    sqlize: Sequelize;
}
