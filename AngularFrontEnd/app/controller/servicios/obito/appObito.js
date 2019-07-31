app.controller('obitoController', function ($scope,$timeout, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,wsRgistrarPubliciadad, $window, wsObito) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.desabilitadoZ=true;
    $scope.desabilitadoV=true;
    $scope.desabilitadoNo=true;
    $scope.mostrarMsgActividadTrue  = false;
    $scope.mostrarMsgActividadFalse = false;
    $scope.divNatural = null;
    $scope.divJuridico = null;
    $scope.divSuperficie = null;
    $scope.divAntecedentes = null;
    $scope.divCISolicitante = null;
    $scope.divServicio = null;
    $scope.divSuperficie = null;
    $scope.divAntecedentesP = null;
    $scope.divAntecedentesS = null;
    $scope.divConstitucion = null;
    $scope.divPoder = null;
    $scope.divCIRepresentante = null;
    $scope.divLicenciaFuncionamiento = null;
    $scope.divPoliza = null;
    $scope.divCertificacionAcustica = null;
    $scope.divDocumentoMantenimiento = null;
    $scope.divCertificacionIBNORCA = null;
    $scope.divDeclaracionJurada = null;
    $scope.divContratoalquiler = null;    
    $scope.selParentesco   =   function(idParentesco){
        idParentesco = parseInt(idParentesco);
        $rootScope.parentescos = idParentesco;
        if(idParentesco==19) {
            $rootScope.archivoDivCI = false;
            $rootScope.archivoDivOJ = true;
        } else {
            $rootScope.archivoDivCI = true;
            $rootScope.archivoDivOJ = false;
            /*if($scope.datos.FILE_FOTOCOPIA_CI) {
            }else{
                $scope.datos.FILE_FOTOCOPIA_CI = $scope.datosIniciales.FILE_FOTOCOPIA_CI;
            }*/
        }        
    };
    var archivos = [
        {"titulo":"Carnet de identidad","desripcion":"Carnet del Solicitante"},
        {"titulo":"Servicio","desripcion":"Fotocopia de servicio Luz/Agua/Gas"},
        {"titulo":"Superficie","desripcion":"Croquis de la superficie"},
        {"titulo":"AntecedentesP","desripcion":"Antecedentes Solicitante"},
        {"titulo":"AntecedentesS","desripcion":"Antecedentes Propietario"},
        {"titulo":"Constitucion","desripcion":"Constitucion"},
        {"titulo":"Poder","desripcion":"Poder Legal"},
        {"titulo":"CIRepresentante","desripcion":"Carnet del Representante Legal"},
        {"titulo":"LicenciaFuncionamiento","desripcion":"Licencia de Funcionamiento"},
        {"titulo":"Poliza","desripcion":"Poliza de seguro"},
        {"titulo":"CertificacionAcustica","desripcion":"Certificado Acustico"},
        {"titulo":"DocumentoMantenimiento","desripcion":"Documento de Mantenimiento  del equipo"},
        {"titulo":"CertificacionIBNORCA","desripcion":"Certificacion IBNORCA"},
        {"titulo":"DeclaracionJurada","desripcion":"Declaracion Jurada"},
        {"titulo":"Contratoalquiler","desripcion":"Contrato de Alquiler"}
    ];

    $scope.divOcultarJuegos = true;

    $scope.startDateOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
        $scope.startDateOpenedH = true;
    };

    $scope.model = {
        startDate: new Date('09/21/2015'),
        endDate: new Date()
    };

    $scope.getDatos=function(){
        $scope.estado_formulario = "sin_dato";
    };

    $scope.getProforma = function(datos) {
    }
    /* Bloquer de formulario */
    /*enviarFormProcesos*/
    ////////////////////////////////////////////////////////////////////
    //UPLOAD  FILES
    $rootScope.vid = sessionService.get('IDCIUDADANO');
    var idCiu = $rootScope.vid;
    $scope.img_url = CONFIG.IMG_URL+ "ciudadano/"+idCiu;

    var uploader = $scope.uploader = new FileUploader({
           url: CONFIG.UPLOAD_URL
    });
    uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
    });
    $scope.uploader = new FileUploader({
                       url: CONFIG.UPLOAD_URL+"?desripcion=ciudadano&&idCiudadano="+ idCiu
    });
    var uploader = $scope.uploader;

    uploader.filters.push({
        name: 'customFilter',
            fn: function(item, options) {
                return this.queue.length <2;
            }
    });
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    };
    /////////////////////////////////////////////////////////////////
    $scope.verificarSuperficie = function(superficie){
        if (superficie>150) {
            $scope.divSuperficie = "mostrar";
        } else {
            $scope.divSuperficie = null;
        }
    }
    /////////////////////////////////////////////////////////////////
    $scope.verificarEstablecimiento = function(establecimiento){
        if (establecimiento=="ALQUILADO"||establecimiento=="ANTICRÉTICO") {
            $scope.divAntecedentesP = "mostrar";
            $scope.divContratoalquiler = "mostrar";
        } else {
            $scope.divAntecedentes = null;
            $scope.divContratoalquiler = null;
        }
    }
    ////////////////////////////////////////////////////////////////////
    $scope.cambiarFile = function(obj, valor){
        $scope.registro[obj.name] = valor;
    };
    ////////////////////////////////////////////////////////////////////
    $scope.limpiaradjuntos = function(){
        document.getElementById('FILE_FOTOCOPIA_CI').value="";
    }
    ////////////////////////////////////////////////////////////////////
    $scope.enviarFormProcesosObitoxxx = function(dato){
        $scope.btnEnviarForm   =   true;
        var idProcodigo = 'OBT';
        var data = {};
        data['g_tipo'] = "OBITO-LINEA";
        data['g_fecha'] = fechactual;
        data['nombres_t'] = dato.nombres_t;
        data['primer_apellido_t'] = dato.primer_apellido_t;
        data['segundo_apellido_t'] = dato.segundo_apellido_t;
        data['carnet_t'] = dato.carnet_t;
        data['ci_expedido_t'] = dato.ci_expedido_t;
        data['parentesco'] = dato.parentesco;
        data['motivo'] = dato.motivo;
        data['titular_zona'] = dato.titular_zona;
        data['titular_via'] = dato.titular_via;
        data['tipo_via'] = dato.tipo_via;
        data['titular_nro'] = dato.titular_nro;
        data['titular_fono'] = dato.titular_fono;
        data['titular_correo'] = dato.titular_correo;
        data['nombres_f'] = dato.nombre;
        data['primer_apellido_f'] = dato.paterno;
        data['segundo_apellido_f'] = dato.materno;
        data['apellido_casado_f'] = dato.apellido_casada;
        data['fecha_def_1'] = dato.fecha1;
        data['fecha_def_2'] = dato.fecha2;
        data['idTramite'] = $rootScope.tramiteId;
        data['g_UO_solicitante'] = '1473';   
        data['CI_BIGDATA'] = sessionService.get('IDSOLICITANTE');
             
        if(dato.ci_fallecido==''){
          data['carnet_f']=0;
        } else {
          data['carnet_f']= dato.ci_fallecido;
        }
        data['observaciones'] = "";
        //AJAX
        
        var settings = {
          "async": true,
          "crossDomain": true,
          //"url": "http://192.168.5.141:9098/wsSOAP/registroSolicitudObito",
          "url": "http://serviciosrs.lapaz.bo/wsSOAP/registroSolicitudObito",
          "method": "POST",
          "data": data
        }

        $.ajax(settings).done(function (response) {
            //dataRespAe = JSON.stringify(eval(response.success));
            dataRespAe = JSON.parse(response.success);
            var idTramite = sessionService.get('IDTRAMITE');              
            nroTramiteEnviado = dataRespAe[0].nroTramiteEnviado;
            codigo = dataRespAe[1].codigo;
            idUsuario = 4;
            if (nroTramiteEnviado.length > 0) {
                data['codigo_genesis'] = nroTramiteEnviado;
                var sIdTramite = $rootScope.tramiteId;
                var datosSerializados = JSON.stringify(data);
                //creacion de proforma unicamente
                 var sdatos = new reglasnegocio();
                 sdatos.identificador = 'RCCIUDADANO_192';
                 sdatos.parametros ='{"id":"' + sIdTramite + '","frm_tra_proforma":"' + nroTramiteEnviado + '","frm_tra_id_usuario":"'+idUsuario+'","frm_tra_modificado":"'+fechactual+'"}';
                 sdatos.llamarregla(function(results){
                    results = JSON.parse(results);
                    if (results == '[]' || results == '[{}]' || results == '[{ }]' || results == ' ' || results == '') {
                        sweet.show('','No existen datos','warning');
                    } else{
                        if (results.length>0) {
                            $scope.tramitesCiudadano();
                            $scope.bloquearBtnEnviarForm();
                            sweet.show("Nro de Proforma creado", "Señor Ciudadano realice el pago con la siguiente proforma : " + nroTramiteEnviado);
                        }else{
                            sweet.show('','Registro no Modificado','error');
                        }
                    };
                });
            } else {
                sweet.show('', 'No se envio el trámite', 'error');
            }
        }).fail(function(jqXHR, textStatus){
            sweet.show('', 'No se envio el trámite', 'error');
        });        
    };
    /**************************** macrodistritos ************************************/
      $scope.macrodistritos = function(){
        $scope.aMacrodistritos = {};     
        var smacrodistrito = new reglasnegocio();
        smacrodistrito.identificador = 'RCCIUDADANO_21';
        smacrodistrito.parametros = '{}';
        smacrodistrito.llamarregla(function(results){
        results = JSON.parse(results);
            if (results == '[]' || results == '[{}]' || results == '[{ }]' || results == ' ' || results == '') {
                sweet.show('','No existen datos','warning');
            } else{
                if(results.length > 0){
                    $scope.aMacrodistritos = results;
                } else {
                    $scope.msg = "Error !!";
                }
            };
         });   
    };
    /********************************** VIAS ****************************************/
    $scope.vias= function(zona,tipo){
        $scope.z = zona;
        $scope.t = tipo;
        var sdatos = new reglasnegocio();
        sdatos.identificador = 'RCCIUDADANO_78';
        sdatos.parametros ='{"idz":"' + zona + '","tipo":"' + tipo + '"}';
        sdatos.llamarregla(function(results){
            results = JSON.parse(results);
            if (results == '[]' || results == '[{}]' || results == '[{ }]' || results == ' ' || results == '') {
                sweet.show('','No existen datos','warning');
            } else{
                $scope.tip_vias =   [];
                var aTipoVia    =   {};
                aTipoVia["idv"] = "OTROS";
                aTipoVia["nombrev"] = "OTRO";
                if(results.length > 0 ){
                    $scope.tip_vias =   results;
                }
                $scope.tip_vias.push(aTipoVia);
                $scope.desabilitadoNo=false;
            };
        });
     };
    /********************************************************************************/
    $scope.distritoZonas = function(idMacroJ){
        var idMacro = "";
        if($scope.aMacrodistritos){
            angular.forEach($scope.aMacrodistritos, function(value, key) {
                if(value.mcdstt_macrodistrito == idMacroJ){
                    idMacro = value.mcdstt_id;
                }
            });
        }
        $scope.idMacro = idMacro;
        $scope.datos.INT_AC_MACRO_ID    =   idMacro;
        $scope.aDistritoZona = {};
        var distzonas = new reglasnegocio();
        distzonas.identificador = 'RCCIUDADANO_34';
        distzonas.parametros = '{"dist_macro_id":"' + idMacro + '"}';
        distzonas.llamarregla(function(results){
        results = JSON.parse(results);    
        if (results == '[]' || results == '[{}]' || results == '[{ }]' || results == ' ' || results == '') {
            sweet.show('','No existen datos','warning');
        } else{
            if(results.length > 0){
                $scope.aDistritoZona = results;
                $scope.desabilitadoZ = false;
                $scope.desabilitadoV = true;
                $scope.desabilitadoNo = true;
                $scope.datos.INT_AC_TIP_VIA = "";
                $scope.datos.INT_AC_NOMBRE_VIA = "";
            } else {
                $scope.msg = "Error !!";
            }
        };
        });
        $scope.desabilitadoZ = true;
        $scope.desabilitadoV = true;
    };
    /********************** Lista Form Datos ********************************/
    $scope.recuperarInfo = function(){

        sIdTramite = sessionService.get('IDTRAMITE');
        sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
        sIdServicio = sessionService.get('IDSERVICIO');
        var datosform = {};
        if(sIdCiudadano){
            var datosCiudadano   = new reglasnegocio();
            datosCiudadano.identificador = 'RCCIUDADANO_39';
            datosCiudadano.parametros ='{"sidciudadano":"' + sIdCiudadano + '","sidservicio":"' + sIdServicio + '","sidtramite":"' + sIdTramite + '"}'; 
            datosCiudadano.llamarregla(function(datosCiudadano){
                results = JSON.parse(results);
                if (results == '[]' || results == '[{}]' || results == '[{}]' || results == ' ' || results == '') {
                    sweet.show('','No existen datos','warning');
                } else{
                    if(results.length > 0){
                        datosform = JSON.parse(results[0].form_contenido);
                        $scope.datosform = datosform;
                    } else {
                        sessionService.set('IDTRAMITE', sIdTramite);
                    }
                };
            });
        }else{
            alert("No existe id ciudadano");
        }
    };
    /*************************************************************************/
    $scope.tipoPersona=function(tipo){
        var sTipoPersona = sessionService.get('TIPO_PERSONA');
        if (sTipoPersona == 'JURIDICO')
            $scope.representante    =   "mostrar";
        else
            $scope.representante    =   null;
    };

    //Documentos Adjuntos
    $scope.cambiarFile = function(obj, valor){
        //alert("123");
        $scope.datos[obj.name] = valor;
    };

    $scope.cambiarFile2 = function(obj2, valor){
        //alert("123");
        //$scope.datos[obj.name] = valor;
    };

    var clsValidarBtnInternet = $rootScope.$on('validarBtnInternet', function(event, data){

        if (data == "SI") {
            $scope.btnGuardarForm   =   true;
            $scope.desabilitado     =   true;
        } else {
            $scope.btnEnviarForm    =   false;
            $scope.btnGuardarForm   =   false;
            $scope.desabilitado     =   false;
        }
    });


    var clsValidarBtnEnviar = $rootScope.$on('validarBtnEnviar', function(event, data){
        if(data > 0){
            $scope.btnEnviarForm = false;
        }else{
            $scope.btnEnviarForm = true;
        }
    });

    //validarBtnEnviar
    $scope.validarBtnEnviar =   function(cont){
        if(cont > 0){
            $scope.btnEnviarForm = false;
        }else{
            $scope.btnEnviarForm = false;
        }
    };

    $scope.cargarDatos=function(){
        $scope.getDatos();
        $scope.macrodistritos();
        $scope.inciarUpload();

        if($scope.sTipoPersona=="NATURAL"){
            $scope.divNatural = "mostrar";
        } else {
            $scope.divJuridico = "mostrar";
        }
    };

    $scope.inciarUpload =   function(){
        try{
          $('#multiDocsButon').click(function(){
                $('#multiDocsFile').click();
          });
        }catch(e){}
    };

    var clsInicioInternet = $rootScope.$on('inicioInternetRc', function(event, data){
        //$scope.datos.INT_TIPO_CONTRIBUYENTE = 'NATURAL';
        //$scope.tipoPersona($scope.datos.INT_TIPO_CONTRIBUYENTE);
    });

    var clsIniciarGrillaAE = $rootScope.$on('inicializarGrillaAE', function(event, data){
        $scope.formDatosAE              = false;
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        if(data.length > 0){
            if(data[0].venviado != 'SI'){
                $scope.validarActividadEco(data[0].datos.TIPO);
            }
        }
    });

    //LISTANDO ZONAS POR EL ID MACRODISTRITO
    /*************** distritos_zonas **********************/ 
    var clsIniciarCamposInternet = $rootScope.$on('inicializarCamposInternet', function(event, data){
       if(typeof(data.INT_AC_MACRO_ID) != 'undefined'){
            //LISTANDO ZONAS
            var idMacro =   data.INT_AC_MACRO_ID;
            $scope.aDistritoZona = {}; 

            var aDistritoZona   = new reglasnegocio();
            aDistritoZona.identificador = 'RCCIUDADANO_34';
            aDistritoZona.parametros = '{"dist_macro_id":"' + idMacro + '"}';    
            aDistritoZona.llamarregla(function(results){    
            results = JSON.parse(results);
            if (results == '[]' || results == '[{}]' || results == ' ' || results == '') {
                sweet.show('','Error, sin datos','error');
            } else{
                if(results.length > 0){
                    $scope.aDistritoZona = results;
                }else{
                    $scope.msg = "Error !!";
                } 
            };           
            });
        }

        /*******************************************************/
        //EXTRAYENDO TIPO DE VIA CONTRIBUYENTE, dtspsl_tipo_via
        if(typeof($scope.datos.INT_VIA) != 'undefined'){
            var idTipoVia   =   $scope.datos.INT_VIA;
            var tipoVia     =   [
                { name: 'AVENIDA', id: '1'},
                { name: 'CALLE', id: '2'},
                { name: 'CALLEJON', id: '3'},
                { name: 'PASAJE', id: '4'}
            ];
            angular.forEach(tipoVia, function(value, key) {
                if(value.id == idTipoVia){
                    $scope.datos.INT_TIP_VIA  =   value.name;
                }
            });
        }

        //EXTRAYENDO EXPEDIDO

        if(typeof($scope.datos.INT_EXP) != 'undefined'){
            var ideExpedido   =   $scope.datos.INT_EXP;
            var tipoExpedido  =   [
                { name: 'LA PAZ', value:'LPZ', id: '1'},
                { name: 'ORURO', value:'ORU', id: '2'},
                { name: 'POTOSI', value:'PTS', id: '3'},
                { name: 'COCHABAMBA', value:'CBB', id: '4'},
                { name: 'TARIJA', value:'TJA', id: '5'},
                { name: 'CHUQUISACA', value:'CHQ', id: '6'},
                { name: 'SANTA CRUZ', value:'SCZ', id: '7'},
                { name: 'PANDO', value:'PND', id: '8'},
                { name: 'BENI', value:'BNI', id: '9'},
                { name: 'EXTRANJERO', value:'EXT', id: '10'}
            ];
            angular.forEach(tipoExpedido, function(value, key) {
                if(value.id == ideExpedido){
                    $scope.datos.INT_EXP  =   value.value;
                }
            });
        }
        setTimeout(function(){
            //$scope.irUbicacionLugar($rootScope.looo,$rootScope.laaa);
        }, 500);


        //OCULTAR MOSTRAR CAMPOS PARA LICENCIA DE JUEGOS

        $scope.nom_via = data.INT_AC_NOMBRE_VIA;
        if (data.INT_AC_ZONA) {
            $scope.desabilitadoZ=false;
        }
        if (data.INT_AC_TIP_VIA) {
            $scope.desabilitadoV=false;
        }
        if (data.INT_AC_NOMBRE_VIA) {
        }
        $scope.verificarEstablecimiento(data.INT_AC_ESTADO);

        if(data.INT_AC_TIP_VIA != ""){
            $scope.vias(data.INT_AC_ID_ZONA,data.INT_AC_TIP_VIA);
        }
        $scope.datos.INT_AC_NOMBRE_VIA = data.INT_AC_NOMBRE_VIA;
        $scope.acti = data.INT_ACTIVIDAD;
        $scope.seleccionarTipoCategoria(data.INT_ACTIVIDAD);
        //$scope.vias();

        if(data.INT_ACTIVIDAD == 'INTB_PUB' || data.INT_ACTIVIDAD == 'INTJ_MCE' || data.INT_ACTIVIDAD == 'INTJ_MEC'){
            $scope.ocultarCamposJuegos();
        }else{
            $scope.mostrarCamposJuegos();
        }
    });

    //DOCUMENTOS ADJUNTOS OBLIGATORIOS
    var clsIniciarFechaObligatorio = $rootScope.$on('inicializarFechaOblitatorio', function(event, data){

        var archivosAdjuntos    =   ((typeof(data.ARCHIVOS_MULTIPLES) == 'undefined') ? "" :data.ARCHIVOS_MULTIPLES);
        if(archivosAdjuntos.length > 0){
            $scope.adjuntoObligatorio       =   false;
            $scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #577C27;";
        }else{
            $scope.adjuntoObligatorio       =   true;
            $scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #FF4040;";
        }
    });

    $scope.$on('$destroy', function() {
        clsValidarBtnEnviar();
        clsIniciarCamposInternet();
        clsIniciarGrillaAE();
        clsIniciarFechaObligatorio();
    });

    /*INTERNET EN LINEA*/
    $scope.tblActividaEco        =   {};
    $scope.lstActividadEco       =   [];
    $scope.formDatosAE           =  false;

    $scope.tblTramites        =   {};
    $scope.trmUsuario      =   [];
    $scope.tblTramites = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            IdActividad: 'desc'
        }
    }, {
        total: $scope.trmUsuario.length,
        getData: function($defer, params) {
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

    $scope.validarActividadEco  =   function(stipo){
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        switch(stipo) {
            case "EMISION":
                $scope.formDatosAE   =  false;
                $scope.divAntecedentesS = "mostrar";

                break;
            case "RENOVACION":
                $scope.divAntecedentesP = null;
                $scope.formDatosAE   =  true;
                $scope.listarAE();
                break;
            case "MODIFICACION":
                $scope.divAntecedentesP = null;
                $scope.formDatosAE   =  true;
                $scope.listarAE();
                break;
            case "CANCELACION":
                $scope.divAntecedentesP = null;
                $scope.formDatosAE   =  true;
                $scope.listarAE();
                break;
            default:
            text = "NO TIENE TIPO";
        }
    };
    $scope.vesavilirat = function(data){
        if (data.INT_AC_NOMBRE_VIA!='OTRO') {
            var sdata   =   document.getElementById("OTRO_VIA");
            if(sdata){
                document.getElementById("OTRO_VIA").value = "";
            }
        }
    }

    $scope.actulizarIdDistrito  =   function(){
        $scope.desabilitadoV=false;
        var idDistrito  = "";
        var idZona      = "";
        var distNombre  = $scope.datos.INT_AC_ZONA;
        if($scope.aDistritoZona){
            angular.forEach($scope.aDistritoZona, function(value, key) {
                if(value.dist_nombre == distNombre){
                    idDistrito  =   value.dist_dstt_id;
                    idZona      =   value.dist_id;
                }
            });
        }

        $scope.datos.INT_AC_DISTRITO    =   idDistrito;
        $scope.datos.INT_AC_ID_ZONA     =   idZona;
        $scope.datos.INT_ID_ZONA        =   idZona;
        $scope.desabilitadoNo=true;
        $scope.datos.INT_AC_NOMBRE_VIA = "";
    };

    //ACTUALIZANDO CAMPOS PARA EL CASO DE RENOVACION DE LICENCIAS
    $scope.actulizarIdDistritoRenovacion  =   function(idAcZona){
        var idDistrito  = "";
        var idZona      = "";
        var distNombre  = idAcZona;
        if($scope.aDistritoZona){
            angular.forEach($scope.aDistritoZona, function(value, key) {
                if(value.dist_nombre == distNombre){
                    idDistrito  =   value.dist_dstt_id;
                    idZona      =   value.dist_id;
                }
            });
        }

        $scope.datos.INT_AC_DISTRITO    =   idDistrito;
        $scope.datos.INT_AC_ID_ZONA     =   idZona;
        $scope.datos.INT_ID_ZONA        =   idZona;
    };


    $scope.mostrarCamposJuegos = function(){
        $scope.divOcultarJuegos = true;
    };

    $scope.ocultarCamposJuegos = function(){
        $scope.divOcultarJuegos = false;
    };
    $scope.cambiar=function(datos){
        if (datos == $scope.acti) {

        }else{
            $scope.limpiaradjuntos();
        }

    }
    $scope.seleccionarTipoCategoria     =   function(categoria){
        //$scope.limpiaradjuntos();
        var tipoCategoria       =   "";
        var sTipoCategoriaDesc  =   "";
        if ($scope.sTipoPersona=="NATURAL"){
            switch(categoria) {
                case "INTA_INT_JUE":
                    tipoCategoria       =   61;
                    $scope.tipoCategoria       =   61;
                    sTipoCategoriaDesc  =   "INTERNETS Y JUEGOS EN RED";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = "mostrar";
                    $scope.divServicio = "mostrar";
                    $scope.divSuperficie = null;
                    $scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = null;
                    $scope.divCIRepresentante = null;
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    $scope.divContratoalquiler = null;
                    $scope.mostrarCamposJuegos();
                    break;
                case "INTB_COM":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = "mostrar";
                    $scope.divServicio = null;
                    $scope.divSuperficie = null;
                    $scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = null;
                    $scope.divCIRepresentante = null;
                    $scope.divLicenciaFuncionamiento = "mostrar";
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    $scope.divContratoalquiler = null;
                    $scope.mostrarCamposJuegos();
                    break;
                case "INTB_PUB":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = "mostrar";
                    $scope.divServicio = null;
                    $scope.divSuperficie = null;
                    $scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = null;
                    $scope.divCIRepresentante = null;
                    $scope.divLicenciaFuncionamiento = "mostrar";
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    $scope.divContratoalquiler = null;
                    //CAMPOS INNECESARIOS PARA AUTORIZACION JUEGOS - ESPACIOS PUBLICOS
                    $scope.ocultarCamposJuegos();
                    break;
                case "INTJ_MCE":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = "mostrar";
                    $scope.divServicio = null;
                    $scope.divSuperficie = null;
                    $scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = null;
                    $scope.divCIRepresentante = null;
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = "mostrar";
                    $scope.divCertificacionAcustica = "mostrar";
                    $scope.divDocumentoMantenimiento = "mostrar";
                    $scope.divCertificacionIBNORCA = "mostrar";
                    $scope.divDeclaracionJurada = null;
                    $scope.divContratoalquiler = null;
                    //CAMPOS INNECESARIOS PARA AUTORIZACION JUEGOS - ESPACIOS PUBLICOS
                    $scope.divOcultarJuegos = true;
                    $scope.ocultarCamposJuegos();
                    break;
                case "INTJ_MEC":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = "mostrar";
                    $scope.divServicio = null;
                    $scope.divSuperficie = null;
                    $scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = null;
                    $scope.divCIRepresentante = null;
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = "mostrar";
                    $scope.divCertificacionAcustica = "mostrar";
                    $scope.divDocumentoMantenimiento = "mostrar";
                    $scope.divCertificacionIBNORCA = "mostrar";
                    $scope.divDeclaracionJurada = null;
                    $scope.divContratoalquiler = null;
                    $scope.ocultarCamposJuegos();
                    break;
                default:
                text = "NO TIENE TIPO";
            }
        } else {
            switch(categoria) {
                case "INTA_INT_JUE":
                    tipoCategoria       =   61;
                    $scope.tipoCategoria       =   61;
                    sTipoCategoriaDesc  =   "INTERNETS Y JUEGOS EN RED";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = null;
                    $scope.divServicio = null;
                    $scope.divSuperficie = null;
                    $scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = "mostrar";
                    $scope.divPoder = "mostrar";
                    $scope.divCIRepresentante = "mostrar";
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    $scope.divContratoalquiler = null;
                    $scope.mostrarCamposJuegos();
                    break;
                case "INTB_COM":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = null;
                    $scope.divServicio = null;
                    $scope.divSuperficie = null;
                    $scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = "mostrar";
                    $scope.divPoder = "mostrar";
                    $scope.divCIRepresentante = "mostrar";
                    $scope.divLicenciaFuncionamiento = "mostrar";
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    $scope.divContratoalquiler = null;
                    $scope.mostrarCamposJuegos();
                    break;
                case "INTB_PUB":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = null;
                    $scope.divServicio = null;
                    $scope.divSuperficie = null;
                    $scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = "mostrar";
                    $scope.divPoder = "mostrar";
                    $scope.divCIRepresentante = "mostrar";
                    $scope.divLicenciaFuncionamiento = "mostrar";
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = null;
                    $scope.divContratoalquiler = null;
                    break;
                case "INTJ_MCE":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = null;
                    $scope.divServicio = null;
                    $scope.divSuperficie = null;
                    $scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = "mostrar";
                    $scope.divCIRepresentante = "mostrar";
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = "mostrar";
                    $scope.divContratoalquiler = null;
                    $scope.ocultarCamposJuegos();
                    break;
                case "INTJ_MEC":
                    tipoCategoria   =   62;
                    $scope.tipoCategoria       =   62;
                    sTipoCategoriaDesc  =   "INTERNETS, JUEGOS EN RED Y OTROS";
                    // DOCUMENTOS ADJUNTOS
                    $scope.divCISolicitante = null;
                    $scope.divServicio = null;
                    $scope.divSuperficie = null;
                    $scope.divAntecedentesP = null;
                    $scope.divAntecedentesS = "mostrar";
                    $scope.divConstitucion = null;
                    $scope.divPoder = "mostrar";
                    $scope.divCIRepresentante = "mostrar";
                    $scope.divLicenciaFuncionamiento = null;
                    $scope.divPoliza = null;
                    $scope.divCertificacionAcustica = null;
                    $scope.divDocumentoMantenimiento = null;
                    $scope.divCertificacionIBNORCA = null;
                    $scope.divDeclaracionJurada = "mostrar";
                    $scope.divContratoalquiler = null;
                    $scope.ocultarCamposJuegos();
                    break;
                default:
                text = "NO TIENE TIPO";
            }
        }
    };
        $scope.modelFecha = {
        startDate: new Date('09/21/2015'),
        endDate: new Date()
    };
    $scope.serializarInformacionyvan=function(datos){
        wsRgistrarPubliciadad.registra_publicidades(datos).then(function(response){
                console.log("datos response:",response);
              });
    }
    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
    try{
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }catch (e) {
        console.log("error", e);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
