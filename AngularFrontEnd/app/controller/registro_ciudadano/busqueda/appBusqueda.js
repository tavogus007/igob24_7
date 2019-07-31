app.controller('busquedaController' , function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, ngTableParams,$filter) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        
    $scope.prsCI = sessionService.get('USUARIO');
    $scope.prsCI = "6157896";
    $scope.startDateOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
    };
    $scope.antecedentes = [ //<--- Adding the data
            {id:1,ant:'Alergias o medicamentos',det:'Penicilina'},
            {id:2,ant:'Problemas respiratorios',det:'asma'},
            {id:3,ant:'Problemas congenitos',det:'malformaciones'}
        ];
    $scope.antecedentesFamiliares = [ //<--- Adding the data
            {id:1,ante:'Diabetes'},
            {id:2,ante:'Cirrocis'},
            {id:3,ante:'Cancer'}
        ];
    $rootScope.prsId=0;
    

    /***************************** registroMedico *************************************/
        $scope.registroMedico = function(prsId) {
        $scope.checkboxes = { 'checked': true, items: {} };
        $scope.checkboxesi = { 'checked': true, items: {} };
        $rootScope.prsId=prsId;
        $scope.regMedico = "mostrar";
        $scope.formCambioPin = null;
        var misDatos = new reglasnegocio();
            misDatos.identificador = 'RCCIUDADANO_47';
            misDatos.parametros = '{"prsId":"' + prsId + '"}'; 
            $scope.boton='new';
            misDatos.llamarregla(function(response){
            response = JSON.parse(response);
            $scope.datosMedicos='';
            if(response.length>0){ 
            $scope.boton='upd';
            $scope.datosMedicos=response[0];
                var antPer1=response[0].dtsmdcantpersonal_1.split('&');
                var antPer2=response[0].dtsmdcantpersonal_2.split('&');
                var antPer3=response[0].dtsmdcantpersonal_3.split('&');
                var antFam1=response[0].dtsmdcantfamiliar_1.split('&');
                var antFam2=response[0].dtsmdcantfamiliar_2.split('&');
                var antFam3=response[0].dtsmdcantfamiliar_3.split('&');
                if(antPer1[0]==1)
                    $scope.checkboxes.items[1]=true;
                else
                    $scope.checkboxes.items[1]=false;   
                
                if(antPer2[0]==1)
                    $scope.checkboxes.items[2]=true;
                else
                    $scope.checkboxes.items[2]=false;   
                
                if(antPer3[0]==1)
                    $scope.checkboxes.items[3]=true;
                else
                    $scope.checkboxes.items[3]=false; 

                if(antFam1[0]==1)
                    $scope.checkboxesi.items[1]=true;
                else
                    $scope.checkboxesi.items[1]=false; 
                if(antFam2[0]==1)
                    $scope.checkboxesi.items[2]=true;
                else
                    $scope.checkboxesi.items[2]=false; 
                if(antFam3[0]==1)
                    $scope.checkboxesi.items[3]=true;
                else
                    $scope.checkboxesi.items[3]=false; 
            }
            else{
                $scope.checkboxes = { 'checked': true, items: {} };
                $scope.checkboxesi = { 'checked': true, items: {} };
            }
          });
        };

    /************************** guardarDatosMedicos *************************************/
    $scope.guardarDatosMedicos = function(opcion,datosMedicos) {
        var datosMed = {};

        angular.forEach($scope.antecedentes,function(celda, fila){
            var idAnt=celda['id'];
            if($scope.checkboxes.items[idAnt])
            {
                datosMed['dtsmdc_ant_personal_'+idAnt] = '1&'+celda['id']+'&'+celda['ant']+'&'+celda['det'];
            } 
            else{
                datosMed['dtsmdc_ant_personal_'+idAnt] = '0&'+celda['id']+'&'+celda['ant']+'&'+celda['det'];
            }
        });
        angular.forEach($scope.antecedentesFamiliares,function(celda, fila){
            var idAntf=celda['id'];
            if($scope.checkboxesi.items[idAntf])
                datosMed['dtsmdc_ant_familiar_'+idAntf] = '1&'+celda['id']+'&'+celda['ante'];
            else
                datosMed['dtsmdc_ant_familiar_'+idAntf] = '0&'+celda['id']+'&'+celda['ante'];
        });
        if(datosMedicos.dtsmdcfechaalta.getFullYear)
            var fechaAlta=datosMedicos.dtsmdcfechaalta.getFullYear() + "-" + (datosMedicos.dtsmdcfechaalta.getMonth()+1) + "-" + datosMedicos.dtsmdcfechaalta.getDate() + " " + datosMedicos.dtsmdcfechaalta.getHours() + ":" + datosMedicos.dtsmdcfechaalta.getMinutes() + ":" + datosMedicos.dtsmdcfechaalta.getSeconds();
        else
            var fechaAlta=datosMedicos.dtsmdcfechaalta;
        
        if(opcion=='new')
        {
            var resDatosMed   = new reglasnegocio();
            resDatosMed.identificador = 'RCCIUDADANO_48';
            var usrId = sessionService.get('IDUSUARIO');
            resDatosMed.parametros = '{"dtsmdc_dtspsl_id":"'+ $rootScope.prsId +'","dtsmdc_grp_sanguineo":"'+ datosMedicos.dtsmdcgrpsanguineo +'","dtsmdc_cbt_medica":"'+ datosMedicos.dtsmdcsbtmedica +'","dtsmdc_fecha_alta":"'+ datosMedicos.dtsmdcsbtmedica +'","dtsmdc_observaciones":"'+ datosMedicos.dtsmdcobservaciones +'","dtsmdc_usr_id":"'+ usrId +'"}';   
            resDatosMed.llamarregla(function(data){
                alert("registro insertado");
            })
        }
        else{
            var resDatosMed   = new reglasnegocio();
            resDatosMed.identificador = 'RCCIUDADANO_59';
            var usrId = sessionService.get('IDUSUARIO');
            resDatosMed.parametros = '{"dtsmdc_dtspsl_id":"'+ $rootScope.prsId +'","dtsmdc_grp_sanguineo":"'+ datosMedicos.dtsmdcgrpsanguineo +'","dtsmdc_cbt_medica":"'+ datosMedicos.dtsmdcsbtmedica +'","dtsmdc_fecha_alta":"'+ datosMedicos.dtsmdcsbtmedica +'","dtsmdc_observaciones":"'+ datosMedicos.dtsmdcobservaciones +'","dtsmdc_usr_id":"'+ usrId +'"}';   
            resDatosMed.llamarregla(function(data){
                //data = JSON.parse(data);
                alert("registro modificado");
            })
        }
    };

    /***************************** buscarPersona ********************************/
    
    $scope.buscarPersona = function (datos) {
        $scope.tablaCiudadanos = "mostrar";
        var misDatos   = new reglasnegocio();
        misDatos.identificador = 'RCCIUDADANO_49';
        misDatos.parametros = '{"sci":"' + datos.vci + '","snombre":"' + datos.vnombre + '","sappaterno":"' + datos.vappaterno + '","sapmaterno":"' + datos.vapmaterno + '","sfechanacimiento":"' + datos.vfechanacimiento + '"}';
        misDatos.llamarregla(function(response){
        response = JSON.parse(response);
            if(response.length > 0){ 
                $scope.obtDatos = response;
                alert("Datos Encontrados !!!");
            } else {
                alert("No existen ninguno ciudadano");
                $scope.obtDatos="";
            }
        });
    };    
    
    /**************************************************************************/
    $scope.verOpciones = function (datos) {
        $scope.tablaCiudadanos = null;
        $scope.nuevaBusqueda = "mostrar";
        $scope.opciones = "mostrar";
        $scope.msg = "Procesando";
        $scope.desabilitado = "true";
        $scope.datos = datos;
        $scope.encontrado = "si";
        if(datos.vestado_activacion=='BLOQUEADO')
        {
            datos.icono='fa fa-lock fa-lg';
        }
        else{
            datos.icono='fa fa-unlock fa-lg';
        }
        if(datos.vactivacionf=='SI')
        {
            datos.iconoAF='fa fa-thumbs-o-up fa-lg';
        }
        else{
            datos.iconoAF='fa fa-thumbs-o-down fa-lg';
        }
        $scope.dataP = [datos];
    };
    $scope.cambioPin = function (datos) {
        $scope.msg = "Procesando";
        $scope.formCambioPin = "ingresando";
        $scope.regMedico = null;
        $scope.prsCI = datos["vci"];
    };
    /************************ Cambio de Pin *********************************/
    $scope.restaurarPin = function (datosCambioPin, prsCI) {
        if (datosCambioPin.prsPinN == datosCambioPin.prsPinC) {
            $scope.msgPIN = "Procesando";
            var srestaurarPin   = new reglasnegocio();
            srestaurarPin.identificador = 'RCCIUDADANO_50';
            srestaurarPin.parametros = '{"sci":"' + prsCI + '","spinanterior":"' + datosCambioPin.prsPinA + '","spinnuevo":"' + datosCambioPin.prsPinN + '"}';
            srestaurarPin.llamarregla(function(results){
                results = JSON.parse(results);   
                if(results.length > 0){ 
                    $scope.msgPIN = results[0]["confirmacion"];
                } else {
                    $scope.msgPIN = results[0]["confirmacion"];
                }
            });            
        } else {
            $scope.msgPIN = "No Concuerdan Pin Nuevo y su Confirmacion";
        }
    };
    /********************  cambio de bloqueado a desbloqueado ******************/
    $scope.cambioEstado = function (id,estado) {
        var scambioEstado   = new reglasnegocio();
        scambioEstado.identificador = 'RCCIUDADANO_51';
        scambioEstado.parametros = '{"id":"' + datos.vid + '","sestado":"' + datos.vestado_activacion + '"}';
        scambioEstado.llamarregla(function(results){
            results = JSON.parse(results);   
            if(results.length > 0){
                if(results[0]=='BLOQUEADO'){
                    datos.icono='fa fa-lock fa-lg';
                    datos.vestado_activacion=results[0];
                }
                else{
                    datos.icono='fa fa-unlock fa-lg';
                    datos.vestado_activacion=results[0];
                }
                $scope.dataP = [datos];
                alert("USUARIO " + results[0]);
            } else {
                alert("error");
            }
        });            
    };
    /*************************** Activacion Fisica del ciudadano ********************/
    $scope.activacionFisica = function (datos) {
        if (datos.vactivacionf=="NO") {
            var misDatos = new reglasnegocio();
            misDatos.identificador = 'RCCIUDADANO_86';
            misDatos.parametros = '{"sci":"' + datos.vid + '","sestadoactivacionfisica":"SI","sidregistro":"' + datos.vid + '"}';
            misDatos.llamarregla(function(results){
                results = JSON.parse(results);
                if(datos.vactivacionf=='NO'){
                    datos.iconoAF='fa fa-thumbs-o-up fa-lg';
                    datos.vactivacionf = 'SI';
                } else {
                    datos.iconoAF='fa fa-thumbs-o-down fa-lg';
                    datos.vactivacionf = 'SI';
                }
                $scope.dataP = [datos];
                alert("CIUDADANO" + results[0]["spactivacionfisica"]);
            });
        } else{
            alert("CIUDADANO ACTIVO");
        }      
    };
    
    /**************************************************************************/
    ////fin activacion Fisica
    $scope.restaurarBusqueda = function(){
        $scope.tablaCiudadanos = null;
        $scope.nuevaBusqueda = null;
        $scope.opciones = null;
        $scope.desabilitado = null;
        $scope.datos = null;
        $scope.formCambioPin = null;
        $scope.regMedico = null;
    }
    //direccionar a modificar datos del registro 
    $rootScope.vid = "";
    $scope.modificarDatosRegistro = function(vid){
        $rootScope.vid = vid.vid;
        $location.path("registro_ciudadano|modificarRegistro");                    
    }

    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
        try{ 
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        catch (e) { console.log("error", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});