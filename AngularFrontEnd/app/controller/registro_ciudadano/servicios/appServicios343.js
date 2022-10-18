app.controller('serviciosController343', function ($scope, $rootScope ,$routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad, $q) {
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
    $scope.formRegularRegistrado   =   "";
    $scope.datosinic = {};
    $scope.btover_c = false ;
    $scope.desabilitadocat = false;
    $scope.desabilitadoact = false;
    $scope.mostrarCategoria = false;
    $scope.datosfalt = "";
	$scope.acepta = '';
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
      { name: 'template11.html', url: '../../../app/view/servicios/aeregular/juridico.html'}, //formulario juegos
      { name: 'template12.html', url: '../../../app/view/servicios/aeregular/renovacion343/renovacion_licencia.html'},
      { name: 'template13.html', url: '../../../app/view/servicios/aeregular/renovacion343/renovacion_licencia_juridico.html'},
      { name: 'template14.html', url: '../../../app/view/servicios/aeregular/emision343/natural_nuevo.html'}, 
      { name: 'template15.html', url: '../../../app/view/servicios/aeregular/emision343/juridico_nuevo.html'} 
    ];
    $scope.serivicosInternet = [
        //{ name: 'Actividades Economicas Regulares', id:'10'},
        { name: 'Renovación de Licencias de Funcionamiento', id:'14'}, 
        { name: 'Emisión de Licencias de Funcionamiento', id:'13'} 
    ];

    $scope.btnEnviarForm = true;
    $scope.datosGuardados = false;
    $scope.habGuardar1 = true;
    $scope.ErrorCapchasXX="";
    $scope.SuccesCapchasxx="";

    $scope.template     =   "";
    var aDocAdjuntos    =   new Array();
     $rootScope.decJuradaNatural = "";
    $rootScope.decJuradaJuridico = "";
    $scope.renovacion = 14;
    $scope.emision = 13;

    $scope.seleccionarProceso = function(proceso){
        $scope.procesoSeleccionado  =   proceso.id;
        if($scope.procesoSeleccionado == 10){
            sidservicio =   10; 
        }
        if($scope.procesoSeleccionado == $scope.renovacion){
            sidservicio =   $scope.renovacion; 
        }
        $scope.procesoSeleccionado  =   proceso.id;
        $scope.btnNuevoTramtite     =   false;
        $scope.datos.f01_actividad_desarrollada = "";
        $scope.datosActividad = ""; 
       
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

    $scope.validacionDatosNatural = function(datos){
        var datosfaltantes = '';
        datosfaltantes = new Array();
        if(datos.dtspsl_fec_nacimiento == ''){
             datosfaltantes.push(' FECHA DE NACIMIENTO');
        }
        if(datos.dtspsl_expedido == '' || datos.dtspsl_expedido == ' '){
             datosfaltantes.push(' EXPEDIDO');
        }
        if(datos.dtspsl_nombres == '' || datos.dtspsl_nombres == ' '){
            datosfaltantes.push(' NOMBRES');
        }
        if(datos.dtspsl_materno == '' || datos.dtspsl_materno == ' '){
            datosfaltantes.push(' APELLIDO MATERNO');
        }
        if(datos.dtspsl_movil == '' || datos.dtspsl_movil == ' '){
            datosfaltantes.push(' CELULAR');
        }
        if((datos.dtspsl_correo == '')||(datos.dtspsl_correo == ' ')){
            datosfaltantes.push(' CORREO');
        }
        if(datos.dtspsl_fec_nacimiento == '' || datos.dtspsl_fec_nacimiento == ' '){
            datosfaltantes.push('FECHA DE NACIMIENTO');
        }
        if(datos.dtspsl_pais == '' || datos.dtspsl_pais == ' '){
            datosfaltantes.push(' PAIS');
        }
        if(datos.dtspsl_departamento == '' || datos.dtspsl_departamento == ' '){
            datosfaltantes.push(' DEPARTAMENTO');
        }
        if(datos.dtspsl_provincia == '' || datos.dtspsl_provincia == ' '){
            datosfaltantes.push(' PROVINCIA');
        }
        if((datos.dtspsl_macrodistrito == '' || datos.dtspsl_macrodistrito_desc == '')){
            datosfaltantes.push(' MACRODISTRITO');
        }
        if((datos.dtspsl_distrito == '' || datos.dtspsl_distrito_desc == '')){
            datosfaltantes.push(' DISTRITO');
        }
        if((datos.dtspsl_zona_desc == '' || datos.dtspsl_zona == '')){
            datosfaltantes.push(' ZONA');
        }
        if(datos.dtspsl_nombre_via == '' || datos.dtspsl_nombre_via == '0'){
            datosfaltantes.push(' NOMBRE DE VIA');
        }
        if(datos.dtspsl_numero_casa == '' || datos.dtspsl_nombre_via == '0'){
            datosfaltantes.push(' NUMERO DE DOMICILIO');
        }
        if(datos.dtspsl_file_fotocopia_ci == '' || datos.dtspsl_file_fotocopia_ci == ' ' ){
            datosfaltantes.push(' DOCUMENTO DE IDENTIDAD ANVERSO');
        }
        if(datos.dtspsl_file_fotocopia_ci_r == '' || datos.dtspsl_file_fotocopia_ci_r == ' '){
            datosfaltantes.push(' DOCUMENTO DE IDENTIDAD REVERSO');
        }
        $scope.datosfalt = datosfaltantes; 
    }

    $scope.validacionDatosJuridico = function(datos){
        var datosfaltantes = '';
        datosfaltantes = new Array();
        if(datos.dtspsl_ci_representante == '' || datos.dtspsl_ci_representante == ' '){
             datosfaltantes.push('CI DEL REPRESENTANTE LEGAL');
        }
        if(datos.dtspsl_razon_social == '' || datos.dtspsl_razon_social == ' '){
             datosfaltantes.push(' RAZON SOCIAL');
        }
        if(datos.dtspsl_movil == ''){
            datosfaltantes.push(' CELULAR');
        }
        if((datos.dtspsl_correo == '')||(datos.dtspsl_correo == ' ')){
            datosfaltantes.push(' CORREO');
        }
        if(datos.dtspsl_pais == ''){
            datosfaltantes.push(' PAIS');
        }
        if(datos.dtspsl_departamento == ''){
            datosfaltantes.push(' DEPARTAMENTO');
        }
        if(datos.dtspsl_provincia == ''){
            datosfaltantes.push(' PROVINCIA');
        }
        if((datos.dtspsl_macrodistrito == '' || datos.dtspsl_macrodistrito_desc == '')){
            datosfaltantes.push(' MACRODISTRITO');
        }
        if((datos.dtspsl_distrito == '' || datos.dtspsl_distrito_desc == '')){
            datosfaltantes.push(' DISTRITO');
        }
        if((datos.dtspsl_zona_desc == '' || datos.dtspsl_zona == '')){
            datosfaltantes.push(' ZONA');
        }
        if(datos.dtspsl_nombre_via == '' || datos.dtspsl_nombre_via == '0'){
            datosfaltantes.push(' NOMBRE DE VIA');
        }
        if(datos.dtspsl_numero_casa == '' || datos.dtspsl_nombre_via == '0'){
            datosfaltantes.push(' NUMERO DE DOMICILIO');
        }
        if(datos.dtspsl_file_poder_legal == '' || datos.dtspsl_file_poder_legal == ' ' ){
            datosfaltantes.push(' DOCUMENTO DE PODER DEL REPRESENTANTE LEGAL');
        }
        if(datos.dtspsl_file_num_ident == '' || datos.dtspsl_file_num_ident == ' '){
            datosfaltantes.push(' DOCUMENTO TESTIMONIO DE CONSTITUCION');
        }
        if(datos.dtspsl_file_num_ident == '' || datos.dtspsl_file_num_ident == ' '){
            datosfaltantes.push(' DOCUMENTO NUMERO DE IDENTIFICACION TRIBUTARIA (NIT)');
        }
        if(datos.dtspsl_file_fund_emp == '' || datos.dtspsl_file_fund_emp == ' '){
            datosfaltantes.push(' DOCUMENTO FUNDEMPRESA');
        }
        if(datos.dtspsl_file_reg_comer == '' || datos.dtspsl_file_reg_comer == ' '){
            datosfaltantes.push(' DOCUMENTO REGISTRO COMERCIAL');
        }

        $scope.datosfalt = datosfaltantes; 
    }

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
            $scope.datosRecuperados = datos;
            sTipoPersona    =   resultadoApi[0].dtspsl_tipo_persona;
            $scope.sTipoPersona    =   resultadoApi[0].dtspsl_tipo_persona;
            fechactual      =   fecha.getFullYear() + "/" + fecha.getMonth() + "/" + fecha.getDate();
            if(sTipoPersona == 'NATURAL')
            {
                $scope.validacionDatosNatural(datos);
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
                            //$.unblockUI();
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
                 $scope.validacionDatosJuridico(datos);
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
                            //$.unblockUI();
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
                        //$scope.dataGenesisCidadano  =   {};
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

    $scope.tramitesCiudadano = function(tramite){
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
            datosForm_inicio['FILE_FOTOCOPIA_CI']   =   $scope.datosinic.FILE_FOTOCOPIA_CI;
            datosForm_inicio['FILE_FOTOCOPIA_CI_R'] =   $scope.datosinic.FILE_FOTOCOPIA_CI_R;
            datosForm_inicio['FILE_FACTURA_LUZ']    =   $scope.datosinic.FILE_FACTURA_LUZ;
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
        $rootScope.looo = 0;
        $rootScope.laaa = 0;
        $scope.datos = datosForm_inicio;
    };
    
    /*SELECCCIONAR TRAMITE CIUDADANO*/
    $scope.seleccionarTramite = function (tramite) {
        var idservicio =   ((typeof(tramite.vdvser_id) == 'undefined' || tramite.vdvser_id == null) ? '' : tramite.vdvser_id);        
        //console.log("TRAMITES :", tramite);
        //vdvser_id
        if(idservicio != "" && idservicio != 28 && idservicio != 29 && idservicio != 30 && idservicio != 31){
            $scope.template =   "";
            setTimeout(function(){
               $.blockUI(); 
            },500);
            $scope.seleccionarTramiteRender(tramite);
        }else{   
            var estadoenviado =   ((typeof(tramite.venviado) == 'undefined' || tramite.venviado == null) ? '' : tramite.venviado);
            if(estadoenviado != 'SI'){
                swal("Formulario invalido", "Estimado Ciudadano, favor de crear una nueva solicitud", "warning")
            }else{
                swal("Formulario enviado", "Estimado Ciudadano la solicitud ya fue enviada", "warning")
            }
        }
        //$scope.open_mapa_ae_update();
        //openMapGis();        
    }

    
    ///////////////////****MAPA GIS*****/////////////////////////

    $scope.open_mapa_ae = function(latitud1, longitud1)
    {
        setTimeout(function()
        {
            //console.log("ENTRANDO AL MAPA DE ACTIVIDADES ECONOMICASsssssssss");
            var latitud =latitud1;
            var longitud = longitud1;
            $("#map_principal").empty();
            $scope.map = new ol.Map
            ({
              target: 'map_principal',
              layers: [
                        new ol.layer.Group({
                                            title: 'Mapas Base',
                                            layers: [
                                                      osm
                                                    ]
                                          }),
                        new ol.layer.Group({
                                            title: 'Capas',
                                            layers: [
                                                      zonas_tributarias_udit,
                                                      vias_udit,
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
            ////////////////////////////////////////////////////////////////////////
            if (latitud != undefined)
            {
                var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud])));
                feature.setStyle(iconStyle);
                vectorSource.addFeature(feature);
                $scope.map.getView().setCenter(ol.proj.fromLonLat([longitud, latitud]));
                $scope.map.getView().setZoom(15);
            }
            //////////////////////////////////////////////////////////////////////////

            $scope.map.on('click', function (evt)
            {
                datos = {};
                vectorSource.clear();
                /*
                if(jsonURLS)
                {
                    var url_sit    =   jsonURLS.SIT_GEO;
                    console.log("URL SIT...",url_sit);
                }
                var url_r = url_sit+'/geoserver/wms';
                */

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


              
                //var url = url_sit+'/geoserver/sit/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sit:zonasref&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(wkb_geometry,'+ wkt +')';   
                
                //console.log ("latitud: ",latitud);
                //console.log ("longitud: ",longitud);
                $scope.datos.INT_AC_latitud=latitud;
                $scope.datos.INT_AC_longitud=longitud;
                /*
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
                            //console.log('OK.....', data);
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
                */

                ///////////////////PARA PATTY//////////////////////////////////////////////////////////////
                
                var feature = $scope.map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                  return feature;
                });
                if (feature){
                  var coord = feature.getGeometry().getCoordinates();
                  var props = feature.getProperties();
                }
                else
                {
                    //alert();
                    var url_zonas_tributarias = zonas_tributarias_udit.getSource().getGetFeatureInfoUrl(
                              evt.coordinate,$scope.map.getView().getResolution(),$scope.map.getView().getProjection(),{
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'grupovalor'
                              }
                            );

                    var url_zonas = zonas_udit.getSource().getGetFeatureInfoUrl(
                              evt.coordinate,$scope.map.getView().getResolution(),$scope.map.getView().getProjection(),{
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'zonaref,macrodistr,subalcaldi,codigozona,macro,distrito'
                              }
                            );



                    var url_zonas_seguras = zonas_seguras_udit.getSource().getGetFeatureInfoUrl(
                              evt.coordinate,$scope.map.getView().getResolution(),$scope.map.getView().getProjection(),{
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'id'
                              }
                            );

                    var url_vias = vias_udit.getSource().getGetFeatureInfoUrl(
                              evt.coordinate,$scope.map.getView().getResolution(),$scope.map.getView().getProjection(),{
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'nombrevia,tipovia'
                              }
                            );

                    reqwest({
                        url: url_zonas_tributarias,
                        type: 'json',
                    }).then(function(data)
                    {
                        var feature = data.features[0];
                        var cod = feature.properties;
                        var codigo_zona_tributaria = parseInt(cod.grupovalor.replace("-",""));
                        //console.log("Patty zona tributaria: ",codigo_zona_tributaria);
                    });

                    reqwest({
                        url: url_zonas,
                        type: 'json',
                    }).then(function(data)
                    {
                        var feature = data.features[0];
                        var cod = feature.properties;
                        //console.log("Patty datos zonas: ",cod);
                        /////////////////////////////////////////
                        datos.zona = cod.zonaref;
                        datos.cod_zona_sit = cod.codigozona;
                        datos.distrito = cod.distrito;
                        datos.macrodistrito = cod.macrodistr;
                        var n_genesis = geo_id_genesis.length;
                        for (var i=0;i<n_genesis;i++)
                        {
                            if(geo_id_sit_servicio[i ]===cod.codigozona)
                            {
                                cod_zona_genesis = geo_id_genesis[i];
                                datos.cod_zona_genesis = cod_zona_genesis;
                            }
                        } 
                        /////////////////////////////////////////////
                    });

                    reqwest({
                        url: url_zonas_seguras,
                        type: 'json',
                    }).then(function(data)
                    {
                        var feature = data.features[0];  
                        if(feature == undefined)
                        {
                            //console.log("Patty...No es Zona Segura...");
                        }
                        else
                        {
                            var cod = feature.properties;
                            //console.log("Patty datos zona seguras: ",cod);   
                        }
                        
                    });

                    reqwest({
                        url: url_vias,
                        type: 'json',
                    }).then(function(data)
                    {
                        var feature = data.features[0];  
                        if(feature == undefined)
                        {
                            //console.log("Patty No hay vias...");
                        }
                        else
                        {
                            var cod = feature.properties;
                            //console.log("Patty datos de vias: ",cod);   
                        }
                        
                    });
                 
                }
                
                ///////////////////////////////////////////////////////////////////////////////////////////////////
            
                var feature = new ol.Feature(
                      new ol.geom.Point(ol.proj.fromLonLat(centro_1))
                );
                    
                feature.setStyle(iconStyle);
                vectorSource.addFeature(feature);

                //console.log("JSON DATOS",datos);
                return datos;
            });
            //////////////////////////////////////
        },550);
    };

    $scope.open_map_ae2 = function(latitud, longitud)
    {
        //console.log("Entrando open_map_ae2222222");
       
        setTimeout(function(){            
            var style = new ol.style.Style({
              image: new ol.style.Circle({
                                          radius: 7,
                                          fill: new ol.style.Fill({color: 'red'})
                                          })
            });
            $("#mapaUbi").empty();
            //////////////////////////////////////////////////////////////////
            var epsg32719 = 'EPSG:32719';
            var epsg4326 = 'EPSG:4326';
            proj4.defs(epsg32719, '+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
            proj4.defs(epsg4326,'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
            ////////////////////////////////////////////////////////////////////////
            $scope.mapa = new ol.Map({
                          layers: [
                                    new ol.layer.Group({
                                                          title: 'Mapas Base',
                                                          layers: [
                                                                    osm,
                                                                    vias,
                                                                    //osm_udit,
                                                                    //municipios,
                                                                    zonas_tributarias,
                                                                    vectorLayer
                                                                  ]
                                                      })
                                  ],
                                  target: 'mapaUbi',
                                  view: view
            });
            
            var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: 'Leyenda'});
            $scope.mapa.addControl(layerSwitcher);
            vectorLayer.getSource().clear();
            ////////////////////////////////////////////////////////////////////////
            var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud])));
            feature.setStyle(style);
            vectorSource.addFeature(feature);
            $scope.mapa.getView().setCenter(ol.proj.fromLonLat([longitud, latitud]));
            $scope.mapa.getView().setZoom(15);
            /////////////////////////

            var n_genesis = geo_id_genesis.length;
            
            $scope.mapa.on('click', function (evt)
            {
                vectorSource.clear();
                var coord = $scope.mapa.getCoordinateFromPixel(evt.pixel);
                var centro = ol.proj.transform(coord, 'EPSG:3857', epsg32719);
                var wkt = '';
                var centro_1 = ol.proj.transform(coord, 'EPSG:3857', epsg4326);
                var latitud = centro_1[1];
                var longitud = centro_1[0];
                wkt = "POINT(" + centro[0] + " " + centro[1] + ")";
                //console.log("PUNTO",centro_1);
                $("#INT_AC_latitud").val(latitud);
                $("#INT_AC_longitud").val(longitud);
                $scope.datos.INT_AC_longitud = longitud;
                $scope.datos.INT_AC_latitud = latitud;
                /////////////////////////////////////////////////////////////////////
                var feature = $scope.mapa.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                  return feature;
                });
                if (feature){
                  var coord = feature.getGeometry().getCoordinates();
                  var props = feature.getProperties();
                }
                else
                {
                  //alert();
                  var url_zonas_tributarias = zonas_tributarias.getSource().getGetFeatureInfoUrl(
                              evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'grupovalor'
                              }
                            );

                  var url_zonas = zonas.getSource().getGetFeatureInfoUrl(
                              evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'zonaref,macrodistrito,subalcaldia,codigozona,macro,distrito'
                              }
                            );
                   var url_vias = vias.getSource().getGetFeatureInfoUrl(
                              evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                                'INFO_FORMAT': 'application/json',
                                'propertyName': 'nombrevia,tipovia'
                              }
                            );

                  reqwest({
                    url: url_zonas_tributarias,
                    type: 'json',
                  }).then(function(data)
                  {
                    var feature = data.features[0];
                    ///////////////////////////////////////////////////////////
                    var cod = feature.properties;
                    var codigo_zona_tributaria = parseInt(cod.grupovalor.replace("-",""));
                    //console.log("codigo zona tributaria: ",codigo_zona_tributaria);
                    $scope.datos.f01_idCodigoZona = codigo_zona_tributaria;
                    ///////////////////////////////////////////////////////////
                  });
                  reqwest({
                    url: url_zonas,
                    type: 'json',
                  }).then(function(data)
                  {
                    var feature = data.features[0];
                    ///////////////////////////////////////////////////////////
                    var cod = feature.properties;
                    var zona = cod.zonaref;
                    var macrodistrito = cod.macrodistrito;
                    var cod_zona= cod.codigozona;
                    var distrito= cod.distrito;
                    
                    /////////////////////////////////////////////
                    //console.log("hhhhh",n_genesis);
                    for (var i=0;i<n_genesis;i++)
                    {
                      if(geo_id_sit_servicio[i]=== cod_zona )
                      {
                        cod_zona_genesis = geo_id_genesis[i];
                        //console.log("cod zona genesis: ",cod_zona_genesis);
                      }
                    }
                    /////////////////////////////////////////////
                    
                  });
                  reqwest({
                    url: url_vias,
                    type: 'json',
                  }).then(function(data)
                  {
                    var feature = data.features[0];
                    ///////////////////////////////////////////////////////////
                    var cod = feature.properties;
                    var nombre_via = cod.nombrevia;
                    var tipo_via = cod.tipovia;
                    //console.log("nombre via: ",nombre_via);
                    //console.log("tipo via: ",tipo_via);
                    ///////////////////////////////////////////////////////////
                  });
                }
               
                var feature = new ol.Feature(
                  new ol.geom.Point(ol.proj.fromLonLat(centro_1))
                );
                feature.setStyle(style);
                vectorSource.addFeature(feature);
            });
            /////////////////////////
        },1000);
    };

    $scope.buscar_ubicacion_p = function()
    {
      var nombre_1 = new Array();
      var f = '';
      //var nombre = document.getElementById('busqueda_p').value;
      var nombre = $('#busqueda_p').val();
      //console.log("ZONA en appServicios343..!!! ",nombre);

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
        console.log("Vacio :",obj);
        //map.removeLayer(vectorLayerZonas);
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
            //alert("mapa_principal");
            geo_zona = JSON.stringify(geo_zona);
            vectorLayerZonas.setSource(new ol.source.Vector({
                                                         features: (new ol.format.GeoJSON({defaultDataProjection:'EPSG:3857'})).readFeatures(geo_zona)
            }));

            vectorLayerZonas.setStyle(myStyleZonas);

            $scope.map.addLayer(vectorLayerZonas);
            $scope.map.getView().setCenter([xx,yy]);
            $scope.map.getView().setZoom(15);

            setTimeout(function(){
              //alert();
              vectorLayerZonas.getSource().clear();
            },2400);

          }
        }
        if(c==0)
        {
          var obj = {'nombre':'NO EXISTEN REGISTROS!!!'};
          console.log("Vacio :",obj);
        }
      }   
    }

    /////////////////////////////////////////////////////////////
    $scope.distritoZonas = function(idMacroJ){     
     //console.log("idMacroJ: ", idMacroJ);   
        $scope.datos.f01_macro_act    =   idMacroJ;
        $scope.datos.INT_AC_MACRO_ID = idMacroJ;
        $scope.aDistritoZona = {};
        try{
            $scope[name] = 'Running';
            var deferred = $q.defer();
            var parametros = new distritoZona();
            parametros.idMacro = idMacroJ;
            parametros.obtdist(function(resultado){
                data = JSON.parse(resultado);
                //console.log("data.success.length: ", data.success.length);
                if(data.success.length > 0){
                    //console.log("listado de zonas", $scope.aDistritoZona);
                    $scope.aDistritoZona = data.success;
                    //console.log("aDistritoZona: ", $scope.aDistritoZona);   
                    deferred.resolve(data.success);
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
        return deferred.promise;
    };

    $scope.cargarNombVia = function(tipoVia, idZona) {
        //console.log("(tipoVia, idZona: ", tipoVia, idZona);
        try{
            var nomvia = new aelstNombreVia();
            nomvia.idzona = idZona;
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

    $scope.actulizarIdDistrito  =   function(){
        $scope.desabilitadoV=false;
        var idDistrito  = "";
        var idZona      = "";
        var distNombre  = $scope.datos.f01_zona_act_descrip;
        //console.log('f01_zona_act_descrip   ',$scope.datos.f01_zona_act_descrip);
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
        //console.log("$scope.datos.f01_dist_act: ", $scope.datos.f01_dist_act);
        //console.log('f01_zona_act    ',$scope.datos.f01_zona_act);
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
        //console.log("f01_macro_act_descrip:: ", $scope.datos.f01_macro_act_descrip);
    }
      
    
    $scope.seleccionarTramiteRender = function (tramite) {
        //console.log('tramiteeeee   111111  ',tramite);
        //openMapGis();
        $scope.open_mapa_ae();
        //$scope.getCaptchasXX();
        $scope.procesoSeleccionado   =   tramite.vdvser_id;
        $rootScope.tramiteId = tramite.vtra_id;
        sessionService.set('IDTRAMITE', $rootScope.tramiteId);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        $scope.template = "";
        $scope.formulario = "mostrar";
        var vsidservicio = "";
        //TIPO_PERSONA
        var tipoPersona =   sessionService.get('TIPO_PERSONA');
        var sidservicio =   $scope.procesoSeleccionado;
        if(tipoPersona == 'NATURAL' && sidservicio == 10){
            vsidservicio =   10;
        }
        if(tipoPersona == 'JURIDICO' && sidservicio == 10){
            vsidservicio = 11;
        }

        if(tipoPersona == 'NATURAL' && sidservicio == $scope.renovacion){
            vsidservicio =   12;
        }
        if(tipoPersona == 'JURIDICO' && sidservicio ==  $scope.renovacion){
            vsidservicio =   13;
        }

        if(tipoPersona == 'NATURAL' && sidservicio == $scope.emision){
            vsidservicio =   14;
        }
        if(tipoPersona == 'JURIDICO' && sidservicio ==  $scope.emision){
            vsidservicio =   15;
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
                }, 4000)
                $.unblockUI();
            });
        } catch(error){
            console.log("Error Interno : ", error);
        }
    };

    $scope.bloquearBtnEnviarForm    =   function(){
        $scope.botones          =   null;
        //console.log("$scope.botones :: ", $scope.botones );
    };

    $scope.serializarInformacion = function(obj){
        obj.f01_macro_act = parseInt(obj.f01_macro_act);
        if(obj.f01_tipo_lic == '1' || obj.f01_tipo_lic == '3' || obj.f01_tipo_lic == '4'){
            obj.f01_actividadesSecundarias = obj.f01_categoria_agrupada_descrip;
        }else{
            if(obj.f01_tipo_lic == 3375){
                obj.f01_actividadesSecundarias =   obj.f01_actividadesSecundarias; 
            }else{
                //PARA NUEVA LEY 343
                if (obj.f01_tipo_lic != '1' || obj.f01_tipo_lic != 1 || obj.f01_tipo_lic != 3 || obj.f01_tipo_lic != '3' || obj.f01_tipo_lic != 4 || obj.f01_tipo_lic != '4' || obj.f01_tipo_lic != '100' || obj.f01_tipo_lic != 100 || obj.f01_tipo_lic != '101' || obj.f01_tipo_lic != 101 || obj.f01_tipo_lic != '3375' || obj.f01_tipo_lic != 3375) {
                    obj.f01_actividadesSecundarias =   obj.f01_actividadesSecundarias; 
                } else{
                    obj.f01_actividadesSecundarias = '';
                };
                //obj.f01_actividadesSecundarias = '';
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
        obj.f01_tipo_per = sessionService.get('TIPO_PERSONA');
        obj.f01_categoria_agrupada_dem = obj.f01_categoria_agrupada_descrip;
        obj.f01_categoria_descripcion = obj.f01_categoria_descrip2;
        $scope.datos.f01_categoria_agrupada_dem = obj.f01_categoria_agrupada_descrip;
        $scope.datos.f01_categoria_descripcion = obj.f01_categoria_descrip2;
        $scope.datos.f01_categoria_agrupada_descripcion = obj.f01_categoria_descrip2;;

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

    $scope.adicionarServicioGamlp = function(datos){ 
        $scope.recuperandoDatosGenesis();
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        var condiciones = '';
        if(tipoPersona == "NATURAL")
        {
            tipoPersona = "N";
            condiciones = $scope.datosRecuperados.dtspsl_file_condiciones_uso;
        }
         if(tipoPersona == "JURIDICO")
        {
            tipoPersona = "J";
            condiciones = $scope.datosRecuperados.dtspsl_file_condiciones_uso_j;
        }

        if ($scope.datosRecuperados.dtspsl_activaciond == 'SI' && $scope.datosRecuperados.dtspsl_activacionf == 'SI') {
            if(datos == 10){
                var dataInicio  =   {};
                dataInicio["f01_tipo_lic"] = "";
                dataInicio["f01_categoria_agrupada"] = "";
                dataInicio["f01_categoria_descrip"] = "";
                $scope.datos.f01_tip_act_de = "";
                $scope.datos.f01_categoria_agrupada_descripcion = "";
                $scope.datos.f01_categoria_descri = "";
                var fecha= new Date();
                var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                var sIdServicio = 10;
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
                            $scope.tramitesCiudadano();
                            swal('', 'Registro almacenado correctamente', 'success');
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
                    console.log('*Error*', e);
                    $.unblockUI();
                }
            }
            if(datos ==  $scope.emision){
                var dataInicio  =   {};
                dataInicio["f01_tipo_lic"] = "";
                dataInicio["f01_categoria_agrupada"] = "";
                dataInicio["f01_categoria_descrip"] = "";
                $scope.datos.f01_tip_act_de = "";
                $scope.datos.f01_categoria_agrupada_descripcio = "";
                $scope.datos.f01_categoria_descri = "";
                var fecha= new Date();
                var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                var sIdServicio =  $scope.emision;
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
                            $scope.tramitesCiudadano();
                            swal('', 'Registro almacenado correctamente', 'success');
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
                    console.log('*Error*', e);
                    $.unblockUI();
                }
            }
           
            if(datos == $scope.renovacion){
                if ($scope.dataGenesisCidadano != ''){
                    var idContribuyente =   $scope.dataGenesisCidadano[0].idContribuyente;
                    var contribuyente   =   new gLstActividadEconomica();
                    contribuyente.idContribuyente   =   idContribuyente;
                    contribuyente.tipo  = tipoPersona;            //try{
                    contribuyente.lstActividadEconomica(function(resultado){
                        resultadoApi = JSON.parse(resultado);
                        if (resultadoApi.success.dataSql.length) {
                            var response    =   resultadoApi;
                            var dataInicio  =   {}; 
                            dataInicio["f01_tipo_lic"] = "";
                            dataInicio["f01_categoria_agrupada"] = "";
                            dataInicio["f01_categoria_descrip"] = "";
                            $scope.datos.f01_tip_act_de = "";
                            $scope.datos.f01_categoria_agrupada_descripcio = "";
                            $scope.datos.f01_categoria_descri = ""; 
                            var fecha= new Date();
                            var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                            var sIdServicio = $scope.renovacion;
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
                                        $scope.tramitesCiudadano();
                                        swal('', 'Registro almacenado correctamente', 'success');
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
                                console.log('*Error*', e);
                                $.unblockUI();
                            }
                        }
                        else{
                        }
                    })                        
                } else{
                    swal("Estimado Usuario", "Ud. no cuenta con Actividades Economicas registradas", "warning")
                };                       
            }
            
        } else{
            swal('', "Debe realizar las activaciones fisica y digital para poder realizar el trámite", 'warning');
        };
    }

    $scope.btnCapcha=true;
    $scope.ErrorCapcha='';


    $scope.crearTramiteAE = function() {
        if($scope.procesoSeleccionado != ''){
            if($scope.procesoSeleccionado == 10){

                sidservicio =   10; 
            }
            if($scope.procesoSeleccionado == $scope.renovacion){
                sidservicio =   $scope.renovacion; 
                 href="#registro_ciudadano|servicios|index.html"
                $scope.adicionarServicioGamlp(sidservicio);
            }
            if($scope.procesoSeleccionado ==  $scope.emision){
                sidservicio =    $scope.emision; 
                href="#registro_ciudadano|servicios|index.html"
                $scope.adicionarServicioGamlp(sidservicio);
            }
            
        }
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

    // ******FIN DE CAPCHA****************
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

    $scope.$on('api:ready',function(){
        $scope.tramitesCiudadano();
        $scope.recuperandoDatosInicialesCiudadano();
        $scope.recuperandoDatosGenesis();
        //$scope.getCaptchasX();
        $scope.getCaptchasXX();
    });

    $scope.inicioServicios343 = function () {
        $scope.tramitesCiudadano();
        $scope.recuperandoDatosInicialesCiudadano();
        $scope.recuperandoDatosGenesis();
        //$scope.getCaptchasX();
        $scope.getCaptchasXX();
    };


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

    $scope.validarAcpetacion = function(){
        if($scope.datos.f01_tipo_per=='JURIDICO'){
            $("#declaracionJ").modal("show");
        }else{
            $("#declaracionN").modal("show");
        }
        $scope.acepta = "SI";
        //$("#aceptacionCondiciones").modal("hide");
        console.log("entraa",$scope.datos);
    }

    $scope.cerrarModal = function(){
        $scope.acepta = "NO";
    }	

    $scope.generarDocumentoPhp = function (){
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
                url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdf401_402.php',
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
                    "stipo_form": '401'
                },
                success:function(response){
                    var urlData = response;
                    $rootScope.decJuradaNatural = urlData;
                    $scope.InsertarDocumento(response);
                    $rootScope.datosEnv.declaracion_jurada = urlData;
                    $scope.datos.declaracion_jurada = urlData;
                    $scope.serializarInformacion($rootScope.datosEnv);
                    $.unblockUI();
                }

            });


        }else{
            if(tipoPersona == 'JURIDICO' || tipoPersona == 'J'){
                oidCiudadano    = sessionService.get('IDSOLICITANTE');
                datosCiudadano  = $scope.datosIniciales.f01_pri_nom_rep +' '+ $scope.datosIniciales.f01_ape_pat_rep;
                datosci         = $scope.datosIniciales.f01_num_doc_rep;
                dEmpresa        = $scope.datosIniciales.f01_raz_soc_per_jur;
                dnit            = $scope.datosIniciales.f01_num_doc_per_jur;
                datoForm4 = JSON.stringify($rootScope.datosForm401);
                $.ajax({
                    url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdf401_402.php',
                    type:"post",
                    data:{
                        "soid": oidCiudadano,
                        "sorigen":"IGOB",
                        "stipo":tipoPersona,
                        "usuario": datosCiudadano,
                        "cedula":  datosci,
                        "expedido": '',
                        "empresa": dEmpresa,
                        "nit": dnit,
                        "fecha": $scope.fechafinalserver,
                        "hora": $scope.horafinal,
                        "data": datoForm4,
                        "stipo_form": '401'
                    },
                    success:function(response){
                        if(response.length>0){
                            var urlData = response;
                            $rootScope.decJuradaNatural = urlData;
                            $scope.InsertarDocumento(response);
                            $rootScope.datosEnv.declaracion_jurada = urlData;
                            $scope.serializarInformacion($rootScope.datosEnv);
                            $.unblockUI();
                        }
                    }
                });
            }
        }
    };

    $scope.generarDocumentoPhp = function (){
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
                url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdf401_402.php',
                type:"post",
                data:{
                    "soid": oidCiudadano,
                    "sorigen": "PLATAFORMA INSTITUCIONAL",
                    "stipo": tipoPersona,
                    "usuario": datosCiudadano,
                    "cedula":  datosci,
                    "expedido": datosexpedido,
                    "empresa": '',
                    "nit": '',
                    "fecha": $scope.fechafinalserver,
                    "hora": $scope.sHoraFinal,
                    "data": datoForm4,
                    "stipo_form": $rootScope.datosForm401.f01_tipo_form//'401'
                },
                success:function(response){
                    var urlData = response;
                    $rootScope.decJuradaNatural = urlData;
                    $scope.InsertarDocumento(response);
                    $rootScope.datosEnv.declaracion_jurada = urlData;
                    $scope.serializarInformacion($rootScope.datosEnv);
                    $.unblockUI();
                }
            });
        }else{
            if(tipoPersona == 'JURIDICO' || tipoPersona == 'J'){
                oidCiudadano    = sessionService.get('IDSOLICITANTE');
                datosCiudadano  = $scope.datosIniciales.f01_pri_nom_rep +' '+ $scope.datosIniciales.f01_ape_pat_rep;
                datosci         = $scope.datosIniciales.f01_num_doc_rep;
                dEmpresa        = $scope.datosIniciales.f01_raz_soc_per_jur;
                dnit            = $scope.datosIniciales.f01_num_doc_per_jur;
                datoForm4 = JSON.stringify($rootScope.datosForm401);
                $.ajax({
                    url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdf401_402.php',
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
                        "stipo_form": $rootScope.datosForm401.f01_tipo_form//'401'
                    },
                    success:function(response){
                        if(response.length>0){
                            var urlData = response;
                            $rootScope.decJuradaNatural = urlData;
                            $scope.InsertarDocumento(response);
                            $rootScope.datosEnv.declaracion_jurada = urlData;
                            $scope.serializarInformacion($rootScope.datosEnv);
                            $.unblockUI();
                        }
                    }
                });
            }
        }
    };

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
    ///////////////////////////**** INICIO MAPA GIS***** /////////////////////////////////////
    
    ///////////////////////////****** FIN MAPA GIS****** /////////////////////////////////////
});
