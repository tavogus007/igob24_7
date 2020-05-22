function tiendaVirtualController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
  $scope.desabilitado=""
  $scope.tablaContactos = {};
  $scope.tablaRedesSociales = {};
  $scope.tablaOfertas = {};
  $scope.datos={};
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
    console.log(data);
    var datosTiendaVirtual = new dataTiendaVirtual();
    datosTiendaVirtual.ae_id = sessionService.get("IDAE");
    datosTiendaVirtual.categoria = data.f01_categoria;
    datosTiendaVirtual.pagweb_id = 1;
    datosTiendaVirtual.nombre = data.f01_nombreTV;
    datosTiendaVirtual.correo = data.f01_correoTV;
    datosTiendaVirtual.pagina_web = data.f01_pagwebAE;
    datosTiendaVirtual.descripcion = data.f01_descripcionTV;
    datosTiendaVirtual.sucursales = '{}';
    datosTiendaVirtual.contactos = data.f01_contactosAE;
    datosTiendaVirtual.redes_sociales = data.f01_redessocialesAE;
    datosTiendaVirtual.ofertas = data.f01_ofertasAE;
    datosTiendaVirtual.oid = sessionService.get('IDCIUDADANO');
    datosTiendaVirtual.usr = 1;
    datosTiendaVirtual.crearTiendaVirtual(function(response){
      console.log(response);
      results = JSON.parse(response);
      results = results.success;
      if(results.length > 0){
          $.unblockUI();
          //$scope.refrescar();
          swal('', "Producto Registrado", 'success');
          $scope.limpiar();
      } else {
          $.unblockUI();
          swal('', "Producto no registrado", 'error');
      }
    });
  }


  
  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try{ 
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  } catch (e) { console.log("error", e); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
};