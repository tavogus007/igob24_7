app.controller('documentosController_eli' , function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo) {
    $scope.prsCI = sessionService.get('USUARIO');
    $scope.idCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.recuperarDocumentos = function () {
        var lista = $.listar("LISTAR",$scope.idCiudadano,"","","");
        var documentos = {}
        documentos = eval(lista);
        $scope.documentos = documentos;
    };
    //Iniciando js    
    $scope.$on('api:ready',function(){
        //$scope.recuperarDocumentos();
    });
    $scope.inicioDocumentos = function () {
        alert("inicio docs ..");
        //$scope.recuperarDocumentos();
    }; 

    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
        try{ 
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        catch (e) { console.log("error", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
