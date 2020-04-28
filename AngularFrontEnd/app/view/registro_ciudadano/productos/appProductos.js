function productosController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
  $scope.tablaDocumentos        =   {};
  $scope.obtDatos      =   [];
  $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
  $scope.valida = 0;
  
  $rootScope.archivosProducto = new Array();


  $scope.cambiarFile = function(obj, valor){
      $scope.datos[obj.name] = valor;
      setTimeout(function(){
          $rootScope.leyenda1 = obj.name;
      }, 500);
      /*REQUISITOS2018*/
      $scope.subirRequisitos(obj, valor);
  };
  /*REQUISITOS2018*/
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

  /*REQUISITOS2018*/
    $scope.almacenarRequisitos = function(aArchivos,idFiles){
        var descDoc = "";
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer(); 
        fechaserver.fechahora(function(resp){
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1]+hora_[2];
        });
        $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
        var sDirTramite = sessionService.get('IDTRAMITE');
        $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/";
        $.blockUI();
        angular.forEach(aArchivos, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                angular.forEach($scope.docArray, function(doc, pos) {
                    if(doc.resid == idFiles[key]){
                        descDoc = doc.desNom;
                    }
                })
                var imagenNueva = archivo.name.split('.');
                var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[1];
                var filecompress = compressImage(archivo).then(function(respuestaFile){
                    var imagenFile = respuestaFile.name.split('.');
                    var tipoFile = imagenFile[1];
                    var nombreNuevo = descDoc + '_'+fechaNueva+'.'+tipoFile;
                    $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevo + "?app_name=todoangular";
                    fileUpload1.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
                    document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
                });
            } else{
            }
        });
        $.unblockUI();

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
            fechaNueva = fecha_[0] + fecha_[1]+fecha_[2]+'_'+hora_[0]+hora_[1]+hora_[2];
        });
        angular.forEach($scope.docArray, function(doc, pos) {
            if(doc.resid == idFile){
                descDoc = doc.desNom;
            }
        })
        var imagenNueva = aArch.files[0].name.split('.');
        var tam = aArch.files[0];
        var nombreFileN = descDoc + '_'+fechaNueva+'.'+imagenNueva[1];
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
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreFileN + "?app_name=todoangular";
        var adatafile   =   {};
        var myJSON = '{ "url":"' + uploadUrl + '", "campo":"' + nombreFileN + '", "nombre":"' + $("#lbl_"+ aArch.id).text() + '" }';
        $rootScope.archivosProducto.push(myJSON);
        //$scope.fileArRequisitos[aArch.name] = JSON.parse(myJSON);
        //$scope.clonarRequisitosDocumentales($scope.fileArRequisitos);
    }

  $scope.ejecutarFile = function(idfile){
    console.log(idfile);
      var sid =   document.getElementById(idfile);
      if(sid){
          document.getElementById(idfile).click();
      }else{
          alert("Error ");
      }
  };

  //UPLOAD  FILES
    $rootScope.vid = sessionService.get('IDCIUDADANO');
    var idCiu = $rootScope.vid;
    $scope.img_url = CONFIG.IMG_URL+ "ciudadano/"+idCiu;
    var uploader = $scope.uploader = new FileUploader({
        url: CONFIG.UPLOAD_URL
    });
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });
    $scope.uploader = new FileUploader({
        url: CONFIG.UPLOAD_URL+"?desripcion=ciudadano&&idCiudadano="+ idCiu
    });
    var uploader = $scope.uploader;

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item, options) {
            return this.queue.length <2;
        }
    });
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    /////////////////////////////////////////////////////////////////

    $scope.registrarProducto = function(data){
      console.log(data);
      console.log($rootScope.archivosProducto);
    }



  $scope.getDocumento = function(usuario,sistema,proceso,ci_nodo){
    $.blockUI();
    var datosProducto = new dataProducto();
    datosProducto.oid = sessionService.get('IDCIUDADANO');
    datosProducto.lstMisProductosOID(function(response){
      console.log(response);
      resultado = JSON.parse(response);
      $scope.obtDatos = resultado.success;

      if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
          //swal('','No existen datos','warning');
         // $scope.valida = 0;
          $.unblockUI();        
          //$("#divMsj").css({'display' : 'block' });
          //$scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
          alertify.warning('No existen datos');  
      } else {
            //$scope.valida = 1;
            var data = $scope.obtDatos;
            console.log(data);
            $scope.tablaDocumentos.reload();
            $.unblockUI();
            //$scope.msj1 = ' ';
      }
      /*
      var results = response;
      if(results.length > 0){ 
        $.unblockUI();
      
      } else {
        $.unblockUI();
        $scope.msg = "Error !!";  
      }*/
    });
    


/*
    var resRoles = new reglasnegocio();
    resRoles.identificador = 'RCCIUDADANO_87';
    resRoles.parametros = '{"sdoc_usuario":"' + usuario + '","sdoc_sistema":"' + sistema + '","sdoc_proceso":"' + proceso + '","sdoc_ci_nodo":"' + ci_nodo + '"}';
    $.blockUI();
    resRoles.llamarregla(function(response){
      $scope.obtDatos = JSON.parse(response);
      if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
          //swal('','No existen datos','warning');
          $scope.valida = 0;
          $.unblockUI();        
          $("#divMsj").css({'display' : 'block' });
          $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
          alertify.warning('No existen datos');  
      } else{
            $scope.valida = 1;
            var data = response;
            $scope.tablaDocumentos.reload();
            $.unblockUI();
            $scope.msj1 = ' ';
      };
    });*/
    




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
  $scope.inicioDocumentosArchivados = function () {
      $scope.getDocumento(sessionService.get('IDCIUDADANO'),'DMS',null,null);
  };
  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try{ 
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  } catch (e) { console.log("error", e); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};