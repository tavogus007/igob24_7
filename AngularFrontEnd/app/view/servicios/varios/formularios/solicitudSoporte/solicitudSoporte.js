function cambioPinController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, sweet,registroLog, $timeout) {
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
          if($("#mdlCambioPineee").length > 0){                
              setTimeout(() => {
                  $("#mdlCambioPineee").modal('hide');    
              }, 1000);
          }
      } catch (error) {
          console.log("Hubo un error al realizar la consulta:", error.toString());
      }       
  };	

  $scope.soid = "";

  $scope.buscarPersona =  function(doc, tipopersona){
    document.getElementById('mensajetext').innerHTML="";
    var datosCiudadano1 =   new rcNatural();
    datosCiudadano1.ci  =   doc;
    datosCiudadano1.tipo_persona  =   tipopersona;
    datosCiudadano1.estado  =   'ACTIVO';    
	datosCiudadano1.validaCi_Natural(function(resultado){
        var sdatar = JSON.parse(resultado);
        console.log("RESP:", sdatar);
        if(!sdatar.error){
            $scope.soid = sdatar._id;
            $scope.respCiudadano = sdatar;       
            $scope.dpsNombres = $scope.respCiudadano.dtspsl_nombres + " " + $scope.respCiudadano.dtspsl_paterno + " " + $scope.respCiudadano.dtspsl_materno;         
            $scope.dpsCelular = $scope.respCiudadano.dtspsl_movil; 
            $scope.dpsCorreo = $scope.respCiudadano.dtspsl_correo;            
        }else{
            console.log("Existe error");
            console.log(sdatar.error.message);
            $scope.soid = "";
            $scope.dpsNombres = "";
            $scope.dpsCelular = "";
            $scope.dpsCorreo = "";
            document.getElementById('mensajetext').innerHTML=sdatar.error.message;                        
            $scope.$apply(function() {
                // Now we really do stuff, for example:
                $smensaje = sdatar.error;                
              });
        }
    });
};


$scope.envioActualizacionData = function(celular, correo){
    var objupdate = new rcNatural();
    objupdate._oid = $scope.soid;
    objupdate.telefono = celular;
    objupdate.correo = correo;
    objupdate.actualizarSoporte(function(resultado){
        console.log("DATA RESPUESTA :", resultado);
        document.getElementById('mensajetext').innerHTML="";                
        var sresp = JSON.parse(resultado);
        if(!sresp.error){
            $timeout(function () {
                document.getElementById('mensajetext').innerHTML="Datos actualizados correctamente !!";
            }, 500);
        }else{
            $timeout(function () {
                document.getElementById('mensajetext').innerHTML="Problemas de comunicacion con el servidor. Favor comunicarse con el administrador del sistema";
            }, 500);
        }
    });
  }

  $scope.restaurarCredenciales = function(doc, correo){
    document.getElementById('mensajetext').innerHTML="";                
    setTimeout(function() {
        swal({
            title: 'Confirmar',
            text: 'Esta seguro de restaurar la contraseña. Reviso si los datos son correctos ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            closeOnConfirm: true
        }, function() {
            var datosCiudadano1 =   new rcNatural();
            datosCiudadano1.ci  =   doc;  
            datosCiudadano1.correo  =   correo;  
            datosCiudadano1.restaurarCredencialesSoporte(function(resultado){
                var sresp = JSON.parse(resultado);
                if(!sresp.error){                    
                    $timeout(function () {
                        document.getElementById('mensajetext').innerHTML="Pin restaurado de manera correcta !! <br> Favor revisar su correo Electronico !!";
                    }, 500);
                }else{
                    $timeout(function () {
                        document.getElementById('mensajetext').innerHTML="Problemas de comunicacion con el servidor. Favor comunicarse con el administrador del sistema";
                    }, 500);
                }
            });
        });
    }, 300);
  }

    $scope.limpiarCamposFormulario = function(){
        document.getElementById('mensajetext').innerHTML="";                
        $scope.soid = "";
        $scope.dpsNombres = "";
        $scope.dpsCelular = "";
        $scope.dpsCorreo = "";
        $scope.dpsDocumento = "";
    }

  $scope.$on('api:ready',function(){      
      $scope.getCaptchasX();
  });

  $scope.inicioCapcha = function () {
      $smensaje = "";
      $scope.getCaptchasX();      
      setTimeout(() => {
        $("#mdlCambioPineee").modal({keyboard: false});                    
    }, 500);
  };
  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try{ 
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  } catch (e) { console.log("error", e); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};