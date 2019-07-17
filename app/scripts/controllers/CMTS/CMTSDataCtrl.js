'use strict';
angular.module('softvFrostApp').controller('CMTSDataCtrl', CMTSDataCtrl);

function CMTSDataCtrl(CMTSFactory, $timeout, $localStorage, globalService, $interval, $http, $scope, $uibModal) {

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
      size: 250,
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
      displayPrevious: true,
      readonly: true
    };

    vm.totalMemoria = 0;
    vm.valueMemoria = 0;
    vm.optionsMemoria = {
      startAngle: 30,
      endAngle: 330,
      size: 250,
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
      min: 0,
      readonly: true
    };

    vm.totalHDD = 0;
    vm.valueHDD = 0;
    vm.optionsHDD = {
      startAngle: 30,
      endAngle: 330,
      size: 250,
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
      min: 0,
      readonly: true
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

      var bajada = [];
      var subida = [];

      vm.chart = Highcharts.chart('container', {
        chart: {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
            load: function () {

              // set up the updating of the chart each second
              vm.cmtsInterval = setInterval(function () {
                var parametros2 = {};
                parametros2.Interface = 'ether1';
                var config = {
                  headers: {
                    'Authorization': $localStorage.currentUser.token
                  },
                  Bloquea: false
                };
                $http.post(globalService.getUrl() + '/Cmts/GetCMTSConsumoInterface', parametros2, config).then(function (response) {
                  var consumo = response.data.GetCMTSConsumoInterfaceResult;
                  console.log(consumo);
                  var x = (new Date()).getTime(); // current time
                  vm.chart.series[0].addPoint([x, parseFloat(consumo.tx)], false, true);
                  vm.chart.series[1].addPoint([x, parseFloat(consumo.Rx)], false, true);
                  vm.chart.redraw();
                });
              }, 2000);
            }
          }
        },

        time: {
          useUTC: false
        },

        title: {
          text: 'Consumo Actual Interface ether1'
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: 'MB'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [{
          name: 'Bajada',
          data: (function () {
            // generate an array of random data
            var data = [],
              time = (new Date()).getTime(),
              i;

            for (i = -25; i <= 0; i += 1) {
              data.push({
                x: time + i * 2000,
                y: 0
              });
            }
            return data;
          }())
        },
        {
          name: 'Subida',
          data: (function () {
            // generate an array of random data
            var data = [],
              time = (new Date()).getTime(),
              i;

            for (i = -25; i <= 0; i += 1) {
              data.push({
                x: time + i * 2000,
                y: 0
              });
            }
            return data;
          }())
        }]
      });
    });

  }

  $scope.$on("$destroy", function () {
    clearInterval(vm.cmtsInterval);
  });

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

  function HistorialConsumo() {
    var interfaz = 'ether1';
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/CMTS/CMTSConsumoHistorial.html',
      controller: 'CMTSConsumoHistorialCtrl',
      controllerAs: 'ctrl',
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      resolve: {
        interfaz: function () {
          return interfaz;
        }
      }
    });

  }

  var vm = this;
  vm.cmtses = {};
  vm.CambiaCMTS = CambiaCMTS;
  vm.HistorialConsumo = HistorialConsumo;
  Init();
}
