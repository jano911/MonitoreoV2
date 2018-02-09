'use strict';
angular.module('softvFrostApp').controller('ListadoCablemodemsCtrl', ListadoCablemodemsCtrl);

function ListadoCablemodemsCtrl($state, CablemodemFactory, $timeout) {

  function Init() {
  	CablemodemFactory.GetListaCablemodem().then(function(data) {
      vm.rowCablemodems = data.GetListaCablemodemResult;
      //console.log(data);
    });
  }

  var vm = this;
  Init();
}