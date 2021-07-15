/* global SITUtil */
/* global ol */

function SITLayers(opts){
    this.map = null;
    this.url_wms = SITUtil.capas._get_url_wms();
    this.url_wmts = SITUtil.capas._get_url_wmts();
    this.url_wms_raster = 'http://192.168.5.68:8080/geoserver/uatg/wms?'; // gmlpsr00036

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
                title: 'Ortofotos 1994',
                description: 'Ortofotos realizadas con imagenes de la Restitucion Hansa Luftbild del año 1994',
                visible: false,
                baseLayer: true,
                source: new ol.source.TileWMS({
                    url: url,
                    params: $.extend({}, params, {LAYERS: 'raster:Ortofotos1994'})
                })
            }),
            
            new ol.layer.Tile({
                title: 'QuickBird 2003',
                description: 'Imagen satelital QuickBird del año 2003',
                visible: false,
                baseLayer: true,
                source: new ol.source.TileWMS({
                    url: 'http://192.168.5.68:8080/geoserver/raster/wms',
                    params: $.extend({}, params, {LAYERS: 'raster:quickbird2003'})
                })
            }),
            
            new ol.layer.Tile({
                title: 'Ortofotos 2006',
                description: 'Ortofotos IGM del año 2006 utilizadas para la restitucion 2006',
                visible: false,
                baseLayer: true,
                source: new ol.source.TileWMS({
                    url: url,
                    params: $.extend({}, params, {LAYERS: 'raster:ortofotos2006'})
                })
            }),
            
            new ol.layer.Tile({
                title: 'World view 2011',
                description: 'Imagen satelital WorldView del año 2011',
                visible: false,
                baseLayer: true,
                source: new ol.source.TileWMS({
                    url: url,
                    params: $.extend({}, params, {LAYERS: 'raster:worldview2011'})
                })
            }),
            
            new ol.layer.Tile({
                title: 'GeoEye 2013',
                description: 'Imagen satelital GeoEye del año 2013',
                visible: false,
                baseLayer: true,
                source: new ol.source.TileWMS({
                    url: url,
                    params: $.extend({}, params, {LAYERS: 'raster:geoeye2013'})
                })
            }),
            
            new ol.layer.Tile({
                title: 'Kompsat 2018',
                description: 'Imagen satelital Kompsat del año 2018',
                visible: false,
                baseLayer: true,
                source: new ol.source.TileWMS({
                    url: url,
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
            visible: true,
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
    /*
            new ol.layer.Tile({
                title:'Lotes Catastro',
                visible: true,
                maxResolution: SITUtil.mapas.getResolutionForScale(10000.0, "m"),
                description:'Codificación catastral vigente, fuente de información SMPD-DATC',
                queryMode: 'wms',
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({LAYERS:'catastro:lotes_SC', STYLES:'ct_lote4'}, self.wms_params),
                    crossOrigin: 'anonymous',
                    tileGrid: self.tilegrid2
                })
            }),
      */      
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
            })
            ,
            
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
            /*,
            
            new ol.layer.Tile({
                title:'Lotes segun levantamiento (sc)',
                visible: false,
                maxResolution: SITUtil.mapas.getResolutionForScale(10000.0, "m"),
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({LAYERS:'catastro:lotesestados_SC', STYLES:'ct_lote_tipolev'}, self.wms_params),
                    serverType: 'geoserver',
                    tileGrid: self.tilegrids
                })
            }),
            
            new ol.layer.Tile({
                title:'Lotes tipo predio (sc)',
                visible: false,
                maxResolution: SITUtil.mapas.getResolutionForScale(10000.0, "m"),
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({LAYERS:'catastro:lotesestados_SC', STYLES:'ct_lote_tipopredio'}, self.wms_params),
                    serverType: 'geoserver',
                    tileGrid: self.tilegrids
                })
            })
            */
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
            /*
            new ol.layer.Tile({
                title: 'Planimetrias',
                visible: false,
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
    
            //new ol.layer.Tile({
            //    title:'Lotes Catastro',
            //    visible: true,
            //    maxResolution: SITUtil.mapas.getResolutionForScale(10000.0, "m"),
            //    description:'Codificación catastral vigente, fuente de información SMPD-DATC',
            //    queryMode: 'wms',
            //    source: new ol.source.TileWMS({
            //        url: self.url_wms,
            //        params: $.extend({LAYERS:'catastro:lotes', STYLES:'ct_lote4'}, self.wms_params),
            //        crossOrigin: 'anonymous',
            //        tileGrid: self.tilegrid2
            //    })
            //}),
            new ol.layer.Tile({
                title: 'Predios',
                visible: true,
                maxResolution: SITUtil.mapas.getResolutionForScale(10000.0, "m"),
                description: 'Codificación catastral vigente, fuente de información SMPD-DATC',
                queryMode: 'wms',
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({ LAYERS: 'catastro:lotes', STYLES: 'sld_predio' }, self.wms_params),
                    crossOrigin: 'anonymous',
                    tileGrid: self.tilegrid2
                })
            }),
      
            new ol.layer.Tile({
                title: 'Manzanas Codigos',
                visible: false,
                maxResolution: SITUtil.mapas.getResolutionForScale(10000.0, "m"),
                description: 'Codigos de Manza catastro',
                queryMode: 'wms',
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({ LAYERS: 'manzanas', STYLES: 'ct_manzanas_u3' }, self.wms_params),
                    //crossOrigin: 'anonymous',
                    tileGrid: self.tilegrid2
                })
            })
            ,

            new ol.layer.Tile({
                title: 'Vias Catastro',
                visible: false,
                maxResolution: SITUtil.mapas.getResolutionForScale(25000.0, "m"),
                description: 'Registro vial de catastro',
                queryMode: 'wms',
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({ LAYERS: 'catastro:vias2', STYLES: 'ct_vias2' }, self.wms_params),
                    //crossOrigin: 'anonymous',
                    tileGrid: self.tilegrids
                })
            })
            ,
            
            new ol.layer.Tile({
                title: 'Distritos Municipales 2019',
                visible: false,
                //maxResolution: SITUtil.mapas.getResolutionForScale(10000.0, "m"),
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({ LAYERS: 'lapaz:distritos_2019', STYLES: 'lp_distritos2019' }, self.wms_params),
                    serverType: 'geoserver',
                    tileGrid: self.tilegrids
                })
            }),*/
            
            new ol.layer.Tile({
                title:'Macrodistritos 2019',
                visible: true,
                //maxResolution: SITUtil.mapas.getResolutionForScale(10000.0, "m"),
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({ LAYERS: 'lapaz:macrodistritos_2019', STYLES: 'lp_macrodistritos2019' }, self.wms_params),
                    serverType: 'geoserver',
                    tileGrid: self.tilegrids
                })
            })
            
        ]
    });
};
SITLayers.prototype.getCatastroLayers = function(opts){
    var self = this,
        op = opts || {},
        t = op.title || 'CATASTRO',
        vis = op.visible || false,
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
            new ol.layer.Tile({
                title:'Zonas Homogeneas',
                visible:  esZonaHom,
                maxResolution: SITUtil.mapas.getResolutionForScale(100000.0, "m"),
                description:'Zonas homogeneas o zonas de valor vigentes',
                queryMode: 'wms',
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({LAYERS:'catastro:zonasvalor2015', STYLES:'ct_zonas_valor'}, self.wms_params),
                    crossOrigin: 'anonymous',
                    tileGrid: self.tilegrid2
                })
            }),
            new ol.layer.Tile({
                title:'Lotes predios',
                visible: !esZonaHom, // true,
                maxResolution: SITUtil.mapas.getResolutionForScale(5000.0, "m"),
                description:'Registro de lotes catastrales',
                queryMode: 'wms',
                wmsStyles: {
                    'ct_lote_ac2019': {title: 'Codigo lote', desc: 'Numeros de lote asignados'},
                    'ct_lote4': {title: 'Estado predio certificado', desc: 'Predios segÃºn estado de certificaciÃ³n'},
                    'ct_lote_tipolev':{title: 'Tipo levantamiento', desc: 'Predios segÃºn el tipo de levantamiento'},
                    'ct_lote_tipopredio':{title: 'Tipo de predio', desc: 'Tipo predio unifamiliar, PH y otros'}
                },
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({LAYERS:'catastro:lotesestados', STYLES:'ct_lote_ac2019'}, self.wms_params),
                    crossOrigin: 'anonymous',
                    tileGrid: self.tilegrid2
                })
            }),

            new ol.layer.Tile({
                title:'Numeros de puerta',
                visible: false,
                maxResolution: SITUtil.mapas.getResolutionForScale(2500.0, "m"),
                description:'Recopilacion de numeros de puerta (actualizado al 2016)',
                queryMode: 'wms',
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({LAYERS:'sit:numeropuertas', STYLES:'sit_numeropuerta'}, self.wms_params),
                    crossOrigin: 'anonymous',
                    tileGrid: self.tilegrids
                })
            }),

            new ol.layer.Tile({
                title:'Manzanas',
                visible: !esZonaHom, //true,
                maxResolution: SITUtil.mapas.getResolutionForScale(escalaManzana, "m"), //10000.0
                description:'Manzanas registrados o deslindados',
                queryMode: 'wms',
                opacity: 0.75,
                wmsStyles: {
                    'ct_manzanas_ac2019':{ title:'Codigos de manzana', desc:'Codigos asignados a las manzanas' },
                    'ct_manzanas_zona2019':{ title:'Zonas declaradas', desc:'Manzanas segÃºn zona declarada por el administrado' },
                    'ct_manzanas_serv2019':{ title:'Nro. de Servicios', desc:'Manzanas segÃºn acceso a servicios' }
                },
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({LAYERS:'manzanas_zona', STYLES: styManzana}, self.wms_params), // 'ct_manzanas_ac2019'
                    crossOrigin: 'anonymous',
                    tileGrid: self.tilegrid2
                })
            }),

            new ol.layer.Tile({
                title:'Vias Catastro',
                visible: true,
                maxResolution: SITUtil.mapas.getResolutionForScale(25000.0, "m"),
                description:'Registro vial de catastro',
                queryMode: 'wms',
                /*
                wmsStyles: {
                    ct_vias_ac2019: { title:'Nombre de via', desc:'Registro vial catastro, nominaciÃ³n de vÃ­as' },
                    ct_vias_mat2019: { title:'Material vial', desc:'Vias segÃºn material de vÃ­a declarado' },
                    ct_vias_tipo2019: { title:'Tipo de vÃ­a', desc:'Vias segÃºn tipo ej. Avenida, Calle, etc' },
                    ct_vias_aprob2019: { title:'Vias con Ordenanza', desc:'Vias segÃºn instrumento de aprobaciÃ³n' }
                },
                */
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({LAYERS:'catastro:vias2', STYLES:'ct_vias_ac2019'}, self.wms_params),
                    crossOrigin: 'anonymous',
                    tileGrid: self.tilegrids
                })
            }),

            new ol.layer.Tile({
                title:'Distritos Catastrales',
                visible: !esZonaHom && !esZonaRef, //true,
                maxResolution: SITUtil.mapas.getResolutionForScale(250000.0, "m"),
                description:'Distritos catastrales vigentes',
                queryMode: 'wms',
                source: new ol.source.TileWMS({
                    url: self.url_wms,
                    params: $.extend({LAYERS:'catastro:distritoscatastrales2', STYLES:'ct_distritoscat_ac2019'}, self.wms_params),
                    crossOrigin: 'anonymous',
                    tileGrid: self.tilegrids
                })
            })



        ]
    });
};







