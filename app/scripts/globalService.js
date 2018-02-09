'use strict';
angular.module('softvFrostApp')

  .service('globalService', function () {
    var svc = {};
    //rutas servidor producción
    svc.getUrl = function () {
      return 'http://localhost:64481/SoftvWCFService.svc';
    };

    return svc;
  });
