setTimeout(function()
{
  map.removeLayer(vectorLayer_inci_baja);
  $("#map_principal").empty();
  map = new ol.Map
  ({
      target: 'map_principal',
      layers: [
                new ol.layer.Group({
                                    title: 'Mapas Base',
                                    layers: [
                                              //osm_udit,
                                              municipios,
                                              riesgos_2011
                                            ]
                                  }),
                new ol.layer.Group({
                                    title: 'Capas',
                                    layers: [
                                              macrodistritos,
                                              vectorLayerZonas,
                                              vectorLayer
                                            ]
                                  })
              ],

      view: new ol.View({
        zoom: 16,
        center: ol.proj.fromLonLat([-68.133555,-16.495687])
      })
  });
          
  var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: 'Leyenda'});
  map.addControl(layerSwitcher);
  //////////////////////////////////////
  /*        
  var geojson_cuerpo_riesgos = "";
          
  for(var i = 0; i<data.length;i++)
  {
    var geo_latitud = data[i].j.latitud_riesgo;
    var geo_longitud = data[i].j.longitud_riesgo;
    //var geo_descripcion =  data[i].j.descripcion_usuario;
    var geo_nombre = data[i].j.nombre_riesgo;
    //var geo_fecha =  data[i].j.fechaigual;
    //var geo_hora = data[i].j.fecha.substr(11,8);
    //console.log("HORA....",geo_hora);
            
    var trans = [geo_longitud,geo_latitud];
    var centro = trans;
    var xy = ol.proj.transform(trans,'EPSG:4326','EPSG:3857');
      
    geojson_cuerpo_riesgos = geojson_cuerpo_riesgos + '{ "type": "Feature","properties":{"geo_nombre":"'+geo_nombre+'","geo_latitud":'+geo_latitud+',"geo_longitud":'+geo_longitud+'},"geometry":{"type":"Point","coordinates":['+xy+']}},'; 
  }

  console.log(geojson_cuerpo_riesgos);

  geojson_cuerpo_riesgos = geojson_cuerpo_riesgos.slice(0,-1);
       
  geojson_c_riesgos = geojson_empiezo+geojson_cuerpo_riesgos+geojson_fin;
          
  vectorLayer_inci_baja.setSource(new ol.source.Vector({
                                                features: (new ol.format.GeoJSON({defaultDataProjection:'EPSG:3857'})).readFeatures(geojson_c_riesgos)
  }));
          
  vectorLayer_inci_baja.setStyle(iconStyle_riesgo);
         
  map.addLayer(vectorLayer_inci_baja);
  */       
  /////////////////////////////////////////////
  map.on('click', function (evt)
  {
    vectorSource.clear();
    $("#riesgo_nivel").val("");//OTROS
    ////////////////////////////////
    if(jsonURLS)
    {
        var url_sit    =   jsonURLS.SIT_GEO;
        console.log('INTERMEDIO EN MAPA-----',url_sit);
    }

    //var url_r = 'http://sitservicios.lapaz.bo/geoserver/wms';

    var url_r = url_sit+'/geoserver/wms';
    console.log("URL PARA RIESGOS",url_r);

    var WMSsource = new ol.source.ImageWMS({
        ratio: 1,
        url: url_r,
        params: {
                  'FORMAT': 'image/png',
                  'VERSION': '1.1.1',
                  'LAYERS': 'g_riesgos_2011',
                  'TILED': true 
                }
    });
    ////////////////////////////////
    var viewResolution = view.getResolution();
    var urls = WMSsource.getGetFeatureInfoUrl(
                                              evt.coordinate, viewResolution, view.getProjection(),
                                              { 'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50  ,format_options: 'callback: getJson'}
    );

    console.log("URLS",urls);
  
    $("#cod_macrodistrito").val('');
    $("#distrito").val('');
    $("#macrodistrito").val('');
    $("#zona").val('');
    $("#codigo_zona").val('');

    var coord = map.getCoordinateFromPixel(evt.pixel);
    var centro = ol.proj.transform(coord,'EPSG:3857',epsg32719);
    var wkt = '';
    var centro_1 = ol.proj.transform(coord,'EPSG:3857',epsg4326);
    var latitud = centro_1[1];
    var longitud = centro_1[0];
    wkt = "POINT("+centro[0]+" "+centro[1]+")";
    //console.log(centro_1);

    $("#riesgo_latitud").val(latitud);
    $("#riesgo_longitud").val(longitud);

    var url = url_sit+'/geoserver/sit/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sit:zonasref&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(wkb_geometry,'+ wkt +')';   
    //var url = 'http://sitservicios.lapaz.bo/geoserver/sit/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sit:zonasref&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(wkb_geometry,'+ wkt +')';
    //console.log("URL PARA ZONAS",url);
     
    setTimeout(function()
    {
      $.ajax({
                url: url,
                //data: parameters,
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: 'getJson',
                success: function (data)
                {
                  //console.log('OK.....', data);
                  if(data.features.length == 1)
                  {
                    var codigo_zona = data.features[0].properties.codigozona;
                    console.log('codigozona:',codigo_zona);
                    $("#codigo_zona").val(codigo_zona);
                                        
                    var distrito = data.features[0].properties.distrito;
                    console.log('distrito:', distrito);
                    $("#distrito").val(distrito);

                    var cod_macrodistrito = data.features[0].properties.macro;
                    console.log('cod macro:', cod_macrodistrito);
                    $("#cod_macrodistrito").val(cod_macrodistrito);

                    var macrodistrito =  data.features[0].properties.macrodistrito;
                    console.log('macrodistrito:', macrodistrito);
                    $("#riesgo_macrodistrito").val(macrodistrito);
                                        
                    var zona = data.features[0].properties.zona;
                    zona = zona.toUpperCase();
                    console.log('zona:', zona);
                    $("#riesgo_zona").val(zona);     
                  }
                  else
                  {
                    console.log("ningun resultado");
                  }
                },
                error: function (data)
                { 
                  console.log(data);
                }   
            });
    },2000);
    
    setTimeout(function()
    {
      $.ajax({
                type: "POST",
                url:urls,
                dataType: 'jsonp',
                jsonpCallback: 'getJson',
                success: function (data) 
                {
                  var c = data.features.length;
                  //console.log(data.features);
                  if(c==1)
                  {
                    var grado = data.features[0].properties.grado;
                    grado = grado.toUpperCase();
                    if(grado === "ALTO")
                    {
                      $("#riesgo_nivel").val(3);//ALTO
                    }
                    else
                    {
                      if(grado === "MUY ALTO")
                      {
                        $("#riesgo_nivel").val(4);//MUY ALTO
                      }
                      else
                      {
                        $("#riesgo_nivel").val(2);//OTROS
                      }
                    }
                  }
                  else
                  {
                    var grado =  "SIN DATOS";
                    $("#riesgo_nivel").val(2);//OTROS
                  }
                  console.log("GRADO DE RIESGO... ",grado);
                  ///////////////////////////////////////////

                  ///////////////////////////////////////////
                }
            });
    },200);
    
    var feature = new ol.Feature(
              new ol.geom.Point(ol.proj.fromLonLat(centro_1))
    );
            
    feature.setStyle(iconStyle);
            vectorSource.addFeature(feature);
    });
    //////////////////////////////////////
},50);