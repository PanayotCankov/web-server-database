/**
 * Created by trevor on 2/22/17.
 */
import * as angular from 'angular';

let app = angular.module('app', []);

app.controller('appcontroller', [function () {
	console.log('I am on the browser!');
	let abc = '';
	abc.asdf.asdf = 'asdf'; // error
}]);
