'use strict';
angular.module('softvFrostApp').controller('CMTSEditaCtrl', CMTSEditaCtrl);

function CMTSEditaCtrl(AdministracionFactory, $state, ngNotify, $stateParams) {
	var vm = this;
	vm.CMTSEdita = CMTSEdita;

	this.$onInit = function () {
		var IdCMTS = $stateParams.id;
		var obj = {};
		obj.IdCMTS = IdCMTS;
		AdministracionFactory.GetTipoCMTS().then(function(data){
		  	vm.Tipos = data.GetTipoCMTSResult;
			AdministracionFactory.GetCMTSPorId(obj).then(function(data) {
				vm.CMTS = data.GetCMTSPorIdResult;
				SeleccionaTipo(vm.CMTS.IdTipo);
				//console.log(vm.CMTS);
			});
		});
	}

	function SeleccionaTipo(IdTipo) {
      var indexAux = 0;
      vm.Tipos.forEach(function (item, index) {
        if (item.IdTipo === IdTipo) {
          vm.Tipo = item;
        }
      });
    }

	function CMTSEdita() {
	    var obj = {};
	    obj.IdCMTS = vm.CMTS.IdCMTS;
	    obj.Nombre = vm.CMTS.Nombre;
	    obj.IP = vm.CMTS.IP;
	    obj.Comunidad = vm.CMTS.Comunidad;
	    obj.ComunidadCablemodem = vm.CMTS.ComunidadCablemodem;
	    obj.IdTipo = vm.Tipo.IdTipo;
	    obj.interfaceS = vm.CMTS.Interface;
	    obj.Usuario = vm.CMTS.Usuario;
	    obj.PasswordS = vm.CMTS.Password;
	    obj.Enable = vm.CMTS.Enable;
	    AdministracionFactory.GetEditaCMTS(obj).then(function(data) {
	        $state.go('home.administracion.cmts');
	        ngNotify.set('CMTS guardado correctamente', 'success');
	    });
	  }

	
}
