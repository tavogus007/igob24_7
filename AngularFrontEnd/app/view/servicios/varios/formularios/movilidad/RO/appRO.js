//app.controller('PCController', function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route) {
function PCCController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual) {

//alert(123);
$scope.vehic = [];
$scope.conduc = [];
$scope.publicid = [];
$scope.cond = {};
$scope.conductores = {};
$scope.enviado='';
$scope.tblTramites = {};
$scope.trmUsuario  =   [];
$scope.tipo_persona=sessionService.get('TIPO_PERSONA');
$scope.datos.tipo_persona = $scope.tipo_persona;
console.log($scope.datos.tipo_persona,'$scope.datos.tipo_persona 1111111');
console.log($scope.tipo_persona,'$scope.tipo_persona');
    $scope.mostrarMsgActividadTrue  = false;
    $scope.mostrarMsgActivisp_abm_operadordasp_abm_operadordFalse = false;
     $rootScope.datosFormMov402 = "";
    //$scope.btnEnviarFormLinea  =   "true";
    $scope.datos.RO_MOD='';
    $scope.multiple = '';
    $scope.licenciamultiple = false;
  var usuario = sessionService.get('TIPO_PERSONA');
  console.log(usuario,'usuario usuario usuario usuario');

   $scope.$on('api:ready',function(){ 
    $scope.tramitesCiudadano();
    $scope.datosJ();
    $scope.datosN();
    $scope.recuperandoDatosGenesis();
    clsIniciarGrillaAE();
    $scope.macrodistritos();
    $scope.getComboMarcaMovilidad();
    $scope.getComboClaseMovilidad();
    $scope.lssubcategoria();
    $scope.listar_viae();
     if(typeof(google) != "undefined"){
        google.maps.visualRefresh = true;
    }
    $scope.initMap();   

});

$scope.inicio = function () {
    $scope.tramitesCiudadano();
    $scope.datosJ();
    $scope.datosN();
    $scope.recuperandoDatosGenesis();
    clsIniciarGrillaAE();
    $scope.macrodistritos();
    $scope.getComboMarcaMovilidad();
    $scope.getComboClaseMovilidad();
    $scope.lssubcategoria();
    $scope.listar_viae();
     if(typeof(google) != "undefined"){
        google.maps.visualRefresh = true;
    }
    $scope.initMap();  

};
    $scope.$on('$destroy', function() {
       // clsValidarBtnEnviar();
        clsIniciarCamposInternet();
        clsIniciarGrillaAE();
        clsIniciarFechaObligatorio(); 
        clsIniciaBtnHabilitar(); 
        clsIniciarHtmlForm();
    });

    $scope.mostrarMsgActividadTrue  = false;
    $scope.mostrarMsgActividadFalse = false;
    $scope.tablaTramites        =   {};
    $scope.tramitesUsuario      =   [];
    $scope.datosGuardados = false;
$scope.startDateOpen2 = function($event) {
    console.log('fechaaaa');
    console.log($event);
   $event.preventDefault();
   $event.stopPropagation();
   $scope.startDateOpened2 = true;
};

$scope.startDateOpen1 = function($event) {
   $event.preventDefault();
   $event.stopPropagation();
   $scope.startDateOpened1 = true;
};

    $scope.primero=true;
  
    $scope.mostrarContenido=function(nro){
        console.log(nro);
        $scope.primero = false;
        $scope.segundo = false;
        $scope.tercero = false;
        $scope.cuarto = false;
        $scope.quinto = false;
        $scope.sexto = false;
        $scope.septimo = false;
        $scope.octavo = false;
        $scope.noveno = false;
        $scope.decimo = false;
            console.log(nro,'nro');
          if(nro==1)
          {$scope.primero=true;  }
           
          if(nro==2)
          { 
            if($scope.datos.RO_TIP_SOL==""|| $scope.datos.RO_TIP_SOL==undefined)
            {
                alertify.success('Completar el dato Tipo de Solicitud');

            }else{
            $scope.segundo=true;
            }
           } 
          if(nro==3)
           { 
            $scope.verif_operador();
            $scope.listar_of();
            console.log($scope.datos.RO_MAC_OF);
            $scope.distritoZonas($scope.datos.RO_MAC_OF);
           if($scope.datos.RO_TIP_SOL=='1')
              {
                console.log($scope.datos.RO_MOD,'$scope.datos.RO_MOD  //');
                $scope.datos.RO_MAC_OF=""; $scope.datos.RO_ZONA_OF=""; $scope.datos.RO_NOM_VIA_OF=""; $scope.datos.RO_ENT_CALL_OF=""; $scope.datos.RO_NRO_OF=""; $scope.datos.RO_CAN_VEH=""; $scope.datos.RO_DIR_GAR=""; $scope.datos.RO_PAR_NRO="";
                $scope.datos.RO_ESP_DIS=""; $scope.datos.RO_VIA_PAR_MOM=""; $scope.datos.RO_ENT_CALL="";
                console.log('entra mod 1');
              }

              $scope.tercero=true;
           }
         if(nro==4)
            {
              $scope.desabilitado = true; 
              $scope.datos.sucursal=''; $scope.datos.RO_PLA_V=''; $scope.datos.RO_TIP_V=''; $scope.datos.RO_CLA_V=''; $scope.datos.RO_MAR_V=''; $scope.datos.RO_MOD_V='';
              $scope.datos.RO_MOD_V=''; $scope.datos.RO_COL_V=''; $scope.datos.RO_PUE_V=''; $scope.datos.RO_RAD_V=''; $scope.datos.RO_CI_P=''; $scope.datos.RO_EXP_P='';
              $scope.datos.RO_NOM_P=''; $scope.datos.RO_PAT_P=''; $scope.datos.RO_MAT_P=''; $scope.datos.RO_MAC_P=''; $scope.datos.RO_ZONA_P=''; $scope.datos.RO_CALL_P='';
              $scope.datos.RO_NRO_P=''; $scope.datos.RO_EXP_POO='';  $scope.datos.RO_NOM_POO=''; $scope.datos.RO_NRO_POO=''; $scope.datos.RO_CI_POO='';
              $scope.datos.RO_PAT_POO=''; $scope.datos.RO_MAT_POO=''; $scope.datos.RO_MAC_POO=''; $scope.datos.RO_ZONA_POO=''; $scope.datos.RO_CALL_POO='';             
                $scope.listar_of();  
                $scope.ofiVeh=$scope.ofici[0].ofi_datos;           
                $scope.ofiVeh=$scope.ofiVeh[0].RO_MAC_OF;
                console.log($scope.ofiVeh,'$scope.ofiVeh');
              if($scope.ofici.length>1)
              {
                $scope.listar_veh_nuevo();
                $scope.cuarto=true;
                $scope.desabilitado = true; 
                $scope.macrodistritos();
              }
              else
              {
                 if($scope.ofici.length==1)
                 {
                  $scope.listar_veh_nuevo();
                 var din= new asig_dinamico();
                 console.log($scope.vehic, '123456789');
                 din.consulta='select * from sp_ope_oficinas_VehCond($$'+$scope.datos.idOperador+'$$,$$'+$scope.ofiVeh+'$$,$$'+'U_VEH'+'$$)';
                  console.log(din.consulta,'55555555555555555555555555555555555');
                  din.dinamico(function(results){
                  results = JSON.parse(results);
                  console.log(results,'results123');
                    console.log(results.success.data[0].sp_dinamico,'results');
                    }); 
                  $scope.listar_veh($scope.ofiVeh);
                  $scope.cuarto=true;                  
                  $scope.macrodistritos();
                 }
                 else
                 {
                  alertify.success('Realice el registro de Paso 3: Registro de las oficinas');               
                }
              }
            }
         if(nro==5)
            {
            $scope.desabilitado = true; 
            $scope.datos.RO_EXP_C='';  $scope.datos.RO_NOM_C=''; $scope.datos.RO_PAT_C='';  $scope.datos.RO_MAT_C=''; $scope.datos.RO_MAC_C='';  $scope.datos.RO_ZONA_C='';
            $scope.datos.RO_CALL_C='';  $scope.datos.RO_NRO_C=''; $scope.datos.RO_OFI_CON='';  $scope.datos.RO_CAT_C=''; $scope.datos.RO_TIP_C='';  $scope.datos.longitud='';
             $scope.datos.PLACA=''; $scope.datos.latitud==''; $scope.datos.latitud =''; 

              $scope.desabilitado = true;
              $scope.macrodistritos();
              $scope.listar_of();
              console.log($scope.ofici,'$scope.ofici123123123');
              for (var i = 0; i < $scope.ofici.length; i++) {
                $scope.ofi_veh=$scope.ofici[i].ofi_datos[0].RO_MAC_OF;
                console.log($scope.ofi_veh,'jknkj');
                var din= new asig_dinamico();
                din.consulta='select count(*) from  _mv_ope_vehiculos_datos where veh_oficina=$$'+$scope.ofici[i].ofi_datos[0].RO_MAC_OF+'$$ and veh_estado =$$A$$ and veh_ope_id=$$'+ $scope.datos.idOperador +'$$ ';
                        console.log(din.consulta,'din.consulta00000000000000');
                        din.dinamico(function(results){
                        results = JSON.parse(results);
                        $scope.cont_veh=results.success.data[0].sp_dinamico;
                        $scope.cont_veh=$scope.cont_veh[0].count;
                        console.log($scope.cont_veh,'$cont_veh');
                  });              
              };
              //cant veh por oficina >=20
              if($scope.cont_veh>=0)
              {
                $scope.listar_Cond_nuevo();
                    if($scope.ofici.length>1)
                  {
                    $scope.listar_Cond_nuevo();
                    $scope.quinto=true;
                    $scope.desabilitado = true; 
                    $scope.macrodistritos();
                  }
                  else
                  {
                     if($scope.ofici.length==1)
                     {
                      $scope.listar_Cond_nuevo();
                     var din= new asig_dinamico();
                     console.log($scope.conduc, '123456789');
                     din.consulta='select * from sp_ope_oficinas_VehCond($$'+$scope.datos.idOperador+'$$,$$'+$scope.ofiVeh+'$$,$$'+'U_COND'+'$$)';
                      console.log(din.consulta,'55555555555555555555555555555555555');
                      din.dinamico(function(results){
                      results = JSON.parse(results);
                      console.log(results,'results123');
                        console.log(results.success.data[0].sp_dinamico,'results');
                        }); 
                      $scope.listar_Cond($scope.ofiVeh);
                      $scope.quinto=true;                  
                      $scope.macrodistritos();
                     }                  
                }
             }
            else{
                console.log($scope.quinto,'$scope.quinto');
                console.log($scope.vehic.length,' $scope.datos.RO_G_VEHICULO.length 2');
            alertify.success('Debe ingresar como mínimo 20 registros de vehículos por cada oficina');
            }
          }
          if(nro==6)
            {
               if($scope.datos.RO_MAC_OF=='' || $scope.datos.RO_MAC_OF==undefined ||  $scope.datos.RO_ZONA_OF=='' || $scope.datos.RO_ZONA_OF==undefined || 
            $scope.datos.RO_NOM_VIA_OF=='' || $scope.datos.RO_NOM_VIA_OF==undefined ||  $scope.datos.RO_ENT_CALL_OF=='' || $scope.datos.RO_ENT_CALL_OF==undefined || 
            $scope.datos.RO_NRO_OF=='' || $scope.datos.RO_NRO_OF==undefined ||  $scope.datos.RO_CAN_VEH=='' || $scope.datos.RO_CAN_VEH==undefined || 
            $scope.datos.RO_DIR_GAR=='' || $scope.datos.RO_DIR_GAR==undefined ||  $scope.datos.RO_PAR_NRO=='' || $scope.datos.RO_PAR_NRO==undefined || 
            $scope.datos.RO_ESP_DIS=='' || $scope.datos.RO_ESP_DIS==undefined ||  $scope.datos.RO_VIA_PAR_MOM=='' || $scope.datos.RO_VIA_PAR_MOM==undefined || 
            $scope.datos.RO_ENT_CALL=='' || $scope.datos.RO_ENT_CALL==undefined)
                {
                alertify.success('Completar datos en Paso 3');
                 }

                else{
              $scope.listar_of();
              $scope.listar_viae();
              $scope.datos.rdTipoTramite1='NUEVO';
              $scope.licenciaToogle4 = true;
              $scope.sexto=true;
            }
          }
          if(nro==7)
            {              
              $scope.septimo=true;  }
          if(nro==8)
            { $scope.octavo=true;  }
          if(nro==10)
            { $scope.decimo=true;  }
    }

        $scope.divJuridico = false;


    $scope.grid_n = [];
    $scope.grid_a = [];
    $scope.mod = {};
    $scope.mod_adultos = {};
    $scope.gri_but_modal_g = true;
    $scope.gri_but_modal_e = false;
    $scope.tablaTramites = {};
     $scope.tablaVeh = {};
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
        aServicio.parametros ='{"frm_tra_dvser_id":14,"frm_tra_id_ciudadano":"' + sIdCiudadano + '","frm_tra_fecha":"' + sFechaTramite + '","frm_tra_enviado":"NO","frm_tra_id_usuario":"' + idusu + '"}';
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
        sparam.identificador = "RCCIUDADANO_MOV_RO";
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
    //$scope.vehic=[];
    $scope.tablaVeh = new ngTableParams({
        page: 1,
        count: 20,
        filter: {},
        sorting: { veh_id: 'desc' }
    },{
        total: $scope.vehic.length,
        getData: function($defer, params)
        {
            var filteredData = params.filter() ?
            $filter('filter')($scope.vehic, params.filter()) :
            $scope.vehic;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.vehic;
            params.total($scope.vehic.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });        

 $scope.seleccionarTramite = function(data_tramite){
  $scope.mostrarTipo = true;
  $scope.formDatosAE = false;
  console.log(data_tramite,'data_tramite 123');
        if (data_tramite.vcodigo == null) {
        $scope.tram = "";
      }else {
        $scope.tram = data_tramite.vcodigo;
      }
      alertify.success('Tramite seleccionado '+ $scope.tram);

  console.log(data_tramite,'123456789456123data_tramite 00000000000')
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
      //$scope.mostrar_form_ope = true;
      $scope.idServicio = data_tramite.vdvser_id;
      $scope.idTramite = data_tramite.vtra_id;
      //data_tramite.datos = JSON.stringify(data_tramite.datos);

      console.log("777777",$scope.idTramite);
      if (data_tramite.datos) {
       // alert('entra if si ');
        console.log("-----SSSS1----->",data_tramite.datos);
        console.log("-----SSSS----->",data_tramite.datos.length);
        if (data_tramite.datos.length != undefined) {
          if (data_tramite.datos.length > 100) {
            var remplazo = data_tramite.datos;
            data_tramite.datos = remplazo.replace(/\C:\\fakepath\\/g, "");
            console.log("entra",data_tramite.datos);
            data_tramite.datos = JSON.parse(data_tramite.datos);
          }
        }else {
          if (data_tramite.datos.length > 100) {
            var remplazo = data_tramite.datos;
            data_tramite.datos = remplazo.replace(/\C:\\fakepath\\/g, "");
            console.log("entra",data_tramite.datos);
            data_tramite.datos = JSON.parse(data_tramite.datos);
          }
        }

        console.log("-----SSSS----->",data_tramite.datos.length);
        console.log("7878",data_tramite.datos);
        if (data_tramite.datos != null) {
          clsIniciarGrillaAE();

          $scope.validarActividadEconomica();

           $scope.mostrarMsgNuevaActividad = false;            
            $scope.mostrarMsgActividadTrue = true;    
            $scope.mostrarMsgActividadFalse = false;    
            
            $scope.tipoCategoria = false;
            $scope.actividadDesarrollada = true;
            //$scope.mostrar_form_ope = true;
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
                $scope.datos.RO_CAS_RL = data_tramite.datos.RO_CAS_RL;
                $scope.datos.RO_CAT_C = data_tramite.datos.RO_CAT_C;
                $scope.datos.RO_CEL_C = data_tramite.datos.RO_CEL_C;
                $scope.datos.RO_CEL_POO = data_tramite.datos.RO_CEL_POO;
                $scope.datos.RO_CEL_RL = data_tramite.datos.RO_CEL_RL;
                $scope.datos.RO_CI_C = data_tramite.datos.RO_CI_C;
                $scope.datos.RO_CI_P = data_tramite.datos.RO_CI_P;
                $scope.datos.RO_CI_POO = data_tramite.datos.RO_CI_POO;
                $scope.datos.RO_CI_RL = data_tramite.datos.RO_CI_RL;
                $scope.datos.RO_CLA_V = data_tramite.datos.RO_CLA_V;
                $scope.datos.RO_COL_V = data_tramite.datos.RO_COL_V;
                $scope.datos.RO_CORR_C = data_tramite.datos.RO_CORR_C;
                $scope.datos.RO_CORR_POO = data_tramite.datos.RO_CORR_POO;
                $scope.datos.RO_CORR_RL = data_tramite.datos.RO_CORR_RL;
                $scope.datos.RO_DIR_GAR = data_tramite.datos.RO_DIR_GAR;
                $scope.datos.RO_DIS_OF = data_tramite.datos.RO_DIS_OF;
                $scope.datos.RO_ENT_CALL = data_tramite.datos.RO_ENT_CALL;
                $scope.datos.RO_ENT_CALL_OF = data_tramite.datos.RO_ENT_CALL_OF;
                $scope.datos.RO_EN_VIA = data_tramite.datos.RO_EN_VIA;
                $scope.datos.RO_ESP_DIS = data_tramite.datos.RO_ESP_DIS;
                $scope.datos.RO_EXP_C = data_tramite.datos.RO_EXP_C;
                $scope.datos.RO_EXP_P = data_tramite.datos.RO_EXP_P;
                $scope.datos.RO_EXP_POO = data_tramite.datos.RO_EXP_POO;
                $scope.datos.RO_EXP_RL = data_tramite.datos.RO_EXP_RL;
                $scope.datos.RO_FEC_POD_RL = data_tramite.datos.RO_FEC_POD_RL;
                $scope.datos.RO_FEC_RES_RL = data_tramite.datos.RO_FEC_RES_RL;
                $scope.datos.RO_FRE = data_tramite.datos.RO_FRE;
                $scope.datos.RO_FRE_RAD = data_tramite.datos.RO_FRE_RAD;
                $scope.datos.RO_G_CONDUCTORES = data_tramite.datos.RO_G_CONDUCTORES;
                $scope.datos.RO_G_OFICINAS = data_tramite.datos.RO_G_OFICINAS;
                $scope.datos.RO_G_VEHICULO = data_tramite.datos.RO_G_VEHICULO;
                $scope.datos.RO_G_VIAE = data_tramite.datos.RO_G_VIAE;
                $scope.datos.RO_MAC_C = data_tramite.datos.RO_MAC_C;
                $scope.datos.RO_MAC_OF = data_tramite.datos.RO_MAC_OF;
                $scope.datos.RO_MAC_P = data_tramite.datos.RO_MAC_P;
                $scope.datos.RO_MAC_POO = data_tramite.datos.RO_MAC_POO;
                $scope.datos.RO_MAC_RL = data_tramite.datos.RO_MAC_RL;
                $scope.datos.RO_MAR_V = data_tramite.datos.RO_MAR_V;
                $scope.datos.RO_MAT_C = data_tramite.datos.RO_MAT_C;
                $scope.datos.RO_MAT_P = data_tramite.datos.RO_MAT_P;
                $scope.datos.RO_MAT_POO = data_tramite.datos.RO_MAT_POO;
                $scope.datos.RO_MAT_RL = data_tramite.datos.RO_MAT_RL;
                $scope.datos.RO_MOD= data_tramite.datos.RO_MOD;
                $scope.datos.RO_MOD_V = data_tramite.datos.RO_MOD_V;
                $scope.datos.RO_NIT = data_tramite.datos.RO_NIT;
                $scope.datos.RO_NOM_C = data_tramite.datos.RO_NOM_C;
                $scope.datos.RO_NOM_OP = data_tramite.datos.RO_NOM_OP;
                $scope.datos.RO_NOM_P = data_tramite.datos.RO_NOM_P;
                $scope.datos.RO_NOM_POO = data_tramite.datos.RO_NOM_POO;
                $scope.datos.RO_NOM_RL = data_tramite.datos.RO_NOM_RL;
                $scope.datos.RO_NOM_VIA_OF = data_tramite.datos.RO_NOM_VIA_OF;
                $scope.datos.RO_NRO_C = data_tramite.datos.RO_NRO_C;
                $scope.datos.RO_NRO_OF = data_tramite.datos.RO_NRO_OF;
                $scope.datos.RO_NRO_P = data_tramite.datos.RO_NRO_P;
                $scope.datos.RO_NRO_POO = data_tramite.datos.RO_NRO_POO;
                $scope.datos.RO_PUE_V = data_tramite.datos.RO_PUE_V;
                $scope.datos.RO_NRO_RL = data_tramite.datos.RO_NRO_RL;
                $scope.datos.RO_OFI_CON = data_tramite.datos.RO_OFI_CON;
                $scope.datos.RO_OFI_VIAE = data_tramite.datos.RO_OFI_VIAE;
                $scope.datos.RO_OPERADOR = data_tramite.datos.RO_OPERADOR;
                $scope.datos.RO_PAR_NRO = data_tramite.datos.RO_PAR_NRO;
                $scope.datos.RO_PAT_C = data_tramite.datos.RO_PAT_C;
                $scope.datos.RO_PAT_P = data_tramite.datos.RO_PAT_P;
                $scope.datos.RO_PAT_POO = data_tramite.datos.RO_PAT_POO;
                $scope.datos.RO_PAT_RL = data_tramite.datos.RO_PAT_RL;
                $scope.datos.RO_PLA = data_tramite.datos.RO_PLA;
                $scope.datos.RO_PLA_TEC = data_tramite.datos.RO_PLA_TEC;
                $scope.datos.RO_PLA_V = data_tramite.datos.RO_PLA_V;
                $scope.datos.RO_PMC = data_tramite.datos.RO_PMC;
                $scope.datos.RO_POD_RL = data_tramite.datos.RO_POD_RL;
                $scope.datos.RO_RAD_V = data_tramite.datos.RO_RAD_V;
                $scope.datos.RO_REPRESENTANTE = data_tramite.datos.RO_REPRESENTANTE;
                $scope.datos.RO_RES_RL = data_tramite.datos.RO_RES_RL;
                $scope.datos.RO_RZ = data_tramite.datos.RO_RZ;
                $scope.datos.RO_SER_SPU = data_tramite.datos.RO_SER_SPU;
                $scope.datos.RO_TEL_C = data_tramite.datos.RO_TEL_C;
                $scope.datos.RO_TEL_OF = data_tramite.datos.RO_TEL_OF;
                $scope.datos.RO_TEL_POO = data_tramite.datos.RO_TEL_POO;
                $scope.datos.RO_TEL_RL = data_tramite.datos.RO_TEL_RL;
               // $scope.datos.RO_TIP_ACT = data_tramite.datos.RO_TIP_ACT;
                $scope.datos.RO_TIP_C = data_tramite.datos.RO_TIP_C;
                $scope.datos.RO_TIP_PER = data_tramite.datos.RO_TIP_PER;
                $scope.datos.RO_TIP_OPE = data_tramite.datos.RO_TIP_OPE;
                $scope.datos.RO_TIP_SER = data_tramite.datos.RO_TIP_SER;
                $scope.datos.RO_TIP_SOL = data_tramite.datos.RO_TIP_SOL;
                $scope.datos.RO_TIP_V = data_tramite.datos.RO_TIP_V;
                $scope.datos.RO_VIA_PAR_MOM = data_tramite.datos.RO_VIA_PAR_MOM;
                $scope.datos.RO_ZONA_C = data_tramite.datos.RO_ZONA_C;
                $scope.datos.RO_ZONA_OF = data_tramite.datos.RO_ZONA_OF;
                $scope.datos.RO_ZONA_P = data_tramite.datos.RO_ZONA_P;
                $scope.datos.RO_ZONA_POO = data_tramite.datos.RO_ZONA_POO;
                $scope.datos.RO_ZONA_RL = data_tramite.datos.RO_ZONA_RL;
                $scope.datos.RO_ZON_OF = data_tramite.datos.RO_ZON_OF;
                $scope.datos.Tipo_tramite_creado = data_tramite.datos.Tipo_tramite_creado;
                $scope.datos.adosado = data_tramite.datos.adosado;
                $scope.datos.alto = data_tramite.datos.alto;
                $scope.datos.ancho = data_tramite.datos.ancho;
                $scope.datos.animada = data_tramite.datos.animada;
                $scope.datos.caras = data_tramite.datos.caras;
                $scope.datos.electrica = data_tramite.datos.electrica;
                $scope.datos.electronico = data_tramite.datos.electronico;
                $scope.datos.f01_ges_vig_pod = data_tramite.datos.f01_ges_vig_pod;
                $scope.datos.f01_macro_act = data_tramite.datos.f01_macro_act;
                $scope.datos.f01_num_notaria = data_tramite.datos.f01_num_notaria;
                $scope.datos.f01_zon_rep_valor = data_tramite.datos.f01_zon_rep_valor;
                $scope.datos.idOperador = data_tramite.datos.idOperador;
                $scope.datos.iluminada = data_tramite.datos.iluminada;
                $scope.datos.luminoso = data_tramite.datos.luminoso;
                $scope.datos.mecanica = data_tramite.datos.mecanica;
                $scope.datos.microperforado = data_tramite.datos.microperforado;
                $scope.datos.pintado = data_tramite.datos.pintado;
                $scope.datos.proyectado = data_tramite.datos.proyectado;
                $scope.datos.simple = data_tramite.datos.simple;
                $scope.datos.sobresaliente = data_tramite.datos.sobresaliente;
                $scope.datos.sonora = data_tramite.datos.sonora;
                $scope.datos.sucursal = data_tramite.datos.sucursal;
                $scope.datos.RO_CORR_EM = data_tramite.datos.RO_CORR_EM;  
                $scope.datos.sup = data_tramite.datos.sup;
                $scope.datos.RO_ARCH1 =data_tramite.datos.RO_ARCH1; 
                $scope.datos.RO_ARCH2 =data_tramite.datos.RO_ARCH2;
                $scope.datos.RO_ARCH3 =data_tramite.datos.RO_ARCH3; 
                $scope.datos.RO_ARCH4 =data_tramite.datos.RO_ARCH4;            
                $scope.datos.RO_ARCH5 =data_tramite.datos.RO_ARCH5; 
                $scope.datos.RO_ARCH6 =data_tramite.datos.RO_ARCH6; 
                $scope.datos.RO_ARCH7 =data_tramite.datos.RO_ARCH7; 
                $scope.datos.RO_ARCH8 =data_tramite.datos.RO_ARCH8; 
                $scope.datos.RO_ARCH9 =data_tramite.datos.RO_ARCH9; 
                $scope.datos.RO_ARCH10 =data_tramite.datos.RO_ARCH10; 
                $scope.datos.RO_ARCH11 =data_tramite.datos.RO_ARCH11; 
                $scope.datos.RO_ARCH12 =data_tramite.datos.RO_ARCH12; 
                $scope.datos.RO_ARCH13 =data_tramite.datos.RO_ARCH13; 
                $scope.datos.RO_ARCH14 =data_tramite.datos.RO_ARCH14; 
                $scope.datos.RO_ARCH15 =data_tramite.datos.RO_ARCH15; 
                $scope.datos.RO_ARCH16 =data_tramite.datos.RO_ARCH16; 
                $scope.datos.RO_ARCH17 =data_tramite.datos.RO_ARCH17; 
                $scope.datos.RO_ARCH18 =data_tramite.datos.RO_ARCH18; 
                $scope.datos.RO_ARCH19 =data_tramite.datos.RO_ARCH19; 
                $scope.datos.RO_ARCH20 =data_tramite.datos.RO_ARCH20; 
                $scope.datos.RO_ARCH21 =data_tramite.datos.RO_ARCH21; 
                $scope.datos.RO_ARCH22 =data_tramite.datos.RO_ARCH22; 
                $scope.datos.RO_ARCH23 =data_tramite.datos.RO_ARCH23; 
                $scope.datos.RO_ARCH24 =data_tramite.datos.RO_ARCH24; 
                $scope.datos.RO_ARCH25 =data_tramite.datos.RO_ARCH25; 
                $scope.datos.RO_ARCH26 =data_tramite.datos.RO_ARCH26;
                $scope.datos.RO_ARCH27 =data_tramite.datos.RO_ARCH27; 
                $scope.datos.RO_SUP = data_tramite.datos.RO_SUP;   
                $scope.datos.rdTipoTramite1 = data_tramite.datos.rdTipoTramite1;
        }
}
        else
        {
            $scope.mostrarMsgNuevaActividad = false;            
            $scope.mostrarMsgActividadTrue = true;    
            $scope.mostrarMsgActividadFalse = false;    
            if($scope.datos.RO_TIP_SOL!=1)
           {   
           // $scope.formDatosAE = true;
           }
            
            $scope.tipoCategoria = false;
            
                $scope.datos.RO_SUP = "";
                $scope.datos.INT_AC_DISTRITO = "";
                $scope.datos.INT_AC_ID_ZONA = "";
                $scope.datos.INT_AC_MACRO_ID = "";
                $scope.datos.INT_ID_ZONA = "";
                $scope.datos.PLACA = "";
                $scope.datos.RO_CALL_C = "";
                $scope.datos.RO_CALL_P = "";
                $scope.datos.RO_CALL_POO = "";
               // $scope.datos.RO_CALL_RL = "";
                $scope.datos.RO_CAN_VEH = "";
              //  $scope.datos.RO_CAS_RL = "";
                $scope.datos.RO_CAT_C = "";
                $scope.datos.RO_CEL_C = "";
                $scope.datos.RO_CEL_POO = "";
               // $scope.datos.RO_CEL_RL = "";
                $scope.datos.RO_CI_C = "";
                $scope.datos.RO_CI_P = "";
                $scope.datos.RO_CI_POO = "";
               // $scope.datos.RO_CI_RL = "";
                $scope.datos.RO_CLA_V = "";
                $scope.datos.RO_COL_V = "";
                $scope.datos.RO_CORR_C = "";
                $scope.datos.RO_CORR_POO = "";
               // $scope.datos.RO_CORR_RL = "";
                $scope.datos.RO_DIR_GAR = "";
                $scope.datos.RO_DIS_OF = "";
                $scope.datos.RO_ENT_CALL = "";
                $scope.datos.RO_ENT_CALL_OF = "";
                $scope.datos.RO_EN_VIA = "";
                $scope.datos.RO_ESP_DIS = "";
                $scope.datos.RO_EXP_C = "";
                $scope.datos.RO_EXP_P = "";
                $scope.datos.RO_EXP_POO = "";
                $scope.datos.RO_EXP_RL = "";
                $scope.datos.RO_FEC_POD_RL = "";
                $scope.datos.RO_FEC_RES_RL = "";
                $scope.datos.RO_FRE = "";
                $scope.datos.RO_FRE_RAD = "";
                $scope.datos.RO_G_CONDUCTORES = "";
                $scope.datos.RO_G_OFICINAS = "";
                $scope.datos.RO_G_VEHICULO = "";
                $scope.datos.RO_G_VIAE = "";
                $scope.datos.RO_MAC_C = "";
                $scope.datos.RO_MAC_OF = "";
                $scope.datos.RO_MAC_P = "";
                $scope.datos.RO_MAC_POO = "";
                $scope.datos.RO_MAC_RL = "";
                $scope.datos.RO_MAR_V = "";
                $scope.datos.RO_MAT_C = "";
                $scope.datos.RO_MAT_P = "";
                $scope.datos.RO_MAT_POO = "";
              //  $scope.datos.RO_MAT_RL = "";
                $scope.datos.RO_MOD="";
                $scope.datos.RO_MOD_V = "";
                //$scope.datos.RO_NIT = "";
                $scope.datos.RO_NOM_C = "";
                $scope.datos.RO_NOM_OP = "";
                $scope.datos.RO_NOM_P = "";
                $scope.datos.RO_NOM_POO = "";
               // $scope.datos.RO_NOM_RL = "";
                $scope.datos.RO_NOM_VIA_OF = "";
                $scope.datos.RO_NRO_C = "";
                $scope.datos.RO_NRO_OF = "";
                $scope.datos.RO_NRO_P = "";
                $scope.datos.RO_NRO_POO = "";
                $scope.datos.RO_PUE_V = "";
               // $scope.datos.RO_NRO_RL = "";
                $scope.datos.RO_OFI_CON = "";
                $scope.datos.RO_OFI_VIAE = "";
                $scope.datos.RO_OPERADOR = "";
                $scope.datos.RO_PAR_NRO = "";
                $scope.datos.RO_PAT_C = "";
                $scope.datos.RO_PAT_P = "";
                $scope.datos.RO_PAT_POO = "";
               // $scope.datos.RO_PAT_RL = "";
                $scope.datos.RO_PLA = "";
                $scope.datos.RO_PLA_TEC = "";
                $scope.datos.RO_PLA_V = "";
                $scope.datos.RO_PMC = "";
               // $scope.datos.RO_POD_RL = "";
                $scope.datos.RO_RAD_V = "";
                $scope.datos.RO_REPRESENTANTE = "";
                $scope.datos.RO_RES_RL = "";
                //$scope.datos.RO_RZ = "";
                $scope.datos.RO_SER_SPU = "";
                $scope.datos.RO_TEL_C = "";
                $scope.datos.RO_TEL_OF = "";
                $scope.datos.RO_TEL_POO = "";
               // $scope.datos.RO_TEL_RL = "";
               // $scope.datos.RO_TIP_ACT = "";
                $scope.datos.RO_TIP_C = "";
                $scope.datos.RO_TIP_PER = "";
                $scope.datos.RO_TIP_OPE = "";
                $scope.datos.RO_TIP_SER = "";
                $scope.datos.RO_TIP_SOL = "";
                $scope.datos.RO_TIP_V = "";
                $scope.datos.RO_VIA_PAR_MOM = "";
                $scope.datos.RO_ZONA_C = "";
                $scope.datos.RO_ZONA_OF = "";
                $scope.datos.RO_ZONA_P = "";
                $scope.datos.RO_ZONA_POO = "";
                //$scope.datos.RO_ZONA_RL = "";
                $scope.datos.RO_ZON_OF = "";
                $scope.datos.Tipo_tramite_creado = "";
                $scope.datos.adosado = "";
                $scope.datos.alto = "";
                $scope.datos.ancho = "";
                $scope.datos.animada = "";
                $scope.datos.caras = "";
                $scope.datos.electrica = "";
                $scope.datos.electronico = "";
                $scope.datos.f01_ges_vig_pod = "";
                $scope.datos.f01_macro_act = "";
                $scope.datos.f01_num_notaria = "";
                $scope.datos.f01_zon_rep_valor = "";
                $scope.datos.idOperador = "";
                $scope.datos.iluminada = "";
                $scope.datos.luminoso = "";
                $scope.datos.mecanica = "";
                $scope.datos.microperforado = "";
                $scope.datos.pintado = "";
                $scope.datos.proyectado = "";
                $scope.datos.simple = "";
                $scope.datos.sobresaliente = "";
                $scope.datos.sonora = "";
                $scope.datos.sucursal = "";
                $scope.datos.sup = "";
                $scope.datos.RO_ARCH1 =""; 
                $scope.datos.RO_ARCH2 ="";
                $scope.datos.RO_ARCH3 =""; 
                $scope.datos.RO_ARCH4 ="";            
                $scope.datos.RO_ARCH5 =""; 
                $scope.datos.RO_ARCH6 =""; 
                $scope.datos.RO_ARCH7 =""; 
                $scope.datos.RO_ARCH8 =""; 
                $scope.datos.RO_ARCH9 =""; 
                $scope.datos.RO_ARCH10 =""; 
                $scope.datos.RO_ARCH11 =""; 
                $scope.datos.RO_ARCH12 =""; 
                $scope.datos.RO_ARCH13 =""; 
                $scope.datos.RO_ARCH14 =""; 
                $scope.datos.RO_ARCH15 =""; 
                $scope.datos.RO_ARCH16 =""; 
                $scope.datos.RO_ARCH17 =""; 
                $scope.datos.RO_ARCH18 =""; 
                $scope.datos.RO_ARCH19 =""; 
                $scope.datos.RO_ARCH20 =""; 
                $scope.datos.RO_ARCH21 =""; 
                $scope.datos.RO_ARCH22 =""; 
                $scope.datos.RO_ARCH23 =""; 
                $scope.datos.RO_ARCH24 =""; 
                $scope.datos.RO_ARCH25 =""; 
                $scope.datos.RO_ARCH26 ="";
                $scope.datos.RO_ARCH27 ="";  
                $scope.datos.RO_CORR_EM ="";  

                $scope.validarActividadEconomica();

        }
        
     }

         $scope.datosJ = function () {
            $scope.cargarDatosJuridico();
            $scope.data2 = "bolas";

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
                 buscarRepresentante.tipo_persona = "NATURAL"
                 console.log("tipo de persona: ",sessionService.get('TIPO_PERSONA'));
                 $scope.ci_sesion=sessionService.get('CICIUDADANO');
                 buscarRepresentante.ci = $scope.ci_sesion;
                 buscarRepresentante.buscarPersona(function(res){
                  var x = JSON.parse(res);
                  console.log("---XXXXXXXXXX--",x);
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
                        $scope.datos.RO_CI_RL = x[0].dtspsl_ci;    
                        $scope.datos.RO_MAC_RL = x[0].dtspsl_macrodistrito_desc;
                        $scope.datos.RO_ZONA_RL = x[0].dtspsl_zona_desc;
                        $scope.datos.RO_TIP_VIA_RL = x[0].dtspsl_tipo_via; 
                        $scope.datos.RO_CALL_RL = x[0].dtspsl_nombre_via;
                        $scope.datos.RO_NRO_RL = x[0].dtspsl_numero_casa;
                        console.log($scope.datos.RO_EXP_RL,'$scope.datos.RO_EXP_RL 1111');
                        if (x[0].dtspsl_file_fotocopia_ci=="") {
                        }else {
                          $scope.datos.RO_ARCH1 = CONFIG.APIURL + "/files/RC_CLI/"+x[0]._id+"/"+x[0].dtspsl_file_fotocopia_ci+"?app_name=todoangular";
                        }
                        if (x[0].dtspsl_file_fotocopia_ci_r=="") {
                        }else {
                          $scope.datos.RO_ARCH2 = CONFIG.APIURL + "/files/RC_CLI/"+x[0]._id+"/"+x[0].dtspsl_file_fotocopia_ci_r+"?app_name=todoangular";
                        }
                       setTimeout(function(){
                         document.getElementById("RO_ZONA_RL").value = x[0].dtspsl_zona;
                         $scope.datos.RO_ZONA_RL = x[0].dtspsl_zona;
                       }, 1000);
                      }
                    }
                  
              });
            }catch(e){
            }
           };
            $scope.registro = {};
            $scope.datosNaturalPropietario= function () {
              try{
                var buscarRepresentante = new rcNatural();
                 buscarRepresentante.tipo_persona = "NATURAL";
                 buscarRepresentante.ci = $scope.datos.RO_CI_P;
                 buscarRepresentante.buscarPersona(function(res){
                  var x = JSON.parse(res);
                  console.log("-----",x);
                  if (x.error) {
                    $.unblockUI();
                    alertify.success(x.error.message);
                  }else {
                    if (x.length > 0) {
                      alertify.success('Datos Encontrados');
                        $scope.busquedaCiudadano = x[0];
                        $scope.datos.RO_NRO_P = x[0].dtspsl_numero_casa;
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
                        $scope.macrodistritos();
                        $scope.distritoZonas(x[0].dtspsl_macrodistrito_desc);
                      /* setTimeout(function(){
                         document.getElementById("RO_CALL_P").value = x[0].dtspsl_zona;
                         $scope.datos.RO_ZONA_P = x[0].dtspsl_zona;
                       }, 1000);*/
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
                    $.unblockUI();
                    alertify.success(x.error.message);
                  }else {
                    if (x.length > 0) {
                     $scope.busquedaCiudadano = x[0];                   
                      alertify.success('Datos Encontrados');
                        $scope.datos.RO_NRO_POO = x[0].dtspsl_numero_casa;
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
                        $scope.macrodistritos();
                        $scope.distritoZonas(x[0].dtspsl_macrodistrito_desc);
                        console.log($scope.datos.RO_NRO_POO,'$scope.datos.RO_NRO_POO 0000');
                       setTimeout(function(){
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
                  console.log("-----",x);
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
                        $scope.datos.RO_NIT = results[0].dtspsl_nit;
                        $scope.datos.RO_RZ = results[0].dtspsl_razon_social;
                        $scope.datos.f01_ges_vig_pod = results[0].dtspsl_poder_replegal;
                        $scope.datos.f01_num_notaria = results[0].dtspsl_nro_notaria;
                        $scope.datos.f01_zon_rep_valor = results[0].dtspsl_zona_desc;
                        $scope.datos.RO_NRO_OF = results[0].dtspsl_numero_casa;
                        $scope.datos.RO_CI_RL = results[0].dtspsl_ci_representante;
                        $scope.datos.RO_MAC_OF = results[0].dtspsl_macrodistrito_desc;
                        $scope.macrodistritos();
                        $scope.distritoZonas($scope.datos.RO_MAC_OF);                        
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

    $scope.datosRepresentanteLegal = function (idContribuyente) {
        try{
            var paramRepLegal = new datosRepresentanteLgEmpresa();
            paramRepLegal.idEmpresa = idContribuyente;
            paramRepLegal.datos_RepresentanteLgEmpresa(function(resp){
                x = JSON.parse(resp);
                var responseLegal = x.success.dataSql;
                $.unblockUI();
                if(responseLegal.length > 0){
                    var datos = {};
                    console.log("DATOS OBTENIDOS",responseLegal);
                    $scope.datos.f01_tipo_per = "J";
                    $scope.datos.f01_id_representante_legal = responseLegal[0].idRepresentanteLegal;//idRepresentanteLegal
                    $scope.datos.f01_expedido_rep = responseLegal[0].expedicion;//expedicion
                }
                else
                {
                    sweet.show('', "No existen ninguno ciudadano", 'error');
                }
            }).error(function(responseLegal){
                sweet.show('', "Datos no Encontrados !!!", 'warning');
                $.unblockUI();
            });
        }catch (error){
            console.log("error");
        }
    };
    $scope.tramite02 = {};
    $scope.datosActividad = function( ){
     // $scope.listarAE();();      
      console.log("RESULT API: ", resultadoApi);
      $scope.datosAE= resultadoApi.success.dataSql[0];
      $scope.datosAEdesc = $scope.datosAE.Descripcion;
      if($scope.datosAEdesc = 'SERVICIO DE RADIOTAXIS')
      {
        $scope.datosId = $scope.datosAE.IdActividad;
          var datosGenerales = new getDatosAEViae();
          datosGenerales.idActividadEconomica=$scope.datosId;
          datosGenerales.getDatosAE_Viae(function(resultado){
          resultadoApi = JSON.parse(resultado);
          console.log(resultadoApi,'resultadoApi -------------->');
              if (resultadoApi.success.dataSql) 
              {
                var response = resultadoApi.success.dataSql.datosAE;
                console.log(response, '..........123456555');                       
                 if(response.length > 0){
                  console.log('entra');
                  $scope.datos.RO_NIT = response[0].NIT_CONTRIBUYENTE;
                  $scope.datos.RO_DEN=response[0].denominacion;
                  $scope.datos.RO_MOD='1';
                }
              }        
           });   
      }
    }
   $scope.selActividadEconomica =  function(tramite){ 
    $scope.mostrar_form_ope = true;
        console.log("TRAMITE:", tramite);
        console.log("deuda: ", tramite.deudaActividad);
        console.log("fech tramite:: ", tramite.FechaInicio);
        var fechatram = "";
        var aniotram = "";
        fechatram = tramite.FechaInicio.split("-");
        aniotram = fechatram[0];
        console.log("año de tramite: ", aniotram, "año server: ", $scope.anioserver);
        console.log(tramite.IdActividad,'111111111111111111111111111111');
                          
        if(aniotram != $scope.anioserver){
          console.log(aniotram,'aniotram');
            console.log("tramite no vigente");
            if(tramite.deudaActividad && tramite.deudaActividad == 'ACTIVIDAD SIN DEUDA'){
                if(tramite.IdActividad){
                    $scope.idActividiadEconomicaActual  =   tramite.IdActividad;
                    $scope.datos.f01_id_actividad_economica = tramite.IdActividad;
                    console.log("idActividiadEconomicaActualonomicaActual3: ", $scope.datos.f01_id_actividad_economica);
                }
                
                $scope.sIdAeGrilla  =   tramite.IdActividad;
                var tipoPersona     =   sessionService.get('TIPO_PERSONA');
                console.log("TIPO DE PERSONA:", tipoPersona);
                tipoPersona = "J";

                var datosGenerales = new getDatosAEViae();
                datosGenerales.idActividadEconomica=tramite.IdActividad;
                datosGenerales.getDatosAE_Viae(function(resultado){
                resultadoApi = JSON.parse(resultado);
                console.log(resultadoApi,'resultadoApi -------------->');
                    if (resultadoApi.success.dataSql) 
                    {   
                        var response = resultadoApi.success.dataSql.datosAE;
                        $scope.data4 =  response;
                        console.log(response, '..........123456555');

                       
                        if(response.length > 0){

                            if(response[0].nroOrdenAE == 0 || response[0].nroOrdenAE == null || response[0].nroOrdenAE == 'null'){
                                response[0].nroOrdenAE = 0;
                                $scope.nroOrdenActividiadEconomicaActual  =  response[0].nroOrdenAE;
                                $scope.datos.f01_nro_orden = response[0].nroOrdenAE;
                            }
                            else{
                                $scope.nroOrdenActividiadEconomicaActual  =    response[0].nroOrdenAE;
                                $scope.datos.f01_nro_orden = response[0].nroOrdenAE;
                            }
                            $scope.idContribuyenteAEActual  =    response[0].idContribuyente;
                            $scope.datos.f01_id_contribuyente = response[0].idContribuyente;
                            console.log("response::: ", response[0]);
                            console.log($scope.nroOrdenActividiadEconomicaActual," ",$scope.datos.f01_nro_orden, " ", $scope.idContribuyenteAEActual, " ",  $scope.datos.f01_id_contribuyente, " tramite: ", $scope.idActividiadEconomicaActual," ", $scope.datos.f01_id_actividad_economica);
                            $scope.datosRepresentanteLegal(response[0].idContribuyente);
                            
                            if(tipoPersona != "N")
                            {                        
                                console.log("EL SOLICITANTE ES:", tipoPersona);
                                tipoPersona = "J";
                                var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                                var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                                var smacro      =   "MACRODISTRITO";
                                var szona       =   "DISTRITO";

                                //DATOS DE LA ACTIVIDAD ECONÃ“MICA
                                $scope.datos.f01_denominacion   =   response[0].denominacion;
                                //OBLIGATORIOS
                                $scope.datos.f01_sup  =   response[0].superficie;
                                $scope.datos.INT_AC_CAPACIDAD   =   response[0].capacidad;

                                try{
                                    smacro      =   smacro  +   " " +    response[0].IdMacroDistrito + " " + response[0].MacroDistrito;
                                    szona       =   szona  +   " " +    response[0].idDistrito + " - " + response[0].zona_ae;
                                    hinicio     =   hinicio.split('-')[0].trim();
                                    hfinal      =   hfinal.split('-')[1].trim();
                                }catch(e){}

                                
                                /*DATOS DE LA ACTIVIDAD*/
                                $scope.datos.RO_PMC = response[0].padron;
                                $scope.datos.RO_DEN=response[0].denominacion;
                                $scope.datos.RO_SUP=response[0].superficie;
                                $scope.datos.RO_COD_ZON = response[0].AE_idCodigoZona;
                                $scope.datos.RO_NIT = response[0].NIT_CONTRIBUYENTE;
                            
                                /*TIPO LICENCIA*/
                                //$scope.datos.f01_tipo_lic = response[0].idTipoLicencia;//response[0].TipoLicencia;
                                $scope.datos.RO_ID_ACTDES = response[0].idActividadDesarrollada;
                                $scope.datos.f01_categoria_descrip = response[0].desc_desarrollada;
                                $scope.f01_tip_act  = response[0].tipoActividad;
                                /*Ubicación de Actividad Económica*/     
                                
                                $scope.datos.RO_ID_MAC_OF = response[0].IdMacroDistrito;
                                console.log($scope.datos.RO_ID_MAC_OF,'$scope.datos.RO_ID_MAC_OF *************************************');
                                $scope.datos.RO_MAC_OF = 'MACRODISTRITO '+response[0].IdMacrodistrito +' '+response[0].Macrodistrito;                                
                                console.log($scope.datos.RO_MAC_OF,'$scope.datos.RO_MAC_OF  999');
                               // alert(999);
                                $scope.datos.RO_ID_ZONA_OF = response[0].idzona_ae;
                                $scope.datos.RO_ZONA_OF = response[0].zona;
                                console.log($scope.datos.RO_ZONA_OF,'$scope.datos.RO_ZONA_OF');
                                $scope.datos.f01_zona_act_descrip = response[0].idzona_ae;
                               // $scope.datos.RO_ZONA_OF = $scope.datos.zona_ae;
                                $scope.datos.RO_TIP_VIA = response[0].Tipo_Via;
                                $scope.datos.RO_NOM_VIA_OF = response[0].via;
                                $scope.datos.RO_NRO_OF = response[0].numero;
                                $scope.datos.RO_TEL_OF = response[0].telefono;
                                //DATOS REPR O SOLICITANTE
                                $scope.datos.RO_NOM_RL = response[0].primerNombre + response[0].segundoNombre;
                                $scope.datos.RO_PAT_RL = response[0].primerApellido;
                                $scope.datos.RO_MAT_RL = response[0].segundoApellido;
                                $scope.datos.RO_ZONA_RL = response[0].contribuyente_zona;
                                $scope.datos.RO_TEL_RL = response[0].contribuyente_telefono;
                                $scope.datos.RO_CORR_RL = response[0].contribuyente_telefono;
                                $scope.datos.RO_CEL_RL = response[0].contribuyente_celular; 
                                $scope.datos.RO_TIP_VIA_RL = response[0].tipoVia;    

                                //$scope.datos.RO_MAC_RL = response[0].numero_ae;
                                $scope.datos.RO_NRO_RL = response[0].contribuyente_numero;
                                $scope.datos.RO_CALL_RL = response[0].contribuyente_via;
                                $scope.datos.RO_NRO_SUC = response[0].sucursal;
                                $scope.datos.RO_CI_RL = response[0].identificacion;
                                $scope.datos.RO_EXP_RL = response[0].expedicion;
                                $scope.macrodistritos();
                                $scope.actulizarIdDistrito();
                                $scope.distritoZonas($scope.datos.RO_MAC_OF);
                                

                                console.log($scope.datos.RO_NOM_VIA_OF,'$scope.datos.RO_NOM_VIA_OF vias');

                                if(response[0].edificio_ae == 'undefined' || response[0].bloque_ae == 'undefined' || response[0].piso_ae == 'undefined' || response[0].departamento_ae == 'undefined' || response[0].telefono_ae == 'undefined' || response[0].AE_casilla == 'undefined'){
                                   response[0].edificio_ae = ''; 
                                   response[0].bloque_ae = ''; 
                                   response[0].piso_ae = '';
                                   response[0].departamento_ae = '';
                                   response[0].telefono_ae = '';
                                   response[0].AE_casilla = '';
                                }                               
                            }                            
                            //INT_TRAMITE_RENOVA
                            console.log("AL SELECCIONAR EL TRAMITE:", tramite.IdActividad);
                            $rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
                            $scope.datos.INT_TRAMITE_RENOVA     =   tramite.IdActividad;
                            /*HABILITANDO CAMPOS*/                    
                            $scope.botones = "mostrar";
                            $scope.desabilitado = false;                    //console.log("zona:", response[0].zona_ae);
                            setTimeout(function(){
                                $scope.macrodistritos();
                                $scope.actulizarIdDistrito();
                                $scope.distritoZonas(smacro);
                                console.log("/-----/",response);
                                 $scope.verif_operador();
                                 console.log($scope.datos.idOperador,'verif_operador000000001220021212');
                                //$scope.vias($scope.datos.INT_AC_ZONA,$scope.datos.INT_AC_TIP_VIA);
                            },2000);
                        }
                    } else {
                        sweet.show('', "Datos no Encontrados !!!", 'warning');
                    }
                });
            }else {
                    sweet.show('', "Actividad con deuda !!!", 'warning');
            }
        }else{
             sweet.show('', "Actividad Economica Vigente !!!", 'warning');
        }    
    };


        $scope.recuperandoDatosGenesis = function(){
        var tipoContribuyente   =   sessionService.get('TIPO_PERSONA');
        var ciDocumento          =   '';//sessionService.get('CICIUDADANO'));
        var nitDocumento          =   '';//sessionService.get('CICIUDADANO'));
        var sAccion          =   '';//sessionService.get('CICIUDADANO'));

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
        try{
            conGenesis.lstDatosContribuyente(function(resultado){
                resultadoApi = JSON.parse(resultado);
                console.log(resultadoApi,'resultadoApi 000000000000');
                if (resultadoApi.success) {
                    var response    =   resultadoApi;
                    console.log(response,'response gendatos');
                    $scope.txtMsgConexionGen    =   "";
                    if(response.success.dataSql.length > 0){
                        $scope.dataGenesisCidadano  =   response.success.dataSql;
                        console.log($scope.dataGenesisCidadano,'$scope.dataGenesisCidadano');
                    } else {
                        $scope.dataGenesisCidadano  =   {};
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

    $scope.validarActividadEconomica  =   function(){
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;
        $scope.mostrarMsgNuevaActividad = false;
        $scope.listarAE();
    };

    $scope.listarAE = function () {  
            $scope.servicio=true; 
            $scope.datos.RO_TIP_SER='SPU';
            $scope.datos.RO_SER_SPU='IEX';
            $scope.datos.RO_SER_SPR='SPU';

           if($scope.datos.RO_TIP_SOL=="1"){            
            $scope.datosActividad();
            $scope.formDatosAE  =   true;
            $scope.mostrar_form_ope=true;
            }
            else{
              $scope.formDatosAE  =  true;
              $scope.mostrar_form_ope=false;
             // $scope.servicio=true;
              $scope.datos.RO_TIP_SER='SPU';
            }
        //console.log("DATOS DE LA ACTIVIDAD ECONOMICA. :", $scope.datos);
        $scope.sIdAeGrilla    = $scope.datos.INT_TRAMITE_RENOVA;        
        var dataGenesis       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        var sNumeroRegistros  = dataGenesis.length;
        console.log("data genesis :", dataGenesis);
        if(sNumeroRegistros > 0 ){
            var tipoPersona     =   sessionService.get('TIPO_PERSONA');
            var idContribuyente =   $scope.dataGenesisCidadano[0].idContribuyente;
            if(tipoPersona == "NATURAL")
            {
                tipoPersona = "N";
                $scope.datos.tipoPersona=tipoPersona;
            }
            else
            {
                tipoPersona = "J";
                $scope.datos.tipoPersona=tipoPersona;
            }
            console.log(tipoPersona,'tipoPersona  .0000');
            var contribuyente=new gLstActividadEconomica();
            contribuyente.idContribuyente=idContribuyente;
            contribuyente.tipo=tipoPersona;
            //try{
            contribuyente.lstActividadEconomica(function(resultado){            
            resultadoApi = JSON.parse(resultado);
            console.log(resultadoApi,'resultadoApi resultadoApi');

            console.log("RESULT API: ", resultadoApi);
            $scope.data3=[];
            $scope.tramite02 = {};
                if (resultadoApi.success) {
                    var response    =   resultadoApi;
                    if(response.success.dataSql.length > 0){
                        //PRETUNTAR Y LISTAR, SOLO LOS TRÁMITES EN LINEA DE INTERNET                    
                                        
                        $scope.mostrarMsgActividadTrue  = true;
                        $scope.mostrarMsgActividadFalse = false;
                        $scope.trmUsuario = response.success.dataSql;                            
                        var data = response.success.dataSql;
                        $scope.data3 = response.success.dataSql; 
                        console.log($scope.data3,'$scope.data3 $scope.data3 $scope.data3');  //grabamos la respuesta para el paginado
                        $scope.tblTramites.reload();
                    } else {
                        $scope.mostrarMsgActividadTrue  = false;
                        $scope.mostrarMsgActividadFalse = true;
                        $scope.formDatosAE  =   false;
                    }
                } else {
                     sweet.show('', "Datos no Encontrados !!!", 'warning');
                     $scope.mostrar_form_ope = true;

                }
            });

        }else{
            //$scope.txtMsgConexionGen
            $scope.mostrarMsgActividadTrue  = false;
            $scope.mostrarMsgActividadFalse = true;
            $scope.formDatosAE  =   false;
            if($scope.txtMsgConexionGen != ''){
                $scope.txtMsgDataRenovacion =   $scope.txtMsgConexionGen;
            }else{
                $scope.txtMsgDataRenovacion =   "Estimado Ciudadano no tiene actividad económica.";  
                $scope.mostrar_form_ope = true;           
            }
        }
    };
    
    $scope.tblTramites = new ngTableParams({
        page: 1,          
        count: 5,
        filter: {},
        sorting: {
            IdActividad: 'desc'
        }
    }, {
        total: $scope.trmUsuario.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.trmUsuario, params.filter()) :
            $scope.trmUsuario;              
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.trmUsuario;
            params.total($scope.trmUsuario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    var clsIniciarGrillaAE = $rootScope.$on('inicializarGrillaAE', function(event, data){
        $scope.formDatosAE              = false;
        $scope.mostrarMsgActividadTrue  = false;
        $scope.mostrarMsgActividadFalse = false;  
        if(data.length > 0){
            if(data[0].venviado != 'SI'){
                $scope.validarActividadEco(data[0].datos.TIPO);
            }
        }
    });   

/***************panel de colores *************/
var muestrario;
var colorPredeterminado = "#0000ff";

window.addEventListener("load", startup, false);

function startup() {
  muestrario = document.querySelector("#muestrario");
  muestrario.value = colorPredeterminado;
  muestrario.addEventListener("input", actualizarPrimero, false);
  muestrario.addEventListener("change", actualizarTodo, false);
  muestrario.select();
}
/***************fin panel***********/

function actualizarPrimero(event) {
  var p = document.querySelector("p");

  if (p) {
    p.style.color = event.target.value;
  }
}

function actualizarTodo(event) {
  document.querySelectorAll("p").forEach(function(p) {
    p.style.color = event.target.value;
  });
}


$scope.muestraTaxi = function(){
  //alert(555);
  if($scope.tipo_persona=="NATURAL" && $scope.datos.RO_MOD=="2"){
    $scope.taxi=true;
  //  alert(444);
    $scope.datos.RO_TIP_TAX ='2';

  }

  if($scope.datos.RO_MOD==2){

  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////// MAPA //////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var map;
var mapj;
var markers = [];
var markersj = [];

$scope.initMap = function() {
    console.log('prueba');
    var haightAshbury = {
        lat: -16.495635,
        lng: -68.133543
    };
    map = new google.maps.Map(document.getElementById('mapModificar'), {
        zoom: 15,
        center: haightAshbury
        //mapTypeId: google.maps.MapTypeId.TERRAIN
    });


    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
        console.log(event.latLng.lat(),'event');
        console.log(event.latLng.lng(),'event');
        $scope.deleteMarkers();
        /*$scope.registro.latitud = event.latLng.lat();
        $scope.registro.longitud = event.latLng.lng();*/
        //map.setCenter(event.latLng);
        $scope.datos.latitud=event.latLng.lat();
        $scope.datos.longitud=event.latLng.lng();
        var nuevoUbicacion = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        $scope.DATOS_AXJ = {
          "params": [
            {
              "name": "coordenadaEste",
              "value": ""+event.latLng.lat()+""
            },
            {
              "name": "coordenadaNorte",
              "value": ""+event.latLng.lng()+""
            }
          ]
        };

        $scope.addMarker(nuevoUbicacion);
    });

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
        google.maps.event.trigger(map, 'resize');
        $scope.abrirMapaJ();
        $scope.$apply();
    }, 300);
}
// Adds a marker to the map and push to the array.
 $scope.addMarker = function(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
    });
      markers.push(marker);
  }


    // Sets the map on all markers in the array.
    $scope.setMapOnAll = function(map) {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    $scope.clearMarkers = function() {
      $scope.setMapOnAll(null);
  }


    // Shows any markers currently in the array.
    $scope.showMarkers = function() {
      $scope.setMapOnAll(map);
  }

    // Deletes all markers in the array by removing references to them.
    $scope.deleteMarkers = function() {
      $scope.clearMarkers();
      markersj = [];
  }



///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
try{
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
}
catch (e) {}
 ///////////////////////////////////////////////////// ADJUNTOS ///////////////////////////////////////////////////////

    $scope.subirIMG = function(img,dato){
      var misDocs = new Array();
        misDocs.push(img);
        $scope.direccionvirtual = "RC_CLI/";
       // var uploadUrl = CONFIG.APIURL+"/files/MOVILIDAD/GLADYS/";
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');

         $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/" ;
       
       
        angular.forEach(misDocs, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                fileUpload.uploadFileToUrl(archivo, uploadUrl);
            }else{
            }
        });
      if(dato == 1){
        //$scope.datos.nombreimagen1 = img.name;
        var filecompress = compressImage(img.name).then(function(respuesta){
              console.log("aaaaaa----->",respuesta);
                $scope.datos.nombreimagen1 = respuesta;
                console.log("aaaaaa----->",respuesta);
            });
        $scope.datos.urlimagen1 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 2){
        $scope.datos.nombreimagen2 = img.name;
        $scope.datos.urlimagen2 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 3){
        $scope.datos.nombreimagen3 = img.name;
        $scope.datos.urlimagen3 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 4){
        $scope.datos.nombreimagen4 = img.name;
        $scope.datos.urlimagen4 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 5){
        $scope.datos.nombreimagen5 = img.name;
        $scope.datos.urlimagen5 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 6){
        $scope.datos.nombreimagen6 = img.name;
        $scope.datos.urlimagen6 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
       if(dato == 7){
        $scope.datos.nombreimagen7 = img.name;
        $scope.datos.urlimagen7 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 8){
        $scope.datos.nombreimagen8 = img.name;
        $scope.datos.urlimagen8 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 9){
        $scope.datos.nombreimagen9 = img.name;
        $scope.datos.urlimagen9 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
            if(dato == 10){
        $scope.datos.nombreimagen10 = img.name;
        $scope.datos.urlimagen10 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 11){
        $scope.datos.nombreimagen11 = img.name;
        $scope.datos.urlimagen11 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 12){
        $scope.datos.nombreimagen12 = img.name;
        $scope.datos.urlimagen12 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
            if(dato == 13){
        $scope.datos.nombreimagen13 = img.name;
        $scope.datos.urlimagen13 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 14){
        $scope.datos.nombreimagen14 = img.name;
        $scope.datos.urlimagen14 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 15){
        $scope.datos.nombreimagen15 = img.name;
        $scope.datos.urlimagen15 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
            if(dato == 16){
        $scope.datos.nombreimagen16 = img.name;
        $scope.datos.urlimagen16 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 17){
        $scope.datos.nombreimagen17 = img.name;
        $scope.datos.urlimagen17 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 18){
        $scope.datos.nombreimagen18 = img.name;
        $scope.datos.urlimagen18 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
            if(dato == 19){
        $scope.datos.nombreimagen19 = img.name;
        $scope.datos.urlimagen19 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 20){
        $scope.datos.nombreimagen20 = img.name;
        $scope.datos.urlimagen20 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 21){
        $scope.datos.nombreimagen21 = img.name;
        $scope.datos.urlimagen21 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 22){
        $scope.datos.nombreimagen22 = img.name;
        $scope.datos.urlimagen22 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 23){
        $scope.datos.nombreimagen23 = img.name;
        $scope.datos.urlimagen23 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 24){
        $scope.datos.nombreimagen24 = img.name;
        $scope.datos.urlimagen24 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 25){
        $scope.datos.nombreimagen25 = img.name;
        $scope.datos.urlimagen25 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 26){
        $scope.datos.nombreimagen26 = img.name;
        $scope.datos.urlimagen26 = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }
      if(dato == 27){
        $scope.datos.nombreimagen27 = img.name;
        $scope.datos.urlimagen27   = uploadUrl + img.name + '?app_name=' + CONFIG.APP_NAME;
      }            
    }



      $scope.cambiarFile2 = function(obj, valor){
       $scope.datos[obj.name] = valor;
       setTimeout(function(){
            console.log("MI IMAGEN: ", obj);
            $rootScope.leyenda1 = obj.name;
            console.log("--------------------------------------------------");
            console.log($rootScope.leyenda1);
            console.log("--------------------------------------------------");
       }, 500);
          console.log(obj,'obj');
            console.log(valor,'valor');
       $scope.subirRequisitos(obj, valor);
   };
   $scope.img=[];
    $scope.subirRequisitos  =   function(sobj, svalor){
  console.log(sobj.id,'obj 123');
  console.log(sobj.files[0].name,'img');
  console.log(svalor,'valor 123');
  $scope.url_img = "http://192.168.5.141/rest/files/RC_CLI/"+sessionService.get('IDSOLICITANTE')+"/movilidad/"+sobj.files[0].name+"?app_name=todoangular";

      $scope.img.push({
        imagen : sobj.id,
        url_img : $scope.url_img

     });
        console.log($scope.img,'img 123');
        console.log('-----------------------*************-----------------');
        var rMisDocs = new Array();
        if(sobj.files[0]){
            var filecompress = compressImage(sobj.files[0]).then(function(respuesta){
              console.log("aaaaaa----->",respuesta);
                sobj.files[0] = respuesta;
                console.log("aaaaaa----->",respuesta);
            });
            rMisDocs.push(sobj.files[0]);
            $scope.almacenarRequisitos(rMisDocs);
            $scope.adicionarArrayDeRequisitos(sobj);
        }
    };
    $scope.ejecutarFile = function(idfile){
        console.log(idfile,'idfile');

        var sid = document.getElementById(idfile);
        if(sid){
            document.getElementById(idfile).click();
        }else{
            alert("Error ");
        }
    };

    /*REQUISITOS2018*/
    $scope.fileArRequisitos = {};
    $scope.adicionarArrayDeRequisitos = function(aArch){        
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/" + aArch.files[0].name + "?app_name=todoangular";
        var adatafile   =   {};
        var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + aArch.files[0].name + '", "nombre":"' + aArch.files[0].name + '" }';

     console.log(myJSON,'myJSON');
        $scope.fileArRequisitos[aArch.name] = JSON.parse(myJSON);
        $scope.clonarRequisitosDocumentales($scope.fileArRequisitos);
    }
        $scope.almacenarRequisitos = function(aArchivos){
            console.log(aArchivos,'123465789');
            console.log(aArchivos[0].name,'name file');
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        console.log(sessionService,'sessionService.get');
        var sDirTramite =  sessionService.get('IDTRAMITE');
        console.log(sDirTramite,'sDirTramite');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/";
        console.log(uploadUrl,'uploadUrl');      
                $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/movilidad/" + aArchivos[0].name + "?app_name=todoangular";
                fileUpload.uploadFileToUrl(aArchivos[0], uploadUrl);
    };
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
    $scope.actulizarIdDistrito  =   function(){
      console.log('entra actualizar distrito');
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
        
        console.log("distrito: ", distNombre);
        console.log("distrito: ", $scope.aDistritoZona);        
        console.log("distrito: ", $scope.datos.INT_ID_ZONA);        
    };

    $scope.distritoZonas = function(idMacroJ){ 
        $scope.$apply();       
        console.log("ID MACRO JSON:", idMacroJ);
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

    /***************************************************guarda data*******************************************************************/
        $scope.datos_form={};

       $scope.guarda_form = function (datos) {
            $scope.datos_form= datos;
            for (var i = 0; i < $scope.img.length; i++) {
                if ($scope.img[i].imagen == "RO_ARCH1") {
                    $scope.datos_form.RO_ARCH1 = $scope.img[i].url_img;
                }
                if ($scope.img[i].IMAGEN == "RO_ARCH2") {
                    $scope.datos_form.RO_ARCH2 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH3") {
                    $scope.datos_form.RO_ARCH3 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH4") {
                    $scope.datos_form.RO_ARCH4 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH5") {
                    $scope.datos_form.RO_ARCH5 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH6") {
                    $scope.datos_form.RO_ARCH6 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH7") {
                    $scope.datos_form.RO_ARCH7 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH8") {
                    $scope.datos_form.RO_ARCH8 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH9") {
                    $scope.datos_form.RO_ARCH9 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH10") {
                    $scope.datos_form.RO_ARCH10 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH11") {
                    $scope.datos_form.RO_ARCH11 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH12") {
                    $scope.datos_form.RO_ARCH12 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH13") {
                    $scope.datos_form.RO_ARCH13 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH14") {
                    $scope.datos_form.RO_ARCH14 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH15") {
                    $scope.datos_form.RO_ARCH15 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH16") {
                    $scope.datos_form.RO_ARCH16 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH17") {
                    $scope.datos_form.RO_ARCH17 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH18") {
                    $scope.datos_form.RO_ARCH18 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH19") {
                    $scope.datos_form.RO_ARCH19 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH20") {
                    $scope.datos_form.RO_ARCH20 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH21") {
                    $scope.datos_form.RO_ARCH21 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH22") {
                    $scope.datos_form.RO_ARCH22 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH23") {
                    $scope.datos_form.RO_ARCH23 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH24") {
                    $scope.datos_form.RO_ARCH24 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH25") {
                    $scope.datos_form.RO_ARCH25 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH26") {
                    $scope.datos_form.RO_ARCH26 = $scope.img[i].url_img;
                };
                if ($scope.img[i].imagen == "RO_ARCH27") {
                    $scope.datos_form.RO_ARCH27 = $scope.img[i].url_img;
                };
            };          
            var form= JSON.stringify($scope.datos_form);
            console.log(form,'form');
            console.log("form prueba",$scope);
            var prueba   = new operador_data();
                prueba.ci = '564865465';
                prueba.datos = form;
                prueba.usuario = 1;
               /* prueba.operador_form(function(results){
                    results = JSON.parse(results);
                    if (results !=null) {
                        console.log("looooo",results);

                    }else{
                        $.unblockUI();
                        console.log("NO EXISTE DATOS");
                    }
                });*/

    };
    dataif={};
     $scope.crea_tramite = function (datos) {
        data_form = JSON.stringify(datos);
        console.log("ddddd",data_form);
        console.log('fff',datos);
         var form= JSON.stringify(datos);
            var tramite = new crear_Tramite();
            var dato ='{"g_fecha":"2018-06-26 9:1:45","g_tipo":"MOV-HO-","g_usuario": "gladys.laime","g_datos_solicitante": [], "G_CI":""}';

             tramite.proid=133;
             tramite.actid=1224;
             tramite.usr_id=1728;        
             tramite.datos=data_form;
             tramite.procodigo='MOV-RO-';
             tramite.macro_id=0;
             tramite.nodo_id=672;
             tramite.ws_id=24;
             tramite.tram_lotus(function(results){
                    results = JSON.parse(results);
                    if (results !=null) {
                        console.log("datos lotus",results);
                        sweet.show('', "Los datos del formulario fueron enviados", 'warning');
                    }else{
                        $.unblockUI();
                        console.log("NO EXISTE DATOS lot");
                    }
             });

    };

    dataif={};
     $scope.crea_tramite_lotus = function (datos) {
        if($scope.datos.RO_TIP_SOL==""|| $scope.datos.RO_TIP_SOL==undefined)
            {
                alertify.success('Completar el dato Tipo de Solicitud');
            }else
            {   
            $scope.guarda_form(datos);              
            data_form = JSON.stringify(datos);
            console.log("ddddd",data_form);
            var form= JSON.stringify(datos);
            var tramite = new crear_Tramite_lotus();
            console.log(tramite,'tramite 11111111');
            var dato ='{"g_fecha":"2018-06-26 9:1:45","g_tipo":"MOV-RO-","g_usuario": "gladys.laime","g_datos_solicitante": [], "G_CI":""}';
             tramite.proid=133;
             tramite.actid=1224;
             tramite.usr_id=1728;        
             tramite.datos=data_form;
             tramite.procodigo='MOV-RO-';
             tramite.macro_id=0;
             tramite.nodo_id=672;
             tramite.ws_id=24;
             tramite.tram_lotus(function(results){
                    results = JSON.parse(results);
                    console.log(results,'results tramite lotus 123');
                    $scope.nroTramite= results.success[0]; 
                    console.log($scope.nroTramite,'$scope.nroTramite  nrooooo');
                    $scope.nroTramite=$scope.nroTramite.casonro;
                    console.log($scope.nroTramite,'$scope.nroTramite');
                    if (results !=null) {
                        console.log("datos lotus",results);
                        alertify.success("Los datos del formulario fueron enviados");
                    }else{
                        $.unblockUI();
                        console.log("NO EXISTE DATOS lot");
                    }
                    $scope.validarFormProcesos(datos);
             }); 
          }            
      };
    $scope.bloquearBtnEnviarForm    =   function(){
        $scope.botones          =   null;
        $scope.desabilitado=true;
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
                         {       //1157HCL
                        console.log('prueba1111111111111',vehiculo.placa);
                      var din= new asig_dinamico();
                        din.consulta='select * from sp_ope_verif_placa($$'+vehiculo.placa+'$$)';
                        console.log(din.consulta,'din.123');
                        din.dinamico(function(results){
                        results = JSON.parse(results);
                        console.log(results,'results 1231');
                        $scope.verif_placa = results.success.data[0].sp_dinamico;
                            console.log($scope.verif_placa,'$scope.verif_placa123');
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

               //  $scope.verificarDatos(placa);
                $scope.verificaVehiculo();

              }
            }
            }
          $scope.verificarDatos = function(placa){
             alertify.success({
              title: "Esta seguro de cambiar la PLACA",
              text: "Se hará nuevamente la búsqueda de la placa",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "OK",
              closeOnConfirm: false},
              function(){
              alertify.success("Cambiando...!");
              

            });
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
                        din.consulta= 'select cond_ci, cond_registrado, ope_rz from _mv_ope_conductores_datos inner join _mv_ope_operadores_datos on ope_id=cond_ope_id where cond_ci=($$'+$scope.datos.RO_CI_C+'$$)';
                        console.log(din.consulta,'din.consulta00 cond');
                        din.dinamico(function(results){
                        results = JSON.parse(results);
                        console.log(results,'results 45');
                        $scope.verif_ci_cond = results.success.data[0].sp_dinamico;
                        if(results.success.data[0].sp_dinamico != null)
                        {
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
              console.log(ci.length,'cscdscdcsdcsd');
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
        din.consulta='select * from sp_crear_datos_formulario(11,$$'+ JSON.stringify($scope.datos)+'$$,$$'+sIdCiudadano+'$$,'+'1'+','+$rootScope.tramiteId+')';
        din.dinamicos_rc(function(results){
        results = JSON.parse(results);
        console.log(results,'results123333333333333333');

        });

    };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// REGISTRO DE OFICINAS /////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Datos de oficina y sucursales////////////////////////////////////////////

$scope.Datos_of = function(){
$scope.oficiDat=$scope.datos.RO_G_OFICINAS;
console.log($scope.datos.RO_G_OFICINAS,'$scope.datos.RO_G_OFICINAS');
 }
$scope.ofici = [];
          
            /////////////////////////////////////////////////// datos Operador ////////////////////////////////////////////////////////


        $scope.ope=[];
/*
        $scope.ope=[];
           $scope.guarda_datosOperador = function(op){
                        
                console.log(op,'operador');          
                $scope.ope.push({
                               
                                RO_NIT: op.RO_NIT,
                                RO_RZ: op.RO_RZ,
                                RO_TIP_SER: op.RO_TIP_SER,
                                RO_SER_SPU: op.RO_SER_SPU,
                                RO_SER_SPR: op.RO_SER_SPR,
                                RO_SER_EMC: op.RO_SER_EMC,
                                RO_MOD: op.RO_MOD,
                                RO_TIP_OPE: op.RO_TIP_OPE,
                                RO_NOM_OP: op.RO_NOM_OP,
                                RO_FRE_RAD: op.RO_FRE_RAD,
                                RO_PLA_TEC: op.RO_PLA_TEC,
                                RO_EN_VIA: op.RO_EN_VIA, 
                                RO_PMC: op.RO_PMC, 
                                RO_FRE: op.RO_FRE, 
                                RO_PLA: op.RO_PLA,                                 
                            });
                $scope.rz=op.RO_RZ;
                $scope.datos.RO_OPERADOR= $scope.ope;
                console.log($scope.datos.RO_OPERADOR,'$scope.datos.RO_OPERADOR');
    var z = JSON.stringify( $scope.datos.RO_OPERADOR, function( key, value ) {
        
          if( key === "$$hashKey" ) {
              return undefined;
          }
          return value;
      });
    $scope.datos_operador=z;
    $scope.idusuario = sessionService.get('IDCIUDADANO');
    console.log($scope.idusuario,'$scope.idusuario');
        console.log($scope.datos_operador,'$scope.datos_operador0001');
       $scope.req='[{"":""}]';
       $scope.rev2='[{"":""}]';
        var din= new asig_dinamico();
        din.consulta='select * from sp_abm_operador($$'+$scope.rz+'$$,$$'+z+'$$,$$'+$scope.req+'$$,$$'+$scope.rev2+'$$,$$'+1+'$$)';
        console.log(din.consulta,'din.consulta 0303030303030303033030303030');
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
        $scope.representante = results.success.data[0].sp_dinamico;
        $scope.representante = $scope.representante[0];
        $scope.idOperador = $scope.representante.idope;
        $scope.datos.idOperador = $scope.idOperador;
        console.log($scope.idOperador,'idOperador');
       }); 
      }*/

           $scope.guarda_datosOperador = function(op){
            if($scope.tipo_persona=='NATURAL'){
                op.RO_TIP_OPE='Empresa';
            }
                console.log(op,'operador');          
                $scope.ope.push({
                               
                                RO_NIT: op.RO_NIT,
                                RO_RZ: op.RO_RZ,
                                RO_TIP_SER: op.RO_TIP_SER,
                                RO_SER_SPU: op.RO_SER_SPU,
                                RO_SER_SPR: op.RO_SER_SPR,
                                RO_SER_EMC: op.RO_SER_EMC,
                                RO_MOD: op.RO_MOD,
                                RO_TIP_OPE: op.RO_TIP_OPE,
                                RO_NOM_OP: op.RO_NOM_OP,
                                RO_FRE_RAD: op.RO_FRE_RAD,
                                RO_PLA_TEC: op.RO_PLA_TEC,
                                RO_EN_VIA: op.RO_EN_VIA, 
                                RO_PMC: op.RO_PMC, 
                                RO_FRE: op.RO_FRE, 
                                RO_PLA: op.RO_PLA, 
                                RO_TEL_OF: op.RO_TEL_OF,
                                RO_DEN: op.RO_DEN,
                                RO_SUP: op.RO_SUP,                                
                            });

                $scope.DEN=op.RO_DEN;                       
                $scope.RO_NIT=op.RO_NIT;
        console.log($scope.DEN,'$scope.DEN');

                $scope.datos.RO_OPERADOR= $scope.ope;
                console.log($scope.datos.RO_OPERADOR,'$scope.datos.RO_OPERADOR');
    var z = JSON.stringify( $scope.datos.RO_OPERADOR, function( key, value ) {
        
          if( key === "$$hashKey" ) {
              return undefined;
          }
          return value;
      });
    $scope.datos_operador=z;
    $scope.idusuario = sessionService.get('IDCIUDADANO');
    console.log($scope.idusuario,'$scope.idusuario');
        console.log($scope.datos_operador,'$scope.datos_operador0001');
       $scope.req='[{"":""}]';
       $scope.rev2='[{"":""}]';
        var din= new asig_dinamico();  
        din.consulta='select * from sp_abm_operador($$'+$scope.datos.RO_RZ+'$$,$$'+z+'$$,$$'+$scope.datos.RO_DEN.trim('                         ')+'$$,$$'+op.RO_NIT+'$$,$$'+$scope.req+'$$,$$'+$scope.rev2+'$$,$$'+1+'$$)';
        console.log(din.consulta,'din.consulta 0303030303030303033030303030');
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
        $scope.representante = results.success.data[0].sp_dinamico;
        $scope.representante = $scope.representante[0];
       });
        
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          $scope.verif_operador = function(){ 
        $scope.ofici = [];
        console.log($scope.datos.RO_DEN,'$scope.datos.RO_DEN  11111');
        console.log('entra listar_of');
            var din= new asig_dinamico();
                din.consulta='select ope_id,ope_denominacion from _mv_ope_operadores_datos where ope_denominacion=$$'+$scope.datos.RO_DEN.trim('                         ')+'$$ and ope_estado=$$A$$';
                console.log(din.consulta,'din.consultadin.consultaaaaa');
                din.dinamico(function(results){
                results = JSON.parse(results);
                console.log(results,'results OP');  
                if(results.success.data[0].sp_dinamico != null){
               //   for (var i = 0; i <= results.success.data[0].sp_dinamico.length; i++) {                                        
                    $scope.operador_datos=results.success.data[0].sp_dinamico;   
                    if($scope.operador_datos[0].ope_id!=null){
                    $scope.datos.idOperador = $scope.operador_datos[0].ope_id;  
                    }
                    else
                    {
                      $scope.datos.idOperador=null;
                    }
                    
                    console.log('pista nro 2',$scope.datos.idOperador);
                     }
            });
            
        }

    ///////////////////////////////////////////////////datoa representante////////////////////////////////////////////////////////
            console.log($scope.tipo_persona,'$scope.tipo_persona  123');
            $scope.repre=[];
            $scope.guarda_datosRepresentante = function(repr){
              $scope.verif_operador();
                console.log(repr,'123');          
                console.log($scope.tipo_persona,'$scope.tipo_persona 1111');
                $scope.repre.push({
                               
                                RO_NOM_RL: repr.RO_NOM_RL,
                                RO_PAT_RL: repr.RO_PAT_RL,
                                RO_MAT_RL: repr.RO_MAT_RL,
                                RO_CI_RL: repr.RO_CI_RL,
                                RO_CAS_RL: repr.RO_CAS_RL,
                                RO_EXP_RL: repr.RO_EXP_RL,
                                RO_TEL_RL: repr.RO_TEL_RL,
                                RO_CEL_RL: repr.RO_CEL_RL,
                                RO_CORR_RL: repr.RO_CORR_RL,
                                RO_MAC_RL: repr.RO_MAC_RL,
                                RO_DIS_RL: repr.RO_DIS_RL,
                                RO_ZONA_RL: repr.RO_ZONA_RL,
                                RO_TIP_VIA_RL: repr.RO_TIP_VIA_RL,
                                RO_CALL_RL: repr.RO_CALL_RL,
                                RO_NRO_RL: repr.RO_NRO_RL, 
                                RO_POD_RL: repr.RO_POD_RL, 
                                RO_NOT_RL: repr.RO_NOT_RL, 
                            });
                $scope.datos.RO_REPRESENTANTE= $scope.repre;
                console.log($scope.datos.RO_REPRESENTANTE,'$scope.datos.RO_REPRESENTANTE');
    var z = JSON.stringify( $scope.datos.RO_REPRESENTANTE, function( key, value ) {
          if( key === "$$hashKey" ) {
              return undefined;
          }
          return value;
      });
        var din= new asig_dinamico();
        din.consulta='select * from sp_abm_operador_repr($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_CI_RL+'$$,$$'+z+'$$,$$1$$,$$'+$scope.tipo_persona+'$$)';
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
        $scope.representante = results.success.data[0].sp_dinamico;
        $scope.representante = $scope.representante[0].sp_abm_operador_repr;
        console.log(results.success.data[0].sp_dinamico,'results');

        $scope.usuarioci = sessionService.get('CICIUDADANO');
console.log($scope.usuarioci,'$scope.usuarioci');

       });

  }  
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////  registro de requisitos   /////////////////////////////////////////////////////////////////
        $scope.requi=[];
            $scope.guarda_datosRequisitos = function(req){
           if($scope.datos.RO_TIP_SOL=='' || $scope.datos.RO_TIP_SOL==undefined)
           { 
                alertify.success('Complete el dato: Tipo de solicitud');
            }
            else
            {
                $scope.requi.push({                               
                                RO_ARCH1: req.RO_ARCH1,
                                RO_ARCH2: req.RO_ARCH2,
                                RO_ARCH3: req.RO_ARCH3,
                                RO_ARCH4: req.RO_ARCH4, 
                                RO_ARCH5: req.RO_ARCH5,
                                RO_ARCH6: req.RO_ARCH6,
                                RO_ARCH7: req.RO_ARCH7,
                                RO_ARCH8: req.RO_ARCH8,
                                RO_ARCH9: req.RO_ARCH9,
                                RO_ARCH10: req.RO_ARCH10,
                                RO_ARCH11: req.RO_ARCH11,
                                RO_ARCH12: req.RO_ARCH12,
                                RO_ARCH13: req.RO_ARCH13,
                                RO_ARCH14: req.RO_ARCH14,
                                RO_ARCH15: req.RO_ARCH15,
                                RO_ARCH16: req.RO_ARCH16,
                                RO_ARCH17: req.RO_ARCH17,
                                RO_ARCH18: req.RO_ARCH18,
                                RO_ARCH19: req.RO_ARCH19,
                                RO_ARCH20: req.RO_ARCH20,
                                RO_ARCH21: req.RO_ARCH21,
                                RO_ARCH22: req.RO_ARCH22,
                                RO_ARCH23: req.RO_ARCH23,
                                RO_ARCH24: req.RO_ARCH24,
                                RO_ARCH25: req.RO_ARCH25,
                                RO_ARCH26: req.RO_ARCH26,
                                RO_ARCH27: req.RO_ARCH27,
                            });
                $scope.datos.RO_REQUISITOS= $scope.requi;
                console.log($scope.datos.RO_REQUISITOS,'$scope.datos.RO_REQUISITOS');
    var z = JSON.stringify( $scope.datos.RO_REQUISITOS, function( key, value ) {
          if( key === "$$hashKey" ) {
              return undefined;
          }
          return value;
      });
     }
        $scope.rev2 = '[{"":""}]' ;
        console.log($scope.datos_operador,'$scope.datos_operador00000000')
        var din= new asig_dinamico();
       // console.log($scope.rz.trim,'scope.rz.trim.....................');
        //din.consulta='select * from sp_abm_operador($$'+$scope.rz+'$$,$$'+$scope.datos_operador+'$$,$$'+z+'$$,$$'+$scope.rev2+'$$,$$'+1+'$$)';
        din.consulta='select * from sp_abm_operador($$'+$scope.datos.RO_RZ+'$$,$$'+z+'$$,$$'+$scope.datos.RO_DEN.trim('                         ')+'$$,$$'+$scope.datos.RO_NIT+'$$,$$'+z+'$$,$$'+$scope.rev2+'$$,$$'+1+'$$)';
       
        console.log(din.consulta,'din.consulta0123');
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results1233');
        $scope.representante = results.success.data[0].sp_dinamico;
        $scope.representante = $scope.representante[0].sp_abm_operador;
        console.log(results.success.data[0].sp_dinamico,'results');

       });
     } 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////  registro de Oficinas   /////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      $scope.listar_of = function(){ 
        $scope.ofici = [];
        console.log('entra listar_of');
         var din= new asig_dinamico();
                din.consulta='select ofi_id,ofi_datos from _mv_ope_oficinas_datos where ofi_ope_id=$$'+$scope.datos.idOperador+'$$ and ofi_estado=$$A$$ order by ofi_id';
                console.log(din.consulta,'din.consultadin.consultaaaaa   of');
                din.dinamico(function(results){
                results = JSON.parse(results);
                console.log(results,'results of');  
                if(results.success.data[0].sp_dinamico != null){
                    $scope.ofici=results.success.data[0].sp_dinamico;
                    $scope.datos.RO_G_OFICINAS = $scope.ofici;
                    console.log($scope.ofici,'$scope.ofici OFFFFF');
                      for (var i = 0; i < $scope.ofici.length; i++) {                    
                    
                    if($scope.ofici[i].ofi_datos[0].RO_MAC_OF==$scope.datos.RO_MAC_OF){

                        $scope.ofici=results.success.data[0].sp_dinamico;
                        $scope.datos.RO_MAC_OF = $scope.ofici[i].ofi_datos[0].RO_MAC_OF;
                        $scope.datos.RO_ZONA_OF = $scope.ofici[i].ofi_datos[0].RO_ZONA_OF;
                        $scope.datos.RO_NOM_VIA_OF = $scope.ofici[i].ofi_datos[0].RO_NOM_VIA_OF;
                        $scope.datos.RO_ENT_CALL_OF = $scope.ofici[i].ofi_datos[0].RO_ENT_CALL_OF;
                        $scope.datos.RO_NRO_OF = $scope.ofici[i].ofi_datos[0].RO_NRO_OF;
                        $scope.datos.RO_CAN_VEH = $scope.ofici[i].ofi_datos[0].RO_CAN_VEH;
                        $scope.datos.RO_DIR_GAR = $scope.ofici[i].ofi_datos[0].RO_DIR_GAR;
                        $scope.datos.RO_PAR_NRO = $scope.ofici[i].ofi_datos[0].RO_PAR_NRO;
                        $scope.datos.RO_ESP_DIS = $scope.ofici[i].ofi_datos[0].RO_ESP_DIS;
                        $scope.datos.RO_VIA_PAR_MOM = $scope.ofici[i].ofi_datos[0].RO_VIA_PAR_MOM;
                        $scope.datos.RO_ENT_CALL = $scope.ofici[i].ofi_datos[0].RO_ENT_CALL;
                        $scope.datos.latitud = $scope.ofici[i].ofi_datos[0].latitud;
                        $scope.datos.longitud = $scope.ofici[i].ofi_datos[0].longitud;

                     }
                    };
                    console.log('pista nro 2',$scope.ofici);
                    $scope.verifofi = 'existe datos';
                 
                }else{
                  $scope.verifofi=null;
                    $scope.ofici = [];
                    console.log('entra else');
                }
            });
        }

$scope.ofi = {};
$scope.oficinas = {};
$scope.datos.RO_G_OFICINAS='';
$scope.comp=1;
$scope.macro=0;

            $scope.guardarDatosOficinas_sam = function(){
              console.log($scope.datos.RO_NRO_OF,'$scope.datos.RO_NRO_OF123123');
              console.log($scope.datos.RO_ZONA_OF,'$scope.datos.RO_ZONA_OF   123');
              console.log($scope.datos.RO_NOM_VIA_OF,'$scope.datos.RO_NOM_VIA_OF 456');
              $scope.ofici2 = [];
              $scope.ofici = [];
              $scope.rev3='[{"":""}]';
              $scope.listar_of();
              console.log($scope.verifofi,'$scope.verifofi');
              if($scope.verifofi ==null || $scope.verifofi == undefined){
                console.log('------------------------------> ENTRA IF');
                              $scope.ofici2.push({
                                //RO_TIP_ACT: ofi.RO_TIP_ACT,
                                RO_MAC_OF: $scope.datos.RO_MAC_OF,
                                RO_ZONA_OF: $scope.datos.RO_ZONA_OF,
                                RO_NOM_VIA_OF: $scope.datos.RO_NOM_VIA_OF,
                                RO_ENT_CALL_OF: $scope.datos.RO_ENT_CALL_OF,
                                RO_NRO_OF: $scope.datos.RO_NRO_OF,
                                RO_CAN_VEH: $scope.datos.RO_CAN_VEH,
                                RO_DIR_GAR: $scope.datos.RO_DIR_GAR,
                                RO_PAR_NRO: $scope.datos.RO_PAR_NRO,
                                RO_ESP_DIS: $scope.datos.RO_ESP_DIS,
                                RO_VIA_PAR_MOM: $scope.datos.RO_VIA_PAR_MOM,
                                RO_ENT_CALL: $scope.datos.RO_ENT_CALL,
                                latitud: $scope.datos.latitud,
                                longitud: $scope.datos.longitud,
                               // RO_TEL_OF: $scope.datos.RO_TEL_OF,  
                            });
                      $scope.ofici2.RO_NRO_OF=$scope.ofici2.RO_NRO_OF;
                      console.log($scope.ofi.RO_NRO_OF,'$scope.ofi.RO_NRO_OF 123123123  123456');                      
                     var z = JSON.stringify($scope.ofici2, function( key, value ) {
                if( key === "$$hashKey" ) {
                    return undefined;
                }
                return value;
            });
              var din= new asig_dinamico();
              din.consulta='select * from sp_abm_operador_ofis($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_MAC_OF+'$$,$$'+z+'$$,$$'+$scope.rev3+'$$,1,null,$$I$$)';
              console.log(din.consulta,'din.consulta00000000000000000000');
              din.dinamico(function(results){
              results = JSON.parse(results);
              $scope.ofici = results.success.data[0].sp_dinamico;
              $scope.ofici = $scope.ofici[0].sp_abm_operador_ofis;
              $scope.listar_of();
              $scope.datos.RO_G_OFICINAS=$scope.ofici;
              }); 
              }
              else{
              for (var i = 0; i < $scope.ofici.length; i++) {                
                $scope.datubi=$scope.ofici[i].ofi_datos;
                $scope.datMac=$scope.datubi[0].RO_MAC_OF;
                $scope.datZon=$scope.datubi[0].RO_ZONA_OF;
                $scope.datVia=$scope.datubi[0].RO_NOM_VIA_OF;
                console.log($scope.datVia,'$scope......22');
                console.log($scope.datMac,'$scope.datMac VV');
                console.log($scope.datubi[0].RO_ZONA_OF,'$scope.datubi[0].RO_ZONA_OF 1111111111111111...');
                if($scope.datMac !=$scope.datos.RO_MAC_OF || $scope.datubi[0].RO_ZONA_OF !=$scope.datos.RO_ZONA_OF || $scope.datubi[0].RO_NOM_VIA_OF !=$scope.datos.RO_NOM_VIA_OF || $scope.datubi[0].RO_NOM_VIA_OF !=undefined && $scope.datubi[0].RO_ZONA_OF != undefined){
                  console.log('EMTRA');
                  if($scope.datos.RO_MAC_OF!='' || $scope.datos.RO_ZONA_OF!='' ){
                                
                      $scope.ofici2.push({
                                //RO_TIP_ACT: ofi.RO_TIP_ACT,
                                RO_MAC_OF: $scope.datos.RO_MAC_OF,
                                RO_ZONA_OF: $scope.datos.RO_ZONA_OF,
                                RO_NOM_VIA_OF: $scope.datos.RO_NOM_VIA_OF,
                                RO_ENT_CALL_OF: $scope.datos.RO_ENT_CALL_OF,
                                RO_NRO_OF: $scope.datos.RO_NRO_OF,
                                RO_CAN_VEH: $scope.datos.RO_CAN_VEH,
                                RO_DIR_GAR: $scope.datos.RO_DIR_GAR,
                                RO_PAR_NRO: $scope.datos.RO_PAR_NRO,
                                RO_ESP_DIS: $scope.datos.RO_ESP_DIS,
                                RO_VIA_PAR_MOM: $scope.datos.RO_VIA_PAR_MOM,
                                RO_ENT_CALL: $scope.datos.RO_ENT_CALL,
                                latitud: $scope.datos.latitud,
                                longitud: $scope.datos.longitud,
                              //  RO_TEL_OF: $scope.datos.RO_TEL_OF,  
                            });
                      console.log($scope.ofici2,'$scope.ofici2  111111');                  
                      $scope.ofi.RO_NRO_OF=$scope.ofici2.RO_NRO_OF;
                      console.log($scope.ofi.RO_NRO_OF,'$scope.ofi.RO_NRO_OF 123123123  123');                      
                     var z = JSON.stringify($scope.ofici2, function( key, value ) {
                if( key === "$$hashKey" ) {
                    return undefined;
                }
                return value;
            });
              if($scope.ofici2.RO_ZONA_OF != undefined || $scope.ofici2.RO_ZONA_OF != '' && $scope.datubi[0].RO_ZONA_OF !=$scope.datos.RO_ZONA_OF){
              var din= new asig_dinamico();
              din.consulta='select * from sp_abm_operador_ofis($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_MAC_OF+'$$,$$'+z+'$$,$$'+$scope.rev3+'$$,1,null,$$I$$)';
              console.log(din.consulta,'din.consulta00000000000000000000');
              din.dinamico(function(results){
              results = JSON.parse(results);
              console.log(results,'results');
              $scope.ofici = results.success.data[0].sp_dinamico;
              $scope.ofici = $scope.ofici[0].sp_abm_operador_ofis;
              console.log(results.success.data[0].sp_dinamico,'results');
              $scope.listar_of();
              $scope.datos.RO_G_OFICINAS=$scope.ofici;
              }); 
             }
             }
            }
           } 
          };
            $scope.datos.RO_MAC_OF=""; $scope.datos.RO_ZONA_OF=""; $scope.datos.RO_NOM_VIA_OF=""; $scope.datos.RO_ENT_CALL_OF="";
            $scope.datos.RO_NRO_OF=""; $scope.datos.RO_CAN_VEH=""; $scope.datos.RO_DIR_GAR=""; $scope.datos.RO_PAR_NRO="";
            $scope.datos.RO_ESP_DIS=""; $scope.datos.RO_VIA_PAR_MOM=""; $scope.datos.RO_ENT_CALL="";$scope.datos.RO_TEL_OF="";
                    
        }


            $scope.guardarDatosOficinas = function(ofi){
                console.log(ofi,'ofi00');
                $scope.ofici3 = [];
           var tam=0;
            $scope.rev3='[{"":""}]';
            if( 
            $scope.datos.RO_MAC_OF=='' || $scope.datos.RO_MAC_OF==undefined ||  $scope.datos.RO_ZONA_OF=='' || $scope.datos.RO_ZONA_OF==undefined || 
            $scope.datos.RO_NOM_VIA_OF=='' || $scope.datos.RO_NOM_VIA_OF==undefined ||  $scope.datos.RO_ENT_CALL_OF=='' || $scope.datos.RO_ENT_CALL_OF==undefined || 
            $scope.datos.RO_NRO_OF=='' || $scope.datos.RO_NRO_OF==undefined ||  $scope.datos.RO_CAN_VEH=='' || $scope.datos.RO_CAN_VEH==undefined || 
            $scope.datos.RO_DIR_GAR=='' || $scope.datos.RO_DIR_GAR==undefined ||  $scope.datos.RO_PAR_NRO=='' || $scope.datos.RO_PAR_NRO==undefined || 
            $scope.datos.RO_ESP_DIS=='' || $scope.datos.RO_ESP_DIS==undefined ||  $scope.datos.RO_VIA_PAR_MOM=='' || $scope.datos.RO_VIA_PAR_MOM==undefined || 
            $scope.datos.RO_ENT_CALL=='' || $scope.datos.RO_ENT_CALL==undefined)
            {
                alertify.success('Complete los datos para realizar el registro', 'error');
            }
            else{
            if(tam == 0)
            {
                $scope.ofici3.push({
                                RO_MAC_OF: ofi.RO_MAC_OF,
                                RO_ZONA_OF: ofi.RO_ZONA_OF,
                                RO_NOM_VIA_OF: ofi.RO_NOM_VIA_OF,
                                RO_ENT_CALL_OF: ofi.RO_ENT_CALL_OF,
                                RO_NRO_OF: ofi.RO_NRO_OF,
                                RO_CAN_VEH: ofi.RO_CAN_VEH,
                                RO_DIR_GAR: ofi.RO_DIR_GAR,
                                RO_PAR_NRO: ofi.RO_PAR_NRO,
                                RO_ESP_DIS: ofi.RO_ESP_DIS,
                                RO_VIA_PAR_MOM: ofi.RO_VIA_PAR_MOM,
                                RO_ENT_CALL: ofi.RO_ENT_CALL,
                                RO_TEL_OF: ofi.RO_TEL_OF, 
                                latitud: ofi.latitud,
                                longitud: ofi.longitud,
                            });
                console.log($scope.ofici3,'$scope.ofici3  AAAA');
                var z = JSON.stringify($scope.ofici3, function( key, value ) {
                if( key === "$$hashKey" ) {
                    return undefined;
                }
                return value;
              });
                 
              var din= new asig_dinamico();
              din.consulta='select * from sp_abm_operador_ofis($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_MAC_OF+'$$,$$'+z+'$$,$$'+$scope.rev3+'$$,1,null,$$I$$)';
              console.log(din.consulta,'din.consulta00000000000000000000');
              din.dinamico(function(results){
              results = JSON.parse(results);
              console.log(results,'results');
              $scope.ofici = results.success.data[0].sp_dinamico;
              $scope.ofici = $scope.ofici[0].sp_abm_operador_ofis;
              console.log(results.success.data[0].sp_dinamico,'results');
              $scope.listar_of();
             });      
                console.log($scope.ofici3,'$scope.ofici');
            }
            else
            {
                console.log($scope.ofici3,'$scope.ofici');
                console.log(ofi.RO_MAC_OF ,'ofi.RO_MAC_OF');
                $scope.macro =1;
                for (var i = 0; i < $scope.ofici.length; i++) {
                        console.log($scope.ofici[i].ofi_datos[0].RO_MAC_OF,'macro2');
                        console.log(ofi.RO_MAC_OF,'macro');
                    if($scope.ofici[i].ofi_datos[0].RO_MAC_OF==ofi.RO_MAC_OF)
                    {
                        $scope.macro=0;
                        
                    }
                }
                console.log($scope.macro,'$scope.macro**************');
                if($scope.macro == 0){
                    alertify.success('No puede registrar oficinas en el mismo MACRODISTRITO', 'error');
                }
                else{
                  //  alertify.success('si se puede insertar', 'success'); 
                  for (var i = 0; i < $scope.ofici.length; i++) {
                   if($scope.ofici[i].ofi_datos[0].RO_TIP_ACT == "MATRIZ")
                    {
                        $scope.comp=2;
                        console.log($scope.ofici[i].ofi_datos[0].RO_TIP_ACT,'$scope.ofici3[i].RO_TIP_ACT');

                    }
                };

               if ($scope.comp==1) {

                     $scope.ofici3.push({
                               // RO_TIP_ACT: ofi.RO_TIP_ACT,
                                RO_MAC_OF: ofi.RO_MAC_OF,
                                RO_ZONA_OF: ofi.RO_ZONA_OF,
                                RO_NOM_VIA_OF: ofi.RO_NOM_VIA_OF,
                                RO_ENT_CALL_OF: ofi.RO_ENT_CALL_OF,
                                RO_NRO_OF: ofi.RO_NRO_OF,
                                RO_CAN_VEH: ofi.RO_CAN_VEH,
                                RO_DIR_GAR: ofi.RO_DIR_GAR,
                                RO_PAR_NRO: ofi.RO_PAR_NRO,
                                RO_ESP_DIS: ofi.RO_ESP_DIS,
                                RO_VIA_PAR_MOM: ofi.RO_VIA_PAR_MOM,
                                RO_ENT_CALL: ofi.RO_ENT_CALL,
                                RO_TEL_OF: ofi.RO_TEL_OF, 
                                latitud: ofi.latitud, 
                                longitud: ofi.longitud,
                            });
                     var z = JSON.stringify($scope.ofici3, function( key, value ) {
                if( key === "$$hashKey" ) {
                    return undefined;
                }
                return value;
            });

              var din= new asig_dinamico();
              din.consulta='select * from sp_abm_operador_ofis($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_MAC_OF+'$$,$$'+z+'$$,$$'+$scope.rev3+'$$,1,null,$$I$$)';
              console.log(din.consulta,'din.consulta00000000000000000000');
              din.dinamico(function(results){
              results = JSON.parse(results);
              $scope.ofici = results.success.data[0].sp_dinamico;
              $scope.ofici = $scope.ofici[0].sp_abm_operador_ofis;
              console.log(results.success.data[0].sp_dinamico,'results');
              $scope.listar_of();
             });      
                };
                    if ($scope.comp==2) {
                        $scope.ofici3.push({
                         // RO_TIP_ACT: 'SUCURSAL',
                          RO_MAC_OF: ofi.RO_MAC_OF,
                          RO_ZONA_OF: ofi.RO_ZONA_OF,
                          RO_NOM_VIA_OF: ofi.RO_NOM_VIA_OF,
                          RO_ENT_CALL_OF: ofi.RO_ENT_CALL_OF,
                          RO_NRO_OF: ofi.RO_NRO_OF,
                          RO_CAN_VEH: ofi.RO_CAN_VEH,
                          RO_DIR_GAR: ofi.RO_DIR_GAR,
                          RO_PAR_NRO: ofi.RO_PAR_NRO,
                          RO_ESP_DIS: ofi.RO_ESP_DIS,
                          RO_VIA_PAR_MOM: ofi.RO_VIA_PAR_MOM,
                          RO_ENT_CALL: ofi.RO_ENT_CALL,
                          RO_TEL_OF: ofi.RO_TEL_OF,
                          latitud: ofi.latitud,
                      });
                        alertify.success('Ya existe MATRIZ, por lo tanto el registro: "Tipo de actividad" se guardo como SUCURSAL', 'error');
                      var z = JSON.stringify($scope.ofici3, function( key, value ) {
                        if( key === "$$hashKey" ) {
                            return undefined;
                        }
                        return value;
                    });
                      var din= new asig_dinamico();
                      din.consulta='select * from sp_abm_operador_ofis($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_MAC_OF+'$$,$$'+z+'$$,$$'+$scope.rev3+'$$,1,null,$$I$$)';
                      console.log(din.consulta,'din.consulta00000000000000000000');
                      din.dinamico(function(results){
                      results = JSON.parse(results);
                      console.log(results,'results');
                      $scope.ofici = results.success.data[0].sp_dinamico;
                      $scope.ofici = $scope.ofici[0].sp_abm_operador_ofis;
                      console.log(results.success.data[0].sp_dinamico,'results');
                      $scope.listar_of();
                     });      
                    } 
                }
                };
                      
                console.log(ofi,'ofi');
               // $scope.tip_actividad=ofi.RO_TIP_ACT;
                $scope.macro_ofi=ofi.RO_MAC_OF;
                console.log($scope.macro_ofi,'$scope.macro_ofi');
                console.log($scope.ofici,'adicion');
                $scope.datos.RO_G_OFICINAS=$scope.ofici;
                console.log($scope.datos.RO_G_OFICINAS,'DATOS oficinas');
              }
             
        }
        $scope.oficina = "";

    $scope.modificarOfis = function(ofi,index){
            console.log(ofi, 'mod oficinas');            
            $scope.ofi_id = ofi.ofi_id;
            console.log($scope.ofi_id);
            var zOf = JSON.stringify(ofi, function( key, value ) {
                if( key === "$$hashKey" ) {
                    return undefined;
                } 
                return value;
            });
            zOf=JSON.parse(zOf);
            console.log(zOf, 'z   ');
            zOf=zOf.ofi_datos[0];
            console.log(zOf, 'z ultimo    ');
            console.log(zOf.RO_MAC_OF, 'mod oficinas   RO_MAC_OF');

            //$scope.datos.RO_TIP_ACT = ofi.RO_TIP_ACT;
            //$scope.oficina.RO_NOM_VIA_OF = ofi.RO_NOM_VIA_OF;
            $scope.onlyy=true;
            $scope.botons="upd";
            $scope.macrodistritos();
            $scope.distritoZonas(zOf.RO_MAC_OF);
            $scope.datos.RO_NRO_OF=zOf.RO_NRO_OF;
           // $scope.datos.RO_TIP_ACT=zOf.RO_TIP_ACT;
            $scope.datos.RO_MAC_OF=zOf.RO_MAC_OF;            
            $scope.datos.RO_ZONA_OF=zOf.RO_ZONA_OF;            
            $scope.datos.RO_NOM_VIA_OF=zOf.RO_NOM_VIA_OF;
            $scope.datos.RO_ENT_CALL_OF=zOf.RO_ENT_CALL_OF;            
            $scope.datos.RO_CAN_VEH=zOf.RO_CAN_VEH;
            $scope.datos.RO_DIR_GAR=zOf.RO_DIR_GAR;   
            $scope.datos.RO_PAR_NRO=zOf.RO_PAR_NRO;
            $scope.datos.RO_ESP_DIS=zOf.RO_ESP_DIS;
            console.log( $scope.datos.RO_ESP_DIS, 'mod zOfcinas   RO_zona_OF 123');
            $scope.datos.RO_VIA_PAR_MOM=zOf.RO_VIA_PAR_MOM;
            $scope.datos.RO_TEL_OF=zOf.RO_TEL_OF; 
            $scope.datos.RO_ENT_CALL=zOf.RO_ENT_CALL;
            console.log(index, 'datos index');
            $scope.indexx = index;
        }

    $scope.modificarOficinas = function(oficinas){
      $scope.ofici4=[];
      $scope.rev3='[{"":""}]';
      console.log(oficinas, 'datos oficinas ');
      console.log('ofi',$scope.ofici);
      console.log($scope.ofi_id);
      console.log($scope.datos.RO_TIP_ACT,'$scope.datos.RO_TIP_ACT');

      if( $scope.datos.RO_TEL_OF=='' || $scope.datos.RO_TEL_OF==undefined || 
      $scope.datos.RO_MAC_OF=='' || $scope.datos.RO_MAC_OF==undefined ||  $scope.datos.RO_ZONA_OF=='' || $scope.datos.RO_ZONA_OF==undefined || 
      $scope.datos.RO_NOM_VIA_OF=='' || $scope.datos.RO_NOM_VIA_OF==undefined ||  $scope.datos.RO_ENT_CALL_OF=='' || $scope.datos.RO_ENT_CALL_OF==undefined || 
      $scope.datos.RO_NRO_OF=='' || $scope.datos.RO_NRO_OF==undefined ||  $scope.datos.RO_CAN_VEH=='' || $scope.datos.RO_CAN_VEH==undefined || 
      $scope.datos.RO_DIR_GAR=='' || $scope.datos.RO_DIR_GAR==undefined ||  $scope.datos.RO_PAR_NRO=='' || $scope.datos.RO_PAR_NRO==undefined || 
      $scope.datos.RO_ESP_DIS=='' || $scope.datos.RO_ESP_DIS==undefined ||  $scope.datos.RO_VIA_PAR_MOM=='' || $scope.datos.RO_VIA_PAR_MOM==undefined || 
      $scope.datos.RO_ENT_CALL=='' || $scope.datos.RO_ENT_CALL==undefined)
      {
          alertify.success('Complete los datos para realizar el registro', 'error');
      }
      else{
                                   $scope.ofici4.push({
                               // RO_TIP_ACT: oficinas.RO_TIP_ACT,
                                RO_MAC_OF: oficinas.RO_MAC_OF,
                                RO_ZONA_OF: oficinas.RO_ZONA_OF,
                                RO_NOM_VIA_OF: oficinas.RO_NOM_VIA_OF,
                                RO_ENT_CALL_OF: oficinas.RO_ENT_CALL_OF,
                                RO_NRO_OF: oficinas.RO_NRO_OF,
                                RO_CAN_VEH: oficinas.RO_CAN_VEH,
                                RO_DIR_GAR: oficinas.RO_DIR_GAR,
                                RO_PAR_NRO: oficinas.RO_PAR_NRO,
                                RO_ESP_DIS: oficinas.RO_ESP_DIS,
                                RO_VIA_PAR_MOM: oficinas.RO_VIA_PAR_MOM,
                                RO_ENT_CALL: oficinas.RO_ENT_CALL,
                                RO_TEL_OF: oficinas.RO_TEL_OF,  
                                latitud: oficinas.latitud,
                           });
                console.log($scope.ofici4,'$scope.ofici4');
       $scope.onlyy=true;
       $scope.botons="new";
       $scope.ofici4 = JSON.stringify($scope.ofici4);    
      var din= new asig_dinamico();
        console.log('entra al for');
        din.consulta='select * from sp_abm_operador_ofis($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_MAC_OF+'$$,$$'+$scope.ofici4+'$$,$$'+$scope.rev3+'$$,1,'+$scope.ofi_id+',$$U$$)';
        console.log(din.consulta,'din.consulta00000000000000000000');
        din.dinamico(function(results){
          results = JSON.parse(results);
          console.log(results,'results');
          $scope.ofici = results.success.data[0].sp_dinamico;
          $scope.ofici = $scope.ofici[0].sp_abm_operador_ofis;
          console.log(results.success.data[0].sp_dinamico,'results MOD OF');
      });   

        oficinas.RO_MAC_OF=""; oficinas.RO_ZONA_OF=""; oficinas.RO_NOM_VIA_OF=""; oficinas.RO_ENT_CALL_OF=""; oficinas.RO_NRO_OF=""; oficinas.RO_CAN_VEH=""; oficinas.RO_DIR_GAR=""; oficinas.RO_PAR_NRO="";
        oficinas.RO_ESP_DIS=""; oficinas.RO_VIA_PAR_MOM=""; oficinas.RO_ENT_CALL="";oficinas.RO_TEL_OF=""; 
      $scope.listar_of();
    }
}
$scope.removeElement_ofi = function(ofi,idx){
    console.log(idx,'idx');
    $scope.rev3='[{"":""}]';
    $scope.ofi_id = ofi.ofi_id;
    console.log($scope.ofi_id);
        var din= new asig_dinamico();
        din.consulta='select * from sp_abm_operador_ofis($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_MAC_OF+'$$,$${}$$,$$'+$scope.rev3+'$$,1,'+$scope.ofi_id+',$$D$$)';
        console.log(din.consulta,'din.consulta00000000000000000000');
        din.dinamico(function(results){
        results = JSON.parse(results);
       });   
      $scope.listar_of(); 
     }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// REGISTRO DE VEHICULO ////////////////////////////////////////////////////

            $scope.listar_veh_nuevo = function(){
                        
                $scope.vehic = [];
                var din= new asig_dinamico();
                    din.consulta='select veh_id, veh_datos, veh_placa, veh_oficina from _mv_ope_vehiculos_datos inner join _mv_ope_operadores_datos on ope_id = veh_ope_id where ope_denominacion LIKE $$%' + $scope.datos.RO_DEN.trim('                         ')+ '%$$ and veh_estado_insp=$$APROBADO$$ and veh_estado_doc=$$APROBADO$$';
                    console.log(din.consulta,'consulta NUEVO');
                    din.dinamico(function(results){
                    results = JSON.parse(results);
                    console.log(results,'results');
                    
                    if(results.success.data[0].sp_dinamico != null){                      
                        $scope.vehic=results.success.data[0].sp_dinamico;
                        console.log('pista nro sam',$scope.vehic);
                        $scope.datos.RO_G_VEHICULO=$scope.vehic;
                        $scope.$apply();
                    }else{
                        $scope.vehic = [];
                    }

                });
            }
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            $scope.listar_veh_sam = function(of){
              $scope.oficinaid = of;
                console.log(of,'offffffffffffffffffffff');
                $scope.vehic = [];

                var din= new asig_dinamico();
                    din.consulta='SELECT * from lst_ope_vehiculos($$'+$scope.datos.RO_NOM_OP+'$$)';
                    console.log(din.consulta,'consulta');
                    din.dinamico(function(results){
                    results = JSON.parse(results);
                    console.log(results,'results');
                    
                    if(results.success.data[0].sp_dinamico != null){                      
                        $scope.vehic=results.success.data[0].sp_dinamico;
                        console.log('pista nro sam',$scope.vehic);                       
                        $scope.datos.RO_G_VEHICULO=$scope.vehic;
                        $scope.$apply();
                    }else{
                        $scope.vehic = [];
                    }

                });
            }

            $scope.listar_veh_sam0= function(of){
              $scope.oficinaid = of;
                console.log(of,'offffffffffffffffffffff');
                $scope.vehic = [];
                var din= new asig_dinamico();
                    din.consulta='select veh_id,veh_datos from _mv_ope_vehiculos_datos where veh_ope_id=$$'+$scope.datos.idOperador+'$$ and veh_oficina=$$'+of+'$$ and veh_estado=$$'+'A'+'$$' ;
                    din.dinamico(function(results){
                    results = JSON.parse(results);
                    console.log(results,'results');
                    
                    if(results.success.data[0].sp_dinamico != null){
                      
                        $scope.vehic=results.success.data[0].sp_dinamico;
                        console.log('pista nro 1',$scope.vehic);
                        $scope.datos.RO_G_VEHICULO=$scope.vehic;
                        $scope.$apply();
                    }else{
                        $scope.vehic = [];
                    }

                });
            }

            $scope.listar_veh= function(of){
              $scope.oficinaid = of;
                console.log(of,'offffffffffffffffffffff');
                $scope.vehic = [];
                var din= new asig_dinamico();
                    //din.consulta='select veh_id,veh_datos, veh_oficina from _mv_ope_vehiculos_datos where veh_ope_id=$$'+$scope.datos.idOperador+'$$ and veh_oficina=$$'+of+'$$ and veh_estado=$$'+'A'+'$$ order By veh_id' ;
                    din.consulta='select veh_id,veh_datos, veh_oficina from _mv_ope_vehiculos_datos where veh_ope_id=$$'+$scope.datos.idOperador+'$$ and veh_oficina=$$'+of+'$$ and veh_estado=$$'+'A'+'$$ and veh_estado_doc!=$$RECHAZADO$$ and veh_estado_insp!=$$RECHAZADO$$ order By veh_id' ;
                    din.dinamico(function(results){
                    results = JSON.parse(results);
                    console.log(results,'results');
                    
                    if(results.success.data[0].sp_dinamico != null){
                      
                        $scope.vehic=results.success.data[0].sp_dinamico;
                        console.log('pista nro 1',$scope.vehic);
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
              //myString = $.trim( myString );
                console.log(veh,'veh');
                $scope.datos.tip_servicio=veh.RO_MOD;
                console.log($scope.datos.tip_servicio,'$scope.datos.tip_servicio  0000');
                $scope.vehic3 = [];
                console.log($scope.datos.sucursal,'$scope.datos.sucursal');
            if( $scope.datos.sucursal=='' || $scope.datos.sucursal==undefined ||  $scope.datos.RO_PLA_V=='' || $scope.datos.RO_PLA_V==undefined || 
            $scope.datos.RO_TIP_V=='' || $scope.datos.RO_TIP_V==undefined ||  $scope.datos.RO_CLA_V=='' || $scope.datos.RO_CLA_V==undefined || 
            $scope.datos.RO_MAR_V=='' || $scope.datos.RO_MAR_V==undefined ||  $scope.datos.RO_MOD_V=='' || $scope.datos.RO_MOD_V==undefined || 
            $scope.datos.RO_COL_V=='' || $scope.datos.RO_COL_V==undefined ||  $scope.datos.RO_PUE_V=='' || $scope.datos.RO_PUE_V==undefined || 
            $scope.datos.RO_RAD_V=='' || $scope.datos.RO_RAD_V==undefined //||  //$scope.datos.RO_CI_P=='' || $scope.datos.RO_CI_P==undefined || 
            //$scope.datos.RO_EXP_P=='' || $scope.datos.RO_EXP_P==undefined ||  $scope.datos.RO_NOM_P=='' || $scope.datos.RO_NOM_P==undefined || 
            //$scope.datos.RO_PAT_P=='' || $scope.datos.RO_PAT_P==undefined ||  $scope.datos.RO_MAT_P=='' || $scope.datos.RO_MAT_P==undefined ||
            //$scope.datos.RO_MAC_P=='' || $scope.datos.RO_MAC_P==undefined ||  $scope.datos.RO_ZONA_P=='' || $scope.datos.RO_ZONA_P==undefined ||
            //$scope.datos.RO_CALL_P=='' || $scope.datos.RO_CALL_P==undefined ||  $scope.datos.RO_NRO_P=='' || $scope.datos.RO_NRO_P==undefined ||
           
           /* $scope.datos.RO_EXP_POO=='' || $scope.datos.RO_EXP_POO==undefined ||  $scope.datos.RO_NOM_POO=='' || $scope.datos.RO_NOM_POO==undefined || 
            $scope.datos.RO_PAT_POO=='' || $scope.datos.RO_PAT_POO==undefined || // $scope.datos.RO_MAT_POO=='' || $scope.datos.RO_MAT_POO==undefined ||
            $scope.datos.RO_MAC_POO=='' || $scope.datos.RO_MAC_POO==undefined ||  $scope.datos.RO_ZONA_POO=='' || $scope.datos.RO_ZONA_POO==undefined ||
            $scope.datos.RO_CALL_POO=='' || $scope.datos.RO_CALL_POO==undefined ||  $scope.datos.RO_NRO_POO=='' || $scope.datos.RO_NRO_POO==undefined ||
            $scope.datos.RO_CI_POO=='' || $scope.datos.RO_CI_POO==undefined*/
            )
            {
                alertify.success('Complete los datos del vehículo para realizar el registro', 'error');
            }
            else
            {
                /************************* color **************************************/
                var col=veh.RO_COL_V;
                console.log('col',col);
                  $scope.miColor = {
                    "color" : "white",
                    "background-color" : col,
                    "font-size" : "60px",
                    "padding" : "10px"
                  }
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

                    for (var i = 0; i < $scope.of.length; i++) {
                      console.log($scope.of.length,'of.length');
                       if($scope.of[i].ofi_datos[0].RO_MAC_OF==veh.sucursal)
                       {
                        $scope.tipo_act=$scope.of[i].ofi_datos[0].RO_TIP_ACT;
                        console.log($scope.tipo_act, '$scope.tipo_act123333333333333333333');
                       }
                    };
                    console.log($scope.tipo_act,'$scope.tipo_act 11111111');
                    console.log('FIIN FORrrrrrrrrrrrrrr');
                    if($scope.tipo_act=='MATRIZ')
                    {
                                $scope.vehic3.push({
                                sucursal: veh.sucursal,    
                                RO_COLOR: $scope.miColor,
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
        din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador+'$$,$$'+$scope.PLACA_I+'$$,$$'+$scope.datos.sucursal+'$$,$$'+z+'$$,1,null,$$'+ $scope.datos.tip_servicio +'$$,$$I$$)';
        console.log(din.consulta,'55555555555555555555555555555555555'); 
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
        var x = results.success.data[0].sp_dinamico;
        console.log("xadiciomnar",x);
        //$scope.vehic = x[0].sp_abm_operador_veh;
        //console.log("pista nro 3",$scope.vehic);
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
        din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador+'$$,$$'+$scope.PLACA_I+'$$,$$'+$scope.datos.sucursal+'$$,$$'+z+'$$,$$'+1+'$$,null,$$'+ $scope.datos.tip_servicio +'$$,$$'+'I'+'$$)';
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
                        $scope.datos.RO_G_VEHICULO='';
                }            
        }
        $scope.listar_veh($scope.datos.sucursal);        
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
            $scope.macrodistritos();
            $scope.distritoZonas(zVeh.RO_MAC_P);
            $scope.distritoZonas(zVeh.RO_MAC_POO);
            $scope.onlyy=true;
            $scope.botonss="upd";  
            $scope.datos.sucursal=veh.sucursal;
            $scope.datos.RO_MOD_V=zVeh.RO_MOD_V;
            $scope.datos.RO_COL_V=zVeh.RO_COL_V;
            $scope.datos.RO_PLA_V=zVeh.RO_PLA_V;
            $scope.datos.RO_CLA_V=zVeh.RO_CLA_V;
            $scope.datos.RO_MAR_V=zVeh.RO_MAR_V ;
            $scope.datos.RO_TIP_V=zVeh.RO_TIP_V;
            $scope.datos.RO_COL_V=zVeh.RO_COL_V;
            $scope.datos.RO_PUE_V=zVeh.RO_PUE_V;
            $scope.datos.RO_ASI_V=zVeh.RO_ASI_V;     
            $scope.datos.RO_RAD_V=zVeh.RO_RAD_V;
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
            $scope.datos.RO_EST_V=zVeh.RO_EST_V;
            /*$scope.macrodistritos();
            $scope.distritoZonas(zVeh.RO_MAC_P);
            $scope.distritoZonas(zVeh.RO_MAC_POO);*/
            $scope.macrodistritos();
            $scope.distritoZonas(zVeh.RO_MAC_P);
            console.log(index, 'datos index');
            $scope.indexx = index;
            console.log($scope.zVeh,'$scope.zVeh');
            //console.log($scope.zVeh.RO_MAR_V,'$scope.RO_MAR_V');
        }
    $scope.modificarVehiculos = function(vehiculo){
      $scope.vehic4=[];
            console.log(vehiculo, 'datos vehiculo');
            if( $scope.datos.sucursal=='' || $scope.datos.sucursal==undefined ||  $scope.datos.RO_PLA_V=='' || $scope.datos.RO_PLA_V==undefined || 
            $scope.datos.RO_TIP_V=='' || $scope.datos.RO_TIP_V==undefined ||  $scope.datos.RO_CLA_V=='' || $scope.datos.RO_CLA_V==undefined || 
            $scope.datos.RO_MAR_V=='' || $scope.datos.RO_MAR_V==undefined ||  $scope.datos.RO_MOD_V=='' || $scope.datos.RO_MOD_V==undefined || 
            $scope.datos.RO_COL_V=='' || $scope.datos.RO_COL_V==undefined ||  $scope.datos.RO_PUE_V=='' || $scope.datos.RO_PUE_V==undefined || 
            $scope.datos.RO_RAD_V=='' || $scope.datos.RO_RAD_V==undefined //||  $scope.datos.RO_CI_P=='' || $scope.datos.RO_CI_P==undefined || 
            )
            {
                alertify.success('Complete los datos para modificar el registro', 'error');
            }
            else
            {
            var col=vehiculo.RO_COL_V;
                console.log('col',col);
                  $scope.miColor = {
                    "color" : "white",
                    "background-color" : col,
                    "font-size" : "60px",
                    "padding" : "10px"
                  }

         var of = JSON.stringify( $scope.ofici, function( key, value ) {
          if( key === "$$hashKey" ) {
              return undefined;
          }
          return value;
      });
            $scope.of=JSON.parse(of);
              for (var i = 0; i < $scope.of.length; i++) {
                      console.log($scope.of.length,'of.length');
                       if($scope.of[i].ofi_datos[0].RO_MAC_OF==vehiculo.sucursal)
                       {
                        $scope.tipo_actmod=$scope.of[i].ofi_datos[0].RO_TIP_ACT;
                        console.log($scope.tipo_actmod, '$scope.tipo_act123333333333333333333');
                       }
                    };
            if($scope.tipo_actmod=='MATRIZ')  
            {              
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
                                RO_CI_P: vehiculo.RO_CI_P,
                                RO_EXP_P: vehiculo.RO_EXP_P,
                                RO_NOM_P: vehiculo.RO_NOM_P,
                                RO_PAT_P: vehiculo.RO_PAT_P,
                                RO_MAT_P: vehiculo.RO_MAT_P,
                                RO_MAC_P: vehiculo.RO_MAC_P,
                                RO_ZONA_P: vehiculo.RO_ZONA_P,
                                RO_CALL_P: vehiculo.RO_CALL_P,
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
                                RO_ASI_V: vehiculo.RO_ASI_V,
                           });

                console.log($scope.vehic4,'$scope.ofici4');
                $scope.vehic4 = JSON.stringify($scope.vehic4); 
        var din= new asig_dinamico();
       din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador+'$$,$$'+vehiculo.RO_PLA_V+'$$,$$'+$scope.datos.sucursal+'$$,$$'+$scope.vehic4+'$$,1,$$'+$scope.veh_id+'$$,$$'+ $scope.datos.RO_MOD +'$$,$$'+'U'+'$$)';
        console.log(din.consulta,'55555555555555555555555555555555555');
        din.dinamico(function(results){
        results = JSON.parse(results);
          $scope.vehic = results.success.data[0].sp_dinamico;
          $scope.vehic = $scope.vehic[0].sp_abm_operador_veh;
          console.log(results.success.data[0].sp_dinamico,'results');
          alertify.success('Registro modificado');
      });  
                  vehiculo.RO_PLA_V=""; vehiculo.RO_CLA_V=""; vehiculo.RO_MAR_V=""; vehiculo.RO_TIP_V="";
            vehiculo.RO_MOD_V=""; vehiculo.RO_COL_V=""; vehiculo.RO_PUE_V=""; vehiculo.RO_RAD_V="";
            vehiculo.RO_CI_P=""; vehiculo.RO_EXP_P=""; vehiculo.RO_NOM_P="";vehiculo.RO_PAT_P="";
            vehiculo.RO_MAT_P="";vehiculo.RO_MAC_P=""; vehiculo.RO_ZONA_P=""; vehiculo.RO_CALL_P="";vehiculo.RO_NRO_P="";
            vehiculo.RO_CI_POO=""; vehiculo.RO_EXP_POO=""; vehiculo.RO_NOM_POO="";vehiculo.RO_PAT_POO="";
            vehiculo.RO_MAT_POO=""; vehiculo.RO_MAC_POO=""; vehiculo.RO_ZONA_POO=""; vehiculo.RO_CALL_POO="";
            vehiculo.RO_NRO_POO="";vehiculo.RO_CEL_POO="";vehiculo.RO_TEL_POO=""; vehiculo.RO_ASI_V="";
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
                                RO_CI_P: vehiculo.RO_CI_POO,
                                RO_EXP_P: vehiculo.RO_EXP_POO,
                                RO_NOM_P: vehiculo.RO_NOM_POO,
                                RO_PAT_P: vehiculo.RO_PAT_POO,
                                RO_MAT_P: vehiculo.RO_MAT_POO,
                                RO_MAC_P: vehiculo.RO_MAC_POO,
                                RO_ZONA_P: vehiculo.RO_ZONA_POO,
                                RO_CALL_P: vehiculo.RO_NOM_VIA_POO,
                                RO_NRO_P: vehiculo.RO_NRO_POO,
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
                                RO_ASI_V: vehiculo.RO_ASI_V, 
                           });
        $scope.vehic4 = JSON.stringify($scope.vehic4); 
        var din= new asig_dinamico();
        din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador+'$$,$$'+vehiculo.RO_PLA_V+'$$,$$'+$scope.datos.sucursal+'$$,$$'+$scope.vehic4+'$$,1,$$'+$scope.veh_id+'$$,$$'+'U'+'$$)';
        console.log(din.consulta,'55555555555555555555555555555555555');
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
          $scope.vehic = results.success.data[0].sp_dinamico;
          $scope.vehic = $scope.vehic[0].sp_abm_operador_veh;
          console.log(results.success.data[0].sp_dinamico,'results');
          alertify.success('Registro modificado');
      });  
            vehiculo.RO_PLA_V=""; vehiculo.RO_CLA_V=""; vehiculo.RO_MAR_V=""; vehiculo.RO_TIP_V="";
            vehiculo.RO_MOD_V=""; vehiculo.RO_COL_V=""; vehiculo.RO_PUE_V=""; vehiculo.RO_RAD_V="";
            vehiculo.RO_CI_P=""; vehiculo.RO_EXP_P=""; vehiculo.RO_NOM_P="";vehiculo.RO_PAT_P="";
            vehiculo.RO_MAT_P="";vehiculo.RO_MAC_P=""; vehiculo.RO_ZONA_P=""; vehiculo.RO_CALL_P="";vehiculo.RO_NRO_P="";
            vehiculo.RO_CI_POO=""; vehiculo.RO_EXP_POO=""; vehiculo.RO_NOM_POO="";vehiculo.RO_PAT_POO="";
            vehiculo.RO_MAT_POO=""; vehiculo.RO_MAC_POO=""; vehiculo.RO_ZONA_POO=""; vehiculo.RO_CALL_POO="";
            vehiculo.RO_NRO_POO="";vehiculoNONO.RO_CEL_POO="";vehiculo.RO_TEL_POO=""; vehiculo.RO_ASI_V="";
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
            $scope.listar_veh_nuevo();
           }

        $scope.removeElement_Veh = function(veh,idx){
           // $scope.vehic.splice(idx,1);
            var din= new asig_dinamico();
            $scope.veh_id=veh.veh_id;
             var ofis= veh.veh_datos[0].sucursal;
        //din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.sucursal+'$$,$$['+z[i]+']$$,$$'+1+'$$)';   $scope.veh_id
        din.consulta='select * from sp_abm_operador_veh($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_PLA_V+'$$,$$'+ofis+'$$,$${}$$,1,$$'+$scope.veh_id+'$$,$$D$$)';
        console.log(din.consulta,'55555555555555555555555555555555555');
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
          });
        //$scope.listar_veh(ofis);
        $scope.listar_veh();
        };



            $scope.listar_veh_pl = function(of){
              $scope.oficinaid = of;
                $scope.vehic = [];
                var din= new asig_dinamico();
                    din.consulta='select veh_placa where veh_ope_id=$$'+$scope.datos.idOperador+'$$ and veh_oficina=$$'+of+'$$ and veh_estado=$$'+'A'+'$$' ;
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


            $scope.listar_Cond_nuevo = function(){                        
                $scope.conduc = [];
                var din= new asig_dinamico();
                    din.consulta='select cond_id,cond_datos from _mv_ope_conductores_datos inner join _mv_ope_operadores_datos on ope_id = cond_ope_id where ope_denominacion LIKE $$%' + $scope.datos.RO_DEN.trim('                         ')+ '%$$';
                    console.log(din.consulta,'consulta NUEVO');
                    din.dinamico(function(results){
                    results = JSON.parse(results);
                    console.log(results,'results');
                      if(results.success.data[0].sp_dinamico != null){
                        $scope.conduc=results.success.data[0].sp_dinamico;
                        console.log($scope.conduc,'$scope.conduc');
                        $scope.datos.RO_G_CONDUCTORES=$scope.conduc; 
                        $scope.$apply();  
                    }else{
                        $scope.conduc = [];
                    }

                });
            }
 
              $scope.listar_Cond_sam = function(of){
                $scope.conduc = [];
                //var  nombre_opr = ' TRANS ESTELAR';
                var din= new asig_dinamico();
                //din.consulta='SELECT cond_id, cond_tipo_conductor, opcond_cond_id,opr_nombre,dtspsl_ci,dtspsl_exp_id, dtspsl_nombres, dtspsl_paterno, dtspsl_materno, dtspsl_direccion, dtspsl_zona FROM _mv_conductores inner join _bp_datos_personales on dtspsl_id= cond_persona_id INNER JOIN _mv_operadores_conductores ON opcond_cond_id = cond_id and opcond_estado=$$A$$ INNER JOIN _mv_operadores on opr_id = opcond_opr_id where opr_nombre=$$'+$scope.datos.RO_NOM_OP+'$$ and cond_estado=$$A$$';
                din.consulta='SELECT cond_id, cond_tipo_conductor, opcond_cond_id,opr_nombre,dtspsl_ci,dtspsl_exp_id, dtspsl_nombres, dtspsl_paterno, dtspsl_materno, dtspsl_direccion, dtspsl_zona FROM _mv_conductores inner join _bp_datos_personales on dtspsl_id= cond_persona_id INNER JOIN _mv_operadores_conductores ON opcond_cond_id = cond_id and opcond_estado=$$A$$ INNER JOIN _mv_operadores on opr_id = opcond_opr_id where cond_estado=$$A$$';
                    console.log(din.consulta,'consulta cond sam ');               
                    din.dinamico(function(results){
                    results = JSON.parse(results);
                    console.log(results,'results1');                
                   if(results.success.data[0].sp_dinamico != null){
                        $scope.conduc=results.success.data[0].sp_dinamico;
                        console.log($scope.conduc,'$scope.conduc');
                        $scope.datos.RO_G_CONDUCTORES=$scope.conduc; 
                        $scope.$apply();                       
                    }else{
                        $scope.conduc = [];
                    }

                });
            }

            $scope.listar_Cond = function(of){
                console.log(of,'offffffffffffffffffffff');
                $scope.conduc = [];
                var din= new asig_dinamico();
             din.consulta='select cond_id,cond_datos, cond_oficina from _mv_ope_conductores_datos where cond_ope_id=$$'+$scope.datos.idOperador+'$$ and cond_oficina=$$'+of+'$$ and cond_estado=$$A$$ and cond_estado_doc!=$$RECHAZADO$$';
                console.log(din.consulta,'consulta cond');               
                    din.dinamico(function(results){
                    results = JSON.parse(results);
                    console.log(results,'results1');                
                   if(results.success.data[0].sp_dinamico != null){
                        $scope.conduc=results.success.data[0].sp_dinamico;
                        console.log($scope.conduc,'$scope.conduc');
                        $scope.datos.RO_G_CONDUCTORES=$scope.conduc; 
                        $scope.$apply();                       
                    }else{
                        $scope.conduc = [];
                    }

                });
            }
////////////////////////////////////////Datos conductores/////////////////////////////////////////////////////////////////////////////

            $scope.guardarDatosConductores = function(cond){
              cond.longitud=-16.495635; cond.latitud=-68.133543;
              $scope.conduc3=[];
                console.log(cond,'cond');
                 if(              
            $scope.datos.RO_EXP_C=='' || $scope.datos.RO_EXP_C==undefined ||  $scope.datos.RO_NOM_C=='' || $scope.datos.RO_NOM_C==undefined || 
            $scope.datos.RO_PAT_C=='' || $scope.datos.RO_PAT_C==undefined ||  //$scope.datos.RO_MAT_C=='' || $scope.datos.RO_MAT_C==undefined ||
            $scope.datos.RO_MAC_C=='' || $scope.datos.RO_MAC_C==undefined ||  $scope.datos.RO_ZONA_C=='' || $scope.datos.RO_ZONA_C==undefined ||
            $scope.datos.RO_CALL_C=='' || $scope.datos.RO_CALL_C==undefined ||  $scope.datos.RO_NRO_C=='' || $scope.datos.RO_NRO_C==undefined ||

            $scope.datos.RO_OFI_CON=='' || $scope.datos.RO_OFI_CON==undefined ||  $scope.datos.RO_CAT_C=='' || $scope.datos.RO_CAT_C==undefined || 
            $scope.datos.RO_TIP_C=='' || $scope.datos.RO_TIP_C==undefined ||  $scope.datos.longitud=='' || $scope.datos.longitud==undefined ||
             $scope.datos.PLACA=='' || $scope.datos.PLACA==undefined || $scope.datos.latitud=='' || $scope.datos.latitud == undefined )
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
                               // RO_EST_C: 'EN PROCESO',
                                longitud: cond.longitud,
                                latitud: cond.latitud,
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
        din.consulta='select * from sp_abm_operador_cond($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_OFI_CON+'$$,$$'+$scope.ci_conductor+'$$,$$'+z+'$$,null,1,$$I$$)';
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results');
        $scope.conduc = results.success.data[0].sp_dinamico;
        console.log($scope.conduc,'adicion77777');
        $scope.conduc = $scope.conduc[0].sp_abm_operador_cond;
        console.log($scope.conduc,'adicion33333');
        console.log(results.success.data[0].sp_dinamico,'results');

                });
                      
            cond.RO_CI_C="";cond.RO_EXP_C=""; cond.RO_PAT_C=""; cond.RO_MAT_C=""; cond.RO_NOM_C=""; cond.RO_OFI_CON="";
            cond.PLACA=""; cond.RO_CORR_C=""; cond.RO_TEL_C=""; cond.RO_CEL_C=""; cond.RO_MAC_C="";
            cond.RO_ZONA_C=""; cond.RO_CALL_C=""; cond.RO_NRO_C="";cond.RO_CAT_C="";cond.RO_TIP_C=""; cond.longitud=-16.495635; cond.latitud=-68.133543;
                 if(typeof(google) != "undefined"){
        google.maps.visualRefresh = true;
    }
    $scope.initMap(); 
        //lat: -16.495635,
       // lng: -68.133543

        }
           
        console.log($scope.conduc,'adicion88888');
        $scope.listar_Cond(cond.RO_OFI_CON);
        cond.longitud=-16.495635; cond.latitud=-68.133543;  
        //}
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
            console.log(zCond, 'z   ');
            zCond=zCond.cond_datos[0];
            console.log(zCond, 'z ultimo');
            $scope.macrodistritos();
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
            $scope.datos.RO_ZONA_C=zCond.RO_ZONA_C;
            $scope.datos.RO_CALL_C=zCond.RO_CALL_C;
            $scope.datos.RO_NRO_C=zCond.RO_NRO_C;
            $scope.datos.RO_CAT_C=zCond.RO_CAT_C;
            $scope.datos.RO_TIP_C=zCond.RO_TIP_C;
            $scope.datos.latitud=zCond.latitud;
            $scope.datos.longitud=zCond.longitud;
            $scope.datos.RO_OFI_CON=zCond.RO_OFI_CON;
            console.log(index, 'datos index');
            $scope.indexx = index;
            console.log($scope.zCond,'$scope.zCond');
            //console.log($scope.zCond.RO_NOM_C,'$scope.RO_NOM_C');
        }

    $scope.modificarConductores = function(conductores){
            console.log(conductores, 'datos conductores ');
            $scope.conduc4=[];
            if($scope.datos.RO_EXP_C=='' || $scope.datos.RO_EXP_C==undefined ||  $scope.datos.RO_NOM_C=='' || $scope.datos.RO_NOM_C==undefined || 
            $scope.datos.RO_PAT_C=='' || $scope.datos.RO_PAT_C==undefined || // $scope.datos.RO_MAT_C=='' || $scope.datos.RO_MAT_C==undefined ||
            $scope.datos.RO_MAC_C=='' || $scope.datos.RO_MAC_C==undefined ||  $scope.datos.RO_ZONA_C=='' || $scope.datos.RO_ZONA_C==undefined ||
            $scope.datos.RO_CALL_C=='' || $scope.datos.RO_CALL_C==undefined ||  $scope.datos.RO_NRO_C=='' || $scope.datos.RO_NRO_C==undefined ||
            $scope.datos.RO_CI_C=='' || $scope.datos.RO_CI_C==undefined ||  $scope.datos.RO_CAT_C=='' || $scope.datos.RO_CAT_C==undefined ||
            $scope.datos.RO_TIP_C=='' || $scope.datos.RO_TIP_C==undefined || 
             $scope.datos.PLACA=='' || $scope.datos.PLACA==undefined)
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
            })
            $scope.of=JSON.parse(of);
                    $scope.conduc4.push({
                          //RO_OFI_CON: conductores.RO_OFI_CON,
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
                          latitud: conductores.latitud,
                          longitud: conductores.longitud,
                         // RO_EST_C: 'APROBADO',
                          RO_FOT_C: '',
                      });
                console.log($scope.conduc4,'$scope.conduc4');
                console.log($scope.conduc4,'123456123456123111111111111');
               $scope.conduc4 = JSON.stringify($scope.conduc4); 
       console.log($scope.datos.RO_OFI_CON,'$scope.datos.sucursal0000000');
        var din= new asig_dinamico();
       din.consulta='select * from sp_abm_operador_cond($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_OFI_CON+'$$,$$'+ conductores.RO_CI_C +'$$,$$'+$scope.conduc4+'$$,$$'+$scope.cond_id+'$$,1,$$U$$)';
       console.log(din.consulta,'55555555555555555555555555555555555');
        din.dinamico(function(results){
        results = JSON.parse(results);
          $scope.conduc = results.success.data[0].sp_dinamico;
          $scope.conduc = $scope.conduc[0].sp_abm_operador_cond;
          console.log(results.success.data[0].sp_dinamico,'results');
          alertify.success('Registro modificado');
 
           });
            conductores.RO_EXP_C=""; conductores.RO_PAT_C=""; conductores.RO_MAT_C=""; conductores.RO_NOM_C="";
            conductores.RO_CORR_C=""; conductores.RO_TEL_C=""; conductores.RO_CEL_C=""; conductores.RO_MAC_C="";
            conductores.RO_ZONA_C=""; conductores.RO_CALL_C=""; conductores.RO_NRO_C=""; conductores.RO_CAT_C="";
            conductores.RO_TIP_C=""; conductores.PLACA=""; conductores.RO_CI_C=""; conductores.RO_OFI_CON="";
        $scope.onlyy=true;
        $scope.botonc="new";   
            
        }
        $scope.listar_Cond_nuevo();
        //$scope.listar_Cond(conductores.RO_OFI_CON);  
    }
         $scope.removeElement_Cond = function(cond,idx){
              console.log(cond,'cond delete');
              console.log(cond.cond_datos,'consddddddddddddddddd');
              var ci_cond=cond.cond_datos[0].RO_CI_C;
            var din= new asig_dinamico();
            $scope.cond_id=cond.cond_id;
            var ofis= cond.cond_datos[0].RO_OFI_CON;
        din.consulta='select * from sp_abm_operador_cond($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_OFI_CON+'$$,$$'+ ci_cond +'$$,$${}$$,$$'+$scope.cond_id+'$$,1,$$D$$)';
        console.log(din.consulta,'55555555555555555555555555555555555');
        din.dinamico(function(results){
        results = JSON.parse(results);
        console.log(results,'results123');
        alertify.success('Registro eliminado');
          });
        $scope.listar_Cond_nuevo();
        //$scope.listar_Cond(ofis);
        };

    /*REQUISITOS2018*/
    $scope.validarRequisitosForm = function(){
      //INICIAR DOCUMENTOS DE IDENTIDAD
      angular.forEach($scope.docArray, function(value, key) {
        //VALIDANDO EL DOCUMENTO DE IDENTIDAD - IGOB
        if(value.idnro == 1){
          document.getElementById('txt_f01_upload'+value.resid).value = 'Cedula de identidad (Anverso).jpg';
          var sDirTramite = sessionService.get('IDTRAMITE');
          var scianverso  = $scope.datos.FILE_FOTOCOPIA_CI;
          if(scianverso == '' || scianverso == 'undefined' || scianverso == undefined){
            document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
          }
          else{
            document.getElementById('txt_f01_upload'+value.resid).value = scianverso;
          }
          var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + scianverso + "?app_name=todoangular";
          $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
        }
        if(value.idnro == 2){
          document.getElementById('txt_f01_upload'+value.resid).value = 'Cedula de identidad (Reverso).jpg';
          var sDirTramite = sessionService.get('IDTRAMITE');
          var scianversor  = $scope.datos.FILE_FOTOCOPIA_CI_R;
          if(scianversor == '' || scianversor == 'undefined' || scianversor == undefined){
            document.getElementById('txt_f01_upload'+value.resid).value = 'Edite su informacion de su cuenta, para subir este requisito';
          }else{
            document.getElementById('txt_f01_upload'+value.resid).value = scianversor;
          }
          var uploadUrl = CONFIG.APIURL + "/files/" + "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/" + scianversor + "?app_name=todoangular";
          $("#href_f01_upload"+value.resid).attr({'href': uploadUrl});
        }
        //VALIDANDO LA VIAE - EN CASO DE SER REQUERIDO
        if(value.idnro == 3 || value.idnro == 4){
            var sviae  = $scope.datos.rdTipoTramite1;
            if(sviae  == 'RENOVACION'){//sin viae
                $scope.docArray[key].estado = false;
            }else{
                $scope.docArray[key].estado = true;
            }
        }
        //VALIDANDO LA SUPERFICIE DE LA ACTIVIDAD ECONOMNICA
        var ssuperficie = $scope.datos.f01_sup;
        if(ssuperficie){
          if(value.idnro == 5){
              if(ssuperficie <= 100){
                $scope.docArray[key].estado = false;
              }else{
                $scope.docArray[key].estado = true;
              }
          }    
        }
      });
      try{
        console.log("error en adjuntos");//$scope.$apply();
      }catch(e){}
    }
        $scope.actulizarTipoLetrero = function(){
        var idcarac="";
        var disttipletrero  = $scope.publi.INT_TIPO_LETRE;
        if($scope.TipoLetrero){
            angular.forEach($scope.TipoLetrero, function(value, key) {
                if(value.p_descripcion == disttipletrero){
                    idcarac  =   value.p_idtipoletrero;
                }
            });
        }
        $scope.publi.idcarac  =  idcarac;
        console.log($scope.TipoLetrero,'$scope.TipoLetrero');
        console.log($scope.publi.INT_TIPO_LETRE,'$scope.publi.INT_TIPO_LETRE');
    };

    $scope.publi=[];
    $scope.lssubcategoria = function(){
        $scope.publi.INT_CATE="II Fija";
        $scope.publi.idcate=6;
        $scope.TipoLetrero = [
        {"p_idtipoletrero" : "51", "p_descripcion": "ADOSADA SOBRESALIENTE"},
        {"p_idtipoletrero" : "39", "p_descripcion": "ADOSADA"},
        {"p_idtipoletrero" : "41", "p_descripcion": "MICROPERFORADA - AUTOADHESIVA"},
        {"p_idtipoletrero" : "40", "p_descripcion": "PINTADA"}];
        console.log($scope.TipoLetrero,'$scope.TipoLetrero  ****');
    };
      $scope.ltCaracteristica = function(idlee){
        console.log(idlee,'idlee');
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
        {"p_idcaracteristica" : "1", "p_caracteristica": "Simple"}
        ];}
    };

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

     $scope.lsCaracteristica = function(){
        $scope.lsTipovia = {};
        try{
            var parametros = new lstCaracteristica();
            parametros.clasificador = 9;
            parametros.lst_Caracteristica(function(res){
                x = JSON.parse(res);
                response = x.success.data;
                if(response.length > 0){
                    $scope.lsTipovia = response;
                }else{
                    $scope.msg = "Error !!";
                }
            });
        }catch (error){
            //$scope.errors["error_rol"] = error;
            console.log("eeror en caracteristica");
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



/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// REGISTRO VIAE  ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.cambioToggle1 = function(dato){
      console.log('entra radio, ', dato);
        $scope.publicidad = '';
        $scope.publicidad_grilla = '';
        $scope.datos.publicidad ='';
       if ( dato == "NUEVO") {
            $scope.licenciaToogle4 = true;
        } else {
            $scope.licenciaToogle4 = false;
        }
    }

             $scope.listar_viae = function(){ 
                $scope.publicid2=[];
                $scope.datos.publicidad=[];
                var din= new asig_dinamico();
                    din.consulta='select ofi_viae from _mv_ope_oficinas_datos where ofi_ope_id=$$'+$scope.datos.idOperador+'$$ and ofi_estado=$$A$$ order by ofi_id';
                    console.log(din.consulta,'din.consulta viae');
                    din.dinamico(function(results){
                    results = JSON.parse(results);
                    console.log(results,'results of');                    
                    if(results.success.data[0].sp_dinamico != null){                      
                        $scope.publicid2=results.success.data[0].sp_dinamico;
                        console.log('pista nro 2 viae',$scope.publicid2);
                        console.log($scope.publicid2,'$scope.publicid2.length');
                        $scope.datos.publicidad = JSON.parse($scope.publicid2[0].ofi_viae);
                        console.log($scope.datos.publicidad,'asdsadsa');                        /*
                       for (var i = 0; i < $scope.publicid2.length; i++) {                         
                        console.log('entra');
                        $scope.publicid2[i].ofi_viae=JSON.parse($scope.publicid2[i].ofi_viae);
                        console.log($scope.publicid2[i].ofi_viae[0],'$scope.publicid 123');                       
                      
                      if($scope.publicid2[0].ofi_viae=='' || $scope.publicid2[0].ofi_viae==null){
                        $scope.datos.publicidad=[];
                      }
                      else{
                          $scope.datos.publicidad=$scope.publicid2[i].ofi_viae[0];
                          console.log($scope.datos.publicidad,'$scope.datos.publicid 0000');
                        }  
                       };                       */
                         $scope.datos.RO_G_VIAE=$scope.datos.publicidad;
                         console.log($scope.datos.RO_G_VIAE,'$scope.datos.RO_VIAE');
                       
                        $scope.$apply();
                    }else{
                        $scope.datos.publicidad = [];
                    }
                });
              }



$scope.publi = {};
$scope.publicid2 = [];
//////////////////////////////////**********************VIAE*****************//////////////////////////////////////////////////////////////////
          $scope.publicid = {}; 
 $scope.guardarpublicidad = function(public2){
  console.log(public2,'public');
        if (public2.INT_SUPERFICIE) {
          console.log('entra if');
            if(public2.INT_NRO_CARA =='' || public2.INT_NRO_CARA == null || public2.INT_CARA =='' || public2.INT_CARA == null ||
            public2.INT_CATE =='' || public2.INT_CATE == null || public2.INT_TIPO_LETRE =='' || public2.INT_TIPO_LETRE == null ||
            public2.INT_DESC =='' || public2.INT_DESC == null || public2.INT_SUPERFICIE =='' || public2.INT_SUPERFICIE == null ) {
              alertify.success('Llene lo campos requeridos para la VIAE  ');
            } else {
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
                        console.log($scope.publicid,'$scope.publicid');
                        $scope.publi=[];
                        $scope.publi.INT_CATE="II Fija";
                        $scope.publi.idcate=6;
                        $scope.lssubcategoria();
                        $scope.datos.publicidad = $scope.publicid;
                        $scope.Plubli_Grilla($scope.publicid);
                        console.log('entra');
                    } else {
                        alertify.success('La superficie de la VIAE excede los estadares permitidos');
                    }
                } else {
                    alertify.success('Llego al limite de registro de Publicidad');
                }
            }
        } else {
          console.log('entra else');
          console.log($scope.publicid);
            if(public2.INT_NRO_CARA =='' || public2.INT_NRO_CARA == null || public2.INT_CARA =='' || public2.INT_CARA == null ||
            public2.INT_CATE =='' || public2.INT_CATE == null || public2.INT_TIPO_LETRE =='' || public2.INT_TIPO_LETRE == null ||
            public2.INT_DESC =='' || public2.INT_DESC == null || public2.INT_ALTO =='' || public2.INT_ALTO == null || public2.INT_ANCHO =='' || public2.INT_ANCHO == null ) {
              console.log('entra if');
                alertify.success('Llene lo campos requeridos para la VIAE  ');
            } else {
              console.log('entra 2');
                var id=0;
                //$scope.publicid = [];
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
                  //      $scope.id = id;
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
                        console.log($scope.publicid,'$scope.publicid');

                        $scope.publi=[];
                        $scope.publi.INT_CATE="II Fija";
                        $scope.publi.idcate=6;
                        $scope.lssubcategoria();
                        $scope.datos.publicidad = $scope.publicid;
                        console.log($scope.datos.publicidad);
                       // $scope.Plubli_Grilla($scope.publicid);
                    } else {
                        alertify.success('La superficie de la VIAE excede los estadares permitidos', 'error');
                    }
                } else {
                    alertify.success('Llego al limite de registro de Publicidad', 'error'); 
                }
            }
        }
    }

    $scope.guardaVIAE = function(publicid){
      console.log(publicid,'publicid publicid');
          var z = JSON.stringify( publicid, function( key, value ) {
          if( key === "$$hashKey" ) {
              return undefined;
          }
          return value;
      });
            for (var i = 0; i < $scope.ofici.length; i++) { 
             var of= $scope.ofici[i].ofi_datos[0].RO_MAC_OF;
             console.log($scope.ofici[i].ofi_datos[0].RO_MAC_OF,'ofi viae');                
             var ofi_id2=$scope.ofici[i].ofi_id;
             var din= new asig_dinamico();
            $scope.rev3='[{"":""}]';
            din.consulta='select * from sp_abm_operador_ofis($$'+$scope.datos.idOperador+'$$,$$'+$scope.datos.RO_MAC_OF+'$$,$$'+z+'$$,$$'+$scope.rev3+'$$,1,'+ofi_id2+',$$U_VIAE$$)';
            console.log(din.consulta,'din.consulta');
            din.dinamico(function(results){
                results = JSON.parse(results);
                $scope.publicid = results.success.data[0].sp_dinamico;
               $scope.publicid = $scope.publicid[0].sp_abm_operador_ofis;
               console.log('$scope.publicid',$scope.publicid);
                console.log(results.success.data[0].sp_dinamico,'results');
                  });
                 //$scope.listar_viae();
               
            };
    }

    $scope.Plubli_Grilla = function(dato){
        $scope.publi_grilla = [];
        var encabezado = [];
        var indice = 1;
        encabezado[0] = {"tipo": "GRD","campos": "nroElem|INT_TIPO_LETRE|INT_CARA|FECHAINICIO|INT_DESC|INT_ALTO|INT_ANCHO|INT_SUP|INT_CATE|","titulos": "ID|Tipo de Letrero|Caracteristica|Fecha Inicio|Descripción|Alto|Ancho|Superficie|Categoria","impresiones": "true|true|true|true|true|true|true|true|false"};

        var nroElem = 0;
        var j=0;
        for(j=0; j<dato.length;j++) {
            $scope.publi_grilla.push({
                nroElem: j+1,
                FECHAINICIO: dato[j].FECHAINICIO,
                INT_TIPO_LETRE: dato[j].INT_TIPO_LETRE,
                INT_CARA: dato[j].INT_CARA,
                INT_DESC: dato[j].INT_DESC,
                INT_ALTO: dato[j].INT_ALTO,
                INT_ANCHO: dato[j].INT_ANCHO,
                INT_SUP: dato[j].INT_SUP,
                INT_CATE: dato[j].INT_CATE
            });
        }
        var jsonString = '['+ (encabezado) +']';

        angular.forEach($scope.publi_grilla, function(value, key) {
                encabezado[indice] = value;
                indice = indice + 1;
            });
        $scope.datos.publicidad_grilla=encabezado;
    }

    $scope.onlyy=false;
    $scope.botonn="new";

    $scope.modificarPlubli = function(dato){
        console.log(dato);
        $scope.onlyy=true;
        $scope.botonn="upd";
        $scope.publi=dato;
        $scope.ltCaracteristica(dato.INT_TIPO_LETRE);
    }

    $scope.modificarpublicidad = function(dato){
      console.log(dato,'datos publi');
      console.log($scope.publi);
      dato.INT_ALTO = parseFloat(dato.INT_ALTO).toFixed(2);
      dato.INT_ANCHO= parseFloat(dato.INT_ANCHO).toFixed(2);
      console.log(dato.INT_ANCHO,'dato.INT_ANCHO 1111');
      total = parseFloat(dato.INT_ALTO) * parseFloat(dato.INT_ANCHO);
      console.log(total,'total');
      if (total < 700) {
        $scope.publi.INT_SUP = total;
        console.log($scope.datos.INT_SUPERFICIE,'dato.INT_SUPERFICIE 123');
        }
        $scope.onlyy=true;
        $scope.botonn="new";
        delete $scope.edit[dato.id];
        $scope.publi=[];
        $scope.lssubcategoria();
    }

    $scope.NumericoAlto = function(alto){
        if(alto){
            alto = alto.replace(/[^,.0-9]+/g, "");
            alto = alto.replace(/,/g, ".");
            $scope.publi.INT_ALTO = alto;
        }
    }

    $scope.NumericoAncho = function(ancho){
        if(ancho){
            ancho = ancho.replace(/[^,.0-9]+/g, "");
            ancho = ancho.replace(/,/g, ".");
            $scope.publi.INT_ANCHO = ancho;
        }
    }

    $scope.verSuperficie = function(p){
        if (p==false || typeof(p)=='undefined'){
            $scope.publi.INT_ALTO = 0;
            $scope.publi.INT_ANCHO = 0;
            $scope.especial="mostrar";
        } else {
            $scope.especial=null;
        }
    }

    $scope.eliminarPubli = function(dato){
        $scope.publicid.splice( $scope.publicid.indexOf(dato), 1 );
        $scope.id = $scope.id - 1;
    }


    // detalles del elemento publicidad
    //$scope.caras = [];
    $scope.detalle = [];
    $scope.edit = {};
    $scope.addUser = function(user){
        //if($scope.datos.caras.length>0){
        if($scope.carass =='' || $scope.carass == null || $scope.carass =="undefined" ){
            $scope.carass = [];
        }else{
          
        }
        $scope.carass.push({
            //id      : user.id,
            desc    : user.desc,
            sup     : user.sup
        })
        $scope.user = "";
        $scope.detalle = [];
        //$scope.actulizarCaras();
    };

    $scope.deleteUser = function(user){
        $scope.carass.splice( $scope.carass.indexOf(user), 1 );
    };
    $scope.editUser = function(user){
        delete $scope.edit[user.id];
    };

    $scope.actulizarCaras= function () {
        $scope.publi.caras = $scope.carass;
    };

    $scope.toggleMin = function() {
        $scope.minDate = new Date("2011-09-24".replace(/-/g, '\/')); // $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.changeHandler = function () {
        var d = new Date($scope.publi.FECHAINICIO);
        var mes=d.getUTCMonth()+1;
        if(mes.toString().length==1)
            mes='0'+mes;
        $scope.publi.FECHAINICIO= "01/"+mes+"/"+d.getFullYear();
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
                        //$scope.publicid = $scope.datos.publicidad;
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
          console.log('==================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',$scope.datos);
             console.log(datos,'guardar_tramite datos');
     if($scope.datos.RO_TIP_SOL=='' || $scope.datos.RO_TIP_SOL==undefined)
           { 
                alertify.success('Complete el dato: Tipo de solicitud', 'error');
            }
     else{             
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
    } 
    $scope.InsertarDocumento = function(urlData){
        var sDocSistema     =   "PLATAFORMA INSTITUCIONAL";
        var sDocProceso     =   "DECLARACIÓN JURADA";
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
        var sDocNombre      =   "FORMULARIO DE DECLARACION JURADA";
        var sDocTpsId       =   1;
        var sDocUrlLogica   =   urlData;
        var sDocAcceso      =   "";
        var sDocTipoExt     =   "";
        var sDocNroTramNexo =   "";
        var sCasoCodigo     =   "FORMDJ";
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
                console.log(resultadoApi,'resultadoApi resultadoApi resultadoApi');                         
                if (resultadoApi.success) {
                    srespuesta  =   "TRUE";
                    sweetAlert('DDJJ', 'Declaracion Jurada Registrada', 'success');
                    $('#declaracionJ').modal('hide');
                     return srespuesta;
                } else {
                    $.unblockUI();
                    sweet.show(resultadoApi.error.message);
                    srespuesta  =   "FALSE";                          
                    return srespuesta;
                }
            });

    }

$scope.verificarCamposMov = function(data){
  $scope.formularioMov402(data);
  $("#declaracionJ").modal("show");
  $('#ModalNatutal').modal('show');



        /*REQUISITOS2018*/
        data.sArrayFileArRequisitos = $scope.fileArRequisitos;
        //DOCS OBLIGATORIOS
        if(data.f01_tip_lic == 3375){
            data.f01_categoria_agrupada = 3375;
            data.f10_tip_act_detalle_id = 3375;
            $scope.datos.f01_categoria_agrupada = 3375;
            $scope.datos.f10_tip_act_detalle_id = 3375;
            sarrayobligatorio   =   true;
        }

        if(data.f01_tip_lic == 3375){
            if(data && data.sArrayFileArRequisitos != ""  && data.rdTipoTramite1 != null &&
                data.rdTipoTramite1 != "" &&
                data.FILE_CI != ""  && data.FILE_CI != null &&
                data.fileArchivosAd != ""  && data.fileArchivosAd != null && 
                data.INT_AC_latitud != "" && data.INT_AC_latitud != null &&
                data.INT_AC_longitud != "" && data.INT_AC_longitud != null &&
                data.RO_RZ != "" && data.RO_RZ != null &&
                data.f01_sup != "" && data.f01_sup != null &&
                data.f01_estab_es != "" && data.f01_estab_es != null &&
                //data.f10_prod_ela != "" && data.f10_prod_ela != null &&
                data.f01_tip_lic != "" && data.f01_tip_lic != null &&
                data.licenciam != "" && data.licenciam != null &&
                data.RO_MAC_OF != "" && data.RO_MAC_OF != null &&
                data.f01_zona_act_descrip != "" && data.f01_zona_act_descrip != null &&
                data.f10_tip_via_act != "" && data.f10_tip_via_act != null &&
                data.f10_via_act != "" && data.f10_via_act != null &&
                data.f10_num_act != "" && data.f10_num_act != null &&
                data.f01_informe_modificacion != null && data.f01_informe_modificacion != "" && data.f01_informe_modificacion != 'undefined'){
                    if ((data.f10_modificacionAE == 'true' || data.f10_modificacionLIC == 'true' || data.f10_modificacionVIAE == 'true' || data.f10_modificacionRepEmpresa == 'true') || (data.f10_modificacionAE == true || data.f10_modificacionLIC == true || data.f10_modificacionVIAE == true || data.f10_modificacionRepEmpresa == true)) {
                        if (data.f01_informe_modificacion.length > 6) {
                            if (data.licenciam.length > 1) {                                
                                //$scope.serializarInformacion(data);
                                $('#ModalNatutal').modal('show');
                                $scope.formulario402(data);                                
                            } else{
                                alertify.success("Inserte más de una Actividad Económica en Multiservicios");
                                $('#ModalNatutal').modal('hide');
                            };
                        } else{
                            alertify.success("La descripción de la modificación debe contener mas de una palabra");
                            $('#ModalNatutal').modal('hide');
                        };                        
                    }
                    else{
                        alertify.success("Seleccione el tipo de modificación a realizar");                
                        $('#ModalNatutal').modal('hide');
                    };
                }
                else{
                    alertify.success("Datos obligatorios, verifique los datos del formulario");
                    $('#ModalNatutal').modal('hide');
                };
            }
            if (data.f01_tip_lic != 3375){
                if(/*data &&  data.sArrayFileArRequisitos != ""  && data.rdTipoTramite1 != null &&
                data.FILE_CI != ""  && data.FILE_CI != null &&
                data.rdTipoTramite1 != "" &&
                data.INT_AC_latitud != "" && data.INT_AC_latitud != null &&
                data.INT_AC_longitud != "" && data.INT_AC_longitud != null &&*/
                data.RO_RZ != "" && data.RO_RZ != null &&
                //data.f10_prod_ela != "" && data.f10_prod_ela != null &&
                //data.f01_tip_lic != "" && data.f01_tip_lic != null &&
               // data.f10_tip_act_detalle_id != "" && data.f10_tip_act_detalle_id != null &&
                data.RO_MAC_OF != "" && data.RO_MAC_OF != null &&
                data.RO_ZONA_OF != "" && data.RO_ZONA_OF != null &&
                data.RO_TIP_VIA != "" && data.RO_TIP_VIA != null &&
                data.RO_NOM_VIA_OF != "" && data.RO_NOM_VIA_OF != null &&
                data.RO_NRO_OF != "" && data.RO_NRO_OF != null ){
                    if (data.chkzonasegura == null && (data.f01_tip_lic == '100' || data.f01_tip_lic == 100)) {
                        alertify.success("Seleccione si la Actividad Economica corresponde o no a Zona Segura");               
                    } else{
                        if ((data.f10_modificacionAE == 'true' || data.f10_modificacionLIC == 'true' || data.f10_modificacionVIAE == 'true' || data.f10_modificacionRepEmpresa == 'true') || (data.f10_modificacionAE == true || data.f10_modificacionLIC == true || data.f10_modificacionVIAE == true || data.f10_modificacionRepEmpresa == true)) {
                            if (data.f01_informe_modificacion.length > 6) {
                                $('#ModalNatutal').modal('show');
                                $scope.formularioMov402(data);
                                //$scope.serializarInformacion(data);
                            } else{
                                alertify.success("La descripción de la modificación debe contener mas de una palabra");
                                $('#ModalNatutal').modal('hide');
                            };
                        }
                        else{
                            alertify.success("Seleccione el tipo de modificación a realizar");
                            $('#ModalNatutal').modal('hide');
                        };
                    };
            }else{
                alertify.success("Datos obligatorios, verifique los datos del formulario");
                $('#ModalNatutal').modal('hide');
            };
        }
    }

    $scope.formularioMov402 = function(datos){

        $rootScope.datosEnv = "";
        var fecha= new Date();
        var fechaActualS = "";
        fechaActualS= fecha.getDate() +" - "+ (fecha.getMonth() + 1) +" - "+ fecha.getFullYear();
        var sHora = "";
        sHora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var stringFormulario40  =   "";
        var urlFormularioN  =   "";
        var snombre =   "";
        var scedulaid   =   "";
        var sexpedido   =   "";
        var snombreREP = "";
        var scirep = "";
        var sempresa = "";
        var snit = "";
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        if($scope.tipoPersona == 'NATURAL' || $scope.tipoPersona == 'N'){
            datos.f01_tipo_per_desc = 'NATURAL';
            urlFormularioN  =   "../../docs/AE_Formulario_402.html";
            $( "#msgformulario" ).load(urlFormularioN, function(data) {
                stringFormulario40  =   data;
                datos.f01_tipo_per_desc = ((typeof(datos.f01_tipo_per_desc) == 'undefined' || datos.f01_tipo_per_desc == null) ? "" : datos.f01_tipo_per_desc);
                datos.RO_NOM_RL = ((typeof(datos.RO_NOM_RL) == 'undefined' || datos.RO_NOM_RL == null) ? "" : datos.RO_NOM_RL);
                datos.RO_PAT_RL = ((typeof(datos.RO_PAT_RL) == 'undefined' || datos.RO_PAT_RL == null) ? "" : datos.RO_PAT_RL);
                datos.RO_MAT_RL = ((typeof(datos.RO_MAT_RL) == 'undefined' || datos.RO_MAT_RL == null) ? "" : datos.RO_MAT_RL);
                datos.RO_CAS_RL = ((typeof(datos.RO_CAS_RL) == 'undefined' || datos.RO_CAS_RL == null) ? "" : datos.RO_CAS_RL);
                datos.RO_CI_RL = ((typeof(datos.RO_CI_RL) == 'undefined' || datos.RO_CI_RL == null) ? "" : datos.RO_CI_RL);
                datos.RO_EXP_RL = ((typeof(datos.RO_EXP_RL) == 'undefined' || datos.RO_EXP_RL == null) ? "" : datos.RO_EXP_RL);
                datos.RO_TEL_RL = ((typeof(datos.RO_TEL_RL) == 'undefined' || datos.RO_TEL_RL == null) ? "" : datos.RO_TEL_RL);
                datos.RO_CEL_RL = ((typeof(datos.RO_CEL_RL) == 'undefined' || datos.RO_CEL_RL == null) ? "" : datos.RO_CEL_RL);
                datos.RO_CORR_RL = ((typeof(datos.RO_CORR_RL) == 'undefined' || datos.RO_CORR_RL == null) ? "" : datos.RO_CORR_RL);
                datos.RO_MAC_RL = ((typeof(datos.RO_MAC_RL) == 'undefined' || datos.RO_MAC_RL == null) ? "" : datos.RO_MAC_RL);
                datos.RO_ZONA_RL = ((typeof(datos.RO_ZONA_RL) == 'undefined' || datos.RO_ZONA_RL == null) ? "" : datos.RO_ZONA_RL);
                datos.RO_TIP_VIA_RL = ((typeof(datos.RO_TIP_VIA_RL) == 'undefined' || datos.RO_TIP_VIA_RL == null) ? "" : datos.RO_TIP_VIA_RL);
                datos.RO_CALL_RL = ((typeof(datos.RO_CALL_RL) == 'undefined' || datos.RO_CALL_RL == null) ? "" : datos.RO_CALL_RL);
                datos.RO_NRO_RL = ((typeof(datos.RO_NRO_RL) == 'undefined' || datos.RO_NRO_RL == null) ? "" : datos.RO_NRO_RL);
                datos.RO_NIT = ((typeof(datos.RO_NIT) == 'undefined' || datos.RO_NIT == null) ? "" : datos.RO_NIT);
                datos.RO_RZ = ((typeof(datos.RO_RZ) == 'undefined' || datos.RO_RZ == null) ? "" : datos.RO_RZ);
                datos.RO_POD_RL = ((typeof(datos.RO_POD_RL) == 'undefined' || datos.RO_POD_RL == null) ? "" : datos.RO_POD_RL);
                datos.RO_NOT_RL = ((typeof(datos.RO_NOT_RL) == 'undefined' || datos.RO_NOT_RL == null) ? "" : datos.RO_NOT_RL);
                datos.RO_DEN = ((typeof(datos.RO_DEN) == 'undefined' || datos.RO_DEN == null) ? "" : datos.RO_DEN);
                if(datos.f01_tipo_lic != '3375'){
                    $scope.GetValueLicencia();
                    $scope.GetValueCategoriaAgrupada();
                    $scope.GetValueCategoria();
                }
                if(datos.f01_tip_act =='MA' || datos.f01_tip_act =='MATRI'){
                    datos.f01_tip_act1 = 'MATRIZ';
                }
                if(datos.f01_tip_act =='SU' || datos.f01_tip_act =='SUCUR'){
                    datos.f01_tip_act1 = 'SUCURSAL';
                }

                var pubMod = '';
                pubMod = '<tr><td>VIAE</td>'+
                '<td>TIPO</td>' + 
                '<td>CARACTERÍSTICA</td>'+
                '<td>CARAS</td>'+
                '<td>DESCRIPCIÓN</td>'+
                '<td>ALTO</td>'+
                '<td>ANCHO</td>'+
                '<td>SUPERFICIE</td>';
               /* for (i = 0; i < datos.publicid.length; i++){
                    pubMod = pubMod +'<tr>' + 
                    '<td>' + datos.publicid[i].id + '</td>'+
                    '<td>' + datos.publicid[i].INT_TIPO_LETRE + '</td>'+
                    '<td>' + datos.publicid[i].INT_CARA + '</td>'+
                    '<td>' + datos.publicid[i].INT_NRO_CARA + '</td>'+
                    '<td>' + datos.publicid[i].INT_DESC + '</td>'+
                    '<td>' + datos.publicid[i].INT_ANCHO + '</td>'+
                    '<td>' + datos.publicid[i].INT_ALTO + '</td>'+
                    '<td>' + datos.publicid[i].INT_SUP + '</td></tr>';
                }*/

                //CABECERA
                stringFormulario40  =   stringFormulario40.replace("#f01_tipo_form#", '402');
                stringFormulario40  =   stringFormulario40.replace("#f01_tipo_per_desc#", datos.f01_tipo_per_desc);
              
                //DATOS GENERALES DE CONTRIBUYENTE
                stringFormulario40  =   stringFormulario40.replace("#RO_NOM_RL#", datos.RO_NOM_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_PAT_RL#", datos.RO_PAT_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_MAT_RL#", datos.RO_MAT_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_CAS_RL#", datos.RO_CAS_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_CI_RL#", datos.RO_CI_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_EXP_RL#", datos.RO_EXP_RL);                
                stringFormulario40  =   stringFormulario40.replace("#RO_TEL_RL#", datos.RO_TEL_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_CEL_RL# ", datos.RO_CEL_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_CORR_RL#", datos.RO_CORR_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_MAC_RL#", datos.RO_MAC_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_ZONA_RL#", datos.RO_ZONA_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_TIP_VIA_RL#", datos.RO_TIP_VIA_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_CALL_RL#", datos.RO_CALL_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_NRO_RL#", datos.RO_NRO_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_NIT#", datos.RO_NIT);
                stringFormulario40  =   stringFormulario40.replace("#RO_RZ#", datos.RO_RZ);
                stringFormulario40  =   stringFormulario40.replace("#RO_POD_RL#", datos.RO_POD_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_NOT_RL#", datos.RO_NOT_RL);
                stringFormulario40  =   stringFormulario40.replace("#RO_DEN#", datos.RO_DEN);

                //DATOS DE LA ACTIVIDAD ECONOMICA 
                stringFormulario40  =   stringFormulario40.replace("#RO_TIP_SER#", datos.RO_TIP_SER.toUpperCase());
                stringFormulario40  =   stringFormulario40.replace("#RO_SER_SPR#", datos.RO_SER_SPR);
                stringFormulario40  =   stringFormulario40.replace("#RO_SER_SPU#", datos.RO_SER_SPU);
                stringFormulario40  =   stringFormulario40.replace("#RO_SUP#", datos.RO_SUP);
                stringFormulario40  =   stringFormulario40.replace("#f01_estab_es#", datos.f01_estab_es);
                stringFormulario40  =   stringFormulario40.replace("#f01_tip_act1#", datos.f01_tip_act1);
                stringFormulario40  =   stringFormulario40.replace("#publicidad_grilla#", pubMod);

                var multi = '';
                if (datos.f01_tipo_lic == 3375 || datos.f01_tipo_lic == '3375') {
                    stringFormulario40  =   stringFormulario40.replace("#RO_DEN#", datos.RO_DEN);
                    stringFormulario40  =   stringFormulario40.replace("#f01_categoria_agrupada_descrip#", datos.f01_categoria_agrupada_descrip);
                    stringFormulario40  =   stringFormulario40.replace("#f01_categoria_agrupada_descripcion#", datos.f01_categoria_agrupada_descrip);
                    multi = '<tr><td>NRO</td>'+
                    '<td>TIPO DE LICENCIA</td>' + 
                    '<td>TIPO DE CATEGORÍA</td>'+
                    '<td>TIPO DE ACTIVIDAD</td>';
                    for (i = 1; i < datos.Licenmul_grilla.length; i++){
                        multi = multi +'<tr>' + 
                        '<td>' + datos.Licenmul_grilla[i].nroElem + '</td>'+
                        '<td>' + datos.Licenmul_grilla[i].f01_tipo_licmdescrip + '</td>'+
                        '<td>' + datos.Licenmul_grilla[i].f01_cat_agrupadamdescrip + '</td>'+
                        '<td>' + datos.Licenmul_grilla[i].f01_act_desarrolladamdescrip + '</td></tr>';
                    }
                    
                    stringFormulario40  =   stringFormulario40.replace("#Licenmul_grilla#", multi);
                } else{
                    stringFormulario40  =   stringFormulario40.replace("#RO_DEN#", datos.RO_DEN);
                    stringFormulario40  =   stringFormulario40.replace("#f01_categoria_agrupada_descrip#", datos.f01_categoria_agrupada_descrip);
                    stringFormulario40  =   stringFormulario40.replace("#f01_categoria_agrupada_descripcion#", datos.f01_categoria_agrupada_descripcion);
                    stringFormulario40  =   stringFormulario40.replace("#Licenmul_grilla#", multi);
                };      

                //UBICACION DE LA ACTIVIDAD ECONOMICA
                stringFormulario40  =   stringFormulario40.replace("#f01_macro_act_descrip#", datos.f01_macro_act_descrip);
                stringFormulario40  =   stringFormulario40.replace("#f01_dist_act#", datos.f01_dist_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_tip_via_act#", datos.f01_tip_via_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_categoria_descrip#", datos.f01_categoria_descrip);
                stringFormulario40  =   stringFormulario40.replace("#f01_zona_act_descrip#", datos.f01_zona_act_descrip);
                stringFormulario40  =   stringFormulario40.replace("#f01_tip_via_act#", datos.f01_tip_via_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_num_act1#", datos.f01_num_act1);
                stringFormulario40  =   stringFormulario40.replace("#f01_edificio_act#", datos.f01_edificio_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_bloque_act#", datos.f01_bloque_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_piso_act#", datos.f01_piso_act);
                stringFormulario40  =   stringFormulario40.replace("#f01_dpto_of_loc#", datos.f01_dpto_of_loc);
                stringFormulario40  =   stringFormulario40.replace("#f01_tel_act1#", datos.f01_tel_act1);
                if (datos.f01_num_act == 'NINGUNO') {
                    stringFormulario40  =   stringFormulario40.replace("#f01_num_act#", datos.f01_num_act_n);
                } else{
                    stringFormulario40  =   stringFormulario40.replace("#f01_num_act#", datos.f01_num_act);
                };
                stringFormulario40  =   stringFormulario40.replace("#fecha_sist#", fechaActualS);
                stringFormulario40  =   stringFormulario40.replace("#hora_sist#", sHora);
                stringFormulario40  =   stringFormulario40.replace("#fecha_sist2#", fechaActualS);
              
                $scope.msgformulario = stringFormulario40;
                $scope.notifcondicionesuso = stringFormulario40;
                setTimeout(function(){                            
                    $scope.fmostrarFormulario();
                    },500);   
            })
            $scope.armarDatosForm(datos,fechaActualS, sHora);
        }  
    }
    $scope.confirmarPin402 = function(pinC){
        var datosV = {};
        datosV = $scope.datosIniciales;
        var tipoPersona = "";
        var userv = "";
        tipoPersona = sessionService.get('TIPO_PERSONA');
        if(tipoPersona == 'NATURAL' || tipoPersona == 'N'){
            userv = $scope.datos.RO_CI_RL.trim();
        }else{
            userv = $scope.datos.RO_CI_RL;
        }
        datosV = $scope.datosIniciales;
        var verClave = new verificarClave();
        verClave.usuario = userv;
        verClave.clave = pinC;
        verClave.tipo = sessionService.get('TIPO_PERSONA');
        verClave.verificar_Clave(function(response){
//alert(123);
          console.log(verClave,'verClave verClave verClave');
            var x = JSON.parse(response);
            console.log(x,'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            if(x.success.message == true){
                $scope.generarDocumentoPhpMov402();
                //$scope.serializarInformacion($rootScope..);
            }
            else{
                sweetAlert('Error', 'Contraseña Incorrecta', 'warning');
            }
        });
    }

    $scope.generarDocumentoPhpMov402 = function (){
      //alert(5555);
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
        if(tipoPersona == 'NATURAL' || tipoPersona == 'N'){
            oidCiudadano    = sessionService.get('IDSOLICITANTE');
            datosCiudadano  = (sessionService.get('US_NOMBRE')+' '+sessionService.get('US_PATERNO')+' '+sessionService.get('US_MATERNO'));
            datosci         = sessionService.get('CICIUDADANO');
            datosexpedido   = sessionService.get('CIEXPEDIDO');

            datoForm4 = JSON.stringify($rootScope.datosFormMov402);
            $.ajax({
                url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdf401_402_1.php',  
                //Url: http://192.168.5.141/dreamfactory/dist/generarIgobPdf/elaborarPdf/elaborar/elaborarDocPdf401_402_1.php           
                type:"post",
                data:{
                    "soid": oidCiudadano,
                    "sorigen": "PLATAFORMA INSTITUCIONAL",
                    "stipo": tipoPersona, 
                    "usuario": datosCiudadano,
                    "cedula":  datosci,
                    "expedido": datosexpedido,
                    "empresa": $scope.datos.RO_DEN,
                    "nit": $scope.datos.RO_NIT,
                    "fecha": $scope.fechafinalserver,
                    "hora": $scope.sHoraFinal,
                    "data": datoForm4,
                    "stipo_form": '402',
                    "sistema": 'MOVILIDAD',
                    "data_array": $rootScope.data_array
                },
                success:function(response){
                    var urlData = response;
                    console.log('urllll   1',urlData);
                    $rootScope.decJuradaNatural = urlData;
                    $scope.InsertarDocumento(response);
                    //$rootScope.declaracion_jurada = urlData;
                    $scope.serializarInformacion($scope.datos);
                    $.unblockUI();
                }
            }); 
        }else{
            if(tipoPersona == 'JURIDICO' || tipoPersona == 'J'){
                oidCiudadano    = sessionService.get('IDSOLICITANTE');
                datosCiudadano  = $scope.datosIniciales.f01_pri_nom_rep +' '+ $scope.datosIniciales.f01_ape_pat_rep;
                datosci         = $scope.datosIniciales.f01_num_doc_rep;
                dEmpresa        = $scope.datosIniciales.f01_raz_soc_per_jur;
                dnit            = $scope.datosIniciales.f01_num_doc_per_jur;
                datoForm4 = JSON.stringify($rootScope.datosFormMov402);
                $.ajax({
                    url:CONFIG.API_URL_DMS_2+'elaborarPdf/elaborar/elaborarDocPdf401_402_1.php',
                    type:"post",
                    data:{
                        "soid": oidCiudadano,
                        "sorigen":"PLATAFORMA INSTITUCIONAL",
                        "stipo":tipoPersona,
                        "usuario": datosCiudadano,
                        "cedula":  datosci,
                        "expedido": '',
                        "empresa": dEmpresa,
                        "nit": dnit,
                        "fecha": $scope.fechafinalserver,
                        "hora": $scope.horafinal,
                        "data": datoForm4,
                        "stipo_form": '402',
                        "sistema": 'MOVILIDAD',
                        "data_array": $rootScope.data_array
                    },
                    success:function(response){
                        if(response.length>0){
                            var urlData = response;
                            console.log(urlData,'urlData url');
                            $rootScope.decJuradaJuridico = urlData;
                            $scope.InsertarDocumento(response); 
                            //$rootScope.datosEnviar.declaracion_jurada = urlData;
                            $scope.serializarInformacion($scope.datos);                          
                            $.unblockUI();
                        } 
                    }
                });
            }   
        }
    };

    $scope.armarDatosForm = function(data,sfecha,sHora){
      $rootScope.datosFormMov402 = "";
      var dataForm = {};
        //CABECERA
        dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
        dataForm['f01_tipo_form'] = '402';
        dataForm['RO_POD_RL'] = data.RO_POD_RL;
        dataForm['RO_NOT_RL'] = data.RO_NOT_RL;

        //DATOS GENERALES DE CONTRIBUYENTE
        dataForm['RO_NOM_RL'] = data.RO_NOM_RL;
        dataForm['RO_PAT_RL'] = data.RO_PAT_RL;
        dataForm['RO_MAT_RL'] = data.RO_MAT_RL;
        dataForm['RO_CAS_RL'] = data.RO_CAS_RL;
        dataForm['RO_CI_RL'] = data.RO_CI_RL;
        dataForm['RO_EXP_RL'] = data.RO_EXP_RL;
        dataForm['RO_TEL_RL'] = data.RO_TEL_RL;
        dataForm['RO_CEL_RL'] = data.RO_CEL_RL;
        dataForm['RO_CORR_RL'] = data.RO_CORR_RL;
        dataForm['RO_ZONA_RL'] = data.RO_ZONA_RL;
        dataForm['RO_TIP_VIA_RL'] = data.RO_TIP_VIA_RL;
        dataForm['RO_CALL_RL'] = data.RO_CALL_RL;
        dataForm['RO_NRO_RL'] = data.RO_NRO_RL;
        dataForm['RO_NIT'] = data.RO_NIT;
        dataForm['RO_RZ'] = data.RO_RZ;

        //DATOS DE LA ACTIVIDAD ECONOMICA
        dataForm['RO_DEN'] = data.RO_DEN;
        dataForm['RO_SUP'] = data.RO_SUP;
        dataForm['RO_TIP_SER'] = data.RO_TIP_SER;
        dataForm['RO_SER_SPU'] = data.RO_SER_SPU;
        dataForm['RO_SER_SPR'] = data.RO_SER_SPR;
        dataForm['RO_DEN'] = data.RO_DEN;
        dataForm['f01_categoria_agrupada_descrip'] = data.f01_categoria_agrupada_descrip;
        dataForm['f01_categoria_agrupada_descripcion'] = data.f01_categoria_agrupada_descripcion;

        if(data.f01_tip_act =='MA' || data.f01_tip_act =='MATRI'){
            dataForm['f01_tip_act'] =  'MATRIZ';
        }
        if(data.f01_tip_act =='SU' || data.f01_tip_act =='SUCUR'){
            dataForm['f01_tip_act'] = 'SUCURSAL';
        }

        var multi = '';
        if (data.f01_tipo_lic == 3375 || data.f01_tipo_lic == '3375') {
            dataForm['RO_DEN'] = data.RO_DEN;
            dataForm['f01_categoria_agrupada_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descripcion'] = data.f01_tipo_lic_descrip;
            multi = '<table border="0.5" style="width:100%"><tr><td>NRO</td>'+
            '<td>TIPO DE LICENCIA</td>' + 
            '<td>TIPO DE CATEGORÍA</td>'+
            '<td>TIPO DE ACTIVIDAD</td></tr>';
           /* for (i = 1; i < data.Licenmul_grilla.length; i++){
                multi = multi +'<tr>' + 
                '<td>' + data.Licenmul_grilla[i].nroElem + '</td>'+
                '<td>' + data.Licenmul_grilla[i].f01_tipo_licmdescrip + '</td>'+
                '<td>' + data.Licenmul_grilla[i].f01_cat_agrupadamdescrip + '</td>'+
                '<td>' + data.Licenmul_grilla[i].f01_act_desarrolladamdescrip + '</td></tr>';
            }*/
            multi = multi + '</table>';
            dataForm['Licenmul_grilla'] =  multi;
        } else{
            dataForm['f01_tipo_lic_descrip'] = data.f01_tipo_lic_descrip;
            dataForm['f01_categoria_agrupada_descrip'] = data.f01_categoria_agrupada_descrip;
            dataForm['f01_categoria_agrupada_descripcion'] = data.f01_categoria_agrupada_descripcion;
            dataForm['Licenmul_grilla'] = data.Licenmul_grilla;
        };     
     
        var pubMod = '';
        pubMod = '<table border="0.5" style="width:100%"><tr><td>VIAE</td>'+
        '<td>TIPO</td>' + 
        '<td>CARACTERÍSTICA</td>'+
        '<td>CARAS</td>'+
        '<td>DESCRIPCIÓN</td>'+
        '<td>ALTO</td>'+
        '<td>ANCHO</td>'+
        '<td>SUPERFICIE</td></tr>';
       /* for (i = 0; i < data.publicid.length; i++){
            pubMod = pubMod +'<tr>' + 
                '<td>' + data.publicid[i].id + '</td>'+
                '<td>' + data.publicid[i].INT_TIPO_LETRE + '</td>'+
                '<td>' + data.publicid[i].INT_CARA + '</td>'+
                '<td>' + data.publicid[i].INT_NRO_CARA + '</td>'+
                '<td>' + data.publicid[i].INT_DESC + '</td>'+
                '<td>' + data.publicid[i].INT_ANCHO + '</td>'+
                '<td>' + data.publicid[i].INT_ALTO + '</td>'+
                '<td>' + data.publicid[i].INT_SUP + '</td></tr>';
        }*/
        pubMod = pubMod +'</table>';
        dataForm['publicid_grilla'] = pubMod;   

        //UBICACION DE LA ACTIVIDAD ECONOMICA
        dataForm['f01_macro_act_descrip'] = data.f01_macro_act_descrip;
        dataForm['f01_zona_act_descrip'] = data.f01_zona_act_descrip;
        dataForm['f01_tip_via_act'] = data.f01_tip_via_act;
        dataForm['f01_dist_act'] = data.f01_dist_act;
        if(data.f01_num_act == 'NINGUNO'){
            dataForm['f01_num_act'] = data.f01_num_act_n.toUpperCase();
        }else{
            dataForm['f01_num_act'] = data.f01_num_act;
        }
        
        dataForm['f01_num_act1'] = data.f01_num_act1;
        dataForm['f01_edificio_act'] = data.f01_edificio_act;
        dataForm['f01_bloque_act'] = data.f01_bloque_act;
        dataForm['f01_piso_act'] = data.f01_piso_act;
        dataForm['f01_dpto_of_loc'] = data.f01_dpto_of_loc;
        dataForm['f01_tel_act1'] = data.f01_tel_act1;
        dataForm['fecha_sist'] = sfecha;
        dataForm['fecha_sist2'] = sfecha;
        dataForm['usuario'] = sessionService.get('USUARIO');
        dataForm['hora_sist'] = sHora;

      $rootScope.datosFormMov402 = dataForm;
      $rootScope.datosEnvMov = data;
    }



    //ALMACENANDO FORMULARIO
    $scope.serializarInformacion = function(obj){
      console.log(obj,' obj    obj ');
        var fechactual          = obtFechaActual.obtenerFechaActual();
        //$scope.capturarImagen();
        if ($scope.tipo_persona=="NATURAL"){
          //  obj.RO_NIT = ((typeof(obj.RO_NIT) == 'undefined' || obj.RO_NIT == null) ? ""   : obj.RO_NIT.toUpperCase());
           // obj.f01_tip_doc_prop = ((typeof(obj.f01_tip_doc_prop) == 'undefined' || obj.f01_tip_doc_prop == null) ? ""   : obj.f01_tip_doc_prop.toUpperCase());
           // obj.RO_CI_RL = ((typeof(obj.RO_CI_RL) == 'undefined' || obj.RO_CI_RL == null) ? ""   : obj.RO_CI_RL.toUpperCase());
           // obj.RO_EXP_RL = ((typeof(obj.RO_EXP_RL) == 'undefined' || obj.RO_EXP_RL == null) ? ""   : obj.RO_EXP_RL.toUpperCase());
          /*  obj.f01_pri_nom_prop = ((typeof(obj.f01_pri_nom_prop) == 'undefined' || obj.f01_pri_nom_prop == null) ? ""   : obj.f01_pri_nom_prop.toUpperCase());
            obj.f01_seg_nom_prop = ((typeof(obj.f01_seg_nom_prop) == 'undefined' || obj.f01_seg_nom_prop == null) ? ""   : obj.f01_seg_nom_prop.toUpperCase());
            obj.f01_ter_nom_prop = ((typeof(obj.f01_ter_nom_prop) == 'undefined' || obj.f01_ter_nom_prop == null) ? ""   : obj.f01_ter_nom_prop.toUpperCase());
            obj.f01_ape_pat_prop = ((typeof(obj.f01_ape_pat_prop) == 'undefined' || obj.f01_ape_pat_prop == null) ? ""   : obj.f01_ape_pat_prop.toUpperCase());
            obj.f01_ape_mat_prop = ((typeof(obj.f01_ape_mat_prop) == 'undefined' || obj.f01_ape_mat_prop == null) ? ""   : obj.f01_ape_mat_prop.toUpperCase());
            obj.f01_ape_cas_prop = ((typeof(obj.f01_ape_cas_prop) == 'undefined' || obj.f01_ape_cas_prop == null) ? ""   : obj.f01_ape_cas_prop.toUpperCase());
            obj.f01_nac_prop = ((typeof(obj.f01_nac_prop) == 'undefined' || obj.f01_nac_prop == null) ? ""   : obj.f01_nac_prop.toUpperCase());
            //obj.f01_fecha_nac = ((typeof(obj.f01_fecha_nac) == 'undefined' || obj.f01_fecha_nac == null) ? ""   : obj.f01_fecha_nac.toUpperCase());
            obj.f01_telef_prop = ((typeof(obj.f01_telef_prop) == 'undefined' || obj.f01_telef_prop == null) ? ""   : obj.f01_telef_prop.toUpperCase());
            obj.f01_cel_prop = ((typeof(obj.f01_cel_prop) == 'undefined' || obj.f01_cel_prop == null) ? ""   : obj.f01_cel_prop.toUpperCase());
            obj.f01_email_prop = ((typeof(obj.f01_email_prop) == 'undefined' || obj.f01_email_prop == null) ? ""   : obj.f01_email_prop.toUpperCase());
            obj.f01_zon_prop = ((typeof(obj.f01_zon_prop) == 'undefined' || obj.f01_zon_prop == null) ? ""   : obj.f01_zon_prop.toUpperCase());
            obj.f01_zon_prop_valor = ((typeof(obj.f01_zon_prop_valor) == 'undefined' || obj.f01_zon_prop_valor == null) ? ""   : obj.f01_zon_prop_valor.toUpperCase());
            obj.f01_tip_via_prop = ((typeof(obj.f01_tip_via_prop) == 'undefined' || obj.f01_tip_via_prop == null) ? ""   : obj.f01_tip_via_prop.toUpperCase());
            obj.f01_nom_via_prop = ((typeof(obj.f01_nom_via_prop) == 'undefined' || obj.f01_nom_via_prop == null) ? ""   : obj.f01_nom_via_prop.toUpperCase());
            obj.f01_num_prop = ((typeof(obj.f01_num_prop) == 'undefined' || obj.f01_num_prop == null) ? ""   : obj.f01_num_prop.toUpperCase());
            obj.f01_nom_edi_prop = ((typeof(obj.f01_nom_edi_prop) == 'undefined' || obj.f01_nom_edi_prop == null) ? ""   : obj.f01_nom_edi_prop.toUpperCase());
            obj.f01_bloq_prop = ((typeof(obj.f01_bloq_prop) == 'undefined' || obj.f01_bloq_prop == null) ? ""   : obj.f01_bloq_prop.toUpperCase());
            obj.f01_piso_prop = ((typeof(obj.f01_piso_prop) == 'undefined' || obj.f01_piso_prop == null) ? ""   : obj.f01_piso_prop.toUpperCase());
            obj.f01_depa_prop = ((typeof(obj.f01_depa_prop) == 'undefined' || obj.f01_depa_prop == null) ? ""   : obj.f01_depa_prop.toUpperCase());
            obj.f01_dir_det_prop = ((typeof(obj.f01_dir_det_prop) == 'undefined' || obj.f01_dir_det_prop == null) ? ""   : obj.f01_dir_det_prop.toUpperCase());*/

        } else {
            obj.f01_num_doc_per_jur = ((typeof(obj.f01_num_doc_per_jur) == 'undefined' || obj.f01_num_doc_per_jur == null) ? ""   : obj.f01_num_doc_per_jur.toUpperCase());
            obj.f01_raz_soc_per_jur = ((typeof(obj.f01_raz_soc_per_jur) == 'undefined' || obj.f01_raz_soc_per_jur == null) ? ""   : obj.f01_raz_soc_per_jur.toUpperCase());
            obj.f01_tip_doc_rep = ((typeof(obj.f01_tip_doc_rep) == 'undefined' || obj.f01_tip_doc_rep == null) ? ""   : obj.f01_tip_doc_rep.toUpperCase());
            obj.f01_num_doc_rep = ((typeof(obj.f01_num_doc_rep) == 'undefined' || obj.f01_num_doc_rep == null) ? ""   : obj.f01_num_doc_rep.toUpperCase());
            obj.f01_expedido_rep = ((typeof(obj.f01_expedido_rep) == 'undefined' || obj.f01_expedido_rep == null) ? ""   : obj.f01_expedido_rep.toUpperCase());
            obj.f01_pri_nom_rep = ((typeof(obj.f01_pri_nom_rep) == 'undefined' || obj.f01_pri_nom_rep == null) ? ""   : obj.f01_pri_nom_rep.toUpperCase());
            obj.f01_seg_nom_rep = ((typeof(obj.f01_seg_nom_rep) == 'undefined' || obj.f01_seg_nom_rep == null) ? ""   : obj.f01_seg_nom_rep.toUpperCase());
            obj.f01_ter_nom_rep = ((typeof(obj.f01_ter_nom_rep) == 'undefined' || obj.f01_ter_nom_rep == null) ? ""   : obj.f01_ter_nom_rep.toUpperCase());
            obj.f01_ape_pat_rep = ((typeof(obj.f01_ape_pat_rep) == 'undefined' || obj.f01_ape_pat_rep == null) ? ""   : obj.f01_ape_pat_rep.toUpperCase());
            obj.f01_ape_mat_rep = ((typeof(obj.f01_ape_mat_rep) == 'undefined' || obj.f01_ape_mat_rep == null) ? ""   : obj.f01_ape_mat_rep.toUpperCase());
            obj.f01_ape_cas_rep = ((typeof(obj.f01_ape_cas_rep) == 'undefined' || obj.f01_ape_cas_rep == null) ? ""   : obj.f01_ape_cas_rep.toUpperCase());
            obj.f01_telef_rep = ((typeof(obj.f01_telef_rep) == 'undefined' || obj.f01_telef_rep == null) ? ""   : obj.f01_telef_rep.toUpperCase());
            obj.f01_cel_rep = ((typeof(obj.f01_cel_rep) == 'undefined' || obj.f01_cel_rep == null) ? ""   : obj.f01_cel_rep.toUpperCase());
            obj.f01_email_rep = ((typeof(obj.f01_email_rep) == 'undefined' || obj.f01_email_rep == null) ? ""   : obj.f01_email_rep.toUpperCase());
            obj.f01_id_zona_rep = ((typeof(obj.f01_id_zona_rep) == 'undefined' || obj.f01_id_zona_rep == null) ? ""   : obj.f01_id_zona_rep.toUpperCase());
            obj.f01_tipo_viarep = ((typeof(obj.f01_tipo_viarep) == 'undefined' || obj.f01_tipo_viarep == null) ? ""   : obj.f01_tipo_viarep.toUpperCase());
            obj.f01_nom_via_rep = ((typeof(obj.f01_nom_via_rep) == 'undefined' || obj.f01_nom_via_rep == null) ? ""   : obj.f01_nom_via_rep.toUpperCase());
            obj.f01_num_rep = ((typeof(obj.f01_num_rep) == 'undefined' || obj.f01_num_rep == null) ? ""   : obj.f01_num_rep.toUpperCase());
            obj.f01_ges_vig_pod = ((typeof(obj.f01_ges_vig_pod) == 'undefined' || obj.f01_ges_vig_pod == null) ? ""   : obj.f01_ges_vig_pod.toUpperCase());
            obj.f01_num_pod_leg = ((typeof(obj.f01_num_pod_leg) == 'undefined' || obj.f01_num_pod_leg == null) ? ""   : obj.f01_num_pod_leg.toUpperCase());
            obj.f01_num_not = ((typeof(obj.f01_num_not) == 'undefined' || obj.f01_num_not == null) ? ""   : obj.f01_num_not.toUpperCase());
        }
        obj.RO_TIP_SOL = ((typeof(obj.RO_TIP_SOL) == 'undefined' || obj.RO_TIP_SOL == null) ? ""   : obj.RO_TIP_SOL.toUpperCase());
        obj.f01_categoria_agrupada  =   ((typeof(obj.f01_categoria_agrupada)    == 'undefined' || obj.f01_categoria_agrupada    == null) ? '' : obj.f01_categoria_agrupada);
        obj.f01_categoria_agrupada_descripcion  =   ((typeof(obj.f01_categoria_agrupada_descripcion)    == 'undefined' || obj.f01_categoria_agrupada_descripcion    == null) ? '' : obj.f01_categoria_agrupada_descripcion);
        obj.File_Adjunto = $rootScope.FileAdjuntos;
        
        if(obj.RO_TIP_SOL == "RENOVACION"){
            obj.f01_id_actividad_economica   =   obj.f01_id_actividad_economica;
            obj.f01_nro_orden   =   obj.f01_nro_orden;
            obj.f01_id_contribuyente   =   obj.f01_id_contribuyente;
        }
        if(obj.f01_tipo_lic == '1' || obj.f01_tipo_lic == '3' || obj.f01_tipo_lic == '4'){
            var e = document.getElementById("f01_categoria_agrupada");
            obj.f01_actividadesSecundarias =  e.options[e.selectedIndex].text;
        }else{
            if(obj.f01_tipo_lic == 3375){
                obj.f01_actividadesSecundarias =   obj.f01_actividadesSecundarias; 
            }else{
                 obj.f01_actividadesSecundarias = '';
            }
        }

        obj.INT_FORM_ALMACENADO = 'G';
        obj.misDocs = $scope.documentosarc;
        obj.INT_ID_CAT_AGRUPADA = obj.f01_categoria_agrupada;
        var datosSerializados   = JSON.stringify(obj);
        var idCiudadano         = sessionService.get('IDSOLICITANTE');
        var idTramite           = sessionService.get('IDTRAMITE');
        var idServicio          = sessionService.get('IDSERVICIO');
        var parametros = {
            "procedure_name":"sp_crear_datos_formulario",
            "body":{
                    "params": [
                        {"name": "id_servicio","value": idServicio},
                        {"name": "data_json","value": datosSerializados},
                        {"name": "oid_ciudadano","value": idCiudadano},
                        {"name": "id_usuario","value": 1},
                        {"name": "id_trm_form","value": idTramite}
                    ]
                   }
        };
        $scope.btnGuardarForm   =   true;
        $.blockUI();
      /*  DreamFactory.api[CONFIG.SERVICE].callStoredProcWithParams(parametros).success(function (results){
            if(results.length > 0){
                $.unblockUI();
                $scope.btnEnviarForm    =   false;
                $scope.btnGuardarForm   =   false;
                //$scope.btnEnviarFormLinea    =   false;
                $rootScope.$broadcast('inicializarFechaOblitatorio', $scope.datos);
                $rootScope.$broadcast('iniciaBtnHabilitar', 'G');
                sweet.show('', "Formulario almacenado", 'success');
            }else{
                $.unblockUI();
                sweet.show('', "Formulario no almacenado", 'error');
            }
        }).error(function(results){
                $scope.btnGuardarForm   =   false;
                $.unblockUI();
        });*/
    }
};
