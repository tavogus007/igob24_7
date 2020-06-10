function misTransaccioneController($scope, $q, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, fileUpload1, $timeout,obtFechaActual, obtFechaCorrecta) {
    $scope.model = {
        startDate: new Date('09/21/2015'),
        endDate: new Date()
    };
    $scope.startDateOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
     };
    $scope.startDateOpen1 = function ($event) {
        console.log("$event",$event);
        console.log("$scope.startDateOpened1", $scope.startDateOpened1);
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened1 = true;
    };
    $scope.startDateOpen2 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened2 = true;
    };
    
    $scope.trmUsuario          = [];
    $scope.obtmisTransacciones = [];
    $scope.misAcEconomicas     = [];
    $scope.vistaInfo           = null; 
    $scope.vistaInfoTit        = null; 
    $scope.vistaInfoGenesis    = null;
    $scope.vistaInfoAE         = null;
    $scope.nomAEconomicasCombo = "";
    $scope.idAEconomicas;
    $scope.fechaIni;
    $scope.fechaFin;
    $scope.lstMistransacciones = function (fechaIni, fechaFin) {
        $.blockUI();
        console.log("iiii ",$scope.idAEconomicas);
        var idAE = $scope.idAEconomicas;
        //var idAE = "123456";
        console.log("idAE",idAE);
        var lstTransferencias = new lstTransaciones(); 
        lstTransferencias.id_actividadeconomica = idAE;
        lstTransferencias.fecha_inicio          = fechaIni;
        lstTransferencias.fecha_fin             = fechaFin;
        lstTransferencias.listaTransaciones(function(resp){
          var respuesta = JSON.parse(resp);
          console.log("respuesta", respuesta);
            if (respuesta.length > 0) {
                $scope.obtmisTransacciones = respuesta;
                var data = respuesta;
                $scope.tablaTransaciones.reload();
                $scope.vistaInfo = "mostrar";
                alertify.success("Exito...");
                $.unblockUI();
            } else {
                data = [];
                $scope.obtmisTransacciones = [];
                $scope.tablaTransaciones.reload();
                $.unblockUI();
                alertify.error("Transacciones no encontrados...");
                $scope.vistaInfo = "mostrar";

            }
            $("#fechaIni").val("");
            $("#fechaFin").val("");
        });
        $.unblockUI();
    }
    $scope.tablaTransaciones = new ngTableParams({
        page: 1,
        count: 20,
        filter: {},
        sorting: {}
    }, {
        total: $scope.obtmisTransacciones.length,
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.obtmisTransacciones, params.filter()) :
                $scope.obtmisTransacciones;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.$scope.obtmisTransacciones;
            params.total(orderedData.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.listarTransacciones = function () {
        $scope.fechaIni = $("#fechaIni").val();
        $scope.fechaFin = $("#fechaFin").val();
        if ($scope.fechaIni == "") {
            alertify.error("Seleccione una Fecha Inicio para la Busqueda...");
            return false;
        }
        if ($scope.fechaFin == "") {
            alertify.error("Seleccione una Fecha Fin para la Busqueda...");
            return false;
        }
        $scope.fechaIni = $scope.fechaIni.split("/");
        $scope.fechaIni = $scope.fechaIni[2] + "-" + $scope.fechaIni[1] + "-" + $scope.fechaIni[0];
        $scope.fechaFin = $scope.fechaFin.split("/");
        $scope.fechaFin = $scope.fechaFin[2] + "-" + $scope.fechaFin[1] + "-" + $scope.fechaFin[0];
        $scope.lstMistransacciones($scope.fechaIni, $scope.fechaFin);
    }
    $scope.detalleTransaccion = function (dataTrans) {
        $scope.comprador = dataTrans.comprador;
        $scope.montototal = dataTrans.monto_total;
        $scope.tppago = dataTrans.metodo_pago;
        $scope.detallesT = JSON.parse(dataTrans.detalle);
    }
    $scope.obtenerContribuyente = function () {
        var tipoContribuyente = sessionService.get('TIPO_PERSONA');
        if (tipoContribuyente == 'NATURAL') {
            ciDocumento = sessionService.get('CICIUDADANO');
            sAccion = 'C01';
            nitDocumento = '';
        } else if (tipoContribuyente == 'JURIDICO') {
            nitDocumento = sessionService.get('NITCIUDADANO');
            sAccion = 'C02';
            ciDocumento = '';
        }
        var conGenesis = new gLstDatos();
        conGenesis.idContribuyente = "";
        conGenesis.clase = "";
        conGenesis.padron = "";
        conGenesis.identificacion = ciDocumento;//'40852017'
        conGenesis.primerNombre = "";
        conGenesis.primerApellido = "";
        conGenesis.segundoApellido = "";
        conGenesis.nit = nitDocumento;
        conGenesis.empresa = "";
        conGenesis.p_accion = sAccion;
        conGenesis.lstDatosContribuyente(function (resultado) {
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                var response = resultadoApi;
                $scope.txtMsgConexionGen = "";
                if (response.success.dataSql.length > 0) {
                    $scope.dataGenesisCidadano = response.success.dataSql;
                    $scope.listadoActividadesEconomicas();
                } else {
                    $scope.dataGenesisCidadano = '';
                    $scope.vistaInfo         = null;
                    $scope.vistaInfoGenesis  = "mostrar";
                    swal({
                        type: "info",
                        title: "Nota!",
                        text: "No logramos encontrar información para ver sus transacciones",
                        confirmButtonText: "OK"
                    });
                }
            } else {
                $scope.txtMsgConexionGen = "Se ha producido un problema de conexion al cargar los datos";
                $.unblockUI();
            }
        });
    };

    $scope.listadoActividadesEconomicas = function () {
        var dataGenesis = ((typeof ($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        var sNumeroRegistros = dataGenesis.length;
        var idContribuyente = $scope.dataGenesisCidadano[0].idContribuyente;
        var contribuyente = new gLstActividadEconomica();
        contribuyente.idContribuyente = idContribuyente;
        contribuyente.tipo = 'N';
        contribuyente.lstActividadEconomica(function (resultado) {
            $.unblockUI();
            var resultadoApi = JSON.parse(resultado);
            console.log("resultado  ==> ", resultadoApi);
            if (resultadoApi.success) {
                $scope.vistaInfo        = "mostrar";
                $scope.vistaInfoGenesis = null;
                var response            = resultadoApi;
                $scope.trmUsuario       = response.success.dataSql;
                $scope.misAcEconomicas  = $scope.trmUsuario;
                $scope.idAEconomicas    = $scope.trmUsuario[0].IdActividad;      
                $scope.nomAEconomicas   = $scope.trmUsuario[0].Descripcion;
                if ( $scope.trmUsuario.length == 1 ) {
                    $scope.vistaInfoAE = null;
                    $scope.vistaInfoTit   = "mostrar";
                }else if ($scope.trmUsuario.length > 1) {
                    $scope.vistaInfoAE         = "mostrar";
                    $scope.vistaInfoTit           = null;
                    $scope.nomAEconomicasCombo = $scope.nomAEconomicas;
                   //   $("#id_ae").val(0);
                }
                $scope.fechaIni         = obtFechaActual.obtenerFechaActual();
                $scope.fechaFin         = $scope.fechaIni;
                console.log("$scope.fechaFin",$scope.fechaFin);        
                /* $scope.fechaIni         = "2020-06-03";
                $scope.fechaFin         = "2020-06-04"; */
                $scope.lstMistransacciones($scope.fechaIni, $scope.fechaFin);

            } else {
                $scope.vistaInfo         = null;
                $scope.vistaInfoGenesis  = "mostrar";
                $scope.mostrarMsgActividadFalse = true;
                $scope.formDatosAE       = false;
                $scope.desabilitado      = true;
                swal('', "Datos no Encontrados !!!", 'warning');
            }
        });

    };
    $scope.asignarAcEconomica = function( dato) {
        console.log("datttt ",dato);
        console.log("$scope.misAcEconomicas",$scope.misAcEconomicas);
        $scope.misAcEconomicas.forEach(element => {
            if (element.IdActividad == dato) {
                $scope.nomAEconomicasCombo = element.Descripcion;
                $scope.idAEconomicas       = element.IdActividad;
                $scope.fechaIni            = obtFechaActual.obtenerFechaActual();
                $scope.fechaFin            = $scope.fechaIni;
                console.log("$scope.fechaFin",$scope.fechaFin);        
                /* $scope.fechaIni            = "2020-06-03";
                $scope.fechaFin            = "2020-06-04"; */
                $scope.lstMistransacciones($scope.fechaIni, $scope.fechaFin);
            }
        });
    }
    $scope.inicioComponente = function () {
        $scope.obtenerContribuyente();
    
    }
}