app.controller('historicoController', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, DreamFactory, $element, sweet, registroLog, filterFilter,FileUploader) {
    
    var fecha = new Date();    
    var fechactual = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    
    $scope.grillaHistorialNEXO = 'null2';    

    
    
    
    
    $scope.getTramiteNexo = function(){    
        // Conexion con NeXO
        var datosNeXO = {};
        
        //?option=CNS_TRAMITE&nroTramite=21&contrase%C3%B1a=8TGL
        //datosNeXO['nro'] = nro;
        //datosNeXO['pass'] = pass;
        
        datosNeXO['option'] = "CNS_TRAMITE";
        datosNeXO['nroTramite'] = '25';
        datosNeXO['contraseña'] = 'gcastro1';
        
        console.log("Datos desde el nexo:", datosNeXO);
        
        $.get( "http://192.168.5.243:8080/sysworkflow/es/ae/p247/services/WSAutoconsulta.php", datosNeXO, function( data, status ) {
            if (status=="success") {
                var obj = JSON.parse(data);
                $scope.grillaHistorialNEXO = "mostrar";
                $scope.grillaHistorialAE = null;
                $scope.grillaHistorialSITRAM = null;
                $scope.frmConsulta = null;
                $scope.historial = obj.resultRoot;
            }
        });
        
        console.log('DATOS DEL NEXO:', datosNeXO);
    };
    
    
    
    
    $scope.getTramite = function(datos)
    {
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
        DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(parametrosAE).success(function (response){
            if(response.length > 0) {
                $scope.grillaHistorialAE = "mostrar";
                $scope.grillaHistorialSITRAM = null;
                $scope.grillaHistorialNEXO = null;
                $scope.frmConsulta = null;
                $scope.historial = response;
            } else {
                //SIMGEP   TERRITORIAL
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
                DreamFactory.api[CONFIG.SERVICE_T].callStoredProcWithParams(parametrosTerritorial).success(function (responseT){
                    if(responseT.length > 0) {
                        $scope.grillaHistorialAE = "mostrar";
                        $scope.grillaHistorialNEXO = null;
                        $scope.grillaHistorialSITRAM = null;
                        $scope.frmConsulta = null;
                        $scope.historial = responseT;
                    } else {
                        // SITRAM VALIDAR EL / ANTES DE ENVIAR
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
                        DreamFactory.api[CONFIG.SERVICE_S].callStoredProcWithParams(parametrosSitram).success(function (responseS){
                            /*console.log(responseS);
                            console.log(responseS["EXPID"]);
                            console.log(responseS["EXPID"].length);*/
                            if(responseS.length > 0){
                                $scope.grillaHistorialSITRAM = "mostrar";
                                $scope.grillaHistorialNEXO = null;
                                $scope.grillaHistorialAE = null;
                                $scope.frmConsulta = null;
                                $scope.historial = responseS;
                            } 
                            else {
                                // Conexion con NeXO
                                var datosNeXO = {};
                                //?option=CNS_TRAMITE&nroTramite=21&contrase%C3%B1a=8TGL
                                //datosNeXO['nro'] = nro;
                                //datosNeXO['pass'] = pass;
                                datosNeXO['option'] = "CNS_TRAMITE";
                                datosNeXO['nroTramite'] = nro;
                                datosNeXO['contraseña'] = pass;
                                /*$.ajax({ 
                                    data: datosNeXO, 
                                    //url: 'http://gmlppc12345/sysworkflow/en/neoclassic/p247/services/WSListado.php', 
                                    //url: 'http://192.168.5.243:8080/sysworkflow/es/ae/p247/services/WSAutoconsulta.php', //?option=CNS_TRAMITE&nroTramite=21&contrase%C3%B1a=8TGL
                                    url: 'http://192.168.5.243:8080/sysworkflow/es/ae/p247/services/WSAutoconsulta.php', //?option=CNS_TRAMITE&nroTramite=29&contrase%C3%B1a=YSYZ
                                    type: 'get', 
                                    beforeSend: function () { 
                                            //$("#resultado").html("Procesando, espere por favor..."); 
                                    }, 
                                    success: function (response) { 
                                            var obj = JSON.parse(response); 
                                            $scope.grillaHistorialNEXO = "mostrar";
                                            $scope.grillaHistorialAE = null;
                                            $scope.grillaHistorialSITRAM = null;
                                            $scope.frmConsulta = null;
                                            $scope.historial = obj.resultRoot;
                                            console.log($scope.grillaHistorialNEXO);
                                    }, 
                                    failure: function (response) { 
                                            console.log(response); 
                                            sweet.show('Trámite no encontrado', 'Dirijase a la ventanilla donde inicio el trámite.', 'error');
                                    }
                                });*/
                                $.get( "http://192.168.5.243:8080/sysworkflow/es/ae/p247/services/WSAutoconsulta.php", datosNeXO, function( data, status ) {
                                    if (status=="success") {
                                        //var obj = JSON.parse(response); 
                                        var obj = JSON.parse(data);
                                        $scope.grillaHistorialNEXO = "mostrar";
                                        $scope.grillaHistorialAE = null;
                                        $scope.grillaHistorialSITRAM = null;
                                        $scope.frmConsulta = null;
                                        $scope.historial = obj.resultRoot;
                                        //console.log($scope.grillaHistorialNEXO);
                                    }
                                });
                            }
                        })
                        .error(function(error) {
                            //sweet.show('', "Paciente no registrado, Apersonarse a kardex", 'error');
                        });
                    }
                })
                .error(function(error) {
                    //sweet.show('', "Paciente no registrado, Apersonarse a kardex", 'error');
                });
            }
        })
        .error(function(error) {
            sweet.show('', "Paciente no registrado, Apersonarse a kardex", 'error');
        });

    };
    
    
    
    $scope.getDatosNexo = function(){
        
        var datosNeXO = {};

        datosNeXO['option'] = "CNS_TRAMITE";
        datosNeXO['nroTramite'] = nro;
        datosNeXO['contraseña'] = pass;
        
        $.get( "http://192.168.5.243:8080/sysworkflow/es/ae/p247/services/WSAutoconsulta.php", datosNeXO, function( data, status ) {
            if (status=="success") {        
                var obj = JSON.parse(data);
                $scope.grillaHistorialNEXO = "mostrar";
                $scope.grillaHistorialAE = null;
                $scope.grillaHistorialSITRAM = null;
                $scope.frmConsulta = null;
                $scope.historial = obj.resultRoot;
            }
        });
    };
    
    
      // GET THE FILE INFORMATION.
        $scope.getFileDetails = function (e) {

            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };

        // NOW UPLOAD THE FILES.
        $scope.uploadFiles = function () {

            //FILL FormData WITH FILE DETAILS.
            var data = new FormData();

            for (var i in $scope.files) {
                data.append("uploadedFile", $scope.files[i]);
            }

            // ADD LISTENERS.
            var objXhr = new XMLHttpRequest();
            objXhr.addEventListener("progress", updateProgress, false);
            objXhr.addEventListener("load", transferComplete, false);

            // SEND FILE DETAILS TO THE API.
            objXhr.open("POST", "/api/fileupload/");
            objXhr.send(data);
        };
    
    
    /*$scope.mostrarMensaje = function(){    
        alert("2");    
    };*/

    $rootScope.$on('mostrarmensaje', function(event, data){
            /*$scope.datos.INT_TIPO_CONTRIBUYENTE = 1;
            $scope.tipoPersona($scope.datos.INT_TIPO_CONTRIBUYENTE);*/
            $scope.getTramiteNexo();
    });
    
    
    
    $scope.$on('api:ready',function(){
        
    });    
    
    $scope.inicioHistorial = function () {
        if(DreamFactory.api[CONFIG.SERVICE]){
            $scope.getTramiteNexo();
        }
    };    


    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
        try{ 
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        catch (e) { console.log("error", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});