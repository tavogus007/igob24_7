const { count } = require("console");

app.filter('jsonDate', ['$filter', function ($filter) 
{
    return function (input, format) {
        return (input) ? $filter('date')(parseInt(input.substr(6)), format) : '';
    }
}]);
app.filter('tiempoCumplimientoDesdeAceptacion', ['$filter','$sce', function ($filter,$sce) {
    return function (input, format) {
        var html = "";
        if (input.fechaAceptacion != null)
        {
            var tramite = input;
            var tiempoCumplimiento = input.tiempoCumplimiento;
            var fechaAceptacion = new Date(parseInt(tramite.fechaAceptacion.substr(6)));
            var fechaActual = new Date();
            if(input.fechaFin)
            {
                fechaActual = new Date(parseInt(tramite.fechaFin.substr(6)));
            }
            var faceptacion = new Date(fechaAceptacion.getFullYear(), fechaAceptacion.getMonth(), fechaAceptacion.getDate());
            var factual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());

            var diffAceptacionActual = factual.getTime() - faceptacion.getTime();
            var diasAceptacionActual = (diffAceptacionActual / (1000 * 60 * 60 * 24)); //+ 1;
            var diasRestantesDesdeAceptacion = tiempoCumplimiento - diasAceptacionActual

            //if (diasInicioActual > tiempoCumplimiento)
            if (diasRestantesDesdeAceptacion <= 0) {

                html = "<span style='color:red'>Fuera de plazo</span>";
                //html = "<a  class='btn btn-danger btn-circle' title='Fuera del tiempo de cumplimiento. Total días: " + diasAceptacionActual + " | Días cumplimiento: " + tiempoCumplimiento + "'>" + diasRestantesDesdeAceptacion + "</a>";
            } else {

                html = "<span style='color:green'>Dentro del plazo</span>";
                //html = "<a  class='btn btn-success btn-circle' title='Dentro del tiempo de cumplimiento'>" + diasRestantesDesdeAceptacion + "</a>";
            }
        }
        //return html;
        return $sce.trustAsHtml(html);
    }
}]);
app.directive('lusuparametroOpcional', ['$filter', function ($filter) {
    formatter = function (num) {
        //return $filter('currency')(num);
        if(num == -2)
        {
            return "OPCIONAL";
        }
        else
        {
            return num;
        }
    };
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            ngModel.$formatters.push(formatter);
        }
    };
}]);

app.directive('modelformatoSercat', ['$filter', function ($filter) {
    formatter = function (text) {
        if(text != null){
            if(text.length == 15)
            {
                var cc = text;
                var cc1 = cc.substring(0,3) + '-' + cc.substring(3,7) + '-' + cc.substring(7,11) + '-' + cc.substring(11,15);
                return cc1;
            }
            else
            {
                return text;
            }
        }
    };
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            ngModel.$formatters.push(formatter);
        }
    };
}]);


function PCv2Controller($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad,$timeout,$window) 
{
    $scope.flujo ={
        pasos:{
            paso0 : 'listaSolicitudes',
            paso1 : 'verificacion',
            paso2 : 'solicitudTramite',
            paso3 : 'parametrosEdificacion'
        },
        paso:'listaSolicitudes'
    }
    $scope.tablaSolicitudes = {};
    $scope.listaSolicitudes = [];

    $scope.tablaListaArquitectos = {};
    $scope.listaArquitectos = [];

    $scope.listaPredios = [];
    $scope.listaTipoTramite = [];
    $scope.textoBotones = {
        btnDelegar : 'Delegar trámite',
        btnRegistrar : 'Registrar trámite'
    }
    $scope.btnSaveSolicitud = $scope.textoBotones.btnRegistrar;
    $scope.predioSeleccionado = null;
    $scope.predioSeleccionadoPropietarios = [];
    $scope.solicitud = {

        nombreSolicitante:'',
        paternoSolicitante:'',
        maternoSolicitante:'',
        numeroDocumentoSol:'',
        expedido:'',
        tipoDocumento:0,
        emailSolicitante:'',
        telefonoSolicitante:'',
        tipoPersona: '',
        OID:null,
        idExpedido: null,

        direccion:'',
        anchoVia:null,
        codigoCatastral:null,
        distritoMunicipal:null,
        idDuplicado:null,
        idPendTerreno:null,
        lusu:null,
        macrodistrito:null,
        nombreVia:null,
        nroInmueble:null,
        nroPuerta:null,
        riesgoConstruccionLocalizacionCategoria:null,
        superficieReal:null,
        tipoVia:null,
        wkt:null,
        zona:null,

        idTipoTramite :0,
        arquitectoNombre:'',
        arquitectoRegistroNacionalCAB:'',
        arquitectoTelefono:'',
        arquitectoEmail:'',
        autorizacionEntregaDocumentos:null,
        autorizacionSeguimientoTramite:null,

        idFichaTecnica :0,
        idPCCartilla:0,
        categoriaPatrimonial:'',
        fechaEstimadaInicioObra:null,
        ALE:null,
        FML:null,
        AMCSotano:null,
        AMCSemisotano:null,
        AMCZocalo:null,
        AMCMezzanine:null,
        AMCTorre:null,
        AME:null,
        AMF:null,
        RMEFrontal:null,
        RMEFondo:null,
        RMELateralIzq:null,
        RMELateralDer:null,
        RMEFrontalZocalo:null,
        RMEFondoZocalo:null,
        RMELateralIzqZocalo:null,
        RMELateralDerZocalo:null,
        NMP:null,
        AMV:null,
        voladizo:null,
        incentivoDobleALE:null,
        incentivoRME:null,
        incentivoRMEZocalo:null,
        incentivoAMCSemisotano:null,
        incentivoAMCSotano:null,
        incentivoNMP:null,
        incentivoAMF:null,
        riesgoConstruccionResultado:null,
        idEstado:0,

        codigoMirador : null,
        descripcionMirador: null,
        codigoPlaza: null,
        descripcionPlaza: null,
        cPresidencialDistancia: null,
        cPresidencialAltura: null,
        telefericoConsolidado : null,
        telefericoColor : null,
        restriccionCH : null,
        restricciones : 0,
        pendienteVia : null
    }

    $scope.srcTutorial="../territorio/img/TramitePermisoConstruccion.png";
    
    /*$scope.inicio = function () 
    {
        $scope.setDatosSolicitante();
        $scope.getSolicitudes();
        $scope.getListaTipoTramite();
        $scope.getListaArquitectos();
        $scope.loginPagoEnLinea();
    }*/

    $scope.inicio = function () 
    { 
        $.blockUI({ css: {
                border: 'none',
                padding: '10px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            },message: "Espere un momento porfavor..." });
        setTimeout(function()
        {
            try{
                $scope.setDatosSolicitante();
                $scope.getSolicitudes();
                $scope.getListaTipoTramite();
                $scope.getListaArquitectos();
                $scope.getDireccionesSucursales();
                //$scope.loginPagoEnLinea();
            }catch(e)
            {
                console.log("error", e);
            }
         },500);
        /////////////////////
        //$scope.mostrarO1 = true;
        $scope.mostrarO2 = true;
        $scope.mostrarO3 = false;
        $scope.mostrarBotones = true;
        /////////////////////////

        
        $scope.servicioCatastral = {
            seleccionado : null,
            municipal:{
                titulo : "CERTIFICADO DE REGISTRO CATASTRAL MEDIANTE EL SERVICIO MUNICIPAL DE CATASTRO (PRESENCIAL)",
                codigo :"municipal",
                vistas:{
                    seleccionado:null,
                    guia:{
                        titulo:"GUÍA DE TRÁMITE",
                        codigo:"guiaE"
                    },
                }
            },
            externo:{
                titulo : "CERTIFICADO DE REGISTRO CATASTRAL MEDIANTE EL SERVICIO DE UN PROFESIONAL EXTERNO HABILITADO (EN LINEA)",
                codigo :"externo",
                vistas:{
                    seleccionado:null,
                    guia:{
                        titulo:"GUÍA DE TRÁMITE",
                        codigo:"guiaE"
                    },
                    tramites:{
                        titulo:"MIS TRÁMITES",
                        codigo:"tramitesE"
                    },
                    solicitar:{
                        titulo:"SOLICITAR TRÁMITE",
                        codigo:"solicitarE"
                    },
                }
            },
            acciones:{
                seleccionar:function (servicio) {
                    $scope.servicioCatastral.seleccionado =  angular.copy(servicio);
                    $scope.servicioCatastral.seleccionado.vistas.seleccionado =angular.copy($scope.servicioCatastral.seleccionado.vistas.guia);
                    if($scope.servicioCatastral.seleccionado.codigo == $scope.servicioCatastral.externo.codigo){
                        $scope.solicitud.acciones.establecerDatosTipoServicioyRegistro(3,1);//tipo servicio 3 externo, tipo registro 1 nuevo
                    }
                },
                seleccionarVista:function (vista) {
                    $scope.servicioCatastral.externo.vistas.seleccionado =  angular.copy(vista);
                    if(vista.titulo == "GUÍA DE TRÁMITE"){
                        $scope.cambiarPaso("listaSolicitudes");
                        //$scope.mostrarO1 = false;
                        $scope.mostrarO2 = true;
                        $scope.mostrarO3 = false;
                        $scope.mostrarBotones = true;
                    }
                    if(vista.titulo == "MIS TRÁMITES"){
                        $scope.cambiarPaso("listaSolicitudes");
                        //$scope.mostrarO1 = false;
                        $scope.mostrarO2 = false;
                        $scope.mostrarO3 = true;
                        $scope.mostrarBotones = true;
                    }
                    if(vista.titulo == "SOLICITAR TRÁMITE"){
                        //$scope.mostrarO1 = false;
                        $scope.mostrarO2 = false;
                        $scope.mostrarO3 = false;
                        $scope.mostrarBotones = true;
                        $scope.cambiarPaso("verificacion");
                    }
                }
            }
            
        }
   
    };

    $scope.mostarO = function(){
        
        //$scope.mostrarO1 = false;
        $scope.mostrarO2 = true;
        $scope.mostrarBotones = true;

        var servicio = {
            "titulo": "CERTIFICADO DE REGISTRO CATASTRAL MEDIANTE EL SERVICIO DE UN PROFESIONAL EXTERNO HABILITADO (EN LINEA)",
            "codigo": "externo",
            "vistas": {
                "seleccionado": null,
                "guia": {
                    "titulo": "GUÍA DE TRÁMITE",
                    "codigo": "guiaE"
                },
                "tramites": {
                    "titulo": "MIS TRÁMITES",
                    "codigo": "tramitesE"
                },
                "solicitar": {
                    "titulo": "SOLICITAR TRÁMITE",
                    "codigo": "solicitarE"
                }
            }
        };
        $scope.servicioCatastral.seleccionado =  angular.copy(servicio);
        $scope.servicioCatastral.externo.vistas.seleccionado =angular.copy($scope.servicioCatastral.externo.vistas.guia);
    };

    $scope.$on('api:ready',function(){
        $scope.setDatosSolicitante();
        $scope.getSolicitudes();
        $scope.getListaTipoTramite();
        $scope.getListaArquitectos();
        //$scope.loginPagoEnLinea();
    });

    //joao= $scope;
    $scope.setDatosSolicitante = function () {
        var datosCiudadano = new rcNatural();
        datosCiudadano.oid = sessionService.get('IDCIUDADANO');
        $scope.solicitud.OID = sessionService.get('IDCIUDADANO');
        datosCiudadano.datosCiudadanoNatural(function(resultado){
            var response = JSON.parse(resultado);
            if (response.length > 0) {
                var results = response;
                var tipoPersona = results[0].dtspsl_tipo_persona;
                if (tipoPersona == 'NATURAL') {
                    $scope.solicitud.nombreSolicitante = results[0].dtspsl_nombres;
                    $scope.solicitud.maternoSolicitante = results[0].dtspsl_materno;
                    $scope.solicitud.paternoSolicitante = results[0].dtspsl_paterno;
                    $scope.solicitud.numeroDocumentoSol = results[0].dtspsl_ci;
                    $scope.solicitud.expedido = results[0].dtspsl_expedido;
                    $scope.solicitud.tipoDocumento = 1;
                    $scope.solicitud.emailSolicitante = (results[0].dtspsl_correo != null?results[0].dtspsl_correo:'');
                    $scope.solicitud.telefonoSolicitante = (results[0].dtspsl_movil!=null ? results[0].dtspsl_movil:(results[0].dtspsl_telefono != null ? results[0].dtspsl_telefono:''));
                    $scope.solicitud.tipoPersona = 'NATURAL';
                    switch(results[0].dtspsl_expedido) {
                        case 'CHQ':
                            $scope.solicitud.idExpedido = 6;
                            break;
                        case 'LPZ':
                            $scope.solicitud.idExpedido = 1;
                            break;
                        case 'CBB':
                            $scope.solicitud.idExpedido = 2;
                            break;
                        case 'ORU':
                            $scope.solicitud.idExpedido = 4;
                            break;
                        case 'PTS':
                            $scope.solicitud.idExpedido = 5;
                            break;
                        case 'TJA':
                            $scope.solicitud.idExpedido = 7;
                            break;
                        case 'SCZ':
                            $scope.solicitud.idExpedido = 3;
                            break;
                        case 'BNI':
                            $scope.solicitud.idExpedido = 8;
                            break;
                        case 'PND':
                            $scope.solicitud.idExpedido = 9;
                            break;
                    }

                }
                else{
                    $scope.solicitud.nombreSolicitante = results[0].dtspsl_razon_social;
                    $scope.solicitud.maternoSolicitante = '';
                    $scope.solicitud.paternoSolicitante = '';
                    $scope.solicitud.numeroDocumentoSol  = results[0].dtspsl_nit;
                    $scope.solicitud.expedido = '';
                    $scope.solicitud.tipoDocumento = 7;
                    $scope.solicitud.emailSolicitante = (results[0].dtspsl_correo != null?results[0].dtspsl_correo:'');
                    $scope.solicitud.telefonoSolicitante = (results[0].dtspsl_movil!=null ? results[0].dtspsl_movil:(results[0].dtspsl_telefono != null ? results[0].dtspsl_telefono:''));
                    $scope.solicitud.tipoPersona = 'JURIDICO';
                    switch(results[0].dtspsl_expedido) {
                        case 'CHQ':
                            $scope.solicitud.idExpedido = 6;
                            break;
                        case 'LPZ':
                            $scope.solicitud.idExpedido = 1;
                            break;
                        case 'CBB':
                            $scope.solicitud.idExpedido = 2;
                            break;
                        case 'ORU':
                            $scope.solicitud.idExpedido = 4;
                            break;
                        case 'PTS':
                            $scope.solicitud.idExpedido = 5;
                            break;
                        case 'TJA':
                            $scope.solicitud.idExpedido = 7;
                            break;
                        case 'SCZ':
                            $scope.solicitud.idExpedido = 3;
                            break;
                        case 'BNI':
                            $scope.solicitud.idExpedido = 8;
                            break;
                        case 'PND':
                            $scope.solicitud.idExpedido = 9;
                            break;
                        default:
                            $scope.solicitud.idExpedido = 11;
                            break;
                    }
                }
            }
            else{
                swal('', 'Error al recuperar datos', 'error');
                console.log("Error no se encontraron los datos del ciudadano!!", sessionService.get('IDCIUDADANO'));
            }
        });
    }

    $scope.getSolicitudes = function () {
        //$.blockUI();
        var sNroDocCiudadano = sessionService.get('CICIUDADANO');
        if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
        {
            sNroDocCiudadano = sessionService.get('NITCIUDADANO');
        }
        var solicitud = new dataSITOL();
        solicitud.pcv2Lst(sNroDocCiudadano, function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.listaSolicitudes = resApi.success.dataSql;
                var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
                $scope.tablaSolicitudes.reload();
                $scope.verificarFum();
                $.unblockUI();
            }
            else
            {
                swal('', 'Error al recuperar datos de solicitudes', 'error');
                console.log("Error al obtener las solicitudes",resApi.error.message, resApi.error.code);
                $.unblockUI();
            }

        });
    }
    $scope.getSolicitudesUnico = function () {
        var sNroDocCiudadano = sessionService.get('CICIUDADANO');
        if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
        {
            sNroDocCiudadano = sessionService.get('NITCIUDADANO');
        }
        var solicitud = new dataSITOL();
        solicitud.pcSolicitudLst(  sNroDocCiudadano, function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.listaSolicitudes = resApi.success.dataSql;
                var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
                $scope.tablaSolicitudes.reload();
            }
            else
            {
                swal('', 'Error al recuperar datos de solicitudes único', 'error');
                console.log("Error al obtener las solicitudes único",resApi.error.message, resApi.error.code);
            }
        });
    }
    $scope.verificarFum = function () {
        for(var i = 0; i< $scope.listaSolicitudes.length; i++)
        {
            var solicitud =$scope.listaSolicitudes[i];
            if(solicitud.idEstado == 5)
            {
                $scope.vdplepago(solicitud);
            }
        }

    };

    $scope.vdplepago = function(objFum)
    {
        var idFum = objFum.fum;
        var formData = {
            'idfum':idFum
        };
        var idtoken =   sessionService.get('TOKEN');
        var stoquen =  'Bearer <\\\"' + idtoken + '\\\">';
        $.ajax({
            "async": true,
            type        : 'POST',
            //url         : 'https://pagonline.lapaz.bo/api/comprobantedepago',
            url         : 'https://pagonline.lapaz.bo/api/comprobante',
            data        : formData,
            dataType    : 'json',
            crossDomain : true,
            "headers": {
                "cache-control": "no-cache",
            },
            headers: {
                'authorization': stoquen
            },
            success     : function(data)
            {
                if(data.Resultado.idFum){
                    $scope.solActFumPagado(objFum);
                }
                else
                {
                    swal('', 'Error no se realizo el pago del Fum', 'error');
                    console.log("Error no se realizo el pago del Fum",data);
                }
            }
        });
    };
    $scope.solActFumPagado=function (objFum) 
    {
        var solicitud = new dataSITOL();
        solicitud.pcSolicitudActFumPagado(objFum.idFichaTecnica, function(resultado){
                var resApi = JSON.parse(resultado);
                if(resApi.success)
                {
                    $scope.getSolicitudesUnico();
                }
                else
                {
                    swal('', 'Error al Activar Fum pagado', 'error');
                    console.log("Error al act fum pagado",resApi.error.message,resApi.error.code);
                }
            });
    };
    $scope.tablaSolicitudes = new ngTableParams({
        page: 1,
        count: 4,
        filter: {},
        sorting: {
            fechaIngresoFormulario: 'desc'
        }
    }, {
        total: $scope.listaSolicitudes.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.listaSolicitudes, params.filter()) :
                $scope.listaSolicitudes;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.listaSolicitudes;
            params.total($scope.listaSolicitudes.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
    $scope.getListaTipoTramite = function () {
        var tipoTramite = new dataSITOL();
        tipoTramite.pcTipoTramiteLst(  function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.listaTipoTramite = resApi.success.dataSql;
            }
            else
            {
                swal('', 'Error en el listado de tipo tramite', 'error');
                console.log("Error en el listado de tipo tramite",resApi.error.message,resApi.error.code);
            }
        });
    }

    $scope.BuscarArquitecto = function () {
        $scope.RegistroItem = $filter('filter')($scope.listaArquitectos, {registroNacionalCAB:parseInt($scope.solicitud.arquitectoRegistroNacionalCAB)}, true)[0];
        //console.log($scope.RegistroItem);
		$scope.arquitectoCompleto = $scope.RegistroItem.arquitectoNombre;
        $scope.solicitud.arquitectoNombre=$scope.RegistroItem.arquitectoNombre;
        $scope.solicitud.arquitectoTelefono=$scope.RegistroItem.telefonoCelular;
        $scope.solicitud.arquitectoEmail=$scope.RegistroItem.correoElectronico;
    }
    $scope.BuscarArquitectoLimpiar = function () {
        $scope.tablaListaArquitectos.filter({});
        $scope.buscarArquitectoNombre = "";
    }
    $scope.getListaArquitectos = function () {
        var apiSIT = new dataSIT();
        apiSIT.pcListaArquitecto(function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.listaArquitectos = resApi.success.dataSql;

                var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
                $scope.tablaListaArquitectos.reload();
            }
            else
            {
                swal('', 'Error al recuperar la data de arquitectos', 'error');
                console.log("Error al recuperar la data de arquitectos",resApi.error.message,resApi.error.code);
            }
        });
    }

    $scope.getDireccionesSucursales = function () {
        var sitol = new dataSITOL();
        sitol.direccionesSucursales(function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.listaDireccionesSucursales = resApi.success.dataSql;
            }
            else
            {
                console.log("Error al recuperar las direcciones de sucursales",resApi.error.message,resApi.error.code);
            }
        });
        
    }

    $scope.tablaListaArquitectos = new ngTableParams({
        page: 1,
        count: 10,
        filter: {},
        sorting: {
            arquitectoNombre: 'asc'
        }
    }, {
        total: $scope.listaArquitectos.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.listaArquitectos, params.filter()) :
                $scope.listaArquitectos;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.listaArquitectos;
            params.total($scope.listaArquitectos.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.resetSolicitud = function () {
        $scope.solicitud.anchoVia=null;
        $scope.solicitud.codigoCatastral=null;
        $scope.solicitud.distritoMunicipal=null;
        $scope.solicitud.idDuplicado=null;
        $scope.solicitud.idPendTerreno=null;
        $scope.solicitud.lusu=null;
        $scope.solicitud.macrodistrito=null;
        $scope.solicitud.nombreVia=null;
        $scope.solicitud.nroInmueble=null;
        $scope.solicitud.nroPuerta=null;
        $scope.solicitud.riesgoConstruccionLocalizacionCategoria=null;
        $scope.solicitud.superficieReal=null;
        $scope.solicitud.superficieRealCatastro=null;
        $scope.solicitud.tipoVia=null;
        $scope.solicitud.wkt=null;
        $scope.solicitud.zona=null;
        $scope.solicitud.idTipoTramite = 1; //PC
        $scope.solicitud.arquitectoNombre='';
        $scope.solicitud.arquitectoRegistroNacionalCAB='';
        $scope.solicitud.arquitectoTelefono='';
        $scope.solicitud.arquitectoEmail='';
        $scope.solicitud.autorizacionEntregaDocumentos=null;
        $scope.solicitud.autorizacionSeguimientoTramite=null;
        $scope.solicitud.idFichaTecnica =0;
        $scope.solicitud.idPCCartilla=0;
        $scope.solicitud.categoriaPatrimonial='';
        $scope.solicitud.fechaEstimadaInicioObra=null;
        $scope.solicitud.ALE=null;
        $scope.solicitud.FML=null;
        $scope.solicitud.AMCSotano=null;
        $scope.solicitud.AMCSemisotano=null;
        $scope.solicitud.AMCZocalo=null;
        $scope.solicitud.AMCMezzanine=null;
        $scope.solicitud.AMCTorre=null;
        $scope.solicitud.AME=null;
        $scope.solicitud.AMF=null;
        $scope.solicitud.RMEFrontal=null;
        $scope.solicitud.RMEFondo=null;
        $scope.solicitud.RMELateralIzq=null;
        $scope.solicitud.RMELateralDer=null;
        $scope.solicitud.RMEFrontalZocalo=null;
        $scope.solicitud.RMEFondoZocalo=null;
        $scope.solicitud.RMELateralIzqZocalo=null;
        $scope.solicitud.RMELateralDerZocalo=null;
        $scope.solicitud.NMP=null;
        $scope.solicitud.AMV=null;
        $scope.solicitud.voladizo=null;
        $scope.solicitud.incentivoDobleALE=null;
        $scope.solicitud.incentivoRME=null;
        $scope.solicitud.incentivoRMEZocalo=null;
        $scope.solicitud.incentivoAMCSemisotano=null;
        $scope.solicitud.incentivoAMCSotano=null;
        $scope.solicitud.incentivoNMP=null;
        $scope.solicitud.incentivoAMF=null;
        $scope.solicitud.riesgoConstruccionResultado=null;
        $scope.solicitud.idEstado=0;
        $scope.solicitud.restricciones = null;
        $scope.predioSeleccionado = null;
        $scope.btnSaveSolicitud = $scope.textoBotones.btnRegistrar;

    }

    //Acciones - Inicio
    $scope.accionDescargarSolicitud = function (sol) {
        var urlFum = CONFIG.SERVICE_SITOLextgen + 'Territorio/GenerarSolicitudPDF?d=' + sol.pisol;
        window.open(urlFum,"_blank");
    }
	
    $scope.accionDescargarInformeObs = function () {        
        var urlFum = CONFIG.SERVICE_SITOLextgen + 'PermisoConstruccionV2/downloadDocumento?idInsFlujo=' + $scope.idInsFlujoRepo+'&idDocumento=438';//oficial
        window.open(urlFum,"_blank");
    };

	
    //Pago
    $scope.accionImprimirProforma = function (sol) {
        $scope.varSpin = true;
        $scope.RegistroFUM={
            registrado:'OK',
            mensaje:''
        };
        var urlFum = CONFIG.SERVICE_SITOLextgen + 'ApiTerritorio/DocumentoFum?q=' + sol.piif;
        $('#visorFum object').attr("data",urlFum);
        $timeout(function(){$scope.varSpin=false}, 1000);
    };
    
    $scope.loginPagoEnLinea   =   function()
    {
        var formData = {
            'usr_usuario'   : 'catastro',
            'usr_clave'     :   'catastro2016'
        };
        $.ajax({
            dataType: "json",
            type: "POST",
            url : 'https://pagonline.lapaz.bo/api/logueo',
            data: formData,
            async: false,
            success: function(response) {
                sessionService.set('TOKEN', response.token);
            },
            error: function (response, status, error) {
                dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
                console.log("Error en login pago en Linea", error);
            }
        });
    };

    $scope.accionPagoOL = function(sol){
        sessionService.set('IDFUM', sol.fum);
        window.location.href = "#servicios|epagos";
    };


    $scope.accionSeguimientoFlujoA = function(sol){
        $scope.idPCTramite = sol.idPCTramite;
        $scope.idInsFlujoRepo = sol.idInsFlujo;
        $.blockUI();
        var sit = new dataSIT();
        sit.seguimientoFlujoPCv2(sol.idInsFlujo, function(resultado){
            var resApi = JSON.parse(resultado);
            //console.log("sssssssssssss",resApi);
            if(resApi.success.dataSql.length>0){
                $scope.listaSeguimientoTareas = resApi.success.dataSql;
                $('#divPopupSeguimiento').modal('show');
                $.unblockUI();
            }
            else{
                $.unblockUI();
            }
        });
    };
	
    $scope.accionSeguimientoFlujo= function (sol) {
        $.blockUI();
        if(sol.piif)
        {
            var p = {q: sol.piif};
            $http({
                method: 'POST',
                url: CONFIG.SERVICE_SITOLextgen + 'ApiMotorFlujo/FlujoSeguimientoTarea',
                data: Object.toparams(p),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                if(data.res)
                {
                    swal('', 'Error al consultar seguimiento de trámite', 'error');
                    console.log("Error al consultar seguimiento de trámite", data);
                }
                else{
                    $('#seguimientoNroSolicitud').val(sol.idFichaTecnica);
                    $('#seguimientoTipoTramite').val('PERMISOS CONSTRUCCIÓN');
                    $scope.listaSeguimientoTareas = data;
                    $('#divPopupSeguimiento').modal('show');
                }
                $.unblockUI();
            }).error(function (data, status, headers, config) {
                swal('', 'Error en el flujo de seguimiento de trámite', 'error');
                console.log("Error en el flujo de seguimiento de trámite", data);
                $.unblockUI();
            });
        }
        else
        {
            swal('', 'Error en la accion de seguimiento de flujo de trámite', 'error');
            console.log("Error en la accion de seguimiento de flujo de trámite", sol);
        }
    }

    $scope.accionDelegarSolicitud = function (sol) {
        $scope.flujo.paso = $scope.flujo.pasos.paso2;
        $scope.getSolicitud(sol.idFichaTecnica);
    }

    function MouseWheelHandler(e) {
        // cross-browser wheel delta
        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        //myimage.style.width = Math.max(50, Math.min(800, myimage.width + (30 * delta))) + "px";

        //quitar comentarios para activar scroll
        //if(delta==1) $scope.zoomIn();  else $scope.zoomOut();
        return false;
    }
    $scope.scroll = 0;
    $scope.loading = 'loading';
    $scope.getNavStyle = function(scroll) {
        if(scroll > 100) return 'pdf-controls fixed';
        else return 'pdf-controls';
    };
    $scope.onError = function(error) {};
    $scope.onLoad = function() {
        $scope.loading = '';
    };
    $scope.onProgress = function(progress){};
    $scope.resetUrl=function (){
        $scope.pdfUrl = '../catastro/img/Default.pdf';
        var url = '../catastro/img/Default.pdf';
        //$('#PDFtoPrint').attr('src',url);
        $scope.RefreshUrl(url);
    };

    $scope.configCartilla = {
        urlTemplate : CONFIG.SERVICE_SITOLextgen + "Archivos/cartillas/distrito {distrito}/cartillas/{patron}.pdf",
        url : CONFIG.SERVICE_SITOLextgen + "Archivos/cartillas/distrito {distrito}/cartillas/{patron}.pdf",
        patron: null
    }

    $scope.pdfUrl = '../catastro/img/Default.pdf';
    $scope.accionVerDocumentoFinal = function (sol) {
        $('#divPopup7').modal('show');
        var myimage = document.getElementById("pdfView");
        if (myimage.addEventListener) {
            // IE9, Chrome, Safari, Opera
            myimage.addEventListener("mousewheel", MouseWheelHandler, false);
            // Firefox
            myimage.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        }
        // IE 6/7/8
        else myimage.attachEvent("onmousewheel", MouseWheelHandler);

        $scope.varSpin = true;
        $scope.resetUrl();
        var urlPreview  = CONFIG.SERVICE_SITOLextgen + 'ApiTerritorio/DocumentoFinalPC?q=' + sol.piif;
        $scope.RefreshUrl(urlPreview);
        $timeout(function(){$scope.varSpin=false}, 2800);
        $scope.fit();
    };
    $scope.accionVerDocumentoFinalImagen = function (sol) {
        $('#divPopupDocFinal').modal('show');
        $scope.docFinalImagen = CONFIG.SERVICE_SITOLextgen + 'ApiTerritorio/DocumentoFinalPCImagen?q=' + sol.piif;
    };
    $scope.accionVerPlano = function (sol) {
        var urlFum = CONFIG.SERVICE_SITOLextgen + 'ApiTerritorio/DocumentoPlano?q=' + sol.piif;
        window.open(urlFum,"_blank");
    };

    //Acciones - Fin

    $scope.visorIframe ={
        url:null,
        titulo:null,
        texto:null
    }
    $scope.visorIframeCambiarModelo = function (superficie,anchoVia, nroPlantas) {
        $scope.visorIframe.url = "https://sitservicios.lapaz.bo/sit/LUSU/modelo_lusu2.html?pisos=xpisos&anchoVia=xanchovia&superficie=xsuperficie";//produccion
        $scope.visorIframe.url = $scope.visorIframe.url.replace("xpisos",nroPlantas).replace("xanchovia",anchoVia).replace("xsuperficie",superficie)
        $scope.visorIframe.titulo = "Modelo 3D";
        $scope.visorIframe.texto = "Modelo generado en función a la superficie del predio y número máximo de plantas. <b style='color: red'>Modelo Referencial</b>";
        $('#visorIframe').attr('src', $scope.visorIframe.url);
        //$('#visorIframe').reload();
        
    }
    $scope.visorIframeCambiarMapa = function (codigoCatastral) {
        //$scope.visorIframe.url = "http://gmlpsr0038:8080/Proyectos2017/LUSU/MapaLUSU.html?codcat=xcodcat";
        //$scope.visorIframe.url = "http://sitservicios.lapaz.bo/sit/LUSU/MapaLUSU.html?codcat=xcodcat";
		$scope.visorIframe.url = "https://sitservicios.lapaz.bo/sit/LUSU/MapaLUSU.html?codcat=xcodcat";
        $scope.visorIframe.url = $scope.visorIframe.url.replace("xcodcat",codigoCatastral);
        window.open($scope.visorIframe.url, "_blank");

        //$('#visorIframe').attr('src', $scope.visorIframe.url);
        //$('#visorIframe').reload();
    }

    
    //Flujo local
    $scope.cambiarPaso = function (paso) {
        switch(paso)
        {
            case $scope.flujo.pasos.paso0:
                $('html, body').animate({ scrollTop: 0 }, 750);
                $scope.resetSolicitud();
                $scope.flujo.paso = paso;
                var t = {"titulo": "GUÍA DE TRÁMITE","codigo": "guiaE"};
                //////////////////////////////
                //$scope.mostrarO1 = false;
                $scope.mostrarO2 = true;
                $scope.mostrarO3 = false;
                $scope.mostrarBotones = true;
                //////////////////////////////
                break;
            case $scope.flujo.pasos.paso1:
                $scope.resetSolicitud();
                $scope.getListaPredios();
                $scope.flujo.paso = paso;
                break;
            case $scope.flujo.pasos.paso2:
                $('html, body').animate({ scrollTop: 0 }, 1250);
                $scope.flujo.paso = paso;
                break;
            case $scope.flujo.pasos.paso3:
                //$scope.saveSolicitud();
                //$scope.flujo.paso = $scope.flujo.pasos.paso0;
                break;
        }
    }

    //Paso 1 funciones
    $scope.getListaPredios = function () {
        $.blockUI();
        $scope.listaPredios = [];
        var sNroDocCiudadano = sessionService.get('CICIUDADANO');
        if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
        {
            sNroDocCiudadano = sessionService.get('NITCIUDADANO');
        }
        var busCodCat = new dataSIT();
        busCodCat.dplLstCC( sNroDocCiudadano,function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.listaPredios = resApi.success.dataSql;
                $.unblockUI();
            }
            else
            {
                swal('', 'Error al obtener la lista de predios', 'error');
                console.log("Error al obtener la lista de predios",resApi.error.message,resApi.error.code);
                $.unblockUI();
            }
        });
    };

    //Paso 1.5 funciones (Seleccion de predio)
    $scope.setPredioSeleccionado = function (objPredio) {
        var solicitud = new dataSITOL();
        solicitud.pcv2EnviosArquitecto(
            objPredio.CodigoCatastral
            , function(resultado){
                var resApi = JSON.parse(resultado);
                if(resApi.success.dataSql[0].sw == 0){
                    var sit = new dataSIT();
                    sit.tramitesEnCurso(objPredio.CodigoCatastral, function(resultado){
                        var resApi = JSON.parse(resultado);
                        if(resApi.success.dataSql.length>0){
                            swal('', 'El predio seleccionado ('+  objPredio.CodigoCatastral +') ya tiene un trámite vigente', 'error');
                        }
                        else{
                            $scope.predioSeleccionado = objPredio;
                            $scope.getPredio($scope.predioSeleccionado.CodigoCatastral);
                        }
                    });
                    //$scope.predioSeleccionado = objPredio;
                    //$scope.getPredio($scope.predioSeleccionado.CodigoCatastral);
                }
                else{
                    var solicitud = new dataSITOL();
                    solicitud.nroEnviosArquitectoPCv2(
                        function(resultado){
                            var resApi = JSON.parse(resultado);
                            swal('', 'Solo se puede delegar '+  resApi.success.dataSql[0].nro +' solicitud por día, para este predio.', 'error');
                    });
                }
        });
    }
    

	
    $scope.getPredio = function (codCat) {
        $.blockUI();
        $('html, body').animate({ scrollTop: 800 }, 1750);
        $scope.predioSeleccionadoPropietarios = [];
        var predio = new dataSIT();
        predio.pcPrediosConsolidado( codCat,function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                if(resApi.success.dataSql.length == 1) {
                    //Control de planimetria //Autor: JFC: Fecha:2021 07 06
                    if(resApi.success.dataSql[0].codPlanimetria == null){
                        $scope.predioSeleccionado = null;
                        if(resApi.success.dataSql[0].idPCCartilla == null){
                            swal('', 'El predio seleccionado ('+  codCat +') no se encuentra dentro de una planimetría aprobada y no cuenta con Cartilla.\n\nDebe apersonarse a la Dirección de Administración Territorial en el Piso 6 del Edificio Tobía, ubicado en la calle Potosí esq. Colon,  para recibir mayor información.', 'error');
                            console.log("El predio no tiene planimetria:" + codCat);
                        }
                        else{
                            swal('', 'El predio seleccionado ('+  codCat +') no se encuentra dentro de una planimetría aprobada.\n\nDebe apersonarse a la Dirección de Administración Territorial en el Piso 6 del Edificio Tobía, ubicado en la calle Potosí esq. Colon,  para recibir mayor información.', 'error');
                            console.log("El predio no tiene planimetria:" + codCat);
                        }
                        
                    }
                    else{
                        if(resApi.success.dataSql[0].idPCCartilla == null){
                            $scope.predioSeleccionado = null;
                            swal('', 'El predio seleccionado ('+  codCat +') no cuenta con Cartilla.', 'error');
                        }
                        else{
                            $scope.getPredioPropietarios($scope.predioSeleccionado.CodigoCatastral);
                            $scope.setSolicitudDatosPredio(resApi.success.dataSql[0]);
                        }
                        
                    }
                }
                else if(resApi.success.dataSql.length == 0){
                    if(codCat.substring(codCat.length - 4) == '0000'){
                        $scope.predioSeleccionado = null;
                        swal('', 'El código Catastral '+ codCat +' no tiene un Patrón de Asentamiento o Cartilla de Uso de Suelo.', 'error');
                        console.log("Error no se encontró el predio con Cód Catastral:" + codCat);
                    }
                    else{
                        $scope.predioSeleccionado = null;
                        swal('', 'El código Catastral '+ codCat +' corresponde a una Unidad.', 'error');
                    }
                }
                else{
                    /*
                    $scope.predioSeleccionado = null;
                    //swal('', 'Error se encontró más de un registro con el mismo Código Catastral: '+ codCat +' en la tabla consolidada', 'error');
                    swal('', 'El código Catastral '+ codCat +' tiene más de un Patrón de Asentamiento o Cartilla de Uso de Suelo.\n\nDebe verificar el mismo en la Unidad de Desarrollo Urbano y Rural (DPE-UDOUR, Calle Potosí esquina Colón, Edificio Tobia, Piso 7)', 'error');
                    console.log("Error se encontró más de un registro con el mismo Código Catastral:" + codCat);
                    */
                    ////////////////////////////////////////////////////////////////////////////////
                    $scope.nroCartillas = 0;
                    var count = -1;
                    var i = 0;
                    var long =  resApi.success.dataSql.length;
                    resApi.success.dataSql.forEach(element => {
                        i = i + 1;
                        count = count+1;
                        if(element.codPlanimetria!=null && element.idPCCartilla!=null)
                        {
                             id = count;
                             $scope.nroCartillas = $scope.nroCartillas + 1;
                        }
                        if(i == long){
                            $scope.getPredioPropietarios($scope.predioSeleccionado.CodigoCatastral);
                            $scope.setSolicitudDatosPredio(resApi.success.dataSql[id]);
                        }
                    });
                    ////////////////////////////////////////////////////////////////////////////////
                    
                }
                $.unblockUI();
            }
            else
            {
                $.unblockUI();
                $scope.predioSeleccionado = null;
                swal('', 'Error al recuperar datos predios', 'error');
                console.log("Error al recuperar datos predios",resApi.error.message,resApi.error.code);
            }
        });
    };	

    $scope.setSolicitudDatosPredio = function (data) {
        $scope.solicitud.codigoCatastral = data.codigoCatastral;
        $scope.solicitud.macrodistrito = data.macrodistrito;
        $scope.solicitud.zona = data.zona;
        $scope.solicitud.tipoVia = data.tipoVia;
        $scope.solicitud.nombreVia = data.nombreVia;
        $scope.solicitud.anchoVia = data.anchoVia;
        $scope.solicitud.nroPuerta = data.nroPuerta;
        $scope.solicitud.direccion = data.direccion;
        $scope.solicitud.nroInmueble = data.nroInmueble;
        $scope.solicitud.superficieReal = data.superficieReal;
        $scope.solicitud.superficieRealCatastro = data.superficieReal;
        $scope.solicitud.idPendTerreno = data.idPendTerreno;
        $scope.solicitud.riesgoConstruccionLocalizacionCategoria = data.zonaRiesgo;
        $scope.solicitud.lusu = data.cartillaLusu;
        $scope.solicitud.distritoMunicipal = data.DistritoMunicipal;
        $scope.solicitud.idPCCartilla = data.idPCCartilla;
        $scope.solicitud.pendTerreno = data.pendTerreno;
        if(data.pendienteViaEIV)
            $scope.solicitud.pendienteVia = data.pendienteViaEIV;
        else
            $scope.solicitud.pendienteVia = 0;
        $scope.solicitud.codigoMirador = data.codigoMirador;
        $scope.solicitud.descripcionMirador = data.descripcionMirador;
        $scope.solicitud.codigoPlaza = data.codigoPlaza;
        $scope.solicitud.descripcionPlaza = data.descripcionPlaza;
        $scope.solicitud.cPresidencialDistancia = data.cPresidencialDistancia;
        $scope.solicitud.cPresidencialAltura = data.cPresidencialAltura;
        $scope.solicitud.telefericoConsolidado = data.telefericoConsolidado;
        $scope.solicitud.telefericoColor = data.telefericoColor;
        $scope.solicitud.restricciones = 0;
        $scope.solicitud.patronLusu = data.patronLusu;
        $scope.solicitud.instLegalPat = data.instLegalPat;

        //Restriccion predio sin cartilla
        if (data.idPCCartilla == null) { //
            $scope.solicitud.restriccionSinCartilla = 1;
        } else {
            $scope.solicitud.restriccionSinCartilla = 0;
        }
        //Restriccion predio PUC
        if (data.idPCCartilla >= 179 && data.idPCCartilla <= 185) {
            $scope.solicitud.restriccionPUC = 1;
        } else {
            $scope.solicitud.restriccionPUC = 0;
        }

        if (data.patronLusu == "CH1" || data.patronLusu == "CH2" || data.patronLusu == "CH3" || data.patronLusu == "CH4" || data.patronLusu == "CH"){
            $scope.solicitud.restriccionCH = 1;
        }
        else{
            $scope.solicitud.restriccionCH = 0;
        }

        if ( $scope.nroCartillas > 1 || data.codigoMirador != null || data.codigoPlaza != null || data.cPresidencialDistancia != null || data.cPresidencialAltura != null || data.telefericoColor != null || $scope.solicitud.restriccionCH == 1 || data.instLegalPat != null || $scope.solicitud.restriccionSinCartilla == 1 || $scope.solicitud.restriccionPUC == 1)
        {
            $scope.solicitud.restricciones = 1;
        }
        $scope.configCartilla.patron = $scope.solicitud.lusu;        
		$scope.configCartilla.url = $scope.configCartilla.urlTemplate.replace('{distrito}',data.distritoUSPA).replace('{patron}',data.patronLusu);
        $scope.getAlturasMaximas($scope.solicitud.idPCCartilla,$scope.solicitud.anchoVia);
    }

    $scope.getPredioPropietarios = function (codCat) {
        $.blockUI();
        $scope.predioSeleccionadoPropietarios = [];
        var predio = new dataSIT();
        predio.pcPredio( codCat,"C2",function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.predioSeleccionadoPropietarios = resApi.success.dataSql;
                $.unblockUI();
            }
            else
            {
                swal('', 'Error al obtener el predio propietarios', 'error');
                console.log("Error al obtener el predio propietarios",resApi.error.message,resApi.error.code);
                $.unblockUI();
            }
        });
    };

    $scope.getAlturasMaximas = function (idPCCartilla, anchoVia) {
        $scope.solicitud.cantidadMaxPlantas = null;
        $scope.solicitud.cantidadMaxPlantasIncentivo = null;
        var sitol = new dataSITOL();
        sitol.pcLusuParametrosAlturaMaxima( idPCCartilla, anchoVia, function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                if(resApi.success.dataSql.length > 0) {
                    var data = resApi.success.dataSql[0];
                    $scope.solicitud.cantidadMaxPlantas = data.cantidadMaxPlantas;
                    $scope.solicitud.cantidadMaxPlantasIncentivo = data.cantidadMaxPlantasIncentivo;
                }
            }
            else
            {
                console.log("Error al obtener las alturas maximas", resApi.error.message);
            }
        });


    };

    //Paso 2 funciones
    $scope.setSolicitudArquitecto = function (arqui) {
        $scope.solicitud.arquitectoNombre = arqui.arquitectoNombre;
        $scope.solicitud.arquitectoRegistroNacionalCAB = arqui.registroNacionalCAB;
        $scope.solicitud.arquitectoTelefono = arqui.telefonoCelular;
        $scope.solicitud.arquitectoEmail = arqui.correoElectronico;
        $scope.cambiarTextoBtnSolicitud();
    }

    $scope.saveUpdateSolicitud= function () {
        if($scope.solicitud.idFichaTecnica != null && $scope.solicitud.idFichaTecnica > 0){
            $scope.updateSolicitud();
        }
        else{
            $scope.saveSolicitud();
        }
    }

    $scope.saveSolicitud = function () {
        $.blockUI({ 
            css: {
                border: 'none',
                padding: '10px',
                backgroundColor: '#000','-webkit-border-radius': '10px','-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            },
            message: "Espere un momento porfavor..." 
        });
        
        if($scope.solicitud.arquitectoNombre != null & $scope.solicitud.arquitectoNombre != "")
        {
            $scope.solicitud.idEstado = 2; //Delegacion de tramite
        }
        else
        {
            $scope.solicitud.idEstado = 1; //registro de tramite
        }

        // if($scope.solicitud.arquitectoNombre == undefined)
        //     $scope.solicitud.arquitectoNombre = "";
        // if($scope.solicitud.arquitectoRegistroNacionalCAB == undefined)
        //     $scope.solicitud.arquitectoRegistroNacionalCAB = "";
        // if($scope.solicitud.arquitectoEmail == undefined)
        //     $scope.solicitud.arquitectoEmail = "";
        // if($scope.solicitud.arquitectoTelefono == undefined)
        //     $scope.solicitud.arquitectoTelefono = "";
        var solicitud = new dataSITOL();
        solicitud.pcv2Solicitud(
            $scope.solicitud.macrodistrito,
            $scope.solicitud.distritoMunicipal,
            //$scope.solicitud.lusu,
            $scope.solicitud.codigoCatastral,
            $scope.solicitud.nombreSolicitante,
            $scope.solicitud.paternoSolicitante,
            $scope.solicitud.maternoSolicitante,
            $scope.solicitud.numeroDocumentoSol,
            $scope.solicitud.tipoDocumento,
            $scope.solicitud.expedido,
            $scope.solicitud.telefonoSolicitante,
            $scope.solicitud.emailSolicitante,
            $scope.solicitud.arquitectoRegistroNacionalCAB,
            $scope.solicitud.arquitectoNombre,
            $scope.solicitud.arquitectoEmail,
            $scope.solicitud.OID,
            $scope.solicitud.idPCCartilla,
            $scope.solicitud.direccion,
            $scope.solicitud.nroInmueble,
            $scope.solicitud.idExpedido
            , function(resultado){
                var resApi = JSON.parse(resultado);
                if(resApi.success)
                {
                    $scope.flujo.paso = $scope.flujo.pasos.paso0;
                    $scope.getSolicitudes();
                    if(resApi.success.dataSql[0].d && resApi.success.dataSql[0].d != 'OK')
                    {
                        $scope.sendCorreoDelegado(resApi.success.dataSql[0].d);
                        /////////////////////////////////////////////FSA
                        $scope.cambiarPaso("listaSolicitudes");
                        //$scope.mostrarO1 = false;
                        $scope.mostrarO2 = false;
                        $scope.mostrarO3 = true;
                        $scope.mostrarBotones = true;
                        ////////////////////////////////////////////////
                    }
                    else if(resApi.success.dataSql[0].d && resApi.success.dataSql[0].d == 'OK')
                    {
                        $.unblockUI();
                        swal('', 'registro correcto','success');
                    }
                    else{
                        console.log("Error al guardar la solicitud",resApi.error.message,resApi.error.code);
                        swal('', 'Error guardar la solicitud','error');
                    }
                }
                else
                {
                    $scope.flujo.paso = $scope.flujo.pasos.paso0;
                    $scope.getSolicitudes();
                    swal('', 'Error guardar la solicitud', 'error');
                    $.unblockUI();
                    console.log("Error al guardar",resApi.error.message,resApi.error.code);
                }
        });
    }

    $scope.updateSolicitud = function () {
        $.blockUI();
        if($scope.solicitud.arquitectoNombre != null & $scope.solicitud.arquitectoNombre != "")
        {
            $scope.solicitud.idEstado = 2; //Delegacion de tramite
        }
        else
        {
            $scope.solicitud.idEstado = 1; //registro de tramite
        }

        if($scope.solicitud.arquitectoNombre == undefined)
            $scope.solicitud.arquitectoNombre = "";
        if($scope.solicitud.arquitectoRegistroNacionalCAB == undefined)
            $scope.solicitud.arquitectoRegistroNacionalCAB = "";
        if($scope.solicitud.arquitectoEmail == undefined)
            $scope.solicitud.arquitectoEmail = "";
        if($scope.solicitud.arquitectoTelefono == undefined)
            $scope.solicitud.arquitectoTelefono = "";

        var solicitud = new dataSITOL();
        solicitud.pcSolicitudAct(
        $scope.solicitud.idFichaTecnica,
        $scope.solicitud.idTipoTramite,
        $scope.solicitud.macrodistrito,
        $scope.solicitud.distritoMunicipal,
        $scope.solicitud.lusu,
        //$scope.solicitud.superficieReal,
        $scope.solicitud.superficieRealCatastro,
        $scope.solicitud.codigoCatastral,
        $scope.solicitud.nombreSolicitante,
        $scope.solicitud.paternoSolicitante,
        $scope.solicitud.maternoSolicitante,
        $scope.solicitud.numeroDocumentoSol,
        $scope.solicitud.tipoDocumento,
        $scope.solicitud.expedido,
        $scope.solicitud.telefonoSolicitante,
        $scope.solicitud.emailSolicitante,
        $scope.solicitud.arquitectoNombre,
        $scope.solicitud.arquitectoRegistroNacionalCAB,
        $scope.solicitud.arquitectoEmail,
        $scope.solicitud.arquitectoTelefono,
        $scope.solicitud.autorizacionEntregaDocumentos,
        $scope.solicitud.autorizacionSeguimientoTramite,
        $scope.solicitud.riesgoConstruccionLocalizacionCategoria,
        $scope.solicitud.idPendTerreno,
        $scope.solicitud.anchoVia,
        $scope.solicitud.idEstado,
        $scope.solicitud.idPCCartilla,
        $scope.solicitud.pendienteVia
        , function(resultado){

            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                if(resApi.success.dataSql[0].d)
                {
                    if(resApi.success.dataSql[0].d != 'OK')
                    {
                        //enviar correo al arquitecto
                        $scope.sendCorreoDelegado(resApi.success.dataSql[0].d);
                    }
                    else
                    {
                        $.unblockUI();
                        $scope.getSolicitudes();
                        swal('', 'Solicitud actualizada correctamente', 'success');
                    }
                    $scope.flujo.paso = $scope.flujo.pasos.paso0;
                    //$scope.getSolicitudes();
                }
                else {
                    $.unblockUI();
                    swal('', 'Error al actualizar solicitud', 'error');
                    console.log("Error al actualizar solicitud", resApi);
                }

            }
            else
            {
                $.unblockUI();
                console.log("Error al guardar solicitud",resApi.error.message,resApi.error.code);
            }
        });
    }

    $scope.sendCorreoDelegado = function (param) {
        $.blockUI({ 
            css: {
                border: 'none',
                padding: '10px',
                backgroundColor: '#000','-webkit-border-radius': '10px','-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            },
            message: "Espere un momento porfavor..." 
        });
        var p = {q: param};
        $http({
            method: 'POST',
            url: CONFIG.SERVICE_SITOLextgen + 'PermisoConstruccionV2/PCv2EnvioCorreo',
            data: Object.toparams(p),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            $.unblockUI();
            if(data.res == "OK")
            {
                $scope.getSolicitudes();
                $scope.registrarIGOB(param);
                swal('', 'El registro se realizó correctamente y se envió un correo electrónico al arquitecto ' + $scope.arquitectoCompleto + ', con la ruta de acceso al formulario de solicitud. La solicitud será atendida por el GAMLP una vez que el arquitecto envíe el formulario con todos los datos y requisitos requeridos.', 'success');
            }
            else
            {
                swal('', 'Error al enviar correo', 'error');
                console.log("Error al enviar correo",data);
            }
        }).error(function (data, status, headers, config) {
            swal('', 'Error al enviar correo', 'error');
            console.log("Error al enviar correo",data, status, headers, config);
        });
    };

    $scope.cambiarTextoBtnSolicitud = function () {
        if($scope.solicitud.arquitectoNombre != null & $scope.solicitud.arquitectoNombre != "")
        {
            $scope.btnSaveSolicitud = $scope.textoBotones.btnDelegar;
        }
        else
        {
            $scope.btnSaveSolicitud = $scope.textoBotones.btnRegistrar;
        }
    }

    $scope.validarFormularioSolicitud = function () {
        var disabled = true;
        if($scope.solicitud.idTipoTramite == null || $scope.solicitud.idTipoTramite == 0){
            disabled = true;
        }
        else {
            if($scope.solicitud.idTipoTramite == 1){
                if($scope.solicitud.arquitectoNombre != null & $scope.solicitud.arquitectoNombre != ""){
                    //Si se tiene el nombre del arquitecto debe haber tambine los otros datos
                    var arqDatosFaltantes = $scope.solicitud.arquitectoTelefono == null || $scope.solicitud.arquitectoTelefono == ""
                                            || $scope.solicitud.arquitectoEmail == null || $scope.solicitud.arquitectoEmail == ""
                                            || $scope.solicitud.arquitectoRegistroNacionalCAB == null || $scope.solicitud.arquitectoRegistroNacionalCAB == "";
                    disabled = arqDatosFaltantes;
                }
                else{
                    disabled = false;
                }
            }
            else{
                disabled = false;
            }
        }
        return disabled;
    }

    // ******INICIO DE CAPCHA****************
    $scope.ErrorCapcha='';
    $scope.getlimpiareRROR=function(){
        $scope.ErrorCapcha='';
    };
    $scope.getCaptchasX=function(){
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function(resultado){
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero = partes[0].substring(1);
            i1=(partes[2]+ "," + partes[3]);
            i2=(partes[4] + "," + partes[5]);
            document.getElementById('img2').src = i1.substring(1, i1.length - 1);
            document.getElementById('img1').src = i2.substring(1, i2.length - 2);
            var lengua = "";
            if(partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if(partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if(partes[1] == 'G'){
                lengua = 'GUARANI';
            } else if(partes[1] == 'C'){
                lengua = 'CASTELLANO';
            } else {
                console.log("Error CaptchasX", partes[1]);
            }
            document.getElementById('img1').title = "Palabra en " + lengua;
            document.getElementById('resultadoC').value = "";
            document.getElementById('resultadoC').placeholder = "Ingrese texto: " + lengua + " CASTELLANO";
            document.getElementById('lbllengua').placeholder = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };
    $scope.VerificarCapcha = function(){
        var captch  = $("#resultadoC").val();
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
            if(json.success[0] == undefined){
                $scope.getCaptchasX();
                $scope.resultadoC="";
                //swal('Capcha incorrecto','', 'error');
                $scope.ErrorCapcha='Vuelva registrar el capcha';
            }else{
                $('#divPopupCaptcha').modal('hide');
                $scope.saveUpdateSolicitud();
            }
        });
    };
    // ******FIN DE CAPCHA****************



    //No utilizadas
    $scope.getPredioRiesgo = function (wkt) {
        var predio = new dataSIT();
        predio.pcPredioRiesgo( wkt,function(resultado){
            var resApi = JSON.parse(resultado);
            //joao = resApi;
            if(resApi.success)
            {
                if(resApi.success.dataGeo.features.length == 1)
                {
                    $scope.solicitud.riesgoConstruccionLocalizacionCategoria = resApi.success.dataGeo.features[0].properties.GRADO;
                }
                else if(resApi.success.dataGeo.features.length == 0)
                {
                    //REVISAR LOGICA
                    console.log("Error no se encontro espacialmente el riesgo del predio wkt:" + wkt);
                }
                else
                {
                    //REVISAR LOGICA
                    console.log("Error se encontraron mas zonas de riesgo para el predio wkt:" + wkt);
                }
            }
            else
            {
                //REVISAR LOGICA
                console.log("Error al ubicar espacialmente el riesgo del predio wkt:" + wkt);
            }
        });

    }
    $scope.getPredioLUSU = function (wkt) {
        var predio = new dataSIT();
        predio.pcPredioLUSU( wkt,function(resultado){
            var resApi = JSON.parse(resultado);
            //joao = resApi;
            
            if(resApi.success)
            {
                if(resApi.success.dataGeo.features.length == 1)
                {
                    $scope.solicitud.lusu = resApi.success.dataGeo.features[0].properties.uspa_fina + " - d" + resApi.success.dataGeo.features[0].properties.distrito;
                    $scope.solicitud.distritoMunicipal = resApi.success.dataGeo.features[0].properties.distrito;

                }
                else if(resApi.success.dataGeo.features.length == 0)
                {
                    //REVISAR LOGICA
                    console.log("Error no se encontro espacialmente el lusu del predio wkt:" + wkt);
                }
                else
                {
                    //REVISAR LOGICA
                    console.log("Error no se encontraron mas zonas de lusu para el predio wkt:" + wkt);
                }
            }
            else
            {
                //REVISAR LOGICA
                console.log("Error al ubicar espacialmente el lusu del predio wkt:" + wkt);
            }
            
        });

    }

    //Paso 3 Parametros de edificacion
    $scope.setSolicitudParametrosEdificacion = function (sol) {
        $scope.flujo.paso = $scope.flujo.pasos.paso3;
        $scope.getSolicitud(sol.idFichaTecnica);
    }

    function CopiarValoresObjeto(objOrigen,objDestino) {
        for (var property in objOrigen)
        {
            objDestino[property] = objOrigen[property];
        }
    }
    $scope.getSolicitud = function (idFichaTecnica) {
        var sol = new dataSITOL();
        sol.pcSolicitudGet( idFichaTecnica, function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                CopiarValoresObjeto(resApi.success.dataSql[0], $scope.solicitud);
                $scope.cambiarTextoBtnSolicitud();
                //$scope.getLusuParametros($scope.solicitud.lusu);
                //$scope.getLusuParametros('CH - d1 Pre. Morfológico');
                ALEPredio = $scope.solicitud.superficieReal; //100;//
                idCartilla = $scope.solicitud.idPCCartilla;
                AnchoVia = $scope.solicitud.anchoVia; //9;//
                //patron = $scope.solicitud.lusu; //'5Z - d1';//
                $scope.solicitud.ALE = $scope.solicitud.superficieReal;
                $scope.getCargarCartilla(idCartilla,AnchoVia,ALEPredio);
            }
            else
            {
                console.log("Error al obtener la solicitud", resApi.error.message);
            }
        });
    }

    $scope.cambiarCartilla = function () {
        ALEPredio = $scope.solicitud.ALE;
        idCartilla = $scope.solicitud.idPCCartilla;
        AnchoVia = $scope.solicitud.anchoVia;
        //joao = $scope.solicitud.ALE;
        $scope.getCargarCartilla(idCartilla,AnchoVia,ALEPredio);
    }
    //$scope.getCargarCartilla = function (idPCCartilla, AnchoVia, ALEPredio) {
    $scope.getCargarCartilla = function (idPCCartilla, anchoVia,  ALEPredio) {

        var sitol = new dataSITOL();
        sitol.pcLusuParametrosCompleto( idPCCartilla, anchoVia, function(resultado){
            var resApi = JSON.parse(resultado);

            if(resApi.success)
            {
                var data = resApi.success.dataSql[0];
                //==========================================================>DATOS CARTILLA
                $scope.idPCCartilla = data.idPCCartilla;
                $scope.zona = data.zona;
                $scope.patron = data.patron;
                $scope.cartilla = data.zona + ' ' + data.patron;

                //Datos del patrón
                $scope.ALE = data.ALE;
                $scope.FML = data.FML;
                $scope.AMC = data.AMC;
                $scope.AMCSotano = data.AMCSotano;
                $scope.AMCSemisotano = data.AMCSemisotano; $scope.valor1 = data.AMCSemisotano;
                $scope.AMCZocalo = data.AMCZocalo;
                $scope.AMCTorre = data.AMCTorre; $scope.valor2 = data.AMCTorre;
                $scope.AMCMezzanine = data.AMCMezzanine;
                $scope.AME = data.porcentajeALE;
                $scope.AMF = data.alturaMaximaFachada;
                $scope.frontal = data.frontal;
                $scope.fondo = data.fondo;
                $scope.laterales = data.laterales;
                $scope.frontalOpcional = data.frontalOpcional;
                $scope.fondoOpcional = data.fondoOpcional;
                $scope.lateralesOpcional = data.lateralesOpcional;
                $scope.opcionalLimiteMin = data.opcionalLimiteMin;
                $scope.opcionalLimiteMax = data.opcionalLimiteMax;
                $scope.frontalReferencia = data.frontalReferencia;
                $scope.fondoReferencia = data.fondoReferencia;
                $scope.lateralesReferencia = data.lateralesReferencia;
                $scope.zocaloFrontal = data.zocaloFrontal;
                $scope.zocaloFondo = data.zocaloFondo;
                $scope.zocaloLaterales = data.zocaloLaterales;
                $scope.MensajeNMP = "Una unidad por cada " + data.NMP + " m² de AME";
                $scope.NMP = data.NMP;
                $scope.AMV = data.AMV;
                $scope.Voladizo = data.anchoVoladizo;
                //Patron + incentivos
                $scope.AMCSemisotanoPI = data.AMCSemisotano;
                $scope.AMCTorrePI = data.AMCTorre;

                $scope.incentivoAMCIncremento = data.incentivoAMCIncremento;
                $scope.incentivoAMCPorcentaje = data.incentivoAMCPorcentaje;
                $scope.incentivoRME = data.incentivoRME;
                if ((ALEPredio >= 2 * $scope.ALE)&&($scope.incentivoAMCIncremento!=-1))
                {
                    $scope.AMEPI = data.porcentajeALE + 100;
                    $scope.MensajeDobleALE = "AME con incremento de 100% de ALE por lote con doble ALE";
                    $scope.MensajeAMFAnchoVia = "AMF con incentivo según ancho via: " + data.descripcionAnchoVia;
                    $scope.AMFPI = data.alturaMaximaFachada + data.incrementoIncentivo
                }
                else {
                    $scope.AMEPI = data.porcentajeALE;
                    $scope.MensajeDobleALE = "No aplica incentivo";
                    $scope.MensajeAMFAnchoVia = "AMF sin incentivo según ancho via: " + data.descripcionAnchoVia;
                    $scope.AMFPI = data.alturaMaximaFachada;
                }
                $scope.RMEFrontalPI = data.frontal; $scope.valor3 = data.frontal;

                $scope.MensajeReduccionSemiSotanoAMC = "Por cada " + $scope.incentivoAMCPorcentaje + "% menos de AMC de semisótano utilizado se incrementa " + $scope.incentivoAMCIncremento + "% de ALE al AME";
                $scope.MensajeReduccionTorreAMC = "Por cada " + $scope.incentivoAMCPorcentaje + "% menos de AMC de torre utilizado se incrementa " + $scope.incentivoAMCIncremento + "% de ALE al AME";
                $scope.MensajeNoAplicaIncentivo = "No aplica incentivo";
                $scope.MensajeIncrementoRME = "Incremento de " + $scope.incentivoRME + "% de ALE al AME por cada ml de retiro frontal adicional";
                $scope.MensajeOpcionalRME = "Opcional de " + $scope.opcionalLimiteMin + " m. en adelante";

                //Aplicación al predio
                $scope.ALEPredio = ALEPredio;
                $scope.AMCSotanoPredio = ((ALEPredio * data.AMCSotano) / 100).toFixed(2);
                $scope.AMCSemisotanoPredio = ((ALEPredio * data.AMCSemisotano) / 100).toFixed(2);
                $scope.AMCTorrePredio = ((ALEPredio * data.AMCTorre) / 100).toFixed(2);
                $scope.AMCZocaloPredio = ((ALEPredio * data.AMCZocalo) / 100).toFixed(2);
                $scope.AMCMezzaninePredio = ((ALEPredio * data.AMCMezzanine) / 100).toFixed(2);
                $scope.AMEPredio = ((ALEPredio * $scope.AMEPI) / 100).toFixed(2);
                $scope.AMVPredio = ((ALEPredio * data.AMV) / 100).toFixed(2);
                $scope.RMEFrontalPredio = data.frontal;
                $scope.AMCSemisotanoPI = ((ALEPredio * data.AMCSemisotano) / 100).toFixed(2);
                $scope.AMCTorrePI = ((ALEPredio * data.AMCTorre) / 100).toFixed(2);
                $scope.NMPPI = ($scope.AMEPredio / data.NMP).toFixed(0);

                //==========================================================>DATOS RETIRO

                //==========================================================>DATOS ANCHO DE VIA
                $scope.idPCCartillaAnchoVia = data.idPCCartillaAnchoVia;
                $scope.incrementoIncentivo = data.incrementoIncentivo;
                $scope.numeroZocalos = data.numeroZocalos;
            }
            else
            {
                console.log("Error al obtener cargar Cartilla ", resApi.error.message);
            }
        });

        
    };

    $scope.inputSuperficie = function (SuperficieCatastro) {
        $scope.SuperficieCatastro = SuperficieCatastro;
    }

    $scope.verCartilla = function (PCCartilla){
        $scope.getCargarCartilla(PCCartilla.idCartilla);
    };

    $scope.incentivoAMCSemisotano = function (value){
        AMEPI = $scope.AME;
        $scope.AMCSemisotanoPI = value;
        if (ALEPredio >= 2 * $scope.ALE) { AMEPI = AMEPI + 100; }
        $scope.AMEPI = AMEPI + (($scope.AMCSemisotano - $scope.AMCSemisotanoPI) / 10 * $scope.incentivoAMCIncremento) + (($scope.AMCTorre - $scope.AMCTorrePI) / 10 * $scope.incentivoAMCIncremento) + (($scope.RMEFrontalPI - $scope.frontal) * $scope.incentivoRME);
        $scope.NMPPI = ($scope.AMEPredio / $scope.NMP).toFixed(0);
        $scope.AMEPredio = ((ALEPredio * $scope.AMEPI) / 100).toFixed(2);
        $scope.AMCSemisotanoPredio = (($scope.ALEPredio * value) / 100).toFixed(2);
    }

    $scope.incentivoAMCTorre = function (value)
    {
        AMEPI = $scope.AME;
        $scope.AMCTorrePI = value;
        if (ALEPredio >= 2 * $scope.ALE) { AMEPI = AMEPI + 100; }
        $scope.AMEPI = AMEPI + (($scope.AMCSemisotano - $scope.AMCSemisotanoPI) / 10 * $scope.incentivoAMCIncremento) + (($scope.AMCTorre - $scope.AMCTorrePI) / 10 * $scope.incentivoAMCIncremento) + (($scope.RMEFrontalPI - $scope.frontal) * $scope.incentivoRME);
        $scope.NMPPI = ($scope.AMEPredio / $scope.NMP).toFixed(0);
        $scope.AMEPredio = ((ALEPredio * $scope.AMEPI) / 100).toFixed(2);
        $scope.AMCTorrePredio = (($scope.ALEPredio * value) / 100).toFixed(2);
    }

    $scope.incentivoRMEFrontal = function (value){
        AMEPI = $scope.AME;
        $scope.RMEFrontalPI = value;
        if (ALEPredio >= 2 * $scope.ALE) { AMEPI = AMEPI + 100; }
        $scope.AMEPI = AMEPI + (($scope.AMCSemisotano - $scope.AMCSemisotanoPI) / 10 * $scope.incentivoAMCIncremento) + (($scope.AMCTorre - $scope.AMCTorrePI) / 10 * $scope.incentivoAMCIncremento) + (($scope.RMEFrontalPI - $scope.frontal) * $scope.incentivoRME);
        $scope.NMPPI = ($scope.AMEPredio / $scope.NMP).toFixed(0);
        $scope.AMEPredio = ((ALEPredio * $scope.AMEPI) / 100).toFixed(2);
        $scope.RMEFrontalPredio = (($scope.ALEPredio * value) / 100).toFixed(2);
    }

    $scope.registrarIGOB=function (param,idTramiteIGOB) {
        var p = {q: param};
        $.blockUI();
        $http({
            method: 'POST',
            url: CONFIG.SERVICE_SITOLextgen + 'PermisoConstruccionV2/RegistrarIGOBObtenerParam',
            data: Object.toparams(p),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            $.unblockUI();
            //console.log("Obteniendo parametros igob", data, $scope.solicitud);
            if(data.res)
            {
                console.log("error crear en igob",data);
                swal('', 'No se pudo registrar en IGOB: ' + data.valor, 'error');
                $.unblockUI();
            }
            else
            {
                var credentials= {
                    "user": data.igobCredentialsUser,
                    "password": data.igobCredentialsPwd
                }
                $http({
                    method: 'POST',
                    url: data.igobCredentialsURL,
                    data: Object.toparams(credentials),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function (dataCre, status, headers, config) {
                    $.unblockUI();
                    //console.log("Credentials igob", dataCre);
                    if(idTramiteIGOB == null){
                        //igob reg
                        $http({
                            method: 'POST',
                            url: data.igobServCreacionURL,
                            data: Object.toparams(data.data),
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + dataCre.token }
                        }).success(function (dataRegIgob, status, headers, config) {
                            $.unblockUI();
                            //console.log("Crear en igob", dataRegIgob);
                            if(dataRegIgob.success){
                                if(dataRegIgob.success.length>0){
                                    var id_form_tra = dataRegIgob.success[0].id_form_tra;
                                    //console.log("id_form_tra",id_form_tra);
                                    //Actualizar idtramite en sitv2online
                                    var dataSit= {
                                        "q": param,
                                        "idTramite": id_form_tra
                                    }
                                    $http({
                                        method: 'POST',
                                        url: CONFIG.SERVICE_SITOLextgen + 'PermisoConstruccionV2/actualizarIdTramiteIGOB',
                                        data: Object.toparams(dataSit),
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                    }).success(function (dataActTram, status, headers, config) {
                                        $.unblockUI();
                                        //console.log("Actualizar tramite en sitol", dataActTram);
                                        if(dataActTram.res == "OK")
                                        {
                                            // Enviar notificacion
                                            // var msj = data.igobServNotificacionMsj.replace('{0}', data.idRegTramiteOL);
                                            // msj = msj.replace('{1}', data.profesional);
                                            // var dataSit= {
                                            //     "idtramite":id_form_tra,
                                            //     "notificacion":msj,
                                            //     "sistema":data.igobServNotificacionSistema,
                                            //     "usuario":"CIUDADANO",
                                            //     "url_adjunto":""
                                            // }

                                            // $http({
                                            //     method: 'POST',
                                            //     url: data.igobServNotificacionURL,
                                            //     data: Object.toparams(dataSit),
                                            //     headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + dataCre.token }
                                            // }).success(function (dataNotifIgob, status, headers, config) {
                                            //     $.unblockUI();
                                            //     console.log("Enviar notificacion", dataNotifIgob);
                                            //     if(dataNotifIgob.success){
                                            //     }
                                            //     else{
                                            //         //swal('', 'No se pudo enviar la notificacion. '  + JSON.stringify(dataNotifIgob), 'error');
                                            //         $.unblockUI();
                                            //     }
                                            // }).error(function (data, status, headers, config) {
                                            //     console.log("error email conexion",data, status, headers, config);
                                            //     swal('', 'Error al registrar trámite en IGOB', 'error');
                                            //     $.unblockUI();
                                            // });
                                        }
                                        else
                                        {
                                            console.log("error de conexion",data, status, headers, config);
                                        }
                                    }).error(function (data, status, headers, config) {
                                        console.log("error email conexion",data, status, headers, config);
                                        swal('', 'Error al registrar trámite en IGOB', 'error');
                                        $.unblockUI();
                                    });
                                }
                            }
                            else{
                                swal('', 'Error al registrar trámite en IGOB' + JSON.stringify(dataRegIgob), 'error');
                                $.unblockUI();
                            }
                        }).error(function (data, status, headers, config) {
                            console.log("error email conexion",data, status, headers, config);
                            swal('', 'Error al registrar trámite en IGOB', 'error');
                            $.unblockUI();
                        });
                        /// igob reg
                    }
                    else{
                        //return ;
                        //****renvio de comentario notificacion */
                        var msj = data.igobServNotificacionMsj.replace('{0}', data.idRegTramiteOL);
                        msj = msj.replace('{1}', data.profesional);
                        var dataSit= {
                            "idtramite":idTramiteIGOB,
                            "notificacion":msj,
                            "sistema":data.igobServNotificacionSistema,
                            "usuario":"CIUDADANO",
                            "url_adjunto":""
                        }
                        $http({
                            method: 'POST',
                            url: data.igobServNotificacionURL,
                            data: Object.toparams(dataSit),
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + dataCre.token }
                        }).success(function (dataNotifIgob, status, headers, config) {
                            $.unblockUI();
                            //console.log("Enviar notificacion", dataNotifIgob);
                            if(dataNotifIgob.success){

                            }
                            else{
                                
                                //swal('', 'No se pudo enviar la notificacion. '  + JSON.stringify(dataNotifIgob), 'error');
                                $.unblockUI();
                            }

                        }).error(function (data, status, headers, config) {
                            console.log("error email conexion",data, status, headers, config);
                            swal('', 'Error al registrar trámite en IGOB', 'error');
                            $.unblockUI();
                        });

                        //
                    }

                }).error(function (data, status, headers, config) {
                    console.log("error credentials coneccion",data, status, headers, config);
                    swal('', 'Error al enviar credenciales al IGOB', 'error');
                    $.unblockUI();
                });
            }
        }).error(function (data, status, headers, config) {
            console.log("error email conexion",data, status, headers, config);
            swal('', 'Error al registrar trámite en IGOB', 'error');
            $.unblockUI();
        });

    }
}
