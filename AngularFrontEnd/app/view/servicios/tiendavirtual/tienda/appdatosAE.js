function tiendaVirtualController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
  $scope.desabilitado=""
  $scope.tablaContactos = {};
  $scope.tablaRedesSociales = {};
  $scope.tablaOfertas = {};
  $scope.datos={};
  $rootScope.contactosArray = new Array();
  $rootScope.redesSocialesArray = new Array();
  $rootScope.ofertasArray = new Array();
  $rootScope.archivosProducto = new Array();

  var clsIniciarCamposInternet = $rootScope.$on('inicializarCampos', function(event, data){
    $scope.recuperarSerializarInfo($rootScope.datosTiendaVirtual);
  });
  $scope.recuperarSerializarInfo = function(data){
    if (data.length == 0){
      $scope.datos.f01_nombreTV = "";
      $scope.datos.f01_descripcionTV = "";
      $scope.datos.f01_categoria = "";//falta
      $scope.datos.f01_correoTV = "";
      $scope.datos.f01_pagwebAE = "";
      $scope.datos.f01_contactosAE = "";
      $scope.datos.f01_redessocialesAE = "";
      $scope.datos.f01_ofertasAE = "";
    } else {
      $scope.datos.f01_nombreTV = data[0].tv_nombrec;
      $scope.datos.f01_descripcionTV = data[0].tv_descripcionc;
      $scope.datos.f01_categoria = data[0].tv_categoria;//falta
      $scope.datos.f01_correoTV = data[0].tv_correoc;
      $scope.datos.f01_pagwebAE = data[0].tv_pagina_webc;
      $scope.datos.f01_contactosAE = data[0].tv_contactosc;
      $scope.datos.f01_redessocialesAE = data[0].tv_redesc;
      $scope.datos.f01_ofertasAE = data[0].tv_ofertas;
    }
  }
  $scope.inicioTiendaVirtual = function () {
      console.log(sessionService.get('IDAE'));
      console.log($rootScope.datosTiendaVirtual);
      $scope.recuperarSerializarInfo($rootScope.datosTiendaVirtual);

  };
  $scope.registrarDatosAE = function(data){
    var datosTiendaVirtual = new dataTiendaVirtual();
    datosTiendaVirtual.ae_id = sessionService.get("IDAE");
    datosTiendaVirtual.categoria = data.f01_categoria;
    datosTiendaVirtual.nombre = data.f01_nombreTV;
    datosTiendaVirtual.correo = data.f01_correoTV;
    datosTiendaVirtual.pagina_web = data.f01_pagwebAE;
    datosTiendaVirtual.descripcion = data.f01_descripcionTV;
    var myJSON = '';
    if (data.f01_contacto1=='TELÉFONO' || data.f01_contacto1=='CELULAR'){
      myJSON = '{ "tipo":"' + data.f01_contacto1 + '", "valor":"' + data.f01_contacto1_nro + '" }';
      $rootScope.contactosArray.push(myJSON);
    }
    if (data.f01_contacto2=='TELÉFONO' || data.f01_contacto2=='CELULAR'){
      myJSON = '{ "tipo":"' + data.f01_contacto2 + '", "valor":"' + data.f01_contacto2_nro + '" }';
      $rootScope.contactosArray.push(myJSON);
    }
    if (data.f01_contacto3=='TELÉFONO' || data.f01_contacto3=='CELULAR'){
      myJSON = '{ "tipo":"' + data.f01_contacto3 + '", "valor":"' + data.f01_contacto3_nro + '" }';
      $rootScope.contactosArray.push(myJSON);
    }
    myJSON = '';
    if (data.f01_redessocialesAE1=='true' || data.f01_redessocialesAE1==true){
      myJSON = '{ "tipo":"facebook", "checked":"true", "url":"' + data.f01_redessocialesAE1_url + '" }';
      $rootScope.redesSocialesArray.push(myJSON);
    }
    if (data.f01_redessocialesAE2=='true' || data.f01_redessocialesAE2==true){
      myJSON = '{ "tipo":"twitter", "checked":"true", "url":"' + data.f01_redessocialesAE2_url + '" }';
      $rootScope.redesSocialesArray.push(myJSON);
    }
    if (data.f01_redessocialesAE3=='true' || data.f01_redessocialesAE3==true){
      myJSON = '{ "tipo":"instagram", "checked":"true", "url":"' + data.f01_redessocialesAE3_url + '" }';
      $rootScope.redesSocialesArray.push(myJSON);
    }
    var myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des1 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des2 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des3 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des4 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des5 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    datosTiendaVirtual.contactos = JSON.stringify($rootScope.contactosArray);
    datosTiendaVirtual.redes_sociales = JSON.stringify($rootScope.redesSocialesArray);
    datosTiendaVirtual.ofertas = JSON.stringify($rootScope.ofertasArray);
    datosTiendaVirtual.catalogo = JSON.stringify($rootScope.archivosProducto);
    datosTiendaVirtual.oid = sessionService.get('IDCIUDADANO');
    if (sessionService.get('TIPO_PERSONA')=='NATURAL'){
        datosTiendaVirtual.usr = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_MATERNO') + ' ' + sessionService.get('US_PATERNO');
    } else {
        datosTiendaVirtual.usr = "juridico";
    }
    datosTiendaVirtual.crearTiendaVirtual(function(response){
      console.log(response);
      results = JSON.parse(response);
      results = results.success;
      if(results.length > 0){
          $.unblockUI();
          //$scope.refrescar();
          swal('', "Tienda Virtual activada ", 'success');
          $rootScope.nuevo = null;
          $rootScope.update = "mostrar";
      } else {
          $.unblockUI();
          swal('', "Error al Activar la Tienda Virtual", 'error');
      }
    });
  }
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
          //$scope.adicionarArrayDeRequisitos(sobj,idFile);
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
                if (idFiles[key]==1){
                  var descDoc = "catalogo";
                  var descArchivo = "catalogo de productos";
                }
                if (idFiles[key]==2){
                  var descDoc = "img_aux1";
                  var descArchivo = "img_auxiliar1";
                }
                if (idFiles[key]==3){
                  var descDoc = "img_aux2";
                  var descArchivo = "img_auxiliar2";
                }
                var imagenFile = archivo.name.split('.');;
                var tipoFile = imagenFile[1];
                var nombreNuevo = descDoc + '.'+imagenFile[1];
                $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevo + "?app_name=todoangular";
                fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
                var uploadUrlA = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevo + "?app_name=todoangular";
                var myJSON = '{ "url":"' + uploadUrlA + '", "campo":"' + nombreNuevo + '", "nombre":"' + descArchivo + '" }';
                $rootScope.archivosProducto.push(myJSON);
            } else {
            }
        });
        $.unblockUI();
    };

    $scope.ejecutarFile = function(idfile){
      $scope.fileId = idfile;
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

  
  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try{ 
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  } catch (e) { console.log("error", e); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
};