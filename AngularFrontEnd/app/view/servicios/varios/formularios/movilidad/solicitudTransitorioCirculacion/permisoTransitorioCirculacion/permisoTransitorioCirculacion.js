function permisoDeleveryController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, $timeout, obtFechaCorrecta, $route, obtFechaActual, fileUpload1) {
    var sIdCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.tipo_persona = sessionService.get('TIPO_PERSONA');
    $scope.oidCiu = sessionService.get('IDSOLICITANTE');
    $scope.datos = {};
    $scope.trmUsuario = [];
    $scope.trmAutos = [];
    $scope.desabilitado = false;
    $scope.botones_visibles = true;
    $scope.des_servicio_uno = false;
    $scope.des_servicio_dos = false;
    $scope.des_servicio_tres = false;
    $scope.des_servicio_cuatro = false;
    $scope.div_motivo = false;
    $scope.tipovehiculo_privado = {};
    $scope.tipovehiculo_privado = JSON.parse('[{"nombre":"AUTOMOVIL"},{"nombre":"MOTOCICLETA"}]');
    $scope.div_escoger_servicio = false;
    $scope.singular_Titulo = '(En formato PDF o DOC)';
    $scope.singular_Respaldo = 'ADJUNTAR RESPALDO DEL MOTIVO DE LA SOLICITUD';
    $scope.singular_Soat = 'ADJUNTE EL DOCUMENTO DEL SOAT ';
    $scope.singular_Ruat = 'ADJUNTE EL DOCUMENTO DEL RUAT';
    $scope.singular_Licencias = 'ADJUNTE SU LICENCIA DE CONDUCIR';
    $scope.plural_Titulo = 'Los documentos para cada requisito en un solo archivo (En formato PDF o DOC)';
    $scope.plural_Respaldo = 'ADJUNTAR RESPALDO DEL MOTIVO DE LA SOLICITUD';
    $scope.plural_Soat = 'ADJUNTE EN UN SOLO DOCUMENTO EL SOAT DE TODOS VEHÍCULOS';
    $scope.plural_Ruat = 'ADJUNTE EN UN SOLO DOCUMENTO EL RUAT DE TODOS VEHÍCULOS';
    $scope.plural_Licencias = 'ADJUNTE EN UN SOLO DOCUMENTO LAS LICENCIAS DE LOS CONDUCTORES';
    $scope.tituloRespaldo =  $scope.singular_Respaldo;
    $scope.tituloSOAT =  $scope.singular_Soat;
    $scope.tituloRUAT = $scope.singular_Ruat;
    $scope.tituloLicencias = $scope.singular_Licencias;
    $scope.tituloPrincipal = $scope.singular_Titulo;

    $scope.inicio = function () {
    }
    var clsValidarBtnEnviar = $rootScope.$on('inicializarVista', function (event, data) {
        $scope.datos = JSON.parse(data);
        if ($scope.datos.INF_ARRAY_AUTOS == undefined) {
            $scope.trmAutos = [];
        } else {
            $scope.trmAutos = JSON.parse($scope.datos.INF_ARRAY_AUTOS);
        }
        $scope.tblAutos.reload();
        $scope.dinamicoFormulario($scope.datos.PER_TRA_REG_TRANS);
        if ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO') {
        }
        $scope.enviado = sessionService.get('ESTADO');
        if ($scope.enviado == 'SI') {
            $scope.desabilitado = true;
            $scope.ocultadorRadios($scope.datos);
        } else {
            $scope.desabilitado = false;
            $scope.des_servicio_uno = false;
            $scope.des_servicio_dos = false;
            $scope.des_servicio_tres = false;
            $scope.des_servicio_cuatro = false;
        }
        $("#valida").hide();
        $("#valida1").hide();
        document.getElementById('gu').disabled = true;
        $scope.$apply();
        setTimeout(function () {
            iniciarLoadFyle();
        }, 1000);
    });

    $scope.guardar_tramite = function (datos) {
        datos.Tipo_tramite_creado = "WEB";
        try {
            var datosSerializados = JSON.stringify(datos);
            var idCiudadano = sessionService.get('IDSOLICITANTE');
            var idTramite = sessionService.get('IDTRAMITE');
            var crear = new datosFormularios();
            crear.frm_tra_dvser_id = sessionService.get('IDSERVICIO');
            crear.data_json = datosSerializados;
            crear.frm_tra_id_ciudadano = sIdCiudadano;
            crear.frm_tra_id_usuario = 1;
            crear.frm_idTramite = idTramite;
            $.blockUI();
            crear.sp_crear_datos_formulario(function (results) {
                results = JSON.parse(results);
                results = results.success;
                if (results.length > 0) {
                    alertify.success("Formulario almacenado");
                    document.getElementById('gu').disabled = false;
                    $.unblockUI();
                } else {
                    $.unblockUI();
                    sweet.show('', "Formulario no almacenado", 'error');
                }
            });
        } catch (e) {
            console.log("Error..", e);
            $.unblockUI();
        }
    }
    $scope.validarEnvio = function (data) {
        swal({
            title: 'CONFIRMAR',
            text: 'El envío de la presente solicitud  generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            closeOnConfirm: false
        }, function () {
            swal.close();
            setTimeout(function () {
                $scope.crea_tramite_lotus(data);
            }, 1000);
        });
    };
    $scope.crea_tramite_lotus = function (datos) {
        $scope.adjuntoDos();
        $.blockUI({
            css: {
                border: 'none',
                padding: '10px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }, message: "Espere un momento por favor ..."
        });
        setTimeout(function () {
            $.blockUI();
            $scope.INF_GRILLA = [];
            var encabezado = [];
            var indice = 1;
            var dataInf = [];
            encabezado[0] = { "tipo": "GRD", "campos": "Nro|tipo_vehiculo|c_placa|c_carnet|", "titulos": "Nro|Tipo de Vehículo|Placa|Carnet de Identidad", "impresiones": "true|true|true|true|true|true|true|true|true|false" };
            for (var i = 0; i < $scope.trmAutos.length; i++) {
                dataInf.push($scope.trmAutos[i]);
                $scope.INF_GRILLA.push({
                    Nro: i + 1,
                    tipo_vehiculo: $scope.trmAutos[i].tipo_vehiculo,
                    c_placa: $scope.trmAutos[i].placa,
                    c_carnet: $scope.trmAutos[i].CI,
                });
            }
            angular.forEach($scope.INF_GRILLA, function (value, key) {
                encabezado[indice] = value;
                indice = indice + 1;
            });
            datos.INF_GRILLA = encabezado;
            var f = new Date();
            datos.g_fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()
            datos.g_tipo_tramite = 'PER_CIR';
            data_form = JSON.stringify(datos);
            var tramite = new crearTramiteMovilidad();
            tramite.usr_id = 1;
            tramite.datos = data_form;
            tramite.procodigo = 'PER_CIR';
            var nroTramiteEnviado = sessionService.get('NROTRAMITE');
            tramite.tramite_linea(function (results) {
                results = JSON.parse(results);
                if (results != null) {
                    results = results.success.data[0].crea_tramite_linea;
                    $scope.validarFormProcesos(results);
                    $.unblockUI();
                } else {
                    alertify.error("Señor(a) Ciudadano(a) ocurrio un error al enviar su Tramité.",);
                    $.unblockUI();
                }
            });
        }, 300);
    };

    $scope.validarFormProcesos = function (nroTramite) {
        idUsuario = sessionService.get('IDUSUARIO');
        try {
            idUsuario = 4;
            var tramiteIgob = new datosFormularios();
            tramiteIgob.frm_idTramite = sessionService.get('IDTRAMITE');
            tramiteIgob.frm_tra_enviado = 'SI';
            tramiteIgob.frm_tra_if_codigo = nroTramite;
            tramiteIgob.frm_tra_id_usuario = idUsuario;
            tramiteIgob.validarFormProcesos(function (resultado) {
                swal({
                    title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
                    text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2><br>“SU SOLICITUD SERA ATENDIDA EN UN PLAZO DE 2 DÍAS HÁBILES”',
                    html: true,
                    type: 'success',
                });
                $scope.tramitesCiudadano();
                $scope.desabilitado = true;
                $scope.botones = null;
            });
        } catch (error) {
            alertify.success('Registro no modificado');
            $.unblockUI();
        }
    };
    $scope.ejecutarFile = function (idfile) {
        if (idfile == 'FILE_FOTO_CARNET' || idfile == 'FILE_FOTO_LICENCIA_CI') {
            swal({
                title: 'ALERTA',
                text: 'El cargado de documentos debe seguir el orden de los documentos de vehiculos.',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'SI',
                cancelButtonText: 'NO',
                closeOnConfirm: false
            }, function () {
                swal.close();
                setTimeout(function () {

                    var sid = document.getElementById(idfile);
                    if (sid) {
                        document.getElementById(idfile).click();
                    } else {
                        alert("Error ");
                    }

                }, 1000);
            });

        } else {

            var sid = document.getElementById(idfile);
            if (sid) {
                document.getElementById(idfile).click();
            } else {
                alert("Error ");
            }
        }
    };
    $scope.cambiarFile = function (obj, valor) {
        var arraydoc = ["pdf", "doc", "docx", ".docx", ".docxlm"];
        $scope.registroAdj = [];
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function (resp) {
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1];
        });
        $.blockUI();
        setTimeout(function () {
            var nombre = obj.getAttribute("name");
            var objarchivo = obj.files[0];
            $scope.FILE_VEHICULO_FOTO = obj.files[0];
            var oidCiudadano = sessionService.get('IDSOLICITANTE');
            $scope.direccionvirtual = "RC_CLI";
            var sDirTramite = sessionService.get('IDTRAMITE');
            var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/" + sDirTramite + "/";
            if (nombre == 'FILE_VEHICULO_FOTO' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_VEHICULO_FOTO = nombreNuevo;
                        $scope.FILE_VEHICULO_FOTO = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover1 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_VEHICULO_FOTO = nombreNuevo;
                            $scope.FILE_VEHICULO_FOTO = blobcir;
                            $scope.btover1 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_VEHICULO_FOTO = "";
                        $scope.FILE_VEHICULO_FOTO = "";
                        $.unblockUI();
                    }

                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }
            }
            if (nombre == 'FILE_RUAT_VEHICULO' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_RUAT_VEHICULO = nombreNuevo;
                        $scope.FILE_RUAT_VEHICULO = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover3 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_RUAT_VEHICULO = nombreNuevo;
                            $scope.FILE_RUAT_VEHICULO = blobcir;
                            $scope.btover3 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_RUAT_VEHICULO = "";
                        $scope.FILE_RUAT_VEHICULO = "";
                        $.unblockUI();
                    }

                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }
            }
            if (nombre == 'FILE_FOR_SOAT' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_FOR_SOAT = nombreNuevo;
                        $scope.FILE_FOR_SOAT = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover4 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_FOR_SOAT = nombreNuevo;
                            $scope.FILE_FOR_SOAT = blobcir;
                            $scope.btover4 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_FOR_SOAT = "";
                        $scope.FILE_FOR_SOAT = "";
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo Excel', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }
            }
            if (nombre == 'FILE_RESPALDO' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_RESPALDO = nombreNuevo;
                        $scope.FILE_RESPALDO = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover11 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_RESPALDO = nombreNuevo;
                            $scope.FILE_RESPALDO = blobcir;
                            $scope.btover11 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_RESPALDO = "";
                        $scope.FILE_RESPALDO = "";
                        $.unblockUI();
                    }

                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }
            }
            if (nombre == 'FILE_CONTRATO_DELIVERY' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (ext_doc == "pdf") {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_CONTRATO_DELIVERY = nombreNuevo;
                        $scope.FILE_CONTRATO_DELIVERY = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover5 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_CONTRATO_DELIVERY = nombreNuevo;
                            $scope.FILE_CONTRATO_DELIVERY = blobcir;
                            $scope.btover5 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_CONTRATO_DELIVERY = "";
                        $scope.FILE_CONTRATO_DELIVERY = "";
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }
            }
            if (nombre == 'FILE_FOTO_CARNET' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_FOTO_CARNET = nombreNuevo;
                        $scope.FILE_FOTO_CARNET = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover6 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_CARNET = nombreNuevo;
                                $scope.FILE_FOTO_CARNET = respuesta_compres;
                                document.getElementById("txt_" + nombre).value = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover6 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_CARNET = nombreNuevo;
                                $scope.FILE_FOTO_CARNET = blobcir;
                                $scope.btover6 = "mostrar";
                            });
                            $.unblockUI();
                        }
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_FOTO_CARNET = "";
                        $scope.FILE_FOTO_CARNET = "";
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo png, jpg o jpeg', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }
            }
            if (nombre == 'FILE_FOTO_LICENCIA_CI' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (ext_doc == "pdf") {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                        $scope.FILE_FOTO_LICENCIA_CI = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover7 = "mostrar";
                    } else if (objarchivo.size > 500000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                                $scope.FILE_FOTO_LICENCIA_CI = respuesta_compres;
                                document.getElementById("txt_" + nombre).value = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover7 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                                $scope.FILE_FOTO_LICENCIA_CI = blobcir;
                                $scope.btover7 = "mostrar";
                            });
                            $.unblockUI();
                        }
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_FOTO_LICENCIA_CI = "";
                        $scope.FILE_FOTO_LICENCIA_CI = "";
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }
            }
        }, 1000);
        $.unblockUI();
    }

/*
    $scope.adjuntoDos = function () {
        datoObjectFiles = [];
        var datoObjectFile1 = new Object();
        var datoObjectFile2 = new Object();
        var datoObjectFile3 = new Object();
        var datoObjectFile4 = new Object();
        var datoObjectFile5 = new Object();
        var datoObjectFile6 = new Object();
        var datoObjectFile7 = new Object();
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RESPALDO + "?app_name=todoangular";
        datoObjectFile1.campo = $scope.datos.FILE_RESPALDO;
        datoObjectFile1.nombre = 'ADJUNTAR REPALDO DEL MOTIVO DE LA SOLICITUD';
        datoObjectFile2.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOR_SOAT + "?app_name=todoangular";
        datoObjectFile2.campo = $scope.datos.FILE_FOR_SOAT;
        datoObjectFile2.nombre = 'ADJUNTE EN UN SOLO DOCUMENTO PDF, EL DOCUMENTO DEL SOAT DE LOS VEHÍCULOS AGREGADOS';
        datoObjectFile3.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RUAT_VEHICULO + "?app_name=todoangular";
        datoObjectFile3.campo = $scope.datos.FILE_RUAT_VEHICULO;
        datoObjectFile3.nombre = 'CARGAR DOCUMENTO(S) RUAT DE LOS VEHÍCULO(S)';
        datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_CARNET + "?app_name=todoangular";
        datoObjectFile4.campo = $scope.datos.FILE_FOTO_CARNET;
        datoObjectFile4.nombre = 'ADJUNTAR LOS CARNETS DE LOS SOLICITANTES';
        datoObjectFile5.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
        datoObjectFile5.campo = $scope.datos.FILE_FOTO_LICENCIA_CI;
        datoObjectFile5.nombre = 'CARGAR FOTOGRAFÍAS DE LA LICENCIA DE CONDUCIR DEL (DE LOS) CONDUCTORES DE LOS VEHÍCULOS';
        datoObjectFile6.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_VEHICULO_FOTO + "?app_name=todoangular";
        datoObjectFile6.campo = $scope.datos.FILE_VEHICULO_FOTO;
        datoObjectFile6.nombre = 'ADJUNTAR FOTOGRAFIAS DE LOS VEHÍCULOS SOLICITADOS';
        datoObjectFile7.url = $rootScope.decJuradaNaturalPermiso;
        datoObjectFile7.campo = "DECLARACION JURADADA";
        datoObjectFile7.nombre = 'DECLARACION JURADA';
        datoObjectFiles[0] = datoObjectFile1;
        datoObjectFiles[1] = datoObjectFile2;
        datoObjectFiles[2] = datoObjectFile3;
        datoObjectFiles[3] = datoObjectFile4;
        datoObjectFiles[4] = datoObjectFile5;
        datoObjectFiles[5] = datoObjectFile6;
        datoObjectFiles[6] = datoObjectFile7;
        $scope.datos.FileDocumentos = datoObjectFiles;
        $rootScope.FileAdjuntos = datoObjectFiles;
        $scope.datos.File_Adjunto = datoObjectFiles;
    }
    */


    $scope.adjuntoDos = function () {
        datoObjectFiles = [];
        var datoObjectFile1 = new Object();
        var datoObjectFile2 = new Object();
        var datoObjectFile3 = new Object();
        var datoObjectFile4 = new Object();
        var datoObjectFile5 = new Object();
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RESPALDO + "?app_name=todoangular";
        datoObjectFile1.campo = $scope.datos.FILE_RESPALDO;
        datoObjectFile1.nombre = $scope.tituloRespaldo;
        datoObjectFile2.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOR_SOAT + "?app_name=todoangular";
        datoObjectFile2.campo = $scope.datos.FILE_FOR_SOAT;
        datoObjectFile2.nombre = $scope.tituloSOAT;
        datoObjectFile3.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RUAT_VEHICULO + "?app_name=todoangular";
        datoObjectFile3.campo = $scope.datos.FILE_RUAT_VEHICULO;
        datoObjectFile3.nombre = $scope.tituloRUAT;
        datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
        datoObjectFile4.campo = $scope.datos.FILE_FOTO_LICENCIA_CI;
        datoObjectFile4.nombre = $scope.tituloLicencias;
        datoObjectFile5.url = $rootScope.decJuradaNaturalPermiso;
        datoObjectFile5.campo = "DECLARACION JURADADA";
        datoObjectFile5.nombre = 'DECLARACION JURADA';
        datoObjectFiles[0] = datoObjectFile1;
        datoObjectFiles[1] = datoObjectFile2;
        datoObjectFiles[2] = datoObjectFile3;
        datoObjectFiles[3] = datoObjectFile4;
        datoObjectFiles[4] = datoObjectFile5;
        $scope.datos.FileDocumentos = datoObjectFiles;
        $rootScope.FileAdjuntos = datoObjectFiles;
        $scope.datos.File_Adjunto = datoObjectFiles;
    }


    $scope.tblTramites = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            IdActividad: 'desc'
        }
    }, {
        total: $scope.trmUsuario.length,
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.trmUsuario, params.filter()) :
                $scope.trmUsuario;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.trmUsuario;
            params.total($scope.trmUsuario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.tblAutos = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
        }
    }, {
        total: $scope.trmAutos.length,
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.trmAutos, params.filter()) :
                $scope.trmAutos;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.trmAutos;
            params.total($scope.trmAutos.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.verificacionFinalDeCamposFinal = function (data) {

        if ($scope.datos.PER_TRA_REG_TRANS == undefined || $scope.datos.PER_TRA_REG_TRANS == 'undefined') {
            swal('', "Ingrese el tipo de solicitud", 'warning');
        } else if (($scope.datos.PER_TRA_REG_TRANS == 'OTRO' && $scope.datos.PER_CIR_MOTIVO == undefined) || ($scope.datos.PER_TRA_REG_TRANS == 'OTRO' && $scope.datos.PER_CIR_MOTIVO == 'undefined')) {
            swal('', "Ingrese el motivo del permiso a solicitar", 'warning');
        } else if (JSON.stringify($scope.trmAutos) == '[]') {
            swal('', "Ingrese al menos un vehículo", 'warning');
        } else if ($scope.datos.PER_TRA_NUM_CONTACTO == undefined || $scope.datos.PER_TRA_NUM_CONTACTO == 'undefined') {
            swal('', "Ingrese al menos dos contactos alternativos", 'warning');
        } else if ($scope.datos.FILE_RESPALDO == undefined || $scope.datos.FILE_RESPALDO == 'undefined') {
            swal('', "Ajunte el respaldo del motivo del permiso solicitado", 'warning');
        } else if ($scope.datos.FILE_FOR_SOAT == undefined || $scope.datos.FILE_FOR_SOAT == 'undefined') {
            swal('', "Ajunte el documento del SOAT", 'warning');
        } else if ($scope.datos.FILE_RUAT_VEHICULO == undefined || $scope.datos.FILE_RUAT_VEHICULO == 'undefined') {
            swal('', "Ajunte el documento del RUAT", 'warning');
        } else if ($scope.datos.FILE_FOTO_LICENCIA_CI == undefined || $scope.datos.FILE_FOTO_LICENCIA_CI == 'undefined') {
            swal('', "Adjunte las licencias de conducir", 'warning');
        } else {
            if($scope.datos.PER_TRA_REG_TRANS != 'OTRO'){
                $scope.datos.PER_CIR_MOTIVO = $scope.datos.PER_TRA_REG_TRANS;
            }else{
                $scope.datos.PER_CIR_MOTIVO = $scope.datos.PER_CIR_MOTIVO.toUpperCase();
            }
            $scope.armarCampos(data);
        }
    }
    $scope.armarCampos = function (data) {
        var contadorVehiculos = 0;
        for (var i = 0; i < $scope.trmAutos.length; i++) {
            contadorVehiculos++;
        }
        data.Tipo_tramite_creado = "WEB";
        data.PER_TRA_NRO_TRAMITE = sessionService.get('IDTRAMITE');
        data.INF_ARRAY_AUTOS = JSON.stringify($scope.trmAutos);
        $scope.guardar_tramite(data);
        $scope.declaracionJurada(data);
        $("#declaracionPERTRA").modal("show");
    }
    $scope.declaracionJurada = function (datos) {
        var fecha = new Date();
        var fechaActualS = "";
        fechaActualS = fecha.getDate() + " - " + (fecha.getMonth() + 1) + " - " + fecha.getFullYear();
        var sHora = "";
        sHora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var stringFormulario40 = "";
        var urlFormularioN = "";
        var urlFormularioJ = "";
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        if ($scope.tipoPersona == 'NATURAL' || $scope.tipoPersona == 'N') {
            $scope.domicilio_xxx = datos.PER_TRA_ZONA + " " + datos.PER_TRA_NOMBRE_VIA + " Nº " + datos.PER_TRA_NRO_V;
            datos.f01_nom_completo = datos.PER_TRA_NOMBRE + " " + datos.PER_TRA_PATERNO + " " + datos.PER_TRA_MATERNO;
            datos.f01_num_dos_prop = datos.PER_TRA_CI;
            datos.f01_expedido_prop = datos.PER_TRA_EXPEDIDO;
        } else {
            $scope.domicilio_xxx = datos.PER_TRA_ZONA_J + " " + datos.PER_TRA_NOMBRE_VIA_J + " Nº " + datos.PER_TRA_NRO_VV_J;
            datos.f01_nom_completo = datos.PER_TRA_NOMBRE_J + " " + datos.PER_TRA_PATERNO_J + " " + datos.PER_TRA_MATERNO_J;
            datos.f01_num_dos_prop = datos.PER_TRA_CI_J;
            datos.f01_expedido_prop = datos.PER_TRA_EXPEDIDO_J;
        }
        datos.f01_tipo_per_desc = 'NATURAL';
        urlFormularioN = "../../docs/Movilidad_PER_CIR.html";
        $("#msgformularioN").load(urlFormularioN, function (data) {
            stringFormulario40 = data;
            stringFormulario40 = stringFormulario40.replace("#f01_nom_completo#", datos.f01_nom_completo);
            stringFormulario40 = stringFormulario40.replace("#f01_num_dos_prop#", datos.f01_num_dos_prop);
            stringFormulario40 = stringFormulario40.replace("#f01_expedido_prop#", datos.f01_expedido_prop);
            stringFormulario40 = stringFormulario40.replace("#f01_raz_soc#", datos.PT_DESCRIP_AE);
            stringFormulario40 = stringFormulario40.replace("#f01_num_pmc#", datos.PT_DESCRIP_AE);
            if (datos.INF_TIPO_PERSONA == 'JURIDICO') {
                stringFormulario40 = stringFormulario40.replace("#f01_domiciliado#", datos.PER_TRA_ZONA_J + " " + datos.PER_TRA_NOMBRE_VIA_J + " Nº " + datos.PER_TRA_NRO_VV_J);
            } else {
                stringFormulario40 = stringFormulario40.replace("#f01_domiciliado#", datos.PER_TRA_ZONA + " " + datos.PER_TRA_NOMBRE_VIA + " Nº " + datos.PER_TRA_NRO_V);
            }
            stringFormulario40 = stringFormulario40.replace("#fecha_sist#", fechaActualS);
            stringFormulario40 = stringFormulario40.replace("#hora_sist#", sHora);
            stringFormulario40 = stringFormulario40.replace("#fecha_sist2#", fechaActualS);
            $scope.msgformularioN = stringFormulario40;
            $scope.notifcondicionesuso = stringFormulario40;
            setTimeout(function () {
                $scope.fmostrarFormulario();
            }, 500);
        })
        $scope.armarDatosForm(datos, fechaActualS, sHora);
    }
    $scope.armarDatosForm = function (data, sfecha, sHora) {
        $rootScope.datosForm401 = "";
        var dataForm = {};
        dataForm['f01_nom_completo'] = data.f01_nom_completo;
        dataForm['f01_num_dos_prop'] = data.f01_num_dos_prop;
        dataForm['f01_expedido_prop'] = data.f01_expedido_prop;
        dataForm['f01_raz_soc'] = data.f01_raz_soc;
        dataForm['f01_num_pmc'] = data.f01_num_pmc;
        dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
        dataForm['f01_domiciliado'] = $scope.domicilio_xxx;
        dataForm['fecha_sist'] = sfecha;
        dataForm['fecha_sist2'] = sfecha;
        dataForm['usuario'] = sessionService.get('USUARIO');
        dataForm['hora_sist'] = sHora;
        $rootScope.datosForm401 = dataForm;
        $rootScope.datosEnv = data;
    }
    $scope.fmostrarFormulario = function () {
        $("#exampleModalCenter1").modal({ backdrop: 'static', keyboard: false });
        $('#msgformularioN').html($scope.msgformularioN);
    }
    $scope.adicionarVehiculos = function (data) {
        if ($scope.datos.PER_TRA_CANT_VEHI_SOL == undefined) {
            swal('', 'Ingrese la cantidad de vehículos a solicitar', 'warning');
        } else if ($scope.trmAutos.length >= $scope.datos.PER_TRA_CANT_VEHI_SOL) {
            swal('', 'Ya esta en limite de vehículos solicitantes', 'warning');
        } else if (data == undefined) {
            swal('', 'Agrege la informacion para adjuntar los vehículos', 'warning');
        } else if (data.tipo_vehiculo == '' || data.tipo_vehiculo == undefined) {
            swal('', 'Ingrese el Tipo de Vehículo', 'warning');
        } else if (data.tipo_vehiculo != 'BICICLETA' && data.placa == undefined) {
            swal('', 'Ingrese la placa del vehículo', 'warning');
        } else if (data.CI == undefined) {
            swal('', 'Ingrese el Carnet del Conductor', 'warning');
        } else {
            $scope.trmAutos.push(data);
            $scope.tblAutos.reload();
            $scope.datosV = {};
        }
    }
    $scope.eliminarVehiculo = function (datavehivulo) {
        $scope.trmAutos.splice($scope.trmAutos.indexOf(datavehivulo), 1);
        $scope.tblAutos.reload();
    }
    $scope.dinamicoFormulario = function (dataFormulario) {
        if (dataFormulario == 'OTRO') {
            $scope.div_motivo = true;
        } else {
            $scope.div_motivo = false;
        }
    }

    $scope.ocultadorRadios = function (data) {
        if (data.PER_TRA_REG_TRANS == 'SALUD') {
            $scope.des_servicio_uno = true;
            $scope.des_servicio_dos = false;
            scope.des_servicio_tres = false;
            scope.des_servicio_cuatro = false;
            $scope.div_motivo = false;
        } else if (data.PER_TRA_REG_TRANS == 'VEHÍCULO OFICIAL') {
            $scope.des_servicio_uno = false;
            $scope.des_servicio_dos = true;
            scope.des_servicio_tres = false;
            scope.des_servicio_cuatro = false;
            $scope.div_motivo = false;
        } else if (data.PER_TRA_REG_TRANS == 'VIAJE') {
            $scope.des_servicio_uno = false;
            $scope.des_servicio_dos = false;
            scope.des_servicio_tres = true;
            scope.des_servicio_cuatro = false;
            $scope.div_motivo = false;
        } else {
            $scope.des_servicio_uno = false;
            $scope.des_servicio_dos = false;
            scope.des_servicio_tres = false;
            scope.des_servicio_cuatro = true;
            $scope.div_motivo = true;
        }
    }

    $scope.validaPlaca = function (campo) {
        campo = campo.toUpperCase();
        emailRegex = /^[0-9]{3,4}[A-Z]{3}$/;
        if (emailRegex.test(campo)) {
            valPlaca = 0;
            $("#valida1").show();
            $("#valida").hide();
        } else {
            $("#valida1").hide();
            $("#valida").show();
            valPlaca = 1;
            $scope.desabilitaVeh = true;
        };
    }
    $scope.titulos = function(campo){
        console.log("ffffff",campo);
        if (campo > 1){
            $scope.tituloRespaldo =  $scope.plural_Respaldo;
            $scope.tituloSOAT =  $scope.plural_Soat;
            $scope.tituloRUAT = $scope.plural_Ruat;
            $scope.tituloLicencias = $scope.plural_Licencias;
            $scope.tituloPrincipal = $scope.plural_Titulo;
        }else{
            $scope.tituloRespaldo =  $scope.singular_Respaldo;
            $scope.tituloSOAT =  $scope.singular_Soat;
            $scope.tituloRUAT = $scope.singular_Ruat;
            $scope.tituloLicencias = $scope.singular_Licencias;
            $scope.tituloPrincipal = $scope.singular_Titulo; 
        }
    }
}
