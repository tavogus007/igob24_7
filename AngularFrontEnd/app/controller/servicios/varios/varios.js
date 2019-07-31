app.controller('variosController' , function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, sweet,registroLog) {

    $scope.$on('api:ready',function(){
        $scope.cargarDatos();
    });

    $scope.inicioVarios = function () {
        $scope.cargarDatos();
    };

    $scope.cargarDatos = function () {
          var URLsearch = window.location.href;
          var aurl  = URLsearch.split('url=');
          var miurl = aurl[1];
          miurl = miurl.replace(/'/g, "");
          $scope.templateVarios = '../../../' + miurl;
    };
});
