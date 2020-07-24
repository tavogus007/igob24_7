function permisoDeleveryController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, $timeout, obtFechaCorrecta,$route, obtFechaActual,fileUpload1) {
    var sIdCiudadano= sessionService.get('IDSOLICITANTE');
    $scope.tipo_persona=sessionService.get('TIPO_PERSONA');
    $scope.oidCiu = sessionService.get('IDSOLICITANTE');
    $scope.datos = {};
    $scope.trmUsuario = [];
    $scope.trmAutos = [];
    $scope.ocultaTipo = false;
    $scope.desabilitado = false;
    $scope.div_actividad_economica = false;
    $scope.div_solicitante = true;
    $scope.div_dias_div = false;
    $scope.div_datos_A_llenar =false;
    $scope.div_tipo_entrega=false;
    $scope.div_de_adunjtos =false;
    $scope.tit_solicitud=false;
    $scope.div_adjunto_contrato_con_empresa=false;
    $scope.div_adjunto_global=false;
    $scope.txtContratoServicios = '';
    $scope.txtAdjuntoFotografia = '';
    $scope.botones_visibles = true;
    $scope.div_agregar_vehiculos_placa = true;
    $scope.des_servicio_uno = false;
    $scope.des_servicio_dos = false;
    $scope.entrega_propio = false;
    $scope.entrega_terceros = false;
    $scope.entrega_ambos = false;
    $scope.tipovehiculo_privado = {};
    $scope.hardocore = '[{"tipo_vehiculo":"Motocicleta","placa":"3935NBN","CI":"9110200"}]';
    $scope.div_escoger_servicio = false;
    $scope.adjuntos = [{id:0,requisito:'Boleta de Decomiso'},{id:1,requisito:'Comprobante de Pago'}];
    $scope.inicio = function(){
        $scope.listadoActividadesEconomicas();
    }

    var clsValidarBtnEnviar = $rootScope.$on('inicializarVista', function(event, data){
      $scope.datos = JSON.parse(data);
      if($scope.datos.INF_ARRAY_AUTOS == undefined){
        $scope.trmAutos = [];
      }else{
        $scope.trmAutos=  JSON.parse($scope.datos.INF_ARRAY_AUTOS);
      }
      $scope.tblAutos.reload();
      $scope.dinamicoFormulario($scope.datos.PER_TRA_REG_TRANS);
      if($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO'){
        $scope.docdinamicos($scope.datos.PER_TRA_DESCRIP_FOR);
      }
      $scope.enviado = sessionService.get('ESTADO');
      if($scope.enviado == 'SI'){
        $scope.desabilitado = true;
        $scope.ocultadorRadios($scope.datos);
      }else{
        $scope.desabilitado = false;
        $scope.des_servicio_uno = false;
        $scope.des_servicio_dos = false;
        $scope.entrega_propio = false;
        $scope.entrega_ambos = false;
        $scope.entrega_terceros = false;
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
        $scope.ultimoArrayAdjunto();
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
          $scope.INF_GRILLA = [];
          var encabezado = [];
          var indice = 1;
          var dataInf = [];
          encabezado[0] = {"tipo": "GRD","campos": "Nro|tipo_vehiculo|c_placa|c_carnet|","titulos": "Nro|Tipo de Vehículo|Placa|Carnet de Identidad","impresiones": "true|true|true|true|true|true|true|true|true|false"};
          for (var i = 0; i<$scope.trmAutos.length; i++) {
              dataInf.push($scope.trmAutos[i]);
              $scope.INF_GRILLA.push({
                Nro:i+1,
                tipo_vehiculo:$scope.trmAutos[i].tipo_vehiculo,
                c_placa:$scope.trmAutos[i].placa,
                c_carnet:$scope.trmAutos[i].CI,
              });
          }  
          angular.forEach($scope.INF_GRILLA, function(value, key) {
            encabezado[indice] = value;
            indice = indice + 1;
          });
          datos.INF_GRILLA=encabezado;
          var f = new Date();  
          datos.g_fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
          datos.g_tipo_tramite = 'PER_DEL';
          data_form = JSON.stringify(datos);
          var tramite = new crearTramiteMovilidad();
          tramite.usr_id = 1;    
          tramite.datos = data_form;
          tramite.procodigo = 'PER_DEL';
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
              text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2><br>“SU SOLICITUD SERA ATENDIDA EN UN PLAZO DE 2 DÍAS HÁBILES”',
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
        if (nombre == 'FILE_CONTRATO_SER_EMP' && (typeof(obj.files[0]) != 'undefined')) 
        {
            var nomdocumento = obj.files[0].name;
            var docextension = nomdocumento.split('.');
            var ext_doc = docextension[docextension.length - 1].toLowerCase();
            if (  arraydoc.indexOf(ext_doc) >= 0 ) {
           // if ( ext_doc == 'xls' || ext_doc == 'xlsx' ) {
                    if (objarchivo.size <= 500000) {
                        var nombreNuevo = nombre + '_'+fechaNueva+'.'+ext_doc;                      
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datos.FILE_CONTRATO_SER_EMP = nombreNuevo;
                        $scope.FILE_CONTRATO_SER_EMP = objarchivo;
                        document.getElementById("txt_" + nombre).value  = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover11 = "mostrar";
                    } else if ( objarchivo.size > 500000 &&  objarchivo.size <= 15000000) {
                        var zipcir = new JSZip();
                        zipcir.file(nomdocumento, objarchivo);
                        zipcir.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blobcir) {
                            var nombreNuevo = nombre + fechaNueva + '.zip';
                            fileUpload1.uploadFileToUrl1(blobcir, uploadUrl, nombreNuevo);
                            $scope.datos.FILE_CONTRATO_SER_EMP = nombreNuevo;
                            $scope.FILE_CONTRATO_SER_EMP = blobcir;
                            $scope.btover11 = "mostrar";
                        });
                        $.unblockUI();
                    }else{
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value  = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_CONTRATO_SER_EMP = "";
                        $scope.FILE_CONTRATO_SER_EMP = "";
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
   if($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_OPERADOR'){
        $scope.adjuntoDos();
   }else if($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO'){
       if($scope.datos.PER_TRA_DESCRIP_FOR == 'PROPIO'){
        $scope.adjuntoUno();
       }else if($scope.datos.PER_TRA_DESCRIP_FOR == 'TERCEROS'){
        $scope.adjuntoTres();
       }else if($scope.datos.PER_TRA_DESCRIP_FOR == 'AMBOS'){
        $scope.adjuntoDos();
       }else{
        alert("Hubo un Problema");
       }
   }else{
       alert("Hubo un Problema");
   }
} 
$scope.adjuntoUno = function(){
    datoObjectFiles = [];
    var datoObjectFile1 = new Object();
    var datoObjectFile2 = new Object();
    var datoObjectFile3 = new Object();
    var datoObjectFile4 = new Object();
    var datoObjectFile5 = new Object();
    var datoObjectFile6 = new Object();

    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;

    datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FORMVH_EXCEL + "?app_name=todoangular";
    datoObjectFile1.campo = $scope.datos.FILE_FORMVH_EXCEL;
    datoObjectFile1.nombre = 'ADJUNTE EN UN SOLO DOCUMENTO PDF, TODOS LOS PERMISOS DE CIRCULACION VEHICULAR OTORGADOS POR EL MINISTERIO DE GOBIERNO';

    datoObjectFile2.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RUAT_VEHICULO + "?app_name=todoangular";
    datoObjectFile2.campo = $scope.datos.FILE_RUAT_VEHICULO;
    datoObjectFile2.nombre = 'CARGAR DOCUMENTO(S) RUAT DE LOS VEHÍCULO(S)';

    datoObjectFile3.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_SOLICITANTE + "?app_name=todoangular";
    datoObjectFile3.campo = $scope.datos.FILE_FOTO_SOLICITANTE;
    datoObjectFile3.nombre = 'ADJUNTAR LOS CARNETS DE LOS SOLICITANTES';

    datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
    datoObjectFile4.campo = $scope.datos.FILE_FOTO_LICENCIA_CI;
    datoObjectFile4.nombre = 'CARGAR FOTOGRAFÍAS DE LA LICENCIA DE CONDUCIR DEL (DE LOS) CONDUCTORES DE LOS VEHÍCULOS';

    datoObjectFile5.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_VEHICULO_FOTO + "?app_name=todoangular";
    datoObjectFile5.campo = $scope.datos.FILE_VEHICULO_FOTO;
    datoObjectFile5.nombre = $scope.txtAdjuntoFotografia;

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
$scope.adjuntoDos = function(){
    datoObjectFiles = [];
    var datoObjectFile1 = new Object();
    var datoObjectFile2 = new Object();
    var datoObjectFile3 = new Object();
    var datoObjectFile4 = new Object();
    var datoObjectFile5 = new Object();
    var datoObjectFile6 = new Object();
    var datoObjectFile7 = new Object();


    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;

    datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_CONTRATO_SER_EMP + "?app_name=todoangular";
    datoObjectFile1.campo = $scope.datos.FILE_CONTRATO_SER_EMP;
    datoObjectFile1.nombre = $scope.txtContratoServicios;

    datoObjectFile2.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FORMVH_EXCEL + "?app_name=todoangular";
    datoObjectFile2.campo = $scope.datos.FILE_FORMVH_EXCEL;
    datoObjectFile2.nombre = 'ADJUNTE EN UN SOLO DOCUMENTO PDF, TODOS LOS PERMISOS DE CIRCULACION VEHICULAR OTORGADOS POR EL MINISTERIO DE GOBIERNO';

    datoObjectFile3.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_RUAT_VEHICULO + "?app_name=todoangular";
    datoObjectFile3.campo = $scope.datos.FILE_RUAT_VEHICULO;
    datoObjectFile3.nombre = 'CARGAR DOCUMENTO(S) RUAT DE LOS VEHÍCULO(S)';

    datoObjectFile4.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_SOLICITANTE + "?app_name=todoangular";
    datoObjectFile4.campo = $scope.datos.FILE_FOTO_SOLICITANTE;
    datoObjectFile4.nombre = 'ADJUNTAR LOS CARNETS DE LOS SOLICITANTES';

    datoObjectFile5.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_FOTO_LICENCIA_CI + "?app_name=todoangular";
    datoObjectFile5.campo = $scope.datos.FILE_FOTO_LICENCIA_CI;
    datoObjectFile5.nombre = 'CARGAR FOTOGRAFÍAS DE LA LICENCIA DE CONDUCIR DEL (DE LOS) CONDUCTORES DE LOS VEHÍCULOS';

    datoObjectFile6.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_VEHICULO_FOTO + "?app_name=todoangular";
    datoObjectFile6.campo = $scope.datos.FILE_VEHICULO_FOTO;
    datoObjectFile6.nombre = $scope.txtAdjuntoFotografia;

    datoObjectFile7.url = $rootScope.decJuradaNaturalPermiso;
    datoObjectFile7.campo = "DECLARACION JURADADA";
    datoObjectFile7.nombre = 'DECLARACION JURADA';

    datoObjectFiles[0] = datoObjectFile1;
    datoObjectFiles[1] = datoObjectFile2;
    datoObjectFiles[2] = datoObjectFile3;
    datoObjectFiles[3] = datoObjectFile4;
    datoObjectFiles[4] = datoObjectFile5;
    datoObjectFiles[5] = datoObjectFile6;
    datoObjectFiles[6] = datoObjectFile7;

    $scope.datos.FileDocumentos = datoObjectFiles;
    $rootScope.FileAdjuntos = datoObjectFiles; 
    $scope.datos.File_Adjunto = datoObjectFiles; 
}
$scope.adjuntoTres = function(){
    datoObjectFiles = [];
    var datoObjectFile1 = new Object();
    var datoObjectFile2 = new Object();

    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;

    datoObjectFile1.url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + sessionService.get('IDTRAMITE') + "/" + $scope.datos.FILE_CONTRATO_SER_EMP + "?app_name=todoangular";
    datoObjectFile1.campo = $scope.datos.FILE_CONTRATO_SER_EMP;
    datoObjectFile1.nombre = $scope.txtContratoServicios;

    datoObjectFile2.url = $rootScope.decJuradaNaturalPermiso;
    datoObjectFile2.campo = "DECLARACION JURADADA";
    datoObjectFile2.nombre = 'DECLARACION JURADA';

    datoObjectFiles[0] = datoObjectFile1;
    datoObjectFiles[1] = datoObjectFile2;

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
            $scope.div_nit_jn = false;
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
                        $scope.div_escoger_servicio = true;
                        $scope.div_actividad_economica = true;
                        $scope.desabilitado = false;
                        for(var i = 0 ; i <response.success.dataSql.length;i ++){
                            var desconcatenar = response.success.dataSql[i].Descripcion;
                            var fechaServ   = (desconcatenar).split(' ');
                            if(fechaServ[4] == 'ALIMENTOS'){
                                $scope.trmUsuario.push(response.success.dataSql[i]);
                                $scope.tblTramites.reload();
                            }
                        }
                    } else {
                        $scope.botones_visibles = false;
                        $scope.div_escoger_servicio = false;
                        $scope.div_actividad_economica = false;
                        $scope.botones =   null;
                        swal('', "Estimado ciudadano usted no cuenta con una actividad economica por lo cual no podrá acceder a este servicio", 'warning');
                        $scope.desabilitado = true;
                    }
                } else {
                    $scope.botones_visibles = false;
                    $scope.div_escoger_servicio = false;
                    $scope.div_actividad_economica = false;
                    $scope.botones =   null;
                    swal('', "Datos no Encontrados !!!", 'warning');
                    $scope.desabilitado = true;
                }
            });
        }else{
            $scope.botones_visibles = false;
            $scope.div_escoger_servicio = false;
            $scope.div_actividad_economica = false;
            $scope.botones =   null;
            swal('', "Estimado ciudadano usted no cuenta con una actividad economica por lo cual no podrá acceder a este servicio", 'warning');
            $scope.desabilitado = true;
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

    $scope.tblAutos = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
          //  IdActividad: 'desc'
        }
    }, {
        total: $scope.trmAutos.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.trmAutos, params.filter()) :
            $scope.trmAutos;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.trmAutos;
            params.total($scope.trmAutos.length);
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



    ///validacion final  
    $scope.verificacionFinalDeCamposFinal = function (data) {
        if($scope.datos.PER_TRA_REG_TRANS == undefined || $scope.datos.PER_TRA_REG_TRANS == 'undefined'){
            swal('', "Ingrese el tipo de registro Transitorio", 'warning');
        }else if($scope.datos.PER_TRA_AE_PMC == undefined || $scope.datos.PER_TRA_AE_PMC == 'undefined'){
            swal('', "Seleccione una Actividad Económica de la tabla", 'warning');
        }else if($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == undefined){
            swal('', "Seleccione un Tipo de Entrega", 'warning');
        }else if(($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'PROPIO' && $scope.datos.PER_TRA_NUM_CONTACTO == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'AMBOS' && $scope.datos.PER_TRA_NUM_CONTACTO == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_OPERADOR' && $scope.datos.PER_TRA_NUM_CONTACTO == undefined)){
            swal('', "Ingrese al menos dos contactos alternativos", 'warning');
        }else if(($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'PROPIO' && $scope.datos.PER_TRA_CANT_VEHI_SOL == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'AMBOS' && $scope.datos.PER_TRA_CANT_VEHI_SOL == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_OPERADOR' && $scope.datos.PER_TRA_CANT_VEHI_SOL == undefined)){
            swal('', "Ingrese la cantidad de vehiculos a solicitar", 'warning');
        }else if(($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'PROPIO' && JSON.stringify($scope.trmAutos) == '[]') ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'AMBOS' && JSON.stringify($scope.trmAutos) == '[]') ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_OPERADOR' && JSON.stringify($scope.trmAutos) == '[]')){
            swal('', "Ingrese la información de los vehículos", 'warning');
        }else if(($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'PROPIO' && $scope.datos.PER_TRA_CANT_VEHI_SOL != $scope.trmAutos.length) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'AMBOS' && $scope.datos.PER_TRA_CANT_VEHI_SOL != $scope.trmAutos.length) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_OPERADOR' && $scope.datos.PER_TRA_CANT_VEHI_SOL != $scope.trmAutos.length)){
            swal('', "La cantidad de vehículos solicitantes no concuerdan con la cantidad de vehículos adicionados", 'warning');
        }else if(($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'PROPIO' && $scope.datos.FILE_FORMVH_EXCEL == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'AMBOS' && $scope.datos.FILE_FORMVH_EXCEL == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_OPERADOR' && $scope.datos.FILE_FORMVH_EXCEL == undefined)){
            swal('', "Adjunte el documento otorgado por el Ministerio de Gobierno", 'warning');
        }else if(($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'PROPIO' && $scope.datos.FILE_RUAT_VEHICULO == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'AMBOS' && $scope.datos.FILE_RUAT_VEHICULO == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_OPERADOR' && $scope.datos.FILE_RUAT_VEHICULO == undefined)){
            swal('', "Adjunte el documento RUAT de los vehículos", 'warning');
        }else if(($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'PROPIO' && $scope.datos.FILE_FOTO_SOLICITANTE == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'AMBOS' && $scope.datos.FILE_FOTO_SOLICITANTE == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_OPERADOR' && $scope.datos.FILE_FOTO_SOLICITANTE == undefined)){
            swal('', "Adjunte el documento Carnet de Identidad", 'warning');
        }else if(($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'PROPIO' && $scope.datos.FILE_FOTO_LICENCIA_CI == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'AMBOS' && $scope.datos.FILE_FOTO_LICENCIA_CI == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_OPERADOR' && $scope.datos.FILE_FOTO_LICENCIA_CI == undefined)){
            swal('', "Adjunte el documento de Licencia de Conducir", 'warning');
        }else if(($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'PROPIO' && $scope.datos.FILE_VEHICULO_FOTO == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'AMBOS' && $scope.datos.FILE_VEHICULO_FOTO == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_OPERADOR' && $scope.datos.FILE_VEHICULO_FOTO == undefined)){
            swal('', "Adjunte el documento de las fotografias de los vehículos", 'warning');
        }else if(($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'TERCEROS' && $scope.datos.FILE_CONTRATO_SER_EMP == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO' && $scope.datos.PER_TRA_DESCRIP_FOR == 'AMBOS' && $scope.datos.FILE_CONTRATO_SER_EMP == undefined) ||
        ($scope.datos.PER_TRA_REG_TRANS == 'REGISTRO_OPERADOR' && $scope.datos.FILE_CONTRATO_SER_EMP == undefined)){
            swal('', "Adjunte el documento de contrato de Prestación de Servicios", 'warning');
        }else{
            $scope.armarCampos(data);
        }
    }
    $scope.armarCampos = function (data) {
        var contadorVehiculos = 0;
        for(var i  = 0;i<$scope.trmAutos.length;i++){
            contadorVehiculos ++;
        }
        data.Tipo_tramite_creado="WEB";
        data.PER_TRA_NRO_TRAMITE = sessionService.get('IDTRAMITE');
        //data.PER_TRA_CANT_VEHI_SOL = contadorVehiculos;
        data.INF_ARRAY_AUTOS = JSON.stringify($scope.trmAutos);
        $scope.guardar_tramite(data);
        $scope.declaracionJurada(data);
        $("#declaracionPERTRA").modal("show");
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
                if(datos.INF_TIPO_PERSONA == 'JURIDICO'){
                    stringFormulario40  =   stringFormulario40.replace("#f01_domiciliado#", datos.PER_TRA_ZONA_J+" "+datos.PER_TRA_NOMBRE_VIA_J+" Nº "+datos.PER_TRA_NRO_VV_J);
                }else{
                    stringFormulario40  =   stringFormulario40.replace("#f01_domiciliado#", datos.PER_TRA_ZONA+" "+datos.PER_TRA_NOMBRE_VIA+" Nº "+datos.PER_TRA_NRO_V);
                }
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
    $scope.adicionarVehiculos = function(data){
        if($scope.datos.PER_TRA_CANT_VEHI_SOL == undefined){
            swal('', 'Ingrese la cantidad de vehículos a solicitar', 'warning');
        }else if($scope.trmAutos.length >= $scope.datos.PER_TRA_CANT_VEHI_SOL){
            swal('', 'Ya esta en limite de vehículos solicitantes', 'warning');
        }else if(data == undefined){
            swal('', 'Agrege la informacion para adjuntar los vehículos', 'warning');
        }else if(data.tipo_vehiculo == '' || data.tipo_vehiculo == undefined){
            swal('', 'Ingrese el Tipo de Vehículo', 'warning');
        }else if(data.tipo_vehiculo != 'BICICLETA' &&  data.placa == undefined){
            swal('', 'Ingrese la placa del vehículo', 'warning');
        }else if(data.CI == undefined){
            swal('', 'Ingrese el Carnet del Conductor', 'warning');
        }else{
            $scope.trmAutos.push(data);
            $scope.tblAutos.reload();
            $scope.datosV = [];
        }
    }
    $scope.eliminarVehiculo = function(datavehivulo){
        $scope.trmAutos.splice($scope.trmAutos.indexOf(datavehivulo),1);
        $scope.tblAutos.reload();
    }
    $scope.dinamicoFormulario = function(dataFormulario){
        if(dataFormulario == 'REGISTRO_SERVICIO_PRIVADO'){
            $scope.tipovehiculo_privado = JSON.parse('[{"nombre":"AUTOMOVIL"},{"nombre":"BICICLETA"},{"nombre":"MOTOCICLETA"}]');
            $scope.div_tipo_entrega=true;
            $scope.div_datos_A_llenar=false;
            $scope.div_de_adunjtos=true;
            $scope.tit_solicitud=true;
            $scope.div_adjunto_contrato_con_empresa = false;
            $scope.div_adjunto_global=false;
            $scope.txtContratoServicios='ADJUNTAR CONTRATO DE PRESTACION DE SERVICIOS CON LA EMPRESA DE ENTREGA DE ALIMENTOS A DOMICILIO :';
            $scope.txtAdjuntoFotografia='ADJUNTAR FOTOGRAFIAS EN UN SOLO DOCUMENTO PDF PARA VEHICULOS MOTORIZADOS, 2 FOTOGRAFIAS (1. PANORAMICA DONDE SE VEA LA PARTE FRONTAL Y LATERAL DEL VEHICULO Y 2. INTERNA DESDE LA CABINA DEL CONDUCTOR). PARA BICICLETA, 2 FOTOGRAFIAS (1. FRONTAL TOTAL Y 2. LATERAL, CON EL CONDUCTOR AL LADO PORTANDO CASCO Y  CHALECO REFLECTIVO)';
            
        }else if(dataFormulario == 'REGISTRO_OPERADOR'){
            $scope.tipovehiculo_privado = JSON.parse('[{"nombre":"BICICLETA"},{"nombre":"MOTOCICLETA"}]');
            $scope.div_tipo_entrega=false;
            $scope.div_datos_A_llenar=true;
            $scope.div_de_adunjtos=true;
            $scope.tit_solicitud=true;
            $scope.div_adjunto_global=true;
            $scope.div_adjunto_contrato_con_empresa = true;
            $scope.txtContratoServicios='ADJUNTE CONTRATO DE PRESTACION DE SERVICIOS :';
            $scope.txtAdjuntoFotografia='ADJUNTAR FOTOGRAFIAS EN UN SOLO DOCUMENTO PDF PARA VEHICULOS MOTOCICLETAS, 1 FOTOGRAFIA (1. PANORAMICA, DONDE SE VEA LA PARTE FRONTAL Y LATERAL DE LA MOTOCICLETA). PARA BICICLETA, 1 FOTOGRAFIA (1. PANORAMICA, DONDE SE VEA LA PARTE FRONTAL Y LATERAL DE LA BICICLETA, CON EL CONDUCTOR AL LADO PORTANDO CASCO Y  CHALECO REFLECTIVO)';
        }else{
            $scope.tipovehiculo_privado = JSON.parse('[{"nombre":"AUTOMOVIL"},{"nombre":"BICICLETA"},{"nombre":"MOTOCICLETA"}]');
            $scope.div_tipo_entrega=false;
            $scope.div_datos_A_llenar=false;
            $scope.div_de_adunjtos=false;
            $scope.tit_solicitud=false;
            $scope.div_adjunto_global=false;
            $scope.div_adjunto_contrato_con_empresa = false;
            $scope.txtAdjuntoFotografia='ADJUNTAR FOTOGRAFIAS EN UN SOLO DOCUMENTO PDF PARA VEHICULOS MOTORIZADOS, 2 FOTOGRAFIAS (1. PANORAMICA DONDE SE VEA LA PARTE FRONTAL Y LATERAL DEL VEHICULO Y 2. INTERNA DESDE LA CABINA DEL CONDUCTOR). PARA BICICLETA, 2 FOTOGRAFIAS (1. FRONTAL TOTAL Y 2. LATERAL, CON EL CONDUCTOR AL LADO PORTANDO CASCO Y  CHALECO REFLECTIVO)';
            $scope.txtContratoServicios='ADJUNTAR CONTRATO DE PRESTACION DE SERVICIOS CON LA EMPRESA DE ENTREGA DE ALIMENTOS A DOMICILIO :';
        }
    }
    $scope.docdinamicos = function(data){
        if(data == 'PROPIO'){
            $scope.div_datos_A_llenar=true;
            $scope.div_adjunto_contrato_con_empresa = false;
            $scope.div_adjunto_global=true;

            }else if(data == 'TERCEROS'){
                $scope.div_datos_A_llenar=false;
                $scope.div_adjunto_contrato_con_empresa = true;
            $scope.div_adjunto_global=false;

            }else if(data == 'AMBOS'){
                $scope.div_datos_A_llenar=true;
                $scope.div_adjunto_contrato_con_empresa = true;
            $scope.div_adjunto_global=true;

            }else if (data == undefined || data == 'undefined' ||  data == ''){
            $scope.div_datos_A_llenar=false;
            $scope.div_adjunto_contrato_con_empresa = false;
            $scope.div_adjunto_global=false;

            }
    }
    $scope.cambioCombo = function(data){
        if(data == 'BICICLETA'){
            $scope.div_agregar_vehiculos_placa = false;
        }else{
            $scope.div_agregar_vehiculos_placa = true;
        }
    }
    $scope.ocultadorRadios = function(data){
        if(data.PER_TRA_REG_TRANS == 'REGISTRO_SERVICIO_PRIVADO'){
            $scope.des_servicio_uno = false;
            $scope.des_servicio_dos = true;
            if(data.PER_TRA_DESCRIP_FOR == 'PROPIO'){
                $scope.entrega_propio = false;
                $scope.entrega_ambos = true;
                $scope.entrega_terceros = true;
            }
            if(data.PER_TRA_DESCRIP_FOR == 'TERCEROS'){
                $scope.entrega_propio = true;
                $scope.entrega_ambos = true;
                $scope.entrega_terceros = false;
            }
            if(data.PER_TRA_DESCRIP_FOR == 'AMBOS'){
                $scope.entrega_propio = true;
                $scope.entrega_ambos = false;
                $scope.entrega_terceros = true;
            }
        }else{
            $scope.des_servicio_uno = true;
            $scope.des_servicio_dos = false;
        }
    }
  }
  