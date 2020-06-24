function permisosController($scope, $rootScope ,$routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual, $q) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

    $scope.tablaTramites        =   {};
    $scope.tramitesUsuario      =   [];
    $scope.datosinic = {};
    $rootScope.tramiteId = "";
    $scope.templates =
    [ 
      { name: 'template1.html', url: '../../../app/view/servicios/varios/formularios/movilidad/socilicitudCirculacion/permisoCirculacion/permisoCirculacion.html'}
    ];

    $scope.serviciosTipoTramite = [
        { name: 'Solicitud de permiso de transporte', id:'54'}
    ];

    $scope.seleccionarProceso = function(proceso){
        $scope.btnCrearBlk = "mostrar";
        if (proceso.name == "Habilitación de Plataforma Comercial   [ Proximamente ]") {
            $scope.btnCrearBlk = "";
        } 
        $scope.procesoSeleccionado  =   proceso.id;
        if($scope.procesoSeleccionado == 10){
            sidservicio =   10; 
        }
        
        $scope.procesoSeleccionado  =   proceso.id;
        $scope.btnNuevoTramtite     =   false;      
    }; 

     $scope.crearTramiteVAE = function(idproceso) {
        if($scope.procesoSeleccionado != ''){
            $scope.adicionarServicioGamlp(idproceso); 
        }
    }

    $scope.adicionarServicioGamlp = function(idproceso){ 
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        var condiciones = '';
        var dataInicio  =   {};
        var fecha= new Date();
        var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var sIdServicio = idproceso;
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
                /*if(tramite){
                    $scope.seleccionarTramite(tramite);
                }*/
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

   
    //nuevo de paquete 
    $scope.addProducto = function (tramite) {
        $scope.template =   "";
        $scope.seleccionarProductoRender(tramite);    
    }
    $scope.seleccionarProductoRender = function (tramite) {
        sessionService.set('IDAE', tramite.vidae);
        sessionService.set('IDTRAMITE', tramite.vtra_id);
        sessionService.set('CELULARAE', tramite.datos.f01_cel_prop);
        $scope.template         =   $scope.templates[3];
        
        //$scope.open_mapa_ae();


        /*
        $scope.procesoSeleccionado   =   tramite.vdvser_id;
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        $scope.template = "";
        $scope.formulario = "mostrar";
        var vsidservicio = "";
        var tipoPersona =   sessionService.get('TIPO_PERSONA');
        var sidservicio =   $scope.procesoSeleccionado;


        if (tramite.venviado == "SI") {
            $scope.template         =   $scope.templates[vsidservicio];
        } else {
            $scope.template         =   $scope.templates[vsidservicio];
        }*/

        /*if(tipoPersona == 'NATURAL'){
            $scope.recuperarSerializarInfo(tramite);
        }
        else{
            $scope.recuperarSerializarInfo(tramite);
        }*/

    };

    // nuevo de paquete fin
     $scope.seleccionarTramite = function (tramite) {
       //$scope.template =   "";
        $scope.seleccionarTramiteRender(tramite);    
    }

    $scope.seleccionarTramite = function (tramite) {
        console.log("seleccionar tramite::: ", tramite);
        $scope.procesoSeleccionado   =   tramite.vdvser_id;
        $rootScope.tramiteId = tramite.vtra_id;
        sessionService.set('IDTRAMITE', tramite.vtra_id);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        $scope.template = "";
        $scope.formulario = "mostrar";
        var vsidservicio = "";
        var tipoPersona =   sessionService.get('TIPO_PERSONA');
        var sidservicio =   $scope.procesoSeleccionado;
        if(tipoPersona == 'NATURAL' && sidservicio == 54){
            vsidservicio =   0;
        }
        if(tipoPersona == 'JURIDICO' && sidservicio == 54){
            vsidservicio = 0;
        }
        if (tramite.venviado == "SI") {
            $scope.template         =   $scope.templates[vsidservicio];
        } else {
            $scope.template         =   $scope.templates[vsidservicio];
        }

        $scope.recuperarSerializarInfo(tramite);
       
    };

    $scope.recuperarDatosRegistro = function(){
        var datosini = {};
        var datosCiudadano = new rcNatural();
        datosCiudadano.oid = sessionService.get('IDSOLICITANTE');

        datosCiudadano.datosCiudadanoNatural(function(resultado){ 
            results = JSON.parse(resultado);
           if (results[0].dtspsl_file_fotocopia_ci) {
                $scope.btover=true;
            }

            if (results[0].dtspsl_file_fotocopia_ci_r) {
                $scope.btover1=true;
            }else{
            }
            
                
            if(results[0].dtspsl_tipo_persona == "NATURAL") 
            {                   
                var cidate = results[0].dtspsl_file_fotocopia_ci;
                datosini['FILE_FOTOCOPIA_CI'] = results[0].dtspsl_file_fotocopia_ci;
                datosini['FILE_FOTOCOPIA_CI_R'] = results[0].dtspsl_file_fotocopia_ci_r;
                datosini['FILE_FACTURA_LUZ'] = results[0].dtspsl_file_factura_luz;
            }
            else if(results[0].dtspsl_tipo_persona == "JURIDICO"){ 
                datosini['FILE_FOTOCOPIA_CI'] = results[0].dtspsl_file_fotocopia_ci;
                datosini['FILE_FOTOCOPIA_CI_R'] = results[0].dtspsl_file_fotocopia_ci_r;
                $.unblockUI(); 
            }        
        });

        $scope.datosinic = datosini;
        $rootScope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datosinic.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
        $rootScope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datosinic.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
        $rootScope.archivoLuz = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datosinic.FILE_FACTURA_LUZ + "?app_name=todoangular";
        $.unblockUI();
    };


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
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                var response    =   resultadoApi;
                $scope.txtMsgConexionGen    =   "";
                $scope.dataGenesisCidadano  =   response.success.dataSql;
                $rootScope.datosGenesis = response.success.dataSql;
            } else {
                $scope.txtMsgConexionGen    =   "Se ha producido un problema de conexion al cargar los datos";
                $.unblockUI();
                //swal(resultadoApi.error.message);
            }
        });
    };

    $scope.recuperarSerializarInfo = function(tramite){
        $scope.btover_c = true;  
        $scope.recuperarDatosRegistro();    
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
                                //sessionService.set('IDTRAMITE', sIdTramite);
                            }
                }       
                //$rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                setTimeout(function(){
                    $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                    $rootScope.$broadcast('inicializarGrillaAE', [{'datos':$scope.datos, 'venviado':tramite.venviado}]);
                    $rootScope.$broadcast('inicializarHtmlForm', tramite);

                 }, 4000);
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
        obj.INT_FORM_ALMACENADO = 'G';
        obj.f01_tipo_per = sessionService.get('TIPO_PERSONA');
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

    $scope.open_mapa_ae = function()
    {
        setTimeout(function()
        {
            var latitud = $scope.datos.INT_AC_latitud;
            var longitud = $scope.datos.INT_AC_longitud;
            $("#map_principal").empty();

            $scope.map = new ol.Map
            ({
              target: 'map_principal',
              layers: [
                        new ol.layer.Group({
                                            title: 'Mapas Base',
                                            layers: [
                                                      osm,
                                                      municipios,
                                                      zonas_tributarias,
                                                      vias  
                                                    ]
                                          }),
                        new ol.layer.Group({
                                            title: 'Capas',
                                            layers: [
                                                      //macrodistritos,
                                                      vectorLayerZonas,
                                                      vectorLayer
                                                    ]
                                          })
                      ],

              view: new ol.View({
                zoom: 16,
                center: ol.proj.fromLonLat([-68.133555,-16.495687])
              })
            });
              
            var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: 'Leyenda'});
            $scope.map.addControl(layerSwitcher);

            vectorLayer.getSource().clear();
            if (latitud != undefined)
            {
                var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud])));
                feature.setStyle(iconStyle);
                vectorSource.addFeature(feature);
                $scope.map.getView().setCenter(ol.proj.fromLonLat([longitud, latitud]));
                $scope.map.getView().setZoom(15);
            }

            $scope.map.on('click', function (evt)
            {
                datos = {};
                vectorSource.clear();
                if(jsonURLS)
                {
                    var url_sit    =   jsonURLS.SIT_GEO;
                }
                var url_r = url_sit+'/geoserver/wms';

                var viewResolution = view.getResolution();
                var coord = $scope.map.getCoordinateFromPixel(evt.pixel);
                var centro = ol.proj.transform(coord,'EPSG:3857',epsg32719);
                var wkt = '';
                var centro_1 = ol.proj.transform(coord,'EPSG:3857',epsg4326);
                var latitud = centro_1[1];
                var longitud = centro_1[0];
                wkt = "POINT("+centro[0]+" "+centro[1]+")";

                datos.latitud = latitud;
                datos.longitud = longitud;
              
                var url = url_sit+'/geoserver/sit/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sit:zonasref&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(wkb_geometry,'+ wkt +')';   
                $scope.datos.INT_AC_latitud=latitud;
                $scope.datos.INT_AC_longitud=longitud;
                setTimeout(function()
                {
                    $.ajax({
                          url: url,
                          //data: parameters,
                          type: 'GET',
                          dataType: 'jsonp',
                          jsonpCallback: 'getJson',
                          success: function (data)
                          {
                
                            if(data.features.length == 1)
                            {                         
                                var distrito = data.features[0].properties.distrito;
                                var idMacrodistrito = data.features[0].properties.macro;                  
                                var macrodistrito =  data.features[0].properties.macrodistrito;                
                                var zona = data.features[0].properties.zona;
                                var codigo_zona = data.features[0].properties.codigozona;
                                datos.zona = zona;
                                datos.cod_zona_sit = codigo_zona;
                                datos.distrito = distrito;
                                datos.macrodistrito = macrodistrito;
                                
                                var n_genesis = geo_id_genesis.length;
                                for (var i=0;i<n_genesis;i++)
                                {
                                    if(geo_id_sit_servicio[i ]=== codigo_zona )
                                    {
                                        cod_zona_genesis = geo_id_genesis[i];
                                        datos.cod_zona_genesis = cod_zona_genesis;
                                    }
                                } 
                            }
                            else
                            {
                                console.log("ningun resultado para zonas");
                            }
                          },
                          error: function (data)
                          { 
                            console.log(data);
                          }   
                        });
                },500);
            
                var feature = new ol.Feature(
                      new ol.geom.Point(ol.proj.fromLonLat(centro_1))
                );
                    
                feature.setStyle(iconStyle);
                vectorSource.addFeature(feature);

                //console.log("JSON DATOS",datos);
                return datos;
            });
            
        },550);
    };

    $scope.buscar_ubicacion_p = function()
    {
      var nombre_1 = new Array();
      var f = '';
      var nombre = $('#busqueda_p').val();
      nombre = nombre.toUpperCase();
      var ca = "CALLE ";
      ca = ca.concat(nombre);
      var c = 0;
      /////////////////////////////
      var tipo = "lugares";
      var data = '';
      ///////////////////////////////
      if(nombre==='')
      {
        var obj = {'nombre':'INTRODUZCA DATOS!!!...'};
        //console.log("Vacio :",obj);
        vectorLayerZonas.getSource().clear();
      }
      else
      {  
        if(tipo == 'lugares')
        {
          $scope.map.removeLayer(vectorLayerZonas);
          for (var i=0;i<geo_zonas.features.length;i++)
          {
            var nombre_zona =  geo_zonas.features[i].properties.zonaref;
            var x_c = geo_zonas_centroides.features[i].geometry.coordinates[0];
            var y_c = geo_zonas_centroides.features[i].geometry.coordinates[1];
            if(nombre === nombre_zona)
            {
              c=c+1;
              var geo_zona =  geo_zonas.features[i];
              var xx = x_c;
              var yy = y_c;
            }
          }
          if(c>0)
          {
            geo_zona = JSON.stringify(geo_zona);
            vectorLayerZonas.setSource(new ol.source.Vector({
                                                         features: (new ol.format.GeoJSON({defaultDataProjection:'EPSG:3857'})).readFeatures(geo_zona)
            }));

            vectorLayerZonas.setStyle(myStyleZonas);

            $scope.map.addLayer(vectorLayerZonas);
            $scope.map.getView().setCenter([xx,yy]);
            $scope.map.getView().setZoom(15);

            setTimeout(function(){
              vectorLayerZonas.getSource().clear();
            },2400);

          }
        }
        if(c==0)
        {
          var obj = {'nombre':'NO EXISTEN REGISTROS!!!'};
          //console.log("Vacio :",obj);
        }
      }   
    }

    $scope.macrodistritos = function(){
        $scope.aMacrodistritos = {};
        var datosP = new macrodistritoLst();
        datosP.obtmacro(function(resultado){
            data = JSON.parse(resultado);
            if(data.success.length > 0){
                $scope.aMacrodistritos = data.success;
            }else{
                $scope.msg = "Error !!";
            }
        });
    };

     $scope.distritoZonas = function(idMacroJ){        
        var idMacro = "";
        if($scope.aMacrodistritos){
            angular.forEach($scope.aMacrodistritos, function(value, key) {
                if(value.mcdstt_macrodistrito == idMacroJ){
                    idMacro = value.mcdstt_id;
                }
            });
        }        
        $scope.idMacro = idMacro;
        $scope.datos.f01_macro_act    =   idMacro;
        $scope.datos.INT_AC_MACRO_ID = idMacro;
        $scope.aDistritoZona = {};
        try{
            var parametros = new distritoZona();
            parametros.idMacro = idMacro;
            parametros.obtdist(function(resultado){
                data = JSON.parse(resultado);
                if(data.success.length > 0){
                    $scope.aDistritoZona = data.success;
                    $scope.desabilitadoV=true;
                    $scope.desabilitadoNo=true;
                }else{
                    $scope.msg = "Error !!";
                }
            });
        }catch(error){
            $scope.desabilitadoZ=true;
            $scope.desabilitadoV=true;
            $scope.desabilitadoNo=true;
        }
    };

    $scope.cargarNombVia = function(tipoVia, idZona) {
        try{
            var nomvia = new aelstNombreVia();
            nomvia.idzona =  $scope.datos.f01_zona_act;
            nomvia.tipovia = tipoVia;
            nomvia.aelst_NombreVia(function(res){
                x = JSON.parse(res);
                response = x.success.data;
                if (response.length > 0) {
                    $scope.datosNombVia = response;
                }
            });
        }catch (error){
            console.log('datos error via');
        }
    };

    $scope.actulizarIdDistrito  =   function(zonadescrip){
        $scope.desabilitadoV=false;
        var idDistrito  = "";
        var idZona      = "";
        var distNombre  = zonadescrip;
        if($scope.aDistritoZona){
            angular.forEach($scope.aDistritoZona, function(value, key) {
                if(value.dist_nombre == distNombre){
                    idDistrito  =   value.dist_dstt_id;
                    idZona      =   value.dist_id;
                }
            });
        }
        $scope.datos.f01_dist_act    =   idDistrito;
        $scope.datos.INT_AC_DISTRITO    =   idDistrito;
        $scope.datos.INT_AC_ID_ZONA     =   idZona;
        $scope.datos.f01_zona_act       = idZona;
        $scope.datos.f01_zona_act_descrip = zonadescrip;
        $scope.datos.INT_ID_ZONA        =   idZona;
        $scope.desabilitadoNo=true;
    };

    $scope.cargarNombViaTxt = function(valor) {
        if (valor == "NINGUNO"){
            $scope.datos.f01_factor = "VA";
        } else {
            $scope.datos.f01_factor = "TM";
        }
    };

    $scope.GetValueMacrodistrito = function (macro) {
        var e = document.getElementById("f01_macro_act");
        $scope.datos.f01_macro_act_descrip = e.options[e.selectedIndex].text;
    }
      
     $scope.$on('api:ready',function(){
        $scope.recuperandoDatosInicialesCiudadano();
        $scope.ListadoTramitesCiudadano();
        $scope.obtenerContribuyente();
       
    });

    $scope.inicioServiciosVAECopia = function () {
       $scope.recuperandoDatosInicialesCiudadano();
       $scope.ListadoTramitesCiudadano();
       $scope.obtenerContribuyente();
       $scope.macrodistritos();
    };

    ///////////*************************panchito inicio ********************/
    $scope.generarDocumentoPhp = function (){
        console.log("entra declaracion jurada");
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
        if(tipoPersona == 'NATURAL' || tipoPersona == 'N'){
            oidCiudadano    = sessionService.get('IDSOLICITANTE');
            datosCiudadano  = (sessionService.get('US_NOMBRE')+' '+sessionService.get('US_PATERNO')+' '+sessionService.get('US_MATERNO'));
            datosci         = sessionService.get('CICIUDADANO');
            datosexpedido   = sessionService.get('CIEXPEDIDO');
            datoForm4 = JSON.stringify($rootScope.datosForm401);
            $.ajax({
                url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdfTV.php',
                type:"post",
                data:{
                    "soid": oidCiudadano,
                    "sorigen": "IGOB",
                    "stipo": tipoPersona,
                    "usuario": datosCiudadano,
                    "cedula":  datosci,
                    "expedido": datosexpedido,
                    "empresa": '',
                    "nit": '',
                    "fecha": $scope.fechafinalserver,
                    "hora": $scope.sHoraFinal,
                    "data": datoForm4,
                    "stipo_form": 'DECLARACIONTV'
                },
                success:function(response){
                    console.log("response:: ", response);
                    var urlData = response;
                    $rootScope.decJuradaNaturalPermiso = urlData;
                    console.log("entra declaracion jurada: ", $rootScope.decJuradaNaturalPermiso);

                    $scope.InsertarDocumentoTv(response);
                    $rootScope.datosEnv.declaracion_jurada = urlData;
                    $scope.datos.declaracion_jurada = urlData;
                    document.signupForm.btnFormLicencia.disabled=false;
                    $scope.guardarDatos($rootScope.datosEnv);
                    $.unblockUI();
                }
            });
        } else {
            if(tipoPersona == 'JURIDICO' || tipoPersona == 'J'){
                oidCiudadano    = sessionService.get('IDSOLICITANTE');
                datosCiudadano  = $scope.datosIniciales.f01_pri_nom_rep +' '+ $scope.datosIniciales.f01_ape_pat_rep + ' ' + $scope.datosIniciales.f01_ape_mat_rep;
                datosci         = $scope.datosIniciales.f01_num_doc_rep;
                datosexpedido   = $scope.datosIniciales.f01_expedido_rep;
                dEmpresa        = $scope.datosIniciales.f01_raz_soc_per_jur;
                dnit            = $scope.datosIniciales.f01_num_doc_per_jur;
                datoForm4 = JSON.stringify($rootScope.datosForm401);
                $.ajax({
                    url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdfTV.php',
                    type:"post",
                    data:{
                        "soid": oidCiudadano,
                        "sorigen": "IGOB",
                        "stipo": tipoPersona,
                        "usuario": datosCiudadano,
                        "cedula":  datosci,
                        "expedido": datosexpedido,
                        "empresa": '',
                        "nit": '',
                        "fecha": $scope.fechafinalserver,
                        "hora": $scope.sHoraFinal,
                        "data": datoForm4,
                        "stipo_form": 'DECLARACIONTV'
                    },
                    success:function(response){
                        var urlData = response;
                        $rootScope.decJuradaNatural = urlData;
                        $scope.InsertarDocumentoTv(response);
                        $rootScope.datosEnv.declaracion_jurada = urlData;
                        $scope.datos.declaracion_jurada = urlData;
                        document.signupForm.btnFormLicencia.disabled=false;
                        $scope.guardarDatos($rootScope.datosEnv);
                        $.unblockUI();
                    }
                });
            }
        }
    };
    $scope.InsertarDocumentoTv = function(urlData){
        var sDocSistema     =   "IGOB247";
        var sDocProceso     =   "GESTOR EMPRESARIAL - DECLARACION JURADA";
        var sDocId          =   1;
        var sDocCiNodo      =   "CU";
        var sDocDatos       =   "";
        var sDocUrl         =   urlData;
        var sDocVersion     =   1;
        var sDocTiempo      =   400;
        var sDocFirmaDigital=   0;
        var sDocUsuario     =   sessionService.get('IDSOLICITANTE');
        var sDocTipoDoc     =   "pdf";
        var sDocTamDoc      =   "";
        var sDocNombre      =   "GESTOR EMPRESARIAL - DECLARACION JURADA";
        var sDocTpsId       =   0;
        var sDocUrlLogica   =   urlData;
        var sDocAcceso      =   "";
        var sDocTipoExt     =   "";
        var sDocNroTramNexo =   "";
        var sCasoCodigo     =   "0";
         var documento  =   new gDocumentosIgob();
            documento.doc_sistema = sDocSistema;
            documento.doc_proceso = sDocProceso;
            documento.doc_id = sDocId;
            documento.doc_ci_nodo = sDocCiNodo;
            documento.doc_datos = sDocDatos;
            documento.doc_url = sDocUrl;
            documento.doc_version = sDocVersion;
            documento.doc_tiempo = sDocTiempo;
            documento.doc_firma_digital = sDocFirmaDigital;
            documento.doc_usuario = sDocUsuario;
            documento.doc_tipo_documento = sDocTipoDoc;
            documento.doc_tamanio_documento = sDocTamDoc;
            documento.doc_nombre = sDocNombre;
            documento.doc_tps_doc_id = sDocTpsId;
            documento.doc_url_logica = sDocUrlLogica;
            documento.doc_acceso = sDocAcceso;
            documento.doc_tipo_documento_ext = sDocTipoExt;
            documento.doc_nrotramite_nexo = sDocNroTramNexo;
            documento.doc_id_codigo = sCasoCodigo;
            documento.insertarDocIgob(function(resultado){
                resultadoApi = JSON.parse(resultado);                           
                if (resultadoApi.success) {
                    srespuesta  =   "TRUE";
                    return srespuesta;
                } else {
                    $.unblockUI();
                    sweet.show(resultadoApi.error.message);
                    srespuesta  =   "FALSE";                          
                    return srespuesta;
                }
            });

    }
    ///********************* panchito fin ********************/

};