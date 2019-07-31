app.controller('dominiosController', function ($scope,$location,$route,CONFIG,sessionService,ngTableParams,$filter,sweet) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var size = 10;
      //listar         
    /************s1**********/
     $scope.getDocumento = function(){        
       var resRoles = new reglasnegocio();
       resRoles.identificador = 'RCCIUDADANO_92';
       resRoles.parametros = '{}';
       resRoles.llamarregla(function(response){
       var obj = JSON.parse(response);
       });
        obj.success(function (response) {
            $scope.obtDatos = response;            
            $.unblockUI();            
        });     
    }; 
    $scope.adicionarDominio = function(datosRol){
        $.blockUI();
       var resRol = new reglasnegocio();
       resRol.identificador = 'RCCIUDADANO_93';
       var US = sessionService.get('IDUSUARIO'); 
       resRol.parametros='{"dmn_dominio_desc":"'+ datosRol.vdmn_dominio_desc +'","dmn_usr_id":"'+ US +'"}';
       resRol.llamarregla(function(data){
       var obj = JSON.parse(data);
       });
        obj.success(function(data){
            $.unblockUI(); 
            sweet.show('', 'Registro insertado', 'success');
            $route.reload();
        });
    };
   $scope.modificarDominio = function(datosRol){
        $.blockUI();
       var resRol = new reglasnegocio();
       resRol.identificador = 'RCCIUDADANO_94';
       var US = sessionService.get('IDUSUARIO'); 
       resRol.parametros='{"id":"'+ datosRol.vdmn_id +'",dmn_dominio_desc":"'+ datosRol.vdmn_dominio_desc +'","dmn_usr_id":"'+ US +'"}';
       resRol.llamarregla(function(data){
       var obj = JSON.parse(data);
       });
       obj.success(function(data){
            $.unblockUI(); 
            sweet.show('', 'Registro modificado', 'success');
            $route.reload();
        })
    };
    $scope.eliminarDominio = function(datosRol){
        $.blockUI();
        var resRol = new reglasnegocio();
        resRol.identificador = 'RCCIUDADANO_95';
        var US = sessionService.get('IDUSUARIO'); 
        resRol.parametros='{"id":"'+ datosRol.vdmn_id +'",dmn_dominio_desc":"'+ datosRol.vdmn_dominio_desc +'","dmn_usr_id":"'+ US +'"dmn_estado":"B"}';
        resRol.llamarregla(function(data){
         var obj=JSON.parse(data);
        });
        obj.success(function(data){
            $.unblockUI(); 
            sweet.show('', 'Registro eliminado', 'success');
            $route.reload();
        });
    };
    /**************/
    $scope.modificarDocumentoCargar = function(rol){
        $scope.only=false;
        $scope.datosRol=rol;
        $scope.boton="upd";
        $scope.titulo="Modificar Dominios";
    };
    $scope.eliminarDocumentoCargar = function(rol){
        $scope.only=true;
        $scope.datosRol=rol;
        $scope.boton="del";
        $scope.titulo="Eliminar Dominios";
    };
    $scope.limpiar = function(){
        $scope.only=false;
        $scope.datosRol = '';
        $scope.boton="new";
        $scope.titulo="Registro de Dominios";
    }; 
    $scope.$on('api:ready',function(){
        $scope.getDocumento();       
    });
    $scope.inicioDocumentos = function () {
        $scope.getDocumento();            
    }; 

});