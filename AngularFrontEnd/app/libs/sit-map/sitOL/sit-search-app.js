function SITSearch(){
    this.url_wfs = SITUtil.capas._get_url_wfs();
    this.wfsParams = {
        service: 'WFS',
        version: '1.0.0',
        request:'GetFeature',
        srsName:'EPSG:32719',
        outputFormat:"application/json",
        maxFeatures: 20
    };
    return this;
}

SITSearch.prototype.getUrl = function(){
    var url = this.url_wfs,
        k = url.substring(url.length-1);
    if(k === "?") url = url.substring(0, url.length-1);
    return url;
};

SITSearch.prototype.cloneWfsParams = function(){
    return $.extend({}, this.wfsParams);
};

SITSearch.prototype.getToponimia = function(placeholder, maxItems){
    var self = this,
        plhdr = placeholder || 'Buscar lugar',
        maxitems = maxItems || 20,
        o;
    o = {
        url: self.getUrl(),
        maxItems: maxitems,
        placeholder: plhdr,
        getTitle: function (f){
            var p = f.properties, layer = p["layer"], nombre = p["nombre"];
            return ( "<b>" + nombre + "</b> " + ( layer ? "<i>" + layer + "</i>" : ""));
        },
        requestData: function (s){
            var p = {
                typeName:'sit:toponimia',
                cql_filter: "nombre ILIKE '%" + s + "%'", //encodeURIComponent("nombre ILIKE '%" + s + "%'"),
                maxFeatures: maxitems
            };
            return $.extend( self.cloneWfsParams(), p);
        }
    };
    return o;
};

SITSearch.prototype.getVias = function(placeholder, maxItems){
    var self = this,
        plhdr = placeholder || 'Calle, Avenida...',
        maxitems = maxItems || 20,
        o;
    o = {
        url: self.getUrl(),
        placeholder: plhdr,
        maxItems: maxitems,
        getTitle: function (f)
        {
            var tipovia = {"2":"Av.", "3":"Calle","7":"Autopista"};
            var p = f.properties, tipo = tipovia[p["via_tipo"]] || "";
            return ( ( tipo ? "<i>" + tipo + " </i>" : "") + "<b>" + p["alias"] + "</b>, <i>"+ p["zonaref"] + "</i>");
        },
        handleResponse: function(response, cback){
            return response.features;
        },
        requestData: function (s){
            var p = {
                typeName:'sit:vias',
                cql_filter: "gdbsnovi ILIKE '%" + s + "%' OR alias ILIKE '%" + s + "%'",
                maxFeatures: maxitems
            };
            return $.extend(self.cloneWfsParams(), p);
        }
    };
    return o;
};

SITSearch.prototype.getLotes = function(placeholder, maxItems){
    var self = this,
        plhdr = placeholder || 'Código Catastral',
        maxitems = maxItems || 25,
        o;
    o = {
        url: self.getUrl(),
        maxItems: maxitems,
        placeholder: plhdr,
        getTitle: function (f){
            var p = f.properties,
                cc = p["codigocatastral"],
                dc = p["distritocatastral"],
                mz = p["manzana"],
                lo =  p["predio"];

            return "<b>"  + dc + "-" + mz + "-" + lo + "</b> <i>[" + cc + "]</i>";
        },
        requestData: function (s){
            var codcat = new sit.CodigoCatastral(s);
            var exprs = "";
            switch(codcat.modo){
                case "manzana":
                    exprs = "distritocatastral = " + codcat.distrito + " AND manzana = " + codcat.manzana;
                    break;
                case "predio":
                case "subpredio":
                case "sifca":
                    exprs = "distritocatastral = " + codcat.distrito + " AND manzana = " + codcat.manzana + " AND predio = " + codcat.predio;
                    break;
                default:
                    if(s.indexOf("%") != -1 || s.indexOf("_") != -1 )
                        exprs = "codigocatastral LIKE '" + s + "'";
                    else 
                        exprs = "codigocatastral LIKE '%" + s + "%'";
            }
            return $.extend(self.cloneWfsParams(), {
                typeName:'catastro:lotes',
                cql_filter: exprs,
                maxFeatures: maxitems
            });
        }
    };
    return o;
};

SITSearch.prototype.getDirecciones = function(placeholder, maxItems){
    var self = this,
        plhdr = placeholder || 'ej: Calle n # 22',
        maxitems = maxItems || 25,
        o;
    o = {
        url: self.getUrl(),
        maxItems: maxitems,
        placeholder: plhdr,
        getTitle: function (f)
        {
            var p = f.properties,
                np = p["num_puerta"],
                tv = p["tipo_via"],
                nv = p["nombre_via"],
                zn =  p["otb"];

            return (tv ? "<i>" + tv + "</i> " : "") + (nv ? "<b>" + nv+ "</b> " : "") 
                    + (np ? "Nro. <b>" + np + "</b>" : "") + (zn ? " <i>" + zn + "</i>" : "");
        },
        requestData: function (s){
            var spt = s.split(/(nro.|#)/i);
            var exprs = [];
            if(spt.length === 3){
                var x = spt[0].trim(), 
                    re = /^(calle|avenida|av.|c.|callejon|pasaje)\s+/i,
                    m = x.match(re),
                    nv = x;
                if(m){
                    var y = {calle: "Calle", avenida:"Avenida", "av.":"Avenida", "c.":"Calle", "callejon":"Callejon", "pasaje":"Pasaje"},
                        z = y[m[1].toLowerCase()];
                    nv = x.replace(re, '');
                    exprs.push('tipo_via = \'' + z + '\'' );
                }
                exprs.push('nombre_via ILIKE \'%' + nv + '%\'');
                if(spt[2]){
                    exprs.push('num_puerta ILIKE \'' + spt[2].trim() + '%\'');
                }
            } else {
                exprs.push("nombre_via ILIKE '%" + s + "%'");
            }
            var query = exprs.join(" AND ");

            return $.extend( self.cloneWfsParams(), {
                typeName:'sit:numeropuertas',
                cql_filter: query,
                maxFeatures: maxitems
            });
        }
    };
    return o;
};

SITSearch.prototype.getZonasGU = function(placeholder, maxItems){
    var self = this,
        plhdr = placeholder || 'Nombre zona',
        maxitems = maxItems || 10,
        o;
    o = {
        url: self.getUrl(),
        maxItems: maxitems,
        placeholder: plhdr,
        getTitle: function (f)
        {
            var p = f.properties,
                zr = p["zonaref"],
                md = p["macrodistrito"];

            return "<b>" + zr+ "</b>, <i>" + md + "</i>";
        },
        requestData: function (s){
            var exprs = [];
            exprs.push("zonaref ILIKE '%" + s + "%'");
            exprs.push("zona ILIKE '%" + s + "%'");
            var query = exprs.join(" OR ");

            return $.extend( self.cloneWfsParams(), {
                typeName:'sit:zonasgu2016',
                cql_filter: query,
                maxFeatures: maxitems
            });
        }
    };
    return o;
};

