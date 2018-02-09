'use strict';
angular.module('softvFrostApp').controller('CMTSCtrl', CMTSCtrl);

function CMTSCtrl(AdministracionFactory, $state) {

  function Init() {
  
    AdministracionFactory.GetCMTSLista().then(function(data) {
      vm.cmtses = data.GetCMTSListaResult;
    });
  }

  function CMTSElimina(IdCMTS){
    var parametros = {};
    parametros.IdCMTS = IdCMTS;
    AdministracionFactory.GetEliminaCMTS(parametros).then(function(data) {
      Init();
    });
  }

  var vm = this;
  vm.cmtses = {};
  vm.CMTSElimina = CMTSElimina;
  Init();
}
