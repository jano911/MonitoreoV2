'use strict';
angular.module('softvFrostApp')
	.factory('AdministracionFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetCMTSLista: '/Administracion/GetCMTSLista',
			GetTipoCMTS: '/Administracion/GetTipoCMTS',
			GetNuevoCMTS: '/Administracion/GetNuevoCMTS',
			GetCMTSPorId: '/Administracion/GetCMTSPorId',
			GetEditaCMTS: '/Administracion/GetEditaCMTS',
			GetEliminaCMTS: '/Administracion/GetEliminaCMTS'
		};

		factory.GetCMTSLista = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.GetCMTSLista, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetTipoCMTS = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.GetTipoCMTS, config).then(function(response) {
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

		factory.GetCMTSPorId = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			$http.post(globalService.getUrl() + paths.GetCMTSPorId, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetEditaCMTS = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			$http.post(globalService.getUrl() + paths.GetEditaCMTS, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetEliminaCMTS = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			$http.post(globalService.getUrl() + paths.GetEliminaCMTS, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		

		return factory;
	});
