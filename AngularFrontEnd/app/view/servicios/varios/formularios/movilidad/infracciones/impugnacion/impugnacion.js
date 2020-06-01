function impugnacionController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
  var sIdCiudadano= sessionService.get('IDSOLICITANTE');
  $scope.tipo_persona=sessionService.get('TIPO_PERSONA');
  $scope.oidCiu = sessionService.get('IDSOLICITANTE');
  $scope.datos = {};
  $scope.tipoServicio = [{"nro":1,"desc":"Servicio Público de Transporte Colectivo de Pasajeros"},
  {"nro":2,"desc":"Servicio Público de Transporte Individual o Exclusivo de Pasajeros"},
  {"nro":3,"desc":"Servicio Público de Transporte Escolar"},
  {"nro":4,"desc":"Servicio Público de Transporte de Turismo"},
  {"nro":5,"desc":"Servicio Público de Salud y Emergencias"},
  {"nro":6,"desc":"Servicio Público de Transporte de Carga"},
  {"nro":7,"desc":"Servicio Privado de Transporte de Escolar"},
  {"nro":8,"desc":"Servicio Privado de Transporte de Turismo"},
  {"nro":9,"desc":"Servicio Privado de Transporte Personal"},
  {"nro":10,"desc":"Servicio Privado de Transporte de Salud y Emergencias"},
  {"nro":10,"desc":"Servicio Privado de Transporte de Carga - Distribución de Productos"}];
  var idServicioInf = 43;
  $scope.ocultaTipo = false;
  $scope.desabilitado = true;
  $swCantidad = 1;
  $scope.adjuntos = [{id:0,requisito:'Carnet de Identidad (Anverso)'},{id:1,requisito:'Carnet de Identidad (Reverso)'},
  {id:3,requisito:'Credencial del representante legal acreditado por el acreditado por el efecto,cuando corresponda'},
  {id:4,requisito:'Memorandum de Infraccion Municipal'},{id:5,requisito:'Descargos'}];
  $scope.inicio = function(){
  }

  var clsValidarBtnEnviar = $rootScope.$on('inicializarVista', function(event, data){
    console.log("datossss",data);
    $scope.datos = JSON.parse(data);
    $scope.enviado = sessionService.get('ESTADO');
    if($scope.datos.File_Adjunto == undefined){
      $scope.datos.File_Adjunto = [];
      var myJSON = '{ "url":"' + $scope.datos.INF_CI_ANVERSO + '", "campo":"Carnet de Identidad (Anverso)", "idRequisito":0,"desc":"Carnet de Identidad (Anverso)"}';
      $scope.datos.File_Adjunto[0] = JSON.parse(myJSON);
      var myJSON = '{ "url":"' + $scope.datos.INF_CI_REVERSO + '", "campo":"Carnet de Identidad (Reverso)", "idRequisito":1,"desc":"Carnet de Identidad (Reverso)"}';
      $scope.datos.File_Adjunto[1] = JSON.parse(myJSON);
    }
    if($scope.enviado == 'SI'){
      $scope.desabilitado = true;
    }else{
      $scope.desabilitado = false;
    }
    $scope.listaInfracciones
    document.getElementById('gu').disabled=true;
    $scope.$apply();
    setTimeout(function(){
      iniciarLoadFyle();
    }, 1000);  
  });
  //////////////////////////////////ADJUNTOS///////////////////////////
  $scope.ejecutarFile = function(idfile){
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
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "Movilidad/Infraccion/" + $scope.oidCiudadano;
    var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
    $.blockUI();
    angular.forEach(aArchivos, function(archivo, key) {
      if(typeof(archivo) != 'undefined'){
        descDoc = 'Requisito_Impugnacion'+idFiles;
        var imagenNueva = archivo.name.split('.');
        console.log('aArchivos',imagenNueva);
        var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
        if (archivo.size > 500000 && archivo.size <= 15000000) {
          if (imagenNueva[imagenNueva.length-1] == "png" || imagenNueva[imagenNueva.length-1] == "jpg" || imagenNueva[imagenNueva.length-1] == "jpeg" || imagenNueva[imagenNueva.length-1] == "bmp" || imagenNueva[imagenNueva.length-1] == "gif" || 
            imagenNueva[imagenNueva.length-1] == "PNG" || imagenNueva[imagenNueva.length-1] == "JPG" || imagenNueva[imagenNueva.length-1] == "JPEG" || imagenNueva[imagenNueva.length-1] == "BMP" || imagenNueva[imagenNueva.length-1] == "GIF") {
            var filecompress = compressImage(archivo).then(function(respuestaFile){
              console.log('respuestaFile',respuestaFile);
              var imagenFile = respuestaFile.name.split('.');
              var tipoFile = imagenFile[1];
              var nombreNuevo = descDoc + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
              fileUpload1.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
              document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
            });
            $.unblockUI();
          }else{
            if (imagenNueva[imagenNueva.length-1] == 'pdf' ||  imagenNueva[imagenNueva.length-1] == 'docx' ||  imagenNueva[imagenNueva.length-1] == 'docxlm' ||
              imagenNueva[imagenNueva.length-1] == 'PDF' ||  imagenNueva[imagenNueva.length-1] == 'DOCX' ||  imagenNueva[imagenNueva.length-1] == 'DOCXLM' ) {
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
                fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreFileN;
                $.unblockUI();
            } else{
              console.log(imagenNueva[1]);
              if (imagenNueva[imagenNueva.length-1] == 'pdf' ||  imagenNueva[imagenNueva.length-1] == 'docx' ||  imagenNueva[imagenNueva.length-1] == 'docxlm' ||
                imagenNueva[imagenNueva.length-1] == 'PDF' ||  imagenNueva[imagenNueva.length-1] == 'DOCX' ||  imagenNueva[imagenNueva.length-1] == 'DOCXLM' ) {
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
      console.log("flavia",archivo);
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
    descDoc = 'Requisito_Impugnacion'+idFile;
    var imagenNueva = aArch.files[0].name.split('.');
    var tam = aArch.files[0];
    var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[imagenNueva.length-1];
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    var sDirTramite = sessionService.get('IDTRAMITE');
    $scope.direccionvirtual = "Movilidad/Infraccion/" + $scope.oidCiudadano;
    var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual  + '/'+ nombreFileN + "?app_name=todoangular";
    var descrip =  document.getElementById('lbl_f01_upload'+idFile).innerHTML;
    descrip = descrip.replace("\n","");
    console.log(uploadUrl);
    var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "idRequisito":'+idFile+',"desc":"'+descrip+'"}';
    console.log("uno",myJSON);
    $scope.datos.File_Adjunto[idFile] = JSON.parse(myJSON);
    console.log($scope.datos.File_Adjunto);
  }
  //////////////////////////GUARDA TRAMITE//////////////////////
  $scope.guardar_tramite = function(datos){ 
    console.log("datos",datos);
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
          $scope.tramitesCiudadano();
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
      console.log("datos",datos);
      $scope.INF_GRILLA = [];
      var encabezado = [];
      var indice = 1;
      var dataInf = [];
      encabezado[0] = {"tipo": "GRD","campos": "Nro|infraccion_boleta_auto|infraccion_registrado|infraccion_monto_total|infraccion_ubicacion|inf_justificacion|","titulos": "Nro|Número de Boleta|Fecha de Infracción|Monto de Infracción|Lugar de Infracción|Justificación","impresiones": "true|true|true|true|true|true|true|true|true|false"};
      for (var i = 0; i<datos.infracciones.length; i++) {
        if(datos.infracciones[i].INF_TIPO_SOLICITANTE){
          dataInf.push(datos.infracciones[i]);
          $scope.INF_GRILLA.push({
            Nro:i+1,
            infraccion_boleta_auto:datos.infracciones[i].infraccion_boleta_auto,
            infraccion_registrado:datos.infracciones[i].infraccion_registrado,
            infraccion_monto_total:datos.infracciones[i].infraccion_monto_total,
            infraccion_ubicacion:"Zona: "+datos.infracciones[i].infraccion_detalle_ubi.zona+" Via:"+datos.infracciones[i].infraccion_detalle_ubi.via,
            inf_justificacion:datos.infracciones[i].inf_justificacion
          });
        }
      }  
      var jsonString = '['+ (encabezado) +']';
      angular.forEach($scope.INF_GRILLA, function(value, key) {
        encabezado[indice] = value;
        indice = indice + 1;
      });
      datos.INF_GRILLA=encabezado;
      datos.infracciones = dataInf;
      var f = new Date();  
      datos.g_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
      datos.g_tipo_tramite = 'INF_IMPUG';
      console.log("datos enviados",datos);
      data_form = JSON.stringify(datos);
      var tramite = new crearTramiteMovilidad();
      tramite.usr_id = 1;    
      tramite.datos = data_form;
      tramite.procodigo = 'INF_IMPUG';
      var nroTramiteEnviado = sessionService.get('NROTRAMITE');
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

  $scope.listaInfracciones = function(placa){
    if(placa.length>5){
      var busca = new buscaInfraccion();
      busca.placa = placa;
      busca.buscaInfraccionesPlaca(function(resultado){
        $scope.datos.infracciones = JSON.parse(resultado).success.data;
        console.log("tamaño",$scope.datos.infracciones.length);
        if($scope.datos.infracciones.length==0){
          swal('Advertencia', 'La placa no cuenta no infracciones', 'warning');
          $swCantidad = 0;
        }
      })
    }
    console.log("placa",placa.length);
  }

}
