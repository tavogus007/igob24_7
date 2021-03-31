var GEO_SIT    = "";
var GEO_UDIT   = "";
var urlGEO_SIT = "";
var urlGEO_UDIT= ""; 

if (jsonURLS) {
  try{
        GEO_SIT = jsonURLS.SIT_GEO;
        urlGEO_SIT = GEO_SIT+"geoserver/wms";
        //console.log("URL GEO SIT ...",urlGEO_SIT);
    }catch(e){console.log("Warning:", e);}

  try{
        GEO_UDIT = jsonURLS.UDIT_GEO;
        urlGEO_UDIT = GEO_UDIT+"geoserver/wms";
        //console.log("URL GEO UDIT...",urlGEO_UDIT);
    }catch(e){console.log("Warning:", e);}
}

function graficarMapaGeroserver(idNamef, lat, lon){
    var map;
    var pDefecto;
    var vectorSource = new ol.source.Vector(),
        vectorLayer = new ol.layer.Vector({
            source: vectorSource
    });

    //console.log("LATITUD :", lat);
    //console.log("LATITUD :", lon);

    pDefecto = [parseFloat(lon), parseFloat(lat)];

    console.log("PUNTO DEFECTO:", pDefecto);

    map = new ol.Map({
        layers:
                [

                    new ol.layer.Tile({
                        visible: true,
                        source: new ol.source.TileWMS({
                                                          url: urlGEO_UDIT,
                                                          params: {'LAYERS': 'DEGEM:osm_udit', 'VERSION': '1.1.1','FORMAT': 'image/png','TILED': true},
                                                          serverType: 'geoserver',
                                                          crossOrigin: 'Anonymous'
                                                    })
                    }),
                    vectorLayer

                    /*new ol.layer.Tile({
                        visible: true,
                        source: new ol.source.TileWMS(({
                        url: 'http://192.168.5.48:9090/geoserver/geobolivia/wms?',
                        params: {'LAYERS': 'geobolivia:bolivia', 'VERSION': '1.1.0','FORMAT': 'image/png','TILED': true},
                        serverType: 'geoserver',
                        crossOrigin: 'anonymous'
                        }))*/

                        /*source: new ol.source.OSM({
                        serverType: 'geoserver',
                        crossOrigin: 'anonymous'
                        })*/


                    /*}),
                    vectorLayer*/
                ],
        target: 'map_'+idNamef,
        view: new ol.View({
            center: ol.proj.transform(pDefecto, 'EPSG:4326', 'EPSG:3857'),
            zoom: 16 })
    });

    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,
            //src: 'https://openlayers.org/en/v3.19.1/examples/data/icon.png',
            src: '../../libs/Librerias/OpenLayer3/icon/point_icon.png',
            crossOrigin: 'anonymous'
        }),
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({ color: '#000' }),
            stroke: new ol.style.Stroke({
                color: '#fff', width: 2
            }),
            text: 'Some text'
        })
    });

    var canvas;

    //ICONO DE INICIO
    var iconFeature = new ol.Feature(
            new ol.geom.Point(ol.proj.transform(pDefecto, 'EPSG:4326', 'EPSG:3857'))
        );
    iconFeature.setStyle(iconStyle);
    vectorSource.addFeature(iconFeature);


    map.on("click", function(evt){
        vectorLayer.getSource().clear();
        var feature = new ol.Feature(
            new ol.geom.Point(evt.coordinate)
        );
        feature.setStyle(iconStyle);
        vectorSource.addFeature(feature);
        //ALMACENAR IMAGEN - MAPA
        var latLong = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        console.log("DATOS DE LATITUD:", latLong);
        var lat     = latLong[1];
        var long    = latLong[0];
        map.once('postcompose', function(event) {
          canvas = event.context.canvas;
            guardargpsGeoserver(lat, long,canvas.toDataURL('image/png'), idNamef);
        });
        map.renderSync();
    });
}
