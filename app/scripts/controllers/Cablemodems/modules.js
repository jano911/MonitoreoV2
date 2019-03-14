'use strict';
angular.module('softvFrostApp').config(function($stateProvider) {
	var states = [{
			name: 'home.cablemodems',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.cablemodems.listado',
			data: {
				pageTitle: 'MonitoreoV2 | Listado Cablemodems',
				/*permissions: {
					only: ['sitediagnostictoolSelect'],
					options: {
						reload: true
					}
				}*/
			},
			url: '/cablemodems/listado',
			templateUrl: 'views/Cablemodems/ListadoCablemodems.html',
			controller: 'ListadoCablemodemsCtrl',
			controllerAs: '$ctrl'
		},
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
});
