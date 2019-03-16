'use strict';
angular.module('softvFrostApp').controller('ListadoCablemodemsCtrl', ListadoCablemodemsCtrl);

function ListadoCablemodemsCtrl($state, CablemodemFactory, $timeout, AdministracionFactory, $uibModal, $scope) {

  function Init() {
    /*AdministracionFactory.GetCMTSLista().then(function (data) {
      vm.CMTSs = data.GetCMTSListaResult;
    });*/
    var obj = {};
    obj.IdCMTS = 0;
    CablemodemFactory.GetListaCablemodem(obj).then(function (data) {
      vm.rowCablemodems = data.GetListaCablemodemResult;
    });
  }

  function CambiaCMTS() {
    var obj = {};
    obj.IdCMTS = 0;
    CablemodemFactory.GetListaCablemodem(obj).then(function (data) {
      vm.rowCablemodems = data.GetListaCablemodemResult;
    });
  }
  $scope.MAC = 'Prueba';
  function DetalleCablemodem(object) {
    //console.log(object);
    vm.MAC = object.MAC;
    $scope.MAC = object.MAC;
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

  $scope.MAC = 'Prueba';
  function ConsumoTiempoReal(object) {
    //console.log(object);
    vm.MAC = object.MAC;
    $scope.MAC = object.MAC;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/Cablemodems/TiempoRealCablemodem.html',
      controller: 'TiempoRealCablemodemCtrl',
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
  vm.ConsumoTiempoReal = ConsumoTiempoReal;
  Init();
}
angular.module('softvFrostApp').directive("chartCanvas", ['$document', function () {
  return {
    restrict: "E",
    scope: {
      mac: '@'
    },
    bindToController: true,
    template: '<div id="chart_container"><div id="chart" class="rickshaw_graph"></div><div id="legend_container"><div id="smoother" title="Smoothing"></div><div id="legend" class="rickshaw_legend"></div></div><div id="slider"></div></div>',
    replace: true,
    controller: function (CablemodemFactory) {

      this.$onInit = function () {
        //Grafica nueva
        var obj = {};
        obj.MAC = this.mac;

        CablemodemFactory.GetHistorialConsumo(obj).then(function (data) {
          console.log('1', data);
          var historico = data.GetHistorialConsumoResult;
          var bajada = [];
          var subida = [];
          historico.forEach(function (item, index) {
            var bAux = {
              x: parseFloat(item.Fecha),
              y: parseFloat(item.Rx)
            };
            var sAux = {
              x: parseFloat(item.Fecha),
              y: parseFloat(item.tx)
            };
            bajada.push(bAux);
            subida.push(sAux);
          });

          var graph = new Rickshaw.Graph({
            element: document.getElementById("chart"),
            width: 700,
            height: 350,
            renderer: 'line',

            series: [
              {
                color: 'rgba(255,0,0,0.3)',
                data: subida,
                name: 'Bajada (MB)'
              }, {
                color: 'rgba(0,10,255,0.5)',
                data: bajada,
                name: 'Subida (MB)'
              }
            ]
          });
          var yAxis = new Rickshaw.Graph.Axis.Y({
            graph: graph
          });
          yAxis.render();
          var xAxis = new Rickshaw.Graph.Axis.Time({
            graph: graph
          });
          xAxis.render();
          var slider = new Rickshaw.Graph.RangeSlider.Preview({
            graph: graph,
            element: document.querySelector('#slider')
          });
          graph.render();
          var hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph: graph
          });
          var legend = new Rickshaw.Graph.Legend({
            graph: graph,
            element: document.getElementById('legend')
          });
          var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
            graph: graph,
            legend: legend
          });
        });
      }



    }
  }
}])
