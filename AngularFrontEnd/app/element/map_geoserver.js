
        var map ;
        var vector_layer = new OpenLayers.Layer.Vector();
        var vlayer = new OpenLayers.Layer.Vector();
        var panel = new OpenLayers.Control.Panel();
        //var Url = CONFIG.CONEXION_SITV3;

        if(jsonURLS){
            var url_API_PG    =   jsonURLS.CONEXION_API_PG_IF;
        }


        function graficar_mapa(campo_id_mapa){
            
            var url_SITV3_ANTENA    =   jsonURLS.SIT_GEO + "/";
            $("#"+campo_id_mapa).empty();
            CUtil.Capas.GEOSERVER = url_SITV3_ANTENA + "geoserver/";
            var mapOptions = {
                resolutions: [1399.9999999999998, 699.9999999999999, 280.0, 140.0, 70.0, 27.999999999999996, 13.999999999999998, 6.999999999999999, 2.8, 1.4, 0.7, 0.27999999999999997, 0.13999999999999999, 0.06999999999999999, 0.034999999999999996],
                projection: new OpenLayers.Projection('EPSG:32719'),
                maxExtent: new OpenLayers.Bounds(166021.44309607794, 1116915.044047609, 882821.4430960778, 10076915.044047607),
                units: "meters"
            };
            var id_mapa = campo_id_mapa;//"mapa1";
            map = new OpenLayers.Map(id_mapa,mapOptions);
            var swl = new OpenLayers.Control.LayerSwitcher();
            map.addControl(swl);
            var position = new OpenLayers.Control.MousePosition();
            map.addControl(position);
            //mapa base
            var wmsMunicipio = new OpenLayers.Layer.WMS('Mapa La Paz', CUtil.Capas.GEOSERVER + 'gwc/service/wms', {layers:'g_municipio'},null);
            //var wmsKompsat = new OpenLayers.Layer.WMS('Imagen Satelital 2018', CUtil.Capas.GEOSERVER + 'raster/wms', {layers:'kompsat_2018'},null);
            //var wmsGeoEye = new OpenLayers.Layer.WMS('Imagen Satelital 2013', CUtil.Capas.GEOSERVER + 'lapaz/wms', {layers:'geoeye_2013'},null);

            map.addLayers([wmsMunicipio]);
            map.setCenter(new OpenLayers.LonLat(592489.90, 8176019.29),10);

            var wmsMacro = new OpenLayers.Layer.WMS('Macrodistritos',CUtil.Capas.GEOSERVER + 'wms',{layers:'lapaz:macrodistritos', transparent: true}, {isBaseLayer:false, visibility:false});

            map.addLayers([ wmsMacro]);
                vlayer = new OpenLayers.Layer.Vector("Editable_vector", {
                displayInLayerSwitcher: false,
                styleMap: new OpenLayers.StyleMap({
                    "default": new OpenLayers.Style(
                            OpenLayers.Util.extend(OpenLayers.Feature.Vector.style["default"], { strokeColor: "#FF00FF", strokeWidth: 4.5, fillColor:"#C000C0" })
                    ),
                    "temporary": new OpenLayers.Style(
                            OpenLayers.Util.extend(OpenLayers.Feature.Vector.style["temporary"], { strokeColor: "#004fff", strokeWidth: 2.5, fillColor:"#4d84ff" })
                    ),
                    "select": new OpenLayers.Style(
                            OpenLayers.Util.extend(OpenLayers.Feature.Vector.style["select"], { strokeColor: "#00FFFF", strokeWidth: 2.5, fillColor: "#60D0D0" })
                    )
                })
            });
            map.addLayer(vlayer);
            joao = vlayer;

            var sketchSymbolizers = {
                "Point": {
                    pointRadius: 4,
                    graphicName: "cross",
                    fillColor: "white",
                    fillOpacity: 1,
                    strokeWidth: 1,
                    strokeOpacity: 1,
                    strokeColor: "#333333"
                },
                "Line": {
                    strokeWidth: 2.5,
                    strokeOpacity: 1,
                    strokeColor: "#800000",
                    strokeDashstyle: "dash"
                },
                "Polygon": {
                    strokeWidth: 2,
                    strokeOpacity: 1,
                    strokeColor: "#666666",
                    fillColor: "white",
                    fillOpacity: 0.3
                }
            };
            var style = new OpenLayers.Style();
            style.addRules([
                new OpenLayers.Rule({ symbolizer: sketchSymbolizers })
            ]);
            var styleMap = new OpenLayers.StyleMap({ "default": style });
            var ctl_punto = new OpenLayers.Control.DrawFeature(vlayer, OpenLayers.Handler.Point,
                    { title: 'Dibujar punto',
                        displayClass: 'olControlDrawFeaturePoint',
                        featureAdded: function (e) {
                            //si no queremos mas de un punto
                            if (vlayer.features.length > 1) {
                                var f = vlayer.features[0];
                                vlayer.removeFeatures(f);

                            }
                            getZonas(e, fnError);
                        }
                    }
            );

            var ctl_linea = new OpenLayers.Control.DrawFeature(vlayer, OpenLayers.Handler.Path,
                    {   title: 'Dibujar linea',
                        displayClass: 'olControlDrawFeatureLine',
                        featureAdded: function (e) {

                            getZonas(e, fnError);
                        }
                    });
            var ctl_poligono = new OpenLayers.Control.DrawFeature(vlayer, OpenLayers.Handler.Polygon,
                    {
                        title: 'Dibujar poligono',
                        displayClass: 'olControlDrawFeaturePolygon',
                        handlerOptions: {
                            layerOptions: {
                                styleMap: styleMap
                            }}
                        ,featureAdded: function (e) {getZonas(e, fnError);}
                    });

            var panel = new OpenLayers.Control.Panel({ displayClass: 'customEditingToolbar' });
            panel.addControls([ ctl_punto, new OpenLayers.Control.Navigation()]);
            //panel.defaultControl = panel.controls[0];
            map.addControls([panel]);
            var busquedas = new OpenLayers.Control.MapSearch({ fnMessage: msgX, div: 'ctlBusquedas', nodeResult: 'resultBusquedas', items:MapSearch.templates, fnHandler: verTablaBusquedas });
            map.addControls([busquedas]);
        }

        // inicio graficar puntos recuperados del tramite
        var rMispuntos = new Array();
        function mapas(caso_id){
            rMispuntos = [];
            var cas_id = caso_id;//$("#idtramite").val();//sessionService.get('IDTRAMITE');//4;//8076;
            var principio = "";
            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: url_API_PG + 'wsUbi/lstubicacionGeoserver',
                //url: 'http://192.168.5.141:9098/wsUbi/lstubicacionGeoserver',
                dataType: 'json',
                data: '{  "xgeo_frm_id":'+cas_id+'}',
                success: function (data){ 
                    var respuesta = data.success.data;
                    if(respuesta.length > 0){
                        for (var i = 0; i < respuesta.length; i++) {
                          principio = '{ "type": "Feature", "properties": { "geo_id": '+respuesta[i].xgeoid+', "geo_frm_id":'+cas_id+', "goe_ciudadano_id": "'+respuesta[i].xgeociudadanoid+'"},"geometry": { "type": "Point","coordinates": ['+respuesta[i].xgeox+','+respuesta[i].xgeoy+']}}';
                          rMispuntos.push(JSON.parse(principio));
                        }
                        graficar(rMispuntos);
                    }else{
                        graficarVacio();
                    }
                },
                error: function (data){ 
                    //alert("sin punto");
                    console.log(data);}
            });
        }
        function graficarVacio(){
            vector_layer.destroy();
            var x = 592489.90;//data[0].geometry.coordinates[0];
            var y = 8176019.29;//data[0].geometry.coordinates[1];
            map.setCenter(new OpenLayers.LonLat(x, y),9);
              $("#mapa1").empty();
              $("#results").empty();
              $("#msg1").empty();
              $("#pal").text("BUSQUEDA");
              $("#dlgBusquedas").empty();
              $("#resultBusquedas").empty();
              $("#ctlBusquedas").empty();
              graficar_mapa("mapa1");
        }
        function graficar(data){
            vector_layer.destroy();
            var featurecollection = {"type": "FeatureCollection","name": "punto_insertado","crs": { "type": "name",
             "properties": { "name": "urn:ogc:def:crs:EPSG::32719" } },
             "features": data
             };
            var geojson_format = new OpenLayers.Format.GeoJSON({
            'internalProjection': new OpenLayers.Projection("EPSG:32719"),
                'externalProjection': new OpenLayers.Projection("EPSG:32719"),strategies: [new OpenLayers.Strategy.Fixed()]
            });

            var yourStyle = new OpenLayers.Style({
                    fillColor: "#993300",
                    strokeColor: "white",
                    strokeOpacity: "0.7",
                    strokeWidth: 2,
                    cursor: "pointer",
                        'pointRadius': 10
            });

            var selectStyle = new OpenLayers.Style({
                    'pointRadius': 15,
                    strokeColor: "yellow",
            });

            //////////////////////////////////////////////////////////////
            var antena_style = new OpenLayers.Style({
                  externalGraphic: "../../element/icon/antena_sf_azul.png",
                  graphicWidth:30,
                  graphicHeight:40,
                  graphicXOffset:-10,
                  graphicYOffset:-34  ,
                  graphicZIndex: 1
              });
            //////////////////////////////////////////////////////////////

            var your_styleMap = new OpenLayers.StyleMap({
                    'default': antena_style
                    //'default': yourStyle,
                    //'select': selectStyle
            });
        
            vector_layer = new OpenLayers.Layer.Vector("Punto Insertado", {
                styleMap: your_styleMap
            });
            vector_layer.addFeatures(geojson_format.read(featurecollection));
            map.addLayer(vector_layer);
            var x = data[0].geometry.coordinates[0];
            var y = data[0].geometry.coordinates[1];
            map.setCenter(new OpenLayers.LonLat(x, y),11);

             //vector_layer.removeFeatures(geojson_format.read(featurecollection));
             //map.removeLayer(vector_layer);
             //vector_layer.eraseFeatures();
             //vector_layer.destroyFeatures();
             //vector_layer.refresh();
             //vector_layer.removeAllFeatures();
             //vector_layer.destroy();
             //vector_layer.removeFeatures(vector_layer.features[0]);
             //vector_layer.redraw();
             //Marcador de puntos georeferenciales FIN
        }
        function grafica_XY(X,Y){

                vector_layer.destroy();
                var antena_style = new OpenLayers.Style({
                  externalGraphic: "../../element/icon/antena_sf_azul.png",
                  graphicWidth:30,
                  graphicHeight:40,
                  graphicXOffset:-10,
                  graphicYOffset:-34  ,
                  graphicZIndex: 1
                });

                var featurecollection = {"type": "FeatureCollection","name": "punto_insertado","crs": { "type": "name",
                 "properties": { "name": "urn:ogc:def:crs:EPSG::32719" } },
                 "features": [
                                { "type": "Feature", "properties": { "id": 1 },
                                "geometry": { "type": "Point", "coordinates": [X,Y]}}
                             ]
                };

                var geojson_format = new OpenLayers.Format.GeoJSON({
                'internalProjection': new OpenLayers.Projection("EPSG:32719"),
                    'externalProjection': new OpenLayers.Projection("EPSG:32719"),strategies: [new OpenLayers.Strategy.Fixed()]
                });

                var yourStyle = new OpenLayers.Style({
                        fillColor: "#993300",
                        strokeColor: "white",
                        strokeOpacity: "0.7",
                        strokeWidth: 2,
                        cursor: "pointer",
                            'pointRadius': 10
                });

                var selectStyle = new OpenLayers.Style({
                        'pointRadius': 15,
                        strokeColor: "yellow",
                });

                var your_styleMap = new OpenLayers.StyleMap({
                        'default': antena_style
                        //'default': yourStyle,
                        //'select': selectStyle
                });
            
                vector_layer = new OpenLayers.Layer.Vector("Punto Insertado", {
                    styleMap: your_styleMap
                });
                vector_layer.addFeatures(geojson_format.read(featurecollection));
                map.addLayer(vector_layer);
               
                map.setCenter(new OpenLayers.LonLat(X, Y),11);

        }
     

        var verTablaBusquedas = function (data) {
            $("#dlgBusquedas").dialog("open");
        };
        /*var busquedas = new OpenLayers.Control.MapSearch({ fnMessage: msgX, div: 'ctlBusquedas', nodeResult: 'resultBusquedas', items:MapSearch.templates, fnHandler: verTablaBusquedas });

        map.addControls([busquedas]);*/

        function msgX(s) {
            $('#msg1').empty().text(s);
        }

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
        var id_mapa = "#mapa1";
        $("#dlgBusquedas").dialog({ autoOpen: false, zIndex:1999, height: 280, width: 340, title: "Busquedas espaciales",
            position: { my: "left bottom", at: "left bottom", of: $(id_mapa)} });
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




        var fnError = function (state, msgError, error) {
            console.log("Error state.....  ", state);
            console.log("Error msgError.....  ", msgError);
            console.log("Error.....  ", error);
        };
        var getZonas = function (e, fn_error) {
            var wkt = e.geometry.toString();

            console.log("WKT:",wkt);
            var url = CUtil.Capas.GEOSERVER + 'sit/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sit:zonasref&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(wkb_geometry,'+ wkt +')';
            $.ajax({
                url: url,
                //data: parameters,
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: 'getJson',
                success: function (data) {
                    //console.log('OK.....', data);
                    if(data.features.length == 1){
                        console.log('codigozona:', data.features[0].properties.codigozona);
                        console.log('distrito:', data.features[0].properties.distrito);
                        console.log('cod macro:', data.features[0].properties.macro);
                        console.log('macrodistrito:', data.features[0].properties.macrodistrito);
                        console.log('zona:', data.features[0].properties.zona);
                        console.log('wkt:', wkt);

                        $("#ln_ubicacion").val(wkt);
                        $("#macrodistrito").val(data.features[0].properties.macrodistrito);
                        $("#zona").val(data.features[0].properties.zona);

                        getLoteCatastro(e, fn_error);
                        //getLoteSit(e, fn_error);
                    }
                    else if(data.features.length > 1) {
                        console.log("multiples resultados");
                    }
                    else{
                        console.log("ningun resultado");
                    }
                },
                error: fnError
            });
        }

        var getLoteCatastro = function (e, fn_error) {
            var wkt = e.geometry.toString();
            var url = CUtil.Capas.GEOSERVER + 'catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:lotes&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(geom,'+ wkt +')';
            $.ajax({
                url: url,
                //data: parameters,
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: 'getJson',
                success: function (data) {
                    if(data.features.length == 1){
                        console.log('codigocatastral:', data.features[0].properties.codigocatastral);
                        $("#cod_catastral").val(data.features[0].properties.codigocatastral);

                    }
                    else if(data.features.length > 1) {
                        console.log("multiples resultados");
                    }
                    else{
                        console.log("ningun resultado");
                        $("#cod_catastral").val("No Registrado");                        
                    }
                },
                error: fnError
            });
        }

        var getLoteSit = function (e, fn_error) {
            var wkt = e.geometry.toString();
            var url = CUtil.Capas.GEOSERVER + 'catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:lotes2&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(Shape,'+ wkt +')';
            $.ajax({
                url: url,
                //data: parameters,
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: 'getJson',
                success: function (data) {
                    if(data.features.length == 1){
                        console.log('codigocatastral sit:', data.features[0].properties.COD_SIFCA);
                    }
                    else if(data.features.length > 1) {
                        console.log("multiples resultados");
                    }
                    else{
                        console.log("ningun resultado");
                    }
                },
                error: fnError
            });
        }