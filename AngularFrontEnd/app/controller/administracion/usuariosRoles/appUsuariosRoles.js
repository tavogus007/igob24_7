app.controller('UsuariosRolesController', function ($scope,$route, $rootScope, CONFIG,sessionService,ngTableParams,$filter,sweet) {
    var respuestaSuccess = "TRUE";
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
    var handleUsuarios = function(obj, name) {
        obj.success(function(response){
            $scope.usuarios = response;
        }).error(function(response){  
            $scope.errors[name] = $scope.conexion.error(response)
        })
    }
    $scope.getRoles = function(usrId) {
        try {
            var usuariosRoles = new datosAdm();
            usuariosRoles.idusr = usrId;
            usuariosRoles.roles_no_asignados(function(resultado){
                resultadoApi = JSON.parse(resultado);
                var response = resultadoApi.success;
                $scope.roles = response; 
            });
        } catch (error){
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    }
    $scope.getUsuRoles = function(usrId) {
       try {
            var usuariosRoles = new datosAdm();
            usuariosRoles.idusr = usrId;
            usuariosRoles.roles_asignados_usuario(function(resultado){
                resultadoApi = JSON.parse(resultado);
                var response = resultadoApi.success;
                $scope.usuariosRoles = response;
            });
        } catch (error){
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    }
    //**** listado usando procedimientos almacenados
    $scope.getUsuarios = function() {
       
        try {
            var usuarios = new datosAdm();
            usuarios.lstUsuarios(function(resultado){
              resultadoApi = JSON.parse(resultado);
              var response = resultadoApi.success;
              $scope.usuarios = response;
              $.unblockUI(); 
            });
        } catch (error){
          console.log("error_usuario : ", error);
          $.unblockUI(); 
        }
    };
    $scope.seleccionarUsuario = function(usrId,nombre_usuario) {
            $rootScope.idusu=usrId;
            $scope.nombre_usuario= " a " + nombre_usuario + ":";
            $scope.getUsuRoles(usrId);
            $scope.getRoles(usrId);
            $scope.checkboxes = { 'checked': true, items: {} };
            $scope.checkboxesi = { 'checked': true, items: {} };
    }
    $rootScope.idusu="";
    $scope.subir = function() {
        $.blockUI();
        var id_usu=$rootScope.idusu;
        angular.forEach($scope.roles,function(celda, fila){
            var id_rol=celda['rlid'];
            if($scope.checkboxes.items[id_rol])
            {
                try {
                    var fecha= new Date();
                    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                    var usuariosRoles = new datosAdm();
                    usuariosRoles.rls_id = id_rol;
                    usuariosRoles.usr_id = id_usu;
                    usuariosRoles.registrado = $scope.obtenerFecha();
                    usuariosRoles.modificado = $scope.obtenerFecha();
                    usuariosRoles.usuarios_usr_id = sessionService.get('IDUSUARIO');
                    usuariosRoles.estado = 'A';
                    usuariosRoles.subir(function(resultado){
                        resultadoApi = JSON.parse(resultado);
                        var response = resultadoApi.success;
                        $scope.getRoles(id_usu);
                        $scope.getUsuRoles(id_usu);
                        sweet.show('', 'Asignacion exitosa', 'success');
                    });
                } catch (error){
                    console.log("Error : ", error);
                    $.unblockUI(); 
                    sweet.show('', 'Falla asignacion', 'error');
                }
            } 
        });
        $.unblockUI(); 
    }
    $scope.bajar = function() {
        $.blockUI();
        var id_usu=$rootScope.idusu;
        angular.forEach($scope.usuariosRoles,function(celda, fila){
            var id_Usurol=celda['usrlsid'];

            if($scope.checkboxesi.items[id_Usurol])
            {
                try {
                    var fecha= new Date();
                    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                    var usuariosRoles = new datosAdm();
                    usuariosRoles.modificado = $scope.obtenerFecha();
                    usuariosRoles.estado = 'B';
                    usuariosRoles.usr_id = sessionService.get('IDUSUARIO');
                    usuariosRoles.id = id_Usurol;
                    usuariosRoles.bajar(function(resultado){
                        resultadoApi = JSON.parse(resultado);
                        var response = resultadoApi.success;
                        $scope.getRoles(id_usu);
                        $scope.getUsuRoles(id_usu);
                         sweet.show('', 'Desasignacion exitosa', 'success');
                    });
                } catch (error){
                    console.log("Error : ", error);
                    $.unblockUI(); 
                    sweet.show('', 'Falla desasignacion', 'error');
                }
            } 
        });
        $.unblockUI(); 
    }
    $scope.$on('api:ready',function() {
        $scope.getUsuarios();       
    });
    $scope.inicioUsuariosRoles = function () {
        
        $scope.getUsuarios();
    };
});