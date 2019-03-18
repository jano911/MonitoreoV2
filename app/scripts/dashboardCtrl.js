'use strict';
angular.module('softvFrostApp').controller('dashboardCtrl', dashboardCtrl);

function dashboardCtrl(AdministracionFactory, $state) {

  function Init() {
    AdministracionFactory.GetCMTSLista().then(function (data) {
      vm.CMTSs = data.GetCMTSListaResult;
      vm.CMTSs.forEach(function (obj) { obj.Activo = false; });
    });
    Morris.Donut({
      element: 'morris-donut-graph',
      data: [
        { label: "En línea", value: 12 },
        { label: "Apagados", value: 30 },
        { label: "Suspendidos", value: 20 },
        { label: "En proceso", value: 5 }
      ],
      colors: ["#64f28a", "#f25235", "#6394e7", "#eeaa56"]
    });

    /*
    //Grafica nueva
    var seriesData = [[], [], []];
    console.log(seriesData);
    var random = new Rickshaw.Fixtures.RandomData(150);
    console.log(random);

    for (var i = 0; i < 150; i++) {
      random.addData(seriesData);
    }

    // instantiate our graph!

    var graph = new Rickshaw.Graph({
      element: document.getElementById("chart"),
      width: 960,
      height: 500,
      renderer: 'line',

      series: [
        {
          color: 'rgba(255,0,0,0.3)',
          data: seriesData[0],
          name: 'Bajada'
        }, {
          color: 'rgba(0,10,255,0.5)',
          data: seriesData[1],
          name: 'Subida'
        }
      ]
    });

    console.log('3', seriesData);



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
*/


    //Otra opción de Grafica
    vm.options = {
      data: [
        {
          sales: 130,
          weekday: 'Monday',
          date: '2015-04-04 12:13:55'
        },
        {
          sales: 150,
          weekday: 'Monday',
          date: '2015-04-05 12:13:55'
        },
        {
          sales: 50,
          weekday: 'Monday',
          date: '2015-04-06 12:13:55'
        }
      ],
      dimensions: {
        sales: {
          type: 'line'
        },
        income: {
          axis: 'y2'
        }
      }
    };

    // optional (direct access to c3js API http://c3js.org/reference.html#api)
    vm.instance = null;

    var data = [[1167609600000, 0.7537],
    [1167696000000, 0.7537],
    [1167782400000, 0.7559],
    [1167868800000, 0.7631],
    [1167955200000, 0.7644],
    [1168214400000, 0.769],
    [1168300800000, 0.7683]];
    /*
        Morris.Line({
          element: 'morris-line-graph',
          data: data,
          xkey: 'x',
          ykeys: 'y',
          labels: ['sin()', 'cos()'],
          parseTime: true,
          ymin: 0,
          ymax: 200,
          hideHover: true
        });*/
    /*
        var data = [[1167609600000, 0.7537],
        [1167696000000, 0.7537],
        [1167782400000, 0.7559],
        [1167868800000, 0.7631],
        [1167955200000, 0.7644],
        [1168214400000, 0.769],
        [1168300800000, 0.7683]];
    
        var data2 = [[1167609600000, 0.8537],
        [1167696000000, 0.8537],
        [1167782400000, 0.8559],
        [1167868800000, 0.8631],
        [1167955200000, 0.8644],
        [1168214400000, 0.869],
        [1168300800000, 0.8683]];
        var chart = Highcharts.chart('container', {
          chart: {
            zoomType: 'x'
          },
          title: {
            text: 'USD to EUR exchange rate over time'
          },
          subtitle: {
            text: document.ontouchstart === undefined ?
              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: 'Exchange rate'
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
            name: 'USD to EUR',
            data: data
          }]
        });
        chart.addSeries({
            name: 'USD to EUR2',
            data: data2
        });*/
    var chart = Highcharts.chart('container', {
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function () {

            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random();
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },

      time: {
        useUTC: false
      },

      title: {
        text: 'Live random data'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: 'Value'
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
        name: 'Random data',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()
            });
          }
          return data;
        }())
      },
      {
        name: 'Random data2',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()
            });
          }
          return data;
        }())
      }]
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
  }

  var vm = this;
  vm.cmtses = {};
  vm.CambiaCMTS = CambiaCMTS;
  Init();
}
