function permisosExcepcionalesFormulario($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, $timeout, obtFechaCorrecta, $route, obtFechaActual, fileUpload1) {
  var sIdCiudadano = sessionService.get('IDSOLICITANTE');
  $scope.tipo_persona = sessionService.get('TIPO_PERSONA');
  $scope.oidCiu = sessionService.get('IDSOLICITANTE');
  $scope.datos = {};
  $scope.desabilitado = false;
  $scope.div_municipal = false;
  $scope.div_zonal = false;
  $scope.div_agregar_vehiculo = true;
  $scope.datos_carro = {};
  $scope.div_boton_agregar_ubicacion = false;
  $scope.aMacrodistritos = {};
  $scope.aDistritoZona = {};
  $scope.datos_zonales = {};
  $scope.datos_zonales_inicio = {};
  $scope.datos_zonales_inicio.tipo = "GRD";
  $scope.datos_zonales_inicio.campos = "PE_MACRO|PE_DISTRI|PE_ZONA|PE_TIPO_VIA|PE_ENTRE_VIA|PE_Y_VIA|PE_NOM_VIA";
  $scope.datos_zonales_inicio.titulos = "MACRODISTRITO|DISTRITO|ZONA|TIPO DE VIA|ENTRE VIA|Y VIA|VIA";
  $scope.datos_zonales_inicio.impresiones = "true|true|true|true|true|true|true|";
  $scope.datos_carros_inicial = {};
  $scope.datos_carros_inicial.tipo = "GRD";
  $scope.datos_carros_inicial.campos = "PE_PLACA_CIRC|PE_RADICATORIA|PE_COLOR|PE_G_TIPO|PE_MARCA_VEH|PE_COLOR_VEH|PE_TIPO_SERVICIO|PE_DIMENSIONES|PE_NOMBRE_PROP|PE_PLACA_OBSERVADO";
  $scope.datos_carros_inicial.titulos = "PLACA DE CIRCULACIÓN|RADICATORIA|COLOR|CLASE|MARCA|MODELO|SERVICIO|DIMENSIONES|NOMBRE PROPIETARIO|OBSERVADO";
  $scope.datos_carros_inicial.impresiones = "undefined|undefined|undefined|true|undefined|undefined|true|true|undefined|undefined|";
  $scope.datos_fecha_inicial = {};
  $scope.datos_fecha_inicial.tipo = "GRD";
  $scope.datos_fecha_inicial.campos = "asignacion|horaInicio|horaFin";
  $scope.datos_fecha_inicial.titulos = "Fechas|Hora Inicio|Hora Fin";
  $scope.datos_fecha_inicial.impresiones = "true|true|true";
  $scope.trm_Zonales = [];
  $scope.envio_Zonales = [];
  $scope.envio_Carros = [];
  $scope.envio_Fechas = [];
  $scope.trm_fechas = [];
  $scope.trm_Vehiculos = [];
  $scope.div_jerarquia_viral = false;
  $scope.div_foto_restriccion_vehicular = false;
  $scope.div_mapa_datos = false;
  $scope.div_cierre_formulario = false;
  $scope.div_vehiculos_datos = false;
  $scope.div_formulario = false;
  $scope.div_agregar_fecha = false;
  $scope.div_licencia_funcionamiento = false;
  $scope.div_primero_tipo = false;
  $scope.div_segundo_tipo = false;
  $scope.div_nro_esapacios = false;
  $scope.div_adjunto_global_primero = false;
  $scope.div_adjunto_global_segundo = false;
  $scope.segundo_tipo_adjuntos_uno = false;
  $scope.segundo_tipo_adjuntos_dos = false;
  $scope.segundo_tipo_adjuntos_tercero = false;
  $scope.inicio = function () {
    $scope.open_mapa_mascotas();
  }
  var clsValidarBtnEnviar = $rootScope.$on('inicializarVista', function (event, data) {
    $scope.$apply();
    $scope.datos = data;
    if ($scope.datos.PE_T_PERMISO_VALOR == 'PARADA MOMENTANEA') {
      $scope.permisoDinamico($scope.datos.PE_T_PERMISO_VALOR);
      $scope.tipoUbicacionDinamico($scope.datos.PE_UBICACION);
      $scope.trm_Zonales = $scope.datos.TRM_UBICACION;
      $scope.tblZonas.reload();
      $scope.trm_Vehiculos = $scope.datos.TRM_VEHICULOS;
      $scope.tblCarros.reload();
      $scope.trm_fechas = $scope.datos.TRM_FECHAS;
      $scope.tblFechas.reload();
    } else if ($scope.datos.PE_T_PERMISO_VALOR == 'ESTACIONAMIENTO') {
      $scope.permisoDinamico($scope.datos.PE_T_PERMISO_VALOR);
      $scope.tipoUbicacionDinamico($scope.datos.PE_UBICACION);
      $scope.trm_Vehiculos = $scope.datos.TRM_VEHICULOS;
      $scope.tblCarros.reload();
      $scope.trm_fechas = $scope.datos.TRM_FECHAS;
      $scope.tblFechas.reload();
      $scope.datos_zonales.PE_MACRO = $scope.datos.PE_MACRO_VALOR;
      $scope.datos_zonales.PE_TIPO_VIA = $scope.datos.PE_TIPO_VIA;
      $scope.datos_zonales.PE_ENTRE_VIA = $scope.datos.PE_ENTRE_VIA;
      $scope.datos_zonales.PE_Y_VIA = $scope.datos.PE_Y_VIA;
      $scope.datos_zonales.PE_NOM_VIA = $scope.datos.PE_NOM_VIA;
      $scope.datos_zonales.PE_ZONA_VALOR = $scope.datos.PE_ZONA_VALOR;
    } else if ($scope.datos.PE_T_PERMISO_VALOR == 'CIERRE DE VIAS') {
      $scope.permisoDinamico($scope.datos.PE_T_PERMISO_VALOR);
      $scope.tipoUbicacionDinamico($scope.datos.PE_UBICACION);
      $scope.trm_fechas = $scope.datos.TRM_FECHAS;
      $scope.tblFechas.reload();
      $scope.datos_zonales.PE_MACRO = $scope.datos.PE_MACRO_VALOR;
      $scope.datos_zonales.PE_TIPO_VIA = $scope.datos.PE_TIPO_VIA;
      $scope.datos_zonales.PE_ENTRE_VIA = $scope.datos.PE_ENTRE_VIA;
      $scope.datos_zonales.PE_Y_VIA = $scope.datos.PE_Y_VIA;
      $scope.datos_zonales.PE_NOM_VIA = $scope.datos.PE_NOM_VIA;
      $scope.datos_zonales.PE_ZONA_VALOR = $scope.datos.PE_ZONA_VALOR;
    } else if ($scope.datos.PE_T_PERMISO_VALOR == 'AREA DE RESTRICCION VEHICULAR') {
      $scope.permisoDinamico($scope.datos.PE_T_PERMISO_VALOR);
      $scope.tipoUbicacionDinamico($scope.datos.PE_UBICACION);
      $scope.trm_Vehiculos = $scope.datos.TRM_VEHICULOS;
      $scope.tblCarros.reload();
      $scope.trm_fechas = $scope.datos.TRM_FECHAS;
      $scope.tblFechas.reload();
    } else if ($scope.datos.PE_T_PERMISO_VALOR == undefined || $scope.datos.PE_T_PERMISO_VALOR == 'undefined' || $scope.datos.PE_T_PERMISO_VALOR == "") {
      $scope.div_formulario = false;
      $scope.trm_Zonales = [];
      $scope.trm_fechas = [];
      $scope.trm_Vehiculos = [];
      $scope.tblCarros.reload();
      $scope.tblFechas.reload();
      $scope.tblZonas.reload();
    }
    if ($scope.datos.File_Adjunto == undefined) {
      $scope.datos.File_Adjunto = [];
      $scope.datos.valPlaca = 2;
    }
    $scope.enviado = sessionService.get('ESTADO');
    if ($scope.enviado == 'SI') {
      $scope.desabilitado = true;
      if ($scope.datos.PE_T_PERMISO_VALOR == 'PARADA MOMENTANEA') {
        $scope.div_zonal = false;
        $scope.div_agregar_vehiculo = false;
        $scope.div_agregar_fecha = false;
      } else if ($scope.datos.PE_T_PERMISO_VALOR == 'ESTACIONAMIENTO') {
        $scope.div_zonal = true;
        $scope.div_agregar_vehiculo = false;
        $scope.div_agregar_fecha = false;
      } else if ($scope.datos.PE_T_PERMISO_VALOR == 'CIERRE DE VIAS') {
        $scope.div_zonal = true;
        $scope.div_agregar_vehiculo = false;
        $scope.div_agregar_fecha = false;
      } else if ($scope.datos.PE_T_PERMISO_VALOR == 'AREA DE RESTRICCION VEHICULAR') {
        $scope.div_zonal = false;
        $scope.div_agregar_vehiculo = false;
        $scope.div_agregar_fecha = false;
      } else if ($scope.datos.PE_T_PERMISO_VALOR == undefined || $scope.datos.PE_T_PERMISO_VALOR == 'undefined' || $scope.datos.PE_T_PERMISO_VALOR == "") {
        $scope.div_formulario == false;
        $scope.div_zonal = false;
        $scope.div_agregar_vehiculo = false;
        $scope.div_agregar_fecha = false;
      }
    } else {
      $scope.desabilitado = false;
    }
    $scope.cargarMacrodistritos();
    $("#valida").hide();
    $("#valida1").hide();
    document.getElementById('gu').disabled = true;
    $scope.$apply();
    setTimeout(function () {
      iniciarLoadFyle();
    }, 1000);
  });
  $scope.validacionFinal = function (data) {
    if ($scope.datos.PE_T_PERMISO_VALOR == undefined || $scope.datos.PE_T_PERMISO_VALOR == 'undefined' || $scope.datos.PE_T_PERMISO_VALOR == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese el tipo de permiso.", "warning");
    } else {
      if ($scope.datos.PE_T_PERMISO_VALOR == 'PARADA MOMENTANEA') {
        if ($scope.datos.PE_NRO_LICENCIA == undefined || $scope.datos.PE_NRO_LICENCIA == 'undefined' || $scope.datos.PE_NRO_LICENCIA == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el número de funcionamiento.", "warning");
        } else if ($scope.datos.PE_MAPA == undefined || $scope.datos.PE_MAPA == 'undefined' || $scope.datos.PE_MAPA == "") {
          $scope.mensaje("Estimado Ciudadano", "Seleccione un punto en el mapa.", "warning");
        } else if ($scope.datos.PE_UBICACION == undefined || $scope.datos.PE_UBICACION == 'undefined' || $scope.datos.PE_UBICACION == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el tipo de ubicación.", "warning");
        } else if ($scope.datos.PE_UBICACION == '1' && $scope.trm_Zonales.length <= 0) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese al menos una ubicación.", "warning");
        } else if ($scope.datos.PE_NUM_ESP == undefined || $scope.datos.PE_NUM_ESP == 'undefined' || $scope.datos.PE_NUM_ESP == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el Nro de Espacio.", "warning");
        } else if ($scope.datos.PE_NUM_VEH == undefined || $scope.datos.PE_NUM_VEH == 'undefined' || $scope.datos.PE_NUM_VEH == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el Nro de Vehículo .", "warning");
        } else if ($scope.datos.PE_NUM_VEH <= 0) {
          $scope.mensaje("Estimado Ciudadano", "Tome en cuenta que deben ser mas de un vehículo.", "warning");
        } else if ($scope.datos.PE_NUM_VEH != $scope.trm_Vehiculos.length) {
          $scope.mensaje("Estimado Ciudadano", "El número de vehículos no coincide con el número vehiculos que registro .", "warning");
        } else if ($scope.trm_Vehiculos.length <= 0) {
          $scope.mensaje("Estimado Ciudadano", "Debe ingresar al menos un vehículo.", "warning");
        } else if ($scope.datos.PE_TIPO == undefined || $scope.datos.PE_TIPO == 'undefined' || $scope.datos.PE_TIPO == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el tipo.", "warning");
        } else if ($scope.datos.PE_MOTIV == undefined || $scope.datos.PE_MOTIV == 'undefined' || $scope.datos.PE_MOTIV == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el Motivo de Permiso.", "warning");
        } else if ($scope.trm_fechas.length <= 0) {
          $scope.mensaje("Estimado Ciudadano", "Debe ingresar al menos una fecha.", "warning");
        } else if ($scope.datos.FILE_LIC_FUN_AE == undefined || $scope.datos.FILE_LIC_FUN_AE == 'undefined' || $scope.datos.FILE_LIC_FUN_AE == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Licencia de Funcionamiento.", "warning");
        } else if ($scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH == undefined || $scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH == 'undefined' || $scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Certificado de Propiedad.", "warning");
        } else if ($scope.datos.FILE_SOAT == undefined || $scope.datos.FILE_SOAT == 'undefined' || $scope.datos.FILE_SOAT == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de SOAT.", "warning");
        } else if ($scope.datos.FILE_VINCULACION_PERDONA == undefined || $scope.datos.FILE_VINCULACION_PERDONA == 'undefined' || $scope.datos.FILE_VINCULACION_PERDONA == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de vinculación.", "warning");
        } else if ($scope.datos.FILE_TARJETA_MUNICIPAL == undefined || $scope.datos.FILE_TARJETA_MUNICIPAL == 'undefined' || $scope.datos.FILE_TARJETA_MUNICIPAL == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Tarjeta Municipal.", "warning");
        } else if ($scope.datos.FILE_TARJETA_CONDUCTOR == undefined || $scope.datos.FILE_TARJETA_CONDUCTOR == 'undefined' || $scope.datos.FILE_TARJETA_CONDUCTOR == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Tarjeta de Identificación del Conductor.", "warning");
        } else if ($scope.datos.FILE_SIN_DEUDAS_IMPUESTOS == undefined || $scope.datos.FILE_SIN_DEUDAS_IMPUESTOS == 'undefined' || $scope.datos.FILE_SIN_DEUDAS_IMPUESTOS == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de que no tiene documentos pendientes.", "warning");
        } else if ($scope.datos.FILE_RESOLUCION_ADMINISTRATIVA == undefined || $scope.datos.FILE_RESOLUCION_ADMINISTRATIVA == 'undefined' || $scope.datos.FILE_RESOLUCION_ADMINISTRATIVA == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Resolución Administrativa.", "warning");
        } else if ($scope.datos.FILE_CROQUIS == undefined || $scope.datos.FILE_CROQUIS == 'undefined' || $scope.datos.FILE_CROQUIS == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento del corquis de ubicación.", "warning");
        } else {
          $scope.envio_Zonales = [];
          $scope.datos.PE_GR_UBICACION = [];
          if ($scope.datos.PE_UBICACION == '2') {
            $scope.datos.PE_MACRO1 = $scope.datos.macroluis;
            $scope.datos.PE_ZONA1 = $scope.datos.zonaluis;
            $scope.datos.PE_TIPO_VIA1 = $scope.datos.vialuis;
          }
          $scope.envio_Zonales.push($scope.datos_zonales_inicio);
          for (var i = 0; i < $scope.trm_Zonales.length; i++) {
            $scope.envio_Zonales.push($scope.trm_Zonales[i]);
          }
          $scope.datos.PE_GR_UBICACION = $scope.envio_Zonales;
          $scope.datos.TRM_UBICACION = $scope.trm_Zonales;
          $scope.envio_Carros.push($scope.datos_carros_inicial);
          for (var i = 0; i < $scope.trm_Vehiculos.length; i++) {
            $scope.envio_Carros.push($scope.trm_Vehiculos[i]);
          }
          $scope.datos.PE_G_VEHICULOS = $scope.envio_Carros;
          $scope.datos.TRM_VEHICULOS = $scope.trm_Vehiculos;
          $scope.envio_Fechas.push($scope.datos_fecha_inicial);
          for (var i = 0; i < $scope.trm_fechas.length; i++) {
            $scope.envio_Fechas.push($scope.trm_fechas[i]);
          }
          $scope.datos.PE_VEHICULOS_FECHAS = $scope.envio_Fechas;
          $scope.datos.TRM_FECHAS = $scope.trm_fechas
          $scope.datos.PE_T_PERMISO = "1";
          $scope.datos.TotalCosto = "0";
          $scope.ultimoArrayAdjunto();
        }
      } else if ($scope.datos.PE_T_PERMISO_VALOR == 'ESTACIONAMIENTO') {
        if ($scope.datos.PE_NRO_LICENCIA == undefined || $scope.datos.PE_NRO_LICENCIA == 'undefined' || $scope.datos.PE_NRO_LICENCIA == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el número de funcionamiento.", "warning");
        } else if ($scope.datos.PE_MAPA == undefined || $scope.datos.PE_MAPA == 'undefined' || $scope.datos.PE_MAPA == "") {
          $scope.mensaje("Estimado Ciudadano", "Seleccione un punto en el mapa.", "warning");
        } else if ($scope.datos.PE_UBICACION == undefined || $scope.datos.PE_UBICACION == 'undefined' || $scope.datos.PE_UBICACION == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el tipo de ubicación.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_MACRO == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_MACRO == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_MACRO == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el macrodistrito.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ZONA_VALOR == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ZONA_VALOR == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ZONA_VALOR == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese la zona.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TIPO_VIA == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TIPO_VIA == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TIPO_VIA == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el tipo de vía.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ENTRE_VIA == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ENTRE_VIA == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ENTRE_VIA == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese la entre vía.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_Y_VIA == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_Y_VIA == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_Y_VIA == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese la y vía.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_NOM_VIA == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_NOM_VIA == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_NOM_VIA == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el nombre de la vía.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TRAMO == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TRAMO == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TRAMO == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el carril.", "warning");
        } else if ($scope.datos.PE_NUM_ESP == undefined || $scope.datos.PE_NUM_ESP == 'undefined' || $scope.datos.PE_NUM_ESP == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el Nro de Espacio.", "warning");
        } else if ($scope.datos.PE_NUM_VEH == undefined || $scope.datos.PE_NUM_VEH == 'undefined' || $scope.datos.PE_NUM_VEH == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el Nro de Vehículo .", "warning");
        } else if ($scope.datos.PE_NUM_VEH <= 0) {
          $scope.mensaje("Estimado Ciudadano", "Tome en cuenta que deben ser mas de un vehículo.", "warning");
        } else if ($scope.datos.PE_NUM_VEH != $scope.trm_Vehiculos.length) {
          $scope.mensaje("Estimado Ciudadano", "El número de vehículos no coincide con el número vehiculos que registro .", "warning");
        } else if ($scope.trm_Vehiculos.length <= 0) {
          $scope.mensaje("Estimado Ciudadano", "Debe ingresar al menos un vehículo.", "warning");
        } else if ($scope.datos.PE_TIPO == undefined || $scope.datos.PE_TIPO == 'undefined' || $scope.datos.PE_TIPO == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el tipo.", "warning");
        } else if ($scope.datos.PE_MOTIV == undefined || $scope.datos.PE_MOTIV == 'undefined' || $scope.datos.PE_MOTIV == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el Motivo de Permiso.", "warning");
        } else if ($scope.trm_fechas.length <= 0) {
          $scope.mensaje("Estimado Ciudadano", "Debe ingresar al menos una fecha.", "warning");
        } else if ($scope.datos.FILE_LIC_FUN_AE == undefined || $scope.datos.FILE_LIC_FUN_AE == 'undefined' || $scope.datos.FILE_LIC_FUN_AE == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Licencia de Funcionamiento.", "warning");
        } else if ($scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH == undefined || $scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH == 'undefined' || $scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Certificado de Propiedad.", "warning");
        } else if ($scope.datos.FILE_SOAT == undefined || $scope.datos.FILE_SOAT == 'undefined' || $scope.datos.FILE_SOAT == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de SOAT.", "warning");
        } else if ($scope.datos.FILE_VINCULACION_PERDONA == undefined || $scope.datos.FILE_VINCULACION_PERDONA == 'undefined' || $scope.datos.FILE_VINCULACION_PERDONA == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de vinculación.", "warning");
        } else if ($scope.datos.FILE_TARJETA_MUNICIPAL == undefined || $scope.datos.FILE_TARJETA_MUNICIPAL == 'undefined' || $scope.datos.FILE_TARJETA_MUNICIPAL == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Tarjeta Municipal.", "warning");
        } else if ($scope.datos.FILE_TARJETA_CONDUCTOR == undefined || $scope.datos.FILE_TARJETA_CONDUCTOR == 'undefined' || $scope.datos.FILE_TARJETA_CONDUCTOR == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Tarjeta de Identificación del Conductor.", "warning");
        } else if ($scope.datos.FILE_SIN_DEUDAS_IMPUESTOS == undefined || $scope.datos.FILE_SIN_DEUDAS_IMPUESTOS == 'undefined' || $scope.datos.FILE_SIN_DEUDAS_IMPUESTOS == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de que no tiene documentos pendientes.", "warning");
        } else if ($scope.datos.FILE_RESOLUCION_ADMINISTRATIVA == undefined || $scope.datos.FILE_RESOLUCION_ADMINISTRATIVA == 'undefined' || $scope.datos.FILE_RESOLUCION_ADMINISTRATIVA == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Resolución Administrativa.", "warning");
        } else if ($scope.datos.FILE_CROQUIS == undefined || $scope.datos.FILE_CROQUIS == 'undefined' || $scope.datos.FILE_CROQUIS == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento del corquis de ubicación.", "warning");
        } else {
          if ($scope.datos.PE_UBICACION == '2') {
            $scope.datos.PE_MACRO1 = $scope.datos.macroluis;
            $scope.datos.PE_ZONA1 = $scope.datos.zonaluis;
            $scope.datos.PE_TIPO_VIA1 = $scope.datos.vialuis;
          } else {
            $scope.datos.PE_MACRO_VALOR = $scope.datos_zonales.PE_MACRO;
            $scope.datos.PE_ZONA_VALOR = $scope.datos_zonales.PE_ZONA_VALOR;
            $scope.datos.PE_TIPO_VIA = $scope.datos_zonales.PE_TIPO_VIA;
            $scope.datos.PE_ENTRE_VIA = $scope.datos_zonales.PE_ENTRE_VIA;
            $scope.datos.PE_Y_VIA = $scope.datos_zonales.PE_Y_VIA;
            $scope.datos.PE_NOM_VIA = $scope.datos_zonales.PE_NOM_VIA;
            $scope.datos.PE_TRAMO = $scope.datos_zonales.PE_TRAMO;
          }
          $scope.envio_Carros.push($scope.datos_carros_inicial);
          for (var i = 0; i < $scope.trm_Vehiculos.length; i++) {
            $scope.envio_Carros.push($scope.trm_Vehiculos[i]);
          }
          $scope.datos.PE_G_VEHICULOS = $scope.envio_Carros;
          $scope.datos.TRM_VEHICULOS = $scope.trm_Vehiculos;
          $scope.envio_Fechas.push($scope.datos_fecha_inicial);
          for (var i = 0; i < $scope.trm_fechas.length; i++) {
            $scope.envio_Fechas.push($scope.trm_fechas[i]);
          }
          $scope.datos.PE_VEHICULOS_FECHAS = $scope.envio_Fechas;
          $scope.datos.TRM_FECHAS = $scope.trm_fechas
          $scope.datos.PE_T_PERMISO = "2";
          $scope.datos.TotalCosto = "0";
          $scope.ultimoArrayAdjunto();
        }
      } else if ($scope.datos.PE_T_PERMISO_VALOR == 'CIERRE DE VIAS') {
        if ($scope.datos.PE_T_CIERRE == undefined || $scope.datos.PE_T_CIERRE == 'undefined' || $scope.datos.PE_T_CIERRE == "") {
          $scope.mensaje("Estimado Ciudadano", "Debe seleccionar el tipo de cierre.", "warning");
        } else if ($scope.datos.PE_MAPA == undefined || $scope.datos.PE_MAPA == 'undefined' || $scope.datos.PE_MAPA == "") {
          $scope.mensaje("Estimado Ciudadano", "Seleccione un punto en el mapa.", "warning");
        } else if ($scope.datos.PE_UBICACION == undefined || $scope.datos.PE_UBICACION == 'undefined' || $scope.datos.PE_UBICACION == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el tipo de ubicación.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_MACRO == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_MACRO == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_MACRO == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el macrodistrito.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ZONA_VALOR == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ZONA_VALOR == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ZONA_VALOR == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese la zona.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TIPO_VIA == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TIPO_VIA == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TIPO_VIA == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el tipo de vía.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ENTRE_VIA == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ENTRE_VIA == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_ENTRE_VIA == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese la entre vía.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_Y_VIA == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_Y_VIA == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_Y_VIA == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese la y vía.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_NOM_VIA == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_NOM_VIA == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_NOM_VIA == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el nombre de la vía.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_NOM_VIA == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_NOM_VIA == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_NOM_VIA == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el nombre de la vía.", "warning");
        } else if (($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TRAMO == undefined) || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TRAMO == 'undefined') || ($scope.datos.PE_UBICACION == '1' && $scope.datos_zonales.PE_TRAMO == "")) {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el carril.", "warning");
        } else if ($scope.datos.PE_TIPO_CIERRE == undefined || $scope.datos.PE_TIPO_CIERRE == 'undefined' || $scope.datos.PE_TIPO_CIERRE == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el tipo.", "warning");
        } else if ($scope.datos.PE_MOTIV == undefined || $scope.datos.PE_MOTIV == 'undefined' || $scope.datos.PE_MOTIV == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el Motivo de Permiso.", "warning");
        } else if ($scope.datos.PE_NRO_CUADRAS1 == undefined || $scope.datos.PE_NRO_CUADRAS1 == 'undefined' || $scope.datos.PE_NRO_CUADRAS1 == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el numero de cuadras primaria.", "warning");
        } else if ($scope.datos.PE_NRO_CUADRAS2 == undefined || $scope.datos.PE_NRO_CUADRAS2 == 'undefined' || $scope.datos.PE_NRO_CUADRAS2 == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el numero de cuadras secundaria.", "warning");
        } else if ($scope.datos.PE_NRO_CUADRAS3 == undefined || $scope.datos.PE_NRO_CUADRAS3 == 'undefined' || $scope.datos.PE_NRO_CUADRAS3 == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el numero de cuadras terciaria.", "warning");
        } else if ($scope.trm_fechas.length <= 0) {
          $scope.mensaje("Estimado Ciudadano", "Debe ingresar al menos una fecha.", "warning");
        } else {
          if ($scope.datos.PE_TIPO_CIERRE == '1' || $scope.datos.PE_TIPO_CIERRE == 1) {

            if ($scope.datos.FILE_CONTRA_OBRAS_CIVIL == undefined || $scope.datos.FILE_CONTRA_OBRAS_CIVIL == 'undefined' || $scope.datos.FILE_CONTRA_OBRAS_CIVIL == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de contrato para la ejecución de obras civiles.", "warning");
            } else if ($scope.datos.FILE_CROQUIS_UBI_VIA_PERMISO == undefined || $scope.datos.FILE_CROQUIS_UBI_VIA_PERMISO == 'undefined' || $scope.datos.FILE_CROQUIS_UBI_VIA_PERMISO == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de croquis de ubicación de la vía.", "warning");
            } else if ($scope.datos.FILE_PERMISO_CONSTRUCCION == undefined || $scope.datos.FILE_PERMISO_CONSTRUCCION == 'undefined' || $scope.datos.FILE_PERMISO_CONSTRUCCION == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de permiso de construcción.", "warning");
            } else if ($scope.datos.FILE_AUTO_TIERRA == undefined || $scope.datos.FILE_AUTO_TIERRA == 'undefined' || $scope.datos.FILE_AUTO_TIERRA == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de autorización para movimiento de tierra.", "warning");
            } else if ($scope.datos.FILE_PLANOS_APRO == undefined || $scope.datos.FILE_PLANOS_APRO == 'undefined' || $scope.datos.FILE_PLANOS_APRO == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de planos aprobados por el GAMLP.", "warning");
            } else if ($scope.datos.FILE_PLAN_MANEJO_TRAFICO == undefined || $scope.datos.FILE_PLAN_MANEJO_TRAFICO == 'undefined' || $scope.datos.FILE_PLAN_MANEJO_TRAFICO == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento del plan de manejo de tráfico.", "warning");
            } else {
              if ($scope.datos.PE_UBICACION == '2') {
                $scope.datos.PE_MACRO1 = $scope.datos.macroluis;
                $scope.datos.PE_ZONA1 = $scope.datos.zonaluis;
                $scope.datos.PE_TIPO_VIA1 = $scope.datos.vialuis;
              } else {
                $scope.datos.PE_MACRO_VALOR = $scope.datos_zonales.PE_MACRO;
                $scope.datos.PE_ZONA_VALOR = $scope.datos_zonales.PE_ZONA_VALOR;
                $scope.datos.PE_TIPO_VIA = $scope.datos_zonales.PE_TIPO_VIA;
                $scope.datos.PE_ENTRE_VIA = $scope.datos_zonales.PE_ENTRE_VIA;
                $scope.datos.PE_Y_VIA = $scope.datos_zonales.PE_Y_VIA;
                $scope.datos.PE_NOM_VIA = $scope.datos_zonales.PE_NOM_VIA;
                $scope.datos.PE_TRAMO = $scope.datos_zonales.PE_TRAMO;
              }
              $scope.envio_Fechas.push($scope.datos_fecha_inicial);
              for (var i = 0; i < $scope.trm_fechas.length; i++) {
                $scope.envio_Fechas.push($scope.trm_fechas[i]);
              }
              $scope.datos.PE_VEHICULOS_FECHAS = $scope.envio_Fechas;
              $scope.datos.TRM_FECHAS = $scope.trm_fechas
              $scope.datos.PE_T_PERMISO = "3";
              $scope.datos.TotalCosto = "0";
              $scope.ultimoArrayAdjunto();
            }
          } else if ($scope.datos.PE_TIPO_CIERRE == '6' || $scope.datos.PE_TIPO_CIERRE == 6 || $scope.datos.PE_TIPO_CIERRE == '3' || $scope.datos.PE_TIPO_CIERRE == 3 || $scope.datos.PE_TIPO_CIERRE == '5' || $scope.datos.PE_TIPO_CIERRE == 5 || $scope.datos.PE_TIPO_CIERRE == '7' || $scope.datos.PE_TIPO_CIERRE == 7) {
            if ($scope.datos.FILE_LICENCIA_FUNCIONAMIENTO_AE == undefined || $scope.datos.FILE_LICENCIA_FUNCIONAMIENTO_AE == 'undefined' || $scope.datos.FILE_LICENCIA_FUNCIONAMIENTO_AE == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de licencia de funcionamiento.", "warning");
            } else if ($scope.datos.FILE_CONFORMIDAD_SEC_MUN_CUL == undefined || $scope.datos.FILE_CONFORMIDAD_SEC_MUN_CUL == 'undefined' || $scope.datos.FILE_CONFORMIDAD_SEC_MUN_CUL == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de conformidad de la Secretaría Municipal de Culturas.", "warning");
            } else if ($scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD == undefined || $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD == 'undefined' || $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de croquis de la vía.", "warning");
            } else if ($scope.datos.FILE_PLAN_TRAFICO == undefined || $scope.datos.FILE_PLAN_TRAFICO == 'undefined' || $scope.datos.FILE_PLAN_TRAFICO == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de plan de manejo de tráfico para el uso de cierre de vías.", "warning");
            } else {
              if ($scope.datos.PE_UBICACION == '2') {
                $scope.datos.PE_MACRO1 = $scope.datos.macroluis;
                $scope.datos.PE_ZONA1 = $scope.datos.zonaluis;
                $scope.datos.PE_TIPO_VIA1 = $scope.datos.vialuis;
              } else {
                $scope.datos.PE_MACRO_VALOR = $scope.datos_zonales.PE_MACRO;
                $scope.datos.PE_ZONA_VALOR = $scope.datos_zonales.PE_ZONA_VALOR;
                $scope.datos.PE_TIPO_VIA = $scope.datos_zonales.PE_TIPO_VIA;
                $scope.datos.PE_ENTRE_VIA = $scope.datos_zonales.PE_ENTRE_VIA;
                $scope.datos.PE_Y_VIA = $scope.datos_zonales.PE_Y_VIA;
                $scope.datos.PE_NOM_VIA = $scope.datos_zonales.PE_NOM_VIA;
                $scope.datos.PE_TRAMO = $scope.datos_zonales.PE_TRAMO;
              }
              $scope.envio_Fechas.push($scope.datos_fecha_inicial);
              for (var i = 0; i < $scope.trm_fechas.length; i++) {
                $scope.envio_Fechas.push($scope.trm_fechas[i]);
              }
              $scope.datos.PE_VEHICULOS_FECHAS = $scope.envio_Fechas;
              $scope.datos.TRM_FECHAS = $scope.trm_fechas
              $scope.datos.PE_T_PERMISO = "3";
              $scope.datos.TotalCosto = "0";
              $scope.ultimoArrayAdjunto();
            }
          } else if ($scope.datos.PE_TIPO_CIERRE == '2' || $scope.datos.PE_TIPO_CIERRE == 2 || $scope.datos.PE_TIPO_CIERRE == '8' || $scope.datos.PE_TIPO_CIERRE == 8 || $scope.datos.PE_TIPO_CIERRE == '9' || $scope.datos.PE_TIPO_CIERRE == 9) {
            if ($scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD_2 == undefined || $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD_2 == 'undefined' || $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD_2 == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de croquis con el detalle de vías.", "warning");
            } else if ($scope.datos.FILE_PLAN_TRAFICO_2 == undefined || $scope.datos.FILE_PLAN_TRAFICO_2 == 'undefined' || $scope.datos.FILE_PLAN_TRAFICO_2 == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de plan de tráfico.", "warning");
            } else if ($scope.datos.FILE_OTRAS_MANIFESTACIONES == undefined || $scope.datos.FILE_OTRAS_MANIFESTACIONES == 'undefined' || $scope.datos.FILE_OTRAS_MANIFESTACIONES == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de otras manifestaciones folkloricas.", "warning");
            } else if ($scope.datos.FILE_PLAN_TRAFICO == undefined || $scope.datos.FILE_PLAN_TRAFICO == 'undefined' || $scope.datos.FILE_PLAN_TRAFICO == "") {
              $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de plan de manejo de tráfico para el uso de cierre de vías.", "warning");
            } else {
              if ($scope.datos.PE_UBICACION == '2') {
                $scope.datos.PE_MACRO1 = $scope.datos.macroluis;
                $scope.datos.PE_ZONA1 = $scope.datos.zonaluis;
                $scope.datos.PE_TIPO_VIA1 = $scope.datos.vialuis;
              } else {
                $scope.datos.PE_MACRO_VALOR = $scope.datos_zonales.PE_MACRO;
                $scope.datos.PE_ZONA_VALOR = $scope.datos_zonales.PE_ZONA_VALOR;
                $scope.datos.PE_TIPO_VIA = $scope.datos_zonales.PE_TIPO_VIA;
                $scope.datos.PE_ENTRE_VIA = $scope.datos_zonales.PE_ENTRE_VIA;
                $scope.datos.PE_Y_VIA = $scope.datos_zonales.PE_Y_VIA;
                $scope.datos.PE_NOM_VIA = $scope.datos_zonales.PE_NOM_VIA;
                $scope.datos.PE_TRAMO = $scope.datos_zonales.PE_TRAMO;
              }
              $scope.envio_Fechas.push($scope.datos_fecha_inicial);
              for (var i = 0; i < $scope.trm_fechas.length; i++) {
                $scope.envio_Fechas.push($scope.trm_fechas[i]);
              }
              $scope.datos.PE_VEHICULOS_FECHAS = $scope.envio_Fechas;
              $scope.datos.TRM_FECHAS = $scope.trm_fechas
              $scope.datos.PE_T_PERMISO = "3";
              $scope.datos.TotalCosto = "0";
              $scope.ultimoArrayAdjunto();
            }
          } else {
            if ($scope.datos.PE_UBICACION == '2') {
              $scope.datos.PE_MACRO1 = $scope.datos.macroluis;
              $scope.datos.PE_ZONA1 = $scope.datos.zonaluis;
              $scope.datos.PE_TIPO_VIA1 = $scope.datos.vialuis;
            } else {
              $scope.datos.PE_MACRO_VALOR = $scope.datos_zonales.PE_MACRO;
              $scope.datos.PE_ZONA_VALOR = $scope.datos_zonales.PE_ZONA_VALOR;
              $scope.datos.PE_TIPO_VIA = $scope.datos_zonales.PE_TIPO_VIA;
              $scope.datos.PE_ENTRE_VIA = $scope.datos_zonales.PE_ENTRE_VIA;
              $scope.datos.PE_Y_VIA = $scope.datos_zonales.PE_Y_VIA;
              $scope.datos.PE_NOM_VIA = $scope.datos_zonales.PE_NOM_VIA;
              $scope.datos.PE_TRAMO = $scope.datos_zonales.PE_TRAMO;
            }
            $scope.envio_Fechas.push($scope.datos_fecha_inicial);
            for (var i = 0; i < $scope.trm_fechas.length; i++) {
              $scope.envio_Fechas.push($scope.trm_fechas[i]);
            }
            $scope.datos.PE_VEHICULOS_FECHAS = $scope.envio_Fechas;
            $scope.datos.TRM_FECHAS = $scope.trm_fechas
            $scope.datos.PE_T_PERMISO = "3";
            $scope.datos.TotalCosto = "0";
            $scope.ultimoArrayAdjunto();
          }
        }
      } else if ($scope.datos.PE_T_PERMISO_VALOR == 'AREA DE RESTRICCION VEHICULAR') {
        if ($scope.datos.PE_NUM_VEH == undefined || $scope.datos.PE_NUM_VEH == 'undefined' || $scope.datos.PE_NUM_VEH == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el Nro de Vehículo .", "warning");
        } else if ($scope.datos.PE_NUM_VEH <= 0) {
          $scope.mensaje("Estimado Ciudadano", "Tome en cuenta que deben ser mas de un vehículo.", "warning");
        } else if ($scope.datos.PE_NUM_VEH != $scope.trm_Vehiculos.length) {
          $scope.mensaje("Estimado Ciudadano", "El número de vehículos no coincide con el número vehiculos que registro .", "warning");
        } else if ($scope.trm_Vehiculos.length <= 0) {
          $scope.mensaje("Estimado Ciudadano", "Debe ingresar al menos un vehículo.", "warning");
        } else if ($scope.datos.PE_TIPO == undefined || $scope.datos.PE_TIPO == 'undefined' || $scope.datos.PE_TIPO == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el tipo.", "warning");
        } else if ($scope.datos.PE_MOTIV == undefined || $scope.datos.PE_MOTIV == 'undefined' || $scope.datos.PE_MOTIV == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el Motivo de Permiso.", "warning");
        } else if ($scope.trm_fechas.length <= 0) {
          $scope.mensaje("Estimado Ciudadano", "Debe ingresar al menos una fecha.", "warning");
        } else if ($scope.datos.FILE_LIC_FUN_AE == undefined || $scope.datos.FILE_LIC_FUN_AE == 'undefined' || $scope.datos.FILE_LIC_FUN_AE == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Licencia de Funcionamiento.", "warning");
        } else if ($scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH == undefined || $scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH == 'undefined' || $scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Certificado de Propiedad.", "warning");
        } else if ($scope.datos.FILE_SOAT == undefined || $scope.datos.FILE_SOAT == 'undefined' || $scope.datos.FILE_SOAT == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de SOAT.", "warning");
        } else if ($scope.datos.FILE_VINCULACION_PERDONA == undefined || $scope.datos.FILE_VINCULACION_PERDONA == 'undefined' || $scope.datos.FILE_VINCULACION_PERDONA == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de vinculación.", "warning");
        } else if ($scope.datos.FILE_TARJETA_MUNICIPAL == undefined || $scope.datos.FILE_TARJETA_MUNICIPAL == 'undefined' || $scope.datos.FILE_TARJETA_MUNICIPAL == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Tarjeta Municipal.", "warning");
        } else if ($scope.datos.FILE_TARJETA_CONDUCTOR == undefined || $scope.datos.FILE_TARJETA_CONDUCTOR == 'undefined' || $scope.datos.FILE_TARJETA_CONDUCTOR == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Tarjeta de Identificación del Conductor.", "warning");
        } else if ($scope.datos.FILE_SIN_DEUDAS_IMPUESTOS == undefined || $scope.datos.FILE_SIN_DEUDAS_IMPUESTOS == 'undefined' || $scope.datos.FILE_SIN_DEUDAS_IMPUESTOS == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de que no tiene documentos pendientes.", "warning");
        } else if ($scope.datos.FILE_RESOLUCION_ADMINISTRATIVA == undefined || $scope.datos.FILE_RESOLUCION_ADMINISTRATIVA == 'undefined' || $scope.datos.FILE_RESOLUCION_ADMINISTRATIVA == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento de Resolución Administrativa.", "warning");
        } else if ($scope.datos.FILE_CROQUIS == undefined || $scope.datos.FILE_CROQUIS == 'undefined' || $scope.datos.FILE_CROQUIS == "") {
          $scope.mensaje("Estimado Ciudadano", "Ingrese el documento del corquis de ubicación.", "warning");
        } else {
          $scope.envio_Carros.push($scope.datos_carros_inicial);
          for (var i = 0; i < $scope.trm_Vehiculos.length; i++) {
            $scope.envio_Carros.push($scope.trm_Vehiculos[i]);
          }
          $scope.datos.PE_G_VEHICULOS = $scope.envio_Carros;
          $scope.datos.TRM_VEHICULOS = $scope.trm_Vehiculos;
          $scope.envio_Fechas.push($scope.datos_fecha_inicial);
          for (var i = 0; i < $scope.trm_fechas.length; i++) {
            $scope.envio_Fechas.push($scope.trm_fechas[i]);
          }
          $scope.datos.PE_VEHICULOS_FECHAS = $scope.envio_Fechas;
          $scope.datos.TRM_FECHAS = $scope.trm_fechas
          $scope.datos.PE_T_PERMISO = "4";
          $scope.datos.TotalCosto = "0";
          $scope.datos.PE_TIPO_AREA = $scope.datos.PE_TIPO;
          $scope.ultimoArrayAdjunto();
        }
      }
    }
  }
  $scope.guardar_tramite = function (datos) {
    datos.Tipo_tramite_creado = "WEB";
    try {
      var datosSerializados = JSON.stringify(datos);
      var idCiudadano = sessionService.get('IDSOLICITANTE');
      var idTramite = sessionService.get('IDTRAMITE');
      var crear = new datosFormularios();
      crear.frm_tra_dvser_id = sessionService.get('IDSERVICIO');
      crear.data_json = datosSerializados;
      crear.frm_tra_id_ciudadano = sIdCiudadano;
      crear.frm_tra_id_usuario = 1;
      crear.frm_idTramite = idTramite;
      $.blockUI();
      crear.sp_crear_datos_formulario(function (results) {
        results = JSON.parse(results);
        results = results.success;
        if (results.length > 0) {
          alertify.success("Formulario almacenado");
          document.getElementById('gu').disabled = false;
          $.unblockUI();
        } else {
          $.unblockUI();
          sweet.show('', "Formulario no almacenado", 'error');
        }
      });
    } catch (e) {
      console.log("Error..", e);
      $.unblockUI();
    }
  }
  $scope.sumaFecha = function (d, fecha) {
    var Fecha = new Date();
    var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear());
    var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
    var aFecha = sFecha.split(sep);
    var fecha = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0];
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + parseInt(d));
    var anno = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    mes = (mes < 10) ? ("0" + mes) : mes;
    dia = (dia < 10) ? ("0" + dia) : dia;
    var fechaFinal = dia + sep + mes + sep + anno;
    return (fechaFinal);
  }
  $scope.agregarFecha = function () {
    if ($scope.datos.PE_FECHA_INI == undefined || $scope.datos.PE_FECHA_INI == 'undefined' || $scope.datos.PE_FECHA_INI == "") {
      $scope.mensaje("Estimado Ciudadano", "Para agregar una fecha debe colocar la fecha inicial.", "warning");
    } else if ($scope.datos.PE_FECHA_FIN == undefined || $scope.datos.PE_FECHA_FIN == 'undefined' || $scope.datos.PE_FECHA_FIN == "") {
      $scope.mensaje("Estimado Ciudadano", "Para agregar una fecha debe colocar la fecha final.", "warning");
    } else if ($scope.datos.PE_HORA_INICIO == undefined || $scope.datos.PE_HORA_INICIO == 'undefined' || $scope.datos.PE_HORA_INICIO == "") {
      $scope.mensaje("Estimado Ciudadano", "Para agregar una hora inicial.", "warning");
    } else if ($scope.datos.PE_HORA_FIN == undefined || $scope.datos.PE_HORA_FIN == 'undefined' || $scope.datos.PE_HORA_FIN == "") {
      $scope.mensaje("Estimado Ciudadano", "Para agregar una hora final.", "warning");
    } else {
      var inicio_x = $scope.datos.PE_FECHA_INI;
      var inicio_y = inicio_x.split("-");
      var x_anio = inicio_y[0];
      var x_mes = inicio_y[1];
      var x_dia = inicio_y[2];
      var fechaini = x_dia + '/' + x_mes + '/' + x_anio;
      var fecha = fechaini;
      var fin_x = $scope.datos.PE_FECHA_FIN;
      var fin_y = fin_x.split("-");
      var y_anio = fin_y[0];
      var y_mes = fin_y[1];
      var y_dia = fin_y[2];
      var fechaini = x_dia + '/' + x_mes + '/' + x_anio;
      var fecha = fechaini;
      var fechafin = y_dia + '/' + y_mes + '/' + y_anio;
      var aa = {};
      aa.horaFin = $scope.datos.PE_HORA_FIN;
      aa.asignacion = fechaini;
      aa.horaInicio = $scope.datos.PE_HORA_INICIO;
      $scope.trm_fechas.push(aa);
      i = 1;
      while (fecha != fechafin) {
        var d = $scope.sumaFecha(1, fecha);
        var b = {};
        b.horaFin = $scope.datos.PE_HORA_FIN;
        b.asignacion = d;
        b.horaInicio = $scope.datos.PE_HORA_INICIO;
        $scope.trm_fechas.push(b);
        fecha = d;
        i++;
      };
      $scope.tblFechas.reload();
      $scope.datos.PE_FECHA_INI = "";
      $scope.datos.PE_FECHA_FIN = "";
      $scope.datos.PE_HORA_INICIO = "";
      $scope.datos.PE_HORA_FIN = "";
    }
  }
  $scope.adicionarUbicacion = function (data) {
    if ($scope.datos_zonales.PE_MACRO == undefined || $scope.datos_zonales.PE_MACRO == 'undefined' || $scope.datos_zonales.PE_MACRO == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese el MacroDistrito.", "warning");
    } else if ($scope.datos_zonales.PE_ZONA_VALOR == undefined || $scope.datos_zonales.PE_ZONA_VALOR == 'undefined' || $scope.datos_zonales.PE_ZONA_VALOR == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese la Zona.", "warning");
    } else if ($scope.datos_zonales.PE_TIPO_VIA == undefined || $scope.datos_zonales.PE_TIPO_VIA == 'undefined' || $scope.datos_zonales.PE_TIPO_VIA == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese el tipo de vía.", "warning");
    } else if ($scope.datos_zonales.PE_ENTRE_VIA == undefined || $scope.datos_zonales.PE_ENTRE_VIA == 'undefined' || $scope.datos_zonales.PE_ENTRE_VIA == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese la Entre Vía.", "warning");
    } else if ($scope.datos_zonales.PE_Y_VIA == undefined || $scope.datos_zonales.PE_Y_VIA == 'undefined' || $scope.datos_zonales.PE_Y_VIA == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese la Y Vía.", "warning");
    } else if ($scope.datos_zonales.PE_NOM_VIA == undefined || $scope.datos_zonales.PE_NOM_VIA == 'undefined' || $scope.datos_zonales.PE_NOM_VIA == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese el Nombre de la Vía.", "warning");
    } else if ($scope.datos_zonales.PE_TRAMO == undefined || $scope.datos_zonales.PE_TRAMO == 'undefined' || $scope.datos_zonales.PE_TRAMO == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese el carril.", "warning");
    } else {
      $scope.datos_zonales.PE_DISTRI = $scope.datos.PE_DISTRI;
      $scope.datos_zonales.PE_ZONA = $scope.datos_zonales.PE_ZONA_VALOR;
      $scope.trm_Zonales.push($scope.datos_zonales);
      $scope.datos_zonales = {};
      $scope.tblZonas.reload();
    }
  }
  $scope.adicionarVehiculo = function (data) {
    if ($scope.datos_carro.PE_PLACA_CIRC == undefined || $scope.datos_carro.PE_PLACA_CIRC == 'undefined' || $scope.datos_carro.PE_PLACA_CIRC == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese la placa de circulación.", "warning");
    } else if ($scope.datos_carro.PE_RADICATORIA == undefined || $scope.datos_carro.PE_RADICATORIA == 'undefined' || $scope.datos_carro.PE_RADICATORIA == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese la Radicatoria.", "warning");
    } else if ($scope.datos_carro.PE_COLOR == undefined || $scope.datos_carro.PE_COLOR == 'undefined' || $scope.datos_carro.PE_COLOR == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese el color del vehículo.", "warning");
    } else if ($scope.datos_carro.PE_G_TIPO == undefined || $scope.datos_carro.PE_G_TIPO == 'undefined' || $scope.datos_carro.PE_G_TIPO == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese la clase del vehículo.", "warning");
    } else if ($scope.datos_carro.PE_MARCA_VEH == undefined || $scope.datos_carro.PE_MARCA_VEH == 'undefined' || $scope.datos_carro.PE_MARCA_VEH == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese la marca del vehículo.", "warning");
    } else if ($scope.datos_carro.PE_G_TIPO_valor == undefined || $scope.datos_carro.PE_G_TIPO_valor == 'undefined' || $scope.datos_carro.PE_G_TIPO_valor == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese el modelo del vehículo.", "warning");
    } else if ($scope.datos_carro.PE_TIPO_SERVICIO == undefined || $scope.datos_carro.PE_TIPO_SERVICIO == 'undefined' || $scope.datos_carro.PE_TIPO_SERVICIO == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese el servicio del vehículo.", "warning");
    } else if ($scope.datos_carro.PE_DIMENSIONES == undefined || $scope.datos_carro.PE_DIMENSIONES == 'undefined' || $scope.datos_carro.PE_DIMENSIONES == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese las dimensiones.", "warning");
    } else if ($scope.datos_carro.PE_NOMBRE_PROP == undefined || $scope.datos_carro.PE_NOMBRE_PROP == 'undefined' || $scope.datos_carro.PE_NOMBRE_PROP == "") {
      $scope.mensaje("Estimado Ciudadano", "Ingrese el nombre del propietario.", "warning");
    } else {
      $scope.datos_carro.PE_COLOR_VEH = $scope.datos_carro.PE_COLOR;
      $scope.trm_Vehiculos.push($scope.datos_carro);
      $scope.datos_carro = {};
      $scope.tblCarros.reload();
    }
  }
  $scope.eliminarUbicacion = function (dataExp) {
    $scope.trm_Zonales.splice($scope.trm_Zonales.indexOf(dataExp), 1);
    $scope.tblZonas.reload();
  }
  $scope.eliminarVehiculos = function (dataExp) {
    $scope.trm_Vehiculos.splice($scope.trm_Vehiculos.indexOf(dataExp), 1);
    $scope.tblCarros.reload();
  }
  $scope.eliminarFechas = function (dataExp) {
    $scope.trm_fechas.splice($scope.trm_fechas.indexOf(dataExp), 1);
    $scope.tblFechas.reload();
  }
  $scope.validarEnvio = function (data) {
    swal({
      title: 'CONFIRMAR',
      text: 'El envío de la presente solicitud  generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      closeOnConfirm: false
    }, function () {
      swal.close();
      setTimeout(function () {
        $scope.crea_tramite_lotus($scope.datos);
      }, 1000);
    });
  };
  $scope.crea_tramite_lotus = function (datos) {
    $.blockUI({
      css: {
        border: 'none',
        padding: '10px',
        backgroundColor: '#000',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        opacity: .5,
        color: '#fff'
      }, message: "Espere un momento por favor ..."
    });
    setTimeout(function () {
      $.blockUI();
      var f = new Date();
      datos.g_fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()
      datos.g_tipo_tramite = 'PEE';
      data_form = JSON.stringify(datos);
      var tramite = new crearTramiteMovilidad();
      tramite.usr_id = 1;
      tramite.datos = data_form;
      tramite.procodigo = 'PEE';
      var nroTramiteEnviado = sessionService.get('NROTRAMITE');
      tramite.tramite_linea(function (results) {
        results = JSON.parse(results);
        if (results != null) {
          results = results.success.data[0].crea_tramite_linea;
          $scope.validarFormProcesos(results);
          $.unblockUI();
        } else {
          alertify.error("Señor(a) Ciudadano(a) ocurrio un error al enviar su Tramité.",);
          $.unblockUI();
        }
      });
    }, 300);
  };
  $scope.mensaje = function (x_title, x_texto, x_type) {
    swal({
      title: x_title,
      text: x_texto,
      type: x_type,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Aceptar',
      closeOnConfirm: false
    }, function () {
      swal.close();
    });
  }

  $scope.tblZonas = new ngTableParams({
    page: 1,
    count: 5,
    filter: {},
    sorting: {
    }
  }, {
    total: $scope.trm_Zonales.length,
    getData: function ($defer, params) {
      var filteredData = params.filter() ?
        $filter('filter')($scope.trm_Zonales, params.filter()) :
        $scope.trm_Zonales;
      var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.trm_Zonales;
      params.total($scope.trm_Zonales.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.tblFechas = new ngTableParams({
    page: 1,
    count: 5,
    filter: {},
    sorting: {
    }
  }, {
    total: $scope.trm_fechas.length,
    getData: function ($defer, params) {
      var filteredData = params.filter() ?
        $filter('filter')($scope.trm_fechas, params.filter()) :
        $scope.trm_fechas;
      var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.trm_fechas;
      params.total($scope.trm_fechas.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });
  $scope.tblCarros = new ngTableParams({
    page: 1,
    count: 5,
    filter: {},
    sorting: {
    }
  }, {
    total: $scope.trm_Vehiculos.length,
    getData: function ($defer, params) {
      var filteredData = params.filter() ?
        $filter('filter')($scope.trm_Vehiculos, params.filter()) :
        $scope.trm_Vehiculos;
      var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.trm_Vehiculos;
      params.total($scope.trm_Vehiculos.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });
  $scope.validarFormProcesos = function (nroTramite) {
    idUsuario = sessionService.get('IDUSUARIO');
    try {
      idUsuario = 4;
      var tramiteIgob = new datosFormularios();
      tramiteIgob.frm_idTramite = sessionService.get('IDTRAMITE');
      tramiteIgob.frm_tra_enviado = 'SI';
      tramiteIgob.frm_tra_if_codigo = nroTramite;
      tramiteIgob.frm_tra_id_usuario = idUsuario;
      tramiteIgob.validarFormProcesos(function (resultado) {
        swal({
          title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
          text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2><br>“SU SOLICITUD SERA ATENDIDA EN UN PLAZO DE 48 HORAS”',
          html: true,
          type: 'success',
        });
        $scope.tramitesCiudadano();
        $scope.desabilitado = true;
        $scope.botones = null;
      });
    } catch (error) {
      alertify.success('Registro no modificado');
      $.unblockUI();
    }
  };
  $scope.permisoDinamico = function (data) {
    if (data == 'PARADA MOMENTANEA') {
      $scope.div_formulario = true;
      $scope.div_jerarquia_viral = false;
      $scope.div_foto_restriccion_vehicular = false;
      $scope.div_mapa_datos = true;
      $scope.div_cierre_formulario = false;
      $scope.div_vehiculos_datos = true;
      $scope.div_nro_esapacios = true;
      $scope.div_agregar_fecha = true;
      $scope.div_licencia_funcionamiento = true;
      $scope.div_primero_tipo = true;
      $scope.div_segundo_tipo = false;
      $scope.div_adjunto_global_primero = true;
      $scope.div_adjunto_global_segundo = false;
      $scope.tipoUbicacionDinamico($scope.datos.PE_UBICACION);
      $scope.open_mapa_mascotas();
    } else if (data == 'ESTACIONAMIENTO') {
      $scope.div_formulario = true;
      $scope.div_jerarquia_viral = false;
      $scope.div_foto_restriccion_vehicular = false;
      $scope.div_cierre_formulario = false;
      $scope.div_mapa_datos = true;
      $scope.div_vehiculos_datos = true;
      $scope.div_nro_esapacios = true;
      $scope.div_agregar_fecha = true;
      $scope.div_licencia_funcionamiento = true;
      $scope.div_primero_tipo = true;
      $scope.div_segundo_tipo = false;
      $scope.div_adjunto_global_primero = true;
      $scope.div_adjunto_global_segundo = false;
      $scope.tipoUbicacionDinamico($scope.datos.PE_UBICACION);
      $scope.open_mapa_mascotas();
    } else if (data == 'CIERRE DE VIAS') {
      $scope.div_formulario = true;
      $scope.div_jerarquia_viral = true;
      $scope.div_foto_restriccion_vehicular = false;
      $scope.div_mapa_datos = true;
      $scope.div_cierre_formulario = true;
      $scope.div_vehiculos_datos = false;
      $scope.div_nro_esapacios = false;
      $scope.div_agregar_fecha = true;
      $scope.div_licencia_funcionamiento = false;
      $scope.div_primero_tipo = false;
      $scope.div_segundo_tipo = true;
      $scope.div_adjunto_global_primero = false;
      $scope.div_adjunto_global_segundo = false;
      $scope.tipoUbicacionDinamico($scope.datos.PE_UBICACION);
      $scope.open_mapa_mascotas();
    } else if (data == 'AREA DE RESTRICCION VEHICULAR') {
      $scope.div_formulario = true;
      $scope.div_jerarquia_viral = false;
      $scope.div_foto_restriccion_vehicular = true;
      $scope.div_mapa_datos = false;
      $scope.div_cierre_formulario = false;
      $scope.div_vehiculos_datos = true;
      $scope.div_nro_esapacios = false;
      $scope.div_agregar_fecha = true;
      $scope.div_licencia_funcionamiento = false;
      $scope.div_primero_tipo = true;
      $scope.div_segundo_tipo = false;
      $scope.div_adjunto_global_primero = true;
      $scope.div_adjunto_global_segundo = false;
      $scope.tipoUbicacionDinamico($scope.PE_UBICACION);
      $scope.open_mapa_mascotas();
    } else {
      $scope.div_jerarquia_viral = false;
      $scope.div_licencia_funcionamiento = false;
      $scope.tipoUbicacionDinamico($scope.datos.PE_UBICACION);
    }
  }
  $scope.tipoDinamico = function (data) {
    $scope.div_adjunto_global_primero = false;
    $scope.div_adjunto_global_segundo = true;

    if (data == '1' || data == 1) {
      $scope.segundo_tipo_adjuntos_uno == true;
      $scope.segundo_tipo_adjuntos_dos == false;
      $scope.segundo_tipo_adjuntos_tercero == false;
    }
    if (data == '6' || data == 6 || data == '3' || data == 3 || data == '5' || data == 5 || data == '7' || data == 7) {
      $scope.segundo_tipo_adjuntos_uno == false;
      $scope.segundo_tipo_adjuntos_dos == true;
      $scope.segundo_tipo_adjuntos_tercero == false;
    }
    if (data == '2' || data == 2 || data == '8' || data == 8 || data == '9' || data == 9) {
      $scope.segundo_tipo_adjuntos_uno == false;
      $scope.segundo_tipo_adjuntos_dos == false;
      $scope.segundo_tipo_adjuntos_tercero == true;
    }
  }
  var iconStylep = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.6, 40],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: '../../../libs/img/point_icon.png',
      crossOrigin: 'anonymous'
    })
  });
  $scope.open_mapa_mascotas = function (lat, lon) {
    setTimeout(function () {
      var latitud = lat;
      var longitud = lon;
      $("#mapa_mascotas").empty();
      $scope.map = new ol.Map
        ({
          target: 'mapa_mascotas',
          layers: [
            new ol.layer.Group({
              title: 'Mapas Base',
              layers: [
                osm_udit,
                municipios,
                vias_udit
              ]
            }),
            new ol.layer.Group({
              title: 'Capas',
              layers: [
                vectorLayerZonas,
                vectorLayer
              ]
            })
          ],
          view: new ol.View({
            zoom: 16,
            center: ol.proj.fromLonLat([-68.133555, -16.495687])
          })
        });
      var layerSwitcher = new ol.control.LayerSwitcher({ tipLabel: 'Leyenda' });
      $scope.map.addControl(layerSwitcher);
      vectorLayer.getSource().clear();
      if (latitud != undefined) {
        var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud])));
        feature.setStyle(iconStylep);
        vectorSource.addFeature(feature);
        $scope.map.getView().setCenter(ol.proj.fromLonLat([longitud, latitud]));
        $scope.map.getView().setZoom(15);
      }
      $scope.map.on('click', function (evt) {
        $scope.datos.latitud_vol_dom = "";
        $scope.datos.longitud_vol_dom = "";
        vectorSource.clear();
        var viewResolution = view.getResolution();
        var coord = $scope.map.getCoordinateFromPixel(evt.pixel);
        var centro = ol.proj.transform(coord, 'EPSG:3857', epsg32719);
        var wkt = '';
        var centro_1 = ol.proj.transform(coord, 'EPSG:3857', epsg4326);
        var latitud = centro_1[1];
        var longitud = centro_1[0];
        var xarray = [];
        var xobjeto = {};
        xobjeto.lat = latitud;
        xobjeto.lng = longitud;
        xobjeto.url = 'http://192.168.5.141:80/rest/files/RC_CLI/PEE1314/2020//PE_MAPA.jpg?app_name=todoangular';
        xarray.push(xobjeto);
        $scope.datos.PE_MAPA = xarray
        var feature = $scope.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
          return feature;
        });
        if (feature) {
          var coord = feature.getGeometry().getCoordinates();
          var props = feature.getProperties();
        }
        else {
          var url_zonas = zonas_udit.getSource().getGetFeatureInfoUrl(
            evt.coordinate, $scope.map.getView().getResolution(), $scope.map.getView().getProjection(), {
            'INFO_FORMAT': 'application/json',
            'propertyName': 'zonaref,macrodistr,subalcaldi,codigozona,macro,distrito'
          });
          var url_vias = vias_udit.getSource().getGetFeatureInfoUrl(
            evt.coordinate, $scope.map.getView().getResolution(), $scope.map.getView().getProjection(), {
            'INFO_FORMAT': 'application/json',
            'propertyName': 'nombrevia,tipovia'
          });
          reqwest({
            url: url_zonas,
            type: 'json',
          }).then(function (data) {
            var feature = data.features[0];
            var cod = feature.properties;
          });
          reqwest({
            url: url_vias,
            type: 'json',
          }).then(function (data) {
            var feature = data.features[0];
            if (feature == undefined) {
            }
            else {
              var cod = feature.properties;
            }
          });
        }
        var feature = new ol.Feature(
          new ol.geom.Point(ol.proj.fromLonLat(centro_1))
        );
        feature.setStyle(iconStylep);
        vectorSource.addFeature(feature);
      });
      var positions =
        [
          { name: "CENTRAL", pos: [-7584575.389127423986793, -1862343.043682825984433], zoom: 17 },
          { name: "EL ROSARIO", pos: [-7585334.050879356451333, -1862239.9863074591849], zoom: 17 },
          { name: "MIRAFLORES", pos: [-7583254.50954529736191, -1862010.036386856343597], zoom: 17 },
          { name: "MIRAFLORES SUR", pos: [-7583055.178539209999144, -1863615.049259479390457], zoom: 17 },
          { name: "SAN SEBASTIAN", pos: [-7585442.824538857676089, -1861826.247660768451169], zoom: 17 },
          { name: "SANTA BARBARA", pos: [-7583974.984731253236532, -1862690.543432838283479], zoom: 17 },
          { name: "8 DE DICIEMBRE", pos: [-7584748.066591577604413, -1864890.710699074435979], zoom: 17 },
          { name: "BAJO LLOJETA", pos: [-7583142.230117241851985, -1865823.243447743123397], zoom: 17 },
          { name: "BELEN", pos: [-7585074.674997083842754, -1862692.293808240443468], zoom: 17 },
          { name: "BELLO HORIZONTE", pos: [-7585290.624263345263898, -1863809.083335365634412], zoom: 17 },
          { name: "SOPOCACHI ALTO", pos: [-7584707.215883921831846, -1864106.894659134792164], zoom: 17 },
          { name: "FARO MURILLO", pos: [-7586858.611691223457456, -1863764.773887964198366], zoom: 17 },
          { name: "LAS LOMAS", pos: [-7585173.666602561250329, -1865391.871765763731673], zoom: 17 },
          { name: "LLOJETA", pos: [-7584662.395358731038868, -1866533.877968890825287], zoom: 17 },
          { name: "OBISPO BOSQUE", pos: [-7585435.508878928609192, -1864837.927322140429169], zoom: 17 },
          { name: "PASANKERI", pos: [-7585767.764774272218347, -1865537.58297059731558], zoom: 17 },
          { name: "SAN JUAN DE COTAHUMA", pos: [-7586306.866494508460164, -1864478.913437245413661], zoom: 17 },
          { name: "SAN PEDRO", pos: [-7584780.67906707059592, -1863200.836958569008857], zoom: 17 },
          { name: "SAN PEDRO ALTO", pos: [-7585399.338494156487286, -1863318.893120896304026], zoom: 17 },
          { name: "SOPOCACHI", pos: [-7584123.997609419748187, -1864265.001257843337953], zoom: 17 },
          { name: "SOPOCACHI BAJO", pos: [-7583627.402222845703363, -1864949.447272849734873], zoom: 17 },
          { name: "TACAGUA", pos: [-7585947.916534631513059, -1863928.570672059897333], zoom: 17 },
          { name: "ALTO TACAGUA", pos: [-7586464.408974840305746, -1864116.116282521281391], zoom: 17 },
          { name: "TEMBLADERANI", pos: [-7585348.244538004510105, -1864355.268725552363321], zoom: 17 },
          { name: "TUPAC AMARU", pos: [-7586210.394282031804323, -1864839.748238522326574], zoom: 17 },
          { name: "VILLA NUEVO POTOSI", pos: [-7586154.456157615408301, -1863450.120637079235166], zoom: 17 },
          { name: "ARANJUEZ", pos: [-7581200.774069448933005, -1869436.353795574279502], zoom: 17 },
          { name: "HUACALLANI", pos: [-7573260.989794577471912, -1871550.958630996989086], zoom: 17 },
          { name: "ISLA VERDE", pos: [-7581154.668572027236223, -1870760.950427461415529], zoom: 17 },
          { name: "JUPAPINA", pos: [-7577541.409126745536923, -1874366.538863426772878], zoom: 17 },
          { name: "MALLASA", pos: [-7578749.671328227035701, -1871347.286766723031178], zoom: 17 },
          { name: "MALLASILLA", pos: [-7580769.777354169636965, -1870271.172185633098707], zoom: 17 },
          { name: "14 DE SEPTIEMBRE", pos: [-7585968.517929330468178, -1862274.456255996366963], zoom: 17 },
          { name: "23 DE MARZO LA HOYADA", pos: [-7587483.163100826554, -1863105.305639019934461], zoom: 17 },
          { name: "ALTO CIUDADELA", pos: [-7586805.824034798890352, -1857562.564819663297385], zoom: 17 },
          { name: "VILLA ANTOFAGASTA", pos: [-7588393.181135034188628, -1861710.975596196483821], zoom: 17 },
          { name: "ALTO MARISCAL SANTA CRUZ", pos: [-7587820.542018600739539, -1862091.365827252622694], zoom: 17 },
          { name: "ALTO MUNAYPATA CUSICANCHA", pos: [-7587944.357111064717174, -1860873.340048674726859], zoom: 17 },
          { name: "ALTO PURA PURA", pos: [-7587492.952691739425063, -1858246.204243602231145], zoom: 17 },
          { name: "SAGRADO CORAZON DE JESUS", pos: [-7586936.598027259111404, -1863251.761214685626328], zoom: 17 },
          { name: "UNION ALIANZA", pos: [-7588209.25594993494451, -1859702.988275178475305], zoom: 17 },
          { name: "MARISCAL SANTA CRUZ", pos: [-7587352.45905127748847, -1861817.860730615677312], zoom: 17 },
          { name: "EL TEJAR", pos: [-7587137.232291190885007, -1862340.195488650118932], zoom: 17 },
          { name: "BARRIO LINDO", pos: [-7587217.357083014212549, -1863206.92454343335703], zoom: 17 },
          { name: "CAJA FERROVIARIA", pos: [-7586348.995702271349728, -1856852.145127942785621], zoom: 17 },
          { name: "CALLAMPAYA", pos: [-7586493.587536536157131, -1862129.417951250215992], zoom: 17 },
          { name: "CHAMOCO CHICO", pos: [-7586980.342528648674488, -1862884.132513507967815], zoom: 17 },
          { name: "CHUALLUMA", pos: [-7587537.774060629308224, -1862388.166171441087499], zoom: 17 },
          { name: "CIUDADELA FERROVIARIA", pos: [-7586543.77658115234226, -1857956.17481010989286], zoom: 17 },
          { name: "GRAN PODER", pos: [-7585651.610807147808373, -1862732.332019188674167], zoom: 17 },
          { name: "HUACATAQUI", pos: [-7587683.315389631316066, -1862728.677742580417544], zoom: 17 },
          { name: "LA PORTADA", pos: [-7588250.318409558385611, -1861593.309383704792708], zoom: 17 },
          { name: "LOS ANDES", pos: [-7586248.442233351059258, -1862591.06972394650802], zoom: 17 },
          { name: "MUNAYPATA", pos: [-7587444.859195145778358, -1861308.837057073833421], zoom: 17 },
          { name: "OBISPO INDABURO", pos: [-7586253.948639475740492, -1862837.323284632293507], zoom: 17 },
          { name: "PURA PURA", pos: [-7586463.155256864614785, -1860361.236305014463142], zoom: 17 },
          { name: "RINCON LA PORTADA", pos: [-7588401.164816685020924, -1860986.100798856467009], zoom: 17 },
          { name: "CHIJINI", pos: [-7586600.004494304768741, -1863172.248001657659188], zoom: 17 },
          { name: "VILLA VICTORIA", pos: [-7586564.490867748856544, -1861656.755053364904597], zoom: 17 },
          { name: "27 DE MAYO", pos: [-7584229.946807553991675, -1860745.617805159185082], zoom: 17 },
          { name: "3 DE MAYO", pos: [-7582410.433675794862211, -1858512.20621913461946], zoom: 17 },
          { name: "ACHACHICALA", pos: [-7586419.54581409599632, -1859242.275827085133642], zoom: 17 },
          { name: "AGUA DE LA VIDA", pos: [-7584214.513950261287391, -1861646.218446695012972], zoom: 17 },
          { name: "AGUA DE LA VIDA NORTE", pos: [-7584159.113460076972842, -1861133.99202243774198], zoom: 17 },
          { name: "ALTO LA MERCED", pos: [-7583083.630136646330357, -1858628.300866358680651], zoom: 17 },
          { name: "ALTO LAS DELICIAS", pos: [-7583713.436358477920294, -1859454.848433757899329], zoom: 17 },
          { name: "ALTO VINO TINTO", pos: [-7585891.713526440784335, -1859729.483823749003932], zoom: 17 },
          { name: "BARRIO GRAFICO", pos: [-7582914.426172704435885, -1860559.144622958265245], zoom: 17 },
          { name: "BARRIO PETROLERO", pos: [-7582601.689698295667768, -1860105.826998739968985], zoom: 17 },
          { name: "CHALLAPAMPA", pos: [-7585548.969299544580281, -1861156.450974193867296], zoom: 17 },
          { name: "CHUQUIAGUILLO", pos: [-7581337.959845637902617, -1858100.91390790999867], zoom: 17 },
          { name: "CONDORINI", pos: [-7582881.369746356271207, -1858434.673640359658748], zoom: 17 },
          { name: "CUPILUPACA", pos: [-7584135.720153969712555, -1860347.630793693242595], zoom: 17 },
          { name: "HUAYCHANI", pos: [-7582182.17956683691591, -1859535.554873832967132], zoom: 17 },
          { name: "KALAJAHUIRA", pos: [-7580267.188570158556104, -1857108.826984283979982], zoom: 17 },
          { name: "KAMIRPATA", pos: [-7586171.215681899338961, -1859161.369320353725925], zoom: 17 },
          { name: "KOCHAPAMPA", pos: [-7581556.965090903453529, -1858800.72512088296935], zoom: 17 },
          { name: "LA MERCED", pos: [-7582927.855331616476178, -1859243.455617816653103], zoom: 17 },
          { name: "LAS DELICIAS", pos: [-7583386.917237648740411, -1859649.061720251105726], zoom: 17 },
          { name: "LAS NIEVES", pos: [-7585887.164701138623059, -1856768.378226893488318], zoom: 17 },
          { name: "LIMANIPATA", pos: [-7585472.751124052330852, -1855769.221358699025586], zoom: 17 },
          { name: "MIRAFLORES ALTO", pos: [-7583556.066997868940234, -1860659.493838639231399], zoom: 17 },
          { name: "PLAN AUTOPISTA", pos: [-7586068.087455393746495, -1857895.685788345290348], zoom: 17 },
          { name: "POKENI CHAPUMA", pos: [-7583649.126864579506218, -1860099.3574275940191], zoom: 17 },
          { name: "ROSASANI", pos: [-7583634.483963656239212, -1858983.383918674197048], zoom: 17 },
          { name: "SAN JUAN", pos: [-7583805.377016878686845, -1861811.876407221890986], zoom: 17 },
          { name: "SAN JUAN LAZARETO", pos: [-7583818.871678208932281, -1861233.216576041188091], zoom: 17 },
          { name: "SANTA ROSA", pos: [-7583851.10124590806663, -1860485.379238266963512], zoom: 17 },
          { name: "SANTA ROSA TIJI", pos: [-7584047.102831547148526, -1859836.493263468611985], zoom: 17 },
          { name: "SANTIAGO DE LACAYA", pos: [-7584315.712182273156941, -1859154.527811831794679], zoom: 17 },
          { name: "TANGANI", pos: [-7585399.539247383363545, -1857874.56223296164535], zoom: 17 },
          { name: "URKUPIÑA", pos: [-7583148.745729890652001, -1857866.803474461426958], zoom: 17 },
          { name: "VILLA 18 DE MAYO", pos: [-7585915.853044949471951, -1860148.806745241396129], zoom: 17 },
          { name: "VILLA DE LA CRUZ", pos: [-7584660.278235969133675, -1861118.480471759336069], zoom: 17 },
          { name: "VILLA EL CARMEN", pos: [-7582269.301103976555169, -1858888.648474775021896], zoom: 17 },
          { name: "VILLA FATIMA", pos: [-7582956.654733026400208, -1860004.853408654686064], zoom: 17 },
          { name: "VILLA PABON", pos: [-7584042.478899341076612, -1862044.264504177495837], zoom: 17 },
          { name: "VINO TINTO", pos: [-7585502.158879031427205, -1860543.154278266243637], zoom: 17 },
          { name: "ZONA NORTE", pos: [-7584794.178734118118882, -1861518.050444986205548], zoom: 17 },
          { name: "24 DE JUNIO", pos: [-7581870.932806400582194, -1860317.267436271067709], zoom: 17 },
          { name: "CALLAPA", pos: [-7579760.428931327536702, -1862828.629910174757242], zoom: 17 },
          { name: "CIUDAD DEL NIÑO", pos: [-7580119.272505860775709, -1861926.038844330934808], zoom: 17 },
          { name: "CUARTO CENTENARIO", pos: [-7582224.759401317685843, -1864372.277023858157918], zoom: 17 },
          { name: "ESCOBAR URIA", pos: [-7581861.07794851064682, -1861789.845424922183156], zoom: 17 },
          { name: "KUPINI", pos: [-7580702.712056228891015, -1863772.968938525998965], zoom: 17 },
          { name: "PACASA", pos: [-7582242.604598212987185, -1860855.118173870723695], zoom: 17 },
          { name: "PAMPAHASI", pos: [-7581262.593644492328167, -1862458.634054996073246], zoom: 17 },
          { name: "PRIMAVERA", pos: [-7580512.163242063485086, -1860281.465106666786596], zoom: 17 },
          { name: "SAN ANTONIO", pos: [-7582144.85304607078433, -1862610.599266275763512], zoom: 17 },
          { name: "SAN ISIDRO", pos: [-7581559.307691799476743, -1864025.557487776968628], zoom: 17 },
          { name: "SAN SIMON", pos: [-7582376.782298262231052, -1860186.045479797990993], zoom: 17 },
          { name: "VALLE DE LAS FLORES", pos: [-7580653.482863613404334, -1862592.111964323092252], zoom: 17 },
          { name: "VALLE HERMOSO", pos: [-7581872.608224695548415, -1861268.331739237299189], zoom: 17 },
          { name: "VILLA ARMONIA", pos: [-7582215.742416431196034, -1863740.985217806650326], zoom: 17 },
          { name: "VILLA COPACABANA", pos: [-7582628.105873658321798, -1861406.075947349891067], zoom: 17 },
          { name: "VILLA LITORAL", pos: [-7581677.113431815057993, -1863392.298785836203024], zoom: 17 },
          { name: "VILLA SALOME", pos: [-7580602.70865554921329, -1861315.842531692469493], zoom: 17 },
          { name: "ACHUMANI", pos: [-7577414.573940338566899, -1865745.344794997246936], zoom: 17 },
          { name: "ACHUMANI PORVENIR KANTUTAS", pos: [-7577547.437317503616214, -1866759.289408138720319], zoom: 17 },
          { name: "ALTO ACHUMANI", pos: [-7575918.886411567218602, -1864589.083988386904821], zoom: 17 },
          { name: "ALTO IRPAVI", pos: [-7578717.313126971013844, -1864677.796380328480154], zoom: 17 },
          { name: "ALTO OBRAJES", pos: [-7581568.982156996615231, -1865030.571529152337462], zoom: 17 },
          { name: "ALTO SEGUENCOMA", pos: [-7581294.144417535513639, -1866763.171759801451117], zoom: 17 },
          { name: "ARUNTAYA", pos: [-7578242.783758474513888, -1865181.452141001122072], zoom: 17 },
          { name: "AUQUISAMAÑA", pos: [-7578179.635179939679801, -1868390.259402561932802], zoom: 17 },
          { name: "ALTO CALACOTO", pos: [-7577020.366396177560091, -1868268.206016578245908], zoom: 17 },
          { name: "BELLA VISTA", pos: [-7580340.321901459246874, -1866130.180752525571734], zoom: 17 },
          { name: "BOLOGNIA", pos: [-7579893.902720748446882, -1865062.888733100844547], zoom: 17 },
          { name: "CALACOTO", pos: [-7579086.470360332168639, -1867482.664010311011225], zoom: 17 },
          { name: "CALIRI", pos: [-7579798.50655569601804, -1863759.724554466083646], zoom: 17 },
          { name: "CASEGURAL", pos: [-7574058.712366397492588, -1866438.286516410531476], zoom: 17 },
          { name: "CHASQUIPAMPA", pos: [-7575475.559805101715028, -1867228.929050863953307], zoom: 17 },
          { name: "CIUDADELA STRONGUISTA", pos: [-7577600.474686773493886, -1864091.744209086056799], zoom: 17 },
          { name: "CONDORES LAKOTA", pos: [-7576369.242782182060182, -1866174.219569551292807], zoom: 17 },
          { name: "COQUENI", pos: [-7575133.421287257224321, -1866717.511302017141134], zoom: 17 },
          { name: "COTA COTA", pos: [-7576851.195173903368413, -1867505.947315374854952], zoom: 17 },
          { name: "GRAMADAL", pos: [-7580608.512332336045802, -1868083.899038502248004], zoom: 17 },
          { name: "HUANTAQUI", pos: [-7576013.411894388496876, -1865397.393743685213849], zoom: 17 },
          { name: "HUANCANE", pos: [-7574633.349048878066242, -1865878.316699963295832], zoom: 17 },
          { name: "HUANU HUANUNI", pos: [-7580770.138764542527497, -1865570.10413537803106], zoom: 17 },
          { name: "HUAYLLANI", pos: [-7574620.258624342270195, -1863757.093436109367758], zoom: 17 },
          { name: "VIRGEN DE COPACABANA", pos: [-7574350.298567577265203, -1868087.521722486242652], zoom: 17 },
          { name: "IRPAVI", pos: [-7579292.946862655691803, -1865578.051428287290037], zoom: 17 },
          { name: "IRPAVI II", pos: [-7578769.239181567914784, -1862735.936850840691477], zoom: 17 },
          { name: "CHIJIPATA", pos: [-7574574.12801768630743, -1863435.484964594710618], zoom: 17 },
          { name: "KESINI", pos: [-7575007.764225488528609, -1866332.292329096468166], zoom: 17 },
          { name: "KOANI", pos: [-7578591.411408574320376, -1866287.169425025349483], zoom: 17 },
          { name: "KUPILLANI CODAVISA", pos: [-7574368.662123691290617, -1867532.492788660805672], zoom: 17 },
          { name: "LA FLORIDA", pos: [-7579430.290499017573893, -1868492.773829154903069], zoom: 17 },
          { name: "LOS PINOS", pos: [-7577923.902832310646772, -1867803.532334489515051], zoom: 17 },
          { name: "LOS ROSALES", pos: [-7575516.8683429248631, -1864255.73324583703652], zoom: 17 },
          { name: "LOS ROSALES ALTO CALACOTO", pos: [-7575124.179243098013103, -1867835.63353370805271], zoom: 17 },
          { name: "MESETA ACHUMANI", pos: [-7578231.549248016439378, -1866145.873688667779788], zoom: 17 },
          { name: "OBRAJES", pos: [-7581709.929666577838361, -1865676.286957937991247], zoom: 17 },
          { name: "OVEJUYO", pos: [-7573412.213621910661459, -1866755.963299581548199], zoom: 17 },
          { name: "OVEJUYO EL ARENAL", pos: [-7573146.819741238839924, -1867561.153219840023667], zoom: 17 },
          { name: "PEDREGAL", pos: [-7575683.985033422708511, -1868380.428158273920417], zoom: 17 },
          { name: "ROSAS DE CALACALANI", pos: [-7573738.115373941138387, -1865923.218727274332196], zoom: 17 },
          { name: "SAN MIGUEL", pos: [-7578528.617541827261448, -1867732.386491046985611], zoom: 17 },
          { name: "SEGUENCOMA BAJO", pos: [-7580588.809920757077634, -1867098.02254404919222], zoom: 17 },
          { name: "VENTILLA", pos: [-7580137.30264147464186, -1867127.270347015466541], zoom: 17 },
          { name: "VERGEL", pos: [-7578882.3064289316535, -1863407.695347341243178], zoom: 17 },
          { name: "VILLA APAÑA", pos: [-7572655.011713838204741, -1868284.801278015598655], zoom: 17 },
          { name: "VIRGEN DE LA MERCED", pos: [-7574273.656202050857246, -1867074.717927056131884], zoom: 17 },
          { name: "WILACOTA", pos: [-7574274.904636557213962, -1866003.053984515136108], zoom: 17 },
          { name: "INCA LLOJETA", pos: [-7585589.117314196191728, -1866368.384293087292463], zoom: 17 },
          { name: "SAN JORGE", pos: [-7583506.305569479241967, -1863823.559384596301243], zoom: 17 },
          { name: "ALTO SAGRADO CORAZON DE JESUS", pos: [-7587219.329540045931935, -1863431.70383109874092], zoom: 17 },
          { name: "ALTO LA FLORIDA", pos: [-7579056.350696032866836, -1868161.18444691807963], zoom: 17 },
          { name: "SANTA RITA", pos: [-7577233.270060525275767, -1868661.292841135058552], zoom: 17 },
          { name: "JARDINES DEL SUR", pos: [-7576035.006058088503778, -1864027.7378771584481], zoom: 17 },
          { name: "KELLUMANI", pos: [-7575259.562787232920527, -1863351.136840760940686], zoom: 17 },
          { name: "JURENKO", pos: [-7576131.337519105523825, -1863849.313985739834607], zoom: 17 },
          { name: "AMOR DE DIOS", pos: [-7580190.244221467524767, -1868885.565226703183725], zoom: 17 },
          { name: "ALTO TEJAR", pos: [-7587387.017981482669711, -1862759.461370324250311], zoom: 17 },
          { name: "ALPACOMA", pos: [-7585149.640104291029274, -1867158.259184121387079], zoom: 17 },
          { name: "SAN ALBERTO", pos: [-7579854.153370961546898, -1866506.461370793636888], zoom: 17 },
          { name: "CHINCHAYA", pos: [-7579172.16243804898113, -1861046.481197626097128], zoom: 17 },
          { name: "CHICANI", pos: [-7578185.114695341326296, -1861076.593721435405314], zoom: 17 },
          { name: "COTAHUMA", pos: [-7585611.504907376132905, -1864588.103705125162378], zoom: 17 },
          { name: "ALTO PURA PURA SAN SEBASTIAN", pos: [-7586682.196477663703263, -1856774.073530652560294], zoom: 17 },
          { name: "KANTUTANI", pos: [-7583448.291622105054557, -1864442.811048134695739], zoom: 17 },
          { name: "ALTO PURA PURA ALTO SAN PEDRO", pos: [-7586688.594827311113477, -1856104.460680505027995], zoom: 17 },
          { name: "LOMAS DE ACHUMANI", pos: [-7575634.770889706909657, -1866240.844477463979274], zoom: 17 },
          { name: "LIPARI", pos: [-7577041.639747112058103, -1874675.380580195225775], zoom: 17 },
          { name: "ALTO VILLA VICTORIA", pos: [-7588212.674174014478922, -1860351.667790911858901], zoom: 17 },
          { name: "CHIARAQUE", pos: [-7575910.365170025266707, -1869583.783041697461158], zoom: 17 }
        ];

      var search = new ol.control.Search(
        {
          getTitle: function (f) { return f.name; },
          autocomplete: function (s, cback) {
            var result = [];
            var rex = new RegExp(s.replace("*", "") || "\.*", "i");
            for (var i = 0; i < positions.length; i++) {
              if (rex.test(positions[i].name))
                result.push(positions[i]);
            }
            return result;
          }
        });
      $scope.map.addControl(search);
      search.on('select', function (e) {
        var n = e.search.name;
        var c = 0;
        var geo_zona;
        var myStyleZonas = new ol.style.Style({
          stroke: new ol.style.Stroke({ color: '#FF8000', width: 5 }),
          fill: new ol.style.Fill({ color: 'transparent' })
        });
        $scope.map.removeLayer(vectorLayerZonas);
        for (var i = 0; i < geo_zonas.features.length; i++) {
          var nombre_zona = geo_zonas.features[i].properties.zonaref;
          var x_c = geo_zonas_centroides.features[i].geometry.coordinates[0];
          var y_c = geo_zonas_centroides.features[i].geometry.coordinates[1];
          if (n === nombre_zona) {
            c = c + 1;
            geo_zona = geo_zonas.features[i];
            var xx = x_c;
            var yy = y_c;
          }
        }
        if (c > 0) {
          geo_zona = JSON.stringify(geo_zona);
          vectorLayerZonas.setSource(new ol.source.Vector({
            features: (new ol.format.GeoJSON({ defaultDataProjection: 'EPSG:3857' })).readFeatures(geo_zona)
          }));
          vectorLayerZonas.setStyle(myStyleZonas);
          $scope.map.addLayer(vectorLayerZonas);
          $scope.map.getView().setCenter([xx, yy]);
          $scope.map.getView().setZoom(15);
          setTimeout(function () {
            vectorLayerZonas.getSource().clear();
          }, 2000);
        }
        $scope.map.getView().animate({
          center: e.search.pos,
          zoom: 15,
          easing: ol.easing.easeOut
        })
      });
    }, 200);
  };
  $scope.tipoUbicacionDinamico = function (data) {
    if (data == 1 && $scope.datos.PE_T_PERMISO_VALOR == 'PARADA MOMENTANEA') {
      $scope.div_municipal = false;
      $scope.div_zonal = true;
      $scope.div_boton_agregar_ubicacion = true;
    } else if (data == 1 && $scope.datos.PE_T_PERMISO_VALOR == 'ESTACIONAMIENTO') {
      $scope.div_municipal = false;
      $scope.div_zonal = true;
      $scope.div_boton_agregar_ubicacion = false;
    } else if (data == 1 && $scope.datos.PE_T_PERMISO_VALOR == 'CIERRE DE VIAS') {
      $scope.div_municipal = false;
      $scope.div_zonal = true;
      $scope.div_boton_agregar_ubicacion = false;
    } else if (data == "") {
      $scope.div_municipal = false;
      $scope.div_zonal = false;
      $scope.div_boton_agregar_ubicacion = false;
    } else if (data == 2) {
      $scope.div_municipal = true;
      $scope.div_zonal = false;
      $scope.div_boton_agregar_ubicacion = false;
    }
  }
  $scope.cargarMacrodistritos = function () {
    var datosP = new macrodistritoLst();
    datosP.obtmacro(function (resultado) {
      data = JSON.parse(resultado);
      if (data.success.length > 0) {
        $scope.aMacrodistritos = data.success;
      } else {
        $scope.msg = "Error !!";
      }
    });
  }
  $scope.listaZona = function (idMacroJ) {
    var idMacro = "";
    if ($scope.aMacrodistritos) {
      angular.forEach($scope.aMacrodistritos, function (value, key) {
        if (value.mcdstt_macrodistrito == idMacroJ) {
          idMacro = value.mcdstt_id;
        }
      });
    }
    $scope.datos.PE_MACRO = idMacro;
    $scope.aDistritoZona = {};
    try {
      if (idMacroJ.length != 0) {
        var parametros = new distritoZona();
        parametros.idMacro = idMacro;
        parametros.obtdist(function (resultado) {
          data = JSON.parse(resultado);
          if (data.success.length > 0) {
            $scope.aDistritoZona = data.success;
            conso
          } else {
            $scope.msg = "Error !!";
          }
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  }
  $scope.listaDistrito = function (idMacroJ) {
    for (var i = 0; i < $scope.aDistritoZona.length; i++) {
      if (idMacroJ == $scope.aDistritoZona[i].dist_nombre) {
        $scope.datos.PE_DISTRI = $scope.aDistritoZona[i].dist_dstt_id;
        $scope.datos.PE_ZONA = $scope.aDistritoZona[i].dist_id;
      }
    }
  }
  $scope.ejecutarFile = function (idfile) {
    var sid = document.getElementById(idfile);
    if (sid) {
      document.getElementById(idfile).click();
    } else {
      alert("Error ");
    }
  }

  $scope.cambiarFile = function (obj, valor) {
    var arraydoc = ["pdf", "doc", "docx", ".docx", ".docxlm"];
    $scope.registroAdj = [];
    var fechaNueva = "";
    var fechaserver = new fechaHoraServer();
    fechaserver.fechahora(function (resp) {
      var sfecha = JSON.parse(resp);
      var fechaServ = (sfecha.success.fecha).split(' ');
      var fecha_ = fechaServ[0].split('-');
      var hora_ = fechaServ[1].split(':');
      fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1];
    });
    $.blockUI();
    setTimeout(function () {
      var nombre = obj.getAttribute("name");
      var objarchivo = obj.files[0];
      $scope.FILE_LIC_FUN_AE = obj.files[0];
      $scope.FILE_CERTIFICADO_DE_PRO_REG_VEH = obj.files[0];
      $scope.FILE_SOAT = obj.files[0];
      $scope.FILE_VINCULACION_PERDONA = obj.files[0];
      $scope.FILE_TARJETA_MUNICIPAL = obj.files[0];
      $scope.FILE_SIN_DEUDAS_IMPUESTOS = obj.files[0];
      $scope.FILE_RESOLUCION_ADMINISTRATIVA = obj.files[0];
      $scope.FILE_CROQUIS = obj.files[0];
      $scope.FILE_CONTRA_OBRAS_CIVIL = obj.files[0];
      $scope.FILE_CROQUIS_UBI_VIA_PERMISO = obj.files[0];
      $scope.FILE_PERMISO_CONSTRUCCION = obj.files[0];
      $scope.FILE_AUTO_TIERRA = obj.files[0];
      $scope.FILE_PLANOS_APRO = obj.files[0];
      $scope.FILE_PLAN_MANEJO_TRAFICO = obj.files[0];
      $scope.FILE_LICENCIA_FUNCIONAMIENTO_AE = obj.files[0];
      $scope.FILE_CONFORMIDAD_SEC_MUN_CUL = obj.files[0];
      $scope.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD = obj.files[0];
      $scope.FILE_PLAN_TRAFICO = obj.files[0];
      $scope.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD_2 = obj.files[0];
      $scope.FILE_PLAN_TRAFICO_2 = obj.files[0];
      $scope.FILE_OTRAS_MANIFESTACIONES = obj.files[0];
      $scope.FILE_TARJETA_CONDUCTOR = obj.files[0];
      var oidCiudadano = sessionService.get('IDSOLICITANTE');
      $scope.direccionvirtual = "RC_CLI";
      var sDirTramite = $scope.datos.PE_CI;
      var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/" + sDirTramite + "/";
      if (nombre == 'FILE_LIC_FUN_AE' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_LIC_FUN_AE = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_LIC_FUN_AE = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover1 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_LIC_FUN_AE = "";
            $scope.FILE_LIC_FUN_AE = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_CERTIFICADO_DE_PRO_REG_VEH' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_CERTIFICADO_DE_PRO_REG_VEH = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover2 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH = "";
            $scope.FILE_CERTIFICADO_DE_PRO_REG_VEH = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_SOAT' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_SOAT = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_SOAT = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover3 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_SOAT = "";
            $scope.FILE_SOAT = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_VINCULACION_PERDONA' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_VINCULACION_PERDONA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_VINCULACION_PERDONA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover4 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_VINCULACION_PERDONA = "";
            $scope.FILE_VINCULACION_PERDONA = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_TARJETA_MUNICIPAL' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_TARJETA_MUNICIPAL = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_TARJETA_MUNICIPAL = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover5 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_TARJETA_MUNICIPAL = "";
            $scope.FILE_TARJETA_MUNICIPAL = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_SIN_DEUDAS_IMPUESTOS' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_SIN_DEUDAS_IMPUESTOS = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_SIN_DEUDAS_IMPUESTOS = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover6 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_SIN_DEUDAS_IMPUESTOS = "";
            $scope.FILE_SIN_DEUDAS_IMPUESTOS = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_RESOLUCION_ADMINISTRATIVA' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_RESOLUCION_ADMINISTRATIVA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_RESOLUCION_ADMINISTRATIVA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover7 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_RESOLUCION_ADMINISTRATIVA = "";
            $scope.FILE_RESOLUCION_ADMINISTRATIVA = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_CROQUIS' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_CROQUIS = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_CROQUIS = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover8 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_CROQUIS = "";
            $scope.FILE_CROQUIS = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_CONTRA_OBRAS_CIVIL' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_CONTRA_OBRAS_CIVIL = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_CONTRA_OBRAS_CIVIL = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover9 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_CONTRA_OBRAS_CIVIL = "";
            $scope.FILE_CONTRA_OBRAS_CIVIL = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_CROQUIS_UBI_VIA_PERMISO' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_CROQUIS_UBI_VIA_PERMISO = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_CROQUIS_UBI_VIA_PERMISO = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover10 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_CROQUIS_UBI_VIA_PERMISO = "";
            $scope.FILE_CROQUIS_UBI_VIA_PERMISO = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_PERMISO_CONSTRUCCION' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_PERMISO_CONSTRUCCION = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_PERMISO_CONSTRUCCION = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover11 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_PERMISO_CONSTRUCCION = "";
            $scope.FILE_PERMISO_CONSTRUCCION = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_AUTO_TIERRA' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_AUTO_TIERRA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_AUTO_TIERRA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover12 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_AUTO_TIERRA = "";
            $scope.FILE_AUTO_TIERRA = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_PLANOS_APRO' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_PLANOS_APRO = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_PLANOS_APRO = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover13 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_PLANOS_APRO = "";
            $scope.FILE_PLANOS_APRO = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_PLAN_MANEJO_TRAFICO' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_PLAN_MANEJO_TRAFICO = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_PLAN_MANEJO_TRAFICO = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover14 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_PLAN_MANEJO_TRAFICO = "";
            $scope.FILE_PLAN_MANEJO_TRAFICO = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_LICENCIA_FUNCIONAMIENTO_AE' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_LICENCIA_FUNCIONAMIENTO_AE = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_LICENCIA_FUNCIONAMIENTO_AE = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover15 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_LICENCIA_FUNCIONAMIENTO_AE = "";
            $scope.FILE_LICENCIA_FUNCIONAMIENTO_AE = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_CONFORMIDAD_SEC_MUN_CUL' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_CONFORMIDAD_SEC_MUN_CUL = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_CONFORMIDAD_SEC_MUN_CUL = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover16 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_CONFORMIDAD_SEC_MUN_CUL = "";
            $scope.FILE_CONFORMIDAD_SEC_MUN_CUL = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_DET_VIAS_RECORRIDO_ACTIVIDAD' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover17 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD = "";
            $scope.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_PLAN_TRAFICO' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_PLAN_TRAFICO = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_PLAN_TRAFICO = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover18 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_PLAN_TRAFICO = "";
            $scope.FILE_PLAN_TRAFICO = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_DET_VIAS_RECORRIDO_ACTIVIDAD_2' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD_2 = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD_2 = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover19 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD_2 = "";
            $scope.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD_2 = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_PLAN_TRAFICO_2' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_PLAN_TRAFICO_2 = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_PLAN_TRAFICO_2 = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover20 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_PLAN_TRAFICO_2 = "";
            $scope.FILE_PLAN_TRAFICO_2 = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_OTRAS_MANIFESTACIONES' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_OTRAS_MANIFESTACIONES = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_OTRAS_MANIFESTACIONES = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover21 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_OTRAS_MANIFESTACIONES = "";
            $scope.FILE_OTRAS_MANIFESTACIONES = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
      if (nombre == 'FILE_TARJETA_CONDUCTOR' && (typeof (obj.files[0]) != 'undefined')) {
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
          if (objarchivo.size <= 15000000) {
            var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
            fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
            $scope.datos.FILE_TARJETA_CONDUCTOR = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.FILE_TARJETA_CONDUCTOR = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            document.getElementById("txt_" + nombre).value = nombreNuevo;
            document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
            $scope.btover22 = "mostrar";
          } else {
            swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
            document.getElementById("txt_" + nombre).value = "";
            document.getElementById("href_" + nombre).href = "";
            $scope.registroAdj.adjunto = '';
            $scope.adjunto = '';
            valor = '';
            $scope.datos.FILE_TARJETA_CONDUCTOR = "";
            $scope.FILE_TARJETA_CONDUCTOR = "";
            $.unblockUI();
          }
        } else {
          swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
          document.getElementById("txt_" + nombre).value = "";
          document.getElementById("href_" + nombre).href = "";
          $scope.registroAdj.adjunto = '';
          $scope.adjunto = '';
          valor = '';
          $.unblockUI();
        }
      }
    }, 1000);
    $.unblockUI();
  }

  $scope.adjuntoUno = function () {
    datoObjectFiles = [];
    var datoObjectFile1 = new Object();
    var datoObjectFile2 = new Object();
    var datoObjectFile3 = new Object();
    var datoObjectFile4 = new Object();
    var datoObjectFile5 = new Object();
    var datoObjectFile6 = new Object();
    var datoObjectFile7 = new Object();
    var datoObjectFile8 = new Object();
    var datoObjectFile9 = new Object();
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
    datoObjectFile1.url = $scope.datos.FILE_LIC_FUN_AE;
    datoObjectFile1.campo = $scope.datos.FILE_LIC_FUN_AE;
    datoObjectFile1.nombre = 'Licencia de Funcionamiento vigente en el caso de actividades económicas';
    datoObjectFile2.url = $scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH;
    datoObjectFile2.campo = $scope.datos.FILE_CERTIFICADO_DE_PRO_REG_VEH;
    datoObjectFile2.nombre = 'Certificado de Propiedad de Registro del Vehículo Automotor CPRVA-03, con radicatoria en el Municipio de La Paz, a nombre de la persona natural o juridica, pública o privada solicitante:';
    datoObjectFile3.url = $scope.datos.FILE_SOAT;
    datoObjectFile3.campo = $scope.datos.FILE_SOAT;
    datoObjectFile3.nombre = 'Póliza del Seguro Obligatorio de Accidentes de Transito (SOAT) vigente';
    datoObjectFile4.url = $scope.datos.FILE_VINCULACION_PERDONA;
    datoObjectFile4.campo = $scope.datos.FILE_VINCULACION_PERDONA;
    datoObjectFile4.nombre = 'Documento que demuestre la vinculación de la persona natural o jurídica , pública o privada solicitante , con los vehículos motorizados, mismo que debera incluir placas de circulación, nombre de los propietarios y vigencia';
    datoObjectFile5.url = $scope.datos.FILE_TARJETA_MUNICIPAL;
    datoObjectFile5.campo = $scope.datos.FILE_TARJETA_MUNICIPAL;
    datoObjectFile5.nombre = 'Tarjeta Municipal de Operación Vehicular, cuando corresponda';
    datoObjectFile6.url = $scope.datos.FILE_TARJETA_MUNICIPAL;
    datoObjectFile6.campo = $scope.datos.FILE_TARJETA_MUNICIPAL;
    datoObjectFile6.nombre = 'Tarjeta Municipal de Operación Vehicular, cuando corresponda';
    datoObjectFile7.url = $scope.datos.FILE_SIN_DEUDAS_IMPUESTOS;
    datoObjectFile7.campo = $scope.datos.FILE_SIN_DEUDAS_IMPUESTOS;
    datoObjectFile7.nombre = 'No tener deudas pendientes sobre impuestos a la propiedad de vehículos ni sanciones en materia de transpote urbano , estacionamientos y paradas momentáneas con el GAMLP';
    datoObjectFile8.url = $scope.datos.FILE_RESOLUCION_ADMINISTRATIVA;
    datoObjectFile8.campo = $scope.datos.FILE_RESOLUCION_ADMINISTRATIVA;
    datoObjectFile8.nombre = 'Resolución Administrativa vigente emitida por la Autoridad Tributaria Municipal de liberación de impuestos';
    datoObjectFile9.url = $scope.datos.FILE_CROQUIS;
    datoObjectFile9.campo = $scope.datos.FILE_CROQUIS;
    datoObjectFile9.nombre = 'Croquis de ubición de la vía donde solicita el permiso excepcional, para el caso de estacionamientos y paradas momentáneas, incierto en el Formulario de Solicitud';
    datoObjectFiles[0] = datoObjectFile1;
    datoObjectFiles[1] = datoObjectFile2;
    datoObjectFiles[2] = datoObjectFile3;
    datoObjectFiles[3] = datoObjectFile4;
    datoObjectFiles[4] = datoObjectFile5;
    datoObjectFiles[5] = datoObjectFile6;
    datoObjectFiles[6] = datoObjectFile7;
    datoObjectFiles[7] = datoObjectFile8;
    datoObjectFiles[8] = datoObjectFile9;
    $scope.datos.FileDocumentos = datoObjectFiles;
    $rootScope.FileAdjuntos = datoObjectFiles;
    $scope.datos.File_Adjunto = datoObjectFiles;
    $scope.guardar_tramite($scope.datos);
  }

  $scope.adjuntoDos = function () {
    datoObjectFiles = [];
    var datoObjectFile1 = new Object();
    var datoObjectFile2 = new Object();
    var datoObjectFile3 = new Object();
    var datoObjectFile4 = new Object();
    var datoObjectFile5 = new Object();
    var datoObjectFile6 = new Object();
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
    datoObjectFile1.url = $scope.datos.FILE_CONTRA_OBRAS_CIVIL;
    datoObjectFile1.campo = $scope.datos.FILE_CONTRA_OBRAS_CIVIL;
    datoObjectFile1.nombre = 'Contrato para la ejecución de obras civiles';
    datoObjectFile2.url = $scope.datos.FILE_CROQUIS_UBI_VIA_PERMISO;
    datoObjectFile2.campo = $scope.datos.FILE_CROQUIS_UBI_VIA_PERMISO;
    datoObjectFile2.nombre = 'Croquis de ubicación de la vía donde solicita el permiso excepcional';
    datoObjectFile3.url = $scope.datos.FILE_PERMISO_CONSTRUCCION;
    datoObjectFile3.campo = $scope.datos.FILE_PERMISO_CONSTRUCCION;
    datoObjectFile3.nombre = 'Permiso de Construcción';
    datoObjectFile4.url = $scope.datos.FILE_AUTO_TIERRA;
    datoObjectFile4.campo = $scope.datos.FILE_AUTO_TIERRA;
    datoObjectFile4.nombre = 'Autorización para movimiento de tierra';
    datoObjectFile5.url = $scope.datos.FILE_PLANOS_APRO;
    datoObjectFile5.campo = $scope.datos.FILE_PLANOS_APRO;
    datoObjectFile5.nombre = 'Planos aprobados por el GAMLP';
    datoObjectFile6.url = $scope.datos.FILE_PLAN_MANEJO_TRAFICO;
    datoObjectFile6.campo = $scope.datos.FILE_PLAN_MANEJO_TRAFICO;
    datoObjectFile6.nombre = 'Plan de manejo de Tráfico, para el caso de cierres de vías primarias y de vías secundarias o terciarias por donde circulen rutas del servicio público de transporte colectivo de pasajeros';
    datoObjectFiles[0] = datoObjectFile1;
    datoObjectFiles[1] = datoObjectFile2;
    datoObjectFiles[2] = datoObjectFile3;
    datoObjectFiles[3] = datoObjectFile4;
    datoObjectFiles[4] = datoObjectFile5;
    datoObjectFiles[5] = datoObjectFile6;
    $scope.datos.FileDocumentos = datoObjectFiles;
    $rootScope.FileAdjuntos = datoObjectFiles;
    $scope.datos.File_Adjunto = datoObjectFiles;
    $scope.guardar_tramite($scope.datos);
  }

  $scope.adjuntoTres = function () {
    datoObjectFiles = [];
    var datoObjectFile1 = new Object();
    var datoObjectFile2 = new Object();
    var datoObjectFile3 = new Object();
    var datoObjectFile4 = new Object();
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
    datoObjectFile1.url = $scope.datos.FILE_LICENCIA_FUNCIONAMIENTO_AE;
    datoObjectFile1.campo = $scope.datos.FILE_LICENCIA_FUNCIONAMIENTO_AE;
    datoObjectFile1.nombre = 'Licencia de Funcionamientro vigente de la actividad económica';
    datoObjectFile2.url = $scope.datos.FILE_CONFORMIDAD_SEC_MUN_CUL;
    datoObjectFile2.campo = $scope.datos.FILE_CONFORMIDAD_SEC_MUN_CUL;
    datoObjectFile2.nombre = 'Conformidad de la Secretaría Municipal de Culturas, de la respectiva Subalcaldía o de la Dirección de Desportes';
    datoObjectFile3.url = $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD;
    datoObjectFile3.campo = $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD;
    datoObjectFile3.nombre = 'Croquis con el detalle de vías y recorrido propuesto para la actividad';
    datoObjectFile4.url = $scope.datos.FILE_PLAN_TRAFICO;
    datoObjectFile4.campo = $scope.datos.FILE_PLAN_TRAFICO;
    datoObjectFile4.nombre = 'Plan de Manejo de Tráfico, para el caso de cierre de vías primarias y de vías secundarias o terciarias por donde circulen rutas del servicio público de transporte colectivo de pasajeros';
    datoObjectFiles[0] = datoObjectFile1;
    datoObjectFiles[1] = datoObjectFile2;
    datoObjectFiles[2] = datoObjectFile3;
    datoObjectFiles[3] = datoObjectFile4;
    $scope.datos.FileDocumentos = datoObjectFiles;
    $rootScope.FileAdjuntos = datoObjectFiles;
    $scope.datos.File_Adjunto = datoObjectFiles;
    $scope.guardar_tramite($scope.datos);
  }

  $scope.adjuntoCuatro = function () {
    datoObjectFiles = [];
    var datoObjectFile1 = new Object();
    var datoObjectFile2 = new Object();
    var datoObjectFile3 = new Object();
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
    datoObjectFile1.url = $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD_2;
    datoObjectFile1.campo = $scope.datos.FILE_DET_VIAS_RECORRIDO_ACTIVIDAD_2;
    datoObjectFile1.nombre = 'Croquis con el detalle de vías y recorrido propuesto para la actividad';
    datoObjectFile2.url = $scope.datos.FILE_PLAN_TRAFICO_2;
    datoObjectFile2.campo = $scope.datos.FILE_PLAN_TRAFICO_2;
    datoObjectFile2.nombre = 'Plan de Manejo de Tráfico, para el caso de cierre de vías primarias y de vías secundarias o terciarias por donde circulen rutas del servicio público de transporte colectivo de pasajeros';
    datoObjectFile3.url = $scope.datos.FILE_OTRAS_MANIFESTACIONES;
    datoObjectFile3.campo = $scope.datos.FILE_OTRAS_MANIFESTACIONES;
    datoObjectFile3.nombre = 'Otras manifestaciones folklóricas populares que no estén previstas en el calendario Festivo , Folklórico y Ritual';
    datoObjectFiles[0] = datoObjectFile1;
    datoObjectFiles[1] = datoObjectFile2;
    datoObjectFiles[2] = datoObjectFile3;
    $scope.datos.FileDocumentos = datoObjectFiles;
    $rootScope.FileAdjuntos = datoObjectFiles;
    $scope.datos.File_Adjunto = datoObjectFiles;
    $scope.guardar_tramite($scope.datos);
  }

  $scope.ultimoArrayAdjunto = function () {
    if ($scope.datos.PE_T_PERMISO_VALOR == 'PARADA MOMENTANEA' || $scope.datos.PE_T_PERMISO_VALOR == 'ESTACIONAMIENTO' || $scope.datos.PE_T_PERMISO_VALOR == 'AREA DE RESTRICCION VEHICULAR') {
      $scope.adjuntoUno();
    } else if ($scope.datos.PE_T_PERMISO_VALOR == 'CIERRE DE VIAS') {
      if ($scope.datos.PE_TIPO_CIERRE == '1' || $scope.datos.PE_TIPO_CIERRE == 1) {
        $scope.adjuntoDos();
      } else if ($scope.datos.PE_TIPO_CIERRE == '6' || $scope.datos.PE_TIPO_CIERRE == 6 || $scope.datos.PE_TIPO_CIERRE == '3' || $scope.datos.PE_TIPO_CIERRE == 3 || $scope.datos.PE_TIPO_CIERRE == '5' || $scope.datos.PE_TIPO_CIERRE == 5 || $scope.datos.PE_TIPO_CIERRE == '7' || $scope.datos.PE_TIPO_CIERRE == 7) {
        $scope.adjuntoTres();
      } else if ($scope.datos.PE_TIPO_CIERRE == '2' || $scope.datos.PE_TIPO_CIERRE == 2 || $scope.datos.PE_TIPO_CIERRE == '8' || $scope.datos.PE_TIPO_CIERRE == 8 || $scope.datos.PE_TIPO_CIERRE == '9' || $scope.datos.PE_TIPO_CIERRE == 9) {
        $scope.adjuntoCuatro();
      } else {
        $scope.guardar_tramite($scope.datos);
      }
    } else {
      swal('Advertencia', 'hubo un errror al momento de agregar los archivos', 'error');
    }

  }

}
