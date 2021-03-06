'use strict';
angular.module('softvFrostApp')
	.config(function ($stateProvider) {
		var states = [{
			name: 'home',
			data: {
				pageTitle: 'BIENVENIDO | MonitoreoV2',
				permissions: {
					except: ['anonymous'],
					options: {
						reload: true
					}
				}
			},
			url: '/home',
			views: {
				'homeview': {
					templateUrl: 'views/main.html',
					controller: 'MainCtrl',
					controllerAs: '$ctrl'
				}
			},
		},
		{
			name: 'home.dashboard',
			data: {
				pageTitle: 'BIENVENIDO | MonitoreoV2',
				permissions: {
					except: ['anonymous'],
					options: {
						reload: true
					}
				}
			},
			url: '/dashboard',
			templateUrl: 'views/dashboard.html',
			controller: 'dashboardCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'login',
			url: '/auth/login?esn',
			data: {
				pageTitle: 'BIENVENIDO | MonitoreoV2'
			},
			views: {
				'loginview': {
					templateUrl: 'views/login/login.html',
					controller: 'LoginCtrl',
					controllerAs: '$ctrl'
				}
			},
		},
		{
			name: 'home.cmts',
			data: {
				pageTitle: 'BIENVENIDO | MonitoreoV2'
			},
			url: '/cmts',
			templateUrl: 'views/CMTS/CMTSData.html',
			controller: 'CMTSDataCtrl',
			controllerAs: '$ctrl'
		}
		];

		states.forEach(function (state) {
			$stateProvider.state(state);
		});
	});
