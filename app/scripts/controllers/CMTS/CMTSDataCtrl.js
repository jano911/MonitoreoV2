'use strict';
angular.module('softvFrostApp').controller('CMTSDataCtrl', CMTSDataCtrl);

function CMTSDataCtrl(AdministracionFactory, $state, CMTSFactory, $timeout) {

  function Init() {
    /*AdministracionFactory.GetCMTSLista().then(function (data) {
      vm.CMTSs = data.GetCMTSListaResult;
      vm.CMTSs.forEach(function (obj) { obj.Activo = false; });
      CambiaCMTS(vm.CMTSs[0]);
    });*/
    vm.valueCargaCPU = 0;
    vm.optionsCargaCPU = {
      skin: {
        type: 'tron'
      },
      size: 300,
      unit: "%",
      barWidth: 40,
      trackColor: 'rgba(255,0,0,.1)',
      prevBarColor: 'rgba(0,0,0,.2)',
      subText: {
        enabled: true,
        text: 'CPU used'
      },
      scale: {
        enabled: true,
        type: 'lines',
        width: 3
      },
      step: 5,
      displayPrevious: true
    };

    vm.totalMemoria = 0;
    vm.valueMemoria = 0;
    vm.optionsMemoria = {
      startAngle: 30,
      endAngle: 330,
      size: 300,
      unit: 'MB',
      trackColor: "rgba(162,121,143,1)",
      barColor: 'rgba(102,0,204,.5)',
      trackWidth: 15,
      barWidth: 15,
      subText: {
        enabled: true,
        text: 'Memoria Disponible'
      },
      max: 0,
      min: 0
    };

    vm.totalHDD = 0;
    vm.valueHDD = 0;
    vm.optionsHDD = {
      startAngle: 30,
      endAngle: 330,
      size: 300,
      unit: 'MB',
      trackColor: "rgba(162,121,143,1)",
      barColor: 'rgba(102,0,204,.5)',
      trackWidth: 15,
      barWidth: 15,
      subText: {
        enabled: true,
        text: 'HDD Disponible'
      },
      max: 0,
      min: 0
    };

    var parametros = {};
    parametros.IdCMTS = 0;
    CMTSFactory.GetCMTSDatos(parametros).then(function (data) {
      //console.log(data);
      vm.CMTSData = data.GetCMTSDatosResult;
      
      vm.totalMemoria = parseInt(vm.CMTSData.TotalMemory);
      vm.optionsMemoria.max = vm.totalMemoria;
      vm.valueMemoria = parseInt(vm.CMTSData.FreeMemory);

      vm.totalHDD = parseInt(vm.CMTSData.TotalhddSpace);
      vm.optionsHDD.max = vm.totalHDD;
      vm.valueHDD = parseInt(vm.CMTSData.FreehddSpace);

      vm.valueCargaCPU = parseInt(vm.CMTSData.CargaCPU);
      
     
      /*vm.totalMemoria = 250;
      vm.optionsMemoria.max = 250;
      vm.valueMemoria = 50; 

      vm.totalMemoria = 250;
      vm.optionsMemoria.max = 250;
      vm.valueMemoria = 50;

      vm.totalHDD = 500;
      vm.optionsHDD.max = 500;
      vm.valueHDD = 300;

      vm.valueCargaCPU = 50;*/
    });

  }

  function CambiaCMTS(CMTS) {
    //Descoloreamos el anterior
    if (vm.CMTS != undefined && vm.CMTS != null) {
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

  function ObtieneDatosCMTS() {
    var parametros = {};
    parametros.IdCMTS = vm.CMTS.IdCMTS;
    CMTSFactory.GetCMTSDatos(parametros).then(function (data) {
      //console.log(data);
      vm.CMTSData = data.GetCMTSDatosResult;
      $("#morris-donut-graph").empty();
      Morris.Donut({
        element: 'morris-donut-graph',
        data: [
          { label: "En línea", value: vm.CMTSData.EnLinea },
          { label: "Apagados", value: vm.CMTSData.Apagados },
          { label: "Suspendidos", value: vm.CMTSData.Suspendidos },
          { label: "En proceso", value: vm.CMTSData.EnProceso }
        ],
        colors: ["#64f28a", "#f25235", "#6394e7", "#eeaa56"],
        resize: 'true'
      });
    });
  }

  var vm = this;
  vm.cmtses = {};
  vm.CambiaCMTS = CambiaCMTS;
  Init();
}
