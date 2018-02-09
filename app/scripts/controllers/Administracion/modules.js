'use strict';
angular.module('softvFrostApp').config(function($stateProvider) {
	var states = [{
			name: 'home.administracion',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.administracion.cmts',
			data: {
				pageTitle: 'MonitoreoV2 | Administración CMTS',
				/*permissions: {
					only: ['sitediagnostictoolSelect'],
					options: {
						reload: true
					}
				}*/
			},
			url: '/administracion/cmts',
			templateUrl: 'views/Administracion/CMTS.html',
			controller: 'CMTSCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.administracion.cmtsnuevo',
			data: {
				pageTitle: 'MonitoreoV2 | Administración CMTS',
			},
			url: '/administracion/cmts/nuevo',
			templateUrl: 'views/Administracion/CMTSNuevo.html',
			controller: 'CMTSNuevoCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.administracion.cmtsedita',
			data: {
				pageTitle: 'MonitoreoV2 | Administración CMTS',
			},
			url: '/administracion/cmts/edita/:id',
			templateUrl: 'views/Administracion/CMTSEdita.html',
			controller: 'CMTSEditaCtrl',
			controllerAs: '$ctrl'
		},
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
});
