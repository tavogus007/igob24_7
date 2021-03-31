function solicitudViajesController($scope, $timeout, CONFIG, $window, $rootScope, sessionService, ngTableParams, $filter, $route, sweet, $http, FileUploader, $sce, fileUpload, filterFilter, $routeParams, $location, Data, $q) {
  $scope.$on('api:ready', function () {
    $scope.llamar_data_ciudadano();
    $scope.tramitesCiudadano();
    $scope.MacroZona();
  });
  $scope.inicioServicios = function () {
    $scope.llamar_data_ciudadano();
    $scope.tramitesCiudadano();
    $scope.MacroZona();
    $.blockUI();
  };
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
  $scope.gard_tra = "NO";
  $scope.grid_n = [];
  $scope.grid_a = [];
  $scope.mod = {};
  $scope.mod_adultos = {};
  $scope.gri_but_modal_g = true;
  $scope.gri_but_modal_e = false;
  $scope.tablaTramites = {};
  $scope.tramitesUsuario = [];
  $scope.datos = {};
  $scope.mostra_form_viajes = false;
  $scope.modelFecha0 = {
    endDate: new Date()
  };
  $scope.startDateOpen = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startDateOpened = true;
  };
  $scope.startDateOpen1 = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startDateOpened1 = true;
    $scope.modelFecha = {
      startDate: new Date('09/21/2015'),
      endDate: new Date($scope.datos.TER_FEC_RET)
    };
  };
  $scope.startDateOpen3 = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startDateOpened3 = true;
  };
  $scope.startDateOpen7 = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startDateOpened7 = true;
  };
  $scope.startDateOpen5 = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startDateOpened5 = true;
  };
  $scope.startDateOpen4 = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startDateOpened4 = true;
  };
  $scope.cal_edad_grilla = function (edad) {
    $scope.tt = edad.toString();
    if ($scope.tt.length >= 11) {
      var fec0 = edad;
      var fecnac = new Date(fec0);
      var mes = fecnac.getMonth() + 1;
      var dia = fecnac.getDate()
      if (fecnac.getDate() < 10) {
        dia = "0" + dia;
      }
      if (fecnac.getMonth() < 9) {
        mes = "0" + mes;
      }
      $scope.mod.f01_NNA_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;
    }
    var fecha = new Date();
    var anio_actual = fecha.getFullYear();
    $scope.cal_edad = anio_actual - fecnac.getFullYear();
    if ($scope.cal_edad <= 17) {
      $scope.mod.f01_NNA_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;
    } else {
      $scope.mod.f01_NNA_G_FEC_NAC = "";
      swal("La fecha de nacimiento es incorrecta", 'este registro tiene que ser la de un menor de edad', "warning");
    }
  }
  $scope.cal_edad_grilla_adultos = function (edad) {
    $scope.tt = edad.toString();
    if ($scope.tt.length >= 11) {
      var fec0 = edad;
      var fecnac = new Date(fec0);
      var mes = fecnac.getMonth() + 1;
      var dia = fecnac.getDate()
      if (fecnac.getDate() < 10) {
        dia = "0" + dia;
      }
      if (fecnac.getMonth() < 9) {
        mes = "0" + mes;
      }
      $scope.mod_adultos.f01_ADUL_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;
    }
    var fecha = new Date();
    var anio_actual = fecha.getFullYear();
    $scope.cal_edad_mayor = anio_actual - fecnac.getFullYear();
    if ($scope.cal_edad_mayor >= 18) {
      $scope.mod_adultos.f01_ADUL_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;
    } else {
      $scope.mod_adultos.f01_ADUL_G_FEC_NAC = "";
      swal("La fecha de nacimiento es incorrecta", 'este registro tiene que ser de una persona mayor de edad', "warning");
    }
  }
  $scope.fecha_caducada = function (edad) {
    $scope.tt = edad.toString();
    if ($scope.tt.length >= 11) {
      var fec0 = edad;
      var fecnac = new Date(fec0);
      var mes = fecnac.getMonth() + 1;
      var dia = fecnac.getDate()
      if (fecnac.getDate() < 10) {
        dia = "0" + dia;
      }
      if (fecnac.getMonth() < 9) {
        mes = "0" + mes;
      }
      $scope.mod.f01_NNA_F_CADUC_CI = fecnac.getFullYear() + "-" + mes + "-" + dia;
    }
  }
  $scope.fecha_caducada_mayores = function (edad) {
    $scope.tt = edad.toString();
    if ($scope.tt.length >= 11) {
      var fec0 = edad;
      var fecnac = new Date(fec0);
      var mes = fecnac.getMonth() + 1;
      var dia = fecnac.getDate()
      if (fecnac.getDate() < 10) {
        dia = "0" + dia;
      }
      if (fecnac.getMonth() < 9) {
        mes = "0" + mes;
      }
      $scope.mod_adultos.f01_ADUL_F_CADUC_CI = fecnac.getFullYear() + "-" + mes + "-" + dia;
    }
  }
  $scope.calcularfecha_entrada = function (fec) {
    if ($scope.datos.TER_FEC_FIN != undefined) {
      var fecnac = new Date($scope.datos.TER_FEC_FIN);
      var mes = fecnac.getMonth() + 1;
      var dia = fecnac.getDate()
      if (fecnac.getDate() < 10) {
        dia = "0" + dia;
      }
      if (fecnac.getMonth() < 9) {
        mes = "0" + mes;
      }
      var fecha = new Date($scope.datos.TER_FEC_RET);
      var anio_actual = fecha.getFullYear();
      $scope.cal_edad_mayor = anio_actual - fecnac.getFullYear();
      var m = fecha.getMonth() - fecnac.getMonth();
      if (m < 0 || (m === 0 && fecha.getDate() < fecnac.getDate())) {
        $scope.cal_edad_mayor--;
      }
      if ($scope.cal_edad_mayor != 0) {
      } else {
        alertify.success('Fecha incorrecta selecciones la fecha de retorno');
        $scope.datos.TER_FEC_FIN = "";
      }
    }
    var fecha = new Date($scope.datos.TER_FEC_RET);
    var anio_actual = fecha.getFullYear();
    var mes3 = fecha.getMonth() + 1;
    var dia3 = fecha.getDate()
    if (fecha.getDate() < 10) {
      dia3 = "0" + dia3;
    }
    if (fecha.getMonth() < 9) {
      mes3 = "0" + mes3;
    }
    $scope.datos.TER_FEC_RET = anio_actual + "-" + mes3 + "-" + dia3;
  }
  $scope.calcularfecha_salida = function (fec) {
    if ($scope.datos.TER_FEC_RET == undefined) {
      alertify.success('Seleccione la fecha de salida primero');
      $scope.datos.TER_FEC_FIN = "";
    }
    var fecnac = new Date($scope.datos.TER_FEC_FIN);
    var anio_actual = fecnac.getFullYear();
    var mes = fecnac.getMonth() + 1;
    var dia = fecnac.getDate()
    if (fecnac.getDate() < 10) {
      dia = "0" + dia;
    }
    if (fecnac.getMonth() < 9) {
      mes = "0" + mes;
    }
    $scope.datos.TER_FEC_FIN = anio_actual + "-" + mes + "-" + dia;
  }
  $scope.cal_fechas_ini = function (edad) {
    $scope.tt = edad.toString();
    if ($scope.tt.length >= 11) {
      var fec0 = edad;
      var fecnac = new Date(fec0);
      var mes = fecnac.getMonth() + 1;
      var dia = fecnac.getDate()
      if (fecnac.getDate() < 10) {
        dia = "0" + dia;
      }
      if (fecnac.getMonth() < 9) {
        mes = "0" + mes;
      }
      $scope.datos.TER_FEC_RET = fecnac.getFullYear() + "-" + mes + "-" + dia;
    }
  }
  $scope.cal_fechas_fin = function (edad) {
    $scope.tt = edad.toString();
    if ($scope.tt.length >= 11) {
      var fec0 = edad;
      var fecnac = new Date(fec0);
      var mes = fecnac.getMonth() + 1;
      var dia = fecnac.getDate()
      if (fecnac.getDate() < 10) {
        dia = "0" + dia;
      }
      if (fecnac.getMonth() < 9) {
        mes = "0" + mes;
      }
      $scope.datos.TER_FEC_FIN = fecnac.getFullYear() + "-" + mes + "-" + dia;
    }
  }
  ////////////////////////// Traductor de Idioma /////////////////////////////////////
  if (sessionStorage.getItem("Idioma") != null) {
    var idioma = sessionStorage.getItem("Idioma");
  } else {
    sessionStorage.setItem("Idioma", "C");
    idioma = sessionStorage.getItem("Idioma", "C");
  }
  var verTitulos = new idiomaPlat();
  verTitulos.idioma = sessionStorage.getItem("Idioma");
  var elArray = new Array();
  $scope.translateIdioma = {};
  verTitulos.obtenerTitulos(function (resultado) {
    a = JSON.parse(resultado);
    $.each(a.success, function (key, value) {
      $scope.translateIdioma[value.idm_label] = value.idm_contenido;
    });
  });
  ////////////////////////// Traductor de Idioma /////////////////////////////////////
  $scope.llamar_data_ciudadano = function () {
    var fecha = new Date();
    var g_fecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
    $scope.datos.DEF_INSTANCIAS = "UDIF_T";
    $scope.datos.G_CI = sessionService.get('CICIUDADANO');
    $scope.datos.G_NNA_MAT = sessionService.get('US_MATERNO');
    $scope.datos.G_NNA_NOM = sessionService.get('US_NOMBRE');
    $scope.datos.G_NNA_PAT = sessionService.get('US_MATERNO');
    $scope.datos.TER_TIP_CASO = 6;
    $scope.datos.g_fecha = g_fecha;
  }
  $scope.crear_tramite = function (datos) {
    var fecha = new Date();
    var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    var sIdServicio = datos;
    var sIdCiudadano = sessionService.get('IDSOLICITANTE');
    var sFechaTramite = fechactual;
    var idusu = 3;
    var aServicio = new reglasnegocio();
    aServicio.identificador = "RCCIUDADANO_68";
    aServicio.parametros = '{"frm_tra_dvser_id":7,"frm_tra_id_ciudadano":"' + sIdCiudadano + '","frm_tra_fecha":"' + sFechaTramite + '","frm_tra_enviado":"NO","frm_tra_id_usuario":"' + idusu + '"}';
    aServicio.llamarregla(function (data) {
      $scope.tramitesCiudadano();
      alertify.success('Tramite Creado');
    });
  }
  $scope.tramitesCiudadano = function () {
    sIdCiudadano = sessionService.get('IDSOLICITANTE');
    var sparam = new reglasnegocio();
    sparam.identificador = "RCCIUDADANO_79";
    sparam.parametros = '{"sidciudadano":"' + sIdCiudadano + '"}';
    sparam.llamarregla(function (results) {
      results = JSON.parse(results);
      $.unblockUI();
      $scope.tramites = results;

      angular.forEach(results, function (val, index) {
        if (val['form_contenido']) {
          results[index].datos = val['form_contenido'];
        }
      });
      $scope.tramitesUsuario = results;
      $scope.tablaTramites.reload();
    });
  };
  $scope.tablaTramites = new ngTableParams({
    page: 1,
    count: 4,
    filter: {},
    sorting: { vtra_id: 'desc' }
  }, {
    total: $scope.tramitesUsuario.length,
    getData: function ($defer, params) {
      var filteredData = params.filter() ?
        $filter('filter')($scope.tramitesUsuario, params.filter()) :
        $scope.tramitesUsuario;
      var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.tramitesUsuario;
      params.total($scope.tramitesUsuario.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });
  $scope.seleccionarTramite = function (data_tramite) {
    if (data_tramite.vcodigo == null) {
      $scope.tram = "";
    } else {
      $scope.tram = data_tramite.vcodigo;
    }
    alertify.success('Tramite seleccionado ' + $scope.tram);
    $scope.startDateOpened = false;
    $scope.startDateOpened1 = false;
    $scope.envia_btn = data_tramite.venviado;
    $scope.datos.Tipo_tramite_creado = "WEB";
    $scope.grid_n = [];
    $scope.grid_a = [];
    $scope.mostra_form_viajes = true;
    $scope.idServicio = data_tramite.vdvser_id;
    $scope.idTramite = data_tramite.vtra_id;
    if (data_tramite.datos) {
      if (data_tramite.datos.length != undefined) {
        if (data_tramite.datos.length > 100) {
          var remplazo = data_tramite.datos;
          data_tramite.datos = remplazo.replace(/\C:\\fakepath\\/g, "");
          data_tramite.datos = JSON.parse(data_tramite.datos);
        }
      } else {
        if (data_tramite.datos.length > 100) {
          var remplazo = data_tramite.datos;
          data_tramite.datos = remplazo.replace(/\C:\\fakepath\\/g, "");
          data_tramite.datos = JSON.parse(data_tramite.datos);
        }
      }
      if (data_tramite.datos != null) {
        $scope.datos.TER_TIP_PERMISO = data_tramite.datos.TER_TIP_PERMISO;
        $scope.datos.TER_NOM_INST = data_tramite.datos.TER_NOM_INST;
        $scope.datos.TER_INST_DIR = data_tramite.datos.TER_INST_DIR;
        $scope.datos.TER_INST_TELF = data_tramite.datos.TER_INST_TELF;
        $scope.datos.TER_FEC_RET = data_tramite.datos.TER_FEC_RET;
        $scope.datos.TER_FEC_FIN = data_tramite.datos.TER_FEC_FIN;
        $scope.datos.TER_SOLOS = data_tramite.datos.TER_SOLOS;
        $scope.datos.TER_DEST = data_tramite.datos.TER_DEST;
        $scope.getProvinciasDepto(data_tramite.datos.TER_DEST);
        $scope.datos.TER_MOT = data_tramite.datos.TER_MOT;
        $scope.datos.TER_MIN = data_tramite.datos.TER_MIN;
        for (var i = 1; i < data_tramite.datos.TER_NNA_VIAJAN.length; i++) {
          $scope.grid_n.push({
            f01_NNA_TIP_DOC_valor: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_TIP_DOC_valor,
            f01_NNA_DIR: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_DIR,
            f01_NNA_EXP_CIUD_valor: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_EXP_CIUD_valor,
            f01_NNA_F_CADUC_CI: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_F_CADUC_CI,
            f01_NNA_G_AMAT: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_G_AMAT,
            f01_NNA_G_APAT: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_G_APAT,
            f01_NNA_G_CI: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_G_CI,
            f01_NNA_G_CIUD_valor: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_G_CIUD_valor,
            f01_NNA_G_FEC_NAC: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_G_FEC_NAC,
            f01_NNA_G_GEN_valor: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_G_GEN_valor,
            f01_NNA_G_LUG_NAC_valor: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_G_LUG_NAC_valor,
            f01_NNA_G_NOM: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_G_NOM,
            f01_NNA_G_TELF: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_G_TELF,
            f01_NNA_TER_MACRO_valor: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_TER_MACRO_valor,
            f01_NNA_TER_TEL: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_TER_TEL,
            f01_NNA_TER_ZONA: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_TER_ZONA,
            f01_NNA_TER_ZONA_DESC: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_TER_ZONA_DESC,
            oid: data_tramite.datos.TER_NNA_VIAJAN[i].oid,
            dtspsl_file_fotocopia_ci: data_tramite.datos.TER_NNA_VIAJAN[i].dtspsl_file_fotocopia_ci,
            dtspsl_file_fotocopia_ci_r: data_tramite.datos.TER_NNA_VIAJAN[i].dtspsl_file_fotocopia_ci_r,
            f01_NNA_ANVERSO_G_ARCH: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_ANVERSO_G_ARCH,
            f01_NNA_ANVERSO_G_ARCH_AZURE: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_ANVERSO_G_ARCH_AZURE,
            f01_NNA_REVERSO_G_ARCH: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_REVERSO_G_ARCH,
            f01_NNA_REVERSO_G_ARCH_AZURE: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_REVERSO_G_ARCH_AZURE,
            f01_NNA_O_ADJ_G_ARCH_CN: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_O_ADJ_G_ARCH_CN,
            f01_NNA_O_ADJ_G_ARCH_CN_AZURE: data_tramite.datos.TER_NNA_VIAJAN[i].f01_NNA_O_ADJ_G_ARCH_CN_AZURE,
            Url_certificado_nac: data_tramite.datos.TER_NNA_VIAJAN[i].Url_certificado_nac,
            Url_dni_anverso: data_tramite.datos.TER_NNA_VIAJAN[i].Url_dni_anverso,
            Url_dni_reverso: data_tramite.datos.TER_NNA_VIAJAN[i].Url_dni_reverso
          });
        }
        $scope.datos.NNA_CANT_FEM = 0;
        $scope.datos.NNA_CANT_MAS = 0;
        $scope.datos.NNA_CAN_FEM = 0;
        $scope.datos.NNA_CAN_MAS = 0;
        for (var k = 0; k < $scope.grid_n.length; k++) {
          $scope.calculo_edades = $scope.grid_n[k].f01_NNA_G_FEC_NAC;
          $scope.calculo_edades = $scope.calculo_edades.split("-");
          $scope.cal_anios = $scope.calculo_edades[0];
          var fecha = new Date();
          var anio_actual = fecha.getFullYear();
          $scope.cal_edades = anio_actual - $scope.cal_anios;

          if ($scope.grid_n[k].f01_NNA_G_GEN_valor == "F") {
            if ($scope.cal_edades <= 12) {
              $scope.datos.NNA_CANT_FEM = $scope.datos.NNA_CANT_FEM + 1;
            } else {
              $scope.datos.NNA_CAN_FEM = $scope.datos.NNA_CAN_FEM + 1;
            }
          }
          if ($scope.grid_n[k].f01_NNA_G_GEN_valor == "M") {
            if ($scope.cal_edades <= 12) {
              $scope.datos.NNA_CANT_MAS = $scope.datos.NNA_CANT_MAS + 1;
            } else {
              $scope.datos.NNA_CAN_MAS = $scope.datos.NNA_CAN_MAS + 1;
            }
          }
        }
        $scope.datos.NNA_CANT_TOTAL = 0;
        $scope.datos.NNA_CANT_TOTAL = $scope.datos.NNA_CANT_FEM + $scope.datos.NNA_CANT_MAS + $scope.datos.NNA_CAN_FEM + $scope.datos.NNA_CAN_MAS;
        $scope.datos.NNA_CANT_NN = 0;
        $scope.datos.NNA_NRO_ADO = 0;
        $scope.datos.NNA_CANT_NN = $scope.datos.NNA_CANT_FEM + $scope.datos.NNA_CANT_MAS;
        $scope.datos.NNA_NRO_ADO = $scope.datos.NNA_CAN_FEM + $scope.datos.NNA_CAN_MAS;

        for (var j = 1; j < data_tramite.datos.TER_RESP.length; j++) {
          $scope.grid_a.push({
            f01_ADUL_TIP_DOC_valor: data_tramite.datos.TER_RESP[j].f01_ADUL_TIP_DOC_valor,
            f01_ADUL_DIR: data_tramite.datos.TER_RESP[j].f01_ADUL_DIR,
            f01_ADUL_EXP_CIUD_valor: data_tramite.datos.TER_RESP[j].f01_ADUL_EXP_CIUD_valor,
            f01_ADUL_F_CADUC_CI: data_tramite.datos.TER_RESP[j].f01_ADUL_F_CADUC_CI,
            f01_ADUL_G_AMAT: data_tramite.datos.TER_RESP[j].f01_ADUL_G_AMAT,
            f01_ADUL_G_APAT: data_tramite.datos.TER_RESP[j].f01_ADUL_G_APAT,
            f01_ADUL_G_CI: data_tramite.datos.TER_RESP[j].f01_ADUL_G_CI,
            f01_ADUL_TER_CIUD_valor: data_tramite.datos.TER_RESP[j].f01_ADUL_TER_CIUD_valor,
            f01_ADUL_G_FEC_NAC: data_tramite.datos.TER_RESP[j].f01_ADUL_G_FEC_NAC,
            f01_ADUL_G_GEN_valor: data_tramite.datos.TER_RESP[j].f01_ADUL_G_GEN_valor,
            f01_ADUL_LUG_NAC_valor: data_tramite.datos.TER_RESP[j].f01_ADUL_LUG_NAC_valor,
            f01_ADUL_G_NOM: data_tramite.datos.TER_RESP[j].f01_ADUL_G_NOM,
            f01_ADUL_G_TELF: data_tramite.datos.TER_RESP[j].f01_ADUL_G_TELF,
            f01_ADUL_TER_MACRO_valor: data_tramite.datos.TER_RESP[j].f01_ADUL_TER_MACRO_valor,
            f01_ADUL_TER_TEL: data_tramite.datos.TER_RESP[j].f01_ADUL_TER_TEL,
            f01_ADUL_TER_ZONA: data_tramite.datos.TER_RESP[j].f01_ADUL_TER_ZONA,
            f01_ADUL_TER_ZONA_DESC: data_tramite.datos.TER_RESP[j].f01_ADUL_TER_ZONA_DESC,
            oid: data_tramite.datos.TER_RESP[j].oid,
            dtspsl_file_fotocopia_ci: data_tramite.datos.TER_RESP[j].dtspsl_file_fotocopia_ci,
            dtspsl_file_fotocopia_ci_r: data_tramite.datos.TER_RESP[j].dtspsl_file_fotocopia_ci_r,
            f01_ADUL_G_PARE_COND_valor: data_tramite.datos.TER_RESP[j].f01_ADUL_G_PARE_COND_valor,
            f01_ADUL_G_VA_valor: data_tramite.datos.TER_RESP[j].f01_ADUL_G_VA_valor,

            f01_ADUL_REVERSO_G_ARCH: data_tramite.datos.TER_RESP[j].f01_ADUL_REVERSO_G_ARCH,
            f01_ADUL_REVERSO_G_ARCH_AZURE: data_tramite.datos.TER_RESP[j].f01_ADUL_REVERSO_G_ARCH_AZURE,
            f01_ADUL_ANVERSO_G_ARCH: data_tramite.datos.TER_RESP[j].f01_ADUL_ANVERSO_G_ARCH,
            f01_ADUL_ANVERSO_G_ARCH_AZURE: data_tramite.datos.TER_RESP[j].f01_ADUL_ANVERSO_G_ARCH_AZURE,
            Url_dni_anverso: data_tramite.datos.TER_RESP[j].Url_dni_anverso,
            Url_dni_reverso: data_tramite.datos.TER_RESP[j].Url_dni_reverso
          });
        }
      }
    } else {
      $scope.datos = {};
      $scope.grid_n = [];
      $scope.grid_a = [];
    }
  }
  $scope.getProvinciasDepto = function (dep) {
    var departamento = dep.split("-");
    $scope.depto = departamento[0];
    var resCiudadanos = new reglasnegocio();
    resCiudadanos.identificador = "RCCIUDADANO_156";
    resCiudadanos.parametros = '{"prv_dpto_codigo":"' + dep + '"}';
    resCiudadanos.llamarregla(function (data) {
      data = JSON.parse(data);
      setTimeout(function () {
        $scope.obtDatos = data;
        $scope.$apply();
      }, 1000);

    })
  };
  $scope.dit_zonas = function (idMacro) {
    var deferred = $q.defer();
    $scope.exito = "SI";
    try {
      var zonas = new zonaLstM();
      zonas.idMacro = idMacro;
      zonas.obtzonaM(function (results) {
        results = JSON.parse(results);
        $scope.zonas = results.success;

        $q.all($scope.exito).then(function (data) {
          deferred.resolve($scope.exito);
        });
      });
    } catch (e) {
      $scope.exito = "NO";
      $q.all($scope.exito).then(function (data) {
        deferred.resolve($scope.exito);
      });

    }
    return deferred.promise;
  }
  $scope.macrodistritosid = function () {
    var distNombre = $scope.datos.f01_zona_act_descrip;
    if ($scope.aMacroZona) {
      angular.forEach($scope.aMacroZona, function (value, key) {
        if (value.dist_nombre == distNombre) {
          idMacro = value.dist_macro_id;
        }
      });
    }
    $scope.datos.INT_AC_MACRO_ID = idMacro;
    $scope.aMacrodistritos = {};
    var datosP = new macrodistritoLstid();
    datosP.idMacro = idMacro;
    datosP.obtmacrodistrito(function (resultado) {
      data = JSON.parse(resultado);
      if (data.success.length > 0) {
        $scope.datos.f01_macro_act_descrip = data.success[0].mcdstt_macrodistrito;
      } else {
        $scope.msg = "Error !!";
      }
    });
  };
  $scope.MacroZona = function () {
    try {
      var parametros = new ZonaMacro();
      parametros.Zona_Macro(function (resultado) {
        data = JSON.parse(resultado);
        if (data.success.length > 0) {
          $(document).ready(function () {
            $('.js-example-basic-single').select2();
          });
          $scope.aMacroZona = data.success;
        } else {
          $scope.msg = "Error !!";
        }
      });
    } catch (error) {

    }
  };
  $scope.actulizarIdDistrito = function () {
    $scope.desabilitadoV = false;
    var idDistrito = "";
    var idZona = "";
    var distNombre = $scope.datos.f01_zona_act_descrip;
    if ($scope.aMacroZona) {
      angular.forEach($scope.aMacroZona, function (value, key) {
        if (value.dist_nombre == distNombre) {
          idDistrito = value.dist_dstt_id;
          idZona = value.dist_id;
        }
      });
    }

    $scope.datos.f01_dist_act = idDistrito;
    $scope.datos.f01_dist_act_descrip = "DISTRITO " + idDistrito;
    $scope.datos.INT_AC_DISTRITO = idDistrito;
    $scope.datos.INT_AC_ID_ZONA = idZona;
    $scope.datos.f01_zona_act = idZona;
  };
  $scope.comvertir_texto = function (datos) {
    $scope.mod.f01_NNA_TER_ZONA_DESC = datos;
  };
  $scope.guardar_tramite = function (datos) {
    $scope.gard_tra = "OK";
    if (datos.TER_FEC_RET) {
      if (datos.TER_FEC_RET.length > 10) {
        $scope.fecinic = datos.TER_FEC_RET.split("T");
        datos.TER_FEC_RET = $scope.fecinic[0];
      }
    }
    if (datos.TER_FEC_FIN) {
      if (datos.TER_FEC_FIN.length > 10) {
        $scope.fecfinc = datos.TER_FEC_FIN.split("T");
        datos.TER_FEC_FIN = $scope.fecfinc[0];
      }
    }
    $.blockUI();
    var titulosnna = [{
      "tipo": "GRD",
      "titulos": "Tipo Doc|Numero de Doc|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Género|Macro|Dirección|Telf. 1|Cel. 2",
      "campos": "f01_NNA_TIP_DOC_valor|f01_NNA_G_CI|f01_NNA_EXP_CIUD_valor|f01_NNA_G_NOM|f01_NNA_G_APAT|f01_NNA_G_AMAT|f01_NNA_G_FEC_NAC|f01_NNA_G_LUG_NAC_valor|f01_NNA_G_CIUD_valor|f01_NNA_G_GEN_valor|f01_NNA_TER_MACRO_valor|f01_NNA_DIR|f01_NNA_TER_TEL|f01_NNA_G_TELF",
      "impresiones": "true|true|true|true|true|true|true|true|true|true|true|true|true|true"
    }];
    datos.TER_NNA_VIAJAN = titulosnna;
    for (var i = 0; i < $scope.grid_n.length; i++) {
      if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor) {
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "LPZ") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "LA PAZ"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "ORU") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "ORURO"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "PTS") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "POTOSI"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "CBB") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "COCHABAMBA"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "CHQ") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "CHUQUISACA"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "TJA") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "TARIJA"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "BNI") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "BENI"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "PND") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "PANDO"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "SCZ") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "SANTA CRUZ"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "EXT") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "EXTERIOR"; }
      }
      if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor) {
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "1") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 1 COTAHUMA"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "2") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 2 MAXIMILIANO PAREDES"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "3") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 3 PERIFERICA"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "4") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 4 SAN_ANTONIO"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "5") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 5 SUR"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "6") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 6 MALLASA"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "7") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 7 CENTRO"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "8") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 8 HAMPATURI"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "9") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 9 ZONGO"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "10") { $scope.grid_n[i].f01_NNA_TER_MACRO = $scope.grid_n[i].f01_NNA_TER_MACRO_valor }
      }
      datos.TER_NNA_VIAJAN.push($scope.grid_n[i]);
    }
    var titulosrep = [{
      "tipo": "GRD",
      "titulos": "CI|Exp.|Parentesco/ Condición|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telf. 1|Cel. 2|Viaja/ Autoriza",
      "campos": "f01_ADUL_G_CI|f01_ADUL_EXP_CIUD_valor|f01_ADUL_G_PARE_COND_valor|f01_ADUL_G_NOM|f01_ADUL_G_APAT|f01_ADUL_G_AMAT|f01_ADUL_G_FEC_NAC|f01_ADUL_LUG_NAC|f01_ADUL_TER_CIUD|f01_ADUL_DEPA_OTRO|f01_ADUL_G_GEN_valor|f01_ADUL_TER_MACRO_valor|f01_ADUL_TER_ZONA|f01_ADUL_DIR|f01_ADUL_TER_TEL|f01_ADUL_G_TELF|f01_ADUL_G_VA_valor",
      "impresiones": "true|true|true|true|true|true|true|no|true|no|true|no|true|true|no|true|true|"
    }];
    datos.TER_RESP = titulosrep;
    for (var i = 0; i < $scope.grid_a.length; i++) {
      if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor) {
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "LPZ") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "LA PAZ"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "ORU") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "ORURO"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "PTS") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "POTOSI"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "CBB") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "COCHABAMBA"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "CHQ") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "CHUQUISACA"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "TJA") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "TARIJA"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "BNI") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "BENI"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "PND") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "PANDO"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "SCZ") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "SANTA CRUZ"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "EXT") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "EXTERIOR"; }
      }
      if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor) {
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "1") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 1 COTAHUMA"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "2") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 2 MAXIMILIANO PAREDES"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "3") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 3 PERIFERICA"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "4") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 4 SAN_ANTONIO"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "5") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 5 SUR"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "6") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 6 MALLASA"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "7") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 7 CENTRO"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "8") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 8 HAMPATURI"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "9") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 9 ZONGO"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "10") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "OTROS"; }
      }
      datos.TER_RESP.push($scope.grid_a[i]);
    }
    datos.Tipo_tramite_creado = "WEB";
    try {
      var datosSerializados = JSON.stringify(datos);
      var idCiudadano = sessionService.get('IDSOLICITANTE');
      var serializarInfo = new reglasnegocio();
      serializarInfo.identificador = 'RCCIUDADANO_80';
      serializarInfo.parametros = JSON.stringify({ "id_servicio": $scope.idServicio, "data_json": datosSerializados, "oid_ciudadano": idCiudadano, "id_usuario": 1, "id_trm_form": $scope.idTramite });
      serializarInfo.llamarregla(function (results) {
        r = JSON.parse(results);

        if (r.error) {
          $.unblockUI();
          alertify.success('Formulario no almacenado');
          $scope.gard_tra = "NO";
        } else {
          $.unblockUI();
          alertify.success('Formulario almacenado');
          $scope.gard_tra = "OK";
        }
      });
    } catch (e) {

    }
  }
  $scope.enviar_tramite = function (datos) {
    var fecha = new Date();
    var g_fecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
    datos.DEF_INSTANCIAS = "UDIF_T";
    datos.G_CI = sessionService.get('CICIUDADANO');
    datos.G_NNA_MAT = sessionService.get('US_MATERNO');
    datos.G_NNA_NOM = sessionService.get('US_NOMBRE');
    datos.G_NNA_PAT = sessionService.get('US_MATERNO');
    datos.TER_TIP_CASO = 6;
    datos.g_fecha = g_fecha;

    var titulosnna = [{
      "tipo": "GRD",
      "titulos": "Tipo Doc|Numero de Doc|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Género|Macro|Dirección|Telf. 1|Cel. 2",
      "campos": "f01_NNA_TIP_DOC_valor|f01_NNA_G_CI|f01_NNA_EXP_CIUD_valor|f01_NNA_G_NOM|f01_NNA_G_APAT|f01_NNA_G_AMAT|f01_NNA_G_FEC_NAC|f01_NNA_G_LUG_NAC_valor|f01_NNA_G_CIUD_valor|f01_NNA_G_GEN_valor|f01_NNA_TER_MACRO_valor|f01_NNA_DIR|f01_NNA_TER_TEL|f01_NNA_G_TELF",
      "impresiones": "true|true|true|true|true|true|true|true|true|true|true|true|true|true"
    }];
    datos.TER_NNA_VIAJAN = titulosnna;

    for (var i = 0; i < $scope.grid_n.length; i++) {
      datos.TER_NNA_VIAJAN.push($scope.grid_n[i]);
    }
    var titulosrep = [{
      "tipo": "GRD",
      "titulos": "Tipo de Doc|Numero de Doc|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Género|Macro|Dirección|Telf. 1|Cel. 2|Viaja/ Autoriza|Parentesco/ Condición",
      "campos": "f01_ADUL_TIP_DOC_valor|f01_ADUL_G_CI|f01_ADUL_EXP_CIUD_valor|f01_ADUL_G_NOM|f01_ADUL_G_APAT|f01_ADUL_G_AMAT|f01_ADUL_G_FEC_NAC|f01_ADUL_LUG_NAC_valor|f01_ADUL_TER_CIUD_valor|f01_ADUL_G_GEN_valor|f01_ADUL_TER_MACRO_valor|f01_ADUL_DIR|f01_ADUL_TER_TEL|f01_ADUL_G_TELF|f01_ADUL_G_VA_valor|f01_ADUL_G_PARE_COND_valor",
      "impresiones": "true|true|true|true|true|true|true|true|true|true|true|true|true|true|true|true|true"
    }];
    $scope.datos.TER_RESP = titulosrep;
    for (var i = 0; i < $scope.grid_a.length; i++) {
      datos.TER_RESP.push($scope.grid_a[i]);
    }
    if (datos.TER_NNA_VIAJAN.length >= 2 && datos.TER_RESP.length >= 2) {
      datos.Tipo_tramite_creado = "WEB";
      var datosSerializados = JSON.stringify(datos);
      var idProcodigoViajes = 'T-VF';
      var creartramite = new gCrearCaso();
      creartramite.usr_id = 1;
      creartramite.datos = datosSerializados;
      creartramite.procodigo = idProcodigoViajes;
      creartramite.crearSolicitudViaje(function (resultado) {
        $.blockUI();
        resultadoApi = JSON.parse(resultado);

        var results = resultadoApi.success.data;
        indice = 0;
        if (results.length > 0) {
          datosIF = results[0].sp_pmfunction_generica.split(",");
          datosIF2 = datosIF[2];
          datosIF3 = datosIF[3];
          datosIF[0] = datosIF[0].substring(1, datosIF[0].length);
          $scope.nrotramitec = datosIF[0];

          $scope.validarFormProcesos($scope.nrotramitec);
          $scope.envia_btn = "SI";
          $scope.gard_tra = "NO";
        }
        else {
          $scope.msg = "Error al enviar el formulario de permiso de viajes!";
        }
      });
    } else {
      swal('Señor Ciudadano favor de registrar: ', "Datos de los Niños, Adolescentes y Datos de los Adultos que Viajan ");
    }
  }
  $scope.validarFormProcesos = function (datosForm) {
    var idTramite = sessionService.get('IDTRAMITE');
    nroTramiteEnviado = sessionService.get('NROTRAMITE');
    var sparametros = new reglasnegocio();
    sparametros.identificador = "RCCIUDADANO_81";
    sparametros.parametros = '{"idTramite":"' + $scope.idTramite + '","enviado":"SI","codigo":"' + datosForm + '","id_usuario":4}';
    sparametros.llamarregla(function (results) {
      $.unblockUI();
      swal('Señor Ciudadano su Nro de trámite  es : ' + datosForm, " NOTA: Tiene 7 días para aproximarse a la plataforma DNA terminal con su respectiva documentación, caso contrario su registro será dado de baja, NO SE REQUIERE FOTOCOPIAS.");
      $scope.tramitesCiudadano();
    });
  };
  $scope.cal_edad_grilla = function (edad, datosg) {
    $scope.tt = edad.toString();
    if ($scope.tt.length >= 11) {
      var fec0 = edad;
      var fecnac = new Date(fec0);
      var mes = fecnac.getMonth() + 1;
      var dia = fecnac.getDate()
      if (fecnac.getDate() < 10) {
        dia = "0" + dia;
      }
      if (fecnac.getMonth() < 9) {
        mes = "0" + mes;
      }
      $scope.mod.f01_NNA_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;
    } else {
      var fecnac = new Date(edad);
      var mes = fecnac.getMonth() + 1;
      var dia = fecnac.getDate() + 1;
      if (fecnac.getDate() < 10) {
        dia = "0" + dia;
      }
      if (fecnac.getMonth() < 9) {
        mes = "0" + mes;
      }
      $scope.mod.f01_NNA_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;
    }
    var fecha = new Date();
    var anio_actual = fecha.getFullYear();
    $scope.cal_edad = anio_actual - fecnac.getFullYear();
    var m = fecha.getMonth() - fecnac.getMonth();
    if (m < 0 || (m === 0 && fecha.getDate() < fecnac.getDate())) {
      $scope.cal_edad--;
    }

    if ($scope.cal_edad <= 17) {
      $scope.mod.f01_NNA_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;

      $scope.guardarmod(datosg);
    } else {
      $scope.mod.f01_NNA_G_FEC_NAC = "";
      swal("La fecha de nacimiento es incorrecta", 'este registro tiene que ser la de un menor de edad', "warning");
    }
  }
  $scope.cal_edad_grilla_adultos = function (edad, datosg) {
    $scope.tt = edad.toString();
    if ($scope.tt.length >= 11) {
      var fec0 = edad;
      var fecnac = new Date(fec0);
      var mes = fecnac.getMonth() + 1;
      var dia = fecnac.getDate()
      if (fecnac.getDate() < 10) {
        dia = "0" + dia;
      }
      if (fecnac.getMonth() < 9) {
        mes = "0" + mes;
      }
      $scope.mod_adultos.f01_ADUL_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;
    } else {
      var fecnac = new Date(edad);
      var mes = fecnac.getMonth() + 1;
      var dia = fecnac.getDate() + 1;
      if (fecnac.getDate() < 10) {
        dia = "0" + dia;
      }
      if (fecnac.getMonth() < 9) {
        mes = "0" + mes;
      }
      $scope.mod_adultos.f01_ADUL_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;
    }
    var fecha = new Date();
    var anio_actual = fecha.getFullYear();
    $scope.cal_edad_mayor = anio_actual - fecnac.getFullYear();
    var m = fecha.getMonth() - fecnac.getMonth();
    if (m < 0 || (m === 0 && fecha.getDate() < fecnac.getDate())) {
      $scope.cal_edad_mayor--;
    }

    if ($scope.cal_edad_mayor >= 18) {
      $scope.mod_adultos.f01_ADUL_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;
      $scope.guardarmod_adultos(datosg);
    } else {
      $scope.mod_adultos.f01_ADUL_G_FEC_NAC = "";
      swal("La fecha de nacimiento es incorrecta", 'este registro tiene que ser de una persona mayor de edad', "warning");
    }
  }
  $scope.buscarciudadano = function (ciciudadano, tipo) {
    cargando();
    $scope.zonas = [];
    if (tipo == "CN") {
      $scope.muestra_cn_n = true;
      $.LoadingOverlay("hide");
      $scope.url_Cert_nac = CONFIG.APIURL + "/files/SCANNER/" + ciciudadano + "/" + ciciudadano + "_ci_nacimiento.jpg" + "?app_name=todoangular";
    } else {
      $scope.url_Cert_nac = "";
      $scope.mod.f01_NNA_DIR = "";
      $scope.mod.f01_NNA_EXP_CIUD_valor = "";
      $scope.mod.f01_NNA_F_CADUC_CI = "";
      $scope.mod.f01_NNA_G_AMAT = "";
      $scope.mod.f01_NNA_G_APAT = "";
      $scope.mod.f01_NNA_G_CIUD_valor = "";
      $scope.mod.f01_NNA_G_FEC_NAC = "";
      $scope.mod.f01_NNA_G_GEN_valor = "";
      $scope.mod.f01_NNA_G_LUG_NAC_valor = "";
      $scope.mod.f01_NNA_G_NOM = "";
      $scope.mod.f01_NNA_G_TELF = "";
      $scope.mod.f01_NNA_TER_MACRO_valor = "";
      $scope.mod.f01_NNA_TER_TEL = "";
      $scope.mod.oid = "";
      $scope.mod.dtspsl_file_fotocopia_ci = "";
      $scope.mod.dtspsl_file_fotocopia_ci_r = "";
      $scope.url_CI_Anverso = "";
      $scope.url_CI_Reverso = "";
      $scope.url_Pasaporte = "";
      $scope.url_Cer_def_pad = "";
      $scope.url_Cer_nac = "";
      $scope.url_Cer_def_mad = "";
    }
    if (tipo == "DN") {
      $scope.muestra_dn_n = true;
      $.LoadingOverlay("hide");
      $scope.url_Dni_anverso = CONFIG.APIURL + "/files/SCANNER/" + ciciudadano + "/" + ciciudadano + "_dni_anverso.jpg" + "?app_name=todoangular";
      $scope.url_Dni_reverso = CONFIG.APIURL + "/files/SCANNER/" + ciciudadano + "/" + ciciudadano + "_dni_reverso.jpg" + "?app_name=todoangular";
    } else {
      $scope.url_Dni_anverso = "";
      $scope.url_Dni_reverso = "";
      $scope.mod.f01_NNA_DIR = "";
      $scope.mod.f01_NNA_EXP_CIUD_valor = "";
      $scope.mod.f01_NNA_F_CADUC_CI = "";
      $scope.mod.f01_NNA_G_AMAT = "";
      $scope.mod.f01_NNA_G_APAT = "";
      $scope.mod.f01_NNA_G_CIUD_valor = "";
      $scope.mod.f01_NNA_G_FEC_NAC = "";
      $scope.mod.f01_NNA_G_GEN_valor = "";
      $scope.mod.f01_NNA_G_LUG_NAC_valor = "";
      $scope.mod.f01_NNA_G_NOM = "";
      $scope.mod.f01_NNA_G_TELF = "";
      $scope.mod.f01_NNA_TER_MACRO_valor = "";
      $scope.mod.f01_NNA_TER_TEL = "";
      $scope.mod.oid = "";
      $scope.mod.dtspsl_file_fotocopia_ci = "";
      $scope.mod.dtspsl_file_fotocopia_ci_r = "";
      $scope.url_CI_Anverso = "";
      $scope.url_CI_Reverso = "";
      $scope.url_Pasaporte = "";
      $scope.url_Cer_def_pad = "";
      $scope.url_Cer_nac = "";
      $scope.url_Cer_def_mad = "";
    }
    if (tipo == "CI") {
      $scope.muestra_ci_n = true;
      $.blockUI();
      try {
        var buscarRepresentante = new rcNatural();
        buscarRepresentante.tipo_persona = "NATURAL";
        buscarRepresentante.ci = ciciudadano;
        buscarRepresentante.buscarPersona(function (res) {
          var x = JSON.parse(res);
          if (x.error) {
            $.LoadingOverlay("hide");
            $.unblockUI();
            alertify.success(x.error.message);
          } else {
            if (x.length > 0) {
              $.LoadingOverlay("hide");
              alertify.success('Datos Encontrados');
              var fecha = new Date();
              var anio_actual = fecha.getFullYear();
              var str = x[0].dtspsl_fec_nacimiento;
              x[0].dtspsl_fec_nacimiento = str.replace(/\//g, "-");
              var fecnac = new Date(x[0].dtspsl_fec_nacimiento);
              var mes = fecnac.getMonth() + 1;
              var dia = fecnac.getDate() + 1;
              if (fecnac.getDate() < 10) {
                dia = "0" + dia;
              }
              if (fecnac.getMonth() < 9) {
                mes = "0" + mes;
              }
              $scope.mod.f01_NNA_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;
              var fecha = new Date();
              var anio_actual = fecha.getFullYear();
              $scope.cal_edad = anio_actual - fecnac.getFullYear();
              var m = fecha.getMonth() - fecnac.getMonth();
              if (m < 0 || (m === 0 && fecha.getDate() < fecnac.getDate())) {
                $scope.cal_edad--;
              }
              $.unblockUI();
              if ($scope.cal_edad <= 17) {
                if (x[0].dtspsl_fec_vencimiento) {
                  var fecha = new Date();
                  var anio_act = fecha.getFullYear();
                  var mes_act = fecha.getMonth() + 1;
                  var dia_act = fecha.getDate();
                  var str = x[0].dtspsl_fec_vencimiento;
                  x[0].dtspsl_fec_vencimiento = str.replace(/\//g, "-");
                  var fecha2 = new Date(x[0].dtspsl_fec_vencimiento);
                  var anio_act2 = fecha2.getFullYear();
                  var mes_act2 = fecha2.getMonth() + 1;
                  var dia_act2 = fecha2.getDate();
                  if (parseInt(anio_act2) <= parseInt(anio_act)) {
                    if (parseInt(mes_act2) <= parseInt(mes_act)) {
                      if (parseInt(dia_act2) <= parseInt(dia_act)) {
                        alertify.success('Fecha de carnet caducada');
                      }
                    }
                  }
                }
                $scope.busquedaCiudadano = x[0];
                $scope.mod.f01_NNA_DIR = x[0].dtspsl_direccion;
                $scope.mod.f01_NNA_EXP_CIUD_valor = x[0].dtspsl_expedido;
                $scope.mod.f01_NNA_F_CADUC_CI = x[0].dtspsl_fec_vencimiento;
                $scope.mod.f01_NNA_G_AMAT = x[0].dtspsl_materno;
                $scope.mod.f01_NNA_G_APAT = x[0].dtspsl_paterno;
                $scope.mod.f01_NNA_G_CIUD_valor = x[0].dtspsl_departamento;
                $scope.mod.f01_NNA_G_FEC_NAC = x[0].dtspsl_fec_nacimiento;
                $scope.mod.f01_NNA_G_GEN_valor = x[0].dtspsl_sexo;
                $scope.mod.f01_NNA_G_LUG_NAC_valor = x[0].dtspsl_lugar_nacimiento;
                $scope.mod.f01_NNA_G_NOM = x[0].dtspsl_nombres;
                $scope.mod.f01_NNA_G_TELF = x[0].dtspsl_movil;
                $scope.mod.f01_NNA_TER_MACRO_valor = x[0].dtspsl_macrodistrito;
                $scope.mod.f01_NNA_TER_TEL = x[0].dtspsl_telefono;
                $scope.mod.oid = x[0]._id;
                $scope.mod.dtspsl_file_fotocopia_ci = x[0].dtspsl_file_fotocopia_ci;
                $scope.mod.dtspsl_file_fotocopia_ci_r = x[0].dtspsl_file_fotocopia_ci_r;
                if (x[0].dtspsl_file_fotocopia_ci == "") {
                  $scope.url_CI_Anverso = CONFIG.APIURL + "/files/SCANNER/" + ciciudadano + "/" + ciciudadano + "_anverso.jpg" + "?app_name=todoangular";
                } else {
                  $scope.url_CI_Anverso = CONFIG.APIURL + "/files/RC_CLI/" + x[0]._id + "/" + x[0].dtspsl_file_fotocopia_ci + "?app_name=todoangular";
                }
                if (x[0].dtspsl_file_fotocopia_ci_r == "") {
                  $scope.url_CI_Reverso = CONFIG.APIURL + "/files/SCANNER/" + ciciudadano + "/" + ciciudadano + "_reverso.jpg" + "?app_name=todoangular";
                } else {
                  $scope.url_CI_Reverso = CONFIG.APIURL + "/files/RC_CLI/" + x[0]._id + "/" + x[0].dtspsl_file_fotocopia_ci_r + "?app_name=todoangular";
                }
                $scope.url_Pasaporte = CONFIG.APIURL + "/files/SCANNER/" + ciciudadano + "/" + ciciudadano + "_pasaporte.jpg" + "?app_name=todoangular";
                $scope.url_Cer_def_pad = CONFIG.APIURL + "/files/SCANNER/" + ciciudadano + "/" + ciciudadano + "_cdefuncion_padre.jpg" + "?app_name=todoangular";
                $scope.url_Cer_nac = CONFIG.APIURL + "/files/SCANNER/" + ciciudadano + "/" + ciciudadano + "_ci_nacimiento.jpg" + "?app_name=todoangular";
                $scope.url_Cer_def_mad = CONFIG.APIURL + "/files/SCANNER/" + ciciudadano + "/" + ciciudadano + "_cdefuncion_madre.jpg" + "?app_name=todoangular";
                var img1 = x[0].dtspsl_macrodistrito;
                var img2 = x[0].dtspsl_macrodistrito;

                var arregloDatos = $scope.dit_zonas(x[0].dtspsl_macrodistrito);
                arregloDatos.then(function (respuesta) {
                  if ('SI' === respuesta) {
                    var img2 = $scope.dit_zonas(x[0].dtspsl_macrodistrito);
                    img2.then(function (respuesta) {
                      for (var i = 0; i < $scope.zonas.length; i++) {
                        if ($scope.zonas[i].dist_id == x[0].dtspsl_zona) {
                          $scope.des_zon = $scope.zonas[i].dist_nombre.trim();
                        }
                      }
                      $scope.mod.f01_NNA_TER_ZONA = x[0].dtspsl_zona;
                    }, function (reason) {
                      alert('Failed: ' + reason);
                    });
                  }
                }, function (reason) {
                  alert('Failed: ' + reason);
                });
                setTimeout(function () {
                  document.getElementById("f01_NNA_TER_ZONA").value = x[0].dtspsl_zona;
                  $scope.mod.f01_NNA_TER_ZONA = x[0].dtspsl_zona;

                }, 1000);

              } else {
                swal("", 'El ciudadano no corresponde a este listado ya que es mayor de edad', "warning");
                $scope.mod.f01_NNA_DIR = "";
                $scope.mod.f01_NNA_EXP_CIUD_valor = "";
                $scope.mod.f01_NNA_F_CADUC_CI = "";
                $scope.mod.f01_NNA_G_AMAT = "";
                $scope.mod.f01_NNA_G_APAT = "";
                $scope.mod.f01_NNA_G_CIUD_valor = "";
                $scope.mod.f01_NNA_G_FEC_NAC = "";
                $scope.mod.f01_NNA_G_GEN_valor = "";
                $scope.mod.f01_NNA_G_LUG_NAC_valor = "";
                $scope.mod.f01_NNA_G_NOM = "";
                $scope.mod.f01_NNA_G_TELF = "";
                $scope.mod.f01_NNA_TER_MACRO_valor = "";
                $scope.mod.f01_NNA_TER_TEL = "";
                $scope.mod.oid = "";
                $scope.mod.dtspsl_file_fotocopia_ci = "";
                $scope.mod.dtspsl_file_fotocopia_ci_r = "";

                $scope.url_CI_Anverso = "";
                $scope.url_CI_Reverso = "";
                $scope.url_Pasaporte = "";
                $scope.url_Cer_def_pad = "";
                $scope.url_Cer_nac = "";
                $scope.url_Cer_def_mad = "";
              }
            } else {
              $scope.mod.f01_NNA_DIR = "";
              $scope.mod.f01_NNA_EXP_CIUD_valor = "";
              $scope.mod.f01_NNA_F_CADUC_CI = "";
              $scope.mod.f01_NNA_G_AMAT = "";
              $scope.mod.f01_NNA_G_APAT = "";
              $scope.mod.f01_NNA_G_CIUD_valor = "";
              $scope.mod.f01_NNA_G_FEC_NAC = "";
              $scope.mod.f01_NNA_G_GEN_valor = "";
              $scope.mod.f01_NNA_G_LUG_NAC_valor = "";
              $scope.mod.f01_NNA_G_NOM = "";
              $scope.mod.f01_NNA_G_TELF = "";
              $scope.mod.f01_NNA_TER_MACRO_valor = "";
              $scope.mod.f01_NNA_TER_TEL = "";
              $scope.mod.oid = "";
              $scope.mod.dtspsl_file_fotocopia_ci = "";
              $scope.mod.dtspsl_file_fotocopia_ci_r = "";

              $scope.url_CI_Anverso = "";
              $scope.url_CI_Reverso = "";
              $scope.url_Pasaporte = "";
              $scope.url_Cer_def_pad = "";
              $scope.url_Cer_nac = "";
              $scope.url_Cer_def_mad = "";
            }
          }

        });
      } catch (e) {
      }

    }
  }
  $scope.guardarmod = function (campos) {
    if (campos.f01_NNA_EXP_CIUD_valor) {
      if (campos.f01_NNA_EXP_CIUD_valor == "LPZ") { campos.f01_NNA_EXP_CIUD = "LA PAZ"; }
      if (campos.f01_NNA_EXP_CIUD_valor == "ORU") { campos.f01_NNA_EXP_CIUD = "ORURO"; }
      if (campos.f01_NNA_EXP_CIUD_valor == "PTS") { campos.f01_NNA_EXP_CIUD = "POTOSI"; }
      if (campos.f01_NNA_EXP_CIUD_valor == "CBB") { campos.f01_NNA_EXP_CIUD = "COCHABAMBA"; }
      if (campos.f01_NNA_EXP_CIUD_valor == "CHQ") { campos.f01_NNA_EXP_CIUD = "CHUQUISACA"; }
      if (campos.f01_NNA_EXP_CIUD_valor == "TJA") { campos.f01_NNA_EXP_CIUD = "TARIJA"; }
      if (campos.f01_NNA_EXP_CIUD_valor == "BNI") { campos.f01_NNA_EXP_CIUD = "BENI"; }
      if (campos.f01_NNA_EXP_CIUD_valor == "PND") { campos.f01_NNA_EXP_CIUD = "PANDO"; }
      if (campos.f01_NNA_EXP_CIUD_valor == "SCZ") { campos.f01_NNA_EXP_CIUD = "SANTA CRUZ"; }
      if (campos.f01_NNA_EXP_CIUD_valor == "EXT") { campos.f01_NNA_EXP_CIUD = "EXTERIOR"; }
    }
    if (campos.f01_NNA_TER_MACRO_valor) {
      if (campos.f01_NNA_TER_MACRO_valor == "1") { campos.f01_NNA_TER_MACRO = "MACRODISTRITO 1 COTAHUMA"; }
      if (campos.f01_NNA_TER_MACRO_valor == "2") { campos.f01_NNA_TER_MACRO = "MACRODISTRITO 2 MAXIMILIANO PAREDES"; }
      if (campos.f01_NNA_TER_MACRO_valor == "3") { campos.f01_NNA_TER_MACRO = "MACRODISTRITO 3 PERIFERICA"; }
      if (campos.f01_NNA_TER_MACRO_valor == "4") { campos.f01_NNA_TER_MACRO = "MACRODISTRITO 4 SAN_ANTONIO"; }
      if (campos.f01_NNA_TER_MACRO_valor == "5") { campos.f01_NNA_TER_MACRO = "MACRODISTRITO 5 SUR"; }
      if (campos.f01_NNA_TER_MACRO_valor == "6") { campos.f01_NNA_TER_MACRO = "MACRODISTRITO 6 MALLASA"; }
      if (campos.f01_NNA_TER_MACRO_valor == "7") { campos.f01_NNA_TER_MACRO = "MACRODISTRITO 7 CENTRO"; }
      if (campos.f01_NNA_TER_MACRO_valor == "8") { campos.f01_NNA_TER_MACRO = "MACRODISTRITO 8 HAMPATURI"; }
      if (campos.f01_NNA_TER_MACRO_valor == "9") { campos.f01_NNA_TER_MACRO = "MACRODISTRITO 9 ZONGO"; }
      if (campos.f01_NNA_TER_MACRO_valor == "10") { campos.f01_NNA_TER_MACRO = "OTROS"; }
    }
    if (campos.f01_NNA_TER_ZONA) {
      for (var i = 0; i < $scope.zonas.length; i++) {
        if ($scope.zonas[i].dist_id == campos.f01_NNA_TER_ZONA) {
          $scope.des_zon = $scope.zonas[i].dist_nombre;
        }
      }
      campos.f01_NNA_TER_ZONA_DESC = $scope.des_zon;

    }

    $scope.bandera_ninos = 0;
    if ($scope.grid_n.length >= 1) {

      for (var i = 0; i < $scope.grid_n.length; i++) {
        if ($scope.grid_n[i].f01_NNA_G_CI == campos.f01_NNA_G_CI) {
          $scope.bandera_ninos = 1;
        }
      }
    }
    if ($scope.bandera_ninos == 0) {
      $scope.grid_n.push({
        f01_NNA_TIP_DOC_valor: campos.f01_NNA_TIP_DOC_valor,
        f01_NNA_DIR: campos.f01_NNA_DIR,
        f01_NNA_EXP_CIUD_valor: campos.f01_NNA_EXP_CIUD_valor,
        f01_NNA_EXP_CIUD: campos.f01_NNA_EXP_CIUD,
        f01_NNA_F_CADUC_CI: campos.f01_NNA_F_CADUC_CI,
        f01_NNA_G_AMAT: campos.f01_NNA_G_AMAT,
        f01_NNA_G_APAT: campos.f01_NNA_G_APAT,
        f01_NNA_G_CI: campos.f01_NNA_G_CI,
        f01_NNA_G_CIUD_valor: campos.f01_NNA_G_CIUD_valor,
        f01_NNA_G_FEC_NAC: campos.f01_NNA_G_FEC_NAC,
        f01_NNA_G_GEN_valor: campos.f01_NNA_G_GEN_valor,
        f01_NNA_G_LUG_NAC_valor: campos.f01_NNA_G_LUG_NAC_valor,
        f01_NNA_G_NOM: campos.f01_NNA_G_NOM,
        f01_NNA_G_TELF: campos.f01_NNA_G_TELF,
        f01_NNA_TER_MACRO_valor: campos.f01_NNA_TER_MACRO_valor,
        f01_NNA_TER_MACRO: campos.f01_NNA_TER_MACRO,
        f01_NNA_TER_TEL: campos.f01_NNA_TER_TEL,
        f01_NNA_TER_ZONA: campos.f01_NNA_TER_ZONA,
        f01_NNA_TER_ZONA_DESC: campos.f01_NNA_TER_ZONA_DESC,
        oid: campos.oid,
        dtspsl_file_fotocopia_ci: campos.dtspsl_file_fotocopia_ci,
        dtspsl_file_fotocopia_ci_r: campos.dtspsl_file_fotocopia_ci_r,
        Url_certificado_nac: campos.Url_certificado_nac,
        Url_dni_anverso: campos.Url_dni_anverso,
        Url_dni_reverso: campos.Url_dni_reverso
      });
    }
    var titulosnna = [{
      "tipo": "GRD",
      "titulos": "Tipo Doc|Numero de Doc|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Género|Macro|Dirección|Telf. 1|Cel. 2",
      "campos": "f01_NNA_TIP_DOC_valor|f01_NNA_G_CI|f01_NNA_EXP_CIUD_valor|f01_NNA_G_NOM|f01_NNA_G_APAT|f01_NNA_G_AMAT|f01_NNA_G_FEC_NAC|f01_NNA_G_LUG_NAC_valor|f01_NNA_G_CIUD_valor|f01_NNA_G_GEN_valor|f01_NNA_TER_MACRO_valor|f01_NNA_DIR|f01_NNA_TER_TEL|f01_NNA_G_TELF",
      "impresiones": "true|true|true|true|true|true|true|true|true|true|true|true|true|true"
    }];
    $scope.datos.TER_NNA_VIAJAN = titulosnna;
    for (var i = 0; i < $scope.grid_n.length; i++) {
      $scope.datos.TER_NNA_VIAJAN.push($scope.grid_n[i]);
    }
    $scope.datos.NNA_CANT_FEM = 0;
    $scope.datos.NNA_CANT_MAS = 0;
    $scope.datos.NNA_CAN_FEM = 0;
    $scope.datos.NNA_CAN_MAS = 0;
    $scope.datos.NNA_CANT_TOTAL = 0;
    $scope.datos.NNA_CANT_NN = 0;
    $scope.datos.NNA_NRO_ADO = 0;
    for (var k = 0; k < $scope.grid_n.length; k++) {
      $scope.calculo_edades = $scope.grid_n[k].f01_NNA_G_FEC_NAC;
      $scope.calculo_edades = $scope.calculo_edades.split("-");
      $scope.cal_anios = $scope.calculo_edades[0];
      var fecha = new Date();
      var anio_actual = fecha.getFullYear();
      $scope.cal_edades = anio_actual - $scope.cal_anios;
      if ($scope.grid_n[k].f01_NNA_G_GEN_valor == "F") {
        if ($scope.cal_edades <= 12) {
          $scope.datos.NNA_CANT_FEM = $scope.datos.NNA_CANT_FEM + 1;
        } else {
          $scope.datos.NNA_CAN_FEM = $scope.datos.NNA_CAN_FEM + 1;
        }
      }
      if ($scope.grid_n[k].f01_NNA_G_GEN_valor == "M") {
        if ($scope.cal_edades <= 12) {
          $scope.datos.NNA_CANT_MAS = $scope.datos.NNA_CANT_MAS + 1;
        } else {
          $scope.datos.NNA_CAN_MAS = $scope.datos.NNA_CAN_MAS + 1;
        }
      }
    }
    $scope.datos.NNA_CANT_TOTAL = $scope.datos.NNA_CANT_FEM + $scope.datos.NNA_CANT_MAS + $scope.datos.NNA_CAN_FEM + $scope.datos.NNA_CAN_MAS;
    $scope.datos.NNA_CANT_NN = $scope.datos.NNA_CANT_FEM + $scope.datos.NNA_CANT_MAS;
    $scope.datos.NNA_NRO_ADO = $scope.datos.NNA_CAN_FEM + $scope.datos.NNA_CAN_MAS;
    alertify.success('Registro Insertado');
  };
  $scope.remov_grid_n = function (idx) {
    $scope.grid_n.splice(idx, 1);
    $scope.datos.NNA_CANT_FEM = 0;
    $scope.datos.NNA_CANT_MAS = 0;
    $scope.datos.NNA_CAN_FEM = 0;
    $scope.datos.NNA_CAN_MAS = 0;
    $scope.datos.NNA_CANT_TOTAL = 0;
    $scope.datos.NNA_CANT_NN = 0;
    $scope.datos.NNA_NRO_ADO = 0;
    for (var k = 0; k < $scope.grid_n.length; k++) {
      $scope.calculo_edades = $scope.grid_n[k].f01_NNA_G_FEC_NAC;
      $scope.calculo_edades = $scope.calculo_edades.split("-");
      $scope.cal_anios = $scope.calculo_edades[0];
      var fecha = new Date();
      var anio_actual = fecha.getFullYear();
      $scope.cal_edades = anio_actual - $scope.cal_anios;
      if ($scope.grid_n[k].f01_NNA_G_GEN_valor == "F") {
        if ($scope.cal_edades <= 12) {
          $scope.datos.NNA_CANT_FEM = $scope.datos.NNA_CANT_FEM + 1;
        } else {
          $scope.datos.NNA_CAN_FEM = $scope.datos.NNA_CAN_FEM + 1;
        }
      }
      if ($scope.grid_n[k].f01_NNA_G_GEN_valor == "M") {
        if ($scope.cal_edades <= 12) {
          $scope.datos.NNA_CANT_MAS = $scope.datos.NNA_CANT_MAS + 1;
        } else {
          $scope.datos.NNA_CAN_MAS = $scope.datos.NNA_CAN_MAS + 1;
        }
      }
    }
    $scope.datos.NNA_CANT_TOTAL = $scope.datos.NNA_CANT_FEM + $scope.datos.NNA_CANT_MAS + $scope.datos.NNA_CAN_FEM + $scope.datos.NNA_CAN_MAS;
    $scope.datos.NNA_CANT_NN = $scope.datos.NNA_CANT_FEM + $scope.datos.NNA_CANT_MAS;
    $scope.datos.NNA_NRO_ADO = $scope.datos.NNA_CAN_FEM + $scope.datos.NNA_CAN_MAS;
    alertify.success('Registro Eliminado');
  };
  $scope.edit_grid_n = function (idx, campos) {
    $scope.url_CI_Anverso = "";
    $scope.url_CI_Reverso = "";
    $scope.muestra_ci_n = false;
    $scope.muestra_dn_n = false;
    $scope.muestra_cn_n = false;

    if (campos.f01_NNA_TIP_DOC_valor == "DN") {
      $scope.muestra_dn_n = true;
      $scope.mod.Url_dni_reverso = campos.Url_dni_reverso;
      $scope.mod.Url_dni_anverso = campos.Url_dni_anverso;
      $scope.url_Dni_anverso = campos.Url_dni_anverso;
      $scope.url_Dni_reverso = campos.Url_dni_reverso;
    }
    if (campos.f01_NNA_TIP_DOC_valor == "CN") {
      $scope.muestra_cn_n = true;
      $scope.url_Cert_nac = campos.f01_NNA_O_ADJ_G_ARCH_CN_AZURE;
      $scope.mod.Url_certificado_nac = campos.f01_NNA_O_ADJ_G_ARCH_CN_AZURE;
      if (campos.Url_certificado_nac) {
        $scope.url_Cert_nac = campos.Url_certificado_nac;
        $scope.mod.Url_certificado_nac = campos.Url_certificado_nac;
      }
    }
    $scope.gri_but_modal_g = false;
    $scope.gri_but_modal_e = true;
    $scope.idx = idx;
    $scope.mod.f01_NNA_TIP_DOC_valor = campos.f01_NNA_TIP_DOC_valor;
    $scope.mod.f01_NNA_DIR = campos.f01_NNA_DIR;
    $scope.mod.f01_NNA_EXP_CIUD_valor = campos.f01_NNA_EXP_CIUD_valor;
    $scope.mod.f01_NNA_F_CADUC_CI = campos.f01_NNA_F_CADUC_CI;
    $scope.mod.f01_NNA_G_AMAT = campos.f01_NNA_G_AMAT;
    $scope.mod.f01_NNA_G_APAT = campos.f01_NNA_G_APAT;
    $scope.mod.f01_NNA_G_CI = campos.f01_NNA_G_CI;
    $scope.mod.f01_NNA_G_CIUD_valor = campos.f01_NNA_G_CIUD_valor;
    $scope.mod.f01_NNA_G_FEC_NAC = campos.f01_NNA_G_FEC_NAC;
    $scope.mod.f01_NNA_G_GEN_valor = campos.f01_NNA_G_GEN_valor;
    $scope.mod.f01_NNA_G_LUG_NAC_valor = campos.f01_NNA_G_LUG_NAC_valor;
    $scope.mod.f01_NNA_G_NOM = campos.f01_NNA_G_NOM;
    $scope.mod.f01_NNA_G_TELF = campos.f01_NNA_G_TELF;
    $scope.mod.f01_NNA_TER_MACRO_valor = campos.f01_NNA_TER_MACRO_valor;
    $scope.mod.f01_NNA_TER_TEL = campos.f01_NNA_TER_TEL;
    $scope.mod.dtspsl_file_fotocopia_ci = campos.dtspsl_file_fotocopia_ci;
    $scope.mod.dtspsl_file_fotocopia_ci_r = campos.dtspsl_file_fotocopia_ci_r;
    if (campos.f01_NNA_TIP_DOC_valor == "CI") {
      $scope.muestra_ci_n = true;
      if (campos.oid == "" || campos.oid == undefined) {
        $scope.url_CI_Anverso = campos.dtspsl_file_fotocopia_ci;
      } else {
        cadena = campos.dtspsl_file_fotocopia_ci;
        if (cadena.indexOf('http') != -1) {
          $scope.url_CI_Anverso = campos.dtspsl_file_fotocopia_ci;
        } else {
          $scope.url_CI_Anverso = CONFIG.APIURL + "/files/RC_CLI/" + campos.oid + "/" + campos.dtspsl_file_fotocopia_ci + "?app_name=todoangular";
        }
      }
      if (campos.oid == "" || campos.oid == undefined) {
        $scope.url_CI_Reverso = campos.dtspsl_file_fotocopia_ci_r;
      } else {
        cadena2 = campos.dtspsl_file_fotocopia_ci_r;
        if (cadena2.indexOf('http') != -1) {
          $scope.url_CI_Reverso = campos.dtspsl_file_fotocopia_ci_r;
        } else {
          $scope.url_CI_Reverso = CONFIG.APIURL + "/files/RC_CLI/" + campos.oid + "/" + campos.dtspsl_file_fotocopia_ci_r + "?app_name=todoangular";
        }
      }
      if (campos.f01_NNA_REVERSO_G_ARCH) {
        $scope.url_CI_Reverso = campos.f01_NNA_REVERSO_G_ARCH;
      }
      if (campos.f01_NNA_ANVERSO_G_ARCH) {
        $scope.url_CI_Anverso = campos.f01_NNA_ANVERSO_G_ARCH;
      }
    }
    try {
      var zonas = new zonaLstM();
      zonas.idMacro = campos.f01_NNA_TER_MACRO_valor;
      zonas.obtzonaM(function (results) {
        results = JSON.parse(results);
        $scope.zonas = results.success;
      });
    } catch (e) {
    }
    setTimeout(function () {
      document.getElementById("f01_NNA_TER_ZONA").value = campos.f01_NNA_TER_ZONA;
      $scope.mod.f01_NNA_TER_ZONA = campos.f01_NNA_TER_ZONA;
    }, 1000);
  };
  $scope.modificar_grid_n = function (campos) {
    $scope.grid_n[$scope.idx].f01_NNA_TIP_DOC_valor = campos.f01_NNA_TIP_DOC_valor;
    $scope.grid_n[$scope.idx].f01_NNA_DIR = campos.f01_NNA_DIR;
    $scope.grid_n[$scope.idx].f01_NNA_EXP_CIUD_valor = campos.f01_NNA_EXP_CIUD_valor;
    $scope.grid_n[$scope.idx].f01_NNA_F_CADUC_CI = campos.f01_NNA_F_CADUC_CI;
    $scope.grid_n[$scope.idx].f01_NNA_G_AMAT = campos.f01_NNA_G_AMAT;
    $scope.grid_n[$scope.idx].f01_NNA_G_APAT = campos.f01_NNA_G_APAT;
    $scope.grid_n[$scope.idx].f01_NNA_G_CI = campos.f01_NNA_G_CI;
    $scope.grid_n[$scope.idx].f01_NNA_G_CIUD_valor = campos.f01_NNA_G_CIUD_valor;
    $scope.grid_n[$scope.idx].f01_NNA_G_FEC_NAC = campos.f01_NNA_G_FEC_NAC;
    $scope.grid_n[$scope.idx].f01_NNA_G_GEN_valor = campos.f01_NNA_G_GEN_valor;
    $scope.grid_n[$scope.idx].f01_NNA_G_LUG_NAC_valor = campos.f01_NNA_G_LUG_NAC_valor;
    $scope.grid_n[$scope.idx].f01_NNA_G_NOM = campos.f01_NNA_G_NOM;
    $scope.grid_n[$scope.idx].f01_NNA_G_TELF = campos.f01_NNA_G_TELF;
    $scope.grid_n[$scope.idx].f01_NNA_TER_MACRO_valor = campos.f01_NNA_TER_MACRO_valor;
    $scope.grid_n[$scope.idx].f01_NNA_TER_TEL = campos.f01_NNA_TER_TEL;
    $scope.grid_n[$scope.idx].f01_NNA_TER_ZONA = campos.f01_NNA_TER_ZONA;
    $scope.grid_n[$scope.idx].Url_certificado_nac = campos.Url_certificado_nac;
    $scope.grid_n[$scope.idx].Url_dni_anverso = campos.Url_dni_anverso;
    $scope.grid_n[$scope.idx].Url_dni_reverso = campos.Url_dni_reverso;
    $scope.grid_n[$scope.idx].dtspsl_file_fotocopia_ci = campos.dtspsl_file_fotocopia_ci;
    $scope.grid_n[$scope.idx].dtspsl_file_fotocopia_ci_r = campos.dtspsl_file_fotocopia_ci_r;
    $scope.datos.NNA_CANT_FEM = 0;
    $scope.datos.NNA_CANT_MAS = 0;
    $scope.datos.NNA_CAN_FEM = 0;
    $scope.datos.NNA_CAN_MAS = 0;
    $scope.datos.NNA_CANT_TOTAL = 0;
    $scope.datos.NNA_CANT_NN = 0;
    $scope.datos.NNA_NRO_ADO = 0;
    for (var k = 0; k < $scope.grid_n.length; k++) {
      $scope.calculo_edades = $scope.grid_n[k].f01_NNA_G_FEC_NAC;
      $scope.calculo_edades = $scope.calculo_edades.split("-");
      $scope.cal_anios = $scope.calculo_edades[0];
      var fecha = new Date();
      var anio_actual = fecha.getFullYear();
      $scope.cal_edades = anio_actual - $scope.cal_anios;
      if ($scope.grid_n[k].f01_NNA_G_GEN_valor == "F") {
        if ($scope.cal_edades <= 12) {
          $scope.datos.NNA_CANT_FEM = $scope.datos.NNA_CANT_FEM + 1;
        } else {
          $scope.datos.NNA_CAN_FEM = $scope.datos.NNA_CAN_FEM + 1;
        }
      }
      if ($scope.grid_n[k].f01_NNA_G_GEN_valor == "M") {
        if ($scope.cal_edades <= 12) {
          $scope.datos.NNA_CANT_MAS = $scope.datos.NNA_CANT_MAS + 1;
        } else {
          $scope.datos.NNA_CAN_MAS = $scope.datos.NNA_CAN_MAS + 1;
        }
      }
    }
    $scope.datos.NNA_CANT_TOTAL = $scope.datos.NNA_CANT_FEM + $scope.datos.NNA_CANT_MAS + $scope.datos.NNA_CAN_FEM + $scope.datos.NNA_CAN_MAS;
    $scope.datos.NNA_CANT_NN = $scope.datos.NNA_CANT_FEM + $scope.datos.NNA_CANT_MAS;
    $scope.datos.NNA_NRO_ADO = $scope.datos.NNA_CAN_FEM + $scope.datos.NNA_CAN_MAS;
    alertify.success('Registro Modificado');
  };
  $scope.limpiar_gridni = function () {
    $scope.muestra_ci_n = false;
    $scope.muestra_cn_n = false;
    $scope.muestra_dn_n = false;
    $scope.url_CI_Anverso = "";
    $scope.url_CI_Reverso = "";
    $scope.url_Cert_nac = "";
    $scope.url_Dni_anverso = "";
    $scope.url_Dni_reverso = "";
    $scope.gri_but_modal_g = true;
    $scope.gri_but_modal_e = false;
    $scope.zonas = [];
    $scope.mod = {};
    $scope.url_CI_Anverso = "";
    $scope.url_CI_Reverso = "";
    $scope.url_Pasaporte = "";
    $scope.url_Cer_def_pad = "";
    $scope.url_Cer_nac = "";
    $scope.url_Cer_def_mad = "";
    $scope.url_Cert_nac = "";
    $scope.url_Dni_anverso = "";
    $scope.url_Dni_reverso = "";
  }
  ////////////////////////////////////////// grilla adultos ////////////////////////////////////////////
  $scope.buscarciudadano_adultos = function (ciciudadano, tipo) {
    cargando();
    $scope.zonas = [];


    if (tipo == "CN") {
      $.LoadingOverlay("hide");
    } else {
      $scope.url_Cert_nac = "";
      $scope.mod_adultos.f01_ADUL_DIR = "";
      $scope.mod_adultos.f01_ADUL_EXP_CIUD_valor = "";
      $scope.mod_adultos.f01_ADUL_F_CADUC_CI = "";
      $scope.mod_adultos.f01_ADUL_G_AMAT = "";
      $scope.mod_adultos.f01_ADUL_G_APAT = "";
      $scope.mod_adultos.f01_ADUL_TER_CIUD_valor = "";
      $scope.mod_adultos.f01_ADUL_G_FEC_NAC = "";
      $scope.mod_adultos.f01_ADUL_G_GEN_valor = "";
      $scope.mod_adultos.f01_ADUL_LUG_NAC_valor = "";
      $scope.mod_adultos.f01_ADUL_G_NOM = "";
      $scope.mod_adultos.f01_ADUL_G_TELF = "";
      $scope.mod_adultos.f01_ADUL_TER_MACRO_valor = "";
      $scope.mod_adultos.f01_ADUL_TER_TEL = "";
      $scope.mod_adultos.f01_ADUL_G_VA_valor = "";
      $scope.mod_adultos.oid = "";
      $scope.mod_adultos.dtspsl_file_fotocopia_ci = "";
      $scope.mod_adultos.dtspsl_file_fotocopia_ci_r = "";
      $scope.mod_adultos.f01_ADUL_G_PARE_COND_valor = "";
      $scope.url_CI_Anverso = "";
      $scope.url_CI_Reverso = "";
      $scope.url_Pasaporte = "";
      $scope.url_Cer_def_pad = "";
      $scope.url_Cer_nac = "";
      $scope.url_Cer_def_mad = "";
    }
    if (tipo == "DN") {
      $.LoadingOverlay("hide");
    } else {
      $scope.url_Dni_anverso = "";
      $scope.url_Dni_reverso = "";
      $scope.mod_adultos.f01_ADUL_DIR = "";
      $scope.mod_adultos.f01_ADUL_EXP_CIUD_valor = "";
      $scope.mod_adultos.f01_ADUL_F_CADUC_CI = "";
      $scope.mod_adultos.f01_ADUL_G_AMAT = "";
      $scope.mod_adultos.f01_ADUL_G_APAT = "";
      $scope.mod_adultos.f01_ADUL_TER_CIUD_valor = "";
      $scope.mod_adultos.f01_ADUL_G_FEC_NAC = "";
      $scope.mod_adultos.f01_ADUL_G_GEN_valor = "";
      $scope.mod_adultos.f01_ADUL_LUG_NAC_valor = "";
      $scope.mod_adultos.f01_ADUL_G_NOM = "";
      $scope.mod_adultos.f01_ADUL_G_TELF = "";
      $scope.mod_adultos.f01_ADUL_TER_MACRO_valor = "";
      $scope.mod_adultos.f01_ADUL_TER_TEL = "";
      $scope.mod_adultos.oid = "";
      $scope.mod_adultos.dtspsl_file_fotocopia_ci = "";
      $scope.mod_adultos.dtspsl_file_fotocopia_ci_r = "";
      $scope.mod_adultos.f01_ADUL_G_VA_valor = "";
      $scope.mod_adultos.f01_ADUL_G_PARE_COND_valor = "";
      $scope.url_CI_Anverso = "";
      $scope.url_CI_Reverso = "";
      $scope.url_Pasaporte = "";
      $scope.url_Cer_def_pad = "";
      $scope.url_Cer_nac = "";
      $scope.url_Cer_def_mad = "";
    }
    if (tipo == "CI") {
      try {
        var buscarRepresentante = new rcNatural();
        buscarRepresentante.tipo_persona = "NATURAL";
        buscarRepresentante.ci = ciciudadano;
        buscarRepresentante.buscarPersona(function (res) {
          var x = JSON.parse(res);

          if (x.error) {
            $.LoadingOverlay("hide");
            $.unblockUI();
            alertify.success(x.error.message);
          } else {
            if (x.length > 0) {
              $.LoadingOverlay("hide");
              alertify.success('Datos Encontrados');
              var str = x[0].dtspsl_fec_nacimiento;
              x[0].dtspsl_fec_nacimiento = str.replace(/\//g, "-");
              var fecnac = new Date(x[0].dtspsl_fec_nacimiento);
              var mes = fecnac.getMonth() + 1;
              var dia = fecnac.getDate() + 1;
              if (fecnac.getDate() < 10) {
                dia = "0" + dia;
              }
              if (fecnac.getMonth() < 9) {
                mes = "0" + mes;
              }
              $scope.mod_adultos.f01_ADUL_G_FEC_NAC = fecnac.getFullYear() + "-" + mes + "-" + dia;



              var fecha = new Date();
              var anio_actual = fecha.getFullYear();
              $scope.cal_edad_mayor = anio_actual - fecnac.getFullYear();
              var m = fecha.getMonth() - fecnac.getMonth();
              if (m < 0 || (m === 0 && fecha.getDate() < fecnac.getDate())) {
                $scope.cal_edad_mayor--;
              }
              if ($scope.cal_edad_mayor >= 18) {
                $scope.busquedaCiudadano = x[0];
                try {
                  var zonas = new zonaLstM();
                  zonas.idMacro = x[0].dtspsl_macrodistrito;
                  zonas.obtzonaM(function (results) {
                    results = JSON.parse(results);
                    $scope.zonas = results.success;

                  });
                } catch (e) {

                }
                $scope.mod_adultos.f01_ADUL_DIR = x[0].dtspsl_direccion;
                $scope.mod_adultos.f01_ADUL_EXP_CIUD_valor = x[0].dtspsl_expedido;
                $scope.mod_adultos.f01_ADUL_F_CADUC_CI = x[0].dtspsl_fec_vencimiento;
                $scope.mod_adultos.f01_ADUL_G_AMAT = x[0].dtspsl_materno;
                $scope.mod_adultos.f01_ADUL_G_APAT = x[0].dtspsl_paterno;
                $scope.mod_adultos.f01_ADUL_TER_CIUD_valor = x[0].dtspsl_departamento;
                $scope.mod_adultos.f01_ADUL_G_FEC_NAC = x[0].dtspsl_fec_nacimiento;
                $scope.mod_adultos.f01_ADUL_G_GEN_valor = x[0].dtspsl_sexo;
                $scope.mod_adultos.f01_ADUL_LUG_NAC_valor = x[0].dtspsl_lugar_nacimiento;
                $scope.mod_adultos.f01_ADUL_G_NOM = x[0].dtspsl_nombres;
                $scope.mod_adultos.f01_ADUL_G_TELF = x[0].dtspsl_movil;
                $scope.mod_adultos.f01_ADUL_TER_MACRO_valor = x[0].dtspsl_macrodistrito;
                $scope.mod_adultos.f01_ADUL_TER_TEL = x[0].dtspsl_telefono;
                $scope.mod_adultos.oid = x[0]._id;
                $scope.mod_adultos.dtspsl_file_fotocopia_ci = x[0].dtspsl_file_fotocopia_ci;
                $scope.mod_adultos.dtspsl_file_fotocopia_ci_r = x[0].dtspsl_file_fotocopia_ci_r;
                if (x[0].dtspsl_fec_vencimiento) {
                  var fecha = new Date();
                  var anio_act = fecha.getFullYear();
                  var mes_act = fecha.getMonth() + 1;
                  var dia_act = fecha.getDate();
                  var str = x[0].dtspsl_fec_vencimiento;
                  x[0].dtspsl_fec_vencimiento = str.replace(/\//g, "-");
                  var fecha2 = new Date(x[0].dtspsl_fec_vencimiento);
                  var anio_act2 = fecha2.getFullYear();
                  var mes_act2 = fecha2.getMonth() + 1;
                  var dia_act2 = fecha2.getDate();
                  if (parseInt(anio_act2) <= parseInt(anio_act)) {

                    if (parseInt(mes_act2) <= parseInt(mes_act)) {

                      if (parseInt(dia_act2) <= parseInt(dia_act)) {

                        alertify.success('Fecha de carnet caducada');
                      }
                    }
                  }
                }
                if (x[0].dtspsl_file_fotocopia_ci == "") {
                } else {
                  $scope.url_CI_Anverso = CONFIG.APIURL + "/files/RC_CLI/" + x[0]._id + "/" + x[0].dtspsl_file_fotocopia_ci + "?app_name=todoangular";
                }
                if (x[0].dtspsl_file_fotocopia_ci_r == "") {
                } else {
                  $scope.url_CI_Reverso = CONFIG.APIURL + "/files/RC_CLI/" + x[0]._id + "/" + x[0].dtspsl_file_fotocopia_ci_r + "?app_name=todoangular";
                }
                setTimeout(function () {
                  document.getElementById("f01_ADUL_TER_ZONA").value = x[0].dtspsl_zona;
                  $scope.mod_adultos.f01_ADUL_TER_ZONA = x[0].dtspsl_zona;
                }, 1000);
              } else {

                swal("", 'El ciudadano no corresponde a este listado ya que es menor de edad', "warning");
                $scope.mod_adultos.f01_ADUL_DIR = "";
                $scope.mod_adultos.f01_ADUL_EXP_CIUD_valor = "";
                $scope.mod_adultos.f01_ADUL_F_CADUC_CI = "";
                $scope.mod_adultos.f01_ADUL_G_AMAT = "";
                $scope.mod_adultos.f01_ADUL_G_APAT = "";
                $scope.mod_adultos.f01_ADUL_TER_CIUD_valor = "";
                $scope.mod_adultos.f01_ADUL_G_FEC_NAC = "";
                $scope.mod_adultos.f01_ADUL_G_GEN_valor = "";
                $scope.mod_adultos.f01_ADUL_LUG_NAC_valor = "";
                $scope.mod_adultos.f01_ADUL_G_NOM = "";
                $scope.mod_adultos.f01_ADUL_G_TELF = "";
                $scope.mod_adultos.f01_ADUL_TER_MACRO_valor = "";
                $scope.mod_adultos.f01_ADUL_TER_TEL = "";
                $scope.mod_adultos.oid = "";
                $scope.mod_adultos.dtspsl_file_fotocopia_ci = "";
                $scope.mod_adultos.dtspsl_file_fotocopia_ci_r = "";
                $scope.mod_adultos.f01_ADUL_G_VA_valor = "";
                $scope.url_CI_Anverso = "";
                $scope.url_CI_Reverso = "";
                $scope.url_Pasaporte = "";
                $scope.url_Cer_def_pad = "";
                $scope.url_Cer_nac = "";
                $scope.url_Cer_def_mad = "";
              }
            } else {
              $scope.mod_adultos.f01_ADUL_DIR = "";
              $scope.mod_adultos.f01_ADUL_EXP_CIUD_valor = "";
              $scope.mod_adultos.f01_ADUL_F_CADUC_CI = "";
              $scope.mod_adultos.f01_ADUL_G_AMAT = "";
              $scope.mod_adultos.f01_ADUL_G_APAT = "";
              $scope.mod_adultos.f01_ADUL_TER_CIUD_valor = "";
              $scope.mod_adultos.f01_ADUL_G_FEC_NAC = "";
              $scope.mod_adultos.f01_ADUL_G_GEN_valor = "";
              $scope.mod_adultos.f01_ADUL_LUG_NAC_valor = "";
              $scope.mod_adultos.f01_ADUL_G_NOM = "";
              $scope.mod_adultos.f01_ADUL_G_TELF = "";
              $scope.mod_adultos.f01_ADUL_TER_MACRO_valor = "";
              $scope.mod_adultos.f01_ADUL_TER_TEL = "";
              $scope.mod_adultos.oid = "";
              $scope.mod_adultos.dtspsl_file_fotocopia_ci = "";
              $scope.mod_adultos.dtspsl_file_fotocopia_ci_r = "";
              $scope.mod_adultos.f01_ADUL_G_VA_valor = "";
              $scope.url_CI_Anverso = "";
              $scope.url_CI_Reverso = "";
              $scope.url_Pasaporte = "";
              $scope.url_Cer_def_pad = "";
              $scope.url_Cer_nac = "";
              $scope.url_Cer_def_mad = "";
            }
          }
        });
      } catch (e) {
      }

    }
  }
  $scope.guardarmod_adultos = function (campos) {
    if (campos.f01_ADUL_EXP_CIUD_valor) {
      if (campos.f01_ADUL_EXP_CIUD_valor == "LPZ") { campos.f01_ADUL_EXP_CIUD = "LA PAZ"; }
      if (campos.f01_ADUL_EXP_CIUD_valor == "ORU") { campos.f01_ADUL_EXP_CIUD = "ORURO"; }
      if (campos.f01_ADUL_EXP_CIUD_valor == "PTS") { campos.f01_ADUL_EXP_CIUD = "POTOSI"; }
      if (campos.f01_ADUL_EXP_CIUD_valor == "CBB") { campos.f01_ADUL_EXP_CIUD = "COCHABAMBA"; }
      if (campos.f01_ADUL_EXP_CIUD_valor == "CHQ") { campos.f01_ADUL_EXP_CIUD = "CHUQUISACA"; }
      if (campos.f01_ADUL_EXP_CIUD_valor == "TJA") { campos.f01_ADUL_EXP_CIUD = "TARIJA"; }
      if (campos.f01_ADUL_EXP_CIUD_valor == "BNI") { campos.f01_ADUL_EXP_CIUD = "BENI"; }
      if (campos.f01_ADUL_EXP_CIUD_valor == "PND") { campos.f01_ADUL_EXP_CIUD = "PANDO"; }
      if (campos.f01_ADUL_EXP_CIUD_valor == "SCZ") { campos.f01_ADUL_EXP_CIUD = "SANTA CRUZ"; }
      if (campos.f01_ADUL_EXP_CIUD_valor == "EXT") { campos.f01_ADUL_EXP_CIUD = "EXTERIOR"; }
    }
    if (campos.f01_ADUL_TER_MACRO_valor) {
      if (campos.f01_ADUL_TER_MACRO_valor == "1") { campos.f01_ADUL_TER_MACRO = "MACRODISTRITO 1 COTAHUMA"; }
      if (campos.f01_ADUL_TER_MACRO_valor == "2") { campos.f01_ADUL_TER_MACRO = "MACRODISTRITO 2 MAXIMILIANO PAREDES"; }
      if (campos.f01_ADUL_TER_MACRO_valor == "3") { campos.f01_ADUL_TER_MACRO = "MACRODISTRITO 3 PERIFERICA"; }
      if (campos.f01_ADUL_TER_MACRO_valor == "4") { campos.f01_ADUL_TER_MACRO = "MACRODISTRITO 4 SAN_ANTONIO"; }
      if (campos.f01_ADUL_TER_MACRO_valor == "5") { campos.f01_ADUL_TER_MACRO = "MACRODISTRITO 5 SUR"; }
      if (campos.f01_ADUL_TER_MACRO_valor == "6") { campos.f01_ADUL_TER_MACRO = "MACRODISTRITO 6 MALLASA"; }
      if (campos.f01_ADUL_TER_MACRO_valor == "7") { campos.f01_ADUL_TER_MACRO = "MACRODISTRITO 7 CENTRO"; }
      if (campos.f01_ADUL_TER_MACRO_valor == "8") { campos.f01_ADUL_TER_MACRO = "MACRODISTRITO 8 HAMPATURI"; }
      if (campos.f01_ADUL_TER_MACRO_valor == "9") { campos.f01_ADUL_TER_MACRO = "MACRODISTRITO 9 ZONGO"; }
      if (campos.f01_ADUL_TER_MACRO_valor == "10") { campos.f01_ADUL_TER_MACRO = "OTROS"; }
    }
    if (campos.f01_ADUL_TER_ZONA) {
      for (var i = 0; i < $scope.zonas.length; i++) {
        if ($scope.zonas[i].dist_id == campos.f01_ADUL_TER_ZONA) {
          $scope.des_zon = $scope.zonas[i].dist_nombre;
        }
      }
      campos.f01_ADUL_TER_ZONA_DESC = $scope.des_zon;

    }

    $scope.bandera_adultos = 0;
    if ($scope.grid_n.length >= 1) {

      for (var i = 0; i < $scope.grid_n.length; i++) {
        if ($scope.grid_n[i].f01_NNA_G_CI == campos.f01_NNA_G_CI) {
          $scope.bandera_adultos = 1;
        }
      }
    }
    if ($scope.bandera_adultos == 0) {
      $scope.grid_a.push(campos);
      var titulosrep = [{
        "tipo": "GRD",
        "titulos": "Tipo de Doc|Numero de Doc|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Género|Macro|Dirección|Telf. 1|Cel. 2|Viaja/ Autoriza|Parentesco/ Condición",
        "campos": "f01_ADUL_TIP_DOC_valor|f01_ADUL_G_CI|f01_ADUL_EXP_CIUD_valor|f01_ADUL_G_NOM|f01_ADUL_G_APAT|f01_ADUL_G_AMAT|f01_ADUL_G_FEC_NAC|f01_ADUL_LUG_NAC_valor|f01_ADUL_TER_CIUD_valor|f01_ADUL_G_GEN_valor|f01_ADUL_TER_MACRO_valor|f01_ADUL_DIR|f01_ADUL_TER_TEL|f01_ADUL_G_TELF|f01_ADUL_G_VA_valor|f01_ADUL_G_PARE_COND_valor",
        "impresiones": "true|true|true|true|true|true|true|true|true|true|true|true|true|true|true|true|true"
      }];
      $scope.datos.TER_RESP = titulosrep;
      for (var i = 0; i < $scope.grid_a.length; i++) {
        $scope.datos.TER_RESP.push($scope.grid_a[i]);
      }
      alertify.success('Registro Insertado');
    }

  };
  $scope.remov_grid_adultos = function (idx) {
    $scope.grid_a.splice(idx, 1);

    alertify.success('Registro Eliminado');
  };
  $scope.edit_grid_adultos = function (idx, campos_adultos) {
    $scope.url_CI_Anverso = "";
    $scope.url_CI_Reverso = "";
    if (campos_adultos.f01_ADUL_TIP_DOC_valor == "DN") {
      $scope.mod_adultos.Url_dni_anverso = campos_adultos.Url_dni_anverso;
      $scope.mod_adultos.Url_dni_reverso = campos_adultos.Url_dni_reverso;
      $scope.url_Dni_anverso = campos_adultos.Url_dni_anverso;
      $scope.url_Dni_reverso = campos_adultos.Url_dni_reverso;
    }
    $scope.gri_but_modal_g_adultos = false;
    $scope.gri_but_modal_e_adultos = true;
    $scope.idx = idx;
    $scope.mod_adultos.f01_ADUL_TIP_DOC_valor = campos_adultos.f01_ADUL_TIP_DOC_valor;
    $scope.mod_adultos.f01_ADUL_DIR = campos_adultos.f01_ADUL_DIR;
    $scope.mod_adultos.f01_ADUL_EXP_CIUD_valor = campos_adultos.f01_ADUL_EXP_CIUD_valor;
    $scope.mod_adultos.f01_ADUL_F_CADUC_CI = campos_adultos.f01_ADUL_F_CADUC_CI;
    $scope.mod_adultos.f01_ADUL_G_AMAT = campos_adultos.f01_ADUL_G_AMAT;
    $scope.mod_adultos.f01_ADUL_G_APAT = campos_adultos.f01_ADUL_G_APAT;
    $scope.mod_adultos.f01_ADUL_G_CI = campos_adultos.f01_ADUL_G_CI;
    $scope.mod_adultos.f01_ADUL_TER_CIUD_valor = campos_adultos.f01_ADUL_TER_CIUD_valor;
    $scope.mod_adultos.f01_ADUL_G_FEC_NAC = campos_adultos.f01_ADUL_G_FEC_NAC;
    $scope.mod_adultos.f01_ADUL_G_GEN_valor = campos_adultos.f01_ADUL_G_GEN_valor;
    $scope.mod_adultos.f01_ADUL_LUG_NAC_valor = campos_adultos.f01_ADUL_LUG_NAC_valor;
    $scope.mod_adultos.f01_ADUL_G_NOM = campos_adultos.f01_ADUL_G_NOM;
    $scope.mod_adultos.f01_ADUL_G_TELF = campos_adultos.f01_ADUL_G_TELF;
    $scope.mod_adultos.f01_ADUL_TER_MACRO_valor = campos_adultos.f01_ADUL_TER_MACRO_valor;
    $scope.mod_adultos.f01_ADUL_TER_TEL = campos_adultos.f01_ADUL_TER_TEL;
    $scope.mod_adultos.f01_ADUL_G_VA_valor = campos_adultos.f01_ADUL_G_VA_valor;
    $scope.mod_adultos.f01_ADUL_G_PARE_COND_valor = campos_adultos.f01_ADUL_G_PARE_COND_valor;
    $scope.mod_adultos.dtspsl_file_fotocopia_ci = campos_adultos.dtspsl_file_fotocopia_ci;
    $scope.mod_adultos.dtspsl_file_fotocopia_ci_r = campos_adultos.dtspsl_file_fotocopia_ci_r;
    if (campos_adultos.f01_ADUL_TIP_DOC_valor == "CI") {
      if (campos_adultos.oid == "" || campos_adultos.oid == undefined) {
        if (campos_adultos.f01_ADUL_ANVERSO_G_ARCH_AZURE) {
          $scope.url_a = campos_adultos.f01_ADUL_ANVERSO_G_ARCH_AZURE;
          $scope.url_CI_Anverso = $scope.url_a;//CONFIG.APIURL + "/files/SCANNER/"+campos_adultos.f01_ADUL_G_CI+"/"+campos_adultos.f01_ADUL_G_CI+"_anverso.jpg"+"?app_name=todoangular";
          setTimeout(function () {
            $scope.url_CI_Anverso = $scope.url_a;
          }, 3000);
        } else {
          $scope.url_CI_Anverso = campos_adultos.dtspsl_file_fotocopia_ci;
        }
      } else {
        cadena3 = campos_adultos.dtspsl_file_fotocopia_ci;
        if (cadena3.indexOf('http') != -1) {
          $scope.url_CI_Anverso = campos_adultos.dtspsl_file_fotocopia_ci;
        } else {
          $scope.url_CI_Anverso = CONFIG.APIURL + "/files/RC_CLI/" + campos_adultos.oid + "/" + campos_adultos.dtspsl_file_fotocopia_ci + "?app_name=todoangular";
        }

      }
      if (campos_adultos.oid == "" || campos_adultos.oid == undefined) {
        if (campos_adultos.f01_ADUL_REVERSO_G_ARCH_AZURE) {
          $scope.url_b = campos_adultos.f01_ADUL_REVERSO_G_ARCH_AZURE;
          $scope.url_CI_Reverso = $scope.url_b;//CONFIG.APIURL + "/files/SCANNER/"+campos_adultos.f01_ADUL_G_CI+"/"+campos_adultos.f01_ADUL_G_CI+"_reverso.jpg"+"?app_name=todoangular";
          setTimeout(function () {
            $scope.url_CI_Reverso = $scope.url_b;
          }, 3000);
        } else {
          $scope.url_CI_Reverso = campos_adultos.dtspsl_file_fotocopia_ci_r;
        }
      } else {
        cadena4 = campos_adultos.dtspsl_file_fotocopia_ci;
        if (cadena4.indexOf('http') != -1) {
          $scope.url_CI_Reverso = campos_adultos.dtspsl_file_fotocopia_ci_r;
        } else {
          $scope.url_CI_Reverso = CONFIG.APIURL + "/files/RC_CLI/" + campos_adultos.oid + "/" + campos_adultos.dtspsl_file_fotocopia_ci_r + "?app_name=todoangular";
        }
      }
      if (campos_adultos.f01_ADUL_REVERSO_G_ARCH) {
        $scope.url_CI_Reverso = campos_adultos.f01_ADUL_REVERSO_G_ARCH;
      }
      if (campos_adultos.f01_ADUL_ANVERSO_G_ARCH) {
        $scope.url_CI_Anverso = campos_adultos.f01_ADUL_ANVERSO_G_ARCH;
      }
    }
    try {
      var zonas = new zonaLstM();
      zonas.idMacro = campos_adultos.f01_ADUL_TER_MACRO_valor;
      zonas.obtzonaM(function (results) {
        results = JSON.parse(results);
        $scope.zonas = results.success;

      });
    } catch (e) {

    }

    //$scope.mod.f01_ADUL_TER_ZONA = campos_adultos.f01_ADUL_TER_ZONA;
    setTimeout(function () {
      document.getElementById("f01_ADUL_TER_ZONA").value = campos_adultos.f01_ADUL_TER_ZONA;
      $scope.mod_adultos.f01_ADUL_TER_ZONA = campos_adultos.f01_ADUL_TER_ZONA;

    }, 1000);

  };
  $scope.modificar_grid_adultos = function (campos) {

    $scope.grid_a[$scope.idx].f01_ADUL_TIP_DOC_valor = campos.f01_ADUL_TIP_DOC_valor;
    $scope.grid_a[$scope.idx].f01_ADUL_DIR = campos.f01_ADUL_DIR;
    $scope.grid_a[$scope.idx].f01_ADUL_EXP_CIUD_valor = campos.f01_ADUL_EXP_CIUD_valor;
    $scope.grid_a[$scope.idx].f01_ADUL_F_CADUC_CI = campos.f01_ADUL_F_CADUC_CI;
    $scope.grid_a[$scope.idx].f01_ADUL_G_AMAT = campos.f01_ADUL_G_AMAT;
    $scope.grid_a[$scope.idx].f01_ADUL_G_APAT = campos.f01_ADUL_G_APAT;
    $scope.grid_a[$scope.idx].f01_ADUL_G_CI = campos.f01_ADUL_G_CI;
    $scope.grid_a[$scope.idx].f01_ADUL_TER_CIUD_valor = campos.f01_ADUL_TER_CIUD_valor;
    $scope.grid_a[$scope.idx].f01_ADUL_G_FEC_NAC = campos.f01_ADUL_G_FEC_NAC;
    $scope.grid_a[$scope.idx].f01_ADUL_G_GEN_valor = campos.f01_ADUL_G_GEN_valor;
    $scope.grid_a[$scope.idx].f01_ADUL_LUG_NAC_valor = campos.f01_ADUL_LUG_NAC_valor;
    $scope.grid_a[$scope.idx].f01_ADUL_G_NOM = campos.f01_ADUL_G_NOM;
    $scope.grid_a[$scope.idx].f01_ADUL_G_TELF = campos.f01_ADUL_G_TELF;
    $scope.grid_a[$scope.idx].f01_ADUL_TER_MACRO_valor = campos.f01_ADUL_TER_MACRO_valor;
    $scope.grid_a[$scope.idx].f01_ADUL_TER_TEL = campos.f01_ADUL_TER_TEL;
    $scope.grid_a[$scope.idx].f01_ADUL_TER_ZONA = campos.f01_ADUL_TER_ZONA;
    $scope.grid_a[$scope.idx].f01_ADUL_G_VA_valor = campos.f01_ADUL_G_VA_valor;
    $scope.grid_a[$scope.idx].f01_ADUL_G_PARE_COND_valor = campos.f01_ADUL_G_PARE_COND_valor;
    $scope.grid_a[$scope.idx].Url_dni_anverso = campos.Url_dni_anverso;
    $scope.grid_a[$scope.idx].Url_dni_reverso = campos.Url_dni_reverso;
    $scope.grid_a[$scope.idx].dtspsl_file_fotocopia_ci = campos.dtspsl_file_fotocopia_ci;
    $scope.grid_a[$scope.idx].dtspsl_file_fotocopia_ci_r = campos.dtspsl_file_fotocopia_ci_r;
    $scope.grid_a[$scope.idx].Url_dni_anverso = campos.Url_dni_anverso;
    $scope.grid_a[$scope.idx].Url_dni_reverso = campos.Url_dni_reverso;
    alertify.success('Registro Modificado');
  };
  $scope.limpiar_gridni_adultos = function () {
    $scope.url_CI_Anverso = "";
    $scope.url_CI_Reverso = "";
    $scope.url_Cert_nac = "";
    $scope.url_Dni_anverso = "";
    $scope.url_Dni_reverso = "";
    $scope.gri_but_modal_g_adultos = true;
    $scope.gri_but_modal_e_adultos = false;
    $scope.zonas = [];
    $scope.mod_adultos = {};
    $scope.url_CI_Anverso = "";
    $scope.url_CI_Reverso = "";
    $scope.url_Pasaporte = "";
    $scope.url_Cer_def_pad = "";
    $scope.url_Cer_nac = "";
    $scope.url_Cer_def_mad = "";
    $scope.url_Cert_nac = "";
    $scope.url_Dni_anverso = "";
    $scope.url_Dni_reverso = "";
  }
  ///////////////////////////////////////////////////// ADJUNTOS ///////////////////////////////////////////////////////
  $scope.ejecutarFile = function (idfile, data_modal, tipo_img, verificador) {
    $scope.verificador = verificador;
    $scope.validador_img = data_modal;
    $scope.tipo_img = tipo_img
    var sid = document.getElementById(idfile);
    if (sid) {
      document.getElementById(idfile).click();
    } else {
      alert("Error ");
    }
    $('.custom-upload input[type=file]').change(function () {
      $(this).next().find('input').val($(this).val());
      angular.element(this).scope().cambiarFiles(this, $(this).val());
    });
  };
  $scope.cambiarFiles = function (obj, valor) {
    $scope.datos[obj.name] = valor;
    $scope.subirRequisitos(obj, valor);
  };
  $scope.img = [];
  $scope.subirRequisitos = function (sobj, svalor) {
    var rMisDocs = new Array();
    if (sobj.files[0]) {
      var filecompress = compressImage(sobj.files[0]).then(function (respuesta) {
        sobj.files[0] = respuesta;
      });
      rMisDocs.push(sobj.files[0]);
      $scope.almacenarRequisitos(rMisDocs);
    }
  };
  $scope.almacenarRequisitos = function (aArchivos) {
    $scope.oidCiudadano = sessionService.get('IDSOLICITANTE');
    var sDirTramite = sessionService.get('IDTRAMITE');
    $scope.direccionvirtual = "RC_CLI/" + $scope.oidCiudadano;
    if ($scope.verificador == 'MENORES') {
      if ($scope.validador_img.f01_NNA_TIP_DOC_valor == "CI") {
        $scope.direccionvirtual = "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/SCANNER";
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
        $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + aArchivos[0].name + "?app_name=todoangular";
      }
      if ($scope.validador_img.f01_NNA_TIP_DOC_valor == "CN") {
        $scope.direccionvirtual = "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/SCANNER/" + $scope.validador_img.f01_NNA_G_CI;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
        $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + aArchivos[0].name + "?app_name=todoangular";
      }
      if ($scope.validador_img.f01_NNA_TIP_DOC_valor == "DN") {

        $scope.direccionvirtual = "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/SCANNER/" + $scope.validador_img.f01_NNA_G_CI;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
        $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + aArchivos[0].name + "?app_name=todoangular";
        $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + aArchivos[0].name + "?app_name=todoangular";
      }
      if ($scope.validador_img.f01_ADUL_TIP_DOC_valor == "DN") {
        $scope.direccionvirtual = "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/SCANNER/" + $scope.validador_img.f01_ADUL_G_CI;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
        $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + aArchivos[0].name + "?app_name=todoangular";
      }
    }
    if ($scope.verificador == 'MAYORES') {
      if ($scope.validador_img.f01_ADUL_TIP_DOC_valor == "CI") {
        $scope.direccionvirtual = "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/SCANNER";
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
        $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + aArchivos[0].name + "?app_name=todoangular";
      }
      if ($scope.validador_img.f01_ADUL_TIP_DOC_valor == "CN") {
        $scope.direccionvirtual = "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/SCANNER/" + $scope.validador_img.f01_NNA_G_CI;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
        $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + aArchivos[0].name + "?app_name=todoangular";
      }
      if ($scope.validador_img.f01_ADUL_TIP_DOC_valor == "DN") {

        $scope.direccionvirtual = "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/SCANNER/" + $scope.validador_img.f01_NNA_G_CI;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
        $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + aArchivos[0].name + "?app_name=todoangular";
        $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + aArchivos[0].name + "?app_name=todoangular";
      }
      if ($scope.validador_img.f01_ADUL_TIP_DOC_valor == "DN") {
        $scope.direccionvirtual = "RC_CLI/" + sessionService.get('IDSOLICITANTE') + "/SCANNER/" + $scope.validador_img.f01_ADUL_G_CI;
        var uploadUrl = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/";
        $scope.documentosarc = CONFIG.APIURL + "/files/" + $scope.direccionvirtual + "/" + aArchivos[0].name + "?app_name=todoangular";
      }
    }
    fileUpload.uploadFileToUrl(aArchivos[0], uploadUrl);
    if ($scope.verificador == 'MENORES') {
      if ($scope.tipo_img == '_anverso') {
        $scope.url_CI_Anverso = $scope.documentosarc;
        $scope.mod.dtspsl_file_fotocopia_ci = $scope.documentosarc;
      }
      if ($scope.tipo_img == '_reverso') {
        $scope.url_CI_Reverso = $scope.documentosarc;
        $scope.mod.dtspsl_file_fotocopia_ci_r = $scope.documentosarc;
      }
      if ($scope.tipo_img == '_ci_nacimiento') {
        $scope.url_Cert_nac = $scope.documentosarc;
        $scope.mod.Url_certificado_nac = $scope.documentosarc;
      }
      if ($scope.tipo_img == '_dni_anverso') {
        $scope.url_Dni_anverso = $scope.documentosarc;
        $scope.mod.Url_dni_anverso = $scope.documentosarc;
      }
      if ($scope.tipo_img == '_dni_reverso') {
        $scope.url_Dni_reverso = $scope.documentosarc;
        $scope.mod.Url_dni_reverso = $scope.documentosarc;
      }
    }
    if ($scope.verificador == 'MAYORES') {
      if ($scope.tipo_img == '_anverso') {
        $scope.url_CI_Anverso = $scope.documentosarc;
        $scope.mod_adultos.dtspsl_file_fotocopia_ci = $scope.documentosarc;
      }
      if ($scope.tipo_img == '_reverso') {
        $scope.url_CI_Reverso = $scope.documentosarc;
        $scope.mod_adultos.dtspsl_file_fotocopia_ci_r = $scope.documentosarc;
      }

      if ($scope.tipo_img == '_ci_nacimiento') {
        $scope.url_Cert_nac = $scope.documentosarc;
        $scope.mod_adultos.Url_certificado_nac = $scope.documentosarc;
      }
      if ($scope.tipo_img == '_dni_anverso') {
        $scope.url_Dni_anverso = $scope.documentosarc;
        $scope.mod_adultos.Url_dni_anverso = $scope.documentosarc;
      }
      if ($scope.tipo_img == '_dni_reverso') {
        $scope.url_Dni_reverso = $scope.documentosarc;
        $scope.mod_adultos.Url_dni_reverso = $scope.documentosarc;
      }
    }
  };
  $scope.refrescar = function (data) {
    $scope.url_CI_Anverso = data.dtspsl_file_fotocopia_ci;
    $scope.url_CI_Reverso = data.dtspsl_file_fotocopia_ci_r;
    $scope.mod.dtspsl_file_fotocopia_ci = data.dtspsl_file_fotocopia_ci;
    $scope.mod.dtspsl_file_fotocopia_ci_r = data.dtspsl_file_fotocopia_ci_r;
    $scope.url_Cert_nac = data.Url_certificado_nac;
  }
  $scope.refescar_img_adulto = function (data) {
    $scope.url_CI_Anverso = data.dtspsl_file_fotocopia_ci;
    $scope.url_CI_Reverso = data.dtspsl_file_fotocopia_ci_r;
    $scope.mod.dtspsl_file_fotocopia_ci = data.dtspsl_file_fotocopia_ci;
    $scope.mod.dtspsl_file_fotocopia_ci_r = data.dtspsl_file_fotocopia_ci_r;
    $scope.url_Cert_nac = data.Url_certificado_nac;
  }
  $scope.muestra_ci_n = false;
  $scope.muestra_cn_n = false;
  $scope.muestra_dn_n = false;
  $scope.cambiar_n = function (data) {

    $scope.muestra_ci_n = false;
    $scope.muestra_cn_n = false;
    $scope.muestra_dn_n = false;
    if (data == "CI") {
      $scope.muestra_ci_n = true;
    }
    if (data == "CN") {
      $scope.muestra_cn_n = true;
    }
    if (data == "DN") {
      $scope.muestra_dn_n = true;
    }
  }
  $scope.addImage = function (e, idFoto) {
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
    if ($scope.verificador == 'MENORES') {
      switch ($scope.idFoto) {
        case 0:
          $('#url_CI_Anverso').attr("src", result);
          //var b64_1 = result.split('data:image/jpeg;base64,');
          var texto = "image/jpeg";
          var cadena = result;
          if (cadena.indexOf(texto) != -1) {
            var b64_1 = result.split('data:image/jpeg;base64,');
          } else {
            var b64_1 = result.split('data:image/png;base64,');
          }
          $scope.url_CI_Anverso = result;
          //"http://192.168.5.141/rest/files/SCANNER/151790/151790_ci_nacimiento.jpg?app_name=todoangular"
          setTimeout(function () {
            $.ajax({
              type: 'POST',
              contentType: 'application/json; charset=utf-8',
              url: CONFIG.CONEXION_PUENTE_IMG + "/semdes/terminalimagenes.php",
              dataType: 'json',
              data: '{"imagen":"' + b64_1 + '","ci":"' + $scope.validador_img.f01_NNA_G_CI + '","nombre":"' + $scope.validador_img.f01_NNA_G_CI + '_anverso"}',
              success: function (data) {

              },
              error: function (data) {

              }
            });
          }, 1000);
          break;
        case 1:
          $('#url_CI_Reverso').attr("src", result);
          $scope.url_CI_Reverso = result;
          var b64_2 = result.split('data:image/jpeg;base64,');
          setTimeout(function () {
            $.ajax({
              type: 'POST',
              contentType: 'application/json; charset=utf-8',
              url: CONFIG.CONEXION_PUENTE_IMG + "/semdes/terminalimagenes.php",
              dataType: 'json',
              data: '{"imagen":"' + b64_2 + '","ci":"' + $scope.validador_img.f01_NNA_G_CI + '","nombre":"' + $scope.validador_img.f01_NNA_G_CI + '_reverso"}',
              success: function (data) {

              },
              error: function (data) { }
            });
          }, 1000);
          $scope.labels2 = b64_2[1];
          break;
        case 2:
          $('#url_Cert_nac').attr("src", result);
          $scope.url_Cert_nac = result;
          var b64_2 = result.split('data:image/jpeg;base64,');
          setTimeout(function () {
            $.ajax({
              type: 'POST',
              contentType: 'application/json; charset=utf-8',
              url: CONFIG.CONEXION_PUENTE_IMG + "/semdes/terminalimagenes.php",
              dataType: 'json',
              data: '{"imagen":"' + b64_2 + '","ci":"' + $scope.validador_img.f01_NNA_G_CI + '","nombre":"' + $scope.validador_img.f01_NNA_G_CI + '_ci_nacimiento"}',
              success: function (data) {

              },
              error: function (data) { }
            });
          }, 1000);
          $scope.labels2 = b64_2[1];
          break;
        case 3:
          $('#url_Dni_anverso').attr("src", result);
          $scope.url_Dni_anverso = result;
          var b64_2 = result.split('data:image/jpeg;base64,');
          setTimeout(function () {
            $.ajax({
              type: 'POST',
              contentType: 'application/json; charset=utf-8',
              url: CONFIG.CONEXION_PUENTE_IMG + "/semdes/terminalimagenes.php",
              dataType: 'json',
              data: '{"imagen":"' + b64_2 + '","ci":"' + $scope.validador_img.f01_NNA_G_CI + '","nombre":"' + $scope.validador_img.f01_NNA_G_CI + '_dni_anverso"}',
              success: function (data) {

              },
              error: function (data) { }
            });
          }, 1000);
          $scope.labels2 = b64_2[1];
          break;
        case 4:
          $('#url_Dni_reverso').attr("src", result);
          $scope.url_Dni_reverso = result;
          var b64_2 = result.split('data:image/jpeg;base64,');
          setTimeout(function () {
            $.ajax({
              type: 'POST',
              contentType: 'application/json; charset=utf-8',
              url: CONFIG.CONEXION_PUENTE_IMG + "/semdes/terminalimagenes.php",
              dataType: 'json',
              data: '{"imagen":"' + b64_2 + '","ci":"' + $scope.validador_img.f01_NNA_G_CI + '","nombre":"' + $scope.validador_img.f01_NNA_G_CI + '_dni_reverso"}',
              success: function (data) {

              },
              error: function (data) { }
            });
          }, 1000);
          $scope.labels2 = b64_2[1];
          break;
      }
    }
    if ($scope.verificador == 'MAYORES') {
      switch ($scope.idFoto) {
        case 0:
          $('#url_CI_Anverso').attr("src", result);
          var b64_1 = result.split('data:image/jpeg;base64,');
          $scope.url_CI_Anverso = result;
          //"http://192.168.5.141/rest/files/SCANNER/151790/151790_ci_nacimiento.jpg?app_name=todoangular"
          setTimeout(function () {
            $.ajax({
              type: 'POST',
              contentType: 'application/json; charset=utf-8',
              url: CONFIG.CONEXION_PUENTE_IMG + "/semdes/terminalimagenes.php",
              dataType: 'json',
              data: '{"imagen":"' + b64_1 + '","ci":"' + $scope.validador_img.f01_ADUL_G_CI + '","nombre":"' + $scope.validador_img.f01_ADUL_G_CI + '_anverso"}',
              success: function (data) {

              },
              error: function (data) { }
            });
          }, 1000);
          break;
        case 1:
          $('#url_CI_Reverso').attr("src", result);
          $scope.url_CI_Reverso = result;
          var b64_2 = result.split('data:image/jpeg;base64,');
          setTimeout(function () {
            $.ajax({
              type: 'POST',
              contentType: 'application/json; charset=utf-8',
              url: CONFIG.CONEXION_PUENTE_IMG + "/semdes/terminalimagenes.php",
              dataType: 'json',
              data: '{"imagen":"' + b64_2 + '","ci":"' + $scope.validador_img.f01_ADUL_G_CI + '","nombre":"' + $scope.validador_img.f01_ADUL_G_CI + '_reverso"}',
              success: function (data) {

              },
              error: function (data) { }
            });
          }, 1000);
          $scope.labels2 = b64_2[1];
          break;
        case 2:
          $('#url_Cert_nac').attr("src", result);
          $scope.url_Cert_nac = result;
          var b64_2 = result.split('data:image/jpeg;base64,');
          setTimeout(function () {
            $.ajax({
              type: 'POST',
              contentType: 'application/json; charset=utf-8',
              url: CONFIG.CONEXION_PUENTE_IMG + "/semdes/terminalimagenes.php",
              dataType: 'json',
              data: '{"imagen":"' + b64_2 + '","ci":"' + $scope.validador_img.f01_ADUL_G_CI + '","nombre":"' + $scope.validador_img.f01_ADUL_G_CI + '_ci_nacimiento"}',
              success: function (data) {

              },
              error: function (data) { }
            });
          }, 1000);
          $scope.labels2 = b64_2[1];
          break;
        case 3:
          $('#url_Dni_anverso').attr("src", result);
          $scope.url_Dni_anverso = result;
          var b64_2 = result.split('data:image/jpeg;base64,');
          setTimeout(function () {
            $.ajax({
              type: 'POST',
              contentType: 'application/json; charset=utf-8',
              url: CONFIG.CONEXION_PUENTE_IMG + "/semdes/terminalimagenes.php",
              dataType: 'json',
              data: '{"imagen":"' + b64_2 + '","ci":"' + $scope.validador_img.f01_ADUL_G_CI + '","nombre":"' + $scope.validador_img.f01_ADUL_G_CI + '_dni_anverso"}',
              success: function (data) {

              },
              error: function (data) { }
            });
          }, 1000);
          $scope.labels2 = b64_2[1];
          break;
        case 4:
          $('#url_Dni_reverso').attr("src", result);
          $scope.url_Dni_reverso = result;
          var b64_2 = result.split('data:image/jpeg;base64,');
          setTimeout(function () {
            $.ajax({
              type: 'POST',
              contentType: 'application/json; charset=utf-8',
              url: CONFIG.CONEXION_PUENTE_IMG + "/semdes/terminalimagenes.php",
              dataType: 'json',
              data: '{"imagen":"' + b64_2 + '","ci":"' + $scope.validador_img.f01_ADUL_G_CI + '","nombre":"' + $scope.validador_img.f01_ADUL_G_CI + '_dni_reverso"}',
              success: function (data) {
              },
              error: function (data) { }
            });
          }, 1000);
          $scope.labels2 = b64_2[1];
          break;
      }
    }

  }


  $scope.guardar_grillas = function () {
    var datos = $scope.datos;
    //$scope.gard_tra = "OK";
    if (datos.TER_FEC_RET) {
      if (datos.TER_FEC_RET.length > 10) {
        $scope.fecinic = datos.TER_FEC_RET.split("T");
        datos.TER_FEC_RET = $scope.fecinic[0];
      }
    }
    if (datos.TER_FEC_FIN) {
      if (datos.TER_FEC_FIN.length > 10) {
        $scope.fecfinc = datos.TER_FEC_FIN.split("T");
        datos.TER_FEC_FIN = $scope.fecfinc[0];
      }
    }
    $.blockUI();
    var titulosnna = [{
      "tipo": "GRD",
      "titulos": "Tipo Doc|Numero de Doc|Exp.|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Género|Macro|Dirección|Telf. 1|Cel. 2",
      "campos": "f01_NNA_TIP_DOC_valor|f01_NNA_G_CI|f01_NNA_EXP_CIUD_valor|f01_NNA_G_NOM|f01_NNA_G_APAT|f01_NNA_G_AMAT|f01_NNA_G_FEC_NAC|f01_NNA_G_LUG_NAC_valor|f01_NNA_G_CIUD_valor|f01_NNA_G_GEN_valor|f01_NNA_TER_MACRO_valor|f01_NNA_DIR|f01_NNA_TER_TEL|f01_NNA_G_TELF",
      "impresiones": "true|true|true|true|true|true|true|true|true|true|true|true|true|true"
    }];
    datos.TER_NNA_VIAJAN = titulosnna;
    for (var i = 0; i < $scope.grid_n.length; i++) {
      if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor) {
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "LPZ") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "LA PAZ"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "ORU") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "ORURO"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "PTS") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "POTOSI"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "CBB") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "COCHABAMBA"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "CHQ") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "CHUQUISACA"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "TJA") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "TARIJA"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "BNI") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "BENI"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "PND") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "PANDO"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "SCZ") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "SANTA CRUZ"; }
        if ($scope.grid_n[i].f01_NNA_EXP_CIUD_valor == "EXT") { $scope.grid_n[i].f01_NNA_EXP_CIUD = "EXTERIOR"; }
      }
      if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor) {
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "1") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 1 COTAHUMA"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "2") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 2 MAXIMILIANO PAREDES"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "3") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 3 PERIFERICA"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "4") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 4 SAN_ANTONIO"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "5") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 5 SUR"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "6") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 6 MALLASA"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "7") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 7 CENTRO"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "8") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 8 HAMPATURI"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "9") { $scope.grid_n[i].f01_NNA_TER_MACRO = "MACRODISTRITO 9 ZONGO"; }
        if ($scope.grid_n[i].f01_NNA_TER_MACRO_valor == "10") { $scope.grid_n[i].f01_NNA_TER_MACRO = $scope.grid_n[i].f01_NNA_TER_MACRO_valor }
      }
      try {
        datos.TER_NNA_VIAJAN.push($scope.grid_n[i]);
      } catch (e) {
      }
    }
    var titulosrep = [{
      "tipo": "GRD",
      "titulos": "CI|Exp.|Parentesco/ Condición|Nombre|Apellido Paterno|Apellido Materno|Fecha de Nac.|Lugar de Nac.|Ciudad de Residencia|Exterior|Género|Macro|Zona|Dirección|Telf. 1|Cel. 2|Viaja/ Autoriza",
      "campos": "f01_ADUL_G_CI|f01_ADUL_EXP_CIUD_valor|f01_ADUL_G_PARE_COND_valor|f01_ADUL_G_NOM|f01_ADUL_G_APAT|f01_ADUL_G_AMAT|f01_ADUL_G_FEC_NAC|f01_ADUL_LUG_NAC|f01_ADUL_TER_CIUD|f01_ADUL_DEPA_OTRO|f01_ADUL_G_GEN_valor|f01_ADUL_TER_MACRO_valor|f01_ADUL_TER_ZONA|f01_ADUL_DIR|f01_ADUL_TER_TEL|f01_ADUL_G_TELF|f01_ADUL_G_VA_valor",
      "impresiones": "true|true|true|true|true|true|true|no|true|no|true|no|true|true|no|true|true|"
    }];
    datos.TER_RESP = titulosrep;
    for (var i = 0; i < $scope.grid_a.length; i++) {
      if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor) {
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "LPZ") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "LA PAZ"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "ORU") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "ORURO"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "PTS") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "POTOSI"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "CBB") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "COCHABAMBA"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "CHQ") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "CHUQUISACA"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "TJA") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "TARIJA"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "BNI") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "BENI"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "PND") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "PANDO"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "SCZ") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "SANTA CRUZ"; }
        if ($scope.grid_a[i].f01_ADUL_EXP_CIUD_valor == "EXT") { $scope.grid_a[i].f01_ADUL_EXP_CIUD = "EXTERIOR"; }
      }
      if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor) {
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "1") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 1 COTAHUMA"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "2") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 2 MAXIMILIANO PAREDES"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "3") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 3 PERIFERICA"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "4") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 4 SAN_ANTONIO"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "5") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 5 SUR"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "6") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 6 MALLASA"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "7") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 7 CENTRO"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "8") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 8 HAMPATURI"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "9") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "MACRODISTRITO 9 ZONGO"; }
        if ($scope.grid_a[i].f01_ADUL_TER_MACRO_valor == "10") { $scope.grid_a[i].f01_ADUL_TER_MACRO = "OTROS"; }
      }
      try {
        datos.TER_RESP.push($scope.grid_a[i]);
      } catch (e) {

      }
    }
    datos.Tipo_tramite_creado = "WEB";
    try {
      var datosSerializados = JSON.stringify(datos);
      var idCiudadano = sessionService.get('IDSOLICITANTE');
      var serializarInfo = new reglasnegocio();
      serializarInfo.identificador = 'RCCIUDADANO_80';
      serializarInfo.parametros = JSON.stringify({ "id_servicio": $scope.idServicio, "data_json": datosSerializados, "oid_ciudadano": idCiudadano, "id_usuario": 1, "id_trm_form": $scope.idTramite });
      serializarInfo.llamarregla(function (results) {
        r = JSON.parse(results);
        if (r.error) {
          $.unblockUI();
          alertify.success('Formulario no almacenado');
        } else {
          $.unblockUI();
          alertify.success('Formulario almacenado');
        }
      });
    } catch (e) {

    }
  }


}
