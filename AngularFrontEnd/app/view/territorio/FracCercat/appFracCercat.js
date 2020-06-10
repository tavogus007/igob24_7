app.filter('jsonDate', ['$filter', function ($filter) 
{
    return function (input, format) {
        return (input) ? $filter('date')(parseInt(input.substr(6)), format) : '';
    }
}]);
app.filter('tiempoCumplimientoDesdeAceptacion', ['$filter','$sce', function ($filter,$sce) 
{
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

            if (diasRestantesDesdeAceptacion <= 0) {

                html = "<span style='color:red'>Fuera de plazo</span>";
            } else {

                html = "<span style='color:green'>Dentro del plazo</span>";
            }
        }
        return $sce.trustAsHtml(html);
    }
}]);
app.directive('lusuparametroOpcional', ['$filter', function ($filter) 
{
    formatter = function (num) {
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

app.directive('modelformatoSercat', ['$filter', function ($filter) 
{
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

function FracCercatController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad,$timeout,$window)
{
    function arrayObjectIndexOf(miArray, buscarTexto, propiedad) {
        for (var i = 0, len = miArray.length; i < len; i++) {
            if (miArray[i][propiedad] === buscarTexto) return i;
        }
        return -1;
    }

    $scope.config ={
        motorflujo:{
            documento:{
                informe_obs : 19
            }
        },
        tipoTramite : {
            idTipoTramite:3,
            descripcion:'FRACCIONAMIENTO PROPIEDAD HORIZONTAL Y CERTIFICACIÓN CATASTRAL'
        }
    }

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

        idTipoTramite :0, //FRACCIONAMIENTO AS BUILT
        tipoTramite: '',//'COMBO AS BUILT Y FRACCIONAMIENTO',
        arquitectoNombre:'',
        arquitectoRegistroNacionalCAB:'',
        arquitectoTelefono:'',
        arquitectoEmail:'',
        autorizacionEntregaDocumentos:null,
        autorizacionSeguimientoTramite:true,

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
                $scope.getListaArquitectos();
                $scope.loginPagoEnLinea();
            }catch(e)
            {
                console.log("error", e);
            }
        },500);
    };

    $scope.$on('api:ready',function(){
        $scope.setDatosSolicitante();
        $scope.getSolicitudes();
        $scope.getListaArquitectos();
        $scope.loginPagoEnLinea();
    });
    joao = $scope;

    $scope.setDatosSolicitante = function () {
        var datosCiudadano = new rcNatural();
        datosCiudadano.oid = sessionService.get('IDCIUDADANO');
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
                }
            }
            else{
                //console.log("No se encontraron los datos del ciudadano!!", sessionService.get('IDCIUDADANO'));
                swal('', 'Error al recuperar datos', 'error');
                console.log("datos ciudadano",resApi.error.message);
                console.log("datos ciudadano",resApi.error.code);
            }
        });
    }

    $scope.getSolicitudes = function () {
        $.blockUI();
        var sNroDocCiudadano = sessionService.get('CICIUDADANO');
        if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
        {
            sNroDocCiudadano = sessionService.get('NITCIUDADANO');
        }
        var solicitud = new dataSITOL();
        solicitud.solicitudLstxTipo(  sNroDocCiudadano, $scope.config.tipoTramite.idTipoTramite, function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success){
                //console.log("solicitudes",resApi.success.dataSql);
                $scope.listaSolicitudes = resApi.success.dataSql;
                var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
                $scope.tablaSolicitudes.reload();
                //Obtiene lista de pagos
                angular.forEach($scope.listaSolicitudes, function (_sol) {
                    if(_sol.idEstado == 5){
                        //console.log("Pendiente de pago", _sol);
                        $scope.getSolicitudPago(_sol);
                    }
                });
                $.unblockUI();
            }
            else{
                swal('', 'Error al recuperar datos', 'error');
                console.log("Solicitudes",resApi.error.message, resApi.error.code);
                $.unblockUI();
            }

        });
    }
    $scope.getSolicitudPago = function (_sol) {
        var solicitud = new dataSITOL();
        solicitud.solicitudLstPagos( _sol.idFichaTecnica, function(resultado){
            var resApi = JSON.parse(resultado);
            //console.log("pagos", resultado);
            if(resApi.success){
                _sol.pagos = resApi.success.dataSql;
                //console.log("inicio",_sol.pagos);
                angular.forEach(_sol.pagos, function (_pago) {
                    if(_pago.pagado == false){
                        $scope.verificarFum(_pago);
                    }
                });
                //console.log("fin");
            }
            else
            {
                swal('', 'Error al recuperar datos de pagos', 'error');
                console.log("Solicitudes",resApi.error.message, resApi.error.code, _sol);
                $.unblockUI();
            }
        });
    }
    $scope.verificarFum = function (_pago) {
        var idFum = _pago.fum;
        var formData = {
            'idfum':idFum
        };
        var idtoken =   sessionService.get('TOKEN');
        var stoquen =  'Bearer <\\\"' + idtoken + '\\\">';
        $.ajax({
            "async": false,
            type        : 'POST',
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
            success     : function(data) {
                if(data.Resultado.idFum){
                    //console.log("Fum pagado",data, idFum);
                    $scope.solActFumPagado(_pago);
                }
                else{
                    //console.log("Fum No pagado",idFum,data);
                }
            }
        });
    };
    $scope.solActFumPagado=function (_pago) {
        //console.log("generando",_pago);
        var solicitud = new dataSITOL();
        solicitud.pcSolicitudFumPagado(_pago.idTramite, _pago.idSolicitudPago, function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success){
                //console.log("fum actualizado a pagado", resApi.success.dataSql[0].res,resApi.success);
                //$scope.getSolicitudesUnico();
                _pago.pagado = true;
                if(resApi.success.dataSql[0].res =="OK"){
                    var idx = arrayObjectIndexOf($scope.listaSolicitudes, _pago.idTramite, "idFichaTecnica");
                    $scope.listaSolicitudes[idx].idEstado = 6;
                    $scope.listaSolicitudes[idx].estado = "FINALIZADO";
                }
            }
            else{
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

    $scope.BuscarArquitecto = function () {
        var term = $scope.buscarArquitectoNombre;
        $scope.tablaListaArquitectos.filter({ arquitectoNombre: term });
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
                swal('', 'Error al recuperar datos arquitectos', 'error');
                console.log("Lista arquitectos",resApi.error.message,resApi.error.code);
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
        //$scope.solicitud.nombreSolicitante='';
        //$scope.solicitud.paternoSolicitante='';
        //$scope.solicitud.maternoSolicitante='';
        //$scope.solicitud.numeroDocumentoSol='';
        //$scope.solicitud.expedido='';
        //$scope.solicitud.tipoDocumento=0;
        //$scope.solicitud.emailSolicitante='';
        //$scope.solicitud.telefonoSolicitante='';
        //$scope.solicitud.tipoPersona= '';
        //$scope.solicitud.direccion='';
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
        $scope.solicitud.idTipoTramite = 0; //FRACCIONAMIENTO Y AS BUILT
        $scope.solicitud.arquitectoNombre='';
        $scope.solicitud.arquitectoRegistroNacionalCAB='';
        $scope.solicitud.arquitectoTelefono='';
        $scope.solicitud.arquitectoEmail='';
        $scope.solicitud.autorizacionEntregaDocumentos=null;
        $scope.solicitud.autorizacionSeguimientoTramite=true;
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
    //TODO: REVISAR
    $scope.accionDescargarSolicitud = function (sol) {
        var urlFum = CONFIG.SERVICE_SITOLextgen + 'Territorio/GenerarSolicitudPDFComboAsbuiltFrac?d=' + sol.pisol;
        window.open(urlFum,"_blank");
    }
    //Pago
    $scope.accionImprimirProforma = function (sol, idDocumento) {
        $scope.varSpin = true;
        $scope.RegistroFUM={
            registrado:'OK',
            mensaje:''
        };
        //var urlFum = CONFIG.SERVICE_SITOLextgen + 'ApiTerritorio/DocumentoFum?q=' + sol.piif;
        var urlFum = CONFIG.SERVICE_SITOLextgen + 'ApiTerritorio/DocumentoFlujo?idoc='+ idDocumento + '&q=' + sol.piif ;
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

    $scope.accionPagoOL = function(fum){
        sessionService.set('IDFUM', fum);
        //console.log("fum continuar epago::",sessionService.get('IDFUM'));
        //console.log("token continuar epago::",sessionService.get('TOKEN'));
        window.location.href = "#servicios|epagos";
    };
    $scope.accionListaProformas = function (sol) {
        $scope.solicitudPagos = sol;
        
    };

    //TODO: REVISAR
    $scope.accionSeguimientoFlujo= function (sol) {
        //console.log("entro $scope.accionSeguimientoFlujo");
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
                }
                else{
                    $('#seguimientoNroSolicitud').val(sol.idFichaTecnica);
                    $('#seguimientoTipoTramite').val($scope.config.tipoTramite.descripcion);
                    $scope.listaSeguimientoTareas = data;
                    $('#divPopupSeguimiento').modal('show');
                }
                $.unblockUI();
            }).error(function (data, status, headers, config) {
                swal('', 'Error al consultar seguimiento de trámite', 'error');
                $.unblockUI();
            });
        }
        else
        {
            swal('', 'Error al consultar seguimiento de trámite', 'error');
            console.log("No se puede ver el seguimiento, parámetro no valido");
        }
    }

    //TODO: REVISAR
    $scope.accionDelegarSolicitud = function (sol) {
        //console.log("entro acciondelegarsolicitud");
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
    $scope.onError = function(error) {
        console.log("error pdf",error);
    };
    $scope.onLoad = function() {
        $scope.loading = '';
    };
    $scope.onProgress = function(progress) {
        console.log(progress);
    };
    $scope.resetUrl=function () {
        //console.log('resetUrl');
        $scope.pdfUrl = '../catastro/img/Default.pdf';
        var url = '../catastro/img/Default.pdf';
        //$('#PDFtoPrint').attr('src',url);
        $scope.RefreshUrl(url);
    };

    //TODO: REVISAR
    $scope.configCartilla = {
        urlTemplate : CONFIG.SERVICE_SITOLextgen + "Archivos/cartillas/distrito {distrito}/cartillas/{patron}.pdf",
        url : CONFIG.SERVICE_SITOLextgen + "Archivos/cartillas/distrito {distrito}/cartillas/{patron}.pdf",
        patron: null
    }

    $scope.pdfUrl = '../catastro/img/Default.pdf';
    //TODO: REVISAR
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
    //TODO: REVISAR
    $scope.accionVerDocumentoFinalImagen = function (sol) {
        $('#divPopupDocFinal').modal('show');
        //$scope.docFinalImagen = CONFIG.SERVICE_SITOLextgen + 'ApiTerritorio/DocumentoFinalPCImagen?q=' + sol.piif;
        $scope.docFinalImagen = CONFIG.SERVICE_SITOLextgen + 'ApiTerritorio/DocumentoFinalImagen?idoc='+ $scope.config.motorflujo.documento.informe_obs +'&q=' + sol.piif;

    };
    //Acciones - Fin

    $scope.visorIframe ={
        url:null,
        titulo:null,
        texto:null
    }
    $scope.visorIframeCambiarModelo = function (superficie,anchoVia, nroPlantas) {
        //$scope.visorIframe.url = "http://gmlpsr0038:8080/Proyectos2017/LUSU/modelo_lusu2.html?pisos=xpisos&anchoVia=xanchovia&superficie=xsuperficie";
        $scope.visorIframe.url = "http://sitservicios.lapaz.bo/sit/LUSU/modelo_lusu2.html?pisos=xpisos&anchoVia=xanchovia&superficie=xsuperficie";
        $scope.visorIframe.url = $scope.visorIframe.url.replace("xpisos",nroPlantas).replace("xanchovia",anchoVia).replace("xsuperficie",superficie)
        $scope.visorIframe.titulo = "Modelo 3D";
        $scope.visorIframe.texto = "Modelo generado en función a la superficie del predio y número máximo de plantas. <b style='color: red'>Modelo Referencial</b>";
        $('#visorIframe').attr('src', $scope.visorIframe.url);
        //$('#visorIframe').reload();

    }
    $scope.visorIframeCambiarMapa = function (codigoCatastral) {
        //$scope.visorIframe.url = "http://gmlpsr0038:8080/Proyectos2017/LUSU/MapaLUSU.html?codcat=xcodcat";
        $scope.visorIframe.url = "http://sitservicios.lapaz.bo/sit/LUSU/MapaLUSU.html?codcat=xcodcat";
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
                $scope.resetSolicitud();
                $scope.flujo.paso = paso;
                break;
            case $scope.flujo.pasos.paso1:
                $scope.resetSolicitud();
                $scope.getListaPredios();
                $scope.flujo.paso = paso;
                break;
            case $scope.flujo.pasos.paso2:
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
        //$scope.$apply();
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
                swal('', 'Error al recuperar datos', 'error');
                console.log("Seguimiento flujo",resApi.error.message,resApi.error.code);
                $.unblockUI();
            }
        });
    };

    //Paso 1.5 funciones (Seleccion de predio)
    $scope.setPredioSeleccionado = function (objPredio) {
        $scope.predioSeleccionado = objPredio;
        $scope.getPredio($scope.predioSeleccionado.CodigoCatastral);
        $scope.getPredioPropietarios($scope.predioSeleccionado.CodigoCatastral);

        /*
        var old = $location.hash();
        $location.hash("secDatosPredio");
        $anchorScroll();
        $location.hash(old);
        */
    }

    $scope.getPredio = function (codCat) {
        $.blockUI();
        $scope.predioSeleccionadoPropietarios = [];
        var predio = new dataSIT();
        predio.pcPrediosConsolidado( codCat,function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                if(resApi.success.dataSql.length == 1) {
                    $scope.setSolicitudDatosPredio(resApi.success.dataSql[0]);
                }
                else if(resApi.success.dataSql.length == 0){
                    //console.log("No se encontro el Predio con CC:" + codCat);
                    swal('', 'No se encontró el predio con Código Catastral' + codCat+ " en la tabla consolidada", 'error');
                }
                else{
                    //console.log("Se encontro mas de un registro con el CC:" + codCat);
                    swal('', 'Se encontró más de un registro con el mismo Código Catastral '+ codCat +' en la tabla consolidada', 'error');
                }
                $.unblockUI();
            }
            else
            {
                $.unblockUI();
                swal('', 'Error al recuperar datos', 'error');
                console.log("getPredio",resApi.error.message,resApi.error.code);
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
        //console.log("data.pendienteViaEIV",data.pendienteViaEIV);
        if(data.pendienteViaEIV)
            $scope.solicitud.pendienteVia = data.pendienteViaEIV;
        else
            $scope.solicitud.pendienteVia = 0;
        //console.log("$scope.solicitud.pendienteVia",$scope.solicitud.pendienteVia);
        $scope.solicitud.codigoMirador = data.codigoMirador;
        $scope.solicitud.descripcionMirador = data.descripcionMirador;
        $scope.solicitud.codigoPlaza = data.codigoPlaza;
        $scope.solicitud.descripcionPlaza = data.descripcionPlaza;
        $scope.solicitud.cPresidencialDistancia = data.cPresidencialDistancia;
        $scope.solicitud.cPresidencialAltura = data.cPresidencialAltura;
        $scope.solicitud.telefericoConsolidado = data.telefericoConsolidado;
        $scope.solicitud.telefericoColor = data.telefericoColor;
        $scope.solicitud.restricciones = 0;

        if (data.patronLusu == "CH1" || data.patronLusu == "CH2" || data.patronLusu == "CH3" || data.patronLusu == "CH4"){
            $scope.solicitud.restriccionCH = 1;
        }
        else{
            $scope.solicitud.restriccionCH = 0;
        }

        if (data.codigoMirador != null || data.codigoPlaza != null || data.cPresidencialDistancia != null || data.cPresidencialAltura != null || data.telefericoColor != null || $scope.solicitud.restriccionCH == 1 )
        {
            $scope.solicitud.restricciones = 1;
        }
        //se anulan restricciones JFC a solictud de hilation huasco
        $scope.solicitud.restricciones = 0;
        $scope.configCartilla.patron = $scope.solicitud.lusu;
        $scope.configCartilla.url = $scope.configCartilla.urlTemplate.replace('{distrito}',$scope.solicitud.distritoMunicipal).replace('{patron}',data.patronLusu);
        $scope.getAlturasMaximas($scope.solicitud.idPCCartilla,$scope.solicitud.anchoVia);

        //console.log("predio",  $scope.solicitud, data);
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
                swal('', 'Error al recuperar datos', 'error');
                console.log("getPredio propietarios",resApi.error.message,resApi.error.code);
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
                console.log(resApi.error.message);
                console.log(resApi.error.code);
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
        //console.log("params sol", $scope.solicitud);

        var solicitud = new dataSITOL();
        solicitud.pcSolicitudReg(
            //$scope.solicitud.idTipoTramite,
            $scope.config.tipoTramite.idTipoTramite,
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
            $scope.solicitud.zona,
            $scope.solicitud.direccion,
            $scope.solicitud.nroInmueble,
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
                            swal('', 'Registro guardado', 'success');
                        }
                        $scope.flujo.paso = $scope.flujo.pasos.paso0;
                        //$scope.getSolicitudes();
                    }
                    else
                    {
                        $.unblockUI();
                        swal('', 'Error al guardar', 'error');
                    }
                }
                else
                {
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
            //$scope.solicitud.idTipoTramite,
            $scope.config.tipoTramite.idTipoTramite,
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

                    //console.log("resApi.success",resApi.success);
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
                            swal('', 'Registro guardado', 'success');
                        }
                        $scope.flujo.paso = $scope.flujo.pasos.paso0;
                        //$scope.getSolicitudes();
                    }
                    else {
                        $.unblockUI();
                        swal('', 'Error al actualizar datos', 'error');
                    }

                }
                else
                {
                    $.unblockUI();
                    console.log("Error al guardar",resApi.error.message,resApi.error.code);
                }
            });

    }

    $scope.sendCorreoDelegado = function (param) {
        var p = {q: param};
        //console.log(param);
        $http({
            method: 'POST',
            //url: CONFIG.SERVICE_SITOLextgen + 'Territorio/EnviarCorreoDelegado',
            url: CONFIG.SERVICE_SITOLextgen + 'ApiTerritorio/FlujoCorreoDelegadoFracAsBuilt',
            data: Object.toparams(p),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            $.unblockUI();
            if(data.res == "OK")
            {
                $scope.getSolicitudes();
                swal('', 'Registro guardado y delegado al arquitecto', 'success');
            }
            else
            {
                console.log("error email",data);
                swal('', 'Error al enviar correo', 'error');
            }
        }).error(function (data, status, headers, config) {
            console.log("error email conexion",data, status, headers, config);
            swal('', 'Error al enviar correo', 'error');
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
                console.log("error", partes[1]);
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
                //console.log("entro captcha");
                $scope.saveUpdateSolicitud();
            }
        });
    };
    // ******FIN DE CAPCHA****************



    //No utilizadas
    //Paso 3 Parametros de edificacion
    //TODO: REVISAR
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

    //TODO: REVISAR
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
                console.log(resApi.error.message);
                console.log(resApi.error.code);
            }
        });
    }

    //TODO: REVISAR
    $scope.cambiarCartilla = function () {
        ALEPredio = $scope.solicitud.ALE;
        idCartilla = $scope.solicitud.idPCCartilla;
        AnchoVia = $scope.solicitud.anchoVia;
        //joao = $scope.solicitud.ALE;
        $scope.getCargarCartilla(idCartilla,AnchoVia,ALEPredio);
    }
    //TODO: REVISAR
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
                //console.log(ALEPredio,data.AMCSotano);
                $scope.ALEPredio = ALEPredio;
                $scope.AMCSotanoPredio = ((ALEPredio * data.AMCSotano) / 100).toFixed(2);
                $scope.AMCSemisotanoPredio = ((ALEPredio * data.AMCSemisotano) / 100).toFixed(2);
                $scope.AMCTorrePredio = ((ALEPredio * data.AMCTorre) / 100).toFixed(2);
                $scope.AMCZocaloPredio = ((ALEPredio * data.AMCZocalo) / 100).toFixed(2);
                $scope.AMCMezzaninePredio = ((ALEPredio * data.AMCMezzanine) / 100).toFixed(2);
                $scope.AMEPredio = ((ALEPredio * $scope.AMEPI) / 100).toFixed(2);
                $scope.AMVPredio = ((ALEPredio * data.AMV) / 100).toFixed(2);
                $scope.RMEFrontalPredio = data.frontal;


                //$scope.AMPDescripcion = data.idPCCartilla;

                //$scope.incentivoALE = data.idFormularioCartilla;
                //$scope.incentivoRME = data.idFormularioCartilla;
                //$scope.incentivoAMCPorcentaje = data.idFormularioCartilla;

                //$scope.incentivoNMPIncremento = data.idFormularioCartilla;
                //$scope.archivoCartilla = data.idFormularioCartilla;
                //$scope.comentarios = data.idFormularioCartilla;
                //$scope.incentivoAMP = data.idFormularioCartilla;
                //$scope.distrito = data.idFormularioCartilla;
                //$scope.retiroEspecial = data.idFormularioCartilla;



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
                console.log(resApi.error.message);
                console.log(resApi.error.code);
            }
        });


    };

    $scope.inputSuperficie = function (SuperficieCatastro) {
        $scope.SuperficieCatastro = SuperficieCatastro;
    }
    //TODO: REVISAR
    $scope.verCartilla = function (PCCartilla){
        $scope.getCargarCartilla(PCCartilla.idCartilla);
    };


}

