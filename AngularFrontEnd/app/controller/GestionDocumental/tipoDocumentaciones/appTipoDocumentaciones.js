app.controller('tipoDocumentacionesController', function ($scope,$location,$route,CONFIG,sessionService,ngTableParams,$filter,sweet) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var size = 10;
      //listar     
    /***********s1*****************/
    $scope.getDocumento = function(){        
        var resRoles = new reglasnegocio();
         resRoles.identificador = 'RCCIUDADANO_121';
         resRoles.parametros = '{}';
         resRoles.llamarregla(function(response){
         response = JSON.parse(response);
            $scope.obtDatos = response;            
            $.unblockUI();            
        });      
    };

    /***********s2************/
    $scope.getComboDominios = function(){        
        var resRoles = new reglasnegocio();
        resRoles.identificador = 'RCCIUDADANO_113';
        resRoles.parametros = '{}';
        resRoles.llamarregla(function(response){
        response = JSON.parse(response);
            $scope.obtDominios = response;            
            $.unblockUI();            
        });      
    };
    /*********s3****************/
    $scope.getComboTipoDocumentacion = function(){        
           var resRoles = new reglasnegocio();
           resRoles.identificador = 'RCCIUDADANO_114';
           resRoles.parametros='{}';
           resRoles.llamarregla(function(response){
            response = JSON.parse(response);
            $scope.obtTipoDocumentacion = response;            
            $.unblockUI();            
        });      
    };
     /************s4****************/
     //falta un parametro
    $scope.adicionarTipoDocumentacion = function(datosRol){
        $.blockUI();
        var rol = new reglasnegocio();
        rol.identificador = 'RCCIUDADANO_115';
        var US = sessionService.get('IDUSUARIO'); 
        rol.parametros = '{"doct_tps_doc_id":"'+ datosRol.vdoct_tps_doc_id +'","doct_titulo":"'+ datosRol.vdoct_titulo +'","doct_dmn_id":"'+ datosRol.vdoct_dmn_id +'", "doct_usr_id":"'+ US +'"}';        
        rol.llamarregla(function(data){
        data = JSON.parse(data);
            $.unblockUI(); 
            sweet.show('', 'Registro insertado', 'success');
            $scope.getDocumentacion($scope.idtipoDoc);
        });
    };    
   /*************s4***************/
    $scope.modificarTipoDocumentacion = function(datosRol){
        $.blockUI();
        var rol = new reglasnegocio();
        rol.identificador = 'RCCIUDADANO_116';
        var US = sessionService.get('IDUSUARIO'); 
        rol.parametros='{"id":"'+ datosRol.vdoct_id +'","doct_tps_doc_id":"'+ datosRol.vdoct_tps_doc_id +'","doct_titulo":"'+ datosRol.vdoct_titulo +'","doct_dmn_id":"'+ datosRol.vdoct_dmn_id +'", "doct_usr_id":"'+ US +'"}';        
        rol.llamarregla(function(data){
        data = JSON.parse(data);
            $.unblockUI(); 
            sweet.show('', 'Registro modificado', 'success');
            $route.reload();
        });
       };
    /***************s5*****************/
    $scope.eliminarTipoDocumentacion = function(datosRol){
        $.blockUI();
        var rol = new reglasnegocio();
        rol.identificador = 'RCCIUDADANO_117';
        var US = sessionService.get('IDUSUARIO'); 
        rol.parametros ='{"id":"'+ datosRol.vdoct_id +'","doct_tps_doc_id":"'+ datosRol.vdoct_tps_doc_id +'","doct_titulo":"'+ datosRol.vdoct_titulo +'","doct_dmn_id":"'+ datosRol.vdoct_dmn_id +'", "doct_usr_id":"'+ US +'","doct_estado":"B"}';        
        rol.llamarregla(function(data){
        data = JSON.parse(data);
            $.unblockUI(); 
            sweet.show('', 'Registro eliminado', 'success');
            $route.reload();
        });
    };
    
    /************************/
    $scope.modificarDocumentoCargar = function(rol){
        $scope.only=false;
        $scope.datosRol=rol;
        $scope.boton="upd";
        $scope.titulo="Modificar Tipo de Documentacion";
    };
    $scope.eliminarDocumentoCargar = function(rol){
        $scope.only=true;
        $scope.datosRol=rol;
        $scope.boton="del";
        $scope.titulo="Eliminar Tipo de Documentacion";
    };
    $scope.limpiar = function(){
        $scope.only=false;
        $scope.datosRol = '';
        $scope.boton="new";
        $scope.titulo="Registro de Tipo de Documentacion";
    }; 
    $scope.$on('api:ready',function(){
        $scope.getDocumento();       
        $scope.getComboDominios();
        $scope.getComboTipoDocumentacion();
    });
    $scope.inicioDocumentos = function () {
        $scope.getDocumento(); 
        $scope.getComboDominios();
        $scope.getComboTipoDocumentacion();           
    }; 
});