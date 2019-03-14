'use strict';
angular
  .module('softvFrostApp')
  .controller('DetalleCablemodemCtrl', function ($filter, $uibModalInstance, $uibModal, cablemodem, $rootScope, ngNotify) {

    function initialData() {
      vm.Cablemodem = cablemodem;
      
      vm.valueSNR = 30;
      vm.optionsSNR = {
        size: 150,
        readOnly: true,
        subText: {
          enabled: true,
          text: 'SNR',
          color: 'gray',
          font: 'auto'
        },
        trackWidth: 25,
        barWidth: 15,
        trackColor: '#656D7F',
        barColor: '#2CC185',
        max: 60,
        min: 0
      };

      vm.valueUST = 30;
      vm.optionsUST = {
        size: 150,
        readOnly: true,
        subText: {
          enabled: true,
          text: 'Upstream',
          color: 'gray',
          font: 'auto'
        },
        trackWidth: 25,
        barWidth: 15,
        trackColor: '#656D7F',
        barColor: '#2CC185',
        max: 60,
        min: 0
      };

      vm.valueDST = 30;
      vm.optionsDST = {
        size: 150,
        readOnly: true,
        subText: {
          enabled: true,
          text: 'Downstream',
          color: 'gray',
          font: 'auto'
        },
        trackWidth: 25,
        barWidth: 15,
        trackColor: '#656D7F',
        barColor: '#2CC185',
        max: 60,
        min: 0
      };
    }

    function cancel(){
      $uibModalInstance.dismiss('cancel');
    }

    function ok(){
      
    }

    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    initialData();

  });
