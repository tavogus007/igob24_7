/* 
 * SITUtil para OpenLayers v3/4
 * Autor: Nelson Huanquiri
 * GAMLP 2018
 * ---------------
 * Librerias necesarias
 * ol 5
 * jQuery
 */

if(typeof SITUtil === 'undefined') var SITUtil = {};
if(typeof proj4 != 'undefined'){ 
    proj4.defs("EPSG:32719","+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs"); 
    ol.proj.proj4.register(proj4);
}

SITUtil.getUrlParameter = function(sParam) {
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

SITUtil.grids = {
    epsg32719esc: {
        resolutions: [
            1399.9999999999998,
            699.9999999999999,
            280.0,
            140.0,
            70.0,
            27.999999999999996,
            13.999999999999998,
            6.999999999999999,
            2.8,
            1.4,
            0.7,
            0.27999999999999997,
            0.13999999999999999,
            0.06999999999999999,
            0.034999999999999996
        ],
    
        extent: [
            166021.44309607794,
            1116915.044047609,
            833978.5569039249,
            10000000
        ],
        
        origins: [
            [166021.44309607794, 10076915],
            [166021.44309607794, 10076915],
            [166021.44309607794, 10005235],
            [166021.44309607794, 10005235],
            [166021.44309607794, 10005235],
            [166021.44309607794, 10005235],
            [166021.44309607794, 10001651],
            [166021.44309607794, 10001651],
            [166021.44309607794, 10000217],
            [166021.44309607794, 10000217],
            [166021.44309607794, 10000038],
            [166021.44309607794, 10000002],
            [166021.44309607794, 10000002],
            [166021.44309607794, 10000002],
            [166021.44309607794, 10000002]
        ],
        
        gridNames: [
            'epsg32719esc0',
            'epsg32719esc1',
            'epsg32719esc2',
            'epsg32719esc3',
            'epsg32719esc4',
            'epsg32719esc5',
            'epsg32719esc6',
            'epsg32719esc7',
            'epsg32719esc8',
            'epsg32719esc9',
            'epsg32719esc10',
            'epsg32719esc11',
            'epsg32719esc12',
            'epsg32719esc13',
            'epsg32719esc14'
        ],
        
        matrixSet: 'EPSG:32719scale',
        
        getProjection: function(){
            var projection = ol.proj.get('EPSG:32719');
            var ext = this.extent.slice();
            projection.setExtent(ext);  
            return projection;
        },
        
        getResolutions: function(){
           return this.resolutions.slice(); 
        },
        
        getTileWMTSGrid: function(){
            var _s = this;
            var tgrid = new ol.tilegrid.WMTS({
                tileSize: [256, 256],
                origins: _s.origins.slice(),
                resolutions: _s.resolutions.slice(),
                matrixIds: _s.gridNames.slice()
            });
            return tgrid;
        },
        
        _get_source_wmts: function(o){
            var s = this,
                p = {
                    url: '',
                    layer: '',
                    style: '',
                    matrixSet: s.matrixSet,
                    format: 'image/png',
                    version: '1.0.0',
                    projection: s.getProjection(),
                    tileGrid: s.getTileWMTSGrid()
                };
            if(o && typeof o === 'object') $.extend(p, o);
            return new ol.source.WMTS(p);
        },
        
        getSource: function(url, layer, format){
            var fmt = format || 'image/png',
                s = this,
                o = { url: url, layer: layer, format: fmt };
            return s._get_source_wmts(o);
        }
    }
};

SITUtil.ajax = function (url, onsuccess, onerror, context){
    var self = context || this;

    if (self._request) {
        self._request.abort();
    }

    var ajax = self._request = new XMLHttpRequest();
    ajax.open('GET', url, true);
    if (self._auth) {
        ajax.setRequestHeader("Authorization", "Basic " + self._auth);
    }

    ajax.onload = function() {
        self._request = null;
        onsuccess.call(self, this);
    };

    ajax.onerror = function() {
        self._request = null;
        if (onerror) onerror.call(self);
    };

    ajax.send();
};

SITUtil.mapas = {
    getResolutionForScale: function(scale, units) {
        var u = units || "m",
            dpi = 25.4 / 0.28,
            mpu = ol.proj.Units.METERS_PER_UNIT[u],
            inchesPerMeter = 39.37;
        return parseFloat(scale) / (mpu * inchesPerMeter * dpi);
    },

    getScaleForResolution: function(resolution, units){
        var u = units || "m",
            dpi = 25.4 / 0.28,
            mpu = ol.proj.Units.METERS_PER_UNIT[u],
            scale = resolution * mpu * 39.37 * dpi;
        return scale;
    },

    formatScale: function(scale){
        var s = "";
        if (scale >= 9500 && scale <= 950000) {
            s = Math.round(scale / 1000) + "K";
        } else if (scale >= 950000) {
            s = Math.round(scale / 1000000) + "M";
        } else {
            s = Math.round(scale) + "";
        }
        return s;
    },
    
    getMap: function(){
        
    }
};

SITUtil.capas = {
    GEOSERVER:'/geoserver',
    GWC_SUFIX: '/gwc/service/wmts?',
    
    _get_url_wmts: function(){
        return this.GEOSERVER + this.GWC_SUFIX;
    },
    
    _get_url_wms: function(){
        return this.GEOSERVER + "/wms?";
    },
    
    _get_url_ows: function(){
        return this.GEOSERVER + "/ows?";
    },
    
    _get_url_wfs: function(){
        return this.GEOSERVER + "/wfs?";
    },
    
    _get_wmts_tile: function(p, q){
        var s = this,
            pl = {title: ''},
            qs = { url: s._get_url_wmts() };
        if(p && typeof p === 'object') $.extend(pl, p);
        if(q && typeof q === 'object') $.extend(qs, q);
        pl.source = SITUtil.grids.epsg32719esc._get_source_wmts(qs);
        return new ol.layer.Tile(pl);
    },
    
    _get_source_wms: function(src_opts, wms_opts, untiled){
        var ut = untiled || false,
            url = this._get_url_wms(),
            src_p = { url: url },
            wms_p = { FORMAT: 'image/png', VERSION: '1.1.1', STYLES: '' };
        if(src_opts && typeof src_opts === 'object') $.extend(src_p, src_opts);
        if(wms_opts && typeof wms_opts === 'object') $.extend(wms_p, wms_opts);
        src_p.params = wms_p;
        if(ut == true){
            return new ol.source.ImageWMS(src_p);
        } else {
            return new ol.source.TileWMS(src_p);
        }
    },
    
    getWMTSLayer: function(layer, title, visible, baselayer){
        var tt = (typeof title === 'string') ? title : layer,
            vis = (typeof visible === 'boolean') ? visible : true,
            baslyr = (typeof baselayer === 'boolean') ? baselayer : true,
            p = { title: tt, visible: vis,  baseLayer: baslyr},
            src = { layer: layer };
        return this._get_wmts_tile(p, src);
    },
    
    getGWCMunicipio2: function(o, s){
        var p = { title: 'Mapa Municipio', type:'base' },
            src = { layer: 'g_municipio2' };
        if(o && typeof o === 'object') $.extend(p, o);
        if(s && typeof s === 'object') $.extend(src, s);
        return this._get_wmts_tile(p, src);
    },
    
    getWMSLayerTile: function(lyr_opts, src_opts, wms_opts){
        var lyr_o = { title: '', visible: true };
        if(lyr_opts && typeof lyr_opts === 'object') $.extend(lyr_o, lyr_opts);
        lyr_o.source = this._get_source_wms(src_opts, wms_opts, false);
        return new ol.layer.Tile(lyr_o);
    },
    
    getWMSLayerImage: function(lyr_opts, src_opts, wms_opts){
        var lyr_o = { title: '', visible: true };
        if(lyr_opts && typeof lyr_opts === 'object') $.extend(lyr_o, lyr_opts);
        lyr_o.source = this._get_source_wms(src_opts, wms_opts, true);
        return new ol.layer.Image(lyr_o);
    },
    
    getWMSLayer: function(layer, title, style, visible, untiled, transparent, baselayer){ // lyr obligatorio
        var tt = title || layer,
            st = style || '',
            vis = (typeof visible === 'boolean') ? visible : true,
            untld = (typeof visible === 'boolean') ? untiled : false,
            trans = (typeof transparent === 'boolean') ? transparent : true,
            baslyr = (typeof baselayer === 'boolean') ? baselayer : false,
            lyr_o = {title: tt, visible: vis, baseLayer: baslyr},
            src_o = {},
            wms_o = {LAYERS: layer, STYLES: st, TRANSPARENT: trans};
        if(untld === true){
            return this.getWMSLayerImage(lyr_o, src_o, wms_o);
        } else {
            return this.getWMSLayerTile(lyr_o, src_o, wms_o);
        }
    },
    
    getWMSRasterLayer: function(layer, title, visible, untiled, baselayer){
        var tt = title || layer,
            vis = (typeof visible === 'boolean') ? visible : true,
            untld = (typeof visible === 'boolean') ? untiled : false,
            baslyr = (typeof baselayer === 'boolean') ? baselayer : true,
            lyr_o = {title: tt, visible: vis, baseLayer: baslyr},
            src_o = {},
            wms_o = {LAYERS: layer, TRANSPARENT: false, FORMAT:'image/jpeg'};
        if(untld === true){
            return this.getWMSLayerImage(lyr_o, src_o, wms_o);
        } else {
            return this.getWMSLayerTile(lyr_o, src_o, wms_o);
        }
    }
};

SITUtil.controles = {
    
};