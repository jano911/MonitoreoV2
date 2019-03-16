'use strict';
angular
  .module('softvFrostApp')
  .controller('DetalleCablemodemCtrl', function ($filter, $uibModalInstance, $uibModal, cablemodem, $rootScope, ngNotify, $document, CablemodemFactory) {

    function initialData() {
      vm.Cablemodem = cablemodem;

      var parametros = {};
      parametros.MAC = vm.Cablemodem.MAC;
      CablemodemFactory.GetDatosCliente(parametros).then(function (data) {
        vm.Cliente = data.GetDatosClienteResult;
        console.log(data);
      });

    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ok() {

    }

    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    initialData();

  });
