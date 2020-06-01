function productosController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
  $scope.tablaDocumentos        =   [];
  $scope.frmProducto = null;

  $scope.obtDatos      =   [];
  $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
  $scope.valida = 0;
  
  $rootScope.archivosProducto = new Array();


  var clsIniciarCamposInternet = $rootScope.$on('inicializarProdutos', function(event, data){
    $scope.getProductos(sessionService.get('IDCIUDADANO'), sessionService.get('IDTV'));

  });
  $scope.recuperarSerializarProd = function(data){
    $scope.getProductos(sessionService.get('IDCIUDADANO'), sessionService.get('IDTV'));
  }
  $scope.inicioProductos = function () {
      $scope.recuperarSerializarProd($rootScope.datosTiendaVirtual);
      $scope.update = false;
      $scope.nuevo = false;
      $scope.mostrarTxt = false; 
  };


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
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/"  + sessionService.get('IDTV') +"/";
        $.blockUI();
        if( $rootScope.swArchivo == 'A'){
          angular.forEach(aArchivos, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
              if (idFiles[key]==1){
                var descDoc = "img_pr";
                var descArchivo = "img_principal";
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
              var nombreNuevo = descArchivo +"_"+ fechaNueva +'.'+ imagenFile[1];
              $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + sessionService.get('IDTV') +'/'+ nombreNuevo + "?app_name=todoangular";
              fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
              document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
              /*var filecompress = compressImage(archivo).then(function(respuestaFile){
                  var imagenFile = respuestaFile.name.split('.');
                  var tipoFile = imagenFile[1];
                  var nombreNuevo = descDoc + '_'+fechaNueva+'.'+tipoFile;
                  $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevo + "?app_name=todoangular";
                  fileUpload1.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
                  document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
              });*/
              var uploadUrlA = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/"  + sessionService.get('IDTV') +'/' + nombreNuevo + "?app_name=todoangular";
              var myJSON = '{ "url":"' + uploadUrlA + '", "campo":"' + nombreNuevo + '", "nombre":"' + descArchivo + '" }';
              $rootScope.archivosProducto.push(myJSON);
            } else {
            }
          });
        } else {
          angular.forEach(aArchivos, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
              if (idFiles[key]==1){
                var descDoc = "img_pr";
                var descArchivo = $rootScope._f01_upload1;
              }
              if (idFiles[key]==2){
                var descDoc = "img_aux1";
                var descArchivo = $rootScope._f01_upload2;
              }
              if (idFiles[key]==3){
                var descDoc = "img_aux2";
                var descArchivo = $rootScope._f01_upload3;
              }

              var imagenFile = archivo.name.split('.');;
              //var tipoFile = imagenFile[1];
              var nombreNuevo = descArchivo;
              $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + sessionService.get('IDTV') +'/'+ nombreNuevo + "?app_name=todoangular";
              fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
              document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
              /*var filecompress = compressImage(archivo).then(function(respuestaFile){
                  var imagenFile = respuestaFile.name.split('.');
                  var tipoFile = imagenFile[1];
                  var nombreNuevo = descDoc + '_'+fechaNueva+'.'+tipoFile;
                  $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevo + "?app_name=todoangular";
                  fileUpload1.uploadFileToUrl1(respuestaFile, uploadUrl, nombreNuevo);
                  document.getElementById('txt_f01_upload'+idFiles[key]).value = nombreNuevo;
              });*/
              var uploadUrlA = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/"  + sessionService.get('IDTV') +'/' + nombreNuevo + "?app_name=todoangular";
              var myJSON = '{ "url":"' + uploadUrlA + '", "campo":"' + nombreNuevo + '", "nombre":"' + descArchivo + '" }';
              $rootScope.archivosProducto.push(myJSON);
            } else {
            }
          });

        }
        
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
    /////////////////////////////////////////////////////////////////
    $scope.newProducto =function(){
      $scope.frmProducto = "mostrar";
      $scope.desabilitado = "";
      $scope.nuevo = true;
      $rootScope.nuevo = true;
      document.getElementById("txt_f01_upload1").value  = '';
      document.getElementById("txt_f01_upload2").value  = '';
      document.getElementById("txt_f01_upload3").value  = '';
      $rootScope.swArchivo = "A";

    }

    $scope.registrarProducto = function(data){
      $scope.mostrarTxt = false; 
      a = 0;
      angular.forEach($rootScope.archivosProducto, function(archivo, key) {
        archivoP = JSON.parse(archivo);
        if (a==0)
          f0 = archivoP.url;
        if (a==1)
          f1 = archivoP.url;
        if (a==2)
          f2 = archivoP.url;
        a = a + 1;
      });
      var datosProducto = new dataProducto();
      datosProducto.idtv = sessionService.get("IDTV");
      datosProducto.nombre = data.f01_producto;
      datosProducto.descripcion = data.f01_descripcion;
      datosProducto.precio = data.f01_precio;

      datosProducto.imagen_p = f0;
      datosProducto.imagen_a1 = f1;
      datosProducto.imagen_a2 = f2;
      datosProducto.oid_ciu = sessionService.get('IDCIUDADANO');
      datosProducto.usr = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
      datosProducto.crearProducto(function(response){
        results = JSON.parse(response);
        results = results.success;
        if(results.length > 0){
            $.unblockUI();
            $scope.refrescar();
            swal('', "Producto Registrado", 'success');
            $scope.limpiar();
            $scope.getProductos(sessionService.get('IDCIUDADANO'), sessionService.get('IDTV'));
            $rootScope.nuevo = null;
        } else {
            $.unblockUI();
            swal('', "Producto no registrado", 'error');
        }
      });
    }

    $scope.getProductos = function(usuario,id_ae){
        $.blockUI();
        try{

          var datosProducto = new dataProducto();
          /*datosProducto.oid = usuario;*/
          datosProducto.idtv = id_ae;

          datosProducto.listarProductoTV(function(response){
            resultado = JSON.parse(response);
            $scope.obtDatos = resultado.success;
            if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
                $scope.tablaDocumentos = null;
                alertify.warning('No existen datos'); 
                $scope.$apply(); 
            } else {
                var data = $scope.obtDatos;
                $scope.$apply(); 
            }
          });
        } catch(error){
          console.log(error);
        }
        $.unblockUI();
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
      $scope.getProductos(sessionService.get('IDCIUDADANO'), sessionService.get('IDTV'));
  };

  $scope.confirmarEliminar = function(datos){
    swal({
            title: "Estimado(a) Ciudadano(a)",
            text: "Está seguro(a) de eliminar el producto seleccionado?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: false
          },
          function(isConfirm) {
            if (isConfirm) {
                $scope.delProducto(datos);
                swal("Estimado(a) Ciudadano(a)", "El producto fue eliminado correctamente", "success");
            } else {
              swal("Estimado(a) Ciudadano(a)", "Se canceló la eliminación del Producto)", "error");
            }
          }); 
          $scope.btnEnvio = true;    
  }

  $scope.nuevaAsigSglUsr = function(){
    //$scope.limpiar();
    $scope.titulo="Registrar Productos";
    $scope.update = false;
    $scope.nuevo = true;
 }
 $scope.limpiar = function(){
    $scope.datos = [''];
    document.getElementById("txt_f01_upload1").value  = '';
    document.getElementById("txt_f01_upload2").value  = '';
    document.getElementById("txt_f01_upload3").value  = '';
    $scope.frmProducto = null;

}
  $scope.delProducto = function(datos){
      var datosDelProducto = new dataProducto();
      datosDelProducto.prd_idc = datos.prd_idc;
      datosDelProducto.eliminaMisProductos(function(response){
      resultado = JSON.parse(response);
      $scope.refrescar();
      });      
  } 
  $scope.updProducto = function(datosP){
    $scope.frmProducto = "mostrar";
    $scope.desabilitado = "";
    $scope.update = true;
    $scope.nuevo = false;    
    $rootScope.idProducto = datosP.prd_idc;
    document.getElementById("f01_producto").value = datosP.prd_productoc;
    document.getElementById("f01_descripcion").value = datosP.prd_descripcionc;
    document.getElementById("f01_precio").value = datosP.prd_precioc;
    //document.getElementById("f01_cantidad").value = datosP.prd_cantidadc;
    archivo1 = datosP.prd_imagen_pc.split('/');
    archi1 = archivo1[9].split('?');
    $rootScope._f01_upload1 = archi1[0];
    document.getElementById("txt_f01_upload1").value = $rootScope._f01_upload1;    
    archivo2 = datosP.prd_imagen_a1c.split('/');
    archi2 = archivo2[9].split('?');
    $rootScope._f01_upload2 = archi2[0];
    document.getElementById("txt_f01_upload2").value = $rootScope._f01_upload2;
    archivo3 = datosP.prd_imagen_a2c.split('/');
    archi3 = archivo3[9].split('?');
    $rootScope._f01_upload3 = archi3[0];
    document.getElementById("txt_f01_upload3").value = $rootScope._f01_upload3;
    $rootScope.swArchivo = "M";
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

/*
 var datosProducto = new dataProducto();
      datosProducto.idtv = sessionService.get("IDTV");
      datosProducto.nombre = data.f01_producto;
      datosProducto.descripcion = data.f01_descripcion;
      datosProducto.precio = data.f01_precio;
      datosProducto.cantidad = data.f01_cantidad;
      datosProducto.imagen_p = f0;
      datosProducto.imagen_a1 = f1;
      datosProducto.imagen_a2 = f2;
      datosProducto.oid_ciu = sessionService.get('IDCIUDADANO');
      datosProducto.usr = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');





//////////////////////////////



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



    */
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
}

  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try{ 
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  } catch (e) { console.log("error", e); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};