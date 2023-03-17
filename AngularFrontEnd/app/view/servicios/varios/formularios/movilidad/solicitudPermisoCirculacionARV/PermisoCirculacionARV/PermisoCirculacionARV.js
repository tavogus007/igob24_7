function CirculacionARVController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, $timeout, obtFechaCorrecta, $route, obtFechaActual, fileUpload1) {
    var sIdCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.validadordocs = 0;
    $scope.tipo_persona = sessionService.get('TIPO_PERSONA');
    $scope.oidCiu = sessionService.get('IDSOLICITANTE');
    $scope.datos = {};
    $scope.trmUsuario = [];
    $scope.trmAutos = [];
    $scope.desabilitado = false;
    $scope.botones_visibles = true;
    $scope.chk_act_eco_dis = true;
    $scope.chk_act_eco = true;
    $scope.LIC_FUN_SHOW = false;
    $scope.LIC_FUN_SHOW_SW = false;
    $scope.CERT_SEG_PRIV = false;
    $scope.TMOV = false;
    $scope.des_servicio_uno = false;
    $scope.des_servicio_dos = false;
    $scope.des_servicio_tres = false;
    $scope.des_servicio_cuatro = false;
    $scope.des_servicio_cinco = false;
    $scope.div_motivo = false;
    $scope.tipoactividad = {};
    $scope.tipoactividad = JSON.parse('[{"nombre": "Particulares","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "EPSAS","lf": 0,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "DELAPAZ","lf": 0,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "LA PAZ LIMPIA","lf": 0,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "YPFB","lf": 0,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "Medios de comunicación","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Instituciones Públicas","lf": 1,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Instituciones Privadas","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Entidades Bancarias","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Funerarias","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Hoteles","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Empresas de Turismo","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Lineas Aéreas","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Empresas de seguridad privada","lf": 0,"cer": 0,"tmov": 1,"req_nom": 0},{"nombre": "Embajadas","lf": 1,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Empresas de Radio Taxis","lf": 0,"cer": 1,"tmov": 0,"req_nom": 0},{"nombre": "Sindicato de taxis(Constituidos como operadores)","lf": 1,"cer": 1,"tmov": 0,"req_nom": 0},{"nombre": "Sindicato COTRANSTUR","lf": 1,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "TERSA","lf": 0,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "Empresas Privadas de Transporte de Pasajeros (Constituidas como operadores)","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Empresas de delivery","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0}]');
    $scope.tipovehiculo_privado = {};
    $scope.tipovehiculo_privado = JSON.parse('[{"nombre":"AUTOMOVIL"},{"nombre":"MOTOCICLETA"}]');
    $scope.div_escoger_servicio = false;

    // requisitos de documentos adjuntos al formulario ******************************************************************************
    $scope.singular_Titulo = 'IMPORTANTE: Recuerde que la otorgación del “PERMISO EXCEPCIONAL PARA CIRCULACIÓN EN EL ÁREA DE RESTRICCIÓN VEHICULAR” está sujeto a análisis y por lo tanto la solicitud puede ser rechazada.';
    $scope.plural_Titulo = 'Adjunte los siguientes documentos para cada requisito en un solo archivo (En formato PDF o DOC)';


    $scope.singular_Nota = 'Nota dirigida al Lic. Enrique Gustavo Villanueva Gutierrez – Secretario Municipal de Movilidad y Seguridad Ciudadana explicando y justificando la razón de la solicitud';
    $scope.singular_CeId = 'Cédula de Identidad del solicitante';
    $scope.singular_Poder = 'Poder Notariado que acredite las actuaciones del representante legal para efectuar trámites ante el G.A.M.L.P.  (Si corresponde)';
    $scope.singular_Peren = 'En caso de Renovación, permiso Excepcional Vencido';
    $scope.singular_Licencia = 'Licencia de funcionamiento vigente en el caso de actividades económicas (Si corresponde)';
    $scope.singular_Certi = 'Certificado de propiedad de registro del vehículo automotor (RUAT Actualizado), con radicatoria en el municipio de La Paz';
    $scope.singular_Docpro = 'Documento que demuestre la vinculación de la persona natural o jurídica, pública o privada solicitante, con los vehículos motorizados, mismo que deberá incluir placas de circulación, nombre de los propietarios, cuando corresponda';
    $scope.singular_Docseg = 'Documento que acredite contar con el seguro obligatorio de accidentes de tránsito (SOAT actualizado), de servicio público vigente';
    $scope.singular_Cerdoc = 'Certificado o documento que acredite la última revisión técnica vehicular, otorgada por autoridad competente';
    $scope.singular_Ultimo = 'Último pago de impuestos del vehículo, el solicitante no debe contar con deudas pendientes sobre los impuestos a la propiedad de vehículos, ni sanciones en materia de transporte urbano';
    $scope.singular_Resolu = 'Resolución administrativa vigente emitida por la Autoridad Tributaria Municipal, de liberación de impuestos. (Si corresponde)';
    $scope.singular_Roseta = 'Roseta Ambiental Municipal , ( La Roseta Ambiental Municipal no es obligatoria para vehículos eléctricos)';

    $scope.plural_Nota = 'Nota dirigida al Lic. Enrique Gustavo Villanueva Gutierrez – Secretario Municipal de Movilidad y Seguridad Ciudadana explicando y justificando la razón de la solicitud';
    $scope.plural_CeId = 'Cédula de Identidad del solicitante';
    $scope.plural_Poder = 'Poder Notariado que acredite las actuaciones del representante legal para efectuar trámites ante el G.A.M.L.P.  (Si corresponde)';
    $scope.plural_Peren = 'En caso de Renovación, permiso Excepcional Vencido';
    $scope.plural_Licencia = 'Licencia de funcionamiento vigente en el caso de actividades económicas (Si corresponde)';
    $scope.plural_Certi = 'Certificado de propiedad de registro del vehículo automotor (RUAT Actualizado), con radicatoria en el municipio de La Paz';
    $scope.plural_Docpro = 'Documento que demuestre la vinculación de la persona natural o jurídica, pública o privada solicitante, con los vehículos motorizados, mismo que deberá incluir placas de circulación, nombre de los propietarios, cuando corresponda';
    $scope.plural_Docseg = 'Documento que acredite contar con el seguro obligatorio de accidentes de tránsito (SOAT actualizado), de servicio público vigente';
    $scope.plural_Cerdoc = 'Certificado o documento que acredite la última revisión técnica vehicular, otorgada por autoridad competente';
    $scope.plural_Ultimo = 'Último pago de impuestos del vehículo, el solicitante no debe contar con deudas pendientes sobre los impuestos a la propiedad de vehículos, ni sanciones en materia de transporte urbano';
    $scope.plural_Resolu = 'Resolución administrativa vigente emitida por la Autoridad Tributaria Municipal, de liberación de impuestos. (Si corresponde)';
    $scope.plural_Roseta = 'Roseta Ambiental Municipal, ( La Roseta Ambiental Municipal no es obligatoria para vehículos eléctricos)';


    $scope.tituloNota = $scope.singular_Nota;
    $scope.tituloCeId = $scope.singular_CeId;
    $scope.tituloPoder = $scope.singular_Poder;
    $scope.tituloPeren = $scope.singular_Peren;
    $scope.tituloLicencia = $scope.singular_Licencia;
    $scope.tituloCerti = $scope.singular_Certi;
    $scope.tituloDocpro = $scope.singular_Docpro;
    $scope.tituloDocseg = $scope.singular_Docseg;
    $scope.tituloCerdoc = $scope.singular_Cerdoc;
    $scope.tituloUltimo = $scope.singular_Ultimo;
    $scope.tituloResolu = $scope.singular_Resolu;
    $scope.tituloRoseta = $scope.singular_Roseta;

    // fin de documentos adjuntos ***************************************************************************************************

    $scope.tituloPrincipal = $scope.singular_Titulo;
    $scope.validadorPlaca = 0;

    $scope.inicio = function () {
        $scope.getComboMarcaMovilidad();
    }

    var clsValidarBtnEnviar = $rootScope.$on('inicializarVista', function (event, data) {
        $("#valida").hide();
        $("#valida1").hide();
        $scope.datos = JSON.parse(data);
        if ($scope.datos.INF_ARRAY_AUTOS == undefined) {
            $scope.trmAutos = [];
        } else {
            $scope.trmAutos = JSON.parse($scope.datos.INF_ARRAY_AUTOS);
        }
        $scope.tblAutos.reload();
        if ($scope.datos.PER_TRA_REG_TRANS === 'undefined') {
            $scope.dinamicoFormulario($scope.datos.PER_TRA_REG_TRANS);
        }else{
            console.log("no definido formulario dinamico ");
        }
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
            $scope.des_servicio_cinco = false;
        }
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
            encabezado[0] = { "tipo": "GRD", "campos": "Nro|tipo_vehiculo|c_placa|c_clase|c_marca|c_color|c_carnet|c_nombre|c_ape_primer|c_ape_segundo|c_cat_licencia|c_estado|", "titulos": "Nro|Tipo de Vehículo|Placa|Clase|Marca|Color|Carnet de Identidad|Nombre|Primer apellido|Segundo Apellido|Estado", "impresiones": "true|true|true|true|true|true|true|true|true|true|false" };
            for (var i = 0; i < $scope.trmAutos.length; i++) {
                dataInf.push($scope.trmAutos[i]);
                $scope.INF_GRILLA.push({
                    Nro: i + 1,
                    tipo_vehiculo: $scope.trmAutos[i].tipo_vehiculo,
                    c_placa: $scope.trmAutos[i].placa,
                    c_clase: $scope.trmAutos[i].clase,
                    c_marca: $scope.trmAutos[i].marca,
                    c_color: $scope.trmAutos[i].color,
                    c_carnet: $scope.trmAutos[i].CI,
                    c_nombre: $scope.trmAutos[i].nombre,
                    c_ape_primer: $scope.trmAutos[i].ape_primer,
                    c_ape_segundo: $scope.trmAutos[i].ape_segundo,
                    c_cat_licencia: $scope.trmAutos[i].cat_licencia,
                    c_estado: 0,
                });
            }
            angular.forEach($scope.INF_GRILLA, function (value, key) {
                encabezado[indice] = value;
                indice = indice + 1;
            });
            datos.INF_GRILLA = encabezado;
            var f = new Date();
            datos.g_fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()
            datos.g_tipo_tramite = 'PER_ARV';
            data_form = JSON.stringify(datos);
            var tramite = new crearTramiteMovilidad();
            tramite.usr_id = 1;
            tramite.datos = data_form;
            tramite.procodigo = 'PER_ARV';
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
                    text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2><br>“En caso de que su solicitud se apruebe, le llegará a su bandeja de notificaciones en iGob un enlace para que pueda descargar e imprimir el PERMISO EXCEPCIONAL PARA CIRCULACIÓN EN EL ÁREA DE RESTRICCIÓN VEHICULAR. En caso de que su solicitud sea rechazada se le enviará a su bandeja de notificaciones en iGob la razón del rechazo de la solicitud”',
                    html: true,
                    type: 'success',
                },function(isConfirm){
                    console.log("isConfirm");
                    console.log(isConfirm);
                    if (isConfirm) {
                        var currentLocation = window.location;
                        var hrdato =  currentLocation.href
                        const hrdatos = hrdato.split("#");
                        var htldata = hrdatos[0]+"#servicios|varios|index.html?url=\'app/view/servicios/varios/formularios/movilidad/solicitudPermisoCirculacionARV/solicitudPermisoCirculacionARV.html\'";
                        document.location.href=htldata;
                    }
                });
                //document.location.href="/#dashboard";
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
        console.log("ejecutarFile");
        console.log(idfile);
        setTimeout(function () {
            var sid = document.getElementById(idfile);
            if (sid) {
                document.getElementById(idfile).click();
            } else {
                alert("Error ");
            }
        }, 1000);
    };
    $scope.cambiarFile = function (obj, valor) {
        var arraydoc = ["pdf", "doc", "docx", ".docx", ".docxlm","png","jpg","jpeg"];
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
            var oidCiudadano = sessionService.get('IDSOLICITANTE');
            $scope.direccionvirtual = "RC_CLI";
            var sDirTramite = sessionService.get('IDTRAMITE');
            var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/" + sDirTramite + "/";

            if (nombre == 'FILE_Nota' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                        $scope.datos.FILE_Nota = nombreNuevo;
                        $scope.FILE_Nota = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover1 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_Nota = nombreNuevo;
                            $scope.FILE_Nota = blobcir;
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
                        $scope.datos.FILE_Nota = undefined;
                        $scope.FILE_Nota = "";
                        $scope.btover1 = null;
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_Nota = undefined;
                    $scope.FILE_Nota = "";
                    $scope.btover1 = null;
                    $.unblockUI();
                }
            }
            
            if (nombre == 'FILE_CeId' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_CeId = nombreNuevo;
                        $scope.FILE_CeId = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover2 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_CeId = nombreNuevo;
                            $scope.FILE_CeId = blobcir;
                            $scope.btover2 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_CeId = undefined;
                        $scope.FILE_CeId = "";
                        $scope.btover2 = null;
                        $.unblockUI();
                    }

                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_CeId = undefined;
                    $scope.FILE_CeId = "";
                    $scope.btover2 = null;
                    $.unblockUI();
                }
            }

            if (nombre == 'FILE_Poder' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_Poder = nombreNuevo;
                        $scope.FILE_Poder = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover3 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_Poder = nombreNuevo;
                            $scope.FILE_Poder = blobcir;
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
                        $scope.datos.FILE_Poder = undefined;
                        $scope.FILE_Poder = "";
                        $scope.btover3 = null;
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_Poder = undefined;
                    $scope.FILE_Poder = "";
                    $scope.btover3 = null;
                    $.unblockUI();
                }
            }

            if (nombre == 'FILE_Peren' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_Peren = nombreNuevo;
                        $scope.FILE_Peren = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover4 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_Peren = nombreNuevo;
                            $scope.FILE_Peren = blobcir;
                            $scope.btover4 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_Peren = undefined;
                        $scope.FILE_Peren = "";
                        $scope.btover4 = null;
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_Peren = undefined;
                    $scope.FILE_Peren = "";
                    $scope.btover4 = null;
                    $.unblockUI();
                }
            }
            
            if (nombre == 'FILE_Licencia' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_Licencia = nombreNuevo;
                        $scope.FILE_Licencia = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover5 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Licencia = nombreNuevo;
                                $scope.FILE_Licencia = respuesta_compres;
                                document.getElementById("txt_" + nombre).value = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover5 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Licencia = nombreNuevo;
                                $scope.FILE_Licencia = blobcir;
                                $scope.btover5 = "mostrar";
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
                        $scope.datos.FILE_Licencia = undefined;
                        $scope.FILE_Licencia = "";
                        $scope.btover5 = null;
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_Licencia = undefined;
                    $scope.FILE_Licencia = "";
                    $scope.btover5 = null;
                    $.unblockUI();
                }
            }
            
            if (nombre == 'FILE_Certi' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_Certi = nombreNuevo;
                        $scope.FILE_Certi = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover6 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Certi = nombreNuevo;
                                $scope.FILE_Certi = respuesta_compres;
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
                                $scope.datos.FILE_Certi = nombreNuevo;
                                $scope.FILE_Certi = blobcir;
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
                        $scope.datos.FILE_Certi = undefined;
                        $scope.FILE_Certi = "";
                        $scope.btover6 = null;
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_Certi = undefined;
                    $scope.FILE_Certi = "";
                    $scope.btover6 = null;
                    $.unblockUI();
                }
            }
            
            if (nombre == 'FILE_Docpro' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_Docpro = nombreNuevo;
                        $scope.FILE_Docpro = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover7 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Docpro = nombreNuevo;
                                $scope.FILE_Docpro = respuesta_compres;
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
                                $scope.datos.FILE_Docpro = nombreNuevo;
                                $scope.FILE_Docpro = blobcir;
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
                        $scope.datos.FILE_Docpro = undefined;
                        $scope.FILE_Docpro = "";
                        $scope.btover7 = null;
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_Docpro = undefined;
                    $scope.FILE_Docpro = "";
                    $scope.btover7 = null;
                    $.unblockUI();
                }
            }

            if (nombre == 'FILE_Docseg' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_Docseg = nombreNuevo;
                        $scope.FILE_Docseg = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover8 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Docseg = nombreNuevo;
                                $scope.FILE_Docseg = respuesta_compres;
                                document.getElementById("txt_" + nombre).value = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover8 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Docseg = nombreNuevo;
                                $scope.FILE_Docseg = blobcir;
                                $scope.btover8 = "mostrar";
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
                        $scope.datos.FILE_Docseg = undefined;
                        $scope.FILE_Docseg = "";
                        $scope.btover8 = null;
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_Docseg = undefined;
                    $scope.FILE_Docseg = "";
                    $scope.btover8 = null;
                    $.unblockUI();
                }
            }

            if (nombre == 'FILE_Cerdoc' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_Cerdoc = nombreNuevo;
                        $scope.FILE_Cerdoc = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover9 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Cerdoc = nombreNuevo;
                                $scope.FILE_Cerdoc = respuesta_compres;
                                document.getElementById("txt_" + nombre).value = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover9 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Cerdoc = nombreNuevo;
                                $scope.FILE_Cerdoc = blobcir;
                                $scope.btover9 = "mostrar";
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
                        $scope.datos.FILE_Cerdoc = undefined;
                        $scope.FILE_Cerdoc = "";
                        $scope.btover9 = null;
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_Cerdoc = undefined;
                    $scope.FILE_Cerdoc = "";
                    $scope.btover9 = null;
                    $.unblockUI();
                }
            }

            if (nombre == 'FILE_Ultimo' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_Ultimo = nombreNuevo;
                        $scope.FILE_Ultimo = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover10 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Ultimo = nombreNuevo;
                                $scope.FILE_Ultimo = respuesta_compres;
                                document.getElementById("txt_" + nombre).value = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover10 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Ultimo = nombreNuevo;
                                $scope.FILE_Ultimo = blobcir;
                                $scope.btover10 = "mostrar";
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
                        $scope.datos.FILE_Ultimo = undefined;
                        $scope.FILE_Ultimo = "";
                        $scope.btover10 = null;
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_Ultimo = undefined;
                    $scope.FILE_Ultimo = "";
                    $scope.btover10 = null;
                    $.unblockUI();
                }
            }

            if (nombre == 'FILE_Resolu' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_Resolu = nombreNuevo;
                        $scope.FILE_Resolu = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover11 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Resolu = nombreNuevo;
                                $scope.FILE_Resolu = respuesta_compres;
                                document.getElementById("txt_" + nombre).value = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover11 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Resolu = nombreNuevo;
                                $scope.FILE_Resolu = blobcir;
                                $scope.btover11 = "mostrar";
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
                        $scope.datos.FILE_Resolu = undefined;
                        $scope.FILE_Resolu = "";
                        $scope.btover11 = null;
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_Resolu = undefined;
                    $scope.FILE_Resolu = "";
                    $scope.btover11 = null;
                    $.unblockUI();
                }
            }

            if (nombre == 'FILE_Roseta' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_Roseta = nombreNuevo;
                        $scope.FILE_Roseta = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover12 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Roseta = nombreNuevo;
                                $scope.FILE_Roseta = respuesta_compres;
                                document.getElementById("txt_" + nombre).value = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover12 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Roseta = nombreNuevo;
                                $scope.FILE_Roseta = blobcir;
                                $scope.btover12 = "mostrar";
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
                        $scope.datos.FILE_Roseta = undefined;
                        $scope.FILE_Roseta = "";
                        $scope.btover12 = null;
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El formato del archivo no es válido, seleccione un archivo de imagen, tipo doc, docx o en formato PDF.', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $scope.datos.FILE_Roseta = undefined;
                    $scope.FILE_Roseta = "";
                    $scope.btover12 = null;
                    $.unblockUI();
                }
            }
            
        }, 1000);
        $.unblockUI();
    }

    $scope.adjuntoDos = function () {
        datoObjectFiles = [];
        var datoObjectFile1 = new Object();
        var datoObjectFile2 = new Object();
        var datoObjectFile3 = new Object();
        var datoObjectFile4 = new Object();
        var datoObjectFile5 = new Object();
        var datoObjectFile6 = new Object();
        var datoObjectFile7 = new Object();
        var datoObjectFile8 = new Object();
        var datoObjectFile9 = new Object();
        var datoObjectFile10 = new Object();
        var datoObjectFile11 = new Object();
        var datoObjectFile12 = new Object();
        
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        
        datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Nota + "?app_name=todoangular";
        datoObjectFile1.campo = $scope.datos.FILE_Nota;
        datoObjectFile1.nombre = $scope.tituloNota;

        datoObjectFile2.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_CeId + "?app_name=todoangular";
        datoObjectFile2.campo = $scope.datos.FILE_CeId;
        datoObjectFile2.nombre = $scope.tituloCeId;


        datoObjectFile3.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Poder + "?app_name=todoangular";
        datoObjectFile3.campo = $scope.datos.FILE_Poder;
        datoObjectFile3.nombre = $scope.tituloPoder;

        datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Peren + "?app_name=todoangular";
        datoObjectFile4.campo = $scope.datos.FILE_Peren;
        datoObjectFile4.nombre = $scope.tituloPeren;

        datoObjectFile5.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Licencia + "?app_name=todoangular";
        datoObjectFile5.campo = $scope.datos.FILE_Licencia;
        datoObjectFile5.nombre = $scope.tituloLicencia;

        datoObjectFile6.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Certi + "?app_name=todoangular";
        datoObjectFile6.campo = $scope.datos.FILE_Certi;
        datoObjectFile6.nombre = $scope.tituloCerti;

        datoObjectFile7.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Docpro + "?app_name=todoangular";
        datoObjectFile7.campo = $scope.datos.FILE_Docpro;
        datoObjectFile7.nombre = $scope.tituloDocpro;

        datoObjectFile8.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Docseg + "?app_name=todoangular";
        datoObjectFile8.campo = $scope.datos.FILE_Docseg;
        datoObjectFile8.nombre = $scope.tituloDocseg;

        datoObjectFile9.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Cerdoc + "?app_name=todoangular";
        datoObjectFile9.campo = $scope.datos.FILE_Cerdoc;
        datoObjectFile9.nombre = $scope.tituloCerdoc;

        datoObjectFile10.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Ultimo + "?app_name=todoangular";
        datoObjectFile10.campo = $scope.datos.FILE_Ultimo;
        datoObjectFile10.nombre = $scope.tituloUltimo;

        datoObjectFile11.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Resolu + "?app_name=todoangular";
        datoObjectFile11.campo = $scope.datos.FILE_Resolu;
        datoObjectFile11.nombre = $scope.tituloResolu;

        datoObjectFile12.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Roseta + "?app_name=todoangular";
        datoObjectFile12.campo = $scope.datos.FILE_Roseta;
        datoObjectFile12.nombre = $scope.tituloRoseta;


        datoObjectFiles.push(datoObjectFile1); // FILE_Nota
        datoObjectFiles.push(datoObjectFile2); // FILE_CeId

        datoObjectFiles.push(datoObjectFile3); // FILE_Poder
        datoObjectFiles.push(datoObjectFile4); // FILE_Peren
        datoObjectFiles.push(datoObjectFile5); // FILE_Licencia
        datoObjectFiles.push(datoObjectFile6); // FILE_Certi
        datoObjectFiles.push(datoObjectFile7); // FILE_Docpro
        datoObjectFiles.push(datoObjectFile8); // FILE_Docseg
        datoObjectFiles.push(datoObjectFile9); // FILE_Cerdoc
        datoObjectFiles.push(datoObjectFile10); // FILE_Ultimo
        datoObjectFiles.push(datoObjectFile11); // FILE_Resolu
        datoObjectFiles.push(datoObjectFile12); // FILE_Roseta

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
        $scope.validadordocs = 0;
        if ($scope.datos.PER_TRA_REG_TRANS == undefined || $scope.datos.PER_TRA_REG_TRANS == 'undefined') {
            swal('', "Ingrese el tipo de solicitud", 'warning');
            $scope.validadordocs = 1;
        } else {
            if (($scope.datos.PER_TRA_REG_TRANS == 'OTRO' && $scope.datos.PER_CIR_MOTIVO == undefined) || ($scope.datos.PER_TRA_REG_TRANS == 'OTRO' && $scope.datos.PER_CIR_MOTIVO == 'undefined')) {
                swal('', "Ingrese el motivo del permiso a solicitar", 'warning');
                $scope.validadordocs = 1;
            } else {
                if ($scope.trmAutos.length == 0 ) {
                    swal('', "Ingrese al menos un vehículo", 'warning');
                    $scope.validadordocs = 1;
                } else {
                    if ($scope.datos.PER_TRA_NUM_CONTACTO == undefined || $scope.datos.PER_TRA_NUM_CONTACTO == 'undefined') {
                        swal('', "Ingrese al menos dos contactos alternativos", 'warning');
                        $scope.validadordocs = 1;
                    } else {
                        console.log("$scope.datos.FILE_Nota");
                        console.log($scope.datos.FILE_Nota);
                        if ($scope.datos.FILE_Nota == undefined || $scope.datos.FILE_Nota == 'undefined') {
                            swal('', "Adjuntar la  Nota dirigida al Lic. Enrique Gustavo Villanueva Gutierrez", 'warning');
                            $scope.validadordocs = 1;
                        } else {
                            if ($scope.datos.FILE_CeId == undefined || $scope.datos.FILE_CeId == 'undefined') {
                                swal('', "Adjuntar la Fotocopia de Cédula de Identidad vigente del solicitante o Representante Legal", 'warning');
                                $scope.validadordocs = 1;
                            } else {
                                //if ($scope.datos.FILE_Poder == undefined || $scope.datos.FILE_Poder == 'undefined') {
                                //    swal('', "Adjuntar el Poder Notariado que acredite las actuaciones del representante legal para efectuar trámites ante el G.A.M.L.P.  (Si corresponde)", 'warning');
                                //    $scope.validadordocs = 1;
                                //} else {
                                    //if ($scope.datos.FILE_Peren == undefined || $scope.datos.FILE_Peren == 'undefined') {
                                    //    swal('', "Adjuntar permiso Excepcional Vencido", 'warning');
                                    //    $scope.validadordocs = 1;
                                    //} else {
                                        //if ($scope.datos.FILE_Licencia == undefined || $scope.datos.FILE_Licencia == 'undefined') {
                                        //    swal('', "Adjuntar la Licencia de funcionamiento vigente en el caso de actividades económicas (Si corresponde)", 'warning');
                                        //    $scope.validadordocs = 1;
                                        //} else {
                                            if ($scope.datos.FILE_Certi == undefined || $scope.datos.FILE_Certi == 'undefined') {
                                                swal('', "Adjuntar el Certificado de propiedad de registro del vehículo automotor (RUAT Actualizado), con radicatoria en el municipio de La Paz", 'warning');
                                                $scope.validadordocs = 1;
                                            } else {
                                                //if ($scope.datos.FILE_Docpro == undefined || $scope.datos.FILE_Docpro == 'undefined') {
                                                //    swal('', "Adjuntar Documento que demuestre la vinculación de la persona natural o jurídica, pública o privada solicitante, con los vehículos motorizados, mismo que deberá incluir placas de circulación, nombre de los propietarios, cuando corresponda", 'warning');
                                                //    $scope.validadordocs = 1;
                                                //} else {
                                                    if ($scope.datos.FILE_Docseg == undefined || $scope.datos.FILE_Docseg == 'undefined') {
                                                        swal('', "Adjuntar Documento que acredite contar con el seguro obligatorio de accidentes de tránsito (SOAT actualizado), de servicio público vigente", 'warning');
                                                        $scope.validadordocs = 1;
                                                    } else {
                                                        if ($scope.datos.FILE_Cerdoc == undefined || $scope.datos.FILE_Cerdoc == 'undefined') {
                                                            swal('', "Adjuntar el Certificado o documento que acredite la última revisión técnica vehicular, otorgada por autoridad competente", 'warning');
                                                            $scope.validadordocs = 1;
                                                        } else {
                                                            if ($scope.datos.FILE_Ultimo == undefined || $scope.datos.FILE_Ultimo == 'undefined') {
                                                                swal('', "Adjuntar el Último pago de impuestos del vehículo, el solicitante no debe contar con deudas pendientes sobre los impuestos a la propiedad de vehículos, ni sanciones en materia de transporte urbano", 'warning');
                                                                $scope.validadordocs = 1;
                                                            } else {
                                                                //if ($scope.datos.FILE_Resolu == undefined || $scope.datos.FILE_Resolu == 'undefined') {
                                                                //    swal('', "Adjuntar la Resolución administrativa vigente emitida por la Autoridad Tributaria Municipal, de liberación de impuestos. (Si corresponde)", 'warning');
                                                                //    $scope.validadordocs = 1;
                                                                //} else {
                                                                    //if ($scope.datos.FILE_Roseta == undefined || $scope.datos.FILE_Roseta == 'undefined') {
                                                                    //    swal('', "Adjuntar la Roseta Ambiental Municipal", 'warning');
                                                                    //    $scope.validadordocs = 1;
                                                                    //} else {
                                                                           if($scope.datos.PER_TRA_REG_TRANS != 'OTRO'){
                                                                            $scope.datos.PER_CIR_MOTIVO = $scope.datos.PER_TRA_REG_TRANS;
                                                                        }else{
                                                                            $scope.datos.PER_CIR_MOTIVO = $scope.datos.PER_CIR_MOTIVO.toUpperCase();
                                                                        }
                                                                    //}
                                                                //}
                                                            }
                                                        }
                                                    }
                                                //}
                                            }
                                        //}
                                    //}
                                //}
                            }
                        }
                    }
                }   
            }
        }
        if($scope.lf == 0){
            var control = 0;
            switch ($scope.datos.PER_TRA_REG_TRANS) {
                case 'Instituciones Privadas':
                    control = 1;
                    break;
                case 'Particulares':
                    control = 1;
                    break;
                case 'Empresas Privadas de Transporte de Pasajeros (Constituidas como operadores)':
                    control = 1;
                    break;
                default:
                    break;
            }
            //if(control == 0){
            //    if ($scope.datos.FILE_Licencia == undefined || $scope.datos.FILE_Licencia == 'undefined') {
            //        swal('', "Adjunte la Fotocopia de Licencia de Funcionamiento Municipal", 'warning');
            //        $scope.validadordocs = 1;
            //    }
            //}
        }
        //if($scope.cer == 0){
        //  if ($scope.datos.FILE_Certi == undefined || $scope.datos.FILE_Certi == 'undefined') {
        //      swal('', "Adjunte el Certificación del Departamento de Control de Empresas Privadas de Vigilancia de la Policía Boliviana", 'warning');
        //      $scope.validadordocs = 1;
        //  }
        //}

        if($scope.validadordocs == 0){
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
        console.log(data);
        
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
        if (data == '' || data == undefined) {
            swal('', 'Agrege la informacion para adjuntar los vehículos', 'warning');
        } else if (data.tipo_vehiculo == '' || data.tipo_vehiculo == undefined) {
            swal('', 'Ingrese el Tipo de Vehículo', 'warning');
        } else if (data.placa == '' || data.placa == undefined) {
            swal('', 'Ingrese la placa del vehículo', 'warning');
        } else if (data.color == '' || data.color == undefined) {
            swal('', 'Ingrese la color del vehículo', 'warning');
        } else if (data.marca == '' || data.marca == undefined) {
            swal('', 'Ingrese la marca del vehículo', 'warning');
        } else if (data.clase == '' || data.clase == undefined) {
            swal('', 'Ingrese la clase del vehículo', 'warning');

        } else {

            if (data.marca == 'OTROS'){
                data.marca = data.marcaotros;
            }
            $("#valida1").hide();
            $("#valida").hide();
            $scope.datos.PER_TRA_CANT_VEHI_SOL = $scope.trmAutos.length;
            $scope.trmAutos.push(data);
            $scope.tblAutos.reload();
            $scope.datosV = {};
            $scope.datos.PER_TRA_CANT_VEHI_SOL = $scope.trmAutos.length;
            $scope.titulos($scope.trmAutos.length);
        }
    }
    
    $scope.eliminarVehiculo = function (datavehivulo) {
        $scope.trmAutos.splice($scope.trmAutos.indexOf(datavehivulo), 1);
        $scope.tblAutos.reload();
        $scope.datos.PER_TRA_CANT_VEHI_SOL = $scope.trmAutos.length;
        $scope.titulos($scope.trmAutos.length);
    }

    $scope.dinamicoFormulario = function (dataFormulario) {
        if (dataFormulario == undefined || dataFormulario == 'undefined') {
            swal('', "Ingrese el tipo de solicitud", 'warning');
        }else{
            $scope.trmAutos = [];
            $scope.datosV = {};
            $scope.tblAutos.reload();
            $scope.datos.PER_TRA_CANT_VEHI_SOL = $scope.trmAutos.length;
            var datosmov = dataFormulario.split('|');
            $scope.PER_nombre_empresa = '';
            $scope.tmov = datosmov[0];
            $scope.lf = datosmov[1];
            $scope.cer = datosmov[2];
            $scope.req_nom = datosmov[3];
            $scope.datos.PER_TRA_REG_TRANS = datosmov[4];
            if($scope.req_nom == 0){
            $scope.div_nombre_empresa = true;
            }else{
            $scope.div_nombre_empresa = false;
            }
            if($scope.tmov == 0){
                $scope.TMOV = true;
            }else{
                $scope.TMOV = false;
            }
            
            if($scope.datos.PER_TRA_REG_TRANS == 'Instituciones Privadas' || $scope.datos.PER_TRA_REG_TRANS == 'Particulares' || $scope.datos.PER_TRA_REG_TRANS == 'Empresas Privadas de Transporte de Pasajeros (Constituidas como operadores)'){
                $scope.LIC_FUN_SHOW_SW = true;
            }else{
                $scope.LIC_FUN_SHOW_SW = false;
            }
            
            if($scope.lf == 0){
                $scope.chk_act_eco= true;
                $scope.LIC_FUN_SHOW = true;
                if($scope.datos.PER_TRA_REG_TRANS != 'Particulares'){
                    $scope.div_empresa_show = true;
                }else{
                    $scope.div_empresa_show = false;
                }
            }else{
                $scope.chk_act_eco= false;
                $scope.LIC_FUN_SHOW = false;
                $scope.div_empresa_show = false;
            }
            if($scope.cer == 0){
            $scope.CERT_SEG_PRIV = true;
            }else{
            $scope.CERT_SEG_PRIV = false;
            }

            if($scope.datos.PER_TRA_REG_TRANS == 'Embajadas'){
            $("#placa").attr('maxlength','20');
            }else{
            $("#placa").attr('maxlength','7');
            }
        }

    }
    
    $scope.getComboMarcaMovilidad = function(){
        var marca = new marcaVehiculo();
        marca.combo_marca_v(function(results){
            results= JSON.parse(results);
            if(results!=null)
            {
                $scope.obtMarcaMovilidades =results.success.data;
            }
            else{
                $.unblockUI();
            }
        });
    };

    $scope.ocultadorRadios = function (data) {
        console.log("ocultadorRadios");
        console.log(data);
        if (data.PER_TRA_REG_TRANS == 'SALUD') {
            $scope.des_servicio_uno = false;
            $scope.des_servicio_dos = true;
            $scope.des_servicio_tres = true;
            $scope.des_servicio_cuatro = true;
            $scope.des_servicio_cinco = true;
            $scope.div_motivo = false;
        } else if (data.PER_TRA_REG_TRANS == 'VEHÍCULO OFICIAL') {
            $scope.des_servicio_uno = true;
            $scope.des_servicio_dos = false;
            $scope.des_servicio_tres = true;
            $scope.des_servicio_cuatro = true;
            $scope.des_servicio_cinco = true;
            $scope.div_motivo = false;
        } else if (data.PER_TRA_REG_TRANS == 'VIAJE') {
            $scope.des_servicio_uno = true;
            $scope.des_servicio_dos = true;
            $scope.des_servicio_tres = false;
            $scope.des_servicio_cuatro = true;
            $scope.des_servicio_cinco = true;
            $scope.div_motivo = false;
        } else if (data.PER_TRA_REG_TRANS == 'ACTIVIDAD ECONÓMICA') {
            $scope.des_servicio_uno = true;
            $scope.des_servicio_dos = true;
            $scope.des_servicio_tres = true;
            $scope.des_servicio_cuatro = false;
            $scope.des_servicio_cinco = true;
            $scope.div_motivo = false;
        } else {
            $scope.des_servicio_uno = true;
            $scope.des_servicio_dos = true;
            $scope.des_servicio_tres = true;
            $scope.des_servicio_cinco = true;
            $scope.des_servicio_cuatro = false;
            $scope.div_motivo = true;
        }
    }

    $scope.validaPlaca = function (campo) {
        $scope.validadorPlaca = 0;
        if($scope.datos.PER_TRA_REG_TRANS == 'Embajadas'){
          valPlaca = 0;
          $scope.validadorPlaca = 1;
          $("#valida1").hide();
          $("#valida").hide();
        }else{
          campo = campo.toUpperCase();
          emailRegex = /^[0-9]{3,4}[A-Z]{3}$/;
          if (emailRegex.test(campo)) {
              valPlaca = 0;
              $scope.validadorPlaca = 1;
              $("#valida1").show();
              $("#valida").hide();
          } else {
              $scope.validadorPlaca = 2;
              $("#valida1").hide();
              $("#valida").show();
              valPlaca = 1;
              $scope.desabilitaVeh = true;
          };
        }
    }
    $scope.titulos = function(campo){

        if (campo > 1){
            $scope.tituloNota = $scope.singular_Nota;
            $scope.tituloCeId = $scope.singular_CeId;
            $scope.tituloPoder = $scope.singular_Poder;
            $scope.tituloPeren = $scope.singular_Peren;
            $scope.tituloLicencia = $scope.singular_Licencia;
            $scope.tituloCerti = $scope.singular_Certi;
            $scope.tituloDocpro = $scope.singular_Docpro;
            $scope.tituloDocseg = $scope.singular_Docseg;
            $scope.tituloCerdoc = $scope.singular_Cerdoc;
            $scope.tituloUltimo = $scope.singular_Ultimo;
            $scope.tituloResolu = $scope.singular_Resolu;
            $scope.tituloRoseta = $scope.singular_Roseta;
            //$scope.tituloroseta = $scope.plural_roseta;
        }else{
            $scope.tituloNota = $scope.plural_Nota;
            $scope.tituloCeId = $scope.plural_CeId;
            $scope.tituloPoder = $scope.plural_Poder;
            $scope.tituloPeren = $scope.plural_Peren;
            $scope.tituloLicencia = $scope.plural_Licencia;
            $scope.tituloCerti = $scope.plural_Certi;
            $scope.tituloDocpro = $scope.plural_Docpro;
            $scope.tituloDocseg = $scope.plural_Docseg;
            $scope.tituloCerdoc = $scope.plural_Cerdoc;
            $scope.tituloUltimo = $scope.plural_Ultimo;
            $scope.tituloResolu = $scope.plural_Resolu;
            $scope.tituloRoseta = $scope.plural_Roseta;
            //$scope.tituloroseta = $scope.singular_roseta;
        }
    }
}
