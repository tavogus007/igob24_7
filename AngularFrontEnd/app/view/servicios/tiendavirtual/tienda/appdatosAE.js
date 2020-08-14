function tiendaVirtualController($scope, $timeout, CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route, sweet, $http,FileUploader,$sce,fileUpload, fileUploadcorr,$q) {
  $scope.desabilitado=""
  $scope.tablaContactos = {};
  $scope.tablaRedesSociales = {};
  $scope.tablaOfertas = {};
  $scope.datos={};
  $rootScope.contactosArray = new Array();
  $rootScope.redesSocialesArray = new Array();
  $rootScope.ofertasArray = new Array();
  $rootScope.horariosArray = new Array();
  $rootScope.archivosProducto = new Array();
  $rootScope.archivosLogotipo = new Array();
  $rootScope.archivosEncabezado = new Array();

  function cargando(){
    var texto   = $("<div>", {
     text    : "CARGANDO....",
        id      : "myEstilo",
        css     : {
        "font-size" : "30px",
            "position": "relative",
            "width": "500px",
            "height": "300px",
            "left": "180px",
            "top":"50px"
        },
        fontawesome : "fa fa-spinner fa-pulse"
    });
    $.LoadingOverlay("show",{
            custom  : texto,
            color:"rgba(255, 255, 255, 0.8)",
    });
}
  

  var clsIniciarCamposInternet = $rootScope.$on('inicializarCampos', function(event, data){
    
    $scope.limpiar(); 
    $scope[name] = 'Running'; 
    var deferred = $q.defer(); 
    $scope.recuperarSerializarInfo($rootScope.datosTiendaVirtual);
    
    return deferred.promise;
    
  });

  $scope.recuperarSerializarInfo = function(data){
    cargando();
   
    $scope[name] = 'Running';
  
    var deferred = $q.defer();
    if (data.length == 0){
      document.getElementById("f01_todos").checked = false;
      document.getElementById("f01_habiles").checked = false;
      document.getElementById("f01_habiles").checked = false;
      $scope.datos.f01_nombreTV = "";
      tinyMCE.get('f01_nombreTV').setContent($scope.datos.f01_nombreTV);
      $scope.datos.f01_descripcionTV = '';
      tinyMCE.get('f01_descripcionTV').setContent('');
      $scope.datos.f01_forma_entrega = "";
      tinyMCE.get('f01_forma_entrega').setContent($scope.datos.f01_forma_entrega);
      $scope.datos.f01_dominio = "";
      document.getElementById('f01_dominio').readOnly = false;
      $scope.datos.f01_categoria = "";
      $scope.datos.f01_correoTV = "";
      $scope.datos.f01_pagwebAE = "";
      $scope.datos.f01_contacto1_nro = "";
      $scope.datos.f01_contacto1 = "";
      $scope.datos.f01_contacto2_nro = "";
      $scope.datos.f01_contacto2 = "";
      $scope.datos.f01_contacto3_nro = "";
      $scope.datos.f01_contacto3 = "";  
      $scope.datos.f01_redessocialesAE1_url = "";
      $scope.datos.f01_redessocialesAE1 = "";
      $scope.datos.f01_redessocialesAE2_url = "";
      $scope.datos.f01_redessocialesAE2 = "";
      $scope.datos.f01_redessocialesAE3_url = "";
      $scope.datos.f01_redessocialesAE3 = "";
      $scope.datos.f01_redessocialesAE4_url = "";
      $scope.datos.f01_redessocialesAE4 = "";
      $scope.datos.txt_f01_upload1 = "";
      $scope.datos.txt_f01_upload2 = "";
      $scope.datos.txt_f01_upload3 = "";
      $scope.inicializaC1 = true;
      $scope.inicializaC2 = true;
      $scope.inicializaC3 = true;
      $scope.inicializaFacebook = true;
      $scope.inicializaTwitter = true;
      $scope.inicializaInstagram = true;
      $scope.inicializaYoutube = true;
      $scope.datos.f01_chk_habiles = false;
      $scope.datos.f01_chk_todos = false;
      $scope.datos.f01_hora_inicio = '';
      $scope.datos.f01_hora_fin = '';
      $scope.datos.f01_chk_lunes = false;
      $scope.datos.f01_hora_inicio_lunes = '';
      $scope.datos.f01_hora_fin_lunes = '';
      $scope.datos.f01_chk_martes = false;
      $scope.datos.f01_hora_inicio_martes = '';
      $scope.datos.f01_hora_fin_martes = '';
      $scope.datos.f01_chk_miercoles = false;
      $scope.datos.f01_hora_inicio_miercoles = '';
      $scope.datos.f01_hora_fin_miercoles = '';
      $scope.datos.f01_chk_jueves = false;
      $scope.datos.f01_hora_inicio_jueves = '';
      $scope.datos.f01_hora_fin_jueves = '';
      $scope.datos.f01_chk_viernes = false;
      $scope.datos.f01_hora_inicio_viernes = '';
      $scope.datos.f01_hora_fin_viernes = '';
      $scope.datos.f01_chk_sabado = false;
      $scope.datos.f01_hora_inicio_sabado = '';
      $scope.datos.f01_hora_fin_sabado = '';
      $scope.datos.f01_chk_domingo = false;
      $scope.datos.f01_hora_inicio_domingo = '';
      $scope.datos.f01_hora_fin_domingo = '';
      $.LoadingOverlay("hide");
      
    } else {
      $scope.obtTiendaVirtualM();
      document.getElementById("f01_todos").checked = false;
      document.getElementById("f01_habiles").checked = false;
      document.getElementById("f01_habiles").checked = false;
      //$scope.datos.f01_nombreTV = data[0].tv_nombrec;
      $scope.datos.f01_categoria = data[0].tv_categoria_idc;
      $scope.datos.f01_correoTV = data[0].tv_correoc;
      $scope.datos.f01_pagwebAE =   data[0].tv_pagina_webc;
      $scope.datos.f01_dominio = data[0].pdominio;
      $scope.dominioOriginal = data[0].pdominio;
      
    
      
      //contactos
      var contactos = data[0].tv_contactosc;
        //for(i=0;i<contactos.length;i++){
        for(i=0;i<3;i++){
          var conta = JSON.parse(contactos[i]);
          if (i==0){ 
            $scope.datos.f01_celular1_whatsapp = conta.estado;
            if (conta.estado == 'CON WHATSAPP'){
              $scope.datos.f01_celular1_whatsapp = true;
              $scope.swWhats1 = true;
            }            
            if(conta.estado == 'SIN WHATSAPP' || conta.estado =='undefined' || conta.estado == undefined){
              $scope.swWhats1 = true;
            }
            if(conta.estado == 'FIJO'){
              $scope.swWhats1 = false;
            }
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
            $scope.datos.f01_celular22_whatsapp = conta.estado;
            if (conta.estado == 'CON WHATSAPP' ){
              $scope.datos.f01_celular22_whatsapp = true;
              $scope.swWhats2 = true;
            }
            if(conta.estado == 'SIN WHATSAPP' || conta.estado =='undefined' || conta.estado == undefined ){
              $scope.swWhats2 = true;
            }
            if(conta.estado == 'FIJO'){
              $scope.swWhats2 = false;
            }
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
            $scope.datos.f01_celular3_whatsapp = conta.estado;
            if (conta.estado == 'CON WHATSAPP' ){
              $scope.datos.f01_celular3_whatsapp = true;
              $scope.swWhats3 = true;
            }            
            if(conta.estado == 'SIN WHATSAPP' || conta.estado =='undefined' || conta.estado ==undefined){
              $scope.swWhats3 = true;
            }
            if(conta.estado == 'FIJO'){
              $scope.swWhats3 = false;
            }
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
        $scope.datos.f01_redessocialesAE4_url = "";
        $scope.datos.f01_redessocialesAE4 = "";
        $scope.datos.f01_redessocialesAE5_url = "";
        $scope.datos.f01_redessocialesAE5 = "";
        $scope.inicializaFacebook = true;
        $scope.inicializaTwitter =  true;
        $scope.inicializaInstagram = true;
        $scope.inicializaYoutube = true;
      }else{
        //for(i=0;i<redes.length;i++){
        for(i=0;i<5;i++){
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
          if (i==3){
            $scope.datos.f01_redessocialesAE4_url = red.url;
            $scope.datos.f01_redessocialesAE4 = red.tipo; 
            $scope.datos.f01_redessocialesAE4 = red.checked; 
            if ($scope.datos.f01_redessocialesAE4 == 'true' || $scope.datos.f01_redessocialesAE4 == true){
              $scope.datos.f01_redessocialesAE4 = true; 
              $scope.inicializaYoutube = false;
            }else{
              $scope.inicializaYoutube = true;
              $scope.datos.f01_redessocialesAE4_url = '';
            }
          }
          if (i==4){
            $scope.datos.f01_redessocialesAE5_url = red.url;
            $scope.datos.f01_redessocialesAE5 = red.tipo; 
            $scope.datos.f01_redessocialesAE5= red.checked; 
            if ($scope.datos.f01_redessocialesAE5 == 'true' || $scope.datos.f01_redessocialesAE5 == true){
              $scope.datos.f01_redessocialesAE5 = true; 
              $scope.inicializaOtro = false;
            }else{
              $scope.inicializaOtro = true;
              $scope.datos.f01_redessocialesAE5_url = '';
            }
          }
        }
      }
    

      //RECUPERA HORARIOS
      var horarios = data[0].phorarios_atencion;
      if(horarios == '' || horarios == null || horarios == undefined || horarios == 'null' || horarios == 'undefined'){
        console.log('Sin horarios');
      }else{
        var horas = JSON.parse(horarios);
        for(j=0;j<horas.length;j++){
          var horas1 = JSON.parse(horas[j]);
          if(j==0){
            if(horas1.checked == 'false' || horas1.checked == undefined || horas1.checked == 'undefined' || horas1.checked == false){
              $scope.datos.f01_chk_lunes = false;
            $scope.datos.f01_hora_inicio_lunes = '';
            $scope.datos.f01_hora_fin_lunes = '';
            }else{
              $scope.datos.f01_chk_lunes = true;
              $scope.datos.f01_hora_inicio_lunes = horas1.hora_inicio;
              $scope.datos.f01_hora_fin_lunes = horas1.hora_fin;
            }
          }
          if(j==1){
            if(horas1.checked == 'false' || horas1.checked == undefined || horas1.checked == 'undefined' || horas1.checked == false){
            $scope.datos.f01_chk_martes = false;
            $scope.datos.f01_hora_inicio_martes = '';
            $scope.datos.f01_hora_fin_martes = '';
          }else{
            $scope.datos.f01_chk_martes = true;
            $scope.datos.f01_hora_inicio_martes = horas1.hora_inicio;
            $scope.datos.f01_hora_fin_martes = horas1.hora_fin;
          }
        }
        if(j==2){
          if(horas1.checked == 'false' || horas1.checked == undefined || horas1.checked == 'undefined' || horas1.checked == false){
          $scope.datos.f01_chk_miercoles = false;
          $scope.datos.f01_hora_inicio_miercoles = '';
          $scope.datos.f01_hora_fin_miercoles = '';
          }else{
            $scope.datos.f01_chk_miercoles = true;
            $scope.datos.f01_hora_inicio_miercoles = horas1.hora_inicio;
            $scope.datos.f01_hora_fin_miercoles = horas1.hora_fin;
          }
        }
        if(j==3){
          if(horas1.checked == 'false' || horas1.checked == undefined || horas1.checked == 'undefined' || horas1.checked == false){
          $scope.datos.f01_chk_jueves = false;
          $scope.datos.f01_hora_inicio_juevesf01_chk_jueves = '';
          $scope.datos.f01_hora_fin_juevesf01_chk_jueves = '';
          }else{
            $scope.datos.f01_chk_jueves = true;
            $scope.datos.f01_hora_inicio_jueves = horas1.hora_inicio;
            $scope.datos.f01_hora_fin_jueves = horas1.hora_fin;
          }
        }
        if(j==4){
          if(horas1.checked == 'false' || horas1.checked == undefined || horas1.checked == 'undefined' || horas1.checked == false){
          $scope.datos.f01_chk_viernes = false;
          $scope.datos.f01_hora_inicio_viernes = '';
          $scope.datos.f01_hora_fin_viernes = '';
          }else{
            $scope.datos.f01_chk_viernes = true;
            $scope.datos.f01_hora_inicio_viernes = horas1.hora_inicio;
            $scope.datos.f01_hora_fin_viernes = horas1.hora_fin;
          }
        }
        if(j==5){
          if(horas1.checked == 'false' || horas1.checked == undefined || horas1.checked == 'undefined' || horas1.checked == false){
          $scope.datos.f01_chk_sabado = false;
          $scope.datos.f01_hora_inicio_sabado = '';
          $scope.datos.f01_hora_fin_sabado = '';
          }else{
            $scope.datos.f01_chk_sabado = true;
            $scope.datos.f01_hora_inicio_sabado = horas1.hora_inicio;
            $scope.datos.f01_hora_fin_sabado = horas1.hora_fin;
          }
        }
        if(j==6){
          if(horas1.checked == 'false' || horas1.checked == undefined || horas1.checked == 'undefined' || horas1.checked == false){
          $scope.datos.f01_chk_domingo = false;
          $scope.datos.f01_hora_inicio_domingo = '';
          $scope.datos.f01_hora_fin_domingo = '';
          }else{
            $scope.datos.f01_chk_domingo = true;
            $scope.datos.f01_hora_inicio_domingo = horas1.hora_inicio;
            $scope.datos.f01_hora_fin_domingo = horas1.hora_fin;
          }
        }
      }
     
      }
      //editor
       //setTimeout(function(){
        $scope.recNom = data[0].tv_nombrec;
        $scope.descripNombre = tinyMCE.get('f01_nombreTV').setContent($scope.recNom);  
        $scope.datos.f01_nombreTV = $scope.descripNombre; 

        $scope.recDesc = data[0].tv_descripcionc;
        $scope.descripTienda = tinyMCE.get('f01_descripcionTV').setContent($scope.recDesc);  
        $scope.datos.f01_descripcionTV = $scope.descripTienda; 

        $scope.rec_formaP = data[0].pforma_entrega;
        $scope.descripEntrega = tinyMCE.get('f01_forma_entrega').setContent( $scope.rec_formaP);
        $scope.datos.f01_forma_entrega = $scope.descripEntrega; 

        //catalogo
        $scope.catalogo1 = results[0].tvcatalogo;
        if($scope.catalogo1 == '' || $scope.catalogo1 == null || $scope.catalogo1 == undefined || $scope.catalogo1 == 'null' || $scope.catalogo1 == 'undefined'){
          console.log('Sin catalogo');
        }else{
          if($scope.catalogo1 == '' || $scope.catalogo1 == undefined || $scope.catalogo1 == 'undefined'){
            console.log('Sin Url de catalogo');
          $scope.datos.txt_f01_upload1 = '';
          }else{
            $scope.catalogojson = JSON.parse($scope.catalogo1);
            if($scope.catalogojson.length == 0){
            console.log('Sin Url de catalogo');
            $scope.datos.txt_f01_upload1 = '';
            }else{
              $scope.catalogojson1 = JSON.parse($scope.catalogojson[0]); 
              $scope.datos.txt_f01_upload1 = $scope.catalogojson1.campo;
              $scope.catalogo_url = $scope.catalogojson1.url;
            }
            
          }
        }
        //logotipo
        $scope.logotipo1 = results[0].plogotipo;
        if($scope.logotipo1 == '' || $scope.logotipo1 == null || $scope.logotipo1 == undefined || $scope.logotipo1 == 'null' || $scope.logotipo1 == 'undefined'){
          console.log('Sin logotipo');
        }else{
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
      //encabezado
      $scope.encabezado1 = results[0].pencabezado;
      if($scope.encabezado1 == '' || $scope.encabezado1 == null || $scope.encabezado1 == undefined || $scope.encabezado1 == 'null' || $scope.encabezado1 == 'undefined'){
        console.log('Sin encabezado');
      }else{
        $scope.encabezadotipojson = JSON.parse($scope.encabezado1);
        if($scope.encabezadotipojson.length == 0){
          console.log('Sin Url de encabezado');
          $scope.datos.txt_f01_upload3 = '';
        }else{
          $scope.encabezadotipojson1 = JSON.parse($scope.encabezadotipojson[0]);
          $scope.datos.txt_f01_upload3 = $scope.encabezadotipojson1.campo;
          $scope.encabezadotipo_url = $scope.encabezadotipojson1.url;
        }
      }
     // },500);  

    } 
    $.LoadingOverlay("hide");
    return deferred.promise;
   
}

  $scope.inicioTiendaVirtual = function () {
    $scope.limpiar();    
    $scope.recuperarSerializarInfo($rootScope.datosTiendaVirtual);
  };
  

  $scope.registrarDatosAE = function(data){
    
    var datosTiendaVirtual = new dataTiendaVirtual();
    datosTiendaVirtual.ae_id = sessionService.get("IDAE");
    datosTiendaVirtual.categoria = data.f01_categoria;
    //datosTiendaVirtual.nombre = data.f01_nombreTV;
    datosTiendaVirtual.correo = data.f01_correoTV;
    if(data.f01_categoria == '' || data.f01_correoTV == ''){
      $scope.principal = true;
    }else{
      $scope.principal = false;
    }
    
    
    if(data.f01_dominio == undefined || data.f01_dominio == 'undefined' || data.f01_dominio == '' || data.f01_dominio == null || data.f01_dominio =='null'){
      $scope.sinDominio = true;
      var myInput = document.getElementById('f01_dominio');
        myInput.onpaste = function(e) {
        e.preventDefault();
        alert("esta acción está prohibida");
      }
    }else{
      $scope.sinDominio = false;
      var dom = data.f01_dominio;
      dom = dom.toLowerCase();
      datosTiendaVirtual.dominio = dom;
    }

    datosTiendaVirtual.pagina_web = data.f01_pagwebAE; 
    datosTiendaVirtual.pagina_web = datosTiendaVirtual.pagina_web.toLowerCase();

    $scope.descripNombreT = tinyMCE.get('f01_nombreTV').getContent();
    var resultadoN = $scope.descripNombreT.replace(/'/g, ''); 
    datosTiendaVirtual.nombre = resultadoN; 
    $scope.descripTienda = tinyMCE.get('f01_descripcionTV').getContent();
    var resultado = $scope.descripTienda.replace(/'/g, ''); 
    datosTiendaVirtual.descripcion = resultado;  
    $scope.formaEntrega = tinyMCE.get('f01_forma_entrega').getContent();
    var resultadoFe = $scope.formaEntrega.replace(/'/g, ''); 
    datosTiendaVirtual.forma_entrega = resultadoFe; 


    if($scope.descripNombreT == '' || $scope.descripTienda == '' || $scope.formaEntrega == '' ){
      $scope.swDes = true;
    }
    else{
      $scope.swDes = false;
    }

  /////////
    $rootScope.contactosArray = new Array();
    $rootScope.contactosArray = [];
    var myJSON = '';
    for(j=0;j<3;j++){
      if (j == 0){
        if (data.f01_contacto1=='TELÉFONO'){
          if(data.f01_contacto1_nro != ''){
            myJSON = '{ "tipo":"' + data.f01_contacto1 + '", "valor":"' + data.f01_contacto1_nro + '", "estado":"FIJO" }';
          }else{
            myJSON = '{ "tipo":"", "valor":"","estado":"" }';
            $scope.sinDato1 = true;
          }
          $rootScope.contactosArray.push(myJSON);
        }
        if (data.f01_contacto1=='CELULAR'){
          if(data.f01_contacto1_nro != ''){
            var w1 = data.f01_celular1_whatsapp;
            $scope.activaWhatsapp1(w1);
            myJSON = '{ "tipo":"' + data.f01_contacto1 + '", "valor":"' + data.f01_contacto1_nro + '", "estado":"' + $scope.datos.whatsapp1 + '" }';
          }else{
            myJSON = '{ "tipo":"", "valor":"","estado":"" }';
            $scope.sinDato1 = true;
          }
          $rootScope.contactosArray.push(myJSON);
        }
        if(data.f01_contacto1 == '' || data.f01_contacto1 == undefined || data.f01_contacto1 == 'undefined'){
          myJSON = '{ "tipo":"", "valor":"","estado":"" }';
          data.f01_contacto1_nro = '';
          $rootScope.contactosArray.push(myJSON);
        }
      }
      if (j == 1){
        if (data.f01_contacto2=='TELÉFONO'){
          if(data.f01_contacto2_nro != ''){
            myJSON = '{ "tipo":"' + data.f01_contacto2 + '", "valor":"' + data.f01_contacto2_nro + '", "estado":"FIJO" }';
          }else{
            myJSON = '{ "tipo":"", "valor":"","estado":"" }';
            $scope.sinDato2 = true;
          }
          $rootScope.contactosArray.push(myJSON);
        }
        if (data.f01_contacto2=='CELULAR'){
          if(data.f01_contacto2_nro != ''){
            var w2 = data.f01_celular22_whatsapp;
            $scope.activaWhatsapp2(w2);
            myJSON = '{ "tipo":"' + data.f01_contacto2 + '", "valor":"' + data.f01_contacto2_nro + '", "estado":"' +  $scope.datos.whatsapp2 + '" }';
          }else{
            myJSON = '{ "tipo":"", "valor":"","estado":"" }';
            $scope.sinDato2 = true;
          }
          $rootScope.contactosArray.push(myJSON);
        }
        if(data.f01_contacto2 == '' || data.f01_contacto2 == undefined || data.f01_contacto2 == 'undefined'){
          myJSON = '{ "tipo":"", "valor":"","estado":"" }';
          data.f01_contacto2_nro = '';
          $rootScope.contactosArray.push(myJSON);
        }
      }
      if (j ==2){
        if (data.f01_contacto3=='TELÉFONO'){
          if(data.f01_contacto3_nro != ''){
            myJSON = '{ "tipo":"' + data.f01_contacto3 + '", "valor":"' + data.f01_contacto3_nro + '",  "estado": "FIJO" }';
          }else{
            myJSON = '{ "tipo":"", "valor":"","estado":"" }';
            $scope.sinDato3 = true;
          }
          $rootScope.contactosArray.push(myJSON);
        }
        if (data.f01_contacto3=='CELULAR'){
          if(data.f01_contacto3_nro != ''){
            var w3 = data.f01_celular3_whatsapp;
            $scope.activaWhatsapp3(w3);
            myJSON = '{ "tipo":"' + data.f01_contacto3 + '", "valor":"' + data.f01_contacto3_nro + '",  "estado":"' +  $scope.datos.whatsapp3 + '" }';
          }else{
            myJSON = '{ "tipo":"", "valor":"","estado":"" }';
            $scope.sinDato3 = true;
          }
          $rootScope.contactosArray.push(myJSON);
        }
        if(data.f01_contacto3 == '' || data.f01_contacto3 == undefined || data.f01_contacto3 == 'undefined'){
          myJSON = '{ "tipo":"", "valor":"","estado":"" }';
          data.f01_contacto3_nro = '';
          $rootScope.contactosArray.push(myJSON);
        }

      }
    }  
    datosTiendaVirtual.contactos = JSON.stringify($rootScope.contactosArray);
 
    ////////
    $rootScope.redesSocialesArray = new Array();
    $rootScope.redesSocialesArray = []; 
    myJSON = '';
    for(i=0;i<5;i++){
      if(i == 0){
        if (data.f01_redessocialesAE1=='true' || data.f01_redessocialesAE1==true){
          if(data.f01_redessocialesAE1_url != ''){
            data.f01_redessocialesAE1_url = data.f01_redessocialesAE1_url.toLowerCase();  
            myJSON = '{ "tipo":"facebook", "checked":"true", "url":"' + data.f01_redessocialesAE1_url + '" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }else{
            myJSON = '{ "tipo":"facebook", "checked":"false", "url":"" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }
        }else{
          myJSON = '{ "tipo":"facebook", "checked":"false", "url":"" }';
          $rootScope.redesSocialesArray.push(myJSON);
        }
      }
      if(i == 1){
        if (data.f01_redessocialesAE2=='true' || data.f01_redessocialesAE2==true){
          if(data.f01_redessocialesAE2_url != ''){
            data.f01_redessocialesAE2_url = data.f01_redessocialesAE2_url.toLowerCase();  

            myJSON = '{ "tipo":"twitter", "checked":"true", "url":"' + data.f01_redessocialesAE2_url + '" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }else{
            myJSON = '{ "tipo":"twitter", "checked":"false", "url":"" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }
        }else{
          myJSON = '{ "tipo":"twitter", "checked":"false", "url":"" }';
          $rootScope.redesSocialesArray.push(myJSON);
        }
      }
      if(i == 2){
        if (data.f01_redessocialesAE3=='true' || data.f01_redessocialesAE3==true){
          if(data.f01_redessocialesAE3_url != ''){
            data.f01_redessocialesAE3_url = data.f01_redessocialesAE3_url.toLowerCase();  
            myJSON = '{ "tipo":"instagram", "checked":"true", "url":"' + data.f01_redessocialesAE3_url + '" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }else{
            myJSON = '{ "tipo":"instagram", "checked":"false", "url":"" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }
        }else{
          myJSON = '{ "tipo":"instagram", "checked":"false", "url":"" }';
          $rootScope.redesSocialesArray.push(myJSON);
        }
      }
      if(i == 3){
        if (data.f01_redessocialesAE4=='true' || data.f01_redessocialesAE4==true){
          if(data.f01_redessocialesAE4_url != ''){
            data.f01_redessocialesAE4_url = data.f01_redessocialesAE4_url.toLowerCase();  

            myJSON = '{ "tipo":"youtube", "checked":"true", "url":"' + data.f01_redessocialesAE4_url + '" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }else{
            myJSON = '{ "tipo":"youtube", "checked":"false", "url":"" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }
        }else{
          myJSON = '{ "tipo":"youtube", "checked":"false", "url":"" }';
          $rootScope.redesSocialesArray.push(myJSON);
        }
      }
      if(i == 4){
        if (data.f01_redessocialesAE5=='true' || data.f01_redessocialesAE5==true){
          if(data.f01_redessocialesAE5_url != ''){
            data.f01_redessocialesAE5_url = data.f01_redessocialesAE5_url.toLowerCase();  

            myJSON = '{ "tipo":"otro", "checked":"true", "url":"' + data.f01_redessocialesAE5_url + '" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }else{
            myJSON = '{ "tipo":"otro", "checked":"false", "url":"" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }
        }else{
          myJSON = '{ "tipo":"otro", "checked":"false", "url":"" }';
          $rootScope.redesSocialesArray.push(myJSON);
        }
      }
    }  
    //console.log('$rootScope.redesSocialesArray',$rootScope.redesSocialesArray);
    datosTiendaVirtual.redes_sociales = JSON.stringify($rootScope.redesSocialesArray);
    //catalogo 
   
    if($scope.catalogo1 == '' || $scope.catalogo1 == 'undefined' || $scope.catalogo1 == undefined){
      datosTiendaVirtual.catalogo = [];
    }else{
      datosTiendaVirtual.catalogo = $scope.catalogo1;
    }
    //logotipo
    datosTiendaVirtual.logotipo = $scope.logotipo1;
    datosTiendaVirtual.encabezado = $scope.encabezado1;

    //HORARIO
    $rootScope.horariosArray = new Array();
    $rootScope.horariosArray = [];
    var myJSON = '';
    for(k=0;k<7;k++){

      if(k == 0){
        myJSON = '{ "dia":"LUNES", "checked":"'+data.f01_chk_lunes+'", "hora_inicio":"'+data.f01_hora_inicio_lunes+'","hora_fin":"'+data.f01_hora_fin_lunes+'" }';
        $rootScope.horariosArray.push(myJSON);
      }
      if(k == 1){
        myJSON = '{ "dia":"MARTES", "checked":"'+data.f01_chk_martes+'", "hora_inicio":"'+data.f01_hora_inicio_martes+'","hora_fin":"'+data.f01_hora_fin_martes+'" }';
        $rootScope.horariosArray.push(myJSON);
      }
      if(k == 2){
        myJSON = '{ "dia":"MIERCOLES", "checked":"'+data.f01_chk_miercoles+'", "hora_inicio":"'+data.f01_hora_inicio_miercoles+'","hora_fin":"'+data.f01_hora_fin_miercoles+'" }';
        $rootScope.horariosArray.push(myJSON);
      }
      if(k == 3){
        myJSON = '{ "dia":"JUEVES", "checked":"'+data.f01_chk_jueves+'", "hora_inicio":"'+data.f01_hora_inicio_jueves+'","hora_fin":"'+data.f01_hora_fin_jueves+'" }';
        $rootScope.horariosArray.push(myJSON);
      }
      if(k == 4){
        myJSON = '{ "dia":"VIERNES", "checked":"'+data.f01_chk_viernes+'", "hora_inicio":"'+data.f01_hora_inicio_viernes+'","hora_fin":"'+data.f01_hora_fin_viernes+'" }';
        $rootScope.horariosArray.push(myJSON);
      }
      if(k == 5){
        myJSON = '{ "dia":"SABADO", "checked":"'+data.f01_chk_sabado+'", "hora_inicio":"'+data.f01_hora_inicio_sabado+'","hora_fin":"'+data.f01_hora_fin_sabado+'" }';
        $rootScope.horariosArray.push(myJSON);
      }
      if(k == 6){
        myJSON = '{ "dia":"DOMINGO", "checked":"'+data.f01_chk_domingo+'", "hora_inicio":"'+data.f01_hora_inicio_domingo+'","hora_fin":"'+data.f01_hora_fin_domingo+'" }';
        $rootScope.horariosArray.push(myJSON);
      }

    }
    if(data.f01_chk_lunes == false  && data.f01_chk_martes == false  && data.f01_chk_miercoles == false && data.f01_chk_jueves == false && data.f01_chk_viernes == false && data.f01_chk_sabado == false && data.f01_chk_domingo == false){
      $scope.sinHorario =  true;
    }else{
      $scope.sinHorario =  false;
    }
    datosTiendaVirtual.horarios = JSON.stringify($rootScope.horariosArray);

    datosTiendaVirtual.oid = sessionService.get('IDCIUDADANO');
    if (sessionService.get('TIPO_PERSONA')=='NATURAL'){
        datosTiendaVirtual.usr = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_MATERNO') + ' ' + sessionService.get('US_PATERNO');
    } else {
        datosTiendaVirtual.usr = "juridico";
    }
    if(($scope.logotipo1 != '' && $scope.encabezado1 != '' && data.f01_contacto1_nro != '' && $scope.sinDominio == false && $scope.swDes == false && $scope.principal == false && $scope.sinHorario == false)||
       ($scope.logotipo1 != '' && $scope.encabezado1 != '' && data.f01_contacto2_nro != '' && $scope.sinDominio == false && $scope.swDes == false && $scope.principal == false && $scope.sinHorario == false)||
       ($scope.logotipo1 != '' && $scope.encabezado1 != '' && data.f01_contacto3_nro != '' && $scope.sinDominio == false && $scope.swDes == false && $scope.principal == false && $scope.sinHorario == false)) {
      datosTiendaVirtual.crearTiendaVirtual(function(response){
      //console.log(response);
      results = JSON.parse(response);
      results = results.success;
      if(results.length > 0){
          $.unblockUI();
          //$scope.refrescar();
          sweetAlert('', "Los datos de la Tienda Virtual fueron guardados correctamente.", 'success');
          $rootScope.nuevo = null;
          $rootScope.update = "mostrar";
      } else {
          $.unblockUI();
          sweetAlert('', "Error al guardar los datos de la Tienda Virtual", 'error');
      }
    });  
    }
    else{

      sweetAlert('', "Datos obligatorios, verifique que todas las casillas marcadas con (*) estén completadas.", 'warning');
    }

  }
    
  $scope.actualizarDatosAE = function(data){

      $scope.obtTiendaVirtualM();
      document.getElementById("f01_todos").checked = false;
      document.getElementById("f01_habiles").checked = false;
      document.getElementById("f01_habiles").checked = false;
      var datosTiendaVirtual = new dataTiendaVirtual();
      datosTiendaVirtual.idtv = sessionService.get("IDTV");
      datosTiendaVirtual.ae_id = sessionService.get("IDAE");
      datosTiendaVirtual.categoria = data.f01_categoria;
      //datosTiendaVirtual.nombre = data.f01_nombreTV;
      datosTiendaVirtual.correo = data.f01_correoTV;
      if(data.f01_categoria == '' || data.f01_correoTV == ''){
        $scope.principal = true;
      }else{
        $scope.principal = false;
      }
      datosTiendaVirtual.pagina_web = data.f01_pagwebAE;
      datosTiendaVirtual.pagina_web = datosTiendaVirtual.pagina_web.toLowerCase();
     
      if(data.f01_dominio == undefined || data.f01_dominio == 'undefined' || data.f01_dominio == '' || data.f01_dominio == null || data.f01_dominio =='null'){
        $scope.sinDominio = true;
      }else{
        $scope.sinDominio = false;
        var dom = data.f01_dominio;
        dom = dom.toLowerCase();
        datosTiendaVirtual.dominio = dom;
       
      }
      
      $scope.descripNombreT = tinyMCE.get('f01_nombreTV').getContent();
      var resultadoN = $scope.descripNombreT.replace(/'/g, ''); 
      datosTiendaVirtual.nombre = resultadoN; 

      $scope.descripTienda = tinyMCE.get('f01_descripcionTV').getContent();
      var resultado = $scope.descripTienda.replace(/'/g, ''); 
      datosTiendaVirtual.descripcion = resultado;  

      $scope.formaEntrega = tinyMCE.get('f01_forma_entrega').getContent();
      var resultadoFe = $scope.formaEntrega.replace(/'/g, ''); 
      datosTiendaVirtual.forma_entrega = resultadoFe; 

      if($scope.descripNombreT == '' || $scope.descripTienda == '' || $scope.formaEntrega == '' ){
        $scope.swDes = true;
      }
      else{
        $scope.swDes = false;
      }
      //actualiza json contactos
      
       $rootScope.contactosArray = new Array();
       $rootScope.contactosArray = []; 
       datosTiendaVirtual.contactos = [];
      /////////
      var myJSON = '';
      for(j=0;j<3;j++){
        if (j == 0){
          if (data.f01_contacto1=='TELÉFONO'){
            if(data.f01_contacto1_nro != ''){
              myJSON = '{ "tipo":"' + data.f01_contacto1 + '", "valor":"' + data.f01_contacto1_nro + '", "estado":"FIJO" }';
            }else{
              myJSON = '{ "tipo":"", "valor":"","estado":"" }';
              $scope.sinDato1 = true;
            }
            $rootScope.contactosArray.push(myJSON);
          }
          if (data.f01_contacto1=='CELULAR'){
            if(data.f01_contacto1_nro != ''){
              var w1 = data.f01_celular1_whatsapp;
              $scope.activaWhatsapp1(w1);
              myJSON = '{ "tipo":"' + data.f01_contacto1 + '", "valor":"' + data.f01_contacto1_nro + '", "estado":"' + $scope.datos.whatsapp1 + '" }';
            }else{
              myJSON = '{ "tipo":"", "valor":"","estado":"" }';
              $scope.sinDato1 = true;
            }
            $rootScope.contactosArray.push(myJSON);
          }
          if(data.f01_contacto1 == '' || data.f01_contacto1 == undefined || data.f01_contacto1 == 'undefined'){
            myJSON = '{ "tipo":"", "valor":"","estado":"" }';
            data.f01_contacto1_nro = '';
            $rootScope.contactosArray.push(myJSON);
          }
        }
        if (j == 1){
          if (data.f01_contacto2=='TELÉFONO'){
            if(data.f01_contacto2_nro != ''){
              myJSON = '{ "tipo":"' + data.f01_contacto2 + '", "valor":"' + data.f01_contacto2_nro + '", "estado":"FIJO" }';
            }else{
              myJSON = '{ "tipo":"", "valor":"","estado":"" }';
              $scope.sinDato2 = true;
            }
            $rootScope.contactosArray.push(myJSON);
          }
          if (data.f01_contacto2=='CELULAR'){
            if(data.f01_contacto2_nro != ''){
              var w2 = data.f01_celular22_whatsapp;
              $scope.activaWhatsapp2(w2);
              myJSON = '{ "tipo":"' + data.f01_contacto2 + '", "valor":"' + data.f01_contacto2_nro + '", "estado":"' +  $scope.datos.whatsapp2 + '" }';
            }else{
              myJSON = '{ "tipo":"", "valor":"","estado":"" }';
              $scope.sinDato2 = true;
            }
            $rootScope.contactosArray.push(myJSON);
          }
          if(data.f01_contacto2 == '' || data.f01_contacto2 == undefined || data.f01_contacto2 == 'undefined'){
            myJSON = '{ "tipo":"", "valor":"","estado":"" }';
            data.f01_contacto2_nro = '';
            $rootScope.contactosArray.push(myJSON);
          }
        }
        if (j ==2){
          if (data.f01_contacto3=='TELÉFONO'){
            if(data.f01_contacto3_nro != ''){
              myJSON = '{ "tipo":"' + data.f01_contacto3 + '", "valor":"' + data.f01_contacto3_nro + '",  "estado": "FIJO" }';
            }else{
              myJSON = '{ "tipo":"", "valor":"","estado":"" }';
              $scope.sinDato3 = true;
            }
            $rootScope.contactosArray.push(myJSON);
          }
          if (data.f01_contacto3=='CELULAR'){
            if(data.f01_contacto3_nro != ''){
              var w3 = data.f01_celular3_whatsapp;
              $scope.activaWhatsapp3(w3);
              myJSON = '{ "tipo":"' + data.f01_contacto3 + '", "valor":"' + data.f01_contacto3_nro + '",  "estado":"' +  $scope.datos.whatsapp3 + '" }';
            }else{
              myJSON = '{ "tipo":"", "valor":"","estado":"" }';
              $scope.sinDato3 = true;
            }
            $rootScope.contactosArray.push(myJSON);
          }
          if(data.f01_contacto3 == '' || data.f01_contacto3 == undefined || data.f01_contacto3 == 'undefined'){
            myJSON = '{ "tipo":"", "valor":"","estado":"" }';
            data.f01_contacto3_nro = '';
            $rootScope.contactosArray.push(myJSON);
          }

        }
      }  
 
      datosTiendaVirtual.contactos = JSON.stringify($rootScope.contactosArray);

      //actualiza json redes
      $rootScope.redesSocialesArray = new Array();
      $rootScope.redesSocialesArray = [];
      datosTiendaVirtual.redes_sociales = [];
      myJSON = '';
      for(i=0;i<5;i++){
        if(i == 0){
          if (data.f01_redessocialesAE1=='true' || data.f01_redessocialesAE1==true){
            if(data.f01_redessocialesAE1_url != ''){
              data.f01_redessocialesAE1_url = data.f01_redessocialesAE1_url.toLowerCase();  
              myJSON = '{ "tipo":"facebook", "checked":"true", "url":"' + data.f01_redessocialesAE1_url + '" }';
              $rootScope.redesSocialesArray.push(myJSON);
            }else{
              myJSON = '{ "tipo":"facebook", "checked":"false", "url":"" }';
              $rootScope.redesSocialesArray.push(myJSON);
            }
          }else{
            myJSON = '{ "tipo":"facebook", "checked":"false", "url":"" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }
        }
        if(i == 1){
          if (data.f01_redessocialesAE2=='true' || data.f01_redessocialesAE2==true){
            if(data.f01_redessocialesAE2_url != ''){
              data.f01_redessocialesAE2_url = data.f01_redessocialesAE2_url.toLowerCase();  
              myJSON = '{ "tipo":"twitter", "checked":"true", "url":"' + data.f01_redessocialesAE2_url + '" }';
              $rootScope.redesSocialesArray.push(myJSON);
            }else{
              myJSON = '{ "tipo":"twitter", "checked":"false", "url":"" }';
              $rootScope.redesSocialesArray.push(myJSON);
            }
          }else{
            myJSON = '{ "tipo":"twitter", "checked":"false", "url":"" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }
        }
        if(i == 2){
          if (data.f01_redessocialesAE3=='true' || data.f01_redessocialesAE3==true){
            if(data.f01_redessocialesAE3_url != ''){
              data.f01_redessocialesAE3_url = data.f01_redessocialesAE3_url.toLowerCase();  

              myJSON = '{ "tipo":"instagram", "checked":"true", "url":"' + data.f01_redessocialesAE3_url + '" }';
              $rootScope.redesSocialesArray.push(myJSON);
            }else{
              myJSON = '{ "tipo":"instagram", "checked":"false", "url":"" }';
              $rootScope.redesSocialesArray.push(myJSON);
            }
          }else{
            myJSON = '{ "tipo":"instagram", "checked":"false", "url":"" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }
        }
        if(i == 3){
          if (data.f01_redessocialesAE4=='true' || data.f01_redessocialesAE4==true){
            if(data.f01_redessocialesAE4_url != ''){
              data.f01_redessocialesAE4_url = data.f01_redessocialesAE4_url.toLowerCase();  
              myJSON = '{ "tipo":"youtube", "checked":"true", "url":"' + data.f01_redessocialesAE4_url + '" }';
              $rootScope.redesSocialesArray.push(myJSON);
            }else{
              myJSON = '{ "tipo":"youtube", "checked":"false", "url":"" }';
              $rootScope.redesSocialesArray.push(myJSON);
            }
          }else{
            myJSON = '{ "tipo":"youtube", "checked":"false", "url":"" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }
        }
        if(i == 4){
          if (data.f01_redessocialesAE5=='true' || data.f01_redessocialesAE5==true){
            if(data.f01_redessocialesAE5_url != ''){
              data.f01_redessocialesAE5_url = data.f01_redessocialesAE5_url.toLowerCase();  
              myJSON = '{ "tipo":"otro", "checked":"true", "url":"' + data.f01_redessocialesAE5_url + '" }';
              $rootScope.redesSocialesArray.push(myJSON);
            }else{
              myJSON = '{ "tipo":"otro", "checked":"false", "url":"" }';
              $rootScope.redesSocialesArray.push(myJSON);
            }
          }else{
            myJSON = '{ "tipo":"otro", "checked":"false", "url":"" }';
            $rootScope.redesSocialesArray.push(myJSON);
          }
        }
      }  
             
      datosTiendaVirtual.redes_sociales = JSON.stringify($rootScope.redesSocialesArray);
      datosTiendaVirtual.catalogo = $scope.catalogo1;
      datosTiendaVirtual.logotipo = $scope.logotipo1;
      datosTiendaVirtual.encabezado = $scope.encabezado1;

      ///HORARIOS ACT
      $rootScope.horariosArray = new Array();  
      $rootScope.horariosArray = [];  
      datosTiendaVirtual.horarioss = [];    
      myJSON = '';
      for(k=0;k<7;k++){
        if(k == 0){
          myJSON = '{ "dia":"LUNES", "checked":"'+data.f01_chk_lunes+'", "hora_inicio":"'+data.f01_hora_inicio_lunes+'","hora_fin":"'+data.f01_hora_fin_lunes+'" }';
          $rootScope.horariosArray.push(myJSON);
        }
        if(k == 1){
          myJSON = '{ "dia":"MARTES", "checked":"'+data.f01_chk_martes+'", "hora_inicio":"'+data.f01_hora_inicio_martes+'","hora_fin":"'+data.f01_hora_fin_martes+'" }';
          $rootScope.horariosArray.push(myJSON);
        }
        if(k == 2){
          myJSON = '{ "dia":"MIERCOLES", "checked":"'+data.f01_chk_miercoles+'", "hora_inicio":"'+data.f01_hora_inicio_miercoles+'","hora_fin":"'+data.f01_hora_fin_miercoles+'" }';
          $rootScope.horariosArray.push(myJSON);
        }
        if(k == 3){
          myJSON = '{ "dia":"JUEVES", "checked":"'+data.f01_chk_jueves+'", "hora_inicio":"'+data.f01_hora_inicio_jueves+'","hora_fin":"'+data.f01_hora_fin_jueves+'" }';
          $rootScope.horariosArray.push(myJSON);
        }
        if(k == 4){
          myJSON = '{ "dia":"VIERNES", "checked":"'+data.f01_chk_viernes+'", "hora_inicio":"'+data.f01_hora_inicio_viernes+'","hora_fin":"'+data.f01_hora_fin_viernes+'" }';
          $rootScope.horariosArray.push(myJSON);
        }
        if(k == 5){
          myJSON = '{ "dia":"SABADO", "checked":"'+data.f01_chk_sabado+'", "hora_inicio":"'+data.f01_hora_inicio_sabado+'","hora_fin":"'+data.f01_hora_fin_sabado+'" }';
          $rootScope.horariosArray.push(myJSON);
        }
        if(k == 6){
          myJSON = '{ "dia":"DOMINGO", "checked":"'+data.f01_chk_domingo+'", "hora_inicio":"'+data.f01_hora_inicio_domingo+'","hora_fin":"'+data.f01_hora_fin_domingo+'" }';
          $rootScope.horariosArray.push(myJSON);
        }

      }
      if(data.f01_chk_lunes == false  && data.f01_chk_martes == false  && data.f01_chk_miercoles == false && data.f01_chk_jueves == false && data.f01_chk_viernes == false && data.f01_chk_sabado == false && data.f01_chk_domingo == false){
        $scope.sinHorario =  true;
      }else{
        $scope.sinHorario =  false;
      } 
      datosTiendaVirtual.horarios = JSON.stringify($rootScope.horariosArray);
      datosTiendaVirtual.oid = sessionService.get('IDCIUDADANO');
      if (sessionService.get('TIPO_PERSONA')=='NATURAL'){
          datosTiendaVirtual.usr = sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_MATERNO') + ' ' + sessionService.get('US_PATERNO');
      } else {
          datosTiendaVirtual.usr = "juridico";
      }

      if(($scope.logotipo1 != '' && $scope.encabezado1 != '' && data.f01_contacto1_nro != '' && $scope.sinDominio == false && $scope.swDes == false && $scope.principal == false && $scope.sinHorario == false)||
          ($scope.logotipo1 != '' && $scope.encabezado1 != '' && data.f01_contacto2_nro != '' && $scope.sinDominio == false && $scope.swDes == false && $scope.principal == false && $scope.sinHorario == false)||
          ($scope.logotipo1 != '' && $scope.encabezado1 != '' && data.f01_contacto3_nro != '' && $scope.sinDominio == false && $scope.swDes == false && $scope.principal == false && $scope.sinHorario == false)) {
        datosTiendaVirtual.actualizarTiendaVirtual(function(response){
        //console.log(response);
        results = JSON.parse(response);
        results = results.success;
        if(results.length > 0){
            $.unblockUI();
            sweetAlert('', "La información de la Tienda Virtual fue actualizada ", 'success');
            $rootScope.nuevo = null;       
        } else {
            $.unblockUI();
            sweetAlert('', "Error al Actualizar información de la Tienda Virtual", 'error');
        }
      });
  
    }else{
      sweetAlert('', "Datos obligatorios, verifique que todas las casillas marcadas con (*) estén completadas.", 'warning');
    }
  }
    
  $scope.limpiar = function(){
    console.log('limpiando Campos');
      $scope.datos.f01_celular1_whatsapp = false;
      $scope.datos.f01_celular2_whatsapp = false;
      $scope.datos.f01_celular3_whatsapp = false;
      $scope.swWhats1 = false;
      $scope.swWhats2 = false;
      $scope.swWhats3 = false;
      $scope.datos.f01_nombreTV = "";
      $scope.datos.f01_descripcionTV = "";
      $scope.datos.f01_categoria = "";//falta
      $scope.datos.f01_correoTV = "";
      $scope.datos.f01_pagwebAE = "";
      $scope.datos.f01_dominio= '';
      $scope.datos.f01_contacto1_nro = "";
      $scope.datos.f01_contacto1 = "";
      $scope.datos.f01_contacto2_nro = "";
      $scope.datos.f01_contacto2 = "";
      $scope.datos.f01_contacto3_nro = "";
      $scope.datos.f01_contacto3 = "";
      $scope.datos.f01_forma_entrega = "";
      $scope.datos.f01_redessocialesAE1_url = "";
      $scope.datos.f01_redessocialesAE1 = "";
      $scope.datos.f01_redessocialesAE2_url = "";
      $scope.datos.f01_redessocialesAE2 = "";
      $scope.datos.f01_redessocialesAE3_url = "";
      $scope.datos.f01_redessocialesAE3 = "";
      $scope.datos.f01_redessocialesAE4_url = "";
      $scope.datos.f01_redessocialesAE4 = "";
      $scope.datos.f01_redessocialesAE5_url = "";
      $scope.datos.f01_redessocialesAE5 = "";
      $scope.datos.txt_f01_upload1 = "";
      $scope.datos.txt_f01_upload2 = "";
      $scope.datos.txt_f01_upload3 = "";
      $rootScope.archivosProducto = [];
      $rootScope.archivosLogotipo = [];
      $rootScope.archivosEncabezado = [];
      $rootScope.contactosArray = []; 
      $rootScope.redesSocialesArray = [];
      $rootScope.horariosArray = [];
      document.getElementById('txt_f01_upload1').value = "";
      document.getElementById('txt_f01_upload2').value = "";
      document.getElementById('txt_f01_upload3').value = "";
      $scope.catalogo1 = '';
      $scope.logotipo1 = '';
      $scope.encabezado1 = '';
      $scope.catalogo_url = '';
      $scope.logotipo_url = '';
      $scope.encabezadotipo_url = '';
      $scope.sinDato1 = false;
      $scope.sinDato2 = false;
      $scope.sinDato3 = false;
      $scope.swTel = false;
      $scope.swCel = false;
      $scope.datos.f01_chk_habiles = false;
      $scope.datos.f01_chk_todos = false;
      $scope.datos.f01_hora_inicio = '';
      $scope.datos.f01_hora_fin = '';
      $scope.datos.f01_chk_lunes = false;
      $scope.datos.f01_hora_inicio_lunes = '';
      $scope.datos.f01_hora_fin_lunes = '';
      $scope.datos.f01_chk_martes = false;
      $scope.datos.f01_hora_inicio_martes = '';
      $scope.datos.f01_hora_fin_martes = '';
      $scope.datos.f01_chk_miercoles = false;
      $scope.datos.f01_hora_inicio_miercoles = '';
      $scope.datos.f01_hora_fin_miercoles = '';
      $scope.datos.f01_chk_jueves = false;
      $scope.datos.f01_hora_inicio_jueves = '';
      $scope.datos.f01_hora_fin_jueves = '';
      $scope.datos.f01_chk_viernes = false;
      $scope.datos.f01_hora_inicio_viernes = '';
      $scope.datos.f01_hora_fin_viernes = '';
      $scope.datos.f01_chk_sabado = false;
      $scope.datos.f01_hora_inicio_sabado = '';
      $scope.datos.f01_hora_fin_sabado = '';
      $scope.datos.f01_chk_domingo = false;
      $scope.datos.f01_hora_inicio_domingo = '';
      $scope.datos.f01_hora_fin_domingo = '';
      document.getElementById("f01_todos").checked = false;
      document.getElementById("f01_habiles").checked = false;
      document.getElementById("f01_ninguna").checked = false;
      $("#mensaje1").hide();
      $("#mensaje2").hide();
      $("#mensaje3").hide();
      $("#mensaje4").hide();
      $("#mensaje5").hide();
      $("#mensaje6").hide();
      $("#mensajeT1").hide();
      $("#mensajeT2").hide();
      $("#mensajeT3").hide();
      $("#mensajeT4").hide();
      $("#mensajeT5").hide();
      $("#mensajeT6").hide();
      $("#mensajeT7").hide();
      $("#mensajeT8").hide();
      $("#mensajeT9").hide();
      $("#mensajeR1").hide();
      $("#mensajeR2").hide();
      $("#mensajeR3").hide();
      $("#mensajeR4").hide();
      $("#mensajeR5").hide();
      $("#mensajeR6").hide();
      $("#mensajeR7").hide();
      $("#mensajeR8").hide();
      $("#mensajeR9").hide();
      $("#mensajeR10").hide();
      $("#mensajeT11").hide();
      $("#mensajeT12").hide();
      $("#mensajeT10").hide();
    
  }
  $scope.obtTiendaVirtualM = function(){
    idActividadEconomica = sessionService.get('IDAE');
    try {
      var dataTV = new dataTiendaVirtual();
      dataTV.idAe = idActividadEconomica;
      dataTV.obtDataTiendaVirtual(function(res){
          r = JSON.parse(res);
          results = r.success;
          $rootScope.datosTiendaVirtual = results;
          if (results.length == 0){
            
          } else {
            //alert(results[0].tv_idc);
            sessionService.set('IDTV', results[0].tv_idc);
          }
      });
    } catch(error){
      console.log("Error Interno : ", error);
    }
};
  $scope.validaCorreo =function(){
    var $result = $("#result");
    var email = $("#f01_correoTV").val();
    if(email == undefined || email == 'undefined' || email == null || email == 'null' || email == ''){
      $("#mensaje2").hide();
      $("#mensaje1").hide();
    }else{
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
    }
    return false;
  }
  $scope.validarEmail =function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
  
  $scope.valWhatsapp = function(datoTel){
      Numer=parseInt(datoTel);
      if (isNaN(Numer)){
      document.getElementById('f01_contacto_whatsapp').value = '';
      }else{
      var digits = ("" + Numer).split("");
      if(digits.length > 0 && (digits[0] == 6 || digits[0] == 7 )){
          if((digits.length>0) && (digits.length<8)){
            $("#mensajeT12").show();
            $("#mensajeT10").hide();
            $("#mensajeT11").hide();
          }else{
            $("#mensajeT10").hide();
            $("#mensajeT11").show();
            $("#mensajeT12").hide();
          }
      }else{
          $("#mensajeT11").hide();
          $("#mensajeT10").show();
          $("#mensajeT12").hide();
          document.getElementById('f01_contacto_whatsapp').value = '';
      }
      }
  }
  $scope.activarCampo1 = function(dato){
    if(dato == 'CELULAR'){
      $scope.swWhats1 = true;
    }else{
      $scope.swWhats1 = false;
      $scope.datos.f01_celular1_whatsapp = false; 

    }
    $scope.tipoTel1 = dato;
    if(dato == "" || dato == undefined || dato == 'undefined'){
      document.getElementById('f01_contacto1_nro').value = '';
      document.getElementById('f01_contacto1_nro').disabled = true;
      $rootScope.inicializaC1 = true;
      $("#mensajeT1").hide();
      $("#mensajeT3").hide();
      $("#mensajeT2").hide();
   }else{
      $rootScope.inicializaC1 = false;
      document.getElementById('f01_contacto1_nro').disabled = false;
      document.getElementById('f01_contacto1_nro').value = '';
      $("#mensajeT1").show();
      $("#mensajeT3").hide();
      $("#mensajeT2").hide();
    }
  }
  $scope.valNumTelefono1 = function(datoTel){
    var tipotel1 = document.getElementById('f01_contacto1').value;
      if(tipotel1 == 'TELÉFONO'){    
      Numer=parseInt(datoTel);
        if (isNaN(Numer)){
        document.getElementById('f01_contacto1_nro').value = '';
        }else{
        var digits = ("" + Numer).split("");
        if(digits.length > 0 && (digits[0] == 2 || digits[0] == 3 || digits[0] == 4 || event.keyCode == 9)){
          if((digits.length>0) && (digits.length<7)){
              $("#mensajeT3").show();
              $("#mensajeT1").hide();
              $("#mensajeT2").hide();
            }else{
              $("#mensajeT2").show();
              $("#mensajeT1").hide();
              $("#mensajeT3").hide();
            }
            if(digits.length == 8 ){
              $("#mensajeT3").show();
              $("#mensajeT1").hide();
              $("#mensajeT2").hide();
            }
        }else{
            $("#mensajeT1").show();
            $("#mensajeT2").hide();
            $("#mensajeT3").hide();
            document.getElementById('f01_contacto1_nro').value = '';
        }
        }
      }
      if(tipotel1 == 'CELULAR'){
        Numer=parseInt(datoTel);
        if (isNaN(Numer)){
        document.getElementById('f01_contacto1_nro').value = '';
        }else{
        var digits = ("" + Numer).split("");
        if(digits.length > 0 && (digits[0] == 6 || digits[0] == 7 || event.keyCode == 9)){
            if((digits.length>0) && (digits.length<8)){
              $("#mensajeT3").show();
              $("#mensajeT1").hide();
              $("#mensajeT2").hide();
            }else{
              $("#mensajeT2").show();
              $("#mensajeT1").hide();
              $("#mensajeT3").hide();
            }
        }else{
            $("#mensajeT1").show();
            $("#mensajeT2").hide();
            $("#mensajeT3").hide();
            document.getElementById('f01_contacto1_nro').value = '';
        }
        }

      }
      if(tipotel1 == undefined || tipotel1 == 'undefined'){
        document.getElementById('f01_contacto1_nro').value = '';
      }
    
  }
  $scope.activarCampo2 = function(dato){
    $scope.tipoTel2 = dato;
    if(dato == 'CELULAR'){
      $scope.swWhats2 = true;
    }else{
      $scope.swWhats2 = false;
       $scope.datos.f01_celular22_whatsapp = false; 
    }
    if(dato == "" || dato == undefined || dato == 'undefined'){
      document.getElementById('f01_contacto2_nro').value = '';
      document.getElementById('f01_contacto2_nro').disabled = true;
      $rootScope.inicializaC2 = true;
      $("#mensajeT6").hide()
      $("#mensajeT5").hide();
      $("#mensajeT4").hide();
    }else{
      document.getElementById('f01_contacto2_nro').disabled = false;
      document.getElementById('f01_contacto2_nro').value = '';
     $("#mensajeT4").show();
     $("#mensajeT6").hide()
     $("#mensajeT5").hide();
    }
  }
  $scope.valNumTelefono2 = function(datoTel){
    var tipotel2 = document.getElementById('f01_contacto2').value;
    if(tipotel2 == 'TELÉFONO'){
     Numer=parseInt(datoTel);
      if (isNaN(Numer)){
      document.getElementById('f01_contacto2_nro').value = '';
      }else{
      var digits = ("" + Numer).split("");
      if(digits.length > 0 && (digits[0] == 2 || digits[0] == 3 || digits[0] == 4 || event.keyCode == 9)){
          if((digits.length>0) && (digits.length<7)){
            $("#mensajeT6").show();
            $("#mensajeT5").hide();
            $("#mensajeT4").hide();
          }else{
            $("#mensajeT5").show();
            $("#mensajeT4").hide();
            $("#mensajeT6").hide();
          }
          if(digits.length == 8 ){
            $("#mensajeT6").show();
            $("#mensajeT5").hide();
            $("#mensajeT4").hide();
          }
      }else{
        $("#mensajeT4").show();
        $("#mensajeT5").hide();
        $("#mensajeT6").hide();
          document.getElementById('f01_contacto2_nro').value = '';
      }
      }
    }
    if(tipotel2 == 'CELULAR'){
      Numer=parseInt(datoTel);
      if (isNaN(Numer)){
      document.getElementById('f01_contacto2_nro').value = '';
      }else{
      var digits = ("" + Numer).split("");
      if(digits.length > 0 && (digits[0] == 6 || digits[0] == 7 || event.keyCode == 9)){
          if((digits.length>0) && (digits.length<8)){
            $("#mensajeT6").show();
            $("#mensajeT5").hide();
            $("#mensajeT4").hide();
          }else{
            $("#mensajeT5").show();
            $("#mensajeT4").hide();
            $("#mensajeT6").hide();
          }
      }else{
        $("#mensajeT4").show();
        $("#mensajeT5").hide();
        $("#mensajeT6").hide();
          document.getElementById('f01_contacto2_nro').value = '';
      }
      }
    }
    if(tipotel2 == undefined || tipotel2 == 'undefined'){
      document.getElementById('f01_contacto2_nro').value = '';
    }

  }
  $scope.activarCampo3 = function(dato){
    $scope.tipoTel3 = dato;
    if(dato == 'CELULAR'){
      $scope.swWhats3 = true;
    }else{
      $scope.swWhats3 = false;
      $scope.datos.f01_celular3_whatsapp = false; 
    }
    if(dato == "" || dato == undefined || dato == 'undefined'){
      document.getElementById('f01_contacto3_nro').value = '';
      document.getElementById('f01_contacto3_nro').disabled = true;
      $rootScope.inicializaC3 = true;
      $("#mensajeT9").hide();
      $("#mensajeT8").hide();
      $("#mensajeT7").hide();
    }else{
      document.getElementById('f01_contacto3_nro').disabled = false;
      document.getElementById('f01_contacto3_nro').value = '';
      $("#mensajeT7").show();
      $("#mensajeT9").hide();
      $("#mensajeT8").hide();
    }
  }
  $scope.valNumTelefono3 = function(datoTel){
    var tipotel3 = document.getElementById('f01_contacto3').value;
    if(tipotel3 == 'TELÉFONO'){
     Numer=parseInt(datoTel);
      if (isNaN(Numer)){
      document.getElementById('f01_contacto3_nro').value = '';
      }else{
      var digits = ("" + Numer).split("");
      if(digits.length > 0 && (digits[0] == 2 || digits[0] == 3 || digits[0] == 4 || event.keyCode == 9)){
          if((digits.length>0) && (digits.length<7)){
            $("#mensajeT9").show();
            $("#mensajeT8").hide();
            $("#mensajeT7").hide();
          }else{
            $("#mensajeT7").hide();
            $("#mensajeT8").show();
            $("#mensajeT9").hide();
          }
          if(digits.length == 8 ){
            $("#mensajeT9").show();
            $("#mensajeT8").hide();
            $("#mensajeT7").hide();
          }
      }else{
        $("#mensajeT7").show();
        $("#mensajeT8").hide();
        $("#mensajeT9").hide();
          document.getElementById('f01_contacto3_nro').value = '';
      }
      }
    }
    if(tipotel3 == 'CELULAR'){
      Numer=parseInt(datoTel);
      if (isNaN(Numer)){
      document.getElementById('f01_contacto3_nro').value = '';
      }else{
      var digits = ("" + Numer).split("");
      if(digits.length > 0 && (digits[0] == 6 || digits[0] == 7 || event.keyCode == 9)){
          if((digits.length>0) && (digits.length<8)){
            $("#mensajeT9").show();
            $("#mensajeT8").hide();
            $("#mensajeT7").hide();
          }else{
            $("#mensajeT7").hide();
            $("#mensajeT8").show();
            $("#mensajeT9").hide();
          }
      }else{
        $("#mensajeT7").show();
        $("#mensajeT8").hide();
        $("#mensajeT9").hide();
          document.getElementById('f01_contacto3_nro').value = '';
      }
      }
    }
    if(tipotel3 == undefined || $scope.tipoTel3 == 'undefined'){
      document.getElementById('f01_contacto3_nro').value = '';
    }

  }

  $scope.activaWhatsapp1 = function(dato){
    $scope.whatsapp1 = dato;
    if(dato == true) {
      $scope.datos.whatsapp1 = "CON WHATSAPP";
    } else {
      $scope.datos.whatsapp1 = "SIN WHATSAPP";
    }
  } 
  $scope.activaWhatsapp2 = function(dato2){
    $scope.whatsapp2 = dato2;
    if(dato2 == true) {
      $scope.datos.whatsapp2 = "CON WHATSAPP";
    } else {
      $scope.datos.whatsapp2 = "SIN WHATSAPP";
    }
  } 
  $scope.activaWhatsapp3 = function(dato){
    $scope.whatsapp3 = dato;

    if(dato == true) {
      $scope.datos.whatsapp3 = "CON WHATSAPP";
    } else {
      $scope.datos.whatsapp3 = "SIN WHATSAPP";
    }
  } 
  

 $scope.activaRedes1 = function(dato){
    $("#mensajeR1").hide();
    $("#mensajeR2").hide();
    $scope.redFacebook = dato;
    if(dato == false) {
      $scope.inicializaFacebook = true;
      document.getElementById('f01_redessocialesAE1_url').value = '';
      $("#mensajeR1").hide();
    } else {
      $scope.inicializaFacebook =  false;
      $("#mensajeR1").show();
    }
  }
  $scope.activaRedes2 = function(dato){
    $("#mensajeR3").hide();
    $("#mensajeR4").hide();
    $scope.redTwitter = dato
    if(dato == false) {
      $scope.inicializaTwitter = true;
      document.getElementById('f01_redessocialesAE2_url').value = '';
      $("#mensajeR3").hide();
    } else {
      $scope.inicializaTwitter = false;
      $("#mensajeR3").show();
      
    }
  }
  $scope.activaRedes3 = function(dato){
    $("#mensajeR5").hide();
    $("#mensajeR6").hide();
    $scope.redInstagram = dato;
    if(dato == false) {
      $scope.inicializaInstagram = true;
      document.getElementById('f01_redessocialesAE3_url').value = ''; 
      $("#mensajeR5").hide();
    } else {
      $scope.inicializaInstagram = false;
      $("#mensajeR5").show();
    }
  }
  $scope.activaRedes4 = function(dato){
    $("#mensajeR7").hide();
    $("#mensajeR8").hide();
    $scope.redYoutube = dato;
    if(dato == false) {
      $scope.inicializaYoutube = true;
      document.getElementById('f01_redessocialesAE4_url').value = ''; 
      $("#mensajeR7").hide();
    } else {
      $scope.inicializaYoutube = false;
      $("#mensajeR7").show();
    }
  }
  $scope.activaRedes5 = function(dato){
    $("#mensajeR9").hide();
    $("#mensajeR10").hide();
    $scope.redOtro = dato;
    if(dato == false) {
      $scope.inicializaOtro = true;
      document.getElementById('f01_redessocialesAE5_url').value = ''; 
      $("#mensajeR9").hide();
    } else {
      $scope.inicializaOtro = false;
      $("#mensajeR9").show();
    }
  }
  /*$scope.validaRedes1 = function (datos){
    if($scope.redFacebook == true){
      $("#mensajeR1").show();
      $("#mensajeR2").hide();
      if(datos.length > 10){
        $("#mensajeR1").hide();
        $("#mensajeR2").show();
      }
    }else{
      $("#mensajeR1").hide();
      $("#mensajeR2").hide();
    }
  }
  $scope.validaRedes2 = function (datos){

    if($scope.redTwitter == true){
      $("#mensajeR3").show();
      $("#mensajeR4").hide();
      if(datos.length > 10){
        $("#mensajeR3").hide();
        $("#mensajeR4").show();
      }
    }else{
      $("#mensajeR3").hide();
      $("#mensajeR4").hide();
    }
  }
  $scope.validaRedes3 = function (datos){
    if($scope.redInstagram == true){
      $("#mensajeR5").show();
      $("#mensajeR6").hide();
      if(datos.length > 10){
        $("#mensajeR5").hide();
        $("#mensajeR6").show();
      }
    }else{
      $("#mensajeR5").hide();
      $("#mensajeR6").hide();
    }
  }
  $scope.validaRedes4 = function (datos){
    if($scope.redYoutube == true){
      $("#mensajeR7").show();
      $("#mensajeR8").hide();
      if(datos.length > 10){
        $("#mensajeR7").hide();
        $("#mensajeR8").show();
      }
    }else{
      $("#mensajeR7").hide();
      $("#mensajeR8").hide();
    }
  }
  $scope.validaRedes5 = function (datos){
    if($scope.redOtro == true){
      $("#mensajeR9").show();
      $("#mensajeR10").hide();
      if(datos.length > 10){
        $("#mensajeR9").hide();
        $("#mensajeR10").show();
      }
    }else{
      $("#mensajeR9").hide();
      $("#mensajeR10").hide();
    }
  }*/
  $scope.activaTodos = function(datos){
    $scope.todos = datos;
    if($scope.todos == 'TODOS'){
      if($scope.datos.f01_hora_inicio!='' && $scope.datos.f01_hora_fin!=''){
        $scope.datos.f01_hora_inicio_lunes = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_lunes = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_lunes = true;        
        $scope.datos.f01_hora_inicio_martes = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_martes = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_martes = true;
        $scope.datos.f01_hora_inicio_miercoles = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_miercoles = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_miercoles = true;
        $scope.datos.f01_hora_inicio_jueves = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_jueves = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_jueves = true;
        $scope.datos.f01_hora_inicio_viernes = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_viernes = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_viernes = true;
        $scope.datos.f01_hora_inicio_sabado = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_sabado = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_sabado = true;
        $scope.datos.f01_hora_inicio_domingo = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_domingo = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_domingo = true;
      }
      else{
        sweetAlert('', "Para seleccionar esta opción, primero debe elegir la hora de inicio y de fin de atención", 'warning');
        document.getElementById("f01_todos").checked = false;
      }
    }
    if($scope.todos == 'HABILES'){
      if($scope.datos.f01_hora_inicio!='' && $scope.datos.f01_hora_fin!=''){
        $scope.datos.f01_hora_inicio_lunes = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_lunes = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_lunes = true;        
        $scope.datos.f01_hora_inicio_martes = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_martes = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_martes = true;
        $scope.datos.f01_hora_inicio_miercoles = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_miercoles = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_miercoles = true;
        $scope.datos.f01_hora_inicio_jueves = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_jueves = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_jueves = true;
        $scope.datos.f01_hora_inicio_viernes = $scope.datos.f01_hora_inicio;
        $scope.datos.f01_hora_fin_viernes = $scope.datos.f01_hora_fin;
        $scope.datos.f01_chk_viernes = true;
        $scope.datos.f01_hora_inicio_sabado = '';
        $scope.datos.f01_hora_fin_sabado = '';
        $scope.datos.f01_chk_sabado = false;
        $scope.datos.f01_hora_inicio_domingo = '';
        $scope.datos.f01_hora_fin_domingo = '';
        $scope.datos.f01_chk_domingo = false;
      } else{
        sweetAlert('', "Para seleccionar esta opción, primero debe elegir la hora de inicio y de fin de atención", 'warning');
        document.getElementById("f01_habiles").checked = false;
      }       
    }
    if($scope.todos == 'NINGUNA'){
      $scope.datos.f01_hora_inicio = '';
      $scope.datos.f01_hora_fin = '';
      $scope.datos.f01_hora_inicio_lunes = '';
      $scope.datos.f01_hora_fin_lunes = '';
      $scope.datos.f01_chk_lunes = false;        
      $scope.datos.f01_hora_inicio_martes = '';
      $scope.datos.f01_hora_fin_martes = '';
      $scope.datos.f01_chk_martes = false;
      $scope.datos.f01_hora_inicio_miercoles = '';
      $scope.datos.f01_hora_fin_miercoles = '';
      $scope.datos.f01_chk_miercoles = false;
      $scope.datos.f01_hora_inicio_jueves = '';
      $scope.datos.f01_hora_fin_jueves = '';
      $scope.datos.f01_chk_jueves = false;
      $scope.datos.f01_hora_inicio_viernes = '';
      $scope.datos.f01_hora_fin_viernes = '';
      $scope.datos.f01_chk_viernes = false;
      $scope.datos.f01_hora_inicio_sabado = '';
      $scope.datos.f01_hora_fin_sabado = '';
      $scope.datos.f01_chk_sabado = false;
      $scope.datos.f01_hora_inicio_domingo = '';
      $scope.datos.f01_hora_fin_domingo = '';
      $scope.datos.f01_chk_domingo = false;
    }

  }
    
  $scope.activaLunes = function(datos){
    $scope.lunes = datos;
   // if($scope.lunes == true){
      if($scope.datos.f01_hora_inicio_lunes!='' && $scope.datos.f01_hora_fin_lunes!=''){
        $scope.datos.f01_chk_lunes = true;        
      }else{
        $scope.datos.f01_chk_lunes = false;
        $scope.datos.f01_hora_inicio_lunes = '';
        $scope.datos.f01_hora_fin_lunes = '';

        sweetAlert('', 'Seleccionar la hora de inicio y fin de atención', 'warning');
      }
    //}
    if($scope.lunes == false){
      $scope.datos.f01_hora_inicio_lunes = '';
      $scope.datos.f01_hora_fin_lunes = '';
      $scope.datos.f01_chk_lunes = false;        
    }
  }
  $scope.activaMartes = function(datos){
    $scope.martes = datos;
    if($scope.martes == true){
      if($scope.datos.f01_hora_inicio_martes!='' && $scope.datos.f01_hora_fin_martes!=''){
        $scope.datos.f01_chk_martes = true;        
      }else{
        $scope.datos.f01_chk_martes = false;
        $scope.datos.f01_hora_inicio_martes = '';
        $scope.datos.f01_hora_fin_martes = '';

        sweetAlert('', "Seleccionar la hora de inicio y fin de atención", 'warning');
      }
    }
    if($scope.martes == false){
      $scope.datos.f01_hora_inicio_martes = '';
      $scope.datos.f01_hora_fin_martes = '';
      $scope.datos.f01_chk_martes = false;        
    }
  }
  $scope.activaMiercoles = function(datos){
    $scope.miercoles = datos;
    if($scope.miercoles == true){
      if($scope.datos.f01_hora_inicio_miercoles!='' && $scope.datos.f01_hora_fin_miercoles!=''){
        $scope.datos.f01_chk_miercoles = true;        
      }else{
        $scope.datos.f01_chk_miercoles = false;
        $scope.datos.f01_hora_inicio_miercoles = '';
        $scope.datos.f01_hora_fin_miercoles = '';

        sweetAlert('', "Seleccionar la hora de inicio y fin de atención", 'warning');
      }
    }
    if($scope.miercoles == false){
      $scope.datos.f01_hora_inicio_miercoles = '';
      $scope.datos.f01_hora_fin_miercoles = '';
      $scope.datos.f01_chk_miercoles = false;        
    }
  }
  $scope.activaJueves = function(datos){
    $scope.jueves = datos;
    if($scope.jueves == true){
      if($scope.datos.f01_hora_inicio_jueves!='' && $scope.datos.f01_hora_fin_jueves!=''){
        $scope.datos.f01_chk_jueves = true;        
      }else{
        $scope.datos.f01_chk_jueves = false;
        $scope.datos.f01_hora_inicio_jueves = '';
        $scope.datos.f01_hora_fin_jueves = '';

        sweetAlert('', "Seleccionar la hora de inicio y fin de atención", 'warning');
      }
    }
    if($scope.jueves == false){
      $scope.datos.f01_hora_inicio_jueves = '';
      $scope.datos.f01_hora_fin_jueves = '';
      $scope.datos.f01_chk_jueves = false;        
    }
  }
  $scope.activaViernes = function(datos){
    $scope.viernes = datos;
        if($scope.viernes == true){
      if($scope.datos.f01_hora_inicio_viernes!='' && $scope.datos.f01_hora_fin_viernes!=''){
        $scope.datos.f01_chk_viernes = true;        
      }else{
        $scope.datos.f01_chk_viernes = false;
        $scope.datos.f01_hora_inicio_viernes = '';
        $scope.datos.f01_hora_fin_viernes = '';

        sweetAlert('', "Seleccionar la hora de inicio y fin de atención", 'warning');
      }
    }
    if($scope.viernes == false){
      $scope.datos.f01_hora_inicio_viernes = '';
      $scope.datos.f01_hora_fin_viernes = '';
      $scope.datos.f01_chk_viernes = false;        
    }
  }
  $scope.activaSabado = function(datos){
    $scope.sabado = datos;
    if($scope.sabado == true){
      if($scope.datos.f01_hora_inicio_sabado!='' && $scope.datos.f01_hora_fin_sabado!=''){
        $scope.datos.f01_chk_sabado = true;        
      }else{
        $scope.datos.f01_chk_sabado = false;
        $scope.datos.f01_hora_inicio_sabado = '';
        $scope.datos.f01_hora_fin_sabado = '';

        sweetAlert('', "Seleccionar la hora de inicio y fin de atención", 'warning');
      }
    }
    if($scope.sabado == false){
      $scope.datos.f01_hora_inicio_sabado = '';
      $scope.datos.f01_hora_fin_sabado = '';
      $scope.datos.f01_chk_sabado = false;        
    }
  }
  $scope.activaDomingo = function(datos){
    $scope.domingo = datos;
    if($scope.domingo == true){
      if($scope.datos.f01_hora_inicio_domingo!='' && $scope.datos.f01_hora_fin_domingo!=''){
        $scope.datos.f01_chk_domingo = true;        
      }else{
        $scope.datos.f01_chk_domingo = false;
        $scope.datos.f01_hora_inicio_domingo = '';
        $scope.datos.f01_hora_fin_domingo = '';
        sweetAlert('', "Seleccionar la hora de inicio y fin de atención", 'warning');
      }
    }
    if($scope.domingo == false){
      $scope.datos.f01_hora_inicio_domingo = '';
      $scope.datos.f01_hora_fin_domingo = '';
      $scope.datos.f01_chk_domingo = false;        
    }
  } 
  $scope.cambiaCategoria = function(datos){
    $scope.categoria = datos;
    if($scope.categoria == 1){
      $scope.catSeleccionada = 'ALIMENTOS';
    }
    if($scope.categoria == 2){
      $scope.catSeleccionada = 'ENTRETENIMIENTO';
    }
    if($scope.categoria == 3){
      $scope.catSeleccionada = 'HOTELERIA Y TURISMO';
    }
    if($scope.categoria == 4){
      $scope.catSeleccionada = 'SALUD';
    }
    if($scope.categoria == 5){
      $scope.catSeleccionada = 'SERVICIOS';
    }
    if($scope.categoria == 6){
      $scope.catSeleccionada = 'CONSTRUCCIÓN';
    }
    if($scope.categoria == 7){
      $scope.catSeleccionada = 'COMERCIO';
    }
    if($scope.categoria == 8){
      $scope.catSeleccionada = 'INDUSTRIA Y MANUFACTURA';
    }
    swal({
      title: "¿Está usted seguro(a)?", 
      text: "Seleccionó la categoria: " +$scope.catSeleccionada,
      confirmButtonText: "Aceptar", 
    });

  }
  $scope.activaCheckL = function(datos){
    if(datos == 'L'){
      var lunesIni = $scope.datos.f01_hora_inicio_lunes;
      var lunesFin= $scope.datos.f01_hora_fin_lunes;
      if(lunesIni != '' && lunesFin != ''){
        $scope.datos.f01_chk_lunes = true;
      }else{
        $scope.datos.f01_chk_lunes = false;
      }
    }
    if(datos == 'M'){
      var martesIni = $scope.datos.f01_hora_inicio_martes;
      var martesFin= $scope.datos.f01_hora_fin_martes;
      if(martesIni != '' && martesFin != ''){
        $scope.datos.f01_chk_martes = true;
      }else{
        $scope.datos.f01_chk_martes = false;
      }
    }
    if(datos == 'MI'){
      var miercolesIni = $scope.datos.f01_hora_inicio_miercoles;
      var miercolesFin= $scope.datos.f01_hora_fin_miercoles;
      if(miercolesIni != '' && miercolesFin != ''){
        $scope.datos.f01_chk_miercoles = true;
      }else{
        $scope.datos.f01_chk_miercoles = false;
      }
    }
    if(datos == 'J'){
      var juevesIni = $scope.datos.f01_hora_inicio_jueves;
      var juevesFin= $scope.datos.f01_hora_fin_jueves;
      if(juevesIni != '' && juevesFin != ''){
        $scope.datos.f01_chk_jueves = true;
      }else{
        $scope.datos.f01_chk_jueves = false;
      }
    }
    if(datos == 'V'){
      var viernesIni = $scope.datos.f01_hora_inicio_viernes;
      var viernesFin= $scope.datos.f01_hora_fin_viernes;
      if(viernesIni != '' && viernesFin != ''){
        $scope.datos.f01_chk_viernes = true;
      }else{
        $scope.datos.f01_chk_viernes = false;
      }
    }
    if(datos == 'S'){
      var sabadoIni = $scope.datos.f01_hora_inicio_sabado;
      var sabadoFin= $scope.datos.f01_hora_fin_sabado;
      if(sabadoIni != '' && sabadoFin != ''){
        $scope.datos.f01_chk_sabado = true;
      }else{
        $scope.datos.f01_chk_sabado = false;
      }
    }
    if(datos == 'D'){
      var domingoIni = $scope.datos.f01_hora_inicio_domingo;
      var domingoFin= $scope.datos.f01_hora_fin_domingo;
      if(domingoIni != '' && domingoFin != ''){
        $scope.datos.f01_chk_domingo = true;
      }else{
        $scope.datos.f01_chk_domingo = false;
      }
    }

  }
  $scope.validaDominio = function(datos){
    if(datos == undefined || datos == 'undefined' || datos == null || datos == 'null' || datos == ''){
      $("#mensaje3").hide();
    }else{
      if(datos == $scope.dominioOriginal){
      }else{
        var datos = datos.toLowerCase();   
        var lonDom = datos.length;
        if(lonDom >=4){
        var datosVerificacion = new dataTiendaVirtual();
          datosVerificacion.dominio = datos;
          datosVerificacion.verificarDominio(function(response){
          results = JSON.parse(response);
   
          if(results.success[0].tv_verificar_dominio == false){
            $("#mensaje4").hide();
            $("#mensaje3").show(); 
            $scope.sinDominio = false;
          }else{
            $("#mensaje3").hide();
            $("#mensaje4").show(); 
            $scope.sinDominio = true;
          }
        });
      }else{
          $("#mensaje4").hide();
          $("#mensaje3").hide(); 
        
      }

      }
      
    }
  }
  
  $scope.verificarDatosRegistro =  function(){
    if($scope.encabExiste == '' && $scope.logoExiste === ''){
      $scope.swDatos = true;
    }
  }
  $scope.is_url = function(str,tipo){
    if(str == 'undefined' || str == undefined || str == 'null' || str == null || str == ''){
      $("#mensaje5").hide();
      $("#mensaje6").hide(); 

    }else{
      var str = str.toLowerCase();
      regexp = /^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;   
      if(tipo == 'PW'){
        if (regexp.test(str)){
          $("#mensaje5").show();
          $("#mensaje6").hide();
          return true;
        }else{      
          $("#mensaje5").hide();
          $("#mensaje6").show();
          return false;  
        }
      }
      if(tipo == 'F'){
        if (regexp.test(str)){
          $("#mensajeR2").show();
          $("#mensajeR1").hide();
          return true;
        }else{      
          $("#mensajeR2").hide();
          $("#mensajeR1").show();
          return false;  
        }
      }
      if(tipo == 'T'){
        if (regexp.test(str)){
          $("#mensajeR4").show();
          $("#mensajeR3").hide();
          return true;
        }else{      
          $("#mensajeR4").hide();
          $("#mensajeR3").show();
          return false;  
        }
      }
      if(tipo == 'I'){
        if (regexp.test(str)){
          $("#mensajeR6").show();
          $("#mensajeR5").hide();
          return true;
        }else{      
          $("#mensajeR6").hide();
          $("#mensajeR5").show();
          return false;  
        }
      }
      if(tipo == 'Y'){
        if (regexp.test(str)){
          $("#mensajeR8").show();
          $("#mensajeR7").hide();
          return true;
        }else{      
          $("#mensajeR8").hide();
          $("#mensajeR7").show();
          return false;  
        }
      }
      if(tipo == 'O'){
        if (regexp.test(str)){
          $("#mensajeR10").show();
          $("#mensajeR9").hide();
          return true;
        }else{      
          $("#mensajeR10").hide();
          $("#mensajeR9").show();
          return false;  
        }
      }
    }
    


  }
  

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
        $scope.id_ae = sessionService.get('IDAE');
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
                  var nombreNuevo = descDoc + '_' + $scope.id_ae + '.'+imagenFile[1];
                  $scope.catalogo_url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevo + "?app_name=todoangular";
                  fileUploadcorr.uploadFileToUrl1(archivo, uploadUrl, nombreNuevo);
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
                  if(aArchivos[0].type == 'image/png' || aArchivos[0].type == 'image/jpeg'){
                    var descDoc = "logotipo";
                    var descArchivo = "logotipo de la AE";
                    var imagenFile = archivo.name.split('.');
                    var tipoFile = imagenFile[1];
                    var nombreNuevoL = descDoc + '_' + $scope.id_ae +'.'+imagenFile[1];
                    $scope.logoExiste = nombreNuevoL;
                    $scope.logotipo_url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevoL + "?app_name=todoangular";
                    fileUploadcorr.uploadFileToUrl1(archivo, uploadUrl, nombreNuevoL);
                    document.getElementById('txt_f01_upload2').value = nombreNuevoL;
                    var uploadUrlA = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevoL + "?app_name=todoangular";
                    var myJSON = '{ "url":"' + uploadUrlA + '", "campo":"' + nombreNuevoL + '", "nombre":"' + descArchivo + '" }';
                    $rootScope.archivosLogotipo.push(myJSON);
                    var logo_array = [];
                    var logo = JSON.stringify($rootScope.archivosLogotipo[0]);
                    var logo1 = JSON.parse(logo);
                    logo_array.push(logo1);
                    $scope.logotipo1 =  JSON.stringify(logo_array);
                  }else{
                    var descDoc = '';
                    var descArchivo = '';
                    sweetAlert('Error', "Seleccione un archivo tipo Imagen", 'error');
                  }
                }

                if (idFiles[key]==3){
                  if(aArchivos[0].type == 'image/png' || aArchivos[0].type == 'image/jpeg'){
                    var descDoc = "encabezado";
                    var descArchivo = "Encabezado de la Pagina Web";
                    var imagenFile = archivo.name.split('.');
                    var tipoFile = imagenFile[1];
                    var nombreNuevoE = descDoc + '_' + $scope.id_ae +'.'+imagenFile[1];
                    $scope.encabExiste = nombreNuevoE;
                    $scope.encabezadotipo_url = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevoE + "?app_name=todoangular";
                    fileUploadcorr.uploadFileToUrl1(archivo, uploadUrl, nombreNuevoE);
                    document.getElementById('txt_f01_upload3').value = nombreNuevoE;
                    var uploadUrlA = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/mis_productos/" + nombreNuevoE + "?app_name=todoangular";
                    var myJSON = '{ "url":"' + uploadUrlA + '", "campo":"' + nombreNuevoE + '", "nombre":"' + descArchivo + '" }';
                    $rootScope.archivosEncabezado.push(myJSON);
                    var encabezado_array = [];
                    var encabezado = JSON.stringify($rootScope.archivosEncabezado[0]);
                    var encabezado1 = JSON.parse(encabezado);
                    encabezado_array.push(encabezado1);
                    $scope.encabezado1 =  JSON.stringify(encabezado_array);
                  }else{
                    var descDoc = '';
                    var descArchivo = '';
                    sweetAlert('Error', "Seleccione un archivo tipo Imagen", 'error');
                  }


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