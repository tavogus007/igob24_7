function tiendaVirtualController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
  $scope.desabilitado=""
  $scope.tablaContactos = {};
  $scope.tablaRedesSociales = {};
  $scope.tablaOfertas = {};
  $scope.datos={};

  
  var clsIniciarCamposInternet = $rootScope.$on('inicializarCampos', function(event, data){
    console.log("----------------------------------");
    console.log(event);
    console.log(data);
    console.log("----------------------------------");
    $scope.recuperarSerializarInfo($rootScope.datosTiendaVirtual);
  });

  $scope.recuperarSerializarInfo = function(data){
    console.log(data);
    if (data.length == 0){
      alert(111111)
      $scope.datos.f01_nombreTV = "";
      $scope.datos.f01_descripcionTV = "";
      $scope.datos.f01_categoria = "";//falta
      $scope.datos.f01_correoTV = "";
      $scope.datos.f01_pagwebAE = "";
      $scope.datos.f01_contactosAE = "";
      $scope.datos.f01_redessocialesAE = "";
      $scope.datos.f01_ofertasAE = "";
      $scope.$apply();

    } else {
      alert(222222)
      $scope.datos.f01_nombreTV = data.tv_nombrec;
      $scope.datos.f01_descripcionTV = data.tv_descripcionc;
      $scope.datos.f01_categoria = data.tv_categoria;//falta
      $scope.datos.f01_correoTV = data.tv_correoc;
      $scope.datos.f01_pagwebAE = data.tv_pagina_webc;
      $scope.datos.f01_contactosAE = data.tv_contactosc;
      $scope.datos.f01_redessocialesAE = data.tv_redesc;
      $scope.datos.f01_ofertasAE = data.tv_ofertas;
      $scope.$apply();

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


  
  /*$scope.frmProducto = null;

  $scope.obtDatos      =   [];
  $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
  $scope.valida = 0;
  
  $rootScope.archivosProducto = new Array();

    /////////////////////////////////////////////////////////////////
    $scope.newProducto =function(){

      $scope.frmProducto = "mostrar";
      $scope.desabilitado = "";
      $scope.nuevo = true;
      document.getElementById("txt_f01_upload1").value  = '';
      document.getElementById("txt_f01_upload2").value  = '';
      document.getElementById("txt_f01_upload3").value  = '';

    }

    $scope.registrarProducto = function(data){
    $scope.mostrarTxt = false; 
    console.log(data);
      a = 0;
      angular.forEach($rootScope.archivosProducto, function(archivo, key) {
        console.log(archivo);
        archivoP = JSON.parse(archivo);
        console.log(key);
        if (a==0)
          f0 = archivoP.url;
        if (a==1)
          f1 = archivoP.url;
        if (a==2)
          f2 = archivoP.url;
        a = a + 1;
      });
      var datosProducto = new dataProducto();
      datosProducto.tramite = sessionService.get("IDTRAMITE");
      datosProducto.ae = sessionService.get("IDAE");
      datosProducto.categoria = data.f01_categoria;
      datosProducto.item = data.f01_item;
      datosProducto.nombre = data.f01_producto;
      datosProducto.descripcion = data.f01_descripcion;
      datosProducto.precio = data.f01_precio;
      datosProducto.telefono_referencia =  sessionService.get("CELULARAE");
      datosProducto.imagen_p = f0;
      datosProducto.imagen_a1 = f1;
      datosProducto.imagen_a2 = f2;
      datosProducto.oid_ciu = sessionService.get('IDCIUDADANO');
      datosProducto.usr = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
      datosProducto.crearProducto(function(response){
        console.log(response);
        results = JSON.parse(response);
        results = results.success;
        if(results.length > 0){
            $.unblockUI();
            $scope.refrescar();
            swal('', "Producto Registrado", 'success');
            $scope.limpiar();
        } else {
            $.unblockUI();
            swal('', "Producto no registrado", 'error');
        }
      });
      
    }

   

  $scope.actualizarProducto = function(data){
    f0 = data.txt_f01_upload1;
    f1 = data.txt_f01_upload2;
    f2 = data.txt_f01_upload3;
    angular.forEach($rootScope.archivosProducto, function(archivo, key) {
        archivoP = JSON.parse(archivo);
        if($scope.fileId == 'f01_upload1')
        f0 = archivoP.url;
        if($scope.fileId == 'f01_upload2')
        f1 = archivoP.url;
        if($scope.fileId == 'f01_upload3')
        f2 = archivoP.url;
       });

    var datosProducto = new dataProducto();
      datosProducto.id = $scope.prd_id;
      datosProducto.nombre = data.f01_producto;
      datosProducto.descripcion = data.f01_descripcion;
      datosProducto.precio = data.f01_precio;
      datosProducto.ae = $scope.aeAct;
      datosProducto.sucursal = $scope.sucursal;
      datosProducto.marca = "MARCA";
      datosProducto.categoria = data.f01_categoria;
      datosProducto.imagen_p = f0;
      datosProducto.imagen_a1 = f1;
      datosProducto.imagen_a2 = f2;
      datosProducto.oid_ciu = sessionService.get('IDCIUDADANO');
      datosProducto.telefono_referencia = "74086316";
      datosProducto.usr = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
      datosProducto.modificarMiProducto(function(response){
      results = JSON.parse(response);
      results = results.success;
      if(results.length > 0){
          $.unblockUI();
          $scope.refrescar();
          swal('', "Producto Modificado", 'success');
      } else {
          $.unblockUI();
          swal('', "Producto no Modificado", 'error');
      }
    });
 }
$scope.obtenerContribuyente = function(){
    var tipoContribuyente = sessionService.get('TIPO_PERSONA');
    if(tipoContribuyente == 'NATURAL'){
        ciDocumento          =   sessionService.get('CICIUDADANO');
        sAccion              =  'C01';
        nitDocumento = '';
    }else if(tipoContribuyente == 'JURIDICO'){
        nitDocumento         =   sessionService.get('NITCIUDADANO');
        sAccion              =  'C02';
        ciDocumento = '';
    }
    var conGenesis  =   new gLstDatos();
    conGenesis.idContribuyente = "";
    conGenesis.clase="";
    conGenesis.padron="";
    conGenesis.identificacion=ciDocumento;//'40852017'
    conGenesis.primerNombre="";
    conGenesis.primerApellido="";
    conGenesis.segundoApellido="";
    conGenesis.nit=nitDocumento;
    conGenesis.empresa="";
    conGenesis.p_accion=sAccion;
    conGenesis.lstDatosContribuyente(function(resultado){
        resultadoApi = JSON.parse(resultado);
        if (resultadoApi.success) {
            var response    =   resultadoApi;
            $scope.txtMsgConexionGen    =   "";
            if(response.success.dataSql.length > 0){
                $scope.dataGenesisCidadano  =   response.success.dataSql;
            } else {
               
                $scope.dataGenesisCidadano  =  '';
            }
        } else {
            $scope.txtMsgConexionGen    =   "Se ha producido un problema de conexion al cargar los datos";
            $.unblockUI();
            //swal(resultadoApi.error.message);
        }
    });
};

$scope.listadoActividadesEconomicas = function () {
    $scope.datos.rdTipoTramite = "RENOVACION";            
    var tipoPersona     =   sessionService.get('TIPO_PERSONA');
    var idContribuyente =   $scope.dataGenesisCidadano[0].idContribuyente;
    var contribuyente   =   new gLstActividadEconomica();
    contribuyente.idContribuyente   =   idContribuyente;
    contribuyente.tipo  =   'N'; //N para natural y J para Juridico
    contribuyente.lstActividadEconomica(function(resultado){ 
        $.unblockUI(); 
        resultadoApi = JSON.parse(resultado);
        if (resultadoApi.success) {
            //listado de Actividades Economicas
            var response    =   resultadoApi;
            if(response.success.dataSql.length > 0){
                $scope.trmUsuario = response.success.dataSql;
            } 
        } else {
             swal('', "Datos no Encontrados !!!", 'warning');
        }
        }); 
};
$scope.cargarDatos = function(ae,s){
    $scope.sucursal = parseInt(s);
    $scope.aeAct = parseInt(ae.prod_aec);
    document.getElementById("f01_ae").value = $scope.aeAct;
    document.getElementById("f01_sucursal").value = $scope.sucursal;
        

}   
$scope.muestraDatos = function(ae,s){
    $scope.mostrarTxt = false; 
   var aeS = JSON.stringify(ae);
   var aeS1 = JSON.parse(aeS);
   for(i=0;i<=aeS1.length-1;i++){
       if(s == aeS1[i].IdActividad){
         var suc =   aeS1[i].Nro;
         var aeUp =  aeS1[i].IdActividad;
         $scope.sucursal = parseInt(suc);
         $scope.aeAct = parseInt(aeUp);
         document.getElementById("f01_ae").value = $scope.aeAct;
         document.getElementById("f01_sucursal").value = $scope.sucursal;
        
       }
   }
}*/

  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try{ 
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  } catch (e) { console.log("error", e); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
};