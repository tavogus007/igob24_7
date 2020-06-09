function pagosAEController($scope, $timeout, CONFIG, $window, $rootScope, sessionService, ngTableParams, $filter, $route, sweet, $http, FileUploader, $sce, fileUpload, fileUpload1) {
  var idAE = sessionService.get("IDAE");
  $scope.tipo = 'PAGO';
  $scope.desabilitado = false;
  $scope.textbtnguardar = 'Registrar';
  $scope.smal_idOrg   = false;
  $scope.smal_acc_key = false;
  $scope.smal_perfil  = false;
  $scope.smal_sec_key = false;

  $scope.seleccionaPago = function (tipoPago) {
    if (tipoPago == 1) {
      $scope.tipo = 'QR';
    }
    else if (tipoPago == 2) {
      var getpagoAtc = new atc();
      getpagoAtc.id_actividadeconomica = sessionService.get("IDAE");
      getpagoAtc.getRegistroAtc(function (resp) {
        var respuesta = JSON.parse(resp);
        respuesta = JSON.parse(respuesta);
        console.log("REspuestaaa", respuesta);

        if (respuesta.access_key == "00") {
          $scope.datos.access_key = "";
          $scope.datos.profile_id = "";
          $scope.datos.secret_key = "";
          $scope.datos.id_organizacion = "";
          $scope.textbtnguardar = 'Registrar';
        } else {
          $scope.datos.access_key = respuesta.access_key;
          $scope.datos.profile_id = respuesta.profile_id;
          $scope.datos.secret_key = respuesta.secret_key;
          $scope.datos.id_organizacion = respuesta.id_organizacion;
          $scope.textbtnguardar = 'Actualizar';
        }

      });
      $scope.tipo = 'ATC';
    } else if (tipoPago == 3) {
      $scope.tipo = 'TB';
      var getCretransBanc = new tbancaria();
      getCretransBanc.id_actividadeconomica = sessionService.get("IDAE");
      getCretransBanc.getCredTransferencia(function (resp) {
        var respuesta = JSON.parse(resp);
        respuesta = JSON.parse(respuesta);
        if (respuesta.entidad_financiera == "00") {
          $scope.datos.ent_financiera = "";
          $scope.datos.nro_cuenta = "";
          $scope.datos.nom_abono = "";
          $scope.datos.ci_nit_abono = "";
          //$scope.datos.f01_tipoPago = "";
          $scope.textbtnguardar = 'Registrar';
        } else {
          $scope.datos.ent_financiera = respuesta.entidad_financiera;
          $scope.datos.nro_cuenta = respuesta.numero_cuenta;
          $scope.datos.nom_abono = respuesta.abono_cuenta;
          $scope.datos.ci_nit_abono = respuesta.ci_nit_abono;
          $scope.textbtnguardar = 'Actualizar';
        }
      });

    } else {
      $scope.tipo = '';
    }
    console.log("tipo", tipoPago);
  }
  $scope.validaCampo = function (campo, valor) {
    console.log("campo", campo);
    console.log("valor", valor);
    switch (campo) {
      case 'id_organizacion':
        if(valor.length > 0 ){
          $scope.smal_idOrg = false;
        }else{
          $scope.smal_idOrg = true;
        }
        break;
      case 'access_key':
        if(valor.length > 0 ){
          $scope.smal_acc_key = false;
        }else{
          $scope.smal_acc_key = true;
        }
        break;
      case 'profile_id':
        if(valor.length > 0 ){
          $scope.smal_perfil = false;
        }else{
          $scope.smal_perfil = true;
        }
        break;
      case 'secret_key':
        if(valor.length > 0 ){
          $scope.smal_sec_key = false;
        }else{
          $scope.smal_sec_key = true;
        }
        break;
      default:
        break;
    }
  };
  

  $scope.registrarTipoPago = function (datos) {
    $scope.msError  = "Encontramos campos vacios";

    switch (datos.f01_tipoPago) {
      case "1":
        var pagoQr = new qr();
        pagoQr.id_actividadeconomica = idAE;
        pagoQr.service_code = datos.service_code;
        pagoQr.registroQr(function (resp) {
          var respuesta = JSON.parse(resp);
          respuesta = JSON.parse(respuesta);
          respuesta = "QR: " + respuesta.spregistrabcp;
          swal('', respuesta, 'success');
        });
        break;
      case "2":
        console.log("id_org ", datos.id_organizacion);
        
        if (datos.access_key == "") {
          $scope.smal_acc_key = true;
          alertify.error($scope.msError);

          return false;
        }
        if (datos.profile_id == "") {
          $scope.smal_perfil = true;
          alertify.error($scope.msError);
          return false;
        }
        if (datos.secret_key == "") {
          $scope.smal_sec_key = true;
          alertify.error($scope.msError);
          return false;
        }
        if (datos.id_organizacion == "") {
          $scope.smal_idOrg = true;
          alertify.error($scope.msError);
          return false;
        }
        var pagoAtc = new atc(); 
        pagoAtc.id_actividadeconomica = idAE;
        pagoAtc.id_organizacion       = datos.id_organizacion;
        pagoAtc.access_key            = datos.access_key;
        pagoAtc.profile_id            = datos.profile_id;
        pagoAtc.secret_key            = datos.secret_key;
        pagoAtc.registroAtc(function(resp){
          var respuesta = JSON.parse(resp);
          respuesta = JSON.parse(respuesta);
          respuesta = "RED ENLACE: "+respuesta.spregistraredenlace;
          swal('',respuesta, 'success');
        });

        break;
      case "3":
        var transBanc = new tbancaria();
        transBanc.id_actividadeconomica = sessionService.get("IDAE");
        transBanc.entidad_financiera = datos.ent_financiera;
        transBanc.numero_cuenta = datos.nro_cuenta;
        transBanc.nombre_abono = datos.nom_abono;
        transBanc.ci_nit_abono = datos.ci_nit_abono;
        console.log("transBanc", transBanc);
        transBanc.registroTransferencia(function (resp) {
          var respuesta = JSON.parse(resp);
          respuesta = JSON.parse(respuesta);
          console.log("respuesta", respuesta);
          respuesta = "TRANSFERENCIA: " + respuesta.spregistratransferencia;
          swal('', respuesta, 'success');
          $scope.textbtnguardar = 'Registrar';
          $scope.datos.ent_financiera = "";
          $scope.datos.nro_cuenta = "";
          $scope.datos.nom_abono = "";
          $scope.datos.ci_nit_abono = "";
          $scope.datos.f01_tipoPago = "";
          $scope.tipo = '';

        });
        break;
      default:
        respuesta = "Seleccione un tipo de Pago";
        $scope.tipo = '';
        swal('', respuesta, 'error');
        break;
    }
    /* if(datos.f01_tipoPago == 1){
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
    } */
  }

};