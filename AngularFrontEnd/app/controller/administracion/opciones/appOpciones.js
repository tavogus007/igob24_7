/**********************************************************************************/
app.controller('opcionesController', function ($scope, $route,$rootScope, CONFIG,sessionService,ngTableParams,$filter,sweet) { 
    var strfecha= new Date();
    var strfechactual=strfecha.getFullYear() + "-" + strfecha.getMonth() + "-" + strfecha.getDate() + " " + strfecha.getHours() + ":" + strfecha.getMinutes() + ":" + strfecha.getSeconds();
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
    $scope.getOpciones = function(){
        try {
            var opciones = new datosAdm();
            opciones.lstOpciones(function(resultado){
                resultadoApi = JSON.parse(resultado);
                var response = resultadoApi.success;
                $scope.obtOpciones=response;
                var data = response;   //grabamos la respuesta para el paginado
                $scope.tablaOpciones = new ngTableParams({
                    page: 1,          
                    count: 10,
                    filter: {},
                    sorting: {}
                }, {
                    total: $scope.obtOpciones.length,
                    getData: function($defer, params) {
                        var filteredData = params.filter() ?
                        $filter('filter')($scope.obtOpciones, params.filter()) :
                        $scope.obtOpciones;              
                        var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        $scope.obtOpciones;
                        params.total(orderedData.length);
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));                  
                    }
                });  
            });
        } catch (error){
            console.log("Error : ", error);
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
                $.unblockUI(); //cerrar la mascara 
            });
            $.unblockUI();
        } catch (error){
            console.log("Error : ", error);
            $.unblockUI(); 
        }        
    };
    $scope.adicionarOpciones = function(datosOpcion){
        
        try {
              var opciones = new datosAdm();
              opciones.grp_id = datosOpcion.opcGrpId;
              opciones.opcion = datosOpcion.opcOpcion;
              opciones.contenido = datosOpcion.opcContenido;
              opciones.registrado = $scope.obtenerFecha();
              opciones.modificado = $scope.obtenerFecha();
              opciones.usr_id = sessionService.get('IDUSUARIO');
              opciones.addOpcion(function(resultado){
                  resultadoApi = JSON.parse(resultado);
                  var response = resultadoApi.success;
                  sweet.show('', 'Registro insertado', 'success');
                  $.unblockUI(); 
              });
              $scope.getOpciones();
        } catch (error){
              console.log("Error : ", error);
              $.unblockUI(); 
            sweet.show('', 'Registro no insertado', 'error');
        } 
    };
    $scope.modificarOpcionCargar = function(datosOpcion){
        $scope.datosOpcion = datosOpcion;
        $scope.boton="upd";
        $scope.desabilitado=false;
        $scope.titulo="Modificar Opcion";
    };
    $scope.eliminarOpcionCargar = function(datosOpcion){
        $scope.datosOpcion= datosOpcion;
        $scope.desabilitado=true;
        $scope.boton="del";
        $scope.titulo="Eliminar Opcion";
    };
    $scope.limpiar = function(){
        $scope.datosOpcion = [''];
        $scope.boton="new";
        $scope.desabilitado = false;
        $scope.titulo="Registrar Opcion";
    };
    $scope.modificarOpciones = function(opcId,datosOpcion){
        try {
              var opciones = new datosAdm();
              opciones.grp_id = datosOpcion.opcGrpId;
              opciones.opcion = datosOpcion.opcOpcion;
              opciones.contenido = datosOpcion.opcContenido;
              opciones.registrado = $scope.obtenerFecha();
              opciones.modificado = $scope.obtenerFecha();
              opciones.usr_id = sessionService.get('IDUSUARIO');
              opciones.id = opcId;
              opciones.uptOpcion(function(resultado){
                  resultadoApi = JSON.parse(resultado);
                  var response = resultadoApi.success;
                  sweet.show('', 'Registro modificado', 'success');
                  $.unblockUI(); 
              });
              $scope.getOpciones();
        } catch (error){
              console.log("Error : ", error);
              $.unblockUI(); 
              sweet.show('', 'Registro no modificado', 'error');
        }   
    };
    $scope.EliminarOpciones = function(opcId){
        
        try {
              var opciones = new datosAdm();
              opciones.modificado = $scope.obtenerFecha();
              opciones.estado = 'B';
              opciones.usr_id = sessionService.get('IDUSUARIO');
              opciones.id = opcId;
              opciones.delOpcion(function(resultado){
                  resultadoApi = JSON.parse(resultado);
                  var response = resultadoApi.success;
                  sweet.show('', 'Registro eliminado', 'success');
                  //$.unblockUI(); 
              });
              $scope.getOpciones();
        } catch (error){
              console.log("Error : ", error);
              $.unblockUI(); 
              sweet.show('', 'Registro no eliminado', 'error');
        }    
    };
    $scope.$on('api:ready',function(){            
        $scope.getOpciones();
        $scope.getGrupos();
    });
    $scope.inicioOpciones = function () {
        $scope.getOpciones();
        $scope.getGrupos();
    };     
});