function cambioRadicatoriaController($scope, $q, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG,
    LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, fileUpload1, $timeout, obtFechaCorrecta) {
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    $rootScope.fechayhora = fecha + ' ' + hora;
    var año = (hoy.getFullYear() - 1);
    $rootScope.fechaa = año;
    $scope.tipotramite = "";

    $scope.inicioCambioRadicatoria = function () {
        $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');
        if ($scope.sTipoPersona == "NATURAL") {
            $scope.divNatural = "mostrar";

        } else {
            $scope.divJuridico = "mostrar";
        }
        $scope.requiRecuperados = [];
        $scope.datos.FECHA_REGISTRO = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function (resp) {
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            $scope.datos.FECHA_REGISTRO = fecha_[2] + "-" + fecha_[1] + "-" +fecha_[0];
        });
        $scope.documentos();
    };

    //*************************************DOCUMENTOS**************************************************/
    $scope.documentos = function(){
        console.log("$scope.datos.File_Adjunto",$scope.datos.File_Adjunto);
        if($scope.datos.File_Adjunto == undefined){
            $scope.datos.File_Adjunto = [];
            if($scope.datos.f01_tipo_per == 'NATURAL'){
                var ci = {"url":CONFIG.APIURL + "/files/RC_CLI/" + $scope.datos.CI_BIGDATA + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular","campo":$scope.datos.FILE_FOTOCOPIA_CI,"nombre":"Cédula de identidad Anverso"};
                $scope.datos.File_Adjunto.push(ci);
                var ci_reverso = {"url":CONFIG.APIURL + "/files/RC_CLI/" + $scope.datos.CI_BIGDATA + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular","campo":$scope.datos.FILE_FOTOCOPIA_CI_R,"nombre":"Cédula de identidad Reverso"};
                $scope.datos.File_Adjunto.push(ci_reverso);
            }else{
                if($scope.datos.f01_tipo_per == 'JURIDICO'){
                    var ci = {"url":CONFIG.APIURL + "/files/RC_CLI/" + $scope.datos.OID_REP + "/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular","campo":$scope.datos.FILE_FOTOCOPIA_CI,"nombre":"Cédula de identidad representante legel (Anverso)"};
                    $scope.datos.File_Adjunto.push(ci);
                    var ci_reverso = {"url":CONFIG.APIURL + "/files/RC_CLI/" + $scope.datos.OID_REP + "/" + $scope.datos.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular","campo":$scope.datos.FILE_FOTOCOPIA_CI_R,"nombre":"Cédula de identidad representante legel(Reverso)"};
                    $scope.datos.File_Adjunto.push(ci_reverso);
                    var poder = {"url":CONFIG.APIURL + "/files/RC_CLI/" + $scope.datos.CI_BIGDATA + "/" + $scope.datos.file_poder + "?app_name=todoangular","campo":$scope.datos.file_poder,"nombre":"Poder del representate legel"};
                    $scope.datos.File_Adjunto.push(poder);
                    var testimonio = {"url":CONFIG.APIURL + "/files/RC_CLI/" + $scope.datos.CI_BIGDATA + "/" + $scope.datos.f01_test_cons_sociedad_j + "?app_name=todoangular","campo":$scope.datos.f01_test_cons_sociedad_j,"nombre":"Testimonio de constitución"};
                    $scope.datos.File_Adjunto.push(testimonio);
                    var nit = {"url":CONFIG.APIURL + "/files/RC_CLI/" + $scope.datos.CI_BIGDATA + "/" + $scope.datos.file_num_ident + "?app_name=todoangular","campo":$scope.datos.file_num_ident,"nombre":"Número de identificación tributaria (NIT)"};
                    $scope.datos.File_Adjunto.push(nit);
                    var fundaempresa = {"url":CONFIG.APIURL + "/files/RC_CLI/" + $scope.datos.CI_BIGDATA + "/" + $scope.datos.file_fund_emp + "?app_name=todoangular","campo":$scope.datos.file_fund_emp,"nombre":"Fundempresa o matricula de comercio"};
                    $scope.datos.File_Adjunto.push(fundaempresa);
                }
            }
        }
    }

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

    $scope.cambiarFile = function(obj, valor) {
        var datos = new Array();
        datos[obj.name] = valor;
        $scope.subirRequisitos(obj, valor);
    };

    $scope.subirRequisitos = function(sobj, svalor) {
        var rMisDocs = new Array();
        if (sobj.files[0]) {
            rMisDocs.push(sobj.files[0]);
            $scope.almacenarRequisitos(rMisDocs, sidFile);
        }
    };

    $scope.almacenarRequisitos = function (aArchivos, idFile) {
        document.getElementById(idFile).value = '';
        document.getElementById(idFile + '_url').value = '';
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function (resp) {
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1] + hora_[2];
        });

        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        angular.forEach(aArchivos, function (archivo, key) {
            if (typeof (archivo) != 'undefined') {
                var tipoDocci = archivo.name;
                var nameArrayci = tipoDocci.split('.');
                tipoDocci = nameArrayci[nameArrayci.length - 1];
                if (tipoDocci == 'png' || tipoDocci == 'jpg' || tipoDocci == 'jpeg' || tipoDocci == 'bmp' || tipoDocci == 'gif' || tipoDocci == 'pdf' || tipoDocci == 'docx' || tipoDocci == 'docxlm') {
                    nombreNuevo = idFile+'_'+ fechaNueva + '.' + tipoDocci;
                    url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.url = url;
                    console.log("entra",'href_f01_upload_' + idFile,"url",url);
                    $scope.datos["url_"+idFile] = url;
                    $scope.datos["nombre_"+idFile] = nombreNuevo;
                    console.log("$scope.datos",$scope.datos);
                    document.getElementById(idFile + '_url').value = url;
                    fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                } else {
                    swal('Advertencia', 'El adjunto no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                    document.getElementById(idFile).value = '';
                }
            }
        });
    };

    //****************************************ENVIO****************************************************/
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
        var certificado = {"url":paramForm.url_certificado,"campo":paramForm.nombre_certificado,"nombre":"Certificado de Registro de Propiedad - Vehículo Automotor (CRPVA), a color"};
        paramForm.File_Adjunto.push(certificado);
        if(paramForm.url_declaracion != undefined && paramForm.url_declaracion !=""){
            var declaracion = {"url":paramForm.url_declaracion,"campo":paramForm.nombre_declaracion,"nombre":"Declaración Jurada de Posesión de buena fe del vehículo automotor terrestre a color (Solo para poseedores)"};
            paramForm.File_Adjunto.push(declaracion);
        }
        if(paramForm.url_documentacion != undefined && paramForm.url_documentacion !=""){
            var documentacion = {"url":paramForm.url_documentacion,"campo":paramForm.nombre_documentacion,"nombre":"Documentación que acredite que el poseedor tiene bajo su tenencia de buena fe el vehículo automotor terrestre (Documento privado de compra y venta, Testimonio Poder, a color)"};
            paramForm.File_Adjunto.push(documentacion);
        }
        if(paramForm.url_documentacion_poseedor != undefined && paramForm.url_documentacion_poseedor !=""){
            var documentacion = {"url":paramForm.url_documentacion_poseedor,"campo":paramForm.nombre_documentacion_poseedor,"nombre":"Documentación que acredite que el poseedor tiene bajo su tenencia de buena fe el vehículo automotor terrestre (Documento privado de compra y venta, u otros similares) a color (Solo para poseedores)"};
            paramForm.File_Adjunto.push(documentacion);
        }
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        $scope.btnEnviarForm = true;
        var idProcodigo = 'CMB_RAD';
        var sIdTramite = $rootScope.tramiteId;
        var datosSerializados = JSON.stringify(paramForm);
        var crearCaso = new gCrearCasoLinea();
        crearCaso.usr_id = 1,
        crearCaso.datos = datosSerializados,
        crearCaso.procodigo = idProcodigo,
        crearCaso.crearCasoLinea(function (response) {
            try {
                $scope.botones = null;
                $scope.desabilitado = true;
                response = JSON.parse(response);
                var results = response.success.data;
                indice = 0;
                datosIF = results[0].sp_pmfunction_crearcaso_en_linea.split(",");
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
                swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n Nos contactaremos con usted a la brevedad posible, para darle a conocer novedades acerca de su trámite.");
            });
        } catch (error) {
            swal('', 'Registro no modificado', 'error');
            $.unblockUI();
        }
    };

    var clsValidarBtnEnviar = $rootScope.$on('validarBtnEnviar', function (event, data) {
        $scope.inicioCambioRadicatoria();
        $scope.$apply(); 
        if (data > 0) {
            $scope.btnEnviarFormLinea = true ;
        } else {
            $scope.btnEnviarFormLinea = false ;
        }
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
        $scope.$apply();
        $.unblockUI();
    });

    var clsIniciaBtnHabilitar = $rootScope.$on('iniciaBtnHabilitar', function(event, data){
        if(data){
            if(data == 'G'){
                $scope.btnEnviarFormLinea    =   false;
                $scope.desabilitado     =   true;
            }else if(data == 'C'){
                $scope.btnEnviarFormLinea    =   true;
                $scope.desabilitado     =   false;
                $scope.botones          =   "mostrar";
            }
        }    
    });
    /************************************************VALIDACION***************************************************/
    $scope.validaPlaca = function (campo){
        const indiaRegex = /[0-9]{3,4}[A-Z]{3}$/;
        const inputText = document.getElementById("FA_PLACA").value;
        if(inputText.match(indiaRegex)) {
            console.log("Valid phone number");      
        } else {
            swal('Advertencia', 'El formato de la placa no es correcto', 'error');

        }
    }

}