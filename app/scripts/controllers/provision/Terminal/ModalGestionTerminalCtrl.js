'use strict';
angular

  .module('softvFrostApp')
  .controller('ModalGestionTerminalCtrl', function ($filter, $uibModalInstance, $uibModal, terminalFactory, terminal, $rootScope, ngNotify, globalService) {

    function initialData() {
      vm.Terminal = terminal;
      console.log(vm.Terminal);
      terminalFactory.getComandoList().then(function (data) {
        vm.Comandos = data.GetComandoListResult;
        console.log(data);
        //Vamos a dejar los comandos dependiendo del estado de la terminal
        if (vm.Terminal.Estatus == "Incompleta") { //Pendiente
          vm.Comandos.splice(9, 1);
          vm.Comandos.splice(8, 1);
          vm.Comandos.splice(7, 1);
          vm.Comandos.splice(6, 1);
          vm.Comandos.splice(5, 1);
          vm.Comandos.splice(4, 1);
          vm.Comandos.splice(3, 1);
          vm.Comandos.splice(2, 1);
          vm.Comandos.splice(1, 1);
        } else if (vm.Terminal.Estatus == "Pendiente") { //Pendiente
          vm.Comandos.splice(9, 1);
          vm.Comandos.splice(8, 1);
          vm.Comandos.splice(7, 1);
          vm.Comandos.splice(6, 1);
          vm.Comandos.splice(5, 1);
          vm.Comandos.splice(4, 1);
          vm.Comandos.splice(3, 1);
          vm.Comandos.splice(2, 1);
          vm.Comandos.splice(1, 1);
          vm.Comandos.splice(0, 1);
        } else if (vm.Terminal.Estatus == "Activa") { //Activa
          vm.Comandos.splice(8, 1);
          vm.Comandos.splice(7, 1);
          vm.Comandos.splice(6, 1);
          vm.Comandos.splice(2, 1);
          vm.Comandos.splice(0, 1);
          terminalFactory.getServicioList().then(function (data) {
            vm.Servicios = data.GetServicioListResult;
          });
          //Nos vamos a traer el fap status y el consumo
          var obj = new Object();
          obj.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
          terminalFactory.hughesConsumoDeTerminal(obj).then(function (hughesData) {
            console.log(hughesData);
            vm.Consumo = new Object();
            vm.Consumo.Disponible = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.AnyTimeBandwidthAvailable;
            vm.Consumo.Consumido = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.AnyTimeBandwidthUsed;
            vm.Consumo.DiaRelleno = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.RefillDayOfMonth;
            vm.Token = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.TokenBandwidthAvailable;
          });
          terminalFactory.hughesFapStatus(obj).then(function (hughesData) {
            console.log(hughesData);
            if (hughesData.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == -1) {
              vm.FapStatus = "Not Activated";
            } else if (hughesData.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == 0) {
              vm.FapStatus = "Unthrottled";
            } else if (hughesData.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == 1) {
              vm.FapStatus = "Throttled";
            }
          });
          console.log(vm.Comandos);
        } else if (vm.Terminal.Estatus == "Suspendida") { //Suspendida
          vm.Comandos.splice(9, 1);
          vm.Comandos.splice(8, 1);
          vm.Comandos.splice(7, 1);
          vm.Comandos.splice(6, 1);
          vm.Comandos.splice(5, 1);
          vm.Comandos.splice(4, 1);
          vm.Comandos.splice(1, 1);
          vm.Comandos.splice(0, 1);
          //Nos vamos a traer el fap status y el consumo
          var obj = new Object();
          obj.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
          terminalFactory.hughesFapStatus(obj).then(function (hughesData) {
            console.log(hughesData);
            if (hughesData.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == -1) {
              vm.FapStatus = "Not Activated";
            } else if (hughesData.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == 0) {
              vm.FapStatus = "Unthrottled";
            } else if (hughesData.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == 1) {
              vm.FapStatus = "Throttled";
            }
          });
        } else if (vm.Terminal.Estatus == "Cancelada") { //Cancelada
          vm.Comandos.splice(9, 1);
          vm.Comandos.splice(8, 1);
          vm.Comandos.splice(7, 1);
          vm.Comandos.splice(6, 1);
          vm.Comandos.splice(5, 1);
          vm.Comandos.splice(4, 1);
          vm.Comandos.splice(3, 1);
          vm.Comandos.splice(2, 1);
          vm.Comandos.splice(1, 1);
          vm.Comandos.splice(0, 1);
        }
      });
    }

    function aplicaComando() {
      console.log(vm.Terminal);
      var parametros = new Object();

      terminalFactory.GetValidaEjecucionComando(vm.Comando.IdComando).then(function (data) {
        if (data.GetValidaEjecucionComandoResult == 0) {
          ngNotify.set('¡Atención! No tiene permisos para aplicar este comando', 'warn');
          return;
        } else {

          if (vm.Comando.IdComando == 1) //Crear
          {


            terminalFactory.getSuscriptorById(vm.Terminal.IdSuscriptor).then(function (data) {
              var suscriptor = data.GetSuscriptorResult;
              var obj = new Object();
              //Crea la terminal en la plataforma de Hughes
              terminalFactory.getSequenceId().then(function (Sequence) {
                obj.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
                obj.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
                obj.nombre = suscriptor.Nombre;
                obj.apellido = suscriptor.Apellido;
                obj.direccion = suscriptor.Calle + ' ' + suscriptor.Numero;
                obj.ciudad = suscriptor.Ciudad;
                //Obtiene el código del estado para hughes
                terminalFactory.getEstadoById(suscriptor.IdEstado).then(function (data) {
                  obj.estado = data.GetEstadoResult.Codigo;
                  obj.codigoPostal = suscriptor.CP;
                  obj.latitud = vm.Terminal.Latitud;
                  obj.longitud = vm.Terminal.Longitud;
                  obj.telefono = suscriptor.Telefono;
                  obj.email = suscriptor.Email;
                  obj.servicio = vm.Terminal.Servicio;
                  //Validamos las coordenadas para traernos el satelite y el beam
                  var parametros = new Object();
                  parametros.servicio = vm.Servicio.Nombre;
                  parametros.latitud = vm.Latitud;
                  parametros.longitud = vm.Longuitud;
                  terminalFactory.hughesValidaServicio(parametros).then(function (hughesDataSPQ) {
                    //console.log(hughesData);
                    vm.BeamID = hughesDataSPQ.soapEnvelope.soapBody.ServicePrequalificationResponseMsg.BeamID;
                    vm.SatelliteID = hughesDataSPQ.soapEnvelope.soapBody.ServicePrequalificationResponseMsg.SatellitedID;
                    vm.Polarization = hughesDataSPQ.soapEnvelope.soapBody.ServicePrequalificationResponseMsg.Polarization;
                    terminalFactory.hughesCrearTerminal(obj).then(function (hughesData) {
                      console.log(hughesData);
                      var Obj2 = new Object();
                      Obj2.objMovimiento = new Object();
                      Obj2.objMovimiento.SAN = vm.Terminal.SAN;
                      Obj2.objMovimiento.IdComando = 1; //Hardcodeado a la tabla de Comando
                      Obj2.objMovimiento.IdUsuario = 0;
                      Obj2.objMovimiento.IdTicket = 0;
                      Obj2.objMovimiento.OrderId = hughesData.StandardResponse.OrderId;
                      vm.fechaAuxiliar = new Date();
                      Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
                      Obj2.objMovimiento.Mensaje = hughesData.StandardResponse.Message;
                      Obj2.objMovimiento.IdOrigen = 2; //Hardcodeado a la tabla de OrigenMovimiento
                      Obj2.objMovimiento.Detalle1 = '';
                      Obj2.objMovimiento.Detalle2 = '';
                      if (hughesData.StandardResponse.Code != '5') {
                        ngNotify.set('Error al crear la terminal en la plataforma.', 'error');
                        //Ponemos el movimiento como no exitoso
                        Obj2.objMovimiento.Exitoso = 0;
                      } else {
                        //Actualiza el estatus en la base en caso de que haya sido exitoso
                        var Obj3 = new Object();
                        Obj3.objTerminal = new Object();
                        Obj3.objTerminal.SAN = vm.Terminal.SAN;
                        Obj3.objTerminal.IdSuscriptor = vm.Terminal.IdSuscriptor;
                        Obj3.objTerminal.IdServicio = vm.Terminal.IdServicio;
                        Obj3.objTerminal.Latitud = vm.Terminal.Latitud;
                        Obj3.objTerminal.Longitud = vm.Terminal.Longitud;
                        Obj3.objTerminal.Estatus = 'Pendiente';
                        Obj3.objTerminal.FechaAlta = vm.Terminal.FechaAlta;
                        Obj3.objTerminal.FechaSuspension = vm.Terminal.FechaSuspension;
                        Obj3.objTerminal.ESN = vm.Terminal.ESN;
                        Obj3.objTerminal.Comentarios = vm.Terminal.Comentarios;
                        terminalFactory.updateTerminal(Obj3).then(function (data) {
                          ngNotify.set('La terminal se ha creado correctamente', 'success');
                        });

                        //Ponemos el movimiento como exitoso
                        Obj2.objMovimiento.Exitoso = 1;

                        //Objeto para actualizar el SatelliteId y BeamId a la terminal
                        var Obj3 = new Object();
                        Obj3.objTerminal = new Object();
                        Obj3.objTerminal.SatellitedID = vm.SatelliteID;
                        Obj3.objTerminal.BeamID = vm.BeamID;
                        Obj3.objTerminal.Polarization = vm.Polarization;
                        Obj3.objTerminal.SAN = vm.Terminal.SAN;

                        //Actualizamos información adicional de la terminal
                        terminalFactory.agregaInfoTerminal(Obj3).then(function (obj) {});
                      }
                      terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {

                      });
                    });
                  });
                });
              });
            });
          } else if (vm.Comando.IdComando == 2) //Suspender terminal
          {

            terminalFactory.getSequenceId().then(function (Sequence) {
              parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
              parametros.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
              parametros.status = 2; //Status hardcodeado de hughes
              terminalFactory.hughesCambiarStatusServicio(parametros).then(function (hughesData) {
                console.log(hughesData);
                if (hughesData.StandardResponse.Code != 5) {
                  //Guarda el movimiento sin OrderID
                  var Obj2 = new Object();
                  Obj2.objMovimiento = new Object();
                  Obj2.objMovimiento.SAN = vm.Terminal.SAN;
                  Obj2.objMovimiento.IdComando = 2; //Hardcodeado a la tabla de Comando
                  Obj2.objMovimiento.IdUsuario = 0;
                  Obj2.objMovimiento.IdTicket = 0;
                  Obj2.objMovimiento.OrderId = 0;
                  vm.fechaAuxiliar = new Date();
                  Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
                  Obj2.objMovimiento.Mensaje = hughesData.StandardResponse.Message;
                  Obj2.objMovimiento.IdOrigen = 2; //Hardcodeado a la tabla de OrigenMovimiento
                  Obj2.objMovimiento.Detalle1 = '';
                  Obj2.objMovimiento.Detalle2 = '';
                  Obj2.objMovimiento.Exitoso = 0;
                  terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {});
                  ngNotify.set('Error al suspender la terminal. Consulte el movimiento para más información', 'error');
                } else {
                  //Guarda el movimiento con OrderId
                  var Obj2 = new Object();
                  Obj2.objMovimiento = new Object();
                  Obj2.objMovimiento.SAN = vm.Terminal.SAN;
                  Obj2.objMovimiento.IdComando = 2; //Hardcodeado a la tabla de Comando
                  Obj2.objMovimiento.IdUsuario = 0;
                  Obj2.objMovimiento.IdTicket = 0;
                  Obj2.objMovimiento.OrderId = hughesData.StandardResponse.OrderId;
                  vm.fechaAuxiliar = new Date();
                  Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
                  Obj2.objMovimiento.Mensaje = hughesData.StandardResponse.Message;
                  Obj2.objMovimiento.IdOrigen = 2; //Hardcodeado a la tabla de OrigenMovimiento
                  Obj2.objMovimiento.Detalle1 = '';
                  Obj2.objMovimiento.Detalle2 = '';
                  Obj2.objMovimiento.Exitoso = 1;
                  terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {

                    var Obj3 = new Object();
                    Obj3.objTerminal = new Object();
                    Obj3.objTerminal.SAN = vm.Terminal.SAN;
                    Obj3.objTerminal.IdSuscriptor = vm.Terminal.IdSuscriptor;
                    Obj3.objTerminal.IdServicio = vm.Terminal.IdServicio;
                    Obj3.objTerminal.Latitud = vm.Terminal.Latitud;
                    Obj3.objTerminal.Longitud = vm.Terminal.Longitud;
                    Obj3.objTerminal.Estatus = 'Suspendida';
                    Obj3.objTerminal.FechaAlta = vm.Terminal.FechaAlta;
                    Obj3.objTerminal.FechaSuspension = vm.Terminal.FechaSuspension;
                    Obj3.objTerminal.ESN = vm.Terminal.ESN;
                    Obj3.objTerminal.Comentarios = vm.Terminal.Comentarios;
                    terminalFactory.updateTerminal(Obj3).then(function (data) {
                      ngNotify.set('La terminal se ha suspendido correctamente', 'success');
                    });

                  });
                  //Actualiza el estatus en la base en caso de que haya sido exitoso

                }
              });
            });
          } else if (vm.Comando.IdComando == 3) //Reactivar
          {

            terminalFactory.getSequenceId().then(function (Sequence) {
              parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
              parametros.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
              parametros.status = 3; //Status hardcodeado de hughes
              terminalFactory.hughesCambiarStatusServicio(parametros).then(function (hughesData) {
                console.log(hughesData);
                if (hughesData.StandardResponse.Code != 5) {
                  //Guarda el movimiento sin OrderID
                  var Obj2 = new Object();
                  Obj2.objMovimiento = new Object();
                  Obj2.objMovimiento.SAN = vm.Terminal.SAN;
                  Obj2.objMovimiento.IdComando = 3; //Hardcodeado a la tabla de Comando
                  Obj2.objMovimiento.IdUsuario = 0;
                  Obj2.objMovimiento.IdTicket = 0;
                  Obj2.objMovimiento.OrderId = 0;
                  vm.fechaAuxiliar = new Date();
                  Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
                  Obj2.objMovimiento.Mensaje = hughesData.StandardResponse.Message;
                  Obj2.objMovimiento.IdOrigen = 2; //Hardcodeado a la tabla de OrigenMovimiento
                  Obj2.objMovimiento.Detalle1 = '';
                  Obj2.objMovimiento.Detalle2 = '';
                  Obj2.objMovimiento.Exitoso = 0;
                  terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {});
                  ngNotify.set('Error al reactivar la terminal. Consulte el movimiento para más información', 'error');
                } else {
                  //Guarda el movimiento con OrderId
                  var Obj2 = new Object();
                  Obj2.objMovimiento = new Object();
                  Obj2.objMovimiento.SAN = vm.Terminal.SAN;
                  Obj2.objMovimiento.IdComando = 3; //Hardcodeado a la tabla de Comando
                  Obj2.objMovimiento.IdUsuario = 0;
                  Obj2.objMovimiento.IdTicket = 0;
                  Obj2.objMovimiento.OrderId = hughesData.StandardResponse.OrderId;
                  vm.fechaAuxiliar = new Date();
                  Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
                  Obj2.objMovimiento.Mensaje = hughesData.StandardResponse.Message;
                  Obj2.objMovimiento.IdOrigen = 2; //Hardcodeado a la tabla de OrigenMovimiento
                  Obj2.objMovimiento.Detalle1 = '';
                  Obj2.objMovimiento.Detalle2 = '';
                  Obj2.objMovimiento.Exitoso = 1;
                  terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {

                    //Actualiza el estatus en la base en caso de que haya sido exitoso
                    var Obj3 = new Object();
                    Obj3.objTerminal = new Object();
                    Obj3.objTerminal.SAN = vm.Terminal.SAN;
                    Obj3.objTerminal.IdSuscriptor = vm.Terminal.IdSuscriptor;
                    Obj3.objTerminal.IdServicio = vm.Terminal.IdServicio;
                    Obj3.objTerminal.Latitud = vm.Terminal.Latitud;
                    Obj3.objTerminal.Longitud = vm.Terminal.Longitud;
                    Obj3.objTerminal.Estatus = 'Activa';
                    Obj3.objTerminal.FechaAlta = vm.Terminal.FechaAlta;
                    Obj3.objTerminal.FechaSuspension = vm.Terminal.FechaSuspension;
                    Obj3.objTerminal.ESN = vm.Terminal.ESN;
                    Obj3.objTerminal.Comentarios = vm.Terminal.Comentarios;
                    terminalFactory.updateTerminal(Obj3).then(function (data) {
                      ngNotify.set('La terminal se ha reactivado correctamente', 'success');
                    });


                  });

                }
              });
            });
          } else if (vm.Comando.IdComando == 4) //Cancelar
          {


						terminalFactory.getSequenceId().then(function (Sequence) {
							parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
							parametros.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
							parametros.status = 1;
							terminalFactory.hughesCambiarStatusServicio(parametros).then(function (hughesData) {
								console.log(hughesData);
								if (hughesData.StandardResponse.Code != 5) {
									//Guarda el movimiento sin OrderID
									var Obj2 = new Object();
									Obj2.objMovimiento = new Object();
									Obj2.objMovimiento.SAN = vm.Terminal.SAN;
									Obj2.objMovimiento.IdComando = 4;//Hardcodeado a la tabla de Comando
									Obj2.objMovimiento.IdUsuario = 0;
									Obj2.objMovimiento.IdTicket = 0;
									Obj2.objMovimiento.OrderId = 0;
									vm.fechaAuxiliar = new Date();
									Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
									Obj2.objMovimiento.Mensaje = hughesData.StandardResponse.Message;
									Obj2.objMovimiento.IdOrigen = 2;//Hardcodeado a la tabla de OrigenMovimiento
									Obj2.objMovimiento.Detalle1 = '';
									Obj2.objMovimiento.Detalle2 = '';
									Obj2.objMovimiento.Exitoso = 0;
									terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {
									});
									ngNotify.set('Error al cancelar la terminal. Consulte el movimiento para más información', 'error');
								}
								else {
									//Guarda el movimiento con OrderId
									var Obj2 = new Object();
									Obj2.objMovimiento = new Object();
									Obj2.objMovimiento.SAN = vm.Terminal.SAN;
									Obj2.objMovimiento.IdComando = 4;//Hardcodeado a la tabla de Comando
									Obj2.objMovimiento.IdUsuario = 0;
									Obj2.objMovimiento.IdTicket = 0;
									Obj2.objMovimiento.OrderId = hughesData.StandardResponse.OrderId;
									vm.fechaAuxiliar = new Date();
									Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
									Obj2.objMovimiento.Mensaje = hughesData.StandardResponse.Message;
									Obj2.objMovimiento.IdOrigen = 2;//Hardcodeado a la tabla de OrigenMovimiento
									Obj2.objMovimiento.Detalle1 = '';
									Obj2.objMovimiento.Detalle2 = '';
									Obj2.objMovimiento.Exitoso = 1;
									terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {
									});
									//Actualiza el estatus en la base en caso de que haya sido exitoso
									var Obj3 = new Object();
									Obj3.objTerminal = new Object();
									Obj3.objTerminal.SAN = vm.Terminal.SAN;
									Obj3.objTerminal.IdSuscriptor = vm.Terminal.IdSuscriptor;
									Obj3.objTerminal.IdServicio = vm.Terminal.IdServicio;
									Obj3.objTerminal.Latitud = vm.Terminal.Latitud;
									Obj3.objTerminal.Longitud = vm.Terminal.Longitud;
									Obj3.objTerminal.Estatus = 'Cancelada';
									Obj3.objTerminal.FechaAlta = vm.Terminal.FechaAlta;
									Obj3.objTerminal.FechaSuspension = vm.Terminal.FechaSuspension;
									Obj3.objTerminal.ESN = vm.Terminal.ESN;
									Obj3.objTerminal.Comentarios = vm.Terminal.Comentarios;
									terminalFactory.updateTerminal(Obj3).then(function (data) {
										ngNotify.set('La terminal se ha cancelado correctamente', 'success');
									});
								}
							});
						});
					}
					else if (vm.Comando.IdComando == 5)//token
					{
						parametros.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
						parametros.cantidad = vm.cantidadToken;
						terminalFactory.hughesToken(parametros).then(function (hughesData) {
							console.log(hughesData);
							//Guarda el movimiento
							var Obj2 = new Object();
							Obj2.objMovimiento = new Object();
							Obj2.objMovimiento.SAN = vm.Terminal.SAN;
							Obj2.objMovimiento.IdComando = 5;//Hardcodeado a la tabla de Comando
							Obj2.objMovimiento.IdUsuario = 0;
							Obj2.objMovimiento.IdTicket = 0;
							Obj2.objMovimiento.OrderId = 0;
							vm.fechaAuxiliar = new Date();
							Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
							Obj2.objMovimiento.Mensaje = hughesData.envEnvelope.envBody.ManageFAPTokenResponseMsg.MessageText;
							Obj2.objMovimiento.IdOrigen = 2;//Hardcodeado a la tabla de OrigenMovimiento
							Obj2.objMovimiento.Detalle1 = vm.cantidadToken;
							Obj2.objMovimiento.Detalle2 = '';
							//Vamos a procesar dependiendo del status obtenido de hughes
							if (hughesData.envEnvelope.envBody.ManageFAPTokenResponseMsg.Status == "FAILED") {
								ngNotify.set('Error al aplicar Token. Consulte el detalle del movimiento para más información', 'error');
								//Ponemos el movimiento como no exitoso
								Obj2.objMovimiento.Exitoso = 0;
							}
							else {
								ngNotify.set('Token aplicado correctamente', 'success');
								//Ponemos el movimiento como  exitoso
								Obj2.objMovimiento.Exitoso = 1;
							}
							terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {
							});
						});
					}
					else if (vm.Comando.IdComando == 6)//Cambiar servicio
					{
						if (vm.Servicio.Nombre.substr(0,3) == vm.Terminal.Servicio.substr(0,3))
						{
							terminalFactory.getSequenceId().then(function (Sequence) {
								parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
								terminalFactory.getSuscriptorById(vm.Terminal.IdSuscriptor).then(function (data) {
									var suscriptor = data.GetSuscriptorResult;
									parametros.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
									//console.log(suscriptor);
									parametros.email = suscriptor.Email;
									parametros.servicio = vm.Servicio.Nombre;
									terminalFactory.hughesCambioServicio(parametros).then(function (hughesData) {
										console.log(hughesData);
										//Vamos a procesar dependiendo del status obtenido de hughes
										if (hughesData.StandardResponse.OrderId == 0) {
											//Guarda el movimiento con OrderId
											var Obj2 = new Object();
											Obj2.objMovimiento = new Object();
											Obj2.objMovimiento.SAN = vm.Terminal.SAN;
											Obj2.objMovimiento.IdComando = 6;//Hardcodeado a la tabla de Comando
											Obj2.objMovimiento.IdUsuario = 0;
											Obj2.objMovimiento.IdTicket = 0;
											Obj2.objMovimiento.OrderId = hughesData.StandardResponse.OrderId;
											vm.fechaAuxiliar = new Date();
											Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
											Obj2.objMovimiento.Mensaje = hughesData.StandardResponse.Message;
											Obj2.objMovimiento.IdOrigen = 2;//Hardcodeado a la tabla de OrigenMovimiento
											Obj2.objMovimiento.Detalle1 = vm.Terminal.Servicio;
											Obj2.objMovimiento.Detalle2 = vm.Servicio.Nombre;
											Obj2.objMovimiento.Exitoso = 0;
											terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {
											});
											ngNotify.set('Error al realizar cambio de servicio. Consulte el detalle del movimiento para más información', 'error');
										}
										else {
											//Guarda el movimiento con OrderId
											var Obj2 = new Object();
											Obj2.objMovimiento = new Object();
											Obj2.objMovimiento.SAN = vm.Terminal.SAN;
											Obj2.objMovimiento.IdComando = 6;//Hardcodeado a la tabla de Comando
											Obj2.objMovimiento.IdUsuario = 0;
											Obj2.objMovimiento.IdTicket = 0;
											Obj2.objMovimiento.OrderId = hughesData.StandardResponse.OrderId;
											vm.fechaAuxiliar = new Date();
											Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
											Obj2.objMovimiento.Mensaje = hughesData.StandardResponse.Message;
											Obj2.objMovimiento.IdOrigen = 2;//Hardcodeado a la tabla de OrigenMovimiento
											Obj2.objMovimiento.Detalle1 = vm.Terminal.Servicio;
											Obj2.objMovimiento.Detalle2 = vm.Servicio.Nombre;
											Obj2.objMovimiento.Exitoso = 0;
											terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {
											});
											//Actualiza el servicio en la base en caso de que haya realizado con exito
											var Obj3 = new Object();
											Obj3.objTerminal = new Object();
											Obj3.objTerminal.SAN = vm.Terminal.SAN;
											Obj3.objTerminal.IdSuscriptor = vm.Terminal.IdSuscriptor;
											Obj3.objTerminal.IdServicio = vm.Servicio.IdServicio;
											Obj3.objTerminal.Latitud = vm.Terminal.Latitud;
											Obj3.objTerminal.Longitud = vm.Terminal.Longitud;
											Obj3.objTerminal.Estatus = 'Activa';
											Obj3.objTerminal.FechaAlta = vm.Terminal.FechaAlta;
											Obj3.objTerminal.FechaSuspension = vm.Terminal.FechaSuspension;
											Obj3.objTerminal.ESN = vm.Terminal.ESN;
											Obj3.objTerminal.Comentarios = vm.Terminal.Comentarios;
											terminalFactory.updateTerminal(Obj3).then(function (data) {
												ngNotify.set('Cambio de servicio realizado correctamente', 'success');
											});

										}
									});
								});
							});
						}
						else{
							ngNotify.set('No es posible hacer el cambio a un servicio de otro satélite', 'warn');
						}
					}
					else if (vm.Comando.IdComando == 9)//Activar
					{
						terminalFactory.getSuscriptorById(vm.Terminal.IdSuscriptor).then(function (data) {
							var suscriptor = data.GetSuscriptorResult;
							parametros.telefono = suscriptor.Telefono.substring(6, 4);
							parametros.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
							parametros.ESN = vm.Terminal.ESN;
							terminalFactory.hughesActivarTerminal(parametros).then(function (hughesData) {
								console.log(hughesData);
								//Guarda el movimiento
								var Obj2 = new Object();
								Obj2.objMovimiento = new Object();
								Obj2.objMovimiento.SAN = vm.Terminal.SAN;
								Obj2.objMovimiento.IdComando = 9;//Hardcodeado a la tabla de Comando
								Obj2.objMovimiento.IdUsuario = 0;
								Obj2.objMovimiento.IdTicket = 0;
								Obj2.objMovimiento.OrderId = 0;
								vm.fechaAuxiliar = new Date();
								Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
								Obj2.objMovimiento.Mensaje = hughesData.envEnvelope.envBody.cmcActivationResponseMsg.MessageText;
								Obj2.objMovimiento.IdOrigen = 2;//Hardcodeado a la tabla de OrigenMovimiento
								Obj2.objMovimiento.Detalle1 = '';
								Obj2.objMovimiento.Detalle2 = '';
								terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {
								});
								//Vamos a procesar dependiendo del status obtenido de hughes
								if (hughesData.envEnvelope.envBody.cmcActivationResponseMsg.Status == "FAILED") {
									ngNotify.set('Error al activar la terminal. Consulte el detalle del movimiento para más información', 'error');
								}
								else {
									//Actualiza el estatus en la base en caso de que haya activado en Hughes
									var Obj3 = new Object();
									Obj3.objTerminal = new Object();
									Obj3.objTerminal.SAN = vm.Terminal.SAN;
									Obj3.objTerminal.IdSuscriptor = vm.Terminal.IdSuscriptor;
									Obj3.objTerminal.IdServicio = vm.Terminal.IdServicio;
									Obj3.objTerminal.Latitud = vm.Terminal.Latitud;
									Obj3.objTerminal.Longitud = vm.Terminal.Longitud;
									Obj3.objTerminal.Estatus = 'Activa';
									Obj3.objTerminal.FechaAlta = vm.Terminal.FechaAlta;
									Obj3.objTerminal.FechaSuspension = vm.Terminal.FechaSuspension;
									Obj3.objTerminal.ESN = vm.Terminal.ESN;
									Obj3.objTerminal.Comentarios = vm.Terminal.Comentarios;
									terminalFactory.updateTerminal(Obj3).then(function (data) {
										ngNotify.set('La terminal se ha activado correctamente', 'success');
									});


                }
              });
            });
          } else if (vm.Comando.IdComando == 10) //Swap
          {
            parametros.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
            terminalFactory.hughesSwap(parametros).then(function (hughesData) {
              console.log(hughesData);
              //Guarda el movimiento
              var Obj2 = new Object();
              Obj2.objMovimiento = new Object();
              Obj2.objMovimiento.SAN = vm.Terminal.SAN;
              Obj2.objMovimiento.IdComando = 10; //Hardcodeado a la tabla de Comando
              Obj2.objMovimiento.IdUsuario = 0;
              Obj2.objMovimiento.IdTicket = 0;
              Obj2.objMovimiento.OrderId = 0;
              vm.fechaAuxiliar = new Date();
              Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
              Obj2.objMovimiento.Mensaje = hughesData.responseMsg;
              Obj2.objMovimiento.IdOrigen = 2; //Hardcodeado a la tabla de OrigenMovimiento
              Obj2.objMovimiento.Detalle1 = "";
              Obj2.objMovimiento.Detalle2 = '';
              //Vamos a procesar dependiendo del status obtenido de hughes
              if (hughesData.status == "false") {
                ngNotify.set('Error al aplicar comando Swap. Consulte el detalle del movimiento para más información', 'error');
                //Ponemos el movimiento como no exitoso
                Obj2.objMovimiento.Exitoso = 0;
              } else {
                ngNotify.set('Swap aplicado correctamente', 'success');
                //Ponemos el movimiento como  exitoso
                Obj2.objMovimiento.Exitoso = 1;
              }
              terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {});
            });
          }
        }
      });
    }

    function ok() {

    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function hughesGetSanCompuesto(obj) {
      var a = obj.toString();
      var i;
      for (i = a.length; i < 9; i++) {
        a = '0' + a;
      }
      console.log(globalService.getType())
      return globalService.getType() + a;
    };

    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    initialData();
    vm.aplicaComando = aplicaComando;


  });
