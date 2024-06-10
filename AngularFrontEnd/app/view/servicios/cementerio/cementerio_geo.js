var app = angular.module('myApp', ['ngAnimate', 'ui.bootstrap']);
app.service('servicios', function ($http, $q) {
    this.tkn = function () {
        var params = jsonURLS.CREDENCIAL_CARONTE;
        var deferred = $q.defer();
        $http.post(jsonURLS.CONEXION_CARONTE + "/gntkn", JSON.stringify(params)).success(function (data) {
            
            //sessionService.set('tkn_caronte',data.token);
            deferred.resolve(data);
        })
            .error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    this.busqueda = function (tkn, _ci, _paterno, _materno, _casada, _nombre, _idf) {
        console.log(_ci, _paterno, _materno, _casada, _nombre, _idf);
        var params = Object();
        params.xidf = _idf;
        params.xnomb = _nombre;
        params.xpat = _paterno;
        params.xmat = _materno;
        params.xcas = _casada;
        params.xci = _ci;
        var deferred = $q.defer();
        var config = { headers: { 'Authorization': 'Bearer ' + tkn } };
        $http.post(jsonURLS.CONEXION_CARONTE + "/srv.09.23/cementerio/geo_bsq_fall", JSON.stringify(params), config).success(function (data) {
                //console.log('data encontrada de fall', data);
                if (data.length > 0) {
                   
                    deferred.resolve(data);
                }
                else {
                    swal('Atención', 'No se encontraron datos', 'warning');
                }

            })
            .error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    this.busquedaId = function (tkn, _idf) {
        console.log(_idf);
        var params = Object();
        params.xidf = _idf;
        var deferred = $q.defer();
        var config = { headers: { 'Authorization': 'Bearer ' + tkn } };
        $http.post(jsonURLS.CONEXION_CARONTE + "/srv.09.23/cementerio/geo_bsq_fall_idf", JSON.stringify(params), config)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
})
app.controller('cementerioGeoController', function ($scope, $rootScope, $http, servicios) {
    //=======================
    $scope.offsety=0.000033;///0.000027
    $scope.offsetx=0.000034;///0.000030
    $scope.offsetyTTM=0.000033;///0.000027
    //=====================
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    //============================
    function toDataURL(src, callback) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL('image/jpeg');
        callback(dataURL);
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
        }
    }

    var img64 = toDataURL('imgPos.jpg',function(dataUrl) {$scope.img64=dataUrl})
    //=================================
    $scope.mapa = {
        estado: null,
        estadoView: null,
        acciones: {
            iniciar: function () {
                var image = new ol.style.Circle({
                    radius: 8,
                    fill: new ol.style.Fill({ color: 'red' }),
                    stroke: new ol.style.Stroke({ color: 'red', width: 1 })
                });
                var styles = {
                    'Point': new ol.style.Style({
                        image: image
                    })
                };
                $scope.tooltip = new ol.Overlay.Tooltip();
                $scope.mapPopupContainer = document.getElementById('popup');
                $scope.mapPopupContent = document.getElementById('popup-content');
                $scope.mapPopupCloser = document.getElementById('popup-closer');
                $scope.mapPopupCloser.onclick = function () {
                    $scope.overlay.setPosition(undefined);
                    $scope.mapPopupCloser.blur();
                    return false;
                };
                $scope.overlay = new ol.Overlay({
                    element: $scope.mapPopupContainer,
                    autoPan: true,
                    autoPanAnimation: {
                        duration: 250,
                    },
                });

                //Mapa
                lays = new SITLayers();
                $scope.m_app = new SITMap();
                var center = [590560.091, 8175936.283];
                //tottemPing = [-68.151167,-16.495745]; //iglesia
                tottemPing = [-68.153080,-16.495900];
                tottemPing2 = [-68.151167,-16.495754];
                //tottem = [-68.151130,-16.495760];//iglesia
                tottem = [-68.153080,-16.495900];
                //'-68.151167,-16.495754'
                //var zoom = 11.2;
                var zoom = 11.2;
                
                $scope.TottemArray = [];
                $scope.featuresArray = [];
                $scope.LineArray = [];
                pcoord1 = ol.proj.fromLonLat(tottem,ol.proj.get('EPSG:32719'));
                pcoord2 = ol.proj.fromLonLat(tottemPing,ol.proj.get('EPSG:32719'));
                
                coord_msg=tottem;
                coord_msg[0]=coord_msg[0]+$scope.offsetyTTM;
                pcoord_msg = ol.proj.fromLonLat(coord_msg,ol.proj.get('EPSG:32719'));
                //$scope.offsetyTTM
                $scope.mapPopupContent.innerHTML = '<p>USTED ESTA AQUÍ</p>';
                $scope.overlay.setPosition(pcoord_msg);
                //console.log(pcoord1);
                $scope.TottemArray.push(new ol.Feature({geometry: new ol.geom.Point(pcoord1)}));
                $scope.TottemLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: $scope.TottemArray
                    }),
                    style: new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            src: '/app/view/servicios/cementerio/person.png'
                        })
                    })
                });

                $scope.vectorLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: $scope.featuresArray
                    }),
                    style: new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            src: '/libs/img/point_icon.png'
                        })
                    })
                });

                var lightStroke = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: [255, 255, 0, 0.6],//amarillo, fondo
                        width: 10,
                        lineDash: [4,8],
                        lineDashOffset: 6
                    })
                    });
                var darkStroke = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: [220, 69, 0, 0.8], //rojo, frente
                        width: 6,
                        lineDash: [4,8]
                    })
                });
                $scope.LineLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: $scope.LineArray
                    }),
                    style: [lightStroke, darkStroke]
                });

                $scope.map = $scope.m_app.build(center, zoom, [
                    //lays.getBaseLayers(null, true, true),
                     lays.getCementerioLayers({ visible: true, openInLayerSwitcher: true })
                    ,$scope.vectorLayer
                    ,$scope.LineLayer
                    ,$scope.TottemLayer
                ]);
                
                $scope.orientacion = getParameterByName('o');
                let rotacion = 4.66;//de lado
                if($scope.orientacion=="frente"){
                    rotacion = 3.1;//de frente
                }
                $scope.map.getView().setRotation(rotacion);
                //($scope.m_app.createLayerSwitcher()).hide(); //menu
                $scope.m_app.createControlBar(null);

                $scope.map.addOverlay($scope.overlay);

                $scope.map.getControls().getArray()[6].extent=[ 590424,8175944 , 590700,8175947 ]
                search_style = [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgb(255, 255, 0, 0.8)'
                            , width: 5

                        }),
                        // fill: new ol.style.Fill({color: 'rgba(128, 255, 255, 0.2)'}),
                        image: new ol.style.Circle({
                            // fill: new ol.style.Fill({color: 'rgba(128, 255, 255, 0.4)'}),
                            stroke: new ol.style.Stroke({ color: 'rgba(255, 255, 0, 0.9)', width: 4 }),
                            radius: 7
                        })
                    }),
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(200, 0, 0, 0.6)'
                            , width: 2
                            , lineDash: [4, 4]
                            // , lineDash: [6, 4]
                        }),
                        fill: new ol.style.Fill({ color: 'rgba(255, 255, 0, 0.1)' }),
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({ color: 'rgba(255, 255, 0, 0.4)' }),
                            stroke: new ol.style.Stroke({ color: 'rgba(200, 0, 0, 0.9)', width: 1.2 }),
                            radius: 6
                        })
                    })
                ];

                $scope.vlayer = new ol.layer.Vector({
                    title: 'busquedas',
                    visible: true,
                    style: search_style,
                    displayInLayerSwitcher: false,
                    allwaysOnTop: true,
                    source: new ol.source.Vector({ wrapX: false })
                });
                $scope.map.addLayer($scope.vlayer);
                $scope.geolocation = new ol.Geolocation({
                    trackingOptions: {
                    enableHighAccuracy: true
                    },
                    projection: 'EPSG:32719'
                });
                $scope.geolocation.setTracking(true);
                // $scope.geolocation.on('change', function() {
                //     console.log("ss");
                //     console.log($scope.geolocation.getPosition()); 
                // });
            
                // handle geolocation error.
                $scope.geolocation.on('error', function(error) {
                    console.log(error);
                });
                SITMap.prototype.zoomItem = function (geometry) {
                    var map = this.map,
                        fmtjson = new ol.format.GeoJSON(),
                        geom = fmtjson.readGeometry(geometry);
                    if (geom.getType() === "Point") {
                        map.getView().animate({
                            center: geom.getCoordinates(),
                            zoom: Math.max(map.getView().getZoom(), 11)
                        });
                    } else {
                        var extent = geom.getExtent();
                        map.getView().fit(extent, { size: map.getSize(), duration: 1000, easing: ol.easing.easeOut });
                    }
                    return;
                };

                SITMap.prototype.createControlBarCustom = function (opts, callback) {
                    //// barra de herramientas

                    let marcador = new ol.Feature({
                        geometry: new ol.geom.Point(
                            ol.proj.fromLonLat([-16.498131,-68.1334502])// En dónde se va a ubicar
                        ),
                    });

                    // marcadores debe ser un arreglo
                    const marcadores = []; // Arreglo para que se puedan agregar otros más tarde

                    marcadores.push(marcador);// Agregamos el marcador al arreglo

                    let capa = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: marcadores, // A la capa le ponemos los marcadores
                        }),
                    });
                    // Y agregamos la capa al mapa
                    mapa.addLayer(capa);
                    return this;
                };


            },
            
            crearListaCont: function (data) {
                $scope.datosFallVista = data;
            },
            
            busquedaLimpiar: function () {
                var mapPnlCntRes = document.getElementById("mapPnlCntRes");
                if (mapPnlCntRes) {
                    mapPnlCntRes.remove();
                }
                $scope.busZona = '';
                $scope.busCC = '';
                $scope.busDir = '';
                $scope.busVia = '';
            },
            obtenerUbicacion: function () {
                //console.log($scope.geolocation.getPosition()); 
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                    //console.log(navigator.geolocation);
                } else {
                    //console.log(position);
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            },
        }
    }

    $scope.clickSelectZoom2=function(item){
        $scope.buscarDatosIdf(item.idf);
        var v1 = $scope.vectorLayer.getSource();v1.clear();
        var l1 = $scope.LineLayer.getSource();l1.clear();
        $scope.nombreDifunto=item.layer.trim();
        $scope.listado = false;
        //clear_selections();
        if ($scope.vlayer) {
            var src = $scope.vlayer.getSource();
            if (src) src.clear();
        }
        $.ajax({
            async: false,
            url: jsonURLS.UDIT_GEO+"geoserver/cementerio/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cementerio%3Acementerio_bloques&outputFormat=application%2Fjson&CQL_FILTER=codigo_caronte=%27" + item.desc + "%27&_=1694131500295",
            success: function (data) {
                //console.log(data.features[0]);
                if(data.features[0]==null){
                    swal('Atención', 'Lo Sentimos, no se pudo realizar la busqueda espacial.', 'warning');
                }
                var x = data.features[0].geometry.coordinates[0][0];
                //console.log(x);
                var objCenter = $scope.getCenterGeom(x);
                objCenter[1]=objCenter[1]+$scope.offsetx;
                objCenter[0]=objCenter[0]-$scope.offsety;
                //console.log(objCenter);
                $scope.servOSM(objCenter);
                geom = null;
                if (data.features.length > 0) {
                    geom = data.features[0].geometry;
                }
                var srsName = 'EPSG:32719';
                if (!$scope.vlayer) create_search_layer();
                var src = $scope.vlayer.getSource();
                var fts = get_features_from_elem(srsName, geom);
                src.addFeatures(fts);
            }
        });
    }

    $scope.getCenterGeom=function (x) {
        totalX = 0, totalY = 0;
        for (const element of x) {
            //console.log(element);
            totalX += element[0];
            totalY += element[1];
        }
        centerX = totalX / x.length;
        centerY = totalY / x.length;
        //console.log(x.length, centerX,centerY);
        return [centerX,centerY];
    }

    get_features_from_elem = function (srsName, geom) {
        //console.log(geom);
        var mss = getSrsName(),
            opts = srsName ? { dataProjection: srsName, featureProjection: mss } : {},
            fmtjson = new ol.format.GeoJSON();
        var featureslist = [];
        if (Array.isArray(geom) == true) {
            featureslist = geom;
        }
        else {
            featureslist.push(geom);
        }

        //console.log("featureslist  ---",featureslist);
        var features = fmtjson.readFeatures({
            "type": "FeatureCollection",
            "totalFeatures": featureslist.length,
            "features": featureslist
        }, opts);
        //console.log("features  ---",features);
        return features;
    };
    getSrsName = function (k) {
        if ($scope.map) {
            return $scope.map.getView().getProjection().getCode();
        };
        return null;
    };


    function showPosition(position) {
        alert(position.coords.latitude + "," + position.coords.longitude);
    }

    $scope.mapa.acciones.iniciar();
    $scope.servOSM=function (objCenter) {
        
        var v1 = $scope.vectorLayer.getSource();v1.clear();
        var l1 = $scope.LineLayer.getSource();l1.clear();
        var coorLongLat = ol.proj.toLonLat(objCenter,ol.proj.get('EPSG:32719'));
        ubicacionBloque = [coorLongLat[0],coorLongLat[1]];
        //console.log(tottem);
        var urlx = "https://routing.openstreetmap.de/routed-foot/route/v1/driving/";
        urlx=urlx+tottemPing[0]+','+tottemPing[1]+';'+coorLongLat[0]+','+coorLongLat[1] //inicio y destico
        urlx=urlx+'?overview=false&geometries=polyline&steps=true&hints=ow4Xg14mO4MZAQAAcAAAAAAAAADcAwAAc-bJQYmXIUEAAAAAbPWxQsoAAABRAAAAAAAAAMgCAAAOAAAAtknw-41EBP-WSfD7t0QE_wAArw7235zN%3B-qzthS9rfI1bAQAAfQAAAAAAAAAAAAAAVMcKQsZlR0EAAAAAAAAAABUBAABkAAAAAAAAAAAAAAAOAAAAZHHw-8gXBP9kcfD7yBcE_wAADwP235zN';
        $http({
            method : "GET",
            headers:{'accept':'application/json, text/javascript, /; q=0.01'},
            url : urlx
        }).then(function mySuccess(response) {
            //console.log(response);
            const pasos = response.data.routes[0].legs[0].steps;
            const puntos =[];
            $scope.featuresArray = [];
            $scope.LineArray = [];
            $scope.featuresArray.push(new ol.Feature({geometry: new ol.geom.Point(ol.proj.fromLonLat(ubicacionBloque,ol.proj.get('EPSG:32719')))}));
            
            pcoord1 = ol.proj.fromLonLat(tottem,ol.proj.get('EPSG:32719'));
            for (let i = 0; i < pasos.length; i++) {
                var coordpasos = ol.format.Polyline.decodeDeltas(pasos[i].geometry, 2, 1e5);
                //console.log(coordpasos);
                for (let j = 0; j < coordpasos.length; j=j+2) {
                    //console.log(coordpasos[j],coordpasos[j+1])
                    var cordpaso = [coordpasos[j+1],coordpasos[j]];
                    //******** tara **********
                    cordpaso[0]=cordpaso[0]+$scope.offsetx;
                    cordpaso[1]=cordpaso[1]-$scope.offsety;
                    //console.log("cordpaso",cordpaso);
                    //******** tara **********
                    //$scope.featuresArray.push(new ol.Feature({geometry: new ol.geom.Point(ol.proj.fromLonLat(cordpaso,ol.proj.get('EPSG:32719')))}));
                    coord2 = cordpaso;
                    pcoord2 = ol.proj.fromLonLat(coord2,ol.proj.get('EPSG:32719'));
                    $scope.LineArray.push(new ol.Feature({geometry: new ol.geom.LineString([pcoord1,pcoord2])}));
                    pcoord1=pcoord2;
                }
                var coordEsq = pasos[i].intersections[0].location;
                //console.log("coordEsq",coordEsq);
                //console.log(ol.proj.fromLonLat(coords,ol.proj.get('EPSG:32719')));
                //******** tara **********
                coordEsq[0]=coordEsq[0]+$scope.offsetx;
                coordEsq[1]=coordEsq[1]-$scope.offsety;
                //******** tara **********
                //coord2 = coordEsq;
                //pcoord2 = ol.proj.fromLonLat(coord2,ol.proj.get('EPSG:32719'));
                //$scope.LineArray.push(new ol.Feature({geometry: new ol.geom.LineString([pcoord1,pcoord2])}));
                //pcoord1=pcoord2;
                //dibujado de equinas 
                //$scope.featuresArray.push(new ol.Feature({geometry: new ol.geom.Point(ol.proj.fromLonLat(coordEsq,ol.proj.get('EPSG:32719')))}));
            }
            var v1 = $scope.vectorLayer.getSource();
            v1.clear();
            v1.addFeatures($scope.featuresArray);

            var l1 = $scope.LineLayer.getSource();
            //console.log(l1);
            l1.clear();
            l1.addFeatures($scope.LineArray);
            //$scope.vectorLayer.getSource().refresh();
            //$scope.vectorLayer.getSource().updateParams({ "time": Date.now() });
            var src = $scope.m_app.vectorLayer.getSource();
            src.clear(); src.refresh(); src.refresh({force:true});

            $scope.generarMarco(tottemPing,coorLongLat);
            //$scope.vectorLayer.refresh({force:true});
        }, function myError(response) {
            //console.log(response);
            $scope.myWelcome = response.statusText;
        });
    }
    

    $scope.selecteIdi = "NATURAL";
    $scope.tipo = "NATURAL";
    $scope.ci_txt = "";
    $scope.paterno_txt = "";
    $scope.materno_txt = "";
    $scope.casada_txt = "";
    $scope.nombre_txt = "";
    $scope.idf_txt = "";

    $scope.limpiarGeoCamposFall = function () {
        $scope.listado=false;
        $scope.ci_txt = "";
        $scope.paterno_txt = "";
        $scope.materno_txt = "";
        $scope.casada_txt = "";
        $scope.nombre_txt = "";
        $scope.idf_txt = "";
        
        $scope.sector_txt= "";
        $scope.cumapa_txt= "";
        $scope.bloque_txt= "";
        $scope.frente_txt= "";
        $scope.planta_txt= "";
        $scope.fila_txt= "";
        $scope.nro_nicho_txt= "";
        //mapPnlCntRes.remove();
        //clear_selections();
        var v1 = $scope.vectorLayer.getSource();
        v1.clear();
        var l1 = $scope.LineLayer.getSource();
        l1.clear();
        var src = $scope.vlayer.getSource();
        src.clear();
        
        $scope.impLista=false;
        $scope.mapPopupContent.innerHTML = '<p>USTED ESTA AQUÍ</p>';
        $scope.overlay.setPosition(pcoord_msg);
    }

    $scope.consultaFallecidos = {
        getToken: function () {
            var promise = servicios.tkn();
            promise.then(function (data) {
                //console.log(data);
                $scope.tkn = data.token;
            }, function (reject) {
                $.unblockUI();
                console.log(reject);
                $rootScope.notificacionError("Error al listar bloque");
            });
        },
        buscar: function () {
            //validaciones de campos
            if ($scope.ci_txt == "" && $scope.paterno_txt == "" && $scope.materno_txt == "" && $scope.casada_txt == "" && $scope.nombre_txt == "" && $scope.idf_txt == "") {
                //alert("Por favor especifique su busqueda.");
                swal('Atención', 'Por favor introdusca parametros para la busqueda.', 'warning');
                return;
            }

            var paterno_txt = ""; var materno_txt = ""; var casada_txt = ""; var nombre_txt = ""; var idf_txt = "";
            var promise = servicios.tkn();
            promise.then(function (data) {
                $scope.tkn = data.token;
                var promise = servicios.busqueda(data.token, $scope.ci_txt, $scope.paterno_txt, $scope.materno_txt, $scope.casada_txt, $scope.nombre_txt, $scope.idf_txt);
                promise.then(function (data) {
                    var lista = [];
                    $scope.datosFallVista=[];
                    var cantidad = data.length;
                    $scope.logBusqueda(cantidad);
                    if (cantidad >= 50) {
                        swal('Atención', 'Se encontraron más de 50 coincidencias, por favor especifique su búsqueda.', 'warning');
                    }
                    if (data.length > 0) {
                        $scope.listado = true;
                        angular.forEach(data, function (item) {
                            //console.log(item, JSON.parse(item.ydata_fll));
                            var datos_fallecido = JSON.parse(item.ydata_fll);
                            var idf = item.yid_fll;
                            var ci = datos_fallecido.ci;
                            var nombre_completo = datos_fallecido.nombre + " " + datos_fallecido.paterno + " " + datos_fallecido.materno + " " + datos_fallecido.casada;
                            
                            lista.push({ "layer": nombre_completo, "layer1": ci, "desc": item.yid_edif, "idf": idf })
                        });
                        $scope.mapa.acciones.crearListaCont(lista);
                        //$scope.mapa.acciones.buscarContenedorCrear(lista);
                    }
                    else {
                        //console.log("Sin resultados de fallecidos ");
                        //$.unblockUI();
                        //$scope.$apply();
                    }
                    //$scope.mapa.acciones.buscarContenedorCrear(lista);
                }, function (reject) {
                    $.unblockUI();
                    console.log(reject);
                    $rootScope.notificacionError("Error al listar bloque");
                });
            }, function (reject) {
                $.unblockUI();
                console.log(reject);
                $rootScope.notificacionError("Error al listar bloque");
            });
        }
    }
    $scope.logBusqueda=function (cantidadObtenida) {
        var obj={};
        obj.ci=$scope.ci_txt;
        obj.nombres=$scope.nombre_txt;
        obj.paterno=$scope.paterno_txt;
        obj.materno=$scope.materno_txt;
        obj.casada = $scope.casada_txt;
        obj.idf=$scope.idf_txt;
        //console.log(obj);
        //console.log(cantidadObtenida);
        let objRes = {};
        objRes.cantidad=cantidadObtenida;
        let tipoIngreso = "WEB";
        //JSON.stringify(objRes)
        var dFormularios  = new datosFormularios();
        dFormularios.logFallecidosCementerio(tipoIngreso,JSON.stringify(objRes),JSON.stringify(obj),function(results){
            console.log(results);
            results = JSON.parse(results);
        });
    }

    ////////////////////////////////////////////////////////////////////////
    $scope.buscarDatosIdf = function (id) {
        $scope.impLista=true;
        /****** limpiar datos de informacion ********//////
        $scope.sector_txt = "";$scope.cumapa_txt = "";$scope.bloque_txt = "";
        $scope.frente_txt = "";$scope.planta_txt = "";$scope.fila_txt = "";
        $scope.nro_nicho_txt = "";$scope.nro_nicho_txt = "";
        $scope.vias_txt= "";

        var promise = servicios.tkn();
        promise.then(function (data) {
            $scope.tkn = data.token;
            var promise = servicios.busquedaId($scope.tkn, id);
            promise.then(function (data) {
                //console.log('data por id', data)
                if (data.length > 0) {
                    angular.forEach(data, function (item) {
                        var datos_ubicacion = JSON.parse(item.yubicacion_data);
                        $scope.sector_txt = datos_ubicacion.Sector;
                        $scope.cumapa_txt = datos_ubicacion.CuaPab;
                        $scope.bloque_txt = datos_ubicacion.Bloque;
                        $scope.frente_txt = datos_ubicacion.Frente;
                        $scope.planta_txt = datos_ubicacion.Planta;
                        $scope.fila_txt = datos_ubicacion.Fila;
                        $scope.nro_nicho_txt = datos_ubicacion.NroNicho;
                        if(item.yubicacion_vias_data!=null){
                            var datos_vias = JSON.parse(item.yubicacion_vias_data);
                            $scope.vias_txt="Frente A: "+datos_vias.viaFa+", Frente B: "+datos_vias.viaFb+",Lat. A: " +datos_vias.viaLa+",Lat. B: "+ datos_vias.viaLb
                        }
                        else{
                            $scope.vias_txt="-";
                        }
                    });
                    //console.log(lista);
                    //$scope.mapa.acciones.buscarContenedorCrear(lista);
                }
                else {
                    console.log("Sin resultados de fallecidos ");
                    //$.unblockUI();
                    //$scope.$apply();
                }
                //$scope.mapa.acciones.buscarContenedorCrear(lista);
            }, function (reject) {
                $.unblockUI();
                console.log(reject);
                $rootScope.notificacionError("Error al listar bloque");
            });
        }, function (reject) {
            $.unblockUI();
            console.log(reject);
            $rootScope.notificacionError("Error al listar bloque");
        });
    }

    $scope.bloqBuscarDatos = function (event) {
        /*console.log('inn');
        var nom = $scope.nombre_txt;
        console.log('nom nom');
        var pat = $scope.paterno_txt;
        var mat = $scope.materno_txt;
        var cas = $scope.casada_txt;
        var ci = $scope.ci_txt;
        var idf = $scope.idf_txt;
        if (nom == '' && pat == '' && mat == '' && cas == '' && ci == '' && idf == '') {
            console.log('bloquea idf');
            document.getElementById('idfblq').disabled = false;
            document.getElementById('bsqFllgeo').disabled = true;
            document.getElementById('nomblq').disabled = false;
            document.getElementById('patblq').disabled = false;
            document.getElementById('matblq').disabled = false;
            document.getElementById('casblq').disabled = false;
            document.getElementById('ciblq').disabled = false;
        }else if(nom != '' || nom != "" || pat != '' || pat != "" || mat != '' || mat != "" || cas != '' || cas != "" || ci != '' || ci != ""){
            document.getElementById('idfblq').disabled = false;
            document.getElementById('bsqFllgeo').disabled = true;
            document.getElementById('nomblq').disabled = false;
            document.getElementById('patblq').disabled = false;
            document.getElementById('matblq').disabled = false;
            document.getElementById('casblq').disabled = false;
            document.getElementById('ciblq').disabled = false;
        }*/

        /*else if(nom != '' || nom != "" || pat != '' || pat != "" || mat != '' || mat != "" || cas != '' || cas != "" || ci != '' || ci != "") {
            console.log('bloquea idf');
            document.getElementById('idfblq').disabled = true;
            document.getElementById('bsqFllgeo').disabled = false;
            document.getElementById('nomblq').disabled = false;
            document.getElementById('patblq').disabled = false;
            document.getElementById('matblq').disabled = false;
            document.getElementById('casblq').disabled = false;
            document.getElementById('ciblq').disabled = false;
        } else if(idf != '' || idf != ""){
            document.getElementById('nomblq').disabled = true;
            document.getElementById('patblq').disabled = true;
            document.getElementById('matblq').disabled = true;
            document.getElementById('casblq').disabled = true;
            document.getElementById('ciblq').disabled = true;
            document.getElementById('bsqFllgeo').disabled = false;
        }*/
    }

    $scope.buscarPuntos = function (id) {
        var promise = servicios.tkn();
        promise.then(function (data) {
        }, function (reject) {
            console.log(reject);
            $rootScope.notificacionError("Error al traer datos bloque");
        });
    }
    $scope.generarMarco=function(tottemPing,coorLongLat){
        //console.log(tottemPing,coorLongLat);
        pmedio = [(tottemPing[0]+coorLongLat[0])/2,(tottemPing[1]+coorLongLat[1])/2];
        //console.log(pmedio);
        pCoordMedio = ol.proj.fromLonLat(pmedio,ol.proj.get('EPSG:32719'));
        $scope.map.getView().animate({
            center: pCoordMedio,
            zoom: 11
        });
    }

    $scope.imprimirInfo = function () {
        //console.log(img64);      
        $scope.contenido = [
            {
                table: {
                    headerRows: 1,
                    widths: [ '88%'],
                    body: [
                        [ {
                            stack: 
                            [
                                {
                                    image: 'building',
                                    width: 180
                                } 
                            ],
                            margin: 0,
                            layout: "noBorders"
                        }],
                        [ {columns: [
                            {
                              // auto-sized columns have their widths based on their content
                              width: '30%',
                              text: 'Nombre Fallecido:\n',
                              fontSize:10
                            },
                            {
                              // star-sized columns fill the remaining space
                              // if there's more than one star-column, available width is divided equally
                              width: '*',
                              text: $scope.nombreDifunto,
                              fontSize:10
                            }
                        ]}],
                        [ {columns: [
                            {
                              // auto-sized columns have their widths based on their content
                              width: '30%',
                              text: 'Sector:\n',
                              fontSize:10
                            },
                            {
                              // star-sized columns fill the remaining space
                              // if there's more than one star-column, available width is divided equally
                              width: '*',
                              text: $scope.sector_txt,
                              fontSize:10
                            }
                        ]}],
                        [ {columns: [
                            {
                              // auto-sized columns have their widths based on their content
                              width: '30%',
                              text: 'Vías:\n',
                              fontSize:10
                            },
                            {
                              // star-sized columns fill the remaining space
                              // if there's more than one star-column, available width is divided equally
                              width: '*',
                              text: $scope.vias_txt,
                              fontSize:10
                            }
                        ]}],
                        [ {columns: [
                            {
                              // auto-sized columns have their widths based on their content
                              width: '30%',
                              text: 'C./Pab./ Mausoleo:',
                              fontSize:10
                            },
                            {
                              // star-sized columns fill the remaining space
                              // if there's more than one star-column, available width is divided equally
                              width: '*',
                              text: $scope.cumapa_txt,
                              fontSize:10
                            }
                        ]}],
                        [ {columns: [
                            {
                              width: '30%',
                              text: 'Nº. Sepultura:\n',
                              fontSize:10
                            },
                            {
                              width: '*',
                              text: $scope.nro_nicho_txt+" ",
                              fontSize:10
                            }
                        ]}],
                        [ {columns: [
                            {
                              width: '*',
                              text: 'BLOQUE: '+$scope.bloque_txt+' - FRENTE: '+$scope.frente_txt+' - PLANTA: '+$scope.planta_txt+' - FILA: '+$scope.fila_txt,
                              fontSize:10
                            }
                        ]}],
                    ]
                 }
            },

           
            // {
            
            //       //"escudo.png?auto=compress&cs=tinysrgb&dpr=1&w=300"
            //     //)
            // }  
            // { text: 'frente:\n'+$scope.sector_txt, fontSize: 12 },
        ];
        
        var docDef = { 
            pageSize: 'B7',
            pageMargins: [ 16, 5, 15, 5 ],
            content: $scope.contenido,
            images: {
                building: $scope.img64
            }
        }
        //pdfMake.createPdf(docDef).print({}, window.frames['printPdf']);
        const pdf = pdfMake.createPdf(docDef);
        pdf.print();
        //pdf.download('PPRA.pdf');

        // function getBase64ImageFromURL(url) {
        //     return new Promise((resolve, reject) => {
        //         var img = new Image();
        //         img.setAttribute("crossOrigin", "anonymous");
            
        //         img.onload = () => {
        //             var canvas = document.createElement("canvas");
        //             canvas.width = img.width;
        //             canvas.height = img.height;
            
        //             var ctx = canvas.getContext("2d");
        //             ctx.drawImage(img, 0, 0);
            
        //             var dataURL = canvas.toDataURL("image/png");
            
        //             resolve(dataURL);
        //         };
            
        //         img.onerror = error => {
        //             reject(error);
        //         };
            
        //         img.src = url;
        //     });
        // }
        // function getBase64Image(img) {
        //     // Create an empty canvas element
        //     var canvas = document.createElement("canvas");
        //     canvas.width = img.width;
        //     canvas.height = img.height;
        
        //     // Copy the image contents to the canvas
        //     var ctx = canvas.getContext("2d");
        //     ctx.drawImage(img, 0, 0);
        
        //     // Get the data-URL formatted image
        //     // Firefox supports PNG and JPEG. You could check img.src to
        //     // guess the original format, but be aware the using "image/jpg"
        //     // will re-encode the image.
        //     var dataURL = canvas.toDataURL("image/png");
        
        //     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        // }
    }
});


