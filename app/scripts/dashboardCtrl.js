'use strict';
angular.module('softvFrostApp').controller('dashboardCtrl', dashboardCtrl);

function dashboardCtrl(AdministracionFactory, $state) {

  function Init() {
    AdministracionFactory.GetCMTSLista().then(function(data) {
      vm.CMTSs = data.GetCMTSListaResult;
      vm.CMTSs.forEach(function(obj) { obj.Activo = false; });
    });
    Morris.Donut({
      element: 'morris-donut-graph',
      data: [
        {label: "En línea", value: 12},
        {label: "Apagados", value: 30},
        {label: "Suspendidos", value: 20},
        {label: "En proceso", value: 5}
      ],
      colors : ["#64f28a","#f25235","#6394e7","#eeaa56"]
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
  }
  
  var vm = this;
  vm.cmtses = {};
  vm.CambiaCMTS = CambiaCMTS;
  Init();
}
