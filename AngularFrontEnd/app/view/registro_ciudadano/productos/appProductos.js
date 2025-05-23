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
      $scope.obtenerContribuyente();
      $scope.listadoActividadesEconomicas();
      $scope.update = false;
      $scope.nuevo = false;
      $scope.mostrarTxt = false; 
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
    $scope.limpiar();
    $scope.titulo="Registrar Productos";
    $scope.update = false;
    $scope.nuevo = true;
 }
 $scope.limpiar = function(){
    $scope.datos = [''];
    document.getElementById("f01_ae").value = -1;
    document.getElementById("f01_sucursal").value = '';
    document.getElementById("txt_f01_upload1").value  = '';
    document.getElementById("txt_f01_upload2").value  = '';
    document.getElementById("txt_f01_upload3").value  = '';

}
  $scope.delProducto = function(datos){
      var datosDelProducto = new dataProducto();
      datosDelProducto.prd_idc = datos.prd_idc;
      datosDelProducto.eliminaMisProductos(function(response){
      resultado = JSON.parse(response);
      $scope.refrescar();
      });      
  } 
  $scope.updProducto = function(datosE){
    $scope.mostrarTxt = true;  
    $scope.datosP = datosE;
    $scope.prd_id= datosE.prd_idc;
    $scope.update = true;
    $scope.nuevo = false;
    $scope.titulo = "Modificación de Productos";

    $scope.datos = [];
    $scope.datos.f01_producto = $scope.datosP.prd_nombrec;
    $scope.datos.f01_categoria = $scope.datosP.prd_categoriac;
    
    $scope.cargarDatos($scope.datosP,$scope.datosP.prod_aec);
    $scope.datos.f01_ae = $scope.aeAct;
    //$scope.datos.f01_sucursal =   $scope.datosP.prod_sucursalc;

    document.getElementById("f01_sucursal").value = $scope.datosP.prod_sucursalc;
    $scope.datos.f01_descripcion = $scope.datosP.prd_descripcionc;
    $scope.datos.f01_precio = $scope.datosP.prd_precioc;
    $scope.datos['txt_f01_upload1'] = $scope.datosP.prd_imagen_pc;
    $scope.datos['txt_f01_upload2'] = $scope.datosP.prd_imagen_a1c;
    $scope.datos['txt_f01_upload3'] = $scope.datosP.prd_imagen_a2c;
 
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
}

  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try{ 
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  } catch (e) { console.log("error", e); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};