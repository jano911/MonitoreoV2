'use strict';
angular.module('softvFrostApp')
	.factory('CablemodemFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetListaCablemodem: '/Cablemodem/GetListaCablemodem'
		};

		factory.GetListaCablemodem = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetListaCablemodem, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetNuevoCMTS = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			//console.log(JSON.stringify(parametros));
			$http.post(globalService.getUrl() + paths.GetNuevoCMTS, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};	

		return factory;
	});
