app.controller('serviciosArboladoController', function ($scope, $timeout, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG,  $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,$window) {
    
    //console.log("datos del solicitante nombres",$scope.datos);
    //console.log('ARBOLADO');
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var fechactual123=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
    $rootScope.nombreee= '';
    $rootScope.maternoo= '';
    $rootScope.paternoo= '';
    var contador2=0;
    var contador3=0;
    var contador22=0;
    var contador33=0;
    $scope.txtMsgConexionGen    =   '';
    $scope.txtCiudadanoExiste   =   '';
    $rootScope.looo =   '';
    $rootScope.laaa =   '';
    $scope.mostrarMsgActividadTrue  = false;
    $scope.mostrarMsgActividadFalse = false;
    $scope.tablaTramites        =   {};
    $scope.tramitesUsuario      =   [];
    $scope.servicio = 1;
    $scope.datosGuardados = false;
    var stiporol = sessionService.get('US_IDROL');
    $scope.template     =   "";
    var aDocAdjuntos    =   new Array();
    
    $scope.templates = [ { name: 'template0.html', url: '../../../app/view/servicios/arbolado/index.html'} ];
    $scope.serivicosInternet = [
        { name: 'Solicitud de mantenimiento arbolado', id:'46'}
    ];

    $scope.tramitesCiudadano = function() {
        $.blockUI();
        try{
            sIdCiudadano = sessionService.get('IDSOLICITANTE');
            var Parametros = new datosFormularios();
            Parametros.frm_tra_id_ciudadano = sIdCiudadano;
            //console.log("111111111111111111111111111");
            Parametros.spbusquedaformularioArbolado(function(results){
                results = JSON.parse(results);
                $scope.tramitesUsuario = results.success;
                $scope.tablaTramites.reload();
                $.unblockUI();
            });
         }catch(e){
            //console.log("Error...!",e);
            $.unblockUI();
        }
    };
    

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
    
    $scope.adicionarServicioGamlp = function(datos){
        try {
            $.blockUI();
            var fecha= new Date();
            var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
            var sIdServicio = datos;
            var sIdCiudadano = sessionService.get('IDSOLICITANTE');
            var sFechaTramite = fechactual;
            var Parametros = new datosFormularios();
                Parametros.frm_tra_dvser_id = sIdServicio;
                Parametros.frm_tra_id_ciudadano = sIdCiudadano;
                Parametros.frm_tra_fecha = sFechaTramite;
                Parametros.frm_tra_enviado = "NO";
                Parametros.frm_tra_registrado = sFechaTramite;
                Parametros.frm_tra_modificado = sFechaTramite;
                Parametros.frm_tra_id_usuario = 3;
                Parametros.crearTramiteIgob(function(results){
                    $scope.tramitesCiudadano();
                    $.unblockUI();
                    swal('Registro creado correctamente', '');
                    //sweet.show('', 'Registro almacenado correctamente', 'success');
                    $('#registro').modal('hide');
                });
            $.unblockUI();
        } catch(e) {
            //console.log(e);
            $.unblockUI();
        }
    };
    ///////////miriam/oculta popup//
    
    $scope.crearTramiteArbolado = function()
    {
        if($scope.serivicosInternet)
        {
            var idTipoTramite = $scope.serivicosInternet[0].id;
            $scope.adicionarServicioGamlp(idTipoTramite);
            
            
            div = document.getElementById('popup');
            //div.style.display = 'none';

            div = document.getElementById('vectorSourceArbol');
            //div.style.display = 'hide';
            
            
        }
    };
           
    $scope.recuperarSerializarInfo = function(tramite) {
        //console.log("vida3");
        var sIdTramite = tramite.vtra_id;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sIdServicio = sessionService.get('IDSERVICIO');
        var parametros  = {
                "container":"RC_CLI",
                "folder_path": sIdTramite
        };
        if(sIdCiudadano){
            try {
                $.blockUI();
                var Parametros = new datosFormularios();
                Parametros.frm_tra_id_ciudadano = sIdCiudadano;
                Parametros.frm_tra_dvser_id     = sIdServicio;
                Parametros.frm_idTramite        = sIdTramite;
                Parametros.splistafrmdatos(function(results){
                    results = JSON.parse(results);
                    results = results.success;
                    if(results.length > 0){
                        datos = JSON.parse(results[0].form_contenido);
                        $scope.adjuntosArray = datos.ARCHIVOS_MULTIPLES;
                        $scope.datos = datos;
                        $scope.publicid =[];
                        $scope.publicid = $scope.datos.publicidad;
                        $rootScope.looo = $scope.datos.INT_AC_latitud;
                        $rootScope.laaa = $scope.datos.INT_AC_longitud;
                        $scope.nroRegistros = datos.length;
                    }else{
                        $scope.nroRegistros  = 0;
                        $scope.datos         = "";
                        $scope.adjuntosArray = "";
                        $scope.iniciandoDatos();
                        sessionService.set('IDTRAMITE', sIdTramite);
                    }
                    if (tramite.venviado == "SI") {
                        $rootScope.btnGuardarForm    =   true;
                        $scope.desabilitado          =   true;
                        $rootScope.botones           =   null;
                    } else {
                        $rootScope.btnGuardarForm    =   false;
                        $scope.desabilitado          =   false;
                        $rootScope.botones           =   "mostrar";
                    }
                    $rootScope.$broadcast('validarBtnEnviar', results.length);
                    $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                    $rootScope.$broadcast('inicializarGrillaAE', [{'datos':$scope.datos, 'venviado':tramite.venviado}]);
                    $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                    $.unblockUI();
                });
            }catch(e){
                //console.log("Error...!",e);
                $.unblockUI();
            }
        }else{
            sweetAlert('','Complete Todos Los Datos Obligatorios','error');
        }
    };

    $scope.recuperarInfomacionArbolado = function(tramite){
        //console.log("vida2");
        
        setTimeout(function()
        {    
            if (tramite.venviado == "SI")
            {
                $scope.desabilitado = true;
                $rootScope.btnViajes = null;
            }
            else
            {
                $scope.desabilitado = false;
                $rootScope.btnViajes = "mostrar";
            }
            var sIdTramite = tramite.vtra_id;
            var sIdCiudadano = sessionService.get('IDSOLICITANTE');
            var sIdServicio = sessionService.get('IDSERVICIO');
            var parametros  = {
                    "container":"RC_CLI",
                    "folder_path": sIdTramite
            };
            if(sIdCiudadano)
            {
                try {
                    $.blockUI();
                    var Parametros = new datosFormularios();
                    Parametros.frm_tra_id_ciudadano = sIdCiudadano;
                    Parametros.frm_tra_dvser_id     = sIdServicio;
                    Parametros.frm_idTramite        = sIdTramite;
                    Parametros.splistafrmdatos(function(results){
                        results = JSON.parse(results);
                        results = results.success;
                        //console.log(results);
                        if(results.length > 0){
                            var datos = JSON.parse(results[0].form_contenido);
                            //console.log("HOLAAAAAAAAFFFFFFF",datos);
                            if(datos.longitud == "")
                            {
                               
                                map.getView().setCenter(ol.proj.fromLonLat([-68.133605,-16.495745]));
                                map.getView().setZoom(20);
                            }

                            if(datos.longitud != "")
                            {
                                //console.log("longitud",datos.longitud);
                                //console.log("latitud",datos.latitud);
                                /////////////////////////////////
                                $scope.longitud=parseFloat(datos.longitud);
                                $scope.latitud=parseFloat(datos.latitud);
                                map.getView().setCenter(ol.proj.fromLonLat([$scope.longitud,$scope.latitud]));
                                map.getView().setZoom(20);

                                vectorSourceArbol_centreado.clear();
                                var feature_a = new ol.Feature(
                                    new ol.geom.Point(ol.proj.fromLonLat([$scope.longitud,$scope.latitud]))
                                );
                                feature_a.setStyle(iconStyle);
                                vectorSourceArbol_centreado.addFeature(feature_a);
                                setTimeout(function(){
                                    vectorSourceArbol_centreado.clear(); 
                                }, 1500);

                                $scope.longitud=datos.longitud;
                                $scope.latitud=datos.latitud;
                            }
                           
                            /////////////////////////////////
                             
                            $scope.datos = datos;
                            $scope.nroRegistros = datos.length;
                            $scope.habilitarEnvioTramite(datos);
                            $scope.imagenPortada = datos.Imagen; 
                            $scope.$apply();
                        } else {
                            $scope.nroRegistros = 0;
                            $scope.datos = [];
                            $scope.adjuntosArray = "";
                            $scope.iniciandoDatos();
                            sessionService.set('IDTRAMITE', sIdTramite);
                            $scope.habilitarEnvioTramite($scope.datos);
                        }
                        if (tramite.venviado == "SI") {
                            $rootScope.btnGuardarForm = true;
                            $scope.desabilitado = true;
                            $rootScope.botones  = null;
                        } else {
                            $rootScope.btnGuardarForm   =   false;
                            $scope.desabilitado = false;
                            $rootScope.botones  = "mostrar";
                        }
                        $rootScope.$broadcast('validarBtnEnviar', results.length);
                        $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                        $rootScope.$broadcast('inicializarGrillaAE', [{'datos':$scope.datos, 'venviado':tramite.venviado}]);
                        $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                        $.unblockUI();
                    });
                }catch(e){
                    //console.log("Error...!",e);
                    $.unblockUI();
                }
            }else{
                alert("NO existe id ciudadano");
            }
        },1100);    
    };

    $scope.seleccionarTramiteA = function (tramite) {
        //console.log("TRAMITE...",tramite);
        $scope.tramiteSelect = tramite;
        $rootScope.tramiteId = tramite.vtra_id;
        sessionService.set('IDTRAMITE', tramite.vtra_id);
        sessionService.set('IDSERVICIO', tramite.vdvser_id);
        sessionService.set('ESTADO', tramite.venviado);
        $scope.template = "";
        $scope.formulario = "mostrar";
        if (tramite.venviado == "SI") {
            $rootScope.btnViajes = null;
            $scope.desabilitado = true;
            $scope.$apply();
            $scope.template = $scope.templates[0];
        } else {
            $rootScope.btnViajes = "mostrar";
            $scope.desabilitado = false;
            //$scope.$apply();
            $scope.template =   $scope.templates[0];
        }
        if (tramite.vservicio == 'ARBOLADO') {
            $scope.recuperarInfomacionArbolado(tramite);
        } 
        $scope.tramiteSeleccionado   =   tramite.vtra_id;
        var cboTipoCon = document.getElementById("tipo_contribuyente");
        if(cboTipoCon){
            cboTipoCon.style.display = 'none';
        }    
    };

    ///////seleccionarUbicacionMapa///////////////////////////////////////////
    $scope.centreada = function() 
    {
        if($scope.serivicosInternet)
        {
            var idTipoTramite = $scope.serivicosInternet[0].id;
            $scope.adicionarServicioGamlp(idTipoTramite);
        }
    };

    //RECUPERANDO DATOS DEL REGISTRO CIUDADANO
    $scope.recuperandoDatosInicialesCiudadano = function()
    {
        $rootScope.datosIniciales = "";
        var datosForm = {};
        var idCiudadano = sessionService.get('IDSOLICITANTE');
        var sTipoPersona = "";
        var recuperarDatos = new rcNatural();
        recuperarDatos.oid = idCiudadano;
        recuperarDatos.datosCiudadanoNatural(function(resultado)
        {
            //console.log("RESULTADO...",resultado);
            resultadoApi = JSON.parse(resultado);
            datos           =   resultadoApi;
            sTipoPersona    =   resultadoApi[0].dtspsl_tipo_persona;
            $scope.sTipoPersona    =   resultadoApi[0].dtspsl_tipo_persona;
            fechactual      =   fecha.getFullYear() + "/" + fecha.getMonth() + "/" + fecha.getDate();
            if(sTipoPersona == 'NATURAL') {
                datosForm['ARB_OID'] = datos[0].dtspsl_id;
                datosForm['ARB_CI'] = datos[0].dtspsl_ci;
                datosForm['ARB_NOMBRE'] = datos[0].dtspsl_nombres;
                datosForm['ARB_PATERNO'] = datos[0].dtspsl_paterno;
                datosForm['ARB_MATERNO'] = datos[0].dtspsl_materno;
                datosForm['ARB_MACRO'] =datos[0].dtspsl_Macrodistrito;
                //////////////////////////////////////////////////////////////////////
                datosForm['ARB_DIRECCION'] = datos[0].dtspsl_direccion;
                datosForm['ARB_DOMICILIO'] = datos[0].dtspsl_domicilio;
                datosForm['ARB_CELULAR'] =datos[0].dtspsl_movil;
                datosForm['ARB_TELEFONO'] =datos[0].dtspsl_telefono;
            }else{
               //console.log('Preguntar si empresas podran pedir el servicio');
            }
            
            $rootScope.datosIniciales = datosForm;
        });
    };
    
    $scope.iniciandoDatos = function() {
        var datosIniciales = $rootScope.datosIniciales;
        //console.log($rootScope.datosIniciales);
        var fechactual  =   obtFechaActual.obtenerFechaActual();
        $scope.datos = {};
        var datosForm_inicio = {};
        datosForm_inicio['ARB_OID'] = datosIniciales.ARB_OID;
        datosForm_inicio['ARB_CI'] = datosIniciales.ARB_CI;
        datosForm_inicio['ARB_NOMBRE'] = datosIniciales.ARB_NOMBRE;
        datosForm_inicio['ARB_PATERNO'] = datosIniciales.ARB_PATERNO;
        datosForm_inicio['ARB_MATERNO'] = datosIniciales.ARB_MATERNO;
        datosForm_inicio['ARB_MACRO'] = datosIniciales.ARB_MACRO;
        datosForm_inicio['ARB_DIRECCION'] = datosIniciales.ARB_DIRECCION;
        datosForm_inicio['ARB_DOMICILIO'] = datosIniciales.ARB_DOMICILIO;
        datosForm_inicio['ARB_CELULAR'] =datosIniciales.ARB_CELULAR;
        datosForm_inicio['ARB_TELEFONO'] =datosIniciales.ARB_TELEFONO;
        $scope.datos = datosForm_inicio;
        $scope.$apply();
    };

    $scope.serializarArbolado = function(obj)
    {
        var fechactual          = obtFechaActual.obtenerFechaActual();
        var misDocs             = new Array();
        /////CONVIRTIENDO LOS CAMPOS A MAYUSCULAS
        var arbCI = document.getElementById('ARB_CI').value;
        var arbOID = document.getElementById('ARB_OID').value;
        var arbNombre = document.getElementById('ARB_NOMBRE').value;
        var arbPaterno = document.getElementById('ARB_PATERNO').value;
        var arbMaterno = document.getElementById('ARB_MATERNO').value;
        var arbDireccion = document.getElementById('ARB_DIRECCION').value;
        var arbDomicilio = document.getElementById('ARB_DOMICILIO').value;
        var arbCelular = document.getElementById('ARB_CELULAR').value;
        var arbTelefono = document.getElementById('ARB_TELEFONO').value;

        var arbMacrodistrito = document.getElementById('ARB_MACRO').value;
        var arbDistrito = document.getElementById('ARB_DISTRITO').value;
        var arbZona = document.getElementById('ARB_ZONA').value;
        var arbEspecie = document.getElementById('ARB_ESPECIE').value;
        var arbRngDeAltura = document.getElementById('ARB_RNG_ALTURA').value;
        var arbFuste = document.getElementById('ARB_FUSTE').value;
        var arbUbicacion = document.getElementById('ARB_UBICACION').value;
        var arbMedidaDeTazon = document.getElementById('ARB_MEDIDA_TAZON').value;
        var arbFechaDatos = document.getElementById('ARB_FECHA_DATOS').value;
        var arbEstadoFisico = document.getElementById('ARB_STADO_FISICO').value;
        var arbFitosanidad = document.getElementById('ARB_FITOSANIDAD').value;
        var arbPresenciaDePlaga = document.getElementById('ARB_PRESENCIA_PLAGA').value;
        var arbArbolIntervenidoDePoda = document.getElementById('ARB_ARB_INTERVENIDO_DE_PODA').value;
        var arbLevntDeRaizDeAcera = document.getElementById('ARB_LEVNT_DE_RAIZ_DE_ACERA').value;
        var arbLineaDeServAtraviesaCopa = document.getElementById('ARB_LINEA_DE_SERV_ATRAVIESA_COPA').value;
        var arbLineaDeServAtraviesaCopaRamaDeArbMuerto = document.getElementById('ARB_LINEA_DE_SERV_ATRAVIESA_COPA_O_RAMA_DE_ARBOL_MUERT').value;
        var arbCondicionDelTazon = document.getElementById('ARB_CONDICION_DEL_TAZON').value;
        var longitud = document.getElementById('longitud').value;
        var latitud = document.getElementById('latitud').value;
        var Imagen = document.getElementById("imgSalida").src;
        //console.log("QQQQQQQQQQQQQQQQQ",Imagen);
        var foto = document.getElementById("div_foto").value;
        //console.log("RRRRRRRRRRRRRRRRR",foto);

        var Solicitud = document.getElementById('div_Solicitud').value;

        
        //var f64 = $scope.getBase64FromImageUrl(foto);


        obj.ARB_CI =   ((typeof(arbCI) == 'undefined' || arbCI == null) ? "" : arbCI);
        obj.ARB_OID =   ((typeof(arbOID) == 'undefined' || arbOID == null) ? "" : arbOID);
        obj.ARB_NOMBRE =   ((typeof(arbNombre) == 'undefined' || arbNombre == null) ? "" : arbNombre);
        obj.ARB_PATERNO =   ((typeof(arbPaterno) == 'undefined' || arbPaterno == null) ? "" : arbPaterno);
        obj.ARB_MATERNO =   ((typeof(arbMaterno) == 'undefined' || arbMaterno == null) ? "" : arbMaterno);
        obj.ARB_DIRECCION =  ((typeof(arbDireccion) == 'undefined' || arbDireccion == null) ? "" : arbDireccion);
        obj.ARB_DOMICILIO =  ((typeof(arbDomicilio) == 'undefined' || arbDomicilio == null)? "" :arbDomicilio);
        obj.ARB_CELULAR =   ((typeof(arbCelular) == 'undefined' || arbCelular == null)? "" :arbCelular);
        obj.ARB_TELEFONO =   ((typeof(arbTelefono) == 'undefined' || arbTelefono == null)? "" :arbTelefono);

        obj.ARB_TIPO_DE_ARBOL =   ((typeof(arbTipoDeArbol) == 'undefined' || arbTipoDeArbol == null) ? "" : arbTipoDeArbol);
        obj.ARB_MACRO =   ((typeof( arbMacrodistrito) == 'undefined' ||  arbMacrodistrito == null) ? "" :  arbMacrodistrito);
        obj.ARB_DISTRITO =   ((typeof( arbDistrito) == 'undefined' ||  arbDistrito == null) ? "" :  arbDistrito);
        obj.ARB_ZONA =   ((typeof( arbZona) == 'undefined' ||  arbZona == null) ? "" :  arbZona);
        obj.ARB_ESPECIE =   ((typeof( arbEspecie) == 'undefined' ||  arbEspecie == null) ? "" :  arbEspecie);
        obj.ARB_RNG_ALTURA =   ((typeof( arbRngDeAltura) == 'undefined' ||  arbRngDeAltura == null) ? "" :  arbRngDeAltura);
        obj.ARB_FUSTE =   ((typeof( arbFuste) == 'undefined' ||  arbFuste == null) ? "" : arbFuste);
        obj.ARB_UBICACION =   ((typeof( arbUbicacion) == 'undefined' ||  arbUbicacion == null) ? "" : arbUbicacion);
        obj.ARB_MEDIDA_TAZON =   ((typeof( arbMedidaDeTazon) == 'undefined' || arbMedidaDeTazon == null) ? "" : arbMedidaDeTazon);
        obj.ARB_FECH_DATOS =   ((typeof( arbFechaDatos) == 'undefined' || arbFechaDatos == null) ? "" : arbFechaDatos);
        obj.ARB_STADO_FISICO =   ((typeof( arbEstadoFisico) == 'undefined' || arbEstadoFisico == null) ? "" :   arbEstadoFisico);
        obj.ARB_FITOSANIDAD =   ((typeof( arbFitosanidad) == 'undefined' || arbFitosanidad == null) ? "" :   arbFitosanidad);
        obj.ARB_PRESENCIA_PLAGA =   ((typeof( arbPresenciaDePlaga) == 'undefined' || arbPresenciaDePlaga == null) ? "" :arbPresenciaDePlaga);
        obj.ARB_ARB_INTERVENIDO_DE_PODA =   ((typeof( arbArbolIntervenidoDePoda) == 'undefined' || arbArbolIntervenidoDePoda == null) ? "" :arbArbolIntervenidoDePoda);
        obj.ARB_LEVNT_DE_RAIZ_DE_ACERA =   ((typeof( arbLevntDeRaizDeAcera) == 'undefined' || arbLevntDeRaizDeAcera == null) ? "" :arbLevntDeRaizDeAcera);
        obj.ARB_LINEA_DE_SERV_ATRAVIESA_COPA =   ((typeof( arbLineaDeServAtraviesaCopa) == 'undefined' || arbLineaDeServAtraviesaCopa == null) ? "" :arbLineaDeServAtraviesaCopa);
        obj.ARB_LINEA_DE_SERV_ATRAVIESA_COPA_O_RAMA_DE_ARBOL_MUERT =   ((typeof( arbLineaDeServAtraviesaCopaRamaDeArbMuerto) == 'undefined' || arbLineaDeServAtraviesaCopaRamaDeArbMuerto == null) ? "" :arbLineaDeServAtraviesaCopaRamaDeArbMuerto);
        obj.ARB_CONDICION_DEL_TAZON =   ((typeof( arbCondicionDelTazon) == 'undefined' || arbCondicionDelTazon == null) ? "" :   arbCondicionDelTazon);
        obj.longitud =   ((typeof( longitud) == 'undefined' || longitud == null) ? "" :   longitud);
        obj.latitud =   ((typeof( latitud) == 'undefined' || latitud == null) ? "" :   latitud);
        obj.Imagen =   ((typeof( Imagen) == 'undefined' || Imagen == null) ? "" :   Imagen);
        obj.foto =   ((typeof( foto) == 'undefined' || foto == null) ? "" : foto);
        obj.Solicitud =   ((typeof( Solicitud) == 'undefined' || Solicitud == null) ? "" :   Solicitud);
    
        //RECUPERANDO ADJUNTOS
        try {
            var datosSerializados   =  JSON.stringify(obj);
            var idCiudadano         = sessionService.get('IDSOLICITANTE');
            var idTramite           = sessionService.get('IDTRAMITE');
            var idServicio          = sessionService.get('IDSERVICIO');
            var Parametros = new datosFormularios();
            Parametros.frm_tra_dvser_id = idServicio;
            Parametros.data_json = datosSerializados;
            Parametros.frm_tra_id_ciudadano = idCiudadano;
            Parametros.frm_tra_id_usuario = 1;
            Parametros.frm_idTramite = idTramite;
            $rootScope.btnGuardarForm   =   true;
            $.blockUI();
           
            Parametros.sp_crear_datos_formulario(function(results)
            {
                results = JSON.parse(results);
                results = results.success;
                if(results.length > 0)
                {
                    $.unblockUI();
                    $rootScope.btnEnviarForm    =   false;
                    $rootScope.btnGuardarForm   =   false;
                    $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                    //sweet.show('', "Formulario almacenado", 'success');
                    swal('', "Formulario almacenado", 'success');

                }
                else
                {
                    $.unblockUI();
                    swal('', "Formulario no almacenado", 'error');
                    //sweet.show('', "Formulario no almacenado", 'error');
                }
            });
        }
        catch(e){
            //console.log("Error******..",e);
            $.unblockUI();
        }
    };
    //////////////////////////////////////////////////////
    /*
    $scope.getBase64FromImageUrl = function (URL) {
       var img = new Image();
       img.setAttribute('crossOrigin', 'Anonymous');
       img.src = URL;
       img.onload = function ()
       {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;

            var ctx = canvas.getContext("2d").drawImage(this, 0, 0);

            var dataURL = canvas.toDataURL("image/png");
            console.log("Data URL");
            console.log(dataURL);
            console.log("BAse 64--->>");
            console.log(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
            return(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));            //--this will contain you base64 Image
        };
    }
    */
    //////////////////////////////////////////////////////
    
    $scope.habilitarEnvioTramite = function(datos){
        //console.log(datos);
        try{
            if(datos.ARB_TIPO_DE_ARBOL.length==0 ) {
                $rootScope.btnEnviarFormPermisos = false;
            } else {
                $rootScope.btnEnviarFormPermisos = true;
            }
            
        } catch(error) {
            $rootScope.btnEnviarFormPermisos = false;
        }
    };
   
    ////////////////////////////////////////////////////////////////
    $scope.VerificarArbolado = function(responce) {
        $scope.serializarArbolado(responce);
        $scope.habilitarEnvioTramite(responce);
    };

    $scope.almacenarDocumentos = function(aFiles) {
        var sDirTramite = $rootScope.tramiteId;
        $scope.direccionvirtual = "RC_CLI";
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
        angular.forEach(aFiles, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                var urlIdcos = "http://192.168.5.141:80/rest/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/" + archivo.name + "?app_name=todoangular";
                fileUpload.uploadFileToUrl(archivo, uploadUrl);
                $scope.almacenarGDocumental(archivo, urlIdcos);
            }else{
                //console.log("error en el archivo");
            }
        });
    };

    $scope.validarFormProcesos = function(datosForm){
        //console.log("ddddd",datosForm);
        try {
            var idTramite = sessionService.get('IDTRAMITE');
            nroTramiteEnviado = sessionService.get('NROTRAMITE');
            idUsuario = 4;
            var tramiteIgob = new datosFormularios();
            tramiteIgob.frm_idTramite = idTramite;
            tramiteIgob.frm_tra_enviado = "SI";
            tramiteIgob.frm_tra_if_codigo = nroTramiteEnviado;
            tramiteIgob.frm_tra_id_usuario = idUsuario;
            tramiteIgob.validarFormProcesos(function(resultado){
                nroTramiteEnviado = sessionService.get('NROTRAMITE');
                swal('Señor Ciudadano su Nro de trámite  es : ' + nroTramiteEnviado, " NOTA: Tiene 7 días para aproximarse a la plataforma DNA terminal con su respectiva documentación, caso contrario su registro será dado de baja.", 'success');
                //sweet.show('Señor Ciudadano su Nro de trámite  es : ' + nroTramiteEnviado, " NOTA: Tiene 7 días para aproximarse a la plataforma DNA terminal con su respectiva documentación, caso contrario su registro será dado de baja.");
                //console.log(datosForm);
                $rootScope.btnViajes = null;
                $scope.desabilitado = true;
            });
        } catch(e) {
            //console.log("Error ", e);
            swal('', 'Registro no modificado', 'error');
            //sweet.show('', 'Registro no modificado', 'error');
        }
    };

    $scope.enviarFormArbolado = function(paramForm){
            //console.log("esto se enviaaa paramForm",paramForm);
            $rootScope.btnGuardarForm = true;
            var idProcodigo = 'ARB_';
            var datosNeXO = {};
            datosNeXO['g_tipo'] = "ARB_";
            datosNeXO['G_CI'] = sessionService.get('IDSOLICITANTE');
            fecha = new Date();
            datosNeXO['G_FECHA'] = fecha;
            datosNeXO['G_LUGAR'] = sessionService.get('LUGARTRABAJO');
            datosNeXO['G_MACRO'] = sessionService.get('MACROTRABAJO');
            datosNeXO['G_USUARIO'] = sessionService.get('USUARIO');
            datosNeXO['ARB_CI'] = paramForm.ARB_CI;
            datosNeXO['INT_AC_MACRO_ID'] = 0;
            datosNeXO['ARB_OID'] = paramForm.ARB_OID;
            datosNeXO['ARB_CI'] = paramForm.ARB_CI;
            datosNeXO['ARB_NOMBRE'] = paramForm.ARB_NOMBRE;
            datosNeXO['ARB_PATERNO'] = paramForm.ARB_PATERNO;
            datosNeXO['ARB_MATERNO'] = paramForm.ARB_MATERNO;
            datosNeXO['ARB_MACRO'] = paramForm.ARB_MACRO;
            datosNeXO['ARB_DIRECCION'] = paramForm.ARB_DIRECCION;
            datosNeXO['ARB_DOMICILIO'] = paramForm.ARB_DOMICILIO;
            datosNeXO['ARB_CELULAR'] = paramForm.ARB_CELULAR;
            datosNeXO['ARB_TELEFONO'] = paramForm.ARB_TELEFONO;
            /////modificacion nuevo//////
            datosNeXO['ARB_DISTRITO'] = paramForm.ARB_DISTRITO;
            datosNeXO['ARB_ZONA'] = paramForm.ARB_ZONA;
            //console.log("ZZZZZZZZZZZZZ",paramForm.ARB_ZONA);
            datosNeXO['ARB_ESPECIE'] = paramForm.ARB_ESPECIE;
            datosNeXO['ARB_RNG_ALTURA'] = paramForm.ARB_RNG_ALTURA;
            datosNeXO['ARB_ANCHO_DE_ACERA'] = paramForm.ARB_ANCHO_DE_ACERA;
            datosNeXO['ARB_UBICACION'] = paramForm.ARB_UBICACION;
            datosNeXO['ARB_ANCHO_ACERA'] = paramForm.ARB_ANCHO_ACERA;
            datosNeXO['ARB_MEDIDA_TAZON'] = paramForm.ARB_MEDIDA_TAZON;
            datosNeXO['ARB_FECHA_DATOS'] = paramForm.ARB_FECHA_DATOS;
            datosNeXO['ARB_STADO_FISICO'] = paramForm.ARB_STADO_FISICO;
            datosNeXO['ARB_FITOSANIDAD'] = paramForm.ARB_FITOSANIDAD;
            datosNeXO['ARB_PRESENCIA_PLAGA'] = paramForm.ARB_PRESENCIA_PLAGA;
            datosNeXO['ARB_ARB_INTERVENIDO_DE_PODA'] = paramForm.ARB_MACRO;
            datosNeXO['ARB_LEVNT_DE_RAIZ_DE_ACERA'] = paramForm.ARB_LEVNT_DE_RAIZ_DE_ACERA;
            datosNeXO['ARB_LINEA_DE_SERV_ATRAVIESA_COPA'] = paramForm.ARB_LINEA_DE_SERV_ATRAVIESA_COPA;
            datosNeXO['ARB_COPA_AFECT_ALGUNA_INFRAESTRUCTURA'] = paramForm.ARB_COPA_AFECT_ALGUNA_INFRAESTRUCTURA;
            datosNeXO['ARB_LINEA_DE_SERV_ATRAVIESA_COPA_O_RAMA_DE_ARBOL_MUERT'] = paramForm.ARB_LINEA_DE_SERV_ATRAVIESA_COPA_O_RAMA_DE_ARBOL_MUERT;
            datosNeXO['ARB_CONDICION_DEL_TAZON'] = paramForm.ARB_CONDICION_DEL_TAZON;
            datosNeXO['latitud'] = paramForm.latitud;
            datosNeXO['longitud'] = paramForm.longitud;
            datosNeXO['Imagen'] = paramForm.Imagen;
            datosNeXO['foto'] = paramForm.foto;
            datosNeXO['observaciones'] = paramForm.observaciones;
            datosNeXO['div_Solicitud'] = paramForm.Solicitud;

            var sIdTramite = $rootScope.tramiteId;
            //console.log("fredddddddyyyyyyyyyyyyyy...",datosNeXO);
            var datosSerializados = JSON.stringify(datosNeXO);

            var creartramite = new gCrearCaso();
            var id_persona= 3;
            //console.log("ffffffffffffffffffffffff...",id_persona);
            //creartramite.usr_id = sessionService.get('IDPERSONA');
            creartramite.usr_id = id_persona;
            creartramite.datos = datosSerializados;
            creartramite.procodigo = idProcodigo;
            

            creartramite.crearCasoEnLinea_A(function(resultado)
            {
                
                resultadoApi = JSON.parse(resultado);
                //console.log(creartramite);
                //console.log(resultadoApi);
                
                var results = resultadoApi.success.data;
                //console.log("0000000000000000...",results);
                indice = 0;
                if(results.length > 0)
                {
                    
                    datosIF = results[0].sp_pmfunction_crearcaso_en_linea.split(",");
                    //console.log(datosIF);
                    
                    datosIF2 = datosIF[2];
                    datosIF3 = datosIF[3];
                    datosIF[0]= datosIF[0].substring(1,datosIF[0].length);
                    $scope.nrotramitec = datosIF[0];
                    sessionService.set('NROTRAMITE', datosIF[0]);
                    sessionService.set('NROTRAMITEID', datosIF[2]);
                    sessionService.set('IDPROCESO', datosIF[3]);
                    var idTramite1 =  sessionService.get('NROTRAMITEID');
                    $scope.tramiteSelect.venviado = "SI";
                    $scope.tramiteSelect.vcodigo = datosIF[0];
                    $scope.validarFormProcesos(paramForm);
                }
                else{
                    $scope.msg = "Error !!";
                }
                $.unblockUI();
            });
    };
    
    var uploader = $scope.uploader = new FileUploader({
           url: CONFIG.UPLOAD_URL
    });
    //var uploader = $scope.uploader;
    
    uploader.onWhenAddingFileFailed = function(item , filter, options)
    {
     console.info('onWhenAddingFileFailed', item, filter, options);
    };
    
    uploader.onAfterAddingFile = function(fileItem)
    {
        const file = document.querySelector('#file-input').files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
           //console.log("reader.resultv ", reader.result);
            document.getElementById("imgSalida").src=reader.result;
        };
        //reader.onload = () => resolve(reader.result);
        //console.log("toBase64",(file));
    };



    $scope.recuperar = function(value=1)
    {
        var tipo_sol = document.getElementById('div_Solicitud').value;
        if (tipo_sol == "2")
        {
            swal('MENSAJE AL SOLICITANTE: ',
            "En caso de actividades, obras o proyectos de construccion, en el arco de lo establecido "+
            "en la Ley MUNICIPAL AUTONOMICA N°350 y su reglamento,se debe remitir toda la documentacion "+
            "pertinente al documentacion pertinente al caso a oficinas del SERMAT 2-En caso de que no "+
            "corresponda a algunas actividad obra o proyecto de contruccion, se debe permitir la siguiente informacion:");
        }
       
    };
    
    ////////busqueda de zona ///////////////////
    $scope.buscarUbicacionP1=function(){
    
       //console.log("p1 11111111111111111");
        var nombre_1 = new Array();
        var f = '';
        var nombre = document.getElementById('busqueda_p').value;
        nombre = nombre.toUpperCase();
        //console.log("NOMBRE A BUSCAR...",nombre);
        var ca = "CALLE ";
        ca = ca.concat(nombre);
        var c = 0;
        /////////////////////////////
        var tipo = "lugares";
        var data = '';
        $scope.lstCalles = [];
    
        ///////////////////////////////
        if(nombre==='')
        {
          var obj = {'nombre':'INTRODUZCA DATOS!!!...'};
          //console.log("Vacio :",obj);
          //map.removeLayer(vectorLayerZonas);
          vectorLayerZonas.getSource().clear();
        }
        else 
        {  
          if(tipo == 'lugares')
          {
            map.removeLayer(vectorLayerZonas);
            for (var i=0;i<geo_zonas.features.length;i++)
            {
                var nombre_zona =  geo_zonas.features[i].properties.zonaref;
                var x_c = geo_zonas_centroides.features[i].geometry.coordinates[0];
                var y_c = geo_zonas_centroides.features[i].geometry.coordinates[1];
                if(nombre_zona.includes(nombre))
                {
                    //console.log("eeeeeeeeeeee",nombre_zona);
                    nombre_1.push(nombre_zona);
                }
    
                if(nombre === nombre_zona)
                {
                    c=c+1;
                    var geo_zona =  geo_zonas.features[i];
                    var xx = x_c;
                    var yy = y_c;
                }
            }
            for (var j=0; j<= nombre_1.length-1; j++)
            {
                f="'"+nombre_1[j]+"'";
                /////////////////////////////////////// 
                var obj = {'nombre': nombre_1[j]};
                $scope.lstCalles.push(obj);
                data = obj;
                //////////////////////////////////////    
            }  
          }
          if(c==0) 
          {
            var obj = {'nombre':'NO EXISTEN REGISTROS!!!'};
            //console.log("Vacio :",obj);
          }
        }   
    };

    $scope.enviar_nombre_zona = function(nom)
    {
        
        var n = nom.nombre;
        //console.log("ZONA A BUSCAR",n);
        var c = 0;
      
        map.removeLayer(vectorLayerZonas);
        for (var i=0;i<geo_zonas.features.length;i++)
        {
            var nombre_zona =  geo_zonas.features[i].properties.zonaref;
            var x_c = geo_zonas_centroides.features[i].geometry.coordinates[0];
            var y_c = geo_zonas_centroides.features[i].geometry.coordinates[1];
            
            if(n === nombre_zona)
            {
                c=c+1;
                var geo_zona =  geo_zonas.features[i];
                var xx = x_c;
                var yy = y_c;
            }
        }
        if(c>0)
        {
            geo_zona = JSON.stringify(geo_zona);
            vectorLayerZonas.setSource(new ol.source.Vector({
                features: (new ol.format.GeoJSON({defaultDataProjection:'EPSG:3857'})).readFeatures(geo_zona)
            }));
            
            vectorLayerZonas.setStyle(myStyleZonas);
            map.addLayer(vectorLayerZonas);
            map.getView().setCenter([xx,yy]);
            map.getView().setZoom(15);
            setTimeout(function(){
                vectorLayerZonas.getSource().clear();
            },1600);
       
       }
    };
    ////////////////////////////////////////////////////
    
     
    $scope.inicioServicios = function () {
        $scope.tramitesCiudadano();
        $scope.recuperandoDatosInicialesCiudadano();
    };
   
    /*
    $scope.$on('api:ready',function(){
        $scope.tramitesCiudadano();
       $scope.recuperandoDatosInicialesCiudadano();
    });
    */
    
});
