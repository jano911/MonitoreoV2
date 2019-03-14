'use strict';
angular.module('softvFrostApp').controller('CMTSDataCtrl', CMTSDataCtrl);

function CMTSDataCtrl(AdministracionFactory, $state, CMTSFactory) {

  function Init() {
    AdministracionFactory.GetCMTSLista().then(function(data) {
      vm.CMTSs = data.GetCMTSListaResult;
      vm.CMTSs.forEach(function(obj) { obj.Activo = false; });
      CambiaCMTS(vm.CMTSs[0]);
    });
    
  }

  function CambiaCMTS(CMTS){
    //Descoloreamos el anterior
    if(vm.CMTS != undefined && vm.CMTS != null)
    {
      var indexAux2 = 0;
      vm.CMTSs.forEach(function (item, index) {
        if (item.IdCMTS === vm.CMTS.IdCMTS) {
          indexAux2 = index;
        }
      });
      vm.CMTSs[indexAux2].Activo = false;
    }
    //Coloreamos el seleccionado
    var indexAux = 0;
    vm.CMTSs.forEach(function (item, index) {
      if (item.IdCMTS === CMTS.IdCMTS) {
        indexAux = index;
      }
    });
    vm.CMTSs[indexAux].Activo = true;
    vm.CMTS = CMTS;
    ObtieneDatosCMTS();
  }

  function ObtieneDatosCMTS(){
    var parametros = {};
    parametros.IdCMTS = vm.CMTS.IdCMTS;
    CMTSFactory.GetCMTSDatos(parametros).then(function(data) {
      //console.log(data);
      vm.CMTSData = data.GetCMTSDatosResult;
      $("#morris-donut-graph").empty();
      Morris.Donut({
        element: 'morris-donut-graph',
        data: [
          {label: "En línea", value: vm.CMTSData.EnLinea},
          {label: "Apagados", value: vm.CMTSData.Apagados},
          {label: "Suspendidos", value: vm.CMTSData.Suspendidos},
          {label: "En proceso", value: vm.CMTSData.EnProceso}
        ],
        colors : ["#64f28a","#f25235","#6394e7","#eeaa56"],
        resize: 'true'
      });
    });
  }
  
  var vm = this;
  vm.cmtses = {};
  vm.CambiaCMTS = CambiaCMTS;
  Init();
}
