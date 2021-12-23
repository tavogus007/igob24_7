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
  $scope.idRenovacion = 78;
  $scope.idRegistro = 79;
  $scope.nroTramite = '';
  $scope.oidCiu = sessionService.get('IDSOLICITANTE');

  $scope.inicio = function () {
    $scope.nroTramite = '';
    $scope.seleccionarTramite();
    $scope.getComboMarcaMovilidad();
    $scope.macrodistritos();
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
      $scope.operador = ope;
      $scope.registro = true;
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
              datosVeh.placa = $scope.datos.RO_PLA_V; 
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
        text: "Tenga en cuenta que una vez iniciada la solicitud se debe llevar el vehiculo a que pase la inspección vehicular en el lapso de 10 días calendario.",
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
      text: "Tenga en cuenta que una vez iniciada la solicitud el conductor se debe presentar su documentación en el lapso de 10 días calendario.",
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
                  var renov = new renovacionCondTic();
                  renov.id_cond = cond.cond_ofi_id;
                  renov.detalle_ren = detalle+'<'+nrot;
                  renov.renovacionTic(function(results){
                    results = JSON.parse(results).success.data;
                    if(results.length > 0){
                      $scope.listaCond ();
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
}
