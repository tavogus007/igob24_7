app.controller('personasController', function ($scope, $route,$rootScope, CONFIG,sessionService,ngTableParams,$filter,sweet) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var size = 10;
    $scope.startDateOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
    };
    //listar personas
    $scope.getPersonas = function(){
        try {
            $.blockUI();
            var personas = new datosAdm();
            personas.lstPersonas(function(resultado){
                resultadoApi = JSON.parse(resultado);
                var response = resultadoApi.success;
                $scope.obtPersonas = response;
                var data = response;   
                $scope.tablaPersonas = new ngTableParams({
                    page: 1,          
                    count: 5,
                    filter: {},
                    sorting: {}      
                }, {
                    total: $scope.obtPersonas.length,
                    getData: function($defer, params) {
                        var filteredData = params.filter() ?
                        $filter('filter')($scope.obtPersonas, params.filter()) :
                        $scope.obtPersonas;              
                        var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        $scope.obtPersonas;
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
    //estados
    $scope.getEstados = function(){
        try {
                $.blockUI();
                var personas = new datosAdm();
                personas.stdcivilst(function(resultado){
                    resultadoApi = JSON.parse(resultado);
                    var response = resultadoApi.success;
                    $scope.estados = response; 
                });
            } catch (error){
                console.log("Error : ", error);
                $.unblockUI(); 
            }
    }
    $scope.adicionarPersona = function(datosPersona){
            try {
                $.blockUI();
                var fechaNacimiento=datosPersona.prsfecnmt.getFullYear() + "-" + datosPersona.prsfecnmt.getMonth() + "-" + datosPersona.prsfecnmt.getDate() + " " + datosPersona.prsfecnmt.getHours() + ":" + datosPersona.prsfecnmt.getMinutes() + ":" + datosPersona.prsfecnmt.getSeconds();
                var personas = new datosAdm();
                personas.nombres = datosPersona.prsNom; 
                personas.id_estado_civil = datosPersona.prsStcvlId;
                personas.ci = datosPersona.prsCi;
                personas.paterno = datosPersona.prsPat;
                personas.materno = datosPersona.prsMat;
                personas.direccion = datosPersona.prsDireccion;
                personas.telefono = datosPersona.prsTelefono;
                personas.sexo = datosPersona.prsSexo;
                personas.fec_nacimiento = fechaNacimiento;

                 if(datosPersona.prsDireccion2)
                {   personas.direccion2 = datosPersona.prsDireccion2;  }
                else{   
                     personas.direccion2 = '';    }

                if(datosPersona.prsTelefono2)
                {   personas.telefono2 = datosPersona.prsTelefono2;   }
                else{   
                   personas.telefono2 = '';    }

                if(datosPersona.prsCelular)
                {   personas.celular = datosPersona.prsCelular;   }
                else{   
                    personas.celular = '';    }

                if(datosPersona.prsEmpTel)
                {   personas.empresa_telefonica = datosPersona.prsEmpTel;   }
                else{   
                    personas.empresa_telefonica = '';    }

                if(datosPersona.prsCorreo)
                {   personas.correo = datosPersona.prsCorreo;   }
                else{   
                   personas.correo = '';    }
                personas.id_archivo_cv = '1';
                personas.registrado = $scope.obtenerFecha();
                personas.modificado = $scope.obtenerFecha();
                personas.usr_id = sessionService.get('IDUSUARIO');
                personas.estado = 'A';
                personas.addPersona(function(resultado){
                    $scope.getEstados();
                    $.unblockUI(); 
                    sweet.show('', 'Registro insertado', 'success');
                   // $route.reload();
                    $scope.getPersonas();
                });
            } catch (error){
                console.log("Error : ", error);
                sweet.show('', 'Registro no insertado', 'error');
                $.unblockUI(); 
            }
    };

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
    $scope.modificarPersona = function(prsId,datosPersona){
        try {
            $.blockUI();
            if(datosPersona.prsfecnmt.getFullYear)
            {
                var fechaNacimiento=datosPersona.prsfecnmt.getFullYear() + "-" + (datosPersona.prsfecnmt.getMonth()+1) + "-" + datosPersona.prsfecnmt.getDate() + " " + datosPersona.prsfecnmt.getHours() + ":" + datosPersona.prsfecnmt.getMinutes() + ":" + datosPersona.prsfecnmt.getSeconds();
            }
            else{
                var fechaNacimiento=datosPersona.prsfecnmt;
            }
            var personas = new datosAdm();
            personas.id_estado_civil = datosPersona.prsStcvlId;
            personas.ci = datosPersona.prsCi;
            personas.nombres = datosPersona.prsNom;
            personas.paterno = datosPersona.prsPat;
            personas.materno = datosPersona.prsMat;
            personas.direccion = datosPersona.prsDireccion;
            personas.direccion2 = datosPersona.prsDireccion2;
            personas.telefono = datosPersona.prsTelefono;
            personas.telefono2 = datosPersona.prsTelefono2;
            personas.celular = datosPersona.prsCelular;
            personas.empresa_telefonica = datosPersona.prsEmpTel;
            personas.correo = datosPersona.prsCorreo;
            personas.sexo = datosPersona.prsSexo;
            personas.fec_nacimiento = fechaNacimiento;
            fechaServ = $scope.obtenerFecha();
            personas.modificado = fechaServ;
            personas.usr_id = sessionService.get('IDUSUARIO');
            personas.id = prsId;
            personas.uptPersona(function(resultado){
                resultadoApi = JSON.parse(resultado);
                var response = resultadoApi.success;
                $scope.obtPersonas = response;
                $scope.getEstados();
                sweet.show('', 'Registro modificado', 'success');
                $scope.getPersonas();
                $.unblockUI(); 
            });
        } catch (error){
            console.log("Error : ", error);
            $.unblockUI(); 
        } 
    };
    $scope.eliminarPersona = function(prsId){
        try {
            $.blockUI(); 
            var persona = new datosAdm();
            persona.modificado = $scope.obtenerFecha();
            persona.estado = 'B';
            persona.usr_id = sessionService.get('IDUSUARIO');
            persona.id = prsId;
            persona.delPersona(function(resultado){
                resultadoApi = JSON.parse(resultado);
                $scope.getEstados();
                $.unblockUI(); 
                sweet.show('', 'Registro eliminado', 'success');
                //$route.reload(); 
                $scope.getPersonas();
                $scope.$apply();
            });
            $.unblockUI(); 
        } catch (error){
            sweet.show('', 'Registro no eliminado', 'error');
            console.log("Error : ", error);
            $.unblockUI(); 
        }
    }; 
    $scope.modificarPersonaCargar = function(persona){
        $scope.desabilitado=false;
        $scope.datosPersona = persona;
        $scope.boton="upd";
        $scope.titulo="Modificar Personas";
    };
    $scope.eliminarPersonaCargar = function(persona){
        $scope.desabilitado=true;
        $scope.datosPersona = persona;
        $scope.boton="del";
        $scope.titulo="Eliminar Personas";
    };
    $scope.limpiar = function(){
        $scope.datosPersona='';
        $scope.desabilitado=false;
        $scope.boton="new";
        $scope.titulo="Registro de Personas";
    };
    //iniciando el controlador
    $scope.$on('api:ready',function(){
        $scope.getPersonas();
        $scope.getEstados();
    });
    $scope.inicioPersonas = function () {
        $scope.getPersonas();
        $scope.getEstados();
    };    
    
});
