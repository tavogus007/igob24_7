app.directive('editor', function() {

    return {
        restrict: 'AE',
        // language=HTML
        template:'<div><input ng-model="value" type="number"/></div>',
        scope: { value: '=',
        type:'='}
    };
});

//filtro para popup de Seguimiento de tramite
app.filter('tiempoCumplimientoDesdeAceptacion', ['$filter','$sce', function ($filter,$sce) {
    return function (input, format) {
        var html = "";
        if (input.fechaAceptacion !== null)
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

app.controller('autorizacionesController',function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad,$timeout,$window) {
    //--- variables
    $scope.flujo={
        pasos:{
            paso0 : 'listaSolicitudes',
            paso1 : 'listaPredio',
            paso2 : 'tipoTramite',
            paso3 : 'Requisitos/FUM'
        },
        paso:'listaSolicitudes'
    };
    //paso 0
    $scope.srcTutorial="../territorio/img/TramitePermisoConstruccion.png";
    $scope.tablaSolicitudes = {};
    $scope.listaSolicitudes = [];
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
        fum:'',
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
        idSubTipoTramite:0,
        arquitectoNombre:'',
        arquitectoRegistroNacionalCAB:'',
        arquitectoTelefono:'',
        arquitectoEmail:'',
        autorizacionEntregaDocumentos:null,
        autorizacionSeguimientoTramite:null,

        idFichaTecnica :0,
        idPCCartilla:0,
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

        pendienteVia : null,
        monto:0,
        DiasExpiracionAM:0
    };
    //paso 1
    $scope.listaPredios = [];
    //paso 2
    $scope.listaTipoTramite=[];

    $scope.cmbTipoTramite=[];

    //paso 2.5 //acciones previas  antes de pasar al paso 3
    $scope.tasaValor={};
    //paso 3
    $scope.resultadoBusqueda = {};//para token FUM
    $scope.listaRequisitos=[];
    //renovacion
    $scope.renovacionOcuAcera={
        existeTramite:false,
        idFichaTecnica:0,
        origenBandeja:false,
        monto:0,
        diasRestantes:0,
        tiposolicitudTemp:0
    };

    $scope.idSubTipoTramiteOcuAcera=12; //parametro para
    $scope.idSubTipoTramiteOcuRenovacion=18;  ///
    $scope.idTipoTramite=5;

    $scope.tableData=new ngTableParams({
        page: 1,
        count: 4,
        filter: {}/*,
         sorting: {
         fechaIngresoFormulario: 'desc'
         }*/
    },{
        total: $scope.listaRequisitos.length,
        getData: function($defer, params){
            var filteredData = params.filter() ?
                $filter('filter')($scope.listaRequisitos, params.filter()):$scope.listaRequisitos;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()):$scope.listaRequisitos;
            params.total($scope.listaRequisitos.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.tablaSolicitudes = new ngTableParams({
        page: 1,
        count: 4,
        filter: {},
        sorting: {
            fechaIngresoFormulario: 'desc'
        }
    },{

        total: $scope.listaSolicitudes.length,
        getData: function($defer, params){
            if (params.settings().$scope == null) {
                params.settings().$scope = $scope;
            }
            var filteredData1 = params.filter() ?
                $filter('filter')($scope.listaSolicitudes, params.filter()) :$scope.listaSolicitudes;
            var orderedData1 = params.sorting() ?
                $filter('orderBy')(filteredData1, params.orderBy()):$scope.listaSolicitudes;
            params.total($scope.listaSolicitudes.length);
            $defer.resolve(orderedData1.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    //-- -----------------------------
    //-- metodos, general
    //-- -----------------------------
    $scope.getLstTipoTramite=function(){
        var getLista = new dataSITOL();
        getLista.amLstTipoTramite($scope.idTipoTramite,"C3",function(resultado1){//tipo autorizacion menor
            var resApi = JSON.parse(resultado1);
            if(resApi.success){
                $scope.listaTipoTramite=resApi.success.dataSql;
                $scope.rowTipoTramiteTemp=$filter('filter')($scope.listaTipoTramite,{idSubTipoTramite: $scope.idSubTipoTramiteOcuAcera},true)[0];
                $scope.renovacionOcuAcera.tiposolicitudTemp=$scope.rowTipoTramiteTemp.tipoSolicitud;
                //console.log("listaTipoTramite",$scope.listaTipoTramite,$scope.renovacionOcuAcera);
                $.unblockUI();
            }
            else
            {
                swal('', 'Error al recuperar datos', 'error');
                //console.log("Seguimiento flujo",resApi.error.message,resApi.error.code);
                $.unblockUI();
            }
        });
        //el cmbListaTramites no tiene renovacion de ocupacion de via
        getLista.amLstTipoTramite($scope.idTipoTramite,"C4",function(resultado2){
            var resApi = JSON.parse(resultado2);
            if(resApi.success){
                $scope.cmbTipoTramite=resApi.success.dataSql;
                //console.log("cmbTipoTramite",$scope.cmbTipoTramite);
                $.unblockUI();
            }
            else
            {
                swal('', 'Error al recuperar datos', 'error');
                //console.log("Seguimiento flujo",resApi.error.message,resApi.error.code);
                $.unblockUI();
            }
        });
    };

    $scope.verificarFum = function(){
        //console.log("verificando pago");
        for(var i = 0; i< $scope.listaSolicitudes.length; i++)
        {
            var solicitud =$scope.listaSolicitudes[i];

            if(solicitud.idEstado == 5 && solicitud.piif==null)
            {
                //console.log("epago",solicitud);

                //primero consulta si esta pagado por tabla
                var verificarFumTabla= new dataSITOL();
                verificarFumTabla.solicitudPago(0,solicitud.idFichaTecnica,solicitud.fum,"",0,0,0,"C1",function (resultado){
                    var resApi = JSON.parse(resultado);
                    if(resApi.success)
                    {
                        //console.log("res",resultado);
                        if(resApi.success.dataSql.length){
                            if(resApi.success.dataSql[0].pagado){
                                //console.log("fum pagado por tabla",solicitud.idFichaTecnica);
                                $scope.solActFumPagado(solicitud);
                            }
                            else{
                                //console.log("fum verificacion por servicio",solicitud.idFichaTecnica);
                                $scope.vdplepago(solicitud);
                            }
                        }
                        else{
                            $scope.vdplepago(solicitud);
                        }
                        $.unblockUI();
                    }
                    else
                    {
                        //console.log("Error al verificar fum",resApi.error.message,resApi.error.code);
                        $.unblockUI();
                    }
                });
            }
        }
    };

    $scope.vdplepago = function(objFum){

         var idFum = objFum.fum;
         var formData = {
             'idfum':idFum
         };
         var idtoken =   sessionService.get('TOKEN');
         var stoquen =  'Bearer <\\\"' + idtoken + '\\\">';
         $.ajax({
             "async": true,
             type        : 'POST',
             url         : 'https://pagonline.lapaz.bo/api/comprobante',
             data        : formData,
             dataType    : 'json',
             crossDomain : true,
             "headers": {
                 "cache-control": "no-cache"
             },
             headers: {
                 'authorization': stoquen
             },
             success     : function(data){
                 //console.log("Verificacion epago",data, objFum.idFichaTecnica, objFum.fum);
                 if(data.Resultado.idFum){
                     //console.log("Fum pagado",data, objFum.idFichaTecnica, objFum.fum);
                     $scope.solActFumPagado(objFum);
                 }
                 else
                 {
                     //console.log("Fum No pagado",data);
                 }
             }
         });
    };

    $scope.cambiarPasoAtras=function(){
        switch($scope.flujo.paso)
        {
            case $scope.flujo.pasos.paso0:
                $scope.resetSolicitud();
                $scope.solicitud.idSubTipoTramite=0;
                break;
            case $scope.flujo.pasos.paso1:
                //vista de predios
                $scope.resetSolicitud();
                $scope.flujo.paso = $scope.flujo.pasos.paso0;
                $('#ModalTramite').modal('hide');

                break;
            case $scope.flujo.pasos.paso2:
                $scope.getListaPredios();
                $scope.resetSolicitud();
                $scope.flujo.paso = $scope.flujo.pasos.paso1;
                break;
            case $scope.flujo.pasos.paso3:
                //$scope.saveSolicitud();
                $scope.flujo.paso = $scope.flujo.pasos.paso2;
                break;
        }
    };
    //Flujo local
    $scope.cambiarPaso = function (paso){
        //console.log("cambio paso",paso,$scope.flujo);
        switch(paso)
        {
            case $scope.flujo.pasos.paso0:
                $scope.resetSolicitud();
                $scope.flujo.paso = paso;
                break;
            case $scope.flujo.pasos.paso1:
                //console.log("reset -1");
                $scope.resetSolicitud();
                $scope.getListaPredios();
                $scope.flujo.paso = paso;
                break;
            case $scope.flujo.pasos.paso2:
                $scope.flujo.paso = paso;
                break;
            //case $scope.flujo.pasos.paso3:
            //$scope.saveSolicitud();
            //$scope.flujo.paso = $scope.flujo.pasos.paso0;
            //break;
        }
    };

    $scope.resetSolicitud = function (){

        //console.log("reset");
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
        $scope.solicitud.idTipoTramite = 1; //PC
        $scope.solicitud.idSubTipoTramite=0;
        // $scope.solicitud.arquitectoNombre='';
        // $scope.solicitud.arquitectoRegistroNacionalCAB='';
        // $scope.solicitud.arquitectoTelefono='';
        // $scope.solicitud.arquitectoEmail='';
        $scope.solicitud.autorizacionEntregaDocumentos=null;
        $scope.solicitud.autorizacionSeguimientoTramite=null;
        $scope.solicitud.idFichaTecnica =0;
        $scope.solicitud.idPCCartilla=0;
        $scope.solicitud.fechaEstimadaInicioObra=null;
        // $scope.solicitud.ALE=null;
        // $scope.solicitud.FML=null;
        // $scope.solicitud.AMCSotano=null;
        // $scope.solicitud.AMCSemisotano=null;
        // $scope.solicitud.AMCZocalo=null;
        // $scope.solicitud.AMCMezzanine=null;
        // $scope.solicitud.AMCTorre=null;
        // $scope.solicitud.AME=null;
        // $scope.solicitud.AMF=null;
        // $scope.solicitud.RMEFrontal=null;
        // $scope.solicitud.RMEFondo=null;
        // $scope.solicitud.RMELateralIzq=null;
        // $scope.solicitud.RMELateralDer=null;
        // $scope.solicitud.RMEFrontalZocalo=null;
        // $scope.solicitud.RMEFondoZocalo=null;
        // $scope.solicitud.RMELateralIzqZocalo=null;
        // $scope.solicitud.RMELateralDerZocalo=null;
        // $scope.solicitud.NMP=null;
        // $scope.solicitud.AMV=null;
        // $scope.solicitud.voladizo=null;
        // $scope.solicitud.incentivoDobleALE=null;
        // $scope.solicitud.incentivoRME=null;
        // $scope.solicitud.incentivoRMEZocalo=null;
        // $scope.solicitud.incentivoAMCSemisotano=null;
        // $scope.solicitud.incentivoAMCSotano=null;
        // $scope.solicitud.incentivoNMP=null;
        // $scope.solicitud.incentivoAMF=null;
        $scope.solicitud.riesgoConstruccionResultado=null;
        $scope.solicitud.idEstado=0;
        $scope.solicitud.restricciones = null;
        $scope.solicitud.monto=0;
        $scope.solicitud.DiasExpiracionAM=0;
        $scope.solicitud.fum='';
        $scope.predioSeleccionado = null;
        $scope.mensajeErrorVariables="";
        $scope.tramiteSinInspeccion=null;
        $scope.tramiteConInspeccion=null;
        //-------------------------------
        //var element = document.getElementById("cmbSubTipoTramite");
        //element.value = "";
        //console.log("reset",$scope.solicitud.idSubTipoTramite);
    };

    $scope.verExisteRenovacion=function(element){
        var respuesta = false;
        //console.log(element);
        if(element.diferenciaDia!=null && element.DiasExpiracionAM!=null && (element.idEstado == 6 || element.idEstado == 7)){
            //console.log(element.idFichaTecnica,element.DiasExpiracionAM);
            var diasExpiracion=parseInt(element.DiasExpiracionAM);
            var diferencia=parseInt(element.diferenciaDia);
            if(diasExpiracion>=diferencia && (element.idSubTipoTramite==12 || element.idSubTipoTramite==18)){
                respuesta=true;
            }
        }
        return respuesta;
    };

    $scope.renovarOcupacionAcera=function(element){
        $scope.getPredio(element.codigoCatastral);
        $('#ModalTramite').modal('show');
        $scope.flujo.paso = $scope.flujo.pasos.paso2;

        $scope.solicitud.idSubTipoTramite=parseInt($scope.idSubTipoTramiteOcuAcera);
        $scope.solicitud.idPCCartilla=element.idPCCartilla;
        $scope.renovacionOcuAcera.idFichaTecnica=element.idFichaTecnica;
        $scope.renovacionOcuAcera.diasRestantes=parseInt(element.DiasExpiracionAM)-parseInt(element.diferenciaDia);

        //console.log("renovacion",$scope.renovacionOcuAcera);

        $scope.tipoTramite={};
        $scope.renovacionOcuAcera.origenBandeja=true;
        $scope.renovacionOcuAcera.existeTramite=true;

        $scope.selectTipoTramite();
    };

    $scope.revisarRenovacion=function(codigoCatastral){
        $scope.renovacionOcuAcera.existeTramite=false;
        //$scope.renovacionOcuAcera.idFichaTecnica=0;
        $scope.listaSolicitudes.forEach(function(element){
            if(element.diferenciaDia!=null && element.DiasExpiracionAM!=null){
                var diasExpiracion=parseInt(element.DiasExpiracionAM);
                var diferencia=parseInt(element.diferenciaDia);
                //console.log("codCAtastral",codigoCatastral,element.codigoCatastral);
                if(diasExpiracion>=diferencia && (element.idSubTipoTramite==$scope.idSubTipoTramiteOcuAcera || element.idSubTipoTramite==18) && element.codigoCatastral==codigoCatastral){ //&& element.codigoCatastral==codigoCatastral
                    $scope.renovacionOcuAcera.existeTramite=true;
                    /*if($scope.renovacionOcuAcera.origenBandeja==false){
                        //Recupera datos del tramite, solo si viene de boton crear tramite;
                    //    $scope.renovacionOcuAcera.idFichaTecnica=element.idFichaTecnica;
                    //}
                    //$scope.renovacionOcuAcera.idFichaTecnica=element.idFichaTecnica;
                    //console.log("si",diasExpiracion,diferencia,$scope.renovacionOcuAcera);
                    */
                }
                else{
                    //console.log("NO",diasExpiracion,diferencia,$scope.renovacionOcuAcera);
                }
            }
        });
        //console.log("solicitud online",$scope.renovacionOcuAcera.existeTramite);
        return $scope.renovacionOcuAcera.existeTramite;
    };
    //-- -----------------------------
    // funciones de inicio//paso 0
    //-- ----------------------------
    $scope.inicio = function (){
        //if (DreamFactory.isReady()){
            $scope.loginPagoEnLinea();
            $scope.setDatosSolicitante();
            $scope.getSolicitudes();
            $scope.getLstTipoTramite();
        //}
    };

    $scope.$on('api:ready',function(){
        $scope.loginPagoEnLinea();
        $scope.setDatosSolicitante();
        $scope.getSolicitudes();
        $scope.getLstTipoTramite();
    });

    $scope.loginPagoEnLinea = function(){
        /*
         var formData = {
         'usr_usuario'   : 'tecnico',
         'usr_clave'     :   '123456'
         };
         */

        var formData = {
            'usr_usuario'   : 'catastro',
            'usr_clave'     :   'catastro2016'
        };
        /*
         var formData = {
         'username'   : 'catastro',
         'pwd'     :   'catastro2016'
         };*/
        $.ajax({
            dataType: "json",
            type: "POST",
            //url:'http://gmlpsr0022/WS_AuthenticationAD/LDAPAuthentication.asmx?op=IsAuthenticated',
            url : 'https://pagonline.lapaz.bo/api/logueo',
            //url:'http://tempuri.org/IsAuthenticated',
            crossDomain: true,
            data: formData,
            async: false,
            success: function(response){
                sessionService.set('TOKEN', response.token);
                //console.log("epago token",response);
            },
            error: function (response, status, error) {
                dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
            }
        });
    };

    $scope.setDatosSolicitante = function (){
        var datosCiudadano = new rcNatural();
        datosCiudadano.oid = sessionService.get('IDCIUDADANO');
        datosCiudadano.datosCiudadanoNatural(function(resultado){
            var response = JSON.parse(resultado);
            if (response.length > 0){
                var results = response;
                //var tipoPersona = results[0].dtspsl_tipo_persona;
                tipoPersona = results[0].dtspsl_tipo_persona;
                if (tipoPersona == 'NATURAL'){
                    $scope.solicitud.fechaNacimiento=results[0].dtspsl_fec_nacimiento;
                    $scope.solicitud.nombreSolicitante = results[0].dtspsl_nombres;
                    $scope.solicitud.maternoSolicitante = results[0].dtspsl_materno;
                    $scope.solicitud.paternoSolicitante = results[0].dtspsl_paterno;
                    $scope.solicitud.numeroDocumentoSol = results[0].dtspsl_ci;
                    $scope.solicitud.expedido = results[0].dtspsl_expedido;
                    $scope.solicitud.tipoDocumento = 1;
                    $scope.solicitud.emailSolicitante = (results[0].dtspsl_correo != null?results[0].dtspsl_correo:'');
                    $scope.solicitud.telefonoSolicitante = (results[0].dtspsl_movil!=null? results[0].dtspsl_movil:(results[0].dtspsl_telefono != null ? results[0].dtspsl_telefono:''));
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
                //console.log("datos ciudadano",resApi.error.message);
                //console.log("datos ciudadano",resApi.error.code);
            }
        });
    };

    $scope.getSolicitudes = function(){
        $.blockUI();
        var sNroDocCiudadano = sessionService.get('CICIUDADANO');
        if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
        {
            sNroDocCiudadano = sessionService.get('NITCIUDADANO');
        }
        //console.log("solicitud cuidadano",sNroDocCiudadano);
        var solicitud = new dataSITOL();
        solicitud.amSolicitudLstPorTipo( sNroDocCiudadano,$scope.idTipoTramite, function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                //console.log("solicitudes",resApi.success.dataSql);
                $scope.listaSolicitudes = resApi.success.dataSql;
                var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
                $scope.tablaSolicitudes.reload();
                $scope.verificarFum();
                $.unblockUI();
            }
            else
            {
                swal('','Error al recuperar datos', 'error');
                //console.log("Solicitudes",resApi.error.message, resApi.error.code);
                $.unblockUI();
            }
        });
    };

    $scope.getSolicitudesUnico = function(){
        var sNroDocCiudadano = sessionService.get('CICIUDADANO');
        if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
        {
            sNroDocCiudadano = sessionService.get('NITCIUDADANO');
        }
        var solicitud = new dataSITOL();
        solicitud.amSolicitudLstPorTipo(sNroDocCiudadano,$scope.idTipoTramite, function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.listaSolicitudes=resApi.success.dataSql;
                var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
                $scope.tablaSolicitudes.reload();
            }
            else
            {
                console.log("Solicitudes",resApi.error.message, resApi.error.code);
            }
        });
    };

    //---------------------------------------------
    // paso 1 getListaPredios, con funcion:busCodCat.dplLstCC
    //---------------------------------------------
    $scope.getListaPredios = function(){
        //$.blockUI();
        $scope.listaPredios = [];
        var sNroDocCiudadano = sessionService.get('CICIUDADANO');
        if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
        {
            sNroDocCiudadano = sessionService.get('NITCIUDADANO');
        }
        var busCodCat = new dataSIT();
        busCodCat.dplLstCCAM(sNroDocCiudadano,function(resultado){
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
    //---------------------------------------------
    // paso 2
    //---------------------------------------------
    // revisamos datos de predio seleccionado
    $scope.setPredioSeleccionado=function(objPredio){
        //console.log("predio seleccionado", objPredio);
        $scope.tipoTramite={};
        document.getElementById('cmbSubTipoTramite').value="";
        $scope.tramiteSinInspeccion=null;
        $scope.tramiteConInspeccion=null;
        $scope.subTipoTramite={};
        //----------------------------------------
        $scope.predioSeleccionado = objPredio;

        $scope.getPredio($scope.predioSeleccionado.CodigoCatastral);
        $scope.getPredioPropietarios($scope.predioSeleccionado.CodigoCatastral);
        $scope.renovacionOcuAcera.origenBandeja=false;
    };

    $scope.getPredioPropietarios = function (codCat){
        $.blockUI();
        $scope.predioSeleccionadoPropietarios=[];
        var predio = new dataSIT();
        predio.pcPredio( codCat,"C2",function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.predioSeleccionadoPropietarios = resApi.success.dataSql;
                //console.log("getPredio",resApi.success.dataSql);
                $.unblockUI();
            }
            else
            {
                swal('', 'Error al recuperar datos', 'error');
                console.log("Error getPrediopropietarios",resApi.error.message,resApi.error.code);
                $.unblockUI();
            }
        });
    };

    $scope.getPredio = function (codCat){
        //$.blockUI();
        //revisar que el predion no sea PH
        var ultimosDigitos = codCat.substring(11, 15);
        //console.log("datos del predio: CC:"+codCat,"ultimos digitos:"+ultimosDigitos);
        if(ultimosDigitos!="0000"){
            //console.log("datos del predio1: CC:"+codCat,"ultimos digitos:"+ultimosDigitos);
            swal('', 'El predio no es de tipo PROPIEDAD UNIFAMILIAR','error');
            return;
        }

        $scope.predioSeleccionadoPropietarios = [];
        var predio = new dataSIT();
        predio.pcPrediosConsolidado(codCat,function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                if(resApi.success.dataSql.length == 1){
                    var datosPredio = resApi.success.dataSql[0];
                    //console.log("getPredio",datosPredio);
                    if(datosPredio.idPCCartilla!=null){
                        //condicion para predio patrimonial
                        if(datosPredio.categoriaPat !=null && (datosPredio.tipoConjunto!=null || datosPredio.instLegalPat!=null)){
                            swal('','Este predio es considerado como un predio Patrimonial, debe realizar la solicitud de autorización menor en la Dirección de Administración Territorial y Catastro, ubicado en el Edificio Tobia Piso 6', 'error');
                            return;
                        }
                        else{
                            $scope.setSolicitudDatosPredio(datosPredio);
                        }
                    }
                    else{
                        //console.log("No se encontró la cartilla del predio con Código Catastral: " + data);
                        swal('','No se encontró la cartilla del predio con Código Catastral: ' + datosPredio.codigoCatastral+ "", 'error');
                        return;
                    }


                }
                else if(resApi.success.dataSql.length == 0){
                    //console.log("No se encontro el Predio con CC: " + codCat);
                    swal('error1', 'No se encontró el predio con Código Catastral ' + codCat+ " en la tabla consolidada", 'error');
                }
                else{
                    //console.log("Se encontro mas de un registro con el CC: " + codCat);
                    swal('error2', 'Se encontró más de un registro con el mismo Código Catastral '+ codCat +' en la tabla consolidada', 'error');
                }
                //$.unblockUI();
            }
            else
            {
                //$.unblockUI();
                swal('', 'Error al recuperar datos', 'error');
                console.log("Error getPredio",resApi.error.message,resApi.error.code);
            }
        });

        var predio2 = new dataSIT();
        predio2.tipoVia(codCat,function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                if(resApi.success.dataSql.length == 1){
                    $scope.solicitud.tipoVia=0;
                    if(resApi.success.dataSql[0].ViaPrincipal){
                        $scope.solicitud.tipoVia=1;
                    }
                }
                else{
                    $scope.solicitud.tipoVia=0;
                }
            }
            else
            {
                $.unblockUI();
                swal('', 'Error al recuperar datos', 'error');
                console.log(" Error getPredio",resApi.error.message,resApi.error.code);
            }
        });
    };

    $scope.setSolicitudDatosPredio = function (data){
        //Restriccion predio sin cartilla
        if(data.idPCCartilla==null){
            //console.log("No se encontró la cartilla del predio con Código Catastral: " + data);
            swal('','No se encontró la cartilla del predio con Código Catastral: ' + data.codigoCatastral+ "", 'error');
            return;
        }
        $scope.solicitud.codigoCatastral = data.codigoCatastral;
        $scope.solicitud.macrodistrito = data.macrodistrito;
        $scope.solicitud.zona = data.zona.trim();
        $scope.solicitud.tipoVia = data.tipoVia;
        $scope.solicitud.nombreVia = data.nombreVia;
        $scope.solicitud.anchoVia = data.anchoVia;
        $scope.solicitud.riesgoConstruccionLocalizacionCategoria=data.riesgoConstruccionLocalizacionCategoria!=null?data.riesgoConstruccionLocalizacionCategoria:"";
        $scope.solicitud.nroPuerta = data.nroPuerta;
        $scope.solicitud.direccion = data.direccion;
        $scope.solicitud.nroInmueble = data.nroInmueble;
        $scope.solicitud.superficieReal = data.superficieReal;
        $scope.solicitud.superficieRealCatastro = data.superficieReal;
        $scope.solicitud.idPendTerreno = data.idPendTerreno;
        $scope.solicitud.riesgoConstruccionLocalizacionCategoria = data.zonaRiesgo;
        $scope.solicitud.lusu = data.patronLusu;
        $scope.solicitud.distritoMunicipal = data.DistritoMunicipal;
        $scope.solicitud.idPCCartilla = data.idPCCartilla;
        $scope.solicitud.pendTerreno = data.pendTerreno.trim();
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
        if(data.cartillaLusu!=null) {
            $scope.solicitud.patronLusu = data.cartillaLusu; //en consolidado contiene el nombre del patron completo
        }
        else{
            $scope.solicitud.patronLusu="";
        }
        // $scope.configCartilla.patron = $scope.solicitud.lusu;
        // $scope.configCartilla.url = $scope.configCartilla.urlTemplate.replace('{distrito}',$scope.solicitud.distritoMunicipal).replace('{patron}',data.patronLusu);
        //console.log("setSolicitudPredio,solicitud",$scope.solicitud);
        $scope.cambiarPaso($scope.flujo.pasos.paso2);
    };

    //$scope.varTipoTramite=0;
    $scope.selectTipoTramite=function(){
            //console.log("tipoTramite",$scope.solicitud.idSubTipoTramite);
            //para el caso del combo en seleccion
            if($scope.solicitud.idSubTipoTramite==null){
                $scope.tramiteSinInspeccion=null;
                $scope.tramiteConInspeccion=null;
                return;
            }

            var variables = new dataSITOL();
            variables.getVariables($scope.solicitud.idSubTipoTramite,0,"C1",function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                var countVariables=resApi.success.dataSql.length;
                $scope.listaVariables=resApi.success.dataSql;
                if($scope.solicitud.idSubTipoTramite!=null){
                    $scope.rowTramite={};
                    $scope.rowTramite=$filter('filter')($scope.listaTipoTramite,{idSubTipoTramite: $scope.solicitud.idSubTipoTramite},true)[0];
                    //console.log("rowTramite",$scope.rowTramite);

                    $scope.listaRequisitos=[];
                    $scope.datos=[];
                    $scope.solicitud.requisitos="";
                    $scope.variables=[];


                    if($scope.renovacionOcuAcera.origenBandeja==false){
                        if($scope.rowTramite.idSubTipoTramite==$scope.idSubTipoTramiteOcuAcera){
                            $scope.rowTramite.tipoSolicitud=$scope.renovacionOcuAcera.tiposolicitudTemp;
                            //console.log("rowTramite10",$scope.rowTramite);
                            //revision para tramites con renovacion
                            var renovacion=$scope.revisarRenovacion($scope.solicitud.codigoCatastral);
                            if(renovacion==true){
                                swal('','Tiene un tramite en plazo en su bandeja','error');
                                $scope.tramiteSinInspeccion=null;
                                $scope.tramiteConInspeccion=null;
                                return;
                            }
                        }
                    }

                    else{  //entra por el boton de renovacion, bandeja de tramites
                        $scope.rowTramite.tipoSolicitud=0;  //seteo para convertir el tramite de tipo online
                        //console.log("rowTramite20",$scope.rowTramite);
                    }

                    //seleccion de tipo de tramite, en linea o inmediato
                    //console.log("tipoSolicitud",$scope.rowTramite.tipoSolicitud,$scope.listaTipoTramite);
                    if($scope.rowTramite.tipoSolicitud===1 || $scope.rowTramite.tipoSolicitud===2){ //-------tramites por plataforma
                        $scope.tramiteSinInspeccion=null;
                        $scope.tramiteConInspeccion=$scope.tipoTramite;
                        $scope.solicitud.idEstado=3; //- estado de tramite - enviado a plataforma.
                        $scope.getRequisitos($scope.rowTramite);
                    }
                    //-- -----------------------
                    //--  Tramites en linea
                    else if($scope.rowTramite.tipoSolicitud===0){
                        $scope.tramiteConInspeccion=null;
                        $scope.tramiteSinInspeccion=$scope.tipoTramite;
                        $scope.solicitud.idEstado=5; //--estado de tramite -- pendiente de pago
                        //cargar monto
                        var monto = new dataSIT();
                        monto.amTasaValor($scope.solicitud.idSubTipoTramite,$scope.solicitud.idPCCartilla,$scope.solicitud.tipoVia,countVariables,"C1",function(resultado){
                            var resApi = JSON.parse(resultado);
                            if(resApi.success)
                            {
                                //$scope.predioSeleccionadoPropietarios = resApi.success.dataSql.len;
                                if(resApi.success.dataSql.length){
                                    $scope.tasaValor=resApi.success.dataSql[0];
                                    //console.log("IdCartilla",$scope.solicitud.idPCCartilla,"getMonto",$scope.tasaValor);
                                    $scope.solicitud.monto=$scope.tasaValor.valor;
                                    //if(!($scope.tasaValor.aplicablePor.includes("Tasa mínima") || $scope.tasaValor.aplicablePor.includes("Tasa única por trámite"))){
                                        //console.log("no es tasa mínima ni única");
                                        $scope.getListaVariable();
                                    //}
                                    /*else if( $scope.listaVariables.length>0){
                                        if($scope.listaVariables[0].idTipoVariable==3){
                                            $scope.getListaVariable();
                                        }
                                    }
                                    else{
                                        //if($scope.tasaValor.aplicablePor.includes("Tasa mínima"))
                                        //console.log(" tasa mínima");
                                        //swal('','Error al recuperar datos-TASA VALOR', 'error');
                                        //if($scope.tasaValor.aplicablePor.includes("Tasa única por trámite"))
                                        //console.log(" tasa única");
                                    }*/
                                    $.unblockUI();
                                }
                                else
                                {
                                    swal('','Error al recuperar datos-TASA VALOR', 'error');
                                    console.log("ERROR EN TASA VALOR",resApi.error.message,resApi.error.code);
                                    $.unblockUI();
                                }
                            }
                            else
                            {
                                swal('','Error al recuperar datos-TASA VALOR', 'error');
                                console.log("ERROR EN TASA VALOR",resApi.error.message,resApi.error.code);
                                $.unblockUI();
                            }
                        });
                    }
                    else{
                        $scope.tramiteSinInspeccion=null;
                        $scope.tramiteConInspeccion=null;
                    }

                }
                else{
                    $scope.tramiteSinInspeccion=null;
                    $scope.tramiteConInspeccion=null;
                }

            }
            else
            {
                swal('', 'Error al recuperar datos1', 'error');
                console.log(" ERROR LISTA TRAMITES ",resApi.error.message,resApi.error.code);
            }
        });
        //console.log("select tramite:",$scope.solicitud.idSubTipoTramite,item);
    };

    $scope.getListaVariable=function(){
        var variables = new dataSITOL();
        variables.getVariables($scope.solicitud.idSubTipoTramite,0,"C1",function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.variables=resApi.success.dataSql;
                //console.log("variables",$scope.variables);
                $scope.datos=[];
                $scope.variables.forEach(function(element){
                    $scope.datos.push({idVariable:element.idVariable,valor:0,idTipoDato:element.idTipoDato});
                });

                ///para recuperar datos
                //console.log("datos",$scope.datos,$scope.solicitud.idFichaTecnica);
                //console.log("datos",$scope.datos,$scope.renovacionOcuAcera);
                if($scope.renovacionOcuAcera.existeTramite==true){
                    //desabilita opciones
                    $scope.txtInputNumber=true;
                    $scope.txtInputText=true;
                    //seteo de los valores para el nuevo tramite
                    variables.getVariables($scope.solicitud.idSubTipoTramite, $scope.renovacionOcuAcera.idFichaTecnica, "C2", function (resultado2){
                        var resApi2 = JSON.parse(resultado2);
                        if (resApi2.success){
                            //console.log("datosVariable", $scope.datos, resApi2.success.dataSql);
                            $scope.valores=resApi2.success.dataSql;
                            $scope.datos.forEach(function(element){
                                $scope.rowDato= $filter('filter')($scope.valores,{idVariable: element.idVariable},true)[0];
                                //console.log("rowdatos",$scope.rowDato);
                                element.valor=$scope.rowDato.dato;
                            });

                        }
                        else{
                            swal('','Error al recuperar datos', 'error');
                            console.log("Error datos", resApi2.error.message, resApi2.error.code);
                        }
                    });
                }
                else{
                    $scope.txtInputNumber=false;
                    $scope.txtInputText=false;
                }
            }
            else
            {
                swal('', 'Error al recuperar datos', 'error');
                console.log("Error getVariables",resApi.error.message,resApi.error.code);
            }
        });

        //
        variables.getVariables($scope.solicitud.idSubTipoTramite,0,"C5",function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                //console.log("opciones variables",resApi.success);
                $scope.opciones=resApi.success.dataSql;
            }
            else
            {
                swal(' ', 'Error al recuperar datos', 'error');
                console.log("Error opciones",resApi.error.message,resApi.error.code);
            }
        });
    };
    //-- ----------------------------------
    //-- paso 3,
    //-- ----------------------------------

    $scope.registrarSolicitud=function(){
        if($scope.rowTramite.tipoSolicitud===1 || $scope.rowTramite.tipoSolicitud===2){ //tramites por plataforma
            $scope.solicitud.fum=0;
            $scope.guardarSolicitud();
            $.unblockUI();
        }
        else if($scope.rowTramite.tipoSolicitud==0){ //tramites en linea
            //calcular monto de acuerdo a las variables
            if($scope.variables.length){//existen parametros de entrada
                //verificar los campos llenados
                $scope.verificarVariables=true;
                $scope.solicitud.monto=$scope.tasaValor.valor;
                //console.log("valor de tasa",$scope.tasaValor.valor);
                //

                //para la multiplicacion
                $scope.datos.forEach(function (element){
                    //console.log("valores",element);
                    if(element.valor<=0 || element.valor.length<=0){
                        if(element.idVariable!=21){
                            $scope.mensajeErrorVariables="Complete los campos";
                            $scope.verificarVariables=false;
                        }
                    }
                    else{
                        //console.log("valores aceptables",element,$scope.tasaValor);
                        if(!($scope.tasaValor.aplicablePor.includes("Tasa mínima")||$scope.tasaValor.aplicablePor.includes("Tasa única por trámite"))){

                            if(element.idTipoDato==1){
                                //console.log("elemento tipo 1",element);
                                $scope.solicitud.monto=parseFloat($scope.solicitud.monto)*parseFloat(element.valor);//multiplicamos por los valores de entrada
                            }
                            //console.log("valores aceptables",element,"monto:"+$scope.solicitud.monto);
                        }
                        //para tomar dato de tasa unica
                        // else if($scope.listaVariables.length>0){
                        //     if($scope.listaVariables[0].idTipoVariable==3){
                        //         $scope.solicitud.monto=$scope.datos[0].valor;
                        //     }
                        // }
                    }

                    // if($scope.verificarVariables===false){
                    //     return;
                    // }
                });
                //para la suma
                if($scope.solicitud.idSubTipoTramite==10){
                    var montoMuro = 1;
                    $scope.datos.forEach(function (element){
                        if (element.idTipoDato == 2){
                            // console.log("tipo dato:"+element.idTipoDato,"element",element);
                            // console.log("elemento tipo 2", element);
                            if (element.idVariable == 11){
                                if (parseFloat(element.valor) == 0.01){
                                    element.valor = 0;
                                }
                            }
                            montoMuro = parseFloat(montoMuro) * parseFloat(element.valor);
                        }
                    });
                    $scope.solicitud.monto = parseFloat($scope.solicitud.monto) + parseFloat(montoMuro);
                }
                $scope.solicitud.monto=Math.round($scope.solicitud.monto * 100) / 100;
            }
            else{
                //console.log("monto sin variables:"+$scope.solicitud.monto);
                $scope.verificarVariables=true;
            }

            ///realizamos la solicitud
            if($scope.verificarVariables===true){
                $scope.generarProforma();
            }
        }
        else{
            swal('error', 'Autorización menor', 'error');
            $scope.tramiteSinInspeccion=null;
            $scope.tramiteConInspeccion=null;
        }
    };

    $scope.generarProforma = function(){
        //Registro FUM Inicio
        if($scope.rowTipoTramiteTemp.idItemFum!=null){
            var idItemFum=$scope.rowTramite.idItemFum;
            //console.log("item lleno",idItemFum);
        }
        else{
            //console.log("tipo de item vacio");
            var idItemFum=3;//modificar
        }
        var p;
        //console.log("Proforma",tipoPersona);
        //asignamos monto de prueba
        //$scope.solicitud.monto=0.1;
        if (tipoPersona == 'NATURAL'){
            p = {
                tipoDoc: 'CEDULA DE IDENTIDAD',
                nroDoc:   $scope.solicitud.numeroDocumentoSol,
                expedido: $scope.solicitud.expedido,
                nombres:  $scope.solicitud.nombreSolicitante,
                paterno:  $scope.solicitud.paternoSolicitante,
                materno:  $scope.solicitud.maternoSolicitante,
                casada:   '',//adefinir por  integra
                fechanac: $scope.solicitud.fechaNacimiento,
                razonsocial: 'RSN',
                tipoItem:idItemFum,
                monto:$scope.solicitud.monto
                //tkn:'',//$scope.resultadoBusqueda.tkn,
                //cc:''//$scope.resultadoBusqueda.codCat
            };
        }
        else{
            p = {
                tipoDoc: 'NIT',
                nroDoc: $scope.solicitud.numeroDocumentoSol,
                expedido: $scope.solicitud.expedido,
                nombres: $scope.solicitud.nombreSolicitante,
                paterno: $scope.solicitud.paternoSolicitante,
                materno: $scope.solicitud.maternoSolicitante,
                casada: '',//adefinir por  integra
                fechanac: $scope.solicitud.fechaNacimiento,
                razonsocial: 'RSJ',
                tipoItem:idItemFum,
                monto:$scope.solicitud.monto
                //tkn:'',//$scope.resultadoBusqueda.tkn,
                //cc:''//$scope.resultadoBusqueda.codCat
            };
        }
        //console.log("2. registrando fum, datos enviados:",p);
        $http({
            method: 'POST',
            url: CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/RegFUMAMenor',
            data: Object.toparams(p),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            if(data.res == 'OK')
            {
                $scope.solicitud.fum=data.fum;
                $scope.guardarSolicitud();
                //console.log("Se registro FUM, datos devueltos:" , data);
            }
            else
            {
                $scope.RegistroFUM={
                    registrado:null,
                    mensaje:'Surgió un error al registrar la proforma de pago'+data.msg
                };
                swal('', $scope.RegistroFUM.mensaje, 'error');
            }
        }).error(function (data, status, headers, config) {
            //console.log("error registro fum SIT ext, datos devueltos:", data);
            swal('', 'Error al registrar proforma de pago', 'error');
        });
        //Registro Fum - Fin
    };

    $scope.guardarSolicitud=function(){
        $scope.solicitud.idTipoTramite=$scope.rowTramite.idTipoTramite;
        // if($scope.solicitud.idPCCartilla== undefined)//validar que exista cartilla
        //     $scope.solicitud.idPCCartilla=0;
        if($scope.rowTramite.tipoSolicitud===1 || $scope.rowTramite.tipoSolicitud===2){ //tramites por plataforma
            $scope.solicitud.monto=0;//se envia monto 0 para enviar la cadena sin errores
        }
        else if($scope.rowTramite.tipoSolicitud===0){   //tramites en linea
            $scope.solicitud.requisitos = ""; //no fijamos requisitos para tramites en linea,**********
            //console.log("datos tramite",$scope.datos,"rowDatos",$scope.rowDato1,$scope.solicitud.DiasExpiracionAM,"existe ren",$scope.renovacionOcuAcera.existeTramite);
            if($scope.renovacionOcuAcera.existeTramite==true)
            {
                $scope.solicitud.idSubTipoTramite=$scope.idSubTipoTramiteOcuRenovacion;//fija a tipo de tramite ampliacion

                $scope.rowDato1= $filter('filter')($scope.datos,{idVariable: 3},true)[0];//quitar hardcore

                $scope.solicitud.DiasExpiracionAM=parseInt($scope.renovacionOcuAcera.diasRestantes)+parseInt($scope.rowDato1.valor);
                //console.log("datos tramite",$scope.datos,"rowDatos",$scope.rowDato1,$scope.solicitud.DiasExpiracionAM);
            }
        }
        else{
            //console.log("ninguno");
            $scope.tramiteSinInspeccion=null;
            $scope.tramiteConInspeccion=null;
        }

        var solicitud = new dataSITOL();
        solicitud.amSolicitudReg(
            $scope.solicitud.idTipoTramite,
            $scope.solicitud.idSubTipoTramite,
            $scope.solicitud.macrodistrito,
            $scope.solicitud.distritoMunicipal,
            $scope.solicitud.lusu,
            $scope.solicitud.patronLusu,
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

            // $scope.solicitud.autorizacionEntregaDocumentos,
            // $scope.solicitud.autorizacionSeguimientoTramite,
            // $scope.solicitud.riesgoConstruccionLocalizacionCategoria,
            // $scope.solicitud.idPendTerreno,
            $scope.solicitud.anchoVia,
            $scope.solicitud.riesgoConstruccionLocalizacionCategoria,
            $scope.solicitud.idEstado,
            $scope.solicitud.idPCCartilla,
            $scope.solicitud.zona,
            $scope.solicitud.direccion,
            $scope.solicitud.nroInmueble,
            $scope.solicitud.pendienteVia,
            $scope.solicitud.requisitos,
            $scope.solicitud.fum,
            $scope.solicitud.monto,
            $scope.solicitud.DiasExpiracionAM
            , function(resultado){
                var resApi = JSON.parse(resultado);
                if(resApi.success)
                {
                    if(resApi.success.dataSql[0].d)
                    {
                        //guardar registro de fum
                        var idFichaTecnica=resApi.success.dataSql[0].d;

                        //console.log("show resp",resApi.success.dataSql[0],"idFichaTecnica",idFichaTecnica);
                        $('#visorFum object').attr("data","");
                        $('#visorFum1 object').attr("data","");
                        $scope.flujo.paso = $scope.flujo.pasos.paso3;
                        $scope.varSpin = true;
                        $scope.getSolicitudesUnico();

                        $scope.rowsolicitud= $filter('filter')($scope.listaSolicitudes,{idFichaTecnica:idFichaTecnica},true)[0];
                        if($scope.rowTramite.tipoSolicitud===1 || $scope.rowTramite.tipoSolicitud===2){ //tramites por plataforma
                            $scope.generarSolicitud(idFichaTecnica,$scope.rowsolicitud.pisol);
                            $.unblockUI();
                        }
                        else if($scope.rowTramite.tipoSolicitud===0){ //tramites en linea
                            //console.log("solicitud",$scope.listaSolicitudes,idFichaTecnica,$scope.rowsolicitud,$scope.solicitud.fum);
                            $scope.guardarProforma($scope.rowsolicitud.pf,$scope.rowsolicitud.pisol);
                            $scope.guardarSolicitudPago(idFichaTecnica,$scope.rowsolicitud.fum);
                            $scope.guardarDatosVariable(idFichaTecnica);
                        }
                        else{
                            //console.log("ninguno");
                            //swal('solicitud realizada', 'Autorización menor', 'success');
                            $scope.tramiteSinInspeccion=null;
                            $scope.tramiteConInspeccion=null;
                        }
                        if($scope.renovacionOcuAcera.existeTramite==true)
                        {
                            var solicitud = new dataSITOL();
                            solicitud.actualizarIdFichaAnterior(idFichaTecnica,$scope.renovacionOcuAcera.idFichaTecnica, function(resultado){
                                var resApi = JSON.parse(resultado);
                                if(resApi.success)
                                {
                                    var data10 = resApi.success.dataSql;
                                }
                                else
                                {
                                    //console.log("actualizarIdFichaAnterior",resApi.error.message, resApi.error.code);
                                }
                            });
                        }
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
                    swal('', 'Error al guardar solicitud', 'error');
                    console.log("Error al guardar solicitud",resApi.error.message,resApi.error.code);
                }
            });
    };

    $scope.generarSolicitud=function(idFichaTecnica,pisol){
        p = {
            //pf:pf,
            pisol:pisol
            //tkn:'',//$scope.resultadoBusqueda.tkn,
            //cc:''//$scope.resultadoBusqueda.codCat
        };
        // var xx=CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/GenerarSolicitudPDFautorizacioMenor';
        // console.log("2. solicitud, datos enviados:",p,xx);
        $http({
            method:'POST',
            url: CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/GenerarSolicitudPDFautorizacioMenor',
            data: Object.toparams(p),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config){
            //console.log("Se guardo pdf, datos devueltos:" , data);
            if(data.res == 'OK')
            {
                $scope.ImprimirSolicitud(pisol);
                $scope.solicitud.fum=data.fum;
                //$scope.saveSolicitud();
            }
            else
            {
                $scope.idMotivoDetalle =0;
                $scope.idMotivo =0;
                $scope.RegistroFUM = {
                    registrado:null,
                    mensaje:'Surgió un error al generar la solicitud de Autorización menor, por favor vuelva a intentar'
                };
            }
        }).error(function (data, status, headers, config){
            //console.log("error al generar la solicitud de Autorización menor");
            $('#ModalTramite').modal('hide');
            swal('', 'Error al generar la solicitud de Autorización menor', 'error');
            var AmSol = new dataSITOL();
            AmSol.amSolicitud(idFichaTecnica,"B1",function(resultado){
                var resApi = JSON.parse(resultado);
                if(resApi.success)
                {
                    //console.log("registro borrado correctamente",resApi.success);
                    $scope.getSolicitudes();
                }
                else
                {
                    //swal('', 'Error al recuperar datos', 'error');
                    //console.log("error al borrar registro",resApi.error.message,resApi.error.code);
                    $.unblockUI();
                }
                $scope.resetSolicitud();
                $scope.flujo.paso = $scope.flujo.pasos.paso0;
            });
        });
    };

    $scope.guardarProforma=function(pf,pisol){
        p = {
            pf:pf,
            pisol:pisol
            //tkn:'',//$scope.resultadoBusqueda.tkn,
            //cc:''//$scope.resultadoBusqueda.codCat
        };
        //console.log("2. guardando fum, datos enviados:", p);
        $http({
            method: 'POST',
            url: CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/GuardarProforma',
            data: Object.toparams(p),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            //console.log("Se guardo pdf FUM, datos devueltos:" , data);
            if(data.res==='OK')
            {
                $scope.solicitud.fum=data.fum;
                //$scope.varSpin = false;
                //console.log("archivo guardado",data);
                $scope.ImprimirProforma(pisol);
            }
            else
            {
                $scope.idMotivoDetalle =0;
                $scope.idMotivo =0;
                $scope.RegistroFUM = {
                    registrado:null,
                    mensaje:'Surgió un error al registrar la proforma de pago, por favor vuelva a intentar'
                };
            }
        }).error(function (data, status, headers, config) {
            console.log("error registro fum SIT ext, datos devueltos:", data);
            swal('', 'Error al registrar proforma de pago', 'error');
        });
    };

    $scope.guardarDatosVariable=function(idFichaTecnica) {
        $scope.datos.forEach(function(element){
            //console.log("dato:",element);
            //guardarDatosVariable
            var VariableDatos = new dataSITOL();
            VariableDatos.guardarDatosVariable(element.valor,idFichaTecnica,element.idVariable,"A1",function(resultado){
                var resApi = JSON.parse(resultado);
                if(resApi.success)
                {
                    //console.log("variableDato:",resApi.success);
                }
                else
                {
                    swal('', 'Error al recuperar datos', 'error');
                    console.log("Error guardarDatosVariable",resApi.error.message,resApi.error.code);
                    $.unblockUI();
                }
            });
        });
    };
    ///-------------------------------------
    // ******funciones auxiliares****************
    ///-------------------------------------
    ///-------------------------------------
    $scope.guardarSolicitudPago=function(idPcFichaTecnica, fum){
        var fecha = new Date();
      var registrarFum = new  dataSITOL();
      //console.log("fecha",fecha);
        registrarFum.solicitudPago(0,idPcFichaTecnica,fum,"AUTORIZACIONES MENORES",0,1,0,"A1",function (resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                //console.log("registro fum realizado");
                $.unblockUI();
            }
            else
            {
                swal('', 'Error al registrar solicitud fum', 'error');
                console.log("Error al registrar datos fum",resApi.error.message,resApi.error.code);
                $.unblockUI();
            }
        });
    };

    $scope.ImprimirSolicitud = function (pisol){
        $scope.msgPrevioPDF="";
        $scope.varSpin = true;
        $('#visorFum object').attr("data","");
        $('#visorFum1 object').attr("data","");
        //console.log("solicitud",sol);
        var urlFum = CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/VerSolicitudAMenor?d=' + pisol;
        //window.open(urlFum,"_blank");
        $('#visorFum object').attr("data",urlFum);
        $('#visorFum1 object').attr("data",urlFum);
        $scope.varSpin=false;
    };

    $scope.verRequisitos=function(element){
        //console.log("ver requisitos",element);
        $scope.getRequisitos(element);
    };

    $scope.getRequisitos=function(rowTramite){
        $.blockUI();
        var requisitos = new dataSIT();
        requisitos.amLstRequisitos(0,0,0,0,rowTramite.idTipoTramite,rowTramite.idSubTipoTramite,0,function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                $scope.listaRequisitos=resApi.success.dataSql;
                $.unblockUI();

                var requisitos=""; //capturamos IDs Requisitos
                $scope.listaRequisitos.forEach(function (element){
                    requisitos=requisitos+element.idDocumento+",";
                });
                $scope.solicitud.requisitos = requisitos.slice(0, -1);
                //console.log("req",$scope.solicitud.requisitos);
            }
            else
            {
                $.unblockUI();
                swal('', 'Error al recuperar datos', 'error');
                console.log("Error ListaRequisitos",resApi.error.message,resApi.error.code);
            }
        });
    };

    $scope.ImprimirProforma = function (pisol){
        $scope.msgPrevioPDF="";
        //console.log("var piif",pisol);
        $('#visorFum object').attr("data","");
        $('#visorFum1 object').attr("data","");
        var urlFum = CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/VerProformaAMenor?d=' + pisol;
        $('#visorFum object').attr("data",urlFum);
        $('#visorFum1 object').attr("data",urlFum);
        $timeout(function(){$scope.varSpin=false}, 1000);
    };

    $scope.VerAutorizacion = function (sol){
        $scope.msgPrevioPDF="";
        $('#visor2 object').attr("data","");
        $scope.varSpin = true;
        var urlFum = CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/VerAutorizacionMenor?d=' + sol.pisol;
        //console.log("url:",urlFum);
        $('#visor2 object').attr("data",urlFum);
        $timeout(function(){$scope.varSpin=false}, 1000);
    };

    $scope.solActFumPagado=function(solicitud){
        $.blockUI();
        //console.log("generando",solicitud);
        var ActSolicitud = new dataSITOL();
        ActSolicitud.amSolicitud(solicitud.idFichaTecnica,"A3",function(resultado){
            var resApi = JSON.parse(resultado);
            if(resApi.success)
            {
                //console.log("fum pagado generando pdf",resApi.success);
                $scope.GenerarInformeAM(solicitud.pisol);

            }
            else
            {
                swal('', 'Error al actualizar solicitud fum', 'error');
                console.log("Error actualizar fum pagado",resApi.error.message,resApi.error.code);
            }
        });
    };

    $scope.GenerarInformeAM = function (pisol){

        p = {
            //pf:pf,
            pisol:pisol
            //tkn:'',//$scope.resultadoBusqueda.tkn,
            //cc:''//$scope.resultadoBusqueda.codCat
        };
        //var xx = CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/GenerarAutorizacionMenor';
        //console.log("GenerarInformeAM:datos enviados",p,xx);
        $http({
            method:'POST',
            url: CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/GenerarAutorizacionMenor',
            data: Object.toparams(p),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            //console.log("Se guardo solicitud, datos devueltos:" , data);
            if(data.res == 'OK')
            {
                //console.log("solicitud generada");
                $scope.getSolicitudesUnico();
                $.unblockUI();
                //$scope.ImprimirSolicitud(pisol);
                //$scope.solicitud.fum=data.fum;
                //$scope.saveSolicitud();
            }
            else
            {
                $.unblockUI();
                $scope.idMotivoDetalle =0;
                $scope.idMotivo =0;
                $scope.RegistroFUM = {
                    registrado:null,
                    mensaje:'Surgió un error al registrar la proforma de pago, por favor vuelva a intentar'
                };
            }
        }).error(function (data, status, headers, config) {
            $.unblockUI();
            console.log("Error registro fum SIT ext, datos devueltos:", data);
            swal('', 'Error al registrar proforma de pago', 'error');
        });

    };


    $scope.DescargarModeloDoc=function(archivo){
        var urlModelo = CONFIG.SERVICE_SITOLextgen+ 'AutorizacionesMenores/archivosModelo?path=' + archivo;
        //console.log("modelo",urlModelo);
        window.open(urlModelo,"_blank");
    };

    /*$scope.cmbDatoVariableSelected=function (opcion,dato,variable){
        $scope.rowVariable= $filter('filter')(dato,{idVariable: variable.idVariable},true)[0];
        //console.log("selected combo",opcion,dato,variable,$scope.rowVariable);
        return opcion.dato == $scope.rowVariable.valor;
    };*/

    ///------------------------------------
    // DOCUMENTOS PLATAFORMA
    $scope.ImprimirProformaPlataforma = function (piif){
        $('#visorFum object').attr("data","");
        $('#visorFum1 object').attr("data","");
        $('#visor2 object').attr("data","");
        $scope.msgPrevioPDF="";
        p = {
            piif:piif
        };
        $http({
            method:'POST',
            url: CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/VerificaDocumentoFum',
            data: Object.toparams(p),
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config){
            //console.log(", datos devueltos:" , data);
            if(data.res == 'OK')
            {
                //console.log("var piif ok",piif);

                var urlFum = CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/DocumentoFum?q=' + piif;
                $('#visorFum object').attr("data",urlFum);
                $('#visorFum1 object').attr("data",urlFum);
                $timeout(function(){$scope.varSpin=false}, 1000);
            }
            else
            {
                //console.log("error-documento");
                $scope.msgPrevioPDF="ARCHIVO NO GENERADO";
            }
        }).error(function (data, status, headers, config){
            console.log("Error VerificaDocumentoFum, datos devueltos:", data);
            swal('', 'Error verificando documento FUM', 'error');
        });
    };

    $scope.ImprimirSolicitudPlataforma = function(piif){
        $('#visorFum object').attr("data","");
        $('#visorFum1 object').attr("data","");
        $('#visor2 object').attr("data","");
        $scope.msgPrevioPDF="";
        p = {
            piif:piif
        };
        $http({
            method:'POST',
            url: CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/VerificaDocumentoSolicitud',
            data: Object.toparams(p),
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config){
            //console.log(", datos devueltos:" , data);
            if(data.res == 'OK')
            {
                $scope.varSpin = true;

                //console.log("solicitud",sol);
                var urlFum = CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/DocumentoSolicitud?q=' + piif;
                //window.open(urlFum,"_blank");
                $('#visorFum object').attr("data",urlFum);
                $('#visorFum1 object').attr("data",urlFum);
                $timeout(function(){$scope.varSpin=false}, 1000);
            }
            else
            {
                //console.log("Ruta no encontrada");
                $scope.msgPrevioPDF="ARCHIVO NO GENERADO";
            }
        }).error(function (data, status, headers, config){
            console.log("Error VerificaDocumentoSolicitud:", data);
            swal('', 'Error verificando solicitud', 'error');
        });
    };

    $scope.VerAutorizacionPlataforma = function (piif){
        $('#visor2 object').attr("data","");
        $('#visorFum object').attr("data","");
        $('#visorFum1 object').attr("data","");
        $scope.msgPrevioPDF="";
        p = {
            piif:piif
        };
        $http({
            method:'POST',
            url: CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/VerificaDocumentoInforme',
            data: Object.toparams(p),
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config){
            //console.log(", datos devueltos:" , data);
            if(data.res == 'OK')
            {
                $scope.varSpin = true;

                var urlFum = CONFIG.SERVICE_SITOLextgen + 'AutorizacionesMenores/DocumentoInforme?q=' + piif;
                //console.log("url:",urlFum);
                $('#visor2 object').attr("data",urlFum);
                $timeout(function(){$scope.varSpin=false}, 1000);
            }
            else
            {
                //console.log("Ruta no encontrada");
                $scope.msgPrevioPDF="ARCHIVO NO GENERADO";
            }
        }).error(function (data, status, headers, config){
            console.log("error VerificaDocumentoInforme:", data);
            swal('', 'Error verificando permiso', 'error');
        });
    };
    ///------------------------------------
    $scope.accionSeguimientoFlujo = function (sol){
        //console.log("solicitud",sol);
        if(sol.piif)
        {
            var p = {q: sol.piif};
            $http({
                method: 'POST',
                url: CONFIG.SERVICE_SITOLextgen + 'ApiMotorFlujo/FlujoSeguimientoTarea',
                data: Object.toparams(p),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config){
                if(data.res)
                {
                    swal('', 'Error al consultar seguimiento de trámite', 'error');
                }
                else{
                    $('#seguimientoNroSolicitud').val(sol.idFichaTecnica);
                    $('#seguimientoTipoTramite').val('AUTORIZACIONES MENORES');
                    $scope.listaSeguimientoTareas = data;
                    $('#divPopupSeguimiento').modal('show');
                }
            }).error(function (data, status, headers, config) {
                swal('', 'Error al consultar seguimiento de trámite', 'error');
            });
        }
        else
        {
            $.unblockUI();
            swal('', 'Error al consultar seguimiento de trámite', 'error');
            //console.log("No se puede ver el seguimiento, parámetro no valido");
        }
    };

    $scope.accionPagoOL = function(sol){
        sessionService.set('IDFUM', sol.fum);
        //console.log("fum continuar epago::",sol); //,",  IDFUM: "+sessionService.get('IDFUM')
        //console.log("token continuar epago::",sessionService.get('TOKEN'));
        window.location.href = "#servicios|epagos";
    };

    // $scope.versolicitud=function(datos,variable){
    //     //  console.log(datos,variable);
    // };

    $scope.cmbDatoVariableSelected=function (opcion,dato,variable){
        $scope.rowVariable=$filter('filter')(dato,{idVariable:variable.idVariable},true)[0];
        //console.log("selected combo",opcion,dato,variable,$scope.rowVariable);
        return opcion.dato == $scope.rowVariable.valor;
    }
});