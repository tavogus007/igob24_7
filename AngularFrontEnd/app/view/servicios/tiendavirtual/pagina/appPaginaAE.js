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
      try{
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
        entregaDesc = $rootScope.datosTiendaVirtual[0].pforma_entrega.replace(/\n/g, "<br>");
        myJSON = '{ "tipo_entrega":"' + entregaDesc + '" }';
        myJSON2 = JSON.parse(myJSON);
        $rootScope.datosAuxiliares.push(myJSON2);
      } catch(error){
        console.log("dataAdicional");
        console.log(error);
      }
    }
    $scope.inicioPaginaWeb = function () {
        try{
          $scope.nombre_tienda = $rootScope.datosTiendaVirtual[0].tv_nombrec;
          recDesc = $rootScope.datosTiendaVirtual[0].tv_descripcionc;
          recDesc = recDesc.replace(/<br ?\/?>/g, "\n");
          $scope.descrip_pagina = recDesc;
          $scope.correo_tienda = $rootScope.datosTiendaVirtual[0].tv_correoc;
          $scope.pag_web_privada = $rootScope.datosTiendaVirtual[0].tv_pagina_webc;
          document.getElementById("nombre_pagina").innerHTML = $scope.nombre_tienda;
          document.getElementById("descrip_pagina").innerHTML = recDesc;
          var texto = $scope.nombre_tienda.replace(/<[^>]*>?/g, '');
          var textoHtml = texto.replace("&aacute;", 'á');
          textoHtml = textoHtml.replace("&Aacute;", 'Á');
          textoHtml = textoHtml.replace("&eacute;", 'é');
          textoHtml = textoHtml.replace("&Eacute;", 'É');
          textoHtml = textoHtml.replace("&iacute;", 'í');
          textoHtml = textoHtml.replace("&Iacute;", 'Í');
          textoHtml = textoHtml.replace("&oacute;", 'ó');
          textoHtml = textoHtml.replace("&Oacute;", 'Ó');
          textoHtml = textoHtml.replace("&uacute;", 'ú');
          textoHtml = textoHtml.replace("&Uacute;", 'Ú');
          textoHtml = textoHtml.replace("&ntilde;", 'ñ');
          textoHtml = textoHtml.replace("&Ntilde;", 'Ñ');
          $rootScope.textoHtml = textoHtml;
  
          var descripcion = recDesc.replace(/<[^>]*>?/g, '');
          var descripcionHtml = descripcion.replace("&aacute;", 'á');
          descripcionHtml = descripcionHtml.replace("&Aacute;", 'Á');
          descripcionHtml = descripcionHtml.replace("&eacute;", 'é');
          descripcionHtml = descripcionHtml.replace("&Eacute;", 'É');
          descripcionHtml = descripcionHtml.replace("&iacute;", 'í');
          descripcionHtml = descripcionHtml.replace("&Iacute;", 'Í');
          descripcionHtml = descripcionHtml.replace("&oacute;", 'ó');
          descripcionHtml = descripcionHtml.replace("&Oacute;", 'Ó');
          descripcionHtml = descripcionHtml.replace("&uacute;", 'ú');
          descripcionHtml = descripcionHtml.replace("&Uacute;", 'Ú');
          descripcionHtml = descripcionHtml.replace("&ntilde;", 'ñ');
          descripcionHtml = descripcionHtml.replace("&Ntilde;", 'Ñ');
          $rootScope.descripcionHtml = descripcionHtml;
  
        } catch(error){
          console.log(error);
        }
        try{
          logotipo = $rootScope.datosTiendaVirtual[0].plogotipo;
          logotipo = logotipo.replace('["{','[{');
          logotipo = logotipo.replace('}"]','}]');
          logotipo = logotipo.replace('}"{','}{');
          logotipo = logotipo.replace(/\\"/gi,'"');
          logo = JSON.parse(logotipo);
          urllogo = logo[0].url;
          toDataURL(urllogo, function(dataUrl) {
            $rootScope.urlLogotipo64 = dataUrl;
            console.log(urllogo);
            console.log(dataUrl);
          });
        } catch (error){
          //$rootScope.urlLogotipo64 = "";
          try{
            $rootScope.urlLogotipo64 = logo[0].url;
          } catch(error1){
            console.log(error1);
            $rootScope.urlLogotipo64 = "";
          } 
        }
        try {
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
        } catch(error){
          //$rootScope.urlEncabezado64 = "";
          try{
            $rootScope.urlEncabezado64 = enca[0].url;
          } catch(error1){
            console.log(error1);
            $rootScope.urlEncabezado64 = "";
          }        
        }
        try{
          catalogo = $rootScope.datosTiendaVirtual[0].tvcatalogo;
          catalogo = catalogo.replace('["{','[{');
          catalogo = catalogo.replace('}"]','}]');
          catalogo = catalogo.replace('}"{','}{');
          catalogo = catalogo.replace(/\\"/gi,'"');
          cata = JSON.parse(catalogo);
          urlcatalogo = cata[0].url;
          $rootScope.urlcatalogo = urlcatalogo;
        } catch(error){
          //$rootScope.urlcatalogo = "";
          try{
            $rootScope.urlcatalogo = enca[0].url;
          } catch(error1){
            console.log(error1);
            $rootScope.urlcatalogo = "";
          }
        }
        $scope.desabilitado = "disabled";
        $scope.getPagina();
        $scope.dataAdicional();
        $scope.getProductos();
        $scope.mostrar = true;
      try {
        dominio = $rootScope.datosTiendaVirtual[0].pdominio;
        if (dominio.length == 0){
          swal('', "No tiene nombre para la creación de su pagina web", 'error');
          $scope.mostrar = false;
        }
      } catch(error){
        swal('', "Debe actualizar datos en información de la tienda virtual", 'error');
        $scope.mostrar = false;
      }
      
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
    $scope.errorPagina = function(){
      $.blockUI();
      try{
        var datosPaginaWeb = new dataPaginaWeb();
        datosPaginaWeb.web_id = $rootScope.idPW;
        datosPaginaWeb.web_contenido = "";
        datosPaginaWeb.web_url = "";
        datosPaginaWeb.web_estado_publicar = "NO";
        datosPaginaWeb.web_usr =  sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO');
        datosPaginaWeb.web_id_ae = sessionService.get('IDAE');
        datosPaginaWeb.updPaginaWeb(function(response){
          resultado = JSON.parse(response);
          document.getElementById('urlIndex').value = "";
          document.getElementById('chkPublicado').checked = false;  
        });
      } catch(error){
        console.log(error);
      }
      $.unblockUI();  
    }
    $scope.actualizarTVCeroPapel = function(estado){
      try {
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
        uptTVCP.nombre = $rootScope.textoHtml;
        uptTVCP.descripcion = $rootScope.descripcionHtml;
        uptTVCP.pagina = $rootScope.datosTiendaVirtual[0].pdominio;
        uptTVCP.modificarTiendaVirtual(function(response){
          resultado = JSON.parse(response);
          if (resultado.success.data[0].regp_estado == 'SI') {
            swal('', "Página publicada en Sistema de Comercio GAMLP", 'success');
          } else {
            swal('', "Página NO publicada en Sistema de Comercio GAMLP", 'error');
            $scope.errorPagina();
          }
        });
        $.unblockUI();
      } catch (error) {
        swal('', "Error de conexión a Caserit@ Virtual", 'error');
        console.log(error);
        $scope.errorPagina();
      }        
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
          try{
            var re = /}","{/gi;
            var str = JSON.stringify($rootScope.datosTiendaVirtual[0].tv_contactosc);
            var newstr = str.replace(re, "},{");
            newstr = newstr.replace('["{', '[{');
            newstr = newstr.replace('}"]', '}]');
            re = /\\"/gi;
            newContactos = newstr.replace(re, '"');
          } catch(error){
            console.log(error);
          }
          try{
            re = /}","{/gi;
            str = JSON.stringify($rootScope.datosTiendaVirtual[0].tv_redesc);
            newstr = str.replace(re, "},{");
            newstr = newstr.replace('["{', '[{');
            newstr = newstr.replace('}"]', '}]');
            re = /\\"/gi;
            newRedes = newstr.replace(re, '"');
          } catch(error){
            console.log(error);
          }
          try{
            ofertas = JSON.stringify($rootScope.productosPW);
            ofertas = ofertas.replace(/\n/g, "<br>");
          } catch(error){
            ofertas = JSON.stringify($rootScope.productosPW);
            console.log(error);
          }
          try { 
            horarios = $rootScope.datosTiendaVirtual[0].phorarios_atencion;
            horarios = horarios.replace('["{','[{');
            horarios = horarios.replace('}"]','}]');
            horarios = horarios.replace('}"{','}{');
            horarios = horarios.replace(/}","{/gi,'},{');
            horarios = horarios.replace(/\\"/gi,'"');
            newHorarios = horarios;
          } catch(error){
            console.log(error);
            newHorarios = "[]";
          }
          console.log($rootScope.urlLogotipo64);
          console.log($rootScope.urlEncabezado64);
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
                  "sentrega" : $rootScope.datosTiendaVirtual[0].pforma_entrega,
                  "sdominio" : $rootScope.datosTiendaVirtual[0].pdominio
              },
              success:function(response){
                try {
                  if (response == 'error creando fichero'){
                    swal('', "Página NO publicada, " + response, 'error');
                    $scope.ws_publicado = false;
                    $scope.chkPublicado == false;
                    document.getElementById('chkPublicado').checked = false;
                  } else {
                    resultado = JSON.parse(response);
                    $rootScope.urlIndex = resultado.url;
                    if (resultado.url.length > 42){
                      document.getElementById('urlIndex').value = resultado.url;
                      $scope.modificarPagina(resultado.url,resultado.html,'SI');
                    } else {
                      document.getElementById('urlIndex').value = "";
                      $scope.modificarPagina("","",'NO');
                      document.getElementById('chkPublicado').checked = false;
                    }
                  }
                } catch(error){
                  console.log(error);
                  swal('', "Error al crear la página", 'error');
                  document.getElementById('urlIndex').value = "";
                  $scope.modificarPagina("","",'NO');
                  document.getElementById('chkPublicado').checked = false;
                  $.unblockUI();  
                }
              },
              error: function(XMLHttpRequest, textStatus, errorThrown) { 
                console.log("Status: " + textStatus); 
                console.log("Error: " + errorThrown); 
                $.unblockUI();  
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
          try{
            var re = /}","{/gi;
            var str = JSON.stringify($rootScope.datosTiendaVirtual[0].tv_contactosc);
            var newstr = str.replace(re, "},{");
            newstr = newstr.replace('["{', '[{');
            newstr = newstr.replace('}"]', '}]');
            re = /\\"/gi;
            newContactos = newstr.replace(re, '"');
            re = /}","{/gi;
          } catch(error){
            console.log(111);
            console.log(error);
          }
          try{ 
            str = JSON.stringify($rootScope.datosTiendaVirtual[0].tv_redesc);
            newstr = str.replace(re, "},{");
            newstr = newstr.replace('["{', '[{');
            newstr = newstr.replace('}"]', '}]');
            re = /\\"/gi;
            newRedes = newstr.replace(re, '"');
          } catch(error){
            console.log(222);
            console.log(error);
          }
          try{
            ofertas = JSON.stringify($rootScope.productosPW);
            ofertas = ofertas.replace(/\n/g, "<br>");
          } catch(error){
            ofertas = JSON.stringify($rootScope.productosPW);
            console.log(333);
            console.log(error);
          }
          try { 
            horarios = $rootScope.datosTiendaVirtual[0].phorarios_atencion;
            horarios = horarios.replace('["{','[{');
            horarios = horarios.replace('}"]','}]');
            horarios = horarios.replace('}"{','}{');
            horarios = horarios.replace(/}","{/gi,'},{');
            horarios = horarios.replace(/\\"/gi,'"');
            newHorarios = horarios;
          } catch(error){
            console.log(444);
            console.log(error);
            newHorarios = "[]";
          }
          console.log($rootScope.urlLogotipo64);
          console.log($rootScope.urlEncabezado64);
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
                  "sentrega" : $rootScope.datosTiendaVirtual[0].pforma_entrega,
                  "sdominio" : $rootScope.datosTiendaVirtual[0].pdominio
              },
              success:function(response){
                try {
                  if (response == 'error creando fichero'){
                    swal('', "Página NO publicada, " + response, 'error');
                    $scope.ws_publicado = false;
                    $scope.chkPublicado == false;
                    document.getElementById('chkPublicado').checked = false;
                  } else {
                    resultado = JSON.parse(response);
                    $rootScope.urlIndex = resultado.url;
                    document.getElementById('urlIndex').value = resultado.url;
                    $scope.registrarPagina(resultado.url, resultado.html);
                  }
                } catch(error){
                  console.log(error);
                  swal('', "Error al crear la página", 'error');
                  $.unblockUI();  
                }
              },
              error: function(XMLHttpRequest, textStatus, errorThrown) { 
                console.log("Status: " + textStatus); 
                console.log("Error: " + errorThrown); 
                $.unblockUI();  
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