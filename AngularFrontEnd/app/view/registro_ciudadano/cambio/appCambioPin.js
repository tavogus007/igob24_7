function cambioPinController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, sweet,registroLog) {
    $scope.btnCambiar = true;
    $scope.prsCI = sessionService.get('CICIUDADANO');
    $rootScope.vid = sessionService.get('IDCIUDADANO');
    $scope.imageCST = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.imageLNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
    $scope.ErrorCapcha='';
    $scope.getlimpiareRROR=function() {
        $scope.ErrorCapcha='';
    }
    $scope.getCaptchasX=function() {
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
    var tiemporespuesta = null;
    function verificarKeyPress(captch){
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
            var nroregsitros = json.success.length;
            if(nroregsitros == 0){
                $scope.btnCambiar = true;
                $scope.ErrorCapchasXX = "Error en el captcha intentar de nuevo por favor";
                $scope.SuccesCapchasxx="";
                $scope.$apply();
            } else {
                $scope.btnCambiar = false;
                $scope.ErrorCapchasXX = "";
                $scope.SuccesCapchasxx="Capcha correcto puede cambiar su PIN";
                $scope.$apply();
            }
        });
    }
    $scope.VerificarCapcha = function(datos, prsCI) {  
        var captch  = $("#resultadoC").val();
        if(captch.length == 0)
            $scope.ErrorCapchasX = "";
        if(captch.length > 4){
            clearTimeout(tiemporespuesta);
            tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1000);
        }
    };
    $scope.cambioPin = function (datos, prsCI) {
        if (datos.prsPinN == datos.prsPinC) {         
            setTimeout(function(){
                $.blockUI();
            },50);  
            setTimeout(function(){
                var modificarPIN=new rcNatural();
                modificarPIN.oid= sessionService.get('IDCIUDADANO');
                modificarPIN.pinAnterior=datos.prsPinA;
                modificarPIN.pinNuevo=datos.prsPinN;
                modificarPIN.modificarCambioPinNatural(function(resultado){
                    setTimeout(function(){
                        $.unblockUI();
                    },500);                
                    resultadoApi = JSON.parse(resultado);
                    if( typeof(resultadoApi.success) != 'undefined') {
                        alertify.success('Actualizacion correcta');  
                        //swal('', 'Actualizacion correcta', 'success'); 
                        registroLog.almacenarLog(4,$rootScope.vid,0, "se modifico el Pin");  
                        if(sessionService.get('US_EMAIL')==""){
						    try {
                                $scope.validarFormulario();
                            } catch (error) {                                
                            }
                            var npin = datos.prsPinN;
                            var sms = "_Estimado_Ciudadano_su_Nuevo_PIN_es_:_<b>_" + npin + "_</b>";
                            alertify.success(sms);  
                            //swal('', sms, 'success');
                        } else {
                            $scope.envioMensaje(datos.prsPinN, sessionService.get('US_EMAIL'));
							try {
                                $scope.validarFormulario();
                            } catch (error) {                                
                            }
                        }
                        $scope.datos='';
                    } else {
                        setTimeout(function(){
                            $.unblockUI();
                        },500);  
                        alertify.error(resultadoApi.error.message);  
                        //swal('', resultadoApi.error.message, 'error');
                    }
                });
            },200);
        } else {
            alertify.warning('No Concuerdan Pin Nuevo y su Confirmación');  
            //swal('', 'No Concuerdan Pin Nuevo y su Confirmación', 'warning'); 
        }
    };
    $scope.envioMensaje = function(mensaje, mail){
        var sMensajeValidacion = "_Estimado_Ciudadano_su_Nuevo_PIN_es_:_<b>_" + mensaje + "_</b>";
        var sCorreo = mail;
        var sAsunto = "Cambio_de_PIN_24/7";
        var parametros = {
            "cuerpo" : sMensajeValidacion,
            "asunto" : sAsunto,
            "ciudadano" : sessionService.get('US_NOMBRE'),            
            "para" : sCorreo
        }
        $.ajax({ 
            data: parametros, 
            url: CONFIG.SERVICE_ENVIO_CORREO,
            type: 'get', 
            beforeSend: function () { 
                //$("#resultado").html("Procesando, espere por favor..."); 
            }, 
            success: function (response) { 
                //$("#resultado").html(response); 
            }
        }); 
        alertify.success("Se envió su Nuevo PIN a su correo electrónico");  
        //swal('', "Se envió su Nuevo PIN a su correo electrónico", 'success'); 
        $scope.getCaptchasX();
    };
    //validar formulario desde la directiva
    $scope.validarFormulario =  function(){
        try {
            if($("#mdlCambioPin").length > 0){                
                setTimeout(() => {
                    $("#mdlCambioPin").modal('hide');    
                }, 1000);
            }
        } catch (error) {
            console.log("Hubo un error al realizar la consulta:", error.toString());
        }       
    };	
    $scope.$on('api:ready',function(){      
        $scope.getCaptchasX();
    });
    $scope.inicioCapcha = function () {
        $scope.getCaptchasX();
    };
    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
    try{ 
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    } catch (e) { console.log("error", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};