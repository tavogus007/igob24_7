function infraccionesController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
  var sIdCiudadano= sessionService.get('IDSOLICITANTE');
  $scope.tipo_persona=sessionService.get('TIPO_PERSONA');
  $scope.oidCiu = sessionService.get('IDSOLICITANTE');
  $scope.tiposTramite = [
    { detalle: 'Impugnación de Infracciones', id:43 ,tipo:$scope.tipo_persona}, 
    { detalle: 'Conmutación de Infracciones', id:45 ,tipo:$scope.tipo_persona},
    { detalle: 'Devoluciòn de Placas y Luminarias', id:49 ,tipo:$scope.tipo_persona},
    { detalle: 'Denuncia Operador de Radio Taxi', id:52 ,tipo:'NATURAL'} 
  ];
  $scope.datos = {};
  $scope.tablaTramites        =   {};
  $scope.tramitesUsuario      =   [];
  $scope.templates =
  [ { name: 'template0.html', url: '../../../app/index.html'},
    { name: 'template1.html', url: '../../../app/view/servicios/varios/formularios/movilidad/infracciones/impugnacion/impugnacion.html'},
    { name: 'template2.html', url: '../../../app/view/servicios/varios/formularios/movilidad/infracciones/conmutacion/conmutacion.html'},
    { name: 'template2.html', url: '../../../app/view/servicios/varios/formularios/movilidad/infracciones/devolucionPlacas/devolucionPlacas.html'},
    { name: 'template4.html', url: '../../../app/view/servicios/varios/formularios/movilidad/infracciones/denunciaOperadorRadioTaxi/denunciaOperadorRadioTaxi.html'}
  ];

  $scope.impugnacion = 43;
  $scope.conmutacion = 45;
  $scope.devolucion  = 49;
  $scope.denunciaOperadorRadioTaxi  = 52;
  $scope.template =   "";

  $scope.inicio = function(){
    $scope.tramitesCiudadano();
    $scope.cargarDatosCiudadano();
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
            $scope.datos.INF_OID = results[0]._id;
            $scope.datos.INF_NIT = results[0].dtspsl_nit;
            $scope.datos.INF_RAZON_SCI = results[0].dtspsl_razon_social;
            $scope.datos.INF_CI_J = results[0].dtspsl_ci_representante;
            $scope.datos.INF_ZONA_J = results[0].dtspsl_zona_desc;   
            $scope.datos.INF_VIA_J = results[0].dtspsl_tipo_via;
            $scope.datos.INF_PODER = results[0].dtspsl_poder_replegal;
            var poder = $scope.datos.INF_PODER.split('/');
            $scope.datos.INF_NRO_NOTARIA = poder[0];
            $scope.datos.INF_NOMBRE_VIA_J = results[0].dtspsl_nombre_via;   
            $scope.datos.INF_NRO_VV_J = results[0].dtspsl_numero_casa;   
            var buscarRepresentante = new rcNatural();
            buscarRepresentante.tipo_persona = "NATURAL"
            buscarRepresentante.ci = $scope.datos.INF_CI_J;
            buscarRepresentante.buscarPersona(function(res){
              var x = JSON.parse(res);
              console.log('111sss',x);
              if (x.error) {
                $.unblockUI();
              }else {
                if (x.length > 0) {
                  $scope.busquedaCiudadano = x[0];
                  $scope.datos.INF_NOMBRE_J = x[0].dtspsl_nombres;
                  $scope.datos.INF_PATERNO_J = x[0].dtspsl_paterno;
                  $scope.datos.INF_MATERNO_J = x[0].dtspsl_materno;
                  $scope.datos.INF_CELULAR_J = x[0].dtspsl_movil;
                  $scope.datos.INF_EXPEDIDO_J = x[0].dtspsl_expedido;
                  console.log($scope.datos,"datos ciudadano");   
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
            $scope.datos.INF_OID = results[0]._id;
            $scope.datos.INF_NOMBRE = results[0].dtspsl_nombres;
            $scope.datos.INF_PATERNO = results[0].dtspsl_paterno;
            $scope.datos.INF_MATERNO = results[0].dtspsl_materno;
            $scope.datos.INF_CASADA = results[0].dtspsl_tercer_apellido;
            $scope.datos.INF_CELULAR = results[0].dtspsl_movil;
            $scope.datos.INF_CORREO = results[0].dtspsl_correo;
            $scope.datos.INF_EXPEDIDO = results[0].dtspsl_expedido;   
            $scope.datos.INF_CI = results[0].dtspsl_ci;    
            $scope.datos.INF_ZONA = results[0].dtspsl_zona;
            $scope.datos.INF_ZONA = results[0].dtspsl_zona_desc;
            $scope.datos.INF_VIA = results[0].dtspsl_tipo_via; 
            $scope.datos.INF_NOMBRE_VIA = results[0].dtspsl_nombre_via;
            $scope.datos.INF_NRO_V = results[0].dtspsl_numero_casa;
            if (results[0].dtspsl_file_fotocopia_ci != "") {
              $scope.datos.INF_CI_ANVERSO = CONFIG.APIURL + "/files/RC_CLI/"+results[0]._id+"/"+results[0].dtspsl_file_fotocopia_ci+"?app_name=todoangular";
            }
            if (results[0].dtspsl_file_fotocopia_ci_r != "") {
              $scope.datos.INF_CI_REVERSO = CONFIG.APIURL + "/files/RC_CLI/"+results[0]._id+"/"+results[0].dtspsl_file_fotocopia_ci_r+"?app_name=todoangular";
            }
          }
        }
        console.log("datos ciudadano",$scope.datos);
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
    var tramites  = new listaTramitesMov();
    tramites.idCiudadano = sIdCiudadano;
    tramites.busquedaMovilidadInfracciones(function(results){
      results = JSON.parse(results).success;
      $scope.tramites = results;
      console.log($scope.tramites,'777');
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
    console.log($scope.tramiteId);
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
    if($scope.procesoSeleccionado == $scope.impugnacion){
      idTemplate = 1;
    }  
    if($scope.procesoSeleccionado == $scope.conmutacion){
      idTemplate = 2;
    }
    if($scope.procesoSeleccionado == $scope.devolucion){
      idTemplate = 3;
    }
    if($scope.procesoSeleccionado == $scope.denunciaOperadorRadioTaxi){
      idTemplate = 4;
    }
    $scope.template = $scope.templates[idTemplate];
    setTimeout(function(){
      $rootScope.$broadcast('inicializarVista', tramite.form_contenido);
    },500);
    $scope.$apply();
    console.log("template",$scope.template);
  };
}
