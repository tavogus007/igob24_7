function pagosAEController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
    $scope.desabilitado=""
    $scope.tablaContactos = {};
    $scope.tablaRedesSociales = {};
    $scope.tablaOfertas = {};
    $scope.ws_publicado=false;
    $rootScope.conWeb = false;

    
    var clsIniciarCamposInternet = $rootScope.$on('inicializarPagina', function(event, data){
      $scope.inicioPaginaWeb();
      alert('CARGANDO DATOS');
    });

    $scope.inicioPaginaWeb = function () {
      $scope.nombre_tienda = $rootScope.datosTiendaVirtual[0].tv_nombrec;
      $scope.descrip_pagina = $rootScope.datosTiendaVirtual[0].tv_descripcionc;
      $scope.correo_tienda = $rootScope.datosTiendaVirtual[0].tv_correoc;
      $scope.pag_web_privada = $rootScope.datosTiendaVirtual[0].tv_pagina_webc;
      $scope.desabilitado = "disabled";
      $scope.getPagina();
      $scope.getProductos(sessionService.get('IDTV'));
    };
    $scope.frmProducto = null;
  
    $scope.obtDatos      =   [];
    $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
    $scope.valida = 0;
    
    $rootScope.archivosProducto = new Array();
    $scope.getPagina = function(){
        $.blockUI();
        try{
          var datosPaginaWeb = new dataPaginaWeb();
          datosPaginaWeb.web_id_ae = sessionService.get('IDAE');
          datosPaginaWeb.obtDataPaginaWeb(function(response){
            resultado = JSON.parse(response);
            $scope.obtDatos = resultado.success;
            console.log($scope.obtDatos);
            if ($scope.obtDatos.length == 0) {
              $scope.ws_publicado=false;
              document.getElementById('urlIndex').value = '';
              $scope.urlIndex = '';
              $rootScope.idPW = '';
              $rootScope.conWeb = false;
              $scope.chkPublicado = false;
            } else {
              $rootScope.conWeb = true;
              $rootScope.idPW = $scope.obtDatos[0].web_idc;
              if ($scope.obtDatos[0].web_estado_publicarc=='SI'){
                $scope.ws_publicado=true;
                document.getElementById('urlIndex').value = $scope.obtDatos[0].web_urlc;
                $rootScope.urlIndex = $scope.obtDatos[0].web_urlc;
                $scope.chkPublicado = true;
              } else {
                $scope.ws_publicado=false;
                document.getElementById('urlIndex').value = '';
                $scope.urlIndex = '';
                $scope.chkPublicado = false;
              }
            }
          });
        } catch(error){
          console.log(error);
        }
        $.unblockUI();
    };
    $scope.getProductos = function(usuario,id_ae){
      $.blockUI();
      try{
        var datosProducto = new dataProducto();
        datosProducto.idtv = id_ae;
        datosProducto.listarProductoTV(function(response){
          resultado = JSON.parse(response);
          $scope.obtDatos = resultado.success;
          $rootScope.productosPW = $scope.obtDatos;
        });
      } catch(error){
        console.log(error);
      }
      $.unblockUI();
    };
    $scope.verPagina = function(){
        $.blockUI();
        miVentana = window.open( $rootScope.urlIndex, "ventana1", "height=400,width=800,left=300,location=yes,menubar=no,resizable=no,scrollbars=yes,status=no,titlebar=yes,top=300" );
        $.unblockUI();
    };


    $scope.actualizarTVCeroPapel = function(estado){
      console.log($rootScope.datosTiendaVirtual);
        var uptTVCP = new tiendaVirtual();
        uptTVCP.id_ae = sessionService.get('IDAE');
        uptTVCP.estado = estado;
        uptTVCP.categoria = $rootScope.datosTiendaVirtual[0].pcattipo;
        uptTVCP.imagen = $rootScope.datosTiendaVirtual[0].plogotipo;
        uptTVCP.modificarTiendaVirtual(function(response){
          console.log("--------------");
          console.log(response);
          console.log("++++++++++++++");
        });
    }

    $scope.registrarPagina = function(url){
      $.blockUI();
      try{
        var datosPaginaWeb = new dataPaginaWeb();
        datosPaginaWeb.web_contenido = '<html>';
        datosPaginaWeb.web_url = url;
        datosPaginaWeb.web_usr =  sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
        datosPaginaWeb.web_id_ae = sessionService.get('IDAE');
        datosPaginaWeb.addPaginaWeb(function(response){
          resultado = JSON.parse(response);
          $rootScope.conWeb = true;
          $rootScope.idPW = resultado.success[0].sp_adicionar_pagina_web;
        });
      } catch(error){
        console.log(error);
      }
      $.unblockUI();  
    }
    $scope.modificarPagina = function(url, estado){
      $.blockUI();
      try{
        var datosPaginaWeb = new dataPaginaWeb();

        datosPaginaWeb.web_id = $rootScope.idPW;
        datosPaginaWeb.web_contenido = '<html>';
        datosPaginaWeb.web_url = url;
        datosPaginaWeb.web_estado_publicar = estado;
        datosPaginaWeb.web_usr =  sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
        datosPaginaWeb.web_id_ae = sessionService.get('IDAE');
        console.log(datosPaginaWeb);
        datosPaginaWeb.updPaginaWeb(function(response){
          resultado = JSON.parse(response);
          console.log(resultado);
          $scope.obtDatos = resultado.success;
          $rootScope.productosPW = $scope.obtDatos;
          console.log($scope.obtDatos);
          $scope.actualizarTVCeroPapel(estado);
        });
      } catch(error){
        console.log(error);
      }
      $.unblockUI();  
    }
    $scope.cambioEstadB = function(dato){
      if ($rootScope.conWeb == true) {
        if ($scope.chkPublicado == false) {
          $scope.ws_publicado = true;
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
              },
              success:function(response){
                  $rootScope.urlIndex = response;
                  document.getElementById('urlIndex').value = response;
                  $scope.modificarPagina(response,'SI');
              }
          });
        } else {
          $scope.ws_publicado = false;
          document.getElementById('urlIndex').value = "";
          response = '';
          $scope.modificarPagina(response,'NO');
        }
      } else {
        if ($scope.chkPublicado == false) {
          $scope.ws_publicado = true;
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
              },
              success:function(response){
                  $rootScope.urlIndex = response;
                  document.getElementById('urlIndex').value = response;
                  $scope.registrarPagina(response);
              }
          });
        } else {
          $scope.ws_publicado = false;
          document.getElementById('urlIndex').value = "";
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