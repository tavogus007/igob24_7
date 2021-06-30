// by Nelson Huanquiri 2017
var GridUtil = function(){
    this.headerClass =  "cell_campo";
    this.dataClass = "cell_info";
    this.tableClass =  "tbl_info";
    this.titleClass = "cell_title";
    this.addId = false;
    this.schemes = {};
    
    var extend = function(dest, src) {
        for (var prop in src) dest[prop] = src[prop];
        return dest;
    };
    if(arguments.length > 0){
       var o = arguments[0];
       if(o) extend(this, o);
    }
    this.extend = extend;
    return this;
};

GridUtil.checkEmail = function(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email)) {
        return true;
    } else {
        return false;
    }
};

GridUtil.isHtml = function(str){
    var a = document.createElement('div');
    a.innerHTML = str;
    for (var c = a.childNodes, i = c.length; i--; ) {
        if (c[i].nodeType === 1) return true; 
    }
    return false;
};

GridUtil.isNode = function(node){
    return (node && typeof node === "object" && typeof node["nodeType"]==="number");
};

GridUtil.isJquery = function(obj){
    return (obj && typeof obj === "object" && typeof obj["jquery"]);
};

GridUtil.updateNode = function(nod, val){
    if(this.isNode(val) || this.isJquery(val)){
        $(nod).append(val);
    } else if( this.isHtml(val) ) {
        $(nod).html( val );
    } else {
        $(nod).empty().append(document.createTextNode(val === null ? " " : val));
    }
    return nod;
};

GridUtil.getPropValue = function(feature, prop, objfield){
    var val = null, props = feature["properties"];
    if(objfield){
        if(typeof objfield.values === "function"){
            val = objfield.values.call(null, props[prop], props, feature);
        } else {
            val = objfield.values ? objfield.values[props[prop]] : props[prop];
        }
    } else {
        val = props[prop];
    }
    return val;
};

GridUtil.checkFilter = function(v, objfield, context){
    if(typeof objfield["filter"] === "function"){
        return objfield["filter"].apply(context, v);
    }
    if(typeof objfield["filter"] !== "undefined"){
        return (v == objfield["filter"]);
    }
    return;
};


GridUtil.bindFeature = function(template, feature, fields){
    var tm = $(template), //typeof template === "string" && this.isHtml(template) ? $("<div></div>").html(template) : template, 
        flds = fields || {},
        val, col, a, self = this;
    
    $("[data-fld-sit]", template).each(function(i, o){
        a = $(o).data("fld-sit");
        col = flds[a] || null;
        val = self.getPropValue(feature, a, col);
        self.updateNode(o, val);
    });
    
    /*
    var props = feature["properties"] || {}, jq;
    for(var p in props){
        col = flds[p] || null;
        val = this.getPropValue(feature, p, col);
        jq = $('[data-fld-sit="'+p+'"]', tm);
        this.updateNode(jq, val);
    }
    */
    return tm;
};

GridUtil.bindField = function(template, feature, fields, prop){
    var tm = $(template),
        col = fields[prop] || null,
        val =  this.getPropValue(feature, prop, col),
        jq = $('[data-fld-sit="'+prop+'"]', tm);
    this.updateNode(jq, val);
    return tm;
};

GridUtil.buildFRow = function(feature, fields){
    var tr = $("<tr></tr>");
    if(fields){
        for(var c in fields){
            var col = fields[c] || {};
            if(col["hideTable"] === true) continue;
            var td = $("<td></td>").appendTo(tr),
                val = this.getPropValue(feature,c,col);
            this.updateNode(td, val);
        }
    }else {
        var props = feature["properties"];
        for(var p in props){
            $("<td></td>").text(props[p]).appendTo(tr);
        }
    }
    return tr;
};

GridUtil.buildFFields = function(fields){
    var tr = $("<tr></tr>");
    if(fields){
        for(var c in fields){
            var col = fields[c] || {};
            if(col["hideTable"] === true) continue;
            $("<th></th>").text( col["label"] || c).appendTo(tr);
        }
    }
    return tr;
};

/***
 * 
 * @param {Fields} fields
 * @returns {window.$|$}
 */
GridUtil.buildFTable = function(fields){
    var tbl = $("<table></table>");
    $("<thead></thead>").append(this.buildFFields(fields)).appendTo(tbl);
    $("<tbody></tbody>").appendTo(tbl);
    return tbl;
};

/***
 * 
 * @param {Feature} feature
 * @param {Fields} fields
 * @param {Node | jquery} tbl
 * @returns {jquery}
 */
GridUtil.addFeatureToTable = function(feature, fields, tbl){
    var tr = this.buildFRow(feature, fields);
    $("tbody", tbl).append(tr);
    return tr;
};

GridUtil.buildTextSearch = function(fnHandler, txtholder, context){
    var plchlr = txtholder || "Buscar...",
        txtSearch = $("<div></div>").addClass("input-group"),
        input = $("<input></input>").attr("type","text").addClass("form-control").attr("placeholder", plchlr),
        btn = $("<button></button>").attr("type","button").addClass("btn btn-default").append(
                $("<span></span>").addClass("glyphicon glyphicon-remove").attr("aria-hidden","true")), 
        spn = $("<span></span>").addClass("input-group-btn").append( btn );
    txtSearch.append(input, spn);
    var t_stamp = null;
    if(typeof fnHandler === "function"){
        input.keyup(function(e){
            if(t_stamp) clearTimeout(t_stamp);
            t_stamp = setTimeout(function(){
                clearTimeout(t_stamp);
                fnHandler.call(context, input.val(), txtSearch );
            }, 200);
            e.preventDefault();
        });
        btn.click(function(e){
            input.val("");
            fnHandler.call(context, "", txtSearch);
        });
    }
    return txtSearch;
};

GridUtil.countValues = function(features, propName){
    var obj = {}, nullValues = 0;
    for(var i=0; i < features.length; i++){
        var f = features[i],
            p = f["properties"],
            v = p[propName];
        if(typeof v === "undefined" || v === null){
            nullValues++;
            continue;
        }
        if(typeof obj[v] === "undefined"){
            obj[v] = 1;
        } else {
            obj[v]++;
        }
    }
    obj["nullValues"] = nullValues;
    return obj;
};

GridUtil.summaryProperty = function(scheme, propName, features){
    var result = [],
        field = scheme["fields"][propName] || {},
        values = field["values"],
        label = field["label"] || "",
        sumas = this.countValues(features, propName);
    for(var v in sumas){
        if(v === "nullValues") continue;
        var s = values && typeof values[v] !== "undefined" ? values[v] : v;
        var o = {value: v, desc:s, conteo:sumas[v] };
        result.push(o);
    }
    return {label:label, property:propName, conteo:result, nullValues: sumas["nullValues"]};
};

/* prototype metodos */
GridUtil.prototype._makeKVPRow = function (f, v) {
    var tr = document.createElement("tr"),
        td = document.createElement("td");
    td.appendChild(document.createTextNode(f));
    td.classList.add(this.headerClass);
    tr.appendChild(td);

    td = document.createElement("td");
    if(v && typeof v === "object" && typeof v["nodeType"]==="number"){
        td.appendChild(v);
    } else if( this._isHtml(v) ) {
        td.innerHTML = v;
    } else {
        td.appendChild(document.createTextNode(v === null ? " " : v));
    }
    td.classList.add(this.dataClass);
    tr.appendChild(td);
    return tr;
};

GridUtil.prototype.getScheme = function(k){
    if(this.schemes[k] && typeof this.schemes[k] === "object")
        return this.schemes[k]; 
    else 
        return { };
};

GridUtil.prototype._isHtml = function(str){
    return GridUtil.isHtml(str);
};

GridUtil.prototype._isNode = function(node){
    return GridUtil.isNode(node);
};

GridUtil.prototype._isJquery = function(obj){
    return GridUtil.isJquery(obj);
};

/**
 * 
 * @param {type} feature
 * @param {type} scheme
 * @param {type} opts {skipStyle = false}
 * @returns {Element|GridUtil.prototype.makePropGrid.tbl}
 */
GridUtil.prototype.makePropGrid = function (feature, scheme, opts) {
    // console.log(111, scheme, this.schemes);
    var o = opts || {};
    var properties = feature["properties"],
        fid = feature["id"],
        n = fid.lastIndexOf("."),
        lyrid = fid.substring(0, n),
        id = fid.substring(n + 1),
        schm = scheme || this.getScheme(lyrid);
     
    var title = schm["title"] || fid,
        fields = schm["fields"] || null;

    var tbl = document.createElement("table");
    if(!o.skipStyle) tbl.style.width = "100%";
    tbl.classList.add(this.tableClass);
    
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(title));
    td.classList.add(this.titleClass);
    
    if(!o.skipStyle) td.style.backgroundColor = schm["color"] || "#C0C0C0";
    // if(!o.spikStyle) td.style.color = "#F0F0F0";
    if(!o.skipStyle) td.style.fontWeight = "bold";
    
    td.setAttribute("colspan", "2");
    tr.appendChild(td);
    tbl.appendChild(tr);
    
    if(this.addId === true) tbl.appendChild(this._makeKVPRow("ID", id));
    
    if(fields){
        for (var c in fields) {
            var col = fields[c] || {};
            if(col.hideForm === true) continue;
            var lbl = col.label || c;
            if(typeof col.values === "function"){
                var nd = col.values.call(this, properties[c], properties, feature);
                tbl.appendChild(this._makeKVPRow(lbl, nd));
            } else {
                var val = col.values ? col.values[properties[c]] : properties[c];
                tbl.appendChild(this._makeKVPRow(lbl, val));
            }
        }
    } else {
        for (var a in properties) {
            tbl.appendChild(this._makeKVPRow(a, properties[a]));
        }
    }
    return tbl;
};

GridUtil.prototype.makeFTable = function(features, scheme){
    var sc = typeof scheme === 'string' ? this.getScheme(scheme) : scheme && typeof(scheme) === 'object' ? scheme : { },
        fss = features || [],
        flds = sc["fields"],
        tbl = GridUtil.buildFTable(flds);
        
    for(var r=0; r < fss.length; r++){
        GridUtil.addFeatureToTable(fss[r],flds,tbl);
    }
    return tbl;
};

GridUtil.prototype.makeDetail = function(feature, scheme, template){
    var sc = typeof scheme === 'string' ? this.getScheme(scheme) : scheme && typeof(scheme) === 'object' ? scheme : { },
        flds = sc["fields"];
    var tp = GridUtil.bindFeature(template, feature, flds);
    return tp; //template;
};



