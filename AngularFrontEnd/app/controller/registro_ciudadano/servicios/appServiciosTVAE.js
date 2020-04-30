app.controller('serviciosControllerTVAE', function ($scope, $rootScope ,$routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual, $q) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

    $scope.tablaTramites        =   {};
    $scope.tramitesUsuario      =   [];
    $scope.templates =
    [ { name: 'template0.html', url: '../../../app/view/servicios/aetiendav/indexnatural.html'}, 
      { name: 'template1.html', url: '../../../app/view/servicios/aetiendav/indexjuridico.html'} 
    ];
    $scope.recuperandoDatosInicialesCiudadano = function(){
        var idCiudadano = sessionService.get('IDUSUARIO');
        $scope.datosIniciales = "";
        var datosForm = {};
        var sTipoPersona = "";
        var recuperarDatos = new rcNatural();
        recuperarDatos.oid = idCiudadano;
        recuperarDatos.datosCiudadanoNatural(function(resultado){
            resultadoApi = JSON.parse(resultado);
            datos           =   resultadoApi[0];
            $scope.datosRecuperados = datos;
            sTipoPersona    =   resultadoApi[0].dtspsl_tipo_persona;
            $scope.sTipoPersona    =   resultadoApi[0].dtspsl_tipo_persona;
            fechactual      =   fecha.getFullYear() + "/" + fecha.getMonth() + "/" + fecha.getDate();
            if(sTipoPersona == 'NATURAL')
            {
                if ((datos.dtspsl_nombres == '' || datos.dtspsl_materno == '' || datos.dtspsl_expedido == '' || datos.dtspsl_zona_desc == '' || datos.dtspsl_numero_casa == '' || datos.dtspsl_tipo_via == '' || datos.dtspsl_nombre_via == '' || datos.dtspsl_correo == '' || datos.dtspsl_file_fotocopia_ci == '') || (datos.dtspsl_nombres == ' ' || datos.dtspsl_materno == ' ' || datos.dtspsl_expedido == ' ' || datos.dtspsl_zona_desc == ' ' || datos.dtspsl_numero_casa == ' ' || datos.dtspsl_correo == ' ' || datos.dtspsl_file_fotocopia_ci == ' '))
                {   
                    setTimeout(function(){
                        swal({
                            title: 'Editar su Información',
                            text: 'Estimado ciudadano debe completar los siguientes datos de su cuenta: '+ $scope.datosfalt +', para poder realizar el trámite',
                            type: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'OK',
                            closeOnConfirm: true
                        }, function() {                                
                            window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                        });                          
                    },300);
                }else{
                        datosForm['f01_tipo_per']       = sTipoPersona;
                        datosForm['f01_pri_nom_prop']   = datos.dtspsl_nombres;
                        datosForm['f01_ape_pat_prop']   = datos.dtspsl_paterno;
                        datosForm['f01_ape_mat_prop']   = datos.dtspsl_materno;
                        datosForm['f01_ape_cas_prop']   = datos.dtspsl_tercer_apellido;
                        datosForm['f01_fecha_nac']      = datos.dtspsl_fec_nacimiento;
                        datosForm['f01_nom_completo']   = datos.dtspsl_nombres + " " + datos.dtspsl_paterno + " " + datos.dtspsl_materno;
                        datosForm['f01_tip_doc_prop']   = "CI";
                        datosForm['f01_num_dos_prop']   = datos.dtspsl_ci;
                        datosForm['f01_expedido_prop']  = datos.dtspsl_expedido;
                        datosForm['f01_email_prop']     = datos.dtspsl_correo;
                        datosForm['f01_cel_prop']       = datos.dtspsl_movil;
                        datosForm['f01_telef_prop']     = datos.dtspsl_telefono;
                        datosForm['INT_FEC_SOLICITUD']  = fechactual;
                        datosForm['CI_BIGDATA']         = datos._id;
                        datosForm['f01_form_id']        = datos._id;
                        datosForm['INT_MACRODISTRITO']  = datos.dtspsl_macrodistrito;
                        datosForm['INT_OCUPACION']      = datos.dtspsl_ocupacion;
                        datosForm['INT_DIRECCION']      = datos.dtspsl_direccion;
                        datosForm['TIPO']               = "AE_INT_EMISION";
                        datosForm['f01_macro']          = datos.dtspsl_macrodistrito;
                        datosForm['f01_macro_des']      = datos.dtspsl_macrodistrito_desc;
                        datosForm['f01_distrito']       = datos.dtspsl_distrito;
                        datosForm['f01_distrito_desc']  = datos.dtspsl_distrito_desc;
                        datosForm['f01_zona']           = datos.dtspsl_zona;
                        datosForm['f01_zon_prop']       = datos.dtspsl_zona;
                        datosForm['f01_zon_prop_valor'] = datos.dtspsl_zona_desc;
                        datosForm['f01_zon_prop_desc']  = datos.dtspsl_zona_desc;
                        datosForm['INT_VIA']            = datos.dtspsl_tipo_via;
                        datosForm['f01_tip_via_prop']   = datos.dtspsl_tipo_via;
                        datosForm['f01_nom_via_prop']   = datos.dtspsl_nombre_via;
                        datosForm['f01_num_prop']       = datos.dtspsl_numero_casa;
                        datosForm['INT_EDIF']           = datos.dtspsl_edificio;
                        datosForm['f01_nom_edi_prop']   = datos.dtspsl_edificio;
                        datosForm['f01_bloq_prop']      = datos.dtspsl_bloque;
                        datosForm['f01_piso_prop']      = datos.dtspsl_piso;
                        datosForm['f01_depa_prop']      = datos.dtspsl_oficina;
                        datosForm['INT_PISO']           = datos.dtspsl_piso;
                        datosForm['INT_NUM_DEP']        = datos.dtspsl_oficina;
                        datosForm['INT_DIR_DET']        = datos.dtspsl_direccion;
                        datosForm['f01_dir_det_prop']   = datos.dtspsl_direccion;
                        if(datos.dtspsl_expedido){
                            if(datos.dtspsl_expedido == 'LPZ' || datos.dtspsl_expedido == 'CBB' || datos.dtspsl_expedido == 'SCZ' || datos.dtspsl_expedido == 'CHQ' || datos.dtspsl_expedido == 'TJA' || datos.dtspsl_expedido == 'PTS' || datos.dtspsl_expedido == 'ORU' || datos.dtspsl_expedido == 'BNI' || datos.dtspsl_expedido == 'PND'){
                                datosForm['f01_nac_prop'] = 'BOLIVIANA';
                                datosForm['INT_NACIONALIDAD'] = "BOLIVIANA";
                            }else{
                                datosForm['f01_nac_prop'] = 'EXTRANJERO';
                                datosForm['INT_NACIONALIDAD'] = "EXTRANJERO";
                            }
                        }else{
                            console.log("LE FALTA LLENAR SU EXPEDIDO");
                        }
                    }
                $scope.datosIniciales = datosForm;
            }else{
                if ((datos.dtspsl_razon_social == '' || datos.dtspsl_nit == '' || datos.dtspsl_ci_representante == '' || datos.dtspsl_zona_desc == '' || datos.dtspsl_numero_casa == '' || datos.dtspsl_tipo_via == '' || datos.dtspsl_nombre_via == '' || datos.dtspsl_correo == '' || datos.dtspsl_file_poder_legal == '') || (datos.dtspsl_ci_representante == ' ' || datos.dtspsl_razon_social == ' ' || datos.dtspsl_zona_desc == ' ' || datos.dtspsl_numero_casa == ' ' || datos.dtspsl_tipo_via == ' ' || datos.dtspsl_nombre_via == ' ' || datos.dtspsl_correo == ' ' || datos.dtspsl_file_poder_legal == ' ' || datos.dtspsl_telefono == ' '))
                {
                    setTimeout(function(){
                        swal({
                            title: 'Completar información',
                            text: 'Estimado ciudadano debe completar los siguientes datos de su cuenta: '+ $scope.datosfalt +', para poder realizar el trámite',
                            type: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'OK',
                            closeOnConfirm: true
                        }, function() {                                
                            window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                        });                          
                    },300);
                }else{
                    var gestion = datos.dtspsl_poder_replegal.split(/[ -.!,&|\[\]/\\]+/);
                    if (gestion[1] == 'NaN' || gestion[1] == NaN || gestion[1] == 'undefined' || gestion[1] == undefined || gestion[1] == null || gestion[1] == '') {
                        datosForm['f01_ges_vig_pod'] = gestion[0];
                        datosForm['f01_num_pod_leg'] = gestion[0];
                    } else{
                        datosForm['f01_num_pod_leg'] = gestion[0];                        
                        datosForm['f01_ges_vig_pod'] = gestion[1];
                    };
                        datosForm['f01_tipo_per']               = sTipoPersona;               
                        datosForm['f01_tip_doc_prop']           = "NIT";
                        datosForm['CI_BIGDATA']                 = datos._id;
                        datosForm['f01_form_id']                = datos._id;
                        datosForm['f01_num_doc_per_jur']        = datos.dtspsl_nit;
                        datosForm['f01_raz_soc_per_jur']        = datos.dtspsl_razon_social;
                        //datosForm['f01_ges_vig_pod']            = datos.dtspsl_poder_replegal;
                        datosForm['f01_num_doc_rep']            = datos.dtspsl_ci_representante;
                        //datosForm['f01_num_pod_leg']            = datos.dtspsl_nro_notaria;
                        datosForm['f01_tip_doc_rep']            = 'CI';
                        datosForm['f01_expedido_rep']           = datos.dtspsl_expedido;
                        datosForm['f01_email_rep']              = datos.dtspsl_correo;
                        datosForm['f01_cel_rep']                = datos.dtspsl_movil;
                        datosForm['f01_telef_rep']              = datos.dtspsl_telefono;
                        datosForm['INT_FEC_SOLICITUD']          = fechactual; 
                        datosForm['f01_fecha_nac']              = datos.dtspsl_fec_nacimiento;
                        datosForm['TIPO']                       = "AE_INT_EMISION";
                        datosForm['f01_raz_soc']                = datos.f01_raz_soc;
                        datosForm['INT_AC_MACRO_ID']            = "";
                        datosForm['f01_rl_nit']                 = datos.dtspsl_nit;
                        datosForm['INT_RL_TIPO_DOCUMENTO']      = "NIT";
                        datosForm['f01_macro']                  = datos.dtspsl_macrodistrito;
                        datosForm['f01_macro_des']              = datos.dtspsl_macrodistrito_desc;
                        datosForm['f01_distrito_desc']          = datos.dtspsl_distrito_desc;
                        datosForm['f01_distrito']               = datos.dtspsl_distrito;
                        datosForm['f01_zona']                   = datos.dtspsl_zona;
                        datosForm['f01_zona_desc']              = datos.dtspsl_zona_desc;
                        datosForm['INT_VIA']                    = datos.dtspsl_tipo_via;
                        datosForm['f01_tipo_via']               = datos.dtspsl_tipo_via;
                        datosForm['f01_nombre_via']             = datos.dtspsl_nombre_via;
                        datosForm['f01_numero_casa']            = datos.dtspsl_numero_casa;
                        datosForm['INT_RL_FEC_EMISION_DOCUMENTO'] = fechactual;
                        datosForm['f01_num_notaria']            = datos.dtspsl_nro_notaria;
                        datosForm['f01_num_not']                = datos.dtspsl_nro_notaria;
                        datosForm['INT_NACIONALIDAD']           = "BOLIVIANA";
                        datosForm['INT_RL_FEC_NACIMIENTO']      = datos.dtspsl_fec_nacimiento;
                        datosForm['INT_NIT']                    = datos.dtspsl_nit;
                        datosForm['f01_poder_representante']    = datos.dtspsl_file_poder_legal;
                        datosForm['f01_test_cons_sociedad_j']   = datos.dtspsl_file_test_const;
                        datosForm['file_num_ident']             = datos.dtspsl_file_num_ident;
                        datosForm['file_reg_comer']             = datos.dtspsl_file_reg_comer;
                        datosForm['file_fund_emp']              = datos.dtspsl_file_fund_emp;
                    if(datos.dtspsl_ci_representante || datos.dtspsl_ci_representante != null && datos.dtspsl_ci_representante != "")
                    {
                        try {
                           var buscarRepresentante = new rcNatural();
                            buscarRepresentante.tipo_persona = "NATURAL";
                            buscarRepresentante.ci = datos.dtspsl_ci_representante;
                            buscarRepresentante.buscarPersona(function(resultado){
                                resultadoApiRepre = JSON.parse(resultado);
                                var repLegalmongo   =   resultadoApiRepre;
                                var dtsNombres      =   ((typeof(repLegalmongo[0].dtspsl_nombres) == 'undefined') ? "" : repLegalmongo[0].dtspsl_nombres);
                                var dtsPaterno      =   ((typeof(repLegalmongo[0].dtspsl_paterno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_paterno);
                                var dtsMaterno      =   ((typeof(repLegalmongo[0].dtspsl_materno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_materno);
                                //datosForm['INT_SOLICITANTE']        =   dtsNombres + ' ' + dtsPaterno + ' ' + dtsMaterno;
                                datosForm['id_representante']       =   repLegalmongo[0]._id;
                                datosForm['f01_pri_nom_prop']       =   ((typeof(repLegalmongo[0].dtspsl_nombres) == 'undefined') ? "" :repLegalmongo[0].dtspsl_nombres);
                                datosForm['f01_ape_pat_prop']       =   ((typeof(repLegalmongo[0].dtspsl_paterno) == 'undefined') ? "" :repLegalmongo[0].dtspsl_paterno);
                                datosForm['f01_ape_mat_prop']       =   ((typeof(repLegalmongo[0].dtspsl_materno) == 'undefined') ? "" :repLegalmongo[0].dtspsl_materno);
                                datosForm['INT_RL_FECHA_NAC']       =   ((typeof(repLegalmongo[0].dtspsl_fec_nacimiento) == 'undefined') ? "" :repLegalmongo[0].dtspsl_fec_nacimiento);
                                datosForm['INT_RL_FEC_NACIMIENTO']  =   ((typeof(new Date(repLegalmongo[0].dtspsl_fec_nacimiento)) == 'undefined') ? "" :new Date(repLegalmongo[0].dtspsl_fec_nacimiento));
                                datosForm['oid_representante_legal'] = repLegalmongo[0]._id;
                                var sepNombre = repLegalmongo[0].dtspsl_nombres.split(" ");
                                datosForm['f01_pri_nom_rep'] = ((repLegalmongo[0].dtspsl_nombres == 'undefined') ? "" :repLegalmongo[0].dtspsl_nombres);
                                // datosForm['f01_seg_nom_rep'] = ((typeof(sepNombre[1]) == 'undefined') ? "" :sepNombre[1]);
                                //datosForm['f01_ter_nom_rep'] = ((typeof(sepNombre[2]) == 'undefined') ? "" :sepNombre[2]);
                                datosForm['f01_ape_cas_rep']    = ((typeof(repLegalmongo[0].dtspsl_tercer_apellido) == 'undefined') ? "" :repLegalmongo[0].dtspsl_tercer_apellido);
                                datosForm['f01_ape_pat_rep']    = ((typeof(repLegalmongo[0].dtspsl_paterno) == 'undefined') ? "" :repLegalmongo[0].dtspsl_paterno);
                                datosForm['f01_ape_mat_rep']    = ((typeof(repLegalmongo[0].dtspsl_materno) == 'undefined') ? "" :repLegalmongo[0].dtspsl_materno);
                                datosForm['f01_expedido_rep']   = repLegalmongo[0].dtspsl_expedido;
                                datosForm['FILE_FOTOCOPIA_CI_RA']   =   repLegalmongo[0].dtspsl_file_fotocopia_ci;
                                datosForm['FILE_FOTOCOPIA_CI_RR']   =   repLegalmongo[0].dtspsl_file_fotocopia_ci_r;
                                datosForm['f01_macro_rep']          = repLegalmongo[0].dtspsl_macrodistrito;
                                datosForm['f01_macro_desc_rep']     = repLegalmongo[0].dtspsl_macrodistrito_desc;
                                datosForm['f01_dist_rep']           = repLegalmongo[0].dtspsl_distrito;
                                datosForm['f01_zona_rep']           = repLegalmongo[0].dtspsl_zona;
                                datosForm['f01_id_zona_rep']        = repLegalmongo[0].dtspsl_zona;
                                datosForm['f01_zon_rep_valor']      = repLegalmongo[0].dtspsl_zona_desc;
                                datosForm['f01_nom_via_rep']        = repLegalmongo[0].dtspsl_nombre_via;
                                datosForm['f01_num_rep']            = repLegalmongo[0].dtspsl_numero_casa;
                                datosForm['f01_tipo_viarep']        = repLegalmongo[0].dtspsl_tipo_via;
                                datosForm['f01_num_rep']            = repLegalmongo[0].dtspsl_numero_casa;
                                datosForm['f01_cel_rep']            = repLegalmongo[0].dtspsl_movil;
                                datosForm['f01_email_rep']          = repLegalmongo[0].dtspsl_correo;
                                datosForm['f01_telef_rep']          = repLegalmongo[0].dtspsl_telefono;
                                datosForm['f01_expedido_rep']       = repLegalmongo[0].dtspsl_expedido;    
                            }); 
                        } catch(e) {
                            console.log('*Error*', e);
                        }
                    }
                    $scope.datosIniciales = datosForm;
                }
            }
        });
    };

        /*CIUDADANO-INICIAR DATOS CONTRI*/
    $scope.iniciandoDatos = function(){
        var datosIniciales = $scope.datosIniciales;
        var fechactual  =   obtFechaActual.obtenerFechaActual();
        $scope.datos = {};
        var datosForm_inicio = {};
        var sTipoPersona =   sessionService.get('TIPO_PERSONA');
        if(sTipoPersona == 'NATURAL'){
            datosForm_inicio['f01_id']              = datosIniciales.f01_form_id;
            datosForm_inicio['CI_BIGDATA']          = datosIniciales.CI_BIGDATA;
            datosForm_inicio['f01_pri_nom_prop']    = datosIniciales.f01_pri_nom_prop;
            datosForm_inicio['f01_ape_pat_prop']    = datosIniciales.f01_ape_pat_prop;
            datosForm_inicio['f01_ape_mat_prop']    = datosIniciales.f01_ape_mat_prop;
            datosForm_inicio['f01_ape_cas_prop']    = datosIniciales.f01_ape_cas_prop;
            datosForm_inicio['f01_fecha_nac']       = datosIniciales.f01_fecha_nac;
            datosForm_inicio['f01_nom_completo']    = datosIniciales.f01_nom_completo;
            datosForm_inicio['f01_tip_doc_prop']    = datosIniciales.f01_tip_doc_prop;
            datosForm_inicio['f01_num_dos_prop']    = datosIniciales.f01_num_dos_prop;
            datosForm_inicio['f01_expedido_prop']   = datosIniciales.f01_expedido_prop;
            datosForm_inicio['f01_email_prop']      = datosIniciales.f01_email_prop;
            datosForm_inicio['f01_cel_prop']        = datosIniciales.f01_cel_prop;
            datosForm_inicio['f01_telef_prop']      = datosIniciales.f01_telef_prop;
            datosForm_inicio['INT_OCUPACION']       = datosIniciales.INT_OCUPACION;
            datosForm_inicio['INT_DIRECCION']       = datosIniciales.INT_DIRECCION;
            //DATOS INICIALES PERSONA NATURAL
            datosForm_inicio['INT_MACRODISTRITO']   = datosIniciales.INT_MACRODISTRITO;
            datosForm_inicio['f01_macro']           = datosIniciales.f01_macro;
            datosForm_inicio['f01_macro_des']       = datosIniciales.f01_macro_des;
            datosForm_inicio['f01_distrito']        = datosIniciales.f01_distrito;
            datosForm_inicio['f01_distrito_desc']   = datosIniciales.f01_distrito_desc;
            datosForm_inicio['f01_zona']            = datosIniciales.f01_zona;
            datosForm_inicio['f01_zon_prop']        = datosIniciales.f01_zon_prop;
            datosForm_inicio['f01_zon_prop_valor']  = datosIniciales.f01_zon_prop_valor;
            datosForm_inicio['f01_zon_prop_desc']   = datosIniciales.f01_zon_prop_desc;
            datosForm_inicio['INT_VIA']             = datosIniciales.INT_VIA;
            datosForm_inicio['f01_tip_via_prop']    = datosIniciales.f01_tip_via_prop;
            datosForm_inicio['f01_nom_via_prop']    = datosIniciales.f01_nom_via_prop;
            datosForm_inicio['f01_num_prop']        = datosIniciales.f01_num_prop;
            datosForm_inicio['INT_EDIF']            = datosIniciales.INT_EDIF;
            datosForm_inicio['f01_nom_edi_prop']    = datosIniciales.f01_nom_edi_prop;
            datosForm_inicio['f01_piso_prop']       = datosIniciales.f01_piso_prop;
            datosForm_inicio['f01_bloq_prop']       = datosIniciales.f01_bloq_prop;
            datosForm_inicio['f01_depa_prop']       = datosIniciales.f01_depa_prop;
            datosForm_inicio['INT_PISO']            = datosIniciales.INT_PISO;
            datosForm_inicio['INT_NUM_DEP']         = datosIniciales.INT_NUM_DEP;
            datosForm_inicio['INT_DIR_DET']         = datosIniciales.INT_DIR_DET;
            datosForm_inicio['f01_dir_det_prop']    = datosIniciales.f01_dir_det_prop;
            datosForm_inicio['f01_id']              = datosIniciales.f01_id;
            datosForm_inicio['CI_BIGDATA']          = datosIniciales.CI_BIGDATA;
            datosForm_inicio['INT_FEC_SOLICITUD']   = fechactual;
            datosForm_inicio['f01_tel_ciudadano']   = datosIniciales.f01_telef_prop;
            datosForm_inicio['INT_FEC_SOLICITUD']   = fechactual;
            datosForm_inicio['f01_tipo_per']        = datosIniciales.f01_tipo_per;
            datosForm_inicio['f01_nac_prop']        = datosIniciales.f01_nac_prop;

        }else{
            if(sTipoPersona == 'JURIDICO')
            {

                datosForm_inicio['f01_id']                  = datosIniciales.f01_id;
                datosForm_inicio['CI_BIGDATA']              = datosIniciales.CI_BIGDATA;
                datosForm_inicio['f01_tip_doc_prop']        = datosIniciales.f01_tip_doc_prop;
                datosForm_inicio['f01_num_doc_per_jur']     = datosIniciales.f01_num_doc_per_jur;
                datosForm_inicio['f01_raz_soc_per_jur']     = datosIniciales.f01_raz_soc_per_jur;
                datosForm_inicio['f01_raz_soc']             = datosIniciales.f01_raz_soc;
                datosForm_inicio['f01_tip_doc_rep']         = datosIniciales.f01_tip_doc_rep;
                datosForm_inicio['f01_ges_vig_pod']         = datosIniciales.f01_ges_vig_pod;
                datosForm_inicio['f01_num_doc_rep']         = datosIniciales.f01_num_doc_rep;
                datosForm_inicio['f01_num_pod_leg']         = datosIniciales.f01_num_pod_leg;                
                datosForm_inicio['f01_expedido_rep']        = datosIniciales.f01_expedido_rep;
                datosForm_inicio['f01_pri_nom_rep']         = datosIniciales.f01_pri_nom_rep;
                datosForm_inicio['f01_seg_nom_rep']         = datosIniciales.f01_seg_nom_rep;
                datosForm_inicio['f01_ter_nom_rep']         = datosIniciales.f01_ter_nom_rep;
                datosForm_inicio['f01_ape_pat_rep']         = datosIniciales.f01_ape_pat_rep;
                datosForm_inicio['f01_ape_mat_rep']         = datosIniciales.f01_ape_mat_rep;
                datosForm_inicio['f01_ape_cas_rep']         = datosIniciales.f01_ape_cas_rep;
                datosForm_inicio['f01_email_rep']           = datosIniciales.f01_email_rep;
                datosForm_inicio['f01_cel_rep']             = datosIniciales.f01_cel_rep;
                datosForm_inicio['f01_telef_rep']           = datosIniciales.f01_telef_rep;
                datosForm_inicio['INT_FEC_SOLICITUD']       = datosIniciales.INT_FEC_SOLICITUD;
                datosForm_inicio['f01_fecha_nac']           = datosIniciales.f01_fecha_nac
                //DATOS INICIALES PERSONA JURIDICA
                datosForm_inicio['f01_rl_nit']              = datosIniciales.f01_rl_nit;
                datosForm_inicio['f01_rl_razon_zocial']     = datosIniciales.f01_rl_razon_zocial;
                datosForm_inicio['f01_tipo_per']            = datosIniciales.f01_tipo_per;
                datosForm_inicio['f01_macro']               = datosIniciales.f01_macro;
                datosForm_inicio['f01_macro_des']           = datosIniciales.f01_macro_des;
                datosForm_inicio['f01_distrito']            = datosIniciales.f01_distrito;
                datosForm_inicio['f01_distrito_desc']       = datosIniciales.f01_distrito_desc;
                datosForm_inicio['f01_zona']                = datosIniciales.f01_zona;
                datosForm_inicio['f01_zona_desc']           = datosIniciales.f01_zona_desc;
                //DATOS DE DIRECCION DEL REPRESENTANTE
                datosForm_inicio['f01_macro_rep']           = datosIniciales.f01_macro_rep;
                datosForm_inicio['f01_macro_desc_rep']      = datosIniciales.f01_macro_desc_rep;
                datosForm_inicio['f01_dist_rep']            = datosIniciales.f01_dist_rep;
                datosForm_inicio['f01_zona_rep']            = datosIniciales.f01_zona_rep;
                datosForm_inicio['f01_id_zona_rep']         = datosIniciales.f01_id_zona_rep;
                datosForm_inicio['f01_zon_rep_valor']       = datosIniciales.f01_zon_rep_valor;
                datosForm_inicio['f01_nom_via_rep']         = datosIniciales.f01_nom_via_rep;
                datosForm_inicio['f01_num_rep']             = datosIniciales.f01_num_rep;
                datosForm_inicio['f01_tipo_viarep']         = datosIniciales.f01_tipo_viarep;
                datosForm_inicio['INT_VIA']                 = datosIniciales.INT_VIA;
                datosForm_inicio['f01_tipo_via']            = datosIniciales.f01_tipo_via;
                datosForm_inicio['f01_nombre_via']          = datosIniciales.f01_nombre_via;
                datosForm_inicio['f01_numero_casa']         = datosIniciales.f01_numero_casa;
                //DATOS INCIALES PERSONA JURIDICA
                datosForm_inicio['INT_RL_FEC_EMISION_DOCUMENTO']    = datosIniciales.INT_RL_FEC_EMISION_DOCUMENTO;
                datosForm_inicio['INT_NACIONALIDAD']                = datosIniciales.INT_NACIONALIDAD;
                datosForm_inicio['INT_RL_FEC_NACIMIENTO']           = datosIniciales.INT_RL_FEC_NACIMIENTO;
                datosForm_inicio['INT_NIT']                         = datosIniciales.INT_NIT;
                datosForm_inicio['INT_RL_TIPO_DOCUMENTO']           = datosIniciales.INT_RL_TIPO_DOCUMENTO;
                datosForm_inicio['f01_rl_num_documento']            = datosIniciales.f01_rl_num_documento;
                datosForm_inicio['INT_RL_FECHA_NAC']                = datosIniciales.INT_RL_FECHA_NAC;
                datosForm_inicio['IDTRAMITE']                       = datosIniciales.IDTRAMITE;
                datosForm_inicio['f01_num_doc_rep']                 = datosIniciales.f01_num_doc_rep;
                datosForm_inicio['f01_num_notaria']                 =  datosIniciales.f01_num_notaria;
                datosForm_inicio['f01_num_not']                     = datosIniciales.f01_num_not;
              
                datosForm_inicio['TIPO']                            = "AE_INT_EMISION";
                datosForm_inicio['INT_NIT']                         = datosIniciales.INT_NIT;
                datosForm_inicio['f01_poder_representante']         = datosIniciales.f01_poder_representante;
                datosForm_inicio['f01_test_cons_sociedad_j']        = datosIniciales.f01_test_cons_sociedad_j;
                datosForm_inicio['file_num_ident']                  = datosIniciales.file_num_ident;
                datosForm_inicio['file_reg_comer']                  = datosIniciales.file_reg_comer;
                datosForm_inicio['file_fund_emp']                   = datosIniciales.file_fund_emp;

                $scope.btover_c = true;
                datosForm_inicio['id_representante']                = datosIniciales.id_representante;
                datosForm_inicio['FILE_FOTOCOPIA_CI']               = datosIniciales.FILE_FOTOCOPIA_CI_RA;
                datosForm_inicio['FILE_FOTOCOPIA_CI_R']             = datosIniciales.FILE_FOTOCOPIA_CI_RR;
                datosForm_inicio['f01_poder_representante']         = datosIniciales.f01_poder_representante;
                datosForm_inicio['f01_test_cons_sociedad_j']        = datosIniciales.f01_test_cons_sociedad_j;
                datosForm_inicio['file_num_ident']                  = datosIniciales.file_num_ident;
                datosForm_inicio['file_reg_comer']                  = datosIniciales.file_reg_comer;
                datosForm_inicio['file_fund_emp']                   = datosIniciales.file_fund_emp;
                datosForm_inicio['INT_AC_TIP_VIA']                  = datosIniciales.INT_AC_TIP_VIA;
            
            }
        }
        datosForm_inicio['IDTRAMITE']           =   $scope.sIdTramiteSeleccionado;     
        $scope.datos = datosForm_inicio;
    };

    $scope.crearTramiteVAE = function() {
        $scope.adicionarServicioGamlp();    
        
    }

	$scope.adicionarServicioGamlp = function(){ 
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        var condiciones = '';
        var dataInicio  =   {};
        var fecha= new Date();
        var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var sIdServicio = 48;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sFechaTramite = fechactual;
        dataInicio.INT_FORM_ALMACENADO='C';
        var datosSerializados   =  JSON.stringify(dataInicio);
        $.blockUI();
        try{
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
            crea.adiciona_Tramites_Formulario(function(res){
                x = JSON.parse(res);
                response = x.success;
                if(response.length  > 0){
                    sessionService.set('IDTRAMITE', response[0].sp_insertar_formulario_tramites);
                    $.unblockUI();
                    $scope.ListadoTramitesCiudadano();
                    swal('', 'Registro almacenado correctamente', 'success');
                    sessionService.destroy('NROTRAMITE');
                    sessionService.destroy('NROTRAMITEID');
                    sessionService.destroy('IDPROCESO');
                    $scope.btnEnviarForm    =   false;
                    $scope.btnGuardarForm   =   false;
                }
                else{
                    $.unblockUI();
                }
            });
            }catch(e){
                console.log('*Error*', e);
                $.unblockUI();
            }
    }

    $scope.ListadoTramitesCiudadano = function(){
        sIdCiudadano = sessionService.get('IDSOLICITANTE');
        try {
            var rData = new rcTramitesAe();
            rData.oid = sIdCiudadano;
            rData.listaraevirtual(function(res){
                r = JSON.parse(res);
                results = r.success;
                angular.forEach(results,function(val, index){
                    if(val['form_contenido'])
                    {
                        results[index].datos=JSON.parse(val['form_contenido']);
                    }
                });
                $scope.tramitesUsuario = results;
                var data = results;
                $scope.tablaTramites.reload(); 
                if(tramite){
                    $scope.seleccionarTramite(tramite);
                }
            });
        } catch(error){
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
        getData: function($defer, params) {
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

    $scope.seleccionarTramite = function (tramite) {
        $scope.template =   "";
        $scope.seleccionarTramiteRender(tramite);    
    }

    $scope.obtenerContribuyente = function(){
        var tipoContribuyente     =   sessionService.get('TIPO_PERSONA');
    	var ciDocumento          =   '';//sessionService.get('CICIUDADANO'));
        var nitDocumento          =   '';//sessionService.get('CICIUDADANO'));
        var sAccion  
        if(tipoContribuyente == 'NATURAL'){
            ciDocumento          =   sessionService.get('CICIUDADANO');
            sAccion              =  'C01';
        }else if(tipoContribuyente == 'JURIDICO'){
            nitDocumento         =   sessionService.get('NITCIUDADANO');
            sAccion              =  'C02';
        }
        var conGenesis  =   new gLstDatos();
        conGenesis.idContribuyente = "";
        conGenesis.clase="";
        conGenesis.padron="";
        conGenesis.identificacion=ciDocumento;//'40852017'
        conGenesis.primerNombre="";
        conGenesis.primerApellido="";
        conGenesis.segundoApellido="";
        conGenesis.nit=nitDocumento;
        conGenesis.empresa="";
        conGenesis.p_accion=sAccion;
        conGenesis.lstDatosContribuyente(function(resultado){
            console.log('resultado111:: ', resultado);

            resultadoApi = JSON.parse(resultado);
            console.log('resultadoApi:: ', resultadoApi);
            if (resultadoApi.success) {
            	console.log('resultadoApi.success::: ', resultadoApi.success);
                var response    =   resultadoApi;
                $scope.txtMsgConexionGen    =   "";
                $scope.dataGenesisCidadano  =   response.success.dataSql;
                $rootScope.datosGenesis = response.success.dataSql;
                console.log('$scope.dataGenesisCidadano: ', $scope.dataGenesisCidadano);
                console.log('$rootScope.dataGenesisCidadano: ', $rootScope.dataGenesisCidadano);

                
            } else {
                $scope.txtMsgConexionGen    =   "Se ha producido un problema de conexion al cargar los datos";
                $.unblockUI();
                //swal(resultadoApi.error.message);
            }
        });
    };

    $scope.listadoActividadesEconomicas = function () {
        $scope.datos.rdTipoTramite = "RENOVACION";            
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        var idContribuyente =   $scope.dataGenesisCidadano[0].idContribuyente;
        var contribuyente   =   new gLstActividadEconomica();
        contribuyente.idContribuyente   =   idContribuyente;
        contribuyente.tipo  =   'N'; //N para natural y J para Juridico
        contribuyente.lstActividadEconomica(function(resultado){ 
            $.unblockUI(); 
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
            	//listado de Actividades Economicas
                var response    =   resultadoApi;
                if(response.success.dataSql.length > 0){
                    $scope.trmUsuario = response.success.dataSql;
                } 
            } else {
                 swal('', "Datos no Encontrados !!!", 'warning');
            }
        }); 
    };

    $scope.seleccionarTramiteRender = function (tramite) {
        $scope.procesoSeleccionado   =   tramite.vdvser_id;
        $rootScope.tramiteId = tramite.vtra_id;
        sessionService.set('IDTRAMITE', $rootScope.tramiteId);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        $scope.template = "";
        $scope.formulario = "mostrar";
        var vsidservicio = "";
        var tipoPersona =   sessionService.get('TIPO_PERSONA');
        var sidservicio =   $scope.procesoSeleccionado;
        if(tipoPersona == 'NATURAL' && sidservicio == 48){
            vsidservicio =   0;
        }
        if(tipoPersona == 'JURIDICO' && sidservicio == 48){
            vsidservicio = 1;
        }

        if (tramite.venviado == "SI") {
            $scope.template         =   $scope.templates[vsidservicio];
        } else {
            $scope.template         =   $scope.templates[vsidservicio];
        }

        if(tipoPersona == 'NATURAL'){
            $scope.recuperarSerializarInfo(tramite);
        }
        else{
            $scope.recuperarSerializarInfo(tramite);
        }

    };

     $scope.recuperarSerializarInfo = function(tramite){
        $scope.btover_c = true;     
        var sIdTramite = tramite.vtra_id;
        $scope.sIdTramiteSeleccionado = tramite.vtra_id;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
        var sIdServicio = sessionService.get('IDSERVICIO');
        var parametros  = {
                "container":"RC_CLI",
                "folder_path": sIdTramite
        };
        try {
            var rData = new datosFormularios();
            rData.frm_tra_id_ciudadano = sIdCiudadano;
            rData.frm_tra_dvser_id = sIdServicio;
            rData.frm_idTramite = sIdTramite;
            rData.splistafrmdatos(function(res){
                r = JSON.parse(res);
                results = r.success;
                var formalmacenado    = "";
                if(results){
                    datoform = JSON.parse(results[0].form_contenido); 
                    formalmacenado =   ((typeof(datoform.INT_FORM_ALMACENADO)    == 'undefined' || datoform.INT_FORM_ALMACENADO    == null) ? '' : datoform.INT_FORM_ALMACENADO);
                    if(formalmacenado == 'G'){
                        $rootScope.campoidform= results[0].form_id;
                        datos = JSON.parse(results[0].form_contenido);
                        $scope.datos = datos;
                        if($scope.datos.f01_tipo_per == 'NATURAL' || $scope.datos.f01_tipo_per == 'N'){
                            $scope.datos.FILE_FOTOCOPIA_CI = $scope.datosinic.FILE_FOTOCOPIA_CI;
                            $scope.datos.FILE_FOTOCOPIA_CI_R = $scope.datosinic.FILE_FOTOCOPIA_CI_R;
                            $scope.datos.FILE_FACTURA_LUZ = $scope.datosinic.FILE_FACTURA_LUZ;
                        }else{
                             if($scope.datos.f01_tipo_per == 'JURIDICO' || $scope.datos.f01_tipo_per == 'J'){
                                $scope.datos.FILE_FOTOCOPIA_CI = $scope.datosIniciales.FILE_FOTOCOPIA_CI_RA;
                                $scope.datos.FILE_FOTOCOPIA_CI_R = $scope.datosIniciales.FILE_FOTOCOPIA_CI_RR;
                            }    
                        }
                        if($scope.datos.g_origen == 'POS/EMPR2017'){
                           if($scope.datos.swpublicidad == 'CP' && $scope.datos.sw_publicidad == 'CP'){
                           }
                        }
                        $scope.datos.IDTRAMITE = sIdTramite;
                        ///$scope.datos.doc_Adjuntos = datoFinalA;
                        $scope.publicid = [];
                        $scope.publicid = $scope.datos.publicidad;
                        $rootScope.looo = $scope.datos.INT_AC_longitud;
                        $rootScope.laaa = $scope.datos.INT_AC_latitud;
                        $scope.nroRegistros = datos.length;
                        }else 
                            if(formalmacenado == 'C'){
                                $scope.datos.IDTRAMITE = sIdTramite;
                                $rootScope.campoidform= results[0].form_id;
                                $scope.formRegularRegistrado = JSON.parse(results[0].form_contenido);  
                                $scope.datos.INT_FORM_ALMACENADO = 'C';
                                $scope.iniciandoDatos();
                            }
                            else{
                                $scope.nroRegistros = 0;
                                $scope.datos = "";
                                $scope.adjuntosArray = "";
                                $scope.iniciandoDatos();                        
                                sessionService.set('IDTRAMITE', sIdTramite);
                            }
                }
                $.unblockUI();
            });
        } catch(error){
            console.log("Error Interno : ", error);
        }
    };

       $scope.recuperandoDatosGenesis = function(){
        var tipoContribuyente   =   sessionService.get('TIPO_PERSONA');
        var ciDocumento =   '';
        var nitDocumento =   '';
        var sAccion = '';

        if(tipoContribuyente == 'NATURAL'){
            ciDocumento          =   sessionService.get('CICIUDADANO');
            sAccion              =  'C01';
        }else if(tipoContribuyente == 'JURIDICO'){
            nitDocumento         =   sessionService.get('NITCIUDADANO');
            sAccion              =  'C02';
        }
        var conGenesis  =   new gLstDatos();
        conGenesis.idContribuyente = "";
        conGenesis.clase="";
        conGenesis.padron="";
        conGenesis.identificacion=ciDocumento;//'40852017'
        conGenesis.primerNombre="";
        conGenesis.primerApellido="";
        conGenesis.segundoApellido="";
        conGenesis.nit=nitDocumento;
        conGenesis.empresa="";
        conGenesis.p_accion=sAccion;
        try{
            conGenesis.lstDatosContribuyente(function(resultado){
                resultadoApi = JSON.parse(resultado);
                if (resultadoApi.success) {
                    var response    =   resultadoApi;
                    $scope.txtMsgConexionGen    =   "";
                    if(response.success.dataSql.length > 0){
                        $scope.dataGenesisCidadano  =   response.success.dataSql;
                    } else {
                        $scope.dataGenesisCidadano  =  '';
                    }
                } else {
                    $scope.txtMsgConexionGen    =   "Se ha producido un problema de conexion al cargar los datos";
                    $.unblockUI();
                    //swal(resultadoApi.error.message);
                }
            });
        }catch(e){
            $scope.txtMsgConexionGen    =   "Se ha producido un problema de conexion al cargar los datos";
        };
    };

     $scope.guardarDatos = function(obj){
        var fechactual          = obtFechaActual.obtenerFechaActual();
         try {
            var datosSerializados   =  JSON.stringify(obj);
            var idCiudadano         = sessionService.get('IDSOLICITANTE');
            var idTramite           = sessionService.get('IDTRAMITE');
            var idServicio          = sessionService.get('IDSERVICIO');
            var Parametros = new datosFormularios();
            Parametros.frm_tra_dvser_id = idServicio;
            Parametros.data_json = datosSerializados;
            Parametros.frm_tra_id_ciudadano = idCiudadano;
            Parametros.frm_tra_id_usuario = 1;
            Parametros.frm_idTramite = idTramite;
            $rootScope.btnGuardarForm   =   true;
            Parametros.sp_crear_datos_formulario(function(results){ 
                results = JSON.parse(results);
                results = results.success;
                if(results.length > 0){
                    $.unblockUI();
                    $scope.btnEnviarForm    =   false;
                    $scope.btnGuardarForm   =   false;
                   
                    swal('', "Formulario almacenado", 'success');
                }else{
                    $.unblockUI();
                    swal('', "Formulario no almacenado", 'error');
                }
            }); 
        }catch(e){
            $scope.btnGuardarForm   =   false;
            $.unblockUI();
        }
    };

    $scope.inicioServiciosVAE = function () {
       $scope.recuperandoDatosInicialesCiudadano();
       $scope.ListadoTramitesCiudadano();
       $scope.obtenerContribuyente();
    };

});