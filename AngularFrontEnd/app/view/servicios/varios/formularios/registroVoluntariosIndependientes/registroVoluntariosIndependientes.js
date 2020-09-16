function registroVoluntariosIndependientesController($scope,$q,$timeout,CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route,sweet,$http,FileUploader,$sce,fileUpload,filterFilter,$routeParams, $location, Data,$q){
        console.log('ANIMALISTA INDEPENDIENTE');
        var ciresp = sessionService.get('CICIUDADANO');
        $scope.datos = {};
        $scope.datos_responsable = {}; 
        /////////////////////////////////
        $scope.buscarRep = function(){
            try{
                var buscarRepresentante = new rcNatural();
                buscarRepresentante.tipo_persona = "NATURAL";
                buscarRepresentante.ci = ciresp;
                buscarRepresentante.buscarPersona(function(res){ 
                var x = JSON.parse(res);
                    console.log("-----xxx",x);
                    console.log('$scope.datos.opr_ci',x[0].dtspsl_ci);
                    //$scope.datos = [];
                    $scope.datos_responsable.ci = x[0].dtspsl_ci;
                    $scope.datos_responsable.expedido = x[0].dtspsl_expedido;
                    $scope.datos_responsable.paterno = x[0].dtspsl_paterno;
                    $scope.datos_responsable.materno = x[0].dtspsl_materno;
                    $scope.datos_responsable.nombre = x[0].dtspsl_nombres;
        
                });
            }catch(e){
            };
        
        };
        /////////////////////////////////
        $scope.inicioServicios = function () {
            $scope.buscarRep();

        }

}