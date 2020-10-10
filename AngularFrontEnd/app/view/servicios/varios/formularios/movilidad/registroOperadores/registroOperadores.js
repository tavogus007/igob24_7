function registroOperadoresController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
  var sIdCiudadano= sessionService.get('IDSOLICITANTE');
  $scope.activaTab = 'active';
  $scope.tablaTramites        =   {};
  $scope.tramitesUsuario      =   [];
  $scope.mostrar_form_ope = false;
  $scope.tipo_persona=sessionService.get('TIPO_PERSONA');
  $scope.oidCiu = sessionService.get('IDSOLICITANTE');
  $scope.datos = {};
  $scope.aMacrodistritos = {};
  $scope.requisitos = [];
  $scope.objVehiculos = [];
  $scope.objConductores = [];
  $scope.objOficinas = [];
  $scope.datosAdj = [];
  $scope.documentosarc = new Array();
  $scope.swMostrar = 0;
  var sw = 0;
  $scope.escondeTipo = false;
  $scope.idContribuyente = 0;
  $scope.deuda = '';
  $scope.modalidadId = 0;
  var valPlaca = 0;
  var valCel = 0;
  var idTram = 12;
  $scope.datosMapa = {};
  
  $scope.inicio = function () {
    $scope.tramitesCiudadano();
    $scope.cargarDatosCiudadano();
    $scope.macrodistritos();
    $scope.lssubcategoria();
    $scope.listaMod();
    //openMapGis();
  };

  $scope.recuperandoDatosGenesis = function(){
    var tipoContribuyente   =   sessionService.get('TIPO_PERSONA');
    var ciDocumento          =   '';//sessionService.get('CICIUDADANO'));
    var nitDocumento          =   '';//sessionService.get('CICIUDADANO'));
    var sAccion          =   '';//sessionService.get('CICIUDADANO'));
    var cicomplem       = '';
    var complento       = '-';
    if(tipoContribuyente == 'NATURAL'){
        ciDocumento          =   $scope.datos.RO_CI_RL;
        sAccion              =  'C01';
    }else if(tipoContribuyente == 'JURIDICO'){
        nitDocumento         =   $scope.datos.RO_NIT;
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
            var response    =   resultadoApi;
            $scope.txtMsgConexionGen    =   "";
            if(response.success.dataSql.length > 0){
              $scope.datos.dataGenesisCidadano  =   response.success.dataSql;
              var cont = $scope.datos.dataGenesisCidadano;
              if($scope.tipo_persona=='NATURAL'){
                var tipoLic = 'N';
              }else{
                var tipoLic = 'J';
              }
              $scope.datos.idContribuyente = cont[0].idContribuyente;
              var contribuyente   =   new gLstActividadEconomica();
              contribuyente.idContribuyente   =   cont[0].idContribuyente;
              contribuyente.tipo  = tipoLic;            //try{
              contribuyente.lstActividadEconomica(function(resultado){
                $scope.deuda = 'sin deuda'
                $scope.actividadesEconomicas = JSON.parse(resultado).success.dataSql;
                for(var i=0; i< $scope.actividadesEconomicas.length;i++){
                  if($scope.actividadesEconomicas[i].deudaActividad!='ACTIVIDAD SIN DEUDA'){
                    $scope.datos.deuda = 'con deuda'
                  }
                }
              })
            } else {
                $scope.datos.dataGenesisCidadano  =   {};
            }
        } else {
            $scope.txtMsgConexionGen    =   "Se ha producido un problema de conexion al cargar los datos";
            $.unblockUI();
        }
      });
    }catch(e){
        $scope.txtMsgConexionGen    =   "Se ha producido un problema de conexion al cargar los datos";
    };
  };

  $scope.tramitesCiudadano = function(){
    var tramites  = new listaTramitesMov();
    tramites.idCiudadano = sIdCiudadano;
    tramites.tra_ser = 12;
    tramites.spbusquedaformulariomovilidad(function(results){
      results = JSON.parse(results).success;
      $scope.tramites = results;
      console.log($scope.tramites,'777');
      angular.forEach(results,function(val, index)
      {
        if(val['form_contenido'])
        {
          results[index].datos = val['form_contenido'];
          try{
            if(JSON.parse(val.form_contenido).RO_MOD_DESC!=undefined){
              results[index].modalidad = JSON.parse(val.form_contenido).RO_MOD_DESC;
            }else{
              results[index].modalidad = '';
            }
          }catch(e){
            results[index].modalidad = '';
          }   
        }
      });
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

  $scope.seleccionaServicio = function(idModalidad){
    $scope.modalidadId = idModalidad;
  }

  $scope.crear_tramite = function()
  {
    $scope.limpiarUbi();
    if($scope.modalidadId != 0){
      console.log($scope.modalidadId,'mod');
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
          if($scope.modalidadId == 1){
            $scope.datos.RO_TIP_OPE_A =[{"tipoOp":"Sindicato"},{"tipoOp":"Asociación"},{"tipoOp":"Cooperativa"},{"tipoOp":"Empresa"}];
            var RO_MOD_DESC = 'RADIO TAXI';
            var RO_TIP_OPE = "Sindicato";
            var RO_TIP_TAX = '';
            var RO_TIP_SER = 'SPU';
            var RO_SER_SPU = 'IEX';
          }else{
            if($scope.modalidadId == 2 && $scope.tipo_persona == 'NATURAL'){
              $scope.datos.RO_TIP_OPE_A =[{"tipoOp":"Natural"}];
              var RO_MOD_DESC = 'TAXI';
              var RO_TIP_OPE = "Natural";
              var RO_TIP_TAX = '2';
              var RO_TIP_SER = 'SPU';
              var RO_SER_SPU = 'IEX';
            }else{
              if($scope.modalidadId == 2 && $scope.tipo_persona == 'JURIDICO'){
                $scope.datos.RO_TIP_OPE_A =[{"tipoOp":"Sindicato"},{"tipoOp":"Asociación"},{"tipoOp":"Cooperativa"}];
                var RO_MOD_DESC = 'TAXI';
                var RO_TIP_OPE = "Sindicato";
                var RO_TIP_TAX = '1';
                var RO_TIP_SER = 'SPU';
                var RO_SER_SPU = 'IEX';
              }else{
                if($scope.modalidadId == 3 && $scope.tipo_persona == 'NATURAL')
                {
                  $scope.datos.RO_TIP_OPE_A =[{"tipoOp":"Natural"}];
                  var RO_MOD_DESC = 'ESCOLAR';
                  var RO_TIP_OPE = "Natural";
                  var RO_TIP_TAX = '';
                  var RO_TIP_SER = 'SPR';
                  var RO_SER_SPR = 'Escolar';
                }else{
                  if($scope.modalidadId == 3 && $scope.tipo_persona == 'JURIDICO')
                  {
                    $scope.datos.RO_TIP_OPE_A =[{"tipoOp":"Sindicato"},{"tipoOp":"Asociación"},{"tipoOp":"Cooperativa"},{"tipoOp":"Empresa"},{"tipoOp":"Otro"}];
                    var RO_MOD_DESC = 'ESCOLAR';
                    var RO_TIP_OPE = "Sindicato";
                    var RO_TIP_TAX = '';
                    var RO_TIP_SER = 'SPR';
                    var RO_SER_SPR = 'Escolar';
                  }else{
                    if($scope.modalidadId == 4 && $scope.tipo_persona == 'NATURAL')
                    {
                      var RO_MOD_DESC = 'CARGA';
                      $scope.datos.RO_TIP_OPE_A =[{"tipoOp":"Natural"}];
                      var RO_TIP_OPE = "Natural";
                      var RO_TIP_TAX = '';
                      var RO_TIP_SER = 'SPR';
                      var RO_SER_SPR = 'Carga';
                    }else{
                      if($scope.modalidadId == 4 && $scope.tipo_persona == 'JURIDICO')
                      {
                        var RO_MOD_DESC = 'CARGA';
                        $scope.datos.RO_TIP_OPE_A =[{"tipoOp":"Sindicato"},{"tipoOp":"Asociación"},{"tipoOp":"Cooperativa"},{"tipoOp":"Otro"}];
                        var RO_TIP_OPE = "Sindicato";
                        var RO_TIP_TAX = '';
                        var RO_TIP_SER = 'SPR';
                        var RO_SER_SPR = 'Carga';
                      }else{
                        if($scope.modalidadId == 5 && $scope.tipo_persona == 'NATURAL')
                        {
                          var RO_MOD_DESC = 'TURISMO';
                          $scope.datos.RO_TIP_OPE_A =[{"tipoOp":"Natural"}];
                          var RO_TIP_OPE = "Natural";
                          var RO_TIP_TAX = '';
                          var RO_TIP_SER = 'SPR';
                          var RO_SER_SPR = 'Turismo';
                        }else{
                          if($scope.modalidadId == 5 && $scope.tipo_persona == 'JURIDICO')
                          {
                            var RO_MOD_DESC = 'TURISMO';
                            $scope.datos.RO_TIP_OPE_A = [{"tipoOp":"Sindicato"},{"tipoOp":"Asociación"},{"tipoOp":"Cooperativa"},{"tipoOp":"Empresa"},{"tipoOp":"Otro"}];
                            var RO_TIP_OPE = "Sindicato";
                            var RO_TIP_TAX = '';
                            var RO_TIP_SER = 'SPR';
                            var RO_SER_SPR = 'Turismo';
                          }else{
                            if($scope.modalidadId == 6 && $scope.tipo_persona == 'NATURAL')
                            {
                              var RO_MOD_DESC = 'PERSONAL';
                              $scope.datos.RO_TIP_OPE_A =[{"tipoOp":"Natural"}];
                              var RO_TIP_OPE = "Natural";
                              var RO_TIP_TAX = '';
                              var RO_TIP_SER = 'SPR';
                              var RO_SER_SPR = 'Personal';
                            }
                            else{
                              if($scope.modalidadId == 6 && $scope.tipo_persona == 'JURIDICO')
                              {
                                var RO_MOD_DESC = 'PERSONAL';
                                $scope.datos.RO_TIP_OPE_A =[{"tipoOp":"Empresa"}];
                                var RO_TIP_OPE = "Empresa";
                                var RO_TIP_TAX = '';
                                var RO_TIP_SER = 'SPR';
                                var RO_SER_SPR = 'Personal';
                              }
                            }                          
                          }
                        }
                      }
                    } 
                  }
                }
              }
            }
          }
          var dataInicio = {"RO_MOD":$scope.modalidadId,"RO_MOD_DESC":RO_MOD_DESC,"RO_TIP_OPE_A":$scope.datos.RO_TIP_OPE_A,"RO_TIP_OPE":RO_TIP_OPE,"RO_TIP_TAX":RO_TIP_TAX,"RO_TIP_SER":RO_TIP_SER,"RO_SER_SPU":RO_SER_SPU,"RO_SER_SPR":RO_SER_SPR};
          var fecha= new Date();
          var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
          var sIdServicio = 12;
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
                $scope.tramitesCiudadano();
                sessionService.set('IDTRAMITE', response[0].sp_insertar_formulario_tramites);
                $.unblockUI();
                alertify.success('Tramite creado correctamente');
                $('#crearTramite').modal('hide');
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
          swal('', "Debe realizar las activaciones fisica y digital para poder realizar el trámite", 'warning');
        };
      }
    }
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
            $scope.datos.RO_OID = results[0]._id;
            $scope.datos.RO_NIT = results[0].dtspsl_nit;
            $scope.datos.RO_RZ = results[0].dtspsl_razon_social;
            $scope.datos.f01_zon_rep_valor = results[0].dtspsl_zona_desc;
            $scope.datos.RO_NRO_OF = results[0].dtspsl_numero_casa;
            $scope.datos.RO_CI_RL = results[0].dtspsl_ci_representante;
            $scope.datos.RO_MAC_ID_OF = results[0].dtspsl_macrodistrito;
            $scope.datos.RO_DIS_ID_OF = results[0].dtspsl_distrito;                      
            $scope.datos.RO_DIS_OF = results[0].dtspsl_distrito_desc;
            $scope.datos.RO_ZON_OF = results[0].dtspsl_zona_desc;   
            $scope.datos.RO_TIP_VIA_OF = results[0].dtspsl_tipo_via;
            $scope.datos.RO_POD_RL = results[0].dtspsl_poder_replegal;
            var poder = $scope.datos.RO_POD_RL.split('/');
            $scope.datos.RO_NUM_P = poder[0];
            $scope.datos.RO_GES_P = poder[1];   
            $scope.datos.RO_NOM_VIA_OF = results[0].dtspsl_nombre_via;   
            $scope.datos.RO_NUM_DOM_OF = results[0].dtspsl_numero_casa;   
            $scope.datos.RO_TIP_PER = results[0].dtspsl_tipo_persona;
            $scope.datos.RO_TEL_OF = results[0].dtspsl_telefono;
            $scope.datos.RO_NOT_RL = results[0].dtspsl_nro_notaria;
            $scope.datos.RO_FUM_EMP = results[0].dtspsl_file_fund_emp;
            $scope.datos.RO_NUM_IDEN = results[0].dtspsl_file_num_ident;
            $scope.datos.RO_PODER = results[0].dtspsl_file_poder_legal;
            $scope.datos.RO_TEST = results[0].dtspsl_file_test_const;
            var buscarRepresentante = new rcNatural();
            buscarRepresentante.tipo_persona = "NATURAL"
            buscarRepresentante.ci = $scope.datos.RO_CI_RL;
            buscarRepresentante.buscarPersona(function(res){
              var x = JSON.parse(res);
              console.log('111sss',x);
              if (x.error) {
                $.unblockUI();
              }else {
                if (x.length > 0) {
                  $scope.busquedaCiudadano = x[0];
                  $scope.datos.RO_NOM_RLJ = x[0].dtspsl_nombres;
                  $scope.datos.RO_PAT_RLJ = x[0].dtspsl_paterno;
                  $scope.datos.RO_MAT_RLJ = x[0].dtspsl_materno;
                  $scope.datos.RO_CAS_RLJ = x[0].dtspsl_tercer_apellido;
                  $scope.datos.RO_CEL_RLJ = x[0].dtspsl_movil;
                  $scope.datos.RO_TEL_RLJ = x[0].dtspsl_telefono;
                  $scope.datos.RO_CORR_RLJ = x[0].dtspsl_correo;
                  $scope.datos.RO_EXP_RLJ = x[0].dtspsl_expedido;   
                  $scope.datos.RO_CI_RLJ = x[0].dtspsl_ci;    
                  $scope.datos.RO_MAC_RLJ = x[0].dtspsl_macrodistrito_desc;
                  $scope.datos.RO_ZONA_ID_RLJ = x[0].dtspsl_zona_id;
                  $scope.datos.RO_ZONA_RLJ = x[0].dtspsl_zona_desc;
                  $scope.datos.RO_ZONAJ = x[0].dtspsl_zona;
                  $scope.datos.RO_TIP_VIA_RLJ = x[0].dtspsl_tipo_via; 
                  $scope.datos.RO_CALL_RLJ = x[0].dtspsl_nombre_via;
                  $scope.datos.RO_NRO_RLJ = x[0].dtspsl_numero_casa;
                  $scope.datos.RO_FEC_NAC_RLJ = x[0].dtspsl_fec_nacimiento;
                  $scope.datos.RO_CIJ = x[0].dtspsl_file_fotocopia_ci;
                  $scope.datos.RO_CI_RJ = x[0].dtspsl_file_fotocopia_ci_r;
                  if (x[0].dtspsl_file_fotocopia_ci!="") {
                    $scope.datos.RO_ARCH1 = CONFIG.APIURL + "/files/RC_CLI/"+x[0]._id+"/"+x[0].dtspsl_file_fotocopia_ci+"?app_name=todoangular";
                  }
                  if (x[0].dtspsl_file_fotocopia_ci_r!="") {
                    $scope.datos.RO_ARCH2 = CONFIG.APIURL + "/files/RC_CLI/"+x[0]._id+"/"+x[0].dtspsl_file_fotocopia_ci_r+"?app_name=todoangular";
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
            $scope.datos.RO_OID = results[0]._id;
            $scope.datos.RO_NOM_RL = results[0].dtspsl_nombres;
            $scope.datos.RO_PAT_RL = results[0].dtspsl_paterno;
            $scope.datos.RO_MAT_RL = results[0].dtspsl_materno;
            $scope.datos.RO_CAS_RL = results[0].dtspsl_tercer_apellido;
            $scope.datos.RO_CEL_RL = results[0].dtspsl_movil;
            $scope.datos.RO_TEL_RL = results[0].dtspsl_telefono;
            $scope.datos.RO_CORR_RL = results[0].dtspsl_correo;
            $scope.datos.RO_EXP_RL = results[0].dtspsl_expedido;   
            $scope.datos.RO_CI_RL = results[0].dtspsl_ci;    
            $scope.datos.RO_MAC_RL = results[0].dtspsl_macrodistrito_desc;
            $scope.datos.RO_MAC_ID_RL = results[0].dtspsl_macrodistrito;
            $scope.datos.RO_DIS_ID_RL = results[0].dtspsl_distrito;                      
            $scope.datos.RO_DIS_RL = results[0].dtspsl_distrito_desc;
            $scope.datos.RO_ZONA = results[0].dtspsl_zona;
            $scope.datos.RO_ZONA_RL = results[0].dtspsl_zona_desc;
            $scope.datos.RO_TIP_VIA_RL = results[0].dtspsl_tipo_via; 
            $scope.datos.RO_CALL_RL = results[0].dtspsl_nombre_via;
            $scope.datos.RO_NRO_RL = results[0].dtspsl_numero_casa;
            $scope.datos.RO_FEC_NAC_RL = results[0].dtspsl_fec_nacimiento;
            $scope.datos.RO_CI = results[0].dtspsl_file_fotocopia_ci;
            $scope.datos.RO_CI_R = results[0].dtspsl_file_fotocopia_ci_r;
            if (results[0].dtspsl_file_fotocopia_ci != "") {
              $scope.datos.RO_ARCH1 = CONFIG.APIURL + "/files/RC_CLI/"+results[0]._id+"/"+results[0].dtspsl_file_fotocopia_ci+"?app_name=todoangular";
            }
            if (results[0].dtspsl_file_fotocopia_ci_r != "") {
              $scope.datos.RO_ARCH2 = CONFIG.APIURL + "/files/RC_CLI/"+results[0]._id+"/"+results[0].dtspsl_file_fotocopia_ci_r+"?app_name=todoangular";
            }
          }
        }
      }else{
        console.log("NO EXISTE DATOS");
      }
    });
  };

  $scope.seleccionarTramite = function(data_tramite){
    $scope.datos.vtra_id = data_tramite.vtra_id;
    sessionService.set('IDTRAMITE',data_tramite.vtra_id);
    sw = 0;
    $scope.datosMostrar = 1;
    $scope.i = 1;
    $scope.swMostrar = 0;
    $scope.desabilita = false;
    $scope.desabilitaCon = true;
    $scope.desabilitaVeh = true;
    $scope.mostrar_form_ope = true;
    $scope.botonesGuardar = false;
    $scope.datos.RO_TIP_SOL = 1;
    $scope.datos.Tipo_tramite_creado = "WEB";
    $scope.idServicio = data_tramite.vdvser_id;
    $scope.idTramite = data_tramite.vtra_id;
    $scope.tramiteSeleccionado = data_tramite.vtra_id;
    if(data_tramite.venviado == 'SI'){
      $scope.desabilita = true;
    }
    if(data_tramite.form_contenido != null){
      var datosTram = JSON.parse(data_tramite.datos);
      $scope.datos.RO_TIP_OPE_A = datosTram.RO_TIP_OPE_A;
      $scope.datos.RO_TIP_OPE = datosTram.RO_TIP_OPE; 
      $scope.datos.RO_DEN = datosTram.RO_DEN;
      $scope.datos.RO_TIP_SER = datosTram.RO_TIP_SER;
      $scope.datos.RO_SER_SPU = datosTram.RO_SER_SPU;
      $scope.datos.RO_SER_SPR = datosTram.RO_SER_SPR;
      $scope.datos.RO_SER_EMC = datosTram.RO_SER_EMC;
      $scope.datos.RO_MOD = datosTram.RO_MOD;
      $scope.datos.RO_MOD_DESC = datosTram.RO_MOD_DESC;
      $scope.datos.RO_TEL_OF = datosTram.RO_TEL_OF;
      $scope.datos.RO_FRE_RAD = datosTram.RO_FRE_RAD;
      $scope.datos.RO_PLA_TEC = datosTram.RO_PLA_TEC;
      $scope.datos.RO_EN_VIA = datosTram.RO_EN_VIA;
      $scope.datos.RO_FRE = datosTram.RO_FRE;
      $scope.datos.RO_PLA = datosTram.RO_PLA; 
      $scope.datos.RO_TIP_TAX = datosTram.RO_TIP_TAX;
      $scope.datos.RO_UNI_EDU = datosTram.RO_UNI_EDU; 
      $scope.datos.RO_INS_TUR = datosTram.RO_INS_TUR; 
      $scope.datos.id_ope = datosTram.id_ope;
      $scope.datos.RO_PLA_V1 = datosTram.RO_PLA_V1;  
      $scope.datos.RO_TIP_V1 = datosTram.RO_TIP_V1;
      $scope.datos.RO_CLA_V1 = datosTram.RO_CLA_V1;
      $scope.datos.RO_MAR_V1 = datosTram.RO_MAR_V1;
      $scope.datos.RO_MOD_V1 = datosTram.RO_MOD_V1;
      $scope.datos.RO_COLOR_V1 = datosTram.RO_COLOR_V1;
      $scope.datos.RO_PUE_V1 = datosTram.RO_PUE_V1;
      $scope.datos.RO_ASI_V1 = datosTram.RO_ASI_V1;      
      $scope.datos.RO_RAD_V1 = datosTram.RO_RAD_V1;
      $scope.datos.RO_CI_P1 = datosTram.RO_CI_P1;
      $scope.datos.RO_EXP_P1 = datosTram.RO_EXP_P1;
      $scope.datos.RO_NOM_P1 = datosTram.RO_NOM_P1;      
      $scope.datos.RO_PAT_P1 = datosTram.RO_PAT_P1;
      $scope.datos.RO_MAT_P1 = datosTram.RO_MAT_P1;
      $scope.datos.RO_CEL_P1 = datosTram.RO_CEL_P1;
      $scope.datos.RO_MAC_P1 = datosTram.RO_MAC_P1;
      $scope.datos.RO_ZONA_P1 = datosTram.RO_ZONA_P1;      
      $scope.datos.RO_CALL_P1 = datosTram.RO_CALL_P1;
      $scope.datos.RO_NRO_P1 = datosTram.RO_NRO_P1;
      $scope.datos.RO_CI_POO1 = datosTram.RO_CI_POO1;
      $scope.datos.RO_EXP_POO1 = datosTram.RO_EXP_POO1;
      $scope.datos.RO_NOM_POO1 = datosTram.RO_NOM_POO1;      
      $scope.datos.RO_PAT_POO1 = datosTram.RO_PAT_POO1;
      $scope.datos.RO_MAT_POO1 = datosTram.RO_MAT_POO1;
      $scope.datos.RO_CEL_POO1 = datosTram.RO_CEL_POO1;
      $scope.datos.RO_MAC_POO1 = datosTram.RO_MAC_POO1;
      $scope.datos.RO_ZONA_POO1 = datosTram.RO_ZONA_POO1;      
      $scope.datos.RO_CALL_POO1 = datosTram.RO_CALL_POO1;
      $scope.datos.RO_NRO_POO1 = datosTram.RO_NRO_POO1;
      $scope.datos.RO_EXP_C1 = datosTram.RO_EXP_C1;
      $scope.datos.PLACA1  = datosTram.PLACA1;
      $scope.datos.RO_NOM_C1 = datosTram.RO_NOM_C1;
      $scope.datos.RO_PAT_C1 = datosTram.RO_PAT_C1;
      $scope.datos.RO_MAT_C1 = datosTram.RO_MAT_C1;
      $scope.datos.RO_TEL_C1 = datosTram.RO_TEL_C1;
      $scope.datos.RO_CORR_C1 = datosTram.RO_CORR_C1;
      $scope.datos.RO_CEL_C1 = datosTram.RO_CEL_C1;
      $scope.datos.RO_MAC_C1 = datosTram.RO_MAC_C1;
      $scope.datos.RO_ZONA_C1 = datosTram.RO_ZONA_C1;
      $scope.datos.RO_CALL_C1 = datosTram.RO_CALL_C1;
      $scope.datos.RO_NRO_C1 = datosTram.RO_NRO_C1;
      $scope.datos.RO_CAT_C1 = datosTram.RO_CAT_C1;
      $scope.datos.RO_TIP_C1 = datosTram.RO_TIP_C1;
      $scope.datos.RO_CI_C1 = datosTram.RO_CI_C1; 
      $scope.datos.RO_ASI_VE1 = datosTram.RO_ASI_VE1; 
      $scope.datos.RO_INS_OPE = datosTram.RO_INS_OPE; 
      if(datosTram.fileArRequisitos != undefined){
        $scope.fileArRequisitos =  datosTram.fileArRequisitos;
      }else{
        $scope.fileArRequisitos = {};
      }
    }else{
      $scope.datos.RO_TIP_OPE = ''; 
      $scope.datos.RO_DEN = '';
      $scope.datos.RO_TIP_SER = '';
      $scope.datos.RO_SER_SPU = '';
      $scope.datos.RO_SER_SPR = '';
      $scope.datos.RO_SER_EMC = '';
      $scope.datos.RO_MOD = '';
      $scope.datos.RO_TEL_OF = '';
      $scope.datos.RO_FRE_RAD = '';
      $scope.datos.RO_PLA_TEC = '';
      $scope.datos.RO_EN_VIA = '';
      $scope.datos.RO_FRE = '';
      $scope.datos.RO_PLA = ''; 
      $scope.datos.RO_TIP_TAX = '';
      $scope.datos.id_ope = ''; 
      $scope.fileArRequisitos = {};
      $scope.datos.RO_PLA_V1 = '';  
      $scope.datos.RO_TIP_V1 = '';
      $scope.datos.RO_CLA_V1 = '';
      $scope.datos.RO_MAR_V1 = '';
      $scope.datos.RO_MOD_V1 = '';
      $scope.datos.RO_COLOR_V1 = '';
      $scope.datos.RO_PUE_V1 = '';
      $scope.datos.RO_ASI_V1 = '';      
      $scope.datos.RO_RAD_V1 = '';
      $scope.datos.RO_CI_P1 = '';
      $scope.datos.RO_EXP_P1 = '';
      $scope.datos.RO_NOM_P1 = '';      
      $scope.datos.RO_PAT_P1 = '';
      $scope.datos.RO_MAT_P1 = '';
      $scope.datos.RO_CEL_P1 = '';
      $scope.datos.RO_MAC_P1 = '';
      $scope.datos.RO_ZONA_P1 = '';      
      $scope.datos.RO_CALL_P1 = '';
      $scope.datos.RO_NRO_P1 = '';
      $scope.datos.RO_CI_POO1 = '';
      $scope.datos.RO_EXP_POO1 = '';
      $scope.datos.RO_NOM_POO1 = '';      
      $scope.datos.RO_PAT_POO1 = '';
      $scope.datos.RO_MAT_POO1 = '';
      $scope.datos.RO_CEL_POO1 = '';
      $scope.datos.RO_MAC_POO1 = '';
      $scope.datos.RO_ZONA_POO1 = '';      
      $scope.datos.RO_CALL_POO1 = '';
      $scope.datos.RO_NRO_POO1 = '';
      $scope.datos.RO_EXP_C1 = '';
      $scope.datos.PLACA1 = '';
      $scope.datos.RO_NOM_C1 = '';
      $scope.datos.RO_PAT_C1 = '';
      $scope.datos.RO_MAT_C1 = '';
      $scope.datos.RO_TEL_C1 = '';
      $scope.datos.RO_CORR_C1 = '';
      $scope.datos.RO_CEL_C1 = '';
      $scope.datos.RO_MAC_C1 = '';
      $scope.datos.RO_ZONA_C1 = '';
      $scope.datos.RO_CALL_C1 = '';
      $scope.datos.RO_NRO_C1 = '';
      $scope.datos.RO_CAT_C1 = '';
      $scope.datos.RO_TIP_C1 = '';
      $scope.datos.RO_CI_C1 = '';
      $scope.datos.RO_ASI_VE1 = '';
      $scope.datos.RO_INS_OPE = '';
    }
    $scope.limpiarUbi();
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
    document.getElementById('gu').disabled=true;
    $scope.datosMostrar = $scope.i; 
    $scope.datosOperador = {'id_ope':$scope.datos.id_ope};
  }

  $scope.listaDatos = function(){
    if($scope.datos.RO_MOD == 1){
      $scope.lstOficinasDatos();
    }else{
      $scope.lstRequisitosOpe();
    }
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
    var denominacion = $scope.datos.RO_DEN;
    var tipoOperador = document.getElementById("RO_TIP_OPE").options[document.getElementById("RO_TIP_OPE").selectedIndex].text;
    var modalidad = $scope.datos.RO_MOD;
    console.log($scope.datos.RO_UNI_EDU,'unidad');
    var datos = {
      'RO_TIP_SER_VALUE':$scope.datos.RO_TIP_SER,
      'RO_TIP_SER':document.getElementById("RO_TIP_SER").options[document.getElementById("RO_TIP_SER").selectedIndex].text,
      'RO_SER_SPU_VALUE':$scope.datos.RO_SER_SPU,       
      'RO_SER_SPU':document.getElementById("RO_SER_SPU").options[document.getElementById("RO_SER_SPU").selectedIndex].text, 
      'RO_SER_SPR_VALUE':$scope.datos.RO_SER_SPR,       
      'RO_SER_SPR':document.getElementById("RO_SER_SPR").options[document.getElementById("RO_SER_SPR").selectedIndex].text,  
      'RO_SER_EMC_VALUE':$scope.datos.RO_SER_EMC,       
      'RO_SER_EMC':document.getElementById("RO_SER_EMC").options[document.getElementById("RO_SER_EMC").selectedIndex].text,
      'RO_MOD_VALUE':$scope.datos.RO_MOD,       
      'RO_MOD':document.getElementById("RO_MOD").options[document.getElementById("RO_MOD").selectedIndex].text,
      'RO_TEL_OF':$scope.datos.RO_TEL_OF,       
      'RO_FRE_RAD':$scope.datos.RO_FRE_RAD,       
      'RO_PLA_TEC':$scope.datos.RO_PLA_TEC,       
      'RO_EN_VIA':$scope.datos.RO_EN_VIA,         
      'RO_FRE':$scope.datos.RO_FRE,       
      'RO_PLA':$scope.datos.RO_PLA ,
      'RO_TIP_TAX_VALUE':$scope.datos.RO_TIP_TAX ,
      'RO_TIP_TAX':document.getElementById("RO_TIP_TAX").options[document.getElementById("RO_TIP_TAX").selectedIndex].text,
      'RO_UNI_EDU' : $scope.datos.RO_UNI_EDU,
      'RO_INS_OPE' : $scope.datos.RO_INS_OPE,
      'RO_INS_TUR' : $scope.datos.RO_INS_TUR,
    }
    datos = JSON.stringify(datos);
    datosRepresentante = JSON.stringify(datosRepresentante);
    var operadorD = new operador();  
    operadorD.rz = razonSocial;
    operadorD.denominacion = denominacion;    
    operadorD.tipooperador = tipoOperador;
    operadorD.nit = nit;
    operadorD.datosope = datos;
    operadorD.datosreq = '{}';
    operadorD.datosrev = '{}';
    operadorD.id_usr  = 1;
    operadorD.operadorInsert(function(results){
      results = JSON.parse(results);
      $scope.datosOperador = results.success.data[0];
      $scope.datos.id_ope = $scope.datosOperador.id_ope;
      if(Object.keys($scope.datosOperador).length >0){
        var rep = new representante();
        rep.op_id   = $scope.datosOperador.id_ope;   
        rep.ci_repr = ci; 
        rep.datos   = datosRepresentante;  
        rep.usr_id  = 1;    
        rep.persona = $scope.tipo_persona;
        rep.oidciudadano = $scope.oidCiu;
        rep.representanteInsert(function(results){
          if($scope.tipo_persona == 'NATURAL' && $scope.datos.RO_MOD!=1){
            $scope.lstRequisitosOpe();  
            var req = new listaRequisitos(); 
            req.tipo = 'DOC_VEHICULOS';
            req.lstRequisitos(function(data){
              $scope.requisitosVehiculo = JSON.parse(data).success.data;
              $scope.datos.fileRequisitosVeh = {};
            });
            var req = new listaRequisitos(); 
            req.tipo = 'DOC_CONDUCTOR';
            req.lstRequisitos(function(data){
              $scope.requisitosConductor = JSON.parse(data).success.data;
              $scope.datos.fileRequisitosCond = {};
            })
            setTimeout(function(){
              iniciarLoadFyle();
            }, 1000); 
            $scope.botonesGuardar = true;        
          }else{
            if($scope.datos.RO_MOD==1){
              $scope.lstOficinasDatos();
              $scope.botonO = 'new';
            }else{
              $scope.lstRequisitosOpe();  
            } 
          }
        })
      }
    });
  }

  $scope.muestraDatos = function(denominacion){
    if(denominacion == 1){
      $scope.datos.RO_TIP_SER = 'SPU';
      $scope.datos.RO_SER_SPU = 'IEX';
    }
    if(denominacion == 2){
      $scope.datos.RO_TIP_SER = 'SPU';
      $scope.datos.RO_SER_SPU = 'IEX';
    }
  }

  $scope.validaModalidad = function(){
    var tipo = $scope.datos.RO_TIP_OPE;
    if(tipo == 'Natural'){
      $scope.datos.RO_MOD = '2';
      $scope.datos.RO_TIP_TAX = '2';
      $scope.datos.RO_TIP_SER = 'SPU';
      $scope.datos.RO_SER_SPU = 'IEX';
      $scope.escondeTipo = true;
    }
    if(tipo == 'Sindicato'){
      $scope.datos.RO_MOD = '2';
      $scope.datos.RO_TIP_TAX = '1';
      $scope.datos.RO_TIP_SER = 'SPU';
      $scope.datos.RO_SER_SPU = 'IEX';
      $scope.escondeTipo = false;
    }
    if(tipo != 'Sindicato' && tipo != 'Natural'){
      $scope.datos.RO_MOD = '1';
      $scope.datos.RO_TIP_TAX = '';
      $scope.datos.RO_TIP_SER = 'SPU';
      $scope.datos.RO_SER_SPU = 'IEX';
      $scope.escondeTipo = true;
    }
  }

  $scope.listaMod = function(){
    var mod = new listaModalidad();
    mod.lstModalidad(function(results){
      $scope.modalidadDat = JSON.parse(results).success.data;
    })
  }

  $scope.validaCelular = function (cel,id, campo){
    var numerocel = /^[6-7]{1}[0-9]{7}/;
    if (cel>99999999) {
      if(!numerocel.test(cel)){
        $("#"+campo).val(''); 
        console.log("ghjkk"); 
      }else{
        var nvocel = Math.floor(cel / 10);
        $("#"+campo).val(nvocel);

      //$scope.datos.RO_CEL_P1=1;
        cel = nvocel;
        console.log(cel);
      }
    }
    

    //console.log(id, e);
    if (numerocel.test(cel) && (cel > 9999999) && cel<100000000) {
      valCel = 0;
      console.log(cel);
      console.log(id);
      //document.getElementById("valida20").value('bien');
      $("#"+id).show();      //$("#valida20").val('ccc');
    } else {
      $("#"+id).hide();

      //$("#valida20").val('yui');
      valCel = 1;
    };
  }

  $scope.celMaxDig = function(cel, campo){
    if (cel>99999999) {
      var nvocel = Math.floor(cel / 10);
      $("#"+campo).val(nvocel);

      //$scope.datos.RO_CEL_P1=1;
      cel = nvocel;
      console.log(cel);
    }
  }

//*****************Oficinas******************************
  $scope.validaOperador = function(){
    if(($scope.datos.RO_TIP_OPE != '' && $scope.datos.RO_TIP_OPE != undefined) && ($scope.datos.RO_DEN != '' && $scope.datos.RO_DEN != undefined) && ($scope.datos.RO_MOD != '' && $scope.datos.RO_MOD!= undefined)){
      $scope.guardar_tramite($scope.datos);
      $scope.siguiente();
      $scope.ver();
      $scope.datos.rdTipoTramite1 = 'CON PUBLICIDAD';
      $scope.publicidad = true;
      $scope.botonn="new";
      $scope.open_mapa_ae();
    }else{
      swal("", "Datos obligatorios, verifique los datos del formulario", "warning");
    }
  }


  ///////////////////****MAPA GIS*****/////////////////////////
  $scope.open_mapa_ae = function()
  {
    setTimeout(function()
    {
        console.log("ENTRANDO AL MAPA DE ACTIVIDADES ECONOMICAS");
        console.log($scope.datos,111111111111);
        //map.removeLayer(vectorLayer_inci_baja);
        $("#map_principal").empty();
        $scope.map = new ol.Map
        ({
          target: 'map_principal',
          layers: [
                    new ol.layer.Group({
                                        title: 'Mapas Base',
                                        layers: [
                                                  osm,
                                                  municipios,
                                                  zonas_tributarias,
                                                  vias  
                                                ]
                                      }),
                    new ol.layer.Group({
                                        title: 'Capas',
                                        layers: [
                                                  //macrodistritos,
                                                  vectorLayerZonas,
                                                  vectorLayer
                                                ]
                                      })
                  ],

          view: new ol.View({
            zoom: 16,
            center: ol.proj.fromLonLat([-68.133555,-16.495687])
          })
        });
          
        var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: 'Leyenda'});
        $scope.map.addControl(layerSwitcher);

        $scope.map.on('click', function (evt)
        {
            datos = {};
            vectorSource.clear();
            if(jsonURLS)
            {
                var url_sit    =   jsonURLS.SIT_GEO;
                //console.log('INTERMEDIO EN MAPA-----',url_sit);
            }
            var url_r = url_sit+'/geoserver/wms';
            //console.log("URL PARA RIESGOS",url_r);

            var viewResolution = view.getResolution();

            var WMSsource_z = new ol.source.ImageWMS({
                ratio: 1,
                url: url_r,
                params: {
                          'FORMAT': 'image/png',
                          'VERSION': '1.1.1',
                          'LAYERS': 'sit:zonasgu2016',
                          'TILED': true 
                        }
            });
            var url_z = WMSsource_z.getGetFeatureInfoUrl(
                                                      evt.coordinate, viewResolution, view.getProjection(),
                                                      { 'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50  ,format_options: 'callback: getJson'}
            );

            var WMSsource_zt = new ol.source.ImageWMS({
                ratio: 1,
                url: url_r,
                params: {
                          'FORMAT': 'image/png',
                          'VERSION': '1.1.1',
                          'LAYERS': 'catastro:zonasvalor2015',
                          'TILED': true 
                        }
            });
            var url_zt = WMSsource_zt.getGetFeatureInfoUrl(
                                                      evt.coordinate, viewResolution, view.getProjection(),
                                                      { 'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50  ,format_options: 'callback: getJson'}
            );

            var WMSsource_v = new ol.source.ImageWMS({
                ratio: 1,
                url: url_r,
                params: {
                          'FORMAT': 'image/png',
                          'VERSION': '1.1.1',
                          'LAYERS': 'catastro:vias2',
                          'TILED': true 
                        }
            });
            var url_v = WMSsource_v.getGetFeatureInfoUrl(
                                                      evt.coordinate, viewResolution, view.getProjection(),
                                                      { 'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50  ,format_options: 'callback: getJson'}
            );

            var coord = $scope.map.getCoordinateFromPixel(evt.pixel);
            var centro = ol.proj.transform(coord,'EPSG:3857',epsg32719);
            var wkt = '';
            var centro_1 = ol.proj.transform(coord,'EPSG:3857',epsg4326);
            var latitud = centro_1[1];
            var longitud = centro_1[0];
            wkt = "POINT("+centro[0]+" "+centro[1]+")";

            $scope.datos.latitud = latitud;
            $scope.datos.longitud = longitud;

            $scope.latitud = latitud;
            $scope.longitud = longitud;
          
            var url = url_sit+'/geoserver/sit/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sit:zonasref&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(wkb_geometry,'+ wkt +')';   
            
            console.log ("latitud: ",latitud);
            console.log ("longitud: ",longitud);
         
            setTimeout(function()
            {
                $.ajax({
                          url: url_z,
                          //data: parameters,
                          type: 'GET',
                          dataType: 'jsonp',
                          jsonpCallback: 'getJson',
                          success: function (data)
                          {
                            //console.log('OK.....', data);
                            if(data.features.length == 1)
                            {                         
                              var distrito = data.features[0].properties.distrito;
                              $scope.datos.RO_MAC_OF = data.features[0].properties.macro;
                              $scope.distritoZonas($scope.datos.RO_MAC_OF);
                              var macrodistrito =  data.features[0].properties.macrodistrito;                                                  
                              var zona = data.features[0].properties.zona;
                              $scope.datos.RO_ZONA_OF_VALUE = zona.toUpperCase();
                              var codigo_zona = data.features[0].properties.codigozona;
                              $scope.datosMapa.distrito = distrito;
                              $scope.$apply();
                              $scope.datosMapa.macrodistrito = macrodistrito;
                              $scope.datosMapa.zona = zona;
                              $scope.datosMapa.cod_zona_sit = codigo_zona;
                              var n_genesis = geo_id_genesis.length;
                              for (var i=0;i<n_genesis;i++)
                              {
                                if(geo_id_sit_servicio[i ]=== codigo_zona )
                                {
                                  cod_zona_genesis = geo_id_genesis[i];
                                  $scope.datosMapa.cod_zona_genesis = cod_zona_genesis;
                                }
                              }

                              setTimeout(function()
                              {
                                $.ajax({
                                        type: "POST",
                                        url:url_zt,
                                        dataType: 'jsonp',
                                        jsonpCallback: 'getJson',
                                        success: function (data) 
                                        {
                                          var c = data.features.length;
                                          //console.log(data.features);
                                          if(c==1)
                                          {
                                            var cod_zona_t = data.features[0].properties.grupovalor;
                                            cod_zona_t = cod_zona_t.replace("-","");
                                            var cod_zona_tributaria = parseInt(cod_zona_t);
                                            $scope.datos.codigo_zona_tributaria = cod_zona_tributaria;
                                            $scope.datosMapa.codigo_zona_tributaria = cod_zona_tributaria;
                                            setTimeout(function()
                                            {
                                              $.ajax({
                                                      type: "POST",
                                                      url:url_v,
                                                      dataType: 'jsonp',
                                                      jsonpCallback: 'getJson',
                                                      success: function (data) 
                                                      {
                                                        var c = data.features.length;
                                                        //console.log(data.features);
                                                        if(c==1)
                                                        {
                                                          var id_via = data.features[0].properties.idvias;
                                                          var nombre_via = data.features[0].properties.nombrevia;
                                                          var tipo_via = data.features[0].properties.tipovia;
                                                          $scope.datosMapa.nombre_via = nombre_via;
                                                          $scope.datosMapa.tipo_via = tipo_via;
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
                                                          $scope.$apply();
                                                        }
                                                        else
                                                        {
                                                          console.log("ningun resultado para vias");
                                                        }
                                                      }
                                                    });
                                            },50);
                                          }
                                          else
                                          {
                                            console.log("ningun resultado para zona tributaria");
                                          }
                                        }
                                      });
                              },100);
                            }
                            else
                            {
                              console.log("ningun resultado para zonas");
                            }
                          },
                          error: function (data)
                          { 
                            console.log(data);
                          }   
                      });
            },200);
        
            var feature = new ol.Feature(
                  new ol.geom.Point(ol.proj.fromLonLat(centro_1))
            );
                
            feature.setStyle(iconStyle);
            vectorSource.addFeature(feature);
            $scope.$apply();
            console.log($scope.datosMapa);
            return $scope.datosMapa;
        });
        //////////////////////////////////////
    },550);
  };

  $scope.buscar_ubicacion_p = function()
  {
    var nombre_1 = new Array();
    var f = '';
    var nombre = document.getElementById('busqueda_p').value;
    nombre = nombre.toUpperCase();
    var ca = "CALLE ";
    ca = ca.concat(nombre);
    var c = 0;
    /////////////////////////////
    var tipo = "lugares";
    var data = '';
    ///////////////////////////////
    if(nombre==='')
    {
      var obj = {'nombre':'INTRODUZCA DATOS!!!...'};
      console.log("Vacio :",obj);
      //map.removeLayer(vectorLayerZonas);
      vectorLayerZonas.getSource().clear();
    }
    else
    {  
      if(tipo == 'lugares')
      {
        $scope.map.removeLayer(vectorLayerZonas);
        for (var i=0;i<geo_zonas.features.length;i++)
        {
          var nombre_zona =  geo_zonas.features[i].properties.zonaref;
          var x_c = geo_zonas_centroides.features[i].geometry.coordinates[0];
          var y_c = geo_zonas_centroides.features[i].geometry.coordinates[1];
          if(nombre === nombre_zona)
          {
            c=c+1;
            var geo_zona =  geo_zonas.features[i];
            var xx = x_c;
            var yy = y_c;
          }
        }
        if(c>0)
        {
          //alert("mapa_principal");
          geo_zona = JSON.stringify(geo_zona);
          vectorLayerZonas.setSource(new ol.source.Vector({
                                                       features: (new ol.format.GeoJSON({defaultDataProjection:'EPSG:3857'})).readFeatures(geo_zona)
          }));

          vectorLayerZonas.setStyle(myStyleZonas);

          $scope.map.addLayer(vectorLayerZonas);
          $scope.map.getView().setCenter([xx,yy]);
          $scope.map.getView().setZoom(15);

          setTimeout(function(){
            //alert();
            vectorLayerZonas.getSource().clear();
          },2400);

        }
      }
      if(c==0)
      {
        var obj = {'nombre':'NO EXISTEN REGISTROS!!!'};
        console.log("Vacio :",obj);
      }
    }   
  };
  /////////////////////////////////////////////////////////////
  $scope.adiModOficinas = function(id,opc){
    $.blockUI();
    $scope.buscaOficinas();
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
        $scope.capturarImagen($scope.datos.RO_MAC_OF_VALUE);
        for (var i = 0; i<$scope.aMacrodistritos.length ; i++) {
          if($scope.aMacrodistritos[i].mcdstt_id==$scope.datos.RO_MAC_OF){
            $scope.datos.RO_MAC_OF_VALUE = $scope.aMacrodistritos[i].mcdstt_macrodistrito;
          }
        }
        $scope.distritoZonas($scope.datos.RO_MAC_OF);
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
              datosOf = JSON.stringify(datosOf);
              viae = JSON.stringify(viae);
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
              })
            }else{
              var mens = "Ya existe una Oficina en el Macrodistrito "+$scope.datos.RO_MAC_OF_VALUE;
              swal("",mens, "warning");
            }
          }
          else{
            if($scope.datos.RO_MOD != 1){
              datosOf = JSON.stringify(datosOf);
              viae = JSON.stringify(viae);
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
              })
            }
            else{
              swal("", "Para el caso de Radio Taxi debe registrar por lo menos un Elemento de Identificación", "warning");  
            }
          }
        }
      }
      else{
        swal("", "Datos obligatorios, verifique los datos del formulario", "warning"); 
      }
    }
    else{
      swal("", "Solo se puede registrar una sola matriz", "warning"); 
    }
    $.unblockUI();
  }

  $scope.cerrar = function (){
    $scope.botonO = 'new';
    $scope.botonC = 'd';
    $scope.limpiarUbi();
  }

  $scope.datosModOficina = function (dataOfic){
    $scope.datos.RO_TIP_ACT = dataOfic.ofi_datos.RO_TIP_ACT;
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
    $scope.idOfi = dataOfic.ofi_id;  
    $scope.macrodistritos();
    $scope.distritoZonas($scope.datos.RO_MAC_OF_VALUE); 
    $scope.datos.publicidad = dataOfic.ofi_viae;
    $scope.publicid = dataOfic.ofi_viae;
    $scope.botonO = 'upd';
    $scope.botonc = 'c';
  }

  $scope.limpiarUbi = function (dataOfic){
    $scope.datos.RO_TIP_ACT = '';
    $scope.datos.RO_MAC_OF_VALUE = '';
    $scope.datos.RO_ZONA_OF_VALUE = '';    
    $scope.datos.RO_MAC_OF = '';
    $scope.datos.RO_ZONA_OF = '';
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
    $scope.datos.codigo_zona_tributaria = '';
    $scope.lssubcategoria();
  }

  $scope.lstOficinasDatos = function (){
    var ofi = new listaOficinas(); 
    ofi.idope = $scope.datosOperador.id_ope;
    ofi.lstOficinas(function(data){
      data = JSON.parse(data).success.data;
      $scope.objOficinas = data;
      $scope.tablaOficinas.reload();      
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

  $scope.eliOficina = function(id){
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
      var ofic = new ubicacion();
      ofic.id = id; 
      ofic.idope = $scope.datosOperador.id_ope;
      ofic.oficina = ''; 
      ofic.datos = ''; 
      ofic.revision = '{}'; 
      ofic.viae = ''; 
      ofic.usr = 1; 
      ofic.opcion = 'E';
      ofic.datosOficina(function(results){
        results = JSON.parse(results).success.data[0].sp_abm_operador_oficina;
        if(results == 'Eliminado'){
          swal("Eliminado!", "Se elimino correctamente.", "success");
        }
        $scope.lstOficinasDatos();
      })
    });
  }

  $scope.buscaOficinas = function(){
    var ofic = new buscaOficinas();
    ofic.idope = $scope.datosOperador.id_ope;
    ofic.buscaOficinasOperador(function(results){
      $scope.datosOfiR = JSON.parse(results).success.data;
    })
  }

  $scope.validaOficinas = function(){
    if($scope.objOficinas.length > 0){
      $scope.guardar_tramite($scope.datos);
      $scope.lstRequisitosOpe();
      $scope.ver();
    }
    else{
      swal("", "Debe registrar por lo menos una oficina", "warning"); 
    }
  }

//********************************************************
//******************Requisitos***********************
  $scope.lstRequisitosOpe = function (){
    var req = new listaRequisitos(); 
    req.tipo = $scope.datos.RO_MOD_DESC;
    req.lstRequisitos(function(data){
      $scope.requisitosAdj = JSON.parse(data).success.data;
      var datoObjectFinal = [];
      var k=0;
      for(j=0; j<$scope.requisitosAdj.length; j++){
        console.log($scope.requisitosAdj[j].req_ope_natural,$scope.datos.RO_TIP_OPE);
        if($scope.requisitosAdj[j].req_ope_natural==$scope.datos.RO_TIP_OPE || $scope.requisitosAdj[j].req_ope_sindicato==$scope.datos.RO_TIP_OPE || 
          $scope.requisitosAdj[j].req_ope_empresa==$scope.datos.RO_TIP_OPE || $scope.requisitosAdj[j].req_ope_cooperativa==$scope.datos.RO_TIP_OPE ||
          $scope.requisitosAdj[j].req_ope_asociacion==$scope.datos.RO_TIP_OPE || $scope.requisitosAdj[j].req_ope_otro == $scope.datos.RO_TIP_OPE){
          datoObject = new Object();
          datoObject.resid = $scope.requisitosAdj[j].req_id;
          datoObject.resvalor = $scope.requisitosAdj[j].req_descripcion;
          datoObjectFinal[k] = datoObject;
          k++;
        }
      }
      $scope.docArray =   datoObjectFinal;
      console.log($scope.docArray,'docarray');
      $scope.datosAdj = [];
      setTimeout(function(){
        iniciarLoadFyle();
      }, 1000);
    })
  }

  $scope.ejecutarFile = function(idfile){
    $scope.reqVehiculo = 1;
    $scope.reqConductor = 1;
    var sid =   document.getElementById(idfile);
    if(sid){
        document.getElementById(idfile).click();
    }else{
        alert("Error ");
    }
  };

  $scope.ejecutarFileVehiculo = function(idfile){
    var sid =   document.getElementById(idfile);
    $scope.reqVehiculo = 0;
    $scope.reqConductor = 1;
    if(sid){
        document.getElementById(idfile).click();
    }else{
        alert("Error ");
    }
  };

  $scope.ejecutarFileConductor = function(idfile){
    var sid =   document.getElementById(idfile);
    $scope.reqConductor = 0;
    $scope.reqVehiculo = 1;
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
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "Movilidad/" + $scope.oidCiudadano;
    var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
    $.blockUI();
    angular.forEach(aArchivos, function(archivo, key) {
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
            if (imagenNueva[imagenNueva.length-1] == 'png' || imagenNueva[imagenNueva.length-1] == 'jpg' || imagenNueva[imagenNueva.length-1] == 'jpeg' || imagenNueva[imagenNueva.length-1] == 'bmp' || imagenNueva[imagenNueva.length-1] == 'gif' || imagenNueva[imagenNueva.length-1] == 'pdf' || imagenNueva[imagenNueva.length-1] == 'docx' || imagenNueva[imagenNueva.length-1] == 'docxlm' || 
              imagenNueva[imagenNueva.length-1] == 'PNG' || imagenNueva[imagenNueva.length-1] == 'JPG' || imagenNueva[imagenNueva.length-1] == 'JPEG' || imagenNueva[imagenNueva.length-1] == 'BMP' || imagenNueva[imagenNueva.length-1] == 'GIF' || imagenNueva[imagenNueva.length-1] == 'PDF' || imagenNueva[imagenNueva.length-1] == 'DOCX' || imagenNueva[imagenNueva.length-1] == 'DOCXLM') {
                $scope.documentosarc[key] = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/"  + "/" + nombreFileN + "?app_name=todoangular";
                fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                $.unblockUI();
            } else{
              console.log(imagenNueva[1]);
              if (imagenNueva[imagenNueva.length-1] == 'pdf' ||  imagenNueva[imagenNueva.length-1] == 'docx' ||  imagenNueva[imagenNueva.length-1] == 'docxlm' ||
                imagenNueva[imagenNueva.length-1] == 'PDF' ||  imagenNueva[imagenNueva.length-1] == 'DOCX' ||  imagenNueva[imagenNueva.length-1] == 'DOCXLM' ) {
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
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    var sDirTramite = sessionService.get('IDTRAMITE');
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

  $scope.guardaRequisitos = function (){
    $scope.guardar_tramite($scope.datos);
    var reqOpe = new requisitosOperador();
    reqOpe.id = $scope.datosOperador.id_ope; 
    reqOpe.datosreq = JSON.stringify($scope.fileArRequisitos);
    reqOpe.actualizarReqOperador(function(results){
      if($scope.tipo_persona == 'JURIDICO' || $scope.datos.RO_MOD == 1){
        $scope.botonesGuardar = true;
      }
      console.log(results);
    })
  }
//********************Fin Requisitos*******************************

//*********************vehiculo************************************
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
      $scope.desabilitaVeh = true;
      valPlaca = 1;
    };
  }

  $scope.validaPlaca1 = function (campo){
    campo = campo.toUpperCase();
    emailRegex = /^[0-9]{3,4}[A-Z]{3}$/;
    if (emailRegex.test(campo)) {
      valPlaca = 0;
      $("#valida11").show();
      $("#validax").hide();
    } else {
      $("#valida11").hide();
      $("#validax").show();
      valPlaca = 1;
    };
  }

  $scope.listaVeh = function (){
    var idOpe = $scope.datosOperador.id_ope;
    var veh = new listaVehiculo();
    veh.ope_id = idOpe; 
    veh.lstVehiculo(function(data){
      data = JSON.parse(data).success.data;
      for (var i = 0; i < data.length; i++) {
        data[i].nro = i+1;
      }
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
      var orderedData = params.filter() ?
      $filter('filter')($scope.objVehiculos, params.filter()) :
      $scope.objVehiculos;
      params.total(orderedData.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.validaTabPoo = function(){
    $scope.valida = 'active';
    $scope.valida2 = '';
  }

  $scope.crear =function(acc){
    $scope.valida = 'active';
    $scope.valida2 = '';
    $scope.valid = true;
    $scope.valid2 = false;
    $("#valida1").hide();
    $("#valida").hide();
    $("#validaMN").hide();
    $scope.getComboClaseMovilidad();
    if(acc == 1){
      $scope.tituloVehiculo = "REGISTRAR NUEVO VEHICULO";
      $scope.botonV = "nu";
      $scope.desabilitaVeh = true;
      var req = new listaRequisitos(); 
      req.tipo = 'DOC_VEHICULOS';
      req.lstRequisitos(function(data){
        $scope.requisitosVehiculo = JSON.parse(data).success.data;
        setTimeout(function(){
          iniciarLoadFyle();
        }, 1000); 
        $scope.datos.fileRequisitosVeh = {};
      })
    }
    else{
      $scope.tituloVehiculo = "MODIFICAR DATOS DEL VEHICULO";
      $scope.botonV = "upd";
      $scope.desabilitaVeh = false;
    }
  }

  $scope.getComboClaseMovilidad = function(){
    var clase = new claseVehiculo();
    clase.tipo = $scope.datos.RO_MOD_DESC;
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
      var datosVeh = new vehiculo();
      datosVeh.id =  id; 
      datosVeh.ope_id = $scope.datosOperador.id_ope;
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
        $scope.listaVeh(1);
      })
    });
  }

  $scope.adiModVehiculo = function(id,opcion){
    console.log($scope.datos,'datos');
    if($scope.datos.RO_PLA_V!='' && $scope.datos.RO_PLA_V!=undefined && $scope.datos.RO_TIP_V!='' && $scope.datos.RO_TIP_V!=undefined
      && $scope.datos.RO_CLA_V!=''&&$scope.datos.RO_CLA_V!=undefined && $scope.datos.RO_MAR_V!='' && $scope.datos.RO_MAR_V!=undefined
      && $scope.datos.RO_MOD_V!=''&&$scope.datos.RO_MOD_V!=undefined && $scope.datos.RO_COLOR_V!='' && $scope.datos.RO_COLOR_V!=undefined
      && $scope.datos.RO_PUE_V!=''&&$scope.datos.RO_PUE_V!=undefined 
      && $scope.datos.RO_RAD_V!=''&&$scope.datos.RO_RAD_V!=undefined && $scope.datos.RO_CI_P!='' && $scope.datos.RO_CI_P!=undefined
      && $scope.datos.RO_EXP_P!=''&&$scope.datos.RO_EXP_P!=undefined && $scope.datos.RO_NOM_P!=''&&$scope.datos.RO_NOM_P!=undefined
      && $scope.datos.RO_CEL_P!=''&&$scope.datos.RO_CEL_P!=undefined && $scope.datos.RO_MAC_P!='' && $scope.datos.RO_MAC_P!=undefined
      && $scope.datos.RO_CALL_P!='' && $scope.datos.RO_CALL_P!=undefined
      && $scope.datos.RO_NRO_P!=''&&$scope.datos.RO_NRO_P!=undefined && $scope.datos.RO_CI_POO!='' && $scope.datos.RO_CI_POO!=undefined
      && $scope.datos.RO_EXP_POO!=''&&$scope.datos.RO_EXP_POO!=undefined && $scope.datos.RO_NOM_POO!='' && $scope.datos.RO_NOM_POO!=undefined
      && $scope.datos.RO_CEL_POO!=''&&$scope.datos.RO_CEL_POO!=undefined && $scope.datos.RO_MAC_POO!='' && $scope.datos.RO_MAC_POO!=undefined
      && $scope.datos.RO_CALL_POO!='' && $scope.datos.RO_CALL_POO!=undefined
      && $scope.datos.RO_NRO_POO!=''&&$scope.datos.RO_NRO_POO!=undefined)
    {
      if($scope.datos.RO_MOD==1){
        var idSuc = document.getElementById("RO_ID_SUC").options[document.getElementById("RO_ID_SUC").selectedIndex].text;
      }else{
        var idSuc = '';
        $scope.datos.RO_ID_SUC = 0;
      }
      if($scope.datos.RO_MOD == 1 || $scope.datos.RO_MOD == 2 ){
        var nroAs = $scope.datos.RO_ASI_V;
      }
      if($scope.datos.RO_MOD == 3 || $scope.datos.RO_MOD == 4 || $scope.datos.RO_MOD==5 || $scope.datos.RO_MOD==6){
        var nroAs = $scope.datos.RO_ASI_VJ1;
      }
      if($scope.datos.RO_MAC_P == 'OTRO'){
        $scope.datos.RO_ZONA_P = $scope.datos.RO_ZONA_P_OTRO;
      }
      if($scope.datos.RO_MAC_POO == 'OTRO'){
        $scope.datos.RO_ZONA_POO = $scope.datos.RO_ZONA_POO_OTRO;
      }
      var datosV = {
        RO_NOM_SUC : idSuc,
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
        RO_NRO_POO   : $scope.datos.RO_NRO_POO,
        RO_VEH_ADJ : $scope.datos.fileRequisitosVeh

      };
      datosV = JSON.stringify(datosV);
      var datosVeh = new vehiculo();
      datosVeh.id =  id; 
      datosVeh.ope_id = $scope.datosOperador.id_ope;
      datosVeh.placa = $scope.datos.RO_PLA_V; 
      datosVeh.datos = datosV; 
      datosVeh.usr_id = 1; 
      datosVeh.tipo_ser = $scope.datos.RO_MOD; 
      datosVeh.id_ofi = $scope.datos.RO_ID_SUC; 
      datosVeh.opcion = opcion;
      datosVeh.vehiculoAbm(function(results){
        results = JSON.parse(results).success.data[0];
        if(results.sp_abm_operador_vehiculo = 'Insertado'){
          swal('Exitoso','Se registro exitosamente el vehículo','success');
        }
        $scope.listaVeh();
        $('#vehiculo').modal('hide');
        $scope.limpiar();
        
      })
    }
    else{
      swal("","Datos obligatorios, verifique los datos del formulario","warning");
    }
  }

  $scope.modificarVehiculo = function(data){
    $scope.crear(2);
    $scope.datos.RO_PLA_V = data.veh_placa;
    $scope.datos.RO_TIP_V = data.veh_datos.RO_TIP_V;
    $scope.datos.RO_CLA_V = data.veh_datos.RO_CLA_V;
    $scope.datos.RO_MAR_V = data.veh_datos.RO_MAR_V;
    $scope.datos.RO_MOD_V = data.veh_datos.RO_MOD_V;
    $scope.datos.RO_COLOR_V = data.veh_datos.RO_COLOR_V;
    $scope.datos.RO_PUE_V = data.veh_datos.RO_PUE_V;
    $scope.datos.RO_RAD_V = data.veh_datos.RO_RAD_V;
    $scope.datos.RO_CI_P  = data.veh_datos.RO_CI_P;
    $scope.datos.RO_EXP_P = data.veh_datos.RO_EXP_P;
    $scope.datos.RO_NOM_P = data.veh_datos.RO_NOM_P;      
    $scope.datos.RO_PAT_P = data.veh_datos.RO_PAT_P;
    $scope.datos.RO_MAT_P = data.veh_datos.RO_MAT_P;
    $scope.datos.RO_CEL_P = data.veh_datos.RO_CEL_P;
    $scope.datos.RO_MAC_P = data.veh_datos.RO_MAC_P;
    if($scope.datos.RO_MAC_P == 'OTRO'){
      $scope.datos.RO_ZONA_P_OTRO = data.veh_datos.RO_ZONA_P;     
    }else{
      $scope.datos.RO_ZONA_P = data.veh_datos.RO_ZONA_P;     
    }
    $scope.datos.RO_CALL_P = data.veh_datos.RO_CALL_P;
    $scope.datos.RO_NRO_P  = data.veh_datos.RO_NRO_P;
    $scope.datos.RO_CI_POO  = data.veh_datos.RO_CI_POO;
    $scope.datos.RO_EXP_POO = data.veh_datos.RO_EXP_POO;
    $scope.datos.RO_NOM_POO = data.veh_datos.RO_NOM_POO;     
    $scope.datos.RO_PAT_POO = data.veh_datos.RO_PAT_POO;
    $scope.datos.RO_MAT_POO = data.veh_datos.RO_MAT_POO;
    $scope.datos.RO_CEL_POO = data.veh_datos.RO_CEL_POO;
    $scope.datos.RO_MAC_POO = data.veh_datos.RO_MAC_POO;
    if($scope.datos.RO_MAC_POO == 'OTRO'){
      $scope.datos.RO_ZONA_POO_OTRO = data.veh_datos.RO_ZONA_POO;      
    }else{
      $scope.datos.RO_ZONA_POO = data.veh_datos.RO_ZONA_POO;      
    }
    $scope.datos.RO_CALL_POO = data.veh_datos.RO_CALL_POO;
    $scope.datos.RO_NRO_POO = data.veh_datos.RO_NRO_POO;
    $scope.datos.RO_ID_SUC = data.veh_ope_id_oficina;
    $scope.idVeh = data.veh_ope_id;
    $scope.getComboClaseMovilidad();
    if($scope.datos.RO_MOD == 1 || $scope.datos.RO_MOD == 2 ){
      $scope.datos.RO_ASI_V = data.veh_datos.RO_ASI_V;
    }
    if($scope.datos.RO_MOD == 3 || $scope.datos.RO_MOD == 4 || $scope.datos.RO_MOD==5 || $scope.datos.RO_MOD==6){
      $scope.datos.RO_ASI_VJ1 = parseInt(data.veh_datos.RO_ASI_V);
    }
    $scope.distritoZonasTipo($scope.datos.RO_MAC_P,'Prop')
    $scope.distritoZonasTipo($scope.datos.RO_MAC_POO,'Pos')
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
    $scope.datos.RO_CALL_POO = '';
    $scope.datos.RO_NRO_POO = '';
    $scope.datos.RO_ID_SUC = '';
    $scope.mostrarZonaPoo = false;
    $scope.mostrarZonaProp = false;   
    $scope.tab1 = true;
  }

  $scope.verificaPlaca = function(placa){
    if(valPlaca == 0){
      /*var verif = new verifPlaca();
      verif.placa = placa;
      verif.verificaPlaca(function(results){
        results = JSON.parse(results).success.data[0];
        if(results.vexiste != 0){
          $scope.botonV = "455";
          swal({
            title: "",
            text: "La Placa "+results.vveh_placa+' ya fue registrada en fecha '+results.vehregistrado+', en el operador '+results.vope_rz,
            imageUrl: '../../../app/view/registro_ciudadano/servicios/img/movilidad/error.jpg'
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
              $scope.desabilitaVeh = true;
            }else{
             alertify.success('Registre los datos del vehículo');
              $scope.botonV = "new";
              $scope.desabilitaVeh = false;
            }
          })
        }
      }); */
      var buscaV = new busca_placa();
      buscaV.placa = placa;
      buscaV.busca_placa_sam(function(results){
        results = JSON.parse(results).success.data;
        $scope.botonV = "new";
        $scope.desabilitaVeh = false;
        if(results.length != 0){
          $scope.datos.RO_TIP_V = results[0].xmov_tipo;
          $scope.datos.RO_CLA_V = results[0].xclmov_nombre;
          $scope.datos.RO_MAR_V = results[0].xclmar_nombre;
          $scope.datos.RO_MOD_V = results[0].xmov_modelo;
          $scope.datos.RO_COLOR_V = results[0].xmov_color;
          $scope.datos.RO_PUE_V = results[0].xmov_nro_puertas;
          $scope.datos.RO_ASI_V = results[0].xmov_capacidad_tn; 
        }    
      })
    }
    else{
      swal("","La Placa es Incorrecta","error");
    }
  }

  $scope.validaModelo = function (campo){
    if($scope.datos.RO_MOD==1){
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
      }
    }
  }

  $scope.limpiaModelo = function(){
    $scope.datos.RO_MOD_V = '';
  }

  $scope.datosNaturalVehiculo = function (ci,tipo) {
    try{
      var buscarRepresentante = new rcNatural();
      buscarRepresentante.tipo_persona = "NATURAL";
      buscarRepresentante.ci = ci;
      buscarRepresentante.buscarPersona(function(res){
        var x = JSON.parse(res);
        if (x.error) {
          if(tipo == 'p'){
            if($scope.tipo_persona=='NATURAL' && $scope.datos.RO_MOD!=1){
              $scope.datos.RO_NRO_P1 = '';
              $scope.datos.RO_NOM_P1 = '';
              $scope.datos.RO_PAT_P1 = '';
              $scope.datos.RO_MAT_P1 = '';
              $scope.datos.RO_CAS_P1 = '';
              $scope.datos.RO_CEL_P1 = '';
              $scope.datos.RO_TEL_P1 = '';
              $scope.datos.RO_CORR_P1 = '';
              $scope.datos.RO_EXP_P1 = '';
              $scope.datos.RO_MAC_P1 = '';
              $scope.datos.RO_ZONA_P1 = '';
              $scope.datos.RO_CALL_P1 = '';
            }else{
              $scope.datos.RO_NRO_P = '';
              $scope.datos.RO_NOM_P = '';
              $scope.datos.RO_PAT_P = '';
              $scope.datos.RO_MAT_P = '';
              $scope.datos.RO_CAS_P = '';
              $scope.datos.RO_CEL_P = '';
              $scope.datos.RO_TEL_P = '';
              $scope.datos.RO_CORR_P = '';
              $scope.datos.RO_EXP_P = '';
              $scope.datos.RO_MAC_P = '';
              $scope.datos.RO_ZONA_P = '';
              $scope.datos.RO_CALL_P = '';
            }
          }else{
            if($scope.tipo_persona=='NATURAL' && $scope.datos.RO_MOD!=1){ 
              $scope.datos.RO_NRO_POO1 = '';
              $scope.datos.RO_NOM_POO1 = '';
              $scope.datos.RO_PAT_POO1 = '';
              $scope.datos.RO_MAT_POO1 = '';
              $scope.datos.RO_CAS_POO1 = '';
              $scope.datos.RO_CEL_POO1 = '';
              $scope.datos.RO_TEL_POO1 = '';
              $scope.datos.RO_CORR_POO1 = '';
              $scope.datos.RO_EXP_POO1 = '';
              $scope.datos.RO_MAC_POO1 = '';
              $scope.datos.RO_ZONA_POO1 = '';
              $scope.datos.RO_CALL_POO1 = '';
            }
            else{
              $scope.datos.RO_NRO_POO = '';
              $scope.datos.RO_NOM_POO = '';
              $scope.datos.RO_PAT_POO = '';
              $scope.datos.RO_MAT_POO = '';
              $scope.datos.RO_CAS_POO = '';
              $scope.datos.RO_CEL_POO = '';
              $scope.datos.RO_TEL_POO = '';
              $scope.datos.RO_CORR_POO = '';
              $scope.datos.RO_EXP_POO = '';
              $scope.datos.RO_MAC_POO = '';
              $scope.datos.RO_ZONA_POO = '';
              $scope.datos.RO_CALL_POO = '';
            }             
          }          
          alertify.success(x.error.message);
        }else {
          if (x.length > 0) {
            alertify.success('Datos Encontrados');
            $scope.busquedaCiudadano = x[0];
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
            if(tipo == 'p'){
              if($scope.tipo_persona=='NATURAL' && $scope.datos.RO_MOD!=1){
                $scope.datos.RO_NRO_P1 = parseInt(x[0].dtspsl_numero_casa);
                $scope.datos.RO_NOM_P1 = x[0].dtspsl_nombres;
                $scope.datos.RO_PAT_P1 = x[0].dtspsl_paterno;
                $scope.datos.RO_MAT_P1 = x[0].dtspsl_materno;
                $scope.datos.RO_CAS_P1 = x[0].dtspsl_tercer_apellido;
                $scope.datos.RO_CEL_P1 = parseInt(x[0].dtspsl_movil);
                $scope.datos.RO_TEL_P1 = x[0].dtspsl_telefono;
                $scope.datos.RO_CORR_P1 = x[0].dtspsl_correo;
                $scope.datos.RO_EXP_P1 = expd;
                $scope.datos.RO_MAC_P1 = x[0].dtspsl_macrodistrito_desc;
                $scope.datos.RO_ZONA_P1 = x[0].dtspsl_zona_desc;
                $scope.datos.RO_CALL_P1 = x[0].dtspsl_nombre_via;
                $scope.distritoZonasTipo($scope.datos.RO_MAC_P1,'Prop')
              }else{
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
                $scope.distritoZonasTipo($scope.datos.RO_MAC_P,'Prop')
              }
            }else{
              if($scope.tipo_persona=='NATURAL' && $scope.datos.RO_MOD!=1){ 
                $scope.datos.RO_NRO_POO1 = parseInt(x[0].dtspsl_numero_casa);
                $scope.datos.RO_NOM_POO1 = x[0].dtspsl_nombres;
                $scope.datos.RO_PAT_POO1 = x[0].dtspsl_paterno;
                $scope.datos.RO_MAT_POO1 = x[0].dtspsl_materno;
                $scope.datos.RO_CAS_POO1 = x[0].dtspsl_tercer_apellido;
                $scope.datos.RO_CEL_POO1 = parseInt(x[0].dtspsl_movil);
                $scope.datos.RO_TEL_POO1 = x[0].dtspsl_telefono;
                $scope.datos.RO_CORR_POO1 = x[0].dtspsl_correo;
                $scope.datos.RO_EXP_POO1 = expd;
                $scope.datos.RO_MAC_POO1 = x[0].dtspsl_macrodistrito_desc;
                $scope.datos.RO_ZONA_POO1 = x[0].dtspsl_zona_desc;
                $scope.datos.RO_CALL_POO1 = x[0].dtspsl_nombre_via;
                $scope.distritoZonasTipo($scope.datos.RO_MAC_POO1,'Pos')
              }
              else{
                $scope.datos.RO_NRO_POO = parseInt(x[0].dtspsl_numero_casa);
                $scope.datos.RO_NOM_POO = x[0].dtspsl_nombres;
                $scope.datos.RO_PAT_POO = x[0].dtspsl_paterno;
                $scope.datos.RO_MAT_POO = x[0].dtspsl_materno;
                $scope.datos.RO_CAS_POO = x[0].dtspsl_tercer_apellido;
                $scope.datos.RO_CEL_POO = parseInt(x[0].dtspsl_movil);
                $scope.datos.RO_TEL_POO = x[0].dtspsl_telefono;
                $scope.datos.RO_CORR_POO = x[0].dtspsl_correo;
                $scope.datos.RO_EXP_POO = expd;
                $scope.datos.RO_MAC_POO = x[0].dtspsl_macrodistrito_desc;
                $scope.datos.RO_ZONA_POO = x[0].dtspsl_zona_desc;
                $scope.datos.RO_CALL_POO = x[0].dtspsl_nombre_via;
                $scope.distritoZonasTipo($scope.datos.RO_MAC_POO,'Pos')
              }             
            }
          }
          
        }
      });
    }catch(e){
    }
  };
//****************fin vehiculo**************************************

//**************Registra Vehiculo y Conductor***********************
  var swAdiV = 0;
  var swAdiC = 0;
  $scope.adicionaVehiculoConductor = function(){
    $scope.listaVeh();
    if($scope.objVehiculos.length<1){
      if($scope.datos.RO_PLA_V1!='' && $scope.datos.RO_PLA_V1!=undefined && $scope.datos.RO_TIP_V1!='' && $scope.datos.RO_TIP_V1!=undefined
        && $scope.datos.RO_CLA_V1!=''&&$scope.datos.RO_CLA_V1!=undefined && $scope.datos.RO_MAR_V1!='' && $scope.datos.RO_MAR_V1!=undefined
        && $scope.datos.RO_MOD_V1!=''&&$scope.datos.RO_MOD_V1!=undefined && $scope.datos.RO_COLOR_V1!='' && $scope.datos.RO_COLOR_V1!=undefined
        && $scope.datos.RO_PUE_V1!=''&&$scope.datos.RO_PUE_V1!=undefined 
        && $scope.datos.RO_RAD_V1!=''&&$scope.datos.RO_RAD_V1!=undefined && $scope.datos.RO_CI_P1!='' && $scope.datos.RO_CI_P1!=undefined
        && $scope.datos.RO_EXP_P1!=''&&$scope.datos.RO_EXP_P1!=undefined && $scope.datos.RO_NOM_P1!=''&&$scope.datos.RO_NOM_P1!=undefined
        && $scope.datos.RO_PAT_P1!=''&&$scope.datos.RO_PAT_P1!=undefined && $scope.datos.RO_MAT_P1!=''&&$scope.datos.RO_MAT_P1!=undefined
        && $scope.datos.RO_CEL_P1!=''&&$scope.datos.RO_CEL_P1!=undefined && $scope.datos.RO_MAC_P1!='' && $scope.datos.RO_MAC_P1!=undefined
        && $scope.datos.RO_ZONA_P1!=''&&$scope.datos.RO_ZONA_P1!=undefined && $scope.datos.RO_CALL_P1!='' && $scope.datos.RO_CALL_P1!=undefined
        && $scope.datos.RO_NRO_P1!=''&&$scope.datos.RO_NRO_P1!=undefined && $scope.datos.RO_CI_POO1!='' && $scope.datos.RO_CI_POO1!=undefined
        && $scope.datos.RO_EXP_POO1!=''&&$scope.datos.RO_EXP_POO1!=undefined && $scope.datos.RO_NOM_POO1!='' && $scope.datos.RO_NOM_POO1!=undefined
        && $scope.datos.RO_PAT_POO1!=''&&$scope.datos.RO_PAT_POO1!=undefined && $scope.datos.RO_MAT_POO1!='' && $scope.datos.RO_MAT_POO1!=undefined
        && $scope.datos.RO_CEL_POO1!=''&&$scope.datos.RO_CEL_POO1!=undefined && $scope.datos.RO_MAC_POO1!='' && $scope.datos.RO_MAC_POO1!=undefined
        && $scope.datos.RO_ZONA_POO1!=''&&$scope.datos.RO_ZONA_POO1!=undefined && $scope.datos.RO_CALL_POO1!='' && $scope.datos.RO_CALL_POO1!=undefined
        && $scope.datos.RO_NRO_POO1!=''&&$scope.datos.RO_NRO_POO1!=undefined)
      {
        if($scope.datos.RO_MOD == 2 ){
          var nroAs = $scope.datos.RO_ASI_V1;
        }
        if($scope.datos.RO_MOD == 3 || $scope.datos.RO_MOD == 4 || $scope.datos.RO_MOD==5 || $scope.datos.RO_MOD==6){
          var nroAs = $scope.datos.RO_ASI_VE1;
        }    
        var datosV = {
          RO_NOM_SUC : '',
          RO_TIP_V   : $scope.datos.RO_TIP_V1,
          RO_CLA_V   : $scope.datos.RO_CLA_V1,
          RO_MAR_V   : $scope.datos.RO_MAR_V1,
          RO_MOD_V   : $scope.datos.RO_MOD_V1,
          RO_COLOR_V : $scope.datos.RO_COLOR_V1,
          RO_PUE_V   : $scope.datos.RO_PUE_V1,
          RO_ASI_V   : nroAs,      
          RO_RAD_V   : $scope.datos.RO_RAD_V1,
          RO_CI_P    : $scope.datos.RO_CI_P1,
          RO_EXP_P   : $scope.datos.RO_EXP_P1,
          RO_NOM_P   : $scope.datos.RO_NOM_P1,      
          RO_PAT_P   : $scope.datos.RO_PAT_P1,
          RO_MAT_P   : $scope.datos.RO_MAT_P1,
          RO_CEL_P   : $scope.datos.RO_CEL_P1,
          RO_MAC_P   : $scope.datos.RO_MAC_P1,
          RO_ZONA_P  : $scope.datos.RO_ZONA_P1,      
          RO_CALL_P  : $scope.datos.RO_CALL_P1,
          RO_NRO_P   : $scope.datos.RO_NRO_P1,
          RO_CI_POO  : $scope.datos.RO_CI_POO1,
          RO_EXP_POO   : $scope.datos.RO_EXP_POO1,
          RO_NOM_POO  : $scope.datos.RO_NOM_POO1,      
          RO_PAT_POO  : $scope.datos.RO_PAT_POO1,
          RO_MAT_POO   : $scope.datos.RO_MAT_POO1,
          RO_CEL_POO  : $scope.datos.RO_CEL_POO1,
          RO_MAC_POO   : $scope.datos.RO_MAC_POO1,
          RO_ZONA_POO  : $scope.datos.RO_ZONA_POO1,      
          RO_CALL_POO  : $scope.datos.RO_CALL_POO1,
          RO_NRO_POO   : $scope.datos.RO_NRO_POO1,
          RO_VEH_ADJ : $scope.datos.fileRequisitosVeh
        };
        datosV = JSON.stringify(datosV);
        var datosVeh = new vehiculo();
        datosVeh.id =  0; 
        datosVeh.ope_id = $scope.datosOperador.id_ope;
        datosVeh.placa = $scope.datos.RO_PLA_V1; 
        datosVeh.datos = datosV; 
        datosVeh.usr_id = 1; 
        datosVeh.tipo_ser = $scope.datos.RO_MOD; 
        datosVeh.id_ofi = 0; 
        datosVeh.opcion = 'I';
        datosVeh.vehiculoAbm(function(results){
        })
        swAdiV = 0;
      }
      else{
        swal("","Datos obligatorios, verifique los datos del Vehiculo","warning");
        swAdiV = 1;
      }
    }
    $scope.listaCond();
    if($scope.objConductores.length <1){
      $scope.datos.PLACA1 = $scope.datos.RO_PLA_V1;

      if($scope.datos.RO_EXP_C1!='' && $scope.datos.RO_EXP_C1!=undefined && $scope.datos.PLACA1!='' && $scope.datos.PLACA1!=undefined
      &&$scope.datos.RO_NOM_C1!='' && $scope.datos.RO_NOM_C1!=undefined && $scope.datos.RO_PAT_C1!='' && $scope.datos.RO_PAT_C1!=undefined
      &&$scope.datos.RO_MAT_C1!='' && $scope.datos.RO_MAT_C1!=undefined && $scope.datos.RO_CEL_C1!='' && $scope.datos.RO_CEL_C1!=undefined
      &&$scope.datos.RO_MAC_C1!='' && $scope.datos.RO_MAC_C1!=undefined && $scope.datos.RO_ZONA_C1!='' && $scope.datos.RO_ZONA_C1!=undefined
      &&$scope.datos.RO_CALL_C1!='' && $scope.datos.RO_CALL_C1!=undefined && $scope.datos.RO_NRO_C1!='' && $scope.datos.RO_NRO_C1!=undefined
      &&$scope.datos.RO_CAT_C1!='' && $scope.datos.RO_CAT_C1!=undefined && $scope.datos.RO_TIP_C1!='' && $scope.datos.RO_TIP_C1!=undefined)
      {
        var id_suc = 0;
        var nom_suc = '';
        var dataC = {
          "RO_NOM_SUC" : nom_suc,
          "RO_EXP_C" : $scope.datos.RO_EXP_C1,
          "PLACA"    : $scope.datos.PLACA1 ,
          "RO_NOM_C" : $scope.datos.RO_NOM_C1,
          "RO_PAT_C" : $scope.datos.RO_PAT_C1,
          "RO_MAT_C" : $scope.datos.RO_MAT_C1,
          "RO_TEL_C" : $scope.datos.RO_TEL_C1,
          "RO_CORR_C" : $scope.datos.RO_CORR_C1,
          "RO_CEL_C" : $scope.datos.RO_CEL_C1,
          "RO_MAC_C" : $scope.datos.RO_MAC_C1,
          "RO_ZONA_C" : $scope.datos.RO_ZONA_C1,
          "RO_CALL_C" : $scope.datos.RO_CALL_C1,
          "RO_NRO_C" : $scope.datos.RO_NRO_C1,
          "RO_CAT_C" : $scope.datos.RO_CAT_C1,
          "RO_TIP_C" : $scope.datos.RO_TIP_C1,
          "RO_DOC_COND" : $scope.datos.fileRequisitosCond
        }
        datac = JSON.stringify(dataC);
        var datosCond = new conductor();
        datosCond.id = 0; 
        datosCond.ope_id = $scope.datosOperador.id_ope;
        datosCond.ci = $scope.datos.RO_CI_C1;
        datosCond.datos = datac;
        datosCond.usr_id = 1; 
        datosCond.ofi_id = id_suc; 
        datosCond.opcion = 'I';
        datosCond.conductorAbm (function(data){
         
        })
        swAdiC = 0;
      }else{
        swAdiC = 1;
        swal("","Datos obligatorios, verifique los datos del Conductor","warning");
      }
    }
    if(swAdiV==0 && swAdiC==0){
      $scope.crea_tramite_lotus($scope.datos);
    }
  }

//******************Conductor***************************************
  $scope.crearCond = function(acc){
    if(acc == 1){
      $scope.desabilitaCon = true;
      $scope.tituloConductor = "REGISTRAR NUEVO CONDUCTOR";
      $scope.botonC = "ne";
      var req = new listaRequisitos(); 
      req.tipo = 'DOC_CONDUCTOR';
      req.lstRequisitos(function(data){
        $scope.requisitosConductor = JSON.parse(data).success.data;
        setTimeout(function(){
          iniciarLoadFyle();
        }, 1000); 
        $scope.datos.fileRequisitosCond = {};
      })
    }
    else{
      $scope.desabilitaCon = false;
      $scope.tituloConductor = "MODIFICAR DATOS DEL CONDUCTOR";
      $scope.botonC = "upd";
    }
  }

  $scope.validaProp = function(){
    if($scope.datos.RO_CI_POO1==undefined 
      && $scope.datos.RO_EXP_POO1==undefined && $scope.datos.RO_NOM_POO1==undefined
      && $scope.datos.RO_PAT_POO1==undefined && $scope.datos.RO_MAT_POO1==undefined
      && $scope.datos.RO_CEL_POO1==undefined && $scope.datos.RO_MAC_POO1==undefined
      && $scope.datos.RO_ZONA_POO1==undefined && $scope.datos.RO_CALL_POO1==undefined 
      && $scope.datos.RO_NRO_POO1==undefined)
    {
      $scope.datos.RO_CI_POO1 = $scope.datos.RO_CI_P1;  
      $scope.datos.RO_EXP_POO1 = $scope.datos.RO_EXP_P1;  
      $scope.datos.RO_NOM_POO1 = $scope.datos.RO_NOM_P1;  
      $scope.datos.RO_PAT_POO1 = $scope.datos.RO_PAT_P1;
      $scope.datos.RO_MAT_POO1 = $scope.datos.RO_MAT_P1;  
      $scope.datos.RO_CEL_POO1 = $scope.datos.RO_CEL_P1;
      $scope.datos.RO_MAC_POO1 = $scope.datos.RO_MAC_P1;
      $scope.datos.RO_ZONA_POO1 = $scope.datos.RO_ZONA_P1;
      $scope.datos.RO_CALL_POO1 = $scope.datos.RO_CALL_P1;
      $scope.datos.RO_NRO_POO1 = $scope.datos.RO_NRO_P1;
      $scope.distritoZonasTipo($scope.datos.RO_MAC_POO1,'Pos')
    }
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
      $scope.datos.RO_ZONA_POO_OTRO = $scope.datos.RO_ZONA_P_OTRO;
      $scope.datos.RO_CALL_POO = $scope.datos.RO_CALL_P;
      $scope.datos.RO_NRO_POO = $scope.datos.RO_NRO_P;
      $scope.distritoZonasTipo($scope.datos.RO_MAC_P,'Pos')
    }
  }

  $scope.adiModConductor = function(id,opc){
    if($scope.datos.RO_EXP_C!='' && $scope.datos.RO_EXP_C!=undefined && $scope.datos.PLACA!='' && $scope.datos.PLACA!=undefined
      &&$scope.datos.RO_NOM_C!='' && $scope.datos.RO_NOM_C!=undefined && $scope.datos.RO_CEL_C!='' && $scope.datos.RO_CEL_C!=undefined
      &&$scope.datos.RO_MAC_C!='' && $scope.datos.RO_MAC_C!=undefined 
      &&$scope.datos.RO_CALL_C!='' && $scope.datos.RO_CALL_C!=undefined && $scope.datos.RO_NRO_C!='' && $scope.datos.RO_NRO_C!=undefined
      &&$scope.datos.RO_CAT_C!='' && $scope.datos.RO_CAT_C!=undefined && $scope.datos.RO_TIP_C!='' && $scope.datos.RO_TIP_C!=undefined){
      var id_suc = 0;
      var nom_suc = '';
      angular.forEach($scope.objVehiculos,function(val, index)
      {
        if(val.veh_placa == $scope.datos.PLACA){
          id_suc = val.veh_ope_id_oficina;
          nom_suc = val.veh_datos.RO_NOM_SUC
        }
      });
      if($scope.datos.RO_MAC_C == 'OTRO'){
        $scope.datos.RO_ZONA_C = $scope.datos.RO_ZONA_C_OTRO;
      }
      console.log($scope.datos.RO_MAC_C,123456);
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
        "RO_TIP_C" : $scope.datos.RO_TIP_C,
        "RO_DOC_COND" : $scope.datos.fileRequisitosCond
      }
      datac = JSON.stringify(dataC);
      var datosCond = new conductor();
      datosCond.id = id; 
      datosCond.ope_id = $scope.datosOperador.id_ope;
      datosCond.ci = $scope.datos.RO_CI_C;
      datosCond.datos = datac;
      datosCond.usr_id = 1; 
      datosCond.ofi_id = id_suc; 
      datosCond.tipo_ser = $scope.datos.RO_MOD;        
      datosCond.opcion = opc;
      datosCond.conductorAbm (function(data){
        data = JSON.parse(data).success.data[0];
        if(data.sp_abm_operador_conductor == 'Insertado'){
          swal('Exitoso','Se registro exitosamente al conductor','success');
        }
        $scope.listaCond();
        $scope.limpiarCon();
        $('#modalConductor').modal('hide');
      })
    }else{
      swal("","Datos obligatorios, verifique los datos del formulario","warning");
    }
  }

  $scope.listaCond = function (){
    var cond = new listaConductor();
    cond.ope_id = $scope.datosOperador.id_ope; 
    cond.lstConductor(function(data){
      data = JSON.parse(data).success.data;
      for (var i = 0; i < data.length; i++) {
        data[i].nro = i+1;
      }
      $scope.objConductores = data;
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
      var orderedData = params.filter() ?
      $filter('filter')($scope.objConductores, params.filter()) :
      $scope.objConductores;
      params.total(orderedData.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.modificarCond = function(cond){
    console.log(cond,'cond');
    $scope.crearCond(2);
    $scope.datos.RO_CI_C = cond.cond_ci;
    $scope.datos.RO_EXP_C = cond.cond_datos.RO_EXP_C;
    $scope.datos.PLACA  = cond.cond_datos.PLACA;
    $scope.datos.RO_NOM_C = cond.cond_datos.RO_NOM_C;
    $scope.datos.RO_PAT_C = cond.cond_datos.RO_PAT_C;
    $scope.datos.RO_MAT_C = cond.cond_datos.RO_MAT_C;
    $scope.datos.RO_CORR_C = cond.cond_datos.RO_CORR_C;
    $scope.datos.RO_CEL_C = cond.cond_datos.RO_CEL_C;
    $scope.datos.RO_MAC_C = cond.cond_datos.RO_MAC_C;
    if($scope.datos.RO_MAC_C == 'OTRO'){
      $scope.datos.RO_ZONA_C_OTRO = cond.cond_datos.RO_ZONA_C;
    }else{
      $scope.datos.RO_ZONA_C = cond.cond_datos.RO_ZONA_C;
    }
    $scope.datos.RO_CALL_C = cond.cond_datos.RO_CALL_C;
    $scope.datos.RO_NRO_C = cond.cond_datos.RO_NRO_C;
    $scope.datos.RO_CAT_C = cond.cond_datos.RO_CAT_C;
    $scope.datos.RO_TIP_C= cond.cond_datos.RO_TIP_C;
    $scope.condId = cond.cond_ofi_id;
    $scope.distritoZonas($scope.datos.RO_MAC_C);
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
      var datosCond = new conductor();
      datosCond.id = id; 
      datosCond.ope_id = $scope.datosOperador.id_ope;
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
        }
        $scope.listaCond();
      })
    });
  }

  $scope.verificaConductor= function (ci) {      
    /*var busC = new buscaConductorVeh();
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
          imageUrl: '../../../app/view/registro_ciudadano/servicios/img/movilidad/btnProf.png'
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
    });*/
    var busquedaC = new busca_conductor();
    busquedaC.ci = ci;
    busquedaC.busca_conductor_sam(function(results){
      results = JSON.parse(results).success.data;
      console.log(results,1111);
      $scope.botonC = "new";
      $scope.desabilitaCon = false;
      if(results.length != 0){
        $scope.datos.RO_EXP_C = results[0].xexpd_nombre;
        $scope.datos.RO_NOM_C = results[0].xdtspsl_nombres;
        $scope.datos.RO_PAT_C = results[0].xdtspsl_paterno;
        $scope.datos.RO_MAT_C = results[0].xdtspsl_materno;
      }
    })
  }; 

  $scope.datosNaturalConductor= function () {
    try{
      var buscarRepresentante = new rcNatural();
      buscarRepresentante.tipo_persona = "NATURAL";
      buscarRepresentante.ci = $scope.datos.RO_CI_C;
      buscarRepresentante.buscarPersona(function(res){
        var x = JSON.parse(res);
        if (x.error) {
          $.unblockUI();
          alertify.success(x.error.message);
        }else {
          if (x.length > 0) {
            alertify.success('Datos Encontrados');
            $scope.busquedaCiudadano = x[0];
            $scope.datos.RO_NOM_C = x[0].dtspsl_nombres;
            $scope.datos.RO_PAT_C = x[0].dtspsl_paterno;
            $scope.datos.RO_MAT_C = x[0].dtspsl_materno;
            $scope.datos.RO_CAS_C = x[0].dtspsl_tercer_apellido;
            $scope.datos.RO_CEL_C = x[0].dtspsl_movil;
            $scope.datos.RO_TEL_C = x[0].dtspsl_telefono;
            $scope.datos.RO_CORR_C = x[0].dtspsl_correo;
            $scope.datos.RO_EXP_C = x[0].dtspsl_expedido;
            $scope.datos.RO_MAC_C = x[0].dtspsl_macrodistrito_desc;
            $scope.datos.RO_ZONA_C = x[0].dtspsl_zona_desc;
            $scope.datos.RO_CALL_C = x[0].dtspsl_nombre_via;
            $scope.datos.RO_NRO_C = x[0].dtspsl_numero_casa;
            $scope.macrodistritos();
            $scope.distritoZonas(x[0].dtspsl_macrodistrito_desc);
            setTimeout(function(){
            }, 1000);
          }
        }
      });
    }catch(e){
    }
  }; 
//*****************Fin Conductor************************************

//***********************************Datos de Ubicacion****************************
  $scope.macrodistritos = function(){
    $scope.aMacrodistritos = {};
    var datosP = new macrodistritoLst();
    datosP.obtmacro(function(resultado){
      data = JSON.parse(resultado);
      if(data.success.length > 0){
        $scope.aMacrodistritos = data.success;
        $scope.aMacrodistritos.push({"mcdstt_macrodistrito" :'OTRO'});
      }else{
          $scope.msg = "Error !!";
      }
    });
  }

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
                $scope.mostrarZonaProp = false;
                $scope.aDistritoZonaProp = data.success;
              }else{
                if(tipo == 'Pos'){
                  $scope.mostrarZonaPoo = false; 
                  $scope.aDistritoZonaPos = data.success;
                }else{
                  if(tipo == 'Cond'){
                    $scope.mostrarOtraZona = false;
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
        }else{
          if(tipo == 'Cond'){ 
            $scope.mostrarOtraZona = true;
          }
        }
      }
    }
  };

  $scope.distritoZonas = function(idMacroJ){        
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

  //************************VIAE*******************************************
  $scope.publicid = [];
  $scope.publi=[];

  $scope.cambioToggle1 = function(dato){
      $scope.datos.publicidad ='';
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
    var desc = $scope.publi.INT_TIPO_LETRE+' '+$scope.publi.INT_CARA;
    $scope.publi.INT_DESC = desc;
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

  $scope.verSuperficie = function(p){
    if (p==false || typeof(p)=='undefined'){
      $scope.publi.INT_ALTO = 0;
      $scope.publi.INT_ANCHO = 0;
      $scope.especial="mostrar";
    } else {
      $scope.especial=null;
    }
  }

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
    $scope.lssubcategoria();
  }

  $scope.eliminarPubli = function(dato){
    $scope.publicid.splice( $scope.publicid.indexOf(dato), 1 );
    $scope.id = $scope.id - 1;  
  }

//**********************Guardar Datos**********************************
  $scope.guardar_tramite = function(datos){ 
    $scope.datos.fileArRequisitos = $scope.fileArRequisitos;
    datos.Tipo_tramite_creado = "WEB";
    try {
      var datosSerializados   =  JSON.stringify(datos);
      var idCiudadano         = sessionService.get('IDSOLICITANTE');
      var idTramite           = sessionService.get('IDTRAMITE');
      var idServicio          = 14;
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
          if($scope.datosMostrar == 4 ){
            alertify.success("Formulario almacenado");
            document.getElementById('gu').disabled=false;          
          }
          if($scope.tipo_persona == 'NATURAL' && $scope.datos.RO_MOD != 1 &&$scope.datosMostrar == 3 && $scope.datos.fileArRequisitos != undefined){
            alertify.success("Formulario almacenado");
            document.getElementById('gu').disabled=false;     
          }
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
        $scope.recuperandoDatosGenesis();
        if($scope.tipo_persona=='NATURAL' && $scope.datos.RO_MOD!=1){
          $scope.adicionaVehiculoConductor();
        }else{
          if($scope.datos.RO_MOD==1){
            $scope.lstOficinasDatos();
            var nroVehOfic = [];
            console.log($scope.objOficinas,111,$scope.objVehiculos);
            for(var i=0;i<$scope.objOficinas.length;i++){
              var cantTotal = 0; 
              for (var j = 0; j < $scope.objVehiculos.length; j++) {
                if($scope.objOficinas[i].ofi_id == $scope.objVehiculos[j].veh_ofi_id){
                  cantTotal ++;
                }
              }
              nroVehOfic.push({"idOfi":$scope.objOficinas[i].ofi_id,"dirOfi":$scope.objOficinas[i].ofi_oficina,"cantVeh":cantTotal});
            }
            var cadena = 'La cantidad de vehiculos de la(s) sucursal(es): '
            var sw = 0;
            for (var i = 0; i < nroVehOfic.length; i++) {
              if(nroVehOfic[i].cantVeh<0){
                cadena = cadena + nroVehOfic[i].dirOfi+',';
                sw = 1;
              }
            }
            if(sw == 1){
              cadena = cadena.substring(0,cadena.length-1)+' es menor a 20';
              swal({
                title: '',
                text: '<h3>' + cadena + '</h3>',
                html: true,
                type: 'warning',
              });
            }else{
              $scope.crea_tramite_lotus(data);
            }
          }else{
            $scope.crea_tramite_lotus(data);
          }
        }
      }, 1000);
    });
  };

  $scope.crea_tramite_lotus = function (datos) {
    datos.g_origen_p = 'IGOB';
    if($scope.datos.RO_TIP_SOL==""|| $scope.datos.RO_TIP_SOL==undefined)
    {
      alertify.success('Completar el dato Tipo de Solicitud');
    }else
    { 
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
        datos.g_tipo = 'RO';
        data_form = JSON.stringify(datos);
        //tramite.proid = 55;
        //tramite.actid = 357;
        var tramite = new crearTramiteMovilidad();
        tramite.usr_id = 1;    
        tramite.datos = data_form;
        tramite.procodigo = 'RO';
        tramite.tramite_linea(function(results){
          results = JSON.parse(results);
          if (results !=null) {
            var nrot = results.success.data[0].crea_tramite_linea;
            $scope.mostrar_form_ope = false;
            $scope.datosMostrar = 1;
            $scope.validarFormProcesos(nrot);
            $.unblockUI();
          }else{
            alertify.error("Señor(a) Ciudadano(a) ocurrio un error al enviar su Tramité.", );
            $.unblockUI();
          }
        }); 
      },300); 
    }           
  };

  $scope.validarFormProcesos = function(nroTramite){
    idUsuario = sessionService.get('IDUSUARIO');
    try {
      idUsuario = 4; 
      var tramiteIgob = new datosFormularios();
      tramiteIgob.frm_idTramite = $scope.idTramite;
      tramiteIgob.frm_tra_enviado = 'SI';
      tramiteIgob.frm_tra_if_codigo = nroTramite;
      tramiteIgob.frm_tra_id_usuario = idUsuario;
      tramiteIgob.validarFormProcesos(function(resultado){
        swal({
          title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
          text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2>\n Usted debe dirigirse al tercer día hábil a la Secretaria Municipal de Movilidad y contactarse con el Asesor Legal DROM, portando sus documentos originales para la verificación.',
          html: true,
          type: 'success',
          //timer: 5000,
        });
        $scope.tramitesCiudadano();
      });
    } catch (error){
      alertify.success('Registro no modificado');
      $.unblockUI(); 
    }
  };

//*******************************Mapa******************************
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
    //var latitud = $rootScope.laaa;
    //var longitud = $rootScope.looo;
    var latitud = $scope.latitud;
    var longitud = $scope.longitud;
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
      /*
    $scope.map.once('postcompose', function(event)
    {
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
    $scope.map.renderSync();
     */
  
    $scope.convertToDataURLviaCanvas('https://maps.googleapis.com/maps/api/staticmap?center='+ latitud +','+ longitud +'&zoom=18&size=900x500&maptype=roadmap&markers=color:red|label:S|'+ latitud +','+ longitud +'&key=AIzaSyD_c3VUlclgLDhXQ_UHkGZ8uQiSeNHQHgw', function(base64Img){
      var Imagen = base64Img.replace(/data:image\/png;base64,/i,'');
      $scope.Imagenb = Imagen;
      $scope.subirImgBase64($scope.Imagenb, $scope.url, $scope.archivo1);
    });
   
  }
//***************************************************************
}