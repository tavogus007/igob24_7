function atmVehiculosController($scope, $timeout, CONFIG, $window, $q, $rootScope, sessionService, ngTableParams, $filter, $route, sweet, $http, FileUploader, $sce, fileUpload, filterFilter, $routeParams, $location, Data, $q) {
    alert('CONTROLADOR VEHICULOS JURIDICA');
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    $scope.fechayhora = fecha + ' ' + hora;

    $scope.inicioServVehiculos = function () {
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');
        if ($scope.sTipoPersona == "NATURAL") {
            $scope.divNatural = "mostrar";

        } else {
            $scope.divJuridico = "mostrar";
        }
        $scope.tipotramite_list();
    };

    $scope.tipotramite_list = function () {
        var validarpromesas = [$scope.tipoTramite()];
        $q.all(validarpromesas).then(function (resp) {
        });
    }

    $scope.tipoTramite = function () {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        var tipotramites = new reglasnegocioA();
        tipotramites.identificador = "SERVICIO_VALLE-694";
        tipotramites.parametros = '{"xtipo_tramite":"1"}';
        tipotramites.llamarregla(function (results) {
            if (results.length > 0) {
                var dataT = JSON.parse(results);

                datoObjectFinal = [];
                for (var i = 0; i < dataT.length; i++) {
                    datoObject = new Object();
                    datoObject.tramiteId = JSON.parse(dataT[i].data).tramite_id;

                    datoObject.tramiteNombre = JSON.parse(dataT[i].data).nombre_tramite;
                    datoObjectFinal[i] = datoObject;
                }
                $scope.tipotramite = datoObjectFinal;
                deferred.resolve($scope.tipotramite);
            } else {
            }

        });
        return deferred.promise;
    };

    $scope.tipotramite_cla = function (dependencia) {
        var validarpromesas = [$scope.subtramite(dependencia)];
        $q.all(validarpromesas).then(function (resp) {
        });
    }

    $scope.subtramite = function (dependencia) {
        $scope[name] = 'Running';
        var deferred = $q.defer();
        var tipotramites = new reglasnegocioA();
        tipotramites.identificador = "SERVICIO_VALLE-695";
        tipotramites.parametros = '{"xclasificacion":"' + dependencia + '"}';
        tipotramites.llamarregla(function (results) {
            if (results.length > 0) {
                var dataT = JSON.parse(results);

                datoObjectFinal = [];
                for (var i = 0; i < dataT.length; i++) {
                    datoObject = new Object();
                    datoObject.clasificaciontramite = JSON.parse(dataT[i].data).clasificacion_tramite_id;
                    datoObject.nombreTramite = JSON.parse(dataT[i].data).nombre_tramite;
                    datoObjectFinal[i] = datoObject;
                }
                $scope.datoCla = datoObjectFinal;
                deferred.resolve($scope.datoCla);
            } else {
            }

        });
        return deferred.promise;

    }

    $scope.validarFormProcesos = function (datosForm) {
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = sessionService.get('IDUSUARIO');
        nroTramiteEnviado = sessionService.get('NROTRAMITE');
        idUsuario = 4;
        try {
            var idTramite = sessionService.get('IDTRAMITE');
            nroTramiteEnviado = sessionService.get('NROTRAMITE');
            idUsuario = 4;
            var tramiteIgob = new datosFormularios();
            tramiteIgob.frm_idTramite = idTramite;
            tramiteIgob.frm_tra_enviado = 'SI';
            tramiteIgob.frm_tra_if_codigo = nroTramiteEnviado;
            tramiteIgob.frm_tra_id_usuario = idUsuario;
            tramiteIgob.validarFormProcesos(function (resultado) {
                $scope.tramitesCiudadano();
                $scope.bloquearBtnEnviarForm();
                swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n Nos contactaremos con usted a la brevedad posible para programar la inspección y/o verificación documental. Caso contrario puede apersonarse a la Plataforma Integra de su Macrodistrito para recabar mayor información.");
            });
        } catch (error) {
            swal('', 'Registro no modificado', 'error');
            $.unblockUI();
        }
    };
    $scope.validarEnvio = function (data) {
        swal({
            title: 'CONFIRMAR',
            text: 'El envío de la presente solicitud de licencia de funcionamiento de actividad económica, (DD.JJ.) generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            closeOnConfirm: false
        }, function () {
            swal.close();
            setTimeout(function () {
                $scope.enviarFormProcesosLinea(data);
            }, 1000);
        });
    };

    $scope.enviarFormProcesosLinea = function (paramForm) {
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.btnEnviarForm = true;
        var idProcodigo = 'FA_VH';
        var datosNeXO = {};
        paramForm.FA_TIP_CON = paramForm.f01_num_dos_prop;
        paramForm.IN_TIP_CON = paramForm.FA_TIPO_DOC;
        var sIdTramite = $rootScope.tramiteId;
        var datosSerializados = JSON.stringify(paramForm);
        archivo1 = "";
        var crearCaso = new gCrearCaso();
        crearCaso.usr_id = 1,
            crearCaso.datos = datosSerializados,
            crearCaso.procodigo = idProcodigo,
            crearCaso.crearCasoAeLinea(function (response) {
                try {
                    $scope.botones = null;
                    $scope.desabilitado = true;
                    response = JSON.parse(response);
                    var results = response.success.data;
                    indice = 0;
                    datosIF = results[0].sp_pmfunction_crearcaso_linea.split(",");
                    datosIF2 = datosIF[1];
                    datosIF[0] = datosIF[0].substring(1, datosIF[0].length);
                    $scope.nrotramitec = datosIF[0];
                    sessionService.set('NROTRAMITE', datosIF[0]);
                    sessionService.set('NROTRAMITEID', datosIF[1]);
                    sessionService.set('IDPROCESO', datosIF[6]);
                    var idTramite1 = sessionService.get('NROTRAMITEID');
                    try {
                        $scope.validarFormProcesos(paramForm);
                    } catch (e) { }

                    $.unblockUI();
                } catch (e) {
                    alert("conexion fallida ");
                }
            });

    };

    var clsIniciarHtmlForm = $rootScope.$on('inicializarHtmlForm', function (event, tramite) {
        if (tramite.venviado == 'SI') {
            $scope.btnGuardarForm = true;
            $scope.desabilitado = true;
            $scope.botones = null;

        } else {
            $scope.btnGuardarForm = false;
            $scope.botones = true;
            $scope.desabilitado = false;

        }

        $.unblockUI();
    });

    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function (event, data) {
        if (typeof (data.rdTipoTramite) != 'undefined') {
            if (data.rdTipoTramite == "NUEVO") {
                if (data.INT_FORM_ALMACENADO == "G") {
                    $scope.botones = "mostrar";
                    $scope.desabilitado = false;
                }
            }
        }
    });

    var clsValidarBtnEnviar = $rootScope.$on('validarBtnEnviar', function (event, data) {
        if (data > 0) {
            $scope.btnEnviarForm = false;
        } else {
            $scope.btnEnviarForm = true;
        }
    });

    $scope.validarBtnEnviar = function (cont) {
        if (cont > 0) {
            $scope.btnEnviarForm = false;
        } else {
            $scope.btnEnviarForm = false;
        }
    };

    $scope.$on('$destroy', function () {
        setTimeout(function () {
            clsValidarBtnEnviar();
            clsIniciarCamposInternet();
            clsIniciarHtmlForm();
        }, 2000);
    });

    $scope.ejecutarFile = function (idfile) {
        var sid = document.getElementById(idfile);
        if (sid) {
            document.getElementById(idfile).click();
        } else {
            alert("Error ");
        }
    };

}