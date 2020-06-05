function tiendaVirtualController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUpload1,$q) {
  $scope.desabilitado=""
  $scope.tablaContactos = {};
  $scope.tablaRedesSociales = {};
  $scope.tablaOfertas = {};
  $scope.datos={};
  $rootScope.contactosArray = new Array();
  $rootScope.redesSocialesArray = new Array();
  $rootScope.ofertasArray = new Array();
  $rootScope.archivosProducto = new Array();
  $rootScope.archivosLogotipo = new Array();
  $("#mensaje1").hide();
  $("#mensaje2").hide();
      /*document.getElementById('f01_contacto1').value = '';
      document.getElementById('f01_contacto2').value = '';
      document.getElementById('f01_contacto3').value = '';
      $('#f01_redessocialesAE1').prop("checked", false);
      $('#f01_redessocialesAE2').prop("checked", false);
      $('#f01_redessocialesAE3').prop("checked", false);*/
  
  

  var clsIniciarCamposInternet = $rootScope.$on('inicializarCampos', function(event, data){
    $scope[name] = 'Running';
    var deferred = $q.defer();
    $scope.limpiar();     
    $scope.recuperarSerializarInfo($rootScope.datosTiendaVirtual);
    return deferred.promise;
  });
  $scope.recuperarSerializarInfo = function(data){
  $scope[name] = 'Running';
  var deferred = $q.defer();
    if (data.length == 0){
      $scope.datos.f01_nombreTV = "";
      $scope.datos.f01_descripcionTV = "";
      $scope.datos.f01_categoria = "";
      $scope.datos.f01_correoTV = "";
      $scope.datos.f01_pagwebAE = "";
      $scope.datos.f01_contacto1_nro = "";
      $scope.datos.f01_contacto1 = "";
      $scope.datos.f01_contacto2_nro = "";
      $scope.datos.f01_contacto2 = "";
      $scope.datos.f01_contacto3_nro = "";
      $scope.datos.f01_contacto3 = "";
      $scope.datos.f01_ofertasAE = "";
      $scope.datos.f01_redessocialesAE1_url = "";
      $scope.datos.f01_redessocialesAE1 = "";
      $scope.datos.f01_redessocialesAE2_url = "";
      $scope.datos.f01_redessocialesAE2 = "";
      $scope.datos.f01_redessocialesAE3_url = "";
      $scope.datos.f01_redessocialesAE3 = "";
      $scope.datos.f01_ofertasAE_des1 = "";
      $scope.datos.f01_ofertasAE_des2 = "";
      $scope.datos.f01_ofertasAE_des3 = "";
      $scope.datos.f01_ofertasAE_des4 = ""; 
      $scope.datos.f01_ofertasAE_des5 = "";
      $scope.datos.txt_f01_upload1 = "";
      $scope.datos.txt_f01_upload2 = "";
      $scope.inicializaC1 = true;
      $scope.inicializaC2 = true;
      $scope.inicializaC3 = true;
      $scope.inicializaFacebook = true;
      $scope.inicializaTwitter = true;
      $scope.inicializaInstagram = true;
    } else {

      $scope.datos.f01_nombreTV = data[0].tv_nombrec;
      $scope.datos.f01_descripcionTV = data[0].tv_descripcionc;
      $scope.datos.f01_categoria = data[0].tv_categoria_idc;
      $scope.datos.f01_correoTV = data[0].tv_correoc;
      $scope.datos.f01_pagwebAE = data[0].tv_pagina_webc;
      //contactos

      var contactos = data[0].tv_contactosc;
        for(i=0;i<contactos.length;i++){
          var conta = JSON.parse(contactos[i]);
          if (i==0){ 
            $scope.datos.f01_contacto1_nro = conta.valor;
            $scope.datos.f01_contacto1 = conta.tipo;
            if(conta.valor == '' && conta.tipo == ''){
              $scope.datos.f01_contacto1_nro = '';
              $scope.activarCampo1($scope.datos.f01_contacto1);
            }else{
              $scope.inicializaC1 = false;
            }
          }
          if (i==1){
            $scope.datos.f01_contacto2_nro = conta.valor;
            $scope.datos.f01_contacto2 = conta.tipo;
            if(conta.valor == '' && conta.tipo == ''){
              $scope.datos.f01_contacto2_nro = '';
              $scope.activarCampo2($scope.datos.f01_contacto2);
            }else{
              $scope.inicializaC2 = false;
            }
          }
          if (i==2){
            $scope.datos.f01_contacto3_nro = conta.valor;
            $scope.datos.f01_contacto3 = conta.tipo;
            if(conta.valor == '' && conta.tipo == ''){
              $scope.datos.f01_contacto3_nro = '';
              $scope.activarCampo3($scope.datos.f01_contacto3);
            }else{
              $scope.inicializaC3 = false;
            }
          }
      //redes sociales
      }
      var redes = data[0].tv_redesc;
      $('input:checkbox[name=f01_redessocialesAE1]:checked').val();
      if (redes.length==''){
        $scope.datos.f01_redessocialesAE1_url = "";
        $scope.datos.f01_redessocialesAE1 = "";
        $scope.datos.f01_redessocialesAE2_url = "";
        $scope.datos.f01_redessocialesAE2 = "";
        $scope.datos.f01_redessocialesAE3_url = "";
        $scope.datos.f01_redessocialesAE3 = "";
        $scope.inicializaFacebook = true;
        $scope.inicializaTwitter =  true;
        $scope.inicializaInstagram = true;

      }else{
        for(i=0;i<redes.length;i++){
          var red = JSON.parse(redes[i]);
          if (i==0){ 
            $scope.datos.f01_redessocialesAE1_url = red.url;
            $scope.datos.f01_redessocialesAE1 = red.tipo; 
            $scope.datos.f01_redessocialesAE1 = red.checked; 
            if ($scope.datos.f01_redessocialesAE1 == 'true' || $scope.datos.f01_redessocialesAE1 ==  true){
              $scope.datos.f01_redessocialesAE1 = true; 
              $scope.inicializaFacebook = false;
            }else{
              $scope.inicializaFacebook = true;
              $scope.datos.f01_redessocialesAE1_url = '';
              
            }
          }
          if (i==1){
            $scope.datos.f01_redessocialesAE2_url = red.url;
            $scope.datos.f01_redessocialesAE2 = red.tipo; 
            $scope.datos.f01_redessocialesAE2 = red.checked; 
            if ($scope.datos.f01_redessocialesAE2 == 'true' || $scope.datos.f01_redessocialesAE2 == true){
              $scope.datos.f01_redessocialesAE2 = true; 
              $scope.inicializaTwitter = false;
            }else{
              $scope.inicializaTwitter =  true;
              $scope.datos.f01_redessocialesAE2_url = '';
            }
          }
          if (i==2){
            $scope.datos.f01_redessocialesAE3_url = red.url;
            $scope.datos.f01_redessocialesAE3 = red.tipo; 
            $scope.datos.f01_redessocialesAE3 = red.checked; 
            if ($scope.datos.f01_redessocialesAE3 == 'true' || $scope.datos.f01_redessocialesAE3 == true){
              $scope.datos.f01_redessocialesAE3 = true; 
              $scope.inicializaInstagram = false;
            }else{
              $scope.inicializaInstagram = true;
              $scope.datos.f01_redessocialesAE3_url = '';
            }
          }
        }
      }
      
      //ofertas
      var ofertas = data[0].tv_ofertas;
      for(i=0;i<ofertas.length;i++){
        var of = JSON.parse(ofertas[i]);
        if (i==0){ 
          $scope.datos.f01_ofertasAE_des1 = of.oferta;
          if($scope.datos.f01_ofertasAE_des1 == 'undefined' || $scope.datos.f01_ofertasAE_des1 == undefined || $scope.datos.f01_ofertasAE_des1 == null){
            $scope.datos.f01_ofertasAE_des1 = '';
          }
        }
        if (i==1){
          $scope.datos.f01_ofertasAE_des2 = of.oferta;
          if($scope.datos.f01_ofertasAE_des2 == 'undefined' || $scope.datos.f01_ofertasAE_des2 == undefined || $scope.datos.f01_ofertasAE_des2 == null){
            $scope.datos.f01_ofertasAE_des2 = '';
          }
        }
        if (i==2){
          $scope.datos.f01_ofertasAE_des3 = of.oferta;
          if($scope.datos.f01_ofertasAE_des3 == 'undefined' || $scope.datos.f01_ofertasAE_des3 == undefined || $scope.datos.f01_ofertasAE_des3== null){
            $scope.datos.f01_ofertasAE_des3 = '';
          }
        }
        if (i==3){
          $scope.datos.f01_ofertasAE_des4 = of.oferta;
          if($scope.datos.f01_ofertasAE_des4 == 'undefined' || $scope.datos.f01_ofertasAE_des4 == undefined || $scope.datos.f01_ofertasAE_des4 == null){
            $scope.datos.f01_ofertasAE_des4 = '';
          }
        }
        if (i==4){
          $scope.datos.f01_ofertasAE_des5 = of.oferta;
          if($scope.datos.f01_ofertasAE_des5 == 'undefined' || $scope.datos.f01_ofertasAE_des5 == undefined || $scope.datos.f01_ofertasAE_des5 == null){
            $scope.datos.f01_ofertasAE_des5 = '';
          }
        }

      }
      //catalogo
      $scope.catalogo1 = results[0].tvcatalogo;
      $scope.catalogojson = JSON.parse($scope.catalogo1);
      if($scope.catalogojson.length == 0){
       console.log('Sin Url de catalogo');
       $scope.datos.txt_f01_upload1 = '';
      }else{
        $scope.catalogojson1 = JSON.parse($scope.catalogojson[0]); 
        $scope.datos.txt_f01_upload1 = $scope.catalogojson1.campo;
        $scope.catalogo_url = $scope.catalogojson1.url;
      }  
      //logotipo

      $scope.logotipo1 = results[0].plogotipo;
      $scope.logotipojson = JSON.parse($scope.logotipo1);
      if($scope.logotipojson.length == 0){
        console.log('Sin Url de logotipo');
        $scope.datos.txt_f01_upload2 = '';
      }else{
        $scope.logotipojson1 = JSON.parse($scope.logotipojson[0]);
        $scope.datos.txt_f01_upload2 = $scope.logotipojson1.campo;
        $scope.logotipo_url = $scope.logotipojson1.url;
      } 
     
    } 
    return deferred.promise;
}

  $scope.inicioTiendaVirtual = function () {
    console.log(sessionService.get('IDAE'));
    $scope.recuperarSerializarInfo($rootScope.datosTiendaVirtual);  
  };
  
  $scope.registrarDatosAE = function(data){
    var datosTiendaVirtual = new dataTiendaVirtual();
    datosTiendaVirtual.ae_id = sessionService.get("IDAE");
    datosTiendaVirtual.categoria = data.f01_categoria;
    datosTiendaVirtual.nombre = data.f01_nombreTV;
    datosTiendaVirtual.correo = data.f01_correoTV;
    datosTiendaVirtual.pagina_web = data.f01_pagwebAE;
    datosTiendaVirtual.descripcion = data.f01_descripcionTV;
    var myJSON = '';
    if (data.f01_contacto1=='TELÉFONO' || data.f01_contacto1=='CELULAR'){
      myJSON = '{ "tipo":"' + data.f01_contacto1 + '", "valor":"' + data.f01_contacto1_nro + '" }';
      $rootScope.contactosArray.push(myJSON);
    }else{
      myJSON = '{ "tipo":"", "valor":"" }';
      $rootScope.contactosArray.push(myJSON);
    }
    if (data.f01_contacto2=='TELÉFONO' || data.f01_contacto2=='CELULAR'){
      myJSON = '{ "tipo":"' + data.f01_contacto2 + '", "valor":"' + data.f01_contacto2_nro + '" }';
      $rootScope.contactosArray.push(myJSON);
    }else{
      myJSON = '{ "tipo":"", "valor":"" }';
      $rootScope.contactosArray.push(myJSON);
    }
    if (data.f01_contacto3=='TELÉFONO' || data.f01_contacto3=='CELULAR'){
      myJSON = '{ "tipo":"' + data.f01_contacto3 + '", "valor":"' + data.f01_contacto3_nro + '" }';
      $rootScope.contactosArray.push(myJSON);
    }else{
      myJSON = '{ "tipo":"", "valor":"" }';
      $rootScope.contactosArray.push(myJSON);
    }
    myJSON = '';
    if (data.f01_redessocialesAE1=='true' || data.f01_redessocialesAE1==true){
      myJSON = '{ "tipo":"facebook", "checked":"true", "url":"' + data.f01_redessocialesAE1_url + '" }';
      $rootScope.redesSocialesArray.push(myJSON);
    }else{
      myJSON = '{ "tipo":"facebook", "checked":"false", "url":"" }';
      $rootScope.redesSocialesArray.push(myJSON);
    }
    if (data.f01_redessocialesAE2=='true' || data.f01_redessocialesAE2==true){
      myJSON = '{ "tipo":"twitter", "checked":"true", "url":"' + data.f01_redessocialesAE2_url + '" }';
      $rootScope.redesSocialesArray.push(myJSON);
    }else{
      myJSON = '{ "tipo":"twitter", "checked":"false", "url":"" }';
      $rootScope.redesSocialesArray.push(myJSON);
    }
    if (data.f01_redessocialesAE3=='true' || data.f01_redessocialesAE3==true){
      myJSON = '{ "tipo":"instagram", "checked":"false", "url":"" }';
      $rootScope.redesSocialesArray.push(myJSON);
    }
    var myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des1 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des2 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des3 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des4 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des5 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    datosTiendaVirtual.contactos = JSON.stringify($rootScope.contactosArray);
    datosTiendaVirtual.redes_sociales = JSON.stringify($rootScope.redesSocialesArray);
    datosTiendaVirtual.ofertas = JSON.stringify($rootScope.ofertasArray); 
    //catalogo 
    if($scope.catalogo1 == '' || $scope.catalogo1 == 'undefined' || $scope.catalogo1 == undefined){
      datosTiendaVirtual.catalogo = [];
    }else{
      datosTiendaVirtual.catalogo = $scope.catalogo1;
    }
    //logotipo
    datosTiendaVirtual.logotipo = $scope.logotipo1;

    datosTiendaVirtual.oid = sessionService.get('IDCIUDADANO');
    if (sessionService.get('TIPO_PERSONA')=='NATURAL'){
        datosTiendaVirtual.usr = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_MATERNO') + ' ' + sessionService.get('US_PATERNO');
    } else {
        datosTiendaVirtual.usr = "juridico";
    }
    datosTiendaVirtual.crearTiendaVirtual(function(response){
      console.log(response);
      results = JSON.parse(response);
      results = results.success;
      if(results.length > 0){
          $.unblockUI();
          //$scope.refrescar();
          swal('', "Tienda Virtual activada ", 'success');
          $rootScope.nuevo = null;
          $rootScope.update = "mostrar";
      } else {
          $.unblockUI();
          swal('', "Error al Activar la Tienda Virtual", 'error');
      }
    });
  } 
  $scope.actualizarDatosAE = function(data){
    var datosTiendaVirtual = new dataTiendaVirtual();
    datosTiendaVirtual.idtv = sessionService.get("IDTV");
    datosTiendaVirtual.ae_id = sessionService.get("IDAE");
    datosTiendaVirtual.categoria = data.f01_categoria;
    datosTiendaVirtual.nombre = data.f01_nombreTV;
    datosTiendaVirtual.correo = data.f01_correoTV;
    datosTiendaVirtual.pagina_web = data.f01_pagwebAE;
    datosTiendaVirtual.descripcion = data.f01_descripcionTV;
    //actualiza json contactos
    datosTiendaVirtual.contactos = [];
    $rootScope.contactosArray = [];
    var myJSON = '';
      if (data.f01_contacto1=='TELÉFONO' || data.f01_contacto1=='CELULAR'){
        myJSON = '{ "tipo":"' + data.f01_contacto1 + '", "valor":"' + data.f01_contacto1_nro + '" }';
        $rootScope.contactosArray.push(myJSON);
      }else{
        myJSON = '{ "tipo":"", "valor":"" }';
        $rootScope.contactosArray.push(myJSON);
      }
      if (data.f01_contacto2=='TELÉFONO' || data.f01_contacto2=='CELULAR'){
        myJSON = '{ "tipo":"' + data.f01_contacto2 + '", "valor":"' + data.f01_contacto2_nro + '" }';
        $rootScope.contactosArray.push(myJSON);
      }else{
        myJSON = '{ "tipo":"", "valor":"" }';
        $rootScope.contactosArray.push(myJSON);
      }
      if (data.f01_contacto3=='TELÉFONO' || data.f01_contacto3=='CELULAR'){
        myJSON = '{ "tipo":"' + data.f01_contacto3 + '", "valor":"' + data.f01_contacto3_nro + '" }';
        $rootScope.contactosArray.push(myJSON);
      }else{
        myJSON = '{ "tipo":"", "valor":"" }';
        $rootScope.contactosArray.push(myJSON);
      }
    datosTiendaVirtual.contactos = JSON.stringify($rootScope.contactosArray);
    //actualiza json redes
    datosTiendaVirtual.redes_sociales = [];
    $rootScope.redesSocialesArray = [];  
    myJSON = '';
      if (data.f01_redessocialesAE1=='true' || data.f01_redessocialesAE1==true){
        myJSON = '{ "tipo":"facebook", "checked":"true", "url":"' + data.f01_redessocialesAE1_url + '" }';
        $rootScope.redesSocialesArray.push(myJSON);
      }else{
        myJSON = '{ "tipo":"facebook", "checked":"false", "url":"" }';
        $rootScope.redesSocialesArray.push(myJSON);
      }
      if (data.f01_redessocialesAE2=='true' || data.f01_redessocialesAE2==true){
        myJSON = '{ "tipo":"twitter", "checked":"true", "url":"' + data.f01_redessocialesAE2_url + '" }';
        $rootScope.redesSocialesArray.push(myJSON);
      }else{
        myJSON = '{ "tipo":"twitter", "checked":"false", "url":"" }';
        $rootScope.redesSocialesArray.push(myJSON);
      }
      if (data.f01_redessocialesAE3=='true' || data.f01_redessocialesAE3==true){
        myJSON = '{ "tipo":"instagram", "checked":"true", "url":"' + data.f01_redessocialesAE3_url + '" }';
        $rootScope.redesSocialesArray.push(myJSON);
      }else{
        myJSON = '{ "tipo":"instagram", "checked":"false", "url":"" }';
        $rootScope.redesSocialesArray.push(myJSON);
      }
    datosTiendaVirtual.redes_sociales = JSON.stringify($rootScope.redesSocialesArray);
      //actualiza json ofertas
    datosTiendaVirtual.ofertas = [];
    $rootScope.ofertasArray = [];
    myJSONOfertas = '';
    var myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des1 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des2 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des3 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des4 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas);
    myJSONOfertas = '{ "tipo":"ofertas", "oferta":"' + data.f01_ofertasAE_des5 + '" }';
    $rootScope.ofertasArray.push(myJSONOfertas); 
    datosTiendaVirtual.ofertas = JSON.stringify($rootScope.ofertasArray);
    //catalogo
    datosTiendaVirtual.catalogo = $scope.catalogo1;
    datosTiendaVirtual.logotipo = $scope.logotipo1;
    datosTiendaVirtual.oid = sessionService.get('IDCIUDADANO');
    if (sessionService.get('TIPO_PERSONA')=='NATURAL'){
        datosTiendaVirtual.usr = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_MATERNO') + ' ' + sessionService.get('US_PATERNO');
    } else {
        datosTiendaVirtual.usr = "juridico";
    }
    datosTiendaVirtual.actualizarTiendaVirtual(function(response){
      console.log(response);
      results = JSON.parse(response);
      results = results.success;
      if(results.length > 0){
          $.unblockUI();
          swal('', "La información de la Tienda Virtual fue actualizada ", 'success');
          $rootScope.nuevo = null;       
      } else {
          $.unblockUI();
          swal('', "Error al Actualizar información de la Tienda Virtual", 'error');
          $location.path('dashboard');
      }
    });
  }

  $scope.limpiar = function(){
      $scope.datos.f01_nombreTV = "";
      $scope.datos.f01_descripcionTV = "";
      $scope.datos.f01_categoria = "";//falta
      $scope.datos.f01_correoTV = "";
      $scope.datos.f01_pagwebAE = "";
      $scope.datos.f01_contacto1_nro = "";
      $scope.datos.f01_contacto1 = "";
      $scope.datos.f01_contacto2_nro = "";
      $scope.datos.f01_contacto2 = "";
      $scope.datos.f01_contacto3_nro = "";
      $scope.datos.f01_contacto3 = "";
      $scope.datos.f01_ofertasAE = "";
      $scope.datos.f01_redessocialesAE1_url = "";
      $scope.datos.f01_redessocialesAE1 = "";
      $scope.datos.f01_redessocialesAE2_url = "";
      $scope.datos.f01_redessocialesAE2 = "";
      $scope.datos.f01_redessocialesAE3_url = "";
      $scope.datos.f01_redessocialesAE3 = "";
      $scope.datos.f01_ofertasAE_des1 = "";
      $scope.datos.f01_ofertasAE_des2 = "";
      $scope.datos.f01_ofertasAE_des3 = "";
      $scope.datos.f01_ofertasAE_des4 = ""; 
      $scope.datos.f01_ofertasAE_des5 = "";
      $scope.datos.txt_f01_upload1 = "";
      $scope.datos.txt_f01_upload2 = "";
      $rootScope.archivosProducto = new Array();
      $rootScope.archivosLogotipo = new Array();
      $scope.catalogo1 = '';
      $scope.logotipo1 = '';
      $scope.catalogo_url = '';
      $scope.logotipo_url = '';

  }
  $scope.validaCorreo =function(){
    var $result = $("#result");
    var email = $("#f01_correoTV").val();
    $result.text("");
    if ($scope.validarEmail(email)) {
        $("#mensaje1").show();
        $("#mensaje2").hide();
        $scope.correoValido=false;
    } else {
    $("#mensaje1").hide();
    $("#mensaje2").show();
    $scope.correoValido=true;
    }
    return false;
}
  $scope.validarEmail =function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
  $scope.activarCampo1 = function(dato){
    if(dato == "" || dato == undefined || dato == 'undefined'){
      document.getElementById('f01_contacto1_nro').value = '';
      document.getElementById('f01_contacto1_nro').disabled = true;
      $rootScope.inicializaC1 = true;
      
   }else{
      document.getElementById('f01_contacto1_nro').disabled = false;
    }
  }
  $scope.activarCampo2 = function(dato){
    if(dato == "" || dato == undefined || dato == 'undefined'){
      document.getElementById('f01_contacto2_nro').value = '';
      document.getElementById('f01_contacto2_nro').disabled = true;
      $rootScope.inicializaC2 = true;
    }else{
      document.getElementById('f01_contacto2_nro').disabled = false;
    }
  }
  $scope.activarCampo3 = function(dato){
    if(dato == "" || dato == undefined || dato == 'undefined'){
      document.getElementById('f01_contacto3_nro').value = '';
      document.getElementById('f01_contacto3_nro').disabled = true;
      $rootScope.inicializaC3 = true;
    }else{
      document.getElementById('f01_contacto3_nro').disabled = false;
    }
  }
  $scope.activaRedes1 = function(dato){
    if(dato == false) {
      $scope.inicializaFacebook = true;
      document.getElementById('f01_redessocialesAE1_url').value = '';
    } else {
      $scope.inicializaFacebook =  false;
    }
  }
  $scope.activaRedes2 = function(dato){
    if(dato == false) {
      $scope.inicializaTwitter = true;
      document.getElementById('f01_redessocialesAE2_url').value = '';
    } else {
      $scope.inicializaTwitter = false;
    }
  }
  $scope.activaRedes3 = function(dato){
    if(dato == false) {
      $scope.inicializaInstagram = true;
      document.getElementById('f01_redessocialesAE3_url').value = ''; 
    } else {
      $scope.inicializaInstagram = false;
    }
  }



 


  /*$scope.cerrarDatosAE = function(dato){
    window.location.href = "#dashboard";
  }*/
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
          //$scope.adicionarArrayDeRequisitos(sobj,idFile);
      }
  };

  /*REQUISITOS2018*/
    $scope.almacenarRequisitos = function(aArchivos,idFiles){
        console.log("idfiles2:: ", idFiles);
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
                if (idFiles[key]==1){
                  var descDoc = "catalogo";
                  var descArchivo = "catalogo de productos";
                  var imagenFile = archivo.name.split('.');
                  var tipoFile = imagenFile[1];
                  var nombreNuevo = descDoc + '.'+imagenFile[1];
                  $scope.catalogo_url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevo + "?app_name=todoangular";
                  fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
                  document.getElementById('txt_f01_upload1').value = nombreNuevo;
                  var uploadUrlA = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevo + "?app_name=todoangular";
                  var myJSON = '{ "url":"' + uploadUrlA + '", "campo":"' + nombreNuevo + '", "nombre":"' + descArchivo + '" }';
                  $rootScope.archivosProducto.push(myJSON);
                  var cata_array = [];
                  var cata = JSON.stringify($rootScope.archivosProducto[0]);
                  var cata1 = JSON.parse(cata);
                  cata_array.push(cata1);
                  $scope.catalogo1 =  JSON.stringify(cata_array);
                 
                }
                if (idFiles[key]==2){
                  var descDoc = "logotipo";
                  var descArchivo = "logotipo de la AE";
                  var imagenFile = archivo.name.split('.');
                  var tipoFile = imagenFile[1];
                  var nombreNuevoL = descDoc + '.'+imagenFile[1];
                  $scope.logotipo_url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevoL + "?app_name=todoangular";
                  fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nombreNuevoL);
                  document.getElementById('txt_f01_upload2').value = nombreNuevoL;
                  var uploadUrlA = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevoL + "?app_name=todoangular";
                  var myJSON = '{ "url":"' + uploadUrlA + '", "campo":"' + nombreNuevoL + '", "nombre":"' + descArchivo + '" }';
                  $rootScope.archivosLogotipo.push(myJSON);
                  var logo_array = [];
                  var logo = JSON.stringify($rootScope.archivosLogotipo[0]);
                  var logo1 = JSON.parse(logo);
                  logo_array.push(logo1);
                  $scope.logotipo1 =  JSON.stringify(logo_array);
                }
            } else {
            }
        });
        $.unblockUI();
    };

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

  
  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try{ 
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
  } catch (e) { console.log("error", e); }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
};