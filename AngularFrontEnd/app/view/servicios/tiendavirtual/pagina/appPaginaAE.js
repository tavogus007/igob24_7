function pagosAEController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
    $scope.desabilitado=""
    $scope.tablaContactos = {};
    $scope.tablaRedesSociales = {};
    $scope.tablaOfertas = {};
  
    
    var clsIniciarCamposInternet = $rootScope.$on('inicializarPagina', function(event, data){
      $scope.inicioPaginaWeb();
    });
    $scope.inicioPaginaWeb = function () {
      $scope.nombre_tienda = $rootScope.datosTiendaVirtual[0].tv_nombrec;
      $scope.descrip_pagina = $rootScope.datosTiendaVirtual[0].tv_descripcionc;
      $scope.correo_tienda = $rootScope.datosTiendaVirtual[0].tv_correoc;
      $scope.pag_web_privada = $rootScope.datosTiendaVirtual[0].tv_pagina_webc;
      $scope.desabilitado = "disabled";
      /*$scope.update = false;
      $scope.nuevo = false;
      $scope.mostrarTxt = false; */
    };
    $scope.frmProducto = null;
  
    $scope.obtDatos      =   [];
    $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
    $scope.valida = 0;
    
    $rootScope.archivosProducto = new Array();
    $scope.getProductos = function(usuario,id_ae){
        $.blockUI();
        try{

          var datosProducto = new dataProducto();
          datosProducto.idtv = id_ae;
          datosProducto.listarProductoTV(function(response){
            resultado = JSON.parse(response);
            $scope.obtDatos = resultado.success;
            console.log($scope.obtDatos);
            $rootScope.productosPW = $scope.obtDatos;
          });
        } catch(error){
          console.log(error);
        }
        $.unblockUI();
    };


    $scope.verPagina = function(){
        $.blockUI();
        console.log($rootScope.urlIndex);
        miVentana = window.open( $rootScope.urlIndex, "ventana1", "height=400,width=700,left=300,location=yes,menubar=no,resizable=no,scrollbars=yes,status=no,titlebar=yes,top=300" );
        $.unblockUI();
    };

    $scope.cambioEstadB = function(dato){
      console.log("-------------------------");
      console.log(dato);
      console.log($rootScope.datosTiendaVirtual);
      var re = /}","{/gi;
      var str = JSON.stringify($rootScope.datosTiendaVirtual[0].tv_contactosc);
      var newstr = str.replace(re, "},{");
      newstr = newstr.replace('["{', '[{');
      newstr = newstr.replace('}"]', '}]');
      re = /\\"/gi;
      newContactos = newstr.replace(re, '"');

      re = /}","{/gi;
      str = JSON.stringify($rootScope.datosTiendaVirtual[0].tv_ofertas);
      newstr = str.replace(re, "},{");
      newstr = newstr.replace('["{', '[{');
      newstr = newstr.replace('}"]', '}]');
      re = /\\"/gi;
      newOfertas = newstr.replace(re, '"');

      re = /}","{/gi;
      str = JSON.stringify($rootScope.datosTiendaVirtual[0].tv_redesc);
      newstr = str.replace(re, "},{");
      newstr = newstr.replace('["{', '[{');
      newstr = newstr.replace('}"]', '}]');
      re = /\\"/gi;
      newRedes = newstr.replace(re, '"');
      console.log(JSON.stringify($rootScope.productosPW));
      console.log($rootScope.productosPW);
      console.log("-*-*-*-*-*-*-*-*-*-*-");
      $.ajax({
          url:CONFIG.API_URL_DMS_HTML+'elaborarPdf/elaborar/generadorHTML.php',
          type:"post",
          data:{
              "soid": sessionService.get('IDCIUDADANO'),
              "stitulo": $rootScope.datosTiendaVirtual[0].tv_nombrec,
              "sdescripcion": $rootScope.datosTiendaVirtual[0].tv_descripcionc,
              "scontactos": newContactos,
              "sofertas":  newOfertas,
              "sredes": newRedes,
              "spagina": $rootScope.datosTiendaVirtual[0].tv_pagina_webc,
              "scorreo": $rootScope.datosTiendaVirtual[0].tv_correoc,
              "sproductos": JSON.stringify($rootScope.productosPW),
              "stv": $rootScope.datosTiendaVirtual[0].tv_idc
              //"stv": sessionService.get('IDTV')
          },
          success:function(response){
              console.log(response);
              /*var urlData = response;
              $scope.urlIndex = urlData;*/
              $rootScope.urlIndex = response;
              document.getElementById('urlIndex').value = response;
              //$scope.InsertarDocumentoTv(response);
              /*
              $rootScope.datosEnv.declaracion_jurada = urlData;
              $scope.datos.declaracion_jurada = urlData;
              document.signupForm.btnFormLicencia.disabled=false;
              $scope.guardarDatos($rootScope.datosEnv);
              $.unblockUI();
              */
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