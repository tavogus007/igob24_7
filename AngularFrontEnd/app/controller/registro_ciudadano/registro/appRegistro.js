app.controller('registroCiudadanoController', function ($scope, $route,$rootScope, DreamFactory, CONFIG,sessionService,ngTableParams,$filter,sweet,registroLog, $timeout,$window,$http, $sce,$log,FileUploader, fileUpload) {
    var vAsunto = "Registro_GAMLP";
    var vMensaje = "Con_esta_opción_podrá_tener_acceso_limitado_a_los_servicios_en_línea_del_Gobierno_Autónomo_Municipal_de_La_Paz,_si_desea_acceder_a_más_servicios,_le_pedimos_que_pueda_apersonarse_por_única_vez_a_una_de_nuestras_plataformas_de_atención_presencial_del_GAMLP,_para_realizar_la_validación_de_sus_datos_personales._Para_ello_usted_debe_llevar_<br><br>_Cédula_de_Identidad_Original._<br>_Certificado_de_Nacimiento_Original_(opcional)._<br>_Última_Factura_original_de_algún_servicio_del_domicilio_declarado_(luz/agua/teléfono/etc.)._<br><br>_No_olvide_de_actualizar_sus_datos_personales_con_tu_cuenta.";
    $scope.imageCST = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.imageLNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    //direccion del ciudadano 
    var sDireccion = "";

    //datos de comunicacion del ciudadano 
    var idUsuario = sessionService.get('IDUSUARIO');//IDCIUDADANO

    var sFono = "";
    var sCelular = "";
    var sCorreoEmp = "";
    var sCorreo = "";
    var sCi = "";
    var sw=0;
    var sw2=1;
    var sNumeroAleatorio = ""; 
    $scope.otroLugar = false;

    $scope.deshabilitadoD = true;
    $scope.deshabilitadoP = true;
    $scope.deshabilitadoM = true;
    $scope.deshabilitadoMc = true;
    $scope.deshabilitadoDs = true;
    $scope.deshabilitadoZ = true;  
    $scope.mostrar = false; 
    $scope.selecteIdi="NATURAL";
    $scope.tipo="NATURAL";
    $scope.pais="1";
    //console.log($scope.pais);
    $scope.tipo2="JURIDICO";
    $scope.stiloFecha   =  "border: 1px solid #FF4040;";    
    var fecha= new Date();
    var mes=fecha.getMonth()+1;
    if(mes.toString().length==1)
        mes='0'+mes;
    var dia=fecha.getDate();
    if(dia.toString().length==1)
        dia='0'+dia;
    var fechactual=fecha.getFullYear() + "-" + mes + "-" + dia /*+ " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()*/;  
    $scope.startDateOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
    };
    $scope.model = {
        startDate: new Date('09/21/2015'),
        endDate: new Date()
    };

    $scope.GetValueLugarNacimiento = function () {
        /*var e = document.getElementById("lugarNacimiento");
        //$scope.datos.f01_tipo_lic_descrip = e.options[e.selectedIndex].text;
        console.log(e);*/

        //console.log($scope.registro.lugarNacimiento);
        $scope.registro.pais_origen = "";
        if($scope.registro.lugarNacimiento == "OTR")
        {
            $scope.otroLugar = true;
        }
        else
        {
            $scope.otroLugar = false;
        }
    };
    
    //VALIDANDO FECHAS
    $scope.cambioColorDeFecha = function(){
        var sFecha  =   $scope.registro.fecha_nacimiento;
        if(typeof(sFecha) == 'object'){
            $scope.stiloFecha   =  "border: 1px solid #238E20;";

        }else{
            $scope.stiloFecha   =  "border: 1px solid #FF4040;";
        }
    };    
    
    $scope.mostrarCiComplemento = function() {
        $scope.mostrar = true;
    }; 
    $scope.estadoCivil = function(){
        /*$scope.aEstadoCivil = {};
        var parametros = {
                "table_name":"_bp_estados_civiles"
        };        
        DreamFactory.api[CONFIG.SERVICE].getRecordsByPost(parametros).success(function (results){
            if(results.record.length > 0){
                $scope.aEstadoCivil = results.record;
                //console.log($scope.aEstadoCivil);
            }else{
                $scope.msg = "Error !!";
            }             
        }).error(function(results){
        });*/
    };    
    var aRegistro = {"cedula": "","complemento": "","celular":"","correo":"","direccion":"","estado_civil":"","fecha_nacimiento":"",
                     "materno":"","nombre":"","ocupacion":"","paterno":"","sexo":"","telefono":"","cedula2": "","complemento2": "","repLegal": "","nroDocumento": "","nroNotaria": "",
                    "nit": "","razonSocial": "","tipoP": ""};
    $scope.registro = aRegistro;
    $scope.mostrarNatural = true;
    

    $scope.verificar = function(reg) {
        $.blockUI();        
        var fitro;
        //if($scope.mostrarNumComplemento)        
        if(reg.complemento != null)
        {
            //var ci = reg.cedula +'-'+ reg.complemento;
            filtro = "dtspsl_ci='"+reg.cedula+"' and dtspsl_complemento='" +reg.complemento+ "' and dtspsl_tipo_persona = 'NATURAL' and dtspsl_estado = 'ACTIVO' and dtspsl_activacionf = 'SI' and dtspsl_activaciond ='SI'";
        }
        else{
            //var ci = reg.cedula;
            filtro = "dtspsl_ci='"+reg.cedula+"' and dtspsl_tipo_persona = 'NATURAL' and dtspsl_estado = 'ACTIVO' and dtspsl_activacionf = 'SI' and dtspsl_activaciond ='SI'";
        }
        
        //console.log(filtro);
        //console.log('ci RepLeg Entro', results.record[0].dtspsl_ci_representante);  

        var resRepLegalMongo= {
             "table_name":"ciudadanos", 
             "body":{     
                        
                        "filter": filtro    //"dtspsl_ci='"+ci+"' and dtspsl_tipo_persona = 'NATURAL' and dtspsl_estado = 'ACTIVO'"
                }
        };
        var obj=DreamFactory.api[CONFIG.SERVICERC].getRecordsByPost(resRepLegalMongo);
            obj.success(function (results1) {
            if(results1.record.length > 0)
            {
                if(tipoPersona == 'NATURAL')
                {
                    sweet.show('', 'Persona ya Registrada!!!' , 'success');
                }
                else
                {
                    var repLegalmongo = results1.record;
                    
                    $scope.registro.nombre = repLegalmongo[0].dtspsl_nombres;
                    $scope.registro.paterno = repLegalmongo[0].dtspsl_paterno;
                    $scope.registro.materno = repLegalmongo[0].dtspsl_materno;
                    $scope.registro.tercer = "";  //repLegalmongo[0].dtspsl_paterno;
                    $scope.registro.cedula = repLegalmongo[0].dtspsl_ci;
                    $scope.registro.celular = repLegalmongo[0].dtspsl_movil;
                    $scope.registro.telefono = repLegalmongo[0].dtspsl_telefono;
                    $scope.registro.correo = repLegalmongo[0].dtspsl_correo;
                    $scope.registro.direccion = repLegalmongo[0].dtspsl_direccion;

                    $scope.registro.expedido = repLegalmongo[0].dtspsl_expedido;
                    $scope.registro.fecha_nacimiento = repLegalmongo[0].dtspsl_fec_nacimiento;
                    $scope.registro.estado_civil = repLegalmongo[0].dtspsl_id_estado_civil;
                    $scope.registro.sexo = repLegalmongo[0].dtspsl_sexo;
                    $scope.registro.ocupacion = repLegalmongo[0].dtspsl_ocupacion;
                    $scope.registro.otra_profesion = repLegalmongo[0].dtspsl_otra_profesion;
                    $scope.registro.profesion = repLegalmongo[0].dtspsl_profesion;
                    $scope.registro.lugarNacimiento = repLegalmongo[0].dtspsl_lugar_nacimiento;
                    //$scope.municipio = repLegalmongo[0].dtspsl_ocupacion;
                    $.unblockUI();
                    sweet.show('', 'Datos Encontrados!!!' , 'success');
                }
            }
            else
            {
                if(tipoPersona == 'NATURAL')
                {
                    sweet.show('', 'Llene sus datos!!!' , 'success');
                }
                else
                {
                    sweet.show('', 'Debe Registrar y/o Activar primero a la Persona Natural!!!', 'warning');
                    //$scope.registro = '';
                }
            }
            $.unblockUI();
        });        
    };

    $scope.verificarNIT = function(reg) {
        $.blockUI(); 
        //console.log('ci RepLeg Entro', results.record[0].dtspsl_ci_representante);                    
        var resEmpresaMongo= {
             "table_name":"ciudadanos", 
             "body":{                                    
                        "filter": "dtspsl_nit = '"+ reg.nit +"' and dtspsl_estado = 'ACTIVO'"
                }
        };
        var obj=DreamFactory.api[CONFIG.SERVICERC].getRecordsByPost(resEmpresaMongo);
            obj.success(function (results1) {
            if(results1.record.length > 0)
            {
                var repLegalmongo = results1.record;
                
                // $scope.registro.nombre = repLegalmongo[0].dtspsl_nombres;
                // $scope.registro.paterno = repLegalmongo[0].dtspsl_materno;
                // $scope.registro.materno = repLegalmongo[0].dtspsl_paterno;
                // $scope.registro.tercer = "";  //repLegalmongo[0].dtspsl_paterno;
                // $scope.registro.cedula = repLegalmongo[0].dtspsl_ci;                
                // $scope.registro.celular = repLegalmongo[0].dtspsl_movil;
                // $scope.registro.telefono = repLegalmongo[0].dtspsl_telefono;
                // $scope.registro.correo = repLegalmongo[0].dtspsl_correo;
                // $scope.registro.direccion = repLegalmongo[0].dtspsl_direccion;

                // $scope.registro.expedido = repLegalmongo[0].dtspsl_expedido;
                // $scope.registro.fecha_nacimiento = repLegalmongo[0].dtspsl_fec_nacimiento;
                // $scope.registro.estado_civil = repLegalmongo[0].dtspsl_id_estado_civil;
                // $scope.registro.sexo = repLegalmongo[0].dtspsl_sexo;
                // $scope.registro.ocupacion = repLegalmongo[0].dtspsl_ocupacion;
                // $scope.registro.lugarNacimiento = repLegalmongo[0].dtspsl_lugar_nacimiento;                
                sweet.show('', repLegalmongo[0].dtspsl_razon_social+' Empresa ya Registrada!!!'  , 'success');
            }
            else
            {
                sweet.show('', 'Llene datos de la Empresa!!!', 'warning');
            }
        });
        $.unblockUI();
    };

    //limpiar campos registro
    $scope.limpiarFormRegistro = function(){
        $scope.registro.cedula = "";
        $scope.registro.cedula2 = "";
        $scope.registro.complemento = "";
        $scope.registro.complemento2 = "";
        //$scope.mostrarNumComplemento = "";
        $scope.mostrarNumComplemento2 = "";
        $scope.registro.celular = "";
        $scope.registro.correo = "";
        $scope.registro.direccion = "";
        $scope.registro.estado_civil = "";
        $scope.registro.fecha_nacimiento = "";
        $scope.registro.materno = "";
        $scope.registro.nombre = "";
        $scope.registro.ocupacion = "";
        $scope.registro.otra_profesion = "";
        $scope.registro.profesion = "";
        $scope.registro.paterno = "";
        $scope.registro.sexo = "";
        $scope.registro.repLegal = "";
        $scope.registro.nroDocumento = "";
        $scope.registro.nroNotaria = "";
        $scope.registro.nit = "";
        $scope.registro.razonSocial = "";
        $scope.registro.zona = "";
        $scope.registro.zona_mdst_id = "";
        $scope.registro.yzona_dst_id = "";
        $scope.registro = "";
        //COLOCANDO EL STYLO OBLIGATORIO A F.NACIMIENTO        
        $scope.stiloFecha   =  "border: 1px solid #FF4040;";
    }
    var tipoPersona = "NATURAL";
    var descripcionPersona = "Natural";
    var descripcionNombre = "";
    var descripcionPaterno = "";
    var descripcionMaterno = "";

    $scope.getTipoPersona = function (val) {        
        //console.log('tipo persona natural:',val);
        if (val.tipoPersoneria == "NATURAL") {              
            $scope.mostrarNatural = true;
            $scope.mostrarJuridico = false;
            tipoPersona = "NATURAL";
        };
        if (val.tipoPersoneria == "JURIDICO") {
            $scope.mostrarNatural = false;
            $scope.mostrarJuridico = true;
            tipoPersona = "JURIDICO";
        };
        
        $scope.limpiarFormRegistro();
        $scope.tipo = val.tipoPersoneria;
        $scope.registro.tipoP = val.tipoPersoneria.toUpperCase();
    }; 
    
    $scope.gargarTipoPersona    =   function(){
        $scope.datos    =   {};
        $scope.datos.tipoPersoneria = "NATURAL";
    };
    
    var estcivil =  "";
    
    $rootScope.dataDatospersonales= '';

    $scope.validarDataCiudadano = function(response){
        var sTipoPersona  =  $scope.tipo;
        //LOS CAMPOS EXPEDIDO Y LUGAR DE NACIMIENTO NO SON VERIFICADOS        
        if(response && (sTipoPersona =   'NATURAL')){
            response.correo  = ((typeof(response.correo) == 'undefined' || response.correo == null) ? ""   : response.correo);
            if(response.celular>=0){
                response.celular  = ((typeof(response.celular) == 'undefined' || response.celular == null) ? ""   : response.celular);
            } else {
                response.celular="";
            }
            if(response.telefono>=0){
                response.telefono  = ((typeof(response.telefono) == 'undefined' || response.telefono == null) ? ""   : response.telefono);
            } else {
                response.telefono="";
            }
            response.direccion  = ((typeof(response.direccion) == 'undefined' || response.direccion == null) ? ""   : response.direccion.toUpperCase());
            response.complemento  = ((typeof(response.complemento) == 'undefined' || response.complemento == null) ? ""   : response.complemento.toUpperCase());
            response.complemento2  = ((typeof(response.complemento2) == 'undefined' || response.complemento2 == null) ? ""   : response.complemento2.toUpperCase());
            response.materno    = ((typeof(response.materno) == 'undefined' || response.materno == null) ? ""   : response.materno.toUpperCase());
            response.nombre     = ((typeof(response.nombre) == 'undefined' || response.nombre == null) ? ""     : response.nombre.toUpperCase());
            response.ocupacion  = ((typeof(response.ocupacion) == 'undefined' || response.ocupacion == null) ? ""   : response.ocupacion.toUpperCase());
            /*if(response.otra_profesion == null) {
                response.profesion  = ((typeof(response.profesion) == 'undefined' || response.profesion == null) ? ""   : response.profesion.toUpperCase());
            } else {
                response.otra_profesion  = ((typeof(response.otra_profesion) == 'undefined' || response.otra_profesion == null) ? ""   : response.otra_profesion.toUpperCase());
                response.profesion  = ((typeof(response.profesion) == 'undefined' || response.profesion == null) ? ""   : response.profesion.toUpperCase());
            }*/
            response.paterno    = ((typeof(response.paterno) == 'undefined' || response.paterno == null) ? ""   : response.paterno.toUpperCase());


        }else if(response && (sTipoPersona =   'JURIDICO')){
            response.direccion      = ((typeof(response.direccion) == 'undefined' || response.direccion == null) ? ""   : response.direccion.toUpperCase());            
            response.materno        = ((typeof(response.materno) == 'undefined' || response.materno == null) ? ""   : response.materno.toUpperCase());            
            response.nombre         = ((typeof(response.nombre) == 'undefined' || response.nombre == null) ? ""     : response.nombre.toUpperCase());            
            response.ocupacion      = ((typeof(response.ocupacion) == 'undefined' || response.ocupacion == null) ? ""   : response.ocupacion.toUpperCase());
            /*if(response.otra_profesion == null)
                    {
                        response.profesion  = ((typeof(response.profesion) == 'undefined' || response.profesion == null) ? ""   : response.profesion.toUpperCase());
                    }
                    else
                    {
                        response.otra_profesion  = ((typeof(response.otra_profesion) == 'undefined' || response.otra_profesion == null) ? ""   : response.otra_profesion.toUpperCase());
                        response.profesion  = ((typeof(response.profesion) == 'undefined' || response.profesion == null) ? ""   : response.profesion.toUpperCase());
                        //console.log("no registrado");
                    }*/
            response.razonSocial    = ((typeof(response.razonSocial) == 'undefined' || response.razonSocial == null) ? ""   : response.razonSocial.toUpperCase());
        }        
        

        var responseJuridico = response;
        $scope.nitt = response.nit;
        $scope.razonSocialValor=response.razonSocial;
        console.log($scope.razonSocialValor);
        sCorreoEmp = response.correoEmp;
        $rootScope.dataDatospersonales = response;
        $scope.entcedula =response.cedula;
        $scope.entcomplemento =response.complemento;
        if(response.selecteIdi == "JURIDICO") {
            estcivil = 0;
        } else { 
            estcivil = response.estado_civil;
        }
        
        if(response.complemento != null && response.complemento != "")
            var ci1=response.cedula+"-"+response.complemento;
        else
            var ci1=response.cedula;

        if($scope.mostrarNumComplemento2)
            var ci2=response.cedula2+"-"+response.complemento2;
        else
            var ci2=response.cedula2;

        //response.cedula=ci1;
        if(tipoPersona == "JURIDICO") {
            var cnit=response.nit;
            var cnit2=response.nit2;
            var ci11 = response.cedula.split("-");
            var c1111 = ci11[0];
            //console.log("esto mando", c1111);
            if(cnit==cnit2) {
                    if(response.complemento){
                        var resDis= {
                        "table_name":"ciudadanos",                
                        "body":{

                               "filter": "dtspsl_ci='"+c1111+"' and dtspsl_complemento='"+response.complemento+"' and dtspsl_tipo_persona = 'NATURAL' and dtspsl_estado = 'ACTIVO' and dtspsl_activacionf = 'SI' and dtspsl_activaciond ='SI'"
                                }
                        };
                    } 
                    else {
                        var resDis= {
                        "table_name":"ciudadanos",
                            "body":{
                                   "filter": "dtspsl_ci='"+c1111+"' and dtspsl_tipo_persona = 'NATURAL' and dtspsl_estado = 'ACTIVO' and dtspsl_activacionf = 'SI' and dtspsl_activaciond ='SI'"
                            }
                        };
                    }
                    $.blockUI();
                    DreamFactory.api[CONFIG.SERVICERC].getRecordsByPost(resDis).success(function (response) {
                        var results=response.record.length;
                        if(response.record.length > 0){ 
                                //*********************** busqueda de nit sis esta en el sistema ***************************************************
                                var resDis= {
                                    "table_name":"ciudadanos",                
                                    "body":{
                                           "filter": "dtspsl_nit='"+cnit+"' and dtspsl_estado = 'ACTIVO'"
                                     }
                                };
                                DreamFactory.api[CONFIG.SERVICERC].getRecordsByPost(resDis).success(function (response) {
                                    var results=response.record.length;
                                    if(response.record.length > 0){
                                        $.unblockUI();                                            
                                        sweet.show('NIT ya registrado', "Dirijase a la plataforma de atención mas cercana, para activar su cuenta", 'warning'); 
                                        $scope.getCaptchasX();
                                    } else {
                                        $scope.registroCiudadano(responseJuridico);
                                    }
                                }).error(function(error) {
                                    $.unblockUI();                                        
                                    $scope.errors["error_uos"] = error;
                                });
                        }
                        else {
                            $.unblockUI();                                
                            sweet.show('', "El número de CI no esta en Registro Ciudadano ", 'warning');
                            $scope.getCaptchasX();
                        }
                    }).error(function(error) {
                        $.unblockUI();
                        $scope.errors["error_uos"] = error;
                    }); 
                    
                } else{
                    sweet.show('', "El número de NIT no concuerda con el anterior formulario, favor revisar ", 'warning');
                    $scope.getCaptchasX();
                }
            } else {
                    if(ci1==ci2)
                    {
                        if(response.complemento){
                            console.log("!! 0.0 !!",response.complemento);
                            var resDis= {
                                "table_name":"ciudadanos",                
                                "body":{
                                   "filter": "dtspsl_ci='"+response.cedula2+"' and dtspsl_complemento='"+response.complemento+"' and dtspsl_estado = 'ACTIVO'  and dtspsl_tipo_persona = 'NATURAL'"
                                }
                            };
                        } else {
                            var resDis   = {
                                "table_name":"ciudadanos",                
                                "body":{
                                    "filter": "dtspsl_ci='"+response.cedula2+"' and dtspsl_tipo_persona = 'NATURAL' and dtspsl_estado = 'ACTIVO'"
                                 }
                            };
                        }
                        $.blockUI();                        
                        DreamFactory.api[CONFIG.SERVICERC].getRecordsByPost(resDis)
                        .success(function (response) {
                            //console.log("4DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD5",oidCiudadano);
                            //response.record[0]._id
                            if(response.record.length > 0){

                                if (response.record[0].dtspsl_complemento) {
                                        if (response.record[0].dtspsl_ci == $scope.entcedula && response.record[0].dtspsl_complemento== $scope.entcomplemento) {
                                            //sweet.show('¡El número de Cédula de Identidad ya se encuentra registrado!', "Favor ingresar con su usuario y contraseña proporcionado o verificar que el número de Cédula de Identidad sea el correcto y si usted no realizó dicho registro, puede apersonarse por las Plataformas de Atención Ciudadana del GAMLP para realizar su registro.", 'warning');
                                        }else{
                                            if (response.record[0].dtspsl_ci == $scope.entcedula && response.record[0].dtspsl_complemento== " ") {
                                                //sweet.show('¡El número de Cédula de Identidad ya se encuentra registrado!', "Favor ingresar con su usuario y contraseña proporcionado o verificar que el número de Cédula de Identidad sea el correcto y si usted no realizó dicho registro, puede apersonarse por las Plataformas de Atención Ciudadana del GAMLP para realizar su registro.", 'warning');
                                            }else{
                                                if (response.record[0].dtspsl_ci == $scope.entcedula) {

                                                }else{
                                                    if (response.record[0].dtspsl_complemento== $scope.entcomplemento) {
                                                       }else{
                                                        $.unblockUI();                    
                                                        $scope.getCaptchasX();    
                                                        $scope.registroCiudadano(response);
                                                       }
                                                }
                                            }
                                        }
                                    
                                }else{
                                    console.log("!! 0 !!");
                                }
                                console.log("!! !!",$scope.entcomplemento);
                                var userCI = response.record[0].dtspsl_ci;
                                descripcionNombre=response.record[0].dtspsl_nombres;
                                var detalleMensaje = "";

                                var oidCiudadano = response.record[0]._id;


                                if (response.record[0].dtspsl_pin) { 
                                    if (response.record[0].dtspsl_pin==" " || response.record[0].dtspsl_pin=="") {
                                        if (response.record[0].dtspsl_ci == $scope.entcedula && response.record[0].dtspsl_complemento== $scope.entcomplemento) {
                                                sNumeroAleatorio = response.record[0].dtspsl_pin; 
                                        }else{
                                           // sNumeroAleatorio = Math.round(Math.random()*100000) + response.record[0].dtspsl_ci;
                                        }
                                        sNumeroAleatorio = Math.round(Math.random()*100000) + response.record[0].dtspsl_ci;    
                                    }else{
                                          sNumeroAleatorio = response.record[0].dtspsl_pin;
                                    }
                                }else{
                                        sNumeroAleatorio = Math.round(Math.random()*100000) + response.record[0].dtspsl_ci;    
                                        
                                }

                                /*if (response.record[0].dtspsl_pin) { 
                                    if (response.record[0].dtspsl_pin==" " || response.record[0].dtspsl_pin=="") {
                                        if (response.record[0].dtspsl_ci == $scope.entcedula && response.record[0].dtspsl_complemento== $scope.entcomplemento) {
                                                sNumeroAleatorio = response.record[0].dtspsl_pin; 
                                        }else{
                                           // sNumeroAleatorio = Math.round(Math.random()*100000) + response.record[0].dtspsl_ci;
                                        }
                                        if (response.record[0].dtspsl_complemento=="") {
                                            sNumeroAleatorio = Math.round(Math.random()*100000) + response.record[0].dtspsl_ci;    
                                        }else{
                                            sNumeroAleatorio = Math.round(Math.random()*100000) + response.record[0].dtspsl_ci+"-"+response.record[0].dtspsl_complemento;
                                        }
                                        
                                    }else{
                                                sNumeroAleatorio = response.record[0].dtspsl_pin;
                                    }
                                }else{
                                        if (response.record[0].dtspsl_complemento=="") {
                                            sNumeroAleatorio = Math.round(Math.random()*100000) + response.record[0].dtspsl_ci;    
                                        }else{
                                            sNumeroAleatorio = Math.round(Math.random()*100000) + response.record[0].dtspsl_ci+"-"+response.record[0].dtspsl_complemento;
                                        }
                                }*/
                                if ($scope.entcomplemento==""){
                                    console.log("complemento v",$scope.entcomplemento);
                                    detalleMensaje  =  " Usuario : " + userCI + "<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contraseña : " + sNumeroAleatorio;
                                }else{
                                    console.log("complemento ll",$scope.entcomplemento);
                                    detalleMensaje  =  " Usuario : " + userCI + "-" + $scope.entcomplemento +  "<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contraseña : " + sNumeroAleatorio;
                                }
                                console.log("mayor");
                                console.log("!! 0 !!",response);
                                //sweet.show('¡El número de Cédula de Identidad ya se encuentra registrado!', "Favor ingresar con su usuario y contraseña proporcionado o verificar que el número de Cédula de Identidad sea el correcto y si usted no realizó dicho registro, puede apersonarse por las Plataformas de Atención Ciudadana del GAMLP para realizar su registro.", 'warning');
                                if (response.record[0].dtspsl_verificado) {
                                
                                    if (response.record[0].dtspsl_complemento) {
                                        if (response.record[0].dtspsl_ci == $scope.entcedula) {
                                               if (response.record[0].dtspsl_complemento == $scope.entcomplemento) {
                                                    sweet.show('¡El número de Cédula de Identidad ya se encuentra registrado!', "Favor ingresar con su usuario y contraseña proporcionado o verificar que el número de Cédula de Identidad sea el correcto y si usted no realizó dicho registro, puede apersonarse por las Plataformas de Atención Ciudadana del GAMLP para realizar su registro.", 'warning');
                                                    $("#cerrar").click();
                                                    $('#formModal').modal('hide');
                                                    $scope.limpiarFormRegistro();
                                                    console.log("-----11 ");
                                               }else{
                                                if ($scope.entcomplemento=="") {
                                                    sweet.show('¡El número de Cédula de Identidad ya se encuentra registrado!', "Favor ingresar con su usuario y contraseña proporcionado o verificar que el número de Cédula de Identidad sea el correcto y si usted no realizó dicho registro, puede apersonarse por las Plataformas de Atención Ciudadana del GAMLP para realizar su registro.", 'warning');
                                                    $("#cerrar").click();
                                                    $('#formModal').modal('hide');
                                                    $scope.limpiarFormRegistro();
                                                    console.log("--------55");
                                                }else{
                                                    console.log("--------------------");
                                                    console.log(response.record[0].dtspsl_complemento);
                                                    console.log($scope.entcomplemento);
                                                    $.unblockUI();                    
                                                    $scope.getCaptchasX();
                                                    $scope.registroCiudadano(response);
                                                    console.log("----22");
                                                }
                                               } 
                                        }else{
                                            console.log("-----33 ");
                                        }
                                    }else{
                                        if (response.record[0].dtspsl_ci == $scope.entcedula) {
                                            
                                                sweet.show('¡El número de Cédula de Identidad ya se encuentra registrado!', "Favor ingresar con su usuario y contraseña proporcionado o verificar que el número de Cédula de Identidad sea el correcto y si usted no realizó dicho registro, puede apersonarse por las Plataformas de Atención Ciudadana del GAMLP para realizar su registro.", 'warning');
                                                $("#cerrar").click();
                                                $('#formModal').modal('hide');
                                                $scope.limpiarFormRegistro();
                                                console.log("-----44");
                                            

                                        
                                        }else{
                                            $.unblockUI();                    
                                            $scope.getCaptchasX();
                                            $scope.registroCiudadano(response);
                                            console.log("--------77");       
                                        }
                                    }
                                    
                                }else{
                                    if (response.record[0].dtspsl_complemento) {
                                        if (response.record[0].dtspsl_ci == $scope.entcedula && response.record[0].dtspsl_complemento== $scope.entcomplemento) {
                                                var parametros = {
                                                    "table_name":"ciudadanos",
                                                    "ids" : oidCiudadano,
                                                    "body":{"record": [{
                                                                    "dtspsl_pin": sNumeroAleatorio,
                                                                    "dtspsl_verificado": "SI",
                                                                        }]
                                                            }
                                                    };
                                                    DreamFactory.api[CONFIG.SERVICERC].updateRecordsByIds(parametros).success(function (results){
                                                        $.unblockUI();  
                                                    });
                                                    if (response.record[0].dtspsl_correo) {
                                                        if (response.record[0].dtspsl_correo==" " || response.record[0].dtspsl_correo=="") {
                                                            sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura. \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                            $("#cerrar").click();
                                                            $('#formModal').modal('hide');
                                                            $scope.limpiarFormRegistro();
                                                        }else{
                                                            sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+response.record[0].dtspsl_correo + " \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                            sCorreo=response.record[0].dtspsl_correo;
                                                            descripcionNombre=response.record[0].dtspsl_nombres;
                                                            $scope.envioMensajes(detalleMensaje, sCorreo, descripcionNombre);
                                                            $("#cerrar").click();
                                                            $('#formModal').modal('hide');
                                                            $scope.limpiarFormRegistro();
                                                        }
                                                    }else{
                                                        sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura. \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                        $("#cerrar").click();
                                                        $('#formModal').modal('hide');
                                                        $scope.limpiarFormRegistro();
                                                    }

                                        }else{
                                            var parametros = {
                                                "table_name":"ciudadanos",
                                                "ids" : oidCiudadano,
                                                "body":{"record": [{
                                                                "dtspsl_pin": sNumeroAleatorio,
                                                                "dtspsl_verificado": "SI",
                                                                    }]
                                                        }
                                                };
                                                DreamFactory.api[CONFIG.SERVICERC].updateRecordsByIds(parametros).success(function (results){
                                                    $.unblockUI();  
                                                });
                                                if (response.record[0].dtspsl_correo) {
                                                    if (response.record[0].dtspsl_correo==" " || response.record[0].dtspsl_correo=="") {
                                                        sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura. \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                        $("#cerrar").click();
                                                        $('#formModal').modal('hide');
                                                        $scope.limpiarFormRegistro();
                                                    }else{
                                                        sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+response.record[0].dtspsl_correo + " \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                        sCorreo=response.record[0].dtspsl_correo;
                                                        descripcionNombre=response.record[0].dtspsl_nombres;
                                                        $scope.envioMensajes(detalleMensaje, sCorreo, descripcionNombre);
                                                        $("#cerrar").click();
                                                        $('#formModal').modal('hide');
                                                        $scope.limpiarFormRegistro();
                                                    }
                                                }else{
                                                    sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura. \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                    $("#cerrar").click();
                                                    $('#formModal').modal('hide');
                                                    $scope.limpiarFormRegistro();
                                                }
                                        }

                                    }else{
                                        if (response.record[0].dtspsl_ci == $scope.entcedula) {
                                            var parametros = {
                                                "table_name":"ciudadanos",
                                                "ids" : oidCiudadano,
                                                "body":{"record": [{
                                                                "dtspsl_pin": sNumeroAleatorio,
                                                                "dtspsl_verificado": "SI",
                                                                    }]
                                                        }
                                                };
                                                DreamFactory.api[CONFIG.SERVICERC].updateRecordsByIds(parametros).success(function (results){
                                                    $.unblockUI();  
                                                });
                                                if (response.record[0].dtspsl_correo) {
                                                    if (response.record[0].dtspsl_correo==" " || response.record[0].dtspsl_correo=="") {
                                                        sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura. \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                        $("#cerrar").click();
                                                        $('#formModal').modal('hide');
                                                        $scope.limpiarFormRegistro();
                                                    }else{
                                                        sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+response.record[0].dtspsl_correo + " \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                        sCorreo=response.record[0].dtspsl_correo;
                                                        descripcionNombre=response.record[0].dtspsl_nombres;
                                                        $scope.envioMensajes(detalleMensaje, sCorreo, descripcionNombre);
                                                        $("#cerrar").click();
                                                        $('#formModal').modal('hide');
                                                        $scope.limpiarFormRegistro();
                                                    }
                                                }else{
                                                    sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura. \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                    $("#cerrar").click();
                                                    $('#formModal').modal('hide');
                                                    $scope.limpiarFormRegistro();
                                                }
                                        }else{
                                            var parametros = {
                                                "table_name":"ciudadanos",
                                                "ids" : oidCiudadano,
                                                "body":{"record": [{
                                                                "dtspsl_pin": sNumeroAleatorio,
                                                                "dtspsl_verificado": "SI",
                                                                    }]
                                                        }
                                                };
                                                DreamFactory.api[CONFIG.SERVICERC].updateRecordsByIds(parametros).success(function (results){
                                                    $.unblockUI();  
                                                });
                                                if (response.record[0].dtspsl_correo) {
                                                    if (response.record[0].dtspsl_correo==" " || response.record[0].dtspsl_correo=="") {
                                                        sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura. \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                        $("#cerrar").click();
                                                        $('#formModal').modal('hide');
                                                        $scope.limpiarFormRegistro();
                                                    }else{
                                                        sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+response.record[0].dtspsl_correo + " \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                        sCorreo=response.record[0].dtspsl_correo;
                                                        descripcionNombre=response.record[0].dtspsl_nombres;
                                                        $scope.envioMensajes(detalleMensaje, sCorreo, descripcionNombre);
                                                        $("#cerrar").click();
                                                        $('#formModal').modal('hide');
                                                        $scope.limpiarFormRegistro();
                                                    }
                                                }else{
                                                    sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura. \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                                                    $("#cerrar").click();
                                                    $('#formModal').modal('hide');
                                                    $scope.limpiarFormRegistro();
                                                }

                                        }
                                    }}
                                

                                $.unblockUI();
                            }else{
                                $.unblockUI();                    
                                $scope.getCaptchasX();    
                                $scope.registroCiudadano(response);
                            }
                        }).error(function(error) {
                            $.unblockUI();                            
                            $scope.errors["error_uos"] = error;
                        });
                    }
                    else{
                        $.unblockUI();
                        sweet.show('', "El número de C.I. no concuerda con el anterior formulario, favor revisar.", 'warning');
                        $scope.getCaptchasX();
                    }
            }
};
    
    //creando un nuevo registro 
    /*********************** Municipios ****************************/
    
    $scope.cargarMunicipios = function(idMun){
        var smunicipio   = new reglasnegocio();
        smunicipio.id = 23;
        smunicipio.parametros = '{"provincia":"' + idMun + '"}';
        smunicipio.llamarregla(function(results){
            results = JSON.parse(results);
            if(results.length > 0){
                $scope.aMunicipios = results;
                $scope.deshabilitadoM = false;
            }else{
                $scope.msg = "Error !!";
                $scope.deshabilitadoM = true;
                $scope.deshabilitadoMc = true;
                $scope.deshabilitadoDs = true;
                $scope.deshabilitadoZ = true;
                $scope.registro.macrodistrito = 0;
                $scope.registro.distrito = 0;
                $scope.registro.zona = 0;         
            }             
        });
    }
    /****************************************************************/
    $scope.actualizaDepartamento = function (dato){
        if (dato == 2) {
            $scope.registro.departamento = 0;
            $scope.registro.provincia = 0;
            //$scope.registro.municipio = 0;
            $scope.registro.macrodistrito = 0;
            $scope.registro.distrito = 0;
            $scope.registro.zona = 0;
            $scope.deshabilitadoD = true;
            /*$scope.deshabilitadoP = true;
            $scope.deshabilitadoM = true;
            $scope.deshabilitadoMc = true;
            $scope.deshabilitadoDs = true;
            $scope.deshabilitadoZ = true;*/
        } else {
            //$scope.deshabilitado = false;
            $scope.deshabilitadoD = false;
            /*$scope.deshabilitadoP = false;
            $scope.deshabilitadoM = false;
            $scope.deshabilitadoMc = false;
            $scope.deshabilitadoDs = false;
            $scope.deshabilitadoZ = false;*/
        }
    }
    /*********************** Provincias ****************************/
    $scope.cargarProvincia = function(idProv){
        var sprovincia   = new reglasnegocio();
        sprovincia.id = 30;
        sprovincia.parametros = '{"departamento":"'+ idProv + '"}';
        sprovincia.llamarregla(function(results){
            results = JSON.parse(results);
            console.log("llamar_provincias:",results)
            if(results.length > 0){
               $scope.aProvincias = results;
               $scope.deshabilitadoP = false;
           } else {
               $scope.msg = "Error !!";
               $scope.deshabilitadoP = true;
               $scope.deshabilitadoM = true;
               $scope.deshabilitadoMc = true;
               $scope.deshabilitadoDs = true;
               $scope.deshabilitadoZ = true;
               $scope.registro.provincia = 0;
                 //$scope.registro.municipio = 0;
                 $scope.registro.macrodistrito = 0;
                 $scope.registro.distrito = 0;
                 $scope.registro.zona = 0;
             }             
         });
    }  
    /************************ Municipios *************************/
    $scope.cargarMunicipio = function(idMun){
        var smunicipio   = new reglasnegocio();
          smunicipio.id = 23;
          smunicipio.parametros = '{"provincia":"' + idMun + '"}';
          smunicipio.llamarregla(function(results){
            results = JSON.parse(results);
            if(results.length > 0){
                $scope.aMunicipios = results;
                $scope.deshabilitadoM = false;
            }else{
                $scope.msg = "Error !!";
                $scope.deshabilitadoM = true;
                $scope.deshabilitadoMc = true;
                $scope.deshabilitadoDs = true;
                $scope.deshabilitadoZ = true;
                //$scope.registro.municipio = 0;
                $scope.registro.macrodistrito = 0;
                $scope.registro.distrito = 0;
                $scope.registro.zona = 0;         
            }             
        });
    }
    /****************************************************************/
    /************************ Macrodistritos *************************/
    $scope.cargarMacrodistrito = function(idMac){
        $scope.idMacrod = idMac;
        console.log("idMac:_ ", idMac);
        var smacrodistrito   = new reglasnegocio();
        smacrodistrito.id = 24;
        smacrodistrito.parametros = '{"macrodistrito":"' + idMac + '"}';
        smacrodistrito.llamarregla(function(results){
                    results = JSON.parse(results);
                     if(results.length > 0){
                            $scope.aMacrodistritos = results;
                            console.log("macro valores",results);
                            $scope.deshabilitadoMc = false;
                     }else{
                        console.log("erorrr");
                             $scope.msg = "Error !!";
                             $scope.deshabilitadoMc = true;
                             $scope.deshabilitadoDs = true;
                             $scope.deshabilitadoZ = true;
                             $scope.registro.macrodistrito = 0;
                             console.log("carga macro::: ", $scope.registro.macrodistrito);
                             $scope.registro.distrito = 0;
                             $scope.registro.zona = 0;         
                     }             
             });
     }
    /********************************************************************/ 
    /***************************** Distritos ****************************/
    $scope.cargarDistrito = function(idDis){
     var sdistrito   = new reglasnegocio();
     sdistrito.id = 25;
     sdistrito.parametros = '{"distrito":"' + idDis + '"}';
     sdistrito.llamarregla(function(results){
                    results = JSON.parse(results);
                     if(results.length > 0){
                             $scope.aDistritos = results;
                             $scope.deshabilitadoDs = false;
                     }else{
                             $scope.msg = "Error !!";
                             $scope.deshabilitadoDs = true;
                             $scope.deshabilitadoZ = true;
                             $scope.registro.distrito = 0;
                             $scope.registro.zona = 0;         
                     }             
             });
     }
    /********************************************************************/
    /************************** Zona ******************************/
    $scope.cargarZona = function(idZona){

        console.log('cargar zona2 :', idZona);
        var szona   = new reglasnegocio();
        szona.id = 26;
        szona.parametros = '{"zona":"' + idZona + '"}';
        szona.llamarregla(function(results){
            results = JSON.parse(results);
            console.log(results.length);
            if(results.length > 0){
               $scope.aZonas = results;
               $scope.deshabilitadoZ = false;
           }else{
               $scope.msg = "Error !!";
               $scope.deshabilitadoZ = true;
               $scope.registro.zona = 0;         
           }             
       });
    };
    /**************************************************************/
    //creando un nuevo registro 
    $scope.validacamposJuridico = function (){
        /*console.log(tipoPersona);
        alert(tipoPersona);*/
        if(tipoPersona == 'NATURAL')
        {
            $scope.opcionpersonaNatural = true;
            $scope.opcionpersonaJuridico = null;
            $scope.tituloVentana = 'Verificación de número de documento de identidad';         
        } 
        else 
        {
            $scope.opcionpersonaJuridico = true;
            $scope.opcionpersonaNatural = null;
            $scope.tituloVentana = 'Verificación de número de NIT';                     
        }   
        // *****FUNCION DE CAPCHA
        $scope.getCaptchasX();
    };

    $scope.registroCiudadanoMensajes = function (resultado) {
        console.log("RESULTADO:",resultado);
        console.log("USUARIO:",resultado.success.usuario);
        console.log("PIN:",resultado.success.pin);

        // var results = resultado.success.data;
        // console.log("RESULTS",results);
        // console.log("USUARIO",results[0].usuario);
       
        $scope.registro = '';
                //NATURAL
        if(tipoPersona == "NATURAL") {
            
            $.unblockUI();
            if ($scope.entcomplemento=="") {
                //var detalleMensaje  =  " Usuario : " + $scope.entcedula + "<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contraseña : " + sNumeroAleatorio;
                var detalleMensaje  =  " Usuario : " + resultado.success.usuario + "<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contraseña : " + resultado.success.pin;
            }else{
                //var detalleMensaje  =  " Usuario : " + $scope.entcedula+"-"+$scope.entcomplemento + "<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contraseña : " + sNumeroAleatorio;
                var detalleMensaje  =  " Usuario : " + resultado.success.usuario+"-"+$scope.entcomplemento + "<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contraseña : " + resultado.success.pin;
            }
            if (sCorreo=="" ) {
                $("#cerrar").click();
                $('#formModal').modal('hide');
                var sReferencia ="warning";
                if ($scope.entcomplemento=="") {
                    //sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n contraseña : "+sNumeroAleatorio+"\n  Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura y no olvide de actualizar sus datos personales con su cuenta.", 'success');
                    sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+resultado.success.usuario+"\n contraseña : "+resultado.success.pin+"\n  Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura y no olvide de actualizar sus datos personales con su cuenta.", 'success');
                }else{
                    //sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"-"+$scope.entcomplemento+"\n contraseña : "+sNumeroAleatorio+"\n  Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura y no olvide de actualizar sus datos personales con su cuenta.", 'success');                            
                    sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+resultado.success.usuario+"-"+$scope.entcomplemento+"\n contraseña : "+resultado.success.pin+"\n  Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura y no olvide de actualizar sus datos personales con su cuenta.", 'success');                            
                }
                
            } else {
                if (sCorreo != "") {
                    // if ($scope.entcomplemento=="") {
                    //     sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+sCorreo + " \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                    // }else{
                    //     sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"-"+$scope.entcomplemento+"\n Contraseña : "+sNumeroAleatorio+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+sCorreo + "\n No olvide actualizar sus datos personales con su cuenta.", 'success');
                    // }

                    if ($scope.entcomplemento=="") {
                        sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+resultado.success.usuario+"\n Contraseña : "+resultado.success.pin+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+sCorreo + " \n No olvide actualizar sus datos personales con su cuenta.", 'success');
                    }else{
                        sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+resultado.success.usuario+"-"+$scope.entcomplemento+"\n Contraseña : "+resultado.success.pin+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+sCorreo + "\n No olvide actualizar sus datos personales con su cuenta.", 'success');
                    }

                    $("#cerrar").click();
                    $('#formModal').modal('hide');
                    $scope.envioMensajes(detalleMensaje, sCorreo, descripcionNombre);
                } 
            }
            $scope.limpiarFormRegistro();
        }//JURÍDICO
        else if(tipoPersona == "JURIDICO") {
            $.unblockUI();
            var detalleMensaje  =  " Usuario : " + $scope.nitt + "<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contraseña : " + resultado.success.pin;
            if (sCorreoEmp=="") {
                //var mensajeExito = "Estimado Ciudadano para ingresar al sistema, debe tomar nota de la siguiente información su Nro PIN " + sNumeroAleatorio;
                $("#cerrar").click();
                 $('#formModal').modal('hide');
                var sReferencia ="warning";
                //$scope.envioMensajej(detalleMensaje, sCorreoEmp, razonSocial);
            } else {
                if (sCorreoEmp) {
                    sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+ $scope.nitt +"\n Contraseña : "+resultado.success.pin+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+ sCorreoEmp + "\n No olvide actualizar sus datos personales con su cuenta.", 'success');
                    //var mensajeExito = "Estimado Ciudadano, para ingresar al sistema, su usuario y clave secreta fue enviado al siguiente correo electrónico: " + sCorreoEmp;
                    $("#cerrar").click();
                     $('#formModal').modal('hide');
                     console.log("CORREO:", sCorreoEmp);
                     console.log("RAZON SOCIAL:", $scope.razonSocialValor);
                    $scope.envioMensajej(detalleMensaje, sCorreoEmp,$scope.razonSocialValor);
                } else {
                    sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.nitt+"\n contraseña : "+resultado.success.pin+"\n  Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura y no olvide de actualizar sus datos personales con su cuenta.", 'success');
                    //var mensajeExito = "Estimado Ciudadano para ingresar al sistema, debe tomar nota de la siguiente información se envió el Nro. PIN:" + sNumeroAleatorio + ", al celular: " + sCelular;
                    $("#cerrar").click();
                     $('#formModal').modal('hide');
                    //$scope.envioMensajej(detalleMensaje, sCorreoEmp, razonSocial);
                }
            }
            $scope.limpiarFormRegistro();
        }else{
            $.unblockUI();                    
            $scope.msg = "Error !!";
        }

    }

    $scope.registroCiudadano = function (response) {
        
        var response = $rootScope.dataDatospersonales;

    ///////////////////////////////////////////////// RECORRER OBJETO /////////////////////////////////////////////////
        
        var response2 = response;
        try{
            for (var dato in response)
            {
                if(response[dato] && response[dato]!= null && typeof(response[dato]) != "undefined" && response[dato] != "")
                {
                    if(typeof(response[dato]) == "string" && 
                        dato != "correo" && 
                        dato != "correoRep" &&
                        dato != "dtspsl_file_fotocopia_ci" &&
                        dato != "dtspsl_file_factura_luz" &&
                        dato != "dtspsl_URL" &&
                        dato != "FILE_FOTOCOPIA_CI" &&
                        dato != "FILE_FACTURA_LUZ" ) 
                    {
                            //console.log(response[dato]);
                            for (var i in response2) {
                                if (response2[i] == response[dato]) 
                                {
                                    response2[i] = response2[i].toUpperCase();
                                    break; //Stop this loop, we found it!
                                }
                            } 
                    }
                }
            }
        }
        catch(e)
        {
            console.log(e);
        }
        console.log("objFinal", response);
    
    ///////////////////////////////////////////////// FIN RECORRER OBJETO
        
        
        //console.log("dsad",response);
        sDireccion = response.direccion.trim();
        sFono = response.telefono.trim();
        sCelular = response.celular.trim();
        sCorreo = response.correo.trim();
        descripcionNombre = response.nombre.trim();
        descripcionPaterno = response.paterno.trim();
        descripcionMaterno = response.materno.trim();
        var datos = {};
        if(response.estado_civil) {
            datos['dtspsl_id_estado_civil'] = response.estado_civil;  
        } else {   
            datos['dtspsl_id_estado_civil'] = '';
        }
        if(response.estado_civil == " ") {
            response.estado_civil = ""
        }
        //var a = moment(fechactual).format('YYYY-MM-DD')
        //console.log('fecha_actual',fechactual );
        
        console.log("aa", response.profesion);

        
        if(tipoPersona == "NATURAL") {
            sNumeroAleatorio = Math.round(Math.random()*100000) + response.cedula;  
            //     var parametros = {
            //     "table_name":"ciudadanos",
            //     "body":{
            //         "record": [
            //             {
            //                 "dtspsl_id":"1",
            //                 "dtspsl_id_estado_civil": response.estado_civil,
            //                 "dtspsl_id_tp_registro": "1",
            //                 "dtspsl_ci": response.cedula2,
            //                 "dtspsl_verificado": "SI",
            //                 "dtspsl_complemento": response.complemento,
            //                 "dtspsl_expedido": response.expedido,
            //                 "dtspsl_pin": sNumeroAleatorio,
            //                 "dtspsl_nombres": response.nombre,
            //                 "dtspsl_paterno": response.paterno,
            //                 "dtspsl_materno": response.materno,
            //                 "dtspsl_tercer_apellido": response.tercer,
            //                 "dtspsl_sexo": response.sexo,
            //                 "dtspsl_activacionf": "NO",
            //                 "dtspsl_activaciond": "NO",                           
            //                 "dtspsl_fec_nacimiento": response.fecha_nacimiento,
            //                 "dtspsl_usr_id": idUsuario,
            //                 "dtspsl_registrado": fechactual,
            //                 "dtspsl_modificado":fechactual,
            //                 "dtspsl_ocupacion": response.ocupacion,
            //                 "dtspsl_otra_profesion": response.otra_profesion,
            //                 "dtspsl_profesion": response.profesion,
            //                 "dtspsl_poder_replegal": response.repLegal,
            //                 "dtspsl_nro_documento": response.nroDocumento,
            //                 "dtspsl_nro_notaria": response.nroNotaria,
            //                 "dtspsl_nit": response.nit,
            //                 "dtspsl_razon_social": response.razonSocial,
            //                 "dtspsl_correo" : response.correo,
            //                 "dtspsl_telefono" : response.telefono,
            //                 "dtspsl_movil" : response.celular,

            //                 "dtspsl_estado" : "ACTIVO",
            //                 "dtspsl_estado_activacion" : "DESBLOQUEADO",
            //                 "dtspsl_observacion_activacion" : "NINGUNA",
            //                 "dtspsl_fec_activacionf" : fechactual,
            //                 "dtspsl_fec_activaciond" : fechactual,
            //                 "dtspsl_direccion" : response.direccion,
            //                 "dtspsl_tipo_persona" : tipoPersona,
            //                 "dtspsl_lugar_nacimiento" : response.lugarNacimiento,
            //                 "dtspsl_pais" : response.pais,
            //                 "dtspsl_departamento" : response.departamento,
            //                 "dtspsl_provincia" : response.provincia,
            //                 "dtspsl_municipio" : response.municipio,
            //                 "dtspsl_macrodistrito": response.macrodistrito, 
            //                 "dtspsl_distrito": response.distrito,
            //                 "dtspsl_zona" : response.zona,
            //                 "dtspsl_tipo_via" : response.tipo_via,
            //                 "dtspsl_nombre_via" : response.nombrevia,
            //                 "dtspsl_numero_casa" : response.numero,
            //                 "dtspsl_edificio" : response.edificio,
            //                 "dtspsl_bloque" : response.bloque,
            //                 "dtspsl_piso" : response.piso,
            //                 "dtspsl_oficina" : response.numeroOficina,
            //                 "dtspsl_latitud" : response.latitud,
            //                 "dtspsl_longitud" : response.longitud,
            //                 "dtspsl_pais_origen" : response.pais_origen
            //             }
            //         ]
            //     }
            // }; 
            var registrarCiudadano=new rcNatural();

            registrarCiudadano.ci=response.cedula2;
            registrarCiudadano.complemento=response.complemento;
            registrarCiudadano.nombre=response.nombre;
            registrarCiudadano.paterno=response.paterno;
            registrarCiudadano.materno=response.materno;
            registrarCiudadano.tercer_apellido=response.tercer;
            registrarCiudadano.expedido=response.expedido;
            registrarCiudadano.fec_nacimiento=response.fecha_nacimiento;
            registrarCiudadano.lugar_nacimiento=response.lugarNacimiento;
            registrarCiudadano.pais_origen=response.pais_origen;
            registrarCiudadano.sexo=response.sexo;
            registrarCiudadano.id_estado_civil=response.estado_civil;
            registrarCiudadano.profesion=response.profesion;
            registrarCiudadano.otra_profesion=response.otra_profesion;
            registrarCiudadano.telefono=response.telefono;
            registrarCiudadano.movil=response.celular;
            registrarCiudadano.correo=response.correo;
            registrarCiudadano.direccion=response.direccion;
            registrarCiudadano.usr_id="0";

            console.log("REGISTRA CIUDADANO...:",registrarCiudadano);

            registrarCiudadano.crearNatural(function(resultado){
                console.log("RESULTADO",resultado);
                resultadoApi = JSON.parse(resultado);
                console.log("crearNatural....:", resultadoApi); 
                if( typeof(resultadoApi.success) != 'undefined')
                {

                    console.log("REGISTRO CORRECTO");
                    $scope.registroCiudadanoMensajes(resultadoApi);


                }
                else
                {
                    $.unblockUI();
                    console.log("error en centralRiesgosSalud");
                    console.log(resultadoApi.error.message);
                    console.log(resultadoApi.error.code);
                    sweet.show(resultadoApi.error.message);
                }
            });
        }else{
            var razonSocial = response.razonSocial;
            sNumeroAleatorio = Math.round(Math.random()*100000) + response.nit; 
            var ci11 = response.cedula.split("-");
            var c1111 = ci11[0];  
            // var parametros = {
            // "table_name":"ciudadanos",
            // "body":{
            //     "record": [
            //         {
            //             "dtspsl_id":"1",
            //             "dtspsl_id_tp_registro": "1",
            //             "dtspsl_ci_representante": c1111,
            //             "dtspsl_complemento_representante": response.complemento,
            //             "dtspsl_pin": sNumeroAleatorio,                        
            //             "dtspsl_representante":response.nombre.trim() + " " + response.paterno.trim() + " " + response.materno.trim(),                        
            //             "dtspsl_activacionf": "NO",
            //             "dtspsl_activaciond": "NO",                           
            //             "dtspsl_usr_id": idUsuario,
            //             "dtspsl_registrado": fechactual,
            //             "dtspsl_modificado":fechactual,
            //             "dtspsl_poder_replegal": response.repLegal,
            //             "dtspsl_nro_notaria": response.nroNotaria,
            //             "dtspsl_nit": response.nit,
            //             "dtspsl_razon_social": response.razonSocial,
            //             "dtspsl_correo" : response.correoEmp,
            //             "dtspsl_telefono" : response.telefonoEmp,
            //             "dtspsl_movil" : response.celularEmp,
            //             "dtspsl_estado" : "ACTIVO",
            //             "dtspsl_estado_activacion" : "DESBLOQUEADO",
            //             "dtspsl_observacion_activacion" : "NINGUNA",
            //             "dtspsl_fec_activacionf" : fechactual,
            //             "dtspsl_fec_activaciond" : fechactual,
            //             "dtspsl_tipo_persona" : tipoPersona
            //         }
            //         ]
            //     }
            // }; 

            var registrarJuridico=new rcJuridico();

            registrarJuridico.nit=response.nit;
            registrarJuridico.razonSocial=response.razonSocial;
            registrarJuridico.telefono=response.telefonoEmp;
            registrarJuridico.movil=response.celularEmp;
            registrarJuridico.correo=response.correoEmp;
            registrarJuridico.ci=c1111;
            registrarJuridico.complemento=response.complemento;
            registrarJuridico.nombre =response.nombre.trim();
            registrarJuridico.paterno =response.paterno.trim();
            registrarJuridico.materno =response.materno.trim();
            registrarJuridico.poder_replegal =response.repLegal;
            registrarJuridico.nro_notaria =response.nroNotaria;
            registrarJuridico.usr_id="0";

            registrarJuridico.crearJuridico(function(resultado){
                console.log("RESULTADO",resultado);
                resultadoApi = JSON.parse(resultado);
                console.log("crearNatural....:", resultadoApi); 
                if( typeof(resultadoApi.success) != 'undefined')
                {

                    //console.log("REGISTRO CORRECTO");
                    $scope.registroCiudadanoMensajes(resultadoApi);


                }
                else
                {
                    $.unblockUI();
                    console.log("error en centralRiesgosSalud");
                    console.log(resultadoApi.error.message);
                    console.log(resultadoApi.error.code);
                }
            });
        }

      
    //     DreamFactory.api[CONFIG.SERVICERC].createRecords(parametros).success(function (results){
    //         console.log("123", results);
    //         console.log("123", results.record.length);
    //         if(results.record.length > 0){
                

    //             $scope.registro = '';
    //             //NATURAL
				// if(tipoPersona == "NATURAL") {
                    
    //                 $.unblockUI();
    //                 if ($scope.entcomplemento=="") {
    //                     var detalleMensaje  =  " Usuario : " + $scope.entcedula + "<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contraseña : " + sNumeroAleatorio;
    //                 }else{
    //                     var detalleMensaje  =  " Usuario : " + $scope.entcedula+"-"+$scope.entcomplemento + "<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contraseña : " + sNumeroAleatorio;
    //                 }
    //                 if (sCorreo=="" ) {
    //                     $("#cerrar").click();
    //                     $('#formModal').modal('hide');
    //                     var sReferencia ="warning";
    //                     if ($scope.entcomplemento=="") {
    //                         sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n contraseña : "+sNumeroAleatorio+"\n  Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura y no olvide de actualizar sus datos personales con su cuenta.", 'success');
    //                     }else{
    //                         sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"-"+$scope.entcomplemento+"\n contraseña : "+sNumeroAleatorio+"\n  Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura y no olvide de actualizar sus datos personales con su cuenta.", 'success');                            
    //                     }
                        
    //                 } else {
    //                     if (sCorreo != "") {
    //                         if ($scope.entcomplemento=="") {
    //                             sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"\n Contraseña : "+sNumeroAleatorio+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+sCorreo + " \n No olvide actualizar sus datos personales con su cuenta.", 'success');
    //                         }else{
    //                             sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.entcedula+"-"+$scope.entcomplemento+"\n Contraseña : "+sNumeroAleatorio+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+sCorreo + "\n No olvide actualizar sus datos personales con su cuenta.", 'success');
    //                         }
    //                         $("#cerrar").click();
    //                         $('#formModal').modal('hide');
    //                         $scope.envioMensajes(detalleMensaje, sCorreo, descripcionNombre);
    //                     } 
    //                 }
    //                 $scope.limpiarFormRegistro();
    //             }//JURÍDICO
    //             else if(tipoPersona == "JURIDICO") {
    //                 $.unblockUI();
    //                 var detalleMensaje  =  " Usuario : " + $scope.nitt + "<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contraseña : " + sNumeroAleatorio;
    //                 if (sCorreoEmp=="") {
    //                     //var mensajeExito = "Estimado Ciudadano para ingresar al sistema, debe tomar nota de la siguiente información su Nro PIN " + sNumeroAleatorio;
    //                     $("#cerrar").click();
    //                      $('#formModal').modal('hide');
    //                     var sReferencia ="warning";
    //                     //$scope.envioMensajej(detalleMensaje, sCorreoEmp, razonSocial);
    //                 } else {
    //                     if (sCorreoEmp) {
    //                         sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+ $scope.nitt +"\n Contraseña : "+sNumeroAleatorio+"\n  Sus datos también fueron enviados al siguiente correo electrónico: "+ sCorreoEmp + "\n No olvide actualizar sus datos personales con su cuenta.", 'success');
    //                         //var mensajeExito = "Estimado Ciudadano, para ingresar al sistema, su usuario y clave secreta fue enviado al siguiente correo electrónico: " + sCorreoEmp;
    //                         $("#cerrar").click();
    //                          $('#formModal').modal('hide');
    //                         $scope.envioMensajej(detalleMensaje, sCorreoEmp, razonSocial);
    //                     } else {
    //                         sweet.show("Estimado Ciudadano", "Para ingresar al sistema, debe tomar nota de la siguiente información: \n Usuario : "+$scope.nitt+"\n contraseña : "+sNumeroAleatorio+"\n  Se recomienda que tenga un correo electrónico para enviar una clave secreta más segura y no olvide de actualizar sus datos personales con su cuenta.", 'success');
    //                         //var mensajeExito = "Estimado Ciudadano para ingresar al sistema, debe tomar nota de la siguiente información se envió el Nro. PIN:" + sNumeroAleatorio + ", al celular: " + sCelular;
    //                         $("#cerrar").click();
    //                          $('#formModal').modal('hide');
    //                         //$scope.envioMensajej(detalleMensaje, sCorreoEmp, razonSocial);
    //                     }
    //                 }
    //                 $scope.limpiarFormRegistro();
    //             }else{
    //                 $.unblockUI();                    
    //                 $scope.msg = "Error !!";
    //             }
    //         }
    //         }).error(function(results){
    //             $.unblockUI();            
    //         });
        
    };
    
    $scope.envioMensajej = function(mensajeCorreo, email, razon){
        var sMensajeValidacion = mensajeCorreo.replace(/ /g, "_");
        var parametros = {
            "cuerpo" : sMensajeValidacion,
            "asunto" : vAsunto,
            "para" : email,
            "ciudadano" : razon,
            "mensaje": vMensaje
        }
        $.ajax({ 
            data: parametros, 
            url: 'http://200.105.139.183:9090/smsemail/email/mail.php',
            type: 'get', 
            beforeSend: function () { 
            }, 
            success: function (response) { 
//                    console.log(response); 
            }
        }); 
    //sweet.show('', mensajeAlerta, 'success'); 
    };

    $scope.envioMensaje = function(mensajeCorreo, mensajeAlerta, email, ciudadano){
        var sMensajeValidacion = mensajeCorreo.replace(/ /g, "_");
        var parametros = {
            "cuerpo" : sMensajeValidacion,
            "asunto" : vAsunto,
            "para" : email,
            "ciudadano" : ciudadano,
            "mensaje": vMensaje
        }
        $.ajax({ 
            data: parametros, 
            url: 'http://200.105.139.183:9090/smsemail/email/mail.php',
            type: 'get', 
            beforeSend: function () { 
            }, 
            success: function (response) { 
//                    console.log(response); 
            }
        }); 
    sweet.show('', mensajeAlerta, 'success'); 
    };
    $scope.envioMensajes = function(mensajeCorreo, email, ciudadano){
        var sMensajeValidacion = mensajeCorreo.replace(/ /g, "_");
        var parametros = {
            "cuerpo" : sMensajeValidacion,
            "asunto" : vAsunto,
            "para" : email,
            "ciudadano" : ciudadano,
            "mensaje": vMensaje
        }
        $.ajax({ 
            data: parametros, 
            url: 'http://200.105.139.183:9090/smsemail/email/mail.php',
            type: 'get', 
            beforeSend: function () { 
            }, 
            success: function (response) { 
                    console.log(response); 
            }
        });
    };
       
    /******************************************************/
    
    $scope.almacenarDirecion = function(sIdReg){
        var direccion   = new reglasnegocio();
        direccion.id = 55;                                
        direccion.parametros = '{"dtsdrc_direccion": "' + sDireccion +'","dtsdrc_id_zona":1,"dtsdrc_id_dtspesonales": "' + sIdReg + '","dtsdrc_usr_id":1}';
        direccion.llamarregla(function(results){
        //results = JSON.parse(results);
       });                
    }
    
    /******************************************************/
    //almacenar datos de comunicacion
    $scope.almacenarDatosComunicacion = function(sIdReg){
        var datosComunicacion = {
            "table_name":"_bp_datos_comunicacion",
            "body":{
                "record": [
                    {
                        //correo
                        "dtscmc_id_dtspersonal": sIdReg,
                        "dtscmc_id_tpcomunicacion": '1',
                        "dtscmc_validacion": 'NO',
                        "dtscmc_usr_id": '1',
                        "dtscmc_referencia": sCorreo,
                        "dtscmc_registrado" : "2015-06-05",
                        "dtscmc_modificado" : "2015-06-05"
                    }, {
                        //telefono
                        "dtscmc_id_dtspersonal": sIdReg,
                        "dtscmc_id_tpcomunicacion": '2',
                        "dtscmc_validacion": 'NO',
                        "dtscmc_referencia": sFono,
                        "dtscmc_usr_id": '1',
                        "dtscmc_registrado" : "2015-06-05",
                        "dtscmc_modificado" : "2015-06-05"
                    }, {
                        //movil
                        "dtscmc_id_dtspersonal": sIdReg,
                        "dtscmc_id_tpcomunicacion": '3',
                        "dtscmc_validacion": 'NO',
                        "dtscmc_referencia": sCelular,
                        "dtscmc_usr_id": '1',
                        "dtscmc_registrado" : "2015-06-05",
                        "dtscmc_modificado" : "2015-06-05"
                    }
                ]
            }
        };
        DreamFactory.api[CONFIG.SERVICE].createRecords(datosComunicacion).success(function (results){    
            registroLog.almacenarLog(sessionService.get('IDUSUARIO'),0,0, " Se registro a la persona de tipo " + descripcionPersona + " : " + descripcionNombre + " "+ descripcionPaterno  + " "+ descripcionMaterno  );        
             if(tipoPersona == "N"   )
            {   
                if (sCorreo == ""  && sCelular== "" ) {
                    var mensajeExito = "Estimado Ciudadano para ingresar al sistema, debe tomar nota de la siguiente información en caso de no tener correo, teléfono o celular apersonese a la plataforma mas cercana para validar sus datos con este Nº PIN :" + sNumeroAleatorio;
                    sweet.show('', mensajeExito, 'success'); 
                    $("#cerrar").click();
                    sw2=2;
                    sw=1;
                } else {   
                    var mensajeExito =  "Registro Almacenado correctamente, se envio notificación Nº  PIN " + sNumeroAleatorio;
                    sweet.show('', mensajeExito, 'success'); 
                    $("#cerrar").click();
                    sw2=2;
                    sw=1;
                }
                if (sCorreo=="" && sw2==1) {
                    var mensajeExito = "Estimado Ciudadano para ingresar al sistema, debe tomar nota de la siguiente información en caso de no tener correo, teléfono o celular apersonese a la plataforma mas cercana para validar sus datos con este Nº PIN :" + sNumeroAleatorio;
                    sweet.show('', mensajeExito, 'success'); 
                    $("#cerrar").click();
                    sw=1;
                } else {   
                    if (sCorreo=="" && sw2==1) {
                        var mensajeExito =  "Registro Almacenado correctamente, se envio notificación Nº  PIN " + sNumeroAleatorio;
                        sweet.show('', mensajeExito, 'success'); 
                        $("#cerrar").click();
                        sw=1;
                    }
                }
                if (sCelular =="" && sw==0) {
                    var mensajeExito = "Estimado Ciudadano para ingresar al sistema, debe tomar nota de la siguiente información en caso de no tener correo, teléfono o celular apersonese a la plataforma mas cercana para validar sus datos con este Nº PIN :" + sNumeroAleatorio;
                    sweet.show('', mensajeExito, 'success'); 
                    $("#cerrar").click();
                } else {   
                    if (sCelular =="" && sw==0) { 
                        var mensajeExito =  "Registro Almacenado correctamente, se envio notificación Nº  PIN " + sNumeroAleatorio;
                        sweet.show('', mensajeExito, 'success'); 
                        $("#cerrar").click();
                    }
                }
               
            } else {
                var mensajeExito =  "Registro Almacenado correctamente, se envio notificación Nº  PIN " + sNumeroAleatorio;
                sweet.show('', mensajeExito, 'success'); 
                $("#cerrar").click();
            }
        });
    }
    /*************************************** Datos comunicacion *******************************************/
    /*
    $scope.almacenarDatosComunicacion = function(sIdReg){
        var datosComunicacion   = new reglasnegocio();
        datosComunicacion.id = 56;                                
        datosComunicacion.llamarregla(function(results){
         results = JSON.parse(results);
         registroLog.almacenarLog(sessionService.get('IDUSUARIO'),0,0, " Se registro a la persona de tipo " + descripcionPersona + " : " + descripcionNombre + " "+ descripcionPaterno  + " "+ descripcionMaterno  );        
         if(tipoPersona == "N"   )
         {   
            if (sCorreo == ""  && sCelular== "" ) {
                var mensajeExito = "Estimado Ciudadano para ingresar al sistema, debe tomar nota de la siguiente información en caso de no tener correo, teléfono o celular apersonese a la plataforma mas cercana para validar sus datos con este Nº PIN :" + sNumeroAleatorio;
                sweet.show('', mensajeExito, 'success'); 
                $("#cerrar").click();
                sw2=2;
                sw=1;
            } else {   
                var mensajeExito =  "Registro Almacenado correctamente, se envio notificación Nº  PIN " + sNumeroAleatorio;
                sweet.show('', mensajeExito, 'success'); 
                $("#cerrar").click();
                sw2=2;
                sw=1;
            }
            if (sCorreo=="" && sw2==1) {
                var mensajeExito = "Estimado Ciudadano para ingresar al sistema, debe tomar nota de la siguiente información en caso de no tener correo, teléfono o celular apersonese a la plataforma mas cercana para validar sus datos con este Nº PIN :" + sNumeroAleatorio;
                sweet.show('', mensajeExito, 'success'); 
                $("#cerrar").click();
                sw=1;
            } else {   
                if (sCorreo=="" && sw2==1) {
                    var mensajeExito =  "Registro Almacenado correctamente, se envio notificación Nº  PIN " + sNumeroAleatorio;
                    sweet.show('', mensajeExito, 'success'); 
                    $("#cerrar").click();
                    sw=1;
                }
            }
            if (sCelular =="" && sw==0) {
                var mensajeExito = "Estimado Ciudadano para ingresar al sistema, debe tomar nota de la siguiente información en caso de no tener correo, teléfono o celular apersonese a la plataforma mas cercana para validar sus datos con este Nº PIN :" + sNumeroAleatorio;
                sweet.show('', mensajeExito, 'success'); 
                $("#cerrar").click();
            } else {   
                if (sCelular =="" && sw==0) { 
                    var mensajeExito =  "Registro Almacenado correctamente, se envio notificación Nº  PIN " + sNumeroAleatorio;
                    sweet.show('', mensajeExito, 'success'); 
                    $("#cerrar").click();
                }
            }

        } else {
            var mensajeExito =  "Registro Almacenado correctamente, se envio notificación Nº  PIN " + sNumeroAleatorio;
            sweet.show('', mensajeExito, 'success'); 
            $("#cerrar").click();
        }
     });                
    }
    */
    /***************************************************************************************************/
    /***************************** Zona Macrodistritos *********************************/
    
    $scope.getZonaMD = function() {
        var sgetZona = new reglasnegocio();
        sgetZona.id = 44;
        sgetZona.parametros = '{}';
        $scope.aZonaMD = {};
            sgetZona.llamarregla(function(response){
            response = JSON.parse(response);
                     if (response.length > 0) {
                             $scope.aZonaMD = response;
                     } else {
                             $scope.aZonaMD = "";
                     }
             });
     };
    
    /***********************************************************************************/
    /******************************** Lista Macrodistritos ***********************************/
    
    $scope.actualizaZonaMD = function(dato) {
        var sactualizaZonaMD = new reglasnegocio();
        sactualizaZonaMD.id = 46;
        sactualizaZonaMD.parametros = '{"idz":"' + dato + '"}'; 
        sactualizaZonaMD.llamarregla(function(data){
            data = JSON.parse(data);
            $scope.macrod = data;
            $rootScope.txtMacrodistritoDistrito = $scope.macrod[0].ymdst_macrodistrito;
            $rootScope.idMacrodistritoDistrito = $scope.macrod[0].yzona_mdst_id;
            $scope.registro['zona_mdst_id'] = $scope.macrod[0].yzona_mdst_id;
            $rootScope.txtDistrito = $scope.macrod[0].ydst_distrito;
            $rootScope.idDistrito = $scope.macrod[0].yzona_dst_id;
            $scope.registro['yzona_dst_id'] = $scope.macrod[0].yzona_dst_id;
        });
    };
    
    /****************************************************************************************/
    // generador de capcha
    $scope.getCaptchasX=function(){       
        $scope.valorrandom = Math.floor(Math.random() * (224 - 1) + 1);  
        $scope.resultadoC="";

        var sgetCaptcha = new reglasnegocio();
        sgetCaptcha.id = 77;
        sgetCaptcha.parametros = '{"x":"'+ $scope.valorrandom + '"}';
        sgetCaptcha.llamarregla(function(data){
            data = JSON.parse(data);
            $.unblockUI();
            $scope.data_capX = data;
            $scope.idImg=data[0].vctcs_id;
            $scope.Imgenf=data[0].vctcs_url;
            $scope.imageCST=data[0].vctcs_urlc;
            if(data[0].vlng=='A')
            {
                $scope.lengua='AYMARA';
            }
            if(data[0].vlng=='Q')
            {
                $scope.lengua='QUECHUA';

            }
            if(data[0].vlng=='G')
            {
                $scope.lengua='GUARANI';
            }
            if(data[0].vlng=='C')
            {
                $scope.lengua='CASTELLANO';
            }
            $scope.imageLNG=$scope.Imgenf;
            $scope.palabraT='Ingrese texto: '+$scope.lengua+' CASTELLANO';
            $scope.toltipT='Palabra en '+$scope.lengua;
        });
    };
    
    /*****************************************************************************/
    $scope.VerificarCapcha = function(response)
    {  
        var resAct = new reglasnegocio();
        resAct.id = 88;
        resAct.parametros = '{"id":"' + $scope.idImg + '","rsp":"' + $scope.resultadoC + '"}';
        resAct.llamarregla(function(data){
            data = JSON.parse(data);
            $.unblockUI();
            $scope.data_capXres = data;            
            if($scope.data_capXres.length == 0){
                $scope.getCaptchasX();
                $scope.resultadoC = "";
                sweet.show('Advertencia', 'Vuelva registrar el capcha', 'error');
                inicioCapcha();
            }
            else
            {
                $scope.validarDataCiudadano(response);
            }
        }); 
    };
    /*****************************************************************************/
    // ******FIN DE CAPCHA****************
    /*$scope.$on('api:ready',function(){
        $scope.estadoCivil();
        //$scope.getZonaMD();
        //$scope.cargarMunicipios();
        $scope.gargarTipoPersona();
        $scope.combprofesion();
        //$scope.inciarUpload();                
        $scope.inciarValoresFormulario();
        $scope.getCaptchasX();
    });*/
    
    //CARGAR DATOS DE LA PROFESION
     /*$scope.combprofesion = function() {
        var parametros = {
            "procedure_name": "sp_listar_profesion"
        };
        DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(parametros).success(function(response) {
            
                $scope.combop = response;
           
        }).error(function(response) {});
    };*/

    /**********************************************************/
    $scope.combprofesion = function(){
        var resAccesos  = new reglasnegocio();
        resAccesos.id = 27;
        resAccesos.parametros = '{}';
        resAccesos.llamarregla(function(data){
            $scope.combop=JSON.parse(data);
        });    
    };
    /**********************************************************/
    $scope.$on('api:ready',function(){
        $scope.estadoCivil();
        //$scope.getZonaMD();
        //$scope.cargarMunicipios();
        $scope.gargarTipoPersona();
        $scope.combprofesion();
        //$scope.inciarUpload();                
        $scope.inciarValoresFormulario();
	 $scope.getCaptchasX();
    });
    $scope.cargarMunicipios = function(){
        var tipoProfesion  =   [
            { nombre: 'Licenciado', id: '1'},
            { nombre: 'Abogado', id: '2'},
            { nombre: 'Ingeniero', id: '3'}
        ];        
        $scope.aProfesion   =   tipoProfesion;
    };
    
    $scope.inciarUpload =   function(){        
        try{
          $('#multiDocsButon').click(function(){                
                $('#multiDocsFile').click();
          });
        }catch(e){}    
    };
    
    $scope.inciarValoresFormulario =   function(){
        $scope.habilitarFiles   =   true;
    };
    
    $scope.evaluarCampoCi =   function(){        
        var sCi =   $scope.registro.cedula;
        if(sCi.length > 4){
            $scope.habilitarFiles   =   false;
        }else{
            $scope.habilitarFiles   =   true;        
        }
    };        
    
   $scope.inicioEstadoCivil = function () {             
        //alert("1");
        if(DreamFactory.isReady()){            
            $scope.estadoCivil();
            //$scope.getZonaMD();
            //$scope.cargarMunicipios();
            $scope.gargarTipoPersona();
            $scope.combprofesion();
            //$scope.inciarUpload();
            $scope.inciarValoresFormulario();
            //google.maps.visualRefresh = true;
        }
    };
    
    /*DOCUMENTOS MULTIPLES*/
    var idCiu = sessionService.get('IDCIUDADANO');
    //console.log("ADJUNTOS ARCHIVOS:", CONFIG.APIURL);    
    $scope.uploader = new FileUploader({
        url: CONFIG.APIURL + "?desripcion=ciudadano&&idCiudadano=" + idCiu
    });
    
    var uploader = $scope.uploader;
    
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            //console.log("0");
            return this.queue.length < 10;
        }
    });

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    };
    
    uploader.onAfterAddingFile = function(fileItem) {
        
        //console.log("TIPO DOCUMENTO:", fileItem.file.type);
        
        tipoDocumento = fileItem.file.type;
        var nameArray = tipoDocumento.split('/');
        tipoDocumento = nameArray[1];
        var count = 0;        
        
        if(tipoDocumento == "png" || tipoDocumento == "jpg" || tipoDocumento == "jpeg" || tipoDocumento == "txt" || tipoDocumento == "plain" || tipoDocumento == "zip" || tipoDocumento == "rar" || tipoDocumento == "vnd.ms-word.document.12" || tipoDocumento == "vnd.openxmlformats-officedocument.spreadsheetml.sheet" || tipoDocumento == "vnd.visio" || tipoDocumento == "vnd.ms-publisher" || tipoDocumento == "msaccess"){
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
        sweet.show('', "Formato de archivo no soportado", 'error'); 
        $scope.desabilitado2 = true;
    }

    var archivoUpload   = "";
    var aDocAdjuntos    =   new Array();
    
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //console.log("ARCHIVOS :", fileItem);    
        var sDirTramite = "";
        if(typeof($scope.registro.cedula) != 'undefined'){
            sDirTramite = $scope.registro.cedula;
        }        
        //FORMANDO LA URL - ARCHIVO
        $scope.direccionvirtual = "RC_CLI_DATA";
        var urlIdcos = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + fileItem._file.name + "?app_name=todoangular";
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
    };

    //ALMACENAR DOCUMENTOS DREAMFACTORY
    $scope.almacenarDocumentos = function(aFiles){
        var sDirTramite = "";
        if(typeof($scope.registro.cedula) != 'undefined'){
            sDirTramite = $scope.registro.cedula;
        }        
        $scope.direccionvirtual = "RC_CLI_DATA";
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        angular.forEach(aFiles, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                //var urlIdcos = "http://192.168.28.38:8080/rest/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + archivo.name + "?app_name=todoangular";
                fileUpload.uploadFileToUrl(archivo, uploadUrl);
                //$scope.almacenarGDocumental(archivo, urlIdcos);
            }else{
                //console.log("error en el archivo");
            }
        });
    };

    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
    try{ 
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
    catch (e) { console.log("error", e); }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//************** mapa
    // var latitud = 0;
    // var longitud = 0;
    // var activarClick = false;
    // var versionUrl = "";
    // var markerToClose = null;
    // var dynamicMarkers;

    // google.maps.visualRefresh = true;

    // $http.get(versionUrl).success(function (data) {
    //     if (!data)
    //         console.error("no version object found!!");
    //     $scope.version = data.version;
    // });

    // /*------------------------------------------------------------------------------------------------------------------*/
    // /*------------------------------------------------- MAPA PRINCIPAL -------------------------------------------------*/
    // /*------------------------------------------------------------------------------------------------------------------*/
    // angular.extend($scope, {
    //     map: {
    //         control: {},
    //         center: {
    //             latitude: -16.495833,
    //             longitude: -68.133749
    //         },
    //         options: {
    //             streetViewControl: false,
    //             panControl: true,
    //             maxZoom: 20,
    //             minZoom: 3
    //         },
    //         zoom: 16,
    //         events: {
    //             tilesloaded: function (map, eventName, originalEventArgs) {
    //                 //map is trueley ready then this callback is hit
    //             },
    //             click: function (mapModel, eventName, originalEventArgs) {
    //                 console.log(activarClick);
    //                     var e = originalEventArgs[0];
    //                     var lat = e.latLng.lat(),
    //                     lon = e.latLng.lng();

    //                     var mapaObject = new Object();
    //                     var mapaObjectFinal = new Array();

    //                     mapaObject = new Object();
    //                     mapaObject.id = Math.floor((Math.random() * 1000000) + 1),
    //                     mapaObject.nombre = "Carta de llamada: "+$scope.imeEquipoActivo,
    //                     mapaObject.latitude = lat;
    //                     mapaObject.longitude = lon;
    //                     $scope.registro.latitud = lat
    //                     $scope.registro.longitud = lon

    //                     mapaObjectFinal[0] = mapaObject;

    //                     //console.log(mapaObject);
    //                     $scope.mapaDatos=mapaObject;
    //                     $scope.swMapa=1;
    //                     dynamicMarkers = mapaObjectFinal;

    //                     $scope.addMarkerMap();
    //             }
    //         },
    //         clickedMarker: {
    //             id:0,
    //             title: ''
    //         },
    //         onMarkerClicked: function (marker) {
    //             //console.log(123);
    //             marker.showWindow = true;
    //             $scope.$apply();
    //         },
    //         dynamicMarkers: []
    //     }
    // });

    // $scope.markersEvents = {
    //     click: function (gMarker, eventName, model) {
    //         if(model.$id){
    //             model = model.coords;//use scope portion then
    //         }
    //         alert(model.nombre);
    //     }
    // };

    // $scope.refreshMap = function (longitudRF, latitudRF) {
    //     $scope.map.control.refresh({latitude: longitudRF, longitude: latitudRF});
    //     $scope.map.control.getGMap().setZoom(16);
    // };

    // $scope.addMarkerMap = function () {
    //     $timeout(function () {
    //         $scope.map.dynamicMarkers = dynamicMarkers;
    //     }, 1000);
    // };

    // $scope.onMarkerClicked = function (marker) {
    //     markerToClose = marker; // for next go around
    //     marker.showWindow = true;
    //     $scope.$apply();
    // };

    // var origCenter = {latitude: $scope.map.center.latitude, longitude: $scope.map.center.longitude};    
});