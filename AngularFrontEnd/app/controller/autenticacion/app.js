var app = angular.module('myApp', ['ngResource','ngRoute', 'ngAnimate', 'toaster', 'ngTable','ui.bootstrap','angularMoment', 'hSweetAlert','ngCkeditor','integralui','xeditable','angularFileUpload','angularSoap','pdf']); //'uiGmapgoogle-maps','ngMap' ,
                                 //'ngResource','ngRoute', 'ngAnimate', 'toaster', 'ngTable', 'ngDreamFactory','ui.bootstrap','angularMoment', 'hSweetAlert','ngSanitize'
                                 //.constant('DSP_URL', 'http://192.168.5.141:80').constant('DSP_API_KEY', 'todoangular').constant('DEV_ENV', 0);
/*app.config(['$httpProvider', 'DSP_API_KEY', function($httpProvider, DSP_API_KEY) {
    $httpProvider.defaults.headers.common['X-DreamFactory-Application-Name'] = DSP_API_KEY;
  }]);*/

app.factory("wsRgistrarPubliciadad", ['$soap',function($soap){
    var base_url = "http://srvcronos/webservicios/registrapublicidad.asmx";
    //?op=registra_publicidadess
    return {
        registra_publicidades: function(datos){     //if (datos.f01_nom_edi_prop   == '') datos.f01_nom_edi_prop=" ";
            //console.log("---****-->",datos);
            return $soap.post(base_url,"registra_publicidades", {letrero:{"idActividadEconomica":91340,
                                                                  "idContribuyente": 244605,
                                                                  "clase": "N",
                                                                  "ipUsuario": "192.168.32.30",
                                                                  "equipo": "gmlppc05909",
                                                                  "funcionario": "rita.flores",
                                                                  "idCategoria": 6,
                                                                  "idTipoLetrero": 40,
                                                                  "idCaracteristica": 1,
                                                                  "fechaInicio": "01/01/2015",
                                                                  "fechaFin": "01/01/1900",
                                                                  "viaMatriz":"VA",
                                                                  "idZona": 262,
                                                                  "tipoVia": "AV",
                                                                  "via": "14 de septiembre",
                                                                  "numero": "78",
                                                                  "placa": "ND",
                                                                  "caras": [{"desc": "cara superior", "sup": "32,45"}, {"desc": "cara inferir", "sup": "25,45"}]
                                                              }
                                                            });
        }
    }
}]);

app.factory("wsObito", ['$soap',function($soap){
    var base_url = "http://prometeo/AdministracionSatelite/Service1.asmx";
    //var base_url = "http://gmlpsr0116/swGenesis/swLicencia.asmx";
    return {
        //RegistroSIMGEPsolicitud: function(gnombres_t, gprimer_apellido_t, gsegundo_apellido_t, gcarnet_t, gci_expedido_t, gparentesco, gmotivo, gtitular_zona, gtitular_via, gtipo_via, gtitular_nro, gtitular_fono, gtitular_correo, gnombres_f, gprimer_apellido_f, gsegundo_apellido_f, gapellido_casado_f, gfecha_def_1, gfecha_def_2, gcarnet_f, gobservaciones){
        RegistroSIMGEPsolicitud: function(datos){
            //console.log(datos);
            //console.log("111111",gnombres_t, gprimer_apellido_t, gsegundo_apellido_t, gcarnet_t, gci_expedido_t, gparentesco, gmotivo, gtitular_zona, gtitular_via, gtipo_via, gtitular_nro, gtitular_fono, gtitular_correo, gnombres_f, gprimer_apellido_f, gsegundo_apellido_f, gapellido_casado_f, gfecha_def_1, gfecha_def_2, gcarnet_f, gobservaciones,"222222")
            return $soap.post(base_url,"RegistroSIMGEPsolicitud", {
                nombres_t: datos.nombres_t,
                primer_apellido_t: datos.primer_apellido_t,
                segundo_apellido_t: datos.segundo_apellido_t,
                carnet_t: datos.carnet_t,
                ci_expedido_t: datos.ci_expedido_t,
                parentesco: parseInt(datos.parentesco),
                motivo: parseInt(datos.motivo),
                titular_zona: datos.titular_zona,
                titular_via: datos.titular_via,
                tipo_via: datos.tipo_via,
                titular_nro: parseInt(datos.titular_nro),
                titular_fono: parseInt(datos.titular_fono),
                titular_correo: datos.titular_correo,
                nombres_f: datos.nombres_f,
                primer_apellido_f: datos.primer_apellido_f,
                segundo_apellido_f: datos.segundo_apellido_f,
                apellido_casado_f: datos.apellido_casado_f,
                fecha_def_1: datos.fecha_def_1,
                fecha_def_2: datos.fecha_def_2,
                carnet_f: parseInt(datos.carnet_f),
                observaciones: " "
            });
        }
    }
}]);

//Servicio actualizacion de logs
app.service('registroLog', function(CONFIG){   

     this.almacenarLog = function(sIdUsuario, sIdCiudadano, sIdFormulario, sEvento){
        var fecha= new Date();
        var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var datos = {
            "logs_usr_id": sIdUsuario,
            "logs_dtspsl_id": sIdCiudadano,
            "logs_frm_id": sIdFormulario,
            "logs_evento": sEvento,
            "logs_registrado": fechactual,
            "logs_modificado": fechactual
        };
        $.ajax({
            data: datos,
             url:CONFIG.CONEXION_API_PG_RC+'wsRCPG/addLogs',
            type: 'POST',
            success: function (response) {
                var datos = JSON.stringify(response);
                var resp = JSON.parse(datos).success[0]._log_sp_adicionar;
                if(resp == true){
                    console.log("Se almaceno al historico",resp);
                }else{
                    console.log("Error al almacenar historico");
                }
              

            }
        });
     }     
});

/************ s1 **************/
/*
app.service('registroLog', function(DreamFactory,CONFIG){
    //$scope.almacenarLog = function(sIdUsuario, sIdCiudadano, sIdFormulario, sEvento){
    this.almacenarLog = function(sIdUsuario, sIdCiudadano, sIdFormulario, sEvento){
        var fecha = new Date();
        var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var aLog = new reglasnegocio();
        aLog.id = 124;
        aLog.parametros = '{"lgs_usr_id":"'+ sIdUsuario +'","lgs_dtspsl_id":"'+ sIdCiudadano +'","lgs_frm_id":"'+ sIdFormulario +'","lgs_evento":"'+ sEvento +'"}';
        aLog.llamarregla(function(data){
        //servicio insertar usuarios
        data = JSON.parse(data);
            console.log("Registro almacenado");
        });
     }
});
*/
/***************************/
app.service('obtFechaActual', function(CONFIG){
    this.obtenerFechaActual = function(){
        var fecha       =   new Date();
        var fechaactul  =   "";
        var smes        =   fecha.getMonth() + 1;
        smes        =   (smes < 10) ? '0' + smes : smes;
        fechactual  =   fecha.getFullYear() + "-" + smes + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        return fechactual;
     }
});

app.service('obtFechaCorrecta', function(CONFIG){
    this.obtenerFechaCorrecta = function(sfecha){
        var sfechafinal =   "";

        if(sfecha != null && sfecha != "") {
            var snuevafecha = "";
            if(sfecha.split("/").length > 1){
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
                sfechafinal = snuevafecha.getFullYear() + "-" + messnuevafecha + "-" + diasnuevafecha;
            }
        } else {
            sfechafinal =  sfecha;
        }
        return sfechafinal;
     }
});

app.directive('uploaderModel', ["$parse", function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs)
		{
			iElement.on("change", function(e)
			{
				$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
			});
		}
	};
}]);

///servicio para q funcione el upload
/*app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('files', file);
        $http.post(uploadUrl + file.name + "?app_name=todoangular", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

app.service('fileUpload1', ['$http', function ($http) {
    this.uploadFileToUrl1 = function(file, uploadUrl,nombre){
        var fd = new FormData();
        fd.append('files', file);
        //console.log(nombre,89);
        $http.post(uploadUrl + nombre + "?app_name=todoangular", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);


app.factory("fileUploadcorr", ['$http', function($http){    
    return {
        uploadFileToUrl1: function(file, uploadUrl,nombre){
            $.blockUI();
            var fd = new FormData();
            fd.append('files', file);
            return ($http.post(uploadUrl + nombre + "?app_name=todoangular", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function(resp){
                $.unblockUI();
                console.log("ARCHIVO ADJUNTADO :", resp);
                return 'resp';
                
            }).error(function(err){
                $.unblockUI();
                console.log("ERROR AL ADJUNTAR ARCHIVO :", err);
                return 'err';                
            }));
        }
    }
}]);*/


///servicio para q funcione el upload
app.service('fileUpload', ['$http', '$location', function ($http,$location) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var surl = jsonURLS.CONEXION_API_PG_RC + 'wsRCPG/subirArchivo';
        var sidusuario = sessionStorage.getItem('IDUSUARIO');
        var srutaf = '';
        try{
            var suploadurl = uploadUrl;
            if(suploadurl){
                var auploadurl = suploadurl.split('files');
                srutaf = auploadurl[1];
            } 
        }catch(err){
        }
        var fd = new FormData();
        fd.append('archivo', file);        
        fd.append('ruta', srutaf);
        fd.append('nombrea', file.name);
        fd.append('oid', sidusuario);
        $http.post(surl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + sessionStorage.getItem('TOKEN_API')
            }
        })
        .success(function(resp){
            $.unblockUI();    
            if(resp.code == 500){
                alert("Error al adjuntar el archivo. Favor d ");
                $location.path('dashboard');
            }else{
                console.log("ADJUNTO REGISTRADO CORRECTAMENTE Favor d");
            }                    
        })
        .error(function(){
        });
    }
}]);

app.service('fileUpload1', ['$http', '$location', function ($http,$location) {
    this.uploadFileToUrl1 = function(file, uploadUrl,nombre){
        var surl = jsonURLS.CONEXION_API_PG_RC + 'wsRCPG/subirArchivo';
        var sidusuario = sessionStorage.getItem('IDUSUARIO');
        //var sidusuario = sessionStorage.getItem('IDUSUARIO');
        var srutaf = '';
        try{
            var suploadurl = uploadUrl;
            if(suploadurl){
                var auploadurl = suploadurl.split('files');
                srutaf = auploadurl[1];
            } 
        }catch(err){
        }
        var fd = new FormData();
        fd.append('archivo', file);        
        fd.append('ruta', srutaf);
        fd.append('nombrea', nombre);
        fd.append('oid', sidusuario);
        $.blockUI();
        $http.post(surl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + sessionStorage.getItem('TOKEN_API')
            }
        })
        .success(function(resp){
            $.unblockUI();
            if(resp.code == 500){
                alert("Error al adjuntar el archivo.  ");
                $location.path('dashboard');
            }else{
                console.log("ADJUNTO REGISTRADO CORRECTAMENTE.");
            }            
        })
        .error(function(){
            console.log("ERROR REGISTRADO CORRECTAMENTE");
            $.unblockUI();
        });
    }
}]);

app.factory("fileUploadcorr", ['$http','$location', function($http,$location){    
    return {
        uploadFileToUrl1: function(file, uploadUrl,nombre){            
            $.blockUI();
            var surl = jsonURLS.CONEXION_API_PG_RC + 'wsRCPG/subirArchivo';
            var sidusuario = sessionStorage.getItem('IDUSUARIO');
            //var sidusuario = sessionStorage.getItem('IDUSUARIO');
            var srutaf = '';
            try{
                var suploadurl = uploadUrl;
                if(suploadurl){
                    var auploadurl = suploadurl.split('files');
                    srutaf = auploadurl[1];
                } 
            }catch(err){
            }
            var fd = new FormData();
            fd.append('archivo', file);        
            fd.append('ruta', srutaf);
            fd.append('nombrea', nombre);
            fd.append('oid', sidusuario);
            return ($http.post(surl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Bearer ' + sessionStorage.getItem('TOKEN_API')
                }
            }).success(function(resp){
                $.unblockUI();
                if(resp.code == 500){
                    alert("Error al adjuntar el archivo..  ");
                    $location.path('dashboard');
                }else{
                    console.log("ARCHIVO ADJUNTADO.. :", resp);
                }                
                return 'resp';
                
            }).error(function(err){
                $.unblockUI();
                console.log("ERROR AL ADJUNTAR ARCHIVO :", err);
                return 'err';                
            }));
        }
    }
}]);

app.controller('NavCtrl',['$scope', '$http','$rootScope','sessionService','CONFIG', function ($scope, $http, $rootScope, sessionService,CONFIG) {
    "use strict";
    /*$scope.generarMenu = function(){
        var smenu = new reglasnegocio();
        smenu.identificador = 'RCCIUDADANO_170';
        smenu.parametros = '{"idmenu":"4"}';
        smenu.llamarregla(function(results){
            if(results.length > 0){
                    //GENERANDO EL JSON CORRECTO PARA EL MENU
                    var sgrupo = "";
                    var lstGrupos = [];
                    var lstSubGrupo = [];
                    var j=0;
                
                    console.log("RESULTADO :", results);
                
                    $.each(results, function(key, value){
                        var lstOpciones = [];
                        var sContenido = value["contenido"].replace("../", "");
                        sContenido = sContenido.replace(/\//gi, "|");
                        lstOpciones[0] = {};
                        lstOpciones[0]["id_opcion"] = value["idopcion"];
                        lstOpciones[0]["opcion"] = value["opcion"];
                        lstOpciones[0]["contenido"] = sContenido;
                        var sOpciones = JSON.stringify(lstOpciones);
                        var sOpciones = sOpciones.substring(1, sOpciones.length)
                        var sOpciones = sOpciones.substring(0, sOpciones.length-1);
                        if(sgrupo != value["grp"]){
                            if(sgrupo != ""){
                                lstSubGrupo = [];
                            }
                            lstGrupos[j] = {};
                            lstGrupos[j]["id_grupo"] = value["idgrp"];
                            lstGrupos[j]["grupo"] = value["grp"];
                            lstGrupos[j]["sub_categories"] = lstOpciones;
                            sgrupo = value["grp"];
                            j = j + 1;
                        }
                        lstGrupos[j-1]["sub_categories"] = lstSubGrupo;
                        lstSubGrupo.push(sOpciones);
                    });
                    var listarMenu = JSON.stringify(lstGrupos);
                    listarMenu = listarMenu.replace(/\[\"/gi, "[");
                    listarMenu = listarMenu.replace(/}","{/gi, "},{");
                    listarMenu = listarMenu.replace(/\"\]/gi, "]");
                    listarMenu = listarMenu.replace(/\\"/gi, '"');
                    //console.log(listarMenu);
                    $scope.categories = JSON.parse(listarMenu);

                }else{
                    $scope.msg = "Error en usurio y/o contraseña";
                    //$location.path('');
                }
        });
    }*/
    $scope.validarRenderizacion =   function(){
        document.getElementById('dvContenido').style.display = 'block';
        document.getElementById('menuIzqui').style.display = 'block';
        document.getElementById('menuIzqui2').style.display = 'block';

    };

    //al realizar f5
    $scope.$on('api:ready',function(){
        $scope.validarRenderizacion();
        //$scope.generarMenu();
    });
    $scope.inicioMenu = function () {
        $scope.validarRenderizacion();
        //if(DreamFactory.api[CONFIG.SERVICE]){
            //$scope.generarMenu();
        //}
    };
}]);


app.config(['$routeProvider',
  function ($routeProvider) {
        $default = '../autenticacion/index.html';
        //$ruta = '../administracion/usuarios.html';
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/cargando.html',
            controller: 'authCtrl'
        })
        .when('/logout', {
            title: 'Logout',
            templateUrl: 'partials/cargando.html',
            controller: 'logoutCtrl'
        })
        .when('/signup', {
            title: 'Signup',
            templateUrl: 'partials/signup.html',
            controller: 'authCtrl'
        })
        .when('/registro', {
            title: 'Registro',
            templateUrl: '../registro_ciudadano/registro/index.html',
            controller: 'registroCiudadanoController'
        })
        .when('/dashboard', {
            title: 'Dashboard',
            templateUrl: '../registro_ciudadano/datosCiudadano/index.html',
            controller: 'authCtrl'
        })
        .when('/', {
            title: 'Login',
            templateUrl: 'partials/cargando.html',
            controller: 'authCtrl',
            role: '0'
        })
		.when('/:name', {
            templateUrl: 'partials/blank.html',
            controller: PagesController
        })
        .otherwise({
             templateUrl: 'partials/nofound.html'
        });
  }])
    .run(function ($rootScope, $location, Data, sessionService,CONFIG, $timeout, $document) {
	
        var TimeOutTimerValue = 1200000;                
        var TimeOut_Thread = $timeout(function(){ LogoutByTimer() } , TimeOutTimerValue);
        var bodyElement = angular.element($document);
        
        /// Keyboard Events
        bodyElement.bind('keydown', function (e) { TimeOut_Resetter(e) });	
        bodyElement.bind('keyup', function (e) { TimeOut_Resetter(e) });	
        
        /// Mouse Events	
        bodyElement.bind('click', function (e) { TimeOut_Resetter(e) });
        bodyElement.bind('mousemove', function (e) { TimeOut_Resetter(e) });	
        bodyElement.bind('DOMMouseScroll', function (e) { TimeOut_Resetter(e) });
        bodyElement.bind('mousewheel', function (e) { TimeOut_Resetter(e) });	
        bodyElement.bind('mousedown', function (e) { TimeOut_Resetter(e) });		
            
        /// Touch Events
        bodyElement.bind('touchstart', function (e) { TimeOut_Resetter(e) });		
        bodyElement.bind('touchmove', function (e) { TimeOut_Resetter(e) });		
        
        /// Common Events
        bodyElement.bind('scroll', function (e) { TimeOut_Resetter(e) });		
        bodyElement.bind('focus', function (e) { TimeOut_Resetter(e) });	
    
        function runTimer(selector, start, end, interval, delay) {
            var cntr = start;
            $(selector).html(cntr);
            var timer = setInterval(function() {
                ++cntr;
                $(selector).html(cntr);
                console.log('cntr:', cntr);
                if (cntr >= end) {
                    clearInterval(timer);
                    setTimeout(function() {
                        runTimer(selector, 1, end, interval, delay);
                    }, delay);
                }
            }, interval);
        }
    
        function LogoutByTimer()
        {
            //Registro log, cierre de sesison usuario
            //registroLog.almacenarLog(sessionService.get('IDUSUARIO'),0,0, "Cierre de sesión");
            document.getElementById('dvContenidoView').style.display = 'none';
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

            window.location.href = "../autenticacion/partials/sessionexpirada.html";            
        }
        
        function TimeOut_Resetter(e)
        {
            console.log('' + e);
       
            
            /// Stop the pending timeout
            $timeout.cancel(TimeOut_Thread);
            
            /// Reset the timeout
            TimeOut_Thread = $timeout(function(){ LogoutByTimer() } , TimeOutTimerValue);
        }      	
	
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            var URLactual   =   window.location;
            var origenurl   =   URLactual.href;
            var urlSessionApp   =   window.location.href;
            if(urlSessionApp.indexOf('modulo=ae&oid=') != -1 &&  urlSessionApp.split('?').length > 1){
                var splitSessionApp =   urlSessionApp.split('?');
                var splitSessionApp_ =   splitSessionApp[1].split('&');
                var smodulo =   splitSessionApp_[0].split('=');
                var soid =   splitSessionApp_[1].split('=');
                if(smodulo && soid){
                    var loginapp    = new loginNodeApp();
                    loginapp.soid   =   soid[1];
                    loginapp.iniciarLoginApp(function(resp){
                        var jsonObj = [];
                        jsonObj.push(JSON.parse(resp));
                        var asessionapp =   {'app_modulo':'ae'};
                        sessionStorage.setItem("Idioma", "C");
                        sessionStorage.setItem("sessionAPP", asessionapp);
                        sessionStorage.setItem("autenticacion", JSON.stringify(jsonObj));
                    });
                }                
            }else{
                if(origenurl && ! sessionStorage.getItem("urliniciomoduloigob")){
                    origenurl   =   origenurl.split('#');
                    if(origenurl[1] && origenurl[1].length > 10 ){
                        sessionStorage.setItem("urliniciomoduloigob", origenurl[1]);
                    }
                }
            }

            if(sessionStorage.getItem("autenticacion")){
                $rootScope.authenticated = false;
                $rootScope.usuario = sessionService.get('IDUSUARIO');
                $rootScope.usRol = sessionService.get('US_ROL');
                $rootScope.usNombre = sessionService.get('US_NOMBRE');
                $rootScope.usPaterno = sessionService.get('US_PATERNO');
                $rootScope.usMaterno = sessionService.get('US_MATERNO');
                $rootScope.usTipoPersona = sessionService.get('TIPO_PERSONA');
                $rootScope.stiporol = sessionService.get('US_IDROL');

                $rootScope.sservicios = sessionService.get('SERVICIOS');
                //alert("usuario:" + sessionService.get('US_IDROL'));
                if ($rootScope.usuario) {
                    $rootScope.nombre = sessionService.get('USUARIO');
                } else {
                    if(next.originalPath != "/registro"){
                        try{
                            document.getElementById('menuIzqui').style.display = 'none';
                            document.getElementById('menuIzqui2').style.display = 'none';
                        }catch(e){}
                        $location.path("");
                    }
                }
                /*if (sessionService.get('SERVICIOS')=='SI') {
                    sessionService.set('US_IDROL', "5");
                    $rootScope.stiporol = sessionService.get('US_IDROL');
                } else {
                    sessionService.set('US_IDROL', "4");
                    $rootScope.stiporol = sessionService.get('US_IDROL');
                }*/
            }else{
                if(next.originalPath != "/registro"){
                    try{
                        document.getElementById('menuIzqui').style.display = 'none';
                        document.getElementById('menuIzqui2').style.display = 'none';
                    }catch(e){}
                    //$location.path("");
                    //alert(1);
                    window.location.href = "../autenticacion/partials/login_.html";
                    //http://localhost:3055/app/view/autenticacion/partials/login_.html
                    //$location.path("login");
                }
                //$location.path("login");
                //window.location.href = "../../index.html";
                //alert("no existe session storage");
            }
        });
    });

function PagesController($scope, $http, $route, $routeParams, $compile, sessionService,$location) {
	var cadena = $routeParams.name;
    var res = cadena.replace(/\|/g, "/");
    var direccion = "../"   +   res;
    //EN CASO DE NO ESTAR EN LA SESSION    
    if(sessionService.get('IDUSUARIO') && sessionService.get('USUARIO')){
        $route.current.templateUrl = direccion;
        $http.get($route.current.templateUrl).then(function(msg) {
            setTimeout(function(){
                var shtmldiv    =   '<script type="text/javascript">$.unblockUI();</script>';
                var sdata   =   msg.data.replace(/\r?\n?/gi, '');            
                sdata   =   sdata.replace(/>[\n\t ]+</gi, "><");            
                $('#ng-view').html($compile(shtmldiv + sdata)($scope));
                $scope.$apply();
            },300);
            $.blockUI();
        },
        function(data) {
            $location.path('dashboard');
        });
    }
}

PagesController.$inject = ['$scope', '$http', '$route', '$routeParams', '$compile', 'sessionService', '$location'];


app.filter('replace', [function () {
    return function (input, from, to) {
      if(input === undefined) {
        return;
      }
      var regex = new RegExp(from, 'g');
      return input.replace(regex, to);
       
    };
}]);