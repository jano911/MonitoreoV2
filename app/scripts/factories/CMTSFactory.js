'use strict';
angular.module('softvFrostApp')
	.factory('CMTSFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetCMTSDatos: '/CMTS/GetCMTSDatos'
		};

		factory.GetCMTSDatos = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
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
