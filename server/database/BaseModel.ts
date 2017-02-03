import * as bcrypt from 'bcrypt-nodejs'
import {Connection} from "./Connection";

export function hashString(input, _salt): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		bcrypt.hash(input, _salt, null, function (err, hash) {
			if (err)
				reject(err);
			else
				resolve(hash);
		});
	});
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function GenerateUID(len): string {
	let buf = [], chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < len; ++i) {
		buf.push(chars[getRandomInt(0, chars.length - 1)]);
	}

	return buf.join('');
}
export function NewUID(): string {
	return GenerateUID(30);
}

let mapIgnoredItems = ['modelType', 'existingModel'];

export function mapObjectToObject(from: any, to: any, schema?: any) {
	let keys = schema;
	if (!schema && this.schema && this.schema.attributes)
		keys = Object.keys(this.schema.attributes);
	if (from === undefined || to === undefined)
		return;
	if (!keys)
		keys = Object.keys(from);
	for (let key in keys) {
		let index = keys[key];
		if (mapIgnoredItems.indexOf(index) > -1) // ignore form the list.
			continue;
		if (from)
			to[index] = from[index];
		else
			to[index] = undefined;
	}
}

export abstract class ServerModel {
	_id: string;
	existingModel: boolean;

	constructor(instance: any, public modelType) {
		if (instance)
			mapObjectToObject(instance, this);
		this.existingModel = !!(instance && instance._id);
	}

	//noinspection JSMethodCanBeStatic
	presave(): Promise<void> {
		// a nothing promise function. Made to be overridden
		return new Promise<void>((resolve) => {
			resolve(); // false as in it has not been modified
		});
	}

	protected abstract saveScript(modelInstance: any): Promise<string>;

	save(): Promise<ServerModel> {
		if (!this.existingModel)
			return this.create();

		return new Promise<ServerModel>((resolve, reject) => {
			this.presave().then(() => {
				// let instance = {};
				// mapObjectToObject(this, instance, new this.modelType());
				this.saveScript(this).then((query: string) => {
					return Connection.query(query).then((data) => {
						if (data === undefined) {
							reject('no result from the database');
						}
						else if (data.affectedRows === 1 && data.changedRows === 1 && data.serverStatus === 2) {
							resolve(this);
						}
						else
							resolve(undefined);
					}, (error) => {
						reject(error);
					});
				}, (error) => {
					console.log('error injecting save script.');
					reject(error);
				});
			}, (error) => {
				reject(error);
			});
		});
	}

	protected abstract createScript(modelInstance: any): Promise<string>;

	create(): Promise<ServerModel> {
		this._id = NewUID();

		return new Promise<ServerModel>((resolve, reject) => {
			this.presave().then(() => {
				this.createScript(this).then((query: string) => {
					return Connection.query(query).then((data) => {
						if (data === undefined) {
							reject('no result from the database');
						}
						else if (data.affectedRows === 1 && data.changedRows === 0 && data.serverStatus === 2) {
							resolve(this);
						}
						else
							resolve(undefined);
					}, (error) => {
						reject(error);
					});
				}, (error) => {
					console.log('error injecting create script.');
					reject(error);
				});
			}, (error) => {
				reject(error);
			});
		});
	}

	protected abstract removeByIdScript(id: string): Promise<string>;

	removeById(id: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!id)
				reject('id is a non string');

			this.removeByIdScript(id).then((query: string) => {
				return Connection.query(query).then(() => {
					resolve();
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting remove by id script.');
				reject(error);
			});
		});
	}

	remove(): Promise<void> {
		return this.removeById(this._id);
	}

	protected abstract getOneByIdScript(id: string): Promise<string>;

	getOneById(id: string): Promise<ServerModel> {
		return new Promise<ServerModel>((resolve, reject) => {
			this.getOneByIdScript(id).then((query: string) => {
				return Connection.query(query).then((data) => {
					if (!data || data.length === 0)
						resolve(undefined);
					else
						resolve(new this.modelType(data[0]));
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting remove by id script.');
				reject(error);
			});
		});
	}

	protected abstract getAllScript(limit: number, skip: number): Promise<string>;

	all(limit?: number, skip?: number): Promise<any[]> {
		if (!skip || skip < 0)
			skip = 0;
		return new Promise<any[]>((resolve, reject) => {
			this.getAllScript(limit, skip).then((query: string) => {
				return Connection.query(query).then((data) => {
					resolve(data);
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting all script.');
				reject(error);
			});
		});
	}

	protected abstract getCountScript(): Promise<string>;

	getCount(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			this.getCountScript().then((query: string) => {
				return Connection.query(query).then((data) => {
					if (data === undefined)
						resolve(0);
					else if (data.length === 1 && data[0].size !== undefined && data[0].size >= 0)
						resolve(data[0].size);
					else
						reject('Undefined output getting count.');
				}, (error) => {
					reject(error);
				});
			}, (error) => {
				console.log('error injecting count script.');
				reject(error);
			});
		});
	}
}