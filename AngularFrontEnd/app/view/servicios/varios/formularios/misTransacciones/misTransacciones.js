function misTransaccioneController($scope, $q, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, fileUpload1, $timeout, obtFechaActual, obtFechaCorrecta) {
    $scope.startDateOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
    };
    $scope.startDateOpen1 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened1 = true;
    };
    $scope.startDateOpen2 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened2 = true;
    };

    $scope.trmUsuario = [];
    $scope.obtmisTransacciones = [];
    $scope.misAcEconomicas = [];
    $scope.vistaInfo = null;
    $scope.vistaInfoTit = null;
    $scope.vistaInfoGenesis = null;
    $scope.vistaInfoAE = null;
    $scope.nomAEconomicasCombo = "";
    $scope.constlista = "todos";
    $scope.idAEconomicas;
    $scope.fechaIni;
    $scope.fechaFin;
    
    $scope.lstMistransacciones = function (fechaIni, fechaFin) {
        $.blockUI();
        if ($scope.constlista != "todos") {
            var idAE = $scope.idAEconomicas;
            var lstTransferencias = new lstTransaciones();
            lstTransferencias.id_actividadeconomica = idAE;
            lstTransferencias.fecha_inicio = fechaIni;
            lstTransferencias.fecha_fin = fechaFin;
            lstTransferencias.listaTransaciones(function (resp) {
                var respuesta = JSON.parse(resp);
                if (respuesta.length > 0) {
                    $scope.arraytransaccion = [];
                    respuesta.forEach(element => {
                        element.sucursal = $scope.sucursal;
                        $scope.arraytransaccion.push(element);
                    });
                    $scope.obtmisTransacciones = $scope.arraytransaccion;
                    var data = $scope.arraytransaccion;
                    $scope.tablaTransaciones.reload();
                    $scope.vistaInfo = "mostrar";
                    alertify.success("Mis Transacciones...");
                    $.unblockUI();
                } else {
                    data = [];
                    $scope.obtmisTransacciones = [];
                    $scope.tablaTransaciones.reload();
                    $.unblockUI();
                    alertify.error("Sin Transacciones...");
                    $scope.vistaInfo = "mostrar";
                }
                $("#fechaIni").val("");
                $("#fechaFin").val("");
            });
        } else {
            $.blockUI();
            $scope.arrayTransacciones = [];
            $scope.misAcEconomicas.forEach(element => {
                var Sucursal = element.sucursal; 
                var idAE     = element.IdActividad;
                var lstTransferencias = new lstTransaciones();
                lstTransferencias.id_actividadeconomica = idAE;
                lstTransferencias.fecha_inicio = fechaIni;
                lstTransferencias.fecha_fin = fechaFin;
                lstTransferencias.listaTransaciones(function (resp) {
                    var respuesta = JSON.parse(resp);
                    if (respuesta.length > 0 ) {
                        respuesta.forEach(element => {
                            element.sucursal = Sucursal;
                            $scope.arrayTransacciones.push(element);
                        });
                    }
                });
            });
            $.unblockUI();
            if ($scope.arrayTransacciones.length > 0) {
                $scope.obtmisTransacciones = $scope.arrayTransacciones;
                var data = $scope.arrayTransacciones;
                $scope.tablaTransaciones.reload();
                $scope.vistaInfo = "mostrar";
                alertify.success("Mis Transacciones...");
                $.unblockUI();
            } else {
                data = [];
                $scope.obtmisTransacciones = [];
                $scope.tablaTransaciones.reload();
                alertify.error("Sin Transacciones...");
                $scope.vistaInfo = "mostrar";
                $.unblockUI();
            }
            $("#fechaIni").val("");
            $("#fechaFin").val("");
        }
        $.unblockUI();
    }
    $scope.tablaTransaciones = new ngTableParams({
        page: 1,
        count: 15,
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
        $.blockUI();
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
                if (response.success.dataSql.length > 0) {
                    $scope.dataGenesisCidadano = response.success.dataSql;
                    $scope.listadoActividadesEconomicas();
                } else {
                    $scope.dataGenesisCidadano = '';
                    $scope.vistaInfo = null;
                    $scope.vistaInfoGenesis = "mostrar";
                    swal({
                        type: "info",
                        title: "Nota!",
                        text: "No logramos encontrar información para ver sus transacciones",
                        confirmButtonText: "OK"
                    });
                    $.unblockUI();
                }
            } else {
                $.unblockUI();
            }
        });
    };

    $scope.listadoActividadesEconomicas = function () {
        $.blockUI();
        var dataGenesis = ((typeof ($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        var idContribuyente = $scope.dataGenesisCidadano[0].idContribuyente;
        var tipoPersona = sessionService.get('TIPO_PERSONA');
        if (tipoPersona == "NATURAL") {
            tipoPersona = "N";
        } else {
            tipoPersona = "J";
        }

        var idContribuyente = $scope.dataGenesisCidadano[0].idContribuyente;
        var contribuyente = new lstActividadEconomicaVentas();
        contribuyente.idContribuyente = idContribuyente;
        contribuyente.tipo = tipoPersona;
        contribuyente.lstActividadEconomicaVentas(function (resultado) {
            var resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                $scope.vistaInfo = "mostrar";
                $scope.vistaInfoGenesis = null;
                var response = resultadoApi;
                $scope.trmUsuario = response.success.dataSql;
                $scope.misAcEconomicas = $scope.trmUsuario;
                $scope.idAEconomicas   = $scope.trmUsuario[0].IdActividad;
                $scope.nomAEconomicas  = $scope.trmUsuario[0].RazonSocial;
                $scope.sucursal        = $scope.trmUsuario[0].sucursal;
                if ($scope.trmUsuario.length == 1) {
                    $scope.vistaInfoAE = null;
                    $scope.vistaInfoTit = "mostrar";
                } else if ($scope.trmUsuario.length > 1) {
                    $scope.vistaInfoAE = "mostrar";
                    $scope.vistaInfoTit = null;
                    $scope.nomAEconomicasCombo = $scope.nomAEconomicas;
                }
                $scope.fechaIni = obtFechaActual.obtenerFechaActual();
                $scope.fechaFin = $scope.fechaIni;
                $scope.lstMistransacciones($scope.fechaIni, $scope.fechaFin);
            } else {
                $scope.vistaInfo = null;
                $scope.vistaInfoGenesis = "mostrar";
                $scope.mostrarMsgActividadFalse = true;
                $scope.formDatosAE = false;
                $scope.desabilitado = true;
                swal('', "Datos no Encontrados !!!", 'warning');
            }
            $.unblockUI();
        });
        $.unblockUI();
    };
    $scope.asignarAcEconomica = function (dato) {
        $.blockUI();
        if (dato === undefined) {
            $.blockUI();
            $scope.constlista = "todos";
            $scope.fechaIni = obtFechaActual.obtenerFechaActual();
            $scope.fechaFin = $scope.fechaIni;
            $scope.lstMistransacciones($scope.fechaIni, $scope.fechaFin);
            $.unblockUI();
        } else {
            $.blockUI();
            $scope.constlista = "uae";
            $scope.misAcEconomicas.forEach(element => {
                if (element.IdActividad == dato) {
                    $scope.nomAEconomicasCombo = element.Descripcion;
                    $scope.idAEconomicas = element.IdActividad;
                    $scope.sucursal      = element.sucursal;
                    $scope.fechaIni = obtFechaActual.obtenerFechaActual();
                    $scope.fechaFin = $scope.fechaIni;
                    $scope.lstMistransacciones($scope.fechaIni, $scope.fechaFin);
                }
            });
            $.unblockUI();
        }
        $.unblockUI();

    }
    $scope.inicioComponente = function () {
        $scope.obtenerContribuyente();

    }
}