function modificacionOperadoresController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
  var sIdCiudadano = sessionService.get('IDSOLICITANTE');
  $scope.tramitesUsuario = [];
  $scope.operadoresUsuario = [];
  $scope.operadoresOficinas = [];
  $scope.datos = {};
  $scope.oidCiu = sessionService.get('IDCIUDADANO');
  $scope.tipo_persona = sessionService.get('TIPO_PERSONA');
  $scope.tramiteSeleccionado = '';
  $scope.mostrar_formulario = false;
  $scope.datosOperador = false;
  var idTram = 40;
  $scope.arrayOficinas = [];
  $scope.desabilita = false;
  $scope.desabilitaEnvio = true;
  $scope.documentosarc = new Array();
  $scope.fileArRequisitos = [];      
  $scope.fileArRequisitosArray = [];
  $scope.desabilitaOfi = false;
  var licenciasEmitidas = [];
  var tipoVia = [{"tipo":"AV","desc":"AVENIDA"},{"tipo":"CA","desc":"CALLE"},{"tipo":"CL","desc":"CALLEJON"},{"tipo":"PA","desc":"PASAJE"},{"tipo":"ND","desc":"NO DEFINIDO"}];
  $scope.registro = {};
  $scope.mostrarMapa = false;
  $scope.adjCiu = 0;

  $scope.inicio = function(){
    $scope.tramitesCiudadano();
    $scope.cargarDatosCiudadano();
    $scope.recuperandoDatosGenesis();
    $scope.listarAE();
  }

  $scope.$on('api:ready',function(){
    $scope.initMap();
  });
  //*******************ACTIVIDADES ECONOMICAS************************
  $scope.recuperandoDatosGenesis = function(){
    var tipoContribuyente  = sessionService.get('TIPO_PERSONA');
    var ciDocumento        = '';//sessionService.get('CICIUDADANO'));
    var nitDocumento       = '';//sessionService.get('CICIUDADANO'));
    var sAccion            = '';//sessionService.get('CICIUDADANO'));
    var cicomplem          = '';
    var complento          = '-';
    if($scope.tipo_persona == 'NATURAL'){
        ciDocumento          =   $scope.datos.MO_CI_RL;
        sAccion              =  'C01';
    }else if($scope.tipo_persona == 'JURIDICO'){
        nitDocumento         =   $scope.datos.MO_NIT;
        sAccion              =  'C02';
    }
    var conGenesis  =   new gLstDatos();
    conGenesis.idContribuyente = "";
    conGenesis.clase = "";
    conGenesis.padron = "";
    conGenesis.identificacion = ciDocumento;//'40852017'
    conGenesis.primerNombre = "";
    conGenesis.primerApellido = "";
    conGenesis.segundoApellido = "";
    conGenesis.nit = nitDocumento;
    conGenesis.empresa = "";
    conGenesis.p_accion = sAccion;
    try{
      conGenesis.lstDatosContribuyenteLey272(function(resultado){
        resultadoApi = JSON.parse(resultado);
        console.log(resultadoApi,'resultado');
        if (resultadoApi.success) {
          var response = resultadoApi;
          if(response.success.dataSql.length > 0){
            $scope.dataGenesisCiudadano = response.success.dataSql;
            $scope.datos.dataGenesisCiudadano = $scope.dataGenesisCiudadano;
            console.log('genesis',$scope.dataGenesisCiudadano);
          } else {
            $scope.dataGenesisCiudadano = {};
          }
        } else {
          $scope.txtMsgConexionGen = "Se ha producido un problema de conexion al cargar los datos";
          $.unblockUI();
        }
      });
    }catch(e){
      $scope.txtMsgConexionGen = "Se ha producido un problema de conexion al cargar los datos";
    };
  };

  $scope.listarAE = function () {
    var dataGenesis       = ((typeof($scope.dataGenesisCiudadano)    == 'undefined' || $scope.dataGenesisCiudadano == null) ? {}  : $scope.dataGenesisCiudadano);
    var sNumeroRegistros  = dataGenesis.length;
    if(sNumeroRegistros > 0 ){
      $scope.datos.rdTipoTramite = "MODIFICACION";
      var idContribuyente =   $scope.dataGenesisCiudadano[0].idContribuyente;
      if($scope.tipo_persona == "NATURAL"){
        var tipoPersona = "N";
      }else{
        var tipoPersona = "J";
      }
      var contribuyente   =   new gLstActividadEconomica();
      contribuyente.idContribuyente   =   idContribuyente;
      contribuyente.tipo  =   tipoPersona;
      contribuyente.lstActividadEconomicaLey272(function(resultado){
        resultadoApi = JSON.parse(resultado);
        if (resultadoApi.success) {
          var response    =   resultadoApi;
          if(response.success.dataSql.length > 0){
            licenciasEmitidas = response.success.dataSql;
            console.log('licenciasEmitidas',licenciasEmitidas);
          } 
        } else {
          sweet.show('', "Datos no Encontrados !!!", 'warning');
        }
      });
    }
  };

  //**************************DATOS DEL CIUDADANO********************
  $scope.cargarDatosCiudadano = function(){
    var datosCiudadano   = new rcNatural();
    datosCiudadano.oid = $scope.oidCiu;
    datosCiudadano.datosCiudadanoNatural(function(results){
      results = JSON.parse(results);
      $scope.datosCiudadano = results[0];
      console.log('$scope.datosCiudadano',$scope.datosCiudadano);
      if ( results !=null) {
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
            $scope.datos.MO_OID = results[0]._id;
            $scope.datos.MO_NUM_NOT = results[0].dtspsl_nro_notaria;
            $scope.datos.MO_NIT = results[0].dtspsl_nit;
            $scope.datos.MO_RZ = results[0].dtspsl_razon_social;
            $scope.datos.MO_NRO_OF = results[0].dtspsl_numero_casa;
            $scope.datos.MO_CI_RL = results[0].dtspsl_ci_representante;
            $scope.datos.MO_MAC_ID_OF = results[0].dtspsl_macrodistrito;
            $scope.datos.MO_DIS_ID_OF = results[0].dtspsl_distrito;                      
            $scope.datos.MO_DIS_OF = results[0].dtspsl_distrito_desc;
            $scope.datos.MO_ZON_OF = results[0].dtspsl_zona_desc;   
            $scope.datos.MO_TIP_VIA_OF = results[0].dtspsl_tipo_via;   
            $scope.datos.MO_NOM_VIA_OF = results[0].dtspsl_nombre_via;   
            $scope.datos.MO_NUM_DOM_OF = results[0].dtspsl_numero_casa;   
            $scope.datos.MO_TIP_PER = results[0].dtspsl_tipo_persona;
            $scope.datos.MO_POD_RL = results[0].dtspsl_poder_replegal;
            var poder = $scope.datos.MO_POD_RL.split('/');
            $scope.datos.MO_NUM_P = poder[0];
            $scope.datos.MO_GES_P = poder[1];
            $scope.datos.MO_TEL_OF = results[0].dtspsl_telefono;
            $scope.datos.MO_NOT_RL = results[0].dtspsl_nro_notaria;
            $scope.datos.MO_FUM_EMP = results[0].dtspsl_file_fund_emp;
            $scope.datos.MO_NUM_IDEN = results[0].dtspsl_file_num_ident;
            $scope.datos.MO_PODER = results[0].dtspsl_file_poder_legal;
            $scope.datos.MO_TEST = results[0].dtspsl_file_test_const;
            var buscarRepresentante = new rcNatural();
            buscarRepresentante.tipo_persona = "NATURAL"
            buscarRepresentante.ci = $scope.datos.MO_CI_RL;
            buscarRepresentante.buscarPersona(function(res){
              var x = JSON.parse(res);
              console.log('xxxxx',x);
              if (x.error) {
                $.unblockUI();
              }else {
                if (x.length > 0) {
                  $scope.busquedaCiudadano = x[0];
                  $scope.datos.MO_NOM_RLJ = x[0].dtspsl_nombres;
                  $scope.datos.MO_PAT_RLJ = x[0].dtspsl_paterno;
                  $scope.datos.MO_MAT_RLJ = x[0].dtspsl_materno;
                  $scope.datos.MO_CAS_RLJ = x[0].dtspsl_tercer_apellido;
                  $scope.datos.MO_CEL_RLJ = x[0].dtspsl_movil;
                  $scope.datos.MO_TEL_RLJ = x[0].dtspsl_telefono;
                  $scope.datos.MO_CORR_RLJ = x[0].dtspsl_correo;
                  $scope.datos.MO_EXP_RLJ = x[0].dtspsl_expedido;   
                  $scope.datos.MO_CI_RLJ = x[0].dtspsl_ci;    
                  $scope.datos.MO_MAC_RLJ = x[0].dtspsl_macrodistrito_desc;
                  $scope.datos.MO_ZONA_RLJ = x[0].dtspsl_zona_desc;
                  $scope.datos.MO_ZONAJ = x[0].dtspsl_zona;
                  $scope.datos.MO_TIP_VIA_RLJ = x[0].dtspsl_tipo_via; 
                  $scope.datos.MO_CALL_RLJ = x[0].dtspsl_nombre_via;
                  $scope.datos.MO_NRO_RLJ = x[0].dtspsl_numero_casa;
                  $scope.datos.MO_FEC_NAC_RLJ = x[0].dtspsl_fec_nacimiento;
                  $scope.datos.MO_CIJ = x[0].dtspsl_file_fotocopia_ci;
                  $scope.datos.MO_CI_RJ = x[0].dtspsl_file_fotocopia_ci_r;
                  if (x[0].dtspsl_file_fotocopia_ci!="") {
                    $scope.datos.MO_ARCH1 = CONFIG.APIURL + "/files/RC_CLI/"+x[0]._id+"/"+x[0].dtspsl_file_fotocopia_ci+"?app_name=todoangular";
                  }
                  if (x[0].dtspsl_file_fotocopia_ci_r!="") {
                    $scope.datos.MO_ARCH2 = CONFIG.APIURL + "/files/RC_CLI/"+x[0]._id+"/"+x[0].dtspsl_file_fotocopia_ci_r+"?app_name=todoangular";
                  }
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
            $scope.datos.MO_OID = results[0]._id;
            $scope.datos.MO_NOM_RL = results[0].dtspsl_nombres;
            $scope.datos.MO_PAT_RL = results[0].dtspsl_paterno;
            $scope.datos.MO_MAT_RL = results[0].dtspsl_materno;
            $scope.datos.MO_CAS_RL = results[0].dtspsl_tercer_apellido;
            $scope.datos.MO_CEL_RL = results[0].dtspsl_movil;
            $scope.datos.MO_TEL_RL = results[0].dtspsl_telefono;
            $scope.datos.MO_CORR_RL = results[0].dtspsl_correo;
            $scope.datos.MO_EXP_RL = results[0].dtspsl_expedido;   
            $scope.datos.MO_CI_RL = results[0].dtspsl_ci;    
            $scope.datos.MO_MAC_RL = results[0].dtspsl_macrodistrito_desc;
            $scope.datos.MO_MAC_ID_RL = results[0].dtspsl_macrodistrito;
            $scope.datos.MO_DIS_ID_RL = results[0].dtspsl_distrito;                      
            $scope.datos.MO_DIS_RL = results[0].dtspsl_distrito_desc;
            $scope.datos.MO_ZONA = results[0].dtspsl_zona;
            $scope.datos.MO_ZONA_RL = results[0].dtspsl_zona_desc;
            $scope.datos.MO_TIP_VIA_RL = results[0].dtspsl_tipo_via; 
            $scope.datos.MO_CALL_RL = results[0].dtspsl_nombre_via;
            $scope.datos.MO_NRO_RL = results[0].dtspsl_numero_casa;
            $scope.datos.MO_FEC_NAC_RL = results[0].dtspsl_fec_nacimiento;
            $scope.datos.MO_CI = results[0].dtspsl_file_fotocopia_ci;
            $scope.datos.MO_CI_R = results[0].dtspsl_file_fotocopia_ci_r;
            if (results[0].dtspsl_file_fotocopia_ci != "") {
              $scope.datos.MO_ARCH1 = CONFIG.APIURL + "/files/RC_CLI/"+results[0]._id+"/"+results[0].dtspsl_file_fotocopia_ci+"?app_name=todoangular";
            }
            if (results[0].dtspsl_file_fotocopia_ci_r != "") {
              $scope.datos.MO_ARCH2 = CONFIG.APIURL + "/files/RC_CLI/"+results[0]._id+"/"+results[0].dtspsl_file_fotocopia_ci_r+"?app_name=todoangular";
            }
          }
        }
      }else{
        console.log("NO EXISTE DATOS");
      }
    });
    $scope.$apply();
  };

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

  $scope.tramitesCiudadano = function(){
    var tramites  = new listaTramitesMov();
    tramites.idCiudadano = sIdCiudadano;
    tramites.tra_ser = idTram;
    tramites.spbusquedaformulariomovilidad(function(data){
      var data = JSON.parse(data).success;
      $scope.tramites = data;
      angular.forEach(data,function(val, index)
      {
        if(val['form_contenido'])
        {
          data[index].datos = val['form_contenido'];
        }
      });
      $scope.tramitesUsuario = data;
      console.log($scope.tramitesUsuario,'tramitesU');
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

  $scope.crear_tramite = function()
  {
    if($scope.tipo_persona == "NATURAL")
    {
      var condiciones = $scope.datosCiudadano.dtspsl_file_condiciones_uso;
    }
    if($scope.tipo_persona == "JURIDICO")
    {
      var condiciones = $scope.datosCiudadano.dtspsl_file_condiciones_uso_j;
    }
    if (condiciones == 'undefined' || condiciones == null || condiciones == '') {
      swal('', 'Estimado Ciudadano, para poder proseguir con el trámite deberá aceptar las condiciones de uso en el IGOB 24/7', 'warning');
    } else{
      $.blockUI();
      if ($scope.datosCiudadano.dtspsl_activaciond == 'SI' && $scope.datosCiudadano.dtspsl_activacionf == 'SI') 
      {
        var dataInicio = {};
        var fecha = new Date();
        var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var sIdServicio = idTram;
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
            console.log(response,'response');
            if(response.length  > 0){
              $scope.tramitesCiudadano();
              //sessionService.set('IDTRAMITE', response[0].sp_insertar_formulario_tramites);
              $.unblockUI();
              alertify.success('Tramite creado correctamente');
              var tramiteCiu = {}; 
              console.log(response[0].sp_insertar_formulario_tramites_datos,'idtramite');
              tramiteCiu.vtra_id =  response[0].sp_insertar_formulario_tramites_datos;
              tramiteCiu.venviado =  'NO';
              $scope.seleccionarTramite(tramiteCiu);
            }
            else{
              $.unblockUI();
            }
          });
        }                         catch(e){
          console.log('*Error*', e);
          $.unblockUI();
        }
      } else{
        swal('', "Debe realizar las activaciones fisica y digital para poder realizar el trámite", 'warning');
      };
    }
  }

  $scope.seleccionar = function(idTramite){
    $scope.tramiteSeleccionado = idTramite;
  }
  //**********************DATOS DEL TRAMITE***********************
  $scope.seleccionarTramite = function(tramite){
    console.log('tramite',tramite);
    sessionService.set('IDTRAMITE',tramite.vtra_id);
    $scope.arrayOficinas = [];
    $scope.mostrar_formulario = true;
    if(tramite.venviado == 'SI'){
      $scope.desabilita = true;
      $scope.datos = JSON.parse(tramite.form_contenido);
      $scope.datosOperador = true;
      var data = $scope.datos.oficinas;
      $scope.operadoresOficinas = data;
      $scope.tablaOficinas.reload();
    }else{
      $scope.desabilita = false;
      $scope.datosOperador = false;
      if(sessionService.get('TIPO_PERSONA')=='JURIDICO'){
        var nroDocCiu = sessionService.get('NITCIUDADANO');
      }else{
        var nroDocCiu = sessionService.get('CICIUDADANO');
      }
      var opeHab = new operadoresHab();
      opeHab.nroDoc = nroDocCiu;
      opeHab.idCiu = sIdCiudadano;
      opeHab.listaOperadoresRep(function(results){
        results = JSON.parse(results).success.data; 
        console.log('results',results);
        $scope.operadoresUsuario = results;
        $scope.tablaOperadores.reload();
      })
    }
  }  

  $scope.tablaOperadores = new ngTableParams({
    page: 1,
    count: 5,
    filter: {},
    sorting: { xope_id: 'desc' }
  },{
    total: $scope.operadoresUsuario.length,
    getData: function($defer, params)
    {
      var filteredData = params.filter() ?
      $filter('filter')($scope.operadoresUsuario, params.filter()) :
      $scope.operadoresUsuario;
      var orderedData = params.sorting() ?
      $filter('orderBy')(filteredData, params.orderBy()) :
      $scope.operadoresUsuario;
      params.total($scope.operadoresUsuario.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.seleccionarOperador = function(idOperador){
    $scope.operadorSeleccionado = idOperador;
  }

  $scope.listaDatosOperador = function(operador){
    $scope.datosOperador = true;
    $scope.datos.MO_ID_OPE = operador.xope_id; 
    $scope.datos.MO_OPE = operador.xope_tipo_operador;
    $scope.datos.MO_MOD = operador.xope_datos.RO_MOD;
    $scope.datos.MO_MOD_VALUE = operador.xope_datos.RO_MOD_VALUE;
    $scope.datos.MO_TIP_SER = operador.xope_datos.RO_TIP_SER;
    var listaOficinas = new oficinasAprobadas();
    listaOficinas.idOperador = $scope.datos.MO_ID_OPE;
    listaOficinas.listaOficinasAprob(function(data){
      var data = JSON.parse(data).success.data;
      console.log("data oficinas",data);
      var oficinasLicencias = [];
      for (var i = 0; i < data.length; i++) {
        for (var k = 0; k < licenciasEmitidas.length; k++) {
          console.log(licenciasEmitidas[k].Direccion.indexOf(data[i].xofi_datos.RO_ZONA_OF_VALUE),data[i].xofi_datos.RO_ZONA_OF_VALUE,
            licenciasEmitidas[k].Direccion,11111);
          if(licenciasEmitidas[k].Direccion.indexOf(data[i].xofi_datos.RO_ZONA_OF_VALUE) > -1 && licenciasEmitidas[k].Direccion.indexOf(data[i].xofi_datos.RO_NRO_SUC) >-1 && licenciasEmitidas[k].Descripcion == "SERVICIO DE RADIOTAXIS"){
            data[i].Descripcion = licenciasEmitidas[k].Descripcion;
            data[i].Direccion = licenciasEmitidas[k].Direccion;
            data[i].Estado = licenciasEmitidas[k].Estado; 
            data[i].FechaInicio = licenciasEmitidas[k].FechaInicio;
            data[i].IdActividad = licenciasEmitidas[k].IdActividad;
            data[i].Nro = licenciasEmitidas[k].Nro;
            data[i].deudaActividad = licenciasEmitidas[k].deudaActividad;
            oficinasLicencias.push(data[i]);
            //console.log("ofic lic",data[i],direc);
          }
        }
      }
      console.log(data,'oficinas');
      console.log(licenciasEmitidas,'licen');
      if(oficinasLicencias.length > 0){
        data = oficinasLicencias;
        $scope.operadoresOficinas = oficinasLicencias;
        $scope.tablaOficinas.reload();
      }else{
        data = [];
        $scope.operadoresOficinas = [];
        $scope.tablaOficinas.reload();
        swal("", "No se tiene niguna oficina para la realizar la modificación", "warning"); 
      }
    })
  }

  $scope.tablaOficinas = new ngTableParams({
    page: 1,
    count: 5,
    filter: {},
    sorting: { xope_id: 'desc' }
  },{
    total: $scope.operadoresOficinas.length,
    getData: function($defer, params)
    {
      var filteredData = params.filter() ?
      $filter('filter')($scope.operadoresOficinas, params.filter()) :
      $scope.operadoresOficinas;
      var orderedData = params.sorting() ?
      $filter('orderBy')(filteredData, params.orderBy()) :
      $scope.operadoresOficinas;
      params.total($scope.operadoresOficinas.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.seleccionarOficinas = function(idOficina){
    $scope.oficinaSeleccionada = idOficina;
  } 
  //************************OFICINA*****************************
  $scope.modificaOficina = function(oficina){
    console.log('oficina',oficina);
    if(oficina.deudaActividad == 'ACTIVIDAD SIN DEUDA'){
      $scope.fileArRequisitos = [];      
      $scope.fileArRequisitosArray = [];
      $scope.desabilitaOfi1 = true;
      $scope.desabilitaUbi = true;
      $scope.desabilitaViae = true;
      $scope.datosOficina = oficina;
      $scope.datosOficina.fileArRequisitosArray = $scope.fileArRequisitosArray;
      $scope.datosOficina.fileArRequisitos = $scope.fileArRequisitos;        
      if($scope.datos.MO_MOD_VALUE==1){
        $scope.datosOficina.rdTipoTramite1 = 'CON PUBLICIDAD';
      }
      $scope.macrodistritos();
      $scope.distritoZonas($scope.datosOficina.xofi_datos.RO_MAC_OF_VALUE);
      $scope.botonn = 'new';
      $scope.publi=[];
      $scope.lssubcategoria();
      $scope.mostrarUbicacion = true;
      var datosGenerales = new getDatosAEViae();
      datosGenerales.idActividadEconomica = oficina.IdActividad;
      datosGenerales.getDatosAE_Viae(function(resultado){
        var resultadoAe = JSON.parse(resultado).success.dataSql;
        $scope.datosOficina.resultadoAe = resultadoAe;
        console.log($scope.datosOficina.resultadoAe,'actvidad Economica');
      });
      if($scope.datosOficina.resultadoAe.datosVIAE.length == ''){
        $scope.publicid = [];
      }else{
        $scope.publicid = $scope.datosOficina.resultadoAe.datosVIAE;
      }
      console.log($scope.publicid,8989);
      $scope.datosOficina.viaAntiguo = $scope.datosOficina.resultadoAe.datosVIAE;
      $scope.datosOficina.xofi_viae = $scope.datosOficina.resultadoAe.datosVIAE;
    }else{
      swal('','Esa Actividad Economica tiene deudas para realizar la modificación debe cancelar sus deudas', 'warning');
    }
  }

  $scope.siguiente = function(){
    var requisitos = new listaRequisitos()
    requisitos.tipo = 'CAMBIO_OFICINA';
    requisitos.lstRequisitos(function(results){
      $scope.requisitos = JSON.parse(results).success.data;
      $scope.mostrarUbicacion = false;
      setTimeout(function(){
        iniciarLoadFyle();
      }, 1000);
    })
  }

  $scope.actualizaOficina = function(oficina){
    console.log('OFICINA',oficina);
    $scope.capturarImagen(oficina.xofi_datos.RO_MAC_OF_VALUE);
    oficina.xofi_datos.RO_CROQUIS_OFI = $scope.datos.INT_AC_direccionImagenmapa;
    for (var i = 1; i<$scope.aMacrodistritos.length ; i++) {
      if($scope.aMacrodistritos[i].mcdstt_macrodistrito==oficina.xofi_datos.RO_MAC_OF_VALUE){
        oficina.xofi_datos.RO_MAC_OF = $scope.aMacrodistritos[i].mcdstt_id;
      }
    }
    $scope.distritoZonas(oficina.xofi_datos.RO_MAC_OF_VALUE);
    for (var i = 1; i<$scope.aDistritoZona.length ; i++) {
      if($scope.aDistritoZona[i].dist_nombre == oficina.xofi_datos.RO_ZONA_OF_VALUE){
        oficina.xofi_datos.RO_ZONA_OF = $scope.aDistritoZona[i].dist_id;
        oficina.xofi_datos.RO_DIS_ID_OF = $scope.aDistritoZona[i].dist_dstt_id;
      }
    }
    var macro   = oficina.xofi_datos.RO_MAC_OF_VALUE;
    oficina.xofi_oficina = macro;
    var tipoAct = oficina.xofi_datos.RO_TIP_ACT;
    if(tipoAct == 'MA'){
      oficina.xofi_datos.RO_TIP_ACT_SUC = 'MATRIZ';
    }else{
      oficina.xofi_datos.RO_TIP_ACT_SUC = 'SUCURSAL';
    }
    if(oficina.xofi_datos.RO_CAN_VEH_SUC == undefined ){
      swal("", "La cantidad de vehiculos debe ser mayor a 20", "warning"); 
    }else{
      if(oficina.rdTipoTramite1 == 'CON PUBLICIDAD'){
        var viae = oficina.xofi_viae;
      }else{
        var viae = [];
      }
      if($scope.datos.MO_MOD_VALUE == 1 && viae.length == 0){
        swal("", "Para el caso de Radio Taxi debe registrar por lo menos un Elemento de Identificación", "warning");  
      }else{
        var pos = -1;
        for (var i = 0; i < $scope.arrayOficinas.length; i++) {
          console.log($scope.arrayOficinas[i],11);
          if($scope.arrayOficinas[i].xofi_id == oficina.xofi_id){
            pos = i;
          }
        }
        if(pos == -1){
          $scope.arrayOficinas.push(oficina);
        }else{
          $scope.arrayOficinas[pos] = oficina;
        }
      }
    }
  }
  //*********************Modificacion Oficina*******************
  $scope.activaCambioOficina = function(validarOfi){
    console.log(validarOfi,123456);
    if(validarOfi==true){
      $scope.datosOficina.f10_modificacionAE = validarOfi;
      $scope.datosOficina.f01_modificarACEC = 'MODIFICARAE';
      $scope.desabilitaOfi1 = false;
    }else{
      $scope.datosOficina.f10_modificacionAE = validarOfi;
      $scope.desabilitaOfi1 = true;
    }
  }

  $scope.activaCambioUbicacion = function(validarLic){
    console.log(12,validarLic);
    if(validarLic == true){
      $scope.datosOficina.f10_modificacionLIC = true;
      $scope.datosOficina.f01_modificarlic = 'MODIFICARLIC';
      $scope.desabilitaUbi = false;
    }else{
      $scope.datosOficina.f10_modificacionLIC = false;
      $scope.desabilitaUbi = true; 
    }  
  }

  $scope.activaCambioViae = function(validarViae){
    if(validarViae == true){
      $scope.datosOficina.f10_modificacionVIAE = validarViae;
      $scope.datosOficina.f01_modificarVIAE = 'MODIFICARVIAE';
      $scope.desabilitaViae = false; 
    }else{
      $scope.datosOficina.f10_modificacionVIAE = validarViae;      
      $scope.desabilitaViae = true; 
    }  
  }
  //*************************Adjuntos***************************
  $scope.ejecutarFile = function(idfile){
    var sid =   document.getElementById(idfile);
    if(sid){
      $scope.adjCiu = 0;
        document.getElementById(idfile).click();
    }else{
        alert("Error ");
    }
  };

  $scope.ejecutarFileCiu = function(idfile){
    var sid =   document.getElementById(idfile);
    if(sid){
      $scope.adjCiu = 1;
        document.getElementById(idfile).click();
    }else{
        alert("Error ");
    }
  };

  $scope.cambiarFile = function(obj, valor){
    if($scope.adjCiu == 1){
      if(valor == ''){
        if(obj.name == 'FILE_FOTOCOPIA_CI'){
          var ciAnv = $scope.registro.FILE_FOTOCOPIA_CI;
          $("#txt_FILE_FOTOCOPIA_CI").val(ciAnv);
        }
        if(obj.name == 'FILE_FOTOCOPIA_CI_R'){
          var ciRev = $scope.registro.FILE_FOTOCOPIA_CI_R;
          $("#txt_FILE_FOTOCOPIA_CI_R").val(ciRev);
        }
        if(obj.name == 'FILE_PODER_LEGAL'){
          var poder = $scope.registro.FILE_PODER_LEGAL;
          $("#txt_FILE_PODER_LEGAL").val(poder);
        }
        if(obj.name == 'FILE_TEST_CONST'){
          var test = $scope.registro.FILE_TEST_CONST;
          $("#txt_FILE_TEST_CONST").val(test);
        }
        if(obj.name == 'FILE_NUM_IDENT'){
          var num = $scope.registro.FILE_NUM_IDENT;
          $("#txt_FILE_NUM_IDENT").val(num);
        }
        if(obj.name == 'FILE_FUND_EMP'){
          var test = $scope.registro.FILE_FUND_EMP;
          $("#txt_FILE_FUND_EMP").val(test);
        }
        if(obj.name == 'FILE_CONDICIONES_USO_J'){
          var test = $scope.registro.FILE_CONDICIONES_USO_J;
          $("#txt_FILE_CONDICIONES_USO_J").val(test);
        }
        if(obj.name == 'FILE_CONDICIONES_USO'){
          var test = $scope.registro.FILE_CONDICIONES_USO;
          $("#txt_FILE_CONDICIONES_USO").val(test);
        }
      }else{
        $scope.registro[obj.name] = valor;
      }
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
      setTimeout(function(){
        var nombre = obj.getAttribute("name");
        var tamaniofile = obj.files[0];
        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI";
        var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/";
        if (nombre == 'FILE_FOTOCOPIA_CI' && (typeof(obj.files[0]) != 'undefined')) {
          var tipoDocci = obj.files[0].name;
          var nameArrayci = tipoDocci.split('.');
          tipoDocci = nameArrayci[1];
          var nombreci = nameArrayci[0] + '.zip';
          if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
            if (tipoDocci == "png" || tipoDocci == "jpg" || tipoDocci == "jpeg" || tipoDocci == "bmp" || tipoDocci == "gif" || tipoDocci == "PNG" || tipoDocci == "JPG" || tipoDocci == "JPEG" || tipoDocci == "BMP" || tipoDocci == "GIF") {
              var filecompress = compressImage($scope.FILE_FOTOCOPIA_CI).then(function(respuestaci){
                var imagenCia = respuestaci.name.split('.');
                var tipoCia = imagenCia[1];
                nombreNuevoCIAnverso = 'CI_anverso_'+fechaNueva+'.'+tipoCia;
                fileUpload1.uploadFileToUrl1(respuestaci, uploadUrl, nombreNuevoCIAnverso);
                $scope.registro.FILE_FOTOCOPIA_CI = nombreNuevoCIAnverso;
                $scope.FILE_FOTOCOPIA_CI = nombreNuevoCIAnverso;
                $scope.btover = true;
              });
            } else{
              if (tipoDocci == 'pdf' ||  tipoDocci == 'docx' ||  tipoDocci == 'docxlm' || tipoDocci == 'PDF' ||  tipoDocci == 'DOCX' ||  tipoDocci == 'DOCXLM') {
                var zipci = new JSZip();
                zipci.file($scope.FILE_FOTOCOPIA_CI.name, $scope.FILE_FOTOCOPIA_CI);
                zipci.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobci) {
                  nombreNuevoCIAnverso = 'CI_anverso_'+fechaNueva+'.zip';
                  fileUpload1.uploadFileToUrl1(blobci, uploadUrl, nombreNuevoCIAnverso);
                  $scope.registro.FILE_FOTOCOPIA_CI = nombreNuevoCIAnverso;
                  $scope.FILE_FOTOCOPIA_CI = nombreNuevoCIAnverso;
                  $scope.btover=true;
                })
              }
              else{
                swal('Advertencia', 'El archivo CEDULA DE IDENTIDAD no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('txt_FILE_FOTOCOPIA_CI').value = '';
                document.getElementById('FILE_FOTOCOPIA_CI').value = '';
                $scope.registro.FILE_FOTOCOPIA_CI = '';
                $scope.FILE_FOTOCOPIA_CI = '';
                valor = '';
                $.unblockUI();
              };
            };
          }
          else{
              if (tamaniofile.size <= 500000) {
                  if (tipoDocci == 'png' || tipoDocci == 'jpg' || tipoDocci == 'jpeg' || tipoDocci == 'bmp' || tipoDocci == 'gif' || tipoDocci == 'pdf' || tipoDocci == 'docx' || tipoDocci == 'docxlm') {
                      nombreNuevoCIAnverso = 'CI_anverso_'+fechaNueva+'.'+tipoDocci;
                      fileUpload1.uploadFileToUrl1($scope.FILE_FOTOCOPIA_CI, uploadUrl,nombreNuevoCIAnverso);
                      $scope.registro.FILE_FOTOCOPIA_CI = nombreNuevoCIAnverso;
                      $scope.btover=true;
                      $.unblockUI();
                  } else{
                      swal('Advertencia', 'El archivo CEDULA DE IDENTIDAD no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                      document.getElementById('txt_FILE_FOTOCOPIA_CI').value = '';
                      document.getElementById('FILE_FOTOCOPIA_CI').value = '';
                      $scope.registro.FILE_FOTOCOPIA_CI = '';
                      $scope.FILE_FOTOCOPIA_CI = '';
                      valor = '';
                      $.unblockUI();
                  };
              };
              if (tamaniofile.size > 15000000) {
                  swal('Advertencia', 'El tamaño de la imagen CEDULA DE IDENTIDAD es muy grande', 'error');
                  document.getElementById('txt_FILE_FOTOCOPIA_CI').value = '';
                  document.getElementById('FILE_FOTOCOPIA_CI').value = '';
                  $scope.registro.FILE_FOTOCOPIA_CI = '';
                  $scope.FILE_FOTOCOPIA_CI = '';
                  valor = '';
                  $.unblockUI();
              };
          }
        }
        if(nombre == 'FILE_FOTOCOPIA_CI_R' && (typeof(obj.files[0]) != 'undefined')){
          var tipoDoccir = obj.files[0].name;
          var nameArraycir = tipoDoccir.split('.');
          tipoDoccir = nameArraycir[1];
          var nombrecir = nameArraycir[0] + '.zip';
          if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
            if (tipoDoccir == "png" || tipoDoccir == "jpg" || tipoDoccir == "jpeg" || tipoDoccir == "bmp" || tipoDoccir == "gif" || tipoDoccir == "PNG" || tipoDoccir == "JPG" || tipoDoccir == "JPEG" || tipoDoccir == "BMP" || tipoDoccir == "GIF") {
              var filecompress = compressImage($scope.FILE_FOTOCOPIA_CI_R).then(function(respuestacir){
                var imagenCir = respuestacir.name.split('.');
                var tipoCir = imagenCir[1];
                nombreNuevoCIReverso = 'CI_reverso_'+fechaNueva+'.'+tipoCir;
                fileUpload1.uploadFileToUrl1(respuestacir, uploadUrl, nombreNuevoCIReverso);
                $scope.registro.FILE_FOTOCOPIA_CI_R = nombreNuevoCIReverso;
                $scope.FILE_FOTOCOPIA_CI_R = respuestacir;
                $scope.btover1=true;
              });
            } else{
              if (tipoDoccir == 'pdf' ||  tipoDoccir == 'docx' ||  tipoDoccir == 'docxlm' || tipoDoccir == 'PDF' ||  tipoDoccir == 'DOCX' ||  tipoDoccir == 'DOCXML') {
                var zipcir = new JSZip();
                zipcir.file($scope.FILE_FOTOCOPIA_CI_R.name, $scope.FILE_FOTOCOPIA_CI_R);
                zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobcir) {
                  nombreNuevoCIReverso = 'CI_reverso_'+fechaNueva+'.zip';
                  fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevoCIReverso);
                  $scope.registro.FILE_FOTOCOPIA_CI_R = nombreNuevoCIReverso;
                  $scope.FILE_FOTOCOPIA_CI_R = blobcir;
                  $scope.btover1=true;
                })
              }
              else{
                swal('Advertencia', 'El archivo CEDULA DE IDENTIDAD no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('txt_FILE_FOTOCOPIA_CI_R').value = '';
                document.getElementById('FILE_FOTOCOPIA_CI_R').value = '';
                $scope.registro.FILE_FOTOCOPIA_CI_R = '';
                $scope.FILE_FOTOCOPIA_CI_R = '';
                valor = '';
                $.unblockUI();
              };
            };
          }
          else{
            if (tamaniofile.size <= 500000) {
              if (tipoDoccir == 'png' || tipoDoccir == 'jpg' || tipoDoccir == 'jpeg' || tipoDoccir == 'bmp' || tipoDoccir == 'gif' || tipoDoccir == 'pdf' || tipoDoccir == 'docx' || tipoDoccir == 'docxlm') {
                nombreNuevoCIReverso = 'CI_reverso_'+fechaNueva+'.'+tipoDoccir;
                fileUpload1.uploadFileToUrl1($scope.FILE_FOTOCOPIA_CI_R, uploadUrl, nombreNuevoCIReverso);
                $scope.registro.FILE_FOTOCOPIA_CI_R = nombreNuevoCIReverso;
                $scope.btover1=true;
                $.unblockUI();
              } else{
                swal('Advertencia', 'El archivo CEDULA DE IDENTIDAD no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('txt_FILE_FOTOCOPIA_CI_R').value = '';
                document.getElementById('FILE_FOTOCOPIA_CI_R').value = '';
                $scope.registro.FILE_FOTOCOPIA_CI_R = '';
                $scope.FILE_FOTOCOPIA_CI_R = '';
                valor = '';
                $.unblockUI();
              };
            };
            if (tamaniofile.size > 15000000) {
              swal('Advertencia', 'El tamaño de la imagen CEDULA DE IDENTIDAD es muy grande', 'error');
              document.getElementById('txt_FILE_FOTOCOPIA_CI_R').value = '';
              document.getElementById('FILE_FOTOCOPIA_CI_R').value = '';
              $scope.registro.FILE_FOTOCOPIA_CI_R = '';
              $scope.FILE_FOTOCOPIA_CI_R = '';
              valor = '';
              $.unblockUI();
            };
          }
        }
        if(nombre == 'FILE_PODER_LEGAL' && (typeof(obj.files[0]) != 'undefined')){
          var tipoDocpl = obj.files[0].name;
          var nameArraypl = tipoDocpl.split('.');
          tipoDocpl = nameArraypl[1];
          var nombrepl = nameArraypl[0] + '.zip';
          if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
            if (tipoDocpl == "png" || tipoDocpl == "jpg" || tipoDocpl == "jpeg" || tipoDocpl == "bmp" || tipoDocpl == "gif" || tipoDocpl == "PNG" || tipoDocpl == "JPG" || tipoDocpl == "JPEG" || tipoDocpl == "BMP" || tipoDocpl == "GIF") {
              var filecompress = compressImage($scope.FILE_PODER_LEGAL).then(function(respuestapl){
                var imagenPoder = respuestapl.name.split('.');
                var tipoPoder = imagenPoder[1];
                nombreNuevoPoderLegal = 'poder_'+fechaNueva+'.'+tipoPoder;
                fileUpload1.uploadFileToUrl1(respuestapl, uploadUrl, nombreNuevoPoderLegal);
                $scope.registro.FILE_PODER_LEGAL = nombreNuevoPoderLegal;
                $scope.FILE_PODER_LEGAL = respuestapl;
              });
            } else{
              if (tipoDocpl == 'pdf' ||  tipoDocpl == 'docx' ||  tipoDocpl == 'docxlm' || tipoDocpl == 'PDF' ||  tipoDocpl == 'DOCX' ||  tipoDocpl == 'DOCXML') {
                var zippl = new JSZip();
                zippl.file($scope.FILE_PODER_LEGAL.name, $scope.FILE_PODER_LEGAL);
                zippl.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobpl) {
                  nombreNuevoPoderLegal = 'poder_'+fechaNueva+'.zip';
                  fileUpload1.uploadFileToUrl1(blobpl, uploadUrl,nombreNuevoPoderLegal);
                  $scope.registro.FILE_PODER_LEGAL = blobpl.name;
                  $scope.FILE_PODER_LEGAL = blobpl;
                })
              }
              else{
                swal('Advertencia', 'El archivo PODER DEL REPRESENTANTE LEGAL no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('txt_FILE_PODER_LEGAL').value = '';
                document.getElementById('FILE_PODER_LEGAL').value = '';
                $scope.registro.FILE_PODER_LEGAL = '';
                $scope.FILE_PODER_LEGAL = '';
                valor = '';
                $.unblockUI();
              };
            };
          }
          else{
            if (tamaniofile.size <= 500000) {
              if (tipoDocpl == 'png' || tipoDocpl == 'jpg' || tipoDocpl == 'jpeg' || tipoDocpl == 'bmp' || tipoDocpl == 'gif' || tipoDocpl == 'pdf' || tipoDocpl == 'docx' || tipoDocpl == 'docxlm') {
                nombreNuevoPoderLegal = 'poder_'+fechaNueva+'.'+tipoDocpl;
                fileUpload1.uploadFileToUrl1($scope.FILE_PODER_LEGAL, uploadUrl,nombreNuevoPoderLegal);
                $scope.registro.FILE_PODER_LEGAL = nombreNuevoPoderLegal;
                $.unblockUI();
              } else{
                swal('Advertencia', 'El archivo PODER DEL REPRESENTANTE LEGAL no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('txt_FILE_PODER_LEGAL').value = '';
                document.getElementById('FILE_PODER_LEGAL').value = '';
                $scope.registro.FILE_PODER_LEGAL = '';
                $scope.FILE_PODER_LEGAL = '';
                valor = '';
                $.unblockUI();
              };
            };
            if (tamaniofile.size > 15000000) {
              swal('Advertencia', 'El tamaño del archivo PODER DEL REPRESENTANTE LEGAL es muy grande', 'error');
              document.getElementById('txt_FILE_PODER_LEGAL').value = '';
              document.getElementById('FILE_PODER_LEGAL').value = '';
              $scope.registro.FILE_PODER_LEGAL = '';
              $scope.FILE_PODER_LEGAL = '';
              valor = '';
              $.unblockUI();
            }
          }
        }
        if(nombre == 'FILE_TEST_CONST' && (typeof(obj.files[0]) != 'undefined')){
          var tipoDoctc = obj.files[0].name;
          var nameArraytc = tipoDoctc.split('.');
          tipoDoctc = nameArraytc[1];
          var nombretc = nameArraytc[0] + '.zip';
          if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
            if (tipoDoctc == "png" || tipoDoctc == "jpg" || tipoDoctc == "jpeg" || tipoDoctc == "bmp" || tipoDoctc == "gif"
                || tipoDoctc == "PNG" || tipoDoctc == "JPG" || tipoDoctc == "JPEG" || tipoDoctc == "BMP" || tipoDoctc == "GIF") {
              var filecompress = compressImage($scope.FILE_TEST_CONST).then(function(respuestatc){
                var imagenTestimonio = respuestatc.name.split('.');
                var tipoT = imagenTestimonio[1];
                nombreNuevoTestimonio = 'testimonio_'+fechaNueva+'.'+tipoT;
                fileUpload1.uploadFileToUrl1(respuestatc, uploadUrl, nombreNuevoTestimonio);
                $scope.registro.FILE_TEST_CONST = nombreNuevoTestimonio;
                $scope.FILE_TEST_CONST = respuestatc;
              });
            } else{
              if (tipoDoctc == 'pdf' ||  tipoDoctc == 'docx' ||  tipoDoctc == 'docxlm' || tipoDoctc == 'PDF' ||  tipoDoctc == 'DOCX' ||  tipoDoctc == 'DOCXML') {
                var ziptc = new JSZip();
                ziptc.file($scope.FILE_TEST_CONST.name, $scope.FILE_TEST_CONST);
                ziptc.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobtc) {
                  nombreNuevoTestimonio = 'testimonio_'+fechaNueva+'.zip';
                  fileUpload1.uploadFileToUrl1(blobtc, uploadUrl, nombreNuevoTestimonio);
                  $scope.registro.FILE_TEST_CONST = nombreNuevoTestimonio;
                  $scope.FILE_TEST_CONST = blobtc;
                })
              }
              else{
                swal('Advertencia', 'El archivo TESTIMONIO DE CONSTITUCION no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('txt_FILE_TEST_CONST').value = '';
                document.getElementById('FILE_TEST_CONST').value = '';
                $scope.registro.FILE_TEST_CONST = '';
                $scope.FILE_TEST_CONST = '';
                valor = '';
                $.unblockUI();
              };
            };
          }
          else{
            if (tamaniofile.size <= 500000) {
              if (tipoDoctc == 'png' || tipoDoctc == 'jpg' || tipoDoctc == 'jpeg' || tipoDoctc == 'bmp' || tipoDoctc == 'gif' || tipoDoctc == 'pdf' || tipoDoctc == 'docx' || tipoDoctc == 'docxlm') {
                nombreNuevoTestimonio = 'testimonio_'+fechaNueva+'.'+tipoDoctc;
                fileUpload1.uploadFileToUrl1($scope.FILE_TEST_CONST, uploadUrl, nombreNuevoTestimonio);
                $scope.registro.FILE_TEST_CONST = nombreNuevoTestimonio;
                $.unblockUI();
              } else{
                swal('Advertencia', 'El archivo TESTIMONIO DE CONSTITUCION no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('txt_FILE_TEST_CONST').value = '';
                document.getElementById('FILE_TEST_CONST').value = '';
                $scope.registro.FILE_TEST_CONST = '';
                $scope.FILE_TEST_CONST = '';
                valor = '';
                $.unblockUI();
              };
            };
            if (tamaniofile.size > 15000000) {
              swal('Advertencia', 'El tamaño del archivo TESTIMONIO DE CONSTITUCION es muy grande', 'error');
              document.getElementById('FILE_TEST_CONST').value = '';
              document.getElementById('txt_FILE_TEST_CONST').value = '';
              $scope.registro.FILE_TEST_CONST = '';
              $scope.FILE_TEST_CONST = '';
              valor = '';
              $.unblockUI();
            }
          }
        }
        if(nombre == 'FILE_NUM_IDENT' && (typeof(obj.files[0]) != 'undefined')){
          var tipoDocnu = obj.files[0].name;
          var nameArraynu = tipoDocnu.split('.');
          tipoDocnu = nameArraynu[1];
          var nombrenu = nameArraynu[0] + '.zip';
          if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
            if (tipoDocnu == "png" || tipoDocnu == "jpg" || tipoDocnu == "jpeg" || tipoDocnu == "bmp" || tipoDocnu == "gif" ||
                tipoDocnu == "PNG" || tipoDocnu == "JPG" || tipoDocnu == "JPEG" || tipoDocnu == "BMP" || tipoDocnu == "GIF") {
              var filecompress = compressImage($scope.FILE_NUM_IDENT).then(function(respuestani){
                var imagenNit = respuestani.name.split('.');
                var tipoTest = imagenNit[1];
                nombreNuevoNit = 'nit_'+fechaNueva+'.'+tipoTest;
                fileUpload1.uploadFileToUrl1(respuestani, uploadUrl, nombreNuevoNit);
                $scope.registro.FILE_NUM_IDENT = nombreNuevoNit;
                $scope.FILE_NUM_IDENT = respuestani;
              });
            } else{
              if (tipoDocnu == 'pdf' ||  tipoDocnu == 'docx' ||  tipoDocnu == 'docxlm' || tipoDocnu == 'PDF' ||  tipoDocnu == 'DOCX' ||  tipoDocnu == 'DOCXML') {
                var zipnu = new JSZip();
                zipnu.file($scope.FILE_NUM_IDENT.name, $scope.FILE_NUM_IDENT);
                zipnu.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobni) {
                  nombreNuevoNit = 'nit_'+fechaNueva+'.zip';
                  fileUpload1.uploadFileToUrl1(blobni, uploadUrl, nombreNuevoNit);
                  $scope.registro.FILE_NUM_IDENT = nombreNuevoNit;
                  $scope.FILE_NUM_IDENT = blobni;
                })
              }
              else{
                swal('Advertencia', 'El archivo NUMERO DE IDENTIFICACION no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('FILE_NUM_IDENT').value = '';
                document.getElementById('txt_FILE_NUM_IDENT').value = '';
                $scope.registro.FILE_NUM_IDENT = '';
                $scope.FILE_NUM_IDENT = '';
                valor = '';
                $.unblockUI();
              };
            };
          }
          else{
            if (tamaniofile.size <= 500000) {
              if (tipoDocnu == 'png' || tipoDocnu == 'jpg' || tipoDocnu == 'jpeg' || tipoDocnu == 'bmp' || tipoDocnu == 'gif' || tipoDocnu == 'pdf' || tipoDocnu == 'docx' || tipoDocnu == 'docxlm') {
                nombreNuevoNit = 'nit_'+fechaNueva+'.'+tipoDocnu;
                fileUpload1.uploadFileToUrl1($scope.FILE_NUM_IDENT, uploadUrl, nombreNuevoNit);
                $scope.registro.FILE_NUM_IDENT = nombreNuevoNit;
                $.unblockUI();
              } else{
                swal('Advertencia', 'El archivo NUMERO DE IDENTIFICACION no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('txt_FILE_NUM_IDENT').value = '';
                document.getElementById('FILE_NUM_IDENT').value = '';
                $scope.registro.FILE_NUM_IDENT = '';
                $scope.FILE_NUM_IDENT = '';
                valor = '';
                $.unblockUI();
              };
            };
            if (tamaniofile.size > 15000000) {
              swal('Advertencia', 'El tamaño del archivo NUMERO DE IDENTIFICACION es muy grande', 'error');
              document.getElementById('txt_FILE_NUM_IDENT').value = '';
              document.getElementById('FILE_NUM_IDENT').value = '';
              $scope.registro.FILE_NUM_IDENT = '';
              $scope.FILE_NUM_IDENT = '';
              valor = '';
              $.unblockUI();
            };
          }
        }
        if(nombre == 'FILE_FUND_EMP' && (typeof(obj.files[0]) != 'undefined')){
          var tipoDocfe = obj.files[0].name;
          var nameArrayfe = tipoDocfe.split('.');
          tipoDocfe = nameArrayfe[1];
          var nombrefe = nameArrayfe[0] + '.zip';
          if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
            if (tipoDocfe == "png" || tipoDocfe == "jpg" || tipoDocfe == "jpeg" || tipoDocfe == "bmp" || tipoDocfe == "gif"
               || tipoDocfe == "PNG" || tipoDocfe == "JPG" || tipoDocfe == "JPEG" || tipoDocfe == "BMP" || tipoDocfe == "GIF") {
              var filecompress = compressImage($scope.FILE_FUND_EMP).then(function(respuestafe){
                var imagenFun = respuestafe.name.split('.');
                var tipoFun = imagenFun[1];
                nombreNuevoFundaempresa = 'fundempresa_'+fechaNueva+'.'+tipoFun;
                fileUpload1.uploadFileToUrl1(respuestafe, uploadUrl, nombreNuevoFundaempresa);
                $scope.registro.FILE_FUND_EMP = nombreNuevoFundaempresa;
                $scope.FILE_FUND_EMP = respuestafe;
              });
            } else{
              if (tipoDocfe == 'pdf' ||  tipoDocfe == 'docx' ||  tipoDocfe == 'docxlm' || tipoDocfe == 'PDF' ||  tipoDocfe == 'DOCX' ||  tipoDocfe == 'DOCXML') {
                var zipfe = new JSZip();
                zipfe.file($scope.FILE_FUND_EMP.name, $scope.FILE_FUND_EMP);
                zipfe.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobfe) {
                  nombreNuevoFundaempresa = 'fundempresa_'+fechaNueva+'.zip';
                  fileUpload1.uploadFileToUrl1(blobfe, uploadUrl, nombreNuevoFundaempresa);
                  $scope.registro.FILE_FUND_EMP = nombreNuevoFundaempresa;
                  $scope.FILE_FUND_EMP = blobfe;
                })
              }
              else{
                swal('Advertencia', 'El archivo FUNDEMPRESA no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('txt_FILE_FUND_EMP').value = '';
                document.getElementById('FILE_FUND_EMP').value = '';
                $scope.registro.FILE_FUND_EMP = '';
                $scope.FILE_FUND_EMP = '';
                valor = '';
                $.unblockUI();
              };
            };
          }
          else{
            if (tamaniofile.size <= 500000) {
              if (tipoDocfe == 'png' || tipoDocfe == 'jpg' || tipoDocfe == 'jpeg' || tipoDocfe == 'bmp' || tipoDocfe == 'gif' || tipoDocfe == 'pdf' || tipoDocfe == 'docx' || tipoDocfe == 'docxlm') {
                nombreNuevoFundaempresa = 'fundempresa_'+fechaNueva+'.'+tipoDocfe;
                fileUpload1.uploadFileToUrl1($scope.FILE_FUND_EMP, uploadUrl, nombreNuevoFundaempresa);
                $scope.registro.FILE_FUND_EMP = nombreNuevoFundaempresa;
                $.unblockUI();
              } else{
                swal('Advertencia', 'El archivo FUNDEMPRESA no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('FILE_FUND_EMP').value = '';
                document.getElementById('txt_FILE_FUND_EMP').value = '';
                $scope.registro.FILE_FUND_EMP = '';
                $scope.FILE_FUND_EMP = '';
                valor = '';
                $.unblockUI();
              };
            };
            if (tamaniofile.size > 15000000) {
              swal('Advertencia', 'El tamaño del archivo FUNDEMPRESA es muy grande', 'error');
              document.getElementById('FILE_FUND_EMP').value = '';
              document.getElementById('txt_FILE_FUND_EMP').value = '';
              $scope.registro.FILE_FUND_EMP = '';
              $scope.FILE_FUND_EMP = '';
              valor = '';
              $.unblockUI();
            };
          }
        }
        if(nombre == 'FILE_CONDICIONES_USO_J' && (typeof(obj.files[0]) != 'undefined')){
          var tipoDocrc = obj.files[0].name;
          var nameArrayrc = tipoDocrc.split('.');
          tipoDocrc = nameArrayrc[1];
          var nombrerc = nameArrayrc[0] + '.zip';
          if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
            if (tipoDocrc == "png" || tipoDocrc == "jpg" || tipoDocrc == "jpeg" || tipoDocrc == "bmp" || tipoDocrc == "gif" ||
                tipoDocrc == "PNG" || tipoDocrc == "JPG" || tipoDocrc == "JPEG" || tipoDocrc == "BMP" || tipoDocrc == "GIF") {
              var filecompress = compressImage($scope.FILE_CONDICIONES_USO_J).then(function(respuestarc){
                var imagenConuson = respuestarc.name.split('.');
                var tipoconuso = imagenConuson[1];
                nombreNuevoConuso = 'condicionesUso_'+fechaNueva+'.'+tipoconuso;
                fileUpload1.uploadFileToUrl1(respuestarc, uploadUrl, nombreNuevoConuso);
                $scope.registro.FILE_CONDICIONES_USO_J = nombreNuevoConuso;
                $scope.FILE_CONDICIONES_USO_J = respuestarc;
              });
            } else{
              if (tipoDocrc == 'pdf' ||  tipoDocrc == 'docx' ||  tipoDocrc == 'docxlm' || tipoDocrc == 'PDF' ||  tipoDocrc == 'DOCX' ||  tipoDocrc == 'DOCXML') {
                var ziprc = new JSZip();
                ziprc.file($scope.FILE_CONDICIONES_USO_J.name, $scope.FILE_CONDICIONES_USO_J);
                ziprc.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobrc) {
                  nombreNuevoConuso = 'condicionesUso_'+fechaNueva+'.'+tipoDocrc;
                  fileUpload1.uploadFileToUrl1(blobrc, uploadUrl, nombreNuevoConuso);
                  $scope.registro.FILE_CONDICIONES_USO_J = nombreNuevoConuso;
                  $scope.FILE_CONDICIONES_USO_J = blobrc;
                })
              }
              else{
                swal('Advertencia', 'El archivo CONDICIONES DE USO no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('txt_FILE_CONDICIONES_USO_J').value = '';
                document.getElementById('FILE_CONDICIONES_USO_J').value = '';
                $scope.registro.FILE_CONDICIONES_USO_J = '';
                $scope.FILE_CONDICIONES_USO_J = '';
                valor = '';
                $.unblockUI();
              };
            };
          }
          else{
            if (tamaniofile.size <= 500000) {
              if (tipoDocrc == 'png' || tipoDocrc == 'jpg' || tipoDocrc == 'jpeg' || tipoDocrc == 'bmp' || tipoDocrc == 'gif' || tipoDocrc == 'pdf' || tipoDocrc == 'docx' || tipoDocrc == 'docxlm') {
                nombreNuevoConuso = 'condicionesUso_'+fechaNueva+'.'+tipoDocrc;
                fileUpload1.uploadFileToUrl1($scope.FILE_CONDICIONES_USO_J, uploadUrl, nombreNuevoConuso);
                $scope.registro.FILE_CONDICIONES_USO_J = nombreNuevoConuso;
                $.unblockUI();
              } else{
                swal('Advertencia', 'El archivo CONDICIONES DE USO no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('FILE_CONDICIONES_USO_J').value = '';
                document.getElementById('txt_FILE_CONDICIONES_USO_J').value = '';
                $scope.registro.FILE_CONDICIONES_USO_J = '';
                $scope.FILE_CONDICIONES_USO_J = '';
                valor = '';
                $.unblockUI();
              };
            };
            if (tamaniofile.size > 15000000) {
              swal('Advertencia', 'El tamaño del archivo CONDICIONES DE USO es muy grande', 'error');
              document.getElementById('FILE_CONDICIONES_USO_J').value = '';
              document.getElementById('txt_FILE_CONDICIONES_USO_J').value = '';
              $scope.registro.FILE_CONDICIONES_USO_J = '';
              $scope.FILE_CONDICIONES_USO_J = '';
              valor = '';
              $.unblockUI();
            };
          }
        }
        if(nombre == 'FILE_CONDICIONES_USO' && (typeof(obj.files[0]) != 'undefined')){
          var tipoDocrc = obj.files[0].name;
          var nameArrayrc = tipoDocrc.split('.');
          tipoDocrc = nameArrayrc[1];
          var nombrerc = nameArrayrc[0] + '.zip';
          if (tamaniofile.size > 500000 && tamaniofile.size <= 15000000) {
            if (tipoDocrc == "png" || tipoDocrc == "jpg" || tipoDocrc == "jpeg" || tipoDocrc == "bmp" || tipoDocrc == "gif"
              || tipoDocrc == "PNG" || tipoDocrc == "JPG" || tipoDocrc == "JPEG" || tipoDocrc == "BMP" || tipoDocrc == "GIF") {
              var filecompress = compressImage($scope.FILE_CONDICIONES_USO).then(function(respuestarcn){
                var imagenConuson = respuestarcn.name.split('.');
                var tipoconuson = imagenConuson[1];
                nombreNuevoConuson = 'condicionesUsoNatural_'+fechaNueva+'.'+tipoconuson;
                fileUpload1.uploadFileToUrl1(respuestarcn, uploadUrl, nombreNuevoConuson);
                $scope.registro.FILE_CONDICIONES_USO = nombreNuevoConuson;
                $scope.FILE_CONDICIONES_USO = respuestarcn;
              });
            } else{
              if (tipoDocrc == 'pdf' ||  tipoDocrc == 'docx' ||  tipoDocrc == 'docxlm' || tipoDocrc == 'PDF' ||  tipoDocrc == 'DOCX' ||  tipoDocrc == 'DOCXML') {
                var ziprc = new JSZip();
                ziprc.file($scope.FILE_CONDICIONES_USO.name, $scope.FILE_CONDICIONES_USO);
                ziprc.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: {level: 9}}).then(function (blobrcn) {
                  nombreNuevoConuson = 'condicionesUsoNatural_'+fechaNueva+'.'+tipoDocrc;
                  fileUpload1.uploadFileToUrl1(blobrc, uploadUrl,nombreNuevoConuson);
                  $scope.registro.FILE_CONDICIONES_USO = nombreNuevoConuson;
                  $scope.FILE_CONDICIONES_USO = blobrcn;
                })
              }
              else{
                swal('Advertencia', 'El archivo CONDICIONES DE USO no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('txt_FILE_CONDICIONES_USO').value = '';
                document.getElementById('FILE_CONDICIONES_USO').value = '';
                $scope.registro.FILE_CONDICIONES_USO = '';
                $scope.FILE_CONDICIONES_USO = '';
                valor = '';
                $.unblockUI();
              };
            };
          }
          else{
            if (tamaniofile.size <= 500000) {
              if (tipoDocrc == 'png' || tipoDocrc == 'jpg' || tipoDocrc == 'jpeg' || tipoDocrc == 'bmp' || tipoDocrc == 'gif' || tipoDocrc == 'pdf' || tipoDocrc == 'docx' || tipoDocrc == 'docxlm') {
                nombreNuevoConuson = 'condicionesUsoNatural_'+fechaNueva+'.'+tipoDocrc;
                fileUpload1.uploadFileToUrl1($scope.FILE_CONDICIONES_USO, uploadUrl, nombreNuevoConuson);
                $scope.registro.FILE_CONDICIONES_USO = nombreNuevoConuson;
                $.unblockUI();
              } else{
                swal('Advertencia', 'El archivo CONDICIONES DE USO no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                document.getElementById('FILE_CONDICIONES_USO').value = '';
                document.getElementById('txt_FILE_CONDICIONES_USO').value = '';
                $scope.registro.FILE_CONDICIONES_USO = '';
                $scope.FILE_CONDICIONES_USO = '';
                valor = '';
                $.unblockUI();
              };
            };
            if (tamaniofile.size > 15000000) {
              swal('Advertencia', 'El tamaño del archivo CONDICIONES DE USO es muy grande', 'error');
              document.getElementById('FILE_CONDICIONES_USO').value = '';
              document.getElementById('txt_FILE_CONDICIONES_USO').value = '';
              $scope.registro.FILE_CONDICIONES_USO = '';
              $scope.FILE_CONDICIONES_USO = '';
              valor = '';
              $.unblockUI();
            };
          }
        }
        $.unblockUI();
      },1000);
    }else{
      $scope.subirRequisitos(obj, valor);
    }
  };

  $scope.subirRequisitos  =   function(sobj, svalor){
    var rMisDocs = new Array();
    var idFiles = new Array();
    if(sobj.files[0]){
      rMisDocs.push(sobj.files[0]);
      var idFile = sobj.name;
      var tam = idFile.length;
      idFile = parseInt(idFile.substring(10,tam));
      idFiles.push(idFile);
      $scope.almacenarRequisitos(rMisDocs,idFiles);
      $scope.adicionarArrayDeRequisitos(sobj,idFile);
    }
  };

  $scope.almacenarRequisitos = function(aArchivos,idFiles){
    var descDoc = "";
    var fechaNueva = "";
    var fechaserver = new fechaHoraServer(); 
    fechaserver.fechahora(function(resp){
      var sfecha = JSON.parse(resp);
      var fechaServ = (sfecha.success.fecha).split(' ');
      var fecha_ = fechaServ[0].split('-');
      var hora_ = fechaServ[1].split(':');
      fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
    });
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
    var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/"  + "/";
    $.blockUI();
    console.log(aArchivos,$scope.requisitos,'req');
    angular.forEach(aArchivos, function(archivo, key) {
      if(typeof(archivo) != 'undefined'){
        console.log(idFiles[key],'idFiles[key]');
        console.log($scope.datos.f10_modificacionRepEmpresa,123456);
        if($scope.datos.f10_modificacionRepEmpresa){
          angular.forEach($scope.requisitosRepresentante, function(doc, pos) {
            if(doc.req_id == idFiles[key]){
              descDoc = 'Requisito_Representante_'+doc.req_id;
            }
          })
        }else{
          angular.forEach($scope.requisitos, function(doc, pos) {
            if(doc.req_id == idFiles[key]){
              descDoc = 'Requisito_'+doc.req_id;
            }
          })
        }
        var imagenNueva = archivo.name.split('.');
        var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[1];
        if (archivo.size > 500000 && archivo.size <= 15000000) {
          if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif" || 
            imagenNueva[1] == "PNG" || imagenNueva[1] == "JPG" || imagenNueva[1] == "JPEG" || imagenNueva[1] == "BMP" || imagenNueva[1] == "GIF") {
            var filecompress = compressImage(archivo).then(function(respuestaFile){
              var imagenFile = respuestaFile.name.split('.');
              var tipoFile = imagenFile[1];
              var nombreNuevo = descDoc + '_'+fechaNueva+'.'+tipoFile;
              $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/"  + "/" + nombreNuevo + "?app_name=todoangular";
              fileUpload1.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
              document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
            });
            $.unblockUI();
          }else{
            if (imagenNueva[1] == 'pdf' ||  imagenNueva[1] == 'docx' ||  imagenNueva[1] == 'docxlm' ||
              imagenNueva[1] == 'PDF' ||  imagenNueva[1] == 'DOCX' ||  imagenNueva[1] == 'DOCXLM' ) {
              $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/"  + "/" + nombreFileN + "?app_name=todoangular";
              fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
              document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
              $.unblockUI();
            }
            else{
                $.unblockUI();
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
            };                        
          };   
        }  
        else{
          if (archivo.size <= 500000) {
            if (imagenNueva[1] == 'png' || imagenNueva[1] == 'jpg' || imagenNueva[1] == 'jpeg' || imagenNueva[1] == 'bmp' || imagenNueva[1] == 'gif' || imagenNueva[1] == 'pdf' || imagenNueva[1] == 'docx' || imagenNueva[1] == 'docxlm') {
                $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/"  + "/" + nombreFileN + "?app_name=todoangular";
                fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                $.unblockUI();
            } else{
                $.unblockUI();
                swal('Advertencia', 'El archivo  no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
            };
          };
          if (archivo.size > 15000000) {
              $.unblockUI();
              swal('Advertencia', 'El tamaño del archivo es muy grande', 'error');
          };
        }
      }else{
      }
    });
  };
  
  $scope.adicionarArrayDeRequisitos = function(aArch,idFile){
    var descDoc = "";
    var fechaNueva = "";
    var fechaserver = new fechaHoraServer(); 
    fechaserver.fechahora(function(resp){
      var sfecha = JSON.parse(resp);
      var fechaServ = (sfecha.success.fecha).split(' ');
      var fecha_ = fechaServ[0].split('-');
      var hora_ = fechaServ[1].split(':');
      fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1];
    });
    if($scope.datos.f10_modificacionRepEmpresa){
      angular.forEach($scope.requisitosRepresentante, function(doc, pos) {
        if(doc.req_id == idFile){
          descDoc = 'Requisito_Representante_'+doc.req_id;
        }
      })
    }else{
      angular.forEach($scope.requisitos, function(doc, pos) {
        if(doc.req_id == idFile){
          descDoc = 'Requisito_'+doc.req_id;
        }
      })
    }
    var imagenNueva = aArch.files[0].name.split('.');
    var tam = aArch.files[0];
    var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[1];
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    var sDirTramite = sessionService.get('IDTRAMITE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
    if (aArch.files[0].size > 500000 && aArch.files[0].size <= 15000000) {
      if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif") {
        var filecompress = compressImage(aArch.files[0]).then(function(respuestaFile){
          var imagenFile = respuestaFile.name.split('.');
          var tipoFile = imagenFile[1];
          nombreFileN = descDoc + '_'+fechaNueva+'.'+tipoFile;
        });
      } 
    }  
    var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/"  + "/" + nombreFileN + "?app_name=todoangular";
    var descrip =  document.getElementById('lbl_f01_upload'+idFile).innerHTML;
    descrip = descrip.replace("\n","");
    if($scope.datos.f10_modificacionRepEmpresa){
      var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "idRequisito":'+idFile+',"desc":"'+descrip+'"}';
      $scope.datos.fileArRequisitosRepresentante[aArch.name] = JSON.parse(myJSON);
      $scope.datos.fileArRequisitosArrayRepresentante.push(JSON.parse(myJSON));
    }else{
      var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "idRequisito":'+idFile+',"desc":"'+descrip+'"}';
      $scope.fileArRequisitos[aArch.name] = JSON.parse(myJSON);
      $scope.fileArRequisitosArray.push(JSON.parse(myJSON));
    } 
  }
  //****************************Ubicacion***********************
  $scope.macrodistritos = function(){
    $scope.aMacrodistritos = {};
    var datosP = new macrodistritoLst();
    datosP.obtmacro(function(resultado){
      data = JSON.parse(resultado);
      if(data.success.length > 0){
        $scope.aMacrodistritos = data.success;
      }else{
          $scope.msg = "Error !!";
      }
    });
  }

  $scope.distritoZonas = function(idMacroJ){ 
    var idMacro = "";
    if($scope.aMacrodistritos){
      angular.forEach($scope.aMacrodistritos, function(value, key) {
          if(value.mcdstt_macrodistrito == idMacroJ){
              idMacro = value.mcdstt_id;
          }
      });
    }        
    $scope.idMacro = idMacro;
    $scope.datos.f01_macro_act    =   idMacro;
    if($scope.datos.g_origen != 'POS/EMPR2017'){
        $scope.datos.INT_AC_MACRO_ID    =   idMacro;
    }

    $scope.datos.INT_AC_MACRO_ID = idMacro;
    $scope.aDistritoZona = {};
    try{
        var parametros = new distritoZona();
        parametros.idMacro = idMacro;
        parametros.obtdist(function(resultado){
            data = JSON.parse(resultado);
            if(data.success.length > 0){
                $scope.desabilitadoZ=false;
                $scope.aDistritoZona = data.success;
                $scope.desabilitadoV=true;
                $scope.desabilitadoNo=true;
            }else{
                $scope.msg = "Error !!";
            }
        });
    }catch(error){
        $scope.desabilitadoZ=true;
        $scope.desabilitadoV=true;
        $scope.desabilitadoNo=true;
    }
  };
  //************************Publicidad**************************

  $scope.cambioToggle1 = function(dato){
      $scope.botonn="new";
      if ( dato == "CON PUBLICIDAD") {
          $scope.publicidad = true;
      } else {
          $scope.publicidad = false;
      }
  }

  $scope.lssubcategoria = function(){
    $scope.publi.INT_CATE="II Fija";
    $scope.publi.idcate=6;
    $scope.TipoLetrero = [
    {"p_idtipoletrero" : "39", "p_descripcion": "ADOSADA"},
    {"p_idtipoletrero" : "41", "p_descripcion": "MICROPERFORADA - AUTOADHESIVA"},
    {"p_idtipoletrero" : "40", "p_descripcion": "PINTADA"}];
  };

  $scope.sacaDesc = function(){
    var desc = $scope.publi.descripcionTipoLetrero+' '+$scope.publi.caracteristica;
    $scope.publi.descripcion = desc;
  }

  $scope.actulizarCaracteristica = function(){
    var id_cara="";
    var distNombre  = $scope.publi.caracteristica;
    if($scope.lCaracteristica){
      angular.forEach($scope.lCaracteristica, function(value, key) {
        if(value.p_caracteristica == distNombre){
          id_cara  =   value.p_idcaracteristica;
        }
      });
    }
    $scope.publi.id_cara  =  id_cara;
  };

  $scope.actulizarTipoLetrero = function(){
    var idcarac="";
    var disttipletrero  = $scope.publi.descripcionTipoLetrero;
    $scope.publi.caracteristica = '';
    if($scope.TipoLetrero){
        angular.forEach($scope.TipoLetrero, function(value, key) {
            if(value.p_descripcion == disttipletrero){
                idcarac  =   value.p_idtipoletrero;
            }
        });
    }
    $scope.publi.idcarac  =  idcarac;
    $scope.publi.idTipoLetrero = idcarac;
  };

  $scope.ltCaracteristica = function(idlee){
    $scope.lCaracteristica = {};
    var idcarac = "";        
    //ID CARACTERISITICA
    if($scope.TipoLetrero){
        angular.forEach($scope.TipoLetrero, function(value, key) {
            if(value.p_descripcion == idlee){
                idcarac = value.p_idtipoletrero;                    
            }
        });
    }        
    $scope.publi.idcarac=idcarac;
    if(idlee == "ADOSADA SOBRESALIENTE" || idlee == "ADOSADA" ){
      $scope.lCaracteristica = [
      {"p_idcaracteristica" : "1", "p_caracteristica": "Simple"},
      {"p_idcaracteristica" : "2", "p_caracteristica": "Electrónica"},
      {"p_idcaracteristica" : "6", "p_caracteristica": "Luminosa"},
      {"p_idcaracteristica" : "7", "p_caracteristica": "Iluminada"},
      {"p_idcaracteristica" : "9", "p_caracteristica": "Animada"}];
    }else if(idlee == "PINTADA"){
      $scope.lCaracteristica = [
      {"p_idcaracteristica" : "1", "p_caracteristica": "Simple"},
      {"p_idcaracteristica" : "7", "p_caracteristica": "Iluminada"}];
    }else{
      $scope.lCaracteristica = [
      {"p_idcaracteristica" : "1", "p_caracteristica": "Simple"}];
    }
  };

  $scope.verSuperficie = function(p){
    if (p==false || typeof(p)=='undefined'){
      $scope.publi.INT_ALTO = 0;
      $scope.publi.INT_ANCHO = 0;
      $scope.especial="mostrar";
    } else {
      $scope.especial=null;
    }
  }

  $scope.guardarpublicidad = function(public){
    if (public.superficie) {
      if(public.cara =='' || public.cara == null || public.caracteristica =='' || public.caracteristica == null ||
      public.descripcionTipoLetrero =='' || public.descripcionTipoLetrero == null ||
      public.descripcion =='' || public.descripcion == null || public.superficie =='' || public.superficie == null ) {
        sweet.show('', 'Llene lo campos requeridos para la VIAE  ', 'error');
      } else {
        var id=0
        if($scope.datos.publicidad =='' || $scope.datos.publicidad == null || $scope.datos.publicidad =="undefined" ){
          if($scope.publicid =='' || $scope.publicid == null || $scope.publicid =="undefined" ){
            $scope.publicid = [];
            id=0;
          }
          id = $scope.publicid.length + 1;
        }else{
          id = $scope.publicid.length + 1;
        }
        if(id<21){
          total = parseFloat(public.superficie);
          if (total < 700) {
            $scope.id = id;
            $scope.publicid.push({
              id: id,
              cara: public.cara,
              caracteristica: public.caracteristica,
              INT_CATE: public.INT_CATE,
              descripcionTipoLetrero: public.descripcionTipoLetrero,
              descripcion: public.descripcion.toUpperCase(),
              alto: parseFloat(0).toFixed(2),
              ancho: parseFloat(0).toFixed(2),
              id_cara: public.id_cara,
              idcarac: public.idcarac,
              idcate: public.idcate,
              superficie:total.toFixed(2),
              estado: 'N'
            });
            console.log('$scope.publicid',$scope.publicid);
            $scope.datosOficina.xofi_viae = $scope.publicid;
            $scope.publi=[];
            $scope.publi.INT_CATE="II Fija";
            $scope.publi.idcate=6;
            $scope.lssubcategoria();
          } else {
            sweet.show('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
          }
        } else {
          sweet.show('', 'Llego al limite de registro de Publicidad', 'error');
        }
      }
    } else {
      if(public.cara =='' || public.cara == null || public.caracteristica =='' || public.caracteristica == null ||
      public.descripcionTipoLetrero =='' || public.descripcionTipoLetrero == null ||
      public.descripcion =='' || public.descripcion == null || public.alto =='' || public.alto == null || public.ancho =='' || public.ancho == null ) {
        sweet.show('', 'Llene lo campos requeridos para la VIAE  ', 'error');
      } else {
        var id=0
        if($scope.datos.publicidad =='' || $scope.datos.publicidad == null || $scope.datos.publicidad =="undefined" ){
          if($scope.publicid =='' || $scope.publicid == null || $scope.publicid =="undefined" ){
            $scope.publicid = [];
            id=0; 
          }
          id = $scope.publicid.length + 1;
        }else{
          id = $scope.publicid.length + 1;
        }
        if(id<21){
          total = parseFloat(public.alto) * parseFloat(public.ancho);
          if (total < 700) {
              $scope.id = id;
              $scope.publicid.push({
                  id: id,
                  cara: public.cara,
                  caracteristica: public.caracteristica,
                  INT_CATE: public.INT_CATE,
                  descripcionTipoLetrero: public.descripcionTipoLetrero,
                  descripcion: public.descripcion.toUpperCase(),
                  alto: parseFloat(public.alto).toFixed(2),
                  ancho: parseFloat(public.ancho).toFixed(2),
                  id_cara: public.id_cara,
                  idcarac: public.idcarac,
                  idcate: public.idcate,
                  superficie:total.toFixed(2),
                  estado: 'N'
              });
                          console.log('$scope.publicid',$scope.publicid);

              $scope.datosOficina.xofi_viae = $scope.publicid;
              $scope.publi=[];
              $scope.publi.INT_CATE="II Fija";
              $scope.publi.idcate=6;
              $scope.lssubcategoria();
          } else {
              sweet.show('', 'La superficie de la VIAE excede los estadares permitidos', 'error');
          }
        } else {
          sweet.show('', 'Llego al limite de registro de Publicidad', 'error');
        }
      }
    }
  }

  $scope.modificarPlubli = function(dato){
    $scope.botonn="upd";
    $scope.publi=dato;
  }

  $scope.modificarpublicidad = function(dato){
    dato.INT_ALTO = parseFloat(dato.INT_ALTO).toFixed(2);
    dato.INT_ANCHO= parseFloat(dato.INT_ANCHO).toFixed(2);
    total = parseFloat(dato.INT_ALTO) * parseFloat(dato.INT_ANCHO);
    if (total < 700) {
      $scope.publi.INT_SUP = total;
    }
    $scope.botonn="new";
    $scope.publi=[];
  }

  $scope.limpiar = function(){
    $scope.botonn="new";
    $scope.publi=[];
  }

  $scope.eliminarPubli = function(dato){
    $scope.publicid.splice( $scope.publicid.indexOf(dato), 1 );
    $scope.id = $scope.id - 1;  
  }

  $scope.muestraOficinas = function(modOfi){
    if(modOfi == true){
      $scope.listadoOfi = true;
    }else{
      $scope.listadoOfi = false;
    }
  }

  //*******************Modificacion Rep Legal******************
  $scope.cambioRepresentanteLegal = function(validarRep, sdatos){
    $scope.registro = {};
    if(validarRep == true){
      $('#modificaRep').modal('show');
    }else{
      $scope.datos.f10_modificacionRepEmpresa = false;    
    }
  }

  $scope.cerrarModificacionRep = function(){
    $('#modificaRep').modal('hide');
    $scope.datos.f10_modificacionRepEmpresa = false;    
  }

  $scope.realizarModificacionRep = function(){
    $('#modificaRep').modal('hide');
    $scope.datos.f10_modificacionRepEmpresa = true;
    $scope.datos.f01_modificarRepEmp = 'MODIFICAREPEMP';
    $scope.datos.fileArRequisitosRepresentante = {};
    $scope.datos.fileArRequisitosArrayRepresentante = [];    
    $scope.listaRequisitosOficina();       
    $scope.recuperarDatosRegistroCiu($scope.datos);
  }

  $scope.listaRequisitosOficina = function(){
    var requisitos = new listaRequisitos()
    requisitos.tipo = 'CAMBIO_REPRESENTANTE';
    requisitos.lstRequisitos(function(results){
      $scope.requisitosRepresentante = JSON.parse(results).success.data;
      setTimeout(function(){
        iniciarLoadFyle();
      }, 1000);
      console.log('$scope.requisitosRepresentante',$scope.requisitosRepresentante);
    })
  }

  $scope.verificar = function(reg) {
    sw =0;
    $.blockUI();
    var fitro;           
    if(reg.complemento != null)
    {            
      var dtspsl_tipo_persona="NATURAL";
      var dtspsl_estado="ACTIVO";
      var dtspsl_activacionf="SI";
      var dtspsl_activaciond="SI";
      filtro= '{"dtspsl_ci":"'+ reg.cedula + '","dtspsl_complemento":"'+reg.complemento+',"dtspsl_tipo_persona":"'+dtspsl_tipo_persona+'","dtspsl_estado":"'+dtspsl_estado+'","dtspsl_activacionf":"'+dtspsl_activacionf+'","dtspsl_activaciond":"'+dtspsl_activaciond+'"}';
      sw=0;
    }
    else{         
      var dtspsl_tipo_persona="NATURAL";
      var dtspsl_estado="ACTIVO";
      var dtspsl_activacionf="SI";
      var dtspsl_activaciond="SI";
      filtro= '{"dtspsl_ci":"'+ reg.cedula + '","dtspsl_tipo_persona":"'+dtspsl_tipo_persona+'","dtspsl_estado":"'+dtspsl_estado+'","dtspsl_activacionf":"'+dtspsl_activacionf+'","dtspsl_activaciond":"'+dtspsl_activaciond+'"}';
      sw=1
    }
    switch (sw) {
      case 0:
        var resRepLegalMongo   = new reglasnegocio();
        resRepLegalMongo.identificador = "MONGO_RC_LAPAZ_174";
        resRepLegalMongo.parametros = filtro;
        resRepLegalMongo.llamarregla(function(results){
          if (results !=null) {
            $.unblockUI();
            if(tipoPersona == 'NATURAL')
            {
              swal('', 'Persona ya Registrada!!!' , 'success');
            }else
            {
              $scope.registro.nombre = results.dtspsl_nombres;
              $scope.registro.paterno = results.dtspsl_paterno;
              $scope.registro.materno = results.dtspsl_materno;
              $scope.registro.tercer = "";  //results.dtspsl_paterno;
              $scope.registro.cedula = results.dtspsl_ci;                
              $scope.registro.celularRep = results.dtspsl_movil;
              $scope.registro.telefonoRep = results.dtspsl_telefono;
              $scope.registro.correoRep = results.dtspsl_correo;
              $scope.registro.direccionRep = results.dtspsl_direccion;  
              swal('', 'Datos Encontrados!!!' , 'success');
            }
          }else{
            $.unblockUI();
            if(tipoPersona == 'NATURAL')
            {
              swal('', 'Llene sus datos!!!' , 'success');
            }
            else
            {
              swal('', 'Debe Registrar primero a la Persona Natural!!!', 'warning');
            }
            $scope.$apply();
          }
        });
      break;
      case 1:
        var resRepLegalMongo   = new reglasnegocio();
        resRepLegalMongo.identificador= "MONGO_RC_LAPAZ_173";
        resRepLegalMongo.parametros = filtro;
        resRepLegalMongo.llamarregla(function(results){
          var datomongo=JSON.parse(results);
          if (results !=null) {
            $.unblockUI();
            if(tipoPersona == 'NATURAL')
            {
              swal('', 'Persona ya Registrada!!!' , 'success');
            }else
            {
              $scope.registro.nombre = datomongo.dtspsl_nombres;
              $scope.registro.paterno = datomongo.dtspsl_paterno;
              $scope.registro.materno = datomongo.dtspsl_materno;
              $scope.registro.tercer = "";  //datomongo.dtspsl_paterno;
              $scope.registro.cedula = datomongo.dtspsl_ci;                
              $scope.registro.celularRep = datomongo.dtspsl_movil;
              $scope.registro.telefonoRep = datomongo.dtspsl_telefono;
              $scope.registro.correoRep = datomongo.dtspsl_correo;
              $scope.registro.direccionRep = datomongo.dtspsl_direccion;  
              swal('', 'Datos Encontrados!!!' , 'success');
            }
          }else{
            $.unblockUI();
            if(tipoPersona == 'NATURAL')
            {
              swal('', 'Llene sus datos!!!' , 'success');
            }
            else
            {
              swal('', 'Debe Registrar primero a la Persona Natural!!!', 'warning');
            }
          }
          $scope.$apply();
        });
      break;
    }
  };

  $scope.recuperarDatosRegistroCiu = function(sdatos){
    $.blockUI();
    try{
      var datosCiudadano = new rcNatural();
      datosCiudadano.oid = sessionService.get('IDSOLICITANTE');
      datosCiudadano.datosCiudadanoNatural(function(resultado){
        results = JSON.parse(resultado)[0];
        $scope.recuperarDatosRegistroModificacion(results);
        $.unblockUI();
      });
    } catch(e) {
      console.log('*Error*', e);
    }
  }

  $scope.recuperarDatosRegistroModificacion = function (datosCiu) {
    $.blockUI();
    $scope.resultadoApi = datosCiu;
    if ($scope.resultadoApi.dtspsl_file_fotocopia_ci) {
        $scope.btover=true;
    }
    if ($scope.resultadoApi.dtspsl_file_factura_luz) {
        $scope.btover1=true;
    }
    if ($scope.resultadoApi.dtspsl_file_condiciones_uso) {
        $scope.btover1=true;
    }
    $scope.nombreFile1 = $scope.resultadoApi.dtspsl_URL;
    $scope.getTipoPersona($scope.resultadoApi.dtspsl_tipo_persona);
    $scope.imagenPortada_inicio = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.resultadoApi.dtspsl_URL + "?app_name=todoangular";
    $scope.imagenPortada = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.resultadoApi.dtspsl_URL + "?app_name=todoangular";
    $scope.combopais();
    $scope.combodepa();
    if($scope.resultadoApi.dtspsl_tipo_persona=="NATURAL") {
      $scope.mostrarNatural = null;
      $scope.mostrarJuridico = "NO_MOSTRAR";
      $scope.tipo = "NATURAL";
      tipoPersona = "NATURAL";
      $scope.imagenPortada_inicio = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.resultadoApi.dtspsl_URL + "?app_name=todoangular";
      $scope.imagenPortada = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.resultadoApi.dtspsl_URL + "?app_name=todoangular";
      $rootScope.imagenPortada2 = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.resultadoApi.dtspsl_URL + "?app_name=todoangular";
      $scope.registro.profesion = $scope.resultadoApi.dtspsl_profesion;
      $scope.registro.otra_profesion = $scope.resultadoApi.dtspsl_otra_profesion;
      $scope.registro.nombre = $scope.resultadoApi.dtspsl_nombres;
      $scope.registro.paterno = $scope.resultadoApi.dtspsl_paterno;
      $scope.registro.materno = $scope.resultadoApi.dtspsl_materno;
      $scope.registro.tercer = $scope.resultadoApi.dtspsl_tercer_apellido;
      $scope.registro.cedula = $scope.resultadoApi.dtspsl_ci;
      $scope.registro.pin = $scope.resultadoApi.dtspsl_pin;
      $scope.registro.activacionf = $scope.resultadoApi.dtspsl_activacionf;
      $scope.registro.activaciond = $scope.resultadoApi.dtspsl_activaciond;
      $scope.registro.fec_activacionf = $scope.resultadoApi.dtspsl_fec_activacionf;
      $scope.registro.fec_activaciond = $scope.resultadoApi.dtspsl_fec_activaciond;
      $scope.registro.expedido = $scope.resultadoApi.dtspsl_expedido;
      $scope.registro.estado_civil = $scope.resultadoApi.dtspsl_id_estado_civil;
      $scope.registro.complemento = $scope.resultadoApi.dtspsl_complemento;
      fechacomp   =   obtFechaCorrecta.obtenerFechaCorrecta(fechacomp);
      if($scope.resultadoApi.dtspsl_fec_vencimiento <= fechacomp){
        $scope.fechaci = 'mostrar';
      }else{
        $scope.fechaci = null;
      }
      var fechaVencimiento = new Date($scope.resultadoApi.dtspsl_fec_vencimiento);
      var mesFechaVencimiento = "";
      var diaFechaVencimiento = "";
      if (fechaVencimiento.getMonth()<10 ) {
        mesFechaVencimiento = "0" + (fechaVencimiento.getMonth()+1);
      } else {
        mesFechaVencimiento = fechaVencimiento.getMonth()+1;
      }
      if (fechaVencimiento.getDate()<10) {
        diaFechaVencimiento = "0" + (fechaVencimiento.getDate());
      } else {
        diaFechaVencimiento = fechaVencimiento.getDate();
      }
      var fechaNacimiento = new Date($scope.resultadoApi.dtspsl_fec_nacimiento);
      var mesFechaNacimiento = "";
      var diaFechaNacimiento = "";
      if (fechaNacimiento.getMonth()<10 ) {
        mesFechaNacimiento = "0" + (fechaNacimiento.getMonth()+1);
      } else {
        mesFechaNacimiento = fechaNacimiento.getMonth()+1;
      }
      if (fechaNacimiento.getDate()<10) {
        diaFechaNacimiento = "0" + (fechaNacimiento.getDate());
      } else {
        diaFechaNacimiento = fechaNacimiento.getDate();
      }
      if($scope.resultadoApi.dtspsl_fec_nacimiento){
        fechaOficial = $scope.resultadoApi.dtspsl_fec_nacimiento.split('/');
        if (fechaOficial.length===1) {
          $scope.registro.fecha_nacimiento = $scope.resultadoApi.dtspsl_fec_nacimiento;
        } else {
          if (fechaOficial[0].length===4) {
            if(fechaOficial[1]<10)  fechaOficial[1] = "0" + fechaOficial[1];
            if(fechaOficial[2]<10)  fechaOficial[2] = "0" + fechaOficial[2];
            $scope.registro.fecha_nacimiento = fechaOficial[0] + '-' + fechaOficial[1] + '-' + fechaOficial[2];
          } else {
            if(fechaOficial[0]<10)  fechaOficial[0] = "0" + fechaOficial[0];
            if(fechaOficial[1]<10)  fechaOficial[1] = "0" + fechaOficial[1];
            $scope.registro.fecha_nacimiento = fechaOficial[2] + '-' + fechaOficial[1] + '-' + fechaOficial[0];
          }
        }
      }else{
        $scope.registro.fecha_nacimiento = '';
      }
      $scope.registro.fecha_vencimiento = $scope.resultadoApi.dtspsl_fec_vencimiento;
      $scope.registro.lugarNacimiento = $scope.resultadoApi.dtspsl_lugar_nacimiento;
      $scope.registro.sexo = $scope.resultadoApi.dtspsl_sexo;
      $scope.registro.telefono = $scope.resultadoApi.dtspsl_telefono;
      $scope.registro.celular = $scope.resultadoApi.dtspsl_movil;
      $scope.registro.correo = $scope.resultadoApi.dtspsl_correo;
      $scope.registro.ocupacion = $scope.resultadoApi.dtspsl_ocupacion;
      if($scope.resultadoApi.dtspsl_otra_profesion == null){
        $scope.registro.profesion = $scope.resultadoApi.dtspsl_profesion;
      }
      else{
        $scope.registro.otra_profesion = $scope.resultadoApi.dtspsl_otra_profesion;
        $scope.registro.profesion = $scope.resultadoApi.dtspsl_profesion;
      }
      $scope.registro.direccion = $scope.resultadoApi.dtspsl_direccion;
      $scope.registro.pais = $scope.resultadoApi.dtspsl_pais;
      $scope.registro.tipo_via = $scope.resultadoApi.dtspsl_tipo_via;
      $scope.registro.nombrevia = $scope.resultadoApi.dtspsl_nombre_via;
      $scope.registro.numero = $scope.resultadoApi.dtspsl_numero_casa;
      $scope.registro.edificio = $scope.resultadoApi.dtspsl_edificio;
      $scope.registro.bloque = $scope.resultadoApi.dtspsl_bloque;
      $scope.registro.piso = $scope.resultadoApi.dtspsl_piso;
      $scope.registro.numeroOficina = $scope.resultadoApi.dtspsl_oficina;
      $scope.actualizaDepartamento($scope.resultadoApi.dtspsl_pais);
      $scope.registro.departamento = $scope.resultadoApi.dtspsl_departamento;
      $scope.cargarProvincia($scope.resultadoApi.dtspsl_departamento);
      $scope.registro.provincia = $scope.resultadoApi.dtspsl_provincia;
      $scope.cargarMunicipio($scope.resultadoApi.dtspsl_provincia);
      $scope.registro.municipio = $scope.resultadoApi.dtspsl_municipio;
      $scope.cargarMacrodistrito($scope.resultadoApi.dtspsl_municipio);
      $scope.registro.macrodistrito = $scope.resultadoApi.dtspsl_macrodistrito;
      $scope.cargarDistrito($scope.resultadoApi.dtspsl_macrodistrito);
      $scope.registro.distrito = $scope.resultadoApi.dtspsl_distrito;
      $scope.cargarZona($scope.resultadoApi.dtspsl_distrito);
      $scope.registro.zona = $scope.resultadoApi.dtspsl_zona;
      $scope.registro.latitud = $scope.resultadoApi.dtspsl_latitud;
      $scope.registro.longitud = $scope.resultadoApi.dtspsl_longitud;
      $scope.registro.FILE_FOTOCOPIA_CI = $scope.resultadoApi.dtspsl_file_fotocopia_ci;
      nombreNuevoCIAnverso = $scope.resultadoApi.dtspsl_file_fotocopia_ci;
      $scope.registro.FILE_FOTOCOPIA_CI_R = $scope.resultadoApi.dtspsl_file_fotocopia_ci_r;
      $scope.registro.FILE_CONDICIONES_USO = $scope.resultadoApi.dtspsl_file_condiciones_uso;
      $scope.registro.zona_d = $scope.resultadoApi.dtspsl_zona_desc;
      $scope.registro.valid   = $scope.resultadoApi.dtspsl_valid;
      $scope.registro.valid2  = $scope.resultadoApi.dtspsl_valid2;
      $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
      $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
      $scope.archivoCondiciones = CONFIG.URL + "/files/RC_CLI" + sessionService.get('IDSOLICITANTE') +"/" + $scope.resultadoApi.dtspsl_file_condiciones_uso + "?app_name=todoangular"
      if($scope.resultadoApi.dtspsl_valid == "true"){
        $scope.validadoCI = 'mostrar';
      } else {
        $scope.validadoCI = null;
      }
      if($scope.resultadoApi.dtspsl_valid2 == "true"){
        $scope.validadoNac = 'mostrar';
      } else {
        $scope.validadoNac = null;
      }
      $scope.cerrarMapa();
      $.unblockUI();
    } else  if($scope.resultadoApi.dtspsl_tipo_persona == "JURIDICO")
    {
      $scope.mostrarJuridico = null;
      $scope.mostrarNatural = "NO_MOSTRAR";
      $scope.tipo = "JURIDICO";
      tipoPersona = "JURIDICO";
      $scope.registro.complemento = $scope.resultadoApi.dtspsl_complemento;
      var gestion = $scope.resultadoApi.dtspsl_poder_replegal.split('/');
      $scope.registro.repLegal = gestion[0];
      $scope.registro.gestionrepLegal = parseInt(gestion[1]);
      $scope.registro.notaria = $scope.resultadoApi.dtspsl_nro_notaria;
      $scope.registro.nit = $scope.resultadoApi.dtspsl_nit;
      $scope.registro.pin = $scope.resultadoApi.dtspsl_pin;
      $scope.registro.activacionf = $scope.resultadoApi.dtspsl_activacionf;
      $scope.registro.activaciond = $scope.resultadoApi.dtspsl_activaciond;
      $scope.registro.fec_activacionf = $scope.resultadoApi.dtspsl_fec_activacionf;
      $scope.registro.fec_activaciond = $scope.resultadoApi.dtspsl_fec_activaciond;
      $scope.registro.razon = $scope.resultadoApi.dtspsl_razon_social;
      $scope.registro.telefono_representante = $scope.resultadoApi.dtspsl_telefono;
      $scope.registro.celular_representante = $scope.resultadoApi.dtspsl_movil;
      $scope.registro.correo = $scope.resultadoApi.dtspsl_correo;
      $scope.registro.direccion_representante = $scope.resultadoApi.dtspsl_direccion;
      $scope.registro.pais = $scope.resultadoApi.dtspsl_pais;
      $scope.registro.tipo_via = $scope.resultadoApi.dtspsl_tipo_via;
      $scope.registro.nombrevia = $scope.resultadoApi.dtspsl_nombre_via;
      $scope.registro.numero = $scope.resultadoApi.dtspsl_numero_casa;
      $scope.registro.edificio = $scope.resultadoApi.dtspsl_edificio;
      $scope.registro.bloque = $scope.resultadoApi.dtspsl_bloque;
      $scope.registro.piso = $scope.resultadoApi.dtspsl_piso;
      $scope.registro.numeroOficina = $scope.resultadoApi.dtspsl_oficina;
      $scope.actualizaDepartamento($scope.resultadoApi.dtspsl_pais);
      $scope.registro.departamento = $scope.resultadoApi.dtspsl_departamento;
      $scope.cargarProvincia($scope.resultadoApi.dtspsl_departamento);
      $scope.registro.provincia = $scope.resultadoApi.dtspsl_provincia;
      $scope.cargarMunicipio($scope.resultadoApi.dtspsl_provincia);
      $scope.registro.municipio = $scope.resultadoApi.dtspsl_municipio;
      $scope.cargarMacrodistrito($scope.resultadoApi.dtspsl_municipio);
      $scope.registro.macrodistrito = $scope.resultadoApi.dtspsl_macrodistrito;
      $scope.cargarDistrito($scope.resultadoApi.dtspsl_macrodistrito);
      $scope.registro.distrito = $scope.resultadoApi.dtspsl_distrito;
      $scope.cargarZona($scope.resultadoApi.dtspsl_distrito);
      $scope.registro.zona = $scope.resultadoApi.dtspsl_zona;
      $scope.registro.latitud = $scope.resultadoApi.dtspsl_latitud;
      $scope.registro.longitud = $scope.resultadoApi.dtspsl_longitud;
      $scope.registro.FILE_PODER_LEGAL = $scope.resultadoApi.dtspsl_file_poder_legal;
      $scope.registro.FILE_NUM_IDENT = $scope.resultadoApi.dtspsl_file_num_ident;
      $scope.registro.FILE_TEST_CONST = $scope.resultadoApi.dtspsl_file_test_const;
      $scope.registro.FILE_FUND_EMP = $scope.resultadoApi.dtspsl_file_fund_emp;
      $scope.registro.FILE_CONDICIONES_USO_J = $scope.resultadoApi.dtspsl_file_condiciones_uso_j;
      if($scope.resultadoApi.dtspsl_ci_representante != null) {
        var buscarRepresentante = new rcNatural();
        buscarRepresentante.tipo_persona = "NATURAL";
        buscarRepresentante.ci = $scope.resultadoApi.dtspsl_ci_representante;
        buscarRepresentante.buscarPersona(function(resultado){
          resultadoApiRepre = JSON.parse(resultado);
          var repLegalmongo = resultadoApiRepre;
          $scope.imagenPortada = repLegalmongo[0].dtspsl_URL;
          $scope.registro.nombre = repLegalmongo[0].dtspsl_nombres;
          $scope.registro.paterno = repLegalmongo[0].dtspsl_paterno;
          $scope.registro.materno = repLegalmongo[0].dtspsl_materno;
          $scope.registro.cedula = repLegalmongo[0].dtspsl_ci;
          $scope.registro.complemento = repLegalmongo[0].dtspsl_complemento;
          $scope.registro.cestcivil_id = repLegalmongo[0].dtspsl_id_estado_civil;
          $scope.registro.profesion = repLegalmongo[0].dtspsl_profesion;
          $scope.registro.otra_profesion = repLegalmongo[0].dtspsl_otra_profesion;
          $scope.registro.celularRep = repLegalmongo[0].dtspsl_movil;
          $scope.registro.telefonoRep = repLegalmongo[0].dtspsl_telefono;
          $scope.registro.correoRep = repLegalmongo[0].dtspsl_correo;
          $scope.registro.direccionRep = repLegalmongo[0].dtspsl_direccion;
          $scope.registro.sexo = repLegalmongo[0].dtspsl_sexo;
          $scope.registro.idrepre = repLegalmongo[0]._id;
          if (repLegalmongo[0].dtspsl_file_fotocopia_ci) {
            $scope.btover_c=true;
          }
          $scope.registro.FILE_FOTOCOPIA_CI = repLegalmongo[0].dtspsl_file_fotocopia_ci;
          $scope.registro.FILE_FOTOCOPIA_CI_R = repLegalmongo[0].dtspsl_file_fotocopia_ci_r;
          //VALIDACION DE REQUISITOS ADJUNTOS
          if ($scope.registro.FILE_FOTOCOPIA_CI)
            $scope.divfilecim = true;
          if ($scope.registro.FILE_FOTOCOPIA_CI_R)
            $scope.divfilecirm = true;
          if ($scope.registro.FILE_PODER_LEGAL)
            $scope.divfilepoderm = true;
          if ($scope.registro.FILE_TEST_CONST)
            $scope.divfiletestm = true;
          if ($scope.registro.FILE_NUM_IDENT)
            $scope.divfilenumm = true;
          if ($scope.registro.FILE_FUND_EMP)
            $scope.divfilefundm = true;
          if ($scope.registro.FILE_CONDICIONES_USO_J)
            $scope.divfilecodjm = true;
        });
      }
      $scope.cerrarMapa();
      $.unblockUI();
    }
    $('#formModificar').modal('show');
    $.unblockUI();
  };

  $scope.getTipoPersona = function (val) {
    descripcionPersona = val;
    console.log('val',val);
    if (val == "Natural") {
      var tipoPersona = "NATURAL";
      $scope.tipo="Natural";
    };
    if (val == "Juridica") {
      var tipoPersona = "JURIDICO"
      $scope.tipo="Jurídico";
    };
    console.log($scope.registro,'registro');
    $scope.registro.tipoP = tipoPersona;
  };

  $scope.actualizaDepartamento = function (dato){
    $.blockUI();
    if (dato == 2) {
      $scope.registro.departamento = 0;
      $scope.registro.provincia = 0;
      $scope.registro.municipio = 0;
      $scope.registro.macrodistrito = 0;
      $scope.registro.distrito = 0;
      $scope.registro.zona = 0;
      $scope.deshabilitadoD = true;
      $scope.deshabilitadoP = true;
      $scope.deshabilitadoM = true;
      $scope.deshabilitadoMc = true;
      $scope.deshabilitadoDs = true;
      $scope.deshabilitadoZ = true;
    } else {
      $scope.deshabilitadoD = false;
    }
    $.unblockUI();
  };

  $scope.combopais = function(){
    var spais   = new reglasnegocio();
    spais.identificador = "RCCIUDADANO_29";
    spais.parametros = '{}';
    spais.llamarregla(function(resultado){
      $scope.comdpais = JSON.parse(resultado);
    });  
  };

  $scope.combodepa = function(){  
    var sdepartamento   = new reglasnegocio();
    sdepartamento.identificador = "RCCIUDADANO_28";
    sdepartamento.parametros = '{}';    
    sdepartamento.llamarregla(function(resultado){
      $scope.comdepa = JSON.parse(resultado);
    });  
  };

  $scope.cargarMacrodistrito = function(idMac){
    var datosP = new macrodistritoLst();
    datosP.obtmacro(function(resultado){
      data = JSON.parse(resultado);
      $rootScope.aMacrodistritos=data.success;
    });
  };

  $scope.cargarDistrito = function(idDis){
    if(idDis != 0 && idDis != '0' && idDis != '' && idDis != 'undefined' && idDis != undefined){
      try{
        var datosP = new distritoLst();
        datosP.idDistrito = idDis;
        datosP.obtdistrito(function(resultado){
          data = JSON.parse(resultado);
          if(data.success.length > 0) {
            $rootScope.aDistritos = data.success;
            $rootScope.deshabilitadoDs = false;
          } else {
            $rootScope.msg = "Error !!";
            $rootScope.deshabilitadoDs = true;
            $rootScope.deshabilitadoZ = true;
            $rootScope.registro.distrito = 0;
            $rootScope.registro.zona = 0;                                            
          }
        });
      }catch(e){
        console.log("error en distrito ");
      }
    }else{
      console.log("no tiene distrito");                                                                                                                                                                                                    
    }
  };

  $scope.cargarZona = function(idZona){
    $.blockUI();
    if(idZona != 0 && idZona != '0' && idZona != '' && idZona != 'undefined'  && idZona != undefined){
      var datosP = new distritoZonalst();
      datosP.idZona = idZona;
      datosP.obtdistritoZona(function(resultado){
        data = JSON.parse(resultado);
        if(data.success.length > 0) {
          $rootScope.aZonas = data.success;
          $rootScope.deshabilitadoZ = false;
        }else{
          $rootScope.msg = "Error !!";
          $rootScope.deshabilitadoZ = true;
          $rootScope.registro.zona = 0;        
        } 
        $.unblockUI(); 
      });
    }else{
            console.log("no tiene zona");                                                                                                                                                                                                    
    }
  };

  $scope.cargarProvincia = function(idProv){
    var datosP = new provinciaLst();
    datosP.idProv = idProv;
    datosP.obtprovincia(function(resultado){ 
      data = JSON.parse(resultado);
      if(data.success.length > 0) {
        $rootScope.aProvincias = data.success;
        $rootScope.deshabilitadoP = false;
      } else {
        $rootScope.msg = "Error !!";
        $rootScope.deshabilitadoP = true;
        $scope.deshabilitadoM = false;
        $rootScope.deshabilitadoMc = true;
        $rootScope.deshabilitadoDs = true;
        $rootScope.deshabilitadoZ = true;
        $rootScope.registro.provincia = 0;
        $rootScope.registro.municipio = 0;
        $rootScope.registro.macrodistrito = 0;
        $rootScope.registro.distrito = 0;
        $rootScope.registro.zona = 0;
      }
    });  
  };

  $scope.cargarMunicipio = function(idMun){
    var datosP = new municipioLst();
    datosP.idMun = idMun;
    datosP.obtmunicipio(function(resultado){
      data = JSON.parse(resultado);
      if(data.success.length > 0){
        $rootScope.aMunicipios = data.success;
        $rootScope.deshabilitadoM = false;
      } else {
        $rootScope.msg = "Error !!";
        $rootScope.deshabilitadoM = true;
        $rootScope.deshabilitadoMc = true;
        $rootScope.deshabilitadoDs = true;
        $rootScope.deshabilitadoZ = true;
        $rootScope.registro.municipio = 0;
        $rootScope.registro.macrodistrito = 0;
        $rootScope.registro.distrito = 0;
        $rootScope.registro.zona = 0;  
      }
    });
  };
  
  var latitud = 0;
  var longitud = 0;
  var activarClick = false;
  var versionUrl = "";
  var markerToClose = null;
  var dynamicMarkers;
  var vNroInsidenciaG = 0;
  var recargaMapita;
  var map;
  var mapj;
  var markers = [];
  var markersj = [];

  $scope.initMap = function() {
      var haightAshbury = {
          lat: -16.495635, 
          lng: -68.133543
      };
      mapj = new google.maps.Map(document.getElementById('mapModificarJ'), {
        zoom: 15,
        center: haightAshbury
      });
      mapj.addListener('click', function(event) {
        $scope.deleteMarkersJ();
        $rootScope.laaa = event.latLng.lat();
        $rootScope.looo = event.latLng.lng();
        $scope.datos.INT_AC_latitud = $rootScope.laaa;
        $scope.datos.INT_AC_longitud = $rootScope.looo;
        $scope.addMarkerJ(event.latLng);
      });/*
      map = new google.maps.Map(document.getElementById('mapModificar'), {
          zoom: 15,
          center: haightAshbury,
      });

      mapj = new google.maps.Map(document.getElementById('mapModificarJ'), {
          zoom: 15,
          center: haightAshbury,
      });
      alert(1222),
      console.log(mapj);

      // This event listener will call addMarker() when the map is clicked.
      map.addListener('click', function(event) {
          $scope.deleteMarkers();
          $scope.registro.latitud = event.latLng.lat();
          $scope.registro.longitud = event.latLng.lng();
          $scope.addMarker(event.latLng);
      });

      mapj.addListener('click', function(event) {
          $scope.deleteMarkersJ();
          $scope.registro.latitud = event.latLng.lat();
          $scope.registro.longitud = event.latLng.lng();
          $scope.addMarkerJ(event.latLng);
      });   */
  }
  
  $scope.restaurarmapa    =   function(){
      setTimeout(function(){            
          $scope.mostrarMapa = true;
          google.maps.event.trigger(map, 'resize');
          $scope.abrirMapa();
          $scope.$apply();
      }, 300);
  }
  
  $scope.restaurarmapaJ    =   function(){
      setTimeout(function(){
          $scope.mostrarMapaJ = true;
          google.maps.event.trigger(mapj, 'resize');
          $scope.abrirMapaJ();
          $scope.$apply();
      }, 300);
  }    

  $scope.addMarker = function(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
    });
      markers.push(marker);
  }

  $scope.addMarkerJ = function(location) {
      var markerj = new google.maps.Marker({
        position: location,
        map: mapj
    });
      markersj.push(markerj);
  }

    $scope.setMapOnAll = function(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

  $scope.setMapOnAllJ = function(mapj) {
    for (var i = 0; i < markersj.length; i++) {
      markersj[i].setMap(mapj);
    }
  }

    $scope.clearMarkers = function() {
      $scope.setMapOnAll(null);
  }

  $scope.clearMarkersJ = function() {
      $scope.setMapOnAllJ(null);
  }

    // Shows any markers currently in the array.
    $scope.showMarkers = function() {
      $scope.setMapOnAll(map);
  }

  $scope.showMarkersJ = function() {
      $scope.setMapOnAllJ(mapj);
  }


  $scope.deleteMarkers = function() {
    $scope.clearMarkers();
    markersj = [];
  }

  $scope.deleteMarkersJ = function() {
      $scope.clearMarkersJ();
      markersj = [];
  }

  $scope.abrirMapa = function () {
    google.maps.visualRefresh = true;
    $scope.mostrarMapa = true;
    if( 
        (typeof($scope.registro.latitud) !=  'undefined' && $scope.registro.latitud  != "" && $scope.registro.latitud != 0 && $scope.registro.latitud != "0") &&
        (typeof($scope.registro.longitud) != 'undefined' && $scope.registro.longitud != "" && $scope.registro.longitud != 0 && $scope.registro.longitud != "0")
        ){
        var nuevoUbicacion = {
            lat: parseFloat($scope.registro.latitud), 
            lng: parseFloat($scope.registro.longitud)
        };

        map.setCenter(nuevoUbicacion);
        $scope.addMarker(nuevoUbicacion);
    }else{

        var nuevoUbicacion = {
            lat: -16.495635, 
            lng: -68.133543
        };
        map.setCenter(nuevoUbicacion);
        $scope.addMarker(nuevoUbicacion);
    }         
  }

  $scope.abrirMapaJ = function () {
    google.maps.visualRefresh = true;
    $scope.mostrarMapaJ = true;
    if( 
      (typeof($scope.registro.latitud) !=  'undefined' && $scope.registro.latitud  != "" && $scope.registro.latitud != 0 && $scope.registro.latitud != "0") &&
      (typeof($scope.registro.longitud) != 'undefined' && $scope.registro.longitud != "" && $scope.registro.longitud != 0 && $scope.registro.longitud != "0")
      ){
        var nuevoUbicacion = {
            lat: parseFloat($scope.registro.latitud), 
            lng: parseFloat($scope.registro.longitud)
        };
        mapj.setCenter(nuevoUbicacion);
        $scope.addMarkerJ(nuevoUbicacion);
    }else{
        var nuevoUbicacion = {
            lat: -16.495635, 
            lng: -68.133543
        };
        mapj.setCenter(nuevoUbicacion);
        $scope.addMarkerJ(nuevoUbicacion);
    }         
  }

  $scope.cerrarMapa = function () {
      $scope.mostrarMapa = false;
  };

  $scope.cerrarMapaJ = function () {
      $scope.mostrarMapaJ = false;
  };
  $scope.convertToDataURLviaCanvas = function (url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      canvas = null;
    };
    img.src = url;        
  };

  $scope.subirImgBase64= function(imagen,url,nombre){
    var contentType = 'image/png';
    var b64Data = imagen;
    var blob = b64toBlob(b64Data, contentType);
    var blobUrl = URL.createObjectURL(blob);
    function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;
      var byteCharacters = atob(b64Data);
      var byteArrays = [];
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }
      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    var sDirTramite = sessionService.get('IDTRAMITE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
    var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sDirTramite + "/";
    blob.name = nombre;
    var resFormulario = {
        container:url,
        file_path:nombre,
        body:blob
    };
    fileUpload.uploadFileToUrl(blob, uploadUrl);
  };

  $scope.capturarImagen = function(ubi){
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    var latitud = $rootScope.laaa;
    var longitud = $rootScope.looo;
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    var sDirTramite = sessionService.get('IDTRAMITE');
    $scope.url = "RC_CLI/" + $scope.oidCiudadano + "/" + sDirTramite;
    $scope.archivo1 = ubi+"croquisActividad.jpg";
    $scope.datos.INT_AC_direccionImagenmapa = CONFIG.APIURL+"/files/"+$scope.url + "/"+ $scope.archivo1 + "?app_name=todoangular";
    aDocAdjuntosmapa = [];
    var datosAdjuntosmapa = {
      "nombre_archivo" : $scope.archivo1,
      "tam_archivo" : '0',
      "estado_archivo" : "Env.",

      "opcion_archivo" : "-",
      "url_archivo" : $scope.datos.INT_AC_direccionImagenmapa,
      "docdatos" : "Croquis de la actividad",
      "descripcion" : "Croquis de la actividad",
      "titulo" : "Croquis"
    };
    aDocAdjuntosmapa[0]=datosAdjuntosmapa;
    $scope.datos.ARCHIVOS_MULTIPLES_MAPA = aDocAdjuntosmapa;
    $scope.convertToDataURLviaCanvas('https://maps.googleapis.com/maps/api/staticmap?center='+ latitud +','+ longitud +'&zoom=16&size=600x300&maptype=roadmap&markers=color:red|label:S|'+ latitud +','+ longitud +'&key=AIzaSyD_c3VUlclgLDhXQ_UHkGZ8uQiSeNHQHgw', function(base64Img){
      var Imagen = base64Img.replace(/data:image\/png;base64,/i,'');
      $scope.Imagenb = Imagen;
      $scope.subirImgBase64($scope.Imagenb, $scope.url, $scope.archivo1);
    });
  }

  //***************************Adjuntos*************************
  $scope.mostrarimgjuridico  =   function(imagen){
    if($scope.registro.FILE_FOTOCOPIA_CI){
      var nombreArchivoCi    =   "";
      nombreArchivoCi        =   $scope.registro.FILE_FOTOCOPIA_CI;
      var aTipoArchivoCi     =   nombreArchivoCi.split("?")[0];
      var extCi              =   aTipoArchivoCi.split(".")[1];
    }
    if($scope.registro.FILE_FOTOCOPIA_CI_R){
      var nombreArchivoCiR    =   "";
      nombreArchivoCiR        =   $scope.registro.FILE_FOTOCOPIA_CI_R;
      var aTipoArchivoCiR     =   nombreArchivoCiR.split("?")[0];
      var extCiR              =   aTipoArchivoCiR.split(".")[1];
    }
    if($scope.registro.FILE_PODER_LEGAL){
      var nombreArchivoPod    =   "";
      nombreArchivoPod        =   $scope.registro.FILE_PODER_LEGAL;
      var aTipoArchivoPod     =   nombreArchivoPod.split("?")[0];
      var extPod              =   aTipoArchivoPod.split(".")[1];
    }
    if($scope.registro.FILE_TEST_CONST){
      var nombreArchivoTes    =   "";
      nombreArchivoTes        =   $scope.registro.FILE_TEST_CONST;
      var aTipoArchivoTes     =   nombreArchivoTes.split("?")[0];
      var extTes              =   aTipoArchivoTes.split(".")[1];
    }
    if($scope.registro.FILE_NUM_IDENT){
      var nombreArchivoNum    =   "";
      nombreArchivoNum        =   $scope.registro.FILE_NUM_IDENT;
      var aTipoArchivoNum     =   nombreArchivoNum.split("?")[0];
      var extNum              =   aTipoArchivoNum.split(".")[1];
    }
    if($scope.registro.FILE_FUND_EMP){
      var nombreArchivoFund   =   "";
      nombreArchivoFund        =   $scope.registro.FILE_FUND_EMP;
      var aTipoArchivoFund     =   nombreArchivoFund.split("?")[0];
      var extFud              =   aTipoArchivoFund.split(".")[1];
    }
    if($scope.registro.FILE_CONDICIONES_USO_J){
        var nombreArchivoCon    =   "";
        nombreArchivoCon       =   $scope.registro.FILE_CONDICIONES_USO_J;
        var aTipoArchivorCon   =   nombreArchivoCon.split("?")[0];
        var extCon              =   aTipoArchivorCon.split(".")[1];
    }
    try{
      extCi           =   extCi.toLowerCase();
    }catch(e){}
    try{
      extCiR          =   extCiR.toLowerCase();
    }catch(e){}
    try{
      extPod          =   extPod.toLowerCase();
    }catch(e){}
    try{
      extTes          =   extTes.toLowerCase();
    }catch(e){}
    try{
      extNum          =   extNum.toLowerCase();
    }catch(e){}
    try{
      extFud          =   extFud.toLowerCase();
    }catch(e){}
    try{
      extCon         =   extCon.toLowerCase();
    }catch(e){}
    $.blockUI();
    if(imagen == 'ci'){
      $scope.archivoCI = CONFIG.APIURL + "/files/RC_CLI/" + $scope.registro.idrepre +"/" + $scope.registro.FILE_FOTOCOPIA_CI + "?app_name=todoangular";
      window.open($scope.archivoCI, "_blank");
    }else if(imagen == 'ciR'){
      $scope.archivoCIR = CONFIG.APIURL + "/files/RC_CLI/" + $scope.registro.idrepre +"/" + $scope.registro.FILE_FOTOCOPIA_CI_R + "?app_name=todoangular";
      window.open($scope.archivoCIR, "_blank");
    }else if(imagen == 'pod'){
      $scope.archivoPOD = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_PODER_LEGAL + "?app_name=todoangular";
      window.open($scope.archivoPOD, "_blank");
    }else if(imagen == 'tes'){
      $scope.archivoTES = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_TEST_CONST + "?app_name=todoangular";
      window.open($scope.archivoTES, "_blank");
    }else if(imagen == 'numiden'){
      $scope.archivoNUM = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_NUM_IDENT + "?app_name=todoangular";
      window.open($scope.archivoNUM, "_blank");
    }else if(imagen == 'fund'){
      $scope.archivoFUD = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_FUND_EMP + "?app_name=todoangular";
      window.open($scope.archivoFUD, "_blank");
    }else if(imagen == 'condj'){
      $scope.archivoCONJ = CONFIG.APIURL + "/files/RC_CLI/" + sessionService.get('IDSOLICITANTE') +"/" + $scope.registro.FILE_CONDICIONES_USO_J + "?app_name=todoangular";
      window.open($scope.archivoCONJ, "_blank");
    }
    $.unblockUI();
  }

  //********************REGISTRO CIUDADANO**********************
  $scope.almacenarDocumentos = function(aFiles){
    var oidCiudadano = sessionService.get('IDSOLICITANTE');
    $rootScope.direccionvirtual = "RC_CLI";
    var uploadUrl = CONFIG.APIURL + "/files/" + $rootScope.direccionvirtual + "/" + oidCiudadano + "/";
    if (aFiles[0]){
      $scope.registro.FILE_FOTOCOPIA_CI   = nombreNuevoCIAnverso;//aFiles[0].name;
      $scope.Advertencia1="ok";
    }
    if (aFiles[1]){
      $scope.registro.FILE_FOTOCOPIA_CI_R   = nombreNuevoCIReverso;//aFiles[1].name;
      $scope.Advertencia2="ok";
    }
    if (aFiles[2]){
      $scope.registro.FILE_PODER_LEGAL   = nombreNuevoPoderLegal;//aFiles[2].name;
      $scope.Advertencia3="ok";
    }
    if (aFiles[3]){
      $scope.registro.FILE_TEST_CONST   = nombreNuevoTestimonio;//aFiles[3].name;
      $scope.Advertencia4="ok";
    }
    if (aFiles[4]){
      $scope.registro.FILE_NUM_IDENT   = nombreNuevoNit;//aFiles[4].name;
      $scope.Advertencia5="ok";
    }
    if (aFiles[5]){
      $scope.registro.FILE_FUND_EMP   = nombreNuevoFundaempresa;//aFiles[5].name;
      $scope.Advertencia6="ok";
    }
    if (aFiles[6]){
      $scope.registro.FILE_CONDICIONES_USO_J   = nombreNuevoConuso;//aFiles[6].name;
      $scope.Advertencia7="ok";
    }
    if (aFiles[7]){
      $scope.registro.FILE_CONDICIONES_USO   = nombreNuevoConuson;//aFiles[7].name;
      $scope.Advertencia8="ok";
    }
    angular.forEach(aFiles, function(archivo, key) {
      if(typeof(archivo) != 'undefined'){
          fileUpload.uploadFileToUrl(archivo, uploadUrl);
      }else{
      }
    });
  };

  $scope.validarCiCiudadano = function(response){
    var sw=100;
    var filtrov;
    var misDocs = new Array();
    misDocs.push($scope.FILE_FOTOCOPIA_CI);
    misDocs.push($scope.FILE_FOTOCOPIA_CI_R);
    misDocs.push($scope.FILE_PODER_LEGAL);
    misDocs.push($scope.FILE_TEST_CONST);
    misDocs.push($scope.FILE_NUM_IDENT);
    misDocs.push($scope.FILE_FUND_EMP);
    misDocs.push($scope.FILE_REG_COMER);
    misDocs.push($scope.myFile1);
    $scope.almacenarDocumentos(misDocs);
    $.blockUI();
    var responseJuridico = response;
    $rootScope.dataDatospersonales = response;
    if(response.selecteIdi == "JURIDICO") {
      estcivil = 0;
    } else { 
      estcivil = response.estado_civil;
    }    
    if(tipoPersona == "JURIDICO") 
    {
      var cnit = response.nit;
      var dtspsl_tipo_persona="NATURAL";
      var dtspsl_estado="ACTIVO";
      var dtspsl_activacionf="SI";
      var dtspsl_activaciond="SI";
      filtrov= '{"dtspsl_ci":"'+ response.cedula + '","dtspsl_tipo_persona":"'+dtspsl_tipo_persona+'","dtspsl_estado":"'+dtspsl_estado+'","dtspsl_activacionf":"'+dtspsl_activacionf+'","dtspsl_activaciond":"'+dtspsl_activaciond+'"}';
      var resRepLegalMongo   = new reglasnegocio();
      resRepLegalMongo.identificador = "MONGO_RC_LAPAZ_174";
      resRepLegalMongo.parametros = filtrov;
      console.log('resRepLegalMongo',resRepLegalMongo);
      resRepLegalMongo.llamarregla(function(results){
        var datomongo=JSON.parse(results); 
        if (results !=null) {
          $.unblockUI();
          var filtroNit= '{"dtspsl_nit":"'+ cnit + '","dtspsl_estado":"ACTIVO"}';
          var resRepNit=new reglasnegocio();
          resRepNit.identificador="MONGO_RC_LAPAZ_175";
          resRepNit.parametros=filtroNit;
          resRepLegalMongo.llamarregla(function(data){
            data=JSON.parse(data);
            if (data !=null) {
              $scope.registroCiudadano(data);
            }else{
              $scope.errors["error_uos"] = error;
            }
          }).error(function(error){
            $scope.errors["error_uos"] = error;
          }); 
        }else{
          swal('Advertencia', 'El número de CI no esta en Registro Ciudadano', 'warning'); 
          $.unblockUI();
        }
      });                                                          
    } else {
      var ci1=response.cedula;
      var ci2=response.cedula2;
      var filtroA= '{"dtspsl_ci":"'+ response.cedula2 + '","dtspsl_tipo_persona":"NATURAL","dtspsl_estado":"ACTIVO"}';
      var resRepBus=new reglasnegocio();
      resRepBus.identificador="MONGO_RC_LAPAZ_178";
      resRepBus.parametros=filtroA;
      resRepBus.llamarregla(function(results){
        var datomongo=JSON.parse(results);
        if (results !=null) {
          $.unblockUI();
          $scope.registroCiudadano(results);   
        }else{
          swal('', 'El número de CI no esta en Registro Ciudadano', 'warning'); 
          $.unblockUI();
        }
      });      
    }
  };

  $scope.registroCiudadano = function (response) {
    var sMacroDescripcion   =   $('#macrodistrito option:selected').text();
    var sDistritoDescripcion   =   $('#distrito option:selected').text();
    var sZonaDescripcion = '';
    $.blockUI();
    if($scope.tipo_persona == 'NATURAL')
    {
      var file = $scope.myFile1;            
    }
    else
    {
      var file = $scope.myFile1;
    }
    if (file != null)
    {
      var uploadUrl = CONFIG.APIURL+"/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + '/' ;
      var nombreFile = file.name;
      var cadenaURL = uploadUrl + nombreFile + '?app_name=' + CONFIG.APP_NAME;
      var cadenaURI = $scope.direccionvirtual +"/" + nombreFile;
      fileUpload.uploadFileToUrl(file, uploadUrl);
    }
    else
    {
      var cadenaURL = $scope.imagenPortada;   // Recuperar informacion de la Imagen  
      var nombreFile = $scope.imagenNombre;   // Recuperar nombre de la Imagen  
    }
    var response = $rootScope.dataDatospersonales;
    var oidCiudadano = sessionService.get('IDSOLICITANTE');
    sDireccion = response.direccion;
    sFono = response.telefono;
    sCelular = response.celular;
    sCorreo = response.correo;  
    descripcionNombre = response.nombre;
    descripcionPaterno = response.paterno;
    descripcionMaterno = response.materno;
    var datos = {};
    if(response.estado_civil) {
      datos['dtspsl_id_estado_civil'] = response.estado_civil;  
    } else {   
      datos['dtspsl_id_estado_civil'] = '';
    }
    if(response.estado_civil == " ") {
      response.estado_civil = ""
    }
    archivoCI="";
    archivoCIR="";
    archivoPOD="";
    archivoTES="";
    archivoNUM="";
    archivoFUD="";
    archivoREG="";
    if(tipoPersona == "NATURAL"){
      if (response.FILE_FOTOCOPIA_CI!=null) { 
        partes =  response.FILE_FOTOCOPIA_CI.split("\\");
        if (partes.length==1){
          archivoCI = response.FILE_FOTOCOPIA_CI;
        }
        else{
          archivoCI= partes[partes.length-1];
        }
      }
      if (response.FILE_FOTOCOPIA_CI_R!=null){             
        partes =  response.FILE_FOTOCOPIA_CI_R.split("\\");
        if (partes.length==1){
          archivoCIR = response.FILE_FOTOCOPIA_CI_R;
        }
        else{
          archivoCIR= partes[partes.length-1];
        }
      }
    }
    if(tipoPersona == "JURIDICO"){
      archivoCI = response.FILE_FOTOCOPIA_CI;
      archivoCIR = response.FILE_FOTOCOPIA_CI_R;
      if (response.FILE_PODER_LEGAL!=null) { 
        partes =  response.FILE_PODER_LEGAL.split("\\");
        if (partes.length==1){
          archivoPOD = response.FILE_PODER_LEGAL;
        }
        else{
          archivoPOD= partes[partes.length-1];
        }
      } 
      if (response.FILE_TEST_CONST !=null) { 
        partes =  response.FILE_TEST_CONST.split("\\");
        if (partes.length==1){
          archivoTES = response.FILE_TEST_CONST;
        }
        else{
          archivoTES= partes[partes.length-1];
        }
      }
      if (response.FILE_NUM_IDENT !=null) { 
        partes =  response.FILE_NUM_IDENT.split("\\");
        if (partes.length==1){
          archivoNUM = response.FILE_NUM_IDENT;
        }
        else{
          archivoNUM= partes[partes.length-1];
        }
      }
      if (response.FILE_FUND_EMP!=null) { 
        partes =  response.FILE_FUND_EMP.split("\\");
        if (partes.length==1){
          archivoFUD = response.FILE_FUND_EMP;
        }
        else{
          archivoFUD= partes[partes.length-1];
        }
      }
      if (response.FILE_REG_COMER!=null) { 
        partes =  response.FILE_REG_COMER.split("\\");
        if (partes.length==1){
          archivoREG = response.FILE_REG_COMER;
        }
        else{
          archivoREG= partes[partes.length-1];
        }
      }
    }
    if ($scope.subir=="ok") {
      $scope.nombreFile1 = nombreFile;    // Nuevo dato Nombre del Archivo
    } else    {
        nombreFile1=$scope.imagenPortada_inicio;
    }
    var response2 = response;
    try{
      for (var dato in response)
      {
        if(response[dato] && response[dato]!= null && typeof(response[dato]) != "undefined" && response[dato] != "")
        {
          if(typeof(response[dato]) == "string" && 
              dato != "correo" && 
              dato != "correoRep" &&
              dato != "dtspsl_file_fotocopia_ci" &&
              dato != "dtspsl_file_fotocopia_ci_r" &&
              dato != "dtspsl_file_factura_luz" &&
              dato != "dtspsl_URL" &&
              dato != "FILE_FOTOCOPIA_CI" &&
              dato != "FILE_FOTOCOPIA_CI_R" &&
              dato != "FILE_FACTURA_LUZ" && 
              dato != "FILE_PODER_LEGAL"&&
              dato != "FILE_TEST_CONST" &&
              dato != "FILE_NUM_IDENT" && 
              dato != "FILE_FUND_EMP" &&
              dato != "FILE_REG_COMER") 
          {
            for (var i in response2) {
              if (response2[i] == response[dato]) 
              {
                response2[i] = response2[i].toUpperCase();
                break; 
              }
            } 
          }
        }
      }
    }catch(e){}
    if(response.municipio != 20101){
      response.zona = "425";
      response.zona_desc = response.zona_d;
      response.distrito = 0;
      response.macrodistrito = 0; 
      response.distrito_desc = 0;
      response.macrodistrito_desc = 0;
    }
    else{
      response.macrodistrito_desc = $('#prsMacrodistrito option:selected').text();
    }
    if(response.nombrevia == 'OTRO'){
      response.nombrevia1 = "OTRO%%"+response.otro_via;
    }else{
      response.nombrevia1 = response.nombrevia;
    }
    if(tipoPersona == "NATURAL") {
      var sfechaNacimiento = document.getElementById('prsFechaNac').value;
      var sfechaVencimiento = document.getElementById('fechaVen').value;
      var sfechacorrecta  = sfechaNacimiento.split('/')[2] + "-" +  sfechaNacimiento.split('/')[1] + "-" + sfechaNacimiento.split('/')[0] ;
      var sfechacorrectaven  = sfechaVencimiento.split('/')[2] + "-" +  sfechaVencimiento.split('/')[1] + "-" + sfechaVencimiento.split('/')[0];
      response.telefono                       = ((typeof(response.telefono) == 'undefined' || response.telefono == null || response.telefono == 'NaN') ? "" : response.telefono);
      sNumeroAleatorio                        = response.pin; 
      var modificarCiudadano                  = new rcNatural();
      modificarCiudadano.nombre               = response.nombre;
      modificarCiudadano.paterno              = response.paterno;
      modificarCiudadano.materno              = response.materno;
      modificarCiudadano.tercer_apellido      = response.tercer;
      modificarCiudadano.ci                   = response.cedula2;
      modificarCiudadano.complemento          = response.complemento;
      modificarCiudadano.expedido             = response.expedido;
      modificarCiudadano.expedido_desc        = $('#prsExpedido option:selected').text(); 
      modificarCiudadano.fec_nacimiento       = sfechacorrecta;
      modificarCiudadano.lugar_nacimiento     = response.lugarNacimiento;
      modificarCiudadano.lugar_nacimiento_desc= $('#prsLugarNacimiento option:selected').text();  
      modificarCiudadano.pais_origen          = response.pais_origen;
      modificarCiudadano.sexo                 = response.sexo;
      modificarCiudadano.id_estado_civil      = response.estado_civil;
      modificarCiudadano.estado_civil         = response.estado_civil;
      modificarCiudadano.estado_civil_desc    = $('#prsEstCivil option:selected').text(); 
      modificarCiudadano.profesion            = response.profesion;
      modificarCiudadano.profesion_desc       = $('#prsProfesion option:selected').text();  
      modificarCiudadano.otra_profesion       = response.otra_profesion;
      modificarCiudadano.telefono             = response.telefono;
      modificarCiudadano.movil                = response.celular;
      modificarCiudadano.correo               = response.correo;
      modificarCiudadano.direccion            = response.direccion;
      modificarCiudadano.pais                 = response.pais;
      modificarCiudadano.pais_desc            = $('#paisN option:selected').text();
      modificarCiudadano.departamento         = response.departamento;
      modificarCiudadano.departamento_desc    = $('#departamentoN option:selected').text();
      modificarCiudadano.provincia            = response.provincia;
      modificarCiudadano.provincia_desc       = $('#provinciaN option:selected').text();
      modificarCiudadano.municipio            = response.municipio;
      modificarCiudadano.municipio_desc       = $('#municipioN option:selected').text();
      modificarCiudadano.macrodistrito        = response.macrodistrito;
      modificarCiudadano.macrodistrito_desc   = response.macrodistrito_desc;
      modificarCiudadano.distrito             = response.distrito;
      modificarCiudadano.distrito_desc        = response.distrito_desc;
      modificarCiudadano.zona                 = response.zona;
      modificarCiudadano.zona_desc            = response.zona_desc;
      modificarCiudadano.tipo_via             = response.tipo_via;
      modificarCiudadano.tipo_via_desc        = $('#tipo_viaN option:selected').text();
      modificarCiudadano.nombre_via           = response.nombrevia;
      modificarCiudadano.numero_casa          = response.numero;
      modificarCiudadano.edificio             = response.edificio;
      modificarCiudadano.bloque               = response.bloque;
      modificarCiudadano.piso                 = response.piso;
      modificarCiudadano.oficina              = response.numeroOficina;
      modificarCiudadano.fec_vencimiento      = sfechacorrectaven;
      modificarCiudadano.latitud              = response.latitud;
      modificarCiudadano.longitud             = response.longitud;
      modificarCiudadano.usr_id               = idUsuario;
      modificarCiudadano.activacionf          = $scope.registro.activacionf;
      modificarCiudadano.activaciond          = $scope.registro.activaciond;
      modificarCiudadano.file_fotocopia_ci    = archivoCI;
      modificarCiudadano.file_fotocopia_ci_r  = archivoCIR;
      modificarCiudadano.ci_discapacitado     = response.ci_discapacitado;
      modificarCiudadano.persona_discapacidad = response.persona_discapacidad;
      modificarCiudadano.fec_expiracion_dis   = response.fec_expiracion_dis;
      if ($scope.nombreFile1 == 'undefined' || $scope.nombreFile1 == null) {
        $scope.nombreFile1 = "";
      };
      modificarCiudadano.URL=$scope.nombreFile1;
      modificarCiudadano.oid=oidCiudadano;
      modificarCiudadano.modificarNatural(function(resultado){
        resultadoApi = JSON.parse(resultado); 
        if( typeof(resultadoApi.success) != 'undefined')
        {

          var mensajeExito = "Se realizo la actualizacion de sus datos!";  
          setTimeout(function(){
              alertify.success(mensajeExito);  
          }, 100);
          $scope.cargarDatosCiudadano();       
        }
        else
        {
          $.unblockUI();                    
          var mensajeError = resultadoApi.error.message;
          alertify.error(mensajeError); 
        }
        $.unblockUI();  
        $('#formModificar').modal('hide');
      });
    }else{
      console.log(response,'response');
      response.telefono_representante                       = ((typeof(response.telefono_representante) == 'undefined' || response.telefono_representante == null || response.telefono_representante == 'NaN') ? "" : response.telefono_representante);
      sNumeroAleatorio = response.pin;
      var modificarJuridico= new rcJuridico();
      modificarJuridico.nit=response.nit;
      modificarJuridico.razonSocial=response.razon;
      modificarJuridico.telefono=response.telefono_representante;
      modificarJuridico.movil=parseInt(response.celular_representante);
      modificarJuridico.correo=response.correo;
      modificarJuridico.ci=response.cedula
      modificarJuridico.complemento=response.complemento;
      modificarJuridico.representante=descripcionNombre.trim() + " " + descripcionPaterno.trim() + " " + descripcionMaterno.trim();
      modificarJuridico.poder_replegal=response.repLegal.trim()+"/"+response.gestionrepLegal;
      modificarJuridico.nro_notaria=response.notaria;
      modificarJuridico.profesion=response.profesion;
      modificarJuridico.otra_profesion=response.otra_profesion;
      modificarJuridico.direccion=response.direccion_representante;
      modificarJuridico.pais=response.pais;
      modificarJuridico.pais_desc=$('#pais option:selected').text();
      modificarJuridico.departamento=response.departamento;
      modificarJuridico.departamento_desc=$('#departamento option:selected').text();
      modificarJuridico.provincia=response.provincia;
      modificarJuridico.provincia_desc=$('#provincia option:selected').text();
      modificarJuridico.municipio=response.municipio;
      modificarJuridico.municipio_desc=$('#municipio option:selected').text();
      modificarJuridico.macrodistrito        = response.macrodistrito;
      modificarJuridico.macrodistrito_desc   = $('#macrodistrito option:selected').text();
      modificarJuridico.distrito             = response.distrito;
      modificarJuridico.distrito_desc        = $('#distrito option:selected').text();
      modificarJuridico.zona                 = response.zona;
      modificarJuridico.zona_desc            = $('#zona option:selected').text();
      modificarJuridico.tipo_via=response.tipo_via;
      modificarJuridico.tipo_via_desc=$('#tipo_via1 option:selected').text();
      modificarJuridico.nombre_via=response.nombrevia;
      modificarJuridico.numero_casa=response.numero;
      modificarJuridico.edificio=response.edificio;
      modificarJuridico.bloque=response.bloque;
      modificarJuridico.piso=response.piso;
      modificarJuridico.oficina=response.numeroOficina;
      modificarJuridico.fec_vencimiento = document.getElementById('fechaVen').value;
      modificarJuridico.latitud=response.latitud;
      modificarJuridico.longitud=response.longitud;
      modificarJuridico.usr_id=sessionService.get('IDUSUARIO');;
      modificarJuridico.activacionf=response.activacionf;
      modificarJuridico.activaciond=response.activaciond;                 
      modificarJuridico.file_fotocopia_ci=archivoCI;
      modificarJuridico.file_fotocopia_ci_r=archivoCIR;
      modificarJuridico.file_poder_legal=archivoPOD;
      modificarJuridico.file_test_const=archivoTES;
      modificarJuridico.file_num_ident=archivoNUM;
      modificarJuridico.file_fund_emp=archivoFUD;
      modificarJuridico.file_reg_comer=archivoREG;
      if ($scope.nombreFile1 == 'undefined' || $scope.nombreFile1 == null) {
        $scope.nombreFile1 = "";
      };
      modificarJuridico.URL=$scope.nombreFile1;
      modificarJuridico.oid=oidCiudadano; 
      console.log(modificarJuridico,$('#distrito option:selected').text(),11111);
      modificarJuridico.modificarJuridico(function(resultado){
        resultadoApi = JSON.parse(resultado);
        if( typeof(resultadoApi.success) != 'undefined')
        {
          var mensajeExito = "Se realizo la actualizacion de sus datos!";  
          console.log(resultadoApi,1235);
          setTimeout(function(){
              alertify.success(mensajeExito);  
          }, 100);      
          $scope.cargarDatosCiudadano();    
        }
        else
        {
          $.unblockUI();                    
          var mensajeExito = resultadoApi.error.message;
          alertify.error(mensajeExito); 
        }
        $.unblockUI();  
        $('#formModificar').modal('hide');
      });
    }
  };

  //**********************Guardar Datos*************************
  $scope.guardar_tramite = function(){
    $scope.datos.oficinas = $scope.arrayOficinas;
    $scope.datos.Tipo_tramite_creado = "WEB";
    try {
      console.log('$scope.datos',$scope.datos);
      var datosSerializados   =  JSON.stringify($scope.datos);
      var idCiudadano         = sessionService.get('IDSOLICITANTE');
      var idTramite           = sessionService.get('IDTRAMITE');
      var idServicio          = idTram;
      var crear = new datosFormularios();
      crear.frm_tra_dvser_id = idServicio;
      crear.data_json = datosSerializados;
      crear.frm_tra_id_ciudadano = sIdCiudadano;
      crear.frm_tra_id_usuario = 1;
      crear.frm_idTramite = idTramite;
      $.blockUI();
      crear.sp_crear_datos_formulario(function(results){
        results = JSON.parse(results);
        results = results.success;
        if(results.length > 0){
          $scope.tramitesCiudadano();
          $scope.desabilitaEnvio = false;
          alertify.success("Formulario almacenado");
          $.unblockUI();
        }else{
          $.unblockUI();
          sweet.show('', "Formulario no almacenado", 'error');
        }
      });
    }catch(e){
      console.log("Error..",e);
      $.unblockUI();
    }
  }

  $scope.validarEnvio = function(data){
    swal({
      title: 'CONFIRMAR',
      text: 'El envío de la presente solicitud  generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      closeOnConfirm: false
    }, function() {
      swal.close();
      setTimeout(function(){
        console.log($scope.datos,'datos');
        if($scope.datos.oficinas.length>0 || $scope.datos.f10_modificacionRepEmpresa){
          if($scope.datos.f10_modificacionRepEmpresa){
            console.log($scope.datos,12333444);
            if($scope.tipo_persona == 'NATURAL'){
              var razonSocial = $scope.datos.RO_NOM_RL +' '+ $scope.datos.RO_PAT_RL+' '+$scope.datos.RO_MAT_RL;
              var nit = '';
              var ci = $scope.datos.RO_CI_RL;
              var datosRepresentante = {
                'RO_NOM_RL':$scope.datos.RO_NOM_RL,
                'RO_PAT_RL':$scope.datos.RO_PAT_RL,
                'RO_MAT_RL':$scope.datos.RO_MAT_RL,
                'RO_CAS_RL':$scope.datos.RO_CAS_RL,
                'RO_CI_RL':$scope.datos.RO_CI_RL,
                'RO_EXP_RL':$scope.datos.RO_EXP_RL,
                'RO_CEL_RL':$scope.datos.RO_CEL_RL,        
                'RO_CORR_RL':$scope.datos.RO_CORR_RL,
                'RO_ZONA_RL':$scope.datos.RO_ZONA_RL,
                'RO_TIP_VIA_RL':$scope.datos.RO_TIP_VIA_RL,
                'RO_CALL_RL':$scope.datos.RO_CALL_RL,
                'RO_NRO_RL':$scope.datos.RO_NRO_RL
              }
            }else{
              var razonSocial = $scope.datos.MO_RZ;
              var nit = $scope.datos.MO_NIT;
              var ci = nit;
              var datosRepresentante = {
                'RO_NIT':$scope.datos.MO_NIT,
                'RO_RZ':$scope.datos.MO_RZ,
                'RO_POD_RL':$scope.datos.MO_POD_RL,
                'RO_NOT_RL':$scope.datos.MO_NOT_RL,
                'RO_ZON_OF':$scope.datos.MO_ZON_OF,
                'RO_TIP_VIA_OF':$scope.datos.MO_TIP_VIA_OF,
                'RO_NON_VIA_RL':$scope.datos.MO_NOM_VIA_OF,        
                'RO_NUM_DOM_OF':$scope.datos.MO_NUM_DOM_OF,
                'RO_NOM_RLJ':$scope.datos.MO_NOM_RLJ,
                'RO_PAT_RLJ':$scope.datos.MO_PAT_RLJ,
                'RO_MAT_RLJ':$scope.datos.MO_MAT_RLJ,
                'RO_CI_RLJ':$scope.datos.MO_CI_RLJ,
                'RO_EXP_RLJ':$scope.datos.MO_EXP_RLJ,
                'RO_CEL_RLJ':$scope.datos.MO_CEL_RLJ
              }
            }
            var rep = new actualizaRepresentante();
            rep.ope_id = $scope.datos.MO_ID_OPE;
            rep.ci_repr = ci; 
            rep.datos = JSON.stringify(datosRepresentante);
            rep.usr_id = 1;
            rep.persona = $scope.tipo_persona;
            rep.oidciudadano = $scope.datos.MO_OID;
            rep.repr_adjuntos = JSON.stringify($scope.datos.fileArRequisitosArrayRepresentante);
            rep.modificaRepresentante(function(results){
              results = JSON.parse(results).success.data[0].sp_ope_modifica_representante;
              if(results == 1){
                $scope.crea_tramite_lotus($scope.datos);
              }else{
                swal("", "Ocurrio un error vuelva a intentarlo", "error");
              }
            })
          }else{
            $scope.crea_tramite_lotus($scope.datos);
          }
        }
        else{
          swal("", "No se modifico el dato de ninguna oficina, ni del representante legal", "warning");  
        }
        console.log($scope.datos,'datos');
      },100);
    });
  };

  $scope.crea_tramite_lotus = function (datos) {
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
      $.blockUI();
      var f = new Date();  
      datos.g_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
      datos.g_tipo = 'MO';
      var data_form = JSON.stringify(datos);
      var tramite = new crear_Tramite_lotus();
      tramite.proid = 386;
      tramite.actid = 1729;
      tramite.usr_id = 0;        
      tramite.datos = data_form;
      tramite.procodigo = 'MO';
      tramite.macro_id = 0;
      tramite.nodo_id = 672;
      tramite.ws_id = 24;
      tramite.tram_lotus(function(results){ 
        results = JSON.parse(results);
        console.log('results',results);
        if (results !=null) {
          results = results.success.data[0].casonro;
          $scope.validarFormProcesos(results);
          $.unblockUI();
        }else{
          alertify.error("Señor(a) Ciudadano(a) ocurrio un error al enviar su Tramité.", );
          $.unblockUI();
        }
      }); 
    },300);           
  };

  $scope.validarFormProcesos = function(nroTramite){
    var idUsuario = sessionService.get('IDUSUARIO');
    try {
      idUsuario = 4; 
      var tramiteIgob = new datosFormularios();
      tramiteIgob.frm_idTramite = sessionService.get('IDTRAMITE');
      tramiteIgob.frm_tra_enviado = 'SI';
      tramiteIgob.frm_tra_if_codigo = nroTramite;
      tramiteIgob.frm_tra_id_usuario = idUsuario;
      tramiteIgob.validarFormProcesos(function(resultado){
        $scope.mostrar_formulario = false;
        swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramite + "\n Usted debe dirigirse al tercer día hábil a la Secretaria Municipal de Movilidad y contactarse con el Asesor Legal DROM, portando sus documentos originales para la verificación.");
        $scope.tramitesCiudadano();
        $.unblockUI(); 
      });
    } catch (error){
      alertify.success('Registro no modificado');
      $.unblockUI(); 
    }
  };

  //**********************Datos del Mapa************************
  
}