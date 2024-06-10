function recepcionEmpresasController($scope,sessionService,ngTableParams,$filter,CONFIG,fileUpload1) {
    $scope.tablaTramites = {};
    $scope.tramitesUsuario = [];
    $scope.mostrarFormulario = false;
    $scope.idProceso = 46;
    $scope.btnEnviarFormLinea = true;
    $scope.botones = '';
    $scope.fechaActual = '';
    $scope.fechaActualServidor = '';
    $scope.mes = '';
    $scope.fechaInicio = '';
    $scope.urlConstancia = '';
    $scope.inicio = function(){
        try {
            var fechaserver = new fechaHoraServer(); 
            fechaserver.fechahora(function(resp){
                var sfecha = JSON.parse(resp);
                var fechaServ = (sfecha.success.fecha).split(' ');
                var fecha_ = fechaServ[0].split('-');
                var dia = fecha_[2];
                var mes = fecha_[1];
                if(parseInt(fecha_[2])<10){
                    dia = "0" + fecha_[2];
                }
                if(parseInt(fecha_[1])<10){
                    mes = "0" + fecha_[1];
                }
                $scope.fechaA = dia+"-"+mes+"-"+fecha_[0];
               // var fechaInicioRectificacion = "10-" + data.RECEP_MES_SOL +"-"+data.RECEP_GESTION_SOL;

                $scope.fechaActualServidor = new Date(fechaServ[0]);
                $scope.tramitesCiudadano();
                iniciarLoadFyle();
            })
        } catch (error) {
            console.log("error",error);
            swal('Advertencia', 'Ocurrio un error, reintente mas tarde por favor', 'error');
        }
    }

    $scope.tramitesCiudadano = function () {
        sIdCiudadano = sessionService.get('IDSOLICITANTE');
        try {
            var rData = new rcTramitesAtmId();
            rData.sidciudadano = sIdCiudadano;
            rData.idTramite    = $scope.idProceso;
            rData.obtTramitesAtmId(function (res) {
                r = JSON.parse(res);
                results = r.success;
                angular.forEach(results, function (val, index) {
                    if (val['form_contenido']) {
                        results[index].datos = JSON.parse(val['form_contenido']);
                    }
                });
                $scope.tramitesUsuario = results;
                angular.forEach($scope.tramitesUsuario, function (val, index) {
                    if(val.datos.RECEP_TIPO == 'ORIGINAL'){
                        if($scope.fechaActualServidor < new Date(val.datos.RECEP_FIN_RECTIFICACION)){
                            $scope.tramitesUsuario[index].datos.RECEP_HAB_RECTIFICACION = true;
                        }else{
                            $scope.tramitesUsuario[index].datos.RECEP_HAB_RECTIFICACION = false;
                        }
                    }
                });
                var data = results;
                $scope.tablaTramites.reload();
            });
        } catch (error) {
            console.log("error",error);
        }
    };

    $scope.tablaTramites = new ngTableParams({
        page: 1,
        count: 4,
        filter: {},
        sorting: {
            vtra_id: 'desc'
        }
    }, { 
        total: $scope.tramitesUsuario.length,
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.tramitesUsuario, params.filter()) :
                $scope.tramitesUsuario;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.tramitesUsuario;
            params.total($scope.tramitesUsuario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.crearTramite = function(){
        var idCiudadano = sessionService.get('IDUSUARIO');
        $scope.habGuardar1 = true;
        $scope.datosIniciales = "";
        var datosForm = {};
        var sTipoPersona = "";
        $scope.desabilita = false;
        var recuperarDatos = new rcNatural();
        recuperarDatos.oid = idCiudadano;
        try{
            recuperarDatos.datosCiudadanoNatural(function (resultado) {
                var fechaserver = new fechaHoraServer(); 
                fechaserver.fechahora(function(resp){
                    var sfecha = JSON.parse(resp);
                    var fechaServ = (sfecha.success.fecha).split(' ');
                    var fecha_ = fechaServ[0].split('-');
                    var dia = fecha_[2];
                    var mes = fecha_[1];
                    var mesN = parseInt(fecha_[1])-1;
                    $scope.fechaActual = dia+"/"+mes+"/"+fecha_[0];
                    $scope.horaActual = fechaServ[1];
                    switch (mesN) {
                        case 0:
                            $scope.mes = "DICIEMBRE";
                            break;
                        case 1:
                            $scope.mes = "ENERO";
                            break;
                        case 2:
                            $scope.mes = "FEBRERO";
                            break;
                        case 3:
                            $scope.mes = "MARZO";
                            break;
                        case 4:
                            $scope.mes = "ABRIL";
                            break;
                        case 5:
                            $scope.mes = "MAYO";
                            break;
                        case 6:
                            $scope.mes = "JUNIO";
                            break;
                        case 7:
                            $scope.mes = "JULIO";
                            break;
                        case 8:
                            $scope.mes = "AGOSTO";
                            break;
                        case 9:
                            $scope.mes = "SEPTIEMBRE";
                            break;
                        case 10:
                            $scope.mes = "OCTUBRE";
                            break;
                        case 11:
                            $scope.mes = "NOVIEMBRE";
                            break;
                        case 12:
                            $scope.mes = "DICIEMBRE";
                            break;
                        default:
                            $scope.mes = "";
                            break;
                    };
                    resultadoApi = JSON.parse(resultado);
                    var data = resultadoApi[0];
                    $scope.datos = {};
                    if(data.dtspsl_tipo_persona == 'JURIDICO'){
                        $scope.datos.RECEP_OID = data._id;
                        $scope.datos.RECEP_NIT = data.dtspsl_nit;
                        $scope.datos.RECEP_RAZON_SOCIAL = data.dtspsl_razon_social;
                        $scope.datos.RECEP_PODER = data.dtspsl_poder_replegal;
                        $scope.datos.RECEP_NRO_NOTARIA = data.dtspsl_nro_notaria;
                        $scope.datos.RECEP_ID_MACRO = data.dtspsl_macrodistrito;
                        $scope.datos.RECEP_MACRO = data.dtspsl_macrodistrito_desc;
                        $scope.datos.RECEP_ID_DISTRITO = data.dtspsl_distrito;
                        $scope.datos.RECEP_DISTRITO = data.dtspsl_distrito_desc;
                        $scope.datos.RECEP_ID_ZONA = data.dtspsl_zona;
                        $scope.datos.RECEP_ZONA = data.dtspsl_zona_desc;
                        $scope.datos.RECEP_TIPO_VIA = data.dtspsl_tipo_via;
                        $scope.datos.RECEP_NOMBRE_VIA = data.dtspsl_nombre_via;
                        $scope.datos.RECEP_NRO_PUERTA = data.dtspsl_numero_casa;
                        $scope.datos.RECEP_MES_DECLARACION = $scope.mes;
                        $scope.datos.RECEP_FECHA_ACTUAL = $scope.fechaActual;
                        $scope.datos.RECEP_HORA_ACTUAL = $scope.horaActual;
                        $scope.datos.RECEP_GESTION_SOL = fecha_[0];  
                        $scope.datos.RECEP_MES_SOL = fecha_[1];                      
                        $scope.datos.RECEP_TIPO_SOL = "RECEPCIÓN DE DOCUMENTOS ORIGINAL";                        
                        $scope.datos.RECEP_TIPO = "ORIGINAL";        
                        if (data.dtspsl_ci_representante != null && data.dtspsl_ci_representante != "") {
                            try {
                                var buscarRepresentante = new rcNatural();
                                buscarRepresentante.tipo_persona = "NATURAL";
                                buscarRepresentante.ci = data.dtspsl_ci_representante;
                                buscarRepresentante.buscarPersona(function (resultado) {
                                    var resultadoApiRepre = JSON.parse(resultado);
                                    var repLegalmongo = resultadoApiRepre;
                                    $scope.datos.RECEP_OID_REP = repLegalmongo[0]._id;
                                    $scope.datos.RECEP_NOMBRE_REP = ((typeof (repLegalmongo[0].dtspsl_nombres) == 'undefined') ? "" : repLegalmongo[0].dtspsl_nombres);
                                    $scope.datos.RECEP_PRIM_APE_REP = ((typeof (repLegalmongo[0].dtspsl_paterno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_paterno);
                                    $scope.datos.RECEP_SEG_APE_REP = ((typeof (repLegalmongo[0].dtspsl_materno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_materno);
                                    $scope.datos.RECEP_CAS_APE_REP = ((typeof (repLegalmongo[0].dtspsl_tercer_apellido) == 'undefined') ? "" : repLegalmongo[0].dtspsl_tercer_apellido);
                                    $scope.datos.RECEP_DOC_REP = repLegalmongo[0].dtspsl_ci;
                                    $scope.datos.RECEP_DOC_EXP_REP = repLegalmongo[0].dtspsl_expedido;
                                    if(data.dtspsl_activaciond == 'SI' && data.dtspsl_activacionf == 'SI'){
                                        var dataInicio = {};
                                        var fecha = new Date();
                                        var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                                        var sIdServicio = $scope.idProceso;
                                        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
                                        var sFechaTramite = fechactual;
                                        dataInicio.INT_FORM_ALMACENADO = 'C';
                                        var datosSerializados = JSON.stringify($scope.datos);
                                        try {
                                            var verificacion = new buscarAgentes();
                                            verificacion.oid =  $scope.datos.RECEP_OID;
                                            verificacion.mes = $scope.datos.RECEP_MES_DECLARACION;
                                            verificacion.gestion = $scope.datos.RECEP_GESTION_SOL;
                                            verificacion.buscarRegistroAgentes(function (results) {
                                                var respuesta = JSON.parse(results);
                                                if(respuesta.success[0].sp_buscar_solicitudes_agentes == 0){
                                                    var crea = new adicionaTramitesFormulario();
                                                    crea.frm_tra_fecha = sFechaTramite;
                                                    crea.frm_tra_enviado = "NO";
                                                    crea.frm_tra_registrado = fechactual;
                                                    crea.frm_tra_modificado = fechactual;
                                                    crea.id_servicio = sIdServicio;
                                                    crea.data_json = datosSerializados;
                                                    crea.oid_ciudadano = sIdCiudadano;
                                                    crea.id_usuario = 3;
                                                    crea.adiciona_Tramites_Formulario(function (res) {
                                                        x = JSON.parse(res);
                                                        response = x.success;
                                                        if (response.length > 0) {
                                                            sessionService.set('IDTRAMITE',response[0].sp_insertar_formulario_tramites_datos);
                                                            $scope.datos.RECEP_ID_SOLICITUD = response[0].sp_insertar_formulario_tramites_datos;
                                                            $scope.mostrarFormulario = true;
                                                            $scope.botones = '';
                                                            $scope.getCaptchasXX();
                                                            /*setTimeout(function(){
                                                                iniciarLoadFyle();
                                                            }, 1000);*/
                                                            $.unblockUI();
                                                            alertify.success('Tramite creado correctamente');
                                                            $scope.tramitesCiudadano();
                                                        }
                                                        else {
                                                        }
                                                    });
                                                }
                                                else{
                                                    swal('Estimado ciudadano', "Ya inicio su declaración mensual del mes "+  $scope.datos.RECEP_MES_DECLARACION +".", 'warning');
                                                }
                                            })
                                           
                                        } catch (e) {
                                        }
                                    }else{
                                        swal('Advertencia', 'Debe realizar su activacion fisica y digital', 'error');
                                    }
                                });
                            } catch (e) {
                                console.log("error",e);
                                swal('Advertencia', 'No tiene registrado a su representante legal', 'error');
                            }
                        }else{
                            swal('Advertencia', 'Ocurrio un error, reintente mas tarde por favor', 'error'); 
                        }
                    }else{
                        swal('Advertencia', 'El tramite solo esta habilitado para personas juridicas', 'error');
                    }
                });
            })
        }catch(error){
            console.log("error",error);

        }
    }

    /*******************************SUBIR ADJUNTOS******************************/
    $scope.ejecutarFile = function(idfile){
        var sid =   document.getElementById(idfile);
        if(sid){
            document.getElementById(idfile).click();
        }else{
            alert("Error ");
        }
    };

    $scope.cambiarFile = function(obj, valor){
        $scope.datos[obj.name] = valor;
        $scope.almacenarDeclaracion(obj.files[0]);
    };

    $scope.almacenarDeclaracion = function (archivo) {
        $scope.datos.validacionDocumento = "";
        var descDoc = "";
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function (resp) {
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = '_' + hora_[0] + hora_[1];
        });
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');  
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        $.blockUI();
        if (typeof (archivo) != 'undefined') {
            var imagenNueva = archivo.name.split('.');
            if(imagenNueva[imagenNueva.length-1] =='CSV' || imagenNueva[imagenNueva.length-1] =='csv'){
                var nombreFileN = imagenNueva[0] + fechaNueva + '.' + imagenNueva[1];
                if (archivo.size <= 500000) {
                    if (imagenNueva[imagenNueva.length-1] =='CSV' || imagenNueva[imagenNueva.length-1] =='csv') {
                        $scope.datos.declaracion_mensual_url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + nombreFileN + "?app_name=todoangular";
                        fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                        $scope.datos.declaracion_mensual = nombreFileN;
                        try{
                            var settings = {
                                "url":  CONFIG.CONEXION_ARCHIVOS + "verifica_archivo_csv.php",
                                "method": "POST",
                                "timeout": 0,
                                "headers": {
                                "Content-Type": "application/json"
                                },
                                "data": JSON.stringify({
                                "url": $scope.datos.declaracion_mensual_url
                                }),
                            };
                            $.ajax(settings).done(function (response) {
                                var resp = JSON.parse(response);
                                if(resp.respuesta != undefined){
                                    $scope.datos.validacionDocumento = resp.respuesta;
                                    if(resp.respuesta == false){
                                        swal('Error',resp.mensaje, 'error');
                                    }
                                }
                            });
                        }catch(error){
                            console.log("error",error);

                        }
                        $.unblockUI();
                    }
                    else {
                        swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo CSV', 'error');
                        $.unblockUI();
                    };
                }
                else {
                    swal('Advertencia', 'El tamaño del archivo es muy grande', 'error');
                    $.unblockUI();
                }
            }else{
                swal('Advertencia', 'El formato del archivo no es el correcto, debe subir un archivo en formato CSV', 'error');
                $.unblockUI();
            }
        } else {
            swal('Advertencia', 'No se adjunto ningun archivo', 'error');
            $.unblockUI();
        }
    };

    /*************************************CAPTCHA*****************************/
    $scope.getCaptchasXX = function () {
        $("#resultadoCC").val("");
        $scope.habGuardar1 = true;
        $scope.validarAdjuntos = true;
        $scope.ErrorCapchasXX = "";
        $scope.SuccesCapchasxx = "";
        $scope.valorrandomm = Math.floor(Math.random() * (224 - 1) + 1);
        $scope.resultadoCC = "";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function (resultado) {
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero1 = partes[0].substring(1);
            i1 = (partes[2] + "," + partes[3]);
            i2 = (partes[4] + "," + partes[5]);
            $scope.imageLNGG = i1.substring(1, i1.length - 1);
            $scope.imageCSTT = i2.substring(1, i2.length - 2);
            var lengua = "";
            if (partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if (partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if (partes[1] == 'G') {
                lengua = 'GUARANI';
            } else if (partes[1] == 'C') {
                lengua = 'CASTELLANO';
            } else {
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };

    $scope.VerificarCapchaa = function (datos) {
        var captch = $("#resultadoCC").val();
        if (captch.length == 0)
            $scope.ErrorCapchasXX = "";
        if (captch.length > 3) {
            clearTimeout(tiemporespuesta);
            tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1500);
        }
    };

    var tiemporespuesta = null;
    function verificarKeyPress(captch) {
        var id = numero1;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function (resultado) {
            json = JSON.parse(resultado);
            var nroregsitros = json.success.length;
            if (nroregsitros == 0) {
                $scope.habGuardar1 = true;
                $scope.ErrorCapchasXX = "Verifique el Capcha";
                $scope.SuccesCapchasxx = "";
                $scope.$apply();
            } else {
                $scope.habGuardar1 = false;
                $scope.ErrorCapchasXX = "";
                $scope.SuccesCapchasxx = "Capcha correcto";
                $("#miFormGuardar").removeAttr("disabled");
                $scope.$apply();
            }
        });
    }

    /************************************SELECCIONAR TRAMITE*********************************/
    $scope.seleccionarTramite = function (tramite) {
        sessionService.set('IDTRAMITE',tramite.vtra_id);
        $scope.datos = JSON.parse(tramite.form_contenido);
        $scope.datos.RECEP_ID_SOLICITUD = tramite.vtra_id;
        $scope.mostrarFormulario = true;
        if(tramite.venviado == 'SI'){
            $scope.botones = null;
            $scope.desabilita = true;
        }else{
            $scope.getCaptchasXX();
            $scope.botones = '';
            $scope.desabilita = false;
        }
    };
    /**********************************GUARDAR INFORMACION***********************************/
    $scope.guardarInformacion = function (data) {
        if (data.declaracion_mensual_url == undefined || data.declaracion_mensual_url == '' ) {
            swal('Estimado ciudadano', "Debe adjuntar el documento de declaración mensual", 'warning');
        }else if(data.validacionDocumento != true){
            swal('Estimado ciudadano', "El documento adjunto no es valido", 'error');
        }
        else{
            $.blockUI();
            try {
                var fechaInicioRectificacion = data.RECEP_GESTION_SOL + "/" + data.RECEP_MES_SOL + "/10";
                var fechaFinRectificacion = new Date(fechaInicioRectificacion);
                fechaFinRectificacion.setDate(fechaFinRectificacion.getDate() + 30);
                data.RECEP_INICIO_RECTIFICACION = new Date(fechaInicioRectificacion);
                data.RECEP_FIN_RECTIFICACION = fechaFinRectificacion;  
                var datosSerializados = JSON.stringify(data);
                var idCiudadano = sessionService.get('IDSOLICITANTE');
                var idTramite = sessionService.get('IDTRAMITE');
                var idServicio =  $scope.idProceso;
                var verificacion = new buscarAgentes();
                verificacion.oid = data.RECEP_OID;
                verificacion.mes = data.RECEP_MES_DECLARACION;
                verificacion.gestion = data.RECEP_GESTION_SOL;
                verificacion.buscarRegistroAgentes(function (results) {
                    var resp = JSON.parse(results);
                    if(resp.success[0].sp_buscar_solicitudes_agentes == 1 || data.RECEP_TIPO == 'RECTIFICADO'){
                        var Parametros = new datosFormularios();
                        Parametros.frm_tra_dvser_id = idServicio;
                        Parametros.data_json = datosSerializados;
                        Parametros.frm_tra_id_ciudadano = idCiudadano;
                        Parametros.frm_tra_id_usuario = 1;
                        Parametros.frm_idTramite = idTramite;
                        $scope.habGuardar1 = true;
                        Parametros.sp_crear_datos_formulario(function (results) {
                            results = JSON.parse(results);
                            results = results.success;
                            if (results.length > 0) {
                                if(results[0].id_frm_data != undefined){
                                    $scope.desabilita = true;
                                    $scope.btnEnviarFormLinea    =   false; 
                                }else{
                                    $scope.btnEnviarFormLinea    =   true;
                                }
                                $.unblockUI();
                                swal('', "Formulario almacenado", 'success');
                            } else {
                                $.unblockUI();
                                swal('', "Formulario no almacenado", 'error');
                            }
                        });
                    }else{
                        swal('Estimado ciudadano', "Ya realizo su declaracion mensual del mes "+ data.RECEP_MES_DECLARACION +", si se encuentra dentro del plazo puede realizar su rectificación", 'warning');
                        $.unblockUI();
                        $scope.mostrarFormulario = false;
                    }
                })
            } catch (e) {
                console.log("error",e);
                $scope.btnGuardarForm = false;
                $.unblockUI();
            }
        }
    };

    /**************************************ENVIAR INFORMACION********************************/
    $scope.validarEnvio = function (data) {
        swal({
            title: 'CONFIRMAR',
            text: 'El envío de la presente solicitud de Declaración de Mensual, (DD.JJ.) generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            closeOnConfirm: false
        }, function () {
            swal.close();
            $.blockUI();
            setTimeout(function () {
                $scope.enviarFormularioLinea(data);
            }, 1000);
        }); 
    };

    $scope.enviarFormularioLinea = function (paramForm) {
        $.blockUI();
        try{
            var nroTram = '';
            if(paramForm.RECEP_TIPO == "RECTIFICADO"){
                nroTram = paramForm.RECEP_NRO_TRAMITE_RECT;
            }
            var settings = {
                "url":  CONFIG.CONEXION_ARCHIVOS + "registra_archivo_csv.php",
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify(
                    {
                        "url" : paramForm.declaracion_mensual_url, 
                        "empresa" : paramForm.RECEP_RAZON_SOCIAL, 
                        "nit" : paramForm.RECEP_NIT,
                        "solicitud" : paramForm.RECEP_ID_SOLICITUD,
                        "mes" : parseInt(paramForm.RECEP_MES_SOL)-1,
                        "año" : paramForm.RECEP_GESTION_SOL,
                        "tipoTramite" : paramForm.RECEP_TIPO,
                        "tramiteRectificado" : nroTram
                    }
                ),
            };
            $.ajax(settings).done(function (response) {
                var resp = JSON.parse(response);
                if(resp.respuesta){
                    paramForm.respuestaGuardado = resp.mensaje;
                    paramForm.nroRsgistros = resp.cantidadRegistros;
                    $scope.btnEnviarForm = true;
                    var idProcodigo = 'AIV';
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
                            paramForm.nrotramite = $scope.nrotramitec;
                            try {
                                $scope.validarFormProcesos(paramForm);
                            } catch (e) {
                                swal('', "Ocurrio un error", 'error');
                            }
                            $.unblockUI();
                        } catch (e) {
                            swal('', "Conexion fallida", 'error');
                            $.unblockUI();
                        }
                    });
                }else{
                    swal('', resp.mensaje, 'error');
                    $.unblockUI();
                }
            }) ;
        }catch(error){
            console.log("error",error);
            swal('', "Ocurrio un error al enviar la solicitud,vuelva a intentar por favor", 'error');
            $.unblockUI();
        }
       
    };

    $scope.validarFormProcesos = function (datosForm) {
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = sessionService.get('IDUSUARIO');
        nroTramiteEnviado = sessionService.get('NROTRAMITE');
        try {
            var idTramite = sessionService.get('IDTRAMITE');
            nroTramiteEnviado = sessionService.get('NROTRAMITE');
            idUsuario = 4;          
            var settings = {
                "url": CONFIG.API_URL_DMS_2+"elaborarPdf/elaborar/constancia_envio.php",
                "method": "POST",
                "timeout": 0,
                "data": {
                        "soid" : datosForm.RECEP_OID_REP, 
                        "data" : JSON.stringify(datosForm)
                    }
            };
            $.ajax(settings).done(function (response) {        
                datosForm.RECEP_URL_CONSTANCIA = response; 
                var tramiteIgob = new formularioDatos();
                tramiteIgob.idTramite = idTramite;
                tramiteIgob.enviado = 'SI';
                tramiteIgob.codigo = nroTramiteEnviado;
                tramiteIgob.idusuario = idUsuario;
                tramiteIgob.datos = JSON.stringify(datosForm);
                tramiteIgob.actualizaFormularioDatos(function (resultado) {
                     var observacion = 'En archivo adjunto se remite la constancia de envio &#34'+ datosForm.RECEP_URL_CONSTANCIA;
                    var datosActuacion={
                        "tramite": idTramite,
                        "observacion": observacion,
                        "usuarioid":'1',
                        "actividad":"AGENTES INFORMACION",
                        "sistema":"iGob 24/7",
                        "usuario": datosForm.RECEP_OID
                    };
                    var token = sessionStorage.getItem('TOKEN_API');
                    $.ajax({
                        data: datosActuacion,
                        url: CONFIG.CONEXION_API_PG_RC + 'wsRCPG/crearnotificacion',
                        type: 'POST',
                        headers: {
                            'authorization': token
                        },
                        success: function (response) {console.log(response);},
                        error: function (data){ console.log(data);}
                    });
                    var settings = {
                        "url":  CONFIG.CONEXION_ARCHIVOS + "actualiza_archivo_csv.php",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                          "Content-Type": "application/json"
                        },
                        "data": JSON.stringify(
                            {
                                "solicitud" : datosForm.RECEP_ID_SOLICITUD,
                                "nroTramite" : nroTramiteEnviado
                            }
                        ),
                    };
                    $.ajax(settings).done(function (response) {
                        console.log("ACTUALIZA TRAMITE",response);
                    })
                    $scope.urlConstancia = datosForm.RECEP_URL_CONSTANCIA;
                    swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramiteEnviado + "\n");
                    $scope.mostrarFormulario = false;
                    $scope.btnEnviarFormLinea = true;
                    urlFormularioN  =   "../../docs/constancia_envio.html";
                    $( "#msgformulario" ).load(urlFormularioN, function(data) {
                        stringFormulario =   data;
                        console.log("stringFormulario40",stringFormulario,22333,datosForm);
                        stringFormulario  =   stringFormulario.replace("#RECEP_RAZON_SOCIAL#", datosForm.RECEP_RAZON_SOCIAL);
                        stringFormulario  =   stringFormulario.replace("#RECEP_NIT#", datosForm.RECEP_NIT);
                        stringFormulario  =   stringFormulario.replace("#RECEP_FECHA_ENVIO#", datosForm.RECEP_FECHA_ACTUAL);
                        stringFormulario  =   stringFormulario.replace("#RECEP_HORA_ENVIO#", datosForm.RECEP_HORA_ACTUAL);
                        stringFormulario  =   stringFormulario.replace("#RECEP_MES_DECLARACION#", datosForm.RECEP_MES_DECLARACION);
                        stringFormulario  =   stringFormulario.replace("#RECEP_GESTION#", datosForm.RECEP_GESTION_SOL);
                        stringFormulario  =   stringFormulario.replace("#NRO_TRAMITE#", datosForm.nrotramite);
                        stringFormulario  =   stringFormulario.replace("#RECEP_TIPO_TRAMITE#", datosForm.RECEP_TIPO_SOL);
                        stringFormulario  =   stringFormulario.replace("#RECEP_NRO_REGISTROS#", datosForm.nroRsgistros);
                        $scope.datosConstancia = stringFormulario;
                        setTimeout(function(){
                            $scope.mostrarCostancia();
                        },500);
                    });
                    $scope.tramitesCiudadano();
                    $scope.botones = null;
                });
            })
        } catch (error) {
            console.log("error",error);
            swal('', 'Registro no modificado', 'error');
            $.unblockUI();
        }
    };

    $scope.mostrarCostancia   =   function(){
        $('#constancia').modal('show');
        $('#msgformulario').html($scope.datosConstancia);
    }

    $scope.cerrarConstancia = function(){
        console.log("$scope.urlConstancia",$scope.urlConstancia);
        var url = $scope.urlConstancia;    
        window.open(url, 'Download');
    }
    /************************************RECTIFICACION***************************************/
    $scope.crearTramiteRectificacion = function(tramite){
        var idCiudadano = sessionService.get('IDUSUARIO');
        $scope.habGuardar1 = true;
        $scope.datosIniciales = "";
        var datosForm = {};
        var sTipoPersona = "";
        $scope.desabilita = false;
        var recuperarDatos = new rcNatural();
        recuperarDatos.oid = idCiudadano;
        try{
            recuperarDatos.datosCiudadanoNatural(function (resultado) {
                var fechaserver = new fechaHoraServer(); 
                fechaserver.fechahora(function(resp){
                    var sfecha = JSON.parse(resp);
                    var fechaServ = (sfecha.success.fecha).split(' ');
                    var fecha_ = fechaServ[0].split('-');
                    console.log("fecha_",fecha_);
                    var dia = fecha_[2];
                    var mes = fecha_[1];
                    $scope.fechaActual = dia+"/"+mes+"/"+fecha_[0];
                    $scope.horaActual = fechaServ[1];
                    var resultadoApi = JSON.parse(resultado);
                    var data = resultadoApi[0];
                    $scope.datos = {};
                    if(data.dtspsl_tipo_persona == 'JURIDICO'){
                        $scope.datos.RECEP_OID = data._id;
                        $scope.datos.RECEP_NIT = data.dtspsl_nit;
                        $scope.datos.RECEP_RAZON_SOCIAL = data.dtspsl_razon_social;
                        $scope.datos.RECEP_PODER = data.dtspsl_poder_replegal;
                        $scope.datos.RECEP_NRO_NOTARIA = data.dtspsl_nro_notaria;
                        $scope.datos.RECEP_ID_MACRO = data.dtspsl_macrodistrito;
                        $scope.datos.RECEP_MACRO = data.dtspsl_macrodistrito_desc;
                        $scope.datos.RECEP_ID_DISTRITO = data.dtspsl_distrito;
                        $scope.datos.RECEP_DISTRITO = data.dtspsl_distrito_desc;
                        $scope.datos.RECEP_ID_ZONA = data.dtspsl_zona;
                        $scope.datos.RECEP_ZONA = data.dtspsl_zona_desc;
                        $scope.datos.RECEP_TIPO_VIA = data.dtspsl_tipo_via;
                        $scope.datos.RECEP_NOMBRE_VIA = data.dtspsl_nombre_via;
                        $scope.datos.RECEP_NRO_PUERTA = data.dtspsl_numero_casa;
                        $scope.datos.RECEP_MES_DECLARACION = tramite.datos.RECEP_MES_DECLARACION;
                        $scope.datos.RECEP_FECHA_ACTUAL = $scope.fechaActual;
                        $scope.datos.RECEP_HORA_ACTUAL = $scope.horaActual;
                        $scope.datos.RECEP_GESTION_SOL = fecha_[0];  
                        $scope.datos.RECEP_MES_SOL = fecha_[1];                      
                        $scope.datos.RECEP_TIPO_SOL = "RECEPCIÓN DE DOCUMENTOS RECTIFICADO";
                        $scope.datos.RECEP_NRO_TRAMITE_RECT = tramite.vcodigo;                                                
                        $scope.datos.RECEP_TIPO = "RECTIFICADO";                                                  
                        if (data.dtspsl_ci_representante != null && data.dtspsl_ci_representante != "") {
                            try {
                                var buscarRepresentante = new rcNatural();
                                buscarRepresentante.tipo_persona = "NATURAL";
                                buscarRepresentante.ci = data.dtspsl_ci_representante;
                                buscarRepresentante.buscarPersona(function (resultado) {
                                    var resultadoApiRepre = JSON.parse(resultado);
                                    var repLegalmongo = resultadoApiRepre;
                                    $scope.datos.RECEP_OID_REP = repLegalmongo[0]._id;
                                    $scope.datos.RECEP_NOMBRE_REP = ((typeof (repLegalmongo[0].dtspsl_nombres) == 'undefined') ? "" : repLegalmongo[0].dtspsl_nombres);
                                    $scope.datos.RECEP_PRIM_APE_REP = ((typeof (repLegalmongo[0].dtspsl_paterno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_paterno);
                                    $scope.datos.RECEP_SEG_APE_REP = ((typeof (repLegalmongo[0].dtspsl_materno) == 'undefined') ? "" : repLegalmongo[0].dtspsl_materno);
                                    $scope.datos.RECEP_CAS_APE_REP = ((typeof (repLegalmongo[0].dtspsl_tercer_apellido) == 'undefined') ? "" : repLegalmongo[0].dtspsl_tercer_apellido);
                                    $scope.datos.RECEP_DOC_REP = repLegalmongo[0].dtspsl_ci;
                                    $scope.datos.RECEP_DOC_EXP_REP = repLegalmongo[0].dtspsl_expedido;
                                    if(data.dtspsl_activaciond == 'SI' && data.dtspsl_activacionf == 'SI'){
                                        var dataInicio = {};
                                        var fecha = new Date();
                                        var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                                        var sIdServicio = $scope.idProceso;
                                        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
                                        var sFechaTramite = fechactual;
                                        dataInicio.INT_FORM_ALMACENADO = 'C';
                                        var datosSerializados = JSON.stringify($scope.datos);
                                        try {
                                            var crea = new adicionaTramitesFormulario();
                                            crea.frm_tra_fecha = sFechaTramite;
                                            crea.frm_tra_enviado = "NO";
                                            crea.frm_tra_registrado = fechactual;
                                            crea.frm_tra_modificado = fechactual;
                                            crea.id_servicio = sIdServicio;
                                            crea.data_json = datosSerializados;
                                            crea.oid_ciudadano = sIdCiudadano;
                                            crea.id_usuario = 3;
                                            crea.adiciona_Tramites_Formulario(function (res) {
                                                x = JSON.parse(res);
                                                response = x.success;
                                                if (response.length > 0) {
                                                    sessionService.set('IDTRAMITE',response[0].sp_insertar_formulario_tramites_datos);
                                                    $scope.datos.RECEP_ID_SOLICITUD = response[0].sp_insertar_formulario_tramites_datos;
                                                    $scope.mostrarFormulario = true;
                                                    $scope.botones = '';
                                                    $scope.getCaptchasXX();
                                                    /*setTimeout(function(){
                                                        iniciarLoadFyle();
                                                    }, 1000);*/
                                                    $.unblockUI();
                                                    alertify.success('Tramite creado correctamente');
                                                    $scope.tramitesCiudadano();
                                                }
                                                else {
                                                }
                                            });
                                        } catch (e) {
                                        }
                                    }else{
                                        swal('Advertencia', 'Debe realizar su activacion fisica y digital', 'error');
                                    }
                                });
                            } catch (e) {
                                console.log("error",e);
                                swal('Advertencia', 'Ocurrio un error, reintente mas tarde por favor', 'error');
                            }
                        }
                    }else{
                        swal('Advertencia', 'El tramite solo esta habilitado para personas juridicas', 'error');
                    }
                });
            })
        }catch(error){
            console.log("error",error);

        }
    }


}