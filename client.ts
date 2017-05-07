/**
 * Created by trevor on 2/22/17.
 */
import * as angular from 'angular';
import 'angular-ui-router';

let app = angular.module('app', ['ui.router']);

app.controller('appcontroller', [function () {
	console.log('I am on the browser!');
	let abc: any = '';
}]);
