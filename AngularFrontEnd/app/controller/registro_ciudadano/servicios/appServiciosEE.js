//http://obito.lapaz.bo/obitosolicitud/

app.controller('serviciosEEController', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, DreamFactory, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad) {
    var fecha= new Date();
    var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    $scope.txtMsgConexionGen    =   '';
    $scope.txtCiudadanoExiste   =   '';
    $rootScope.looo =   '';
    $rootScope.laaa =   '';
    $scope.tablaTramites        =   {};
    $scope.tramitesUsuario      =   [];
    $scope.servicio = 9;

    $scope.startDateOpen1 = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startDateOpened1 = true;
    };

    $scope.vistas = function(valor){
      if(valor == 5){
        $scope.ocultar1 = true;
        $scope.ocultar = false;
      }
      if(valor == 1){
        $scope.ocultar = true;
        $scope.ocultar1 = false;
      }
      if(valor != 1 && valor != 5){
        $scope.ocultar = false;
        $scope.ocultar1 = false;
      }
    }

    $scope.verDesaparecido = function(datos){
      console.log("estos son los datos de esa persona",datos);
      $scope.visitas = parseInt(datos.EE_VISITAS)+1;
      datos.EE_VISITAS = $scope.visitas;
      console.log("estos son los nuevos datoossss",datos)
     var nuevavisita = new visitas();
      nuevavisita.nro_caso= datos.AE_NRO_CASO;
      nuevavisita.visitas=JSON.stringify(datos) ;
      console.log("estos son los parametros",nuevavisita);
      nuevavisita.agregarVisitas(function(resultado){
          resultadoApi = JSON.parse(resultado);
          console.log(resultadoApi);
          //$scope.extraviados =resultadoApi.data ;
          console.log("resultado....:", $scope.extraviados);
      });

$scope.nombre = datos.EE_APELLIDO_P+" "+datos.EE_APELLIDO_M+" "+datos.EE_NOMBRE;
$scope.nombre_den =  datos.EE_AP_DENUN+" "+datos.EE_AM_DENUN+" "+datos.EE_NOMBRE_DENUN;
console.log($scope.nombre);
console.log(datos.EE_OJOS_FORMA_VALOR);

            document.getElementById("vnombre1").value = $scope.nombre;
            document.getElementById("vtelefono").value = datos.EE_TELF;
            document.getElementById("vfecha_extravio").value = datos.EE_FECHA;
            document.getElementById("vcaso").value = datos.EE_CASO;
            document.getElementById("vgenero").value = datos.EE_GENERO_VALOR;
            //DATOS DE Extraviado
            document.getElementById("vestimenta").value = datos.EE_VESTIMENTA;
            document.getElementById("hechos").value = datos.EE_DESC_HECHOS;
            document.getElementById("denunciante").value = $scope.nombre_den;
            document.getElementById("parentesco").value = datos.EE_PARENTESCO_VALOR;
            //DATOS DE CARACTERISTICAS
            document.getElementById("tatuajes").value = datos.EE_TATUAJES_DESC;
            document.getElementById("lunares").value = datos.EE_LUNARES_DESC;
            document.getElementById("cicatrices").value = datos.EE_CICATRICES_DESC;
            document.getElementById("color_ojos").value = datos.EE_OJOS_COLOR_VALOR;
            document.getElementById("forma_ojos").value = datos.EE_OJOS_FORMA_VALOR;
            document.getElementById("color_cabello").value = datos.EE_COLOR_CABELLO_VALOR;
            document.getElementById("tam_cabello").value = datos.EE_TAMAÑO_CABELLO_VALOR;
            document.getElementById("imagen_perdido").src =datos.EE_IMG;




    }

    $scope.lstExtraviados = function(){
      var PersonaExtraviada = new Extraviado();

      PersonaExtraviada.lstExtraviados(function(resultado){
          resultadoApi = JSON.parse(resultado);
          console.log(resultadoApi);
          $scope.extraviados =resultadoApi.data;
          console.log("resultado....:", $scope.extraviados);
      });
    }




    $scope.busqueda_Extraviado = function(valor1,valor2,valor3){
console.log("este es el valor1",valor1);
console.log("este es el valor2",valor2);
var fec0 = valor3;
var fecnac = new Date(fec0);
var mes = fecnac.getMonth() + 1;
  var dia = fecnac.getDate()
  if(fecnac.getDate()<10){
    dia = "0"+ dia;
  }
  if(fecnac.getMonth()<9){
    mes = "0"+ mes;
  }
  var validadorFichas = false;
$scope.fechaal  = fecnac.getFullYear()+"-"+mes+"-"+dia;
console.log("************1",$scope.fechaal);
console.log("este es el valor3",$scope.fechaal);

      var PersonaExtraviada = new Extraviado();
      PersonaExtraviada.ta= valor1;
      PersonaExtraviada.nombre= valor2;
      PersonaExtraviada.fec= $scope.fechaal;

      PersonaExtraviada.buscarExtraviado(function(resultado){
          resultadoApi = JSON.parse(resultado);
          console.log(resultadoApi);
          $scope.extraviados =resultadoApi.data ;
          console.log("resultado....:", $scope.extraviados);
      });
    }



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
    $scope.crearTramiteObito   =   function(){
        if($scope.serivicosInternet){
            var idTipoTramite   =   $scope.serivicosInternet[0].id;
            $scope.adicionarServicioGamlp(idTipoTramite);
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
        console.log(idParentesco,"parentescos iiiff");
            $rootScope.archivoDivCI = false;
            $rootScope.archivoDivOJ = true;
        } else {
            console.log(idParentesco,"parentescos else" );
            $rootScope.archivoDivCI = true;
            $rootScope.archivoDivOJ = false;
            console.log($scope.datos.FILE_FOTOCOPIA_CI);
           if($scope.datos.FILE_FOTOCOPIA_CI) {
                console.log('lleno');
            }else{
                console.log('vacio',$scope.datosIniciales.file_fotocopi_ci);
                $scope.datos.FILE_FOTOCOPIA_CI = $scope.datosIniciales.file_fotocopi_ci;
            }
        }
    };
    $scope.subirSesionFum   =   function(fum){
        console.log($rootScope.email);
        if ($rootScope.email!="") {
            sessionService.set('IDFUM', fum);
            window.location.href = "#servicios|epagos";
        } else {
            sweet.show('', "En pago en línea es obligatorio el correo electrónico", 'error');
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
        console.log(tramite.contenidofum);
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
            var b = "";
            var a = $scope.datos.FILE_ORDEN_JUDICIAL.split(':');
            if(a[1]!= undefined){
                b = $scope.datos.FILE_ORDEN_JUDICIAL.substring(12);
            }else{
                b= $scope.datos.FILE_ORDEN_JUDICIAL;
            }
            $scope.archivoOrdenJ = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + b + "?app_name=todoangular";

        }else{
            var b = "";
            var a = $scope.datos.FILE_FOTOCOPIA_CI.split(':');
            if(a[1]!= undefined){
                b = $scope.datos.FILE_FOTOCOPIA_CI.substring(12);
            }else{
                b= $scope.datos.FILE_FOTOCOPIA_CI;
            }
            $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + b + "?app_name=todoangular";
        }
        $.unblockUI();
    }
    $scope.limpiarFormTramite   =   function(){
        $scope.procesoSeleccionado  = "";
        $scope.btnNuevoTramtite     =   true;
    };
    $scope.template     =   "";
    var aDocAdjuntos    =   new Array();

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
        console.log(datos[0]);
        if (datos[0].dtspsl_ci) {
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
               datosForm['ci_expedido_t']='BN';
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
        } else if(datos[0].dtspsl_ci_representante) {
            ci2 = datos[0].dtspsl_ci_representante;
            var datosCiudadano1=new rcNatural();
            datosCiudadano1.ci=ci2;

            datosCiudadano1.buscarNatural(function(resultado){
                datosJ = JSON.parse(resultado);
            });
            datosForm['ci_bigdata'] = datosJ[0]._id;
            datosForm['fec_solicitud'] = fechactual;
            datosForm['solicitante'] = datosJ[0].dtspsl_nombres + " " + datosJ[0].dtspsl_paterno + " " + datosJ[0].dtspsl_materno;
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
            datosForm['titular_zona'] = datosJ[0].dtspsl_zona_desc;
            datosForm['titular_nro'] = datosJ[0].dtspsl_numero_casa;
            datosForm['tipo_via'] = datosJ[0].dtspsl_tipo_via;
            datosForm['titular_via'] = datosJ[0].dtspsl_nombre_via;
            datosForm['titular_fono'] = datosJ[0].dtspsl_telefono;
            datosForm['titular_correo'] = datosJ[0].dtspsl_correo;
            datosForm['nombre'] = "";
            datosForm['paterno'] = "";
            datosForm['materno'] = "";
            datosForm['apellido_casada'] = "";
            datosForm['ci_fallecido'] = "";
            datosForm['fecha1'] = "";
            datosForm['fecha2'] = "";
            datosForm['FILE_FOTOCOPIA_CI'] = "";
            $scope.datosIniciales = datosForm;
        } else {
            sweet.show('', "error en identificador de ciudadano", 'error');
        }
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
                if ( data.Resultado[0].idFum) {
                    $scope.actualizarDatos(idTra, JSON.stringify(data.Resultado[0]))
                }
            }
        });
    };

    $scope.actualizarDatos = function(idTramite, fum){//
            var resFormulario = {
                procedure_name:"upd_fum_tramites",
                body:{
                    "params": [
                        {
                            "name": "tramite_id",
                            "value": idTramite
                        },{
                            "name": "fum",
                            "value": fum
                        }
                    ]
                }
            };
            var obj=DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(resFormulario);
            obj.success(function (data){
            })
            .error(function(data){
            })
    };
    $scope.tramitesCiudadano = function(){
        sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var parametros = {
            "procedure_name":"spbusquedaformulario2",
            "body":{
                "params": [
                    {
                        "name": "sidciudadano",
                        "value": sIdCiudadano
                    }
                ]
            }
        };
        DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(parametros).success(function (results){
            angular.forEach(results,function(val, index){
                var idFum;
                var idTra;
                if(val['form_contenido']) {
                    results[index].datos=JSON.parse(val['form_contenido']);
                }
                idFum=val['vnroproforma'];
                idTra=val['vtra_id'];
                if(idFum) {
                    $scope.actualizarFumsPagados(idTra,idFum);
                }
            });
            $scope.tramitesUsuario = results;
            var data = results;
            $scope.tablaTramites.reload();
        }).error(function(results){
            alert("error al cargar");
        });
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
    //ACTUALIZAR ID TRÁMITE NEXO
    $scope.tramitesObservaciones = function(tramite, ciudadano){
        $scope.observaciones = "mostrar";
        var idCiudadano = sessionService.get('IDSOLICITANTE');
        var parametros = {
            "procedure_name":"spbusquedaformulario",
            "body":{
                "params": [
                    {
                        "name": "sidciudadano",
                        "value": idCiudadano
                    }
                ]
            }
        };
        DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(parametros).success(function (results){
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
        }).error(function(results){
            alert("error al cargar");
        });
    };
    $scope.iniciandoDatos = function(){
        console.log("DATOS INICIALES",$scope.datosIniciales)
        var datosIniciales = $scope.datosIniciales;
        var fechactual  =   obtFechaActual.obtenerFechaActual();
        $scope.datos = {};
        var datosForm_inicio = {};
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
       // datosForm_inicio['FILE_FOTOCOPIA_CI'] = datosIniciales.FILE_FOTOCOPIA_CI;
        $scope.datos = datosForm_inicio;
        if (datosIniciales.titular_zona) {
           $scope.validacionDireccion = false;
        } else {
            $scope.validacionDireccion = true;
            sweet.show('Complete información', "Datos de dirección son obligatorios debe completar la información de su cuenta", 'error');
        }
    };

    $scope.recuperarSerializarInfo = function(tramite){
        var sIdTramite = tramite.vtra_id;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
        var sIdServicio = sessionService.get('IDSERVICIO');
        var parametros  = {
                "container":"RC_CLI",
                "folder_path": sIdTramite
        };
        if(sIdCiudadano){
            var datosCiudadano = {
                "procedure_name":"splistafrmdatos",
                "body":{
                    "params": [
                        {
                            "name": "sidciudadano",
                            "value": sIdCiudadano
                        },
                        {
                            "name": "sidservicio",
                            "value": sIdServicio
                        },
                        {
                            "name": "sidtramite",
                            "value": sIdTramite
                        }
                    ]
                }
            };
            DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(datosCiudadano).success(function (results){
                if(results.length > 0){
                    datos = JSON.parse(results[0].form_contenido);
                    $scope.adjuntosArray = datos.ARCHIVOS_MULTIPLES;
                    $scope.datos = datos;
                     $scope.publicid =[];
                    $scope.publicid = $scope.datos.publicidad;
                    $rootScope.looo = $scope.datos.INT_AC_latitud;
                    $rootScope.laaa = $scope.datos.INT_AC_longitud;
                    $scope.selParentesco($scope.datos.parentesco);
                   $scope.nroRegistros = datos.length;
                }else{
                    console.log($scope.datos)
                    $rootScope.archivoDivCI = false;
                    $rootScope.archivoDivOJ = false;
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
                    $scope.cibloq                   =   "mo";
                }
                $rootScope.$broadcast('validarBtnEnviar', results.length);
                $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                $rootScope.$broadcast('inicializarGrillaAE', [{'datos':$scope.datos, 'venviado':tramite.venviado}]);
                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
            }).error(function(results){
            });
        }else{
            alert("NO existe id ciudadano");
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
    //ALMACENAR DOCUMENTOS DREAMFACTORY
    $scope.almacenarDocumentos = function(aFiles){
        console.log(aFiles);
        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI";
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + oidCiudadano + "/";
        if (aFiles[0]){
            if(aFiles[0].size <= 3145728){
                fileUpload.uploadFileToUrl(aFiles, uploadUrl);
                if ($rootScope.parentescos == 19){
                   $scope.datos.FILE_ORDEN_JUDICIAL   = aFiles[0].name;
                }else{
                    $scope.datos.FILE_FOTOCOPIA_CI   = aFiles[0].name;
                }
                $scope.Advertencia1="ok";
            }else{
                sweet.show('Advertencia', 'El tamaño de la imagen CEDULA DE IDENTIDAD es muy grande', 'error');
                $scope.Advertencia1="advertencia";
                aFiles[0].name="";
                document.getElementById('FILE_FOTOCOPIA_CI').value='';
                document.getElementById('FILE_ORDEN_JUDICIAL').value='';
            }
        }

        angular.forEach(aFiles, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                fileUpload.uploadFileToUrl(archivo, uploadUrl);
            }else{
                console.log("error en el archivo");
            }
        });



    };

    $scope.serializarInformacionViajes = function(obj){
        var fechactual          = obtFechaActual.obtenerFechaActual();
        var misDocs             = new Array();
        console.log("el obj   ",obj);
        //CONVIRTIENDO LOS CAMPOS A MAYUSCULAS
        misDocs.push($scope.FILE_FOTOCOPIA_CI);
        misDocs.push($scope.FILE_FACTURA_SERVICIO);
        misDocs.push($scope.FILE_CROQUIS_AMBIENTE);
        misDocs.push($scope.FILE_CERTIFICADO_PENAL);

        //RECUPERANDO ADJUNTOS
        //$scope.almacenarDocumentos(misDocs);

        var datosSerializados   =  JSON.stringify(obj);
        var idCiudadano         = sessionService.get('IDSOLICITANTE');
        var idTramite           = sessionService.get('IDTRAMITE');
        var idServicio          = sessionService.get('IDSERVICIO');
        var parametros = {
            "procedure_name":"sp_crear_datos_formulario",
            "body":{
                    "params": [
                        {"name": "id_servicio","value": idServicio},
                        {"name": "data_json","value": datosSerializados},
                        {"name": "oid_ciudadano","value": idCiudadano},
                        {"name": "id_usuario","value": 1},
                        {"name": "id_trm_form","value": idTramite}
                    ]
                   }
        };
        $scope.btnGuardarForm   =   true;
        $.blockUI();
        DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(parametros).success(function (results){
            if(results.length > 0){
                $.unblockUI();
                $scope.btnEnviarForm    =   false;
                $scope.btnGuardarForm   =   false;
                //COLOCANDO OBLIGATORIO LOS DOCUMENTOS ADJUNTOS
                //$scope.adjuntoObligatorio       =   true;
                //$scope.adjuntoCssObligatorio    =   "border-style: solid; border-width: 1px; border-color: #577C27;";
                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);

                sweet.show('', "Formulario almacenado", 'success');
            }else{
                $.unblockUI();
                sweet.show('', "Formulario no almacenado", 'error');
            }
        }).error(function(results){
                $scope.btnGuardarForm   =   false;
                $.unblockUI();
        });
    };
      $scope.cambiarFile = function(obj, valor){
        $.blockUI();  
        setTimeout(function(){
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
            var uploadUrl = CONFIG.APIURL+"/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + '/' ;
            $scope.almacenarDocumentos(misDocs);
            $.unblockUI();
        },1000);
    };

    //ALMACENANDO FORMULARIO
    $scope.serializarInformacion = function(obj){
        console.log("DATOS OBJ:", obj);
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
        }else{
            misDocs.push($scope.FILE_FOTOCOPIA_CI);
        }
        $scope.almacenarDocumentos(misDocs);
        var datosSerializados   =  JSON.stringify(obj);
        var idCiudadano         = sessionService.get('IDSOLICITANTE');
        var idTramite           = sessionService.get('IDTRAMITE');
        var idServicio          = sessionService.get('IDSERVICIO');
        var parametros = {
            "procedure_name":"sp_crear_datos_formulario",
            "body":{
                    "params": [
                        {"name": "id_servicio","value": idServicio},
                        {"name": "data_json","value": datosSerializados},
                        {"name": "oid_ciudadano","value": idCiudadano},
                        {"name": "id_usuario","value": 1},
                        {"name": "id_trm_form","value": idTramite}
                    ]
                   }
        };
        $scope.btnGuardarForm   =   true;
        $.blockUI();
        DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(parametros).success(function (results){
            if(results.length > 0){
                $.unblockUI();
                $scope.btnEnviarForm    =   false;
                $scope.btnGuardarForm   =   false;
                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                sweet.show('', "Formulario almacenado", 'success');
            }else{
                $.unblockUI();
                sweet.show('', "Formulario no almacenado", 'error');
            }
        }).error(function(results){
                $scope.btnGuardarForm   =   false;
                $.unblockUI();
        });
    };


    $scope.enviarInformacion = function(obj){
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = sessionService.get('IDUSUARIO');
        var parametros = {
            "table_name":"_formulario_tramites",
            "body":{
                'frm_tra_enviado' : 'SI',
                'frm_tra_id_usuario' : idUsuario,
                'frm_tra_modificado' : fechactual
            },
            "id" : idTramite
        };
        var obj = DreamFactory.api[CONFIG.SERVICE].updateRecord(parametros);
        obj.success(function(data){
            sweet.show('', 'Formulario enviado al G.A.M.L.P.', 'success');
            $scope.tramitesCiudadano();
            $scope.desabilitado = true;
        })
        obj.error(function(data){
            sweet.show('', 'Registro no modificado', 'error');
        })
    };

    //Almacenando servicios
    $scope.adicionarServicioGamlp = function(datos){
        var fecha= new Date();
        var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var sIdServicio = datos;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');
        var sFechaTramite = fechactual;
        var aServicio = {};
        aServicio = {
            'frm_tra_dvser_id' : sIdServicio,
            'frm_tra_id_ciudadano': sIdCiudadano,
            'frm_tra_fecha': sFechaTramite,
            'frm_tra_enviado' : "NO",
            'frm_tra_registrado':fechactual,
            'frm_tra_modificado':fechactual,
            'frm_tra_id_usuario' : "3"
        };
        var datosServicio = {
            table_name:"_formulario_tramites",
            body:aServicio
        };
        var obj = DreamFactory.api[CONFIG.SERVICE].createRecords(datosServicio);
        $.blockUI();
        obj.success(function(data){
            $scope.tramitesCiudadano();
            $.unblockUI();
            sweet.show('', 'Registro almacenado correctamente', 'success');
            $('#registro').modal('hide');
            $scope.getCaptchasX();
        })
        .error(function(data){
            $.unblockUI();
        });
    }
    $scope.confirmarServicioGamlp = function(dat) {console.log(dat);
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

    $scope.ErrorCapcha='';
    $scope.getlimpiareRROR=function()
    {
        $scope.ErrorCapcha='';
    }
       $scope.getCaptchasX=function(){

         var objCaptcha = new captcha();
              objCaptcha.obtcaptcha(function(resultado){
                json = JSON.parse(resultado);
                partes = json.success[0].sp_captcha_porx1.split(',');
                numero = partes[0].substring(1);
                i1=(partes[2]+ "," + partes[3]);
                i2=(partes[4] + "," + partes[5]);
                $scope.imageLNG = i1.substring(1, i1.length - 1);
                $scope.imageCST = i2.substring(1, i2.length - 2);
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
      $scope.getCaptchasXX = function(){
         var objCaptcha = new captcha();
              objCaptcha.obtcaptcha(function(resultado){
                json = JSON.parse(resultado);
                partes = json.success[0].sp_captcha_porx1.split(',');
                numero = partes[0].substring(1);
                i1=(partes[2]+ "," + partes[3]);
                i2=(partes[4] + "," + partes[5]);
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
                if(document.getElementById('imageLNG') != null){
                    document.getElementById('imageLNG').src = i1.substring(1, i1.length - 1);
                    document.getElementById('imageCST').src = i2.substring(1, i2.length - 2);
                    document.getElementById('palabraT').value = "Ingrese texto: " + lengua + " CASTELLANO";
                } else {
                    $scope.imageLNG = i1.substring(1, i1.length - 1);
                    $scope.imageCST = i2.substring(1, i2.length - 2);
                }
                $scope.toltipTt = "Palabra en " + lengua;
                $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
              });
    };

    $scope.VerificarCapcha = function(responce)
    {
        var captch  = $("#resultadoC").val();
        console.log(captch,numero);
        console.log("===>>",captch);
        var id = numero;
        var verCaptcha = new captcha();
          verCaptcha.identificador = id;
          verCaptcha.respuesta = captch;
          verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
           console.log(json);
           if(json.success[0] == undefined){
             //sweetAlert("", "Error en el captcha intentar de nuevo por favor", "warning");
              $scope.getCaptchasX();
              document.getElementById('resultadoCC').value = '';
              $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
           }else{
                $scope.confirmarServicioGamlp(responce);
                $scope.ErrorCapcha='';
           }
          });
    };
    $scope.VerificarCapchaa = function(responce)
    {
         var captch  = $("#resultadoCC").val();
        console.log(captch,numero);
                var id = numero;
              var verCaptcha = new captcha();
              verCaptcha.identificador = id;
              verCaptcha.respuesta = captch;
              verCaptcha.verificarCaptcha(function(resultado){
                json = JSON.parse(resultado);
               console.log(json);
               if(json.success[0] == undefined){
                    $scope.getCaptchasXX();
                    $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
               }else{
                    $scope.serializarInformacion(responce);
                    $scope.ErrorCapcha='';
               }
              });
    };


    // ******FIN DE CAPCHA****************
    //Iniciando js
    $scope.$on('api:ready',function(){
      $scope.lstExtraviados();
        //$scope.busqueda_Extraviado();
      /*  $scope.tramitesCiudadano();
        $scope.recuperandoDatosInicialesCiudadano();
        $scope.getCaptchasX();*/
    });

    $scope.inicioServicios = function () {
        if(DreamFactory.api[CONFIG.SERVICE]){
          $scope.lstExtraviados();
          //  $scope.busqueda_Extraviado();
            /*$scope.tramitesCiudadano();
            $scope.recuperandoDatosInicialesCiudadano();
            $scope.getCaptchasX();*/
        }
    };



     $scope.recuperarSerializarInfomacion = function(tramite){
        setTimeout(function(){            
        var sIdTramite = tramite.vtra_id;
        var sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
        var sIdServicio = sessionService.get('IDSERVICIO');
        var parametros  = {
                "container":"RC_CLI",
                "folder_path": sIdTramite
        };

        if(sIdCiudadano){
            var datosCiudadano = {
                "procedure_name":"splistafrmdatos",
                "body":{
                    "params": [
                        {
                            "name": "sidciudadano",
                            "value": sIdCiudadano
                        },
                        {
                            "name": "sidservicio",
                            "value": sIdServicio
                        },
                        {
                            "name": "sidtramite",
                            "value": sIdTramite
                        }
                    ]
                }
            };

            DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(datosCiudadano).success(function (results){
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
            }).error(function(results){
            });
        }else{
            alert("NO existe id ciudadano");
        }
          },1000);
    };


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
    console.log($scope.TER_TIP_SOL);
    };

    $scope.formSolos  =   function(stipo){
    $scope.TER_SOLOS = stipo;
    console.log($scope.TER_SOLOS);
    };

    $scope.formAutoriza  =   function(stipo){
    $scope.TER_2_PROG = stipo;
    console.log($scope.TER_2_PROG);
    };

    $scope.formViajan  =   function(stipo){ //alert(1514);
    $scope.TER_NNA_DEL = stipo;
    console.log($scope.TER_NNA_DEL);
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
    console.log("TER_MIN  en seleccionar     ",$scope.municipio);
    };

    $scope.getProvinciasDepto = function(dep){// alert("serviciosdepto");
        var departamento = dep.split("-");
        $scope.depto = departamento[0];
        var filtro = "prv_dpto_codigo = '"+departamento[0]+"'";
        var resCiudadanos = {
                "table_name":"_bp_provincias",
                "body":{
                    "filter": filtro
                }
            };
            var obj=DreamFactory.api[CONFIG.SERVICE].getRecordsByPost(resCiudadanos);
            obj.success(function(data){
            $scope.obtDatos = data.record;
            if ($scope.municipio != 'undefined' || $scope.municipio != null) {
                setTimeout(function(){
                    $scope.getSeleccionaMunicipios($scope.municipio);
                    document.getElementById('TER_MIN').value = $scope.municipio;
                    },1000);
                }
            })
            obj.error(function(error) {
                console.log(error);
            })
    };

    $scope.seleccionarTramite = function (tramite) {
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
        };
        $scope.tramiteSeleccionado   =   tramite.vtra_id;
        var cboTipoCon = document.getElementById("tipo_contribuyente");
        if(cboTipoCon){
            cboTipoCon.style.display = 'none';
        }
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
        url: CONFIG.APIURL + "?desripcion=ciudadano&&idCiudadano=" + idCiu
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
        sweet.show('', "Tipo de archivo incorrecto elimine porfavor", 'error');
        $scope.desabilitado2 = true;
    }

    var archivoUpload = "";

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //FORMANDO LA URL - ARCHIVO
        $scope.direccionvirtual = "RC_CLI";
        var urlIdcos = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + $rootScope.tramiteId + "/" + fileItem._file.name + "?app_name=todoangular";
        console.log('urlIdcosimagen: ',urlIdcos);
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
});

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
