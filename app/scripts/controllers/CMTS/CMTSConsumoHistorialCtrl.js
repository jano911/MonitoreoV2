'use strict';
angular
    .module('softvFrostApp')
    .controller('CMTSConsumoHistorialCtrl', function ($filter, $uibModalInstance, $uibModal, interfaz, $rootScope, ngNotify, $document, CMTSFactory) {

        function initialData() {
            vm.Interaz = interfaz;
            var obj = {};
            obj.MAC = vm.Interaz;
            obj.FechaInicio = '19000101';
            obj.FechaFin = '19000101';
            CMTSFactory.GetHistorialConsumoCMTSInterface(obj).then(function (data) {
                var historico = data.GetHistorialConsumoCMTSInterfaceResult;
                var bajada = [];
                var subida = [];
                historico.forEach(function (item, index) {
                    var x = new Date(parseInt(item.Fecha) * 1000);
                    var bAux = [
                        x.getTime(),
                        parseFloat(item.tx)
                    ];
                    var sAux = [
                        x.getTime(),
                        parseFloat(item.Rx)
                    ];
                    bajada.push(bAux);
                    subida.push(sAux);
                });
                //Time series chart
                vm.chart = Highcharts.chart('container2', {
                    chart: {
                        zoomType: 'x'
                    },
                    title: {
                        text: 'Historial de Consumo Interface ' + vm.Interaz
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
                                radius: 1
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

                vm.chart.addSeries({
                    name: 'Subida',
                    data: subida
                });
            });

        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function ok() {

        }

        function FiltraResultados() {
            var obj = {};
            obj.MAC = vm.Interaz;
            obj.FechaInicio = vm.fechaInicio;
            obj.FechaFin = vm.fechaFin;
            CMTSFactory.GetHistorialConsumoCMTSInterface(obj).then(function (data) {
                var historico = data.GetHistorialConsumoCMTSInterfaceResult;
                var bajada = [];
                var subida = [];
                historico.forEach(function (item, index) {
                    var x = new Date(parseInt(item.Fecha) * 1000);
                    var bAux = [
                        x.getTime(),
                        parseFloat(item.tx)
                    ];
                    var sAux = [
                        x.getTime(),
                        parseFloat(item.Rx)
                    ];
                    bajada.push(bAux);
                    subida.push(sAux);
                });
                //Time series chart
                vm.chart = Highcharts.chart('container2', {
                    chart: {
                        zoomType: 'x'
                    },
                    title: {
                        text: 'Historial de Consumo Interface ' + vm.Interaz
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
                                radius: 1
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

                vm.chart.addSeries({
                    name: 'Subida',
                    data: subida
                });
            });
        }

        var vm = this;
        vm.cancel = cancel;
        vm.ok = ok;
        initialData();
        vm.fechaInicio = new Date();
        vm.fechaFin = new Date();
        vm.FiltraResultados = FiltraResultados;
    });
