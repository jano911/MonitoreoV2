angular.module('softvFrostApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/Administracion/CMTS.html',
    "<div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">CMTS</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Administración</a></small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" permission permission-only=\"'rolesAdd'\" ui-sref=\"home.administracion.cmtsnuevo\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> </div> </div> </div> <div class=\"card-body\"> <div class=\"panel form-element-padding\"> <table class=\"table\"> <thead> <tr> <th>Nombre</th> <th>IP</th> <th>Opciones</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.cmtses|itemsPerPage:5\"> <td>{{ x.Nombre }}</td> <td>{{ x.IP }}</td> <td> <a ui-sref=\"home.administracion.cmtsedita({id:x.IdCMTS})\" permission class=\"btn btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar CMTS\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a> <a ng-click=\"$ctrl.CMTSElimina(x.IdCMTS)\" permission class=\"btn btn-xs btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar CMTS\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <div style=\"padding-left: 20px\" ng-show=\"true\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div>"
  );


  $templateCache.put('views/Administracion/CMTSEdita.html',
    "<form angular-validator-submit=\"$ctrl.CMTSEdita();\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Edita CMTS</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Administración</a></small> </header> <div class=\"tools\"> <!-- <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" ng-click=\"$ctrl.Guardar()\" permission permission-only=\"'permisosAdd'\">Guardar</button> --> <button class=\"btn btn-success btn-sm\" type=\"submit\">Guardar</button> <button type=\"button\" class=\"btn btn-raised btn-default btn-sm\" ui-sref=\"home.administracion.cmts\"> Cancelar</button> </div> </div> <div class=\"card-body\"> <div class=\"row\"> <div class=\"col-md-5\"> <div class=\"col-md-12\"> <b>Nombre CMTS</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Nombre\" name=\"Nombre\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>IP</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.IP\" name=\"IP\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Comunidad</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Comunidad\" name=\"Comunidad\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Comunidad Cablemodems</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.ComunidadCablemodem\" name=\"ComunidadCablemodems\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Tipo</b> <select class=\"form-control\" ng-options=\"item as item.Nombre for item in $ctrl.Tipos track by item.IdTipo\" ng-model=\"$ctrl.Tipo\" name=\"rol\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">Selecciona</option> </select> </div> <div class=\"col-md-12\"> <b>Interface</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Interface\" name=\"Interface\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Usuario</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Usuario\" name=\"Usuario\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Password</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Password\" name=\"Password\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Enable</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Enable\" name=\"Enable\"> </div> </div> </div> </div> </div> </form>"
  );


  $templateCache.put('views/Administracion/CMTSNuevo.html',
    "<form angular-validator-submit=\"$ctrl.CMTSNuevo();\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Nuevo CMTS</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Administración</a></small> </header> <div class=\"tools\"> <!-- <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" ng-click=\"$ctrl.Guardar()\" permission permission-only=\"'permisosAdd'\">Guardar</button> --> <button class=\"btn btn-success btn-sm\" type=\"submit\">Guardar</button> <button type=\"button\" class=\"btn btn-raised btn-default btn-sm\" ui-sref=\"home.administracion.cmts\"> Cancelar</button> </div> </div> <div class=\"card-body\"> <div class=\"row\"> <div class=\"col-md-5\"> <div class=\"col-md-12\"> <b>Nombre CMTS</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Nombre\" name=\"Nombre\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>IP</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.IP\" name=\"IP\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Comunidad</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Comunidad\" name=\"Comunidad\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Comunidad Cablemodems</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.ComunidadCablemodems\" name=\"ComunidadCablemodems\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Tipo</b> <select class=\"form-control\" ng-options=\"item as item.Nombre for item in $ctrl.Tipos track by item.IdTipo\" ng-model=\"$ctrl.TipoCMTS\" name=\"rol\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">Selecciona</option> </select> </div> <div class=\"col-md-12\"> <b>Interface</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Interface\" name=\"Interface\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Usuario</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Usuario\" name=\"Usuario\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Password</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.PasswordS\" name=\"Password\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Enable</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Enable\" name=\"Enable\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> </div> </div> </div> </div> </form>"
  );


  $templateCache.put('views/CMTS/CMTSConsumoHistorial.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Historial de Consumo</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row\"> <div class=\"col-md-5\"> <div class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Inicio: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"ctrl.fechaInicio\" type=\"date\"> </div> </div> <div class=\"col-md-5\"> <div class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Fin: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"ctrl.fechaFin\" type=\"date\"> </div> </div> <div class=\"col-md-2\"> <div class=\"input-group\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"ctrl.FiltraResultados()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Filtrar Resultados\" data-original-title=\"Filtrar Resultados\"> <i class=\"fa fa-search\"></i> Buscar</a> </div> </div> </div> <div class=\"row\"> <!--<chart-canvas mac=\"{{ctrl.Cablemodem.MAC}}\" style=\"margin-left:15px;\"></chart-canvas>--> <div id=\"container2\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/CMTS/CMTSData.html',
    "<!--<div class=\"card\" style=\"margin-top:10px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px;\">\r" +
    "\n" +
    "    <header>\r" +
    "\n" +
    "      <strong style=\"font-weight:bold; border:none; margin-left:10px;\">Estadísticas Mikrotik</strong>\r" +
    "\n" +
    "    </header>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"card-body\">\r" +
    "\n" +
    "    <div class=\"panel\">\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-4 text-center\">\r" +
    "\n" +
    "          <ui-knob value=\"$ctrl.valueCargaCPU\" options=\"$ctrl.optionsCargaCPU\"></ui-knob>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 text-center\">\r" +
    "\n" +
    "          <ui-knob value=\"$ctrl.valueMemoria\" options=\"$ctrl.optionsMemoria\"></ui-knob>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 text-center\">\r" +
    "\n" +
    "          <ui-knob value=\"$ctrl.valueHDD\" options=\"$ctrl.optionsHDD\"></ui-knob>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "          <div id=\"container\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>--> <section style=\"margin-top:10px\"> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-sm style-info\"> <header>Consumo en Tiempo Real</header> <div class=\"tools\"> <button style=\"margin-top:7px\" class=\"btn-sm btn-block ink-reaction btn-default-dark\" ng-click=\"$ctrl.HistorialConsumo()\"><i class=\"fa fa-area-chart\"></i> Historial</button> </div> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <div id=\"container\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-lg-4\"> <div class=\"card card-outlined style-warning\"> <div class=\"card-head card-head-xs style-warning\"> <header>Carga de CPU</header> </div> <div class=\"card-body style-default-bright text-center\"> <ui-knob value=\"$ctrl.valueCargaCPU\" options=\"$ctrl.optionsCargaCPU\"></ui-knob> </div> </div> </div> <div class=\"col-lg-4\"> <div class=\"card card-outlined style-danger\"> <div class=\"card-head card-head-xs style-danger\"> <header>Memoria Disponible</header> </div> <div class=\"card-body style-default-bright text-center\"> <ui-knob value=\"$ctrl.valueMemoria\" options=\"$ctrl.optionsMemoria\"></ui-knob> </div> </div> </div> <div class=\"col-lg-4\"> <div class=\"card card-outlined style-success\"> <div class=\"card-head card-head-xs style-success\"> <header>HDD Disponible</header> </div> <div class=\"card-body style-default-bright text-center\"> <ui-knob value=\"$ctrl.valueHDD\" options=\"$ctrl.optionsHDD\"></ui-knob> </div> </div> </div> </div> </section>"
  );


  $templateCache.put('views/Cablemodems/DetalleCablemodem.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Detalle de Aparato: {{ctrl.Cablemodem.MAC}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row text-center\"> <h4 class=\"text-info\">Datos SOFTV</h4> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b>Contrato:</b><br> {{ctrl.Cliente.Contrato}} </div> <div class=\"col-md-3\"> <b>Status:</b><br> {{ctrl.Cliente.Status}} </div> <div class=\"col-md-3\"> <b>Mes Pagado:</b><br> {{ctrl.Cliente.ultimo_mes }} {{ctrl.Cliente.ultimo_anio}} </div> <div class=\"col-md-3\"> <b>Nombre:</b><br> {{ctrl.Cliente.Nombre}} </div> </div> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b>Servicio:</b><br> {{ctrl.Cliente.Servicio}} </div> <div class=\"col-md-3\"> <b>Límite Subida:</b><br> {{ctrl.Cliente.LimiteSubida}} </div> <div class=\"col-md-3\"> <b>Límite Bajada:</b><br> {{ctrl.Cliente.LimiteBajada}} </div> </div> </div> <!--<div class=\"row text-center\">\r" +
    "\n" +
    "    <h4 class=\"text-info\">Datos Técnicos</h4>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"row text-center\">\r" +
    "\n" +
    "    <div class=\"col-md-4\">\r" +
    "\n" +
    "      <ui-knob value=\"ctrl.valueSNR\" options=\"ctrl.optionsSNR\"></ui-knob>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"col-md-4\">\r" +
    "\n" +
    "      <ui-knob value=\"ctrl.valueUST\" options=\"ctrl.optionsUST\"></ui-knob>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"col-md-4\">\r" +
    "\n" +
    "      <ui-knob value=\"ctrl.valueDST\" options=\"ctrl.optionsDST\"></ui-knob>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>--> <div class=\"row text-center\"> <h4 class=\"text-info\">Historial de Consumo</h4> </div> <div class=\"row\"> <div class=\"col-md-5\"> <div class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Inicio: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"ctrl.fechaInicio\" type=\"date\"> </div> </div> <div class=\"col-md-5\"> <div class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Fin: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"ctrl.fechaFin\" type=\"date\"> </div> </div> <div class=\"col-md-2\"> <div class=\"input-group\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"ctrl.FiltraResultados()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Filtrar Resultados\" data-original-title=\"Filtrar Resultados\"> <i class=\"fa fa-search\"></i> Buscar</a> </div> </div> </div> <div class=\"row\"> <!--<chart-canvas mac=\"{{ctrl.Cablemodem.MAC}}\" style=\"margin-left:15px;\"></chart-canvas>--> <div id=\"container\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/Cablemodems/ListadoCablemodems.html',
    "<div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Listado de Aparatos</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Aparatos</a></small> </header> </div> <div class=\"card-body\"> <div class=\"panel form-element-padding\"> <!--<div class=\"row\">--> <!--<div class=\"col-md-4\">\r" +
    "\n" +
    "          <b>CMTS</b>\r" +
    "\n" +
    "          <select class=\"form-control\" ng-options=\"item as item.Nombre for item in $ctrl.CMTSs track by item.IdCMTS\" ng-model=\"$ctrl.CMTS\" name=\"rol\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required ng-change=\"$ctrl.CambiaCMTS()\">\r" +
    "\n" +
    "            <option value=\"\">Selecciona</option>\r" +
    "\n" +
    "          </select>\r" +
    "\n" +
    "        </div>--> <!--</div>--> <br> <table class=\"table\" st-table=\"$ctrl.Cablemodems\" st-safe-src=\"$ctrl.rowCablemodems\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCablemodems\"> <thead> <tr> <th st-sort=\"MAC\">MAC</th> <th st-sort=\"Contrato\">Contrato</th> <th st-sort=\"Cliente\">Cliente</th> <th st-sort=\"Servicio\">Servicio</th> <th st-sort=\"Opciones\">Opciones</th> </tr> <tr> <th> <input st-search=\"MAC\" placeholder=\"MAC\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Contrato\" placeholder=\"Contrato\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Cliente\" placeholder=\"Cliente\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Servicio\" placeholder=\"Servicio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Fap\" placeholder=\"\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.Cablemodems|itemsPerPage:15\"> <td>{{ x.MAC }}</td> <td>{{ x.Contrato }}</td> <td>{{ x.Nombre }}</td> <td>{{ x.Servicio }}</td> <td> <a ng-click=\"$ctrl.DetalleCablemodem(x)\" class=\"btn btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Detalle Cablemodem\"><i class=\"fa fa-bars\" aria-hidden=\"true\"></i></a> <a ng-click=\"$ctrl.ConsumoTiempoReal(x)\" class=\"btn btn-xs btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Consumo Tiempo Real\"><i class=\"fa fa-area-chart\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <div style=\"padding-left: 20px\" ng-show=\"true\"> <dir-pagination-controls max-size=\"15\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div>"
  );


  $templateCache.put('views/Cablemodems/TiempoRealCablemodem.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Consumo Tiempo Real: {{ctrl.Cablemodem.MAC}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row text-center\"> <h4 class=\"text-info\">Datos SOFTV</h4> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b>Contrato:</b><br> {{ctrl.Cliente.Contrato}} </div> <div class=\"col-md-3\"> <b>Status:</b><br> {{ctrl.Cliente.Status}} </div> <div class=\"col-md-3\"> <b>Mes Pagado:</b><br> {{ctrl.Cliente.ultimo_mes }} {{ctrl.Cliente.ultimo_anio}} </div> <div class=\"col-md-3\"> <b>Nombre:</b><br> {{ctrl.Cliente.Nombre}} </div> </div> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b>Servicio:</b><br> {{ctrl.Cliente.Servicio}} </div> <div class=\"col-md-3\"> <b>Límite Subida:</b><br> {{ctrl.Cliente.LimiteSubida}} </div> <div class=\"col-md-3\"> <b>Límite Bajada:</b><br> {{ctrl.Cliente.LimiteBajada}} </div> </div> </div> <!--\r" +
    "\n" +
    "    <div class=\"row text-center\">\r" +
    "\n" +
    "      <h4 class=\"text-info\">Datos Técnicos</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row text-center\">\r" +
    "\n" +
    "      <div class=\"col-md-4\">\r" +
    "\n" +
    "        <ui-knob value=\"ctrl.valueSNR\" options=\"ctrl.optionsSNR\"></ui-knob>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-md-4\">\r" +
    "\n" +
    "        <ui-knob value=\"ctrl.valueUST\" options=\"ctrl.optionsUST\"></ui-knob>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-md-4\">\r" +
    "\n" +
    "        <ui-knob value=\"ctrl.valueDST\" options=\"ctrl.optionsDST\"></ui-knob>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>--> <div class=\"row text-center\"> <h4 class=\"text-info\">Consumo Actual</h4> </div> <div class=\"row\"> <!--<chart-realtime mac=\"{{ctrl.Cablemodem.MAC}}\" ip=\"{{ctrl.IP}}\" style=\"margin-left:15px;\"></chart-canvas>--> <div id=\"container\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div> <!--<div id=\"chart_container\">\r" +
    "\n" +
    "        <div id=\"chart\" class=\"rickshaw_graph\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div id=\"legend_container\">\r" +
    "\n" +
    "          <div id=\"smoother\" title=\"Smoothing\"></div>\r" +
    "\n" +
    "          <div id=\"legend\" class=\"rickshaw_legend\"></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div id=\"slider\"></div>\r" +
    "\n" +
    "      </div>--> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/configuracion/NuevoRol.html',
    "<form angular-validator-submit=\"$ctrl.GuardarRol();\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">{{$ctrl.titulo}}</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Configuración</a></small> </header> <div class=\"tools\"> <!-- <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" ng-click=\"$ctrl.Guardar()\" permission permission-only=\"'permisosAdd'\">Guardar</button> --> <button class=\"btn btn-success btn-sm\" type=\"submit\" permission permission-only=\"'rolesAdd'\">Guardar</button> <button type=\"button\" class=\"btn btn-raised btn-default btn-sm\" ui-sref=\"home.provision.roles\"> Cancelar</button> </div> </div> <div class=\"card-body\"> <div class=\"row\"> <div class=\"col-md-5\"> <div class=\"col-md-12\"> <b>Nombre de rol</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Nombre\" name=\"Nombre\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <br> <b>Descripción de rol</b> <textarea class=\"form-control col-md-4\" ng-model=\"$ctrl.Descripcion\" name=\"Descripcion\" required-message=\"'Este campo es obligatorio.'\" placeholder=\"Describe brevemente las funciones de este rol en el sistema\" validate-on=\"dirty\" required validate-on=\"dirty\"></textarea> </div> <div class=\"col-md-12\"> <br> <b>Status</b> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" ng-model=\"$ctrl.Estatus\"><span> Activo</span></label></div> </div> </div> <div class=\"col-md-4 text-center\"> <table class=\"table\" style=\"font-size:12px\"> <thead> <th>Comando</th> <th>Selecciona</th> </thead> <tbody> <tr ng-repeat=\"x in $ctrl.comandos\"> <td>{{x.Nombre}}</td> <td> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" ng-model=\"x.selected\"><span> </span></label></div> </td> </tr> </tbody> </table> </div> </div> </div> </div>  </form>"
  );


  $templateCache.put('views/configuracion/NuevoUsuario.html',
    "<form angular-validator-submit=\"$ctrl.GuardarUsuario()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">{{$ctrl.titulo}}</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Configuración>{{$ctrl.titulo}}</small> </header> <div class=\"tools\"> <button class=\"btn btn-default btn-sm\" ui-sref=\"home.provision.usuarios\">Cancelar</button> <button class=\"btn btn-success btn-sm\" type=\"submit\">Guardar</button> </div> </div> <div class=\"card-body\" style=\"margin-bottom:100px\"> <div class=\"row\"> <div class=\"col-md-2\"> </div> <div class=\"col-md-4\"> <div class=\"col-md-12\"> <b>Nombre</b> <input type=\"text\" name=\"nombre\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.Nombre\" required-message=\"'Este campo es obligatorio.'\" required> </div> <div class=\"col-md-12\"> <b>Usuario</b> <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.existe()\" ng-model=\"$ctrl.Descripcion\" name=\"descripcion\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required ng-disabled=\"$ctrl.userText\"> <small style=\"color:red\" ng-show=\"$ctrl.isDuplicate\">El nombre de usuario ya esta registrado, por favor introduce uno diferente.</small> </div> <div class=\"col-md-12\"> <b>Correo</b> <input type=\"email\" class=\"form-control\" ng-model=\"$ctrl.Correo\" placeholder=\"correo@mail.com\" name=\"correo\" validate-on=\"dirty\" invalid-message=\"'Formato de correo inválido.'\" required-message=\"'Este campo es obligatorio.'\" required> </div> <div class=\"col-md-12\"> <br> <b>Selecciona Rol</b> <select class=\"form-control\" ng-options=\"item as item.Nombre for item in $ctrl.Roles track by item.IdRol\" ng-model=\"$ctrl.Rol\" name=\"rol\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">selecciona</option> </select> </div> </div> <div class=\"col-md-4\"> <div class=\"row text-center\"> <p class=\"text-danger\"><b><i class=\"fa fa-key\"></i> Ingresa una contraseña segura para la cuenta</b></p> </div> <div class=\"row\" ng-show=\"$ctrl.ValidatePanel\"> <div class=\"col-md-8\"> <b><i class=\"fa fa-key\"></i> ¿Necesitas modificar la contraseña?</b> <input type=\"password\" class=\"form-control\" ng-model=\"$ctrl.PassValidate\" placeholder=\"contraseña anterior\"> </div> <div class=\"col-md-4\"> <br> <a class=\"btn btn-warning btn-sm\" ng-click=\"$ctrl.ValidaPass()\">Validar</a> </div> </div> <div class=\"row\" ng-show=\"$ctrl.passwordPanel\"> <div class=\"col-md-12\"> <b>Contraseña</b> <input ng-if=\"$ctrl.editar == true\" type=\"Password\" class=\"form-control\" ng-model=\"$ctrl.Contrasena\" name=\"contra\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> </div> <div class=\"col-md-12\"> <b>Repite la contraseña</b> <input ng-if=\"$ctrl.editar == true\" type=\"Password\" class=\"form-control\" ng-model=\"$ctrl.Contrasena2\" name=\"contra\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> </div> <div class=\"col-md-2\"> </div> </div> </div> </div></form>"
  );


  $templateCache.put('views/configuracion/permisos.html',
    "<style>td {\r" +
    "\n" +
    "    padding: 2px !important;\r" +
    "\n" +
    "    padding-left: 15px !important;\r" +
    "\n" +
    "  }</style> <div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Permisos</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Configuración</a></small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" ng-click=\"$ctrl.Guardar()\" permission permission-only=\"'permisosAdd'\">Guardar</button> </div> </div> </div> <div class=\"card-body\"> <div class=\"row\"> <div class=\"col-md-4\"></div> <div class=\"col-md-4\"></div> <div class=\"col-md-4\"> <b>Selecciona un Rol</b> <select ng-model=\"$ctrl.Rol\" class=\"form-control input-sm\" ng-change=\"$ctrl.ObtenPermisos();\" ng-options=\"item as item.Nombre for item in $ctrl.Roles track by item.IdRol\"> <option value=\"\">Selecciona</option> </select> </div> </div> <table class=\"table\"> <thead> <tr> <th>Módulo</th> <th>Consultar</th> <th>Agregar</th> <th>Editar</th> <th>Eliminar</th> </tr> </thead> <tbody> <tr ng-repeat=\"x in $ctrl.Modules\"> <td ng-if=\"x.tipo == 1\"><b>{{x.DisplayName}}</b></td> <td ng-if=\"x.tipo != 1\">{{x.DisplayName}}</td> <td> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" class=\"input-sm\" ng-model=\"x.OptSelect\"><span></span></label></div> </td> <td ng-if=\"x.tipo != 1\"> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" ng-model=\"x.OptAdd\"><span></span></label></div> <!-- <div class=\"checkbox-inline checkbox-styled checkbox-info\">\r" +
    "\n" +
    "              <input type=\"checkbox\" class=\"checkbox\" name=\"{{x.IdModule}}Add{{x.IdModule}}\" id=\"{{x.IdModule}}Add{{x.IdModule}}\" ng-model=\"x.OptAdd\">\r" +
    "\n" +
    "              <span for=\"{{x.IdModule}}Add\"></span>\r" +
    "\n" +
    "            </div> --> </td> <td ng-if=\"x.tipo != 1\"> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" ng-model=\"x.OptUpdate\"><span></span></label></div> <!-- <div class=\"checkbox-inline checkbox-styled checkbox-info\">\r" +
    "\n" +
    "              <input type=\"checkbox\" class=\"checkbox\" name=\"{{x.IdModule}}Update{{x.IdModule}}\" id=\"{{x.IdModule}}Update{{x.IdModule}}\" ng-model=\"x.OptUpdate\">\r" +
    "\n" +
    "              <span for=\"{{x.IdModule}}Update\"></span>\r" +
    "\n" +
    "            </div> --> </td> <td ng-if=\"x.tipo != 1\"> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" ng-model=\"x.OptDelete\"><span></span></label></div> <!-- <div class=\"checkbox-inline checkbox-styled checkbox-info\">\r" +
    "\n" +
    "              <input type=\"checkbox\" class=\"checkbox\" ng-model=\"x.OptDelete\" name=\"{{x.IdModule}}Delete{{x.IdModule}}\" id=\"{{x.IdModule}}Delete{{x.IdModule}}\">\r" +
    "\n" +
    "              <span for=\"{{x.IdModule}}Delete\"></span>\r" +
    "\n" +
    "            </div> --> </td> </tr> </tbody> </table> </div> </div>"
  );


  $templateCache.put('views/configuracion/roles.html',
    "<div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Roles</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Configuración</a></small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" permission permission-only=\"'rolesAdd'\" ui-sref=\"home.provision.nuevorol\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> </div> </div> </div> <div class=\"card-body\"> <div class=\"panel form-element-padding\"> <table class=\"table\"> <thead> <tr> <th>ID</th> <th>Nombre</th> <th>Descripcion</th> <th>Estatus</th> <th>Opciones</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.Roles|itemsPerPage:5\"> <td>{{ x.IdRol }}</td> <td>{{ x.Nombre }}</td> <td>{{ x.Descripcion }}</td> <td ng-if=\"x.Estado==true\"> <span class=\"label label-outline label-success\">Activo</span> </td> <td ng-if=\"x.Estado==false\"> <span class=\"label label-outline label-danger\">Desactivado</span> </td> <td> <a ui-sref=\"home.provision.editarol({id:x.IdRol })\" permission permission-only=\"'rolesUpdate'\" class=\"btn btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar Rol\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <div style=\"padding-left: 20px\" ng-show=\"true\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div>"
  );


  $templateCache.put('views/configuracion/usuarios.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Usuarios</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Configuración>Usuarios</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button ui-sref=\"home.provision.nuevousuario\" type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" permission permission-only=\"'terminalesAdd'\" ui-sref=\"home.provision.terminalesNueva\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> </div> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"row\"> <div class=\"col-md-2\"> <br> <input type=\"text\" class=\"form-control input-sm\" ng-model=\"$ctrl.Busuario\" placeholder=\"NOMBRE DE USUARIO\"> </div> <div class=\"col-md-1\"> <br> <button type=\"button\" class=\"btn btn-info btn-xs\" ng-click=\"$ctrl.Busca(1);\"><i class=\"fa fa-search\"></i> Buscar</button> </div> <div class=\"col-md-2\"> <br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"CORREO DE USUARIO\" ng-model=\"$ctrl.Bcorreo\"> </div> <div class=\"col-md-1\"> <br> <button type=\"button\" class=\"btn btn-info btn-xs\" ng-click=\"$ctrl.Busca(2);\"><i class=\"fa fa-search\"></i> Buscar</button> </div> <div class=\"col-md-3\" style=\"margin-top:20px\"> <select class=\"form-control input-sm\" ng-options=\"item as item.Nombre for item in $ctrl.Roles track by item.IdRol\" ng-change=\"$ctrl.Busca(3);\" ng-model=\"$ctrl.Rol\" name=\"rol\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">SELECCIONA ROL</option> </select> </div> </div> <hr> <div class=\"row\"> <div class=\"col-md-12\"> <table class=\"table\"> <thead> <tr> <th>ID</th> <th>Rol</th> <th>Usuario</th> <th>Nombre</th> <th>Correo</th> <th>Status</th> <th>Opciones</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.Usuarios|itemsPerPage:5\"> <td>{{ x.IdUsuario }}</td> <td>{{ x.NombreRol }}</td> <td>{{ x.Usuario }}</td> <td>{{ x.Nombre }}</td> <td>{{ x.Email }}</td> <td ng-if=\"x.Estado==true\"> <span class=\"label label-outline label-success\">Activo</span> </td> <td ng-if=\"x.Estado==false\"> <span class=\"label label-outline label-danger\">Desactivado</span> </td> <td> <a ui-sref=\"home.provision.editausuario({id:x.IdUsuario })\" permission permission-only=\"'usuariosUpdate'\" class=\"btn btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar usuario\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <div style=\"padding-left: 20px\" ng-show=\"true\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('views/dashboard.html',
    "<section style=\"margin-top:10px\"> <div class=\"row\"> <div class=\"col-lg-5\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head style-primary-dark\"> <header>CMTS Registrados en el sistema</header> </div> <div class=\"card-body style-default-bright\"> <div ng-repeat=\"x in $ctrl.CMTSs\"> <div class=\"col-md-3\"> <button class=\"btn btn-block ink-reaction\" ng-class=\"x.Activo ? 'btn-success' : 'btn-default-bright'\" type=\"button\" ng-click=\"$ctrl.CambiaCMTS(x)\">{{x.Nombre}}</button> </div> </div> </div> </div> </div> <div class=\"col-lg-5\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Descripción</header> </div> <div class=\"card-body style-default-bright\"> asdasdasdasda </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <div class=\"card\"> <div class=\"card-body no-padding\"> <div class=\"alert alert-callout alert-danger no-margin\"> <strong class=\"text-lg\">13 dias 15 horas</strong><br> <span class=\"opacity-50\">Tiempo de Actividad</span> <div class=\"stick-bottom-left-right\"> <div class=\"progress progress-hairline no-margin\"> <div class=\"progress-bar progress-bar-danger\" style=\"width:43%\"> </div> </div> </div> </div> </div> </div> </div> <div class=\"col-md-4\"> <div class=\"card\"> <div class=\"card-body no-padding\"> <div class=\"alert alert-callout alert-danger no-margin\"> <strong class=\"text-lg\">Bajada 15 / Subida 15</strong><br> <span class=\"opacity-50\">Consumo de Datos</span> <div class=\"stick-bottom-left-right\"> <div class=\"progress progress-hairline no-margin\"> <div class=\"progress-bar progress-bar-danger\" style=\"width:43%\"> </div> </div> </div> </div> </div> </div> </div> <div class=\"col-md-4\"> <div class=\"card\"> <div class=\"card-body no-padding\"> <div class=\"alert alert-callout alert-danger no-margin\"> <strong class=\"text-lg\">4%</strong><br> <span class=\"opacity-50\">Carga de CPU Promedio</span> <div class=\"stick-bottom-left-right\"> <div class=\"progress progress-hairline no-margin\"> <div class=\"progress-bar progress-bar-danger\" style=\"width:43%\"> </div> </div> </div> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-6\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Módems en el Sistema</header> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <div class=\"col-md-8\"> <div id=\"morris-donut-graph\"> </div> </div> <div class=\"col-md-4\"> <div style=\"margin-top:15px\" class=\"alert alert-callout alert-danger\"> <strong class=\"text-md\">En línea: 12</strong><br> <strong class=\"text-md\">Apagados: 30</strong><br> <strong class=\"text-md\">Suspendidos: 20</strong><br> <strong class=\"text-md\">En proceso: 5</strong><br> </div> </div> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Historial</header> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <div id=\"chart_container\"> <div id=\"chart\" class=\"rickshaw_graph\"> </div> <div id=\"legend_container\"> <div id=\"smoother\" title=\"Smoothing\"></div> <div id=\"legend\" class=\"rickshaw_legend\"></div> </div> <div id=\"slider\"></div> </div> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Historial</header> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <angular-chart options=\"$ctrl.options\" instance=\"$ctrl.instance\"></angular-chart> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Historial</header> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <div id=\"container\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Historial</header> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <div id=\"morris-line-graph\"> </div> </div> </div> </div> </div> </div> </section> <!--<section class=\"section-account\">\r" +
    "\n" +
    "\t<div class=\"card contain-xs style-transparent\">\r" +
    "\n" +
    "\t\t<div class=\"card-body\">\r" +
    "\n" +
    "\t\t\t<div class=\"row\">\r" +
    "\n" +
    "\t\t\t\t<div class=\"col-md-12 text-center\">\r" +
    "\n" +
    "\t\t\t\t\t<img src=\"images/StarGo.jpg\" width=\"350\">\r" +
    "\n" +
    "                    <hr>\r" +
    "\n" +
    "\t\t\t\t\t<h2 class=\"text-light\">¡BIENVENIDO!</h2>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</section>-->"
  );


  $templateCache.put('views/incidencias/bandeja.html',
    "<div class=\"panel\" style=\"height:100px\"> <div class=\"panel-body\" style=\"margin-top:-20px\"> <div class=\"col-md-6 col-sm-12\"> <h4 style=\"margin-top: 20px\" class=\"animated fadeInLeft\">Bandeja de Tickets</h4> <p class=\"animated fadeInDown\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Incidencias>Bandeja Tickets</p> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <diav class=\"panel form-element-padding\"> <form angular-validator-submit=\"submitMyForm()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"panel-heading\"> <div class=\"tools\"> <h4 class=\"text-muted\">Bandeja</h4> <p class=\"text-right\"> <a class=\"btn btn-raised btn-primary btn-sm\" type=\"button\" ui-sref=\"home.incidencias.registro\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a> <button class=\"btn btn-raised btn-primary btn-sm\" type=\"submit\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></button> </p> </div> </div> <div class=\"panel-body\" style=\"padding-bottom:30px\"> <div class=\"col-md-12 table-responsive\"> <table class=\"table table-striped table-hover table-condensed\"> <thead class=\"text-center\"> <tr> <th>N De Ticket</th> <th>Prioridad</th> <th>Estado</th> <th>SAN</th> <th>Descripción</th> <th>Usuario Asignado</th> <th>Fecha Registro</th> <th>Último Usuario</th> <th>Última Actualización</th> <th>Fecha Vencimiento</th> </tr> </thead> <tbody> <!-- dir-paginate=\"x in $ctrl.ticketsSucuarsales|itemsPerPage:8\" --> <tr dir-paginate=\"x in $ctrl.tickets | itemsPerPage:5\"> <td> <a href=\"\" ng-click=\"$ctrl.verDetalle(x.IdTicket)\">{{x.IdTicket}}</a> </td> <td>{{x.Prioridad}}</td> <td>{{x.Estado}}</td> <td>{{x.SAN}}</td> <td>{{x.Descripcion}}</td> <td>{{x.Usuario}}</td> <td>{{x.Fecha}}</td> <td>{{}}</td> <td>{{}}</td> <td>{{x.FechaCierre}}</td> </tr> </tbody> </table> <div style=\"padding-left: 20px\"> <dir-pagination-controls max-size=\"8\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </form> </diav></div> </div> "
  );


  $templateCache.put('views/incidencias/modalDetalleTicket.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"$ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Ticket{{}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row form-group\"> <div class=\"col-md-12\"> <div class=\"tabbable\"> <!-- Only required for left/right tabs --> <ul class=\"nav nav-tabs\"> <li class=\"active\"><a href=\"\" data-target=\"#tab1\" data-toggle=\"tab\">Ver Ticket</a></li> <li><a href=\"\" data-target=\"#tab2\" data-toggle=\"tab\">Avances</a></li> <li><a href=\"\" data-target=\"#tab3\" data-toggle=\"tab\">Cerrar Ticket</a></li> </ul> <div class=\"tab-content\"> <div class=\"tab-pane active\" id=\"tab1\"> <div class=\"tab-pane active\" id=\"ver\"> <div class=\"row\" style=\"margin-top: 30px\"> <div class=\"col-md-4 col-md-offset-1\"> <p>Cliente: {{}}</p> </div> <div class=\"col-md-4\"> <p>Terminal: {{$ctrl.detalleTicket.SAN}}</p> </div> <div class=\"col-md-3\"> <p>Usuario: {{$ctrl.detalleTicket.Usuario}}</p> </div> </div> <hr> <div class=\"row\" style=\"margin-top: 30px\"> <h4 class=\"text-muted\" style=\"padding-left: 15px\">Detalle</h4> <div class=\"col-md-4 col-md-offset-1\"> <p>Síntoma: {{$ctrl.sintoma}}</p> </div> <div class=\"col-md-4\"> <p>Prioridad: {{$ctrl.detalleTicket.Prioridad}}</p> </div> <div class=\"col-md-3\"> <p>Fecha de Registro: {{$ctrl.detalleTicket.Fecha}}</p> </div> <div style=\"padding-top: 30px\"> <h4 class=\"text-muted\" style=\"padding-left: 15px\">Descripción</h4> <div class=\"col-sm-12\"> <textarea type=\"text\" disabled>{{$ctrl.detalleTicket.Descripcion}}</textarea> </div> </div> </div> </div> </div> <div class=\"tab-pane\" id=\"tab2\"> <form angular-validator-submit=\"$ctrl.avanceTicket()\" name=\"avance\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"col-md-6\" style=\"padding-top: 15px\"> <h4 class=\"text-muted\"><i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Registrar Avance</h4> </div> <div class=\"col-md-6 text-right\"> <p class=\"text-muted\">Fecha del Registro: {{$ctrl.fecha | date:'dd-MM-yyyy HH:mm:ss'}}</p><br> <p>Usuario: <span style=\"color:#51AAFA\">{{$ctrl.usuario}}</span></p> </div> <div class=\"col-md-12\"> <h5 class=\"text-muted\">Descripción del Avance</h5> <div class=\"col-md-12\"> <textarea type=\"text\" name=\"avanc\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.avance\" required-message=\"'Error!, Este campo es obligatorio.'\" required></textarea> </div> <div class=\"col-md-12 text-right\"> <button class=\"btn btn-raised btn-primary btn-sm\" type=\"submit\"><i class=\"fa fa-plus-circle\"></i> Agregar Avance</button> </div> <br><br> <div class=\"row\"> <div class=\"col-md-6\" style=\"padding-top: 15px\"> <h4 class=\"text-muted\"><i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Historial de Avance</h4> </div> <div class=\"col-md-12\"> <table class=\"table\"> <thead style=\"background:#51AAFA\"> <tr> <th>Fecha</th> <th>Usuario</th> <th>Tipo</th> <th>Avance</th> <th>Archivo</th> <th>Opción</th> </tr> </thead> <tbody> <tr ng-show=\"$ctrl.sinDatos\"> <td colspan=\"5\" class=\"text-center\">No se encontraron datos</td> </tr> <tr dir-paginate=\"x in $ctrl.desglose | itemsPerPage:5\"> <td>{{ }}</td> <td>{{ }}</td> <td>{{ }}</td> <td>{{ }}</td> <td>{{ }}</td> <td></td> </tr> </tbody> </table> </div> </div> </div> </form> </div> <div class=\"tab-pane\" id=\"tab3\"> <form angular-validator-submit=\"$ctrl.closeTicket()\" name=\"cerrar\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"col-md-6\" style=\"padding-top: 15px\"> <h4 class=\"text-muted\"><i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Cierre de ticket de incidencia</h4> </div> <div class=\"col-md-6 text-right\"> <p class=\"text-muted\">Fecha del Registro: {{$ctrl.fecha | date:'dd-MM-yyyy HH:mm:ss'}}</p><br> <p>Usuario: <span style=\"color:#51AAFA\">{{$ctrl.usuario}}</span></p> </div><br> <div class=\"row\"> <div class=\"form-group\"> <label class=\"col-sm-2 col-md-offset-1 control-label text-left\">Solución</label> <div class=\"col-sm-8\"> <select validate-on=\"dirty\" name=\"solucion\" class=\"form-control\" ng-model=\"$ctrl.selectedSolucion\" ng-options=\"v.Descripcion for v in $ctrl.solucion track by v.IdSolucion\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value=\"\" disabled selected>Seleccione solución</option> </select> </div> </div> </div><br> <div class=\"row\"> <div class=\"form-group\"> <label class=\"col-sm-2 col-md-offset-1 control-label text-left\">Causa</label> <div class=\"col-sm-8\"> <input name=\"causaCierre\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.causa\" required-message=\"'Error!, Este campo es obligatorio.'\" required> </div> </div> </div> <div class=\"col-md-12\"> <h5 class=\"text-muted\">Descripción de la solución</h5> <div class=\"col-md-12\"> <textarea name=\"descripcionSolucion\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.descripcionSolucion\" required-message=\"'Error!, Este campo es obligatorio.'\" required></textarea> </div> <div class=\"col-md-6\"> <input type=\"file\" name=\"files\"> <button type=\"button\" ng-click=\"$ctrl.ValidaArchivo()\">Enviar</button> </div> <div class=\"col-md-6 text-right\"> <button class=\"btn btn-raised btn-primary btn-sm\" type=\"submit\"><i class=\"fa fa-minus-circle\"></i> Cerrar Avance</button> </div> </div> </form> </div> </div> </div> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"$ctrl.cancel()\">Cancelar</button> </div>"
  );


  $templateCache.put('views/incidencias/registro.html',
    "<div class=\"panel\" style=\"height:100px\"> <div class=\"panel-body\" style=\"margin-top:-20px\"> <div class=\"col-md-6 col-sm-12\"> <h4 style=\"margin-top: 20px\" class=\"animated fadeInLeft\">Registro de Tickets de Autenticación</h4> <p class=\"animated fadeInDown\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Incidencias>Registro Tickets</p> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"panel form-element-padding\"> <form angular-validator-submit=\"$ctrl.guardar()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator angular-validator-quiet> <div class=\"panel-heading\"> <div class=\"tools\"> <h4 class=\"text-muted\">Información Técnica</h4> </div> </div> <div class=\"panel-body\" style=\"padding-bottom:30px\"> <div class=\"col-md-12\"> <div class=\"row\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Terminal</label> <div class=\"col-sm-4\"> <input type=\"number\" name=\"terminal\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.san\" required-message=\"'Error!, Este campo es obligatorio.'\" required placeholder=\"Buscar por terminal\"> <!-- <div class=\"col-md-5\">\r" +
    "\n" +
    "                                    <button class=\"btn btn-primary\" type=\"button\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\" ng-click=\"$ctrl.getTerminal()\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "                                </div> --> </div> <div class=\"col-md-3\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.getTerminal()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\"><i class=\"fa fa-search\"></i> Buscar</a> </div> </div> </div> <div class=\"row\" ng-show=\"$ctrl.busqueda\"> <div class=\"col-md-6\"> <table class=\"table\"> <thead style=\"background:#2C3F8E\"> <tr> <th colspan=\"5\" class=\"text-center\"><span style=\"color:white\">Búsqueda del terminal</span></th> </tr> </thead> <tbody> <tr class=\"text-center\"> <td>S/N</td> <td>Estado</td> <td>MAC</td> <td>Site Id</td> <td>Subscriptor</td> </tr> <tr> <td>{{ $ctrl.terminalDatos.ESN }}</td> <td>{{ $ctrl.terminalDatos.Estatus }}</td> <td>{{ }}</td> <td>{{ $ctrl.terminalDatos.SAN }}</td> <td>{{ $ctrl.terminalDatos.Suscriptor }}</td> </tr> </tbody> </table> </div> </div> <div class=\"row\" style=\"padding-top:10px\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Motivo</label> <div class=\"col-sm-5\"> <select name=\"motivo\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.selectedMotivo\" ng-options=\"v.Descripcion for v in $ctrl.motivo track by v.IdMotivoTicket\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value=\"\" disabled selected>Seleccione motivo</option> </select> </div> <label class=\"col-sm-1 control-label text-right\">Prioridad</label> <div class=\"col-sm-4\"> <select name=\"prioridad\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.prioridad\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value disabled>Seleccione prioridad</option> <option>Alta</option> <option>Media</option> <option>Baja</option> </select> </div> </div> </div> <div class=\"row\" style=\"padding-top:10px\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Síntoma</label> <div class=\"col-sm-5\"> <select validate-on=\"dirty\" name=\"sintoma\" class=\"form-control\" ng-model=\"$ctrl.selectedSintoma\" ng-options=\"v.Descripcion for v in $ctrl.sintoma track by v.IdSintoma\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value=\"\" disabled selected>Seleccione síntoma</option> </select> </div> </div> </div> </div> <div class=\"col-md-12\"> <div class=\"tools\"> <h4 class=\"text-muted\">Datos del Contacto</h4> <hr> </div> <div class=\"col-md-12\"> <div class=\"row\"> <div class=\"form-group\"> <div class=\"col-sm-4\"> <select validate-on=\"dirty\" name=\"tipo\" class=\"form-control\" ng-model=\"$ctrl.selectedTipoContacto\" ng-options=\"v.Nombre for v in $ctrl.tipoContacto track by v.IdTipoContacto\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value=\"\" disabled selected>Seleccione tipo contacto</option> </select> </div> <div class=\"col-sm-8\"> <input type=\"text\" name=\"contacto\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.nombreContacto\" required-message=\"'Error!, Este campo es obligatorio.'\" required placeholder=\"Nombre del contrato que notificó la incidencia\"> </div> </div> </div> <div class=\"row\"> <div class=\"form-group\"> <div class=\"col-sm-4\"> <select validate-on=\"dirty\" name=\"medioCom\" class=\"form-control\" class=\"form-control\" ng-model=\"$ctrl.selectedMedioComun\" ng-options=\"v.Nombre for v in $ctrl.medioComun track by v.IdMedioComunicacion\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value=\"\" disabled selected>Seleccione medio de comunicación</option> </select> </div> <div class=\"col-sm-8\"> <input type=\"text\" name=\"medio\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.numeroContacto\" required-message=\"'Error!, Este campo es obligatorio.'\" required placeholder=\"Nombre del contrato que notificó la incidencia\"> </div> </div> </div> </div> </div> <div class=\"col-md-12\"> <div class=\"tools\"> <h4 class=\"text-muted\">Descripción</h4> <hr> </div> <div class=\"col-md-12\"> <div class=\"row\"> <div class=\"form-group\"> <div class=\"col-sm-12\"> <textarea type=\"text\" name=\"descripcion\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.descripcion\" required-message=\"'Error!, Este campo es obligatorio.'\" required></textarea> </div> </div> </div> </div> </div> <div class=\"col-md-12\"> <div class=\"tools\"> <p class=\"text-right\"> <button class=\"btn btn-raised btn-primary btn-sm\" type=\"button\" ng-click=\"myForm.reset()\"><i class=\"fa fa-eraser\"></i>Limpiar</button> <button class=\"btn btn-raised btn-primary btn-sm\" type=\"submit\"><i class=\"fa fa-floppy-o\"></i>Guardar Atención</button> </p> </div> </div> </div> </form> </div> </div> </div>"
  );


  $templateCache.put('views/incidencias/registroSistema.html',
    "<div class=\"panel\" style=\"height:100px\"> <div class=\"panel-body\" style=\"margin-top:-20px\"> <div class=\"col-md-6 col-sm-12\"> <h4 style=\"margin-top: 20px\" class=\"animated fadeInLeft\">Registro de Ticket a Sistemas</h4> <p class=\"animated fadeInDown\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Incidencias>Registro Ticket Sistema</p> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"panel form-element-padding\"> <form angular-validator-submit=\"submitMyForm()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"panel-heading\"> </div> <div class=\"panel-body\" style=\"padding-bottom:30px\"> <div class=\"col-md-12\"> <div class=\"row\" style=\"padding-top:10px\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Urgencia</label> <div class=\"col-sm-5\"> <select class=\"form-control\"> <option>Alta</option> <option>Media</option> <option>Baja</option> </select> </div> </div> </div> <div class=\"row\" style=\"padding-top:10px\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Impacto</label> <div class=\"col-sm-5\"> <select class=\"form-control\"> <option>Alto</option> <option>Medio</option> <option>Bajo</option> </select> </div> </div> </div> <div class=\"row\" style=\"padding-top:10px\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Prioridad</label> <div class=\"col-sm-5\"> <input class=\"form-control\" type=\"text\" disabled> </div> </div> </div> </div> <div class=\"col-md-12\"> <div class=\"tools\"> <h4 class=\"text-muted\">Descripción</h4> <hr> </div> <div class=\"col-md-12\"> <div class=\"row\"> <div class=\"form-group\"> <div class=\"col-sm-12\"> <textarea type=\"text\" name=\"nombre\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"form.dirty\" required-message=\"'Error!, Este campo es obligatorio.'\" required></textarea> </div> </div> </div> </div> </div> </div> </form> </div> </div> </div>"
  );


  $templateCache.put('views/loading.html',
    "<style>.cssload-fond{\r" +
    "\n" +
    "\tposition:relative;\r" +
    "\n" +
    "\tmargin: auto;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".cssload-container-general\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tanimation:cssload-animball_two 1.6s infinite;\r" +
    "\n" +
    "\t\t-o-animation:cssload-animball_two 1.6s infinite;\r" +
    "\n" +
    "\t\t-ms-animation:cssload-animball_two 1.6s infinite;\r" +
    "\n" +
    "\t\t-webkit-animation:cssload-animball_two 1.6s infinite;\r" +
    "\n" +
    "\t\t-moz-animation:cssload-animball_two 1.6s infinite;\r" +
    "\n" +
    "\twidth:43px; height:43px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-internal\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\twidth:43px; height:43px; position:absolute;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ballcolor\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\twidth: 19px;\r" +
    "\n" +
    "\theight: 19px;\r" +
    "\n" +
    "\tborder-radius: 50%;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ball_1, .cssload-ball_2, .cssload-ball_3, .cssload-ball_4\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tposition: absolute;\r" +
    "\n" +
    "\tanimation:cssload-animball_one 1.6s infinite ease;\r" +
    "\n" +
    "\t\t-o-animation:cssload-animball_one 1.6s infinite ease;\r" +
    "\n" +
    "\t\t-ms-animation:cssload-animball_one 1.6s infinite ease;\r" +
    "\n" +
    "\t\t-webkit-animation:cssload-animball_one 1.6s infinite ease;\r" +
    "\n" +
    "\t\t-moz-animation:cssload-animball_one 1.6s infinite ease;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ball_1\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tbackground-color:rgb(76,21,176);\r" +
    "\n" +
    "\ttop:0; left:0;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ball_2\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tbackground-color:rgb(19,80,171);\r" +
    "\n" +
    "\ttop:0; left:23px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ball_3\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tbackground-color:rgba(28,69,153,0.13);\r" +
    "\n" +
    "\ttop:23px; left:0;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ball_4\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tbackground-color:rgb(17,155,173);\r" +
    "\n" +
    "\ttop:23px; left:23px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "@keyframes cssload-animball_one\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{ position: absolute;}\r" +
    "\n" +
    "\t50%{top:12px; left:12px; position: absolute;opacity:0.5;}\r" +
    "\n" +
    "\t100%{ position: absolute;}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-o-keyframes cssload-animball_one\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{ position: absolute;}\r" +
    "\n" +
    "\t50%{top:12px; left:12px; position: absolute;opacity:0.5;}\r" +
    "\n" +
    "\t100%{ position: absolute;}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-ms-keyframes cssload-animball_one\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{ position: absolute;}\r" +
    "\n" +
    "\t50%{top:12px; left:12px; position: absolute;opacity:0.5;}\r" +
    "\n" +
    "\t100%{ position: absolute;}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-webkit-keyframes cssload-animball_one\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{ position: absolute;}\r" +
    "\n" +
    "\t50%{top:12px; left:12px; position: absolute;opacity:0.5;}\r" +
    "\n" +
    "\t100%{ position: absolute;}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-moz-keyframes cssload-animball_one\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{ position: absolute;}\r" +
    "\n" +
    "\t50%{top:12px; left:12px; position: absolute;opacity:0.5;}\r" +
    "\n" +
    "\t100%{ position: absolute;}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@keyframes cssload-animball_two\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{transform:rotate(0deg) scale(1);}\r" +
    "\n" +
    "\t50%{transform:rotate(360deg) scale(1.3);}\r" +
    "\n" +
    "\t100%{transform:rotate(720deg) scale(1);}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-o-keyframes cssload-animball_two\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{-o-transform:rotate(0deg) scale(1);}\r" +
    "\n" +
    "\t50%{-o-transform:rotate(360deg) scale(1.3);}\r" +
    "\n" +
    "\t100%{-o-transform:rotate(720deg) scale(1);}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-ms-keyframes cssload-animball_two\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{-ms-transform:rotate(0deg) scale(1);}\r" +
    "\n" +
    "\t50%{-ms-transform:rotate(360deg) scale(1.3);}\r" +
    "\n" +
    "\t100%{-ms-transform:rotate(720deg) scale(1);}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-webkit-keyframes cssload-animball_two\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{-webkit-transform:rotate(0deg) scale(1);}\r" +
    "\n" +
    "\t50%{-webkit-transform:rotate(360deg) scale(1.3);}\r" +
    "\n" +
    "\t100%{-webkit-transform:rotate(720deg) scale(1);}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-moz-keyframes cssload-animball_two\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{-moz-transform:rotate(0deg) scale(1);}\r" +
    "\n" +
    "\t50%{-moz-transform:rotate(360deg) scale(1.3);}\r" +
    "\n" +
    "\t100%{-moz-transform:rotate(720deg) scale(1);}\r" +
    "\n" +
    "}</style> <div class=\"block-ui-overlay\" style=\"background-color: transparent\"></div> <div class=\"block-ui-message-container\" style=\"background-color: transparent\" aria-live=\"assertive\" aria-atomic=\"true\"> <div class=\"block-ui-message\" ng-class=\"$_blockUiMessageClass\" style=\"background-color: transparent\"> <div> <div align=\"center\" class=\"cssload-fond\"> <div class=\"cssload-container-general\"> <div class=\"cssload-internal\"><div class=\"cssload-ballcolor cssload-ball_1\"> </div></div> <div class=\"cssload-internal\"><div class=\"cssload-ballcolor cssload-ball_2\"> </div></div> <div class=\"cssload-internal\"><div class=\"cssload-ballcolor cssload-ball_3\"> </div></div> <div class=\"cssload-internal\"><div class=\"cssload-ballcolor cssload-ball_4\"> </div></div> </div> </div> </div> </div> </div> "
  );


  $templateCache.put('views/login/login.html',
    "<style>.login-page {\r" +
    "\n" +
    "    width: 360px;\r" +
    "\n" +
    "    padding: 8% 0 0;\r" +
    "\n" +
    "    margin: auto;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form {\r" +
    "\n" +
    "    position: relative;\r" +
    "\n" +
    "    z-index: 1;\r" +
    "\n" +
    "    background: #FFFFFF;\r" +
    "\n" +
    "    max-width: 360px;\r" +
    "\n" +
    "    margin: 0 auto 100px;\r" +
    "\n" +
    "    padding: 45px;\r" +
    "\n" +
    "    text-align: center;\r" +
    "\n" +
    "    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form button {\r" +
    "\n" +
    "    font-family: \"Roboto\", sans-serif;\r" +
    "\n" +
    "    text-transform: uppercase;\r" +
    "\n" +
    "    outline: 0;\r" +
    "\n" +
    "    background: #f0ad4e;\r" +
    "\n" +
    "    width: 100%;\r" +
    "\n" +
    "    border: 0;\r" +
    "\n" +
    "    padding: 15px;\r" +
    "\n" +
    "    color: #FFFFFF;\r" +
    "\n" +
    "    font-size: 14px;\r" +
    "\n" +
    "    -webkit-transition: all 0.3 ease;\r" +
    "\n" +
    "    transition: all 0.3 ease;\r" +
    "\n" +
    "    cursor: pointer;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form button:hover,\r" +
    "\n" +
    "  .form button:active,\r" +
    "\n" +
    "  .form button:focus {\r" +
    "\n" +
    "    background: #E99929;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form .message {\r" +
    "\n" +
    "    margin: 15px 0 0;\r" +
    "\n" +
    "    color: #b3b3b3;\r" +
    "\n" +
    "    font-size: 12px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form .message a {\r" +
    "\n" +
    "    color: #f0ad4e;\r" +
    "\n" +
    "    text-decoration: none;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form .register-form {\r" +
    "\n" +
    "    display: none;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container {\r" +
    "\n" +
    "    position: relative;\r" +
    "\n" +
    "    z-index: 1;\r" +
    "\n" +
    "    max-width: 300px;\r" +
    "\n" +
    "    margin: 0 auto;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container:before,\r" +
    "\n" +
    "  .container:after {\r" +
    "\n" +
    "    content: \"\";\r" +
    "\n" +
    "    display: block;\r" +
    "\n" +
    "    clear: both;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container .info {\r" +
    "\n" +
    "    margin: 50px auto;\r" +
    "\n" +
    "    text-align: center;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container .info h1 {\r" +
    "\n" +
    "    margin: 0 0 15px;\r" +
    "\n" +
    "    padding: 0;\r" +
    "\n" +
    "    font-size: 36px;\r" +
    "\n" +
    "    font-weight: 300;\r" +
    "\n" +
    "    color: #1a1a1a;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container .info span {\r" +
    "\n" +
    "    color: #4d4d4d;\r" +
    "\n" +
    "    font-size: 12px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container .info span a {\r" +
    "\n" +
    "    color: #000000;\r" +
    "\n" +
    "    text-decoration: none;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container .info span .fa {\r" +
    "\n" +
    "    color: #EF3B3A;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  body {\r" +
    "\n" +
    "    background: #FFF;\r" +
    "\n" +
    "    /* fallback for old browsers */\r" +
    "\n" +
    "    background: -webkit-linear-gradient(right, #FFF, #FFF);\r" +
    "\n" +
    "    background: -moz-linear-gradient(right, #FFF, #FFF);\r" +
    "\n" +
    "    background: -o-linear-gradient(right, #FFF, #FFF);\r" +
    "\n" +
    "    background: linear-gradient(to left, #FFF, #FFF);\r" +
    "\n" +
    "    font-family: \"Roboto\", sans-serif;\r" +
    "\n" +
    "    -webkit-font-smoothing: antialiased;\r" +
    "\n" +
    "    -moz-osx-font-smoothing: grayscale;\r" +
    "\n" +
    "  }</style> <div class=\"login-page\"> <div class=\"form\"> <img src=\"images/logo1.png\" style=\"width:200px; padding:30px\"> <form class=\"login-form\" angular-validator-submit=\"$ctrl.login()\" name=\"myForm\" novalidate angular-validator> <div class=\"form-group\"> <input type=\"text\" placeholder=\"username\" name=\"nombre\" ng-model=\"$ctrl.user\" validate-on=\"dirty\" ng-model=\"form.dirty\" class=\"form-control\" required-message=\"'El usuario es obligatorio.'\" required> </div> <div class=\"form-group\"> <input type=\"password\" placeholder=\"password\" name=\"password\" ng-model=\"$ctrl.password\" validate-on=\"dirty\" ng-model=\"form.dirty\" class=\"form-control\" required-message=\"'La contraseña es obligatoria.'\" required> </div> <button type=\"submit\">login</button> <p class=\"message\">No estas registrado? <a href=\"\">Contacta al Administrador</a></p> </form> </div> </div>"
  );


  $templateCache.put('views/main.html',
    "<header id=\"header\"> <div class=\"headerbar\"> <!-- Brand and toggle get grouped for better mobile display --> <div class=\"headerbar-left\"> <ul class=\"header-nav header-nav-options\"> <li class=\"header-nav-brand\"> <div class=\"brand-holder\"> <a ui-sref=\"home.cmts\"> <span class=\"text-lg text-bold text-primary\">Monitoreo Mikrotik</span> </a> </div> </li> <li> <a class=\"btn btn-icon-toggle menubar-toggle\" data-toggle=\"menubar\" href=\"javascript:void(0);\"> <i class=\"fa fa-bars\"></i> </a> </li> </ul> </div> <!-- Collect the nav links, forms, and other content for toggling --> <div class=\"headerbar-right\"> <ul class=\"header-nav header-nav-profile\"> <li class=\"dropdown\"> <a href=\"javascript:void(0);\" class=\"dropdown-toggle ink-reaction\" data-toggle=\"dropdown\"> <img src=\"images/ninja.png\" alt=\"\"> <span class=\"profile-info\">{{ $ctrl.usuario }} <small>{{ $ctrl.rol }}</small></span> </a> <ul class=\"dropdown-menu animation-dock\"> <li><a href=\"\" ng-click=\"$ctrl.logOut()\"><i class=\"fa fa-fw fa-power-off text-danger\"></i> Logout</a></li> </ul> <!--end .dropdown-menu --> </li> <!--end .dropdown --> </ul> <!--end .header-nav-profile --> </div> <!--end #header-navbar-collapse --> </div> </header> <!-- END HEADER--> <!-- BEGIN BASE--> <div id=\"base\"> <div id=\"content\"> <section> <div ui-view></div> </section> </div> <!--end #content--> <!-- END CONTENT --> <!-- BEGIN MENUBAR--> <div id=\"menubar\" class=\"menubar-inverse\"> <div class=\"menubar-fixed-panel\"> <div> <a class=\"btn btn-icon-toggle btn-default menubar-toggle\" data-toggle=\"menubar\" href=\"javascript:void(0);\"> <i class=\"fa fa-bars\"></i> </a> </div> </div> <div class=\"menubar-scroll-panel\"> <ul id=\"main-menu\" class=\"gui-controls\"> <!--Metemos el home fijo, ya que no se va a expandir de ninguno--> <li class=\"expanding\"> <a ui-sref=\"home.cmts\"> <div class=\"gui-icon\"><i class=\"md md-home\"></i></div> <span class=\"title\">Mikrotik</span> </a> </li> <li class=\"gui-folder\" ng-repeat=\"x in $ctrl.menus | orderBy:'SortOrder'\" ui-sref-active=\"active\"> <a ui-sref=\"{{ x.Class }}\" ng-if=\"x.MenuChild.length == 0\"> <div class=\"gui-icon\"><i class=\"{{ x.Icon }}\"></i></div> <span class=\"title\">{{ x.Title }}</span> </a> <a ng-if=\"x.MenuChild.length > 0\"> <div class=\"gui-icon\"><i class=\"{{ x.Icon }}\"></i></div> <span class=\"title\">{{ x.Title }}</span> </a> <!--start submenu --> <ul style=\"overflow: hidden; height: 308px; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px\" ng-if=\"x.MenuChild.length > 0\"> <li ng-repeat=\"y in x.MenuChild | orderBy:'SortOrder'\" ng-class=\"{'gui-folder': y.MenuChild.length > 0}\"> <a ui-sref=\"{{ y.Class }}\" ng-class=\"{active:$state.includes(y.Class)}\" ng-if=\"y.MenuChild.length == 0\"><span class=\"title\">{{ y.Title }}</span></a> <a ng-class=\"{active:$state.includes(y.Class)}\" ng-if=\"y.MenuChild.length > 0\"><span class=\"title\">{{ y.Title }}</span></a> <ul style=\"overflow: hidden; height: 308px; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px\" ng-if=\"y.MenuChild.length > 0\"> <li ng-repeat=\"z in y.MenuChild\"> <a ui-sref=\"{{ z.Class }}\" ng-class=\"{active:$state.includes(z.Class)}\"><span class=\"title\">{{ z.Title }}</span></a> </li> </ul> </li> </ul> <!--end /submenu --> </li> </ul> <div class=\"menubar-foot-panel\"> <small class=\"no-linebreak hidden-folded\"> <span class=\"opacity-75\">Copyright &copy; 2049</span> <strong>El Jano</strong> </small> </div> </div> <!--end .menubar-scroll-panel--> </div> <!--end #menubar--> <!-- END MENUBAR --> </div> <!--end #base--> <script src=\"libs/core/source/App.js\"></script> <script src=\"libs/core/source/AppNavigation.js\"></script> <script src=\"libs/core/source/AppOffcanvas.js\"></script> <script src=\"libs/core/source/AppCard.js\"></script> <script src=\"libs/core/source/AppForm.js\"></script> <script src=\"libs/core/source/AppNavSearch.js\"></script> <script src=\"libs/core/source/AppVendor.js\"></script> <script src=\"libs/core/demo/Demo.js\"></script>"
  );


  $templateCache.put('views/monitoreo/DetalleTerminal.html',
    "<style>.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {\r" +
    "\n" +
    "     padding: 0px 4px; \r" +
    "\n" +
    "    line-height: 1.846153846 ;\r" +
    "\n" +
    "    vertical-align: top;\r" +
    "\n" +
    "    border-top: 1px solid rgba(189, 193, 193, 0.2);\r" +
    "\n" +
    "}</style> <div class=\"card\" style=\"margin-top: 10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Status {{$ctrl.datosterminal.deviceID}} </strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Monitoreo>Beams</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> </div> </div> </div> <div class=\"card-body\"> <table class=\"table\" style=\"font-size:10px\"> <tr> <td><b>IPv4 Address</b></td> <td>{{$ctrl.datosterminal.IPv4Address}}</td> <td><b>IPv6 Address</b></td> <td>{{$ctrl.datosterminal.IPv6Address}}</td> <td><b>Associated IPGW </b></td> <td>{{$ctrl.datosterminal.associatedIPGWName}}</td> <td><b>Association time </b></td> <td>{{$ctrl.datosterminal.associationTime}}</td> </tr> <tr> <td><b>Number of available tokens</b></td> <td>{{$ctrl.datosterminal.availTokens}}</td> <td><b>Associated beam Id</b></td> <td>{{$ctrl.datosterminal.beamID}}</td> <td><b>Geographical location</b></td> <td>{{$ctrl.datosterminal.beamLocation}}</td> <td><b>Status of BGP interfaces </b></td> <td>{{$ctrl.datosterminal.bgpStatus}}</td> </tr> <tr> <td><b>BGP V4 Status</b></td> <td>{{$ctrl.datosterminal.bgpV4Status}}</td> <td><b>BGP V6 Status</b></td> <td>{{$ctrl.datosterminal.bgpV6Status}}</td> <td><b>Bytes recived since Association </b></td> <td>{{$ctrl.datosterminal.bytesRxSinceAssoc}}</td> <td><b>Bytes transmitted since Association</b></td> <td>{{$ctrl.datosterminal.bytesTxSinceAssoc}}</td> </tr> <!--<tr>\r" +
    "\n" +
    "--> <!--<td><b>configuredIpv4Subnet</b></td>\r" +
    "\n" +
    "<td>{{$ctrl.datosterminal.configuredIpv4Subnet}}</td>\r" +
    "\n" +
    "<td><b>configuredIpv4SubnetType</b></td>\r" +
    "\n" +
    "<td>{{$ctrl.datosterminal.configuredIpv4SubnetType}}</td>\r" +
    "\n" +
    "<td><b>configuredIpv6Subnet</b></td>\r" +
    "\n" +
    "<td>{{$ctrl.datosterminal.configuredIpv6Subnet}}</td>--> <!--</tr>--> <tr> <td><b>FAP early warning</b></td> <td>{{$ctrl.datosterminal.cosFapEarlyWarning}}</td> <td><b>Current Gateway</b></td> <td>{{$ctrl.datosterminal.currentGateway}}</td> <td><b>DataCenter ID</b></td> <td>{{$ctrl.datosterminal.dataCenterID}}</td> <td><b>Device ID</b></td> <td>{{$ctrl.datosterminal.deviceID}}</td> </tr> <tr> <td><b>Diagnostic Code</b></td> <td>{{$ctrl.datosterminal.diagnosticCode}}</td> <td><b>ESN</b></td> <td>{{$ctrl.datosterminal.esn}}</td> <td><b>Cause of FAP early warning </b></td> <td>{{$ctrl.datosterminal.fapEarlyWarningTrigger}}</td> <td><b>Current FAP Status</b></td> <td>{{$ctrl.datosterminal.fapStatus}}</td> </tr> <tr> <td><b>Gateway ID</b></td> <td>{{$ctrl.datosterminal.gatewayID}}</td> <td><b>Hardware Type</b></td> <td>{{$ctrl.datosterminal.hardwareType}}</td> <td><b>Health Monitor Terminal</b></td> <td>{{$ctrl.datosterminal.healthMonitorTerminal}}</td> <td><b>Peak Period</b></td> <td>{{$ctrl.datosterminal.inPeakPeriod}}</td> </tr> <tr> <td><b>Last Known Outroute Name</b></td> <td>{{$ctrl.datosterminal.lastKnownOutrouteName}}</td> <td><b>Last Polled Time</b></td> <td>{{$ctrl.datosterminal.lastPolledTime}}</td> <td><b>Last Status ChangeTime</b></td> <td>{{$ctrl.datosterminal.lastStatusChangeTime}}</td> <td><b>Latitude</b></td> <td>{{$ctrl.datosterminal.latitude}}</td> </tr> <tr> <td><b>Longitude</b></td> <td>{{$ctrl.datosterminal.longitude}}</td> <td><b>Current throttling stage </b></td> <td>{{$ctrl.datosterminal.multiStageFAPThrottlingStage}}</td> <td><b>No Of Cycles Since Polled</b></td> <td>{{$ctrl.datosterminal.noOfCyclesSincePolled}}</td> <td><b>OffPeak Overall Capacity</b></td> <td>{{$ctrl.datosterminal.offPeakOverallCapacity}}</td> </tr> <tr> <td><b>Off Peak Overall Usage</b></td> <td>{{$ctrl.datosterminal.offPeakOverallUsage}}</td> <td><b>Outroute Name</b></td> <td>{{$ctrl.datosterminal.outrouteName}}</td> <td><b>OveragBytesAnytime</b></td> <td>{{$ctrl.datosterminal.overagBytesAnytime}}</td> <td><b>OverageBytesOffPeak</b></td> <td>{{$ctrl.datosterminal.overageBytesOffPeak}}</td> </tr> <tr> <td><b>Overall Capacity</b></td> <td>{{$ctrl.datosterminal.overallCapacity}}</td> <td><b>Overall Usage</b></td> <td>{{$ctrl.datosterminal.overallUsage}}</td> <td><b>PEP Backbone status</b></td> <td>{{$ctrl.datosterminal.pepBBStatus}}</td> <td><b>Service Activation Identifier</b></td> <td>{{$ctrl.datosterminal.sai}}</td> </tr> <tr> <td><b>Service Plan</b></td> <td>{{$ctrl.datosterminal.servicePlan}}</td> <td><b>Service Provider Id</b></td> <td>{{$ctrl.datosterminal.serviceProviderId}}</td> <td><b>Service Provider Name</b></td> <td>{{$ctrl.datosterminal.serviceProviderName}}</td> <td><b>State Code</b></td> <td>{{$ctrl.datosterminal.stateCode}}</td> </tr> <tr> <td><b>State Code Description</b></td> <td>{{$ctrl.datosterminal.stateCodeDescription}}</td> <td><b>Static Ipv4 Subnet</b></td> <td>{{$ctrl.datosterminal.staticIpv4Subnet}}</td> <td><b>Static Ipv4 SubnetType</b></td> <td>{{$ctrl.datosterminal.staticIpv4SubnetType}}</td> <td><b>Static Ipv6 Subnet</b></td> <td>{{$ctrl.datosterminal.staticIpv6Subnet}}</td> </tr> <tr> <td><b>Terminal Status</b></td> <td>{{$ctrl.datosterminal.terminalStatus}}</td> <td><b>Threshold percentage exceeded </b></td> <td>{{$ctrl.datosterminal.thresholdIndexExceeded}}</td> <td><b>Transport IPGW Name</b></td> <td>{{$ctrl.datosterminal.transportIPGWName}}</td> <td><b>Vlan Id</b></td> <td>{{$ctrl.datosterminal.vlanId}}</td> </tr> <tr> <td><b>vn Id</b></td> <td>{{$ctrl.datosterminal.vnId}}</td> <td><b>vn Name</b></td> <td>{{$ctrl.datosterminal.vnName}}</td> <td><b>Security digit </b></td> <td>{{$ctrl.datosterminal.checkDigit}}</td> <td><b></b></td> <td></td> </tr> </table> </div> </div>"
  );


  $templateCache.put('views/monitoreo/EstadoTerminales.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Estado de Terminales</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Monitoreo>Estado de Terminales</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> </div> </div> </div> <div class=\"section-body\"> <div class=\"panel-body\"> <div class=\"panel form-element-padding\"> <div class=\"row form-group text-center\"> <h5><b>Gráfica de Consumo de Terminal por Fechas</b></h5> <div class=\"col-md-4\"> <b>Fecha Inicio</b> <input type=\"datetime-local\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"ctrl.FechaInicio\"> </div> <div class=\"col-md-4\"> <b>Fecha Fin</b> <input type=\"datetime-local\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"ctrl.FechaFin\"> </div> <div class=\"col-md-2\"> <b>Beam</b> <select class=\"form-control input-sm\" ng-model=\"$ctrl.beam\" ng-options=\"v.Name for v in $ctrl.Beams track by v.BeamId \"> <option value=\"\">Selecciona</option> </select> </div> <div class=\"col-md-2\"> <button class=\"btn pull-right btn-raised btn-success\" type=\"button\" ng-click=\"$ctrl.graficar()\">Graficar</button> </div> </div> <div class=\"row form-group\"> <div class=\"col-md-8\" style=\"margin-top:10px\"> <canvas id=\"chartjs-0\" class=\"chartjs\" width=\"770\" height=\"385\" style=\"display: block; width: 770px; height: 385px\"></canvas> </div> <div class=\"col-md-4\" style=\"margin-top:10px\"> <div class=\"panel form-element-padding\"> <table class=\"table\"> <thead> <tr> <th>Status Técnico</th> <th>Cantidad</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.resultados|itemsPerPage:15\"> <td>{{ x.TerminalStatus }}</td> <td>{{ x.Cantidad }}</td> </tr> </tbody> </table> <dir-pagination-controls max-size=\"15\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('views/monitoreo/MapaTerminales.html',
    "<style>.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {\r" +
    "\n" +
    "    padding: 5px 8px !important;\r" +
    "\n" +
    "    line-height: 1.846153846;\r" +
    "\n" +
    "    vertical-align: top;\r" +
    "\n" +
    "    border-top: 1px solid rgba(189, 193, 193, 0.2);\r" +
    "\n" +
    "}</style> <div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Beams</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Monitoreo>Beams</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> </div> </div> </div> <div class=\"card-body\"> <div class=\"col-md-2\" style=\"overflow-y:scroll; max-height: 500px\"> <ul class=\"list divider-full-bleed\"> <li class=\"tile\" ng-repeat=\"x in $ctrl.Beams\"> <a class=\"tile-content ink-reaction\" href=\"\" ng-click=\"$ctrl.DetalleBeam(x)\"> <p>{{x.Name}}</p> </a> <a class=\"btn btn-flat ink-reaction btn-xs\" ng-click=\"$ctrl.DetalleBeam(x)\"> <i class=\"md md-my-location\"></i> </a> </li> </ul> </div> <div class=\"col-md-5\"> <ng-map zoom=\"11\" center=\"41.875696,-87.624207\" style=\"height: 500px\"> <marker ng-repeat=\"pos in $ctrl.Terminales\" id=\"{{pos.san}}\" position=\"{{pos.Lat}}, {{pos.Lng}}\" on-click=\"$ctrl.DetalleTerminal($event)\"></marker> <kml-layer url=\"{{$ctrl.UrlBeam}}\"> </kml-layer> </ng-map> </div> <div class=\"col-md-5\"> <uib-tabset active=\"active\"> <uib-tab index=\"0\" heading=\"OUTROUTE\"> <table class=\"table\" style=\"font-size:10px\"> <tr> <td colspan=\"3\"><b>OUTROUTE VALUES BEAM ID {{$ctrl.datosoutroute.beamId}}</b></td> </tr> <tr> <td><b>Beam Name</b></td> <td>{{$ctrl.datosoutroute.beamName}}</td> <td><b>Total outroute satellite usage</b> </td> <td>{{$ctrl.datosoutroute.satelliteUsage}}</td> </tr> <tr> <td><b> Maximum outroute Configured(Mbps)</b> </td> <td>{{$ctrl.datosoutroute.cbrSubscription}}</td> <td><b>Total outroute CBR usage(Mbps)</b></td> <td>{{$ctrl.datosoutroute.cbrUsage}}</td> </tr> <tr> <td><b>Gateway Id</b></td> <td>{{$ctrl.datosoutroute.gatewayId}}</td> <td><b>Gateway Name</b></td> <td>{{$ctrl.datosoutroute.gatewayName}}</td> </tr> <tr> <td><b>Maximum outroute bandwidth Configured (Mbps)</b></td> <td>{{$ctrl.datosoutroute.maxSubscription}}</td> <td><b> Minimumoutroute bandwidth Configured (Mbps)</b></td> <td>{{$ctrl.datosoutroute.minSubscription}}</td> </tr> <tr> <td><b>Total offered Multicast load (Mbps)</b></td> <td>{{$ctrl.datosoutroute.multicastOfferedLoad}}</td> <td><b>Total Multicast outroutesatellite usage (Mbps) </b></td> <td>{{$ctrl.datosoutroute.multicastSatelliteBits}}</td> </tr> <tr> <td><b> Maximum Multicast bandwidth Configured</b> </td> <td>{{$ctrl.datosoutroute.multicastSubscription}}</td> <td><b>Total offered load bandwidth (Mbps)</b></td> <td>{{$ctrl.datosoutroute.offeredLoad}}</td> </tr> <tr> <td><b>Total demanded outroute bandwidth(Mbps) </b></td> <td>{{$ctrl.datosoutroute.overallDemand}}</td> <td><b>Time Stamp</b></td> <td>{{$ctrl.datosoutroute.timeStamp}}</td> </tr> <tr> <td><b>vnId</b></td> <td>{{$ctrl.datosoutroute.vnId}}</td> <td><b>vnName</b></td> <td>{{$ctrl.datosoutroute.vnName}}</td> </tr> <tr> <td><b>Maximum outroute Download Configured</b></td> <td>{{$ctrl.datosoutroute.dlThruSubscription}}</td> <td><b>Minimumoutroute Download Configured</b></td> <td>{{$ctrl.datosoutroute.dlThruMinSubscription}}</td> </tr> </table> </uib-tab> <uib-tab index=\"1\" heading=\"INROUTE\"> <table class=\"table\" style=\"font-size:10px\"> <tr> <td colspan=\"3\"><b>INROUTE VALUES BEAM ID {{$ctrl.datosinroute.beamId}}</b></td> </tr> <tr> <td><b>Beam Name</b></td> <td>{{$ctrl.datosinroute.beamName}}</td> <td><b>Total inroute satellite usage</b></td> <td>{{$ctrl.datosinroute.satelliteUsage}}</td> </tr> <tr> <td><b>Total inroute CBR usage(Mbps)</b></td> <td>{{$ctrl.datosinroute.cbrSatUsage}}</td> <td><b>Total inroute CBR offered load (Mbps)</b></td> <td>{{$ctrl.datosinroute.cbrOfferUsage}}</td> </tr> <tr> <td><b> Maximum inroute CBR bandwidth Configured(Mbps) </b></td> <td>{{$ctrl.datosinroute.cbrSubscription}}</td> <td><b>Total demanded inroute bandwidth(Mbps)</b></td> <td>{{$ctrl.datosinroute.demand}}</td> </tr> <tr> <td><b>Gateway Id</b></td> <td>{{$ctrl.datosinroute.gatewayId}}</td> <td><b>Gateway Name</b></td> <td>{{$ctrl.datosinroute.gatewayName}}</td> </tr> <tr> <td><b> Maximum inroute bandwidth Configured(Mbps)</b></td> <td>{{$ctrl.datosinroute.maxSubscription}}</td> <td><b> Maximum inroute bandwidth Configured(Mbps)</b></td> <td>{{$ctrl.datosinroute.minSubscription}}</td> </tr> <tr> <td><b>Active Terminals</b></td> <td>{{$ctrl.datosinroute.numActiveTerminals}}</td> <td>Total inroute offered load bandwidth (Mbps) </td> <td>{{$ctrl.datosinroute.offeredLoad}}</td> </tr> <tr> <td><b>TimeStamp</b></td> <td>{{$ctrl.datosinroute.timeStamp}}</td> <td><b> Maximum throughput inroute bandwidth Configured(Mbps) </b></td> <td>{{$ctrl.datosinroute.throughputLimit}}</td> </tr> <tr> <td><b> Maximum CBR throughput inroute bandwidth Configured</b></td> <td>{{$ctrl.datosinroute.throughputLimitCBR}}</td> <td><b> maximum throughput inroute bandwidth Configured </b></td> <td>{{$ctrl.datosinroute.throughputLimitMin}}</td> </tr> <tr> <td><b>vnId</b></td> <td>{{$ctrl.datosinroute.vnId}}</td> <td><b>vnName</b></td> <td>{{$ctrl.datosinroute.vnName}}</td> </tr> </table> </uib-tab> </uib-tabset> </div> </div></div>"
  );


  $templateCache.put('views/monitoreo/SignOff.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">sign off</h4> </div> <div class=\"modal-body\" style=\"padding:40px\"> <div class=\"row\"> <div class=\"col-md-3\"><b>FSO:</b>{{ctrl.headers.siteOrder.fso}}</div> <div class=\"col-md-3\"><b>SAN:</b>{{ctrl.headers.san}}</div> <div class=\"col-md-3\"><b>Visit Type:</b>{{ctrl.headers.siteOrder.visitType}}</div> <div class=\"col-md-3\"><b>SignOff Id:</b>{{ctrl.headers.signOff.signoffId}}</div> </div> <div class=\"row\"> <br> <p>Please indicate the site installation problems and actions performed....</p> <br> <div class=\"col-md-4\"> <center><b>Installation</b></center><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.sight\"><span>Line of sight</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.dish\"><span>Replace Dish</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.repaired\"><span>Repaired/replaced cable/connector/ground block/weather</span> </label><br><br> <center><b>No installation Problems</b></center> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.noinstallation\"><span>No installation problems</span> </label> </div> <div class=\"col-md-4\"> <center><b>Hardware</b></center> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" value=\"option3\" ng-model=\"ctrl.feedhorn\"><span>Replace/Repair feedhorn polarizer</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.radio\"><span>Defective radio being returned from repair</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.modem\"><span>Defective modem being returned from repair</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.power\"><span>Replace power supply</span> </label><br> </div> <div class=\"col-md-4\"> <center><b>Software</b></center> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.modemsoftware\"> <span>Modem software Installation/proccesing problem</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.NOCC\" ng-checked=\"false\"><span>NOCC/Tier 3 Corrected Network Problem</span> </label><br> <center><b>Customer related</b></center> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.customerRefused\" ng-checked=\"false\"><span>Customer refused install</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.customersoft\" ng-checked=\"false\"><span>Customer equipment/software/router problems</span> </label><br> <center><b>Other</b></center> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.other\" ng-checked=\"false\"><span>Other</span> </label><br> </div> </div> <div class=\"row\"> <p>Provide installation details bellow...</p> <textarea class=\"form-control\" ng-model=\"ctrl.DetailProblem\"></textarea> <br> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-danger btn-sm\" ng-click=\"ctrl.SingOff();\">Sign Off</button> <button class=\"btn btn-default-bright btn-sm\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/monitoreo/diagnostic.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">TDS/Jupiter-Site Diagnostic Tool</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Monitoreo</a></small> </header> <div class=\"tools\"> </div> </div> <div class=\"row\"> <form ng-submit=\"$ctrl.searchSan()\"> <div class=\"col-md-5\" style=\"min-height: 100px; padding-top:20px\"> <div class=\"col-md-1\"> <label>San:</label> </div> <div class=\"col-md-5\"> <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.san\"> </div> <div class=\"col-md-6\" style=\"padding-top:5px; padding-left:-5px\"> <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-search\"></i> Search</button> </div> </div> </form> </div> <div class=\"panel-group col-md-12\" style=\"margin-top: -10px\" ng-show=\"$ctrl.showSan\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#diagnostic\" data-target=\"#diagnostic-1\" aria-expanded=\"false\"> <header>Diagnostic Tools</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"diagnostic-1\" class=\"collapse diagnostic\" aria-expanded=\"false\" style=\"height: 0px\"> <div class=\"row\"> <div class=\"col-md-4\"> <div class=\"row\"> <div class=\"col-md-6 text-right\"> <p><strong>SAN:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px\"> <p>{{ $ctrl.diagnosticData.SAN }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Adapter Type:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Adapter_Type }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Gateway Id:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.GW_ID }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Beam Id:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Beam_ID }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Latitude:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Lat }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Longitude:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Lng }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Antenna Size:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Antenna_Size }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>ODU Power</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.ODU_Pwr }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Terminal State Code:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Terminal_State_Code }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>IMG Status:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.IGM_Status }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Overall GM Status:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Overall_GW_Status }}</p> </div> </div> </div> <div class=\"col-md-4\"> <div class=\"row\"> <div class=\"col-md-6 text-right\"> <p><strong>UL/DL Group:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px\"> <p>{{ $ctrl.diagnosticData.ULDL_Group }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Polarization:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Polarization }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>IDU ESN:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.ESN }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>ODU SN:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.ODU_SN }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Modem Temp:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Modem_Temp }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Last Reboot Reason:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Last_Reboot_Reason }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Last Reboot Date:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Last_Reboot_Date }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Activation Date:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Activation_Date }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>SW Version:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.SW_Version }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Service Profile:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Service_Profile }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>IPGW Status:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.IPGW_Status }}</p> </div> </div> </div> <div class=\"col-md-4\"> <div class=\"row\"> <div class=\"col-md-6 text-right\"> <p><strong>UL Atten:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px\"> <p>{{ $ctrl.diagnosticData.Adapter_Type }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>DL Atten:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.UL_Atten }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>UL Atten Offset:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.UL_Atten_Offset }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>DL Atten Offset:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.DL_Atten_Offset }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Normalized UL Es/No:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Norm_UL_EsNo }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Normalized DL Es/No:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Norm_DL_EsNo }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Realtime UL Es/No Offset:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.RT_UL_EsNo_Offset }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Realtime DL Es/No Offset:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.RT_DL_EsNo_Offset }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Realtime Outroute Offset:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.RT_Outroute_Offset }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Last Processed Date:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Last_Processed_Date }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>CRO Status:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.CRO_Status }}</p> </div> </div> </div> </div> </div> </div> <!--end .panel --> </div> <div class=\"panel-group col-md-12\" style=\"margin-top:-20px\" ng-show=\"$ctrl.showSan\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#diagnosis\" data-target=\"#diagnosis-1\" aria-expanded=\"false\"> <header>Diagnosis</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"diagnosis-1\" class=\"collapse diagnosis\" aria-expanded=\"false\" style=\"height: 0px\"> <div class=\"row\"> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-top:-20px\"> <p><strong>Diagnosis: </strong>{{ $ctrl.diagnosticData.Diagnosis }}</p> <p><strong>Recommended Action: </strong>{{ $ctrl.diagnosticData.Recommended_Action }}</p> <p><button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.recommendedAction()\">Completed Action</button></p> <p style=\"padding-left:20px\"><small>(Perform recommended action above, then click \"Completed Action\")</small></p> </div> </div> </div> </div> <!--end .panel --> </div> <div class=\"panel-group col-md-12\" style=\"margin-top:-20px\" ng-show=\"$ctrl.showSan\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#table-info\" data-target=\"#table-info-1\" aria-expanded=\"false\"> <header>Information Table</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"table-info-1\" class=\"collapse table-info\" aria-expanded=\"false\"> <div class=\"col-md-12\" style=\"margin-left:10px\"> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Current_Stats')\">Get Curren Stats</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Force_range')\">Force Range</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Clear_Term_Stats')\">Clear Terminal Stats</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Reregister')\">Register</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Reload_tables')\">Reload Tables</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Force_fallback')\">Force Fallback</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Reboot')\">Reboot</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Reassociate')\">Re-Associate</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Clear_PEP_Stats')\">Clear PEP Stats</button> </div> <div class=\"col-md-12\" style=\"padding-top:10px; padding-left:20px; padding-right:10px\"> <table class=\"table table-bordered\"> <thead> <th colspan=\"2\"></th> <th class=\"text-center\" colspan=\"3\">Packet Loss Stats</th> <th class=\"text-center\" colspan=\"2\">Uplink Stats</th> <th class=\"text-center\" colspan=\"3\">Downlink Stats</th> </thead> <tbody> <tr> <td class=\"text-center\"></td> <td class=\"text-center\">Timestamp</td> <td class=\"text-center\">UL Pkt Losss %</td> <td class=\"text-center\">Aloha Pkt Loss %</td> <td class=\"text-center\"> DL Pkt Loss %</td> <td class=\"text-center\">UL Es/No Avail</td> <td class=\"text-center\">UL Deviation</td> <td class=\"text-center\">DL Es/No</td> <td class=\"text-center\">MODCOD</td> <td class=\"text-center\">DL Deviation</td> </tr> <tr> <td class=\"text-right\">History Values</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_Timestamp }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_UL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_Aloha_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_DL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_ULEsNo_Avail }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_UL_Dev }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_DL_EsNo }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_MODCOD }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_DL_Dev }}</td> </tr> <tr> <td class=\"text-right\">Target Values</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_Timestamp }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_UL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_Aloha_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_DL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_ULEsNo_Avail }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_UL_Dev }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_DL_EsNo }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_MODCOD }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_DL_Dev }}</td> </tr> <tr> <td class=\"text-right\">Curren Values</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_Timestamp }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_UL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_Aloha_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_DL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_ULEsNo_Avail }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_UL_Dev }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_DL_EsNo }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_MODCOD }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_DL_Dev }}</td> </tr> <tr> <td class=\"text-right\">Difference</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_Timestamp }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_UL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_Aloha_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_DL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_ULEsNo_Avail }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_UL_Dev }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_DL_EsNo }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_MODCOD }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_DL_Dev }}</td> </tr> </tbody> </table> </div> <div class=\"col-md-12\"> <div class=\"col-md-6\"> <div class=\"card\"> <div class=\"card-body no-padding\"> <div class=\"alert alert-callout alert-success no-margin\" style=\"height: 150px\"> <strong class=\"text-md\">Current Weather Conditions At Gateway</strong><br> <span class=\"opacity-50\">{{ $ctrl.diagnosticData.gw_weather }}, {{ $ctrl.diagnosticData.gw_Temp_F }}</span><br> <span class=\"opacity-50\">Rainfall - Last Hour: {{ $ctrl.diagnosticData.gw_rainfall_lasthr }}</span><br> <span class=\"opacity-50\">Visibility: {{ $ctrl.diagnosticData.gw_visibility }}</span><br> </div> </div> </div> </div> <div class=\"col-md-6\"> <div class=\"card\"> <div class=\"card-body no-padding\"> <div class=\"alert alert-callout alert-success no-margin\" style=\"height: 150px\"> <strong class=\"text-md\">Current Weather Conditions At {{ $ctrl.diagnosticData.Site_State }}, {{ $ctrl.diagnosticData.Site_City }} </strong><br> <span class=\"opacity-50\">{{ $ctrl.diagnosticData.Site_weather }}, {{ $ctrl.diagnosticData.gw_Temp_F }}</span><br> <span class=\"opacity-50\">Rainfall - Last Hour: {{ $ctrl.diagnosticData.Site_rainfall_lasthr }}</span><br> <span class=\"opacity-50\">Visibility: {{ $ctrl.diagnosticData.Site_visibility }}</span><br> </div> </div> </div> </div> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('views/monitoreo/displayForSan.html',
    "<style type=\"text/css\">.scrollDiv {\r" +
    "\n" +
    "\t\theight: 300px;\r" +
    "\n" +
    "\t\toverflow: auto;\r" +
    "\n" +
    "\t\toverflow-x: hidden;\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "\t\r" +
    "\n" +
    "\t.scrollDiv2 {\r" +
    "\n" +
    "\t\theight: 200px;\r" +
    "\n" +
    "\t\toverflow: auto;\r" +
    "\n" +
    "\t\toverflow-x: hidden;\r" +
    "\n" +
    "\t}</style> <div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head card-head-xs style-info\"> <header>TDS/Jupiter Diagnostic Display</header> </div> <br> <div class=\"row\"> <div class=\"col-md-4\"></div> <div class=\"col-md-4\" style=\"padding: 20px\"> <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.SAN\" placeholder=\"Please enter a valid SAN to Proceed\"> <br> <button class=\"btn btn-block btn-primary\" ng-click=\"$ctrl.validate()\">Validate</button> </div> <div class=\"col-md-3\"></div> </div> <div class=\"row\"> <div class=\"col-md-3 col-md-offset-8\"> <button class=\"btn btn-block btn-default\" ng-click=\"$ctrl.displayTest()\">Display Speed Test Result</button> </div> </div> <br> <div class=\"row\"> <div class=\"col-md-6 col-md-offset-1 card scrollDiv\" style=\"background:#E2EBEA\"> <h5 class=\"text-primary text-center\" style=\"margin-top: 50px\">Terminal Stats:</h5> <ul style=\"font-size: 11px\"> <li>Serial Number ............{{$ctrl.jul1['Serial Number']}}</li> <li>System State Code ........{{$ctrl.jul1['System State Code']}} ({{$ctrl.jul1['System State Code Description']}})</li> <li>Downlink SQF .............{{$ctrl.jul1['Downlink SQF']}}</li> <li>LAN Status ...............{{$ctrl.jul1['LAN Status']}}</li> <li>FAP Status ...............{{$ctrl.jul1['FAP State Code']}}</li> <li>Web MBX Status ...........{{$ctrl.jul1['MBX Status']}}</li> <li>Web Acceleration Status ..{{$ctrl.jul1['TCP Acceleration State Code']}}</li> <li>Hour Diagnostic Code .....{{$ctrl.jul1['Hour Diagnostic Code']}}</li> <li>Minute Diagnostic Code ...{{$ctrl.jul1['Minute Diagnostic Code']}}</li> <li>Walled Garden? ...........{{$ctrl.jul1['']}}</li> <li>Uptime ...................{{$ctrl.jul2['Terminal UpTime']}}</li> </ul> </div> <div class=\"col-md-4 card scrollDiv\" style=\"padding-right: 30px; background:#E2EBEA\"> <h5 class=\"text-primary text-center\" style=\"margin-top: 10px\">LAN Diagnostics Current State:</h5> <table class=\"table\"> <thead> <tr> <th style=\"background:#81BEF7\">Current State</th> <th style=\"background:#81BEF7\">Status</th> </tr> </thead> <tbody> <tr style=\"font-size: 11px\"> <td class=\"active\">Router Detected?<br><span style=\"color:red\">(If NO, verify with the customer)</span></td> <td class=\"active\"><span style=\"color:red\">No</span></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"info\">LAN cable from modem to router is connected<br>property<br><span style=\"color:red\">(If NO, check connections)</span></td> <td class=\"info\"><span style=\"color:green\">Yes</span></td> </tr> </tbody> </table> <h5 class=\"text-primary text-center\" style=\"margin-top: 10px\">LAN Diagnostics:</h5> <table class=\"table\"> <thead> <tr> <th style=\"background:#81BEF7\">Historical LAN Diagnostics</th> <th style=\"background:#81BEF7\">Status</th> </tr> </thead> <tbody> <tr style=\"font-size: 11px\"> <td class=\"active\">Router Performance</td> <td class=\"active\"><span style=\"color:green\">No</span></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"info\">Wireless device/s performance</td> <td class=\"info\"><span style=\"color:green\">No</span></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\">Wireles network coverage</td> <td class=\"active\"><span style=\"color:green\">No</span></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"info\">Indeterminate issue</td> <td class=\"info\"><span style=\"color:green\">No</span></td> </tr> <tr class=\"text-center\" style=\"font-size: 11px\"> <td class=\"active\">See KB 8052 for more information</td> <td class=\"active\"><span style=\"color:red\"></span></td> </tr> </tbody> </table> </div> </div> <div class=\"row\"> <div class=\"col-md-6 col-md-offset-1 card scrollDiv2\" style=\"background:#E2EBEA\"> <h5 class=\"text-primary text-left\" style=\"margin-top: 20px\">Device Mac Addresses:</h5> <ul style=\"font-size: 11px\"> <li>ARP MAC Entry-1............{{$ctrl.jul1['ARP MAC Entry-1']}}</li> <li>ARP MAC Entry-2............{{$ctrl.jul1['ARP MAC Entry-2']}}</li> <li>ARP MAC Entry-3............{{$ctrl.jul1['ARP MAC Entry-3']}}</li> <li>ARP MAC Entry-4............{{$ctrl.jul1['ARP MAC Entry-4']}}</li> <li>ARP MAC Entry-5............{{$ctrl.jul1['ARP MAC Entry-5']}}</li> </ul> </div> <div class=\"col-md-4 card scrollDiv2\" style=\"padding-right: 30px; background:#E2EBEA\"> <h5 class=\"text-primary text-center\" style=\"margin-top: 10px\">Ip Connectivity Status:</h5> <label>IP Connectivity Status</label> <ul style=\"font-size: 11px\"> <li>Packets Transmitted.............{{$ctrl.ip['Packets Transmitted']}}</li> <li>Packets Received................{{$ctrl.ip['Packets Received']}}</li> <li>Packets Loss....................{{$ctrl.ip['Packet Loss']}}</li> <li>Minimum Delay Time..............{{$ctrl.ip['Minimum Delay Time']}}</li> <li>Maximum Delay Time..............{{$ctrl.ip['Maximum Delay Time']}}</li> <li>Avarage Delay Time..............{{$ctrl.ip['Average Delay Time']}}</li> <li>Maximum Jitter..................{{$ctrl.ip['Maximum Jitter']}}</li> </ul> </div> </div> <div class=\"row\"> <div class=\"col-md-10 col-md-offset-1\"> <table class=\"table\"> <thead> <tr> <th colspan=\"2\">Alarm History:</th> <th colspan=\"7\"></th> <th colspan=\"1\">Reboot History</th> <th colspan=\"1\"></th> </tr> </thead> <tbody> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">Alarm Timestamp (UTC)</td> <td class=\"active\" colspan=\"1\">Event ID</td> <td class=\"active\" colspan=\"2\">Severity</td> <td class=\"active\" colspan=\"3\">Reason</td> <td class=\"active\" colspan=\"1\">Probable Cause</td> <td class=\"active\" colspan=\"1\">Timestamp</td> <td class=\"active\" colspan=\"1\">Reboot Reason</td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">{{$ctrl.entry1[0]}}</td> <td class=\"active\" colspan=\"1\">{{$ctrl.entry1[1]}}</td> <td class=\"active\" colspan=\"2\">{{$ctrl.entry1[2]}}</td> <td class=\"active\" colspan=\"3\">{{$ctrl.entry1[3]}}</td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">{{$ctrl.entry2[0]}}</td> <td class=\"active\" colspan=\"1\">{{$ctrl.entry2[1]}}</td> <td class=\"active\" colspan=\"2\">{{$ctrl.entry2[2]}}</td> <td class=\"active\" colspan=\"3\">{{$ctrl.entry2[3]}}</td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">{{$ctrl.entry3[0]}}</td> <td class=\"active\" colspan=\"1\">{{$ctrl.entry3[1]}}</td> <td class=\"active\" colspan=\"2\">{{$ctrl.entry3[2]}}</td> <td class=\"active\" colspan=\"3\">{{$ctrl.entry3[3]}}</td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">{{$ctrl.entry4[0]}}</td> <td class=\"active\" colspan=\"1\">{{$ctrl.entry4[1]}}</td> <td class=\"active\" colspan=\"2\">{{$ctrl.entry4[2]}}</td> <td class=\"active\" colspan=\"3\">{{$ctrl.entry4[3]}}</td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">{{$ctrl.entry5[0]}}</td> <td class=\"active\" colspan=\"1\">{{$ctrl.entry5[1]}}</td> <td class=\"active\" colspan=\"2\">{{$ctrl.entry5[2]}}</td> <td class=\"active\" colspan=\"3\">{{$ctrl.entry5[3]}}</td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> </tr> </tbody> </table> </div> </div> </div>"
  );


  $templateCache.put('views/monitoreo/modalSpeedTest.html',
    "<div class=\"modal-header\"> <small class=\"text-muted\" style=\"font-size:12px; margin-left:10px\">Speed Test Results</small> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"$ctrl.cancel()\">×</button> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div> <ul> <li>Execution time: {{$ctrl.test['Execution time']}}</li> <li>Upload speed (kb/sec): {{$ctrl.test['Upload speed (kb/sec)']}}</li> <li>Download spees (kb/sec): {{$ctrl.test['Download speed (kb/sec)']}}</li> <li>Round trip ping time (msec): {{$ctrl.test['Round trip ping time (msec)']}}</li> <li>Packet loss rate (%): {{$ctrl.test['Packet loss rate (%)']}}</li> </ul> </div> </div> <div class=\"modal-footer\"> </div>"
  );


  $templateCache.put('views/monitoreo/validation.html',
    "<style>.font-reduced {\r" +
    "\n" +
    "    font-size: 13px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  .table>tfoot>tr>td {\r" +
    "\n" +
    "    padding: 5px !important;\r" +
    "\n" +
    "  }</style> <div class=\"card\" style=\"margin-top:20px\" ng-show=\"$ctrl.OVT1\"> <div class=\"card-head card-head-xs style-info\"> <header>HughesNet <small class=\"text-muted\">TDS/Jupiter-Onsite Validation Tool (1 of 3)</small> </header> </div> <div class=\"card text-center\"> <div class=\"row\"> <div class=\"col-md-4\"></div> <div class=\"col-md-4\" style=\"padding: 20px\"> <b>Please enter a valid SAN to Proceed </b><br><br> <input type=\"text\" class=\"form-control\" placeholder=\" \" ng-model=\"$ctrl.SAN\"> <br> <button class=\"btn btn-block btn-primary\" ng-click=\"$ctrl.validate()\">Validate</button> </div> <div class=\"col-md-3\"></div> </div> </div> <div class=\"card\"> <div class=\"card-body\"> <div class=\"row text-center\"> <h5 style=\"color: #0aa89e\">Step 1: Verify FSO and Site Information> </h5> </div> <div class=\"row text-center\"> <button type=\"button\" class=\"btn btn-sm btn-default\" name=\"button\" ng-click=\"$ctrl.getRefresh()\"><i class=\"fa fa-refesh\"></i> Refresh Site Info</button> <button type=\"button\" class=\"btn btn-sm btn-default-dark\" name=\"button\" ng-click=\"$ctrl.getPing()\"><i class=\"fa fa-terminal\"></i> Ping Terminal</button> </div> <div class=\"table-responsive\"> <table class=\"table no-margin\"> <tbody> <tr> <td><b style=\"font-size: smaller\">FSO:</b></td> <td> <p>{{$ctrl.Details.siteOrder.fso}}</p> </td> <td><b style=\"font-size: smaller\">SAN:</b></td> <td><p>{{$ctrl.Details.san}}</p></td> <td><b style=\"font-size: smaller\">Latitude:</b></td> <td> <p>{{$ctrl.Details.terminal.location.latitudeDMS}}</p> </td> <td><b style=\"font-size: smaller\">Repl IDU ESN:</b></td> <td> <p>{{$ctrl.Details.siteOrder.replIDUESN}}</p> </td> </tr> <tr> <td><b style=\"font-size: smaller\">Visit Type:</b></td> <td> <p>{{$ctrl.Details.siteOrder.visitType}} </p></td> <td> <b style=\"font-size: smaller\">Serial#:</b></td> <td> <p>{{$ctrl.Details.terminal.esn}}</p> </td> <td><b style=\"font-size: smaller\">Longitude:</b></td> <td> <p>{{$ctrl.Details.terminal.location.longitudeDMS}}</p> </td> <td> <p><b style=\"font-size: smaller\">Repl ODU ESN:</b></p> </td> <td> <p>{{$ctrl.Details.siteOrder.replODUESN}}</p> </td> </tr> <tr> <td> <p><b style=\"font-size: smaller\">Installer Id:</b></p> </td> <td> <p>{{$ctrl.Details.installer.id}}</p> </td> <td> <p><b style=\"font-size: smaller\">Adapter Type:</b></p> </td> <td> <p>{{$ctrl.Details.terminal.adapterType}}</p> </td> <td> <p><b style=\"font-size: smaller\">UL/DL Group:</b></p> </td> <td> <p>{{$ctrl.Details.terminal.location.longitudeDMS}}</p> </td> <td> <p><b style=\"font-size: smaller\">Antenna Part#:</b></p> </td> <td> <p>{{$ctrl.Details.outdoorUnit.antenna.partNumber}}</p> </td> </tr> <tr> <td> <p><b style=\"font-size: smaller\">Installer Name:</b></p> </td> <td> <p>{{$ctrl.Details.installer.name}}</p> </td> <td> <p><b style=\"font-size: smaller\">Gateway Id:</b></p> </td> <td> <p>{{$ctrl.Details.terminal.gatewayId}}</p> </td> <td> <p><b style=\"font-size: smaller\">Beam Id:</b></p> </td> <td> <p>{{$ctrl.Details.terminal.beamId}}</p> </td> <td> <p><b style=\"font-size: smaller\">Company Type:</b></p> </td> <td> <p>{{$ctrl.Details.company}}</p> </td> </tr> <tbody> </tbody></tbody></table> </div> </div> </div> <div class=\"row text-center\"> <div class=\"col-md-6 form-group\"> <div class=\"col-md-12\"> <h5 style=\"color: #0aa89e\">Step 2: Choose The Antenna Size That You Will Install</h5> </div> <div class=\"col-md-12\"> <div class=\"col-md-12\" ng-repeat=\"x in $ctrl.antennas\"> <label class=\"checkbox-inline checkbox-styled\"> <input type=\"radio\" ng-value=\"x.size\" ng-model=\"$ctrl.antenna\"><span>{{ x.description }}</span> </label> </div> <!-- <div class=\"col-md-12 text-right\" ng-repeat=\"x in $ctrl.antennas\">\r" +
    "\n" +
    "          <input type=\"radio\" name=\"ant\" ng-value=\"x.size\" ng-model=\"$ctrl.antenna\">{{x.description}}\r" +
    "\n" +
    "        </div> --> </div> </div> <div class=\"col-md-6 form-group\"> <div class=\"col-md-12\"> <h5 style=\"color: #0aa89e\">Step 3: Choose The Mount Type That You Will Install</h5> </div> <div class=\"col-md-6 col-md-offset-3 text-left\" ng-repeat=\"x in $ctrl.mounts\"> <label class=\"checkbox-inline checkbox-styled\"> <input type=\"radio\" ng-value=\"x.code + $index\" ng-model=\"$ctrl.mount\"><span>{{ x.description }}</span> </label> </div> </div> </div> <hr> <div class=\"row text-center\"> <button type=\"button\" class=\"btn btn-danger\" ng-click=\"$ctrl.Procced();\" name=\"button\">Proceed</button> </div> <br> </div>  <div class=\"card\" style=\"margin-top:10px\" ng-show=\"$ctrl.OVT2\"> <div class=\"card-head card-head-xs style-info\"> <header>TDS/Jupiter On-Site Validation Tool (2 of 3)</header> </div> <div class=\"card-body\"> <div class=\"row\"> <div class=\"col-md-12 card\"> <div class=\"card-body\"> <table class=\"table\"> <tbody> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">SAN</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.san}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Visit Type</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.siteOrder.visitType}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">UL Atten</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.beamValues.ulAttenuation}}</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Adapter type</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.adapterType}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">FSO</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.siteOrder.fso}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">DL Atten</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.beamValues.dlAttenuation}}</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Gateway ID</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.gatewayId}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Installer Name</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.installer.name}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">UL Atten Offset</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.beamValues.ulAttenuationOffset}}</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Beam ID</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.beamId}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Installer Id</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.installer.id}}</small></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">DL Aften Offset</small></td> <td style=\"padding:0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.beamValues.dlAttenuationOffset}}</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Latitude/QLast</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.location.qlat}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Modem Temp</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.modemTemp }}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Normalized UL Es/No</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxx</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Longitude/QLng</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.location.qlng}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Reboot count</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.rebootCount }}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Normalized DL Es/No</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxx</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">UL/DL Group</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxxx</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Last Reboot Time</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.rebootTime}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Real-Time UL Es/No</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxx</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Antenna size</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.outdoorUnit.antenna.size}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Last Reboot Reason</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.rebootReason.description}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Real-Time DL Es/No</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxx</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">ODU Power</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.outdoorUnit.radio.power}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">SW Version</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.softwareVersion}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Real-Time Stats Updated Date</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxx</small></td> </tr> <tr> <td style=\"padding: 2px !important\"><b><small class=\"font-reduced\">Polarization</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.polarization}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">IDU SN</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxxx</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Real-Time Outrote Offset</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.realtimeOffsets.outrouteOffset}}</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Activation Date</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxxxx</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">ODU SN</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.odusn}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Last Processed Date</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.processedDate}}</small></td> </tr> </tbody> </table> </div> <div class=\"row\"> <button class=\"btn btn-info btn-default-bright btn-sm\" ng-click=\"$ctrl.GetCurrentStats();\">GET CURRENT STATS</button> <button class=\"btn btn-info btn-default-bright btn-sm\" ng-click=\"$ctrl.ForceRange()\">FORCE RANGE</button> <button class=\"btn btn-primary btn-default-bright btn-sm\" ng-click=\"$ctrl.ClearTerminal();\">CLEAR TERMINAL STATS</button> <button class=\"btn btn-primary btn-default-bright btn-sm\" ng-click=\"$ctrl.ReloadTables();\">RELOAD TABLES</button> <button class=\"btn btn-primary btn-default-bright btn-sm\" ng-click=\"$ctrl.ForceFallBack();\">FORCE FALLBACK</button> <button class=\"btn btn-warningbtn-default-bright btn-sm\" ng-click=\"$ctrl.Reboot();\">REBOOT</button> <button class=\"btn btn-danger btn-default-bright btn-sm\" ng-click=\"$ctrl.abrirSignOff();\">SIGN OFF</button> <table class=\"table\"> <thead> <th></th> <th>Timestamp</th> <th>Operating UL Es/No</th> <th>UL Margin</th> <th>Symbol Rate-FEC</th> <th>UL Es/No Avail</th> <th>DL Es/No</th> <th>MODCOD</th> <th>pkt loss %</th> <th>UL Devation</th> <th>DL Devation</th> </thead> <tbody> <tr> <td>Target Values</td> <td>0</td> <!-- {{$ctrl.DetailsOVT2.terminal.odusn}} --> <td>0</td> <td>0</td> <td>0</td> <td>{{$ctrl.DetailsOVT2.targetValues.ulEsNoAvail}}</td> <td>{{$ctrl.DetailsOVT2.targetValues.dlEsNo}}</td> <td>{{$ctrl.DetailsOVT2.targetValues.modcod}}</td> <td>{{$ctrl.DetailsOVT2.targetValues.pktLossPct}}</td> <td>{{$ctrl.DetailsOVT2.targetValues.ulDev}}</td> <td>{{$ctrl.DetailsOVT2.targetValues.dlDev}}</td> </tr> <tr> <td>current Values</td> <td>{{$ctrl.DetailsOVT2.currentValues.timestamp}}</td> <td>0</td> <td>0</td> <td>0</td> <td>{{$ctrl.DetailsOVT2.currentValues.ulEsNoAvail}}</td> <td>{{$ctrl.DetailsOVT2.currentValues.dlEsNo}}</td> <td>{{$ctrl.DetailsOVT2.currentValues.modcod}}</td> <td>{{$ctrl.DetailsOVT2.currentValues.pktLossPct}}</td> <td>{{$ctrl.DetailsOVT2.currentValues.ulDev}}</td> <td>{{$ctrl.DetailsOVT2.currentValues.dlDev}}</td> </tr> <tr> <td>Diference</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>{{$ctrl.DetailsOVT2.differenceValues.ulEsNoAvail}}</td> <td>{{$ctrl.DetailsOVT2.differenceValues.dlEsNo}}</td> <td>{{$ctrl.DetailsOVT2.differenceValues.modcod}}</td> <td>{{$ctrl.DetailsOVT2.differenceValues.pktLossPct}}</td> <td>{{$ctrl.DetailsOVT2.differenceValues.ulDev}}</td> <td>{{$ctrl.DetailsOVT2.differenceValues.dlDev}}</td> </tr> </tbody> </table> </div> <div class=\"row\"> Diagnosis: {{$ctrl.DetailsOVT2.diagnosis.recommendedDiagnosis.name}} <br> Recommended action: <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.RecomendedDiag\"> <button class=\"btn btn-success btn-xs\" ng-click=\"$ctrl.CompleteAction();\">Completed action</button> </div> </div> <div class=\"col-md-12 card\" ui-if=\"$ctrl.showmapa\"> <ng-map zoom=\"9\" style=\"height:100%; width:100%\"> <marker icon=\"{{$ctrl.customIcon}}\" position=\"{{$ctrl.points.latitude}}, {{$ctrl.points.longitude}}\"></marker> </ng-map> </div> </div> </div> </div>"
  );


  $templateCache.put('views/provision/ModalBusquedaSuscriptor.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Suscriptores</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#suscriptor\" data-target=\"#suscriptor-1\" aria-expanded=\"false\"> <header>Buscar Suscriptor</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"suscriptor-1\" class=\"collapse buscarSuscriptor\" aria-expanded=\"false\" style=\"height: 0px\"> <div class=\"panel-body\"> <div class=\"row\"> <div class=\"col-md-2\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"text\" placeholder=\"Suscriptor\" class=\"form-control\" ng-change=\"ctrl.cambiarBusqueda(1)\" ng-model=\"ctrl.bsan\"> </div> </div> <div class=\"col-md-4\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"text\" placeholder=\"Nombre\" class=\"form-control\" ng-change=\"ctrl.cambiarBusqueda(2)\" ng-model=\"ctrl.bnombre\"> </div> </div> <div class=\"col-md-6\"> <p class=\"text-right\"> <button type=\"button\" class=\"btn btn-raised btn-primary btn-sm\" ng-click=\"ctrl.buscar()\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i> Buscar</button> </p> </div> </div> </div> <!-- panel body --> </div> </div> <!--end .panel --> </div> </div> </div> <table class=\"table\"> <thead> <tr> <th>Suscriptor</th> <th>Nombre</th> <th>Correo</th> <th>Telefono</th> <th>Ciudad</th> <th>Opciones</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in ctrl.suscriptores|itemsPerPage:8\"> <td>{{x.IdSuscriptor}}</td> <td>{{x.Nombre}} {{x.Apellido}}</td> <td>{{x.Email}} </td> <td>{{x.Telefono}}</td> <td>{{x.Ciudad}}</td> <td> <button class=\"btn btn-xs btn-info\" ng-click=\"ctrl.SeleccionarSusc(x)\"> <i class=\"fa fa-search\" aria-hidden=\"true\"></i> </button> </td> </tr> </tbody> </table> <div> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">cerrar</button> </div>"
  );


  $templateCache.put('views/provision/ModalDetalleSuscriptor.html',
    "<style type=\"text/css\">.scrollDiv{\r" +
    "\n" +
    "\t    height: 250px;\r" +
    "\n" +
    "\t    overflow: auto;\r" +
    "\n" +
    "\t    overflow-x: hidden;\r" +
    "\n" +
    "\t}</style> <div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"$ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Detalle de suscriptor #{{$ctrl.suscriptor.IdSuscriptor}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row form-group\"> <div class=\"col-md-12\"> <div class=\"col-md-6\"> <h5><strong>Nombre: </strong>{{$ctrl.suscriptor.Nombre}}</h5> <h5><strong>Apellidos: </strong>{{$ctrl.suscriptor.Apellido}}</h5> <h5><strong>Teléfono: </strong>{{$ctrl.suscriptor.Telefono}}</h5> <h5><strong>Email: </strong>{{$ctrl.suscriptor.Email}}</h5> <h5><strong>Referencia: </strong>{{$ctrl.suscriptor.Referencia}}</h5> </div> <div class=\"col-md-6\"> <h5><strong>Ciudad: </strong>{{$ctrl.suscriptor.Ciudad}}</h5> <h5><strong>Colonia: </strong>{{$ctrl.suscriptor.Colonia}}</h5> <h5><strong>Calle: </strong>{{$ctrl.suscriptor.Calle}}</h5> <h5><strong>Número: </strong>{{$ctrl.suscriptor.Numero}}</h5> <h5><strong>CP: </strong>{{$ctrl.suscriptor.CP}}</h5> </div> </div> <div class=\"col-md-12\"> <hr> <h4 class=\"text-center\">Terminales</h4> <div class=\"col-md-12 scrollDiv\"> <table class=\"table\"> <thead> <tr> <th>SAN</th> <th>ESN</th> <th>Estado</th> <th>Servicio</th> </tr> </thead> <tbody> <tr ng-repeat=\"x in $ctrl.terminales\"> <td>{{ x.SAN }}</td> <td>{{ x.ESN }}</td> <td>{{ x.Estatus }}</td> <td>{{ x.Servicio }}</td> </tr> </tbody> </table> </div> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"$ctrl.cancel()\">Cancelar</button> </div>"
  );


  $templateCache.put('views/provision/ModalGestionTerminal.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Gestión Terminal #{{ctrl.Terminal.SAN}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Suscriptor:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Suscriptor}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Servicio:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Servicio}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Referencia:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Referencia}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">ESN:</b><br> <p style=\"font-size:14px\">{{ctrl.Terminal.ESN}}</p> </div> </div> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Fecha Alta:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.FechaAlta}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Fecha Baja:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.FechaSuspension}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Latitud:</b><br> <p style=\"font-size:14px\">{{ctrl.Terminal.Latitud}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Longitud:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Longitud}}</p> </div> </div> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Status:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Estatus}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Fap Status:</b> <p style=\"font-size:14px\">{{ctrl.FapStatus}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">SatelliteID:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.SatellitedID}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">BeamID:</b><br> <p style=\"font-size:14px\">{{ctrl.Terminal.BeamID}}</p> </div> </div> <div class=\"col-md-12\"> <b style=\"font-size:14px\">Comentarios:</b><br> <textarea ng-model=\"ctrl.Terminal.Comentarios\" disabled class=\"form-control input-sm\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "   </textarea> <!--  <div class=\"col-md-4\">\r" +
    "\n" +
    "      <b style=\"font-size:14px;\">Polarization:</b><br>\r" +
    "\n" +
    "      <p style=\"font-size:14px;\">{{ctrl.Terminal.Polarization}}</p>\r" +
    "\n" +
    "    </div>--> </div> <div class=\"col-md-12\"> <div class=\"text-center\"> <h5><b>Consumo de Terminal (MB)</b></h5> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Disponible:</b><br> <p style=\"font-size:14px\">{{ctrl.Consumo.Disponible}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Consumo:</b><br> <p style=\"font-size:14px\">{{ctrl.Consumo.Consumido}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Día de relleno:</b><br> <p style=\"font-size:14px\">{{ctrl.Consumo.DiaRelleno}}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Token disponible:</b><br> <p style=\"font-size:14px\">{{ctrl.Token}}</p> </div> </div> </div> <hr> <div class=\"row form-group text-center\"> <h5><b>Transacciones</b></h5> <div class=\"col-md-4\" style=\"padding-left: 25px\"> <b>Comando</b> <br> <select ng-model=\"ctrl.Comando\" class=\"form-control\" name=\"comando\" ng-options=\"item.Nombre for item in ctrl.Comandos track by item.IdComando\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">Selecciona un comando</option> </select> </div> <div class=\"col-md-4\" ng-if=\"ctrl.Comando.IdComando == 5\"> <b>Cantidad (GB)</b> <input type=\"text\" name=\"cantidadToken\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"ctrl.cantidadToken\" required-message=\"'Error!, Este campo es obligatorio.'\" required> </div> <div class=\"col-md-4\" ng-if=\"ctrl.Comando.IdComando == 6\"> <b>Servicio</b> <br> <select ng-model=\"ctrl.Servicio\" class=\"form-control\" name=\"comando\" ng-options=\"item.Nombre for item in ctrl.Servicios track by item.IdServicio\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">Selecciona un servicio</option> </select> </div> <div class=\"col-md-2\"> <br> <button class=\"btn pull-right btn-raised btn-success\" type=\"button\" ng-click=\"ctrl.aplicaComando()\">Aplicar</button> </div> <div class=\"row\"> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/provision/ModalGetLatLong.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Selecciona Latitud y longuitud</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div> <ng-map center=\"23.96617587126503, -101.953125\" zoom=\"4\" on-click=\"ctrl.getpos($event)\"> <marker position=\"{{ctrl.latlng}}\" title=\"Selecciona tu posición\" on-dragend=\"ctrl.getpos($event)\" animation=\"Animation.BOUNCE\" animation=\"DROP\" draggable=\"true\"></marker> </ng-map> {{ctrl.latlng}} </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cancelar</button> <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ctrl.ok()\">Asignar</button> </div>"
  );


  $templateCache.put('views/provision/ModalHistoricosTerminales.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Históricos de Terminal #{{ctrl.Terminal.SAN}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row form-group\"> <div class=\"col-md-12\"> <canvas id=\"canvas\" width=\"770\" height=\"385\" style=\"display: block; width: 770px; height: 385px\"></canvas> </div> </div> <div class=\"row form-group text-center\"> <h5><b>Gráfica de Consumo de Terminal por Fechas</b></h5> <div class=\"col-md-4\"> <b>Fecha Inicio</b><br> <input type=\"datetime-local\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"ctrl.FechaInicio\"> </div> <!--<div class=\"col-md-2\">\r" +
    "\n" +
    "      <b>Hora Inicio</b><br>\r" +
    "\n" +
    "      <input type=\"time\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"hora\" required-message=\"'Este campo es obligatorio.'\"\r" +
    "\n" +
    "        required validate-on=\"dirty\" ng-model=\"ctrl.HoraInicio\">\r" +
    "\n" +
    "    </div>--> <div class=\"col-md-4\"> <b>Fecha Fin</b><br> <input type=\"datetime-local\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"ctrl.FechaFin\"> </div> <!--<div class=\"col-md-2\">\r" +
    "\n" +
    "      <b>Hora Fin</b><br>\r" +
    "\n" +
    "      <input type=\"time\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"hora\" required-message=\"'Este campo es obligatorio.'\"\r" +
    "\n" +
    "        required validate-on=\"dirty\" ng-model=\"ctrl.HoraFin\">\r" +
    "\n" +
    "    </div>--> <div class=\"col-md-2\"> <button class=\"btn pull-right btn-raised btn-success\" type=\"button\" ng-click=\"ctrl.graficar()\">Graficar</button> </div> </div> <div class=\"row form-group\"> <div class=\"col-md-12\"> <canvas id=\"chartjs-0\" class=\"chartjs\" width=\"770\" height=\"385\" style=\"display: block; width: 770px; height: 385px\"></canvas> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/provision/MovimientosTerminales.html',
    "<style type=\"text/css\">.scrollDiv{\r" +
    "\n" +
    "\t    height: 250px;\r" +
    "\n" +
    "\t    overflow: auto;\r" +
    "\n" +
    "\t    overflow-x: hidden;\r" +
    "\n" +
    "\t}</style> <div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Movimientos De Terminal #{{ctrl.Terminal.SAN}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row\"> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Suscriptor:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Suscriptor}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Servicio:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Servicio}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Fecha Alta:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.FechaAlta}}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Fecha Baja:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.FechaSuspension}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Latitud:</b><br> <p style=\"font-size:14px\">{{ctrl.Terminal.Latitud}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Longitud:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Longitud}}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Status:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Estatus}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">ESN:</b><br> <p style=\"font-size:14px\">{{ctrl.Terminal.ESN}}</p> </div> </div> <div class=\"row\"> <h3 class=\"text-center\">Movimientos</h3> <div class=\"col-md-12 scrollDiv\"> <table class=\"table\"> <thead> <tr> <th>ID</th> <th>Comando</th> <th>Origen</th> <th>Fecha</th> <th>Acciones</th> </tr> </thead> <tbody> <tr ng-repeat=\"x in ctrl.movimientos\"> <td>{{ x.IdMovimiento }}</td> <td>{{ x.Comando }}</td> <td>{{ x.Origen }}</td> <td>{{ x.Fecha }}</td> <td><button class=\"btn btn-xs btn-warning\" ng-click=\"ctrl.detalleMovimiento(x)\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i></button></td> </tr> </tbody> </table> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/provision/NuevaTerminal.html',
    "<form angular-validator-submit=\"$ctrl.GuardaTerminal()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">{{$ctrl.titulo}}</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Provisión</a></small> </header> <div class=\"tools\"> <button class=\"btn btn-raised btn-success btn-sm\" type=\"submit\">Guardar </button> <button class=\"btn btn-raised btn-default btn-sm\" ui-sref=\"home.provision.terminales\">Cancelar</button> </div> </div> <div class=\"card-body\"> <div class=\"col-md-12\"> <div class=\"panel form-element-padding\"> <div class=\"panel-body\"> <div class=\"col-md-8\"> <div class=\"row form-group\"> <div class=\"col-md-10\"> <b>Suscriptor</b> <input type=\"text\" class=\"form-control input-sm\" disabled name=\"sucriptor\" ng-model=\"$ctrl.NombreSuscriptor\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> </div> <div class=\"col-md-2 text-left\"> <br> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.BuscaSuscriptor()\"><i class=\"fa fa-search\"></i> Buscar</a> </div> </div> <div class=\"row\"> <br> <div class=\"col-md-4\"> <b>Latitud</b> <input type=\"text\" class=\"form-control\" name=\"latitus\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" placeholder=\"Ejemplo: -12.256555\" ng-model=\"$ctrl.Latitud\"> </div> <div class=\"col-md-4\"> <b>Longuitud</b><br> <input type=\"text\" name=\"longitud\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" class=\"form-control\" placeholder=\"Ejemplo: 2.2888555\" ng-model=\"$ctrl.Longuitud\"> </div> <div class=\"col-md-1\" style=\"margin-top:20px\"> <a class=\"btn btn-warning btn-sm\" ng-click=\"$ctrl.BuscaLatLong()\"><i class=\"fa fa-globe\"></i></a> </div> <div class=\"col-md-6\"> <br> <b>Servicio</b> <br> <select ng-model=\"$ctrl.Servicio\" class=\"form-control\" name=\"servicio\" ng-options=\"item as item.Nombre for item in $ctrl.Servicios track by item.IdServicio\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">selecciona</option> </select> </div> </div> <div class=\"row\"> <br> <div class=\"col-md-4\" style=\"margin-top:10px\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.ValidarServicio()\"><i class=\"fa fa-check-square\"></i> Validar Cobertura</a> </div> <div class=\"col-md-2\"> <b>Beam</b><br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"Beam\" name=\"beam\" ng-model=\"$ctrl.BeamID\" ng-disabled=\"true\"> </div> <div class=\"col-md-4\"> <b>Satellite</b><br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"Satellite\" name=\"satellite\" ng-model=\"$ctrl.SatelliteID\" ng-disabled=\"true\"> </div> </div> <div class=\"row form-group\"> <br> <div class=\"col-md-5\"> <b>Status</b><br> <select type=\"text\" validate-on=\"dirty\" name=\"status\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-options=\"item as item.Nombre for item in $ctrl.ListaStatus track by item.clave\" class=\"form-control\" ng-model=\"$ctrl.Status\" ng-init=\"$ctrl.Status.clave='Pendiente'\" ng-disabled=\"true\"> </select> </div> <div class=\"col-md-5\"> <b>Fecha de alta</b><br> <input type=\"date\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"$ctrl.FechaAlta\"> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Fecha de suspensión</b><br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"fecha suspension\" ng-model=\"$ctrl.FechaSuspencion\" ng-disabled=\"true\"> </div> <div class=\"col-md-5\"> <b>Fecha de cancelación</b><br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"fecha cancelación\" ng-model=\"$ctrl.FechaCancelacion\" ng-disabled=\"true\"> </div> </div> <div class=\"row\"> <div class=\"col-md-10\"> <b>Comentarios</b><br> <textarea class=\"form-control input-sm\" ng-model=\"$ctrl.Comentarios\" placeholder=\"Captura las observaciones \"></textarea> </div> </div> </div> </div> </div> </div> </div> </div> </form>"
  );


  $templateCache.put('views/provision/Terminales.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Terminales</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Provisión</a></small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button type=\"button\" class=\"btn pull-right btn-sm btn-raised btn-success\" ng-if=\"$ctrl.idSuscriptor == 0\" permission permission-only=\"'terminalesAdd'\" ui-sref=\"home.provision.terminalesNueva\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> <button type=\"button\" class=\"btn pull-right btn-sm btn-raised btn-success\" ng-if=\"$ctrl.idSuscriptor != 0\" permission permission-only=\"'terminalesAdd'\" ui-sref=\"home.provision.terminalesNueva({idSuscriptor:$ctrl.idSuscriptor})\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> </div> </div> </div> <div class=\"card-body\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#suscriptor\" data-target=\"#suscriptor-1\" aria-expanded=\"false\"> <header>Buscar</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"suscriptor-1\" class=\"collapse buscarSuscriptor\" aria-expanded=\"false\" style=\"height: 0px\"> <div class=\"panel-body\"> <uib-tabset active=\"active\"> <uib-tab index=\"0\" heading=\"Suscriptor\"> <div class=\"row\" style=\"padding: 10px\"> <div class=\"col-md-2\"> <input type=\"text\" class=\"form-control input-sm\" ng-model=\"$ctrl.bsan\" placeholder=\"SAN\" ng-change=\"$ctrl.busquedaCambio(1)\"> </div> <div class=\"col-md-2\"> <input type=\"text\" class=\"form-control input-sm\" ng-model=\"$ctrl.bsus\" placeholder=\"Nombre de suscriptor\" ng-change=\"$ctrl.busquedaCambio(2)\"> </div> <div class=\"col-md-2\"> <input type=\"text\" class=\"form-control input-sm\" ng-model=\"$ctrl.esn\" placeholder=\"ESN\" ng-change=\"$ctrl.busquedaCambio(6)\"> </div> <div class=\"col-md-2\"> <select type=\"text\" ng-change=\"$ctrl.busquedaCambio(4)\" ng-options=\"item as item.Nombre for item in $ctrl.ListaStatus track by item.clave\" class=\"form-control input-sm\" ng-model=\"$ctrl.Status\" ng-init=\"$ctrl.Status.clave='Pendiente'\"> </select> </div> <div class=\"col-md-2\"> <input type=\"text\" class=\"form-control input-sm\" ng-model=\"$ctrl.BReferencia\" placeholder=\"Referencia\" ng-change=\"$ctrl.busquedaCambio(8)\">  </div> <div class=\"col-md-2\"> <button type=\"button\" class=\"btn btn-raised btn-sm btn-primary\" ng-click=\"$ctrl.buscar()\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i> Buscar</button> </div> </div> </uib-tab> <uib-tab index=\"1\" heading=\"Servicio\"> <div class=\"row\" style=\"padding: 10px\"> <div class=\"col-md-4\"> <label class=\"text-muted\">Beam</label> <select class=\"form-control input-sm\" ng-model=\"$ctrl.beam\" ng-change=\"$ctrl.busquedaCambio(5)\" ng-options=\"v.Name for v in $ctrl.Beams track by v.BeamId \"> <option value=\"\">Selecciona</option> </select> </div> <div class=\"col-md-3\"> <label class=\"text-muted\">Servicios</label> <select class=\"form-control input-sm\" ng-model=\"$ctrl.bservicio\" ng-change=\"$ctrl.busquedaCambio(3)\" ng-options=\"v.Nombre for v in $ctrl.servicios track by v.IdServicio\"> </select> </div> <div class=\"col-md-3\"> <label class=\"text-muted\">Satélite</label> <select class=\"form-control input-sm\" ng-model=\"$ctrl.bsatelite\" ng-change=\"$ctrl.busquedaCambio(7)\"> <option value=\"\" disabled>Selecciona</option> <option value=\"65w\">65w</option> <option value=\"EchoStar 19\">EchoStar 19</option> </select> </div> <div class=\"col-md-2\"> <br> <button type=\"button\" class=\"btn btn-raised btn-sm btn-primary\" ng-click=\"$ctrl.buscar()\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i> Buscar</button> </div> </div> </uib-tab> </uib-tabset> </div> <!-- panel body --> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\"> <table class=\"table\"> <thead> <tr> <th>San</th> <th>Suscriptor</th> <th>ESN</th> <th>Servicio</th> <th>Referencia</th> <th>Estatus</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.terminales|itemsPerPage:7\"> <td>{{ x.SAN }}</td> <td>{{ x.Suscriptor }}</td> <td>{{ x.ESN }}</td> <td>{{x.Servicio}}</td> <td>{{x.Referencia}}</td> <td>{{x.Estatus}}</td> <td> <a ng-click=\"$ctrl.GestionTerminal(x)\" class=\"btn btn-xs btn-default\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Gestionar Terminal\"><i class=\"fa fa-laptop\" aria-hidden=\"true\"></i></a> <a ng-click=\"$ctrl.verMovimientos(x)\" class=\"btn btn-xs btn-default\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Movimientos\"><i class=\"fa fa-exchange\" aria-hidden=\"true\"></i></a> <!-- <a ng-click=\"$ctrl.EditarTerminal(x)\" permission permission-only=\"'terminalesUpdate'\" class=\"btn  btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar Terminal\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a> --> <a ng-click=\"$ctrl.verHistoricos(x)\" class=\"btn btn-xs btn-default\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Históricos\"><i class=\"fa fa-tachometer\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <div style=\"padding-left: 20px\" ng-show=\"true\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div>"
  );


  $templateCache.put('views/provision/activacion.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Activación de Terminales</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Provisión>Activación</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> </div> </div> </div> <div class=\"section-body\"> <form angular-validator-submit=\"$ctrl.activarTerminal()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"panel form-element-padding\"> <div class=\"panel-body\"> <div class=\"row\"> <div class=\"col-md-4\"> <b>SAN</b><br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"SAN\" name=\"san\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" ng-model=\"$ctrl.SAN\"> </div> <div class=\"col-md-2\" style=\"margin-top:20px\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.validarSAN()\"><i class=\"fa fa-search\"></i> Validar SAN</a> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <b>PIN</b><br> <input type=\"text\" ng-disabled=\"true\" class=\"form-control input-sm\" placeholder=\"PIN\" name=\"pin\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" ng-model=\"$ctrl.PIN\"> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <b>ESN</b><br> <input type=\"text\" class=\"form-control input-sm\" ng-disabled=\"$ctrl.bockEsn\" placeholder=\"ESN\" name=\"esn\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" ng-model=\"$ctrl.ESN\"> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-left\"> <br> <button class=\"btn btn-raised btn-success btn-sm\" type=\"submit\">Activar</button> </div> </div> </div> </div> </form> </div> </div>"
  );


  $templateCache.put('views/provision/detalleMovimiento.html',
    "<style type=\"text/css\">.scrollDiv {\r" +
    "\n" +
    "    height: 250px;\r" +
    "\n" +
    "    overflow: auto;\r" +
    "\n" +
    "    overflow-x: hidden;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  td.fecha {\r" +
    "\n" +
    "    width: 150px;\r" +
    "\n" +
    "  }</style> <div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Movimiento #{{ ctrl.movimiento.IdMovimiento }}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row\"> <div class=\"col-md-12\"> <p ng-if=\"ctrl.movimiento.IdComando != 5 && ctrl.movimiento.IdComando != 6\"><b>Comando: </b>{{ ctrl.movimiento.Comando }}</p> <p ng-if=\"ctrl.movimiento.IdComando == 5\"><b>Comando: </b>{{ ctrl.movimiento.Comando }} - {{ ctrl.movimiento.Detalle1 }}</p> <p ng-if=\"ctrl.movimiento.IdComando == 6\"><b>Comando: </b>{{ ctrl.movimiento.Comando }} {{ ctrl.movimiento.Detalle1 }} - {{ ctrl.movimiento.Detalle2 }}</p> <p><b>Fecha: </b>{{ ctrl.movimiento.Fecha }}</p> <p><b>Origen: </b>{{ ctrl.movimiento.Origen }}</p> <p><b>Mensaje: </b>{{ ctrl.movimiento.Mensaje }}</p> <p><b>Usuario: </b>{{ ctrl.movimiento.Usuario }}</p> </div> <div class=\"col-md-12 scrollDiv\"> <table class=\"table\"> <thead> <tr> <td class=\"text-center fecha\">Fecha</td> <td class=\"text-center fecha\">Hora</td> <td class=\"text-center\">Detalle</td> </tr> </thead> <tbody> <tr ng-if=\"ctrl.detalles.length == 0\"> <td colspan=\"2\" class=\"text-center\">Movimiento sin detalles</td> </tr> <tr ng-repeat=\"x in ctrl.detalles\" ng-if=\"ctrl.detalles.length > 0\"> <td class=\"text-center fecha\">{{ x.Fecha }}</td> <td class=\"text-center fecha\">{{ x.Hora }}</td> <td>{{ x.Mensaje }}</td> </tr> </tbody> </table> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/provision/editarSuscriptor.html',
    "<form angular-validator-submit=\"$ctrl.guardar()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Editar Suscriptor</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Provisión>Editar Suscriptor</small> </header> <div class=\"tools\"> <button class=\"btn btn-raised btn-default btn-sm\" type=\"button\" ui-sref=\"home.provision.suscriptores\">Cancelar</button> <button class=\"btn btn-raised btn-success btn-sm\" type=\"submit\">Guardar </button> </div> </div> <div class=\"section-body\"> <div class=\"panel form-element-padding\"> <div class=\"panel-body\" style=\"padding-bottom:30px\"> <div class=\"row\"> <div class=\"col-md-6\"> <div class=\"row\"> <div class=\"col-md-10\"> <b>Nombre</b> <input type=\"text\" name=\"nombre\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Nombre\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-10\"> <b>Apellidos</b> <input type=\"text\" class=\"form-control\" name=\"apellidos\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Apellido\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Teléfono</b> <input type=\"text\" ui-mask=\"(999) 999-9999\" minlength=\"10\" name=\"telefono\" validate-on=\"dirty\" invalid-message=\"'Formato de teléfono no valido.'\" ui-mask-placeholder ui-mask-placeholder-char=\"_\" ng-model=\"$ctrl.suscriptor.Telefono\" class=\"form-control mask-phone_us\"> </div> <div class=\"col-md-5\"> <b>Email</b> <input type=\"email\" ng-model=\"$ctrl.suscriptor.Email\" validate-on=\"dirty\" name=\"email\" invalid-message=\"'Formato de correo no valido.'\" class=\"form-control\"> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Referencia</b> <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Referencia\"> </div> </div> </div> <div class=\"col-md-6\"> <div class=\"row\"> <div class=\"col-md-8\"> <b>Estado</b> <select validate-on=\"dirty\" name=\"estado\" class=\"form-control\" ng-model=\"$ctrl.estado\" ng-options=\"v.Nombre for v in $ctrl.estados track by v.IdEstado\" required-message=\"'Este campo es obligatorio.'\" required> </select></div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Ciudad</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"ciudad\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Ciudad\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Colonia</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"colonia\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Colonia\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Calle</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"calle\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Calle\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Número</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" class=\"form-control\" name=\"numero\" ng-model=\"$ctrl.suscriptor.Numero\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>CP</b> <input type=\"text\" ng-model=\"$ctrl.suscriptor.CP\" validate-on=\"dirty\" name=\"cp\" required-message=\"'Este campo es obligatorio.'\" class=\"form-control\" required> </div> </div> </div> </div> </div> </div> </div> </div> </form>"
  );


  $templateCache.put('views/provision/editarTerminal.html',
    "<div class=\"panel\" style=\"height:100px\"> <div class=\"panel-body\" style=\"margin-top:-20px\"> <div class=\"col-md-6 col-sm-12\"> <h3 class=\"animated fadeInLeft\">Editar Terminal</h3> <p class=\"animated fadeInDown\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Provisión>Terminales</p> </div> </div> </div> <div class=\"col-md-12\"> <form angular-validator-submit=\"$ctrl.GuardaTerminal()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"panel form-element-padding\"> <div class=\"panel-heading\"> <p class=\"text-right\"> <button class=\"btn btn-raised btn-default btn-sm\" ui-sref=\"home.provision.terminales\">Cancelar</button> <button class=\"btn btn-raised btn-success btn-sm\" type=\"submit\">Guardar </button> </p> <div class=\"tools\" style=\"margin-top:-30px\"> <p class=\"text-left\">Editar Terminal </p> </div> </div> <div class=\"panel-body\"> <div class=\"col-md-8\"> <div class=\"row form-group\"> <div class=\"col-md-6\"> <b>Suscriptor</b> <input type=\"text\" class=\"form-control\" disabled name=\"sucriptor\" ng-model=\"$ctrl.NombreSuscriptor\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> </div> <div class=\"col-md-6 text-left\"> <br> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.BuscaSuscriptor()\"><i class=\"fa fa-search\"></i> Buscar</a> </div> </div> <div class=\"row\"> <div class=\"col-md-6\"> <b>Servicio</b> <br> <select ng-model=\"$ctrl.Servicio\" class=\"form-control\" name=\"servicio\" ng-options=\"item as item.Nombre for item in $ctrl.Servicios track by item.IdServicio\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> </select> </div> <div class=\"col-md-6\"> <b>ESN</b><br> <input type=\"text\" class=\"form-control\" placeholder=\"ESN\" name=\"esn\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" ng-model=\"$ctrl.ESN\"> </div> </div> <div class=\"row\"> <br> <div class=\"col-md-5\"> <b>Latitud</b> <input type=\"text\" class=\"form-control\" name=\"latitus\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" placeholder=\"Latitud\" ng-model=\"$ctrl.Latitud\"> </div> <div class=\"col-md-5\"> <b>Longuitud</b><br> <input type=\"text\" name=\"longitud\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" class=\"form-control\" placeholder=\"Longuitud\" ng-model=\"$ctrl.Longuitud\"> </div> <div class=\"col-md-2\" style=\"margin-top:20px\"> <a class=\"btn btn-warning btn-sm\" ng-click=\"$ctrl.BuscaLatLong()\"><i class=\"fa fa-globe\"></i></a> </div> </div> <div class=\"row form-group\"> <div class=\"col-md-6\"> <b>Status</b><br> <select type=\"text\" validate-on=\"dirty\" name=\"status\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-options=\"item as item.Nombre for item in $ctrl.ListaStatus track by item.clave\" class=\"form-control\" ng-model=\"$ctrl.Status\"> <option value=\"\">selecciona</option> </select> </div> <div class=\"col-md-6\"> <b>Fecha de alta</b><br> <input type=\"date\" class=\"form-control\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"$ctrl.FechaAlta\"> </div> </div> <div class=\"row\"> <div class=\"col-md-6\"> <b>Fecha de suspensión</b><br> <input type=\"text\" class=\"form-control\" placeholder=\"fecha suspension\" ng-model=\"$ctrl.FechaSuspencion\" ng-disabled=\"true\"> </div> <div class=\"col-md-6\"> <b>Fecha de cancelación</b><br> <input type=\"text\" class=\"form-control\" placeholder=\"fecha cancelación\" ng-model=\"$ctrl.FechaCancelacion\" ng-disabled=\"true\"> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <b>Comentarios</b><br> <textarea class=\"form-control\" ng-model=\"$ctrl.Comentarios\"></textarea> </div> </div> </div> </div> </div> </form> </div>"
  );


  $templateCache.put('views/provision/nuevoSuscriptor.html',
    "<form angular-validator-submit=\"$ctrl.guardar()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Nuevo Suscriptor</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Provisión>Nuevo Suscriptor</small> </header> <div class=\"tools\"> <button class=\"btn btn-raised btn-default btn-sm\" type=\"button\" ui-sref=\"home.provision.suscriptores\">Cancelar</button> <button class=\"btn btn-raised btn-success btn-sm\" type=\"submit\">Guardar </button> </div> </div> <div class=\"section-body\"> <div class=\"panel form-element-padding\"> <div class=\"panel-body\" style=\"padding-bottom:30px\"> <div class=\"row\"> <div class=\"col-md-6\"> <div class=\"row\"> <div class=\"col-md-10\"> <b>Nombre</b> <input type=\"text\" name=\"nombre\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.nombre\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-10\"> <b>Apellidos</b> <input type=\"text\" class=\"form-control\" name=\"apellidos\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.apellidos\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Teléfono</b> <input type=\"text\" ui-mask=\"(999) 999-9999\" minlength=\"10\" name=\"telefono\" validate-on=\"dirty\" invalid-message=\"'Formato de teléfono no valido.'\" ui-mask-placeholder ui-mask-placeholder-char=\"_\" ng-model=\"$ctrl.telefono\" class=\"form-control\"> </div> <div class=\"col-md-5\"> <b>Email</b> <input type=\"email\" ng-model=\"$ctrl.email\" validate-on=\"dirty\" name=\"email\" invalid-message=\"'Formato de correo no valido.'\" class=\"form-control\"> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Referencia</b> <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.referencia\"> </div> </div> </div> <div class=\"col-md-6\"> <div class=\"row\"> <div class=\"col-md-8\"> <b>Estado</b> <select validate-on=\"dirty\" name=\"estado\" class=\"form-control\" ng-model=\"$ctrl.estado\" ng-options=\"v.Nombre for v in $ctrl.estados track by v.IdEstado\" required-message=\"'Este campo es obligatorio.'\" required></select> </div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Ciudad</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"ciudad\" class=\"form-control\" ng-model=\"$ctrl.ciudad\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Colonia</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"colonia\" class=\"form-control\" ng-model=\"$ctrl.colonia\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Calle</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"calle\" class=\"form-control\" ng-model=\"$ctrl.calle\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Número</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" class=\"form-control\" name=\"numero\" ng-model=\"$ctrl.numero\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>CP</b> <input type=\"text\" ng-model=\"$ctrl.cp\" validate-on=\"dirty\" name=\"cp\" required-message=\"'Este campo es obligatorio.'\" class=\"form-control\" required> </div> </div> </div> </div> </div> </div> </div> </div> </form>"
  );


  $templateCache.put('views/provision/suscriptores.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Suscriptores</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Provisión>Suscriptores</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" permission permission-only=\"'suscriptoresAdd'\" ui-sref=\"home.provision.suscriptoresNuevo\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> </div> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#suscriptor\" data-target=\"#suscriptor-1\" aria-expanded=\"false\"> <header>Buscar</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"suscriptor-1\" class=\"collapse buscarSuscriptor\" aria-expanded=\"false\" style=\"height: 0px\"> <div class=\"panel-body\"> <uib-tabset active=\"active\"> <uib-tab index=\"0\" heading=\"Suscriptor\" ng-click=\"$ctrl.buscar()\"> <br><br> <div class=\"row\"> <div class=\"col-md-2\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"number\" placeholder=\"Suscriptor\" class=\"form-control input-sm\" ng-change=\"$ctrl.cambiarBusqueda(1)\" ng-model=\"$ctrl.bsan\"> </div> </div> <div class=\"col-md-3\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"text\" placeholder=\"Nombre\" class=\"form-control input-sm\" ng-change=\"$ctrl.cambiarBusqueda(2)\" ng-model=\"$ctrl.bnombre\"> </div> </div> <div class=\"col-md-3\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"text\" placeholder=\"Apellidos\" class=\"form-control input-sm\" ng-change=\"$ctrl.cambiarBusqueda(2)\" ng-model=\"$ctrl.bApellidos\"> </div> </div> <div class=\"col-md-3\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"text\" placeholder=\"Referencia\" class=\"form-control input-sm\" ng-change=\"$ctrl.cambiarBusqueda(3)\" ng-model=\"$ctrl.brefe\"> </div> </div> <div class=\"col-md-1\"> <p class=\"text-right\"> <button type=\"button\" class=\"btn btn-raised btn-primary btn-sm\" ng-click=\"$ctrl.buscar()\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i> Buscar</button> </p> </div> </div> </uib-tab> <uib-tab index=\"1\" heading=\"Domicilio\" ng-click=\"$ctrl.buscar()\"> <br><br> <div class=\"row\"> <div class=\"col-md-3\"> <input type=\"text\" placeholder=\"Calle\" ng-change=\"$ctrl.cambiarBusqueda(3)\" ng-model=\"$ctrl.Calle\" class=\"form-control input-sm\"> </div> <div class=\"col-md-1\"> <input type=\"text\" placeholder=\"Numero\" ng-change=\"$ctrl.cambiarBusqueda(3)\" ng-model=\"$ctrl.Numero\" class=\"form-control input-sm\"> </div> <div class=\"col-md-3\"> <input type=\"text\" placeholder=\"Colonia\" ng-change=\"$ctrl.cambiarBusqueda(3)\" ng-model=\"$ctrl.Colonia\" class=\"form-control input-sm\"> </div> <div class=\"col-md-3\"> <input type=\"text\" ng-model=\"$ctrl.Ciudad\" ng-change=\"$ctrl.cambiarBusqueda(3)\" placeholder=\"Ciudad\" class=\"form-control input-sm\"> </div> <div class=\"col-md-2\"> <button class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.buscar()\"><i class=\"fa fa-search\"></i> Buscar</button> </div> </div> </uib-tab> </uib-tabset> </div> <!-- panel body --> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table class=\"table\"> <thead> <tr> <th>Suscriptor</th> <th>Nombre</th> <th>Referencia</th> <th>Correo</th> <th>Calle y num.</th> <th>Ciudad</th> <th>Opciones</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.suscriptores|itemsPerPage:8\"> <td>{{ x.IdSuscriptor }}</td> <td>{{ x.Nombre }} {{ x.Apellido }}</td> <td>{{ x.Referencia }}</td> <td>{{ x.Email }} </td> <td>{{ x.Calle }} #{{x.Numero}}</td> <td>{{ x.Ciudad }}</td> <td> <button class=\"btn btn-xs btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Detalle de suscriptor\" ng-click=\"$ctrl.DetalleSuscriptor(x);\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></button> <button class=\"btn btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar suscriptor\" permission permission-only=\"'suscriptoresUpdate'\" ui-sref=\"home.provision.suscriptoresEditar({id:x.IdSuscriptor})\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button> <a class=\"btn i btn-xs btn-default\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Terminales\" ui-sref=\"home.provision.terminales({idSuscriptor: x.IdSuscriptor })\"><i class=\"fa fa-laptop\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div>"
  );


  $templateCache.put('views/provision/terminalesSuscriptor.html',
    "<style type=\"text/css\">.scrollDiv{\r" +
    "\n" +
    "\t    height: 300px;\r" +
    "\n" +
    "\t    overflow: auto;\r" +
    "\n" +
    "\t    overflow-x: hidden;\r" +
    "\n" +
    "\t}</style> <div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"$ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Terminales Ligadas</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row form-group\"> <div class=\"col-md-12\"> <h5><strong>Suscriptor: </strong>{{$ctrl.suscriptor.Nombre}} {{$ctrl.suscriptor.Apellido}}</h5> <h5><strong>San: </strong>{{$ctrl.suscriptor.IdSuscriptor}}</h5> <hr> </div> <div class=\"col-md-12 scrollDiv\"> <table class=\"table\"> <thead> <tr> <th>SAN</th> <th>ESN</th> <th>Estado</th> <th>Servicio</th> </tr> </thead> <tbody> <tr ng-repeat=\"x in $ctrl.terminales\"> <td>{{ x.SAN }}</td> <td>{{ x.ESN }}</td> <td>{{ x.Estatus }}</td> <td>{{ x.Servicio }}</td> </tr> </tbody> </table> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"$ctrl.cancel()\">Cancelar</button> </div>"
  );


  $templateCache.put('views/reportes/reportes.html',
    "<div class=\"panel\" style=\"height:100px\"> <div class=\"panel-body\" style=\"margin-top:-20px\"> <div class=\"col-md-6 col-sm-12\"> <h4 style=\"margin-top: 20px\" class=\"animated fadeInLeft\">Reportes</h4> <p class=\"animated fadeInDown\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Incidencias>Reportes</p> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"panel form-element-padding\"> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportesContrato.html',
    "<style type=\"text/css\">th{font-size: 9.7pt;}\r" +
    "\n" +
    "  td {font-size: 9.3pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  td.media{font-size: 8.7pt;}\r" +
    "\n" +
    "  input.media{font-size: 8.7pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; /*font-size: 13px;*/\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-green {\r" +
    "\n" +
    "  color: green;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-blue {\r" +
    "\n" +
    "  color: #1E90FF; /*dodgerblue*/\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-red {\r" +
    "\n" +
    "  color: red;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".color-orange {\r" +
    "\n" +
    "  color: orange;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-yellow {\r" +
    "\n" +
    "  color: #999900; /*amarillo*/\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px; padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Contrato</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-5\"> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-25px\"> <!--  <input type=\"text\" ng-model=\"$ctrl.search\" class=\"form-control\" placeholder=\"buscar san...\"> --> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN </th> <th st-sort=\"Referencia\"> Referencia </th> <th st-sort=\"IdSuscriptor\">Id Suscriptor</th> <th st-sort=\"Suscriptor\">Suscriptor</th> <th st-sort=\"Beam\">Beam</th> <th st-sort=\"Servicio\">Servicio</th> <th st-sort=\"Fap\">Fap</th> </tr> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Referencia\" placeholder=\"Referencia\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"IdSuscriptor\" placeholder=\"Id Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Servicio\" placeholder=\"Servicio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Fap\" placeholder=\"Fap\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td>{{row.SAN}}</td> <td>{{row.Referencia}}</td> <td>{{row.IdSuscriptor}}</td> <td>{{row.Suscriptor}}</td> <td>{{row.Beam}}</td> <td>{{row.Servicio}}</td> <td>{{row.Fap}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> </div> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\" ng-hide=\"$ctrl.divExportar\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> "
  );


  $templateCache.put('views/reportes/reportesdatosDelSuscriptor.html',
    "<style type=\"text/css\">th{font-size: 9.7pt;}\r" +
    "\n" +
    "  td {font-size: 9.5pt;}\r" +
    "\n" +
    "  td.media{font-size: 9.2pt;}\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; /*font-size: 13px;*/\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Datos del Suscriptor</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-5\"> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN </th> <th st-sort=\"IdSuscriptor\">Id <br> Suscriptor</th> <th st-sort=\"Referencia\">Referencia</th> <th st-sort=\"Nombre\">Nombre</th> <th st-sort=\"Estado\">Estado</th> <th st-sort=\"Municipio\">Municipio</th> <th st-sort=\"Colonia\">Colonia</th> <th st-sort=\"Calle\">Calle</th> <th st-sort=\"NumeroExt\">Número Exterior</th> <th st-sort=\"CP\">Código <br> Postal</th> <th st-sort=\"Telefono\">Teléfono</th> <th st-sort=\"Celular\">Celular</th> <th st-sort=\"Email\">Email</th> </tr> <!--<tr>\r" +
    "\n" +
    "                  <th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th>\r" +
    "\n" +
    "                </tr> --> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"IdSuscriptor\" placeholder=\"Id Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Referencia\" placeholder=\"Referencia\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Nombre\" placeholder=\"Nombre\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Estado\" placeholder=\"Estado\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Municipio\" placeholder=\"Municipio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Colonia\" placeholder=\"Colonia\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Calle\" placeholder=\"Calle\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"NumeroExt\" placeholder=\"Número Ext\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"CP\" placeholder=\"C. P.\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Telefono\" placeholder=\"Teléfono\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Celular\" placeholder=\"Celular\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Email\" placeholder=\"Email\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"5%\">{{row.SAN}}</td> <td>{{row.IdSuscriptor}}</td> <td>{{row.Referencia}}</td> <td>{{row.Nombre}}</td> <td class=\"media\">{{row.Estado}}</td> <td class=\"media\">{{row.Municipio}}</td> <td class=\"media\">{{row.Colonia}}</td> <td class=\"media\">{{row.Calle}}</td> <td class=\"media\">{{row.NumeroExt}}</td> <td width=\"5%\" class=\"media\">{{row.CP}}</td> <td class=\"media\">{{row.Telefono}}</td> <td class=\"media\">{{row.Celular}}</td> <td class=\"media\">{{row.Email}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportesdetalleterm.html',
    "<style type=\"text/css\">th{font-size: 9.7pt;}\r" +
    "\n" +
    "  td {font-size: 9.3pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  td.media{font-size: 8.7pt;}\r" +
    "\n" +
    "  input.media{font-size: 8.63pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; /*font-size: 13px;*/\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-green {\r" +
    "\n" +
    "  color: green;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-blue {\r" +
    "\n" +
    "  color: #1E90FF; /*dodgerblue*/\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-red {\r" +
    "\n" +
    "  color: red;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".color-orange {\r" +
    "\n" +
    "  color: orange;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-yellow {\r" +
    "\n" +
    "  color: #999900; /*amarillo*/\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px; padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Detalle de Terminales</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">Beam</label> <div class=\"col-sm-8\"> <select class=\"form-control\" ng-model=\"$ctrl.beam_input\" ng-options=\"v.BeamId for v in $ctrl.listaBeam track by v.BeamId\"> </select> </div> </div> </div> <div class=\"row\"> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">Plan</label> <div class=\"col-sm-8\"> <select class=\"form-control\" ng-model=\"$ctrl.plan_input\" ng-options=\"v.Nombre for v in $ctrl.listaPlan track by v.IdServicio\"> </select> </div> </div> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">Estado</label> <div class=\"col-sm-8\"> <select class=\"form-control\" ng-model=\"$ctrl.estado_input\" ng-options=\"v.Nombre for v in $ctrl.listaEstado track by v.IdEstado\"> </select> </div> </div> </div> <div class=\"row\"> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">ESN</label> <div class=\"col-sm-8\"> <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.san_input\" placeholder=\"\" style=\"\"> </div> </div> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">Id Suscriptor</label> <div class=\"col-sm-8\"> <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.idSuscriptor_input\" placeholder=\"\" style=\"\"> </div> </div> </div> <div class=\"row\"> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">SAN</label> <div class=\"col-sm-8\"> <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.siteId_input\" placeholder=\"\" style=\"\"> </div> </div> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-right\"></label> <div class=\"col-md-8\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.getReporteDetalleT();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\"> <i class=\"fa fa-search\"></i> Buscar</a> <a class=\"btn btn-info btn-sm\" st-reset-search ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-25px\"> <!--  <input type=\"text\" ng-model=\"$ctrl.search\" class=\"form-control\" placeholder=\"buscar san...\"> --> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN</th> <th st-sort=\"Estado\">Estado</th> <th st-sort=\"Beam\">Beam </th> <th st-sort=\"SatellitedID\">Satellite </th> <th st-sort=\"PlanServ\">Plan de <br> Servicio</th> <th st-sort=\"ESN\">ESN <br> Serie</th> <th st-sort=\"IdSuscriptor\">Id <br>Suscriptor</th> <th st-sort=\"EstadoFap\">Estado FAP </th> <th st-sort=\"Ipv4\">IPV4</th> <th st-sort=\"Ipv6\">IPV6</th> <th st-sort=\"AssocTime\">Assoc <br> Time</th> <th st-sort=\"Latitud\">Latitud</th> <th st-sort=\"Longitud\">Longitud</th> <th st-sort=\"AvailTokens\">Avail <br>Tokens</th> <th st-sort=\"TxBytes\">TXBytes</th> <th st-sort=\"RxBytes\">RXBytes</th> </tr> <!--<tr>\r" +
    "\n" +
    "                <th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th>\r" +
    "\n" +
    "              </tr> --> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Estado\" placeholder=\"Estado\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"SatellitedID\" placeholder=\"Satellite\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanServ\" placeholder=\"Plan de Servicio\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"IdSuscriptor\" placeholder=\"Id Suscriptor\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"EstadoFap\" placeholder=\"Estado Fap\" class=\"input-sm form-control media\" type=\"search\"> </th> <th colspan=\"2\"> <input st-search placeholder=\"IP\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"AssocTime\" placeholder=\"Assoc Time\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"Latitud\" placeholder=\"Latitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Longitud\" placeholder=\"Longitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"AvailTokens\" placeholder=\"Avail Tokens\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"TxBytes\" placeholder=\"TxBytes\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"RxBytes\" placeholder=\"RxBytes\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|filter:$ctrl.search|itemsPerPage:5\"> <td width=\"5%\"> {{row.SAN}}</td> <!--<i class=\"fa fa-check-circle-o\" aria-hidden=\"true\"></i>--> <!-- <td> <i ng-class=\"{'fa fa-check-circle-o':row.Estado ==='Activa'}\"></i> {{row.Estado}} </td> --> <td ng-class=\"{'color-yellow':(row.Estado =='Incompleta'), \r" +
    "\n" +
    "                        'color-blue':(row.Estado=='Pendiente'),\r" +
    "\n" +
    "                        'color-green':(row.Estado=='Activa'),\r" +
    "\n" +
    "                        'color-red':(row.Estado=='Cancelada'),\r" +
    "\n" +
    "                        'color-orange':(row.Estado=='Suspendida')}\" width=\"6%\"> {{row.Estado}}</td> <!--\r" +
    "\n" +
    "                        <td>\r" +
    "\n" +
    "                          <i ng-class = \"{'fa fa-check-circle-o':(row.Estado =='Activa'), 'fa fa-check-circle-o': (row.Estado == 'Pendiente')}\"> \r" +
    "\n" +
    "                          </i> {{row.Estado}}                          \r" +
    "\n" +
    "                        </td> --> <td width=\"5.5%\"> {{row.Beam}}</td> <td> {{row.SatellitedID}}</td> <td class=\"media\">{{row.PlanServ}}</td> <td class=\"media\">{{row.ESN}}</td> <td width=\"5.5%\">{{row.IdSuscriptor}}</td> <td>{{row.EstadoFap}}</td> <td class=\"media\">{{row.Ipv4}}</td> <td class=\"media\">{{row.Ipv6}}</td> <td>{{row.AssocTime}}</td> <td class=\"media\">{{row.Latitud}}</td> <td class=\"media\">{{row.Longitud}}</td> <td>{{row.AvailTokens}}</td> <td>{{row.TxBytes}}</td> <td>{{row.RxBytes}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> </div> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\" ng-hide=\"$ctrl.divExportar\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> "
  );


  $templateCache.put('views/reportes/reportesgeneral.html',
    "<style type=\"text/css\">.myGrid {\r" +
    "\n" +
    "    width: 500px;\r" +
    "\n" +
    "    height: 250px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  th{font-size: 8.9pt;}\r" +
    "\n" +
    "  td {font-size: 8.66pt;}\r" +
    "\n" +
    "  td.media{font-size: 8.6pt;}\r" +
    "\n" +
    "  td.little{font-size: 8.2pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; \r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".conSinFap {\r" +
    "\n" +
    "  color: #CC3399; /*amarillo*/\r" +
    "\n" +
    "  font-size: 7.9pt\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>General</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-5\"> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th rowspan=\"2\" st-sort=\"SAN\">SAN</th> <th rowspan=\"2\" st-sort=\"ESN\">ESN</th> <th rowspan=\"2\" st-sort=\"PlanDeServicio\">Plan de <br>Servicio</th> <th rowspan=\"2\" st-sort=\"Beam\">Beam</th> <th colspan=\"2\" style=\"text-align: center\">Velocidad</th> <th rowspan=\"2\" st-sort=\"Suscriptor\">Suscriptor</th> <th rowspan=\"2\" st-sort=\"Referencia\">Referencia</th> <th rowspan=\"2\" st-sort=\"Estatus\">Estatus Comercial</th> <th rowspan=\"2\" st-sort=\"Latitud\">Latitud</th> <th rowspan=\"2\" st-sort=\"Longitud\">Longitud</th> <th rowspan=\"2\" st-sort=\"IpNateada\">Ip <br> Nateada</th> <th rowspan=\"2\" st-sort=\"Fap\">FAP</th> <th rowspan=\"2\" st-sort=\"FechaJovian\">Fecha JOVIAN</th> <th rowspan=\"2\" st-sort=\"Estado\">Estado</th> <th rowspan=\"2\" st-sort=\"Municipio\">Municipio</th> <th rowspan=\"2\" st-sort=\"Direccion\">Dirección</th> </tr> <!--<tr><th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th> </tr> --> <tr> <th st-sort=\"VelocidadBajada\">Bajada</th> <th st-sort=\"VelocidadSubida\">Subida </th> </tr> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanDeServicio\" placeholder=\"Plan Servicio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"VelocidadBajada\" placeholder=\"Bajada\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"VelocidadSubida\" placeholder=\"Subida\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Referencia\" placeholder=\"Referencia\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Estatus\" placeholder=\"Estatus\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Latitud\" placeholder=\"Latitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Longitud\" placeholder=\"Longitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"IpNateada\" placeholder=\"Ip\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Fap\" placeholder=\"FAP\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaJovian\" placeholder=\"Fecha\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Estado\" placeholder=\"Estado\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Municipio\" placeholder=\"Municipio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Dirección\" placeholder=\"Dirección\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"5%\">{{row.SAN}}</td> <td>{{row.ESN}}</td> <td>{{row.PlanDeServicio}}</td> <td>{{row.Beam}}</td> <td width=\"3%\">{{row.VelocidadBajada}}</td> <td width=\"3%\">{{row.VelocidadSubida}}</td> <td>{{row.Suscriptor}}</td> <td class=\"media\">{{row.Referencia}}</td> <td width=\"5%\" class=\"little\">{{row.Estatus}}</td> <td class=\"media\">{{row.Latitud}}</td> <td class=\"media\">{{row.Longitud}}</td> <td class=\"media\">{{row.IpNateada}}</td> <td ng-class=\"{'conSinFap':(row.Fap =='ILIMITADO'), \r" +
    "\n" +
    "                        'color-blue':(row.Fap=='Pendiente')}\"> {{row.Fap}}</td> <td>{{row.FechaJovian}}</td> <td>{{row.Estado}}</td> <td class=\"media\">{{row.Municipio}}</td> <td>{{row.Direccion}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportesgeneralPlataforma.html',
    "<style type=\"text/css\">.myGrid {\r" +
    "\n" +
    "    width: 500px;\r" +
    "\n" +
    "    height: 250px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  th{font-size: 9pt;}\r" +
    "\n" +
    "  td {font-size: 8.9pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; \r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    ".tituloBold {\r" +
    "\n" +
    "  font-weight: bold;\r" +
    "\n" +
    "  text-align: left;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".tituloBoldRight\r" +
    "\n" +
    "{\r" +
    "\n" +
    "  font-weight: bold;\r" +
    "\n" +
    "  text-align: right;\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>General por Plataforma</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-5\"> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"col-md-10 col-md-offset-1 panel form-element-padding\" style=\"margin-top:-20px\"> <div style=\"overflow: auto; max-height:550px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead fix-head> <tr> <th st-sort=\"Plataforma\">Plataforma</th> <th st-sort=\"PlanDeServicio\">Plan de Servicio</th> <th colspan=\"3\" style=\"text-align: center\"> Status de Servicios </th> <th style=\"text-align: center\" st-sort=\"Total\">Total</th> <th style=\"text-align: center\" st-sort=\"TokensProv\">Tokens Provisión</th> </tr> <tr> <th> <input st-search=\"Plataforma\" placeholder=\"Plataforma\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanDeServicio\" placeholder=\"Plan de Servicio\" class=\"input-sm form-control\" type=\"search\"> </th> <th style=\"text-align: right\" st-sort=\"Activos\">Activos</th> <th style=\"text-align: right\" st-sort=\"Suspendidos\">Suspendidos</th> <th style=\"text-align: right\" st-sort=\"PorInstalar\">Por Instalar</th> <th> <input st-search=\"Total\" placeholder=\"Total\" class=\"input-sm form-control\" type=\"search\" style=\"text-align:center\"> </th> <th> <input st-search=\"TokensProv\" placeholder=\"Tokens Provisión\" class=\"input-sm form-control\" type=\"search\" style=\"text-align:center\"> </th> </tr> </thead> <tbody> <tr ng-repeat=\"row in $ctrl.displayedCollection4\"> <td>{{row.Plataforma}}</td> <td ng-class=\"{'tituloBold':(row.PlanDeServicio =='CON FAP' \r" +
    "\n" +
    "                  || row.PlanDeServicio =='SIN FAP'), \r" +
    "\n" +
    "                  'tituloBoldRight':( row.PlanDeServicio =='TOTAL ESTATUS CON FAP'\r" +
    "\n" +
    "                  || row.PlanDeServicio =='TOTAL ESTATUS SIN FAP' \r" +
    "\n" +
    "                  || row.PlanDeServicio =='TOTAL ESTATUS GENERAL'\r" +
    "\n" +
    "                  || row.PlanDeServicio =='TOTAL SUMA RESIDENCIALES, EMPRESARIALES SIN FAP')\r" +
    "\n" +
    "                  }\"> {{row.PlanDeServicio}}</td> <td style=\"text-align: right\">{{row.Activos}}</td> <td style=\"text-align: right\">{{row.Suspendidos}}</td> <td style=\"text-align: right\">{{row.PorInstalar}}</td> <td style=\"text-align: right\">{{row.Total}}</td> <td style=\"text-align: right\">{{row.TokensProv}}</td> </tr> </tbody> </table> </div> </div> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\" ng-hide=\"$ctrl.divExportar\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> "
  );


  $templateCache.put('views/reportes/reportesmigraciones.html',
    "<style type=\"text/css\">.myGrid {\r" +
    "\n" +
    "    width: 500px;\r" +
    "\n" +
    "    height: 250px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "  th{font-size: 10pt;}\r" +
    "\n" +
    "  td {font-size: 10pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; \r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Migraciones</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Inicio: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaInicio\" type=\"date\"> </div> </div> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Fin: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaFin\" type=\"date\"> </div> </div> <div class=\"col-md-5\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.getReporteMigra()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\"> <i class=\"fa fa-search\"></i> Buscar</a> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN</th> <th st-sort=\"Suscriptor\">Suscriptor</th> <th st-sort=\"Beam\">Beam</th> <th st-sort=\"Satellite\">Satellite</th> <th st-sort=\"PlanInicial\">Plan Inicial </th> <th st-sort=\"PlanFinal\">Plan Final</th> <th st-sort=\"FechaMigracion\">Fecha Migración</th> <th st-sort=\"ESN\">ESN </th> <th st-sort=\"Latitud\">Latitud</th> <th st-sort=\"Longitud\">Longitud</th> <th st-sort=\"Usuario\">Usuario</th> </tr> <!--<tr><th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th> </tr> --> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"SatellitedID\" placeholder=\"Satellite\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanInicial\" placeholder=\"Plan Inicial\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanFinal\" placeholder=\"Plan Final\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaMigracion\" placeholder=\"Fecha Migración\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Latitud\" placeholder=\"Latitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Longitud\" placeholder=\"Longitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Usuario\" placeholder=\"Usuario\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"7%\">{{row.SAN}}</td> <td>{{row.Suscriptor}}</td> <td>{{row.Beam}}</td> <td>{{row.SatellitedId}}</td> <td>{{row.PlanInicial}}</td> <td>{{row.PlanFinal}}</td> <td>{{row.FechaMigracion}}</td> <td>{{row.ESN}}</td> <td>{{row.Latitud}}</td> <td>{{row.Longitud}}</td> <td>{{row.Usuario}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportesmovimientos.html',
    "<style type=\"text/css\">.myGrid {\r" +
    "\n" +
    "    width: 500px;\r" +
    "\n" +
    "    height: 250px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "  th {\r" +
    "\n" +
    "    font-size: 10pt;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  td {\r" +
    "\n" +
    "    font-size: 9.8pt;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color: #008b45;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color: #8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv:hover {\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color: #fff;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf:hover {\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color: #fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Movimientos</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Inicio: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaInicio\" type=\"date\"> </div> </div> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Fin: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaFin\" type=\"date\"> </div> </div> <div class=\"col-md-5\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.getReporteMovimientos()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\"> <i class=\"fa fa-search\"></i> Buscar</a> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN </th> <th st-sort=\"Suscriptor\">Suscriptor</th> <th st-sort=\"Beam\">Beam</th> <th st-sort=\"SatellitedID\">Satellite</th> <th st-sort=\"Usuario\">Usuario</th> <th st-sort=\"FechaMovim\">Fecha <br>Movimiento </th> <th st-sort=\"ESN\">ESN</th> <th st-sort=\"Movimiento\">Movimiento </th> <th st-sort=\"Mensaje\">Mensaje </th> </tr> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"SatellitedID\" placeholder=\"Satellite\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Usuario\" placeholder=\"Usuario\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaMovim\" placeholder=\"Fecha Movimiento\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Movimiento\" placeholder=\"Movimiento\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Mensaje\" placeholder=\"Mensaje\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"6%\">{{row.SAN}}</td> <td>{{row.Suscriptor}}</td> <td>{{row.Beam}}</td> <td>{{row.SatellitedID}}</td> <td>{{row.Usuario}}</td> <td>{{row.FechaMovim}}</td> <td>{{row.ESN}}</td> <td>{{row.Movimiento}}</td> <td width=\"30%\">{{row.Mensaje}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportesplanta.html',
    "<style type=\"text/css\">th{font-size: 9.7pt;}\r" +
    "\n" +
    "  td {font-size: 9.1pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  td.media{font-size: 8.7pt;}\r" +
    "\n" +
    "  th.mediaTh{font-size: 9.4pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  input.media{font-size: 8.6pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; /*font-size: 13px;*/\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Planta</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-5\"> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i> Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th rowspan=\"2\" st-sort=\"SAN\"> SAN </th> <th rowspan=\"2\" st-sort=\"IdSuscriptor\" class=\"mediaTh\">Id <br>Suscriptor </th> <th rowspan=\"2\" st-sort=\"Suscriptor\">Suscriptor</th> <th rowspan=\"2\" st-sort=\"Referencia\">Referencia</th> <th rowspan=\"2\" st-sort=\"PlanDeServicio\" class=\"mediaTh\">Plan de Servicio</th> <th rowspan=\"2\" st-sort=\"Beam\">Beam</th> <th rowspan=\"2\" st-sort=\"SatellitedID\">Satellite</th> <th rowspan=\"2\" st-sort=\"ESN\">ESN</th> <th rowspan=\"2\" st-sort=\"Estatus\">Est. Comercial</th> <th rowspan=\"2\" st-sort=\"EstTecnico\">Est. FAP</th> <th rowspan=\"2\" st-sort=\"Latitud\">Latitud</th> <th rowspan=\"2\" st-sort=\"Longitud\">Longitud</th> <th rowspan=\"2\" st-sort=\"FechaAlta\" class=\"mediaTh\"> Fecha Alta</th> <th rowspan=\"2\" st-sort=\"FechaActivacion\" class=\"mediaTh\">Fecha Activación</th> <th rowspan=\"2\" st-sort=\"FechaSuspension\" class=\"mediaTh\"> Fecha Suspensión</th> <th rowspan=\"2\" st-sort=\"FechaCancelacion\" class=\"mediaTh\"> Fecha Cancelación</th> <th rowspan=\"2\" st-sort=\"consumoAnytime\">Consumo Anytime (Gb)</th> <th rowspan=\"2\" st-sort=\"consumoBonus\">Consumo Bonus (Gb)</th> <th rowspan=\"2\" st-sort=\"TokenDisp\">Token Disp (Gb)</th> </tr> <tr> </tr>  <!--<tr>\r" +
    "\n" +
    "                  <th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th>\r" +
    "\n" +
    "                </tr> --> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"IdSuscriptor\" placeholder=\"Id Suscriptor\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Referencia\" placeholder=\"Referencia\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"PlanDeServicio\" placeholder=\"Plan de Servicio\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"SatellitedID\" placeholder=\"Satellite\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Estatus\" placeholder=\"Estatus\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"EstTecnico\" placeholder=\"Est. Fap\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"Latitud\" placeholder=\"Latitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Longitud\" placeholder=\"Longitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaAlta\" placeholder=\"Fecha Alta\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"FechaActivacion\" placeholder=\"Fecha Activacion\" class=\"input-sm form-control media\" type=\"search\"> </th><th> <input st-search=\"FechaSuspension\" placeholder=\"Fecha Suspension\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"FechaCancelacion\" placeholder=\"Fecha Cancelacion\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"consumoAnytime\" placeholder=\"Consumo Anytime\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"consumoBonus\" placeholder=\"Consumo Bonus\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"TokenDisp\" placeholder=\"Token Disp\" class=\"input-sm form-control media\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"4%\">{{row.SAN}}</td> <td width=\"5.4%\">{{row.IdSuscriptor}}</td> <td>{{row.Suscriptor}}</td> <td>{{row.Referencia}}</td> <td class=\"media\">{{row.PlanDeServicio}}</td> <td width=\"5.3%\">{{row.Beam}}</td> <td>{{row.SatellitedID}}</td> <td class=\"media\">{{row.ESN}}</td> <td>{{row.Estatus}}</td> <td>{{row.EstTecnico}}</td> <td class=\"media\">{{row.Latitud}}</td> <td class=\"media\">{{row.Longitud}}</td> <td>{{row.FechaAlta}}</td> <td>{{row.FechaActivacion}}</td> <td>{{row.FechaSuspension}}</td> <td>{{row.FechaCancelacion}}</td> <td>{{row.ConsumoAnytime}}</td> <td>{{row.ConsumoBonus}}</td> <td>{{row.TokenDisp}}</td> </tr>  </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportestokens.html',
    "<style type=\"text/css\">th{font-size: 9.8pt;}\r" +
    "\n" +
    "  td {font-size: 9.7pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; /*font-size: 13px;*/\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Tokens</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Inicio: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaInicio\" type=\"date\"> </div> </div> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Fin: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaFin\" type=\"date\"> </div> </div> <div class=\"col-md-5\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.getReporteTokens()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\"> <i class=\"fa fa-search\"></i> Buscar</a> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN </th> <th st-sort=\"Beam\">Beam</th> <th st-sort=\"SatellitedID\">Satellite</th> <th st-sort=\"Suscriptor\">Suscriptor</th> <th st-sort=\"PlanServ\">Plan de Servicio</th> <th st-sort=\"ESN\">ESN</th> <th st-sort=\"Detalle1\">Token (MB)</th> <th st-sort=\"FechaIngreso\">Fecha Ingreso Token </th> <th st-sort=\"Latitud\">Latitud</th> <th st-sort=\"Longitud\">Longitud</th> <th st-sort=\"FechaAlta\">Fecha Alta</th> <th st-sort=\"Usuario\">Usuario</th> </tr> <!--<tr>\r" +
    "\n" +
    "                  <th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th>\r" +
    "\n" +
    "                </tr> --> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"SatellitedID\" placeholder=\"Satellite\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanServ\" placeholder=\"Plan de Servicio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Detalle1\" placeholder=\"Token (MB)\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaIngreso\" placeholder=\"Fecha Ingreso\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Latitud\" placeholder=\"Latitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Longitud\" placeholder=\"Longitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaAlta\" placeholder=\"Fecha Alta\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Usuario\" placeholder=\"Usuario\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"5%\">{{row.SAN}}</td> <td>{{row.Beam}}</td> <td>{{row.SatellitedID}}</td> <td>{{row.Suscriptor}}</td> <td>{{row.PlanServ}}</td> <td>{{row.ESN}}</td> <td>{{row.Detalle1}}</td> <td>{{row.FechaIngreso}}</td> <td>{{row.Latitud}}</td> <td>{{row.Longitud}}</td> <td>{{row.FechaAlta}}</td> <td>{{row.Usuario}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );

}]);
