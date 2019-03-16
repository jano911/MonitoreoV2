'use strict';
angular.module('softvFrostApp')
	.factory('CablemodemFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetListaCablemodem: '/Cablemodem/GetListaCablemodem',
			GetHistorialConsumo: '/Cablemodem/GetHistorialConsumo',
			GetDatosCliente: '/Cablemodem/GetDatosCliente',
			GetConsumoActual: '/Cablemodem/GetConsumoActual',
			GetIPCliente: '/Cablemodem/GetIPCliente'
		};

		factory.GetIPCliente = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetIPCliente, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetConsumoActual = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetConsumoActual, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
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
		
		factory.GetHistorialConsumo = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetHistorialConsumo, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetDatosCliente = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetDatosCliente, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		return factory;
	});
