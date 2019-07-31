function registroVoluntariosController($scope,$q,$timeout,CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route,sweet,$http,FileUploader,$sce,fileUpload,filterFilter,$routeParams, $location, Data,$q){
  $scope.$on('api:ready', function () {
    /*$scope.llamar_data_ciudadano();
    $scope.tramitesCiudadano();
    $scope.MacroZona();*/
  });

  
   //mag
   $("#mensaje1").hide();
   $("#mensaje2").hide();
  //DATOS PERSONALES DEL CIUDADANNO
   //$scope.datos.datos_responsable.ci = sessionService.get('REPRESENTANTECI');
   $scope.datos = {};
   $scope.datos_responsable = {}; 
   $scope.datos_infraestructura = {};
   $scope.tipo_organizacion = "";
   $scope.area_apoyo = "";
   
   //$scope.datos.datos_responsable.nombre = sessionService.get('REPRESENTANTE');
   //$scope.datos.datos_responsable.paterno = sessionService.get('US_PATERNO');
   //$scope.datos.datos_responsable.materno = sessionService.get('US_MATERNO');
   //$scope.datos.datos_responsable.expedido = sessionService.get('CIEXPEDIDO');
    
  ///maga
  $scope.validarEmail =function(email_ca) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email_ca);
  };

   $scope.vaciarVacunas = function(){
     $scope.datos.tipo_vacuna = '-1';
     $scope.datos.nro_dosis = '';
     $scope.datos.fecha_vacuna = '';
     $scope.datos.nomb_vete = '';
     $scope.datos.inst_vete = '';
   } 

/////////////////////////////////////js para el 2
$scope.form_but_g = true;
$scope.form_but_e = true;
$scope.mod = {};
$scope.grid_n = [];
$scope.gri_but_modal_g = true;
$scope.gri_but_modal_e = false;
$scope.modelFecha0 = { startDate: new Date() };
$scope.modelFecha5 = { endDate: new Date() };
$scope.modelFecha = {
                 startDate: new Date('09/21/2015'),
                 //endDate: new Date($scope.datos.TER_FEC_RET)
            };

var ciresp = sessionService.get('REPRESENTANTECI');

$scope.inicioServicios = function () {
  $scope.datos.nombre_organizacion = sessionService.get('US_NOMBRE');
  $scope.datos_responsable.ci = ciresp;
  $scope.buscarRep();
  var ciresp_NIT = sessionService.get('NITCIUDADANO');
  var recuperar   = new reglasnegocioM();
  recuperar.identificador = 'SISTEMA_VALLE-CM-2077';
  recuperar.parametros = '{"voluntario_nit":"'+ ciresp_NIT +'"}';
  cargando();
          var hoy = new Date();
          if ((hoy.getMonth()+1) < 10) { mes ='0'+(hoy.getMonth()+1);}else{ mes = (hoy.getMonth()+1);}
          if ((hoy.getDate()) < 10) { dia ='0'+(hoy.getDate());}else{ dia = (hoy.getDate());}
          var fecha =  hoy.getFullYear() + '-' + mes  + '-' + dia ;
          var hora =  hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
          $scope.fechayhora = fecha + '-'+hora;
          $scope.datos.g_fecha = fecha;
   recuperar.llamarregla(function(results){

       results1 = JSON.parse(results);
         //console.log("resul1",results1); 
       if(results1 != "[{}]"){        
            console.log("resul1",results1[0]);
          alertify.success('Datos Encontrados');
          if (results1[0].xvoluntario_oa_tipo_organizacion != undefined || results1[0].xvoluntario_oa_tipo_organizacion != "") {
              $("#tipo_organizacion" ).val(results1[0].xvoluntario_oa_tipo_organizacion);
              $scope.tipo_organizacion = results1[0].xvoluntario_oa_tipo_organizacion;
          }  
          if (results1[0].xvoluntario_oa_area_apoyo != undefined || results1[0].xvoluntario_oa_area_apoyo != "") {
              $("#area_apoyo" ).val(results1[0].xvoluntario_oa_area_apoyo);
              $scope.area_apoyo = results1[0].xvoluntario_oa_area_apoyo;
          } 
          var json_date = JSON.parse(results1[0].xvoluntario_oa_data);
          
          if (json_date.g_fecha != undefined ) {
              $scope.datos.g_fecha = json_date.g_fecha;
          }else{
              $scope.datos.g_fecha = fecha;
          } 
          if (json_date.nro_licencia != undefined || json_date.nro_licencia != "") {
              $("#nro_licencia" ).val(json_date.nro_licencia);
              $scope.datos.nro_licencia = json_date.nro_licencia;              
          } 
          if (json_date.fecha_expiracion != undefined ) {
              //$("#fecha_expiracion" ).val(json_date.fecha_expiracion);
              $scope.datos.fecha_expiracion = json_date.fecha_expiracion;
          }
          if (json_date.nro_personeria_juridica != undefined) {
              $("#nro_personeria_juridica" ).val(json_date.nro_personeria_juridica);
              $scope.datos.nro_personeria_juridica = json_date.nro_personeria_juridica;
          }
          if (json_date.direccion != undefined) {
              $("#direccion" ).val(json_date.direccion);
              $scope.datos.direccion = json_date.direccion;
          }
          //console.log("xxxxx",json_date.datos_responsable.titulado);
          if (json_date.datos_responsable.titulado === undefined) {
              $scope.datos_responsable.titulado = "";
          }else{
            $("#datos_responsable_titulado" ).val(json_date.datos_responsable.titulado);
              $scope.datos_responsable.titulado = json_date.datos_responsable.titulado;
            }
          if (json_date.datos_responsable.matricula != undefined) {
              $("#datos_responsable_matricula" ).val(json_date.datos_responsable.matricula);
              $scope.datos_responsable.matricula = json_date.datos_responsable.matricula;
          } 
          if (json_date.datos_responsable.establecimiento_asistencia != undefined) {
              $("#datos_responsable_establecimiento_asistencia" ).val(json_date.datos_responsable.establecimiento_asistencia);
              $scope.datos_responsable.establecimiento_asistencia = json_date.datos_responsable.establecimiento_asistencia;
          } 
          if (json_date.voluntarios != undefined) {
              //$scope.cargar_gri(json_date.voluntarios);
              $scope.grid_n = json_date.voluntarios;             
          }
          if (json_date.datos_infraestructura.caniles_moviles != undefined) {
              $("#datos_infraestructura_caniles_moviles" ).val(json_date.datos_infraestructura.caniles_moviles);
              $scope.datos_infraestructura.caniles_moviles = json_date.datos_infraestructura.caniles_moviles;             
          }
          if (json_date.datos_infraestructura.gatiles_moviles != undefined) {
              $("#datos_infraestructura_gatiles_moviles" ).val(json_date.datos_infraestructura.gatiles_moviles);
              $scope.datos_infraestructura.gatiles_moviles = json_date.datos_infraestructura.gatiles_moviles;             
          }
          if (json_date.datos_infraestructura.capacidad_moviles != undefined) {
              $("#datos_infraestructura_capacidad_moviles" ).val(json_date.datos_infraestructura.capacidad_moviles);
              $scope.datos_infraestructura.capacidad_moviles = json_date.datos_infraestructura.capacidad_moviles;             
          }
          if (json_date.datos_infraestructura.capacidad_caniles != undefined) {
              $("#datos_infraestructura_capacidad_caniles" ).val(json_date.datos_infraestructura.capacidad_caniles);
              $scope.datos_infraestructura.capacidad_caniles = json_date.datos_infraestructura.capacidad_caniles;             
          }
          if (json_date.datos_infraestructura.capacidad_gatiles != undefined) {
              $("#datos_infraestructura_capacidad_gatiles" ).val(json_date.datos_infraestructura.capacidad_gatiles);
              $scope.datos_infraestructura.capacidad_gatiles = json_date.datos_infraestructura.capacidad_gatiles;             
          }
          if (json_date.datos_infraestructura.capacidad_total != undefined) {
              $("#datos_infraestructura_capacidad_total" ).val(json_date.datos_infraestructura.capacidad_total);
              $scope.datos_infraestructura.capacidad_total = json_date.datos_infraestructura.capacidad_total;             
          }
          if (json_date.datos_infraestructura.nro_bebederos != undefined) {
              $("#datos_infraestructura_nro_bebederos" ).val(json_date.datos_infraestructura.nro_bebederos);
              $scope.datos_infraestructura.nro_bebederos = json_date.datos_infraestructura.nro_bebederos;             
          }
          if (json_date.datos_infraestructura.nro_comederos != undefined) {
              $("#datos_infraestructura_nro_comederos" ).val(json_date.datos_infraestructura.nro_comederos);
              $scope.datos_infraestructura.nro_comederos = json_date.datos_infraestructura.nro_comederos;             
          }
          if (json_date.adjunto_croquis != undefined) {
              $scope.datos.adjunto_croquis = json_date.adjunto_croquis;    
              document.getElementById("div_adjunto_croquis").style.display = "show";         
          }else{
              document.getElementById("div_adjunto_croquis").style.display = "none"; 
          }
          $scope.form_but_g = true;
          $scope.form_but_e = false;

          $.LoadingOverlay("hide");  

       } else {

          console.log("resul2",$scope.datos.g_fecha);
          alertify.success('Datos no Encontrados');
          $scope.gri_but_modal_g = true;

         $.LoadingOverlay("hide"); 
       }
        //$("#myModal").modal("show");
        //$("#myModal").modal("hide");  
                
   });
    
};
$scope.cargar_gri = function (data) {
  console.log("resulnxxxx",data,$scope.datos.direccion);
  setTimeout(function(){
      $scope.grid_n = data;
    }, 500);
  
  /*$("#myModal").modal("show");
  $("#myModal").modal("hide");*/
};
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

$scope.sumarcaniles = function(a,b){
  console.log('$$$$$$$$$entrandoooooo a modal',a,b);
  var tot = 0;  
    if (a == null || a == undefined || a == "") {
      a=0;
     // total = a+b;
    }else if (b == null || b == undefined || b == ""){
      b=0;
     // total = a+b;
    }; 
    tot = a+b;
    console.log('el total de la suma de caniles',tot);
     $scope.datos_infraestructura.capacidad_moviles = tot;
}; 

$scope.sumcantcaniles = function(a,b){
  console.log('$$$$$$$$$entrandoooooo a modal',a,b);
  var total = 0;  
    if (a == null || a == undefined || a == "") {
      a=0;
      //total = a+b;
    }else if (b == null || b == undefined || b == ""){
      b=0;
      //total = a+b;
    }; 
    total = a+b;
    console.log('el total de la suma de caniles',total);
     $scope.datos_infraestructura.capacidad_total = total;
}; 

/////////////////////////////////
$scope.buscarRep = function(){
  try{
      var buscarRepresentante = new rcNatural();
       buscarRepresentante.tipo_persona = "NATURAL";
       buscarRepresentante.ci = ciresp;
       buscarRepresentante.buscarPersona(function(res){ 
       var x = JSON.parse(res);
            console.log("-----xxx",x);
            console.log('$scope.datos.opr_ci',x[0].dtspsl_ci);
            //$scope.datos = [];
            //$scope.datos.opr_ci = x[0].dtspsl_ci;
            $scope.datos_responsable.expedido = x[0].dtspsl_expedido;
            $scope.datos_responsable.paterno = x[0].dtspsl_paterno;
            $scope.datos_responsable.materno = x[0].dtspsl_materno;
            $scope.datos_responsable.nombre = x[0].dtspsl_nombres;

       });
  }catch(e){
  };

};
/////////////////////////////////

$scope.startDateOpen3 = function($event) {
       $event.preventDefault();
       $event.stopPropagation();
       $scope.startDateOpened3 = true;
};
$scope.startDateOpen5 = function($event) {
       $event.preventDefault();
       $event.stopPropagation();
       $scope.startDateOpened5 = true;
};
$scope.startDateOpen4 = function($event) {
       $event.preventDefault();
       $event.stopPropagation();
       $scope.startDateOpened4 = true;
};
$scope.limpiar_everiting = function(){

  
};
$scope.limpiar_gridni = function(){
  $scope.mod = {};
  $scope.gri_but_modal_g = true;
  $scope.gri_but_modal_e = false;
  $("#myModal").modal("show");

};



$scope.guardarmod = function (campos) {
       
  console.log("putos22",campos,$scope.mod.ci);
  var control_gri = "";
  if (campos.vacuna_ant == "" || campos.vacuna_ant == undefined) {alertify.warning('Vacuna Antirrabica es campo obligatorio');control_gri = control_gri + "1";}
  if (campos.fecha_vacuna == "" || campos.fecha_vacuna == undefined) {alertify.warning('Fecha de Vacuna es campo obligatorio');control_gri = control_gri +"2";}
  if (campos.ci == "" || campos.ci == undefined) {alertify.warning('Nro. de Documento es campo obligatorio');control_gri = control_gri + "3";}
  if (campos.expedido == "" || campos.expedido == undefined) {alertify.warning('Expedido es campo obligatorio');control_gri = control_gri + "4";}
  if (campos.nombre == "" || campos.nombre == undefined) {alertify.warning('Nombres Antirrabica es campo obligatorio');control_gri = control_gri + "5";}
  if (campos.fecha_nacimiento == "" || campos.fecha_nacimiento == undefined) {alertify.warning('Fecha Nacimiento es campo obligatorio');control_gri = control_gri + "6";}
  if (campos.genero == "" || campos.genero == undefined) {alertify.warning('Genero es campo obligatorio');control_gri = control_gri + "7";}
  if (campos.celular == "" || campos.celular == undefined) {alertify.warning('Nr Celular es campo obligatorio');control_gri = control_gri + "7";}
  if (control_gri == "") {
      $scope.bandera_ninos = 0;
      if ($scope.grid_n.length >= 1) {
        for (var i = 0; i < $scope.grid_n.length; i++) {
          if ($scope.grid_n[i].ci == campos.ci) {
            $scope.bandera_ninos = 1;
          }
        }
      }

      if ($scope.bandera_ninos == 0) {
        $scope.grid_n.push({
          vacuna_ant: campos.vacuna_ant,
          fecha_vacuna: campos.fecha_vacuna,
          ci: campos.ci,
          expedido: campos.expedido,
          paterno: campos.paterno,
          materno: campos.materno,
          nombre: campos.nombre,
          apellido_casado: campos.apellido_casado,
          fecha_nacimiento: campos.fecha_nacimiento,
          edad: campos.edad,
          genero: campos.genero,
          estado_civil: campos.estado_civil,
          funciones: campos.funciones,
          correo: campos.correo,
          celular: campos.celular,
          telefono: campos.telefono
        });
      }
      alertify.success('Registro Insertado');
      $("#myModal").modal("hide");
  }else{alertify.error('ERROR');} //message>BLANCO   success>VERDE notify>CELESTE error>ROJO   warning>AMARILLO
};
$scope.remov_grid_n = function(idx){
    $scope.grid_n.splice(idx, 1);
    console.log("eliminar",$scope.grid_n);          
    alertify.success('Registro Eliminado'); 
};
$scope.edit_grid_n = function(idx,campos){
    //$scope.gri_but_modal_g = false;
    //$scope.gri_but_modal_e = true;//
    $("#myModal").modal("show");
    //$("#myModal").modal("hide");
    console.log("editar grit_n",idx,campos);
    $scope.gri_but_modal_g = false;
    $scope.gri_but_modal_e = true;

    $scope.mod.vacuna_ant = campos.vacuna_ant;
    $scope.mod.fecha_vacuna = campos.fecha_vacuna;
    $scope.mod.funciones = campos.funciones;

    $scope.idx = idx;
    $scope.mod.ci = campos.ci;
    $scope.mod.expedido = campos.expedido;
    $scope.mod.paterno = campos.paterno;
    $scope.mod.materno = campos.materno;
    $scope.mod.nombre = campos.nombre;
    $scope.mod.apellido_casado = campos.apellido_casado;
    $scope.mod.fecha_nacimiento = campos.fecha_nacimiento;
    $scope.mod.edad = campos.edad;
    $scope.mod.genero = campos.genero;
    $scope.mod.estado_civil = campos.estado_civil;
    $scope.mod.correo = campos.correo;
    $scope.mod.celular = campos.celular;
    $scope.mod.telefono = campos.telefono;

};

$scope.calcular_edad_grilla = function(edad){

      var fecha= new Date(); //"2016-07-13"
      var curday = fecha.getDate();
      var curmon = (fecha.getMonth()+1);
      var curyear = fecha.getFullYear();
      var fecnac = new Date(edad);             
      var calday = (fecnac.getDate());
      var calmon = (fecnac.getMonth())+1;
      var calyear = fecnac.getFullYear();
      var curd = new Date(curyear,curmon-1,curday);
      var cald = new Date(calyear,calmon-1,calday);
      var y1 = curd.getFullYear(), m1 = curd.getMonth(), d1 = curd.getDate(), y2 = cald.getFullYear(), m2 = cald.getMonth(), d2 = cald.getDate();

      if (d1 < d2) {
        m1--;
        with (new Date(y2, m2, 1, 12)) {
          setDate(0);
          d1 +=  getDate();
        } 
      }
      if (m1 < m2) {
        y1--;
        m1 += 12;
      }

      if ((fecnac.getMonth()+1) < 10) { mes ='0'+(fecnac.getMonth()+1);}else{ mes = (fecnac.getMonth()+1);}
      if ((fecnac.getDate()) < 10) { dia ='0'+(fecnac.getDate());}else{ dia = (fecnac.getDate());}
      $scope.mod.fecha_nacimiento =  fecnac.getFullYear() + '-' + mes  + '-' + dia;
      //console.log(""+(y1 - y2)+" años "+ (m1 - m2) +" meses y "+(d1 - d2)+" dias"); 
      $scope.mod.edad = (y1 - y2)+" años "+ (m1 - m2) +" meses y "+(d1 - d2)+" dias";
};

$scope.modificar_grid_n = function(campos){  // 




    $scope.grid_n[$scope.idx].vacuna_ant = campos.vacuna_ant;
    $scope.grid_n[$scope.idx].fecha_vacuna = campos.fecha_vacuna;
    $scope.grid_n[$scope.idx].funciones = campos.funciones;

    $scope.grid_n[$scope.idx].ci = campos.ci;
    $scope.grid_n[$scope.idx].expedido = campos.expedido;
    $scope.grid_n[$scope.idx].paterno = campos.paterno;
    $scope.grid_n[$scope.idx].materno = campos.materno;
    $scope.grid_n[$scope.idx].nombre = campos.nombre;
    $scope.grid_n[$scope.idx].apellido_casado = campos.apellido_casado;
    $scope.grid_n[$scope.idx].fecha_nacimiento = campos.fecha_nacimiento;
    $scope.grid_n[$scope.idx].edad = campos.edad;
    $scope.grid_n[$scope.idx].genero = campos.genero;
    $scope.grid_n[$scope.idx].estado_civil = campos.estado_civil;
    $scope.grid_n[$scope.idx].correo = campos.correo;
    $scope.grid_n[$scope.idx].celular = campos.celular;

    $scope.grid_n[$scope.idx].telefono = campos.telefono;

    alertify.success('Registro Modificado');
    $("#myModal").modal("hide");
};
$scope.validarFormularioGuardar = function(){
//JSON.parse($scope.datos_responsable);
  var control_gri = "";
  if ($scope.tipo_organizacion == "" || $scope.tipo_organizacion == undefined) {alertify.warning('Tipo de Organización Protectora: es campo obligatorio');control_gri = control_gri + "1";}
  if ($scope.area_apoyo == "" || $scope.area_apoyo == undefined) {alertify.warning('Area de Apoyo es campo obligatorio');control_gri = control_gri +"2";}
  if (control_gri == "") {
     $scope.datos.voluntarios = $scope.grid_n;  
     $scope.datos.datos_responsable = $scope.datos_responsable;
     $scope.datos.datos_infraestructura = $scope.datos_infraestructura;
     $scope.datos.adjunto_croquis = $scope.url_imagen;
     console.log("<<$$$scope.datoss",$scope.datos,sessionService.get('NITCIUDADANO'));
     var data_total = JSON.stringify($scope.datos);
     console.log("<<<data",JSON.stringify($scope.datos));
     var organizacionMascota   = new reglasnegocioM();
     var nit_oa = sessionService.get('NITCIUDADANO');
     //nit_oa_1 = parseInt(nit_oa);
     console.log("<<$$$scope.datoss",parseInt(nit_oa),nit_oa);
     organizacionMascota.identificador = 'SISTEMA_VALLE-CM_2065';
     organizacionMascota.parametros = '{"xvoluntario_oa_mascota_id":'+ 1 +',"xvoluntario_oa_nit":"'+(nit_oa)+'","xvoluntario_oa_tipo_organizacion":"'+$scope.tipo_organizacion+'","xvoluntario_oa_area_apoyo":"'+$scope.area_apoyo+'","xvoluntario_oa_data":'+JSON.stringify(data_total)+',"xvoluntario_oa_usr_id":' + 1 +'}';
     
     organizacionMascota.llamarregla(function(results){
         results1 = JSON.parse(results);
         console.log("result",results1);
         if(results.length > 0){
            $scope.organizacionMascota = results1;
         alertify.success('Datos');
         } else {       
         }             
     });
  }
};  //
$scope.validarFormularioEditar = function(){
//JSON.parse($scope.datos_responsable);
    var control_gri = "";
    if ($scope.tipo_organizacion == "" || $scope.tipo_organizacion == undefined) {alertify.warning('Tipo de Organización Protectora: es campo obligatorio');control_gri = control_gri + "1";}
    if ($scope.area_apoyo == "" || $scope.area_apoyo == undefined) {alertify.warning('Area de Apoyo es campo obligatorio');control_gri = control_gri +"2";}
    if (control_gri == "") {
       $scope.datos.voluntarios = $scope.grid_n;  
       $scope.datos.datos_responsable = $scope.datos_responsable;
       $scope.datos.datos_infraestructura = $scope.datos_infraestructura;
       $scope.datos.adjunto_croquis = $scope.url_imagen;
       console.log("<<$$$scope.datoss",$scope.datos,sessionService.get('NITCIUDADANO'));
       var data_total = JSON.stringify($scope.datos);
       console.log("<<<data",JSON.stringify($scope.datos));

       var orgaMascota_editar = new reglasnegocioM();
       var nit_oa = sessionService.get('NITCIUDADANO');
       //nit_oa_1 = parseInt(nit_oa);
       //console.log("<<$$$scope.datoss",parseInt(nit_oa),nit_oa);
       orgaMascota_editar.identificador = 'SISTEMA_VALLE-CM-2068';
       orgaMascota_editar.parametros = '{"xvoluntario_oa_mascota_id":'+ 1 +',"xvoluntario_oa_nit":"'+(nit_oa)+'","xvoluntario_oa_tipo_organizacion":"'+$scope.tipo_organizacion+'","xvoluntario_oa_area_apoyo":"'+$scope.area_apoyo+'","xvoluntario_oa_data":'+JSON.stringify(data_total)+',"xvoluntario_oa_usr_id":' + 1 +'}';                                                                                                                                                                

       orgaMascota_editar.llamarregla(function(results){
           results1 = JSON.parse(results);
           console.log("result",results1);
           if(results.length > 0){
              $scope.orgaMascota_editar = results1;
           alertify.success('Datos');
           } else {       
           }             
       });
    }    
};
//////////////FUNCIONES PARA IMAGEN///////////////
//////////////FUNCIONES PARA IMAGEN///////////////
$scope.enviarImagenPromesas = function(){
  var validarpromesas =  [$scope.enviarImagen()];
  $q.all(validarpromesas).then(function (resp) {
  });
}

 $scope.enviarImagen = function(){
  console.log('soy enviarImagen l:1261 ');
  $.blockUI();
  var img64 = $scope.bas64Mascota;
  var imagen = img64.split(",");
  var imagen64 = imagen[1];
  var ci_adjunto = sessionService.get('NITCIUDADANO');
  var nom_emp = sessionService.get('US_NOMBRE');
  //var nombre_mascota = $scope.datos.mascota_nombre+$scope.fechayhora;
  var nombre_mascota = nom_emp+$scope.fechayhora;
var form = new FormData();
form.append("imagen", imagen64);
form.append("ci", ci_adjunto);
form.append("nombre", nombre_mascota);

var settings = {
  "async": true,
  "crossDomain": true,
 // "url": "http://137.117.66.239/mascotas/crearImagenBase64.php",
  "url": CONFIG.URL_FILES+'/dreamfactory/crearImagenBase64.php',
  "method": "POST",
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  $scope.url_imagen = CONFIG.URL_FILES+response;
  if($scope.url_imagen){
    $scope.swimagen = true;
  }
  else{
    $scope.swimagen = false;
  }
 console.log('======$scope.url_imagen',$scope.url_imagen);
});
  $.unblockUI();
  //return deferred.promise;
} 
  $scope.addImage=function(e,idFoto){
    setTimeout(function(){
      $.blockUI();
    }, 500);
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
    $('#adjunto_croquis_img').attr("src",result);
    $scope.bas64Mascota = result;
    $scope.enviarImagenPromesas();
 
   };

  $scope.ejecutarFile = function(idfile){
    console.log('ESTE ES ejecutarFile');
    setTimeout(function(){
      $.blockUI();
    }, 2000);
    var sid =   document.getElementById(idfile);
    if(sid){
        document.getElementById(idfile).click();
    }else{
        alert("Error ");
    }
    $.unblockUI();     
  };
/////////////////////////////////////////////////



  try{
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }catch (e) {
    console.log("error", e);
  }
}