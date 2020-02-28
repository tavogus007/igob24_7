app.controller('authCtrl' , function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, registroLog, sweet) {
    ////inicialmente fijado esos objetos como null para evitar el error indefinidoo
    $scope.imageCST = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.imageLNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.login = {};
    $scope.signup = {};
    $scope.opciones = "mostrar";
    var vAsunto = "Restauracion_de_PIN_GAMLP";
    var vMensaje = "Usted_solicito_restaurar_PIN.";
    $scope.datos='';
    $scope._id = '';

    /**************************** generador de capcha **********************************/
    $scope.getCaptchasX=function(){
        //$.blockUI();
        $scope.valorrandom = Math.floor(Math.random() * (224 - 1) + 1);
        $scope.resultadoC="";
        var resAct = new reglasnegocio();
        resAct.identificador = 'RCCIUDADANO_77';
        resAct.parametros = '{"x":"'+ $scope.valorrandom + '"}';
        resAct.llamarregla(function(data){
            data = JSON.parse(data);

            //$.unblockUI();
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

    /****************************** VerificarCapcha ***********************************/
    $scope.VerificarCapcha = function(prsCI,prsCorreo) {
        var resAct = new reglasnegocio();
        resAct.identificador = 'RCCIUDADANO_88';
        resAct.parametros = '{"id":"' + $scope.idImg + '","rsp":"' + $scope.resultadoC + '"}';
        resAct.llamarregla(function(data){
            data=JSON.parse(data);
            $.unblockUI();
            $scope.data_capXres = data;
            if($scope.data_capXres.length==0){
                $scope.getCaptchasX();
                $scope.resultadoC="";
                sweet.show('Advertencia', 'Vuelva registrar el capcha', 'error');
            }
            else
            {
                $scope.restaurarPin2(prsCI,prsCorreo);
            }
        });
    };
    /*********************************************************************************/
    $scope.inicioLoginNode = function () {
        alert("inicio login");
    };

    $scope.validarInicioLogin = function(){
        document.getElementById('dvContenidoView').style.display = 'block';
        document.getElementById('dvContenidoVacio').style.display = 'none';
        if(sessionStorage.getItem("autenticacion")){
            var sArrayData   = sessionStorage.getItem("autenticacion");
            try{
                var tipoData    = JSON.parse(sArrayData);
                if(tipoData.length > 0){
                    $scope.doLoginNode(sArrayData);
                } else {
                    window.location.href = "../autenticacion/partials/login_.html";
                }
            }catch(e){
                window.location.href = "../autenticacion/partials/login_.html";
            }
        }
        $scope.$apply();
    }

    //INICIAR LOGIN NUEVO
    $scope.$on('api:ready',function(){        
        document.getElementById('dvContenidoView').style.display = 'block';
        document.getElementById('dvContenidoVacio').style.display = 'none';
        if(sessionStorage.getItem("autenticacion")){
            var sArrayData   = sessionStorage.getItem("autenticacion");
            try{
                var tipoData    = JSON.parse(sArrayData);
                if(tipoData.length > 0){
                    $scope.doLoginNode(sArrayData);
                } else {
                    window.location.href = "../autenticacion/partials/login_.html";
                }
            }catch(e){
                window.location.href = "../autenticacion/partials/login_.html";
            }
        }
    });

    $scope.sesionToken=function(){
        var urlToken = CONFIG.CONEXION_MOTOR_SERVICIO + "api/apiLogin";
        $.ajax({
            dataType: "json",
            type: "POST",
            url : urlToken,
            data: CONFIG.CREDENCIAL_MOTORES,
            async: false,
            success: function(response) {
                dataResp = JSON.stringify(response);
                sessionStorage.setItem('TOKEN_MOTOR', response.token);
            },
            error: function (response, status, error) {
                dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
                console.log(dataResp);
            }
        });
    }

    $scope.sesionTokenATM=function(){
        var urlTokenA = CONFIG.CONEXION_SERVICIOATM + "api/apiLogin";
        $.ajax({
            dataType: "json",
            type: "POST",
            url : urlTokenA,
            data: CONFIG.CREDENCIAL_MOTORESATM,
            async: false,
            success: function(response) {
                dataResp = JSON.stringify(response);
                sessionStorage.setItem('TOKEN_MOTORA', response.token);
            },
            error: function (response, status, error) {
                dataRespa = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
            }
        });
    }

    $scope.sesionTokenMas=function(){
        var urlTokenM = CONFIG.CONEXION_SERVICIOMASCOTAS + "api/apiLogin";
        $.ajax({
            dataType: "json",
            type: "POST",
            url : urlTokenM,
            data: CONFIG.CREDENCIAL_MOTORESMASCOTAS,
            async: false,
            success: function(response) {
                dataRespM = JSON.stringify(response);
                sessionStorage.setItem('TOKEN_MOTORM', response.token);
            },
            error: function (response, status, error) {
                dataRespM = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
                console.log(dataRespM);
            }
            
        });
    }

    $scope.doLoginNode = function (response) {
        if (!$rootScope.idioma) {
            var idiomaDatos=new rcIdioma();
            $rootScope.idioma = sessionService.get('Idioma');
            idiomaDatos.filtro=$rootScope.idioma;
            idiomaDatos.obtenerTitulos(function(resultado){
                $scope.Label = JSON.parse(resultado);
                $rootScope.translateTitulos={};
                angular.forEach($scope.Label.success,function(celda, fila){
                    $rootScope.translateTitulos[celda.idm_label] = celda.idm_contenido;
                });
            });
            idiomaDatos.obtenerContenidos(function(resultado){
                $scope.Contenidos= JSON.parse(resultado);
                $rootScope.translateContenidos={};
                angular.forEach($scope.Contenidos.success,function(celda, fila){
                    $rootScope.translateContenidos[celda.idm_label] = celda.idm_contenido;
                });
            });
            idiomaDatos.obtenerImagenes(function(resultado){
                $scope.Imagenes= JSON.parse(resultado);
                $rootScope.translateImagenes={};
                angular.forEach($scope.Imagenes.success,function(celda, fila){
                    $rootScope.translateImagenes[celda.idm_label] = celda.idm_contenido;
                });
            });
            idiomaDatos.obtenerMensajes(function(resultado){
                $scope.Mensajes= JSON.parse(resultado);
                $rootScope.translateMensajes={};
                angular.forEach($scope.Mensajes.success,function(celda, fila){
                    $rootScope.translateMensajes[celda.idm_label] = celda.idm_contenido;
                });
            });
            var results =   JSON.parse(response);
            var sTipoPersona    =   results[0].dtspsl_tipo_persona;
            var sActFisica  =   "";
            var sActDigital =   "";
            $scope.sesionToken();
            $scope.sesionTokenATM();
            $scope.sesionTokenMas();
            $rootScope.mostrarMenuMascota = "NO";
            if(results.length > 0 && sTipoPersona=='NATURAL'){
                $rootScope.mostrarMenuMascota = "SI";
                var sActivacionDigital = results[0].dtspsl_activaciond;
                var sActivacionFisica = results[0].dtspsl_activacionf;
                $rootScope.sAceptacion = results[0].dtspsl_acepta_servicios;
                sessionService.set('IDCIUDADANO', results[0]._id);
                sessionService.set('CICIUDADANO', results[0].dtspsl_ci);
                sessionService.set('CIEXPEDIDO', results[0].dtspsl_expedido);
                localStorage.setItem('CI',results[0].dtspsl_ci);
                sessionService.set('IDUSUARIO', results[0]._id);
                sessionService.set('IDSOLICITANTE', results[0]._id);
                sessionService.set('USUARIO', "Ciudadano");
                if(results[0].dtspsl_tipo_persona = 'NATURAL'){
                    sessionService.set('US_NOMBRE', results[0].dtspsl_nombres);
                    sessionService.set('US_PATERNO', results[0].dtspsl_paterno);
                    sessionService.set('US_MATERNO', results[0].dtspsl_materno);
                    sessionService.set('US_EMAIL', results[0].dtspsl_correo);
                }else{
                    sessionService.set('US_NOMBRE', results[0].dtspsl_razon_social);
                    sessionService.set('US_PATERNO', results[0].dtspsl_paterno);
                    sessionService.set('US_MATERNO', results[0].dtspsl_materno);
                    sessionService.set('US_EMAIL', results[0].dtspsl_correo);
                }
                $rootScope.nombre = sessionService.get('USUARIO');
                //TIPO DE PERSONA
                sessionService.set('TIPO_PERSONA', results[0].dtspsl_tipo_persona);
                $rootScope.vid = results[0]._id;
                $rootScope.mostrarMenuMascotaNatural = 'NO';                
                $rootScope.mostrarMenuMascota = 'NO';                
                if(sActivacionDigital == "SI" && sActivacionFisica == "SI"){
                    $rootScope.mostrarMenuMascotaNatural = 'SI';                
                    $rootScope.mostrarMenuMascota = 'NO';  
                    //REGISTRAR EVENTO
                    sessionService.set('US_IDROL', "5");
                    sessionService.set('US_ROL', "Ciudadano nivel 2");
                    $.unblockUI();
                    registroLog.almacenarLog(4,results[0]._id,0, "Inicio de session NIVEL 2");
                    //http://localhost:3031/app/view/autenticacion/index.html#/registro_ciudadano|servicios|index3.html
                    var origenurlSesion = sessionStorage.getItem("urliniciomoduloigob");
                    origenurlSesion =   decodeURIComponent(origenurlSesion);
                    if(origenurlSesion && origenurlSesion != 'null'){
                        sessionStorage.removeItem("urliniciomoduloigob");
                        $location.path(origenurlSesion);
                    }else{
                        sessionService.set('SERVICIOS', results[0].dtspsl_acepta_servicios);
                        //if (sessionService.get('SERVICIOS')=='SI') {
                            //sessionService.set('US_IDROL', "5");
                            //$rootScope.stiporol = sessionService.get('US_IDROL');
                        //} else {
                            //sessionService.set('US_IDROL', "4");
                            //$rootScope.stiporol = sessionService.get('US_IDROL');
                        //}

                        $rootScope.stiporol = sessionService.get('US_IDROL');                        
                        if(sessionStorage.getItem('sessionAPP')){	
                            var svariable = sessionStorage.getItem('sessionAPP');
                            if(svariable === 'ae'){
                                $location.path('registro_ciudadano|servicios|index.html');
                            }
                            if(svariable === 'pc'){
                                $location.path('territorio|PC');
                            }
                            if(svariable === 'dp'){
                                $location.path('catastro|duplicado');
                            }
                            if(svariable === 'at'){
                                $location.path('catastro|actualizaciones');
                            }							
                        }else{
                            $location.path('dashboard');
                        }
                    }
                } else if(sActivacionDigital == "NO" && sActivacionFisica == "NO") {

                    sessionService.set('US_IDROL', "4");
                    sessionService.set('US_ROL', "Ciudadano nivel 1");
                    $.unblockUI();
                    registroLog.almacenarLog(4,results[0]._id,0, "Inicio de session NIVEL 1");
                    //http://localhost:3028/app/view/autenticacion/index.html#/registro_ciudadano|servicios|index3.html
                    var origenurlSesion = sessionStorage.getItem("urliniciomoduloigob");
                    if(origenurlSesion && origenurlSesion != 'null'){
                        sessionStorage.removeItem("urliniciomoduloigob");
                        $location.path(origenurlSesion);
                    }else{
                        sessionService.set('SERVICIOS', results[0].dtspsl_acepta_servicios);
                        //if (sessionService.get('SERVICIOS')=='SI') {
                            //sessionService.set('US_IDROL', "5");
                            //$rootScope.stiporol = sessionService.get('US_IDROL');
                        //} else {
                            //sessionService.set('US_IDROL', "4");
                            //$rootScope.stiporol = sessionService.get('US_IDROL');
                        //}
                        $rootScope.stiporol = sessionService.get('US_IDROL');
                        $location.path('dashboard');
                    }
                }
            } else if(results.length > 0 && sTipoPersona=='JURIDICO') {
                    if(results.length > 0){
                        var sActivacionDigital = results[0].dtspsl_activaciond;
                        var sActivacionFisica = results[0].dtspsl_activacionf;
                        $rootScope.sAceptacion = results[0].dtspsl_acepta_servicios;
                        sessionService.set('IDCIUDADANO', results[0]._id);
                        sessionService.set('CICIUDADANO', results[0].dtspsl_ci);
                        sessionService.set('NITCIUDADANO', results[0].dtspsl_nit);
                        sessionService.set('IDUSUARIO', results[0]._id);
                        sessionService.set('IDSOLICITANTE', results[0]._id);
                        sessionService.set('USUARIO', "Empresa");
                        sessionService.set('US_ROL', "Empresa");
                        $rootScope.nombre = sessionService.get('USUARIO');
                        sessionService.set('US_NOMBRE', results[0].dtspsl_razon_social);
                        sessionService.set('US_PATERNO', results[0].dtspsl_paterno_representante);
                        sessionService.set('REPRESENTANTE', results[0].dtspsl_representante);
                        sessionService.set('REPRESENTANTECI', results[0].dtspsl_ci_representante);
                        sessionService.set('US_MATERNO', results[0].dtspsl_materno);
                        sessionService.set('US_EMAIL', results[0].dtspsl_correo);
                        $rootScope.vid = results[0]._id;
                        sessionService.set('TIPO_PERSONA', results[0].dtspsl_tipo_persona);

                        if(sActivacionDigital == "SI" && sActivacionFisica == "SI"){
                            sessionService.set('US_IDROL', "5");
                            sessionService.set('US_ROL', "Empresa nivel 2");
                            $.unblockUI();
                            registroLog.almacenarLog(4,results[0]._id,0, "Inicio de session NIVEL 2");
                            sessionService.set('SERVICIOS', results[0].dtspsl_acepta_servicios);
                            $rootScope.stiporol = sessionService.get('US_IDROL');
                            $rootScope.mostrarMenuMascota = "SI";
                            if(results.dtspsl_tipo_empresa){
                                if(results.dtspsl_tipo_empresa == 4){
                                    $rootScope.mostrarMenuMascota = "SI";
                                }
                            }                                 
                            //if (sessionService.get('SERVICIOS')=='SI') {
                                //sessionService.set('US_IDROL', "5");
                                //$rootScope.stiporol = sessionService.get('US_IDROL');
                            //} else {
                                //sessionService.set('US_IDROL', "4");
                                //$rootScope.stiporol = sessionService.get('US_IDROL');
                            //}
                            $location.path('dashboard');
                        //} else if(sActivacionDigital == "NO" && sActivacionFisica == "NO") {
                        } else if((sActivacionDigital == "NO" && sActivacionFisica == "NO") || (sActivacionDigital == "NO" && sActivacionFisica == "SI") || (sActivacionDigital == "SI" && sActivacionFisica == "NO"))  {
                            sessionService.set('US_IDROL', "4");
                            sessionService.set('US_ROL', "Empresa nivel 1");
                            $.unblockUI();
                            registroLog.almacenarLog(4,results[0]._id,0, "Inicio de session NIVEL 1");
                            sessionService.set('SERVICIOS', results[0].dtspsl_acepta_servicios);
                            $rootScope.stiporol = sessionService.get('US_IDROL');  
                            /*
                            console.log("RESPUESTA 123 :", results);
                            if(results.dtspsl_tipo_empresa){
                                if(results.dtspsl_tipo_empresa == 4){
                                    $rootScope.mostrarMenuMascota = "SI";
                                    alert($rootScope.mostrarMenuMascota);
                                }
                            }*/
                            //if (sessionService.get('SERVICIOS')=='SI') {
                                //sessionService.set('US_IDROL', "5");
                                //$rootScope.stiporol = sessionService.get('US_IDROL');
                            //} else {
                                //sessionService.set('US_IDROL', "4");
                                //$rootScope.stiporol = sessionService.get('US_IDROL');
                            //}
                            $location.path('dashboard');
                        }else{
                            $.unblockUI();
                            var sMensaje    =   "por primera y única vez,";
                            sweet.show('', "Estimado usuario. Active su cuenta aproximándose " + sMensaje +" a la plataforma más cercana, donde validarán sus datos y activarán su cuenta. Otorgándole acceso a los servicios en línea del GAMLP.", 'error');
                        }
                    }
            } else {
                window.location.href = "../autenticacion/partials/login_.html";
            }
        //$scope.changeMenu
        $scope.obtenerFecha();
        $scope.obtenerHora();
    }
    };
    /*$scope.changeMenu = function () {
        if ($rootScope.sAceptacion=='SI') {
            sessionService.set('US_IDROL', "5");
            $rootScope.stiporol = sessionService.get('US_IDROL');
        } else {
            sessionService.set('US_IDROL', "4");
            $rootScope.stiporol = sessionService.get('US_IDROL');
        }
    }*/
    $scope.logout = function () {
        //Registro log, cierre de sesison usuario
        //registroLog.almacenarLog(sessionService.get('IDUSUARIO'),0,0, "Cierre de sesión");
        document.getElementById('dvContenidoView').style.display = 'none';
        //document.getElementById('dvContenidoVacio').style.display = 'none';
        registroLog.almacenarLog(4,sessionService.get('IDUSUARIO'),0, "Cierre de sesión");
        //Destruyendo las variables de session
        sessionService.destroy('USER');
        sessionService.destroy('IDUSUARIO');
        sessionService.destroy('USUARIO');
        sessionService.destroy('US_IDROL');
        sessionService.destroy('US_ROL');
        sessionService.destroy('US_NOMBRE');
        sessionService.destroy('US_PATERNO');
        sessionService.destroy('US_MATERNO');
        sessionService.destroy('IDCIUDADANO');
        sessionService.destroy('CICIUDADANO');
        sessionService.destroy('NITCIUDADANO');
        sessionService.destroy('IDSOLICITANTE');
        sessionService.destroy('US_EMAIL');
        sessionService.destroy('SERVICIOS');
        sessionService.destroy('TIPO_PERSONA');
        sessionService.destroy('TOKEN');
        sessionService.destroy('TOKEN_MOTOR');
        sessionService.destroy('TOKEN_MOTORA');

        sessionService.destroy('urliniciomoduloigob');

        document.getElementById('menuIzqui').style.display = 'none';
        document.getElementById('menuIzqui2').style.display = 'none';
        sessionStorage.removeItem("autenticacion");
        sessionService.destroy("SERVICIOS_MODAL");
        //$location.path('');
        //http://localhost:3055/app/view/index.html
        //http://localhost:3055/app/view/autenticacion/partials/login5.html

        window.location.href = "../autenticacion/partials/login_.html";
    }
    $scope.registroCiudadano = function (customer) {
       //console.log(customer);
    };
    $scope.verServicios = function (){
        $scope.opciones = null;
        $scope.servicios = "visible";
    };
    $scope.verParticipacion = function (){
        $scope.opciones = null;
        $scope.servicios = null;
        $scope.participacionCiudadana = "visible";
    };
    $scope.volverOpciones = function (){
        $scope.servicios = null;
        $scope.opciones = "visible";
    };
    $scope.volverParticipacion = function (){
        $scope.participacionCiudadana = null;
        $scope.opciones = "visible";
    };
    $scope.envioMensaje = function(mensajeCorreo, mensajeAlerta,ciudadano,email){
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
            url: 'http://gmlpsr0179:9090/smsemail/email/mail.php',
            type: 'get', 
            beforeSend: function () { 
            }, 
            success: function (response) { 
                //console.log(response); 
            }
        }); 
        sweet.show('', mensajeAlerta, 'success'); 
    };
    $scope.restaurarPin2 = function (prsCI,prsCorreo) {
        sNumeroAleatorio = Math.round(Math.random()*100000) + prsCI;
        var filtro = '';
        filtro = "dtspsl_ci='"+prsCI+"' and dtspsl_correo='" +prsCorreo+"'";

        var misDatos = {
            "table_name":"ciudadanos",
            "body":{
                "filter": filtro
            }
        };
        $.blockUI();

        //console.log("*ACTULIZAR SERVICIO - MOTORES*");
        //console.log("REMPLAZAR SERVICIO EN CADENA 1 :", "DreamFactory.api[CONFIG.SERVICERC].getRecordsByPost(misDatos).success(function (response)");
        //console.log("REMPLAZAR SERVICIO EN CADENA 2 :", "DreamFactory.api[CONFIG.SERVICEMONGO].updateRecordsByIds(parametros).success(function (results)");
        //alert("*ACTULIZAR SERVICIO - MOTORES*");

        /*ACTULIZAR-SERVICIO-MOTORES*/
        /*DreamFactory.api[CONFIG.SERVICERC].getRecordsByPost(misDatos).success(function (response){
            var results=response.record;
            console.log('javatest_results',results);
            if(results.length == 0)
               sweet.show('', 'no existe el usuario','error');
           else{
            $scope._id=results[0]._id;
            $scope.correo=results[0].dtspsl_correo;
            $scope.usuario=results[0].dtspsl_nombres;
            if(results.length == 1){
                console.log('DATOS CORRECTOS PIN');
                var parametros = {
                         "table_name":"ciudadanos",
                         "body":{
                                 "record": {
                                     "dtspsl_pin": sNumeroAleatorio
                                 }
                         },
                         "ids": $scope._id
                }; 
                var obj =  DreamFactory.api[CONFIG.SERVICEMONGO].updateRecordsByIds(parametros).success(function (results){
                    sweet.show('', 'Actualizacion correcta', 'success'); 
                    registroLog.almacenarLog(4,$rootScope.vid,0, "se modifico el Pin");
                    var detalleMensaje  = "Su nuevo número de PIN : " + sNumeroAleatorio;
                    var sCiudadano = $scope.usuario;
                    var mensajeExito = "Su PIN fue restaurado";
                    var sCorreo = $scope.correo;
                    vAsunto = "Restauracion_de_PIN_GAMLP";
                    vMensaje = "Usted_solicito,_Restauracion_de_PIN.";
                    $scope.envioMensaje(detalleMensaje, mensajeExito, sCiudadano,prsCorreo);
                    $scope.pin = sNumeroAleatorio;
                });
                obj.error(function(results){
                   $.unblockUI();
                        alert("error");
               });
            }
            else{
                sweet.show('', 'no existe el usuario'); 
            }
        }
        }).error(function(results){
                 alert("error");
        });*/
        /*FIN - ACTULIZAR-SERVICIO-MOTORES*/
        $.unblockUI();
        document.getElementById("prsCI").value="";
        document.getElementById("prsCorreo").value="";
    };

    $scope.inicioCapcha = function () {
        //if(DreamFactory.api[CONFIG.SERVICE]){
            $scope.getCaptchasX();
        //}
    };  

    $scope.obtenerFecha = function(){
        var sfecha = "";
        try{
            var fechaactualn = new fechaHoraServer();//new fechaserver();
            fechaactualn.fechahora(function(resultado){//obtfechahora(function(resultado){
                sfecha  =   JSON.parse(resultado).success.fecha;
            });

            var sfechafinal =   "";
            if(sfecha != null && sfecha != "") {
                var snuevafecha = "";
                var nrof    =   0;
                try{
                    nrof    =   sfecha.split("/").length;
                }catch(e){}
                if(nrof > 1){
                    var dateString = sfecha;
                    var dateParts = sfecha.split("/");
                    snuevafecha = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);// month is 0-based
                }else{
                    snuevafecha = new Date(sfecha);
                }

                var messnuevafecha = "";
                var diasnuevafecha = "";
                if(snuevafecha != 'Invalid Date'){
                    messnuevafecha        =     snuevafecha.getMonth()+1;
                    messnuevafecha        =     (messnuevafecha < 10) ? '0' + messnuevafecha : messnuevafecha;
                    if (snuevafecha.getDate()<10){
                        diasnuevafecha = "0" + (snuevafecha.getDate());
                    }else{
                        diasnuevafecha = snuevafecha.getDate();
                    }
                    sfechafinal = diasnuevafecha + "/" + messnuevafecha + "/" + snuevafecha.getFullYear();
                $scope.anioserver = snuevafecha.getFullYear();
                }
            } else {
                sfechafinal =  sfecha;
            }
                $scope.fechafinalserver = sfechafinal;
            return sfechafinal;
        }catch(e){
            $.unblockUI();
        }
    };

   $scope.obtenerHora = function(){
        var sfecha = "";
        var fechaactualh = new fechaHoraServer();//fechaserver();
        fechaactualh.fechahora(function(resultado){//obtfechahora(function(resultado){
            sfecha  =   JSON.parse(resultado).success.fecha;
        });
        var sfechafinal =   "";
        if(sfecha != null && sfecha != "") {
            snuevafecha = new Date(sfecha);
            var shora     = "";
            var sminuto   = "";
            var ssegundo  = "";
            shora       =   snuevafecha.getHours();
            sminuto     =   snuevafecha.getMinutes();
            ssegundo    =   snuevafecha.getSeconds();
            sfechafinal =   shora + ":" + sminuto + ":" + ssegundo;
        } else {
            sfechafinal =  sfecha;
        }
        $scope.horafinal = sfechafinal;
        return sfechafinal;
     };


    $scope.generarDocumentoPhp = function (){
        console.log($scope.horafinal,$scope.fechafinalserver);
        $.blockUI();
        var tipoPersona = '';
        var oidCiudadano = '';
        var datosCiudadano = '';
        var datosci = '';
        var datosexpedido = '';
        var dEmpresa = '';
        var dnit = '';
         tipoPersona     = sessionService.get('TIPO_PERSONA');
        if(tipoPersona == 'NATURAL'){
            oidCiudadano    = sessionService.get('IDSOLICITANTE');
            datosCiudadano  = (sessionService.get('US_NOMBRE')+' '+sessionService.get('US_PATERNO')+' '+sessionService.get('US_MATERNO'));
            datosci         = sessionService.get('CICIUDADANO');
            datosexpedido   = sessionService.get('CIEXPEDIDO');
            $.ajax({
                url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdf.php',
                type:"post",
                data:{
                    "soid": oidCiudadano,
                    "sorigen": "IGOB24/7",
                    "stipo": tipoPersona,
                    "usuario": datosCiudadano,
                    "cedula":  datosci,
                    "expedido": datosexpedido,
                    "empresa": '',
                    "nit": '',
                    "fecha": $scope.fechafinalserver,
                    "hora": $scope.horafinal

                },
                success:function(response){
                    var urlData = response;
                    $scope.InsertarDocumento(response);
                    $.unblockUI();
                }
            }); 
        }else{
            console.log("ingresa:::");
            oidCiudadano    = sessionService.get('IDSOLICITANTE');
            datosCiudadano  = sessionService.get('REPRESENTANTE');
            datosci         = sessionService.get('REPRESENTANTECI');
            dEmpresa        = sessionService.get('US_NOMBRE');
            dnit            = sessionService.get('NITCIUDADANO');
            $.ajax({
                url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdf.php',
                type:"post",
                data:{
                    "soid": oidCiudadano,
                    "sorigen":"IGOB24/7",
                    "stipo":tipoPersona,
                    "usuario": datosCiudadano,
                    "cedula":  datosci,
                    "expedido": '',
                    "empresa": dEmpresa,
                    "nit": dnit,
                    "fecha": $scope.fechafinalserver,
                    "hora": $scope.horafinal
                },
                success:function(response){
                    var urlData = response;
                    console.log("response: ", response);
                    $scope.InsertarDocumento(response);
                    $.unblockUI();
                }
            });
        }
    };

    $scope.InsertarDocumento = function(urlData){
        var sDocSistema     =   "IGOB247";
        var sDocProceso     =   "CONDICIONES DE USO";
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
        var sDocNombre      =   "CONDICIONES DE USO";
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

    $scope.cancelarCondicionesUso = function (btn) {
        $scope.vercondicionesuso    =   "mostrar";    
        var stippersona = sessionService.get('TIPO_PERSONA');
        var susuariop = '';
        if(stippersona == 'NATURAL'){
            susuariop = sessionService.get('US_NOMBRE');
        }else{
            susuariop = sessionService.get('US_NOMBRE');
        }    
        //var msgcondiciones  =   "Estimad@ " + susuariop + ": <br><br> Al no aceptar las condiciones uso del iGOB 24/7 usted ya no podrá acceder a los siguientes servicios: <br><br> • Solicitud de Licencias de funcionamiento. <br> • Solicitud de registro Catastral. <br> • Salud - Cita Médica. <br> • Certificado de Registro Catastral. <br> • Duplicado de registro Catastral. <br> • Documentos. <br><br> ¿Está seguro de NO ACEPTAR estas condiciones de uso? <br>";
        var msgcondiciones  =   "Estimad@ " + susuariop + ": <br><br> Al no aceptar las condiciones uso del iGob 24/7 usted ya no podrá acceder a los siguientes servicios: <br><br> • Seguimiento de Trámites y Servicios. <br> • Verificación de Documentos para Autorización de Viaje. <br> • Salud - Cita Médica. <br> • Espera en Línea en Plataformas de Atención Ciudadana. <br> • Catastro en línea (Duplicados, Actualizaciones). <br> • Territorio (Permisos de Construcción). <br> • Actividades Económicas Solicitud de Licencias de Funcionamiento. <br> • Reserva de Estacionamientos en Vía Pública. <br> • Foro de acciones y propuestas ciudadanas. <br> • Reclamos y Denuncias. <br> • Pagos en Línea. <br> • Bandeja de Notificaciones. <br> • Descargas de Aplicaciones Móviles. <br> • Documentos.<br><br><br>¿Está seguro de NO ACEPTAR estas condiciones de uso?";
        $('#msgcondicionesuso').html(msgcondiciones);
        if($scope.btncondicionesuso_n == false){
            var condiciones =   new rcCondicionesUso();
            condiciones.oid_ciudadano   =   sessionService.get('IDSOLICITANTE');
            condiciones.aceptacion      =   'NO';
            condiciones.mostrarCondicionesUso(function(resp){
                $rootScope.aceptarcondiciones   =   true;
                if(sessionService.get('US_IDROL') == '4'){
                }
                $("#exampleModalCenter").modal("hide");
            });
        }
        $scope.btncondicionesuso_n  =   false;
        $scope.btncondicionesuso_a  =   true;
    }

    $scope.aceptacondicionesuso = "";
    $("#btncerrarmodal").hide();
    $scope.aceptarCondicionesUso = function () {
        if($scope.btncondicionesuso_a == true){
            var tineCondicionesUso  =   'SI';
            var condiciones =   new rcCondicionesUso();
            condiciones.oid_ciudadano   =   sessionService.get('IDSOLICITANTE');
            condiciones.aceptacion      =   'SI';
            condiciones.mostrarCondicionesUso(function(resp){               
                $scope.aceptacondicionesuso = "SI";
                sessionService.set('SERVICIOS_MODAL', 'SI');
                var stippersona = sessionService.get('TIPO_PERSONA');
                var susuariop = '';
                if(stippersona == 'NATURAL'){
                    susuariop = sessionService.get('US_NOMBRE');
                }else{
                    susuariop = sessionService.get('US_NOMBRE');
                }
                //var msgcondiciones  =   "Felicidades " + susuariop + ". <br><br> Al aceptar las condiciones uso del iGOB 24/7, usted podrá acceder a los siguientes servicios: <br><br> • Seguimiento de Trámites y Servicios.<br> • Verificación de Documentos para Autorización de Viaje.<br> • Catastro en línea (Duplicados, Actualizaciones).<br> • Territorio (Permisos de Construcción).<br> • Actividades Económicas. Solicitud de Licencias de Funcionamiento. <br> • Foro de acciones y propuestas ciudadanas. <br> • Salud - Cita Médica. <br> • Espera en Línea en Plataformas de Atención Ciudadana. <br> • Documentos. <br> • Descargas de Aplicaciones Móviles.";
                var msgcondiciones  = "";
                if(sessionService.get('US_IDROL') == '4'){
                    msgcondiciones  =   "Estimad@ " + susuariop + ": <br><br> Active su cuenta aproximándose por primera y única vez, a la plataforma más cercana, donde validarán sus datos y activarán su cuenta. Otorgándole acceso a los servicios en línea del GAMLP.";
                }else{
                    msgcondiciones  =   "Estimad@ " + susuariop + ": <br><br> Gracias por aceptar las condiciones uso del iGob 24/7, Ahora usted puede acceder a todos los servicios en línea brindados por el Gobierno Autónomo Municipal de La Paz.";
                }
                $('#btncondicionesuso_n').hide();
                $('#btncondicionesuso_a').hide();
                $("#btncerrarmodal").show();
                $('#msgcondicionesuso').html(msgcondiciones);
                $('#htmlcondicionesuso').hide();
                $scope.generarDocumentoPhp();
                $rootScope.sservicios = 'SI';
                sessionService.set('SERVICIOS','SI');
            });
        }else{
            $("#exampleModalCenter").modal("hide");
            $rootScope.aceptarcondiciones   =   false;            
        }
        $scope.btncondicionesuso_n  =   true;
        $scope.btncondicionesuso_a  =   false;
    }

    $scope.sstylotexto  =   "collapse";
    $scope.sstyloLetter  =   "colapsado";
    $scope.txtcolapsado  =   "+ Leer Mas";
    $scope.fcolapsartexto = function(areferencia){
        if(areferencia == 'extendido'){
            $scope.txtcolapsado  =   "+ Leer Mas";
            $scope.sstylotexto  =   'colapsado';
            $scope.sstyloLetter  =   "colapsado";            
        }else{
            $scope.txtcolapsado  =   "- Leer Menos";
            $scope.sstylotexto  =   'extendido';
            $scope.sstyloLetter  =   "extendido";            
        }
    }

    $scope.fmostrarCondicionesUso   =   function(){        
        $("#exampleModalCenter").modal({backdrop: 'static', keyboard: false});        
        $('#msgcondicionesuso').html($scope.msgcondicionesuso);
    }
    $scope.mensaje_22   =   "condiciones de uso ";
    $scope.iniciarAUTHCTRL = function () {
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fecha = sfecha.success.fecha.split(" ")[0]; 
            var hora = sfecha.success.fecha.split(" ")[1]; 
            fecha = fecha.split("-")[2] + "/" + fecha.split("-")[1] + "/" + fecha.split("-")[0];
            $scope.btncondicionesuso_n  =   true;
            $scope.btncondicionesuso_a  =   true;
            setTimeout(function(){
                var dataLogin = JSON.parse(sessionStorage.getItem('autenticacion'));
                var valcondiciones          =   ((typeof(dataLogin[0].dtspsl_acepta_servicios) == 'undefined' || dataLogin[0].dtspsl_acepta_servicios == null) ? '' : dataLogin[0].dtspsl_acepta_servicios);
                valcondiciones              =   valcondiciones.trim();
                $rootScope.aceptarcondiciones   =   true;
                var tienecondicionesuso     =   '';
                var aceptacondicionesuso    =   '';
                
                //alert(valcondiciones);
                if(valcondiciones == 'SI'){
                    tienecondicionesuso     =   'SI';
                    aceptacondicionesuso    =   'SI';                   
                }else if(valcondiciones == "NO" || valcondiciones == '' ){
                    var svSession          =   ((typeof(sessionService.get('SERVICIOS_MODAL')) == 'undefined' || sessionService.get('SERVICIOS_MODAL') == null) ? '' : sessionService.get('SERVICIOS_MODAL'));
                    if(svSession == 'NO' || svSession == '' || svSession == 'undefined' || svSession == null){
                        tienecondicionesuso     =   'NO';
                        aceptacondicionesuso    =   '';
                    }else if(svSession == 'SI' &&  sessionService.get('US_IDROL') == '5'){
                        $rootScope.stiporol = 5;
                    }
                }            
                var stringCondicionesDeUso  =   "";
                var urlcondiciones  =   "";
                var snombre =   "";
                var scedulaid   =   "";
                var sexpedido   =   "";
                var snombreREP = "";
                var scirep = "";
                var sempresa = "";
                var snit = "";

                if(sessionService.get("TIPO_PERSONA") == 'NATURAL'){
                    urlcondiciones  =   "../../docs/condiciones_uso_natural_1.html";
                    snombre = sessionService.get("US_NOMBRE") + " " + sessionService.get("US_PATERNO") + " " + sessionService.get("US_MATERNO");
                    scedulaid   = sessionService.get("CICIUDADANO");
                    sexpedido   = dataLogin[0].dtspsl_expedido;
                }else if(sessionService.get("TIPO_PERSONA") == 'JURIDICO'){
                    urlcondiciones  =   "../../docs/condiciones_uso_juridico_1.html";
                    snombreREP = sessionService.get("REPRESENTANTE");
                    snit = sessionService.get("NITCIUDADANO");
                    sempresa = sessionService.get("US_NOMBRE");
                    scirep = sessionService.get("REPRESENTANTECI");
                    
                }
                $( "#msgcondicionesuso" ).load(urlcondiciones, function(data) {
                    stringCondicionesDeUso  =   data;
                    //..
                    stringCondicionesDeUso  =   stringCondicionesDeUso.replace("#USUARIO#", snombre);
                    stringCondicionesDeUso  =   stringCondicionesDeUso.replace("#CEDULA#", scedulaid);
                    stringCondicionesDeUso  =   stringCondicionesDeUso.replace("#EXPEDIDO#", sexpedido);
                    stringCondicionesDeUso  =   stringCondicionesDeUso.replace("#FECHA#", fecha);
                    stringCondicionesDeUso  =   stringCondicionesDeUso.replace("#HORA#", hora);
                    stringCondicionesDeUso  =   stringCondicionesDeUso.replace("#REPRESENTANTE#", snombreREP);
                    stringCondicionesDeUso  =   stringCondicionesDeUso.replace("#NIT#", snit);
                    stringCondicionesDeUso  =   stringCondicionesDeUso.replace("#EMPRESA#", sempresa);
                    stringCondicionesDeUso  =   stringCondicionesDeUso.replace("#REPRESENTANTECI#", scirep);
                    
                    
                    //var stringCondicionesDeUso  =   "INTRODUCCIÓN <br><br> Por favor, lea detenidamente las condiciones del presente documento ('Condiciones'), puesto que indican sus derechos y responsabilidades al visitar el sitio web http://igob247.lapaz.bo o fuentes, archivos de códigos fuente y correos electrónicos relacionados. Si accede o se registra para recibir Mensajes, acepta las presentes Condiciones.<br><br>Nuestros Sitio web incluye varios servicios. Solicitud de Licencias de funcionamiento, Solicitud de Viajes, Solicitud de registro Catastral, Salud - Cita Médica, Espera en Línea, Sigue Tu Trámite, Certificado de Registro Catastral, Duplicado de registro Catastral, Documentos y Descarga de Aplicaciones Móviles. <br><br> CUENTA DE CORREO ELECTRÓNICO <br><br> Para acceder a algunos servicios, es necesario crearse una cuenta de correo electrónico y así podrá acceder a funciones adicionales. Usted es el responsable de la actividad que se produzca en su cuenta. <br><br> CONTENIDO <br><br> Nuestros Mensajes incluyen contenido como información Personal, documentos, imágenes, fotografías, archivos digitales. La titularidad del Contenido le pertenece a GAMLP. <br><br> Parte del Contenido de los Mensajes se adquiere de fuentes que prohíben el uso de su Contenido sin una autorización previa. Cuando sea posible, el pie de página del Sitio web o el Contenido mostrará un aviso con la licencia pertinente..";
                    $scope.vercondicionesuso    =   "mostrar";
                    $scope.msgcondicionesuso = stringCondicionesDeUso;
                    $scope.notifcondicionesuso = stringCondicionesDeUso;
                    if(tienecondicionesuso   ==  'NO'){
                        if(aceptacondicionesuso ==  'NO'){
                            $scope.notifcondicionesuso = stringCondicionesDeUso;
                            $scope.validarmodal =   true;
                        }else{
                            setTimeout(function(){                            
                                $scope.fmostrarCondicionesUso();
                            },500);
                        }          
                    }else if(tienecondicionesuso   ==  'SI'){
                        $rootScope.aceptarcondiciones   =   false;
                    }
                });
                $scope.$apply();
            }, 500);
        });
    };
});
