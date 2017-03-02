import {DBSetting} from './models';
import {FinishSyncronization} from "./models";
import {mapObjectToObject} from "../database/BaseModel";
import logs from "../logs";
import {SetServerSalt, SetClientSalt} from "web-encryption-wrapper";

export class Setting {
	id: string;
	key: string;
	value: string;

	constructor(instance?: any) {
		mapObjectToObject(instance, this);
	}

	static all(limit?: number, skip?: number): Promise<any[]> {
		return new Promise<any[]>((resolve, reject) => {
			DBSetting.findAll().then((items) => {
				resolve(items);
			}, (error) => reject(error));
		});
	};

	save(): Promise<void> {
		return Setting.save(this);
	};

	static save(setting: any): Promise<void> {
		if (setting.id)
			return new Promise<void>((resolve, reject) => {
				DBSetting.update(setting,
					{where: {id: setting.id}}).then((item) => {
					resolve();
				}, (error) => reject(error));
			});
		return Setting.create(setting);
	}

	private static create(setting: any): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBSetting.create(setting).then((item) => {
				resolve();
			}, (error) => reject(error));
		});
	}

	static getOneByName(name: string): Promise<Setting> {
		return new Promise((resolve, reject) => {
			DBSetting.findOne({where: {name: name}}).then((item) => {
				resolve(new Setting(item));
			}, (error) => reject(error));
		});
	}
}

FinishSyncronization(() => {
	Setting.getOneByName('ServerSalt').then((item) => {
		SetServerSalt(item.value);
	}, () => {
		let defaultSalt: string = '$2a$06$7A/WgchbB8iK3.gVFYP.NO';
		SetServerSalt(defaultSalt);
		Setting.save({key: 'ServerSalt', value: defaultSalt}).then(
			() => logs('Saved Default salt'),
			() => logs('Could not save salt'));
	});

	Setting.getOneByName('ClientSalt').then((item) => {
		SetClientSalt(item.value);
	}, () => {
		let defaultSalt: string = '$2a$10$fiQiVTgSLOu1MfrFUg3HRe';
		SetClientSalt(defaultSalt);
		Setting.save({key: 'ClientSalt', value: defaultSalt}).then(
			() => logs('Saved Default salt'),
			() => logs('Could not save salt'));
	});
});
