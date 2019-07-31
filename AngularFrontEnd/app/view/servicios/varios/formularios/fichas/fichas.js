function NavCtrlfichas($timeout ,$route, $interval, $scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, sweet,registroLog, $filter, ngTableParams) {
    "use strict";
    $scope.frmConsulta = "mostrar";
    var msjError  = 'error';
    var idservicios = 100;
    var idagencia = '';    
    var promise;

    $scope.start = function() 
    {
      //promise = $interval(callAtInterval, 10000); 
      promise = $interval(function()
                { 
                    $scope.callAtInterval();

                }, 30000);
    };

    
    $scope.stop = function() 
    {
      $interval.cancel(promise);
    };

    $scope.callAtInterval = function () 
    {
        $scope.refrescarR();
    };

    $scope.$on('$destroy', function()
    {
        $interval.cancel(promise);
    });


    $scope.volverLimpiar = function(datos)
    {
        $scope.registro.tramite = "";
        $scope.registro.contrasenia = "";
        $scope.frmConsulta = "mostrar";
        $scope.grillaHistorialAE = null;
        $scope.grillaHistorialSITRAM = null;
    }
    $scope.getAgencia = function () 
    {
        /*$.blockUI();
        setTimeout(function()
        {*/
            try{            
                var agencias = new agencia();
                agencias.listaAgencia(function(respuesta)
                {
                    var datosage =  JSON.parse(respuesta);                
                    $scope.datosagencia = datosage.success.data;

                    var w = $.getJSON( "../../view/servicios/varios/formularios/fichas/data.json", function(data) 
                    {
                        $scope.dat = data;
                        //console.log("OBJ_DATA", $scope.datosagencia = datosage.success.data);
                        var d = $scope.datosagencia;
                        var i = "";
                        var f = "";
                        var a = "";
                        var c = "";
                        var valueFicha = {
                            accounting: []
                        };



                        angular.forEach(d, function(value, key) 
                        {
                            $scope.agccodigo_agencia= value['agccodigo_agencia'];
                            $scope.agcid            = value['agcid'];
                            var ca = $scope.agccodigo_agencia;
                            i = $scope.agcid;
                            if(ca =='PIACV' || ca =='SERI' || ca =='SERII' || ca =='SERIII' || ca =='TER')
                            {                              
                                try{
                                    var atencionPue = new atencionPuestoGen();
                                    atencionPue.sagenciaid = i;
                                    atencionPue.listaAtencionPuestoGen(function(respuesta)
                                    {
                                        var atendido = JSON.parse(respuesta);                
                                        var response = atendido.success.data;
                                        if(response.length > 0)
                                        {
                                            $scope.atencionP   =response[0].vcantidadf;
                                            $scope.ultimaFechaP=response[0].vultimaficha;
                                            f = $scope.ultimaFechaP; 
                                            a = $scope.atencionP;
                                            $scope.dataAtemdidos= response;
                                        }
                                        else
                                        {   
                                            $scope.dataAtemdidos="";
                                            f="0"
                                            a="0";
                                        }

                                        try{
                                            var fichasEsp = new fichasEsperaGen();
                                            fichasEsp.sagenciaid = i;
                                            fichasEsp.listaFichasEsperaGen(function(respuesta)
                                            {

                                                var espera =  JSON.parse(respuesta);                
                                                var response = espera.success.data;
                                                if(response.length > 0)
                                                {    
                                                    $scope.dataesperas= response;     
                                                    $scope.esperaP=response[0].vcantidadf;
                                                    c =  $scope.esperaP;
                                                } 
                                                else 
                                                {
                                                    $scope.dataesperas= "";     
                                                    //$scope.espera=0;
                                                    c="0";
                                                }       
                                            });
                                        }
                                        catch(e)
                                        {
                                            console.log(e);
                                            swal('Autoconsulta', msjError, 'error');
                                            $.unblockUI();
                                        }
                                     });
                                }
                                catch(e)
                                {
                                    console.log(e);
                                    swal('Autoconsulta', msjError, 'error');
                                    $.unblockUI();
                                }

                                valueFicha.accounting.push({ 
                                    "id"      : i,
                                    "cola"    : c,
                                    "atencion": a,
                                    "ficha"   : f
                                });
                            }
                        });
                        
                        //console.log("valueFicha", valueFicha.accounting);
                        $scope.valueFicha = valueFicha.accounting;
                        $scope.$apply();
                        $.unblockUI();
                    });
                });
            }
            catch(e)
            {
                console.log("error", e);
                swal('Autoconsulta', msjError, 'error');
                $.unblockUI();
            }
        //},300);       
    };




    $scope.listarServicios= function(idagencias)
    {
        $scope.stop();
        $.blockUI(); 
        setTimeout(function()
        {
            idagencia = idagencias;
            $scope.idagencia=idagencias;
            try{
                var serviciosAgen = new servicioAgencia();
                serviciosAgen.sidagencia = idagencias;
                serviciosAgen.listaServiciosAgencia(function(response)
                {
                    if(response.length > 0){
                        var servicioage =  JSON.parse(response);                
                        $scope.dataservicios = servicioage.success.data;
                        var dato = [];
                        dato = new Object();
                        dato.vsrv_servicio = "TODOS";
                        dato.vsrv_id =100;
                        $scope.dataservicios[$scope.dataservicios.length]  = dato;
                        $scope.grillaServicios='mostrar';
                        $scope.frmConsulta= null;
                        $scope.getAtendidoT($scope.idagencia);
                        $scope.$apply();
                    }              
                });
            }
            catch(e)
            {
                swal('Autoconsulta', msjError, 'error');
                console.log(e);
                //$.unblockUI();
            }

        },300);
    };

    $scope.MenuListarServicios = function(idagencias)
    {
        //setTimeout(function()
        //{
            $.blockUI();
        //}, 50);
        setTimeout(function()
        {
            $scope.listarServicios(idagencias); 
        }, 200);

        /*$.blockUI(); 
        setTimeout(function()
        {
            try{
                $scope.listarServicios(idagencias);
            }
            catch(e)
            {
                console.log("error", e);
                swal('Error', msjError, 'error');
                $.unblockUI();
            }
        },1000);*/
    };

    $scope.volverHospital = function(){
        $scope.grillaServicios=null;
        $scope.frmConsulta= 'mostrar';
        $scope.grillaGrafica=null;
        var sw=0;
    };

    $scope.getReportes= function (sidservicios) {

         idservicios = sidservicios;
        $scope.idservi=sidservicios;
        if(sidservicios==100){
            $scope.getAtendidoT($scope.idagencia);
        }else{
            $scope.getAtendido(sidservicios,$scope.idagencia);
        }
    };
    /*
     * Informacion de servicio de atencion
     */
    $scope.getAtendidoT = function(sidagecnias)
    {
        try{
            var atencionPue = new atencionPuestoGen();
            atencionPue.sagenciaid = sidagecnias;
            atencionPue.listaAtencionPuestoGen(function(respuesta)
            {
                var atendido =  JSON.parse(respuesta);                
                var response = atendido.success.data;
                if(response.length > 0)
                {      
                    $scope.atencion=response[0].vcantidadf;
                    $scope.ultimaFecha=response[0].vultimaficha;
                    $scope.dataAtemdidos= response;

                    //console.log("Value", $scope.atencion=response[0].vcantidadf);
                    //console.log("Value", $scope.ultimaFecha=response[0].vultimaficha);
                }
                else
                {
                    $scope.dataAtemdidos="";
                    $scope.atencion=0;
                    $scope.ultimaFecha=0;
                }
                $scope.getEsperaT(sidagecnias);
             });
        }
        catch(e)
        {
            console.log(e);
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }
    };

    $scope.getEsperaT = function(sidagecnias){
        try{
            var fichasEsp = new fichasEsperaGen();
            fichasEsp.sagenciaid = sidagecnias;
            fichasEsp.listaFichasEsperaGen(function(respuesta){

                var espera =  JSON.parse(respuesta);                
                var response = espera.success.data;
                if(response.length > 0){    
                    $scope.dataesperas= response;     
                    $scope.espera=response[0].vcantidadf;
                    //console.log("espera", $scope.espera=response[0].vcantidadf);                   
                } else {
                    $scope.dataesperas= "";     
                    $scope.espera=0;
                }       
               $scope.getDocumentoT(sidagecnias); 
            });
        }
        catch(e)
        {
            console.log(e);
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }
    };

    $scope.getDocumentoT = function(sidagecnias){
        try{
            var finalizado = new servFinalizadoAgenciaGeneral();
            finalizado.agenciaid = sidagecnias;
            finalizado.listaServFinalizadoAgenciaGeneral(function(response){
                var documento =  JSON.parse(response);       
                $scope.obtDatos = documento.success.data;  
                $scope.getcolaenEspera();          
                  
            });
        }
        catch(e)
        {
            console.log(e);
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }
    };


    
    $scope.getcolaenEspera = function(){
        try{
            var colaCli = new colaClientes();
            colaCli.agenciaid = $scope.idagencia;
            colaCli.listaColaClientes(function(response){
                var cola =  JSON.parse(response);                
                $scope.obtColaDatos = cola.success.data;
                setTimeout(function(){$.unblockUI();}, 1000);
            });
        }
        catch(e)
        {
            console.log(e);
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }    
    };

    $scope.getAtendido = function(sidserviio,sidagecnias)
    {
        
        try{
            var atencion = new atencionPuestos();
            atencion.sagenciaid = sidagecnias;
            atencion.sidservicio = sidserviio;
            atencion.listaAtencionPuestos(function(respuesta){
                var atend =  JSON.parse(respuesta);                
                var response = atend.success.data;
                if(response.length > 0){      
                    $scope.atencion=response[0].vcantidadf;
                    $scope.ultimaFecha=response[0].vultimaficha;
                    $scope.dataAtemdidos= response;
                }else{
                    $scope.dataAtemdidos="";
                    $scope.atencion=0;
                    $scope.ultimaFecha=0;
                }
               $scope.getEspera(sidserviio,sidagecnias);         
            });
        }
        catch(e)
        {
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }     
    };

    $scope.getEspera = function(sidserviio,sidagecnias){
        
        try{
            var fichasEsp = new fichasEspera();
            fichasEsp.sagenciaid = sidagecnias;
            fichasEsp.sidservicio = sidserviio;
            fichasEsp.listaFichasEspera(function(respuesta){
                var esp =  JSON.parse(respuesta);                
                var response = esp.success.data;
                if(response.length > 0){    
                    $scope.dataesperas= response;     
                    $scope.espera=response[0].vcantidadf;
                } else {
                  $scope.dataesperas= "";     
                  $scope.espera=0;
                }  
                $scope.getDocumento(sidserviio,sidagecnias);      
            });
        }
        catch(e)
        {
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }     
    };

    $scope.getDocumento = function(sidserviio,sidagecnias){
        try{
            var servicioFin = new servicioFinalizadoAgencia();
            servicioFin.agenciaid = sidagecnias;
            servicioFin.servicioid = sidserviio;
            servicioFin.listaServicioFinalizadoAgencia(function(response){
                var doc =  JSON.parse(response);                
                $scope.obtDatos = doc.success.data;            
                $scope.getcolaenEsperaT(sidserviio,sidagecnias);      
            });
        }
        catch(e)
        {
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }          
    };

     $scope.getcolaenEsperaT = function(sidserviio,sidagecnias){
        try{
            var colaClientes = new colaClientesEspecificos();
            colaClientes.agenciaid = sidagecnias;
            colaClientes.servicioid = sidserviio;
            colaClientes.listaColaClientesEspecificos(function(response){
                var colaEsp =  JSON.parse(response);                
                $scope.obtColaDatos = colaEsp.success.data;
                setTimeout(function(){$.unblockUI();}, 1000);
             });
        }
        catch(e)
        {
            swal('Autoconsulta', msjError, 'error');
            $.unblockUI();
        }               
    };
    
    $scope.inicioHospitales = function () {
        $scope.getAgencia();
        $scope.start();
    };

    $scope.refrescar = function(){
        setTimeout(function(){
            $.blockUI();
        }, 100);
        $scope.getReportes(idservicios);
    };

    $scope.refrescarReplay = function(){
        $.blockUI();
        setTimeout(function()
        {
            $scope.getAgencia(idservicios);
            $scope.start();
        }, 200);
    };

    $scope.refrescarR = function(){
        /*setTimeout(function(){
            $.blockUI();
        }, 100);*/
        $.blockUI();
        setTimeout(function()
        {
            $scope.getAgencia(); 
        }, 200);


    };



    $scope.obtenerReporte = function(idservicios){
        setTimeout(function(){
            $.blockUI();
        }, 100);
        $scope.getReportes(idservicios);
    };

}