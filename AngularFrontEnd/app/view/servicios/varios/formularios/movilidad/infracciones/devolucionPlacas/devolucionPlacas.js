function devolucionPlacasController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
    var sIdCiudadano= sessionService.get('IDSOLICITANTE');
    $scope.tipo_persona=sessionService.get('TIPO_PERSONA');
    $scope.oidCiu = sessionService.get('IDSOLICITANTE');
    $scope.datos = {};
    $scope.ocultaTipo = false;
    $scope.desabilitado = false;
    $scope.adjuntos = [{id:0,requisito:'Boleta de Decomiso'},{id:1,requisito:'Comprobante de Pago'}];
    $scope.muestraTipo = 0;
    $scope.inicio = function(){
    }

    var clsValidarBtnEnviar = $rootScope.$on('inicializarVista', function(event, data){
      $scope.datos = JSON.parse(data);
      if($scope.datos.File_Adjunto == undefined){
        console.log($scope.datos.File_Adjunto);
        $scope.datos.File_Adjunto = [];
        $scope.datos.valPlaca = 2;

      }
      $scope.enviado = sessionService.get('ESTADO');
      if($scope.enviado == 'SI'){
        $scope.desabilitado = true;
      }else{
        $scope.desabilitado = false;
      }
      
      $("#valida").hide();
      $("#valida1").hide();
      document.getElementById('gu').disabled=true;
      $scope.$apply();
      setTimeout(function(){
        iniciarLoadFyle();
      }, 1000);  
    });
  
    //////////////////////////GUARDA TRAMITE//////////////////////
    $scope.guardar_tramite = function(datos){
      console.log("datos",datos);
      if(datos.valPlaca == 0){
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
      }else{
        swal('Advertencia', 'La placa es incorrecta', 'error');
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
          if(data.INF_TIPO_DEVOLUCION == 'Placa'){
            var decomiso = new buscaInfraccion();
            decomiso.placa = $scope.datos.INF_PLACA;
            decomiso.buscaDecomisoPlacas(function(results){
              var dataDecomiso = JSON.parse(results).success.data[0].sp_busca_placa_decomisada;
              if(dataDecomiso >0){
                data.INF_NRO_BOLETA = dataDecomiso;
                console.log("data",data);
                //$scope.crea_tramite_lotus(data);
              }else{
                swal('Advertencia', 'La placa no se encuentra decomisada', 'error');
              }
            })
          }else{
            if(data.INF_NOMBRE_EMPRESA != ''){
              $scope.crea_tramite_lotus(data);
            }else{
              swal('Advertencia', 'No tiene registrado ningun operador de radio taxi', 'error');
            }
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
        datos.g_tipo_tramite = 'DEV_PLA';
        datos.vtra_id = sessionService.get('IDTRAMITE');
        console.log($scope.datos,'datossss');
        data_form = JSON.stringify(datos);
        var tramite = new crearTramiteMovilidad();
        tramite.usr_id = 1;    
        tramite.datos = data_form;
        tramite.procodigo = 'DEV_PLA';
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
          descDoc = 'Requisito_Devolucion_Placas'+idFiles;
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
      descDoc = 'Requisito_Devolucion_Placas'+idFile;
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
  
  /////////////////////////////////////////////VALIDACION PLACA/////////////////////////////
    $scope.validaPlaca = function (campo){
      campo = campo.toUpperCase();
      emailRegex = /^[0-9]{3,4}[A-Z]{3}$/;
      if (emailRegex.test(campo)) {
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

    $scope.validaDevolucion = function(tipo){
      if(tipo == 'Luminaria'){
        $scope.muestraTipo = 2;
        var ope = new buscaOperador();
        ope.uid_ciudadano = $scope.oidCiu;
        ope.buscaOperadorRT(function(resultado){
          var res = JSON.parse(resultado).success.data[0].sp_busca_denominacion_operador;
          $scope.datos.INF_NOMBRE_EMPRESA = res;

        })
      }else{
        $scope.muestraTipo = 1;
      }
    }


  }
  