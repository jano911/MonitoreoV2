'use strict';
angular.module('softvFrostApp')

  .service('globalService', function () {
    var svc = {};
    //rutas servidor producción
    svc.getUrl = function () {
      return 'http://192.168.50.10:8081/SoftvWCFService.svc';
      //return 'http://localhost:64481/SoftvWCFService.svc';
    };

    return svc;
  });
