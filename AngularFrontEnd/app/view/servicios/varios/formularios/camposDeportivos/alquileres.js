
function alquileresController($scope, $q, $window, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, $timeout, obtFechaCorrecta, $route, obtFechaActual, fileUpload1, $sce) {

  $scope.qrcodeString = "";
  $scope.size = 100;
	$scope.correctionLevel = '';
	$scope.typeNumber = 0;
	$scope.inputMode = '';
	$scope.image = true;  

  $scope.oidCiu = sessionService.get('IDCIUDADANO');

  $scope.urlPagoTarjeta = null;

  $scope.macrodistritos = [];
  $scope.selectedItemMacrodistrito = "-1";

  $scope.lstCamposDep = [];
  $scope.selectedItemCamDep = "-1";
  $scope.selectedItemCamDepDATA = null;


  $scope.lstCanchasDep = [];
  $scope.selectedItemCanchaDep = "-1";
  $scope.selectedItemCanchaDepDATA = null;

  $scope.markerGPS = null;
  $scope.abrirmodal = "";

  

  $scope.tblSemana = [];
  $scope.tblHoras = [];

  $scope.celdasUser = [];
  $scope.celdaSemana = null;
  $scope.celdaHora = null;

  $scope.isLoaderTable = false;

  $scope.costoCancha = 5;
  $scope.costoTotalCancha = 0;

  $scope.fechaInput_ = new Date();

  $scope.obtMap = null;
  $scope.obtMapCenter = {
    center: [-68.095184, -16.525105],
    zoom: 13
  };
  $scope.JSONvectorPuntos = null;

  $scope.itemFeatures = null;

  $scope.tablareservas = [];
  $scope.lstAlquileres = [];


  $scope.tokenSierra = "";
  $scope.fechaanteriorBloc = new Date();
  $scope.fechaMin_ = $scope.fechaanteriorBloc.getFullYear() + '-' + ("0" + ($scope.fechaanteriorBloc.getMonth() + 1)).slice(-2) + '-' + ("0" + ($scope.fechaanteriorBloc.getDate())).slice(-2);
  //$scope.modalShow = false;
  $scope.features = {};
  $scope.canchasData = {};

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

  function procesando(){
    var texto   = $("<div>", {
     text    : "PROCESANDO....",
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


  $scope.inicio = function () {
    $scope.loadDataMap();
    $scope.getDatosCiudadano();
    $scope.getTokenSierraServices();
    $scope.getMacrodistritos();
    $scope.condiciones();
  }

  $scope.condiciones = function () {   
      $('#condicionesUso').modal('show');    
  };

  $scope.getTokenSierraServices = async function () {
    var token = await $scope.getTokenSierraDeportesDefer();
    $scope.tokenSierra = token.token;
    localStorage.setItem('token_sierra', token.token);
  }

  $scope.$on('api:ready', function () {
    
  });

  $scope.getDatosCiudadano = function () {
    var datosCiudadano = new rcNatural();
    datosCiudadano.oid = $scope.oidCiu;
    datosCiudadano.datosCiudadanoNatural(function (results) {
      var resp = JSON.parse(results);
      $scope.datosCiudadano = resp[0];
    });

  };

  $scope.getMacrodistritos = function () {
    $scope.macrodistritosDefer().then(function (data) {
      $scope.macrodistritos = data.data;
    });
  }

  /** YEISON */
  $scope.getListarPagosM = function (xidRegistro, xnroMemo, xidcanchaDep) {

    var vtoken = $scope.tokenSierra;
    var url = jsonURLS.CONEXION_DEPORTES_SIERRA + '/api/listarPagosMultiples';
    
    var sendData = {
      "id_registro": xidRegistro,
      "nro_memorandum": xnroMemo,
      "id_cancha": xidcanchaDep
    };

    var def = $q.defer();
    $.ajax({

      type: "POST",
      url: url,
      headers: {
        'authorization': 'Bearer ' + vtoken,
        'Content-type': 'application/json'
      },
      data: JSON.stringify(sendData),
      async: false,
      success: function (data) {
        def.resolve(data);
      },
      error: function (e) {
      }
    });
    return def.promise;
  }



  $scope.getHorariosDefer = function (idCanchaDep, xfechareserv) {

    var vtoken = $scope.tokenSierra;
    var url = jsonURLS.CONEXION_DEPORTES_SIERRA + '/api/listarHorariosCancha';
    var sendData = {
      idCanchaDep: idCanchaDep,
      xfechareserv: xfechareserv,
    };
    var def = $q.defer();
    $.ajax({

      type: "POST",
      url: url,
      headers: {
        'authorization': 'Bearer ' + vtoken,
        'Content-type': 'application/json'
      },
      data: JSON.stringify(sendData),
      async: false,
      success: function (data) {
        def.resolve(data);
      },
      error: function (e) {
      }
    });
    return def.promise;
  };



  $scope.horariosSemana = [];
  $scope.horas = [];
  $scope.horaris = [];
  $scope.horasPrecio = [];
  $scope.horasSinPrecio = [];

  

  $scope.tablaSemana = async function (dt) {
    $scope.isLoaderTable = true;
    $scope.celdasUser = [];
    $scope.costoTotalCancha = 0;
    var canchaDepId = $scope.selectedItemCanchaDep;
    var fechaSelect = $scope.fechaInput_;
    var xfechareserv = fechaSelect.getDate() + '/' + (fechaSelect.getMonth() + 1) + '/' + fechaSelect.getFullYear();

    var respFechaActual = await $scope.listarFechaActual();
    $scope.actualFecha = respFechaActual.data.fecha;
    $scope.actualHora = respFechaActual.data.hora;

    var semana_ = $scope.getWeeks(dt);
    var resptoken = await $scope.tokenFacturacion();
    const TOKEN_FACTURA = resptoken.data.token;
    var datacandep = {
      "numero_sucursal": $scope.selectedItemCamDepDATA.xcampo_deportivo_id_suc
    };
    var respCatalago = await $scope.getCatalagoDef(datacandep, TOKEN_FACTURA);
    $scope.data_catalogo = respCatalago.data;
    var cont = 0;
    for (const key in semana_) {
      if (Object.hasOwnProperty.call(semana_, key)) {
        const element = semana_[key];
        $scope.nuevohorasPrecio = [];

        var idCanchaDep = canchaDepId;
        var xfechareserv = element.fechaF;
        var prom = await $scope.getHorariosDefer(idCanchaDep, xfechareserv);
        if (prom.data[0] != null) {
          $scope.idCanchaDep = prom.data[0].hrcan_candep_id;
          var horasPrecio = JSON.parse(prom.data[0].hrcan_horarios);
          $scope.nuevoHorario = {};
            if (prom.data[0].hrcan_fecha == $scope.actualFecha) {
              for (let i = 0; i < horasPrecio.length; i++) {
                const element = horasPrecio[i];
                if ($scope.actualHora >= horasPrecio[i].i) {
                  $scope.nuevoHorario = {
                    d: "FUERA DE HORARIO",
                    e: "HP",
                    f: horasPrecio[i].f,
                    h: horasPrecio[i].h,
                    i: horasPrecio[i].i,
                    id: horasPrecio[i].id,
                    t: horasPrecio[i].t
                  };
                  $scope.nuevohorasPrecio.push($scope.nuevoHorario);
                } else {
                  $scope.nuevohorasPrecio.push(horasPrecio[i]);
                }
              }
              $scope.horasPrecio =  $scope.nuevohorasPrecio;
            } else {
              $scope.horasPrecio =  horasPrecio;
            }

          semana_[key].horarios = $scope.horasPrecio;

        }else{
          semana_[key].horarios = $scope.horasSinPrecio;
          cont = cont + 1;
        }  
      }
    }

    if (cont > 0) {
      //alertify.error('No existe horario creado');
    } else {
      
    }
    
    var dataidSucrl = {
      "idCancha": $scope.idCanchaDep
    };
    var respSucursal = await $scope.getlistarSucursal(dataidSucrl);
    $scope.iditemreca = respSucursal.data;
    $scope.selectedItemCanchaDepDATA_2 = [];
    $scope.variablesHorario = [];
    var anio = ($scope.actualFecha.split('-'))[0];

    for (let i = 0; i < $scope.iditemreca.length; i++) {
      for (let j = 0; j < $scope.data_catalogo.length; j++) {     
        if ($scope.iditemreca[i].itemrecaudador == $scope.data_catalogo[j].codigo_item) { 
          $scope.variablesHorario = {
            "descripcion":$scope.data_catalogo[j].descripcion,
            "precio":$scope.data_catalogo[j].precio,
            "idsucursal":$scope.data_catalogo[j].numero_sucursal,
            "idunirec":$scope.data_catalogo[j].unidad_recaudadora,
            "gestion":anio,
            "tipo":$scope.iditemreca[i].itemcamdep_tipo,
            "itemrec":$scope.iditemreca[i].itemrecaudador,
            "iditem":$scope.data_catalogo[j].id_item
        }
        $scope.selectedItemCanchaDepDATA_2.push($scope.variablesHorario);
        } else {
          
        } 
      }
    }

    var itemsCanchas = $scope.selectedItemCanchaDepDATA_2;
    if (itemsCanchas.length != 0) {
      $scope.gestionItem = itemsCanchas[0].gestion;
    } else {
      alertify.error('No hay relacion con el item');
      //alertify.error('No existe horario creado');
    }

    $scope.horasPrecio.forEach(hora => {
      if (hora.t == 1) {
        var itm = itemsCanchas.find(x => x.tipo == 'D');
        try {
          hora.item = itm;
        } catch (error) {
        }

        try {
          hora.costo = itm.precio;
        } catch (error) {
        }
      }
      if (hora.t == 2) {
        var itm = itemsCanchas.find(x => x.tipo == 'N');
        try {
          hora.costo = itm.precio;
        } catch (error) {

        }

        try {
          hora.item = itm;
        } catch (error) {

        }
      }
    });

    $scope.tblSemana = semana_;
    $scope.tblHoras = $scope.horasPrecio;
    $scope.isLoaderTable = false;
    $scope.$apply();
  };  


  $scope.tblReservas = [];
  $scope.seleccionar = function(semana,hora){
    $scope.fecha_actual = $scope.fechaInput_;
    
    $scope.tt = $scope.fecha_actual.toString();
		if ($scope.tt.length >= 11) {
			var fec0 = $scope.tt;
			var fecnac = new Date(fec0);
			var mes = fecnac.getMonth() + 1;
			var dia = fecnac.getDate()
			if (fecnac.getDate() < 10) {
				dia = "0" + dia;
			}
			if (fecnac.getMonth() < 9) {
				mes = "0" + mes;
			}
			$scope.fecha_actual = fecnac.getFullYear() + "-" + mes + "-" + dia;
		}
    var fecha = semana.fechaF2;
    var monto = hora.precio;
    var hora1 = hora.horario;
    var cancha = hora.item_descripcion;
    if (semana.fechaF2 == $scope.fecha_actual) {
      $scope.tblReservas.push({
        "fecha":fecha,
        "hora":hora1,
        "cancha":cancha,
        "monto":monto 
      });
    } else {
      $scope.tblReservas.push({
        "fecha":fecha,
        "hora":hora1,
        "cancha":cancha,
        "monto":monto 
      });
    };
  };

  $scope.estadoCelda = function (hora, semana, semdia) {   
    if(semdia=="Lunes"){
      return "celda-error";
    } 
    var resp = "null";

    try {
      var horario = semana.horarios.find(x => x.i == hora.i);
      resp = horario.d;
      resp1 = horario.h; 
      $scope.descripcionEstado = resp;
      $scope.horarioAct = resp1;
      if (horario.e == "R") { //proceso de reserva
        resp = "cel-reserva"
      }
      
      if (horario.e == "HP") { //fuera de horario
        resp = "cel-fuera"
      } 

      if (horario.e == "P") { // Reserva Pagada
        resp = "cel-ocupado"
      }

      if (horario.e == "M") { // Mantenimiento
        resp = "cel-mantenimiento"
      }

      if (horario.e == "G") { // Actividad
        resp = "cel-actividad"
      }

      if (horario.e == "RL") { // Reserva masiva
        resp = "cel-masiva"
      }

      if (horario.e == "RPH") { // Reprogramacion
        resp = "cel-reprogramacion"
      }

      if (horario.e == "ND") { // No Disponible
        resp = "cel-noDisponible"
      }

    } catch (error) {

      resp = "celda-error";

    }
    return resp;
  };


  $scope.getWeeks = function (dt) {

    var week = [];
    var id_ = 1;
    var fechaHoy_ = moment(dt);
    var startOfWeek = moment(dt).startOf("isoWeek");
    var endOfWeek = moment(dt).endOf("isoWeek");

    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day);
      day = day.clone().add(1, "d");
    }

    days.forEach((f) => {
      id_++;
      var diaActual = f.format("DD") == fechaHoy_.format("DD");
      var diaAnterior = moment($scope.fechaMin_) <= f;

      week.push({
        id: id_,
        dia: $scope.changeLang(f.format("dddd")),
        diaAnterior,
        diaActual,
        fechaF: f.format("DD/MM/YYYY"),
        fechaF2: f.format("YYYY-MM-DD"),
        fecha: f.format("DD"),
        mes: f.format("MMM")
      });
    });
    return week;
  }


  $scope.onChangeFecha = function () {
    var item = $scope.selectedItemCanchaDep;
    var fechaSelect = $scope.fechaInput_;
    if (item != '-1' && fechaSelect != null) {
      $scope.tablaSemana($scope.fechaInput_);
    }
  };

  $scope.getMesL = function (fecha) {
    var f = fecha.getMonth();
    return $scope.changeLangMeses(f);
  }


  $scope.changeLangMeses = function (mes) {
    var resp = 'Error'
    switch (mes) {
      case 0:
        resp = 'Enero';
        break;


      case 1:
        resp = 'Febrero';
        break;

      case 2:
        resp = 'Marzo';
        break;

      case 3:
        resp = 'Abril';
        break;

      case 4:
        resp = 'Mayo';
        break;

      case 5:
        resp = 'Junio';
        break;

      case 6:
        resp = 'Julio';
        break;

      case 7:
        resp = 'Agosto';
        break;

      case 8:
        resp = 'Septiembre';
        break;

      case 9:
        resp = 'Octubre';
        break;

      case 10:
        resp = 'Noviembre';
        break;

      case 11:
        resp = 'Diciembre';
        break;
      default:
        resp = mes;
        break;
    }
    return resp;
  }

  $scope.changeLang = function (semana) {
    var resp = 'Error'

    switch (semana) {
      case 'Monday':
        resp = 'Lunes';
        break;

      case 'Tuesday':
        resp = 'Martes';
        break;

      case 'Wednesday':
        resp = 'Miercoles';
        break;

      case 'Thursday':
        resp = 'Jueves';
        break;

      case 'Friday':
        resp = 'Viernes';
        break;

      case 'Saturday':
        resp = 'Sábado';
        break;

      case 'Sunday':
        resp = 'Domingo';
        break;

      default:
        resp = semana;
        break;
    }

    return resp;

  }
  $scope.listCamposDep = function (macrodistritoId) {

    /**
     * Campos deportivos
     */
     var macroD = {
         "macrodistritoId": parseInt(macrodistritoId)
     };
     $scope.getCamposDeportivosDef(macroD).then(function (resultado) {
         var resp = resultado.data;
         $scope.lstCamposDep = resp;
     });
  };

  $scope.btnCeldaNoClick = function () {

  }

  $scope.btnCelda = function (semana, hora) {
    if (hora.precio == 0) {
      alertify.error('No disponible, sin monto');
      return false;
    }
    var horario = semana.horarios.find(x => x.h == hora.h);
    var horaInicioId = -1;
    var horaFinId = -1;

    
    if (horario.e === "P" || horario.e === "HP" || horario.e === "M" || horario.e === "G" || horario.e === "RL" || horario.e === "RPH" || horario.e === "ND") { // ocupado
      console.log("ENTRO POR AQUI.......");
      return false;      
    }else{
      const COSTO = parseFloat(hora.item.precio);
      console.log(COSTO);
      var existeItem = $scope.celdasUser.find(x => x.semana == semana.id && x.hora == hora.id);
      var IDDinamic = semana.id + '' + hora.id;
      if (existeItem == undefined) { ///
        /**
        * Marca la celdaa
        */
        if ($scope.celdaSemana != null) {
          for (let index = 0; index < $scope.celdaSemana.length; index++) {
            const element = $scope.celdaSemana[index].semana;
            if (element == semana.id) {
    
              /**
               * valida el marcado continuo
               */
              try {
                var pInicio = $scope.celdasUser[0];
                var pFin = $scope.celdasUser[$scope.celdasUser.length - 1];
                horaInicioId = pInicio.hora;
                horaFinId = pFin.hora;
              } catch (error) {
              }
    
    
              if (horaInicioId != -1) {
                if ((horaInicioId) == (hora.id + 1)) {
                  $scope.marcaRegistraCelda(IDDinamic, semana, hora, "I");
                  return false;
                }
    
              }   
    
              if (horaFinId != -1) {
                if ((horaFinId + 1) == hora.id) {
                  $scope.marcaRegistraCelda(IDDinamic, semana, hora);
                  return false;
                }
              }    
              alertify.error('Seleccione horarios continuos');
    
            } else {
              /**
               * elimina todas las celdas marcadas
               */
              alertify.error('No se puede seleccionar diferentes fechas');
              $scope.limpiarTablaSemana();
    
              /**
               * reset columna
               */
              $scope.celdaSemana = null;
              $scope.celdaHora = null;
              $scope.costoTotalCancha = 0;
              $scope.marcaRegistraCelda(IDDinamic, semana, hora);    
            }
          }
        } else {
          $scope.marcaRegistraCelda(IDDinamic, semana, hora);
        }
      } else {
        /**
         * Valida celda inicio y fin
         */
        var pInicio = $scope.celdasUser[0];
        var pFin = $scope.celdasUser[$scope.celdasUser.length - 1];

        if ((pInicio.hora) == (hora.id) || (pFin.hora) == (hora.id)) {

          /**
          * Quita el marcado de la celda y resta el monto
          */
          $scope.costoTotalCancha = $scope.costoTotalCancha - parseFloat(COSTO);
          angular.element('#' + IDDinamic).removeClass("celda-select-user");

          for (let index = 0; index < $scope.celdasUser.length; index++) {
            const element = $scope.celdasUser[index];
            if (element.id == existeItem.id) {
              $scope.celdasUser.splice(index, 1);
            }
          }

          if ($scope.celdasUser.length == 0) {
            $scope.celdaSemana = null;
            $scope.celdaHora = null;
            $scope.costoTotalCancha = 0;
          }
        }
      }
    }
  }

  $scope.selecHora = [];
  $scope.marcaRegistraCelda = function (IDDinamic, semana, hora, position = 'F') {
    const TIPO = hora.t; // si es dia o noche
    const COSTO = hora.item.precio;
    const ITEM = $scope.selectedItemCanchaDepDATA.xitems_candep.find(x => x.item_tipo == TIPO);

    /**
     * marca la celda
     */
    angular.element('#' + IDDinamic).addClass("celda-select-user");

    if (position == "F") {
      /**
       * Agrega Final
       */
      $scope.celdasUser.push({
        id: new Date().getUTCMilliseconds(),
        semana: semana.id,
        semanaData: semana,
        tipo: TIPO,
        hora: hora.id,
        horaData: hora,
        // item: ITEM,
        costo: COSTO
      });

    }
    if (position == "I") {
      /**
       * Agrega Inicio
       */
      $scope.celdasUser.unshift({
        id: new Date().getUTCMilliseconds(),
        semana: semana.id,
        semanaData: semana,
        tipo: TIPO,
        hora: hora.id,
        horaData: hora,
        // item: ITEM,
        costo: COSTO
      });

    }

    /**
     * columna selecionada
     */
     $scope.bloquear = 0;
    var celda0 = $scope.celdasUser;    

    $scope.celdaSemana = celda0;
    $scope.celdaHora = celda0.hora;

    /**
     * Suma el monto total
     */
    $scope.costoTotalCancha = $scope.costoTotalCancha + parseFloat(COSTO);

  }

  $scope.limpiarTablaSemana = function () {
    $scope.costoTotalCancha = 0;
    for (let index = 0; index < $scope.celdasUser.length; index++) {
      const element = $scope.celdasUser[index];
      var IDDinamic = element.semana + '' + element.hora;
      angular.element('#' + IDDinamic).removeClass("celda-select-user");
    }
    $scope.celdasUser = [];
  }


  $scope.parseDataMacro = function (dat) {
    var resp = JSON.parse(dat.xmacrodistrito_data);
    return resp;
  };

  $scope.parseData = function (dat) {
    var resp = JSON.parse(dat.xcampo_deportivo_data);
    return resp;
  };

  $scope.changeMacrodistrito = function () {
    var item = $scope.selectedItemMacrodistrito;
    $scope.lstCanchasDep = [];
    $scope.tblSemana = [];
    $scope.listCamposDep(item);
  };


  $scope.changeCamposDeportivos = function () {
    var item = $scope.selectedItemCamDep;
    var selectitem = $scope.lstCamposDep.find(x => x.xcampo_deportivo_id == item);
    $scope.selectedItemCamDepDATA = selectitem;
    $scope.tblSemana = [];
    /**
     * filtrar
     */
    var datacandep = {
      "idSuc": selectitem.xcampo_deportivo_id_suc,
      "idCamDep": selectitem.xcampo_deportivo_id
    };
    $scope.getListarCanchasDeportivasDefer(datacandep).then(function (resultado) {
      var resp = resultado.data;
      $scope.lstCanchasDep = resp;
      $scope.itemFeatures = null;
    });

  };


  $scope.changeCampoDeportivo = function () {
    var item = $scope.selectedItemCanchaDep;
    var fechaSelect = $scope.fechaInput_;
    if (item != '-1' && fechaSelect != null) {
      try {
        var features_ = $scope.canchasData.features;
        var respFeatures = features_.find(x => x.properties.Codigo == item);

        $scope.itemFeatures = respFeatures.properties;
        var latLog = respFeatures.geometry.coordinates;

        $scope.setCenterPositionMarker([latLog[0], latLog[1]], 18);
        $scope.drawMarkerGPS([latLog[0], latLog[1]]);
      } catch (error) {

      }

      //reset
      $scope.celdaSemana = null;
      $scope.celdaHora = null;
      $scope.costoTotalCancha = 0;
      $scope.celdasUser = [];

      $scope.tablaSemana($scope.fechaInput_);
      var selectitem = $scope.lstCanchasDep.find(x => x.xcandep_id == item);
      $scope.selectedItemCanchaDepDATA = selectitem;
      var nombre_ = selectitem.xcandep_nombre;
      var descripcion_ = selectitem.xcandep_descripcion

    }
  }


  $scope.datosFactura =  function () {    
    if ($scope.datosCiudadano.dtspsl_direccion != "" && $scope.datosCiudadano.dtspsl_direccion != undefined && $scope.datosCiudadano.dtspsl_direccion != null) {
      cargando();
      $scope.abModalFacts = "#modalDatosFactura";
      var idSucurs = $scope.selectedItemCamDepDATA.xcampo_deportivo_id_suc;
      var sendData = {
        "solicitud": "cufd",
        "data": {
          "sucursal": idSucurs,
          "punto_venta": 0,
          "id_usuario": jsonURLS.ID_USUARIO_FACTURADOR
        }
      };
      var url = jsonURLS.CONEXION_FACTURACION_V2 + 'api/siat/cufd';
      $.ajax({
          type: "POST",
          url: url,
          headers: {
              'Content-type': 'application/json'
          },
          data: JSON.stringify(sendData),
          success: function (data) {
              if (data.codigo == 200) {
                $scope.datosFact = {};
                $scope.datosFact.nit = parseInt($scope.datosCiudadano.dtspsl_ci);
                $scope.datosFact.razon_social = $scope.datosCiudadano.dtspsl_paterno;
                $scope.datosFact.correo = $scope.datosCiudadano.dtspsl_correo;
                $scope.datosFact.celular = $scope.datosCiudadano.dtspsl_movil;
                $scope.habPago = false;
                $scope.habMetodos = true;
                $scope.habQR = false;
                $scope.habTarjeta = false;
                $scope.habAlerta = false;
                $scope.listarTipDoc();
                $.LoadingOverlay("hide");    
              } else {
                alertify.error('PROBLEMAS CON EL CUFD DE LA SUCURSAL');
                $.LoadingOverlay("hide");
              }
          },
          error: function (e) {
            console.log("ERROR", e);
          }
      });
    } else {
      alertify.error('Completar su direccion en editar información Por favor');
    }
  };  

  $scope.btnPagar = async function (datosFact) {
    procesando();
    $scope.habPago = false;
    $scope.habMetodos = false;
    $scope.habQR = false;
    $scope.habTarjeta = true;
    $scope.habAlerta = false;
    var respRegistrarPago = "";
    $('#vistaPago').attr('src','');

    var ci_nit = 0;

    if (datosFact.nit != '' && datosFact.nit != null && datosFact.nit != undefined) {
      ci_nit = datosFact.nit;
    }else{
      if (datosFact.ci != '' && datosFact.ci != null && datosFact.ci != undefined) {
        ci_nit = datosFact.ci;
      } else {
        ci_nit = 0;
      }
    }

    /*setTimeout(() => {
      $.blockUI();
    }, 500);*/

    /**
     * Campo deportivo seleccionado
     */
    const SELECT_CAMP_DEP = $scope.selectedItemCamDepDATA;
    const SUCURSAL_ID = SELECT_CAMP_DEP.xcampo_deportivo_id_suc;
    const CAMP_DEP_ID = SELECT_CAMP_DEP.xcampo_deportivo_id;
    const CAMP_DEP_NOMBRE = JSON.parse(SELECT_CAMP_DEP.xcampo_deportivo_data).descripcionItem;
    /**
     * Cancha deportiva seleccionado
     */
    const SELECT_CANCHA_DEP = $scope.selectedItemCanchaDepDATA;
    const CANCHA_DEP_ID = SELECT_CANCHA_DEP.xcandep_id;
    const CANCHA_DEP_ITEMS = SELECT_CANCHA_DEP.xitems_candep;
    const OID_C = $scope.datosCiudadano._id;
    const CI_ = $scope.datosCiudadano.dtspsl_ci;
    const AP_PATERNO_ = $scope.datosCiudadano.dtspsl_paterno;
    const AP_MATERNO_ = $scope.datosCiudadano.dtspsl_materno;
    const NOMBRES_ = $scope.datosCiudadano.dtspsl_nombres;
    const CORREO_ = $scope.datosCiudadano.dtspsl_correo;
    const CELULAR_ = $scope.datosCiudadano.dtspsl_movil;
    const DIRECCION_ = $scope.datosCiudadano.dtspsl_direccion;
    const FECHA_SELECT_USER = $scope.fechaInput_;
    var FECHA_ = FECHA_SELECT_USER.getDate() + '/' + (FECHA_SELECT_USER.getMonth() + 1) + '/' + FECHA_SELECT_USER.getFullYear();

    /**
     * obtener hora de inicio y fin
     */
    var horaInicio_ = null;
    var horaFin_ = null;

    try {
      FECHA_ = $scope.celdasUser[0].semanaData.fechaF;
      horario = $scope.celdasUser[0].horaData.i;
      horaInicio_ = horario;
      for (let index = 0; index < $scope.celdasUser.length; index++) {
        $scope.horaFinal = $scope.celdasUser[index].horaData.f;
        
      }
      horaFin_ = $scope.horaFinal;

    } catch (error) {
    }


    const TOTAL_PAGAR = $scope.costoTotalCancha;
    const arraySelectCelda = $scope.celdasUser;
    $scope.detalleOdm = [];
    $scope.itemsPagoTarjeta = [];
    $scope.NroCeldasDia = 0;
    $scope.NroCeldasNoche = 0;
    $scope.detalleItemDia = {};
    $scope.detalleItemNoche = {};
    $scope.itemDia = {};
    $scope.itemNoche = {};
    
      for (let index = 0; index < arraySelectCelda.length; index++) {
        const turnoReserva = arraySelectCelda[index].tipo;
        if (turnoReserva == 1) {
            /**
             * Dia
             */
            
            try {
              $scope.NroCeldasDia = $scope.NroCeldasDia + 1;
              const celdas0Dia = arraySelectCelda[index];
              const pre_unitario_dia = celdas0Dia.costo;
              const pre_total_dia = parseFloat(pre_unitario_dia) * $scope.NroCeldasDia;
              const item_recaudador_dia = celdas0Dia.horaData.item.itemrec;
              const unidad_recaudadora_dia = celdas0Dia.horaData.item.idunirec;
              const odm_concepto_dia = celdas0Dia.horaData.item.descripcion;
              const idItem = celdas0Dia.horaData.item.iditem;

              $scope.detalleItemDia = {
                "odm_cantidad": $scope.NroCeldasDia,
                "odm_sub_total": pre_total_dia,
                "odm_pre_unitario": pre_unitario_dia,
                "odm_item_recaudador": item_recaudador_dia,
                "odm_concepto": odm_concepto_dia+' '+FECHA_+' '+horaInicio_+' '+horaFin_,

              };
              $scope.itemDia = {
                "concepto": odm_concepto_dia+' '+FECHA_+' '+horaInicio_+' '+horaFin_,
                "cantidad": $scope.NroCeldasDia,
                "precio_unitario": parseFloat(pre_unitario_dia),
                "cod_Item_recaudador": item_recaudador_dia,
                "monto_descuento": 0.00,
                "subtotal": pre_total_dia,
                "id_item": idItem
              };
            
            } catch (error) {

            }

        } else {
              /**
             * Noche
             */

            
            try {
              $scope.NroCeldasNoche = $scope.NroCeldasNoche + 1;
              const celdas0Noche = arraySelectCelda[index];
              const pre_unitario_noche = celdas0Noche.costo;
              const pre_total_noche = parseFloat(pre_unitario_noche) * $scope.NroCeldasNoche;
              const item_recaudador_noche = celdas0Noche.horaData.item.itemrec;
              const unidad_recaudadora_noche = celdas0Noche.horaData.item.idunirec;
              const odm_concepto_noche = celdas0Noche.horaData.item.descripcion;
              const idItem = celdas0Noche.horaData.item.iditem;

              $scope.detalleItemNoche = {
                "odm_cantidad": $scope.NroCeldasNoche,
                "odm_sub_total": pre_total_noche,
                "odm_pre_unitario": pre_unitario_noche,
                "odm_item_recaudador": item_recaudador_noche,
                "odm_concepto": odm_concepto_noche+' '+FECHA_+' '+horaInicio_+' '+horaFin_,
              };
              $scope.itemNoche = {
                "concepto": odm_concepto_noche+' '+FECHA_+' '+horaInicio_+' '+horaFin_,
                "cantidad": $scope.NroCeldasNoche,
                "precio_unitario": parseFloat(pre_unitario_noche),
                "cod_Item_recaudador": item_recaudador_noche,
                "monto_descuento": 0.00,
                "subtotal": pre_total_noche,
                "id_item": idItem
              };

            } catch (error) {

            }
        }
      }
      
      
      if ($scope.detalleItemDia.odm_cantidad != null) {
        $scope.detalleOdm.push($scope.detalleItemDia);
        $scope.itemsPagoTarjeta.push($scope.itemDia);
      }
      
      if ($scope.detalleItemNoche.odm_cantidad != null) {
        $scope.detalleOdm.push($scope.detalleItemNoche);
        $scope.itemsPagoTarjeta.push($scope.itemNoche);
      }

    // Para dia y noche
    const celdas0 = arraySelectCelda[0];
    const unidad_recaudadora = celdas0.horaData.item.idunirec;

    var vtoken = $scope.tokenSierra;
    var token_={
      token:vtoken
    };
    var ubicacion = {};
    try {
      var properties = $scope.itemFeatures;
      ubicacion.campo = properties.Nombre;
      ubicacion.direccion = properties.Direccion;
      ubicacion.zona = properties.Zona;
      ubicacion.distrito = properties.distrito;
      ubicacion.cancha = properties.Nombre;
      ubicacion.macrodistrito = properties.Macrodistrito;

    } catch (error) {

    }

    var dataSend = {
      "razon_social": datosFact.razon_social, 
      "ci_nit": ci_nit,
      "unidad_recaudadora": unidad_recaudadora,
      "sucursal": parseInt(SUCURSAL_ID),
      "monto_total": TOTAL_PAGAR,
      "detalles": $scope.detalleOdm,
      "data": {
        "gestion_pago": $scope.gestionItem
      }
    };
    var odmData = await $scope.getODMDefer(dataSend, token_.token);
    const ODM_ = odmData.data.nro_odm;

    if (ODM_ != '' && ODM_ != null && ODM_ != undefined) {
      var dataCampDep = {
        "oidciudadano": OID_C,
        "candep_id": CANCHA_DEP_ID,
        "nroodm": ODM_,
        "horaini": horaInicio_,
        "horafin": horaFin_,
        "fechareserva": FECHA_,
        "usr_id": 2, //preguntar
        "tipo_pago": "TARJETA",
        "tipo_reserva": 1
      };
  
      var respCanchaDep = await $scope.reservaCanchaDepDefer(dataCampDep, token_.token);
      const regsercampdep = JSON.parse(respCanchaDep.data[0].sp_insertar_regsercampdep);
      if (regsercampdep.insert === 1) {
        var dataTarjeta = {
          "odm": ODM_,
          "total": TOTAL_PAGAR,
          "nombres": NOMBRES_,
          "apellidos": AP_PATERNO_+' '+AP_MATERNO_,
          "direccion": DIRECCION_,
          "email": datosFact.correo,
          "celular": datosFact.celular,
          "sistema": "IGOB",
          "ci_nit": CI_,
          "oid_ciudadano": OID_C,
          "sucursal_facturacion": parseInt(SUCURSAL_ID),
          "id_usuario_facturacion": jsonURLS.ID_USUARIO_FACTURADOR, 
          "reprogramacion": "NO", 
          "servicio": "CAMPOS_DEPORTIVOS",
          "nit_factura": ci_nit,
          "nombre_factura": datosFact.razon_social,
          "tipo_documento": datosFact.tipDoc,
          "complemento": datosFact.complemento,
          "data_opcional":[
            {
              "xidReserva": regsercampdep.data,
              "tpRegistro": "reserva_web"
            }
          ],
          "items": $scope.itemsPagoTarjeta
        };
        respRegistrarPago = await $scope.registrarPagosDefer(dataTarjeta);
        if (respRegistrarPago != null) {
          setTimeout(function () {
            $scope.$apply(function () {
              $('#vistaPago').attr('src',jsonURLS.CONEXION_PAGOS + respRegistrarPago.formulario);
              $('#pago').modal('show');
              $.LoadingOverlay("hide");
            });
          }, 600);
          
        } else {
          $.LoadingOverlay("hide");
          alertify.error('Problemas en la generacion de la tarjeta');
        }
      } else {
        console.log("ERROR");
        swal({
            title: "ALERTA!",
            text: "LO SENTIMOS, ESTE HORARIO YA FUE OCUPADO !",
            type: "warning",
            confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
            closeOnConfirm: false
            },
        function(isConfirm){
            if (isConfirm) {
                swal.close();
                $('#modalDatosFactura').modal('hide');
                $scope.btnActualizarTabla();
                $.LoadingOverlay("hide");
            }
        });
      } 
    } else {
      swal({
        title: "ALERTA!",
        text: "Estimado Ciudadan@ \n\n En este momento tenemos problemas de comunicación \n Vuelva intentarlo mas tarde.",
        type: "warnig",
        confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
        closeOnConfirm: false
      },
      function(isConfirm){
        if (isConfirm) {
          swal.close();
        }
      });
    }   
  };



/** YEISON TRABAJADO */
  $scope.datosFactura2 = async function (item2) {
    $scope.nuevosDatos = item2;
    $scope.datosFacts = {};
    $scope.datosFacts.nit2 = parseInt($scope.datosCiudadano.dtspsl_ci);
    $scope.datosFacts.razon_social2 = $scope.datosCiudadano.dtspsl_paterno;
    $scope.habPago2 = false;
    $scope.habAlerta2 = true;
  };  

  $scope.pagarReserva = async function (datt2) {
    var item = $scope.nuevosDatos;
    if (item.xregserv_fechareserva >= item.fecha_actual ) {
      /**
      * Campo deportivo seleccionado
      */
      const SUCURSAL_ID = item.xid_sucursal;
      const CAMP_DEP_ID = item.xregserv_candep_id;
      const CAMP_DEP_NOMBRE = JSON.parse(item.xnombre_campo);
      /**
      * Cancha deportiva seleccionado
      */
      const CANCHA_DEP_ID = item.xregserv_candep_id;
      const OID_C = $scope.datosCiudadano._id;
      const CI_ = $scope.datosCiudadano.dtspsl_ci;
      const AP_PATERNO_ = $scope.datosCiudadano.dtspsl_paterno;
      const NOMBRES_ = $scope.datosCiudadano.dtspsl_nombres;
      const CORREO_ = $scope.datosCiudadano.dtspsl_correo;
      const CELULAR_ = $scope.datosCiudadano.dtspsl_movil;
      const DIRECCION_ = $scope.datosCiudadano.dtspsl_direccion;
      $scope.FECHA_SELECT_U = item.xregserv_fechareserva.split("-");
      var FECHA_ = $scope.FECHA_SELECT_U[2] + '/' + $scope.FECHA_SELECT_U[1] + '/' + $scope.FECHA_SELECT_U[0];

      /**
      * obtener hora de inicio y fin
      */
        var horaInicio_ = null;
        var horaFin_ = null;
  
        horaInicio_ = item.xregserv_horaini;
        horaFin_ = item.xregserv_horafin;
       
      $scope.NroCeldasDia = 0;
      $scope.NroCeldasNoche = 0;
      $scope.detalleOdm = [];
      $scope.itemsPagoTarjeta = [];
      $scope.detalleItemDia = {};
      $scope.detalleItemNoche = {};
      $scope.itemDia = {};
      $scope.itemNoche = {};
  
      /**
      * obtener ODM
      */
      $scope.horarioR = [];
      $scope.costoTotalCanchaMe = 0;
      var xidRegistro = item.xreg_id;
      var xnroMemo = item.xregserv_nro_memo;
      var xidcanchaDep = item.xregserv_candep_id;
      var prom = await $scope.getListarPagosM(xidRegistro, xnroMemo, xidcanchaDep);
        $scope.horarioR = prom.data;
        for (let index = 0; index < $scope.horarioR[0].horarios.length; index++) {

          $scope.costoTotalCanchaMe = $scope.costoTotalCanchaMe + parseFloat($scope.horarioR[0].horarios[index].total);

          const turnoReserva = $scope.horarioR[0].horarios[index].tipo;
          if (turnoReserva == 1) {
              /**
               * Dia
               */
              try {
                $scope.NroCeldasDia = $scope.NroCeldasDia + 1;
                const celdas0Dia = $scope.horarioR[0].horarios[index];
                const pre_unitario_dia = celdas0Dia.total;
                const pre_total_dia = parseFloat(pre_unitario_dia) * $scope.NroCeldasDia;
                const item_recaudador_dia = celdas0Dia.item_recaudador;
                const unidad_recaudadora_dia = celdas0Dia.item_un_rec;
                const odm_concepto_dia = celdas0Dia.item_descripcion;
  
                $scope.detalleItemDia = {
                  "odm_cantidad": $scope.NroCeldasDia,
                  "odm_sub_total": pre_total_dia,
                  "odm_pre_unitario": pre_unitario_dia,
                  "odm_item_recaudador": item_recaudador_dia,
                  "odm_concepto": odm_concepto_dia,
                };
                $scope.itemDia = {
                  "cantidad": $scope.NroCeldasDia,
                  "concepto": odm_concepto_dia,
                  "item_recaudador": item_recaudador_dia,
                  "monto": parseFloat(pre_unitario_dia),
                  "unidad_recaudadora": unidad_recaudadora_dia,
                }
                
              
              } catch (error) {
  
              }
          } else {
            
                /**
               * Noche
               */
  
              try {
                $scope.NroCeldasNoche = $scope.NroCeldasNoche + 1;
                const celdas0Noche = $scope.horarioR[0].horarios[index];
                const pre_unitario_noche = celdas0Noche.total;
                const pre_total_noche = parseFloat(pre_unitario_noche) * $scope.NroCeldasNoche;
                const item_recaudador_noche = celdas0Noche.item_recaudador;
                const unidad_recaudadora_noche = celdas0Noche.item_un_rec;
                const odm_concepto_noche = celdas0Noche.item_descripcion;
  
                $scope.detalleItemNoche = {
                  "odm_cantidad": $scope.NroCeldasNoche,
                  "odm_sub_total": pre_total_noche,
                  "odm_pre_unitario": pre_unitario_noche,
                  "odm_item_recaudador": item_recaudador_noche,
                  "odm_concepto": odm_concepto_noche,
                };
                $scope.itemNoche = {
                  "cantidad": $scope.NroCeldasNoche,
                  "concepto": odm_concepto_noche,
                  "item_recaudador": item_recaudador_noche,
                  "monto": parseFloat(pre_unitario_noche),
                  "unidad_recaudadora": unidad_recaudadora_noche,
                };
  
                
              } catch (error) {
  
              }
          }
        }

        if ($scope.detalleItemDia.odm_cantidad != null) {
          $scope.detalleOdm.push($scope.detalleItemDia);
          $scope.itemsPagoTarjeta.push($scope.itemDia);
        }
        
        if ($scope.detalleItemNoche.odm_cantidad != null) {
          $scope.detalleOdm.push($scope.detalleItemNoche);
          $scope.itemsPagoTarjeta.push($scope.itemNoche);
        }

        const TOTAL_PAGAR = $scope.costoTotalCanchaMe;

             // Para dia y noche
        const celdas0 = $scope.horarioR[0].horarios[0];
        const unidad_recaudadora = celdas0.item_un_rec;
    
        var vtoken = $scope.tokenSierra;
        var token_={
          token:vtoken
        };

        var dataSend = {
          "razon_social": $scope.datosFacts.razon_social2,
          "ci_nit": $scope.datosFacts.nit2,
          "oidCiudadano": OID_C,
          "unidad_recaudadora": unidad_recaudadora,
          "sucursal": parseInt(SUCURSAL_ID),
          "monto_total": TOTAL_PAGAR,
          "detalles": $scope.detalleOdm,
          "data": {
            "ID_CIUDADANO": OID_C,
            "fecha_recaudacion": FECHA_,
            "nameUsuario": "IgobCiudadano",
            "idUsuario": "152",
            "tipo_actividad": CAMP_DEP_NOMBRE,
            "gestion": $scope.gestionItem,
            "servicio": "CAMPOS DEPORTIVOS",
            "id_campo_dep": CAMP_DEP_ID,
            "id_cancha_dep": CANCHA_DEP_ID,
            "horaInicio": horaInicio_,
            "horaFin": horaFin_,
            "fechareserva": FECHA_,
            "ubicacion": ubicacion
          },
          "odm": 0
        };

        var odmData = await $scope.getODMDefer(dataSend, token_.token);
        const ODM_ = odmData.data.nro_odm;

        const regsercampdep = item.xreg_id;
        var resploginPagos = await $scope.loginPagosDefer();
        const TOKEN_PAGOS = resploginPagos.token;
        var dataTarjeta = {
          "odm": ODM_,
          "total": TOTAL_PAGAR,
          "nombres": NOMBRES_,
          "apellidos": AP_PATERNO_,
          "direccion": DIRECCION_,
          "email": CORREO_,
          "celular": CELULAR_,
          "sistema": "IGOB",
          "ci_nit": CI_,
          "oid_ciudadano": OID_C,
          "sucursal_facturacion": SUCURSAL_ID,
          "id_usuario_facturacion": 0,
          "servicio": "CAMPOS_DEPORTIVOS",
          "usuario_fac":jsonURLS.CREDENCIAL_FACTURA.usr_usuario,// "roger.oliver",
          "clave_fac": jsonURLS.CREDENCIAL_FACTURA.usr_clave,// "123456",
          "nit_factura": $scope.datosFacts.nit2,
          "nombre_factura": $scope.datosFacts.razon_social2,
          "data_opcional": [
            {
              "xidReserva": regsercampdep,
              "tpRegistro": "reserva_web"
            }
          ],
          "items": $scope.itemsPagoTarjeta
        };
        var respRegistrarPago = await $scope.registrarPagosDefer(dataTarjeta);
        const URLPAGO = jsonURLS.CONEXION_PAGOS + respRegistrarPago.formulario
        $scope.urlPagoTarjeta = URLPAGO;
        setTimeout(() => {
          $.unblockUI();
        }, 600)

        var el = angular.element(document.querySelector('#tab-mis-alqu'));
        el.click();
        var popupWin = window.open($scope.urlPagoTarjeta, '_blank', 'width=800,height=800');
        
    } else {
      alertify.error('La fecha de reserva ya venció');

    }
  };  


  $scope.habilitacionPago2 = function (){
    $scope.habPago2 = true;
    $scope.habAlerta2 = false;
  };


  $scope.imprimirFactura = async function (item) {
    $scope.nuevaURL = "";
    var njson = JSON.parse(item.xurl_factura);
    $scope.abrirmodalFactura = "";
    if (njson != null) {
      $scope.urlFact = njson[0].rurlPDF;
      var file = $scope.urlFact.split("9000/");
      $scope.nuevaURL = jsonURLS.CONEXION_FACTURACION_V2 + file[1];
      setTimeout(function () {
        var popupWin = window.open($scope.nuevaURL, '_blank', 'width=600,height=1200');
        $scope.$apply();
      }, 600);  
    } else {
      alertify.error( 'No hay Factura');
    }
    
  };

  $scope.downloadPdf = function (base64String, fileName) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      let byteChar = atob(base64String);
      let byteArray = new Array(byteChar.length);
      for (let i = 0; i < byteChar.length; i++) {
        byteArray[i] = byteChar.charCodeAt(i);
      }
      let uIntArray = new Uint8Array(byteArray);
      let blob = new Blob([uIntArray], { type: 'application/pdf' });
      window.navigator.msSaveOrOpenBlob(blob, `${fileName}.pdf`);
    } else {
      // Download PDF in Chrome etc.
      const source = `data:application/pdf;base64,${base64String}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
  }


  $scope.btnActualizarTabla = function () {
    var item = $scope.selectedItemCanchaDep;
    var fechaSelect = $scope.fechaInput_;
    if (item != '-1' && fechaSelect != null) {
      $scope.tablaSemana($scope.fechaInput_);
    }
  }

  $scope.btnTabRealizaralquiler = function () {
    $scope.celdaSemana = null;
    $scope.celdaHora = null;
    $scope.costoTotalCancha = 0;
    $scope.btnActualizarTabla();
    
  }


  
  $scope.tablareservas = new ngTableParams({
    page: 1,
    count: 12,
    filter: {},
    sorting: {}
  }, {
    total: $scope.lstAlquileres.length,
    getData: function ($defer, params) {
      var filteredData = params.filter() ?
        $filter('filter')($scope.lstAlquileres, params.filter()) :
        $scope.lstAlquileres;
      var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.$scope.lstAlquileres;
      params.total(orderedData.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  

  $scope.btnTabMisAlquileres = function () {
    /**
     * Alquileres
     */
    setTimeout(() => {
      $.blockUI();
    }, 500);
    const OID_C = $scope.datosCiudadano._id;
    $scope.listAlquileresUserDefer(OID_C, $scope.tokenSierra).then(function (resultado) {
      setTimeout(() => {
        $.unblockUI();
      }, 600);
      var resp = resultado;
      if (resp.data != null) {
        $scope.lstAlquileres = resp.data;
        $scope.tablareservas.reload();
      } else {
        $scope.lstAlquileres = [];
        $scope.tablareservas.reload();
      }

      
    });
  }

  $scope.getGPSlocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        $scope.$evalAsync(function () {
          var lat_ = position.coords.latitude;
          var lan_ = position.coords.longitude;
          $scope.setCenterPositionMarker([lan_, lat_], 14);
          $scope.drawMarkerGPS([lan_, lat_]);
        })
      });
    }
  }


  $scope.setCenterPositionMarker = function (latLon, zoom) {
    $scope.obtMap.setView(new ol.View({
      center: ol.proj.transform(latLon, 'EPSG:4326', 'EPSG:3857'),
      zoom: zoom
    }));
  }


  $scope.drawMarkerGPS = function (latLon) {
    $scope.obtMap.removeOverlay($scope.markerGPS);
    var elementMarkerGPS = document.createElement('div');
    elementMarkerGPS.innerHTML = '<div class="pin"></div><div class="pulse"></div>';
    $scope.markerGPS = new ol.Overlay({
      position: ol.proj.transform(latLon, 'EPSG:4326', 'EPSG:3857'),
      positioning: 'center-center',
      offset: [0, 0],
      element: elementMarkerGPS,
      stopEvent: false
    });
    $scope.obtMap.addOverlay($scope.markerGPS);
  }

  $scope.loadDataMap = function () {
    var osm = new ol.layer.Tile({
      title: 'Open Street Map',
      //opacity: 0.3,
      visible: true,
      source: new ol.source.OSM()
    });

    $scope.obtMap = new ol.Map({
      target: 'map',
      layers: [ osm,

        new ol.layer.Image({
          title: 'Macrodistritos Municipales 2019',
          visible: true,
          source: new ol.source.ImageWMS({
            url: CONFIG.UDIT_GEO+"geoserver/DEGEM/wms?",
            params: {
              LAYERS: 'DEGEM:macrodistritos_2019',
              //STYLES: 'lp_macrodistritos2019',
              FORMAT: 'image/png',
              TRANSPARENT: true,
              VERSION: '1.1.1'
            }
          })
        })
      ],
      view: new ol.View({
        center: ol.proj.transform($scope.obtMapCenter.center, 'EPSG:4326', 'EPSG:3857'),
        zoom: $scope.obtMapCenter.zoom
      })
    });


    $scope.loadDataCamposPruebas();
  }


  $scope.loadDataCamposPruebas = async function () {
    var canchasData = await $scope.geoServerCanchDepDefer();
    $scope.getGPSlocation();
    $scope.canchasData = canchasData;
    var featuresJSON = new ol.format.GeoJSON().readFeatures(canchasData, {
      featureProjection: 'EPSG:3857'
    });
    var vectorSource = new ol.source.Vector({
      features: featuresJSON
    });

    var vectorJSON = new ol.layer.Vector({
      title: 'added Layer',
      source: vectorSource,
      style: new ol.style.Style({
        image: new ol.style.Circle({
          radius: 8,
          fill: new ol.style.Fill({
            color: [42, 100, 150, 0.5]
          }),
          stroke: new ol.style.Stroke({ color: '#02BBBE', width: 3 })
        })
      })
    });


    $scope.obtMap.addLayer(vectorJSON);

    $scope.obtMap.on('click', function (evt) {

      var feature = $scope.obtMap.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
          return feature;
        });

      if (feature == undefined) {
        alertify.error('Seleccione una cancha');
        return false;
      }
      const codigoID = feature.get('Codigo'); // ID cancha deportivo
      var features_ = {
        Nombre: feature.get('Nombre'),
        Direccion: feature.get('Direccion'),
        Zona: feature.get('Zona'),
        Macrodistrito: feature.get('Macrodistrito'),
        distrito: feature.get('distrito')
      };

      $scope.itemFeatures = features_;

      var geometry = feature.getGeometry();
      var coord = geometry.getCoordinates();
      $scope.drawMarkerGPS(ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326'));
      $scope.getCamchaDeportivaDefer(codigoID).then(function (data) {
        if (data.data != null) {
          var macrodistritoId = data.data.campo_deportivo_macrodistrito_id;
          var campoDeportivoId = data.data.candep_campo_deportivo_id;
          var canchaDeportivaId = data.data.candep_id;
          $scope.selectedItemMacrodistrito = macrodistritoId;

          /***
           * campos dep
           */

          $scope.getCamposDeportivosDef(macrodistritoId).then(function (resultado) {
            $scope.lstCamposDep = resultado.data;
          });
        } else {
          alertify.error('Seleccione otra cancha');
        }
      });

    });

  }

  $scope.getCamchaDeportivaDefer = function (id) {
    var def = $q.defer();
    var cancha = new getCanchaDeportiva();
    cancha.canchaId = id;

    cancha.cancha(function (resultado) {
      var resp = resultado;
      def.resolve(resp);
    });
    return def.promise;
  }

  $scope.getTokenSierraDeportesDefer = function () {
    var data = {
      "usr_usuario":jsonURLS.CREDENCIAL_SIERRA_VALLE.usr_usuario,
      "usr_clave": jsonURLS.CREDENCIAL_SIERRA_VALLE.usr_clave
    };
    var def = $q.defer();
    var urlPagos = jsonURLS.CONEXION_DEPORTES_SIERRA;
    $.ajax({
      type: 'POST',
      url: urlPagos + "/api/apiLogin",

      data: JSON.stringify(data),

      headers: {
        "Content-Type": "application/json"
      },
      success: function (response) {
        def.resolve(response);
      },
      error: function (response, status, error) {
      }
    });

    return def.promise;
  }

  $scope.getODMDefer = function (dataSend, token) {
    var def = $q.defer();
    var generacionODM_ = new generacionODM();
    generacionODM_.data = dataSend;
    generacionODM_.token = token;
    generacionODM_.generacion(function (resultado) {
      def.resolve(resultado);
    });
    return def.promise;
  }

  $scope.reservaCanchaDepDefer = function (dataSend, token) {
    var def = $q.defer();
    var reservaCanchaDep_ = new reservaCanchaDep();
    reservaCanchaDep_.data = dataSend;
    reservaCanchaDep_.token = token;
    reservaCanchaDep_.canchaDep(function (resultado) {
      def.resolve(resultado);
    });
    return def.promise;
  }


  $scope.listAlquileresUserDefer = function (oid, token) {
    var def = $q.defer();
    var listarAlquileres_ = new listarAlquileres();
    listarAlquileres_.userId = oid;
    listarAlquileres_.token = token;
    listarAlquileres_.lstalquileresUsr(function (resultado) {
      var resp = resultado;
      def.resolve(resp);
    });
    return def.promise;
  }

  $scope.macrodistritosDefer = function () {
    var def = $q.defer();
    var macrodistritos_ = new macrodistritos();
    macrodistritos_.macros(function (resultado) {
      def.resolve(resultado);
    });
    return def.promise;
  }

  $scope.loginPagosDefer = function () {
    var def = $q.defer();
    var loginPagos_ = new loginPagos();
    loginPagos_.login(function (resultado) {
      var resp = resultado;
      def.resolve(resp);
    });
    return def.promise;
  }

  $scope.registrarPagosDefer = function (data) {
    var def = $q.defer();
    var urlPagos = jsonURLS.CONEXION_PAGOS;
    $.ajax({
      type: 'POST',
      url: urlPagos + "api/v2/registrarTrx",
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: "json",
      processData: false,
      success: function (response) {
        def.resolve(response);
      },
      error: function (response, status, error) {
      }
    });
    //////////////
    return def.promise;
  }

  $scope.geoServerCanchDepDefer = function () {
    //var xurl = CONFIG.UDIT_GEO+"geoserver/campos_deportivos/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=campos_deportivos%3Acamposdeportivoslt&maxFeatures=50&outputFormat=application%2Fjson&CQL_FILTER=administra%09%3D%20%27DIRECCION%20DE%20DEPORTES%27";
    var xurl = CONFIG.UDIT_GEO+"geoserver/campos_deportivos/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=campos_deportivos%3Acamposdeportivos&maxFeatures=50&outputFormat=application%2Fjson&format_options=callback:getJson&CQL_FILTER=administra%09%3D%20%27DIRECCION%20DE%20DEPORTES%27";
    var def = $q.defer();
    $.ajax({
      url: xurl,
      success: function (data) {
          def.resolve(data);
      }
    });
    return def.promise;
  }

  $scope.getCamposDeportivosDef = function (sendData) {
    var vtoken = $scope.tokenSierra;
    var url = jsonURLS.CONEXION_DEPORTES_SIERRA + '/api/campos-deportivos';

    var def = $q.defer();
    $.ajax({

        type: "POST",
        url: url,
        headers: {
            'authorization': 'Bearer ' + vtoken,
            'Content-type': 'application/json'
        },
        data: JSON.stringify(sendData),
        async: false,
        success: function (data) {
            def.resolve(data);
        },
        error: function (e) {
        }
    });
    return def.promise;
  }

  $scope.getListarCanchasDeportivasDefer = function (sendData) {
    var vtoken = $scope.tokenSierra;
    var url = jsonURLS.CONEXION_DEPORTES_SIERRA + '/api/cancha-deportiva';

    var def = $q.defer();
    $.ajax({

      type: "POST",
      url: url,
      headers: {
        'authorization': 'Bearer ' + vtoken,
        'Content-type': 'application/json'
      },
      data: JSON.stringify(sendData),
      async: false,
      success: function (data) {
        def.resolve(data);
      },
      error: function (e) {
      }
    });
    return def.promise;
  }


  $scope.getFacturaDefer = function (sendData) {
    var url = jsonURLS.CONEXION_FACTURACION + "/factura.php";
    var def = $q.defer();
    $.ajax({
      processData: false,
      type: "POST",
      url: url,
      data: JSON.stringify(sendData),
      dataType: "json",
      async: false,
      success: function (data) {
        def.resolve(data);
      },
      error: function (e) {
      }
    });
    return def.promise;
  }

  $scope.tokenFacturacion = function () {
    var data = {
      "usr_usuario":jsonURLS.CREDENCIAL_FACTURA.usr_usuario,
      "usr_clave": jsonURLS.CREDENCIAL_FACTURA.usr_clave
    };
    var def = $q.defer();
    var urlPagos = jsonURLS.CONEXION_FACTURACION_V2 + 'api/iFacturas/login';
    $.ajax({
      type: 'POST',
      url: urlPagos,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      success: function (response) {
        def.resolve(response);
      },
      error: function (response, status, error) {
      }
    });

    return def.promise;
  }

  $scope.getCatalagoDef = function (sendData, xtoken) {
    var vtoken = xtoken;
    var url = jsonURLS.CONEXION_FACTURACION_V2 + 'api/itemRecaudador';
    var def = $q.defer();
    $.ajax({

        type: "POST",
        url: url,
        headers: {
            'authorization': 'Bearer ' + vtoken,
            'Content-type': 'application/json'
        },
        data: JSON.stringify(sendData),
        async: false,
        success: function (data) {
            def.resolve(data);
        },
        error: function (e) {
        }
    });
    return def.promise;
  };

  $scope.getlistarSucursal = function (sendData) {
    var url = jsonURLS.CONEXION_DEPORTES_SIERRA + '/api/campoDeportSucursal';
    var def = $q.defer();
    $.ajax({
        type: "POST",
        url: url,
        data: sendData,
        async: false,
        success: function (data) {
            def.resolve(data);
        },
        error: function (e) {
        }
    });
    return def.promise;
  };

  $scope.pagoQR = async function (datosFact) {
      procesando();    
      $scope.habPago = false;
      $scope.habMetodos = false;
      $scope.habQR = true;
      $scope.habTarjeta = false;
      $scope.habAlerta = false;
      $scope.imgQR = "";
      var ci_nit = 0;

      if (datosFact.nit != '' && datosFact.nit != null && datosFact.nit != undefined) {
        ci_nit = datosFact.nit;
      }else{
        if (datosFact.ci != '' && datosFact.ci != null && datosFact.ci != undefined) {
          ci_nit = datosFact.ci;
        } else {
          ci_nit = 0;
        }
      }

    /**
    * Campo deportivo seleccionado
    */
      const SELECT_CAMP_DEP = $scope.selectedItemCamDepDATA;
      const SUCURSAL_ID = SELECT_CAMP_DEP.xcampo_deportivo_id_suc;
      const CAMP_DEP_ID = SELECT_CAMP_DEP.xcampo_deportivo_id;
      const CAMP_DEP_NOMBRE = JSON.parse(SELECT_CAMP_DEP.xcampo_deportivo_data).descripcionItem;
    /**
    * Cancha deportiva seleccionado
    */
      const SELECT_CANCHA_DEP = $scope.selectedItemCanchaDepDATA;
      const CANCHA_DEP_ID = SELECT_CANCHA_DEP.xcandep_id;
      const CANCHA_DEP_ITEMS = SELECT_CANCHA_DEP.xitems_candep;
      const OID_C = $scope.datosCiudadano._id;
      const CI_ = $scope.datosCiudadano.dtspsl_ci;
      const AP_PATERNO_ = $scope.datosCiudadano.dtspsl_paterno;
      const AP_MATERNO_ = $scope.datosCiudadano.dtspsl_materno;
      const NOMBRES_ = $scope.datosCiudadano.dtspsl_nombres;
      const CORREO_ = $scope.datosCiudadano.dtspsl_correo;
      const CELULAR_ = $scope.datosCiudadano.dtspsl_movil;
      const DIRECCION_ = $scope.datosCiudadano.dtspsl_direccion;
      const FECHA_SELECT_USER = $scope.fechaInput_;
      var FECHA_ = FECHA_SELECT_USER.getDate() + '/' + (FECHA_SELECT_USER.getMonth() + 1) + '/' + FECHA_SELECT_USER.getFullYear();

    /**
     * obtener hora de inicio y fin
    */
      var horaInicio_ = null;
      var horaFin_ = null;

      try {
        FECHA_ = $scope.celdasUser[0].semanaData.fechaF;
        horario = $scope.celdasUser[0].horaData.i;
        horaInicio_ = horario;
        for (let index = 0; index < $scope.celdasUser.length; index++) {
          $scope.horaFinal = $scope.celdasUser[index].horaData.f;
          
        }
        horaFin_ = $scope.horaFinal;

      } catch (error) {
      }

      const TOTAL_PAGAR = $scope.costoTotalCancha;
      const arraySelectCelda = $scope.celdasUser;
      $scope.detalleOdm = [];
      $scope.itemsPagoTarjeta = [];
      $scope.NroCeldasDia = 0;
      $scope.NroCeldasNoche = 0;
      $scope.detalleItemDia = {};
      $scope.detalleItemNoche = {};
      $scope.itemDia = {};
      $scope.itemNoche = {};
      
      for (let index = 0; index < arraySelectCelda.length; index++) {
        const turnoReserva = arraySelectCelda[index].tipo;
        if (turnoReserva == 1) {
            /**
             * Dia
             */
            
            try {
              $scope.NroCeldasDia = $scope.NroCeldasDia + 1;
              const celdas0Dia = arraySelectCelda[index];
              const pre_unitario_dia = celdas0Dia.costo;
              const pre_total_dia = parseFloat(pre_unitario_dia) * $scope.NroCeldasDia;
              const item_recaudador_dia = celdas0Dia.horaData.item.itemrec;
              const unidad_recaudadora_dia = celdas0Dia.horaData.item.idunirec;
              const odm_concepto_dia = celdas0Dia.horaData.item.descripcion;
              const idItem = celdas0Dia.horaData.item.iditem;

              $scope.detalleItemDia = {
                "odm_item_recaudador": item_recaudador_dia,
                "odm_pre_unitario": pre_unitario_dia,
                "odm_cantidad": $scope.NroCeldasDia,
                "odm_sub_total": pre_total_dia,
                "odm_concepto": odm_concepto_dia+' '+FECHA_+' '+horaInicio_+' '+horaFin_
              };
              $scope.itemDia = {
                "concepto": odm_concepto_dia+' '+FECHA_+' '+horaInicio_+' '+horaFin_,
                "cantidad": $scope.NroCeldasDia,
                "precio_unitario": parseFloat(pre_unitario_dia),
                "cod_Item_recaudador": item_recaudador_dia,
                "monto_descuento": 0.00,
                "subtotal": pre_total_dia,
                "id_item": idItem
              };
            
            } catch (error) {

            }

        } else {
              /**
             * Noche
             */

            
            try {
              $scope.NroCeldasNoche = $scope.NroCeldasNoche + 1;
              const celdas0Noche = arraySelectCelda[index];
              const pre_unitario_noche = celdas0Noche.costo;
              const pre_total_noche = parseFloat(pre_unitario_noche) * $scope.NroCeldasNoche;
              const item_recaudador_noche = celdas0Noche.horaData.item.itemrec;
              const unidad_recaudadora_noche = celdas0Noche.horaData.item.idunirec;
              const odm_concepto_noche = celdas0Noche.horaData.item.descripcion;
              const idItem = celdas0Noche.horaData.item.iditem;

              $scope.detalleItemNoche = {
                "odm_item_recaudador": item_recaudador_noche,
                "odm_pre_unitario": pre_unitario_noche,
                "odm_cantidad": $scope.NroCeldasNoche,
                "odm_sub_total": pre_total_noche,
                "odm_concepto": odm_concepto_noche+' '+FECHA_+' '+horaInicio_+' '+horaFin_
              };
              $scope.itemNoche = {
                "concepto": odm_concepto_noche+' '+FECHA_+' '+horaInicio_+' '+horaFin_,
                "cantidad": $scope.NroCeldasNoche,
                "precio_unitario": parseFloat(pre_unitario_noche),
                "cod_Item_recaudador": item_recaudador_noche,
                "monto_descuento": 0.00,
                "subtotal": pre_total_noche,
                "id_item": idItem
              };

            } catch (error) {

            }
        }
      }
      
      
      if ($scope.detalleItemDia.odm_cantidad != null) {
        $scope.detalleOdm.push($scope.detalleItemDia);
        $scope.itemsPagoTarjeta.push($scope.itemDia);
      }
      
      if ($scope.detalleItemNoche.odm_cantidad != null) {
        $scope.detalleOdm.push($scope.detalleItemNoche);
        $scope.itemsPagoTarjeta.push($scope.itemNoche);
      }

      // Para dia y noche
      const celdas0 = arraySelectCelda[0];
      const unidad_recaudadora = celdas0.horaData.item.idunirec;

      var vtoken = $scope.tokenSierra;
      var token_={
        token:vtoken
      };

      var dataSend = {
        "razon_social": datosFact.razon_social, //AP_PATERNO_,
        "ci_nit": ci_nit,
        "unidad_recaudadora": unidad_recaudadora,
        "sucursal": parseInt(SUCURSAL_ID),
        "monto_total": TOTAL_PAGAR,
        "detalles": $scope.detalleOdm,
        "data": {
          "gestion_pago": $scope.gestionItem
        }
      };   
      var odmData = await $scope.getODMDefer(dataSend, token_.token);
      const ODM_ = odmData.data.nro_odm;

      if (ODM_ != '' && ODM_ != null && ODM_ != undefined) {
      var dataCampDep = {
        "oidciudadano": OID_C,
        "candep_id": CANCHA_DEP_ID,
        "nroodm": ODM_,
        "horaini": horaInicio_,
        "horafin": horaFin_,
        "fechareserva": FECHA_,
        "usr_id": 2, //preguntar
        "tipo_pago": "QR",
        "tipo_reserva": 1
      };
      var respCanchaDep = await $scope.reservaCanchaDepDefer(dataCampDep, token_.token);
      const regsercampdep = JSON.parse(respCanchaDep.data[0].sp_insertar_regsercampdep);
      if (regsercampdep.insert === 1) {
        var urlPagoQR = jsonURLS.CONEXION_PAGOS_QR + 'api/v2/registrarQrBcp';  
        var formDataPago = {
          "odm": ODM_,
          "total": TOTAL_PAGAR,
          "nombres": NOMBRES_,
          "apellidos": AP_PATERNO_+' '+AP_MATERNO_,
          "direccion": DIRECCION_,
          "email": datosFact.correo,
          "celular": datosFact.celular,
          "sistema": "IGOB",
          "ci_nit": CI_,
          "oid_ciudadano": OID_C,
          "sucursal_facturacion": parseInt(SUCURSAL_ID),
          "id_usuario_facturacion": jsonURLS.ID_USUARIO_FACTURADOR, 
          "reprogramacion": "NO", 
          "servicio": "CAMPOS_DEPORTIVOS",
          "nit_factura": ci_nit,
          "nombre_factura": datosFact.razon_social,
          "tipo_documento": datosFact.tipDoc,
          "complemento": datosFact.complemento,
          "data_opcional":[
            {
              "xidReserva": regsercampdep.data,
              "tpRegistro": "reserva_web"
            }
          ],
          "items": $scope.itemsPagoTarjeta
        };
        $.ajax({
          type        : 'POST',
          url         : urlPagoQR,
          data        : JSON.stringify(formDataPago),
          dataType    : 'json',
          crossDomain : true,
          headers: {
            'Content-Type': 'application/json',
          },success: function(dataIN) {
            if (dataIN != null) {
              $scope.imgQR = dataIN.data.qrImage;
              setTimeout(function () {
                  $scope.$apply(function () {
                      $scope.qrcodeString = 'data:image/jpeg;base64,'+$scope.imgQR;
                      alertify.success('Se genero el codigo QR correctamente puede realizar el pago.');
                      $.LoadingOverlay("hide");
                  });
              }, 300);
            } else {
              $.LoadingOverlay("hide");
              alertify.error('Problemas al generar el QR');
            }
          },
          error: function (xhr, status, error) {
          }
        });
      } else {
        console.log("ERROR");
        swal({
          title: "ALERTA!",
          text: "LO SENTIMOS, ESTE HORARIO YA FUE OCUPADO !",
          type: "warning",
          confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
          closeOnConfirm: false
          },
        function(isConfirm){
            if (isConfirm) {
                swal.close();
                $('#modalDatosFactura').modal('hide');
                $scope.btnActualizarTabla();
                $.LoadingOverlay("hide");
            }
        });
      }
    } else {
      swal({
        title: "ALERTA!",
        text: "Estimado Ciudadan@ \n\n En este momento tenemos problemas de comunicación \n Vuelva intentarlo mas tarde.",
        type: "warnig",
        confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
        closeOnConfirm: false
      },
      function(isConfirm){
        if (isConfirm) {
          swal.close();
        }
      });
    }   
  };
  
  $scope.listarFechaActual = function () {
    var def = $q.defer();
    var listarFech = new lstHoraActual();
    listarFech.listaHoraActual(function (resultado) {
      var resp = resultado;
      def.resolve(resp);
    });
    return def.promise;
  }

  $scope.atrasQR = function () {
    $scope.habPago = false;
    $scope.habMetodos = true;
    $scope.habQR = false;
    $scope.habTarjeta = false;
    $scope.habAlerta = false;
  };
  
  $scope.atrasTarjeta = function () {
    $scope.habPago = false;
    $scope.habMetodos = true;
    $scope.habQR = false;
    $scope.habTarjeta = false;
    $scope.habAlerta = false;
  };

  /** ////////////////////////////// NUEVA FACTURACION  ///////////////////////////////////////////////////*/

  $scope.listarTipDoc = function (){
    var urlTipDoc = jsonURLS.CONEXION_FACTURACION_V2 + 'api/sincronizar/listar';
    $scope.tpDocs = [];
    var formDatatpDoc = '{"dominio":"TipoDocumentoIdentidad"}';
    $.ajax({
        type        : 'POST',
        url         : urlTipDoc,
        data        : formDatatpDoc,
        dataType    : 'json',
        crossDomain : true,
        headers: {
            'Content-Type': 'application/json'
        },
        success: function(data) {
            var respon = data;
            if (respon[0] != null || respon[0] != undefined) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.tpDocs = respon;
                        alertify.success('Listado encontrados !!');
                        $scope.habPagoQR = false;
                    });
                }, 500);

            } else {
                $scope.tpDocs = [];
                alertify.error('Datos no encontrados !!');
            }
            
        },
        error: function (xhr, status, error) {
            alertify.error('Error Intente de nuevo !!');
        }
    });
  };

  $scope.seleccionDocumento = function (tipDoc){
    if (tipDoc > 0) {
        $scope.habPagoQR = true;
    } else {
        $scope.habPagoQR = false;
    }

    $scope.mensaje = "";
    $scope.datosFact.ci = null;
    $scope.datosFact.nit = null;
    $scope.datosFact.complemento = "";
    //$scope.datosFact.correo = "";
    //$scope.datosFact.celular = "";
    $scope.datosFact.razon_social = "";

    if (tipDoc == 1) {
        $scope.habNit = false;
        $scope.habCi = true;
        $scope.habCEX = false;
        swal({
            title: "¡ADVERTENCIA!",
            text: "Estimado Ciudadan@ \n\n Una vez colocado el C.I. haga click en el boton BUSCAR, \n para verificar si sus datos son validos",
            type: "warning",
            confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
            closeOnConfirm: false
            },
        function(isConfirm){
            if (isConfirm) {
                swal.close();
            }
        });
    } else {
        if (tipDoc == 2) {
          $scope.habNit = false;
          $scope.habCi = false;
          $scope.habCEX = true;
          swal({
              title: "¡ADVERTENCIA!",
              text: "Estimado Ciudadan@ \n\n Una vez colocado el C.I. EXTRANJERO haga click en el boton BUSCAR, \n para verificar si sus datos son validos",
              type: "warning",
              confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
              closeOnConfirm: false
              },
          function(isConfirm){
              if (isConfirm) {
                  swal.close();
              }
          });
        } else {
          $scope.habNit = true;
          $scope.habCi = false;
          $scope.habCEX = false;
          swal({
              title: "¡ADVERTENCIA!",
              text: "Estimado Ciudadan@ \n\n Una vez colocado el NIT haga click en el boton BUSCAR, \n para verificar si es ACTIVO o INEXISTENTE ",
              type: "warning",
              confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
              closeOnConfirm: false
              },
          function(isConfirm){
              if (isConfirm) {
                  swal.close();
              }
          });            
        }
    } 
  };


  $scope.buscarDatosFact2 = function (tipDoc, nit){
    cargando();
    $scope.obtDatosCiud = [];
    $scope.mensaje = "";
    var urlInforCiudd =  jsonURLS.CONEXION_FACTURACION_V2 +'api/factura/informacionCiudadano/'+nit+'/'+tipDoc+'';
    $.ajax({
        type        : 'GET',
        url         : urlInforCiudd,
        data        : {},
        dataType    : 'json',
        crossDomain : true,
        headers: {
            'Content-Type': 'application/json'
        },
        success: function(data) {
            var respon = data;
            $scope.obtDatosCiud = respon;
            if (respon.estado == true) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        $.LoadingOverlay("hide");                        
                        alertify.success('DATOS ENCONTRADOS !!');
                        $scope.mensaje = $scope.obtDatosCiud.data.mensaje;
                        $scope.datosFact.ci = parseFloat($scope.obtDatosCiud.data.nit_ci);
                        $scope.datosFact.nit = parseFloat($scope.obtDatosCiud.data.nit_ci);
                        $scope.datosFact.complemento = $scope.obtDatosCiud.data.complemento;
                        $scope.datosFact.correo = $scope.obtDatosCiud.data.correo;
                        $scope.datosFact.celular = $scope.obtDatosCiud.data.celular;
                        $scope.datosFact.razon_social = $scope.obtDatosCiud.data.razon_social;
                    });
                }, 1000);
                 
            } else {
                
                setTimeout(function () {
                    $scope.$apply(function () {
                        $.LoadingOverlay("hide");
                        alertify.error('DATOS NO ENCONTRADOS !!');
                        $scope.mensaje = $scope.obtDatosCiud.data.mensaje;
                        $scope.datosFact.ci = parseFloat($scope.obtDatosCiud.data.nit_ci);
                        $scope.datosFact.nit = parseFloat($scope.obtDatosCiud.data.nit_ci);
                        $scope.datosFact.complemento = "";
                        //$scope.datosFact.correo = "";
                        //$scope.datosFact.celular = "";
                        $scope.datosFact.razon_social = "";
                    });
                }, 1000);
            }
            
        },
        error: function (xhr, status, error) {
            alertify.error('Error Intente de nuevo !!');
            //alertify.error('Seleccione el Tipo de Documento');
            $.LoadingOverlay("hide");
        }
    });    
  };


  $scope.cerrarModal = function(){
    setTimeout(function(){
      //$scope.btnActualizarTabla();
      var el = angular.element(document.querySelector('#tab-mis-alqu'));
      el.click();
    },500);
  }


  /******************  VALIDACION ANTES DEL PAGO  **************************/
  
  /////////////////////  QR  ////////////////////////////
  $scope.validacionQR = function (datosFact) {
    if (datosFact.tipDoc == 1 || datosFact.tipDoc == 2) {
      if (datosFact.ci != '' && datosFact.ci != null && datosFact.ci != undefined && datosFact.ci >= 0) {
        $scope.datosFact.ci = datosFact.ci;
        if (datosFact.correo != '' && datosFact.correo != null && datosFact.correo != undefined) {
          if (datosFact.celular != '' && datosFact.celular != null && datosFact.celular != undefined) {
            if (datosFact.razon_social != '' && datosFact.razon_social != null && datosFact.razon_social != undefined) {
              var raz = $scope.validarRazonSocial(datosFact.razon_social);
              if (raz == true) {
                swal({
                  title: "RAZON SOCIAL INEXISTENTE!",
                  text: "Por favor Introduzca su Apellido o Nombre para la emision de su factura",
                  type: "error",
                  confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                  closeOnConfirm: false
                },
                function(isConfirm){
                  if (isConfirm) {
                    swal.close();
                    $.LoadingOverlay("hide");
                  }
                });
              } else {
                procesando();
                if (datosFact.tipDoc == 5) {
                  var urlInforCiudd =  CONFIG.CONEXION_FACTURACION_V2 +'api/factura/informacionCiudadano/'+$scope.datosFact.ci+'/'+datosFact.tipDoc+'';
                  $.ajax({
                  type        : 'GET',
                  url         : urlInforCiudd,
                  data        : {},
                  dataType    : 'json',
                  crossDomain : true,
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  success: function(data) {
                      respon = data;
                      if (respon.estado == true) {
                        setTimeout(function () {
                          $scope.$apply(function () {
                            if (respon.data.mensaje == 'NIT INEXISTENTE' && respon.data.mensaje == '' && respon.data.mensaje == undefined && respon.data.mensaje == null) {
                              $scope.mensaje = respon.data.mensaje;
                              swal({
                                title: "ERROR!",
                                text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                                type: "error",
                                confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                                closeOnConfirm: false
                              },
                              function(isConfirm){
                                if (isConfirm) {
                                  swal.close();
                                  $.LoadingOverlay("hide");
                                }
                              });
                                                  
                            } else {
                              $.LoadingOverlay("hide");
                              $scope.pagoQR(datosFact);
                            }
                          });
                        }, 600);
                      } else { 
                        setTimeout(function () {
                          $scope.$apply(function () {
                            //alertify.error($scope.obtDatosCiud.mensaje);
                            $scope.mensaje = respon.data.mensaje;
                            swal({
                              title: "ERROR!",
                              text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                              type: "error",
                              confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                              closeOnConfirm: false
                            },
                            function(isConfirm){
                              if (isConfirm) {
                                  swal.close();
                                  $.LoadingOverlay("hide");
                              }
                            });
                          });
                        }, 600);
                      }               
                    },
                    error: function (xhr, status, error) {
                      alertify.error('Error Intente de nuevo !!');
                      $.LoadingOverlay("hide");
                    }
                  });
                } else {
                  $.LoadingOverlay("hide");
                  $scope.pagoQR(datosFact);
                }
              }
            } else {
              swal({
                title: "RAZON SOCIAL VACIA!",
                text: "Por favor Introduzca su Apellido o Nombre para la emision de su factura",
                type: "error",
                confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                closeOnConfirm: false
              },
              function(isConfirm){
                if (isConfirm) {
                  swal.close();
                  $.LoadingOverlay("hide");
                }
              });
            } 
          } else {
            swal({
              title: "CELULAR VACIO!",
              text: "Por favor Introduzca su número de celular para que le llegue la factura ahi",
              type: "error",
              confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
              closeOnConfirm: false
            },
            function(isConfirm){
              if (isConfirm) {
                swal.close();
                $.LoadingOverlay("hide");
              }
            });
          }
        } else {
          swal({
            title: "CORREO VACIO!",
            text: "Por favor Introduzca su correo para que le llegue la factura ahi",
            type: "error",
            confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
            closeOnConfirm: false
          },
          function(isConfirm){
            if (isConfirm) {
              swal.close();
              $.LoadingOverlay("hide");
            }
          });
        }
      } else {
        swal({
          title: "C.I. INEXISTENTE!",
          text: "Por favor Introduzca su numero de carnet de identidad",
          type: "error",
          confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
          closeOnConfirm: false
        },
        function(isConfirm){
          if (isConfirm) {
            swal.close();
            $.LoadingOverlay("hide");
          }
        });
      }
    } else {
      if (datosFact.nit != '' && datosFact.nit != null && datosFact.nit != undefined) {
        $scope.datosFact.nit = datosFact.nit;
        if (datosFact.correo != '' && datosFact.correo != null && datosFact.correo != undefined) {
          if (datosFact.celular != '' && datosFact.celular != null && datosFact.celular != undefined) {
            if (datosFact.razon_social != '' && datosFact.razon_social != null && datosFact.razon_social != undefined) {
              var raz = $scope.validarRazonSocial(datosFact.razon_social);
              if (raz == true) {
                swal({
                  title: "RAZON SOCIAL INEXISTENTE!",
                  text: "Por favor Introduzca su Apellido o Nombre para la emision de su factura",
                  type: "error",
                  confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                  closeOnConfirm: false
                },
                function(isConfirm){
                  if (isConfirm) {
                    swal.close();
                    $.LoadingOverlay("hide");
                  }
                });
              } else {
                procesando();
                if (datosFact.tipDoc == 5) {
                  var urlInforCiudd =  CONFIG.CONEXION_FACTURACION_V2 +'api/factura/informacionCiudadano/'+$scope.datosFact.nit+'/'+datosFact.tipDoc+'';
                  $.ajax({
                  type        : 'GET',
                  url         : urlInforCiudd,
                  data        : {},
                  dataType    : 'json',
                  crossDomain : true,
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  success: function(data) {
                      respon = data;
                      if (respon.estado == true) {
                        setTimeout(function () {
                          $scope.$apply(function () {
                            if (respon.data.mensaje == 'NIT INEXISTENTE' && respon.data.mensaje == '' && respon.data.mensaje == undefined && respon.data.mensaje == null) {
                              $scope.mensaje = respon.data.mensaje;
                              swal({
                                title: "ERROR!",
                                text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                                type: "error",
                                confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                                closeOnConfirm: false
                              },
                              function(isConfirm){
                                if (isConfirm) {
                                  swal.close();
                                  $.LoadingOverlay("hide");
                                }
                              });
                                                  
                            } else {
                              $.LoadingOverlay("hide");
                              $scope.pagoQR(datosFact);
                            }
                          });
                        }, 600);
                      } else { 
                        setTimeout(function () {
                          $scope.$apply(function () {
                            //alertify.error($scope.obtDatosCiud.mensaje);
                            $scope.mensaje = respon.data.mensaje;
                            swal({
                              title: "ERROR!",
                              text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                              type: "error",
                              confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                              closeOnConfirm: false
                            },
                            function(isConfirm){
                              if (isConfirm) {
                                  swal.close();
                                  $.LoadingOverlay("hide");
                              }
                            });
                          });
                        }, 600);
                      }               
                    },
                    error: function (xhr, status, error) {
                      alertify.error('Error Intente de nuevo !!');
                      $.LoadingOverlay("hide");
                    }
                  });
                } else {
                  $.LoadingOverlay("hide");
                  $scope.pagoQR(datosFact);
                }
              }
            } else {
              swal({
                title: "RAZON SOCIAL VACIA!",
                text: "Por favor Introduzca su Apellido o Nombre para la emision de su factura",
                type: "error",
                confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                closeOnConfirm: false
              },
              function(isConfirm){
                if (isConfirm) {
                  swal.close();
                  $.LoadingOverlay("hide");
                }
              });
            } 
          } else {
            swal({
              title: "CELULAR VACIO!",
              text: "Por favor Introduzca su número de celular para que le llegue la factura ahi",
              type: "error",
              confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
              closeOnConfirm: false
            },
            function(isConfirm){
              if (isConfirm) {
                swal.close();
                $.LoadingOverlay("hide");
              }
            });
          }
        } else {
          swal({
            title: "CORREO VACIO!",
            text: "Por favor Introduzca su correo para que le llegue la factura ahi",
            type: "error",
            confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
            closeOnConfirm: false
          },
          function(isConfirm){
            if (isConfirm) {
              swal.close();
              $.LoadingOverlay("hide");
            }
          });
        }
      } else {
        swal({
          title: "NIT INEXISTENTE!",
          text: "Por favor Introduzca un numero que tenga 10 digitos por lo menos",
          type: "error",
          confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
          closeOnConfirm: false
        },
        function(isConfirm){
          if (isConfirm) {
            swal.close();
            $.LoadingOverlay("hide");
          }
        });
      }
    }           
  };  

  /////////////////////  TARJETA   //////////////////////
  $scope.validacionTARJETA = function (datosFact) {
    if (datosFact.tipDoc == 1 || datosFact.tipDoc == 2) {
      if (datosFact.ci != '' && datosFact.ci != null && datosFact.ci != undefined && datosFact.ci >= 0) {
        $scope.datosFact.ci = datosFact.ci;
        if (datosFact.correo != '' && datosFact.correo != null && datosFact.correo != undefined) {
          if (datosFact.celular != '' && datosFact.celular != null && datosFact.celular != undefined) {
            if (datosFact.razon_social != '' && datosFact.razon_social != null && datosFact.razon_social != undefined) {
              var raz = $scope.validarRazonSocial(datosFact.razon_social);
              if (raz == true) {
                swal({
                  title: "RAZON SOCIAL INEXISTENTE!",
                  text: "Por favor Introduzca su Apellido o Nombre para la emision de su factura",
                  type: "error",
                  confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                  closeOnConfirm: false
                },
                function(isConfirm){
                  if (isConfirm) {
                    swal.close();
                    $.LoadingOverlay("hide");
                  }
                });
              } else {
    
                procesando();
                if (datosFact.tipDoc == 5) {
                  var urlInforCiudd =  CONFIG.CONEXION_FACTURACION_V2 +'api/factura/informacionCiudadano/'+$scope.datosFact.ci+'/'+datosFact.tipDoc+'';
                  $.ajax({
                  type        : 'GET',
                  url         : urlInforCiudd,
                  data        : {},
                  dataType    : 'json',
                  crossDomain : true,
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  success: function(data) {
                      respon = data;
                      if (respon.estado == true) {
                        setTimeout(function () {
                          $scope.$apply(function () {
                            if (respon.data.mensaje == 'NIT INEXISTENTE' && respon.data.mensaje == '' && respon.data.mensaje == undefined && respon.data.mensaje == null) {
                              $scope.mensaje = respon.data.mensaje;
                              swal({
                                title: "ERROR!",
                                text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                                type: "error",
                                confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                                closeOnConfirm: false
                              },
                              function(isConfirm){
                                if (isConfirm) {
                                  swal.close();
                                }
                              });
                              $.LoadingOverlay("hide");                    
                            } else {
                              console.log("GENERAR FACTURA NIT CORRECTO");
                              $scope.btnPagar(datosFact);
                              $.LoadingOverlay("hide");
                            }
                          });
                        }, 600);
                      } else { 
                        setTimeout(function () {
                          $scope.$apply(function () {
                            $.LoadingOverlay("hide");
                            $scope.mensaje = respon.data.mensaje;
                            swal({
                              title: "ERROR!",
                              text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                              type: "error",
                              confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                              closeOnConfirm: false
                            },
                            function(isConfirm){
                              if (isConfirm) {
                                  swal.close();
                              }
                            });
                          });
                        }, 600);
                      }               
                    },
                    error: function (xhr, status, error) {
                      alertify.error('Error Intente de nuevo !!');
                      $.LoadingOverlay("hide");
                    }
                  });
                } else {
                    $scope.btnPagar(datosFact);
                    $.LoadingOverlay("hide");
                }
              }
            } else {
              swal({
                title: "RAZON SOCIAL VACIA!",
                text: "Por favor Introduzca su Apellido o Nombre para la emision de su factura",
                type: "error",
                confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                closeOnConfirm: false
              },
              function(isConfirm){
                if (isConfirm) {
                  swal.close();
                  $.LoadingOverlay("hide");
                }
              });
            } 
          } else {
            swal({
              title: "CELULAR VACIO!",
              text: "Por favor Introduzca su número de celular para que le llegue la factura ahi",
              type: "error",
              confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
              closeOnConfirm: false
            },
            function(isConfirm){
              if (isConfirm) {
                swal.close();
                $.LoadingOverlay("hide");
              }
            });
          }
        } else {
          swal({
            title: "CORREO VACIO!",
            text: "Por favor Introduzca su correo para que le llegue la factura ahi",
            type: "error",
            confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
            closeOnConfirm: false
          },
          function(isConfirm){
            if (isConfirm) {
              swal.close();
              $.LoadingOverlay("hide");
            }
          });
        }
      } else {
        swal({
          title: "C.I. INEXISTENTE!",
          text: "Por favor Introduzca su numero de carnet de identidad",
          type: "error",
          confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
          closeOnConfirm: false
        },
        function(isConfirm){
          if (isConfirm) {
            swal.close();
            $.LoadingOverlay("hide");
          }
        });
      }
    } else {
      if (datosFact.nit != '' && datosFact.nit != null && datosFact.nit != undefined) {
        $scope.datosFact.nit = datosFact.nit;
        if (datosFact.correo != '' && datosFact.correo != null && datosFact.correo != undefined) {
          if (datosFact.celular != '' && datosFact.celular != null && datosFact.celular != undefined) {
            if (datosFact.razon_social != '' && datosFact.razon_social != null && datosFact.razon_social != undefined) {
              var raz = $scope.validarRazonSocial(datosFact.razon_social);
              if (raz == true) {
                swal({
                  title: "RAZON SOCIAL INEXISTENTE!",
                  text: "Por favor Introduzca su Apellido o Nombre para la emision de su factura",
                  type: "error",
                  confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                  closeOnConfirm: false
                },
                function(isConfirm){
                  if (isConfirm) {
                    swal.close();
                    $.LoadingOverlay("hide");
                  }
                });
              } else {
    
                procesando();
                if (datosFact.tipDoc == 5) {
                  var urlInforCiudd =  CONFIG.CONEXION_FACTURACION_V2 +'api/factura/informacionCiudadano/'+$scope.datosFact.nit+'/'+datosFact.tipDoc+'';
                  $.ajax({
                  type        : 'GET',
                  url         : urlInforCiudd,
                  data        : {},
                  dataType    : 'json',
                  crossDomain : true,
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  success: function(data) {
                      respon = data;
                      if (respon.estado == true) {
                        setTimeout(function () {
                          $scope.$apply(function () {
                            if (respon.data.mensaje == 'NIT INEXISTENTE' && respon.data.mensaje == '' && respon.data.mensaje == undefined && respon.data.mensaje == null) {
                              $scope.mensaje = respon.data.mensaje;
                              swal({
                                title: "ERROR!",
                                text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                                type: "error",
                                confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                                closeOnConfirm: false
                              },
                              function(isConfirm){
                                if (isConfirm) {
                                  swal.close();
                                }
                              });
                              $.LoadingOverlay("hide");                    
                            } else {
                              console.log("GENERAR FACTURA NIT CORRECTO");
                              $scope.btnPagar(datosFact);
                              $.LoadingOverlay("hide");
                            }
                          });
                        }, 600);
                      } else { 
                        setTimeout(function () {
                          $scope.$apply(function () {
                            $.LoadingOverlay("hide");
                            $scope.mensaje = respon.data.mensaje;
                            swal({
                              title: "ERROR!",
                              text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                              type: "error",
                              confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                              closeOnConfirm: false
                            },
                            function(isConfirm){
                              if (isConfirm) {
                                  swal.close();
                              }
                            });
                          });
                        }, 600);
                      }               
                    },
                    error: function (xhr, status, error) {
                      alertify.error('Error Intente de nuevo !!');
                      $.LoadingOverlay("hide");
                    }
                  });
                } else {
                    $scope.btnPagar(datosFact);
                    $.LoadingOverlay("hide");
                }
              }
            } else {
              swal({
                title: "RAZON SOCIAL VACIA!",
                text: "Por favor Introduzca su Apellido o Nombre para la emision de su factura",
                type: "error",
                confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                closeOnConfirm: false
              },
              function(isConfirm){
                if (isConfirm) {
                  swal.close();
                  $.LoadingOverlay("hide");
                }
              });
            } 
          } else {
            swal({
              title: "CELULAR VACIO!",
              text: "Por favor Introduzca su número de celular para que le llegue la factura ahi",
              type: "error",
              confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
              closeOnConfirm: false
            },
            function(isConfirm){
              if (isConfirm) {
                swal.close();
                $.LoadingOverlay("hide");
              }
            });
          }
        } else {
          swal({
            title: "CORREO VACIO!",
            text: "Por favor Introduzca su correo para que le llegue la factura ahi",
            type: "error",
            confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
            closeOnConfirm: false
          },
          function(isConfirm){
            if (isConfirm) {
              swal.close();
              $.LoadingOverlay("hide");
            }
          });
        }
      } else {
        swal({
          title: "NIT INEXISTENTE!",
          text: "Por favor Introduzca un numero que tenga 10 digitos por lo menos",
          type: "error",
          confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
          closeOnConfirm: false
        },
        function(isConfirm){
          if (isConfirm) {
            swal.close();
            $.LoadingOverlay("hide");
          }
        });
      }
    }    
  };


  $scope.validarRazonSocial = function (dato) {
    var valoresAceptados = /^[0-9]+$/;
    if (dato.indexOf(".") === -1) {
      if (dato.match(valoresAceptados)) {
        return true;
      } else {
        return false;
      }
    } else {
      var particion = dato.split(".");
      if (particion[0].match(valoresAceptados) || particion[0] == "") {
        if (particion[1].match(valoresAceptados)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

}
