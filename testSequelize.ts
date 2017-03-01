/**
 * Created by trevor on 3/1/17.
 */

import {sqlize} from './server/database/sqlize';
import * as Sequelize from 'sequelize';

let Model = sqlize.define('model', {key: Sequelize.STRING});

sqlize.sync({force: true}).then(() => {
	Model.create({key: 'abcd'}).then(() => {
		console.log('created');
	});
});

