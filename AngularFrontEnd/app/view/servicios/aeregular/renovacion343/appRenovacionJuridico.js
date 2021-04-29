function renovacionJuridicoController($scope, $timeout, $rootScope, $routeParams, $location, $http, $q, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter, FileUploader, ngTableParams, $filter, fileUpload, fileUpload1, wsRgistrarPubliciadad, $window, obtFechaActual) {
    var fecha = new Date();
    var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.divJuridico = false;
    $scope.divOcultarJuegos = true;
    $scope.tblTramites = {};
    $scope.trmUsuario = [];
    $scope.mostrarMsgActividadTrue = false;
    $scope.mostrarMsgActividadFalse = false;
    $scope.btnEnviarFormLinea = "true";
    $scope.multiple = '';
    $scope.licenciamultiple = false;
    $scope.sCategoria = true;
    $scope.smultiservicios = false;
    /*SELECCIONAR ACTIVIDAD ECONOMICA*/
    $scope.idActividiadEconomicaActual = "";
    $scope.nroOrdenActividiadEconomicaActual = "";
    $scope.idContribuyenteAEActual = "";
    $scope.multipleJuridico = {};
    //RADIO PARA VER SI REALIZARA UNA NUEVA ACTIVIDAD O UNA RENOVACION
    $scope.validarEmisionRenovacion = function(camb) {
        var datosgen = ((typeof($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        if (camb != "NUEVO" && datosgen.length > 0) {
            $scope.botones = null;
            $scope.desabilitado = true;
            swal('', "Favor revisar la información y seleccionar la Actividad Economica que realizará, para la Emisión de la Licencia.", 'warning');
        } else {
            $scope.botones = "mostrar";
            $scope.desabilitado = false;
        }
    }

    /*CIUDADANO - TIPO INICIO DE TRAMITE NUEVO - RENOVACION*/
    $scope.cambioToggleForm = function(cambio) {
        $scope.validarEmisionRenovacion(cambio);
        if (cambio == "RENOVACION") {
            $scope.mostrarMsgNuevaActividad = false;
            $scope.mostrarMsgActividadTrue = true;
            $scope.mostrarMsgActividadFalse = false;
            $scope.formDatosAE = true;
            $scope.tipoCategoria = false;
            $scope.actividadDesarrollada = true;
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
            $scope.datos.f01_actividadesSecundarias = '';
            $scope.datos.f01_factor = '';
            $scope.datos.f01_tip_act = '';
            $scope.datos.f01_tipo_lic = '';
            $scope.datos.f01_categoria = '';
            $scope.datos.f01_categoria_descrip = '';
            $scope.datos.f01_tipo_lic = '';
            $scope.datos.f01_tipo_lic_descrip = '';
            $scope.datos.f01_categoria = '';
            $scope.datos.f01_categoria_descrip = '';
            $scope.datos.f01_categoria_agrupada = '';
            $scope.datos.f01_categoria_descripcion = '';
            $scope.datos.f01_categoria_agrupada_descripcion = '';
            $scope.datos.f01_categoria_agrupada_descrip = '';
            $scope.datos.f01_categoria_descrip2 = '';
            $scope.licenciaToogle1 = true;
            $scope.licenciaToogle2 = false;
            $scope.licenciaToogle1 = false;
            $scope.licenciaToogle2 = true;
            $scope.publicidad = '';
            $scope.publicidad_grilla = '';
            $scope.datos.publicidad = '';
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
            $scope.datos.FILE_CI = '';
            $scope.datos.fileArchivosAd = '';
            $scope.datos.pago_adel = '';
            $scope.datos.nro_ges = '';
            //LISTAMOS LA TABLA SI ESTA VACIA
            $scope.validarActividadEconomica();
        }
        var datosgen = ((typeof($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        if (JSON.stringify(datosgen) === '{}' && cambio != "NUEVO") {
            $scope.mostrarMsgNuevaActividad = false;
            swal('', " Estimado Ciudadano no tiene actividad económica registrada.", 'warning');
            $scope.datos.rdTipoTramite = "NUEVO";
        }
    };

    $scope.cambioToggle1 = function(dato) {
        $scope.lscategoria();
        $scope.lssubcategoria();
        if (dato == "NUEVO") {
            $scope.licenciaToogle4 = true;
        } else {
            $scope.licenciaToogle4 = false;
        }
    };

    $scope.IsVisible = false;
    $scope.ShowPa = function(valor) {
        $scope.calculo_total = 0;
        if (valor == 'true' || valor == true) {
            $scope.IsVisible = true;
            $scope.datos.listDeudas = [];
            $scope.datos.pago_adelantado = valor;

        } else {
            if ($scope.datos.f01_categoria_descrip == 881 || $scope.datos.f01_categoria_descrip == '881' || $scope.datos.f01_categoria_agrupada == 1724 || $scope.datos.f01_categoria_agrupada == '1724' || $scope.datos.f01_tipo_lic == 21 || $scope.datos.f01_tipo_lic == '21') {
                swal('Estimado Ciudadano', 'La actividad desarrollada seleccionada requiere que realice el Pago por Adelantado!', 'warning');
                $scope.IsVisible = true;
                $scope.datos.pago_adelantado = valor;

                document.getElementById('pago_adelantado').checked = true;
            } else {
                $scope.datos.nro_ges = '';
                $scope.datos.listDeudas = [];
                $scope.IsVisible = false;
                document.getElementById('pago_adelantado').checked = false;
                $scope.datos.pago_adelantado = valor;
                //$scope.datos.pago_adelantado = 'NO';
            };
        };
    }

    $scope.validarActividadEconomica = function() {
        $scope.mostrarMsgActividadTrue = false;
        $scope.mostrarMsgActividadFalse = false;
        $scope.mostrarMsgNuevaActividad = false;
        $scope.listarAE();
    };

    $scope.listarAE = function() {
        $scope.sIdAeGrilla = $scope.datos.INT_TRAMITE_RENOVA;
        var dataGenesis = ((typeof($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        var sNumeroRegistros = dataGenesis.length;
        if (sNumeroRegistros > 0) {
            $scope.datos.rdTipoTramite = "RENOVACION";
            var tipoPersona = sessionService.get('TIPO_PERSONA');
            var idContribuyente = $scope.dataGenesisCidadano[0].idContribuyente;
            if (tipoPersona == "NATURAL") {
                tipoPersona = "N";
            } else {
                tipoPersona = "J";
            }
            var contribuyente = new gLstActividadEconomica();
            contribuyente.idContribuyente = idContribuyente;
            contribuyente.tipo = tipoPersona;
            contribuyente.lstActividadEconomica(function(resultado) {
                resultadoApi = JSON.parse(resultado);
                if (resultadoApi.success) {
                    var response = resultadoApi;
                    if (response.success.dataSql.length > 0) {
                        //PRETUNTAR Y LISTAR, SOLO LOS TRÃMITES EN LINEA DE INTERNET
                        $scope.formDatosAE = true;
                        $scope.mostrarMsgActividadTrue = true;
                        $scope.mostrarMsgActividadFalse = false;
                        $scope.trmUsuario = response.success.dataSql;
                        var data = response.success.dataSql;
                        $scope.tblTramites.reload();
                    } else {
                        $scope.mostrarMsgActividadTrue = false;
                        $scope.mostrarMsgActividadFalse = true;
                        $scope.formDatosAE = false;
                    }
                    var sformguardado = $scope.datos.INT_FORM_ALMACENADO;
                    if (typeof sformguardado == 'undefined' || sformguardado != 'G') {
                        $scope.botones = null;
                        $scope.desabilitado = true;
                        swal('', "Favor revisar la información y seleccionar la Actividad Economica que desea Renovar.", 'warning');
                    } else {
                        $scope.botones = "mostrar";
                        $scope.desabilitado = false;
                    }
                } else {
                    swal('', "Datos no Encontrados !!!", 'warning');
                }
            });
        } else {
            $scope.botones = "mostrar";
            $scope.desabilitado = false;
            $scope.mostrarMsgActividadTrue = false;
            $scope.mostrarMsgActividadFalse = true;
            $scope.mostrarMsgNuevaActividad = true;
            $scope.formDatosAE = false;
            if ($scope.txtMsgConexionGen != '') {
                $scope.txtMsgDataRenovacion = $scope.txtMsgConexionGen;
            } else {
                $scope.datos.rdTipoTramite = "NUEVO";
                $scope.txtMsgDataRenovacion = "Estimado Ciudadano no tiene actividad económica registrada.";
                $scope.txtMsgDataNuevaActividad = "Favor revisar la informacion de la nueva Actividad Economica que Creara.";
            }
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

    $scope.datosRepresentanteLegal = function(idContribuyente) {
        try {
            var paramRepLegal = new datosRepresentanteLgEmpresa();
            paramRepLegal.idEmpresa = idContribuyente;
            paramRepLegal.datos_RepresentanteLgEmpresa(function(resp) {
                x = JSON.parse(resp);
                var responseLegal = x.success.dataSql;
                $.unblockUI();
                if (responseLegal.length > 0) {
                    var datos = {};
                    $scope.datos.f01_tipo_per = "J";
                    $scope.datos.f01_id_representante_legal = responseLegal[0].idRepresentanteLegal; //idRepresentanteLegal
                    $scope.datos.f01_expedido_rep = responseLegal[0].expedicion; //expedicion
                } else {
                    swal('', "No existen ninguno ciudadano", 'error');
                }
            }).error(function(responseLegal) {
                swal('', "Datos no Encontrados !!!", 'warning');
                $.unblockUI();
            });
        } catch (error) {
            console.log("error");
        }
    };

    $scope.datosAnterioresJuridico = function(datos) {
        $scope.datosMod = datos;
        var datosGenerales = new getDatosAEViae();
        datosGenerales.idActividadEconomica = datos;
        datosGenerales.getDatosAE_Viae(function(resultado) {
            resultadoApi = JSON.parse(resultado);
            $scope.datosAnt = resultadoApi.success.dataSql.datosAE[0];
            $scope.datosAntPub = resultadoApi.success.dataSql.datosVIAE;
            $scope.datos.superficiezonseg = $scope.datosAnt.superficie;
            var respuestaVIAE = resultadoApi.success.dataSql.datosVIAE;
            $scope.datos.publicidadAntiguo = respuestaVIAE;
            $scope.PlubliAntiguo_Grilla(respuestaVIAE);
            var ncategoria = new getCategoriaLicencia();
            ncategoria.dependencia = $scope.datosAnt.idActividadDesarrollada;
            ncategoria.getCategoria_Licencia(function(results) {
                var categorialic = JSON.parse(results);
                var catLicencia = categorialic.success.data;
                if (catLicencia) {
                    $scope.datosA = catLicencia;
                }
            });
        });
    };

    $scope.PlubliAntiguo_Grilla = function(dato) {
        $scope.publia_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = { "tipo": "GRD", "campos": "nroElem|descripcionTipoLetrero|caracteristica|descripcion|cara|alto|ancho|superficie|INT_CATE|", "titulos": "ID|Tipo de Letrero|Caracteristica|Descripción|Cara|Alto|Ancho|Superficie|Categoria", "impresiones": "true|true|true|true|true|true|true|true|false" };
        var nroElem = 0;
        var j = 0;
        for (j = 0; j < dato.length; j++) {
            $scope.publia_grilla.push({
                nroElem: j + 1,
                descripcionTipoLetrero: dato[j].descripcionTipoLetrero,
                caracteristica: dato[j].caracteristica,
                descripcion: dato[j].descripcion,
                cara: dato[j].cara,
                alto: dato[j].alto,
                ancho: dato[j].ancho,
                superficie: dato[j].superficie,
                INT_CATE: dato[j].INT_CATE,
                estado: dato[j].estado
            });
        }
        var jsonString = '[' + (encabezado) + ']';
        angular.forEach($scope.publia_grilla, function(value, key) {
            encabezado[indice] = value;
            indice = indice + 1;
        });
        $scope.datos.publicidadAntiguo_grilla = encabezado;
    }

    $scope.obtenerActDes = function(idActividadDesarrollada) {
        $scope.datosactividadDes = "";
        var dato = new getHomologacion();
        dato.idActividadDesarrollada = idActividadDesarrollada;
        dato.get_Homologacion(function(res) {
            x = JSON.parse(res);
            var resp = x.success.dataSql;
            if (resp.length > 0) {
                $scope.datos.f01_categoria_agrupada = resp[0].idCategoria;
                $scope.datos.f01_categoria_agrupada_descrip = resp[0].descripcion;
                $scope.datos.f01_tipo_lic = resp[0].idTipoLicencia; //response[0].TipoLicencia;
                $scope.datos.f01_tipo_lic_descrip = resp[0].TipoLicenciaDescripcion;
                $scope.datosactividadDes = resp;
            }
        })
    }

    $scope.selActividadEconomica = function(tramite) {
        //RENOVA ID ACTIVIDAD
        var fechatram = "";
        var aniotram = "";
        var smacrodes = "";
        $scope.datos.publicidad = '';
        $scope.publicid = '';
        var codhojaruta = "";
        var datosLotus = "";
        $scope.datosAnterioresJuridico(tramite.IdActividad);
        var dato = tramite.FechaInicio.split('/');
        aniotram = dato[2];
        var anioserv = $scope.anioserver.toString();
        console.log(aniotram, "anos : ", anioserv);
        if (aniotram != anioserv) {
            if (tramite.IdActividad) {
                $scope.idActividiadEconomicaActual = tramite.IdActividad;
                $scope.datos.f01_id_actividad_economica = tramite.IdActividad;
            }
            $scope.sIdAeGrilla = tramite.IdActividad;
            var tipoPersona = sessionService.get('TIPO_PERSONA');
            if (tipoPersona == "JURIDICO") {
                tipoPersona = "J";
            }
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
                            response[0].numeroOrden = "0";
                            $scope.nroOrdenActividiadEconomicaActual = response[0].numeroOrden;
                            $scope.datos.f01_nro_orden = response[0].numeroOrden;
                        } else {
                            $scope.nroOrdenActividiadEconomicaActual = response[0].numeroOrden;
                            $scope.datos.f01_nro_orden = response[0].numeroOrden;
                        }
                        $scope.idContribuyenteAEActual = response[0].idContribuyente;
                        $scope.datos.f01_id_contribuyente = response[0].idContribuyente;
                        $scope.datosRepresentanteLegal(response[0].idContribuyente);
                        if (tipoPersona != "N") {
                            tipoPersona = "J";
                            var hinicio = ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? "" : response[0].horarioAtencion.toUpperCase());
                            var hfinal = ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? "" : response[0].horarioAtencion.toUpperCase());
                            var smacro = "MACRODISTRITO";
                            var szona = "DISTRITO";
                            //DATOS DE LA ACTIVIDAD ECONÓMICA
                            $scope.datos.f01_denominacion = response[0].denominacion;
                            $scope.datos.f01_sup = response[0].superficie;
                            $scope.datos.INT_AC_CAPACIDAD = response[0].capacidad;

                            try {
                                smacrodes = smacro + " " + response[0].IdMacrodistrito + " " + response[0].Macrodistrito;
                                szona = szona + " " + response[0].idDistrito_actividadEconomica + " - " + response[0].zona;
                                hinicio = hinicio.split('-')[0].trim();
                                hfinal = hfinal.split('-')[1].trim();
                            } catch (e) {}
                            if (response[0].IdMacrodistrito == 2 || response[0].IdMacrodistrito == '2') {
                                smacrodes = smacro + " " + response[0].IdMacrodistrito + " MAXIMILIANO PAREDES";
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
                            $scope.datos.f01_tipo_lic_ant = response[0].descripcion;
                            $scope.datos.f01_categoria_agrupada_ant = response[0].actividadesSecundarias;
                            $scope.datos.f01_categoria_descrip_ant = response[0].ActividadDesarrollada;
                            $scope.obtenerActDes(response[0].idActividadDesarrollada);
                            //$scope.datos.f01_tipo_lic = response[0].idTipoLicencia;
                            //$scope.datos.f01_tipo_lic_descrip = response[0].descripcion;
                            /*Ubicación de Actividad Económica*/
                            $scope.distritoZonas(response[0].IdMacrodistrito);
                            $scope.datos.INT_AC_MACRO_ID = response[0].IdMacrodistrito;
                            $scope.datos.f01_macro_act = response[0].IdMacrodistrito;
                            $scope.datos.f01_macro_act_descrip = smacrodes;
                            $scope.datos.f01_idCodigoZona = response[0].idCodigoZona;
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
                            $scope.actulizarIdDistrito();
                            $scope.actulizarIdDistrito();
                            if (response[0].edificio == 'undefined' || response[0].bloque == 'undefined' || response[0].piso == 'undefined' || response[0].departamento == 'undefined' || response[0].telefono == 'undefined' || response[0].casilla == 'undefined') {
                                response[0].edificio = '';
                                response[0].bloque = '';
                                response[0].piso = '';
                                response[0].departamento = '';
                                response[0].telefono = '';
                                response[0].casilla = '';
                            }
                            $scope.datos.f01_edificio_act = response[0].edificio;
                            $scope.datos.f01_bloque_act = response[0].bloque;
                            $scope.datos.f01_piso_act = response[0].piso;
                            $scope.datos.f01_dpto_of_loc = response[0].departamento;
                            $scope.datos.f01_tel_act1 = response[0].telefono;
                            $scope.datos.f01_casilla = response[0].casilla;
                            $scope.cargarNombVia($scope.datos.f01_tip_via_act, $scope.datos.f01_zona_act);
                        }
                        //INT_TRAMITE_RENOVA
                        $scope.datos.INT_TRAMITE_RENOVA = tramite.IdActividad;
                        if (codhojaruta.substring(0, 5) == 'RE-LF' || codhojaruta.substring(0, 6) == 'AER-EL' || codhojaruta.substring(0, 7) == 'MOD_MOD' || codhojaruta.substring(0, 8) == 'LICEN-AE' || codhojaruta.substring(0, 5) == 'EM-LF') {
                            var dataLotus = $scope.getDatosLotus(resultadoApi.success.dataSql.datosAE[0].idActividadEconomica, codhojaruta);
                            dataLotus.then(function(respuesta) {
                                datosLotus = respuesta.success.data[0].datos;
                                if ((datosLotus.INT_AC_latitud == 'undefined' && datosLotus.INT_AC_longitud == 'undefined') || (datosLotus.INT_AC_latitud == null && datosLotus.INT_AC_longitud == null)) {
                                    $scope.croquis = true;
                                    $scope.datos.INT_AC_latitud = '';
                                    $scope.datos.INT_AC_longitud = '';
                                    $scope.open_map_ae();
                                } else {
                                    $scope.croquis = null;
                                    $scope.datos.INT_AC_latitud = datosLotus.INT_AC_latitud;
                                    $scope.datos.INT_AC_longitud = datosLotus.INT_AC_longitud;
                                    $scope.open_map_ae($scope.datos.INT_AC_latitud, $scope.datos.INT_AC_longitud);
                                };
                                var nomvia = '';
                                nomvia = datosLotus.f01_num_act_n;
                                if (nomvia == '' || nomvia == null || nomvia == 'undefined' || nomvia == undefined) {
                                    $scope.datos.f01_num_act = datosLotus.f01_num_act;
                                } else {
                                    $scope.datos.f01_num_act = 'NINGUNO';
                                    document.getElementById('f01_num_act').value = 'NINGUNO';
                                    $scope.datos.f01_num_act_n = nomvia;
                                };
                                if (datosLotus.File_Adjunto == 'undefined' || datosLotus.File_Adjunto == null) {
                                    $scope.reqdoc = true;
                                    $scope.docsAdjuntoAntiguo = '';
                                    $scope.datosdocanterior = '';
                                } else {
                                    $scope.reqdoc = null;
                                    $scope.docsAdjuntoAntiguo = datosLotus.File_Adjunto;
                                    $scope.datosdocanterior = new Object();
                                    for (var i = 0; i < $scope.docsAdjuntoAntiguo.length; i++) {
                                        if ($scope.docsAdjuntoAntiguo[i] == null || $scope.docsAdjuntoAntiguo[i] == 'undefined') {} else {
                                            var narchivo = $scope.docsAdjuntoAntiguo[i].url.split('?');
                                            var achinom = narchivo[0].split('/');
                                            var dimar = achinom.length;
                                            var datosdocant = {
                                                "titulo": $scope.docsAdjuntoAntiguo[i].nombre,
                                                "nombreAcrh": achinom[dimar - 1],
                                                "url": $scope.docsAdjuntoAntiguo[i].url
                                            };
                                            $scope.datosdocanterior[i] = datosdocant;
                                        };
                                    };
                                };
                            });
                        } else {}
                        /*HABILITANDO CAMPOS*/
                        $scope.botones = "mostrar";
                        $scope.desabilitado = false;
                        if (lstPublicidad.length > 0) {
                            $scope.datos.rdTipoTramite1 = 'NUEVO';
                            $scope.listpub = [];
                            for (var i = 0; i < lstPublicidad.length; i++) {
                                var lstpublicidad = new Object();
                                lstpublicidad.idPublicidad = lstPublicidad[i].idPublicidad;
                                lstpublicidad.INT_NRO_CARA = lstPublicidad[i].cara;
                                lstpublicidad.INT_SUP = lstPublicidad[i].superficie;
                                lstpublicidad.idcarac = lstPublicidad[i].idTipoLetrero;
                                lstpublicidad.INT_TIPO_LETRE = lstPublicidad[i].descripcionTipoLetrero;
                                lstpublicidad.id_cara = lstPublicidad[i].idCaracteristica;
                                lstpublicidad.INT_CARA = lstPublicidad[i].caracteristica;
                                lstpublicidad.idcate = lstPublicidad[i].idCategoria;
                                lstpublicidad.INT_ALTO = lstPublicidad[i].alto;
                                lstpublicidad.INT_ANCHO = lstPublicidad[i].ancho;
                                lstpublicidad.INT_DESC = lstPublicidad[i].descripcion;
                                lstpublicidad.estado = lstPublicidad[i].estado;
                                $scope.listpub[i] = lstpublicidad;

                            };
                            $scope.datos.swpublicidad = 'CP';
                            $scope.licenciaToogle4 = true;
                            $scope.datos.publicidadAE = $scope.listpub;
                            $scope.Plubli_Grilla($scope.datos.publicidadAE);
                            $scope.pubAE = true;
                            $scope.pubMensaje = false;
                        } else {
                            $scope.datos.rdTipoTramite1 = 'RENOVACION';
                            $scope.datos.swpublicidad = 'SP';
                            $scope.licenciaToogle4 = false;
                            //$scope.cambioToggle1('RENOVACION');
                        };
                        $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                    }
                } else {
                    swal('', "Datos no Encontrados !!!", 'warning');
                }
            });
        } else {
            swal('', "Actividad Economica Vigente!!!", 'warning');
        }
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

    $scope.limpiarmultiple = function() {
        $scope.licdes = [];
        $scope.multipleJuridico = [];
        $scope.dscripcionlic = {};
        $scope.licenciamul = '';
        $scope.datos.licenciam = '';
        $scope.datos.mulact_principal = '';
        $scope.datos.xf01_idcat_multi_principal = '';
        $scope.datos.xf01_descat_multi_principal = '';
    }
    datoObjectFiles_ci = [];
    $scope.datos.FILE_CI = '';
    $scope.datos.fileArchivosAd = '';

    $scope.catactividadDesarrollada = function() {
        $scope.datos.rdTipoTramite = 'RENOVACION';
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = "";
        try {
            var nActividadDesarrollada = new getDatosActividadDesarrollada343();
            nActividadDesarrollada.getDatos_ActividadDesarrollada343(function(resActDes) {
                var lstActividadDesarrollada = JSON.parse(resActDes);
                $scope.datosActividad = "";
                var datosLic = lstActividadDesarrollada.success.dataSql;
                $scope.datos.f01_actividad_desarrollada = "";
                if (datosLic.length > 0) {
                    for (var i = datosLic.length - 1; i >= 0; i--) {
                        if (datosLic[i].idActividadDesarrollada343 == 907 || datosLic[i].idActividadDesarrollada343 == '907') {
                            datosLic[i].descripcion343 = 'MULTISERVICIOS';
                        }
                    };
                    $scope.datosActividad = datosLic;
                } else {
                    $scope.msg = "Error !!";
                }

            });
        } catch (e) {
            alert("Error en la actividad desarrollada");
        }
    }

    $scope.LicenciaXCategoriaA = function(idDesarrollada, superficie) {
        $.blockUI();
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFile3 = new Object();
        datoObjectFile4 = new Object();
        datoObjectFile5 = new Object();
        datoObjectFile6 = new Object();
        datoObjectFiles_ci = [];
        $scope.datos.FILE_CI = '';
        $scope.datos.fileArchivosAd = '';
        try {
            var nDatosLic = new getDatosLicencia();
            nDatosLic.idActividadDesarrollada = idDesarrollada;
            nDatosLic.superficie = superficie;
            nDatosLic.getDatos_Licencia(function(resDatosLic) {
                var obtLic = JSON.parse(resDatosLic);
                var datosLic = obtLic.success.dataSql;
                if (datosLic.length > 0) {
                    $scope.sCategoria = true;
                    $scope.smultiservicios = false;
                    $scope.datosActividadLicencia = datosLic;
                    $scope.datos.f01_tipo_lic = datosLic[0].idTipoLicencia;
                    $scope.datos.f01_tipo_lic_descrip = datosLic[0].TipoLicenciaDescripcion;
                    $scope.datos.f01_categoria_agrupada = datosLic[0].idActividadDesarrollada;
                    $scope.datos.f01_categoria_agrupada_dem = datosLic[0].idActividadDesarrollada343;
                    $scope.datos.f01_categoria_agrupada_descrip = datosLic[0].ADDescripcion;
                    $scope.GetValueZonaSegura(datosLic[0].idActividadDesarrollada);
                    var comboz = document.getElementById('f01_categoria_descrip');
                    selected2 = comboz.options[comboz.selectedIndex].text;
                    $scope.datos.f01_categoria_descripcion = selected2;
                    $scope.datos.f01_categoria_descrip2 = selected2;
                    $scope.datos.f01_categoria_agrupada_descripcion = selected2;
                    $scope.datos.f01_actividadesSecundarias = datosLic[0].ADDescripcion;
                } else {
                    $scope.msg = "Error !!";
                }
                if (idDesarrollada == 907 || idDesarrollada == '907') {
                    $scope.sCategoria = false;
                    $scope.smultiservicios = true;
                    $scope.actividadDesarrolladaM();
                }
                datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
                datoObjectFile1.campo = 'Cedula de identidad (Anverso)';
                datoObjectFile1.nombre = 'Cedula de identidad (Reverso)';
                datoObjectFiles_ci[0] = datoObjectFile1;
                datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
                datoObjectFile2.campo = 'Cedula de identidad (Anverso)';
                datoObjectFile2.nombre = 'Cedula de identidad (Reverso)';
                datoObjectFiles_ci[1] = datoObjectFile2;
                datoObjectFile3.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.f01_poder_representante + "?app_name=todoangular";
                datoObjectFile3.campo = 'Poder de Representación Legal';
                datoObjectFile3.nombre = 'Poder de Representación Legal';
                datoObjectFiles_ci[2] = datoObjectFile3;
                datoObjectFile4.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.f01_test_cons_sociedad_j + "?app_name=todoangular";
                datoObjectFile4.campo = 'Testimonio de Constitución de Sociedad';
                datoObjectFile4.nombre = 'Testimonio de Constitución de Sociedad';
                datoObjectFiles_ci[3] = datoObjectFile4;
                datoObjectFile5.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.file_num_ident + "?app_name=todoangular";
                datoObjectFile5.campo = 'NIT o inscripción al Régimen Simplificado';
                datoObjectFile5.nombre = 'NIT o inscripción al Régimen Simplificado';
                datoObjectFiles_ci[4] = datoObjectFile5;
                datoObjectFile6.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.file_fund_emp + "?app_name=todoangular";
                datoObjectFile6.campo = 'FUNDEMPRESA o Matricula de Comercio';
                datoObjectFile6.nombre = 'FUNDEMPRESA o Matricula de Comercio';
                datoObjectFiles_ci[5] = datoObjectFile6;
                $scope.datos.FILE_CI = datoObjectFiles_ci;
                //$scope.getRequisitosActividad($scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
                //$scope.GetValueActividadSecundaria();
                $scope.getRequisitosFormulario($scope.datos.f01_categoria_agrupada, $scope.datos.f01_tipo_per);
                $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada, $scope.datos.f01_tipo_per);
                $scope.getRequisitosCategoriaTecnicos($scope.datos.f01_tipo_lic, $scope.datos.f01_categoria_agrupada, $scope.datos.f01_tipo_per);

                $.unblockUI();
            });
        } catch (e) {
            console.log("Error en la actividad desarrollada");
            $.unblockUI();
        }
    }

    $scope.getRequisitosActividad = function(idCategoria, persona) {
        persona = sessionService.get('TIPO_PERSONA');
        try {
            var parametros = new aelstRequisitosDocActividad();
            parametros.dependencia = idCategoria;
            parametros.tipopersona = persona;
            parametros.aelst_RequisitosDocActividad(function(res) {
                x = JSON.parse(res);
                datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for (j = 0; j < datosRequisitosTmp.length; j++) {
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_actividad_economica = datoObjectFinal;
                $rootScope.datosRequisitos = datoObjectFinal;
            });
        } catch (error) {
            alert("requisitos actividad");
        }
    };

    $scope.actividadDesarrolladaM = function() {
        $.blockUI();
        var datosMulti = [];
        try {
            var nActividadDesarrollada = new getDatosActividadDesarrollada343();
            nActividadDesarrollada.getDatos_ActividadDesarrollada343(function(resActDesM) {
                var lstActividadDesM = JSON.parse(resActDesM);
                var dataResp = lstActividadDesM.success.dataSql;
                for (var i = 0; i < dataResp.length; i++) {
                    if (dataResp[i].idActividadDesarrollada343 == '907' || dataResp[i].idActividadDesarrollada343 == 907) {} else {
                        objMulti = new Object();
                        objMulti.codigo343 = dataResp[i].codigo343;
                        objMulti.descripcion343 = dataResp[i].descripcion343;
                        objMulti.descripcionActividadDesarrollada = dataResp[i].descripcionActividadDesarrollada;
                        objMulti.descripcionTipoLicencia = dataResp[i].descripcionTipoLicencia;
                        objMulti.estado343 = dataResp[i].estado343;
                        objMulti.fecha343 = dataResp[i].fecha343;
                        objMulti.idActividadDesarrollada = dataResp[i].idActividadDesarrollada;
                        objMulti.idActividadDesarrollada343 = dataResp[i].idActividadDesarrollada343;
                        objMulti.idTipoLicencia = dataResp[i].idTipoLicencia;
                        objMulti.proceso = dataResp[i].proceso;
                        datosMulti[i] = objMulti;
                    };
                };
                $scope.datosActividadMul = datosMulti;

                $.unblockUI();
            });
            $.unblockUI();
        } catch (e) {
            console.log("Error en la actividad desarrolladaA");
        }
    }

    $scope.LicenciaXCategoriaM = function(idDesarrollada, superficie) {
        $.blockUI();
        $scope[name] = 'Running';
        var deferred = $q.defer();
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFiles_ci = [];
        try {
            var nDatosLic = new getDatosLicencia();
            nDatosLic.idActividadDesarrollada = idDesarrollada;
            nDatosLic.superficie = superficie;
            nDatosLic.getDatos_Licencia(function(resDatosLicM) {
                var obtLicM = JSON.parse(resDatosLicM);
                var datosLicM = obtLicM.success.dataSql;
                if (datosLicM.length > 0) {
                    //$scope.multipleJuridico = datosLicM;
                    $scope.multipleJuridico.f01_tipo_licmid = datosLicM[0].idTipoLicencia;
                    $scope.multipleJuridico.f01_tipo_licmdescrip = datosLicM[0].TipoLicenciaDescripcion;
                    $scope.multipleJuridico.f01_cat_agrupadamid = datosLicM[0].idActividadDesarrollada;
                    $scope.multipleJuridico.f01_cat_agrupadamdescrip = datosLicM[0].ADDescripcion;
                    $scope.multipleJuridico.f01_act_desarrolladamid = idDesarrollada;
                    var combox = document.getElementById('f01_act_desarrolladamid');
                    selected2 = combox.options[combox.selectedIndex].text;
                    $scope.multipleJuridico.f01_act_desarrolladamdescrip = selected2;
                    $scope.multipleJuridico.f01_tae = datosLicM[0].tae;
                    $scope.getRequisitosFormulario(datosLicM[0].idActividadDesarrollada, $scope.datos.f01_tipo_per);
                    deferred.resolve($scope.multipleJuridico);
                    $.unblockUI();
                } else {
                    $scope.msg = "Error !!";
                    $.unblockUI();
                }
            });
        } catch (e) {
            console.log("Error en la actividad desarrolladaM");
        }
    }

    $scope.guardarLicencia = function(licencia) {
        $scope.dscripcionlic = {};
        if (licencia.f01_tipo_licmid == '' || licencia.f01_tipo_licmid == null || licencia.f01_cat_agrupadamid == '' || licencia.f01_cat_agrupadamid == null) {
            swal('', 'Llene lo campos requeridos para la Catergoria Multiple  ', 'error');
        } else {
            var id = 0
            if ($scope.datos.licenciam == '' || $scope.datos.licenciam == null || $scope.datos.licenciam == "undefined") {
                if ($scope.licenciamul == '' || $scope.licenciamul == null || $scope.licenciamul == "undefined") {
                    $scope.licenciamul = [];
                    id = 0;
                }
                id = $scope.licenciamul.length + 1;
            } else {
                id = $scope.licenciamul.length + 1;
            }
            if (id < 11) {
                $scope.id = id;
                if ($scope.id == 1) {
                    $scope.f01_catagrp_principal = 1;
                    $scope.datos.mulact_principal = licencia.f01_act_principal2;
                    $scope.datos.xf01_idcat_multi_principal = licencia.f01_cat_agrupadamid;
                    $scope.datos.xf01_descat_multi_principal = licencia.f01_cat_agrupadamdescrip;
                } else {
                    $scope.f01_catagrp_principal = 0;
                }
                $scope.licenciamul.push({
                    id: id,
                    f01_tipo_licmid: licencia.f01_tipo_licmid,
                    f01_cat_agrupadamid: licencia.f01_cat_agrupadamid,
                    f01_act_desarrolladamid: licencia.f01_act_desarrolladamid,
                    f01_tipo_licmdescrip: licencia.f01_tipo_licmdescrip,
                    f01_cat_agrupadamdescrip: licencia.f01_cat_agrupadamdescrip,
                    f01_act_desarrolladamdescrip: licencia.f01_act_desarrolladamdescrip,
                    f01_catagrp_principal: $scope.f01_catagrp_principal
                });
                $scope.licdes = [];
                $scope.multipleJuridico = [];
                $scope.dscripcionlic = {};
                $scope.multipleJuridico.f01_act_desarrolladamid = "";
                document.getElementById("f01_act_desarrolladamid").value = '';
                $scope.multipleJuridico.f01_tipo_licmid = "";
                $scope.datos.licenciam = $scope.licenciamul;
                $scope.Licencia_Multiple($scope.licenciamul);
                /*LISTAR REQUISITOS DINAMICOS*/
                $scope.lstRequisitosMultiples2018($scope.licenciamul);
                $scope.lstRequisitosTecnicosMultiples($scope.licenciamul);
            } else {
                swal('', 'El numero de multiples excede los estandares permitidos', 'error');
            }
        }
    }

    $scope.Licencia_Multiple = function(dato) {
        $scope.licmul_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = { "tipo": "GRD", "campos": "nroElem|f01_tipo_licmid|f01_tipo_licmdescrip|f01_cat_agrupadamid|f01_cat_agrupadamdescrip|f01_act_desarrolladamid|f01_act_desarrolladamdescrip|f01_catagrp_principal", "titulos": "NRO|Id Licencia|Tipo de Licencia|Id Categoria|Tipo de Categoria|Id Actividad|Tipo de Actividad Desarrollada|Actividad Principal", "impresiones": "true|false|true|false|true|false|true|false|" };
        var nroElem = 0;
        var j = 0;
        for (j = 0; j < dato.length; j++) {
            $scope.licmul_grilla.push({
                nroElem: j + 1,
                f01_tipo_licmid: dato[j].f01_tipo_licmid,
                f01_tipo_licmdescrip: dato[j].f01_tipo_licmdescrip,
                f01_cat_agrupadamid: dato[j].f01_cat_agrupadamid,
                f01_cat_agrupadamdescrip: dato[j].f01_cat_agrupadamdescrip,
                f01_act_desarrolladamid: dato[j].f01_act_desarrolladamid,
                f01_act_desarrolladamdescrip: dato[j].f01_act_desarrolladamdescrip,
                f01_catagrp_principal: dato[j].f01_catagrp_principal
            });
        }
        var jsonString = '[' + (encabezado) + ']';
        angular.forEach($scope.licmul_grilla, function(value, key) {
            encabezado[indice] = value;
            indice = indice + 1;
        });
        $scope.datos.Licenmul_grilla = encabezado;
    }

    $scope.detallem = [];
    $scope.editm = {};
    $scope.onlym = false;
    $scope.botonm = "new";

    $scope.modificarLic = function(dato) {
        $scope.onlym = true;
        $scope.botonm = "upd";
        $scope.multipleJuridico = dato;
    }

    $scope.eliminarLic = function(dato) {
        $scope.licenciamul.splice($scope.licenciamul.indexOf(dato), 1);
        $scope.idm = $scope.idm - 1;
    }

    $scope.modificarLicencia = function(dato) {
            $scope.onlym = true;
            $scope.botonm = "new";
            delete $scope.editm[dato.idm];
            $scope.multipleJuridico = [];
        }
        ///TERMINA LICENCIA MULTIPLE

    var requisitosDoc = [];
    $scope.validacionRequisitos = function(sup) {
        requisitosDoc = $rootScope.datosRequisitos;
        datoObjectFinal = [];
        datoObjectFinal2 = [];
        for (var i = 0; i < requisitosDoc.length; i++) {
            datoObject = new Object();
            datoObject2 = new Object();
            if (requisitosDoc.resvalor == " PARA INMUEBLES CON SUPERFICIE MAYOR A 150 M2: PLANO ELABORADO POR ARQUITECTO DETALLANDO LOS AMBIENTES UTILIZADOS" && sup < 150) {
                datoObject2.resid = requisitosDoc[i].resid;
                datoObject2.resvalor = requisitosDoc[i].resvalor;
                datoObject2.estado = requisitosDoc[i].estado;
                datoObjectFinal2[i] = datoObject2;
            } else {
                datoObject.resid = requisitosDoc[i].resid;
                datoObject.resvalor = requisitosDoc[i].resvalor;
                datoObject.estado = requisitosDoc[i].estado;
                datoObjectFinal[i] = datoObject;
            }
        }
        $rootScope.datosRequisitosmostrar = datoObjectFinal;
    }

    $scope.getRequisitosCategoria = function(idCategoria, persona) {
        if (persona == 'JURIDICO') {
            persona = 'J';
        }
        $scope.categoriaid = idCategoria;
        $scope.tipoper = persona;
        try {
            var ndCategoria = new aelstRequisitosDocCategoria();
            ndCategoria.dependencia = idCategoria;
            ndCategoria.tipopersona = persona;
            ndCategoria.aelst_RequisitosDocCategoria(function(res) {
                x = JSON.parse(res);
                var datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for (j = 0; j < datosRequisitosTmp.length; j++) {
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_actividad_economica = datoObjectFinal;
                $rootScope.datosRequisitos = datoObjectFinal;
                $scope.getRequisitosTecnicosCategoria(idCategoria, persona);
                $rootScope.datosAdjuntos = datoObjectFinal;
            })
        } catch (error) {
            console.log("error en requisitos categoria");
        }
    };

    $scope.lstRequisitosTecnicosMultiples = function(licenciamul) {
        var sconsulta = '[';
        for (i = 0; i < licenciamul.length; i++) {
            sconsulta = sconsulta + '{"id":' + licenciamul[i].f01_cat_agrupadamid + "},";
        }
        sconsulta = sconsulta.substring(0, sconsulta.length - 1);
        sconsulta = sconsulta + ']';
        aidCategoria = sconsulta;
        if ($scope.datos) {
            var aidCategoria = aidCategoria;
            var persona = 'J';
            var ndCategoria = new aelstRequisitostecmul();
            ndCategoria.dependencia = aidCategoria;
            ndCategoria.tipopersona = persona;
            ndCategoria.aelst_Requisitostecmul(function(res) {
                var result = JSON.parse(res);
                var datosRequisitosTmp = result.success.data;
                datoObjectFinal = [];
                for (j = 0; j < datosRequisitosTmp.length; j++) {
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idrequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descrequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                $rootScope.datosTecnicos = datoObjectFinal;
                setTimeout(function() {
                    iniciarLoadFyle();
                }, 1000);
            })
        }
    };

    /*$scope.getRequisitosCategoriaTecnicos = function(idTipoLicencia, idCategoria, persona){
        if(idTipoLicencia == 17 || idTipoLicencia == '17' || idTipoLicencia == 18 || idTipoLicencia == '18'){
            $scope.getRequisitosTecnicosActividad(idCategoria, persona);
        }else{
            $scope.getRequisitosTecnicosCategoria(idCategoria, persona);
        }
    }*/

    $scope.getRequisitosTecnicosActividad = function(idCategoria, persona) {
        if (persona == 'JURIDICO') {
            persona = 'J';
        }
        try {
            var ntActividad = new aelstRequisitosTecActividad();
            ntActividad.dependencia = idCategoria;
            ntActividad.tipopersona = persona;
            ntActividad.aelst_RequisitosTecActividad(function(res) {
                x = JSON.parse(res);
                datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for (j = 0; j < datosRequisitosTmp.length; j++) {
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                $rootScope.datosTecnicos = datoObjectFinal;
            });
        } catch (error) {
            $scope.errors["error requisitos tecnicos act"] = error;
        }
    };

    $scope.getRequisitosTecnicosCategoria = function(idCategoria, persona) {
        if (persona == 'JURIDICO') {
            persona = 'J';
        }
        try {
            var parametro = new aelstRequisitosTecCategoria();
            parametro.idCategoria = idCategoria;
            parametro.tipopersona = persona;
            parametro.aelst_RequisitosTecCategoria(function(res) {
                x = JSON.parse(res);
                datosRequisitosTmp = x.success.data;
                datoObjectFinal = [];
                for (j = 0; j < datosRequisitosTmp.length; j++) {
                    datoObject = new Object();
                    datoObject.resid = datosRequisitosTmp[j].idRequisito;
                    datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                    datoObject.estado = false;
                    datoObjectFinal[j] = datoObject;
                }
                $scope.datos.f01_requisitos_tecnicos = datoObjectFinal;
                $rootScope.datosTecnicos = datoObjectFinal;
            });
        } catch (error) {}
    };

    /*$scope.lst_actividad_desarrollada = function(id){
        try{
            var cat = new bsqActividadDesarrollada();
            cat.idCatAgrupada=id;
            cat.descrip='';
            cat.bsqActividad_Desarrollada(function(res){
                x = JSON.parse(res);
                response = x.success.data;
                if(response.length > 0){
                    //$scope.f01_categoria_descrip = response;
                    $scope.datosdesarrollo = response;
                    $scope.desabilitarActDesarrollada =   false;
                    $scope.sActividadDesarrollada   =   true;
                    $.unblockUI();
                }else{
                    $scope.sActividadDesarrollada   =   false;
                    $scope.msg = "Error !!";
                    $.unblockUI();
                }
            });
        }catch(e){
                alert("Error en licencias");
                $.unblockUI();
        }
    };*/

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

    $scope.cargarNombViaTxt = function(valor) {
        if (valor == "NINGUNO") {
            $scope.nombreViaTxt = true;
            $scope.tipoTrayecto = false;
            $scope.datos.f01_factor = "VA";
        } else {
            $scope.nombreViaTxt = false;
            $scope.tipoTrayecto = true;
            $scope.datos.f01_num_act_n = "";
        }
    };

    $scope.GetValueLicencia = function() {
        $scope.limpiarlic();
        var e = document.getElementById("f01_tipo_lic");
        $scope.datos.f01_tipo_lic_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueCategoriaAgrupada = function() {
        $scope.limpiarcateg();
        var e = document.getElementById("f01_categoria_agrupada");
        $scope.datos.f01_categoria_agrupada_dem = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria_agrupada_descrip = e.options[e.selectedIndex].text;
    }
    $scope.limpiaractdes = function() {
        $scope.datos.f01_categoria_descripcion = '';
        $scope.datos.f01_categoria_descrip2 = '';
        $scope.datos.f01_categoria_agrupada_descripcion = '';
    }
    $scope.GetValueCategoria = function() {
        $scope.limpiaractdes();
        var e = document.getElementById("f01_categoria_descrip");
        $scope.datos.f01_categoria_descripcion = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria_descrip2 = e.options[e.selectedIndex].text;
        $scope.datos.f01_categoria = $scope.datos.f01_categoria_descrip;
        $scope.datos.f01_categoria_agrupada_descripcion = e.options[e.selectedIndex].text;
    }

    $scope.GetValueMacrodistrito = function(macro) {
        var e = document.getElementById("f01_macro_act");
        $scope.datos.f01_macro_act_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueDistrito = function() {
        var e = document.getElementById("f01_dist_act");
        $scope.datos.f01_dist_act_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaActividad = function() {
        var e = document.getElementById("INT_AC_ID_ZONA");
        $scope.datos.INT_AC_ID_ZONA_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaContribuyente = function() {
        var e = document.getElementById("f01_zon_prop");
        $scope.datos.f01_zon_prop_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaContribuyenteJuridico = function() {
        var e = document.getElementById("f01_id_zona_rep");
        $scope.datos.f01_zona_rep = e.options[e.selectedIndex].text;
    }

    $scope.GetValueZonaSegura = function(idCategoria) {
        if (idCategoria == 3419 || idCategoria == 3420 || idCategoria == 3421 || idCategoria == 3422 || idCategoria == 3423 || idCategoria == 3424) {
            $scope.mostrarzonaseguraj = true;
        } else {
            $scope.mostrarzonaseguraj = false;
        }
    }

    $scope.GetValueActividadSecundaria = function() {
        $scope.actividadSecund = "";
        var datosaux = '';
        var datoslicm = {};
        if ($scope.datos.licenciam.length > 0) {
            datoslicm = $scope.datos.licenciam;
            for (var i = 0; i < datoslicm.length; i++) {
                if (i + 1 == datoslicm.length) {
                    datosaux = datosaux + datoslicm[i].f01_cat_agrupadamdescrip;
                } else {
                    datosaux = datosaux + datoslicm[i].f01_cat_agrupadamdescrip + " - ";
                }
            }
        }
        $scope.actividadSecund = datosaux;
        if ($scope.datos.f01_categoria_agrupada != 32 || $scope.datos.f01_categoria_agrupada != '32') {
            var e = document.getElementById("f01_categoria_agrupada");
            $scope.datos.f01_categoria_agrupada_descrip = e.options[e.selectedIndex].text;
            $scope.actividadSecund = $scope.datos.f01_categoria_agrupada_descrip;
        }
        $scope.datos.f01_actividadesSecundarias = $scope.actividadSecund;
    }

    $scope.GetValueActividadDesarrollada = function() {
        $scope.actividadDes = "";
        var datosaux = '';
        var datoslicm = {};
        if ($scope.datos.licenciam.length > 0) {
            datoslicm = $scope.datos.licenciam;
            for (var j = 0; j < datoslicm.length; j++) {
                if (j + 1 == datoslicm.length) {
                    datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip;
                } else {
                    datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip + " - ";
                }
            }
        }
        $scope.actividadDes = datosaux;
        if ($scope.datos.f01_categoria_descrip != 32 || $scope.datos.f01_categoria_descrip != '32') {
            var e = document.getElementById("f01_categoria_descrip");
            $scope.datos.f01_actividad_desarrollada_descrip = e.options[e.selectedIndex].text;
            $scope.actividadDes = $scope.datos.f01_actividad_desarrollada_descrip;
        }
        $scope.datos.f01_actividadesDesarrolladasc = $scope.actividadDes;
    }

    $scope.GetValueActividadesCatDesarrollada = function() {
        $scope.actividadDesCat = "";
        var datosaux = '';
        var datoscat = '';
        var datosact = '';
        var datoslicm = {};
        if ($scope.datos.licenciam.length > 0) {
            datoslicm = $scope.datos.licenciam;
            for (var j = 0; j < datoslicm.length; j++) {
                if (j + 1 == datoslicm.length) {
                    if (datoslicm[j].f01_tipo_licmid == '17' || datoslicm[j].f01_tipo_licmid == 17 || datoslicm[j].f01_tipo_licmid == '18' || datoslicm[j].f01_tipo_licmid == 18) {
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip;
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip;
                    } else {
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip;
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip;
                    }
                } else {
                    if (datoslicm[j].f01_tipo_licmid == '17' || datoslicm[j].f01_tipo_licmid == 17 || datoslicm[j].f01_tipo_licmid == '18' || datoslicm[j].f01_tipo_licmid == 18) {
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip + " - ";;
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip + " - ";
                    } else {
                        datosaux = datosaux + datoslicm[j].f01_act_desarrolladamdescrip + " - ";;
                        datosact = datosact + datoslicm[j].f01_cat_agrupadamdescrip + " - ";
                    }
                }
            }
            var swmul = 0;
            for (var k = 0; k < datoslicm.length && swmul == 0; k++) {
                if (datoslicm[k].f01_cat_agrupadamid == 3419 || datoslicm[k].f01_cat_agrupadamid == 3420 || datoslicm[k].f01_cat_agrupadamid == 3421 || datoslicm[k].f01_cat_agrupadamid == 3422 || datoslicm[k].f01_cat_agrupadamid == 3423 || datoslicm[k].f01_cat_agrupadamid == 3424) {
                    swmul = 1;
                } else {
                    swmul = 0;
                }
            }
            if (swmul == 1) {
                $scope.mostrarzonasegura = true;
            } else {
                $scope.mostrarzonasegura = false;
            }
        }
        $scope.actividadDesCat = datosaux;
        $scope.datos.f01_actividadesSecundarias = $scope.actividadDesCat;
        $scope.datos.f01_categorias_multi = datosact;
    }


    $scope.SeleccionaPrioridad = function(dato) {
        var arraydata = [];
        $scope.datos.f01_act_principal = '';
        if (dato.f01_cat_agrupadamid == 5 || dato.f01_cat_agrupadamid == 6 || dato.f01_cat_agrupadamid == 25) {
            $scope.datos.f01_act_principal = 50;
        }
        if (dato.f01_cat_agrupadamid == 11 || dato.f01_cat_agrupadamid == 12 || dato.f01_cat_agrupadamid == 13 || dato.f01_cat_agrupadamid == 15 || dato.f01_cat_agrupadamid == 60 || dato.f01_cat_agrupadamid == 61 || dato.f01_cat_agrupadamid == 62) {
            $scope.datos.f01_act_principal = 30;
        }
        if (dato.f01_cat_agrupadamid == 22) {
            $scope.datos.f01_act_principal = 50;
        }
        if (dato.f01_cat_agrupadamid == 3371 || dato.f01_cat_agrupadamid == 3372 || dato.f01_cat_agrupadamid == 3376 || dato.f01_cat_agrupadamid == 3377 || dato.f01_cat_agrupadamid == 3378 || dato.f01_cat_agrupadamid == 3379 ||
            dato.f01_cat_agrupadamid == 3347 || dato.f01_cat_agrupadamid == 3348 || dato.f01_cat_agrupadamid == 3349 || dato.f01_cat_agrupadamid == 3369 || dato.f01_cat_agrupadamid == 3370) {
            $scope.datos.f01_act_principal = 70;
        }
        if (dato.f01_cat_agrupadamid == 16 || dato.f01_cat_agrupadamid == 78 || dato.f01_cat_agrupadamid == 79 || dato.f01_cat_agrupadamid == 80 || dato.f01_cat_agrupadamid == 29 || dato.f01_cat_agrupadamid == 76 ||
            dato.f01_cat_agrupadamid == 71 || dato.f01_cat_agrupadamid == 72 || dato.f01_cat_agrupadamid == 73 || dato.f01_cat_agrupadamid == 74 || dato.f01_cat_agrupadamid == 75 || dato.f01_cat_agrupadamid == 77 ||
            dato.f01_cat_agrupadamid == 82 || dato.f01_cat_agrupadamid == 81 || dato.f01_cat_agrupadamid == 28 || dato.f01_cat_agrupadamid == 53 || dato.f01_cat_agrupadamid == 66 || dato.f01_cat_agrupadamid == 67 ||
            dato.f01_cat_agrupadamid == 68 || dato.f01_cat_agrupadamid == 69 || dato.f01_cat_agrupadamid == 70 || dato.f01_cat_agrupadamid == 20 || dato.f01_cat_agrupadamid == 84 || dato.f01_cat_agrupadamid == 86 ||
            dato.f01_cat_agrupadamid == 87 || dato.f01_cat_agrupadamid == 88 || dato.f01_cat_agrupadamid == 90 || dato.f01_cat_agrupadamid == 91 || dato.f01_cat_agrupadamid == 92 || dato.f01_cat_agrupadamid == 93) {
            $scope.datos.f01_act_principal = 79;
        }
        if (dato.f01_cat_agrupadamid == 59 || dato.f01_cat_agrupadamid == 83 || dato.f01_cat_agrupadamid == 85 || dato.f01_cat_agrupadamid == 89) {
            $scope.datos.f01_act_principal = 70;
        }
        $scope.MultipleSeleccionado = dato.id;
        arraydata.push(dato);
        $scope.datos.f01_actividad_principal_array = arraydata;
        //$scope.GetValueZonaSegura(dato.f01_cat_agrupadamid);
    }

    $scope.publi = [];
    //$scope.publi.FECHAINICIO=$scope.fechactuall;
    //$scope.publi.FECHAFIN=$scope.fechadatoo;
    $scope.lssubcategoria = function() {
        $scope.publi.INT_CATE = "II Fija";
        $scope.publi.idcate = 6;
        $scope.TipoLetrero = [
            { "p_idtipoletrero": "51", "p_descripcion": "ADOSADA SOBRESALIENTE" },
            { "p_idtipoletrero": "39", "p_descripcion": "ADOSADA" },
            { "p_idtipoletrero": "41", "p_descripcion": "MICROPERFORADA - AUTOADHESIVA" },
            { "p_idtipoletrero": "40", "p_descripcion": "PINTADA" }
        ];
    };

    $scope.ltCaracteristica = function(idlee) {
        $scope.lCaracteristica = {};
        var idcarac = "";
        //ID CARACTERISITICA
        if ($scope.TipoLetrero) {
            angular.forEach($scope.TipoLetrero, function(value, key) {
                if (value.p_descripcion == idlee) {
                    idcarac = value.p_idtipoletrero;
                }
            });
        }
        $scope.publi.idcarac = idcarac;
        if (idlee == "ADOSADA SOBRESALIENTE" || idlee == "ADOSADA") {
            $scope.lCaracteristica = [
                { "p_idcaracteristica": "1", "p_caracteristica": "Simple" },
                { "p_idcaracteristica": "2", "p_caracteristica": "Electrónica" },
                { "p_idcaracteristica": "6", "p_caracteristica": "Luminosa" },
                { "p_idcaracteristica": "7", "p_caracteristica": "Iluminada" },
                { "p_idcaracteristica": "9", "p_caracteristica": "Animada" }
            ];
        } else if (idlee == "PINTADA") {
            $scope.lCaracteristica = [
                { "p_idcaracteristica": "1", "p_caracteristica": "Simple" },
                { "p_idcaracteristica": "7", "p_caracteristica": "Iluminada" }
            ];
        } else {
            $scope.lCaracteristica = [
                { "p_idcaracteristica": "1", "p_caracteristica": "Simple" }
            ];
        }
    };

    $scope.actulizarCaracteristica = function() {
        var id_cara = "";
        var distNombre = $scope.publi.INT_CARA;
        if ($scope.lCaracteristica) {
            angular.forEach($scope.lCaracteristica, function(value, key) {
                if (value.p_caracteristica == distNombre) {
                    id_cara = value.p_idcaracteristica;
                }
            });
        }
        $scope.publi.id_cara = id_cara;
    };

    $scope.lsCaracteristica = function() {
        $scope.lsTipovia = {};
        try {
            var parametros = new lstCaracteristica();
            parametros.clasificador = 9;
            parametros.lst_Caracteristica(function(res) {
                x = JSON.parse(res);
                response = x.success.data;
                if (response.length > 0) {
                    $scope.lsTipovia = response;
                } else {
                    $scope.msg = "Error !!";
                }
            });
        } catch (error) {
            //$scope.errors["error_rol"] = error;
            console.log("eeror en caracteristica");
        }
    };

    $scope.lscategoria = function() {
        $scope.DataCategoria = {};
        try {
            var parametros = new PUBlstCategoriaL();
            parametros.PUB_lstCategoriaL(function(res) {
                x = JSON.parse(res);
                response = x.success.data;
                if (response.length > 0) {
                    $scope.DataCategoria = response;
                } else {
                    $scope.msg = "Error !!";
                }
            });
        } catch (error) {
            $scope.errors["error_rol"] = error;
        }
    };

    $scope.onlyy = false;
    $scope.botonn = "new";

    $scope.modificarPlubli = function(dato) {
        $scope.onlyy = true;
        $scope.botonn = "upd";
        $scope.publi = dato;
        $scope.publi.INT_ALTO = parseFloat(dato.INT_ALTO);
        $scope.publi.INT_ANCHO = parseFloat(dato.INT_ANCHO);
        //$scope.publi.INT_NRO_CARA = parseInt(dato.INT_NRO_CARA);
        $scope.publi.INT_TIPO_LETRE = dato.INT_TIPO_LETRE;
        $scope.publi.INT_CARA = dato.INT_CARA;
        $scope.publi.INT_DESC = dato.INT_DESC;
        $scope.ltCaracteristica(dato.INT_TIPO_LETRE);
    }

    $scope.eliminarPubli = function(dato) {
        $scope.publicid.splice($scope.publicid.indexOf(dato), 1);
        $scope.id = $scope.id - 1;
    }

    $scope.modificarpublicidad = function(dato) {
        if (dato.INT_NRO_CARA == '' || dato.INT_NRO_CARA == null || dato.INT_CARA == '' || dato.INT_CARA == null ||
            dato.INT_TIPO_LETRE == '' || dato.INT_TIPO_LETRE == null ||
            dato.INT_DESC == '' || dato.INT_DESC == null || dato.INT_ALTO == '' || dato.INT_ALTO == null || dato.INT_ANCHO == '' || dato.INT_ANCHO == null) {
            swal('', 'Llene lo campos requeridos para la VIAE  ', 'error');
        } else {
            /*swal({
            title: "Modificar",
            text: "Esta seguro de Modificar el Elemento de Identificación ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "SI",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true },
            function(isConfirm){
            if (isConfirm) {*/
            //sweet.close();
            $scope.publi = [];
            var datopublic = dato;
            for (var i = 0; i < $scope.datos.publicidad.length; i++) {
                if ($scope.datos.publicidad[i].idPublicidad == dato.idPublicidad) {
                    var superior = datopublic.INT_ALTO * datopublic.INT_ANCHO;
                    superior = (Math.round(superior * 10) / 10) + "";
                    var supe = superior.replace(",", ".");
                    //superior = superior.replace(",",".");
                    var palto = datopublic.INT_ALTO;
                    var pancho = datopublic.INT_ANCHO;
                    palto = parseFloat(palto).toFixed(2);
                    palto = palto.replace(",", ",");
                    pancho = parseFloat(pancho).toFixed(2);
                    pancho = pancho.replace(",", ".");
                    $scope.datos.publicidad[i].estado = "N";
                    $scope.datos.publicidad[i].INT_SUP = supe;
                    $scope.datos.publicidad[i].INT_ALTO = palto;
                    $scope.datos.publicidad[i].INT_ANCHO = pancho;
                    $scope.datos.publicidad[i].INT_TIPO_LETRE = dato.INT_TIPO_LETRE;
                    $scope.datos.publicidad[i].INT_CARA = dato.INT_CARA;
                    $scope.datos.publicidad[i].INT_DESC = dato.INT_DESC;
                    $scope.datos.publicidad[i].INT_NRO_CARA = dato.INT_NRO_CARA;
                };
            }
            $scope.Plubli_Grilla($scope.datos.publicidad);
            $scope.botonn = "new";
            /*} else {
                $scope.publi=[];
                //sweet.close();
            }
        });*/
        }
    }


    $scope.guardarpublicidad = function(public) {
        if (public.INT_SUPERFICIE) {
            if (public.INT_CARA == '' || public.INT_CARA == null || public.INT_CATE == '' || public.INT_CATE == null || public.INT_TIPO_LETRE == '' || public.INT_TIPO_LETRE == null || public.INT_DESC == '' || public.INT_DESC == null || public.INT_SUPERFICIE == '' || public.INT_SUPERFICIE == null) {
                sweet.show('', 'Llene lo campos requeridos para la VIAE  ', 'error');
            } else {
                var id = 0
                if ($scope.datos.publicidad == '' || $scope.datos.publicidad == null || $scope.datos.publicidad == "undefined") {
                    if ($scope.publicid == '' || $scope.publicid == null || $scope.publicid == "undefined") {
                        $scope.publicid = [];
                        id = 0;
                    }
                    id = $scope.publicid.length + 1;
                } else {
                    id = $scope.publicid.length + 1;
                }
                if (id < 21) {
                    total = parseFloat(public.INT_SUPERFICIE);
                    if (total <= 18) {
                        $scope.id = id;
                        $scope.publicid.push({
                            id: id,
                            //INT_NRO_CARA: public.INT_NRO_CARA,
                            INT_CARA: public.INT_CARA,
                            INT_CATE: public.INT_CATE,
                            INT_TIPO_LETRE: public.INT_TIPO_LETRE,
                            INT_DESC: public.INT_DESC.toUpperCase(),
                            INT_ALTO: parseFloat(0).toFixed(2),
                            INT_ANCHO: parseFloat(0).toFixed(2),
                            id_cara: public.id_cara,
                            idcarac: public.idcarac,
                            idcate: public.idcate,
                            INT_SUP: total.toFixed(2),
                            estado: 'N'
                        });
                        $scope.publi = [];
                        $scope.publi.INT_CATE = "II Fija";
                        $scope.publi.idcate = 6;
                        $scope.lssubcategoria();
                        $scope.datos.publicidad = $scope.publicid;
                        $scope.Plubli_Grilla($scope.publicid);
                    } else {
                        sweet.show('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
                    }
                } else {
                    sweet.show('', 'Llego al limite de registro de Publicidad', 'error');
                }
            }
        } else {
            if (public.INT_CARA == '' || public.INT_CARA == null ||
                public.INT_CATE == '' || public.INT_CATE == null || public.INT_TIPO_LETRE == '' || public.INT_TIPO_LETRE == null ||
                public.INT_DESC == '' || public.INT_DESC == null || public.INT_ALTO == '' || public.INT_ALTO == null || public.INT_ANCHO == '' || public.INT_ANCHO == null) {
                sweet.show('', 'Llene lo campos requeridos para la VIAE  ', 'error');
            } else {
                var id = 0
                if ($scope.datos.publicidad == '' || $scope.datos.publicidad == null || $scope.datos.publicidad == "undefined") {
                    if ($scope.publicid == '' || $scope.publicid == null || $scope.publicid == "undefined") {
                        $scope.publicid = [];
                        id = 0;
                    }
                    id = $scope.publicid.length + 1;
                } else {
                    id = $scope.publicid.length + 1;
                }
                if (id < 21) {
                    total = parseFloat(public.INT_ALTO) * parseFloat(public.INT_ANCHO);
                    if (total <= 18) {
                        $scope.id = id;
                        $scope.publicid.push({
                            id: id,
                            //INT_NRO_CARA: public.INT_NRO_CARA,
                            INT_CARA: public.INT_CARA,
                            INT_CATE: public.INT_CATE,
                            INT_TIPO_LETRE: public.INT_TIPO_LETRE,
                            INT_DESC: public.INT_DESC.toUpperCase(),
                            INT_ALTO: parseFloat(public.INT_ALTO).toFixed(2),
                            INT_ANCHO: parseFloat(public.INT_ANCHO).toFixed(2),
                            id_cara: public.id_cara,
                            idcarac: public.idcarac,
                            idcate: public.idcate,
                            INT_SUP: total.toFixed(2),
                            estado: 'N'
                        });
                        $scope.publi = [];
                        $scope.publi.INT_CATE = "II Fija";
                        $scope.publi.idcate = 6;
                        $scope.lssubcategoria();
                        $scope.datos.publicidad = $scope.publicid;
                        $scope.Plubli_Grilla($scope.publicid);
                    } else {
                        sweet.show('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
                    }
                } else {
                    sweet.show('', 'Llego al limite de registro de Publicidad', 'error');
                }
            }
        }
    }

    $scope.Plubli_Grilla = function(dato) {
        $scope.publi_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = { "tipo": "GRD", "campos": "nroElem|INT_TIPO_LETRE|INT_CARA|FECHAINICIO|INT_DESC|INT_ALTO|INT_ANCHO", "titulos": "ID|Tipo de Letrero|Caracteristica|Fecha Inicio|Descripción|Alto|Ancho", "impresiones": "true|true|true|true|true|true|true|" };
        var nroElem = 0;
        var j = 0;
        for (j = 0; j < dato.length; j++) {
            $scope.publi_grilla.push({
                nroElem: j + 1,
                FECHAINICIO: dato[j].FECHAINICIO,
                INT_TIPO_LETRE: dato[j].INT_TIPO_LETRE,
                INT_CARA: dato[j].INT_CARA,
                INT_CATE: dato[j].INT_CATE,
                INT_DESC: dato[j].INT_DESC,
                INT_ALTO: dato[j].INT_ALTO,
                INT_ANCHO: dato[j].INT_ANCHO,
                estado: dato[j].estado
            });
        }
        var jsonString = '[' + (encabezado) + ']';
        angular.forEach($scope.publi_grilla, function(value, key) {
            encabezado[indice] = value;
            indice = indice + 1;
        });
        $scope.datos.publicidad_grilla = encabezado;
        var pub_grilla = $scope.datos.publicidad_grilla;
        angular.forEach(pub_grilla, function(celda, fila) {
            if (celda['estado'] == 'V') {
                celda['estado'] = 'Vigente';
            };
            if (celda['estado'] == 'M') {
                celda['estado'] = 'Modificar';
            };
            if (celda['estado'] == 'B') {
                celda['estado'] = 'Baja';
            };
            if (celda['estado'] == 'N') {
                celda['estado'] = 'Nuevo';
            };
        });
        $scope.datos.publicidad_grilla = encabezado;
    }




    $scope.calcularCapacidad = function(superficie) {
        if (superficie) {
            superficie = superficie.replace(/[^,.0-9]+/g, "");
            superficie = superficie.replace(/,/g, ".")
            $scope.datos.f01_sup = superficie;
            $scope.datos.f01_cap_aprox = parseInt(superficie * 0.9);
        } else {
            $scope.datos.f01_cap_aprox = 0;
        }
    }
    $scope.calcularCapacidadAuto = function(superficie) {
        if (superficie) {
            $scope.datos.f01_sup = superficie;
            $scope.datos.f01_cap_aprox = parseInt(superficie * 0.9);
        } else {
            $scope.datos.f01_cap_aprox = 0;
        }
    }

    $scope.verificarSuperficie = function(superficie) {
        $scope.validarRequisitosForm();
    }

    //enviarFormProcesosLinea
    $scope.validarEnvio = function(data) {
        swal({
            title: 'CONFIRMAR',
            text: 'El envío de la presente solicitud de licencia de funcionamiento de actividad económica, (DD.JJ.) generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            cancelButtonText: 'NO',
            confirmButtonText: 'SI',
            closeOnConfirm: false
        }, function() {
            swal.close();
            setTimeout(function() {
                $scope.enviarFormProcesosLinea(data);
            }, 1000);
        });
    };

    $scope.adjpublicidad = function(paramf) {
        $scope.pubrd = "";
        var longpub = paramf.publicidadAE;
        if (paramf.publicidadAE) {
            if (paramf.publicidad.length > 0) {
                $scope.pubrd = paramf.publicidadAE.concat(paramf.publicidad);
            } else {
                $scope.pubrd = paramf.publicidadAE;
            }
            $scope.publigri = [];
            var datpub = $scope.pubrd;
            var j = 0;
            var c = 1;
            for (j = 0; j < datpub.length; j++) {
                $scope.publigri.push({
                    id: j + 1,
                    idPublicidad: datpub[j].idPublicidad,
                    INT_CARA: datpub[j].INT_CARA,
                    INT_CATE: datpub[j].INT_CATE,
                    INT_TIPO_LETRE: datpub[j].INT_TIPO_LETRE,
                    INT_DESC: datpub[j].INT_DESC,
                    INT_ALTO: datpub[j].INT_ALTO,
                    INT_ANCHO: datpub[j].INT_ANCHO,
                    id_cara: datpub[j].id_cara,
                    idcarac: datpub[j].idcarac,
                    idcate: datpub[j].idcate,
                    INT_SUP: datpub[j].INT_SUP,
                    estado: datpub[j].estado
                });
            }
            $scope.datos.pubenvio = $scope.publigri;
        } else {
            $scope.datos.pubenvio = paramf.publicidad;
        }
        $scope.datos.publicidad = $scope.datos.pubenvio;
    }

    /*CIUDADANO - ENVIAR FORMULARIO JURIDICO*/
    $scope.enviarFormProcesosLinea = function(paramForm) {
        $scope.ultimoArrayAdjunto();
        $scope.capturarImagen();
        $scope.adjpublicidad(paramForm);
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        //$rootScope.validacionRequisitosTec();
        $scope.btnEnviarForm = true;
        var idProcodigo = 'RE-LF';
        var datosNeXO = {};
        if (paramForm.OTRO_VIA != "") {
            $scope.nombre_via = paramForm.OTRO_VIA;
        } else {
            $scope.nombre_via = paramForm.f01_nom_via_prop;
        }
        $scope.divVIAE = "mostrar";
        /*RENOVACION DE LICENCIAS*/
        if (paramForm.rdTipoTramite == 'RENOVACION') {
            datosNeXO['f01_id_actividad_economica'] = paramForm.f01_id_actividad_economica;
            datosNeXO['f01_nro_orden'] = paramForm.f01_nro_orden;
            datosNeXO['f01_id_contribuyente'] = paramForm.f01_id_contribuyente;
            datosNeXO['f01_num_pmc'] = paramForm.f01_num_pmc;
            datosNeXO['f01_id_representante_legal'] = paramForm.f01_id_representante_legal;
        }
        if (paramForm.f01_tipo_lic == 32 || paramForm.f01_tipo_lic == '32') {
            datosNeXO['f01_actividadesSecundarias'] = paramForm.f01_actividadesSecundarias;
        } else {
            datosNeXO['f01_actividadesSecundarias'] = '';
        }

        if ($scope.tipoPersona == 'JURIDICO' || $scope.tipoPersona == 'J') {
            datosNeXO['f01_nro_frm'] = sessionService.get('IDTRAMITE');
            datosNeXO['f01_tipo_per'] = 'J';
            datosNeXO['f01_tipo_per_desc'] = 'JURIDICO';
            datosNeXO['INT_SOLICITANTE'] = paramForm.INT_SOLICITANTE;
            datosNeXO['AE_ORD_DEM'] = paramForm.AE_ORD_DEM;
            datosNeXO['f01_nit'] = paramForm.f01_num_doc_per_jur;
            datosNeXO['f01_num_doc_per_jur'] = paramForm.f01_num_doc_per_jur;
            datosNeXO['f01_raz_soc_per_jur'] = paramForm.f01_raz_soc_per_jur;
            datosNeXO['f01_raz_soc'] = paramForm.f01_raz_soc;
            datosNeXO['f01_tipo_lic_descrip'] = paramForm.f01_tipo_lic_descrip;
            datosNeXO['INT_ID_CAT_AGRUPADA'] = parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_requisitos_tecnicos'] = $scope.datos.f01_requisitos_tecnicos;
            datosNeXO['INT_TIPO_DOC_IDENTIDAD'] = paramForm.INT_TIPO_DOC_IDENTIDAD;
            datosNeXO['f01_num_doc_rep'] = paramForm.f01_num_doc_rep;
            datosNeXO['f01_tip_doc_rep'] = paramForm.f01_tip_doc_rep;
            datosNeXO['f01_expedido_rep'] = paramForm.f01_expedido_rep;
            datosNeXO['f01_email_rep'] = paramForm.f01_email_rep;
            datosNeXO['f01_cel_rep'] = paramForm.f01_cel_rep;
            datosNeXO['f01_telef_rep'] = paramForm.f01_telef_rep;
            datosNeXO['INT_FEC_SOLICITUD'] = paramForm.INT_FEC_SOLICITUD;
            datosNeXO['CI_BIGDATA'] = sessionService.get('IDCIUDADANO');
            datosNeXO['f01_id_zona_rep'] = paramForm.f01_id_zona_rep;
            datosNeXO['f01_zona_rep'] = paramForm.f01_zon_rep_valor;
            datosNeXO['f01_zon_rep_valor'] = paramForm.f01_zon_rep_valor;
            datosNeXO['f01_pri_nom_rep'] = paramForm.f01_pri_nom_rep;
            datosNeXO['f01_seg_nom_rep'] = paramForm.f01_seg_nom_rep;
            datosNeXO['f01_ter_nom_rep'] = paramForm.f01_ter_nom_rep;
            datosNeXO['f01_ape_pat_rep'] = paramForm.f01_ape_pat_rep;
            datosNeXO['f01_ape_mat_rep'] = paramForm.f01_ape_mat_rep;
            datosNeXO['f01_ape_cas_rep'] = paramForm.f01_ape_cas_rep;
            datosNeXO['f01_fecha_nac'] = paramForm.f01_fecha_nac;
            datosNeXO['INT_ACTIVIDAD'] = paramForm.INT_ACTIVIDAD;
            datosNeXO['f01_denominacion'] = paramForm.f01_denominacion;
            datosNeXO['f01_sup'] = paramForm.f01_sup;
            datosNeXO['f01_cap_aprox'] = paramForm.f01_cap_aprox;
            datosNeXO['f01_de_hor'] = paramForm.f01_de_hor;
            datosNeXO['f01_a_hor'] = paramForm.f01_a_hor;
            datosNeXO['INT_AC_ESTADO'] = paramForm.INT_AC_ESTADO;
            datosNeXO['INT_AC_MACRO'] = paramForm.INT_AC_MACRO;
            datosNeXO['f01_zon_rep_valor'] = paramForm.f01_zon_rep_valor;
            datosNeXO['f01_tipo_viarep'] = paramForm.f01_tipo_viarep;
            datosNeXO['f01_nom_via_rep'] = paramForm.f01_nom_via_rep;
            datosNeXO['OTRO_VIA'] = paramForm.OTRO_VIA;
            datosNeXO['f01_num_rep'] = paramForm.f01_num_rep;
            datosNeXO['INT_AC_EDIFICIO'] = paramForm.INT_AC_EDIFICIO;
            datosNeXO['f01_fecha_ini_act'] = fechactual;
            datosNeXO['f01_estab_es'] = paramForm.f01_estab_es;
            datosNeXO['f01_distrito_desc'] = paramForm.f01_distrito_desc;
            datosNeXO['f01_productosElaborados'] = '';
            datosNeXO['f01_tipo_lic'] = paramForm.f01_tipo_lic;
            datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion;
            datosNeXO['f01_categoria_descrip'] = paramForm.f01_categoria_descrip;
            datosNeXO['INT_ID_CAT_AGRUPADA'] = parseInt(paramForm.f01_categoria_agrupada);
            datosNeXO['f01_categoria_agrupada'] = paramForm.f01_categoria_agrupada;
            datosNeXO['f01_macro_act'] = paramForm.f01_macro_act;
            datosNeXO['f01_macro_act_descrip'] = paramForm.f01_macro_act_descrip;
            datosNeXO['f01_zona_act'] = paramForm.f01_zona_act; //paramForm.f01_zona_act_descrip;
            datosNeXO['f01_zona_act_descrip'] = paramForm.f01_zona_act_descrip;
            datosNeXO['f01_dist_act'] = paramForm.f01_dist_act; //"";
            datosNeXO['f01_dist_act_descrip'] = paramForm.f01_dist_act_descrip;
            datosNeXO['f01_tip_via_act'] = paramForm.f01_tip_via_act;
            datosNeXO['f01_num_act'] = paramForm.f01_num_act;
            datosNeXO['f01_num_act_n'] = paramForm.f01_num_act_n;
            datosNeXO['f01_factor'] = paramForm.f01_factor;
            datosNeXO['f01_num_act1'] = paramForm.f01_num_act1;
            datosNeXO['f01_edificio_act'] = paramForm.f01_edificio_act;
            datosNeXO['f01_bloque_act'] = paramForm.f01_bloque_act;
            datosNeXO['f01_piso_act'] = paramForm.f01_piso_act;
            datosNeXO['f01_dpto_of_loc'] = paramForm.f01_dpto_of_loc;
            datosNeXO['f01_tel_act1'] = paramForm.f01_tel_act1;
            datosNeXO['f01_casilla'] = paramForm.f01_casilla;
            datosNeXO['f01_cod_luz'] = paramForm.f01_cod_luz;
            datosNeXO['f01_bloque_act'] = paramForm.f01_bloque_act;
            datosNeXO['f08_hojas_recibidas'] = "0";
            datosNeXO['f08_observaciones_i'] = "0";
            datosNeXO['f01_hojas_recibidas'] = "0";
            datosNeXO['f01_observaciones_i'] = "0";
            datosNeXO['INT_RL_FEC_NACIMIENTO'] = paramForm.INT_RL_FEC_NACIMIENTO;
            datosNeXO['INT_ACTIVIDAD_DESCRIPCION'] = document.getElementById('INT_ACTIVIDAD_DESCRIPCION').value;
            datosNeXO['INT_AC_MACRO_ID'] = parseInt(paramForm.INT_AC_MACRO_ID);
            datosNeXO['INT_DISTRITO'] = paramForm.INT_DISTRITO;
            datosNeXO['f01_distrito_desc'] = paramForm.f01_distrito_desc;
            //DATOS FALTANTES DEL CONTRIBUYENTE - REPRESENTANTE LEGAL
            datosNeXO['f01_macro_des'] = paramForm.f01_macro_des;
            datosNeXO['INT_ZONA'] = paramForm.INT_ZONA;
            datosNeXO['INT_VIA'] = paramForm.INT_VIA;
            datosNeXO['INT_NOMBRE_VIA'] = paramForm.INT_NOMBRE_VIA;
            datosNeXO['INT_NUM'] = paramForm.INT_NUM;
            datosNeXO['INT_EDIF'] = paramForm.INT_EDIF;
            datosNeXO['INT_BLOQUE'] = paramForm.INT_BLOQUE;
            datosNeXO['INT_PISO'] = paramForm.INT_PISO;
            datosNeXO['INT_NUM_DEP'] = paramForm.INT_NUM_DEP;
            datosNeXO['INT_DIR_DET'] = paramForm.INT_DIR_DET;
            //DATOS INICIALES PERSONA JURIDICA
            datosNeXO['INT_RL_FEC_EMISION_DOCUMENTO'] = paramForm.INT_RL_FEC_EMISION_DOCUMENTO;
            datosNeXO['f01_num_pod_leg'] = paramForm.f01_ges_vig_pod;
            datosNeXO['INT_NACIONALIDAD'] = paramForm.INT_NACIONALIDAD;
            datosNeXO['INT_RL_FEC_NACIMIENTO'] = paramForm.INT_RL_FEC_NACIMIENTO;
            datosNeXO['f01_ges_vig_pod'] = paramForm.f01_ges_vig_pod;
            datosNeXO['f01_num_not'] = paramForm.f01_num_notaria;
            //PARA LA 70
            datosNeXO['INT_AC_DISTRITO'] = paramForm.INT_AC_DISTRITO;
            datosNeXO['INT_AC_ID_ZONA'] = paramForm.INT_AC_ID_ZONA;
            datosNeXO['INT_ID_ZONA'] = paramForm.INT_ID_ZONA;
            datosNeXO['INT_TIPO_LICENCIA_DESCRIPCION'] = paramForm.INT_TIPO_LICENCIA_DESCRIPCION;
            datosNeXO['INT_CAT_AGRUPADA_DESCRIPCION'] = paramForm.INT_CAT_AGRUPADA_DESCRIPCION;
            datosNeXO['INT_TIP_VIA'] = paramForm.INT_TIP_VIA;
            datosNeXO['INT_AC_latitud'] = paramForm.INT_AC_latitud;
            datosNeXO['INT_AC_longitud'] = paramForm.INT_AC_longitud;
            datosNeXO['INT_AC_direccionImagenmapa'] = paramForm.INT_AC_direccionImagenmapa;
            datosNeXO['INT_RL_NUM_DOCUMENTO'] = paramForm.INT_RL_NUM_DOCUMENTO;
            datosNeXO['INT_RL_FECHA_NAC'] = paramForm.INT_RL_FECHA_NAC;
            datosNeXO['INT_ZONA_DESC'] = paramForm.INT_ZONA_DESC;
            datosNeXO['f01_macro_des'] = paramForm.f01_macro_des;
            datosNeXO['f01_requisitos_actividad_economica'] = paramForm.f01_requisitos_actividad_economica;
            datosNeXO['rdTipoTramite'] = paramForm.rdTipoTramite;
            datosNeXO['f01_nro_actividad'] = paramForm.f01_nro_actividad;

            datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
            datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;
            datosNeXO['f01_poder_representante'] = paramForm.f01_poder_representante;
            datosNeXO['f01_test_cons_sociedad_j'] = paramForm.f01_test_cons_sociedad_j;
            datosNeXO['file_num_ident'] = paramForm.file_num_ident;
            datosNeXO['file_fund_emp'] = paramForm.file_fund_emp;
            datosNeXO['file_reg_comer'] = paramForm.file_reg_comer;
            //PAGO ADELANTADO
            if (paramForm.pago_adelantado == true) {
                datosNeXO['pago_adelantado'] = 'SI'; //$scope.pago_adelantado;
                datosNeXO['nro_ges'] = paramForm.nro_ges;
            } else {
                datosNeXO['pago_adelantado'] = 'NO';
                datosNeXO['nro_ges'] = '';
            };
            /*REQUISITOSDELAACTIVIDADECONOMICA*/
            datosNeXO['f01_tip_act'] = paramForm.f01_tip_act;
            datosNeXO['f01_actividad_desarrollada'] = "";
            /*CAMPOS GENERICOS NATURAL Y JURIDICO*/ //-->EL CAMPO NO SE ESTA GENERANDO CORRECTAMENTE
            /*REQUISITOSDELAACTIVIDADECONOMICA*/
            var datoObjectdj = [];
            var decjuradaN = new Object();
            if ($rootScope.decJuradaJuridico) {
                decjuradaN.url = $rootScope.decJuradaJuridico;
            } else {
                decjuradaN.url = $scope.datos.declaracion_jurada;
            };
            decjuradaN.campo = 'Declaración Jurada Juridico';
            decjuradaN.nombre = 'DECLARACIÓN JURADA';
            datoObjectdj[0] = decjuradaN;
            datosNeXO['File_Adjunto'] = $rootScope.FileAdjuntos.concat(decjuradaN);
            datosNeXO['Licenmul_grilla'] = paramForm.Licenmul_grilla;
            datosNeXO['f01_tip_act'] = paramForm.f01_tip_act;
            datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;
            if (paramForm.f01_tipo_lic == 32 || paramForm.f01_tipo_lic == '32') {
                datosNeXO['f01_idcat_multi_principal'] = paramForm.xf01_idcat_multi_principal;
                datosNeXO['f01_descat_multi_principal'] = paramForm.xf01_descat_multi_principal;
                datosNeXO['f01_act_principal'] = paramForm.f01_act_principal;
                datosNeXO['f01_act_principal2'] = paramForm.f01_act_principal2;
                datosNeXO['f01_actividad_principal_array'] = paramForm.f01_actividad_principal_array;
            } else {
                datosNeXO['f01_idcat_multi_principal'] = '';
                datosNeXO['f01_descat_multi_principal'] = '';
                datosNeXO['f01_act_principal'] = '';
                datosNeXO['f01_act_principal2'] = '';
            }
        }

        datosNeXO['f01_categoria_descrip'] = paramForm.f01_categoria_descripcion;
        datosNeXO['f01_categoria_descrip2'] = paramForm.f01_categoria_descripcion;
        datosNeXO['f01_categoria'] = paramForm.f01_categoria_descrip;
        datosNeXO['f01_categoria_agrupada_descripcion'] = paramForm.f01_categoria_agrupada_descripcion;
        datosNeXO['f01_categoria_agrupada_descrip'] = paramForm.f01_categoria_agrupada_descrip;
        datosNeXO['f01_categoria_agrupada_dem'] = paramForm.f01_categoria_agrupada_dem;
        datosNeXO['f01_actividad_desarrollada'] = paramForm.f01_categoria_descrip2;
        if (datosNeXO['f01_requisitos_tecnicos'] == null) {
            datosNeXO['f01_requisitos_tecnicos'] = [];
        }
        if (paramForm.rdTipoTramite1 == "NUEVO" || paramForm.rdTipoTramite1 == 'NUEVO') {
            datosNeXO['sw_publicidad'] = "CP";
            datosNeXO['swpublicidad'] = "CP";
        }
        if (paramForm.rdTipoTramite1 == "RENOVACION" || paramForm.rdTipoTramite1 == 'RENOVACION') {
            datosNeXO['sw_publicidad'] = "SP";
            datosNeXO['swpublicidad'] = "SP";
        }
        datosNeXO['publicidad'] = paramForm.publicidad;
        datosNeXO['publicidad_grilla'] = paramForm.publicidad_grilla;
        datosNeXO['g_tipo'] = "AE-LINEA";
        datosNeXO['g_fecha'] = fechactual;
        datosNeXO['g_origen'] = "IGOB247";
        //DATOS DE LA ACTIVIDAD ECONOMICA - NO ESTAN REGISTRADAS DE MANERA LOCAL
        if ($scope.dataGenesisCidadano && $scope.formDatosAE) {
            if ($scope.dataGenesisCidadano.length > 0) {
                datosNeXO['INT_PMC'] = $scope.dataGenesisCidadano[0].padron;
                datosNeXO['INT_ID_CONTRIBUYENTE'] = $scope.dataGenesisCidadano[0].idContribuyente;
                datosNeXO['INT_AE_IDCODIGO_ZONA'] = "21";
                datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = paramForm.INT_TRAMITE_RENOVA;
            }
        }
        var sMacroR = datosNeXO['f01_macro_des'];
        //var sDistritoR      =   datosNeXO['INT_DISTRITO'];
        var sZonaR = datosNeXO['INT_ZONA'];
        var sMacroRDesc = datosNeXO['f01_macro_des'];
        //var sDistritoRDesc  =   datosNeXO['f01_distrito_desc'];
        var sZonaRDesc = datosNeXO['INT_ZONA_DESC'];
        /*VERIFICAR DATOS - CATEGORIA AGRUPADA - ID MACRODISTRITO*/
        var iCategoriaAgrupada = datosNeXO['INT_AC_MACRO_ID'];
        var iMacrodistrito = datosNeXO['INT_ID_CAT_AGRUPADA'];
        if (iCategoriaAgrupada && iCategoriaAgrupada != "" && iMacrodistrito && iMacrodistrito != "") {
            //if(sMacroR != "" && sZonaR  != "" && sMacroRDesc  != "" && sZonaRDesc  != ""){
            var sIdTramite = $rootScope.tramiteId;
            var datosSerializados = JSON.stringify(datosNeXO);
            archivo1 = "";
            //CREAR CASO AE LINEA
            //REQUISITOS PARA CREAR LA ACTIVIDAD ECONOMICA INT_AC_MACRO_ID, INT_ID_CAT_AGRUPADA
            var crearCaso = new gCrearCaso();
            crearCaso.usr_id = 1,
                crearCaso.datos = datosSerializados,
                crearCaso.procodigo = idProcodigo,
                crearCaso.crearCasoAeLinea(function(response) {
                    try {
                        $scope.botones = null;
                        $scope.desabilitado = true;
                        response = JSON.parse(response);
                        var results = response.success.data;
                        indice = 0;
                        datosIF = results[0].sp_pmfunction_crearcaso_linea.split(",");
                        datosIF2 = datosIF[1];
                        datosIF[0] = datosIF[0].substring(1, datosIF[0].length);
                        $scope.nrotramitec = datosIF[0];
                        sessionService.set('NROTRAMITE', datosIF[0]);
                        sessionService.set('NROTRAMITEID', datosIF[1]);
                        sessionService.set('IDPROCESO', datosIF[6]);
                        var idTramite1 = sessionService.get('NROTRAMITEID');
                        datosNeXO['INT_AC_direccionImagenmapa'] = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + sessionService.get('IDTRAMITE') + "/" + sessionService.get('IDTRAMITE') + $scope.archivo2 + "?app_name=todoangular";
                        //VERIFICAR Y CORREGIR ERROR AL REALIZAR ALGUNO DE ESTOS PROCESOS
                        try {
                            ///$scope.capturarImagen();
                            $scope.validarFormProcesos(paramForm);
                            $scope.guardarAdjuntosMultiplesMapa(results);
                        } catch (e) {}
                        $.unblockUI();
                    } catch (e) {
                        console.log("falla: ", e);
                        alert("conexion fallida ");
                    }
                });
            /*}else{
                swal('', "Complete sus Datos de Direccion", 'warning');
            }*/

        } else {
            swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
        }
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
                $scope.tramitesCiudadano();
                $scope.bloquearBtnEnviarForm();
                swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n Nos contactaremos con usted a la brevedad posible para programar la inspección y/o verificación documental. Caso contrario puede apersonarse a la Plataforma Integra de su Macrodistrito para recabar mayor información.");
            });
        } catch (error) {
            swal('', 'Registro no modificado', 'error');
            $.unblockUI();
        }
    };

    /*SUBIR REQUISITOS 2018*/
    ////////////////REQUISITOS 2018/////////
    $scope.aDocObligarios = new Array();
    $scope.cambiarFile = function(obj, valor) {
        $scope.datos[obj.name] = valor;
        setTimeout(function() {
            $rootScope.leyenda1 = obj.name;
        }, 500);
        /*REQUISITOS2018*/
        $scope.subirRequisitos(obj, valor);
    };

    /*REQUISITOS2018*/
    $scope.subirRequisitos = function(sobj, svalor) {
        var rMisDocs = new Array();
        var idFiles = new Array();
        if (sobj.files[0]) {
            rMisDocs.push(sobj.files[0]);
            var idFile = sobj.name;
            var tam = idFile.length;
            idFile = parseInt(idFile.substring(10, tam));
            idFiles.push(idFile);
            $scope.almacenarRequisitos(rMisDocs, idFiles);
            $scope.adicionarArrayDeRequisitos(sobj, idFile);
        }
    };

    /*REQUISITOS2018*/
    $scope.fileArRequisitos = {};
    $scope.adicionarArrayDeRequisitos = function(aArch, idFile) {
        var descDoc = "";
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function(resp) {
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1];
        });
        angular.forEach($scope.docArray, function(doc, pos) {
            if (doc.resid == idFile) {
                descDoc = doc.desNom;
            }
        })
        var imagenNueva = aArch.files[0].name.split('.');
        var nombreFileN = descDoc + '_' + fechaNueva + '.' + imagenNueva[1];
        $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
        var sDirTramite = sessionService.get('IDTRAMITE');
        if (aArch.files[0].size > 500000 && aArch.files[0].size <= 15000000) {
            if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif") {
                var filecompress = compressImage(aArch.files[0]).then(function(respuestaFile) {
                    var imagenFile = respuestaFile.name.split('.');
                    var tipoFile = imagenFile[1];
                    nombreFileN = descDoc + '_' + fechaNueva + '.' + tipoFile;
                });
            }
        }
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
        var adatafile = {};
        var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "nombre":"' + $("#lbl_" + aArch.id).text() + '" }';
        $scope.fileArRequisitos[aArch.name] = JSON.parse(myJSON);
        $scope.clonarRequisitosDocumentales($scope.fileArRequisitos);
        //$scope.fileArRequisitos.push(JSON.parse(myJSON));
    }

    /*REQUISITOS2018*/
    $scope.clonarRequisitosDocumentales = function(aRequArchivos) {
        var i = 0;
        $scope.File_Adjunto = {};
        datoObjectFiles = [];
        var longdato = 0;
        angular.forEach(aRequArchivos, function(archivo, key) {
            datoObjectFiles[i] = archivo;
            i = i + 1;
        });
        $scope.datos.fileArchivosAd = datoObjectFiles;
    }

    $scope.ultimoArrayAdjunto = function() {
            //$scope.getRequisitosCategoriaTecnicos($scope.datos.f01_tipo_lic,$scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
            $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada, $scope.datos.f01_tipo_per);
            datoObjectFile1 = new Object();
            datoObjectFile2 = new Object();
            datoObjectFile3 = new Object();
            datoObjectFile4 = new Object();
            datoObjectFile5 = new Object();
            datoObjectFile6 = new Object();
            datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
            datoObjectFile1.campo = 'Cedula de identidad (Anverso)';
            datoObjectFile1.nombre = 'Cedula de identidad (Reverso)';
            datoObjectFiles_ci[0] = datoObjectFile1;
            datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
            datoObjectFile2.campo = 'Cedula de identidad (Anverso)';
            datoObjectFile2.nombre = 'Cedula de identidad (Reverso)';
            datoObjectFiles_ci[1] = datoObjectFile2;
            datoObjectFile3.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + $scope.datos.f01_poder_representante + "?app_name=todoangular";
            datoObjectFile3.campo = 'Poder de Representación Legal';
            datoObjectFile3.nombre = 'Poder de Representación Legal';
            datoObjectFiles_ci[2] = datoObjectFile3;
            datoObjectFile4.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + $scope.datos.f01_test_cons_sociedad_j + "?app_name=todoangular";
            datoObjectFile4.campo = 'Testimonio de Constitución de Sociedad';
            datoObjectFile4.nombre = 'Testimonio de Constitución de Sociedad';
            datoObjectFiles_ci[3] = datoObjectFile4;
            datoObjectFile5.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + $scope.datos.file_num_ident + "?app_name=todoangular";
            datoObjectFile5.campo = 'NIT o inscripción al Régimen Simplificado';
            datoObjectFile5.nombre = 'NIT o inscripción al Régimen Simplificado';
            datoObjectFiles_ci[4] = datoObjectFile5;
            datoObjectFile6.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + $scope.datos.file_fund_emp + "?app_name=todoangular";
            datoObjectFile6.campo = 'FUNDEMPRESA o Matricula de Comercio';
            datoObjectFile6.nombre = 'FUNDEMPRESA o Matricula de Comercio';
            datoObjectFiles_ci[5] = datoObjectFile6;
            $scope.datos.FILE_CI = datoObjectFiles_ci;
            //$scope.getRequisitosCategoriaTecnicos($scope.datos.f01_tipo_lic,$scope.datos.f01_categoria_agrupada,$scope.datos.f01_tipo_per);
            $scope.getRequisitosCategoria($scope.datos.f01_categoria_agrupada, $scope.datos.f01_tipo_per);
            $scope.capturarImagen();
            datoObjectFiles = [];
            var datoObjectFile4 = new Object();
            $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
            $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
            var nombre_mapa = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
            datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + nombre_mapa + "?app_name=todoangular";
            datoObjectFile4.campo = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
            datoObjectFile4.nombre = 'CROQUIS DE UBICACIÓN DE LA ACTIVIDAD ECONÓMICA';
            datoObjectFiles[0] = datoObjectFile4;
            $scope.datos.FILE_MAPA = datoObjectFiles;
            $rootScope.FileAdjuntos = $scope.datos.FILE_CI.concat($scope.datos.FILE_MAPA, $scope.datos.fileArchivosAd);
        }
        /*REQUISITOS2018*/
    $scope.almacenarRequisitos = function(aArchivos, idFiles) {
        var descDoc = "";
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function(resp) {
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1];
        });
        $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        $.blockUI();
        angular.forEach(aArchivos, function(archivo, key) {
            if (typeof(archivo) != 'undefined') {
                angular.forEach($scope.docArray, function(doc, pos) {
                    if (doc.resid == idFiles[key]) {
                        descDoc = doc.desNom;
                    }
                })
                var imagenNueva = archivo.name.split('.');
                var nombreFileN = descDoc + '_' + fechaNueva + '.' + imagenNueva[1];
                if (archivo.size > 500000 && archivo.size <= 15000000) {
                    if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif") {
                        var filecompress = compressImage(archivo).then(function(respuestaFile) {
                            var imagenFile = respuestaFile.name.split('.');
                            var tipoFile = imagenFile[1];
                            var nombreNuevo = descDoc + '_' + fechaNueva + '.' + tipoFile;
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
                            document.getElementById('txt_f01_upload' + idFiles[key]).value = nombreNuevo;
                        });
                        $.unblockUI();
                    } else {
                        if (imagenNueva[1] == 'pdf' || imagenNueva[1] == 'docx' || imagenNueva[1] == 'docxlm') {
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                            document.getElementById('txt_f01_upload' + idFiles[key]).value = nombreFileN;
                            $.unblockUI();
                        } else {
                            $.unblockUI();
                            swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                        };
                    };
                } else {
                    if (archivo.size <= 500000) {
                        if (imagenNueva[1] == 'png' || imagenNueva[1] == 'jpg' || imagenNueva[1] == 'jpeg' || imagenNueva[1] == 'bmp' || imagenNueva[1] == 'gif' || imagenNueva[1] == 'pdf' || imagenNueva[1] == 'docx' || imagenNueva[1] == 'docxlm') {
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                            document.getElementById('txt_f01_upload' + idFiles[key]).value = nombreFileN;
                            $.unblockUI();
                        } else {
                            $.unblockUI();
                            swal('Advertencia', 'El archivo  no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                        };
                    };
                    if (archivo.size > 15000000) {
                        $.unblockUI();
                        swal('Advertencia', 'El tamaño del archivo es muy grande', 'error');
                    };
                }
            } else {}
        });
    };
    /*REQUISITOS2018*/
    $scope.validarRequisitosForm = function() {
        //INICIAR DOCUMENTOS DE IDENTIDAD
        angular.forEach($scope.docArray, function(value, key) {
            //VALIDANDO EL DOCUMENTO DE IDENTIDAD - IGOB
            if (value.idnro == 1) {
                document.getElementById('txt_f01_upload' + value.resid).value = 'Cedula de identidad (Anverso).jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var scianverso = $scope.datos.FILE_FOTOCOPIA_CI;
                if (scianverso == '' || scianverso == 'undefined' || scianverso == undefined) {
                    document.getElementById('txt_f01_upload' + value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                } else {
                    document.getElementById('txt_f01_upload' + value.resid).value = scianverso;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + scianverso + "?app_name=todoangular";
                $("#href_f01_upload" + value.resid).attr({ 'href': uploadUrl });
            }
            if (value.idnro == 2) {
                document.getElementById('txt_f01_upload' + value.resid).value = 'Cedula de identidad (Reverso).jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var scianversor = $scope.datos.FILE_FOTOCOPIA_CI_R;
                if (scianversor == '' || scianversor == 'undefined' || scianversor == undefined) {
                    document.getElementById('txt_f01_upload' + value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                } else {
                    document.getElementById('txt_f01_upload' + value.resid).value = scianversor;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + scianversor + "?app_name=todoangular";
                $("#href_f01_upload" + value.resid).attr({ 'href': uploadUrl });
            }
            if (value.idnro == 6) {
                document.getElementById('txt_f01_upload' + value.resid).value = 'FUNDEMPRESA o Matricula de Comercio.jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var sfundempresa = $scope.datos.file_fund_emp;
                if (sfundempresa == '' || sfundempresa == 'undefined' || sfundempresa == undefined) {
                    document.getElementById('txt_f01_upload' + value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                } else {
                    document.getElementById('txt_f01_upload' + value.resid).value = sfundempresa;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + sfundempresa + "?app_name=todoangular";
                $("#href_f01_upload" + value.resid).attr({ 'href': uploadUrl });
            }
            if (value.idnro == 7) {
                document.getElementById('txt_f01_upload' + value.resid).value = 'Poder de Representación Legal.jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var spoderrep = $scope.datos.f01_poder_representante;
                if (spoderrep == '' || spoderrep == 'undefined' || spoderrep == undefined) {
                    document.getElementById('txt_f01_upload' + value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                } else {
                    document.getElementById('txt_f01_upload' + value.resid).value = spoderrep;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + spoderrep + "?app_name=todoangular";
                $("#href_f01_upload" + value.resid).attr({ 'href': uploadUrl });
            }
            if (value.idnro == 8) {
                document.getElementById('txt_f01_upload' + value.resid).value = 'Testimonio de Constitución de Sociedad.jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var stestimonio = $scope.datos.f01_test_cons_sociedad_j;
                if (stestimonio == '' || stestimonio == 'undefined' || stestimonio == undefined) {
                    document.getElementById('txt_f01_upload' + value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                } else {
                    document.getElementById('txt_f01_upload' + value.resid).value = stestimonio;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + stestimonio + "?app_name=todoangular";
                $("#href_f01_upload" + value.resid).attr({ 'href': uploadUrl });
                var doctes = $("#href_f01_upload" + value.resid).attr({ 'href': uploadUrl });
            }
            if (value.idnro == 9) {
                document.getElementById('txt_f01_upload' + value.resid).value = 'NIT o inscripción al Régimen Simplificado.jpg';
                var sDirTramite = sessionService.get('IDTRAMITE');
                var snitidem = $scope.datos.file_num_ident;
                if (snitidem == '' || snitidem == 'undefined' || snitidem == undefined) {
                    document.getElementById('txt_f01_upload' + value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
                } else {
                    document.getElementById('txt_f01_upload' + value.resid).value = snitidem;
                }
                var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDCIUDADANO') + "/" + snitidem + "?app_name=todoangular";
                $("#href_f01_upload" + value.resid).attr({ 'href': uploadUrl });
            }
            //VALIDANDO LA VIAE - EN CASO DE SER REQUERIDO
            if (value.idnro == 3 || value.idnro == 4) {
                var sviae = $scope.datos.rdTipoTramite1;
                if (sviae == 'RENOVACION') { //sin viae
                    $scope.docArray[key].estado = false;
                } else {
                    $scope.docArray[key].estado = true;
                }
            }
            //VALIDANDO LA SUPERFICIE DE LA ACTIVIDAD ECONOMNICA
            var ssuperficie = $scope.datos.f01_sup;
            if (ssuperficie) {
                if (value.idnro == 5) {
                    if (ssuperficie <= 100) {
                        $scope.docArray[key].estado = false;
                    } else {
                        $scope.docArray[key].estado = true;
                    }
                }
            }
            //VALIDANDO LA REGLA SI LA ACTIVIDAD ECONOMICA ES PROPIA O ALQUILADA
            var sestablecimiento = $scope.datos.f01_estab_es;
            if (sestablecimiento) {
                if (value.idnro == 10) {
                    switch (sestablecimiento) {
                        case 'PROPIO':
                            $scope.docArray[key].estado = false;
                            break;
                        case 'ALQUILADO':
                            $scope.docArray[key].estado = true;
                            break;
                        case 'ANTICRÉTICO':
                            $scope.docArray[key].estado = true;
                            break;
                        case 'OTRO':
                            $scope.docArray[key].estado = true;
                            break;
                    }
                }
                if (value.idnro == 11) {
                    switch (sestablecimiento) {
                        case 'PROPIO':
                            $scope.docArray[key].estado = true;
                            break;
                        case 'ALQUILADO':
                            $scope.docArray[key].estado = false;
                            break;
                        case 'ANTICRÉTICO':
                            $scope.docArray[key].estado = false;
                            break;
                        case 'OTRO':
                            $scope.docArray[key].estado = false;
                            break;
                    }
                }
            }
            //zonasegura sinmostrar adjuntos
            var szonasegura = $scope.datos.chkzonasegura;
            if (szonasegura) {
                if (value.idnro == 13) {
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                            break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                            break;
                    }
                }
                if (value.idnro == 14) {
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                            break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                            break;
                    }
                }
                if (value.idnro == 15) {
                    switch (szonasegura) {
                        case 'ZONASEGURA':
                            $scope.docArray[key].estado = true;
                            break;
                        case 'NOZONASEGURA':
                            $scope.docArray[key].estado = false;
                            break;
                    }
                }
            }
            //zonasegura sinmostrar adjuntos
            /*if ($scope.datos.f01_categoria_descrip == 301 || $scope.datos.f01_categoria_descrip == '301') {
                if(value.idnro == 19 || value.idnro == 20){
                    $scope.docArray[key].estado = false;
                }
            }
            if ($scope.datos.f01_categoria_descrip == 300 || $scope.datos.f01_categoria_descrip == '300') {
                if(value.idnro == 19 || value.idnro == 20){
                    $scope.docArray[key].estado = true;
                }
            }*/
        });
    }

    $scope.iniciarRequsitosDoc = function(data) {
        var validarpromesas = [$scope.iniciarRequisitosForm(data)];
        $q.all(validarpromesas).then(function(resp) { //AE - Validar Envio Licencia

        });
    }

    /*REQUISITOS2018*/
    $scope.iniciarRequisitosForm = function(data) {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        $scope.fileArRequisitos = {};
        if (data.sArrayFileArRequisitos) {
            $scope.fileArRequisitos = data.sArrayFileArRequisitos;
            setTimeout(function() {
                angular.forEach(data.sArrayFileArRequisitos, function(value, key) {
                    $("#txt_" + key).val(value.campo);
                    deferred.resolve(data);
                });
                $scope.validarRequisitosForm();
            }, 3500);
        }
        return deferred.promise;
    }

    /*REQUISITOS2018*/
    $scope.iniciarGetRequisitosForm = function(sidcategoria, stipoper) {
        if (sidcategoria == 32 || sidcategoria == '32') { //verificamos si la licencia es multiple
            $scope.lstRequisitosMultiples2018($scope.datos.licenciam);
        } else {
            $scope.getRequisitosFormulario(sidcategoria, stipoper);
        }
    }

    /*REQUISITOS2018*/
    $scope.getRequisitosFormulario = function(sidcategoria, stipoper) {
        if (stipoper == 'JURIDICO') {
            stipoper = 'J';
        }
        if ($scope.datos) {
            var idCategoria = sidcategoria;
            var persona = 'J';
            if (typeof idCategoria != undefined && typeof persona != undefined && idCategoria != null && persona != null) {
                var ndCategoria = new aeRequisitosDoc2018();
                ndCategoria.sidcategoria = sidcategoria;
                ndCategoria.stipopersona = 'J';
                ndCategoria.stipo = 'EMISION';
                ndCategoria.aelstRequisitos2018(function(res) {
                    var result = JSON.parse(res);
                    var datosRequisitosTmp = result.success.data;
                    datoObjectFinal = [];
                    for (j = 0; j < datosRequisitosTmp.length; j++) {
                        datoObject = new Object();
                        datoObject.resid = datosRequisitosTmp[j].idRequisito;
                        datoObject.idnro = datosRequisitosTmp[j].idnrorequisito;
                        datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                        datoObject.nomcampo = "f01_upload" + j;
                        datoObject.estado = true;
                        datoObject.desNom = datosRequisitosTmp[j].descNombre;
                        datoObjectFinal[j] = datoObject;
                    }
                    $scope.docArray = datoObjectFinal;
                    setTimeout(function() {
                        iniciarLoadFyle();
                        $scope.validarRequisitosForm();
                    }, 1000);
                });
            }
        }
    };

    /*REQUISITOS2018 - array*/
    $scope.lstRequisitosMultiples2018 = function(licenciamul) {
        var sconsulta = '[';
        for (i = 0; i < licenciamul.length; i++) {
            sconsulta = sconsulta + '{"id":' + licenciamul[i].f01_cat_agrupadamid + "},";
        }
        sconsulta = sconsulta.substring(0, sconsulta.length - 1);
        sconsulta = sconsulta + ']';
        aidCategoria = sconsulta;
        if ($scope.datos) {
            var aidCategoria = aidCategoria;
            var persona = 'J';
            if (typeof aidCategoria != undefined && typeof persona != undefined && aidCategoria != null && persona != null) {
                var ndCategoria = new aeRequisitosDoc2018array();
                ndCategoria.asidcategoria = aidCategoria;
                ndCategoria.astipopersona = 'J';
                ndCategoria.aelstRequisitos2018_array(function(res) {
                    var result = JSON.parse(res);
                    var datosRequisitosTmp = result.success.data;
                    datoObjectFinal = [];
                    for (j = 0; j < datosRequisitosTmp.length; j++) {
                        datoObject = new Object();
                        datoObject.resid = datosRequisitosTmp[j].idRequisito;
                        datoObject.idnro = datosRequisitosTmp[j].idnrorequisito;
                        datoObject.resvalor = datosRequisitosTmp[j].descRequisito;
                        datoObject.nomcampo = "f01_upload" + j;
                        datoObject.estado = true;
                        datoObjectFinal[j] = datoObject;
                    }
                    $scope.docArray = datoObjectFinal;
                    setTimeout(function() {
                        iniciarLoadFyle();
                        $scope.validarRequisitosForm();
                    }, 1000);
                });
            }
        }
    };

    /*REQUISITOS2018*/
    $scope.ejecutarFile = function(idfile) {
        var sid = document.getElementById(idfile);
        if (sid) {
            document.getElementById(idfile).click();
        } else {
            alert("Error ");
        }
    };
    /*TERMINA REQUISITOS 2018*/

    $scope.guardarAdjuntosMultiplesMapa = function(datosCaso) {
        var sdataArchivo = datosCaso[0].sp_pmfunction_crearcaso_linea;
        var aDatosCaso = sdataArchivo.split(',');
        $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
        var sDirTramite = sessionService.get('NROTRAMITEID');
        $scope.docusuario = "Ciudadano";
        $scope.archivosMultiples = JSON.stringify($scope.datos.ARCHIVOS_MULTIPLES_MAPA);
        $scope.docsistema = 'AE_EN_LINEA';
        $scope.sIdProcesoActual = sessionService.get('IDPROCESO'); //aDatosCaso[6];//datosCaso.idProceso;// 1;
        $scope.sCasoNro = sessionService.get('NROTRAMITEID'); //x;//aDatosCaso[1];//datosCaso.sNrocaso//49;
        $scope.sCasoNombre = '15 - ADJUNTOS';
        var aImagenJson = JSON.parse($scope.archivosMultiples);
        var imgCroquis = new gDocumentos();
        imgCroquis.doc_sistema = $scope.docsistema;
        imgCroquis.doc_proceso = $scope.sIdProcesoActual;
        imgCroquis.doc_id = $scope.sCasoNro;
        imgCroquis.doc_ci_nodo = $scope.sCasoNombre;
        imgCroquis.doc_url_logica = aImagenJson[0].url_archivo;
        imgCroquis.doc_nombre = aImagenJson[0].nombre_archivo;
        imgCroquis.doc_titulo = aImagenJson[0].titulo;
        imgCroquis.doc_palabras = aImagenJson[0].descripcion;
        imgCroquis.doc_datos = aImagenJson[0].docdatos;
        imgCroquis.doc_nrotramite_nexo = $scope.nrotramitec;
        imgCroquis.doc_usuario = $scope.docusuario;
        imgCroquis.doc_url = aImagenJson[0].url_archivo;
        imgCroquis.doc_version = 0;
        imgCroquis.doc_tiempo = 0;
        imgCroquis.doc_firma_digital = "";
        imgCroquis.doc_registro = "";
        imgCroquis.doc_modificacion = "";
        imgCroquis.doc_estado = 'A';
        imgCroquis.doc_tipo_documento = "";
        imgCroquis.doc_tamanio_documento = "";
        imgCroquis.doc_tps_doc_id = 0;
        imgCroquis.doc_acceso = "";
        imgCroquis.doc_cuerpo = "";
        imgCroquis.doc_tipo_documentacion = "";
        imgCroquis.doc_tipo_ingreso = "";
        imgCroquis.doc_estado_de_envio = "";
        imgCroquis.doc_correlativo = "";
        imgCroquis.doc_tipo_documento_ext = "";
        imgCroquis.doc_id_carpeta = 0;
        imgCroquis.insertarDoc(function(resultado) {
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {

            } else {
                $.unblockUI();
                swal(resultadoApi.error.message);
            }
        });

    };
    // ***********************  MAPA     **************************************************************************************************************************************************

    var latitud = 0;
    var longitud = 0;
    var activarClick = false;
    var versionUrl = "";
    var markerToClose = null;
    var dynamicMarkers;
    var vNroInsidenciaG = 0;
    var recargaMapita;
    var map;
    var markers = [];

    // Adds a marker to the map and push to the array.
    $scope.addMarker = function(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }

    // Sets the map on all markers in the array.
    $scope.setMapOnAll = function(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    $scope.clearMarkers = function() {
        $scope.setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    $scope.showMarkers = function() {
        $scope.setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    $scope.deleteMarkers = function() {
        $scope.clearMarkers();
        markers = [];
    }

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
        $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
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
        /* DreamFactory.api[CONFIG.SERVICE_ARCHIVO].createFile(resFormulario).success(function (response){
         }).error(function(results){
         });*/
    };

    $scope.capturarImagen = function() {
            $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
            var latitud = $scope.datos.INT_AC_latitud;
            var longitud = $scope.datos.INT_AC_longitud;
            $scope.oidCiudadano = sessionService.get('IDCIUDADANO');
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
            $scope.convertToDataURLviaCanvas('https://maps.googleapis.com/maps/api/staticmap?center=' + latitud + ',' + longitud + '&zoom=18&size=900x500&maptype=roadmap&markers=color:red|label:S|' + latitud + ',' + longitud + '&key=AIzaSyD_c3VUlclgLDhXQ_UHkGZ8uQiSeNHQHgw', function(base64Img) {
                var Imagen = base64Img.replace(/data:image\/png;base64,/i, '');
                $scope.Imagenb = Imagen;
                $scope.subirImgBase64($scope.Imagenb, $scope.url, $scope.archivo1);
            });
        }
        ///termina MAPA

    /*VERIFICANDO CAMPOS OBLIGATORIOS*/
    /*VERIFICANDO CAMPOS OBLIGATORIOS*/
    $scope.verificarCamposInternet = function(data) {
        /*REQUISITOS2018*/
        data.sArrayFileArRequisitos = $scope.fileArRequisitos;
        var taemayor = 0;
        if (data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32') {
            for (var i = 0; i < data.licenciam.length; i++) {
                if (parseInt(data.licenciam[i].f01_tae) >= taemayor) {
                    taemayor = parseInt(data.licenciam[i]);
                    $scope.datos.idLic = data.licenciam[i].f01_tipo_licmid;
                    $scope.datos.descriplic = data.licenciam[i].f01_tipo_licmdescrip;
                    $scope.datos.idcat = data.licenciam[i].f01_cat_agrupadamid;
                    $scope.datos.descripcat = data.licenciam[i].f01_cat_agrupadamdescrip;
                    $scope.datos.iddesa = data.licenciam[i].f01_act_desarrolladamid;
                    $scope.datos.descripdesa = data.licenciam[i].f01_act_desarrolladamdescrip;
                }
            };
            sarrayobligatorio = true;
        }
        if (data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32') {
            if (data && data.sArrayFileArRequisitos != "" && data.rdTipoTramite1 != null &&
                data.FILE_CI != "" && data.FILE_CI != null &&
                data.rdTipoTramite != "" && data.rdTipoTramite != null &&
                data.fileArchivosAd != "" && data.fileArchivosAd != null &&
                data.rdTipoTramite1 != "" && data.rdTipoTramite1 != null &&
                data.INT_AC_latitud != "" && data.INT_AC_latitud != null &&
                data.INT_AC_longitud != "" && data.INT_AC_longitud != null &&
                data.f01_raz_soc != "" && data.f01_raz_soc != null &&
                data.f01_sup != "" && data.f01_sup != null &&
                data.f01_de_hor != "" && data.f01_de_hor != null &&
                data.f01_a_hor != "" && data.f01_a_hor != null &&
                data.f01_estab_es != "" && data.f01_estab_es != null &&
                data.f01_tipo_lic != "" && data.f01_tipo_lic != null &&
                data.licenciam != "" && data.licenciam != null &&
                data.f01_macro_act_descrip != "" && data.f01_macro_act_descrip != null &&
                data.f01_zona_act_descrip != "" && data.f01_zona_act_descrip != null &&
                data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
                data.f01_num_act != "" && data.f01_num_act != null &&
                data.f01_num_act1 != "" && data.f01_num_act1 != null &&
                data.f01_casilla != "" && data.f01_casilla != null) {
                $scope.serializarInformacion(data);
                $scope.formulario401(data);
                $("#declaracionJ").modal("show");
            } else {
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }

        if (data.f01_tipo_lic != 32 || data.f01_tipo_lic != '32') {
            if (data && data.sArrayFileArRequisitos != "" && data.rdTipoTramite1 != null &&
                data.FILE_CI != "" && data.FILE_CI != null &&
                data.rdTipoTramite != "" && data.rdTipoTramite != null &&
                data.rdTipoTramite1 != "" && data.rdTipoTramite1 != null &&
                data.INT_AC_latitud != "" && data.INT_AC_latitud != null &&
                data.INT_AC_longitud != "" && data.INT_AC_longitud != null &&
                data.f01_raz_soc != "" && data.f01_raz_soc != null &&
                data.f01_sup != "" && data.f01_sup != null &&
                data.f01_de_hor != "" && data.f01_de_hor != null &&
                data.f01_a_hor != "" && data.f01_a_hor != null &&
                data.f01_estab_es != "" && data.f01_estab_es != null &&
                data.f01_tipo_lic != "" && data.f01_tipo_lic != null &&
                data.f01_categoria_agrupada != "" && data.f01_categoria_agrupada != null &&
                data.f01_categoria_descrip != "" && data.f01_categoria_descrip != null &&
                data.f01_macro_act_descrip != "" && data.f01_macro_act_descrip != null &&
                data.f01_zona_act_descrip != "" && data.f01_zona_act_descrip != null &&
                data.f01_tip_via_act != "" && data.f01_tip_via_act != null &&
                data.f01_num_act != "" && data.f01_num_act != null &&
                data.f01_num_act1 != "" && data.f01_num_act1 != null &&
                data.f01_casilla != "" && data.f01_casilla != null) {
                //$rootScope.validacionRequisitosTec();
                $scope.serializarInformacion(data);
                $scope.formulario401(data);
                $("#declaracionJ").modal("show");
            } else {
                swal('', "Datos obligatorios, verifique los datos del formulario", 'warning');
            }
        }
    }

    $scope.formulario401 = function(datos) {
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
        if ($scope.tipoPersona == 'JURIDICO' || $scope.tipoPersona == 'J') {
            datos.f01_tipo_per_desc = 'JURIDICO';
            //urlFormularioN  =   "../../docs/AE_Formulario_401_J.html";
            urlFormularioN = "../../docs/AE_Formulario_402Renov_J.html";
            $("#msgformularioJ").load(urlFormularioN, function(data) {
                stringFormulario40 = data;
                datos.f01_tipo_per_desc = ((typeof(datos.f01_tipo_per_desc) == 'undefined' || datos.f01_tipo_per_desc == null) ? "" : datos.f01_tipo_per_desc);
                datos.f01_seg_nom_prop = ((typeof(datos.f01_seg_nom_prop) == 'undefined' || datos.f01_seg_nom_prop == null) ? "" : datos.f01_seg_nom_prop);
                datos.f01_ape_pat_rep = ((typeof(datos.f01_ape_pat_rep) == 'undefined' || datos.f01_ape_pat_rep == null) ? "" : datos.f01_ape_pat_rep);
                datos.f01_ape_mat_rep = ((typeof(datos.f01_ape_mat_rep) == 'undefined' || datos.f01_ape_mat_rep == null) ? "" : datos.f01_ape_mat_rep);
                datos.f01_ape_cas_rep = ((typeof(datos.f01_ape_cas_rep) == 'undefined' || datos.f01_ape_cas_rep == null) ? "" : datos.f01_ape_cas_rep);
                datos.f01_tip_doc_prop = ((typeof(datos.f01_tip_doc_prop) == 'undefined' || datos.f01_tip_doc_prop == null) ? "" : datos.f01_tip_doc_prop);
                datos.f01_expedido_prop = ((typeof(datos.f01_expedido_prop) == 'undefined' || datos.f01_expedido_prop == null) ? "" : datos.f01_expedido_prop);
                datos.f01_nit_prop = ((typeof(datos.f01_nit_prop) == 'undefined' || datos.f01_nit_prop == null) ? "" : datos.f01_nit_prop);
                datos.f01_zon_prop_valor = ((typeof(datos.f01_zon_prop_valor) == 'undefined' || datos.f01_zon_prop_valor == null) ? "" : datos.f01_zon_prop_valor);
                datos.f01_tip_via_prop = ((typeof(datos.f01_tip_via_prop) == 'undefined' || datos.f01_tip_via_prop == null) ? "" : datos.f01_tip_via_prop);
                datos.f01_num_prop = ((typeof(datos.f01_num_prop) == 'undefined' || datos.f01_num_prop == null) ? "" : datos.f01_num_prop);
                datos.f01_nom_edi_prop = ((typeof(datos.f01_nom_edi_prop) == 'undefined' || datos.f01_nom_edi_prop == null) ? "" : datos.f01_nom_edi_prop);
                datos.f01_bloq_prop = ((typeof(datos.f01_bloq_prop) == 'undefined' || datos.f01_bloq_prop == null) ? "" : datos.f01_bloq_prop);
                datos.f01_piso_prop = ((typeof(datos.f01_piso_prop) == 'undefined' || datos.f01_piso_prop == null) ? "" : datos.f01_piso_prop);
                datos.f01_depa_prop = ((typeof(datos.f01_depa_prop) == 'undefined' || datos.f01_depa_prop == null) ? "" : datos.f01_depa_prop);
                datos.f01_telef_prop = ((typeof(datos.f01_telef_prop) == 'undefined' || datos.f01_telef_prop == null) ? "" : datos.f01_telef_prop);
                datos.f01_cel_prop = ((typeof(datos.f01_cel_prop) == 'undefined' || datos.f01_cel_prop == null) ? "" : datos.f01_cel_prop);
                datos.f01_tipo_lic_descrip = ((typeof(datos.f01_tipo_lic_descrip) == 'undefined' || datos.f01_tipo_lic_descrip == null) ? "" : datos.f01_tipo_lic_descrip);
                datos.f01_categoria_agrupada_descrip = ((typeof(datos.f01_categoria_agrupada_descrip) == 'undefined' || datos.f01_categoria_agrupada_descrip == null) ? "" : datos.f01_categoria_agrupada_descrip);
                datos.f01_categoria_agrupada_descripcion = ((typeof(datos.f01_categoria_agrupada_descripcion) == 'undefined' || datos.f01_categoria_agrupada_descripcion == null) ? "" : datos.f01_categoria_agrupada_descripcion);
                /*if(datos.f01_tipo_lic != '32' || datos.f01_tipo_lic != 32){
                    $scope.GetValueLicencia();
                    $scope.GetValueCategoriaAgrupada();
                    $scope.GetValueCategoria();
                }*/
                if (datos.f01_tip_act == 'MA' || datos.f01_tip_act == 'MATRI') {
                    datos.f01_tip_act1 = 'MATRIZ';
                }
                if (datos.f01_tip_act == 'SU' || datos.f01_tip_act == 'SUCUR') {
                    datos.f01_tip_act1 = 'SUCURSAL';
                }
                var pubMod = '';
                pubMod = '<tr><td>VIAE</td>' +
                    '<td>TIPO</td>' +
                    '<td>CARACTERÍSTICA</td>' +
                    //'<td>CARAS</td>'+
                    '<td>DESCRIPCIÓN</td>' +
                    '<td>ALTO</td>' +
                    '<td>ANCHO</td>' +
                    '<td>SUPERFICIE</td>' +
                    '<td>ESTADO</td></tr>';
                for (i = 0; i < datos.publicidad.length; i++) {
                    pubMod = pubMod + '<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>' + datos.publicidad[i].INT_TIPO_LETRE + '</td>' +
                        '<td>' + datos.publicidad[i].INT_CARA + '</td>' +
                        //'<td>' + datos.publicidad[i].INT_NRO_CARA + '</td>'+
                        '<td>' + datos.publicidad[i].INT_DESC + '</td>' +
                        '<td>' + datos.publicidad[i].INT_ANCHO + '</td>' +
                        '<td>' + datos.publicidad[i].INT_ALTO + '</td>' +
                        '<td>' + datos.publicidad[i].INT_SUP + '</td>' +
                        '<td>' + datos.publicidad[i].estado + '</td></tr>';
                }
                //CABECERA
                stringFormulario40 = stringFormulario40.replace("#f01_num_pmc#", datos.f01_num_pmc);
                stringFormulario40 = stringFormulario40.replace("#f01_nro_orden#", datos.f01_nro_orden);
                stringFormulario40 = stringFormulario40.replace("#f01_tipo_form#", '402');
                stringFormulario40 = stringFormulario40.replace("#f01_tipo_per_desc#", datos.f01_tipo_per_desc);
                //DATOS DEL REPRESENTANTE LEGAL
                stringFormulario40 = stringFormulario40.replace("#f01_pri_nom_rep#", datos.f01_pri_nom_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_seg_nom_rep#", datos.f01_seg_nom_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_ter_nom_rep#", datos.f01_ter_nom_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_ape_pat_rep#", datos.f01_ape_pat_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_ape_mat_rep#", datos.f01_ape_mat_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_ape_cas_rep#", datos.f01_ape_cas_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_tip_doc_rep#", datos.f01_tip_doc_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_num_doc_rep#", datos.f01_num_doc_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_expedido_rep#", datos.f01_expedido_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_tipo_viarep#", datos.f01_tipo_viarep);
                stringFormulario40 = stringFormulario40.replace("#f01_zon_rep_valor#", datos.f01_zon_rep_valor);
                stringFormulario40 = stringFormulario40.replace("#f01_nom_via_rep#", datos.f01_nom_via_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_num_rep#", datos.f01_num_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_telef_rep#", datos.f01_telef_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_cel_rep#", datos.f01_cel_rep);
                stringFormulario40 = stringFormulario40.replace("#f01_num_pod_leg#", datos.f01_num_pod_leg);
                stringFormulario40 = stringFormulario40.replace("#f01_ges_vig_pod#", datos.f01_ges_vig_pod);
                stringFormulario40 = stringFormulario40.replace("#f01_num_notaria#", datos.f01_num_notaria);
                stringFormulario40 = stringFormulario40.replace("#f01_num_doc_per_jur#", datos.f01_num_doc_per_jur);
                stringFormulario40 = stringFormulario40.replace("#f01_raz_soc_per_jur#", datos.f01_raz_soc_per_jur);
                stringFormulario40 = stringFormulario40.replace("#f01_email_prop#", datos.f01_email_prop);
                //DATOS DE LA ACTIVIDAD ECONOMICA
                stringFormulario40 = stringFormulario40.replace("#f01_raz_soc#", datos.f01_raz_soc.toUpperCase());
                stringFormulario40 = stringFormulario40.replace("#f01_de_hor#", datos.f01_de_hor);
                stringFormulario40 = stringFormulario40.replace("#f01_a_hor#", datos.f01_a_hor);
                stringFormulario40 = stringFormulario40.replace("#f01_sup#", datos.f01_sup);
                stringFormulario40 = stringFormulario40.replace("#f01_estab_es#", datos.f01_estab_es);
                stringFormulario40 = stringFormulario40.replace("#f01_tip_act1#", datos.f01_tip_act1);
                stringFormulario40 = stringFormulario40.replace("#publicidad_grilla#", pubMod);
                var multi = '';
                if (datos.f01_tipo_lic == 32 || datos.f01_tipo_lic == '32') {
                    stringFormulario40 = stringFormulario40.replace("#f01_tipo_lic_descrip#", datos.f01_tipo_lic_descrip);
                    stringFormulario40 = stringFormulario40.replace("#f01_categoria_agrupada_descrip#", datos.f01_categoria_agrupada_descrip);
                    stringFormulario40 = stringFormulario40.replace("#f01_categoria_agrupada_descripcion#", datos.f01_categoria_agrupada_descrip);
                    multi = '<table id="tablaMul" class="table table-striped table-bordered"><tr>' +
                        '<tr><td>NRO</td>' +
                        '<td>TIPO DE LICENCIA</td>' +
                        '<td>TIPO DE CATEGORÍA</td>' +
                        '<td>TIPO DE ACTIVIDAD</td></tr>';
                    for (i = 1; i < datos.Licenmul_grilla.length; i++) {
                        multi = multi + '<tr>' +
                            '<td>' + datos.Licenmul_grilla[i].nroElem + '</td>' +
                            '<td>' + datos.Licenmul_grilla[i].f01_tipo_licmdescrip + '</td>' +
                            '<td>' + datos.Licenmul_grilla[i].f01_cat_agrupadamdescrip + '</td>' +
                            '<td>' + datos.Licenmul_grilla[i].f01_act_desarrolladamdescrip + '</td></tr>';
                    }
                    multi = multi + '</table>';
                    stringFormulario40 = stringFormulario40.replace("#Licenmul_grilla#", multi);
                } else {
                    stringFormulario40 = stringFormulario40.replace("#f01_tipo_lic_descrip#", datos.f01_tipo_lic_descrip);
                    stringFormulario40 = stringFormulario40.replace("#f01_categoria_agrupada_descrip#", datos.f01_categoria_agrupada_descrip);
                    stringFormulario40 = stringFormulario40.replace("#f01_categoria_agrupada_descripcion#", datos.f01_categoria_agrupada_descripcion);
                    stringFormulario40 = stringFormulario40.replace("#Licenmul_grilla#", multi);
                };
                var tablapago = '';
                if (datos.pago_adelantado == true) {
                    stringFormulario40 = stringFormulario40.replace("#pago_adel#", 'SI'); //datos.pago_adelantado);
                    stringFormulario40 = stringFormulario40.replace("#nro_ges#", datos.nro_ges);
                    stringFormulario40 = stringFormulario40.replace("#tablaP#", '');
                    stringFormulario40 = stringFormulario40.replace("#pagoadelantado#", "Me comprometo a mantener las condiciones técnicas y ubicación de la Actividad Económica por el periodo autorizado, caso contrario  me someteré a lo dispuesto en la Ley Municipal Autonómica 343/2018, sin reclamo alguno.");
                } else {
                    stringFormulario40 = stringFormulario40.replace("#pago_adel#", 'SIN PAGO ADELANTADO');
                    stringFormulario40 = stringFormulario40.replace("#nro_ges#", 'NINGUNA');
                    stringFormulario40 = stringFormulario40.replace("#tablaP#", '');
                    stringFormulario40 = stringFormulario40.replace("#pagoadelantado#", "");
                }
                stringFormulario40 = stringFormulario40.replace("#f01_idCodigoZona#", datos.f01_idCodigoZona);
                var divfoodTruck = '';
                if (datos.f01_categoria == 211 || datos.f01_categoria == '211') {
                    divfoodTruck = divfoodTruck + '<div class="row"><div class="col-md-12" style="margin: 10px">' +
                        '<h3>DATOS DEL VEHÍCULO O REMOLQUE</h3></div></div>' +
                        '<div class="row" style="border-style: solid; border-width: 1px; border-radius: 10px 10px 10px 10px; margin: 10px; padding-top: 8px">' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Tipo de Vehículo: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_vehiculo_ft + '</div>' +
                        '</div>';
                    if (datos.f01_vehiculo_ft == "REMOLQUE") {
                        divfoodTruck = divfoodTruck + '<div class="col-md-6">' +
                            '<div class="col-md-6"><label>Otorgado: </label></div>' +
                            '<div class="col-md-6">' + datos.f01_otorgado_ft + '</div>' +
                            '</div>';
                    }
                    divfoodTruck = divfoodTruck + '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Clase: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_clase_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Marca: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_marca_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Tipo: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_tipo_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Subtipo: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_subtipo_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Modelo: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_modelo_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Motor: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_motor_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Nº Chasis: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_chasis_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Servicio: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_servicio_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Color: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_color_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Radicatoria: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_radicatoria_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Documento Legal: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_doclegal_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Nº Documento Legal: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_numdoclegal_ft + '</div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="col-md-6"><label>Ubicación del lugar donde se Efectuara la Inspección del Vehículo o Remolque: </label></div>' +
                        '<div class="col-md-6">' + datos.f01_lugar_ft + '</div>' +
                        '</div></div>';
                    stringFormulario40 = stringFormulario40.replace("#divft#", divfoodTruck);
                } else {
                    stringFormulario40 = stringFormulario40.replace("#divft#", divfoodTruck);
                };
                //UBICACION DE LA ACTIVIDAD ECONOMICA
                stringFormulario40 = stringFormulario40.replace("#f01_macro_act_descrip#", datos.f01_macro_act_descrip);
                stringFormulario40 = stringFormulario40.replace("#f01_dist_act#", datos.f01_dist_act);
                stringFormulario40 = stringFormulario40.replace("#f01_tip_via_act#", datos.f01_tip_via_act);
                stringFormulario40 = stringFormulario40.replace("#f01_categoria_descrip#", datos.f01_categoria_descrip);
                stringFormulario40 = stringFormulario40.replace("#f01_zona_act_descrip#", datos.f01_zona_act_descrip);
                stringFormulario40 = stringFormulario40.replace("#f01_tip_via_act#", datos.f01_tip_via_act);
                stringFormulario40 = stringFormulario40.replace("#f01_num_act1#", datos.f01_num_act1);
                stringFormulario40 = stringFormulario40.replace("#f01_edificio_act#", datos.f01_edificio_act);
                stringFormulario40 = stringFormulario40.replace("#f01_bloque_act#", datos.f01_bloque_act);
                stringFormulario40 = stringFormulario40.replace("#f01_piso_act#", datos.f01_piso_act);
                stringFormulario40 = stringFormulario40.replace("#f01_dpto_of_loc#", datos.f01_dpto_of_loc);
                stringFormulario40 = stringFormulario40.replace("#f01_tel_act1#", datos.f01_tel_act1);
                if (datos.f01_num_act == 'NINGUNO') {
                    stringFormulario40 = stringFormulario40.replace("#f01_num_act#", datos.f01_num_act_n);
                } else {
                    stringFormulario40 = stringFormulario40.replace("#f01_num_act#", datos.f01_num_act);
                };
                stringFormulario40 = stringFormulario40.replace("#fecha_sist#", fechaActualS);
                stringFormulario40 = stringFormulario40.replace("#hora_sist#", sHora);
                stringFormulario40 = stringFormulario40.replace("#fecha_sist2#", fechaActualS);
                var nombreUsuario = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
                stringFormulario40 = stringFormulario40.replace("#usuarioPlataforma#", nombreUsuario);
                if (datos.chkzonasegura == '' || datos.chkzonasegura == 'undefined' || datos.chkzonasegura == undefined) {
                    stringFormulario40 = stringFormulario40.replace("#zonaSegura#", '');
                } else {
                    if (datos.chkzonasegura == 'ZONASEGURA') {
                        stringFormulario40 = stringFormulario40.replace("#zonaSegura#", '<label>Zona Segura:</label> SI');
                    } else {
                        stringFormulario40 = stringFormulario40.replace("#zonaSegura#", '<label>Zona Segura:</label> NO');
                    };
                };

                $scope.datosAnt.RepresentanteLegal_segundoNombre = ((typeof($scope.datosAnt.RepresentanteLegal_segundoNombre) == 'undefined' || $scope.datosAnt.RepresentanteLegal_segundoNombre == null) ? "" : $scope.datosAnt.RepresentanteLegal_segundoNombre);
                $scope.datosAnt.RepresentanteLegal_tercerNombre = ((typeof($scope.datosAnt.RepresentanteLegal_tercerNombre) == 'undefined' || $scope.datosAnt.RepresentanteLegal_tercerNombre == null) ? "" : $scope.datosAnt.RepresentanteLegal_tercerNombre);
                $scope.datosAnt.RepresentanteLegal_primerApellido = ((typeof($scope.datosAnt.RepresentanteLegal_primerApellido) == 'undefined' || $scope.datosAnt.RepresentanteLegal_primerApellido == null) ? "" : $scope.datosAnt.RepresentanteLegal_primerApellido);
                $scope.datosAnt.RepresentanteLegal_segundoApellido = ((typeof($scope.datosAnt.RepresentanteLegal_segundoApellido) == 'undefined' || $scope.datosAnt.RepresentanteLegal_segundoApellido == null) ? "" : $scope.datosAnt.RepresentanteLegal_segundoApellido);
                $scope.datosAnt.RepresentanteLegal_tercerApellido = ((typeof($scope.datosAnt.RepresentanteLegal_tercerApellido) == 'undefined' || $scope.datosAnt.RepresentanteLegal_tercerApellido == null) ? "" : $scope.datosAnt.RepresentanteLegal_tercerApellido);
                $scope.datosAnt.RepresentanteLegal_correoElectronico = ((typeof($scope.datosAnt.RepresentanteLegal_correoElectronico) == 'undefined' || $scope.datosAnt.RepresentanteLegal_correoElectronico == null) ? "" : $scope.datosAnt.RepresentanteLegal_correoElectronico);
                $scope.datosAnt.RepresentanteLegal_celular = ((typeof($scope.datosAnt.RepresentanteLegal_celular) == 'undefined' || $scope.datosAnt.RepresentanteLegal_celular == null) ? "" : $scope.datosAnt.RepresentanteLegal_celular);
                $scope.datosAnt.empresa_telefono = ((typeof($scope.datosAnt.empresa_telefono) == 'undefined' || $scope.datosAnt.empresa_telefono == null) ? "" : $scope.datosAnt.empresa_telefono);
                if ($scope.datosAnt.establecimiento == 'ALQUI') {
                    $scope.datosAnt.establecimiento = "ALQUILADO";
                }
                if ($scope.datosAnt.establecimiento == 'PROPI') {
                    $scope.datosAnt.establecimiento = "PROPIO";
                }
                if ($scope.datosAnt.establecimiento == 'ANTI') {
                    $scope.datosAnt.establecimiento = "ANTICRÉTICO";
                }
                if ($scope.datosAnt.establecimiento == 'OTRO') {
                    $scope.datosAnt.establecimiento = "OTRO";
                }
                if ($scope.datosAnt.establecimiento == 'NINGU') {
                    $scope.datosAnt.establecimiento = "OTRO";
                }
                if ($scope.datosAnt.tipoActividad == 'MA' || $scope.datosAnt.tipoActividad == 'MATRI') {
                    $scope.datosAnt.tipoActividad = 'MATRIZ';
                }
                if ($scope.datosAnt.tipoActividad == 'SU' || $scope.datosAnt.tipoActividad == 'SUCUR') {
                    $scope.datosAnt.tipoActividad = 'SUCURSAL';
                }
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_primerNombre#", $scope.datosAnt.RepresentanteLegal_primerNombre);
                //stringFormulario40  =   stringFormulario40.replace("#RepresentanteLegal_segundoNombre#", $scope.datosAnt.RepresentanteLegal_segundoNombre);
                //stringFormulario40  =   stringFormulario40.replace("#RepresentanteLegal_tercerNombre#", $scope.datosAnt.RepresentanteLegal_tercerNombre);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_primerApellido#", $scope.datosAnt.RepresentanteLegal_primerApellido);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_segundoApellido#", $scope.datosAnt.RepresentanteLegal_segundoApellido);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_tercerApellido#", $scope.datosAnt.RepresentanteLegal_tercerApellido);
                stringFormulario40 = stringFormulario40.replace("#Representante_Legal_tipoIdentidad#", $scope.datosAnt.Representante_Legal_tipoIdentidad);
                stringFormulario40 = stringFormulario40.replace("#Representante_Legal_identificacion#", $scope.datosAnt.Representante_Legal_identificacion);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_expedicion#", $scope.datosAnt.RepresentanteLegal_expedicion);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_correoElectronico#", $scope.datosAnt.RepresentanteLegal_correoElectronico);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_celular#", $scope.datosAnt.RepresentanteLegal_celular);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_zona#", $scope.datosAnt.RepresentanteLegal_zona);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_TipoVia#", $scope.datosAnt.RepresentanteLegal_TipoVia);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_via#", $scope.datosAnt.RepresentanteLegal_via);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_numeroVia#", $scope.datosAnt.RepresentanteLegal_numeroVia);
                stringFormulario40 = stringFormulario40.replace("#empresa_telefono#", $scope.datosAnt.empresa_telefono);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_numeroPoder#", $scope.datosAnt.RepresentanteLegal_numeroPoder);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_gestionPoder#", $scope.datosAnt.RepresentanteLegal_gestionPoder);
                stringFormulario40 = stringFormulario40.replace("#RepresentanteLegal_numeroNotaria#", $scope.datosAnt.RepresentanteLegal_numeroNotaria);
                stringFormulario40 = stringFormulario40.replace("#empresa#", $scope.datosAnt.empresa);
                stringFormulario40 = stringFormulario40.replace("#nit_empresa#", $scope.datosAnt.nit_empresa);
                stringFormulario40 = stringFormulario40.replace("#denominacion#", $scope.datosAnt.denominacion);
                stringFormulario40 = stringFormulario40.replace("#superficie#", $scope.datosAnt.superficie);
                stringFormulario40 = stringFormulario40.replace("#horarioAtencion#", $scope.datosAnt.horarioAtencion);
                stringFormulario40 = stringFormulario40.replace("#establecimiento#", $scope.datosAnt.establecimiento);
                stringFormulario40 = stringFormulario40.replace("#tipoActividad#", $scope.datosAnt.tipoActividad);
                //stringFormulario40  =   stringFormulario40.replace("#descripcion#", $scope.datosAnt.descripcion.toUpperCase());
                //stringFormulario40  =   stringFormulario40.replace("#tipocategoria#", $scope.datosA[0].tipocategoria);
                //stringFormulario40  =   stringFormulario40.replace("#ActividadDesarrollada#", $scope.datosAnt.ActividadDesarrollada);
                stringFormulario40 = stringFormulario40.replace("#IdMacrodistrito#", $scope.datosAnt.IdMacrodistrito);
                stringFormulario40 = stringFormulario40.replace("#Macrodistrito#", $scope.datosAnt.Macrodistrito);
                stringFormulario40 = stringFormulario40.replace("#Distrito#", $scope.datosAnt.Distrito);
                stringFormulario40 = stringFormulario40.replace("#zona#", $scope.datosAnt.zona);
                stringFormulario40 = stringFormulario40.replace("#tipoVia#", $scope.datosAnt.tipoVia);
                stringFormulario40 = stringFormulario40.replace("#via#", $scope.datosAnt.via);
                stringFormulario40 = stringFormulario40.replace("#numero#", $scope.datosAnt.numero);
                stringFormulario40 = stringFormulario40.replace("#numeroActividad#", $scope.datosAnt.numeroActividad);
                stringFormulario40 = stringFormulario40.replace("#idCodigoZona#", $scope.datosAnt.idCodigoZona);

                var multiAnt = '';
                if ($scope.datosAnt.idTipoLicencia == 3375 || $scope.datosAnt.idTipoLicencia == '3375') {
                    stringFormulario40 = stringFormulario40.replace("#tipocategoria#", 'MULTISERVICIOS');
                    //stringFormulario40  =   stringFormulario40.replace("#ActividadDesarrollada#", 'MULTISERVICIOS');
                    stringFormulario40 = stringFormulario40.replace("#descripcion#", 'MULTISERVICIOS');
                    /*multiAnt = '<table id="tablaMulAnt" class="table table-striped table-bordered"><tr><td>NRO</td>'+
                    '<td>TIPO DE LICENCIA</td>' +
                    '<td>TIPO DE CATEGORÍA</td>'+
                    '<td>TIPO DE ACTIVIDAD</td></tr>';
                    for (i = 0; i < $scope.datosAntMulti.length; i++){
                        multiAnt = multiAnt +'<tr>' +
                        '<td>' + (i+1) + '</td>'+
                        '<td>' + $scope.datosAntMulti[i].f01_tipo_licmdescrip + '</td>'+
                        '<td>' + $scope.datosAntMulti[i].f01_cat_agrupadamdescrip + '</td>'+
                        '<td>' + $scope.datosAntMulti[i].f01_act_desarrolladamdescrip + '</td></tr>';
                    }
                    multiAnt = multiAnt + '</table>';
                    stringFormulario40  =   stringFormulario40.replace("#ActividadDesarrollada#", 'MULTISERVICIOS');
                    stringFormulario40  =   stringFormulario40.replace("#Licenmul_grillaAnt#", multiAnt);*/
                } else {
                    stringFormulario40 = stringFormulario40.replace("#descripcion#", $scope.datosAnt.descripcion.toUpperCase());
                    try {
                        stringFormulario40 = stringFormulario40.replace("#tipocategoria#", $scope.datosA[0].tipocategoria);
                    } catch (e) { console.log("Error:", e) }
                    stringFormulario40 = stringFormulario40.replace("#ActividadDesarrollada#", $scope.datosAnt.ActividadDesarrollada);
                    stringFormulario40 = stringFormulario40.replace("#Licenmul_grillaAnt#", multiAnt);
                };
                var pubAnt = '';
                if (datos.publicidadAntiguo_grilla.length > 1) {
                    pubAnt = '<tr><td>VIAE</td>' +
                        '<td>TIPO</td>' +
                        '<td>CARACTERÍSTICA</td>' +
                        //'<td>CARAS</td>'+
                        '<td>DESCRIPCIÓN</td>' +
                        '<td>ALTO</td>' +
                        '<td>ANCHO</td>' +
                        '<td>SUPERFICIE</td></tr>';
                    for (i = 1; i < datos.publicidadAntiguo_grilla.length; i++) {
                        pubAnt = pubAnt + '<tr>' +
                            '<td>' + datos.publicidadAntiguo_grilla[i].nroElem + '</td>' +
                            '<td>' + datos.publicidadAntiguo_grilla[i].descripcionTipoLetrero + '</td>' +
                            '<td>' + datos.publicidadAntiguo_grilla[i].caracteristica + '</td>' +
                            //'<td>' + datos.publicidadAntiguo_grilla[i].cara + '</td>'+
                            '<td>' + datos.publicidadAntiguo_grilla[i].descripcion + '</td>' +
                            '<td>' + datos.publicidadAntiguo_grilla[i].alto + '</td>' +
                            '<td>' + datos.publicidadAntiguo_grilla[i].ancho + '</td>' +
                            '<td>' + datos.publicidadAntiguo_grilla[i].superficie + '</td></tr>';
                    }
                    stringFormulario40 = stringFormulario40.replace("#publicidadAntiguo_grilla#", pubAnt);
                } else {
                    stringFormulario40 = stringFormulario40.replace("#publicidadAntiguo_grilla#", 'ACTIVIDAD ECONOMICA SIN ELEMENTOS DE IDENTIFICACIÓN');
                }
                $scope.msgformularioJ = stringFormulario40;
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
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.datosAnt.RepresentanteLegal_primerApellido = (($scope.datosAnt.RepresentanteLegal_primerApellido == 'undefined' || $scope.datosAnt.RepresentanteLegal_primerApellido == null) ? "" : $scope.datosAnt.RepresentanteLegal_primerApellido);
        $scope.datosAnt.RepresentanteLegal_segundoApellido = (($scope.datosAnt.RepresentanteLegal_segundoApellido == 'undefined' || $scope.datosAnt.RepresentanteLegal_segundoApellido == null) ? "" : $scope.datosAnt.RepresentanteLegal_segundoApellido);
        $scope.datosAnt.RepresentanteLegal_tercerApellido = (($scope.datosAnt.RepresentanteLegal_tercerApellido == 'undefined' || $scope.datosAnt.RepresentanteLegal_tercerApellido == null) ? "" : $scope.datosAnt.RepresentanteLegal_tercerApellido);
        $scope.datosAnt.RepresentanteLegal_celular = (($scope.datosAnt.RepresentanteLegal_celular == 'undefined' || $scope.datosAnt.RepresentanteLegal_celular == null) ? "" : $scope.datosAnt.RepresentanteLegal_celular);
        $scope.datosAnt.empresa_telefono = (($scope.datosAnt.empresa_telefono == 'undefined' || $scope.datosAnt.empresa_telefono == null) ? "" : $scope.datosAnt.empresa_telefono);
        dataForm['empresa'] = $scope.datosAnt.empresa;
        dataForm['nit_empresa'] = $scope.datosAnt.nit_empresa;
        dataForm['RepresentanteLegal_primerNombre'] = $scope.datosAnt.RepresentanteLegal_primerNombre;
        dataForm['RepresentanteLegal_segundoNombre'] = $scope.datosAnt.RepresentanteLegal_segundoNombre;
        dataForm['RepresentanteLegal_tercerNombre'] = $scope.datosAnt.RepresentanteLegal_tercerNombre;
        dataForm['RepresentanteLegal_primerApellido'] = $scope.datosAnt.RepresentanteLegal_primerApellido;
        dataForm['RepresentanteLegal_segundoApellido'] = $scope.datosAnt.RepresentanteLegal_segundoApellido;
        dataForm['RepresentanteLegal_tercerApellido'] = $scope.datosAnt.RepresentanteLegal_tercerApellido;
        dataForm['Representante_Legal_tipoIdentidad'] = $scope.datosAnt.Representante_Legal_tipoIdentidad;
        dataForm['Representante_Legal_identificacion'] = $scope.datosAnt.Representante_Legal_identificacion;
        dataForm['RepresentanteLegal_expedicion'] = $scope.datosAnt.RepresentanteLegal_expedicion;
        dataForm['RepresentanteLegal_zona'] = $scope.datosAnt.RepresentanteLegal_zona;
        dataForm['RepresentanteLegal_TipoVia'] = $scope.datosAnt.RepresentanteLegal_TipoVia;
        dataForm['RepresentanteLegal_via'] = $scope.datosAnt.RepresentanteLegal_via;
        dataForm['RepresentanteLegal_numeroVia'] = $scope.datosAnt.RepresentanteLegal_numeroVia;
        dataForm['empresa_telefono'] = $scope.datosAnt.empresa_telefono;
        dataForm['RepresentanteLegal_celular'] = $scope.datosAnt.RepresentanteLegal_celular;
        dataForm['RepresentanteLegal_numeroPoder'] = $scope.datosAnt.RepresentanteLegal_numeroPoder;
        dataForm['RepresentanteLegal_gestionPoder'] = $scope.datosAnt.RepresentanteLegal_gestionPoder;
        dataForm['RepresentanteLegal_numeroNotaria'] = $scope.datosAnt.RepresentanteLegal_numeroNotaria;
        dataForm['denominacion'] = $scope.datosAnt.denominacion;
        dataForm['superficie'] = $scope.datosAnt.superficie;
        dataForm['horarioAtencion'] = $scope.datosAnt.horarioAtencion;
        dataForm['establecimiento'] = $scope.datosAnt.establecimiento;
        dataForm['tipoActividad'] = $scope.datosAnt.tipoActividad;
        dataForm['IdMacrodistrito'] = $scope.datosAnt.IdMacrodistrito;
        dataForm['Macrodistrito'] = $scope.datosAnt.Macrodistrito;
        dataForm['Distrito'] = $scope.datosAnt.Distrito;
        dataForm['zona'] = $scope.datosAnt.zona;
        dataForm['tipoVia'] = $scope.datosAnt.tipoVia;
        dataForm['via'] = $scope.datosAnt.via;
        dataForm['numero'] = $scope.datosAnt.numero;
        dataForm['publicidadAntiguo_grilla'] = $scope.datosAnt.publicidadAntiguo_grilla;
        dataForm['numeroActividad'] = $scope.datosAnt.numeroActividad;
        dataForm['idCodigoZona'] = $scope.datosAnt.idCodigoZona;
        var multiAnt = '';
        if ($scope.datosAnt.idTipoLicencia == 3375 || $scope.datosAnt.idTipoLicencia == '3375') {
            dataForm['descripcion'] = 'MULTISERVICIOS';
            dataForm['tipocategoria'] = 'MULTISERVICIOS';
            /*multiAnt = '<table id="tablaVAnt" border="0.5" style="width:100%"><tr><td>NRO</td>'+
            '<td>TIPO DE LICENCIA</td>' +
            '<td>TIPO DE CATEGORÍA</td>'+
            '<td>TIPO DE ACTIVIDAD</td></tr>';
            for (i = 0; i < $scope.datosAntMulti.length; i++){
                multiAnt = multiAnt +'<tr>' +
                '<td>' + (i+1) + '</td>'+
                '<td>' + $scope.datosAntMulti[i].f01_tipo_licmdescrip + '</td>'+
                '<td>' + $scope.datosAntMulti[i].f01_cat_agrupadamdescrip + '</td>'+
                '<td>' + $scope.datosAntMulti[i].f01_act_desarrolladamdescrip + '</td></tr>';
            }
            multiAnt = multiAnt + '</table>';*/
            dataForm['ActividadDesarrollada'] = 'MULTISERVICIOS';
            //dataForm['Licenmul_grillaAnt'] =  multiAnt;
        } else {
            dataForm['descripcion'] = $scope.datosAnt.descripcion.toUpperCase();
            try {
                dataForm['tipocategoria'] = $scope.datosA[0].tipocategoria;
            } catch (e) { console.log("Error:", e) }
            dataForm['ActividadDesarrollada'] = $scope.datosAnt.ActividadDesarrollada;
            //dataForm['Licenmul_grillaAnt'] =  multiAnt;
        };
        var pubAnt = '';
        if (data.publicidadAntiguo_grilla.length > 1) {
            pubAnt = '<table border="0.5" style="width:100%"><tr><td>VIAE</td>' +
                '<td>TIPO</td>' +
                '<td>CARACTERÍSTICA</td>' +
                //'<td>CARAS</td>'+
                '<td>DESCRIPCIÓN</td>' +
                '<td>ALTO</td>' +
                '<td>ANCHO</td>' +
                '<td>SUPERFICIE</td></tr>';
            for (i = 1; i < data.publicidadAntiguo_grilla.length; i++) {
                pubAnt = pubAnt + '<tr>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].nroElem + '</td>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].descripcionTipoLetrero + '</td>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].caracteristica + '</td>' +
                    //'<td>' + data.publicidadAntiguo_grilla[i].cara + '</td>'+
                    '<td>' + data.publicidadAntiguo_grilla[i].descripcion + '</td>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].alto + '</td>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].ancho + '</td>' +
                    '<td>' + data.publicidadAntiguo_grilla[i].superficie + '</td></tr>';
            }
            pubAnt = pubAnt + '</table>';
            dataForm['publicidadAntiguo_grilla'] = pubAnt;
        } else {
            dataForm['publicidadAntiguo_grilla'] = 'ACTIVIDAD ECONOMICA SIN ELEMENTOS DE IDENTIFICACIÓN';
        }
        dataForm['numeroActividad'] = $scope.datosAnt.numeroActividad;
        dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
        dataForm['f01_tipo_form'] = '402';
        dataForm['f01_raz_soc_per_jur'] = data.f01_raz_soc_per_jur;
        dataForm['f01_raz_soc'] = data.f01_raz_soc;
        dataForm['f01_num_doc_per_jur'] = data.f01_num_doc_per_jur;
        dataForm['f01_pri_nom_rep'] = data.f01_pri_nom_rep;
        dataForm['f01_seg_nom_rep'] = data.f01_seg_nom_rep;
        dataForm['f01_ape_pat_rep'] = data.f01_ape_pat_rep;
        dataForm['f01_ape_mat_rep'] = data.f01_ape_mat_rep;
        dataForm['f01_ape_cas_rep'] = data.f01_ape_cas_rep;
        dataForm['f01_tip_doc_rep'] = data.f01_tip_doc_rep;
        dataForm['f01_num_doc_rep'] = data.f01_num_doc_rep;
        dataForm['f01_expedido_rep'] = data.f01_expedido_rep;
        dataForm['f01_num_pod_leg'] = data.f01_num_pod_leg;
        dataForm['f01_num_notaria'] = data.f01_num_notaria;
        dataForm['f01_ges_vig_pod'] = data.f01_ges_vig_pod;
        dataForm['f01_nit'] = data.f01_nit;
        dataForm['f01_zona_rep'] = data.f01_zona_rep;
        dataForm['f01_num_prop'] = data.f01_num_prop;
        dataForm['f01_telef_rep'] = data.f01_telef_rep;
        dataForm['f01_tipo_viarep'] = data.f01_tipo_viarep;
        dataForm['f01_nom_via_rep'] = data.f01_nom_via_rep;
        dataForm['f01_num_rep'] = data.f01_num_rep;
        dataForm['f01_cel_rep'] = data.f01_cel_rep;
        dataForm['f01_cel_prop'] = data.f01_cel_prop;
        dataForm['f01_categoria_descrip'] = data.f01_categoria_agrupada_descripcion;
        dataForm['f01_zona_act_descrip'] = data.f01_zona_act_descrip;
        dataForm['f01_tip_via_act'] = data.f01_tip_via_act;
        dataForm['f01_num_act'] = data.f01_num_act;
        dataForm['f01_num_act1'] = data.f01_num_act1;
        dataForm['f01_sup'] = data.f01_sup;
        dataForm['f01_edificio_act'] = data.f01_edificio_act;
        dataForm['f01_bloque_act'] = data.f01_bloque_act;
        dataForm['f01_piso_act'] = data.f01_piso_act;
        dataForm['f01_dpto_of_loc'] = data.f01_dpto_of_loc;
        dataForm['f01_tel_act1'] = data.f01_tel_act1;
        dataForm['f01_tipo_lic_descrip'] = data.f01_tipo_lic_descrip;
        dataForm['f01_categoria_agrupada_descrip'] = data.f01_categoria_agrupada_descrip;
        dataForm['f01_macro_act_descrip'] = data.f01_macro_act_descrip;
        dataForm['f01_dist_act'] = data.f01_dist_act;
        dataForm['f01_estab_es'] = data.f01_estab_es;
        dataForm['f01_sup'] = data.f01_sup;
        dataForm['f01_num_pmc'] = data.f01_num_pmc;
        dataForm['f01_nro_orden'] = data.f01_nro_orden;
        /*if(data.f01_tip_act =='MA' || data.f01_tip_act =='MATRI'){
            dataForm['f01_tip_act'] =  'MATRIZ';
        }
        if(data.f01_tip_act =='SU' || data.f01_tip_act =='SUCUR'){
            dataForm['f01_tip_act'] = 'SUCURSAL';
        }*/
        var multi = '';
        if (data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32') {
            dataForm['f01_tipo_lic_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descripcion'] = data.f01_tipo_lic_descrip;
            multi = '<table border="0.5" style="width:100%"><tr><td>NRO</td>' +
                '<td>TIPO DE LICENCIA</td>' +
                '<td>TIPO DE CATEGORÍA</td>' +
                '<td>TIPO DE ACTIVIDAD</td></tr>';
            for (i = 1; i < data.Licenmul_grilla.length; i++) {
                multi = multi + '<tr>' +
                    '<td>' + data.Licenmul_grilla[i].nroElem + '</td>' +
                    '<td>' + data.Licenmul_grilla[i].f01_tipo_licmdescrip + '</td>' +
                    '<td>' + data.Licenmul_grilla[i].f01_cat_agrupadamdescrip + '</td>' +
                    '<td>' + data.Licenmul_grilla[i].f01_act_desarrolladamdescrip + '</td></tr>';
            }
            multi = multi + '</table>';
            dataForm['Licenmul_grilla'] = multi;
        } else {
            dataForm['f01_tipo_lic_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descrip'] = data.f01_categoria_agrupada_descrip;
            dataForm['f01_categoria_agrupada_descripcion'] = data.f01_categoria_agrupada_descripcion;
            dataForm['Licenmul_grilla'] = data.Licenmul_grilla;
        };
        var pubMod = '';
        pubMod = '<table border="0.5" style="width:100%"><tr><td>VIAE</td>' +
            '<td>TIPO</td>' +
            '<td>CARACTERÍSTICA</td>' +
            //'<td>CARAS</td>'+
            '<td>DESCRIPCIÓN</td>' +
            '<td>ALTO</td>' +
            '<td>ANCHO</td>' +
            '<td>SUPERFICIE</td>' +
            '<td>ESTADO</td></tr>';
        for (i = 0; i < data.publicidad.length; i++) {
            pubMod = pubMod + '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + data.publicidad[i].INT_TIPO_LETRE + '</td>' +
                '<td>' + data.publicidad[i].INT_CARA + '</td>' +
                //'<td>' + data.publicidad[i].INT_NRO_CARA + '</td>'+
                '<td>' + data.publicidad[i].INT_DESC + '</td>' +
                '<td>' + data.publicidad[i].INT_ANCHO + '</td>' +
                '<td>' + data.publicidad[i].INT_ALTO + '</td>' +
                '<td>' + data.publicidad[i].INT_SUP + '</td>' +
                '<td>' + data.publicidad[i].estado + '</td></tr>';
        }
        pubMod = pubMod + '</table>';
        dataForm['publicidad_grilla'] = pubMod;
        var tablapago = '';
        if (data.pago_adelantado == true) {
            dataForm['pago_adelantado'] = 'SI'; //data.pago_adelantado;
            dataForm['nro_ges'] = data.nro_ges;
            dataForm['tablaP'] = '';
        } else {
            dataForm['pago_adelantado'] = 'SIN PAGO ADELANTADO';
            dataForm['nro_ges'] = 'NINGUNA';
            dataForm['tablaP'] = '';
        }
        if (data.pago_adelantado == true) {
            dataForm['pagoadelantado'] = 'Me comprometo a mantener las condiciones técnicas y ubicación de la Actividad Económica por el periodo autorizado, caso contrario  me someteré a lo dispuesto en la Ley Municipal Autonómica 343/2018, sin reclamo alguno.';
        } else {
            dataForm['pagoadelantado'] = '';
        }
        var divfoodTruck = '';
        if (data.f01_categoria == 211 || data.f01_categoria == '211') {
            divfoodTruck = divfoodTruck + '<table border="0" style="width:100%">' +
                '<tr><td colspan="4" style="width: 100%">DATOS DEL VEHÍCULO O REMOLQUE</td></tr>' +
                '<tr>' +
                '<td style="width: 25%">TIPO DE VEHÍCULO:</td>' +
                '<td style="width: 25%">' + data.f01_vehiculo_ft + '</td>';
            if (data.f01_vehiculo_ft == "REMOLQUE") {
                divfoodTruck = divfoodTruck +
                    '<td style="width: 25%">OTORGADO: </td>' +
                    '<td style="width: 25%">' + data.f01_otorgado_ft + '</td>' +
                    '</tr>';
            } else {
                divfoodTruck = divfoodTruck +
                    '<td style="width: 25%"></td>' +
                    '<td style="width: 25%"></td>' +
                    '</tr>';
            }
            divfoodTruck = divfoodTruck + '<tr>' +
                '<td style="width: 25%">CLASE: </td>' +
                '<td style="width: 25%">' + data.f01_clase_ft + '</td>' +
                '<td style="width: 25%">MARCA: </td>' +
                '<td style="width: 250%">' + data.f01_marca_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 25%">TIPO: </td>' +
                '<td style="width: 25%">' + data.f01_tipo_ft + '</td>' +
                '<td style="width: 25%">SUBTIPO: </td>' +
                '<td style="width: 25%">' + data.f01_subtipo_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 25%">MODELO: </td>' +
                '<td style="width: 25%">' + data.f01_modelo_ft + '</td>' +
                '<td style="width: 25%">MOTOR: </td>' +
                '<td style="width: 25%">' + data.f01_motor_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 25%">Nº CHASIS: </td>' +
                '<td style="width: 25%">' + data.f01_chasis_ft + '</td>' +
                '<td style="width: 25%">SERVICIO: </td>' +
                '<td style="width: 25%">' + data.f01_servicio_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 25%">COLOR: </td>' +
                '<td style="width: 25%">' + data.f01_color_ft + '</td>' +
                '<td style="width: 25%">RADICATORIA: </td>' +
                '<td style="width: 25%">' + data.f01_radicatoria_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 25%">DOCUMENTO LEGAL: </td>' +
                '<td style="width: 25%">' + data.f01_doclegal_ft + '</td>' +
                '<td style="width: 25%">Nº DOCUMENTO LEGAL: </td>' +
                '<td style="width: 25%">' + data.f01_numdoclegal_ft + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width: 50%" colspan="2">UBICACIÓN DEL LUGAR DONDE SE EFECTUARÁ LA INSPECCIÓN DEL VEHÍCULO O REMOLQUE: </td>' +
                '<td style="width: 50%" colspan="2">' + data.f01_lugar_ft + '</td>' +
                '</tr></table>';
            dataForm['divft'] = divfoodTruck;
        } else {
            dataForm['divft'] = divfoodTruck;
        };
        dataForm['f01_idCodigoZona'] = data.f01_idCodigoZona;
        dataForm['fecha_sist'] = sfecha;
        dataForm['fecha_sist2'] = sfecha;
        dataForm['usuario'] = sessionService.get('USUARIO');
        dataForm['hora_sist'] = sHora;
        if (data.chkzonasegura == '' || data.chkzonasegura == 'undefined' || data.chkzonasegura == undefined) {
            dataForm['zonaSegura'] = '';
        } else {
            if (datos.chkzonasegura == 'ZONASEGURA') {
                dataForm['zonaSegura'] = '<label>Zona Segura:</label> SI';
            } else {
                dataForm['zonaSegura'] = '<label>Zona Segura:</label> NO';
            };
        };
        var nombreUsuario = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
        dataForm['usuarioPlataforma'] = nombreUsuario;
        $rootScope.datosForm401 = dataForm;
        $rootScope.datosEnv = data;
    }

    $scope.fmostrarFormulario = function() {
        $("#exampleModalCenter1").modal({ backdrop: 'static', keyboard: false });
        $('#msgformularioJ').html($scope.msgformularioJ);
    }

    $scope.cargarDatosJuridico = function() {
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');
        if ($scope.sTipoPersona == "JURIDICO") {
            $scope.divJuridico = "mostrar";
        }
        $scope.macrodistritos();
        $scope.getCaptchasXX();
        //$scope.lscategoria();
        //$scope.lssubcategoria();
        //$scope.lsCaracteristica();
        //$scope.listadoDatosLicencia();
        $scope.lscategoria();
        $scope.lssubcategoria();
        $scope.lsCaracteristica();
        $scope.catactividadDesarrollada();
    };

    var clsIniciarGrillaAE = $rootScope.$on('inicializarGrillaAE', function(event, data) {
        $scope.formDatosAE = false;
        $scope.mostrarMsgActividadTrue = false;
        $scope.mostrarMsgActividadFalse = false;
        setTimeout(function() {
            if (
                (typeof($scope.datos.INT_AC_latitud) != 'undefined' && $scope.datos.INT_AC_latitud != "" && $scope.datos.INT_AC_latitud != 0 && $scope.datos.INT_AC_latitud != "0") &&
                (typeof($scope.datos.INT_AC_longitud) != 'undefined' && $scope.datos.INT_AC_longitud != "" && $scope.datos.INT_AC_longitud != 0 && $scope.datos.INT_AC_longitud != "0")
            ) {
                var nuevoUbicacion = {
                    lat: parseFloat($scope.datos.INT_AC_latitud),
                    lng: parseFloat($scope.datos.INT_AC_longitud)
                };
                map.setCenter(nuevoUbicacion);
                $scope.addMarker(nuevoUbicacion);
            } else {
                var nuevoUbicacion = {
                    lat: -16.495635,
                    lng: -68.133543
                };
                map.setCenter(nuevoUbicacion);
                $scope.setMapOnAll();
            }
        }, 500);
        if (data.length > 0) {
            if (data[0].venviado != 'SI') {
                if (data[0].datos.INT_FORM_ALMACENADO != 'G') {
                    $scope.validarActividadEconomica();
                } else {
                    if (data[0].datos.rdTipoTramite == 'NUEVO') {
                        $scope.mostrarMsgNuevaActividad = true;
                        $scope.formDatosAE = false;
                        $scope.txtMsgDataNuevaActividad = "Favor revisar la informacion. Creara una nueva Actividad Economica.";
                    } else {
                        $scope.validarActividadEconomica();
                    }
                }
            }
        }
    });


    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data) {
        $scope.catactividadDesarrollada();
        if (datos.f01_id_actividad_economica) {
            $scope.datosAnterioresJuridico(datos.f01_id_actividad_economica);
        };
        if ((data.INT_AC_latitud == 'undefined' && data.INT_AC_longitud == 'undefined') || (data.INT_AC_latitud == undefined && data.INT_AC_longitud == undefined) || (data.INT_AC_latitud == '' && data.INT_AC_longitud == '')) {} else {
            $scope.open_map_ae2(data.INT_AC_latitud, data.INT_AC_longitud);
        };
        $scope.datos.f01_macro_act = data.f01_macro_act;
        document.getElementById("f01_macro_act").value = data.f01_macro_act;
        $scope.GetValueZonaSegura(data.f01_categoria_agrupada);
        if (data.publicidadAE == undefined || data.publicidadAE == 'undefined') {
            $scope.pubAE = false;
            $scope.pubMensaje = true;
        } else {
            $scope.pubAE = true;
            $scope.pubMensaje = false;
        };
        //VERIFICAR CATEGORIA DESARROLLADA
        var categoriaDescrip = ((typeof(data.f01_categoria_descrip) == 'undefined' || data.f01_categoria_descrip == null) ? '' : data.f01_categoria_descrip);
        if (categoriaDescrip == '') {
            $scope.sActividadDesarrollada = false;
        }
        //REQUISITOS DOCUMENTALES
        var categoriaAgrupadaDesc = ((typeof(data.f01_categoria_agrupada) == 'undefined' || data.f01_categoria_agrupada == null) ? '' : data.f01_categoria_agrupada);
        if (categoriaAgrupadaDesc != '') {
            $scope.getRequisitosTecnicosCategoria(data.f01_categoria_agrupada, data.f01_tipo_per);
        }
        if (data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32') {
            $scope.sCategoria = false;
            $scope.smultiservicios = true;
            $scope.datos.f01_categoria_descrip = data.f01_categoria;
        } else {
            $scope.sCategoria = true;
            $scope.smultiservicios = false;
        }

        /*REQUISITOS2018*/
        if (data.f01_categoria_agrupada == '' || data.f01_categoria_agrupada == undefined || data.f01_categoria_agrupada == 'undefined') {} else {
            if (data.f01_tipo_lic == 32 || data.f01_tipo_lic == '32') { //verificamos si la licencia es multiple
                $scope.lstRequisitosMultiples2018(data.licenciam);
            } else {
                $scope.getRequisitosFormulario(data.f01_categoria_agrupada, data.f01_tipo_per);
            }
        };
        $scope.iniciarRequisitosForm(data);

        if (data.f01_tip_via_act == '' || data.f01_tip_via_act == undefined || data.f01_tip_via_act == 'undefined') {} else {
            $scope.cargarNombVia(data.f01_tip_via_act, data.f01_zona_act);
        };
        switch (data.chkzonasegura) {
            case 'ZONASEGURA':
                $scope.mostrarzonaseguraj = true;
                break;
            case 'NOZONASEGURA':
                $scope.mostrarzonaseguraj = true;
                break;
            case '':
                $scope.mostrarzonaseguraj = false;
                break;
            case 'undefined':
                $scope.mostrarzonaseguraj = false;
                break;
            case undefined:
                $scope.mostrarzonaseguraj = false;
                break;
            case null:
                $scope.mostrarzonaseguraj = false;
                break;
        };
        //MOSTRAR VIAE
        if (data.rdTipoTramite1 == 'NUEVO') {
            $scope.licenciaToogle4 = true;
        } else {
            $scope.licenciaToogle4 = false;
        }
        if (data.pago_adel == 'SI') {
            $scope.IsVisible = true;
            $scope.calcularDeudas(data.nro_ges);
            $scope.pago_adelantado = 'SI';
        } else {
            $scope.IsVisible = false;
            $scope.datos.pago_adel = 'NO';
            $scope.totalD = 0;
            $scope.datos.nro_ges = '';
            $scope.pago_adelantado = 'NO';
        };
        //MOSTRAR RADIO NUEVA - RENOVACION
        if (typeof(data.rdTipoTramite) != 'undefined') {
            if (data.rdTipoTramite == "NUEVO") {
                //MOSTRAMOS BOTONES PAGINA
                if (data.INT_FORM_ALMACENADO == "G") {
                    $scope.botones = "mostrar";
                    $scope.desabilitado = false;
                }
            }
        }
        $scope.datos.f01_macro_act = data.f01_macro_act;
        $scope.datos.f01_categoria_descrip = data.f01_categoria_descrip;
        /*if(typeof(data.f01_macro_act) != 'undefined'){
            //LISTANDO ZONAS
            var idMacro =   data.f01_macro_act;
            $scope.aDistritoZona = {};
            filtro = '{"filter": "dist_macro_id='+idMacro+'"}';
            var parametros = {
                    "table_name":"_bp_distritos_zonas",
                    "body": filtro
            };
            DreamFactory.api[CONFIG.SERVICE].getRecordsByPost(parametros).success(function (results){
                if(results.record.length > 0){
                    $scope.aDistritoZona = results.record;
                }else{
                    $scope.msg = "Error !!";
                }
            }).error(function(results){
            });
        }
        if(typeof($scope.datos.INT_VIA) != 'undefined'){
            var idTipoVia   =   $scope.datos.INT_VIA;
            var tipoVia     =   [
                { name: 'AVENIDA', id: '1'},
                { name: 'CALLE', id: '2'},
                { name: 'CALLEJON', id: '3'},
                { name: 'PASAJE', id: '4'}
            ];
            angular.forEach(tipoVia, function(value, key) {
                if(value.id == idTipoVia){
                    $scope.datos.INT_TIP_VIA  =   value.name;
                }
            });
        }*/
        //EXTRAYENDO EXPEDIDO
        if (typeof($scope.datos.INT_EXP) != 'undefined') {
            var ideExpedido = $scope.datos.INT_EXP;
            var tipoExpedido = [
                { name: 'LA PAZ', value: 'LPZ', id: '1' },
                { name: 'ORURO', value: 'ORU', id: '2' },
                { name: 'POTOSI', value: 'PTS', id: '3' },
                { name: 'COCHABAMBA', value: 'CBB', id: '4' },
                { name: 'TARIJA', value: 'TJA', id: '5' },
                { name: 'CHUQUISACA', value: 'CHQ', id: '6' },
                { name: 'SANTA CRUZ', value: 'SCZ', id: '7' },
                { name: 'PANDO', value: 'PND', id: '8' },
                { name: 'BENI', value: 'BNI', id: '9' },
                { name: 'EXTRANJERO', value: 'EXT', id: '10' }
            ];
            angular.forEach(tipoExpedido, function(value, key) {
                if (value.id == ideExpedido) {
                    $scope.datos.INT_EXP = value.value;
                }
            });
        }
        if (typeof(data.f01_tip_via_act) == 'undefined') {
            setTimeout(function() {
                $scope.desabilitadoZ = true;
                $scope.desabilitadoV = true;
            }, 1000);
        }
        /*if(typeof(data.INT_AC_MACRO_ID) != 'undefined'){
            //LISTANDO ZONAS
            $scope.aDistritoZona = {};
            try{
                var parametros = new distritoZona();
                parametros.idMacro = data.f01_macro_act;
                parametros.obtdist(function(resultado){
                    data = JSON.parse(resultado);
                    if(data.success.length > 0){
                        $scope.aDistritoZona = data.success;
                    }else{
                        $scope.msg = "Error !!";
                    }
                });
            }catch(error){
            }
        }*/
        $scope.distritoZonas($scope.datos.f01_macro_act);
        $scope.nom_via = data.INT_AC_NOMBRE_VIA;
        if (data.INT_AC_ZONA) {
            $scope.desabilitadoZ = false;
        }
        if (data.INT_AC_TIP_VIA) {
            $scope.desabilitadoV = false;
        }
        /*if(data.INT_AC_TIP_VIA != ""){
            $scope.vias(data.INT_AC_ID_ZONA,data.INT_AC_TIP_VIA);
        }*/
        $scope.datos.INT_AC_NOMBRE_VIA = data.INT_AC_NOMBRE_VIA;
        $scope.obtenerHora();
        $scope.obtenerFecha();
        //$scope.abrirMapa();
        $scope.open_mapa_ae();
        if (data.FILE_FOTOCOPIA_CI)
            $scope.divfileci = true;
        if (data.FILE_FOTOCOPIA_CI_R)
            $scope.divfilecir = true;
        if ($scope.datos.f01_poder_representante)
            $scope.divfilepoder = true;
        if (data.f01_test_cons_sociedad_j)
            $scope.divfiletest = true;
        if (data.file_num_ident)
            $scope.divfilenum = true;
        if (data.file_fund_emp)
            $scope.divfilefund = true;
    });

    $scope.vias = function(zona, tipo) {
        $scope.z = zona;
        $scope.t = tipo;
        try {
            var datos = new tipoVia();
            datos.idz = zona;
            datos.tipo = tipo;
            datos.obt_tipoVia(function(results) {
                $scope.tip_vias = [];
                var aTipoVia = {};
                aTipoVia["idv"] = "OTROS";
                aTipoVia["nombrev"] = "OTRO";
                data = JSON.parse(resultado);
                if (data.success.length > 0) {
                    $scope.tip_vias = data.success;
                }
                $scope.tip_vias.push(aTipoVia);
                $scope.desabilitadoNo = false;
            })
        } catch (error) {
            console.log("error en via");
        }
    };

    //fecha del servidor
    $scope.obtenerFecha = function() {
        var sfecha = "";
        try {
            var fechaactualn = new fechaserver();
            fechaactualn.obtfechahora(function(resultado) {
                sfecha = JSON.parse(resultado).success.fecha;
            });
            var sfechafinal = "";
            if (sfecha != null && sfecha != "") {
                var snuevafecha = "";
                var nrof = 0;
                try {
                    nrof = sfecha.split("/").length;
                } catch (e) {}
                if (nrof > 1) {
                    var dateString = sfecha;
                    var dateParts = sfecha.split("/");
                    snuevafecha = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // month is 0-based
                } else {
                    snuevafecha = new Date(sfecha);
                }
                var messnuevafecha = "";
                var diasnuevafecha = "";
                if (snuevafecha != 'Invalid Date') {
                    messnuevafecha = snuevafecha.getMonth() + 1;
                    messnuevafecha = (messnuevafecha < 10) ? '0' + messnuevafecha : messnuevafecha;
                    if (snuevafecha.getDate() < 10) {
                        diasnuevafecha = "0" + (snuevafecha.getDate());
                    } else {
                        diasnuevafecha = snuevafecha.getDate();
                    }
                    sfechafinal = diasnuevafecha + "/" + messnuevafecha + "/" + snuevafecha.getFullYear();
                    $scope.anioserver = snuevafecha.getFullYear();
                }
            } else {
                sfechafinal = sfecha;
            }
            $scope.fechafinalserver = sfechafinal;
            return sfechafinal;
        } catch (e) {
            $.unblockUI();
        }
    };

    $scope.obtenerHora = function() {
        var sfecha = "";
        var fechaactualh = new fechaserver();
        fechaactualh.obtfechahora(function(resultado) {
            sfecha = JSON.parse(resultado).success.fecha;
        });
        var sfechafinal = "";
        if (sfecha != null && sfecha != "") {
            snuevafecha = new Date(sfecha);
            var shora = "";
            var sminuto = "";
            var ssegundo = "";
            shora = snuevafecha.getHours();
            sminuto = snuevafecha.getMinutes();
            ssegundo = snuevafecha.getSeconds();
            sfechafinal = shora + ":" + sminuto + ":" + ssegundo;
        } else {
            sfechafinal = sfecha;
        }
        return sfechafinal;
    };

    $scope.tblDeudas = {};
    $scope.listDeudas = [];

    $scope.calcularDeudas = function(nroges) {
        var fechaP = new Date();
        var gestionP = fechaP.getFullYear();
        $scope.listDeudas = [];
        var pubDeuda = '';
        $scope.datos.listDeudas = [];
        $scope.datos.publicidadpa = [];
        if ($scope.datos.rdTipoTramite1 == 'NUEVO' && $scope.datos.publicidad.length > 0) {
            datoObjectFinal = [];
            var j = 0;
            for (var i = 0; i < $scope.datos.publicidad.length; i++) {
                if ($scope.datos.publicidad[i].estado != 'B') {
                    var objetopub = new Object();
                    objetopub = $scope.datos.publicidad[i];
                    datoObjectFinal[j] = objetopub;
                    j++;
                } else {
                    if ($scope.datos.publicidad.length == 1 && $scope.datos.publicidad[i].estado == 'B') {
                        datoObjectFinal = "";
                    }
                }
            }
            $scope.datos.publicidadpa = datoObjectFinal;
            pubDeuda = JSON.stringify($scope.datos.publicidadpa);
        } else {};
        if ($scope.datos.f01_idCodigoZona == 'undefined' || $scope.datos.f01_idCodigoZona == null || $scope.datos.f01_idCodigoZona == "" || $scope.datos.f01_tipo_lic == 'undefined' || $scope.datos.f01_tipo_lic == null || $scope.datos.f01_tipo_lic == "" || $scope.datos.rdTipoTramite1 == 'undefined' || $scope.datos.rdTipoTramite1 == null || $scope.datos.rdTipoTramite1 == "" || $scope.datos.f01_zona_act == 'undefined' || $scope.datos.f01_zona_act == null || $scope.datos.f01_zona_act == "") {
            swal('', 'Complete todos los datos por favor!  ', 'warning');
            $scope.datos.nro_ges = '';
        } else {
            $.blockUI();
            $scope[name] = 'Running';
            var deferred = $q.defer();
            if ($scope.datos.f01_tipo_lic == '32' || $scope.datos.f01_tipo_lic == 32) {
                var idDesarrolladaP = '';
                var taemayor = 0;
                for (var i = 0; i < $scope.datos.licenciam.length; i++) {
                    if ($scope.datos.licenciam[i].f01_tae >= taemayor) {
                        taemayor = parseFloat($scope.datos.licenciam[i].f01_tae);
                        idDesarrolladaP = $scope.datos.licenciam[i].f01_cat_agrupadamid;
                    }
                };
            } else {
                idDesarrolladaP = $scope.datos.f01_categoria_agrupada;
            };
            var longituddeudas = 0;
            var calcularD = new pagoAdelaRenovacion();
            calcularD.idActividadEconomica = $scope.datos.f01_id_actividad_economica;
            calcularD.gestion = gestionP;
            calcularD.codigoZona = $scope.datos.f01_idCodigoZona;
            calcularD.factor = $scope.datos.f01_factor;
            calcularD.idActividadDesarrollada = idDesarrolladaP; //$scope.datos.f01_categoria_agrupada;
            calcularD.superficieOcupada = $scope.datos.f01_sup;
            calcularD.cadena = pubDeuda; //json publicidad
            calcularD.idZona = $scope.datos.f01_zona_act;
            calcularD.gestionesPrevias = nroges;

            calcularD.getPagoAdelRenovacion(function(resDeuda) {
                var deudasAE = JSON.parse(resDeuda);
                $scope.datos.listDeudas = deudasAE.success.dataSql;
                $scope.listDeudas = deudasAE.success.dataSql;
                longituddeudas = parseInt($scope.listDeudas.length) - 1;
                $scope.datos.calculo_total = $scope.listDeudas[longituddeudas].montoTotal;

                /*for (var i = 0; i < parseInt($scope.datos.nro_ges); i++) {
                    $scope.datos.montototal.push({
                        numero: (i+1),
                        gestion: (parseInt(gestionP) + i),
                        montoTotal: montoDeuda
                    });
                };*/
                //var data = $scope.listDeudas;
                deferred.resolve($scope.listDeudas);
                $scope.tblDeudas.reload();
                $.unblockUI();
            })
            return deferred.promise;
        }
    }


    $scope.getTotal = function() {
        var total = 0;
        for (var i = 0; i < $scope.listDeudas.length; i++) {
            total = total + parseInt($scope.listDeudas[i].total);
        }
        $scope.totalD = total;
        return total;
    }

    $scope.tblDeudas = new ngTableParams({
        page: 1,
        count: 10,
        filter: {},
        sorting: {
            vtra_id: 'desc'
        }
    }, {
        total: $scope.listDeudas.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.listDeudas, params.filter()) :
                $scope.listDeudas;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.listDeudas;
            params.total($scope.listDeudas.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    var clsIniciaBtnHabilitar = $rootScope.$on('iniciaBtnHabilitar', function(event, data) {
        $scope.btnEnviarForm = false;
        if (data) {
            if (data == 'G') {
                $scope.btnEnviarFormLinea = false;
            } else if (data == 'C') {
                $scope.btnEnviarFormLinea = true;
            }
        }
    });

    var clsIniciarHtmlForm = $rootScope.$on('inicializarHtmlForm', function(event, tramite) {
        if (tramite.venviado == 'SI') {
            $scope.btnGuardarForm = true;
            $scope.desabilitado = true;
            $scope.botones = null;
        } else {
            $scope.btnGuardarForm = false;
        }
        var datosgen = ((typeof($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        if (tramite.venviado == 'NO' && JSON.stringify(datosgen) === '{}') {
            $scope.mostrarMsgNuevaActividad = false;
        }
        $.unblockUI();
        //$scope.initMap();
    });

    $scope.$on('$destroy', function() {
        clsIniciarHtmlForm();
        clsIniciarCamposInternet();
        clsIniciarGrillaAE();
        clsIniciaBtnHabilitar();
    });
};