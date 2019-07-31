function vehiculosControllerJuridico($scope, $q, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG,
    LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, fileUpload1, $timeout, obtFechaCorrecta) {
    //alert('CONTROLADOR VEHICULOS JURIDICA');
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    $rootScope.fechayhora = fecha + ' ' + hora;
    $scope.tipotramite = "";
    $scope.inicioVehiculosJuridicoC = function () {
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');
        if ($scope.sTipoPersona == "NATURAL") {
            $scope.divNatural = "mostrar";

        } else {
            $scope.divJuridico = "mostrar";
        }
        $scope.requiRecuperados = [];
        $scope.SubDocNecesarios();
    };

    $scope.SubDocNecesarios = function () {
        var oid_ciu1 = sessionService.get('IDCIUDADANO');
        $scope.file_CI = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante + "/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA + "?app_name=todoangular";
        $scope.file_CI_inv = CONFIG.APIURL + "/files/RC_CLI/" + $rootScope.datosIniciales.id_representante + "/" + $rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR + "?app_name=todoangular";
        $scope.rep_legal = CONFIG.APIURL + "/files/RC_CLI/" + oid_ciu1 + "/" + $rootScope.datosIniciales.f01_poder_representante + "?app_name=todoangular";
        $scope.nit = CONFIG.APIURL + "/files/RC_CLI/" + oid_ciu1 + "/" + $rootScope.datosIniciales.file_num_ident + "?app_name=todoangular";
        var nombre_ci = "Cedula de Identidad Anverso";
        $scope.guardarFiles($rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RA, nombre_ci, $scope.file_CI);
        var nombre_ci_inv = "Cedula de Identidad Reverso";
        $scope.guardarFiles($rootScope.datosIniciales.FILE_FOTOCOPIA_CI_RR, nombre_ci_inv, $scope.file_CI_inv);
        var rep_legal = "Poder del Representante Legal";
        $scope.guardarFiles($rootScope.datosIniciales.f01_poder_representante, rep_legal, $scope.rep_legal);
        var nit = "N.I.T.";
        $scope.guardarFiles($rootScope.datosIniciales.f01_poder_representante, nit, $scope.nit);
        $rootScope.file_CI_A = $scope.file_CI;
        $rootScope.file_CI_R = $scope.file_CI_inv;
        $rootScope.file_PODER = $scope.rep_legal;
        $rootScope.file_NIT = $scope.nit;
    }
    $scope.almacenarRequisitos = function(aArchivos, idFile){
        document.getElementById('href_f01_upload_'+idFile).href = '';
        document.getElementById(idFile).value = '';
        document.getElementById(idFile+'_url').value = '';
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1]+hora_[2];
        });

        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        angular.forEach(aArchivos, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                var tipoDocci = archivo.name;
                var nameArrayci = tipoDocci.split('.');
                tipoDocci = nameArrayci[nameArrayci.length-1];
                if(tipoDocci == 'png' || tipoDocci == 'jpg' || tipoDocci == 'jpeg' || tipoDocci == 'bmp' || tipoDocci == 'gif' || tipoDocci == 'pdf' || tipoDocci == 'docx' || tipoDocci == 'docxlm'){
                    nombreNuevo = 'adjunto_'+fechaNueva+'.'+tipoDocci;
                    url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.url = url;
                    document.getElementById('href_f01_upload_'+idFile).href = url;
                    document.getElementById(idFile).value = nombreNuevo;
                    document.getElementById(idFile+'_url').value = url;
                    fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                }else{
                    swal('Advertencia', 'El adjunto no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                    document.getElementById(idFile).value = '';
                }
            }else{
            }
        });
        datoObjectFactura = new Object();
        datoObjectFact = [];
        $scope.datos.urlFactura = url; // NO OLVIDAR
        //$scope.datos.urlFacturaLotus = $scope.datos.urlFactura[0].url;
    };
    $scope.almacenarRequisitosPoliza = function(aArchivos, idFile){
        document.getElementById('href_f01_upload_'+idFile).href = '';
        document.getElementById(idFile).value = '';
        document.getElementById(idFile+'_url').value = '';
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1]+hora_[2];
        });

        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        angular.forEach(aArchivos, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                var tipoDocci = archivo.name;
                var nameArrayci = tipoDocci.split('.');
                tipoDocci = nameArrayci[nameArrayci.length-1];
                if(tipoDocci == 'png' || tipoDocci == 'jpg' || tipoDocci == 'jpeg' || tipoDocci == 'bmp' || tipoDocci == 'gif' || tipoDocci == 'pdf' || tipoDocci == 'docx' || tipoDocci == 'docxlm'){
                    nombreNuevo = 'adjunto_'+fechaNueva+'.'+tipoDocci;
                    url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                    document.getElementById('href_f01_upload_'+idFile).href = url;
                    document.getElementById(idFile).value = nombreNuevo;
                    document.getElementById(idFile+'_url').value = url;
                    fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                }else{
                    swal('Advertencia', 'El adjunto no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                    document.getElementById(idFile).value = '';
                }
            }else{
            }
        });
        datoObjectPoliza = new Object();
        datoObjectPol = [];
        $scope.datos.urlPoliza = url; // NO OLVIDAR
    };
    $scope.almacenarRequisitosPoder = function(aArchivos, idFile){
        document.getElementById('href_f01_upload_'+idFile).href = '';
        document.getElementById(idFile).value = '';
        document.getElementById(idFile+'_url').value = '';
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1]+hora_[2];
        });

        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        angular.forEach(aArchivos, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                var tipoDocci = archivo.name;
                var nameArrayci = tipoDocci.split('.');
                tipoDocci = nameArrayci[nameArrayci.length-1];
                if(tipoDocci == 'png' || tipoDocci == 'jpg' || tipoDocci == 'jpeg' || tipoDocci == 'bmp' || tipoDocci == 'gif' || tipoDocci == 'pdf' || tipoDocci == 'docx' || tipoDocci == 'docxlm'){
                    nombreNuevo = 'adjunto_'+fechaNueva+'.'+tipoDocci;
                    url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                    document.getElementById('href_f01_upload_'+idFile).href = url;
                    document.getElementById(idFile).value = nombreNuevo;
                    document.getElementById(idFile+'_url').value = url;
                    fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                }else{
                    swal('Advertencia', 'El adjunto no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                    document.getElementById(idFile).value = '';
                }
            }else{
            }
        });
        datoObjectPoder = new Object();
        datoObjectPod = [];
        $scope.datos.urlPoder = url; // NO OLVIDAR
        //$scope.datos.urlFacturaLotus = $scope.datos.urlFactura[0].url;
        console.log('URL ADJUNTO',url);
    };
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
            console.log("Error : ", error);
            swal('', 'Registro no modificado', 'error');
            $.unblockUI();
        }
    };
        ////ADJUNTOS DEL CIUDADANO
        $scope.guardarFiles = function (campo, nombre, url) {
            var parAdjunto = '{"campo":"' + campo + '","nombre":"' + nombre + '","url":"' + url + '"}';
            $scope.requiRecuperados.push(JSON.parse(parAdjunto));
            $scope.fileadj = '{"File_Adjunto":' + JSON.stringify($scope.requiRecuperados) + '}';
            $scope.getArchivosAdjuntos(JSON.parse($scope.fileadj));
        }
    
        $scope.getArchivosAdjuntos = function (datos) {
            var archivosValidos = [];
            if (datos.File_Adjunto) {
                for (var i = 0; i < datos.File_Adjunto.length; i++) {
                    archivo = ((typeof (datos.File_Adjunto[i]) == 'undefined' || datos.File_Adjunto[i] == null) ? "" : datos.File_Adjunto[i]);
                    if (archivo != "") {
                        archivosValidos.push(datos.File_Adjunto[i]);
                    }
                };
                $scope.obtArchivosAdjuntos = archivosValidos;
            }
        };
        $scope.imprimirArchivo = function (fum) {
            var escudo = new Image();
            escudo.src = fum;
            $scope.varSpin = true;
            $scope.RegistroFUM = {
                registrado: 'OK',
                mensaje: ''
            };
            var cadena = fum;
            if (cadena.indexOf('?') != -1) {
                separador = '?';
                arreglodecadena = cadena.split(separador);
                cadena = arreglodecadena[0];
            }
            var tipoarch = cadena.substr(-4);
            var imagen = cadena.indexOf('.jpeg');
            if (tipoarch == '.PDF') {
                $scope.archotro = false;
                $scope.archpdf = true;
                $('#visorFum object').attr('data', fum);
                $timeout(function () { $scope.varSpin = false }, 1000);
            } else {
                var tipoimg = tipoarch.toUpperCase();
                if (tipoimg == '.BMP' || tipoimg == '.GIF') {
                    $scope.archotro = true;
                    $scope.archpdf = false;
                    $scope.archivoP = fum;
                    $('#imgSalida').attr("src", fum);
                } else {
                    $('#docsVisor').modal('hide');
                    $scope.archotro = false;
                    $scope.archpdf = false;
                    angular.element('#docsVisor').modal('hide');
                    $('#docsVisor').modal().hide();
                    $('.docsVisor').removeClass('show');
                    window.open(fum, "visorMapa", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=400, height=400");
                }
            }
        };
    ///ADJUNTOS DEL CIUDADANO
    /*CIUDADANO - ENVIAR FORMULARIO NATURAL*/
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
        var idProcodigo = 'LI_VEH';
        var datosNeXO = {};
        /*RENOVACION DE LICENCIAS*/
        paramForm.FA_TIP_CON = paramForm.f01_num_dos_prop;
        paramForm.IN_TIP_CON = paramForm.FA_TIPO_DOC;
        //if(sMacroR != "" && sZonaR  != "" && sMacroRDesc  != "" && sZonaRDesc  != ""){
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
                    //if(results.length > 0 && results[0].sp_pmfunction_crearcaso_linea != null){
                    //if(results.length > 0 && results[0].sp_pmfunction_crearcaso_linea != null){
                    datosIF = results[0].sp_pmfunction_crearcaso_linea.split(",");
                    datosIF2 = datosIF[1];
                    datosIF[0] = datosIF[0].substring(1, datosIF[0].length);
                    $scope.nrotramitec = datosIF[0];
                    sessionService.set('NROTRAMITE', datosIF[0]);
                    sessionService.set('NROTRAMITEID', datosIF[1]);
                    sessionService.set('IDPROCESO', datosIF[6]);
                    var idTramite1 = sessionService.get('NROTRAMITEID');
                    //datosNeXO['INT_AC_direccionImagenmapa']   =  CONFIG.APIURL+"/files/RC_CLI/"+sessionService.get('IDSOLICITANTE') + "/" + sessionService.get('IDTRAMITE') + "/"+ sessionService.get('IDTRAMITE') + $scope.archivo2 + "?app_name=todoangular";
                    //VERIFICAR Y CORREGIR ERROR AL REALIZAR ALGUNO DE ESTOS PROCESOS
                    try {
                        $scope.validarFormProcesos(paramForm);
                    } catch (e) { }

                    $.unblockUI();
                } catch (e) {
                    console.log("falla: ", e);
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
        console.log("desabilito:: ", $scope.desabilitado);
        $.unblockUI();
    });

    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function (event, data) {
        //MOSTRAR RADIO NUEVA - RENOVACION
        if (typeof (data.rdTipoTramite) != 'undefined') {
            if (data.rdTipoTramite == "NUEVO") {
                //MOSTRAMOS BOTONES PAGINA
                if (data.INT_FORM_ALMACENADO == "G") {
                    $scope.botones = "mostrar";
                    $scope.desabilitado = false;
                }
            }
        }
        console.log("desabilito222:: ", $scope.desabilitado);
        //$scope.tipoTramite();
    });//INICIAR CAMPOS INTERNET

    var clsValidarBtnEnviar = $rootScope.$on('validarBtnEnviar', function (event, data) {
        if (data > 0) {
            $scope.btnEnviarForm = false;
        } else {
            $scope.btnEnviarForm = true;
        }
    });

    //validarBtnEnviar
    $scope.validarBtnEnviar = function (cont) {
        if (cont > 0) {
            $scope.btnEnviarForm = false;
        } else {
            $scope.btnEnviarForm = false;
        }
    };
    $scope.ejecutarFile = function (idfile) {
        var sid = document.getElementById(idfile);
        if (sid) {
            document.getElementById(idfile).click();
        } else {
            alert("Error ");
        }
    };

    $scope.$on('$destroy', function () {
        setTimeout(function () {
            clsValidarBtnEnviar();
            clsIniciarCamposInternet();
            clsIniciarHtmlForm();
        }, 2000);

    });

}