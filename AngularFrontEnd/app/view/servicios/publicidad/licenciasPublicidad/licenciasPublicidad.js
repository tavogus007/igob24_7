function solicitudBajaController($scope,sessionService, CONFIG,ngTableParams, $filter) {
    $scope.tblLicencias       =   {};
    $scope.licencias          =   [];
    $scope.idpublicidad       =   "";

    $scope.inicio = function(){
        $scope.listarSolicitudes();
    }

    $scope.listarSolicitudes = function(){
        $.blockUI(); 
        try {
            var tipoPersona =  sessionService.get('TIPO_PERSONA'); 
            var documento = "";
            if(tipoPersona == 'JURIDICO'){
                documento = sessionService.get('NITCIUDADANO'); 
                tipoPersona = 'J';
            }else{
                documento = sessionService.get('CICIUDADANO'); 
                tipoPersona = 'N';
            }
            var lstLicencias   =   new lstPublicidadLicencia();
            lstLicencias.claseContribuyente  =   tipoPersona;
            lstLicencias.identificacion       =   documento;
            lstLicencias.buscarLicenciasPublicidad(function(resultado){
                var resultadoApi = JSON.parse(resultado);
                console.log("resultadoApi",resultadoApi);
                if (resultadoApi.success) {
                    console.log("resultadoApi.success.length ",resultadoApi.success.dataSql.length );
                    if(resultadoApi.success.dataSql.length > 0){
                        $scope.licencias = resultadoApi.success.dataSql;
                        console.log("$scope.licencias",$scope.licencias);
                        $scope.tblLicencias.reload();
                    } 
                } else {
                    swal('', "Datos no Encontrados !!!", 'warning');
                }
            });
        } catch (error) {
            console.log(error);
            swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
        }
        $.unblockUI();
    }

    $scope.tblLicencias = new ngTableParams({
        page: 1,
        count: 25,
        filter: {},
        sorting: {
            IdActividad: 'desc'
        }
    }, {
        total: $scope.licencias.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.licencias, params.filter()) :
            $scope.licencias;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.licencias;
            params.total($scope.licencias.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.verLicencia = function(publicidad){
        $scope.idpublicidad = publicidad.idPublicidad;
        window.open(publicidad.licencia , "Licencia Publicidad" , "width=700,height=700,scrollbars=NO")
    }

      
};