/* global SITUtil */
/* global ol */

function SITLayers(opts){
    this.map = null;
    this.url_wms = SITUtil.capas._get_url_wms();
    this.url_c = "https://ssem.lapaz.bo/geoserver/cementerio/wms?";
    //this.url_cext = "https://ssem.lapaz.bo/geoserver/cementerio/wms";
    this.url_wmts = SITUtil.capas._get_url_wmts();
    //this.url_wms_raster = 'http://192.168.5.68:8080/geoserver/uatg/wms?'; // gmlpsr00036

    this.wms_params = {
        FORMAT:'image/png',
        TRANSPARENT: true,
        VERSION:'1.1.1'
    };
    this.projection = SITUtil.grids.epsg32719esc.getProjection();
    var resols = SITUtil.grids.epsg32719esc.getResolutions();
    this.resolutions = resols;
    this.tilegrids = SITUtil.grids.epsg32719esc.getTileWMTSGrid();
    this.matrixset = SITUtil.grids.epsg32719esc.matrixSet;
    this.tilegrid2 = new ol.tilegrid.TileGrid({
        extent: SITUtil.grids.epsg32719esc.extent,
        resolutions: resols,
        tileSize: [256, 256]
    });
    this.tilegrid_planim = new ol.tilegrid.TileGrid({
        extent: SITUtil.grids.epsg32719esc.extent,
        resolutions: resols,
        tileSize: [512, 256]
    });

    return this;
};

SITLayers.prototype._cloneWmsP = function () {
    return $.extend({}, this.wms_params);
};

SITLayers.prototype.getBaseLayers = function(title, visible, openInLyrSwith){
    var self = this,
        t = title || 'CAPAS BASE',
        vis = (typeof visible === 'boolean') ? visible : true,
        oils = (typeof openInLyrSwith === 'boolean') ? openInLyrSwith : false,
        url = SITUtil.capas._get_url_wms(),
        params = {
            TRANSPARENT: false, 
            FORMAT: 'image/jpeg',
            VERSION: '1.1.1',
            STYLES: ''
        },
        layers = [
            new ol.layer.Tile({
                title: 'Kompsat 2018',
                description: 'Imagen satelital Kompsat del año 2018',
                visible: false,
                baseLayer: true,
                source: new ol.source.TileWMS({
                    url: url,
                    serverType: 'geoserver',
                    crossOriginKeyword: 'anonymous',
                    params: $.extend({}, params, {LAYERS: 'raster:kompsat_2018'})
                })
            })
        ];

    layers.push(
        new ol.layer.Tile({
            title: 'Mapa Riesgo 2011',
            visible: false,
            baseLayer: true,
            description: 'Mapa de riesgos elaborado en la gestión 2011, fuente de información GAMLP-SMGIR',
            source: new ol.source.WMTS({
                url: self.url_wmts,
                layer: 'g_riesgos_2011', //g_municipio2
                matrixSet: self.matrixset,
                format: 'image/png',
                projection: self.projection,
                tileGrid: self.tilegrids
            })
        })
    );
    layers.push(
        new ol.layer.Tile({
            title: 'Municipio de La Paz',
            visible: false,
            baseLayer: true,
            opacity: 0.75,
            source: new ol.source.WMTS({
                url: self.url_wmts,
                layer: 'g_municipio3', //g_municipio2
                matrixSet: self.matrixset,
                format: 'image/png',
                projection: self.projection,
                tileGrid: self.tilegrids
            })
        })
    );
    layers.push(
       new ol.layer.Tile({
           title: 'Google Maps',
           baseLayer: true,
           visible: true,
           source: new ol.source.XYZ({
               url: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
           })
       })
    );
    layers.push(
        new ol.layer.Tile({
            title: 'Google Satellite',
            baseLayer: true,
            visible: false,
            source: new ol.source.XYZ({
                url: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
            })
        })
    );
    layers.push(
        new ol.layer.Tile({
            title: 'Open Street Map',
            visible: false,
            baseLayer: true,
            opacity: 0.5,
            source: new ol.source.OSM()
        })
    );
    return new ol.layer.Group({
        title: t,
        description: 'Las capas base se usan como fondo sobre el que se dibujarán las capas temáticas.',
        visible: vis,
        openInLayerSwitcher: oils,
        layers: layers,
        noSwitcherDelete: true
    });
};
SITLayers.prototype.getDatcLayers = function (title, visible, openInLyrSwith) {
    var self = this,
        t = title || 'CATASTRO, PLANIMETRIAS',
        vis = visible || false,
        oils = openInLyrSwith || false;
    
    return new ol.layer.Group({
        title: t,
        visible: vis,
        openInLayerSwitcher: oils,
        layers: [
            new ol.layer.Tile({
                title:'Planimetrias',
                maxResolution: SITUtil.mapas.getResolutionForScale(100000.0, "m"),
                description: 'Planimetrias vigentes, fuente de información SMPD-DATC',
                queryMode: 'wms',
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    ratio: 1.0,
                    //params: $.extend({LAYERS:'archivo:planimetrias_SC', STYLES:'planimetria_estado'}, self.wms_params),
                    params: $.extend({ LAYERS: 'archivo:planimetrias' }, self.wms_params),
                    //serverType: 'geoserver',
                    //crossOrigin: 'anonymous',
                    tileGrid: self.tilegrid_planim
                })
            }), 
            new ol.layer.Tile({
                title:'Manzanas Codigos',
                visible: false,
                maxResolution: SITUtil.mapas.getResolutionForScale(10000.0, "m"),
                description:'Codigos de Manza catastro',
                queryMode: 'wms',
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({LAYERS:'manzanas', STYLES:'ct_manzanas_u3'}, self.wms_params),
                    //crossOrigin: 'anonymous',
                    tileGrid: self.tilegrid2
                })
            }),
            new ol.layer.Tile({
                title:'Vias Catastro',
                visible: false,
                maxResolution: SITUtil.mapas.getResolutionForScale(25000.0, "m"),
                description:'Registro vial de catastro',
                queryMode: 'wms',
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({LAYERS:'catastro:vias2', STYLES:'ct_vias2'}, self.wms_params),
                    //crossOrigin: 'anonymous',
                    tileGrid: self.tilegrids
                })
            })
        ]
    });
};
SITLayers.prototype.getOverLayers = function (title, visible, openInLyrSwith) {
    var self = this,
        t = title || 'MACRODISTRITOS',
        vis = visible || false,
        oils = openInLyrSwith || false;

    return new ol.layer.Group({
        title: t,
        visible: vis,
        openInLayerSwitcher: oils,
        layers: [
            new ol.layer.Tile({
                title:'Macrodistritos 2019',
                visible: true,
                //maxResolution: SITUtil.mapas.getResolutionForScale(10000.0, "m"),
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({ LAYERS: 'lapaz:macrodistritos_2019', STYLES: 'lp_macrodistritos2019' }, self.wms_params),
                    //serverType: 'geoserver',
                    serverType: 'geoserver',
                    crossOriginKeyword: 'anonymous',
                    tileGrid: self.tilegrids
                })
            })
            
        ]
    });
};

SITLayers.prototype.getCementerioLayers = function (opts) {
    var self = this,
        op = opts || {},
        t = op.title || 'CEMENTERIO',
        vis = op.visible || true,
        oils = op.openInLayerSwitcher || false,
        esZonaHom = op.mapaZonaValor || false,
        esZonaRef = op.mapaZonaReferencial || false,
        styManzana = esZonaRef ? 'ct_manzanas_zona2019' : 'ct_manzanas_ac2019',
        escalaManzana = esZonaRef ? 25000.0 : 10000.0;

    return new ol.layer.Group({
        title: t,
        visible: vis,
        openInLayerSwitcher: oils,
        layers: [
            new ol.layer.Image({
                title:'Perimetro',
                visible:  true,
                baseLayer: true,
                maxResolution: SITUtil.mapas.getResolutionForScale(100000.0, "m"),
                description:'',
                queryMode: 'wms',
                source: new ol.source.ImageWMS({
                    url: self.url_c,
                    params: $.extend({ LAYERS: 'cementerio:cementerio_perimetro' }, self.wms_params),
                    serverType: 'geoserver',
                    crossOriginKeyword: 'anonymous',
                    tileGrid: self.tilegrid2
                })
            }),
            new ol.layer.Image({
                title:'Poligonos',
                visible:  true,
                maxResolution: SITUtil.mapas.getResolutionForScale(100000.0, "m"),
                description:'',
                queryMode: 'wms',
                source: new ol.source.ImageWMS({
                    url: self.url_c,
                    params: $.extend({ LAYERS: 'cementerio:cementerio_bloques' }, self.wms_params),
                    serverType: 'geoserver',
                    crossOriginKeyword: 'anonymous',
                    tileGrid: self.tilegrid2
                })
            })
        ]
    });
};


