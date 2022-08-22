  //app.controller('PCController', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route) {
  function PCC2ontroller($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route) {

  $scope.vehic = [];
  $scope.conduc = [];
  $scope.cond = {};
  $scope.conductores = {};
  $scope.enviado='';
  $scope.usuarioci = sessionService.get('CICIUDADANO');  
  $scope.tipo_persona=sessionService.get('TIPO_PERSONA');
  $scope.datos.tipo_persona = $scope.tipo_persona;

  $scope.checkboxes = { 'checked': true, items: {} }; 
  $scope.botones2 = 'mostrar';

     $scope.$on('api:ready',function(){
      $scope.tramitesCiudadano();
      $scope.obtOperador();
      $scope.datosOperador();
      $scope.listar_of();  
      $scope.datosJ();
      $scope.datosN();
      $scope.macrodistritos();  
  });

  $scope.inicio = function () {
    $scope.tramitesCiudadano();
    $scope.getComboMarcaMovilidad();
    $scope.getComboClaseMovilidad();
    $scope.obtOperador();
    $scope.datosOperador();
    $scope.listar_of();  
    $scope.datosJ();
    $scope.datosN();
  };

      $scope.mostrarMsgActividadTrue  = false;
      $scope.mostrarMsgActividadFalse = false;
      $scope.tablaTramites        =   {};
      $scope.tramitesUsuario      =   [];
      $scope.datosGuardados = false;

  $scope.startDateOpen2 = function($event) {
     $event.preventDefault();
     $event.stopPropagation();
     $scope.startDateOpened2 = true;
  };

  $scope.startDateOpen1 = function($event) {
     $event.preventDefault();
     $event.stopPropagation();
     $scope.startDateOpened1 = true;
    };

      $scope.tercero=true;
    $scope.obtOperador=function(){
      var din= new asig_dinamico();
          din.consulta='select repr_ci, repr_ope_id  from _mv_ope_representante_datos where repr_ci=$$'+$scope.usuarioci+'$$ and repr_estado =$$A$$';
          console.log(din.consulta,'din.consulta00000000000000' );
          din.dinamico(function(results){
          results = JSON.parse(results);
          $scope.datos.idOperador2=results.success.data[0].sp_dinamico;
          console.log($scope.datos.idOperador2,'$scope.datos.idOperador= dfd');
          $scope.datos.idOperador2=$scope.datos.idOperador2[0].repr_ope_id;
          console.log($scope.datos.idOperador2,'$cont_veh');
          
      });  
    }
    $scope.datosOperador = function(){   
    // console.log($scope.datos.usuarioci,'$scope.datos.usuarioci .....222************************************'); 
          $scope.datos.usuarioci = $scope.usuarioci;
          console.log($scope.datos.usuarioci,'$scope.datos.usuarioci .....');
          var din= new asig_dinamico();
          //alert(456);
          din.consulta='select ope_denominacion, ope_nit, ope_datos from _mv_ope_operadores_datos where ope_id=$$'+$scope.datos.idOperador2+'$$';
          console.log(din.consulta,'din.consulta0000000' );
          din.dinamico(function(results){
          results = JSON.parse(results);
          $scope.datope=results.success.data[0].sp_dinamico;
          $scope.datos.RO_NIT = $scope.datope[0].ope_nit;
          $scope.datos.RO_DEN = $scope.datope[0].ope_denominacion;
          $scope.datos.RO_MOD = $scope.datope[0].ope_datos[0].RO_MOD;
          console.log($scope.datos.RO_MOD,'$scope.datos.RO_MOD');
          console.log($scope.datope,'$scope.datos.idOperador= dfd123');

          $scope.datope2 = $scope.datope[0].ope_datos;
         // alert(111);
          $scope.dat_Modalidad = $scope.datope2[0].RO_MOD;
          console.log($scope.dat_Modalidad,'$data 22');

      }); 
    }
          $scope.mostrarContenido=function(nro){
          $scope.primero = false;
          $scope.segundo = false;
          $scope.tercero = false;
          $scope.cuarto = false;
          $scope.quinto = false;
          $scope.sexto = false;
              console.log(nro,'nro');
            if(nro==1)
            { $scope.primero=true;  }           
            if(nro==2)
            {  $scope.segundo=true;
             } 
            if(nro==3)
            { $scope.tercero=true; 
              $scope.listar_of();
             }
           if(nro==4)
              {
              $scope.desabilitado = true; 
              $scope.datos.sucursal='';
              $scope.datos.sucursal2=''; $scope.datos.RO_PLA_V=''; $scope.datos.RO_TIP_V=''; $scope.datos.RO_CLA_V=''; $scope.datos.RO_MAR_V=''; $scope.datos.RO_MOD_V='';
              $scope.datos.RO_MOD_V=''; $scope.datos.RO_COL_V=''; $scope.datos.RO_NRO_PUE_V=''; $scope.datos.RO_RAD_V=''; $scope.datos.RO_CI_P=''; $scope.datos.RO_EXP_P='';
              $scope.datos.RO_NOM_P=''; $scope.datos.RO_PAT_P=''; $scope.datos.RO_MAT_P=''; $scope.datos.RO_MAC_P=''; $scope.datos.RO_ZONA_P=''; $scope.datos.RO_CALL_P='';
              $scope.datos.RO_NRO_P=''; $scope.datos.RO_EXP_POO='';  $scope.datos.RO_NOM_POO=''; $scope.datos.RO_NRO_POO=''; $scope.datos.RO_CI_POO='';
              $scope.datos.RO_PAT_POO=''; $scope.datos.RO_MAT_POO=''; $scope.datos.RO_MAC_POO=''; $scope.datos.RO_ZONA_POO=''; $scope.datos.RO_CALL_POO='';             
                console.log($scope.ofici.length,'$scope.ofici');   
                 $scope.vehic = [];                        
               $scope.cuarto=true;
               $scope.macrodistritos();
               //$scope.adiVeh.desabilitado=true;            
              }
           if(nro==5)
              {

              $scope.datos.RO_EXP_C='';  $scope.datos.RO_NOM_C=''; $scope.datos.RO_PAT_C='';  $scope.datos.RO_MAT_C=''; $scope.datos.RO_MAC_C='';  $scope.datos.RO_ZONA_C='';
              $scope.datos.RO_CALL_C='';  $scope.datos.RO_NRO_C=''; $scope.datos.RO_OFI_CON='';  $scope.datos.RO_CAT_C=''; $scope.datos.RO_TIP_C='';  
               $scope.datos.PLACA='';
               $scope.desabilitado = true; 
               $scope.quinto=true;
            }
           if(nro==6)
              {
               $scope.conduc=[];
               $scope.distritoZonas($scope.datos.RO_MAC_C);
               $scope.datos.RO_EXP_C='';  $scope.datos.RO_NOM_C=''; $scope.datos.RO_PAT_C='';  $scope.datos.RO_MAT_C=''; $scope.datos.RO_MAC_C='';  $scope.datos.RO_ZONA_C='';
               $scope.datos.RO_CALL_C='';  $scope.datos.RO_NRO_C=''; $scope.datos.RO_OFI_CON='';  $scope.datos.RO_CAT_C=''; $scope.datos.RO_TIP_C='';
               $scope.datos.PLACA='';
               $scope.desabilitado = true; 
               $scope.sexto=true;                
            }
          }

          $scope.divJuridico = false;


      $scope.grid_n = [];
      $scope.grid_a = [];
      $scope.mod = {};
      $scope.mod_adultos = {};
      $scope.gri_but_modal_g = true;
      $scope.gri_but_modal_e = false;
      $scope.tablaTramites = {};
      $scope.tramitesUsuario = [];
      $scope.datos = {};
      $scope.muestra_form_ope = false;

      $scope.startDateOpen = function($event) {
         $event.preventDefault();
         $event.stopPropagation();
         $scope.startDateOpened = true;
      };
      $scope.startDateOpen1 = function($event) {
         $event.preventDefault();
         $event.stopPropagation();
         $scope.startDateOpened1 = true;
      };
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
          aServicio.parametros ='{"frm_tra_dvser_id":32,"frm_tra_id_ciudadano":"' + sIdCiudadano + '","frm_tra_fecha":"' + sFechaTramite + '","frm_tra_enviado":"NO","frm_tra_id_usuario":"' + idusu + '"}';
          aServicio.llamarregla(function(data)
          {
              $scope.tramitesCiudadano();
              alertify.success('Tramite creado correctamente');
          });

          $scope.botones = "mostrar";
      }
      $scope.tramitesCiudadano = function(){
        console.log("1","1111");
          sIdCiudadano= sessionService.get('IDSOLICITANTE');
          var sparam  = new reglasnegocio();
          sparam.identificador = "RCCIUDADANO_MOV_AO";
          //sparam.id = 273;
          sparam.parametros='{"sidciudadano":"' + sIdCiudadano + '"}';
          sparam.llamarregla(function(results)
          {
              results = JSON.parse(results);
              $scope.tramites = results;
              console.log("results: ",results);
              angular.forEach(results,function(val, index)
              {
               if(val['form_contenido'])
               {
                 results[index].datos = val['form_contenido'];
               }
              });
              $scope.tramitesUsuario = results;
              $scope.tablaTramites.reload();
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

   $scope.seleccionarTramite = function(data_tramite){
            if (data_tramite.vcodigo == null) {
          $scope.tram = "";
        }else {
          $scope.tram = data_tramite.vcodigo;
        }
        alertify.success('Tramite seleccionado '+ $scope.tram);
        console.log(data_tramite,'1000000000')
        console.log($scope.enviado,'$scope.enviado');
        if($scope.enviado==''){
           $scope.botones = "mostrar";
        }
        $scope.startDateOpened = false;
        $scope.startDateOpened1 = false;
        console.log("data??",data_tramite);
        $scope.datos.Tipo_tramite_creado = "WEB";
        $scope.grid_n = [];
        $scope.grid_a = [];
        $scope.mostrar_form_ope = true;
        $scope.idServicio = data_tramite.vdvser_id;
        $scope.idTramite = data_tramite.vtra_id;
        //data_tramite.datos = JSON.stringify(data_tramite.datos);
        console.log("777777",$scope.idTramite);
        if (data_tramite.datos) {
          console.log("-----SSSS1----->",data_tramite.datos);
          console.log("-----SSSS----->",data_tramite.datos.length);
          if (data_tramite.datos.length != undefined) {
            if (data_tramite.datos.length > 100) {
              var remplazo = data_tramite.datos;
              data_tramite.datos = remplazo.replace(/\C:\\fakepath\\/g, "");
              console.log("puttttoooo",data_tramite.datos);
              data_tramite.datos = JSON.parse(data_tramite.datos);
            }
          }else {
            if (data_tramite.datos.length > 100) {
              var remplazo = data_tramite.datos;
              data_tramite.datos = remplazo.replace(/\C:\\fakepath\\/g, "");
              console.log("putooooo",data_tramite.datos);
              data_tramite.datos = JSON.parse(data_tramite.datos);
            }
          }
          console.log("-----SSSS----->",data_tramite.datos.length);
          console.log("7878",data_tramite.datos);
          if (data_tramite.datos != null) {
                  $scope.datos.INT_AC_DISTRITO = data_tramite.datos.INT_AC_DISTRITO;
                  $scope.datos.INT_AC_ID_ZONA = data_tramite.datos.INT_AC_ID_ZONA;
                  $scope.datos.INT_AC_MACRO_ID = data_tramite.datos.INT_AC_MACRO_ID;
                  $scope.datos.INT_ID_ZONA = data_tramite.datos.INT_ID_ZONA;
                  $scope.datos.PLACA = data_tramite.datos.PLACA;
                  $scope.datos.RO_CALL_C = data_tramite.datos.RO_CALL_C;
                  $scope.datos.RO_CALL_P = data_tramite.datos.RO_CALL_P;
                  $scope.datos.RO_CALL_POO = data_tramite.datos.RO_CALL_POO;
                  $scope.datos.RO_CALL_RL = data_tramite.datos.RO_CALL_RL;
                  $scope.datos.RO_CAN_VEH = data_tramite.datos.RO_CAN_VEH;
                  $scope.datos.RO_CAT_C = data_tramite.datos.RO_CAT_C;
                  $scope.datos.RO_CEL_C = data_tramite.datos.RO_CEL_C;
                  $scope.datos.RO_CEL_POO = data_tramite.datos.RO_CEL_POO;
                  $scope.datos.RO_CEL_RL = data_tramite.datos.RO_CEL_RL;
                  $scope.datos.RO_CI_C = data_tramite.datos.RO_CI_C;
                  $scope.datos.RO_CI_P = data_tramite.datos.RO_CI_P;
                  $scope.datos.RO_CI_POO = data_tramite.datos.RO_CI_POO;
                  $scope.datos.RO_CLA_V = data_tramite.datos.RO_CLA_V;
                  $scope.datos.RO_COL_V = data_tramite.datos.RO_COL_V;
                  $scope.datos.RO_CORR_C = data_tramite.datos.RO_CORR_C;
                  $scope.datos.RO_CORR_POO = data_tramite.datos.RO_CORR_POO;
                  $scope.datos.RO_EXP_C = data_tramite.datos.RO_EXP_C;
                  $scope.datos.RO_EXP_P = data_tramite.datos.RO_EXP_P;
                  $scope.datos.RO_EXP_POO = data_tramite.datos.RO_EXP_POO;
                  $scope.datos.RO_G_OFICINAS = data_tramite.datos.RO_G_OFICINAS;
                  //$scope.datos.RO_G_VEHICULO = data_tramite.datos.RO_G_VEHICULO;
                  $scope.datos.RO_MAC_C = data_tramite.datos.RO_MAC_C;
                  $scope.datos.RO_MAC_P = data_tramite.datos.RO_MAC_P;
                  $scope.datos.RO_MAC_POO = data_tramite.datos.RO_MAC_POO;
                  $scope.datos.RO_MAC_RL = data_tramite.datos.RO_MAC_RL;
                  $scope.datos.RO_MAR_V = data_tramite.datos.RO_MAR_V;
                  $scope.datos.RO_MAT_C = data_tramite.datos.RO_MAT_C;
                  $scope.datos.RO_MAT_P = data_tramite.datos.RO_MAT_P;
                  $scope.datos.RO_MAT_POO = data_tramite.datos.RO_MAT_POO;                
                  $scope.datos.RO_MOD_V = data_tramite.datos.RO_MOD_V;
                  $scope.datos.RO_NIT = data_tramite.datos.RO_NIT;
                  $scope.datos.RO_NOM_C = data_tramite.datos.RO_NOM_C;
                  $scope.datos.RO_NOM_P = data_tramite.datos.RO_NOM_P;
                  $scope.datos.RO_NOM_POO = data_tramite.datos.RO_NOM_POO;                
                  $scope.datos.RO_NRO_C = data_tramite.datos.RO_NRO_C;
                  $scope.datos.RO_NRO_P = data_tramite.datos.RO_NRO_P;
                  $scope.datos.RO_NRO_POO = data_tramite.datos.RO_NRO_POO;
                  $scope.datos.RO_NRO_PUE_V = data_tramite.datos.RO_NRO_PUE_V;                
                  $scope.datos.RO_OFI_CON = data_tramite.datos.RO_OFI_CON;
                  $scope.datos.RO_OPERADOR = data_tramite.datos.RO_OPERADOR;
                  $scope.datos.RO_PAR_NRO = data_tramite.datos.RO_PAR_NRO;
                  $scope.datos.RO_PAT_C = data_tramite.datos.RO_PAT_C;
                  $scope.datos.RO_PAT_P = data_tramite.datos.RO_PAT_P;
                  $scope.datos.RO_PAT_POO = data_tramite.datos.RO_PAT_POO;                
                  $scope.datos.RO_PLA_V = data_tramite.datos.RO_PLA_V;
                  $scope.datos.RO_RAD_V = data_tramite.datos.RO_RAD_V;
                  $scope.datos.RO_RZ = data_tramite.datos.RO_RZ;
                  $scope.datos.RO_TEL_C = data_tramite.datos.RO_TEL_C;
                  $scope.datos.RO_TEL_POO = data_tramite.datos.RO_TEL_POO;                
                  $scope.datos.RO_TIP_ACT = data_tramite.datos.RO_TIP_ACT;
                  $scope.datos.RO_TIP_C = data_tramite.datos.RO_TIP_C;
                  $scope.datos.RO_TIP_PER = data_tramite.datos.RO_TIP_PER;
                  $scope.datos.RO_TIP_PER_JUR = data_tramite.datos.RO_TIP_PER_JUR;
                  $scope.datos.RO_TIP_SER = data_tramite.datos.RO_TIP_SER;
                  $scope.datos.RO_TIP_SOL = data_tramite.datos.RO_TIP_SOL;
                  $scope.datos.RO_TIP_V = data_tramite.datos.RO_TIP_V;
                  $scope.datos.RO_VIA_PAR_MOM = data_tramite.datos.RO_VIA_PAR_MOM;
                  $scope.datos.RO_ZONA_C = data_tramite.datos.RO_ZONA_C;
                  $scope.datos.RO_ZONA_P = data_tramite.datos.RO_ZONA_P;
                  $scope.datos.RO_ZONA_POO = data_tramite.datos.RO_ZONA_POO;                
                  $scope.datos.Tipo_tramite_creado = data_tramite.datos.Tipo_tramite_creado;               
                  $scope.datos.idOperador1 = data_tramite.datos.idOperador1;
                  $scope.datos.RO_REN_V = data_tramite.datos.RO_REN_V;
                  $scope.datos.sucursal = data_tramite.datos.sucursal;
                  $scope.datos.RO_CORR_EM = data_tramite.datos.RO_CORR_EM;  
              }
          }
          else
          {
                  $scope.datos.RO_REN_V = "";
                  $scope.datos.INT_AC_DISTRITO = "";
                  $scope.datos.INT_AC_ID_ZONA = "";
                  $scope.datos.INT_AC_MACRO_ID = "";
                  $scope.datos.INT_ID_ZONA = "";
                  $scope.datos.PLACA = "";
                  $scope.datos.RO_CALL_C = "";
                  $scope.datos.RO_CALL_P = "";
                  $scope.datos.RO_CALL_POO = "";
                  $scope.datos.RO_CAN_VEH = "";
                  $scope.datos.RO_CAT_C = "";
                  $scope.datos.RO_CEL_C = "";
                  $scope.datos.RO_CEL_POO = "";
                  $scope.datos.RO_CI_C = "";
                  $scope.datos.RO_CI_P = "";
                  $scope.datos.RO_CI_POO = "";
                  $scope.datos.RO_CLA_V = "";
                  $scope.datos.RO_COL_V = "";
                  $scope.datos.RO_CORR_C = "";
                  $scope.datos.RO_CORR_POO = "";
                  $scope.datos.RO_DIR_GAR = "";
                  $scope.datos.RO_ENT_CALL = "";
                  $scope.datos.RO_ENT_CALL_OF = "";
                  $scope.datos.RO_EN_VIA = "";
                  $scope.datos.RO_ESP_DIS = "";
                  $scope.datos.RO_EXP_C = "";
                  $scope.datos.RO_EXP_P = "";
                  $scope.datos.RO_EXP_POO = "";
                  $scope.datos.RO_FRE = "";
                  $scope.datos.RO_FRE_RAD = "";
                  $scope.datos.RO_G_CONDUCTORES = "";
                  $scope.datos.RO_G_OFICINAS = "";
                  $scope.datos.RO_G_VEHICULO = "";
                  $scope.datos.RO_MAC_C = "";
                  $scope.datos.RO_MAC_P = "";
                  $scope.datos.RO_MAC_POO = "";
                  $scope.datos.RO_MAC_RL = "";
                  $scope.datos.RO_MAR_V = "";
                  $scope.datos.RO_MAT_C = "";
                  $scope.datos.RO_MAT_P = "";
                  $scope.datos.RO_MAT_POO = "";
                  $scope.datos.RO_MOD_V = "";
                  $scope.datos.RO_NOM_C = "";
                  $scope.datos.RO_NOM_P = "";
                  $scope.datos.RO_NOM_POO = "";
                  $scope.datos.RO_NRO_C = "";
                  $scope.datos.RO_NRO_P = "";
                  $scope.datos.RO_NRO_POO = "";
                  $scope.datos.RO_NRO_PUE_V = "";
                  $scope.datos.RO_OFI_CON = "";
                  $scope.datos.RO_OPERADOR = "";
                  $scope.datos.RO_PAR_NRO = "";
                  $scope.datos.RO_PAT_C = "";
                  $scope.datos.RO_PAT_P = "";
                  $scope.datos.RO_PAT_POO = "";
                  $scope.datos.RO_PLA = "";
                  $scope.datos.RO_PLA_TEC = "";
                  $scope.datos.RO_PLA_V = "";
                  $scope.datos.RO_RAD_V = "";
                  $scope.datos.RO_SER_SPU = "";
                  $scope.datos.RO_TEL_C = "";
                  $scope.datos.RO_TEL_POO = "";
                  $scope.datos.RO_TIP_ACT = "";
                  $scope.datos.RO_TIP_C = "";
                  $scope.datos.RO_TIP_PER = "";
                  $scope.datos.RO_TIP_SOL = "";
                  $scope.datos.RO_TIP_V = "";
                  $scope.datos.RO_VIA_PAR_MOM = "";
                  $scope.datos.RO_ZONA_C = "";
                  $scope.datos.RO_ZONA_OF = "";
                  $scope.datos.RO_ZONA_P = "";
                  $scope.datos.RO_ZONA_POO = "";
                  $scope.datos.Tipo_tramite_creado = "";               
                  $scope.datos.RO_CORR_EM ="";  
          }
       }

           $scope.datosJ = function () {
              $scope.cargarDatosJuridico();
              $scope.data2 = "prueba";

              console.log("prueba",$scope);
              var prueba   = new rcNatural();
                  prueba.oid = sessionService.get('IDCIUDADANO');
                  prueba.datosCiudadanoNatural(function(results){
                      results = JSON.parse(results);
                      if (results !=null) {
                          console.log("looooo",results);

                      }else{
                          $.unblockUI();
                      }
                  });
              };
      $scope.datos = {};
              $scope.datosN = function () {
               try{
                  var buscarRepresentante = new rcNatural();
                   buscarRepresentante.tipo_persona = "NATURAL";
                   buscarRepresentante.ci = $scope.datos.RO_CI_RL;
                   console.log(buscarRepresentante.ci,'buscarRepresentante.ci');
                   buscarRepresentante.buscarPersona(function(res){
                    var x = JSON.parse(res);
                    console.log("-----",x);
                    if (x.error) {
                     // $.LoadingOverlay("hide");
                      $.unblockUI();
                      alertify.success(x.error.message);
                    }else {
                      if (x.length > 0) {
                       // $.LoadingOverlay("hide");
                        alertify.success('Datos Encontrados');
                          $scope.busquedaCiudadano = x[0];

                          $scope.datos.RO_NOM_RL = x[0].dtspsl_nombres;
                          $scope.datos.RO_PAT_RL = x[0].dtspsl_paterno;
                          $scope.datos.RO_MAT_RL = x[0].dtspsl_materno;
                          $scope.datos.RO_CAS_RL = x[0].dtspsl_tercer_apellido;
                          $scope.datos.RO_CEL_RL = x[0].dtspsl_movil;
                          $scope.datos.RO_TEL_RL = x[0].dtspsl_telefono;
                          $scope.datos.RO_CORR_RL = x[0].dtspsl_correo;
                          $scope.datos.RO_EXP_RL = x[0].dtspsl_expedido;
                          $scope.datos.RO_MAC_RL = x[0].dtspsl_macrodistrito_desc;
                          $scope.datos.RO_ZONA_RL = x[0].dtspsl_zona_desc;
                          $scope.datos.RO_CALL_RL = x[0].dtspsl_nombre_via;
                          $scope.datos.RO_NRO_RL = x[0].dtspsl_numero_casa;
                          if (x[0].dtspsl_file_fotocopia_ci=="") {
                          }else {
                            $scope.url_CI_Anverso = CONFIG.APIURL + "/files/RC_CLI/"+x[0]._id+"/"+x[0].dtspsl_file_fotocopia_ci+"?app_name=todoangular";
                          }
                          if (x[0].dtspsl_file_fotocopia_ci_r=="") {
                          }else {
                            $scope.url_CI_Reverso = CONFIG.APIURL + "/files/RC_CLI/"+x[0]._id+"/"+x[0].dtspsl_file_fotocopia_ci_r+"?app_name=todoangular";
                          }
                         setTimeout(function(){
                           document.getElementById("f01_ADUL_TER_ZONA").value = x[0].dtspsl_zona;
                           $scope.mod_adultos.f01_ADUL_TER_ZONA = x[0].dtspsl_zona;
                         }, 1000);
                        }
                      }
                    
                });
              }catch(e){
              }
             };
              $scope.registro = {};
              $scope.datosNaturalPropietario= function () {
              var natural   = new rcNatural();
              console.log(natural,'natural');
                  natural.ci = $scope.datos.RO_CI_P;
                  natural.complemento = '';
                  natural.nombre = '';
                  natural.paterno = '';
                  natural.materno = ''
                  ;
                  console.log(natural.ci,'prueba.ci');
                  natural.buscarNatural(function(results){
                      results = JSON.parse(results);
                      console.log(results,'results natural');
                      if (results !=null) {
                          console.log(results[0].dtspsl_nombres,'results[0].dtspsl_nombres0000000000000');
                          $scope.datos.RO_NOM_P = results[0].dtspsl_nombres;
                          $scope.datos.RO_PAT_P = results[0].dtspsl_paterno;
                          $scope.datos.RO_MAT_P = results[0].dtspsl_materno;
                          $scope.datos.RO_EXP_P = results[0].dtspsl_expedido;
                          $scope.datos.RO_MAC_P = results[0].dtspsl_macrodistrito_desc;
                          $scope.datos.RO_ZONA_P = results[0].dtspsl_zona_desc;
                          $scope.datos.RO_CALL_P = results[0].dtspsl_nombre_via;
                          $scope.datos.RO_NRO_P = results[0].dtspsl_numero_casa;

                      }else{
                          $.unblockUI();
                          console.log("NO EXISTE DATOS");
                      }
                  });

                try{
                  var buscarRepresentante = new rcNatural();
                   buscarRepresentante.tipo_persona = "NATURAL";
                   buscarRepresentante.ci = $scope.datos.RO_CI_P;
                   console.log(buscarRepresentante.ci,'buscarRepresentante.ci');
                   buscarRepresentante.buscarPersona(function(res){
                    var x = JSON.parse(res);
                    console.log("-----",x);
                    if (x.error) {
                     // $.LoadingOverlay("hide");
                      $.unblockUI();
                      alertify.success(x.error.message);
                    }else {
                      if (x.length > 0) {
                        alertify.success('Datos Encontrados');
                          $scope.busquedaCiudadano = x[0];

                          $scope.datos.RO_NOM_P = x[0].dtspsl_nombres;
                          $scope.datos.RO_PAT_P = x[0].dtspsl_paterno;
                          $scope.datos.RO_MAT_P = x[0].dtspsl_materno;
                          $scope.datos.RO_CAS_P = x[0].dtspsl_tercer_apellido;
                          $scope.datos.RO_CEL_P = x[0].dtspsl_movil;
                          $scope.datos.RO_TEL_P = x[0].dtspsl_telefono;
                          $scope.datos.RO_CORR_P = x[0].dtspsl_correo;
                          $scope.datos.RO_EXP_P = x[0].dtspsl_expedido;
                          $scope.datos.RO_MAC_P = x[0].dtspsl_macrodistrito_desc;
                          $scope.datos.RO_ZONA_P = x[0].dtspsl_zona_desc;
                          $scope.datos.RO_CALL_P = x[0].dtspsl_nombre_via;
                          $scope.datos.RO_NRO_P = x[0].dtspsl_numero_casa;
                          console.log($scope.datos.RO_NRO_P,'$scope.datos.RO_NRO_P 0000');
                          $scope.macrodistritos();
                          $scope.distritoZonas(x[0].dtspsl_macrodistrito_desc);
                         setTimeout(function(){
                           document.getElementById("RO_CALL_P").value = x[0].dtspsl_zona;
                           $scope.datos.RO_ZONA_P = x[0].dtspsl_zona;
                         }, 1000);
                        }
                      }
                    
                });
              }catch(e){
             }
              };
              $scope.datosNaturalPoseedor= function () {
               try{
                  var buscarRepresentante = new rcNatural();
                   buscarRepresentante.tipo_persona = "NATURAL";
                   buscarRepresentante.ci = $scope.datos.RO_CI_POO;
                   console.log(buscarRepresentante.ci,'buscarRepresentante.ci');
                   buscarRepresentante.buscarPersona(function(res){
                    var x = JSON.parse(res);
                    console.log("-----",x);
                    if (x.error) {
                     // $.LoadingOverlay("hide");
                      $.unblockUI();
                      alertify.success(x.error.message);
                    }else {
                      if (x.length > 0) {
                       // $.LoadingOverlay("hide");
                       $scope.busquedaCiudadano = x[0];                   
                        alertify.success('Datos Encontrados');
                          $scope.datos.RO_NOM_POO = x[0].dtspsl_nombres;
                          $scope.datos.RO_PAT_POO = x[0].dtspsl_paterno;
                          $scope.datos.RO_MAT_POO = x[0].dtspsl_materno;
                          $scope.datos.RO_CAS_POO = x[0].dtspsl_tercer_apellido;
                          $scope.datos.RO_CEL_POO = x[0].dtspsl_movil;
                          $scope.datos.RO_TEL_POO = x[0].dtspsl_telefono;
                          $scope.datos.RO_CORR_POO = x[0].dtspsl_correo;
                          $scope.datos.RO_EXP_POO = x[0].dtspsl_expedido;
                          $scope.datos.RO_MAC_POO = x[0].dtspsl_macrodistrito_desc;
                          $scope.datos.RO_ZONA_POO = x[0].dtspsl_zona_desc;
                          $scope.datos.RO_CALL_POO = x[0].dtspsl_nombre_via;
                          $scope.datos.RO_NRO_POO = x[0].dtspsl_numero_casa;
                          $scope.macrodistritos();
                          $scope.distritoZonas(x[0].dtspsl_macrodistrito_desc);
                          console.log($scope.datos.RO_NRO_POO,'$scope.datos.RO_NRO_POO 0000');
                         setTimeout(function(){
                        /*   document.getElementById("RO_ZONA_POO").value = x[0].dtspsl_zona;
                           $scope.datos.RO_ZONA_POO = x[0].dtspsl_zona;*/
                         }, 1000);
                        }
                      }
                    
                });
              }catch(e){
             }
              };

           $scope.datosNaturalConductor= function () {
             try{
                  var buscarRepresentante = new rcNatural();
                   buscarRepresentante.tipo_persona = "NATURAL";
                   buscarRepresentante.ci = $scope.datos.RO_CI_C;
                   console.log(buscarRepresentante.ci,'buscarRepresentante.ci');
                   buscarRepresentante.buscarPersona(function(res){
                    var x = JSON.parse(res);
                    //alert(01);
                    console.log("-----",x);
                    if (x.error) {
                     // $.LoadingOverlay("hide");
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
                          console.log($scope.datos.RO_NRO_C,'$scope.datos.RO_NRO_C 0000');
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
          $scope.cargarDatosJuridico = function(){
          console.log("tipo de persona: ",sessionService.get('TIPO_PERSONA'));
          $scope.sTipoPersona = sessionService.get('TIPO_PERSONA');

          if($scope.sTipoPersona=="JURIDICO"){
              $scope.divJuridico = "mostrar";
                  var datosJ   = new rcNatural();
                  datosJ.oid = sessionService.get('IDCIUDADANO');
                  datosJ.datosCiudadanoNatural(function(results){
                      results = JSON.parse(results);
                      if (    results !=null) {
                          console.log("looooo",results);
                          console.log("looooo123",results[0]);
                          $scope.datos.RO_NIT = results[0].dtspsl_nit;
                          $scope.datos.RO_RZ = results[0].dtspsl_razon_social;
                          $scope.datos.f01_ges_vig_pod = results[0].dtspsl_poder_replegal;
                          $scope.datos.f01_num_notaria = results[0].dtspsl_nro_notaria;
                          $scope.datos.f01_zon_rep_valor = results[0].dtspsl_zona_desc;
                          $scope.datos.RO_NRO_OF = results[0].dtspsl_numero_casa;
                          $scope.datos.RO_CI_RL = results[0].dtspsl_ci_representante;
                          $scope.datos.RO_MAC_OF = results[0].dtspsl_macrodistrito_desc;
                          $scope.datos.RO_DIS_OF = results[0].dtspsl_distrito_desc;
                          $scope.datos.RO_ZON_OF = results[0].dtspsl_zona_desc;   
                          //$scope.datos.RO_NOM_VIA_OF = results[0].dtspsl_nombre_via;
                          $scope.datos.RO_TIP_PER = results[0].dtspsl_tipo_persona;
                          $scope.datos.RO_POD_RL = results[0].dtspsl_poder_replegal;
                          $scope.datos.RO_TEL_OF = results[0].dtspsl_telefono;
                          console.log($scope.datos.RO_NOM_TIP_PER,'$scope.datos.RO_NOM_TIP_PER123123123');

                          console.log(results[0].dtspsl_nit,'results[0].dtspsl_nit1');
                          console.log($scope.datos.f01_num_doc_per_jur,'num_doc_per_jur');
                      }else{
                          $.unblockUI();
                          console.log("NO EXISTE DATOS");
                      }
                  });

          }
      };
  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try{
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  }
  catch (e) {}

      /***********************API MACRODISTRITOS **************************/
          $scope.macrodistritos = function(){
          $scope.aMacrodistritos = {};
          var datosP = new macrodistritoLst();
          datosP.obtmacro(function(resultado){
              data = JSON.parse(resultado);
              if(data.success.length > 0){
                  console.log("macro: ",data.success);
                  $scope.aMacrodistritos = data.success;
              }else{
                  $scope.msg = "Error !!";
              }
          });
      };
      $scope.actulizarIdDistrito  =   function(dat){
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
          
          console.log("distrito: ", distNombre);
          console.log("distrito: ", $scope.aDistritoZona);        
          console.log("distrito: ", $scope.datos.INT_ID_ZONA);        
      };

      $scope.distritoZonas = function(idMacroJ){ 
          $scope.$apply();       
          console.log("ID MACRO J:", idMacroJ);
          var idMacro = "";
          if($scope.aMacrodistritos){
              angular.forEach($scope.aMacrodistritos, function(value, key) {
                  //console.log(value.mcdstt);
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
          //console.log(idMacro);
          $scope.aDistritoZona = {};
          try{
              var parametros = new distritoZona();
              parametros.idMacro = idMacro;
              parametros.obtdist(function(resultado){
                  data = JSON.parse(resultado);
                  console.log("results:: ",data.success);
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
              console.log("error");
              $scope.desabilitadoZ=true;
              $scope.desabilitadoV=true;
              $scope.desabilitadoNo=true;
          }
          $scope.$apply();
      };

      $scope.clonarRequisitosDocumentales = function(aRequArchivos){
          var i = 0;
          $scope.File_Adjunto =   {};
          datoObjectFiles = [];
          var longdato = 0;
          angular.forEach(aRequArchivos, function(archivo, key) {
              datoObjectFiles[i] = archivo;
              i = i +1;
          });
          $scope.datos.fileArchivosAd = datoObjectFiles;
      }
      ////////////////////////////////////////   llenadatosPropietario   /////////////////////////////////////////////////////////////////////////////
      $scope.llenadatosPropietario = function(aRequArchivos){
          var i = 0;
          $scope.datos.RO_NOM_P= $scope.datos.RO_NOM_POO;
          console.log($scope.datos.RO_NOM_POO);
      }
      $scope.adicionaEstado = function(of){

      }
      /*************************************************** guarda data *******************************************************************/
          $scope.datos_form={};

      $scope.crea_tramite_lotus2 = function(datos) {
          console.log(datos,"datos 000000000");      
          $scope.mostrar_data_veh();
         if($scope.datos_veh.length>0){ 
          for (var i = 0; i < $scope.datos_veh.length; i++) {
            console.log($scope.datos_veh,'DATOS VEHICULOS');
          console.log('entra....');  //$scope.datos_veh
          // if($scope.datos_veh[i].RO_REN_V === true){
            console.log('entra....IF');
              console.log($scope.datos_veh[i].RO_REN_V,'$scope.datos_veh[i].RO_REN_V');
              console.log($scope.datos_veh[i].veh_id,'$scope.datos_veh[i].veh_id');
              var din2= new asig_dinamico();
              din2.consulta='select * from sp_ope_vehiculo_estados($$'+ $scope.datos_veh[i].veh_id +'$$)';
              console.log(din2.consulta,'5555555555555555');
              din2.dinamico(function(results){
              results = JSON.parse(results);
              console.log(results,'results123');
          });
        // }
        };
       }
        $scope.mostrar_data_cond();
        if($scope.datos_cond.length>0){
          for (var i = 0; i < $scope.datos_cond.length; i++) {
           $scope.renov = $scope.datos_cond[i].RO_REN_C;
          // if($scope.datos_cond[i].RO_REN_C == true){
          var din3= new asig_dinamico();
          din3.consulta='select * from sp_ope_conductores_estados($$'+ $scope.datos_cond[i].cond_id +'$$)';
          console.log(din3.consulta,'5555555555555555');
          din3.dinamico(function(results){
          results = JSON.parse(results);
          console.log(results,'results123');
          });
        // }
        };
       }
          
       if($scope.datos_veh.length>0 || $scope.datos_cond.length>0){
       
         var data_form = JSON.stringify(datos);
         console.log(data_form,'data_for 123');
         var form= JSON.stringify(datos);
              var tramite = new crear_Tramite_lotus();
              var dato ='{"g_fecha" :"2018-06-26 9:1:45","g_tipo":"MOV-AO-","g_usuario": "gladys.laime","g_datos_solicitante": [], "G_CI":""}';
               tramite.proid=307;
               tramite.actid=1531;
               tramite.usr_id=1728;        
               tramite.datos=data_form;
               tramite.procodigo='MOV-AO-';
               tramite.macro_id=0;
               tramite.nodo_id=672;
               tramite.ws_id=24;
               tramite.tram_lotus(function(results){
                      results = JSON.parse(results);
                      console.log(results,'results tramite lotus 123');
                      $scope.nroTramite= results.success.data[0];
                      $scope.nroTramite=$scope.nroTramite.casonro;
                      console.log($scope.nroTramite,'$scope.nroTramite');
                      if (results !=null) {
                          console.log("datos lotus",results);
                          alertify.success("Los datos del formulario fueron enviados correctamente");
                      }else{
                          $.unblockUI();
                          console.log("NO EXISTE DATOS lot");
                      }
                      $scope.validarFormProcesos(datos);
               });
            }
         else
         {
          alertify.success("Para enviar el trámite debe realizar el registro de vehículos y/o conductores");
         }    
       }  
      $scope.bloquearBtnEnviarForm    =   function(){
          $scope.botones          =   null;
          $scope.desabilitado=true;
          //$scope.datos.RO_TIP_ACT
        };  

           /*enviarFormProcesos*/
      $scope.validarFormProcesos = function(datosForm){
          var idTramite = sessionService.get('IDTRAMITE');
          idUsuario = sessionService.get('IDUSUARIO');
          nroTramiteEnviado = sessionService.get('NROTRAMITE');
          idUsuario = 4;
          try {
              idUsuario = 4; 
              var tramiteIgob = new datosFormularios();
              console.log(tramiteIgob,'tramiteIgob');
              tramiteIgob.frm_idTramite = $scope.idTramite;
              tramiteIgob.frm_tra_enviado = 'SI';
              $scope.enviado=tramiteIgob.frm_tra_enviado;
              tramiteIgob.frm_tra_if_codigo = $scope.nroTramite;
              tramiteIgob.frm_tra_id_usuario = idUsuario;
              tramiteIgob.validarFormProcesos(function(resultado){
                  $scope.tramitesCiudadano();
                  $scope.bloquearBtnEnviarForm();
                  alertify.success("Señor(a) Ciudadano(a) su trámite fue registrado correctamente.", "Su número de Trámite es: " + $scope.nroTramite + "\n Nos contactaremos con usted a la brevedad posible para programar la inspección y/o verificación documental. Caso contrario puede apersonarse a la Plataforma Integra de su Macrodistrito para recabar mayor información.");
              });
          } catch (error){
              alertify.success('Registro no modificado');
              $.unblockUI(); 
          }
      };
      $scope.mostrar_data_veh = function()
      {
        $scope.datos_veh = $scope.vehic;
        console.log($scope.datos_veh,'vehiculoooo');
      }
      $scope.mostrar_data_cond = function()
      {
        $scope.datos_cond = $scope.conduc;
        console.log($scope.datos_cond,'condddddddddddddd');
      }

          ///////////////////////////////////////////////
          /////////////busqueda vehiculo placa///////////
             $scope.verificaVehiculo= function () {

              var vehiculo   = new busca_placa();
              console.log(vehiculo,'vehiculo');
              $scope.datos.RO_PLA_V=$scope.datos.RO_PLA_V.toUpperCase();
              console.log($scope.datos.RO_PLA_V,'MAY');
                  vehiculo.placa = $scope.datos.RO_PLA_V;
                  console.log(vehiculo.placa,'vehiculo.placa');
                  vehiculo.busca_placa_prop(function(results){
                      results = JSON.parse(results);
                      console.log(results,'results vehiculo');
                      if (results.success) {
                           $scope.datosVeh=results.success.data[0];
                            console.log($scope.datosVeh,'$scope.datosVeh');
                            if($scope.datosVeh.registro == 'REGISTRADO'){
                               var fecnac = new Date($scope.datosVeh.fec_reg);
                              var mes = fecnac.getMonth() + 1;
                              var dia = fecnac.getDate  ()
                               if(fecnac.getDate()<10){
                                dia = "0"+ dia;
                              }
                              if(fecnac.getMonth()<9){
                              mes = "0"+ mes;
                              }
                              $scope.fechaI  = fecnac.getFullYear()+"-"+mes+"-"+dia;
                              var fecha = $scope.fechaI;
                              console.log(fecha,'fecha000000000');
                      alertify.success('La placa '+$scope.datosVeh.placa+' ya fue registrada en fecha '+fecha+', en el operador'+$scope.datosVeh.opr);
                      // Desabilitar registros
                      $scope.desabilitado = true;
                      }               
                      } 
                      else
                           {      
                          console.log('prueba1111111111111',vehiculo.placa);
                          var din= new asig_dinamico();
                          din.consulta='select * from sp_ope_verif_placa($$'+vehiculo.placa+'$$)';
                          console.log(din.consulta,'din.123');
                          din.dinamico(function(results){
                          results = JSON.parse(results);
                          console.log(results,'results 1231');
                          $scope.verif_placa = results.success.data[0].sp_dinamico;
                          $scope.verif_placa = $scope.verif_placa[0];
                          console.log($scope.verif_placa,'results placa'); 
                          if($scope.verif_placa.vexiste!=0)
                          {
                          alertify.success('La placa '+vehiculo.placa+' ya fue registrada en fecha '+$scope.verif_placa.vehregistrado+', en el operador '+$scope.verif_placa.vope_rz);
                          $scope.desabilitado = true;
                          }
                          //}
                          else{
                          $.unblockUI();
                          $scope.desabilitado = false;
                          alertify.success('Registre los datos del vehículo');
                          $scope.datos.RO_TIP_V='';
                          $scope.val_placa=$scope.datos.RO_PLA_V;
                      }
                      });                        
                      }
                  });
              };
              ////////////////////////////////////////valida placa ////////////////////////////////////////////////////////////////

              $scope.valida_placa=function(placa){
                console.log(placa,'placa');
                if($scope.val_placa==undefined){
                }
                else{
                console.log($scope.val_placa,'$scope.val_placa');
                console.log(placa.length,'cscdscdcsdcsd');
                if(placa.length>=6 && $scope.val_placa!=placa)
                {
                  $scope.verificaVehiculo();
                }
              }
             }

          ///////////////////////////////////////////////
          /////////////busqueda vehiculo placa///////////
             $scope.verificaConductor= function () {
              $scope.datos.RO_CI_C=$scope.datos.RO_CI_C.toUpperCase();
                          var din= new asig_dinamico();
                          din.consulta='select * from sp_buscar_conductor_persona1($$'+$scope.datos.RO_CI_C+'$$)';
                          console.log(din.consulta,'din.consulta CONDUCTOR');
                          din.dinamico(function(results){
                          results = JSON.parse(results);
                          console.log(results,'results 1231');
                          $scope.verif_conductor = results.success.data[0].sp_dinamico;
                          if($scope.verif_conductor!= null)
                          {
                          $scope.verif_conductor=$scope.verif_conductor[0];
                          if($scope.verif_conductor.estado=='conductor')    
                          {
                              var fecnac = new Date($scope.verif_conductor.condregistrado);
                              var mes = fecnac.getMonth() + 1;
                              var dia = fecnac.getDate()
                               if(fecnac.getDate()<10){
                                dia = "0"+ dia;
                              }
                              if(fecnac.getMonth()<9){
                              mes = "0"+ mes;
                              }
                              $scope.fechaI  = fecnac.getFullYear()+"-"+mes+"-"+dia;
                              var fechaa = $scope.fechaI;
                            alertify.success('El conductor con CI  '+$scope.datos.RO_CI_C+' ya fue registrada en fecha '+ fechaa+', en el operador '+$scope.verif_conductor.oprnombre);
                          $scope.desabilitado = true;
                          }
                        }
                      else
                           {
                          $scope.datos.RO_CI_C=$scope.datos.RO_CI_C.toUpperCase();       
                        var din= new asig_dinamico();
                          din.consulta= 'select cond_ci, cond_registrado, ope_denominacion from _mv_ope_conductores_datos inner join _mv_ope_operadores_datos on ope_id=cond_ope_id where cond_ci=($$'+$scope.datos.RO_CI_C+'$$)';
                          console.log(din.consulta,'din.consulta00 cond');
                          din.dinamico(function(results){
                          results = JSON.parse(results);
                          console.log(results,'results 45');
                          $scope.verif_ci_cond = results.success.data[0].sp_dinamico;
                          if(results.success.data[0].sp_dinamico != null)
                          {
                              console.log($scope.verif_ci_cond,'$scope.verif_ci_cond');
                          $scope.verif_ci_cond = $scope.verif_ci_cond[0];
                          console.log($scope.verif_ci_cond,'results con'); 
                          if($scope.verif_ci_cond!='')
                          {
                              var fecnac = new Date($scope.verif_ci_cond.cond_registrado);
                              var mes = fecnac.getMonth() + 1;
                              var dia = fecnac.getDate()
                               if(fecnac.getDate()<10){
                                dia = "0"+ dia;
                              }
                              if(fecnac.getMonth()<9){
                              mes = "0"+ mes;
                              }
                              $scope.fechaCond  = fecnac.getFullYear()+"-"+mes+"-"+dia;
                         alertify.success('El conductor con CI  '+$scope.datos.RO_CI_C+' ya fue registrada en fecha '+ $scope.fechaCond +', en el operador '+$scope.verif_ci_cond.ope_rz);
                           $scope.desabilitado = true;
                          }}
                          else{
                          $.unblockUI();
                          $scope.desabilitado = false;
                          alertify.success('Registre los datos del conductor');
                          $scope.datos.PLACA=='' ; $scope.datos.RO_EXP_C==''; $scope.datos.RO_NOM_C==''; $scope.datos.RO_PAT_C=='';  $scope.datos.RO_MAT_C=='';                        
                          $scope.datos.RO_MAC_C==''; $scope.datos.RO_ZONA_C==''; $scope.datos.RO_CALL_C=='';  $scope.datos.RO_NRO_C==''; $scope.datos.RO_TIP_C=='';
                          $scope.datos.RO_OFI_CON=='';  $scope.datos.RO_CAT_C==''; 
                         
                         $scope.val_ci=$scope.datos.RO_CI_C;
                      }
                      });
  //6733281                        
                      }
                  
                  });
                    $scope.datosNaturalConductor();
              };  
                         
                  //////////////////////////////////////////// valida conductor ///////////////////////////////////////////////////////////

              $scope.valida_conductor=function(ci){
                console.log(ci,'ci cond');
                if($scope.val_ci==undefined){
                }
                else{
                console.log($scope.val_ci,'$scope.val_ci');
                if(ci.length>=6 && $scope.val_ci!=ci)
                {
                  $scope.verificaConductor();

                }
              }
              }    
      $scope.getComboClaseMovilidad = function(){
        var clase = new combo_clase_vehiculo();
        console.log(clase,'clase');
        clase.combo_clase_v(function(results){
          results= JSON.parse(results);
          console.log(results,'results clase');
          if(results!=null)
          {
              $scope.obtClaseMovilidades=results.success.data;
          }
      else{
          $.unblockUI();
          console.log("NO EXISTE DATOS");
      }
        });
      };

      $scope.getComboMarcaMovilidad = function(){
        var marca = new combo_marca_vehiculo();
        console.log(marca,'marca');
        marca.combo_marca_v(function(results){
          results= JSON.parse(results);
          console.log(results,'results marca');
          if(results!=null)
          {
            $scope.obtMarcaMovilidades =results.success.data;
            console.log($scope.obtMarcaMovilidades,'$scope.obtMarcaMovilidades');
          }
      else{
          $.unblockUI();
          console.log("NO EXISTE DATOS");
          }
        });
      };
      
          $scope.recuperarSerializarInfo = function(){
              //console.log(tramite,'tramite 123');
          var sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
          var sIdServicio = sessionService.get('IDSERVICIO');
          console.log($scope.datos,'data');
          console.log(sIdCiudadano,'oid');
          console.log($rootScope.tramiteId,'id_tramite');
          var din= new rc_asig_dinamico();
          din.consulta='select * from sp_crear_datos_formulario(12,$$'+ JSON.stringify($scope.datos)+'$$,$$'+sIdCiudadano+'$$,'+'1'+','+$rootScope.tramiteId+')';
          din.dinamicos_rc(function(results){
          results = JSON.parse(results);
          console.log(results,'results123333333333333333');

          });
      };

         
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////  registro de Oficinas   /////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.listar_of = function(){ 
          $scope.ofici = [];
          console.log($scope.datos.idOperador2,'$scope.datos.idOperador id ope ope ope');
          var din= new asig_dinamico();
              din.consulta='select ofi_id,ofi_datos from _mv_ope_oficinas_datos where ofi_ope_id=$$'+$scope.datos.idOperador2+'$$ and ofi_estado=$$A$$ order by ofi_id';
              console.log(din.consulta,'din.consulta of ');
              din.dinamico(function(results){
              results = JSON.parse(results);                
              if(results.success.data[0].sp_dinamico != null){                        
                  $scope.ofici=results.success.data[0].sp_dinamico;              
                  console.log('pista nro 2',$scope.ofici);
                  for (var i = 0; i < $scope.ofici.length; i++) {
                    $scope.ofici2 = $scope.ofici[i].ofi_datos;
                    $scope.datos.oficinas = $scope.ofici2[0].RO_MAC_OF;
                    console.log($scope.datos.oficinas,'$scope.datos.oficinas    1');
                  };
                                   
              }else{
                  $scope.ofici = [];
              }
          });
      }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////// REGISTRO DE VEHICULO ////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.almacenarDatos1 = function (veh) { 
      console.log(veh,'vehhhh');
      $scope.veh_id = veh.veh_id;
      console.log($scope.veh_id,'veh_ idx');                       
    };
       $scope.agregarObservacion = function (datos) {
            var din= new asig_dinamico();
            din.consulta='select * from sp_insertar_observaciones_conductor_vehiculo($$'+ $scope.veh_id +'$$,$$V$$,$$'+datos.observaciones+'$$,$$1$$)';
            console.log(din.consulta,'din.consulta ofobservaciones ');
            din.dinamico(function(results){
            results = JSON.parse(results);                
            if(results.success.data[0].sp_dinamico != null){
              alertify.success('Se agrego las observación');
                console.log('pista nro 2 observacion');
            }
        });
            console.log('=====>>>>>',$scope.datos.RO_MAC_OF);
            $scope.listar_veh($scope.oficinaid);
       }; 

    $scope.listarObservaciones = function(datos,veh){
      $scope.datarequisitos = [];
       $scope.veh_id = veh.veh_id;
        var din= new asig_dinamico();
          din.consulta='select * from sp_lst_observaciones($$'+$scope.veh_id+'$$,$$V$$)';
          console.log(din.consulta,'din.consulta ofobservaciones lst');
          din.dinamico(function(results){
          results = JSON.parse(results);                
          if(results.success.data[0].sp_dinamico != null){
            $scope.datarequisitos = results.success.data[0].sp_dinamico;
           // alertify.success('Se agrego las observación');
              console.log('pista nro 2 observacion', $scope.datarequisitos);
              angular.forEach($scope.datarequisitos,function(celda, fila){
                {
                    $scope.checkboxes.items[celda['id']]=false;
                }
            });
          }
       });
    };

    //***********************************prueba de la grila editable
    $scope.quitarObservacion = function (){
      var cont = 0;
        angular.forEach($scope.datarequisitos,function(celda, fila){
            console.log(celda);
            var id_reqid=celda['id'];
            console.log(id_reqid,'id_reqid');
            var estadoHab = '';
            if($scope.checkboxes.items[id_reqid]){
                console.log('hola');
                console.log(id_reqid,'hththythyth');
                console.log(id_reqid,'');

                var adjunto = {};

                var din= new asig_dinamico();
                  din.consulta='select * from sp_elimina_observaciones_conductor_vehiculo($$'+ id_reqid +'$$,$$1$$)';
                  console.log(din.consulta,'din.consulta ofobservaciones lst');
                  din.dinamico(function(results){
                  results = JSON.parse(results); 
                  console.log(results,'results op');               
                  if(results.success.data[0].sp_dinamico != null){
                 //   alertify.success('Se agrego las observación');
                      console.log('pista nro 2 observacion');
                  }
              });
            }            
        }); 
          $scope.listar_veh($scope.oficinaid);        
    };

              $scope.listar_veh = function(of){
                $scope.oficinaid = of;
                  console.log(of,'offffffffffffffffffffff');
                  console.log($scope.datos.idOperador2,'$scope.datos.idOperador ip ope ....');                  
                      var din1= new asig_dinamico();
                      din1.consulta='select * from sp_vencidos_vehiculos($$'+$scope.datos.idOperador2+'$$)';
                      console.log(din1.consulta,'5555555555555555');
                      din1.dinamico(function(results){
                      results = JSON.parse(results);
                      });
                     $scope.vehic = [];
                     var din= new asig_dinamico();
                      din.consulta ='select veh_id, veh_datos, veh_estado_doc,veh_vigencia_a ,$$TIENE OBSERVACION$$ as obs from _mv_ope_vehiculos_datos inner join _mv_observaciones on obs_id_op_condveh = veh_id and obs_estado = $$A$$ where veh_ope_id=$$'+$scope.datos.idOperador2+'$$ and obs_tipo=$$V$$ and veh_oficina=$$'+of+'$$ and veh_estado=$$A$$ and (veh_estado_doc!=$$OBSERVADO$$ and veh_estado_insp!=$$OBSERVADO$$) and veh_vigencia_a is not null UNION ALL SELECT veh_id,veh_datos, veh_estado_doc,veh_vigencia_a ,$$$$ as obs FROM _mv_ope_vehiculos_datos WHERE veh_ope_id=$$'+$scope.datos.idOperador2+'$$ and veh_oficina=$$'+of+'$$ and veh_estado=$$A$$ and veh_vigencia_a is not null and (veh_estado_doc!=$$OBSERVADO$$ and veh_estado_insp!=$$OBSERVADO$$) AND veh_id NOT IN (select veh_id from _mv_ope_vehiculos_datos inner join _mv_observaciones on obs_id_op_condveh = veh_id and obs_estado = $$A$$ where veh_ope_id=$$'+$scope.datos.idOperador2+'$$ and obs_tipo=$$V$$and veh_oficina=$$'+of+'$$ and veh_estado=$$A$$ and (veh_estado_doc=$$APROBADO$$ and veh_estado_insp=$$APROBADO$$) and veh_vigencia_a is not null)';
                      din.dinamico(function(results){
                      results = JSON.parse(results);            
                    if(results.success.data[0].sp_dinamico != null){                      
                        $scope.vehic=results.success.data[0].sp_dinamico;
                        console.log('pista nro 1->',$scope.vehic);
                        $scope.datos.RO_G_VEHICULO=$scope.vehic;
                        var din= new asig_dinamico();
                        din.consulta='select current_date';
                        din.dinamico(function(results){
                        results = JSON.parse(results);
                        $scope.fechaActual=results.success.data[0].sp_dinamico;
                        $scope.fechaActual = $scope.fechaActual[0].date;
                        console.log($scope.fechaActual,'$scope.fechaActual 0000');       
                       });
                        for (var i = 0; i < $scope.vehic.length; i++) {
                          console.log($scope.vehic,'$scope.vehic prueba');
                          console.log($scope.vehic[i].veh_vigencia_a,'$scope.vehic[i].veh_vigencia_a 000000111111 ');
                          if(new Date($scope.vehic[i].veh_vigencia_a).getTime() < new Date($scope.fechaActual).getTime()){       
                          console.log(i,'entra    .........');                  
                            $scope.vehid = $scope.vehic[i].veh_id;
                            $scope.placa1 = $scope.vehic[i].veh_datos[0].RO_PLA_V;
                            console.log($scope.placa1,'$scope.placa111111 0');                           
                            $scope.vehic[i].valida=true;
                            console.log($scope.vehic[i].OBSERVADOO_REN_V ,'$scope.datos.RO_REN_V ----------ZZZZZZ');
                            $scope.vehic[i].veh_datos[0].RO_EST_V='EN PROCESO';  
                            console.log('$scope.vehic[i]---------66666666666888888',$scope.vehic[i]);
                            $scope.datosve = JSON.stringify($scope.vehic[i].veh_datos);
                           var din= new asig_dinamico();
                            din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador2+'$$,$$'+$scope.placa1+'$$,$$'+ $scope.oficinaid +'$$,$$'+$scope.datosve+'$$,1,$$'+ $scope.vehid +'$$,$$1$$,$$'+'U'+'$$)';
                            console.log(din.consulta,'5555555555555555');
                            din.dinamico(function(results){
                            results = JSON.parse(results);
                            console.log(results,'results123');                            
                            });  
                          }
                          else{
                            $scope.placa2 = $scope.vehic[i].veh_datos[0].RO_PLA_V;
                            console.log($scope.placa2,'$scope.placa2 123  .');
                            console.log('entra else');
                           $scope.vehic[i].valida=false; 
                           }
                          };
                         
                          $scope.$apply();
                      }else{
                          $scope.vehic = [];
                      }
                  });
              }

              $scope.listar_veh_Inc = function(of){
                $scope.oficinaid = of;
                  console.log(of,'offffffffffffffffffffff 123');
                  $scope.vehic = [];
                  var din= new asig_dinamico();
                      din.consulta=' select veh_id,veh_datos,veh_placa, veh_oficina from _mv_ope_vehiculos_datos where veh_ope_id=$$'+$scope.datos.idOperador2+'$$ and veh_oficina=$$'+of+'$$ and veh_estado=$$A$$ and veh_estado_doc is null and veh_estado_insp is null'; //and veh_renov=$$nuevo$$';
                      console.log(din.consulta,'din.consulta');
                      din.dinamico(function(results){
                      results = JSON.parse(results);
                      console.log(results,'results');
                      
                      if(results.success.data[0].sp_dinamico != null){
                        
                          $scope.vehic=results.success.data[0].sp_dinamico;
                          console.log('pista nro 1->',$scope.vehic);
                          $scope.datos.RO_G_VEHICULO=$scope.vehic;
                          $scope.$apply();
                      }else{
                          $scope.vehic = [];
                      }
                  });
              }

  $scope.veh = {};
  $scope.vehiculo = {};

  ////////////////////////////////////////   Datos de VEHICULO   //////////////////////////////////////////////////////////////////////////////

       
        $scope.guardarDatosVehiculo = function(veh){
                console.log(veh,'veh');
                //$scope.datos.tip_servicio=1;
                console.log($scope.datos.tip_servicio,'$scope.datos.tip_servicio  0000');
                $scope.vehic3 = [];
                console.log($scope.datos.sucursal,'$scope.datos.sucursal');
            if( $scope.datos.sucursal=='' || $scope.datos.sucursal==undefined ||  $scope.datos.RO_PLA_V=='' || $scope.datos.RO_PLA_V==undefined || 
            $scope.datos.RO_TIP_V=='' || $scope.datos.RO_TIP_V==undefined ||  $scope.datos.RO_CLA_V=='' || $scope.datos.RO_CLA_V==undefined || 
            $scope.datos.RO_MAR_V=='' || $scope.datos.RO_MAR_V==undefined ||  $scope.datos.RO_MOD_V=='' || $scope.datos.RO_MOD_V==undefined || 
            $scope.datos.RO_COL_V=='' || $scope.datos.RO_COL_V==undefined ||  $scope.datos.RO_PUE_V=='' || $scope.datos.RO_PUE_V==undefined || 
            $scope.datos.RO_RAD_V=='' || $scope.datos.RO_RAD_V==undefined )
            {
                alertify.success('Complete los datos del vehículo para realizar el registro', 'error');
            }
            else
            {

                  $scope.PLACA_I=veh.RO_PLA_V;
                console.log($scope.miColor,'$scope.miColor');
                    console.log(veh,'prueba123');
                    console.log(veh.RO_MOD_V,'11111111111111111');
                    console.log($scope.tipo_act,'TIPO ACTIVIDAD');
                    console.log($scope.datos.RO_MOD_V,'$scope.veh[i].RO_MOD_V');
                    console.log($scope.ofici,'oficinaaaaaa');
                    console.log($scope.datos.ofici,'OFIS11111111');
      var of = JSON.stringify( $scope.ofici, function( key, value ) {
          if( key === "$$hashKey" ) {
              return undefined;
          }
          return value;
      });
     $scope.of=JSON.parse(of);

      console.log($scope.of,'of');
                      $scope.tipo_act ='MATRIZ';
                    /*for (var i = 0; i < $scope.of.length; i++) {
                      console.log($scope.of.lngth,'of.length');
                       if($scope.of[i].ofi_datos[0].RO_MAC_OF==veh.sucursal)
                       {
                        $scope.tipo_act=$scope.of[i].ofi_datos[0].RO_TIP_ACT;
                        console.log($scope.tipo_act, '$scope.tipo_act123333333333333333333');
                       }
                    };*/
                    console.log($scope.tipo_act,'$scope.tipo_act 11111111');
                    if($scope.tipo_act=='MATRIZ')
                    {
                                $scope.vehic3.push({
                                sucursal: veh.sucursal,    
                              //  RO_COLOR: veh.RO_COL_V,
                                RO_PLA_V: veh.RO_PLA_V,
                                RO_TIP_V: veh.RO_TIP_V,
                                RO_CLA_V: veh.RO_CLA_V,
                                RO_MAR_V: veh.RO_MAR_V,
                                RO_MOD_V: veh.RO_MOD_V,
                                RO_COL_V: veh.RO_COL_V,
                                RO_PUE_V: veh.RO_PUE_V,
                                RO_RAD_V: veh.RO_RAD_V,
                                RO_EST_V: 'EN PROCESO',
                                RO_CI_P: veh.RO_CI_P,
                                RO_EXP_P: veh.RO_EXP_P,
                                RO_NOM_P: veh.RO_NOM_P,
                                RO_PAT_P: veh.RO_PAT_P,
                                RO_MAT_P: veh.RO_MAT_P,
                                RO_MAC_P: veh.RO_MAC_P,
                                RO_ZONA_P: veh.RO_ZONA_P,
                                RO_CALL_P: veh.RO_NOM_VIA_P,
                                RO_NRO_P: veh.RO_NRO_P,
                                RO_CI_POO: veh.RO_CI_POO,
                                RO_EXP_POO: veh.RO_EXP_POO,
                                RO_NOM_POO: veh.RO_NOM_POO,
                                RO_PAT_POO: veh.RO_PAT_POO,
                                RO_MAT_POO: veh.RO_MAT_POO,
                                RO_MAC_POO: veh.RO_MAC_POO,
                                RO_ZONA_POO: veh.RO_ZONA_POO,
                                RO_CALL_POO: veh.RO_CALL_POO,
                                RO_NRO_POO: veh.RO_NRO_POO,
                                RO_CEL_POO: veh.RO_CEL_POO,
                                RO_TEL_POO: veh.RO_TEL_POO,
                                RO_ASI_V: veh.RO_ASI_V,

                            });
                     
         var z = JSON.stringify( $scope.vehic3, function( key, value ) {
          if( key === "$$hashKey" ) {
              return undefined;
          }
          return value;
      });

    console.log($scope.datos.sucursal,'$scope.datos.sucursal0000000');  
        var din= new asig_dinamico();
        din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador2+'$$,$$'+$scope.PLACA_I+'$$,$$'+$scope.datos.sucursal+'$$,$$'+z+'$$,1,null,$$'+ $scope.datos.RO_MOD +'$$,$$I_Renov$$)';
        console.log(din.consulta,'55'); 
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
        var x = results.success.data[0].sp_dinamico;
        console.log("xadiciomnar",x);
        console.log(results.success.data[0].sp_dinamico,'results');
       });
            veh.RO_PLA_V=""; veh.RO_CLA_V=""; veh.RO_MAR_V=""; veh.RO_TIP_V="";
            veh.RO_MOD_V=""; veh.RO_COL_V=""; veh.RO_PUE_V=""; veh.RO_RAD_V="";
            veh.RO_CI_P=""; veh.RO_EXP_P=""; veh.RO_NOM_P="";veh.RO_PAT_P="";
            veh.RO_MAT_P="";veh.RO_MAC_P=""; veh.RO_ZONA_P=""; veh.RO_CALL_P="";veh.RO_NRO_P="";
            veh.RO_CI_POO=""; veh.RO_EXP_POO=""; veh.RO_NOM_POO="";veh.RO_PAT_POO="";
            veh.RO_MAT_POO=""; veh.RO_MAC_POO=""; veh.RO_ZONA_POO=""; veh.RO_CALL_POO="";
            veh.RO_NRO_POO="";veh.RO_CEL_POO="";veh.RO_TEL_POO=""; veh.RO_ASI_V="";
            $scope.desabilitado = true;
                     }
               else{
                        console.log($scope.datos.RO_MOD_V,'.RO_MOD_V');                  
                if($scope.tipo_act=='SUCURSAL'&& $scope.datos.RO_MOD_V>=2009 && $scope.datos.RO_MOD_V<=2019)
                    {
                            $scope.vehic3.push({
                               // id: id,
                                sucursal: veh.sucursal,
                                RO_COL_V: veh.RO_COL_V,
                                RO_PLA_V: veh.RO_PLA_V,
                                RO_TIP_V: veh.RO_TIP_V,
                                RO_CLA_V: veh.RO_CLA_V,
                                RO_MAR_V: veh.RO_MAR_V,
                                RO_MOD_V: veh.RO_MOD_V,
                                RO_COL_V: veh.RO_COL_V,
                                RO_PUE_V: veh.RO_PUE_V,
                                RO_RAD_V: veh.RO_RAD_V,
                                RO_EST_V: 'EN PROCESO',
                                RO_CI_P: veh.RO_CI_POO,
                                RO_EXP_P: veh.RO_EXP_POO,
                                RO_NOM_P: veh.RO_NOM_POO,
                                RO_PAT_P: veh.RO_PAT_POO,
                                RO_MAT_P: veh.RO_MAT_POO,
                                RO_MAC_P: veh.RO_MAC_POO,
                                RO_ZONA_P: veh.RO_ZONA_POO,
                                RO_CALL_P: veh.RO_NOM_VIA_POO,
                                RO_NRO_P: veh.RO_NRO_POO,
                                RO_CI_POO: veh.RO_CI_POO,
                                RO_EXP_POO: veh.RO_EXP_POO,
                                RO_NOM_POO: veh.RO_NOM_POO,
                                RO_PAT_POO: veh.RO_PAT_POO,
                                RO_MAT_POO: veh.RO_MAT_POO,
                                RO_MAC_POO: veh.RO_MAC_POO,
                                RO_ZONA_POO: veh.RO_ZONA_POO,
                                RO_CALL_POO: veh.RO_CALL_POO,
                                RO_NRO_POO: veh.RO_NRO_POO,
                                RO_CEL_POO: veh.RO_CEL_POO,
                                RO_TEL_POO: veh.RO_TEL_POO,
                                RO_ASI_V: veh.RO_ASI_V,                                
                            });

                     var z = JSON.stringify( $scope.vehic3, function( key, value ) {
          if( key === "$$hashKey" ) {
              return undefined;
          }
          return value;
      });

    console.log($scope.datos.sucursal,'$scope.datos.sucursal0000000');
            var din= new asig_dinamico();
        din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador2+'$$,$$'+$scope.PLACA_I+'$$,$$'+$scope.datos.sucursal+'$$,$$'+z+'$$,$$'+1+'$$,null,$$'+ $scope.datos.RO_MOD +'$$,$$'+'I_Renov'+'$$)';
        console.log(din.consulta,'55555555555555555555555555555555555');
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
        var x = results.success.data[0].sp_dinamico;
        console.log("xadiciomnar",x);
        console.log(results.success.data[0].sp_dinamico,'results');
       });
        console.log($scope.vehic,'adicion5555');
        console.log($scope.datos.RO_G_VEHICULO,'$scope.datos.RO_G_VEHICULO33333333333333333');

            veh.RO_PLA_V=""; veh.RO_CLA_V=""; veh.RO_MAR_V=""; veh.RO_TIP_V="";
            veh.RO_MOD_V=""; veh.RO_COL_V=""; veh.RO_PUE_V=""; veh.RO_RAD_V="";
            veh.RO_CI_P=""; veh.RO_EXP_P=""; veh.RO_NOM_P="";veh.RO_PAT_P="";
            veh.RO_MAT_P="";veh.RO_MAC_P=""; veh.RO_ZONA_P=""; veh.RO_CALL_P="";veh.RO_NRO_P="";
            veh.RO_CI_POO=""; veh.RO_EXP_POO=""; veh.RO_NOM_POO="";veh.RO_PAT_POO="";
            veh.RO_MAT_POO=""; veh.RO_MAC_POO=""; veh.RO_ZONA_POO=""; veh.RO_CALL_POO="";
            veh.RO_NRO_POO="";veh.RO_CEL_POO="";veh.RO_TEL_POO=""; veh.RO_ASI_V="";
            $scope.desabilitado = true;

                      }
                      else
                      {
                                  alertify.success('Falló el registro: MODELO del vehículo debe tener solo 10 años de antiguedad', 'error');

                      }
                    
                
                        console.log($scope.vehic,'adicion');
                        $scope.datos.RO_G_VEHICULO='';
                        console.log($scope.datos.RO_G_VEHICULO,'DATOS oficinas');
                }
            
        }

        $scope.listar_veh_Inc($scope.datos.sucursal);
       // 
    }
    $scope.modificarVeh = function(veh,index){
      $scope.datos.tip_servicio=veh.RO_MOD;
      $scope.desabilitado = false;
      console.log(veh, 'mod veh');
            $scope.veh_id = veh.veh_id;
            console.log($scope.veh_id);
            var zVeh = JSON.stringify(veh, function( key, value ) {
                if( key === "$$hashKey" ) {
                    return undefined;
                } 
                return value;
            });
            zVeh=JSON.parse(zVeh);
            console.log(zVeh, 'z   ');
            zVeh=zVeh.veh_datos[0];
            console.log(zVeh, 'z ultimo    ');
          $scope.distritoZonas(zVeh.RO_MAC_P);
          $scope.distritoZonas(zVeh.RO_MAC_POO);
            console.log(zVeh, 'mod zVeh');
            $scope.onlyy=true;
            $scope.botonss="upd";  
            //$scope.registro.sucursal=veh.sucursal;
            $scope.datos.RO_MOD_V=zVeh.RO_MOD_V;
            console.log($scope.datos.RO_MOD_V,'$scope.datos.RO_MOD_V');
            $scope.datos.RO_COL_V=zVeh.RO_COL_V;
            $scope.datos.RO_PLA_V=zVeh.RO_PLA_V;
            $scope.datos.RO_CLA_V=zVeh.RO_CLA_V;
            $scope.datos.RO_MAR_V=zVeh.RO_MAR_V ;
            $scope.datos.RO_TIP_V=zVeh.RO_TIP_V;
            $scope.datos.RO_COL_V=zVeh.RO_COL_V;
            $scope.datos.RO_PUE_V=zVeh.RO_PUE_V;
            $scope.datos.RO_RAD_V=zVeh.RO_RAD_V;
            $scope.datos.RO_EST_V=zVeh.RO_EST_V;
            $scope.datos.RO_ASI_V=zVeh.RO_ASI_V;
            $scope.datos.RO_CI_POO=zVeh.RO_CI_POO;
            $scope.datos.RO_EXP_POO=zVeh.RO_EXP_POO;
            $scope.datos.RO_NOM_POO=zVeh.RO_NOM_POO;
            $scope.datos.RO_PAT_POO=zVeh.RO_PAT_POO;
            $scope.datos.RO_MAT_POO=zVeh.RO_MAT_POO;
            $scope.datos.RO_MAC_POO=zVeh.RO_MAC_POO;
            $scope.datos.RO_ZONA_POO=zVeh.RO_ZONA_POO;
            $scope.datos.RO_CALL_POO=zVeh.RO_CALL_POO;
            $scope.datos.RO_NRO_POO=zVeh.RO_NRO_POO;
            $scope.datos.RO_TEL_POO=zVeh.RO_TEL_POO;
            $scope.datos.RO_CEL_POO=zVeh.RO_CEL_POO;
            $scope.datos.RO_CI_P=zVeh.RO_CI_P;
            $scope.datos.RO_EXP_P=zVeh.RO_EXP_P;
            $scope.datos.RO_NOM_P=zVeh.RO_NOM_P;
            $scope.datos.RO_PAT_P=zVeh.RO_PAT_P;
            $scope.datos.RO_MAT_P=zVeh.RO_MAT_P;
            $scope.datos.RO_MAC_P=zVeh.RO_MAC_P;
            $scope.datos.RO_ZONA_P=zVeh.RO_ZONA_P;
            $scope.datos.RO_CALL_P=zVeh.RO_CALL_P;
            $scope.datos.RO_NRO_P=zVeh.RO_NRO_P;
            $scope.macrodistritos();
            $scope.distritoZonas(zVeh.RO_MAC_P);
            $scope.distritoZonas(zVeh.RO_MAC_POO);
            console.log(index, 'datos index');
            $scope.indexx = index;
            console.log($scope.zVeh,'$scope.zVeh');
        }
    $scope.modificarVehiculos = function(vehiculo){
      $scope.vehic4=[];
            console.log(vehiculo, 'datos vehiculo');
            if( $scope.datos.sucursal=='' || $scope.datos.sucursal==undefined ||  $scope.datos.RO_PLA_V=='' || $scope.datos.RO_PLA_V==undefined || 
            $scope.datos.RO_TIP_V=='' || $scope.datos.RO_TIP_V==undefined ||  $scope.datos.RO_CLA_V=='' || $scope.datos.RO_CLA_V==undefined || 
            $scope.datos.RO_MAR_V=='' || $scope.datos.RO_MAR_V==undefined ||  $scope.datos.RO_MOD_V=='' || $scope.datos.RO_MOD_V==undefined || 
            $scope.datos.RO_COL_V=='' || $scope.datos.RO_COL_V==undefined ||  $scope.datos.RO_PUE_V=='' || $scope.datos.RO_PUE_V==undefined || 
            $scope.datos.RO_RAD_V=='' || $scope.datos.RO_RAD_V==undefined //||  $scope.datos.RO_CI_P=='' || $scope.datos.RO_CI_P==undefined || 
            //$scope.datos.RO_EXP_P=='' || $scope.datos.RO_EXP_P==undefined ||  $scope.datos.RO_NOM_P=='' || $scope.datos.RO_NOM_P==undefined || 
            //$scope.datos.RO_PAT_P=='' || $scope.datos.RO_PAT_P==undefined ||  $scope.datos.RO_MAT_P=='' || $scope.datos.RO_MAT_P==undefined ||
            //$scope.datos.RO_MAC_P=='' || $scope.datos.RO_MAC_P==undefined ||  $scope.datos.RO_ZONA_P=='' || $scope.datos.RO_ZONA_P==undefined ||
            //$scope.datos.RO_CALL_P=='' || $scope.datos.RO_CALL_P==undefined ||  $scope.datos.RO_NRO_P=='' || $scope.datos.RO_NRO_P==undefined ||
          
          /*  $scope.datos.RO_EXP_POO=='' || $scope.datos.RO_EXP_POO==undefined ||  $scope.datos.RO_NOM_POO=='' || $scope.datos.RO_NOM_POO==undefined || 
            $scope.datos.RO_PAT_POO=='' || $scope.datos.RO_PAT_POO==undefined ||  //$scope.datos.RO_MAT_POO=='' || $scope.datos.RO_MAT_POO==undefined ||
            $scope.datos.RO_MAC_POO=='' || $scope.datos.RO_MAC_POO==undefined ||  $scope.datos.RO_ZONA_POO=='' || $scope.datos.RO_ZONA_POO==undefined ||
            $scope.datos.RO_CALL_POO=='' || $scope.datos.RO_CALL_POO==undefined ||  $scope.datos.RO_NRO_POO=='' || $scope.datos.RO_NRO_POO==undefined ||
            $scope.datos.RO_CI_POO=='' || $scope.datos.RO_CI_POO==undefined*/
            )
            {
                alertify.success('Complete los datos para modificar el registro', 'error');
            }
            else
            {

         var of = JSON.stringify( $scope.ofici, function( key, value ) {
          if( key === "$$hashKey" ) {
              return undefined;
          }
          return value;
      });
            $scope.of=JSON.parse(of);
              /*for (var i = 0; i < $scope.of.length; i++) {
                      console.log($scope.of.length,'of.length');
                       if($scope.of[i].ofi_datos[0].RO_MAC_OF==vehiculo.sucursal)
                       {
                        $scope.tipo_actmod=$scope.of[i].ofi_datos[0].RO_TIP_ACT;
                        console.log($scope.tipo_actmod, '$scope.tipo_act123333333333333333333');
                       }
                    };*/
            $scope.tipo_actmod='MATRIZ';
            if($scope.tipo_actmod=='MATRIZ')  
            {
              console.log('entra');
                             $scope.vehic4.push({
                                sucursal: vehiculo.sucursal,
                                RO_COLOR: $scope.miColor,
                                RO_PLA_V: vehiculo.RO_PLA_V,
                                RO_TIP_V: vehiculo.RO_TIP_V,
                                RO_CLA_V: vehiculo.RO_CLA_V,
                                RO_MAR_V: vehiculo.RO_MAR_V,
                                RO_MOD_V: vehiculo.RO_MOD_V,
                                RO_COL_V: vehiculo.RO_COL_V,
                                RO_PUE_V: vehiculo.RO_PUE_V,
                                RO_RAD_V: vehiculo.RO_RAD_V,
                                RO_EST_V: vehiculo.RO_EST_V,
                                RO_ASI_V: vehiculo.RO_ASI_V,
                                RO_CI_P: vehiculo.RO_CI_P,
                                RO_EXP_P: vehiculo.RO_EXP_P,
                                RO_NOM_P: vehiculo.RO_NOM_P,
                                RO_PAT_P: vehiculo.RO_PAT_P,
                                RO_MAT_P: vehiculo.RO_MAT_P,
                                RO_MAC_P: vehiculo.RO_MAC_P,
                                RO_ZONA_P: vehiculo.RO_ZONA_P,
                                RO_CALL_P: vehiculo.RO_NOM_VIA_P,
                                RO_NRO_P: vehiculo.RO_NRO_P,
                                RO_CI_POO: vehiculo.RO_CI_POO,
                                RO_EXP_POO: vehiculo.RO_EXP_POO,
                                RO_NOM_POO: vehiculo.RO_NOM_POO,
                                RO_PAT_POO: vehiculo.RO_PAT_POO,
                                RO_MAT_POO: vehiculo.RO_MAT_POO,
                                RO_MAC_POO: vehiculo.RO_MAC_POO,
                                RO_ZONA_POO: vehiculo.RO_ZONA_POO,
                                RO_CALL_POO: vehiculo.RO_CALL_POO,
                                RO_NRO_POO: vehiculo.RO_NRO_POO,
                                RO_CEL_POO: vehiculo.RO_CEL_POO,
                                RO_TEL_POO: vehiculo.RO_TEL_POO,
                                //RO_ASI_VEH:  
                           });
                console.log($scope.vehic4,'$scope.ofici4');
                       $scope.vehic4 = JSON.stringify($scope.vehic4); 
       console.log($scope.datos.sucursal,'$scope.datos.sucursal0000000');
        var din= new asig_dinamico();
        //din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.sucursal+'$$,$$['+z[i]+']$$,$$'+1+'$$)';
       din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador2+'$$,$$'+vehiculo.RO_PLA_V+'$$,$$'+$scope.datos.sucursal+'$$,$$'+$scope.vehic4+'$$,1,$$'+$scope.veh_id+'$$,$$'+ $scope.datos.RO_MOD +'$$,$$'+'U'+'$$)';
       //din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador+'$$,$$'+$scope.PLACA_I+'$$,$$'+$scope.datos.sucursal+'$$,$$'+z+'$$,$$'+1+'$$,null,$$'+ $scope.datos.tip_servicio +'$$,$$'+'I'+'$$)';

        console.log(din.consulta,'555555555555');
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
          $scope.vehic = results.success.data[0].sp_dinamico;
          $scope.vehic = $scope.vehic[0].sp_abm_operador_veh;
          console.log(results.success.data[0].sp_dinamico,'results');
          alertify.success('Registro modificado');
      });  
                  vehiculo.RO_PLA_V=""; vehiculo.RO_CLA_V=""; vehiculo.RO_MAR_V=""; vehiculo.RO_TIP_V="";
            vehiculo.RO_MOD_V=""; vehiculo.RO_COL_V=""; vehiculo.RO_PUE_V=""; vehiculo.RO_RAD_V=""; vehiculo.RO_ASI_V="";
            vehiculo.RO_CI_P=""; vehiculo.RO_EXP_P=""; vehiculo.RO_NOM_P="";vehiculo.RO_PAT_P="";
            vehiculo.RO_MAT_P="";vehiculo.RO_MAC_P=""; vehiculo.RO_ZONA_P=""; vehiculo.RO_CALL_P="";vehiculo.RO_NRO_P="";
            vehiculo.RO_CI_POO=""; vehiculo.RO_EXP_POO=""; vehiculo.RO_NOM_POO="";vehiculo.RO_PAT_POO="";
            vehiculo.RO_MAT_POO=""; vehiculo.RO_MAC_POO=""; vehiculo.RO_ZONA_POO=""; vehiculo.RO_CALL_POO="";
            vehiculo.RO_NRO_POO="";vehiculo.RO_CEL_POO="";vehiculo.RO_TEL_POO="";
            $scope.veplaca=vehiculo.RO_PLA_V; 
      
            }
               else{

                if($scope.datos.RO_MOD_V>=2009 && $scope.datos.RO_MOD_V<=2018)
                    {
                        console.log($scope.datos.RO_MOD_V,'$scope.datos.RO_MOD_V');
                          $scope.vehic4.push({
                                sucursal: vehiculo.sucursal,
                                RO_COLOR: $scope.miColor,
                                RO_PLA_V: vehiculo.RO_PLA_V,
                                RO_TIP_V: vehiculo.RO_TIP_V,
                                RO_CLA_V: vehiculo.RO_CLA_V,
                                RO_MAR_V: vehiculo.RO_MAR_V,
                                RO_MOD_V: vehiculo.RO_MOD_V,
                                RO_COL_V: vehiculo.RO_COL_V,
                                RO_PUE_V: vehiculo.RO_PUE_V,
                                RO_RAD_V: vehiculo.RO_RAD_V,
                                RO_EST_V: vehiculo.RO_EST_V,
                                RO_ASI_V: vehiculo.RO_ASI_V,
                                RO_CI_P: vehiculo.RO_CI_P,
                                RO_EXP_P: vehiculo.RO_EXP_P,
                                RO_NOM_P: vehiculo.RO_NOM_P,
                                RO_PAT_P: vehiculo.RO_PAT_P,
                                RO_MAT_P: vehiculo.RO_MAT_P,
                                RO_MAC_P: vehiculo.RO_MAC_P,
                                RO_ZONA_P: vehiculo.RO_ZONA_P,
                                RO_CALL_P: vehiculo.RO_NOM_VIA_P,
                                RO_NRO_P: vehiculo.RO_NRO_P,
                                RO_CI_POO: vehiculo.RO_CI_POO,
                                RO_EXP_POO: vehiculo.RO_EXP_POO,
                                RO_NOM_POO: vehiculo.RO_NOM_POO,
                                RO_PAT_POO: vehiculo.RO_PAT_POO,
                                RO_MAT_POO: vehiculo.RO_MAT_POO,
                                RO_MAC_POO: vehiculo.RO_MAC_POO,
                                RO_ZONA_POO: vehiculo.RO_ZONA_POO,
                                RO_CALL_POO: vehiculo.RO_CALL_POO,
                                RO_NRO_POO: vehiculo.RO_NRO_POO,
                                RO_CEL_POO: vehiculo.RO_CEL_POO,
                                RO_TEL_POO: vehiculo.RO_TEL_POO,

                           });
                console.log($scope.vehic4,'$scope.ofici4   2');
                       $scope.vehic4 = JSON.stringify($scope.vehic4); 
       console.log($scope.datos.sucursal,'$scope.datos.sucursal0000000');
        var din= new asig_dinamico();
        //din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.sucursal+'$$,$$['+z[i]+']$$,$$'+1+'$$)';
//        din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador2+'$$,$$'+vehiculo.RO_PLA_V+'$$,$$'+$scope.datos.sucursal+'$$,$$'+$scope.vehic4+'$$,1,$$'+$scope.veh_id+'$$,$$'+'U'+'$$)';
       din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador2+'$$,$$'+vehiculo.RO_PLA_V+'$$,$$'+$scope.datos.sucursal+'$$,$$'+$scope.vehic4+'$$,1,$$'+$scope.veh_id+'$$,$$'+ $scope.datos.RO_MOD +'$$,$$'+'U'+'$$)';

        console.log(din.consulta,'55555555555555555555555555555555555');
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
          $scope.vehic = results.success.data[0].sp_dinamico;
          $scope.vehic = $scope.vehic[0].sp_abm_operador_veh;
          console.log(results.success.data[0].sp_dinamico,'results');
          alertify.success('Registro modificado');
      });  
            vehiculo.RO_PLA_V=""; vehiculo.RO_CLA_V=""; vehiculo.RO_MAR_V=""; vehiculo.RO_TIP_V=""; vehiculo.RO_ASI_V="";
            vehiculo.RO_MOD_V=""; vehiculo.RO_COL_V=""; vehiculo.RO_PUE_V=""; vehiculo.RO_RAD_V="";
            vehiculo.RO_CI_P=""; vehiculo.RO_EXP_P=""; vehiculo.RO_NOM_P="";vehiculo.RO_PAT_P="";
            vehiculo.RO_MAT_P="";vehiculo.RO_MAC_P=""; vehiculo.RO_ZONA_P=""; vehiculo.RO_CALL_P="";vehiculo.RO_NRO_P="";
            vehiculo.RO_CI_POO=""; vehiculo.RO_EXP_POO=""; vehiculo.RO_NOM_POO="";vehiculo.RO_PAT_POO="";
            vehiculo.RO_MAT_POO=""; vehiculo.RO_MAC_POO=""; vehiculo.RO_ZONA_POO=""; vehiculo.RO_CALL_POO="";
            vehiculo.RO_NRO_POO="";vehiculoNONO.RO_CEL_POO="";vehiculo.RO_TEL_POO="";
            $scope.veplaca=vehiculo.RO_PLA_V; 
            }
              else
              {
                  alertify.success('MODELO del vehículo debe tener solo 10 años de antiguedad', 'error');

              }
            }
        }

        $scope.onlyy=true;
        $scope.botonss="new";
        //$scope.listar_veh(vehiculo.sucursal);
            $scope.listar_veh_Inc($scope.datos.sucursal);
           }

        $scope.removeElement_Veh = function(veh,idx){
          console.log(veh,' datos veh eliminar');
           // $scope.vehic.splice(idx,1);
            var din= new asig_dinamico();
            $scope.veh_id=veh.veh_id;
             var ofis= veh.veh_datos[0].sucursal;
        //din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.sucursal+'$$,$$['+z[i]+']$$,$$'+1+'$$)';   $scope.veh_id
        din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador2+'$$,$$'+veh.veh_placa+'$$,$$'+ofis+'$$,$${}$$,1,$$'+$scope.veh_id+'$$,$$'+ $scope.datos.RO_MOD +'$$,$$D$$)';
        console.log(din.consulta,'55555555555555555555555555555555555');
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
          });
        //$scope.listar_veh(ofis);
        $scope.listar_veh_Inc($scope.datos.sucursal);

        };

          $scope.listar_veh_pl = function(of){
            $scope.oficinaid = of;
              console.log(of,'offffffffffffffffffffff');
              $scope.vehic = [];
              var din= new asig_dinamico();
                  din.consulta='select veh_placa where veh_ope_id=$$'+$scope.datos.idOperador2+'$$ and veh_oficina=$$'+of+'$$ and veh_estado=$$'+'A'+'$$' ;
                  din.dinamico(function(results){
                  results = JSON.parse(results);
                  console.log(results,'results');                
                  if(results.success.data[0].sp_dinamico != null){
                    
                      $scope.vehic_pl=results.success.data[0].sp_dinamico;
                      console.log('pista nro 1',$scope.vehic_pl);
                      for (var i = 0; i < $scope.vehic_pl.length; i++) {
                        $scope.placas = $scope.vehic_pl[i].veh_placa;
                      };
                     // $scope.datos.RO_G_VEHICULO=$scope.vehic;
                     // $scope.$apply();
                  }
              });
          }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////// REGISTRO CONDUCTORES  ///////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.almacenarDatos2 = function (cond) { 
      console.log(cond,'cond');
      $scope.cond_id = cond.cond_id;
      console.log($scope.cond_id,'cond_ idx');                       
    };
       $scope.agregarObservacion2  = function (datos) {
            var din= new asig_dinamico();
            din.consulta='select * from sp_insertar_observaciones_conductor_vehiculo($$'+ $scope.cond_id +'$$,$$C$$,$$'+datos.observaciones+'$$,$$1$$)';
            console.log(din.consulta,'din.consulta ofobservaciones ');
            din.dinamico(function(results){
            results = JSON.parse(results);                
            if(results.success.data[0].sp_dinamico != null){
              alertify.success('Se agrego las observación');
                console.log('pista nro 2 observacion');
            }
        });
            console.log('=====>>>>>',$scope.datos.RO_MAC_OF);
            $scope.listar_Cond($scope.oficinaid);
       }; 

    $scope.listarObservaciones2 = function(datos,cond){
      $scope.datarequisitos = [];
       $scope.cond_id = cond.cond_id;
        var din= new asig_dinamico();
          din.consulta='select * from sp_lst_observaciones($$'+$scope.cond_id+'$$,$$C$$)';
          console.log(din.consulta,'din.consulta ofobservaciones lst');
          din.dinamico(function(results){
          results = JSON.parse(results);                
          if(results.success.data[0].sp_dinamico != null){
            $scope.datarequisitos = results.success.data[0].sp_dinamico;
           // alertify.success('Se agrego las observación');
              console.log('pista nro 2 observacion', $scope.datarequisitos);
              angular.forEach($scope.datarequisitos,function(celda, fila){
                {
                    $scope.checkboxes.items[celda['id']]=false;
                }
            });
          }
       });
    };

    //***********************************prueba de la grila editable
    $scope.quitarObservacion = function (){
      var cont = 0;
        angular.forEach($scope.datarequisitos,function(celda, fila){
            console.log(celda);
            var id_reqid=celda['id'];
            console.log(id_reqid,'id_reqid');
            var estadoHab = '';
            if($scope.checkboxes.items[id_reqid]){
                console.log('hola');
                console.log(id_reqid,'hththythyth');
                console.log(id_reqid,'');

                var adjunto = {};

                var din= new asig_dinamico();
                  din.consulta='select * from sp_elimina_observaciones_conductor_vehiculo($$'+ id_reqid +'$$,$$1$$)';
                  console.log(din.consulta,'din.consulta ofobservaciones lst');
                  din.dinamico(function(results){
                  results = JSON.parse(results); 
                  console.log(results,'results op');               
                  if(results.success.data[0].sp_dinamico != null){
                 //   alertify.success('Se agrego las observación');
                      console.log('pista nro 2 observacion');
                  }
              });
            }            
        }); 
          $scope.listar_veh($scope.oficinaid);       
          $scope.listar_Cond($scope.oficinaid);        
    };

              $scope.listar_Cond = function(of){
               // alert(123);
                $scope.oficinaid = of;
                  console.log(of,'offffffffffffffffffffff');
                  console.log($scope.datos.idOperador2,'$scope.datos.idOperador ip ope ....');                  
                      var din1= new asig_dinamico();
                      din1.consulta='select * from sp_vencidos_conductores($$'+$scope.datos.idOperador2+'$$)';
                      console.log(din1.consulta,'5555555555555555');
                      din1.dinamico(function(results){
                      results = JSON.parse(results);
                      });
                     $scope.conduc = [];
                     var din= new asig_dinamico();
                      din.consulta ='select cond_id, cond_datos, cond_estado_doc,cond_vigencia_a ,$$TIENE OBSERVACION$$ as obs from _mv_ope_conductores_datos inner join _mv_observaciones on obs_id_op_condveh = cond_id and obs_estado = $$A$$ where cond_ope_id=$$'+$scope.datos.idOperador2+'$$ and cond_oficina=$$'+of+'$$ and cond_estado=$$A$$ and (cond_estado_doc!=$$OBSERVADO$$) and cond_vigencia_a is not null UNION ALL SELECT cond_id,cond_datos, cond_estado_doc,cond_vigencia_a ,$$$$ as obs FROM _mv_ope_conductores_datos WHERE  cond_ope_id=$$'+$scope.datos.idOperador2+'$$ and cond_oficina=$$'+of+'$$ and cond_estado=$$A$$ and cond_vigencia_a is not null and (cond_estado_doc!=$$OBSERVADO$$) AND cond_id NOT IN (select cond_id from _mv_ope_conductores_datos inner join _mv_observaciones on obs_id_op_condveh = cond_id and obs_estado = $$A$$ where cond_ope_id=$$'+$scope.datos.idOperador2+'$$ and cond_oficina=$$'+of+'$$ and cond_estado=$$A$$ and (cond_estado_doc=$$APROBADO$$) and cond_vigencia_a is not null)';          
                      din.dinamico(function(results){
                      results = JSON.parse(results);
                      console.log(results,'resuts 123456789');            
                    //if(results.success.data[0].sp_dinamico != null){                      
                        $scope.conduc=results.success.data[0].sp_dinamico;
                        console.log('pista nro 1->',$scope.conduc);
                        $scope.datos.RO_G_CONDUCTORES=$scope.conduc;
                        var din= new asig_dinamico();
                        din.consulta='select current_date';
                        din.dinamico(function(results){
                        results = JSON.parse(results);
                        $scope.fechaActual=results.success.data[0].sp_dinamico;
                        $scope.fechaActual = $scope.fechaActual[0].date;
                        console.log($scope.fechaActual,'$scope.fechaActual 0000');       
                       });
                          for (var i = 0; i < $scope.conduc.length; i++) {
                            console.log($scope.conduc,'$scope.conduc prueba');
                            if(new Date($scope.conduc[i].cond_vigencia_a).getTime() < new Date($scope.fechaActual).getTime()){                         
                              $scope.condid = $scope.conduc[i].cond_id;
                              $scope.ci1 = $scope.conduc[i].cond_datos;
                              console.log($scope.ci1,'$scope.ci111111 0');
                              $scope.ci1 = $scope.ci1[0].RO_CI_C;
                              console.log($scope.ci1,'$scope.ci111111');
                              $scope.conduc[i].valida=true;
                             // $scope.datos.RO_REN_V = $scope.conduc[i].RO_REN_V;
                              console.log($scope.conduc[i].RO_REN_C ,'$scope.datos.RO_REN_C ----------ZZZZZZ');
                              $scope.conduc[i].cond_datos[0].RO_EST_C='EN PROCESO';  
                              console.log('$scope.conduc[i]---------66666666666888888',$scope.conduc[i]);
                              $scope.datoscon = JSON.stringify($scope.conduc[i].cond_datos);
                              var din= new asig_dinamico();
                              din.consulta='select * from sp_abm_operador_cond($$'+$scope.datos.idOperador2+'$$,$$'+ $scope.oficinaid +'$$,$$'+$scope.ci1+'$$,$$'+$scope.datoscon+'$$,$$'+ $scope.condid +'$$,$$1$$,$$'+'U'+'$$)';
                              console.log(din.consulta,'5555555555555555');
                              din.dinamico(function(results){
                              results = JSON.parse(results);
                              console.log(results,'results123');                            
                            });  
                            }
                            else{
                             $scope.conduc[i].valida=false; 
                            }
                          };                         
                          $scope.$apply();
                     /* }else{
                          $scope.conduc = [];
                      }*/
                  });
              }

              $scope.listar_cond_Inc = function(of){
                $scope.oficinaid = of;
                  $scope.conduc = [];
                  var din= new asig_dinamico();
                      din.consulta=' select cond_id,cond_datos,cond_ci, cond_oficina from _mv_ope_conductores_datos where cond_ope_id=$$'+$scope.datos.idOperador2+'$$ and cond_oficina=$$'+of+'$$ and cond_estado=$$A$$ and cond_estado_doc is null';
                      console.log(din.consulta,'din.consulta');
                      din.dinamico(function(results){
                      results = JSON.parse(results);                      
                      if(results.success.data[0].sp_dinamico != null){                        
                          $scope.conduc=results.success.data[0].sp_dinamico;
                          $scope.datos.RO_G_CONDUCTORES = $scope.conduc;
                          $scope.$apply();
                      }else{
                          $scope.conduc = [];
                      }
                  });
              }

           ////////////////////////////////////////Datos conductores/////////////////////////////////////////////////////////////////////////////

              $scope.guardarDatosConductores = function(cond){
                $scope.conduc3=[];
                if(              
              $scope.datos.RO_EXP_C=='' || $scope.datos.RO_EXP_C==undefined ||  $scope.datos.RO_NOM_C=='' || $scope.datos.RO_NOM_C==undefined || 
              $scope.datos.RO_PAT_C=='' || $scope.datos.RO_PAT_C==undefined ||  $scope.datos.RO_MAT_C=='' || $scope.datos.RO_MAT_C==undefined ||
              $scope.datos.RO_MAC_C=='' || $scope.datos.RO_MAC_C==undefined ||  $scope.datos.RO_ZONA_C=='' || $scope.datos.RO_ZONA_C==undefined ||
              $scope.datos.RO_CALL_C=='' || $scope.datos.RO_CALL_C==undefined ||  $scope.datos.RO_NRO_C=='' || $scope.datos.RO_NRO_C==undefined ||

              $scope.datos.RO_OFI_CON=='' || $scope.datos.RO_OFI_CON==undefined ||  $scope.datos.RO_CAT_C=='' || $scope.datos.RO_CAT_C==undefined || 
              $scope.datos.RO_TIP_C=='' || $scope.datos.RO_TIP_C==undefined || $scope.datos.PLACA=='' || $scope.datos.PLACA==undefined)
              {
                  alertify.success('Complete los datos del conductor para realizar el registro', 'error');
              }
              else
              {
                $scope.ci_conductor=cond.RO_CI_C;
                              $scope.conduc3.push({
                                 // RO_OFI_CON: cond.RO_OFI_CON,
                                  RO_CI_C: cond.RO_CI_C,
                                  RO_EXP_C: cond.RO_EXP_C,
                                  RO_PAT_C: cond.RO_PAT_C,
                                  RO_MAT_C: cond.RO_MAT_C,
                                  RO_NOM_C: cond.RO_NOM_C,
                                  RO_CORR_C: cond.RO_CORR_C,
                                  RO_TEL_C: cond.RO_TEL_C,
                                  RO_CEL_C: cond.RO_CEL_C,
                                  RO_MAC_C: cond.RO_MAC_C,
                                  RO_ZONA_C: cond.RO_ZONA_C,
                                  RO_CALL_C: cond.RO_CALL_C,
                                  RO_NRO_C: cond.RO_NRO_C,
                                  RO_CAT_C: cond.RO_CAT_C,
                                  RO_TIP_C: cond.RO_TIP_C,  
                                  RO_OFI_CON: cond.RO_OFI_CON,
                                  PLACA: cond.PLACA,
                                  RO_EST_C: 'EN PROCESO',
                                  RO_FOT_C: '',
                              });
                          console.log($scope.conduc3,'adicion12121');
                          
             console.log($scope.datos.RO_G_OFICINAS,'DATOS oficinas');
            var z = JSON.stringify( $scope.conduc3, function( key, value ) {
            if( key === "$$hashKey" ) {
                return undefined;
            }
            return value;
        });
              var din= new asig_dinamico();
          din.consulta='select * from sp_abm_operador_cond($$'+$scope.datos.idOperador2+'$$,$$'+$scope.datos.RO_OFI_CON+'$$,$$'+$scope.ci_conductor+'$$,$$'+z+'$$,null,1,$$I_Renov$$)';
          din.dinamico(function(results){
          results = JSON.parse(results);
          console.log(results,'results');
          $scope.conduc = results.success.data[0].sp_dinamico;
          console.log($scope.conduc,'adicion77777');
          $scope.conduc = $scope.conduc[0].sp_abm_operador_cond;
          console.log($scope.conduc,'adicion33333');
          console.log(results.success.data[0].sp_dinamico,'results');
                  });
                        
              cond.RO_CI_C="";cond.RO_EXP_C=""; cond.RO_PAT_C=""; cond.RO_MAT_C=""; cond.RO_NOM_C="";
              cond.PLACA=""; cond.RO_CORR_C=""; cond.RO_TEL_C=""; cond.RO_CEL_C=""; cond.RO_MAC_C="";
              cond.RO_ZONA_C=""; cond.RO_CALL_C=""; cond.RO_NRO_C="";cond.RO_CAT_C="";cond.RO_TIP_C="";
                   if(typeof(google) != "undefined"){
//          google.maps.visualRefresh = true;
        }

          }
             
          console.log($scope.conduc,'adicion88888');
          $scope.listar_cond_Inc(cond.RO_OFI_CON);
          cond.longitud=-16.495635; cond.latitud=-68.133543;          
        }  
      $scope.modificarCond = function(cond,index){
         $scope.desabilitado = false; 
         $scope.cond_id=cond.cond_id;
              console.log(cond, 'mod condcTORES');
              $scope.cond_id = cond.cond_id;
              console.log($scope.cond_id);
              var zCond = JSON.stringify(cond, function( key, value ) {
                  if( key === "$$hashKey" ) {
                      return undefined;
                  } 
                  return value;
              });

              zCond=JSON.parse(zCond);
              console.log(zCond, 'z    ');
              zCond=zCond.cond_datos[0];
              console.log(zCond, 'z ultimo    ');
              $scope.distritoZonas(zCond.RO_MAC_C);
              $scope.onlyy=true;
              $scope.botonc="upd";
              $scope.datos.PLACA=zCond.PLACA;
              $scope.datos.RO_CI_C=zCond.RO_CI_C;
              $scope.datos.RO_EXP_C=zCond.RO_EXP_C;
              $scope.datos.RO_PAT_C=zCond.RO_PAT_C;
              $scope.datos.RO_MAT_C=zCond.RO_MAT_C;
              $scope.datos.RO_NOM_C=zCond.RO_NOM_C;
              $scope.datos.RO_CORR_C=zCond.RO_CORR_C;
              $scope.datos.RO_TEL_C=zCond.RO_TEL_C;
              $scope.datos.RO_CEL_C=zCond.RO_CEL_C;
              $scope.datos.RO_MAC_C=zCond.RO_MAC_C;
              console.log(zCond.RO_MAC_C,'zCond.RO_MAC_C  000');
              console.log($scope.datos.RO_MAC_C,'$scope.datos.RO_MAC_C 000');
              $scope.datos.RO_ZONA_C=zCond.RO_ZONA_C;
              $scope.datos.RO_CALL_C=zCond.RO_CALL_C;
              $scope.datos.RO_NRO_C=zCond.RO_NRO_C;
              $scope.datos.RO_CAT_C=zCond.RO_CAT_C;
              $scope.datos.RO_TIP_C=zCond.RO_TIP_C;
              console.log(index, 'datos index');
              $scope.indexx = index;
              console.log($scope.zCond,'$scope.zCond');
              //console.log($scope.zCond.RO_NOM_C,'$scope.RO_NOM_C');
          }

      $scope.modificarConductores = function(conductores){
              console.log(conductores, 'datos conductores ');
              $scope.conduc4=[];
              if($scope.datos.RO_EXP_C=='' || $scope.datos.RO_EXP_C==undefined ||  $scope.datos.RO_NOM_C=='' || $scope.datos.RO_NOM_C==undefined || 
              $scope.datos.RO_PAT_C=='' || $scope.datos.RO_PAT_C==undefined ||  $scope.datos.RO_MAT_C=='' || $scope.datos.RO_MAT_C==undefined ||
              $scope.datos.RO_MAC_C=='' || $scope.datos.RO_MAC_C==undefined ||  $scope.datos.RO_ZONA_C=='' || $scope.datos.RO_ZONA_C==undefined ||
              $scope.datos.RO_CALL_C=='' || $scope.datos.RO_CALL_C==undefined ||  $scope.datos.RO_NRO_C=='' || $scope.datos.RO_NRO_C==undefined ||
              $scope.datos.RO_CI_C=='' || $scope.datos.RO_CI_C==undefined ||  $scope.datos.RO_CAT_C=='' || $scope.datos.RO_CAT_C==undefined ||
              $scope.datos.RO_TIP_C=='' || $scope.datos.RO_TIP_C==undefined || $scope.datos.PLACA=='' || $scope.datos.PLACA==undefined )
              {
                  alertify.success('Complete los datos para modificar el registro', 'error');
              }
              else
              {
              var of = JSON.stringify( $scope.ofici, function( key, value ) {
                  if( key === "$$hashKey" ) {
                      return undefined;
                  }
                  return value;
              });
              $scope.of=JSON.parse(of);
                      $scope.conduc4.push({
                           // RO_OFI_CON: cond.RO_OFI_CON,
                            RO_CI_C: conductores.RO_CI_C,
                            RO_EXP_C: conductores.RO_EXP_C,
                            RO_PAT_C: conductores.RO_PAT_C,
                            RO_MAT_C: conductores.RO_MAT_C,
                            RO_NOM_C: conductores.RO_NOM_C,
                            RO_CORR_C: conductores.RO_CORR_C,
                            RO_TEL_C: conductores.RO_TEL_C,
                            RO_CEL_C: conductores.RO_CEL_C,
                            RO_MAC_C: conductores.RO_MAC_C,
                            RO_ZONA_C: conductores.RO_ZONA_C,
                            RO_CALL_C: conductores.RO_CALL_C,
                            RO_NRO_C: conductores.RO_NRO_C,
                            RO_CAT_C: conductores.RO_CAT_C,
                            RO_TIP_C: conductores.RO_TIP_C,  
                            RO_OFI_CON: conductores.RO_OFI_CON,
                            PLACA: conductores.PLACA,
                            RO_EST_C: 'EN PROCESO',
                        });
                  console.log($scope.conduc4,'$scope.conduc4');
                  console.log($scope.conduc4,'123456123456123111111111111');
                 $scope.conduc4 = JSON.stringify($scope.conduc4); 
             var din= new asig_dinamico();
             din.consulta='select * from sp_abm_operador_cond($$'+$scope.datos.idOperador2+'$$,$$'+ conductores.RO_CI_C +'$$,$$'+$scope.datos.RO_OFI_CON+'$$,$$'+$scope.conduc4+'$$,$$'+$scope.cond_id+'$$,1,$$U$$)';
             console.log(din.consulta,'55555555555555555555555555555555555');
             din.dinamico(function(results){
             results = JSON.parse(results);
            $scope.conduc = results.success.data[0].sp_dinamico;
            $scope.conduc = $scope.conduc[0].sp_abm_operador_cond;
            console.log(results.success.data[0].sp_dinamico,'results');
   
             });
              conductores.RO_EXP_C=""; conductores.RO_PAT_C=""; conductores.RO_MAT_C=""; conductores.RO_NOM_C="";
              conductores.RO_CORR_C=""; conductores.RO_TEL_C=""; conductores.RO_CEL_C=""; conductores.RO_MAC_C="";
              conductores.RO_ZONA_C=""; conductores.RO_CALL_C=""; conductores.RO_NRO_C=""; conductores.RO_CAT_C="";
              conductores.RO_TIP_C=""; conductores.PLACA="";
          $scope.onlyy=true;
          $scope.botonc="new";   
             
          }
          $scope.listar_cond_Inc(conductores.RO_OFI_CON);  
      }
           $scope.removeElement_Cond = function(cond,idx){
                console.log(cond,'cond delete');
                console.log(cond.cond_datos,'consddddddddddddddddd');
                var ci_cond=cond.cond_datos[0].RO_CI_C;
              var din= new asig_dinamico();
              $scope.cond_id=cond.cond_id;
              var ofis= cond.cond_datos[0].RO_OFI_CON;
          din.consulta='select * from sp_abm_operador_cond($$'+$scope.datos.idOperador2+'$$,$$'+ ci_cond +'$$,$$'+$scope.datos.RO_OFI_CON+'$$,$${}$$,$$'+$scope.cond_id+'$$,1,$$D$$)';
          console.log(din.consulta,'55555555555555555555555555555555555');
          din.dinamico(function(results){
          results = JSON.parse(results);
          console.log(results,'results123');
            });
          $scope.listar_cond_Inc(ofis);
          };

          $scope.sig = false;
          $scope.sig2 = true;
          $scope.datos_cond = false;
          $scope.datos_condsn = true;

          $scope.muestraVehiculos=function(){
              $scope.sig = false;
              $scope.sig2 = true;
              $scope.datos_cond=false;

          }
          $scope.muestra = function(){
              $scope.sig = false;
              $scope.sig2 = true;
          }

         $scope.recuperarSerializarInfo = function(tramite){
          console.log("tramites2: ", tramite);
          $scope.btover_c = true;
          //$scope.recuperarDatosRegistro();        
          var sIdTramite = tramite.vtra_id;
          $scope.sIdTramiteSeleccionado = tramite.vtra_id;
          var sIdCiudadano = sessionService.get('IDSOLICITANTE');//IDCIUDADANO
          var sIdServicio = sessionService.get('IDSERVICIO');
          var parametros  = {
                  "container":"RC_CLI",
                  "folder_path": sIdTramite
          };
          try {
              var rData = new datosFormularios();
              rData.frm_tra_id_ciudadano = sIdCiudadano;
              rData.frm_tra_dvser_id = sIdServicio;
              rData.frm_idTramite = sIdTramite;
              rData.splistafrmdatos(function(res){
                  r = JSON.parse(res);
                  results = r.success;
                  var formalmacenado    = "";
                  if(results){
                      datoform = JSON.parse(results[0].form_contenido); 
                      formalmacenado =   ((typeof(datoform.INT_FORM_ALMACENADO)    == 'undefined' || datoform.INT_FORM_ALMACENADO    == null) ? '' : datoform.INT_FORM_ALMACENADO);
                      if(formalmacenado == 'G'){
                          console.log("CUANDO EL FORMULARIO ESTA GUARDADO ESTADO G:");
                          $scope.datos.INT_FORM_ALMACENADO = 'G';
                          $rootScope.campoidform= results[0].form_id;
                          datos = JSON.parse(results[0].form_contenido);
                          $scope.adjuntosArray = datos.ARCHIVOS_MULTIPLES;
                          $scope.datos = datos;
                          if($scope.datos.f01_tipo_per == 'NATURAL' || $scope.datos.f01_tipo_per == 'N'){
                              $scope.datos.FILE_FOTOCOPIA_CI = $scope.datosinic.FILE_FOTOCOPIA_CI;
                              $scope.datos.FILE_FOTOCOPIA_CI_R = $scope.datosinic.FILE_FOTOCOPIA_CI_R;
                              $scope.datos.FILE_FACTURA_LUZ = $scope.datosinic.FILE_FACTURA_LUZ;
                          }else{
                               if($scope.datos.f01_tipo_per == 'JURIDICO' || $scope.datos.f01_tipo_per == 'J'){
                                  $scope.datos.FILE_FOTOCOPIA_CI = $scope.datosIniciales.FILE_FOTOCOPIA_CI_RA;
                                  $scope.datos.FILE_FOTOCOPIA_CI_R = $scope.datosIniciales.FILE_FOTOCOPIA_CI_RR;
                              }    
                          }
                          if($scope.datos.g_origen == 'POS/EMPR2017'){
                             if($scope.datos.swpublicidad == 'CP' && $scope.datos.sw_publicidad == 'CP'){
                             }
                          }
                          $scope.datos.IDTRAMITE = sIdTramite;
                          ///$scope.datos.doc_Adjuntos = datoFinalA;
                          $scope.publicid = [];
                          $scope.publicid = $scope.datos.publicidad;
                          $rootScope.looo = $scope.datos.INT_AC_longitud;
                          $rootScope.laaa = $scope.datos.INT_AC_latitud;
                          $scope.nroRegistros = datos.length;
                          }else if(formalmacenado == 'C'){
                              $scope.datos.IDTRAMITE = sIdTramite;
                              console.log("CUANDO EL FORMULARIO ESTA GUARDADO ESTADO C:");
                              $rootScope.campoidform= results[0].form_id;
                              $scope.formRegularRegistrado = JSON.parse(results[0].form_contenido);  
                              $scope.datos.INT_FORM_ALMACENADO = 'C';
                              $scope.iniciandoDatos();
                          }
                      else{
                          console.log("CUANDO EL FORMULARIO NO ESTA GUARDADO ESTADO");
                          $scope.nroRegistros = 0;
                          $scope.datos = "";
                          $scope.adjuntosArray = "";
                          $scope.iniciandoDatos();                        
                          sessionService.set('IDTRAMITE', sIdTramite);
                      }
                      //VALIDAR BOTONES ENVIO
                      $rootScope.$broadcast('iniciaBtnHabilitar', datoform.INT_FORM_ALMACENADO);
                  }

                  setTimeout(function(){
                      //$rootScope.$broadcast('validarBtnInternet', tramite.venviado);
                      $rootScope.$broadcast('validarBtnEnviar', results.length);
                      $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                      $rootScope.$broadcast('inicializarGrillaAE', [{'datos':$scope.datos, 'venviado':tramite.venviado}]);
                      $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                      $rootScope.$broadcast('inicializarHtmlForm', tramite);
                      }, 9000);
                  });
              } catch(error){
                  console.log("Error Interno : ", error);
              }
          }; 
           $scope.guardar_tramite = function(datos){
            console.log(datos,'guardar_tramite datos');                      
            datos.Tipo_tramite_creado = "WEB";
            try {
              console.log(datos,'datos    1');
                var datosSerializados= JSON.stringify(datos);
                var idCiudadano      = sessionService.get('IDSOLICITANTE');
                var serializarInfo = new reglasnegocio();
                serializarInfo.identificador = 'RCCIUDADANO_80';
                console.log($scope.idServicio,'$scope.idServicio');
                console.log($scope.idTramite,'$scope.idTramite');
                serializarInfo.parametros = JSON.stringify({"id_servicio":$scope.idServicio,"data_json":datosSerializados,"oid_ciudadano":idCiudadano,"id_usuario":1,"id_trm_form":$scope.idTramite});
                console.log(serializarInfo.parametros,'serializarInfo.parametros');
                serializarInfo.llamarregla(function(results){
                    r = JSON.parse(results);
                    if (r.error){
                        alertify.success("Formulario no almacenado");
                    } else {
                        alertify.success("Formulario almacenado");
                    }
                });
            }catch(e){
                console.log("Error al guardar Formulario",e);
            }
           
          } 
        };
