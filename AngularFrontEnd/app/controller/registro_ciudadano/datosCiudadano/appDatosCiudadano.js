app.controller('datosCiudadanoController', function ($scope, $route,$rootScope,$location, CONFIG,sessionService,ngTableParams,$filter, $modal, sweet) {
    var aRegistro = { "cedula": "","complemento": "","celular":"","correo":"","direccion":"","estado_civil":"","fecha_nacimiento":"","materno":"","nombre":"","ocupacion":"",
     "paterno":"","sexo":"","telefono":"","cedula2": "","complemento2": "","repLegal": "","nroDocumento": "","nroNotaria": "",
                    "nit": "","razonSocial": "","tipoP": ""};  
    var aEstadoC = { "idEst": "","estado_civil":""};               
    var idEst = ""; 
    var tipoPersona = "";
    $rootScope.vid = sessionService.get('IDCIUDADANO');
    $scope.prsCI = sessionService.get('USUARIO');
    $scope.idCiudadano = sessionService.get('IDCIUDADANO');
    $scope.nombreCiudadano  =   sessionService.get('US_NOMBRE');
    var fecha   = new Date();
    var mes = fecha.getMonth()+1;
    if(mes.toString().length == 1)
        mes = '0' + mes;
    var dia = fecha.getDate();
    if(dia.toString().length == 1)
        dia = '0' + dia;
    var sFechActual = fecha.getFullYear() + "-" + mes + "-" + dia + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var sFech = fecha.getFullYear() + "-" + mes + "-" + dia;
    $scope.actual = sFech;
    $scope.nivelusr = null;
    var idUsuario = "4";
    /*****************************/
    var idCiu = $rootScope.vid
    var existeidArchivo = "";
    var nombreimagen = "";
    var idArchivo = "";

    $scope.recuperarDatosRegistro = function(){

            var sIdRegistro = sessionService.get('IDCIUDADANO');

            var datosCiudadano = new rcNatural();
            datosCiudadano.oid = sIdRegistro;

            datosCiudadano.datosCiudadanoNatural(function(resultado){ 
                response = JSON.parse(resultado);
                sessionService.set('SERVICIOS', response[0].dtspsl_acepta_servicios);
                /*if (sessionService.get('SERVICIOS')=='SI') {
                    sessionService.set('US_IDROL', "5");
                    $rootScope.stiporol = sessionService.get('US_IDROL');
                } else {
                    sessionService.set('US_IDROL', "4");
                    $rootScope.stiporol = sessionService.get('US_IDROL');
                }*/

                // var UTCstring = (new Date()).toUTCString();

                //var myDate = new Date(UTCstring *1000);
               
                //document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());

                $scope.vercorreo = "noexiste";
                if (response[0].dtspsl_correo == "") {
                    $scope.vercorreo = null;
                }else{
                    $scope.vercorreo = "noexiste"; }


                if (response[0].dtspsl_file_factura_luz){
                if (response[0].dtspsl_file_factura_luz == "") {
                    $scope.facturas = null;
                }else{$scope.facturas = "noexiste";}}


                if (response[0].dtspsl_file_fotocopia_ci){
                    if (response[0].dtspsl_file_fotocopia_ci == "") {
                        $scope.cedulaid = null;
                    }else{$scope.cedulaid = "noexiste";}
                }

                if (response[0].dtspsl_movil){
                if (response[0].dtspsl_movil == "") {
                    $scope.celularid = null;
                }else{$scope.celularid = "mostrar";}}


                if (response[0].dtspsl_activaciond == 'NO'){
                    $scope.nivelusr = null;
                }else{
                    $scope.nivelusr = "mostrar";
                }

                if (response[0].dtspsl_valid){
                if (response[0].dtspsl_valid == "") {
                    $scope.validacion1 = null;
                }else{$scope.validacion1 = "noexiste";}}

                if (response[0].dtspsl_valid2){
                if (response[0].dtspsl_valid2 == "") {
                    $scope.validacion2 = null;
                }else{$scope.validacion2 = "noexiste";}}
                
                //$scope.validacion3="noexiste";
                if (response[0].dtspsl_fec_vencimiento && response[0].dtspsl_valid && response[0].dtspsl_file_fotocopia_ci){
                    var f1 = new Date(response[0].dtspsl_fec_vencimiento);
                    var f2 = new Date();
                    if (f1>=f2) {
                        $scope.validacion3 = "noexiste";
                    } else {
                        $scope.validacion3 = null;
                    }
                }

                //validar segun fecha actual
                if (response[0].dtspsl_fec_vencimiento){
                if (response[0].dtspsl_fec_vencimiento == "") {
                    $scope.vencimiento = null;
                }else{$scope.vencimiento = "noexiste";}}

                var results = response;
                if(results.length > 0){
                    $.unblockUI();
                    tipoPersona = results[0].dtspsl_tipo_persona;
                    $scope.imagenPortada    =   "";
                    //$scope.imagenPortada    =   results[0].dtspsl_URL;   //// Imagen de presentacion
                    if(results[0].dtspsl_URL) {
                        $scope.imagenPortada = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') +"/" + results[0].dtspsl_URL + "?app_name=todoangular";   
                        if(typeof($scope.imagenPortada) == 'undefined'){
                            $scope.imagenPortada    =   "";   
                        }   
                    } else {
                        if(results[0].dtspsl_sexo == 'M') {
                            aRegistro.sexo = 'MASCULINO';
                            if($scope.imagenPortada.trim() == ""){
                                $scope.imagenPortada = "../../libs/img/anonimo_user_masculino.png";
                            }
                        } else {
                            aRegistro.sexo = 'FEMENINO';
                            if($scope.imagenPortada.trim() == ""){
                                $scope.imagenPortada = "../../libs/img/anonimo_user_femenino.png";
                            }                            
                        }                     
                    }
                    
                    if (tipoPersona == 'NATURAL') {
                        $scope.datospersonaNatural = null;
                        $scope.datospersonaJuridica = "ocultar";
                        aRegistro.nombre = results[0].dtspsl_nombres;
                        aRegistro.paterno = results[0].dtspsl_paterno;
                        aRegistro.materno = results[0].dtspsl_materno;
                        aRegistro.cedula = results[0].dtspsl_ci;

                        if(results[0].dtspsl_sexo == 'M') {
                            aRegistro.sexo = 'MASCULINO';
                            if($scope.imagenPortada.trim() == ""){
                                $scope.imagenPortada = "../../libs/img/anonimo_user_masculino.png";
                            }
                        } else {
                            aRegistro.sexo = 'FEMENINO';
                            if($scope.imagenPortada.trim() == ""){
                                $scope.imagenPortada = "../../libs/img/anonimo_user_femenino.png";
                            }                            
                        }

                        aRegistro.estado_civil = results[0].dtspsl_id_estado_civil;
                        aRegistro.estado_civil_total = "";
                        if (results[0].dtspsl_id_estado_civil == "S")
                            aRegistro.estado_civil_total = "SOLTERO/A";
                        if (results[0].dtspsl_id_estado_civil == "C")
                            aRegistro.estado_civil_total = "CASADO/A";
                        if (results[0].dtspsl_id_estado_civil == "D")
                            aRegistro.estado_civil_total = "DIVORCIADO/A";
                        if (results[0].dtspsl_id_estado_civil == "V")
                            aRegistro.estado_civil_total = "VIUDO/A";
                        if (results[0].dtspsl_id_estado_civil == "PJ")
                            aRegistro.estado_civil_total = "PRS. JURIDICA";
                        //aRegistro.fecha_nacimiento = results[0].dtspsl_fec_nacimiento;
                        //"dtspsl_fec_nacimiento": "1993-02-01";

                        if (results[0].dtspsl_fec_nacimiento) {
                            aRegistro.fecha_nacimiento = results[0].dtspsl_fec_nacimiento;
                        }else {
                            aRegistro.fecha_nacimiento = "__/__/____";
                        }
                        
                        aRegistro.ocupacion = results[0].dtspsl_ocupacion;
                        aRegistro.direccion = results[0].dtspsl_direccion;
                        aRegistro.correo = results[0].dtspsl_correo;
                        aRegistro.telefono = results[0].dtspsl_telefono;
                        aRegistro.celular = results[0].dtspsl_movil;
                        idEst =  aRegistro.estado_civil;
                    } 
                    else
                    {   
                        $scope.datospersonaJuridica = null;
                        $scope.datospersonaNatural = "ocultar";
                        aRegistro.nombre = results[0].dtspsl_nombres;
                        aRegistro.paterno = results[0].dtspsl_paterno;
                        aRegistro.materno = results[0].dtspsl_materno;

                        aRegistro.cedula = results[0].dtspsl_ci;

                        aRegistro.repLegal = results[0].dtspsl_poder_replegal;
                        aRegistro.nroNotaria = results[0].dtspsl_nro_notaria;
                        aRegistro.nroDocumento = results[0].dtspsl_nro_documento;

                        //DATOS INICIALES REGISTRO CIUDADANO
                        aRegistro.razonSocial = results[0].dtspsl_razon_social;
                        aRegistro.telefono = results[0].dtspsl_telefono;
                        aRegistro.celular = results[0].dtspsl_movil;
                        aRegistro.correo = results[0].dtspsl_correo;                        
                        aRegistro.nit = results[0].dtspsl_nit;                        
                        aRegistro.direccion = results[0].dtspsl_direccion;
                        aRegistro.nrocasa = results[0].dtspsl_numero_casa;
                        aRegistro.nrooficina = results[0].dtspsl_oficina;
                        //DATOS REPRESENTANTE
                        //dtspsl_nro_notaria
                        //dtspsl_poder_replegal
                        //IMAGEN
                        $scope.imagenPortada = "../../libs/img/anonimo_user_masculino.png";                        
                    }                
                }else{
                    $.unblockUI();
                    $scope.msg = "Error !!";
                } 
            });
            /*
                //validar segun fecha actual
                if (response.record[0].dtspsl_fec_vencimiento){
                if (response.record[0].dtspsl_fec_vencimiento=="") {
                    $scope.vencimiento=null;
                }else{$scope.vencimiento="noexiste";}}

                var results=response.record;
                if(results.length > 0){
                    $.unblockUI();
                    tipoPersona = results[0].dtspsl_tipo_persona;
                    $scope.imagenPortada    =   "";
                    //$scope.imagenPortada    =   results[0].dtspsl_URL;   //// Imagen de presentacion
                    if(results[0].dtspsl_URL) {
                        $scope.imagenPortada = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') +"/" + results[0].dtspsl_URL + "?app_name=todoangular";   
                        if(typeof($scope.imagenPortada) == 'undefined'){
                            $scope.imagenPortada    =   "";   
                        }
                    } else {
                        if(results[0].dtspsl_sexo=='M') {
                            aRegistro.sexo = 'MASCULINO';
                            if($scope.imagenPortada.trim() == ""){
                                $scope.imagenPortada = "../../libs/img/anonimo_user_masculino.png";
                            }
                        } else {
                            aRegistro.sexo = 'FEMENINO';
                            if($scope.imagenPortada.trim() == ""){
                                $scope.imagenPortada = "../../libs/img/anonimo_user_femenino.png";
                            }                            
                        }                     
                    }
                    
                    if (tipoPersona == 'NATURAL') {
                        $scope.datospersonaNatural = null;
                        $scope.datospersonaJuridica = "ocultar";
                        aRegistro.nombre = results[0].dtspsl_nombres;
                        aRegistro.paterno = results[0].dtspsl_paterno;
                        aRegistro.materno = results[0].dtspsl_materno;
                        aRegistro.cedula = results[0].dtspsl_ci;

                        if(results[0].dtspsl_sexo=='M') {
                            aRegistro.sexo = 'MASCULINO';
                            if($scope.imagenPortada.trim() == ""){
                                $scope.imagenPortada = "../../libs/img/anonimo_user_masculino.png";
                            }
                        } else {
                            aRegistro.sexo = 'FEMENINO';
                            if($scope.imagenPortada.trim() == ""){
                                $scope.imagenPortada = "../../libs/img/anonimo_user_femenino.png";
                            }                            
                        }

                        aRegistro.estado_civil = results[0].dtspsl_id_estado_civil;
                        aRegistro.estado_civil_total = "";
                        if (results[0].dtspsl_id_estado_civil == "S")
                            aRegistro.estado_civil_total = "SOLTERO/A";
                        if (results[0].dtspsl_id_estado_civil == "C")
                            aRegistro.estado_civil_total = "CASADO/A";
                        if (results[0].dtspsl_id_estado_civil == "D")
                            aRegistro.estado_civil_total = "DIVORCIADO/A";
                        if (results[0].dtspsl_id_estado_civil == "V")
                            aRegistro.estado_civil_total = "VIUDO/A";
                        if (results[0].dtspsl_id_estado_civil == "PJ")
                            aRegistro.estado_civil_total = "PRS. JURIDICA";
                        //aRegistro.fecha_nacimiento = results[0].dtspsl_fec_nacimiento;
                        $scope.fechadenac=results[0].dtspsl_fec_nacimiento.split("T");
                        aRegistro.fecha_nacimiento =$scope.fechadenac[0];
                        aRegistro.ocupacion = results[0].dtspsl_ocupacion;
                        aRegistro.direccion = results[0].dtspsl_direccion;
                        aRegistro.correo = results[0].dtspsl_correo;
                        aRegistro.telefono = results[0].dtspsl_telefono;
                        aRegistro.celular = results[0].dtspsl_movil;
                        idEst =  aRegistro.estado_civil;
                    } 
                    else
                    {   
                        $scope.datospersonaJuridica = null;
                        $scope.datospersonaNatural = "ocultar";
                        aRegistro.nombre = results[0].dtspsl_nombres;
                        aRegistro.paterno = results[0].dtspsl_paterno;
                        aRegistro.materno = results[0].dtspsl_materno;

                        aRegistro.cedula = results[0].dtspsl_ci;

                        aRegistro.repLegal = results[0].dtspsl_poder_replegal;
                        aRegistro.nroNotaria = results[0].dtspsl_nro_notaria;
                        aRegistro.nroDocumento = results[0].dtspsl_nro_documento;

                        //DATOS INICIALES REGISTRO CIUDADANO
                        aRegistro.razonSocial   = results[0].dtspsl_razon_social;
                        aRegistro.telefono      = results[0].dtspsl_telefono;
                        aRegistro.celular       = results[0].dtspsl_movil;
                        aRegistro.correo        = results[0].dtspsl_correo;                        
                        aRegistro.nit           = results[0].dtspsl_nit;                        
                        aRegistro.direccion     = results[0].dtspsl_direccion;
                        aRegistro.nrocasa       = results[0].dtspsl_numero_casa;
                        aRegistro.nrooficina    = results[0].dtspsl_oficina;
                        //DATOS REPRESENTANTE
                        //dtspsl_nro_notaria
                        //dtspsl_poder_replegal
                        //IMAGEN
                        $scope.imagenPortada = "../../libs/img/anonimo_user_masculino.png";                        
                    }                
                }else{
                    $.unblockUI();
                    $scope.msg = "Error !!";
                }             
            }).error(function(results){
                    $.unblockUI();
            });            
       // }*/
    }
    $scope.recuperarDatosDocumentos = function(){         
        var lista = "";
        var documentos = {}
        if($.listar){
            lista = $.listar("LISTAR",$scope.idCiudadano,"","","");
        }
        //var lista = $.listar("LISTAR",$scope.idCiudadano,"","","");        
        //var documentos = {}
        documentos = eval(lista);
        $scope.documentos = documentos;
    };    
    $scope.refrescar =function () {
        $scope.recuperarDatosDocumentos();
    }
    $scope.startDateOpenInicio = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateInicio = true;
    }; 
    $scope.startDateOpenFin = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateFin = true;
    };     
    
    $scope.registro = aRegistro;
    $scope.registro2 = aEstadoC;    
    $scope.aLogPlataforma = ""; 

    /************************* datos Reporte Plaformista ***********************************/
    $scope.datosReportePlaformista = function () {
        var datosReporteP = new reglasnegocio();
        datosReporteP.identificador = "RCCIUDADANO_52";
        datosReporteP.parametros = '{"susuarioid":"' + idUsuario + '","susciudadanoid":"' + $rootScope.vid + '"}';
        datosReporteP.llamarregla(function(results){
            results = JSON.parse(results);
            if(results.length > 0){
                $scope.aLogPlataforma = results;
            }             
        });                  
    }; 
    /*****************************************************************************************/
     $scope.modificarDatosRegistro = function(vid){
        $rootScope.habilitartab = 'no';     
       $rootScope.vid = sessionService.get('IDCIUDADANO');
       $location.path("registro_ciudadano|modificarRegistro"); 
       $scope.recuperarDatosDocumentos();       
    }  
    //Eventos del ciudadano     
    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.calendarDay = new Date();

    function showModal(action, event) {
      $modal.open({
        templateUrl: 'modalContent.html',
        controller: function($scope) {
          $scope.action = action;
          $scope.event = event;
        }
      });
    }
   
    $scope.eventEdited = function(event) {
        //showModal('Edited', event);
        //showModal();
    };
    //Traer eventos del ciudadano
    $scope.ciudadanoEventos = {};
    $scope.btnAccion = "";
    $scope.aEventos = {};    
    $scope.events = {};

    /******************************/
    $scope.eventosCiudadano = function(sIdCiudadano){
        var eventosCiu = new reglasnegocio();
        eventosCiu.identificador = "RCCIUDADANO_60";
        eventosCiu.parametros = '{"cev_dtspsl_id":"' + sIdCiudadano + '"}';
        eventosCiu.llamarregla(function(results){
        results = JSON.parse(results);
            if(results.length > 0){
                $scope.aEventos = results;
                $scope.procesarEvento(results);
            }else{
                $scope.aEventos = results;
                $scope.procesarEvento(results);
                $scope.msg = "No existen eventos!!";
            }
        });
    };
    /*******************************/

    //Procesando los datos de los eventos del ciudadano
    $scope.procesarEvento = function(aEvento){
        var sTitulo = "";
        var sFechaInicio = "";
        var sFechaFin = "";
        var sHoraInicio = "";
        var sHoraFin = "";
        var aMievento = [];
        angular.forEach(aEvento, function(value, key) {
            var aEvento = {};
            var sIdEvento = value.cev_id;
            var fecha = new Date();
            var fInicio = new Date(value.cev_fech_inicio + 'T' + value.cev_hora_inicio);
            var fFin = new Date(value.cev_fech_fin + 'T' + value.cev_hora_fin);
            aEvento.idEvento = value.cev_id;
            aEvento.title = value.cev_evento;
            aEvento.type = value.cev_tipo;
            aEvento.startsAt = fInicio;
            aEvento.endsAt = fFin;
            aMievento.push(aEvento);
        });
        $scope.events = aMievento;
    }
    
    //Almacenar eventos del ciudadano
    /********************* registrar Eventos ********************************/
    $scope.registrarEventos = function(datos){
        var sEvento = datos.evento;
        var fFechaInicio = datos.fechaInicio;
        var fFechaFin = datos.fechaFin;
        var sTipo = datos.tipo;
        var sFechaInicio = fFechaInicio.getFullYear() + "-" + (fFechaInicio.getMonth() + 1) + "-" + fFechaInicio.getDate();
        var sHoraInicio = fFechaInicio.getHours() + ":" + fFechaInicio.getMinutes() + ":" + fFechaInicio.getSeconds();
        var sFechaFin = fFechaFin.getFullYear() + "-" + (fFechaFin.getMonth() + 1) + "-" + fFechaFin.getDate();        
        var sHoraFin = fFechaFin.getHours() + ":" + fFechaFin.getMinutes() + ":" + fFechaFin.getSeconds();
        
        var datosEvento = new reglasnegocio();
        datosEvento.identificador = 'RCCIUDADANO_61';
        var idSolicitante = sessionService.get('IDSOLICITANTE');
        datosEvento.parametros = '{"cev_dtspsl_id":"' + idSolicitante + '","cev_id_usuario":"4","cev_evento":"' + sEvento + '","cev_tipo":"' + sTipo + '","cev_fech_inicio":"' + sFechaInicio + '","cev_fech_fin":"' + sFechaFin + '","cev_hora_inicio":"' + sHoraInicio + '","cev_hora_fin":"' + sHoraFin + '"}';
        datosEvento.llamarregla(function(data){
        data = JSON.parse(data);
            $scope.eventosCiudadano(sessionService.get('IDSOLICITANTE'));
            sweet.show('', 'Nuevo evento registrado', 'success');
        }); 
    }
    /***************************************************************************/
    //Editar eventos del ciudadano
    $scope.editarEvento = function(event) {
        //var sTitulo = event.idEvento;
        //var sId = sTitulo.substring(sTitulo.indexOf("id='") + 4, sTitulo.indexOf("'", sTitulo.indexOf("id='") + 4));
        $scope.btnAccion = "ACTUALIZAR";
        $scope.ciudadanoEventos.idEvento = event.idEvento;
        $scope.ciudadanoEventos.evento = event.title;
        $scope.ciudadanoEventos.tipo = event.type;
        $scope.ciudadanoEventos.fechaInicio = event.startsAt;
        $scope.ciudadanoEventos.fechaFin = event.endsAt;
        $('#registroEvento').modal('show');
    };
    
    //Editar eventos del ciudadano
    /*******************************************/
    $scope.actualizarEventos = function(datos) {
        var fFechaInicio = datos.fechaInicio;
        var fFechaFin = datos.fechaFin;
        var fecha = new Date();
        var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();     
        var sFechaInicio = fFechaInicio.getFullYear() + "-" + (fFechaInicio.getMonth() + 1) + "-" + fFechaInicio.getDate();
        var sHoraInicio = fFechaInicio.getHours() + ":" + fFechaInicio.getMinutes() + ":" + fFechaInicio.getSeconds();
        var sFechaFin = fFechaFin.getFullYear() + "-" + (fFechaFin.getMonth() + 1) + "-" + fFechaFin.getDate();        
        var sHoraFin = fFechaFin.getHours() + ":" + fFechaFin.getMinutes() + ":" + fFechaFin.getSeconds();

        var actualizarEv = new reglasnegocio();
        actualizarEv.identificador = 'RCCIUDADANO_62';
        actualizarEv.parametros = '{"cev_evento":"' + datos.evento + '","cev_tipo":"' + datos.tipo + '","cev_fech_inicio":"' + sFechaInicio + '","cev_fech_fin":"' + sFechaFin + '","cev_hora_inicio":"' + sHoraInicio + '","cev_hora_fin":"' + sHoraFin + '"}';
        //servicio insertar usuarios
        actualizarEv.llamarregla(function(data){
        data = JSON.parse(data);
            $scope.eventosCiudadano(sessionService.get('IDSOLICITANTE'));
            sweet.show('', 'Evento modificado', 'success');
        })
    };
    /****************************************/
    
    //Eliminar eventos del ciudadano 
    $scope.eliminarEventosCiudadano = function(data){
        var eliminaEv = new reglasnegocio();
        eliminaEv.identificador = 'RCCIUDADANO_63';
        eliminaEv.parametros = '{"cev_estado":"B"}';
        eliminaEv.llamarregla(function(data){
        //data = JSON.parse(data);
            $scope.eventosCiudadano(sessionService.get('IDSOLICITANTE'));
            sweet.show('', 'Evento eliminado correctamente', 'success');
        });
    }
    /*******************************************/
    //Limpiar datos de evento
    $scope.limpiarEventos = function(){
        $scope.ciudadanoEventos = {};
        $scope.btnAccion = "NUEVO";
    }

    $scope.archivarNotificacion = function(idNotifi){
        var rcNot=new rcNotificaciones();
        rcNot.oid = idNotifi;
        rcNot.archivarNotificacion(function(resultado){ 
            sweet.show('', 'Notificación Archivada', 'success');
            $scope.notificaciones();
        });
    }
    

    $scope.notificaciones = function(){
        var rcNot=new rcNotificaciones();
        rcNot.oid = sessionService.get('IDCIUDADANO');
        rcNot.obtenerNotificaciones(function(resultado){ 
            aNotif =JSON.parse(resultado);
            $scope.myObj = aNotif.success;
        });       
    }


    /***********recuperar  imagen*************/
    $scope.$on('api:ready',function(){
        $scope.datospersonaJuridica  =   "hide";
        $scope.recuperarDatosRegistro();
        $scope.recuperarDatosDocumentos();
        //$scope.datosReportePlaformista();
        //$scope.recuperarNoticias();
        //$scope.ciVerificarArchiv();
        $scope.eventosCiudadano(sessionService.get('IDSOLICITANTE'));
        $scope.notificaciones();

    });   
    $scope.inicioDatosCiudadano = function () {
        $scope.datospersonaJuridica  =   "hide";
        $scope.recuperarDatosRegistro();
        $scope.recuperarDatosDocumentos();
        //$scope.datosReportePlaformista();
        $scope.eventosCiudadano(sessionService.get('IDSOLICITANTE'));
        $scope.notificaciones();
    }; 
    /*$scope.actualizarNoticia = function() {
        $scope.recuperarNoticias();         
    };
    $scope.seleccionarNoticia = function(noticia) {
        $scope.tituloSeleccionado = noticia.cnttitulo;
        $scope.imagenSeleccionada = noticia.cntimagen;
        $scope.resumenSeleccionado = noticia.cntresumen;
        $scope.origenSeleccionado = noticia.cnturl;
    } */    

    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
        try{ 
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        catch (e) { 
        }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});