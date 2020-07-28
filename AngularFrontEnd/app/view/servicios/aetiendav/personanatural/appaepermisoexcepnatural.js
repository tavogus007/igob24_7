function aepermisoexcepcionalnaturalController($scope, $timeout, $q, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter, FileUploader, ngTableParams, $filter, fileUpload, fileUpload1, wsRgistrarPubliciadad, $window) {
    document.signupForm.btnFormLicencia.disabled = true;
    var fecha = new Date();
    var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.tblTramites = {};
    $scope.trmUsuario = [];

    $scope.listadoActividadesEconomicas = function() {
        var dataGenesis = ((typeof($rootScope.datosGenesis) == 'undefined' || $rootScope.datosGenesis == null) ? {} : $rootScope.datosGenesis);
        var tipoPersona = sessionService.get('TIPO_PERSONA');
        var dataGenesis = ((typeof($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        var sNumeroRegistros = dataGenesis.length;
        if (sNumeroRegistros > 0) {
            var idContribuyente = $rootScope.datosGenesis[0].idContribuyente;
            var contribuyente = new gLstActividadEconomica();
            contribuyente.idContribuyente = idContribuyente;
            contribuyente.tipo = 'N';
            contribuyente.lstActividadEconomica(function(resultado) {
                $.unblockUI();
                resultadoApi = JSON.parse(resultado);
                if (resultadoApi.success) {
                    $scope.formDatosAE = true;
                    $scope.mostrarMsgActividadTrue = true;
                    $scope.mostrarMsgActividadFalse = false;
                    var response = resultadoApi;
                    $scope.trmUsuario = response.success.dataSql;
                    var data = response.success.dataSql;
                    $scope.tblTramites.reload();
                    $scope.desabilitado = true;
                } else {
                    $scope.mostrarMsgActividadTrue = false;
                    $scope.mostrarMsgActividadFalse = true;
                    $scope.formDatosAE = false;
                    $scope.desabilitado = true;
                    swal('', "Datos no Encontrados !!!", 'warning');
                }

                var sformguardado = $scope.datos.INT_FORM_ALMACENADO;
                if (typeof sformguardado == 'undefined' || sformguardado != 'G') {
                    $scope.botones = null;
                    $scope.desabilitado = true;
                    $scope.limpiarDatos();
                    swal('', "Favor revisar la información y seleccionar la Actividad Economica que desea registrar.", 'warning');
                } else {

                    //$scope.botones = "mostrar";
                    //$scope.desabilitado = false;
                }
            });
        } else {
            $scope.txtMsgDataRenovacion = "Estimado Ciudadano no tiene actividad económica registrada.";
            $scope.txtMsgDataNuevaActividad = "Favor revisar la informacion de la nueva Actividad Economica que Creara.";
            $scope.mostrarMsgActividadTrue = false;
            $scope.mostrarMsgActividadFalse = true;
            $scope.mostrarMsgNuevaActividad = true;
            $scope.formDatosAE = false;
            if ($scope.txtMsgConexionGen != '') {
                $scope.txtMsgDataRenovacion = $scope.txtMsgConexionGen;
            } else {
                $scope.txtMsgDataRenovacion = "Estimado Ciudadano no tiene actividad económica registrada.";
                $scope.txtMsgDataNuevaActividad = "Favor revisar la informacion de la nueva Actividad Economica que Creara.";
            }
            $.unblockUI();
        }
    };

    $scope.tblTramites = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            IdActividad: 'desc'
        }
    }, {
        total: $scope.trmUsuario.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.trmUsuario, params.filter()) :
                $scope.trmUsuario;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.trmUsuario;
            params.total($scope.trmUsuario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.selActividadEconomica = function(tramite) {
        $scope.limpiarDatos();
        $scope.idActividiadEconomicaActual = tramite.IdActividad;
        $scope.datos.f01_id_actividad_economica = tramite.IdActividad;
        $scope.sIdAeGrilla = tramite.IdActividad;
        var tipoPersona = sessionService.get('TIPO_PERSONA');
        var datosGenerales = new getDatosAEViae();
        datosGenerales.idActividadEconomica = tramite.IdActividad;
        datosGenerales.getDatosAE_Viae(function(resultado) {
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                codhojaruta = resultadoApi.success.dataSql.datosAE[0].hojaRuta;
                var response = resultadoApi.success.dataSql.datosAE;
                var lstPublicidad = resultadoApi.success.dataSql.datosVIAE;
                if (response.length > 0) {
                    if (response[0].numeroOrden == 0 || response[0].numeroOrden == null || response[0].numeroOrden == 'null') {
                        response[0].numeroOrden = 0;
                        $scope.nroOrdenActividiadEconomicaActual = response[0].numeroOrden;
                        $scope.datos.f01_nro_orden = response[0].numeroOrden;
                    } else {
                        $scope.nroOrdenActividiadEconomicaActual = response[0].numeroOrden;
                        $scope.datos.f01_nro_orden = response[0].numeroOrden;
                    }
                    $scope.idContribuyenteAEActual = response[0].idContribuyente;
                    $scope.datos.f01_id_contribuyente = response[0].idContribuyente;

                    var hinicio = ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? "" : response[0].horarioAtencion.toUpperCase());
                    var hfinal = ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? "" : response[0].horarioAtencion.toUpperCase());
                    var smacro = "MACRODISTRITO";
                    var smacrodes = "";
                    var szona = "DISTRITO";



                    //DATOS DE LA ACTIVIDAD ECONÓMICA
                    $scope.datos.f01_raz_soc = response[0].denominacion;
                    $scope.datos.f01_sup = response[0].superficie;
                    $scope.datos.f01_cap_aprox = response[0].capacidad;

                    try {
                        smacrodes = smacro + " " + response[0].IdMacrodistrito + " " + response[0].Macrodistrito;
                        hinicio = hinicio.split('-')[0].trim();
                        hfinal = hfinal.split('-')[1].trim();
                    } catch (e) {}
                    if (response[0].IdMacrodistrito == 2 || response[0].IdMacrodistrito == '2') {
                        smacrodes = smacro + " " + response[0].IdMacrodistrito + " MAXIMILIANO PAREDES";
                    }
                    if (response[0].IdMacrodistrito == 4 || response[0].IdMacrodistrito == '4') {
                        smacrodes = smacro + " " + response[0].IdMacrodistrito + " SAN_ANTONIO";
                    }
                    if (response[0].establecimiento == 'ALQUI') {
                        $scope.datos.f01_estab_es = "ALQUILADO";
                    }
                    if (response[0].establecimiento == 'PROPI') {
                        $scope.datos.f01_estab_es = "PROPIO";
                    }
                    if (response[0].establecimiento == 'ANTIC') {
                        $scope.datos.f01_estab_es = "ANTICRÉTICO";
                    }
                    if (response[0].establecimiento == 'OTRO') {
                        $scope.datos.f01_estab_es = "OTRO";
                    }
                    $scope.datos.f01_tip_act = response[0].tipoActividad;
                    if (response[0].tipoActividad == 'MA' || response[0].tipoActividad == 'MATRI') {
                        $scope.datos.f01_tip_act_dec = 'MATRIZ';
                        $scope.datos.f01_tip_act = 'MA';
                    }
                    if (response[0].tipoActividad == 'SU' || response[0].tipoActividad == 'SUCUR') {
                        $scope.datos.f01_tip_act_dec = 'SUCURSAL';
                        $scope.datos.f01_tip_act = 'SU';
                    }
                    /*DATOS DE LA ACTIVIDAD*/
                    $scope.datos.f01_num_pmc = response[0].padron;
                    $scope.datos.f01_raz_soc = response[0].denominacion;
                    $scope.datos.f01_sup = response[0].superficie;
                    $scope.datos.f01_de_hor = hinicio;
                    $scope.datos.f01_a_hor = hfinal;
                    $scope.datos.f01_nro_actividad = response[0].numeroActividad;
                    $scope.datos.f01_productosElaborados = response[0].productosElaborados;
                    $scope.datos.f01_actividadesSecundarias = response[0].actividadesSecundarias;
                    /*TIPO LICENCIA*/
                    $scope.datos.f01_tipo_lic = response[0].idTipoLicencia;
                    $scope.datos.f01_categoria = response[0].idactividad_desarrollada343;
                    $scope.datos.f01_categoria_agrupada = response[0].idActividadDesarrollada;
                    $scope.datos.f01_categoria_descrip = response[0].desc_desarrollada;
                    $scope.datos.f01_tipo_lic_descrip = response[0].descripcion;
                    $scope.datos.f01_categoria_agrupada_descrip = response[0].ActividadDesarrollada;
                    $scope.datos.f01_categoria_agrupada_descripcion = response[0].actividad_desarrollada343;

                    $scope.datos.INT_AC_MACRO_ID = response[0].IdMacrodistrito;
                    $scope.datos.f01_macro_act = response[0].IdMacrodistrito;
                    $scope.datos.f01_macro_act_descrip = smacrodes;
                    $scope.datos.INT_AC_DISTRITO = response[0].idDistrito_actividadEconomica;
                    $scope.datos.f01_dist_act = response[0].idDistrito_actividadEconomica;
                    $scope.datos.INT_AC_ID_ZONA = response[0].id_zona_ActividadEconomica;
                    $scope.datos.INT_ID_ZONA = response[0].id_zona_ActividadEconomica;
                    $scope.datos.f01_zona_act = response[0].id_zona_ActividadEconomica;
                    $scope.datos.f01_zona_act_descrip = response[0].zona;
                    $scope.datos.f01_tip_via_act = response[0].tipoVia;
                    $scope.datos.f01_num_act = response[0].via;
                    $scope.datos.f01_num_act1 = response[0].numero;
                    $scope.datos.f01_edificio_act = response[0].edificio;
                    $scope.datos.f01_bloque_act = response[0].bloque;
                    $scope.datos.f01_piso_act = response[0].piso;
                    $scope.datos.f01_dpto_of_loc = response[0].departamento;
                    $scope.datos.f01_tel_act1 = response[0].telefono;
                    $scope.datos.f01_casilla = response[0].casilla;
                    $scope.datos.f01_factor = response[0].tipoTrayecto;
                    $scope.distritoZonas(smacrodes);
                    $scope.actulizarIdDistrito(response[0].zona);


                    if (response[0].idactividad_desarrollada343 == '0' || response[0].idactividad_desarrollada343 == 0) {
                        $scope.LicenciaXCategoriaA(response[0].idActividadDesarrollada)
                    }

                    if (response[0].edificio == 'undefined' || response[0].bloque == 'undefined' || response[0].piso == 'undefined' || response[0].departamento == 'undefined' || response[0].telefono == 'undefined') {
                        response[0].edificio = '';
                        response[0].bloque = '';
                        response[0].piso = '';
                        response[0].departamento = '';
                        response[0].telefono = '';
                    }
                    $scope.datos.f01_tipo_lic_ant = response[0].descripcion;
                    $scope.datos.f01_categoria_agrupada_ant = response[0].actividadesSecundarias;
                    $scope.datos.f01_categoria_descrip_ant = response[0].ActividadDesarrollada;
                    $scope.cargarNombVia($scope.datos.f01_tip_via_act, $scope.datos.f01_zona_act);
                    $scope.getDatosLotus(resultadoApi.success.dataSql.datosAE[0].idActividadEconomica, codhojaruta);
                    $scope.desabilitado = false;
                    $scope.botones = "mostrar";

                }
                //$rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
            } else {
                swal('', "Datos no Encontrados !!!", 'warning');
            }
        });
    };

    $scope.getDatosLotus = function(idadcteco, hojar) {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        try {
            var datosLotus = new getDatosAELotus();
            datosLotus.caso = hojar;
            datosLotus.idActividad = idadcteco;
            datosLotus.getDatosAE_Lotus(function(respuesta) {
                $scope.resultadoLotus = JSON.parse(respuesta);
                $scope.resultadoCP = $scope.resultadoLotus.success.data[0].datos;
                $scope.datos.INT_AC_latitud = $scope.resultadoCP.INT_AC_latitud;
                $scope.datos.INT_AC_longitud = $scope.resultadoCP.INT_AC_longitud;
                //$scope.datos.f01_tipo_lic_descrip = $scope.resultadoCP.f01_tipo_lic_descrip;
                //$scope.datos.f01_categoria_agrupada_descrip = $scope.resultadoCP.f01_categoria_agrupada_descrip;
                //$scope.datos.f01_categoria_agrupada_descripcion = $scope.resultadoCP.f01_categoria_agrupada_descripcion;
                $scope.datos.f01_casilla = $scope.resultadoCP.f01_casilla;
                $scope.datos.f01_num_act = $scope.resultadoCP.f01_num_act;
                $scope.datosAntMulti = $scope.resultadoLotus.success.data[0].datos.licencia_multiple;
                $q.all($scope.resultadoLotus).then(function(data) {
                    deferred.resolve($scope.resultadoLotus);
                })
            });
        } catch (e) {
            $scope.exito = "NO";
            $q.all($scope.resultadoLotus).then(function(data) {
                deferred.resolve($scope.resultadoLotus);
            });
        }
        return deferred.promise;
    }

    $scope.LicenciaXCategoriaA = function(idDesarrollada) {
        //$scope.$apply();
        try {
            var tipo = new categoriaagrupadalicenciades();
            tipo.dependencia = idDesarrollada;
            tipo.categoriaagrupadalicencia_des(function(res) {
                $scope.datosActividadLicencia = "";
                x = JSON.parse(res);
                response = x.success.data;
                if (response.length > 0) {
                    console.log("response Licencia:: ", response);
                    $scope.datosActividadLicencia = response;
                    $scope.datos.f01_categoria_agrupada = response[0].catagrpuid;
                    $scope.datos.f01_categoria_agrupada_dem = response[0].idcategoriaagrupada;
                    $scope.datos.f01_categoria_agrupada_descrip = response[0].idcategoriaagrupada;


                } else {
                    $scope.msg = "Error !!";
                }
            });
        } catch (e) {
            console.log("Error en la actividad desarrollada");
        }

        //$scope.GetValueZonaSegura($scope.datos.f01_categoria_agrupada);
    }

    $scope.mostrarimg = function(imagen) {
        if (typeof($scope.datos.FILE_VEHICULO_FOTO) != 'undefined') {
            var nombreArchivoCi = "";
            nombreArchivoCi = $scope.datos.FILE_VEHICULO_FOTO;
            var aTipoArchivoCi = nombreArchivoCi.split("?")[0];
            var extCi = aTipoArchivoCi.split(".")[1];
            try {
                extCi = extCi.toLowerCase();
            } catch (e) {}
            if (imagen == 'FILE_VEHICULO_FOTO') {
                $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_VEHICULO_FOTO + "?app_name=todoangular";
                if (extCi == 'pdf' || extCi == 'docx' || extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' || extCi == 'png' || extCi == 'gif') {
                    window.open($scope.archivoCI, "_blank");
                } else {
                    console.log("sin archivo");

                }
            }
        };


        if (typeof($scope.datos.FILE_RUAT_VEHICULO != 'undefined')) {
            var nombreArchivoCiR = "";
            nombreArchivoCiR = $scope.datos.FILE_RUAT_VEHICULO;
            var aTipoArchivoCiR = nombreArchivoCiR.split("?")[0];
            var extCiR = aTipoArchivoCiR.split(".")[1];
            try {
                extCiR = extCiR.toLowerCase();
            } catch (e) {}

            if (imagen == 'FILE_RUAT_VEHICULO') {
                $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RUAT_VEHICULO + "?app_name=todoangular";
                if (extCi == 'pdf' || extCi == 'docx' || extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' || extCi == 'png' || extCi == 'gif') {
                    window.open($scope.archivoCIR, "_blank");
                } else {
                    console.log("sin archivo");

                }
            }
        };


        if (typeof($scope.datos.FILE_FORMVH_EXCEL != 'undefined')) {
            var nombreArchivoCiR = "";
            nombreArchivoCiR = $scope.datos.FILE_FORMVH_EXCEL;
            var aTipoArchivoCiR = nombreArchivoCiR.split("?")[0];
            var extCiR = aTipoArchivoCiR.split(".")[1];
            try {
                extCiR = extCiR.toLowerCase();
            } catch (e) {}

            if (imagen == 'FILE_FORMVH_EXCEL') {
                $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FORMVH_EXCEL + "?app_name=todoangular";
                if (extCi == 'pdf' || extCi == 'docx' || extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' || extCi == 'png' || extCi == 'gif') {
                    window.open($scope.archivoCIR, "_blank");
                } else {
                    console.log("sin archivo");

                }
            }
        };


        if (typeof($scope.datos.FILE_CONTRATO_DELIVERY != 'undefined')) {
            var nombreArchivoCiR = "";
            nombreArchivoCiR = $scope.datos.FILE_CONTRATO_DELIVERY;
            var aTipoArchivoCiR = nombreArchivoCiR.split("?")[0];
            var extCiR = aTipoArchivoCiR.split(".")[1];
            try {
                extCiR = extCiR.toLowerCase();
            } catch (e) {}

            if (imagen == 'FILE_CONTRATO_DELIVERY') {
                $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_CONTRATO_DELIVERY + "?app_name=todoangular";
                if (extCi == 'pdf' || extCi == 'docx' || extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' || extCi == 'png' || extCi == 'gif') {
                    window.open($scope.archivoCIR, "_blank");
                } else {
                    console.log("sin archivo");

                }
            }
        };


        if (typeof($scope.datos.FILE_FOTO_SOLICITANTE != 'undefined')) {
            var nombreArchivoCiR = "";
            nombreArchivoCiR = $scope.datos.FILE_FOTO_SOLICITANTE;
            var aTipoArchivoCiR = nombreArchivoCiR.split("?")[0];
            var extCiR = aTipoArchivoCiR.split(".")[1];
            try {
                extCiR = extCiR.toLowerCase();
            } catch (e) {}

            if (imagen == 'FILE_FOTO_SOLICITANTE') {
                $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_SOLICITANTE + "?app_name=todoangular";
                if (extCi == 'pdf' || extCi == 'docx' || extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' || extCi == 'png' || extCi == 'gif') {
                    window.open($scope.archivoCIR, "_blank");
                } else {
                    console.log("sin archivo");

                }
            }
        };


        if (typeof($scope.datos.FILE_FOTO_LICENCIA_CI != 'undefined')) {
            var nombreArchivoCiR = "";
            nombreArchivoCiR = $scope.datos.FILE_FOTO_LICENCIA_CI;
            var aTipoArchivoCiR = nombreArchivoCiR.split("?")[0];
            var extCiR = aTipoArchivoCiR.split(".")[1];
            try {
                extCiR = extCiR.toLowerCase();
            } catch (e) {}

            if (imagen == 'FILE_FOTO_LICENCIA_CI') {
                $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
                if (extCi == 'pdf' || extCi == 'docx' || extCi == 'docxlm' || extCi == 'zip' || extCi == 'jpeg' || extCi == 'jpg' || extCi == 'png' || extCi == 'gif') {
                    window.open($scope.archivoCIR, "_blank");
                } else {
                    console.log("sin archivo");

                }
            }
        };


        $.unblockUI();
    }

    $scope.ejecutarFile = function(idfile) {
        var sid = document.getElementById(idfile);
        if (sid) {
            document.getElementById(idfile).click();
        } else {
            alert("Error ");
        }
    };

    $scope.limpiarDatos = function() {
        document.signupForm.btnFormLicencia.disabled = true;
        $scope.datos.f01_id_actividad_economica = '';
        $scope.datos.f01_nro_orden = "";
        $scope.datos.f01_nit = '';
        $scope.datos.f01_raz_soc = '';
        $scope.datos.f01_sup = '';
        $scope.datos.f01_cap_aprox = '';
        $scope.datos.f01_de_hor = '';
        $scope.datos.f01_a_hor = '';
        $scope.datos.f01_fecha_ini_act = '';
        $scope.datos.f01_estab_es = '';
        $scope.datos.f01_macro_act = '';
        $scope.datos.f01_macro_act_descrip = '';
        $scope.datos.f01_dist_act = '';
        $scope.datos.f01_dist_act_descrip = '';
        $scope.datos.f01_tip_via_act = '';
        $scope.datos.f01_zona_act = '';
        $scope.datos.f01_zona_act_descrip = '';
        $scope.datos.f01_num_act = '';
        $scope.datos.f01_num_act1 = '';
        $scope.datos.f01_edificio_act = '';
        $scope.datos.f01_bloque_act = '';
        $scope.datos.f01_piso_act = '';
        $scope.datos.f01_dpto_of_loc = '';
        $scope.datos.f01_tel_act1 = '';
        $scope.datos.f01_cod_luz = '';
        $scope.datos.f01_idCodigoZona = '';
        $scope.datos.f01_casilla = '';
        $scope.datos.f01_productosElaborados = '';
        $scope.datos.f01_factor = '';
        $scope.datos.f01_tip_act = '';
        $scope.datos.f01_tipo_lic = '';
        $scope.datos.f01_tipo_lic = '';
        $scope.datos.f01_tipo_lic_descrip = '';
        $scope.datos.f01_categoria = '';
        $scope.datos.f01_categoria_descrip = '';
        $scope.datos.f01_categoria_agrupada = '';
        $scope.datos.f01_categoria_descripcion = '';
        $scope.datos.f01_categoria_agrupada_descripcion = '';
        $scope.datos.f01_categoria_agrupada_descrip = '';
        $scope.datos.f01_categoria_descrip2 = '';
        $scope.licdes = [];
        $scope.multiple = [];
        $scope.dscripcionlic = {};
        $scope.licenciamul = '';
        $scope.datos.licenciam = '';
        $scope.licmul_grilla = '';
        $scope.datos.Licenmul_grilla = '';
        $scope.datos.mulact_principal = '';
        $scope.publicid = '';
        $scope.datos.f01_actividad_principal_array = [];
        $scope.datos.fileArchivosAd = '';
        $scope.datos.FILE_CI = '';
        $scope.datos.FILE_MAPA = '';
        $scope.datos.f01_nro_actividad = '';

        $scope.datos.FILE_VEHICULO_FOTO = "";
        $scope.datos.FILE_RUAT_VEHICULO = "";
        $scope.datos.FILE_FORMVH_EXCEL = "";
        $scope.datos.FILE_CONTRATO_DELIVERY = "";
        $scope.datos.FILE_FOTO_SOLICITANTE = "";
        $scope.datos.FILE_FOTO_LICENCIA_CI = "";
        $scope.div_archivoexcelformulario = false;
        $scope.div_aeserviciosdelivery = false;
        $scope.div_fotografiafrentenitidasolicitante = false;
        $scope.div_fotografiaslicenciaconducir = false;
        $scope.div_fotosvehiculolateralfrontal = false;
        $scope.div_permisocirculacionvehicular = false;
        $scope.div_documentosruatvehiculo = false;
        $scope.divreferencia = false;
        $scope.div_correelec = false;
        $scope.divalimentos = false;
    }


    $scope.macrodistritos = function() {
        $scope.aMacrodistritos = {};
        var datosP = new macrodistritoLst();
        datosP.obtmacro(function(resultado) {
            data = JSON.parse(resultado);
            if (data.success.length > 0) {
                $scope.aMacrodistritos = data.success;
            } else {
                $scope.msg = "Error !!";
            }
        });
    };

    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data) {
        $scope.docdinamicos(data.f01_validador_servicio);
        $scope.macrodistritos();
        $scope.distritoZonas(data.f01_macro_act_descrip);
        $scope.actulizarIdDistrito(data.f01_zona_act_descrip);
        $scope.cargarNombVia(data.f01_tip_via_act, data.f01_zona_act);


    });

    $scope.validarEnvio = function(data) {
        swal({
            title: 'CONFIRMAR',
            text: 'El envío de la presente solicitud de registro delivery, (DD.JJ.) generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            closeOnConfirm: false
        }, function() {
            swal.close();
            setTimeout(function() {
                $scope.enviarTramiteCeroPapel(data);
            }, 1000);
        });
    };

    $scope.convertToDataURLviaCanvas = function(url, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    };

    $scope.subirImgBase64 = function(imagen, url, nombre) {
        var contentType = 'image/png';
        var b64Data = imagen;
        var blob = b64toBlob(b64Data, contentType);
        var blobUrl = URL.createObjectURL(blob);

        function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;
            var byteCharacters = atob(b64Data);
            var byteArrays = [];
            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
        }
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        blob.name = nombre;
        var resFormulario = {
            container: url,
            file_path: nombre,
            body: blob
        };
        fileUpload.uploadFileToUrl(blob, uploadUrl);
        /*DreamFactory.api[CONFIG.SERVICE_ARCHIVO].createFile(resFormulario).success(function (response){
        }).error(function(results){
            console.log("ERROR");
        });*/
    };

    var aDocAdjuntosmapa = new Object();
    $scope.capturarImagen = function() {
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var latitud = $rootScope.laaa;
        var longitud = $rootScope.looo;
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.url = "RC_CLI/" + $scope.oidCiudadano + "/" + sDirTramite;
        $scope.archivo1 = sDirTramite + "croquisActividad.jpg";
        $scope.datos.INT_AC_direccionImagenmapa = CONFIG.APIURL + "/files/" + $scope.url + "/" + $scope.archivo1 + "?app_name=todoangular";
        aDocAdjuntosmapa = [];
        var datosAdjuntosmapa = {
            "nombre_archivo": $scope.archivo1,
            "tam_archivo": '0',
            "estado_archivo": "Env.",

            "opcion_archivo": "-",
            "url_archivo": $scope.datos.INT_AC_direccionImagenmapa,
            "docdatos": "Croquis de la actividad",
            "descripcion": "Croquis de la actividad",
            "titulo": "Croquis"
        };
        aDocAdjuntosmapa[0] = datosAdjuntosmapa;
        $scope.datos.ARCHIVOS_MULTIPLES_MAPA = aDocAdjuntosmapa;
        $scope.convertToDataURLviaCanvas('https://maps.googleapis.com/maps/api/staticmap?center=' + latitud + ',' + longitud + '&zoom=16&size=600x300&maptype=roadmap&markers=color:red|label:S|' + latitud + ',' + longitud + '&key=AIzaSyD_c3VUlclgLDhXQ_UHkGZ8uQiSeNHQHgw', function(base64Img) {
            var Imagen = base64Img.replace(/data:image\/png;base64,/i, '');
            $scope.Imagenb = Imagen;
            $scope.subirImgBase64($scope.Imagenb, $scope.url, $scope.archivo1);
        });
    }

    $scope.ultimoArrayAdjunto = function(data) {
        if (data == 'VENTAPRODED' || data == 'SERVICIODEL') {
            $scope.ArrayAdjuntoFor12();
        } else {
            $scope.ArrayAdjuntoFor3();
        }
    }

    $scope.ArrayAdjuntoFor3 = function() {
        $scope.capturarImagen();
        datoObjectFiles = [];
        var datoObjectFile1 = new Object();
        var datoObjectFile3 = new Object();
        var datoObjectFile4 = new Object();
        var datoObjectFile5 = new Object();
        var datoObjectFile6 = new Object();
        var datoObjectFile7 = new Object();
        var datoObjectFile8 = new Object();
        var datoObjectFile9 = new Object();

        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var nombre_mapa = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
        datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_VEHICULO_FOTO + "?app_name=todoangular";
        datoObjectFile1.campo = $scope.datos.FILE_VEHICULO_FOTO;
        datoObjectFile1.nombre = 'CARGAR FOTOGRAFÍA(S) FRONTAL Y LATERAL DE LOS VEHÍCULO(S) (Fotografías con buena resolución en un solo archivo formato PDF o DOC)';

        datoObjectFile3.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RUAT_VEHICULO + "?app_name=todoangular";
        datoObjectFile3.campo = $scope.datos.FILE_RUAT_VEHICULO;
        datoObjectFile3.nombre = 'CARGAR DOCUMENTO(S) RUAT DE LOS VEHÍCULO(S) (Los documentos deben estar en solo archivo en formato PDF o DOC.)';

        datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FORMVH_EXCEL + "?app_name=todoangular";
        datoObjectFile4.campo = $scope.datos.FILE_FORMVH_EXCEL;
        datoObjectFile4.nombre = 'CARGAR ARCHIVO EXCEL FORMULARIO N° 1.1 (DEBIDAMENTE LLENADO)';

        datoObjectFile5.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_CONTRATO_DELIVERY + "?app_name=todoangular";
        datoObjectFile5.campo = $scope.datos.FILE_CONTRATO_DELIVERY;
        datoObjectFile5.nombre = 'EN EL CASO DE ACTIVIDADES ECONÓMICAS QUE ADQUIEREN LOS SERVICIOS DE EMPRESAS DE DELIVERY, DEBE CARGAR EL CONTRATO VIGENTE EN FORMATO PDF (LA EMPRESA DELIVERY DEBE CONTAR CON LAS AUTORIZACIONES PARA OPERAR Y ESTAR REGISTRADO EN EL GAMLP)';

        datoObjectFile6.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_SOLICITANTE + "?app_name=todoangular";
        datoObjectFile6.campo = $scope.datos.FILE_FOTO_SOLICITANTE;
        datoObjectFile6.nombre = 'CARGAR FOTOGRAFÍA DE FRENTE Y NÍTIDA DEL ROSTRO DEL SOLICITANTE SUJETANDO SU CÉDULA DE IDENTIDAD DEL LADO ANVERSO (CARILLA DE LA FIRMA Y FOTO), SIN LENTES, NI GORRA';

        datoObjectFile7.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
        datoObjectFile7.campo = $scope.datos.FILE_FOTO_LICENCIA_CI;
        datoObjectFile7.nombre = 'CARGAR FOTOGRAFÍAS DE LA LICENCIA DE CONDUCIR Y CÉDULA DE IDENTIDAD DEL (DE LOS) CONDUCTORES DE LOS VEHÍCULOS (En un solo documento en formato PDF)';

        datoObjectFile8.url = $rootScope.decJuradaNatural;
        datoObjectFile8.campo = "DECLARACION JURADADA";
        datoObjectFile8.nombre = 'DECLARACION JURADA';

        datoObjectFiles[0] = datoObjectFile1;
        datoObjectFiles[1] = datoObjectFile3;
        datoObjectFiles[2] = datoObjectFile4;
        datoObjectFiles[3] = datoObjectFile5;
        datoObjectFiles[4] = datoObjectFile6;
        datoObjectFiles[5] = datoObjectFile7;
        datoObjectFiles[6] = datoObjectFile8;

        $scope.datos.FileDocumentos = datoObjectFiles;
        $rootScope.FileAdjuntos = datoObjectFiles;
        $scope.datos.File_Adjunto = datoObjectFiles;
    }

    $scope.ArrayAdjuntoFor12 = function() {
        $scope.capturarImagen();
        datoObjectFiles = [];
        var datoObjectFile1 = new Object();
        var datoObjectFile3 = new Object();
        var datoObjectFile4 = new Object();
        var datoObjectFile5 = new Object();
        var datoObjectFile6 = new Object();
        var datoObjectFile7 = new Object();
        var datoObjectFile8 = new Object();
        var datoObjectFile9 = new Object();

        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var nombre_mapa = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
        datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_VEHICULO_FOTO + "?app_name=todoangular";
        datoObjectFile1.campo = $scope.datos.FILE_VEHICULO_FOTO;
        datoObjectFile1.nombre = 'CARGAR FOTOGRAFÍA(S) FRONTAL Y LATERAL DE LOS VEHÍCULO(S) (Fotografías con buena resolución en un solo archivo formato PDF o DOC)';

        datoObjectFile3.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RUAT_VEHICULO + "?app_name=todoangular";
        datoObjectFile3.campo = $scope.datos.FILE_RUAT_VEHICULO;
        datoObjectFile3.nombre = 'CARGAR DOCUMENTO(S) RUAT DE LOS VEHÍCULO(S) (Los documentos deben estar en solo archivo en formato PDF o DOC.)';

        datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FORMVH_EXCEL + "?app_name=todoangular";
        datoObjectFile4.campo = $scope.datos.FILE_FORMVH_EXCEL;
        datoObjectFile4.nombre = 'CARGAR ARCHIVO EXCEL FORMULARIO N° 1.1 (DEBIDAMENTE LLENADO)';

        datoObjectFile6.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_SOLICITANTE + "?app_name=todoangular";
        datoObjectFile6.campo = $scope.datos.FILE_FOTO_SOLICITANTE;
        datoObjectFile6.nombre = 'CARGAR FOTOGRAFÍA DE FRENTE Y NÍTIDA DEL ROSTRO DEL SOLICITANTE SUJETANDO SU CÉDULA DE IDENTIDAD DEL LADO ANVERSO (CARILLA DE LA FIRMA Y FOTO), SIN LENTES, NI GORRA';

        datoObjectFile7.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
        datoObjectFile7.campo = $scope.datos.FILE_FOTO_LICENCIA_CI;
        datoObjectFile7.nombre = 'CARGAR FOTOGRAFÍAS DE LA LICENCIA DE CONDUCIR Y CÉDULA DE IDENTIDAD DEL (DE LOS) CONDUCTORES DE LOS VEHÍCULOS (En un solo documento en formato PDF)';

        datoObjectFile8.url = $rootScope.decJuradaNatural;
        datoObjectFile8.campo = "DECLARACION JURADADA";
        datoObjectFile8.nombre = 'DECLARACION JURADA';

        datoObjectFiles[0] = datoObjectFile1;
        datoObjectFiles[1] = datoObjectFile3;
        datoObjectFiles[2] = datoObjectFile4;
        datoObjectFiles[3] = datoObjectFile6;
        datoObjectFiles[4] = datoObjectFile7;
        datoObjectFiles[5] = datoObjectFile8;

        $scope.datos.FileDocumentos = datoObjectFiles;
        $rootScope.FileAdjuntos = datoObjectFiles;
        $scope.datos.File_Adjunto = datoObjectFiles;
    }
    $scope.enviarTramiteCeroPapel = function(paramForm) {
        $scope.ultimoArrayAdjunto(paramForm.f01_validador_servicio);
        console.log(paramForm);
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.btnEnviarForm = true;
        var idProcodigo = 'REG_AE-';
        var datosNeXO = {};
        console.log("IDTRAMITE:: ", sessionService.get('IDTRAMITE'));
        if ($scope.tipoPersona == 'NATURAL') {
            datosNeXO['f01_nro_frm'] = sessionService.get('IDTRAMITE');
            datosNeXO['f01_actividadesSecundarias'] = paramForm.f01_actividadesSecundarias;
            datosNeXO['f01_id_actividad_economica'] = paramForm.f01_id_actividad_economica;
            datosNeXO['f01_nro_orden'] = paramForm.f01_nro_orden;
            datosNeXO['f01_id_contribuyente'] = paramForm.f01_id_contribuyente;
            datosNeXO['f01_num_pmc'] = paramForm.f01_num_pmc;
            datosNeXO['f01_tipo_per'] = 'N';
            datosNeXO['f01_tipo_per_desc'] = 'NATURAL';
            datosNeXO['f01_expedido_prop'] = paramForm.f01_expedido_prop;
            datosNeXO['f01_email_prop'] = paramForm.f01_email_prop;
            datosNeXO['f01_cel_prop'] = paramForm.f01_cel_prop;
            datosNeXO['f01_telef_prop'] = paramForm.f01_telef_prop;
            datosNeXO['INT_FEC_SOLICITUD'] = paramForm.INT_FEC_SOLICITUD;
            datosNeXO['CI_BIGDATA'] = paramForm.CI_BIGDATA;
            datosNeXO['f01_pri_nom_prop'] = paramForm.f01_pri_nom_prop;
            datosNeXO['f01_ape_pat_prop'] = paramForm.f01_ape_pat_prop;
            datosNeXO['f01_ape_mat_prop'] = paramForm.f01_ape_mat_prop;
            datosNeXO['f01_tip_doc_prop'] = paramForm.f01_tip_doc_prop;
            datosNeXO['f01_num_doc_prop'] = paramForm.f01_num_dos_prop;
            datosNeXO['f01_num_dos_prop'] = paramForm.f01_num_dos_prop;
            datosNeXO['f01_fecha_nac'] = paramForm.f01_fecha_nac;
            datosNeXO['f01_macro'] = paramForm.f01_macro;
            datosNeXO['f01_macro_des'] = paramForm.f01_macro_des;
            datosNeXO['INT_ZONA'] = paramForm.INT_ZONA;
            datosNeXO['INT_DISTRITO'] = paramForm.INT_DISTRITO;
            datosNeXO['f01_distrito'] = paramForm.f01_distrito;
            datosNeXO['f01_distrito_desc'] = paramForm.f01_distrito_desc;
            datosNeXO['f01_zona'] = paramForm.f01_zona;
            datosNeXO['f01_zon_prop'] = paramForm.f01_zon_prop;
            datosNeXO['f01_zon_prop_desc'] = paramForm.f01_zon_prop_desc;
            datosNeXO['f01_zon_prop_valor'] = paramForm.f01_zon_prop_valor;
            datosNeXO['f01_tip_via_prop'] = paramForm.f01_tip_via_prop;
            datosNeXO['f01_tip_via_prop_desc'] = paramForm.f01_tip_via_prop;
            datosNeXO['f01_nom_via_prop'] = paramForm.f01_nom_via_prop;
            datosNeXO['f01_num_prop'] = paramForm.f01_num_prop;
            datosNeXO['f01_nom_edi_prop'] = paramForm.f01_nom_edi_prop;
            datosNeXO['f01_bloq_prop'] = paramForm.f01_bloq_prop;
            datosNeXO['f01_piso_prop'] = paramForm.INT_PISO;
            datosNeXO['f01_depa_prop'] = paramForm.INT_NUM_DEP;
            datosNeXO['f01_dir_det_prop'] = paramForm.f01_dir_det_prop;
            datosNeXO['OTRO_VIA'] = paramForm.OTRO_VIA;
            datosNeXO['INT_AC_EDIFICIO'] = paramForm.INT_AC_EDIFICIO;
            datosNeXO['INT_AC_BLOQUE'] = paramForm.INT_AC_BLOQUE;
            datosNeXO['INT_AC_PISO'] = paramForm.INT_AC_PISO;
            datosNeXO['INT_AC_NUME'] = paramForm.INT_AC_NUME;
            datosNeXO['INT_AC_CEL'] = paramForm.INT_AC_CEL;
            datosNeXO['INT_AC_TEL'] = paramForm.INT_AC_TEL;
            datosNeXO['INT_AC_COR'] = paramForm.INT_AC_COR;
            datosNeXO['INT_DIR_DET'] = paramForm.INT_DIR_DET;
            datosNeXO['INT_VIA'] = paramForm.INT_VIA;
            datosNeXO['INT_NOMBRE_VIA'] = paramForm.INT_NOMBRE_VIA;
            datosNeXO['INT_EDIF'] = paramForm.INT_EDIF;
            datosNeXO['INT_BLOQUE'] = paramForm.INT_BLOQUE;
            datosNeXO['INT_PISO'] = paramForm.INT_PISO;
            datosNeXO['INT_NUM_DEP'] = paramForm.INT_NUM_DEP;
            datosNeXO['INT_DIR_DET'] = paramForm.INT_DIR_DET;
            datosNeXO['f01_denominacion'] = paramForm.f01_denominacion;
            datosNeXO['f01_sup'] = paramForm.f01_sup;
            datosNeXO['f01_de_hor'] = paramForm.f01_de_hor;
            datosNeXO['f01_a_hor'] = paramForm.f01_a_hor;
            datosNeXO['f01_estab_es'] = paramForm.f01_estab_es;
            datosNeXO['INT_AC_ESTADO'] = paramForm.INT_AC_ESTADO;
            datosNeXO['INT_AC_MACRO'] = paramForm.INT_AC_MACRO;
            datosNeXO['INT_AC_MACRO_ID'] = parseInt(paramForm.INT_AC_MACRO_ID);
            datosNeXO['f01_tipo_lic_descrip'] = paramForm.f01_tipo_lic_descrip;
            datosNeXO['f01_requisitos_tecnicos'] = $scope.datos.f01_requisitos_tecnicos;
            datosNeXO['INT_AC_DISTRITO'] = paramForm.INT_AC_DISTRITO;
            datosNeXO['INT_AC_ID_ZONA'] = paramForm.INT_AC_ID_ZONA;
            datosNeXO['INT_ID_ZONA'] = paramForm.INT_ID_ZONA;
            datosNeXO['f01_macro_act_descrip'] = paramForm.f01_macro_act_descrip;
            datosNeXO['f01_zona_act_descrip'] = paramForm.f01_zona_act_descrip;
            datosNeXO['f01_de_hor'] = paramForm.f01_de_hor;
            datosNeXO['f01_a_hor'] = paramForm.f01_a_hor;
            datosNeXO['f01_tip_via_act'] = paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act'] = paramForm.f01_num_act;
            datosNeXO['f01_factor'] = paramForm.f01_factor;
            datosNeXO['f01_num_act1'] = paramForm.f01_num_act1;
            datosNeXO['f01_edificio_act'] = paramForm.f01_edificio_act;
            datosNeXO['f01_bloque_act'] = paramForm.f01_bloque_act;
            datosNeXO['f01_piso_act'] = paramForm.f01_piso_act;
            datosNeXO['f01_dpto_of_loc'] = paramForm.f01_dpto_of_loc;
            datosNeXO['f01_tel_act1'] = paramForm.f01_tel_act1;
            datosNeXO['f01_casilla'] = paramForm.f01_casilla;
            datosNeXO['f01_cod_luz'] = '0';
            datosNeXO['f01_bloque_act'] = paramForm.f01_bloque_act;
            datosNeXO['INT_AC_latitud'] = paramForm.INT_AC_latitud;
            datosNeXO['INT_AC_longitud'] = paramForm.INT_AC_longitud;
            datosNeXO['f01_requisitos_actividad_economica'] = paramForm.f01_requisitos_actividad_economica;
            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;
            datosNeXO['INT_ID_CAT_AGRUPADA'] = parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_nit'] = paramForm.f01_nit;
            datosNeXO['f01_nit_prop'] = paramForm.f01_nit;
            datosNeXO['f01_tip_doc_prop'] = paramForm.f01_tip_doc_prop;
            datosNeXO['f01_expedido_prop'] = paramForm.f01_expedido_prop;
            datosNeXO['f01_pri_nom_prop'] = paramForm.f01_pri_nom_prop;
            datosNeXO['f01_seg_nom_prop'] = "";
            datosNeXO['f01_ter_nom_prop'] = "";
            datosNeXO['f01_ape_pat_prop'] = paramForm.f01_ape_pat_prop;
            datosNeXO['f01_ape_mat_prop'] = paramForm.f01_ape_mat_prop;
            datosNeXO['f01_ape_cas_prop'] = "";
            datosNeXO['f01_nac_prop'] = paramForm.f01_nac_prop;
            datosNeXO['f01_fecha_nac'] = paramForm.f01_fecha_nac;
            datosNeXO['f01_telef_prop'] = paramForm.f01_tel_ciudadano;
            datosNeXO['f01_cel_prop'] = paramForm.f01_cel_prop;
            datosNeXO['f01_email_prop'] = paramForm.f01_email_prop;
            datosNeXO['f01_raz_soc'] = paramForm.f01_raz_soc;
            datosNeXO['f01_sup'] = paramForm.f01_sup;
            datosNeXO['f01_cap_aprox'] = paramForm.f01_cap_aprox;
            datosNeXO['f01_de_hor'] = paramForm.f01_de_hor;
            datosNeXO['f01_a_hor'] = paramForm.f01_a_hor;
            datosNeXO['f01_estab_es'] = paramForm.f01_estab_es;
            datosNeXO['f01_productosElaborados'] = paramForm.f01_productosElaborados;
            datosNeXO['f01_fecha_ini_act'] = "";
            datosNeXO['f01_fecha_imp'] = "";
            datosNeXO['f01_fecha_fin_act'] = "";
            //UBICACION DE LA ACTIVIDAD ECONOMICA
            datosNeXO['f01_macro_act_descrip'] = paramForm.f01_macro_act_descrip;
            datosNeXO['f01_macro_act'] = parseInt(paramForm.f01_macro_act);
            datosNeXO['f01_dist_act'] = paramForm.f01_dist_act; //"";
            datosNeXO['f01_dist_act_descrip'] = paramForm.f01_dist_act_descrip;
            datosNeXO['f01_zona_act'] = paramForm.f01_zona_act; //paramForm.f01_zona_act_descrip;
            datosNeXO['f01_tip_via_act'] = paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act'] = paramForm.f01_num_act; //paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act_n'] = paramForm.f01_num_act_n; //paramForm.f01_num_act;
            datosNeXO['f01_factor'] = "";
            datosNeXO['f01_num_act1'] = paramForm.f01_num_act1;
            datosNeXO['f01_edificio_act'] = paramForm.f01_edificio_act;
            datosNeXO['f01_bloque_act'] = paramForm.f01_bloque_act;
            datosNeXO['f01_piso_act'] = paramForm.f01_piso_act;
            datosNeXO['f01_dpto_of_loc'] = paramForm.f01_dpto_of_loc;
            datosNeXO['f01_tel_act1'] = paramForm.f01_tel_act1;
            datosNeXO['f01_casilla'] = paramForm.f01_casilla;
            datosNeXO['f01_idCodigoZona'] = "";
            datosNeXO['f04_res_solicitud_upaee'] = "";
            datosNeXO['rdTipoTramite'] = paramForm.rdTipoTramite;
            datosNeXO['f01_nro_actividad'] = paramForm.f01_nro_actividad;


            /*REQUISITOSDELAACTIVIDADECONOMICA - CIUDADANO*/
            datosNeXO['f01_tip_act'] = paramForm.f01_tip_act;
            datosNeXO['f01_tipo_lic'] = paramForm.f01_tipo_lic;
            datosNeXO['f01_categoria_agrupada'] = parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion;
            datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;
            datosNeXO['declaracion_jurada'] = $rootScope.decJuradaNatural;
            datosNeXO['g_origen_p'] = '0';
            datosNeXO['File_Adjunto'] = $scope.datos.File_Adjunto;
            datosNeXO['f01_tip_act'] = paramForm.f01_tip_act;
            datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;

            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;
            datosNeXO['f01_croquis_ae'] = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
            datosNeXO['Licenmul_grilla'] = paramForm.Licenmul_grilla;

        }

        datosNeXO['f01_categoria_descrip'] = paramForm.f01_categoria_descripcion;
        datosNeXO['f01_categoria_descrip2'] = paramForm.f01_categoria_descripcion.toUpperCase();
        datosNeXO['f01_categoria'] = parseInt(paramForm.f01_categoria_descrip);
        datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion;
        datosNeXO['f01_categoria_agrupada_descrip'] = paramForm.f01_categoria_agrupada_descrip;
        datosNeXO['f01_categoria_agrupada_dem'] = paramForm.f01_categoria_agrupada_dem;
        datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2.toUpperCase();
        datosNeXO['f01_productosElaborados'] = paramForm.f01_productosElaborados;
        datosNeXO['f01_correo_electronico_ae'] = paramForm.f01_correo_electronico_ae;
        datosNeXO['f01_tipo_act_ae'] = paramForm.f01_tipo_act_ae;
        datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion;
        datosNeXO['f01_cantidad_personal'] = paramForm.f01_cantidad_personal;
        datosNeXO['f01_modalidad_pago'] = paramForm.f01_modalidad_pago;
        datosNeXO['f01_tipo_act_ae_descrip'] = paramForm.f01_tipo_act_ae_descrip;
        datosNeXO['f01_modalidad_pago_descrip'] = paramForm.f01_modalidad_pago_descrip;
        datosNeXO['f01_venta_productos'] = paramForm.f01_venta_productos;
        datosNeXO['f01_venta_recojo'] = paramForm.f01_venta_recojo;
        datosNeXO['f01_distribucion_propia'] = paramForm.f01_distribucion_propia;
        datosNeXO['f01_venta_productos_domicilio'] = paramForm.f01_venta_productos_domicilio;
        datosNeXO['f01_venta_para_recojo'] = paramForm.f01_venta_para_recojo;
        datosNeXO['f01_distribucion_movilidad_propia'] = paramForm.f01_distribucion_movilidad_propia;
        datosNeXO['f01_validador_servicio'] = paramForm.f01_validador_servicio;
        datosNeXO['f01_detalle_otro_pago'] = paramForm.f01_detalle_otro_pago;

        datosNeXO['f01_venta_productos_domicilio_descrip'] = paramForm.f01_venta_productos_domicilio_descrip;
        datosNeXO['f01_distribucion_movilidad_propia_descrip'] = paramForm.f01_distribucion_movilidad_propia_descrip;
        datosNeXO['f01_venta_para_recojo_descrip'] = paramForm.f01_venta_para_recojo_descrip;
        datosNeXO['g_tipo'] = "AE-TIENDA EN LINEA";
        datosNeXO['FILE_VEHICULO_FOTO'] = paramForm.FILE_VEHICULO_FOTO;
        datosNeXO['FILE_RUAT_VEHICULO'] = paramForm.FILE_RUAT_VEHICULO;
        datosNeXO['FILE_FORMVH_EXCEL'] = paramForm.FILE_FORMVH_EXCEL;
        datosNeXO['FILE_CONTRATO_DELIVERY'] = paramForm.FILE_CONTRATO_DELIVERY;
        datosNeXO['FILE_FOTO_SOLICITANTE'] = paramForm.FILE_FOTO_SOLICITANTE;
        datosNeXO['FILE_FOTO_LICENCIA_CI'] = paramForm.FILE_FOTO_LICENCIA_CI;

        datosNeXO['g_fecha'] = fechactual;
        datosNeXO['g_origen'] = "IGOB247";
        if ($scope.dataGenesisCidadano && $scope.formDatosAE) {
            if ($scope.dataGenesisCidadano.length > 0) {
                datosNeXO['INT_PMC'] = $scope.dataGenesisCidadano[0].padron;
                datosNeXO['INT_ID_CONTRIBUYENTE'] = $scope.dataGenesisCidadano[0].idContribuyente;
                datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = paramForm.INT_TRAMITE_RENOVA;
            }
        }

        var sMacroR = datosNeXO['f01_macro_des'];
        var sZonaR = datosNeXO['INT_AC_ID_ZONA'];
        var sMacroRDesc = datosNeXO['f01_macro_des'];
        var sZonaRDesc = datosNeXO['INT_AC_ID_ZONA'];
        var iCategoriaAgrupada = datosNeXO['INT_ID_CAT_AGRUPADA'];
        var iMacrodistrito = datosNeXO['INT_AC_MACRO_ID'];
        var sIdTramite = $rootScope.tramiteId;
        var datosSerializados = JSON.stringify(datosNeXO);
        var crearCaso = new gCrearTramiteLinea();
        crearCaso.usr_id = 1;
        crearCaso.datos = datosSerializados;
        crearCaso.procodigo = idProcodigo;
        crearCaso.crearTramiteLinea(function(response) {
            try {
                $scope.botones = null;
                $scope.desabilitado = true;
                response = JSON.parse(response);
                var results = response.success.data;
                indice = 0;
                datosIF = results[0].crear_tramite_ge.split(",");
                datosIF2 = datosIF[1];
                datosIF[0] = datosIF[0].substring(1, datosIF[0].length);
                console.log(datosIF[0]);
                $scope.nrotramitec = datosIF[0];
                sessionService.set('NROTRAMITE', datosIF[0]);
                sessionService.set('NROTRAMITEID', datosIF[1]);
                sessionService.set('IDPROCESO', datosIF[6]);
                var idTramite1 = sessionService.get('NROTRAMITEID');
                datosNeXO['INT_AC_direccionImagenmapa'] = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/" + sessionService.get('IDTRAMITE') + $scope.archivo2 + "?app_name=todoangular";
                try {
                    $scope.validarFormProcesos(paramForm);
                    $scope.guardarAdjuntosMultiplesMapa(results);
                } catch (e) {}

                $.unblockUI();
            } catch (e) {
                console.log("falla: ", e);
                alert("conexion fallida ");
            }
        });

    };

    /*enviarFormProcesos*/
    $scope.validarFormProcesos = function(datosForm) {
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = sessionService.get('IDUSUARIO');
        nroTramiteEnviado = sessionService.get('NROTRAMITE');
        idUsuario = 4;
        try {
            var idTramite = sessionService.get('IDTRAMITE');
            nroTramiteEnviado = sessionService.get('NROTRAMITE');
            idUsuario = 4;
            var tramiteIgob = new datosFormularios();
            tramiteIgob.frm_idTramite = idTramite;
            tramiteIgob.frm_tra_enviado = 'SI';
            tramiteIgob.frm_tra_if_codigo = nroTramiteEnviado;
            tramiteIgob.frm_tra_id_usuario = idUsuario;
            tramiteIgob.validarFormProcesos(function(resultado) {
                $scope.ListadoTramitesCiudadano();
                swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n La respuesta a su solicitud se realizará a través de su cuenta en la Plataforma iGob 24/7. Ante cualquier duda o consulta, favor comunicarse a nuestro Centro de Contacto Ciudadano 800-13-5555.");
            });
        } catch (error) {
            console.log("Error : ", error);
            swal('', 'Registro no modificado', 'error');
            $.unblockUI();
        }
    };

    var clsIniciarHtmlForm = $rootScope.$on('inicializarHtmlForm', function(event, tramite) {
        if (tramite.venviado == 'SI') {
            $scope.btnGuardarForm = true;
            $scope.desabilitado = true;
            $scope.botones = null;
            $scope.only = true;
        } else {
            $scope.btnGuardarForm = false;
            $scope.only = false;

        }
        var datosgen = ((typeof($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        if (tramite.venviado == 'NO' && JSON.stringify(datosgen) === '{}') {
            $scope.mostrarMsgNuevaActividad = false;
        }
        $.unblockUI();

    });

    var clsIniciarGrillaAE = $rootScope.$on('inicializarGrillaAE', function(event, data) {
        $scope.formDatosAE = false;
        $scope.mostrarMsgActividadTrue = false;
        $scope.mostrarMsgActividadFalse = false;
        if (data.length > 0) {
            if (data[0].venviado == 'SI') {
                if (data[0].datos.INT_FORM_ALMACENADO == 'G') {
                    $scope.desabilitado = true;
                    $scope.botones = null;

                } else {
                    $scope.desabilitado = false;
                    $scope.botones = "mostrar";


                }
            } else {

            }
        }
    });
    $scope.btover1 = null;
    $scope.btover2 = null;
    $scope.btover3 = null;
    $scope.btover4 = null;
    $scope.btover5 = null;
    $scope.btover6 = null;
    $scope.btover7 = null;
    $scope.cambiarFile = function(obj, valor) {
        var arraydoc = ["pdf", "doc", "docx", ".docx", ".docxlm"];
        $scope.registroAdj = [];
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function(resp) {
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1];
        });
        $.blockUI();
        setTimeout(function() { 
            var nombre = obj.getAttribute("name");
            var objarchivo = obj.files[0];
            $scope.FILE_VEHICULO_FOTO = obj.files[0];
            var oidCiudadano = sessionService.get('IDSOLICITANTE');
            $scope.direccionvirtual = "RC_CLI";
            var sDirTramite = sessionService.get('IDTRAMITE');
            var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/" + sDirTramite + "/";
            // FILE_VEHICULO_FOTO
            if (nombre == 'FILE_VEHICULO_FOTO' && (typeof(obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_VEHICULO_FOTO = nombreNuevo;
                        $scope.FILE_VEHICULO_FOTO = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover1 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function(blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_VEHICULO_FOTO = nombreNuevo;
                            $scope.FILE_VEHICULO_FOTO = blobcir;
                            $scope.btover1 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_VEHICULO_FOTO = "";
                        $scope.FILE_VEHICULO_FOTO = "";
                        $.unblockUI();
                    }

                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }

            }

            //FILE_RUAT_VEHICULO
            if (nombre == 'FILE_RUAT_VEHICULO' && (typeof(obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_RUAT_VEHICULO = nombreNuevo;
                        $scope.FILE_RUAT_VEHICULO = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover3 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function(blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_RUAT_VEHICULO = nombreNuevo;
                            $scope.FILE_RUAT_VEHICULO = blobcir;
                            $scope.btover3 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_RUAT_VEHICULO = "";
                        $scope.FILE_RUAT_VEHICULO = "";
                        $.unblockUI();
                    }

                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }

            }
            //FILE_FORMVH_EXCEL
            if (nombre == 'FILE_FORMVH_EXCEL' && (typeof(obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (ext_doc == 'xls' || ext_doc == 'xlsx') {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_FORMVH_EXCEL = nombreNuevo;
                        $scope.FILE_FORMVH_EXCEL = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover4 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function(blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_FORMVH_EXCEL = nombreNuevo;
                            $scope.FILE_FORMVH_EXCEL = blobcir;
                            $scope.btover4 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_FORMVH_EXCEL = "";
                        $scope.FILE_FORMVH_EXCEL = "";
                        $.unblockUI();
                    }

                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo Excel', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }

            }
            //FILE_CONTRATO_DELIVERY
            if (nombre == 'FILE_CONTRATO_DELIVERY' && (typeof(obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (ext_doc == "pdf") {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_CONTRATO_DELIVERY = nombreNuevo;
                        $scope.FILE_CONTRATO_DELIVERY = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover5 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function(blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_CONTRATO_DELIVERY = nombreNuevo;
                            $scope.FILE_CONTRATO_DELIVERY = blobcir;
                            $scope.btover5 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_CONTRATO_DELIVERY = "";
                        $scope.FILE_CONTRATO_DELIVERY = "";
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
            //FILE_FOTO_SOLICITANTE
            if (nombre == 'FILE_FOTO_SOLICITANTE' && (typeof(obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_FOTO_SOLICITANTE = nombreNuevo;
                        $scope.FILE_FOTO_SOLICITANTE = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover6 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function(respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_SOLICITANTE = nombreNuevo;
                                $scope.FILE_FOTO_SOLICITANTE = respuesta_compres;
                                document.getElementById("txt_" + nombre).value = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover6 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function(blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_SOLICITANTE = nombreNuevo;
                                $scope.FILE_FOTO_SOLICITANTE = blobcir;
                                $scope.btover6 = "mostrar";
                            });
                            $.unblockUI();
                        }
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_FOTO_SOLICITANTE = "";
                        $scope.FILE_FOTO_SOLICITANTE = "";
                        $.unblockUI();
                    }

                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo png, jpg o jpeg', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }

            }
            //FILE_FOTO_LICENCIA_CI
            if (nombre == 'FILE_FOTO_LICENCIA_CI' && (typeof(obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (ext_doc == "pdf") {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                        $scope.FILE_FOTO_LICENCIA_CI = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover7 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function(respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                                $scope.FILE_FOTO_LICENCIA_CI = respuesta_compres;
                                document.getElementById("txt_" + nombre).value = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover7 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function(blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                                $scope.FILE_FOTO_LICENCIA_CI = blobcir;
                                $scope.btover7 = "mostrar";
                            });
                            $.unblockUI();
                        }
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_FOTO_LICENCIA_CI = "";
                        $scope.FILE_FOTO_LICENCIA_CI = "";
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

    $scope.cargarDatosPermiso = function() {
        $scope.listadoActividadesEconomicas();
        $scope.macrodistritos();

        $.unblockUI();
        document.signupForm.btnFormLicencia.disabled = true;
    };

    $scope.$on('$destroy', function() {
        setTimeout(function() {
            //clsValidarBtnEnviar();
            //clsIniciarCamposInternet();
            clsIniciarGrillaAE();
            // clsIniciaBtnHabilitar();
            clsIniciarHtmlForm();
        }, 2000);
    });

    //////////////////////////////nuevo /////////////////////////////

    $scope.declaracionJurada = function(datos) {
        $rootScope.datosEnv = "";
        var fecha = new Date();
        var fechaActualS = "";
        fechaActualS = fecha.getDate() + " - " + (fecha.getMonth() + 1) + " - " + fecha.getFullYear();
        var sHora = "";
        sHora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var stringFormulario40 = "";
        var urlFormularioN = "";
        var snombre = "";
        var scedulaid = "";
        var sexpedido = "";
        var snombreREP = "";
        var scirep = "";
        var sempresa = "";
        var snit = "";
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        if ($scope.tipoPersona == 'NATURAL' || $scope.tipoPersona == 'N') {
            datos.f01_tipo_per_desc = 'NATURAL';
            urlFormularioN = "../../docs/AE_Formulario_TV.html";
            $("#msgformularioN").load(urlFormularioN, function(data) {
                stringFormulario40 = data;
                datos.f01_tipo_per_desc = ((typeof(datos.f01_tipo_per_desc) == 'undefined' || datos.f01_tipo_per_desc == null) ? "" : datos.f01_tipo_per_desc);
                datos.f01_nom_completo = ((typeof(datos.f01_nom_completo) == 'undefined' || datos.f01_nom_completo == null) ? "" : datos.f01_nom_completo);
                datos.f01_num_dos_prop = ((typeof(datos.f01_num_dos_prop) == 'undefined' || datos.f01_num_dos_prop == null) ? "" : datos.f01_num_dos_prop);
                datos.f01_expedido_prop = ((typeof(datos.f01_expedido_prop) == 'undefined' || datos.f01_expedido_prop == null) ? "" : datos.f01_expedido_prop);
                datos.f01_raz_soc = ((typeof(datos.f01_raz_soc) == 'undefined' || datos.f01_raz_soc == null) ? "" : datos.f01_raz_soc);
                datos.f01_num_pmc = ((typeof(datos.f01_num_pmc) == 'undefined' || datos.f01_num_pmc == null) ? "" : datos.f01_num_pmc);
                stringFormulario40 = stringFormulario40.replace("#f01_nom_completo#", datos.f01_nom_completo);
                stringFormulario40 = stringFormulario40.replace("#f01_num_dos_prop#", datos.f01_num_dos_prop);
                stringFormulario40 = stringFormulario40.replace("#f01_expedido_prop#", datos.f01_expedido_prop);
                stringFormulario40 = stringFormulario40.replace("#f01_raz_soc#", datos.f01_raz_soc);
                stringFormulario40 = stringFormulario40.replace("#f01_num_pmc#", datos.f01_num_pmc);
                stringFormulario40 = stringFormulario40.replace("#fecha_sist#", fechaActualS);
                stringFormulario40 = stringFormulario40.replace("#hora_sist#", sHora);
                stringFormulario40 = stringFormulario40.replace("#fecha_sist2#", fechaActualS);
                $scope.msgformularioN = stringFormulario40;
                $scope.notifcondicionesuso = stringFormulario40;
                setTimeout(function() {
                    $scope.fmostrarFormulario();
                }, 500);
            })
            $scope.armarDatosForm(datos, fechaActualS, sHora);
        }
    }


    $scope.armarDatosForm = function(data, sfecha, sHora) {
        $rootScope.datosForm401 = "";
        var dataForm = {};
        //CABECERA
        dataForm['f01_nom_completo'] = data.f01_nom_completo;
        dataForm['f01_num_dos_prop'] = data.f01_num_dos_prop;
        dataForm['f01_expedido_prop'] = data.f01_expedido_prop;
        dataForm['f01_raz_soc'] = data.f01_raz_soc;
        dataForm['f01_num_pmc'] = data.f01_num_pmc;
        dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;

        dataForm['fecha_sist'] = sfecha;
        dataForm['fecha_sist2'] = sfecha;
        dataForm['usuario'] = sessionService.get('USUARIO');
        dataForm['hora_sist'] = sHora;
        $rootScope.datosForm401 = dataForm;
        $rootScope.datosEnv = data;
    }

    $scope.fmostrarFormulario = function() {
        $("#exampleModalCenter1").modal({ backdrop: 'static', keyboard: false });
        $('#msgformularioN').html($scope.msgformularioN);
    }

    $scope.getRequisitoAE = function(dato) {
        if (dato == 'VENTAPRODED') {
            $scope.GetValueParam();
            $scope.datos.f01_venta_productos_domicilio_descrip = "VENTA DE PRODUCTOS CON ENTREGA A DOMICILIO";
        } else {
            //OPCION 3
            if (dato == 'VENTAPRODVP') {
                $scope.GetValueParam();
                $scope.datos.f01_distribucion_movilidad_propia_descrip = "VENTA DE PRODUCTOS CON VEHICULO PROPIO";
            } else {
                //OPCION 2
                if (dato == 'SERVICIODEL') {
                    $scope.datos.f01_venta_para_recojo_descrip = "VENTA DE PRODUCTOS CON VEHICULO PROPIO";
                }
            }
        }
    }

    $scope.getRequisito1 = function(dato) {
        datoObjectFinal = [];
        datoObjectFinal2 = [];
        datoObjectFinal3 = [];

        //"VENTA DE PRODUCTOS A DOMICILIO"
        if (dato == "VENTAPRODED") {
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor = "true";
            datoObjectFinal[0] = datoObject;
            datoObjectFinal[1] = datoObject1;
            $scope.datos.f01_venta_productos_domicilio = datoObjectFinal;
        } else {
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor = "false";
            datoObjectFinal[0] = datoObject;
            datoObjectFinal[1] = datoObject1;
            $scope.datos.f01_venta_productos_domicilio = datoObjectFinal;
        }

        if (dato == "SERVICIODEL") {
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor = "true";
            datoObjectFinal2[0] = datoObject;
            datoObjectFinal2[1] = datoObject1;
            $scope.datos.f01_venta_para_recojo = datoObjectFinal2;

        } else {
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor = "false";
            datoObjectFinal2[0] = datoObject;
            datoObjectFinal2[1] = datoObject1;
            $scope.datos.f01_venta_para_recojo = datoObjectFinal2;

        }

        if (dato == "VENTAPRODVP") {
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor = "true";
            datoObjectFinal3[0] = datoObject;
            datoObjectFinal3[1] = datoObject1;
            $scope.datos.f01_distribucion_movilidad_propia = datoObjectFinal3;

        } else {
            datoObject = new Object();
            datoObject1 = new Object();
            datoObject.tipo = "CHK";
            datoObject1.valor = "false";
            datoObjectFinal3[0] = datoObject;
            datoObjectFinal3[1] = datoObject1;
            $scope.datos.f01_distribucion_movilidad_propia = datoObjectFinal3;
        }

    }


    $scope.GetValueParam = function() {
        var f = document.getElementById("f01_modalidad_pago");
        $scope.datos.f01_modalidad_pago_descrip = f.options[f.selectedIndex].text;
    }

    /*VERIFICANDO CAMPOS OBLIGATORIOS*/
    $scope.verificarCamposInternet = function(data) {
        $scope.getRequisitoAE(data.f01_validador_servicio);
        $scope.getRequisito1(data.f01_validador_servicio);

        if (data.f01_validador_servicio == 'VENTAPRODED') {
            if (data && data.f01_num_pmc != "" && data.f01_num_pmc != null &&
                data.f01_tipo_lic_descrip != "" && data.f01_tipo_lic_descrip != null &&
                data.f01_raz_soc != "" && data.f01_raz_soc != null &&
                data.f01_categoria_agrupada_descrip != "" && data.f01_categoria_agrupada_descrip != null &&
                data.f01_macro_act != "" && data.f01_macro_act != null &&
                data.f01_zona_act != "" && data.f01_zona_act != null &&
                data.f01_casilla != "" && data.f01_casilla != null &&
                data.f01_correo_electronico_ae != "" && data.f01_correo_electronico_ae != null &&
                data.f01_cantidad_personal != "" && data.f01_cantidad_personal != null &&
                data.f01_categoria_agrupada_descripcion != "" && data.f01_categoria_agrupada_descripcion != null &&
                data.f01_cantidad_personal != "" && data.f01_cantidad_personal != null &&
                data.f01_modalidad_pago != "" && data.f01_modalidad_pago != null &&
                data.FILE_VEHICULO_FOTO != "" && data.FILE_VEHICULO_FOTO != null &&
                data.FILE_FORMVH_EXCEL != "" && data.FILE_FORMVH_EXCEL != null &&
                data.FILE_RUAT_VEHICULO != "" && data.FILE_RUAT_VEHICULO != null &&
                data.FILE_FOTO_SOLICITANTE != "" && data.FILE_FOTO_SOLICITANTE != null &&
                data.FILE_FOTO_LICENCIA_CI != "" && data.FILE_FOTO_LICENCIA_CI != null
            ) {
                //$rootScope.validacionRequisitosTec();

                $scope.guardarDatos(data);
                $scope.declaracionJurada(data);
                $("#declaracionN").modal("show");
            } else {
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }

        if (data.f01_validador_servicio == 'SERVICIODEL') {
            if (data && data.f01_num_pmc != "" && data.f01_num_pmc != null &&
                data.f01_tipo_lic_descrip != "" && data.f01_tipo_lic_descrip != null &&
                data.f01_raz_soc != "" && data.f01_raz_soc != null &&
                data.f01_categoria_agrupada_descrip != "" && data.f01_categoria_agrupada_descrip != null &&
                data.f01_macro_act != "" && data.f01_macro_act != null &&
                data.f01_zona_act != "" && data.f01_zona_act != null &&
                data.f01_correo_electronico_ae != "" && data.f01_correo_electronico_ae != null &&
                data.FILE_VEHICULO_FOTO != "" && data.FILE_VEHICULO_FOTO != null &&
                data.FILE_FORMVH_EXCEL != "" && data.FILE_FORMVH_EXCEL != null &&
                data.FILE_RUAT_VEHICULO != "" && data.FILE_RUAT_VEHICULO != null &&
                data.FILE_FOTO_SOLICITANTE != "" && data.FILE_FOTO_SOLICITANTE != null &&
                data.FILE_FOTO_LICENCIA_CI != "" && data.FILE_FOTO_LICENCIA_CI != null
            ) {
                //$rootScope.validacionRequisitosTec();

                $scope.guardarDatos(data);
                $scope.declaracionJurada(data);
                $("#declaracionN").modal("show");
            } else {
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }

        if (data.f01_validador_servicio == 'VENTAPRODVP') {
            if (data && data.f01_num_pmc != "" && data.f01_num_pmc != null &&
                data.f01_tipo_lic_descrip != "" && data.f01_tipo_lic_descrip != null &&
                data.f01_raz_soc != "" && data.f01_raz_soc != null &&
                data.f01_categoria_agrupada_descrip != "" && data.f01_categoria_agrupada_descrip != null &&
                data.f01_macro_act != "" && data.f01_macro_act != null &&
                data.f01_zona_act != "" && data.f01_zona_act != null &&
                data.f01_correo_electronico_ae != "" && data.f01_correo_electronico_ae != null &&
                data.f01_cantidad_personal != "" && data.f01_cantidad_personal != null &&
                data.f01_categoria_agrupada_descripcion != "" && data.f01_categoria_agrupada_descripcion != null &&
                data.f01_cantidad_personal != "" && data.f01_cantidad_personal != null &&
                data.f01_modalidad_pago != "" && data.f01_modalidad_pago != null &&
                data.FILE_CONTRATO_DELIVERY != "" && data.FILE_CONTRATO_DELIVERY != null &&
                data.FILE_FOTO_SOLICITANTE != "" && data.FILE_FOTO_SOLICITANTE != null
            ) {
                //$rootScope.validacionRequisitosTec();

                $scope.guardarDatos(data);
                $scope.declaracionJurada(data);
                $("#declaracionN").modal("show");
            } else {
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }

        }


    }


    $scope.div_archivoexcelformulario = false;
    $scope.div_aeserviciosdelivery = false;
    $scope.div_fotografiafrentenitidasolicitante = false;
    $scope.div_fotografiaslicenciaconducir = false;
    $scope.div_fotosvehiculolateralfrontal = false;
    $scope.div_permisocirculacionvehicular = false;
    $scope.div_documentosruatvehiculo = false;
    $scope.divreferencia = false;
    $scope.div_correelec = false;
    $scope.divalimentos = false;

    $scope.docdinamicos = function(data) {
        console.log(data);
        //OPCION 1
        if (data == 'VENTAPRODED') {
            $scope.div_archivoexcelformulario = true;
            $scope.div_fotografiafrentenitidasolicitante = true;
            $scope.div_fotografiaslicenciaconducir = true;
            $scope.div_fotosvehiculolateralfrontal = true;
            $scope.div_permisocirculacionvehicular = true;
            $scope.div_documentosruatvehiculo = true;
            $scope.div_aeserviciosdelivery = false;
            $scope.divreferencia = true;
            $scope.div_correelec = true;
            $scope.divalimentos = true;
        } else {
            //OPCION 3
            if (data == 'VENTAPRODVP') {
                $scope.div_archivoexcelformulario = true;
                $scope.div_aeserviciosdelivery = true
                $scope.div_fotografiafrentenitidasolicitante = true;
                $scope.div_fotografiaslicenciaconducir = true;
                $scope.div_fotosvehiculolateralfrontal = true;
                $scope.div_permisocirculacionvehicular = true;
                $scope.div_documentosruatvehiculo = true;
                $scope.divreferencia = true;
                $scope.div_correelec = true;
                $scope.divalimentos = true;
            } else {
                //OPCION 2
                if (data == 'SERVICIODEL') {
                    $scope.div_archivoexcelformulario = true;
                    $scope.div_fotografiafrentenitidasolicitante = true;
                    $scope.div_fotografiaslicenciaconducir = true;
                    $scope.div_fotosvehiculolateralfrontal = true;
                    $scope.div_permisocirculacionvehicular = true;
                    $scope.div_documentosruatvehiculo = true;
                    $scope.div_aeserviciosdelivery = false;
                    $scope.divreferencia = false;
                    $scope.div_correelec = true;
                    $scope.divalimentos = false;
                } else {
                    $scope.div_archivoexcelformulario = false;
                    $scope.div_aeserviciosdelivery = false;
                    $scope.div_fotografiafrentenitidasolicitante = false;
                    $scope.div_fotografiaslicenciaconducir = false;
                    $scope.div_fotosvehiculolateralfrontal = false;
                    $scope.div_permisocirculacionvehicular = false;
                    $scope.div_documentosruatvehiculo = false;
                    $scope.divreferencia = false;
                    $scope.div_correelec = false;
                    $scope.divalimentos = false;
                }

            }
        }
    }



}