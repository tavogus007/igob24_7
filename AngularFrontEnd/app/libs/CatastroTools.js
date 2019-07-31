// ========================
// by Nelson Huanquiri 2012
// GAMLP-OMPD-DIIM
// ========================

// Necesario libreria Proj4js
if (typeof Proj4js != 'undefined') {
    Proj4js.defs["EPSG:32719"] = "+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ";
    Proj4js.defs["EPSG:900913"] = "+title=GoogleMercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";
}

(function (obj) {
    var remplaza = /\+/gi;
    var query = window.location.search;
    query = unescape(query);
    query = query.replace(remplaza, " ");
    query = query.substring(1, query.length);
    obj.request = function (key) {
        var arr1 = query.split("&");
        var arr2 = [];
        for (var i = 0; i < arr1.length; i++) {
            arr2 = arr1[i].split("=");
            if (arr2[0].toUpperCase() == key.toUpperCase()) {
                return arr2[1];
            }
        }
        return null;
    }
})(window);

// argumentos validos texto, 2 o 3 numeros separados por guiones
function CodigoCatastral() {
    this.distrito = 0;
    this.manzana = 0;
    this.predio = 0;
    this.subpredio = 0;
    this.modo = null;

    if (arguments.length === 1 && typeof arguments[0] === 'string') {
        var s = arguments[0],
            m;
        // manzana
        m = s.match(/^\s*(\d{1,3})\s*-\s*(\d{1,4})\s*$/);
        if (m && m.length > 0) {
            this.distrito = Number(m[1]);
            this.manzana = Number(m[2]);
            this.modo = "manzana";
        }

        //codigo catastral predio
        m = s.match(/^\s*(\d{1,3})\s*-\s*(\d{1,4})\s*-\s*(\d{1,4})\s*$/);
        if (m && m.length > 0) {
            this.distrito = Number(m[1]);
            this.manzana = Number(m[2]);
            this.predio = Number(m[3]);
            this.modo = "predio";
        }

        //codigo subpredio
        m = s.match(/^\s*(\d{1,3})\s*-\s*(\d{1,4})\s*-\s*(\d{1,4})\s*-\s*(\d{1,4})\s*$/);
        if (m && m.length > 0) {
            this.distrito = Number(m[1]);
            this.manzana = Number(m[2]);
            this.predio = Number(m[3]);
            this.subpredio = Number(m[4]);
            this.modo = "subpredio";
        }

        //codigo sifca
        m = s.match(/^\s*(\d{15})\s*$/);
        if (m && m.length > 0) {
            var cs = m[1];
            this.distrito = Number(cs.substr(0, 3));
            this.manzana = Number(cs.substr(3, 4));
            this.predio = Number(cs.substr(7, 4));
            this.subpredio = Number(cs.substr(11, 4));
            this.modo = "sifca";
        }
    }

    if (arguments.length === 2) {
        this.distrito = arguments[0];
        this.manzana = arguments[1];
    }

    if (arguments.length === 3) {
        this.distrito = arguments[0];
        this.manzana = arguments[1];
        this.predio = arguments[2];
    }

    if (arguments.length === 4) {
        this.distrito = arguments[0];
        this.manzana = arguments[1];
        this.predio = arguments[2];
        this.subpredio = arguments[3];
    }
}

jQuery.extend(CodigoCatastral.prototype, {
    toString: function () {
        var sep = (arguments.length > 0) ? String(arguments[0]) : "";
        if (sep.length > 0) {
            return [this.distrito, this.manzana, this.predio, this.subpredio].join(sep);
        } else {
            return this.fillCeros(this.distrito, 3) + this.fillCeros(this.manzana, 4)
                + this.fillCeros(this.predio, 4) + this.fillCeros(this.subpredio, 4);
        }
    }

    , toPredioString: function () {
        var sep = (arguments.length > 0) ? String(arguments[0]) : "";
        if (sep.length > 0) {
            return [this.distrito, this.manzana, this.predio].join(sep);
        } else {
            return this.fillCeros(this.distrito, 3) + this.fillCeros(this.manzana, 4)
                + this.fillCeros(this.predio, 4);
        }
    }

    , toManzanaString: function () {
        var sep = (arguments.length > 0) ? String(arguments[0]) : "";
        if (sep.length > 0) {
            return [this.distrito, this.manzana].join(sep);
        } else {
            return this.fillCeros(this.distrito, 3) + this.fillCeros(this.manzana, 4);
        }
    }

    , fillCeros: function (n, lenght) {
        var s = String(n);
        while (s.length < lenght) {
            s = "0" + s;
        }
        return s;
    }

    , toArrayString: function () {
        return [this.fillCeros(this.distrito, 3), this.fillCeros(this.manzana, 4),
            this.fillCeros(this.predio, 4), this.fillCeros(this.subpredio, 4)];
    }
});

//function getFeatureInfo(e, layer) {
//    if (layer.visibility == true && layer.calculateInRange() == true) {
//        var url = layer.getFullRequestString({
//            REQUEST: "GetFeatureInfo",
//            EXCEPTIONS: "application/vnd.ogc.se_xml",
//            BBOX: layer.map.getExtent().toBBOX(),
//            X: Math.round(e.xy.x),
//            Y: Math.round(e.xy.y), // necesario para algunas versiones de firefox.
//            INFO_FORMAT: 'text/html', //'application/vnd.ogc.gml'
//            QUERY_LAYERS: layer.params.LAYERS,
//            WIDTH: layer.map.size.w,
//            HEIGHT: layer.map.size.h
//        });
//        featureinfo = window.open(url, "GetFeatureInfo", "dependent=yes, height=200, width=800, left=200, top=400");
//        featureinfo.focus();
//        OpenLayers.Event.stop(e);
//    }
//}

//function showLegendGrafic() {
//    for (i = 0; i < layers.length; i++) {
//        var layerformobject = document.getElementById("aktivlayer" + i);
//        if (document.getElementById("input_" + layers[i].name).checked == true) {
//            layerformobject.value = layers[i].getFullRequestString({
//                REQUEST: "GetLegendGraphic",
//                EXCEPTIONS: "application/vnd.ogc.se_xml"
//            });
//        }
//        else {
//            layerformobject.value = "";
//        }
//    }
//    legendgraphic = window.open("about:blank", "Legendenfenster", "width=390,height=570,toolbar=no,resizable,status=yes, scrollbars=yes");
//    var formlayerstatus = document.getElementById("layerstatus");
//    formlayerstatus.submit();
//    legendgraphic.focus();
//}

// ClickInfo control
// by Nelson Huanquiri 2012.
OpenLayers.Control.ClickInfo = OpenLayers.Class(OpenLayers.Control, {
    PNL_POPUP: null,
    CAPAS_WMS: null,
    lonlat: null,
    fnHandler: null,
    vlayer: null,
    fnMessage: null,
    urlBase: 'http://192.168.5.84:8080/geoserver/wms?',
    alwaysPopup: false,
    mapStyle: {
        fill: false,
        stroke: true,
        strokeColor: '#FF00FF',
        strokeWidth: 2,
        strokeDashstyle: 'dash',
        fontFamily: 'arial, helvetica, sans-serif',
        fontColor: 'cyan',
        fontWeight: 'bold',
        fontSize: '10px'
    },
    type: OpenLayers.Control.TYPE_TOGGLE,
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 2,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function (options) {
        this.CAPAS_WMS = new Array();
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions);

        OpenLayers.Control.prototype.initialize.apply(
            this, arguments);

        this.handler = new OpenLayers.Handler.Click(
            this, {
                'click': this.trigger
            }, this.handlerOptions);
    },

    destroy: function () {
        this.resetPopup();
        OpenLayers.Control.prototype.destroy.apply(this, arguments)
    },

    setMap: function (a) {
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
        this._initVLayer();
    },

    trigger: function (e) {

        this.resetPopup();
        if (this.vlayer) this.vlayer.removeAllFeatures();

        var lonlat = this.map.getLonLatFromPixel(e.xy);
        this.lonlat = lonlat.clone();

        var capas_activas = this.getActiveLayers();

        if (capas_activas.length == 0) return;
        if (capas_activas.length == 1 && !this.alwaysPopup) {
            var lyr = capas_activas[0];
            this._getDataLayer(lyr, lonlat);
            return;
        } else {
            var div = this._makeHtmlDiv(capas_activas);
            this.PNL_POPUP = new OpenLayers.Popup.FramedCloud("popup", lonlat, null, "<div>Ver datos de:</div>", null, true);
            // this.PNL_POPUP = new OpenLayers.Popup("chicken", this.map.getLonLatFromPixel(e.xy), new OpenLayers.Size(200, 200), msg, true);
            // this.PNL_POPUP = new OpenLayers.Popup.AnchoredBubble("mipopup", this.map.getLonLatFromPixel(e.xy), new OpenLayers.Size(120, 100), "<p>Ver datos de:</p>", null, true );
            // this.PNL_POPUP.setBackgroundColor('#FFFFBB');
            this.map.addPopup(this.PNL_POPUP);
            this.PNL_POPUP.contentDiv.appendChild(div);
            this.PNL_POPUP.setSize(new OpenLayers.Size(140, 100));
        }
    },

    resetPopup: function () {
        if (this.PNL_POPUP != null) {
            this.map.removePopup(this.PNL_POPUP);
            this.PNL_POPUP.destroy();
            this.PNL_POPUP = null;
        }
    },

    addLayers: function (capas) {
        for (var i = 0; i < capas.length; i++) {
            this.CAPAS_WMS.push(capas[i]);
        }
    },

    addLayerDefault: function () {
        var thisObj = this;
        var dlayer = {
            url: thisObj.urlBase,
            name: 'Datos Generales',
            params: {
                FORMAT: 'image/png',
                LAYERS: 'distritos,zonas,otbs',
                REQUEST: 'GetFeatureInfo',
                SERVICE: 'WMS',
                STYLES: null,
                TRANSPARENT: true,
                VERSION: '1.1.1'
            }
        };
        this.CAPAS_WMS.push(dlayer);
    },

    activate: function () {
        if (!this.active) {
            // funciones adicionales para activar
        }
        return OpenLayers.Control.prototype.activate.apply(
            this, arguments
        );
    },

    deactivate: function () {
        if (this.active) {
            // acciones adicionales
            this.resetPopup();
            if (this.vlayer) this.vlayer.removeAllFeatures();
        }
        return OpenLayers.Control.prototype.deactivate.apply(
            this, arguments
        );
    },

    removeFeatures: function () {
        if (this.vlayer) this.vlayer.removeAllFeatures();
    },

    _showInfoWMS: function (e) {
        var lonlat = this.popup.lonlat;
        var lyr = this.layer;
        this.popup._getDataLayer(lyr, lonlat);
        OpenLayers.Event.stop(e)
    },

    _getDataLayer: function (lyr, lonlat) {

        var thisObj = this;
        var pxloc = this.map.getPixelFromLonLat(lonlat);
        var obj = OpenLayers.Util.extend({}, lyr.params);
        OpenLayers.Util.extend(obj, {
            REQUEST: "GetFeatureInfo",
            EXCEPTIONS: "application/vnd.ogc.se_xml",
            INFO_FORMAT: 'application/vnd.ogc.gml',
            FEATURE_COUNT: 10,
            QUERY_LAYERS: lyr.params.LAYERS,
            BBOX: this.map.getExtent().toBBOX(),
            X: Math.round(pxloc.x),
            Y: Math.round(pxloc.y),
            WIDTH: this.map.size.w,
            HEIGHT: this.map.size.h
        });
        if (typeof lyr._infoParams != 'undefined') OpenLayers.Util.extend(obj, lyr._infoParams);

        var o = OpenLayers.Util.extend({}, obj);
        delete o.INFO_FORMAT;
        delete o.EXCEPTIONS;
        delete o.FORMAT;
        delete o.TRANSPARENT;
        var url = OpenLayers.Util.urlAppend(lyr.url, OpenLayers.Util.getParameterString(o));

        var formato = obj.INFO_FORMAT;
        this._showMsg("Consultando la base de datos...");
        var data = { estado: 0, layer: lyr, features: null, lonlat: lonlat, url: url, formato: formato, target: thisObj };
        if (typeof this.fnHandler == 'function') this.fnHandler(data);

        var _fn = function (response) {
            data.estado = 1;
            data.response = response;
            if (formato == "application/vnd.ogc.gml") {
                var fmtgml2 = new OpenLayers.Format.GML();
                var features = fmtgml2.read(response.responseText);
                if (features.length > 0) {
                    thisObj._initVLayer();
                    thisObj.vlayer.addFeatures(features);
                    thisObj._showMsg(features.length + " elementos encontrados.");
                } else {
                    thisObj._showMsg("No se encontraron elementos.");
                }
                data.features = features;
            }

            // if (typeof this.fnHandler == 'function') this.fnHandler(data);
            if (typeof data.layer._fnCallback == 'function') {
                data.layer._fnCallback.apply(null, [data]);
            } else if (typeof this.fnHandler == 'function') {
                this.fnHandler.apply(null, [data]);
            } else {
                thisObj.showResults(data);
            }

        }
        var _fne = function (response) {
            thisObj._showMsg("Ocurio un error de conexion.");
            data.estado = -1;
            data.reponse = response;
            if (typeof this.fnHandler == 'function') {
                this.fnHandler(data);
            } else {
                var winpopup = window.open(url, "GetFeatureInfo", "dependent=yes, height=400, width=800");
                if (winpopup.focus) winpopup.focus();
            }
        }
        
        OpenLayers.Request.GET({
            url: OpenLayers.Util.urlAppend(lyr.url + OpenLayers.Util.getParameterString(obj)) //  lyr.url + $.param(obj) // url
            // , params: obj
            , success: _fn
            , failure: _fne
            , scope: thisObj
        });

    },

    showResults: function (data) {
        var div2 = document.createElement("div");
        div2.style.fontSize = "8pt";
        if (data.formato == "application/vnd.ogc.gml") {
            div2.innerHTML = "";
            var features = data.features || [];
            var cols = data.layer._showFields;
            if (features.length > 0) {
                div2.appendChild(document.createTextNode("Datos encontrados encontrados " + features.length + " en la capa '" + data.layer.name + "'."));
                div2.appendChild(document.createElement("hr"));
                for (var i = 0; i < features.length; i++) {
                    var f = features[i];
                    
                    var tbl = document.createElement("table"), td, tr;
                    OpenLayers.Element.addClass(tbl, "cutil_tabla_info");
                    div2.appendChild(tbl);
                    if (cols) {
                        for (var c in cols) {
                            var desc = a = cols[c], val = f.attributes[c];
                            val = (typeof val == 'undefined') ? " " : val;

                            tr = document.createElement("tr");

                            td = document.createElement("td");
                            OpenLayers.Element.addClass(td, "cutil_col_campo");
                            td.appendChild(document.createTextNode(desc));
                            tr.appendChild(td);

                            td = document.createElement("td");
                            OpenLayers.Element.addClass(td, "cutil_row_info");
                            td.appendChild(document.createTextNode(val));
                            tr.appendChild(td);

                            tbl.appendChild(tr);
                        }
                    } else {
                        for (var a in f.attributes) {
                            tr = document.createElement("tr");

                            td = document.createElement("td");
                            td.appendChild(document.createTextNode(a));
                            OpenLayers.Element.addClass("cutil_col_campo");
                            tr.appendChild(td);

                            td = document.createElement("td");
                            td.appendChild(document.createTextNode(f.attributes[a]));
                            OpenLayers.Element.addClass("cutil_row_info");
                            td.appendChild(td);

                            tbl.appendChild(tr);
                        }
                    }
                    div2.appendChild(document.createElement("br"));
                }
            } else {
                div2.appendChild(document.createTextNode("No se encontraron datos en la capa '" + data.layer.name + "'."));
            }
        } else if (data.formato == "text/html" || data.formato == "text/plain") {
            div2.innerHTML = response.responseText;
        } else {
            div2.innerText = response.responseText;
        }
        var popup2 = new OpenLayers.Popup.FramedCloud("popup", data.lonlat, null, "<div>Informacion</div>", null, true);
        this.map.addPopup(popup2);
        popup2.contentDiv.appendChild(div2);
        popup2.setSize(new OpenLayers.Size(400, 230));
    },

    getActiveLayers: function () {
        var capas = new Array();
        for (var i = 0; i < this.CAPAS_WMS.length; i++) {
            var lyr = this.CAPAS_WMS[i];
            if (lyr == this.map.baseLayer) {
                capas.push(this.map.baseLayer);
            } else if (lyr.visibility == true && lyr.inRange == true) {
                capas.push(lyr);
            }
        }
        return capas;
    },

    _makeHtmlDiv: function (capas) {
        var thisObj = this;
        var d = document.createElement("div");
        d.style.fontSize = "8pt";

        for (var i = 0; i < capas.length; i++) {
            var lyr = capas[i];
            var data = { layer: lyr, popup: thisObj };

            var l = document.createElement("li");
            var a = document.createElement("a");
            a.setAttribute('href', 'javascript:void(0)');
            a.appendChild(document.createTextNode(lyr.name));
            l.appendChild(a);
            d.appendChild(l);
            OpenLayers.Event.observe(a, "click", OpenLayers.Function.bindAsEventListener(this._showInfoWMS, data));
        }
        return d;
    },

    _showMsg: function (s) {
        if (typeof this.fnMessage == 'function') this.fnMessage(s);
    },

    _initVLayer: function () {
        if (this.vlayer) {
            this.vlayer.removeAllFeatures();
            return;
        }
        var style2 = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
        OpenLayers.Util.extend(style2, this.mapStyle);

        var stymap = new OpenLayers.Style(style2);
        var tmpname = "ClickInfo." + (new Date()).getTime().toString();
        this.vlayer = new OpenLayers.Layer.Vector(tmpname,
        {
            styleMap: new OpenLayers.StyleMap(style2),
            displayInLayerSwitcher: false
        });

        this.map.addLayer(this.vlayer);
    },

    CLASS_NAME: "OpenLayers.Control.ClickInfo"

});

// ==================================
// Objeto busquedas, en base a url estaticas
// **

OpenLayers.Control.Busquedas = OpenLayers.Class(OpenLayers.Control, {
    fnMessage: null,
    fnHandler: null,
    vlayer: null,
    idProgress: null,
    _nodeProgress: null,
    _timestamp: null,
    _multi: false,
    mapStyle: {
        fill: false,
        stroke: true,
        strokeColor: '#00FFFF',
        strokeWidth: 2,
        strokeDashstyle: 'dash',
        fontFamily: 'arial, helvetica, sans-serif',
        fontColor: 'cyan',
        fontWeight: 'bold',
        fontSize: '10px'
    },
    wfsbase: {
        url: null,
        version: "1.1.0",
        featureType: null,
        featureNS: null,
        geometryName: "geom"
    },
    wfsparams: {
        cql_filter: null,
        propertyName: null,
        typeName: null,
        outputFormat: 'GML2', //'JSON' //
        maxFeatures: 50,
        request: 'GetFeature',
        version: '1.1.0'
    },

    div: null,

    templates: [
        {
            keys: ['avenida', 'calle', 'pasaje', 'callejon'],
            re: /^(calle|avenida|pasaje|callejon)\s+/i,
            fnBuild: function (s, m) {
                var tipo = m[1].toLowerCase();
                var idtipovia = ({ 'avenida': 1, 'calle': 2, 'pasaje': 7, 'callejon': 5 })[tipo];
                var nombre = s.substr(m[1].length + 1, s.length);
                var obj = {
                    options: {
                        url: CUtil.Capas.GEOSERVER + "catastro/wfs?",
                        featureType: "vias",
                        geometryName: "geom"
                    },
                    params: {
                        cql_filter: "idtipovia = " + idtipovia + " AND nombrevia LIKE '%" + CUtil._cleanText(nombre) + "%'",
                        propertyName: 'idtipovia,nombrevia,geom',
                        typeName: 'vias'
                    }
                };
                return obj;
            }
        },
        {
            keys: ['zona', 'barrio'],
            re: /^(zona|barrio)\s+/i,
            fnBuild: function (s, m) {
                var nombre = s.substr(m[1].length + 1, s.length);
                var obj = {
                    options: {
                        url: CUtil.Capas.GEOSERVER + "catastro/wfs?",
                        featureType: 'zonas',
                        geometryName: 'Shape'
                    },
                    params: {
                        cql_filter: "GDBSNOMB LIKE '%" + CUtil._cleanText(nombre) + "%'",
                        propertyName: 'GDBSNOMB,Shape',
                        typeName: 'zonas',
                        maxFeatures: 20
                    }
                };
                return obj;
            }
        },
        {
            keys: ['otb'],
            re: /^(otb)\s+/i,
            fnBuild: function (s, m) {
                var nombre = s.substr(m[1].length + 1, s.length);
                var obj = {
                    options: {
                        url: CUtil.Capas.GEOSERVER + "catastro/wfs?",
                        featureType: 'otbs',
                        geometryName: 'Shape'
                    },
                    params: {
                        propertyName: "GDBSNOMB,Shape",
                        cql_filter: "GDBSNOMB LIKE '%" + CUtil._cleanText(nombre) + "%'",
                        typeName: "otbs"
                    }
                };
                return obj;
            }
        },
        {
            keys: ['lote'],
            re: /^(\d{1,3})\s*-\s*(\d{1,4})\s*-\s*(\d{1,4})$/,
            fnBuild: function (s, m) {
                var d = parseFloat(m[1]), mz = parseFloat(m[2]), p = parseFloat(m[3]);
                var obj = {
                    options: {
                        url: CUtil.Capas.GEOSERVER + "catastro/wfs?",
                        featureType: "lotes2,lotes",
                        geometryName: "Shape,geom"
                    },
                    params: {
                        cql_filter: "DISTCAT = " + d + " AND MANZANA = " + mz + " AND NRO_LOTE = " + p + "; distritocatastral = " + d + " AND manzana = " + mz + " AND predio=" + p + ""
                    }
                };
                return obj;
            }
        },
        {
            keys: ['manzana'],
            re: /^(\d{1,3})\s*-\s*(\d{1,4})$/,
            fnBuild: function (s, m) {
                var d = parseFloat(m[1]), mz = parseFloat(m[2]);
                var obj = {
                    options: {
                        url: CUtil.Capas.GEOSERVER + "catastro/wfs?",
                        featureType: "manzanas2,manzanas",
                        geometryName: "SHAPE,geom"
                    },
                    params: {
                        cql_filter: "DISTCAT = " + d + " AND MANZANA = " + mz + ";  distritocatastral = " + d + " AND manzana = " + mz
                    }
                };
                return obj;
            }
        },
        {
            keys: ['sifca'],
            re: /^(\d{15})$/,
            fnBuild: function (s, m) {
                var obj = {
                    options: {
                        url: CUtil.Capas.GEOSERVER + "catastro/wfs?",
                        featureType: "lotes2,lotes",
                        geometryName: "Shape,geom"
                    },
                    params: {
                        cql_filter: "COD_SIFCA = '" + m[1] + "'; codigocatastral = '" + m[1] + "'"
                    }
                };
                return obj;
            }
        },
        {
            keys: ['planimetria', 'pia'],
            re: /^(pl|planimetria|pia)\s+/i,
            fnBuild: function (s, m) {
                var nombre = s.substr(m[1].length + 1, s.length);
                var obj = {
                    options: {
                        url: CUtil.Capas.GEOSERVER + "archivo/wfs?",
                        featureType: "planimetrias",
                        geometryName: "geom"
                    },
                    params: {
                        cql_filter: "descPlanimetria LIKE '%" + CUtil._cleanText(nombre) + "%'",
                        maxFeatures: 10
                    }
                };
                return obj;
            }
        },
        {
            keys: ['plaza', 'parque', 'cancha'],
            re: /^(plaza|parque|cancha)\s+/i,
            fnBuild: function (s, m) {
                var tipo = m[1].toUpperCase();
                var nombre = s.substr(m[1].length + 1, s.length);
                return {
                    options: {
                        url: CUtil.Capas.GEOSERVER + "lapaz/wfs?",
                        featureType: "espaciospublicos",
                        geometryName: "Shape"
                    },
                    params: {
                        cql_filter: "STIPO = '" + tipo + "' AND NOMBRE LIKE '%" + CUtil._cleanText(nombre) + "%'"
                    }
                };
            }
        },
        {
            keys: ['default'],
            re: null,
            fnBuild: function (s) {
                var nombre = CUtil._cleanText(s);
                var obj = {
                    options: {
                        url: CUtil.Capas.GEOSERVER + "lapaz/wfs?",
                        featureType: "lugares,vialidad",
                        geometryName: "Shape,Shape"
                    },
                    params: {
                        cql_filter: "GDBSNOMB LIKE '%" + nombre + "%'; GDBSNOVI LIKE '%" + nombre + "%'"
                    }
                };
                return obj;
            }
        }
    ],

    initialize: function (options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        if (this.idProgress) {
            this._nodeProgress = OpenLayers.Util.getElement(this.idProgress) || null;
            $(this._nodeProgress).hide();
        }
        this._initControls();
    },

    _initControls: function () {
        if (this.div) {
            var self = this;
            this.div = OpenLayers.Util.getElement(this.div);
            var txt = $("<input type='text'></input>").css({ width: 200 }).keypress(function (e) {
                if (e.which == 13) {
                    self.buscar($(this).val());
                    e.preventDefault();
                }
            }).appendTo(this.div);

            var btn_buscar = $("<button></button>").text("Buscar").click(function (e) {
                self.buscar(txt.val());
                e.preventDefault();
            }).appendTo(this.div);

            var btn_limpiar = $("<button></button>").text("Limpiar").click(function (e) {
                self.limpiar();
                txt.val("");
                e.preventDefault();
            }).appendTo(this.div);

            var icon_wait = $("<div></div>").addClass("loaderSmallIcon").appendTo(this.div).hide();
            this._nodeProgress = icon_wait[0];
        }
    },

    buscar: function (s) {
        s = $.trim(s);
        var hecho = false, thisObj = this;
        if (s.length == 0) return false;
        this._showMsg("Buscando " + s);
        $(this._nodeProgress).show();
        for (var i = 0; i < this.templates.length; i++) {
            var tmp = this.templates[i];
            if (tmp.re == null) { // por defecto
                var d = tmp.fnBuild(s);
                this._multi = false;
                this.getData(d.options, d.params);
                hecho = true;
                break;
            }
            var m = s.match(tmp.re);
            if (m && m.length > 0) {
                var data = tmp.fnBuild(s, m);
                this._timestamp = (new Date()).getTime(); // Date.now();
                if ($.isArray(data)) {
                    this._multi = true;
                    $.each(data, function (i, v) {
                        thisObj.getData(v.options, v.params);
                    });
                } else {
                    this._multi = false;
                    this.getData(data.options, data.params);
                }
                hecho = true;
                break;
            }
        }
        if (hecho == false) {
            this._showMsg("Expresion no valida!");
            $(this._nodeProgress).hide();
        }
        return hecho;
    },

    getTemplateByKey: function (key) {
        for (var i = 0; i < this.templates.length; i++) {
            var obj = this.templates[0];
            if ($.inArray(key, obj.keys) != -1) return obj;
        }
        return null;
    },

    getData: function (data, params) {
        var thisObj = this;
        var op = $.extend({}, this.wfsbase, data);
        var par = $.extend({}, this.wfsparams, params);
        if (!par.typeName) par.typeName = op.featureType;
        var wfs = new OpenLayers.Protocol.WFS(op);
        wfs.read({
            callback: this.didFetchWfsFeatures,
            scope: this,
            params: par
        });
    },

    limpiar: function () {
        if (this.vlayer) this.vlayer.removeAllFeatures();
    },

    reset: function () {
        if (this.vlayer) {
            this.vlayer.removeAllFeatures();
            this.map.removeLayer(this.vlayer);
            this.vlayer = null;
        }
    },

    _showMsg: function (s) {
        if (typeof this.fnMessage == 'function') this.fnMessage(s);
    },

    _initVLayer: function () {
        if (this.vlayer) {
            this.vlayer.removeAllFeatures();
            return;
        }
        var style2 = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
        OpenLayers.Util.extend(style2, this.mapStyle);

        var stymap = new OpenLayers.Style(style2);
        this.vlayer = new OpenLayers.Layer.Vector("Busquedas",
        {
            styleMap: new OpenLayers.StyleMap(style2),
            displayInLayerSwitcher: false
        });

        this.map.addLayer(this.vlayer);
    },

    didFetchWfsFeatures: function (response, options) {
        console.log("-->", response);
        this._showMsg("terminando consulta...");
        if (response.code == 0) {
            this._showMsg("Error:" + response.priv.responseText);
            return;
        }
        try {
            //var fmt_geojson = new OpenLayers.Format.GeoJSON();
            var fmt_gml = new OpenLayers.Format.GML.v2();
            this._initVLayer();
            //var features = fmt_geojson.read(response.priv.responseText);
            var features = fmt_gml.read(response.priv.responseText);
            if (features && features.length > 0) {
                this._showMsg(features.length + " elementos encontrados.");
                this.vlayer.addFeatures(features);
                var dext = this.vlayer.getDataExtent();
                this.map.zoomToExtent(dext);
            } else {
                this._showMsg("No se encontraron elementos.");
            }
        } catch (e) {
            this._showMsg("Error: " + e.Message );
        }
        if (this._nodeProgress) $(this._nodeProgress).hide();
    },

    CLASS_NAME: "OpenLayers.Control.Busquedas"
});


// showWMSInfo, necesario que exita el <div id="results"></div>
// el layer debe tener definido campo _showFields = {"col1","Columna uno"} con los alias
var CUtil = new Object();

CUtil.log = function (s) {
    try {
        if (typeof console == 'object' && console.log) {
            console.log(s);
        } else if (typeof Sys == 'object' && Sys.Debug.trace) {
            Sys.Debug.trace(s);
        } else {
            setTimeout(function () {
                throw new Error(s, "");
            }, 1);
        }
    } catch (e) {
        
    }
};

CUtil.getUrlParameter = function(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
    return null;
};

CUtil._cleanText = function (s) {
    var tmp = "";
    for (var i = 0; i < s.length; i++) {
        var ch = s.substring(i, i + 1);
        //var ch = s[i];
        tmp += (ch.charCodeAt(0) >= 192) ? "_" : ch;
    }
    return tmp;
};

CUtil.getCodigoCatastral = function (map, x, y, context, fn_ok, fn_error) {
    var obj = {
        REQUEST: "GetFeatureInfo",
        EXCEPTIONS: "application/vnd.ogc.se_xml",
        INFO_FORMAT: 'application/vnd.ogc.gml',
        FEATURE_COUNT: 1,
        LAYERS: 'lotes,lotes2',
        QUERY_LAYERS: 'lotes,lotes2',
        BBOX: map.getExtent().toBBOX(),
        X: Math.round(x),
        Y: Math.round(y),
        WIDTH: map.size.w,
        HEIGHT: map.size.h
    };
    var url = CUtil.Capas.GEOSERVER + "catastro/wms?";
    // OpenLayers.loadURL(url, obj, context, fn_ok, fn_error);
    OpenLayers.Request.GET({
        url: url
        ,params: obj
        ,scope: context
        ,success: fn_ok
        ,failure: fn_error
    })
}

CUtil.getCodigoCatastralWFS = function (wkt, fnOk, fnError, context, keylote) {
    var url = CUtil.Capas.GEOSERVER + "catastro/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=10&outputFormat=application%2Fjson&";
    var k = keylote || "default";
    var parametroslote = {
        "lotes": { typeName: "catastro:lotes", cql_filter: "INTERSECTS(geom," + wkt + ")" },
        "lotes2": { typeName: "catastro:lotes2", cql_filter: "INTERSECTS(Shape," + wkt + ")" },
        "default": { typeName: "catastro:lotes,catastro:lotes2", cql_filter: "INTERSECTS(geom," + wkt + ");INTERSECTS(Shape," + wkt + ")" }
    }

    OpenLayers.Request.GET({
        url: url
        , params: parametroslote[k]
        , scope: context
        , success: fnOk
        , failure: fnError
    });
}

CUtil.getDistritoFromWFS = function (x, y, handler, context) {
    var url = CUtil.Capas.GEOSERVER + "lapaz/wfs?";
    var filter = "<Filter xmlns='http://www.opengis.net/ogc' xmlns:gml='http://www.opengis.net/gml'>" +
        "<Intersects>" +
        "<PropertyName>Shape</PropertyName>" +
        "<gml:Point srsName='EPSG:32719'><gml:coordinates>" + x + "," + y + "</gml:coordinates></gml:Point>" +
        "</Intersects>" +
        "</Filter>";
    var op = { url: url, version: "1.1.0", featureType: 'distritos_2012', featureNS: null, geometryName: "Shape" },
        par = { filter: filter, propertyName: 'DISTRITO,GDBSDISTM,Shape', typeName: 'distritos_2012', outputFormat: 'GML2',
            maxFeatures: 5, request: 'GetFeature', version: '1.1.0'
        };
    var fnx = (typeof handler == 'function') ? handler : function (a) {
        CUtil.log(a.message);
    };
    var cntx = context || window,
        stamp = Date.now();

    var wfs = new OpenLayers.Protocol.WFS(op);
    wfs.read({
        callback: function (response, options) {
            if (response.code == 0) {
                fnx.call(cntx, { code: response.code, message: "Error:" + response.priv.responseText, timeStamp: stamp });
            } else {
                var data = { cod: response.code, message: "", feature: null, distrito: null, macro: null, timeStamp: stamp };
                try {
                    var fmt_gml = new OpenLayers.Format.GML.v2();
                    var features = fmt_gml.read(response.priv.responseText);
                    if (features && features.length > 0) {
                        var f = features[0], d = f.attributes["DISTRITO"], m = f.attributes["GDBSDISTM"];
                        data.message = "Registros = " + features.length + ", distrito = " + d + ", macro = " + m;
                        data.features = features;
                        data.distrito = d;
                        data.macro = m;
                    } else {
                        data.message = "No se encontraron registros";
                    }
                } catch (e) {
                    data.message = "Error al convertir datos: " + e.Message;
                }
                fnx.call(cntx, data);
            }
        },
        params: par
    });
    return stamp;
}

CUtil.getDistrito2016FromWFS = function (x, y, handler, context) {
    var url = CUtil.Capas.GEOSERVER + "lapaz/wfs?";
    var filter = "<Filter xmlns='http://www.opengis.net/ogc' xmlns:gml='http://www.opengis.net/gml'>" +
        "<Intersects>" +
        "<PropertyName>wkb_geometry</PropertyName>" +
        "<gml:Point srsName='EPSG:32719'><gml:coordinates>" + x + "," + y + "</gml:coordinates></gml:Point>" +
        "</Intersects>" +
        "</Filter>";
    var op = { url: url, version: "1.1.0", featureType: 'distritos_2016', featureNS: null, geometryName: "wkb_geometry" },
        par = { filter: filter, propertyName: 'coddistrito,codmacro,wkb_geometry', typeName: 'distritos_2016', outputFormat: 'GML2',
            maxFeatures: 5, request: 'GetFeature', version: '1.1.0'
        };
    var fnx = (typeof handler == 'function') ? handler : function (a) {
        CUtil.log(a.message);
    };
    var cntx = context || window,
        stamp = Date.now();

    var wfs = new OpenLayers.Protocol.WFS(op);
    wfs.read({
        callback: function (response, options) {
            if (response.code == 0) {
                fnx.call(cntx, { code: response.code, message: "Error:" + response.priv.responseText, timeStamp: stamp });
            } else {
                var data = { cod: response.code, message: "", feature: null, distrito: null, macro: null, timeStamp: stamp };
                try {
                    var fmt_gml = new OpenLayers.Format.GML.v2();
                    var features = fmt_gml.read(response.priv.responseText);
                    if (features && features.length > 0) {
                        var f = features[0], d = f.attributes["coddistrito"], m = f.attributes["codmacro"];
                        data.message = "Registros = " + features.length + ", distrito = " + d + ", macro = " + m;
                        data.features = features;
                        data.distrito = d;
                        data.macro = m;
                    } else {
                        data.message = "No se encontraron registros";
                    }
                } catch (e) {
                    data.message = "Error al convertir datos: " + e.Message;
                }
                fnx.call(cntx, data);
            }
        },
        params: par
    });
    return stamp;
}

CUtil.getCatastroLote = function(codcat, handler, context){
    var url = CUtil.Capas.GEOSERVER + "catastro/ows?",
        cc = new CodigoCatastral(codcat),
        fnx = (typeof handler === 'function') ? handler : function (e) {
            CUtil.log(e);
        };
    var params = {service:"WFS", version:"1.0.0", typeName:"catastro:lotes"
        , request:"GetFeature", maxFeatures:10, outputFormat:"application/json"
        //, propertyName:"codigocatastral,distritocatastral,manzana,predio,estadopredio"
        , cql_filter:"codigocatastral = '" + cc.toString() + "'"
    };
    OpenLayers.Request.GET({
        url: url
        , params: params
        , success: function(e){
            var json = $.parseJSON(e.responseText);
            fnx.call(context,json);
        }
        , failure: function(e){console.log(e);}
    });
};

CUtil.getDistritoMunicipal = function (map, x, y, context, fn_ok, fn_error) {
    var obj = {
        REQUEST: "GetFeatureInfo",
        EXCEPTIONS: "application/vnd.ogc.se_xml",
        INFO_FORMAT: 'application/vnd.ogc.gml',
        FEATURE_COUNT: 1,
        LAYERS: 'distritos_2012',
        QUERY_LAYERS: 'distritos_2012',
        BBOX: map.getExtent().toBBOX(),
        X: Math.round(x),
        Y: Math.round(y),
        WIDTH: map.size.w,
        HEIGHT: map.size.h
    };
    var url = CUtil.Capas.GEOSERVER + "lapaz/wms?";
    //OpenLayers.loadURL(url, obj, context, fn_ok, fn_error);
    OpenLayers.Request.GET({
        url: url
        , params: obj
        , scope: context
        , success: fn_ok
        , failure: fn_error
    })
}

CUtil.getZonaValor = function(map, x, y, context, fn_ok, fn_error) {
    var obj = {
        REQUEST: "GetFeatureInfo",
        EXCEPTIONS: "application/vnd.ogc.se_xml",
        INFO_FORMAT: 'application/vnd.ogc.gml',
        FEATURE_COUNT: 1,
        LAYERS: 'zonas_valor_2011',
        QUERY_LAYERS: 'zonas_valor_2011',
        BBOX: map.getExtent().toBBOX(),
        X: Math.round(x),
        Y: Math.round(y),
        WIDTH: map.size.w,
        HEIGHT: map.size.h
    };
    var url = CUtil.Capas.GEOSERVER + "lapaz/wms?";
    //OpenLayers.loadURL(url, obj, context, fn_ok, fn_error);
    OpenLayers.Request.GET({
        url: url
        , params: obj
        , scope: context
        , success: fn_ok
        , failure: fn_error
    })
};

CUtil.showWMSInfo = function (datainfo) {
    $("#results").empty()
    var features = datainfo.features;
    var cols = datainfo.layer._showFields;
    if (features.length > 0) {
        $("#results").text("Datos encontrados " + features.length + " en la capa " + datainfo.layer.name + ".");
        $("#results").append($("<hr></hr>"));

        for (var i = 0; i < features.length; i++) {
            var f = features[i];
            var tbl = $("<table></table>").addClass("cutil_tabla_info").appendTo("#results");
            if (cols) {
                for (var c in cols) {
                    var desc = a = cols[c],
                        val = f.attributes[c];
                    val = (typeof val == 'undefined') ? " " : val;
                    $("<tr></tr>").append(
                        $("<td></td>").addClass("cutil_col_campo").text(desc), $("<td></td>").addClass("cutil_row_info").text(val)
                    ).appendTo(tbl);
                }
            } else {
                for (var a in f.attributes) {
                    $("<tr></tr>").append(
                        $("<td></td>").addClass("cutil_col_campo").text(a), $("<td></td>").addClass("cutil_row_info").text(f.attributes[a])
                    ).appendTo(tbl);
                }
            }
            $("#results").append($("<br></br>"));
        }
        $("#results").dialog("open");
    } else {
        $("#results").text("No se encontraron datos.");
    }
}

CUtil.URL_ARCHIVO = 'http://sitv2/SITv2/geoConsultas/ArchivoBusquedasDetalle2.aspx?'; //'http://sitv2/SITv2/geoConsultas/ArchivoBusquedasDetalleGeo.aspx?';
CUtil.URL_ARCHIVOCONSULTA = 'http://SITv2/SITv2/SITArchivo/ArchivoBusquedasConsulta.aspx?';// 'http://localhost:5623/SITArchivo/ArchivoBusquedasConsulta.aspx?';
CUtil.showWMSInfoArchivo = function (datainfo) {
    $("#results").empty();
    var features = datainfo.features;
    if (features.length > 0) {
        var codigos = [],
            atts = ["codigocatastral", "COD_SIFCA", "cod_sifca"];
        for (var i = 0; i < features.length; i++) {
            var f = features[i];
            for (var j = 0; j < atts.length; j++) {
                var a = atts[j];
                if (typeof f.attributes[a] != 'undefined' && $.inArray(f.attributes[a], codigos) == -1) {
                    codigos.push(f.attributes[a]);
                }
            }
        }

        var codusr = request("IdUsuario");
        var url = CUtil.URL_ARCHIVO + "IdUsuario=" + (codusr == null ? 0 : codusr) + "&codCatastro=";
        $("#results").text("Se encontraron " + codigos.length + " registro(s).").append("<br></br>");
        for (var j = 0; j < codigos.length; j++) {
            var s2 = codigos[j];
            var ccat = new CodigoCatastral(s2);
            $("<div></div>").append(
                    $("<ul></ul>").append(
                        $("<li></li>").append($("<a></a>").attr("href", "#panel_a_" + j).text("Datos archivo")),
                        $("<li></li>").append($("<a></a>").attr("href", "#panel_b_" + j).text("Fotos"))
                    ),
                    $("<div></div>").attr("id", "panel_a_" + j).append(
                        $("<iframe></iframe>").attr({ src: url + ccat.toArrayString().join('-'), width: '790px', height: '400px', frameborder: '0', style: 'border:1px solid #A0A0A0;' })
                    ),
                    $("<div></div>").attr("id", "panel_b_" + j).append(
                        $("<div></div>").css("height", "410px").append($("<img></img>").attr({ src: CUtil.URL_FOTO_SERCAT + 'codcat=' + codigos[j] }))
                    )
                ).tabs().appendTo("#results");
        }
        $("#results").dialog("open");


    } else {
        $("#results").text("No se encontraron elementos.");
    }
}

CUtil.URL_ARCHIVO_PLANIM = 'http://sitv2/SITv2/geoConsultas/ArchivoBusquedasDetallePlanimetriaGeom.aspx?';
CUtil.URL_FOTO_SERCAT = "http://sitv2/SITv2/geoconsultas/fotossercat.aspx?";
CUtil.showWMSInfoPlanimetrias = function (datainfo) {
    $("#results").empty();
    var features = datainfo.features;
    if (features.length > 0) {
        var codigos = [], a = "idCodPlanimetria";
        for (var i = 0; i < features.length; i++) {
            var f = features[i];
            if (typeof f.attributes[a] != 'undefined' && $.inArray(f.attributes[a], codigos) == -1) {
                codigos.push(f.attributes[a]);
            }
        }

        $("#results").text("Se encontraron " + codigos.length + " registro(s).")

        var tbl = $("<table></table>").attr({width:'100%'}).appendTo("#results");
        for (var j = 0; j < codigos.length; j++) {
            var s2 = codigos[j];
            var tr = $("<tr></tr>").appendTo(tbl);
            var qry = $.param({ idPlanimetria: s2, idusuario: request("idusuario") });
            $("<td></td>").append(
              $("<iframe></iframe>").attr({ src: CUtil.URL_ARCHIVO_PLANIM + qry, width: '100%', height: '500px', frameborder: '0', style: 'border:1px solid dimgray;' })
            ).appendTo(tr);
        }

        $("#results").dialog("open");

    } else {
        $("#results").text("No se encontraron elementos.");
    }
}
CUtil.URL_ARCHIVO_LEVANTA = 'http://sitv2/SITv2/geoConsultas/ArchivoBusquedaDetalleLevantamiento.aspx?';
//CUtil.URL_ARCHIVO_LEVANTA = '/geoConsultas/ArchivoBusquedaDetalleLevantamiento.aspx?';
CUtil.log("error");
CUtil.showWMSInfoLevantamientos = function (datainfo) {
    $("#results").empty();
    var features = datainfo.features;
    if (features.length > 0) {
        var codigos = [], a = "idtramite";
        for (var i = 0; i < features.length; i++) {
            var f = features[i];
            var nomLayerInd = features[i].fid.split('.');
            if (nomLayerInd[0] == "levtramitep") {
                    if (typeof nomLayerInd[1] != 'undefined' && $.inArray(nomLayerInd[1], codigos) == -1) {
                    codigos.push(nomLayerInd[1]);
                    CUtil.log("levtramitep: " + nomLayerInd[1]);
                } 
            } else {
                if (typeof f.attributes[a] != 'undefined' && $.inArray(f.attributes[a], codigos) == -1) {
                    codigos.push(f.attributes[a]);
                    CUtil.log("levpoligono: " + f.attributes[a]);
                }
            }
        }

        $("#results").text("Se encontró " + codigos.length + " registro(s).")

        var tbl = $("<table></table>").attr({ width: '100%' }).appendTo("#results");
        for (var j = 0; j < codigos.length; j++) {
            var s2 = codigos[j];
            var tr = $("<tr></tr>").appendTo(tbl);
            var qry = $.param({ idtramite: s2, idusuario: request("idusuario") });
            $("<td></td>").append(
                    $("<iframe></iframe>").attr({ src: CUtil.URL_ARCHIVO_LEVANTA + qry, width: '100%', height: '500px', frameborder: '0', style: 'border:1px solid dimgray;' })
            ).appendTo(tr);
        }

        $("#results").dialog("open");

    } else {
        $("#results").text("No se encontraron elementos.");
    }
}


// obtiene features a partir de un WFS
CUtil.getDataWFS = function (data, params, vlayer, fnMessage, zoom) {
    var wfsbase = { url: null, version: "1.1.0", featureType: null, featureNS: null, geometryName: "geom" },
                    wfsparams = { cql_filter: null, propertyName: null, typeName: null, outputFormat: 'GML2', maxFeatures: 50, request: 'GetFeature', version: '1.1.0' };
    var op = $.extend(wfsbase, data);
    var par = $.extend(wfsparams, params);
    if (!par.typeName) par.typeName = op.featureType;
    var wfs = new OpenLayers.Protocol.WFS(op);
    wfs.read({
        callback: function (response, options) {
            if (response.code == 0) {
                if (typeof fnMessage == 'function') fnMessage("Error:" + response.priv.responseText);
                return;
            }
            try {
                var fmt_gml = new OpenLayers.Format.GML.v2();
                var features = fmt_gml.read(response.priv.responseText);
                if (features && features.length > 0) {
                    vlayer.addFeatures(features);
                    var dext = vlayer.getDataExtent();
                    if (zoom) {
                        var map = vlayer.map;
                        if (map) map.zoomToExtent(dext);
                    }
                } else {
                    if (typeof fnMessage == 'function') fnMessage("No se encontraron elementos.");
                }
            } catch (e) {
                if (typeof fnMessage == 'function') fnMessage("Error: " + e.Message);
            }
        },
        params: par
    });
}

CUtil.Mapas = {
    getMap: function (id) {
        return new OpenLayers.Map(id, {
            projection: new OpenLayers.Projection("EPSG:32719"),
            units: "m",
            maxResolution: 1000.0,
            numZoomLevels: 14,
            maxExtent: new OpenLayers.Bounds(564605, 8155052, 653884, 8258623),
            controls: [
                new OpenLayers.Control.Navigation({
                    dragPanOptions: {
                        enableKinetic: true
                    }
                }),
                new OpenLayers.Control.PanZoomBar({ panIcons: false }),
                new OpenLayers.Control.Attribution()
            ]
        });
    },
    // openlayers con controles por defecto
    getMap2: function (id) {
        return new OpenLayers.Map(id, {
            projection: new OpenLayers.Projection("EPSG:32719"),
            units: "m",
            maxResolution: 1000.0,
            numZoomLevels: 14,
            maxExtent: new OpenLayers.Bounds(564605, 8155052, 653884, 8258623)
        });
    },
    getMap3: function (id, o) {
        var opts = {
            projection: new OpenLayers.Projection("EPSG:32719"),
            units: "m",
            maxResolution: 1000.0,
            numZoomLevels: 14,
            maxExtent: new OpenLayers.Bounds(564605, 8155052, 653884, 8258623),
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.PanZoomBar(),
                new OpenLayers.Control.Attribution()
            ]
        };
        if (o && typeof o == 'object') $.extend(opts, o);
        return new OpenLayers.Map(id, opts);
    },
    getMapGWC1: function (id, o) {
        var mapOptions = {
            //1399.9999999999998, 699.9999999999999, 280.0, 140.0, 70.0, 27.999999999999996, 13.999999999999998, 6.999999999999999, 2.8, 1.4, 0.7, 0.27999999999999997, 0.13999999999999999, 0.06999999999999999
            resolutions: [1399.9999999999998, 699.9999999999999, 280.0, 140.0, 70.0, 27.999999999999996, 13.999999999999998, 6.999999999999999, 2.8, 1.4, 0.7, 0.27999999999999997, 0.13999999999999999, 0.06999999999999999, 0.034999999999999996],
            projection: new OpenLayers.Projection('EPSG:32719'),
            //166021.44309607794,1116915.044047609,882821.4430960778,10076915.044047607
            maxExtent: new OpenLayers.Bounds(166021.44309607794, 1116915.044047609, 882821.4430960778, 10076915.044047607),
            units: "meters",
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.PanZoomBar(),
                new OpenLayers.Control.Attribution()
            ]
        };
        if (o && typeof o == 'object') $.extend(mapOptions, o);
        return new OpenLayers.Map(id, mapOptions);
    },
    getMapGWC2: function (id, o) {

        var mapOptions = {
            resolutions: [1399.9999999999998, 699.9999999999999, 280.0, 140.0, 70.0, 27.999999999999996, 13.999999999999998, 6.999999999999999, 2.8, 1.4, 0.7, 0.27999999999999997, 0.13999999999999999, 0.06999999999999999, 0.034999999999999996],
            projection: new OpenLayers.Projection('EPSG:32719'),
            maxExtent: new OpenLayers.Bounds(166021.44309607794, 1116915.044047609, 882821.4430960778, 10076915.044047607),
            units: "meters",
            controls: []
        };
        if (o && typeof o == 'object') $.extend(mapOptions, o);
        var map = new OpenLayers.Map(id, mapOptions);
        map.addControl(new OpenLayers.Control.PanZoomBar({
            position: new OpenLayers.Pixel(2, 15)
        }));
        return map;
    }
}

CUtil.Capas = {
    GEOSERVER: "http://192.168.5.84:8080/geoserver/",
    SITSERVICES: "http://nuclear/ArcGIS/services/",
    getMapaSIT: function (s) {
        var nombre = s || "Mapa SIT";
        return new OpenLayers.Layer.WMS(nombre, this.SITSERVICES + "Servicios_vista2/MapServer/WMSServer?",
        {
            layers: '0,1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,19,21,22,23,24,25,26,27',
            format: 'image/jpeg'
        },
        {
            singleTile: true,
            transitionEffect: "resize"
        });
    },

    getMapaSIT2: function (s) {
        var nombre = s || "Mapa Urbano";
        return new OpenLayers.Layer.WMS(nombre, this.SITSERVICES + "Servicios_Vista2a/MapServer/WMSServer?",
        {
            layers: '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,23,24',
            format: 'image/gif',
            version: '1.1.1'
        },
        {
            singleTile: true,
            transitionEffect: "resize"
        });
    },

    getMapaMunicipio: function (s, o) {
        var nombre = s || "Mapa Municipio";
        var parms = { singleTile: true, transitionEffect: "resize" };
        if (o) $.extend(parms, o);
        return new OpenLayers.Layer.WMS(nombre, this.SITSERVICES + "Municipio/MapServer/WMSServer?",
        {
            layers: '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16',
            format: 'image/gif',
            version: '1.1.1'
        },
        parms);
    },

    getOrtofotos: function (s) {
        var nombre = s || "Ortofotos SIT";
        return new OpenLayers.Layer.WMS(nombre, this.SITSERVICES + "Servicios_Orthos/MapServer/WMSServer?",
        {
            layers: '1,3,4', //0,1,2,3,4,5,6
            format: 'image/jpeg'
        },
        {
            singleTile: false,
            transitionEffect: "resize"
        });
    },


    getWMSLayer: function (desc, layer, opts, params) {
        var d = desc || "Capa WMS",
            o = { format: "image/png", styles: null },
            p = { transitionEffect: "resize" },
            u = this.GEOSERVER + "wms?";
        if (opts) $.extend(o, opts);
        if (layer) {
            var sl = layer.split(":");
            if (sl.lenght == 2) u = this.GEOSERVER + sl[0] + "/wms?";
        }
        if (params) $.extend(p, params);
        return new OpenLayers.Layer.WMS(d, u, o, p);
    },

    getOrtofotos2: function (s, o) {
        var nombre = s || "Ortofotos 2006",
            l = { layers: 'ortofotos2006', format: 'image/jpeg' },
            p = { singleTile: false, transitionEffect: "resize" };
        if (o) $.extend(p, o);
        return new OpenLayers.Layer.WMS(nombre, this.GEOSERVER + "lapaz/wms?", l, p);
    },

    getRestitucion: function (s, o) {
        var desc = s || "Restitucion 2006",
            p = { transitionEffect: "resize" };
        if (o) $.extend(p, o);
        return new OpenLayers.Layer.WMS(desc, this.GEOSERVER + "lapaz/wms?", {
            layers: 'rest2006_Merge', format: 'image/png', styles: 'ct_restitucion2'
        }, p);
    },

    getRestitucion2: function (s, o) {
        var desc = s || "Restitucion 2006";
        var parms = { transitionEffect: "resize" };
        if (o) $.extend(parms, o);
        return new OpenLayers.Layer.WMS(
            desc, this.GEOSERVER + "wms?",
            {
                layers: 'g_restitucion_2006',
                format: 'image/png'
            },
            parms);
    },

    getGoogle: function (s, o) {
        var desc = s || "Google 2009",
            p = { singleTile: false, transitionEffect: "resize" };
        if (o) $.extend(p, o);
        return new OpenLayers.Layer.WMS(desc, this.GEOSERVER + "lapaz/wms?", {
            layers: 'google2009', format: 'image/jpeg'}, p);
    },

    getWorldview: function (s, o) {
        var desc = s || "Worldview 2011",
            p = { singleTile: false, transitionEffect: 'resize' };
        if (o) $.extend(p, o);
        return new OpenLayers.Layer.WMS(desc, this.GEOSERVER + "lapaz/wms?", {
            layers: 'worldview_2011', format: 'image/jpeg'}, p);
    },

    getGeoEye2013: function (s, o) {
        var desc = s || "GeoEye 2013", p = { singleTile: false, transitionEffect: 'resize' };
        if (o) $.extend(p, o);
        return new OpenLayers.Layer.WMS(desc, this.GEOSERVER + "lapaz/wms?", {
            layers: 'geoeye_2013', format: 'image/jpeg'}, p);
    },
    
    getKompsat2018: function (s, o) {
        var desc = s || "Kompsat 2018"
            , p = { singleTile: false, transitionEffect: 'resize', description:"Imagen Satelital Kompsat-3 de 12 y 20 de abril de 2018"};
        if (o) $.extend(p, o);
        return new OpenLayers.Layer.WMS(desc, this.GEOSERVER + "raster/wms?", {
            layers: 'raster:kompsat_2018', format: 'image/jpeg'}, p);
    },

    getRegistroVial: function (s, o) {
        var desc = s || "Registro vial";
        var parms = { isBaseLayer: false, singleTile: true };
        if (o) $.extend(parms, o);
        return new OpenLayers.Layer.WMS(desc, CUtil.Capas.GEOSERVER + "lapaz/wms?",
        {
            layers: 'vialidad',
            format: 'image/png',
            styles: 'lp_nombre_via2',
            //exceptions: "application/vnd.ogc.se_inimage",
            transparent: true
        }, parms);
    },

    getMapaRiesgos: function (s, o) {
        var desc = s || "Mapa Riesgos 2011";
        var parms = { ratio: 1 };
        if (o) $.extend(parms, o);
        return new OpenLayers.Layer.WMS(desc, this.GEOSERVER + "wms?", //"lapaz/wms?",
        {
            layers: 'g_riesgos_2011', //'riesgos2011',
            format: 'image/gif' // png
            //styles: 'lp_riesgo'
        }, parms);
    },

    getCatastroLotes: function (s, o) {
        var n = s || "Lotes Catastro",
            k = { layers: 'lotes', format: 'image/png', styles: 'ct_lote4', transparent: true },
            p = { isBaseLayer: false, singleTile: true, ratio: 1, minScale: 5000.0, transitionEffect: "resize"};
        if (o) $.extend(p, o);
        return new OpenLayers.Layer.WMS(n, CUtil.Capas.GEOSERVER + "catastro/wms?", k , p);
    },

    getLotesSIT: function (s, o) {
        var desc = s || "Lotes SIT";
        var parms = {
            isBaseLayer: false,
            singleTile: true,
            ratio: 1,
            //minScale: 5500.0,
            transitionEffect: "resize"
        };
        if (o) $.extend(parms, o);

        return new OpenLayers.Layer.WMS(desc, this.GEOSERVER + "catastro/wms?",
            {
                layers: 'lotes2',
                format: 'image/png',
                styles: 'srvsit_lote',
                transparent: true
            }, parms);
    },

    getLotesSIT2: function (s, o) {
        var desc = s || "Lotes SIT";
        var parms = {
            isBaseLayer: false,
            singleTile: true,
            ratio: 1,
            //minScale: 5500.0,
            transitionEffect: "resize"
        };
        if (o) $.extend(parms, o);

        return new OpenLayers.Layer.WMS(desc, this.GEOSERVER + "sit/wms?",
            {
                layers: 'sit:lotessit',
                format: 'image/png',
                styles: 'lotessit_s1',
                transparent: true
            }, parms);
    },

    getPlanimetrias: function (s, o) {
        var desc = s || "Planimetrias";
        var parms = {
            singleTile: true,
            isBaseLayer: false
        };
        if (o) $.extend(parms, o);

        return new OpenLayers.Layer.WMS(desc, this.GEOSERVER + "archivo/wms?",
            {
                layers: 'planimetrias',
                format: 'image/png',
                styles: 'planimetria_estado',
                transparent: true
            }, parms);
    },

    getPoligonosUBI: function (s, o) {
        var desc = s || "Poligonos UBI";
        var parms = { isBaseLayer: false };
        if (o) $.extend(parms, o);
        var lyr = new OpenLayers.Layer.WMS(desc, CUtil.Capas.GEOSERVER + "lapaz/wms?",
            {
                layers: 'poligonos_ubi',
                format: 'image/png',
                styles: 'lp_poligonos_ubi',
                transparent: true
            }, parms);
        return lyr;
    },

    getPrediosMunicipales: function (s, o) {
        var desc = s || "Predios Municipales";
        var parms = { isBaseLayer: false };
        if (o) $.extend(parms, o);
        return new OpenLayers.Layer.WMS(desc, CUtil.Capas.GEOSERVER + "lapaz/wms?",
                {
                    layers: 'poligonos_ubi2',
                    format: 'image/png',
                    styles: 'lp_poligonos_ubi2',
                    transparent: true
                }, parms);
    },

    getDistritos2012: function (s, o) {
        var desc = s || "Distritos Municipales";
        var parms = { isBaseLayer: false, singleTile: true, transitionEffect: "resize" };
        if (o) $.extend(parms, o);

        return new OpenLayers.Layer.WMS(desc, CUtil.Capas.GEOSERVER + "lapaz/wms?",
            {
                layers: 'distritos_2012',
                format: 'image/png',
                styles: 'lp_distritos2012b', transparent: true
            }, parms);
    },

    getDistritos2013: function (s, o) {
        var desc = s || "Distritos Municipales 2013";
        var parms = { isBaseLayer: false, singleTile: true, description:"Distritos Municipales según Ordenanza Municipal 198/2013." };
        if (o) $.extend(parms, o);

        return new OpenLayers.Layer.WMS(
            desc,
            CUtil.Capas.GEOSERVER + "lapaz/wms?",
            {
                layers: 'distritos_2013',
                format: 'image/png',
                styles: 'lp_distritos2013', transparent: true
            },
            parms
        );
    },

    getDistritos2016: function (s, o) {
        var desc = s || "Distritos Municipales 2016";
        var parms = { isBaseLayer: false, singleTile: true, description:"Redistritacion según Ley Municipal Nro. 166/2016." };
        if (o) $.extend(parms, o);

        return new OpenLayers.Layer.WMS(
            desc,
            CUtil.Capas.GEOSERVER + "lapaz/wms?",
            {
                layers: 'distritos_2016',
                format: 'image/png',
                styles: 'lp_distritos2016', transparent: true
            },
            parms
        );
    },
	
    getDistritos2017: function (s, o) {
        var desc = s || "Distritos Municipales 2017";
        var parms = { isBaseLayer: false, singleTile: true, description:"Distritos Municipales según Resolución Ejecutiva Nº296/2017 (ajuste entre los distritos 2 y 12)" };
        if (o) $.extend(parms, o);

        return new OpenLayers.Layer.WMS(
            desc,
            CUtil.Capas.GEOSERVER + "lapaz/wms?",
            {
                layers: 'distritos_2017',
                format: 'image/png',
                styles: 'lp_distritos2017', transparent: true
            },
            parms
        );
    },
    
    getDistritos2018: function (s, o) {
        var desc = s || "Distritos Municipales 2018";
        var parms = { isBaseLayer: false, singleTile: true, description:"Distritos Municipales según Resolución Ejecutiva 176/2018 (ajuste distritos 7 y 5)" };
        if (o) $.extend(parms, o);

        return new OpenLayers.Layer.WMS(
            desc,
            CUtil.Capas.GEOSERVER + "lapaz/wms?",
            {
                layers: 'distritos_2018',
                format: 'image/png',
                styles: 'lp_distritos2018', transparent: true
            },
            parms
        );
    },

    getMacrodistritos: function (s, o) {
        var desc = s || "Macrodistritos";
        var parms = { isBaseLayer: false, singleTile: true };
        if (o) $.extend(parms, o);

        return new OpenLayers.Layer.WMS(
            desc, CUtil.Capas.GEOSERVER + "lapaz/wms?",
            { layers: 'macrodistritos', format:'image/png', styles:'lp_macrodistritos', transparent: true },
            parms
        );
    },
	
	getMacrodistritos2017: function (s, o) {
        var desc = s || "Macrodistritos 2017";
        var parms = { isBaseLayer: false, singleTile: true };
        if (o) $.extend(parms, o);

        return new OpenLayers.Layer.WMS(
            desc, CUtil.Capas.GEOSERVER + "lapaz/wms?",
            { layers: 'macrodistritos_2017', format:'image/png', styles:'lp_macrodistritos2017', transparent: true },
            parms
        );
    },

    getNumerosPuerta: function (s, o) {
        var desc = s || "Numeros de Puerta";
        var parms = { isBaseLayer: false, minScale: 5000.0 };
        if (o) $.extend(parms, o);

        return new OpenLayers.Layer.WMS(
            desc, CUtil.Capas.GEOSERVER + "sit/ows?", {
            layers: 'numeropuertas',
            format: 'image/png',
            styles: 'sit_numeropuerta',
            transparent: true
        }, parms)
    }
}

CUtil.CapasGWC = {
    GEOSERVER: "http://192.168.5.84:8080/geoserver/",
    getLayer: function (desc, layer, format, params) {
        var d = desc || "Capa GWC",
            l = layer || null,
            f = format || "image/png",
            o = { tileSize: new OpenLayers.Size(256, 256), transitionEffect: "resize" };
        if (params) $.extend(o, params);
        return new OpenLayers.Layer.WMS(d, this.GEOSERVER + "gwc/service/wms?", { layers: l, format: f }, o);
    },

    getRestitucion: function (s, o) {
        return this.getLayer(s || "Restitución 2006", "g_restitucion_2006", "image/png", o);
    },

    getMunicipio: function (s, o) {
        return this.getLayer(s || "Mapa La Paz", "g_municipio", "image/png", o);
    },

    getMunicipio2: function (s, o) {
        return this.getLayer(s || "Mapa La Paz", "g_municipio2", "image/png", o);
    },

    getMunicipio3: function (s, o) {
        return this.getLayer(s || "Mapa Municipio", "g_municipio3", "image/png", o);
    },

    getZonasValor2011: function (s, o) {
        return this.getLayer(s || "Zonas tributarias 2011", "g_zonas_valor_2011", "image/png", o);
    },

    getZonasValor2015: function (s, o) {
        return this.getLayer(s || "Zonas tributarias 2015", "g_zonas_valor_2015", "image/png", o);
    },

    getRiesgos2011: function (s, o) {
        return this.getLayer(s || "Mapa de riesgos 2011", "g_riesgos_2011", "image/png", o);
    }
};

CUtil.GetWMSCapabilities = function (url, fnSuccess, context) {
    var format = new OpenLayers.Format.WMSCapabilities({
        version: "1.3.0"
    });
    var o = { SERVICE: "WMS", VERSION: "1.3.0", REQUEST: "GetCapabilities" },
        u = OpenLayers.Util.urlAppend(url, OpenLayers.Util.getParameterString(o)),
        url2 = OpenLayers.ProxyHost + encodeURIComponent(u);

    OpenLayers.Request.GET({
        url: url2,
        success: function (request) {
            var doc = request.responseXML;
            if (!doc || !doc.documentElement) {
                doc = request.responseText;
            }

            var capabilities = format.read(doc);
            var layers = capabilities.capability.layers;
            if (typeof fnSuccess == 'function') {
                fnSuccess.call((context || null), capabilities);
            }
        },
        failure: function () {
            OpenLayers.Console.error("...error...");
        }
    });
}

OpenLayers.Control.GoogleSV = OpenLayers.Class(OpenLayers.Control, {
    lonlat: null,
    url: null,
    target: '_blank', /* _blank  _parent _self  _top */
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function (options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        );
        this.handler = new OpenLayers.Handler.Click(
            this, {
                'click': this.onClick //,
                // 'dblclick': this.onDblclick
            }, this.handlerOptions
        );
    },

    onClick: function (evt) {
        this._removeFeatures();
        this.lonlat = this.map.getLonLatFromPixel(evt.xy).clone();

        var point = new OpenLayers.Geometry.Point(this.lonlat.lon, this.lonlat.lat);
        var pointFeature = new OpenLayers.Feature.Vector(point, null, null);
        this.vlayer.addFeatures([pointFeature]);

        this.url = this._getUrlGoogleStretView();

        var win = window.open(this.url, this.target);
        if (win) {
            win.focus();
        } else {
            alert('No esta permitido popups en este sitio!');
        }

    },

    //onDblclick: function (evt) {
    //    //var output = document.getElementById(this.key + "Output");
    //    //var msg = "dblclick " + evt.xy;
    //    //output.value = output.value + msg + "\n";
    //},

    _getUrlGoogleStretView: function () {
        var zm = this.map.getZoom();
        var ptc = this.lonlat; // this.map.getCenter();
        var dest = new Proj4js.Proj("EPSG:4326");
        var source = new Proj4js.Proj("EPSG:32719");
        var pt = new Proj4js.Point(ptc.lon, ptc.lat);
        Proj4js.transform(source, dest, pt);
        var url = "http://maps.google.com/?cbll=" + pt.y.toString() + "," + pt.x.toString() + "&cbp=12,0,0,0,5&layer=c"; // cbp=12,90,0,0,5
        return url;
    },

    destroy: function () {
        if (this.vlayer) {
            this.vlayer.removeAllFeatures();
            return;
        }
        OpenLayers.Control.prototype.destroy.apply(this, arguments)
    },

    setMap: function (a) {
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
        this._initVLayer();
    },

    activate: function () {
        if (!this.active) {
            // funciones adicionales para activar
        }
        return OpenLayers.Control.prototype.activate.apply(
            this, arguments
        );
    },

    deactivate: function () {
        if (this.active) {
            this._removeFeatures();
        }
        return OpenLayers.Control.prototype.deactivate.apply(
            this, arguments
        );
    },

    _removeFeatures: function(){
        if (this.vlayer) this.vlayer.removeAllFeatures();
    },

    _initVLayer: function () {
        if (this.vlayer) {
            this.vlayer.removeAllFeatures();
            return;
        }
        var style2 = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
        OpenLayers.Util.extend(style2, this.mapStyle);

        var stymap = new OpenLayers.Style(style2);
        var tmpname = "GoogleSV." + (new Date()).getTime().toString();
        this.vlayer = new OpenLayers.Layer.Vector(tmpname,
        {
            styleMap: new OpenLayers.StyleMap(style2),
            displayInLayerSwitcher: false
        });

        this.map.addLayer(this.vlayer);
    },

    CLASS_NAME: "OpenLayers.Control.GoogleSV"

});
