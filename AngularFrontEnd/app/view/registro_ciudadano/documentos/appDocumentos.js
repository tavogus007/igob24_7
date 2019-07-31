
function documentosController($scope, $timeout, CONFIG,$window,$rootScope, $location,LogGuardarInfo,$routeParams,registroLog,Data,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload) {
  $scope.tablaDocumentos        =   {};
  $scope.obtDatos      =   [];
  $scope.valida = 0;
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

  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try{ 
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  } catch (e) { console.log("error", e); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};