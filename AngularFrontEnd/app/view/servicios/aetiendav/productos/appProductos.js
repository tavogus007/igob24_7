function productosController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
  $scope.tablaDocumentos        =   {};
  $scope.frmProducto = null;

  $scope.obtDatos      =   [];
  $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
  $scope.valida = 0;
  
  $rootScope.archivosProducto = new Array();
  $scope.tblTramites        =   {};
  $scope.trmUsuario      =   [];

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
    $scope.newProducto =function(){
      $scope.frmProducto = "mostrar";
      $scope.desabilitado = "";
      $scope.nuevo = true;

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
      console.log(datosProducto);



      
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

    $scope.getProductos = function(usuario,id_ae){
        $.blockUI();
        try{
          var datosProducto = new dataProducto();
          datosProducto.oid = usuario;
          datosProducto.ae =  id_ae;
          datosProducto.lstMisProductosOIDAE(function(response){
            resultado = JSON.parse(response);
            $scope.obtDatos = resultado.success;
            if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
                $scope.tablaDocumentos = null;
                alertify.warning('No existen datos');  
            } else {
                var data = $scope.obtDatos;
                $scope.tablaDocumentos.reload();
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
      //$scope.getProductos(sessionService.get('IDCIUDADANO'),'1');
  };
  $scope.inicioDocumentosArchivados = function () {
      $scope.getProductos(sessionService.get('IDCIUDADANO'), sessionService.get('IDAE'));
      //$scope.obtenerContribuyente();
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
    //$scope.limpiar();
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
    $scope.frmProducto = "mostrar";
    $scope.desabilitado = "disabled";

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
    var dataGenesis       = ((typeof($rootScope.datosGenesis)    == 'undefined' || $rootScope.datosGenesis == null) ? {}  : $rootScope.datosGenesis); 
    var tipoPersona     =   sessionService.get('TIPO_PERSONA');
    var dataGenesis       = ((typeof($scope.dataGenesisCidadano)    == 'undefined' || $scope.dataGenesisCidadano == null) ? {}  : $scope.dataGenesisCidadano);
    var sNumeroRegistros  = dataGenesis.length;
    var idContribuyente =   $rootScope.datosGenesis[0].idContribuyente;
    var contribuyente   =   new gLstActividadEconomica();
    contribuyente.idContribuyente   =   idContribuyente;
    contribuyente.tipo  =   'N';
    contribuyente.lstActividadEconomica(function(resultado){ 
        $.unblockUI(); 
        var resultadoApi = JSON.parse(resultado);
        if (resultadoApi.success) {
            $scope.formDatosAE  =   true;
            $scope.mostrarMsgActividadTrue  = true;
            $scope.mostrarMsgActividadFalse = false;
            var response    =   resultadoApi;
            $scope.trmUsuario = response.success.dataSql;
            var data = response.success.dataSql;
            $scope.tblTramites.reload(); 
            $scope.desabilitado = true;  
        } else {
            $scope.mostrarMsgActividadTrue  = false;
            $scope.mostrarMsgActividadFalse = true;                        
            $scope.formDatosAE  =   false;
            $scope.desabilitado = true;
            swal('', "Datos no Encontrados !!!", 'warning');
        }

        var sformguardado   =   $scope.datos.INT_FORM_ALMACENADO;
        if(typeof sformguardado == 'undefined' || sformguardado != 'G'){
            $scope.botones = null;
            $scope.desabilitado = true;                   
            swal('', "Favor revisar la información y seleccionar la Actividad Economica que desea registrar.", 'warning');                    
        }else{

            //$scope.botones = "mostrar";
            //$scope.desabilitado = false;
        }
    });
      
  };

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
                codhojaruta = resultadoApi.success.dataSql.datosAE[0].hojaRuta;
                var response = resultadoApi.success.dataSql.datosAE;
                var lstPublicidad = resultadoApi.success.dataSql.datosVIAE;
                if(response.length > 0){
                    if(response[0].numeroOrden == 0 || response[0].numeroOrden == null || response[0].numeroOrden == 'null'){
                        response[0].numeroOrden = 0;
                        $scope.nroOrdenActividiadEconomicaActual  =  response[0].numeroOrden;
                        $scope.datos.f01_nro_orden = response[0].numeroOrden;
                    }
                    else{
                        $scope.nroOrdenActividiadEconomicaActual  =  response[0].numeroOrden;
                        $scope.datos.f01_nro_orden = response[0].numeroOrden;
                    }
                    $scope.idContribuyenteAEActual  =    response[0].idContribuyente;
                    $scope.datos.f01_id_contribuyente = response[0].idContribuyente;
                   
                    var hinicio     =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                    var hfinal      =   ((typeof(response[0].horarioAtencion) == 'undefined' || response[0].horarioAtencion == null) ? ""   : response[0].horarioAtencion.toUpperCase());
                    var smacro      =   "MACRODISTRITO";
                    var smacrodes = "";
                    var szona       =   "DISTRITO";



                    //DATOS DE LA ACTIVIDAD ECONÓMICA
                    $scope.datos.f01_raz_soc   =   response[0].denominacion;
                    $scope.datos.f01_sup  =   response[0].superficie;
                    $scope.datos.f01_cap_aprox   =   response[0].capacidad;
                   
                    try{
                        smacrodes      =   smacro  +   " " +    response[0].IdMacrodistrito + " " + response[0].Macrodistrito;
                        hinicio     =   hinicio.split('-')[0].trim();
                        hfinal      =   hfinal.split('-')[1].trim();
                    }catch(e){}
                    if(response[0].IdMacrodistrito == 2 || response[0].IdMacrodistrito == '2'){
                       smacrodes      =   smacro  +   " " +    response[0].IdMacrodistrito + " MAXIMILIANO PAREDES";
                    }
                    if(response[0].IdMacrodistrito == 4 || response[0].IdMacrodistrito == '4'){
                       smacrodes      =   smacro  +   " " +    response[0].IdMacrodistrito + " SAN_ANTONIO";
                    }
                    if(response[0].establecimiento =='ALQUI'){
                        $scope.datos.f01_estab_es = "ALQUILADO";
                    }
                    if(response[0].establecimiento =='PROPI'){
                        $scope.datos.f01_estab_es = "PROPIO";
                    }
                    if(response[0].establecimiento =='ANTIC'){
                        $scope.datos.f01_estab_es = "ANTICRÉTICO";
                    }
                    if(response[0].establecimiento =='OTRO'){
                        $scope.datos.f01_estab_es = "OTRO";
                    }
                    $scope.datos.f01_tip_act = response[0].tipoActividad;
                    if(response[0].tipoActividad =='MA' || response[0].tipoActividad =='MATRI'){
                        $scope.datos.f01_tip_act_dec = 'MATRIZ';
                        $scope.datos.f01_tip_act = 'MA';
                    }
                    if(response[0].tipoActividad =='SU' || response[0].tipoActividad =='SUCUR'){
                        $scope.datos.f01_tip_act_dec = 'SUCURSAL';
                        $scope.datos.f01_tip_act = 'SU';
                    }
                    /*DATOS DE LA ACTIVIDAD*/
                    $scope.datos.f01_num_pmc = response[0].padron;
                    $scope.datos.f01_raz_soc = response[0].denominacion;
                    $scope.datos.f01_sup = response[0].superficie;
                    $scope.datos.f01_de_hor = hinicio;
                    $scope.datos.f01_a_hor = hfinal;
                    $scope.datos.f01_nro_actividad = response[0].numeroActividad;
                    $scope.datos.f01_productosElaborados = response[0].productosElaborados;
                    $scope.datos.f01_actividadesSecundarias = response[0].actividadesSecundarias;
                    /*TIPO LICENCIA*/
                    $scope.datos.f01_tipo_lic = response[0].idTipoLicencia;
                    $scope.datos.f01_categoria = response[0].idactividad_desarrollada343;
                    $scope.datos.f01_categoria_agrupada = response[0].idActividadDesarrollada;
                    $scope.datos.f01_categoria_descrip = response[0].desc_desarrollada;
                     $scope.datos.f01_tipo_lic_descrip = response[0].descripcion;
                    $scope.datos.f01_categoria_agrupada_descrip = response[0].ActividadDesarrollada;
                    $scope.datos.f01_categoria_agrupada_descripcion = response[0].actividad_desarrollada343;
                    
                    $scope.datos.INT_AC_MACRO_ID = response[0].IdMacrodistrito;
                    $scope.datos.f01_macro_act = response[0].IdMacrodistrito;
                    $scope.datos.f01_macro_act_descrip = smacrodes;
                    $scope.datos.INT_AC_DISTRITO = response[0].idDistrito_actividadEconomica;
                    $scope.datos.f01_dist_act          = response[0].idDistrito_actividadEconomica;
                    $scope.datos.INT_AC_ID_ZONA = response[0].id_zona_ActividadEconomica;
                    $scope.datos.INT_ID_ZONA = response[0].id_zona_ActividadEconomica;
                    $scope.datos.f01_zona_act = response[0].id_zona_ActividadEconomica;
                    $scope.datos.f01_zona_act_descrip = response[0].zona;
                    $scope.datos.f01_tip_via_act = response[0].tipoVia;
                    $scope.datos.f01_num_act = response[0].via;
                    $scope.datos.f01_num_act1 = response[0].numero;
                    $scope.datos.f01_edificio_act = response[0].edificio;
                    $scope.datos.f01_bloque_act = response[0].bloque;
                    $scope.datos.f01_piso_act = response[0].piso;
                    $scope.datos.f01_dpto_of_loc = response[0].departamento;
                    $scope.datos.f01_tel_act1 = response[0].telefono;
                    $scope.datos.f01_casilla = response[0].casilla;
                    $scope.datos.f01_factor          =  response[0].tipoTrayecto;
                    $scope.distritoZonas(smacrodes);
                    $scope.actulizarIdDistrito(response[0].zona);


                    if(response[0].idactividad_desarrollada343 == '0' || response[0].idactividad_desarrollada343 == 0){
                      $scope.LicenciaXCategoriaA(response[0].idActividadDesarrollada)  
                    }

                    if(response[0].edificio == 'undefined' || response[0].bloque == 'undefined' || response[0].piso == 'undefined' || response[0].departamento == 'undefined' || response[0].telefono == 'undefined'){
                        response[0].edificio = '';
                        response[0].bloque = '';
                        response[0].piso = '';
                        response[0].departamento = '';
                        response[0].telefono = '';
                    }
                    $scope.datos.f01_tipo_lic_ant = response[0].descripcion;
                    $scope.datos.f01_categoria_agrupada_ant = response[0].actividadesSecundarias;
                    $scope.datos.f01_categoria_descrip_ant = response[0].ActividadDesarrollada;
                    $scope.cargarNombVia($scope.datos.f01_tip_via_act, $scope.datos.f01_zona_act);
                    $scope.getDatosLotus(resultadoApi.success.dataSql.datosAE[0].idActividadEconomica,codhojaruta);
                    $scope.desabilitado = false; 
                    $scope.botones = "mostrar";

                }
                //$rootScope.$broadcast('inicializarCamposInternet', $scope.datos);
            }else{
                swal('', "Datos no Encontrados !!!", 'warning');
            }
        });
    };  

    $scope.getDatosLotus = function(idadcteco, hojar){
        $scope[name] = 'Running';
        var deferred = $q.defer();
        try{
            var datosLotus = new getDatosAELotus();                        
            datosLotus.caso = hojar;
            datosLotus.idActividad = idadcteco;
            datosLotus.getDatosAE_Lotus(function(respuesta){
                $scope.resultadoLotus = JSON.parse(respuesta);
                $scope.resultadoCP = $scope.resultadoLotus.success.data[0].datos;
                $scope.datos.INT_AC_latitud = $scope.resultadoCP.INT_AC_latitud;
                $scope.datos.INT_AC_longitud = $scope.resultadoCP.INT_AC_longitud;
                //$scope.datos.f01_tipo_lic_descrip = $scope.resultadoCP.f01_tipo_lic_descrip;
                //$scope.datos.f01_categoria_agrupada_descrip = $scope.resultadoCP.f01_categoria_agrupada_descrip;
                //$scope.datos.f01_categoria_agrupada_descripcion = $scope.resultadoCP.f01_categoria_agrupada_descripcion;
                $scope.datos.f01_casilla = $scope.resultadoCP.f01_casilla;
                $scope.datos.f01_num_act =  $scope.resultadoCP.f01_num_act;
                $scope.datosAntMulti = $scope.resultadoLotus.success.data[0].datos.licencia_multiple;
                $q.all($scope.resultadoLotus).then(function(data){
                    deferred.resolve($scope.resultadoLotus);
                })
            });
        }catch(e){
            $scope.exito = "NO";
            $q.all($scope.resultadoLotus).then(function(data){
                deferred.resolve($scope.resultadoLotus);
            });
        }
        return deferred.promise;   
    } 

    $scope.LicenciaXCategoriaA = function(idDesarrollada){
        //$scope.$apply();
        try{
                var tipo = new categoriaagrupadalicenciades();
                tipo.dependencia = idDesarrollada;
                tipo.categoriaagrupadalicencia_des(function(res){
                    $scope.datosActividadLicencia = "";
                    x = JSON.parse(res);
                    response = x.success.data;
                    if(response.length > 0){
                        console.log("response Licencia:: ",response);
                        $scope.datosActividadLicencia = response;
                        $scope.datos.f01_categoria_agrupada = response[0].catagrpuid; 
                        $scope.datos.f01_categoria_agrupada_dem = response[0].idcategoriaagrupada;
                        $scope.datos.f01_categoria_agrupada_descrip = response[0].idcategoriaagrupada;
                        
                        
                    }else{
                        $scope.msg = "Error !!";
                    }
                });
        }catch(e){
                console.log("Error en la actividad desarrollada");
        }
                       
        //$scope.GetValueZonaSegura($scope.datos.f01_categoria_agrupada);
    }


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