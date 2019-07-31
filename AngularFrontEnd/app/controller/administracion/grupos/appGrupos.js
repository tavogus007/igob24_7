app.controller('gruposController', function ($scope, $route,$rootScope, CONFIG,sessionService,ngTableParams,$filter,sweet) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var size = 10;
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
    $scope.getGrupos = function(){
      try {
            $.blockUI();
            var grupos = new datosAdm();
            grupos.lstGrupos(function(resultado){
                resultadoApi = JSON.parse(resultado);
                var response = resultadoApi.success;
                $scope.obtGrupos = response;
                var data = response; 
                $scope.tablaGrupos = new ngTableParams({
                    page: 1,          
                    count: 10,
                    filter: {},
                    sorting: {}      
                }, {
                    total: $scope.obtGrupos.length,
                    getData: function($defer, params) {
                        var filteredData = params.filter() ?
                        $filter('filter')($scope.obtGrupos, params.filter()) :
                        $scope.obtGrupos;              
                        var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    $scope.obtGrupos;
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
    $scope.adicionarGrupo = function(datosGrupo){
        try {
            $.blockUI();
            var grupos = new datosAdm();
            grupos.grupo = datosGrupo.grpGrupo;
            grupos.registrado = $scope.obtenerFecha();
            grupos.modificado = $scope.obtenerFecha();
            grupos.usr_id = sessionService.get('IDUSUARIO');
            grupos.addGrupo(function(resultado){
                resultadoApi = JSON.parse(resultado);
                $.unblockUI(); 
                sweet.show('', 'Registro insertado', 'success');
                $scope.getGrupos();
            });
        } catch (error) {
            sweet.show('', 'Registro no insertado', 'error');
            console.log("Error : ", error);
            $.unblockUI(); 
        } 
    };
    $scope.modificarGrupo = function(grpId,datosGrupo){
        try {
            $.blockUI(); 
            var grupos = new datosAdm();
            grupos.grupo = datosGrupo.grpGrupo;
            grupos.modificado = $scope.obtenerFecha();
            grupos.usr_id = sessionService.get('IDUSUARIO');
            grupos.id = grpId;
            grupos.uptGrupo(function(resultado){
                resultadoApi = JSON.parse(resultado);
                $.unblockUI(); 
                sweet.show('', 'Registro modificado', 'success');
                $scope.getGrupos();
            });
            $.unblockUI(); 
        } catch (error){
            sweet.show('', 'Registro no insertado', 'error');
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    };
    $scope.eliminarGrupo = function(grpId){
        try {
            $.blockUI(); 
            var grupos = new datosAdm();
            grupos.modificado = $scope.obtenerFecha();
            grupos.estado = 'B';
            grupos.usr_id = sessionService.get('IDUSUARIO');
            grupos.id = grpId;
            grupos.delGrupo(function(resultado){
                resultadoApi = JSON.parse(resultado);
                $.unblockUI(); 
                sweet.show('', 'Registro eliminado', 'success');
                $scope.getGrupos();
                $route.reload(); 
            });
            $.unblockUI(); 
        } catch (error){
            sweet.show('', 'Registro no eliminado', 'error');
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    };
    $scope.modificarGrupoCargar = function(datosGrupo){  
       
        $scope.datosGrupo = datosGrupo;   
        $scope.boton="upd";
        $scope.desabilitado=false;
        $scope.titulo="Modificar Grupos";
    };
    $scope.eliminarGrupoCargar = function(datosGrupo){
        $scope.datosGrupo= datosGrupo;
        $scope.desabilitado=true;
        $scope.boton="del";
        $scope.titulo="Eliminar Grupos";
    };
    $scope.limpiar = function(){
        $scope.datosGrupo='';
        $scope.desabilitado=false;
        $scope.boton="new";
        $scope.titulo="Registro de Grupos";
    };
    $scope.$on('api:ready',function(){            
        
        $scope.getGrupos();
    });
    $scope.inicioGrupos = function () {
      
        $scope.getGrupos();
    };      
});