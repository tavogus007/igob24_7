app.controller('rolesController', function ($scope,$location,$route,CONFIG,sessionService,ngTableParams,$filter,sweet) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var size = 10;
      //listar roles
    $scope.obtenerFecha = function(){
        var sfecha = "";
        try{
            var fechaactualn = new fechaserver();
            fechaactualn.obtfechahora(function(resultado){
                sfecha  =   JSON.parse(resultado).success.fecha;
            });
            return sfecha;
        }catch(e){
            $.unblockUI();
        }
    };
    $scope.getRoles = function(){
        try {
            $.blockUI();
            var roles = new datosAdm();
            roles.lstRoles(function(resultado){
                resultadoApi = JSON.parse(resultado);
                var response = resultadoApi.success;
                $scope.obtRoles = response;
                var data = response;   
                $scope.tablaRoles = new ngTableParams({
                    page: 1,          
                    count: 5,
                    filter: {},
                    sorting: {}      
                }, {
                    total: $scope.obtRoles.length,
                    getData: function($defer, params) {
                        var filteredData = params.filter() ?
                        $filter('filter')($scope.obtRoles, params.filter()) :
                        $scope.obtRoles;              
                        var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        $scope.obtRoles;
                        params.total(orderedData.length);
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));                 
                    }
                }); 
            });
            $.unblockUI();
        } catch (error){
            console.log("Error : ", error);
            $.unblockUI(); 
        }    
    };
    $scope.adicionarRol = function(datosRol){
        try {
            $.blockUI();
            var roles = new datosAdm();
            roles.rol= datosRol.rlsRol;
            roles.registrado =  $scope.obtenerFecha();
            roles.modificado =  $scope.obtenerFecha();
            roles.usr_id = sessionService.get('IDUSUARIO');
            roles.estado = 'A';
            roles.addRol(function(resultado){
                resultadoApi = JSON.parse(resultado);
                //$.unblockUI(); 
                sweet.show('', 'Registro insertado', 'success');
                $scope.getRoles();
            });
            $.unblockUI(); 
        } catch (error) {
            sweet.show('', 'Registro no insertado', 'error');
            console.log("Error : ", error);
            $.unblockUI(); 
        } 
    };
    $scope.modificarRol = function(rolId,datosRol){
        try {
            $.blockUI(); 
            var roles = new datosAdm();
            roles.roles = datosRol.rlsRol;
            roles.modificado = $scope.obtenerFecha();
            roles.usr_id = sessionService.get('IDUSUARIO');
            roles.id = rolId;
            roles.uptRol(function(resultado){
                resultadoApi = JSON.parse(resultado);
                sweet.show('', 'Registro modificado', 'success');
                $scope.getRoles();
            });
            $.unblockUI(); 
        } catch (error){
            sweet.show('', 'Registro no insertado', 'error');
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    };
    $scope.eliminarRol = function(rolId){
        try {
            $.blockUI(); 
            var roles = new datosAdm();
            roles.modificado =  $scope.obtenerFecha();
            roles.estado = 'B';
            roles.usr_id = sessionService.get('IDUSUARIO');
            roles.id = rolId;
            roles.delRol(function(resultado){
                resultadoApi = JSON.parse(resultado);
                sweet.show('', 'Registro eliminado', 'success');
                $scope.getRoles();
            });
            $scope.getRoles();
            $.unblockUI(); 
        } catch (error){
            sweet.show('', 'Registro no eliminado', 'error');
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    }; 
    $scope.modificarRolCargar = function(rol){
        $scope.only=false;
        $scope.datosRol=rol;
        $scope.boton="upd";
        $scope.titulo="Modificar Roles";
    };
    $scope.eliminarRolCargar = function(rol){
        $scope.only=true;
        $scope.datosRol=rol;
        $scope.boton="del";
        $scope.titulo="Eliminar Roles";
    };
    $scope.limpiar = function(){
        $scope.only=false;
        $scope.datosRol = '';
        $scope.boton="new";
        $scope.titulo="Registro de Roles";
    }; 
    $scope.$on('api:ready',function(){
        $scope.getRoles();       
    });
    $scope.inicioRoles = function () {
       
        $scope.getRoles();

    }; 

});