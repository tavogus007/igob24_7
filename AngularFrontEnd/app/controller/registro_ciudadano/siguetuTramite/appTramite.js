app.controller('tutramiteController', function ($scope,$timeout, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, DreamFactory, $element, sweet, registroLog, filterFilter,FileUploader,ngTableParams, $filter, fileUpload,wsRgistrarPubliciadad, $window) {
    "use strict";
    //var mensajeExito = "Estimado usuario, se proceso su solicitud";
    var msjRegistroNoEncontrado     = "Estimado usuario, su trámite no fue encontrado";
    var msjError                    = "Ocurrio un problema con la conexion, intente nuevamente porfavor";
    var msjTrmsRegistroNoEncontrado = "Estimado usuario, su trámite no fue encontrado";

    $scope.titulo = 'MIS CONSULTAS Y SEGUIMIENTOS DE TRÁMITES Y/O SERVICIOS';
    $scope.subtitulo = 'Si desea saber la ubicación y estado actual de su trámite, presione el botón ver.';
    $scope.grillasVacias = false;
    $scope.frmConsulta = "mostrar";
    $scope.tramiteRespuesta = false;
    $scope.btnVolverActivo = false;
    $scope.checkboxModel = {
        value1: false
    };
    $scope.toggle = true;
    $scope.styleOcultar = "";
    //$scope.aSconexionError = [];
    var aConexionError  = new Array(); 
    
    $scope.animarEstilo = function(){
        if($scope.checkboxModel.value1 == true){
            $scope.styleOcultar = "cssSlideUp";
            $scope.styleMostrar = "ng-hide";

        }
    };

    $scope.volverLimpiar = function(sel)
    {
        var ciCiudadano =   sessionService.get('CICIUDADANO');
        $scope.tramiteCiudadano =   [];                
        $scope.tramitesCiudadanoSimgepAE(ciCiudadano);
    }

    /*VALIDANDO AUTOCONSULTA AL CIUDADANO*/
    $scope.validarAutoconsulta = function(datos){
        console.log("DATOS AUTOCONSULTA:", datos);
        var miRegEx = /[\/]/g;
        //var caso    = "";
        var nro     = '000' + datos.tramite;
        //var pass    = datos.contrasenia;
        var pos     = nro.search(miRegEx);
        var sValor  = false;
        if(pos != -1){
            $scope.getTramitesAe(datos);
        }else{
            $scope.getTramiteSitram247(datos);
        }
    };

    /* AUTOCONSULTA AL CIUDADANO - SITRAM247*/
    $scope.getTramiteSitram247 = function(datos)
    {
        var nro     = datos.tramite;
        var pass    = datos.contrasenia;
        var parametrosSitram = {
            "procedure_name":"sp_lst_autoconsulta",
            "body": {
              "params": [
                {
                  "name": "nrotramite",
                  "value": nro
                },
                {
                  "name": "clave",
                  "value": pass
                }
              ]
            }
        };
        $.blockUI();
        DreamFactory.api[CONFIG.SERVICE_SITRAM247].callStoredProcWithParams(parametrosSitram).success(function (responseS){
            if(responseS.length > 0){
                $scope.grillaHistorialSitram247 = "mostrar";
                $scope.grillaTramitesLineaSitram247 = null;
                $scope.grillaHistorialSITRAM    = null;
                $scope.grillaHistorialAE        = null;
                $scope.frmConsulta              = null;
                $scope.grillaTramitesLinea      = null;
                $scope.historial                = responseS;
                $scope.btnVolverActivo = true;
                $.unblockUI();
            }
            else {
                $scope.getTramitesSitramPm(datos); //COMENTADO HASTA ENCTONTRAR UNA SOL CON LA CONEXION
                //sweet.show('Autoconsulta', msjRegistroNoEncontrado, 'error');
                //$.unblockUI();
            }
        })
        .error(function(error) {
            sweet.show('Autoconsulta', msjError, 'error');
            $.unblockUI();
        });
    };
    //SITRAM VALIDAR EL / ANTES DE ENVIAR - PM
    $scope.getTramitesSitramPm = function(datos){

        var nro     = datos.tramite;
        var pass    = datos.contrasenia;

        var parametrosSitram = {
            "procedure_name":"sp_lst_autoconsulta",
            "body": {
              "params": [
                {
                  "name": "nroTramite",
                  "value": nro
                },
                {
                  "name": "clave",
                  "value": pass
                }
              ]
            }
        };
	    //$.blockUI();
        DreamFactory.api[CONFIG.SERVICE_SITRAM247].callStoredProcWithParams(parametrosSitram).success(function (responseS){

            if(responseS.length > 0){
                $scope.grillaHistorialSITRAM = "mostrar";
                $scope.grillaHistorialNEXO = null;
                $scope.grillaHistorialAE = null;
                $scope.frmConsulta = null;
                $scope.grillaTramitesLinea = null;
                $scope.historial = responseS;
                $scope.btnVolverActivo = true;
                $.unblockUI();
            }
            else {
                $.unblockUI();
                sweet.show('Autoconsulta', msjRegistroNoEncontrado, 'error');
            }
        })
        .error(function(error) {
            $.unblockUI();
            sweet.show('Autoconsulta', msjError, 'error');
        });
    };



    /*AUTOCONSULTA AL CIUDADANO - SIMGEP TERRITORIAL*/
    $scope.getTramitesAe = function(datos){
        var nro = datos.tramite;
        var pass = datos.contrasenia;

        var parametrosAE = {
            "procedure_name":"sp_lst_autoconsulta",
            "body": {
              "params": [
                {
                  "name": "nroTramite",
                  "value": nro
                },
                {
                  "name": "clave",
                  "value": pass
                }
              ]
            }
        };
        //SIMGEP   ACTIVIDADES   ECONOMICAS
	    $.blockUI();
        var obj = null;
        try{
            obj = DreamFactory.api[CONFIG.SERVICE_SIMGEP_AE].callStoredProcWithParams(parametrosAE);        
        }catch(e){ alert("ERROR AL LEER");}

        
        obj.success(function (response){
            if(response.length > 0) {
                $scope.grillaHistorialAE = "mostrar";
                $scope.grillaHistorialSITRAM = null;
                $scope.grillaHistorialNEXO = null;
                $scope.grillaTramitesLinea = null;
                $scope.frmConsulta = null;
                $scope.historial = response;
                $scope.tramiteRespuesta = true;
                $scope.btnVolverActivo = true;
                $.unblockUI();
            } else {
                $scope.getTramitesTerritorial(datos);
            }
        })
        .error(function(error) {
            sweet.show('Autoconsulta', msjError, 'error');
            $scope.tramiteRespuesta = 'error';
            $.unblockUI();
        });
    };

    //SIMGEP   TERRITORIAL
    $scope.getTramitesTerritorial = function(datos){
        var nro     = datos.tramite;
        var pass    = datos.contrasenia;
        var parametrosTerritorial = {
            "procedure_name":"sp_lst_autoconsulta",
            "body": {
              "params": [
                {
                  "name": "nroTramite",
                  "value": nro
                },
                {
                  "name": "clave",
                  "value": pass
                }
              ]
            }
        };
        DreamFactory.api[CONFIG.SERVICE_SIMGEP_TERRITORIAL].callStoredProcWithParams(parametrosTerritorial).success(function (responseT){
            if(responseT.length > 0) {
                $scope.grillaHistorialAE = "mostrar";
                $scope.grillaHistorialNEXO = null;
                $scope.grillaHistorialSITRAM = null;
                $scope.grillaTramitesLinea = null;
                $scope.frmConsulta = null;
                $scope.historial = responseT;
                $scope.btnVolverActivo = true;
                $.unblockUI();
            } else {
                sweet.show('Autoconsulta', msjRegistroNoEncontrado, 'error');
                $.unblockUI();
            }
        })
        .error(function(error) {
            $.unblockUI();
        });
    };

    /*VALIDAR TRAMITE EN LINEA*/
    /*TRAMITE EN LINEA LISTADOS POR USUARIO*/
    /*VER TRAMITES CIUDADANO*/
    $scope.verTramite = function(datos){
        $scope.data = {};
        /*preguntar si es consulta tipo sitram*/
        var sUid = ((typeof(datos.toid) == 'undefined') ? " " : datos.toid);
        if(sUid != " "){//TRAMITE DEL TIPO SITRAM247
            $scope.data.tramite = datos.tcorrelativo;
            $scope.data.contrasenia = sUid;
        }else{
            $scope.data.tramite = datos.CODIGO_TRAMITE;
            $scope.data.contrasenia = datos.CI_REQUIRIENTE;
        }
        $scope.validarAutoconsulta($scope.data);
    };

    $scope.validarTramiteLinea2 = function(data){        
        var nro  = data;
        //var pass = data.clave;
        $scope.tramitesCiudadanoSimgepAE(data);
        console.log("DATA DEL CIUDADANO: ", data);
    };

    $scope.tramiteCiudadano =   [];
    
    /*AGRUPAR DATA AUTOCONSULTA*/
    $scope.agruparTramitesXCi   =   function(data){
        angular.forEach(data,function(celda, fila){                
            var objeto={};
            objeto['ASUNTO']=celda['ASUNTO'];
            objeto['CI_REQUIRIENTE']=celda['CI_REQUIRIENTE'];
            objeto['CODIGO_TRAMITE']=celda['CODIGO_TRAMITE'];
            objeto['FEC_CREACION']=celda['FEC_CREACION'];
            objeto['ID_TRAMITE']=celda['ID_TRAMITE'];
            objeto['PROCESO']=celda['PROCESO'];
            objeto['REQUIRIENTE']=celda['REQUIRIENTE'];
            $scope.tramiteCiudadano.push(objeto);
        });
    };
    $scope.verificarGrillasVacias   =   function(){
        if($scope.tramiteCiudadano){
            var stam    =   $scope.tramiteCiudadano.length;            
            if(stam == 0){
                $scope.grillasVacias = true;
            }else{
                $scope.grillasVacias = false;            
            }
        }
    };    
    
    
    /*TRAMITES SIMGEP AE - BUSQUEDA CON CI - 1*/
    $scope.tramitesCiudadanoSimgepAE = function(data){
        var nro = data;
        var pass = '';
        var parametrosTrmsAE = {
            "procedure_name":"sp_trs_autoconsulta",
            "body": {
              "params": [
                {
                  "name": "nroCi",
                  "value": nro
                },
                {
                  "name": "clave",
                  "value": pass
                }
              ]
            }
        };
        $.blockUI();
        
        var obj;        
        try{
            obj = DreamFactory.api[CONFIG.SERVICE_SIMGEP_AE].callStoredProcWithParams(parametrosTrmsAE);
            obj.success(function (responseT){            
                $scope.grillaTramitesLinea = "mostrar";
                if(responseT.length > 0) {                
                    $scope.grillaHistorialAE = null;
                    $scope.grillaHistorialNEXO = null;
                    $scope.grillaHistorialSITRAM = null;
                    $scope.frmConsulta = null;
                    //$scope.tramiteCiudadano = responseT;
                    $scope.agruparTramitesXCi(responseT);
                    $scope.btnVolverActivo = true;
                } //else {
                $scope.tramitesCiudadanoSimgepTERRITORIAL(data);
                $.unblockUI();
                //}
            })
            .error(function(error) {
                aConexionError.push("Concexion fallida con el servidor, intente mas tarde");
                $scope.tramitesCiudadanoSimgepTERRITORIAL(data);                
            });
        }catch(e){ 
            $scope.tramitesCiudadanoSimgepTERRITORIAL(data);            
            $scope.grillaTramitesLinea = "mostrar";
            $.unblockUI();
        }
        $scope.verificarGrillasVacias();
    };

    /*TRAMITES TERRITORIAL - BUSQUEDA CON CI - 2*/ (2)
    $scope.tramitesCiudadanoSimgepTERRITORIAL = function(data){
        var nro = data;
        var pass = '';
        var parametrosTrmsAE = {
            "procedure_name":"sp_trs_autoconsulta",
            "body": {
              "params": [
                {
                  "name": "nroCi",
                  "value": nro
                },
                {
                  "name": "clave",
                  "value": pass
                }
              ]
            }
        };
        try{
            DreamFactory.api[CONFIG.SERVICE_SIMGEP_TERRITORIAL].callStoredProcWithParams(parametrosTrmsAE).success(function (responseT){
                if(responseT.length > 0) {
                    console.log("TRAMITES USUARIO AE:", responseT);
                    $scope.grillaTramitesLinea = "mostrar";
                    $scope.grillaTramitesLineaSitram247 = null;
                    $scope.grillaHistorialAE = null;
                    $scope.grillaHistorialNEXO = null;
                    $scope.grillaHistorialSITRAM = null;
                    $scope.frmConsulta = null;
                    //$scope.tramiteCiudadano = responseT;
                    $scope.agruparTramitesXCi(responseT);
                    $scope.btnVolverActivo = true;
                    $.unblockUI();
                }//else {
                    $scope.tramitesCiudadanoSitram247(data);
                //}
            })
            .error(function(error) {
                $scope.tramitesCiudadanoSitram247(data);                
                $.unblockUI();
            });            
        }catch(e){
            $scope.tramitesCiudadanoSitram247(data);            
            $scope.grillaTramitesLinea = "mostrar";
            $.unblockUI();            
        }
        $scope.verificarGrillasVacias();        
    };

    /*TRAMITES SITRAM 24/7*/
    $scope.tramitesCiudadanoSitram247 = function(data){
        var nro = data;
        var pass = '';
        var parametrosTrmsAE = {
            "procedure_name":"sp_trs_autoconsulta",
            "body": {
              "params": [
                {
                  "name": "nroCi",
                  "value": nro
                },
                {
                  "name": "clave",
                  "value": pass
                }
              ]
            }
        };
        try{
            DreamFactory.api[CONFIG.SERVICE_SITRAM247].callStoredProcWithParams(parametrosTrmsAE).success(function (responseT){
                if(responseT.length > 0) {
                    var aData = JSON.parse(responseT[0].tdata);
                    //$scope.solicitante = JSON.stringify(responseT[0].tdata);
                    $scope.solicitante = aData.RC_PATERNO + " " + aData.RC_MATERNO + " " + aData.RC_NOMBRE;
                    $scope.grillaTramitesLineaSitram247 = "mostrar";
                    $scope.grillaTramitesLinea = null;
                    $scope.grillaHistorialAE = null;
                    $scope.grillaHistorialNEXO = null;
                    $scope.grillaHistorialSITRAM = null;
                    $scope.frmConsulta = null;
                    //$scope.tramiteCiudadano = responseT;
                    $scope.agruparTramitesXCi(responseT);
                    $scope.btnVolverActivo = true;
                    $.unblockUI();
                } //else {
                    $scope.grillaTramitesLineaSitram247 = "mostrar";
                    //$scope.grillasVacias = true;
                    $.unblockUI();
                //}
            })
            .error(function(error) {
                $.unblockUI();
            });
        }catch(e){
            //$scope.grillaTramitesLineaSitram247 = "mostrar";
            //$scope.grillasVacias = true;
            $.unblockUI();        
        }
        $scope.verificarGrillasVacias();          
    };


    $scope.$on('api:ready',function(){
        $scope.validarTramiteLinea2(sessionService.get('CICIUDADANO'));
    });
    $scope.inicioTramite = function () {
        if(DreamFactory.api[CONFIG.SERVICE]){
          $scope.validarTramiteLinea2(sessionService.get('CICIUDADANO'));
        }
    };
});
