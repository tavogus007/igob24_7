function pagosAEController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
 console.log(sessionService.get("IDAE"));
 var idAE = sessionService.get("IDAE");
 $scope.tipo ='PAGO';
 $scope.desabilitado = false;
  $scope.seleccionaPago = function (tipoPago) {
    if(tipoPago==1){
      $scope.tipo = 'QR';
    }
    else{
      $scope.tipo = 'ATC';
    }
    console.log("tipo",tipoPago);
  }

  $scope.registrarTipoPago = function(datos){
    if(datos.f01_tipoPago == 1){
      var pagoQr = new qr(); 
      pagoQr.id_actividadeconomica = idAE;
      pagoQr.service_code = datos.service_code;
      pagoQr.registroQr(function(resp){
        var respuesta = JSON.parse(resp);
        respuesta = JSON.parse(respuesta);
        respuesta = "QR: "+respuesta.spregistrabcp;
        swal('',respuesta, 'success');
      })
    }else{
      var pagoAtc = new atc(); 
      pagoAtc.id_actividadeconomica = idAE;
      pagoAtc.access_key = datos.access_key;
      pagoAtc.profile_id = datos.profile_id;
      pagoAtc.secret_key = datos.secret_key;
      pagoAtc.registroAtc(function(resp){
        var respuesta = JSON.parse(resp);
        respuesta = JSON.parse(respuesta);
        respuesta = "RED ENLACE: "+respuesta.spregistraredenlace;
        swal('',respuesta, 'success');
      })
    }
  }

};