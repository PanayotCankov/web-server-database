/// <reference types="sequelize" />
import * as Sequelize from 'sequelize';
export declare function FinishSyncronization(cb: () => void): void;
export declare function SyncDatabase(): void;
export declare let DBSetting: Sequelize.Model<{}, {}>;
