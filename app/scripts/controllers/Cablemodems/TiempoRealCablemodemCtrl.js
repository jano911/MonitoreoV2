'use strict';
angular
    .module('softvFrostApp')
    .controller('TiempoRealCablemodemCtrl', function ($filter, $uibModalInstance, cablemodem, CablemodemFactory, $localStorage, $interval, globalService, $http) {

        function initialData() {
            vm.Cablemodem = cablemodem;

            var parametros = {};
            parametros.MAC = vm.Cablemodem.MAC;
            console.log('parametros',parametros);
            CablemodemFactory.GetDatosCliente(parametros).then(function (data) {
                vm.Cliente = data.GetDatosClienteResult;
                parametros.MAC = '';
                for (var i=0; i < vm.Cablemodem.MAC.length; i++) {
                    console.log(vm.Cablemodem.MAC.charAt(i)); 
                    parametros.MAC = parametros.MAC + vm.Cablemodem.MAC.charAt(i);
                    if(((i+1) % 2) == 0 && i != (vm.Cablemodem.MAC.length-1))
                        parametros.MAC = parametros.MAC + ':';
                }
                console.log(parametros);
                CablemodemFactory.GetIPCliente(parametros).then(function (data) {
                    console.log('GetIPCliente',data);
                    vm.IP = data.GetIPClienteResult.IP;

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
                                    var series = this.series[0];
                                    vm.interval = setInterval(function () {
                                        var parametros2 = {};
                                        parametros2.MAC = vm.IP;
                                        var config = {
                                            headers: {
                                                'Authorization': $localStorage.currentUser.token
                                            },
                                            Bloquea: false
                                        };
                                        $http.post(globalService.getUrl() + '/Cablemodem/GetConsumoActual', parametros2, config).then(function (response) {
                                            var consumo = response.data.GetConsumoActualResult;
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
                            text: 'Consumo Actual'
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
                    /*
                    vm.interval = setInterval(function () {
                        var parametros = {};
                        parametros.MAC = vm.IP;
                        var config = {
                            headers: {
                                'Authorization': $localStorage.currentUser.token
                            }
                        };
                        var data = {};
                        $http.post(globalService.getUrl() + '/Cablemodem/GetConsumoActual', parametros, config).then(function (response) {
                            var consumo = response.data.GetConsumoActualResult;

                            chart.series[0].addPoint([(new Date()).getTime(), parseFloat(consumo.tx)], false, true);
                            chart.series[1].addPoint([(new Date()).getTime(), parseFloat(consumo.Rx)], false, true);
                            chart.redraw();
                        });

                    }, 1000);*/
                });
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
            clearInterval(vm.interval);
        }

        function ok() {

        }

        var vm = this;
        vm.cancel = cancel;
        vm.ok = ok;
        initialData();

    });
/*angular.module('softvFrostApp').directive("chartRealtime", ['$document', function () {
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
                    series: new Rickshaw.Series.FixedDuration([{ name: 'Bajada' }, { name: 'Subida' }], undefined, {
                        timeInterval: tv,
                        maxDataPoints: 100,
                        timeBase: (d.getTime() / 1000) - 25200
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
                    var data = {};
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
}])*/