// =================================================================
// Template para Busqueda de mapas
var MapSearch = {
    Searh: function (desc, url, isDefault, filter, fn_test, fn_cql, expresion) {
        this.desc = desc;
        this.url = url;
        this.isDefault = isDefault;
        this.filter = filter;
        this.expresion = expresion;
        this.test = typeof fn_test == 'function' ? fn_test : function (s) {
            return this.filter != null && s.match(this.filter) != null;
        };
        this.cql = typeof fn_cql == 'function' ? fn_cql : function (s) {
            return this.expresion.replace("{0}",  CUtil._cleanText($.trim(s)));
        }
    },

    templates: [{
        desc: "Avenidas, calles"
    , isDefault: true
	, url: "lapaz/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lapaz:vialidad&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&propertyName=Shape,GDBSNOVI,GDBSTIVI,VIA_TIPO&"
        //, url: "lapaz/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lapaz:vialidad&maxFeatures=50&propertyName=Shape,GDBSNOVI,GDBSTIVI,VIA_TIPO&"
    , filter: /^(calle|avenida|pasaje|callejon)\s+/i
	, test: function (s) {
	    return s.match(this.filter) != null;
	}
	, cql: function (s, m) {
	    var m2 = s.match(/^(calle|avenida|pasaje|callejon)\s+(\w+|\d+)/i);
	    if (m2) {
	        var tipo = m2[1].toLowerCase(),
				idtipovia = ({ 'avenida': 2, 'calle': 3, 'pasaje': 6, 'callejon': 4 })[tipo],
				nombre = s.substr(tipo.length + 1, s.length);
	        nombre = $.trim(nombre);
	        return "GDBSTIVI = " + idtipovia + " AND GDBSNOVI LIKE '%" + CUtil._cleanText(nombre) + "%'";
	    }
	    return "GDBSNOVI LIKE '%" + CUtil._cleanText($.trim(s)) + "%'";
	}
    }
, {
    desc: "Registro vial catastro"
    , isDefault: true
	, url: "catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:vias&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&propertyName=geom,nombrevia,idpendientevia,idmatcalle,anchovia,idtipovia&"
    , filter: /^(calle|avenida|pasaje|callejon)\s+/i
	, test: function (s) {
	    return s.match(this.filter) != null;
	}
	, cql: function (s, m) {
	    var m2 = s.match(/^(calle|avenida|pasaje|callejon)\s+(\w+|\d+)/i);
	    if (m2) {
	        var tipo = m2[1].toLowerCase(),
				idtipovia = ({ 'avenida': 1, 'calle': 2, 'pasaje': 3, 'callejon': 5 })[tipo],
				nombre = s.substr(tipo.length + 1, s.length);
	        nombre = $.trim(nombre);
	        return "idtipovia = " + idtipovia + " AND nombrevia LIKE '%" + CUtil._cleanText(nombre) + "%'";
	    }
	    return "nombrevia LIKE '%" + CUtil._cleanText($.trim(s)) + "%'";
	}
}
, {
    desc: "Lotes"
	, url: "catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:lotes2&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&"
    , filter: /^(\d{1,3})\s*-\s*(\d{1,4})\s*-\s*(\d{1,4})$/
	, test: function (s) {
	    var m = s.match(this.filter) || s.match(/^(\d{15})$/);
	    return (m != null);
	}
	, cql: function (s, m) {
	    var cc = new CodigoCatastral(s);
	    if (cc.modo === "predio") {
	        return "DISTCAT = " + cc.distrito + " AND MANZANA = " + cc.manzana + " AND NRO_LOTE = " + cc.predio;
	    } else if (cc.modo === "sifca") {
	        return "COD_SIFCA = '" + cc.toString() + "'";
	    }
	    return null;
	}
}
, {
    desc: "Lotes catastro"
	, url: "catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:lotes&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&"
    , filter: /^(\d{1,3})\s*-\s*(\d{1,4})\s*-\s*(\d{1,4})$/
	, test: function (s) {
	    var m = s.match(this.filter) || s.match(/^(\d{15})$/);
	    return m != null;
	}
	, cql: function (s) {
	    var cc = new CodigoCatastral(s);
	    if (cc.modo === "predio") {
	        return "distritocatastral = " + cc.distrito + " AND manzana = " + cc.manzana + " AND predio = " + cc.predio;
	    } else if (cc.modo === "sifca") {
	        return "codigocatastral = '" + cc.toString() + "'";
	    }
	    return null;
	}
}
, {
    desc: "Manzanas"
	, url: "catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:manzanas&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&"
    , filter: /^(\d{1,3})\s*-\s*(\d{1,4})$/
	, test: function (s) {
	    return s.match(this.filter) != null;
	}
	, cql: function (s) {
	    var cc = new CodigoCatastral(s);
	    if (cc.modo === "manzana") {
	        return "distritocatastral = " + cc.distrito + " AND manzana = " + cc.manzana;
	    }
	    return null;
	}
}
, {
    desc: 'Zonas y Barrios'
    , isDefault: true
	, url: "catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:zonas&maxFeatures=20&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&"
    , filter: /^(zona|barrio)\s+/i
	, test: function (s) {
	    return s.match(this.filter) != null;
	}
	, cql: function (s) {
	    var m = s.match(this.filter);
	    if (m != null) {
	        var w = (m !== null) ? s.substr(m[1].length + 1, s.length) : s;
	        return "GDBSNOMB LIKE '%" + CUtil._cleanText($.trim(w)) + "%'";
	    }
	    return "GDBSNOMB LIKE '%" + CUtil._cleanText($.trim(s)) + "%'";
	}
}
, {
    desc: 'OTBs'
    , isDefault: true
	, url: "catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:otbs&maxFeatures=20&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&"
    , filter: /^(otb|zona|barrio|junta)\s+/i
	, test: function (s) {
	    return s.match(this.filter) != null;
	}
	, cql: function (s, m) {
	    var m = s.match(this.filter), w = (m != null) ? s.substr(m[1].length + 1, s.length) : s;
	    return "GDBSNOMB LIKE '%" + CUtil._cleanText($.trim(w)) + "%'";
	}
}
, {
    desc: 'Planimetria'
	, url: "archivo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=archivo:planimetrias&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&"
    , filter: /^(pl|planimetria|pia)\s+/i
	, test: function (s) {
	    return s.match(this.filter) != null;
	}
	, cql: function (s) {
	    var m = s.match(this.filter),
	        w = (m != null) ? s.substr(m[1].length + 1, s.length) : s;
	    return "descPlanimetria LIKE '%" + CUtil._cleanText($.trim(w)) + "%'";
	}
} 

, {
    desc: 'Lugares, equipamientos'
    , isDefault: true
	, url: "lapaz/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lapaz:lugares&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&maxFeatures=50"
    , filter: /^(farmacia|biblioteca|hotel|mercado|cementerio|plaza|parque|cancha|banco)\s+/i
	, test: function (s) {
	    return s.match(this.filter) != null;
	}
	, cql: function (s) {
	    var m = s.match(this.filter);
	    if (m) {
	        var tp = m[1].toUpperCase(), ss = s.substr(m[1].length + 1, s.length);
	        return "LAYER LIKE '%" + $.trim(tp) + "%' AND GDBSNOMB LIKE '%" + CUtil._cleanText($.trim(ss)) + "%'";
	    }
	    return "GDBSNOMB LIKE '%" + CUtil._cleanText($.trim(s)) + "%'";
	}
}

]
}

/* 
 * Objeto busquedas, en base a wfs definidas
 * by Nelson Huanquiri Q.
 */

OpenLayers.Control.MapSearch = OpenLayers.Class(OpenLayers.Control, {
    fnMessage: null,
    fnHandler: null,
    vlayer: null,
    idProgress: null,
    div: null,
    format: "GML2", // GML2 || JSON
    resto: 0,
    nodeResult: null,
    _nodeProgress: null,
    _timestamp: null,
    _txt: null,
    _combo: null,
    _btn_buscar: null,
    _btn_limpiar: null,
    _btn_ver: null,
    mapStyle: {
        fill: false
        , fillColor: '#ABCDEF'
        , fillOpacity: 0.5
		, stroke: true
		, strokeColor: '#C00000'
		, strokeWidth: 3
        , strokeDashstyle: 'dash'
		, fontFamily: 'arial, helvetica, sans-serif'
		, fontColor: 'cyan'
		, fontWeight: 'bold'
		, fontSize: '10px'
    },

    // cambiando la lista
    items: [],

    initialize: function () {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        if (this.idProgress) {
            this._nodeProgress = OpenLayers.Util.getElement(this.idProgress) || null;
            $(this._nodeProgress).hide();
        }
        if (this.nodeResult) {
            this.nodeResult = OpenLayers.Util.getElement(this.nodeResult) || null;
        }
        this._initControls();
    },

    _initControls: function () {
        if (this.div) {
            var self = this;
            this.div = OpenLayers.Util.getElement(this.div);

            var combo = $("<select></select>").css({ width: 230 }).appendTo(this.div);
            $("<option></option>").text('[Todo]').attr("value", "-1").appendTo(combo);
            for (var j = 0; j < this.items.length; j++) {
                var obj = this.items[j];
                $("<option></option>").text(obj.desc).attr("value", j).appendTo(combo);
            }
            this._combo = combo;
            var txt = $("<input type='text'></input>").css({ width: 200 }).keypress(function (e) {
                if (e.which == 13) {
                    self.buscar($(this).val());
                    e.preventDefault();
                }
            }).appendTo(this.div);
            this._txt = txt;

            var dspcls = this.displayClass;
            this._btn_buscar = $("<button></button>").addClass(dspcls + "BotonBuscar").text("Buscar").click(function (e) {
                self.buscar(txt.val());
                e.preventDefault();
            }).appendTo(this.div);

            this._btn_limpiar = $("<button></button>").addClass(dspcls + "BotonLimpiar").text("Limpiar").click(function (e) {
                self.limpiar();
                txt.val("");
                self._showMsg("");
                e.preventDefault();
            }).hide().appendTo(this.div);

            this._spn_ver = $("<span></span>").addClass(dspcls + "BotonVer").hide().appendTo(this.div);
            this._btn_ver = $("<a></a>").attr({ 'href': 'javacript:void(0)' }).text('detalles...').click(function (e) {
                if (typeof self.fnHandler == 'function') self.fnHandler({ 'target': self, 'type': 'clickButtonVer' });
                e.preventDefault();
            }).appendTo(this._spn_ver);

            var icon_wait = $("<div></div>").addClass("loaderSmallIcon").appendTo(this.div).hide();
            this._nodeProgress = icon_wait[0];

        }
    },

    _startFind: function () {
        // iniciando busqueda
        if (this._nodeProgress) $(this._nodeProgress).show();
        if (this._btn_limpiar) this._btn_limpiar.hide();
        if (this._spn_ver) this._spn_ver.hide();
        if (this.nodeResult) {
            $(this.nodeResult).empty().text("Consultando...");
        }
    },

    _endFind: function () {
        // terminando busqueda
        if (this._nodeProgress) $(this._nodeProgress).hide();
        if (this.vlayer && this.vlayer.features.length > 0) {
            this._btn_limpiar.show();
            this._btn_ver.text("" + this.vlayer.features.length + " elementos.");
            this._spn_ver.show();
            if (this.nodeResult) {
                $(this.nodeResult).empty().append(this.getFeaturesTable());
            }
            var dext = this.vlayer.getDataExtent();
            this.map.zoomToExtent(dext);
            this._showMsg("Total elementos encontrados " + this.vlayer.features.length + ".");
        } else {
            if (this.nodeResult) $(this.nodeResult).empty().text("No se encontraron elementos.");
            this._showMsg("No se encontraron elementos.");
            this._btn_ver.text("0 elementos.");
            this._spn_ver.show();
        }
    },

    _parseData: function (data) {
        var fmt, features;
        if (this.format === "GML2") {
            fmt = new OpenLayers.Format.GML.v2();
        } else if (this.format === "JSON") {
            fmt = new OpenLayers.Format.GeoJSON();
        } else {
            return null;
        }
        try {
            features = fmt.read(data);
        } catch (e) {
            features = null;
        }
        return features;
    },

    _addFeatures: function (data, zoom) {

        var features = this._parseData(data);
        console.log("features",features);
        if (!features) {
            this._showMsg("Error: al convertir datos " + e.message);
            return;
        }
        if (features.length > 0) {
            this._showMsg(features.length + " elementos encontrados.");
            console.log("1111");
            var geojson_format = new OpenLayers.Format.GeoJSON();
            this.vlayer.addFeatures(geojson_format.read(features));
            //this.vlayer.addFeatures(features);
            console.log("2222");
            if (zoom === true) {
                var dext = this.vlayer.getDataExtent();
                this.map.zoomToExtent(dext);
            }
        } else {
            this._showMsg("No se encontraron elementos.");
        }
    },
    _addFeaturesJson: function (data, zoom) {

        var features = data;
        console.log("features",features);
        if (!features) {
            this._showMsg("Error: al convertir datos " + e.message);
            return;
        }
        if (data.features.length > 0) {
            this._showMsg(features.length + " elementos encontrados.");
            console.log("1111");
            var geojson_format = new OpenLayers.Format.GeoJSON();
            this.vlayer.addFeatures(geojson_format.read(features));
            //this.vlayer.addFeatures(features);
            console.log("2222");
            if (zoom === true) {
                var dext = this.vlayer.getDataExtent();
                this.map.zoomToExtent(dext);
            }
        } else {
            this._showMsg("No se encontraron elementos.");
        }
    },

    _zoomToFid: function (fid) {
        if (this.vlayer) {
            var f = this.vlayer.getFeatureByFid(fid);
            if (f) {
                var bnds = f.geometry.getBounds();
                this.map.zoomToExtent(bnds);
            }
        }
    },

    _showToFid: function (fid) {
        if (this.vlayer) {
            this.vlayer.redraw();
            var f = this.vlayer.getFeatureByFid(fid);
            if (f) {
                this.vlayer.drawFeature(f, {
                    fill: true
                    , fillColor: '#FFFF00'
                    , fillOpacity: 0.5
		            , stroke: true
		            , strokeColor: '#00FFFF'
		            , strokeWidth: 4
		            , strokeDashstyle: 'solid'
                    , pointRadius: 8
                    , strokeLinecap: "round"
                });
            }
        }
    },

    getFeaturesTable: function () {
        var dspcls = this.displayClass;
        var tbl = jQuery("<table></table>").addClass(dspcls + "Table");
        var thisObj = this, cls = [dspcls + "TableTD", dspcls + "TableTD2"];

        jQuery("<tr></tr>")
			.append(jQuery("<th></th>").addClass(dspcls + "TableTH").text("Elementos o Registros"))
			.append(jQuery("<th></th>").addClass(dspcls + "TableTH").text("Herram."))
			.appendTo(tbl);

        if (this.vlayer && this.vlayer.features.length) {
            for (var i = 0; i < this.vlayer.features.length; i++) {
                var f = this.vlayer.features[i], cx = cls[i % 2];
                var obj = { 'fid': f.fid, 'map': thisObj.map };
                var td0 = jQuery("<td></td>").addClass(cx);

                for (var a in f.attributes) {
                    td0.append(
                        jQuery("<span></span>").addClass(dspcls + "TableCampo").text(a + ": "),
                        jQuery("<span></span>").text(f.attributes[a] + " ")
                    );
                }
                jQuery("<tr></tr>").append(td0).append(
                        jQuery("<td></td>").append(
                            jQuery("<a></a>").attr({ 'href': 'javascript:void(0)' }).text("zoom").click(obj, function (e) { thisObj._zoomToFid(e.data.fid); }),
                            jQuery("<span></span>").text("|"),
                            jQuery("<a></a>").attr({ 'href': 'javascript:void(0)' }).text("show").click(obj, function (e) { thisObj._showToFid(e.data.fid); })
                        ).addClass(cx)
                    ).appendTo(tbl);
            }
        }
        return tbl;
    },

    _getFindObj: function (msg) {
        var j = parseInt($(this._combo).val()), obj = [], o;
        if (j === -1) {
            for (var i = 0; i < this.items.length; i++) {
                o = this.items[i];
                if (o.test(msg)) {
                    obj.push(o);
                }
            }
            if (obj.length == 0) {
                for (var i = 0; i < this.items.length; i++) {
                    o = this.items[i];
                    if (o.isDefault === true) obj.push(o);
                }
            }
        } else if (!isNaN(j)) {
            obj.push(this.items[j]);
        }
        return obj;
    },

    _validateUrl: function (url) {
        var u = url.match(/^http\:\/\/[a-zA-Z0-9\-\.]+/i) == null ? CUtil.Capas.GEOSERVER + url : url;
        if (u.match(/[\&\?]$/) == null) u += (u.match(/\?/) == null) ? "?" : "&";
        if (u.match(/service=/i) == null) u += "service=WFS&";
        if (u.match(/version=/i) == null) u += "version=1.0.0&";
        if (u.match(/request=/i) == null) u += "request=GetFeature&";
        if (u.match(/maxfeatures/i) == null) u += "maxFeatures=50&";
        return u;
    },

    buscar: function (s, a) {
        var msg = s || $(this._txt).val();
        msg = $.trim(msg);
        if (msg === "") {
            this._showMsg("Debe escribir texto a buscar.");
            return;
        }
        var arr = a || this._getFindObj(msg);
        if (!arr || typeof arr === 'undefined' || arr.length === 0) {
            this._showMsg("No se pudo iniciar la busqueda.");
            return;
        }

        this._initVLayer();
        this._startFind();
        var self = this, obj;
        while (obj = arr.shift()) {
            var cql = obj.cql(msg);
            if (cql !== null) {
                var url = self._validateUrl(obj.url);
                /*
                OpenLayers.Request.GET({
                    url: url
				    , params: { cql_filter: cql }
				    , success: function (response) {
                        //console.log("OK",response.responseText);
				        self._addFeatures(response.responseText, true);
				        if (arr.length == 0) {
				            self._endFind();
				        }
				    }
				    , failure: function (resp) {
				        self._showMsg("Fallo la consulta al servidor." + resp.responseText);
				        if (arr.length == 0) self._endFind();
				    }
				    , scope: self
                });
*/

                $.ajax({
                    url: url,
                    data: { cql_filter: cql },
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonpCallback: 'getJson',
                    success: function (response) {
                        //console.log('OK.....', response);
                        //self._addFeatures(response.responseText, true);
                        self._addFeaturesJson(response, true);
                        if (arr.length == 0) {
                            self._endFind();
                        }
                    },
                    error: function (resp) {
                        self._showMsg("Fallo la consulta al servidor." + resp.responseText);
                        if (arr.length == 0) self._endFind();
                    }
                    , scope: self
                });

                
                
            } else {
                this._showMsg("No se pudo evaluar la expresion.");
            }
        }
    },

    limpiar: function () {
        if (this.vlayer) this.vlayer.removeAllFeatures();
        if (this._btn_limpiar) this._btn_limpiar.hide();
        if (this._spn_ver) this._spn_ver.hide();
        if (this.nodeResult) {
            $(this.nodeResult).empty();
        }
    },

    reset: function () {
        if (this.vlayer) {
            this.vlayer.removeAllFeatures();
            this.map.removeLayer(this.vlayer);
            this.vlayer = null;
        }
    },

    _showMsg: function (s) {
        if (typeof this.fnMessage === 'function') this.fnMessage(s);
    },

    _initVLayer: function () {
        if (this.vlayer) {
            this.vlayer.removeAllFeatures();
            return;
        }
        var style2 = jQuery.extend({}, OpenLayers.Feature.Vector.style['default']);
        jQuery.extend(style2, this.mapStyle);

        var stymap = new OpenLayers.Style(style2);
        this.vlayer = new OpenLayers.Layer.Vector("MapSearch", {
            styleMap: new OpenLayers.StyleMap(stymap),
            displayInLayerSwitcher: false
        });

        this.map.addLayer(this.vlayer);
    },

    CLASS_NAME: "OpenLayers.Control.MapSearch"
});


