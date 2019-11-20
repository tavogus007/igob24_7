function administracionOperadoresController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
  var sIdCiudadano= sessionService.get('IDSOLICITANTE');
  $scope.tablaTramites        =   {};
  $scope.tramitesUsuario      =   [];
  $scope.operadoresUsuario = [];
  $scope.mostrar_form_ope = false;
  $scope.lista = false;
  $scope.registro = false;
  $scope.datos = {};
  $scope.objVehiculos = [];
  $scope.objConductores = [];
  $scope.desabilita = false;
  $scope.vehreg = 0;
  $scope.conreg = 0;
  var valPlaca = 0;
  $scope.fechaAct = new Date();

  $scope.inicio = function () {
    $scope.seleccionarTramite();
  };

  $scope.tramitesCiudadano = function(){
    var sparam  = new reglasnegocio();
    sparam.identificador = "RCCIUDADANO_MOV_AO";
    sparam.parametros = '{"sidciudadano":"' + sIdCiudadano + '"}';
    sparam.llamarregla(function(results)
    {
      results = JSON.parse(results);
      $scope.tramites = results;
      console.log($scope.tramites,888888888);
      if($scope.tramites != '[{ }]'){
        angular.forEach(results,function(val, index)
        {
          if(val['form_contenido'])
          {
            results[index].datos = val['form_contenido'];
          }
        });
        $scope.tramitesUsuario = results;
        $scope.tablaTramites.reload();
      }
    });
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

  $scope.seleccionarTramite = function(){
    $scope.desabilita = false;
    $scope.mostrar_form_ope = true;
    if(sessionService.get('TIPO_PERSONA')=='JURIDICO'){
      var nroDocCiu = sessionService.get('NITCIUDADANO');
    }else{
      var nroDocCiu = sessionService.get('CICIUDADANO');
    }
    console.log(nroDocCiu,'nroDocCiu');
    var opeHab = new operadoresHab();
    opeHab.nroDoc = nroDocCiu;
    opeHab.idCiu = sIdCiudadano;
    opeHab.listaOperadoresRep(function(results){
      results = JSON.parse(results).success.data; 
      console.log(results);
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
    var act = new actualizaEstadoVehCond();
    act.ope_id = ope.xope_id;
    act.actualiza_veh_cond(function(results){
      console.log(results)
    });
    $scope.operador = ope;
    $scope.registro = true;
    $scope.datos.ope_id = ope.xope_id;
    $scope.datos.den_ope = ope.xope_denominacion;
    $scope.datos.tip_ope = ope.xope_tipo_operador;
    $scope.datos.RO_MOD_VALUE = ope.xope_datos.RO_MOD_VALUE;
    $scope.datos.RO_DEN = ope.xope_denominacion; 
    $scope.datos.RO_MOD = ope.xope_datos.RO_MOD; 
    console.log(1234,$scope.datos.RO_MOD_VALUE);
    $scope.listaVeh();
    $scope.listaCond();
  }

//********************Vehiculo*****************************************
  $scope.listaVeh = function (){
    $scope.listaTodasObservaciones();
    var veh = new listaVehiculo();
    veh.ope_id = $scope.datos.ope_id; 
    veh.lstVehiculo(function(data){
      data = JSON.parse(data).success.data;
      for (var i = 0; i < data.length; i++) {
        var obs = 0;
        for (var j = 0; j < $scope.objObservaciones.length; j++) {
          console.log(data[i].veh_id,'veh',$scope.objObservaciones[j].obs_id_tipo,111,$scope.objObservaciones[j].obs_tipo);
          if(data[i].veh_ope_id == $scope.objObservaciones[j].obs_id_tipo && $scope.objObservaciones[j].obs_tipo.trim() == 'V'){
            obs = obs + 1;
          }
        }
        data[i].veh_obs = obs;
      }
      console.log('data veh',data);
      $scope.objVehiculos = data;
      $scope.tablaVehiculo.reload();
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
    $scope.getComboClaseMovilidad();
    $scope.macrodistritos();
    $scope.buscaOficinas();
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
    $scope.getComboMarcaMovilidad();
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
        console.log(results,123);
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
             alertify.success('Registre los datos del vehículo');
              $scope.botonV = "new";
              $scope.desabilitaVeh = false;
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
      buscarRepresentante.ci = $scope.datos.RO_CI_P;
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
            $scope.macrodistritos();
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
      console.log( $scope.datos.RO_CI_P,34355);
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
      && $scope.datos.RO_PAT_P!=''&&$scope.datos.RO_PAT_P!=undefined && $scope.datos.RO_MAT_P!=''&&$scope.datos.RO_MAT_P!=undefined
      && $scope.datos.RO_CEL_P!=''&&$scope.datos.RO_CEL_P!=undefined && $scope.datos.RO_MAC_P!='' && $scope.datos.RO_MAC_P!=undefined
      && $scope.datos.RO_ZONA_P!=''&&$scope.datos.RO_ZONA_P!=undefined && $scope.datos.RO_CALL_P!='' && $scope.datos.RO_CALL_P!=undefined
      && $scope.datos.RO_NRO_P!=''&&$scope.datos.RO_NRO_P!=undefined && $scope.datos.RO_CI_POO!='' && $scope.datos.RO_CI_POO!=undefined
      && $scope.datos.RO_EXP_POO!=''&&$scope.datos.RO_EXP_POO!=undefined && $scope.datos.RO_NOM_POO!='' && $scope.datos.RO_NOM_POO!=undefined
      && $scope.datos.RO_PAT_POO!=''&&$scope.datos.RO_PAT_POO!=undefined && $scope.datos.RO_MAT_POO!='' && $scope.datos.RO_MAT_POO!=undefined
      && $scope.datos.RO_CEL_POO!=''&&$scope.datos.RO_CEL_POO!=undefined && $scope.datos.RO_MAC_POO!='' && $scope.datos.RO_MAC_POO!=undefined
      && $scope.datos.RO_ZONA_POO!=''&&$scope.datos.RO_ZONA_POO!=undefined && $scope.datos.RO_CALL_POO!='' && $scope.datos.RO_CALL_POO!=undefined
      && $scope.datos.RO_NRO_POO!=''&&$scope.datos.RO_NRO_POO!=undefined)
    {
      if($scope.datos.RO_MOD_VALUE=1){
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
      datosVeh.placa = $scope.datos.RO_PLA_V; 
      datosVeh.datos = datosV; 
      datosVeh.usr_id = 1; 
      datosVeh.tipo_ser = $scope.datos.RO_MOD_VALUE; 
      datosVeh.id_ofi = $scope.datos.RO_ID_SUC; 
      datosVeh.opcion = opcion;
      datosVeh.vehiculoAbm(function(results){
        console.log(results,11111);
        results = JSON.parse(results).success.data[0];
        if(results.sp_abm_operador_vehiculo = 'Insertado'){
          $scope.crea_tramite_lotus($scope.datos);
        }
        $scope.datos = {};
        $scope.datos.ope_id = $scope.operador.xope_id;
        $scope.datos.den_ope = $scope.operador.xope_denominacion;
        $scope.datos.tip_ope = $scope.operador.xope_tipo_operador;
        $scope.datos.RO_MOD_VALUE = $scope.operador.xope_datos.RO_MOD_VALUE; 
        $scope.datos.RO_MOD = $scope.operador.xope_datos.RO_MOD; 
        $scope.listaVeh();
        $('#vehiculo').modal('hide');
      })
    }
    else{
      swal("","Datos obligatorios, verifique los datos del formulario","warning");
    }
  }

  $scope.buscaOficinas = function(){
    var ofic = new buscaOficinas();
    ofic.idope = $scope.datos.ope_id;
    ofic.buscaOficinasOperador(function(results){
      $scope.datosOfiR = JSON.parse(results).success.data;
    })
  }

  $scope.validaModelo = function (campo){
    console.log('campo',campo,$scope.datosOfiR);
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

  $scope.distritoZonas = function(idMacroJ){ 
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
              }else{
                if(tipo == 'Pos'){
                  $scope.aDistritoZonaPos = data.success;
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
    $scope.datos.INT_AC_DISTRITO    =   idDistrito;
    $scope.datos.INT_AC_ID_ZONA     =   idZona;
    $scope.datos.INT_ID_ZONA        =   idZona;
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
        console.log($scope.observaciones.length,1233);
      }) 
      /**/
    });
  }
//*******************INICIO CONDUCTOR***************************************

  $scope.listaCond = function (){
    $scope.listaTodasObservaciones();
    var cond = new listaConductor();
    cond.ope_id = $scope.datos.ope_id; 
    cond.lstConductor(function(data){
      console.log(data);
      data = JSON.parse(data).success.data;
      console.log('conductor',data);
      for (var i = 0; i < data.length; i++) {
        var obs = 0;
        for (var j = 0; j < $scope.objObservaciones.length; j++) {
          if(data[i].cond_ofi_id == $scope.objObservaciones[j].obs_id_tipo && $scope.objObservaciones[j].obs_tipo.trim() == 'C'){
            obs = obs + 1;
          }
        }
        data[i].cond_obs = obs;
      }
      $scope.objConductores = data;
      console.log(1234,$scope.objConductores);
      $scope.tablaConductor.reload();
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
      params.total(orderedData.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.crearCond = function(acc){
    $scope.mostrarOtraZona = false;
    $scope.macrodistritos();
    if(acc == 1){
      $scope.desabilitaCon = true;
      $scope.tituloConductor = "REGISTRAR NUEVO CONDUCTOR";
      $scope.botonC = "ne";
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
          console.log(results,'results');
        })
      }
    });
  }; 

  $scope.adiModConductor = function(id,opc){
    if($scope.datos.RO_MAC_C == 'OTRO'){
      $scope.datos.RO_ZONA_C = $scope.datos.RO_ZONA_C_OTRO;
    }
    if($scope.datos.RO_EXP_C!='' && $scope.datos.RO_EXP_C!=undefined && $scope.datos.PLACA!='' && $scope.datos.PLACA!=undefined
      &&$scope.datos.RO_NOM_C!='' && $scope.datos.RO_NOM_C!=undefined && $scope.datos.RO_PAT_C!='' && $scope.datos.RO_PAT_C!=undefined
      &&$scope.datos.RO_MAT_C!='' && $scope.datos.RO_MAT_C!=undefined && $scope.datos.RO_CEL_C!='' && $scope.datos.RO_CEL_C!=undefined
      &&$scope.datos.RO_MAC_C!='' && $scope.datos.RO_MAC_C!=undefined && $scope.datos.RO_ZONA_C!='' && $scope.datos.RO_ZONA_C!=undefined
      &&$scope.datos.RO_CALL_C!='' && $scope.datos.RO_CALL_C!=undefined && $scope.datos.RO_NRO_C!='' && $scope.datos.RO_NRO_C!=undefined
      &&$scope.datos.RO_CAT_C!='' && $scope.datos.RO_CAT_C!=undefined && $scope.datos.RO_TIP_C!='' && $scope.datos.RO_TIP_C!=undefined){
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
      $scope.datos.tipoRegistro = 'conductor';
      var dataC = {
        "RO_NOM_SUC" : nom_suc,
        "RO_EXP_C" : $scope.datos.RO_EXP_C,
        "PLACA"    : $scope.datos.PLACA ,
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
      datosCond.conductorAbm (function(data){
        data = JSON.parse(data).success.data[0];
        if(data.sp_abm_operador_conductor == 'Insertado'){
          $scope.crea_tramite_lotus($scope.datos);
        }
        $scope.datos = {};
        $scope.datos.ope_id = $scope.operador.xope_id;
        $scope.datos.den_ope = $scope.operador.xope_denominacion;
        $scope.datos.tip_ope = $scope.operador.xope_tipo_operador;
        $scope.datos.RO_MOD_VALUE = $scope.operador.xope_datos.RO_MOD_VALUE; 
        $scope.datos.RO_MOD = $scope.operador.xope_datos.RO_MOD; 
        $scope.listaCond();
        $('#modalConductor').modal('hide');
      })
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
        console.log($scope.observaciones.length,1233);
      }) 
      
    });
  }

//********************FIN DE CONDUCTOR***********************
//**********************OBSERVACIONES************************
  $scope.listaTodasObservaciones = function(id,tipo){
    var obs = new observaciones();
    obs.lstTodasObservaciones(function(results){
      results = JSON.parse(results).success.data;
      if(results.length != 0){
        $scope.objObservaciones = results;
      }else{
        $scope.objObservaciones = results;
      }
    });
  }

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
      console.log(results);
    });
  }

  $scope.registrarObservacion = function(id,tipo){
    $scope.id = id;
    $scope.tipo = tipo;
    $('#registraObservaciones').modal('show');
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
  $scope.validarEnvio = function(data){
    console.log($scope.datos);
    swal({
      title: 'CONFIRMAR',
      text: '¿Se encuentra seguro de realizar el envío?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      closeOnConfirm: false
    }, function() {
      swal.close();
      setTimeout(function(){
      $scope.crea_tramite_lotus(data);
      }, 1000);
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
      var f = new Date();  
      datos.g_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
      data_form = JSON.stringify(datos);
      var tramite = new crear_Tramite_lotus();
      tramite.proid = 373;
      tramite.actid = 1652;
      tramite.usr_id = 0;        
      tramite.datos = data_form;
      tramite.procodigo = 'AO';
      tramite.macro_id = 0;
      tramite.nodo_id = 672;
      tramite.ws_id = 24;
      /*tramite.proid = 66;
      tramite.actid = 478;
      tramite.usr_id = 0;        
      tramite.datos = data_form;
      tramite.procodigo = 'AO';
      tramite.macro_id = 0;
      tramite.nodo_id = 517;
      tramite.ws_id = 24;*/
      var nroTramiteEnviado = sessionService.get('NROTRAMITE');
      tramite.tram_lotus(function(results){ 
        results = JSON.parse(results);
        if (results !=null) {
          var nrot = results.success.data[0].casonro;
          swal({
            title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
            text: 'Su número de Trámite es:<h2></strong> ' + nrot + '</strong></h2>\n Se registro exitosamente debe apersonarse durante 10 dias habiles a Alto Obrajes para realizar su Inspección.',
            html: true,
            type: 'success',
            //timer: 5000,
          });
          console.log('Se envio el tramite',nrot);
        }else{
          console.log('Se envio el tramite');
        }
        $.unblockUI();
      })  
    },300);      
  }

  $scope.crear_tramite = function(datos)
  {
    var fecha        = new Date();
    var fechactual   = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var sIdServicio  = datos;
    var sIdCiudadano = sessionService.get('IDSOLICITANTE');
    var sFechaTramite= fechactual;
    var idusu        = 3;
    var aServicio    = new reglasnegocio();
    aServicio.identificador = "RCCIUDADANO_68";
    aServicio.parametros ='{"frm_tra_dvser_id":32,"frm_tra_id_ciudadano":"' + sIdCiudadano + '","frm_tra_fecha":"' + sFechaTramite + '","frm_tra_enviado":"SI","frm_tra_id_usuario":"' + idusu + '"}';
    aServicio.llamarregla(function(data)
    { 
      console.log(data)  
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
      var detalle = '';
      if(veh.veh_ope_detalle_renov==null){
        detalle = [{"fecha_d":veh.veh_ope_vigencia_d,"fecha_a":veh.veh_ope_vigencia_a}];
      }else{
        detalle =veh.veh_detalle_renov;
        detalle.push({"fecha_d":veh.veh_ope_vigencia_d,"fecha_a":veh.veh_ope_vigencia_a});
      }
      detalle = JSON.stringify(detalle);
      var renov = new renovacionVehTmov();
      renov.id_veh = veh.veh_ope_id;
      renov.detalle_ren = detalle;
      renov.renovacionTmov(function(results){
        results = JSON.parse(results).success.data;
        if(results.length >0){
          $scope.listaVeh();
          $scope.datos.REN_ID_VEH = veh.veh_id;
          $scope.datos.REN_TIPO = "VEH";
          $scope.datos.REN_VEH_PLACA = veh.veh_placa;
          var f = new Date();  
          $scope.datos.g_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
          data_form = JSON.stringify($scope.datos);
          var tramite = new crear_Tramite_lotus();
          tramite.proid = 385;
          tramite.actid = 1726;
          tramite.usr_id = 0;        
          tramite.datos = data_form;
          tramite.procodigo = 'REN';
          tramite.macro_id = 0;
          tramite.nodo_id = 672;
          tramite.ws_id = 24;
          var nroTramiteEnviado = sessionService.get('NROTRAMITE');
          tramite.tram_lotus(function(results){ 
            results = JSON.parse(results);
            if (results !=null) {
              swal("","Se procedio al envio del trámite para la renovación del TMOV","warning");
              console.log('Se envio el tramite');
            }else{
              console.log('Se envio el tramite');
            }
            $.unblockUI();
          }) 
          $.unblockUI();
        }
      })

    },300); 
  }

  $scope.renovacionTic = function(cond){ 
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
      var detalle = '';
      if(cond.cond_ofi_detalle_renov==null){
        detalle = [{"fecha_d":cond.cond_ofi_vigencia_d,"fecha_a":cond.cond_ofi_vigencia_a}];
      }else{
        detalle = cond.cond_ofi_detalle_renov;
        detalle.push({"fecha_d":cond.cond_ofi_vigencia_d,"fecha_a":cond.cond_ofi_vigencia_a});
      }
      detalle = JSON.stringify(detalle);
      var renov = new renovacionCondTic();
      renov.id_cond = cond.cond_ofi_id;
      renov.detalle_ren = detalle;
      renov.renovacionTic(function(results){
        results = JSON.parse(results).success.data;
        if(results.length > 0){
          $scope.listaCond ();
          console.log('results',results);
          $scope.datos.REN_ID_COND = cond.cond_ofi_id;
          $scope.datos.REN_TIPO = "COND";
          $scope.datos.REN_COND_CI = cond.cond_ci;
          var f = new Date();  
          $scope.datos.g_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
          data_form = JSON.stringify($scope.datos);
          var tramite = new crear_Tramite_lotus();
          tramite.proid = 385;
          tramite.actid = 1726;
          tramite.usr_id = 0;        
          tramite.datos = data_form;
          tramite.procodigo = 'REN';
          tramite.macro_id = 0;
          tramite.nodo_id = 672;
          tramite.ws_id = 24;
          var nroTramiteEnviado = sessionService.get('NROTRAMITE');
          tramite.tram_lotus(function(results){ 
            results = JSON.parse(results);
            if (results !=null) {
              swal("","Se procedio al envio del trámite para la renovación del TIC","warning");
            }else{
              console.log('No se envio el tramite');
            }
            $.unblockUI();
          }) 
          $.unblockUI();
        }
      })
    },500);
  }
}
