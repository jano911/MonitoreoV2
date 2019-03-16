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
          /*data: [ 
                { x: 0, y: 4 }, 
                { x: 1, y: 11490 }, 
                { x: 2, y: 38 }, 
                { x: 3, y: 0 }, 
                { x: 4, y: 320 }
                 ],*/
          data: seriesData[0],
          name: 'Bajada'
        }, {
          color: 'rgba(0,10,255,0.5)',
          /*data: [ 
                { x: 0, y: 40 }, 
                { x: 1, y: 10 }, 
                { x: 2, y: 11380 }, 
                { x: 3, y: 30 }, 
                { x: 4, y: 320}
                ],*/
          data: seriesData[1],
          name: 'Subida'
        }
      ]
    });

    console.log('3',seriesData);



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
