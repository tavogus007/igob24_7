function renovacionOperadoresController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
  var sIdCiudadano = sessionService.get('IDSOLICITANTE');
  $scope.operadoresUsuario = [];
  $scope.operadoresOficinas = [];
  $scope.datos = {};
  $scope.oidCiu = sessionService.get('IDCIUDADANO');
  $scope.tipo_persona = sessionService.get('TIPO_PERSONA');
  $scope.tramiteSeleccionado = '';
  $scope.mostrar_formulario = false;
  $scope.desabilitaOfi = false;
  var licenciasEmitidas = [];
  var tipoVia = [{"tipo":"AV","desc":"AVENIDA"},{"tipo":"CA","desc":"CALLE"},{"tipo":"CL","desc":"CALLEJON"},{"tipo":"PA","desc":"PASAJE"},{"tipo":"ND","desc":"NO DEFINIDO"}];
  var sfechafinal =   "";
  var sfecha = "";

  $scope.inicio = function(){
    $scope.operadoresHabilitados();
    $scope.cargarDatosCiudadano();
    $scope.recuperandoDatosGenesis();
    $scope.listarAE();
    $scope.obtenerFecha();
  }

  //**************************OBTENER FECHA*************************
  $scope.obtenerFecha = function(){
    try{
      var fechaactualn = new fechaserver();
      fechaactualn.obtfechahora(function(resultado){
        sfecha  =   JSON.parse(resultado).success.fecha;
      });
      if(sfecha != null && sfecha != "") {
        var snuevafecha = "";
        var nrof    =   0;
        try{
          nrof    =   sfecha.split("/").length;
        }catch(e){}
        if(nrof > 1){
          var dateString = sfecha;
          var dateParts = sfecha.split("/");
          snuevafecha = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);// month is 0-based
        }else{
          snuevafecha = new Date(sfecha);
        }
        var messnuevafecha = "";
        var diasnuevafecha = "";
        if(snuevafecha != 'Invalid Date'){
          messnuevafecha        =     snuevafecha.getMonth()+1;
          messnuevafecha        =     (messnuevafecha < 10) ? '0' + messnuevafecha : messnuevafecha;
          if (snuevafecha.getDate()<10){
              diasnuevafecha = "0" + (snuevafecha.getDate());
          }else{
              diasnuevafecha = snuevafecha.getDate();
          }
          sfechafinal = diasnuevafecha + "/" + messnuevafecha + "/" + snuevafecha.getFullYear();
          $scope.anioserver = snuevafecha.getFullYear();
        }
      } else {
        sfechafinal =  sfecha;
      }
      $scope.fechafinalserver = sfechafinal;
    }catch(e){
      $.unblockUI();
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
      conGenesis.lstDatosContribuyenteLey272(function(resultado){
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
    console.log()
    if(sNumeroRegistros > 0 ){
      $scope.datos.rdTipoTramite = "MODIFICACION";
      var idContribuyente =   $scope.dataGenesisCiudadano[0].idContribuyente;
      if($scope.tipo_persona == "NATURAL"){
        var tipoPersona = "N";
      }else{
        var tipoPersona = "J";
      }
      console.log(idContribuyente,'idContribuyente');
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

  //**********************DATOS DEL TRAMITE*************************
  $scope.operadoresHabilitados = function(){
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
      console.log('results 12345678',results);
      $scope.operadoresUsuario = results;
      $scope.tablaOperadores.reload();
    })
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
    console.log(operador,'operador');
    $scope.mostrar_formulario = true;
    $scope.datos.MO_ID_OPE = operador.xope_id; 
    $scope.datos.MO_OPE = operador.xope_tipo_operador;
    $scope.datos.MO_MOD = operador.xope_datos.RO_MOD;
    $scope.datos.MO_MOD_VALUE = operador.xope_datos.RO_MOD_VALUE;
    $scope.datos.MO_TIP_SER = operador.xope_datos.RO_TIP_SER;
    $scope.datos.MO_DIRC_RES = operador.direccion_res;
    var listaOficinas = new oficinasAprobadas();
    listaOficinas.idOperador = $scope.datos.MO_ID_OPE;
    listaOficinas.listaOficinasAprob(function(data){
      var data = JSON.parse(data).success.data;
      console.log("data oficinas",data,'5656',licenciasEmitidas);
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
          }
        }
      }
      console.log(data,'oficinas');
      console.log(licenciasEmitidas,'licen');
      if(oficinasLicencias.length > 0){
        data = oficinasLicencias;
        console.log('oficinasLicencias',oficinasLicencias);
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

  //********************DATOS OFICINA****************************
  $scope.verOficina = function(oficina){
    if(oficina.deudaActividad == 'ACTIVIDAD SIN DEUDA'){
      var fechasActual = sfechafinal.split("/");
      var fechasInicioAct = oficina.FechaInicio.split("/");
      fechasActual = fechasActual[2] +'-'+fechasActual[1].replace("0","")+'-'+fechasActual[0].replace("0","");
      fechasInicioAct = (parseInt(fechasInicioAct[2])+1) +'-'+fechasInicioAct[1].replace("0","")+'-'+fechasInicioAct[0].replace("0","");
      console.log(fechasActual,123,fechasInicioAct);
      console.log(new Date(fechasActual),345566,new Date (fechasInicioAct));
      if(new Date(fechasActual) < new Date (fechasInicioAct)){
        $scope.renovacion = 'RENOVACION';
        $scope.datosOficina = oficina;    
        $scope.publicid = $scope.datosOficina.xofi_viae;
        if($scope.datos.MO_MOD_VALUE==1){
          $scope.datosOficina.rdTipoTramite1 = 'CON PUBLICIDAD';
        }
        $scope.macrodistritos();
        $scope.distritoZonas($scope.datosOficina.xofi_datos.RO_MAC_OF_VALUE);
        $scope.publi=[];
        var datosGenerales = new getDatosAEViae();
        datosGenerales.idActividadEconomica = oficina.IdActividad;
        datosGenerales.getDatosAE_Viae(function(resultado){
          var resultadoAe = JSON.parse(resultado).success.dataSql;
          $scope.datosOficina.resultadoAe = resultadoAe;
          $('#verOficina').modal('show');
          console.log(resultadoAe.datosVIAE,'datos Via');
          $scope.datosOficina.xofi_viae = resultadoAe.datosVIAE;
          console.log(123,$scope.datosOficina);
        });
        $scope.datosOficina.viaAntiguo = oficina.xofi_viae;
      }else{
        $scope.renovacion = '';
        swal('', "Actividad Economica Vigente!!!", 'warning');
        $scope.datosOficina = oficina;    
        $scope.publicid = $scope.datosOficina.xofi_viae;
        if($scope.datos.MO_MOD_VALUE==1){
          $scope.datosOficina.rdTipoTramite1 = 'CON PUBLICIDAD';
        }
        $scope.macrodistritos();
        $scope.distritoZonas($scope.datosOficina.xofi_datos.RO_MAC_OF_VALUE);
        $scope.publi=[];
        var datosGenerales = new getDatosAEViae();
        datosGenerales.idActividadEconomica = oficina.IdActividad;
        datosGenerales.getDatosAE_Viae(function(resultado){
          var resultadoAe = JSON.parse(resultado).success.dataSql;
          $scope.datosOficina.resultadoAe = resultadoAe;
          $scope.datosOficina.xofi_viae = resultadoAe.datosVIAE;

          $('#verOficina').modal('show');
          console.log($scope.datosOficina.resultadoAe);
        });
        $scope.datosOficina.viaAntiguo = oficina.xofi_viae;
        $('#verOficina').modal('show');
      }
    }else{
      swal('','Esa Actividad Economica tiene deudas para realizar la modificación debe cancelar sus deudas', 'warning');
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

  $scope.validarEnvio = function(data){
    swal({
      title: 'CONFIRMAR',
      text: 'Esta seguro de enviar el Trámite para la Renovación de la Licencia?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      closeOnConfirm: false
    }, function() {
      swal.close();
      setTimeout(function(){
        console.log('data',data);
        $scope.crea_tramite_lotus(data);
      },100);
    });
  };

  $scope.crea_tramite_lotus = function (datosOfi) {
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
      console.log(datosOfi,8888,$scope.datos);
      var f = new Date(); 
      var datosNeXO = {};
      datosNeXO['f01_id_actividad_economica']     = datosOfi.IdActividad;;
      //datosNeXO['f01_nro_orden']   =   paramForm.f01_nro_orden;
      datosNeXO['f01_id_contribuyente']           = $scope.datos.dataGenesisCiudadano[0].idContribuyente;
      datosNeXO['f01_num_pmc']                    = $scope.datos.dataGenesisCiudadano[0].padron;
      // ne datosNeXO['f01_id_representante_legal'] = paramForm.f01_id_representante_legal;
      datosNeXO['usuario']                        = 0;
      datosNeXO['f01_tipo_per']                   = 'J';
      datosNeXO['f01_tipo_per_desc']              = $scope.datos.MO_TIP_PER;
      //datosNeXO['INT_SOLICITANTE']                =   paramForm.INT_SOLICITANTE;
      //datosNeXO['AE_ORD_DEM']                     =   paramForm.AE_ORD_DEM;
      datosNeXO['f01_nit']                        = $scope.datos.MO_NIT;
      datosNeXO['f01_num_doc_per_jur']            = $scope.datos.MO_NIT;
      datosNeXO['f01_raz_soc_per_jur']            = $scope.datos.MO_RZ;
      datosNeXO['f01_raz_soc']                    = $scope.datos.MO_RZ.toUpperCase();
      datosNeXO['f01_tipo_lic_descrip']           = "COMERCIO Y SERVICIOS";
      datosNeXO['INT_ID_CAT_AGRUPADA']            = 16;
      datosNeXO['f01_zona_rep']                   = $scope.datos.MO_RZ;  
      //datosNeXO['f01_requisitos_tecnicos']        =   $scope.datos.f01_requisitos_tecnicos;
      datosNeXO['INT_TIPO_DOC_IDENTIDAD']         = 'CI';
      datosNeXO['f01_num_doc_rep']                = $scope.datos.MO_CI_RLJ;
      datosNeXO['f01_tip_doc_rep']                = 'CI';
      datosNeXO['f01_expedido_rep']               = $scope.datos.MO_EXP_RLJ;
      datosNeXO['f01_email_rep']                  = $scope.datos.MO_CORR_RLJ;
      datosNeXO['f01_cel_rep']                    = $scope.datos.MO_CEL_RLJ;
      datosNeXO['f01_telef_rep']                  = $scope.datos.MO_TEL_RLJ;
      datosNeXO['INT_FEC_SOLICITUD']              = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
      datosNeXO['CI_BIGDATA']                     = $scope.datos.MO_OID;
      datosNeXO['f01_id_zona_rep']                = $scope.datos.MO_ZONAJ;
      datosNeXO['f01_zon_rep_valor']              = $scope.datos.MO_ZONA_RLJ;
      datosNeXO['f01_pri_nom_rep']                = $scope.datos.MO_NOM_RLJ;
      datosNeXO['f01_seg_nom_rep']                = '';
      datosNeXO['f01_ter_nom_rep']                = '';
      datosNeXO['f01_ape_pat_rep']                = $scope.datos.MO_PAT_RLJ;
      datosNeXO['f01_ape_mat_rep']                = $scope.datos.MO_MAT_RLJ;
      datosNeXO['f01_ape_cas_rep']                = $scope.datos.MO_CAS_RLJ;
      datosNeXO['f01_fecha_nac']                  = $scope.datos.MO_FEC_NAC_RLJ;
      //datosNeXO['INT_ACTIVIDAD']                  = $scope.datos.MO_CAS_RLJ;
      //datosNeXO['f01_denominacion']               = $scope.datos.MO_CAS_RLJ;
      datosNeXO['f01_sup']                        = datosOfi.xofi_datos.RO_SUP_SUC;
      datosNeXO['f01_cap_aprox']                  = datosOfi.resultadoAe.datosAE[0].capacidad;
      datosNeXO['f01_de_hor']                     = "08:00";
      datosNeXO['f01_a_hor']                      = "08:00";
      datosNeXO['INT_AC_ESTADO']                  = datosOfi.Estado;
      datosNeXO['INT_AC_MACRO']                   = datosOfi.xofi_datos.RO_MAC_OF_VALUE;
      datosNeXO['f01_zon_rep_valor']              = $scope.datos.MO_ZONA_RLJ;
      datosNeXO['f01_tipo_viarep']                = $scope.datos.MO_TIP_VIA_RLJ;
      datosNeXO['f01_nom_via_rep']                = $scope.datos.MO_NOM_VIA_OF; ///7545
      //datosNeXO['OTRO_VIA']                       = $scope.datos.MO_FEC_NAC_RLJ;
      datosNeXO['f01_num_rep']                    = $scope.datos.MO_NRO_RLJ;
      //datosNeXO['INT_AC_EDIFICIO']                = $scope.datos.MO_FEC_NAC_RLJ;
      datosNeXO['f01_fecha_ini_act']              = datosOfi.FechaInicio;
      datosNeXO['f01_estab_es']                   = datosOfi.xofi_datos.RO_EST_SUC;
      datosNeXO['f01_idCodigoZona']               = datosOfi.xofi_revision.codZona;

      //datosNeXO['f01_distrito_desc']              = $scope.datos.MO_NRO_RLJ;
      datosNeXO['f01_productosElaborados']        = 'Ninguno';
      //datosNeXO['f01_actividadesSecundarias']     =   paramForm.f01_actividadesSecundarias;
      datosNeXO['f01_tipo_lic']                   = 1;
      datosNeXO['f01_categoria']                  = 2798;
      datosNeXO['INT_ID_CAT_AGRUPADA']            = 16;
      datosNeXO['f01_categoria_agrupada']         = 16;
      datosNeXO['f01_macro_act']                  = datosOfi.xofi_datos.RO_MAC_OF;
      datosNeXO['f01_macro_act_descrip']          = datosOfi.xofi_datos.RO_MAC_OF_VALUE;
      datosNeXO['f01_zona_act']                   = datosOfi.xofi_datos.RO_ZONA_OF;
      datosNeXO['f01_zona_act_descrip']           = datosOfi.xofi_datos.RO_ZONA_OF_VALUE;
      datosNeXO['f01_dist_act']                   = datosOfi.xofi_datos.RO_DIS_ID_OF;
      //datosNeXO['f01_dist_act_descrip']           =   paramForm.f01_dist_act_descrip;
      datosNeXO['f01_tip_via_act']                = datosOfi.xofi_datos.RO_TIPO_VIA_SUC;
      datosNeXO['f01_num_act']                    = datosOfi.xofi_datos.RO_NRO_SUC;
      datosNeXO['f01_num_act_n']                  = datosOfi.xofi_datos.RO_NRO_SUC;
      datosNeXO['f01_factor']                     = datosOfi.resultadoAe.datosAE[0].tipoTrayecto;
      datosNeXO['f01_num_act1']                   = datosOfi.xofi_datos.RO_NRO_SUC;
      //datosNeXO['f01_edificio_act']               =   paramForm.f01_edificio_act;
      //datosNeXO['f01_bloque_act']                 =   paramForm.f01_bloque_act;
      //datosNeXO['f01_piso_act']                   =   paramForm.f01_piso_act;
      //datosNeXO['f01_dpto_of_loc']                =   paramForm.f01_dpto_of_loc;
      datosNeXO['f01_tel_act1']                   = datosOfi.xofi_datos.RO_TEL_SUC;
      //datosNeXO['f01_casilla']                    =   paramForm.f01_casilla;
     // datosNeXO['f01_cod_luz']                    =   paramForm.f01_cod_luz;
      //datosNeXO['f01_bloque_act']                 =   paramForm.f01_bloque_act;
      datosNeXO['f08_hojas_recibidas']            = "0";
      datosNeXO['f08_observaciones_i']            = "0";
      datosNeXO['f01_hojas_recibidas']            = "0";
      datosNeXO['f01_observaciones_i']            = "0";
      datosNeXO['f04_res_solicitud_upaee']        = "PROCEDE";
      datosNeXO['INT_RL_FEC_NACIMIENTO']          = $scope.datos.MO_CI_RLJ;
      //datosNeXO['INT_ACTIVIDAD_DESCRIPCION']      =   document.getElementById('INT_ACTIVIDAD_DESCRIPCION').value;
      datosNeXO['INT_AC_MACRO_ID']                = datosOfi.xofi_datos.MO_MAC_ID_OF;
      datosNeXO['INT_DISTRITO']                   = datosOfi.xofi_datos.RO_DIS_ID_OF;
      //datosNeXO['f01_distrito_desc']              =   paramForm.f01_distrito_desc;
      //DATOS FALTANTES DEL CONTRIBUYENTE - REPRESENTANTE LEGAL
      //datosNeXO['f01_macro_des']              =   $scope.datos.MO_NRO_RLJ;
      ///datosNeXO['INT_ZONA']                   =   $scope.datos.MO_NRO_RLJ;
      //datosNeXO['INT_VIA']                    =   $scope.datos.MO_NRO_RLJ;
      //datosNeXO['INT_NOMBRE_VIA']             =   $scope.datos.MO_NRO_RLJ;
      //datosNeXO['INT_NUM']                    =   $scope.datos.MO_NRO_RLJ;
      //datosNeXO['INT_EDIF']                   =   paramForm.INT_EDIF;
      //datosNeXO['INT_BLOQUE']                 =   paramForm.INT_BLOQUE;
      //datosNeXO['INT_PISO']                   =   paramForm.INT_PISO;
      //datosNeXO['INT_NUM_DEP']                =   paramForm.INT_NUM_DEP;
      //datosNeXO['INT_DIR_DET']                =   paramForm.INT_DIR_DET;
      //DATOS INICIALES PERSONA JURIDICA
      //datosNeXO['INT_RL_FEC_EMISION_DOCUMENTO']    =  paramForm.INT_RL_FEC_EMISION_DOCUMENTO;
      datosNeXO['f01_num_pod_leg']                 =  $scope.datos.MO_NUM_P;
      datosNeXO['INT_NACIONALIDAD']                =  'BOLIVIANA';
      datosNeXO['f01_ges_vig_pod']                 =  $scope.datos.MO_GES_P;
      datosNeXO['f01_num_not']                     =  $scope.datos.MO_NUM_NOT;
      //PARA LA 70
      datosNeXO['INT_AC_DISTRITO']            = datosOfi.xofi_datos.RO_DIS_ID_OF;
      datosNeXO['INT_AC_ID_ZONA']             = datosOfi.xofi_datos.RO_ZONA_OF;
      datosNeXO['INT_ID_ZONA']                = datosOfi.xofi_datos.RO_ZONA_OF;
      //datosNeXO['INT_TIPO_LICENCIA_DESCRIPCION']   =  paramForm.INT_TIPO_LICENCIA_DESCRIPCION;
      //datosNeXO['INT_CAT_AGRUPADA_DESCRIPCION']    =  paramForm.INT_CAT_AGRUPADA_DESCRIPCION;
      datosNeXO['INT_TIP_VIA']                     = datosOfi.xofi_datos.RO_TIPO_VIA_SUC;
      //datosNeXO['INT_AC_latitud']               =  paramForm.INT_AC_latitud;
      //datosNeXO['INT_AC_longitud']              =  paramForm.INT_AC_longitud;
      //datosNeXO['INT_AC_direccionImagenmapa']   =  paramForm.INT_AC_direccionImagenmapa;
      datosNeXO['INT_RL_NUM_DOCUMENTO'] = $scope.datos.MO_CI_RLJ;
      datosNeXO['INT_RL_FECHA_NAC'] = $scope.datos.MO_FEC_NAC_RLJ;
      datosNeXO['INT_ZONA_DESC'] = datosOfi.xofi_datos.RO_ZONA_OF_VALUE;
      datosNeXO['f01_macro_des']= datosOfi.xofi_datos.MO_MAC_ID_OF_VALUE;
      //datosNeXO['f01_requisitos_actividad_economica'] =  paramForm.f01_requisitos_actividad_economica;
      datosNeXO['rdTipoTramite'] = "RENOVACION";
      datosNeXO['f01_actividad_principal_array'] = "";
      //datosNeXO['declaracion_jurada']               =   $rootScope.decJuradaNatural;
      //datosNeXO['f01_gestiones_deudas'] = $scope.listDeudas;
      //datosNeXO['f01_total_deudas'] = $scope.totalD;
      //datosNeXO['pago_adel'] = $scope.pago_adelantado;
      //datosNeXO['nro_ges'] =  paramForm.nro_ges;datosNeXO['f01_actividadesSecundarias'] = '';
      datosNeXO['File_Adjunto'] =  [
        {
          "url": datosOfi.xofi_datos.RO_CROQUIS_OFI,
          "campo": "Mapa de la Ubicacion",
          "nombre": "Mapa de la Ubicacion"
        },
        {
          "url": $scope.datos.MO_DIRC_RES,
          "campo": "Resolución Administrativa",
          "nombre": "Resolución Administrativa"
        },

      ];
      //datosNeXO['FILE_FOTOCOPIA_CI'] = paramForm.FILE_FOTOCOPIA_CI;
      //datosNeXO['FILE_FOTOCOPIA_CI_R'] = paramForm.FILE_FOTOCOPIA_CI_R;
      //datosNeXO['f01_croquis_ae_j'] = $scope.datos.ARCHIVOS_MULTIPLES_MAPA[0].nombre_archivo;
      /*REQUISITOSDELAACTIVIDADECONOMICA*/
      //datosNeXO['Licenmul_grilla'] = paramForm.Licenmul_grilla;
      datosNeXO['f01_tip_act']                    =   datosOfi.xofi_datos.RO_TIP_ACT;
      datosNeXO['f01_actividad_desarrollada'] = "SERVICIO DE RADIOTAXIS";
      datosNeXO['f01_idcat_multi_principal'] = '';
      datosNeXO['f01_descat_multi_principal'] = '';
      datosNeXO['f01_act_principal'] = '';
      datosNeXO['f01_act_principal2'] = '';
      datosNeXO['f01_categoria_descrip']      =  "SERVICIO DE RADIOTAXIS";
      datosNeXO['f01_categoria_descrip2']      = "SERVICIO DE RADIOTAXIS";
      datosNeXO['f01_categoria']      = 2798
      datosNeXO['f01_categoria_agrupada_descripcion'] = "SERVICIO DE RADIOTAXIS";
      datosNeXO['f01_categoria_agrupada_descrip'] = "SERVICIOS PROFESIONALES U OFICIOS Y OTROS EN GENERAL";
      datosNeXO['f01_categoria_agrupada_dem'] = "SERVICIOS PROFESIONALES U OFICIOS Y OTROS EN GENERAL";
      datosNeXO['f01_actividad_desarrollada'] = "SERVICIO DE RADIOTAXIS";
      datosNeXO['sw_publicidad']      =  "SP" ;
      datosNeXO['swpublicidad']      =  "SP" ;
      datosNeXO['f01_zona_segura'] = '';
      datosNeXO['licencia_multiple']="";
      datosNeXO['publicidadAE']                 = datosOfi.resultadoAe.datosVIAE;
      console.log(datosOfi.resultadoAe.datosVIAE,2345);
      datosNeXO['publicidad_grilla']          = datosOfi.resultadoAe.datosVIAE;
      datosNeXO['g_tipo']                     = "AE-LINEA";
      datosNeXO['g_fecha']                    = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
      datosNeXO['g_origen']                   = "MOV LOTUS";
      datosNeXO['INT_PMC']                    = $scope.datos.dataGenesisCiudadano[0].padron;
      datosNeXO['INT_ID_CONTRIBUYENTE']       = $scope.datos.dataGenesisCiudadano[0].idContribuyente;
      datosNeXO['INT_AE_IDCODIGO_ZONA']       = datosOfi.xofi_revision.codZona;
      datosNeXO['INT_ID_ACTIVIDAD_ECONOMICA'] = datosOfi.IdActividad;
      datosNeXO['f01_nro_actividad']            = datosOfi.Nro;
      console.log('datosNeXO',datosNeXO)
      var tramite = new crear_Tramite_lotus();
      tramite.proid = 47;
      tramite.actid = 360;
      tramite.usr_id = 0;        
      tramite.datos = JSON.stringify(datosNeXO);
      tramite.procodigo = 'AER-LICEN';
      tramite.macro_id = 0;
      tramite.nodo_id = 672;
      tramite.ws_id = 24;
      tramite.tram_lotus(function(results){ 
        results = JSON.parse(results);
        if (results !=null) {
          results = results.success.data[0].casonro;
          swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + results + "\n");
          $.unblockUI();
        }else{
          alertify.error("Señor(a) Ciudadano(a) ocurrio un error al enviar su Tramité.", );
          $.unblockUI();
        }
      })
    },300);           
  };
}