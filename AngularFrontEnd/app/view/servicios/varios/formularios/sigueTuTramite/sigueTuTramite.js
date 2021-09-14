function siguetutramiteController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, sweet,registroLog,ngTableParams, $filter) {
    "use strict";
    $scope.infcontenido = "SIGUE TU TRAMITE NUEVA VERSION ..CCC";
    var msjRegistroNoEncontrado = "Estimado usuario, su trámite no fue encontrado";
    var msjError = "Ocurrio un problema con la conexion, intente nuevamente por favor";
    var msjTrmsRegistroNoEncontrado = "Estimado usuario, su trámite no fue encontrado";


    $scope.infcontenido = "aaaa";
    $scope.frmConsulta = "mostrar";
    $scope.tramiteRespuesta = false;
    $scope.btnVolverActivo = false;
    $scope.checkboxModel = {
        value1: false
    };
    $scope.toggle = true;
    $scope.styleOcultar = "";
    $scope.animarEstilo = function () {
        if ($scope.checkboxModel.value1 == true) {
            $scope.styleOcultar = "cssSlideUp";
            $scope.styleMostrar = "ng-hide";
        }
    };

    $scope.volverLimpiar = function (datos) {
       
        try {
            $scope.registro.tramite = "";
            $scope.registro.contrasenia = "";
        } catch (e) { }

        
        if ($scope.tramitesciudadano.length == 0) {
            $scope.volverInicio();
        }
        else{
            $scope.frmConsulta = null;
            $scope.grillaTramitesLineaAE = mostrar;
            $scope.grillaHistorialAE = null;
            $scope.grillaHistorialSITRAM = null;
            $scope.grillaHistorialSitram247 = null;
            $scope.grillaHistorialLotus = null;
            $scope.grillaHistorialNEXO = null;
            $scope.grillaHistorialTerr = null;
            $scope.grillaTramitesSitram247 = null;
            $scope.verResultados = null;
            $scope.grillaTramitesLineaSitram247 = null;
            $scope.btnVolverActivo = false;                    
            $scope.tramitesciudadano = $rootScope.tramitesciudadano; 
        };
    }

    $scope.volverInicio = function(){
        $scope.frmConsulta = "mostrar";
        $scope.grillaTramitesLineaAE = null;
        $scope.grillaHistorialAE = null;
        $scope.grillaHistorialSITRAM = null;
        $scope.grillaHistorialSitram247 = null;
        $scope.grillaHistorialLotus = null;
        $scope.grillaHistorialNEXO = null;
        $scope.grillaTramitesLineaSitram247 = null;
        $scope.btnVolverActivo = false;
        $scope.grillaTramitesLineaTerritorial = null;
        $scope.grillaTramitesLineaSitram = null;
        $scope.grillaTramitesLineaLotus = null;
        $scope.grillaHistorialTerr = null;
        $scope.verResultados = null;
        $scope.grillaTramitesSitram247 = null

    }


    $scope.grillaTramitesLineaAE = null;
    $scope.grillaTramitesLineaTerritorial = null;
    $scope.grillaTramitesLineaSitram247 = null;
    $scope.grillaTramitesLineaSitram = null;
    $scope.grillaTramitesLineaLotus = null;
    $scope.verResultados = null;
    $scope.grillaTramitesSitram247 = null

    $scope.grillaHistorialAE = null;
    $scope.grillaHistorialTerr = null;
    $scope.grillaHistorialSitram247 = null;
    $scope.grillaHistorialSITRAM = null;
    $scope.grillaHistorialLotus = null;

 
    //VALIDANDO AUTOCONSULTA AL CIUDADANO
    $scope.validarAutoconsulta = function (datos,id) {
        //PRIMERO VERIFICAMOS SI EL TRAMITE PERTENECE AL LOTUS
        //$scope.data = {};
        if (id == 1) {
            $scope.tramitesciudadano = '';
        };
        var miRegExa1 = /AER-EL/g;
        var miRegExa2 = /AER-LICEN/g;
        var miRegExa3 = /LICEN-AE/g;
        var miRegExa4 = /MOD_MOD/g;
        var miRegExa5 = /RE-LF/g;
        var miRegExa6 = /EM-LF/g;
        var miRegExa7 = /REG_AE/g;
        var miRegExa8 = /MOD-LF/g;
        var nrocaso = '000' + datos.tramite;
        var siexiste1 = nrocaso.search(miRegExa1);
        var siexiste2 = nrocaso.search(miRegExa2);
        var siexiste3 = nrocaso.search(miRegExa3);
        var siexiste4 = nrocaso.search(miRegExa4);
        var siexiste5 = nrocaso.search(miRegExa5);
        var siexiste6 = nrocaso.search(miRegExa6);
        var siexiste7 = nrocaso.search(miRegExa7);
      var siexiste8 = nrocaso.search(miRegExa8);

        if (siexiste1 != -1 || siexiste2 != -1 || siexiste3 != -1 || siexiste4 != -1 || siexiste5 != -1 || siexiste6 != -1 || siexiste7 != -1 || siexiste8 != -1) {
            $scope.getTramiteLotus(datos);
        } else {
            var miRegEx = /[\/]/g;
            var nro = '000' + datos.tramite;
            var pos = nro.search(miRegEx);
            if (pos != -1) {
                $scope.getTramitesAe(datos);
            } else {
                //$scope.getTramiteSitram247(datos);
            }
        }
    };

    // AUTOCONSULTA AL CIUDADANO - SITRAM247
    $scope.getTramiteSitram247 = function (datos) {
        $.blockUI(); 
        setTimeout(function(){
        $scope.verResultados = null;
        try{
            var tramitessitram = new visualizarTramitesSitram();
            tramitessitram.nroTramite = datos.tcorrelativo;
            tramitessitram.clave = datos.toid; //revisar aqui
            tramitessitram.visualizarTramites_Sitram(function(data){
                var response = JSON.parse(data); 
                var respuesta = response.success;
                if (respuesta == undefined) {
                    $.unblockUI();                
                    swal('', 'Ingrese un número de trámite válido', 'error');                   
                } else{            
                    if (respuesta.data.length > 0) {
                        $scope.grillaHistorialSitram247 = mostrar;
                        $scope.grillaTramitesSitram247 = null;
                        $scope.grillaHistorialTerr = null;
                        $scope.grillaHistorialLotus = null
                        $scope.grillaHistorialAE = null;
                        $scope.grillaTramitesLineaAE = null;
                        $scope.frmConsulta = null;
                        $scope.grillaTramitesLinea = null;
                        $scope.historialsitram247 = respuesta.data;
                        $scope.btnVolverActivo = true;
                        $scope.$apply();
                        $.unblockUI();
                    }
                    else {
                        //$scope.getTramitesSitramPm(datos); //COMENTADO HASTA ENCTONTRAR UNA SOL CON LA CONEXION
                        
                        swal('Autoconsulta', msjRegistroNoEncontrado, 'error');
                        $.unblockUI();
                    }; 
                };
            });
        }
        catch(e)
        {
            console.log("error", e);
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }
        },300);
       
    };
    //SITRAM VALIDAR EL / ANTES DE ENVIAR - PM
    $scope.getTramitesSitramPm = function (datos) {
        try{
            var tramitessitram = new visualizarTramitesSitram();
            tramitessitram.nroTramite = datos.tcorrelativo;
            tramitessitram.clave = datos.toid;
            tramitessitram.visualizarTramites_Sitram(function(data){
                var response = JSON.parse(data);  
                if (response.success.data.length > 0) {
                    //$scope.grillaHistorialSITRAM = "mostrar";
                    //$scope.grillaHistorialNEXO = null;
                    //$scope.grillaHistorialAE = null;
                    $scope.frmConsulta = null;
                    $scope.grillaTramitesLineaAE = "mostrar";
                    $scope.historial = responseS;
                    $scope.btnVolverActivo = true;                    
                }
                else {
                    swal('Autoconsulta', msjRegistroNoEncontrado, 'error');    
                    $.unblockUI();          
                }; 
            });
        }
        catch(e)
        {
            console.log("error", e);
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }
    };



    //AUTOCONSULTA AL CIUDADANO - SIMGEP TERRITORIAL
    $scope.getTramitesAe = function (datos) {
        //var nro = datos.tramite;
        //var pass = datos.contrasenia;
        $.blockUI(); 
        setTimeout(function(){

        try{
            var tramiteae = new vizualizarTramitesAE();
            tramiteae.clave = datos.tramite;
            tramiteae.ci = datos.contrasenia;
            tramiteae.vizualizar_TramitesAE(function(data){
                var response = JSON.parse(data); 
                if (response.success.dataSql.length > 0) {
                    $scope.grillaHistorialAE = "mostrar";
                    $scope.grillaTramitesLineaAE = null;
                    $scope.grillaHistorialTerr = null;
                    $scope.grillaHistorialLotus = null
                    $scope.grillaHistorialSitram247 = null;
                    $scope.frmConsulta = null;
                    $scope.historialAE = response.success.dataSql;
                    $scope.tramiteRespuesta = true;
                    $scope.btnVolverActivo = true;
                    $scope.$apply();
                    $.unblockUI();
                } else {
                    $scope.getTramitesTerritorial(datos);
                    //$.unblockUI();
                }   
            });
        }
        catch(e)
        {
            console.log("error", e);
            swal('Autoconsulta', msjError, 'error');
            $scope.tramiteRespuesta = 'error';
            $.unblockUI();                
        }
        }, 1000);
    };


    //SIMGEP   TERRITORIAL
    $scope.getTramitesTerritorial = function (datos) {
        $.blockUI({ css: { 
                    border: 'none', 
                    padding: '10px', 

                    backgroundColor: '#000', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: .5, 
                    color: '#fff' 
                },message: "Espere un momento por favor ..." }); 
        setTimeout(function(){

        try{
            var tramitesTerr = new visualizarTramitesTerritorial();
            tramitesTerr.clave = datos.tramite;
            tramitesTerr.ci = datos.contrasenia;
            tramitesTerr.visualizarTramites_Territorial(function(data){
                var response = JSON.parse(data); 
                if (response.success.dataSql.length > 0) {
                    $scope.grillaHistorialTerr = "mostrar";
                    $scope.grillaTramitesLineaAE = null;
                    $scope.grillaHistorialLotus = null
                    $scope.grillaHistorialSitram247 = null;
                    $scope.grillaHistorialAE = null;
                    $scope.grillaTramitesLineaAE = null;
                    $scope.frmConsulta = null;
                    $scope.historialTerr = response.success.dataSql;
                    $scope.btnVolverActivo = true;
                    $scope.$apply();
                    $.unblockUI();
                } else {
                    //sweet.show('Autoconsulta', 'Sin tramites en Territorial', 'error');//msjRegistroNoEncontrado
                    swal('Autoconsulta', msjRegistroNoEncontrado, 'error');    
                    $.unblockUI();               
                }
            });
        }
        catch(e)
        {
            console.log("error", e);
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }
        }, 1000);
    };

    ///VALIDAR TRAMITE EN LINEA
    ///TRAMITE EN LINEA LISTADOS POR USUARIO
    //VER TRAMITES CIUDADANO
    $scope.verTramite = function (datos) {
        $scope.data = {};
        //preguntar si es consulta tipo sitram
        var sUid = ((typeof (datos.toid) == 'undefined') ? " " : datos.toid);
        if (datos.toid != "" || datos.toid != "undefined") {//TRAMITE DEL TIPO SITRAM247
            $scope.data.tramite = datos.tcorrelativo;
            $scope.data.contrasenia = datos.ci;
            $scope.data.cas_id = datos.cas_id;
        } else {
            $scope.data.tramite = datos.tramite;
            $scope.data.contrasenia = datos.contrasenia;
        };

        $scope.validarAutoconsulta($scope.data,0);
    };

    
    

    //TRAMITES SIMGEP AE
    //$scope.tramitesciudadano = [];
    var i = 0;
    $scope.tramitesCiudadanoSimgepAE = function (datos) { 
    $.blockUI(); 
        setTimeout(function(){
               
           
        $scope.tramitesciudadano = [];       
        var tramitesLinea = [];
        try{            
            var tramiteae = new lstTramitesAE();
            tramiteae.ci = datos.cedula;
            tramiteae.clave = '';  
            tramiteae.lstTramites_AE(function(data){
                var response = JSON.parse(data);  
                if (response.success.dataSql.length > 0) {
                    $scope.grillaTramitesLineaAE = "mostrar";
                    $scope.frmConsulta = null;
                    $scope.tramiteCiudadanoAE = response.success.dataSql;
                    //$scope.tramitesLinea.push($scope.tramiteCiudadanoAE);
                    
                    angular.forEach($scope.tramiteCiudadanoAE,function(celda, fila)
                    {       
                        var tramites = {};
                        tramites['tasunto'] = celda['ASUNTO'];
                        tramites['ci'] = datos.cedula;
                        tramites['tcorrelativo'] = celda['CODIGO_TRAMITE'];
                        tramites['tfregistro'] = celda['FEC_CREACION'];
                        tramites['id_tramite'] = celda['ID_TRAMITE'];
                        tramites['proceso'] = celda['PROCESO'];
                        $scope.tramitesciudadano[i]=tramites; 
                        i++;                
                    });   

                    $rootScope.tramitesciudadano = $scope.tramitesciudadano; 
                    $scope.btnVolverActivo = true;
                } 
                    $scope.tramitesCiudadanoSimgepTERRITORIAL(datos);
                });
        }
        catch(e)
        {
            console.log("error", e);
            $.unblockUI();
        }
        },300);
    };

    //TRAMITES TERRITORIAL
    $scope.tramitesCiudadanoSimgepTERRITORIAL = function (data) {
        var tramitesLinea = [];
        try{
            var tramitesTerr = new lstTramitesTerritorial();
            tramitesTerr.ci = '';
            tramitesTerr.clave = data.cedula;
            tramitesTerr.lstTramites_Territorial(function(respuesta){
                var response = JSON.parse(respuesta);  
                if (response.success.dataSql.length > 0) {
                    //$scope.grillaTramitesLineaTerritorial = "mostrar";
                    //$scope.grillaTramitesLineaSitram247 = null;
                    //$scope.grillaHistorialAE = null;
                    //$scope.grillaHistorialNEXO = null;
                    //$scope.grillaHistorialSITRAM = null;
                    $scope.grillaTramitesLineaAE = "mostrar";
                    $scope.frmConsulta = null;
                    $scope.tramiteCiudadanoTerr = response.success.dataSql;
                    //$scope.tramitesLinea.push($scope.tramiteCiudadanoTerr); 

                    angular.forEach($scope.tramiteCiudadanoTerr,function(celda, fila)
                    {       
                        var tramites = {};
                        tramites['tasunto'] = celda['ASUNTO'];
                        tramites['ci'] = data.cedula;
                        tramites['tcorrelativo'] = celda['CODIGO_TRAMITE'];
                        tramites['tfregistro'] = celda['FEC_CREACION'];
                        tramites['id_tramite'] = celda['ID_TRAMITE'];
                        tramites['proceso'] = celda['PROCESO'];
                        $scope.tramitesciudadano[i]=tramites;
                        i++;                  
                    
                    }); 

                    //$scope.tramitesciudadano.push(tramitesLinea); 
                    $rootScope.tramitesciudadano = $scope.tramitesciudadano; 
                    $scope.btnVolverActivo = true;
                    //$('#content').fadeIn(1000).html($scope.tramitesciudadano);
                   
                } 
                //else {
                    $scope.tramitesCiudadanoSitram247(data.cedula);
                    //sweet.show('Autoconsulta', " Señor ciudadano usted no tiene tramites disponibles", 'error');

                //}
            });
        }
        catch(e)
        {
            console.log("error", e);
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }
    };

    //TRAMITES SITRAM 24/7
    $scope.tramitesCiudadanoSitram247 = function (ci) {
        var tramitesLinea = [];
        try{
            var tramitesSitram = new lstTramitesSitram();
            tramitesSitram.ci = ci;
            tramitesSitram.clave = '';
            tramitesSitram.lstTramites_Sitram(function(data){
                var response = JSON.parse(data);  
                $scope.datos = response.success.data[0].sp_trs_autoconsulta.TRAMITES_PH;
                $scope.datosPu = response.success.data[0].sp_trs_autoconsulta.TRAMITES_PU;
                    if ($scope.datos.length > 0 || $scope.datosPu.length > 0 ) {   

                       // $scope.grillaTramitesSitram247 = "mostrar";  
                        $scope.grillaTramitesLineaAE = 'mostrar';         
                        $scope.frmConsulta = null;
                        $scope.datatramites = response.success.data[0].sp_trs_autoconsulta.TRAMITES_PH.concat(response.success.data[0].sp_trs_autoconsulta.TRAMITES_PU);
                        angular.forEach($scope.datatramites,function(celda, fila)
                        {                 
                            var tramites = {};
                            tramites['tasunto'] = celda['TRAMITE_ASUNTO'];
                            tramites['ci'] = celda['toid'];
                            tramites['tcorrelativo'] = celda['TRAMITE_CORRELATIVO'];
                            tramites['tfregistro'] = celda['TRAMITE_REGISTRADO']; 
                            tramites['tresultado'] = celda['COPIA_ESTADO_TRAMITE'];
                            tramites['toid'] = celda['TRAMITE_CLAVE'];
                            tramites['tipo_res'] = celda['TRAMITE_TIPO_RESULTADO'];
                            tramites['sistema'] = 'SITRAM24/7';
                            tramites['sitram'] = true;
                            $scope.tramitesciudadano[i] = tramites;
                            if(tramites['tipo_res'] == 'PH'){
                               
                                tramites['swPh'] = true;
                            }else{
                             
                                tramites['swPh'] = false;
                            }
                            i++;                   
                        }); 
                        $rootScope.tramitesciudadano = $scope.tramitesciudadano; 
                    } 
                    $scope.tramitesGeneradosLotus(ci);
             });
        }
        catch(e)
        {
            console.log("error", e);
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }
    };

    $scope.getResultados= function(datos){

        $scope.verResultados=true;
        $scope.resultados = datos.tresultado;
        
        if($scope.resultados.length > 0){
            var data = $scope.resultados;
            $scope.obtResultados =  $scope.resultados;
            $scope.tablaResultados = new ngTableParams({
                page: 1,
                count: 10,
                filter: {}
            }, {
                total: $scope.obtResultados.length,
                getData: function($defer, params) {
                    var filteredData = params.filter() ?
                    $filter('filter')($scope.obtResultados, params.filter()) :
                    $scope.obtResultados;
                    var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    $scope.obtResultados;
                    params.total(orderedData.length);
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                   
                }
              
            });
            $scope.tablaResultados.reload();
        }else{
        }        


    }

    //TRAMITES SITRAM 24/7

    $scope.getTramiteLotus = function (datos) {
         $.blockUI(); 
        setTimeout(function(){
        try{
            var tramitesLotus = new visualizarTramitesLotus();
            tramitesLotus.ltci = '';
            tramitesLotus.ltcodigo = datos.tramite;
            tramitesLotus.ltclave = datos.contrasenia;
            tramitesLotus.visualizar_TramitesLotus(function(data){
                var response = JSON.parse(data); 
                if (response.success.data.length > 0) {
                    $scope.grillaHistorialLotus = "mostrar";
                    $scope.grillaTramitesLineaAE = null;
                    $scope.grillaHistorialTerr = null;
                    $scope.grillaHistorialSitram247 = null;
                    $scope.grillaHistorialAE = null;
                    $scope.frmConsulta = null;
                    $scope.historialLotus = response.success.data;
                    $scope.tasunto = datos.tasunto;
                    $scope.tcorrelativo = datos.tcorrelativo;
                    $scope.tfregistro = datos.tfregistro;
                    $scope.btnVolverActivo = true;
                    $scope.$apply();                    
                    $.unblockUI();
                } else {
                    swal('Autoconsulta', msjRegistroNoEncontrado, 'error');
                    $.unblockUI();
                }
            });
        }
        catch(e)
        {
            console.log("error", e);
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }
         },300);
    };


    //TRAMITES SITRAM
    $scope.tramitesCiudadanoSitram = function (ci) {
        try{
            var tramitesSitram = new lstTramitesSitram();
            tramitesSitram.ci = ci;
            tramitesSitram.clave = '';
            tramitesSitram.lstTramites_Sitram(function(data){
                var response = JSON.parse(data);  
                if (response.success.data.length > 0) {  
                    $scope.grillaTramitesLineaAE = "mostrar";                            
                    $scope.frmConsulta = null;
                    $scope.tramiteCiudadanoSITRAM = response.success.data;
                    $rootScope.tramitesciudadano = $scope.tramitesciudadano; 
                    $scope.btnVolverActivo = true;
                } 
                setTimeout(function(){
                    $.unblockUI();
                }, 1000);
            });
        }
        catch(e)
        {
            console.log("error", e);
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }
    };

    //TRAMITES LOTUS
    $scope.tramitesGeneradosLotus = function (ci) {
        var tramitelotus = new lstTramitesLotus();
        tramitelotus.ltci = ci;
        tramitelotus.lstTramites_Lotus(function (resultado) {
            var response = JSON.parse(resultado).success.data;
            if (response.length > 0) {
                $scope.grillaTramitesLineaAE = "mostrar";
                $scope.grillaTramitesSitram247 = null;  
                $scope.frmConsulta = null;
                $scope.tramiteCiudadanoLotus = response;
                angular.forEach($scope.tramiteCiudadanoLotus,function(celda, fila)
                {       
                    var tramites = {};
                    tramites['tasunto'] = celda['tasunto'];
                    tramites['ci'] = ci;
                    tramites['tcorrelativo'] = celda['tcorrelativo'];
                    tramites['tfregistro'] = celda['tfregistro'];
                    tramites['id_tramite'] = celda['tcas_id'];
                    tramites['proceso'] = celda['tdata'];
                    tramites['sistema'] = 'CERO_PAPEL';
                    tramites['ceropapel'] = true;
                    $scope.tramitesciudadano[i]=tramites;
                    i++;                 
                }); 
                $scope.btnVolverActivo = true;
                $rootScope.tramitesciudadano = $scope.tramitesciudadano; 
                $scope.$apply();
                
                setTimeout(function(){
                    $.unblockUI();
                    $scope.$apply();
                }, 1000);
            }else
            {
                setTimeout(function(){
                    $scope.$apply();
                    $.unblockUI();
                    if ($scope.tramitesciudadano.length == 0) 
                    {
                        $("#divMsj").css({'display' : 'block' });
                        $("#main1").fadeIn();
                        $scope.msj = '¡ Estimado ciudadano, usted no cuenta con trámites en GAMLP a la fecha !'; 
                        $scope.$apply();
                    };
                }, 1000);
            }
            
        });
    };
    
    $scope.validarTramiteLinea2 = function (data) {
        $scope.tramitesciudadano = [];
        i = 0;
        var adata  = new Array();
        adata["cedula"] = data;
        adata["clave"]  = "";
        $scope.tramitesCiudadanoSimgepAE(adata);
    };

    $scope.$on('api:ready', function () {
    });
    $scope.inicioSigueTuTramite = function () {
        var tipopersona = sessionService.get("TIPO_PERSONA");
        var cinitciudadano = '';
        if(tipopersona == 'NATURAL' || tipopersona == 'N'){
            cinitciudadano = sessionService.get("CICIUDADANO");
        }else{
            cinitciudadano = sessionService.get("NITCIUDADANO");
        }

      $scope.ciudadano = sessionService.get('US_NOMBRE')+' '+sessionService.get('US_PATERNO')+' '+sessionService.get('US_MATERNO');
      $scope.validarTramiteLinea2(cinitciudadano);
      //$scope.validarAutoconsulta(ciCiudano);
    };


}
