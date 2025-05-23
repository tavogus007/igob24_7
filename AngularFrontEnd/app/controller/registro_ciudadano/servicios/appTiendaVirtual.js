app.controller('serviciosControllerProducto', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, obtFechaActual, $q) {
    var fecha = new Date();
    var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    function cargando() {
        var texto = $("<div>", {
            text: "CARGANDO....",
            id: "myEstilo",
            css: {
                "font-size": "30px",
                "position": "relative",
                "width": "500px",
                "height": "300px",
                "left": "180px",
                "top": "50px"
            },
            fontawesome: "fa fa-spinner fa-pulse"
        });
        $.LoadingOverlay("show", {
            custom: texto,
            color: "rgba(255, 255, 255, 0.8)",
        });
    }
    $scope.tablaTramites = {};
    $scope.tramitesUsuario = [];
    $scope.datosinic = {};
    $rootScope.tramiteId = "";
    $scope.tblTramites = {};
    $scope.trmUsuario = [];
    $scope.templates =
        [
            { name: 'template0.html', url: '../../../app/view/servicios/tiendavirtual/tienda/index.html' },
            { name: 'template1.html', url: '../../../app/view/servicios/tiendavirtual/pago/index.html' },
            { name: 'template2.html', url: '../../../app/view/servicios/tiendavirtual/productos/index.html' },
            { name: 'template3.html', url: '../../../app/view/servicios/tiendavirtual/pagina/index.html' }
        ];
    $scope.serviciosTipoTramite = [
        { name: 'Registro de Productos', id: '51' }
    ];
    $scope.seleccionarProceso = function (proceso) {
        $scope.btnCrearBlk = "mostrar";
        $scope.procesoSeleccionado = proceso.id;
        if ($scope.procesoSeleccionado == 10) {
            sidservicio = 10;
        }
        $scope.procesoSeleccionado = proceso.id;
        $scope.btnNuevoTramtite = false;
    };
    $scope.crearTramiteP = function (idproceso) {
        if ($scope.procesoSeleccionado != '') {
            $scope.adicionarServicioGamlp(idproceso);
        }
    }
    $scope.adicionarServicioGamlp = function (idproceso) {
        var tipoPersona = sessionService.get('TIPO_PERSONA');
        var condiciones = '';
        var dataInicio = {};
        var fecha = new Date();
        var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var sIdServicio = idproceso;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sFechaTramite = fechactual;
        dataInicio.INT_FORM_ALMACENADO = 'C';
        var datosSerializados = JSON.stringify(dataInicio);
        $.blockUI();
        try {
            var crea = new adicionaTramitesFormulario();
            crea.frm_tra_fecha = sFechaTramite;
            crea.frm_tra_enviado = "NO";
            crea.frm_tra_registrado = fechactual;
            crea.frm_tra_modificado = fechactual;
            crea.id_servicio = sIdServicio;
            crea.data_json = datosSerializados;
            crea.oid_ciudadano = sIdCiudadano;
            crea.id_usuario = 3;
            $.blockUI();
            crea.adiciona_Tramites_Formulario(function (res) {
                x = JSON.parse(res);
                response = x.success;
                if (response.length > 0) {
                    sessionService.set('IDTRAMITE', response[0].sp_insertar_formulario_tramites);
                    $.unblockUI();
                    $scope.ListadoTramitesCiudadano();
                    swal('', 'Registro almacenado correctamente', 'success');
                    sessionService.destroy('NROTRAMITE');
                    sessionService.destroy('NROTRAMITEID');
                    sessionService.destroy('IDPROCESO');
                    $scope.btnEnviarForm = false;
                    $scope.btnGuardarForm = false;
                }
                else {
                    $.unblockUI();
                }
            });
        } catch (e) {
            console.log('*Error*', e);
            $.unblockUI();
        }
    }
    $scope.ListadoTramitesCiudadano = function () {
        sIdCiudadano = sessionService.get('IDSOLICITANTE');
        try {
            var rData = new rcTramitesAe();
            rData.oid = sIdCiudadano;
            rData.listarProducto(function (res) {
                r = JSON.parse(res);
                results = r.success;
                angular.forEach(results, function (val, index) {
                    if (val['form_contenido']) {
                        results[index].datos = JSON.parse(val['form_contenido']);
                    }
                });
                $scope.tramitesUsuario = results;
                var data = results;
                $scope.tablaTramites.reload();
                /*if(tramite){
                    $scope.seleccionarTramite(tramite);
                }*/
            });
        } catch (error) {
            console.log("Error Interno : ", error);
        }
    };
    $scope.tablaTramites = new ngTableParams({
        page: 1,
        count: 4,
        filter: {},
        sorting: {
            vtra_id: 'desc'
        }
    }, {
            total: $scope.tramitesUsuario.length,
            getData: function ($defer, params) {
                var filteredData = params.filter() ?
                    $filter('filter')($scope.tramitesUsuario, params.filter()) :
                    $scope.tramitesUsuario;
                var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    $scope.tramitesUsuario;
                params.total($scope.tramitesUsuario.length);
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    $scope.obtTiendaVirtual = function () {
        cargando();
        idActividadEconomica = sessionService.get('IDAE');
        try {
            var dataTV = new dataTiendaVirtual();
            dataTV.idAe = idActividadEconomica;
            dataTV.obtDataTiendaVirtual(function (res) {
                r = JSON.parse(res);
                results = r.success;
                $rootScope.datosTiendaVirtual = results;
                if (results.length == 0) {
                    $rootScope.nuevo = 'mostrar';
                    $rootScope.update = null;
                    $rootScope.inicializaC1 = true;
                    $rootScope.inicializaC2 = true;
                    $rootScope.inicializaC3 = true;
                    $rootScope.inicializaFacebook = true;
                    $rootScope.inicializaTwitter = true;
                    $rootScope.inicializaInstagram = true;
                    $rootScope.inicializaYoutube = true;
                    $rootScope.inicializaOtro = true;
                    
                } else {
                    sessionService.set('IDTV', results[0].tv_idc);
                    $rootScope.nuevo = null;
                    $rootScope.update = 'mostrar';
                    
                }
            });
            $.LoadingOverlay("hide");
        } catch (error) {
            console.log("Error Interno : ", error);
        }
        $.LoadingOverlay("hide");
    };
    $scope.listarCategorias = function () {
        var categorias = new dataTiendaVirtual();
        categorias.obtCategorias(function (response) {
            $rootScope.resultCategorias = JSON.parse(response);
            $rootScope.resultCategorias = $scope.resultCategorias.success;
        });
    }
    $scope.activaPublicacion = function (id_web, id_ae) {
        var cestado = new dataPaginaWeb();
        cestado.idWeb = id_web;
        cestado.idAe = id_ae;
        cestado.activaEstadoPublicacion(function (response) {
            results = JSON.parse(response);
            results = results.success;
            if (results.length > 0) {
                $.unblockUI();

            } else {
                $.unblockUI();
            }
        });
    }
    $scope.desactivaPublicacion = function (id_web, id_ae) {
        var cestado = new dataPaginaWeb();
        cestado.idWeb = id_web;
        cestado.idAe = id_ae;
        cestado.desactivaEstadoPublicacion(function (response) {
            results = JSON.parse(response);
            results = results.success;
            if (results.length > 0) {
                $.unblockUI();
            } else {
                $.unblockUI();
            }
        });
    }
    $scope.cambioEstado = function (dato) {
        idActividadEconomica = sessionService.get('IDAE');
        if ($rootScope.id_web) {
            alert('tiene pagina web');
            if (dato == true) {
                alert('tiene pagina y esta publicado');
                $scope.desactivaPublicacion($rootScope.id_web, idActividadEconomica);
                $rootScope.ws_publicado = false;
            } else {
                alert('tiene pagina y NO esta publicado');
                $scope.activaPublicacion($rootScope.id_web, idActividadEconomica);
                $rootScope.ws_publicado = true;
            }
        } else {
            alert('NO tiene pagina web, insertar a tabla de pagina web');
        }

    }
    $scope.addDatosAE = function (tramite) {
        if (tramite.Estado == 'VIGENTE') {
            cargando();
            $scope.template = "";
            $scope.template = $scope.templates[0];
            sessionService.set('IDAE', tramite.IdActividad);
            $scope.listarCategorias();
            $scope.obtTiendaVirtual();
            $rootScope.$broadcast('inicializarCampos', $scope.datos);
            $scope.sIdAeGrilla = tramite.IdActividad;
            $.LoadingOverlay("hide");
        } else {
            swal('Sr. Ciudadano', "La Actividad Economica se encuentra con baja", 'warning');
        }

    }
    $scope.addPagosAE = function (tramite) {
        if (tramite.Estado == 'VIGENTE') {
            cargando();
            $scope.template = "";
            sessionService.set('IDAE', tramite.IdActividad);
            $scope.obtTiendaVirtual();
            $scope.seleccionarPagoRender(tramite);
            sessionService.set('IDAE', tramite.IdActividad);
            $scope.sIdAeGrilla = tramite.IdActividad;
            try {
                tvid = $rootScope.datosTiendaVirtual[0].idtv;
                $.LoadingOverlay("hide");
            } catch (error) {
                swal('', "Debe habilitar la tienda virtual, antes de cargar las Formas de Pago.", 'warning');
                sessionService.destroy('IDTV');
                $scope.template = "";
                $.LoadingOverlay("hide");
            }
        } else {
            swal('Sr. Ciudadano', "Actividad Economica se encuentra con baja.", 'warning');
        }
    }
    $scope.addProductoAE = function (tramite) {
        if (tramite.Estado == 'VIGENTE') {
            cargando();
            $scope.template = "";
            sessionService.set('IDAE', tramite.IdActividad);
            $scope.obtTiendaVirtual();
            $rootScope.$broadcast('inicializarProdutos', $scope.datos);
            $scope.sIdAeGrilla = tramite.IdActividad;
            try {
                tvid = $rootScope.datosTiendaVirtual[0].idtv;
                $scope.template = $scope.templates[2];
                $.LoadingOverlay("hide");
            } catch (error) {
                swal('', "Debe habilitar la tienda virtual, antes de cargar sus productos.", 'warning');
                sessionService.destroy('IDTV');
                $scope.template = "";
                $.LoadingOverlay("hide");
            }
        } else {
            swal('Sr. Ciudadano', "Actividad Economica se encuentra con baja.", 'warning');
        }
    }
    $scope.confPublicar = function (tramite) {
        if (tramite.Estado == 'VIGENTE') {
            cargando();
            $scope.template = "";
            sessionService.set('IDAE', tramite.IdActividad);
            idActividadEconomica = sessionService.get('IDAE');
            $rootScope.descripcionAe = tramite.Descripcion;
            $rootScope.direccionAe = tramite.Direccion;
            $scope.obtTiendaVirtual();
            //$scope.obtPagina();
            $rootScope.$broadcast('inicializarPagina', $scope.datos);
            $scope.sIdAeGrilla = tramite.IdActividad;
            try {
                tvid = $rootScope.datosTiendaVirtual[0].idtv;
                $scope.template = $scope.templates[3];
                $.LoadingOverlay("hide");
            } catch (error) {
                swal('Sr. Ciudadano', "Debe habilitar la tienda virtual, antes de habilitar su página Web.", 'warning');
                sessionService.destroy('IDTV');
                $scope.template = "";
                $.LoadingOverlay("hide");
            }
        } else {
            swal('Sr. Ciudadano', "Actividad Economica se encuentra con baja.", 'warning');
        }
    }
    $scope.seleccionarPagoRender = function (tramite) {
        cargando();
        $scope.template = $scope.templates[1];
        $.LoadingOverlay("hide");
    };
    $scope.recuperarDatosRegistro = function () {
        var datosini = {};
        var datosCiudadano = new rcNatural();
        datosCiudadano.oid = sessionService.get('IDSOLICITANTE');

        datosCiudadano.datosCiudadanoNatural(function (resultado) {
            results = JSON.parse(resultado);
            if (results[0].dtspsl_file_fotocopia_ci) {
                $scope.btover = true;
            }

            if (results[0].dtspsl_file_fotocopia_ci_r) {
                $scope.btover1 = true;
            } else {
            }


            if (results[0].dtspsl_tipo_persona == "NATURAL") {
                var cidate = results[0].dtspsl_file_fotocopia_ci;
                datosini['FILE_FOTOCOPIA_CI'] = results[0].dtspsl_file_fotocopia_ci;
                datosini['FILE_FOTOCOPIA_CI_R'] = results[0].dtspsl_file_fotocopia_ci_r;
                datosini['FILE_FACTURA_LUZ'] = results[0].dtspsl_file_factura_luz;
            }
            else if (results[0].dtspsl_tipo_persona == "JURIDICO") {
                datosini['FILE_FOTOCOPIA_CI'] = results[0].dtspsl_file_fotocopia_ci;
                datosini['FILE_FOTOCOPIA_CI_R'] = results[0].dtspsl_file_fotocopia_ci_r;
                $.unblockUI();
            }
        });

        $scope.datosinic = datosini;
        $rootScope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datosinic.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
        $rootScope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datosinic.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
        $rootScope.archivoLuz = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datosinic.FILE_FACTURA_LUZ + "?app_name=todoangular";
        $.unblockUI();
    };

    $scope.iniciandoDatos = function () {
        var datosIniciales = $scope.datosIniciales;
        var fechactual = obtFechaActual.obtenerFechaActual();
        $scope.datos = {};
        var datosForm_inicio = {};
        var sTipoPersona = sessionService.get('TIPO_PERSONA');
        if (sTipoPersona == 'NATURAL') {
            datosForm_inicio['f01_id'] = datosIniciales.f01_form_id;
            datosForm_inicio['CI_BIGDATA'] = datosIniciales.CI_BIGDATA;
            datosForm_inicio['f01_pri_nom_prop'] = datosIniciales.f01_pri_nom_prop;
            datosForm_inicio['f01_ape_pat_prop'] = datosIniciales.f01_ape_pat_prop;
            datosForm_inicio['f01_ape_mat_prop'] = datosIniciales.f01_ape_mat_prop;
            datosForm_inicio['f01_ape_cas_prop'] = datosIniciales.f01_ape_cas_prop;
            datosForm_inicio['f01_fecha_nac'] = datosIniciales.f01_fecha_nac;
            datosForm_inicio['f01_nom_completo'] = datosIniciales.f01_nom_completo;
            datosForm_inicio['f01_tip_doc_prop'] = datosIniciales.f01_tip_doc_prop;
            datosForm_inicio['f01_num_dos_prop'] = datosIniciales.f01_num_dos_prop;
            datosForm_inicio['f01_expedido_prop'] = datosIniciales.f01_expedido_prop;
            datosForm_inicio['f01_email_prop'] = datosIniciales.f01_email_prop;
            datosForm_inicio['f01_cel_prop'] = datosIniciales.f01_cel_prop;
            datosForm_inicio['f01_telef_prop'] = datosIniciales.f01_telef_prop;
            datosForm_inicio['INT_OCUPACION'] = datosIniciales.INT_OCUPACION;
            datosForm_inicio['INT_DIRECCION'] = datosIniciales.INT_DIRECCION;
            //DATOS INICIALES PERSONA NATURAL
            datosForm_inicio['INT_MACRODISTRITO'] = datosIniciales.INT_MACRODISTRITO;
            datosForm_inicio['f01_macro'] = datosIniciales.f01_macro;
            datosForm_inicio['f01_macro_des'] = datosIniciales.f01_macro_des;
            datosForm_inicio['f01_distrito'] = datosIniciales.f01_distrito;
            datosForm_inicio['f01_distrito_desc'] = datosIniciales.f01_distrito_desc;
            datosForm_inicio['f01_zona'] = datosIniciales.f01_zona;
            datosForm_inicio['f01_zon_prop'] = datosIniciales.f01_zon_prop;
            datosForm_inicio['f01_zon_prop_valor'] = datosIniciales.f01_zon_prop_valor;
            datosForm_inicio['f01_zon_prop_desc'] = datosIniciales.f01_zon_prop_desc;
            datosForm_inicio['INT_VIA'] = datosIniciales.INT_VIA;
            datosForm_inicio['f01_tip_via_prop'] = datosIniciales.f01_tip_via_prop;
            datosForm_inicio['f01_nom_via_prop'] = datosIniciales.f01_nom_via_prop;
            datosForm_inicio['f01_num_prop'] = datosIniciales.f01_num_prop;
            datosForm_inicio['INT_EDIF'] = datosIniciales.INT_EDIF;
            datosForm_inicio['f01_nom_edi_prop'] = datosIniciales.f01_nom_edi_prop;
            datosForm_inicio['f01_piso_prop'] = datosIniciales.f01_piso_prop;
            datosForm_inicio['f01_bloq_prop'] = datosIniciales.f01_bloq_prop;
            datosForm_inicio['f01_depa_prop'] = datosIniciales.f01_depa_prop;
            datosForm_inicio['INT_PISO'] = datosIniciales.INT_PISO;
            datosForm_inicio['INT_NUM_DEP'] = datosIniciales.INT_NUM_DEP;
            datosForm_inicio['INT_DIR_DET'] = datosIniciales.INT_DIR_DET;
            datosForm_inicio['f01_dir_det_prop'] = datosIniciales.f01_dir_det_prop;
            datosForm_inicio['f01_id'] = datosIniciales.f01_id;
            datosForm_inicio['CI_BIGDATA'] = datosIniciales.CI_BIGDATA;
            datosForm_inicio['INT_FEC_SOLICITUD'] = fechactual;
            datosForm_inicio['f01_tel_ciudadano'] = datosIniciales.f01_telef_prop;
            datosForm_inicio['INT_FEC_SOLICITUD'] = fechactual;
            datosForm_inicio['f01_tipo_per'] = datosIniciales.f01_tipo_per;
            datosForm_inicio['f01_nac_prop'] = datosIniciales.f01_nac_prop;

        } else {
            if (sTipoPersona == 'JURIDICO') {

                datosForm_inicio['f01_id'] = datosIniciales.f01_id;
                datosForm_inicio['CI_BIGDATA'] = datosIniciales.CI_BIGDATA;
                datosForm_inicio['f01_tip_doc_prop'] = datosIniciales.f01_tip_doc_prop;
                datosForm_inicio['f01_num_doc_per_jur'] = datosIniciales.f01_num_doc_per_jur;
                datosForm_inicio['f01_raz_soc_per_jur'] = datosIniciales.f01_raz_soc_per_jur;
                datosForm_inicio['f01_raz_soc'] = datosIniciales.f01_raz_soc;
                datosForm_inicio['f01_tip_doc_rep'] = datosIniciales.f01_tip_doc_rep;
                datosForm_inicio['f01_ges_vig_pod'] = datosIniciales.f01_ges_vig_pod;
                datosForm_inicio['f01_num_doc_rep'] = datosIniciales.f01_num_doc_rep;
                datosForm_inicio['f01_num_pod_leg'] = datosIniciales.f01_num_pod_leg;
                datosForm_inicio['f01_expedido_rep'] = datosIniciales.f01_expedido_rep;
                datosForm_inicio['f01_pri_nom_rep'] = datosIniciales.f01_pri_nom_rep;
                datosForm_inicio['f01_seg_nom_rep'] = datosIniciales.f01_seg_nom_rep;
                datosForm_inicio['f01_ter_nom_rep'] = datosIniciales.f01_ter_nom_rep;
                datosForm_inicio['f01_ape_pat_rep'] = datosIniciales.f01_ape_pat_rep;
                datosForm_inicio['f01_ape_mat_rep'] = datosIniciales.f01_ape_mat_rep;
                datosForm_inicio['f01_ape_cas_rep'] = datosIniciales.f01_ape_cas_rep;
                datosForm_inicio['f01_email_rep'] = datosIniciales.f01_email_rep;
                datosForm_inicio['f01_cel_rep'] = datosIniciales.f01_cel_rep;
                datosForm_inicio['f01_telef_rep'] = datosIniciales.f01_telef_rep;
                datosForm_inicio['INT_FEC_SOLICITUD'] = datosIniciales.INT_FEC_SOLICITUD;
                datosForm_inicio['f01_fecha_nac'] = datosIniciales.f01_fecha_nac
                //DATOS INICIALES PERSONA JURIDICA
                datosForm_inicio['f01_rl_nit'] = datosIniciales.f01_rl_nit;
                datosForm_inicio['f01_rl_razon_zocial'] = datosIniciales.f01_rl_razon_zocial;
                datosForm_inicio['f01_tipo_per'] = datosIniciales.f01_tipo_per;
                datosForm_inicio['f01_macro'] = datosIniciales.f01_macro;
                datosForm_inicio['f01_macro_des'] = datosIniciales.f01_macro_des;
                datosForm_inicio['f01_distrito'] = datosIniciales.f01_distrito;
                datosForm_inicio['f01_distrito_desc'] = datosIniciales.f01_distrito_desc;
                datosForm_inicio['f01_zona'] = datosIniciales.f01_zona;
                datosForm_inicio['f01_zona_desc'] = datosIniciales.f01_zona_desc;
                //DATOS DE DIRECCION DEL REPRESENTANTE
                datosForm_inicio['f01_macro_rep'] = datosIniciales.f01_macro_rep;
                datosForm_inicio['f01_macro_desc_rep'] = datosIniciales.f01_macro_desc_rep;
                datosForm_inicio['f01_dist_rep'] = datosIniciales.f01_dist_rep;
                datosForm_inicio['f01_zona_rep'] = datosIniciales.f01_zona_rep;
                datosForm_inicio['f01_id_zona_rep'] = datosIniciales.f01_id_zona_rep;
                datosForm_inicio['f01_zon_rep_valor'] = datosIniciales.f01_zon_rep_valor;
                datosForm_inicio['f01_nom_via_rep'] = datosIniciales.f01_nom_via_rep;
                datosForm_inicio['f01_num_rep'] = datosIniciales.f01_num_rep;
                datosForm_inicio['f01_tipo_viarep'] = datosIniciales.f01_tipo_viarep;
                datosForm_inicio['INT_VIA'] = datosIniciales.INT_VIA;
                datosForm_inicio['f01_tipo_via'] = datosIniciales.f01_tipo_via;
                datosForm_inicio['f01_nombre_via'] = datosIniciales.f01_nombre_via;
                datosForm_inicio['f01_numero_casa'] = datosIniciales.f01_numero_casa;
                //DATOS INCIALES PERSONA JURIDICA
                datosForm_inicio['INT_RL_FEC_EMISION_DOCUMENTO'] = datosIniciales.INT_RL_FEC_EMISION_DOCUMENTO;
                datosForm_inicio['INT_NACIONALIDAD'] = datosIniciales.INT_NACIONALIDAD;
                datosForm_inicio['INT_RL_FEC_NACIMIENTO'] = datosIniciales.INT_RL_FEC_NACIMIENTO;
                datosForm_inicio['INT_NIT'] = datosIniciales.INT_NIT;
                datosForm_inicio['INT_RL_TIPO_DOCUMENTO'] = datosIniciales.INT_RL_TIPO_DOCUMENTO;
                datosForm_inicio['f01_rl_num_documento'] = datosIniciales.f01_rl_num_documento;
                datosForm_inicio['INT_RL_FECHA_NAC'] = datosIniciales.INT_RL_FECHA_NAC;
                datosForm_inicio['IDTRAMITE'] = datosIniciales.IDTRAMITE;
                datosForm_inicio['f01_num_doc_rep'] = datosIniciales.f01_num_doc_rep;
                datosForm_inicio['f01_num_notaria'] = datosIniciales.f01_num_notaria;
                datosForm_inicio['f01_num_not'] = datosIniciales.f01_num_not;

                datosForm_inicio['TIPO'] = "AE_INT_EMISION";
                datosForm_inicio['INT_NIT'] = datosIniciales.INT_NIT;
                datosForm_inicio['f01_poder_representante'] = datosIniciales.f01_poder_representante;
                datosForm_inicio['f01_test_cons_sociedad_j'] = datosIniciales.f01_test_cons_sociedad_j;
                datosForm_inicio['file_num_ident'] = datosIniciales.file_num_ident;
                datosForm_inicio['file_reg_comer'] = datosIniciales.file_reg_comer;
                datosForm_inicio['file_fund_emp'] = datosIniciales.file_fund_emp;

                $scope.btover_c = true;
                datosForm_inicio['id_representante'] = datosIniciales.id_representante;
                datosForm_inicio['FILE_FOTOCOPIA_CI'] = datosIniciales.FILE_FOTOCOPIA_CI_RA;
                datosForm_inicio['FILE_FOTOCOPIA_CI_R'] = datosIniciales.FILE_FOTOCOPIA_CI_RR;
                datosForm_inicio['f01_poder_representante'] = datosIniciales.f01_poder_representante;
                datosForm_inicio['f01_test_cons_sociedad_j'] = datosIniciales.f01_test_cons_sociedad_j;
                datosForm_inicio['file_num_ident'] = datosIniciales.file_num_ident;
                datosForm_inicio['file_reg_comer'] = datosIniciales.file_reg_comer;
                datosForm_inicio['file_fund_emp'] = datosIniciales.file_fund_emp;
                datosForm_inicio['INT_AC_TIP_VIA'] = datosIniciales.INT_AC_TIP_VIA;

            }
        }
        datosForm_inicio['IDTRAMITE'] = $scope.sIdTramiteSeleccionado;
        $scope.datos = datosForm_inicio;
    };
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
                }
            } else {
                $scope.txtMsgConexionGen = "Se ha producido un problema de conexion al cargar los datos";
                $.unblockUI();
                //swal(resultadoApi.error.message);
            }
        });
    };
    $scope.listadoActividadesEconomicas = function () {
        var tipoPersona = sessionService.get('TIPO_PERSONA');
        var dataGenesis = ((typeof ($scope.dataGenesisCidadano) == 'undefined' || $scope.dataGenesisCidadano == null) ? {} : $scope.dataGenesisCidadano);
        var sNumeroRegistros = dataGenesis.length;
        var tipoP = "";
        if (tipoPersona == 'NATURAL') {
            tipoP = 'N';
        } else {
            tipoP = 'J';
        }
        var idContribuyente = $scope.dataGenesisCidadano[0].idContribuyente;
        var contribuyente = new lstActividadEconomicaVentas();
        contribuyente.idContribuyente = idContribuyente;
        contribuyente.tipo = tipoP;
        contribuyente.lstActividadEconomicaVentas(function (resultado) {
            $.unblockUI();
            var resultadoApi = JSON.parse(resultado);
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
                swal('', "Actividades Económicas de : " + sessionService.get('US_NOMBRE'), 'warning');
            } else {

                //$scope.botones = "mostrar";
                //$scope.desabilitado = false;
            }
        });

    };
    $scope.templateProducto = function () {
        var tipoPersona = sessionService.get('TIPO_PERSONA');
        var vsidservicio = 0;
        $scope.template = $scope.templates[vsidservicio];
    }
    $scope.selActividadEconomica = function (tramite) {
        $scope.templateProducto();
        $scope.idActividiadEconomicaActual = tramite.IdActividad;
        $scope.datos.f01_id_actividad_economica = tramite.IdActividad;
        $scope.sIdAeGrilla = tramite.IdActividad;
        var tipoPersona = sessionService.get('TIPO_PERSONA');
        var datosGenerales = new getDatosAEViae();
        datosGenerales.idActividadEconomica = tramite.IdActividad;
        datosGenerales.getDatosAE_Viae(function (resultado) {
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
                    }
                    else {
                        $scope.nroOrdenActividiadEconomicaActual = response[0].numeroOrden;
                        $scope.datos.f01_nro_orden = response[0].numeroOrden;
                    }
                    $scope.idContribuyenteAEActual = response[0].idContribuyente;
                    $scope.datos.f01_id_contribuyente = response[0].idContribuyente;

                    var hinicio = ((typeof (response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? "" : response[0].horarioAtencion.toUpperCase());
                    var hfinal = ((typeof (response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? "" : response[0].horarioAtencion.toUpperCase());
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
                    } catch (e) { }
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
                    $scope.desabilitado = false;
                    $scope.botones = "mostrar";

                }
            } else {
                swal('', "Datos no Encontrados !!!", 'warning');
            }
        });
    };
    $scope.getDatosLotus = function (idadcteco, hojar) {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        try {
            var datosLotus = new getDatosAELotus();
            datosLotus.caso = hojar;
            datosLotus.idActividad = idadcteco;
            datosLotus.getDatosAE_Lotus(function (respuesta) {
                $scope.resultadoLotus = JSON.parse(respuesta);
                $scope.resultadoCP = $scope.resultadoLotus.success.data[0].datos;
                $scope.datos.INT_AC_latitud = $scope.resultadoCP.INT_AC_latitud;
                $scope.datos.INT_AC_longitud = $scope.resultadoCP.INT_AC_longitud;
                $scope.datos.f01_casilla = $scope.resultadoCP.f01_casilla;
                $scope.datos.f01_num_act = $scope.resultadoCP.f01_num_act;
                $scope.datosAntMulti = $scope.resultadoLotus.success.data[0].datos.licencia_multiple;
                $q.all($scope.resultadoLotus).then(function (data) {
                    deferred.resolve($scope.resultadoLotus);
                })
            });
        } catch (e) {
            $scope.exito = "NO";
            $q.all($scope.resultadoLotus).then(function (data) {
                deferred.resolve($scope.resultadoLotus);
            });
        }
        return deferred.promise;
    }
    $scope.LicenciaXCategoriaA = function (idDesarrollada) {
        try {
            var tipo = new categoriaagrupadalicenciades();
            tipo.dependencia = idDesarrollada;
            tipo.categoriaagrupadalicencia_des(function (res) {
                $scope.datosActividadLicencia = "";
                x = JSON.parse(res);
                response = x.success.data;
                if (response.length > 0) {
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
    }
    $scope.tblTramites = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            IdActividad: 'desc'
        }
    }, {
            total: $scope.trmUsuario.length,
            getData: function ($defer, params) {
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
    $scope.recuperandoDatosGenesis = function () {
        var tipoContribuyente = sessionService.get('TIPO_PERSONA');
        var ciDocumento = '';
        var nitDocumento = '';
        var sAccion = '';

        if (tipoContribuyente == 'NATURAL') {
            ciDocumento = sessionService.get('CICIUDADANO');
            sAccion = 'C01';
        } else if (tipoContribuyente == 'JURIDICO') {
            nitDocumento = sessionService.get('NITCIUDADANO');
            sAccion = 'C02';
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
        try {
            conGenesis.lstDatosContribuyente(function (resultado) {
                resultadoApi = JSON.parse(resultado);
                if (resultadoApi.success) {
                    var response = resultadoApi;
                    $scope.txtMsgConexionGen = "";
                    if (response.success.dataSql.length > 0) {
                        $scope.dataGenesisCidadano = response.success.dataSql;
                    } else {
                        $scope.dataGenesisCidadano = '';
                    }
                } else {
                    $scope.txtMsgConexionGen = "Se ha producido un problema de conexion al cargar los datos";
                    $.unblockUI();
                    //swal(resultadoApi.error.message);
                }
            });
        } catch (e) {
            $scope.txtMsgConexionGen = "Se ha producido un problema de conexion al cargar los datos";
        };
    };
    $scope.guardarDatos = function (obj) {
        var fechactual = obtFechaActual.obtenerFechaActual();
        obj.INT_FORM_ALMACENADO = 'G';
        obj.f01_tipo_per = sessionService.get('TIPO_PERSONA');
        try {
            var datosSerializados = JSON.stringify(obj);
            var idCiudadano = sessionService.get('IDSOLICITANTE');
            var idTramite = sessionService.get('IDTRAMITE');
            var idServicio = sessionService.get('IDSERVICIO');
            var Parametros = new datosFormularios();
            Parametros.frm_tra_dvser_id = idServicio;
            Parametros.data_json = datosSerializados;
            Parametros.frm_tra_id_ciudadano = idCiudadano;
            Parametros.frm_tra_id_usuario = 1;
            Parametros.frm_idTramite = idTramite;
            $rootScope.btnGuardarForm = true;
            Parametros.sp_crear_datos_formulario(function (results) {
                results = JSON.parse(results);
                results = results.success;
                if (results.length > 0) {
                    $.unblockUI();
                    $scope.btnEnviarForm = false;
                    $scope.btnGuardarForm = false;

                    swal('', "Formulario almacenado", 'success');
                } else {
                    $.unblockUI();
                    swal('', "Formulario no almacenado", 'error');
                }
            });
        } catch (e) {
            $scope.btnGuardarForm = false;
            $.unblockUI();
        }
    };

    $scope.$on('api:ready', function () {
        $scope.obtenerContribuyente();
    });
    $scope.inicioServiciosP = function () {
        $scope.obtenerContribuyente();
    };
});