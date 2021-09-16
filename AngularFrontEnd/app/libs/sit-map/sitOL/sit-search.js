if(typeof sit === 'undefined') var sit = {};

sit.Search = function(options)
{	
    var self = this;
    if (!options) options = {};
    
    var element = document.createElement("div");
    var classNames = (options.className||"")+ " ol-search-sit";
    if (!options.target)
    {	
        classNames += " ol-unselectable ol-control ol-collapsed";
        this.button = document.createElement("button");
        this.button.setAttribute("type", "button");
        this.button.setAttribute("title", options.label||"Buscar...");
        this.button.addEventListener("click", function(){
            element.classList.toggle("ol-collapsed");
            if(self.current == null) {
                self._change($(self.selectEl).val());
            }
            if (!element.classList.contains("ol-collapsed")){
                var nods = element.querySelector("input.search");
                if(nods) nods.focus();
            }
        });
        element.appendChild(this.button);
    }
    element.setAttribute('class', classNames);
    
    // select option
    var sel_opt = document.createElement("select");
    
    sel_opt.addEventListener('change', function(e){
        self._change(e.target.value);
    }, false);
    element.appendChild(sel_opt);
    this.selectEl = sel_opt;
    
    var pnl = document.createElement("div");
    element.appendChild(pnl);
    this.panelSearch = pnl;
    
    this.searchControls = { };
    this.current = null;
    
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(sit.Search, ol.control.Control);

sit.Search.prototype._addOption = function(v){
    var op = document.createElement("option");
    op.setAttribute("value", v);
    op.appendChild(document.createTextNode(v));
    this.selectEl.appendChild(op);
};

sit.Search.prototype._handleResponse = function(response, cback){
    return response.features;
};

sit.Search.prototype._requestData = function(s){
    return {
        service: 'WFS',
        version: '1.0.0',
        request:'GetFeature',
        typeName:'sit:toponimia',
        srsName:'EPSG:32719',
        cql_filter: encodeURIComponent("nombre ILIKE '%" + s + "%'"),
        outputFormat:"application/json",
        maxFeatures:20
    };
};
        
sit.Search.prototype._change = function(k){
    var map = this.getMap(),
        o = this.searchControls[k] || null;
    if(this.current != null && map){
        map.removeControl(this.current.control);
        this.panelSearch.removeChild(this.current.element);
    }
    this.current = o;
    
    if(this.current){
        this.current.control.setTarget(this.current.element);
        this.panelSearch.appendChild(this.current.element);
        if(map) map.addControl(this.current.control);
    }
    
    if (!this.element.classList.contains("ol-collapsed")){
        var nods = this.element.querySelector("input.search");
        if(nods) nods.focus();
    }
};

sit.Search.prototype.addSearch = function(key, opts, activar){
    var self = this,
        o = opts || {},
        k = key || "Busqueda ",
        div = document.createElement("div");
    if(typeof opts.setTarget === 'function'){
        opts.setTarget(div);
        $(opts.element).removeClass("ol-unselectable ol-control ol-collapsed");
        $("button", opts.element).remove();
        this.searchControls[k] = { control:o, element: div };
        this._addOption(k);
        if(activar === true){
            $(this.selectEl).val(key).change();
        }
    } else {
        var fnSel = o.onSelect || function(e){ self.onSelect.call(self, e); };
        if(typeof o.handleResponse === 'undefined') o.handleResponse = this._handleResponse;
        o.target = div;
        
        var srch = new ol.control.SearchJSON(o);
        srch.on('select', fnSel);
        if(typeof o.requestData === 'function'){
            srch.requestData = o.requestData;
        }
        this.searchControls[k] = { control:srch, element: div };
        this._addOption(k);
        if(activar === true){
            $(this.selectEl).val(key).change();
        }
    }
};

sit.Search.prototype.onSelect = function(e){
    var map = this.getMap(),
        fmtjson = new ol.format.GeoJSON(),
        geom = fmtjson.readGeometry(e.search.geometry);
    if(geom.getType() === "Point"){
        map.getView().animate({
            center: geom.getCoordinates(),
            zoom: Math.max (map.getView().getZoom(),11)
        });
    } else {
        var extent = geom.getExtent();
        map.getView().fit(extent,{size: map.getSize(), duration:1000, easing: ol.easing.easeOut} );
    }
    return;
};
