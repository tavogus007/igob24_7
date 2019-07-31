/****************************/
app.controller('accesosControler',function ($scope,$rootScope,$route,$window,ngTableParams,$filter,CONFIG,sessionService,sweet ) { 
    var strfecha= new Date();
    var strfechactual=strfecha.getFullYear() + "-" + strfecha.getMonth() + "-" + strfecha.getDate() + " " + strfecha.getHours() + ":" + strfecha.getMinutes() + ":" + strfecha.getSeconds(); 
    var introlId = "";
    var respuestaSuccess = "TRUE";
    /****************Primera   grilla**************************/
   
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
            });
            $.unblockUI();
        } catch (error){
            console.log("Error : ", error);
            $.unblockUI(); 
            alert("error al cargar"); 
        }
    };
       
    /****************Primera   grilla**************************/
    $scope.getOpcioneslibres = function(introlId){
        try {
            $.blockUI();
            var rolesAcceso = new datosAdm();
            rolesAcceso.usrid = introlId;
            rolesAcceso.opcioneslibres(function(resultado){
                resultadoApi = JSON.parse(resultado);
                var response = resultadoApi.success;
                $scope.Opciones = response; 
            });
            $.unblockUI(); 
        } catch (error){
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    };

    /****************Segunda   grilla**************************/
    $scope.getAccesosroles = function(introlId){
        try {
            $.blockUI();
            var rolesAcceso = new datosAdm();
            rolesAcceso.idrl = introlId;
            rolesAcceso.accesosroles(function(resultado){
                resultadoApi = JSON.parse(resultado);
                var response = resultadoApi.success;
                $scope.obtAccesosRoles=response;
            });
            $.unblockUI();
        } catch (error){
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    };
    $scope.getAccesos = function (id) {
        introlId= id; 
        $scope.getOpcioneslibres(introlId);
        $scope.getAccesosroles(introlId);
        $scope.checkboxes = { 'checked': false, items: {} }; 
        $scope.checkboxes2 = { 'checked': false, items: {} };
    };  
    $scope.adicionar = function(){
        $.blockUI();
        $scope.obtOpciones=$rootScope;
        angular.forEach($scope.Opciones,function(celda, fila){
            var opc_Id=celda['opcId'];
            var rol = introlId;
            var fecha= new Date();
            var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
            var accregistrado =  $scope.obtenerFecha();
            var accmodificado =  $scope.obtenerFecha();
            var accusrId = sessionService.get('IDUSUARIO');
            var accEstado = 'A';
            if($scope.checkboxes.items[opc_Id])
            {
                try {
                    $.blockUI();
                    var accesos = new datosAdm();
                    accesos.opc_id = opc_Id; 
                    accesos.rls_id = introlId; 
                    accesos.registrado = accregistrado; 
                    accesos.modificado = accmodificado; 
                    accesos.usr_id = sessionService.get('IDUSUARIO'); 
                    accesos.estado = accEstado;
                    accesos.accesoAdicionar(function(resultado){
                        resultadoApi = JSON.parse(resultado);
                        var response = resultadoApi.success;
                        $scope.getOpcioneslibres(introlId);
                        $scope.getAccesosroles(introlId);
                        sweet.show('', 'Asignacion exitosa', 'success');
                    });
                    $.unblockUI(); 
                } catch (error){
                    console.log("Error : ", error);
                    $.unblockUI(); 
                    sweet.show('', 'Falla asignacion', 'error');
                }
            } 
        });
        $.unblockUI(); 
    }
    $scope.retirar = function(){
        angular.forEach($scope.obtAccesosRoles,function(celda, fila){ 
        var accId=celda['accid'];
        if($scope.checkboxes2.items[accId])
            {
                try {
                    $.blockUI();
                    var accesos = new datosAdm();
                    accesos.estado = 'B';
                    accesos.id = accId;
                    accesos.accesoRetirar(function(resultado){
                        resultadoApi = JSON.parse(resultado);
                        var response = resultadoApi.success;
                        $scope.getOpcioneslibres(introlId);
                        $scope.getAccesosroles(introlId);
                        sweet.show('', 'retiro exitoso', 'success');
                    });
                    $.unblockUI(); 
                } catch (error){
                    console.log("Error : ", error);
                    $.unblockUI(); 
                    sweet.show('', 'Falla asignacion', 'error');
                }
            } 
        })
    };
    $scope.$on('api:ready',function(){            
        $scope.getRoles();
        $scope.getAccesos();

    });
    $scope.inicioAccesos = function () {
        $scope.getRoles();
        $scope.getAccesos();
    };      
});