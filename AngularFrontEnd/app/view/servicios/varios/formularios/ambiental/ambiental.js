

function ambientalController($scope,$timeout,CONFIG,$window,$rootScope,sessionService,ngTableParams,$filter,$route,sweet,$http,FileUploader,$sce,fileUpload,filterFilter,$routeParams, $location, Data,$q){
  $scope.$on('api:ready', function () {
    
  });
  $scope.inicioServiciosAmbiental = function () {
      // alert("putossssss german ");
   
    $.blockUI();
  };

 

    var url_sit1 = 'http://gmlpsr00026:8080/geoserver/wms?&service=WMS&request=GetMap&layers=sit%3Alotessit&styles=lotessit_s1&format=image%2Fpng&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG%3A3857&bbox=-7584999.190794611,-1863229.0014794567,-7584387.69456833,-1862617.5052531748';

var url_sit2 = 'http://gmlpsr00026:8080/geoserver/wms?&service=WMS&request=GetMap&layers=catastro%3Alotes&styles=ct_lote4&format=image%2Fpng&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG%3A3857&bbox=-7585304.938907753,-1863229.0014794567,-7584999.190794611,-1862923.2533663155';

var epsg32719 = 'EPSG:32719';
var epsg4326 = 'EPSG:4326';
proj4.defs(epsg32719, '+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
proj4.defs(epsg4326,'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');

var projection19 = ol.proj.get('EPSG:32719');
/////////////////////////////////////////////////////////////////////////////////////////////////////
var geojson ={
"type": "FeatureCollection",
"name": "p_a",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "id": 1 }, "geometry": { "type": "Point", "coordinates": [ -68.122702026237477, -16.499431013641196 ] } }
]
};

/*
  
"type": "FeatureCollection",
"name": "puntos_guardados",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } },
"features": [
{ "type": "Feature", "properties": { "id": 1, "nombre": "aaaaa", "numero": 1.0 }, "geometry": { "type": "Point", "coordinates": [ -7585952.264991039410233, -1862237.708768883021548 ] } },
{ "type": "Feature", "properties": { "id": 1, "nombre": "bbbb", "numero": 1.0 }, "geometry": { "type": "Point", "coordinates": [ -7586616.311674267053604, -1863589.688706676941365 ] } },
{ "type": "Feature", "properties": { "id": 1, "nombre": "cccc", "numero": 1.0 }, "geometry": { "type": "Point", "coordinates": [ -7586191.130704430863261, -1863627.907220819732174 ] } },
{ "type": "Feature", "properties": { "id": 2, "nombre": "dddd", "numero": 2.0 }, "geometry": { "type": "Point", "coordinates": [ -7588240.598525326699018, -1862978.192480395548046 ] } },
{ "type": "Feature", "properties": { "id": 2, "nombre": "eeee", "numero": 2.0 }, "geometry": { "type": "Point", "coordinates": [ -7587834.526812561787665, -1863135.843851233832538 ] } },
{ "type": "Feature", "properties": { "id": 2, "nombre": "ffff", "numero": 2.0 }, "geometry": { "type": "Point", "coordinates": [ -7587920.518469383008778, -1863412.928078767610714 ] } },

{ "type": "Feature", "properties": { "id": 2, "nombre": "hhhh", "numero": 2.0 }, "geometry": { "type": "Point", "coordinates": [ -7585689.512706309556961, -1863312.60447914339602 ] } }
]
};



{ "type": "Feature", "properties": 

*/
var data =[
{"geo_frm_id":48076,"st_x":592408.42382813,"st_y":8176040.4677346}, 
{"geo_frm_id":48076,"st_x":592495.22382813,"st_y":8176027.5177346}, 
{"geo_frm_id":48077,"st_x":592533.02382813,"st_y":8176082.1177346}
];
 
 //console.log("ffffffffffffff",cola[0].st_x);



var cabecera_geo = '"type": "FeatureCollection","name": "puntos_guardados","crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } },"features": [';
 
//var cuerpo_geo = '' 
/////////////////////////////////////////////////////////////////////////////////////////////////////
//var p = [-68.122702026237477,-16.499431013641196,-68.123480,-16.500322,-68.121659,-16.5000322];

var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.85,
        src: '../../element/icon/arbol.png'
    })
});


//////////////////////////////////////////////////////////////////////////

/*
var source_p = new ol.source.Vector({wrapX: false});

var draw = new ol.interaction.Draw({
      source: source_p,
      type: 'Point'
      //geometryFunction: geometryFunction,
      //maxPoints: maxPoints
    });
    
    
  draw.on('drawend',function(e){});
  map.addInteraction(draw);
  */


//////////////////////////////////////////////////////////////////////////
var vectorSource = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({source: vectorSource});
//////////////////////////////////////////////////////////////////////////

/*--------------------------------------------------------------------------------------------------*/
var controls =  new ol.control.defaults({
                    attributionOptions: ({collapsible: false})
                }).extend([
                          //new ol.control.ZoomSlider(),
                          //new ol.control.Rotate(),
                          //new ol.control.OverviewMap(),
                          //new ol.control.FullScreen(),
                          new ol.control.ScaleLine(),
                          new ol.control.MousePosition({
                                                        //coordinateFormat: ol.coordinate.toStringHDMS,
                                                        coordinateFormat: ol.coordinate.createStringXY(6),
                                                        //projection: 'EPSG:3857'
                                                        projection: 'EPSG:4326'
                                                       // projection: projection19
                                                        
                                                      })
                        ]);
  
var interactions =  new ol.interaction.defaults().extend([
                          new ol.interaction.Select({condition: ol.events.condition.mouseMove})
                    ]);

var centro = ol.proj.transform([593634,8175613],epsg32719,'EPSG:4326');

//console.log("ffffffffffffff",centro);

var view = new ol.View({
                          //projection: projection19,
                          center: ol.proj.fromLonLat(centro), 
                          zoom: 16
                          //minZoom: 2,
                          //maxZoom: 20
                      });

////////////////////////////////////////////////////////////////////////////////////
/*
var source = new ol.source.Vector({
   //features: (new ol.format.GeoJSON({defaultDataProjection: 'EPSG:32719'})).readFeatures(geojson)
   features: (new ol.format.GeoJSON({defaultDataProjection: 'EPSG:4326'})).readFeatures(geojson)
});

var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.85,
        src: 'arbol.png'
    })
});


var vectorLayer = new ol.layer.Vector({
   source : source,
   //projection:epsg32719,
   style: iconStyle
});
*/
/*-----------------------------------------------------------------------------------------*/

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

 var map = new ol.Map({
        layers: [
            new ol.layer.Group({
                title: 'Mapas Base',
                layers: [
                         new ol.layer.Tile({
                          title: 'OSM Estandar',
                          type: 'base',
                          visible: true,
                          source: new ol.source.OSM()
                        }),
                         new ol.layer.Tile({
                          title: 'OSM Transporte',
                           type: 'base',
                          visible: false,
                          source: new ol.source.XYZ({
                                                       url:'https://c.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38'
                                                    })
                        }),
                         new ol.layer.Tile({
                          title: 'OSM Humanitario',
                           type: 'base',
                          visible: false,
                          source: new ol.source.XYZ({
                                                       url:'https://tile-b.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                                                    })
                        }),
                        new ol.layer.Tile({
                          title: 'OSM Ciclista',
                           type: 'base',
                          visible: false,
                          source: new ol.source.XYZ({
                                            url:'https://a.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38'
                                                    })
                        }),  
                        ]
            }),
            new ol.layer.Group({
                title: 'Capas',
                layers: [

                         new ol.layer.Tile({
                          title: 'Kompsat 2018',
                          visible: false,
                          //render: 'canvas',
                          source: new ol.source.TileWMS({
                                                          url: urlGEO_SIT,
                                                          params: {'LAYERS': 'raster:kompsat_2018', 'VERSION': '1.1.1','FORMAT': 'image/png','TILED': true},
                                                          serverType: 'geoserver',
                                                          crossOrigin: '*'
                                                        })
                        }),
                        vectorLayer 
                        /*
                        new ol.layer.Tile({
                          title: 'Lotes SIT',
                          visible: false,
                          //render: 'canvas',
                          source: new ol.source.TileWMS({
                                                          url: 'http://gmlpsr00026:8080/geoserver/wms',
                                                          params: {'LAYERS': 'sit:lotessit', 'STYLES':'lotessit_s1','VERSION': '1.1.1','FORMAT': 'image/png','TILED': true},
                                                          serverType: 'geoserver',
                                                          crossOrigin: '1'
                                                        })
                        }),
                        vectorLayer ,
                        new ol.layer.Tile({
                          title: 'Lotes Catastro',
                          visible: false,
                          //render: 'canvas',
                          source: new ol.source.TileWMS({
                                                          url: 'http://gmlpsr00026:8080/geoserver/wms',
                                                          params: {'LAYERS': 'catastro:lotes', 'STYLES':'ct_lote4', 'VERSION': '1.1.1','FORMAT': 'image/png','TILED': true},
                                                          serverType: 'geoserver',
                                                          crossOrigin: '1'
                                                        })
                        })
                         */ 
                        ]
            })
        ],
        //overlays: [featureOverlay],
        target: 'map',
        controls: controls,
        interactions: interactions,
        view: view
});
var layerSwitcher = new ol.control.LayerSwitcher({
                          tipLabel: 'Leyenda'
                  });
map.addControl(layerSwitcher);


///////////////////////////////////////////////////////////////////////////////////////////

map.on('click', function(evt) {
       
        var coordinates = evt.coordinate;
        
        var punto_para_enviar = ol.proj.transform(coordinates,'EPSG:3857','EPSG:4326');
        
        console.log("punto para enviar",punto_para_enviar);
       
        pintado_arbolado(punto_para_enviar);
       
              
});
function pintado_arbolado(punto){

    //ajaxc

    $.ajax({
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          url: 'http://172.26.36.252:9091/wsAnbiental/cordenadas',
          dataType: 'json',
          data: '{  "latitud":"'+punto[1]+'","longitud":"'+punto[0]+'"}',
          success: function (data){ 

             var puntos_entrada = data.success.data;
              console.log("respuesta",puntos_entrada);
              //$scope.idrespuesta = 4;
              vectorSource.clear();
              var nro_puntos = puntos_entrada.length;
              $("#nroArboles").val(nro_puntos); 
              for (var i = 0; i < puntos_entrada.length; i++) {
                var punto_i =  puntos_entrada[i];
                console.log("puntoi",punto_i);
                var puntox = parseFloat(punto_i.longitudv); 
                var puntoy = parseFloat(punto_i.latitudv);

                var centro = [puntox,puntoy]; 
                console.log("punto",centro);

                var feature = new ol.Feature(
                    new ol.geom.Point(ol.proj.fromLonLat(centro))
                );
                feature.setStyle(iconStyle);
                vectorSource.addFeature(feature);
              }
             
           },
          error: function (data){ console.log(data);}
    });


    var puntos_entrada2 = '[{"puntox":-68.134128,"puntoy":-16.484135},{"puntox":-68.132197,"puntoy":-16.483991}]';//[{-68.134128,-16.484135},{-68.132197,-16.483991}];

    puntos_entrada2 = JSON.parse(puntos_entrada2);
    console.log("fin",puntos_entrada2);

   


}
///////////////////////////////////////////////////////////////////////////////////////////

var iconStyle_p = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.85,
        src: '../../element/icon/people.png'
    })
});

 var source_p = new ol.source.Vector();

function addInteractions(){
  var draw = new ol.interaction.Draw({source: source_p,type:'Point', style:iconStyle_p});
  map.addInteraction(draw);
}
addInteractions();

}
