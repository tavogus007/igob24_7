function documentosController($scope, $timeout, CONFIG,$window,$rootScope, $location,LogGuardarInfo,$routeParams,registroLog,Data,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload,fileUpload1) {
  $scope.tablaDocumentos        =   {};
  $scope.obtDatos      =   [];
  $scope.valida = 0;
  $scope.datosDoc = "";
  $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !';
  $scope.mensajeVencido = function(){
    //swal('Archivo Vencido', 'No se puede ver el archivo.', 'error');
    alertify.error('Archivo Vencido, No se puede ver el archivo.');  
  }
  $scope.buscarDocumentos = function (busqueda) {
      $scope.titulo = 'Documentos ';
      if(busqueda == 'undefined' || busqueda == null ) {
          $scope.getDocumento(sessionService.get('CICIUDADANO'),'DMS',null,null);
      } else {
          $scope.getBuscarDocumentos(busqueda);
      }
  }
  $scope.getDocumento = function(usuario,sistema,proceso,ci_nodo){
    $.blockUI();
    var resRoles = new reglasnegocio();
    resRoles.identificador = 'RCCIUDADANO_72';
    resRoles.parametros = '{"sdoc_usuario":"'+ usuario +'","sdoc_sistema":"","sdoc_proceso":"'+ proceso +'","sdoc_ci_nodo":"'+ ci_nodo +'"}';
    resRoles.llamarregla(function(response){
      $scope.obtDatos = JSON.parse(response);
      if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
        $scope.tablaDocumentos = null;
        $("#divMsj").css({'display' : 'block' });
        $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
        $.unblockUI();
        alertify.warning('No existen datos');  
      } else{
        var data = response;
        $scope.valida = 1;
        $scope.msj1 = '';
        $scope.tablaDocumentos.reload();
        $.unblockUI();
      };
    });      
  };
  $scope.tablaDocumentos = new ngTableParams({
      page: 1,
      count: 10,
      filter: {},
      sorting: {
        vdoc_idd: 'desc'
      }
      }, {
      total: $scope.obtDatos.length,
      getData: function($defer, params) {
        var filteredData = params.filter() ?
        $filter('filter')($scope.obtDatos, params.filter()) :
        $scope.obtDatos;              
        var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.obtDatos;
        params.total($scope.obtDatos.length);
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));                  
      }
  });  
  $scope.refrescar = function(){
      $scope.getDocumento(sessionService.get('IDCIUDADANO'),'DMS',null,null);
  };
  $scope.$on('api:ready',function(){
      $scope.getDocumento(sessionService.get('IDCIUDADANO'),'DMS',null,null);
  });
  $scope.inicioDocumentos = function () {
      $scope.getDocumento(sessionService.get('IDCIUDADANO'),'DMS',null,null);
  };

  $scope.ImprimirProforma = function (fum) {
      var surlpdf = fum;
      $scope.archivoFile = fum.split(":");
      if ($scope.archivoFile[0]=="file"){
          window.open(
          fum,
          '_blank'
        );
      } else {
          $scope.varSpin = true;
          $scope.RegistroFUM={
              registrado:'OK',
              mensaje:''
          };
          if(surlpdf.indexOf("http://40.117.46.159:80/rest") != -1){
            surlpdf = surlpdf.replace("http://40.117.46.159:80/rest", CONFIG.APIURL);
          }
          $('#visorFum object').attr("data",surlpdf);
          $timeout(function(){$scope.varSpin=false}, 1000);
      }
  };

  /////////////////ADJUNTA FORMULARIO 401//////////////////////

  $scope.recuperaDatos = function(datosEnvio){
    $scope.datosDoc = datosEnvio;
  }

  $scope.ejecutarFile = function(idfile){
    console.log("idfile",idfile);
    var sid =   document.getElementById(idfile);
    if(sid){
        document.getElementById(idfile).click();
    }else{
        alert("Error ");
    }
  };

  $scope.cambiarFile = function(obj, valor){
      $scope.datos[obj.name] = valor;
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
          console.log("sobj",sobj);
          $scope.almacenarRequisitos(rMisDocs,idFiles);
          $scope.adicionarArrayDeRequisitos(sobj,idFile);
      }
  };
  
  $scope.almacenarRequisitos = function(aArchivos,idFiles){
    var compl = $scope.datosDoc.vdoc_id_codigo;
    compl = compl.replace('/','_');
    console.log("compl",compl);
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
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
    var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
    $.blockUI();
    angular.forEach(aArchivos, function(archivo, key) {
        if(typeof(archivo) != 'undefined'){
            console.log("archivo",archivo);
            var imagenNueva = archivo.name.split('.');
            var nombreFileN = 'Formulario_401_firma_' + compl + '_'+fechaNueva+'.'+imagenNueva[1];
            if (archivo.size > 500000 && archivo.size <= 15000000) {
                if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif") {
                    var filecompress = compressImage(archivo).then(function(respuestaFile){
                        var imagenFile = respuestaFile.name.split('.');
                        var tipoFile = imagenFile[1];
                        var nombreNuevo = descDoc + '_'+fechaNueva+'.'+tipoFile;
                        $scope.urlForm401 = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/"  + nombreNuevo + "?app_name=todoangular";
                        fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                        document.getElementById('txt_f01_upload_formulario_401').value = nombreNuevo;
                    });
                    $.unblockUI();
                }else{
                    if (imagenNueva[1] == 'pdf' ||  imagenNueva[1] == 'docx' ||  imagenNueva[1] == 'docxlm') {
                      $scope.urlForm401 = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/"  + nombreFileN + "?app_name=todoangular";
                      fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                      document.getElementById('txt_f01_upload_formulario_401').value = nombreFileN;
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
                    console.log("entra1",imagenNueva);
                    if (imagenNueva[1] == 'png' || imagenNueva[1] == 'jpg' || imagenNueva[1] == 'jpeg' || imagenNueva[1] == 'bmp' || imagenNueva[1] == 'gif' || imagenNueva[1] == 'pdf' || imagenNueva[1] == 'docx' || imagenNueva[1] == 'docxlm') {
                        $scope.urlForm401 = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/"  + nombreFileN + "?app_name=todoangular";
                        fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreFileN);
                        document.getElementById('txt_f01_upload_formulario_401').value = nombreFileN;
                        $.unblockUI();
                    } else{
                        $.unblockUI();
                        swal('Advertencia', 'El archivo  no es valido, seleccione un archivo de tipo imagen, o documentos en formato doc o pdf', 'error');
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
  
  $scope.urlDocumento = '';
  $scope.adicionarArrayDeRequisitos = function(aArch,idFile){
    var compl = $scope.datosDoc.vdoc_id_codigo;
    compl = compl.replace('/','_');
    console.log("compl",compl);
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
    var imagenNueva = aArch.files[0].name.split('.');
    var tam = aArch.files[0];
    var nombreFileN = 'Formulario_401_firma_' + compl + '_'+fechaNueva+'.'+imagenNueva[1];
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    var sDirTramite = sessionService.get('IDTRAMITE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
    if (aArch.files[0].size > 500000 && aArch.files[0].size <= 15000000) {
        if (imagenNueva[1] == "png" || imagenNueva[1] == "jpg" || imagenNueva[1] == "jpeg" || imagenNueva[1] == "bmp" || imagenNueva[1] == "gif") {
            var filecompress = compressImage(aArch.files[0]).then(function(respuestaFile){
                var imagenFile = respuestaFile.name.split('.');
                var tipoFile = imagenFile[1];
                nombreFileN = descDoc + '_'+fechaNueva+'.'+tipoFile;
            });
        }
    }
    var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + nombreFileN + "?app_name=todoangular";
    var adatafile   =   {};
    $scope.urlDocumento = uploadUrl;
  }
  
    $scope.guardarDoc = function(){
    $.blockUI();
    try {
      if($scope.urlDocumento != ''){
        var envia = new tramiteAe();
        envia.nombreCaso = $scope.datosDoc.vdoc_id_codigo;
        envia.documento = $scope.urlDocumento;
        envia.adjuntaDeclaracion(function(respuesta){
          var respuestaTramite = JSON.parse(respuesta);
          if(respuestaTramite.success){
            var doc = new documentoHabilita();
            doc.sdoc_id = $scope.datosDoc.vdoc_idd;
            doc.documentoHabilitaLicencia(function(res){
              var response = JSON.parse(res);
              if(response.success[0].vdoc_habilitacion_licencia == 'habilitado'){
                $window.open($scope.datosDoc.vdoc_url_logica);
                $scope.datosDoc = "";
                $scope.urlDocumento = "";
                $scope.refrescar();
                $scope.$apply();
                $("#cargarFormulario").modal("hide");
                $.unblockUI();
              }else{
                $.unblockUI();
                swal('Advertencia', 'Ocurrio un error vuelva intentar por favor', 'error');
              }
            })
          }else{
            $.unblockUI();
            swal('Advertencia', 'Ocurrio un error vuelva intentar por favor', 'error');
          }
          document.getElementById('txt_f01_upload_formulario_401').value='';
        });
      }else{
        $.unblockUI();
        swal('Advertencia', 'Debe subir su Formulario Firmado', 'error');
      }
    } catch (error) {
      $.unblockUI();
      swal('Advertencia', 'Ocurrio un error vuelva intentar por favor', 'error');
    }
  }

  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try{ 
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  } catch (e) { console.log("error", e); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};