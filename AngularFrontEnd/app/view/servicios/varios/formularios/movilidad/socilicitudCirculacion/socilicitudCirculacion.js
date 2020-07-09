function solicitudCirculacionController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
    var sIdCiudadano= sessionService.get('IDSOLICITANTE');
    $scope.tipo_persona=sessionService.get('TIPO_PERSONA');
    $scope.oidCiu = sessionService.get('IDSOLICITANTE');
    $scope.tiposTramite = [
        { detalle: 'Solicitud de permiso de transporte', id:'54',tipo:$scope.tipo_persona}
    ];
    $scope.datos = {};
    $scope.tablaTramites        =   {};
    $scope.tramitesUsuario      =   [];
    $scope.templates =
    [ 
      { name: 'template1.html', url: '../../../app/view/servicios/varios/formularios/movilidad/socilicitudCirculacion/permisoCirculacion/permisoCirculacion.html'}
    ];
  
    $scope.solPerTra = 54;

    $scope.inicio = function(){
      $scope.tramitesCiudadano();
      $scope.cargarDatosCiudadano();
      $scope.obtenerContribuyente();
      setTimeout(function(){
        iniciarLoadFyle();
      }, 1000);  
    }
  
    /////////////////////////////////////DATOS CIUDADANO////////////////////////////////////
    $scope.validacionDatosNatural = function(datos){
      var datosfaltantes = '';
      datosfaltantes = new Array();
      if(datos.dtspsl_fec_nacimiento == ''){
           datosfaltantes.push(' FECHA DE NACIMIENTO');
      }
      if(datos.dtspsl_expedido == '' || datos.dtspsl_expedido == ' '){
           datosfaltantes.push(' EXPEDIDO');
      }
      if(datos.dtspsl_nombres == '' || datos.dtspsl_nombres == ' '){
          datosfaltantes.push(' NOMBRES');
      }
      if(datos.dtspsl_materno == '' || datos.dtspsl_materno == ' '){
          datosfaltantes.push(' APELLIDO MATERNO');
      }
      if(datos.dtspsl_movil == '' || datos.dtspsl_movil == ' '){
          datosfaltantes.push(' CELULAR');
      }
      if((datos.dtspsl_correo == '')||(datos.dtspsl_correo == ' ')){
          datosfaltantes.push(' CORREO');
      }
      if(datos.dtspsl_fec_nacimiento == '' || datos.dtspsl_fec_nacimiento == ' '){
          datosfaltantes.push('FECHA DE NACIMIENTO');
      }
      if(datos.dtspsl_pais == '' || datos.dtspsl_pais == ' '){
          datosfaltantes.push(' PAIS');
      }
      if(datos.dtspsl_departamento == '' || datos.dtspsl_departamento == ' '){
          datosfaltantes.push(' DEPARTAMENTO');
      }
      if(datos.dtspsl_provincia == '' || datos.dtspsl_provincia == ' '){
          datosfaltantes.push(' PROVINCIA');
      }
      if((datos.dtspsl_macrodistrito == '' || datos.dtspsl_macrodistrito_desc == '')){
          datosfaltantes.push(' MACRODISTRITO');
      }
      if((datos.dtspsl_distrito == '' || datos.dtspsl_distrito_desc == '')){
          datosfaltantes.push(' DISTRITO');
      }
      if((datos.dtspsl_zona_desc == '' || datos.dtspsl_zona == '')){
          datosfaltantes.push(' ZONA');
      }
      if(datos.dtspsl_nombre_via == '' || datos.dtspsl_nombre_via == '0'){
          datosfaltantes.push(' NOMBRE DE VIA');
      }
      if(datos.dtspsl_numero_casa == '' || datos.dtspsl_nombre_via == '0'){
          datosfaltantes.push(' NUMERO DE DOMICILIO');
      }
      if(datos.dtspsl_file_fotocopia_ci == '' || datos.dtspsl_file_fotocopia_ci == ' ' ){
          datosfaltantes.push(' DOCUMENTO DE IDENTIDAD ANVERSO');
      }
      if(datos.dtspsl_file_fotocopia_ci_r == '' || datos.dtspsl_file_fotocopia_ci_r == ' '){
          datosfaltantes.push(' DOCUMENTO DE IDENTIDAD REVERSO');
      }
      $scope.datosfalt = datosfaltantes; 
    }
  
    $scope.validacionDatosJuridico = function(datos){
      var datosfaltantes = '';
      datosfaltantes = new Array();
      if(datos.dtspsl_ci_representante == '' || datos.dtspsl_ci_representante == ' '){
           datosfaltantes.push('CI DEL REPRESENTANTE LEGAL');
      }
      if(datos.dtspsl_razon_social == '' || datos.dtspsl_razon_social == ' '){
           datosfaltantes.push(' RAZON SOCIAL');
      }
      if(datos.dtspsl_movil == ''){
          datosfaltantes.push(' CELULAR');
      }
      if((datos.dtspsl_correo == '')||(datos.dtspsl_correo == ' ')){
          datosfaltantes.push(' CORREO');
      }
      if(datos.dtspsl_pais == ''){
          datosfaltantes.push(' PAIS');
      }
      if(datos.dtspsl_departamento == ''){
          datosfaltantes.push(' DEPARTAMENTO');
      }
      if(datos.dtspsl_provincia == ''){
          datosfaltantes.push(' PROVINCIA');
      }
      if((datos.dtspsl_macrodistrito == '' || datos.dtspsl_macrodistrito_desc == '')){
          datosfaltantes.push(' MACRODISTRITO');
      }
      if((datos.dtspsl_distrito == '' || datos.dtspsl_distrito_desc == '')){
          datosfaltantes.push(' DISTRITO');
      }
      if((datos.dtspsl_zona_desc == '' || datos.dtspsl_zona == '')){
          datosfaltantes.push(' ZONA');
      }
      if(datos.dtspsl_nombre_via == '' || datos.dtspsl_nombre_via == '0'){
          datosfaltantes.push(' NOMBRE DE VIA');
      }
      if(datos.dtspsl_numero_casa == '' || datos.dtspsl_nombre_via == '0'){
          datosfaltantes.push(' NUMERO DE DOMICILIO');
      }
      if(datos.dtspsl_file_poder_legal == '' || datos.dtspsl_file_poder_legal == ' ' ){
          datosfaltantes.push(' DOCUMENTO DE PODER DEL REPRESENTANTE LEGAL');
      }
      if(datos.dtspsl_file_num_ident == '' || datos.dtspsl_file_num_ident == ' '){
          datosfaltantes.push(' DOCUMENTO TESTIMONIO DE CONSTITUCION');
      }
      if(datos.dtspsl_file_num_ident == '' || datos.dtspsl_file_num_ident == ' '){
          datosfaltantes.push(' DOCUMENTO NUMERO DE IDENTIFICACION TRIBUTARIA (NIT)');
      }
      if(datos.dtspsl_file_fund_emp == '' || datos.dtspsl_file_fund_emp == ' '){
          datosfaltantes.push(' DOCUMENTO FUNDEMPRESA');
      }
      if(datos.dtspsl_file_reg_comer == '' || datos.dtspsl_file_reg_comer == ' '){
          datosfaltantes.push(' DOCUMENTO REGISTRO COMERCIAL');
      }
      $scope.datosfalt = datosfaltantes; 
    }
  
    $scope.cargarDatosCiudadano = function(){
      var datosCiudadano   = new rcNatural();
      datosCiudadano.oid = $scope.oidCiu;
      datosCiudadano.datosCiudadanoNatural(function(results){
        results = JSON.parse(results);
        $scope.datosCiudadano = results[0];
        if ( results !=null) {
          $scope.datos.INF_TIPO_PERSONA = results[0].dtspsl_tipo_persona;
          if(results[0].dtspsl_tipo_persona == 'JURIDICO'){
            $scope.validacionDatosJuridico($scope.datosCiudadano);
            if (($scope.datosCiudadano.dtspsl_razon_social == '' || $scope.datosCiudadano.dtspsl_nit == '' || $scope.datosCiudadano.dtspsl_ci_representante == '' || $scope.datosCiudadano.dtspsl_zona_desc == '' || $scope.datosCiudadano.dtspsl_numero_casa == '' || $scope.datosCiudadano.dtspsl_tipo_via == '' || $scope.datosCiudadano.dtspsl_nombre_via == '' || $scope.datosCiudadano.dtspsl_correo == '' || $scope.datosCiudadano.dtspsl_file_poder_legal == '') || ($scope.datosCiudadano.dtspsl_ci_representante == ' ' || $scope.datosCiudadano.dtspsl_razon_social == ' ' || $scope.datosCiudadano.dtspsl_zona_desc == ' ' || $scope.datosCiudadano.dtspsl_numero_casa == ' ' || $scope.datosCiudadano.dtspsl_tipo_via == ' ' || $scope.datosCiudadano.dtspsl_nombre_via == ' ' || $scope.datosCiudadano.dtspsl_correo == ' ' || $scope.datosCiudadano.dtspsl_file_poder_legal == ' ' || $scope.datosCiudadano.dtspsl_telefono == ' '))
            {
              setTimeout(function(){
                swal({
                  title: 'Completar información',
                  text: 'Estimado ciudadano debe completar los siguientes datos de su cuenta: '+ $scope.datosfalt +', para poder realizar el trámite',
                  type: 'warning',
                  showCancelButton: false,
                  confirmButtonColor: '#DD6B55',
                  confirmButtonText: 'OK',
                  closeOnConfirm: true
                }, function() {                                
                  window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                });                          
              },300);
            }else{ 
              $scope.datos.CI_BIGDATA = results[0]._id;
              $scope.datos.PER_TRA_NIT = results[0].dtspsl_nit;
              $scope.datos.PER_TRA_RAZON_SCI = results[0].dtspsl_razon_social;
              $scope.datos.PER_TRA_CI_J = results[0].dtspsl_ci_representante;
              $scope.datos.PER_TRA_ZONA_J = results[0].dtspsl_zona_desc;   
              $scope.datos.PER_TRA_VIA_J = results[0].dtspsl_tipo_via;
              $scope.datos.PER_TRA_PODER = results[0].dtspsl_poder_replegal;
              var poder = $scope.datos.PER_TRA_PODER.split('/');
              $scope.datos.PER_TRA_NRO_NOTARIA = poder[0];
              $scope.datos.PER_TRA_NOMBRE_VIA_J = results[0].dtspsl_nombre_via;   
              $scope.datos.PER_TRA_NRO_VV_J = results[0].dtspsl_numero_casa;
              $scope.datos.PER_TRA_CORREO = results[0].dtspsl_correo;   
              var buscarRepresentante = new rcNatural();
              buscarRepresentante.tipo_persona = "NATURAL"
              buscarRepresentante.ci = $scope.datos.PER_TRA_CI_J;
              buscarRepresentante.buscarPersona(function(res){
                var x = JSON.parse(res);
                if (x.error) {
                  $.unblockUI();
                }else {
                  if (x.length > 0) {
                    $scope.busquedaCiudadano = x[0];
                    $scope.datos.PER_TRA_NOMBRE_J = x[0].dtspsl_nombres;
                    $scope.datos.PER_TRA_PATERNO_J = x[0].dtspsl_paterno;
                    $scope.datos.PER_TRA_MATERNO_J = x[0].dtspsl_materno;
                    $scope.datos.PER_TRA_EXPEDIDO_J = x[0].dtspsl_expedido;
                    $scope.datos.PER_TRA_CELULAR_J = x[0].dtspsl_telefono;   
                  }
                }
              })
            }
          }
          else{
            $scope.validacionDatosNatural($scope.datosCiudadano);
            if (($scope.datosCiudadano.dtspsl_nombres == '' || $scope.datosCiudadano.dtspsl_materno == '' || $scope.datosCiudadano.dtspsl_expedido == '' || $scope.datosCiudadano.dtspsl_zona_desc == '' || $scope.datosCiudadano.dtspsl_numero_casa == '' || $scope.datosCiudadano.dtspsl_tipo_via == '' || $scope.datosCiudadano.dtspsl_nombre_via == '' || $scope.datosCiudadano.dtspsl_correo == '' || $scope.datosCiudadano.dtspsl_file_fotocopia_ci == '') || ($scope.datosCiudadano.dtspsl_nombres == ' ' || $scope.datosCiudadano.dtspsl_materno == ' ' || $scope.datosCiudadano.dtspsl_expedido == ' ' || $scope.datosCiudadano.dtspsl_zona_desc == ' ' || $scope.datosCiudadano.dtspsl_numero_casa == ' ' || $scope.datosCiudadano.dtspsl_correo == ' ' || $scope.datosCiudadano.dtspsl_file_fotocopia_ci == ' '))
            {   
              setTimeout(function(){
                swal({
                  title: 'Editar su Información',
                  text: 'Estimado ciudadano debe completar los siguientes $scope.datosCiudadano de su cuenta: '+ $scope.datosfalt +', para poder realizar el trámite',
                  type: 'warning',
                  showCancelButton: false,
                  confirmButtonColor: '#DD6B55',
                  confirmButtonText: 'OK',
                  closeOnConfirm: true
                }, function() {                                
                  window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";                   
                });                          
              },300);
            }else{
              $scope.datos.CI_BIGDATA = results[0]._id;
              $scope.datos.PER_TRA_NOMBRE = results[0].dtspsl_nombres;
              $scope.datos.PER_TRA_PATERNO = results[0].dtspsl_paterno;
              $scope.datos.PER_TRA_MATERNO = results[0].dtspsl_materno;
              $scope.datos.PER_TRA_CASADA = results[0].dtspsl_tercer_apellido;
              $scope.datos.PER_TRA_CELULAR = results[0].dtspsl_movil;
              $scope.datos.PER_TRA_CORREO = results[0].dtspsl_correo;
              $scope.datos.PER_TRA_EXPEDIDO = results[0].dtspsl_expedido;   
              $scope.datos.PER_TRA_CI = results[0].dtspsl_ci;    
              $scope.datos.PER_TRA_ZONA = results[0].dtspsl_zona;
              $scope.datos.PER_TRA_ZONA = results[0].dtspsl_zona_desc;
              $scope.datos.PER_TRA_VIA = results[0].dtspsl_tipo_via; 
              $scope.datos.PER_TRA_NOMBRE_VIA = results[0].dtspsl_nombre_via;
              $scope.datos.PER_TRA_NRO_V = results[0].dtspsl_numero_casa;
              if (results[0].dtspsl_file_fotocopia_ci != "") {
                $scope.datos.INF_CI_ANVERSO = CONFIG.APIURL + "/files/RC_CLI/"+results[0]._id+"/"+results[0].dtspsl_file_fotocopia_ci+"?app_name=todoangular";
              }
              if (results[0].dtspsl_file_fotocopia_ci_r != "") {
                $scope.datos.INF_CI_REVERSO = CONFIG.APIURL + "/files/RC_CLI/"+results[0]._id+"/"+results[0].dtspsl_file_fotocopia_ci_r+"?app_name=todoangular";
              }
            }
          }
        }else{
          console.log("NO EXISTE DATOS");
        }
      });
    };
  
    $scope.seleccionaServicio = function(idTramite){
      $scope.tramiteId = idTramite;
    }
  
    ///////////////////////////OBTIENE TRAMITES////////////////////////
    $scope.tramitesCiudadano = function(){
    
      var tramites  = new tramitesMovilidad();
      tramites.idCiudadano = sIdCiudadano;
      tramites.descripcion="MOVILIDAD_PER_TRA";
      tramites.listaTramitesMovilidad(function(results){
        results = JSON.parse(results).success;
        $scope.tramites = results;
        $scope.tramitesUsuario = results;
        $scope.tablaTramites.reload();
      })
    };
  
    $scope.tablaTramites = new ngTableParams({
      page: 1,
      count: 4,
      filter: {},
      sorting: { vtra_id: 'desc' }
    },{
      total: $scope.tramitesUsuario.length,
      getData: function($defer, params)
      {
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
  
    //////////////////////////////////////////CREA TRAMITES/////////////////////////////
    $scope.crear_tramite = function()
    {
      $.blockUI();
      if($scope.tramiteId != undefined || $scope.tramiteId != null){
        if ($scope.datosCiudadano.dtspsl_activaciond == 'SI' && $scope.datosCiudadano.dtspsl_activacionf == 'SI') 
        {
          var dataInicio = $scope.datos;
          var fecha= new Date();
          var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
          var sIdServicio = $scope.tramiteId;
          var sIdCiudadano = $scope.oidCiu;
          var sFechaTramite = fechactual;
          var datosSerializados   =  JSON.stringify(dataInicio);
          try{
            var crea = new adicionaTramitesFormulario();
            crea.frm_tra_fecha = sFechaTramite;
            crea.frm_tra_enviado = "NO";
            crea.frm_tra_registrado = fechactual;
            crea.frm_tra_modificado = fechactual;
            crea.id_servicio = sIdServicio;
            crea.data_json = datosSerializados;
            crea.oid_ciudadano = sIdCiudadano;
            crea.id_usuario = 3;
            crea.adiciona_Tramites_Formulario(function(res){
              x = JSON.parse(res);
              response = x.success;
              if(response.length  > 0){
                $scope.template =   "";
                sessionService.set('IDTRAMITE', '');
                sessionService.set('IDSERVICIO', '');
                sessionService.set('ESTADO', '');
                var nro_tramite = response[0].sp_insertar_formulario_tramites_datos;
                datosTramite = {};
                datosTramite.vtra_id = nro_tramite;
                datosTramite.vdvser_id = sIdServicio;
                datosTramite.venviado = "NO";
                datosTramite.form_contenido = datosSerializados;
                $scope.seleccionarTramite(datosTramite);
                $.unblockUI();
                alertify.success('Tramite creado correctamente');
                $('#crearTramite').modal('hide');
                $scope.tramitesCiudadano();
              }
              else{
                $.unblockUI();
              }
            });
          }catch(e){
            console.log('*Error*', e);
            $.unblockUI();
          }
        } else{
          $.unblockUI();
          swal('', "Debe realizar las activaciones fisica y digital para poder realizar el trámite", 'warning');
        };
      }else{
        $.unblockUI();
        swal('',"Dede seleccionar uno de los servicios",'warning');
      }
    }
  
    /////////////////////////////////////SELECCIONA TRAMITE/////////////////////////////
    $scope.seleccionarTramite = function (tramite) {
      $scope.template =   "";
      $scope.tramiteRender(tramite);  
    }
  
    $scope.tramiteRender = function (tramite) {
      $scope.procesoSeleccionado = tramite.vdvser_id;
      $rootScope.tramiteId = tramite.vtra_id;
      sessionService.set('IDTRAMITE', $rootScope.tramiteId);
      sessionService.set('IDSERVICIO', tramite.vdvser_id);
      sessionService.set('ESTADO', tramite.venviado);
      $scope.template = "";
      var idTemplate = 0;
      if($scope.procesoSeleccionado == $scope.solPerTra){
        idTemplate = 0;
      }  
      $scope.template = $scope.templates[idTemplate];
      setTimeout(function(){
        $rootScope.$broadcast('inicializarVista', tramite.form_contenido);
      },500);
      $scope.$apply();
    };

    $scope.obtenerContribuyente = function(){
        var tipoContribuyente     =   sessionService.get('TIPO_PERSONA');
        var ciDocumento          =   '';//sessionService.get('CICIUDADANO'));
        var nitDocumento          =   '';//sessionService.get('CICIUDADANO'));
        var sAccion  
        if(tipoContribuyente == 'NATURAL'){
            ciDocumento          =   sessionService.get('CICIUDADANO');
            sAccion              =  'C01';
        }else if(tipoContribuyente == 'JURIDICO'){
            nitDocumento         =   sessionService.get('NITCIUDADANO');
            sAccion              =  'C02';
        }
        var conGenesis  =   new gLstDatos();
        conGenesis.idContribuyente = "";
        conGenesis.clase="";
        conGenesis.padron="";
        conGenesis.identificacion=ciDocumento;//'40852017'
        conGenesis.primerNombre="";
        conGenesis.primerApellido="";
        conGenesis.segundoApellido="";
        conGenesis.nit=nitDocumento;
        conGenesis.empresa="";
        conGenesis.p_accion=sAccion;
        conGenesis.lstDatosContribuyente(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if (resultadoApi.success) {
                var response    =   resultadoApi;
                $scope.txtMsgConexionGen    =   "";
                $scope.dataGenesisCidadano  =   response.success.dataSql;
                $rootScope.datosGenesis = response.success.dataSql;
            } else {
                $scope.txtMsgConexionGen    =   "Se ha producido un problema de conexion al cargar los datos";
                $.unblockUI();
                //swal(resultadoApi.error.message);
            }
        });
    };

    $scope.generarDocumentoPhp = function (){
        $.blockUI();
        var tipoPersona = '';
        var oidCiudadano = '';
        var datosCiudadano = '';
        var datosci = '';
        var datosexpedido = '';
        var dEmpresa = '';
        var dnit = '';
        var datoForm4 = '';
        var stform = '';
        tipoPersona     = sessionService.get('TIPO_PERSONA');
        oidCiudadano    = sessionService.get('IDSOLICITANTE');
        datosCiudadano  = (sessionService.get('US_NOMBRE')+' '+sessionService.get('US_PATERNO')+' '+sessionService.get('US_MATERNO'));
        datosci         = sessionService.get('CICIUDADANO');
        datosexpedido   = sessionService.get('CIEXPEDIDO');
        datoForm4 = JSON.stringify($rootScope.datosForm401);
        $.ajax({
            url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdfPTMovilidad.php',
            type:"post",
            data:{
                "soid": oidCiudadano,
                "sorigen": "IGOB",
                "stipo": "NATURAL",
                "usuario": datosCiudadano,
                "cedula":  datosci,
                "expedido": datosexpedido,
                "empresa": '',
                "nit": '',
                "fecha": $scope.fechafinalserver,
                "hora": $scope.sHoraFinal,
                "data": datoForm4,
                "stipo_form": 'DECLARACIONTV'
            },
            success:function(response){
                var urlData = response;
                $rootScope.decJuradaNaturalPermiso = urlData;
                $scope.InsertarDocumentoTv(response);
                $rootScope.datosEnv.declaracion_jurada = urlData;
                $scope.datos.declaracion_jurada = urlData;
                $scope.guardarDatos($rootScope.datosEnv);
                $.unblockUI();
            }
        });
    };
    $scope.InsertarDocumentoTv = function(urlData){
        var sDocSistema     =   "IGOB247";
        var sDocProceso     =   "GESTOR EMPRESARIAL - DECLARACION JURADA";
        var sDocId          =   1;
        var sDocCiNodo      =   "CU";
        var sDocDatos       =   "";
        var sDocUrl         =   urlData;
        var sDocVersion     =   1;
        var sDocTiempo      =   400;
        var sDocFirmaDigital=   0;
        var sDocUsuario     =   sessionService.get('IDSOLICITANTE');
        var sDocTipoDoc     =   "pdf";
        var sDocTamDoc      =   "";
        var sDocNombre      =   "GESTOR EMPRESARIAL - DECLARACION JURADA";
        var sDocTpsId       =   0;
        var sDocUrlLogica   =   urlData;
        var sDocAcceso      =   "";
        var sDocTipoExt     =   "";
        var sDocNroTramNexo =   "";
        var sCasoCodigo     =   "0";
         var documento  =   new gDocumentosIgob();
            documento.doc_sistema = sDocSistema;
            documento.doc_proceso = sDocProceso;
            documento.doc_id = sDocId;
            documento.doc_ci_nodo = sDocCiNodo;
            documento.doc_datos = sDocDatos;
            documento.doc_url = sDocUrl;
            documento.doc_version = sDocVersion;
            documento.doc_tiempo = sDocTiempo;
            documento.doc_firma_digital = sDocFirmaDigital;
            documento.doc_usuario = sDocUsuario;
            documento.doc_tipo_documento = sDocTipoDoc;
            documento.doc_tamanio_documento = sDocTamDoc;
            documento.doc_nombre = sDocNombre;
            documento.doc_tps_doc_id = sDocTpsId;
            documento.doc_url_logica = sDocUrlLogica;
            documento.doc_acceso = sDocAcceso;
            documento.doc_tipo_documento_ext = sDocTipoExt;
            documento.doc_nrotramite_nexo = sDocNroTramNexo;
            documento.doc_id_codigo = sCasoCodigo;
            documento.insertarDocIgob(function(resultado){
                resultadoApi = JSON.parse(resultado);                           
                if (resultadoApi.success) {
                    srespuesta  =   "TRUE";
                    return srespuesta;
                } else {
                    $.unblockUI();
                    sweet.show(resultadoApi.error.message);
                    srespuesta  =   "FALSE";                          
                    return srespuesta;
                }
            });

    }

    $scope.guardarDatos = function(obj){
        var fechactual          = obtFechaActual.obtenerFechaActual();
        obj.INT_FORM_ALMACENADO = 'G';
        obj.f01_tipo_per = sessionService.get('TIPO_PERSONA');
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
            Parametros.sp_crear_datos_formulario(function(results){ 
                results = JSON.parse(results);
                results = results.success;
                if(results.length > 0){
                    $.unblockUI();
                    $scope.btnEnviarForm    =   false;
                    $scope.btnGuardarForm   =   false;
                   
                    swal('', "Formulario almacenado", 'success');
                }else{
                    $.unblockUI();
                    swal('', "Formulario no almacenado", 'error');
                }
            }); 
        }catch(e){
            $scope.btnGuardarForm   =   false;
            $.unblockUI();
        }
    };

  }
  