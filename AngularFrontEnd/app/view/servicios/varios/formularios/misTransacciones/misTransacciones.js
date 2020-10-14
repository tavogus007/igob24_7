function misTransaccioneController($scope, $interval, $q, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, fileUpload1, $timeout, obtFechaActual, obtFechaCorrecta) {
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
    $scope.divObsBoleta = null;
    $scope.metPago  = "TRANSFERENCIA";

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
            });
        } else {
            $.blockUI();
            $scope.arrayTransacciones = [];
            $scope.misAcEconomicas.forEach(element => {
                var Sucursal = element.sucursal;
                var idAE = element.IdActividad;
                var lstTransferencias = new lstTransaciones();
                lstTransferencias.id_actividadeconomica = idAE;
                lstTransferencias.fecha_inicio = fechaIni;
                lstTransferencias.fecha_fin = fechaFin;
                lstTransferencias.listaTransaciones(function (resp) {
                    var respuesta = JSON.parse(resp);
                    if (respuesta.length > 0) {
                        respuesta.forEach(element => {
                            element.sucursal = Sucursal;
                            element.id_AE = idAE;
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
        $scope.porcentaje = 0;

    }
    $scope.detalleTransaccion = function (dataTrans) {
        $scope.comprador  = dataTrans.comprador;
        $scope.montototal = dataTrans.monto_total;
        $scope.tppago     = dataTrans.metodo_pago;
        $scope.detallesT  = JSON.parse(dataTrans.detalle);
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
                        title: "",
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
                $scope.idAEconomicas = $scope.trmUsuario[0].IdActividad;
                $scope.nomAEconomicas = $scope.trmUsuario[0].RazonSocial;
                $scope.sucursal = $scope.trmUsuario[0].sucursal;
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
                    $scope.sucursal = element.sucursal;
                    $scope.fechaIni = obtFechaActual.obtenerFechaActual();
                    $scope.fechaFin = $scope.fechaIni;
                    $scope.lstMistransacciones($scope.fechaIni, $scope.fechaFin);
                }
            });
            $.unblockUI();
        }
        $scope.porcentaje = 0;
        $.unblockUI();

    }
    $scope.validar_boleta = function(estado) {
        if( estado == "observar"){
            $scope.divObsBoleta = "mostrar";
           
        }else{

            swal({
                title: "",
                text: "¿Está seguro de validar y aceptar la boleta de transferencia?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: true
              },
              function(isConfirm) {
                if (isConfirm) {
                    var idAE = $scope.id_ac_economica;
                    var datacambiaData = new tbancaria();
                    datacambiaData.id_actividadeconomica = idAE;
                    datacambiaData.id_venta        = $scope.id_venta_pedido;
                    datacambiaData.estado          = "PAGADO";
                    datacambiaData.observacion     = "";
                    datacambiaData.pagoCambioEstado(function (resultado) {
                        var resultadoApi = JSON.parse(JSON.parse(resultado));
                        if (resultadoApi.respuesta_pago != "00") {
                            if ( $("#fechaIni").val() != "" && $("#fechaFin").val() != "") {
                                $scope.fechaIni = $("#fechaIni").val();
                                $scope.fechaFin = $("#fechaFin").val();
                                $scope.fechaIni = $scope.fechaIni.split("/");
                                $scope.fechaIni = $scope.fechaIni[2] + "-" + $scope.fechaIni[1] + "-" + $scope.fechaIni[0];
                                $scope.fechaFin = $scope.fechaFin.split("/");
                                $scope.fechaFin = $scope.fechaFin[2] + "-" + $scope.fechaFin[1] + "-" + $scope.fechaFin[0];
                            }else {
                                $scope.fechaIni = obtFechaActual.obtenerFechaActual();
                                $scope.fechaFin = $scope.fechaIni;
                            }
                            $scope.lstMistransacciones($scope.fechaIni, $scope.fechaFin); 

                            swal("", "Se confirmo la boleta de transferencia correctamente.", "success");
                            $("#fotpod").modal("hide");             

                        } else {
                            console.log("respuesta update ", resultadoApi);
                        }
                    });
                } else {
                  //swal("", "Cancelar :)", "error");
                }
              });
        }
    }
    $scope.validar_boleta_obs = function(estado,descripcion) {
        if (estado == "observar") {
            if (descripcion == undefined  || descripcion == null || descripcion == "undefined") {
                
                alertify.error("Describa la observación por la que se esta rechazando por favor");
            }else {
                swal({
                    title: "",
                    text: "¿Está seguro de realizar la observación?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    cancelButtonClass: "btn-success",
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    closeOnCancel: true
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                        var idAE = $scope.id_ac_economica;
                        var datacambiaData = new tbancaria();
                        datacambiaData.id_actividadeconomica = idAE;
                        datacambiaData.id_venta        = $scope.id_venta_pedido;
                        datacambiaData.estado          = "RECHAZADO";
                        datacambiaData.observacion     = descripcion;
                        datacambiaData.pagoCambioEstado(function (resultado) {
                            var resultadoApi = JSON.parse(JSON.parse(resultado));
                            if (resultadoApi.respuesta_pago != "00") {
                                $("#fotpod").modal("hide"); 
                                if ( $("#fechaIni").val() != "" && $("#fechaFin").val() != "") {
                                    $scope.fechaIni = $("#fechaIni").val();
                                    $scope.fechaFin = $("#fechaFin").val();
                                    $scope.fechaIni = $scope.fechaIni.split("/");
                                    $scope.fechaIni = $scope.fechaIni[2] + "-" + $scope.fechaIni[1] + "-" + $scope.fechaIni[0];
                                    $scope.fechaFin = $scope.fechaFin.split("/");
                                    $scope.fechaFin = $scope.fechaFin[2] + "-" + $scope.fechaFin[1] + "-" + $scope.fechaFin[0];
                                }else {
                                    $scope.fechaIni = obtFechaActual.obtenerFechaActual();
                                    $scope.fechaFin = $scope.fechaIni;
                                }
                                $scope.lstMistransacciones($scope.fechaIni, $scope.fechaFin);            
                                swal("", "La observación se realizo correctamente.", "success");


                            } else {
                                console.log("respuesta update ", resultadoApi);
                            }
                        });
                    } else {
                        swal("", "Se presento un problema al realizar la observación :)", "error");
                    }
                });
            }
        } else {
            $scope.divObsBoleta = null;            
        } 
    }
    
    $scope.mostrarImg  =   function(dataimg){ 
        $scope.id_venta_pedido = dataimg.id_venta;
        $scope.id_ac_economica = dataimg.id_AE;
        $scope.estadopagovista = dataimg.estado_pago;
        $scope.archivoPOD     = "";
        $scope.nombreVistaadj = "RECIBO DEL DEPOSITO POR CONCEPTO DE LA COMPRA:";
        $scope.nombreVistaadj = dataimg.nombreVistaadj;
        //$scope.urlImagenfile  = "192.168.5.141/rest/files/transaccion/102860/venta_20200623140916.png?app_name=todoangular";//dataimg.imagen_transaccion;
        $scope.urlImagenfile  = dataimg.imagen_transaccion;
        $.blockUI();
        var estado = true;
        if ($scope.urlImagenfile != '' && $scope.urlImagenfile != undefined ) {
            $scope.divObsBoleta = null;
            try{
                $scope.archivoPOD =  $scope.urlImagenfile;             
                var extPod        =  $scope.urlImagenfile.split("?app_name=todoangular");
                extPod            =  extPod[0].split(".");
                extPod            =  extPod[extPod.length-1];
                /* if(extPod == 'pdf' || extPod == 'docx' ||  extPod == 'docxlm' || extPod == 'zip'){
                    window.open($scope.archivoPOD, "_blank");
                }else{
                    //$scope.archivoPOD = "http://" + $scope.archivoPOD;
                } */
                
                $("#fotpod").modal("show");             
                $.unblockUI();
            }catch(e){
              console.log("error",e);
              $.unblockUI();
            }   
        }else{
          swal('Error', 'La transferencia no contiene documentos', 'error');
        }
        $.unblockUI();
    }
    $scope.contador = 0;
    $scope.porcentaje = 0;

    var interval = $interval(function () {

        if ( $scope.porcentaje >= 100 ) {
            $scope.porcentaje = 100;
        }
        $scope.contador = $scope.contador + 1;
        $scope.porcentaje = $scope.porcentaje + 1;

        if ($scope.porcentaje == 101 ) {
            if ( $("#fechaIni").val() != "" && $("#fechaFin").val() != "") {
                $scope.fechaIni = $("#fechaIni").val();
                $scope.fechaFin = $("#fechaFin").val();
                $scope.fechaIni = $scope.fechaIni.split("/");
                $scope.fechaIni = $scope.fechaIni[2] + "-" + $scope.fechaIni[1] + "-" + $scope.fechaIni[0];
                $scope.fechaFin = $scope.fechaFin.split("/");
                $scope.fechaFin = $scope.fechaFin[2] + "-" + $scope.fechaFin[1] + "-" + $scope.fechaFin[0];
            }else {
                $scope.fechaIni = obtFechaActual.obtenerFechaActual();
                $scope.fechaFin = $scope.fechaIni;
            }
            $scope.lstMistransacciones($scope.fechaIni, $scope.fechaFin); 
            $scope.porcentaje = 0;
        }
    }, 500);
    $scope.stop = function() {
        $interval.cancel(interval);
    };
    $scope.$on('$destroy', function () {
        $scope.stop();
    });
    $scope.estadoObsProd = false;
    $scope.estadoProdPedido = function(dataTramite){
        $scope.idVentaProd  = dataTramite.id_venta
        var dataEstProd     = new dataEstadoProducto();
            dataEstProd.vt_id = $scope.idVentaProd;
            dataEstProd.getEstadoProducto(function (resp) {
                var resultado = JSON.parse(resp).success;
                if(resultado.success != []){
                    $scope.estadoProd = resultado[0].vnt_estado_pago;
                    $scope.estadoObsProd = false;
                }
                

            });
        if ($scope.estadoProd == "ENTREGADO"){
            swal("", "El producto ya se encuentra Entregado.", "info");
            $("#modaldetPedido").modal("hide");             
        }else {
            $("#modaldetPedido").modal("show");             
        }

    }
    $scope.validar_pedido = function(tipo, estado,dataObs){
        switch (tipo) {
            case 'cambiar':
                swal({
                    title: "",
                    text: "¿Está seguro de actualizar el estado del producto?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    closeOnCancel: true
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                        var dataEstProd = new dataEstadoProducto();
                        dataEstProd.vt_id          = $scope.idVentaProd;
                        dataEstProd.vt_estado      = estado;
                        dataEstProd.vt_observacion = "";
                        dataEstProd.actEstadoVenta(function (resultado) {
                            var resultadoApi = JSON.parse(resultado);
                             if (resultadoApi.success[0].estado_pago == estado) {
                                swal("", "Se procedio a cambiar el estado correctamente.", "success");
                                $("#modaldetPedido").modal("hide");             
                            } else if(resultadoApi.success[0].estado_pago == "BORRADO"){
                                swal("", "La transacción esta en un estado inactivo.", "error");
                                $("#modaldetPedido").modal("hide");
                            } else{
                                swal("", "Se presento un problema al actualizar el estado del pedido.", "error");
                                $("#modaldetPedido").modal("hide");
                            }
                        }); 
                    }
                });
                
                break;
            case 'observar':
                $scope.estadoObsProd = true;
                break;
            case 'conObservacion':
                swal({
                    title: "",
                    text: "¿Está seguro de observar el estado del producto?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    closeOnCancel: true
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                        var dataEstProd = new dataEstadoProducto();
                        dataEstProd.vt_id          = $scope.idVentaProd;
                        dataEstProd.vt_estado      = estado;
                        dataEstProd.vt_observacion = dataObs;
                        dataEstProd.actEstadoVenta(function (resultado) {
                            var resultadoApi = JSON.parse(resultado);
                             if (resultadoApi.success[0].estado_pago == estado) {
                                swal("", "Se procedio a realizar la observacion del estado del producto correctamente.", "success");
                                $("#modaldetPedido").modal("hide");
                                $('#observacion_prod').val("");             
                            } else {
                                console.log("respuesta update ", resultadoApi);
                            } 
                        }); 
                    } 
                });
                break;
            case 'cancelar':
                $scope.estadoObsProd = false;
                break;
            default:
                break;
        }
        /* if ( tipo == 'observar'){
            
        }else {
        } */
    }
    
    $scope.inicioComponente = function () {
        $scope.obtenerContribuyente();
    }
}