function registroMascotasController($scope,$timeout,CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route,sweet,$http,FileUploader,$sce,fileUpload,filterFilter,$routeParams, $location, Data,$q){
  $scope.$on('api:ready', function () {
    /*$scope.llamar_data_ciudadano();
    $scope.tramitesCiudadano();
    $scope.MacroZona();*/
  });
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + (hoy.getMonth()+1)  + '-' + hoy.getFullYear();
  var hora =  hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  $scope. fechayhora = fecha + ' '+hora;
  $scope.swimagen = '';
  
  $scope.inicioServicios = function () {
    /*$scope.llamar_data_ciudadano();
    $scope.tramitesCiudadano();
    $scope.MacroZona();
    $.blockUI();$.blockUI();*/
    //$scope.mostrar_form_mascotas = true;
    //$scope.cargandoMascotas();  
    id = 1;
    /*if (id == 1){
      $scope.listarRaza('37');                                          

    }       */                                
                                
    //$scope.mostrarRaza('37'); 
    $scope.datosMascota('1');
    var sci = sessionService.get('CICIUDADANO');
    $scope.listarMascotasXci(sci);
  };

   //mag
   $("#mensaje1").hide();
   $("#mensaje2").hide();
   
  $scope.tablaTramites = {}; 
  $scope.tramitesMascota = [];  
  $scope.datos = {};
  $scope.tramiteSeleccionado = "";
  $scope.dsaraza = true;

  //$scope.swImg = '';
  //$scope.swImgok = '';

  $scope.cargandoMascotas = function(){
    $scope.cargandoMascotas = [
      {nombre:"BOOBY", url:"http://imagen.jpg", fecha_registro : "19/03/2019"},
      {nombre:"BOOBY", url:"http://imagen.jpg", fecha_registro : "19/03/2019"},
      {nombre:"BOOBY", url:"http://imagen.jpg", fecha_registro : "19/03/2019"}
    ];
    $scope.tramitesMascota = $scope.cargandoMascotas;
  };

  $scope.listarMascotasXci = function(ci){
    setTimeout(function(){
      $.blockUI();
  }, 600);
     ci = sessionService.get('CICIUDADANO');
     var datosMascota   = new reglasnegocioM();
     datosMascota.identificador = 'SISTEMA_VALLE-CM-2043';
     datosMascota.parametros = '{"xcarnet":'+ci+'}';
     datosMascota.llamarregla(function(results){
     try{
        if(results.length == 0){
          alertify.error("No tiene Mascotas registradas...");
        }else{
         $scope.tramitesMascota = JSON.parse(results);
          angular.forEach($scope.tramitesMascota, function(value, key){
            value.xmascota_data = JSON.parse(value.xmascota_data);
          });
         $scope.$apply();
         $scope.tablaTramites.reload();
        }
     }catch(e){
     console.log(e.toString());
     }
        $.unblockUI();     
    });
  }


  $scope.tablaTramites = new ngTableParams({
    page: 1,
    count: 4,
    filter: {}    
},{
total: $scope.tramitesMascota.length,
getData: function($defer, params)
{
    var filteredData = params.filter() ?
    $filter('filter')($scope.tramitesMascota, params.filter()) :
    $scope.tramitesMascota;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    $scope.tramitesMascota;
    params.total($scope.tramitesMascota.length);
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
}
});

  //DATOS PERSONALES DEL CIUDADANNO
 $scope.ci = sessionService.get('CICIUDADANO');
 $scope.nombre = sessionService.get('US_NOMBRE');
 $scope.paterno = sessionService.get('US_PATERNO');
 $scope.materno = sessionService.get('US_MATERNO');
 $scope.exp = sessionService.get('CIEXPEDIDO');

    

  $scope.seleccionarMascota = function(data_tramite){
    $scope.botonMod = true;
    $scope.botonCrea = false;
  //  $scope.swImg = '';
  //  $scope.swImgok = '';

    $scope.tramiteSeleccionado = data_tramite.xmascota_id;
    $scope.estado = data_tramite.xmascota_estado;
    if($scope.estado == 'inactivo'){
      $scope.desabilitado = true;
    }else{
      $scope.desabilitado = false;
    }

    if (data_tramite.vcodigo == null) {
      $scope.tram = "";
    }else {
      $scope.tram = data_tramite.vcodigo;
    }
    alertify.success('Mascota seleccionada '+ $scope.tram);
    $scope.mostrar_form_mascotas = true;
    $scope.cargarDataMascota(data_tramite);
    
  }
  $scope.cargarDataMascota = function(data){  //RECUPERA DATOS DELA MASCOTA
    if(($scope.botonMod == true) && ($scope.vacunas.length > 0)){
      $scope.infogrilla = data.xmascota_data.reg_vacunas;
    } 
    if(($scope.botonMod == true) && ($scope.vacunas == 0)){
      $scope.infogrilla =  [];
    } 
    if($scope.botonCrea == true){
      $scope.vacunas = [];
    } 
    $scope.datos.xcodigo_chip = data.xcodigo_chip;
    $scope.datos.xmascota_id = data.xmascota_id;
    $scope.datos.xmascota_raza_id = data.xmascota_raza_id;
    $scope.datos.xmascota_usr_id = data.xmascota_usr_id;
    $scope.datos.xmascota_titular_id = data.xmascota_titular_id;
    $scope.datos.xmascota_titular_ci = data.xmascota_titular_ci;
    $scope.datos.mascota_nombre = data.xmascota_data.nombre_mas;
    $scope.datos.mascota_raza = data.xmascota_data.mascota_raza;
    $scope.datos.mascota_edad = data.xmascota_data.edad;
    $scope.datos.mascota_especie = data.xmascota_data.especie;
    $scope.datos.mascota_sexo = data.xmascota_data.sexo;
    $scope.datos.mascota_peso = data.xmascota_data.peso;
    $scope.listarRaza(data.xmascota_data.especie); //CARGA LA RAZA DE LA MASCOTA
    $scope.datos.mascota_tamanio = data.xmascota_data.tamanio;
    $scope.datos.mascota_esterilizacion = data.xmascota_data.esterilizacion;
    $scope.datos.mascota_feca = data.xmascota_data.nombre_mas;
    $scope.datos.mascota_color = data.xmascota_data.color;
    $scope.datos.mascota_marca = data.xmascota_data.marca;
    $scope.datos.mascota_certificado = "";//data.xmascota_data.reg_desparacitacion.certificacion;
    $scope.datos.mascota_veterinario = "";
    $scope.datos.mascota_institucion = "";
    $scope.datos.mascota_documento = "";
    $scope.datos.mascota_desparasitacion = data.xmascota_data.desparacitacion;
     mascota_id1 = $scope.datos.xmascota_id;
     mascota_raza_id1 = $scope.mascota_raza_id;
     codigo_chip1 = $scope.codigo_chip;
     mascota_titular_ci1 =  $scope.mascota_titular_ci;
    $scope.datos.reg_edad_des = data.xmascota_data.reg_edad_des; 
    $scope.datos.reg_peso_des = data.xmascota_data.reg_peso_des;
  }

  //serializarInformacion
  $scope.serializarInformacion = function(data){    
  $scope.insertarDataMascota(data);
    if ($scope.swimagen == true){
      if($scope.vacunas.length == 0){
        //alert('sin vacunas');
        swal({
          title: 'Mensaje de Verificación',
          text: 'Estimado Ciudadano, ¡No registró Vacunas!, ¿Se encuentra seguro/a de realizar el registro?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'SI',
          cancelButtonText: 'NO',
          closeOnConfirm: false
      }, function() {
          swal.close();
          setTimeout(function(){
            var datosMascota   = new reglasnegocioM();
            datosMascota.identificador = 'SISTEMA_VALLE-CM-2053';
            datosMascota.parametros = JSON.stringify($scope.dataMascota);
            datosMascota.llamarregla(function(results){ 
                if (results.length == 0){
                  alertify.error("Su mascota no fue registrada, por favor verifique sus datos.");
                }else{
                  $("#formModal").modal("show");
                  var sci = sessionService.get('CICIUDADANO');
                  $scope.listarMascotasXci(sci);        
                  $scope.tablaTramites.reload();
                  $scope.$apply();
                  alertify.success('Su Mascota fue registrada.');
                  $scope.cargarNuevaDataMascota();
                } 
          });
          }, 1000);
           
      });
    }else{
        //alert('con vacunas');
        console.log('$scope.vacunas.length',$scope.vacunas.length);
        swal('Estimado Ciudadano', 'Ud. registró:' + $scope.vacunas.length+ ' Vacuna(s)', 'success');
        var datosMascota   = new reglasnegocioM();
        datosMascota.identificador = 'SISTEMA_VALLE-CM-2053';
        datosMascota.parametros = JSON.stringify($scope.dataMascota);
        datosMascota.llamarregla(function(results){ 
            console.log('results registro mescota',results);
            if (results.length == 0){
              alertify.error("Su mascota no fue registrada, por favor verifique sus datos.");
            }else{
              $("#formModalP").modal("show");
              var sci = sessionService.get('CICIUDADANO');
              $scope.listarMascotasXci(sci);        
              $scope.tablaTramites.reload();
              $scope.$apply();
              alertify.success('Su Mascota fue registrada.');
              $scope.cargarNuevaDataMascota();
            } 
      });
      }
    }else{
      swal('Estimado Ciudadano', 'Todavia no seleccionó una imagen, por favor adjunte la imagen de su mascota.');
    }
      
  }
  $scope.dataMascota = {};
  $scope.insertarDataMascota = function(data){
    if($scope.botonMod == true){
      $scope.dataMascota.xmascota_id = data.xmascota_id; 
      $scope.dataMascota.xmascota_imagen_url = data.mascota_imagen_url;//data.xmascota_imagen_url;
    } 
    if($scope.botonCrea == true){
      $scope.dataMascota.titular_id = "2";//data.xmascota_titular_id;//2
      $scope.dataMascota.xmascota_imagen_url =  $scope.url_imagen; 
    } 
    
    if(data.xmascota_raza_id){
      $scope.dataMascota.xmascota_raza_id = data.xmascota_raza_id;//raza_id
    }else{
      $scope.dataMascota.xmascota_raza_id = data.mascota_raza;//raza_id
    }   
    $scope.dataMascota.xmascota_usr_id =  sessionService.get('CICIUDADANO');//data.xmascota_usr_id;//ci_igob
    $scope.dataMascota.cod_chip = "FOTO";//url de la foto
    $scope.dataMascota.xmascota_titular_ci = sessionService.get('CICIUDADANO');//data.xmascota_titular_ci;//ci_igob

    
   
   

    $scope.dataMascota.xmascota_data = "{}";
        //reg_desparacitacion
    $scope.reg_desparacitacion = {};
    $scope.reg_desparacitacion.fecha_aplicacion = data.mascota_feca_desparasitacion;
    $scope.reg_desparacitacion.institucion = data.mascota_institucion_desparasitacion;
    $scope.reg_desparacitacion.nombre_veterinario_realizacion = data.mascota_veterinario_desparasitacion;  
    $scope.reg_desparacitacion.nombre_marca = 'Certificación';
    //reg_esterilizacion
    $scope.reg_marca = {};
    $scope.reg_marca.codigo_esterilizacion = data.mascota_certificado;
    $scope.reg_marca.fecha_aplicacion = data.reg_feca;
    $scope.reg_marca.institucion = data.mascota_institucion;
    $scope.reg_marca.nombre_marca = data.mascota_marca;
    $scope.reg_marca.nombre_veterinario_realizacion = data.mascota_veterinario;     

    //reg_vacunas
    $scope.reg_vacunas = {};
    $scope.reg_vacunas.nomb_vete = data.nomb_vete;
    $scope.reg_vacunas.inst_vete = data.inst_vete;
    $scope.reg_vacunas.tipo_vacuna = data.tipo_vacuna;
    $scope.reg_vacunas.nro_dosis = data.nro_dosis;
    $scope.reg_vacunas.fecha_vacuna = data.fecha_vacuna;

    //xmascota_data
    $scope.dataMascota_data = {};
    $scope.dataMascota_data.nombre_mas = data.mascota_nombre;
    $scope.dataMascota_data.edad = data.mascota_edad;
    $scope.dataMascota_data.peso = data.mascota_peso;
    $scope.dataMascota_data.raza = $scope.raza_mascota; //RAZA$scope.raza_mascota 
    $scope.dataMascota_data.sexo = $scope.sexo_mascota;
    $scope.dataMascota_data.color = data.mascota_color;
    $scope.dataMascota_data.especie = data.mascota_especie;
    $scope.dataMascota_data.tamanio = data.mascota_tamanio;
    
    $scope.dataMascota_data.comp_peli = $scope.raza_peligrosa; //RAZA PELIGROSA
    $scope.dataMascota_data.vete_actual = data.mascota_veterinario;
    $scope.dataMascota_data.compromiso = "En mi calidad de titular de la mascota registrada ,  me comprometo a no maltratar ni abandonar , brindar el cuidado y atención a la mascota bajo mi custodia , así como el cumplimiento de las normas legales en actual vigencia. En aplicación al Texto Ordenado de las Leyes Municipales Autonómicas 239/316, Reglamento de la Ley Municipal Autonómica para Animales de Compañía Artículos del 5 al 17, 86 y 89.";
    $scope.dataMascota_data.desparacitacion = $scope.desparasitacion1; //DESPARASITACION
    $scope.dataMascota_data.esterilizacion = $scope.esterilizacion; //ESTERILIZACION
    $scope.dataMascota_data.marca = $scope.marca;  //MARCA
    $scope.dataMascota_data.reg_desparacitacion = $scope.reg_desparacitacion;
    //$scope.dataMascota_data.reg_desparacitacion = JSON.stringify($scope.reg_desparacitacion);
    $scope.dataMascota_data.reg_marca = $scope.reg_marca;
    //$scope.dataMascota_data.reg_marca = JSON.stringify($scope.reg_marca);
    $scope.dataMascota_data.reg_vacunas = $scope.data1; ///recupera en la grilla
    $scope.dataMascota_data.vacunas = $scope.vacunas; //VACUNAS
    $scope.dataMascota.xmascota_data = JSON.stringify($scope.dataMascota_data);
   

   
  }
 // serializar informacion
    //modificar Informacion
  $scope.modificarInformacionMascota = function(data){    
    $scope.insertarDataMascota(data);
    datosMascotaMod   = new reglasnegocioM();
    datosMascotaMod.identificador = 'SISTEMA_VALLE-CM-2037';
    datosMascotaMod.parametros = JSON.stringify($scope.dataMascota);
    datosMascotaMod.llamarregla(function(results){  
      var resp = JSON.parse(results);
        var sci = sessionService.get('CICIUDADANO');
        $scope.listarMascotasXci(sci);        
        $scope.tablaTramites.reload();
        $scope.$apply();
        alertify.success('Datos de la Mascota fue Modificada');
    });  

  }
  $scope.mostrarRaza = function(id_raza){
      if($scope.mascotas_razas){
        angular.forEach($scope.mascotas_razas,function(value, key){
          if(value._raza_id == id_raza){
            $scope.raza_mascota = value._raza_data;
          }
          if(id_raza == 27 || id_raza == 26 || id_raza == 28 || id_raza == 29 || id_raza == 30 || id_raza == 31 || id_raza == 82 || id_raza == 33 || id_raza == 34 || id_raza == 35 ) {
            $("#formModalP").modal("show");
            $scope.raza_peligrosa = 'En mi calidad de titular de la mascota registrada , me comprometo hacerme responsable de mi mascota y cumplir con las normas legales en actual vigencia, En aplicación de la Ley 553, al Texto Ordenado de las Leyes Municipales Autonómicas 239/316, Reglamento de la Ley Municipal Autonómica para Animales de Compañía Artículos del 5 al 17, del 86 al 89.';
          }else{
            $scope.raza_peligrosa = 'no';
          }
        });
      }
     }
  
    $scope.mostrarSexo = function(id_sexo){
      if (id_sexo == 'macho'){
        $scope.sexo_mascota = 'MACHO';
      }
      if (id_sexo == 'hembra'){
        $scope.sexo_mascota = 'HEMBRA';
  
      }
     
    } 

    $scope.muestra_esterilizacion = function(opcion){
      if(opcion == 'no'){
        $scope.estrilizacion = false;
        $scope.esterilizacion = 'no';
        $scope.marca = 'ninguna';
        $scope.reg_marca = {};
      }
      if(opcion == 'si'){
        $scope.estrilizacion = true;
        $scope.esterilizacion = 'si';
        $scope.marca = $scope.datos.mascota_marca;
      }
    }
    
    $scope.muestra_desparasitacion = function(opcion){
      if(opcion == 'no'){
        $scope.desparasitacion = false;
        $scope.desparasitacion1 = 'no';
      }
      if(opcion == 'si'){
        $scope.desparasitacion = true;
        $scope.desparasitacion1 = 'si';
      }
    }

  $scope.cargarNuevaDataMascota = function(){  
    $scope.botonMod = false;
    $scope.botonCrea = true;
 
    $scope.mostrar_form_mascotas = true; 
    $scope.datos.mascota_nombre = "";
    $scope.datos.mascota_raza = "";
    $scope.datos.mascota_edad = "";
    $scope.datos.mascota_especie = "";
    $scope.datos.mascota_sexo = "";
    $scope.datos.mascota_peso = "";
    $scope.datos.mascota_tamanio = "";
    $scope.datos.mascota_esterilizacion = "";
    $scope.datos.mascota_feca = "";
    $scope.datos.mascota_color = "";
    $scope.datos.mascota_marca = "";
    $scope.datos.mascota_certificado = "";
    $scope.datos.mascota_veterinario = "";
    $scope.datos.mascota_institucion = "";
    $scope.datos.mascota_documento = "";
    $scope.datos.mascota_desparasitacion = "";
    $scope.vacunas = [];
    $scope.datos.mascota_esterilizacion = -1;
    $scope.datos.reg_feca = "";  
    $scope.datos.mascota_marca = "";
    $scope.datos.mascota_certificado = ""; 
    $scope.datos.mascota_institucion = ""; 
    $scope.datos.mascota_veterinario = "";
    $scope.datos.mascota_desparasitacion = -1; 
    $scope.datos.mascota_feca_desparasitacion = ""; 
    $scope.datos.mascota_veterinario_desparasitacion = "";  
    $scope.datos.mascota_institucion_desparasitacion = "";


  }  

  $scope.listarRaza = function(data){
    var datosMascota   = new reglasnegocioM();
    datosMascota.identificador = 'SERVICIO_VALLE-CM-391';
    datosMascota.parametros = '{"especieid":"' + data + '"}';
    datosMascota.llamarregla(function(results){
      var resp = JSON.parse(results);
        $scope.mascotas_razas = resp;
        $scope.dsaraza = false;
        $scope.$apply();
    });    
  } 
   //listarRaza

    
  ///maga
  $scope.validarEmail =function(email_ca) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email_ca);
  }

 

 //CONTACTOS
 $scope.registrarContacto = function(data){
  var datosContacto   = new reglasnegocioM();
  datosContacto.identificador = 'SISTEMA_VALLE-CM-2047';
  usr_id = 1;
  apaterno_ca = data.apaterno_ca;
  apcasada_ca = data.apcasada_ca;
  apmaterno_ca = data.apmaterno_ca;
  celular_ca = data.celular_ca;
  email_ca = data.email_ca;
  fijo_ca = data.fijo_ca;
  nombre_ca = data.nombre_ca;
  ci = sessionService.get('CICIUDADANO');
  data = '{"nombre_ca":"' + nombre_ca + '","apaterno_ca":"' + apaterno_ca + '","apmaterno_ca":"' + apmaterno_ca + '","apcasada_ca":"' + apcasada_ca + '","email_ca":"' +email_ca +'","fijo_ca":"' +fijo_ca +'","celular_ca":"' +celular_ca +'"}';
  data1 = JSON.stringify(data);
  datosContacto.parametros = '{"xcontactos_usr_id":"' + usr_id + '","xcontactos_data":' + data1 + ',"xcontactos_carnet":"' +ci+ '"}';
  datosContacto.llamarregla(function(results){
    var resp = JSON.parse(results);
      $scope.mascotas_contaco = resp;
      $scope.$apply();
      console.log('results',results);     
      alertify.success('Contacto Alternativo Guardado...');
     
  }); 
   
}

$scope.cargarContactos = function(ci){
  setTimeout(function(){
    $.blockUI();
  }, 600);
   var cargarContacto   = new reglasnegocioM();
   cargarContacto.identificador = 'SISTEMA_VALLE-CM-2049';
   cargarContacto.parametros = '{"xci_contacto":' + ci + '}';
   cargarContacto.llamarregla(function(results){  
   $scope.contactos = JSON.parse(results);
       $scope.verificarContacto(ci);
  });
  $.unblockUI();
}

$scope.verificarContacto = function(ci){
  setTimeout(function(){
    $.blockUI();
  }, 600);
   var verificarContacto   = new reglasnegocioM();
   verificarContacto.identificador = 'SISTEMA_VALLE-CM-2048';
   verificarContacto.parametros = '{"ycarnet":' + ci + '}';
   verificarContacto.llamarregla(function(results){  
   $scope.verificarcontactos = JSON.parse(results);
   $scope.verC = $scope.verificarcontactos[0].sp_buscar_contacto_por_carnet;
   if($scope.verC == 0){
      $("#nombre_ca").val("");
      $("#apaterno_ca").val("");
      $("#apmaterno_ca").val("");
      $("#apcasada_ca").val("");
      $("#email_ca").val("");
      $("#fijo_ca").val("");
      $("#celular_ca").val("");
      $scope.vaciarContacto();
      swal("Estimado Ciudadano", "No tiene ningun contacto registrado con el C.I. introducido. Si desea puede realizar el registro", "error")
    }if($scope.verC == 1){
      alertify.success('Recuperando datos del Contacto Alternativo....');
      $scope.contactos_valores = $scope.contactos;
      $scope.cp = JSON.parse($scope.contactos_valores[0].xcontactos_data);
      $("#nombre_ca").val($scope.cp.nombre_ca);
      $("#apaterno_ca").val($scope.cp.apaterno_ca);
      $("#apmaterno_ca").val($scope.cp.apmaterno_ca);
      $("#apcasada_ca").val($scope.cp.apcasada_ca);
      $("#email_ca").val($scope.cp.email_ca);
      $("#fijo_ca").val($scope.cp.fijo_ca);
      $("#celular_ca").val($scope.cp.celular_ca); 
      alertify.success('Contacto Alternativo recuperado...');
    }        
  });
  $.unblockUI();
}

//CONTACTOS
  ////ALMACENA VACUNAS EN LA GRILLA ///////
  $scope.guarda_grilla = function(datos){
    if($scope.botonMod == true){
      //alert('modificacion');
      $scope.vacunas = [];
      $scope.registrarVacuna_grilla_Mod(datos);
    }else{
      //alert('nuevo');
      $scope.registrarVacuna_grilla_Nuevo(datos);
    }
  }
  
  $scope.vacunas = [];
  $scope.registrarVacuna_grilla_Mod = function(data2){
    $scope.vacunas = $scope.infogrilla;
    if($scope.vacunas.length == undefined){
      id = $scope.vacunas.length + 1;
      $scope.vacunas.push({
        tipo_vacuna: data2.tipo_vacuna,
        nro_dosis: data2.nro_dosis,
        fecha_vacuna: data2.fecha_vacuna,
        nomb_vete: data2.nomb_vete,
        inst_vete: data2.inst_vete
      });
      $scope.vacu = [];
      $scope.vacu.tipo_vacuna;
      $scope.vacu.nro_dosis;
      $scope.vacu.fecha_vacuna;
      $scope.vacu.nomb_vete;
      $scope.vacu.inst_vete;
      $scope.data1 = $scope.vacunas;
      $scope.vacunas_Grilla($scope.vacunas);
      $scope.vaciarVacunas(); 

    }else{
      $scope.vacunas = $scope.infogrilla;
      var vacu = '{"tipo_vacuna":"'+data2.tipo_vacuna+'","nro_dosis":"'+data2.nro_dosis+'","fecha_vacuna":"'+data2.fecha_vacuna+'","nomb_vete":"'+data2.nomb_vete+'","inst_vete":"'+data2.inst_vete+'"}';
       $scope.vacunas.push(JSON.parse(vacu));
       $scope.data1 = $scope.vacunas;
       $scope.vaciarVacunas(); 
    }
  }

  $scope.registrarVacuna_grilla_Nuevo = function(data2){
      id = $scope.vacunas.length + 1;
      $scope.vacunas.push({
          tipo_vacuna: data2.tipo_vacuna,
          nro_dosis: data2.nro_dosis,
          fecha_vacuna: data2.fecha_vacuna,
          nomb_vete: data2.nomb_vete,
          inst_vete: data2.inst_vete
        });
        $scope.vacu = [];
        $scope.vacu.tipo_vacuna;
        $scope.vacu.nro_dosis;
        $scope.vacu.fecha_vacuna;
        $scope.vacu.nomb_vete;
        $scope.vacu.inst_vete;
        $scope.data1 = $scope.vacunas;
        $scope.vacunas_Grilla($scope.vacunas);
        $scope.vaciarVacunas(); 
  }
  $scope.vacunas_Grilla = function(data){
    $scope.vacuna_grilla = [];
    var encabezado = [];
    var indice = 1;
    for(j=0; j<data.length;j++) {
        $scope.vacuna_grilla.push({
            nroElem: j+1,
            tipo_vacuna: data[j].tipo_vacuna,
            nro_dosis: data[j].nro_dosis,
            fecha_vacuna: data[j].fecha_vacuna,
            nomb_vete: data[j].nomb_vete,
            inst_vete: data[j].inst_vete
        });
    }
    angular.forEach($scope.vacuna_grilla, function(value, key) {
            encabezado[indice] = value;
            indice = indice + 1;
        });
    $scope.datos.vacuna_grilla=encabezado;
  }

  
////ALMACENA VACUNAS EN LA GRILLA ///////


$scope.datosMascota = function(id){
   var datosMascota   = new reglasnegocioM();
   datosMascota.identificador = 'SERVICIO_VALLE-CM-391';
   datosMascota.parametros = '{"especieid":1}';
   datosMascota.llamarregla(function(results){
       results1 = JSON.parse(results);
       $scope.tablaTramites.reload();
       if(results.length > 0){
        $scope.datosMascota = results1;
    } else {
       
    }             
});
};
//BAJA DE MASCOTA
$scope.validarbaja = function(data){
  swal({
      title: 'Mensaje de Verificación',
      text: 'Estimado Ciudadano, ¿Se encuentra seguro/a de realizar la baja de su Mascota?. Y comunicarle que La ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      closeOnConfirm: false
  }, function() {
      swal.close();
      setTimeout(function(){
          $scope.registrarVacuna(data);
      }, 1000);
      swal('Estimado Ciudadano', "Información de Contacto ALternativo se guardó correctamente", 'success'); 
  });
};

$scope.eliminarMascota = function(dato){
var usr_id = sessionService.get('CICIUDADANO');

var eliMascota   = new reglasnegocioM();
eliMascota.identificador = 'SERVICIO_VALLE-CM-545';
eliMascota.parametros = '{"xmascota_id":'+ dato + ',"xmascota_usr_id":' + usr_id + '}';
eliMascota.llamarregla(function(results){
    results1 = JSON.parse(results);
    if(results.length > 0){
     $scope.eliMascota = results1;
     $scope.tablaTramites.reload();
     $scope.$apply();
      alertify.success('Datos de la Mascota fue dada de baja');
 } else {
    
 }             
});
}
//BAJA DE MASCOTA

  $scope.validarEnvioVacunas = function(data){
    swal({
        title: 'Mensaje de Verificación',
        text: 'Estimado Ciudadano, ¿Se encuentra seguro/a de que los datos registrados son los correctos?... Una vez guardados no podrá realaizar cambios.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'SI',
        cancelButtonText: 'NO',
        closeOnConfirm: false
    }, function() {
        swal.close();
        setTimeout(function(){
            $scope.registrarVacuna(data);
        }, 1000);
        swal('Estimado Ciudadano', "Información de Contacto ALternativo se guardó correctamente", 'success'); 
    });
  };
  
   $scope.vaciarVacunas = function(){
     $scope.datos.tipo_vacuna = '-1';
     $scope.datos.nro_dosis = '';
     $scope.datos.fecha_vacuna = '';
     $scope.datos.nomb_vete = '';
     $scope.datos.inst_vete = '';
   } 
 ////ALMACENA VACUNAS EN LA GRILLA ///////

  $scope.datosMascota = function(id){
     var datosMascota   = new reglasnegocioM();
     datosMascota.identificador = 'SERVICIO_VALLE-CM-391';
     datosMascota.parametros = '{"especieid":1}';
     datosMascota.llamarregla(function(results){
         results1 = JSON.parse(results);
         $scope.tablaTramites.reload();
         if(results.length > 0){
          $scope.datosMascota = results1;
      } else {
         
      }             
  });
};

$scope.eliminarMascota = function(dato){
  var usr_id = sessionService.get('CICIUDADANO');
  var eliMascota   = new reglasnegocioM();
  eliMascota.identificador = 'SERVICIO_VALLE-CM-545';
  eliMascota.parametros = '{"xmascota_id":'+ dato + ',"xmascota_usr_id":' + usr_id + '}';
  eliMascota.llamarregla(function(results){
      results1 = JSON.parse(results);
      if(results.length > 0){
       $scope.eliMascota = results1;
       $scope.tablaTramites.reload();
       $scope.$apply();
        alertify.success('Datos de la Mascota fue dada de baja');
   } else {
      
   }             
});

}

$scope.validaCorreo =function(){
  var $result = $("#result");
  var email_ca = $("#email_ca").val();
  $result.text("");
  if ($scope.validarEmail(email_ca)) {
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

  $scope.validarEnvioContacto = function(data){
    swal({
        title: 'Mensaje de Verificación',
        text: 'Estimado Ciudadano, ¿Se encuentra seguro/a de que los datos registrados son los correctos?... Una vez guardados no podrá realaizar cambios.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'SI',
        cancelButtonText: 'NO',
        closeOnConfirm: false
    }, function() {
        swal.close();
        setTimeout(function(){
            $scope.registrarContacto(data);
        }, 1000);
    });
  };

  //imagen mascota
  $scope.img = [];
  $scope.mostrarimgjuridico  =   function(imagen){  
    $.blockUI();
    var estado = false;
    var url =""; 
    $scope.extension =""; 
    for (var i = 0; i < $scope.img.length; i++) {
        if($scope.img[i].nombre == imagen){
          estado = true; 
          url = $scope.img[i].url;
          $scope.extension = $scope.img[i].campo;
        }
    }
 
    if (estado) {
        var extPod   =   $scope.extension.split(".")[1];
        try{
            $scope.archivoPOD = url;             
            if(extPod == 'pdf' || extPod == 'docx' ||  extPod == 'docxlm' || extPod == 'zip' || extPod == 'jpeg' || extPod == 'jpg' ||  extPod == 'png' ||  extPod == 'gif'){
                window.open($scope.archivoPOD, "_blank");
            }/*else if(){
                $("#fotpod").modal("show");             
            }*/
            $.unblockUI();

        }catch(e){
          console.log("error",e);
          $.unblockUI();
        }
        
        
    }else{
      swal('Error', 'Todavia no selecciono un documento desde  su equipo', 'error');
    }
          
    $.unblockUI();
}

///////////IMAGEN 
$scope.img = [];
$scope.mostrarimg = function(imagen1){
  $.blockUI();
  var estado = false;
  var url = ""; 
  $scope.extension =""; 
  for (var i = 0; i < $scope.img.length; i++) {
      if($scope.img[i].nombre == imagen1){
        estado = true; 
        url = $scope.img[i].url;
        $scope.extension = $scope.img[i].campo;
      }
  }

  if (estado) {
      var extPod   =   $scope.extension.split(".")[1];
      try{
          $scope.archivoPOD = url;             
          if(extPod == 'pdf' || extPod == 'docx' ||  extPod == 'docxlm' || extPod == 'zip' || extPod == 'jpeg' || extPod == 'jpg' ||  extPod == 'png' ||  extPod == 'gif'){
              window.open($scope.archivoPOD, "_blank");
          }/*else if(){
              $("#fotpod").modal("show");             
          }*/
          $.unblockUI();

      }catch(e){
        console.log("error",e);
        $.unblockUI();
      }
      
      
  }else{
    swal('Error', 'Todavia no selecciono un documento desde  su equipo', 'error');
  }
        
  $.unblockUI();
}
/////
$scope.enviarImagen = function(){
  $.blockUI();
  var img64 = $scope.bas64Mascota;
  var imagen = img64.split(",");
  var imagen64 = imagen[1];
  var ci_adjunto = sessionService.get('CICIUDADANO');
  var nombre_mascota = $scope.datos.mascota_nombre+$scope.fechayhora;
var form = new FormData();
form.append("imagen", imagen64);
form.append("ci", ci_adjunto);
form.append("nombre", nombre_mascota);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://40.117.46.159/dreamfactory/crearImagenBase64.php",
  "method": "POST",
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  $scope.url_imagen = 'http://40.117.46.159'+response;
  if($scope.url_imagen){
    $scope.swimagen = true;
  }
  else{
    $scope.swimagen = false;
  }
 
});
  $.unblockUI();
}
  $scope.addImage=function(e,idFoto){
      setTimeout(function(){
        $scope.idFoto=idFoto;
        var file = e.target.files[0],
        imageType = /image.*/;
        if (!file.type.match(imageType))
            return;
        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
         $.unblockUI();
            },1000);
   }; 

   function fileOnload(e) {
    var result=e.target.result;
    $('#ANTT_CON_ARR').attr("src",result);
    $scope.bas64Mascota = result;
    $scope.enviarImagen();
 
   }

  $scope.ejecutarFile = function(idfile){
    setTimeout(function(){
      $.blockUI();
    }, 600);
    var sid =   document.getElementById(idfile);
    if(sid){
        document.getElementById(idfile).click();
    }else{
        alert("Error ");
    }
    $.unblockUI();     
  };

  $scope.cambiarFile = function(obj, valor){
    var str = "Hello World!";
    var cadena = btoa(obj.files[0]);
    //var cadena = Base64.encode(obj.files[0]);
    

 
};
$scope.actualiza = function(nombre){ 
  document.getElementById('m1').value='http://localhost:8080/evidencia/'+ nombre; 
} 

$scope.imageStrings = [];
$scope.processFiles = function(files){
  angular.forEach(files, function(flowFile, i){
     var fileReader = new FileReader();
        fileReader.onload = function (event) {
          var uri = event.target.result;
            $scope.imageStrings[i] = uri;     
        };
        fileReader.readAsDataURL(flowFile.file);
  });
};
///imagen mascota

  try{
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }catch (e) {
    console.log("error", e);
  }
}