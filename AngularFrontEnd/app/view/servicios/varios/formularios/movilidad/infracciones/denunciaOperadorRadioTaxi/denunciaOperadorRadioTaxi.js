function denunciaOperadorRadioTaxiFuncion($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
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
    ///////////////////////// VALIDADOR PREVIO A GUARDAR ///////////////////
    $scope.validarTramiteGuardar = function(datos){ 
        if($scope.datos.INF_TIPO_SOLICITANTE == undefined){
            $scope.mensajeError("Porfavor ingrese el tipo de denuncia");
        }else if($scope.datos.INF_O_RT_LUGAR == undefined){
            $scope.mensajeError("Porfavor ingrese el lugar");
        }else if($scope.datos.INF_O_RT_ZONA == undefined){
            $scope.mensajeError("Porfavor ingrese la zona");
        }else if($scope.datos.INF_O_RT_FECHA == undefined){
            $scope.mensajeError("Porfavor ingrese la fecha");
        }else if($scope.datos.INF_O_RT_HORA == undefined){
            $scope.mensajeError("Porfavor ingrese la hora");
        }else if($scope.datos.INF_O_RT_NOMBRE_O_RT == undefined){
            $scope.mensajeError("Porfavor ingrese el nombre del Operador de Radio Taxi");
        }else if($scope.datos.INF_O_RT_BREVE_DESC_O_RT == undefined){
            $scope.mensajeError("Porfavor ingrese una breve descripción");
        }else{
            $scope.guardar_tramite(datos);
        }
      }

    ///////////////////////////ENVIO//////////////////////////////
    $scope.mensajeError = function(sms){
        swal({
          title: 'ALERTA',
          text: sms,
          type: 'warning',
          cancelButtonText: 'ACEPTAR',

        });
      };
    //////////////////////////////////////////////
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
        $.blockUI();
        var f = new Date();  
        datos.g_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
        datos.g_tipo_tramite = 'INF_O_RT';
        datos.vtra_id = sessionService.get('IDTRAMITE');
        console.log($scope.datos,'datossss');
        data_form = JSON.stringify(datos);
        var tramite = new crearTramiteMovilidad();
        tramite.usr_id = 1;    
        tramite.datos = data_form;
        tramite.procodigo = 'INF_O_RT';
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
  
  
    $scope.ocultar = function(tipo){
      if(tipo=='OTRO'){
        $scope.ocultaTipo = true;
      }else{
        $scope.ocultaTipo = false;
      }
    }
  
  }
  