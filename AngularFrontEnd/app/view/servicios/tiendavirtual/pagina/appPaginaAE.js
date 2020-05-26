function pagosAEController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1 ) {
    $scope.desabilitado=""
    $scope.tablaContactos = {};
    $scope.tablaRedesSociales = {};
    $scope.tablaOfertas = {};
  
    
    
    $scope.inicioPaginaWeb = function () {
      $scope.idAe = sessionService.get("IDAE");
        /*$scope.update = false;
        $scope.nuevo = false;
        $scope.mostrarTxt = false; */
    };
    $scope.frmProducto = null;
  
    $scope.obtDatos      =   [];
    $scope.msj1 = '¡ Estimado ciudadano, usted no cuenta con documentos hasta la fecha !'; 
    $scope.valida = 0;
    
    $rootScope.archivosProducto = new Array();

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

      console.log(newContactos);
      console.log(newOfertas);
      console.log(newRedes);
      console.log("-------------------------");
            /*
            soid:123456
            stitulo:DON POLLO
            sdescripcion:POLLO PARA LLEVAR
            scontactos:[{"tipo":"CELULAR", "valor":"74086316" },{ "tipo":"CELULAR", "valor":"74089584" }]
            sofertas:[{ "tipo":"ofertas", "oferta":"lunes 2x1" }, { "tipo":"ofertas", "oferta":"martes todo lo que puedas comer" }, { "tipo":"ofertas", "oferta":"" }, { "tipo":"ofertas", "oferta":"" }, { "tipo":"ofertas", "oferta":"" }]↵
            sredes:[{ "tipo":"facebook", "checked":"true", "url":"http://facebok.com/pizza" }]
            spagina:http
            scorreo:ger
            sproductos:[{"celular":"74086316"}]
            stv:48
            */
      
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
              "sproductos": '[]',
              "stv": $rootScope.datosTiendaVirtual[0].tv_idc
              //"stv": sessionService.get('IDTV')
          },
          success:function(response){
              console.log(response);
              var urlData = response;
              $rootScope.urlIndex = urlData;
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
        if(results.length > 0){$rootScope.pagUrl = results[0].web_urlc;
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