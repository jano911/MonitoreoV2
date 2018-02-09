'use strict';
angular.module('softvFrostApp').controller('CMTSNuevoCtrl', CMTSNuevoCtrl);

function CMTSNuevoCtrl($state, ngNotify, AdministracionFactory) {

  function init() {
    AdministracionFactory.GetTipoCMTS().then(function(data){
      //console.log(data);
      vm.Tipos=data.GetTipoCMTSResult;
    });
  };

  function CMTSNuevo() {
    var obj = {};
    obj.Nombre = vm.Nombre;
    obj.IP = vm.IP;
    obj.Comunidad = vm.Comunidad;
    obj.ComunidadCablemodem = vm.ComunidadCablemodems;
    obj.IdTipo = vm.TipoCMTS.IdTipo;
    obj.interfaceS = vm.Interface;
    obj.Usuario = vm.Usuario;
    obj.PasswordS = vm.PasswordS;
    obj.Enable = vm.Enable;
    AdministracionFactory.GetNuevoCMTS(obj).then(function(data) {
        $state.go('home.administracion.cmts');
        ngNotify.set('CMTS agregado correctamente', 'success');
    });
  }
  var vm = this;
  init();
  vm.CMTSNuevo = CMTSNuevo;
}
