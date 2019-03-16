'use strict';
angular
    .module('softvFrostApp')
    .controller('TiempoRealCablemodemCtrl', function ($filter, $uibModalInstance, $uibModal, cablemodem, $rootScope, ngNotify, $document, CablemodemFactory, $scope) {

        function initialData() {
            vm.Cablemodem = cablemodem;

            var parametros = {};
            parametros.MAC = vm.Cablemodem.MAC;
            CablemodemFactory.GetDatosCliente(parametros).then(function (data) {
                vm.Cliente = data.GetDatosClienteResult;
                CablemodemFactory.GetIPCliente(parametros).then(function (data) {
                    vm.IP = data.GetIPClienteResult.IP;
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
angular.module('softvFrostApp').directive("chartRealtime", ['$document', function () {
    return {
        restrict: "E",
        scope: {
            mac: '@',
            ip: '@'
        },
        bindToController: true,
        template: '<div id="chart_container"><div id="chart" class="rickshaw_graph"></div><div id="legend_container"><div id="smoother" title="Smoothing"></div><div id="legend" class="rickshaw_legend"></div></div></div>',
        replace: true,
        controller: function ($interval, globalService, $http, $localStorage, $scope) {
            var vm = this;
            this.$onInit = function () {
                //Grafica nueva
                var obj = {};
                obj.MAC = this.mac;
                obj.IP = this.ip;

                var tv = 1000;
                var d = new Date();
                // instantiate our graph!
                var graph = new Rickshaw.Graph({
                    element: document.getElementById("chart"),
                    width: 700,
                    height: 300,
                    renderer: 'line',
                    series: new Rickshaw.Series.FixedDuration([{ name: 'Bajada' }, { name: 'Subida'}], undefined, {
                        timeInterval: tv,
                        maxDataPoints: 100,
                        timeBase: (d.getTime()/1000)-25200
                    })
                });


                var yAxis = new Rickshaw.Graph.Axis.Y({
                    graph: graph
                });

                yAxis.render();

                var xAxis = new Rickshaw.Graph.Axis.Time({
                    graph: graph
                });

                graph.render();

                // add some data every so often

                var i = 0;
                var iv = setInterval(function () {
                    var parametros = {};
                    parametros.MAC = obj.IP;
                    var config = {
                        headers: {
                            'Authorization': $localStorage.currentUser.token
                        }
                    };
                    var data={};
                    $http.post(globalService.getUrl() + '/Cablemodem/GetConsumoActual', parametros, config).then(function (response) {                        
                        var consumo = response.data.GetConsumoActualResult;
                        data.Bajada = parseInt(consumo.tx);
                        data.Subida = parseInt(consumo.Rx);

                        graph.series.addData(data);
                        graph.render();
                    });

                }, tv);


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
            }

            $scope.CierraDirectiva = function () {
                $interval.cancel(vm.oneTimer);
            };
        }
    }
}])