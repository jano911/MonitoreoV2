'use strict';
angular.module('softvFrostApp')
	.factory('CMTSFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetCMTSDatos: '/CMTS/GetCMTSDatos',
			GetHistorialConsumoCMTSInterface: '/CMTS/GetHistorialConsumoCMTSInterface'
		};

		factory.GetHistorialConsumoCMTSInterface = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				},
				Bloquea: true
			};
			$http.post(globalService.getUrl() + paths.GetHistorialConsumoCMTSInterface, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetCMTSDatos = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				},
				Bloquea: true
			};
			$http.post(globalService.getUrl() + paths.GetCMTSDatos, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		return factory;
	});
