function conmutacionController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
  var sIdCiudadano= sessionService.get('IDSOLICITANTE');
  $scope.tipo_persona=sessionService.get('TIPO_PERSONA');
  $scope.oidCiu = sessionService.get('IDSOLICITANTE');
  $scope.datos = {};
  $scope.ocultaTipo = false;
  $scope.desabilitado = false;

  $scope.inicio = function(){
  }

  var clsValidarBtnEnviar = $rootScope.$on('inicializarVista', function(event, data){
    $scope.datos = JSON.parse(data);
    $scope.enviado = sessionService.get('ESTADO');
    if($scope.enviado == 'SI'){
      $scope.desabilitado = true;
    }else{
      $scope.desabilitado = false;
    }
    document.getElementById('gu').disabled=true;
    $scope.$apply();
    setTimeout(function(){
      iniciarLoadFyle();
    }, 1000);  
  });

  //////////////////////////GUARDA TRAMITE//////////////////////
  $scope.guardar_tramite = function(datos){ 
    datos.Tipo_tramite_creado = "WEB";
    try {
      var datosSerializados   =  JSON.stringify(datos);
      var idCiudadano         = sessionService.get('IDSOLICITANTE');
      var idTramite           = sessionService.get('IDTRAMITE');
      var crear = new datosFormularios();
      crear.frm_tra_dvser_id = sessionService.get('IDSERVICIO');
      crear.data_json = datosSerializados;
      crear.frm_tra_id_ciudadano = sIdCiudadano;
      crear.frm_tra_id_usuario = 1;
      crear.frm_idTramite = idTramite;
      $.blockUI();
      crear.sp_crear_datos_formulario(function(results){
        results = JSON.parse(results);
        results = results.success;
        if(results.length > 0){
          //$scope.tramitesCiudadano();
          alertify.success("Formulario almacenado");
          document.getElementById('gu').disabled=false;     
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

  ///////////////////////////ENVIO//////////////////////////////
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
        console.log("datos",$scope.datos);
        if($scope.datos.infracciones.length >0){
          var busca = new buscaInfraccion();
          busca.placa = $scope.datos.INF_PLACA;
          busca.buscaCantidadConmutaciones(function(resultado){
            var respuesta = JSON.parse(resultado).success.data;
            if(respuesta[0].sp_busca_conmutaciones == 0){
              if($scope.datos.INF_TIPO_SERVICIO =='TRANSPORTE URBANO'){
                var buscaRoseta = new buscaInfraccion();
                buscaRoseta.placa = $scope.datos.INF_PLACA;
                buscaRoseta.buscaCantidadRosetas(function(resultado){
                  var respuestaRoseta = JSON.parse(resultado).success.data;
                  if(respuestaRoseta[0].sp_busca_roseta > 0){
                    $scope.crea_tramite_lotus(data);
                  }else{
                    swal({
                      title: 'Señor(a) Ciudadano(a) la placa no cuenta con roseta',
                      text: '',
                      html: true,
                      type: 'error',
                    });
                  }
                })
              }else{
                $scope.crea_tramite_lotus(data);
              }
            }else{
              swal({
                title: 'Señor(a) Ciudadano(a) ya realizo una conmutación en la gestión vigente',
                text: '',
                html: true,
                type: 'error',
              });
            }
            console.log("tamaño",respuesta);
            
          })
        }else{
          swal({
            title: 'Señor(a) Ciudadano(a) la placa registrada no cuenta con deudas.',
            text: '',
            html: true,
            type: 'error',
          });
        }
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
      $.blockUI();
      var f = new Date();  
      datos.g_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
      datos.g_tipo_tramite = 'INF_CONM';
      datos.vtra_id = sessionService.get('IDTRAMITE');
      console.log($scope.datos,'datossss');
      data_form = JSON.stringify(datos);
      var tramite = new crearTramiteMovilidad();
      tramite.usr_id = 1;    
      tramite.datos = data_form;
      tramite.procodigo = 'INF_CONM';
      tramite.tramite_linea(function(results){ 
        results = JSON.parse(results);
        if (results !=null) {
          results = results.success.data[0].crea_tramite_linea;
          $scope.mostrar_form_ope = false;
          $scope.datosMostrar = 1;
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
    idUsuario = sessionService.get('IDUSUARIO');
    try {
      idUsuario = 4; 
      var tramiteIgob = new datosFormularios();
      tramiteIgob.frm_idTramite = sessionService.get('IDTRAMITE');
      tramiteIgob.frm_tra_enviado = 'SI';
      tramiteIgob.frm_tra_if_codigo = nroTramite;
      tramiteIgob.frm_tra_id_usuario = idUsuario;
      tramiteIgob.validarFormProcesos(function(resultado){
        swal({
          title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
          text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2>\n',
          html: true,
          type: 'success',
          //timer: 5000,
        });
        $scope.tramitesCiudadano();
        $scope.desabilitado = true;
      });
    } catch (error){
      alertify.success('Registro no modificado');
      $.unblockUI(); 
    }
  };

  $scope.listaInfracciones = function(placa){
    if(placa.length>5){
      var busca = new buscaInfraccion();
      busca.placa = placa;
      busca.buscaInfraccionesPlaca(function(resultado){
        $scope.datos.infracciones = JSON.parse(resultado).success.data;
        console.log("tamaño",$scope.datos.infracciones);
        if($scope.datos.infracciones.length==0){
          swal('Advertencia', 'La placa no cuenta no infracciones', 'warning');
          $swCantidad = 0;
        }
      })
    }
  }

  $scope.ocultar = function(tipo){
    if(tipo=='OTRO'){
      $scope.ocultaTipo = true;
    }else{
      $scope.ocultaTipo = false;
    }
  }

}
