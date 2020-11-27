function permisosExcepcionalesFormulario($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter, FileUploader, fileUpload, $timeout, obtFechaCorrecta, $route, obtFechaActual, fileUpload1) {
  var sIdCiudadano = sessionService.get('IDSOLICITANTE');
  $scope.tipo_persona = sessionService.get('TIPO_PERSONA');
  $scope.oidCiu = sessionService.get('IDSOLICITANTE');
  $scope.datos = {};
  $scope.desabilitado = false;
  $scope.div_zonal = false;
  $scope.aMacrodistritos = {};
  $scope.aDistritoZona = {};


  $scope.inicio = function () {
    console.log("$scope.datos.ggggg", $scope.datos.mac);
    //  $scope.open_mapa_mascotas();
  }

  var clsValidarBtnEnviar = $rootScope.$on('inicializarVista', function (event, data) {
    $scope.datos = JSON.parse(data);
    if ($scope.datos.File_Adjunto == undefined) {
      $scope.datos.File_Adjunto = [];
      $scope.datos.valPlaca = 2;
    }
    $scope.enviado = sessionService.get('ESTADO');
    if ($scope.enviado == 'SI') {
      $scope.desabilitado = true;
    } else {
      $scope.desabilitado = false;
    }
    //$scope.docdinamicos($scope.datos.PER_TRA_DESCRIP_FOR);
    $scope.cargarMacrodistritos();
    $("#valida").hide();
    $("#valida1").hide();
    document.getElementById('gu').disabled = true;
    $scope.$apply();
    setTimeout(function () {
      iniciarLoadFyle();
    }, 1000);
  });

  //////////////////////////GUARDA TRAMITE//////////////////////
  $scope.guardar_tramite = function (datos) {
    datos.Tipo_tramite_creado = "WEB";
    try {
      var datosSerializados = JSON.stringify(datos);
      var idCiudadano = sessionService.get('IDSOLICITANTE');
      var idTramite = sessionService.get('IDTRAMITE');
      var crear = new datosFormularios();
      crear.frm_tra_dvser_id = sessionService.get('IDSERVICIO');
      crear.data_json = datosSerializados;
      crear.frm_tra_id_ciudadano = sIdCiudadano;
      crear.frm_tra_id_usuario = 1;
      crear.frm_idTramite = idTramite;
      $.blockUI();
      crear.sp_crear_datos_formulario(function (results) {
        results = JSON.parse(results);
        results = results.success;
        if (results.length > 0) {
          //$scope.tramitesCiudadano();
          alertify.success("Formulario almacenado");
          document.getElementById('gu').disabled = false;
          $.unblockUI();
        } else {
          $.unblockUI();
          sweet.show('', "Formulario no almacenado", 'error');
        }
      });
    } catch (e) {
      console.log("Error..", e);
      $.unblockUI();
    }
  }


  $scope.f_mostrar_Modal = function () {
    $("#myModal").modal("show");
}

  ///////////////////////////ENVIO//////////////////////////////
  $scope.validarEnvio = function (data) {
    swal({
      title: 'CONFIRMAR',
      text: 'El envío de la presente solicitud  generará todos los derechos y obligaciones establecidas por ley, ¿se encuentra seguro de realizar el envío?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      closeOnConfirm: false
    }, function () {
      swal.close();
      setTimeout(function () {
        $scope.crea_tramite_lotus(data);
      }, 1000);
    });
  };

  $scope.crea_tramite_lotus = function (datos) {

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
    setTimeout(function () {
      $.blockUI();
      var f = new Date();
      datos.g_fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()
      datos.g_tipo_tramite = 'PER_TRA';
      data_form = JSON.stringify(datos);
      var tramite = new crearTramiteMovilidad();
      tramite.usr_id = 1;
      tramite.datos = data_form;
      tramite.procodigo = 'PER_TRA';
      var nroTramiteEnviado = sessionService.get('NROTRAMITE');
      tramite.tramite_linea(function (results) {
        results = JSON.parse(results);
        if (results != null) {
          results = results.success.data[0].crea_tramite_linea;
          $scope.validarFormProcesos(results);
          $.unblockUI();
        } else {
          alertify.error("Señor(a) Ciudadano(a) ocurrio un error al enviar su Tramité.",);
          $.unblockUI();
        }
      });
    }, 300);
  };

  $scope.validarFormProcesos = function (nroTramite) {
    idUsuario = sessionService.get('IDUSUARIO');
    try {
      idUsuario = 4;
      var tramiteIgob = new datosFormularios();
      tramiteIgob.frm_idTramite = sessionService.get('IDTRAMITE');
      tramiteIgob.frm_tra_enviado = 'SI';
      tramiteIgob.frm_tra_if_codigo = nroTramite;
      tramiteIgob.frm_tra_id_usuario = idUsuario;
      tramiteIgob.validarFormProcesos(function (resultado) {
        swal({
          title: 'Señor(a) Ciudadano(a) su trámite fue registrado correctamente.',
          text: 'Su número de Trámite es:<h2></strong> ' + nroTramite + '</strong></h2><br>“SU SOLICITUD SERA ATENDIDA EN UN PLAZO DE 48 HORAS”',
          html: true,
          type: 'success',
        });
        $scope.tramitesCiudadano();
        $scope.desabilitado = true;
        $scope.botones = null;
      });
    } catch (error) {
      alertify.success('Registro no modificado');
      $.unblockUI();
    }
  };
  $scope.docdinamicos = function (data) {
  }
  var iconStylep = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.6, 40],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: '../../../libs/img/point_icon.png',
      crossOrigin: 'anonymous'
    })
  });
  $scope.open_mapa_mascotas = function (lat, lon) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssssss");
    setTimeout(function () {
      var latitud = lat;
      var longitud = lon;

      $("#mapa_mascotas").empty();

      $scope.map = new ol.Map
        ({
          target: 'mapa_mascotas',
          layers: [
            new ol.layer.Group({
              title: 'Mapas Base',
              layers: [
                osm_udit,
                municipios,
                vias_udit
              ]
            }),
            new ol.layer.Group({
              title: 'Capas',
              layers: [
                //macrodistritos,
                vectorLayerZonas,
                vectorLayer
              ]
            })
          ],
          view: new ol.View({
            zoom: 16,
            center: ol.proj.fromLonLat([-68.133555, -16.495687])
          })
        });

      var layerSwitcher = new ol.control.LayerSwitcher({ tipLabel: 'Leyenda' });
      $scope.map.addControl(layerSwitcher);
      vectorLayer.getSource().clear();
      ////////////////////////////////////////////////////////////////////////
      if (latitud != undefined) {
        var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud])));
        feature.setStyle(iconStylep);
        vectorSource.addFeature(feature);
        $scope.map.getView().setCenter(ol.proj.fromLonLat([longitud, latitud]));
        $scope.map.getView().setZoom(15);
      }
      //////////////////////////////////////////////////////////////////////////
      $scope.map.on('click', function (evt) {
        $scope.datos.latitud_vol_dom = "";
        $scope.datos.longitud_vol_dom = "";
        vectorSource.clear();
        var viewResolution = view.getResolution();
        var coord = $scope.map.getCoordinateFromPixel(evt.pixel);
        var centro = ol.proj.transform(coord, 'EPSG:3857', epsg32719);
        var wkt = '';
        var centro_1 = ol.proj.transform(coord, 'EPSG:3857', epsg4326);
        var latitud = centro_1[1];
        var longitud = centro_1[0];
        console.log("coordenadas", latitud + "  -- " + longitud)
        var feature = $scope.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
          return feature;
        });
        if (feature) {
          var coord = feature.getGeometry().getCoordinates();
          var props = feature.getProperties();
        }
        else {
          var url_zonas = zonas_udit.getSource().getGetFeatureInfoUrl(
            evt.coordinate, $scope.map.getView().getResolution(), $scope.map.getView().getProjection(), {
            'INFO_FORMAT': 'application/json',
            'propertyName': 'zonaref,macrodistr,subalcaldi,codigozona,macro,distrito'
          });
          var url_vias = vias_udit.getSource().getGetFeatureInfoUrl(
            evt.coordinate, $scope.map.getView().getResolution(), $scope.map.getView().getProjection(), {
            'INFO_FORMAT': 'application/json',
            'propertyName': 'nombrevia,tipovia'
          });
          reqwest({
            url: url_zonas,
            type: 'json',
          }).then(function (data) {
            var feature = data.features[0];
            var cod = feature.properties;
            console.log("cod :: ", cod);
          });
          reqwest({
            url: url_vias,
            type: 'json',
          }).then(function (data) {
            var feature = data.features[0];
            if (feature == undefined) {
            }
            else {
              var cod = feature.properties;
              console.log("vias", cod);
            }

          });
        }
        var feature = new ol.Feature(
          new ol.geom.Point(ol.proj.fromLonLat(centro_1))
        );
        feature.setStyle(iconStylep);
        vectorSource.addFeature(feature);
      });

      var positions =
        [
          { name: "CENTRAL", pos: [-7584575.389127423986793, -1862343.043682825984433], zoom: 17 },
          { name: "EL ROSARIO", pos: [-7585334.050879356451333, -1862239.9863074591849], zoom: 17 },
          { name: "MIRAFLORES", pos: [-7583254.50954529736191, -1862010.036386856343597], zoom: 17 },
          { name: "MIRAFLORES SUR", pos: [-7583055.178539209999144, -1863615.049259479390457], zoom: 17 },
          { name: "SAN SEBASTIAN", pos: [-7585442.824538857676089, -1861826.247660768451169], zoom: 17 },
          { name: "SANTA BARBARA", pos: [-7583974.984731253236532, -1862690.543432838283479], zoom: 17 },
          { name: "8 DE DICIEMBRE", pos: [-7584748.066591577604413, -1864890.710699074435979], zoom: 17 },
          { name: "BAJO LLOJETA", pos: [-7583142.230117241851985, -1865823.243447743123397], zoom: 17 },
          { name: "BELEN", pos: [-7585074.674997083842754, -1862692.293808240443468], zoom: 17 },
          { name: "BELLO HORIZONTE", pos: [-7585290.624263345263898, -1863809.083335365634412], zoom: 17 },
          { name: "SOPOCACHI ALTO", pos: [-7584707.215883921831846, -1864106.894659134792164], zoom: 17 },
          { name: "FARO MURILLO", pos: [-7586858.611691223457456, -1863764.773887964198366], zoom: 17 },
          { name: "LAS LOMAS", pos: [-7585173.666602561250329, -1865391.871765763731673], zoom: 17 },
          { name: "LLOJETA", pos: [-7584662.395358731038868, -1866533.877968890825287], zoom: 17 },
          { name: "OBISPO BOSQUE", pos: [-7585435.508878928609192, -1864837.927322140429169], zoom: 17 },
          { name: "PASANKERI", pos: [-7585767.764774272218347, -1865537.58297059731558], zoom: 17 },
          { name: "SAN JUAN DE COTAHUMA", pos: [-7586306.866494508460164, -1864478.913437245413661], zoom: 17 },
          { name: "SAN PEDRO", pos: [-7584780.67906707059592, -1863200.836958569008857], zoom: 17 },
          { name: "SAN PEDRO ALTO", pos: [-7585399.338494156487286, -1863318.893120896304026], zoom: 17 },
          { name: "SOPOCACHI", pos: [-7584123.997609419748187, -1864265.001257843337953], zoom: 17 },
          { name: "SOPOCACHI BAJO", pos: [-7583627.402222845703363, -1864949.447272849734873], zoom: 17 },
          { name: "TACAGUA", pos: [-7585947.916534631513059, -1863928.570672059897333], zoom: 17 },
          { name: "ALTO TACAGUA", pos: [-7586464.408974840305746, -1864116.116282521281391], zoom: 17 },
          { name: "TEMBLADERANI", pos: [-7585348.244538004510105, -1864355.268725552363321], zoom: 17 },
          { name: "TUPAC AMARU", pos: [-7586210.394282031804323, -1864839.748238522326574], zoom: 17 },
          { name: "VILLA NUEVO POTOSI", pos: [-7586154.456157615408301, -1863450.120637079235166], zoom: 17 },
          { name: "ARANJUEZ", pos: [-7581200.774069448933005, -1869436.353795574279502], zoom: 17 },
          { name: "HUACALLANI", pos: [-7573260.989794577471912, -1871550.958630996989086], zoom: 17 },
          { name: "ISLA VERDE", pos: [-7581154.668572027236223, -1870760.950427461415529], zoom: 17 },
          { name: "JUPAPINA", pos: [-7577541.409126745536923, -1874366.538863426772878], zoom: 17 },
          { name: "MALLASA", pos: [-7578749.671328227035701, -1871347.286766723031178], zoom: 17 },
          { name: "MALLASILLA", pos: [-7580769.777354169636965, -1870271.172185633098707], zoom: 17 },
          { name: "14 DE SEPTIEMBRE", pos: [-7585968.517929330468178, -1862274.456255996366963], zoom: 17 },
          { name: "23 DE MARZO LA HOYADA", pos: [-7587483.163100826554, -1863105.305639019934461], zoom: 17 },
          { name: "ALTO CIUDADELA", pos: [-7586805.824034798890352, -1857562.564819663297385], zoom: 17 },
          { name: "VILLA ANTOFAGASTA", pos: [-7588393.181135034188628, -1861710.975596196483821], zoom: 17 },
          { name: "ALTO MARISCAL SANTA CRUZ", pos: [-7587820.542018600739539, -1862091.365827252622694], zoom: 17 },
          { name: "ALTO MUNAYPATA CUSICANCHA", pos: [-7587944.357111064717174, -1860873.340048674726859], zoom: 17 },
          { name: "ALTO PURA PURA", pos: [-7587492.952691739425063, -1858246.204243602231145], zoom: 17 },
          { name: "SAGRADO CORAZON DE JESUS", pos: [-7586936.598027259111404, -1863251.761214685626328], zoom: 17 },
          { name: "UNION ALIANZA", pos: [-7588209.25594993494451, -1859702.988275178475305], zoom: 17 },
          { name: "MARISCAL SANTA CRUZ", pos: [-7587352.45905127748847, -1861817.860730615677312], zoom: 17 },
          { name: "EL TEJAR", pos: [-7587137.232291190885007, -1862340.195488650118932], zoom: 17 },
          { name: "BARRIO LINDO", pos: [-7587217.357083014212549, -1863206.92454343335703], zoom: 17 },
          { name: "CAJA FERROVIARIA", pos: [-7586348.995702271349728, -1856852.145127942785621], zoom: 17 },
          { name: "CALLAMPAYA", pos: [-7586493.587536536157131, -1862129.417951250215992], zoom: 17 },
          { name: "CHAMOCO CHICO", pos: [-7586980.342528648674488, -1862884.132513507967815], zoom: 17 },
          { name: "CHUALLUMA", pos: [-7587537.774060629308224, -1862388.166171441087499], zoom: 17 },
          { name: "CIUDADELA FERROVIARIA", pos: [-7586543.77658115234226, -1857956.17481010989286], zoom: 17 },
          { name: "GRAN PODER", pos: [-7585651.610807147808373, -1862732.332019188674167], zoom: 17 },
          { name: "HUACATAQUI", pos: [-7587683.315389631316066, -1862728.677742580417544], zoom: 17 },
          { name: "LA PORTADA", pos: [-7588250.318409558385611, -1861593.309383704792708], zoom: 17 },
          { name: "LOS ANDES", pos: [-7586248.442233351059258, -1862591.06972394650802], zoom: 17 },
          { name: "MUNAYPATA", pos: [-7587444.859195145778358, -1861308.837057073833421], zoom: 17 },
          { name: "OBISPO INDABURO", pos: [-7586253.948639475740492, -1862837.323284632293507], zoom: 17 },
          { name: "PURA PURA", pos: [-7586463.155256864614785, -1860361.236305014463142], zoom: 17 },
          { name: "RINCON LA PORTADA", pos: [-7588401.164816685020924, -1860986.100798856467009], zoom: 17 },
          { name: "CHIJINI", pos: [-7586600.004494304768741, -1863172.248001657659188], zoom: 17 },
          { name: "VILLA VICTORIA", pos: [-7586564.490867748856544, -1861656.755053364904597], zoom: 17 },
          { name: "27 DE MAYO", pos: [-7584229.946807553991675, -1860745.617805159185082], zoom: 17 },
          { name: "3 DE MAYO", pos: [-7582410.433675794862211, -1858512.20621913461946], zoom: 17 },
          { name: "ACHACHICALA", pos: [-7586419.54581409599632, -1859242.275827085133642], zoom: 17 },
          { name: "AGUA DE LA VIDA", pos: [-7584214.513950261287391, -1861646.218446695012972], zoom: 17 },
          { name: "AGUA DE LA VIDA NORTE", pos: [-7584159.113460076972842, -1861133.99202243774198], zoom: 17 },
          { name: "ALTO LA MERCED", pos: [-7583083.630136646330357, -1858628.300866358680651], zoom: 17 },
          { name: "ALTO LAS DELICIAS", pos: [-7583713.436358477920294, -1859454.848433757899329], zoom: 17 },
          { name: "ALTO VINO TINTO", pos: [-7585891.713526440784335, -1859729.483823749003932], zoom: 17 },
          { name: "BARRIO GRAFICO", pos: [-7582914.426172704435885, -1860559.144622958265245], zoom: 17 },
          { name: "BARRIO PETROLERO", pos: [-7582601.689698295667768, -1860105.826998739968985], zoom: 17 },
          { name: "CHALLAPAMPA", pos: [-7585548.969299544580281, -1861156.450974193867296], zoom: 17 },
          { name: "CHUQUIAGUILLO", pos: [-7581337.959845637902617, -1858100.91390790999867], zoom: 17 },
          { name: "CONDORINI", pos: [-7582881.369746356271207, -1858434.673640359658748], zoom: 17 },
          { name: "CUPILUPACA", pos: [-7584135.720153969712555, -1860347.630793693242595], zoom: 17 },
          { name: "HUAYCHANI", pos: [-7582182.17956683691591, -1859535.554873832967132], zoom: 17 },
          { name: "KALAJAHUIRA", pos: [-7580267.188570158556104, -1857108.826984283979982], zoom: 17 },
          { name: "KAMIRPATA", pos: [-7586171.215681899338961, -1859161.369320353725925], zoom: 17 },
          { name: "KOCHAPAMPA", pos: [-7581556.965090903453529, -1858800.72512088296935], zoom: 17 },
          { name: "LA MERCED", pos: [-7582927.855331616476178, -1859243.455617816653103], zoom: 17 },
          { name: "LAS DELICIAS", pos: [-7583386.917237648740411, -1859649.061720251105726], zoom: 17 },
          { name: "LAS NIEVES", pos: [-7585887.164701138623059, -1856768.378226893488318], zoom: 17 },
          { name: "LIMANIPATA", pos: [-7585472.751124052330852, -1855769.221358699025586], zoom: 17 },
          { name: "MIRAFLORES ALTO", pos: [-7583556.066997868940234, -1860659.493838639231399], zoom: 17 },
          { name: "PLAN AUTOPISTA", pos: [-7586068.087455393746495, -1857895.685788345290348], zoom: 17 },
          { name: "POKENI CHAPUMA", pos: [-7583649.126864579506218, -1860099.3574275940191], zoom: 17 },
          { name: "ROSASANI", pos: [-7583634.483963656239212, -1858983.383918674197048], zoom: 17 },
          { name: "SAN JUAN", pos: [-7583805.377016878686845, -1861811.876407221890986], zoom: 17 },
          { name: "SAN JUAN LAZARETO", pos: [-7583818.871678208932281, -1861233.216576041188091], zoom: 17 },
          { name: "SANTA ROSA", pos: [-7583851.10124590806663, -1860485.379238266963512], zoom: 17 },
          { name: "SANTA ROSA TIJI", pos: [-7584047.102831547148526, -1859836.493263468611985], zoom: 17 },
          { name: "SANTIAGO DE LACAYA", pos: [-7584315.712182273156941, -1859154.527811831794679], zoom: 17 },
          { name: "TANGANI", pos: [-7585399.539247383363545, -1857874.56223296164535], zoom: 17 },
          { name: "URKUPIÑA", pos: [-7583148.745729890652001, -1857866.803474461426958], zoom: 17 },
          { name: "VILLA 18 DE MAYO", pos: [-7585915.853044949471951, -1860148.806745241396129], zoom: 17 },
          { name: "VILLA DE LA CRUZ", pos: [-7584660.278235969133675, -1861118.480471759336069], zoom: 17 },
          { name: "VILLA EL CARMEN", pos: [-7582269.301103976555169, -1858888.648474775021896], zoom: 17 },
          { name: "VILLA FATIMA", pos: [-7582956.654733026400208, -1860004.853408654686064], zoom: 17 },
          { name: "VILLA PABON", pos: [-7584042.478899341076612, -1862044.264504177495837], zoom: 17 },
          { name: "VINO TINTO", pos: [-7585502.158879031427205, -1860543.154278266243637], zoom: 17 },
          { name: "ZONA NORTE", pos: [-7584794.178734118118882, -1861518.050444986205548], zoom: 17 },
          { name: "24 DE JUNIO", pos: [-7581870.932806400582194, -1860317.267436271067709], zoom: 17 },
          { name: "CALLAPA", pos: [-7579760.428931327536702, -1862828.629910174757242], zoom: 17 },
          { name: "CIUDAD DEL NIÑO", pos: [-7580119.272505860775709, -1861926.038844330934808], zoom: 17 },
          { name: "CUARTO CENTENARIO", pos: [-7582224.759401317685843, -1864372.277023858157918], zoom: 17 },
          { name: "ESCOBAR URIA", pos: [-7581861.07794851064682, -1861789.845424922183156], zoom: 17 },
          { name: "KUPINI", pos: [-7580702.712056228891015, -1863772.968938525998965], zoom: 17 },
          { name: "PACASA", pos: [-7582242.604598212987185, -1860855.118173870723695], zoom: 17 },
          { name: "PAMPAHASI", pos: [-7581262.593644492328167, -1862458.634054996073246], zoom: 17 },
          { name: "PRIMAVERA", pos: [-7580512.163242063485086, -1860281.465106666786596], zoom: 17 },
          { name: "SAN ANTONIO", pos: [-7582144.85304607078433, -1862610.599266275763512], zoom: 17 },
          { name: "SAN ISIDRO", pos: [-7581559.307691799476743, -1864025.557487776968628], zoom: 17 },
          { name: "SAN SIMON", pos: [-7582376.782298262231052, -1860186.045479797990993], zoom: 17 },
          { name: "VALLE DE LAS FLORES", pos: [-7580653.482863613404334, -1862592.111964323092252], zoom: 17 },
          { name: "VALLE HERMOSO", pos: [-7581872.608224695548415, -1861268.331739237299189], zoom: 17 },
          { name: "VILLA ARMONIA", pos: [-7582215.742416431196034, -1863740.985217806650326], zoom: 17 },
          { name: "VILLA COPACABANA", pos: [-7582628.105873658321798, -1861406.075947349891067], zoom: 17 },
          { name: "VILLA LITORAL", pos: [-7581677.113431815057993, -1863392.298785836203024], zoom: 17 },
          { name: "VILLA SALOME", pos: [-7580602.70865554921329, -1861315.842531692469493], zoom: 17 },
          { name: "ACHUMANI", pos: [-7577414.573940338566899, -1865745.344794997246936], zoom: 17 },
          { name: "ACHUMANI PORVENIR KANTUTAS", pos: [-7577547.437317503616214, -1866759.289408138720319], zoom: 17 },
          { name: "ALTO ACHUMANI", pos: [-7575918.886411567218602, -1864589.083988386904821], zoom: 17 },
          { name: "ALTO IRPAVI", pos: [-7578717.313126971013844, -1864677.796380328480154], zoom: 17 },
          { name: "ALTO OBRAJES", pos: [-7581568.982156996615231, -1865030.571529152337462], zoom: 17 },
          { name: "ALTO SEGUENCOMA", pos: [-7581294.144417535513639, -1866763.171759801451117], zoom: 17 },
          { name: "ARUNTAYA", pos: [-7578242.783758474513888, -1865181.452141001122072], zoom: 17 },
          { name: "AUQUISAMAÑA", pos: [-7578179.635179939679801, -1868390.259402561932802], zoom: 17 },
          { name: "ALTO CALACOTO", pos: [-7577020.366396177560091, -1868268.206016578245908], zoom: 17 },
          { name: "BELLA VISTA", pos: [-7580340.321901459246874, -1866130.180752525571734], zoom: 17 },
          { name: "BOLOGNIA", pos: [-7579893.902720748446882, -1865062.888733100844547], zoom: 17 },
          { name: "CALACOTO", pos: [-7579086.470360332168639, -1867482.664010311011225], zoom: 17 },
          { name: "CALIRI", pos: [-7579798.50655569601804, -1863759.724554466083646], zoom: 17 },
          { name: "CASEGURAL", pos: [-7574058.712366397492588, -1866438.286516410531476], zoom: 17 },
          { name: "CHASQUIPAMPA", pos: [-7575475.559805101715028, -1867228.929050863953307], zoom: 17 },
          { name: "CIUDADELA STRONGUISTA", pos: [-7577600.474686773493886, -1864091.744209086056799], zoom: 17 },
          { name: "CONDORES LAKOTA", pos: [-7576369.242782182060182, -1866174.219569551292807], zoom: 17 },
          { name: "COQUENI", pos: [-7575133.421287257224321, -1866717.511302017141134], zoom: 17 },
          { name: "COTA COTA", pos: [-7576851.195173903368413, -1867505.947315374854952], zoom: 17 },
          { name: "GRAMADAL", pos: [-7580608.512332336045802, -1868083.899038502248004], zoom: 17 },
          { name: "HUANTAQUI", pos: [-7576013.411894388496876, -1865397.393743685213849], zoom: 17 },
          { name: "HUANCANE", pos: [-7574633.349048878066242, -1865878.316699963295832], zoom: 17 },
          { name: "HUANU HUANUNI", pos: [-7580770.138764542527497, -1865570.10413537803106], zoom: 17 },
          { name: "HUAYLLANI", pos: [-7574620.258624342270195, -1863757.093436109367758], zoom: 17 },
          { name: "VIRGEN DE COPACABANA", pos: [-7574350.298567577265203, -1868087.521722486242652], zoom: 17 },
          { name: "IRPAVI", pos: [-7579292.946862655691803, -1865578.051428287290037], zoom: 17 },
          { name: "IRPAVI II", pos: [-7578769.239181567914784, -1862735.936850840691477], zoom: 17 },
          { name: "CHIJIPATA", pos: [-7574574.12801768630743, -1863435.484964594710618], zoom: 17 },
          { name: "KESINI", pos: [-7575007.764225488528609, -1866332.292329096468166], zoom: 17 },
          { name: "KOANI", pos: [-7578591.411408574320376, -1866287.169425025349483], zoom: 17 },
          { name: "KUPILLANI CODAVISA", pos: [-7574368.662123691290617, -1867532.492788660805672], zoom: 17 },
          { name: "LA FLORIDA", pos: [-7579430.290499017573893, -1868492.773829154903069], zoom: 17 },
          { name: "LOS PINOS", pos: [-7577923.902832310646772, -1867803.532334489515051], zoom: 17 },
          { name: "LOS ROSALES", pos: [-7575516.8683429248631, -1864255.73324583703652], zoom: 17 },
          { name: "LOS ROSALES ALTO CALACOTO", pos: [-7575124.179243098013103, -1867835.63353370805271], zoom: 17 },
          { name: "MESETA ACHUMANI", pos: [-7578231.549248016439378, -1866145.873688667779788], zoom: 17 },
          { name: "OBRAJES", pos: [-7581709.929666577838361, -1865676.286957937991247], zoom: 17 },
          { name: "OVEJUYO", pos: [-7573412.213621910661459, -1866755.963299581548199], zoom: 17 },
          { name: "OVEJUYO EL ARENAL", pos: [-7573146.819741238839924, -1867561.153219840023667], zoom: 17 },
          { name: "PEDREGAL", pos: [-7575683.985033422708511, -1868380.428158273920417], zoom: 17 },
          { name: "ROSAS DE CALACALANI", pos: [-7573738.115373941138387, -1865923.218727274332196], zoom: 17 },
          { name: "SAN MIGUEL", pos: [-7578528.617541827261448, -1867732.386491046985611], zoom: 17 },
          { name: "SEGUENCOMA BAJO", pos: [-7580588.809920757077634, -1867098.02254404919222], zoom: 17 },
          { name: "VENTILLA", pos: [-7580137.30264147464186, -1867127.270347015466541], zoom: 17 },
          { name: "VERGEL", pos: [-7578882.3064289316535, -1863407.695347341243178], zoom: 17 },
          { name: "VILLA APAÑA", pos: [-7572655.011713838204741, -1868284.801278015598655], zoom: 17 },
          { name: "VIRGEN DE LA MERCED", pos: [-7574273.656202050857246, -1867074.717927056131884], zoom: 17 },
          { name: "WILACOTA", pos: [-7574274.904636557213962, -1866003.053984515136108], zoom: 17 },
          { name: "INCA LLOJETA", pos: [-7585589.117314196191728, -1866368.384293087292463], zoom: 17 },
          { name: "SAN JORGE", pos: [-7583506.305569479241967, -1863823.559384596301243], zoom: 17 },
          { name: "ALTO SAGRADO CORAZON DE JESUS", pos: [-7587219.329540045931935, -1863431.70383109874092], zoom: 17 },
          { name: "ALTO LA FLORIDA", pos: [-7579056.350696032866836, -1868161.18444691807963], zoom: 17 },
          { name: "SANTA RITA", pos: [-7577233.270060525275767, -1868661.292841135058552], zoom: 17 },
          { name: "JARDINES DEL SUR", pos: [-7576035.006058088503778, -1864027.7378771584481], zoom: 17 },
          { name: "KELLUMANI", pos: [-7575259.562787232920527, -1863351.136840760940686], zoom: 17 },
          { name: "JURENKO", pos: [-7576131.337519105523825, -1863849.313985739834607], zoom: 17 },
          { name: "AMOR DE DIOS", pos: [-7580190.244221467524767, -1868885.565226703183725], zoom: 17 },
          { name: "ALTO TEJAR", pos: [-7587387.017981482669711, -1862759.461370324250311], zoom: 17 },
          { name: "ALPACOMA", pos: [-7585149.640104291029274, -1867158.259184121387079], zoom: 17 },
          { name: "SAN ALBERTO", pos: [-7579854.153370961546898, -1866506.461370793636888], zoom: 17 },
          { name: "CHINCHAYA", pos: [-7579172.16243804898113, -1861046.481197626097128], zoom: 17 },
          { name: "CHICANI", pos: [-7578185.114695341326296, -1861076.593721435405314], zoom: 17 },
          { name: "COTAHUMA", pos: [-7585611.504907376132905, -1864588.103705125162378], zoom: 17 },
          { name: "ALTO PURA PURA SAN SEBASTIAN", pos: [-7586682.196477663703263, -1856774.073530652560294], zoom: 17 },
          { name: "KANTUTANI", pos: [-7583448.291622105054557, -1864442.811048134695739], zoom: 17 },
          { name: "ALTO PURA PURA ALTO SAN PEDRO", pos: [-7586688.594827311113477, -1856104.460680505027995], zoom: 17 },
          { name: "LOMAS DE ACHUMANI", pos: [-7575634.770889706909657, -1866240.844477463979274], zoom: 17 },
          { name: "LIPARI", pos: [-7577041.639747112058103, -1874675.380580195225775], zoom: 17 },
          { name: "ALTO VILLA VICTORIA", pos: [-7588212.674174014478922, -1860351.667790911858901], zoom: 17 },
          { name: "CHIARAQUE", pos: [-7575910.365170025266707, -1869583.783041697461158], zoom: 17 }
        ];

      var search = new ol.control.Search(
        {
          getTitle: function (f) { return f.name; },
          autocomplete: function (s, cback) {
            var result = [];
            var rex = new RegExp(s.replace("*", "") || "\.*", "i");
            for (var i = 0; i < positions.length; i++) {
              if (rex.test(positions[i].name))
                result.push(positions[i]);
            }
            return result;
          }
        });
      $scope.map.addControl(search);
      search.on('select', function (e) {
        var n = e.search.name;
        var c = 0;
        var geo_zona;
        var myStyleZonas = new ol.style.Style({
          stroke: new ol.style.Stroke({ color: '#FF8000', width: 5 }),
          fill: new ol.style.Fill({ color: 'transparent' })
        });
        $scope.map.removeLayer(vectorLayerZonas);
        for (var i = 0; i < geo_zonas.features.length; i++) {
          var nombre_zona = geo_zonas.features[i].properties.zonaref;
          var x_c = geo_zonas_centroides.features[i].geometry.coordinates[0];
          var y_c = geo_zonas_centroides.features[i].geometry.coordinates[1];
          if (n === nombre_zona) {
            c = c + 1;
            geo_zona = geo_zonas.features[i];
            var xx = x_c;
            var yy = y_c;
          }
        }
        if (c > 0) {
          geo_zona = JSON.stringify(geo_zona);
          vectorLayerZonas.setSource(new ol.source.Vector({
            features: (new ol.format.GeoJSON({ defaultDataProjection: 'EPSG:3857' })).readFeatures(geo_zona)
          }));
          vectorLayerZonas.setStyle(myStyleZonas);
          $scope.map.addLayer(vectorLayerZonas);
          $scope.map.getView().setCenter([xx, yy]);
          $scope.map.getView().setZoom(15);
          setTimeout(function () {
            vectorLayerZonas.getSource().clear();
          }, 2000);
        }
        $scope.map.getView().animate({
          center: e.search.pos,
          zoom: 15,
          easing: ol.easing.easeOut
        })
      });
    }, 200);
  };


  $scope.tipoUbicacionDinamico = function(data){
    console.log("asdf",data);
    if(data == 'MUNICIPAL'){
      $scope.div_zonal = true;
    }else {
      $scope.div_zonal = false;
    }
  }
  $scope.cargarMacrodistritos = function(){
    var datosP = new macrodistritoLst();
    datosP.obtmacro(function(resultado){
      data = JSON.parse(resultado);
      if(data.success.length > 0){
        $scope.aMacrodistritos = data.success;
        console.log("macro", $scope.aMacrodistritos);
      }else{
          $scope.msg = "Error !!";
      }
    });
  }

  $scope.listaZona = function(idMacroJ){ 
    var idMacro = "";
    if($scope.aMacrodistritos){
      angular.forEach($scope.aMacrodistritos, function(value, key) {
        if(value.mcdstt_macrodistrito == idMacroJ){
          idMacro = value.mcdstt_id;
        }
      });
    }        
    $scope.datos.idMacro = idMacro;
    $scope.aDistritoZona = {};
    try{
      if(idMacroJ.length != 0){
        var parametros = new distritoZona();
        parametros.idMacro = idMacro;
        parametros.obtdist(function(resultado){
          data = JSON.parse(resultado);
          if(data.success.length > 0){
            $scope.aDistritoZona = data.success;
            console.log("zonassss",$scope.aDistritoZona);
          }else{
            $scope.msg = "Error !!";
          } 
        });
      }
    }catch(error){
      console.log('error',error);
    }
  }

  //////////////////////////////////////// FIN DECLARACION JURADA
  $scope.fmostrarFormulario = function () {
    $("#exampleModalCenter1").modal({ backdrop: 'static', keyboard: false });
    $('#msgformularioN').html($scope.msgformularioN);
  }
}
