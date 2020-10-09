function conmutacionController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
  var sIdCiudadano= sessionService.get('IDSOLICITANTE');
  $scope.tipo_persona=sessionService.get('TIPO_PERSONA');
  $scope.oidCiu = sessionService.get('IDSOLICITANTE');
  $scope.datos = {};
  $scope.ocultaTipo = false;
  $scope.desabilitado = false;
  $scope.adjuntos = [{id:0,requisito:'Carnet de Identidad (Anverso)'},{id:1,requisito:'Carnet de ntidad (Reverso)'}];
  $("#valida").hide();
  $("#valida1").hide();
  $scope.tipoVehiculos = [];

  $scope.inicio = function(){
  }

  var clsValidarBtnEnviar = $rootScope.$on('inicializarVista', function(event, data){
    $scope.datos = JSON.parse(data);
    $scope.enviado = sessionService.get('ESTADO');
    $scope.mostrarTipo($scope.datos.INF_TIPO_SERVICIO);
    if($scope.datos.File_Adjunto == undefined){
      $scope.datos.File_Adjunto = [];
      var myJSON = '{ "url":"' + $scope.datos.INF_CI_ANVERSO + '", "campo":"Carnet de Identidad (Anverso)", "idRequisito":0,"nombre":"Carnet de Identidad (Anverso)"}';
      $scope.datos.File_Adjunto[0] = JSON.parse(myJSON);
      var myJSON = '{ "url":"' + $scope.datos.INF_CI_REVERSO + '", "campo":"Carnet de Identidad (Reverso)", "idRequisito":1,"nombre":"Carnet de Identidad (Reverso)"}';
      $scope.datos.File_Adjunto[1] = JSON.parse(myJSON);
    }
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
              if($scope.datos.INF_TIPO_SERVICIO =='SERVICIOS DE TRANSPORTE URBANO'){
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
      data_form = JSON.stringify(datos);
      var registrar = new insertConmutacion();
      registrar.placa=$scope.datos.INF_PLACA;  
      registrar.oid=sessionService.get('IDUSUARIO');;
      registrar.datos=data_form;
      registrar.registraConmutacion(function(resultado){
        resultado = JSON.parse(resultado);
        if(resultado.success.code == "200"){
          console.log("flavia",resultado);
          $scope.INF_GRILLA = [];
          var encabezado = [];
          var indice = 1;
          var dataInf = [];
          var respuestaConm = resultado.success.data;
          encabezado[0] = {"tipo": "GRD","campos": "Nro|inf_placa|inf_modulo|fecha_curso|hora_curso|aprobado_reprobado|","titulos": "Nro|Placa|Módulo del Curso|Fecha del Curso|Hora del Curso|Aprobado/Reprobado","impresiones": "true|true|true|true|true|true|true|true|true|false"};
          for (var i = 0; i<respuestaConm.length; i++) {
            if(respuestaConm[i].xconmutacion_fecha_conmutacion!= null && respuestaConm[i].id_registro!=respuestaConm[i].xconmutacion_id){
              $scope.INF_GRILLA.push({
                Nro:i+1,
                inf_placa:respuestaConm[i].xconmutacion_placa,
                inf_modulo:respuestaConm[i].xconmutacion_detalle_curso.INF_MODULO_CURSO,
                fecha_curso:respuestaConm[i].xconmutacion_detalle_curso.INF_FECHA_CURSO,
                hora_curso:respuestaConm[i].xconmutacion_detalle_curso.INF_HORA_CURSO,
                aprobado_reprobado:respuestaConm[i].xconmutacion_respuesta
              });
            }
          }  
          var jsonString = '['+ (encabezado) +']';
          angular.forEach($scope.INF_GRILLA, function(value, key) {
            encabezado[indice] = value;
            indice = indice + 1;
          });
          datos.id_conmutacion = respuestaConm[0].id_registro;
          datos.INF_GRILLA=encabezado;
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
        }
        else{
          alertify.error("Señor(a) Ciudadano(a) ocurrio un error al enviar su Tramité.", );
          $.unblockUI();
        }
      })
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

  $scope.listaInfracciones = function(placa,tipo){
    if(placa.length>5){
      var busca = new buscaInfraccionesTipo();
      busca.placa = placa;
      busca.tipo = tipo;
      busca.buscaInfraccionesPlacaTipo(function(resultado){
        $scope.datos.infracciones = JSON.parse(resultado).success.data;
        console.log("tamaño",$scope.datos.infracciones);
        if($scope.datos.infracciones.length==0){
          swal('Advertencia', 'La placa no cuenta no infracciones', 'warning');
          $swCantidad = 0;
        }else{
          for(var i=0;i<$scope.datos.infracciones.length;i++)
          {
            var codigoInf = ""
            for(var j=0;j<$scope.datos.infracciones[i].infraccion_detalle_inf.length;j++){
              codigoInf = codigoInf+$scope.datos.infracciones[i].infraccion_detalle_inf[j].codigo+",";
            }
            codigoInf = codigoInf.substring(0, codigoInf.length - 1);
            $scope.datos.infracciones[i].codigoInfr = codigoInf;
          }
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

  ///////////////////////////////validacion//////////////////////////////////
  $scope.validaPlaca = function (campo){
    $scope.datos.INF_PLACA = campo.toUpperCase();
    console.log("flavia",campo);
    emailRegex = /^[0-9]{3,4}[A-Z]{3}$/;
    if (emailRegex.test($scope.datos.INF_PLACA)) {
      $scope.datos.valPlaca = 0;
      $("#valida1").show();
      $("#valida").hide();
    } else {
      $("#valida1").hide();
      $("#valida").show();
      $scope.datos.valPlaca = 1;
      $scope.desabilitaVeh = true;
    };
  }

  $scope.mostrarTipo = function(tipo){
    if(tipo == "SERVICIOS DE TRANSPORTE URBANO"){
      $scope.tipoVehiculos = [{"tipo":"BUS"},{"tipo":"MICROBUS"},{"tipo":"MINIBUS"},{"tipo":"MICROFURGONETA (CARRY)"}];
    }
    if(tipo == "CONDUCTORES PARTICULARES"){
      $scope.tipoVehiculos = [{"tipo":"AUTOMÓVIL"},{"tipo":"MOTOCICLETA"},{"tipo":"CAMIONETA"},{"tipo":"OTROS"}];
    }
  }

}
