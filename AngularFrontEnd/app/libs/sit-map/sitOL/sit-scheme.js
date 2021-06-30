/* global UATGMap */
function SITScheme(map, popup, url_wms){
    this.map = map;
    this.popup = popup;
    var url = url_wms || SITUtil.capas._get_url_wms();
    this.url = url;
    this.grid = new GridUtil({schemes: SITScheme.scheme});
    this.image_source = new ol.source.ImageWMS({
        url: url,
        params:{
            FORMAT:'image/png',
            TRANSPARENT: true,
            VERSION:'1.1.1',
            STYLES:'polygon,polygon', //,line
            LAYERS:'uatg:mascaras_mosaicos' //,uatg:restitucion_irpavi_poligonos' //,uatg:restitucion_irpavi_lineas
        }
    });
}

SITScheme.prototype.showPopup = function(evt){
    var _this = this;
    var viewResolution = (this.map.getView().getResolution());
    /*
    if(viewResolution > 0.06999999999999999){
        viewResolution = 0.06999999999999999;
    }
    */
    var content = $("<div></div>").addClass('panel-info-lusu'); // .css({minWidth:'280px', 'maxWidth':'280px','overflow':'auto', 'maxHeight':'280px', 'minHeight':'200px'});
    var c_main = $("<div></div>").appendTo(content);
    this.popup.show(evt.coordinate, content[0]);
    var url = this.image_source.getGetFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:32719', {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT':20});
    if (url) { 
        fetch(url).then(function(response) {
            return response.text();
        }).then(function(response) {
            var data = JSON.parse(response);
            c_main.html(  '<h4>Información</h4>' );

            if (data && data.type 
                    && data.type === "FeatureCollection" 
                    && data.features && data.features.length > 0) {
                for (var i = 0; i < data.features.length; i++) {
                    var o = data.features[i];
                    var fid = o["id"];
                    if(typeof fid === 'undefined') continue;
                    var tbl = _this.grid.makePropGrid(o,null,{skipStyle:true});
                    c_main.append(tbl);
                }
            }
        });
    }
};

SITScheme.scheme = {
    /*
    //fid	cuadrante	area	nombre	direccion
    "mascaras_mosaicos":{
       title: "Mascaras mosaicos",
       description: null,
       color: "",
       fields:{
           "area":{
               
           },
           "mosaico":{
               
           },
           "fecha":{
               
           },
           "descarga": {
                label:" ",
                values: function(v,d,f){
                    var n = d["mosaico"],
                        f = "//gmlpsr0063/publicacion_mosaicos/" + n + "",
                        a = $("<a></a>").text("Descargar 10cm").attr({href:'javascript:void(0);', target:'_blank'}).on('click',
                            {url:f},
                            function(e){
                                UATGMap.openNewWindow("/SitUtil/getOrtomosaico.jsp?mosaico=" + e.data.url,'_blank');
                            }
                        );
                        //console.log(f);
                    return a.get(0);
                }
            },
            "descarga2": {
                label:" ",
                values: function(v,d,f){
                    var n = d["mosaico"],
                        f = "//gmlpsr0063/publicacion_mosaicos/05cm/" + n + "",
                        a = $("<a></a>").text("Descargar 5cm").attr({href:'javascript:void(0);', target:'_blank'}).on('click',
                            {url:f},
                            function(e){
                                UATGMap.openNewWindow("/SitUtil/getOrtomosaico.jsp?mosaico=" + e.data.url,'_blank');
                            }
                        );
                        //console.log(f);
                    return a.get(0);
                }
            }
       }
    },
    "mosaicos_q": {
        title: "Mosaicos",
        description: null,
        color: "",
        fields: {
            "cuadrante": {
                
            },
            "area": {
                
            },
            "nombre": {
                
            },
            "direccion": {
                values: function(v,d,f){
                    return v.substr(0,25) + "...";
                }
            },
            "descarga": {
                label:" ",
                values: function(v,d,f){
                    var n = d["nombre"],
                        r = d["direccion"].replace(/^\\archivopicture\\/,'').replace(/\\/g,'/'),
                        f = "//gmlpsr0063/archivopicture/01_RIO_IRPAVI/" + r + "/" + n + ".tif",
                        a = $("<a></a>").text("Descargar Ortomosaico").attr({href:'javascript:void(0);', target:'_blank'}).on('click',
                            {url:f},
                            function(e){
                                UATGMap.openNewWindow("/SitUtil/getOrtomosaico.jsp?mosaico=" + e.data.url,'_blank');
                            }
                        );
                        //console.log(f);
                    return a.get(0);
                }
            }
        }
    },
    "restitucion_irpavi_poligonos":{
        title: "Lotes Restituidos",
        fields:{
           
            cod_cat: {

            },
            distrito: {

            },
            manzano: {

            },
            lote: {

            },
            sup_ag: {
                label: "Superficie"
            }
        }
    },
    
    "franjas_kantutani":{
        title: "Franjas deslizamiento Kantutani",
        fields:{
            tipo: { label:"Franja"},
            descripcio: {label:"Descripción"},
            Layer: {}
        }
    },
    
    "kantutani_fases_area":{
        title:"Areas Fases reahabilitacion",
        fields:{
            "FASE":{label:"Fase"},
            "idfases":{}
        }
    },
    
    "vw_PredioGeo":{
        title: "Predios Kantutani",
        fields:{
            IdPredio:{
                
            },
            nombreSector:{
                
            },
           
            DescFranja:{
                label: "Franja"
            },
            idFranja:{
                
            },
            idfases:{
                
            },
            
            familias:{
                label:" ",
                values: function(v, d, f){
                    var idp = d["IdPredio"],
                        a = $("<a></a>").text("Ver familias").attr({href:'javascript:void(0);'}).on('click',
                            {IdPredio:idp, url: "/SitUtil/SitRiesgoData.jsp?idpredio=" + idp},
                            function(e){
                                $("#wmsinfo").empty();
                                $.ajax(e.data.url).done(function(req){
                                   
                                    $("#wmsinfo").empty();
                                    mostrarPropietarios(req);
                                });
                            }
                        );
                    return a.get(0);
                }
            }
        }
    }
    */
};

function mostrarPropietarios(d){
    var o = $.parseJSON(d);
    var text = "";
    var p = null;
    var f = null;
    for(var i=0; i < o.length; i++){
        var r = o[i];
        if(p != r["IdPredio"]){
            text += [r["IdPredio"], r["Propietarios"]].join(" | ") + "\n";
            p = r["IdPredio"];
        }
        if(f != r["IdFamilia"]){
            text += "    " + [r["IdFamilia"], r["DescFamilia"], r["DescTenencia"]].join(" | ") + "\n";
            f = r["IdFamilia"];
        }
        text += "        " + r["Nombre"] + "\n";
    }
    $("<pre></pre>").text(text).appendTo("#wmsinfo");
}

SITSearch.prototype.getIdPredioKantutani = function(placeholder, maxItems){
    var self = this,
        plhdr = placeholder || 'Lotes Kantutani',
        maxitems = maxItems || 10,
        o;
    o = {
        url: "http://gmlpsr00036:8080/geoserver/lapaz/wfs?",
        maxItems: maxitems,
        placeholder: plhdr,
        getTitle: function (f)
        {
            var p = f.properties,
                zr = p["IdPredio"],
                md = p["DescFranja"];

            return "<b>" + zr+ "</b>, <i>" + md + "</i>";
        },
        requestData: function (s){
            var query = "IdPredio = " + s + ""; 

            return $.extend( self.cloneWfsParams(), {
                typeName:'lapaz:vw_PredioGeo',
                cql_filter: query,
                maxFeatures: maxitems
            });
        }
    };
    return o;
};


