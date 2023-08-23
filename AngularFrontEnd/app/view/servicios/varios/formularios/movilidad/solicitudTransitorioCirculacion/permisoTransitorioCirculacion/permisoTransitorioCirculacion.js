function permisoDeleveryController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, $timeout, obtFechaCorrecta, $route, obtFechaActual, fileUpload1) {
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
    $scope.tipoactividad = JSON.parse('[{"nombre": "EPSAS","lf": 0,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "DELAPAZ","lf": 0,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "LA PAZ LIMPIA","lf": 0,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "YPFB","lf": 0,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "Medios de comunicación","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Instituciones Públicas","lf": 1,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Instituciones Privadas","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Entidades Bancarias","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Funerarias","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Hoteles","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Empresas de Turismo","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Lineas Aéreas","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Empresas de seguridad privada","lf": 0,"cer": 0,"tmov": 1,"req_nom": 0},{"nombre": "Embajadas","lf": 1,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Empresas de Radio Taxis","lf": 0,"cer": 1,"tmov": 0,"req_nom": 0},{"nombre": "Sindicato de taxis(Constituidos como operadores)","lf": 1,"cer": 1,"tmov": 0,"req_nom": 0},{"nombre": "Sindicato COTRANSTUR","lf": 1,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "TERSA","lf": 0,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "Empresas Privadas de Transporte de Pasajeros (Constituidas como operadores)","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0},{"nombre": "Particulares","lf": 0,"cer": 1,"tmov": 1,"req_nom": 1},{"nombre": "Empresas de delivery","lf": 0,"cer": 1,"tmov": 1,"req_nom": 0}]');
    $scope.tipovehiculo_privado = {};
    $scope.tipovehiculo_privado = JSON.parse('[{"nombre":"AUTOMOVIL"},{"nombre":"MOTOCICLETA"}]');
    $scope.div_escoger_servicio = false;


    // requisitos de documentos adjuntos al formulario ******************************************************************************
    $scope.singular_Titulo = 'IMPORTANTE: Recuerde que la otorgación del permiso excepcional de circulación por el día del peatón y la Madre tierra está sujeto a análisis y solo se otorgarán en casos de emergencia relacionados a salud, traslado de y hacia el aeropuerto, vehículos oficiales y casos especiales debidamente justificados y respaldados. ';
    $scope.plural_Titulo = 'Adjunte los siguientes documentos para cada requisito en un solo archivo (En formato PDF o DOC)';

    $scope.singular_Nota = 'Nota dirigida al Lic. Enrique Gustavo Villanueva Gutierrez, Secretario Municipal de Movilidad, justificando las razones de la solicitud y adjuntando los respaldos correspondientes';
    $scope.singular_CeId = 'Fotocopia de Cédula de Identidad vigente del solicitante o representante legal, además adjuntar la fotocopia del conductor o los conductores en caso de que la solicitud sea para varios vehículos';
    $scope.singular_CerPropiedad = 'Fotocopia del Certificado de Propiedad de Registro del Vehículo Automotor CPRVA-03, con radicatoria en el Municipio de La Paz o radicatoria en los Municipios colindantes en caso de brindar un servicio interciudad';
    $scope.singular_tmov='Tarjeta Municipal de Operación Vehicular (T.M.O.V.) emitida al Servicio Público de Transporte Individual o Exclusivo de Pasajeros (Si corresponde)';
    $scope.singular_tic='Tarjeta de Identificación del Conductor (T.I.C.) emitida al Servicio de Transporte Individual o Exclusivo de Pasajeros (Si corresponde)';
    $scope.singular_Licencia = 'Fotocopia de Licencia de Funcionamiento Municipal vigente, para el caso entidades Bancarias, Medios de Comunicación, Líneas Aéreas, Empresas de Turismo, Hoteles, Empresas de Seguridad Privada, Funerarias y demás actividades económicas (Si corresponde)';
    $scope.singular_Certi = 'Certificación del Departamento de Control de Empresas Privadas de Vigilancia de la Policía Boliviana, para el caso de empresas de seguridad (Si corresponde)';
    $scope.singular_roseta = 'Roseta Ambiental emitida por la Secretaría Municipal de Gestión Ambiental y Energías Renovables';

    $scope.plural_Nota = 'Nota dirigida al Lic. Enrique Gustavo Villanueva Gutierrez, Secretario Municipal de Movilidad, justificando las razones de la solicitud y adjuntando los respaldos correspondientes';
    $scope.plural_CeId = 'Fotocopia de Cédula de Identidad vigente del solicitante o representante legal, además adjuntar la fotocopia del conductor o los conductores en caso de que la solicitud sea para varios vehículos';
    $scope.plural_CerPropiedad = 'Fotocopia del Certificado de Propiedad de Registro del Vehículo Automotor CPRVA-03, con radicatoria en el Municipio de La Paz o radicatoria en los Municipios colindantes en caso de brindar un servicio interciudad';
    $scope.plural_tmov='Tarjeta Municipal de Operación Vehicular (T.M.O.V.) emitida al Servicio Público de Transporte Individual o Exclusivo de Pasajeros (Si corresponde)';
    $scope.plural_tic='Tarjeta de Identificación del Conductor (T.I.C.) emitida al Servicio de Transporte Individual o Exclusivo de Pasajeros (Si corresponde)';
    $scope.plural_Licencia = 'Fotocopia de Licencia de Funcionamiento Municipal vigente, para el caso entidades Bancarias, Medios de Comunicación, Líneas Aéreas, Empresas de Turismo, Hoteles, Empresas de Seguridad Privada, Funerarias y demás actividades económicas (Si corresponde)';
    $scope.plural_Certi = 'Certificación del Departamento de Control de Empresas Privadas de Vigilancia de la Policía Boliviana, para el caso de empresas de seguridad (Si corresponde)';
    $scope.plural_roseta = 'Roseta Ambiental emitida por la Secretaría Municipal de Gestión Ambiental y Energías Renovables';
    
    /*
    $scope.singular_Respaldo = 'ADJUNTAR RESPALDO DEL MOTIVO DE LA SOLICITUD';
    $scope.singular_Soat = 'ADJUNTE EL DOCUMENTO DEL SOAT ';
    $scope.singular_Ruat = 'ADJUNTE EL DOCUMENTO DEL RUAT';
    $scope.singular_Licencias = 'ADJUNTE SU LICENCIA DE CONDUCIR';

    $scope.plural_Respaldo = 'ADJUNTAR RESPALDO DEL MOTIVO DE LA SOLICITUD';
    $scope.plural_Soat = 'ADJUNTE EN UN SOLO DOCUMENTO EL SOAT DE TODOS VEHÍCULOS';
    $scope.plural_Ruat = 'ADJUNTE EN UN SOLO DOCUMENTO EL RUAT DE TODOS VEHÍCULOS';
    $scope.plural_Licencias = 'ADJUNTE EN UN SOLO DOCUMENTO LAS LICENCIAS DE LOS CONDUCTORES';

    $scope.tituloRespaldo =  $scope.singular_Respaldo;
    $scope.tituloSOAT =  $scope.singular_Soat;
    $scope.tituloRUAT = $scope.singular_Ruat;
    $scope.tituloLicencias = $scope.singular_Licencias;
    */
    $scope.tituloNota = $scope.singular_Nota;
    $scope.tituloCerPropiedad = $scope.singular_CerPropiedad;
    $scope.tituloCeId = $scope.singular_CeId;
    $scope.tituloLicencia = $scope.singular_Licencia;
    $scope.tituloCerti = $scope.singular_Certi;

    $scope.titulotmov = $scope.plural_tmov;
    $scope.titulotic = $scope.plural_tic;
    $scope.tituloroseta = $scope.plural_roseta;
    

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
                    text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2><br>“EN CASO DE QUE SU SOLICITUD SE APRUEBE, LE LLEGARÁ A SU BANDEJA DE NOTIFICACIONES EN IGOB EN ENLACE PARA QUE PUEDA DESCARGAR E IMPRIMIR EL PERMISO DE CIRCULACIÓN. EN CASO DE QUE SU SOLICITUD SEA RECHAZADA SE LE ENVIARÁ A SU BANDEJA DE NOTIFICACIONES EN IGOB LA RAZÓN DEL RECHAZO DE TRÁMITE. <br> SU SOLICITUD SERA ATENDIDA EN UN PLAZO DE 2 DÍAS HÁBILES”',
                    html: true,
                    type: 'success',
                },function(isConfirm){
                    console.log("isConfirm");
                    console.log(isConfirm);
                    if (isConfirm) {
                        var currentLocation = window.location;
                        var hrdato =  currentLocation.href
                        const hrdatos = hrdato.split("#");
                        var htldata = hrdatos[0]+"#servicios|varios|index.html?url=\'app/view/servicios/varios/formularios/movilidad/solicitudTransitorioCirculacion/solicitudTransitorioCirculacion.html\'";
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
                        console.log(objarchivo);
                        console.log(uploadUrl);
                        console.log(nombreNuevo);
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo); // error  yvan 
                        $scope.datos.FILE_Nota = nombreNuevo;
                        $scope.FILE_Nota = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover11 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_Nota = nombreNuevo;
                            $scope.FILE_Nota = blobcir;
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
                        $scope.datos.FILE_Nota = "";
                        $scope.FILE_Nota = "";
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
            if (nombre == 'FILE_CerPropiedad' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_CerPropiedad = nombreNuevo;
                        $scope.FILE_CerPropiedad = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover4 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_CerPropiedad = nombreNuevo;
                            $scope.FILE_CerPropiedad = blobcir;
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
                        $scope.datos.FILE_CerPropiedad = "";
                        $scope.FILE_CerPropiedad = "";
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
                        $scope.btover3 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_CeId = nombreNuevo;
                            $scope.FILE_CeId = blobcir;
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
                        $scope.datos.FILE_CeId = "";
                        $scope.FILE_CeId = "";
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
            if (nombre == 'FILE_TMOV' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_TMOV = nombreNuevo;
                        $scope.FILE_TMOV = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover5 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_TMOV = nombreNuevo;
                            $scope.FILE_TMOV = blobcir;
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
                        $scope.datos.FILE_TMOV = "";
                        $scope.FILE_TMOV = "";
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
            if (nombre == 'FILE_TIC' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_TIC = nombreNuevo;
                        $scope.FILE_TIC = objarchivo;
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover9 = "mostrar";
                    } else if (objarchivo.size > 1000000 && objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_TIC = nombreNuevo;
                            $scope.FILE_TIC = blobcir;
                            $scope.btover9 = "mostrar";
                        });
                        $.unblockUI();
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_TIC = "";
                        $scope.FILE_TIC = "";
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
                        $scope.btover6 = "mostrar";
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
                                $scope.btover6 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Licencia = nombreNuevo;
                                $scope.FILE_Licencia = blobcir;
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
                        $scope.datos.FILE_Licencia = "";
                        $scope.FILE_Licencia = "";
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
                        $scope.btover7 = "mostrar";
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
                                $scope.btover7 = "mostrar";
                            });
                        } else {
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_Certi = nombreNuevo;
                                $scope.FILE_Certi = blobcir;
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
                        $scope.datos.FILE_Certi = "";
                        $scope.FILE_Certi = "";
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

            if (nombre == 'FILE_roseta' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_roseta = nombreNuevo;
                        $scope.FILE_roseta = objarchivo;
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
                                $scope.datos.FILE_roseta = nombreNuevo;
                                $scope.FILE_roseta = respuesta_compres;
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
                                $scope.datos.FILE_roseta = nombreNuevo;
                                $scope.FILE_roseta = blobcir;
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
                        $scope.datos.FILE_roseta = "";
                        $scope.FILE_roseta = "";
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
            
            /*
            if (nombre == 'FILE_imagen' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (arraydoc.indexOf(ext_doc) >= 0) {
                    if (objarchivo.size <= 1000000) {
                        var nombreNuevo = nombre + '_mov_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_imagen = nombreNuevo;
                        $scope.FILE_imagen = objarchivo;
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
                                $scope.datos.FILE_imagen = nombreNuevo;
                                $scope.FILE_imagen = respuesta_compres;
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
                                $scope.datos.FILE_imagen = nombreNuevo;
                                $scope.FILE_imagen = blobcir;
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
                        $scope.datos.FILE_imagen = "";
                        $scope.FILE_imagen = "";
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
            */
            


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
        
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;

            
        datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Nota + "?app_name=todoangular";
        datoObjectFile1.campo = $scope.datos.FILE_Nota;
        datoObjectFile1.nombre = $scope.tituloNota;

        datoObjectFile2.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_CerPropiedad + "?app_name=todoangular";
        datoObjectFile2.campo = $scope.datos.FILE_CerPropiedad;
        datoObjectFile2.nombre = $scope.tituloCerPropiedad;

        datoObjectFile3.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_CeId + "?app_name=todoangular";
        datoObjectFile3.campo = $scope.datos.FILE_CeId;
        datoObjectFile3.nombre = $scope.tituloCeId;

        datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_TMOV + "?app_name=todoangular";
        datoObjectFile4.campo = $scope.datos.FILE_TMOV;
        datoObjectFile4.nombre = $scope.titulotmov;

        datoObjectFile5.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_TIC + "?app_name=todoangular";
        datoObjectFile5.campo = $scope.datos.FILE_TIC;
        datoObjectFile5.nombre = $scope.titulotic;

        datoObjectFile6.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Licencia + "?app_name=todoangular";
        datoObjectFile6.campo = $scope.datos.FILE_Licencia;
        datoObjectFile6.nombre = $scope.tituloLicencia;

        datoObjectFile7.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_Certi + "?app_name=todoangular";
        datoObjectFile7.campo = $scope.datos.FILE_Certi;
        datoObjectFile7.nombre = $scope.tituloCerti;

        datoObjectFile8.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_roseta + "?app_name=todoangular";
        datoObjectFile8.campo = $scope.datos.FILE_roseta;
        datoObjectFile8.nombre = $scope.tituloroseta;
        
        datoObjectFiles.push(datoObjectFile1); // FILE_Nota
        datoObjectFiles.push(datoObjectFile2); //FILE_CerPropiedad
        datoObjectFiles.push(datoObjectFile3); // FILE_CeId

        if($scope.TMOV){
            datoObjectFiles.push(datoObjectFile4); // FILE_TMOV
            datoObjectFiles.push(datoObjectFile5); // FILE_TIC
        }
        if($scope.LIC_FUN_SHOW){
            datoObjectFiles.push(datoObjectFile6); // FILE_Licencia
        }
        if($scope.CERT_SEG_PRIV){
            datoObjectFiles.push(datoObjectFile7); // FILE_Certi
        }
        datoObjectFiles.push(datoObjectFile8); // FILE_roseta
        
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
                        if ($scope.datos.FILE_Nota == undefined || $scope.datos.FILE_Nota == 'undefined') {
                            swal('', "Ajunte la  Nota dirigida al Lic. Enrique Gustavo Villanueva Gutierrez", 'warning');
                            $scope.validadordocs = 1;
                        } else {
                            if ($scope.datos.FILE_CerPropiedad == undefined || $scope.datos.FILE_CerPropiedad == 'undefined') {
                                swal('', "Ajunte la Fotocopia del Certificado de Propiedad de Registro del Vehículo Automotor CPRVA-03", 'warning');
                                $scope.validadordocs = 1;
                            } else {
                                if ($scope.datos.FILE_roseta == undefined || $scope.datos.FILE_roseta == 'undefined') {
                                    swal('', "Roseta Ambiental emitida por la Secretaría Municipal de Gestión Ambiental y Energías Renovables", 'warning');
                                    $scope.validadordocs = 1;
                                } else {
                                    if ($scope.datos.FILE_CeId == undefined || $scope.datos.FILE_CeId == 'undefined') {
                                        swal('', "Ajunte la Fotocopia de Cédula de Identidad vigente del solicitante o Representante Legal", 'warning');
                                        $scope.validadordocs = 1;
                                    } else {
                                        if($scope.datos.PER_TRA_REG_TRANS != 'OTRO'){
                                            $scope.datos.PER_CIR_MOTIVO = $scope.datos.PER_TRA_REG_TRANS;
                                        }else{
                                            $scope.datos.PER_CIR_MOTIVO = $scope.datos.PER_CIR_MOTIVO.toUpperCase();
                                        }
                                    }
                                }
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
            if(control == 0){
                if ($scope.datos.FILE_Licencia == undefined || $scope.datos.FILE_Licencia == 'undefined') {
                    swal('', "Adjunte la Fotocopia de Licencia de Funcionamiento Municipal", 'warning');
                    $scope.validadordocs = 1;
                }
            }
        }
        if($scope.cer == 0){
          if ($scope.datos.FILE_Certi == undefined || $scope.datos.FILE_Certi == 'undefined') {
              swal('', "Adjunte el Certificación del Departamento de Control de Empresas Privadas de Vigilancia de la Policía Boliviana", 'warning');
              $scope.validadordocs = 1;
          }
        }
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
        } else if (data.nombre == '' || data.nombre == undefined) {
            swal('', 'Ingrese el Nombre', 'warning');
        } else if (data.ape_primer == '' || data.ape_primer == undefined) {
            swal('', 'Ingrese el Primer Apellido', 'warning');
        //} else if (data.ape_segundo == '' || data.ape_segundo == undefined) {
        //    swal('', 'Ingrese el Segundo Apellido', 'warning');
        } else if (data.CI == '' || data.CI == undefined) {
            swal('', 'Ingrese el Numero de Carnet', 'warning');
        } else if (data.cat_licencia == '' || data.cat_licencia == undefined) {
            swal('', 'Ingrese la Categoria de Licencia', 'warning');
        } else if ($scope.validadorPlaca != 1) {
            swal('', 'La Placa es incorrecta', 'warning');
        //} else if (data.FILE_imagen == undefined || data.FILE_imagen == 'undefined') {
        //    swal('', "Ajunte el Certificadod e Propiedad", 'warning');
        } else {
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
            /*
            $scope.tituloRespaldo =  $scope.plural_Respaldo;
            $scope.tituloSOAT =  $scope.plural_Soat;
            $scope.tituloRUAT = $scope.plural_Ruat;
            $scope.tituloLicencias = $scope.plural_Licencias;
            $scope.tituloPrincipal = $scope.plural_Titulo;
            */
            $scope.tituloNota = $scope.plural_Nota;
            $scope.tituloCeId = $scope.plural_CeId;
            $scope.tituloCerPropiedad = $scope.plural_CerPropiedad;
            $scope.titulotmov = $scope.plural_tmov;
            $scope.titulotic = $scope.plural_tic;
            $scope.tituloLicencia = $scope.plural_Licencia;
            $scope.tituloCerti = $scope.plural_Certi;
            $scope.tituloroseta = $scope.plural_roseta;
        }else{
            $scope.tituloNota = $scope.singular_Nota;
            $scope.tituloCeId = $scope.singular_CeId;
            $scope.tituloCerPropiedad = $scope.singular_CerPropiedad;
            $scope.titulotmov = $scope.singular_tmov;
            $scope.titulotic = $scope.singular_tic;
            $scope.tituloLicencia = $scope.singular_Licencia;
            $scope.tituloCerti = $scope.singular_Certi;
            $scope.tituloroseta = $scope.plural_roseta;
            /*
            $scope.tituloRespaldo =  $scope.singular_Respaldo;
            $scope.tituloSOAT =  $scope.singular_Soat;
            $scope.tituloRUAT = $scope.singular_Ruat;
            $scope.tituloLicencias = $scope.singular_Licencias;
            $scope.tituloPrincipal = $scope.singular_Titulo;
            */
        }
    }
}
