var GEO_SIT    = "";
var GEO_UDIT   = "";
var urlGEO_SIT = "";
var urlGEO_UDIT= ""; 

if (jsonURLS) {
  try{
        GEO_SIT = jsonURLS.SIT_GEO;
        urlGEO_SIT = GEO_SIT+"geoserver/wms";
        console.log("URL GEO SIT ...",urlGEO_SIT);
    }catch(e){console.log("Warning:", e);}

  try{
        GEO_UDIT = jsonURLS.UDIT_GEO;
        urlGEO_UDIT = GEO_UDIT+"geoserver/wms";
        console.log("URL GEO UDIT...",urlGEO_UDIT);
    }catch(e){console.log("Warning:", e);}
}

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
         stroke : new ol.style.Stroke({color : 'brow',width : 3}),
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
  title: 'Open Street Map',
  //opacity: 0.3,
  visible: true,
  source: new ol.source.OSM()
});


var vias = new ol.layer.Tile({
  title: 'Vias',
  //opacity: 0.3,
  visible: true,
  source: new ol.source.TileWMS({
    url: urlGEO_SIT,
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
            url: urlGEO_SIT,
            params: { 'LAYERS': 'catastro:zonasvalor2015', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
            serverType: 'geoserver',
            crossOriginKeyword: 'anonymous'
          })
});

var vias_udit = new ol.layer.Tile({
  title: 'Vias',
  //opacity: 0.3,
  visible: false,
  source: new ol.source.TileWMS({
    url: urlGEO_UDIT,
    params: { 'LAYERS': 'DEGEM:vias_sit', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
    serverType: 'geoserver',
    //crossOrigin: '*'
    crossOriginKeyword: 'anonymous'
  })
});

var zonas_tributarias_udit = new ol.layer.Tile({
            title: 'Zonas Tributarias',
            opacity: 0.3,
            visible: false,
            source: new ol.source.TileWMS({
            url: urlGEO_UDIT,
            //url: 'http://192.168.6.46:8080/geoserver/wms',
            params: { 'LAYERS': 'DEGEM:zonas_de_valor_3857', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
            serverType: 'geoserver',
            crossOriginKeyword: 'anonymous'
          })
});

var zonas_udit = new ol.layer.Tile({
            title: 'Zonas',
            opacity: 0.3,
            visible: false,
            source: new ol.source.TileWMS({
            url: urlGEO_UDIT,
            //url: 'http://sitservicios.lapaz.bo/geoserver/wms',
            params: { 'LAYERS': 'DEGEM:zonas_gamlp', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
            serverType: 'geoserver',
            crossOriginKeyword: 'anonymous'
          })
});

var zonas_seguras_udit = new ol.layer.Tile({
            title: 'Zonas Seguras',
            //opacity: 0.3,
            visible: true,
            source: new ol.source.TileWMS({
            url: urlGEO_UDIT,
            //url: 'http://sitservicios.lapaz.bo/geoserver/wms',
            params: { 'LAYERS': 'DEGEM:zonas_seguras', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
            serverType: 'geoserver',
            crossOriginKeyword: 'anonymous'
          })
});

var zonas = new ol.layer.Tile({
            title: 'Zonas',
            opacity: 0.3,
            visible: false,
            source: new ol.source.TileWMS({
            url: urlGEO_SIT,
            params: { 'LAYERS': 'sit:zonasref', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
            serverType: 'geoserver',
            crossOriginKeyword: 'anonymous'
          })
});

var lotes_1 = new ol.layer.Tile({
    title: 'Lotes Catastro',
    //opacity: 0.3,
    visible: true,
    source: new ol.source.TileWMS({
        url: urlGEO_SIT,
        params: { 'LAYERS': 'catastro:lotes', 'VERSION': '1.1.1', 'FORMAT': 'image/png','STYLES':'ct_lote5','TILED': true },
        serverType: 'geoserver',
        crossOriginKeyword: 'anonymous'
    })
});


var osm_udit = new ol.layer.Tile({
                              title: 'OSM',
                              visible: true,
                              //render: 'canvas',
                              source: new ol.source.TileWMS({
                                                              url: urlGEO_UDIT,
                                                              //url: 'http://localhost:8090/geoserver/DEGEM/wms',
                                                              params: {'LAYERS': 'DEGEM:osm_udit', 'VERSION': '1.1.1','FORMAT': 'image/png','TILED': true},
                                                              serverType: 'geoserver'
                                                              ,crossOrigin: 'Anonymous'
                                                            })
});
//SIT_GEO: "https://gamlpmotores.lapaz.bo/"

var municipios = new ol.layer.Tile({
  title: 'Municipio',
      visible: false,
      source: new ol.source.TileWMS({
          url: urlGEO_SIT,
          params: { 'LAYERS': 'g_municipio3', 'VERSION': '1.1.1', 'FORMAT': 'image/png', 'TILED': true },
          serverType: 'geoserver',
          crossOriginKeyword: 'anonymous'
  })
});

var img_sat_2018 = new ol.layer.Tile({
                                        title: 'Kompsat 2018',
                                        visible: false,
                                        //render: 'canvas',
                                        source: new ol.source.TileWMS({
                                                                        url: urlGEO_SIT,
                                                                        params: {'LAYERS': 'raster:kompsat_2018', 'VERSION': '1.1.1','FORMAT': 'image/png','TILED': true},
                                                                        serverType: 'geoserver',
                                                                        crossOrigin: '*'
                                                                      })
});

var macrodistritos = new ol.layer.Tile({
  title: 'Macrodistritos 2017',
  visible: false,
  source: new ol.source.TileWMS({
      url: urlGEO_SIT,
      params: {'LAYERS': 'lapaz:macrodistritos_2017', 'VERSION': '1.1.0','FORMAT': 'image/png','STYLES':'lp_macrodistritos2017','TILED': true},
      crossOriginKeyword: 'anonymous'
  })
});

var riesgos_2011 = new ol.layer.Tile({
      title: 'Zonas de Riesgo',
      opacity: 0.5,
      visible: true,
      source: new ol.source.TileWMS({
          url: urlGEO_SIT,
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
                                                       url: urlGEO_SIT,
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
                                                        url: urlGEO_SIT,
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
                                                        url: urlGEO_SIT,
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
                                                       url: urlGEO_SIT,
                                                        params: {'LAYERS': 'lapaz:ortofotos2006', 'VERSION': '1.1.0','FORMAT': 'image/jpeg','TILED': true},
                                                        serverType: 'geoserver',
                                                        crossOrigin: '1'
                                                      })
});

var datos;
