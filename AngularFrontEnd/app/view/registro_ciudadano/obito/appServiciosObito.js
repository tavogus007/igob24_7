//http://obito.lapaz.bo/obitosolicitud/
function serviciosObitoController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual) {
  //app.controller('serviciosObitoController', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad) {

    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.txtMsgConexionGen    =   '';
    $scope.txtCiudadanoExiste   =   '';
    $rootScope.looo =   '';
    $rootScope.laaa =   '';
    $scope.tablaTramites        =   {};
    $scope.tramitesUsuario      =   [];
    $scope.servicio = 9;
    $scope.habGuardar1 = true;
    $scope.btnEnviarFormObito = true;
    $scope.btover = null;
   // $scope.archivoDivCI = false;
   // $scope.archivoDivOJ = false;
    var stiporol = sessionService.get('US_IDROL');
    $scope.parentescos = 0;
    $scope.templates = [
        { name: 'template7.html', url: '../../../app/view/servicios/obito/index.html'} 
    ];
    $scope.serivicosInternet = [
        { name: 'Solicitud de Certificado de Óbito', id:'9'}
    ];
    $scope.seleccionarProceso = function(proceso){
        $scope.procesoSeleccionado  =   proceso.id;
        $scope.btnNuevoTramtite     =   false;
    }
    $scope.limpiarFormTramite   =   function(){
        $scope.procesoSeleccionado  = "";
        $scope.btnNuevoTramtite     =   true;
        $scope.getCaptchasX();
    };
    $scope.seleccionarProceso = function(proceso){
        $scope.procesoSeleccionado  =   proceso.id;
        $scope.btnNuevoTramtite     =   false;
    };
    $scope.crearTramiteObito   =   function(num){
        if($scope.serivicosInternet){            
            var idTipoTramite   =   $scope.serivicosInternet[0].id;
            $scope.adicionarServicioGamlp(idTipoTramite, num);
        }
    };
    $scope.loginPagoEnLinea   =   function(){
        var loginToken = new gLogin();
        loginToken.login(function(resultado){  
        });
    };
    $scope.selParentesco   =   function(idParentesco){
        idParentesco = parseInt(idParentesco);
        $rootScope.parentescos = idParentesco;
        if(idParentesco == 19) {
            $rootScope.archivoDivPJ = false;
            $rootScope.archivoDivCI = false;
            $rootScope.archivoDivOJ = true;
        } else {
            $rootScope.archivoDivCI = true;
            $rootScope.archivoDivOJ = false;
            $rootScope.archivoDivPJ = true;
            if($scope.datos.FILE_FOTOCOPIA_CI) {
            }else{
                $scope.datos.FILE_FOTOCOPIA_CI = $scope.datosIniciales.file_fotocopi_ci;
            }
        }        
    };
    $scope.subirSesionFum   =   function(fum){
        if ($rootScope.email!="") {
            sessionService.set('IDFUM', fum);
            window.location.href = "#servicios|epagos";
        } else {
            alertify.error("En pago en línea es obligatorio el correo electrónico");
            //swal('', "En pago en línea es obligatorio el correo electrónico", 'error');
            $.unblockUI();
        }
    };
    $scope.imprimirProforma   =   function(fum){
        /*window.open(
          'http://genesis/fumgmlp/Proforma/rptProforma.aspx?idfum=' + fum + '&RazonSocial=RSN&N',
          '_blank'
        );*/
        window.open(
          'http://obito.lapaz.bo/wsProforma/proforma.asmx/obtenerProforma?idFum=' + fum,
          '_blank'
        );
    };
    $scope.verConcepto = function(tramite){
        $scope.datosPago = JSON.parse(tramite.contenidofum);
        $scope.conceptoIdFum = $scope.datosPago[0].idFum;
        $scope.conceptoItemRecaudador = $scope.datosPago[0].idItemRecaudador;
        $scope.conceptoCabecera = $scope.datosPago[0].cabecera;
        $scope.conceptoFechaRegistro = $scope.datosPago[0].fechaRegistro;
        $scope.conceptoDescripcion = $scope.datosPago[0].descripcion;
        $scope.conceptoTotalGeneral = $scope.datosPago[0].AcctotalGeneral;
        $scope.conceptoTotalParcial = $scope.datosPago[0].AcctotalParcial;
        $scope.conceptoDetalle = $scope.datosPago[0].detalle;
        $scope.conceptoDetalleA = $scope.datosPago[0].detalleA;
        $scope.conceptoDetalleB = $scope.datosPago[0].detalleB;
        $scope.conceptoDetalleC = $scope.datosPago[0].detalleC;
        $scope.conceptoDetalleD = $scope.datosPago[0].detalleD;
        $scope.conceptoIdentificacion = $scope.datosPago[0].identificacion;
        $scope.conceptoNombre = $scope.datosPago[0].nombre;
    }
    $scope.obtDatosFallecido = function(tramite){
        $scope.todo = JSON.parse(tramite.contenidofum); 
        $scope.dtFallecidoNroProforma = tramite.vnroproforma;
        $scope.dtFallecidoNombre = $scope.todo[0].nombre + " " + $scope.todo[0].paterno + " " + $scope.todo[0].materno;
        $scope.dtFallecidoEdad = $scope.todo[0].edad;
        $scope.dtFallecidoEstado = $scope.todo[0].nestado_civil;
        $scope.dtFallecidoFecha = $scope.todo[0].nfechamuerte;
        $scope.dtFallecidoCausa = $scope.todo[0].ncausamuerte;
        $scope.dtFallecidoNacionalidad = $scope.todo[0].nnacionalidad;
        $scope.dtFallecidoCarpeta = $scope.todo[0].nlibro;
        $scope.dtFallecidoFolio = $scope.todo[0].nfolio;
    }

    $scope.refrescar = function(){
        $scope.tramitesCiudadano();
    };
    $scope.mostrarimg = function(){ 
        $.blockUI();
        if($rootScope.parentescos == 19){
            /*var b = "";
            var a = $scope.datos.FILE_ORDEN_JUDICIAL.split(':');
            if(a[1]!= undefined){
                b = $scope.datos.FILE_ORDEN_JUDICIAL.substring(12);
            }else{
                b= $scope.datos.FILE_ORDEN_JUDICIAL;
            }
            $scope.archivoOrdenJ = CONFIG.CONEXION_IMAGENES + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + b + "?app_name=todoangular";
            */
            if (typeof($scope.datos.FILE_ORDEN_JUDICIAL) != 'undefined') {
                var nombreArchivoCi    =   "";
                nombreArchivoCi        =   $scope.datos.FILE_ORDEN_JUDICIAL;
                var aTipoArchivoCi     =   nombreArchivoCi.split("?")[0];     
                var extCi              =   aTipoArchivoCi.split(".")[1];
                try{
                    extCi                  =   extCi.toLowerCase();
                }catch(e){}
                $scope.archivoOrdenJ = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.FILE_ORDEN_JUDICIAL + "?app_name=todoangular";
                if(extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){             
                    $("#fot").modal("show");
                }          
            };
        }else{
            if (sessionService.get('TIPO_PERSONA')=='NATURAL') {
                if (typeof($scope.datos.FILE_FOTOCOPIA_CI) != 'undefined') {
                    var nombreArchivoCi    =   "";
                    nombreArchivoCi        =   $scope.datos.FILE_FOTOCOPIA_CI;
                    var aTipoArchivoCi     =   nombreArchivoCi.split("?")[0];     
                    var extCi              =   aTipoArchivoCi.split(".")[1];
                    try{
                        extCi                  =   extCi.toLowerCase();
                    }catch(e){}
                    $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
                    if(extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){             
                        $("#fo").modal("show");
                    }          
                };
            } else{
                if (typeof($scope.datos.FILE_PODER_LEGAL) != 'undefined') {
                    var nombreArchivoCi    =   "";
                    nombreArchivoCi        =   $scope.datos.FILE_PODER_LEGAL;
                    var aTipoArchivoCi     =   nombreArchivoCi.split("?")[0];     
                    var extCi              =   aTipoArchivoCi.split(".")[1];
                    try{
                        extCi                  =   extCi.toLowerCase();
                    }catch(e){}
                    $scope.archivoPODERLEGAL= CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.datos.FILE_PODER_LEGAL + "?app_name=todoangular";
                    if(extCi == 'jpeg' || extCi == 'jpg' ||  extCi == 'png' ||  extCi == 'gif'){             
                        $("#foot").modal("show");
                    }          
                };
            };
            /*var b = "";
            var a = $scope.datos.FILE_FOTOCOPIA_CI.split(':');
            if(a[1]!= undefined){
                b = $scope.datos.FILE_FOTOCOPIA_CI.substring(12);
            }else{
                b= $scope.datos.FILE_FOTOCOPIA_CI;
            }
            $scope.archivoCI = CONFIG.CONEXION_IMAGENES + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + b + "?app_name=todoangular";*/
             
        }
        $.unblockUI();
    }
    $scope.limpiarFormTramite   =   function(){
        $scope.procesoSeleccionado  = "";
        $scope.btnNuevoTramtite     =   true;
    };
    $scope.template     =   "";
    var aDocAdjuntos    =   new Array();
    $scope.datosNatural = null;
    if (sessionService.get('TIPO_PERSONA') == 'NATURAL'){
        $scope.datosNatural = null;
    }
    else{
        $scope.datosNatural = 'mostrar';
    }

    $scope.recuperandoDatosInicialesCiudadano = function(){
        $scope.datosIniciales = "";
        var datosForm = {};
        var idCiudadano = sessionService.get('IDUSUARIO');
        var sTipoPersona = "";
        var datosCiudadano=new rcNatural();
        datosCiudadano.oid=idCiudadano;
        datosCiudadano.datosCiudadanoNatural(function(resultado){ 
            datos = JSON.parse(resultado);          
        });        
        if (sessionService.get('TIPO_PERSONA') == 'NATURAL'){            
            if ((datos[0].dtspsl_nombres == '' || (datos[0].dtspsl_paterno == '' && datos[0].dtspsl_materno == '') || datos[0].dtspsl_ci == '' || datos[0].dtspsl_expedido == '' || datos[0].dtspsl_zona_desc == '' || datos[0].dtspsl_numero_casa == '' || datos[0].dtspsl_tipo_via == '' || datos[0].dtspsl_nombre_via == '' || datos[0].dtspsl_correo == '' || datos[0].dtspsl_file_fotocopia_ci == '' || datos[0].dtspsl_telefono == '') || (datos[0].dtspsl_nombres == ' ' || (datos[0].dtspsl_paterno == ' ' && datos[0].dtspsl_materno == ' ') || datos[0].dtspsl_ci == ' ' || datos[0].dtspsl_expedido == ' ' || datos[0].dtspsl_zona_desc == ' ' || datos[0].dtspsl_numero_casa == ' ' || datos[0].dtspsl_tipo_via == ' ' || datos[0].dtspsl_nombre_via == ' ' || datos[0].dtspsl_correo == ' ' || datos[0].dtspsl_file_fotocopia_ci == ' ' || datos[0].dtspsl_telefono == ' ')) {
                /*console.log('dtspsl_nombres  ',datos[0].dtspsl_nombres);
                console.log('dtspsl_paterno   ',datos[0].dtspsl_paterno);
                console.log('dtspsl_materno  ',datos[0].dtspsl_materno);
                console.log('dtspsl_ci    ',datos[0].dtspsl_ci);
                console.log('dtspsl_expedido   ',datos[0].dtspsl_expedido);
                console.log('dtspsl_zona_desc   ',datos[0].dtspsl_zona_desc);
                console.log('dtspsl_numero_casa  ',datos[0].dtspsl_numero_casa);
                console.log('dtspsl_tipo_via   ',datos[0].dtspsl_tipo_via);
                console.log('dtspsl_nombre_via   ',datos[0].dtspsl_nombre_via);
                console.log('dtspsl_correo   ',datos[0].dtspsl_correo);
                console.log('dtspsl_file_fotocopia_ci   ',datos[0].dtspsl_file_fotocopia_ci);
                console.log('dtspsl_telefono  ',datos[0].dtspsl_telefono);*/
                setTimeout(function(){
                    swal({
                        title: 'Completar información',
                        text: 'Estimado ciudadano, debe completar la información de su cuenta para poder realizar el trámite',
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#DD6B55',
                        confirmButtonText: 'OK',
                        closeOnConfirm: true
                    }, function() {                                
                        window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                        //$.unblockUI();
                    });                          
                },300);
            }
            else {
                datosForm['ci_bigdata'] = datos[0]._id;
                datosForm['fec_solicitud'] = fechactual;
                datosForm['solicitante'] = datos[0].dtspsl_nombres + " " + datos[0].dtspsl_paterno + " " + datos[0].dtspsl_materno;
                datosForm['nombres_t'] = datos[0].dtspsl_nombres;
                datosForm['primer_apellido_t'] = datos[0].dtspsl_paterno;
                datosForm['segundo_apellido_t'] = datos[0].dtspsl_materno;
                datosForm['carnet_t'] = datos[0].dtspsl_ci;
                if(datos[0].dtspsl_expedido=='LPZ'){
                   datosForm['ci_expedido_t']='LP';
                }
                if(datos[0].dtspsl_expedido=='CBB'){
                   datosForm['ci_expedido_t']='CO';
                }
                if(datos[0].dtspsl_expedido=='SCZ'){
                   datosForm['ci_expedido_t']='SC';
                }
                if(datos[0].dtspsl_expedido=='CHQ'){
                   datosForm['ci_expedido_t']='CH';
                }
                if(datos[0].dtspsl_expedido=='TJA'){
                   datosForm['ci_expedido_t']='TA';
                }
                if(datos[0].dtspsl_expedido=='PTS'){
                   datosForm['ci_expedido_t']='PO';
                }
                if(datos[0].dtspsl_expedido=='ORU'){
                   datosForm['ci_expedido_t']='OR';
                }
                if(datos[0].dtspsl_expedido=='BNI'){
                   datosForm['ci_expedido_t']='BE';
                }
                if(datos[0].dtspsl_expedido=='PND'){
                   datosForm['ci_expedido_t']='PA';
                }
                datosForm['parentesco'] = "";
                datosForm['motivo'] = "";
                datosForm['titular_zona'] = datos[0].dtspsl_zona_desc;
                datosForm['titular_nro'] = datos[0].dtspsl_numero_casa;
                datosForm['tipo_via'] = datos[0].dtspsl_tipo_via;
                datosForm['titular_via'] = datos[0].dtspsl_nombre_via;
                datosForm['titular_fono'] = datos[0].dtspsl_telefono;
                datosForm['titular_correo'] = datos[0].dtspsl_correo;
                $rootScope.email = datos[0].dtspsl_correo;
                datosForm['nombre'] = "";
                datosForm['paterno'] = "";
                datosForm['materno'] = "";
                datosForm['apellido_casada'] = "";
                datosForm['ci_fallecido'] = "";
                datosForm['fecha1'] = "";
                datosForm['fecha2'] = "";
                datosForm['file_fotocopi_ci'] = datos[0].dtspsl_file_fotocopia_ci;
                $scope.datosIniciales = datosForm;
            };
        }else{
            if(sessionService.get('TIPO_PERSONA') == 'JURIDICO') {
                ci2 = datos[0].dtspsl_ci_representante;
                var datosCiudadano1=new rcNatural();
                datosCiudadano1.ci=ci2;
                datosCiudadano1.buscarNatural(function(resultado){ 
                    datosJ = JSON.parse(resultado);
                });
                if ((datosJ[0].dtspsl_ci_representante == '' || datosJ[0].dtspsl_nombres == '' || (datosJ[0].dtspsl_paterno == '' && datosJ[0].dtspsl_materno) || datosJ[0].dtspsl_ci == '' || datosJ[0].dtspsl_expedido == '' || datos[0].dtspsl_zona_desc == '' || datos[0].dtspsl_numero_casa == '' || datos[0].dtspsl_tipo_via == '' || datos[0].dtspsl_nombre_via == '' || datos[0].dtspsl_telefono == '' || datos[0].dtspsl_correo == '' || datos[0].dtspsl_file_poder_legal == '') || (datosJ[0].dtspsl_ci_representante == ' ' || datosJ[0].dtspsl_nombres == ' ' || (datosJ[0].dtspsl_paterno == ' ' && datosJ[0].dtspsl_materno) || datosJ[0].dtspsl_ci == ' ' || datosJ[0].dtspsl_expedido == ' ' || datos[0].dtspsl_zona_desc == ' ' || datos[0].dtspsl_numero_casa == ' ' || datos[0].dtspsl_tipo_via == ' ' || datos[0].dtspsl_nombre_via == ' ' || datos[0].dtspsl_telefono == ' ' || datos[0].dtspsl_correo == ' ' || datos[0].dtspsl_file_poder_legal == ' ')) {
                    setTimeout(function(){
                        swal({
                            title: 'Completar información',
                            text: 'Estimado ciudadano, debe completar la información de su cuenta para poder realizar el trámite',
                            type: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'OK',
                            closeOnConfirm: true
                        }, function() {                                
                            window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                            //$.unblockUI();
                        });                          
                    },300);
                }
                else{                    
                    datosForm['ci_bigdata'] = datosJ[0]._id;
                    datosForm['fec_solicitud'] = fechactual;
                    //datosForm['solicitante'] = datosJ[0].dtspsl_nombres + " " + datosJ[0].dtspsl_paterno + " " + datosJ[0].dtspsl_materno;
                    datosForm['nombres_t'] = datosJ[0].dtspsl_nombres;
                    datosForm['primer_apellido_t'] = datosJ[0].dtspsl_paterno;
                    datosForm['segundo_apellido_t'] = datosJ[0].dtspsl_materno;
                    datosForm['carnet_t'] = datosJ[0].dtspsl_ci;
                    if(datosJ[0].dtspsl_expedido=='LPZ'){
                       datosForm['ci_expedido_t']='LP';
                    }
                    if(datosJ[0].dtspsl_expedido=='CBB'){
                       datosForm['ci_expedido_t']='CO';
                    }
                    if(datosJ[0].dtspsl_expedido=='SCZ'){
                       datosForm['ci_expedido_t']='SC';
                    }
                    if(datosJ[0].dtspsl_expedido=='CHQ'){
                       datosForm['ci_expedido_t']='CH';
                    }
                    if(datosJ[0].dtspsl_expedido=='TJA'){
                       datosForm['ci_expedido_t']='TA';
                    }
                    if(datosJ[0].dtspsl_expedido=='PTS'){
                       datosForm['ci_expedido_t']='PO';
                    }
                    if(datosJ[0].dtspsl_expedido=='ORU'){
                       datosForm['ci_expedido_t']='OR';
                    }
                    if(datosJ[0].dtspsl_expedido=='BNI'){
                       datosForm['ci_expedido_t']='BN';
                    }
                    if(datosJ[0].dtspsl_expedido=='PND'){
                       datosForm['ci_expedido_t']='PA';
                    }
                    datosForm['parentesco'] = "";
                    datosForm['motivo'] = "";
                    datosForm['titular_zona'] = datos[0].dtspsl_zona_desc;
                    datosForm['titular_nro'] = datos[0].dtspsl_numero_casa;
                    datosForm['tipo_via'] = datos[0].dtspsl_tipo_via;
                    datosForm['titular_via'] = datos[0].dtspsl_nombre_via;
                    datosForm['titular_fono'] = datos[0].dtspsl_telefono;
                    datosForm['titular_correo'] = datos[0].dtspsl_correo;
                    $rootScope.email = datos[0].dtspsl_correo;
                    datosForm['nombre'] = "";
                    datosForm['paterno'] = "";
                    datosForm['materno'] = "";
                    datosForm['apellido_casada'] = "";
                    datosForm['ci_fallecido'] = "";
                    datosForm['fecha1'] = "";
                    datosForm['fecha2'] = "";
                    //datosForm['FILE_FOTOCOPIA_CI'] = "";
                    datosForm['razon_social'] = datos[0].dtspsl_razon_social;
                    datosForm['nit'] = datos[0].dtspsl_nit;
                    datosForm['FILE_PODER_LEGAL'] = datos[0].dtspsl_file_poder_legal;                    

                    $scope.datosIniciales = datosForm;
                };                
            } else {
                alertify.error("error en identificador de ciudadano");
                //swal('', "error en identificador de ciudadano", 'error');
            }
        };
    };
    
    $scope.actualizarFumsPagados = function(idTra,idFum){   
        var formData = {
            'idfum':idFum
        };
        var idtoken =   sessionService.get('TOKEN');
        var stoquen =  'Bearer <\\\"' + idtoken + '\\\">';             
        $.ajax({
            "async": true,
            type        : 'POST',            
            url         : 'https://pagonline.lapaz.bo/api/comprobante',
            data        : formData,
            dataType    : 'json',
            crossDomain : true,
              "headers": {
                "cache-control": "no-cache",
              },
            headers: {
               'authorization': stoquen
            },             
            success     : function(data) {  
                try {
                    if ( data.Resultado[0].idFum) {
                        $scope.actualizarDatos(idTra, JSON.stringify(data.Resultado[0]))
                    } 
                } catch(e){
                    console.log(e);
                }
            }
        });     
    };

    $scope.actualizarDatos = function(idTramite, fum){
        var traCiudadano   = new reglasnegocio();
        traCiudadano.identificador = 'RCCIUDADANO_274';
        traCiudadano.parametros = '{"tramite_id":"'+ idTramite + '", "fum":"'+ fum + '"}';
        traCiudadano.llamarregla(function(results){
            results = JSON.parse(results);
            if (results == '[]' || results == '[{}]' || results == '[{ }]' || results == ' ' || results == '') {
                alertify.warning('No existen datos');
                //swal('','No existen datos','warning');
            } else{
                console.log(results);
            };
        });
    };
  
 /***************TRAMITES OBITO***********************/
    $scope.tramitesCiudadano = function(tramite, num){
        sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var traCiudadano   = new reglasnegocio();
        traCiudadano.identificador = 'RCCIUDADANO_133';
        traCiudadano.parametros = '{"sidciudadano":"'+ sIdCiudadano + '"}';
        traCiudadano.llamarregla(function(results){
            results = JSON.parse(results);
            if (num == '1') {
                tramite = results[0];
            };
            if (results == '[]' || results == '[{}]' || results == '[{ }]' || results == ' ' || results == '') {
                alertify.warning('No existen datos');
                //swal('','No existen datos','warning');
            } else{
                angular.forEach(results,function(val, index){ 
                    var idFum;
                    var idTra;
                    if(val['form_contenido']) {
                        results[index].datos = val['form_contenido'];//JSON.parse(val['form_contenido']);
                    }
                    idFum=val['vnroproforma'];
                    idTra=val['vtra_id'];
                    if(idFum) {
                        $scope.actualizarFumsPagados(idTra,idFum);
                    }
                });
                if(tramite){
                    $scope.seleccionarTramite(tramite, num);
                }
                $scope.tramitesUsuario = results;
                var data = results;
                $scope.tablaTramites.reload();
            };
        });
    };

    /*$scope.seleccionarTramite = function (tramite) {
        console.log('tramiteeeeeeeee  ',tramite);
        $scope.template =   "";
        setTimeout(function(){
            $scope.seleccionarTramitecreado(tramite);
            $scope.$apply();
            $.unblockUI();
        },500);
    };
    
    $scope.seleccionarTramitecreado = function(tramite,num){
        $.blockUI({ css: { 
                    border: 'none', 
                    padding: '10px', 
                    backgroundColor: '#000', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: .5, 
                    color: '#fff' 
                },message: "Espere un momento por favor ..." }); 
        setTimeout(function(){
            $scope.getCaptchasXX();
            sIdCiudadano = sessionService.get('IDSOLICITANTE');
            var traCiudadano   = new reglasnegocio();
            traCiudadano.identificador = 'RCCIUDADANO_133';
            traCiudadano.parametros = '{"sidciudadano":"'+ sIdCiudadano + '"}';
            traCiudadano.llamarregla(function(results){
                results = JSON.parse(results);
                if (num == '1') {
                    tramite = results[0];
                };
                if (results == '[]' || results == '[{}]' || results == '[{ }]' || results == ' ' || results == '') {
                    alertify.warning('No existen datos');
                    //swal('','No existen datos','warning');
                } else{
                    angular.forEach(results,function(val, index){ 
                        var idFum;
                        var idTra;
                        if(val['form_contenido']) {
                            results[index].datos = val['form_contenido'];//JSON.parse(val['form_contenido']);
                        }
                        idFum=val['vnroproforma'];
                        idTra=val['vtra_id'];
                        if(idFum) {
                            $scope.actualizarFumsPagados(idTra,idFum);
                        }
                    });
                    if(tramite){
                        $scope.seleccionarTramite(tramite);
                    }
                    $scope.tramitesUsuario = results;
                    var data = results;
                    $scope.tablaTramites.reload();
                };
            });
        },300);
    };*/
  /*******************************************************/
    $scope.tablaTramites = new ngTableParams({
        page: 1,
        count: 4,
        filter: {},
        sorting: {
            vtra_id: 'desc'
            }
        }, {
        total: $scope.tramitesUsuario.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.tramitesUsuario, params.filter()) :
            $scope.tramitesUsuario;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.tramitesUsuario;
            params.total($scope.tramitesUsuario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
    /*******************************************************************************/
    //ACTUALIZAR ID TRÁMITE NEXO
    $scope.tramitesObservaciones = function(tramite, ciudadano){
        $scope.observaciones = "mostrar";
        var idCiudadano = sessionService.get('IDSOLICITANTE');
        var sciudadano = new reglasnegocio();
        sciudadano.identificador = 'RCCIUDADANO_65';
        sciudadano.parametros = '{"sidciudadano":"' + idCiudadano + '"}'; 
        sciudadano.llamarregla(function(results){ 
            results = JSON.parse(results);  
            if (results == '[]' || results == '[{}]' || results == '[{ }]' || results == ' ' || results == '') {
                alertify.warning('No existen datos');
                //swal('','No existen datos','warning');
            } else{  
                $scope.noticias = results;
                var data = results; 
                $scope.tablaNoticias = new ngTableParams({
                    page: 1,
                    count: 4,
                    filter: {},
                    sorting: {}
                }, {
                    total: $scope.noticias.length,
                    getData: function($defer, params) {
                        var filteredData = params.filter() ?
                        $filter('filter')($scope.noticias, params.filter()) :
                        $scope.noticias;
                        var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        $scope.noticias;
                        params.total(orderedData.length);
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            };
        });
    };
    /*******************************************************************************/
    $scope.iniciandoDatos = function(){
        var datosIniciales = $scope.datosIniciales;
        var fechactual  =   obtFechaActual.obtenerFechaActual();
        $scope.datos = {};
        var datosForm_inicio = {};
        var miRegExa = /[A-Za-z]/i;
        var ciciu = datosIniciales.carnet_t;
        var siexiste = ciciu.search(miRegExa);
        if (siexiste != -1) {
            alertify.warning('Estimado usuario, su Carnet de Identidad contiene complemento por lo tanto no podra realizar el trámite');
            //swal('','Estimado usuario, su Carnet de Identidad contiene complemento por lo tanto no podra realizar el trámite','warning');
            setTimeout(function(){
                window.location.href = "#dashboard";
                $.unblockUI();
            },300);
        } 
        else{
            if (sessionService.get('TIPO_PERSONA') == 'NATURAL') {
                if (datosIniciales.nombres_t == '' || (datosIniciales.primer_apellido_t == '' && datosIniciales.segundo_apellido_t == '') || datosIniciales.carnet_t == '' || datosIniciales.ci_expedido_t == '' || datosIniciales.titular_zona == '' || datosIniciales.titular_nro == '' || datosIniciales.tipo_via == '' || datosIniciales.titular_via == '' || datosIniciales.titular_correo == '' || datosIniciales.file_fotocopi_ci == '' || datosIniciales.titular_fono == '') {
                    alertify.warning('Estimado usuario, debe completar la información de su cuenta para poder realizar el trámite');
                    //swal('','Estimado usuario, debe completar la información de su cuenta para poder realizar el trámite','warning');
                    setTimeout(function(){
                        window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                        $.unblockUI();
                    },300);
                } else{
                    datosForm_inicio['ci_bigdata'] = datosIniciales.ci_bigdata;
                    datosForm_inicio['fec_solicitud'] = fechactual;
                    datosForm_inicio['solicitante'] = datosIniciales.solicitante;
                    datosForm_inicio['nombres_t'] = datosIniciales.nombres_t;
                    datosForm_inicio['primer_apellido_t'] = datosIniciales.primer_apellido_t;
                    datosForm_inicio['segundo_apellido_t'] = datosIniciales.segundo_apellido_t;
                    datosForm_inicio['carnet_t'] = datosIniciales.carnet_t;
                    datosForm_inicio['ci_expedido_t'] = datosIniciales.ci_expedido_t;
                    datosForm_inicio['parentesco'] = datosIniciales.parentesco;
                    datosForm_inicio['motivo'] = datosIniciales.motivo;
                    datosForm_inicio['titular_zona'] = datosIniciales.titular_zona;
                    datosForm_inicio['titular_nro'] = datosIniciales.titular_nro;
                    datosForm_inicio['tipo_via'] = datosIniciales.tipo_via
                    datosForm_inicio['titular_via'] = datosIniciales.titular_via;
                    datosForm_inicio['titular_fono'] = datosIniciales.titular_fono;
                    datosForm_inicio['titular_correo'] = datosIniciales.titular_correo;
                    $rootScope.email = datosIniciales.titular_correo;
                    datosForm_inicio['nombre'] = datosIniciales.nombre;
                    datosForm_inicio['paterno'] = datosIniciales.paterno
                    datosForm_inicio['materno'] = datosIniciales.materno;
                    datosForm_inicio['apellido_casada'] = datosIniciales.apellido_casada;
                    datosForm_inicio['ci_fallecido'] = datosIniciales.ci_fallecido;
                    datosForm_inicio['fecha1'] = datosIniciales.fecha1;
                    datosForm_inicio['fecha2'] = datosIniciales.fecha2;
                    datosForm_inicio['FILE_FOTOCOPIA_CI'] = datosIniciales.FILE_FOTOCOPIA_CI;
                    $scope.datos = datosForm_inicio;
                    if (datosIniciales.titular_zona) {
                       $scope.validacionDireccion = false;
                    } else {
                        $scope.validacionDireccion = true;
                        alertify.error("Datos de dirección son obligatorios debe completar la información de su cuenta");
                        //swal('Complete información', "Datos de dirección son obligatorios debe completar la información de su cuenta", 'error');
                        setTimeout(function(){
                            window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                            $.unblockUI();
                        },300);
                    }
                };
            } else{               
                if (datosIniciales.nombres_t == '' || (datosIniciales.primer_apellido_t == '' && datosIniciales.segundo_apellido_t == '') || datosIniciales.carnet_t == '' || datosIniciales.ci_expedido_t == '' || datosIniciales.titular_zona == '' || datosIniciales.titular_nro == '' || datosIniciales.titular_via == '' || datosIniciales.tipo_via == '' || datosIniciales.titular_correo == '' || datosIniciales.FILE_FOTOCOPIA_CI == '' || datosIniciales.titular_fono == '') {
                    alertify.warning('Estimado usuario, debe completar la información de su cuenta para poder realizar el trámite');
                    //swal('','Estimado usuario, debe completar la información de su cuenta para poder realizar el trámite','warning');
                    setTimeout(function(){
                        window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                        $.unblockUI();
                    },300);
                } else{
                    datosForm_inicio['ci_bigdata'] = datosIniciales.ci_bigdata;
                    datosForm_inicio['fec_solicitud'] = fechactual;
                    datosForm_inicio['solicitante'] = datosIniciales.solicitante;
                    datosForm_inicio['nombres_t'] = datosIniciales.nombres_t;
                    datosForm_inicio['primer_apellido_t'] = datosIniciales.primer_apellido_t;
                    datosForm_inicio['segundo_apellido_t'] = datosIniciales.segundo_apellido_t;
                    datosForm_inicio['carnet_t'] = datosIniciales.carnet_t;
                    datosForm_inicio['ci_expedido_t'] = datosIniciales.ci_expedido_t;
                    datosForm_inicio['parentesco'] = datosIniciales.parentesco;
                    datosForm_inicio['motivo'] = datosIniciales.motivo;
                    datosForm_inicio['titular_zona'] = datosIniciales.titular_zona;
                    datosForm_inicio['titular_nro'] = datosIniciales.titular_nro;
                    datosForm_inicio['tipo_via'] = datosIniciales.tipo_via
                    datosForm_inicio['titular_via'] = datosIniciales.titular_via;
                    datosForm_inicio['titular_fono'] = datosIniciales.titular_fono;
                    datosForm_inicio['titular_correo'] = datosIniciales.titular_correo;
                    $rootScope.email = datosIniciales.titular_correo;
                    datosForm_inicio['nombre'] = datosIniciales.nombre;
                    datosForm_inicio['paterno'] = datosIniciales.paterno
                    datosForm_inicio['materno'] = datosIniciales.materno;
                    datosForm_inicio['apellido_casada'] = datosIniciales.apellido_casada;
                    datosForm_inicio['ci_fallecido'] = datosIniciales.ci_fallecido;
                    datosForm_inicio['fecha1'] = datosIniciales.fecha1;
                    datosForm_inicio['fecha2'] = datosIniciales.fecha2;
                    datosForm_inicio['razon_social'] = datosIniciales.razon_social;
                    datosForm_inicio['nit'] = datosIniciales.nit;
                    datosForm_inicio['FILE_PODER_LEGAL'] = datosIniciales.FILE_PODER_LEGAL;
                    $scope.datos = datosForm_inicio;
                    if (datosIniciales.titular_zona) {
                       $scope.validacionDireccion = false;
                    } else {
                        $scope.validacionDireccion = true;
                        alertify.error("Datos de dirección son obligatorios debe completar la información de su cuenta");
                        //swal('Complete información', "Datos de dirección son obligatorios debe completar la información de su cuenta", 'error');
                        setTimeout(function(){
                            window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                            $.unblockUI();
                        },300);
                    }
                };
            };
            
        };
        $.unblockUI();        
    };
    /********************************************************************************/
    $scope.recuperarSerializarInfo = function(tramite){
        var sIdTramite = tramite.vtra_id;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
        var sIdServicio = sessionService.get('IDSERVICIO');
        var parametros  = {
                "container":"RC_CLI",
                "folder_path": sIdTramite
        };
        if(sIdCiudadano) {
            var traCiudadano   = new reglasnegocio();
            traCiudadano.identificador = 'RCCIUDADANO_275';
            traCiudadano.parametros = '{"sidciudadano":"'+ sIdCiudadano + '","sidservicio":"'+ sIdServicio + '","sidtramite":"'+ sIdTramite + '"}';
            traCiudadano.llamarregla(function(results){
                results = JSON.parse(results);
                if (results == '[]' || results == '[{}]' || results == '[{ }]' || results == ' ' || results == '') {
                    $scope.datos = $scope.datosIniciales;
                    $scope.datos.nombres_t =  $scope.datosIniciales.nombres_t;
                    $scope.datos.primer_apellido_t = $scope.datosIniciales.primer_apellido_t;
                    $scope.datos.segundo_apellido_t = $scope.datosIniciales.segundo_apellido_t;
                    $scope.datos.carnet_t = $scope.datosIniciales.carnet_t;
                    $scope.datos.ci_expedido_t = $scope.datosIniciales.ci_expedido_t;
                    //$scope.datos.parentesco = '';
                    //$scope.datos.motivo = '';
                    $scope.datos.titular_zona = $scope.datosIniciales.titular_zona;
                    $scope.datos.titular_via = $scope.datosIniciales.titular_via;
                    $scope.datos.tipo_via = $scope.datosIniciales.tipo_via;
                    $scope.datos.titular_nro = $scope.datosIniciales.titular_nro;
                    $scope.datos.titular_fono = $scope.datosIniciales.titular_fono;
                    $scope.datos.titular_correo = $scope.datosIniciales.titular_correo;
                    $scope.datos.FILE_FOTOCOPIA_CI = $scope.datosIniciales.file_fotocopi_ci;
                    if (sessionService.get('TIPO_PERSONA') == 'NATURAL') {                                       
                    }
                    else{
                        $scope.datos.razon_social = $scope.datosIniciales.razon_social;
                        $scope.datos.nit = $scope.datosIniciales.nit; 
                        $scope.datos.FILE_PODER_LEGAL = $scope.datos.FILE_PODER_LEGAL;                 
                    }
                } else{
                    /*angular.forEach(results,function(val, index){ 
                        if(val['form_contenido']) {
                            r = val['form_contenido'];//JSON.parse(val['form_contenido']);
                        }
                    });*/
                    if(results.length == 1){
                        if (($scope.datos.nombres_t == '' || ($scope.datos.primer_apellido_t == '' && $scope.datos.segundo_apellido_t == '') || $scope.datos.carnet_t == '' || $scope.datos.ci_expedido_t == '' || $scope.datos.titular_zona == '' || $scope.datos.titular_nro == '' || $scope.datos.titular_via == '' || $scope.datos.tipo_via == '' || $scope.datos.titular_correo == '' || $scope.datos.FILE_FOTOCOPIA_CI == '' || $scope.datos.titular_fono == '') || ($scope.datos.nombres_t == ' ' || ($scope.datos.primer_apellido_t == ' ' && $scope.datos.segundo_apellido_t == ' ') || $scope.datos.carnet_t == ' ' || $scope.datos.ci_expedido_t == ' ' || $scope.datos.titular_zona == ' ' || $scope.datos.titular_nro == ' ' || $scope.datos.tipo_via == ' ' || $scope.datos.titular_via == ' ' || $scope.datos.titular_correo == ' ' || $scope.datos.FILE_FOTOCOPIA_CI == ' ' || $scope.datos.titular_fono == ' ')) {
                            alertify.warning('Estimado usuario, debe completar la información de su cuenta para poder realizar el trámite');
                            //swal('','Estimado usuario, debe completar la información de su cuenta para poder realizar el trámite','warning');
                            setTimeout(function(){
                                window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                                $.unblockUI();
                            },300);
                        }
                        else{
                            datos = JSON.parse(results[0].form_contenido);
                            $scope.adjuntosArray = datos.ARCHIVOS_MULTIPLES;
                            $scope.datos = datos;
                            $scope.datos.nombres_t =  $scope.datosIniciales.nombres_t;
                            $scope.datos.primer_apellido_t = $scope.datosIniciales.primer_apellido_t;
                            $scope.datos.segundo_apellido_t = $scope.datosIniciales.segundo_apellido_t;
                            $scope.datos.carnet_t = $scope.datosIniciales.carnet_t;
                            $scope.datos.ci_expedido_t = $scope.datosIniciales.ci_expedido_t;
                            $scope.datos.titular_zona = $scope.datosIniciales.titular_zona;
                            $scope.datos.titular_via = $scope.datosIniciales.titular_via;
                            $scope.datos.tipo_via = $scope.datosIniciales.tipo_via;
                            $scope.datos.titular_nro = $scope.datosIniciales.titular_nro;
                            $scope.datos.titular_fono = $scope.datosIniciales.titular_fono;
                            $scope.datos.titular_correo = $scope.datosIniciales.titular_correo.replace("<x>","");
                            $scope.datos.titular_zona = $scope.datosIniciales.titular_zona;
                            $scope.datos.FILE_FOTOCOPIA_CI = $scope.datosIniciales.file_fotocopi_ci;
                            if (sessionService.get('TIPO_PERSONA') == 'NATURAL') {                                
                            }   
                            else{
                                $scope.datos.razon_social = $scope.datosIniciales.razon_social;
                                $scope.datos.nit = $scope.datosIniciales.nit;
                                $scope.datos.FILE_PODER_LEGAL = $scope.datos.FILE_PODER_LEGAL;
                            }                        
                            $scope.publicid =[];
                            $scope.publicid = $scope.datos.publicidad;
                            $rootScope.looo = $scope.datos.INT_AC_latitud;
                            $rootScope.laaa = $scope.datos.INT_AC_longitud;
                            $scope.selParentesco($scope.datos.parentesco);
                            $scope.nroRegistros = datos.length;
                            $scope.$apply();
                        };                    
                    }else{
                        $rootScope.archivoDivCI = false;
                        $rootScope.archivoDivOJ = false;
                        $rootScope.archivoDivPJ = false;
                        $scope.nroRegistros = 0;
                        $scope.datos = "";
                        $scope.adjuntosArray = "";
                        $scope.iniciandoDatos();
                        sessionService.set('IDTRAMITE', sIdTramite);
                        $scope.$apply();
                    }
                };                
                if (tramite.venviado == "SI") {
                    $scope.btnGuardarForm           =   true;
                    $scope.desabilitado             =   true;
                    $scope.botones                  =   null;
                    $scope.cibloq                   =   null;
                    var datosenviados = JSON.parse(results[0].form_contenido);
                    $scope.datos = datos;                    
                } else {
                    if (tramite.vnroproforma != null){
                        var datosenviados = JSON.parse(results[0].form_contenido);
                        $scope.datos = datosenviados;
                        $scope.desabilitado = true;
                        $scope.botones = null;
                        $scope.$apply();
                    } else {
                        $scope.btnGuardarForm   =   false;
                        $scope.desabilitado     =   false;
                        $scope.botones          =   "mostrar";
                        $scope.cibloq           =   "mostrar";
                        $scope.$apply();
                    }
                }
                $rootScope.$broadcast('validarBtnEnviar', results.length);
                $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                $rootScope.$broadcast('inicializarGrillaAE', [{'datos':$scope.datos, 'venviado':tramite.venviado}]);
                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
            });
/*
            var parametros = new datosFormularios();
            parametros.frm_tra_id_ciudadano = sIdCiudadano;
            parametros.frm_tra_dvser_id = sIdServicio;
            parametros.frm_idTramite = sIdTramite;
            parametros.splistafrmdatos(function(resultado){
                resultadoApi = JSON.parse(resultado);
                console.log(333, resultadoApi);
            });
*/
            $.unblockUI();
        } else {
            alert("NO existe id ciudadano");
            $.unblockUI();
        }
    };

    $scope.bloquearBtnEnviarForm    =   function(){
        $scope.botones          =   null;
    };
    //ALMACENAR DOCUMENTOS - GESTION DOCUMENTAL
    $scope.almacenarGDocumental = function(dataArchivo, sUrl){
        var valores = "";
        var cadena = "";
        var nombreFile = dataArchivo.name;
        var subirU = {};
        subirU['doc_sistema'] = 'RC_CLI';
        subirU['doc_proceso'] = 'ADJUNTO';
        subirU['doc_ci_nodo'] = 'DMS';
        subirU['doc_datos'] = valores;
        subirU['doc_version'] ='1';
        subirU['doc_tiempo'] = '0';
        subirU['doc_firma_digital'] = 0;
        subirU['doc_acceso'] = "";
        subirU['doc_tipo_documento'] = "pdf";
        subirU['doc_tamanio_documento'] = "0";
        subirU['doc_tps_doc_id'] = '1';//data.vtps_doc_id
        subirU['doc_tipo_documentacion'] = 'U';
        subirU['doc_tipo_ingreso'] = 'I';
        subirU['doc_estado_de_envio'] = 'N';
        subirU['doc_correlativo'] = '';
        subirU['doc_tipo_documento_ext'] = '';
        subirU['doc_nrotramite_nexo'] = '';
        subirU['doc_id_carpeta'] = '';
        subirU['doc_registro'] = fechactual;
        subirU['doc_modificacion'] = fechactual;
        subirU['doc_usuario'] = sessionService.get('USUARIO');
        subirU['doc_estado'] = 'A';
        subirU['doc_url'] = sUrl;
        subirU['doc_url_logica'] = cadena;
        subirU['doc_nombre'] = nombreFile;
        var ressubirU = {
            table_name:"dms_gt_documentos",
            body:subirU
        };
    };
    //ALMACENAR DOCUMENTOS 
    $scope.almacenarDocumentos = function(aFiles){
        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI";
        var uploadUrl = CONFIG.CONEXION_IMAGENES + "/files/" + $scope.direccionvirtual + "/" + oidCiudadano + "/";
        if (aFiles[0]){
            if(aFiles[0].size <= 3145728){
                fileUpload.uploadFileToUrl(aFiles, uploadUrl);
                if ($rootScope.parentescos == 19){
                   $scope.datos.FILE_ORDEN_JUDICIAL   = aFiles[0].name;
                }else{
                    if (sessionService.get('TIPO_PERSONA') == 'NATURAL') {
                        $scope.datos.FILE_FOTOCOPIA_CI   = aFiles[0].name;                        
                    } else{
                        $scope.datos.FILE_PODER_LEGAL   = aFiles[0].name;
                    };
                }
                $scope.Advertencia1="ok";
            }else{
                alertify.error('El tamaño de la imagen CEDULA DE IDENTIDAD es muy grande');
                //swal('Advertencia', 'El tamaño de la imagen CEDULA DE IDENTIDAD es muy grande', 'error');
                $scope.Advertencia1="advertencia";
                aFiles[0].name="";
                document.getElementById('FILE_FOTOCOPIA_CI').value='';
                document.getElementById('FILE_ORDEN_JUDICIAL').value='';
                document.getElementById('FILE_PODER_LEGAL').value='';
            }
        }
        
        angular.forEach(aFiles, function(archivo, key) {            
            if(typeof(archivo) != 'undefined'){
                fileUpload.uploadFileToUrl(archivo, uploadUrl);
            }else{
                console.log("error en el archivo");
            }
        }); 
        $.unblockUI();
    };
    /******************************************************************************/
    $scope.serializarInformacionViajes = function(obj){
        var fechactual          = obtFechaActual.obtenerFechaActual();
        var misDocs             = new Array();
        //CONVIRTIENDO LOS CAMPOS A MAYUSCULAS
        misDocs.push($scope.FILE_FOTOCOPIA_CI);
        misDocs.push($scope.FILE_FACTURA_SERVICIO);
        misDocs.push($scope.FILE_CROQUIS_AMBIENTE);
        misDocs.push($scope.FILE_CERTIFICADO_PENAL);
        //RECUPERANDO ADJUNTOS
        //$scope.almacenarDocumentos(misDocs);
        var datosSerializados   =  obj;
        var idCiudadano         = sessionService.get('IDSOLICITANTE');
        var idTramite           = sessionService.get('IDTRAMITE');
        var idServicio          = sessionService.get('IDSERVICIO');

        var serializarinfoviajes   = new reglasnegocio();
        serializarinfoviajes.identificador = 'RCCIUDADANO_80';
        serializarinfoviajes.parametros = '{"id_servicio":"' + idServicio + '","data_json":"' + datosSerializados + '","oid_ciudadano":"' + idCiudadano + '","id_usuario":1,"id_trm_form":"' + idTramite + '"}'; 
        $scope.btnGuardarForm   =   true;
        $.blockUI();
        serializarinfoviajes.llamarregla(function(results){
        //results = JSON.parse(results);
            if(results.length > 0){
                $.unblockUI();
                $scope.btnEnviarForm    =   false;
                $scope.btnGuardarForm   =   false;
                //COLOCANDO OBLIGATORIO LOS DOCUMENTOS ADJUNTOS
                //$scope.adjuntoObligatorio       =   true;
                //$scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #577C27;";
                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                alertify.success("Formulario almacenado");
                //swal('', "Formulario almacenado", 'success');
            }else{
                $.unblockUI();
                alertify.error("Formulario no almacenado");
                //swal('', "Formulario no almacenado", 'error');
            }
        });
    };
    
    /******************************************************************************/
      $scope.cambiarFile = function(obj, valor){
        $.blockUI();  
        /*setTimeout(function(){
            var misDocs             = new Array();        
            if($rootScope.parentescos == 19){
               $scope.FILE_ORDEN_JUDICIAL = $scope.FILE_ORDEN_JUDICIAL;
                document.getElementById('FILE_ORDEN_JUDICIAL').value = valor;
                misDocs.push($scope.FILE_ORDEN_JUDICIAL);
            }  else{
                $scope.FILE_FOTOCOPIA_CI = $scope.FILE_FOTOCOPIA_CI;
                document.getElementById('FILE_FOTOCOPIA_CI').value = valor;
                misDocs.push($scope.FILE_FOTOCOPIA_CI);
            }
            var uploadUrl = CONFIG.CONEXION_IMAGENES + "/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + '/' ;
            $scope.almacenarDocumentos(misDocs);
            $.unblockUI();
        },1000);*/
        setTimeout(function(){ 
            var nombre = obj.getAttribute("name");
            var tamaniofile = obj.files[0];
            var oidCiudadano = sessionService.get('IDSOLICITANTE');
            $scope.direccionvirtual = "RC_CLI";
            var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/";
            if (nombre == 'FILE_FOTOCOPIA_CI' && (typeof(obj.files[0]) != 'undefined')) {
                var tipoDocci = obj.files[0].type;
                var nameArrayci = tipoDocci.split('/');
                tipoDocci = nameArrayci[1];
                if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
                    if (tipoDocci == "png" || tipoDocci == "jpg" || tipoDocci == "jpeg" || tipoDocci == "bmp" || tipoDocci == "gif") {
                        var filecompress = compressImage($scope.FILE_FOTOCOPIA_CI).then(function(respuestaci){
                            fileUpload.uploadFileToUrl(respuestaci, uploadUrl);
                            $scope.datos.FILE_FOTOCOPIA_CI = respuestaci.name;
                            $scope.FILE_FOTOCOPIA_CI = respuestaci;
                            $scope.btover=true;
                        });
                    } 
                    else{
                        swal('Advertencia', 'El archivo CEDULA DE IDENTIDAD no es válido, seleccione un archivo de tipo imagen', 'error');
                        document.getElementById('txt_FILE_FOTOCOPIA_CI').value = '';
                        document.getElementById('FILE_FOTOCOPIA_CI').value = '';
                        $scope.datos.FILE_FOTOCOPIA_CI = '';
                        $scope.FILE_FOTOCOPIA_CI = '';
                        valor = '';
                        $.unblockUI();
                    }; 
                }
                else{
                    if (tamaniofile.size <= 500000) {
                        if (tipoDocci == 'png' || tipoDocci == 'jpg' || tipoDocci == 'jpeg' || tipoDocci == 'bmp' || tipoDocci == 'gif') {
                            fileUpload.uploadFileToUrl($scope.FILE_FOTOCOPIA_CI, uploadUrl);
                            $scope.datos.FILE_FOTOCOPIA_CI = $scope.FILE_FOTOCOPIA_CI.name;
                            $scope.btover=true;
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo CEDULA DE IDENTIDAD no es válido, seleccione un archivo de tipo imagen', 'error');
                            document.getElementById('txt_FILE_FOTOCOPIA_CI').value = '';
                            document.getElementById('FILE_FOTOCOPIA_CI').value = '';
                            $scope.datos.FILE_FOTOCOPIA_CI = '';
                            $scope.FILE_FOTOCOPIA_CI = '';
                            valor = '';
                            $.unblockUI();
                        };
                    };
                    if (tamaniofile.size > 15000000) {
                        swal('Advertencia', 'El tamaño de la imagen CEDULA DE IDENTIDAD es muy grande', 'error');
                        document.getElementById('txt_FILE_FOTOCOPIA_CI').value = '';
                        document.getElementById('FILE_FOTOCOPIA_CI').value = '';
                        $scope.datos.FILE_FOTOCOPIA_CI = '';
                        $scope.FILE_FOTOCOPIA_CI = '';
                        valor = '';
                        $.unblockUI();
                    };
                }                    
            } 

            if (nombre == 'FILE_ORDEN_JUDICIAL' && (typeof(obj.files[0]) != 'undefined')) {
                var tipoDocoj = obj.files[0].type;
                var nameArrayci = tipoDocoj.split('/');
                tipoDocoj = nameArrayci[1];
                if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
                    if (tipoDocoj == "png" || tipoDocoj == "jpg" || tipoDocoj == "jpeg" || tipoDocoj == "bmp" || tipoDocoj == "gif") {
                        var filecompress = compressImage($scope.FILE_ORDEN_JUDICIAL).then(function(respuestaci){
                            fileUpload.uploadFileToUrl(respuestaci, uploadUrl);
                            $scope.datos.FILE_ORDEN_JUDICIAL = respuestaci.name;
                            $scope.FILE_ORDEN_JUDICIAL = respuestaci;
                            $scope.btover=true;
                        });
                    } 
                    else{
                        swal('Advertencia', 'El archivo ORDEN JUDICIAL no es válido, seleccione un archivo de tipo imagen', 'error');
                        document.getElementById('txt_FILE_ORDEN_JUDICIAL').value = '';
                        document.getElementById('FILE_ORDEN_JUDICIAL').value = '';
                        $scope.datos.FILE_ORDEN_JUDICIAL = '';
                        $scope.FILE_ORDEN_JUDICIAL = '';
                        valor = '';
                        $.unblockUI();
                    }; 
                }
                else{
                    if (tamaniofile.size <= 500000) {
                        if (tipoDocoj == 'png' || tipoDocoj == 'jpg' || tipoDocoj == 'jpeg' || tipoDocoj == 'bmp' || tipoDocoj == 'gif') {
                            fileUpload.uploadFileToUrl($scope.FILE_ORDEN_JUDICIAL, uploadUrl);
                            $scope.datos.FILE_ORDEN_JUDICIAL = $scope.FILE_ORDEN_JUDICIAL.name;
                            $scope.btover=true;
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo ORDEN JUDICIAL no es válido, seleccione un archivo de tipo imagen', 'error');
                            document.getElementById('txt_FILE_ORDEN_JUDICIAL').value = '';
                            document.getElementById('FILE_ORDEN_JUDICIAL').value = '';
                            $scope.datos.FILE_ORDEN_JUDICIAL = '';
                            $scope.FILE_ORDEN_JUDICIAL = '';
                            valor = '';
                            $.unblockUI();
                        };
                    };
                    if (tamaniofile.size > 15000000) {
                        swal('Advertencia', 'El tamaño de la imagen ORDEN JUDICIAL es muy grande', 'error');
                        document.getElementById('txt_FILE_ORDEN_JUDICIAL').value = '';
                        document.getElementById('FILE_ORDEN_JUDICIAL').value = '';
                        $scope.datos.FILE_ORDEN_JUDICIAL = '';
                        $scope.FILE_ORDEN_JUDICIAL = '';
                        valor = '';
                        $.unblockUI();
                    };
                }                    
            }
            if (nombre == 'FILE_PODER_LEGAL' && (typeof(obj.files[0]) != 'undefined')) {
                var tipoDocoj = obj.files[0].type;
                var nameArrayci = tipoDocoj.split('/');
                tipoDocoj = nameArrayci[1];
                if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
                    if (tipoDocoj == "png" || tipoDocoj == "jpg" || tipoDocoj == "jpeg" || tipoDocoj == "bmp" || tipoDocoj == "gif") {
                        var filecompress = compressImage($scope.FILE_PODER_LEGAL).then(function(respuestaci){
                            fileUpload.uploadFileToUrl(respuestaci, uploadUrl);
                            $scope.datos.FILE_PODER_LEGAL = respuestaci.name;
                            $scope.FILE_PODER_LEGAL = respuestaci;
                            $scope.btover=true;
                        });
                    } 
                    else{
                        swal('Advertencia', 'El archivo PODER DEL REPRESENTANTE LEGAL no es válido, seleccione un archivo de tipo imagen', 'error');
                        document.getElementById('txt_FILE_PODER_LEGAL').value = '';
                        document.getElementById('FILE_PODER_LEGAL').value = '';
                        $scope.datos.FILE_PODER_LEGAL = '';
                        $scope.FILE_PODER_LEGAL = '';
                        valor = '';
                        $.unblockUI();
                    }; 
                }
                else{
                    if (tamaniofile.size <= 500000) {
                        if (tipoDocoj == 'png' || tipoDocoj == 'jpg' || tipoDocoj == 'jpeg' || tipoDocoj == 'bmp' || tipoDocoj == 'gif') {
                            fileUpload.uploadFileToUrl($scope.FILE_PODER_LEGAL, uploadUrl);
                            $scope.datos.FILE_PODER_LEGAL = $scope.FILE_PODER_LEGAL.name;
                            $scope.btover=true;
                            $.unblockUI();
                        } else{
                            swal('Advertencia', 'El archivo PODER DEL REPRESENTANTE LEGAL no es válido, seleccione un archivo de tipo imagen', 'error');
                            document.getElementById('txt_FILE_PODER_LEGAL').value = '';
                            document.getElementById('FILE_PODER_LEGAL').value = '';
                            $scope.datos.FILE_PODER_LEGAL = '';
                            $scope.FILE_PODER_LEGAL = '';
                            valor = '';
                            $.unblockUI();
                        };
                    };
                    if (tamaniofile.size > 15000000) {
                        swal('Advertencia', 'El tamaño de la imagen PODER DEL REPRESENTANTE LEGAL es muy grande', 'error');
                        document.getElementById('txt_FILE_PODER_LEGAL').value = '';
                        document.getElementById('FILE_PODER_LEGAL').value = '';
                        $scope.datos.FILE_PODER_LEGAL = '';
                        $scope.FILE_PODER_LEGAL = '';
                        valor = '';
                        $.unblockUI();
                    };
                }                    
            }
        $.unblockUI();
        },1000);
    };     
    /*******************************************************************************/
    //ALMACENANDO FORMULARIO
    
    $scope.serializarInformacion = function(obj){
        $.blockUI({ css: { 
                    border: 'none', 
                    padding: '10px', 

                    backgroundColor: '#000', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: .5, 
                    color: '#fff' 
                },message: "Espere un momento por favor ..." }); 
        setTimeout(function(){
            var fechactual          = obtFechaActual.obtenerFechaActual();
            var misDocs             = new Array();
            obj.solicitante   = ((typeof(obj.solicitante) == 'undefined' || obj.solicitante == null) ? ""   : obj.solicitante.toUpperCase());
            obj.nombres_t    =  ((typeof(obj.nombres_t)     == 'undefined' || obj.nombres_t == null) ? ""   : obj.nombres_t.toUpperCase());
            obj.primer_apellido_t     = ((typeof(obj.primer_apellido_t)     == 'undefined' || obj.primer_apellido_t == null) ? ""   : obj.primer_apellido_t.toUpperCase());
            obj.segundo_apellido_t       =  ((typeof(obj.segundo_apellido_t)    == 'undefined' || obj.segundo_apellido_t == null) ? ""      : obj.segundo_apellido_t.toUpperCase());
            obj.titular_zona       =    ((typeof(obj.titular_zona)  == 'undefined' || obj.titular_zona == null) ? ""        : obj.titular_zona.toUpperCase());
            obj.titular_via         =   ((typeof(obj.titular_via)       == 'undefined' || obj.titular_via == null) ? ""         : obj.titular_via.toUpperCase());
            obj.nombre         =    ((typeof(obj.nombre)        == 'undefined' || obj.nombre == null) ? ""      : obj.nombre.toUpperCase());
            obj.paterno         =   ((typeof(obj.paterno)       == 'undefined' || obj.paterno == null) ? ""         : obj.paterno.toUpperCase());
            obj.materno         =   ((typeof(obj.materno)       == 'undefined' || obj.materno == null) ? ""         : obj.materno.toUpperCase());
            obj.apellido_casada         =   ((typeof(obj.apellido_casada)       == 'undefined' || obj.apellido_casada == null) ? ""         : obj.apellido_casada.toUpperCase());
            obj.idTramite = sessionService.get('IDTRAMITE');
            if($rootScope.parentescos == 19){
                misDocs.push($scope.FILE_ORDEN_JUDICIAL);
            } else {
                if (sessionService.get('TIPO_PERSONA')=='NATURAL') {
                    misDocs.push($scope.FILE_FOTOCOPIA_CI);
                } else{
                    misDocs.push($scope.FILE_PODER_LEGAL);                        
                };
                            
            }
            $scope.almacenarDocumentos(misDocs);

            var datosSerializados   =  JSON.stringify(obj);
            var datosSerializados1 = datosSerializados.replace(/"/g, "\\$&");

            var idCiudadano         = sessionService.get('IDSOLICITANTE');
            var idTramite           = sessionService.get('IDTRAMITE');
            var idServicio          = sessionService.get('IDSERVICIO');

            var serializarInfo = new reglasnegocio();
            serializarInfo.identificador = 'RCCIUDADANO_80';
            serializarInfo.parametros = '{"id_servicio":"' + idServicio + '","data_json":"' + datosSerializados1 + '","oid_ciudadano":"' + idCiudadano + '","id_usuario":1,"id_trm_form":"' + idTramite + '"}'; 
            
            $scope.btnGuardarForm   =   true;
            $.blockUI();
            serializarInfo.llamarregla(function(results){
                r = JSON.parse(results);
                if (r.error){ 
                    $.unblockUI();
                    alertify.error("Formulario no almacenado");
                    //swal('', "Formulario no almacenado", 'error');
                } else { 
                    $.unblockUI();
                    $scope.$apply();
                    $scope.btnEnviarForm    =   false;
                    $scope.btnGuardarForm   =   false;
                    $scope.btnEnviarFormObito = false;
                    $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                    alertify.success("Formulario almacenado");
                    //swal('', "Formulario almacenado", 'success');
                }
            });
         },300);
    };

    /*******************************************************************************/
    $scope.enviarInformacion = function(obj){
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = sessionService.get('IDUSUARIO');
        var datosform = new reglasnegocio();
        datosform.identificador = 'RCCIUDADANO_160';//57;
        datosform.parametros = '{"id":"' + idTramite + '",frm_tra_enviado":"SI","frm_tra_id_usuario":"' + idUsuario + '","frm_tra_modificado":"' + fechactual + '"}'; 
        datosform.llamarregla(function(data){
            alertify.success("Formulario enviado al G.A.M.L.P.");
            //swal('', 'Formulario enviado al G.A.M.L.P.', 'success');
            $scope.tramitesCiudadano();
            $scope.desabilitado = true;
            $scope.desabilitado =   "disabled";
        })
    };
    /*******************************************************************************/
    //Almacenando servicios
    $scope.adicionarServicioGamlp = function(datos, num){    
        var fecha = new Date();
        var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var sIdServicio = datos;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sFechaTramite = fechactual;
        var idusu = 3;

        var aServicio = new reglasnegocio();
        aServicio.identificador = 'RCCIUDADANO_68';
        aServicio.parametros ='{"frm_tra_dvser_id":"' + sIdServicio + '","frm_tra_id_ciudadano":"' + sIdCiudadano + '","frm_tra_fecha":"' + sFechaTramite + '","frm_tra_enviado":"NO","frm_tra_id_usuario":"' + idusu + '"}';
        aServicio.llamarregla(function(data){
            $.blockUI();
            $scope.tramitesCiudadano('', num);
            $.unblockUI();
            alertify.success("Registro almacenado correctamente");
            //swal('', 'Registro almacenado correctamente', 'success');
            $('#registro').modal('hide');
            $scope.getCaptchasX();
        });    
    }
    /*******************************************************************************/
    $scope.confirmarServicioGamlp = function(dat) {
        if($scope.procesoSeleccionado != ''){
            $scope.adicionarServicioGamlp($scope.procesoSeleccionado);
        }
    }
     $rootScope.TipoAutorizacion1  =   function(DDD){

      if(DDD=='1-F')
      {
        // $scope.btnHelp1=true;
        var vallll='../catastro/img/caso1.png';
      }
        if(DDD=='2-F')
      {
        // $scope.btnHelp1=true;
        var vallll='../catastro/img/caso2.png';
      }
        if(DDD=='3-F')
      {
        // $scope.btnHelp1=true;
        var vallll='../catastro/img/caso3.png';
      }
        if(DDD=='4-F')
      {
        // $scope.btnHelp1=true;
        var vallll='../catastro/img/caso4.png';
      }
        if(DDD=='5-D')
      {

        var vallll='../catastro/img/caso5.png';
      }
      $scope.ooooo = vallll;
    };
    // generador de capcha
    
    $scope.ErrorCapchasXX='';
    $scope.getlimpiareRROR=function()
    {
        $scope.ErrorCapchasXX='';
    }
    
    $scope.getCaptchasX=function(){
     var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function(resultado){
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero = partes[0].substring(1);
            i1=(partes[2]+ "," + partes[3]);
            i2=(partes[4] + "," + partes[5]);
            $scope.imageLNGG = i1.substring(1, i1.length - 1);
            $scope.imageCSTT = i2.substring(1, i2.length - 2);
            var lengua = "";
            if(partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if(partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if(partes[1] == 'G'){
                lengua = 'GUARANI';
            } else if(partes[1] == 'C'){
                lengua = 'CASTELLANO';
            } else {
              console.log("error", partes[1]);
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };
    

    $scope.getCaptchasXX=function(){
        $("#resultadoCC").val("");
        $scope.habGuardar1 = true;
        $scope.validarAdjuntos = true;
        $scope.ErrorCapchasXX = "";
        $scope.SuccesCapchasxx="";
        $scope.valorrandomm = Math.floor(Math.random() * (224 - 1) + 1);
        $scope.resultadoCC="";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function(resultado){
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero1 = partes[0].substring(1);
            i1=(partes[2]+ "," + partes[3]);
            i2=(partes[4] + "," + partes[5]);
            $scope.imageLNGG = i1.substring(1, i1.length - 1);
            $scope.imageCSTT = i2.substring(1, i2.length - 2);
            var lengua = "";
            if(partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if(partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if(partes[1] == 'G'){
                lengua = 'GUARANI';
            } else if(partes[1] == 'C'){
                lengua = 'CASTELLANO';
            } else {
                console.log("error", partes[1]);
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
            $.unblockUI();
        });
    };
    
    $scope.VerificarCapcha = function(responce)
    {
        var captch  = $("#resultadoC").val();
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
            if(json.success[0] == undefined){
             //sweetAlert("", "Error en el captcha intentar de nuevo por favor", "warning");
                $scope.getCaptchasX();
                document.getElementById('resultadoCC').value = '';
                $scope.ErrorCapchasXX='Error en el captcha intentar de nuevo por favor';
            }else{
                $scope.confirmarServicioGamlp(responce);
                $scope.ErrorCapchasXX='';
            }
            $.unblockUI();
        });
    };
    /*$scope.VerificarCapchaa = function(responce)
    {
         var captch  = $("#resultadoCC").val();
                var id = numero;
              var verCaptcha = new captcha();
              verCaptcha.identificador = id;
              verCaptcha.respuesta = captch;
              verCaptcha.verificarCaptcha(function(resultado){
                json = JSON.parse(resultado);
               if(json.success[0] == undefined){
                    $scope.getCaptchasXX();
                    $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
               }else{
                    $scope.serializarInformacion(responce);
                    $scope.ErrorCapcha='';
               }
              });
    };*/


    function verificarKeyPress(captch,datos){
        var id = numero1;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
            var nroregsitros = json.success.length;
            if(nroregsitros == 0){
                $scope.habGuardar1 = true;
                $scope.ErrorCapchasXX = "Verifique el Capcha";
                $scope.SuccesCapchasxx="";
                $scope.$apply();
            }else{
                $scope.habGuardar1 = false;
                //$scope.btnEnviarFormObito = false;
                $scope.ErrorCapchasXX = "";
                $scope.SuccesCapchasxx="Capcha correcto";
                //$scope.serializarInformacion(datos);
                $scope.$apply();
            }
            $.unblockUI();
        });
    }

    var tiemporespuesta = null;

    $scope.VerificarCapchaa = function(datos)
    {
        var captch  = $("#resultadoCC").val();
        if(captch.length == 0)
            $scope.ErrorCapchasXX = "";

        if(captch.length > 3){
            clearTimeout(tiemporespuesta);
            tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch,datos), 1500);
        }
    };

    // ******FIN DE CAPCHA****************
    //Iniciando js
    $scope.$on('api:ready',function(){
        $scope.loginPagoEnLinea();
        $scope.tramitesCiudadano('');
        $scope.recuperandoDatosInicialesCiudadano();
        $scope.getCaptchasX();
    });

    $scope.inicioServicios = function () {
        $scope.loginPagoEnLinea();
        $scope.tramitesCiudadano('');
        $scope.recuperandoDatosInicialesCiudadano();
        $scope.getCaptchasX();
    };
    /************************************************************************************/
    /*$scope.recuperarSerializarInfomacion = function(tramite){
        setTimeout(function(){            
        var sIdTramite = tramite.vtra_id;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
        var sIdServicio = sessionService.get('IDSERVICIO');
        var parametros  = {
                "container":"RC_CLI",
                "folder_path": sIdTramite
        };

        if(sIdCiudadano){
        var datosCiudadano   = new reglasnegocio();
        datosCiudadano.identificador = 'RCCIUDADANO_39';
        datosCiudadano.parametros = '{"sidciudadano":"' + sIdCiudadano + '","sidservicio":"' + sIdServicio + '","sidtramite":"' + sIdTramite + '"}';    
        datosCiudadano.llamarregla(function(results){
        results = JSON.parse(results);   
            if (results == '[]' || results == '[{}]' || results == '[{}]' || results == ' ' || results == '') {
                alertify.warning('No existen datos');
                //swal('','No existen datos','warning');
            } else{
                if(results.length > 0){
                    var datos = JSON.parse(results[0].form_contenido);
                    $scope.publicid =[];
                    $scope.publicid = $scope.datos.publicidad;
                    $rootScope.looo = $scope.datos.INT_AC_latitud;
                    $rootScope.laaa = $scope.datos.INT_AC_longitud;
                    $scope.nroRegistros = datos.length;
                }else{
                    $scope.nroRegistros = 0;
                    $scope.datos = "";
                    $scope.adjuntosArray = "";
                    $scope.iniciandoDatos();
                    sessionService.set('IDTRAMITE', sIdTramite);
                }
                if (tramite.venviado == "SI") {
                    $scope.btnGuardarForm           =   true;
                    $scope.desabilitado             =   true;
                    $scope.botones                  =   null;
                    $scope.cibloq                   =   null;
                } else {
                    $scope.btnGuardarForm   =   false;
                    $scope.desabilitado     =   false;
                    $scope.botones          =   "mostrar";
                    $scope.cibloq           =   "mostrar";
                }

                $rootScope.$broadcast('validarBtnEnviar', results.length);
                $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                $rootScope.$broadcast('inicializarGrillaAE', [{'datos':$scope.datos, 'venviado':tramite.venviado}]);
                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
            };
            });
        }else{
            alert("NO existe id ciudadano");
        }
        },1000);
    };*/
    /************************************************************************************/
    $scope.formTipoPermiso  =   function(stipo){
        if(stipo=="1-F"){
            $scope.PERMISO='F';
        }
        if(stipo=="2-F"){
            $scope.PERMISO='F';
        }
        if(stipo=="3-F"){
            $scope.PERMISO='F';
        }
        if(stipo=="4-F"){
            $scope.PERMISO='F';
        }
        if(stipo=="5-D"){
            $scope.PERMISO='D';
        }
        $scope.TER_TIP_PERMISO = stipo;//$scope.PERMISO;
    };

    $scope.formTipoSolicitud  =   function(stipo){
    $scope.TER_TIP_SOL = stipo;
    };

    $scope.formSolos  =   function(stipo){
    $scope.TER_SOLOS = stipo;
    };

    $scope.formAutoriza  =   function(stipo){
    $scope.TER_2_PROG = stipo;
    };

    $scope.formViajan  =   function(stipo){ //alert(1514);
    $scope.TER_NNA_DEL = stipo;
    $scope.datos.NNA_CANT_MAS=0;
    $scope.datos.NNA_CAN_FEM=0;
    $scope.datos.NNA_CANT_NN=0;
    $scope.datos.NNA_CAN_MAS=0;
    $scope.datos.NNA_CAN_FEM=0;
    $scope.datos.NNA_NRO_ADO=0;
    $scope.datos.NNA_CANT_TOTAL=0;

    };

    $scope.getSeleccionaMunicipios  =   function(stipo){
    $scope.municipio = stipo;
    };
    
    /*****************************************************************/
    $scope.getProvinciasDepto = function(dep){
        var departamento = dep.split("-");
        $scope.depto = departamento[0];
        var resCiudadanos   = new reglasnegocio();
        resCiudadanos.identificador = 'RCCIUDADANO_30';
        resCiudadanos.parametros = '{"prv_dpto_codigo":"'+ departamento[0] + '"}';
        resCiudadanos.llamarregla(function(data){
            data = JSON.parse(data);
            if (results == '[]' || results == '[{}]' || results == '[{ }]' || results == ' ' || results == '') {
                alertify.warning('No existen datos');
                //swal('','No existen datos','warning');
            } else{
                $scope.obtDatos = data;
                if ($scope.municipio != 'undefined' || $scope.municipio != null) {
                    setTimeout(function(){
                        $scope.getSeleccionaMunicipios($scope.municipio);
                        document.getElementById('TER_MIN').value = $scope.municipio;
                    },1000);
                }
            };
        })
    };
    /*****************************************************************/

    $scope.seleccionarTramite = function (tramite) {
        $.blockUI({ css: { 
                    border: 'none', 
                    padding: '10px', 

                    backgroundColor: '#000', 
                    '-webkit-border-radius': '10px', 
                    '-moz-border-radius': '10px', 
                    opacity: .5, 
                    color: '#fff' 
                },message: "Espere un momento por favor ..." }); 
        setTimeout(function(){
            $scope.getCaptchasXX();
            if(document.getElementById('resultadoCC')!= null){
                document.getElementById('resultadoCC').value = '';
                $("#alert").hide();
            }
            $rootScope.tramiteId = tramite.vtra_id;
            sessionService.set('IDTRAMITE', tramite.vtra_id);
            sessionService.set('IDSERVICIO', tramite.vdvser_id);
            sessionService.set('ESTADO', tramite.venviado);
            $scope.template = "";
            $scope.formulario = "mostrar";
            $scope.template = $scope.templates[0];
            if (tramite.vservicio == 'VIAJES') {
                $scope.recuperarInfomacionViajes(tramite);
            } else{
                $scope.recuperarSerializarInfo(tramite);
                //$scope.recuperandoDatosInicialesCiudadano();
            };
            $scope.tramiteSeleccionado   =   tramite.vtra_id;
            var cboTipoCon = document.getElementById("tipo_contribuyente");
            if(cboTipoCon){
                cboTipoCon.style.display = 'none';
            }
         },300);

    };

    $scope.getListache= function(dato)
    {
        $scope.caras = dato;
    }
      $scope.imprSelec = function (nombre) {
        var ficha = document.getElementById(nombre);
        var ventimp = window.open(' ', 'popimpr');
        ventimp.document.write( ficha.innerHTML );
        ventimp.document.close();
        ventimp.print( );
        ventimp.close();
        }

    //MOSTRANDO HISTORIAL DEL TRAMITE
    $scope.mostrarHistorico = function (tramite) {
        $rootScope.tramiteId = tramite.vtra_id;
        sessionService.set('IDTRAMITE', tramite.vtra_id);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        $scope.recuperarSerializarInfo(tramite);
        $scope.template = "";
        $scope.formulario = "mostrar";
        if (tramite.venviado == "SI") {
            $scope.desabilitado = true;
            $scope.template = "";
            $scope.template = $scope.templates[5];//tramite.vdvser_id
        } else {
            $scope.desabilitado = false;
            $scope.template = "";
            $scope.template = $scope.templates[5];//tramite.vdvser_id
        }
        //EXISTE TIPO CONTRIBUYENTE
        var cboTipoCon = document.getElementById("tipo_contribuyente");
        if(cboTipoCon){
            cboTipoCon.style.display = 'none';
        }
    };

    /*DOCUMENTOS MULTIPLES*/
    var idCiu = sessionService.get('IDCIUDADANO');
    $scope.uploader = new FileUploader({
        url: CONFIG.CONEXION_IMAGENES + "?desripcion=ciudadano&&idCiudadano=" + idCiu
    });

    var uploader = $scope.uploader;

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    };

    uploader.onAfterAddingFile = function(fileItem) {
        tipoDocumento = fileItem.file.type;
        var nameArray = tipoDocumento.split('/');
        tipoDocumento = nameArray[1];
        var count = 0;

        if(tipoDocumento == "png" || tipoDocumento == "jpg" || tipoDocumento == "jpeg" || tipoDocumento == "txt" || tipoDocumento == "plain" || tipoDocumento == "zip" || tipoDocumento == "rar" || tipoDocumento == "vnd.ms-word.document.12" || tipoDocumento == "vnd.openxmlformats-officedocument.spreadsheetml.sheet" || tipoDocumento == "vnd.visio" || tipoDocumento == "vnd.ms-publisher" || tipoDocumento == "msaccess" || tipoDocumento == "vnd.openxmlformats-officedocument.wordprocessingml.document"){
            $scope.botonSubirOriginal = null;
            $scope.botonSubirError = "oculta";
        }
        else{
            $scope.botonSubirError = null;
            $scope.botonSubirOriginal = "oculta";
        }
    };

    $scope.falla = function()
    {
        alertify.error("Tipo de archivo incorrecto elimine por favor...");
        //swal('', "Tipo de archivo incorrecto elimine por favor...", 'error');
        $scope.desabilitado2 = true;
    }

    var archivoUpload = "";

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //FORMANDO LA URL - ARCHIVO
        $scope.direccionvirtual = "RC_CLI";
        var urlIdcos = CONFIG.CONEXION_IMAGENES + "/files/" + $scope.direccionvirtual + "/" + $rootScope.tramiteId + "/" + fileItem._file.name + "?app_name=todoangular";
        var fileName = fileItem._file.name;
        var fileSize = (((fileItem._file.size)/1024)/1024);
        fileSize = fileSize.toFixed(2);
        if($scope.datos.ARCHIVOS_MULTIPLES){
            aDocAdjuntos = $scope.datos.ARCHIVOS_MULTIPLES;
        }else{
            aDocAdjuntos    =   new Array();
        }

        var datosAdjuntos = {
            "nombre_archivo" : fileName,
            "tam_archivo" : fileSize,
            "estado_archivo" : "Env.",
            "opcion_archivo" : "-",
            "url_archivo" : urlIdcos
        };
        aDocAdjuntos.push(datosAdjuntos);
        $scope.adjuntosArray = aDocAdjuntos;
        var aFile = new Array();
        aFile.push(fileItem._file);
        $scope.almacenarDocumentos(aFile);
        fileItem.remove();
        $scope.datos.ARCHIVOS_MULTIPLES = aDocAdjuntos;
        //VALIDANDO FECHAS OBLIGATORIAS
        $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
    };

    /*VALIDANDO BOTONES*/
    var clsValidarBtn = $rootScope.$on('validarBtn', function(event, data){
        if(data.frm_tra_id){
            $scope.tramitesCiudadano();
        }
    });
    $scope.$on('$destroy', function() {
        clsValidarBtn();
    });
	
	$scope.ejecutarFile = function(idfile){
        var sid =   document.getElementById(idfile);
        if(sid){
            document.getElementById(idfile).click();
        }else{
            alert("Error ");
        }
    }; 

	

    $scope.eliminarMultipleAdjunto = function(sIndex){
        if($scope.datos.ARCHIVOS_MULTIPLES){
            $scope.adjuntosArray = $scope.datos.ARCHIVOS_MULTIPLES;
        }
        if($scope.adjuntosArray){
            $scope.adjuntosArray.splice(sIndex, 1);
        }
        //$scope.adjuntoObligatorio       =   true;
        //$scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #FF4040;";
        $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
    };
    /*----------------*/
    $scope.bloquearForm = function(){
        $scope.desabilitado = true;
    };
    $scope.desBloquearForm = function(){
        $scope.desabilitado = false;
    };

    $scope.cambioServicio = function(dat) {
        $scope.servicio = dat;
    }
    $scope.combo = "<select id='servicio' class='seleccionaServicio'>  <option value='1'>Internet</option> <option value='3'>Salud</option> <option value='4'>Publicidad</option> </select> <br>";

    ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
        try{
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        catch (e) { console.log("error", e); }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //Boton de confirmacion
app.directive("confirmButton", function($document, $parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var buttonId, html, message, nope, title, yep;
            buttonId = Math.floor(Math.random() * 10000000000);
            attrs.buttonId = buttonId;
            message = attrs.message || "Are you sure?";
            yep = attrs.yes || "Yes";
            nope = attrs.no || "No";
            title = attrs.title || "Crear nuevo tramite";
            html = "<div style='width:190px;' id=\"button-" + buttonId + "\">\n " + scope.combo + "<span class=\"confirmbutton-msg\">" + message + "</span><br>\n   <button ng-disabled='frmServicio.$invalid' data-dismiss='modal' class=\"confirmbutton-yes btn btn-success\">" + yep + "</button>\n    <button class=\"confirmbutton-no btn btn-danger\">" + nope + "</button> \n</div>";
            element.popover({
                content: html,
                html: true,
                trigger: "manual",
                title: title
            });
            return element.bind('click', function(e) {
                var dontBubble, pop;
                dontBubble = true;
                e.stopPropagation();
                element.popover('show');
                pop = $("#button-" + buttonId);
                pop.closest(".popover").click(function(e) {
                    if (dontBubble) {
                        e.stopPropagation();
                    }
                });
                pop.find('.seleccionaServicio').change(function(e) {
                    scope.cambioServicio(servicio.value);
                });
                pop.find('.confirmbutton-yes').click(function(e) {
                    dontBubble = false;
                    var func = $parse(attrs.confirmButton);
                    func(scope);
                });
                pop.find('.confirmbutton-no').click(function(e) {
                    dontBubble = false;
                    $document.off('click.confirmbutton.' + buttonId);
                    element.popover('hide');
                });

                $document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function() {
                  $document.off('click.confirmbutton.' + buttonId);
                  element.popover('hide');
                });
            });
        }
    };
});

};
