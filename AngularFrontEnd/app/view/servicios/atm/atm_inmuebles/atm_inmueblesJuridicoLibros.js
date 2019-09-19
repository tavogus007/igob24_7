function inmueblesControllerJuridico($scope, $q, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG,
    LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, fileUpload1, $timeout, obtFechaCorrecta) {
    //alert('CONTROLADOR inmueble JURIDICA');
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    $rootScope.fechayhora = fecha + ' ' + hora;
    var año = (hoy.getFullYear() - 1);
    $rootScope.fechaa = año;
    $scope.tipotramite = "";

    $scope.inicioInmueblesJuridico = function () {
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
    $scope.tipotramite_list = function () {
        var validarpromesas = [$scope.tipoTramite()];
        $q.all(validarpromesas).then(function (resp) {//AE - Validar Envio Licencia
        });
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
                swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n Nos contactaremos con usted a la brevedad posible, para darle a conocer novedades acerca de su trámite.");
            });
        } catch (error) {
            console.log("Error : ", error);
            swal('', 'Registro no modificado', 'error');
            $.unblockUI();
        }
    };
    /*CIUDADANO - ENVIAR FORMULARIO NATURAL*/
    //enviarFormProcesosLinea
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
        var idProcodigo = 'LI_INM';
        var datosNeXO = {};
        /*RENOVACION DE LICENCIAS*/

        paramForm.FA_TIP_CON = paramForm.f01_num_dos_prop;
        paramForm.IN_TIP_CON = paramForm.FA_TIPO_DOC;


        //if(sMacroR != "" && sZonaR  != "" && sMacroRDesc  != "" && sZonaRDesc  != ""){
        var sIdTramite = $rootScope.tramiteId;
        var datosSerializados = JSON.stringify(paramForm);
        archivo1 = "";
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
                    //if(results.length > 0 && results[0].sp_pmfunction_crearcaso_linea != null){
                    //if(results.length > 0 && results[0].sp_pmfunction_crearcaso_linea != null){
                    datosIF = results[0].sp_pmfunction_crearcaso_en_linea.split(",");
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
    $scope.verificarDatos = function(datos){
        $scope.formulario406(datos);
        $("#declaracionJ").modal("show");

    }
    $scope.formulario406 = function(dataI){
        //console.log('dataI',dataI);
        $scope.valor =  dataI.valorLibroTablas; 
        $rootScope.datosEnvI = "";
        var fecha= new Date();
        var fechaActualS = "";
        fechaActualS= fecha.getDate() +" - "+ (fecha.getMonth() + 1) +" - "+ fecha.getFullYear();
        var sHora = "";
        sHora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var stringFormulario406  =   "";
        $scope.dia = fecha.getDate();
        $scope.mes = fecha.getMonth() + 1;
        $scope.anio = fecha.getFullYear();
        var urlFormularioJ  =   "";
        var snombre =   "";
        var scedulaid   =   "";
        var sexpedido   =   "";
        var snombreREP = "";
        var scirep = "";
        var sempresa = "";
        var snit = "";
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        if($scope.tipoPersona == 'JURIDICO'){
            datos.f01_tipo_per_desc = 'JURIDICO';
            urlFormularioJ  =   "../../docs/formulario_406.html";
            $( "#msgformularioJ" ).load(urlFormularioJ, function(data) {
                stringFormulario406  =   data;
                
                datos.INM_VL_NRO_DOC_IDEN = ((typeof(dataI.INT_NIT) == 'undefined' || dataI.INT_NIT == null) ? "" : dataI.INT_NIT);
                datos.INM_VL_NOM_RAZ_SOC = ((typeof(dataI.f01_raz_soc_per_jur) == 'undefined' || dataI.f01_raz_soc_per_jur == null) ? "" : dataI.f01_raz_soc_per_jur);
                datos.valorLibroTablas = ((typeof(dataI.valorLibroTablas) == 'undefined' || dataI.valorLibroTablas == null) ? "" : dataI.valorLibroTablas);   

                stringFormulario406  =   stringFormulario406.replace("#INM_VL_NRO_DOC_IDEN#", datos.INM_VL_NRO_DOC_IDEN);
                stringFormulario406  =   stringFormulario406.replace("#INM_VL_NOM_RAZ_SOC#", datos.INM_VL_NOM_RAZ_SOC);
                stringFormulario406  =   stringFormulario406.replace("#valorLibroTablas#",$scope.valor); 

                stringFormulario406  =   stringFormulario406.replace("#DIA#", fecha.getDate());
                stringFormulario406  =   stringFormulario406.replace("#MES#", fecha.getMonth() + 1);
                stringFormulario406  =   stringFormulario406.replace("#ANIO#", fecha.getFullYear());
                

                $scope.msgformularioJ = stringFormulario406;

                setTimeout(function(){
                    $scope.fmostrarFormulario();
                },500);
            })
            $scope.armarDatosForm(datos,fechaActualS, sHora);
        }
    }

    $scope.armarDatosForm = function(data,sfecha,sHora){
        $rootScope.datosForm406 = "";
        var dataForm = {};
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        if($scope.tipoPersona == 'JURIDICO' || $scope.tipoPersona =='J'){
            dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
            dataForm['f01_tipo_form'] = '406';
            dataForm['INM_VL_NOM_RAZ_SOC'] = data.dtspsl_razon_social;
            dataForm['INM_VL_NRO_DOC_IDEN'] = data.dtspsl_ci;
            dataForm['valorLibroTablas'] = data.valorLibroTablasV;
            dataForm['dia'] = $scope.dia;
            dataForm['mes'] = $scope.mes
            dataForm['anio'] = $scope.anio;
            $rootScope.datosForm406 = dataForm;
            $rootScope.datosEnvI = data;
        }
    }

    $scope.fmostrarFormulario   =   function(){
        $("#exampleModalCenter1").modal({backdrop: 'static', keyboard: false});
        $('#msgformularioJ').html($scope.msgformularioJ);
    }

   
    /* ADJUNTAR ACRCHIVOS */
    $scope.almacenarRequisitos = function (aArchivos, idFile) {
        document.getElementById('href_f01_upload_' + idFile).href = '';
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
                    nombreNuevo = 'adjunto_' + fechaNueva + '.' + tipoDocci;
                    url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                    $scope.url = url;
                    document.getElementById('href_f01_upload_' + idFile).href = url;
                    document.getElementById(idFile).value = nombreNuevo;
                    document.getElementById(idFile + '_url').value = url;
                    fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                } else {
                    swal('Advertencia', 'El adjunto no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                    document.getElementById(idFile).value = '';
                }
            } 
        });
        datoObjectFactura = new Object();
        datoObjectFact = [];
        $scope.datos.urlFactura = url; // NO OLVIDAR
    };
    $scope.almacenarRequisitosInmueble = function (aArchivos, idFile) {
        document.getElementById('href_f01_upload_' + idFile).href = '';
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
                    nombreNuevo = 'adjunto_' + fechaNueva + '.' + tipoDocci;
                    url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                    document.getElementById('href_f01_upload_' + idFile).href = url;
                    document.getElementById(idFile).value = nombreNuevo;
                    document.getElementById(idFile + '_url').value = url;
                    fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                } else {
                    swal('Advertencia', 'El adjunto no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                    document.getElementById(idFile).value = '';
                }
            } 
        });
        datoObjectInmueble = new Object();
        datoObjectInmb = [];
        $scope.datos.urlInmueble = url; // NO OLVIDAR
    };
    $scope.almacenarRequisitosCuadroAct = function (aArchivos, idFile) {
        document.getElementById('href_f01_upload_' + idFile).href = '';
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
                    nombreNuevo = 'adjunto_' + fechaNueva + '.' + tipoDocci;
                    url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                    document.getElementById('href_f01_upload_' + idFile).href = url;
                    document.getElementById(idFile).value = nombreNuevo;
                    document.getElementById(idFile + '_url').value = url;
                    fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                } else {
                    swal('Advertencia', 'El adjunto no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                    document.getElementById(idFile).value = '';
                }
            } 
        });
        datoObjectCuadroAct = new Object();
        datoObjectCuad = [];
        $scope.datos.urlCuadroAct = url; 
    };

    $scope.almacenarRequisitosExcel = function (aArchivos, idFile) {
        //console.log('aArchivos',aArchivos);
        //console.log('idFile',idFile);

        document.getElementById('href_f01_upload_' + idFile).href = '';
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
                if (tipoDocci == 'xlsx' || tipoDocci == 'xls') {
                    nombreNuevo = 'adjunto_' + fechaNueva + '.' + tipoDocci;
                    url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreNuevo + "?app_name=todoangular";
                    //console.log('url',url);
                    document.getElementById('href_f01_upload_' + idFile).href = url;
                    document.getElementById(idFile).value = nombreNuevo;
                    document.getElementById(idFile + '_url').value = url;
                    fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                } else {
                    swal('Advertencia', 'El adjunto no es valido, seleccione un archivo de tipo Excel (xls ó xlsx)', 'error');
                    document.getElementById(idFile).value = '';
                }
            } 
        });
        datoObjectExcel = new Object();
        datoObjectExc = [];
        $scope.datos.excel = url; 
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
}