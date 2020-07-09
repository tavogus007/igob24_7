function permisoCirculacionController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
    var sIdCiudadano= sessionService.get('IDSOLICITANTE');
    $scope.tipo_persona=sessionService.get('TIPO_PERSONA');
    $scope.oidCiu = sessionService.get('IDSOLICITANTE');
    $scope.datos = {};
    $scope.trmUsuario = [];
    $scope.ocultaTipo = false;
    $scope.desabilitado = false;
    $scope.div_actividad_economica = false;
    $scope.div_solicitante = false;
    $scope.div_dias_div = false;
    $scope.adjuntos = [{id:0,requisito:'Boleta de Decomiso'},{id:1,requisito:'Comprobante de Pago'}];
    $scope.inicio = function(){
        $scope.listadoActividadesEconomicas();
    }

    var clsValidarBtnEnviar = $rootScope.$on('inicializarVista', function(event, data){
      $scope.datos = JSON.parse(data);
      if($scope.datos.File_Adjunto == undefined){
        $scope.datos.File_Adjunto = [];
        $scope.datos.valPlaca = 2;
      }
      $scope.enviado = sessionService.get('ESTADO');
      if($scope.enviado == 'SI'){
        $scope.desabilitado = true;
      }else{
        $scope.desabilitado = false;
      }
      $scope.docdinamicos($scope.datos.PER_TRA_DESCRIP_FOR);
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
    /////////////////////////////// GUARDAR TRAMITE INICIAL ///////////////////
    $scope.guardar_tramite_inicial = function(datos){
        if(datos.DIAS_VALIDADOR != undefined && datos.DIAS_VALIDADOR != 'undefined'){
            if(datos.DIAS_VALIDADOR == "TODOS LOS DIAS"){
                $scope.datos.PER_TRA_DIAS="TODOS LOS DIAS";
            }else if(datos.DIAS_VALIDADOR == "SELECCIONAR DIAS"){
                var lunes="",martes="",miercoles="",jueves="",viernes="",sabado="",domingo="";
                if(datos.DIAS_LUNES != undefined){
                    martes = datos.DIAS_LUNES;
                }
                if(datos.DIAS_MARTES != undefined){
                    martes = datos.DIAS_MARTES;
                }
                if(datos.DIAS_MIERCOLES != undefined){
                    miercoles = datos.DIAS_MIERCOLES;
                }
                if(datos.DIAS_JUEVES != undefined){
                    jueves = datos.DIAS_JUEVES;
                }
                if(datos.DIAS_VIERNES != undefined){
                    viernes = datos.DIAS_VIERNES;
                }
                if(datos.DIAS_SABADO != undefined){
                    sabado = datos.DIAS_SABADO;
                }
                if(datos.DIAS_DOMINGO != undefined){
                    domingo = datos.DIAS_DOMINGO;
                }
                $scope.datos.PER_TRA_DIAS=lunes+" "+martes+" "+miercoles+" "+jueves+" "+viernes+" "+sabado+" "+domingo;
            }
            $scope.datos.Tipo_tramite_creado="WEB";
            $scope.datos.PER_TRA_NRO_TRAMITE = sessionService.get('IDTRAMITE');
            $scope.verificarCamposSeleccionarDias(datos);
        }else{
            swal('Advertencia', 'Seleccione la modalidad de los dias a trabajar', 'warning');
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
        $scope.ultimoArrayAdjunto(datos.PER_TRA_DESCRIP_FOR);
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
          datos.g_tipo_tramite = 'PER_TRA';
          data_form = JSON.stringify(datos);
          var tramite = new crearTramiteMovilidad();
          tramite.usr_id = 1;    
          tramite.datos = data_form;
          tramite.procodigo = 'PER_TRA';
          var nroTramiteEnviado = sessionService.get('NROTRAMITE');
          tramite.tramite_linea(function(results){ 
            results = JSON.parse(results);
            if (results !=null) {
              results = results.success.data[0].crea_tramite_linea;
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
              text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2><br>“SU SOLICITUD SERA ATENDIDA EN UN PLAZO DE 48 HORAS”',
              html: true,
              type: 'success',
            });
            $scope.tramitesCiudadano();
            $scope.desabilitado = true;
            $scope.botones =   null;
          });
        } catch (error){
          alertify.success('Registro no modificado');
          $.unblockUI(); 
        }
    };
  
  
  //////////////////////////////////ADJUNTOS///////////////////////////
  $scope.ejecutarFile = function(idfile){
    if(idfile == 'FILE_FOTO_SOLICITANTE' || idfile == 'FILE_FOTO_LICENCIA_CI'){
        swal({
            title: 'ALERTA',
            text: 'El cargado de documentos debe seguir el orden de los documentos de vehiculos.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            closeOnConfirm: false
          }, function() {
            swal.close();
            setTimeout(function(){

                var sid =   document.getElementById(idfile);
                if(sid){
                    document.getElementById(idfile).click();
                }else{
                    alert("Error ");
                }

            }, 1000);
          });

    }else{

        var sid =   document.getElementById(idfile);
        if(sid){
            document.getElementById(idfile).click();
        }else{
            alert("Error ");
        }
    }


};
$scope.cambiarFile = function(obj, valor){
    var arraydoc = ["pdf", "doc", "docx", ".docx",".docxlm"];
    $scope.registroAdj  = [];
    var fechaNueva      = "";
    var fechaserver = new fechaHoraServer(); 
    fechaserver.fechahora(function(resp){
        var sfecha      = JSON.parse(resp);
        var fechaServ   = (sfecha.success.fecha).split(' ');
        var fecha_      = fechaServ[0].split('-');
        var hora_       = fechaServ[1].split(':');
        fechaNueva      = fecha_[0] + fecha_[1] +   fecha_[2]   +   '_' +   hora_[0]    +   hora_[1];
    }); 
    $.blockUI();
    setTimeout(function(){         
        var nombre = obj.getAttribute("name");
        var objarchivo = obj.files[0];
        $scope.FILE_VEHICULO_FOTO = obj.files[0];
        var oidCiudadano = sessionService.get('IDSOLICITANTE');
        $scope.direccionvirtual = "RC_CLI";
        var sDirTramite = sessionService.get('IDTRAMITE');
        var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/" + sDirTramite + "/";
        // FILE_VEHICULO_FOTO
        if (nombre == 'FILE_VEHICULO_FOTO' && (typeof(obj.files[0]) != 'undefined')) 
        {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (  arraydoc.indexOf(ext_doc) >= 0 ) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_VEHICULO_FOTO = nombreNuevo;
                        $scope.FILE_VEHICULO_FOTO = objarchivo;
                        document.getElementById("txt_" + nombre).value  = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover1 = "mostrar";
                    } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_VEHICULO_FOTO = nombreNuevo;
                            $scope.FILE_VEHICULO_FOTO = blobcir;
                            $scope.btover1 = "mostrar";
                        });
                        $.unblockUI();
                    }else{
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value  = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_VEHICULO_FOTO = "";
                        $scope.FILE_VEHICULO_FOTO = "";
                        $.unblockUI();
                    }
                        
            } else{
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value  = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }

        }

        //FILE_RUAT_VEHICULO
        if (nombre == 'FILE_RUAT_VEHICULO' && (typeof(obj.files[0]) != 'undefined')) 
        {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (  arraydoc.indexOf(ext_doc) >= 0 ) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_RUAT_VEHICULO = nombreNuevo;
                        $scope.FILE_RUAT_VEHICULO = objarchivo;
                        document.getElementById("txt_" + nombre).value  = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover3 = "mostrar";
                    } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_RUAT_VEHICULO = nombreNuevo;
                            $scope.FILE_RUAT_VEHICULO = blobcir;
                            $scope.btover3 = "mostrar";
                        });
                        $.unblockUI();
                    }else{
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value  = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_RUAT_VEHICULO = "";
                        $scope.FILE_RUAT_VEHICULO = "";
                        $.unblockUI();
                    }
                        
            } else{
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo doc, docx o documentos en formato pdf', 'error');
                document.getElementById("txt_" + nombre).value  = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }

        }
        //FILE_FORMVH_EXCEL
        if (nombre == 'FILE_FORMVH_EXCEL' && (typeof(obj.files[0]) != 'undefined')) 
        {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (  arraydoc.indexOf(ext_doc) >= 0 ) {
           // if ( ext_doc == 'xls' || ext_doc == 'xlsx' ) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_FORMVH_EXCEL = nombreNuevo;
                        $scope.FILE_FORMVH_EXCEL = objarchivo;
                        document.getElementById("txt_" + nombre).value  = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover4 = "mostrar";
                    } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_FORMVH_EXCEL = nombreNuevo;
                            $scope.FILE_FORMVH_EXCEL = blobcir;
                            $scope.btover4 = "mostrar";
                        });
                        $.unblockUI();
                    }else{
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value  = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_FORMVH_EXCEL = "";
                        $scope.FILE_FORMVH_EXCEL = "";
                        $.unblockUI();
                    }
                        
            } else{
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo Excel', 'error');
                document.getElementById("txt_" + nombre).value  = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }

        }
        //FILE_CONTRATO_DELIVERY
        if (nombre == 'FILE_CONTRATO_DELIVERY' && (typeof(obj.files[0]) != 'undefined')) 
        {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if ( ext_doc == "pdf" ) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_CONTRATO_DELIVERY = nombreNuevo;
                        $scope.FILE_CONTRATO_DELIVERY = objarchivo;
                        document.getElementById("txt_" + nombre).value  = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover5 = "mostrar";
                    } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_CONTRATO_DELIVERY = nombreNuevo;
                            $scope.FILE_CONTRATO_DELIVERY = blobcir;
                            $scope.btover5 = "mostrar";
                        });
                        $.unblockUI();
                    }else{
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value  = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_CONTRATO_DELIVERY = "";
                        $scope.FILE_CONTRATO_DELIVERY = "";
                        $.unblockUI();
                    }
                        
            } else{
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
                document.getElementById("txt_" + nombre).value  = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }

        }
        //FILE_FOTO_SOLICITANTE
        if (nombre == 'FILE_FOTO_SOLICITANTE' && (typeof(obj.files[0]) != 'undefined')) 
        {   
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (  arraydoc.indexOf(ext_doc) >= 0 ) {
           // if ( ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg" ) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_FOTO_SOLICITANTE = nombreNuevo;
                        $scope.FILE_FOTO_SOLICITANTE = objarchivo;
                        document.getElementById("txt_" + nombre).value  = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover6 = "mostrar";
                    } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                        if ( ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg" ) {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir   = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_SOLICITANTE = nombreNuevo;
                                $scope.FILE_FOTO_SOLICITANTE = respuesta_compres;
                                document.getElementById("txt_" + nombre).value  = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover6 = "mostrar";
                            });
                        }else{
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_SOLICITANTE = nombreNuevo;
                                $scope.FILE_FOTO_SOLICITANTE = blobcir;
                                $scope.btover6 = "mostrar";
                            });
                            $.unblockUI();
                        }
                    }else{
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value  = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_FOTO_SOLICITANTE = "";
                        $scope.FILE_FOTO_SOLICITANTE = "";
                        $.unblockUI();
                    }
                        
            } else{
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo png, jpg o jpeg', 'error');
                document.getElementById("txt_" + nombre).value  = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }

        }
        //FILE_FOTO_LICENCIA_CI
        if (nombre == 'FILE_FOTO_LICENCIA_CI' && (typeof(obj.files[0]) != 'undefined')) 
        {   
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if ( ext_doc == "pdf") {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                        $scope.FILE_FOTO_LICENCIA_CI = objarchivo;
                        document.getElementById("txt_" + nombre).value  = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover7 = "mostrar";
                    } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                        if ( ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg" ) {
                            var filecompress = compressImage(objarchivo).then(function (respuesta_compres) {
                                var imagenCir = respuesta_compres.name.split('.');
                                var tipoCir   = imagenCir[1];
                                var nombreNuevo = nombre + fechaNueva + '.' + tipoCir;
                                fileUpload1.uploadFileToUrl1(respuesta_compres, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                                $scope.FILE_FOTO_LICENCIA_CI = respuesta_compres;
                                document.getElementById("txt_" + nombre).value  = nombreNuevo;
                                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                                $scope.btover7 = "mostrar";
                            });
                        }else{
                            var zipcir = new JSZip();
                            zipcir.file(nomdocumento, objarchivo);
                            zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                                var nombreNuevo = nombre + fechaNueva + '.zip';
                                fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                                $scope.datos.FILE_FOTO_LICENCIA_CI = nombreNuevo;
                                $scope.FILE_FOTO_LICENCIA_CI = blobcir;
                                $scope.btover7 = "mostrar";
                            });
                            $.unblockUI();
                        }
                    }else{
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value  = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_FOTO_LICENCIA_CI = "";
                        $scope.FILE_FOTO_LICENCIA_CI = "";
                        $.unblockUI();
                    }
            } else{
                swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
                document.getElementById("txt_" + nombre).value  = "";
                document.getElementById("href_" + nombre).href = "";
                $scope.registroAdj.adjunto = '';
                $scope.adjunto = '';
                valor = '';
                $.unblockUI();
            }

        }
    },1000);
    $.unblockUI();
}
$scope.ultimoArrayAdjunto = function(){
   // $scope.capturarImagen();
    datoObjectFiles = [];
    var datoObjectFile1 = new Object();
    var datoObjectFile2 = new Object();
    var datoObjectFile3 = new Object();
    var datoObjectFile4 = new Object();
    var datoObjectFile5 = new Object();
    var datoObjectFile6 = new Object();


    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;

    datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RUAT_VEHICULO + "?app_name=todoangular";
    datoObjectFile1.campo = $scope.datos.FILE_RUAT_VEHICULO;
    datoObjectFile1.nombre = 'CARGAR DOCUMENTO(S) RUAT DE LOS VEHÍCULO(S) (Los documentos deben estar en solo archivo en formato PDF o DOC.)';

    datoObjectFile2.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_SOLICITANTE + "?app_name=todoangular";
    datoObjectFile2.campo = $scope.datos.FILE_FOTO_SOLICITANTE;
    datoObjectFile2.nombre = 'ADJUNTAR LOS CARNETS DE LOS SOLICITANTES (Los documentos deben estar en solo archivo en formato PDF o DOC.)';

    datoObjectFile3.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
    datoObjectFile3.campo = $scope.datos.FILE_FOTO_LICENCIA_CI;
    datoObjectFile3.nombre = 'CARGAR FOTOGRAFÍAS DE LA LICENCIA DE CONDUCIR DEL (DE LOS) CONDUCTORES DE LOS VEHÍCULOS (En un solo documento en formato PDF)';

    datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
    datoObjectFile4.campo = $scope.datos.FILE_FORMVH_EXCEL;
    datoObjectFile4.nombre = 'ADJUNTE EL RESPALDO DE LA SOLICITUD: LICENCIA DE FUNCIONAMIENTO, RESOLUCION ADMINISTRATIVA DEL OPERADOR, CONTRATO DE PRESTACIÓN DE SERVICIOS, AUTORIZACIÓN DE LA DIRECCIÓN DE MERCADOS, PARA CONSTRUCCIONES LA AUTORIZACIÓN DEL GAMLP PARA EJECUCIÓN DE OBRAS.';

    datoObjectFile5.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_VEHICULO_FOTO + "?app_name=todoangular";
    datoObjectFile5.campo = $scope.datos.FILE_VEHICULO_FOTO;
    datoObjectFile5.nombre = $scope.nombreRespaldos;

    datoObjectFile6.url = $rootScope.decJuradaNaturalPermiso;
    datoObjectFile6.campo = "DECLARACION JURADADA";
    datoObjectFile6.nombre = 'DECLARACION JURADA';

    datoObjectFiles[0] = datoObjectFile1;
    datoObjectFiles[1] = datoObjectFile2;
    datoObjectFiles[2] = datoObjectFile3;
    datoObjectFiles[3] = datoObjectFile4;
    datoObjectFiles[4] = datoObjectFile5;
    datoObjectFiles[5] = datoObjectFile6;

    $scope.datos.FileDocumentos = datoObjectFiles;
    $rootScope.FileAdjuntos = datoObjectFiles; 
    $scope.datos.File_Adjunto = datoObjectFiles; 
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
        $scope.datos.muestraTipo = 2;
        var ope = new buscaOperador();
        ope.uid_ciudadano = $scope.oidCiu;
        ope.buscaOperadorRT(function(resultado){
          var res = JSON.parse(resultado).success.data[0].sp_busca_denominacion_operador;
          $scope.datos.INF_NOMBRE_EMPRESA = res;
        })
      }else{
        $scope.datos.muestraTipo = 1;
      }
    }
    $scope.listadoActividadesEconomicas = function () {
        var dataGenesis       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
        var sNumeroRegistros  = dataGenesis.length;
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        if(tipoPersona == "NATURAL"){
            tipoPersona = "N";
            $scope.div_nit_jn = true;
        }else{
            tipoPersona = "J";
            $scope.div_nit_jn = false;
        }
        if(sNumeroRegistros > 0 ){
            var idContribuyente =   $scope.dataGenesisCidadano[0].idContribuyente;
            $scope.datos.rdTipoTramite = "RENOVACION";            
            var contribuyente   =   new gLstActividadEconomica();
            contribuyente.idContribuyente   =   idContribuyente;
            contribuyente.tipo  =   tipoPersona;
            contribuyente.lstActividadEconomica(function(resultado){
                resultadoApi = JSON.parse(resultado);                
                if (resultadoApi.success) {
                    var response    =   resultadoApi;
                    if(response.success.dataSql.length > 0){
                        $scope.trmUsuario = response.success.dataSql;
                        $scope.tblTramites.reload();
                    } else {
                        swal('', "Estimado ciudadano usted no cuenta con una actividad economica", 'warning');
                    }
                } else {
                    swal('', "Datos no Encontrados !!!", 'warning');
                }
            });
        }else{
            swal('', "Estimado ciudadano usted no cuenta con una actividad economica", 'warning');
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


    $scope.selActividadEconomica =  function(tramite){
         $scope.idActividiadEconomicaActual  =   tramite.IdActividad;
         $scope.datos.f01_id_actividad_economica = tramite.IdActividad;
         $scope.sIdAeGrilla  =   tramite.IdActividad;
         var tipoPersona     =   sessionService.get('TIPO_PERSONA');
         var datosGenerales = new getDatosAEViae();
         datosGenerales.idActividadEconomica = tramite.IdActividad;
         datosGenerales.getDatosAE_Viae(function(resultado){
             resultadoApi = JSON.parse(resultado);
             if (resultadoApi.success) {
                var response = resultadoApi.success.dataSql.datosAE;
                $scope.datos.PER_TRA_AE_PMC = response[0].padron;
                $scope.datos.PT_DESCRIP_AE = response[0].denominacion;
                $scope.datos.f01_nit = response[0].nit_empresa;
             }else{
                swal('', "Datos no Encontrados !!!", 'warning');
             }
         });

     }; 
     $scope.docdinamicos = function(data){
        $scope.botones = "mostrar";
        if(data == 'TRANSPORTE_DE_ENTREGA_ALIMENTOS' || data == 'TRANSPORTE_PERSONAL'  || data == 'TRANSPORTE_DE_ENTREGA_PRODUCTOS'){
            $scope.desabilitado=false;
            $scope.div_actividad_economica = true;
            $scope.div_solicitante = true;
            $scope.nombreRespaldos ='ADJUNTAR DOCUMENTACION DE RESPALDO, EJEMPLO CONTRATO DE SERVICIOS, PERMISO DE CONSTRUCCION U OTROS (Fotografías con buena resolución en un solo archivo formato PDF)';
            $scope.div_descripcion_prestado = false;
            switch (data) {
                case 'TRANSPORTE_DE_ENTREGA_ALIMENTOS':
                    swal({
                        title: "Estimado Ciudadano.",
                        text: 'para la prestación de entrega de alimentos preparados a domicilio:<span style="color:#FF0303"> “LOS HORARIOS DE ESTE SERVICIO SON DE 7:00 A 22:00 (LUNES A DOMINGO)”<span>',
                        html: true,
                        type: 'warning',
                        confirmButtonColor: '#DD6B55'
                      });
                  break;
                  case 'TRANSPORTE_PERSONAL':
                    swal({
                        title: "Estimado Ciudadano.",
                        text: 'para la prestación servicio de trasporte de personal:<span style="color:#FF0303"> “LOS HORARIOS DE ESTE SERVICIO SON DE 24 HORAS (LUNES A DOMINGO)”<span>',
                        html: true,
                        type: 'warning',
                        confirmButtonColor: '#DD6B55'
                      });
                  break;
                  case 'TRANSPORTE_DE_ENTREGA_PRODUCTOS':
                    swal({
                        title: "Estimado Ciudadano.",
                        text: 'para la prestación de entrega de productos en general a domicilio:<span style="color:#FF0303"> “LOS HORARIOS DE ESTE SERVICIO SON DE 24 HORAS (LUNES A DOMINGO)”<span>',
                        html: true,
                        type: 'warning',
                        confirmButtonColor: '#DD6B55'
                      });
                  break;
              }
            }else if(data == 'TRANSPORTE_MATERIA_PRIMA'){
                $scope.desabilitado=false;
                $scope.div_actividad_economica = false;
                $scope.div_solicitante = true;
                $scope.div_descripcion_prestado = true;
                $scope.nombreRespaldos ='RESOLUCIÓN ADMINISTRATIVA PARA OPERADORES DE TRANSPORTE DE CARGA, PERMISO DE CONSTRUCCIÓN O AUTORIZACIONES MENORES OTORGADAS POR EL SERVICIO MUNICIPAL DE ADMINISTRACIÓN TERRITORIAL SERMAT, LICENCIA DE FUNCIONAMIENTO, PATENTE ÚNICA MUNICIPAL O CERTIFICADO DE PRODUCTOR AGROPECUARIO, ENTRE OTROS. (Fotografías con buena resolución en un solo archivo formato PDF)';
                switch (data) {
                    case 'TRANSPORTE_MATERIA_PRIMA':
                        swal({
                            title: "Estimado Ciudadano.",
                            text: 'para la prestación de entrega de carga, insumos, materias primas y productos de abastecimiento se debe indicar que:<span style="color:#FF0303"> “LOS HORARIOS DE ESTE SERVICIO SON:<br><br> A) MATERIALES DE CONSTRUCCIÓN: MOVIMIENTO DE ÁRIDOS Y TIERRAS 24 HORAS (LUNES A VIERNES), MAYORISTAS 24 HORAS (LUNES A VIERNES), MINORISTAS DE 9:00 A 17:00 (LUNES A VIERNES).<br><br> B) MATERIAS PRIMAS: 24 HORAS (LUNES A DOMINGO)<br><br> C) PRODUCTOS DE 1ERA NECESIDAD: MAYORISTAS: 24 HORAS (LUNES A DOMINGO) Y MINORISTAS: 5:00 A 17:00 (LUNES A VIERNES)”<span>',
                            html: true,
                            type: 'warning',
                            confirmButtonColor: '#DD6B55'
                          });
                      break;
                        }
            }else if (data == undefined || data == 'undefined' ||  data == ''){
                    $scope.desabilitado=false;
                    $scope.div_actividad_economica = false;
                    $scope.div_solicitante = false;
            }
    }
    $scope.docDiasDimaico = function(data){
        if(data == 'TODOS LOS DIAS'){
            $scope.div_dias_div = false;
        }else if(data == 'SELECCIONAR DIAS'){
            $scope.div_dias_div = true;
        }  
    }
    ///////////////////// validador de todos los dias
    $scope.verificarCamposSeleccionarDias = function (data) {
        if(data.DIAS_VALIDADOR== 'TODOS LOS DIAS'){
            $scope.verificacionFinalDeCampos(data);
        }else{
            if(data.DIAS_LUNES == undefined &&
            data.DIAS_MARTES == undefined && 
            data.DIAS_MIERCOLES == undefined &&
            data.DIAS_JUEVES == undefined && 
            data.DIAS_VIERNES == undefined && 
            data.DIAS_SABADO == undefined && 
            data.DIAS_DOMINGO == undefined 
            ){
                swal('', "Datos obligatorios, seleccione al menos un día", 'warning');
            }else{
                $scope.verificacionFinalDeCampos(data);
            }
        }
    }
    ///validacion final  
    $scope.verificacionFinalDeCampos = function (data) {
        var tipoPersona     =   sessionService.get('TIPO_PERSONA');
        if(data.PER_TRA_DESCRIP_FOR == 'TRANSPORTE_DE_ENTREGA_ALIMENTOS' || data.PER_TRA_DESCRIP_FOR == 'TRANSPORTE_PERSONAL'  || data.PER_TRA_DESCRIP_FOR == 'TRANSPORTE_DE_ENTREGA_PRODUCTOS'){
            if(data.PER_TRA_AE_PMC == undefined || data.PER_TRA_AE_PMC == "undefined" ||
               data.PER_TRA_CANT_VEHI_SOL == undefined || data.PER_TRA_AE_PMC == "undefined" ||
               data.PER_TRA_HORA_INICIO == undefined || data.PER_TRA_HORA_INICIO == "undefined" ||
               data.PER_TRA_HORA_FIN == undefined || data.PER_TRA_HORA_FIN == "undefined" ||
               data.PER_TRA_NUM_CONTACTO == undefined || data.PER_TRA_NUM_CONTACTO == "undefined" ||
               data.FILE_RUAT_VEHICULO == undefined || data.FILE_RUAT_VEHICULO == "undefined" ||
               data.FILE_FOTO_SOLICITANTE == undefined || data.FILE_FOTO_SOLICITANTE == "undefined" ||
               data.FILE_FOTO_LICENCIA_CI == undefined || data.FILE_FOTO_LICENCIA_CI == "undefined" ||
               data.FILE_FORMVH_EXCEL == undefined || data.FILE_FORMVH_EXCEL == "undefined" ||
               data.FILE_VEHICULO_FOTO == undefined || data.FILE_VEHICULO_FOTO == "undefined"){
                swal('Estimado Ciudadano', "Porfavor llene todos los campos solicitados", 'warning');
            }else{
                if(tipoPersona == "NATURAL"){
                    if(data.f01_nit == undefined || data.f01_nit == "undefined"){
                        swal('Estimado Ciudadano', "Porfavor llene todos los campos solicitados", 'warning');
                    }else{
                        $scope.guardar_tramite(data);
                        $scope.declaracionJurada(data);
                        $("#declaracionPERTRA").modal("show");
                    }
                }else if(tipoPersona == "JURIDICO"){
                    $scope.guardar_tramite(data);
                    $scope.declaracionJurada(data);
                    $("#declaracionPERTRA").modal("show");
                }
            }
        }else if(data.PER_TRA_DESCRIP_FOR == 'TRANSPORTE_MATERIA_PRIMA'){
            if(data.PER_TRA_TIPO_SER_PRES == undefined || data.PER_TRA_TIPO_SER_PRES == "undefined" ||
                data.PER_TRA_CANT_VEHI_SOL == undefined || data.PER_TRA_AE_PMC == "undefined" ||
                data.PER_TRA_HORA_INICIO == undefined || data.PER_TRA_HORA_INICIO == "undefined" ||
                data.PER_TRA_HORA_FIN == undefined || data.PER_TRA_HORA_FIN == "undefined" ||
                data.PER_TRA_NUM_CONTACTO == undefined || data.PER_TRA_NUM_CONTACTO == "undefined" ||
                data.FILE_RUAT_VEHICULO == undefined || data.FILE_RUAT_VEHICULO == "undefined" ||
                data.FILE_FOTO_SOLICITANTE == undefined || data.FILE_FOTO_SOLICITANTE == "undefined" ||
                data.FILE_FOTO_LICENCIA_CI == undefined || data.FILE_FOTO_LICENCIA_CI == "undefined" ||
                data.FILE_FORMVH_EXCEL == undefined || data.FILE_FORMVH_EXCEL == "undefined" ||
                data.FILE_VEHICULO_FOTO == undefined || data.FILE_VEHICULO_FOTO == "undefined"){
                swal('Estimado Ciudadano', "Porfavor llene todos los campos solicitados", 'warning');
            }else{
                $scope.guardar_tramite(data);
                $scope.declaracionJurada(data);
                $("#declaracionPERTRA").modal("show");
            }
        }
    }

    //////////////////////////////////////// DECLARACION JURADA
    $scope.declaracionJurada = function(datos){
        var fecha= new Date();
        var fechaActualS = "";
        fechaActualS= fecha.getDate() +" - "+ (fecha.getMonth() + 1) +" - "+ fecha.getFullYear();
        var sHora = "";
        sHora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var stringFormulario40  =   "";
        var urlFormularioN  =   "";
        var urlFormularioJ  =   "";
        $scope.tipoPersona = sessionService.get('TIPO_PERSONA');
        if($scope.tipoPersona == 'NATURAL' || $scope.tipoPersona == 'N'){
            $scope.domicilio_xxx= datos.PER_TRA_ZONA+" "+datos.PER_TRA_NOMBRE_VIA+" Nº "+datos.PER_TRA_NRO_V;
            datos.f01_nom_completo = datos.PER_TRA_NOMBRE+" "+datos.PER_TRA_PATERNO+" "+datos.PER_TRA_MATERNO;
            datos.f01_num_dos_prop = datos.PER_TRA_CI;
            datos.f01_expedido_prop = datos.PER_TRA_EXPEDIDO;
        }else{
            $scope.domicilio_xxx= datos.PER_TRA_ZONA_J+" "+datos.PER_TRA_NOMBRE_VIA_J+" Nº "+datos.PER_TRA_NRO_VV_J;
            datos.f01_nom_completo = datos.PER_TRA_NOMBRE_J+" "+datos.PER_TRA_PATERNO_J+" "+datos.PER_TRA_MATERNO_J;
            datos.f01_num_dos_prop = datos.PER_TRA_CI_J;
            datos.f01_expedido_prop = datos.PER_TRA_EXPEDIDO_J;
        }
            datos.f01_tipo_per_desc = 'NATURAL';
            urlFormularioN  =   "../../docs/Movilidad_PER_TRA.html";
            $( "#msgformularioN" ).load(urlFormularioN, function(data) {
                stringFormulario40  =   data;
                stringFormulario40  =   stringFormulario40.replace("#f01_nom_completo#", datos.f01_nom_completo);
                stringFormulario40  =   stringFormulario40.replace("#f01_num_dos_prop#", datos.f01_num_dos_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_expedido_prop#", datos.f01_expedido_prop);
                stringFormulario40  =   stringFormulario40.replace("#f01_raz_soc#", datos.PT_DESCRIP_AE);
                stringFormulario40  =   stringFormulario40.replace("#f01_num_pmc#", datos.PT_DESCRIP_AE);
                stringFormulario40  =   stringFormulario40.replace("#f01_domiciliado#", datos.PER_TRA_ZONA+" "+datos.PER_TRA_NOMBRE_VIA+" Nº "+datos.PER_TRA_NRO_V);
                stringFormulario40  =   stringFormulario40.replace("#fecha_sist#", fechaActualS);
                stringFormulario40  =   stringFormulario40.replace("#hora_sist#", sHora);
                stringFormulario40  =   stringFormulario40.replace("#fecha_sist2#", fechaActualS);
                $scope.msgformularioN = stringFormulario40;
                $scope.notifcondicionesuso = stringFormulario40;
                setTimeout(function(){
                    $scope.fmostrarFormulario();
                },500);
            })

            $scope.armarDatosForm(datos,fechaActualS, sHora);
    }
    $scope.armarDatosForm = function(data,sfecha,sHora){
        $rootScope.datosForm401 = "";
        var dataForm = {};
            dataForm['f01_nom_completo'] = data.f01_nom_completo;
            dataForm['f01_num_dos_prop'] = data.f01_num_dos_prop;
            dataForm['f01_expedido_prop'] = data.f01_expedido_prop;
            dataForm['f01_raz_soc'] = data.f01_raz_soc;
            dataForm['f01_num_pmc'] = data.f01_num_pmc;
            dataForm['f01_tipo_per_desc'] = data.f01_tipo_per_desc;
            dataForm['f01_domiciliado'] = $scope.domicilio_xxx;
            dataForm['fecha_sist'] = sfecha;
            dataForm['fecha_sist2'] = sfecha;
            dataForm['usuario'] = sessionService.get('USUARIO');
            dataForm['hora_sist'] = sHora;
            $rootScope.datosForm401 = dataForm;
            $rootScope.datosEnv = data;
    }
        //////////////////////////////////////// FIN DECLARACION JURADA
    $scope.fmostrarFormulario   =   function(){
        $("#exampleModalCenter1").modal({backdrop: 'static', keyboard: false});
        $('#msgformularioN').html($scope.msgformularioN);
    }
  }
  