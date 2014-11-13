'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('contactus', {
			url: '/contactus',
			templateUrl: 'modules/core/views/contactus.client.view.html'
		}).
		state('mobile', {
			url: '/mobile',
			templateUrl: 'modules/core/views/mobile.client.view.html'
		}).
		state('help', {
			url: '/help',
			templateUrl: 'modules/core/views/help.client.view.html'
		});
	}
]);
