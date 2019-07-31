app.controller('tipoDocumentacionPlantillaController', function ($scope,$location,$route,CONFIG,sessionService,ngTableParams,$filter,sweet) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var size = 10;
      //listar     
       $scope.$on("ckeditor.ready", function( event ) {
        $scope.isReady = true;
    }); 
    /*******s1**********/
    $scope.getDocumento = function(){        
        var resRoles = new reglasnegocio();
         resRoles.identificador = 'RCCIUDADANO_108';
         resRoles.parametros = '{}';
         resRoles.llamarregla(function(response){
         response = JSON.parse(response);
            $scope.obtDatos = response;            
            $.unblockUI();            
        });      
    };
    /**********s2*********/
    $scope.guardarElaboracion = function (data){
        var adjunto = new reglasnegocio();
        adjunto.identificador = 'RCCIUDADANO_118';
        var US = sessionService.get('IDUSUARIO');
        adjunto.parametros='{"pltlla_id_tipo_documento":"'+ $scope.idtipoDoc +'","pltlla_plantilla":"'+ data.vpltlla_plantilla +'","pltlla_usr_id":"'+ US +'","pltlla_estado":"A"}';
        adjunto,llamarregla(function(respuesta){     
            respuesta= JSON.parse(respuesta);
            $.unblockUI();  
            sweet.show('', 'Registro insertado', 'success');
        });
    };
    /************s3*********************/
    $scope.modificar = function (data){
        var adjunto = new reglasnegocio();
        adjunto.identificador = 'RCCIUDADANO_119';
        var US = sessionService.get('IDUSUARIO');
        adjunto.parametros = '{"pltlla_id_tipo_documento":"'+ $scope.idtipoDoc +'","pltlla_plantilla":"'+ data.vpltlla_plantilla +'","pltlla_usr_id":"'+ US +'","pltlla_estado":"A"}';
        adjunto,llamarregla(function(respuesta){     
        respuesta = JSON.parse(respuesta);
            $.unblockUI(); 
            sweet.show('', 'Registro modificado', 'success');
               
        });
    };
    /***************************/
    $scope.limpiar = function(){
        $scope.only=false;
        $scope.datosRol = '';
        $scope.boton="new";
        $scope.titulo="Registro de Tipo de Documentacion";
    }; 


    // ********** Nuevo ******* //
    // ********** Modal de Tipo Documentaciones *********** //
     $scope.elaborar = function (){      
      $scope.elaboracionFor = true;
      $scope.boton1="new";      
      $scope.datosRol='';
      $scope.titulo = "Elaboración de Plantilla";
    }
    
    $scope.modificarElaboracion = function (datos){      
        $scope.elaboracionFor = true;
        $scope.datosRol = datos;     
        $scope.boton1="upd";
        $scope.titulo = "Modificación de Plantilla";
    }     
    /***********s4*********/
    $scope.getDocumentacion = function(idtipoDocumento, tipoDoc){
        // **** Recuperar el id del doc para poderlo recargar
        $scope.idtipoDoc = idtipoDocumento;        
        $scope.tipoDocumentacion = tipoDoc;
        var resDocs = new reglasnegocio();
        resDocs.identificador = 'RCCIUDADANO_120';
        resDocs.parametros = '{"id_tipo_documento":"'+ idtipoDocumento +'"}';
        resDocs.llamarregla(function(response){
        response = JSON.parse(response);
            $scope.obtDocumentos = response;
            if(response.length == 0)
                {
                    $scope.elaborar();
                }
            else
                {                     
                    $scope.modificarElaboracion(response[0]);
                }

            $.unblockUI();
        });      
    };     
    /******************/
    $scope.volver = function () {        
        $scope.elaboracionFor = null;       
    }

    $scope.$on('api:ready',function(){
        $scope.getDocumento();
        
    });

    $scope.inicioDocumentos = function () {
        $scope.getDocumento();
    }; 
});