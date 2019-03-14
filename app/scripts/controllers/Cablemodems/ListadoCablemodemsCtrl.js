'use strict';
angular.module('softvFrostApp').controller('ListadoCablemodemsCtrl', ListadoCablemodemsCtrl);

function ListadoCablemodemsCtrl($state, CablemodemFactory, $timeout, AdministracionFactory, $uibModal) {

  function Init() {
  	AdministracionFactory.GetCMTSLista().then(function(data) {
      vm.CMTSs = data.GetCMTSListaResult;
    });
  }

  function CambiaCMTS(){
  	var obj = {};
  	obj.IdCMTS = vm.CMTS.IdCMTS;
  	CablemodemFactory.GetListaCablemodem(obj).then(function(data) {
      vm.rowCablemodems = data.GetListaCablemodemResult;
    });
  }

  function DetalleCablemodem(object) {
    //console.log(object);
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/Cablemodems/DetalleCablemodem.html',
      controller: 'DetalleCablemodemCtrl',
      controllerAs: 'ctrl',
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      resolve: {
        cablemodem: function () {
          return object;
        }
      }
    });

  }

  var vm = this;
  vm.CambiaCMTS = CambiaCMTS;
  vm.DetalleCablemodem = DetalleCablemodem;
  Init();
}