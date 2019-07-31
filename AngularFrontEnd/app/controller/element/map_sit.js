var map, baseLayer, markers, zoom;
var canvas, mIdNameIf;
function graficarMapaGeroserver(idNamef, lat, lon){ 
    mIdNameIf=idNamef;
    var mapOptions = {
        resolutions: [1399.9999999999998, 699.9999999999999, 280.0, 140.0, 70.0, 27.999999999999996, 13.999999999999998, 6.999999999999999, 2.8, 1.4, 0.7, 0.27999999999999997, 0.13999999999999999, 0.06999999999999999, 0.034999999999999996],
        projection: new OpenLayers.Projection('EPSG:32719'),
        maxExtent: new OpenLayers.Bounds(166021.44309607794, 1116915.044047609, 882821.4430960778, 10076915.044047607),
        units: "meters",
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.Attribution()
        ]
    };

    map = new OpenLayers.Map('map_'+idNamef, mapOptions);

    var wms_sit = CUtil.CapasGWC.getMunicipio2(); 
    var wms = CUtil.CapasGWC.getRestitucion();
    var wms_geoeye = CUtil.Capas.getGeoEye2013();
    var wms_vview = CUtil.Capas.getWorldview();

    var wms_distritos = CUtil.Capas.getDistritos2017(null, { visibility: false });
    var wms_macros2017 = CUtil.Capas.getMacrodistritos2017(null, { visibility: false });

    map.addLayers([wms_sit, wms, wms_vview, wms_geoeye, wms_distritos, wms_macros2017]);
useCanvas: OpenLayers.Layer.Grid.ONECANVASPERLAYER
    var verTablaBusquedas = function (data) {
        $("#dlgBusquedas").dialog("open");
    };
    var busquedas = new OpenLayers.Control.MapSearch({ fnMessage: msgX, div: 'ctlBusquedas', nodeResult: 'resultBusquedas', items: MapSearch.templates, fnHandler: verTablaBusquedas });

    var scala = new OpenLayers.Control.ScaleLine();
    var lyrctl = new OpenLayers.Control.LayerSwitcher({});
    lyrctl.ascending = false;
    lyrctl.useLegendGraphics = true;
    map.addControls([busquedas, scala, lyrctl]);

    $("#btnBuscar").button().click(function (e) {
        e.preventDefault();
        busquedas.buscar($("#cqltxt").val());
    });
    $("#btnLimpiar").button().click(function (e) {
        e.preventDefault()
        busquedas.limpiar();
        $('#msg1').empty();
    });
    $("#results").dialog({ autoOpen: false, width: 880, height: 605, zIndex: 3000, modal: true, title: "Ventana Resultados" });
    $("#dlgBusquedas").dialog({
        autoOpen: false, zIndex: 1999, height: 280, width: 340, title: "Busquedas espaciales",
        position: { my: "left bottom", at: "left bottom", of: $('map_'+idNamef) }
    });
    $("#resizable").resizable(
    {
        minWidth: 400,
        minHeight: 300,
        maxWidth: 1366,
        maxHeight: 768,
        stop: function (event, ui) {
            busquedas.reset();
            map.updateSize();
        }
    });

    zoom=10;
    console.log("::LOTLAN::",lon, lat);
    var lonLat = new OpenLayers.LonLat(lat, lon);
    // Proyecciones
    markers = new OpenLayers.Layer.Markers( "Puntos" );
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(lonLat));

    map.setCenter(lonLat, zoom);   

    var click = new OpenLayers.Control.Click();
    map.addControl(click);
    click.activate();
}

OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
                defaultHandlerOptions: {
                    'single': true,
                    'double': false,
                    'pixelTolerance': 0,
                    'stopSingle': false,
                    'stopDouble': false
                },

                initialize: function(options) {
                    this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaultHandlerOptions
                    );
                    OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                    ); 
                    this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click': this.trigger
                        }, this.handlerOptions
                    );
                }, 

                trigger: function(e) {
                    var lonlat = map.getLonLatFromViewPortPx(e.xy)
                    
                    markers.clearMarkers();

                    lonlat = new OpenLayers.LonLat(lonlat.lon, lonlat.lat);
                    
                    markers.addMarker(new OpenLayers.Marker(lonlat));

                    var mapElem= document.getElementById("map_" + mIdNameIf);

                    html2canvas(mapElem, {
                      useCORS: false,
                      onrendered: function(canvas) {
                        mapImg = canvas.toDataURL('image/png');
                        console.log(mapImg);
                        guardargpsGeoserver(lonlat.lon,  lonlat.lat, mapImg, mIdNameIf);
                      }
                    });
                }

});

function msgX(s){
    $('#msg1').empty().text(s);
}