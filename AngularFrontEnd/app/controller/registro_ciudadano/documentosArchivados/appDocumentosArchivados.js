app.controller('documentosArchivadosController', function ($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload) {
  var fecha= new Date();
  var fechactual=fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
  var size = 10;
  var direccionvirtual= "";
  $scope.btnCrear=false;
  $scope.btnSubir=false;
  $scope.clase22='col-md-12';
  var tree;
  var rawTreeData2=[];
  $scope.tablaDocumentos        =   {};
  $scope.obtDatos      =   [];
      var fechactualnuevoformasto=fecha.getDate() + "/" +fecha.getMonth() + "/" + fecha.getFullYear() + " - " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
  $scope.mensajeVencido = function(){
    sweet.show('Archivo Vencido', 'No se puede ver el archivo.', 'error');
  }
  /****************s1****************/
  $scope.getDocumento = function(usuario,sistema,proceso,ci_nodo){
    var resRoles = new reglasnegocio();
    resRoles.identificador = 'RCCIUDADANO_87';
    //resRoles.parametros = '{"sdoc_usuario":"' + usuario + '","sdoc_sistema":null,"sdoc_proceso":"' + proceso + '","sdoc_ci_nodo":"' + ci_nodo + '"}';
    resRoles.parametros = '{"sdoc_usuario":"' + usuario + '","sdoc_sistema":"' + sistema + '","sdoc_proceso":"' + proceso + '","sdoc_ci_nodo":"' + ci_nodo + '"}';
    $.blockUI();
    resRoles.llamarregla(function(response){
      $scope.obtDatos = JSON.parse(response);
      if ($scope.obtDatos == '[]' || $scope.obtDatos == '[{}]' || $scope.obtDatos == '[{ }]' || $scope.obtDatos == ' ' || $scope.obtDatos == '') {
          sweet.show('','No existen datos','warning');
          $.unblockUI();
      } else{
            var data = response;   //grabamos la respuesta para el paginado
            $scope.tablaDocumentos.reload();
            $.unblockUI();
        };
      });
  };
  /**********************************/
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

  $scope.ImprimirProforma = function (fum) {
      $scope.varSpin = true;
      $scope.RegistroFUM={
          registrado:'OK',
          mensaje:''
      };
      //var urlFum = CONFIG.SERVICE_SITOLext + 'DesplegarFum?fum=' + fum;
      //var urlFum = CONFIG.SERVICE_SITOLext + 'DesplegarFum?q=' + fum;
      $('#visorFum object').attr("data",fum);
      $timeout(function(){$scope.varSpin=false}, 1000);
  };

  $scope.VistapreviaDoc = function (data){
     var url = data.vdoc_url_logica;
    $('iframe').attr("src", url);
  }

      $scope.enviarr = function(data){
        var objs = JSON.parse($scope.envios.vdoc_datos);
        var enlace= $scope.envios.vdoc_url_logica;
        mensaje=objs;
        var array = {};
        array['detalle'] =data.vDescripcion;
        var vatr='{\"detalle\":\"fsara\"}';
        $.ajax({ 
            data:{
                  CT_TIPO_TRAMITE :"CORR",
                  CT_TIP_HOJA:'V',
                  //CT_ORIGEN :data.vdoc_a,
                  CT_ORIGEN :data.viduo,
                  CT_HOJA_ASUNTO :data.vAsunto,
                  CT_FOJAS :"0",
                  CT_DESCRP :data.vDescripcion,
                  CT_NODO_ID:$scope.datanombre,
                  ARRAY:JSON.stringify(array),
                  ACT_ID:15,
                  OBSERVACION:"INFORME DE ENVIO",
                  URL:$scope.envios.vdoc_url_logica,
                  TIPO_DOCUMENTO:"INFORME",
                  CT_FEC_ENVIO:fechactualnuevoformasto,
                  CT_FEC_HOJA:fechactualnuevoformasto,
                  CT_FEC_RECEPCION:fechactualnuevoformasto,
                  CT_USR_ENVIO:$scope.datauser,
                  CT_USR_RECEPCION:$scope.datauser,
                  USER_LOGGED:$scope.datauid,
                  CT_NRO_COPIA:"ORIGINAL",
                  CT_NODO:$scope.valoruo
                  } ,           
            url: 'http://192.168.5.243:8080/sysworkflow/es/ae/p247/services/WSCorrespondenciaAdjuntos.php',
            type: 'post', 
            beforeSend: function () { 
                 //$("#resultado").html("Procesando, espere por favor..."); 
            }, 
            success: function (response) { 
                 $scope.datosRol1="";
                 $scope.registroEnvio($scope.envios.vdoc_idd);
            }
        });
      };

    $scope.refrescar = function(){
        $scope.getDocumento(sessionService.get('IDCIUDADANO'),'DMS',null,null);
    };

    $scope.inicioDocumentosArchivados = function () {
        $scope.getDocumento(sessionService.get('IDCIUDADANO'),'DMS',null,null);
    };

});