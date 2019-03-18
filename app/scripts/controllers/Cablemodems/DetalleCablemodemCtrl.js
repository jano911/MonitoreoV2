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

        var obj = {};
        obj.MAC = vm.Cablemodem.MAC;
        CablemodemFactory.GetHistorialConsumo(obj).then(function (data) {
          var historico = data.GetHistorialConsumoResult;
          var bajada = [];
          var subida = [];
          historico.forEach(function (item, index) {
            var bAux = [
              parseFloat(item.Fecha),
              parseFloat(item.Rx)
            ];
            var sAux = [
              parseFloat(item.Fecha),
              parseFloat(item.tx)
            ];
            bajada.push(bAux);
            subida.push(sAux);
          });

          var chart = Highcharts.chart('container', {
            chart: {
              zoomType: 'x'
            },
            title: {
              text: 'Historial de Consumo'
            },
            subtitle: {
              text: document.ontouchstart === undefined ?
                'Haz click y arrastra en el área de la gráfica para hacer zoom' : ''
            },
            xAxis: {
              type: 'datetime'
            },
            yAxis: {
              title: {
                text: 'MB'
              }
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              area: {
                fillColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                  },
                  stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
                },
                marker: {
                  radius: 2
                },
                lineWidth: 1,
                states: {
                  hover: {
                    lineWidth: 1
                  }
                },
                threshold: null
              }
            },

            series: [{
              type: 'line',
              name: 'Bajada',
              data: bajada
            }]
          });

          chart.addSeries({
            name: 'Subida',
            data: subida
          });
        });
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
