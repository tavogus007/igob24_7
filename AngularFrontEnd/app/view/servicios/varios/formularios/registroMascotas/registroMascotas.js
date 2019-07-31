function registroMascotasController($scope, $q, $timeout, CONFIG, $window, $rootScope, sessionService, ngTableParams, $filter, $route, sweet, $http, FileUploader, $sce, fileUpload, filterFilter, $routeParams, $location, Data, $q, obtFechaActual) {
 
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  $scope.fechayhora = fecha + ' ' + hora;
  $scope.swimagen = '';
  var id_mas_luz = 0;
  var tit_nombre='';
  var tit_correo = '';
  var tit_numero='';
  
  $scope.recuperandoDatosInicialesCiudadano = function () {
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
      console.log('tit_correo',tit_correo);
      tit_nombre = resultadoApi[0].dtspsl_nombres + ' ' + resultadoApi[0].dtspsl_paterno + ' ' + resultadoApi[0].dtspsl_materno;
      console.log('tit_correo',tit_nombre);
      tit_numero = resultadoApi[0].dtspsl_movil;
      console.log('tit_correo',tit_numero);

      //fechactual = fecha.getFullYear() + "/" + fecha.getMonth() + "/" + fecha.getDate();
      if (sTipoPersona == 'NATURAL') {
        $scope.validacionDatosNatural(datos);
        if ((datos.dtspsl_nombres == '' || datos.dtspsl_materno == '' || datos.dtspsl_expedido == '' || datos.dtspsl_zona_desc == '' || datos.dtspsl_numero_casa == '' || datos.dtspsl_tipo_via == '' || datos.dtspsl_nombre_via == '' || datos.dtspsl_correo == '' || datos.dtspsl_file_fotocopia_ci == '') || (datos.dtspsl_nombres == ' ' || datos.dtspsl_materno == ' ' || datos.dtspsl_expedido == ' ' || datos.dtspsl_zona_desc == ' ' || datos.dtspsl_numero_casa == ' ' || datos.dtspsl_correo == ' ' || datos.dtspsl_file_fotocopia_ci == ' ')) {
          setTimeout(function () {
            swal({
              title: 'Editar su Información',
              text: 'Estimado ciudadano debe completar los siguientes datos de su cuenta: ' + $scope.datosfalt + ', para poder realizar el trámite',
              type: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'OK',
              closeOnConfirm: true
            }, function () {
              window.location.href = "#servicios|varios|index.html?url='app/view/registro_ciudadano/modificarRegistro/index.html'";
              //$.unblockUI();
            });
          }, 300);
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
    if (datos.dtspsl_fec_nacimiento == '') {
      datosfaltantes.push(' FECHA DE NACIMIENTO');
    }
    if (datos.dtspsl_expedido == '' || datos.dtspsl_expedido == ' ') {
      datosfaltantes.push(' EXPEDIDO');
    }
    if (datos.dtspsl_nombres == '' || datos.dtspsl_nombres == ' ') {
      datosfaltantes.push(' NOMBRES');
    }
    if (datos.dtspsl_materno == '' || datos.dtspsl_materno == ' ') {
      datosfaltantes.push(' APELLIDO MATERNO');
    }
    if (datos.dtspsl_movil == '' || datos.dtspsl_movil == ' ') {
      datosfaltantes.push(' CELULAR');
    }
    if ((datos.dtspsl_correo == '') || (datos.dtspsl_correo == ' ')) {
      datosfaltantes.push(' CORREO');
    }
    if (datos.dtspsl_fec_nacimiento == '' || datos.dtspsl_fec_nacimiento == ' ') {
      datosfaltantes.push('FECHA DE NACIMIENTO');
    }
    if (datos.dtspsl_pais == '' || datos.dtspsl_pais == ' ') {
      datosfaltantes.push(' PAIS');
    }
    if (datos.dtspsl_departamento == '' || datos.dtspsl_departamento == ' ') {
      datosfaltantes.push(' DEPARTAMENTO');
    }
    if (datos.dtspsl_provincia == '' || datos.dtspsl_provincia == ' ') {
      datosfaltantes.push(' PROVINCIA');
    }
    if ((datos.dtspsl_macrodistrito == '' || datos.dtspsl_macrodistrito_desc == '')) {
      datosfaltantes.push(' MACRODISTRITO');
    }
    if ((datos.dtspsl_distrito == '' || datos.dtspsl_distrito_desc == '')) {
      datosfaltantes.push(' DISTRITO');
    }
    if ((datos.dtspsl_zona_desc == '' || datos.dtspsl_zona == '')) {
      datosfaltantes.push(' ZONA');
    }
    if (datos.dtspsl_nombre_via == '' || datos.dtspsl_nombre_via == '0') {
      datosfaltantes.push(' NOMBRE DE VIA');
    }
    if (datos.dtspsl_numero_casa == '' || datos.dtspsl_nombre_via == '0') {
      datosfaltantes.push(' NUMERO DE DOMICILIO');
    }
    if (datos.dtspsl_file_fotocopia_ci == '' || datos.dtspsl_file_fotocopia_ci == ' ') {
      datosfaltantes.push(' DOCUMENTO DE IDENTIDAD ANVERSO');
    }
    if (datos.dtspsl_file_fotocopia_ci_r == '' || datos.dtspsl_file_fotocopia_ci_r == ' ') {
      datosfaltantes.push(' DOCUMENTO DE IDENTIDAD REVERSO');
    }
    $scope.datosfalt = datosfaltantes;
  }
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

  $scope.cargandoMascotas = function () {
    $scope.cargandoMascotas = [
      { nombre: "BOOBY", url: "http://imagen.jpg", fecha_registro: "19/03/2019" },
      { nombre: "BOOBY", url: "http://imagen.jpg", fecha_registro: "19/03/2019" },
      { nombre: "BOOBY", url: "http://imagen.jpg", fecha_registro: "19/03/2019" }
    ];
    $scope.tramitesMascota = $scope.cargandoMascotas;
  };

  $scope.listarMascotasXci = function (ci) {
    setTimeout(function () {
      $.blockUI();
    }, 600);
    ci = sessionService.get('CICIUDADANO');
    var datosMascota = new reglasnegocioM();
    datosMascota.identificador = 'SISTEMA_VALLE-CM-2043';
    datosMascota.parametros = '{"xcarnet":' + ci + '}';
    datosMascota.llamarregla(function (results) {
      try {
        if (results.length == 0) {
          alertify.error("No tiene Mascotas registradas...");
        } else {
          $scope.tramitesMascota = JSON.parse(results);
          angular.forEach($scope.tramitesMascota, function (value, key) {
            value.xmascota_data = JSON.parse(value.xmascota_data);
          });
          $scope.$apply();
          $scope.tablaTramites.reload();
        }
      } catch (e) {
        console.log(e.toString());
      }
      $.unblockUI();
    });
  }


  $scope.tablaTramites = new ngTableParams({
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
    });

  //DATOS PERSONALES DEL CIUDADANNO


  //INSERTAR DATOS MASCOTA
  $scope.serializarInformacion = function (data) {
    $.blockUI();
    $scope.insertarDataMascota(data);
    if ($scope.swimagen == true) {
      $("#formModal").modal("show");
      if ($scope.vacunas.length == 0) {
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
        }, function () {
          swal.close();
          $.blockUI();
          var datosMascota = new reglasnegocioM();
          datosMascota.identificador = 'SISTEMA_VALLE-CM-2053';
          datosMascota.parametros = JSON.stringify($scope.dataMascota);
          datosMascota.llamarregla(function (results) {
            if (results.length == 0) {
              alertify.error("Su mascota no fue registrada, por favor verifique sus datos.");
            } else {
              $("#formModal").modal("show");
              var sci = sessionService.get('CICIUDADANO');
              $scope.listarMascotasXci(sci);
              $scope.tablaTramites.reload();
              $scope.$apply();
              alertify.success('Su Mascota fue registrada exitosamente...');
              $scope.cargarNuevaDataMascota();
            }
            $.unblockUI();
          });
        });
      } else {
        $.blockUI();
        swal('Estimado Ciudadano', 'Ud. registró:' + $scope.vacunas.length + ' Vacuna(s)', 'success');
        var datosMascota = new reglasnegocioM();
        datosMascota.identificador = 'SISTEMA_VALLE-CM-2053';
        datosMascota.parametros = JSON.stringify($scope.dataMascota);
        datosMascota.llamarregla(function (results) {
          if (results.length == 0) {
            alertify.error("Su mascota no fue registrada, por favor verifique sus datos.");
          } else {
            var sci = sessionService.get('CICIUDADANO');
            $scope.listarMascotasXci(sci);
            $scope.tablaTramites.reload();
            $scope.$apply();
            alertify.success('Su Mascota fue registrada exitosamente...');
            $scope.cargarNuevaDataMascota();
          }
          $.unblockUI();
        });
      }
    } else {
      swal('Estimado Ciudadano', 'Todavia no seleccionó una imagen, por favor adjunte la imagen de su mascota.');
    }

  }
  $scope.dataMascota = {};
  $scope.insertarDataMascota = function (data) {

    if ($scope.botonMod == true) {
      $scope.dataMascota.xmascota_id = data.xmascota_id;
      $scope.dataMascota.xmascota_imagen_url = data.mascota_imagen_url;//data.xmascota_imagen_url;
    }
    if ($scope.botonCrea == true) {
      $scope.dataMascota.titular_id = "0";//data.xmascota_titular_id;//2
      $scope.dataMascota.xmascota_imagen_url = $scope.url_imagen;
    }

    if (data.xmascota_raza_id) {
      $scope.dataMascota.xmascota_raza_id = data.xmascota_raza_id;//raza_id
    } else {
      $scope.dataMascota.xmascota_raza_id = data.mascota_raza;//raza_id
    }
    //$scope.dataMascota.titular_correo = tit_correo;
    //$scope.dataMascota.titular_nombre = tit_nombre;
    //$scope.dataMascota.titular_numero = tit_numero;
    $scope.dataMascota.xmascota_usr_id = sessionService.get('CICIUDADANO');//data.xmascota_usr_id;//ci_igob
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
    if ($scope.dataMascota_data.especie_id == 1) {
      $scope.dataMascota_data.especie = 'canino';
    } else {
      $scope.dataMascota_data.especie = 'felino';

    }
    $scope.dataMascota_data.tamanio = data.mascota_tamanio;

    $scope.dataMascota_data.comp_peli = $scope.raza_peligrosa; //RAZA PELIGROSA
    $scope.dataMascota_data.vete_actual = data.mascota_veterinario;
    $scope.dataMascota_data.compromiso = "En mi calidad de titular de la mascota, registrada como potencialmente peligrosa, me hago responsable de ella y me comprometo a cumplir con las normas legales en actual vigencia. En aplicación a la ley 553, Ley Autonómica Municipal 239-316 y su reglamentación.";
    $scope.dataMascota_data.desparacitacion = $scope.desparasitacion1; //DESPARASITACION
    $scope.dataMascota_data.esterilizacion = $scope.esterilizacion; //ESTERILIZACION
    $scope.dataMascota_data.marca = $scope.marca;  //MARCA
    $scope.dataMascota_data.reg_desparacitacion = $scope.reg_desparacitacion;
    //$scope.dataMascota_data.reg_desparacitacion = JSON.stringify($scope.reg_desparacitacion);
    $scope.dataMascota_data.reg_marca = $scope.reg_marca;
    //$scope.dataMascota_data.reg_marca = JSON.stringify($scope.reg_marca);
    $scope.dataMascota_data.reg_vacunas = $scope.data1; ///recupera en la grilla
    $scope.dataMascota_data.vacunas = $scope.vacunas; //VACUNAS
    if ($scope.vacunas.length > 0) {
      $scope.dataMascota_data.vacunas = 'si';
    } else {
      $scope.dataMascota_data.vacunas = 'no';
    }
    $scope.dataMascota.xmascota_data = JSON.stringify($scope.dataMascota_data);
    console.log('$scope.dataMascota.xmascota_data',$scope.dataMascota.xmascota_data);
    //$scope.dataMascotaMod.xmascota_data = JSON.stringify($scope.dataMascotaMod_data);
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
    }
    alertify.success('Mascota seleccionada ' + $scope.tram);
    $scope.mostrar_form_mascotas = true;
    $scope.mostrarInformacionMascota($scope.tramiteSeleccionado);
    //$scope.cargarDataMascota(data_tramite);

  }


  $scope.mostrarInformacionMascota = function (data) {
    $.blockUI();
    console.log('MOSTRAR RECUPERADO', data);
    //$scope.cargarNuevaDataMascota();
    console.log('data', data);
    datosMascota = new reglasnegocioM();
    datosMascota.identificador = 'SISTEMA_VALLE-CM-2031';
    datosMascota.parametros = '{"id_mascota":"' + data + '"}';
    datosMascota.llamarregla(function (results) {
      $scope.$apply();
      $scope.respuesta = JSON.parse(results);
      $datos_mascota = $scope.respuesta[0].xmascota_data;
      $datos_mascota1 = JSON.parse($datos_mascota);
      console.log("dataXX", $datos_mascota1);
      console.log("dataXX", $scope.respuesta[0].xmascota_imagen_url);
      alertify.success('Datos de la Mascota fue Recuperada');
      if ($scope.botonMod == true) {

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
        //console.log("xxraza",$scope.respuesta[0].xmascota_raza_id);
        $scope.xmascota_usr_id = $scope.respuesta[0].xmascota_usr_id;
        $scope.xmascota_titular_id = $scope.respuesta[0].xmascota_titular_id;
        $scope.xmascota_titular_ci = $scope.respuesta[0].xmascota_titular_ci;
        $scope.xcodigo_chip = $scope.respuesta[0].xcodigo_chip;
        $scope.xmascota_id = $scope.respuesta[0].xmascota_id;
        $scope.comp_peli = $datos_mascota1.comp_peli;
        $scope.compromiso = $datos_mascota1.compromiso;
        $scope.xmascota_imagen_url = $scope.respuesta[0].xmascota_imagen_url;
        $scope.datos.xmascota_especie = $datos_mascota1.especie;
        $scope.datos.xmascota_raza = $datos_mascota1.raza;
        //console.log("xxraza",$datos_mascota1.raza);
        $scope.raza = $datos_mascota1.raza;


        var indices10 = [], indices11 = [];
        if ($datos_mascota1.edad != undefined) {
          for (var i2 = 0; i2 < $datos_mascota1.edad.length; i2++) {
            if ($datos_mascota1.edad[i2].toLowerCase() == " ") {
              indices10.push(i2);
            }
          }

        }

        console.log("xxEDAD", $datos_mascota1.edad.substring(indices10[0] + 1, $datos_mascota1.edad.length));

        $scope.datos.mascota_edad = $datos_mascota1.edad.substring(0, indices10[0]);

        var indices = [], indices2 = [];

        //console.log("xxedad",$datos_mascota1.edad.length);
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
        //console.log("xxNumre",indices.length,indices2.length);

        if (indices.length > 0) {
          $scope.datos.reg_edad_des = "Años";
        }
        if (indices2.length > 0) {
          $scope.datos.reg_edad_des = "Meses";
        }

        //console.log("xxxx",$datos_mascota1);

        $scope.datos.reg_sexo = $datos_mascota1.sexo;
        //console.log("xxSXO",$datos_mascota1.sexo);
        $scope.sexo = $scope.datos.reg_sexo;




        if ($datos_mascota1.peso != undefined) {
          for (var i2 = 0; i2 < $datos_mascota1.peso.length; i2++) {
            if ($datos_mascota1.peso[i2].toLowerCase() == " ") {
              indices11.push(i2);
            }
          }

        }

        $scope.datos.mascota_peso = $datos_mascota1.peso.substring(0, indices11[0]);

        //console.log("xxPESO",$datos_mascota1.peso);
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
        console.log("xxNumre", indices3.length, indices4.length);
        if (indices3.length > 0) {
          $scope.datos.reg_peso_des = "Kilos";
        }
        if (indices4.length > 0) {
          $scope.datos.reg_peso_des = "Gramos";
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
          }
        } else {
          //alert('MODIFICACION SIN VACUNAS');
          $scope.infogrilla = [];
          $scope.data1 = $scope.infogrilla;
        }

        $scope.datos.mascota_esterilizacion = $scope.esterilizacion;
        $scope.datos.mascota_desparasitacion = $scope.desparasitacion1;


        if ($datos_mascota1.esterilizacion == 'si') {
          //alert('ESTERILIZACION SI');
          $scope.datos.mascota_esterilizacion = $datos_mascota1.esterilizacion;
          $scope.datos.reg_feca = $datos_mascota1.reg_marca.fecha_aplicacion;
          $scope.datos.mascota_marca = $datos_mascota1.reg_marca.nombre_marca;
          $scope.datos.mascota_certificado = $datos_mascota1.reg_marca.codigo_esterilizacion;
          $scope.datos.mascota_veterinario = $datos_mascota1.reg_marca.nombre_veterinario_realizacion;
          $scope.datos.mascota_institucion = $datos_mascota1.reg_marca.institucion;

        } else {
          //alert('ESTERILIZACION NO');
          $scope.datos.mascota_esterilizacion = -1;
          $scope.datos.reg_feca = '';
          $scope.datos.mascota_marca = '';
          $scope.datos.mascota_certificado = '';
          $scope.datos.mascota_veterinario = '';
          $scope.datos.mascota_institucion = '';
        }
        if ($datos_mascota1.desparacitacion == 'si') {
          //alert('desparacitacion SI');
          $scope.datos.mascota_desparasitacion = $datos_mascota1.desparacitacion;
          $scope.datos.mascota_feca_desparasitacion = $datos_mascota1.reg_desparacitacion.fecha_aplicacion;
          $scope.datos.mascota_veterinario_desparasitacion = $datos_mascota1.reg_desparacitacion.nombre_veterinario_realizacion;
          $scope.datos.mascota_institucion_desparasitacion = $datos_mascota1.reg_desparacitacion.institucion;

        } else {
          //alert('DESPARASITACION NO');
          $scope.datos.mascota_desparasitacion = -1;
          $scope.datos.mascota_feca_desparasitacion = '';
          $scope.datos.mascota_veterinario_desparasitacion = '';
          $scope.datos.mascota_institucion_desparasitacion = '';
        }
      }
      $.unblockUI();
    });
  }
  $scope.dataMascotaMod = {};
  $scope.ModDataMascota = function (data) {

    //console.log('MODIFICAR MASCOTA',data);
    if ($scope.botonMod == true) {
      $scope.dataMascotaMod.xmascota_id = $scope.xmascota_id;
      if ($scope.url_imagen) {
        $scope.dataMascotaMod.xmascota_imagen_url = $scope.url_imagen;//data.xmascota_imagen_url;
      } else {
        $scope.dataMascotaMod.xmascota_imagen_url = $scope.xmascota_imagen_url;//data.xmascota_imagen_url;
      }
    }
    if (data.xmascota_raza_id) {
      $scope.dataMascotaMod.xmascota_raza_id = data.xmascota_raza_id;//raza_id
    } else {
      $scope.dataMascotaMod.xmascota_raza_id = data.mascota_raza;//raza_id
    }
    $scope.dataMascotaMod.xmascota_raza = $scope.raza;
    $scope.dataMascotaMod.xmascota_usr_id = sessionService.get('CICIUDADANO');//data.xmascota_usr_id;//ci_igob
    $scope.dataMascotaMod.cod_chip = "FOTO";//url de la foto
    $scope.dataMascotaMod.xmascota_titular_ci = sessionService.get('CICIUDADANO');//data.xmascota_titular_ci;//ci_igob

    $scope.dataMascotaMod.xmascota_data = "{}";
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
    $scope.dataMascotaMod_data.desparacitacion = $scope.desparasitacion1; //DESPARASITACION
    $scope.dataMascotaMod_data.esterilizacion = $scope.esterilizacion; //ESTERILIZACION

    $scope.dataMascotaMod_data.marca = $scope.marca;  //MARCA
    $scope.dataMascotaMod_data.reg_desparacitacion = $scope.reg_desparacitacion;
    //$scope.dataMascotaMod_data.reg_desparacitacion = JSON.stringify($scope.reg_desparacitacion);
    $scope.dataMascotaMod_data.reg_marca = $scope.reg_marca;
    //$scope.dataMascotaMod_data.reg_marca = JSON.stringify($scope.reg_marca);
    $scope.dataMascotaMod_data.reg_vacunas = $scope.data1; ///recupera en la grilla
    $scope.dataMascotaMod_data.vacunas = $scope.vacunas; //VACUNAS
    if ($scope.data1) {
      if ($scope.data1.length > 0) {
        //alert('1111');
        $scope.dataMascotaMod_data.vacunas = 'si';
      }
    } else {
      //alert(2222);
      $scope.dataMascotaMod_data.vacunas = 'no';
    }
    //console.log('$scope.dataMascotaMod_data.vacunas',$scope.dataMascotaMod_data.vacunas);
    $scope.dataMascotaMod.xmascota_data = JSON.stringify($scope.dataMascotaMod_data);
    $scope.nombre_mas = data.mascota_nombre;
    $scope.especie = $scope.dataMascotaMod_data.especie;
    $scope.edad_desc = $scope.dataMascotaMod_data.edad_desc;
    $scope.edad = data.mascota_edad;
  }

  // serializar informacion
  //modificar Informacion
  $scope.modificarInformacionMascota = function (data) {
    $.blockUI();
    $scope.ModDataMascota(data);
    datosMascotaMod = new reglasnegocioM();
    datosMascotaMod.identificador = 'SISTEMA_VALLE-CM-2037';
    datosMascotaMod.parametros = JSON.stringify($scope.dataMascotaMod);
    datosMascotaMod.llamarregla(function (results) {
      var resp = JSON.parse(results);
      var sci = sessionService.get('CICIUDADANO');
      $scope.listarMascotasXci(sci);
      $scope.tablaTramites.reload();
      $scope.$apply();
      alertify.success('Datos de la Mascota fue Modificada');
      $.unblockUI();

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
  }

  $scope.muestra_desparasitacion = function (opcion) {
    if (opcion == 'no') {
      $scope.desparasitacion = false;
      $scope.desparasitacion1 = 'no';
    }
    if (opcion == 'si') {
      $scope.desparasitacion = true;
      $scope.desparasitacion1 = 'si';
    }
  }

  $scope.cargarNuevaDataMascota = function () {
    $scope.botonMod = false;
    $scope.botonCrea = true;

    $scope.mostrar_form_mascotas = true;
    $scope.datos.mascota_nombre = "";
    $scope.datos.mascota_raza = "";
    $scope.datos.mascota_edad = "";
    $scope.datos.mascota_especie = "";
    $scope.datos.mascota_especie_id = "";

    $scope.datos.reg_sexo = -1;
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
    $scope.datos.href_ANTT_CON_ARR = "";
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
  //listarRaza


  ///maga
  $scope.validarEmail = function (email_ca) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email_ca);
  }



  //CONTACTOS
  $scope.registrarContacto = function (data) {
    console.log('registrar contacto', data);
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
      console.log('results', results);
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
  $scope.vaciarContactos = function() {

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
      console.log('$scope.verC', $scope.verC);
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
        console.log('$scope.contactos_valores', $scope.contactos_valores);
        $scope.cp = JSON.parse($scope.contactos_valores[0].xcontactos_data);
        console.log('$scope.cp', $scope.cp);
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
    //console.log('$$$$$$$$$entrandoooooo a modal',dato);
    id_mas_luz = dato;

  }

  $scope.eliminarMascota = function (dato, eut, fal) {
    $scope.datos.eutanasia = '';
    $scope.datos.fallecido = '';
    //console.log('>>>elminar Dato:',id_mas_luz);
    //console.log('>>>elminar eut:',eut);
    //console.log('>>>elminar fal:',fal);
    var luzz = 'A';

    if (eut == undefined && fal == undefined) {
      swal('Error', 'Debe elegir una opción', 'error');
    } if (eut == 'eutanasia' && fal == undefined) {
      luzz = 'eutanasia';
    } if (eut == undefined && fal == 'fallecido') {
      luzz = 'fallecido';
    };
    ///console.log(luzz);
    var usr_id = sessionService.get('CICIUDADANO');
    var eliMascota = new reglasnegocioM();
    eliMascota.identificador = 'SISTEMA_VALLE-CM-2052';
    eliMascota.parametros = '{"xmascota_id":' + id_mas_luz + ',"xmascota_tipo":"' + luzz + '","xmascota_usr_id":' + usr_id + '}';
    //console.log('eliMascota.parametros',eliMascota.parametros);
    eliMascota.llamarregla(function (results) {
      results1 = JSON.parse(results);
      //console.log(results1);
      if (results.length > 0) {
        $scope.eliMascota = results1;
        $scope.tablaTramites.reload();
        $scope.$apply();
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
    $scope.datos.tipo_vacuna = '-1';
    $scope.datos.nro_dosis = '';
    $scope.datos.fecha_vacuna = '';
    $scope.datos.nomb_vete = '';
    $scope.datos.inst_vete = '';
  }
  ////ALMACENA VACUNAS EN LA GRILLA ///////

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
  $scope.img = [];
  $scope.mostrarimgjuridico = function (imagen) {
    $.blockUI();
    var estado = false;
    var url = "";
    $scope.extension = "";
    for (var i = 0; i < $scope.img.length; i++) {
      if ($scope.img[i].nombre == imagen) {
        estado = true;
        url = $scope.img[i].url;
        $scope.extension = $scope.img[i].campo;
      }
    }

    if (estado) {
      var extPod = $scope.extension.split(".")[1];
      try {
        $scope.archivoPOD = url;
        if (extPod == 'pdf' || extPod == 'docx' || extPod == 'docxlm' || extPod == 'zip' || extPod == 'jpeg' || extPod == 'jpg' || extPod == 'png' || extPod == 'gif') {
          window.open($scope.archivoPOD, "_blank");
        }/*else if(){
                $("#fotpod").modal("show");             
            }*/
        $.unblockUI();

      } catch (e) {
        console.log("error", e);
        $.unblockUI();
      }


    } else {
      swal('Error', 'Todavia no selecciono un documento desde  su equipo', 'error');
    }

    $.unblockUI();
  }

  ///////////IMAGEN 
  $scope.img = [];
  $scope.mostrarimg = function (imagen1) {
    var estado = false;
    var url = "";
    $scope.extension = "";
    for (var i = 0; i < $scope.img.length; i++) {
      if ($scope.img[i].nombre == imagen1) {
        estado = true;
        url = $scope.img[i].url;
        $scope.extension = $scope.img[i].campo;
      }
    }

    if (estado) {
      var extPod = $scope.extension.split(".")[1];
      try {
        $scope.archivoPOD = url;
        if (extPod == 'pdf' || extPod == 'docx' || extPod == 'docxlm' || extPod == 'zip' || extPod == 'jpeg' || extPod == 'jpg' || extPod == 'png' || extPod == 'gif') {
          window.open($scope.archivoPOD, "_blank");
        }/*else if(){
              $("#fotpod").modal("show");             
          }*/
        $.unblockUI();

      } catch (e) {
        console.log("error", e);
        $.unblockUI();
      }


    } else {
      swal('Error', 'Todavia no selecciono un documento desde  su equipo', 'error');
    }

  }
  /////PROMESAS...
  $scope.enviarImagenPromesas = function () {
    var validarpromesas = [$scope.enviarImagen()];
    $q.all(validarpromesas).then(function (resp) {
    });
  }

  $scope.enviarImagen = function () {
    $scope[name] = 'Running';
    var deferred = $q.defer();
    $.blockUI();
    var img64 = $scope.bas64Mascota;
    var imagen = img64.split(",");
    var imagen64 = imagen[1];
    var ci_adjunto = sessionService.get('CICIUDADANO');
    var nombre_mascota = $scope.datos.mascota_nombre + $scope.fechayhora;
    var form = new FormData();
    form.append("imagen", imagen64);
    form.append("ci", ci_adjunto);
    form.append("nombre", nombre_mascota);

    var settings = {
      "async": true,
      "crossDomain": true,
      // "url": "http://137.117.66.239/mascotas/crearImagenBase64.php",
      "url": CONFIG.URL_FILES + '/dreamfactory/crearImagenBase64.php',
      "method": "POST",
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    }

    $.ajax(settings).done(function (response) {
      $scope.url_imagen = CONFIG.URL_FILES + response;
      if ($scope.url_imagen) {
        $scope.swimagen = true;
      }
      else {
        $scope.swimagen = false;
      }

    });
    $.unblockUI();
    return deferred.promise;
  }
  $scope.enviarImagen = function () {
    $.blockUI();
    var img64 = $scope.bas64Mascota;
    var imagen = img64.split(",");
    var imagen64 = imagen[1];
    var ci_adjunto = sessionService.get('CICIUDADANO');
    var nombre_mascota = $scope.datos.mascota_nombre + $scope.fechayhora;
    var form = new FormData();
    form.append("imagen", imagen64);
    form.append("ci", ci_adjunto);
    form.append("nombre", nombre_mascota);

    var settings = {
      "async": true,
      "crossDomain": true,
      // "url": "http://137.117.66.239/mascotas/crearImagenBase64.php",
      "url": CONFIG.URL_FILES + '/dreamfactory/crearImagenBase64.php',
      "method": "POST",
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    }

    $.ajax(settings).done(function (response) {
      $scope.url_imagen = CONFIG.URL_FILES + response;
      if ($scope.url_imagen) {
        $scope.swimagen = true;
      }
      else {
        $scope.swimagen = false;
      }

    });
    $.unblockUI();
    //return deferred.promise;
  }
  $scope.addImage = function (e, idFoto) {
    setTimeout(function () {
      $.blockUI();
    }, 500);
    setTimeout(function () {
      $scope.idFoto = idFoto;
      var file = e.target.files[0],
        imageType = /image.*/;
      if (!file.type.match(imageType))
        return;
      var reader = new FileReader();
      reader.onload = fileOnload;
      reader.readAsDataURL(file);
      $.unblockUI();
    }, 1000);
  };

  function fileOnload(e) {
    var result = e.target.result;
    $('#ANTT_CON_ARR').attr("src", result);
    $scope.bas64Mascota = result;
    $scope.enviarImagenPromesas();

  }

  $scope.ejecutarFile = function (idfile) {
    setTimeout(function () {
      $.blockUI();
    }, 2000);
    var sid = document.getElementById(idfile);
    if (sid) {
      document.getElementById(idfile).click();
    } else {
      alert("Error ");
    }
    $.unblockUI();
  };

  $scope.cambiarFile = function (obj, valor) {
    var str = "Hello World!";
    var cadena = btoa(obj.files[0]);
    //var cadena = Base64.encode(obj.files[0]);
  };
  $scope.actualiza = function (nombre) {
    document.getElementById('m1').value = 'http://localhost:8080/evidencia/' + nombre;
  }

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
  $scope.inicioServicios = function () {
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
  };


}