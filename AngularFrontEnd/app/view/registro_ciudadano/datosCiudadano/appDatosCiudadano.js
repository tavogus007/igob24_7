function datosCiudadanoController($scope,$q, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, 
    LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, fileUpload1, $timeout, obtFechaCorrecta, obtFechaActual) {
    
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
    $scope.vercondicionesuso    =   "mostrar";

        //////////////////////////////////uploader/////////////////////////////////////
    var uploader = $scope.uploader = new FileUploader({
     url: CONFIG.UPLOAD_URL
    });
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item , options) {
            return this.queue.length < 10;
        }
    });
    // END UPLOAD  
    $scope.uploader = new FileUploader({
        url: CONFIG.UPLOAD_URL+"?desripcion=ciudadano&&idCiudadano="+ idCiu
    });    
    var uploader = $scope.uploader;
    
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item, options) {
            return this.queue.length < 10;
        }
    });
   uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };

    uploader.onAfterAddingFile = function(fileItem) {
        tipoDocumento = fileItem._file.type;
        var nameArray = tipoDocumento.split('/');
        tipoDocumento = nameArray[1];
        //var count = 0;
        var target_img, output;
        if(fileItem._file.size <= 500000){            
            if(tipoDocumento == "png" || tipoDocumento == "jpg" || tipoDocumento == "jpeg" || tipoDocumento == "bmp"|| tipoDocumento == "gif")
            {
                $scope.botonSubirOriginal = null; 
                $scope.botonSubirError = "oculta";
                $scope.imgmenos = 'mostrar';
            }else{
                swal('Advertencia', 'Seleccione un archivo de tipo imagen', 'error');
                $scope.botonSubirError = null; 
                $scope.botonSubirOriginal = "oculta";   
                $.unblockUI();                  
            }
            $scope.subir="ok";
        }else{
            if (fileItem._file.size <= 15000000) {
                if(tipoDocumento == "png" || tipoDocumento == "jpg" || tipoDocumento == "jpeg" || tipoDocumento == "bmp"|| tipoDocumento == "gif")
                {
                    $scope.botonSubirOriginal = null; 
                    $scope.botonSubirError = "oculta";
                    $scope.imgmenos = null;
                    var current_file = fileItem._file;
                    if (current_file.size > 500000) {
                    /////////////////////COMPRESION DE IMAGENES//////////////////////////////
                        var filecompress = compressImage(current_file).then(function(respuesta){
                            $scope.myFile1 = respuesta;
                        });
                    /////////////////////////////////////////////////////
                    }
                }else{
                    swal('Advertencia', 'Seleccione un archivo de tipo imagen', 'error');
                    $scope.botonSubirError = null; 
                    $scope.botonSubirOriginal = "oculta";
                    $.unblockUI();                                       
                }
            }
            else{
                swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                $.unblockUI();                  
            };
            $scope.subir="ok";
        }
    };

    $scope.falla = function()
    {
        swal('', 'Tipo de archivo incorrecto elimine porfavor', 'error');   
        $scope.desabilitado2=true;
    }
    
    //end changes
    //Star image 

    $scope.addImage=function(e,idFoto){
        $.blockUI();  
        setTimeout(function(){  
            $scope.idFoto=idFoto;
            var file = e.target.files[0];
            imageType = /image.*/;
            if (!file.type.match(imageType))
                return;
            var reader = new FileReader();
            reader.onload = fileOnload;
            reader.readAsDataURL(file);
            $scope.registroCiudadano1();
            $.unblockUI();
        },1000);
    };


    function fileOnload(e) {
        var result=e.target.result;
        switch($scope.idFoto) {
            case 0:
            $('#imgSalida').attr("src",result);
            var b64_2 = result.split('data:image/jpeg;base64,');
            $scope.labels2 = b64_2[1];
            break;  
            case 1:
            $('#imgSalida1').attr("src",result);
            var b64_1 = result.split('data:image/jpeg;base64,');
            $scope.labelºs1 = b64_1[1];
            break;  
        }
    }

    //////////////////////////////////fin upload//////////////////////////////////////

    ///////////////////////////////Modifica Imagen ///////////////////////////////////
    $scope.registroCiudadano1 = function (response) {
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
        });       
        $.blockUI();
        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        if(tipoPersona == 'NATURAL')
        {
            var file = $scope.myFile1;            
        }
        else
        {
            var file = $scope.myFile2;
        }
        if (file != null)
        {
            var uploadUrl = CONFIG.APIURL+"/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + '/' ;
            var nombreFile = file.name;
            var nameArrayci = nombreFile.split('.');
            var tipo = nameArrayci[1];
            if(tipo == "png" || tipo == "jpg" || tipo == "jpeg" || tipo == "bmp" ){
                var filecompress = compressImage(file).then(function(respuestaci){
                    var imagenFile = respuestaci.name.split('.');
                    var tipoImg = imagenFile[1];
                    nombreFile = 'perfil_'+fechaNueva+'.'+tipoImg;
                    fileUpload1.uploadFileToUrl1(respuestaci, uploadUrl,nombreFile);
                });
            }else{
                if(tipo == "gif"){
                    nombreFile = 'perfil_'+fechaNueva+'.'+tipo;
                    fileUpload1.uploadFileToUrl1(file, uploadUrl,nombreFile);
                }
                else{
                    var cadenaURL = $scope.imagenPortada;   // Recuperar informacion de la Imagen  
                    var nombreFile = $scope.imagenNombre;   // Recuperar nombre de la Imagen  
                }
            }
        }
        else
        {
            var cadenaURL = $scope.imagenPortada;   // Recuperar informacion de la Imagen  
            var nombreFile = $scope.imagenNombre;   // Recuperar nombre de la Imagen  
        }
        
        setTimeout(function(){
            var datosPerfil = new modificaPerfil();
            datosPerfil.URL = nombreFile;
            datosPerfil.oid = oidCiudadano;
            datosPerfil.modificaPerfilImagen(function(resultado){ 
                var resultadoApi = JSON.parse(resultado);
                if( typeof(resultadoApi.success) != 'undefined')
                {
                    var mensajeExito = "Se modifico la imagen correctamente.";  
                    alertify.success(mensajeExito);  

                }
                else
                {
                    var mensajeExito = resultadoApi.error.message;
                    swal('', mensajeExito, 'error');                
                }
                $.unblockUI();                    
            })
        },1000);
    };


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

                if (response[0].dtspsl_fec_vencimiento){
                    var f1 = new Date(response[0].dtspsl_fec_vencimiento);                
                    var fechaserver = new fechaHoraServer(); 
                    fechaserver.fechahora(function(resp){
                        var sfecha = JSON.parse(resp);
                        var fechaS = sfecha.success.fecha.split(" ")[0]; 
                        fechaS = fechaS.split("-")[0] + "/" + fechaS.split("-")[1] + "/" + fechaS.split("-")[2];
                        var f2 = new Date(fechaS);
                        if (f1>=f2) {
                            $scope.validacion3 = "noexiste";
                        } else {
                            $scope.validacion3 = null;
                            $rootScope.validacionDocumentos = 'idtab-docs';
                        }                        
                    });
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
                        }
                        else {
                            aRegistro.fecha_nacimiento = "__/__/____";
                        }
                        aRegistro.fecha_nacimiento = aRegistro.fecha_nacimiento.split('-').reverse().join('/');
                        aRegistro.telefono   = ((typeof(results[0].dtspsl_telefono) == 'undefined' || results[0].dtspsl_telefono == null || results[0].dtspsl_telefono == 'NaN') ? "" : results[0].dtspsl_telefono);
                        aRegistro.celular   = ((typeof(results[0].dtspsl_movil) == 'undefined' || results[0].dtspsl_movil == null || results[0].dtspsl_movil == 'NaN') ? "" : results[0].dtspsl_movil);
                        aRegistro.ocupacion = results[0].dtspsl_ocupacion;
                        aRegistro.direccion = results[0].dtspsl_direccion;
                        aRegistro.correo = results[0].dtspsl_correo;
                        if(aRegistro.telefono == "undefined" || aRegistro.telefono == undefined){
                            aRegistro.telefono = " ";
                        }
                        if(aRegistro.direccion == "undefined" || aRegistro.direccion == undefined){
                            aRegistro.direccion = " ";
                        }
                        if(aRegistro.ocupacion == "undefined" || aRegistro.ocupacion == undefined){
                            aRegistro.ocupacion = " ";
                        }
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
                        aRegistro.telefono   = ((typeof(results[0].dtspsl_telefono) == 'undefined' || results[0].dtspsl_telefono == null || results[0].dtspsl_telefono == 'NaN') ? "" : results[0].dtspsl_telefono);
                        aRegistro.celular   = ((typeof(results[0].dtspsl_movil) == 'undefined' || results[0].dtspsl_movil == null || results[0].dtspsl_movil == 'NaN') ? "" : results[0].dtspsl_movil);
                        aRegistro.razonSocial = results[0].dtspsl_razon_social;
                        aRegistro.correo = results[0].dtspsl_correo;                        
                        aRegistro.nit = results[0].dtspsl_nit;                        
                        aRegistro.direccion = results[0].dtspsl_direccion;
                        aRegistro.nrocasa = results[0].dtspsl_numero_casa;
                        aRegistro.nrooficina = results[0].dtspsl_oficina;
                        if(aRegistro.telefono == "undefined" || aRegistro.telefono == undefined){
                            aRegistro.telefono = " ";
                        }
                        if(aRegistro.direccion == "undefined" || aRegistro.direccion == undefined){
                            aRegistro.direccion = " ";
                        }
                        if(aRegistro.nit == "undefined" || aRegistro.nit == undefined){
                            aRegistro.nit = " ";
                        }
                        aRegistro.azona = results[0].dtspsl_zona_desc;
                         aRegistro.aMacrodistrito = results[0].dtspsl_macrodistrito_desc;
                     
                    }                
                }else{
                    $.unblockUI();
                    $scope.msg = "Error !!";
                } 
            });
    }
    $scope.recuperarDatosDocumentos = function(){         
        var lista = "";
        var documentos = {}
        if($.listar){
            lista = $.listar("LISTAR",$scope.idCiudadano,"","","");
        }
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
            alertify.success('Evento eliminado correctamente');
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
            $scope.notificaciones();
            alertify.success('Notificación Archivada');
        });
    }
    
    //NOTIIFICACIONES LOTUS  - IGOB
    function abrirVentana(url) {
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=400, height=400");
    }
    $scope.notificaciones = function(){
        var rcNot=new rcNotificaciones();
        rcNot.oid = sessionService.get('IDCIUDADANO');
        rcNot.obtenerNotificaciones(function(resultado){
            aNotif = JSON.parse(resultado);
            var notificaciones = aNotif.success.length;
            datoObjectNotiFinal = [];
            var notificaciones = aNotif.success.length;
            datoObjectNotiFinal = [];
            for(i = 0; i < notificaciones; i++){
                if(aNotif.success[i].serdv_descripcion == 'ANTENA CIUDADANO'){      //CASO DE NOTIFICACIONES DE ANTENAS LOTUS a IGOB
                    datoObjectNoti = new Object();
                    var mensaje = aNotif.success[i].obs_tra_observaciones;
                    var res = mensaje.split("&#34");
                    var mensajeIgob = res[0].split("<a href=");
                    $scope.res1 = res[1];
                    datoObjectNoti.frm_tra_id_ciudadano = aNotif.success[i].frm_tra_id_ciudadano;
                    var codigoANTT = (aNotif.success[i].frm_tra_if_codigo).substr(0,2);//RB  GM
                    if(codigoANTT == "RB" || codigoANTT == "GM"){
                        var mensaje = mensajeIgob[0];
                        mensaje  = mensaje.split(":")[0];
                        if( mensaje != "aNotif.success[i].frm_tra_if_codigo" ) {
                            if( mensaje.substr(0,2) == "RG" || mensaje.substr(0,2) == "AN"  ){
                                datoObjectNoti.frm_tra_if_codigo = aNotif.success[i].frm_tra_if_codigo + " - "+ mensaje;
                            }else{
                                datoObjectNoti.frm_tra_if_codigo = aNotif.success[i].frm_tra_if_codigo;
                            }
                        }else{
                            datoObjectNoti.frm_tra_if_codigo = aNotif.success[i].frm_tra_if_codigo;
                        }
                    }else{
                        datoObjectNoti.frm_tra_if_codigo = aNotif.success[i].frm_tra_if_codigo;
                    }
                    datoObjectNoti.obs_tra_actividad = aNotif.success[i].obs_tra_actividad;
                    datoObjectNoti.obs_tra_id = aNotif.success[i].obs_tra_id;
                    datoObjectNoti.obs_tra_leido = aNotif.success[i].obs_tra_leido;
                    datoObjectNoti.obs_tra_observaciones = mensajeIgob[0];
                    datoObjectNoti.obs_tra_registrado = aNotif.success[i].obs_tra_registrado;
                    datoObjectNoti.obs_tra_sistema = aNotif.success[i].obs_tra_sistema;
                    datoObjectNoti.obs_tra_usuario = aNotif.success[i].obs_tra_usuario;
                    datoObjectNoti.serdv_descripcion = aNotif.success[i].serdv_descripcion;
                    datoObjectNoti.mensajeIgob = mensajeIgob[0];

                    if ($scope.res1 == undefined){
                        datoObjectNoti.obj_url_ra = "noRA";
                    }else{
                        if(res.length > 3){
                            datoObjectNoti.obj_url_inspeccion = res[3];
                            datoObjectNoti.obj_url_ra = $scope.res1;
                        }else{
                            datoObjectNoti.obj_url_inspeccion = "noINSPECCION";
                            datoObjectNoti.obj_url_ra = $scope.res1;

                        }
                    }
                    datoObjectNotiFinal[i] = datoObjectNoti;
                    $scope.myObj = datoObjectNotiFinal; //aNotif.success;
                }else if((aNotif.success[i].obs_tra_actividad == 'ATM RECAUDACIONES') ){     //CASO DE NOTIFICACIONES DE ANTENAS LOTUS a IGOB
                    datoObjectNoti = new Object();
                    var mensaje = aNotif.success[i].obs_tra_observaciones;
                    var res = mensaje.split("&#34");
                    var mensajeIgob = res[0].split("&#34");
                    $scope.res1 = res[1];
                    
                    datoObjectNoti.frm_tra_id_ciudadano = aNotif.success[i].frm_tra_id_ciudadano;
                    var codigoANTT = (aNotif.success[i].frm_tra_if_codigo).substr(0,2);//RB  GM
                        datoObjectNoti.frm_tra_if_codigo = aNotif.success[i].frm_tra_if_codigo;
                    
                    datoObjectNoti.obs_tra_actividad = aNotif.success[i].obs_tra_actividad;
                    datoObjectNoti.obs_tra_id = aNotif.success[i].obs_tra_id;
                    datoObjectNoti.obs_tra_id_tramite = aNotif.success[i].obs_tra_id_tramite;
                    datoObjectNoti.obs_tra_id_lotus = aNotif.success[i].obs_tra_id_lotus;
                    datoObjectNoti.obs_tra_leido = aNotif.success[i].obs_tra_leido;
                    datoObjectNoti.obs_tra_observaciones = mensajeIgob[0];
                    datoObjectNoti.obs_tra_registrado = aNotif.success[i].obs_tra_registrado;
                    datoObjectNoti.obs_tra_sistema = aNotif.success[i].obs_tra_sistema;
                    datoObjectNoti.obs_tra_usuario = aNotif.success[i].obs_tra_usuario;
                    datoObjectNoti.serdv_descripcion = aNotif.success[i].serdv_descripcion;
                    datoObjectNoti.mensajeIgob = mensajeIgob[0];
                    datoObjectNoti.obj_ruat = $scope.res1;
                        if ((aNotif.success[i].obs_tra_tipo_resp) == 'A'){
                        datoObjectNoti.obs_tra_tipo_resp = aNotif.success[i].obs_tra_tipo_resp;
                    }
                    
                    if ($scope.res1 == undefined){
                        datoObjectNoti.obj_url_ra = "noRA";
                    }else{
                        if(res.length > 1){
                            datoObjectNoti.obj_ruat = $scope.res1;
                            datoObjectNoti.obj_url_ra = "noRA";
                        }else{
                            datoObjectNoti.obj_ruat = $scope.res1;
                            datoObjectNoti.obj_url_ra = "noRA";
                        }
                    }
                    datoObjectNotiFinal[i] = datoObjectNoti;
                    $scope.myObj = datoObjectNotiFinal; //aNotif.success;
                }else if((aNotif.success[i].obs_tra_sistema == 'SITR@M 247' && aNotif.success[i].serdv_descripcion == 'CORRESPONDENCIA CIUDADANA')||(aNotif.success[i].obs_tra_sistema == 'SITR@M 247' && aNotif.success[i].serdv_descripcion == 'CORRESPONDENCIA CIUDADANA CM DIGITAL')){
                        datoObjectNoti = new Object();
                        $scope.notSitram = aNotif.success[i];
                        var mensaje = aNotif.success[i].obs_tra_observaciones;
                        var resS = mensaje.split("&#34");
                        $scope.actDetalle = resS[0];
                        var mensajeIgob = resS[0];
                        $scope.resS1 = resS[1];
                        $scope.resS2 = JSON.parse($scope.resS1);
                        datoObjectNoti.frm_tra_id_ciudadano = aNotif.success[i].frm_tra_id_ciudadano;
                        datoObjectNoti.frm_tra_if_codigo = aNotif.success[i].frm_tra_if_codigo;
                        datoObjectNoti.obs_tra_actividad = aNotif.success[i].obs_tra_actividad;
                        datoObjectNoti.obs_tra_id = aNotif.success[i].obs_tra_id;
                        datoObjectNoti.obs_tra_leido = aNotif.success[i].obs_tra_leido;
                        datoObjectNoti.obs_tra_observaciones = mensajeIgob;
                        datoObjectNoti.obs_tra_registrado = aNotif.success[i].obs_tra_registrado;
                        datoObjectNoti.obs_tra_sistema = aNotif.success[i].obs_tra_sistema;
                        datoObjectNoti.obs_tra_usuario = aNotif.success[i].obs_tra_usuario;
                        datoObjectNoti.serdv_descripcion = aNotif.success[i].serdv_descripcion;
                        datoObjectNoti.obj_url_ra = 'noRA';
                        if ($scope.resS2 == undefined){
                            datoObjectNoti.obj_url = "noSitram";
                        }else{
                            if($scope.resS2.length > 0){
                                datoObjectNoti.obj_url = $scope.resS2[0].url_archivoC;
                            }
                        }
                        datoObjectNotiFinal[i] = datoObjectNoti;
                        $scope.myObj = datoObjectNotiFinal; //aNotif.success;
                }else if((aNotif.success[i].obs_tra_sistema == 'REGISTRO_ANIMALISTAS' && aNotif.success[i].serdv_descripcion == 'REGISTRO ANIMALISTAS INDEPENDIENTES')){
                datoObjectNoti = new Object();
                $scope.notMascotas = aNotif.success[i];
                var mensaje = aNotif.success[i].obs_tra_observaciones;
                valor = mensaje.indexOf("&#34")
                var resS = mensaje.split("&#34");
                if(valor != -1){
                    $scope.actDetalle = resS[0];
                    var mensajeIgob = resS[0];
                    $scope.resS1 = resS[1];
                    $scope.resS2 = JSON.parse($scope.resS1);
                    datoObjectNoti.obj_url = $scope.resS2[0].url_archivoC;
                }else{
                    var mensajeIgob = mensaje;
                    datoObjectNoti.obj_url = "noSitram";
                }
                datoObjectNoti.frm_tra_id_ciudadano = aNotif.success[i].frm_tra_id_ciudadano;
                datoObjectNoti.frm_tra_if_codigo = aNotif.success[i].frm_tra_if_codigo;
                datoObjectNoti.obs_tra_actividad = aNotif.success[i].obs_tra_actividad;
                datoObjectNoti.obs_tra_id = aNotif.success[i].obs_tra_id;
                datoObjectNoti.obs_tra_leido = aNotif.success[i].obs_tra_leido;
                datoObjectNoti.obs_tra_observaciones = mensajeIgob;
                datoObjectNoti.obs_tra_registrado = aNotif.success[i].obs_tra_registrado;
                datoObjectNoti.obs_tra_sistema = aNotif.success[i].obs_tra_sistema;
                datoObjectNoti.obs_tra_usuario = aNotif.success[i].obs_tra_usuario;
                datoObjectNoti.serdv_descripcion = aNotif.success[i].serdv_descripcion;
                datoObjectNoti.obj_url_ra = 'noRA';
                datoObjectNotiFinal[i] = datoObjectNoti;
                $scope.myObj = datoObjectNotiFinal; //aNotif.success;
                }else{                                                              //CASO CONTRARIO....
                    $scope.myObj = aNotif.success;
                    datoObjectNoti = new Object();
                    datoObjectNoti.frm_tra_id_ciudadano = aNotif.success[i].frm_tra_id_ciudadano;
                    datoObjectNoti.frm_tra_if_codigo = aNotif.success[i].frm_tra_if_codigo;
                    datoObjectNoti.obs_tra_actividad = aNotif.success[i].obs_tra_actividad;
                    datoObjectNoti.obs_tra_id = aNotif.success[i].obs_tra_id;
                    datoObjectNoti.obs_tra_leido = aNotif.success[i].obs_tra_leido;
                    datoObjectNoti.obs_tra_observaciones = aNotif.success[i].obs_tra_observaciones;
                    datoObjectNoti.obs_tra_registrado = aNotif.success[i].obs_tra_registrado;
                    datoObjectNoti.obs_tra_sistema = aNotif.success[i].obs_tra_sistema;
                    datoObjectNoti.obs_tra_usuario = aNotif.success[i].obs_tra_usuario;
                    datoObjectNoti.serdv_descripcion = aNotif.success[i].serdv_descripcion;
                    datoObjectNoti.obs_tra_tipo_resp = aNotif.success[i].obs_tra_tipo_resp; 
                    datoObjectNoti.obs_tra_id_tramite = aNotif.success[i].obs_tra_id_tramite;   
                    datoObjectNoti.obs_tra_id_lotus = aNotif.success[i].obs_tra_id_lotus; 
                    datoObjectNoti.obj_url_ra = "noRA";
                    datoObjectNoti.obj_url = "noSitram";
                    datoObjectNotiFinal[i] = datoObjectNoti;
                    $scope.myObj = datoObjectNotiFinal;
                }
            }
        });
    }
    
    $scope.vistaPDF = function(url){
        alert(url);
    }
    $scope.respAdjunto = false;
    $scope.respInfo = false;
    var nombreNuevoCIAnverso = '';

    $scope.cargarData = function(dataAdj){
        console.log('dataAdj',dataAdj);
        $scope.datosSitram = dataAdj;
        if (dataAdj.obs_tra_tipo_resp == 'A') {
            $scope.respAdjunto = true;
            $scope.respInfo = false;
        }
        if (dataAdj.obs_tra_tipo_resp == 'R') {
            $scope.respAdjunto = false;
            $scope.respInfo = true;
        }
    }

    $scope.validaCampo = function(datoA){
        if (datoA == '' || datoA == 'undefined') {
            $scope.btover = false;
        } else{
            $scope.btover = true;
        };
    }

    $scope.ejecutarFile = function(idfile){
        var sid =   document.getElementById(idfile);
        if(sid){
            document.getElementById(idfile).click();
        }else{
            alert("Error ");
        }
    };

    $scope.cambiarFile = function(obj, valor){
        $scope.registroAdj = [];
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
        }); 
        setTimeout(function () {         
            console.log("entro a respuesta")
            var nombre = obj.getAttribute("name");
            var tamaniofile = obj.files[0];
            var oidCiudadano = sessionService.get('IDSOLICITANTE');
            $scope.direccionvirtual = "RC_CLI";
            var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/"+'doc_'+$scope.datosSitram.frm_tra_if_codigo+'/';
            if (nombre == 'adjunto' && (typeof(obj.files[0]) != 'undefined') && (valor != 'undefined' && valor != '')){
                var tipoDocci = obj.files[0].type;
                var tipoDoc1 = obj.files[0].name;
                var nameArrayci = tipoDoc1.split('.');
                var ext_doc = nameArrayci[nameArrayci.length - 1];
                var nameArrayci = tipoDocci.split('/');
                tipoDocci = nameArrayci[1];
                if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
                    if (ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg" || ext_doc == "bmp" || ext_doc == "gif"  || ext_doc == 'xls' || ext_doc == 'xlsx') {
                        var filecompress = compressImage($scope.adjunto).then(function(respuestaci){
                            var imagenCia = respuestaci.type.split('/');
                            var tipoCia = imagenCia[1];
                            nombreNuevoCIAnverso = fechaNueva+'.'+tipoCia;
                            fileUpload1.uploadFileToUrl1(respuestaci, uploadUrl, nombreNuevoCIAnverso);
                            $scope.registroAdj.adjunto = 'doc_'+$scope.datosSitram.frm_tra_if_codigo+'/' + nombreNuevoCIAnverso;
                            $scope.adjunto = respuestaci;
                            document.getElementById('txt_adjunto').value = nombreNuevoCIAnverso;
                            $scope.btover=true;
                            //$scope.mostrarimg('adj');
                        });
                    } else{
                        if (ext_doc == 'pdf' ||  ext_doc == 'docx' ||  ext_doc == 'docxlm' || ext_doc == 'xls' || ext_doc == 'xlsx') {
                            nombreNuevoCIAnverso = fechaNueva+'.'+tipoDocci;
                            fileUpload1.uploadFileToUrl1($scope.adjunto, uploadUrl,nombreNuevoCIAnverso);
                            $scope.registroAdj.adjunto ='doc_'+$scope.datosSitram.frm_tra_if_codigo+'/'+ nombreNuevoCIAnverso;
                            $scope.btover = true;
                            /*var zipci = new JSZip();
                            zipci.file($scope.adjunto.name, $scope.adjunto);
                            zipci.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobci) {
                                nombreNuevoCIAnverso = 'doc_'+$scope.datosSitram.frm_tra_if_codigo+'_'+fechaNueva+'.zip';
                                fileUpload1.uploadFileToUrl1(blobci, uploadUrl, nombreNuevoCIAnverso);
                                $scope.registroAdj.adjunto = nombreNuevoCIAnverso;
                                $scope.adjunto = blobci; 
                                $scope.btover=true; 
                                document.getElementById('txt_adjunto').value = nombreNuevoCIAnverso;
                            })*/
                        }
                        else{
                            swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_adjunto').value = '';
                            document.getElementById('adjunto').value = '';
                            $scope.registroAdj.adjunto = '';
                            $scope.adjunto = '';
                            valor = '';
                            $.unblockUI();
                        };
                    };
                }
                else{
                    if (tamaniofile.size <= 500000) {
                        if (ext_doc == 'png' || ext_doc == 'jpg' || ext_doc == 'jpeg' || ext_doc == 'bmp' || ext_doc == 'gif' || ext_doc == 'pdf' || ext_doc == 'docx' || ext_doc == 'docxlm' || ext_doc == 'xls' || ext_doc == 'xlsx') {
                            nombreNuevoCIAnverso = fechaNueva+'.'+ext_doc;
                            fileUpload1.uploadFileToUrl1($scope.adjunto, uploadUrl,nombreNuevoCIAnverso);
                            $scope.registroAdj.adjunto = 'doc_'+$scope.datosSitram.frm_tra_if_codigo+'/' + nombreNuevoCIAnverso;
                            $scope.btover=true;
                            document.getElementById('txt_adjunto').value = nombreNuevoCIAnverso;
                            //$scope.mostrarimg('adj');
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                            document.getElementById('txt_adjunto').value = '';
                            document.getElementById('adjunto').value = '';
                            $scope.registroAdj.adjunto = '';
                            $scope.adjunto = '';
                            valor = '';
                            $.unblockUI();
                        };
                    };
                    if (tamaniofile.size > 15000000) {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById('txt_adjunto').value = '';
                        document.getElementById('adjunto').value = '';
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $.unblockUI();
                    };
                }
            }
            else{
                $scope.btover=false;
                $scope.btover=false;
                $scope.mostrarI=false;
                $scope.$apply();
            }
        $.unblockUI();
        },500);
    }


    $scope.responderTramite = function(datosAdj){
        var user = sessionService.get('US_NOMBRE') + " " + sessionService.get('US_PATERNO') + " " + sessionService.get('US_MATERNO');
        var descripcionA = '';
        if ($scope.datosSitram.obs_tra_tipo_resp == 'A') {
            descripcionA = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registroAdj.adjunto + "?app_name=todoangular";
        } else{
            descripcionA = datosAdj.descripcion;
        };
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    url: CONFIG.CONEXION_API_PG_IF + 'wsIf/crearrespuestaSitram',
                    dataType: 'json',
                    data: '{"tramite":'+$scope.datosSitram.obs_tra_id_tramite+', "observacion":"'+descripcionA+'", "usuarioid":"'+sessionService.get('IDSOLICITANTE')+'", "actividad":"ACTIVIDAD SITR@M 247", "sistema":"CERO-PAPEL", "usuario":"'+user+'","tiporesp":"'+$scope.datosSitram.obs_tra_tipo_resp+'","idlotus":'+$scope.datosSitram.obs_tra_id_lotus+',"usuario_noti":"'+$scope.datosSitram.obs_tra_usuario+'","notificacion":"'+$scope.datosSitram.obs_tra_observaciones+'"}',
                    success: function (data){ console.log(data);
                        alertify.success("Información enviada");
                        $scope.archivarNotificacion($scope.datosSitram.obs_tra_id);
                        $scope.$apply();
                    },
                    error: function (data){ console.log(data);}
                });
    }

    $scope.mostrarI = false;

    $scope.mostrarimg  =   function(imagen){
        if (typeof($scope.adjunto) != 'undefined') {
            $scope.registroAdj.adjunto = nombreNuevoCIAnverso;
        };
        if (typeof($scope.registroAdj.adjunto) != 'undefined') {
            var nombreArchivoCi    =   "";
            nombreArchivoCi        =   $scope.registroAdj.adjunto;
            var aTipoArchivoCi     =   nombreArchivoCi.split("?")[0];
            var extCi              =   aTipoArchivoCi.split(".")[1];
            try{
                extCi                  =   extCi.toLowerCase();
            }catch(e){}
            if(imagen == 'adj'){
                $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" +'doc_'+$scope.datosSitram.frm_tra_if_codigo+'/'+ $scope.registroAdj.adjunto + "?app_name=todoangular";
                if(extCi == 'pdf' ||  extCi == 'docx' ||  extCi == 'docxlm' || extCi == 'zip'){
                    window.open($scope.archivoCI, "_blank");
                }else if(extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){
                    //$("#fo").modal("show");
                    //window.open($scope.archivoCI, "_blank");
                    $scope.mostrarI = true;
                }
            }
        };   
        $.unblockUI();
    }


    $scope.almacenarDocumentos = function(aFiles){
        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI";
        var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/";
        if (aFiles[0]){
            //fileUpload.uploadFileToUrl(aFiles[0], uploadUrl);
            $scope.registro.FILE_FOTOCOPIA_CI   = nombreNuevoCIAnverso;
            $scope.Advertencia1 = "ok";
        }
    }; 

    /***********recuperar  imagen*************/
    $scope.$on('api:ready',function(){
        $scope.datospersonaJuridica  =   "hide";
        $scope.recuperarDatosRegistro();
        $scope.recuperarDatosDocumentos();
        $scope.datosReportePlaformista();
        $scope.eventosCiudadano(sessionService.get('IDSOLICITANTE'));
        $scope.notificaciones();

    });   
    $scope.inicioDatosCiudadano = function () {
        $scope.datospersonaJuridica  =   "hide";
        $scope.recuperarDatosRegistro();
        $scope.recuperarDatosDocumentos();
        $scope.datosReportePlaformista();
        $scope.eventosCiudadano(sessionService.get('IDSOLICITANTE'));
        $scope.notificaciones();
        /** MODIFICACIONES RMCF **/
        $scope.getDocumento(sessionService.get('IDCIUDADANO'),'DMS',null,null);
    };


    $scope.getDocumento = function(usuario,sistema,proceso,ci_nodo)
    {
        $.blockUI();
        var resRoles = new reglasnegocio();
        resRoles.identificador = 'RCCIUDADANO_72';
        resRoles.parametros = '{"sdoc_usuario":"'+ usuario +'","sdoc_sistema":"","sdoc_proceso":"'+ proceso +'","sdoc_ci_nodo":"'+ ci_nodo +'"}';
        resRoles.llamarregla(function(response)
        {
          $scope.obtDatos = JSON.parse(response);
          if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
            $scope.tablaDocumentos = null;
            $("#divMsj").css({'display' : 'block' });
            $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
            $.unblockUI();
            alertify.warning('No existen datos');  
          }
          else
          {
            var data = JSON.parse(response);
            var u;
            angular.forEach(data, function(dataValue, dataKey) 
            {
                var n = $scope.vdoc_nombre = dataValue['vdoc_nombre'];            
                var s = $scope.vdoc_sistema= dataValue['vdoc_sistema'];
                u = $scope.vdoc_url    = dataValue['vdoc_url'];
                if(n == "CONDICIONES DE USO" || s == "vdoc_sistema")
                {
                    var y = $scope.vdoc_url = dataValue['vdoc_url'];
                    var i = y.toString();
                    if(i.indexOf("http://40.117.46.159:80/rest") != -1){
                        i = i.replace("http://40.117.46.159:80/rest", CONFIG.APIURL);
                    }					
                    $scope.t = i;
                    //$scope.vdoc_url = dataValue['vdoc_url'];
                    $scope.$apply(); 
                    //$scope.descripcion_corta=value['descripcion_corta'];
                }
            });


            $scope.valida = 1;
            $scope.msj1 = '';
            //$scope.tablaDocumentos.reload();
            $.unblockUI();
          };
        });      
      };

    $scope.ImprimirUrl = function (fum) 
    {
        $scope.archivoFile = fum.split(":");
        if ($scope.archivoFile[0]=="file")
        {
          window.open(
          fum,
          '_blank'
            );
        }
        else
        {
          $scope.varSpin = true;
          $scope.RegistroFUM={
              registrado:'OK',
              mensaje:''
            };
            if(fum.indexOf("http://40.117.46.159:80/rest") != -1){
                fum = fum.replace("http://40.117.46.159:80/rest", CONFIG.APIURL);
            }               
            $('#visorFum object').attr("data",fum);
            $timeout(function(){$scope.varSpin=false}, 1000);
        }
    };


    $scope.download = function(t)
    {
        var url = t;

        var link = document.createElement('a');
        link.href = url;
        link.download = 'Condiciones_de_Uso.pdf';
        link.dispatchEvent(new MouseEvent('click'));
    }

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
};