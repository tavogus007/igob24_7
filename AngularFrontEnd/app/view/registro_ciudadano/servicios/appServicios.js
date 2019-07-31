app.controller('serviciosController', function ($scope, $rootScope ,$routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad) {
    $scope.imageCST = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.imageLNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.txtMsgConexionGen    =   '';
    $scope.txtCiudadanoExiste   =   '';
    $rootScope.looo =   '';
    $rootScope.laaa =   '';
    $scope.tablaTramites        =   {};
    $scope.tramitesUsuario      =   [];
    $scope.servicio = 1;
    $scope.divServicio = null;
    $rootScope.f01_tipo_lic = '';
    $rootScope.f01_categoria_agrupada_descripcion = '';
    $rootScope.f01_categoria_descrip = '';
    $rootScope.f01_tipo_lic_descrip = '';
    $rootScope.f01_categoria_agrupada_dem   = '';
    $rootScope.f01_categoria_agrupada_descrip   = '';
    $rootScope.f01_categoria_descripcion    = '';
    $rootScope.f01_categoria_descrip2   = '';
    $rootScope.f01_categoria    = '';
    $scope.f01_categoria_agrupada12=true;
    $scope.formRegularRegistrado   =   "";
    $scope.datosinic = {};
    $scope.btover_c = false ;
    $scope.desabilitadocat = false;
    $scope.desabilitadoact = false;
    $scope.mostrarCategoria = false;
    $scope.documentosarc = ['','','','','','','','','','','','','',''];
    var stiporol = sessionService.get('US_IDROL');
    $scope.templates =
    [ { name: 'template0.html', url: '../../../app/index.html'},//no existe en bd
      { name: 'template1.html', url: '../../../app/view/servicios/internet/index.html'},// formulario de internet
      { name: 'template2.html', url: '../../../app/index.html'},//no se creo en bd
      { name: 'template3.html', url: '../../../app/view/registro_ciudadano/regMedico/index.html'},// formulario de salud
      { name: 'template4.html', url: '../../../app/view/servicios/publicidad/index.html'}, //formulario de publicidad
      { name: 'template5.html', url: '../../../app/view/servicios/historial/index.html'}, //formulario de publicidad
      { name: 'template6.html', url: '../../../app/view/servicios/internet/index_2.html'}, //formulario juegos
      { name: 'template7.html', url: '../../../app/view/servicios/semdes/solicitud_viaje.html'},//formulario juegos
      { name: 'template8.html', url: '../../../app/view/servicios/semdes/solicitud_viaje.html'},//formulario juegos
      { name: 'template9.html', url: '../../../app/view/servicios/semdes/solicitud_viaje.html'},//formulario juegos
      { name: 'template10.html', url: '../../../app/view/servicios/aeregular/natural.html'}, //formulario juegos
      { name: 'template11.html', url: '../../../app/view/servicios/aeregular/juridico.html'} //formulario juegos

    ];
    $scope.serivicosInternet = [
        { name: 'Internet y Juegos en Red ', id:'1'},
        { name: 'Juegos Mecánicos y/o Electromecánicos ', id:'6'},
        { name: 'Actividades Economicas Regulares', id:'10'}
    ];

    $scope.btnEnviarForm = true;
    $scope.datosGuardados = false;
    $scope.habGuardar1 = true;
    $scope.ErrorCapchasXX="";
    $scope.SuccesCapchasxx="";


    /*
    $scope.seleccionarProceso = function(datos){
        $scope.procesoSeleccionado  =   12;
        $scope.btnNuevoTramtite     =   false;
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = ""; 
        $scope.GetValueCategoriaAgrupadauno();
    };
    $scope.seleccionarProcesoCombo = function(){
        $scope.procesoSeleccionado  =   12;
        $scope.btnNuevoTramtite     =   false;
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = ""; 

    };
    */
    //seleccionarProceso(datos.f01_categoria_agrupada); lista_actividad(datos.f01_categoria_agrupada); seleccionarProcesoCombo()
    $scope.limpiarFormTramite   =   function(){
        $scope.procesoSeleccionado  = "";
        $scope.btnNuevoTramtite     =   true;
        $scope.getCaptchasX();
        $scope.datos.f01_tipo_lic = "";
        $scope.datos.f01_categoria_agrupada_r = "";
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = "";
        $rootScope.f01_tipo_lic = '';
        $rootScope.f01_categoria_agrupada_descripcion = '';
        $rootScope.f01_categoria_descrip = '';
        $rootScope.f01_tipo_lic_descrip = '';
        $rootScope.f01_categoria_agrupada_dem   = '';
        $rootScope.f01_categoria_agrupada_descrip   = '';
        $rootScope.f01_categoria_descripcion    = '';
        $rootScope.f01_categoria_descrip2   = '';
        $rootScope.f01_categoria    = '';
    };
    $scope.template     =   "";
    var aDocAdjuntos    =   new Array();
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


    //RECUPERANDO DATOS DEL REGISTRO CIUDADANO
    $scope.recuperandoDatosInicialesCiudadano = function(){
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
                datosForm['f01_tipo_per'] = sTipoPersona;
                datosForm['f01_nom_completo'] = datos.dtspsl_nombres + " " + datos.dtspsl_paterno + " " + datos.dtspsl_materno;
                datosForm['f01_tip_doc_prop'] = "CI";
                datosForm['f01_num_dos_prop'] = datos.dtspsl_ci;
                datosForm['f01_expedido_prop'] = datos.dtspsl_expedido;
                datosForm['f01_email_prop'] = datos.dtspsl_correo;
                datosForm['f01_cel_prop'] = datos.dtspsl_movil;
                datosForm['f01_tel'] = datos.dtspsl_telefono;
                datosForm['INT_FEC_SOLICITUD'] = fechactual;
                datosForm['CI_BIGDATA'] = datos._id;
                datosForm['f01_form_id'] = datos._id;
                datosForm['f01_pri_nom_prop'] = datos.dtspsl_nombres;
                datosForm['f01_ape_pat_prop'] = datos.dtspsl_paterno;
                datosForm['f01_ape_mat_prop'] = datos.dtspsl_materno;
                datosForm['f01_ape_cas_prop'] = datos.dtspsl_ctercer;
                datosFecha = new Date(datos.dtspsl_fec_nacimiento);
                datosForm['f01_fecha_nac'] = datosFecha.getFullYear() +"/"+ parseInt(datosFecha.getMonth()+1) +"/"+ datosFecha.getDate();
                datosForm['INT_MACRODISTRITO'] = datos.dtspsl_macrodistrito;
                datosForm['INT_NUMERO_DOMICILIO'] = '';
                datosForm['INT_TIPO_VIA'] = '';
                datosForm['INT_OCUPACION'] = datos.dtspsl_ocupacion;
                datosForm['INT_DIRECCION'] = datos.dtspsl_direccion;
                datosForm['TIPO'] = "AE_INT_EMISION";
                datosForm['f01_raz_soc'] = datos.f01_raz_soc;
                datosForm['f01_sup'] = "";
                datosForm['f01_de_hor'] = "";
                datosForm['f01_a_hor'] = "";
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
                datosForm['INT_AC_TEL'] = "";
                datosForm['INT_AC_COR'] = "";
                datosForm['INT_AC_MACRO_ID'] = "";

                datosForm['f01_macro']=datos.dtspsl_macrodistrito;
                datosForm['f01_distrito'] = datos.dtspsl_distrito;
                datosForm['f01_zona']=datos.dtspsl_zona;
                datosForm['f01_macro_des']=datos.dtspsl_macrodistrito_desc;
                datosForm['f01_distrito_desc'] = datos.dtspsl_distrito_desc;
                datosForm['f01_zon_prop_valor']=datos.dtspsl_zona_desc;
                datosForm['INT_VIA']=datos.dtspsl_tipo_via;
                datosForm['f01_nom_via_prop']=datos.dtspsl_nombre_via;
                datosForm['f01_num_prop']=datos.dtspsl_numero_casa;
                datosForm['INT_EDIF']=datos.dtspsl_edificio;
                datosForm['f01_bloq_prop']=datos.dtspsl_bloque;
                datosForm['INT_PISO']=datos.dtspsl_piso;
                datosForm['INT_NUM_DEP']=datos.dtspsl_oficina;
                datosForm['INT_DIR_DET']=datos.dtspsl_direccion;
                datosForm['f01_tip_via_prop']=datos.dtspsl_tipo_via;
                if(datos.dtspsl_expedido == 'LPZ' || datos.dtspsl_expedido == 'CBB' || datos.dtspsl_expedido == 'SCZ' || datos.dtspsl_expedido == 'CHQ' || datos.dtspsl_expedido == 'TJA' || datos.dtspsl_expedido == 'PTS' || datos.dtspsl_expedido == 'ORU' || datos.dtspsl_expedido == 'BNI' || datos.dtspsl_expedido == 'PND'){
                    datosForm['f01_nac_prop'] = 'BOLIVIANA';
                    datosForm['INT_NACIONALIDAD'] = "BOLIVIANA";
                }else{
                    datosForm['f01_nac_prop'] = 'EXTRANJERO';
                    datosForm['INT_NACIONALIDAD'] = "EXTRANJERO";
                }
            }else{
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
                datosForm['TIPO'] = "AE_INT_EMISION";
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
                datosForm['INT_AC_MACRO_ID'] = "";
                datosForm['f01_rl_nit'] = datos.dtspsl_nit;
                datosForm['INT_RL_TIPO_DOCUMENTO'] = "NIT";
                //datosForm['f01_tipo_per'] = datos.dtspsl_tipo_persona;
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
                        console.log("error en zona id");
                    }
                }
            }

            if(!datos.dtspsl_expedido){
                datosForm['f01_expedido_prop']    =   'LPZ';
            }
            $scope.datosIniciales = datosForm;
        });
    };
    $scope.habilitarCrear = function(id){
        $scope.procesoSeleccionado  =   10;
        $scope.btnNuevoTramtite     =   false;
    };
    
    $scope.re=false;
    $scope.rej=false;

    $scope.recuperandoDatosGenesis = function(){
        var tipoContribuyente   =   sessionService.get('TIPO_PERSONA');
        var ciDocumento          =   '';//sessionService.get('CICIUDADANO'));
        var nitDocumento          =   '';//sessionService.get('CICIUDADANO'));
        var sAccion          =   '';//sessionService.get('CICIUDADANO'));

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
                        $scope.dataGenesisCidadano  =   {};
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

    $scope.tramitesCiudadano = function(){
        sIdCiudadano = sessionService.get('IDSOLICITANTE');
        try {
            var rData = new rcTramitesAe();
            rData.oid = sIdCiudadano;
            rData.obtTramites(function(res){
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

    //ACTUALIZAR ID TRÁMITE NEXO
/*
    $scope.actTramiteIdNexo = function (sIdTramite, response){
        var idNexo = response.toString();
        idNexo = idNexo.substring(14, idNexo.length);
        var tramite = {};
        tramite['frm_tra_modificado'] = fechactual;
        tramite['frm_tra_id_nexo'] = idNexo;
        var resPersona = {
            table_name:"_formulario_tramites",
            id:sIdTramite,
            body:tramite
        };
        var obj=DreamFactory.api[CONFIG.SERVICE].updateRecord(resPersona);
        obj.success(function(data){
        })
        .error(function(data){
        })
    };

    $scope.tramitesObservaciones = function(tramite, ciudadano){
        $scope.observaciones = "mostrar";
        var idCiudadano = sessionService.get('IDSOLICITANTE');
        var parametros = {
            "procedure_name":"spbusquedaformularioae",
            "body":{
                "params": [
                    {
                        "name": "sidciudadano",
                        "value": idCiudadano
                    }
                ]
            }
        };
        DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(parametros).success(function (results){
                $scope.noticias = results;
                var data = results;   //grabamos la respuesta para el paginado
                $scope.tablaNoticias = new ngTableParams({
                    page: 1,
                    count: 4,
                    filter: {},
                    sorting: {}
                }, {
                    total: $scope.noticias.length,
                    getData: function($defer, params) {
                        var filteredData = params.filter() ?
                        $filter('filter')($scope.noticias, params.filter()) :
                        $scope.noticias;
                        var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        $scope.noticias;
                        params.total(orderedData.length);
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
        }).error(function(results){
            alert("error al cargar");
        });
    };
*/
    
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
    
    /*SELECCCIONAR TRAMITE CIUDADANO*/
    $scope.seleccionarTramite = function (tramite) {
        $scope.getCaptchasXX();
        $rootScope.tramiteId = tramite.vtra_id;
        sessionService.set('IDTRAMITE', tramite.vtra_id);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        $scope.template = "";
        $scope.formulario = "mostrar";
        //TIPO_PERSONA
        var tipoPersona =   sessionService.get('TIPO_PERSONA');
        var sidservicio =   tramite.vdvser_id;
        if(tipoPersona == 'NATURAL' && sidservicio == 10){
            sidservicio =   10;
        }

        if(tipoPersona == 'JURIDICO' && sidservicio == 10){
            sidservicio = 11;
        }

        if (tramite.venviado == "SI") {
            $scope.template         =   $scope.templates[sidservicio];
        } else {
            $scope.template         =   $scope.templates[sidservicio];
        }

        if(tipoPersona == 'NATURAL'){
            $scope.recuperarSerializarInfo(tramite);
        }
        else{
            $scope.recuperarSerializarInfo(tramite);
        }
        $scope.tramiteSeleccionado   =   tramite.vtra_id;
        var cboTipoCon = document.getElementById("tipo_contribuyente");
        if(cboTipoCon){
            cboTipoCon.style.display = 'none';
        }
    };

    var adjuntos = '';
    var datoFinalA = new Array();
    
    /*RECUPERAR DATOS - INICIAR FORMULARIO*/
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
                        $scope.datos.INT_FORM_ALMACENADO = 'G';
                        $rootScope.campoidform= results[0].form_id;
                        datos = JSON.parse(results[0].form_contenido);
                        $scope.adjuntosArray = datos.ARCHIVOS_MULTIPLES;
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
                        $scope.nroRegistros = 0;
                        $scope.datos = "";
                        $scope.adjuntosArray = "";
                        $scope.iniciandoDatos();                        
                        sessionService.set('IDTRAMITE', sIdTramite);
                    }
                    //VALIDAR BOTONES ENVIO
                    $rootScope.$broadcast('iniciaBtnHabilitar', datoform.INT_FORM_ALMACENADO);
                }
                setTimeout(function(){
                    //$rootScope.$broadcast('validarBtnInternet', tramite.venviado);
                    $rootScope.$broadcast('validarBtnEnviar', results.length);
                    $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                    $rootScope.$broadcast('inicializarGrillaAE', [{'datos':$scope.datos, 'venviado':tramite.venviado}]);
                    $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                    $rootScope.$broadcast('inicializarHtmlForm', tramite);
                }, 3000);
            });
        } catch(error){
            console.log("Error Interno : ", error);
        }
    };

    $scope.bloquearBtnEnviarForm    =   function(){
        $scope.botones          =   null;
    };

     //ALMACENAR DOCUMENTOS - GESTION DOCUMENTAL
     /*
    $scope.almacenarGDocumental = function(dataArchivo, sUrl){
        var valores = "";
        var cadena = "";
        var nombreFile = dataArchivo;
        //VALORES GESTION DOCUMENTAL
        var subirU = {};
        subirU['doc_sistema'] = 'GENESIS';
        subirU['doc_proceso'] = sessionService.get('IDPROCESO');
        subirU['doc_ci_nodo'] = 'DMS';
        subirU['doc_datos'] = valores;
        subirU['doc_version'] ='1';
        subirU['doc_tiempo'] = '0';
        subirU['doc_firma_digital'] = 0;
        subirU['doc_acceso'] = "";
        subirU['doc_tipo_documento'] = "img";
        subirU['doc_tamanio_documento'] = "0";
        subirU['doc_tps_doc_id'] = '1';//data.vtps_doc_id
        subirU['doc_tipo_documentacion'] = 'U';
        subirU['doc_tipo_ingreso'] = 'I';
        subirU['doc_estado_de_envio'] = 'N';
        subirU['doc_correlativo'] = '';
        subirU['doc_tipo_documento_ext'] = '';
        subirU['doc_nrotramite_nexo'] = '';
        subirU['doc_id_carpeta'] = '';
        subirU['doc_registro'] = fechactual;
        subirU['doc_modificacion'] = fechactual;
        subirU['doc_usuario'] = sessionService.get('USUARIO');
        subirU['doc_estado'] = 'A';
        subirU['doc_url'] = sUrl;
        subirU['doc_url_logica'] = cadena;
        subirU['doc_nombre'] = nombreFile;
        var ressubirU = {
            table_name:"dms_gt_documentos",
            body:subirU
        };

        var obj=DreamFactory.api[CONFIG.SERVICE_IF].createRecords(ressubirU);
        obj.success(function(data){
        })
        .error(function(data){
        })
    };
    */
    $scope.subirArchivos = function(){
        var misDocs             = new Array();
        misDocs.push($scope.FILE_FOTOCOPIA_CI);
        misDocs.push($scope.FILE_FACTURA_SERVICIO);
        misDocs.push($scope.FILE_CROQUIS);
        misDocs.push($scope.FILE_ANTECEDENTES);
        misDocs.push($scope.FILE_ANTECEDENTES1);
        misDocs.push($scope.FILE_CONSTITUCION);
        misDocs.push($scope.FILE_PODER);
        misDocs.push($scope.FILE_FOTOCOPIA_CI_REP);
        misDocs.push($scope.FILE_LICENCIA);
        misDocs.push($scope.FILE_POLIZA);
        misDocs.push($scope.FILE_CERTIFICACION);
        misDocs.push($scope.FILE_COMPROMISO);
        misDocs.push($scope.FILE_IBNORCA);
        misDocs.push($scope.FILE_DECLARACION_JURADA);
        $scope.almacenarDocumentos(misDocs);
    }

     $scope.serializarInformacion = function(obj){
       var combox      = document.getElementById('f01_tipo_lic');
        var selected    = combox.options[combox.selectedIndex].text;
        if(obj.f01_tipo_lic != 3375){
            var comboy      = document.getElementById('f01_categoria_agrupada');
            selected1   = comboy.options[comboy.selectedIndex].text;
            var comboz      = document.getElementById('f01_categoria_descrip');
            selected2   = comboz.options[comboz.selectedIndex].text;
        }
        else{
            selected1 = '';
            selected2 = '';
            obj.f01_categoria_descrip = 3375;
            obj.f01_categoria_agrupada = 3375;
        }
        
        if (selected2=="--Seleccionar--"){
            comboz      = document.getElementById('f01_categoria_agrupada');
            selected2   = comboz.options[comboz.selectedIndex].text;
        }
        if(obj.f01_tipo_lic == '1' || obj.f01_tipo_lic == '3' || obj.f01_tipo_lic == '4'){
            var e = document.getElementById("f01_categoria_agrupada");
            obj.f01_actividadesSecundarias =  e.options[e.selectedIndex].text;
        }else{
            if(obj.f01_tipo_lic == 3375){
                obj.f01_actividadesSecundarias =   obj.f01_actividadesSecundarias; 
            }else{
                 obj.f01_actividadesSecundarias = '';
            }
        }

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

        obj.f01_tipo_lic_descrip = selected;
        obj.f01_categoria_agrupada_dem = selected1;
        obj.f01_categoria_agrupada_descrip = selected1;
        obj.f01_categoria_agrupada_descripcion = selected2;
        obj.f01_categoria = obj.f01_categoria_descrip;
        obj.f01_categoria_descripcion = selected2;
        obj.f01_categoria_descrip2 = selected2;

        $scope.datos.f01_tipo_lic_descrip = selected;
        $scope.datos.f01_categoria_agrupada_dem = selected1;
        $scope.datos.f01_categoria_agrupada_descrip = selected1;
        $scope.datos.f01_categoria_agrupada_descripcion = selected2;
        $scope.datos.f01_categoria = obj.f01_categoria_descrip;
        $scope.datos.f01_categoria_descripcion = selected2;
        $scope.datos.f01_categoria_descrip2 = selected2;

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
            $scope.btnGuardarForm   =   false;
            $.unblockUI();
        }
    };

    //ALMACENANDO FORMULARIO
/*
    $scope.serializarInformacion = function(obj){
        var combox      = document.getElementById('f01_tipo_lic');
        var selected    = combox.options[combox.selectedIndex].text;
        var comboy      = document.getElementById('f01_categoria_agrupada');
        var selected1   = comboy.options[comboy.selectedIndex].text;
        var comboz      = document.getElementById('f01_categoria_descrip');
        var selected2   = comboz.options[comboz.selectedIndex].text;
        if (selected2 == "--Seleccionar--"){
            comboz      = document.getElementById('f01_categoria_agrupada');
            selected2   = comboz.options[comboz.selectedIndex].text;
        }

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
        obj.File_Adjunto = $rootScope.FileAdjuntos;
        //ALMACENAR FORMULARIO 
        obj.INT_FORM_ALMACENADO = 'G';
        if(obj.f01_tipo_per == 'NATURAL'){
            obj.f01_tipo_per = 'N';
        }

        obj.f01_tipo_lic_descrip = selected;
        obj.f01_categoria_agrupada_dem = selected1;
        obj.f01_categoria_agrupada_descrip = selected1;
        obj.f01_categoria_agrupada_descripcion = selected2;
        obj.f01_categoria = obj.f01_categoria_descrip;
        obj.f01_categoria_descripcion = selected2;
        obj.f01_categoria_descrip2 = selected2;

        $scope.datos.f01_tipo_lic_descrip = selected;
        $scope.datos.f01_categoria_agrupada_dem = selected1;
        $scope.datos.f01_categoria_agrupada_descrip = selected1;
        $scope.datos.f01_categoria_agrupada_descripcion = selected2;
        $scope.datos.f01_categoria = obj.f01_categoria_descrip;
        $scope.datos.f01_categoria_descripcion = selected2;
        $scope.datos.f01_categoria_descrip2 = selected2;

        var datosSerializados   =  JSON.stringify(obj);
        var idCiudadano         = sessionService.get('IDSOLICITANTE');
        var idTramite           = sessionService.get('IDTRAMITE');
        var idServicio          = sessionService.get('IDSERVICIO');
        var parametros = {
            "procedure_name":"sp_crear_datos_formulario",
            "body":{
                    "params": [
                        {"name": "id_servicio","value": idServicio},
                        {"name": "data_json","value": datosSerializados},
                        {"name": "oid_ciudadano","value": idCiudadano},
                        {"name": "id_usuario","value": 1},
                        {"name": "id_trm_form","value": idTramite}
                    ]
                   }
        };
        $scope.btnGuardarForm   =   true;
        $.blockUI();
        DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(parametros).success(function (results){
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
        }).error(function(results){
                $scope.btnGuardarForm   =   false;
                $.unblockUI();
        });
    };

    $scope.enviarInformacion = function(obj){
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = sessionService.get('IDUSUARIO');
        var parametros = {
            "table_name":"_formulario_tramites",
            "body":{
                'frm_tra_enviado' : 'SI',
                'frm_tra_id_usuario' : idUsuario,
                'frm_tra_modificado' : fechactual
            },
            "id" : idTramite
        };
        var obj = DreamFactory.api[CONFIG.SERVICE].updateRecord(parametros);
        obj.success(function(data){
            swal('', 'Formulario enviado al G.A.M.L.P.', 'success');
            $scope.tramitesCiudadano();
            $scope.desabilitado = true;
        })
        obj.error(function(data){
            swal('', 'Registro no modificado', 'error');
        })
    };
    */

     $scope.enviarInformacion = function(obj){
        $.blockUI();
        try{
            var idTramite = sessionService.get('IDTRAMITE');
            idUsuario = sessionService.get('IDUSUARIO');
            var Parametros = new datosFormularios();

            sIdCiudadano = sessionService.get('IDSOLICITANTE');
            Parametros.frm_idTramite = idTramite;
            Parametros.frm_tra_enviado = 'SI'
            Parametros.frm_tra_id_usuario = idUsuario;
            Parametros.frm_tra_modificado = fechactual;
            Parametros.enviarFormulario(function(results){ 
                results = JSON.parse(results);
                swal('', 'Formulario enviado al G.A.M.L.P.', 'success');
                $scope.tramitesCiudadano();
                $scope.desabilitado = true;
            }); 
        }catch(e){
            console.log(e);
             swal('', 'Registro no modificado', 'error');
            $.unblockUI();
        }
    };

    $scope.GetValueLicencia = function () {
        var e = document.getElementById("f01_tipo_lic");
        $rootScope.f01_tipo_lic_descrip = e.options[e.selectedIndex].text;
    }

    $scope.GetValueCategoriaAgrupada = function () {
        var e = document.getElementById("f01_categoria_agrupada");
        $rootScope.f01_categoria_agrupada_dem = e.options[e.selectedIndex].text;
        $rootScope.f01_categoria_agrupada_descrip = e.options[e.selectedIndex].text;
    }
    
     $scope.GetValueCategoria = function () {
        $scope.limpformDesarrollada();
        var e = document.getElementById("f01_actividad_desarrollada");
        $rootScope.f01_categoria_descripcion = e.options[e.selectedIndex].text;
        $rootScope.f01_categoria_descrip2 = e.options[e.selectedIndex].text;
        $rootScope.f01_categoria = $rootScope.f01_actividad_desarrollada;
        $rootScope.f01_categoria_agrupada_descripcion = e.options[e.selectedIndex].text;
    }

    $scope.limpformDesarrollada = function(){
        $rootScope.f01_categoria_descripcion = '';
        $rootScope.f01_categoria_descrip2 = '';
        $rootScope.f01_categoria = '';
        $rootScope.f01_categoria_agrupada_descripcion = '';
    }

    $scope.lista_categorias = function(idLic){
        $scope.procesoSeleccionado  =   10;
        $scope.btnNuevoTramtite     =   true;
        try{ 
            if (idLic == 3375) {
                $scope.procesoSeleccionado  =   10;
                $scope.btnNuevoTramtite     =   false;
                $scope.f01_categoria_agrupada12=false;
                $scope.desabilitadocat = true;
                $scope.desabilitadoact = true;
                $scope.mostrarCategoria = false;
            }
            else{
                $scope.procesoSeleccionado  =   10;
                $scope.f01_categoria_agrupada12=true;
                $scope.desabilitadocat = false;
                $scope.desabilitadoact = false;
                $scope.mostrarCategoria = true;
            }
            var cat = new categoriasAgrpLicencia();
            cat.dependencia = idLic;
            cat.categorias_AgrpLicencia(function(res){
                x = JSON.parse(res);
                response = x.success.data;
                $scope.datoscategoria = response;
                $scope.datos.f01_actividad_desarrollada = "";
                $scope.datosActividad = ""; 
            });
        }catch(e){
            console.log("Error en categoria agrupada");
        }
        datoObjectFile1 = new Object();
        datoObjectFile2 = new Object();
        datoObjectFiles_ci = [];
        var tipoPersona =   sessionService.get('TIPO_PERSONA');
        if(tipoPersona == 'NATURAL' || tipoPersona == 'N'){
            datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
            datoObjectFile1.campo = 'Cedula de identidad (Anverso)';
            datoObjectFile1.nombre = 'Cedula de identidad (Reverso)';
            datoObjectFiles_ci[0] = datoObjectFile1;

            datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
            datoObjectFile2.campo = 'Cedula de identidad (Anverso)';
            datoObjectFile2.nombre = 'Cedula de identidad (Reverso)';
            datoObjectFiles_ci[1] = datoObjectFile2;
            $scope.datos.FILE_CI = datoObjectFiles_ci;
        }
        if(tipoPersona == 'JURIDICO' || tipoPersona == 'J'){
            datoObjectFile1 = new Object(); 
            datoObjectFile2 = new Object();
            datoObjectFile3 = new Object(); 
            datoObjectFile4 = new Object();
            datoObjectFile5 = new Object(); 
            datoObjectFile6 = new Object();
            datoObjectFiles_ci = [];
            $scope.datos.FILE_CI = '';
            $scope.datos.fileArchivosAd = '';
            datoObjectFile1.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
            datoObjectFile1.campo = 'Cedula de identidad (Anverso)';
            datoObjectFile1.nombre = 'Cedula de identidad (Reverso)';
            datoObjectFiles_ci[0] = datoObjectFile1;

            datoObjectFile2.url = CONFIG.APIURL + "/files/" + "RC_CLI/" + $scope.datos.id_representante + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
            datoObjectFile2.campo = 'Cedula de identidad (Anverso)';
            datoObjectFile2.nombre = 'Cedula de identidad (Reverso)';
            datoObjectFiles_ci[1] = datoObjectFile2;

            datoObjectFile3.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.f01_poder_representante + "?app_name=todoangular";
            datoObjectFile3.campo = 'Poder de Representación Legal';
            datoObjectFile3.nombre = 'Poder de Representación Legal';
            datoObjectFiles_ci[2] = datoObjectFile3;

            datoObjectFile4.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.f01_test_cons_sociedad_j + "?app_name=todoangular";
            datoObjectFile4.campo = 'Testimonio de Constitución de Sociedad';
            datoObjectFile4.nombre = 'Testimonio de Constitución de Sociedad';
            datoObjectFiles_ci[3] = datoObjectFile4;

            datoObjectFile5.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.file_num_ident + "?app_name=todoangular";
            datoObjectFile5.campo = 'NIT o inscripción al Régimen Simplificado';
            datoObjectFile5.nombre = 'NIT o inscripción al Régimen Simplificado';
            datoObjectFiles_ci[4] = datoObjectFile5;

            datoObjectFile6.url = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.file_fund_emp + "?app_name=todoangular";
            datoObjectFile6.campo = 'FUNDEMPRESA o Matricula de Comercio';
            datoObjectFile6.nombre = 'FUNDEMPRESA o Matricula de Comercio';
            datoObjectFiles_ci[5] = datoObjectFile6;

            $scope.datos.FILE_CI = datoObjectFiles_ci;
        }
    };

    /*$scope.lista_actividad = function(id){
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = "";
        //$scope.$apply();
        try{
                if (id != 3375) {
                    $scope.btnNuevoTramtite     =   true;
                    $scope.f01_categoria_agrupada12=true; 
                }
                var cat = new bsqActividadDesarrollada();
                cat.idCatAgrupada=id;
                cat.descrip='';
                cat.bsqActividad_Desarrollada(function(res){
                    $scope.datosActividad = "";
                    $scope.datos.f01_actividad_desarrollada = "";
                    x = JSON.parse(res);
                    response = x.success.data;
                    if(response.length > 0){
                        $scope.datosActividad = response;
                    }else{
                        $scope.msg = "Error !!";
                    }
                    //$scope.$apply(); 
                });
        }catch(e){
                alert("Error en licencias");
        }
    };*/

    $scope.catactividadDesarrollada = function(){
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = "";
        //$scope.$apply();
        try{
            var cat = new actividaddesarrolladagrupo();
            cat.actividad_desarrolladagrupo(function(res){
                $scope.datosActividad = "";
                $scope.datos.f01_actividad_desarrollada = "";
                x = JSON.parse(res);
                response = x.success.data;
                if(response.length > 0){
                    $scope.datosActividad = response;
                }else{
                    $scope.msg = "Error !!";
                }
                //$scope.$apply(); 
            });
        }catch(e){
                alert("Error en la actividad desarrollada");
        }
    }

    $scope.LicenciaXCategoria = function(idDesarrollada){
        //$scope.$apply();
        try{
            var tipo = new categoriaagrupadalicenciades();
            tipo.dependencia = idDesarrollada;
            tipo.categoriaagrupadalicencia_des(function(res){
                $scope.datosActividadLicencia = "";
                x = JSON.parse(res);
                response = x.success.data;
                if(response.length > 0){
                    $scope.datosActividadLicencia = response;
                    $scope.datos.f01_tipo_lic = response[0].idlicencia;
                    $scope.datos.f01_categoria_agrupada = response[0].catagrpuid;
                    $scope.datos.f01_categoria_descrip = idDesarrollada;

                    $scope.datos.f01_tipo_lic_descrip   = response[0].deslicencia;
                    $scope.datos.f01_categoria_agrupada_dem = response[0].idcategoriaagrupada;
                    $scope.datos.f01_categoria_agrupada_descrip = response[0].idcategoriaagrupada;
                    var comboz      = document.getElementById('f01_actividad_desarrollada');
                    selected2   = comboz.options[comboz.selectedIndex].text;

                    $scope.datos.f01_categoria_descripcion  = selected2;
                    $scope.datos.f01_categoria_descrip2 = selected2;
                    $scope.datos.f01_categoria_agrupada_descripcion = selected2;
                }else{
                    $scope.msg = "Error !!";
                }
                //$scope.$apply(); 
            });
        }catch(e){
                console.log("Error en la actividad desarrollada");
        }
    }

    $scope.adicionarServicioGamlp = function(datos){
        var dataInicio  =   { }; 
        var fecha= new Date();
        var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var sIdServicio = 10;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sFechaTramite = fechactual;        
        dataInicio.INT_FORM_ALMACENADO='C';        
        //var datosSerializados   =  JSON.stringify(dat);
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
            //crea.data_json = JSON.stringify(dataInicio);
            crea.oid_ciudadano = sIdCiudadano;
            crea.id_usuario = 3;
            $.blockUI();
            crea.adiciona_Tramites_Formulario(function(res){
                x = JSON.parse(res);
                response = x.success;
                if(response.length  > 0){
                    sessionService.set('IDTRAMITE', response[0].sp_insertar_formulario_tramites);
                    $.unblockUI();
                    $scope.tramitesCiudadano();

                    //$scope.crearNuevo(dat);
                    $scope.getCaptchasX();
                    swal('', 'Registro Creado correctamente', 'success');
                    sessionService.destroy('NROTRAMITE');
                    sessionService.destroy('NROTRAMITEID');
                    sessionService.destroy('IDPROCESO');

                    $scope.btnEnviarForm    =   false;
                    $scope.btnGuardarForm   =   false;
                    $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);

                $('#registro').modal('hide');
                }
                else{
                    $.unblockUI();
                }
            });
            
        }catch(e){
            console.log('*Error*');
            $.unblockUI();
        }
    };
    $scope.btnCapcha=true;
    $scope.ErrorCapcha='';


    $scope.crearTramiteAE = function() {
        if($scope.procesoSeleccionado != ''){
            $scope.adicionarServicioGamlp(10);
        }
        href="#registro_ciudadano|servicios|index.html"
    }

    $scope.getCaptchasX=function(){
        $scope.valorrandom = Math.floor(Math.random() * (224 - 1) + 1);
        $scope.resultadoC="";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function(resultado){
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero = partes[0].substring(1);
            i1=(partes[2]+ "," + partes[3]);
            i2=(partes[4] + "," + partes[5]);
            $scope.imageLNG = i1.substring(1, i1.length - 1);
            $scope.imageCST = i2.substring(1, i2.length - 2);
            var lengua = "";
            if(partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if(partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if(partes[1] == 'G'){
                lengua = 'GUARANI';
            } else if(partes[1] == 'C'){
                lengua = 'CASTELLANO';
            } else {
                console.log("error", partes[1]);
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };
    
    $scope.getCaptchasXX=function(){
        $("#resultadoCC").val("");
        $scope.habGuardar1 = true;
        $scope.validarAdjuntos = true;
        $scope.ErrorCapchasXX = "";
        $scope.SuccesCapchasxx="";
        $scope.valorrandomm = Math.floor(Math.random() * (224 - 1) + 1);
        $scope.resultadoCC="";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function(resultado){
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero1 = partes[0].substring(1);
            i1=(partes[2]+ "," + partes[3]);
            i2=(partes[4] + "," + partes[5]);
            $scope.imageLNGG = i1.substring(1, i1.length - 1);
            $scope.imageCSTT = i2.substring(1, i2.length - 2);
            var lengua = "";
            if(partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if(partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if(partes[1] == 'G'){
                lengua = 'GUARANI';
            } else if(partes[1] == 'C'){
                lengua = 'CASTELLANO';
            } else {
                console.log("error", partes[1]);
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };
    $scope.lmpCaptcha = function(datos)
    {
        $scope.ErrorCapcha='';
    }
    var numero = 0;
    $scope.VerificarCapcha = function(responce, resp){
           $scope.habGuardar1 = true;
           var captch  = $("#resultadoC").val();
           var id = numero;
           var verCaptcha = new captcha();
           verCaptcha.identificador = id;
           verCaptcha.respuesta = captch;
           verCaptcha.verificarCaptcha(function(resultado){
               json = JSON.parse(resultado);
               if(json.success[0] == undefined){
                   $scope.getCaptchasX();
                   $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
               }else{
                   $scope.confirmarServicioGamlp(responce,resp);
               }
           });
           $scope.getCaptchasX();
       };

    var tiemporespuesta = null;
    function verificarKeyPress(captch){
        var id = numero1;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
            var nroregsitros = json.success.length;
            if(nroregsitros == 0){
                $scope.habGuardar1 = true;
                $scope.ErrorCapchasXX = "Verifique el Capcha";
                $scope.SuccesCapchasxx="";
                $scope.$apply();
            }else{
                $scope.habGuardar1 = false;
                $scope.ErrorCapchasXX = "";
                $scope.SuccesCapchasxx="Capcha correcto";
                $scope.$apply();
            }
        });
    }

    $scope.VerificarCapchaa = function(datos)
    {
        var captch  = $("#resultadoCC").val();
        if(captch.length == 0)
            $scope.ErrorCapchasXX = "";

        if(captch.length > 3){
            clearTimeout(tiemporespuesta);
            tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1500);
        }
    };

    $scope.VerificarCapchaaViajes = function(responce)
    {
        $scope.serializarInfViajes(responce);
        $scope.habilitarEnvioTramite(responce);
    };
    // ******FIN DE CAPCHA****************
    //Iniciando js
    $scope.$on('api:ready',function(){
        $scope.tramitesCiudadano();
        $scope.recuperandoDatosInicialesCiudadano();
        $scope.recuperandoDatosGenesis();
        $scope.getCaptchasX();
        $scope.getCaptchasXX();
        $scope.catactividadDesarrollada();
    });

    $scope.inicioServicios = function () {
        $scope.tramitesCiudadano();
        $scope.recuperandoDatosInicialesCiudadano();
        $scope.recuperandoDatosGenesis();
        $scope.getCaptchasX();
        $scope.getCaptchasXX();
        $scope.catactividadDesarrollada();
    };

    //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////PARA SOLICITUD DE VIAJES//////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////


    $scope.getSeleccionaMunicipios  =   function(stipo){
    $scope.municipio = stipo;
    };
    $scope.getProvinciasDepto = function(dep){// alert("serviciosdepto");
        try {
            var departamento = dep.split("-");
            $scope.depto = departamento[0];
            var datosP = new provinciaLst();
            datosP.idProv = departamento[0];
            datosP.obtprovincia(function(resultado){ 
                data = JSON.parse(resultado);
                $scope.obtDatos = data.success;
                if ($scope.municipio != 'undefined' || $scope.municipio != null) {
                    $scope.getSeleccionaMunicipios($scope.municipio);
                    document.getElementById('TER_MIN').value = $scope.municipio;
                }
            });
        } catch(e) {
            console.log("Error : ", e);
        }
    }

    $scope.getProvincias = function(dep){
        try {
            $scope.depto = dep;
            var datosP = new provinciaLst();
            datosP.idProv = parseInt($scope.depto);
            datosP.obtprovincia(function(resultado){ 
                data = JSON.parse(resultado);
                $scope.obtDatos = data.success;
                if ($scope.municipio != 'undefined' || $scope.municipio != null) {
                    $scope.getSeleccionaMunicipios($scope.municipio);
                    document.getElementById('TER_MIN').value = $scope.municipio;
                }
            });
        } catch(e){
            console.log("Error : ", e);
        }
    }
    $scope.startDateOpen1 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened1 = true;
    };

    $scope.startDateOpen2 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened2 = true;
    };

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
    $scope.habilitarEnvioTramite = function(datos){ //alert($scope.signupForm.TER_TIP_PERMISO.$invalid);$scope.signupForm.TER_FEC_RET.$invalid || $scope.signupForm.TER_FEC_FIN.$invalid ||
        if(datos.TER_TIP_PERMISO == "" || datos.TER_MIN == "" || datos.TER_MOT ==  "" || datos.TER_NNA_VIAJAN.length==0 || datos.TER_RESP.length==0) //||
        {   $scope.btnEnviarFormPermisos = true;    swal('Señor ciudadano','Complete los datos del formulario para enviar su solicitud');
        }
        else 
            if($scope.PERMISO != "D")
                    if( datos.TER_SOLOS == "" )
                    {$scope.btnEnviarFormPermisos = true; swal('Señor ciudadano','Complete los datos del formulario para enviar su solicitud');
                    }
                    else{   $scope.btnEnviarFormPermisos = false;       }
            else
                if (datos.TER_NNA_DEL == ""|| datos.TER_NOM_INST == "" || datos.TER_INST_DIR == ""  || datos.TER_INST_TELF == "")
                {   $scope.btnEnviarFormPermisos = true; swal('Señor ciudadano','Complete los datos del formulario para enviar su solicitud');
                }

                else {  swal('Señor ciudadano','Complete los datos del formulario para enviar su solicitud');
                    var countNiniosGrilla=datos.TER_NNA_VIAJAN.length;
                    var countNinios=datos.NNA_CANT_NN;
                    var countAdolecentes=(datos.NNA_NRO_ADO);
                    var countTotales=(datos.NNA_CANT_TOTAL);
                    if(countNiniosGrilla==countNinios) {
                        $scope.btnEnviarFormPermisos = false;
                    }
                    else{ $scope.btnEnviarFormPermisos = true;  swal('Señor ciudadano','Complete los datos del formulario para enviar su solicitud');
                        if(countNiniosGrilla==countAdolecentes)
                         {
                            $scope.btnEnviarFormPermisos = false;
                         }
                        else{ $scope.btnEnviarFormPermisos = true;  swal('Señor ciudadano','Complete los datos del formulario para enviar su solicitud');
                                if(countNiniosGrilla==countTotales)
                                {
                                    $scope.btnEnviarFormPermisos = false;
                                }
                                else{ $scope.btnEnviarFormPermisos = true;  swal('Señor ciudadano','Complete los datos del formulario para enviar su solicitud');
                                }
                        }
                    }
                }
    };

    $scope.getListache= function(dato)
    {
        $scope.caras = dato;
    }

    //MOSTRANDO HISTORIAL DEL TRAMITE
    $scope.mostrarHistorico = function (tramite) {
        $rootScope.tramiteId = tramite.vtra_id;
        sessionService.set('IDTRAMITE', tramite.vtra_id);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        $scope.recuperarSerializarInfo(tramite);
        $scope.template = "";
        $scope.formulario = "mostrar";
        if (tramite.venviado == "SI") {
            $scope.desabilitado = true;
            $scope.template = "";
            $scope.template = $scope.templates[5];//tramite.vdvser_id
            $scope.btnEnviarFormPermisos = true;
        } else {
            $scope.desabilitado = false;
            $scope.template = "";
            $scope.template = $scope.templates[5];//tramite.vdvser_id
        }
        //EXISTE TIPO CONTRIBUYENTE
        var cboTipoCon = document.getElementById("tipo_contribuyente");
        if(cboTipoCon){
            cboTipoCon.style.display = 'none';
        }
    };

    /*DOCUMENTOS MULTIPLES*/
    var idCiu = sessionService.get('IDCIUDADANO');
    $scope.uploader = new FileUploader({
        url: CONFIG.APIURL + "?desripcion=ciudadano&&idCiudadano=" + idCiu
    });

    var uploader = $scope.uploader;

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    };

    uploader.onAfterAddingFile = function(fileItem) {
        tipoDocumento = fileItem.file.type;
        var nameArray = tipoDocumento.split('/');
        tipoDocumento = nameArray[1];
        var count = 0;

        if(tipoDocumento == "png" || tipoDocumento == "jpg" || tipoDocumento == "jpeg" || tipoDocumento == "txt" || tipoDocumento == "plain" || tipoDocumento == "zip" || tipoDocumento == "rar" || tipoDocumento == "vnd.ms-word.document.12" || tipoDocumento == "vnd.openxmlformats-officedocument.spreadsheetml.sheet" || tipoDocumento == "vnd.visio" || tipoDocumento == "vnd.ms-publisher" || tipoDocumento == "msaccess" || tipoDocumento == "vnd.openxmlformats-officedocument.wordprocessingml.document"){
            $scope.botonSubirOriginal = null;
            $scope.botonSubirError = "oculta";
        }
        else{
            $scope.botonSubirError = null;
            $scope.botonSubirOriginal = "oculta";
        }
    };

    $scope.falla = function()
    {
        swal('', "Tipo de archivo incorrecto elimine porfavor", 'error');
        $scope.desabilitado2 = true;
    }

    var archivoUpload = "";

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //FORMANDO LA URL - ARCHIVO
        $scope.direccionvirtual = "RC_CLI";
        var urlIdcos = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + $rootScope.tramiteId + "/" + fileItem._file.name + "?app_name=todoangular";
        var fileName = fileItem._file.name;

        var fileSize = (((fileItem._file.size)/1024)/1024);
        fileSize = fileSize.toFixed(2);
        if($scope.datos.ARCHIVOS_MULTIPLES){
            aDocAdjuntos = $scope.datos.ARCHIVOS_MULTIPLES;
        }else{
            aDocAdjuntos    =   new Array();
        }

        var datosAdjuntos = {
            "nombre_archivo" : fileName,
            "tam_archivo" : fileSize,
            "estado_archivo" : "Env.",
            "opcion_archivo" : "-",
            "url_archivo" : urlIdcos
        };
        aDocAdjuntos.push(datosAdjuntos);
        $scope.adjuntosArray = aDocAdjuntos;
        var aFile = new Array();
        aFile.push(fileItem._file);
        $scope.almacenarDocumentos(aFile);
        fileItem.remove();
        $scope.datos.ARCHIVOS_MULTIPLES = aDocAdjuntos;
        //VALIDANDO FECHAS OBLIGATORIAS
        $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
    };

    /*VALIDANDO BOTONES*/
    var clsValidarBtn = $rootScope.$on('validarBtn', function(event, data){
        if(data.frm_tra_id){
            $scope.tramitesCiudadano();
        }
    });
    $scope.$on('$destroy', function() {
        clsValidarBtn();
    });

    $scope.eliminarMultipleAdjunto = function(sIndex){
        if($scope.datos.ARCHIVOS_MULTIPLES){
            $scope.adjuntosArray = $scope.datos.ARCHIVOS_MULTIPLES;
        }
        if($scope.adjuntosArray){
            $scope.adjuntosArray.splice(sIndex, 1);
        }
        //$scope.adjuntoObligatorio       =   true;
        //$scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #FF4040;";
        $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
    };
    var clsAlmacenarDocumentosInternet = $rootScope.$on('almacenarDocumentosInternet', function(event){
        var misDocs             = new Array();
        misDocs.push($scope.FILE_FOTOCOPIA_CI);
        $scope.almacenarDocumentos(misDocs);

    });

     //ALMACENAR DOCUMENTOS DREAMFACTORY
    $scope.almacenarDocumentos = function(aFiles){
        $scope.archivos = aFiles;
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        angular.forEach(aFiles, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + archivo.name + "?app_name=todoangular";
                fileUpload.uploadFileToUrl(archivo, uploadUrl);
            }else{
            }
        });
    };
    /*----------------*/
    $scope.bloquearForm = function(){
        $scope.desabilitado = true;
    };
    $scope.desBloquearForm = function(){
        $scope.desabilitado = false;
    };

    $scope.cambioServicio = function(dat) {
        $scope.servicio = dat;
    }
    $scope.combo = "<select id='servicio' class='seleccionaServicio'>  <option value='1'>Internet</option> <option value='3'>Salud</option> <option value='4'>Publicidad</option> </select> <br>";

    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
        try{
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        catch (e) { console.log("error", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

//Boton de confirmacion
app.directive("confirmButton", function($document, $parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var buttonId, html, message, nope, title, yep;
            buttonId = Math.floor(Math.random() * 10000000000);
            attrs.buttonId = buttonId;
            message = attrs.message || "Are you sure?";
            yep = attrs.yes || "Yes";
            nope = attrs.no || "No";
            title = attrs.title || "Crear nuevo tramite";
            html = "<div style='width:190px;' id=\"button-" + buttonId + "\">\n " + scope.combo + "<span class=\"confirmbutton-msg\">" + message + "</span><br>\n   <button ng-disabled='frmServicio.$invalid' data-dismiss='modal' class=\"confirmbutton-yes btn btn-success\">" + yep + "</button>\n    <button class=\"confirmbutton-no btn btn-danger\">" + nope + "</button> \n</div>";
            element.popover({
                content: html,
                html: true,
                trigger: "manual",
                title: title
            });
            return element.bind('click', function(e) {
                var dontBubble, pop;
                dontBubble = true;
                e.stopPropagation();
                element.popover('show');
                pop = $("#button-" + buttonId);
                pop.closest(".popover").click(function(e) {
                    if (dontBubble) {
                        e.stopPropagation();
                    }
                });
                pop.find('.seleccionaServicio').change(function(e) {
                    scope.cambioServicio(servicio.value);
                });
                pop.find('.confirmbutton-yes').click(function(e) {
                    dontBubble = false;
                    var func = $parse(attrs.confirmButton);
                    func(scope);
                });
                pop.find('.confirmbutton-no').click(function(e) {
                    dontBubble = false;
                    $document.off('click.confirmbutton.' + buttonId);
                    element.popover('hide');
                });

                $document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function() {
                  $document.off('click.confirmbutton.' + buttonId);
                  element.popover('hide');
                });
            });
        }
    };
});
