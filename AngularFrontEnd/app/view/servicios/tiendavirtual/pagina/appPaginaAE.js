function pagosAEController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
  $scope.desabilitado=""
  $scope.tablaContactos = {};
  $scope.tablaRedesSociales = {};
  $scope.tablaOfertas = {};
  
  $scope.inicioTiendaVirtual = function () {
      /*$scope.update = false;
      $scope.nuevo = false;
      $scope.mostrarTxt = false; */
  };
  
  $scope.frmProducto = null;

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