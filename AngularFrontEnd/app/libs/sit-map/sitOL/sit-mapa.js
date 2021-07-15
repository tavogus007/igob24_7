/* global SITUtil */
/* global ol */

function SITMap(opts){
    var o = opts || {};
    this.target = o.target || 'map';
    this.txt_coords = o.txt_coords || 'coords_txt';
    this.txt_scale = o.txt_scale || 'escala_txt';
    this.click_mode = o.click_mode ;//|| 'info'; // info or streetview
    this.vectorLayer = null;
    this.popup = o.popup || null;
    this.scheme = o.scheme || null;
    
    this.projection = SITUtil.grids.epsg32719esc.getProjection();
    this.resolutions = SITUtil.grids.epsg32719esc.getResolutions();
    this.tilegrids = SITUtil.grids.epsg32719esc.getTileWMTSGrid();
    this.matrixset = SITUtil.grids.epsg32719esc.matrixSet;

    this.mainBar = null;
}

SITMap.prototype.build = function(center, zoom, layers){
    var self = this,
        centro = center || [594019.091, 8175106.283],
        zm = zoom || 7,
        proj = this.projection,
        resols = this.resolutions,
        target = this.target,
        mousepos = this.createMousePositionControl(),
        lays = layers || [  ];

    var map = new ol.Map({
        target: target,
        layers: lays,
        controls: ol.control.defaults({
            attribution: false
        }).extend([mousepos, new ol.interaction.DragRotateAndZoom()]),

        view: new ol.View({
            projection: proj,
            center: centro, //593629.002,8175621.550
            zoom: zm, // || 12
            resolutions: resols
        })
    });
    
    var styleDefault = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })

    });

    // vector layer
    var vector = new ol.layer.Vector({
        allwaysOnTop: true,
        displayInLayerSwitcher: false,
        source: new ol.source.Vector()
        //style: styleDefault
    });
    map.addLayer(vector);
    
    this.vectorLayer = vector;
    
    if(this.popup) map.addOverlay(this.popup);
    
    map.getView().on('change:resolution', function(evt) {
        var resolution = evt.target.get('resolution');
        var scale = SITUtil.mapas.getScaleForResolution(resolution);  //  resolution * mpu * 39.37 * dpi;
        self.updateEscaleTxt(scale);
    });

    this.updateEscaleTxt(SITUtil.mapas.getScaleForResolution(map.getView().getResolution()));
    
    this.map = map;
    return map;
};


SITMap.prototype.createLayerSwitcher = function(){
    var layerSwitcher = SITMap.buildLayerSwitcher();
    this.map.addControl(layerSwitcher);
    return layerSwitcher;
    //if(openInLaySwitcher === true) layerSwitcher.show();
};

SITMap.prototype.createMousePositionControl = function(){
    var self = this;
    var mousePositionControl = new ol.control.MousePosition({
        //className: 'custom-mouse-position',
        target: document.getElementById(self.txt_coords),
        coordinateFormat: ol.coordinate.createStringXY(1),
        undefinedHTML: '&nbsp;'
    });
    return mousePositionControl;
};

SITMap.prototype.updateEscaleTxt = function(scale){
    if(!this.txt_scale) return;
    var s = SITUtil.mapas.formatScale(scale);
    document.getElementById(this.txt_scale).innerHTML = "Escala = 1 : " + s;
};

SITMap.prototype.showPopup = function(evt){
    var self = this;
    this.popup.hide();
    this.popup.setOffset([0, 0]);

    var displayedLayers = [], popup = this.popup;

    this.map.forEachLayerAtPixel(evt.pixel, function (layer) {
        displayedLayers.push(layer);
    }, {
        layerFilter: function (lyr) {
            return lyr.get("queryMode") == "wms";
            // return $.inArray(lyr.get('title'), layers_query) > -1;
        }
    });
       
    if (displayedLayers.length > 0) {
        $("#wmsinfo").empty();
        var container = $("<div></div>"),
            messaje = $("<div></div>").addClass("info-bar-message").append($("<span></span>").addClass("autil-espera"), $("<span></span>").text("Espere por favor")),
            closebox = $("<button></button>").addClass("closeBox hascloseBox").css({ display: 'inline', margin: '0px' }).click(function (e) { popup.hide() }),
            content = $("<div></div>").addClass('info-content');

        container.append(messaje, content);

        var vres = this.map.getView().getResolution(),
            coord = evt.coordinate,
            num_layers_qry = displayedLayers.length;

        this.popup.show(evt.coordinate, container[0]);

        $.each(displayedLayers, function (i, ly) {
            var url = ly.getSource().getGetFeatureInfoUrl(coord, vres, 'EPSG:32719', {
                "INFO_FORMAT": 'application/json', "FEATURE_COUNT": 10
            });
            if (url) {
                $.ajax({
                    url: url,
                    success: function (result) {
                        num_layers_qry--;
                        if (num_layers_qry <= 0) {
                            messaje.empty().append($("<span></span>").text("Completado."), closebox);
                        }
                        if (result && result.features) {
                            $.each(result.features, function (i, ft) {
                                var grd = self.scheme.grid.makePropGrid(ft, null, {skipStyle: true});
                                content.append(grd);
                            });
                        }

                    }
                });
            }
        });
    }
};

SITMap.prototype.createControlBar = function (opts) {
    // barra de herramientas
    var o = opts || {},
        self = this;
    
    var mainbar = new ol.control.Bar();
    this.map.addControl(mainbar);
    mainbar.setPosition( o.position || 'left-top');

    var barra2 = new ol.control.Bar ({ toggleOne: true, group:true });
    mainbar.addControl (barra2);
    var toggleInfo = new ol.control.Toggle({
        html: '<i class="glyphicon glyphicon-info-sign"></i>',
        title: "Ver informacion layer",
        interaction: new ol.interaction.Select(),
        active:false,
        onToggle: function(active){	
            if(active){
                self.click_mode = 'info';
                var src = self.vectorLayer.getSource();
                src.clear();
            } else {
                self.click_mode = null;
            }
        }
    });
    //barra2.addControl(toggleInfo);

    var toggleGSV = new ol.control.Toggle({
        html: '<img src="../images/google_sv.png" alt=""></img>', //<i class="glyphicon glyphicon-eye-open" ></i>',
        title: 'Google street view',
        interaction: new ol.interaction.Draw({	
            type: 'Point',
            source: self.vectorLayer.getSource()
        }),
        onToggle: function(active){
            if(active){
                self.click_mode = 'streetview';
            } else {
                self.click_mode = null;
                var src = self.vectorLayer.getSource();
                src.clear();
            }
        }
    });
    //barra2.addControl(toggleGSV);

    mainbar.addControl (new ol.control.ZoomToExtent({  extent: [ 596850,8163951 , 603610,8184461 ], tipLabel:'Zoom completo' }));
    //mainbar.addControl (new ol.control.Rotate());
    //mainbar.addControl (new ol.control.FullScreen({tipLabel:'Pantalla completa'}));
    
    if(!this.popup){
        this.popup = SITMap.buildPopup();
        this.map.addOverlay(this.popup);
    }
    
    if(!this.scheme){
        this.scheme = new SITScheme(this.map, this.popup, "http://192.168.5.68:8080/geoserver/uatg/wms?");
    }
    
    this.map.on('pointermove', function (evt) {
        if (evt.dragging) {
            return;
        }
        var pixel = self.map.getEventPixel(evt.originalEvent);
        var hit = self.map.forEachLayerAtPixel(pixel, function () {
            return true;
        }, { layerFilter: function (lyr) { return lyr.get("queryMode") === "wms"; } });
        self.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });

    this.map.on('singleclick', function (evt) {
        var self2 = this;
        switch(self.click_mode){
            case 'info':
                self.showPopup(evt); // self.scheme.showPopup(evt);
                break;
            case 'streetview':
                var u = SITMap.getUrlGoogleStretView(evt.coordinate);
                SITMap.openNewWindow(u);
                break;
            //case 'atmUbicacionLegal':
            //    console.log(evt);
            //    callback(evt.coordinate);
            //    //var u = SITMap.getUrlGoogleStretView(evt.coordinate);
            //    //SITMap.openNewWindow(u);
            //    break;
            default:
                console.log('Sin accion definida');
                break;
        }
    });

    this.mainBar = mainbar;
    return this;
};

SITMap.getUrlGoogleStretView = function (coord) {
    var ncoord = ol.proj.transform(coord, "EPSG:32719", "EPSG:4326");
    var url = "http://maps.google.com/?cbll=" + ncoord[1].toString() + "," + ncoord[0].toString() + "&cbp=12,0,0,0,5&layer=c"; // cbp=12,90,0,0,5
    return url;
};

SITMap.openNewWindow = function(url, target){
    var tgt = target || '_blank',
        win = window.open(url, tgt);
    if (win) {
        win.focus();
    } else {
        alert('No esta permitido popups en este sitio!');
    }
};

SITMap.buildLayerSwitcher = function(){
    var lyrctl = new ol.control.LayerSwitcher({
        show_progress:true,
        trash: false,
        oninfo: function(lyr){
            if(lyr instanceof ol.layer.Group) return;
            var self = this, ww = $(this.panel_).width(),
                ul = null;
            $('li', this.panel_).each(function(i,el){
                var ly = null;
                if(typeof self._getLayerForLI == 'function'){
                    ly = self._getLayerForLI(el);
                } else {
                    ly = $(el).data("layer");
                }
                if(ly && (ly === lyr)){
                    ul = el;
                }
            });
            if(!ul) return;
            var pnlinfo = $('ul.layer-info-x', ul);
            if(pnlinfo.length > 0){
                pnlinfo.remove();
                self.overflow();
                return;
            }

            var lyrinfo = $("<ul></ul>").addClass('layer-info-x').css({paddingLeft:'5px'}),
                desc = lyr.get("description"),
                ilegend = SITMap.getLegendImage(lyr, {LEGEND_OPTIONS:'bgColor:0xFAFAFA;forceLabels:on'}),
                li = $("<li></li>").appendTo(lyrinfo),
                cont = $("<div></div>").addClass('layer-info-x-panel').appendTo(li); //.css({width:(ww-30)});
                
            $("<a href='javascript:void(0)'> X </a>").css({position:'relative', float:'right'})
                .attr("title","Cerrar leyenda")
                .click(function(e){
                    $('ul.layer-info-x', ul).remove();
                    self.overflow();
                    e.stopPropagation();
                }).appendTo(cont);
            
            if(desc) cont.append( $("<div></div>").addClass('layer-info-x-desc').text(desc) );

            if(ilegend){
                $(ilegend).load(function(){ self.overflow(); });
                $("<div></div>").append(ilegend).appendTo(cont);
                $("<br></br>").appendTo(cont);
            }
            //$("<div></div>").text("Sistema de Información Territorial").css("font-size","0.8em").appendTo(cont);
            $(ul).append(lyrinfo);
            this.overflow();
        }
    });
    lyrctl.tip = {
        up: "arriba/abajo",
	down: "abajo",
	info: "información/leyenda",
	extent: "zoom extensión",
	trash: "quitar layer",
	plus: "expandir/contraer"
    };
    //lyrctl.setHeader("Capas!");
    return lyrctl;
};

SITMap.buildPopup = function(){
    var popup = new ol.Overlay.Popup ({
        popupClass: "default shadow", //"tooltips", "warning" "black" "default", "tips", "shadow",
        closeBox: false, // true
        //onshow: function(){ console.log("You opened the box"); },
        //onclose: function(){ console.log("You close the box"); },
        positioning: 'auto',
        autoPan: true,
        autoPanAnimation: { duration: 250 }
    });
    return popup;
};

SITMap.getLegendGraphic = function(lyr){
    var img = SITMap.getLegendImage(lyr);
    if(img){
        var div = $("<div></div>").css({'overflow':'auto', 'maxHeight':'300px'}).append(img);
        return div;
    }
    return null;
};

SITMap.getLegendImage = function(lyr, params){
    var o = params || {};
    if(typeof lyr["getSource"]=== 'function'){
        var src = lyr.getSource(),
            params = src["getParams"] ? src.getParams() : null,
            urls = src["getUrls"] ? src.getUrls(): src["getUrl"] ? [src.getUrl()] : null,
            url = null;
        if(params && urls){
            var lay = params["LAYERS"],
                sty = params["STYLES"],
                p = $.extend({REQUEST:'GetLegendGraphic', LAYER:lay, STYLE:sty}, params),
                u = urls[0];
            if(params["CQL_FILTER"]){ 
                p["CQL_FILTER"] = params["CQL_FILTER"]; 
            }
            url = u + $.param(p);
        } else if(urls) {
            var re = /gwc\/service\/wmts\?$/i,
                u = urls[0],
                m = u.match(re),
                lay = src["getLayer"] ? src.getLayer() : null;
            if(m && lay){
                var p = $.extend({REQUEST:'GetLegendGraphic', LAYER:lay, STYLE:null, FORMAT:'image/png', SERVICE:'WMS', VERSION:'1.1.1'}, o);
                url = u.replace(m, "wms?") + $.param(p);
            }
        }
        if(url){
            return  $("<img></img>").attr("src", url).attr("alt","").get(0);
        }
    }
    return null;
};
