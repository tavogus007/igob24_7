app.controller('serviciosAtmController', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, obtFechaActual, wsRgistrarPubliciadad) {
    $scope.imageCST = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.imageLNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    var fecha = new Date();
    var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.txtMsgConexionGen = '';
    $scope.txtCiudadanoExiste = '';
    $rootScope.looo = '';
    $rootScope.laaa = '';
    $scope.tablaTramites = {};
    $scope.tramitesUsuario = [];
    $scope.servicio = 1;
    $scope.divServicio = null;
    $scope.formRegularRegistrado = "";
    $scope.datosinic = {};
    $scope.btover_c = false;

    $scope.mostrarCategoria = false;
    $scope.datosfalt = "";
    $scope.documentosarc = ['', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    var stiporol = sessionService.get('US_IDROL');
    $scope.templates = [
        { name: 'template0.html', url: '../../../app/view/servicios/atm/atm_inmuebles.html' }, //formulario ATM inmuebles natural
        { name: 'template1.html', url: '../../../app/view/servicios/atm/atm_vehiculos/atm_vehiculos.html' }, //formulario ATM  vehiculos natural
        { name: 'template1.html', url: '../../../app/view/servicios/atm/atm_vehiculos/atm_vehiculos.html' }, //formulario ATM  vehiculos natural
        { name: 'template1.html', url: '../../../app/view/servicios/atm/atm_vehiculos/vehiculos_juridico.html' }, //formulario ATM  vehiculos natural
        { name: 'template2.html', url: '../../../app/view/servicios/atm/atm_inmuebles/atm_inmueblesJuridicoLibros.html' }, //formulario ATM inmuebles natural
        { name: 'template3.html', url: '../../../app/view/servicios/atm/atm_vehiculos/atm_motos_juridico.html' }, //formulario ATM motos natural
        { name: 'template4.html', url: '../../../app/view/servicios/atm/atm_vehiculos/atm_vehiculosJuridicoLibros.html' } //formulario ATM motos natural


    ];
    $scope.serivicosInternetInmuebles = [
        { name: 'REGISTRO VALOR LIBROS INMUEBLES ', id: '20' },
    ];

    $scope.serivicosInternetVehiculos = [
        { name: 'INSCRIPCION CASA COMERCIAL VEHICULOS ', id: '19' },
        { name: 'INSCRIPCION CASA COMERCIAL MOTOS', id: '18' },
        { name: 'BASE IMPONIBLE VEHICULOS', id: '17' },
    ];
    $scope.btnEnviarForm = true;
    $scope.datosGuardados = false;
    $scope.habGuardar1 = true;
    $scope.ErrorCapchasXX = "";
    $scope.SuccesCapchasxx = "";

    $scope.template = "";
    var aDocAdjuntos = new Array();



    $scope.tramitesCiudadano = function (tramite) {
        sIdCiudadano = sessionService.get('IDSOLICITANTE');
        try {
            var rData = new rcTramitesAtm();
            rData.sidciudadano = sIdCiudadano;
            rData.obtTramitesAtm(function (res) {
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
                if (tramite) {
                    $scope.seleccionarTramiteAtm(tramite);
                }
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

    /*SELECCCIONAR TRAMITE CIUDADANO*/
    $scope.seleccionarTramiteAtm = function (tramite) {
        $scope.tipoTramite = tramite.vservicio;  //no tocar
        if (tramite.vservicio == 'INMUEBLES') {
            //alert('inmuebles');
        }
        $scope.template = "";
        setTimeout(function () {
            // $.blockUI(); 
        }, 500);
        

        $scope.seleccionarTramiteRenderAtm(tramite);

    }

    $scope.seleccionarTramiteRenderAtm = function (tramite) {
        //console.log('tramite',tramite);
        //$scope.getCaptchasXX();
        $scope.tramiteSeleccionado   =   tramite.vtra_id;
        $scope.procesoSeleccionado = tramite.vdvser_id;
        $rootScope.tramiteId = tramite.vtra_id;
        sessionService.set('IDTRAMITE', $rootScope.tramiteId);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);

        $scope.template = "";
        $scope.formulario = "mostrar";
        //TIPO_PERSONA
        var tipoPersona = sessionService.get('TIPO_PERSONA');
        var sidservicio = $scope.procesoSeleccionado;
        if (tipoPersona == 'NATURAL' && sidservicio == 20) {
            sidservicio = 0;
        }
        if (tipoPersona == 'NATURAL' && sidservicio == 19) {
            sidservicio = 1;
        }


        if (tipoPersona == 'JURIDICO' && sidservicio == 20) {
            sidservicio = 4;
        }
        if (tipoPersona == 'JURIDICO' && sidservicio == 19) {
            sidservicio = 3;
        }
        if (tipoPersona == 'JURIDICO' && sidservicio == 18) {
            sidservicio = 5;
            //alert('MOTOS');
        }
        if (tipoPersona == 'JURIDICO' && sidservicio == 17) {
            sidservicio = 6;
            //alert('LIBROS VEHICULOS');
        }

        if (tramite.venviado == "SI") {
            $scope.template = $scope.templates[sidservicio];
            $rootScope.t_enviado = false;

        } else {
            $scope.template = $scope.templates[sidservicio];
            $rootScope.t_enviado = true;
        }

        if (tipoPersona == 'NATURAL') {
            $scope.recuperarSerializarInfo(tramite);
        }
        else {
            $scope.recuperarSerializarInfo(tramite);
        }

        var cboTipoCon = document.getElementById("tipo_contribuyente");
        if (cboTipoCon) {
            cboTipoCon.style.display = 'none';
        }

    };

    /*RECUPERAR DATOS - INICIAR FORMULARIO*/
    $scope.recuperarSerializarInfo = function (tramite) {
        $scope.btover_c = true;
        $scope.recuperarDatosRegistro();
        var sIdTramite = tramite.vtra_id;
        $scope.sIdTramiteSeleccionado = tramite.vtra_id;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
        var sIdServicio = sessionService.get('IDSERVICIO');
        var parametros = {
            "container": "RC_CLI",
            "folder_path": sIdTramite
        };
        try {
            var rData = new datosFormularios();
            rData.frm_tra_id_ciudadano = sIdCiudadano;
            rData.frm_tra_dvser_id = sIdServicio;
            rData.frm_idTramite = sIdTramite;
            rData.splistafrmdatos(function (res) {
                r = JSON.parse(res);
                results = r.success;
                var formalmacenado = "";
                if (results) {
                    datoform = JSON.parse(results[0].form_contenido);
                    formalmacenado = ((typeof (datoform.INT_FORM_ALMACENADO) == 'undefined' || datoform.INT_FORM_ALMACENADO == null) ? '' : datoform.INT_FORM_ALMACENADO);
                    if (formalmacenado == 'G') {
                        $rootScope.campoidform = results[0].form_id;
                        datos = JSON.parse(results[0].form_contenido);
                        $scope.datos = datos;
                        if ($scope.datos.f01_tipo_per == 'NATURAL' || $scope.datos.f01_tipo_per == 'N') {
                            $scope.datos.FILE_FOTOCOPIA_CI = $scope.datosinic.FILE_FOTOCOPIA_CI;
                            $scope.datos.FILE_FOTOCOPIA_CI_R = $scope.datosinic.FILE_FOTOCOPIA_CI_R;
                            $scope.datos.FILE_FACTURA_LUZ = $scope.datosinic.FILE_FACTURA_LUZ;
                        } else {
                            if ($scope.datos.f01_tipo_per == 'JURIDICO' || $scope.datos.f01_tipo_per == 'J') {
                                $scope.datos.FILE_FOTOCOPIA_CI = $scope.datosIniciales.FILE_FOTOCOPIA_CI_RA;
                                $scope.datos.FILE_FOTOCOPIA_CI_R = $scope.datosIniciales.FILE_FOTOCOPIA_CI_RR;
                            }
                        }
                        if ($scope.datos.g_origen == 'POS/EMPR2017') {
                            if ($scope.datos.swpublicidad == 'CP' && $scope.datos.sw_publicidad == 'CP') {
                            }
                        }
                        $scope.datos.IDTRAMITE = sIdTramite;
                        ///$scope.datos.doc_Adjuntos = datoFinalA;

                        $scope.nroRegistros = datos.length;
                    } else
                        if (formalmacenado == 'C') {
                            $scope.datos.IDTRAMITE = sIdTramite;
                            $rootScope.campoidform = results[0].form_id;

                            $scope.formRegularRegistrado = JSON.parse(results[0].form_contenido);
                            $scope.datos.INT_FORM_ALMACENADO = 'C';
                            $scope.iniciandoDatos();
                        }
                        else {
                            $scope.nroRegistros = 0;
                            $scope.datos = "";
                            $scope.adjuntosArray = "";
                            $scope.iniciandoDatos();
                            sessionService.set('IDTRAMITE', sIdTramite);
                        }
                    //VALIDAR BOTONES ENVIO
                    setTimeout(function () {
                        //$rootScope.$broadcast('validarBtnInternet', tramite.venviado);
                        $rootScope.$broadcast('validarBtnEnviar', results.length);
                        $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                        $rootScope.$broadcast('inicializarHtmlForm', tramite);
                    }, 4000)
                    $.unblockUI();

                }

            });
        } catch (error) {
            console.log("Error Interno : ", error);
        }
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
            datosForm_inicio['FA_NOMB'] = datosIniciales.f01_pri_nom_prop;
            datosForm_inicio['FA_AP_PAT'] = datosIniciales.f01_ape_pat_prop;
            datosForm_inicio['FA_AP_MAT'] = datosIniciales.f01_ape_mat_prop;
            datosForm_inicio['FA_AP_CAS'] = datosIniciales.f01_ape_cas_prop;
            datosForm_inicio['f01_fecha_nac'] = datosIniciales.f01_fecha_nac;
            datosForm_inicio['FA_TIPO_DOC'] = datosIniciales.f01_tip_doc_prop;
            datosForm_inicio['FA_TIPO_GEN'] = datosIniciales.f01_genero;
            datosForm_inicio['f01_num_dos_prop'] = datosIniciales.f01_num_dos_prop;
            datosForm_inicio['f01_expedido_prop'] = datosIniciales.f01_expedido_prop;
            datosForm_inicio['FA_CORR'] = datosIniciales.f01_email_prop;
            datosForm_inicio['FA_CEL'] = datosIniciales.f01_cel_prop;
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
            datosForm_inicio['FILE_FOTOCOPIA_CI'] = $scope.datosinic.FILE_FOTOCOPIA_CI;
            datosForm_inicio['FILE_FOTOCOPIA_CI_R'] = $scope.datosinic.FILE_FOTOCOPIA_CI_R;
            datosForm_inicio['FILE_FACTURA_LUZ'] = $scope.datosinic.FILE_FACTURA_LUZ;
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
        $rootScope.looo = 0;
        $rootScope.laaa = 0;
        $scope.datos = datosForm_inicio;
    };


    $scope.seleccionarProceso = function (proceso) {
        $scope.procesoSeleccionado = proceso.id;
        if ($scope.procesoSeleccionado == 20) {
            sidservicio = 20;
        }
        if ($scope.procesoSeleccionado == 19) {
            sidservicio = 19;
        }
        if ($scope.procesoSeleccionado == 18) {
            sidservicio = 18;
        }
        if ($scope.procesoSeleccionado == 17) {
            sidservicio = 17;
        }
        $scope.procesoSeleccionado = proceso.id;
        $scope.btnNuevoTramtite = false;
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = "";

    };
    $scope.crearTramiteAE = function () {
        if ($scope.procesoSeleccionado != '') {
            if ($scope.procesoSeleccionado == 20) {
                sidservicio = 20;
            }
            if ($scope.procesoSeleccionado == 19) {
                sidservicio = 19;
            }
            if ($scope.procesoSeleccionado == 18) {
                sidservicio = 18;
            }
            if ($scope.procesoSeleccionado == 17) {
                sidservicio = 17;
            }
            //href="#registro_ciudadano|servicios|indexAtm.html"
            $scope.adicionarServicioGamlp(sidservicio);
        }
    };

    $scope.adicionarServicioGamlp = function (datos) {
        var tipoPersona = sessionService.get('TIPO_PERSONA');
        var condiciones = '';
        if (tipoPersona == "NATURAL") {
            tipoPersona = "N";
            condiciones = $scope.datosRecuperados.dtspsl_file_condiciones_uso;
        }
        if (tipoPersona == "JURIDICO") {
            tipoPersona = "J";
            condiciones = $scope.datosRecuperados.dtspsl_file_condiciones_uso_j;
        }
        if (condiciones == 'undefined' || condiciones == null || condiciones == '') {
            swal('', 'Estimado Ciudadano, para poder proseguir con el trámite deberá aceptar las condiciones de uso en el IGOB 24/7', 'warning');
        } else {
            if ($scope.datosRecuperados.dtspsl_activaciond == 'SI' && $scope.datosRecuperados.dtspsl_activacionf == 'SI') {
                if (datos == 20) {
                    var dataInicio = {};
                    var fecha = new Date();
                    var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                    var sIdServicio = 20;
                    var sIdCiudadano = sessionService.get('IDSOLICITANTE');
                    var sFechaTramite = fechactual;
                    dataInicio.INT_FORM_ALMACENADO = 'C';
                    var datosSerializados = JSON.stringify(dataInicio);
                    // $.blockUI();
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
                        // $.blockUI();
                        crea.adiciona_Tramites_Formulario(function (res) {
                            x = JSON.parse(res);
                            response = x.success;
                            if (response.length > 0) {
                                sessionService.set('IDTRAMITE', response[0].sp_insertar_formulario_tramites);
                                $.unblockUI();
                                $scope.tramitesCiudadano();
                                swal('', 'Registro almacenado correctamente', 'success');
                                sessionService.destroy('NROTRAMITE');
                                sessionService.destroy('NROTRAMITEID');
                                sessionService.destroy('IDPROCESO');
                                $scope.btnEnviarForm = false;
                                $scope.btnGuardarForm = false;
                                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                                //$('#registro').modal('hide');
                            }
                            else {
                                // $.unblockUI();
                            }
                        });
                    } catch (e) {
                        console.log('*Error*', e);
                        //$.unblockUI();
                    }
                }
                if (datos == 19) {
                    var dataInicio = {};
                    var fecha = new Date();
                    var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                    var sIdServicio = 19;
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
                                $scope.tramitesCiudadano();
                                swal('', 'Registro almacenado correctamente', 'success');
                                sessionService.destroy('NROTRAMITE');
                                sessionService.destroy('NROTRAMITEID');
                                sessionService.destroy('IDPROCESO');
                                $scope.btnEnviarForm = false;
                                $scope.btnGuardarForm = false;
                                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                                $('#registro').modal('hide');
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
                if (datos == 18) {
                    //alert('ingresando a Motos....');
                    var dataInicio = {};
                    var fecha = new Date();
                    var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                    var sIdServicio = 18;
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
                                $scope.tramitesCiudadano();
                                swal('', 'Registro almacenado correctamente', 'success');
                                sessionService.destroy('NROTRAMITE');
                                sessionService.destroy('NROTRAMITEID');
                                sessionService.destroy('IDPROCESO');
                                $scope.btnEnviarForm = false;
                                $scope.btnGuardarForm = false;
                                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                                $('#registro').modal('hide');
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
                if (datos == 17) {
                    //alert('ingresando a Motos....');
                    var dataInicio = {};
                    var fecha = new Date();
                    var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                    var sIdServicio = 17;
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
                                $scope.tramitesCiudadano();
                                swal('', 'Registro almacenado correctamente', 'success');
                                sessionService.destroy('NROTRAMITE');
                                sessionService.destroy('NROTRAMITEID');
                                sessionService.destroy('IDPROCESO');
                                $scope.btnEnviarForm = false;
                                $scope.btnGuardarForm = false;
                                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                                $('#registro').modal('hide');
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
            } else {
                swal('', "Debe realizar las activaciones fisica y digital para poder realizar el trámite", 'warning');
            };
        }
    }

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

    $scope.validacionDatosNatural = function (datos) {
        var datosfaltantes = '';
        datosfaltantes = new Array();
        if (datos.dtspsl_fec_nacimiento == '') {
            datosfaltantes.push(' FECHA DE NACIMIENTO');
        }
        if (datos.dtspsl_expedido == '' || datos.dtspsl_expedido == ' ') {
            datosfaltantes.push(' EXPEDIDO');
        }
        if (datos.dtspsl_nombres == '' || datos.dtspsl_nombres == ' ') {
            datosfaltantes.push(' NOMBRES');
        }
        if (datos.dtspsl_materno == '' || datos.dtspsl_materno == ' ') {
            datosfaltantes.push(' APELLIDO MATERNO');
        }
        if (datos.dtspsl_movil == '' || datos.dtspsl_movil == ' ') {
            datosfaltantes.push(' CELULAR');
        }
        if ((datos.dtspsl_correo == '') || (datos.dtspsl_correo == ' ')) {
            datosfaltantes.push(' CORREO');
        }
        if (datos.dtspsl_fec_nacimiento == '' || datos.dtspsl_fec_nacimiento == ' ') {
            datosfaltantes.push('FECHA DE NACIMIENTO');
        }
        if (datos.dtspsl_pais == '' || datos.dtspsl_pais == ' ') {
            datosfaltantes.push(' PAIS');
        }
        if (datos.dtspsl_departamento == '' || datos.dtspsl_departamento == ' ') {
            datosfaltantes.push(' DEPARTAMENTO');
        }
        if (datos.dtspsl_provincia == '' || datos.dtspsl_provincia == ' ') {
            datosfaltantes.push(' PROVINCIA');
        }
        if ((datos.dtspsl_macrodistrito == '' || datos.dtspsl_macrodistrito_desc == '')) {
            datosfaltantes.push(' MACRODISTRITO');
        }
        if ((datos.dtspsl_distrito == '' || datos.dtspsl_distrito_desc == '')) {
            datosfaltantes.push(' DISTRITO');
        }
        if ((datos.dtspsl_zona_desc == '' || datos.dtspsl_zona == '')) {
            datosfaltantes.push(' ZONA');
        }
        if (datos.dtspsl_nombre_via == '' || datos.dtspsl_nombre_via == '0') {
            datosfaltantes.push(' NOMBRE DE VIA');
        }
        if (datos.dtspsl_numero_casa == '' || datos.dtspsl_nombre_via == '0') {
            datosfaltantes.push(' NUMERO DE DOMICILIO');
        }
        if (datos.dtspsl_file_fotocopia_ci == '' || datos.dtspsl_file_fotocopia_ci == ' ') {
            datosfaltantes.push(' DOCUMENTO DE IDENTIDAD ANVERSO');
        }
        if (datos.dtspsl_file_fotocopia_ci_r == '' || datos.dtspsl_file_fotocopia_ci_r == ' ') {
            datosfaltantes.push(' DOCUMENTO DE IDENTIDAD REVERSO');
        }
        $scope.datosfalt = datosfaltantes;
    }

    $scope.validacionDatosJuridico = function (datos) {
        var datosfaltantes = '';
        datosfaltantes = new Array();
        if (datos.dtspsl_ci_representante == '' || datos.dtspsl_ci_representante == ' ') {
            datosfaltantes.push('CI DEL REPRESENTANTE LEGAL');
        }
        if (datos.dtspsl_razon_social == '' || datos.dtspsl_razon_social == ' ') {
            datosfaltantes.push(' RAZON SOCIAL');
        }
        if (datos.dtspsl_movil == '') {
            datosfaltantes.push(' CELULAR');
        }
        if ((datos.dtspsl_correo == '') || (datos.dtspsl_correo == ' ')) {
            datosfaltantes.push(' CORREO');
        }
        if (datos.dtspsl_pais == '') {
            datosfaltantes.push(' PAIS');
        }
        if (datos.dtspsl_departamento == '') {
            datosfaltantes.push(' DEPARTAMENTO');
        }
        if (datos.dtspsl_provincia == '') {
            datosfaltantes.push(' PROVINCIA');
        }
        if ((datos.dtspsl_macrodistrito == '' || datos.dtspsl_macrodistrito_desc == '')) {
            datosfaltantes.push(' MACRODISTRITO');
        }
        if ((datos.dtspsl_distrito == '' || datos.dtspsl_distrito_desc == '')) {
            datosfaltantes.push(' DISTRITO');
        }
        if ((datos.dtspsl_zona_desc == '' || datos.dtspsl_zona == '')) {
            datosfaltantes.push(' ZONA');
        }
        if (datos.dtspsl_nombre_via == '' || datos.dtspsl_nombre_via == '0') {
            datosfaltantes.push(' NOMBRE DE VIA');
        }
        if (datos.dtspsl_numero_casa == '' || datos.dtspsl_nombre_via == '0') {
            datosfaltantes.push(' NUMERO DE DOMICILIO');
        }
        if (datos.dtspsl_file_poder_legal == '' || datos.dtspsl_file_poder_legal == ' ') {
            datosfaltantes.push(' DOCUMENTO DE PODER DEL REPRESENTANTE LEGAL');
        }
        if (datos.dtspsl_file_num_ident == '' || datos.dtspsl_file_num_ident == ' ') {
            datosfaltantes.push(' DOCUMENTO TESTIMONIO DE CONSTITUCION');
        }
        if (datos.dtspsl_file_num_ident == '' || datos.dtspsl_file_num_ident == ' ') {
            datosfaltantes.push(' DOCUMENTO NUMERO DE IDENTIFICACION TRIBUTARIA (NIT)');
        }
        if (datos.dtspsl_file_fund_emp == '' || datos.dtspsl_file_fund_emp == ' ') {
            datosfaltantes.push(' DOCUMENTO FUNDEMPRESA');
        }
        if (datos.dtspsl_file_reg_comer == '' || datos.dtspsl_file_reg_comer == ' ') {
            datosfaltantes.push(' DOCUMENTO REGISTRO COMERCIAL');
        }

        $scope.datosfalt = datosfaltantes;
    }
    $scope.recuperandoDatosInicialesCiudadano = function () {
        $rootScope.datosIniciales = "";

        var idCiudadano = sessionService.get('IDUSUARIO');
        $scope.habGuardar1 = true;
        $scope.datosIniciales = "";
        var datosForm = {};
        var sTipoPersona = "";
        var recuperarDatos = new rcNatural();
        recuperarDatos.oid = idCiudadano;
        recuperarDatos.datosCiudadanoNatural(function (resultado) {
            resultadoApi = JSON.parse(resultado);
            datos = resultadoApi[0];
            $scope.datosRecuperados = datos;
            sTipoPersona = resultadoApi[0].dtspsl_tipo_persona;
            $scope.sTipoPersona = resultadoApi[0].dtspsl_tipo_persona;
            fechactual = fecha.getFullYear() + "/" + fecha.getMonth() + "/" + fecha.getDate();
            if (sTipoPersona == 'NATURAL') {
                $scope.validacionDatosNatural(datos);
                if ((datos.dtspsl_nombres == '' || datos.dtspsl_materno == '' || datos.dtspsl_expedido == '' || datos.dtspsl_zona_desc == '' || datos.dtspsl_numero_casa == '' || datos.dtspsl_tipo_via == '' || datos.dtspsl_nombre_via == '' || datos.dtspsl_correo == '' || datos.dtspsl_file_fotocopia_ci == '') || (datos.dtspsl_nombres == ' ' || datos.dtspsl_materno == ' ' || datos.dtspsl_expedido == ' ' || datos.dtspsl_zona_desc == ' ' || datos.dtspsl_numero_casa == ' ' || datos.dtspsl_correo == ' ' || datos.dtspsl_file_fotocopia_ci == ' ')) {
                    setTimeout(function () {
                        swal({
                            title: 'Editar su Información',
                            text: 'Estimado ciudadano debe completar los siguientes datos de su cuenta: ' + $scope.datosfalt + ', para poder realizar el trámite',
                            type: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'OK',
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";
                            //$.unblockUI();
                        });
                    }, 300);
                } else {
                    datosForm['f01_tipo_per'] = sTipoPersona;
                    datosForm['f01_pri_nom_prop'] = datos.dtspsl_nombres;
                    datosForm['f01_ape_pat_prop'] = datos.dtspsl_paterno;
                    datosForm['f01_ape_mat_prop'] = datos.dtspsl_materno;
                    datosForm['f01_ape_cas_prop'] = datos.dtspsl_tercer_apellido;
                    datosForm['f01_fecha_nac'] = datos.dtspsl_fec_nacimiento;
                    datosForm['f01_nom_completo'] = datos.dtspsl_nombres + " " + datos.dtspsl_paterno + " " + datos.dtspsl_materno;
                    datosForm['f01_tip_doc_prop'] = "CI";
                    datosForm['f01_num_dos_prop'] = datos.dtspsl_ci;
                    datosForm['f01_expedido_prop'] = datos.dtspsl_expedido;
                    datosForm['f01_email_prop'] = datos.dtspsl_correo;
                    datosForm['f01_cel_prop'] = datos.dtspsl_movil;
                    datosForm['f01_telef_prop'] = datos.dtspsl_telefono;
                    datosForm['INT_FEC_SOLICITUD'] = fechactual;
                    datosForm['CI_BIGDATA'] = datos._id;
                    datosForm['f01_form_id'] = datos._id;
                    datosForm['INT_MACRODISTRITO'] = datos.dtspsl_macrodistrito;
                    datosForm['INT_OCUPACION'] = datos.dtspsl_ocupacion;
                    datosForm['INT_DIRECCION'] = datos.dtspsl_direccion;
                    datosForm['TIPO'] = "AE_INT_EMISION";
                    datosForm['f01_macro'] = datos.dtspsl_macrodistrito;
                    datosForm['f01_macro_des'] = datos.dtspsl_macrodistrito_desc;
                    datosForm['f01_distrito'] = datos.dtspsl_distrito;
                    datosForm['f01_distrito_desc'] = datos.dtspsl_distrito_desc;
                    datosForm['f01_zona'] = datos.dtspsl_zona;
                    datosForm['f01_zon_prop'] = datos.dtspsl_zona;
                    datosForm['f01_zon_prop_valor'] = datos.dtspsl_zona_desc;
                    datosForm['f01_zon_prop_desc'] = datos.dtspsl_zona_desc;
                    datosForm['INT_VIA'] = datos.dtspsl_tipo_via;
                    datosForm['f01_tip_via_prop'] = datos.dtspsl_tipo_via;
                    datosForm['f01_nom_via_prop'] = datos.dtspsl_nombre_via;
                    datosForm['f01_num_prop'] = datos.dtspsl_numero_casa;
                    datosForm['INT_EDIF'] = datos.dtspsl_edificio;
                    datosForm['f01_nom_edi_prop'] = datos.dtspsl_edificio;
                    datosForm['f01_bloq_prop'] = datos.dtspsl_bloque;
                    datosForm['f01_piso_prop'] = datos.dtspsl_piso;
                    datosForm['f01_depa_prop'] = datos.dtspsl_oficina;
                    datosForm['INT_PISO'] = datos.dtspsl_piso;
                    datosForm['INT_NUM_DEP'] = datos.dtspsl_oficina;
                    datosForm['INT_DIR_DET'] = datos.dtspsl_direccion;
                    datosForm['f01_dir_det_prop'] = datos.dtspsl_direccion;
                    datosForm['f01_genero'] = datos.dtspsl_sexo;

                    if (datos.dtspsl_expedido) {
                        if (datos.dtspsl_expedido == 'LPZ' || datos.dtspsl_expedido == 'CBB' || datos.dtspsl_expedido == 'SCZ' || datos.dtspsl_expedido == 'CHQ' || datos.dtspsl_expedido == 'TJA' || datos.dtspsl_expedido == 'PTS' || datos.dtspsl_expedido == 'ORU' || datos.dtspsl_expedido == 'BNI' || datos.dtspsl_expedido == 'PND') {
                            datosForm['f01_nac_prop'] = 'BOLIVIANA';
                            datosForm['INT_NACIONALIDAD'] = "BOLIVIANA";
                        } else {
                            datosForm['f01_nac_prop'] = 'EXTRANJERO';
                            datosForm['INT_NACIONALIDAD'] = "EXTRANJERO";
                        }
                    } else {
                        console.log("LE FALTA LLENAR SU EXPEDIDO");
                    }
                }
                $scope.datosIniciales = datosForm;
            } else {
                $scope.validacionDatosJuridico(datos);
                if ((datos.dtspsl_razon_social == '' || datos.dtspsl_nit == '' || datos.dtspsl_ci_representante == '' || datos.dtspsl_zona_desc == '' || datos.dtspsl_numero_casa == '' || datos.dtspsl_tipo_via == '' || datos.dtspsl_nombre_via == '' || datos.dtspsl_correo == '' || datos.dtspsl_file_poder_legal == '') || (datos.dtspsl_ci_representante == ' ' || datos.dtspsl_razon_social == ' ' || datos.dtspsl_zona_desc == ' ' || datos.dtspsl_numero_casa == ' ' || datos.dtspsl_tipo_via == ' ' || datos.dtspsl_nombre_via == ' ' || datos.dtspsl_correo == ' ' || datos.dtspsl_file_poder_legal == ' ' || datos.dtspsl_telefono == ' ')) {
                    setTimeout(function () {
                        swal({
                            title: 'Completar información',
                            text: 'Estimado ciudadano debe completar los siguientes datos de su cuenta: ' + $scope.datosfalt + ', para poder realizar el trámite',
                            type: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'OK',
                            closeOnConfirm: true
                        }, function () {
                            window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";
                            //$.unblockUI();
                        });
                    }, 300);
                } else {
                    datosForm['f01_tipo_per'] = sTipoPersona;
                    datosForm['f01_tip_doc_prop'] = "NIT";
                    datosForm['CI_BIGDATA'] = datos._id;
                    datosForm['f01_form_id'] = datos._id;
                    datosForm['f01_num_doc_per_jur'] = datos.dtspsl_nit;
                    datosForm['f01_raz_soc_per_jur'] = datos.dtspsl_razon_social;
                    datosForm['f01_ges_vig_pod'] = datos.dtspsl_poder_replegal;
                    datosForm['f01_num_doc_rep'] = datos.dtspsl_ci_representante;
                    datosForm['f01_num_pod_leg'] = datos.dtspsl_nro_notaria;
                    datosForm['f01_tip_doc_rep'] = 'CI';
                    datosForm['f01_expedido_rep'] = datos.dtspsl_expedido;
                    datosForm['f01_email_rep'] = datos.dtspsl_correo;
                    datosForm['f01_cel_rep'] = datos.dtspsl_movil;
                    datosForm['f01_telef_rep'] = datos.dtspsl_telefono;
                    datosForm['INT_FEC_SOLICITUD'] = fechactual;
                    datosForm['f01_fecha_nac'] = datos.dtspsl_fec_nacimiento;
                    datosForm['TIPO'] = "AE_INT_EMISION";
                    datosForm['f01_raz_soc'] = datos.f01_raz_soc;
                    datosForm['INT_AC_MACRO_ID'] = "";
                    datosForm['f01_rl_nit'] = datos.dtspsl_nit;
                    datosForm['INT_RL_TIPO_DOCUMENTO'] = "NIT";
                    datosForm['f01_macro'] = datos.dtspsl_macrodistrito;
                    datosForm['f01_macro_des'] = datos.dtspsl_macrodistrito_desc;
                    datosForm['f01_distrito_desc'] = datos.dtspsl_distrito_desc;
                    datosForm['f01_distrito'] = datos.dtspsl_distrito;
                    datosForm['f01_zona'] = datos.dtspsl_zona;
                    datosForm['f01_zona_desc'] = datos.dtspsl_zona_desc;
                    datosForm['INT_VIA'] = datos.dtspsl_tipo_via;
                    datosForm['f01_tipo_via'] = datos.dtspsl_tipo_via;
                    datosForm['f01_nombre_via'] = datos.dtspsl_nombre_via;
                    datosForm['f01_numero_casa'] = datos.dtspsl_numero_casa;
                    datosForm['INT_RL_FEC_EMISION_DOCUMENTO'] = fechactual;
                    datosForm['f01_num_notaria'] = datos.dtspsl_nro_notaria;
                    datosForm['f01_num_not'] = datos.dtspsl_nro_notaria;
                    datosForm['INT_NACIONALIDAD'] = "BOLIVIANA";
                    datosForm['INT_RL_FEC_NACIMIENTO'] = datos.dtspsl_fec_nacimiento;
                    datosForm['INT_NIT'] = datos.dtspsl_nit;
                    datosForm['f01_poder_representante'] = datos.dtspsl_file_poder_legal;
                    datosForm['f01_test_cons_sociedad_j'] = datos.dtspsl_file_test_const;
                    datosForm['file_num_ident'] = datos.dtspsl_file_num_ident;
                    datosForm['file_reg_comer'] = datos.dtspsl_file_reg_comer;
                    datosForm['file_fund_emp'] = datos.dtspsl_file_fund_emp;
                    if (datos.dtspsl_ci_representante || datos.dtspsl_ci_representante != null && datos.dtspsl_ci_representante != "") {
                        try {
                            var buscarRepresentante = new rcNatural();
                            buscarRepresentante.tipo_persona = "NATURAL";
                            buscarRepresentante.ci = datos.dtspsl_ci_representante;
                            buscarRepresentante.buscarPersona(function (resultado) {
                                resultadoApiRepre = JSON.parse(resultado);
                                var repLegalmongo = resultadoApiRepre;
                                var dtsNombres = ((typeof (repLegalmongo[0].dtspsl_nombres) == 'undefined') ? "" : repLegalmongo[0].dtspsl_nombres);
                                var dtsPaterno = ((typeof (repLegalmongo[0].dtspsl_paterno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_paterno);
                                var dtsMaterno = ((typeof (repLegalmongo[0].dtspsl_materno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_materno);
                                //datosForm['INT_SOLICITANTE']        =   dtsNombres + ' ' + dtsPaterno + ' ' + dtsMaterno;
                                datosForm['id_representante'] = repLegalmongo[0]._id;
                                datosForm['f01_pri_nom_prop'] = ((typeof (repLegalmongo[0].dtspsl_nombres) == 'undefined') ? "" : repLegalmongo[0].dtspsl_nombres);
                                datosForm['f01_ape_pat_prop'] = ((typeof (repLegalmongo[0].dtspsl_paterno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_paterno);
                                datosForm['f01_ape_mat_prop'] = ((typeof (repLegalmongo[0].dtspsl_materno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_materno);
                                datosForm['INT_RL_FECHA_NAC'] = ((typeof (repLegalmongo[0].dtspsl_fec_nacimiento) == 'undefined') ? "" : repLegalmongo[0].dtspsl_fec_nacimiento);
                                datosForm['INT_RL_FEC_NACIMIENTO'] = ((typeof (new Date(repLegalmongo[0].dtspsl_fec_nacimiento)) == 'undefined') ? "" : new Date(repLegalmongo[0].dtspsl_fec_nacimiento));
                                datosForm['oid_representante_legal'] = repLegalmongo[0]._id;
                                var sepNombre = repLegalmongo[0].dtspsl_nombres.split(" ");
                                datosForm['f01_pri_nom_rep'] = ((repLegalmongo[0].dtspsl_nombres == 'undefined') ? "" : repLegalmongo[0].dtspsl_nombres);
                                // datosForm['f01_seg_nom_rep'] = ((typeof(sepNombre[1]) == 'undefined') ? "" :sepNombre[1]);
                                //datosForm['f01_ter_nom_rep'] = ((typeof(sepNombre[2]) == 'undefined') ? "" :sepNombre[2]);
                                datosForm['f01_ape_cas_rep'] = ((typeof (repLegalmongo[0].dtspsl_tercer_apellido) == 'undefined') ? "" : repLegalmongo[0].dtspsl_tercer_apellido);
                                datosForm['f01_ape_pat_rep'] = ((typeof (repLegalmongo[0].dtspsl_paterno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_paterno);
                                datosForm['f01_ape_mat_rep'] = ((typeof (repLegalmongo[0].dtspsl_materno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_materno);
                                datosForm['f01_expedido_rep'] = repLegalmongo[0].dtspsl_expedido;
                                datosForm['FILE_FOTOCOPIA_CI_RA'] = repLegalmongo[0].dtspsl_file_fotocopia_ci;
                                datosForm['FILE_FOTOCOPIA_CI_RR'] = repLegalmongo[0].dtspsl_file_fotocopia_ci_r;
                                datosForm['f01_macro_rep'] = repLegalmongo[0].dtspsl_macrodistrito;
                                datosForm['f01_macro_desc_rep'] = repLegalmongo[0].dtspsl_macrodistrito_desc;
                                datosForm['f01_dist_rep'] = repLegalmongo[0].dtspsl_distrito;
                                datosForm['f01_zona_rep'] = repLegalmongo[0].dtspsl_zona;
                                datosForm['f01_id_zona_rep'] = repLegalmongo[0].dtspsl_zona;
                                datosForm['f01_zon_rep_valor'] = repLegalmongo[0].dtspsl_zona_desc;
                                datosForm['f01_nom_via_rep'] = repLegalmongo[0].dtspsl_nombre_via;
                                datosForm['f01_num_rep'] = repLegalmongo[0].dtspsl_numero_casa;
                                datosForm['f01_tipo_viarep'] = repLegalmongo[0].dtspsl_tipo_via;
                                datosForm['f01_num_rep'] = repLegalmongo[0].dtspsl_numero_casa;
                                datosForm['f01_cel_rep'] = repLegalmongo[0].dtspsl_movil;
                                datosForm['f01_email_rep'] = repLegalmongo[0].dtspsl_correo;
                                datosForm['f01_telef_rep'] = repLegalmongo[0].dtspsl_telefono;
                                datosForm['f01_expedido_rep'] = repLegalmongo[0].dtspsl_expedido;
                                datosForm['FILE_FOTOCOPIA_CI_RA']   =   repLegalmongo[0].dtspsl_file_fotocopia_ci;
                                datosForm['FILE_FOTOCOPIA_CI_RR']   =   repLegalmongo[0].dtspsl_file_fotocopia_ci_r;
                            });
                        } catch (e) {
                            console.log('*Error*', e);
                        }
                    }
                    $scope.datosIniciales = datosForm;
                    $rootScope.datosIniciales = datosForm;
                }
            }
        });
    }

    $scope.bloquearBtnEnviarForm = function () {
        $scope.botones = null;
    };

    $scope.getCaptchasX = function () {
        $scope.valorrandom = Math.floor(Math.random() * (224 - 1) + 1);
        $scope.resultadoC = "";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function (resultado) {
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero = partes[0].substring(1);
            i1 = (partes[2] + "," + partes[3]);
            i2 = (partes[4] + "," + partes[5]);
            $scope.imageLNG = i1.substring(1, i1.length - 1);
            $scope.imageCST = i2.substring(1, i2.length - 2);
            var lengua = "";
            if (partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if (partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if (partes[1] == 'G') {
                lengua = 'GUARANI';
            } else if (partes[1] == 'C') {
                lengua = 'CASTELLANO';
            } else {
                console.log("error", partes[1]);
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };

    $scope.getCaptchasXX = function () {
        $("#resultadoCC").val("");
        $scope.habGuardar1 = true;
        $scope.validarAdjuntos = true;
        $scope.ErrorCapchasXX = "";
        $scope.SuccesCapchasxx = "";
        $scope.valorrandomm = Math.floor(Math.random() * (224 - 1) + 1);
        $scope.resultadoCC = "";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function (resultado) {
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero1 = partes[0].substring(1);
            i1 = (partes[2] + "," + partes[3]);
            i2 = (partes[4] + "," + partes[5]);
            $scope.imageLNGG = i1.substring(1, i1.length - 1);
            $scope.imageCSTT = i2.substring(1, i2.length - 2);
            var lengua = "";
            if (partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if (partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if (partes[1] == 'G') {
                lengua = 'GUARANI';
            } else if (partes[1] == 'C') {
                lengua = 'CASTELLANO';
            } else {
                console.log("error", partes[1]);
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };

    $scope.lmpCaptcha = function (datos) {
        $scope.ErrorCapcha = '';
    }
    var numero = 0;
    $scope.VerificarCapcha = function (responce, resp) {
        $scope.habGuardar1 = true;
        var captch = $("#resultadoC").val();
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function (resultado) {
            json = JSON.parse(resultado);
            if (json.success[0] == undefined) {
                $scope.getCaptchasX();
                $scope.ErrorCapcha = 'Error en el captcha intentar de nuevo por favor';
            } else {
                $scope.confirmarServicioGamlp(responce, resp);
            }
        });
        $scope.getCaptchasX();
    };

    var tiemporespuesta = null;
    function verificarKeyPress(captch) {
        var id = numero1;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function (resultado) {
            json = JSON.parse(resultado);
            var nroregsitros = json.success.length;
            if (nroregsitros == 0) {
                $scope.habGuardar1 = true;
                $scope.ErrorCapchasXX = "Verifique el Capcha";
                $scope.SuccesCapchasxx = "";
                $scope.$apply();
            } else {
                $scope.habGuardar1 = false;
                $scope.ErrorCapchasXX = "";
                $scope.SuccesCapchasxx = "Capcha correcto";
                $scope.$apply();
            }
        });
    }

    $scope.VerificarCapchaa = function (datos) {
        var captch = $("#resultadoCC").val();
        if (captch.length == 0)
            $scope.ErrorCapchasXX = "";
        if (captch.length > 3) {
            clearTimeout(tiemporespuesta);
            tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1500);
        }
    };

    $scope.serializarInformacion = function (obj) {
        //AQUI PREPARA DATOS PARA ENVIAR DATOS DE IGOB A  LOTUS//
        //$rootScope.validacionRequisitosTec();
        obj.VH_CC_REQ_FAC_COMER = '';
        obj.VH_CC_REQ_POL_IMPOR = '';
        obj.VH_CC_PODER_COMPRADOR = '';
        //ALMACENAR FORMULARIO 
        obj.INT_FORM_ALMACENADO = 'G';
        obj.f01_tipo_per = sessionService.get('TIPO_PERSONA');

        obj.ID_TIPO_TRAMITE = 1301; //no borrar
        obj.VH_CC_NRO_DOC_IDEN = obj.f01_rl_nit;
        obj.VH_CC_NOM_RAZ_SOC = obj.f01_raz_soc_per_jur;
        obj.VH_CC_DIRECC = obj.f01_zon_rep_valor;
        obj.VH_CC_NRO_CHASIS = obj.VH_CC_NRO_CHASIS;
        obj.VH_CC_NRO_OBJ_TRIB = obj.VH_CC_NRO_OBJ_TRIB;
        obj.VH_CC_TIP_OBJ_TRIB = 'POLIZA';
        obj.VH_CC_FCHA_TRAM = $rootScope.fechayhora;
        obj.VH_CC_NRO_OBJ_TRIB = obj.VH_CC_NRO_OBJ_TRIB;
        obj.VH_CC_TIP_OBJ_TRIB = 'POLIZA';
        obj.VH_CC_FCHA_TRAM = $rootScope.fechayhora;
        obj.VH_CC_REQ_FAC_COMER = $scope.datos.urlFactura;//ADJUNTOS FACTURA
        obj.VH_CC_REQ_POL_IMPOR = $scope.datos.urlPoliza; 
        obj.VH_CC_PODER_COMPRADOR = $scope.datos.urlPoder; 
        obj.VH_CC_CI_ANV = $rootScope.file_CI_A;
        obj.VH_CC_CI_REV = $rootScope.file_CI_R;
        obj.VH_CC_PODER_RL = $rootScope.file_PODER;
        obj.VH_CC_NIT = $rootScope.file_NIT;
        obj.VH_CC_CI_ANV = $rootScope.file_CI_A;
        obj.VH_CC_CI_REV = $rootScope.file_CI_R;
        obj.VH_CC_PODER_RL = $rootScope.file_PODER;
        obj.VH_CC_NIT = $rootScope.file_NIT;
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
                    $rootScope.$broadcast('iniciaBtnHabilitar', 'G');
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

    $scope.serializarInformacionMotos = function (obj) {
        //console.log('obj',obj);
        //AQUI PREPARA DATOS PARA ENVIAR DATOS DE IGOB A  LOTUS//
        //$rootScope.validacionRequisitosTec();
        obj.VH_CC_REQ_FAC_COMER = '';
        obj.VH_CC_REQ_POL_IMPOR = '';
        obj.VH_CC_PODER_COMPRADOR = '';
        //ALMACENAR FORMULARIO 
        obj.INT_FORM_ALMACENADO = 'G';
        obj.f01_tipo_per = sessionService.get('TIPO_PERSONA');
        obj.ID_TIPO_TRAMITE = 1401; //no borrar
        obj.VH_CC_NRO_DOC_IDEN = obj.f01_rl_nit;
        obj.VH_CC_NOM_RAZ_SOC = obj.f01_raz_soc_per_jur;
        obj.VH_CC_DIRECC = obj.f01_zon_rep_valor;
        obj.VH_CC_NRO_CHASIS = obj.VH_CC_NRO_CHASIS;
        obj.VH_CC_NRO_OBJ_TRIB = obj.VH_CC_NRO_OBJ_TRIB;
        obj.VH_CC_TIP_OBJ_TRIB = 'POLIZA';
        obj.VH_CC_FCHA_TRAM = $rootScope.fechayhora;
        obj.VH_CC_NRO_OBJ_TRIB = obj.VH_CC_NRO_OBJ_TRIB;
        obj.VH_CC_TIP_OBJ_TRIB = 'POLIZA';
        obj.VH_CC_FCHA_TRAM = $rootScope.fechayhora;
        obj.VH_CC_REQ_FAC_COMER = $scope.datos.urlFactura; //ADJUNTOS FACTURA
        //console.log('factura',obj.VH_CC_REQ_FAC_COMER); 
        obj.VH_CC_REQ_POL_IMPOR = $scope.datos.urlPoliza; 
        obj.VH_CC_PODER_COMPRADOR = $scope.datos.urlPoder; 
        obj.VH_CC_CI_ANV = $rootScope.file_CI_A;
        obj.VH_CC_CI_REV = $rootScope.file_CI_R;
        obj.VH_CC_PODER_RL = $rootScope.file_PODER;
        obj.VH_CC_NIT = $rootScope.file_NIT;
        /*if(obj.VH_CC_NRO_OBJ_TRIB!= undefined && obj.VH_CC_NRO_CHASIS != undefined && obj.VH_CC_REQ_FAC_COMER != undefined && obj.VH_CC_REQ_POL_IMPOR != undefined && obj.VH_CC_PODER_COMPRADOR!=undefined){
            $scope.habGuardar1 = false;
            swal('Estimado Ciudadano', "Debe adjuntar todos los requisitos...", 'warning');
        }*/
        if((obj.VH_CC_REQ_FAC_COMER == 'undefined' || obj.VH_CC_REQ_FAC_COMER == undefined) || (obj.VH_CC_REQ_POL_IMPOR == 'undefined' || obj.VH_CC_REQ_POL_IMPOR == undefined) || (obj.VH_CC_PODER_COMPRADOR == 'undefined' || obj.VH_CC_PODER_COMPRADOR == undefined) || (obj.VH_CC_NRO_OBJ_TRIB == 'undefined' || obj.VH_CC_NRO_OBJ_TRIB == undefined )||(obj.VH_CC_NRO_CHASIS == 'undefined' || obj.VH_CC_NRO_CHASIS == undefined)){
            //alert(1111);
            swal('Estimado ciudadano', "Debe completar los datos del formulario y/o adjuntar todos los requisitos...", 'warning');
            $scope.habGuardar1 = true;
        }else{
            try {
                var datosSerializados = JSON.stringify(obj);
                //console.log ('obj',obj);
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
                        $rootScope.activaBoton = false;
                        $scope.btnEnviarForm = false;
                        $scope.btnGuardarForm = false;
                        
                        $rootScope.$broadcast('iniciaBtnHabilitar', 'G');
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
        }
    

    };
    $scope.serializarInformacionLibrosVehiculos = function (obj) {
        //AQUI PREPARA DATOS PARA ENVIAR DATOS DE IGOB A  LOTUS//
        //$rootScope.validacionRequisitosTec();
        obj.DOC_BALANCE_VEHICULOS = '';
        obj.VH_VL_DOC_DETALLE_OBJ_TRIB = '';
        obj.VH_CC_CUADRO_ACT = '';
        //ALMACENAR FORMULARIO 
        obj.INT_FORM_ALMACENADO = 'G';
        obj.f01_tipo_per = sessionService.get('TIPO_PERSONA');
        obj.ID_TIPO_TRAMITE = 103010; //no borrar
        obj.VH_CC_NRO_DOC_IDEN = obj.f01_rl_nit;
        obj.VH_CC_NOM_RAZ_SOC = obj.f01_raz_soc_per_jur;
        obj.VH_CC_DIRECC = obj.f01_zon_rep_valor;
        obj.VH_CC_NRO_CHASIS = obj.VH_CC_NRO_CHASIS;
        obj.VH_CC_NRO_OBJ_TRIB = obj.VH_CC_NRO_OBJ_TRIB;
        obj.VH_CC_TIP_OBJ_TRIB = 'POLIZA';
        obj.VH_CC_FCHA_TRAM = $rootScope.fechayhora;
        obj.VH_CC_NRO_OBJ_TRIB = obj.VH_CC_NRO_OBJ_TRIB;
        obj.VH_CC_TIP_OBJ_TRIB = 'POLIZA';
        obj.VH_CC_FCHA_TRAM = $rootScope.fechayhora;
        obj.DOC_BALANCE_VEHICULOS = $scope.datos.urlFactura; //ADJUNTOS FACTURA 
        obj.VH_VL_DOC_DETALLE_OBJ_TRIB = $scope.datos.urlTributario; //ADJUNTOS FACTURA 
        obj.VH_CC_CUADRO_ACT = $scope.datos.urlCuadroAct; //ADJUNTOS FACTURA
        obj.VH_CC_FCHA_TRAM = $rootScope.fechayhora;
        obj.VH_VL_CUADRO_EXCEL = $scope.datos.excel;
        obj.VH_VL_FORMULARIO409 = $scope.datos.urlFomulario409;

        //obj.VH_CC_REQ_FAC_COMER = $scope.datos.urlFactura; //ADJUNTOS FACTURA 
        //obj.VH_CC_REQ_POL_IMPOR = $scope.datos.urlPoliza; 
        //obj.VH_CC_PODER_COMPRADOR = $scope.datos.urlPoder; 
        //obj.DOC_FORMULARIO_409 = $rootScope.datosEnvV.declaracion_jurada  //url pdf generado form 409
        obj.VH_CC_CI_ANV = $rootScope.file_CI_A;
        obj.VH_CC_CI_REV = $rootScope.file_CI_R;
        obj.VH_CC_PODER_RL = $rootScope.file_PODER;
        obj.VH_CC_NIT = $rootScope.file_NIT;
        

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
                    $rootScope.$broadcast('iniciaBtnHabilitar', 'G');
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
    $scope.serializarInformacionInmuebles = function (obj) {
        console.log("ingreso a oba", obj);
        //AQUI PREPARA DATOS PARA ENVIAR DATOS DE IGOB A  LOTUS//
        //$rootScope.validacionRequisitosTec();
        obj.VH_CC_REQ_BALANCE = '';
        obj.VH_CC_REQ_DETALLE = '';
        obj.VH_CC_CUADRO_ACT = '';

        //ALMACENAR FORMULARIO 
        obj.INT_FORM_ALMACENADO = 'G';
        obj.f01_tipo_per = sessionService.get('TIPO_PERSONA');
        obj.ID_TIPO_TRAMITE = 102001; //no borrar
        obj.INM_VL_NRO_DOC_IDEN = obj.f01_num_doc_per_jur;
        obj.INM_VL_NOM_RAZ_SOC = obj.f01_raz_soc_per_jur;
        obj.VH_CC_DIRECC = obj.f01_zon_rep_valor;
        obj.VH_CC_NRO_CHASIS = obj.VH_CC_NRO_CHASIS;
        obj.VH_CC_NRO_OBJ_TRIB = obj.VH_CC_NRO_OBJ_TRIB;
        obj.VH_CC_TIP_OBJ_TRIB = 'POLIZA';
        obj.VH_CC_FCHA_TRAM = $rootScope.fechayhora;
        obj.VH_CC_NRO_OBJ_TRIB = obj.VH_CC_NRO_OBJ_TRIB;
        obj.VH_CC_TIP_OBJ_TRIB = 'POLIZA';
        obj.VH_CC_FCHA_TRAM = $rootScope.fechayhora;
        obj.File_Adjunto = $scope.datos.urlFacturaLotus;
        obj.VH_CC_REQ_BALANCE = $scope.datos.urlFactura;
        obj.VH_CC_REQ_DETALLE = $scope.datos.urlInmueble;
        obj.VH_CC_CUADRO_EXCEL_INM = $scope.datos.excel; 
        obj.DOC_CI_FORMULARIO_406 = $rootScope.datosEnvI.declaracion_jurada;  //url pdf generado form 406
        obj.VH_CC_FCHA_TRAM = $rootScope.fechayhora;
        obj.VH_CC_REQ_FAC_COMER = $scope.datos.urlCuadroAct; 
        obj.VH_VL_FORMULARIO406 = $scope.datos.formularioAdjunto406;  
        obj.VH_CC_PODER_COMPRADOR = $scope.datos.urlPoder; 
        obj.VH_CC_CI_ANV = $rootScope.file_CI_A;
        obj.VH_CC_CI_REV = $rootScope.file_CI_R;
        obj.VH_CC_PODER_RL = $rootScope.file_PODER;
        obj.VH_CC_NIT = $rootScope.file_NIT;
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
                    $rootScope.$broadcast('iniciaBtnHabilitar', 'G');
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
    $scope.generarDocumentoPhpI = function (){
        $.blockUI();
        var tipoPersona = '';
        var oidCiudadano = '';
        var datosCiudadano = '';
        var datosci = '';
        var datosexpedido = '';
        var dEmpresa = '';
        var dnit = '';
        var datoFormI = '';
        var stform = '';
         tipoPersona     = sessionService.get('TIPO_PERSONA');
            if(tipoPersona == 'JURIDICO' || tipoPersona == 'J'){
                oidCiudadano    = sessionService.get('IDSOLICITANTE');
                datosCiudadano  = $scope.datosIniciales.f01_pri_nom_rep +' '+ $scope.datosIniciales.f01_ape_pat_rep;
                datosci         = $scope.datosIniciales.f01_num_doc_rep;
                dEmpresa        = $scope.datosIniciales.f01_raz_soc_per_jur;
                dnit            = $scope.datosIniciales.f01_num_doc_per_jur;
                datoFormI = JSON.stringify($rootScope.datosForm406);
                //console.log('datoForm4',datoFormI);
                $.ajax({
                    url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdf406_409.php',
                    type:"post",
                    data:{
                        "soid": oidCiudadano,
                        "sorigen":"PLATAFORMA INSTITUCIONAL",
                        "stipo":tipoPersona,
                        "usuario": datosCiudadano,
                        "cedula":  datosci,
                        "expedido": '',
                        "empresa": dEmpresa,
                        "nit": dnit,
                        "fecha": $scope.fechafinalserver,
                        "hora": $scope.horafinal,
                        "data": datoFormI,
                        "stipo_form": '406'
                    },
                    success:function(response){
                        if(response.length>0){
                            var urlData = response;                            
                            $rootScope.decJuradaNatural = urlData;
                            $scope.InsertarDocumento(response);
                           $rootScope.datosEnvI.declaracion_jurada = urlData;
                           $scope.serializarInformacionInmuebles($rootScope.datosEnvI);
                           //window.open(urlData);  
                            $.unblockUI();
                        }
                    }
            });
        }
    };

$scope.printToCart = function(printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        console.log("ingreso aca print ", innerContents);
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
      }

    $scope.generarDocumentoPhpV = function (){
        $.blockUI();
        var tipoPersona = '';
        var oidCiudadano = '';
        var datosCiudadano = '';
        var datosci = '';
        var datosexpedido = '';
        var dEmpresa = '';
        var dnit = '';
        var datoForm4 = '';
        var stform = '';
         tipoPersona     = sessionService.get('TIPO_PERSONA');
        if(tipoPersona == 'JURIDICO' || tipoPersona == 'J'){
            oidCiudadano    = sessionService.get('IDSOLICITANTE');
            datosCiudadano  = $scope.datosIniciales.f01_pri_nom_rep +' '+ $scope.datosIniciales.f01_ape_pat_rep;
            datosci         = $scope.datosIniciales.f01_num_doc_rep;
            dEmpresa        = $scope.datosIniciales.f01_raz_soc_per_jur;
            dnit            = $scope.datosIniciales.f01_num_doc_per_jur;
            datoForm4 = JSON.stringify($rootScope.datosForm409);
            $.ajax({
                url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdf406_409.php',
                type:"post",
                data:{
                    "soid": oidCiudadano,
                    "sorigen":"PLATAFORMA INSTITUCIONAL",
                    "stipo":tipoPersona,
                    "usuario": datosCiudadano,
                    "cedula":  datosci,
                    "expedido": '',
                    "empresa": dEmpresa,
                    "nit": dnit,
                    "fecha": $scope.fechafinalserver,
                    "hora": $scope.horafinal,
                    "data": datoForm4,
                    "stipo_form": '409'
                },
                success:function(response){

                    if(response.length>0){
                        var urlData = response;
                        //window.open(urlData, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=1000,width=800,height=1000");  
                            
                        $rootScope.decJuradaNatural = urlData;
                        $scope.InsertarDocumento(response);
                        $rootScope.datosEnvV.declaracion_jurada = urlData;
                        $scope.serializarInformacionLibrosVehiculos($rootScope.datosEnvV);
                        $.unblockUI();
                    }
                }
            });
        }
    };

    $scope.$on('api:ready', function () {
        $scope.tramitesCiudadano();
        $scope.recuperandoDatosInicialesCiudadano();
        $scope.getCaptchasXX();

    });

    $scope.inicioServiciosAtm = function () {
        $scope.tramitesCiudadano();
        $scope.recuperandoDatosInicialesCiudadano();
        $scope.getCaptchasXX();
    };
});

