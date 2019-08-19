var map = new ol.Map();

var epsg32719 = 'EPSG:32719';
var epsg4326 = 'EPSG:4326';
proj4.defs(epsg32719, '+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
proj4.defs(epsg4326,'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');


var vectorSourceB = new ol.source.Vector({});
var vectorLayerZonas = new ol.layer.Vector();

var vectorSource = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({source: vectorSource});

//map.addLayer(vectorLayerZonas);

var myStyleZonas = new ol.style.Style({
         stroke : new ol.style.Stroke({color : 'orange',width : 2}),
         fill : new ol.style.Fill({color: 'transparent'})
});

var view = new ol.View({
                        //projection: projection19,
                        center: ol.proj.fromLonLat([ -68.122455, -16.498960]), 
                        zoom: 16
                        //minZoom: 2,
                        //maxZoom: 20
});

var buscar = document.getElementById('buscar');

var geojson_empiezo = '{"type":"FeatureCollection","name":"puntos_geo_3857","crs":{"type":"name","properties":{"name": "urn:ogc:def:crs:EPSG::3857"}},"features": [';
var geojson_cuerpo ='';
var geojson_fin = ']}';
var geojson_c = '';
var centro = '';
var geo_cuerpo_l = '';
var geo_cuerpo_p = '';

var geo_empiezo = '{"type":"FeatureCollection","name":"puntos_geo_3857","crs":{"type":"name","properties":{"name": "urn:ogc:def:crs:EPSG::3857"}},"features": [';
var geo_fin = ']}';

var coord ='';
//$scope.popup = ''; 

var popup = document.getElementById('popup');
var popup_closer = document.getElementById('popup-closer');
var popup_content = document.getElementById('popup-content');
var olpopup = new ol.Overlay({element: popup,autoPan: false});


var iconStyle_riesgo = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: 'blue'
              })
            })
});

var iconStyle = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: 'red'
              })
            })
});

var iconStyle_orange = new ol.style.Style({
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: 'orange'
          })
        })
});

var osm = new ol.layer.Tile({
  source: new ol.source.OSM()
});


var vias = new ol.layer.Tile({
            title: 'Vias',
            //opacity: 0.3,
            visible: true,
            source: new ol.source.TileWMS({
              url: 'http://sitservicios.lapaz.bo/geoserver/wms',
              params: { 'LAYERS': 'catastro:vias2', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
              serverType: 'geoserver',
              //crossOrigin: '*'
              crossOriginKeyword: 'anonymous'
            }),
            style: new ol.style.Style({ 
               stroke: new ol.style.Stroke({
                 color: 'red',
                 with: 10
               })
            })
});

var zonas_tributarias = new ol.layer.Tile({
            title: 'Zonas Tributarias',
            opacity: 0.3,
            visible: false,
            source: new ol.source.TileWMS({
            url: 'http://sitservicios.lapaz.bo/geoserver/wms',
            params: { 'LAYERS': 'catastro:zonasvalor2015', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
            serverType: 'geoserver',
            crossOriginKeyword: 'anonymous'
          })
});

var zonas = new ol.layer.Tile({
            title: 'Zonas',
            opacity: 0.3,
            visible: false,
            source: new ol.source.TileWMS({
            url: 'http://sitservicios.lapaz.bo/geoserver/wms',
            params: { 'LAYERS': 'sit:zonasref', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
            serverType: 'geoserver',
            crossOriginKeyword: 'anonymous'
          })
});


var osm_udit = new ol.layer.Tile({
                              title: 'OSM',
                              visible: true,
                              //render: 'canvas',
                              source: new ol.source.TileWMS({
                                                              url: 'http://192.168.6.46:8080/geoserver/DEGEM/wms',
                                                              //url: 'http://localhost:8090/geoserver/DEGEM/wms',
                                                              params: {'LAYERS': 'DEGEM:osm_udit', 'VERSION': '1.1.1','FORMAT': 'image/png','TILED': true},
                                                              serverType: 'geoserver'
                                                              ,crossOrigin: 'Anonymous'
                                                            })
});

var municipios = new ol.layer.Tile({
  title: 'Municipio',
      visible: true,
      source: new ol.source.TileWMS({
          url: 'http://sitservicios.lapaz.bo/geoserver/wms',
          params: { 'LAYERS': 'g_municipio', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
          serverType: 'geoserver',
          crossOriginKeyword: 'anonymous'
  })
});

var img_sat_2018 = new ol.layer.Tile({
                                        title: 'Kompsat 2018',
                                        visible: false,
                                        //render: 'canvas',
                                        source: new ol.source.TileWMS({
                                                                        url: 'http://192.168.5.94:8080/geoserver/wms',
                                                                        params: {'LAYERS': 'raster:kompsat_2018', 'VERSION': '1.1.1','FORMAT': 'image/png','TILED': true},
                                                                        serverType: 'geoserver',
                                                                        crossOrigin: '*'
                                                                      })
});

var macrodistritos = new ol.layer.Tile({
  title: 'Macrodistritos 2017',
  visible: false,
  source: new ol.source.TileWMS({
      url: 'http://192.168.5.94:8080/geoserver/wms',
      params: {'LAYERS': 'lapaz:macrodistritos_2017', 'VERSION': '1.1.0','FORMAT': 'image/png','STYLES':'lp_macrodistritos2017','TILED': true},
      crossOriginKeyword: 'anonymous'
  })
});

var riesgos_2011 = new ol.layer.Tile({
      title: 'Zonas de Riesgo',
      opacity: 0.5,
      visible: true,
      source: new ol.source.TileWMS({
          url: 'http://sitservicios.lapaz.bo/geoserver/wms',
          params: { 'LAYERS': 'g_riesgos_2011', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
          serverType: 'geoserver',
          crossOriginKeyword: 'anonymous'
      })
});
      
var distritos_m_2017 = new ol.layer.Tile({
                        title: 'Distritos Municipales 2017',
                        visible: false,
                        //render: 'canvas',
                        source: new ol.source.TileWMS({
                                                       url: 'http://192.168.5.94:8080/geoserver/wms',
                                                        params: {'LAYERS': 'lapaz:distritos_2017', 'VERSION': '1.1.0','FORMAT': 'image/png','STYLES':'lp_distritos2017','TILED': true},
                                                        serverType: 'geoserver',
                                                        crossOrigin: '1'
                                                      })
});

var restitucion_2006 = new ol.layer.Tile({
                        title: 'Restitucion 2006',
                        visible: false,
                        //render: 'canvas',
                        source: new ol.source.TileWMS({
                                                        url: 'http://192.168.5.94:8080/geoserver/wms',
                                                        params: {'LAYERS': 'g_restitucion_2006', 'VERSION': '1.1.0','FORMAT': 'image/png','TILED': true},
                                                        serverType: 'geoserver',
                                                        crossOrigin: '1'
                                                      })
});

var planimetria = new ol.layer.Tile({
                        title: 'Planimetria',
                        visible: false,
                        //render: 'canvas',
                        source: new ol.source.TileWMS({
                                                        url: 'http://192.168.5.94:8080/geoserver/wms',
                                                        params: {'LAYERS': 'archivo:planimetrias', 'VERSION': '1.1.0','FORMAT': 'image/png','STYLES':'planimetrias_desc','TILED': true},
                                                        serverType: 'geoserver',
                                                        crossOrigin: '1'
                                                      })
});

var ortofotos_2006 = new ol.layer.Tile({
                        title: 'Ortofotos 2006',
                        visible: false,
                        //render: 'canvas',
                        source: new ol.source.TileWMS({
                                                       url: 'http://192.168.5.94:8080/geoserver/wms',
                                                        params: {'LAYERS': 'lapaz:ortofotos2006', 'VERSION': '1.1.0','FORMAT': 'image/jpeg','TILED': true},
                                                        serverType: 'geoserver',
                                                        crossOrigin: '1'
                                                      })
});

setTimeout(function()
{
  console.log("Mapa AE");
  //map.removeLayer(vectorLayer_inci_baja);
  $("#map_principal").empty();
  map = new ol.Map
  ({
    target: 'map_principal',
    layers: [
              new ol.layer.Group({
                                  title: 'Mapas Base',
                                  layers: [
                                            osm,
                                            municipios,
                                            zonas_tributarias,
                                            vias  
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
      center: ol.proj.fromLonLat([-68.133555,-16.495687])
    })
  });
        
  var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: 'Leyenda'});
  map.addControl(layerSwitcher);

  map.on('click', function (evt)
  {
      vectorSource.clear();
      if(jsonURLS)
      {
          var url_sit    =   jsonURLS.SIT_GEO;
          //console.log('INTERMEDIO EN MAPA-----',url_sit);
      }
      var url_r = url_sit+'/geoserver/wms';
      //console.log("URL PARA RIESGOS",url_r);

      var viewResolution = view.getResolution();

      var WMSsource_z = new ol.source.ImageWMS({
          ratio: 1,
          url: url_r,
          params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    'LAYERS': 'sit:zonasgu2016',
                    'TILED': true 
                  }
      });
      var url_z = WMSsource_z.getGetFeatureInfoUrl(
                                                evt.coordinate, viewResolution, view.getProjection(),
                                                { 'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50  ,format_options: 'callback: getJson'}
      );

      var WMSsource_zt = new ol.source.ImageWMS({
          ratio: 1,
          url: url_r,
          params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    'LAYERS': 'catastro:zonasvalor2015',
                    'TILED': true 
                  }
      });
      var url_zt = WMSsource_zt.getGetFeatureInfoUrl(
                                                evt.coordinate, viewResolution, view.getProjection(),
                                                { 'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50  ,format_options: 'callback: getJson'}
      );

      var WMSsource_v = new ol.source.ImageWMS({
          ratio: 1,
          url: url_r,
          params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    'LAYERS': 'catastro:vias2',
                    'TILED': true 
                  }
      });
      var url_v = WMSsource_v.getGetFeatureInfoUrl(
                                                evt.coordinate, viewResolution, view.getProjection(),
                                                { 'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50  ,format_options: 'callback: getJson'}
      );

      var coord = map.getCoordinateFromPixel(evt.pixel);
      var centro = ol.proj.transform(coord,'EPSG:3857',epsg32719);
      var wkt = '';
      var centro_1 = ol.proj.transform(coord,'EPSG:3857',epsg4326);
      var latitud = centro_1[1];
      var longitud = centro_1[0];
      wkt = "POINT("+centro[0]+" "+centro[1]+")";
    
      var url = url_sit+'/geoserver/sit/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sit:zonasref&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(wkb_geometry,'+ wkt +')';   
      
      console.log ("latitud: ",latitud);
      console.log ("longitud: ",longitud);
   
      setTimeout(function()
      {
          $.ajax({
                    url: url_z,
                    //data: parameters,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'getJson',
                    success: function (data)
                    {
                      //console.log('OK.....', data);
                      if(data.features.length == 1)
                      {                         
                        var distrito = data.features[0].properties.distrito;
                        console.log('distrito:', distrito);

                        var cod_macrodistrito = data.features[0].properties.macro;
                        console.log('cod macro:', cod_macrodistrito);
                    
                        var macrodistrito =  data.features[0].properties.macrodistrito;
                        console.log('macrodistrito:', macrodistrito);
                                            
                        var zona = data.features[0].properties.zona;
                        console.log('zona:', zona);

                        var codigo_zona = data.features[0].properties.codigozona;
                        console.log('cod zona sit:',codigo_zona);

                        var n_genesis = geo_id_genesis.length;
                        for (var i=0;i<n_genesis;i++)
                        {
                          if(geo_id_sit_servicio[i ]=== codigo_zona )
                          {
                            cod_zona_genesis = geo_id_genesis[i];
                            console.log("cod zona genesis: ",cod_zona_genesis);
                          }
                        }

                        setTimeout(function()
                        {
                          $.ajax({
                                  type: "POST",
                                  url:url_zt,
                                  dataType: 'jsonp',
                                  jsonpCallback: 'getJson',
                                  success: function (data) 
                                  {
                                    var c = data.features.length;
                                    //console.log(data.features);
                                    if(c==1)
                                    {
                                      var cod_zona_t = data.features[0].properties.grupovalor;
                                      cod_zona_t = cod_zona_t.replace("-","");
                                      var cod_zona_tributaria = parseInt(cod_zona_t);
                                      console.log("cod zona tributaria: ",cod_zona_tributaria);
                                      setTimeout(function()
                                      {
                                        $.ajax({
                                                type: "POST",
                                                url:url_v,
                                                dataType: 'jsonp',
                                                jsonpCallback: 'getJson',
                                                success: function (data) 
                                                {
                                                  var c = data.features.length;
                                                  //console.log(data.features);
                                                  if(c==1)
                                                  {
                                                    var id_via = data.features[0].properties.idvias;
                                                    console.log("id via: ",id_via);

                                                    var nombre_via = data.features[0].properties.nombrevia;
                                                    console.log("nombre via: ",nombre_via);

                                                    var tipo_via = data.features[0].properties.tipovia;
                                                    console.log("tipo via: ",tipo_via);
                                                  }
                                                  else
                                                  {
                                                    console.log("ningun resultado para vias");
                                                  }
                                                }
                                              });
                                      },50);
                                    }
                                    else
                                    {
                                      console.log("ningun resultado para zona tributaria");
                                    }
                                  }
                                });
                        },100);
                      }
                      else
                      {
                        console.log("ningun resultado para zonas");
                      }
                    },
                    error: function (data)
                    { 
                      console.log(data);
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
},550);

function buscar_ubicacion_p()
{
  var nombre_1 = new Array();
  var f = '';
  var nombre = document.getElementById('busqueda_p').value;
  nombre = nombre.toUpperCase();
  var ca = "CALLE ";
  ca = ca.concat(nombre);
  var c = 0;
  /////////////////////////////
  var tipo = "lugares";
  var data = '';
  ///////////////////////////////
  if(nombre==='')
  {
    var obj = {'nombre':'INTRODUZCA DATOS!!!...'};
    console.log("Vacio :",obj);
    //map.removeLayer(vectorLayerZonas);
    vectorLayerZonas.getSource().clear();
  }
  else
  {  
    if(tipo == 'lugares')
    {
      map.removeLayer(vectorLayerZonas);
      for (var i=0;i<geo_zonas.features.length;i++)
      {
        var nombre_zona =  geo_zonas.features[i].properties.zonaref;
        var x_c = geo_zonas_centroides.features[i].geometry.coordinates[0];
        var y_c = geo_zonas_centroides.features[i].geometry.coordinates[1];
        if(nombre === nombre_zona)
        {
          c=c+1;
          var geo_zona =  geo_zonas.features[i];
          var xx = x_c;
          var yy = y_c;
        }
      }
      if(c>0)
      {
        //alert("mapa_principal");
        geo_zona = JSON.stringify(geo_zona);
        vectorLayerZonas.setSource(new ol.source.Vector({
                                                     features: (new ol.format.GeoJSON({defaultDataProjection:'EPSG:3857'})).readFeatures(geo_zona)
        }));

        vectorLayerZonas.setStyle(myStyleZonas);

        map.addLayer(vectorLayerZonas);
        map.getView().setCenter([xx,yy]);
        map.getView().setZoom(15);

        setTimeout(function(){
          //alert();
          vectorLayerZonas.getSource().clear();
        },1400);

      }
    }
    if(c==0)
    {
      var obj = {'nombre':'NO EXISTEN REGISTROS!!!'};
      console.log("Vacio :",obj);
    }
  }   
}

function map_ae_update()
{
  console.log("ENTRANDO MAPA ACTUALIZAR....");
}