function pagosAEController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
    function toDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }
    $scope.desabilitado=""
    //$rootScope.datosAuxiliares = {};
    $scope.tablaContactos = {};
    $scope.tablaRedesSociales = {};
    $scope.tablaOfertas = {};
    $scope.ws_publicado=false;
    $rootScope.conWeb = false;
    var clsIniciarCamposInternet = $rootScope.$on('inicializarPagina', function(event, data){
      $scope.inicioPaginaWeb();
      //alert('CARGANDO DATOS');
    });


    $scope.dataAdicional = function () {
      $rootScope.datosAuxiliares = [];
      angular.forEach($rootScope.datosTiendaVirtual[0].tv_contactosc, function(contacto, key) {
        contactc = JSON.parse(contacto);
          if(contactc.tipo=="CELULAR"){
            if(contactc.estado=="CON WHATSAPP"){
              var myJSON = '{ "celular":"' + contactc.valor + '", "whatsapp":"SI" }';
              myJSON2 = JSON.parse(myJSON);
              $rootScope.datosAuxiliares.push(myJSON2);
            } else {
              var myJSON = '{ "celular":"' + contactc.valor + '", "whatsapp":"NO" }';
              myJSON2 = JSON.parse(myJSON);
              $rootScope.datosAuxiliares.push(myJSON2);
            }
          } else {
            if(contactc.estado=="FIJO"){
              var myJSON = '{ "telefono":"' + contactc.valor + '" }';
              myJSON2 = JSON.parse(myJSON);
              $rootScope.datosAuxiliares.push(myJSON2);
            } 
          }
      });
      myJSON = '{ "direccion":"' + $rootScope.direccionAe + '" }';
      myJSON2 = JSON.parse(myJSON);
      $rootScope.datosAuxiliares.push(myJSON2);

      myJSON = '{ "tipo_entrega":"' + $rootScope.datosTiendaVirtual[0].pforma_entrega + '" }';
      myJSON2 = JSON.parse(myJSON);
      $rootScope.datosAuxiliares.push(myJSON2);

    }
    $scope.inicioPaginaWeb = function () {
      $scope.nombre_tienda = $rootScope.datosTiendaVirtual[0].tv_nombrec;
      recDesc = $rootScope.datosTiendaVirtual[0].tv_descripcionc;
      recDesc = recDesc.replace(/<br ?\/?>/g, "\n");
      $scope.descrip_pagina = recDesc;
      $scope.correo_tienda = $rootScope.datosTiendaVirtual[0].tv_correoc;
      $scope.pag_web_privada = $rootScope.datosTiendaVirtual[0].tv_pagina_webc;
      logotipo = $rootScope.datosTiendaVirtual[0].plogotipo;
      logotipo = logotipo.replace('["{','[{');
      logotipo = logotipo.replace('}"]','}]');
      logotipo = logotipo.replace('}"{','}{');
      logotipo = logotipo.replace(/\\"/gi,'"');
      logo = JSON.parse(logotipo);
      urllogo = logo[0].url;
      toDataURL(urllogo, function(dataUrl) {
        $rootScope.urlLogotipo64 = dataUrl;
      });
      encabezado = $rootScope.datosTiendaVirtual[0].pencabezado;
      encabezado = encabezado.replace('["{','[{');
      encabezado = encabezado.replace('}"]','}]');
      encabezado = encabezado.replace('}"{','}{');
      encabezado = encabezado.replace(/\\"/gi,'"');
      enca = JSON.parse(encabezado);
      urlenca = enca[0].url;
      toDataURL(urlenca, function(dataUrl) {
        $rootScope.urlEncabezado64 = dataUrl;
      });
      catalogo = $rootScope.datosTiendaVirtual[0].tvcatalogo;
      catalogo = catalogo.replace('["{','[{');
      catalogo = catalogo.replace('}"]','}]');
      catalogo = catalogo.replace('}"{','}{');
      catalogo = catalogo.replace(/\\"/gi,'"');
      cata = JSON.parse(catalogo);
      urlcatalogo = cata[0].url;
      $rootScope.urlcatalogo = urlcatalogo;
      $scope.desabilitado = "disabled";
      $scope.getPagina();
      $scope.dataAdicional();
      $scope.getProductos();
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
            if ($scope.obtDatos.length == 0) {
              $scope.ws_publicado=false;
              document.getElementById('urlIndex').value = '';
              $rootScope.urlIndex = '';
              $rootScope.idPW = '';
              $rootScope.conWeb = false;
              $scope.chkPublicado = false;
            } else {
              $rootScope.conWeb = true;
              $rootScope.idPW = $scope.obtDatos[0].web_idc;
              if ($scope.obtDatos[0].web_estado_publicarc=='SI'){
                $scope.ws_publicado=true;
                $scope.chkPublicado = true;
                document.getElementById('urlIndex').value = $scope.obtDatos[0].web_urlc;
                $rootScope.urlIndex = $scope.obtDatos[0].web_urlc;
              } else {
                $scope.ws_publicado=false;
                $scope.chkPublicado = false;
                document.getElementById('urlIndex').value = '';
                $rootScope.urlIndex = '';
              }
            }
          });
        } catch(error){
          console.log(error);
        }
        $.unblockUI();
    };
    $scope.getProductos = function(){
      $.blockUI();
      try{
        var datosProducto = new dataProducto();
        datosProducto.idae = sessionService.get('IDAE');
        datosProducto.listarProductoTVPW(function(response){
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
        urlTexto = document.getElementById('urlIndex').value;
        if (urlTexto==""){
            swal('', "Página NO disponible", 'error');
        } else {
          miVentana = window.open( $rootScope.urlIndex, "ventana1", "height=400,width=800,left=300,location=yes,menubar=no,resizable=no,scrollbars=yes,status=no,titlebar=yes,top=300" );
        }
        $.unblockUI();
    };

    $scope.actualizarTVCeroPapel = function(estado){
        var uptTVCP = new tiendaVirtual();
        uptTVCP.id_ae = sessionService.get('IDAE');
        uptTVCP.estado = estado;
        uptTVCP.categoria = $rootScope.datosTiendaVirtual[0].pcattipo;
        logotipo = $rootScope.datosTiendaVirtual[0].plogotipo;
        logotipo = logotipo.replace('["{','[{');
        logotipo = logotipo.replace('}"]','}]');
        logotipo = logotipo.replace('}"{','}{');
        logotipo = logotipo.replace(/\\"/gi,'"');
        logo =JSON.parse(logotipo);
        uptTVCP.imagen = logo[0].url;
        uptTVCP.datosAuxiliares = JSON.stringify($rootScope.datosAuxiliares);
        uptTVCP.nombre = $rootScope.datosTiendaVirtual[0].tv_nombrec;
        uptTVCP.modificarTiendaVirtual(function(response){
          resultado = JSON.parse(response);
          if (resultado.success.data[0].regp_estado == 'SI') {
            swal('', "Página publicada en Sistema de Comercio GAMLP", 'success');
          } else {
            swal('', "Página NO publicada en Sistema de Comercio GAMLP", 'error');
          }
        });
        $.unblockUI();
    }

    $scope.registrarPagina = function(url, html){
      $.blockUI();
      try{
        var datosPaginaWeb = new dataPaginaWeb();
        datosPaginaWeb.web_contenido = html.replace(/'/gi,'\\"');
        datosPaginaWeb.web_url = url;
        datosPaginaWeb.web_usr =  sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
        datosPaginaWeb.web_id_ae = sessionService.get('IDAE');
        datosPaginaWeb.addPaginaWeb(function(response){
          resultado = JSON.parse(response);
          $scope.actualizarTVCeroPapel('SI');
          $rootScope.conWeb = true;
          $rootScope.idPW = resultado.success[0].sp_adicionar_pagina_web;
        });
      } catch(error){
        console.log(error);
      }
      $.unblockUI();  
    }
    $scope.modificarPagina = function(url, html, estado){
      $.blockUI();
      try{
        var datosPaginaWeb = new dataPaginaWeb();
        datosPaginaWeb.web_id = $rootScope.idPW;
        datosPaginaWeb.web_contenido = html.replace(/'/gi,'\\"');
        datosPaginaWeb.web_url = url;
        datosPaginaWeb.web_estado_publicar = estado;
        datosPaginaWeb.web_usr =  sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
        datosPaginaWeb.web_id_ae = sessionService.get('IDAE');
        datosPaginaWeb.updPaginaWeb(function(response){
          resultado = JSON.parse(response);
          $scope.actualizarTVCeroPapel(estado);
        });
      } catch(error){
        console.log(error);
      }
      $.unblockUI();  
    }
    $scope.cambioEstadB = function(dato){
      $.blockUI();
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
          str = JSON.stringify($rootScope.datosTiendaVirtual[0].tv_redesc);
          newstr = str.replace(re, "},{");
          newstr = newstr.replace('["{', '[{');
          newstr = newstr.replace('}"]', '}]');
          re = /\\"/gi;
          newRedes = newstr.replace(re, '"');
          ofertas = JSON.stringify($rootScope.productosPW),
          ofertas = ofertas.replace(/\n/g, "<br>");
          try { 
            horarios = $rootScope.datosTiendaVirtual[0].phorarios_atencion;
            horarios = horarios.replace('["{','[{');
            horarios = horarios.replace('}"]','}]');
            horarios = horarios.replace('}"{','}{');
            horarios = horarios.replace(/}","{/gi,'},{');
            horarios = horarios.replace(/\\"/gi,'"');
            newHorarios = horarios;
          } catch(error){
            newHorarios = "[]";
          }
          $.ajax({
              url:CONFIG.API_URL_DMS_HTML+'generadorHTML.php',
              type:"post",
              data:{
                  "soid": sessionService.get('IDCIUDADANO'),
                  "stitulo": $rootScope.datosTiendaVirtual[0].tv_nombrec,
                  "sdescripcion": $rootScope.datosTiendaVirtual[0].tv_descripcionc,
                  "scontactos": newContactos,
                  "sofertas": ofertas,
                  "sredes": newRedes,
                  "shorarios": newHorarios,
                  "spagina": $rootScope.datosTiendaVirtual[0].tv_pagina_webc,
                  "scorreo": $rootScope.datosTiendaVirtual[0].tv_correoc,
                  "sproductos": ofertas,
                  "stv": $rootScope.datosTiendaVirtual[0].tv_idc,
                  "sae": sessionService.get('IDAE'),
                  "slogo": $rootScope.urlLogotipo64,
                  "sencabezado": $rootScope.urlEncabezado64,
                  "smenu": $rootScope.urlcatalogo,
                  "sentrega" : $rootScope.datosTiendaVirtual[0].pforma_entrega
              },
              success:function(response){
                  if (response == 'error creando fichero'){
                    swal('', "Página NO publicada," + response, 'error');
                    $scope.ws_publicado = false;
                    $scope.chkPublicado == false;
                    document.getElementById('chkPublicado').checked = false;
                  } else {
                    resultado = JSON.parse(response);
                    $rootScope.urlIndex = resultado.url;
                    document.getElementById('urlIndex').value = resultado.url;
                    $scope.modificarPagina(resultado.url,resultado.html,'SI');
                  }
              }
          });
        } else {

          $scope.ws_publicado = false;
          document.getElementById('urlIndex').value = "";
          response = '';
          $scope.modificarPagina(response, '<html></html>', 'NO');
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
          
          str = JSON.stringify($rootScope.datosTiendaVirtual[0].tv_redesc);
          newstr = str.replace(re, "},{");
          newstr = newstr.replace('["{', '[{');
          newstr = newstr.replace('}"]', '}]');
          re = /\\"/gi;
          newRedes = newstr.replace(re, '"');
          ofertas = JSON.stringify($rootScope.productosPW),
          ofertas = ofertas.replace(/\n/g, "<br>");
          try { 
            horarios = $rootScope.datosTiendaVirtual[0].phorarios_atencion;
            horarios = horarios.replace('["{','[{');
            horarios = horarios.replace('}"]','}]');
            horarios = horarios.replace('}"{','}{');
            horarios = horarios.replace(/}","{/gi,'},{');
            horarios = horarios.replace(/\\"/gi,'"');
            newHorarios = horarios;
          } catch(error){
            newHorarios = "[]";
          }
          $.ajax({
              url:CONFIG.API_URL_DMS_HTML+'generadorHTML.php',
              type:"post",
              data:{
                  "soid": sessionService.get('IDCIUDADANO'),
                  "stitulo": $rootScope.datosTiendaVirtual[0].tv_nombrec,
                  "sdescripcion": $rootScope.datosTiendaVirtual[0].tv_descripcionc,
                  "scontactos": newContactos,
                  "sofertas": ofertas,
                  "sredes": newRedes,
                  "shorarios": newHorarios,
                  "spagina": $rootScope.datosTiendaVirtual[0].tv_pagina_webc,
                  "scorreo": $rootScope.datosTiendaVirtual[0].tv_correoc,
                  "sproductos": ofertas,
                  "stv": $rootScope.datosTiendaVirtual[0].tv_idc,
                  "sae": sessionService.get('IDAE'),
                  "slogo": $rootScope.urlLogotipo64,
                  "sencabezado": $rootScope.urlEncabezado64,
                  "smenu": $rootScope.urlcatalogo,
                  "sentrega" : $rootScope.datosTiendaVirtual[0].pforma_entrega
              },
              success:function(response){
                  if (response == 'error creando fichero'){
                    swal('', "Página NO publicada," + response, 'error');
                    $scope.ws_publicado = false;
                    $scope.chkPublicado == false;
                    document.getElementById('chkPublicado').checked = false;
                  } else {
                    resultado = JSON.parse(response);
                    $rootScope.urlIndex = resultado.url;
                    document.getElementById('urlIndex').value = resultado.url;
                    $scope.registrarPagina(resultado.url, resultado.html);
                  }
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