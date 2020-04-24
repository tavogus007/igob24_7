function productosController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload) {
  $scope.tablaDocumentos        =   {};
  $scope.obtDatos      =   [];
  $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
  $scope.valida = 0;


  $scope.getDocumento = function(usuario,sistema,proceso,ci_nodo){
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