function pagosAEController($scope, $timeout, CONFIG, $window, $rootScope, sessionService, ngTableParams, $filter, $route, sweet, $http, FileUploader, $sce, fileUpload, fileUpload1) {
  var idAE = sessionService.get("IDAE");
  $scope.tipo = 'PAGO';
  $scope.desabilitado = false;
  $scope.textbtnguardar = 'Registrar';
  $scope.smal_idOrg = false;
  $scope.smal_acc_key = false;
  $scope.smal_perfil = false;
  $scope.smal_sec_key = false;
  $scope.btndelete = false;
  $scope.entidades = [];
  $scope.tipodePagoMsj = 0;
  
  $scope.infotipoPago = function(tipo){
    if(tipo == 'QR'){
      $scope.mensajetpPago = "El Código QR es una modalidad de Pago codificada e interoperable (interbancaria), que permitirá al usuario o cliente de cualquier banco utilizar su App Bancaria y escanear este código QR que permite realizar el pago mediante una transferencia interbancaria codificada desde su cuenta de su banco a la cuenta recaudadora de la Pyme en el BCP.";
      swal("", $scope.mensajetpPago , "info");
    }
  }  
  $scope.mensajeAlerta = function(){
    if ( $scope.tipodePagoMsj == 1) {
      $scope.mensajetpPago = "Para efectuar el cobro a través del Banco de Crédito de Bolivia (BCP), mediante el cobro por QR-BCP"+
      " usted debe poseer credenciales (codigos de acceso) proporcionadas por Banco de Crédito de Bolivia (BCP).";
      swal("", $scope.mensajetpPago , "info");
    }else if ($scope.tipodePagoMsj == 2) {
      $scope.mensajetpPago = "Para efectuar el cobro a través del servicio de Red Enlace CyberSource, mediante tarjetas de credito o debito "+
      "usted debe poseer credenciales (codigos de acceso) proporcionadas por Red Enlace.";
      swal("", $scope.mensajetpPago , "info");
    } else if ($scope.tipodePagoMsj == 3) {
      $scope.mensajetpPago = "Para efectuar el cobro por este canal de pago y usted debera colocar los datos necesarios para realizar "+
      "una transferencia bancaria convencional directamente a la cuenta bancaria del vendedor";
      swal("", $scope.mensajetpPago , "info");
    }else{
      swal("", "Seleccione tipo de pago" , "info");
    }
  }

  $scope.seleccionaPago = function (tipoPago) {
    $scope.tipodePagoMsj = tipoPago;
    $scope.btnregistrodata = true;
    if (tipoPago == 1) {
      var pagoQr = new qr();
      pagoQr.id_actividadeconomica = idAE;
      pagoQr.getCredencialQr(function (resp) {
        var respuesta = JSON.parse(resp);
        respuesta = JSON.parse(respuesta);
        if (respuesta.service_code == "00") {
          $scope.textbtnguardar = 'Registrar';
          $scope.datos.service_code = "";
          $scope.datos.cuenta_bancaria_qr = "";
          $scope.btndelete = false;
        } else {
          $scope.datos.service_code = respuesta.service_code;
          $scope.datos.cuenta_bancaria_qr = respuesta.cuenta_bancaria;
          $scope.textbtnguardar = 'Modificar';
          $scope.btndelete = true;
        }
      });
      $scope.tipo = 'QR';
    }
    else if (tipoPago == 2) {
      var getpagoAtc = new atc();
      getpagoAtc.id_actividadeconomica = sessionService.get("IDAE");
      getpagoAtc.getRegistroAtc(function (resp) {
        var respuesta = JSON.parse(resp);
        respuesta = JSON.parse(respuesta);
        if (respuesta.id_agregador == "00") {
          $scope.datos.access_key = "";
          $scope.datos.profile_id = "";
          $scope.datos.secret_key = "";
          $scope.datos.cod_agregador = "";
          $scope.textbtnguardar = 'Registrar';
          $scope.btndelete = false;
        } else {
          $scope.datos.access_key = respuesta.access_key;
          $scope.datos.profile_id = respuesta.profile_id;
          $scope.datos.secret_key = respuesta.secret_key;
          $scope.datos.id_organizacion = respuesta.id_organizacion;
          $scope.datos.cod_agregador = respuesta.id_agregador;
          $scope.textbtnguardar = 'Modificar';
          $scope.btndelete = true;
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
          $scope.textbtnguardar = 'Registrar';
          $scope.btndelete = false;
        } else {
          $scope.datos.ent_financiera = respuesta.entidad_financiera;
          $scope.datos.nro_cuenta = respuesta.numero_cuenta;
          $scope.datos.nom_abono = respuesta.abono_cuenta;
          $scope.datos.ci_nit_abono = respuesta.ci_nit_abono;
          $scope.textbtnguardar = 'Modificar';
          $scope.btndelete = true;
        }
      });

    } else {
      $scope.tipo = '';
      $scope.btnregistrodata = false;
    }
  }
  $scope.validaCampo = function (campo, valor) {
    switch (campo) {
      case 'id_organizacion':
        if (valor.length > 0) {
          $scope.smal_idOrg = false;
        } else {
          $scope.smal_idOrg = true;
        }
        break;
      case 'access_key':
        if (valor.length > 0) {
          $scope.smal_acc_key = false;
        } else {
          $scope.smal_acc_key = true;
        }
        break;
      case 'profile_id':
        if (valor.length > 0) {
          $scope.smal_perfil = false;
        } else {
          $scope.smal_perfil = true;
        }
        break;
      case 'secret_key':
        if (valor.length > 0) {
          $scope.smal_sec_key = false;
        } else {
          $scope.smal_sec_key = true;
        }
        break;
      case 'cod_agregador':
          if (valor.length > 0) {
            $scope.smal_cod_agreg = false;
          } else {
            $scope.smal_cod_agreg = true;
          }
        break;
      case 'service_code':
          if (valor.length > 0) {
            $scope.smal_cod_serv = false;
          } else {
            $scope.smal_cod_serv = true;
          }
        break;
        case 'cuenta_bancaria_qr':
          if (valor.length > 0) {
            $scope.smal_cuenta_bancaria_qr = false;
          } else {
            $scope.smal_cuenta_bancaria_qr = true;
          }
        break;
      default:
        break;
    }
  };

  $scope.anularData = function (datos) {

    $.blockUI();
    var tipo_cred = "";
    var tipo_cred1 = "";
    var valortipoent = "";
    if (datos.f01_tipoPago == "1") {
      tipo_cred = "BCP";
      tipo_cred1 = " BCP ";
      valortipoent = "con código " + datos.service_code;
    } else if (datos.f01_tipoPago == "2") {
      tipo_cred = "REDENLACE";
      tipo_cred1 = "RED ENLACE";
      valortipoent = "";
    } else if (datos.f01_tipoPago == "3") {
      tipo_cred = "TRANSFERENCIAS";
      tipo_cred1 = "TRANSFERENCIA";
      valortipoent = "";
    } else {
      alertify.error("No tenemos el tipo de credencial para realizar esta operación");
      return false;
    }
    swal({
      title: "",
      text: "¿Está seguro de inhabilitar el cobro mediante " + tipo_cred1 + "" + valortipoent + "?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      closeOnConfirm: false,
      buttonsStyling: false,
    },
      function () {
        $scope.$apply(function () {
          var inCredenciales = new inCredencial();
          inCredenciales.id_actividadeconomica = sessionService.get("IDAE");
          inCredenciales.tipo_credencial = tipo_cred;
          inCredenciales.eliminaCredencial(function (resp) {
            var respuesta = JSON.parse(resp);
            respuesta = JSON.parse(respuesta);
            if (respuesta.delete_credenciales == "Registro Inhabilitado") {
              $scope.textbtnguardar = 'Registrar';
              $scope.btndelete = false;
              $scope.datos.service_code = "";
              $scope.datos.access_key = "";
              $scope.datos.profile_id = "";
              $scope.datos.secret_key = "";
              $scope.datos.cod_agregador = "";
              $scope.datos.ent_financiera = "";
              $scope.datos.nro_cuenta = "";
              $scope.datos.nom_abono = "";
              $scope.datos.ci_nit_abono = "";
              //$("#service_code").val("");
              swal('', 'El cobro ' + tipo_cred1 + ' se Inhabilito Correctamente...', 'success');
            } else {
              swal('Error!', 'No existe el registro', 'error');
            }
            $.unblockUI();
          });

        });
      });
    $.unblockUI();
  }

  $scope.registrarTipoPago = function (datos) {
    $scope.msError = "Encontramos campos vacios";
    var tipo_cred = ""
    var valortipoent = "";
    var msgguardar = "";
    var msgguarresp = "";
    if ($scope.textbtnguardar == "Modificar") {
      msgguardar = "modificar el cobro";
      msgguarresp = "modificó";
    } else {
      msgguardar = "habilitar el cobro";
      msgguarresp = "habilitó";
    }
    switch (datos.f01_tipoPago) {
      case "1":
        tipo_cred = "BCP";
        valortipoent = "con código " + datos.service_code;
        swal({
          title: "",
          text: "¿Está seguro de  " + msgguardar + " mediante pago " + tipo_cred + " " + valortipoent + "?",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#dc3545",
          confirmButtonText: "Si",
          cancelButtonText: "No",
          customClass: 'swal-wide',
          closeOnConfirm: false
        }, function () {
          $scope.$apply(function () {
            $.unblockUI();
            var pagoQr = new qr();
            pagoQr.id_actividadeconomica = idAE;
            pagoQr.service_code    = datos.service_code;
            pagoQr.cuenta_bancaria = datos.cuenta_bancaria_qr;
            pagoQr.registroQr(function (resp) {
              var respuesta = JSON.parse(resp);
              respuesta = JSON.parse(respuesta);
              respuesta = "Se " + msgguarresp + " el cobro mediante QR correctamente";
              swal('', respuesta, 'success');
              $scope.textbtnguardar = 'Modificar';
              $scope.btndelete = true;
            });
          });
        });
        break;
      case "2":
              
        if (datos.cod_agregador == "") {
          $scope.smal_cod_agreg = true;
          alertify.error($scope.msError);
          return false;
        }
        tipo_cred = "RED ENLACE";
        valortipoent = "con perfil id " + datos.profile_id;
        swal({
          title: "",
          text: "¿Está seguro de " + msgguardar + " mediante pago " + tipo_cred + "? ",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#dc3545",
          confirmButtonText: "Si",
          cancelButtonText: "No",
          closeOnConfirm: false
        }, function () {
          $scope.$apply(function () {
            var pagoAtc = new atc();
            pagoAtc.id_actividadeconomica = idAE;
            pagoAtc.cod_agregador = datos.cod_agregador;            
            pagoAtc.registroAtc(function (resp) {
              var respuesta = JSON.parse(resp);
              respuesta = JSON.parse(respuesta);
              respuesta = "Se " + msgguarresp + " el cobro mediante RED ENLACE correctamente";
              swal('', respuesta, 'success');
              $scope.textbtnguardar = 'Modificar';
              $scope.btndelete = true;
            });
          });
        });
        break;
      case "3":
        tipo_cred = "TRANSFERENCIA";
        valortipoent = "con Nro. de Cuenta " + datos.nro_cuenta;//140220 
        swal({
          title: "",
          text: "¿Está seguro de " + msgguardar + " mediante pago " + tipo_cred + "?",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#dc3545",
          confirmButtonText: "Si",
          cancelButtonText: "No",
          closeOnConfirm: false
        }, function (swalresp) {
          if (swalresp) {
            if ($scope.textbtnguardar != "Modificar") {
              swal({
                title: "",
                text: "Esta habilitando el número de cuenta " + datos.nro_cuenta + " de la entidad financiera " + datos.ent_financiera + ". ¿Está seguro?",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false
              }, function (swalresp1) {
                if (swalresp1) {
                  $scope.$apply(function () {
                    var transBanc = new tbancaria();
                    transBanc.id_actividadeconomica = sessionService.get("IDAE");
                    transBanc.entidad_financiera = datos.ent_financiera;
                    transBanc.numero_cuenta = datos.nro_cuenta;
                    transBanc.nombre_abono = datos.nom_abono;
                    transBanc.ci_nit_abono = datos.ci_nit_abono;
                    transBanc.registroTransferencia(function (resp) {
                      var respuesta = JSON.parse(resp);
                      respuesta = JSON.parse(respuesta);
                      respuesta = "Se " + msgguarresp + " el cobro mediante TRANSFERENCIA correctamente";
                      swal('', respuesta, 'success');
                      $scope.textbtnguardar = 'Modificar';
                      $scope.btndelete = true;
                    });
                  });
                }
              });
            } else {
              $scope.$apply(function () {
                var transBanc = new tbancaria();
                transBanc.id_actividadeconomica = sessionService.get("IDAE");
                transBanc.entidad_financiera = datos.ent_financiera;
                transBanc.numero_cuenta = datos.nro_cuenta;
                transBanc.nombre_abono = datos.nom_abono;
                transBanc.ci_nit_abono = datos.ci_nit_abono;
                transBanc.registroTransferencia(function (resp) {
                  var respuesta = JSON.parse(resp);
                  respuesta = JSON.parse(respuesta);
                  respuesta = "Se " + msgguarresp + " el cobro mediante TRANSFERENCIA correctamente";
                  swal('', respuesta, 'success');
                  $scope.textbtnguardar = 'Modificar';
                  $scope.btndelete = true;
                });
              });
            }
          }

        });
        break;
      default:
        respuesta = "Seleccione un tipo de Pago";
        $scope.tipo = '';
        swal('', respuesta, 'error');
        break;
    }
  }
  $scope.inicioTiendaVirtualPagos = function () {
    var getEntidades = new tbancaria();
    $scope.btnregistrodata = false;
    getEntidades.getEntidades(function (resp) {
      var respuesta = JSON.parse(resp);
      $scope.entidades = JSON.parse(respuesta);
      $rootScope.$apply();
    });
    $scope.tipo = '';
  }
};