'use strict';
angular.module('softvFrostApp').controller('ListadoCablemodemsCtrl', ListadoCablemodemsCtrl);

function ListadoCablemodemsCtrl($state, CablemodemFactory, $timeout, AdministracionFactory) {

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
  var vm = this;
  vm.CambiaCMTS = CambiaCMTS;
  Init();
}