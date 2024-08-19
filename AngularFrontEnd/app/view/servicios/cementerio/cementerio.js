function cementerioController($scope, $q, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG,
  LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, fileUpload1, $timeout, obtFechaCorrecta) {
  $scope.idInformacion = true;
  $scope.idventanabusqueda = false;
  $scope.idDatosBusquedaSepultura = false;
  $scope.idDeudaPagos = false;
  $scope.idHistorialPagos = false;
  $scope.idTablaDatos = false;
  $scope.idTarjetaDebito = false;
  $scope.idBucarDatosFallecido = false;
  $scope.idBucarDatosUbicacion = false;
  $scope.idLlamarCaptcha = false;
  
  $scope.idbotonBus = 0;
  urlRespuestaPagoBackEnd = CONFIG.CONEXION_PAGO_CEMENTERIO;
  $scope.mostrarCaptcha = function (id) {
    //$scope.idbotonBus = id;
    $scope.idInformacion = false;
    $scope.idventanabusqueda = false;
    $scope.idDatosBusquedaSepultura = false;
    $scope.idDeudaPagos = false;
    $scope.idHistorialPagos = false;
    $scope.idTablaDatos = false;
    $scope.idTarjetaDebito = false;
    $scope.idBucarDatosFallecido = false;
    $scope.idBucarDatosUbicacion = false;
    continuarSinCaptcha(id);
    //$scope.idLlamarCaptcha = true;
    //$scope.getCaptchasX();
    //$scope.ErrorCapcha = '';
    //$scope.SuccesCapchasxx = '';
  }

  $scope.ocultarCaptcha = function () {
    $scope.idLlamarCaptcha = false;
  }

  $scope.mostrarBusqueda = function () {
    $scope.idInformacion = false;
    $scope.idventanabusqueda = false;
    $scope.idDatosBusquedaSepultura = false;
    $scope.idDeudaPagos = false;
    $scope.idHistorialPagos = false;
    $scope.idTablaDatos = false;
    $scope.idTarjetaDebito = false;
    $scope.idBucarDatosFallecido = false;
    $scope.idBucarDatosUbicacion = false;
    $scope.idLlamarCaptcha = false;
  }

  $scope.mostrarDatosEncontrados = function () {
    $scope.idInformacion = false;
    $scope.idventanabusqueda = true;
    $scope.idDatosBusquedaSepultura = true;
    $scope.idDeudaPagos = true;
    $scope.idHistorialPagos = true;
    $scope.idTablaDatos = false;
    $scope.idTarjetaDebito = false;
  }

  $scope.mostrarDebito = function () {
    $scope.idInformacion = false;
    $scope.idventanabusqueda = false;
    $scope.idDatosBusquedaSepultura = false;
    $scope.idDeudaPagos = false;
    $scope.idHistorialPagos = false;
    $scope.idTablaDatos = false;
    $scope.idTarjetaDebito = true;
  }

  $scope.volverDatosEncontrados = function () {
    $scope.idInformacion = false;
    $scope.idBucarDatos = true;
    $scope.idventanabusqueda = true;
    $scope.idDatosBusquedaSepultura = true;
    $scope.idDeudaPagos = true;
    $scope.idHistorialPagos = true;
    $scope.idTablaDatos = false;
    $scope.idTarjetaDebito = false;
  }

  $scope.mostrarVistaBusqueda = function () {
    $scope.idInformacion = false;
    $scope.idBucarDatosUbicacion = true;
    $scope.idBucarDatosFallecido = false;
    $scope.idCoincidenciasFallecidos = false;
    $scope.idventanabusqueda = false;
    $scope.idDatosBusquedaSepultura = false;
    $scope.idDeudaPagos = false;
    $scope.idHistorialPagos = false;
    $scope.idTablaDatos = false;
    $scope.idTarjetaDebito = false;
    $scope.ocultarCaptcha();
  }

  $scope.mostrarBusquedaDatosFallecido = function () {
    $scope.idInformacion = false;
    $scope.idBucarDatosUbicacion = false;
    $scope.idBucarDatosFallecido = true;
    $scope.idCoincidenciasFallecidos = false;
    $scope.idventanabusqueda = false;
    $scope.idDatosBusquedaSepultura = false;
    $scope.idDeudaPagos = false;
    $scope.idHistorialPagos = false;
    $scope.idTablaDatos = false;
    $scope.idTarjetaDebito = false;
  }

  $scope.mostrarGrillaFallecidos = function () {
    $scope.idInformacion = false;
    $scope.idBucarDatosUbicacion = false;
    $scope.idBucarDatosFallecido = true;
    //$scope.idCoincidenciasFallecidos = true;
    $scope.idventanabusqueda = false;
    $scope.idDatosBusquedaSepultura = false;
    $scope.idDeudaPagos = false;
    $scope.idHistorialPagos = false;
    $scope.idTablaDatos = false;
    $scope.idTarjetaDebito = false;
  }

  $scope.datosEncontrados = function () {
    $scope.idInformacion = false;
    $scope.idBucarDatosUbicacion = false;
    $scope.idBucarDatosFallecido = false;
    $scope.idCoincidenciasFallecidos = false;
    $scope.idventanabusqueda = false;
    $scope.idDatosBusquedaSepultura = true;
    $scope.idDeudaPagos = false;
    $scope.idHistorialPagos = false;
    $scope.idTablaDatos = false;
    $scope.idTarjetaDebito = false;
  }

  $scope.volverDatosBusqueda = function () {
    $scope.idDatosBusquedaSepultura = true;
    $scope.idTarjetaDebito = false;
  }

//SECTORMAUSOLEO
 $scope.bsqSectorMausoleo = function () {
    var cUr = new bsqSectMau();
    cUr.cargarSectores1(function (resultado) {
      console.log('sectoresCargados',JSON.parse(resultado));
        var tam = JSON.parse(resultado).length;
        console.log ('tam',tam);
        var resultado2 = JSON.parse(resultado);
        for(var i=0; i<tam; i++){
          var ssector = resultado2[i].xcmt_sector;
          console.log ('ssector',ssector);
          document.getElementById("sectores").innerHTML += '<option value='+ssector+'>'+ssector+'</option';
          document.getElementById("mausoleos").length=1;
        }
    });
  }
  $scope.principioI = function () {
    $scope.idInformacion = true;
    $scope.idventanabusqueda = false;
    $scope.idDatosBusquedaSepultura = false;
    $scope.idDeudaPagos = false;
    $scope.idHistorialPagos = false;
    $scope.idTablaDatos = false;
    $scope.idTarjetaDebito = false;
    $scope.idBucarDatosFallecido = false;
    $scope.idBucarDatosUbicacion = false;
    $scope.idLlamarCaptcha = false;
    $scope.idbotonBus = 0;
    $("#busca1").val("");
    $scope.limpiar();
    $("#modalDataFactura").hide();
    $scope.totalPrecioItems = new Object(0);
    cant = 0;
    totalSuma = 0;
    $scope.dUbi = null;
    var aFallecido = [];
    $scope.dFallecido = new Object();
    $scope.dFallecido = aFallecido;
  }

  var unidadRecaudadoraCem = '';
  $scope.inicio = function () {
    $scope.recuperarDatosRegistro();
    $scope.getCaptchasX();
    var cUr = new obtUndRec();
    cUr.unidadRec(function (resultado) {
      var unidadRecaudadoraCem1 = JSON.parse(resultado);
      unidadRecaudadoraCem = unidadRecaudadoraCem1[0].cementerio_unidad_recaudadora_descripcion;
    });

    var datosCiudadano = new rcNatural();
    datosCiudadano.oid = sessionService.get('IDSOLICITANTE');
    datosCiudadano.datosCiudadanoNatural(function (resultado) {
      datosSolIgob = JSON.parse(resultado);
      var tipo = datosSolIgob[0].dtspsl_tipo_persona;
      var ci = datosSolIgob[0].dtspsl_ci;
      var nit = datosSolIgob[0].dtspsl_nit;
      var compl = datosSolIgob[0].dtspsl_complemento;
      if (tipo == 'NATURAL') {
        if (compl != '' || compl != "") {
          var ciNitEnv = ci;
        } else {
          var ciNitEnv = ci;
        }
        var tipoEnv = "N";
      } else {
        var ciNitEnv = nit;
        var tipoEnv = "J";
      }
      $scope.datosSolicitante1(ciNitEnv, tipoEnv);
    });
  };

  $scope.dPagos = Object(0);
  $scope.datosSolicitante1 = function (ciNit, tipoEnv) {
    var cr = new bsqSol();
    cr.ci_nit = ciNit;
    cr.tipo = tipoEnv;
    cr.ubiCmtSols(function (resultado) {
      var dataSol = JSON.parse(resultado);
      if (dataSol[0] != undefined) {
        var ids = dataSol[0].xcmt_solicitante_id;
        var cps = new obtPagosSol();
        cps.idSol = ids;
        cps.pagosSol(function (resultado) {
          var dataPagS = JSON.parse(resultado);
          arrClvsPagos = [];
          for (var i = 0; i < dataPagS.length; i++) {
            var gestion = JSON.parse(dataPagS[i].xcmt_pago_data).gestion_pagada;
            var ubi = dataPagS[i].xcmt_ubicacion_codigo_ubicacion;
            var est = dataPagS[i].xcmt_pago_estado;
            var arrDeuda = '{"gestion": "' + gestion + '","ubicacion":"' + ubi + '","estado":"' + est + '"}';
            arrClvsPagos.push(JSON.parse(arrDeuda));
          }
          $scope.dPagos = arrClvsPagos;
        });
      } else {
      }
    });
  }

  $scope.precioItem = new Object(0);
  var servicioTipo = '';
  var servicioTipoId = 0;
  var servicioNic = '';
  var servicioNicId = 0;
  var servicioUrnSarc = '';
  var servicioUrnSarcId = 0;
var servicioTemp = '';
  var servicioTempId = 0;
  var arrItemsClv = [];
  var arrItems = [];
  $scope.itemsClvCaronte = function (s1, s2, tipoN) {
    arrItemsClv = [];
    arrItems = [];
    var serv = new obtTipoServ();
    serv.servicioTipo(function (resultado) {
      var servicio = JSON.parse(resultado);
      servicioNic = JSON.parse(servicio[0].cementerio_tipo_servicio_conserv_limp_data).servicio;
      servicioNicId = servicio[0].cementerio_tipo_servicio_conserv_limp_id;
      servicioUrnSarc = JSON.parse(servicio[1].cementerio_tipo_servicio_conserv_limp_data).servicio;
      servicioUrnSarcId = servicio[1].cementerio_tipo_servicio_conserv_limp_id;
    });
    var cs = new obtItemsClv();
    cs.sigla1 = s1;
    cs.sigla2 = s2;
    cs.itemsEncClv(function (resultado) {
      var data = JSON.parse(resultado);
      if (tipoN == 'NIC') {
        arrItems.push(data[0].iditem);
        arrItems.push(data[0].costo);
        arrItems.push(data[0].descripcionitem);
        servicioTipo = servicioNic;
        servicioTipoId = servicioNicId;
      }
      else {
        arrItems.push(data[1].iditem);
        arrItems.push(data[1].costo);
        arrItems.push(data[1].descripcionitem);
        servicioTipo = servicioUrnSarc;
        servicioTipoId = servicioUrnSarcId;
	}
      arrItemsClv = arrItems;
      $scope.precioItem = arrItemsClv[1];
    });
  }

  var ubicacionIdEnc = 0;
  var titularIdEnc = 0;
  var dataFallEnc = '';
  var tipoNichoEnc = '';
  var titularesArray = [];
  var tipoTGlob = '';
  $scope.dFall = Object();
  var arrFll = [];
  $scope.dTit = Object();
  var arrTit = [];
  $scope.dUbi = Object();
  var arrUbi = [];
  $scope.datosUbicacion = function () {


    $.blockUI({
      css: {
        border: 'none',
        padding: '10px',
        backgroundColor: '#000',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        opacity: .5,
        color: '#fff'
      }, message: "Espere un momento por favor ..."
    });

    $.blockUI();

    arrGest = [];
    arrFll = [];
    arrUbi = [];
    arrTit = [];
    var ubi = $("#busca1").val();
    var cp = new bsqUbiFalls();
    cp.codigo = ubi;

    var regex = /^[A-Za-z0-9\s-]+$/;

    if (!regex.test(ubi)) {
      swal("Alerta!", "El código no corresponde posee caracteres especiales excepto guiones...", "warning");
      $.unblockUI();
      $("#busca1").val("");
    } else {
      var cp = new bsqUbiFalls();
      cp.codigo = ubi;
      cp.ubiCmtFalls(function (resultado) {
        console.log('data fall bsqUbiFalls', resultado);
        if (resultado == '[]') {
          $.unblockUI();
          swal("Alerta!", "El codigo es incorrecto...", "warning");
          //$scope.mostrarBusqueda();
          $("#busca1").val("");
        } else {
          $.unblockUI();
          $scope.datosEncontrados();
          var data = JSON.parse(resultado);
          console.log('fallecido por cod ubi', data);
          dataFallEnc = data;
          ubicacionIdEnc = data[0].xcmt_ubicacion_id;

          tipoNichoEnc = JSON.parse(data[0].xcmt_ubicacion_data).TipoNicho;
          var s1 = 'J';
          var s2 = 'J';
          $scope.itemsClvCaronte(s1, s2, tipoNichoEnc);
          console.log('clvs por ubi tipo ----------');
          // Ejemplo de uso
          /*var fechaInicio = "2020-07-15";
          var fechaFin = "2023-05-20";
          var listaFechas = $scope.rangoFechas(fechaInicio, fechaFin);
          console.log(listaFechas);*/
          if (tipoNichoEnc == 'NIC' || tipoNichoEnc == 'URN' || tipoNichoEnc == 'SAR') {
            //var fecha_ent = '0';
            //$scope.datosClvIdUbicacion(ubicacionIdEnc, fecha_ent, tipoNichoEnc);
            var fecha_venc = '0';
            $scope.datosClvIdUbicacion(ubicacionIdEnc, fecha_venc, tipoNichoEnc);
          } else {
            for (var j = 0; j < data.length; j++) {
              var estadoInh = data[j].xcmt_inhumaciones_estado;
              console.log('estadoInh en temporales', estadoInh);
              if (estadoInh == 'finalizado') {
                console.log('estadoInh en temporales SOLO FINALIZADO', estadoInh);
                var dataInh = data[j].xcmt_inhumaciones_data;
                console.log('data INH', dataInh);
                if (dataInh != null) {
                  //var fecha_ent = JSON.parse(data[j].xcmt_inhumaciones_data).fecha_registro;
                  var fecha_venc = JSON.parse(data[j].xcmt_inhumaciones_data).fecha_limite_inhumacion;
                  console.log('fecha INH vencimiento', fecha_venc);
                  /*var fecha_venc = JSON.parse(data[j].xcmt_inhumaciones_data).fecha_limite_inhumacion;
                  console.log('fecha INH vencimiento', fecha_venc);
                  var listaFechas = $scope.rangoFechas(fecha_ent, fecha_venc);
                  console.log(listaFechas);*/
                  //$scope.datosClvIdUbicacion(ubicacionIdEnc, fecha_ent, tipoNichoEnc);
                  $scope.datosClvIdUbicacion(ubicacionIdEnc, fecha_venc, tipoNichoEnc);
                } else {
                }
              } else {
              }
            }
          }
        }
        $scope.dFall = arrFll;
        var tipoUbi = JSON.parse(data[0].xcmt_ubicacion_data).TipoNicho;
        var datosU = '{"idUbi":"' + data[0].xcmt_ubicacion_id + '","codigo":"' + data[0].xcmt_ubicacion_codigo_ubicacion + '","tipo":"' + tipoUbi + '"}';
        var datosU2 = JSON.parse(datosU);
        arrUbi.push(datosU2);
        $scope.dUbi = arrUbi;
        var ciAux = 0;
        titularesArray = [];
        var datoT = '';
        for (var i = 0; i < data.length; i++) {
          titularesArray = JSON.parse(data[i].xcmt_titular_data);
          titularIdEnc = data[i].xcmt_titular_id;
          tipoTGlob = data[i].xcmt_titular_tipo;
          for (var j = 0; j < titularesArray.length; j++) {
            var titularesID = titularesArray[j].titularesId;
            if (titularesID != ciAux) {
              if (tipoTGlob == 'N') {
                datoT = '{"idt":"' + data[i].xcmt_titular_id + '","nombret":"' + titularesArray[j].nombre + '","paternot":"' + titularesArray[j].paterno + '","maternot":"' + titularesArray[j].materno + '","casadat":"' + titularesArray[j].casada + '"}';
              }
              else {
                datoT = '{"idt":"' + data[i].xcmt_titular_id + '","nombret":"' + titularesArray[j].razonSocial + '","paternot":"","maternot":"","casadat":""}';
              }
              var datos3 = JSON.parse(datoT);
              arrTit.push(datos3);
              ciAux = titularesID;
            }
            else {
            }
          }
        }
        $scope.dTit = arrTit;
    });
  }
  };

  var arrGest = [];
  var arrGest2 = [];
  $scope.dClvs = Object();
  var arrClvs = [];
  //$scope.datosClvIdUbicacion = function (idUbi, fecha_inh, tipoUbi) {
  $scope.datosClvIdUbicacion = function (idUbi, fecha_venc, tipoUbi) {
    var ubiId = idUbi;
    var cq = new bsqUbiClvs();
    cq.id_ubi = ubiId;
    cq.ubiCmtClvs(function (resultado) {
      arrClvs = [];
      var data = JSON.parse(resultado);
      arrPagosClv = resultado;
      for (var i = 0; i < data.length; i++) {
        var fecha = JSON.parse(data[i].xcmt_pago_data).fechaReg;
        var fecha_frag1 = fecha.split('-');
        var fecha_refrag1 = fecha_frag1[2] + ' ' + '/' + ' ' + fecha_frag1[1] + ' ' + '/' + ' ' + fecha_frag1[0];
        var serv = JSON.parse(data[i].xcmt_pago_data).TservicioDesc;
        var gest = JSON.parse(data[i].xcmt_pago_data).gestion_pagada;
        var mont1 = JSON.parse(data[i].xcmt_pago_detalle_data);
        var mont = mont1[0].Monto;
        var fuec = JSON.parse(data[i].xcmt_pago_data).nroCorrelativoFum;
        var datoClvs = '{"idPago":"' + data[i].xcmt_pago_id + '","fecha_pago":"' + fecha_refrag1 + '","servicio":"' + serv + '","ubicacion":"' + data[i].xcmt_ubicacion_codigo_ubicacion + '","gestion":"' + gest + '","total":"' + mont + '","proforma":"' + fuec + '","estado":"' + data[i].xcmt_pago_estado + '","posicion":"' + i + '"}';
        var datos4 = JSON.parse(datoClvs);
        arrClvs.push(datos4);
        arrGest.push(gest);
      }
      $scope.dClvs = arrClvs;

      $scope.buscarGestiones(arrGest, fecha_venc, tipoUbi);

    });
  };

  $scope.reimpFact = function (i) {
    var urlff = JSON.parse(arrPagosClv);
    console.log('urlff',urlff);
    var urlTopdf = JSON.parse(JSON.parse(urlff[i].xcmt_pago_factura));
    var urlf = urlTopdf.urlpdf;
    window.open(urlf);
  }

  $scope.reimpFuecs = function (fuec) {
    var cfc = new obtFuec();
    cfc.fuec1 = fuec;
    cfc.rfuec(function (resultado) {
      var fuecG = resultado[0].sp_obtener_grupo_fuec_igob2;
      var urlPdf = CONFIG.CONEXION_API_CEMENTERIO + 'generarProforma?datos=' + fuecG;
      console.log('urlPdf',urlPdf);
      urlPdf = urlPdf.replace('d1', fuecG);
      window.open(urlPdf);
      //window.open(urlPdf,"mywindow","location=1,status=1,scrollbars=1,width=1000,height=1000");
      });
  }

  var tamDeudas = 0;
  $scope.dDeudas = Object();
  var arrClvsDeuda = [];
  //$scope.buscarGestiones = function (arrGest, fecha_inh, tipoUbi) {
  $scope.buscarGestiones = function (arrGest, fecha_venc, tipoUbi) {
    console.log('fecha_venc', fecha_venc);
    arrClvsDeuda = [];
    var fecha = new Date(fecha_venc);
    var año = fecha.getFullYear() - 2;
    console.log('año reducido en 1', año);
    if (arrGest[0] == undefined) {
      if (tipoUbi == 'NIC' || tipoUbi == 'URN' || tipoUbi == 'SAR') {
        var max = 2017;
      } else {
        //fecha de inicio de cobro segun resolucion
        var date2 = '2023-04-28';
        console.log('fecha cobroooo', date2);
        //fecha de entierro
      const dateObj1 = new Date(fecha_venc);
      const dateObj2 = new Date(date2);
      // Comparar los objetos Date
      if (dateObj1 > dateObj2) {
        console.log('fecha entierro mayor a fecha de cobro -cobrar-');
        var max = año;
        console.log('fecha max', max);
      } else if (dateObj1 < dateObj2) {
        console.log('fecha entierro menor a fecha de cobro');
        var hoy = new Date();
        var max = hoy.getFullYear() - 1;
      } else {
        console.log('fecha entierro mayor a fecha de cobro -cobrar-');
        var max = año;
        console.log('fecha max', max);
      }
      }
    } else {
      arrGest2 = arrGest.map(x => parseInt(x));
      var max = MyMax(arrGest2);
    }
    var hoy = new Date();
    var gestVigente = hoy.getFullYear() - 1;
    arrClvsDeuda = [];
    for (var i = max + 1; i <= gestVigente; i++) {
      if (i == gestVigente) {
        var arrDeuda = '{"gestionAdeuda": ' + i + ',"tipoGestion":"Vigente"}';
      } else {
        var arrDeuda = '{"gestionAdeuda": ' + i + ',"tipoGestion":"Adeuda"}';
      }
      arrClvsDeuda.push(JSON.parse(arrDeuda));
    }
    $scope.dDeudas = arrClvsDeuda;
    tamDeudas = $scope.dDeudas.length;
    $(".seleccionar1").attr("disabled", true);
  }

  function MyMax(myarr) {
    var al = myarr.length; maximum = myarr[al - 1];
    while (al--) { if (myarr[al] > maximum) { maximum = myarr[al] } }
    return maximum;
  };

  datosSolIgob = [];
  $scope.recuperarDatosRegistro = function () {
    var datosCiudadano = new rcNatural();
    datosCiudadano.oid = sessionService.get('IDSOLICITANTE');
    datosCiudadano.datosCiudadanoNatural(function (resultado) {
      datosSolIgob = JSON.parse(resultado);
      var tipo = datosSolIgob[0].dtspsl_tipo_persona;
      var compl = datosSolIgob[0].dtspsl_complemento;
      if (tipo == 'NATURAL') {
        if (compl != '' || compl != "") {
          var ciNitEnv = datosSolIgob[0].dtspsl_ci;
        } else {
          var ciNitEnv = datosSolIgob[0].dtspsl_ci;
        }
        var tipoEnv = "N";
      } else {
        var ciNitEnv = datosSolIgob[0].dtspsl_nit;
        var tipoEnv = "J";
      }
      $scope.datosSolicitante(ciNitEnv, tipoEnv);
    });
  }

  var solicitanteIdEnviar = 0;
  var arrSolReg = '';
  $scope.datosSolicitante = function (ciNit, tipoEnv) {
    var cr = new bsqSol();
    cr.ci_nit = ciNit;
    cr.tipo = tipoEnv;
    cr.ubiCmtSols(function (resultado) {
      var dataSol = JSON.parse(resultado);
      if (dataSol[0] == undefined) {
        var d = datosSolIgob[0];
        var tipp = d.dtspsl_tipo_persona;
        var datSols = '{"tipo":"' + d.dtspsl_tipo_persona + '","ci":"' + d.dtspsl_ci + '","casada": " ","email":"' + d.dtspsl_correo + '","genero":"' + d.dtspsl_sexo + '","nombre":"' + d.dtspsl_nombres + '","materno":"' + d.dtspsl_materno + '","paterno":"' + d.dtspsl_paterno + '","expedido":"' + d.dtspsl_expedido + '","fechaNac":"' + d.dtspsl_fec_nacimiento + '","telefono": "' + d.dtspsl_movil + '","domicilio":"' + d.dtspsl_direccion + '","parentesco":"","estadoCivil":"' + d.dtspsl_id_estado_civil + '","idIgob":"' + d._id + '","sistemaCreado":"' + d.dtspsl_sistema_modificador + '","mod":"NO"}';
        arrSolReg = datSols;
        if (tipp == 'NATURAL') { var ti = 'N'; } else { var ti = 'J'; }
        $scope.registrarSolicitante(ti);
      } else {
        var sol = JSON.parse(resultado);
        solicitanteIdEnviar = sol[0].xcmt_solicitante_id;
        var d = datosSolIgob[0];
        var dataSolCar = JSON.parse(resultado);
        var det = JSON.parse(dataSolCar[0].xcmt_solicitante_data);
        var data2 = '{"idIgob":"' + d._id + '","sistemaCreado":"' + d.dtspsl_sistema_modificador + '","mod":"SI","email":"' + d.dtspsl_correo + '","tipo":"' + d.dtspsl_tipo_persona + '","ci": "' + det.ci + '", "casada": "' + det.casada + '", "genero": "' + det.genero + '", "nombre": "' + det.nombre + '", "materno": "' + det.materno + '", "paterno": "' + det.paterno + '", "expedido": "' + det.expedido + '", "fechaNac": "' + det.fechaNac + '", "telefono": "' + d.dtspsl_movi + '", "domicilio": "' + d.dtspsl_direccion + '", "parentesco": "' + det.parentesco + '", "estadoCivil": "' + det.estadoCivil + '"}';
        arrSolAct = data2;
      }
    });
  }

  $scope.registrarSolicitante = function (ti) {
    var crs = new regSol();
    crs.idc = 1;
    crs.tipoS = ti;
    crs.dataS = arrSolReg;
    crs.usr = 273;
    crs.solReg(function (resultado) {
      var sol = JSON.parse(resultado);
      solicitanteIdEnviar = sol[0].sp_insertar_cmt_solicitante_igob;
    });
  }

  $scope.cantSeleccionada = new Object(0);
  $scope.totalPrecioItems = new Object(0);
  var arrJsonItemsIndividual = '';
  var arrJsonItemsIndividualFact = '';
  var arrGestiones = [];
  var arrGestionesFact = [];
  var arrJsonItems = '';
  var arrJsonItemsFact = '';
  var cant = 0;
  var totalSuma = 0;
  //REVISARRR PARA UBICACIONES QUE NO CANCELARON NUNCA

  $scope.cerrarDatosTarjeta = function () {
    $('#pagoTarjeta').attr("disabled", false);
    for (var g = tamDeudas; g >= 1; g--) {
      document.getElementById('seleccionar' + g + '').disabled = false;
    }

  }

  $scope.actualizarPagos = function (flg) {
    $("#modalDataFactura").hide();
    arrGest = [];
    arrFll = [];
    arrTit = [];
    var elf = new elimTrans();
    elf.fuec = fuecObt;
    elf.ElimTrans(function (resultado) {
    });
    $('#visorIframe').attr('src', "");
    if (flg == 2) {
      $scope.principioI();
    } else {
      $scope.cerrarDatosTarjeta();
    }
  }


  $scope.incluirAccion = function (datoIn) {
    $('#pagoTarjeta').attr("disabled", false);
    cant = 0;
    totalSuma = 0;
    arrJsonItems = '';
    arrJsonItemsFact = '';
    arrJson = '';
    arrJsonFact = '';
    var elem;
    arrJsonItemsIndividual = '';
    arrJsonItemsIndividualFact = '';
    arrGestiones = [];
    arrGestionesFact = [];
    for (var g = tamDeudas; g >= 1; g--) {
      document.getElementById('seleccionar' + g + '').checked = false;
    }
    for (var k = datoIn; k >= 1; k--) {
      document.getElementById('seleccionar' + k + '').checked = true;
    }
    for (var j = 1; j <= tamDeudas; j++) {
      var chckS = document.getElementById('seleccionar' + j + '').checked;
      if (chckS == true) {
        totalSuma = parseFloat(arrItemsClv[1]) * j;
        cant = cant + 1;
        var jsonData = '{"Monto":' + totalSuma + ',"idItemR":' + arrItemsClv[0] + ',"descripcionItem":"' + arrItemsClv[2] + '","cantidad": ' + cant + ' ,"costoUnidad":' + arrItemsClv[1] + '}';
        var jsonDataFact = '{"montoDescuento":0,"codItemRecaudador":' + arrItemsClv[0] + ',"concepto":"' + arrItemsClv[2] + '","cantidad": "' + cant + '" ,"precioUnitario":"' + arrItemsClv[1] + '"}';
        arrJson = jsonData;
        arrJsonFact = jsonDataFact;
        elem = document.getElementById('seleccionar' + j + '').value;
        arrGestiones.push(elem);
        arrGestionesFact.push(elem);
      }
    }
    if (arrGestiones.length == 0) {
      $('#boton_mostrar_debito').attr("disabled", true);
    } else {
      $('#boton_mostrar_debito').attr("disabled", false);
    }
    $scope.cantSeleccionada = cant;
    $scope.totalPrecioItems = totalSuma;
    arrJsonItems = arrJsonItems + arrJson + ',';
    arrJsonItemsFact = arrJsonItemsFact + arrJsonFact + ',';
    arrJsonFact = '';
    arrJsonItemsIndividual = '{"montoDescuento":0,"Monto":' + arrItemsClv[1] + ',"idItemR":' + arrItemsClv[0] + ',"descripcionItem":"' + arrItemsClv[2] + '","cantidad": 1 ,"costoUnidad":' + arrItemsClv[1] + '},';
    arrJsonItemsIndividualFact = '{"montoDescuento":0,"codItemRecaudador":' + arrItemsClv[0] + ',"concepto":"' + arrItemsClv[2] + '","cantidad": "1" ,"precioUnitario":"' + arrItemsClv[1] + '"},';
  }

  $scope.buscarDoc = function () {
    var doc = new bsqdoc();
    doc.ci_nit = $('#numDoc').val();
    doc.tipo = $('#tipoDoc').val();
    doc.bsqDocFact(function (resultado) {
      var mensaje = JSON.parse(resultado);
      $('#respDoc').val(mensaje.data.mensaje);
    });
  }

  $scope.ordDeudas = new Object();
  var encuentra = 0;
  $scope.gestionesAdeudos = function () {
    $("#modalDataFactura").show();
    //$('#modalDataFactura').modal({ show: true });
    $('#boton_mostrar_debito').attr("disabled", true);
    var tipo = datosSolIgob[0].dtspsl_tipo_persona;
    var nom = datosSolIgob[0].dtspsl_nombres;
    var pat = datosSolIgob[0].dtspsl_paterno;
    var mat = datosSolIgob[0].dtspsl_materno;
    var nomComp = nom + " " + pat + " " + mat;
    $('#email').val(datosSolIgob[0].dtspsl_correo);
    if (tipo == 'NATURAL') {
      $('#numDoc').val(datosSolIgob[0].dtspsl_ci);
      $('#razonSolfact').val(nomComp);
    } else {
      $('#numDoc').val(datosSolIgob[0].dtspsl_nit);
    }
    $scope.bloqDatosEnv();
    setTimeout(function () {
      $('#boton_mostrar_debito').attr("disabled", true);
      for (var g = tamDeudas; g >= 1; g--) {
        document.getElementById('seleccionar' + g + '').disabled = true;
      }
      var gestDeudas = $scope.dDeudas;
      var selecGestiones = arrGestiones;
      /*for (var i = 0; i < gestDeudas.length; i++) {
        if (encuentra == 0) {
          for (var k = 0; k < selecGestiones.length; k++) {
            if (selecGestiones[k] == gestDeudas[k].gestionAdeuda) {
              encuentra = 0;
            } else {
              encuentra = encuentra + 1;
            }
          }
        }
        if (encuentra == 0) {
          
        } else {
          swal("Atención...", "Seleccione la Gestión mas antigua", "warning");
          for (var j = 1; j <= tamDeudas; j++) {
            document.getElementById('seleccionar' + j + '').checked = false;
          }
          arrGestiones = [];
          arrClvsDeuda = [];
          gestDeudas = '';
          selecGestiones = '';
          $('.idDatosBusquedaSepultura').load();
          encuentra = 0;
        }
      }*/
    }, 300);
  }


  $scope.visorIframe = {
    url: null,
    titulo: null,
    texto: null
  }

  $scope.iniciarPago = function () {
    setTimeout(function () {
      console.log('inicio pago');
      var datosCiudadano1 = new rcNatural();
      datosCiudadano1.oid = sessionService.get('IDSOLICITANTE');
      var d = datosSolIgob[0];
      var compl1 = d.dtspsl_complemento;
      var idc = sessionService.get('IDCIUDADANO');
      var ci_nit = sessionService.get('CICIUDADANO');
      var bloque2 = arrJsonItemsFact.substr(0, arrJsonItemsFact.length - 1);
      var bloque3 = '[' + bloque2 + ']';
      var fuecD = fuecObt.replace("/", "_");
      var tramD = tramObt.replace("/", "_");
      var cedpel = new enviarDatosPagos();
      cedpel.logueo = "SI";
      cedpel.fecha_ultima_compra = "01/01/20";
      cedpel.recurrente = "NO";
      cedpel.comercio = "CEMENTERIO";
      cedpel.sistema = "CARONTE";
      cedpel.ci_nit = ci_nit;
      cedpel.id_servicio = fuecD;
      cedpel.servicio = "CLV";
      cedpel.total = totalSuma;
      cedpel.oid_ciudadano = idc;
      cedpel.nombres = d.dtspsl_nombres;
      cedpel.apellidos = d.dtspsl_paterno + ' ' + d.dtspsl_materno + ' ' + d.dtspsl_tercer_apellido;
      cedpel.email = d.dtspsl_correo;
      cedpel.celular = d.dtspsl_movil;
      cedpel.direccion = d.dtspsl_direccion;
      cedpel.items = bloque3;

      cedpel.nombRazFact = $('#razonSolfact').val();
      cedpel.ciNitFact = $('#numDoc').val();
      cedpel.tipoPer = $('#tipoDoc').val();
      cedpel.correoFact = $('#email').val();

      cedpel.EnviarDatosPagos(function (resultado) {
        var urlResp = JSON.parse(resultado);
        var urlResp1 = JSON.parse(urlResp).formulario;
        urlRespuestaPagoBackEnd = CONFIG.CONEXION_PAGO_CEMENTERIO;
        var rutaREspuestaBackendPago = urlRespuestaPagoBackEnd + "/"+ urlResp1;
        window.setTimeout(function () {
          $('#divPopupIFramePo').modal({ show: true });
          visorIframeTarjeta(rutaREspuestaBackendPago);
        }, 500);
      });
    }, 500);
  }

  function visorIframeTarjeta(ruta) {
    $scope.visorIframe.url = ruta;
    $('#visorIframe').attr('src', $scope.visorIframe.url);
  }

  $scope.mostrarMensajePago = function () {
    var dato1 = $('#respP').val();
  };

  var datos_titularesEnc = '';
  var fuecObt = '';
  var tramObt = '';
  var titularT = '';
  $scope.iniciarFuec = function () {
    swal({
      title: "¿Está seguro de Realizar la Transacción?",
      text: "El monto total a pagar es de Bs." + totalSuma + "",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: "NO",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "SI",
      closeOnConfirm: false
    }, function () {
      swal.close();
      $('#boton_mostrar_debito').attr("disabled", true);
      $("#modalDataFactura").hide();
      //$('#modalDataFactura').modal({ show: false });
      var tipo1 = 'FUM';
      var tipo2 = 'CLV';
      var cf = new obtFuecProc();
      cf.tipo1 = tipo1;
      cf.tipo2 = tipo2;
      cf.fuecProc(function (resultado) {
        var data = JSON.parse(resultado);
        var numero = data[0].sp_obtener_fuecs_prueba;
        var numeroArr = numero.split('-');
        fuecObt = numeroArr[0];
        tramObt = numeroArr[1];
        var tam = titularesArray.length;
        titularT = '';
        if (tipoTGlob == 'N') {
          for (var j = 0; j < tam; j++) {
            var datosT = '';
            var nombreT = titularesArray[j].nombre;
            var paternoT = titularesArray[j].paterno;
            var maternoT = titularesArray[j].materno;
            var casadaT = titularesArray[j].casada;
            datosT = nombreT + ' ' + paternoT + ' ' + maternoT + ' ' + casadaT;
            titularT = titularT + datosT + ' -';
          }
        } else if (tipoTGlob == 'J') {
          for (var j = 0; j < tam; j++) {
            var datosT = '';
            var rSocialT = titularesArray[j].razonSocial;
            titularT = titularT + rSocialT + ' -';
          }
        }
        datos_titularesEnc = 'Titular(es): ' + titularT;
        var cod = arrUbi[0].codigo;
        var bloque2 = arrJsonItems.substr(0, arrJsonItems.length - 1);
        var bloque3 = '[' + bloque2 + ']';
        var tipo = datosSolIgob[0].dtspsl_tipo_persona;
        if (tipo == 'NATURAL') {
          var tipodoc = 'CI';
        } else {
          var tipodoc = 'NIT';
        }
        var fecha = new Date();
        if (fecha.getDate() <= 9) {
          var dia1 = "0" + fecha.getDate();
        } else {
          var dia1 = fecha.getDate();
        }
        if ((fecha.getMonth() + 1) <= 9) {
          var mes1 = "0" + (fecha.getMonth() + 1);
        } else {
          var mes1 = (fecha.getMonth() + 1);
        }
        var fechaValidez = fecha.getFullYear() + "-" + mes1 + "-" + dia1;
        var obsPago = '';
        var dataFall = dataFallEnc;
        var nombresf = JSON.parse(dataFall[0].xcmt_fallecido_data).nombre;
        var paternof = JSON.parse(dataFall[0].xcmt_fallecido_data).paterno;
        var idf = dataFall[0].xcmt_fallecido_id;
        var nombreCompFall = nombresf + ' ' + paternof;
        var ciFallecido = JSON.parse(dataFall[0].xcmt_fallecido_data).ci;
        var idt = 'con IDT: ' + titularIdEnc;
        var tipo_pago_serv = 'CLV';
        var nombreUsuario = 'iGob';
        var d = datosSolIgob[0];
        var nombreCompletoSolicitante = d.dtspsl_nombres + ' ' + d.dtspsl_paterno + ' ' + d.dtspsl_materno + ' ' + d.dtspsl_tercer_apellido;
        var ciSolicitante = d.dtspsl_ci;
        var elems = '';
        var tamGest = arrGestiones.length;
        for (var i = 0; i < tamGest; i++) {
          var elems2 = arrGestiones[i];
          elems = elems + elems2 + ' - ';
        }
        var datosObs = "GESTION(ES) A PAGAR: " + elems + "Usuario: " + nombreUsuario + " - Nro. Tramite: " + tramObt + " - " + datos_titularesEnc + " - " + idt + " - Obs. de Pago: " + obsPago;
        var contribuyente = '{"codigo":"","contribuyente": "' + nombreCompletoSolicitante + '","tipoIdentificacion":"' + tipodoc + '","numeroIdentificacion":"' + ciSolicitante + '"}';
        var dataGlosa = '{"cabecera":"CEMENTERIO","detalles":{"detalleA":"' + nombreCompFall + '","detalleB":"' + ciFallecido + '","detalleC":"' + cod + '","detalleD":"' + idf + '","detalleE":"' + fechaValidez + '","detalleF":"' + tipo_pago_serv + '"},"pie":"","observaciones":"' + datosObs + '"}';
        var transacciones = bloque3;
        var tipo = 'CEMENTERIO';
        var usuarioEdc = 273;
        var idDeudas = 0;
        var monto = totalSuma;
        var urlCem = CONFIG.CONEXION_API_CEMENTERIO + 'generarProforma?datos=';
        var urlCems1 = urlCem.replace(':', 'QQQ');
        var urlCems2 = urlCems1.replace('//', 'RRR');
        var urlCems = urlCems2.replace('/', 'SSS');
        $scope.guardarFuec(idDeudas, tipo, monto, contribuyente, transacciones, dataGlosa, fuecObt, usuarioEdc, urlCems);
      });
    });
  }

  $scope.guardarFuec = function (idDeudas, tipo, monto, contribuyente, transacciones, dataGlosa, fuecObt, usuarioEdc, urlCems) {
    var cgf = new regFuec();
    cgf.deudaId = idDeudas;
    cgf.tip = tipo;
    cgf.monto = monto;
    cgf.contrib = contribuyente;
    cgf.trans = transacciones;
    cgf.dGlosa = dataGlosa;
    cgf.fuecOb = fuecObt;
    cgf.edcUsu = usuarioEdc;
    cgf.urlC = urlCems;
    cgf.RegFuec(function (resultado) {
      $scope.guardarPago();
    });
  }

  $scope.guardarPago = function () {
    var elems = '';
    for (var i = 0; i < arrGestiones.length; i++) {
      elems = elems + arrGestiones[i] + ' - ';
    }
    var observaciones = 'GESTION(ES) A PAGAR: ' + elems + ', ' + datos_titularesEnc + ', con IDT: ' + titularIdEnc;
    var cadena2 = arrJsonItemsIndividual.substr(0, arrJsonItemsIndividual.length - 1);
    var arrayJsonEnviar = '[' + cadena2 + ']';
    var gestionesElegidas = '';
    for (var i = 0; i < arrGestiones.length; i++) {
      gestionesElegidas = gestionesElegidas + arrGestiones[i] + ',';
    }
    var gest1 = gestionesElegidas.substr(0, gestionesElegidas.length - 1);
    var arrayJsonGest = '{' + gest1 + '}';
    var fecha = new Date();
    if (fecha.getDate() <= 9) {
      var dia1 = "0" + fecha.getDate();
    } else {
      var dia1 = fecha.getDate();
    }
    if ((fecha.getMonth() + 1) <= 9) {
      var mes1 = "0" + (fecha.getMonth() + 1);
    } else {
      var mes1 = (fecha.getMonth() + 1);
    }
    var fechaDelDia = fecha.getFullYear() + "-" + mes1 + "-" + dia1;
    var horaDelDia = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
    var data2 = '{"tipo_pago_serv":"CLV","nroCorrelativoFum":"' + fuecObt + '","origen_datos":"IGOB","idUsuario":273,"nombreUsuario":"IGOB","totalMonto":' + totalSuma + ',"idFum":"","fechaReg":"' + fechaDelDia + '","tipo_pago":"FUEC","TservicioDesc":"' + servicioTipo + '","TservicioDescId":"' + servicioTipoId + '","nTramite":"' + tramObt + '","observaciones":"' + observaciones + '","id_asignacion":"0","gestion_pagada":"","ids_ubicaciones":"' + ubicacionIdEnc + '","horaReg":"' + horaDelDia + '"}';
    var data4 = '{"nroCorrelativoFum":"' + fuecObt + '","fecha_registro":"' + fechaDelDia + '","tipo_servicio":"' + servicioTipo + '","tipo_servicio_id":"' + servicioTipoId + '","unidad_recaudadora":"' + unidadRecaudadoraCem + '","ids_ubicaciones":"' + ubicacionIdEnc + '","horaReg":"' + horaDelDia + '","gestion_pagada":"","totalMonto":' + totalSuma + ',"idUsuario":273,"nombreUsuario":"IGOB","nTramite":"' + tramObt + '","horaReg":"' + horaDelDia + '"}';
    var cgp = new regPago();
    cgp.pUbiId = ubicacionIdEnc;
    cgp.pTitId = titularIdEnc;
    cgp.pSolId = solicitanteIdEnviar;
    cgp.pFallId = dataFallEnc[0].xcmt_fallecido_id;
    cgp.pData = data2;
    cgp.pDetData = arrayJsonEnviar;
    cgp.pDataClv = data4;
    cgp.pGest = arrayJsonGest;
    cgp.pUsr = 273;
    cgp.RegPago(function (resultado) {
      $scope.iniciarPago();
      $('#pagoTarjeta').attr("disabled", true);
    });
  }
  //------------------------------------------------------------------
  //FUNCIONES PARA LA BUSQUEDA CON DATOS DEL FALLECIDO
  var aFallecido = [];
  $scope.dFallecido = new Object();
  $scope.dataFallecido = [];
  $scope.tablaFallecido = {};
  $scope.obtFalls = function () {
    aFallecido = [];
    $scope.dFallecido = aFallecido;
    var fid1 = $('#idIdfF').val();
    if (fid1 == '' || fid1 == "") { var fid = '0'; } else { var fid = fid1; }
    //var fnom1 = ($('#idNomFall').val()).toUpperCase();
    var fnom1 = ($('#idNomFall').val());
    if (fnom1 == '' || fnom1 == "") { var fnom = 'NULO'; } else { var fnom = fnom1; }
    var fpat1 = ($('#idApPatF').val());
    if (fpat1 == '' || fpat1 == "") { var fpat = 'NULO'; } else { var fpat = fpat1; }
    var fmat1 = ($('#idApMatF').val());
    if (fmat1 == '' || fmat1 == "") { var fmat = 'NULO'; } else { var fmat = fmat1; }
    var fcas1 = ($('#idApCasF').val());
    if (fcas1 == '' || fcas1 == "") { var fcas = 'NULO'; } else { var fcas = fcas1; }
    var fci1 = $('#idCif').val();
    if (fci1 == '' || fci1 == "") { var fci = 'NULO'; } else { var fci = fci1; }
    var cf = new dataFalls();
    cf.idf = fid;
    cf.nomf = fnom;
    cf.patf = fpat;
    cf.matf = fmat;
    cf.casf = fcas;
    cf.cif = fci;
    cf.fallsEnc(function (resultado) {
      var data = JSON.parse(resultado);
      if(data.length==0){
        $scope.idCoincidenciasFallecidos=false;
        swal("Alerta!", "No se encontraron coincidencias.", "warning");
      }
      else{
        $scope.idCoincidenciasFallecidos=true;
      }
      for (var i = 0; i < data.length; i++) {
        var nombresf = JSON.parse(data[i].ydata_fll).nombre;
        var paternof = JSON.parse(data[i].ydata_fll).paterno;
        var maternof = JSON.parse(data[i].ydata_fll).materno;
        var casadaf = JSON.parse(data[i].ydata_fll).casada;
        var cif = JSON.parse(data[i].ydata_fll).ci;
        var idf = data[i].yid_fll;
        var c_ubi = data[i].ycodigo_ubicacion;
        var dataF = '{"ci":"' + cif + '","idf":"' + idf + '","nombre":"' + nombresf + '","paterno":"' + paternof + '","materno":"' + maternof + '","casada":"' + casadaf + '","codubicacion":"' + c_ubi + '"}';
        var dataF2 = JSON.parse(dataF);
        aFallecido.push(dataF2);
      }
      $scope.dFallecido = aFallecido;
      var data = aFallecido;
      $scope.dataFallecido = aFallecido;
      $scope.tablaFallecido.reload();
    });
  };

  //SELECCCIONAR TRAMITE DEL FALLECIDO
  $scope.seleccionarFallecido = function (tramite) {
    var ubi = tramite.codubicacion;
    $("#busca1").val(ubi);
    $scope.dFall = null;
    var arrFll = [];
    $scope.dTit = null;
    var arrTit = [];
    $scope.dUbi = null;
    var cp = new bsqUbiFalls();
    cp.codigo = ubi;
    cp.ubiCmtFalls(function (resultado) {
      var data = JSON.parse(resultado);
      var ubicacionIdEnc = data[0].xcmt_ubicacion_id;
      var s1 = 'J';//grupo J
      var s2 = 'J';//grupo J
      var tipoUbi = JSON.parse(data[0].xcmt_ubicacion_data).TipoNicho;
      $scope.itemsClvCaronte(s1, s2, tipoUbi);
      $scope.datosClvIdUbicacion(ubicacionIdEnc);

      //FALLECIDO
      for (var i = 0; i < data.length; i++) {
        var nombresf = JSON.parse(data[i].xcmt_fallecido_data).nombre;
        var paternof = JSON.parse(data[i].xcmt_fallecido_data).paterno;
        var maternof = JSON.parse(data[i].xcmt_fallecido_data).materno;
        var casadaf = JSON.parse(data[i].xcmt_fallecido_data).casada;
        var cif = JSON.parse(data[i].xcmt_fallecido_data).ci;
        var idf = data[i].xcmt_fallecido_id;
        var datos = '{"cif":"' + cif + '","idf":"' + idf + '","nombre":"' + nombresf + '","paterno":"' + paternof + '","materno":"' + maternof + '","casada":"' + casadaf + '"}';
        var datos2 = JSON.parse(datos);
        arrFll.push(datos2);
      }
      $scope.dFall = arrFll;
      dataFallEnc = data;
      var ubiId = data[0].xcmt_ubicacion_id;
      var cod = data[0].xcmt_ubicacion_codigo_ubicacion;
      var datosU = '{"idUbi":"' + ubiId + '","codigo":"' + cod + '","tipo":"' + tipoUbi + '"}';
      var datosU2 = JSON.parse(datosU);
      arrUbi.push(datosU2);
      $scope.dUbi = arrUbi;

      var ciAux = 0;
      for (var i = 0; i < data.length; i++) {
        var idt = data[i].xcmt_titular_id;
        var dataT = JSON.parse(data[i].xcmt_titular_data);
        var tipoTGlob = data[i].xcmt_titular_tipo;
        var datoT = '';
        for (var j = 0; j < dataT.length; j++) {
          var titularesID = dataT[j].titularesId;
          if (titularesID != ciAux) {
            if (tipoTGlob == 'N') {
              var nombrest = dataT[j].nombre;
              var paternot = dataT[j].paterno;
              var maternot = dataT[j].materno;
              var casadat = dataT[j].casada;
              datoT = '{"idt":"' + idt + '","nombret":"' + nombrest + '","paternot":"' + paternot + '","maternot":"' + maternot + '","casadat":"' + casadat + '"}';
            }
            else {
              var nombret = dataT[j].razonSocial;
              datoT = '{"idt":"' + idt + '","nombret":"' + nombret + '","paternot":"' + paternot + '","maternot":"' + maternot + '","casadat":"' + casadat + '"}';
            }
            var datos3 = JSON.parse(datoT);
            arrTit.push(datos3);
            ciAux = titularesID;
          }
          else {
          }
        }
      }
      $scope.dTit = arrTit;
    });
    $scope.datosEncontrados();
  };

  $scope.tablaFallecido = new ngTableParams({
    page: 1,
    count: 10,
    filter: {},
    sorting: {}
  }, {
    total: $scope.dataFallecido.length,
    getData: function ($defer, params) {
      var filteredData = params.filter() ?
        $filter('filter')($scope.dataFallecido, params.filter()) :
        $scope.dataFallecido;
      var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        $scope.dataFallecido;
      params.total($scope.dataFallecido.length);
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.btnCambiar = true;
  $scope.prsCI = sessionService.get('CICIUDADANO');
  $rootScope.vid = sessionService.get('IDCIUDADANO');
  $scope.imageCST = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
  $scope.imageLNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAIAAADtz9qMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAbSURBVBhXY3growJHIM5/GIBy0GWgHCiSUQEAe00iZYBvZ5oAAAAASUVORK5CYII=";
  $scope.ErrorCapcha = '';

  $scope.getlimpiareRROR = function () {
    $scope.ErrorCapcha = '';
  }

  $scope.getCaptchasX = function () {
    $scope.valorrandom = Math.floor(Math.random() * (224 - 1) + 1);
    $scope.resultadoC = "";
    var objCaptcha = new captcha();
    objCaptcha.obtcaptcha(function (resultado) {
      json = JSON.parse(resultado);
      partes = json.success[0].sp_captcha_porx1.split(',');
      numero = partes[0].substring(1);
      i1 = (partes[2] + "," + partes[3]);
      i2 = (partes[4] + "," + partes[5]);
      $scope.imageLNG = i1.substring(1, i1.length - 1);
      $scope.imageCST = i2.substring(1, i2.length - 2);
      var lengua = "";
      if (partes[1] == 'A') {
        lengua = 'AYMARA';
      } else if (partes[1] == 'Q') {
        lengua = 'QUECHUA';
      } else if (partes[1] == 'G') {
        lengua = 'GUARANI';
      } else if (partes[1] == 'C') {
        lengua = 'CASTELLANO';
      } else {
      }
      $scope.toltipTt = "Palabra en " + lengua;
      $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
    });
  };

  var tiemporespuesta = null;
  function verificarKeyPress(captch) {
    var id = numero;
    var verCaptcha = new captcha();
    verCaptcha.identificador = id;
    verCaptcha.respuesta = captch;
    verCaptcha.verificarCaptcha(function (resultado) {
      json = JSON.parse(resultado);
      var nroregsitros = json.success.length;
      if (nroregsitros == 0) {
        $scope.ErrorCapchasXX = "Error en el captcha intentar de nuevo por favor";
        $scope.SuccesCapchasxx = "";
        $scope.$apply();
      } else {
        $scope.ErrorCapchasXX = "";
        $scope.SuccesCapchasxx = "Capcha correcto";
        arrUbi = [];
        titularesArray = [];
        datos_titularesEnc = '';
        $scope.cantSeleccionada = new Object(0);
        $scope.totalPrecioItems = new Object(0);
        $('#visorIframe').attr('src', "");
        if ($scope.idbotonBus == 1) {
          $scope.idventanabusqueda = true;
          $scope.idBucarDatosFallecido = false;
        }
        if ($scope.idbotonBus == 2) {
          $scope.idBucarDatosFallecido = true;
          $scope.idventanabusqueda = false;
        }
        $scope.ocultarCaptcha();
        $scope.$apply();
      }
    });
  }

  $scope.VerificarCapcha = function (datos, prsCI) {
    var captch = $("#resultadoC").val();
    if (captch.length == 0) {
      $scope.ErrorCapchasX = "";
    }
    if (captch.length > 4) {
      clearTimeout(tiemporespuesta);
      tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1000);
    }
  };

  $scope.$on('api:ready', function () {
    $scope.getCaptchasX();
  });
  $scope.inicioCapcha = function () {
    $scope.getCaptchasX();
  };

  function continuarSinCaptcha(idbotonBus){
    if (idbotonBus == 1) {
      $scope.idventanabusqueda = true;
      $scope.idBucarDatosFallecido = false;
    }
    if (idbotonBus == 2) {
      $scope.idBucarDatosFallecido = true;
      $scope.idventanabusqueda = false;
    }
  }
  ///////////////////////////////////////////////// QUITAR TODOS MODAL /////////////////////////////////////////////////
  try {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  } catch (e) { console.log("error", e); }





  $scope.limpiar = function () {
    document.getElementById('idIdfF').value = '';
    document.getElementById('idNomFall').value = '';
    document.getElementById('idApPatF').value = '';
    document.getElementById('idApMatF').value = '';
    document.getElementById('idApCasF').value = '';
    document.getElementById('idCif').value = '';
    document.getElementById('buscarFall').disabled = true;
    document.getElementById('idIdfF').disabled = false;
    document.getElementById('idNomFall').disabled = false;
    document.getElementById('idApPatF').disabled = false;
    document.getElementById('idApMatF').disabled = false;
    document.getElementById('idApCasF').disabled = false;
    document.getElementById('idCif').disabled = false;
    var aFallecido = [];
    $scope.dFallecido = new Object();
    $scope.dFallecido = aFallecido;
    $scope.idCoincidenciasFallecidos=false;
  }

  $scope.bloqBuscarIdf = function () {
    var idfcap = document.getElementById('idIdfF').value;
    if (idfcap != '' || idfcap != "") {
      /*document.getElementById('idNomFall').disabled = true;
      document.getElementById('idApPatF').disabled = true;
      document.getElementById('idApMatF').disabled = true;
      document.getElementById('idApCasF').disabled = true;
      document.getElementById('idCif').disabled = true;*/
      document.getElementById('buscarFall').disabled = false;
    } else {
      /*document.getElementById('idNomFall').disabled = false;
      document.getElementById('idApPatF').disabled = false;
      document.getElementById('idApMatF').disabled = false;
      document.getElementById('idApCasF').disabled = false;
      document.getElementById('idCif').disabled = false;*/
      document.getElementById('buscarFall').disabled = true;
    }
  }

  $scope.bloqBuscarCi = function () {
    var cicap = document.getElementById('idCif').value;
    if (cicap != '' || cicap != "") {
      document.getElementById('idNomFall').disabled = true;
      document.getElementById('idApPatF').disabled = true;
      document.getElementById('idApMatF').disabled = true;
      document.getElementById('idApCasF').disabled = true;
      document.getElementById('idIdfF').disabled = true;
      document.getElementById('buscarFall').disabled = false;
    } else {
      document.getElementById('idNomFall').disabled = false;
      document.getElementById('idApPatF').disabled = false;
      document.getElementById('idApMatF').disabled = false;
      document.getElementById('idApCasF').disabled = false;
      document.getElementById('idIdfF').disabled = false;
      document.getElementById('buscarFall').disabled = true;
    }
  }

  $scope.bloqBuscarDatos = function () {
    var nom = document.getElementById('idNomFall').value;
    var pat = document.getElementById('idApPatF').value;
    var mat = document.getElementById('idApMatF').value;
    var cas = document.getElementById('idApCasF').value;
    if (nom != '' || nom != "" || pat != '' || pat != "" || mat != '' || mat != "" || cas != '' || cas != "") {
      document.getElementById('idIdfF').disabled = true;
      document.getElementById('idCif').disabled = true;
      document.getElementById('buscarFall').disabled = false;
    } else {
      document.getElementById('idIdfF').disabled = false;
      document.getElementById('idCif').disabled = false;
      document.getElementById('buscarFall').disabled = true;
    }
  }


  $scope.bloqDatosEnv = function () {
    var flagBlq1 = null;
    var flagBlq2 = null;
    var doc = document.getElementById('numDoc').value;
    var raz = document.getElementById('razonSolfact').value;
    if (doc == '' || doc == "") {
      document.getElementById("numDoc").style.borderColor = "red";
      flagBlq1 = false;
    } else {
      document.getElementById("numDoc").style.borderColor = "green";
      flagBlq1 = true;
    }
    if (raz == '' || raz == "") {
      document.getElementById("razonSolfact").style.borderColor = "red";
      flagBlq2 = false;
    } else {
      document.getElementById("razonSolfact").style.borderColor = "green";
      flagBlq2 = true;
    }
    if (flagBlq1 == true && flagBlq2 == true) {
      document.getElementById('boton_mostrar_debito2').disabled = false;
    } else {
      document.getElementById('boton_mostrar_debito2').disabled = true;
    }
  }

  $('#email').on('keyup', function () {
    var dataEmail = $('#email').val();
    var re = /([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(this.value);
    if (dataEmail == "" || dataEmail == '') {
      $('#error').show();
      $('#success').hide();
      document.getElementById("email").style.borderColor = "grey";
      document.getElementById('boton_mostrar_debito2').disabled = true;
      flagEmail = false;
    } else if (!re) {
      $('#llenar').hide();
      $('#error').show();
      $('#success').hide();
      document.getElementById("email").style.borderColor = "red";
      document.getElementById('boton_mostrar_debito2').disabled = true;
      flagEmail = false;
    } else {
      $('#llenar').hide();
      $('#error').hide();
      $('#success').show();
      document.getElementById("email").style.borderColor = "green";
      document.getElementById('boton_mostrar_debito2').disabled = false;
      flagEmail = true;
    }
  })
}
