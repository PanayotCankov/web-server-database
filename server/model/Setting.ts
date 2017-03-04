import {DBSetting} from './models';
import {FinishSyncronization} from "../database/sqlize";
import logs from "../logs";
import {SetServerSalt, SetClientSalt} from "web-encryption-wrapper";
import {ServerBaseModel, all} from 'web-base-server-model';
import {mapObjectToObject} from 'web-base-model';

export class Setting extends ServerBaseModel {
	id: string;
	key: string;
	value: string;

	constructor(instance?: any) {
		super(instance);
	}

	static all(limit?: number, skip?: number): Promise<any[]> {
		return all(DBSetting, limit, skip);
	};

	save(): Promise<void> {
		return Setting.save(this); // use the static method.
	};

	static save(setting: any): Promise<void> {
		if (setting.id)
			return new Promise<void>((resolve, reject) => {
				DBSetting.update(setting,
					{where: {id: setting.id}}).then((item: any) => {
					if (item && item.dataValues)
						mapObjectToObject(item.dataValues, this);
					resolve();
				}, (error) => reject(error));
			});
		return Setting.create(setting);
	}

	private static create(setting: any): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DBSetting.create(setting).then((item: any) => {
				if (item && item.dataValues)
					mapObjectToObject(item.dataValues, this);
				resolve();
			}, (error) => reject(error));
		});
	}

	static getOneByKey(key: string): Promise<Setting> {
		return new Promise((resolve, reject) => {
			DBSetting.findOne({where: {key: key}}).then((item: any) => {
				if (item && item.dataValues)
					resolve(new Setting(item.dataValues));
				else
					resolve(undefined);
			}, (error) => reject(error));
		});
	}
}

FinishSyncronization(() => {
	Setting.getOneByKey('ServerSalt').then((item) => {
		if (item)
			SetServerSalt(item.value);
		else {
			let defaultSalt: string = '$2a$06$7A/WgchbB8iK3.gVFYP.NO';
			SetServerSalt(defaultSalt);
			Setting.save({key: 'ServerSalt', value: defaultSalt}).then(() => {
			}, () => logs('Could not save salt'));
		}
	}, () => {
	});

	Setting.getOneByKey('ClientSalt').then((item) => {
		if (item)
			SetClientSalt(item.value);
		else {
			let defaultSalt: string = '$2a$10$fiQiVTgSLOu1MfrFUg3HRe';
			SetClientSalt(defaultSalt);
			Setting.save({key: 'ClientSalt', value: defaultSalt}).then(() => {
			}, () => logs('Could not save salt'));
		}
	}, () => {
	});
});
