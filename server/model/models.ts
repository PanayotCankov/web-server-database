// Created by trevor on 2/24/17.

import * as Sequelize from 'sequelize';
import {sqlize} from "../database/sqlize";

let setting = sqlize.define('Setting', {
	key: {type: Sequelize.STRING},
	value: {type: Sequelize.STRING}
});


export let DBSetting = setting;

import './Setting';