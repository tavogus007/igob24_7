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

  $scope.inicio = function(){
    $scope.tramitesCiudadano();
    $scope.cargarDatosCiudadano();
    $scope.recuperandoDatosGenesis();
    $scope.listarAE();
  }
  //*******************ACTIVIDADES ECONOMICAS************************
  $scope.recuperandoDatosGenesis = function(){
    console.log($scope.datos,'datos');
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
      conGenesis.lstDatosContribuyente(function(resultado){
        resultadoApi = JSON.parse(resultado);
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
      contribuyente.lstActividadEconomica(function(resultado){
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
        document.getElementById(idfile).click();
    }else{
        alert("Error ");
    }
  };

  $scope.cambiarFile = function(obj, valor){
    $scope.subirRequisitos(obj, valor);
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
        angular.forEach($scope.requisitos, function(doc, pos) {
          if(doc.req_id == idFiles[key]){
            descDoc = 'Requisito_'+doc.req_id;
          }
        })
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
    angular.forEach($scope.requisitos, function(doc, pos) {
      if(doc.req_id == idFile){
        descDoc = 'Requisito_'+doc.req_id;
      }
    })
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
    var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "idRequisito":'+idFile+',"desc":"'+descrip+'"}';
    $scope.fileArRequisitos[aArch.name] = JSON.parse(myJSON);
    $scope.fileArRequisitosArray.push(JSON.parse(myJSON));
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
  //**********************Guardar Datos*************************
  $scope.guardar_tramite = function(){
    $scope.datos.oficinas = $scope.arrayOficinas;
    $scope.datos.Tipo_tramite_creado = "WEB";
    try {
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
        if($scope.datos.oficinas.length>0){
          console.log('oficinas',$scope.datos.oficinas);
          /*for (var i = 0; i < $scope.datos.oficinas.length; i++) {
            var ofic = new modOficinasAprobadas();
            ofic.xofi_id = $scope.datos.oficinas[i].xofi_id;
            ofic.xofi_oficina = $scope.datos.oficinas[i].xofi_oficina;
            ofic.xofi_datos = JSON.stringify($scope.datos.oficinas[i].xofi_datos);
            ofic.xofi_viae = JSON.stringify($scope.datos.oficinas[i].xofi_viae);
            ofic.modificaOficina(function(results){
              console.log(results,'results');
            })
          }*/
          $scope.crea_tramite_lotus($scope.datos);
        }
        else{
          swal("", "No se modifico el dato de ninguna oficina", "warning");  
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
  var latitud = 0;
  var longitud = 0;
  var activarClick = false;
  var versionUrl = "";
  var markerToClose = null;
  var dynamicMarkers;
  var vNroInsidenciaG = 0;
  var recargaMapita;
  var map;
  var markers = [];

  $scope.initMap = function() {
    var haightAshbury = {
      lat: -16.495635,
      lng: -68.133543
    };
    try{
      map = new google.maps.Map(document.getElementById('mapActividad'), {
        zoom: 15,
        center: haightAshbury
      });
      map.addListener('click', function(event) {
        $scope.deleteMarkers();
        $rootScope.laaa = event.latLng.lat();
        $rootScope.looo = event.latLng.lng();
        $scope.datos.INT_AC_latitud = $rootScope.laaa;
        $scope.datos.INT_AC_longitud = $rootScope.looo;
        $scope.addMarker(event.latLng);
      });
    }catch(err){}
  }

  $scope.addMarker = function(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    markers.push(marker);
  }

  $scope.setMapOnAll = function(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  $scope.clearMarkers = function() {
    $scope.setMapOnAll(null);
  }

  $scope.showMarkers = function() {
    $scope.setMapOnAll(map);
  }

  $scope.deleteMarkers = function() {
    $scope.clearMarkers();
    markers = [];
  }

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
}