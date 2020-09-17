function registroVoluntariosIndependientesController($scope,$q,$timeout,CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route,sweet,$http,FileUploader,$sce,fileUpload,filterFilter,$routeParams, $location, Data,$q){
        var ciresp = sessionService.get('CICIUDADANO');
        $scope.datos = {};
        $scope.unido = [];
        $scope.datos_responsable = {};

        /////////////////////////////////
        $scope.buscarRep = function(){
            try{
                var buscarRepresentante = new rcNatural();
                buscarRepresentante.tipo_persona = "NATURAL";
                buscarRepresentante.ci = ciresp;
                buscarRepresentante.buscarPersona(function(res){ 
                var x = JSON.parse(res);
                    $scope.datos_responsable.ci = x[0].dtspsl_ci;
                    $scope.datos_responsable.expedido = x[0].dtspsl_expedido;
                    $scope.datos_responsable.paterno = x[0].dtspsl_paterno;
                    $scope.datos_responsable.materno = x[0].dtspsl_materno;
                    $scope.datos_responsable.nombre = x[0].dtspsl_nombres;
                    $scope.datos_responsable.apcasada = x[0].dtspsl_tercer_apellido;
                    $scope.datos_responsable.movil = x[0].dtspsl_movil;
                    $scope.datos_responsable.correo = x[0].dtspsl_correo;
                    $scope.datos_responsable.zona = x[0].dtspsl_zona_desc;
                    $scope.datos_responsable.tipoVia = x[0].dtspsl_tipo_via;
                    $scope.datos_responsable.numCasa = x[0].dtspsl_numero_casa;
                    $scope.datos_responsable.nomVia = x[0].dtspsl_nombre_via;
        
                });
            }catch(e){
            };
        
        };
        $scope.docdinamicos = function(data){

        }
        $scope.sumar_moviles = function(){
            if($scope.datos.caniles_moviles == "" || $scope.datos.caniles_moviles == undefined){
                $scope.datos.caniles_moviles = 0;
            }else if(($scope.datos.gatiles_moviles == "" || $scope.datos.gatiles_moviles == undefined)){
                $scope.datos.gatiles_moviles = 0;
            }
            $scope.datos.total_moviles = $scope.datos.caniles_moviles +  $scope.datos.gatiles_moviles;
        }
        $scope.sumar_capacidades = function(){
            if($scope.datos.capacidad_caniles == "" || $scope.datos.capacidad_caniles == undefined){
                $scope.datos.capacidad_caniles = 0;
            }else if(($scope.datos.capacidad_gatiles == "" || $scope.datos.capacidad_gatiles == undefined)){
                $scope.datos.capacidad_gatiles = 0;
            }
            $scope.datos.total_capacidad = $scope.datos.capacidad_caniles +  $scope.datos.capacidad_gatiles;
        }
        $scope.validar = function(){
            $scope.registrar();
        }
        $scope.registrar = function(){
            var datosMascota = new reglasnegocioM();
            $scope.unido.push("datos_voluntario",$scope.datos);
            $scope.unido.push("datos_personales",$scope.datos_responsable);
            datosMascota.identificador = 'CASA_MASCOTA-1';
            var x_parametro = '{"data":'+JSON.stringify(JSON.stringify($scope.unido))+'}';
            datosMascota.parametros = x_parametro;
            datosMascota.llamarregla(function (results) {
                console.log('RESULTADO',results);
              $.unblockUI();

            });
        }

        /////////////////////////////////
        $scope.inicioServicios = function () {
            $scope.buscarRep();
            $scope.datos.total_capacidad = 0;
            $scope.datos.total_moviles = 0;
        }

}