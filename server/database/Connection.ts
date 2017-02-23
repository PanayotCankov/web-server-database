import {QueryRequest} from "./QueryRequest";
import mysql = require('mysql');
import {GetDatabaseConfig} from "./config";

let settings: any = GetDatabaseConfig();
settings.multipleStatements = true;

export class Connection {
	// don't create the pool on startup.
	static pool: any; // = mysql.createPool(settings);
	static poolActiveConnections: number = 0;
	requestPool: QueryRequest[] = [];

	static format(query: string, inserts: string[]): string {
		return mysql.format(query, inserts)
	}

	static formatObject(query: string, values: any): string {
		if (!values) return query;
		return query.replace(/\:(\w+)/g, function (txt, key) {
			if (values.hasOwnProperty(key)) {
				return mysql.escape(values[key]);
			}
			return txt;
		}.bind(this));
	}

	static createPoolConnection() {
		if (Connection.pool == undefined) {
			Connection.pool = mysql.createPool(settings); // create pool.
		}
	}

	static query(query: string): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			Connection.createPoolConnection();

			Connection.pool.query(query, (error, data) => {
				if (error)
					reject(error);
				else
					resolve(data);
			});
		});
	}

	static executeQueryRequestOnConnection(mysqlCon: any, requestPool: QueryRequest[], finishedCallback: () => any) {
		// ran out of requests
		if (requestPool == undefined || requestPool == null || requestPool == [] || requestPool.length <= 0) {
			finishedCallback();
			return;
		}
		let request: QueryRequest = requestPool.shift();

		// process a request
		mysqlCon.query(request.query, function (data) {
			request.callback(data);
			if (requestPool.length == 0) {
				finishedCallback();
			} else {
				Connection.executeQueryRequestOnConnection(mysqlCon, requestPool, finishedCallback);
			}
		});
	}

	executePool(savedAllCallback: () => any) {
		if (this.requestPool == undefined || this.requestPool.length == undefined || this.requestPool.length <= 0) {
			return; // don't bother if there aren't any queries
		}
		Connection.createPoolConnection();

		let connections_to_create: number = (settings.connectionLimit - Connection.poolActiveConnections);
		for (let c = 0; c < connections_to_create; c++) {
			Connection.pool.getConnection(function (error: any, mysqlCon: any) {
				if (error) {
					mysqlCon && mysqlCon.release();
					console.log(error);
					return;
				}

				Connection.poolActiveConnections++;

				Connection.executeQueryRequestOnConnection(mysqlCon, this.requestPool, function () {
					Connection.poolActiveConnections--;
					mysqlCon.release();
					savedAllCallback();
				});
			});
		}
	}
}