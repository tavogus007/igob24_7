app.controller('usuariosController', function ($scope, CONFIG, sessionService,$route,ngTableParams,$filter,sweet) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
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
    $scope.getUsuarios = function(){
        $.blockUI();
        try {
            var usuarios = new datosAdm();
            usuarios.lstUsuarios(function(resultado){
                resultadoApi = JSON.parse(resultado);
                $scope.obtUsuarios = resultadoApi.success;
                var data = resultadoApi.success;
                $scope.tablaUsuarios = new ngTableParams({
                    page: 1,          
                    count: 10,  
                    filter: {},
                    sorting: {}    
                }, {
                    total: $scope.obtUsuarios.length,
                    getData: function($defer, params) {
                        var filteredData = params.filter() ?
                        $filter('filter')($scope.obtUsuarios, params.filter()) :
                        $scope.obtUsuarios;              
                        var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        $scope.obtUsuarios;
                        params.total(orderedData.length);
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
                $.unblockUI(); 
            });
        } catch (error){
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    };
    $scope.getPersonasUsuarios = function(a,b){
        try {
            if(a=='new'){
                var usuarios = new datosAdm();
                usuarios.persona_list_no_usuario_new(function(resultado){
                    console.log(resultado);
                    resultadoApi = JSON.parse(resultado);
                    $scope.personas = resultadoApi.success;           
                });    
            } else {
               var usuarios = new datosAdm();
                usuarios.idpsr = b;
                usuarios.persona_list_no_usuario_upd(function(resultado){
                    console.log(resultado);
                    resultadoApi = JSON.parse(resultado);
                    $scope.personas = resultadoApi.success;           
                });        
            }
        } catch (error){
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    };
    $scope.adicionarUsuario = function(datosUsuario){
        try {
            $.blockUI();
            var usuarios = new datosAdm();
            usuarios.prs_id = datosUsuario.psrId;
            usuarios.usuario = datosUsuario.usrUsuario;
            usuarios.clave = datosUsuario.usrClave;
            usuarios.controlar_ip = '1';
            usuarios.registrado =  $scope.obtenerFecha();
            usuarios.modificado =  $scope.obtenerFecha();
            usuarios.usr_id = sessionService.get('IDUSUARIO');
            usuarios.estado = 'A';
            usuarios.addUsuario(function(resultado){
                resultadoApi = JSON.parse(resultado);
                $.unblockUI(); 
                sweet.show('', 'Registro insertado', 'success');
                $scope.getUsuarios();
                $scope.$apply();
            });
        } catch (error) {
            sweet.show('', 'Registro no insertado', 'error');
            console.log("Error : ", error);
            $.unblockUI(); 
        }        
    };
    $scope.modificarUsuario = function(usrId, datosUsuario){
        try {
            $.blockUI();
            var usuarios = new datosAdm();
            usuarios.prs_id = datosUsuario.psrId;
            usuarios.usuario = datosUsuario.usrUsuario;
            usuarios.clave = datosUsuario.usrClave;
            usuarios.modificado = $scope.obtenerFecha();
            usuarios.usr_id = sessionService.get('IDUSUARIO');
            usuarios.id = usrId;
            usuarios.uptUsuario(function(resultado){
                resultadoApi = JSON.parse(resultado);
                $.unblockUI(); 
                sweet.show('', 'Registro modificado', 'success');
                $scope.getUsuarios();
                $scope.$apply();
            });
        } catch (error) {
            sweet.show('', 'Registro no modificado', 'error');
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    };
    $scope.eliminarUsuario = function(usrId){
        try {
            $.blockUI();
            var usuarios = new datosAdm();
            usuarios.modificado = $scope.obtenerFecha();
            usuarios.estado = 'B';
            usuarios.usr_id = sessionService.get('IDUSUARIO');
            usuarios.id = usrId;
            usuarios.delUsuario(function(resultado){
                resultadoApi = JSON.parse(resultado);
                $.unblockUI(); 
                sweet.show('', 'Registro eliminado', 'success');
                $scope.getUsuarios();
                $scope.$apply();
            });
        } catch (error) {
            sweet.show('', 'Registro no eliminado', 'error');
            console.log("Error : ", error);
            $.unblockUI(); 
        }        
    }; 
    $scope.limpiar = function(){
        $scope.getPersonasUsuarios("new");
        $scope.datosUsuario = '';
        $scope.desabilitado=false;
        $scope.boton="new";
        $scope.titulo="Registro de Usuarios";
    };
    $scope.modificarUsuarioCargar = function(usuario){
        $scope.getPersonasUsuarios("upd",usuario.psrId);
        $scope.datosUsuario=usuario;
        $scope.boton="upd";
        $scope.desabilitado=false;
        $scope.titulo="Modificar Usuarios";
    };
    $scope.eliminarUsuarioCargar = function(usuario){
        $scope.getPersonasUsuarios("upd",usuario.psrId);
        $scope.datosUsuario=usuario;
        $scope.desabilitado=true;
        $scope.boton="del";
        $scope.titulo="Eliminar Usuarios";
    };
    $scope.$on('api:ready',function(){
        $scope.getUsuarios();       
    });
    $scope.inicioUsuarios = function () {
        $scope.getUsuarios();
    }; 
});
