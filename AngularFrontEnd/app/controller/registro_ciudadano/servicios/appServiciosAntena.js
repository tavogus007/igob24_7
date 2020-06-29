
app.controller('serviciosAntenaController', function ($scope, $rootScope, $routeParams, $location, $http, Data, 
    sessionService,CONFIG, LogGuardarInfo,  $element, sweet, ngTableParams, $filter, registroLog, filterFilter,
    FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.txtMsgConexionGen    =   '';
    $scope.txtCiudadanoExiste   =   '';
    $rootScope.looo =   '';
    $rootScope.laaa =   '';
    $scope.tablaTramites        =   {};
    $scope.tramitesUsuario      =   [];
    $scope.servicio = 9;
    $scope.templates =
    [ { name: 'template0.html', url: '../../../app/index.html'},//cuando no existe en el la base de datos
      { name: 'template1.html', url: '../../../app/view/servicios/varios/formularios/solicitudAntenas/solicitud.html'}, //formulario juegos
      { name: 'template2.html', url: '../../../app/view/servicios/varios/formularios/solicitudAntenas/juridico/solicitudJ.html'}
    ];
    
    $scope.startDateOpen1 = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startDateOpened1 = true;
    };

     $scope.serivicosInternet = [ 
        { name: 'Verificación de Documentos para Autorización de Viaje', id:'1'}
    ];


     $scope.crearTramiteAntenas   =   function(){
        if($scope.serivicosInternet){            
            var idTipoTramite   =   1;
            $scope.adicionarServicioGamlp(idTipoTramite);
        }

        contador2=0;
        contador3=0;
        contador22=0;
        contador33=0;
        contador222=0;
        contador333=0;

        href="#registro_ciudadano|servicios|indexAntena.html"
        $scope.mostrarboton = false;
    };
      $scope.ser_idServicio;
      $scope.adicionarServicioGamlp = function(datos){   
        var fecha = new Date();
        var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

        $.blockUI();
        var ser_idServicio = new reglasnegocio();
        var desIdServicio = "ANTENA";
        ser_idServicio.identificador = "RCCIUDADANO_ANTENA-20-8";
        ser_idServicio.parametros = '{"desIdServicio":"'+desIdServicio+'"}';
        ser_idServicio.llamarregla(function(resp_servicio){
            if (resp_servicio != "\"[{}]\"") {
                resp_servicio = JSON.parse(resp_servicio);
                $scope.ser_idServicio = resp_servicio[0].serdv_id;
                var sIdServicio = resp_servicio[0].serdv_id;
                var sIdCiudadano = sessionService.get('IDSOLICITANTE');
                var sFechaTramite = fechactual;
                var idusu = 3;
                var aServicio = new reglasnegocio();
                aServicio.identificador = "RCCIUDADANO_68";
                //aServicio.id = 68;
                aServicio.parametros ='{"frm_tra_dvser_id":"' + sIdServicio + '","frm_tra_id_ciudadano":"' + sIdCiudadano + '","frm_tra_fecha":"' + sFechaTramite + '","frm_tra_enviado":"NO","frm_tra_id_usuario":"' + idusu + '"}';
                aServicio.llamarregla(function(data){
                    $.blockUI();
                    $scope.tramitesCiudadano();
                    swal('', 'Tramite creado correctamente', 'success');
                    $.unblockUI();
                });
            }else {
                resp_servicio = "";
                swal('', "Error en obtener el id Servicio por favor comuniquese con el administrador", 'warning');
            }
        });
        
    }
    $scope.ser_id_servicio;
    $scope.tramitesCiudadano = function(){   
        sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sparam = new reglasnegocio();
        sparam.identificador = "RCCIUDADANO_269";
        //sparam.id = 269;
        $scope.razonsocial = sessionService.get('US_NOMBRE');
        sparam.parametros='{"sidciudadano":"' + sIdCiudadano + '"}';
        sparam.llamarregla(function(results){
            if (results != "\"[{}]\"") {
                results = JSON.parse(results);
                $scope.ser_id_servicio = results[0].vdvser_id;
            }else {
                results = "";
                swal('', "No se encontraron Tramites creados", 'warning');
            }
            $scope.tramites = results;     
            angular.forEach(results,function(val, index){

            if(val['form_contenido'])
            {
            results[index].datos = val['form_contenido'];
                //results[index].datos = JSON.parse(val['form_contenido']);
            }
         });
            $scope.tramitesUsuario = results;
            $scope.tablaTramites.reload();

        });
    };

    //RECUPERANDO DATOS DEL REGISTRO CIUDADANO
    $scope.recuperandoDatosInicialesCiudadano = function(){
        $rootScope.datosIniciales = "";
        $rootScope.datosIniciales_rcp = "";
        var datosForm = {};
        var idCiudadano = sessionService.get('IDUSUARIO');
        $scope.habGuardar1 = true;
        $scope.datosIniciales = "";
        var datosForm = {};
        var sTipoPersona = "";
        var recuperarDatos = new rcNatural();
        recuperarDatos.oid = idCiudadano;
        recuperarDatos.datosCiudadanoNatural(function(resultado){
            resultadoApi = JSON.parse(resultado);
            datos           =   resultadoApi[0];
            sTipoPersona    =   resultadoApi[0].dtspsl_tipo_persona;
            $scope.sTipoPersona    =   resultadoApi[0].dtspsl_tipo_persona;
            fechactual      =   fecha.getFullYear() + "/" + fecha.getMonth() + "/" + fecha.getDate();
            if(sTipoPersona == 'NATURAL'){
                datosForm['ci_bigdata'] = datos._id;
                datosForm['ANT_TIPO_PERSONA'] = "1";
                datosForm['ANT_TIPO_PERSONA_VALOR'] = datos.dtspsl_tipo_persona;
                datosForm['ANT_NUM_CI'] = datos.dtspsl_ci;
                datosForm['ANT_PAT'] = datos.dtspsl_paterno;
                datosForm['ANT_MAT'] = datos.dtspsl_materno;
                datosForm['ANT_CAS'] = datos.dtspsl_tercer_apellido;
                datosForm['ANT_NOM'] = datos.dtspsl_nombres;
                datosForm['ANT_EXP_CI'] = datos.dtspsl_expedido;
                datosForm['ANT_GEN'] = datos.dtspsl_sexo;
                datosForm['ANT_FEC_NAC'] = datos.dtspsl_fec_nacimiento;
                datosForm['ANT_LUG_NAC'] = datos.dtspsl_lugar_nacimiento;
                datosForm['ANT_E_CIVIL'] = datos.dtspsl_id_estado_civil;
                datosForm['ANT_PROFES'] = datos.dtspsl_profesion;
                datosForm['ANT_DOM'] = datos.dtspsl_direccion;
                datosForm['ANT_CELU'] = datos.dtspsl_movil;
                datosForm['ANT_TEL'] = datos.dtspsl_telefono;
                datosForm['ANT_MAIL'] = datos.dtspsl_correo; 
                datosForm['FILE_FOTOCOPIA_CI_RA']   =   datos.dtspsl_file_fotocopia_ci;
                datosForm['FILE_FOTOCOPIA_CI_RR']   =   datos.dtspsl_file_fotocopia_ci_r;  

            }else if(sTipoPersona == 'JURIDICO'){                
                datosForm['f01_tipo_per'] = sTipoPersona;               
                datosForm['f01_tip_doc_prop'] = "NIT";
                datosForm['f01_num_doc_per_jur'] = datos.dtspsl_nit;
                datosForm['f01_raz_soc_per_jur'] =  datos.dtspsl_razon_social;

                datosForm['f01_ges_vig_pod'] = datos.dtspsl_poder_replegal;
                datosForm['f01_num_doc_rep'] = datos.dtspsl_ci_representante;
                datosForm['f01_num_pod_leg'] = '';
                datosForm['f01_zona_rep'] = datos.dtspsl_zona;
                datosForm['f01_tip_doc_rep'] = 'CI';
                datosForm['f01_expedido_rep'] = datos.dtspsl_expedido;
                datosForm['f01_email_rep'] = datos.dtspsl_correo;
                datosForm['f01_cel_rep'] = datos.dtspsl_movil;
                datosForm['f01_telef_rep'] = datos.dtspsl_telefono;
                datosForm['INT_FEC_SOLICITUD'] = fechactual;
                datosForm['CI_BIGDATA'] = datos._id;
                datosFecha = new Date(datos.dtspsl_fec_nacimiento);
                datosForm['f01_fecha_nac'] = datosFecha.getFullYear() +"/"+ parseInt(datosFecha.getMonth()+1) +"/"+ datosFecha.getDate();
                datosForm['TIPO'] = "ANTT";
                datosForm['f01_raz_soc'] = datos.f01_raz_soc;
                datosForm['f01_sup'] = "";
                datosForm['f01_de_hor'] = "";
                datosForm['INT_AC_HR_FINAL'] = "";
                datosForm['INT_AC_ESTADO'] = "";
                datosForm['INT_AC_MACRO'] = "";
                datosForm['INT_AC_ZONA'] = "";
                datosForm['INT_AC_TIP_VIA'] = "";
                datosForm['INT_AC_NOMBRE_VIA'] = "";
                datosForm['INT_AC_NUMERO'] = "";
                datosForm['INT_AC_EDIFICIO'] = "";
                datosForm['INT_AC_BLOQUE'] = "";
                datosForm['INT_AC_PISO'] = "";
                datosForm['INT_AC_NUME'] = "";
                datosForm['INT_AC_NUME'] = "";
                datosForm['INT_AC_TEL'] = "";
                datosForm['INT_AC_COR'] = "";
                datosForm['INT_AC_MACRO_ID'] = 23;
                datosForm['f01_rl_nit'] = datos.dtspsl_nit;
                datosForm['INT_RL_TIPO_DOCUMENTO'] = "NIT";
                datosForm['f01_macro'] = datos.dtspsl_macrodistrito;
                datosForm['f01_distrito'] = datos.dtspsl_distrito;
                datosForm['f01_zona'] = datos.dtspsl_zona;
                datosForm['f01_macro_des'] = datos.dtspsl_macrodistrito_desc;
                datosForm['f01_distrito_desc'] = datos.dtspsl_distrito_desc;
                datosForm['f01_id_zona_rep'] = datos.dtspsl_zona;
                datosForm['f01_zon_rep_valor'] = datos.dtspsl_zona_desc;
                datosForm['INT_VIA'] = datos.dtspsl_tipo_via;
                datosForm['f01_nom_via_rep'] = datos.dtspsl_nombre_via;
                datosForm['f01_num_rep'] = datos.dtspsl_numero_casa;
                datosForm['f01_tipo_viarep'] = datos.dtspsl_tipo_via;
                datosForm['INT_RL_FEC_EMISION_DOCUMENTO'] = "2016-03-2016";
                datosForm['f01_num_notaria'] = datos.dtspsl_nro_notaria;
                datosForm['INT_NACIONALIDAD'] = "BOLIVIANA";
                datosFecha = new Date(datos.dtspsl_fec_nacimiento);
                datosForm['INT_RL_FEC_NACIMIENTO'] = datosFecha.getFullYear() +"/"+ parseInt(datosFecha.getMonth()+1) +"/"+ datosFecha.getDate();
                datosForm['INT_NIT'] = datos.dtspsl_nit;
                datosForm['f01_poder_representante'] = datos.dtspsl_file_poder_legal;
                datosForm['f01_test_cons_sociedad_j'] = datos.dtspsl_file_test_const;
                datosForm['file_num_ident'] = datos.dtspsl_file_num_ident;
                datosForm['file_reg_comer'] = datos.dtspsl_file_reg_comer;
                datosForm['file_fund_emp'] = datos.dtspsl_file_fund_emp;
            }
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
                            datosForm['f01_pri_nom_prop']   =   ((typeof(repLegalmongo[0].dtspsl_nombres) == 'undefined') ? "" :repLegalmongo[0].dtspsl_nombres);
                            datosForm['f01_ape_pat_prop']         =   ((typeof(repLegalmongo[0].dtspsl_paterno) == 'undefined') ? "" :repLegalmongo[0].dtspsl_paterno);
                            datosForm['f01_ape_mat_prop']         =   ((typeof(repLegalmongo[0].dtspsl_materno) == 'undefined') ? "" :repLegalmongo[0].dtspsl_materno);
                            datosForm['INT_RL_FECHA_NAC']       =   ((typeof(repLegalmongo[0].dtspsl_fec_nacimiento) == 'undefined') ? "" :repLegalmongo[0].dtspsl_fec_nacimiento);
                            datosForm['INT_RL_FEC_NACIMIENTO']       =   ((typeof(new Date(repLegalmongo[0].dtspsl_fec_nacimiento)) == 'undefined') ? "" :new Date(repLegalmongo[0].dtspsl_fec_nacimiento));
                            datosForm['oid_representante_legal'] = repLegalmongo[0]._id;
                            var sepNombre = repLegalmongo[0].dtspsl_nombres.split(" ");
                            datosForm['f01_pri_nom_rep'] = ((repLegalmongo[0].dtspsl_nombres == 'undefined') ? "" :repLegalmongo[0].dtspsl_nombres);
                            datosForm['f01_seg_nom_rep'] = ((typeof(sepNombre[1]) == 'undefined') ? "" :sepNombre[1]);
                            //datosForm['f01_ter_nom_rep'] = ((typeof(sepNombre[2]) == 'undefined') ? "" :sepNombre[2]);
                            datosForm['f01_ape_cas_rep'] = ((typeof(repLegalmongo[0].dtspsl_tercer_apellido) == 'undefined') ? "" :repLegalmongo[0].dtspsl_tercer_apellido);
                            datosForm['f01_ape_pat_rep'] = ((typeof(repLegalmongo[0].dtspsl_paterno) == 'undefined') ? "" :repLegalmongo[0].dtspsl_paterno);
                            datosForm['f01_ape_mat_rep'] = ((typeof(repLegalmongo[0].dtspsl_materno) == 'undefined') ? "" :repLegalmongo[0].dtspsl_materno);
                            datosForm['f01_expedido_rep'] = repLegalmongo[0].dtspsl_expedido;
                       
                            datosForm['FILE_FOTOCOPIA_CI_RA']   =   repLegalmongo[0].dtspsl_file_fotocopia_ci;
                            datosForm['FILE_FOTOCOPIA_CI_RR']   =   repLegalmongo[0].dtspsl_file_fotocopia_ci_r;
                            var sepNombre = repLegalmongo[0].dtspsl_nombres.split(" ");
                            
                        }); 
                    } catch(e) {
                        console.log('*Error*', e);
                    }
                }
            var idZonaD     =   ((typeof(datosForm['INT_ZONA']) == 'undefined') ? "" :datosForm['INT_ZONA']);
            var idMacroD    =   ((typeof(datosForm['f01_macro']) == 'undefined') ? "" :datosForm['f01_macro']);
            var idDistritoD =   ((typeof(datosForm['f01_distrito']) == 'undefined') ? "" :datosForm['f01_distrito']);

            if(idZonaD != "" && idMacroD != "" && idDistritoD != ""){
                var zonaDescripcion     =   ((typeof(datosForm['f01_zon_prop_valor']) == 'undefined') ? "" :datosForm['f01_zon_prop_valor']);
                var macroDescripcion    =   ((typeof(datosForm['f01_macro_des']) == 'undefined') ? "" :datosForm['f01_macro_des']);
                var distritoDescripcion =   ((typeof(datosForm['f01_distrito_desc']) == 'undefined') ? "" :datosForm['f01_distrito_desc']);

                if(macroDescripcion == ""){
                    try{
                        var lstmacro = new macrodistritoLstid();
                        lstmacro.idMacro = idMacroD;
                        lstmacro.obtmacrodistrito(function(res){
                            x = JSON.parse(res);
                            var results = x.success.data;
                           if(results.length > 0){
                            macroDescripcion   = results.mcdstt_macrodistrito;
                            datosForm['INT_MACRO_DESC'] =   macroDescripcion;
                            } 
                        });
                    }catch(e){
                        console.log("error en macrodistrito");
                    }
                }
                if(distritoDescripcion == ""){
                    try{
                        var lstdis = new tipoVia();
                        lstdis.idDistrito = idDistritoD;
                        lstdis.obtdistrito(function(res){
                            x = JSON.parse(res);
                            var results = x.success;
                            if(results.length > 0){
                            distritoDescripcion = results[0].dstt_distrito;
                            datosForm['INT_DISTRITO_DESC'] =   distritoDescripcion;
                        }
                     });
                    }catch(e){
                        console.log("error en distrito id");
                    }
                }
                if(zonaDescripcion == ""){
                    try{
                        var lstzona = new zonaLstid();
                        lstzona.idzona = idZonaD;
                        lstzona.obtzona(function(res){
                            x = JSON.parse(res);
                            var results = x.success;
                            if(results.length > 0){
                                zonaDescripcion =   results[0].dist_nombre;
                                datosForm['INT_ZONA_DESC'] =   zonaDescripcion;
                            }
                        });
                    }catch(e){
                        //console.log("error en zona id");
                    }
                }
            }

            if(!datos.dtspsl_expedido){
                datosForm['f01_expedido_prop']    =   'LPZ';
            }
            $scope.datosIniciales = datosForm;
            $rootScope.datosIniciales = datosForm;
            $rootScope.datosIniciales_rcp = datosForm;
        });
    };

    $rootScope.mostrardiv = null;
    $rootScope.mostrardivform = null;

    $scope.seleccionarTramite = function (tramite) {
        $("#idtramite").val(sessionService.get('IDTRAMITE'));
        $scope.template =   "";
        setTimeout(function(){
            $scope.$apply();
        },2000);
        $scope.seleccionarTramiteAntena(tramite);
    }
    $scope.seleccionarTramiteAntena = function (tramite) {

        if(document.getElementById('resultadoCC')!= null){
            document.getElementById('resultadoCC').value = '';
            $("#alert").hide();
        }
        $rootScope.tramiteId = tramite.vtra_id;
        $rootScope.enviados = tramite.venviado;
        $rootScope.vcodigo = tramite.vcodigo;
        sessionService.set('IDTRAMITE', tramite.vtra_id);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        //$rootScope.recuperarrepresentante();
        if(tramite.venviado ==='SI' || tramite.venviado === 'RECHAZADO'){
            $.blockUI();          
            setTimeout(function(){
                $scope.recuperarSerializarInfo(tramite);
                $.unblockUI();
                $scope.$apply();
            },1000);

        } else {
            
            if(tramite.form_contenido != undefined){
                
                $rootScope.botones = false;  
                $.blockUI();          
                setTimeout(function(){
                    $scope.recuperarSerializarInfoGuardada(tramite);
                    $.unblockUI();
                    $scope.$apply();
                },1000);
            }else{

                $rootScope.mostrardiv = null;
                $rootScope.mostrardivform = null;
                $rootScope.botones= false;//"mostrar";
                $scope.recuperarSerializarInfo(tramite);
                $('input[name=r_tipo]').attr('checked',false);
                $('#requisito').val('');
                $('#tipo_sop').val('');
                $('#categoria').val('');
            }


        }
        

        $scope.template = "";
        $scope.formulario = "mostrar";
        //TIPO_PERSONA
        var tipoPersona =   sessionService.get('TIPO_PERSONA');
        var sidservicio =   tramite.vdvser_id;
        /*if(tipoPersona == 'NATURAL' && sidservicio == 12){
            sidservicio =   1;
        }*/
        /*if(tipoPersona == 'JURIDICO' && sidservicio == 21){         
            sidservicio = 2;
        }*/
        sidservicio = 2;
        if (tramite.venviado == "SI") {
            $scope.template         =   $scope.templates[sidservicio];
            $rootScope.botones= true;
        } else {
            $scope.template         =   $scope.templates[sidservicio]; 
            $rootScope.botones= false;

        }
        $scope.tramiteSeleccionado   =   tramite.vtra_id;
        var cboTipoCon = document.getElementById("tipo_contribuyente");
        if(cboTipoCon){
            cboTipoCon.style.display = 'none';
        }
    };
    
    $rootScope.gabineteEnvio = null;
    $rootScope.mostrarRU = true;
    $rootScope.mostrarGU = null;
    $rootScope.mostrarGM = null;
    $rootScope.mostrarRM = null;
    $rootScope.mostrarRUGU = null;
    $rootScope.mostrarRMGM = true;
    $rootScope.requisitosrbase = null;
    $rootScope.opcioncheck = false;

    $rootScope.mostrarInformacionAntenas = function(dataAntena, estado){
        //alert("mostrarINF");
        $scope.data1 = JSON.parse(dataAntena[0].form_contenido);
        $scope.data1 = $scope.data1.GRD_ANTENAS[0];
        if(estado == 'NO'){
            $rootScope.botones = true;
            $rootScope.botonesrodolfo = true;
            $rootScope.opcioncheck = false;

        }else{
            $rootScope.botones = false;
            $rootScope.requistosfile = true;
            $rootScope.opcioncheck = true;


        }
        //$rootScope.mostrarGM = null;
        $rootScope.mostrarRMGM = true;
        $scope.n_autorizacion = true;
        $rootScope.mostrarRU = true;
        $rootScope.asgnvalores(dataAntena,estado);
    }
    /*RECUPERAR DATOS - INICIAR FORMULARIO*/
    $scope.recuperarSerializarInfo = function(tramite){
        $scope.btover_c = true;
        $scope.estado = tramite.venviado;
        $rootScope.botones1 = true;  
        $scope.recuperarDatosRegistro();        
        var sIdTramite = tramite.vtra_id;
        $rootScope.datosIniciales.ID_TRAM_RC = sIdTramite;
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
                r       = JSON.parse(res);
                results = r.success;
                
                var formalmacenado    = "";
                if(results.length > 0){

                    $rootScope.mostrardiv = null;
                    $rootScope.mostrardivform = "mostrar";
                    $rootScope.mostrarInformacionAntenas(results,$scope.estado);

                    datoform = JSON.parse(results[0].form_contenido); 
                    formalmacenado =   ((typeof(datoform.INT_FORM_ALMACENADO)    == 'undefined' || datoform.INT_FORM_ALMACENADO    == null) ? '' : datoform.INT_FORM_ALMACENADO);
                    if(formalmacenado == 'G'){
                        $scope.datos.INT_FORM_ALMACENADO = 'G';
                        $scope.desabilitado = true;
                        $$scope.mostrarboton = true;
                        $rootScope.datosIniciales.INT_FORM_ALMACENADO = 'G';
                        $rootScope.datosIniciales.GRD_ANTENAS = datoform.GRD_ANTENAS;
                        $rootScope.campoidform= results[0].form_id;
                        datos = JSON.parse(results[0].form_contenido);
                        $scope.adjuntosArray = datos.ARCHIVOS_MULTIPLES;
                        $rootScope.datarecuperada = datos;

                        if($rootScope.vcodigo != null && $rootScope.enviados == "NO" ){
                        
                            $rootScope.recuperaInf(datos);
                        }

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
                        }else if(formalmacenado == 'C'){
                            $scope.datos.IDTRAMITE = sIdTramite;
                            $rootScope.campoidform= results[0].form_id;
                            $scope.formRegularRegistrado = JSON.parse(results[0].form_contenido);  
                            $scope.datos.INT_FORM_ALMACENADO = 'C';
                            $scope.desabilitado = false;
                           
                            $scope.iniciandoDatos();
                        }
                    else{
                        $scope.nroRegistros = 0;
                        $scope.datos = "";
                        $scope.adjuntosArray = "";
                        $scope.iniciandoDatos();                        
                        sessionService.set('IDTRAMITE', sIdTramite);
                    }
                    //VALIDAR BOTONES ENVIO
                    //$rootScope.$broadcast('iniciaBtnHabilitar', datoform.INT_FORM_ALMACENADO);
                }else{
                    $rootScope.mostrardiv = "mostrar";
                    $rootScope.mostrardivform = null;
                    $scope.nroRegistros = 0;
                    $scope.datos = "";
                    $scope.adjuntosArray = "";
                    $scope.iniciandoDatos();                        
                    sessionService.set('IDTRAMITE', sIdTramite);
                }

                dataFinal = $scope.datos;
            });
        } catch(error){
        }
    };
    //RECUPERAR INFORMACION GUARDADA
    $scope.recuperarSerializarInfoGuardada = function(tramite){
        $rootScope.botones = false;
        $rootScope.botones1 = false;   
        $scope.estado = tramite.venviado;
        $scope.btover_c = true;
        $scope.recuperarDatosRegistro();        
        var sIdTramite = tramite.vtra_id;
        $rootScope.datosIniciales.ID_TRAM_RC = sIdTramite;
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
                r       = JSON.parse(res);
                results = r.success;
                var formalmacenado    = "";
                if(results.length > 0){

                    $rootScope.mostrardiv = null;
                    $rootScope.mostrardivform = "mostrar";
                    $rootScope.mostrarInformacionAntenas(results,$scope.estado);
                    datoform = JSON.parse(results[0].form_contenido); 
                    formalmacenado =   ((typeof(datoform.INT_FORM_ALMACENADO)    == 'undefined' || datoform.INT_FORM_ALMACENADO    == null) ? '' : datoform.INT_FORM_ALMACENADO);
                    if(formalmacenado == 'G'){
                        //alert("GGGGG");
                        $scope.datos.INT_FORM_ALMACENADO = 'G';
                        $rootScope.datosIniciales.INT_FORM_ALMACENADO = 'G';
                        $rootScope.datosIniciales.GRD_ANTENAS = datoform.GRD_ANTENAS;
                        
                        $rootScope.campoidform= results[0].form_id;
                        datos = JSON.parse(results[0].form_contenido);
                        $scope.adjuntosArray = datos.ARCHIVOS_MULTIPLES;
                        $rootScope.datarecuperada = datos;

                        if($rootScope.vcodigo != null && $rootScope.enviados == "NO" ){
                            $rootScope.recuperaInf(datos);
                        }

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
                        }else if(formalmacenado == 'C'){
                            $scope.datos.IDTRAMITE = sIdTramite;
                            $rootScope.campoidform= results[0].form_id;
                            $scope.formRegularRegistrado = JSON.parse(results[0].form_contenido);  
                            $scope.datos.INT_FORM_ALMACENADO = 'C';
                            $scope.iniciandoDatos();
                        }
                    else{
                        //alert("GGGGG");

                        $scope.nroRegistros = 0;
                        $scope.datos = "";
                        $scope.adjuntosArray = "";
                        $scope.iniciandoDatos();                        
                        sessionService.set('IDTRAMITE', sIdTramite);
                    }
                    //VALIDAR BOTONES ENVIO
                    //$rootScope.$broadcast('iniciaBtnHabilitar', datoform.INT_FORM_ALMACENADO);
                }else{

                    $rootScope.mostrardiv = "mostrar";
                    $rootScope.mostrardivform = null;
                    $scope.nroRegistros = 0;
                    $scope.datos = "";
                    $scope.adjuntosArray = "";
                    $scope.iniciandoDatos();                        
                    sessionService.set('IDTRAMITE', sIdTramite);
                }

                dataFinal = $scope.datos;
                /*setTimeout(function(){
                    $rootScope.$broadcast('validarBtnEnviar', results.length);
                    $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                    $rootScope.$broadcast('inicializarGrillaAE', [{'datos':$scope.datos, 'venviado':tramite.venviado}]);
                    $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                    $rootScope.$broadcast('inicializarHtmlForm', tramite);
                }, 9000);*/
            });
        } catch(error){
        }
    };

    /*CIUDADANO-INICIAR DATOS CONTRI*/
    $scope.iniciandoDatos = function(){
        var datosIniciales = $scope.datosIniciales;
        var fechactual  =   obtFechaActual.obtenerFechaActual();
        $scope.datos = {};
        var datosForm_inicio = {};
        if($scope.formRegularRegistrado){
            datosForm_inicio['f01_tipo_lic'] = $scope.formRegularRegistrado.f01_tipo_lic;    
            datosForm_inicio['f01_categoria_agrupada'] = $scope.formRegularRegistrado.f01_categoria_agrupada;    
            datosForm_inicio['f01_categoria_descrip'] = $scope.formRegularRegistrado.f01_categoria_descrip;
            datosForm_inicio['f01_categoria_descrip'] = $scope.formRegularRegistrado.f01_categoria_descrip;
            datosForm_inicio['f01_actividadesSecundarias'] = $scope.formRegularRegistrado.f01_actividadesSecundarias;
            datosForm_inicio['f01_tipo_lic_descrip'] = $scope.formRegularRegistrado.f01_tipo_lic_descrip;
            datosForm_inicio['f01_categoria_agrupada_dem'] = $scope.formRegularRegistrado.f01_categoria_agrupada_dem;
            datosForm_inicio['f01_categoria_agrupada_descrip'] = $scope.formRegularRegistrado.f01_categoria_agrupada_descrip;
            datosForm_inicio['f01_categoria_descripcion'] = $scope.formRegularRegistrado.f01_categoria_descripcion;
            datosForm_inicio['f01_categoria_descrip2'] = $scope.formRegularRegistrado.f01_categoria_descrip2;
            datosForm_inicio['f01_categoria_agrupada_descripcion'] = $scope.formRegularRegistrado.f01_categoria_agrupada_descripcion;

        }
        
        datosForm_inicio['f01_id'] = datosIniciales.f01_id;
        datosForm_inicio['CI_BIGDATA'] = datosIniciales.CI_BIGDATA;
        datosForm_inicio['INT_FEC_SOLICITUD'] = fechactual;
        datosForm_inicio['f01_nom_completo'] = datosIniciales.f01_nom_completo;
        datosForm_inicio['f01_tip_doc_prop'] = datosIniciales.f01_tip_doc_prop;
        datosForm_inicio['f01_num_dos_prop'] = datosIniciales.f01_num_dos_prop;
        datosForm_inicio['f01_expedido_prop'] = datosIniciales.f01_expedido_prop;
        datosForm_inicio['f01_email_prop'] = datosIniciales.f01_email_prop;
        datosForm_inicio['f01_cel_prop'] = datosIniciales.f01_cel_prop;
        datosForm_inicio['f01_telef_prop'] = datosIniciales.f01_telef_prop;
        datosForm_inicio['f01_fecha_nac'] = datosIniciales.f01_fecha_nac;
        datosForm_inicio['f01_ape_mat_prop'] = datosIniciales.f01_ape_mat_prop;
        datosForm_inicio['f01_ape_pat_prop'] = datosIniciales.f01_ape_pat_prop;
        datosForm_inicio['f01_pri_nom_prop'] = datosIniciales.f01_pri_nom_prop;
        datosForm_inicio['f01_tel_ciudadano'] = datosIniciales.f01_tel;
        datosForm_inicio['f01_piso_prop'] = datosIniciales.f01_piso_prop;
        datosForm_inicio['f01_depa_prop'] = datosIniciales.f01_depa_prop;
        //DATOS INICIALES PERSONA JURIDICA
        datosForm_inicio['f01_rl_nit'] = datosIniciales.f01_rl_nit;
        datosForm_inicio['f01_rl_razon_zocial'] = datosIniciales.f01_rl_razon_zocial;
        datosForm_inicio['INT_RL_TIPO_DOCUMENTO'] = "";
        datosForm_inicio['f01_rl_num_documento'] = "";
        datosForm_inicio['f01_tipo_per'] = datosIniciales.f01_tipo_per;
        //f01_pri_nom_prop
        datosForm_inicio['f01_pri_nom_prop'] = datosIniciales.f01_pri_nom_prop;
        datosForm_inicio['f01_ape_pat_prop'] = datosIniciales.f01_ape_pat_prop;
        datosForm_inicio['f01_ape_mat_prop'] = datosIniciales.f01_ape_mat_prop;
        datosForm_inicio['f01_ape_cas_prop'] = datosIniciales.f01_ape_cas_prop;
        //DATOS INICIALES PERSONA NATURAL
        datosForm_inicio['f01_macro']       = datosIniciales.f01_macro;
        datosForm_inicio['f01_macro_des']   = datosIniciales.f01_macro_des;
        datosForm_inicio['f01_distrito']    = datosIniciales.f01_distrito;
        datosForm_inicio['f01_distrito_desc']   = datosIniciales.f01_distrito_desc;
        datosForm_inicio['f01_zona']        = datosIniciales.f01_zona;
        datosForm_inicio['f01_zon_prop_valor']  = datosIniciales.f01_zon_prop_valor;
        datosForm_inicio['INT_VIA']         = datosIniciales.INT_VIA;
        datosForm_inicio['f01_nom_via_prop']    = datosIniciales.f01_nom_via_prop;
        datosForm_inicio['f01_num_prop']    = datosIniciales.f01_num_prop;
        datosForm_inicio['INT_EDIF']        = datosIniciales.INT_EDIF;
        datosForm_inicio['f01_bloq_prop']   = datosIniciales.f01_bloq_prop;
        datosForm_inicio['INT_PISO']        = datosIniciales.INT_PISO;
        datosForm_inicio['INT_NUM_DEP']     = datosIniciales.INT_NUM_DEP;
        datosForm_inicio['INT_DIR_DET']     = datosIniciales.INT_DIR_DET;

        //DATOS INCIALES PERSONA JURIDICA
        datosForm_inicio['INT_RL_FEC_EMISION_DOCUMENTO']    = datosIniciales.INT_RL_FEC_EMISION_DOCUMENTO;
        datosForm_inicio['INT_NACIONALIDAD']        = datosIniciales.INT_NACIONALIDAD;
        datosForm_inicio['INT_RL_FEC_NACIMIENTO'] = datosIniciales.INT_RL_FEC_NACIMIENTO;
        datosForm_inicio['INT_NIT']                 = datosIniciales.INT_NIT;
        datosForm_inicio['f01_tip_via_prop']        = datosIniciales.f01_tip_via_prop;
        datosForm_inicio['INT_RL_TIPO_DOCUMENTO']   = datosIniciales.INT_RL_TIPO_DOCUMENTO;
        datosForm_inicio['f01_rl_num_documento']    = datosIniciales.f01_rl_num_documento;
        datosForm_inicio['INT_RL_FECHA_NAC']        = datosIniciales.INT_RL_FECHA_NAC;
        datosForm_inicio['IDTRAMITE']               = datosIniciales.IDTRAMITE;
        datosForm_inicio['f01_num_doc_rep']        = datosIniciales.f01_num_doc_rep;
        datosForm_inicio['f01_num_notaria']         =  datosIniciales.f01_num_notaria;
        datosForm_inicio['f01_num_rep']            = datosIniciales.f01_num_rep;
        datosForm_inicio['f01_tip_doc_rep'] = "NIT";
        datosForm_inicio['f01_num_doc_per_jur'] = datosIniciales.f01_num_doc_per_jur;
        datosForm_inicio['f01_raz_soc_per_jur'] =  datosIniciales.f01_raz_soc_per_jur;
        datosForm_inicio['f01_tip_doc_rep'] = datosIniciales.f01_tip_doc_rep;
        datosForm_inicio['f01_expedido_rep'] = datosIniciales.f01_expedido_rep;
        datosForm_inicio['f01_pri_nom_rep'] = datosIniciales.f01_pri_nom_rep;
        datosForm_inicio['f01_seg_nom_rep'] = datosIniciales.f01_seg_nom_rep;
        datosForm_inicio['f01_ter_nom_rep'] = datosIniciales.f01_ter_nom_rep;

        datosForm_inicio['f01_ape_pat_rep'] = datosIniciales.f01_ape_pat_rep;
        datosForm_inicio['f01_ape_mat_rep'] = datosIniciales.f01_ape_mat_rep;
        datosForm_inicio['f01_ape_cas_rep'] = datosIniciales.f01_ape_cas_rep;

        datosForm_inicio['f01_ges_vig_pod'] = datosIniciales.f01_ges_vig_pod;
        datosForm_inicio['f01_num_doc_rep'] = datosIniciales.f01_num_doc_rep;
        datosForm_inicio['f01_num_pod_leg'] = datosIniciales.f01_num_pod_leg;
        datosForm_inicio['f01_tip_doc_rep'] = datosIniciales.f01_tip_doc_rep;
        datosForm_inicio['f01_email_rep'] = datosIniciales.f01_email_rep;
        datosForm_inicio['f01_cel_rep'] = datosIniciales.f01_cel_rep;
        datosForm_inicio['f01_telef_rep'] = datosIniciales.f01_telef_rep;
        datosForm_inicio['INT_FEC_SOLICITUD'] = fechactual;
        datosForm_inicio['f01_fecha_nac'] = datosIniciales.f01_fecha_nac;
        datosForm_inicio['TIPO'] = "AE_INT_EMISION";
        datosForm_inicio['f01_raz_soc'] = datosIniciales.f01_raz_soc;


        datosForm_inicio['INT_RL_TIPO_DOCUMENTO'] = "NIT";
        //datosForm['f01_tipo_per'] = datos.dtspsl_tipo_persona;
        datosForm_inicio['f01_num_rep'] = datosIniciales.f01_num_rep;
        datosForm_inicio['f01_nom_via_rep'] = datosIniciales.f01_nom_via_rep;
        datosForm_inicio['f01_tipo_viarep'] = datosIniciales.f01_tipo_viarep;

        datosForm_inicio['f01_id_zona_rep'] = datosIniciales.f01_id_zona_rep;
        datosForm_inicio['f01_zona_rep'] = datosIniciales.f01_zona_rep;

        datosForm_inicio['f01_zon_rep_valor'] = datosIniciales.f01_zon_rep_valor;
        datosForm_inicio['INT_NIT'] = datosIniciales.INT_NIT;
        datosForm_inicio['f01_poder_representante'] = datosIniciales.f01_poder_representante;
        datosForm_inicio['f01_test_cons_sociedad_j'] = datosIniciales.f01_test_cons_sociedad_j;
        datosForm_inicio['file_num_ident'] = datosIniciales.file_num_ident;
        datosForm_inicio['file_reg_comer'] = datosIniciales.file_reg_comer;
        datosForm_inicio['file_fund_emp'] = datosIniciales.file_fund_emp;

        //datosForm_inicio['f01_macro']=datosIniciales.INT_MACRO;
        //datosForm_inicio['INT_ZONA']=datosIniciales.INT_ZONA;
        //datosForm_inicio['INT_MACRO_DESC']=datosIniciales.INT_MACRO_DESC;
        datosForm_inicio['INT_AC_TIP_VIA']      =   datosIniciales.INT_AC_TIP_VIA;
        if(datosIniciales.f01_tipo_per == 'N' || datosIniciales.f01_tipo_per == 'NATURAL'){
            datosForm_inicio['FILE_FOTOCOPIA_CI']   =   $scope.datosinic.FILE_FOTOCOPIA_CI;
            datosForm_inicio['FILE_FOTOCOPIA_CI_R'] =   $scope.datosinic.FILE_FOTOCOPIA_CI_R;
            datosForm_inicio['FILE_FACTURA_LUZ']    =   $scope.datosinic.FILE_FACTURA_LUZ;
        }else{
            if(datosIniciales.f01_tipo_per == 'J' || datosIniciales.f01_tipo_per == 'JURIDICO'){
                $scope.btover_c = true;
                datosForm_inicio['id_representante']    = datosIniciales.id_representante;
                datosForm_inicio['FILE_FOTOCOPIA_CI']   = datosIniciales.FILE_FOTOCOPIA_CI_RA;
                datosForm_inicio['FILE_FOTOCOPIA_CI_R'] = datosIniciales.FILE_FOTOCOPIA_CI_RR;
                datosForm_inicio['f01_poder_representante'] = datosIniciales.f01_poder_representante;
                datosForm_inicio['f01_test_cons_sociedad_j'] = datosIniciales.f01_test_cons_sociedad_j;
                datosForm_inicio['file_num_ident'] = datosIniciales.file_num_ident;
                datosForm_inicio['file_reg_comer'] = datosIniciales.file_reg_comer;
                datosForm_inicio['file_fund_emp'] = datosIniciales.file_fund_emp;
            }
        }
        datosForm_inicio['IDTRAMITE']           =   $scope.sIdTramiteSeleccionado;

        //DATOS ADJUNTOS        
        $rootScope.looo = 0;
        $rootScope.laaa = 0;
        $scope.datos = datosForm_inicio;
        if(datosIniciales.f01_tipo_per == 'N' || datosIniciales.f01_tipo_per == 'NATURAL'){
            if (datosIniciales.f01_macro && datosIniciales.f01_distrito && datosIniciales.f01_distrito_desc && datosIniciales.f01_zona && datosIniciales.f01_zon_prop_valor && datosIniciales.f01_tip_via_prop && datosIniciales.f01_nom_via_prop && datosIniciales.f01_num_prop) {
                $scope.validacionDireccion = false;
            } else {
                $scope.validacionDireccion = true;
                swal('Complete información', "Datos de dirección son obligatorios debe completar la información de su cuenta", 'error');
            }
        }  
    };    

    $scope.recuperarDatosRegistro = function(){
        $.blockUI();
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
    
    var tiemporespuesta = null;

    $scope.serializarInformacion = function(obj){
        //$rootScope.validacionRequisitosTec();
        var fechactual          = obtFechaActual.obtenerFechaActual();
        obj.INT_AC_NOMBRE_VIA   =   ((typeof(obj.INT_AC_NOMBRE_VIA) == 'undefined' || obj.INT_AC_NOMBRE_VIA == null) ? ""   : obj.INT_AC_NOMBRE_VIA.toUpperCase());
        obj.f01_raz_soc    =   ((typeof(obj.f01_raz_soc)  == 'undefined' || obj.f01_raz_soc == null) ? ""    : obj.f01_raz_soc.toUpperCase());
        obj.INT_AC_EDIFICIO     =   ((typeof(obj.INT_AC_EDIFICIO)   == 'undefined' || obj.INT_AC_EDIFICIO == null) ? ""     : obj.INT_AC_EDIFICIO.toUpperCase());
        obj.INT_AC_NUMERO       =   ((typeof(obj.INT_AC_NUMERO)     == 'undefined' || obj.INT_AC_NUMERO == null) ? ""       : obj.INT_AC_NUMERO.toUpperCase());
        obj.INT_AC_BLOQUE       =   ((typeof(obj.INT_AC_BLOQUE)     == 'undefined' || obj.INT_AC_BLOQUE == null) ? ""       : obj.INT_AC_BLOQUE.toUpperCase());
        obj.INT_AC_PISO         =   ((typeof(obj.INT_AC_PISO)       == 'undefined' || obj.INT_AC_PISO == null) ? ""         : obj.INT_AC_PISO.toUpperCase());
        obj.INT_AC_NUME         =   ((typeof(obj.INT_AC_NUME)       == 'undefined' || obj.INT_AC_NUME == null) ? ""         : obj.INT_AC_NUME.toUpperCase());
        obj.INT_FEC_SOLICITUD   =   ((typeof(obj.INT_FEC_SOLICITUD) == 'undefined' || obj.INT_FEC_SOLICITUD == null) ? ""   : fechactual);
        obj.INT_DIR_DET         =   ((typeof(obj.INT_DIR_DET)       == 'undefined' || obj.INT_DIR_DET == null) ? ""         : obj.INT_DIR_DET.toUpperCase());
        obj.AE_ORD_DEM          =   ((typeof(obj.AE_ORD_DEM)        == 'undefined' || obj.AE_ORD_DEM == null) ? ""          : obj.AE_ORD_DEM.toUpperCase());
        obj.f01_ci_extranjero   =   ((typeof(obj.f01_ci_extranjero) == 'undefined' || obj.f01_ci_extranjero == null) ? ""   : obj.f01_ci_extranjero.toUpperCase());
        obj.misDocs = $scope.documentosarc;
        //Archivos Adjuntos
        obj.File_Adjunto = "";
        obj.File_Adjunto = $rootScope.FileAdjuntos;
        //ALMACENAR FORMULARIO 
        obj.INT_FORM_ALMACENADO = 'G';
        if(obj.f01_tipo_per == 'NATURAL'){
            obj.f01_tipo_per = 'N';
            obj.f01_tipo_per_desc = 'NATURAL';
        }else{
            obj.f01_tipo_per = 'J';
            obj.f01_tipo_per_desc = 'JURIDICO';
        }  

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
            $.blockUI();
            Parametros.sp_crear_datos_formulario(function(results){ 
                results = JSON.parse(results);
                results = results.success;
                if(results.length > 0){
                    $.unblockUI();
                    $scope.btnEnviarForm    =   false;
                    $scope.btnGuardarForm   =   false;
                    $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                    $rootScope.$broadcast('iniciaBtnHabilitar', 'G');
                    swal('', "Formulario almacenado", 'success');
                }else{
                    $.unblockUI();
                    swal('', "Formulario no almacenado", 'error');
                }
            }); 
        }catch(e){
            console.log("Error..",e);
            $scope.btnGuardarForm   =   false;
            $.unblockUI();
        }
    }; 
    
      
    $scope.inicioServiciosA = function () {
        $scope.tramitesCiudadano();
        $scope.recuperandoDatosInicialesCiudadano();
            
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

    $scope.generarDocumentoPhpAntena = function (codigoTramite,fechaDJ){
        $scope.codigoTramite = codigoTramite;
        
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
            datoForm4 = JSON.stringify($rootScope.datosFormDJ_Antenas);

            $.ajax({
                url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdfAntenas_402.php',
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
                    "stipo_form": 'RB',
                    "tipoTramite": codigoTramite,
                    "fechaDJ": fechaDJ
                },
                success:function(response){
                    if(response.length>0){
                        var urlData = response;
                        $rootScope.decJuradaNatural = urlData;
                        $scope.InsertarDocumentoAntena(response);
                        //$scope.serializarInformacion($rootScope.datosEnv);
                        $.unblockUI();
                    }
                }
            });
        }
    };
    $scope.InsertarDocumentoAntena = function(urlData){
        var sDocSistema     =   "IGOB247";
        var sDocProceso     =   "DECLARACION JURADA";
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
        var sDocNombre      =   "FORMULARIO DE DECLARACION JURADA";
        var sDocTpsId       =   0;
        var sDocUrlLogica   =   urlData;
        var sDocAcceso      =   "";
        var sDocTipoExt     =   "";
        var sDocNroTramNexo =   "";
        var sCasoCodigo     =   $scope.codigoTramite;
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
      
    
});