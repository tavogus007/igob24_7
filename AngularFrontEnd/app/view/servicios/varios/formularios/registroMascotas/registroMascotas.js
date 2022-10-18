function registroMascotasController($scope, $q, $timeout, CONFIG, $window, $rootScope, sessionService, ngTableParams, $filter, $route, sweet, $http, FileUploader, $sce, fileUpload, filterFilter, $routeParams, $location, Data, $q, obtFechaActual, fileUpload1, fileUploadcorr) {

  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
  $scope.gestion = hoy.getFullYear();
  var vDia;
  var vMes;
  if ((hoy.getMonth() + 1) < 10) { vMes = "0" + (hoy.getMonth() + 1); }
  else { vMes = (hoy.getMonth() + 1); }
  if (hoy.getDate() < 10) { vDia = "0" + hoy.getDate(); }
  else { vDia = hoy.getDate(); }

  $scope.fechaHoy = hoy.getFullYear() + '-' + vMes + '-' + vDia;
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  $scope.fechayhora = fecha + ' ' + hora;
  $scope.swimagen = '';
  var id_mas_luz = 0;
  var tit_nombre = '';
  var tit_correo = '';
  var tit_numero = '';


  function cargando() {
    var texto = $("<div>", {
      text: "CARGANDO....",
      id: "myEstilo",
      css: {
        "font-size": "30px",
        "position": "relative",
        "width": "500px",
        "height": "300px",
        "left": "180px",
        "top": "50px"
      },
      fontawesome: "fa fa-spinner fa-pulse"
    });
    $.LoadingOverlay("show", {
      custom: texto,
      color: "rgba(255, 255, 255, 0.8)",
    });
  }

  $scope.recuperandoDatosInicialesCiudadano = function () {
    var nDatosF = "";
    $rootScope.datosIniciales = "";
    var idCiudadano = sessionService.get('IDUSUARIO');
    $scope.habGuardar1 = true;
    $scope.datosIniciales = "";
    var datosForm = {};
    var sTipoPersona = "";
    var recuperarDatos = new rcNatural();
    recuperarDatos.oid = idCiudadano;
    recuperarDatos.datosCiudadanoNatural(function (resultado) {
      resultadoApi = JSON.parse(resultado);
      datos = resultadoApi[0];
      $scope.datosRecuperados = datos;
      sTipoPersona = resultadoApi[0].dtspsl_tipo_persona;
      $scope.sTipoPersona = resultadoApi[0].dtspsl_tipo_persona;
      tit_correo = resultadoApi[0].dtspsl_correo;
      tit_nombre = resultadoApi[0].dtspsl_nombres + ' ' + resultadoApi[0].dtspsl_paterno + ' ' + resultadoApi[0].dtspsl_materno;
      tit_numero = resultadoApi[0].dtspsl_movil;
      //fechactual = fecha.getFullYear() + "/" + fecha.getMonth() + "/" + fecha.getDate();
      if (sTipoPersona == 'NATURAL') {
        $scope.validacionDatosNatural(datos);
        try {
          nDatosF = Object.keys($scope.datosfalt).length;
          nDatosF = parseInt(nDatosF);
        } catch (e) { }

        if (nDatosF = "" || nDatosF > 0) {
          setTimeout(function () {
            swal({
              title: 'Editar su Información',
              text: 'Estimado ciudadano debe completar los siguientes datos de su cuenta: ' + $scope.datosfalt + ', para realizar el registro de su mascota',
              type: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'OK',
              closeOnConfirm: true
            }, function () {
              window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";
              //$.unblockUI();
            });
          }, 1800);
        } else {
          // $scope.via = datos.dtspsl_nombre_via;
          $scope.direccion = datos.dtspsl_direccion;
          $scope.nro = datos.dtspsl_numero_casa;
          $scope.celular = datos.dtspsl_movil;
          $scope.zona = datos.dtspsl_zona_desc;
          $scope.cedula = datos.dtspsl_ci;
        }
      }
    });
  }

  $scope.validacionDatosNatural = function (datos) {
    var datosfaltantes = '';
    datosfaltantes = new Array();
    if (datos.dtspsl_nombres == '' || datos.dtspsl_nombres == ' ') {
      datosfaltantes.push(' NOMBRES');
    }
    if (datos.dtspsl_materno == '' || datos.dtspsl_materno == ' ') {
      datosfaltantes.push(' APELLIDO MATERNO');
    }
    if ((datos.dtspsl_correo == '') || (datos.dtspsl_correo == ' ')) {
      datosfaltantes.push(' CORREO');
    }
    /*if (datos.dtspsl_movil == '' || datos.dtspsl_movil == ' ') {
      datosfaltantes.push(' CELULAR');
    }
    if (datos.dtspsl_departamento == '' || datos.dtspsl_departamento == ' ') {
      datosfaltantes.push(' DEPARTAMENTO');
    }
    if (datos.dtspsl_provincia == '' || datos.dtspsl_provincia == ' ') {
      datosfaltantes.push(' PROVINCIA');
    }*/
   
    $scope.id_macrodistrito=datos.dtspsl_macrodistrito;
    $scope.macrodistrito = datos.dtspsl_macrodistrito_desc ; 
    if ((datos.dtspsl_macrodistrito == '' || datos.dtspsl_macrodistrito_desc == '')) {
      datosfaltantes.push(' MACRODISTRITO');
    }
    $scope.datosfalt = datosfaltantes;
  }

  $("#mensaje1").hide();
  $("#mensaje2").hide();

  $scope.tablaTramites = {};
  $scope.tramitesMascota = [];
  $scope.datos = {};
  $scope.tramiteSeleccionado = "";
  $scope.dsaraza = true;

  $scope.cargandoMascotas = function () {
    $scope.cargandoMascotas = [
      { nombre: "BOOBY", url: "http://imagen.jpg", fecha_registro: "19/03/2019" },
      { nombre: "BOOBY", url: "http://imagen.jpg", fecha_registro: "19/03/2019" },
      { nombre: "BOOBY", url: "http://imagen.jpg", fecha_registro: "19/03/2019" }
    ];
    $scope.tramitesMascota = $scope.cargandoMascotas;
  };

  $scope.listarMascotasXci = function (ci) {
    cargando();
    $scope.mostrarImagenR = true;
    $scope.mostrarImagenI = false;
    $scope.tramitesMascota = [];
    ci = sessionService.get('CICIUDADANO');
    var datosMascota = new reglasnegocioM();
    datosMascota.identificador = 'SISTEMA_VALLE-CM-2043';
    datosMascota.parametros = '{"xcarnet":' + ci + '}';
    datosMascota.llamarregla(function (results) {
      try {
        cargando();
        if (results !== '"[{ }]"' && results !== '"[{}]"') {
          setTimeout(function () {
            $scope.tramitesMascota = JSON.parse(results);
            angular.forEach($scope.tramitesMascota, function (value, key) {
              value.xmascota_data = JSON.parse(value.xmascota_data);
              $scope.xmascota_imagen_urlM = value.xmascota_imagen_url;
              $scope.convertirUrl = $scope.xmascota_imagen_urlM.split("files");
              if (($scope.convertirUrl[0] == 'http://40.117.46.159//rest/') || ($scope.convertirUrl[0] == 'https://40.117.46.159//rest/')) {
                value.xmascota_imagen_url = CONFIG.APIURL + '/files' + $scope.convertirUrl[1];
              } else {
                value.xmascota_imagen_url = value.xmascota_imagen_url;
              }
            });
            $scope.$apply();
            $scope.tablaTramites.reload();
            $.LoadingOverlay("hide");
          }, 1000);
        } else {
          $scope.$apply();
          $scope.tablaTramites.reload();
          swal('Estimado Ciudadano', 'No tiene Mascotas inscritas, para registrar su(s) mascota(s), haga click en el boton REGISTRAR.', 'warning');
          $.LoadingOverlay("hide");
        }
        $.LoadingOverlay("hide");
      } catch (e) {
        console.log(e.toString());

        $.LoadingOverlay("hide");
      }
    });
  }


  $scope.tablaTramites = new ngTableParams(
    {
    page: 1,
    count: 4,
    filter: {}
    }, {
      total: $scope.tramitesMascota.length,
      getData: function ($defer, params) {
        var filteredData = params.filter() ?
          $filter('filter')($scope.tramitesMascota, params.filter()) :
          $scope.tramitesMascota;
        var orderedData = params.sorting() ?
          $filter('orderBy')(filteredData, params.orderBy()) :
          $scope.tramitesMascota;
        params.total($scope.tramitesMascota.length);
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    }
  );

  $scope.verificarDatos = function () {
    $("#formModal").modal("show");
  }
  //INSERTAR DATOS MASCOTA
  $scope.adicionarMascota = function (data) {
     if ($scope.swimagen == true) {
        $scope.dataMascota.cod_chip = 'NO';
        $scope.insertarDataMascota(data);
        $scope.dataServicioMascota = JSON.stringify($scope.dataMascota);
        $scope.registroMascotas_servicio(); 
        $.unblockUI();
        $scope.botonCrea = false;
       $scope.botonMod = true;
    } else {
      swal('Estimado Ciudadano', 'Debe adjuntar la imágen de su mascota.');
    }
  }

  $scope.dataMascota = {};
  $scope.insertarDataMascota = function (data) {  
    if ($scope.botonMod == true) {
      $scope.dataMascota.xmascota_id = data.xmascota_id;
      $scope.dataMascota.xmascota_imagen_url = $scope.IMAGEN_MASCOTA;//data.xmascota_imagen_url;
      // $scope.dataMascota.xpertenece = $scope.tipoR;
    }
    if ($scope.botonCrea == true) {
      $scope.dataMascota.titular_id = "0";//data.xmascota_titular_id;//2
      $scope.dataMascota.xmascota_imagen_url = $scope.IMAGEN_MASCOTA;
      // $scope.dataMascota.xpertenece = $scope.tipoR;
    }

    if (data.xmascota_raza_id) {
      $scope.dataMascota.xmascota_raza_id = data.xmascota_raza_id;//raza_id
    } else {
      $scope.dataMascota.xmascota_raza_id = data.mascota_raza;//raza_id
    }
    $scope.dataMascota.xmascota_usr_id = sessionService.get('CICIUDADANO');//data.xmascota_usr_id;//ci_igob
    $scope.dataMascota.xmascota_titular_ci = sessionService.get('CICIUDADANO');//data.xmascota_titular_ci;//ci_igob

    $scope.dataMascota.xmascota_data = "{}";
    //reg_desparasitacion
    $scope.reg_desparasitacion = {};
    $scope.reg_desparasitacion.fecha_aplicacion = data.mascota_feca_desparasitacion;
    $scope.reg_desparasitacion.institucion = data.mascota_institucion_desparasitacion;
    $scope.reg_desparasitacion.nombre_veterinario_realizacion = data.mascota_veterinario_desparasitacion;
    $scope.reg_desparasitacion.nombre_marca = 'Certificación';
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
    $scope.dataMascota_data.titular_correo = tit_correo;
    $scope.dataMascota_data.titular_nombre = tit_nombre;
    $scope.dataMascota_data.titular_numero = tit_numero;
    $scope.dataMascota_data.nombre_mas = data.mascota_nombre;
    $scope.dataMascota_data.edad = data.mascota_edad;
    $scope.dataMascota_data.edad_desc = data.reg_edad_des;
    $scope.dataMascota_data.peso = data.mascota_peso;
    $scope.dataMascota_data.peso_desc = data.reg_peso_des;
    $scope.dataMascota_data.raza = $scope.raza_mascota; //RAZA$scope.raza_mascota 
    $scope.dataMascota_data.sexo = data.reg_sexo;
    $scope.dataMascota_data.color = data.mascota_color;
    $scope.dataMascota_data.especie_id = data.mascota_especie_id;
    $scope.dataMascota_data.sistema = 'IGOB247';        //SISTEMA
    $scope.dataMascota_data.sistema_modificador = '';  //SISTEMA
    $scope.dataMascota_data.mm_macrodistrito = $scope.id_macrodistrito;
    $scope.dataMascota_data.mm_macrodistrito_id = $scope.macrodistrito;
    if ($scope.dataMascota_data.especie_id == 1) {
      $scope.dataMascota_data.especie = 'canino';
    } else {
      $scope.dataMascota_data.especie = 'felino';
    }
    $scope.dataMascota_data.tamanio = data.mascota_tamanio;
    $scope.dataMascota_data.comp_peli = $scope.raza_peligrosa; //RAZA PELIGROSA
    $scope.dataMascota_data.vete_actual = data.mascota_veterinario;
    $scope.dataMascota_data.compromiso = "En mi calidad de titular de la mascota, registrada como potencialmente peligrosa, me hago responsable de ella y me comprometo a cumplir con las normas legales en actual vigencia. En aplicación a la ley 553, Ley Autonómica Municipal 239-316 y su reglamentación.";
    $scope.dataMascota_data.desparasitacion = $scope.datos.mascota_desparasitacion; //$scope.desparasitacion1; //DESPARASITACION
    $scope.dataMascota_data.esterilizacion = $scope.datos.mascota_esterilizacion; //$scope.esterilizacion; //ESTERILIZACION
    $scope.dataMascota_data.modalidad = $scope.datos.mascota_modalidad;    //MODALIDAD
    $scope.dataMascota_data.modalidad_institucion = ''; ///ESTE DATOS ESTA DEFINIDO PARA LA MODALIDAD DE COMUNITARIO DE UNA EMPRESA
    $scope.dataMascota_data.marca = $scope.marca;  //MARCA
    $scope.dataMascota_data.reg_desparasitacion = $scope.ArrayDesparast_;//$scope.reg_desparasitacion;
    $scope.dataMascota_data.reg_marca = $scope.reg_marca;
    $scope.dataMascota_data.reg_vacunas = $scope.data1; ///recupera en la grilla
    if ($scope.vacunas.length > 0) {
      $scope.dataMascota_data.vacunas = 'si';
    } else {
      $scope.dataMascota_data.vacunas = 'no';
    }
    $scope.dataMascota.xmascota_data = JSON.stringify($scope.dataMascota_data);
    $scope.nombre_mas = data.mascota_nombre;
    $scope.especie = $scope.dataMascota_data.especie;
    $scope.edad_desc = data.reg_edad_des;
    $scope.edad = data.mascota_edad;
   
  }


  //RECUPERA DATOS DE LA MASCOTA
  $scope.seleccionarMascota = function (data_tramite) {
    $scope.botonMod = true;
    $scope.botonCrea = false;
    $scope.tramiteSeleccionado = data_tramite.xmascota_id;
    $scope.tram = data_tramite.xmascota_data.nombre_mas;
    $scope.estado = data_tramite.xmascota_estado;
    if ($scope.estado == 'inactivo') {
      $scope.desabilitado = true;
    } else {
      $scope.desabilitado = false;
      $scope.desabilitadoEdad = false;
      $scope.desabilitadoPeso = false;
    }
    $scope.mostrar_form_mascotas = true;
    $scope.mostrarInformacionMascota($scope.tramiteSeleccionado);
    //$scope.cargarDataMascota(data_tramite);

  }

  ///para borrar data nro cert
  $scope.cambioNrocert = function () {
    $scope.datos.mascota_certificado = "";
  }

  $scope.mostrarInformacionMascota = function (data) {
    cargando();
    $scope.mostrarImagenI = false;
    $scope.mostrarImagenR = true;
    $datos_mascota1 = {};
    $scope.estrilizacion = false;
    $scope.desparasitacion = false;
    datosMascota = new reglasnegocioM();
    datosMascota.identificador = 'SISTEMA_VALLE-CM-2031';
    datosMascota.parametros = '{"id_mascota":"' + data + '"}';
    datosMascota.llamarregla(function (results) {
      $scope.$apply();
      $scope.respuesta = JSON.parse(results);
      $datos_mascota = $scope.respuesta[0].xmascota_data;
      $datos_mascota1 = JSON.parse($datos_mascota);
      alertify.success('Datos de la Mascota fue Recuperada');
      if ($scope.botonMod == true) {
        $scope.datosNoEditables = true;
        $scope.datos.mascota_nombre = $datos_mascota1.nombre_mas;
        if ($datos_mascota1.especie_id != undefined) {
          $scope.datos.mascota_especie_id = $datos_mascota1.especie_id;
        } else {
          if ($datos_mascota1.especie == "canino" || $datos_mascota1.especie == "CANINO") {
            $scope.datos.mascota_especie_id = 1;
          }
          if ($datos_mascota1.especie == "felino" || $datos_mascota1.especie == "FELINO") {
            $scope.datos.mascota_especie_id = 2;
          }
        }
        $scope.listarRaza($scope.datos.mascota_especie_id); //CARGA LA RAZA DE LA MASCOTA
        $scope.datos.xmascota_raza_id = $scope.respuesta[0].xmascota_raza_id;
        $scope.xmascota_usr_id = $scope.respuesta[0].xmascota_usr_id;
        $scope.xmascota_titular_id = $scope.respuesta[0].xmascota_titular_id;
        $scope.xmascota_titular_ci = $scope.respuesta[0].xmascota_titular_ci;
        $scope.xcodigo_chip = $scope.respuesta[0].xcodigo_chip;
        $scope.xmascota_id = $scope.respuesta[0].xmascota_id;
        $scope.comp_peli = $datos_mascota1.comp_peli;
        $scope.compromiso = $datos_mascota1.compromiso;
        $scope.xmascota_imagen_urlM = $scope.respuesta[0].xmascota_imagen_url;
        $scope.convertirUrl = $scope.xmascota_imagen_urlM.split("files");
        $scope.xdeshabilitado = false;
        if (($scope.convertirUrl[0] == 'http://40.117.46.159//rest/') || ($scope.convertirUrl[0] == 'https://40.117.46.159//rest/')) {
          $scope.xmascota_imagen_url = CONFIG.APIURL + '/files' + $scope.convertirUrl[1];
        } else {
          $scope.xmascota_imagen_url = $scope.respuesta[0].xmascota_imagen_url;
        }
        if ($scope.respuesta[0].xmascota_imagen_url) {
          $scope.swimagen = true;
        } else {
          $scope.swimagen = false;
        }
        $scope.btover7 = "mostrar";
        $scope.datos.IMAGEN_MASCOTA = $scope.respuesta[0].xmascota_imagen_url;
        $scope.datos.xmascota_especie = $datos_mascota1.especie;
        $scope.datos.xmascota_raza = $datos_mascota1.raza;
        $scope.raza = $datos_mascota1.raza;
        $scope.datos.mascota_edad = $datos_mascota1.edad;
        $scope.datos.reg_edad_des = $datos_mascota1.edad_desc;
        $scope.datos.mascota_peso = $datos_mascota1.peso;
        $scope.datos.reg_peso_des = $datos_mascota1.peso_desc;
        $scope.datos.sistema = $datos_mascota1.sistema;    ///sistema
        var indices10 = [], indices11 = [];
        if ($datos_mascota1.edad != undefined) {
          for (var i2 = 0; i2 < $datos_mascota1.edad.length; i2++) {
            if ($datos_mascota1.edad[i2].toLowerCase() == " ") {
              indices10.push(i2);
            }
          }

        }
        $scope.datos.mascota_edad = $datos_mascota1.edad.substring(0, indices10[0]);

        var indices = [], indices2 = [];

        if ($datos_mascota1.edad_desc != undefined) {


          for (var i2 = 0; i2 < $datos_mascota1.edad_desc.length; i2++) {
            if ($datos_mascota1.edad_desc[i2].toLowerCase() == "o") {
              indices.push(i2);
            }

            if ($datos_mascota1.edad_desc[i2].toLowerCase() == "e") {
              indices2.push(i2);
            }

          }

        } else {
          for (var i2 = 0; i2 < $datos_mascota1.edad.length; i2++) {
            if ($datos_mascota1.edad[i2].toLowerCase() == "o") {
              indices.push(i2);
            }
            if ($datos_mascota1.edad[i2].toLowerCase() == "e") {
              indices2.push(i2);
            }

          }
        }
        if (indices.length > 0) {
          $scope.datos.reg_edad_des = "años";
        }
        if (indices2.length > 0) {
          $scope.datos.reg_edad_des = "meses";
        }

        $scope.datos.reg_sexo = $datos_mascota1.sexo;
        $scope.sexo = $scope.datos.reg_sexo;

        if ($datos_mascota1.peso != undefined) {
          for (var i2 = 0; i2 < $datos_mascota1.peso.length; i2++) {
            if ($datos_mascota1.peso[i2].toLowerCase() == " ") {
              indices11.push(i2);
            }
          }

        }

        $scope.datos.mascota_peso = $datos_mascota1.peso.substring(0, indices11[0]);

        var indices3 = [], indices4 = [];
        $scope.datos.reg_peso_des = $datos_mascota1.peso_desc;

        if ($datos_mascota1.peso_desc != undefined) {

          for (var i3 = 0; i3 < $datos_mascota1.peso_desc.length; i3++) {
            if ($datos_mascota1.peso_desc[i3].toLowerCase() == "o") {
              indices3.push(i3);
            }

            if ($datos_mascota1.peso_desc[i3].toLowerCase() == "a") {
              indices4.push(i3);
            }

          }

        } else {
          for (var i3 = 0; i3 < $datos_mascota1.peso.length; i3++) {
            if ($datos_mascota1.peso[i3].toLowerCase() == "o") {
              indices3.push(i3);
            }

            if ($datos_mascota1.peso[i3].toLowerCase() == "a") {
              indices4.push(i3);
            }

          }
        }
        if (indices3.length > 0) {
          $scope.datos.reg_peso_des = "kilos";
        }
        if (indices4.length > 0) {
          $scope.datos.reg_peso_des = "gramos";
        }
        //////////////////////
        $scope.datos.imagen_png = $scope.respuesta[0].xmascota_imagen_url;
        $scope.datos.mascota_color = $datos_mascota1.color;
        $scope.datos.mascota_tamanio = $datos_mascota1.tamanio;
        if ($datos_mascota1.reg_vacunas) {
          if ($datos_mascota1.reg_vacunas.length > 0) {
            //alert('MODIFICACION CON VACUNAS');
            $scope.infogrilla = $datos_mascota1.reg_vacunas;
            $scope.data1 = $scope.infogrilla;
          } else {
            //alert('MODIFICACION SIN VACUNAS');
            $scope.infogrilla = [];
            $scope.data1 = $scope.infogrilla;
          }
        } else {
          $scope.infogrilla = [];
          $scope.data1 = $scope.infogrilla;
        }
        if ($datos_mascota1.esterilizacion == 'si') {
          $scope.estrilizacion = true;
          $scope.esterilizacionDisabled=true;
          //alert('ESTERILIZACION SI');
          $scope.datos.mascota_esterilizacion = $datos_mascota1.esterilizacion;
          $scope.datos.reg_feca = parseInt($datos_mascota1.reg_marca.fecha_aplicacion);
          $scope.datos.mascota_certificado = $datos_mascota1.reg_marca.codigo_esterilizacion;
          $scope.datos.mascota_veterinario = $datos_mascota1.reg_marca.nombre_veterinario_realizacion;
          $scope.datos.mascota_institucion = $datos_mascota1.reg_marca.institucion;

          if($datos_mascota1.reg_marca.nombre_marca === "esterilizacion"){
            $scope.datos.mascota_marca = "ninguna";
          }else{
            $scope.datos.mascota_marca = $datos_mascota1.reg_marca.nombre_marca;
          }
        } else {
          //alert('ESTERILIZACION NO');
          $scope.estrilizacion = false;
          $scope.esterilizacionDisabled=false;
          $scope.datos.mascota_esterilizacion = $datos_mascota1.esterilizacion;
          $scope.datos.reg_feca = '';
          $scope.datos.mascota_marca = '';
          $scope.datos.mascota_certificado = '';
          $scope.datos.mascota_veterinario = '';
          $scope.datos.mascota_institucion = '';
        }
        if ($datos_mascota1.desparasitacion == 'si') {
          $scope.desparasitacion = true;
          //alert('desparasitacion SI'); 
            $scope.datos.mascota_desparasitacion = $datos_mascota1.desparasitacion;
            $scope.datos.mascota_feca_desparasitacion = '';
            $scope.datos.mascota_veterinario_desparasitacion = '';
            $scope.datos.mascota_institucion_desparasitacion = '';
            if ($datos_mascota1.reg_desparasitacion.length > 0) {
              $scope.ArrayDesparast_ = $datos_mascota1.reg_desparasitacion;
              $scope.desparasitacion_si = true;
            } else {
              $scope.ArrayDesparast_ = [];
              $scope.desparasitacion_si = false;
            }

        } else {
          //alert('DESPARASITACION NO');
          $scope.desparasitacion = false;
          $scope.ArrayDesparast_ = [];
          $scope.desparasitacion_si = false;
          $scope.datos.mascota_desparasitacion = $datos_mascota1.desparasitacion;
          $scope.datos.mascota_feca_desparasitacion = '';
          $scope.datos.mascota_veterinario_desparasitacion = '';
          $scope.datos.mascota_institucion_desparasitacion = '';
        }
        $scope.datos.mascota_modalidad = $datos_mascota1.modalidad;    //MODALIDAD
      }
      //$.unblockUI();
      $.LoadingOverlay("hide");
    });
  }

  $scope.dataMascotaMod = {};

  $scope.ModDataMascota = function (data) {
    if ($scope.botonMod == true) {
      $scope.dataMascotaMod.xmascota_id = $scope.xmascota_id;
      if ($scope.url_imagen == false) {
        $scope.dataMascotaMod.xmascota_imagen_url = data.IMAGEN_MASCOTA;//data.xmascota_imagen_url;
      } else {
        $scope.dataMascotaMod.xmascota_imagen_url = $scope.datos.IMAGEN_MASCOTA;//data.xmascota_imagen_url;
      }
    }
    if (data.xmascota_raza_id) {
      $scope.dataMascotaMod.xmascota_raza_id = data.xmascota_raza_id;//raza_id
    } else {
      $scope.dataMascotaMod.xmascota_raza_id = data.mascota_raza;//raza_id
    }
    $scope.dataMascotaMod.xcod_chip = $scope.xcodigo_chip;
    $scope.dataMascotaMod.xmascota_raza = $scope.raza;
    $scope.dataMascotaMod.xmascota_usr_id = sessionService.get('CICIUDADANO');//data.xmascota_usr_id;//ci_igob
    $scope.dataMascotaMod.xmascota_titular_ci = sessionService.get('CICIUDADANO');//data.xmascota_titular_ci;//ci_igob
    $scope.dataMascotaMod.xmascota_data = "{}";


    //reg_vacunas
    $scope.reg_vacunas = {};
    $scope.reg_vacunas.nomb_vete = data.nomb_vete;
    $scope.reg_vacunas.inst_vete = data.inst_vete;
    $scope.reg_vacunas.tipo_vacuna = data.tipo_vacuna;
    $scope.reg_vacunas.nro_dosis = data.nro_dosis;
    $scope.reg_vacunas.fecha_vacuna = data.fecha_vacuna;

    //xmascota_data
    $scope.dataMascotaMod_data = {};
    $scope.dataMascotaMod_data.titular_correo = tit_correo;
    $scope.dataMascotaMod_data.titular_nombre = tit_nombre;
    $scope.dataMascotaMod_data.titular_numero = tit_numero;
    $scope.dataMascotaMod_data.nombre_mas = data.mascota_nombre;
    $scope.dataMascotaMod_data.edad = data.mascota_edad;
    $scope.dataMascotaMod_data.edad_desc = data.reg_edad_des;
    $scope.dataMascotaMod_data.peso = data.mascota_peso;
    $scope.dataMascotaMod_data.peso_desc = data.reg_peso_des;
    $scope.dataMascotaMod_data.raza = $scope.raza; //RAZA$scope.raza_mascota 
    $scope.dataMascotaMod_data.sexo = $scope.sexo;
    $scope.dataMascotaMod_data.color = data.mascota_color;
    $scope.dataMascotaMod_data.especie_id = data.mascota_especie_id;
    if ($scope.dataMascotaMod_data.especie_id == 1) {
      $scope.dataMascotaMod_data.especie = 'canino';
    } else {
      $scope.dataMascotaMod_data.especie = 'felino';

    }
    $scope.dataMascotaMod_data.tamanio = data.mascota_tamanio;
    $scope.dataMascotaMod_data.comp_peli = $scope.raza_peligrosa; //RAZA PELIGROSA
    $scope.dataMascotaMod_data.vete_actual = data.mascota_veterinario;
    $scope.dataMascotaMod_data.compromiso = "En mi calidad de titular de la mascota registrada ,  me comprometo a no maltratar ni abandonar , brindar el cuidado y atención a la mascota bajo mi custodia , así como el cumplimiento de las normas legales en actual vigencia. En aplicación al Texto Ordenado de las Leyes Municipales Autonómicas 239/316, Reglamento de la Ley Municipal Autonómica para Animales de Compañía Artículos del 5 al 17, 86 y 89.";

    $scope.dataMascotaMod_data.desparasitacion = $scope.datos.mascota_desparasitacion; //DESPARASITACION   
    $scope.dataMascotaMod_data.modalidad = $scope.datos.mascota_modalidad; //MODALIDAD 
    $scope.dataMascotaMod_data.modalidad_institucion = ''; ///ESTE DATOS ESTA DEFINIDO PARA LA MODALIDAD DE COMUNITARIO DE UNA EMPRESA

    $scope.dataMascotaMod_data.sistema = $scope.datos.sistema; 
    if($scope.dataMascotaMod_data.sistema == undefined || $scope.dataMascotaMod_data.sistema == null){
      $scope.dataMascotaMod_data.sistema = '';   
    }
    $scope.dataMascotaMod_data.sistema_modificador = 'IGOB247';    //SISTEMA
    $scope.dataMascotaMod_data.mm_macrodistrito = $scope.id_macrodistrito;
    $scope.dataMascotaMod_data.mm_macrodistrito_id = $scope.macrodistrito;
    if ($scope.dataMascotaMod_data.desparasitacion == 'no') {
      $scope.dataMascotaMod_data.reg_desparasitacion = [];
      /*$scope.reg_desparasitacion = {};
      $scope.reg_desparasitacion.fecha_aplicacion = '';
      $scope.reg_desparasitacion.institucion = '';
      $scope.reg_desparasitacion.nombre_veterinario_realizacion = '';
      $scope.reg_desparasitacion.nombre_marca = '';*/
    } else {
      $scope.dataMascotaMod_data.reg_desparasitacion = $scope.ArrayDesparast_;
      //reg_desparasitacion
      /*$scope.reg_desparasitacion = {};
      $scope.reg_desparasitacion.fecha_aplicacion = data.mascota_feca_desparasitacion;
      $scope.reg_desparasitacion.institucion = data.mascota_institucion_desparasitacion;
      $scope.reg_desparasitacion.nombre_veterinario_realizacion = data.mascota_veterinario_desparasitacion;
      $scope.reg_desparasitacion.nombre_marca = 'Certificación';*/
    }
    $scope.dataMascotaMod_data.esterilizacion = $scope.datos.mascota_esterilizacion; //ESTERILIZACION
    if ($scope.dataMascotaMod_data.esterilizacion == "no") {
     
      $scope.reg_marca = {};     
      $scope.reg_marca.codigo_esterilizacion = '';
      $scope.reg_marca.fecha_aplicacion = '';
      $scope.reg_marca.institucion = '';
      $scope.reg_marca.nombre_marca = '';
      $scope.reg_marca.nombre_veterinario_realizacion = '';
    } else {     
      $scope.reg_marca = {};
      $scope.reg_marca.codigo_esterilizacion = data.mascota_certificado;
      $scope.reg_marca.fecha_aplicacion = data.reg_feca;
      $scope.reg_marca.institucion = data.mascota_institucion;
      $scope.reg_marca.nombre_marca = data.mascota_marca;
      $scope.reg_marca.nombre_veterinario_realizacion = data.mascota_veterinario;
    }


    $scope.dataMascotaMod_data.marca = $scope.marca;  //MARCA
    $scope.dataMascotaMod_data.reg_marca = $scope.reg_marca;
    $scope.dataMascotaMod_data.reg_vacunas = $scope.data1; ///recupera en la grilla
    $scope.dataMascotaMod_data.vacunas = $scope.vacunas; //VACUNAS
    if ($scope.data1) {
      if ($scope.data1.length > 0) {
        $scope.dataMascotaMod_data.vacunas = 'si';
      }
    } else {
      $scope.dataMascotaMod_data.vacunas = 'no';
    }
    $scope.dataMascotaMod.xmascota_data = JSON.stringify($scope.dataMascotaMod_data);
    $scope.nombre_mas = data.mascota_nombre;
    $scope.especie = $scope.dataMascotaMod_data.especie;
    $scope.edad_desc = $scope.dataMascotaMod_data.edad_desc;
    $scope.edad = data.mascota_edad;
  }

  // serializar informacion
  //modificar Informacion
  $scope.modificarInformacionMascota = function (data) {
    swal({
      title: 'Mensaje de Advertencia',
      text: 'Estimado Ciudadano, ¿Se encuentra seguro/a de modificar los datos de su mascota?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      closeOnConfirm: false
    }, function () {
      swal.close();
      setTimeout(function () {
        $scope.ModDataMascota(data);
        var datosMascotaMod = new reglasnegocioM();
        datosMascotaMod.identificador = 'SISTEMA_VALLE-CM-2037';
        datosMascotaMod.parametros = JSON.stringify($scope.dataMascotaMod);
        datosMascotaMod.llamarregla(function (results) {
          var resp = JSON.parse(results);
          var sci = sessionService.get('CICIUDADANO');
          $scope.listarMascotasXci(sci);
          $scope.cargarNuevaDataMascota();
          $scope.mostrar_form_mascotas = false;
          $scope.tablaTramites.reload();
          $scope.$apply();
          alertify.success('Datos de la Mascota fue Modificada');
        });
      });
    });
  }

  $scope.mostrarRaza = function (id_raza) {
    if ($scope.mascotas_razas) {
      angular.forEach($scope.mascotas_razas, function (value, key) {
        if (value._raza_id == id_raza) {
          $scope.raza_mascota = value._raza_data;
        }
        if (id_raza == 27 || id_raza == 26 || id_raza == 28 || id_raza == 29 || id_raza == 30 || id_raza == 31 || id_raza == 82 || id_raza == 33 || id_raza == 34 || id_raza == 35) {
          $("#formModalP").modal("show");
          $scope.raza_peligrosa = 'En mi calidad de titular de la mascota registrada , me comprometo hacerme responsable de mi mascota y cumplir con las normas legales en actual vigencia, En aplicación de la Ley 553, al Texto Ordenado de las Leyes Municipales Autonómicas 239/316, Reglamento de la Ley Municipal Autonómica para Animales de Compañía Artículos del 5 al 17, del 86 al 89.';
        } else {
          $scope.raza_peligrosa = 'no';
        }
      });
    }
  }

  $scope.mostrarSexo = function (id_sexo) {
    if (id_sexo == 'macho') {
      $scope.sexo_mascota = 'MACHO';
    }
    if (id_sexo == 'hembra') {
      $scope.sexo_mascota = 'HEMBRA';
    }
  }

  $scope.muestra_esterilizacion = function (opcion) {
    if (opcion == 'no') {
      $scope.estrilizacion = false;
      $scope.esterilizacion = 'no';
      $scope.marca = 'ninguna';
      $scope.reg_marca = {};
    }
    if (opcion == 'si') {
      $scope.estrilizacion = true;
      $scope.esterilizacion = 'si';
      $scope.marca = $scope.datos.mascota_marca;
    }
    if (opcion == '' || opcion == 'undefined' || opcion == undefined) {
      $scope.estrilizacion = false;
      $scope.esterilizacion = 'si';
      $scope.marca = {};
    }
  }

  $scope.muestra_desparasitacion = function (opcion) {
    $scope.ArrayDesparast_ = [];
    $scope.desparasitaciones = [];
    $scope.vaciarDesparasitaciones();
    $scope.desparasitacion_si = false;
    if (opcion == 'no') {
      $scope.desparasitacion = false;
      $scope.desparasitacion1 = 'no';
    }
    if (opcion == 'si') {
      $scope.desparasitacion = true;
      $scope.desparasitacion1 = 'si';
    }
    if (opcion == '' || opcion == 'undefined' || opcion == undefined) {
      $scope.desparasitacion = false;
      $scope.desparasitacion1 = 'no';
    }
  }

  $scope.cargarNuevaDataMascota = function () {
    $scope.mostrarImagenI = false;
    $scope.mostrarImagenR = false;
    $scope.desabilitado = false;
    $scope.datos.IMAGEN_MASCOTA = '';
    $scope.btover7 = false;
    $scope.botonMod = false;
    $scope.botonCrea = true;
    $scope.mostrar_form_mascotas = true;
    $scope.data1 = [];
    $scope.vacunas = [];
    $scope.reg_vacunas = [];
    $scope.infogrilla = [];
    $scope.datos.mascota_nombre = "";
    $scope.datos.xmascota_raza_id = "";
    $scope.datos.mascota_raza = "";
    $scope.datos.mascota_edad = "";
    $scope.datos.mascota_especie = "";
    $scope.datos.mascota_especie_id = "";
    $scope.datos.reg_edad_des = "";
    $scope.datos.reg_sexo = "";
    $scope.datos.reg_peso_des = "";
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
    $scope.datos.href_IMAGEN_MASCOTA = "";
    $scope.datos.reg_feca = "";
    $scope.datos.mascota_marca = "";
    $scope.datos.mascota_certificado = "";
    $scope.datos.mascota_institucion = "";
    $scope.datos.mascota_veterinario = "";
    $scope.datos.mascota_desparasitacion = "";
    $scope.datos.mascota_feca_desparasitacion = "";
    $scope.datos.mascota_veterinario_desparasitacion = "";
    $scope.datos.mascota_institucion_desparasitacion = "";
    $scope.desabilitadoEdad1 = true;
    $scope.desabilitadoPeso1 = false;
    $scope.desabilitadoEdad = true;
    $scope.desabilitadoPeso = true;
    $scope.datos.mascota_modalidad = "";    //MODALIDAD
    $scope.estrilizacion = false;
    $scope.desparasitacion = false;
    $scope.xdeshabilitado = false;
    $scope.datosNoEditables = false;
    $scope.esterilizacionDisabled=false;
  }

  $scope.listarRaza = function (data) {
    var datosMascota = new reglasnegocioM();
    datosMascota.identificador = 'SERVICIO_VALLE-CM-391';
    datosMascota.parametros = '{"especieid":"' + data + '"}';
    datosMascota.llamarregla(function (results) {
      var resp = JSON.parse(results);
      $scope.mascotas_razas = resp;
      $scope.dsaraza = false;
      $scope.$apply();
    });
  }

  $scope.validarEmail = function (email_ca) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email_ca);
  }

  //CONTACTOS
  $scope.registrarContacto = function (data) {
    $.blockUI();
    var datosContacto = new reglasnegocioM();
    datosContacto.identificador = 'SISTEMA_VALLE-CM-2047';
    usr_id = 1;
    apaterno_ca = data.apaterno_ca;
    apcasada_ca = data.apcasada_ca;
    apmaterno_ca = data.apmaterno_ca;
    celular_ca = data.celular_ca;
    email_ca = data.email_ca;
    fijo_ca = data.fijo_ca;
    nombre_ca = data.nombre_ca;
    ci = data.ci_ca;
    data = '{"nombre_ca":"' + nombre_ca + '","apaterno_ca":"' + apaterno_ca + '","apmaterno_ca":"' + apmaterno_ca + '","apcasada_ca":"' + apcasada_ca + '","email_ca":"' + email_ca + '","fijo_ca":"' + fijo_ca + '","celular_ca":"' + celular_ca + '"}';
    data1 = JSON.stringify(data);
    datosContacto.parametros = '{"xcontactos_usr_id":"' + usr_id + '","xcontactos_data":' + data1 + ',"xcontactos_carnet":"' + ci + '"}';
    datosContacto.llamarregla(function (results) {
      var resp = JSON.parse(results);
      $scope.mascotas_contaco = resp;
      $scope.$apply();
      alertify.success('Contacto Alternativo Guardado...');
      $.unblockUI();
    });

  }

  $scope.cargarContactos = function () {
    $.blockUI();
    $scope.ci = sessionService.get('CICIUDADANO');

    var ci1 = $scope.ci;
    var cargarContacto = new reglasnegocioM();
    cargarContacto.identificador = 'SISTEMA_VALLE-CM-2049';
    cargarContacto.parametros = '{"xci_contacto":' + ci1 + '}';
    cargarContacto.llamarregla(function (results) {
      $scope.contactos = JSON.parse(results);
      $scope.verificarContacto(ci1);
      $.unblockUI();
    });

  }

  $scope.vaciarContactos = function () {

    $scope.datos.nombre_ca = '';
    $scope.datos.apaterno_ca = '';
    $scope.datos.apmaterno_ca = '';
    $scope.datos.apcasada_ca = '';
    $scope.datos.email_ca = '';
    $scope.datos.fijo_ca = '';
    $scope.datos.celular_ca = '';

  }

  $scope.verificarContacto = function (ci) {
    $.blockUI();
    var verificarContacto = new reglasnegocioM();
    verificarContacto.identificador = 'SISTEMA_VALLE-CM-2048';
    verificarContacto.parametros = '{"ycarnet":' + ci + '}';
    verificarContacto.llamarregla(function (results) {
      $scope.verificarcontactos = JSON.parse(results);
      $scope.verC = $scope.verificarcontactos[0].sp_buscar_contacto_por_carnet;
      if ($scope.verC == 0) {
        $("#nombre_ca").val("");
        $("#apaterno_ca").val("");
        $("#apmaterno_ca").val("");
        $("#apcasada_ca").val("");
        $("#email_ca").val("");
        $("#fijo_ca").val("");
        $("#celular_ca").val("");
        swal("Estimado Ciudadano", "No tiene ningun contacto registrado con el C.I. introducido. Si desea puede realizar el registro", "error")
      } if ($scope.verC == 1) {
        $.blockUI();
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
        $.unblockUI();
      }
      $.unblockUI();
    });

  }

  //CONTACTOS
  ////ALMACENA VACUNAS EN LA GRILLA ///////
  $scope.guarda_grilla = function (datos) {
    if ($scope.botonMod == true) {
      $scope.vacunas = [];
      $scope.registrarVacuna_grilla_Mod(datos);
    } else {
      //alert('nuevo');
      $scope.registrarVacuna_grilla_Nuevo(datos);
    }
  }

  $scope.vacunas = [];
  $scope.registrarVacuna_grilla_Mod = function (data2) {
    $scope.vacunas = $scope.infogrilla;
    if ($scope.vacunas.length == undefined) {
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

    } else {
      $scope.vacunas = $scope.infogrilla;
      var vacu = '{"tipo_vacuna":"' + data2.tipo_vacuna + '","nro_dosis":"' + data2.nro_dosis + '","fecha_vacuna":"' + data2.fecha_vacuna + '","nomb_vete":"' + data2.nomb_vete + '","inst_vete":"' + data2.inst_vete + '"}';
      $scope.vacunas.push(JSON.parse(vacu));
      $scope.data1 = $scope.vacunas;
      $scope.vaciarVacunas();
    }
  }

  $scope.registrarVacuna_grilla_Nuevo = function (data2) {
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

  $scope.vacunas_Grilla = function (data) {
    $scope.vacuna_grilla = [];
    var encabezado = [];
    var indice = 1;
    for (j = 0; j < data.length; j++) {
      $scope.vacuna_grilla.push({
        nroElem: j + 1,
        tipo_vacuna: data[j].tipo_vacuna,
        nro_dosis: data[j].nro_dosis,
        fecha_vacuna: data[j].fecha_vacuna,
        nomb_vete: data[j].nomb_vete,
        inst_vete: data[j].inst_vete
      });
    }
    angular.forEach($scope.vacuna_grilla, function (value, key) {
      encabezado[indice] = value;
      indice = indice + 1;
    });
    $scope.datos.vacuna_grilla = encabezado;
  }


  ////ALMACENA VACUNAS EN LA GRILLA ///////


  ////almacena desparasitacion en array INICIO //////////////////

  $scope.guarda_desparasitacion = function(datos){
    if ($scope.botonMod == true) {
      $scope.desparasitaciones = []
      $scope.registroDesparasitacionModificar(datos);
    } else {
      //alert('nuevo');
      $scope.registrarNuevaDesparasitacion(datos);
    }
  }
  $scope.desparasitaciones = []
  $scope.registroDesparasitacionModificar = function (dataModificar){
    $scope.desparasitaciones = $scope.ArrayDesparast_;
    if($scope.desparasitaciones.length == undefined){
        id = $scope.desparasitaciones.length + 1;
        $scope.desparasitaciones.push({
          fecha_aplicacion: dataModificar.mascota_feca_desparasitacion,
          institucion: dataModificar.mascota_institucion_desparasitacion,
          nombre_veterinario_realizacion: ""
        });
        $scope.despara = [];
        $scope.vacu.mascota_feca_desparasitacion;
        $scope.vacu.mascota_institucion_desparasitacion;
        $scope.ArrayDesparast_ = $scope.desparasitaciones;
        $scope.vaciarVacunas();
    }else{

      $scope.desparasitaciones = $scope.ArrayDesparast_;
      var desparast = '{"fecha_aplicacion":"' + dataModificar.mascota_feca_desparasitacion + '","nombre_veterinario_realizacion":"","institucion":"' + dataModificar.mascota_institucion_desparasitacion + '"}';
      $scope.desparasitaciones.push(JSON.parse(desparast));
      $scope.ArrayDesparast_ = $scope.desparasitaciones;
      if( $scope.ArrayDesparast_.length > 0){
        $scope.desparasitacion_si = true;
      }else{
        $scope.desparasitacion_si = false;
      }
      $scope.vaciarDesparasitaciones();
    }
  }

  $scope.registrarNuevaDesparasitacion = function (dataNuevo){
    var desparast = '{"fecha_aplicacion":"' + dataNuevo.mascota_feca_desparasitacion + '","nombre_veterinario_realizacion":"","institucion":"' + dataNuevo.mascota_institucion_desparasitacion + '"}';
    $scope.desparasitaciones.push(JSON.parse(desparast));
    $scope.ArrayDesparast_ = $scope.desparasitaciones;
    if( $scope.ArrayDesparast_.length > 0){
      $scope.desparasitacion_si = true;
    }else{
      $scope.desparasitacion_si = false;
    }
    $scope.vaciarDesparasitaciones();

  /*  id = $scope.desparasitaciones.length + 1;
    $scope.desparasitaciones.push({
      fecha_aplicacion: dataNuevo.mascota_feca_desparasitacion,
      institucion: dataNuevo.mascota_institucion_desparasitacion,
    });
    $scope.despara = [];
    $scope.despara.fecha_aplicacion;
    $scope.despara.institucion;
    $scope.ArrayDesparast_ = $scope.desparasitaciones;
 //   $scope.vacunas_Grilla($scope.desparasitaciones);
    $scope.vaciarDesparasitaciones();
*/

  }
  ////almacena desparasitacion en array FIN //////////////////


  $scope.datosMascota = function (id) {
    var datosMascota = new reglasnegocioM();
    datosMascota.identificador = 'SERVICIO_VALLE-CM-391';
    datosMascota.parametros = '{"especieid":1}';
    datosMascota.llamarregla(function (results) {
      results1 = JSON.parse(results);
      $scope.tablaTramites.reload();
      if (results.length > 0) {
        $scope.datosMascota = results1;
      } else {

      }
    });
  };

  //BAJA DE MASCOTA
  $scope.validarbaja = function (data) {
    swal({
      title: 'Mensaje de Verificación',
      text: 'Estimado Ciudadano, ¿Se encuentra seguro/a de realizar la baja de su Mascota?. Y comunicarle que La ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      closeOnConfirm: false
    }, function () {
      swal.close();
      setTimeout(function () {
        $scope.registrarVacuna(data);
      }, 1000);
      swal('Estimado Ciudadano', "Información de Contacto ALternativo se guardó correctamente", 'success');
    });
  };

  $scope.verElim = function (eut, fal) {
    if (eut == 'eutanasia' && fal == 'fallecido') {
      swal('Error', 'Debe elegir solo una opción', 'error');
      $scope.datos.eutanasia = '';
      $scope.datos.fallecido = '';
    }
    if (eut == 'eutanasia') {
      $scope.datos.fallecido = '';
    } if (fal == 'fallecido') {
      $scope.datos.eutanasia = '';
    };

  }

  $scope.llamModEli = function (dato) {
    id_mas_luz = dato;
  }

  $scope.eliminarMascota = function (dato, eut, fal) {
    cargando();
    $scope.datos.eutanasia = '';
    $scope.datos.fallecido = '';
    if ((eut == undefined && fal == undefined) || (eut == 'undefined' && fal == 'undefined') || (eut == '' && fal == '')) {
      swal('Error', 'Debe elegir una opción', 'error');
    } else {
      if ((eut == 'eutanasia' && fal == undefined) || (eut == 'eutanasia' && fal == 'undefined') || (eut == 'eutanasia' && fal == '')) {
        luzz = 'eutanasia';
      }
      if ((eut == undefined && fal == 'fallecido') || (eut == 'undefined' && fal == 'fallecido') || (eut == '' && fal == 'fallecido')) {
        luzz = 'fallecido';
      };
      $.LoadingOverlay("hide");
    }
    var usr_id = sessionService.get('CICIUDADANO');
    var eliMascota = new reglasnegocioM();
    eliMascota.identificador = 'SISTEMA_VALLE-CM-2052';
    eliMascota.parametros = '{"xmascota_id":' + id_mas_luz + ',"xmascota_tipo":"' + luzz + '","xmascota_usr_id":' + usr_id + '}';
    eliMascota.llamarregla(function (results) {
      results1 = JSON.parse(results);
      if (results.length > 0) {
        $scope.eliMascota = results1;
        $scope.tablaTramites.reload();
        $scope.$apply();
        $scope.listarMascotasXci(usr_id);
        alertify.success('Datos de la Mascota fue dada de baja');
      } else {

      }
    });

  }
  //BAJA DE MASCOTA

  $scope.validarEnvioVacunas = function (data) {
    swal({
      title: 'Mensaje de Verificación',
      text: 'Estimado Ciudadano, ¿Se encuentra seguro/a de que los datos registrados son los correctos?... Una vez guardados no podrá realaizar cambios.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      closeOnConfirm: false
    }, function () {
      swal.close();
      setTimeout(function () {
        $scope.registrarVacuna(data);
      }, 1000);
      swal('Estimado Ciudadano', "Información de Contacto ALternativo se guardó correctamente", 'success');
    });
  };

  $scope.vaciarVacunas = function () {
    $scope.datos.tipo_vacuna = '';
    $scope.datos.nro_dosis = '';
    $scope.datos.fecha_vacuna = '';
    $scope.datos.nomb_vete = '';
    $scope.datos.inst_vete = '';
  }

  $scope.vaciarDesparasitaciones = function () {
    $scope.datos.mascota_institucion_desparasitacion = '';
    $scope.datos.mascota_feca_desparasitacion = '';
  }

  $scope.validaCondicionUso = function () {
  }
  $scope.noValidaCondicionUso = function () {
    location.reload();
  };

  $scope.validaCorreo = function () {
    var $result = $("#result");
    var email_ca = $("#email_ca").val();
    $result.text("");
    if ($scope.validarEmail(email_ca)) {
      $("#mensaje1").show();
      $("#mensaje2").hide();
      $scope.correoValido = false;
    } else {
      $("#mensaje1").hide();
      $("#mensaje2").show();
      $scope.correoValido = true;
    }
    return false;
  }

  $scope.validarEnvioContacto = function (data) {
    swal({
      title: 'Mensaje de Verificación',
      text: 'Estimado Ciudadano, ¿Se encuentra seguro/a de que los datos registrados son los correctos?... Una vez guardados no podrá realaizar cambios.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      closeOnConfirm: false
    }, function () {
      swal.close();
      setTimeout(function () {
        $scope.registrarContacto(data);
      }, 1000);
    });
  };

  //imagen mascota
  $scope.ejecutarFile = function (idfile) {
    $scope.fileId = idfile;
    var sid = document.getElementById(idfile);
    if (sid) {
      document.getElementById(idfile).click();
    } else {
      alert("Error ");
    }
  }
  
  function validarFormatoDocumento(opcion, sformato) {
    var s_formato = sformato.split('/')[1];
    switch (opcion) {
      case "ADJ_IMG":
        if ((s_formato == 'png' || s_formato == 'PNG' || s_formato == 'jpg' || s_formato == 'JPG') ||
          (s_formato == 'jpeg' || s_formato == 'JPEG' || s_formato == 'bmp' || s_formato == 'BMP') ||
          (s_formato == 'gif' || s_formato == 'GIF')) {
          return true
        }
        break;
      case "ADJ_DOC":
        if ((s_formato == 'pdf' || s_formato == 'PDF') ||
          (s_formato == 'docx' || s_formato == 'DOCX' || s_formato == 'docxlm' || s_formato == 'DOCXML')) {
          return true
        }
        break;
        return false
    }
  };
  //UPLOAD  FILES
  var uploader = $scope.uploader = new FileUploader({
    url: CONFIG.UPLOAD_URL
  });
  uploader.filters.push({
    name: 'customFilter',
    fn: function (item, options) {
      return this.queue.length < 10;
    }
  });
  // END UPLOAD  
  var uploader = $scope.uploader;

  uploader.filters.push({
    name: 'customFilter',
    fn: function (item, options) {
      return this.queue.length < 10;
    }
  });
  uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) { };

  uploader.onAfterAddingFile = function (fileItem) {
    tipoDocumento = fileItem._file.type;
    var nameArray = tipoDocumento.split('/');
    tipoDocumento = nameArray[1];
    //var count = 0;
    var target_img, output;
    if (fileItem._file.size <= 500000) {
      if (tipoDocumento == "png" || tipoDocumento == "jpg" || tipoDocumento == "jpeg" || tipoDocumento == "bmp") {
        $scope.botonSubirOriginal = null;
        $scope.botonSubirError = "oculta";
        $scope.imgmenos = 'mostrar';
      } else {
        swal('Advertencia', 'Seleccione un archivo de tipo imagen', 'error');
        $scope.botonSubirError = null;
        $scope.botonSubirOriginal = "oculta";
        $.unblockUI();
      }
      $scope.subir = "ok";
    } else {
      if (fileItem._file.size <= 15000000) {
        if (tipoDocumento == "png" || tipoDocumento == "jpg" || tipoDocumento == "jpeg" || tipoDocumento == "bmp") {
          $scope.botonSubirOriginal = null;
          $scope.botonSubirError = "oculta";
          $scope.imgmenos = null;
          var current_file = fileItem._file;
          if (current_file.size > 500000) {
            /////////////////////COMPRESION DE IMAGENES//////////////////////////////
            var filecompress = compressImage(current_file).then(function (respuesta) {
              $scope.myFile1 = respuesta;
            });
            /////////////////////////////////////////////////////
          }
        } else {
          swal('Advertencia', 'Seleccione un archivo de tipo imagen', 'error');
          $scope.botonSubirError = null;
          $scope.botonSubirOriginal = "oculta";
          $.unblockUI();
        }
      }
      else {
        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
        $.unblockUI();
      };
      $scope.subir = "ok";
    }
  };

  $scope.cambiarFile = function (obj, valor) {
    var arraydoc = ["pdf", "doc", "docx", ".docx", ".docxlm"];
    $scope.registroAdj = [];
    var stam_min = 5242880;//Bytes
    var stam_max = 15728640;//Bytes
    var fechaNueva = "";
    var fechaserver = new fechaHoraServer();
    fechaserver.fechahora(function (resp) {
      var sfecha = JSON.parse(resp);
      var fechaServ = (sfecha.success.fecha).split(' ');
      var fecha_ = fechaServ[0].split('-');
      var hora_ = fechaServ[1].split(':');
      fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1];
    });
    $.blockUI();
    setTimeout(function () {
      //contadorAdjunto ++;
      var nombre = obj.getAttribute("name");
      var objarchivo = obj.files[0];
      $scope.IMAGEN_MASCOTA = obj.files[0];
      var tamaniofile = obj.files[0];

      $scope.mostrarImagenI = true;
      $scope.mostrarImagenR = false;
      var ciCiudadano = sessionService.get('CICIUDADANO');
      $scope.direccionvirtual = "RC_CLI";
      //var sDirTramite = $scope.datos_responsable.ci;
      var uploadUrl = CONFIG.APIURL + "/files/IMAGENESMASCOTAS/" + ciCiudadano + "/" + $scope.fechayhora + "/";
      if (nombre == 'IMAGEN_MASCOTA' && (typeof (obj.files[0]) != 'undefined')) {
        var s_formatodoc = obj.files[0].type;
        s_formatodoc = s_formatodoc.split('/')[1];
        var nomdocumento = obj.files[0].name;
        var docextension = nomdocumento.split('.');
        var ext_doc = docextension[docextension.length - 1].toLowerCase();
        if ((ext_doc == 'pdf' || ext_doc == 'PDF') || (ext_doc == 'docx' || ext_doc == 'DOCX' || ext_doc == 'docxlm' || ext_doc == 'DOCXML') || (ext_doc == 'xlsx' || ext_doc == 'XLSX' || ext_doc == 'XLS' || ext_doc == 'xls')) {
          swal('Estimado Ciudadano', 'Debe adjuntar un archivo tipo imagen (png,jpg,jpeg)', 'error');
        } else {
          if (tamaniofile.size > stam_min && tamaniofile.size <= stam_max) {

            if (validarFormatoDocumento("ADJ_IMG", obj.files[0].type)) {
              var filecompress = compressImage($scope.IMAGEN_MASCOTA).then(function (respuestapl) {
                var nombreNuevo = nombre + '_' + '_' + fechaNueva + '.' + ext_doc;
                fileUploadcorr.uploadFileToUrl1(respuestapl, uploadUrl, nombreNuevo);
                $scope.datos.IMAGEN_MASCOTA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                $scope.IMAGEN_MASCOTA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                document.getElementById("txt_" + nombre).value = nombreNuevo;
                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                $scope.swimagen = true;
                $scope.url_imagen = true; //cuando cambia imagen
                $scope.btover7 = true;
              });
            }
          } else {
            if (tamaniofile.size <= stam_min) {
              if (validarFormatoDocumento("ADJ_IMG", obj.files[0].type) || validarFormatoDocumento("ADJ_DOC", obj.files[0].type)) {
                var nombreNuevo = nombre + '_' + '_' + fechaNueva + '.' + ext_doc;
                fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                $scope.datos.IMAGEN_MASCOTA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                $scope.IMAGEN_MASCOTA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                document.getElementById("txt_" + nombre).value = nombreNuevo;
                document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                $scope.swimagen = true;
                $scope.url_imagen = true; //cuando cambia imagen
                $scope.btover7 = true;
                $.unblockUI();
              } else {
                swal('Advertencia', 'El archivo IMAGEN MASCOTA no es valido, seleccione un archivo de tipo imagen', 'error');
                document.getElementById('IMAGEN_MASCOTA').value = '';
                document.getElementById('txt_IMAGEN_MASCOTA').value = '';
                $scope.datos.IMAGEN_MASCOTA = '';
                $scope.IMAGEN_MASCOTA = '';
                valor = '';
                $.unblockUI();
              };
            }
            if (tamaniofile.size > stam_max) {
              swal('Advertencia', 'El tamaño de la imagen IMAGEN MASCOTA es muy grande', 'error');
              document.getElementById('txt_IMAGEN_MASCOTA').value = '';
              document.getElementById('IMAGEN_MASCOTA').value = '';
              $scope.registro.IMAGEN_MASCOTA = '';
              $scope.IMAGEN_MASCOTA = '';
              valor = '';
              $.unblockUI();
            }
          }

        }
      }
    }, 1000);
  }

  $scope.actualiza = function (nombre) {
    document.getElementById('m1').value = 'http://localhost:8080/evidencia/' + nombre;
  }

  $scope.registroMascotas_servicio = function () {
    var datosNeXO = {};
    datosNeXO['us_nombre'] = sessionService.get('US_NOMBRE');
    datosNeXO['us_paterno'] = sessionService.get('US_PATERNO');
    datosNeXO['us_materno'] = sessionService.get('US_MATERNO');
    datosNeXO['us_email'] = sessionService.get('US_EMAIL');
    datosNeXO['ciciudadano'] = sessionService.get('CICIUDADANO');
    datosNeXO['ciexpedido'] = sessionService.get('CIEXPEDIDO');
    datosNeXO['idciudadano'] = sessionService.get('IDCIUDADANO');
    datosNeXO['tipo_persona'] = sessionService.get('TIPO_PERSONA');
    var mascotas = JSON.stringify(datosNeXO);
    var regServicio = new registroServicioMascotas();
    regServicio.id_servicio = $scope.resId;
    regServicio.oid_ciudadano = sessionService.get('IDCIUDADANO');
    regServicio.id_usuario = 3;
    regServicio.data_formulario = $scope.dataServicioMascota;
    regServicio.data_ciudadano = mascotas;
    regServicio.registro_Servicio_Mascotas(function (respuesta) {
      var regMascota = JSON.parse(respuesta);
      //regMascota = regMascota.success[0].sp_insertar_formulario_servicios_datos;
      regMascota1 = regMascota.success.length;
      if (regMascota1 > 0) {
        var datosMascota = new reglasnegocioM();
        datosMascota.identificador = 'SISTEMA_VALLE-CM-2053';
        datosMascota.parametros = JSON.stringify($scope.dataMascota);
        $scope.dataServicioMascota = JSON.stringify($scope.dataMascota);
        datosMascota.llamarregla(function (results) {
          if (results.length == 0) {
            alertify.error("Su mascota no fue registrada, por favor verifique sus datos.");
          } else {
            //alertify.success('Su Mascota fue registrada exitosamente con el codigo: '+$scope.dataMascota.cod_chip);      
            swal("Estimado ciudadano", "Su mascota fue registrada satisfatoriamente", "success");
            var sci = sessionService.get('CICIUDADANO');
            $scope.listarMascotasXci(sci);
            $scope.cargarNuevaDataMascota();
            $scope.tablaTramites.reload();
            $scope.$apply();
          }
        });
      } else {
        swal('Estimado Ciudadano', 'Hubo un problema al registrar su mascota', 'error');
      }

    });
  };


  $scope.imageStrings = [];
  $scope.processFiles = function (files) {
    angular.forEach(files, function (flowFile, i) {
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        var uri = event.target.result;
        $scope.imageStrings[i] = uri;
      };
      fileReader.readAsDataURL(flowFile.file);
    });
  };
  ///imagen mascota

  try {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  } catch (e) {
    console.log("error", e);
  }
  $scope.$on('api:ready', function () {
    id = 1;
    $scope.datosMascota('1');
    var sci = sessionService.get('CICIUDADANO');
    $scope.listarMascotasXci(sci);
    $scope.perNatural = sessionService.get('TIPO_PERSONA');
    $scope.ci = sessionService.get('CICIUDADANO');
    $scope.nombre = sessionService.get('US_NOMBRE');
    $scope.paterno = sessionService.get('US_PATERNO');
    $scope.materno = sessionService.get('US_MATERNO');
    $scope.exp = sessionService.get('CIEXPEDIDO');
  });

  $scope.obtenerDatosServicio = function () {
    $scope.tramite_ciudadano = 'MASCOTAS';
    var sData = new obtIdServicio();
    sData.codigo = $scope.tramite_ciudadano;
    sData.obt_Id_Servicio(function (res) {
      $scope.res = JSON.parse(res);
      $scope.resId = $scope.res.success[0].id;
    })
  }



  $scope.verCertificado = function (dato) {
    cargando();
    $scope.certMascota = '';
    $("#modalCErt").modal("show");
    $scope.resultsCert = "data:application/pdf;base64,";

    var datosMascota = new reglasnegocioM();
    datosMascota.identificador = 'SISTEMA_VALLE-CM-CDIG';
    datosMascota.parametros = '{"idCert":' + dato + '}';
    datosMascota.llamarregla(function (results) {
      try {
        cargando();
        if (results !== '"[{ }]"' && results !== '"[{}]"') {
          setTimeout(function () {
            $scope.certMascota = JSON.parse(results)[0].dataCert;
            $scope.resultsCert = "data:application/pdf;base64," + $scope.certMascota;
            $scope.$apply();

            $.LoadingOverlay("hide");
          }, 1000);
        }
        else {
          swal('Estimado Ciudadano', 'Hubo un problema al desplegar el Carnet, intente mas tarde por favor.', 'error');
        }
        $.LoadingOverlay("hide");
      } catch (e) {
        console.log(e.toString());

        $.LoadingOverlay("hide");
      }
    });
  }
  $scope.inicioServicios = function () {
    var sTokenMascotas = sessionService.get('TOKEN_MOTORM');
    sTokenMascotas = ((typeof (sTokenMascotas) == 'undefined' || sTokenMascotas == null) ? '' : sTokenMascotas);
    $scope.url_imagen = false;
    $scope.mostrarImagenR = false;
    $scope.mostrarImagenI = false;
    $scope.desabilitadoEdad1 = true;
    $scope.desabilitadoPeso1 = false;
    if (sTokenMascotas != '') {
      $scope.recuperandoDatosInicialesCiudadano();
      id = 1;
      $scope.datosMascota('1');
      var sci = sessionService.get('CICIUDADANO');
      $scope.listarMascotasXci(sci);
      $scope.perNatural = sessionService.get('TIPO_PERSONA');
      $scope.ci = sessionService.get('CICIUDADANO');
      $scope.nombre = sessionService.get('US_NOMBRE');
      $scope.paterno = sessionService.get('US_PATERNO');
      $scope.materno = sessionService.get('US_MATERNO');
      $scope.exp = sessionService.get('CIEXPEDIDO');
      $scope.obtenerDatosServicio();
    } else {
      alert("Estimado usuario. por el momento no podemos procesar su solicitud (Registro de Mascotas). Intentelo mas tarde porfavor.");
      $location.path('dashboard');
    }
  };
  $scope.verificarEdad = function (edad) {
    if (edad == '') {
      $scope.desabilitadoEdad1 = true;
      $scope.desabilitadoEdad = true;
      $scope.datos.mascota_edad = "";
    } else {
      $scope.desabilitadoEdad = false;
      $scope.desabilitadoEdad1 = false;
    }
  }
  $scope.verEdad = function (edad) {
    $scope.desabilitadoEdad1 = true;

  }

  $scope.verificarpeso = function (peso) {
    $scope.desabilitadoPeso1 = '';
    if (peso == '' || peso == null || peso == 'null' || peso == 'undefined' || peso == undefined) {
      $scope.desabilitadopeso1 = false;
      $scope.desabilitadoPeso = true;
      $scope.datos.mascota_peso = "";
    } else {
      $scope.desabilitadoPeso = false;
      $scope.desabilitadoPeso1 = true;
    }
  }
  $scope.verPeso = function (peso) {
    $scope.desabilitadoPeso1 = false;
  }

  $scope.validarEP = function () { //click en el boton GUARDAR DATOS
    $scope.swRegistrarP = true;
    if ((($scope.datos.mascota_peso != '' || $scope.datos.mascota_peso != 'null' || $scope.datos.mascota_peso != null || $scope.datos.mascota_peso != 'undefined' || $scope.datos.mascota_peso != undefined) && $scope.datos.reg_peso_des == '') ||
      (($scope.datos.mascota_peso == '' || $scope.datos.mascota_peso == 'null' || $scope.datos.mascota_peso == 'undefined' || $scope.datos.mascota_peso == undefined || $scope.datos.mascota_peso == null) && $scope.datos.reg_peso_des != '')) {
      $scope.datos.reg_peso_des = '';
      $scope.datos.mascota_peso = '';
      $scope.desabilitadoPeso = true;
      $scope.desabilitadoPeso1 = false;
    }
    if ($scope.datos.mascota_peso == '' && $scope.datos.reg_peso_des == '') {
      $scope.datos.reg_peso_des = '';
      $scope.datos.mascota_peso = '';
      $scope.desabilitadoPeso = true;
      $scope.desabilitadoPeso1 = false;
    }
    $scope.swRegistrarE = true;
    if (($scope.datos.mascota_edad != '' && $scope.datos.reg_edad_des == '') || ($scope.datos.mascota_edad == '' && $scope.datos.reg_edad_des != '')) {
      $scope.datos.reg_edad_des = '';
      $scope.datos.mascota_edad = '';
      $scope.desabilitadoEdad = true;
      $scope.desabilitadoEdad1 = true;
    }  
    if($scope.validacionEstEsterilizacion() && $scope.validacionEstDesparasitacion()){
      $scope.verificarDatos();
    }else{
      swal('Estimado Ciudadano', 'Debe rellenar todos los campos marcados con *');
    }  
  }

  $scope.validarMEP = function (data) {
    $scope.swModificarP = true;
    if ((($scope.datos.mascota_peso != '' || $scope.datos.mascota_peso != 'null' || $scope.datos.mascota_peso != null || $scope.datos.mascota_peso != 'undefined' || $scope.datos.mascota_peso != undefined) && $scope.datos.reg_peso_des == '') ||
      (($scope.datos.mascota_peso == '' || $scope.datos.mascota_peso == 'null' || $scope.datos.mascota_peso == 'undefined' || $scope.datos.mascota_peso == undefined || $scope.datos.mascota_peso == null) && $scope.datos.reg_peso_des != '')) {
      $scope.datos.reg_peso_des = '';
      $scope.datos.mascota_peso = '';
      $scope.desabilitadoPeso = true;
      $scope.desabilitadoPeso1 = false;
    }
    if ($scope.datos.mascota_peso == '' && $scope.datos.reg_peso_des == '') {
      $scope.datos.reg_peso_des = '';
      $scope.datos.mascota_peso = '';
      $scope.desabilitadoPeso = true;
      $scope.desabilitadoPeso1 = false;
    }
    if (($scope.datos.mascota_edad != '' && $scope.datos.reg_edad_des == '') || ($scope.datos.mascota_edad == '' && $scope.datos.reg_edad_des != '')) {
      $scope.swModificarE = false;
      $scope.datos.reg_edad_des = '';
      $scope.datos.mascota_edad = '';
      $scope.desabilitadoEdad = true;
      $scope.desabilitadoEdad1 = true;
    }
    if($scope.validacionEstEsterilizacion() && $scope.validacionEstDesparasitacion()){
      $scope.modificarInformacionMascota(data);
    }else{
      swal('Estimado Ciudadano', 'Debe rellenar todos los campos marcados con *');
    } 


  }

  //----------------VER DATOS MASCOTA -------------//
  $scope.verDatosMascota = function (data_tramite) {
    $scope.botonMod = false;
    $scope.botonCrea = false;
    $scope.tramiteSeleccionado = data_tramite.xmascota_id;
    $scope.tram = data_tramite.xmascota_data.nombre_mas;
    $scope.estado = data_tramite.xmascota_estado;
    $scope.desabilitado = true;
    $scope.desabilitadoEdad = true;
    $scope.desabilitadoPeso = true;
    $scope.mostrar_form_mascotas = true;
    $scope.datosMascotaVer($scope.tramiteSeleccionado);
  }
  $scope.datosMascotaVer = function (data) {
    cargando();
    $scope.mostrarImagenI = false;
    $scope.mostrarImagenR = true;
    $datos_mascota1 = {};
    $scope.estrilizacion = false;
    $scope.desparasitacion = false;
    datosMascota = new reglasnegocioM();
    datosMascota.identificador = 'SISTEMA_VALLE-CM-2031';
    datosMascota.parametros = '{"id_mascota":"' + data + '"}';
    datosMascota.llamarregla(function (results) {
      $scope.$apply();
      $scope.respuesta = JSON.parse(results);
      $datos_mascota = $scope.respuesta[0].xmascota_data;
      $datos_mascota1 = JSON.parse($datos_mascota);
      alertify.success('Datos de la Mascota fue Recuperada');
      if ($scope.botonMod == false) {
        $scope.datos.mascota_nombre = $datos_mascota1.nombre_mas;
        if ($datos_mascota1.especie_id != undefined) {
          $scope.datos.mascota_especie_id = $datos_mascota1.especie_id;
        } else {
          if ($datos_mascota1.especie == "canino" || $datos_mascota1.especie == "CANINO") {
            $scope.datos.mascota_especie_id = 1;
          }
          if ($datos_mascota1.especie == "felino" || $datos_mascota1.especie == "FELINO") {
            $scope.datos.mascota_especie_id = 2;
          }
        }
        $scope.listarRaza($scope.datos.mascota_especie_id); //CARGA LA RAZA DE LA MASCOTA
        $scope.datos.xmascota_raza_id = $scope.respuesta[0].xmascota_raza_id;
        $scope.xmascota_usr_id = $scope.respuesta[0].xmascota_usr_id;
        $scope.xmascota_titular_id = $scope.respuesta[0].xmascota_titular_id;
        $scope.xmascota_titular_ci = $scope.respuesta[0].xmascota_titular_ci;
        $scope.xcodigo_chip = $scope.respuesta[0].xcodigo_chip;
        $scope.xmascota_id = $scope.respuesta[0].xmascota_id;
        $scope.comp_peli = $datos_mascota1.comp_peli;
        $scope.compromiso = $datos_mascota1.compromiso;
        $scope.xmascota_imagen_urlM = $scope.respuesta[0].xmascota_imagen_url;
        $scope.convertirUrl = $scope.xmascota_imagen_urlM.split("files");
        $scope.xdeshabilitado = true;
        if (($scope.convertirUrl[0] == 'http://40.117.46.159//rest/') || ($scope.convertirUrl[0] == 'https://40.117.46.159//rest/')) {
          $scope.xmascota_imagen_url = CONFIG.APIURL + '/files' + $scope.convertirUrl[1];
        } else {
          $scope.xmascota_imagen_url = $scope.respuesta[0].xmascota_imagen_url;
        }
        if ($scope.respuesta[0].xmascota_imagen_url) {
          $scope.swimagen = true;
        } else {
          $scope.swimagen = false;
        }
        $scope.btover7 = "mostrar";
        $scope.datos.IMAGEN_MASCOTA = $scope.respuesta[0].xmascota_imagen_url;
        $scope.datos.xmascota_especie = $datos_mascota1.especie;
        $scope.datos.xmascota_raza = $datos_mascota1.raza;
        $scope.raza = $datos_mascota1.raza;
        $scope.datos.mascota_edad = $datos_mascota1.edad;
        $scope.datos.reg_edad_des = $datos_mascota1.edad_desc;
        $scope.datos.mascota_peso = $datos_mascota1.peso;
        $scope.datos.reg_peso_des = $datos_mascota1.peso_desc;
        var indices10 = [], indices11 = [];
        if ($datos_mascota1.edad != undefined) {
          for (var i2 = 0; i2 < $datos_mascota1.edad.length; i2++) {
            if ($datos_mascota1.edad[i2].toLowerCase() == " ") {
              indices10.push(i2);
            }
          }

        }
        $scope.datos.mascota_edad = $datos_mascota1.edad.substring(0, indices10[0]);

        var indices = [], indices2 = [];

        if ($datos_mascota1.edad_desc != undefined) {


          for (var i2 = 0; i2 < $datos_mascota1.edad_desc.length; i2++) {
            if ($datos_mascota1.edad_desc[i2].toLowerCase() == "o") {
              indices.push(i2);
            }

            if ($datos_mascota1.edad_desc[i2].toLowerCase() == "e") {
              indices2.push(i2);
            }

          }

        } else {
          for (var i2 = 0; i2 < $datos_mascota1.edad.length; i2++) {
            if ($datos_mascota1.edad[i2].toLowerCase() == "o") {
              indices.push(i2);
            }
            if ($datos_mascota1.edad[i2].toLowerCase() == "e") {
              indices2.push(i2);
            }

          }
        }
        if (indices.length > 0) {
          $scope.datos.reg_edad_des = "años";
        }
        if (indices2.length > 0) {
          $scope.datos.reg_edad_des = "meses";
        }
        $scope.datos.reg_sexo = $datos_mascota1.sexo;
        $scope.sexo = $scope.datos.reg_sexo;

        if ($datos_mascota1.peso != undefined) {
          for (var i2 = 0; i2 < $datos_mascota1.peso.length; i2++) {
            if ($datos_mascota1.peso[i2].toLowerCase() == " ") {
              indices11.push(i2);
            }
          }
        }
        $scope.datos.mascota_peso = $datos_mascota1.peso.substring(0, indices11[0]);
        var indices3 = [], indices4 = [];
        $scope.datos.reg_peso_des = $datos_mascota1.peso_desc;
        if ($datos_mascota1.peso_desc != undefined) {
          for (var i3 = 0; i3 < $datos_mascota1.peso_desc.length; i3++) {
            if ($datos_mascota1.peso_desc[i3].toLowerCase() == "o") {
              indices3.push(i3);
            }

            if ($datos_mascota1.peso_desc[i3].toLowerCase() == "a") {
              indices4.push(i3);
            }
          }
        } else {
          for (var i3 = 0; i3 < $datos_mascota1.peso.length; i3++) {
            if ($datos_mascota1.peso[i3].toLowerCase() == "o") {
              indices3.push(i3);
            }

            if ($datos_mascota1.peso[i3].toLowerCase() == "a") {
              indices4.push(i3);
            }

          }
        }
        if (indices3.length > 0) {
          $scope.datos.reg_peso_des = "kilos";
        }
        if (indices4.length > 0) {
          $scope.datos.reg_peso_des = "gramos";
        }
        $scope.datos.imagen_png = $scope.respuesta[0].xmascota_imagen_url;
        $scope.datos.mascota_color = $datos_mascota1.color;
        $scope.datos.mascota_tamanio = $datos_mascota1.tamanio;
        if ($datos_mascota1.reg_vacunas) {
          if ($datos_mascota1.reg_vacunas.length > 0 ) {
            $scope.infogrilla = $datos_mascota1.reg_vacunas;
            $scope.data1 = $scope.infogrilla;
          } else {
            $scope.infogrilla = [];
            $scope.data1 = $scope.infogrilla;
          }
        } else {
          $scope.infogrilla = [];
          $scope.data1 = $scope.infogrilla;
        }
        if ($datos_mascota1.esterilizacion == 'si') {
          $scope.estrilizacion = true;
          $scope.datos.mascota_esterilizacion = $datos_mascota1.esterilizacion;
          $scope.datos.reg_feca = parseInt($datos_mascota1.reg_marca.fecha_aplicacion);
          $scope.datos.mascota_certificado = $datos_mascota1.reg_marca.codigo_esterilizacion;
          $scope.datos.mascota_veterinario = $datos_mascota1.reg_marca.nombre_veterinario_realizacion;
          $scope.datos.mascota_institucion = $datos_mascota1.reg_marca.institucion;
          if($datos_mascota1.reg_marca.nombre_marca === "esterilizacion"){
            $scope.datos.mascota_marca = "ninguna";
          }else{
            $scope.datos.mascota_marca = $datos_mascota1.reg_marca.nombre_marca;
          }
        } else {
          $scope.estrilizacion = false;
          $scope.datos.mascota_esterilizacion = $datos_mascota1.esterilizacion;
          $scope.datos.reg_feca = '';
          $scope.datos.mascota_marca = '';
          $scope.datos.mascota_certificado = '';
          $scope.datos.mascota_veterinario = '';
          $scope.datos.mascota_institucion = '';
        }
        if ($datos_mascota1.desparasitacion == 'si') {
          $scope.desparasitacion = true;
          $scope.datos.mascota_desparasitacion = $datos_mascota1.desparasitacion;
          $scope.datos.mascota_feca_desparasitacion = '';
          $scope.datos.mascota_veterinario_desparasitacion = '';
          $scope.datos.mascota_institucion_desparasitacion = '';
          if ($datos_mascota1.reg_desparasitacion.length > 0) {
            $scope.ArrayDesparast_ = $datos_mascota1.reg_desparasitacion;
            $scope.desparasitacion_si = true;
          } else {
            $scope.ArrayDesparast_ = [];
            $scope.desparasitacion_si = false;
          }
        } else {
          $scope.desparasitacion = false;
          $scope.ArrayDesparast_ = [];
          $scope.desparasitacion_si = false;
          $scope.datos.mascota_desparasitacion = $datos_mascota1.desparasitacion;
          $scope.datos.mascota_feca_desparasitacion = '';
          $scope.datos.mascota_veterinario_desparasitacion = '';
          $scope.datos.mascota_institucion_desparasitacion = '';
        }
        $scope.datos.mascota_modalidad = $datos_mascota1.modalidad;    //MODALIDAD
      }
      //$.unblockUI();
      $.LoadingOverlay("hide");
    });
  }
  //----------------------FIN-------------------------//
 

  $scope.validacionEstEsterilizacion = function(){
    if($scope.datos.mascota_esterilizacion == "si"){
      if(
        $scope.datos.reg_feca.toString().trim().length > 0 && $scope.datos.reg_feca.toString() != undefined && $scope.datos.reg_feca.toString() != '' && $scope.datos.reg_feca.toString() != "" &&
        $scope.datos.mascota_marca.toString().trim().length > 0 && $scope.datos.mascota_marca.toString() != undefined && $scope.datos.mascota_marca.toString() != '' && $scope.datos.mascota_marca.toString() != "" &&
        $scope.datos.mascota_certificado.toString().trim().length > 0 && $scope.datos.mascota_certificado.toString() != undefined && $scope.datos.mascota_certificado.toString() != '' && $scope.datos.mascota_certificado.toString() != "" &&
        $scope.datos.mascota_institucion.toString().trim().length > 0 && $scope.datos.mascota_institucion.toString() != undefined && $scope.datos.mascota_institucion.toString() != '' && $scope.datos.mascota_institucion.toString() != "" ){
          return true;
        }else{
        alert("Debe rellenar todos los campos de los datos de la Esterilización")
        return false;
      }

    }else if($scope.datos.mascota_esterilizacion == "no"){
      return true;
    }
  }

  $scope.validacionEstDesparasitacion = function(){
    if($scope.datos.mascota_desparasitacion == "si"){
      if($scope.ArrayDesparast_.length > 0){
        return true;
      }else{
        alert("Debe insertar por lo menos un registro de Desparasitación")
        return false;
      }
    }else if($scope.datos.mascota_desparasitacion == "no"){
      return true;
    }
  }

}