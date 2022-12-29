function administracionOperadoresController ($scope, $rootScope, $routeParams, $location,$window, $http, Data, sessionService,CONFIG, LogGuardarInfo, $sce, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
  
  var sIdCiudadano= sessionService.get('IDSOLICITANTE');
  $scope.tablaTramites        =   {};
  $scope.tramitesUsuario      =   [];
  $scope.operadoresUsuario = [];
  $scope.mostrar_form_ope = false;
  $scope.lista = false;
  $scope.registro = false;
  $scope.registrorenovacion = false;
  $scope.listarenovacion = false;
  $scope.datosOfiR = {};
  $scope.tramite_datos = {};
  $scope.datos = {};
  $scope.datosd = {};
  $scope.objVehiculos = [];
  $scope.objConductores = [];
  $scope.desabilita = false;
  $scope.vehreg = 0;
  $scope.conreg = 0;
  var valPlaca = 0;
  $scope.fechaAct = new Date();
  $scope.idRenovacion = 38;
  $scope.idRegistro = 37;
  $scope.nroTramite = '';
  $scope.datosMostrar = 0;
  $scope.renoMostrar = '00';
  $scope.oidCiu = sessionService.get('IDSOLICITANTE');
  $scope.datos.RO_TIP_OPE_A =[{"tipoOp":"Sindicato"},{"tipoOp":"Asociación"},{"tipoOp":"Cooperativa"},{"tipoOp":"Empresa"}];
  $scope.tipo_persona='';
  $scope.objOficinas = [];
  $scope.datosAdj = [];
  $scope.aMacrodistritos = {};
  $scope.publicid = [];
  $scope.publi=[];
  var idTram = 84;
  $scope.ope = {};
  $scope.opetramite = '00';
  $scope.opetramite_mensaje = '';
  $scope.ope.xope_id = 0;
  $scope.documentosarc = new Array();

  $scope.inicio = function () {
    $scope.nroTramite = '';
    $scope.seleccionarTramite();
    $scope.getComboMarcaMovilidad();
    $scope.macrodistritos();
    $scope.lssubcategoria();
    var fecha= new Date();
    var mes=fecha.getMonth()+1;
    if(mes.toString().length==1)
        mes='0'+mes;
    var dia=fecha.getDate();
    if(dia.toString().length==1)
        dia='0'+dia;
    $scope.fechactual=fecha.getFullYear() + "-" + mes + "-" + dia ;
    $scope.nombreArchivo = "reporteVehiculos_" + $scope.fechactual; 
    $scope.nombreConductores = "reporteConductores_" + $scope.fechactual; 
  };

  $scope.seleccionarTramite = function(){
    $scope.desabilita = false;
    $scope.mostrar_form_ope = true;
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
      $scope.lista = true;
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

  $scope.seleccionarOperador = function(ope){
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
      /*var act = new actualizaEstadoVehCond();
      act.ope_id = ope.xope_id;
      act.actualiza_veh_cond(function(results){
        console.log(results)
      });*/
      $scope.tramiteSeleccionadoope = ope.xope_id;
      $scope.operador = ope;
      $scope.registro = true;
      $scope.registrorenovacion = false;
      $scope.listarenovacion = false;
      $scope.datosOfiR = ope.oficinas; 
      $scope.datos.ope_id = ope.xope_id;
      $scope.datos.den_ope = ope.xope_denominacion;
      $scope.datos.tip_ope = ope.xope_tipo_operador;
      $scope.datos.RO_MOD_VALUE = ope.xope_datos.RO_MOD_VALUE;
      $scope.datos.RO_DEN = ope.xope_denominacion; 
      $scope.datos.RO_MOD = ope.xope_datos.RO_MOD; 
      $scope.listaVeh();
      $scope.listaCond();
      $scope.getComboClaseMovilidad();
      $.unblockUI();
    },200);
  }

  $scope.seleccionarOperadorrenovar = function(ope_data){
    if(ope_data.estadores == 'VIGENTE'){
      $scope.renoMostrar = '00';
    }else{
      $scope.renoMostrar = '11';
    }
    if(typeof(ope_data.xope_datos.RO_TRAMITE)    == 'undefined' || ope_data.xope_datos.RO_TRAMITE == null){
      if(ope_data.estadores == 'VENCIDO' || ope_data.estadores == 'VENCIDO '){
        $scope.renoMostrar = '00';
        $scope.opetramite = '00';
        $scope.opetramite_mensaje = '';
      }
    }else{
      if(ope_data.xope_datos.RO_ESTADO_TRAMITE=='EN PROCESO'){
        $scope.renoMostrar = '11';
        $scope.opetramite = '00';
        $scope.opetramite_mensaje = ope_data.xope_datos.RO_TRAMITE+' > '+ ope_data.xope_datos.RO_ESTADO_TRAMITE;
      }else{
        if(ope_data.xope_datos.RO_ESTADO_TRAMITE=='RECHAZADO'){
            $scope.renoMostrar = '00';
            $scope.opetramite = '00';
            $scope.opetramite_mensaje = ope_data.xope_datos.RO_TRAMITE+' > '+ope_data.xope_datos.RO_ESTADO_TRAMITE;
          }else{
            if(ope_data.estadores == 'VENCIDO' || ope_data.estadores == 'VENCIDO '){
              $scope.renoMostrar = '00';
              $scope.opetramite = '00';
            }
          $scope.opetramite_mensaje = '';
        }
      }
    }
    
    $scope.tramiteSeleccionadoope = ope_data.xope_id;
    $scope.registrorenovacion = false;
    $scope.listarenovacion = true;
    $scope.registro = false;
    $scope.datosOfiR = ope_data.oficinas; 
    $scope.ope = ope_data;
    $scope.tramitesCiudadano();
    $scope.recuperandoDatosGenesis(ope_data);
    $scope.listarAE();
    
    
  }

  $scope.tramitesCiudadano = function(){
    $scope.opetramite = '00';
    var tramites  = new listaTramitesMov();
    tramites.idCiudadano = sIdCiudadano;
    tramites.tra_ser = idTram;
    tramites.spbusquedaformulariomovilidad(function(data){
      var data = JSON.parse(data).success;
      $scope.tramites = data;
      angular.forEach(data,function(val, index){
        // opetramite
        if(val['form_contenido']){
          data[index].datos = val['form_contenido'];
          data[index].operador = JSON.parse(val['form_contenido']).xope_denominacion;
          data[index].ope_id = JSON.parse(val['form_contenido']).xope_id;
        }
        if($scope.ope.xope_id == JSON.parse(val['form_contenido']).xope_id){
          if(val['venviado'] == 'NO'){
            console.log(val);
            $scope.opetramite = '11';
          }else{
            console.log(val);
            console.log(JSON.parse(val['form_contenido']));
            console.log(val['vcodigo']);
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++");
          }
        }
      });

      console.log("------------------------------------------");
      
      $scope.tramitesUsuario = data;
      $scope.tablaTramites.reload();
    })
  };

  //*******************ACTIVIDADES ECONOMICAS************************
  $scope.recuperandoDatosGenesis = function(ope){
    var tipoContribuyente  = sessionService.get('TIPO_PERSONA');
    var ciDocumento        = '';//sessionService.get('CICIUDADANO'));
    var nitDocumento       = '';//sessionService.get('CICIUDADANO'));
    var sAccion            = '';//sessionService.get('CICIUDADANO'));
    var cicomplem          = '';
    var complento          = '-';
    $scope.tipo_persona = ope.yrepr_tip_per;
    if(ope.yrepr_tip_per == 'NATURAL'){
        ciDocumento          =   ope.yrepr_datos.RO_CI_RL;
        sAccion              =  'C01';
    }else if(ope.yrepr_tip_per == 'JURIDICO'){
        nitDocumento         =   ope.yrepr_datos.RO_NIT;
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
    console.log("conGenesis");
    console.log(conGenesis);
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

  $scope.Operadorrenovar = function(ope){
    ope = JSON.parse(ope);
    $scope.registrorenovacion = true;
    $scope.registro = false;
    $scope.datosrepresentante = ope.yrepr_datos;
    $scope.datos.id_ope = ope.xope_id;
    $scope.datos.oficinas = ope.oficinas;
    $scope.datos.oficina_data = ope.oficina_data;
    $scope.datos.ope_requisitos = ope.yope_requisitos;
    $scope.datosoperador = ope;
    if(ope.yope_requisitos != undefined){
        $scope.fileArRequisitos =  ope.yope_requisitos;
    }else{
        $scope.fileArRequisitos = {};
    }
    if(ope.hab_deno != undefined){
      $scope.datos.hab_deno = ope.hab_deno;
      document.getElementById('RO_DEN').disabled=false;
      denominacion = ope.xope_denominacion;
    }else{
      $scope.datos.hab_deno = false;
      document.getElementById('RO_DEN').disabled=true;
    }
    $scope.tipo_persona = ope.yrepr_tip_per;
    if(ope.yrepr_tip_per == 'NATURAL'){
        $scope.datos.RO_NOM_RL = ope.yrepr_datos.RO_NOM_RL;
        $scope.datos.RO_PAT_RL = ope.yrepr_datos.RO_PAT_RL;
        $scope.datos.RO_MAT_RL = ope.yrepr_datos.RO_MAT_RL;
        $scope.datos.RO_CAS_RL = ope.yrepr_datos.RO_CAS_RL;
        $scope.datos.RO_CI_RL = ope.yrepr_datos.RO_CI_RL;
        $scope.datos.RO_EXP_RL = ope.yrepr_datos.RO_EXP_RL;
        $scope.datos.RO_CEL_RL = ope.yrepr_datos.RO_CEL_RL;
        $scope.datos.RO_CORR_RL = ope.yrepr_datos.RO_CORR_RL;
        $scope.datos.RO_ZONA_RL = ope.yrepr_datos.RO_ZONA_RL;
        $scope.datos.RO_TIP_VIA_RL = ope.yrepr_datos.RO_TIP_VIA_RL;
        $scope.datos.RO_CALL_RL = ope.yrepr_datos.RO_CALL_RL;
        $scope.datos.RO_NRO_RL = ope.yrepr_datos.RO_NRO_RL;
        $scope.datos.oidCiudadano = ope.yrepr_uidciudadano;
    }else{
        $scope.datos.oidCiudadano = ope.yrepr_uidciudadano;
        $scope.datos.RO_NIT = ope.yrepr_datos.RO_NIT ;
        $scope.datos.RO_RZ = ope.yrepr_datos.RO_RZ ;
        $scope.datos.RO_POD_RL = ope.yrepr_datos.RO_POD_RL ;
        $scope.datos.RO_NOT_RL = ope.yrepr_datos.RO_NOT_RL ;
        $scope.datos.RO_ZON_OF = ope.yrepr_datos.RO_ZON_OF ;
        $scope.datos.RO_TIP_VIA_OF = ope.yrepr_datos.RO_TIP_VIA_OF ;
        $scope.datos.RO_NUM_DOM_OF = ope.yrepr_datos.RO_NUM_DOM_OF ;
        // REPRESENTANTE LEGAL 
        $scope.datos.RO_NOM_RLJ=ope.yrepr_datos.RO_NOM_RLJ;
        $scope.datos.RO_PAT_RLJ=ope.yrepr_datos.RO_PAT_RLJ;
        $scope.datos.RO_MAT_RLJ=ope.yrepr_datos.RO_MAT_RLJ;
        $scope.datos.RO_CI_RLJ = ope.yrepr_datos.RO_CI_RLJ;
        $scope.datos.RO_EXP_RLJ = ope.yrepr_datos.RO_EXP_RLJ;
        $scope.datos.RO_CEL_RLJ = ope.yrepr_datos.RO_CEL_RLJ;
        $scope.datos.RO_TEL_RLJ = ope.yrepr_datos.RO_TEL_RLJ;
    }
    sw = 0;
    $scope.i = 1;
    $scope.swMostrar = 0;
    $scope.mostrar_form_ope = true;
    $scope.mostrar_lst_operador = false;
    $scope.desabilita = false;
    $scope.desabilitaCon = true;
    $scope.desabilitaVeh = true;
    $scope.botonesGuardar = false;
    
    $scope.datos.RO_TIP_SOL = 1;
    $scope.datosMostrar = 1;
    
    $scope.datos.RO_TIP_OPE = ope.xope_tipo_operador;
    $scope.datos.RO_DEN = ope.xope_denominacion;
    
    $scope.datos.RO_NIT_OPE = ope.yope_nit;
    $scope.datos.RO_MOD = ope.xope_datos.RO_MOD_VALUE;
    $scope.datos.RO_TIP_SER = ope.xope_datos.RO_TIP_SER_VALUE;
    $scope.datos.RO_SER_SPU = ope.xope_datos.RO_SER_SPU_VALUE;
    $scope.datos.RO_SER_SPR = ope.xope_datos.RO_SER_SPR_VALUE;
    $scope.datos.RO_SER_EMC = ope.xope_datos.RO_SER_EMC_VALUE;
    $scope.datos.RO_FRE_RAD = ope.xope_datos.RO_FRE_RAD;
    $scope.datos.RO_FRE = ope.xope_datos.RO_FRE;
    $scope.datos.RO_TIP_TAX = ope.xope_datos.RO_TIP_TAX_VALUE;
    $scope.datos.RO_PLA_TEC = ope.xope_datos.RO_PLA_TEC;
    $scope.datos.RO_PLA = ope.xope_datos.RO_PLA;
    $scope.datos.RO_EN_VIA = ope.xope_datos.RO_EN_VIA;
    $scope.datos.RO_TIP_TAX = ope.xope_datos.RO_TIP_TAX_VALUE;
    $scope.datos.RO_CUM = ope.xope_datos.RO_CUM;
    $scope.datos.RO_FEC_NOT = ope.xope_datos.RO_FEC_NOT;
    $scope.datos.RO_OBS_NO = ope.xope_datos.RO_OBS_NO;
    $scope.datos.RO_INF_F = ope.xope_datos.RO_INF_F;
    $scope.datos.RO_FEC_AL = ope.xope_datos.RO_FEC_AL;
    $scope.datos.txt_f01_upload_TEC_LEG = ope.xope_datos.txt_f01_upload_TEC_LEG;
    $scope.datos.f01_upload_TEC_LEG_url = ope.xope_datos.f01_upload_TEC_LEG_url;
    
    $scope.datos.RO_NRO_INFORME = ope.xope_datos.RO_NRO_INFORME;
    $scope.datos.RO_FEC_INFORME = ope.xope_datos.RO_FEC_INFORME;
    $scope.datos.txt_f01_upload_TEC_INS = ope.xope_datos.txt_f01_upload_TEC_INS;
    $scope.datos.f01_upload_TEC_INS_url = ope.xope_datos.f01_upload_TEC_INS_url;
  }

  $scope.volver = function (){
    if($scope.tipo_persona == 'NATURAL' && $scope.datos.RO_MOD != 1){
      $scope.i = $scope.i - 2;
    }else{
      if($scope.datos.RO_MOD==1){
        $scope.i = $scope.i - 1;
      }else{
        if($scope.i == 3){
          $scope.i = $scope.i - 2;
        }else{
          $scope.i = $scope.i - 1;
        }
      }
    }
    sw = 0;
    $scope.botonesGuardar = false;
    document.getElementById('gu').disabled=true;
    $scope.datosMostrar = $scope.i;
  }

  $scope.validaOperador = function(){
    if(($scope.datos.RO_TIP_OPE != '' && $scope.datos.RO_TIP_OPE != undefined) && ($scope.datos.RO_DEN != '' && $scope.datos.RO_DEN != undefined) && ($scope.datos.RO_MOD != '' && $scope.datos.RO_MOD!= undefined)){
      //$scope.guardar_tramite($scope.datos);
      $scope.siguiente();
      $scope.ver();
      $scope.datos.rdTipoTramite1 = 'CON PUBLICIDAD';
      $scope.publicidad = true;
      $scope.botonn="new";
      $scope.open_map_reg_ope();
      $scope.objOficinas = $scope.datos.oficina_data;
      for (var i = 0; i < $scope.objOficinas.length; i++) {
          $scope.datos['RO_INS_CONC'+$scope.objOficinas[i].ofi_id.toString()] = $scope.objOficinas[i].ofi_revision.cumpleIns;
          $scope.datos['RO_INS_REC_HAB'+$scope.objOficinas[i].ofi_id.toString()] = $scope.objOficinas[i].ofi_revision.cumpleIns;
      }
      $scope.tablaOficinas.reload();
      
    }else{
      swal("", "Datos obligatorios, verifique los datos del formulario", "warning");
    }
  }

  $scope.siguiente = function(){
    $scope.datos.tipo_persona = $scope.tipo_persona;
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
      var razonSocial = $scope.datos.RO_RZ;
      var nit = $scope.datos.RO_NIT;
      var ci = nit;
      var datosRepresentante = {
        'RO_NIT':$scope.datos.RO_NIT,
        'RO_RZ':$scope.datos.RO_RZ,
        'RO_POD_RL':$scope.datos.RO_POD_RL,
        'RO_NOT_RL':$scope.datos.RO_NOT_RL,
        'RO_ZON_OF':$scope.datos.RO_ZON_OF,
        'RO_TIP_VIA_OF':$scope.datos.RO_TIP_VIA_OF,
        'RO_NON_VIA_RL':$scope.datos.RO_NON_VIA_RL,        
        'RO_NUM_DOM_OF':$scope.datos.RO_NUM_DOM_OF,
        'RO_NOM_RLJ':$scope.datos.RO_NOM_RL,
        'RO_PAT_RLJ':$scope.datos.RO_PAT_RL,
        'RO_MAT_RLJ':$scope.datos.RO_MAT_RL,
        'RO_CI_RLJ':$scope.datos.RO_CI_RL,
        'RO_EXP_RLJ':$scope.datos.RO_EXP_RL,
        'RO_CEL_RLJ':$scope.datos.RO_CEL_RL
      }
    }
  }

  $scope.ver = function(){ 
    if($scope.tipo_persona == 'NATURAL' && $scope.datos.RO_MOD!=1){
      $scope.i = $scope.i + 2;
      $scope.getComboClaseMovilidad();
      $("#valida11").hide();
      $("#validax").hide();
    }else{
      if($scope.datos.RO_MOD==1){
        $scope.i = $scope.i + 1;
      }else{
        if($scope.i == 1){
          $scope.i = $scope.i + 2;
        }else{
          $scope.i = $scope.i + 1;
        }
      }
    }
    //document.getElementById('gu').disabled=false;
    $scope.datosMostrar = $scope.i; 
    $scope.datosOperador = {'id_ope':$scope.datos.id_ope};
  }

  $scope.validaOficinas = function(){
    if($scope.objOficinas.length > 0){
        $scope.lstRequisitosOpe();
        $scope.ver();
    }else{
        swal("", "Debe registrar por lo menos una oficina", "warning"); 
    }
  }
  //******************Requisitos***********************
  $scope.lstRequisitosOpe = function (){
    var req = new listaRequisitos();
    req.tipo =  'RADIO TAXI';//$scope.datos.RO_MOD;
    req.lstRequisitos(function(data){
    $scope.requisitosAdj = JSON.parse(data).success.data;
    var datoObjectFinal = [];
    var k=0;
    console.log("requisistos");
    for(j=0; j<$scope.requisitosAdj.length; j++){
        //console.log($scope.requisitosAdj[j].req_ope_natural,$scope.datos.RO_TIP_OPE);
        if($scope.requisitosAdj[j].req_ope_natural==$scope.datos.RO_TIP_OPE || $scope.requisitosAdj[j].req_ope_sindicato==$scope.datos.RO_TIP_OPE || 
        $scope.requisitosAdj[j].req_ope_empresa==$scope.datos.RO_TIP_OPE || $scope.requisitosAdj[j].req_ope_cooperativa==$scope.datos.RO_TIP_OPE ||
        $scope.requisitosAdj[j].req_ope_asociacion==$scope.datos.RO_TIP_OPE){

        datoObject = new Object();
        datoObject.resid = $scope.requisitosAdj[j].req_id;
        datoObject.resvalor = $scope.requisitosAdj[j].req_descripcion;
        datoObjectFinal[k] = datoObject;
        k++;
        }
    }
    $scope.docArray =   datoObjectFinal;
    //console.log($scope.docArray,'docarray');
    $scope.datosAdj = [];
    setTimeout(function(){
        iniciarLoadFyle();
    }, 1000);
    })
  }

  $scope.lstOficinasDatos = function (){
    var ofi = new listaOficinas(); 
    ofi.idope = $scope.datosOperador.id_ope;
    ofi.lstOficinas(function(data){
        data = JSON.parse(data).success.data;
        $scope.objOficinas = data;
        for (var i = 0; i < $scope.objOficinas.length; i++) {
            $scope.datos['RO_INS_CONC'+$scope.objOficinas[i].ofi_id.toString()] = $scope.objOficinas[i].ofi_revision.cumpleIns;
            $scope.datos['RO_INS_REC_HAB'+$scope.objOficinas[i].ofi_id.toString()] = $scope.objOficinas[i].ofi_revision.cumpleIns;
        }
        $scope.tablaOficinas.reload();
        console.log("..........  lista de oficinas data .................... ");
        console.log($scope.objOficinas);
        console.log("..........  end lista de oficinas .................... ");
    })
  }

  $scope.tablaOficinas = new ngTableParams({
    page: 1,
    count: 10,
    filter: {},
    sorting: {}
    }, {
    total: $scope.objOficinas.length,
    getData: function($defer, params) {
        var filteredData = params.filter() ?
        $filter('filter')($scope.objOficinas, params.filter()) :
        $scope.objOficinas;
        var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.$scope.objOficinas;
        params.total(orderedData.length);
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.buscaOficinas = function(){
    var ofic = new buscaOficinas();
    ofic.idope = $scope.datosOperador.id_ope;
    ofic.buscaOficinasOperador(function(results){
      $scope.datosOfiR = JSON.parse(results).success.data;
    })
  }
  $scope.capturarImagen = function(ubi){
    $scope.oidCiudadano = $scope.datos.oidCiudadano;// sessionService.get('IDSOLICITANTE');
    var latitud = $rootScope.laaa;
    var longitud = $rootScope.looo;
    $scope.oidCiudadano = $scope.datos.oidCiudadano; // sessionService.get('IDSOLICITANTE');
    
    $scope.url = "RC_CLI/" + $scope.oidCiudadano ;
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
    
    $scope.mapa.once('postcompose', function(event) {
    var canvas = event.context.canvas;
    if (navigator.msSaveBlob) {
        //navigator.msSaveBlob(canvas.msToBlob(), 'mapa.jpg');
    }
    else {
        canvas.toBlob(function(blob) {
            var data_mapa1 = canvas.toDataURL();
            var d = data_mapa1;
            data_mapa1 = d.replace("data:image/png;base64,", "");
            $scope.Imagenb = data_mapa1;
            $scope.subirImgBase64($scope.Imagenb, $scope.url, $scope.archivo1);
        });
    }
    });
    $scope.mapa.renderSync();
  }
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
    $scope.oidCiudadano = $scope.datos.oidCiudadano;//  sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
    var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" ;
    blob.name = nombre;
    var resFormulario = {
        container:url,
        file_path:nombre,
        body:blob
    };
    fileUpload.uploadFileToUrl(blob, uploadUrl);
  };

  $scope.adiModOficinas = function(id,opc){
    console.log("------modificar registro de oficina--------");
    console.log(id);
    console.log(opc);
    console.log("-------------------------------------------");
    console.log("$scope.datos");
    console.log($scope.datos);
    $.blockUI();
    //$scope.buscaOficinas();
    var swOfi = 0;
    for(var i=0;i<$scope.datosOfiR.length;i++){
        if($scope.datosOfiR[i].suc == 'MA' && $scope.datos.RO_TIP_ACT == 'MA'){
            swOfi = swOfi + 1;
        }
    }
    console.log(swOfi,'swOfi');
    if(opc == 'A' && swOfi == 1){
        swOfi = 0;
    }
    if(swOfi == 0){
        if($scope.datos.RO_TIP_ACT !='' && $scope.datos.RO_TIP_ACT != undefined &&  $scope.datos.RO_DEN !='' &&  $scope.datos.RO_DEN!=undefined && $scope.datos.RO_MAC_OF!= '' && $scope.datos.RO_MAC_OF!=undefined &&
        $scope.datos.RO_ZONA_OF_VALUE !='' && $scope.datos.RO_ZONA_OF_VALUE!=undefined && $scope.datos.RO_TIPO_VIA_SUC!='' && $scope.datos.RO_TIPO_VIA_SUC!= undefined && $scope.datos.RO_NOM_VIA_SUC!='' &&  $scope.datos.RO_NOM_VIA_SUC!=undefined
        && $scope.datos.RO_ENT_CALL_SUC !='' && $scope.datos.RO_ENT_CALL_SUC !=undefined && $scope.datos.RO_NRO_SUC!='' && $scope.datos.RO_NRO_SUC!=undefined
        && $scope.datos.RO_SUP_SUC !='' && $scope.datos.RO_SUP_SUC != undefined && $scope.datos.RO_EST_SUC!='' && $scope.datos.RO_EST_SUC!=undefined 
        && $scope.datos.RO_TEL_SUC!='' && $scope.datos.RO_TEL_SUC!=undefined && $scope.datos.RO_CAN_VEH_SUC!='' 
        && $scope.datos.RO_DIR_GAR_SUC!='' && $scope.datos.RO_DIR_GAR_SUC!=undefined && $scope.datos.RO_PAR_NRO_SUC!='' && $scope.datos.RO_PAR_NRO_SUC!=undefined
        && $scope.datos.RO_ESP_DIS!='' && $scope.datos.RO_ESP_DIS!=undefined && $scope.datos.RO_VIA_PAR_MOM!=''&& $scope.datos.RO_VIA_PAR_MOM!=undefined
        && $scope.datos.RO_ENT_CALL_PM!='' && $scope.datos.RO_ENT_CALL_PM!=undefined){
            //$scope.capturarImagen($scope.datos.RO_MAC_OF_VALUE);
            //console.log("$scope.aMacrodistritos ********************************************");
            //console.log($scope.aMacrodistritos);
            for (var i = 0; i<$scope.aMacrodistritos.length ; i++) {
                if($scope.aMacrodistritos[i].mcdstt_id==$scope.datos.RO_MAC_OF){
                    $scope.datos.RO_MAC_OF_VALUE = $scope.aMacrodistritos[i].mcdstt_macrodistrito;
                }
            }
            //console.log("*****************************************************   $scope.datos.RO_MAC_OF");
            //console.log($scope.datos.RO_MAC_OF);
            $scope.distritoZonasope($scope.datos.RO_MAC_OF);
            //console.log("$scope.aDistritoZona *********************************");
            //console.log($scope.aDistritoZona);
            for (var i = 0; i<$scope.aDistritoZona.length ; i++) {
                if($scope.aDistritoZona[i].dist_nombre == $scope.datos.RO_ZONA_OF_VALUE){
                    $scope.datos.RO_ZONA_OF = $scope.aDistritoZona[i].dist_id;
                    $scope.datos.RO_DIS_ID_OF = $scope.aDistritoZona[i].dist_dstt_id;
                }
            }
            var idOpe = $scope.datosOperador.id_ope;
            var macro   = $scope.datos.RO_MAC_OF_VALUE;
            var tipoAct = $scope.datos.RO_TIP_ACT;
            if(tipoAct == 'MA'){
                $scope.datos.RO_TIP_ACT_SUC = 'MATRIZ';
                var denominacion = $scope.datos.RO_DEN;
            }else{
                $scope.datos.RO_TIP_ACT_SUC = 'SUCURSAL';
                var denominacion = $scope.datos.RO_DEN+' Suc.';
            }
            var datosOf = {
                "RO_TIP_ACT" : tipoAct,
                "RO_TIP_ACT_SUC" : $scope.datos.RO_TIP_ACT_SUC,
                "RO_MAC_OF" : $scope.datos.RO_MAC_OF,
                "RO_MAC_OF_VALUE" : $scope.datos.RO_MAC_OF_VALUE,
                "RO_DIS_ID_OF" : $scope.datos.RO_DIS_ID_OF,
                "RO_ZONA_OF" : $scope.datos.RO_ZONA_OF,
                "RO_ZONA_OF_VALUE" : $scope.datos.RO_ZONA_OF_VALUE,
                "RO_TIPO_VIA_SUC" : $scope.datos.RO_TIPO_VIA_SUC,
                "RO_NOM_VIA_SUC" : $scope.datos.RO_NOM_VIA_SUC,
                "RO_ENT_CALL_SUC" : $scope.datos.RO_ENT_CALL_SUC,
                "RO_NRO_SUC" : $scope.datos.RO_NRO_SUC,
                "RO_SUP_SUC" : $scope.datos.RO_SUP_SUC,
                "RO_FAC_ELE" : $scope.datos.RO_FAC_ELE,
                "RO_EST_SUC" : $scope.datos.RO_EST_SUC,
                "RO_TEL_SUC" : $scope.datos.RO_TEL_SUC,
                "RO_CAN_VEH_SUC" : $scope.datos.RO_CAN_VEH_SUC,
                "RO_DIR_GAR_SUC" : $scope.datos.RO_DIR_GAR_SUC,
                "RO_PAR_NRO_SUC" : $scope.datos.RO_PAR_NRO_SUC,
                "RO_ESP_DIS" : $scope.datos.RO_ESP_DIS,
                "RO_VIA_PAR_MOM" : $scope.datos.RO_VIA_PAR_MOM,
                "RO_ENT_CALL_PM" : $scope.datos.RO_ENT_CALL_PM,
                "RO_DEM_SUC" : denominacion,
                "RO_VIAE" : $scope.datos.rdTipoTramite1,
                "RO_COD_ZONA_TRIB" : $scope.datos.codigo_zona_tributaria,
                "RO_LATITUD" : $scope.datos.latitud,
                "RO_LONGITUD" : $scope.datos.longitud,
                "RO_CROQUIS_OFI" : $scope.datos.INT_AC_direccionImagenmapa     
            };
            if($scope.datos.rdTipoTramite1 == 'CON PUBLICIDAD'){
                var viae = $scope.publicid;
            }else{
                var viae = [];
            }
            if($scope.datos.RO_CAN_VEH_SUC == undefined ){
                swal("", "La cantidad de vehiculos debe ser mayor a 20", "warning"); 
            }else{
                //console.log("------------------------");
                //console.log($scope.datos.RO_MOD);
                //console.log("$scope.publicid");
                //console.log($scope.publicid);
                //console.log("viae");
                //console.log(viae);
                //console.log("viae.length");
                //console.log(viae.length);
                if($scope.datos.RO_MOD == 1 && viae.length != 0){
                    var swL = 0;
                    for(var i=0; i<$scope.objOficinas.length ; i++){
                        if($scope.datos.RO_MAC_OF_VALUE == $scope.objOficinas[i].ofi_datos.RO_MAC_OF_VALUE){
                            swL = swL + 1;
                        }
                    }
                    if(opc == 'A' && swL == 1){
                        swL = 0;
                    }
                    if(swL == 0){
                        //datosOf = JSON.stringify(datosOf);
                        viae = JSON.stringify(viae);

                        for(var i=0; i<$scope.objOficinas.length ; i++){
                          if(id == $scope.objOficinas[i].ofi_id){
                            $scope.objOficinas[i].ofi_oficina = macro; 
                            $scope.objOficinas[i].ofi_revision = '{}'; 
                            $scope.objOficinas[i].ofi_datos =  datosOf; 
                          }
                        }
                        $scope.datos.oficina_data = $scope.objOficinas;

                        /*
                        var ofic = new ubicacion();
                        ofic.id = id; 
                        ofic.idope = idOpe;
                        ofic.oficina = macro; 
                        ofic.datos = datosOf; 
                        ofic.revision = '{}'; 
                        ofic.viae = viae; 
                        ofic.usr = sessionStorage.IDUSUARIO;
                        ofic.opcion = opc;
                        ofic.datosOficina(function(results){
                            $scope.limpiarUbi();
                            $scope.lstOficinasDatos();
                            $scope.datos.rdTipoTramite1 = 'CON PUBLICIDAD';
                            $scope.publicidad = true;
                            $scope.botonO = 'new';
                            $scope.botonc = 'c1';
                        });*/
                        $scope.limpiarUbi();
                        //$scope.lstOficinasDatos();
                        $scope.datos.rdTipoTramite1 = 'CON PUBLICIDAD';
                        $scope.publicidad = true;
                        $scope.botonO = 'new';
                        $scope.botonc = 'c1';
                    }else{
                        var mens = "Ya existe una Oficina en el Macrodistrito "+$scope.datos.RO_MAC_OF_VALUE;
                        swal("",mens, "warning");
                    }
                }else{
                    if($scope.datos.RO_MOD == 1){
                        //datosOf = JSON.stringify(datosOf);
                        viae = JSON.stringify(viae);
                        
                        for(var i=0; i<$scope.objOficinas.length ; i++){
                          if(id == $scope.objOficinas[i].ofi_id){
                            $scope.objOficinas[i].ofi_oficina = macro; 
                            $scope.objOficinas[i].ofi_revision = '{}'; 
                            $scope.objOficinas[i].ofi_datos =  datosOf; 
                          }
                        }
                        $scope.datos.oficina_data = $scope.objOficinas;
                        /*
                        var ofic = new ubicacion();
                        ofic.id = id; 
                        ofic.idope = idOpe;
                          ofic.oficina = macro; 
                          ofic.datos = datosOf; 
                          ofic.revision = '{}'; 
                          ofic.viae = viae; 
                        ofic.usr = 1; 
                        ofic.opcion = opc;
                        ofic.datosOficina(function(results){
                            $scope.limpiarUbi();
                            $scope.lstOficinasDatos();
                            $scope.datos.rdTipoTramite1 = 'CON PUBLICIDAD';
                            $scope.publicidad = true;
                            $scope.botonO = 'new';
                            $scope.botonc = 'c1';
                        })*/
                        $scope.limpiarUbi();
                        //$scope.lstOficinasDatos();
                        $scope.datos.rdTipoTramite1 = 'CON PUBLICIDAD';
                        $scope.publicidad = true;
                        $scope.botonO = 'new';
                        $scope.botonc = 'c1';
                    }else{
                        swal("", "Para el caso de Radio Taxi debe registrar por lo menos un Elemento de Identificación", "warning");  
                    }
                }
            }
        }else{
            swal("", "Datos obligatorios, verifique los datos del formulario", "warning"); 
        }
    }else{
        swal("", "Solo se puede registrar una sola matriz", "warning"); 
    }
    $.unblockUI();
  }

  $scope.limpiarUbi = function (dataOfic){
    $scope.datos.RO_TIP_ACT = '';
    $scope.datos.RO_MAC_OF_VALUE = '';
    $scope.datos.RO_ZONA_OF_VALUE = '';
    $scope.datos.RO_TIPO_VIA_SUC = '';
    $scope.datos.RO_NOM_VIA_SUC = '';
    $scope.datos.RO_ENT_CALL_SUC = '';
    $scope.datos.RO_NRO_SUC = '';
    $scope.datos.RO_SUP_SUC = '';
    $scope.datos.RO_FAC_ELE = '';
    $scope.datos.RO_CAN_VEH_SUC = '';
    $scope.datos.RO_DIR_GAR_SUC = '';
    $scope.datos.RO_PAR_NRO_SUC = '';
    $scope.datos.RO_ESP_DIS = '';
    $scope.datos.RO_VIA_PAR_MOM = '';
    $scope.datos.RO_ENT_CALL_PM = '';
    $scope.datos.RO_EST_SUC = '';
    $scope.datos.RO_TEL_SUC = '';
    $scope.datos.rdTipoTramite1 = '';
    $scope.publicidad = false;
    $scope.datos.publicidad ='';
    $scope.publicid = [];
    $scope.publi=[];
    $scope.lssubcategoria();
  }

  $scope.modificarPlubli = function(dato){
    $scope.botonn="upd";
    $scope.publi=dato;
  }
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

  $scope.guardarpublicidad = function(public2){
    console.log('public ',public2);
    if (public2.INT_SUPERFICIE) {
      if(public2.INT_NRO_CARA =='' || public2.INT_NRO_CARA == null || public2.INT_CARA =='' || public2.INT_CARA == null ||
      public2.INT_CATE =='' || public2.INT_CATE == null || public2.INT_TIPO_LETRE =='' || public2.INT_TIPO_LETRE == null ||
      public2.INT_DESC =='' || public2.INT_DESC == null || public2.INT_SUPERFICIE =='' || public2.INT_SUPERFICIE == null ) {
          alertify.warning('Llene lo campos requeridos para la VIAE  ');
      } 
      else {
          var id=0
          if($scope.datos.publicidad =='' || $scope.datos.publicidad == null || $scope.datos.publicidad =="undefined" ){
          if($scope.publicid =='' || $scope.publicid == null || $scope.publicid =="undefined" ){
              id=0;
          }
          id = $scope.publicid.length + 1;
          }else{
          id = $scope.publicid.length + 1;
          }
          if(id<21){
          total = parseFloat(public2.INT_SUPERFICIE);
          if (total < 700) {
              $scope.id = id;
              $scope.publicid.push({
                  id: id,
                  INT_NRO_CARA: public2.INT_NRO_CARA,
                  INT_CARA: public2.INT_CARA,
                  INT_CATE: public2.INT_CATE,
                  INT_TIPO_LETRE: public2.INT_TIPO_LETRE,
                  INT_DESC: public2.INT_DESC.toUpperCase(),
                  INT_ALTO: parseFloat(0).toFixed(2),
                  INT_ANCHO: parseFloat(0).toFixed(2),
                  id_cara: public2.id_cara,
                  idcarac: public2.idcarac,
                  idcate: public2.idcate,
                  INT_SUP:total.toFixed(2)
              });
              $scope.datos.publicidad = $scope.publicid;
          } else {
              alertify.warning('La superficie de la VIAE excede los estadares permitidos');
          }
          } else {
          alertify.warning('Llego al limite de registro de Publicidad');
          }
      }
    } else {
    if(public2.INT_NRO_CARA =='' || public2.INT_NRO_CARA == null || public2.INT_CARA =='' || public2.INT_CARA == null ||
    public2.INT_CATE =='' || public2.INT_CATE == null || public2.INT_TIPO_LETRE =='' || public2.INT_TIPO_LETRE == null ||
    public2.INT_DESC =='' || public2.INT_DESC == null || public2.INT_ALTO =='' || public2.INT_ALTO == null || public2.INT_ANCHO =='' || public2.INT_ANCHO == null ) {
        alertify.warning('Llene lo campos requeridos para la VIAE  ');
    } 
    else {
        var id=0;
        if($scope.datos.publicidad =='' || $scope.datos.publicidad == null || $scope.datos.publicidad =="undefined" ){
        if($scope.publicid =='' || $scope.publicid == null || $scope.publicid =="undefined" ){
            id=0;
        }
        id = $scope.publicid.length + 1;
        }else{
        id = $scope.publicid.length + 1;                   
        }
        if(id<21){
        total = parseFloat(public2.INT_ALTO) * parseFloat(public2.INT_ANCHO);
        if (total < 700) {
            $scope.publicid.push({
                id: id,
                INT_NRO_CARA: public2.INT_NRO_CARA,
                INT_CARA: public2.INT_CARA,
                INT_CATE: public2.INT_CATE,
                INT_TIPO_LETRE: public2.INT_TIPO_LETRE,
                INT_DESC: public2.INT_DESC.toUpperCase(),
                INT_ALTO: parseFloat(public2.INT_ALTO).toFixed(2),
                INT_ANCHO: parseFloat(public2.INT_ANCHO).toFixed(2),
                id_cara: public2.id_cara,
                idcarac: public2.idcarac,
                idcate: public2.idcate,
                INT_SUP:total.toFixed(2)
            });
            $scope.datos.publicidad = $scope.publicid;
        } else {
            alertify.warning('La superficie de la VIAE excede los estadares permitidos', 'error');
        }
        }
        else {
        alertify.warning('Llego al limite de registro de Publicidad', 'error'); 
        }
    }
    }
  }

  $scope.actulizarCaracteristica = function(){
    var id_cara="";
    var distNombre  = $scope.publi.INT_CARA;
    if($scope.lCaracteristica){
        angular.forEach($scope.lCaracteristica, function(value, key) {
            if(value.p_caracteristica == distNombre){
                id_cara  =   value.p_idcaracteristica;
            }
        });
    }
    $scope.publi.id_cara  =  id_cara;
  };  

  $scope.cambioToggle1 = function(dato){
    $scope.datos.publicidad ='';
    $scope.botonn="new";
    if ( dato == "CON PUBLICIDAD") {
        $scope.publicidad = true;
    } else {
        $scope.publicidad = false;
    }
  }
  $scope.sacaDesc = function(){
    var desc = $scope.publi.INT_TIPO_LETRE+' '+$scope.publi.INT_CARA;
    $scope.publi.INT_DESC = desc;
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
    $scope.lssubcategoria();
  }

  $scope.eliminarPubli = function(dato){
    $scope.publicid.splice( $scope.publicid.indexOf(dato), 1 );
    $scope.id = $scope.id - 1;  
  }
  
  $scope.lssubcategoria = function(){
    $scope.publi.INT_CATE="II Fija";
    $scope.publi.idcate=6;
    $scope.TipoLetrero = [
    {"p_idtipoletrero" : "39", "p_descripcion": "ADOSADA"},
    {"p_idtipoletrero" : "41", "p_descripcion": "MICROPERFORADA - AUTOADHESIVA"},
    {"p_idtipoletrero" : "40", "p_descripcion": "PINTADA"}];
  };

  $scope.cerrar = function(){
    $scope.limpiarUbi();
    $scope.lstOficinasDatos();
    $scope.datos.rdTipoTramite1 = 'CON PUBLICIDAD';
    $scope.publicidad = true;
    $scope.botonO = 'new';
    $scope.botonc = 'c1';
  }

  $scope.datosModOficina = function (dataOfic){
    console.log("dataOfic");
    console.log(dataOfic);
    $scope.datos.RO_TIP_ACT = dataOfic.ofi_datos.RO_TIP_ACT;
    $scope.datos.RO_MAC_OF = dataOfic.ofi_datos.RO_MAC_OF;
    $scope.datos.RO_MAC_OF_VALUE = dataOfic.ofi_datos.RO_MAC_OF_VALUE;
    $scope.datos.RO_ZONA_OF_VALUE= dataOfic.ofi_datos.RO_ZONA_OF_VALUE;
    $scope.datos.RO_TIPO_VIA_SUC = dataOfic.ofi_datos.RO_TIPO_VIA_SUC;
    $scope.datos.RO_NOM_VIA_SUC = dataOfic.ofi_datos.RO_NOM_VIA_SUC;
    $scope.datos.RO_ENT_CALL_SUC = dataOfic.ofi_datos.RO_ENT_CALL_SUC;
    $scope.datos.RO_NRO_SUC = dataOfic.ofi_datos.RO_NRO_SUC;
    $scope.datos.RO_SUP_SUC = dataOfic.ofi_datos.RO_SUP_SUC;
    $scope.datos.RO_FAC_ELE = dataOfic.ofi_datos.RO_FAC_ELE;
    $scope.datos.RO_CAN_VEH_SUC = dataOfic.ofi_datos.RO_CAN_VEH_SUC;
    $scope.datos.RO_DIR_GAR_SUC = dataOfic.ofi_datos.RO_DIR_GAR_SUC;
    $scope.datos.RO_PAR_NRO_SUC = dataOfic.ofi_datos.RO_PAR_NRO_SUC;
    $scope.datos.RO_ESP_DIS = dataOfic.ofi_datos.RO_ESP_DIS;
    $scope.datos.RO_VIA_PAR_MOM = dataOfic.ofi_datos.RO_VIA_PAR_MOM;
    $scope.datos.RO_ENT_CALL_PM = dataOfic.ofi_datos.RO_ENT_CALL_PM;
    $scope.datos.RO_TEL_SUC = dataOfic.ofi_datos.RO_TEL_SUC;
    $scope.datos.RO_EST_SUC = dataOfic.ofi_datos.RO_EST_SUC;
    $scope.datos.rdTipoTramite1 = dataOfic.ofi_datos.RO_VIAE;
    $scope.datos.latitud = dataOfic.ofi_datos.RO_LATITUD;
    $scope.datos.longitud = dataOfic.ofi_datos.RO_LONGITUD;
    if(dataOfic.ofi_datos.RO_VIAE == 'CON PUBLICIDAD'){
        $scope.publicidad = true;
    }else{
        $scope.publicidad = false;
    }
    $scope.idOfi = dataOfic.ofi_id;  
    $scope.distritoZonasope(dataOfic.ofi_datos.RO_MAC_OF); 
    if(dataOfic.ofi_viae.length != 0){
        $scope.datos.publicidad = dataOfic.ofi_viae;
    }else{
        $scope.datos.publicidad = '';
    }
    $scope.botonO = 'upd';
    $scope.botonc = 'c';
    $scope.open_map_reg_ope(dataOfic.ofi_datos.RO_LATITUD,dataOfic.ofi_datos.RO_LONGITUD);
  }

  var datos;
  $scope.open_map_reg_ope = function(latitud, longitud)
  {
      console.log("Entrando open_map_ae");
      console.log('latitud    ',latitud,'    longitud    ',longitud);
      setTimeout(function()
      {
          var style = new ol.style.Style({
              image: new ol.style.Circle({
                  radius: 7,
                  fill: new ol.style.Fill({color: 'red'})
              })
          });
          var iconStyle = new ol.style.Style({
              image: new ol.style.Circle({
                  radius: 7,
                  fill: new ol.style.Fill({
                      color: 'red'
                  })
              })
          });
          $("#mapActividad1").empty();
              //////////////////////////////////////////////////////////////////
          var epsg32719 = 'EPSG:32719';
          var epsg4326 = 'EPSG:4326';
          proj4.defs(epsg32719, '+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
          proj4.defs(epsg4326,'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
          ////////////////////////////////////////////////////////////////////////
          $scope.mapa = new ol.Map({
              layers: [
                      new ol.layer.Group({
                          title: 'Mapas Base',
                          layers: [
                              osm,
                              municipios,
                              zonas_tributarias,
                              //zonas,
                              vias,
                              vectorLayer
                          ]
                      })
                      ],
              //overlays: [featureOverlay],
              target: 'mapActividad1',
              //controls: controls,
              //interactions: mover,
              view: view
          });
          var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: 'Leyenda'});
          $scope.mapa.addControl(layerSwitcher);
          ////////////////////////////////////////////////////////////////////////
          vectorLayer.getSource().clear();
          if(isNaN(latitud) && isNaN(longitud))
          {
              console.log("no existe Lat y Lon o son undefined");
          }
          else
          {
              if(latitud === '' || longitud === '')
              {
                  console.log("lat y lon son cadena vacia");
                  mapa.getView().setCenter(ol.proj.fromLonLat([-68.133605,-16.495745]));
                  mapa.getView().setZoom(16);
              }
              else
              {
                  console.log("existe lat y lon");
                  latitud = parseFloat(latitud);
                  longitud = parseFloat(longitud);
                  var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud])));
                  feature.setStyle(style);
                  vectorSource.addFeature(feature);
                  $scope.mapa.getView().setCenter(ol.proj.fromLonLat([longitud, latitud]));
                  $scope.mapa.getView().setZoom(15);
              }  
          }
          ////////////////////////////////////////////////////////////////////////
          var n_genesis = geo_id_genesis.length;
          //console.log("n_id_gene...",n_genesis);
          //console.log("n_id_sit...",geo_id_sit.length);
          //console.log("n_id_serv...",geo_id_sit_servicio.length);
          $scope.mapa.on('click', function (evt)
          {
              vectorSource.clear();
              var coord = $scope.mapa.getCoordinateFromPixel(evt.pixel);
              var centro = ol.proj.transform(coord, 'EPSG:3857', epsg32719);
              var wkt = '';
              var centro_1 = ol.proj.transform(coord, 'EPSG:3857', epsg4326);
              var latitud = centro_1[1];
              var longitud = centro_1[0];
              wkt = "POINT(" + centro[0] + " " + centro[1] + ")";
              $scope.datos.latitud = latitud;
              $scope.datos.longitud = longitud;
              console.log("Latitud...",latitud);
              console.log("Longitud...",longitud);
              
              /////////////////////////////////////////////////////////////////////
              var feature = $scope.mapa.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                  return feature;
              });
              if (feature)
              {
                  var coord = feature.getGeometry().getCoordinates();
                  var props = feature.getProperties();
              }
              else
              {
                  //alert();
                  var url_zonas_tributarias = zonas_tributarias.getSource().getGetFeatureInfoUrl(
                      evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                          'INFO_FORMAT': 'application/json',
                          'propertyName': 'grupovalor'
                      }
                  );
                  var url_zonas = zonas.getSource().getGetFeatureInfoUrl(
                      evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                          'INFO_FORMAT': 'application/json',
                          'propertyName': 'zonaref,macrodistrito,subalcaldia,codigozona,macro,distrito'
                      }
                  );
                  var url_vias = vias.getSource().getGetFeatureInfoUrl(
                      evt.coordinate,$scope.mapa.getView().getResolution(),$scope.mapa.getView().getProjection(),{
                          'INFO_FORMAT': 'application/json',
                          'propertyName': 'nombrevia,tipovia'
                      }
                  );
                  reqwest({
                      url: url_zonas_tributarias,
                      type: 'json',
                  }).then(function(data)
                  {
                      var feature = data.features[0];
                      ///////////////////////////////////////////////////////////
                      var cod = feature.properties;
                      var codigo_zona_tributaria = parseInt(cod.grupovalor.replace("-",""));
                      $scope.datos.codigo_zona_tributaria = codigo_zona_tributaria;
                      console.log("codigo zona tributaria: ",codigo_zona_tributaria);
                      $scope.datos.f01_idCodigoZona = codigo_zona_tributaria;
                      ///////////////////////////////////////////////////////////
                  });
                  reqwest({
                      url: url_zonas,
                      type: 'json',
                  }).then(function(data)
                  {
                      var feature = data.features[0];
                      ///////////////////////////////////////////////////////////
                      var cod = feature.properties;
                      console.log('miooo',cod);
                      var zona = cod.zonaref;
                      var macrodistrito = cod.macrodistrito;
                      var idMacrodistrito = cod.macro;
                      var cod_zona= cod.codigozona;
                      var distrito= cod.distrito;
                      $scope.datos.RO_MAC_OF = idMacrodistrito;
                      $scope.distritoZonas(idMacrodistrito);
                      $scope.datos.RO_ZONA_OF_VALUE = zona;
                      $scope.$apply();
                      console.log('idMacrodistrito',idMacrodistrito)
                      console.log("cod zona serv sit: ",cod_zona);
                      /////////////////////////////////////////////
                      //console.log("hhhhh",n_genesis);
                      for (var i=0;i<n_genesis;i++) {
                          if(geo_id_sit_servicio[i ]=== cod_zona) {
                              cod_zona_genesis = geo_id_genesis[i];
                              console.log("cod zona genesis: ",cod_zona_genesis);
                          }
                      }
                      /////////////////////////////////////////////
                      console.log("zona: ",zona);
                      console.log("macrodistrito: ",macrodistrito);
                      console.log("distrito: ",distrito);
                  });
                  reqwest({
                      url: url_vias,
                      type: 'json',
                  }).then(function(data)
                  {
                      var feature = data.features[0];
                      if(feature=== undefined)
                      {
                      console.log("No se encontro datos para via...");
                      $scope.datos.RO_NOM_VIA_SUC  = '';
                      $scope.datos.RO_TIPO_VIA_SUC = '';
                      }
                      else
                      {
                      ///////////////////////////////////////////////////////////
                      var cod = feature.properties;
                      var nombre_via = cod.nombrevia;
                      var tipo_via = cod.tipovia;
                      switch (tipo_via) {
                          case 'AVENIDA':
                              $scope.datos.RO_TIPO_VIA_SUC = 'AV';
                          break;
                          case 'CALLE':
                              $scope.datos.RO_TIPO_VIA_SUC = 'CA';
                          break;
                          case 'CALLEJON':
                              $scope.datos.RO_TIPO_VIA_SUC = 'CL';
                          break;
                          case 'PLAZA':
                              $scope.datos.RO_TIPO_VIA_SUC = 'PL';
                          break;
                          case 'CANCHA':
                              $scope.datos.RO_TIPO_VIA_SUC = 'CN';
                          break;
                          case 'PARQUE':
                              $scope.datos.RO_TIPO_VIA_SUC = 'PR';
                          break;
                          case 'PASAJE':
                              $scope.datos.RO_TIPO_VIA_SUC = 'PA';
                          break;
                          case 'NO DEFINIDO':
                              $scope.datos.RO_TIPO_VIA_SUC = 'ND';
                          break;
                      }
                      $scope.datos.RO_NOM_VIA_SUC  = nombre_via;
                      console.log("nombre via: ",nombre_via);
                      console.log("tipo via: ",tipo_via);
                      ///////////////////////////////////////////////////////////
                      }
                      $scope.$apply();       
                  });
              }
              /////////////////////////////////////////////////////////////////////
              var feature = new ol.Feature(
              new ol.geom.Point(ol.proj.fromLonLat(centro_1))
              );
              feature.setStyle(iconStyle);
              vectorSource.addFeature(feature);
          });
      },500);
  };
  

  //********************Vehiculo*****************************************
  $scope.listaVeh = function (){
    var veh = new listaVehiculo();
    veh.ope_id = $scope.datos.ope_id; 
    veh.lstVehiculo(function(data){
      if(JSON.parse(data).success!= null){
        data = JSON.parse(data).success.data;
        $scope.objVehiculos = data;
        $scope.tablaVehiculo.reload();
      }else{
        swal("Error!", "Ocurrio un error, vuelva intentar por favor.", "error");
      }
    })
  }

  $scope.tablaVehiculo = new ngTableParams({
    page: 1,
    count: 10,
    filter: {},
    sorting: {}
  }, {
    total: $scope.objVehiculos.length,
    getData: function($defer, params) {
      var filteredData = params.filter() ?
      $filter('filter')($scope.objVehiculos, params.filter()) :
      $scope.objVehiculos;
      var orderedData = params.sorting() ?
      $filter('orderBy')(filteredData, params.orderBy()) :
      $scope.$scope.objVehiculos;
      $scope.exportData = [];
      $scope.exportData.push(["Nro", "OPERADOR", "Placa",  "Modelo", "Tipo", "Marca", "Color", "Estado", "Fecha de Vencimiento TMOV","Ultimo Tramite Enviado","Observaciones"]);
      angular.forEach(orderedData, function(value, key) {
        var veh_ope_vigencia_a = ''
        if(value.veh_ope_vigencia_a==null){
          veh_ope_vigencia_a='';
        }else{
          veh_ope_vigencia_a = (value.veh_ope_vigencia_a.split('T'))[0]
        }
        var  veh_ope_nro_tramite = ''
        if(value.veh_ope_nro_tramite==null){
          veh_ope_nro_tramite='';
        }else{
          veh_ope_nro_tramite = value.veh_ope_nro_tramite
        }
        $scope.exportData.push([(key+1),
          value.veh_datos.RO_NOM_SUC,
          value.veh_placa,
          value.veh_datos.RO_MOD_V,
          value.veh_datos.RO_TIP_V,
          value.veh_datos.RO_MAR_V,
          value.veh_datos.RO_COLOR_V,
          value.veh_ope_estado_veh,
          veh_ope_vigencia_a,
          veh_ope_nro_tramite,
          JSON.stringify(value.yobserv)
        ]);
      });
      params.total(orderedData.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.crear =function(acc){
    $scope.valida = 'active';
    $scope.valida2 = '';
    $("#valida1").hide();
    $("#valida").hide();
    $("#validaMN").hide();
    if(acc == 1){
      $scope.tituloVehiculo = "REGISTRAR NUEVO VEHICULO";
      $scope.botonV = "nu";
      $scope.desabilitaVeh = true;
      $scope.mostrarZonaProp = false;
      $scope.mostrarZonaPoo = false;
    }
    else{
      $scope.tituloVehiculo = "MODIFICAR DATOS DEL VEHICULO";
      $scope.botonV = "upd";
      $scope.desabilitaVeh = false;
    }
  }

  $scope.getComboClaseMovilidad = function(){
    var clase = new claseVehiculo();
    clase.tipo = ($scope.datos.RO_MOD).toUpperCase();
    clase.combo_clase_v(function(results){
      results= JSON.parse(results);
      if(results!=null)
      {
        $scope.obtClaseMovilidades=results.success.data;
      }
    });
  };

  $scope.getComboMarcaMovilidad = function(){
    var marca = new marcaVehiculo();
    marca.combo_marca_v(function(results){
      results= JSON.parse(results);
      if(results!=null)
      {
        $scope.obtMarcaMovilidades =results.success.data;
      }
      else{
        $.unblockUI();
      }
    });
  };

  $scope.verificaPlaca = function(placa){
    if(valPlaca == 0){
      var verif = new verifPlaca();
      verif.placa = placa;
      verif.verificaPlaca(function(results){
        results = JSON.parse(results).success.data[0];
        if(results.vexiste != 0){
          $scope.botonV = "455";
          swal({
            title: "",
            text: "La Placa "+results.vveh_placa+' ya fue registrada en fecha '+results.vehregistrado+', en el operador '+results.vope_rz,
            imageUrl: '../../img/error.jpg'
          });
          $('#vehiculo').modal('hide');
          $scope.desabilitaVeh = true;
        }
        else{
          var busObs = new buscaObservacionesCondVeh();
          busObs.identificador = placa;
          busObs.tipo = 'V';
          busObs.buscaObservaciones(function(results){
            results = JSON.parse(results).success.data;
            if(results.length != 0){
              $scope.datosObs = results;
              $('#vehiculo').modal('hide');
              $scope.tituloObs = 'El Vehiculo tiene las siguientes Observaciones:';
              $('#ObservacionesConductoresVeh').modal('show');
              $scope.botonC = "ne";
              $scope.desabilitaCon = true;
            }else{
              var samverif = new SamverifPlaca();
              samverif.id_operador='null';
              samverif.id_tipo='null';
              samverif.id_marca='null';
              samverif.placa_mov=placa;
              samverif.SambuscaVehiculo(function(results){
                results = JSON.parse(results).success.data[0];
                if(typeof results === 'undefined') {
                  alertify.success('Registre los datos del vehículo');
                  $scope.botonV = "new";
                  $scope.desabilitaVeh = false;
                }else{
                  if(results.tiposervicio_id == 2){
                    $scope.botonV = "455";
                    swal({
                      title: "",
                      text: "La Placa "+results.placa+' ya fue registrada como TAXI en fecha '+results.yopmov_modificado.split('T')[0] +', en el operador '+results.nombre_operador,
                      imageUrl: '../../img/error.jpg'
                    });
                    $('#vehiculo').modal('hide');
                    $scope.desabilitaVeh = true;
                  }else{
                    alertify.success('Registre los datos del vehículo');
                    $scope.botonV = "new";
                    $scope.desabilitaVeh = false;
                  }
                }
              }); 
            }
          })
        }
      }); 
    }
    else{
      swal("","La Placa es Incorrecta","error");
    }   
  }

  $scope.limpiar = function(){
    $scope.datos.RO_PLA_V = '';
    $scope.datos.RO_TIP_V = '';
    $scope.datos.RO_CLA_V = '';
    $scope.datos.RO_MAR_V = '';
    $scope.datos.RO_MOD_V = '';
    $scope.datos.RO_COLOR_V = '';
    $scope.datos.RO_PUE_V = '';
    $scope.datos.RO_ASI_V = '';      
    $scope.datos.RO_RAD_V = '';
    $scope.datos.RO_CI_P  = '';
    $scope.datos.RO_EXP_P = '';
    $scope.datos.RO_NOM_P = '';      
    $scope.datos.RO_PAT_P = '';
    $scope.datos.RO_MAT_P = '';
    $scope.datos.RO_CEL_P = '';
    $scope.datos.RO_MAC_P = '';
    $scope.datos.RO_ZONA_P = '';     
    $scope.datos.RO_ZONA_P_OTRO = '';     
    $scope.datos.RO_CALL_P = '';
    $scope.datos.RO_NRO_P  = '';
    $scope.datos.RO_CI_POO  = '';
    $scope.datos.RO_EXP_POO = '';
    $scope.datos.RO_NOM_POO = '';     
    $scope.datos.RO_PAT_POO = '';
    $scope.datos.RO_MAT_POO = '';
    $scope.datos.RO_CEL_POO = '';
    $scope.datos.RO_MAC_POO = '';
    $scope.datos.RO_ZONA_POO = '';      
    $scope.datos.RO_ZONA_POO_OTRO = '';      
    $scope.datos.RO_CALL_POO = '';
    $scope.datos.RO_NRO_POO = '';
    $scope.datos.RO_ID_SUC = '';
  }

  $scope.datosNaturalVehiculo = function (ci,tipo) {
    try{
      var buscarRepresentante = new rcNatural();
      buscarRepresentante.tipo_persona = "NATURAL";
      buscarRepresentante.ci = ci;
      buscarRepresentante.buscarPersona(function(res){
        var x = JSON.parse(res);
        if (x.error) {
          alertify.success(x.error.message);
        }else {
          if (x.length > 0) {
            alertify.success('Datos Encontrados');
            switch (x[0].dtspsl_expedido) {
              case "LPZ":
                var expd = 'LA PAZ';
                break;              
              case "CBB":
                var expd = 'COCHABAMBA';
                break;
              case "SCZ":
                var expd = 'SANTA CRUZ';
                break;
              case "CHQ":
                var expd = 'CHUQUISACA';
                break;
              case "TJA":
                var expd = 'TARIJA';
                break;
              case "PTS":
                var expd = 'POTOSI';
                break;
              case "ORU":
                var expd = 'ORURO';
                break;
              case "BNI":
                var expd = 'BENI';
                break;
              case "PND":
                var expd = 'PANDO';
                break;              
              case "EXT":
                var expd = 'ESTRANJERO';
                break;
              default:
                var expd = '';
                break;
            }
            $scope.busquedaCiudadano = x[0];
            if(tipo == 'p'){
              $scope.datos.RO_NRO_P = parseInt(x[0].dtspsl_numero_casa);
              $scope.datos.RO_NOM_P = x[0].dtspsl_nombres;
              $scope.datos.RO_PAT_P = x[0].dtspsl_paterno;
              $scope.datos.RO_MAT_P = x[0].dtspsl_materno;
              $scope.datos.RO_CAS_P = x[0].dtspsl_tercer_apellido;
              $scope.datos.RO_CEL_P = parseInt(x[0].dtspsl_movil);
              $scope.datos.RO_TEL_P = x[0].dtspsl_telefono;
              $scope.datos.RO_CORR_P = x[0].dtspsl_correo;
              $scope.datos.RO_EXP_P = expd;
              $scope.datos.RO_MAC_P = x[0].dtspsl_macrodistrito_desc;
              $scope.datos.RO_ZONA_P = x[0].dtspsl_zona_desc;
              $scope.datos.RO_CALL_P = x[0].dtspsl_nombre_via;
              $scope.distritoZonasTipo($scope.datos.RO_MAC_P,'Prop');
            }else{              
              $scope.datos.RO_NRO_POO = x[0].dtspsl_numero_casa;
              $scope.datos.RO_NOM_POO = x[0].dtspsl_nombres;
              $scope.datos.RO_PAT_POO = x[0].dtspsl_paterno;
              $scope.datos.RO_MAT_POO = x[0].dtspsl_materno;
              $scope.datos.RO_CAS_POO = x[0].dtspsl_tercer_apellido;
              $scope.datos.RO_CEL_POO = x[0].dtspsl_movil;
              $scope.datos.RO_TEL_POO = x[0].dtspsl_telefono;
              $scope.datos.RO_CORR_POO = x[0].dtspsl_correo;
              $scope.datos.RO_EXP_POO = expd;
              $scope.datos.RO_MAC_POO = x[0].dtspsl_macrodistrito_desc;
              $scope.datos.RO_ZONA_POO = x[0].dtspsl_zona_desc;
              $scope.datos.RO_CALL_POO = x[0].dtspsl_nombre_via;
              $scope.distritoZonasTipo($scope.datos.RO_ZONA_POO,'Pos');
            }
          }
        }
      });
    }catch(e){
    }
  };

  $scope.validaTabPoo = function(){
    $scope.valida = 'active';
    $scope.valida2 = '';
  }

  $scope.validaPropietario = function(){
    $scope.valida = '';
    $scope.valida2 = 'active';
    if($scope.datos.RO_CI_POO=='' 
      && $scope.datos.RO_EXP_POO=='' && $scope.datos.RO_NOM_POO=='' 
      && $scope.datos.RO_PAT_POO=='' && $scope.datos.RO_MAT_POO==''
      && $scope.datos.RO_CEL_POO=='' && $scope.datos.RO_MAC_POO=='' 
      && $scope.datos.RO_ZONA_POO=='' && $scope.datos.RO_CALL_POO=='' 
      && $scope.datos.RO_NRO_POO=='')
    {
      $scope.datos.RO_CI_POO = $scope.datos.RO_CI_P;  
      $scope.datos.RO_EXP_POO = $scope.datos.RO_EXP_P;  
      $scope.datos.RO_NOM_POO = $scope.datos.RO_NOM_P;  
      $scope.datos.RO_PAT_POO = $scope.datos.RO_PAT_P;
      $scope.datos.RO_MAT_POO = $scope.datos.RO_MAT_P;  
      $scope.datos.RO_CEL_POO = $scope.datos.RO_CEL_P;
      $scope.datos.RO_MAC_POO =  $scope.datos.RO_MAC_P;
      $scope.datos.RO_ZONA_POO = $scope.datos.RO_ZONA_P;
      $scope.datos.RO_CALL_POO = $scope.datos.RO_CALL_P;
      $scope.datos.RO_NRO_POO = $scope.datos.RO_NRO_P;
      $scope.datos.RO_ZONA_POO_OTRO = $scope.datos.RO_ZONA_P_OTRO;
      $scope.distritoZonasTipo($scope.datos.RO_MAC_POO,'Pos')
    }
  }

  $scope.adiModVehiculo = function(id,opcion){
    $scope.nroTramite = '';
    if($scope.datos.RO_MAC_P == 'OTRO'){
      $scope.datos.RO_ZONA_P = $scope.datos.RO_ZONA_P_OTRO;
    }
    if($scope.datos.RO_MAC_POO == 'OTRO'){
      $scope.datos.RO_ZONA_POO = $scope.datos.RO_ZONA_POO_OTRO;
    }
    if($scope.datos.RO_PLA_V!='' && $scope.datos.RO_PLA_V!=undefined && $scope.datos.RO_TIP_V!='' && $scope.datos.RO_TIP_V!=undefined
      && $scope.datos.RO_CLA_V!=''&&$scope.datos.RO_CLA_V!=undefined && $scope.datos.RO_MAR_V!='' && $scope.datos.RO_MAR_V!=undefined
      && $scope.datos.RO_MOD_V!=''&&$scope.datos.RO_MOD_V!=undefined && $scope.datos.RO_COLOR_V!='' && $scope.datos.RO_COLOR_V!=undefined
      && $scope.datos.RO_PUE_V!=''&&$scope.datos.RO_PUE_V!=undefined 
      && $scope.datos.RO_RAD_V!=''&&$scope.datos.RO_RAD_V!=undefined && $scope.datos.RO_CI_P!='' && $scope.datos.RO_CI_P!=undefined
      && $scope.datos.RO_EXP_P!=''&&$scope.datos.RO_EXP_P!=undefined && $scope.datos.RO_NOM_P!=''&&$scope.datos.RO_NOM_P!=undefined
      && $scope.datos.RO_MAC_P!='' && $scope.datos.RO_MAC_P!=undefined
      && $scope.datos.RO_ZONA_P!=''&&$scope.datos.RO_ZONA_P!=undefined && $scope.datos.RO_CALL_P!='' && $scope.datos.RO_CALL_P!=undefined
      && $scope.datos.RO_NRO_P!=''&&$scope.datos.RO_NRO_P!=undefined && $scope.datos.RO_CI_POO!='' && $scope.datos.RO_CI_POO!=undefined
      && $scope.datos.RO_EXP_POO!=''&&$scope.datos.RO_EXP_POO!=undefined && $scope.datos.RO_NOM_POO!='' && $scope.datos.RO_NOM_POO!=undefined
      && $scope.datos.RO_MAC_POO!='' && $scope.datos.RO_MAC_POO!=undefined
      && $scope.datos.RO_ZONA_POO!=''&&$scope.datos.RO_ZONA_POO!=undefined && $scope.datos.RO_CALL_POO!='' && $scope.datos.RO_CALL_POO!=undefined
      && $scope.datos.RO_NRO_POO!=''&&$scope.datos.RO_NRO_POO!=undefined)
    {
      $('#vehiculo').modal('hide');
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
        try {
          if($scope.datos.RO_MOD_VALUE==1){
            var idSuc = document.getElementById("RO_ID_SUC").options[document.getElementById("RO_ID_SUC").selectedIndex].text;
          }else{
            var idSuc = '';
            $scope.datos.RO_ID_SUC = 0;
          }
          if($scope.datos.RO_MOD_VALUE == 1 || $scope.datos.RO_MOD_VALUE == 2 ){
            var nroAs = $scope.datos.RO_ASI_V;
          }
          if($scope.datos.RO_MOD_VALUE == 3 || $scope.datos.RO_MOD_VALUE == 4 || $scope.datos.RO_MOD_VALUE==5 || $scope.datos.RO_MOD_VALUE==6){
            var nroAs = $scope.datos.RO_ASI_VJ1;
          }
          $scope.datos.tipoRegistro = 'vehiculo';
          var fecha = new Date();  
          $scope.datos.g_fecha = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" +fecha.getFullYear()
          var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
          var crea = new adicionaTramitesFormulario();
          crea.frm_tra_fecha = fechactual;
          crea.frm_tra_enviado = "NO";
          crea.frm_tra_registrado = fechactual;
          crea.frm_tra_modificado = fechactual;
          crea.id_servicio = $scope.idRegistro;
          crea.data_json = JSON.stringify($scope.datos);;
          crea.oid_ciudadano = $scope.oidCiu;
          crea.id_usuario = 3;
          crea.adiciona_Tramites_Formulario(function(res){
            x = JSON.parse(res);
            response = x.success;
            if(response.length  > 0){
              var id_tramite = response[0].sp_insertar_formulario_tramites_datos;
              $scope.datos.id_tramite = id_tramite;
              var datosV = {
                RO_NOM_SUC : document.getElementById("RO_ID_SUC").options[document.getElementById("RO_ID_SUC").selectedIndex].text,
                RO_TIP_V   : $scope.datos.RO_TIP_V,
                RO_CLA_V   : $scope.datos.RO_CLA_V,
                RO_MAR_V   : $scope.datos.RO_MAR_V,
                RO_MOD_V   : $scope.datos.RO_MOD_V,
                RO_COLOR_V : $scope.datos.RO_COLOR_V,
                RO_PUE_V   : $scope.datos.RO_PUE_V,
                RO_ASI_V   : nroAs,      
                RO_RAD_V   : $scope.datos.RO_RAD_V,
                RO_CI_P    : $scope.datos.RO_CI_P,
                RO_EXP_P   : $scope.datos.RO_EXP_P,
                RO_NOM_P   : $scope.datos.RO_NOM_P,      
                RO_PAT_P   : $scope.datos.RO_PAT_P,
                RO_MAT_P   : $scope.datos.RO_MAT_P,
                RO_CEL_P   : $scope.datos.RO_CEL_P,
                RO_MAC_P   : $scope.datos.RO_MAC_P,
                RO_ZONA_P  : $scope.datos.RO_ZONA_P,      
                RO_CALL_P  : $scope.datos.RO_CALL_P,
                RO_NRO_P   : $scope.datos.RO_NRO_P,
                RO_CI_POO  : $scope.datos.RO_CI_POO,
                RO_EXP_POO   : $scope.datos.RO_EXP_POO,
                RO_NOM_POO  : $scope.datos.RO_NOM_POO,      
                RO_PAT_POO  : $scope.datos.RO_PAT_POO,
                RO_MAT_POO   : $scope.datos.RO_MAT_POO,
                RO_CEL_POO  : $scope.datos.RO_CEL_POO,
                RO_MAC_POO   : $scope.datos.RO_MAC_POO,
                RO_ZONA_POO  : $scope.datos.RO_ZONA_POO,      
                RO_CALL_POO  : $scope.datos.RO_CALL_POO,
                RO_NRO_POO   : $scope.datos.RO_NRO_POO      
              };
              datosV = JSON.stringify(datosV);
              var datosVeh = new vehiculo();
              datosVeh.id =  id; 
              datosVeh.ope_id = $scope.datos.ope_id;
              datosVeh.placa = ($scope.datos.RO_PLA_V).toUpperCase(); 
              datosVeh.datos = datosV; 
              datosVeh.usr_id = 1; 
              datosVeh.tipo_ser = $scope.datos.RO_MOD_VALUE; 
              datosVeh.id_ofi = $scope.datos.RO_ID_SUC; 
              datosVeh.opcion = opcion;
              $scope.crea_tramite_lotus($scope.datos,'V',datosVeh);
            }
          })
          $.unblockUI();
        } catch (error) {
          $.unblockUI();
          swal("","Ocurrio un error","error");
        }
        $.unblockUI();
      },1000);   
    }
    else{
      swal("","Datos obligatorios, verifique los datos del formulario","warning");
    }   
  }

  $scope.validaModelo = function (campo){
    if($scope.datos.RO_MOD_VALUE == 1){
      var tipoSuc = '';
      for(var i=0; i<$scope.datosOfiR.length;i++){
        if($scope.datos.RO_ID_SUC==$scope.datosOfiR[i].xofi_id){
          tipoSuc = $scope.datosOfiR[i].suc;
        }
      }
      if(tipoSuc != 'MA'){
        var fecha = new Date();
        var ano = fecha.getFullYear();
        var mod = campo;
        var cant = ano - mod;
        if(mod.toString().length == 4){
          if (cant < 10) {
            $("#validaMN").hide();
            $scope.datos.RO_MOD_V = mod;
          }
          else{
            $("#validaMN").show();
            $scope.datos.RO_MOD_V = '';
          }
        }
      }else{
        $("#validaMN").hide();
      }
    }
  }

  $scope.validaPlaca = function (campo){
    campo = campo.toUpperCase();
    emailRegex = /^[0-9]{3,4}[A-Z]{3}$/;
    if (emailRegex.test(campo)) {
      valPlaca = 0;
      $("#valida1").show();
      $("#valida").hide();
    } else {
      $("#valida1").hide();
      $("#valida").show();
      valPlaca = 1;
      $scope.desabilitaVeh = true;
    };
  }
//**********************FIN VEHICULO************************
//***********************************Datos de Ubicacion****************************
  $scope.macrodistritos = function(){
    $scope.aMacrodistritos = {};
    var datosP = new macrodistritoLst();
    datosP.obtmacro(function(resultado){
      data = JSON.parse(resultado);
      if(data.success.length > 0){
        $scope.aMacrodistritos = data.success;
        $scope.aMacrodistritos.push({'mcdstt_macrodistrito':'OTRO'});
      }else{
          $scope.msg = "Error !!";
      }
    });
  }

  $scope.distritoZonasope = function(idMacroJ){        
    $scope.idMacro = idMacroJ;
    $scope.aDistritoZona = {};
    try{
    var parametros = new distritoZona();
    parametros.idMacro = idMacroJ;
    parametros.obtdist(function(resultado){
        data = JSON.parse(resultado);
        if(data.success.length > 0){
        $scope.aDistritoZona = data.success;

        }else{
        $scope.msg = "Error !!";
        }
    });
    }catch(error){
    }
};

  $scope.distritoZonas = function(idMacroJ){ 
    var idMacro = "";
    if(idMacroJ != 'OTRO'){
      $scope.mostrarOtraZona = false;
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
    }
    else{
      $scope.mostrarOtraZona = true;
    }
  };

  $scope.distritoZonasTipo = function(idMacroJ,tipo){ 
    var idMacro = "";
    if(idMacroJ != 'OTRO'){
      if($scope.aMacrodistritos){
        angular.forEach($scope.aMacrodistritos, function(value, key) {
          if(value.mcdstt_macrodistrito == idMacroJ){
            idMacro = value.mcdstt_id;
          }
        });
      }        
      $scope.idMacro = idMacro;
      $scope.datos.f01_macro_act    =   idMacro;
      $scope.datos.INT_AC_MACRO_ID = idMacro;
      $scope.aDistritoZona = {};
      try{
        if(idMacroJ.length != 0){
          var parametros = new distritoZona();
          parametros.idMacro = idMacro;
          parametros.obtdist(function(resultado){
            data = JSON.parse(resultado);
            if(data.success.length > 0){
              if(tipo == 'Prop'){
                $scope.aDistritoZonaProp = data.success;
                $scope.mostrarZonaProp = false;
              }else{
                if(tipo == 'Pos'){
                  $scope.aDistritoZonaPos = data.success;
                  $scope.mostrarZonaPoo = false;   
                }else{
                  if(tipo == 'Cond'){
                    $scope.aDistritoZonaCond = data.success;
                  } 
                }
              }
            }else{
              $scope.msg = "Error !!";
            } 
          });
        }
      }catch(error){
        console.log('error',error);
      }
    }
    else{
      if(tipo == 'Prop'){
        $scope.mostrarZonaProp = true;
      }else{
        if(tipo == 'Pos'){
          $scope.mostrarZonaPoo = true;   
        }
      }
    }
  };

  $scope.actulizarIdDistrito  =   function(){
    $scope.desabilitadoV=false;
    var idDistrito  = "";
    var idZona      = "";
    var distNombre  = $scope.datos.RO_ZONA_OF;
    if($scope.aDistritoZona){
        angular.forEach($scope.aDistritoZona, function(value, key) {
            if(value.dist_nombre == distNombre){
                idDistrito  =   value.dist_dstt_id;
                idZona      =   value.dist_id;
            }
        });
    }
    $scope.desabilitadoNo=true;
    $scope.datos.RO_ZONA_OF      =    distNombre;       
  };

  $scope.eliVehiculo = function(id){
    swal({
      title: "¿Estás seguro?",
      text: "¡No podrás recuperar estos datos!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Si, Eliminar!",
      closeOnConfirm: false
    },
    function(){
      var obs = new listaObservacionesCondVeh();
      obs.idtipo = id;
      obs.tipo = 'V';
      obs.lstObservaciones(function(results){
        results = JSON.parse(results).success.data;
        $scope.observaciones = results;
        if($scope.observaciones.length > 0){
          swal("Error!", "No se puede eliminar al vehiculo porque tiene observaciones.", "error");
        }else{
          var datosVeh = new vehiculo();
          datosVeh.id =  id; 
          datosVeh.ope_id = $scope.datos.ope_id;
          datosVeh.placa = ''; 
          datosVeh.datos = ''; 
          datosVeh.usr_id = 1; 
          datosVeh.tipo_ser = 0; 
          datosVeh.id_ofi = 0; 
          datosVeh.opcion = 'E';
          datosVeh.vehiculoAbm(function(results){
            results = JSON.parse(results).success.data[0].sp_abm_operador_vehiculo;
            if(results == 'Eliminado'){
              swal("Eliminado!", "Se elimino correctamente.", "success");
            }
            $scope.listaVeh();
          })
        }
      }) 
      /**/
    });
  }
//*******************INICIO CONDUCTOR***************************************
  $scope.listaCond = function (){
    var cond = new listaConductor();
    cond.ope_id = $scope.datos.ope_id; 
    cond.lstConductor(function(data){
      if(JSON.parse(data).success!= null){
        data = JSON.parse(data).success.data;
        $scope.objConductores = data;
        $scope.tablaConductor.reload();
      }else{
        swal("Error!", "Ocurrio un error, vuelva intentar por favor.", "error");
      }
    })
  }
  
  $scope.tablaConductor = new ngTableParams({
    page: 1,
    count: 10,
    filter: {},
    sorting: {}
  }, {
    total: $scope.objConductores.length,
    getData: function($defer, params) {
      var filteredData = params.filter() ?
      $filter('filter')($scope.objConductores, params.filter()) :
      $scope.objConductores;
      var orderedData = params.sorting() ?
      $filter('orderBy')(filteredData, params.orderBy()) :
      $scope.$scope.objConductores;
      $scope.exportDataConductores = [];
      $scope.exportDataConductores.push(["Nro", "Oficina-Macro","CI", "Placa",  "Nombre", "Paterno", "Materno", "Estado", "Fecha de Vencimiento TIC", "Ultimo Tramite Enviado","Observaciones"]);
      angular.forEach(orderedData, function(value, key) {
        var cond_ofi_vigencia_a = ''
        if(value.cond_ofi_vigencia_a==null){
          cond_ofi_vigencia_a='';
        }else{
          cond_ofi_vigencia_a = (value.cond_ofi_vigencia_a.split('T'))[0]
        }
        var  cond_ofi_nro_tramite = ''
        if(value.cond_ofi_nro_tramite==null){
          cond_ofi_nro_tramite='';
        }else{
          cond_ofi_nro_tramite = value.cond_ofi_nro_tramite
        }
        $scope.exportDataConductores.push([(key+1),
          value.cond_datos.RO_NOM_SUC,
          value.cond_ci,
          value.cond_datos.PLACA,
          value.cond_datos.RO_NOM_C,
          value.cond_datos.RO_PAT_C,
          value.cond_datos.RO_MAT_C,
          value.cond_ofi_estado_doc,
          cond_ofi_vigencia_a,
          cond_ofi_nro_tramite,
          JSON.stringify(value.yobserv)
        ]);
      });
      params.total(orderedData.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.crearCond = function(acc){
    $scope.mostrarOtraZona = false;
    if(acc == 1){
      $scope.desabilitaCon = true;
      $scope.tituloConductor = "REGISTRAR NUEVO CONDUCTOR";
      $scope.botonC = "ne";
      $scope.limpiarCon();
    }
    else{
      $scope.desabilitaCon = false;
      $scope.tituloConductor = "MODIFICAR DATOS DEL CONDUCTOR";
      $scope.botonC = "upd";
    }
  }

  $scope.limpiarCon = function(){
    $scope.datos.RO_CI_C = '';
    $scope.datos.RO_EXP_C = '';
    $scope.datos.PLACA  = '';
    $scope.datos.RO_NOM_C = '';
    $scope.datos.RO_PAT_C = '';
    $scope.datos.RO_MAT_C = '';
    $scope.datos.RO_CORR_C = '';
    $scope.datos.RO_CEL_C = '';
    $scope.datos.RO_MAC_C = '';
    $scope.datos.RO_ZONA_C = '';
    $scope.datos.RO_CALL_C = '';
    $scope.datos.RO_NRO_C = '';
    $scope.datos.RO_CAT_C = '';
    $scope.datos.RO_TIP_C= '';
    $scope.mostrarOtraZona = false;
    $('.js-example-basic-single').select2();
  }

  $scope.verificaConductor= function (ci) {      
    var busC = new buscaConductorVeh();
    busC.ci = ci;
    busC.buscaConductor(function(results){
      results = JSON.parse(results);
      $scope.datosVer = results.success.data[0];
      if($scope.datosVer != undefined){
        var fechaR = new Date($scope.datosVer.xcond_registrado),
        fechaR = fechaR.getFullYear()+'-'+(fechaR.getMonth()+1)+'-'+fechaR.getDate();
        swal({
          title:"",
          text: 'El conductor con Carnet de Identidad '+$scope.datosVer.xcond_ci+' ya fue registrada en fecha '+ fechaR +', en el operador '+$scope.datosVer.xope_rz,
          imageUrl: '../../img/btnProf.png'
        });
        $('#modalConductor').modal('hide');
        $scope.botonC = "ne";
        $scope.desabilitaCon = true;
      }else{
        var busObs = new buscaObservacionesCondVeh();
        busObs.identificador = ci;
        busObs.tipo = 'C';
        busObs.buscaObservaciones(function(results){
          results = JSON.parse(results).success.data;
          if(results.length != 0){
            $scope.datosObs = results;
            $('#modalConductor').modal('hide');
            $scope.tituloObs = 'El Conductor tiene las siguientes Observaciones:';
            $('#ObservacionesConductoresVeh').modal('show');
            $scope.botonC = "ne";
            $scope.desabilitaCon = true;
          }else{
            $scope.botonC = "new";
            alertify.success('Registre los datos del conductor');
            $scope.desabilitaCon = false;
          }
        })
      }
    });
  }; 

  $scope.adiModConductor = function(id,opc){
    if($scope.datos.RO_MAC_C == 'OTRO'){
      $scope.datos.RO_ZONA_C = $scope.datos.RO_ZONA_C_OTRO;
    }
    if($scope.datos.RO_EXP_C!='' && $scope.datos.RO_EXP_C!=undefined && $scope.datos.PLACA!='' && $scope.datos.PLACA!=undefined
      &&$scope.datos.RO_NOM_C!='' && $scope.datos.RO_NOM_C!=undefined &&$scope.datos.RO_MAC_C!='' 
      && $scope.datos.RO_MAC_C!=undefined && $scope.datos.RO_ZONA_C!='' && $scope.datos.RO_ZONA_C!=undefined
      &&$scope.datos.RO_CALL_C!='' && $scope.datos.RO_CALL_C!=undefined && $scope.datos.RO_NRO_C!=''
      && $scope.datos.RO_NRO_C!=undefined
      &&$scope.datos.RO_CAT_C!='' && $scope.datos.RO_CAT_C!=undefined && $scope.datos.RO_TIP_C!='' 
      && $scope.datos.RO_TIP_C!=undefined)
    {
      $('#modalConductor').modal('hide');
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
        var id_suc = 0;
        var nom_suc = '';
        angular.forEach($scope.objVehiculos,function(val, index)
        {
          if(val.veh_placa == $scope.datos.PLACA){
            id_suc = val.veh_ope_id_oficina;
            nom_suc = val.veh_datos.RO_NOM_SUC
            $scope.datos.nom_suc = nom_suc;
          }
        });
        try {
          $scope.datos.tipoRegistro = 'conductor';
          var fecha = new Date();  
          var dataC = {
            "RO_NOM_SUC" : nom_suc,
            "RO_EXP_C" : $scope.datos.RO_EXP_C,
            "PLACA"    : ($scope.datos.PLACA).toUpperCase() ,
            "RO_NOM_C" : $scope.datos.RO_NOM_C,
            "RO_PAT_C" : $scope.datos.RO_PAT_C,
            "RO_MAT_C" : $scope.datos.RO_MAT_C,
            "RO_TEL_C" : $scope.datos.RO_TEL_C,
            "RO_CORR_C" : $scope.datos.RO_CORR_C,
            "RO_CEL_C" : $scope.datos.RO_CEL_C,
            "RO_MAC_C" : $scope.datos.RO_MAC_C,
            "RO_ZONA_C" : $scope.datos.RO_ZONA_C,
            "RO_CALL_C" : $scope.datos.RO_CALL_C,
            "RO_NRO_C" : $scope.datos.RO_NRO_C,
            "RO_CAT_C" : $scope.datos.RO_CAT_C,
            "RO_TIP_C" : $scope.datos.RO_TIP_C
          }
          $scope.datos.g_fecha = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" +fecha.getFullYear()
          var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
          var crea = new adicionaTramitesFormulario();
          crea.frm_tra_fecha = fechactual;
          crea.frm_tra_enviado = "NO";
          crea.frm_tra_registrado = fechactual;
          crea.frm_tra_modificado = fechactual;
          crea.id_servicio = $scope.idRegistro;
          crea.data_json = JSON.stringify($scope.datos);
          crea.oid_ciudadano = $scope.oidCiu;
          crea.id_usuario = 3;
          crea.adiciona_Tramites_Formulario(function(res){
            x = JSON.parse(res);
            response = x.success;
            if(response.length  > 0){
              var id_tramite = response[0].sp_insertar_formulario_tramites_datos;
              $scope.datos.id_tramite = id_tramite;
              datac = JSON.stringify(dataC);
              var datosCond = new conductor();
              datosCond.id = id; 
              datosCond.ope_id = $scope.datos.ope_id;
              datosCond.ci = $scope.datos.RO_CI_C;
              datosCond.datos = datac;
              datosCond.usr_id = 1; 
              datosCond.ofi_id = id_suc; 
              datosCond.tipo_ser = $scope.datos.RO_MOD_VALUE; 
              datosCond.opcion = opc;
              $scope.crea_tramite_lotus($scope.datos,'C',datosCond);
            }
          })
        } catch (error) {
          $.unblockUI();
          swal("","Ocurrio un error","error");
        }
        $.unblockUI();
      },1000);      
    }else{
      swal("","Datos obligatorios, verifique los datos del formulario","warning");
    }
  }

  $scope.eliminarCond = function(id){
    swal({
      title: "¿Estás seguro?",
      text: "¡No podrás recuperar estos datos!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Si, Eliminar!",
      closeOnConfirm: false
    },
    function(){
      var obs = new listaObservacionesCondVeh();
      obs.idtipo = id;
      obs.tipo = 'C';
      obs.lstObservaciones(function(results){
        results = JSON.parse(results).success.data;
        $scope.observaciones = results;
        if($scope.observaciones.length > 0){
          swal("Error!", "No se puede eliminar al conductor porque tiene observaciones.", "error");
        }else{
          var datosCond = new conductor();
          datosCond.id = id; 
          datosCond.ope_id = $scope.datos.ope_id;
          datosCond.ci = '';
          datosCond.datos = '';
          datosCond.usr_id = 1; 
          datosCond.ofi_id = 1; 
          datosCond.tipo_ser = 0; 
          datosCond.opcion = 'E';
          datosCond.conductorAbm (function(data){
            data = JSON.parse(data).success.data[0].sp_abm_operador_conductor;
            if(data == 'Eliminado'){
              swal("Eliminado!", "Se elimino correctamente.", "success");
            }else{
              swal("Error!", "Ocurrio un error al momento de eliminar.", "error");
            }
            $scope.listaCond();
          })
        }
      }) 
      
    });
  }

//********************FIN DE CONDUCTOR***********************
//**********************OBSERVACIONES************************
  $scope.listaObservaciones = function(id,tipo){
    var obs = new listaObservacionesCondVeh();
    obs.idtipo = id;
    obs.tipo = tipo;
    obs.lstObservaciones(function(results){
      results = JSON.parse(results).success.data;
      $scope.observaciones = results;
      if(results.length != 0){
        $('#Observaciones').modal('show');
      }else{
        if(tipo == 'V'){
          swal("", "El Vehiculo no tiene observaciones registradas.");
        }else{
          swal("", "El Conductor no tiene observaciones registradas.");
        }
      }
    });
  }

  $scope.registrarObservacion = function(id,tipo){
    $scope.id = id;
    $scope.tipo = tipo;
    $('#registraObservaciones').modal('show');
  }

  $scope.cambiarVehiculo = function(vehi){
    $scope.datosd = vehi;
    $scope.datosd.PLACA=vehi.cond_datos.PLACA;
    $scope.datosd.RO_NOM_C=vehi.cond_datos.RO_NOM_C;
    $scope.datosd.RO_PAT_C=vehi.cond_datos.RO_PAT_C;
    $scope.datosd.RO_MAT_C=vehi.cond_datos.RO_MAT_C;
    $('#CambioVehiculoconductor').modal('show');
  }

  $scope.cambiar_placa = function(vehit){
    $scope.datosd.cond_datos.PLACA = $scope.datosd.PLACA;
    var datosCond = new conductor();
    datosCond.id = $scope.datosd.xcond_id;
    datosCond.ope_id = $scope.datosd.cond_ofi_id_ope;
    datosCond.ci = $scope.datosd.cond_ci;
    datosCond.datos = JSON.stringify($scope.datosd.cond_datos);
    datosCond.usr_id = 1; 
    datosCond.ofi_id = $scope.datosd.cond_ofi_id_oficina; 
    datosCond.tipo_ser = 1; 
    datosCond.opcion = 'A';
    datosCond.conductorAbm(function(data){
      data = JSON.parse(data).success.data[0];
      if(data.sp_abm_operador_conductor == 'Actualizado'){
        $('#CambioVehiculoconductor').modal('hide');
        $scope.listaCond();
        $scope.seleccionarOperador($scope.datosd.cond_ofi_id_ope);
      }
    })
    
  }


  $scope.eliObservacion = function(id){
    swal({
      title: "¿Esta Seguro de Eliminar el Registro?",
      text: "¡No podrás recuperar estos datos!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Si, Eliminar!",
      closeOnConfirm: false
    },
    function(){
      var eliObs = new abmObservacionesCondVeh();
      eliObs.id = id;
      eliObs.tipo_id = 0;
      eliObs.tipo = '';
      eliObs.obs = '';
      eliObs.opcion = 'E';
      eliObs.abmObservaciones(function(results){
        $scope.listaVeh();
        $scope.listaCond();
        swal('','Se elimino Exitosamente','success');
        $('#Observaciones').modal('hide');
      })
    });
  }

  $scope.adiObservacion = function(opcion,observacion){
    var adiObs = new abmObservacionesCondVeh();
    adiObs.id = 0;
    adiObs.tipo_id = $scope.id;
    adiObs.tipo = $scope.tipo;
    adiObs.obs = observacion.obs;
    adiObs.opcion = opcion;
    adiObs.abmObservaciones(function(results){
      if($scope.tipo == 'V'){
        $scope.listaVeh();
        $scope.tablaVehiculo.reload();
      }else{
        $scope.listaCond();
      }
      swal('','Se Registro Exitosamente','success');
      $('#registraObservaciones').modal('hide');
      $scope.datosObs.obs = '';
    })
  }

//*********************FIN OBSERVACIONES*********************
  $scope.crea_tramite_lotus = function (datos,tipo,dataInf) {
    var f = new Date();  
    datos.g_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
    data_form = JSON.stringify(datos);
    var tramite = new crearTramiteMovilidad();
    tramite.usr_id = 1;    
    tramite.datos = data_form;
    tramite.procodigo = 'AO';
    var nroTramiteEnviado = sessionService.get('NROTRAMITE');
    tramite.tramite_linea(function(results){ 
      results = JSON.parse(results);
      if (results !=null) {
        if(results.success != null){
          $scope.nroTramite = results.success.data[0].crea_tramite_linea;
          var data = JSON.parse(dataInf.datos);
          data.NRO_TRAMITE = $scope.nroTramite;
          dataInf.datos = JSON.stringify(data);
          if(tipo == 'V'){
            dataInf.vehiculoAbm(function(results){
              results = JSON.parse(results).success.data[0];
              if(results.sp_abm_operador_vehiculo = 'Insertado'){
                swal({
                  title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
                  text: 'Su número de Trámite es:<h2></strong> ' + $scope.nroTramite + '</strong></h2>\n Se registro exitosamente debe apersonarse durante 10 dias habiles a Alto Obrajes para realizar su Inspección.',
                  html: true,
                  type: 'success',
                });
                $scope.actualizaTramiteIgob(datos.id_tramite, $scope.nroTramite);

              }
              $scope.datos = {};
              $scope.datos.ope_id = $scope.operador.xope_id;
              $scope.datos.den_ope = $scope.operador.xope_denominacion;
              $scope.datos.tip_ope = $scope.operador.xope_tipo_operador;
              $scope.datos.RO_MOD_VALUE = $scope.operador.xope_datos.RO_MOD_VALUE; 
              $scope.datos.RO_MOD = $scope.operador.xope_datos.RO_MOD; 
            })
          }
          if(tipo == 'C'){
            dataInf.conductorAbm (function(data){
              data = JSON.parse(data).success.data[0];
              if(data.sp_abm_operador_conductor == 'Insertado'){
                swal({
                  title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
                  text: 'Su número de Trámite es:<h2></strong> ' + $scope.nroTramite + '</strong></h2>\n Se registro exitosamente debe apersonarse durante 10 dias habiles a Alto Obrajes para realizar su Inspección.',
                  html: true,
                  type: 'success',
                });
                $scope.actualizaTramiteIgob(datos.id_tramite, $scope.nroTramite);
              }
              $scope.datos = {};
              $scope.datos.ope_id = $scope.operador.xope_id;
              $scope.datos.den_ope = $scope.operador.xope_denominacion;
              $scope.datos.tip_ope = $scope.operador.xope_tipo_operador;
              $scope.datos.RO_MOD_VALUE = $scope.operador.xope_datos.RO_MOD_VALUE; 
              $scope.datos.RO_MOD = $scope.operador.xope_datos.RO_MOD; 
            })
          }
        }else{
          swal("Error!", "Ocurrio un error, vuelva a intentarlo", "error"); 
        }
        if(tipo == 'V')
        {
          $scope.listaVeh();
        }
        if(tipo == 'C')
        {
          $scope.listaCond();
        }
      }else{
        swal("Error!", "Ocurrio un error, vuelva a intentarlo", "error"); 
      }
      $.unblockUI();
    })  
  }

  $scope.actualizaTramiteIgob = function(id_tramite,nroTramite){
    idUsuario = 4; 
    var tramiteIgob = new datosFormularios();
    tramiteIgob.frm_idTramite = id_tramite;
    tramiteIgob.frm_tra_enviado = 'SI';
    tramiteIgob.frm_tra_if_codigo = nroTramite;
    tramiteIgob.frm_tra_id_usuario = idUsuario;
    tramiteIgob.validarFormProcesos(function(resultado){
      console.log("resultado",resultado);
    });
  }
  //Renovacion de TIC Y TMOV
  $scope.renovacionTmov = function(veh){
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
      swal({
        title: "¿Esta seguro/a que quiere iniciar el proceso de renovación de TMOV?",
        text: "Tenga en cuenta que una vez iniciada la solicitud se debe llevar el vehiculo a que pase la inspección vehicular en el lapso de 10 días hábiles.",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Iniciar Tramite de Renovación",
        closeOnConfirm: false 
      },
      function(){
        var detalle = [];
        if(veh.veh_ope_detalle_renov==null){
          detalle = [{"fecha_d":veh.veh_ope_vigencia_d,"fecha_a":veh.veh_ope_vigencia_a}];
        }else{
          detalle = veh.veh_ope_detalle_renov;
          detalle.push({"fecha_d":veh.veh_ope_vigencia_d,"fecha_a":veh.veh_ope_vigencia_a});
        }
        try {
          detalle = JSON.stringify(detalle);
          $scope.datos.REN_ID_VEH = veh.veh_id;
          $scope.datos.REN_TIPO = "VEH";
          $scope.datos.REN_VEH_PLACA = veh.veh_placa;
          var fecha = new Date();  
          $scope.datos.g_fecha = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" +fecha.getFullYear()
          var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
          var crea = new adicionaTramitesFormulario();
          crea.frm_tra_fecha = fechactual;
          crea.frm_tra_enviado = "NO";
          crea.frm_tra_registrado = fechactual;
          crea.frm_tra_modificado = fechactual;
          crea.id_servicio = $scope.idRenovacion;
          crea.data_json = JSON.stringify($scope.datos);;
          crea.oid_ciudadano = $scope.oidCiu;
          crea.id_usuario = 3;
          crea.adiciona_Tramites_Formulario(function(res){
            x = JSON.parse(res);
            response = x.success;
            if(response.length  > 0){
              var nro_tramite = response[0].sp_insertar_formulario_tramites_datos;
              $scope.datos.id_tramite = nro_tramite;
              data_form = JSON.stringify($scope.datos);
              var tramite = new crearTramiteMovilidad();
              tramite.usr_id = 1;    
              tramite.datos = data_form;
              tramite.procodigo = 'REN';
              tramite.tramite_linea(function(results){
                results = JSON.parse(results);
                if (results !=null) {
                  var nrot = results.success.data[0].crea_tramite_linea;
                  var renov = new renovacionVehTmov();
                  renov.id_veh = veh.veh_ope_id;
                  renov.detalle_ren = detalle+'<'+nrot;
                  renov.renovacionTmov(function(results){
                    results = JSON.parse(results).success.data;
                    if(results.length >0){
                      $scope.listaVeh();
                      $scope.actualizaTramiteIgob(nro_tramite,nrot);
                      swal({
                        title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
                        text: 'Su número de Trámite es:<h2></strong> ' + nrot + '</strong></h2>\n Se registro exitosamente debe apersonarse durante 10 dias habiles a Alto Obrajes para realizar su Inspección.',
                        html: true,
                        type: 'success',
                        //timer: 5000,
                      });
                    }
                  })
                }else{
                  swal("Error!", "Ocurrio un error, vuelva intentar por favor.", "error");
                }
                $.unblockUI();
              }) 
            }
            else{
              swal("Error!", "Ocurrio un error, vuelva intentar por favor.", "error");
              $.unblockUI();
            }
          });
        } catch (error) {
          swal("Error!", "Ocurrio un error, vuelva intentar por favor.", "error");
        }
      });
      $.unblockUI();
    },300); 
  }

  $scope.renovacionTic = function(cond){ 
    swal({
      title: "¿Esta seguro/a que quiere iniciar el proceso de renovación de TIC?",
      text: "Tenga en cuenta que una vez iniciada la solicitud el conductor se debe presentar su documentación en el lapso de 10 días hábiles.",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Iniciar Tramite de Renovación",
      closeOnConfirm: false 
    },
    function(){
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
        var detalle = [];
        if(cond.cond_ofi_detalle_renov==null){
          detalle = [{"fecha_d":cond.cond_ofi_vigencia_d,"fecha_a":cond.cond_ofi_vigencia_a}];
        }else{
          detalle = cond.cond_ofi_detalle_renov;
          detalle.push({"fecha_d":cond.cond_ofi_vigencia_d,"fecha_a":cond.cond_ofi_vigencia_a});
        }
        try {
          detalle = JSON.stringify(detalle);
          $scope.datos.REN_ID_COND = cond.cond_ofi_id;
          $scope.datos.REN_TIPO = "COND";
          $scope.datos.REN_COND_CI = cond.cond_ci;
          var fecha = new Date();  
          $scope.datos.g_fecha = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" +fecha.getFullYear();
          var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
          var crea = new adicionaTramitesFormulario();
          crea.frm_tra_fecha = fechactual;
          crea.frm_tra_enviado = "NO";
          crea.frm_tra_registrado = fechactual;
          crea.frm_tra_modificado = fechactual;
          crea.id_servicio = $scope.idRenovacion;
          crea.data_json = JSON.stringify($scope.datos);;
          crea.oid_ciudadano = $scope.oidCiu;
          crea.id_usuario = 3;
          crea.adiciona_Tramites_Formulario(function(res){
            x = JSON.parse(res);
            response = x.success;
            if(response.length  > 0){
              var nro_tramite = response[0].sp_insertar_formulario_tramites_datos;
              $scope.datos.id_tramite = nro_tramite;
              data_form = JSON.stringify($scope.datos);
              var tramite = new crearTramiteMovilidad();
              tramite.usr_id = 1;    
              tramite.datos = data_form;
              tramite.procodigo = 'REN';
              tramite.tramite_linea(function(results){
                results = JSON.parse(results);
                if (results !=null) {
                  var nrot = results.success.data[0].crea_tramite_linea;
                  var renov = new renovacionCondTic();
                  renov.id_cond = cond.cond_ofi_id;
                  renov.detalle_ren = detalle+'<'+nrot;
                  renov.renovacionTic(function(results){
                    results = JSON.parse(results).success.data;
                    if(results.length > 0){
                      $scope.listaCond ();
                      $scope.listaVeh();
                      $scope.actualizaTramiteIgob(nro_tramite,nrot);
                      swal({
                        title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
                        text: 'Su número de Trámite es:<h2></strong> ' + nrot + '</strong></h2>\n Se registro exitosamente debe apersonarse durante 10 dias habiles a Alto Obrajes para realizar su Inspección.',
                        html: true,
                        type: 'success',
                      });
                    }
                  })
                }else{
                  swal("Error!", "Ocurrio un error, vuelva intentar por favor.", "error");
                }
                $.unblockUI();
              }) 
            }
            else{
              swal("Error!", "Ocurrio un error, vuelva intentar por favor.", "error");
              $.unblockUI();
            }
          });
        } catch (error) {
          swal("Error!", "Ocurrio un error, vuelva intentar por favor.", "error");
        }
      },500);
      $.unblockUI();
    });
  }



  /* 
  solicitud de renovacion de operador 
  */

  $scope.crear_tramite = function()
  {
      $.blockUI();
      console.log("$scope.ope");
      console.log($scope.ope);
      //if ($scope.datosCiudadano.dtspsl_activaciond == 'SI' && $scope.datosCiudadano.dtspsl_activacionf == 'SI') {
        var dataInicio = $scope.ope; // {'operador':$scope.ope.xope_denominacion,'ope_id':$scope.ope.xope_id};
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
              $scope.seleccionarTramitereno(tramiteCiu);
            }
            else{
              $.unblockUI();
            }
          });
        }catch(e){
          console.log('*Error*', e);
          $.unblockUI();
        }
      /*} else{
        swal('', "Debe realizar las activaciones fisica y digital para poder realizar el trámite", 'warning');
      };*/
  }

  $scope.seleccionar = function(idTramite){
    console.log("idTramite");
    console.log(idTramite);
    $scope.tramiteSeleccionado = idTramite;
  }
  $scope.seleccionarope = function(idTramite){
    console.log("idTramite");
    console.log(idTramite);
    $scope.tramiteSeleccionadoope = idTramite;
  }
  var denominacion = '';
  $scope.checkAll = function(name)
  {
    if(name){
      document.getElementById('RO_DEN').disabled=false;
      denominacion = document.getElementById('RO_DEN').value;
    }else{
      document.getElementById('RO_DEN').disabled=true;
      document.getElementById('RO_DEN').value = denominacion;
    }
  };
  
  //**********************DATOS DEL TRAMITE***********************
  $scope.seleccionarTramitereno = function(tramite){
    console.log("seleccionarTramitereno");
    //datos.RO_DEN
    $scope.tramite_datos = tramite;
    console.log('tramite',tramite);
    sessionService.set('IDTRAMITE',tramite.vtra_id);
    $scope.arrayOficinas = [];
    $scope.mostrar_formulario = true;
    if(tramite.venviado == 'SI'){
      //$scope.desabilita = true;
      document.getElementById('miFormGuardar').disabled=true;
      document.getElementById('gu').disabled=true;
      $scope.Operadorrenovar(tramite.datos);
      //$scope.datos = JSON.parse(tramite.form_contenido);
      $scope.datosOperador = true;
      var data = $scope.datos.oficinas;
      $scope.operadoresOficinas = data;
      $scope.tablaOficinas.reload();
    }else{
      document.getElementById('miFormGuardar').disabled=false;
      document.getElementById('gu').disabled=false;
      //$scope.desabilita = false;
      //$scope.datosOperador = false;
      if(sessionService.get('TIPO_PERSONA')=='JURIDICO'){
        var nroDocCiu = sessionService.get('NITCIUDADANO');
      }else{
        var nroDocCiu = sessionService.get('CICIUDADANO');
      }
      //$scope.Operadorrenovar($scope.ope);
      $scope.Operadorrenovar(tramite.datos);
      $scope.operadoresUsuario = JSON.parse(tramite.datos);
      //$scope.tablaOperadores.reload();
      /*
      var opeHab = new operadoresHab();
      opeHab.nroDoc = nroDocCiu;
      opeHab.idCiu = sIdCiudadano;
      opeHab.listaOperadoresRep(function(results){
        results = JSON.parse(results).success.data; 
        console.log('results',results);
        $scope.operadoresUsuario = results;
        $scope.tablaOperadores.reload();
      })
      */
    }
  }

  $scope.ejecutarFile = function(idfile){
    iniciarLoadFyler();
    var sid =   document.getElementById(idfile);
    if(sid){
        document.getElementById(idfile).click();
    }else{
        alert("Error ");
    }
  };

  $scope.cambiarFile = function(obj, valor){
    setTimeout(function(){
    $rootScope.leyenda1 = obj.name;
    }, 500);
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
    
    $scope.oidCiudadano = $scope.datos.oidCiudadano;// sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "Movilidad/" + $scope.oidCiudadano;
    var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
    $.blockUI();
    angular.forEach(aArchivos, function(archivo, key) {
        $scope.adjunto = document.getElementById('f01_upload'+idFiles[key]).files[0];
        if(typeof(archivo) != 'undefined'){
            if($scope.reqVehiculo == 0){
                angular.forEach($scope.requisitosVehiculo, function(doc, pos) {
                    if(doc.req_id == idFiles[key]){
                        descDoc = 'Requisito_'+doc.req_id;
                    }
                })
            }else{
                if($scope.reqConductor == 0){
                    angular.forEach($scope.requisitosConductor, function(doc, pos) {
                        console.log(doc,'doc');
                        if(doc.req_id == idFiles[key]){
                            descDoc = 'Requisito_'+doc.req_id;
                        }
                    })
                }else{
                    angular.forEach($scope.docArray, function(doc, pos) {
                        if(doc.resid == idFiles[key]){
                            descDoc = 'Requisito_'+doc.resid;
                        }
                    })
                }
            }
            var imagenNueva = archivo.name.split('.');
            var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
            if (archivo.size > 500000 && archivo.size <= 15000000) {
                if (imagenNueva[imagenNueva.length-1] == "png" || imagenNueva[imagenNueva.length-1] == "jpg" || imagenNueva[imagenNueva.length-1] == "jpeg" || imagenNueva[imagenNueva.length-1] == "bmp" || imagenNueva[imagenNueva.length-1] == "gif" || 
                    imagenNueva[imagenNueva.length-1] == "PNG" || imagenNueva[imagenNueva.length-1] == "JPG" || imagenNueva[imagenNueva.length-1] == "JPEG" || imagenNueva[imagenNueva.length-1] == "BMP" || imagenNueva[imagenNueva.length-1] == "GIF") {
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
                    if (imagenNueva[imagenNueva.length-1] == 'pdf' ||  imagenNueva[imagenNueva.length-1] == 'docx' ||  imagenNueva[imagenNueva.length-1] == 'docxlm' ||
                    imagenNueva[imagenNueva.length-1] == 'PDF' ||  imagenNueva[imagenNueva.length-1] == 'DOCX' ||  imagenNueva[imagenNueva.length-1] == 'DOCXLM' ) {
                        $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/"  + "/" + nombreFileN + "?app_name=todoangular";
                        fileUpload1.uploadFileToUrl1($scope.adjunto, uploadUrl, nombreFileN);
                        document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                        $.unblockUI();
                    }else{
                        $.unblockUI();
                        swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                    };
                };
            }else{
                if (archivo.size <= 500000) {
                    console.log(imagenNueva[imagenNueva.length-1]);
                    if (imagenNueva[imagenNueva.length-1] == 'png' || imagenNueva[imagenNueva.length-1] == 'jpg' || imagenNueva[imagenNueva.length-1] == 'jpeg' || imagenNueva[imagenNueva.length-1] == 'bmp' || imagenNueva[imagenNueva.length-1] == 'gif' || imagenNueva[imagenNueva.length-1] == 'pdf' || imagenNueva[imagenNueva.length-1] == 'docx' || imagenNueva[imagenNueva.length-1] == 'docxlm' || 
                    imagenNueva[imagenNueva.length-1] == 'PNG' || imagenNueva[imagenNueva.length-1] == 'JPG' || imagenNueva[imagenNueva.length-1] == 'JPEG' || imagenNueva[imagenNueva.length-1] == 'BMP' || imagenNueva[imagenNueva.length-1] == 'GIF' || imagenNueva[imagenNueva.length-1] == 'PDF' || imagenNueva[imagenNueva.length-1] == 'DOCX' || imagenNueva[imagenNueva.length-1] == 'DOCXLM') {
                        $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/"  + "/" + nombreFileN + "?app_name=todoangular";
                        fileUpload1.uploadFileToUrl1($scope.adjunto, uploadUrl, nombreFileN);
                        document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                        $.unblockUI();
                    } else{
                        console.log(imagenNueva[1]);
                        if (imagenNueva[imagenNueva.length-1] == 'pdf' ||  imagenNueva[imagenNueva.length-1] == 'docx' ||  imagenNueva[imagenNueva.length-1] == 'docxlm' ||
                            imagenNueva[imagenNueva.length-1] == 'PDF' ||  imagenNueva[imagenNueva.length-1] == 'DOCX' ||  imagenNueva[imagenNueva.length-1] == 'DOCXLM' ) {
                            $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/"  + "/" + nombreFileN + "?app_name=todoangular";
                            fileUpload1.uploadFileToUrl1($scope.adjunto, uploadUrl, nombreFileN);
                            document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                            $.unblockUI();
                        }else{
                            $.unblockUI();
                            swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
                        };
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
      if($scope.reqVehiculo == 0){
          angular.forEach($scope.requisitosVehiculo, function(doc, pos) {
              if(doc.req_id == idFile){
              descDoc = 'Requisito_'+doc.req_id;
              }
          })
      }else{
          if($scope.reqConductor == 0){
              angular.forEach($scope.requisitosConductor, function(doc, pos) {
                  if(doc.req_id == idFile){
                      console.log(doc,'doc');
                      descDoc = 'Requisito_'+doc.req_id;
                  }
              })
          }else{
              angular.forEach($scope.docArray, function(doc, pos) {
                  if(doc.resid == idFile){
                      descDoc = 'Requisito_'+doc.resid;
                  }
              })
          } 
      }
      var imagenNueva = aArch.files[0].name.split('.');
      var tam = aArch.files[0];
      var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
      $scope.oidCiudadano = $scope.datos.oidCiudadano;// sessionService.get('IDSOLICITANTE');
      $scope.direccionvirtual = "Movilidad/" + $scope.oidCiudadano;
      var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual  + "/" + nombreFileN + "?app_name=todoangular";
      var descrip =  document.getElementById('lbl_f01_upload'+idFile).innerHTML;
      descrip = descrip.replace("\n","");
      if($scope.reqVehiculo == 0){
          var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "idRequisito":'+idFile+',"desc":"'+descrip+'"}';
          $scope.datos.fileRequisitosVeh[aArch.name] = JSON.parse(myJSON);
      }else{
          if($scope.reqConductor == 0){
              var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "idRequisito":'+idFile+',"desc":"'+descrip+'"}';
              $scope.datos.fileRequisitosCond[aArch.name] = JSON.parse(myJSON);
          }else{
              var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "idRequisito":'+idFile+',"desc":"'+descrip+'"}';
              $scope.fileArRequisitos[aArch.name] = JSON.parse(myJSON);
          }   
      }
  }

  //**********************Guardar Datos*************************
  $scope.guardar_tramite = function(){
    //$scope.datos.oficinas = $scope.arrayOficinas;
    //console.log("------------- fileArRequisitos -----------------");
    //console.log($scope.fileArRequisitos);
    //console.log("--------------   $scope.datos.ope_requisitos ----------- ");
    //console.log($scope.datos.ope_requisitos);
    console.log(" ---------------------  $scope.tramite_datos ---------------------");
    console.log($scope.tramite_datos);
    console.log(" --------------------- antiguo tramite.form_contenido ---------------------");
    console.log(JSON.parse($scope.tramite_datos.form_contenido));
    
    // console.log(JSON.parse($scope.tramite_datos.form_contenido).oficina_data);
    // console.log(JSON.parse($scope.tramite_datos.form_contenido).oficinas);
    // console.log(JSON.parse($scope.tramite_datos.form_contenido).yope_requisitos);
    // console.log(JSON.parse($scope.tramite_datos.form_contenido).xope_denominacion);
    
    // console.log("----------------------------------------------------------------------");
    // console.log($scope.datos.oficina_data);
    // console.log($scope.datos.oficinas);
    // console.log($scope.datos.ope_requisitos);
    // console.log($scope.datos.RO_DEN);
    // console.log($scope.datos.hab_deno);

    var datros_tramite = JSON.parse($scope.tramite_datos.form_contenido);
    datros_tramite.oficina_data = $scope.datos.oficina_data;
    datros_tramite.oficinas = $scope.datos.oficinas;
    datros_tramite.yope_requisitos = $scope.datos.ope_requisitos;
    datros_tramite.hab_deno = $scope.datos.hab_deno;
    if($scope.datos.hab_deno){
      datros_tramite.xope_denominacion = $scope.datos.RO_DEN;
    }
    $scope.tramite_datos.form_contenido = JSON.stringify(datros_tramite);
    console.log("----------------------------------------------------------------------");
    console.log(datros_tramite);
    console.log(" ---------------------  nuevo tramite.form_contenido ---------------------");
    console.log(JSON.parse($scope.tramite_datos.form_contenido));
    

    //if($scope.hab_deno){}
    $scope.datos.Tipo_tramite_creado = "WEB";
    try {
      //console.log('$scope.datos',$scope.datos);
      //var datosSerializados   =  JSON.stringify($scope.datos);
      var datosSerializados   =  $scope.tramite_datos.form_contenido;
      var idCiudadano         = sessionService.get('IDSOLICITANTE');
      var idTramite           = sessionService.get('IDTRAMITE');
      var idServicio          = idTram;
      var crear = new datosFormularios();
      crear.frm_tra_dvser_id = idServicio;
      crear.data_json = datosSerializados;
      crear.frm_tra_id_ciudadano = sIdCiudadano;
      crear.frm_tra_id_usuario = 1;
      crear.frm_idTramite = idTramite;
      //console.log("----------------------------------------------------------------------");
      //console.log("crear");
      //console.log(crear);
      //console.log(crear.data_json);
      
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
        $scope.crea_tramite_lotus_reno(JSON.parse($scope.tramite_datos.form_contenido));
        // console.log($scope.datos,'datos');
        // if($scope.datos.oficinas.length>0 || $scope.datos.f10_modificacionRepEmpresa){
        //   if($scope.datos.f10_modificacionRepEmpresa){
        //   }else{
        //     $scope.crea_tramite_lotus($scope.tramite_datos.form_contenido);
        //   }
        // }
        // else{
        //   swal("", "No se modifico el dato de ninguna oficina, ni del representante legal", "warning");  
        // }
        console.log($scope.tramite_datos.form_contenido,'datos');
      },100);
    });
  };
  $scope.crea_tramite_lotus_reno = function (datos) {
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
      datos.g_tipo = 'RENO';
      var data_form = JSON.stringify(datos);
      var tramite = new crear_Tramite_lotus();
      tramite.proid = 89;
      tramite.actid = 714;
      tramite.usr_id = 0;
      tramite.datos = data_form;
      tramite.procodigo = 'RENO';
      tramite.macro_id = 0;
      tramite.nodo_id = 300;
      tramite.ws_id = 24;
      tramite.tram_lotus(function(results){ 
        results = JSON.parse(results);
        console.log('results',results);
        if (results !=null) {
          results = results.success.data[0].casonro;
          $scope.validarFormProcesos(results,datos.xope_id);
          $.unblockUI();
        }else{
          alertify.error("Señor(a) Ciudadano(a) ocurrio un error al enviar su Tramité.", );
          $.unblockUI();
        }
      }); 
    },300);           
  };

  $scope.validarFormProcesos = function(nroTramite,ope_id){
    var idUsuario = sessionService.get('IDUSUARIO');
    try {
      idUsuario = 4; 
      var tramiteIgob = new datosFormularios();
      tramiteIgob.frm_idTramite = sessionService.get('IDTRAMITE');
      tramiteIgob.frm_tra_enviado = 'SI';
      tramiteIgob.frm_tra_if_codigo = nroTramite;
      tramiteIgob.frm_tra_id_usuario = idUsuario;
      tramiteIgob.validarFormProcesos(function(resultado){
        var operen = new renovacionOpe();
        operen.id_ope = ope_id ;
        operen.detalle_ren = nroTramite;
        operen.renovacionOpera(function(results){
          results = JSON.parse(results).success.data;
          console.log(results);
          
          swal({
            title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
            text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2>Usted debe dirigirse al tercer día hábil a la Secretaria Municipal de Movilidad y contactarse con el Asesor Legal DROM, portando sus documentos originales para la verificación.',
            html: true,
            type: 'success',
        },function(isConfirm){
            if (isConfirm) {
                var currentLocation = window.location;
                var hrdato =  currentLocation.href
                const hrdatos = hrdato.split("#");
                var htldata = hrdatos[0]+"#servicios|varios|index.html?url='app/view/servicios/varios/formularios/movilidad/administradorOperador/administradoOperadores.html";
                document.location.href=htldata;
            }
        });
        $scope.mostrar_formulario = false;
        //swal("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + nroTramite + "\n Usted debe dirigirse al tercer día hábil a la Secretaria Municipal de Movilidad y contactarse con el Asesor Legal DROM, portando sus documentos originales para la verificación.");
        $scope.tramitesCiudadano();
        $.unblockUI(); 
        })

        

      });
    } catch (error){
      alertify.success('Registro no modificado');
      $.unblockUI(); 
    }
  };



}

