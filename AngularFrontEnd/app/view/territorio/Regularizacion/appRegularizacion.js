//filtro para dar el formato SERCAT al codigo catastral - OK
app.filter("FormatoSercat", function(){
	return function(text) {
		if(text != null){
			if(text.length == 15)
			{
				var cc = text;
				var cc1 = cc.substring(0,3) + '-' + cc.substring(3,7) + '-' + cc.substring(7,11) + '-' + cc.substring(11,15);
				return cc1;
			}
			else
			{
				return text;
			}
		}
	}
});

app.filter("FormatoFecha", function(){
	return function(text) {
		function getFormattedDate(date) {
			var year = date.getFullYear();

			var month = (1 + date.getMonth()).toString();
			month = month.length > 1 ? month : '0' + month;

			var day = date.getDate().toString();
			day = day.length > 1 ? day : '0' + day;

			return day + '/' + month + '/' + year;
		}
		
		if(text != null){
			var f =  "";
			var fechaRegistro = new Date(text);
			var f = getFormattedDate(fechaRegistro);

			return f;

		}
	}
});


app.directive('vaCombo', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, mCtrl) {
			function myValidation(value) {
				if (value.indexOf("e") > -1) {
					mCtrl.$setValidity('charE', true);
				} else {
					mCtrl.$setValidity('charE', false);
				}
				return value;
			}
			mCtrl.$parsers.push(myValidation);
		}
	};
});

app.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if(event.which === 13) {
				scope.$apply(function(){
					scope.$eval(attrs.ngEnter, {'event': event});
				});

				event.preventDefault();
			}
		});
	};
});

//Para convertir a object params los parametros enviados por el metodo POST -- OK
Object.toparams = function ObjecttoParams(obj) {
	var p = [];
	for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
	}
	return p.join('&');
};

//Funcion padleft
function Padleft(pad,valor) {
	var str = "" + valor;
	return ans = pad.substring(0, pad.length - str.length) + str;
};
function arrayObjectIndexOf(miArray, buscarTexto, propiedad) {
	for (var i = 0, len = miArray.length; i < len; i++) {
		if (miArray[i][propiedad] === buscarTexto) return i;
	}
	return -1;
}

function RegularizacionController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad,$timeout,$window)
{
	$scope.open_mapa = function (){
		vectorSourcePoints = new ol.source.Vector();
    	vectorLayerPoints = new ol.layer.Vector({ source: vectorSourcePoints });
		
		var lotes_s = new ol.layer.Tile({
			title: 'Lotes Catastro',
			//opacity: 0.3,
			visible: true,
			source: new ol.source.TileWMS({
				url: 'http://sitservicios.lapaz.bo/geoserver/wms',
				params: { 'LAYERS': 'sit:lotessit', 'VERSION': '1.1.1', 'FORMAT': 'image/png','STYLES':'lotessit_s1','TILED': true },
				serverType: 'geoserver',
				crossOriginKeyword: 'anonymous'
			})
		});
		setTimeout(function()
		{
			$("#map_regularizacion").empty();
			$scope.map = new ol.Map({
                target: 'map_regularizacion',
                layers: [
                    new ol.layer.Group({
                        title: 'Mapas Base',
                        layers: [
                            osm,
							lotes_s
							
                        ]
                    }),
                    new ol.layer.Group({
                        title: 'Capas',
                        layers: [
							vectorLayerZonas,
							vectorLayerPoints
                        ]
                    })
                ],

                view: new ol.View({
                    zoom: 16,
                    center: ol.proj.fromLonLat([-68.133555, -16.495687])
                })
            });
			//////////////////////////////////////
			var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: 'Leyenda'});
        	$scope.map.addControl(layerSwitcher);
			$scope.map.on('click', function (evt)
            {
                vectorSourcePoints.clear();
				var viewResolution = view.getResolution();
                var coord = $scope.map.getCoordinateFromPixel(evt.pixel);
                var centro = ol.proj.transform(coord,'EPSG:3857',epsg32719);
                var wkt = '';
                var centro_1 = ol.proj.transform(coord,'EPSG:3857',epsg4326);
                wkt = "POINT("+centro[0]+" "+centro[1]+")";
                var url = 'http://sitservicios.lapaz.bo/geoserver/sit/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sit:zonasref&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(wkb_geometry,'+ wkt +')';
                setTimeout(function()
                {
                    $.ajax({
                              url: url,
                              type: 'GET',
                              dataType: 'jsonp',
                              jsonpCallback: 'getJson',
                              success: function (data)
                              {
                                if(data.features.length == 1){     
									console.log(data.features[0].properties);             
									$scope.solicitud.distrito = data.features[0].properties.distrito;
									$("#distrito_r").val(data.features[0].properties.distrito);
									$scope.solicitud.macrodistrito = data.features[0].properties.macrodistrito;
									$("#macrodistrito_r").val(data.features[0].properties.macrodistrito);                
									$scope.solicitud.zona = data.features[0].properties.zona;
									$("#zona_r").val(data.features[0].properties.zona);         
                                }
                                else
                                {
                                  console.log("ningun resultado para zonas");
                                }
                              },
                              error: function (data)
                              { 
                                console.log(data);
                              }   
                          });
                },200);
                var feature = new ol.Feature(
                      new ol.geom.Point(ol.proj.fromLonLat(centro_1))
                );
                feature.setStyle(iconStyle);
                vectorSourcePoints.addFeature(feature);
            });
			//////////////////////////////////
			var search = new ol.control.Search(
			{
				getTitle: function (f) { return f.name; },
				autocomplete: function (s, cback) {
				var result = [];
				var rex = new RegExp(s.replace("*", "") || "\.*", "i");
				for (var i = 0; i < positions.length; i++) {
					if (rex.test(positions[i].name))
					result.push(positions[i]);
				}
				return result;
				}
			});
			$scope.map.addControl(search);
			search.on('select', function (e) {
				var n = e.search.name;
				var c = 0;
				var geo_zona;
				var myStyleZonas = new ol.style.Style({
					stroke: new ol.style.Stroke({ color: '#FF8000', width: 5 }),
					fill: new ol.style.Fill({ color: 'transparent' })
				});
		
				$scope.map.removeLayer(vectorLayerZonas);
				for (var i = 0; i < geo_zonas.features.length; i++) {
					var nombre_zona = geo_zonas.features[i].properties.zonaref; 
					if (n === nombre_zona) {
					c = c + 1;
					geo_zona = geo_zonas.features[i];
					}
				}
				if (c > 0) {
					geo_zona = JSON.stringify(geo_zona);
					vectorLayerZonas.setSource(new ol.source.Vector({
					features: (new ol.format.GeoJSON({ defaultDataProjection: 'EPSG:3857' })).readFeatures(geo_zona)
					}));
					vectorLayerZonas.setStyle(myStyleZonas);
					$scope.map.addLayer(vectorLayerZonas);
					$scope.map.getView().setCenter(e.search.pos);
					$scope.map.getView().setZoom(15);
					setTimeout(function () {
					vectorLayerZonas.getSource().clear();
					$scope.map.removeLayer(vectorLayerZonas);
					}, 2000);
				}
				$scope.map.getView().animate({
					center: e.search.pos,
					zoom: 15,
					easing: ol.easing.easeOut
				})
			});
		},500);
	}
	//IMPORTANTE
	$scope.configParametros = {
		documentoSolicitud:{
			idTipoDocIfile : 0, //Actualizar para PRODUCCION
			acciones:{
				obtener:function () {
					var conf = new dataSITOL();
					conf.catObtenerParam("CatastroDocIDRegistro",function(resultado){
						var resApi = JSON.parse(resultado);
						//console.log("datos param--->",resApi);
						if(resApi.success)
						{
							$scope.configParametros.documentoSolicitud.idTipoDocIfile = parseInt(resApi.success.dataSql[0].valorParametro);
						}
						else
						{
							swal('', 'Error al obtener datos', 'error');
							console.log("Error al obtener datos",resApi.error.message,resApi.error.code);
							//$.unblockUI();
						}
					});
				}
			}
		},
		tasas:{
			servicioMunicipalNuevoMenor1000 : 0,
			servicioMunicipalNuevoMenor2000 : 0,
			servicioMunicipalNuevoMayor2000 : 0,
			servicioExternoNuevo : 0,
			servicioActualizacion : 0,

			acciones:{
				obtener:function () {
					var conf = new dataSIT();
					conf.catTasasCatastro(function(resultado){
						var resApi = JSON.parse(resultado);
						console.log("datos param tasas--->",resApi);
						if(resApi.success){
							//$scope.configParametros.documentoSolicitud.idTipoDocIfile = parseInt(resApi.success.dataSql[0].valorParametro);
							var data = resApi.success.dataSql;
							angular.forEach(data, function (item) {
								if(item.servicio == 'EXTERNO' && item.tipo == 'NUEVO'){
									$scope.configParametros.tasas.servicioExternoNuevo = item.valor;
								}
								if(item.servicio == 'MUNICIPAL' && item.tipo == 'NUEVO' && item.tipoArea == 1){
									$scope.configParametros.tasas.servicioMunicipalNuevoMenor1000 = item.valor;
								}
								if(item.servicio == 'MUNICIPAL' && item.tipo == 'NUEVO' && item.tipoArea == 2){
									$scope.configParametros.tasas.servicioMunicipalNuevoMenor2000 = item.valor;
								}
								if(item.servicio == 'MUNICIPAL' && item.tipo == 'NUEVO' && item.tipoArea == 3){
									$scope.configParametros.tasas.servicioMunicipalNuevoMayor2000 = item.valor;
								}
								if(item.servicio == 'ACTUALIZACION' && item.tipo == 'ACTUALIZACION'){
									$scope.configParametros.tasas.servicioActualizacion = item.valor;
								}
							})
						}
						else
						{
							swal('', 'Error al obtener datos', 'error');
							console.log("Error al obtener datos",resApi.error.message,resApi.error.code);
							//$.unblockUI();
						}
					});
				}
			}
		},
		
	}

	$scope.servicioTerritorio = {
		seleccionado : null,
		externo:{
			titulo : "Ley 467-Regularización de Edificaciones Fuera de Norma",
			codigo :"externo",
			vistas:{
				seleccionado:null,
				guia:{
					titulo:"GUÍA DE TRÁMITE",
					codigo:"guiaE"
				},
				tramites:{
					titulo:"MIS TRÁMITES",
					codigo:"tramitesE"
				},
				fomulario:{
					titulo:"FORMULARIO 402",
					codigo:"fomulario402"
				},
				solicitar:{
					titulo:"SOLICITAR TRÁMITE",
					codigo:"solicitarE"
				},
			}
		},
		acciones:{
			seleccionar:function (servicio) {
				
				$scope.servicioTerritorio.seleccionado =  angular.copy(servicio);
				$scope.servicioTerritorio.seleccionado.vistas.seleccionado =angular.copy($scope.servicioTerritorio.seleccionado.vistas.guia);
				/*
				if($scope.servicioTerritorio.seleccionado.codigo == $scope.servicioTerritorio.externo.codigo){
					$scope.solicitud.acciones.establecerDatosTipoServicioyRegistro(3,1);//tipo servicio 3 externo, tipo registro 1 nuevo
				}
				*/
			},
			seleccionarVista:function (vista) {
				
				$scope.servicioTerritorio.seleccionado.vistas.seleccionado =  angular.copy(vista);
			}
		}
		
	}

	
	$scope.solicitud = {
		
		idTramiteOL	 : null,
		idInsFlujo	 : null,
		geom	 : null,
		idCatastroTipoServicio	 : null,
		idCatastroTipoRegistro	 : null,
		oid	 : null,
		solicitante	 : null,
		idTipoDocumento	 : null,
		numDocumento	 : null,
		idExpedido	 : null,
		telefonoSolicitante	 : null,
		emailSolicitante	 : null,
		tipoPersona	 : null,
		profesionalNombre	 : null,
		profesionalEmail	 : null,
		profesionalTelefono	 : null,
		profesionalCab	 : null,
		idmacroDistrito	 : null,
		iddistritoMunicipal	 : null,
		codigoCatastral	 : null,
		direccion	 : null,
		zona	 : null,
		nroPuerta	 : null,
		riesgo	 : null,
		idCodPlanimetria	 : null,
		descPlanimetria	 : null,
		idTipoLote	 : null,
		numeroPisos	 : null,
		numeroBloques	 : null,
		tieneSotano	 : null,
		numeroInmueble	 : null,
		observaciones	 : null,
		idRequisitos	 : null,
		fechaRegistro	 : null,
		fechaDelegado	 : null,
		fechaEnvio	 : null,
		fechaModificacion	 : null,
		idEstado	 : null,
		idTipoAcceso	 : null,
		archivo1	 : null,
		archivo2	 : null,
		carTerrPendiente	 : null,
		carViaPendiente	 : null,
		serBasAlcantarillado	 : null,
		serBasEnergiaElectrica	 : null,
		serBasTelefono	 : null,
		serBasAguaPotable	 : null,
		serBasAlumbradoPublico	 : null,
		serBasGasDomiciliario	 : null,
		serBasTvCable	 : null,
		serBasInternet	 : null,
		supTotalConstruida	 : null,
		supSegunLevantamiento	 : null,
		supSegunTestimonio	 : null,
		correosProcesamiento	 : null,
		fotoFachada	 : null,
		apoderadoNombre	 : null,
		apoderadoIdTipoDocumento	 : null,
		apoderadoNrodocumento	 : null,
		apoderadoTelefono	 : null,
		apoderadoEmail	 : null,
		apoderadoNroPoder	 : null,
		sitramUid	 : null,
		sitramNro	 : null,
		sitramGestion	 : null,
		sitramContrasena	 : null,
		usuarioProcesador	 : null,
		idTramiteIGOB	 : null,
		solicitanteNombre: null,
		solicitantePaterno: null,
		solicitanteMaterno: null,
		listaExterno:[],
		listaNombres:[],
		listaSolicitudF02:[],
		acciones:{
			reset:function () {
				$scope.solicitud.idTramiteOL = null,
					$scope.solicitud.idInsFlujo = null,
					$scope.solicitud.geom = null,
					$scope.solicitud.idCatastroTipoServicio = null,
					$scope.solicitud.idCatastroTipoRegistro = null,
					//$scope.solicitud.oid = null,
					//$scope.solicitud.solicitante = null,
					//$scope.solicitud.idTipoDocumento = null,
					//$scope.solicitud.numDocumento = null,
					//$scope.solicitud.idExpedido = null,
					//$scope.solicitud.telefonoSolicitante = null,
					//.solicitud.emailSolicitante = null,
					//$scope.solicitud.tipoPersona = null,
					$scope.solicitud.profesionalNombre = null,
					$scope.solicitud.profesionalEmail = null,
					$scope.solicitud.profesionalTelefono = null,
					$scope.solicitud.profesionalCab = null,
					$scope.solicitud.idmacroDistrito = null,
					$scope.solicitud.iddistritoMunicipal = null,
					$scope.solicitud.codigoCatastral = null,
					$scope.solicitud.direccion = null,
					$scope.solicitud.zona = null,
					$scope.solicitud.nroPuerta = null,
					$scope.solicitud.riesgo = null,
					$scope.solicitud.idCodPlanimetria = null,
					$scope.solicitud.descPlanimetria = null,
					$scope.solicitud.idTipoLote = null,
					$scope.solicitud.numeroPisos = null,
					$scope.solicitud.numeroBloques = null,
					$scope.solicitud.tieneSotano = null,
					$scope.solicitud.numeroInmueble = null,
					$scope.solicitud.observaciones = null,
					$scope.solicitud.idRequisitos = null,
					$scope.solicitud.fechaRegistro = null,
					$scope.solicitud.fechaDelegado = null,
					$scope.solicitud.fechaEnvio = null,
					$scope.solicitud.fechaModificacion = null,
					$scope.solicitud.idEstado = null,
					$scope.solicitud.idTipoAcceso = null,
					$scope.solicitud.archivo1 = null,
					$scope.solicitud.archivo2 = null,
					$scope.solicitud.carTerrPendiente = null,
					$scope.solicitud.carViaPendiente = null,
					$scope.solicitud.serBasAlcantarillado = null,
					$scope.solicitud.serBasEnergiaElectrica = null,
					$scope.solicitud.serBasTelefono = null,
					$scope.solicitud.serBasAguaPotable = null,
					$scope.solicitud.serBasAlumbradoPublico = null,
					$scope.solicitud.serBasGasDomiciliario = null,
					$scope.solicitud.serBasTvCable = null,
					$scope.solicitud.serBasInternet = null,
					$scope.solicitud.supTotalConstruida = null,
					$scope.solicitud.supSegunLevantamiento = null,
					$scope.solicitud.supSegunTestimonio = null,
					$scope.solicitud.correosProcesamiento = null,
					$scope.solicitud.fotoFachada = null,
					$scope.solicitud.apoderadoNombre = null,
					$scope.solicitud.apoderadoIdTipoDocumento = null,
					$scope.solicitud.apoderadoNrodocumento = null,
					$scope.solicitud.apoderadoTelefono = null,
					$scope.solicitud.apoderadoEmail = null,
					$scope.solicitud.apoderadoNroPoder = null,
					$scope.solicitud.sitramUid = null,
					$scope.solicitud.sitramNro = null,
					$scope.solicitud.sitramGestion = null,
					$scope.solicitud.sitramContrasena = null,
					$scope.solicitud.usuarioProcesador = null,
					$scope.solicitud.idTramiteIGOB = null,

					$scope.solicitud.numeroDocumento = null,
					
					$scope.solicitud.supconstruida = null,	
					$scope.solicitud.supmodificar = null,	
					$scope.solicitud.tipovivienda = null,	
					$scope.solicitud.tipoconstruccion = null,	

					$scope.profesinalExterno.encontrado = null;		


			},
			establecerDatosSolicitante:function () {
				var datosCiudadano = new rcNatural();
				datosCiudadano.oid = sessionService.get('IDCIUDADANO');
				datosCiudadano.datosCiudadanoNatural(function(resultado){
					var response = JSON.parse(resultado);
					if (response.length > 0) {
						var results = response;
						$scope.solicitud.oid = sessionService.get('IDCIUDADANO');
						var tipoPersona = results[0].dtspsl_tipo_persona;
						$scope.solicitud.idExpedido = '11';
						if (tipoPersona == 'NATURAL') {
							$scope.solicitud.tipoPersona = 'NATURAL';
							if(results[0].dtspsl_nombres){
								$scope.solicitud.solicitante = results[0].dtspsl_nombres;
								$scope.solicitud.solicitanteNombre = results[0].dtspsl_nombres;
							}
							if(results[0].dtspsl_paterno){
								$scope.solicitud.solicitante = $scope.solicitud.solicitante + ' ' + results[0].dtspsl_paterno;
								$scope.solicitud.solicitantePaterno = results[0].dtspsl_paterno;
							}
							if(results[0].dtspsl_materno){
								$scope.solicitud.solicitante = $scope.solicitud.solicitante + ' ' + results[0].dtspsl_materno;
								$scope.solicitud.solicitanteMaterno = results[0].dtspsl_materno;
							}
							$scope.solicitud.idTipoDocumento= 1;
							$scope.solicitud.numDocumento= results[0].dtspsl_ci;
							switch(results[0].dtspsl_expedido) {
								case 'CHQ':
									$scope.solicitud.idExpedido = '6';
									break;
								case 'LPZ':
									$scope.solicitud.idExpedido = '1';
									break;
								case 'CBB':
									$scope.solicitud.idExpedido = '2';
									break;
								case 'ORU':
									$scope.solicitud.idExpedido = '4';
									break;
								case 'PTS':
									$scope.solicitud.idExpedido = '5';
									break;
								case 'TJA':
									$scope.solicitud.idExpedido = '7';
									break;
								case 'SCZ':
									$scope.solicitud.idExpedido = '3';
									break;
								case 'BNI':
									$scope.solicitud.idExpedido = '8';
									break;
								case 'PND':
									$scope.solicitud.idExpedido = '9';
									break;
							}
							//$scope.solicitud.idExpedido= results[0].dtspsl_expedido;
							$scope.solicitud.telefonoSolicitante= (results[0].dtspsl_movil!=null ? results[0].dtspsl_movil:(results[0].dtspsl_telefono != null ? results[0].dtspsl_telefono:''));
							$scope.solicitud.emailSolicitante= (results[0].dtspsl_correo != null?results[0].dtspsl_correo:'');
						}
						else{

							$scope.solicitud.tipoPersona = 'JURIDICO';
							if(results[0].dtspsl_razon_social){
								$scope.solicitud.solicitante = results[0].dtspsl_razon_social;
								$scope.solicitud.solicitanteNombre = results[0].dtspsl_razon_social;
							}
							$scope.solicitud.idTipoDocumento= 7;
							$scope.solicitud.numDocumento= results[0].dtspsl_nit;
							$scope.solicitud.idExpedido= '11';
							$scope.solicitud.telefonoSolicitante= (results[0].dtspsl_movil!=null ? results[0].dtspsl_movil:(results[0].dtspsl_telefono != null ? results[0].dtspsl_telefono:''));
							$scope.solicitud.emailSolicitante = (results[0].dtspsl_correo != null?results[0].dtspsl_correo:'');;
						}
					}
					else{
						swal('', 'Error al recuperar datos', 'error');
						console.log("Error no se encontraron los datos del ciudadano!!", sessionService.get('IDCIUDADANO'));
					}
				});

			},
			consultacontribuyente:function(datacon)
			{
				$.blockUI();


				console.log(datacon);
				$scope.open_mapa();
				
				var param= {
					"numeroInmueble": datacon.inmueble,//"269427",
					"numeroDocumentoId":datacon.cinit //"1540831-27"
				}
				var paramsup= {
					"inmueblesup": datacon.inmueble					
				}
				var p = {
					"usuario":"degem2021",
					"password":"degem20212021123456"
				};
				$http({
					method: 'POST',
					url: 'http://192.168.6.210:3010/api/ingresarATM',				
				//	url:  CONFIG.CONEXION_API_PG_IF_OFICIAL + 'wsSTTF/visualizarTramitesSITRAM',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					console.log("aaa==>", data.token);
					
					if(data.token)
					{
						$scope.solicitud.listaNombres = [];
						$http({
							method: 'POST',
							url: 'http://192.168.6.210:3010/api/superficieinmuebles',
							data: Object.toparams(param),
							headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + data.token }
						}).success(function (datasup, status, headers, config) {
							$.unblockUI();
							console.log("error email ",datasup.length);
							if(datasup.message)
							{
								console.log("no");
								$.unblockUI();
								$scope.solicitud.numeroDocumento = false;
								$scope.solicitud.macrodistrito="";
								$scope.solicitud.distrito="";
								$scope.solicitud.zona="";
								$scope.solicitud.celle_av="";
								$scope.solicitud.supconstruida="";
								$scope.solicitud.supmodificar="";
								$scope.solicitud.tipovivienda="";
								$scope.solicitud.tipoconstruccion="";					
								$scope.solicitud.inmueble="";
								$scope.solicitud.listaNombres = [];
							}
							else
							{
								$scope.solicitud.numeroDocumento = true;
								var aMievento = [];
								var aEvento = {};								
								aEvento.NOMBRE_RSOCIAL= datasup.NOMBRE_RSOCIAL;
								aEvento.PRIMER_APELLIDO_SIGLA=datasup.PRIMER_APELLIDO_SIGLA;
								aEvento.SEGUNDO_APELLIDO=datasup.SEGUNDO_APELLIDO ;
								aEvento.APELLIDO_ESPOSO=datasup.APELLIDO_ESPOSO ;
								aEvento.DOC_IDENTIDAD=datasup.DOC_IDENTIDAD ;
								aEvento.EXPEDIDO=datasup.EXPEDIDO ;
								aMievento.push(aEvento);
								$scope.solicitud.listaNombres =aMievento;
								$scope.tblSolicitudesNombres.reload();
								console.log("==pp>",$scope.solicitud.listaNombres);
								$http({
									method: 'POST',
									url: 'http://192.168.6.210:3010/api/superficiee',
									data: Object.toparams(paramsup),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + data.token }
								}).success(function (dataRegIgob, status, headers, config) {									
									$scope.solicitud.supconstruida = dataRegIgob.CONSTRUCCION_TOTAL;
									$.unblockUI();
								}).error(function (data, status, headers, config) {	
									$.unblockUI();
								});	
								
							}

							//console.log("error email ",datasup[0].PRIMER_APELLIDO_SIGLA);
							/*if(datasup.message=="no encontradoss")
							{
								$.unblockUI();
								$scope.solicitud.numeroDocumento = false;
							}else{
								$scope.solicitud.listaNombres =datasup;
								$scope.tblSolicitudesNombres.reload();
								console.log("==>",$scope.solicitud.listaNombres);
						

								$http({
									method: 'POST',
									url: 'http://192.168.6.210:3010/api/superficiee',
									data: Object.toparams(paramsup),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + data.token }
								}).success(function (dataRegIgob, status, headers, config) {									
									$scope.solicitud.supconstruida = dataRegIgob.CONSTRUCCION_TOTAL;
									$.unblockUI();
								}).error(function (data, status, headers, config) {	
									$.unblockUI();
								});	
							}	*/						

						}).error(function (data, status, headers, config) {		
							$.unblockUI();
							
							$scope.solicitud.macrodistrito="";
							$scope.solicitud.distrito="";
							$scope.solicitud.zona="";
							$scope.solicitud.celle_av="";
							$scope.solicitud.supconstruida="";
							$scope.solicitud.supmodificar="";
							$scope.solicitud.tipovivienda="";
							$scope.solicitud.tipoconstruccion="";					
							$scope.solicitud.inmueble="";
							$scope.solicitud.listaNombres = [];

						});

					}
					else{
						$scope.solicitud.numeroDocumento = true;
						swal('', 'Error al consultar seguimiento de trámite', 'error');
					}

				}).error(function (data, status, headers, config) {
					swal('', 'Error al consultar seguimiento de trámite', 'error');
					$.unblockUI();
				});
			},
			guardarDatosRecaudacionFor402:function (data) {
				console.log(data.listaNombres);
				var cadenan="",cadenaci="",cadenaexpedido="";
				
				for(i=0;i<data.listaNombres.length;i++)
				{
					console.log(data.listaNombres[i].TERCER_APELLIDO);
					if(data.listaNombres[i].NOMBRE_RSOCIAL==undefined)
					{
						data.listaNombres[i].NOMBRE_RSOCIAL="";
					}
					if(data.listaNombres[i].PRIMER_APELLIDO_SIGLA==undefined)
					{
						data.listaNombres[i].PRIMER_APELLIDO_SIGLA="";
					}
					if(data.listaNombres[i].SEGUNDO_APELLIDO==undefined)
					{
						data.listaNombres[i].SEGUNDO_APELLIDO="";
					}
					if(data.listaNombres[i].TERCER_APELLIDO==undefined)
					{
						data.listaNombres[i].TERCER_APELLIDO="";
					}
					if(data.listaNombres[i].DOC_IDENTIDAD==undefined)
					{
						data.listaNombres[i].DOC_IDENTIDAD="";
					}
					if(data.listaNombres[i].EXPEDIDO==undefined)
					{
						data.listaNombres[i].EXPEDIDO="";
					}
					var p = {
						"oid" :$scope.solicitud.oid,
						"nombre":data.listaNombres[i].NOMBRE_RSOCIAL,
						"primerapellido":data.listaNombres[i].PRIMER_APELLIDO_SIGLA,
						"segundoaepellido":data.listaNombres[i].SEGUNDO_APELLIDO,
						"esposoepellido":data.listaNombres[i].TERCER_APELLIDO,
						"ci":data.listaNombres[i].DOC_IDENTIDAD,
						"expedido":data.listaNombres[i].EXPEDIDO,						
						"macrodistrito":data.macrodistrito,
						"distrito":data.distrito,
						"zona":data.zona,
						"calle_av":data.celle_av,
						"supconstruida":data.supconstruida,
						"supmodificar":data.supmodificar,
						"tipovivienda":data.tipovivienda,
						"tipoconstruccion":data.tipoconstruccion,						
						"numero_inmueble":data.inmueble,
						"ci_solicitante":sessionService.get('CICIUDADANO')
					
					};				
					
					$http({
						method: 'POST',
						url: CONFIG.SERVICE_SITOLextgen + 'ApiFom402/wsRegistraForm',
						data: Object.toparams(p),
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function (datasolici, status, headers, config) {
					
						$scope.solicitud.macrodistrito="";
						$scope.solicitud.distrito="";
						$scope.solicitud.zona="";
						$scope.solicitud.celle_av="";
						$scope.solicitud.supconstruida="";
						$scope.solicitud.supmodificar="";
						$scope.solicitud.tipovivienda="";
						$scope.solicitud.tipoconstruccion="";					
						$scope.solicitud.inmueble="";
						$scope.solicitud.listaNombres = [];						
						$scope.solicitud.acciones.listarFor402Solitud();
						if(datasolici.length>0)
						{
							
						}
						else{
							
						}
						$.unblockUI();
					}).error(function (data, status, headers, config) {
						swal('', 'Error al consultar seguimiento de trámite', 'error');
						$.unblockUI();
					});
				}
			},
			listarFor402Solitud:function (data) {
				console.log($scope.solicitud.oid);
				$scope.solicitud.listaSolicitudF02 = [];
				var sNroDocCiudadano = $scope.solicitud.oid;					
			        var p = {cisol:sessionService.get('CICIUDADANO')};
					$http({
						method: 'POST',
						url: CONFIG.SERVICE_SITOLextgen + 'ApiFom402/Seguimiento',
						data: Object.toparams(p),
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function (datasolici, status, headers, config) {
						console.log("rosososo",datasolici);
						if(datasolici.length>0)
						{
							$scope.solicitud.listaSolicitudF02 =datasolici;
						     $scope.tblSolicitudesExternoFormulario402.reload();
						}
						else{
							
						}
						$.unblockUI();
					}).error(function (data, status, headers, config) {
						swal('', 'Error al consultar seguimiento de trámite', 'error');
						$.unblockUI();
					});
			},
			establecerDatosProfesional:function (nombre, cab, telefono, email) {
				$scope.solicitud.profesionalNombre=nombre;
				$scope.solicitud.profesionalEmail=email;
				$scope.solicitud.profesionalTelefono=telefono;
				$scope.solicitud.profesionalCab=cab;
			},
			listarExterno:function () {
				$scope.solicitud.listaExterno = [];
				$.blockUI();
				var sNroDocCiudadano = sessionService.get('CICIUDADANO');
				if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
				{
					sNroDocCiudadano = sessionService.get('NITCIUDADANO');
				}
				var solicitud = new dataSITOL();
				solicitud.regListaSolicitudes(sNroDocCiudadano
					, function(resultado){
						$.unblockUI();
						var resApi = JSON.parse(resultado);
						if(resApi.success)
						{
							//console.log("entro");
							$scope.solicitud.listaExterno =resApi.success.dataSql;
							$scope.tblSolicitudesExterno.reload();
						}
						else
						{
							console.log("Error al listar",resApi.error.message,resApi.error.code);
						}
					});

			},
			obtener:function (idTramiteOL, accion) {
				$.blockUI();
				var solicitud = new dataSITOL();
				solicitud.regObtenerSolicitud(
					idTramiteOL
					, function(resultado){
						$.unblockUI();
						var resApi = JSON.parse(resultado);
						if(resApi.success)
						{
							console.log("sss", resApi);
							var data =resApi.success.dataSql[0];
							$scope.solicitud.idTramiteOL = data.idTramiteOL;
							$scope.solicitud.solicitante = data.solicitante;
							$scope.solicitud.idTipoDocumento = data.idTipoDocumento;
							$scope.solicitud.numDocumento = data.numDocumento;
							$scope.solicitud.idExpedido = data.idExpedido;
							$scope.solicitud.telefonoSolicitante = data.telefonoSolicitante;
							$scope.solicitud.emailSolicitante = data.emailSolicitante;
							$scope.solicitud.tipoPersona = data.tipoPersona;
							$scope.solicitud.profesionalNombre = data.profesionalNombre;
							$scope.solicitud.profesionalEmail = data.profesionalEmail;
							$scope.solicitud.profesionalTelefono = data.profesionalTelefono;
							$scope.solicitud.profesionalCab = data.profesionalCab;
							$scope.solicitud.direccion = data.direccion;
							$scope.solicitud.zona = data.zona;
							$scope.solicitud.nroPuerta = data.nroPuerta;
							$scope.solicitud.idTramiteIGOB = data.idTramiteIGOB;
							if(accion == "delegar"){
								$scope.servicioTerritorio.acciones.seleccionar($scope.servicioTerritorio.externo)
								$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.solicitar);
							}
						}
						else
						{
							console.log("Error al obtener data",resApi.error.message,resApi.error.code);
						}
					});
			},
			guardarEnviar: function () {
				$.blockUI();
				if($scope.solicitud.idExpedido == null || $scope.solicitud.idExpedido == undefined)
					$scope.solicitud.idExpedido ='11';
				console.log('*************', $scope.solicitud);
				var solicitud = new dataSITOL();
				solicitud.regSolicitudReg(
					$scope.solicitud.idTramiteOL==null?0:$scope.solicitud.idTramiteOL,
					$scope.solicitud.solicitante,
					$scope.solicitud.idTipoDocumento,
					$scope.solicitud.numDocumento,
					$scope.solicitud.idExpedido,
					$scope.solicitud.telefonoSolicitante,
					$scope.solicitud.emailSolicitante,
					$scope.solicitud.tipoPersona,
					$scope.solicitud.profesionalNombre,
					$scope.solicitud.profesionalEmail,
					$scope.solicitud.profesionalTelefono,
					$scope.solicitud.profesionalCab,
					$scope.solicitud.direccion,
					$scope.solicitud.zona,
					$scope.solicitud.nroPuerta,
					$scope.solicitud.oid,
					$scope.solicitud.solicitanteNombre,
					$scope.solicitud.solicitantePaterno,
					$scope.solicitud.solicitanteMaterno
					, function(resultado){
						var resApi = JSON.parse(resultado);
						console.log(resApi);
						if(resApi.success)
						{
							$.unblockUI();
							if(resApi.success.dataSql[0].d)
							{
								//enviar correo al arquitecto
								$scope.solicitud.acciones.delegarProfesional(resApi.success.dataSql[0].d,$scope.solicitud.profesionalNombre,$scope.solicitud.idTramiteIGOB);
							}
							else
							{
								swal('', 'Error al guardar', 'error');
								$.unblockUI();
							}
						}
						else
						{
							$.unblockUI();
							swal('', 'Error al registrar solicitud. ' + resultado, 'error');
							console.log("Error al guardar",resApi.error.message,resApi.error.code);
						}
					});

			},
			delegarProfesional:function (param, profesional,idTramiteIGOB) {
				var p = {q: param};
				$.blockUI();
				$http({
					method: 'POST',
					//url: CONFIG.SERVICE_SITOLextgen + 'Territorio/EnviarCorreoDelegado',
					url: CONFIG.SERVICE_SITOLextgen + 'Regularizacion/DelegarSolicitud',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					$.unblockUI();
					if(data.res == "OK")
					{
						$scope.solicitud.acciones.listarExterno();
						swal('', 'Su solicitud fue delegada al profesional '+ profesional +'. \nUsted deberá coordinar con él, para el seguimiento de su trámite.', 'success');
						$scope.solicitud.acciones.reset();
						$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
						$.unblockUI();
						$scope.solicitud.acciones.registrarIGOB(param,idTramiteIGOB);
					}
					else
					{
						console.log("error email",data);
						$scope.solicitud.acciones.reset();
						$scope.solicitud.acciones.listarExterno();
						$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
						swal('', 'Error al enviar correo', 'error');
						$.unblockUI();
					}
				}).error(function (data, status, headers, config) {
					console.log("error email conexion",data, status, headers, config);
					$scope.solicitud.acciones.reset();
					$scope.solicitud.acciones.listarExterno();
					$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
					swal('', 'Error al enviar correo', 'error');
					$.unblockUI();
				});
			},
			anularConfirm:function (idTramite, idTramiteEnc) {
				console.log("sol", idTramiteEnc);
				$scope.idTramiteAnular = idTramite;
				$scope.idTramiteAnularEnc = idTramiteEnc;
				$('#modalConfirmarAnular').modal('show');
			},
			anular:function (idTramiteEnc) {
				console.log("anular" + idTramiteEnc);
				var p = {q: idTramiteEnc};
				$.blockUI();
				$http({
					method: 'POST',
					url: CONFIG.SERVICE_SITOLextgen + 'Regularizacion/AnularSolicitud',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					$.unblockUI();
					if(data.res == "OK")
					{
						$scope.solicitud.acciones.listarExterno();
						swal('', 'La solicitud fua anulada correctamente.', 'success');
						$scope.solicitud.acciones.reset();
						$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
						$.unblockUI();

						$scope.idTramiteAnular = null;
						$scope.idTramiteAnularEnc = null;
					}
					else
					{
						console.log("error email",data);
						$scope.solicitud.acciones.reset();
						$scope.solicitud.acciones.listarExterno();
						$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
						swal('', 'Error al anular solicitud. ' + JSON.stringify(data), 'error');
						$.unblockUI();
					}
				}).error(function (data, status, headers, config) {
					console.log("error anular solicitud conexion",data, status, headers, config);
					$scope.solicitud.acciones.reset();
					$scope.solicitud.acciones.listarExterno();
					$scope.servicioTerritorio.acciones.seleccionarVista($scope.servicioTerritorio.seleccionado.vistas.tramites);
					swal('', 'Error al anular solicitud', 'error');
					$.unblockUI();
				});
			},
			registrarIGOB:function (param,idTramiteIGOB) {
				var p = {q: param};
				$.blockUI();
				$http({
					method: 'POST',
					url: CONFIG.SERVICE_SITOLextgen + 'Regularizacion/RegistrarIGOBObtenerParam',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					$.unblockUI();
					console.log("Obteniendo parametros igob", data, $scope.solicitud);
					if(data.res)
					{
						console.log("error crear en igob",data);
						swal('', 'No se pudo registrar en IGOB: ' + data.valor, 'error');
						$.unblockUI();
					}
					else
					{
						var credentials= {
							"user": data.igobCredentialsUser,
							"password": data.igobCredentialsPwd
						}
						$http({
							method: 'POST',
							url: data.igobCredentialsURL,
							data: Object.toparams(credentials),
							headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
						}).success(function (dataCre, status, headers, config) {
							$.unblockUI();
							console.log("Credentials igob", dataCre);
							if(idTramiteIGOB == null){
								/// igob reg
								$http({
									method: 'POST',
									url: data.igobServCreacionURL,
									data: Object.toparams(data.data),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + dataCre.token }
								}).success(function (dataRegIgob, status, headers, config) {
									$.unblockUI();
									console.log("Crear en igob", dataRegIgob);
									if(dataRegIgob.success){
										if(dataRegIgob.success.length>0){
											var id_form_tra = dataRegIgob.success[0].id_form_tra;
											console.log("id_form_tra",id_form_tra);
											//Actualizar idtramite en sitv2online
											var dataSit= {
												"q": param,
												"idTramite": id_form_tra
											}
											$http({
												method: 'POST',
												url: CONFIG.SERVICE_SITOLextgen + 'Regularizacion/RegistrarIGOBActualizarIDtramite',
												data: Object.toparams(dataSit),
												headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
											}).success(function (dataActTram, status, headers, config) {
												$.unblockUI();
												console.log("Actualizar tramite en sitol", dataActTram);
												if(dataActTram.res == "OK")
												{
													//Enviar notificacion
													var msj = data.igobServNotificacionMsj.replace('{0}', data.idRegTramiteOL);
													msj = msj.replace('{1}', data.profesional);
													var dataSit= {
														"idtramite":id_form_tra,
														"notificacion":msj,
														"sistema":data.igobServNotificacionSistema,
														"usuario":"CIUDADANO",
														"url_adjunto":""
													}
													$http({
														method: 'POST',
														url: data.igobServNotificacionURL,
														data: Object.toparams(dataSit),
														headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + dataCre.token }
													}).success(function (dataNotifIgob, status, headers, config) {
														$.unblockUI();
														console.log("Enviar notificacion", dataNotifIgob);
														if(dataNotifIgob.success){

														}
														else{
															swal('', 'No se pudo enviar la notificacion. '  + JSON.stringify(dataNotifIgob), 'error');
															$.unblockUI();
														}

													}).error(function (data, status, headers, config) {
														console.log("error email conexion",data, status, headers, config);
														swal('', 'Error al registrar trámite en IGOB', 'error');
														$.unblockUI();
													});

													//
												}
												else
												{

												}
											}).error(function (data, status, headers, config) {
												console.log("error email conexion",data, status, headers, config);
												swal('', 'Error al registrar trámite en IGOB', 'error');
												$.unblockUI();
											});
										}
									}
									else{
										swal('', 'Error al registrar trámite en IGOB' + JSON.stringify(dataRegIgob), 'error');
										$.unblockUI();
									}
								}).error(function (data, status, headers, config) {
									console.log("error email conexion",data, status, headers, config);
									swal('', 'Error al registrar trámite en IGOB', 'error');
									$.unblockUI();
								});
								/// igob reg
							}
							else{
								return ;
								//****ernvio de comentario notificacion */
								var msj = data.igobServNotificacionMsj.replace('{0}', data.idRegTramiteOL);
								msj = msj.replace('{1}', data.profesional);
								var dataSit= {
									"idtramite":idTramiteIGOB,
									"notificacion":msj,
									"sistema":data.igobServNotificacionSistema,
									"usuario":"CIUDADANO",
									"url_adjunto":""
								}
								$http({
									method: 'POST',
									url: data.igobServNotificacionURL,
									data: Object.toparams(dataSit),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + dataCre.token }
								}).success(function (dataNotifIgob, status, headers, config) {
									$.unblockUI();
									console.log("Enviar notificacion", dataNotifIgob);
									if(dataNotifIgob.success){

									}
									else{
										swal('', 'No se pudo enviar la notificacion. '  + JSON.stringify(dataNotifIgob), 'error');
										$.unblockUI();
									}

								}).error(function (data, status, headers, config) {
									console.log("error email conexion",data, status, headers, config);
									swal('', 'Error al registrar trámite en IGOB', 'error');
									$.unblockUI();
								});

								//
							}

						}).error(function (data, status, headers, config) {
							console.log("error credentials coneccion",data, status, headers, config);
							swal('', 'Error al enviar credenciales al IGOB', 'error');
							$.unblockUI();
						});
					}
				}).error(function (data, status, headers, config) {
					console.log("error email conexion",data, status, headers, config);
					swal('', 'Error al registrar trámite en IGOB', 'error');
					$.unblockUI();
				});
			},
		

			imprimirFomulario402:function (param){
				console.log(param);
				var fecha =  param.FECHA_REGISTRO;
				var fecha1="";
				if (fecha == null) {
					return '';
				}
				else {
					var f = new Date(parseInt(fecha.replace("/Date(", "").replace(")/", ""), 10)),
        			dia = f.getDate(), mes = (parseInt(f.getMonth()) + 1), anio = f.getFullYear();
					//var codigo_fecha = parseInt(fecha.replace("/Date(", "").replace(")/", ""));
					fecha1=(dia < 10 ? "0" + dia : dia) + "/" + (mes < 10 ? "0" + mes : mes) + "/" + anio; //new Date(codigo_fecha).toLocaleDateString("es-AR");
					//var fecha_formato = $.format.date(fecha1, "dd-MM-yyyy");
					
				}
			
				/*alert(date.getFullYear());
				alert(date.getMonth());
				alert(date.getDay());*/
				/*let nom=param.cadenanombrescompleto.substring(0,param.cadenanombrescompleto.length-1);
				let arr = nom.split('|');
				let nom1=param.cadenaci.substring(0,param.cadenaci.length-1);
				let arr1 = nom1.split('|');
				console.log(param);
				var html='<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td  style="width: 70%; font-family:Arial; font-size:12px; color:#666; font-style:bold; text-align: center;"><b>NOMBRE Y APELLIDO O RAZÓN SOCIAL</b></td><td  style="width: 30%; font-family:Arial; font-size:12px; color:#666; font-style:bold; text-align: center;"><b>CI./NIT</b></td><t/r>';
				for(i=0;i<arr.length;i++)
				{
					html=html+'<tr><td  style="width: 70%; font-family:Arial; font-size:12px; color:#666; font-style:bold; text-align: left;">' +arr[i]+'</td><td  style="width: 30%; font-family:Arial; font-size:12px; color:#666; font-style:bold; text-align: center;">' +arr1[i]+'</td></tr>';

				}
				html=html+'</table>';*/

				var  printContents ='<div align="center">' +
				'<table width="98%" border="0" cellspacing="0" cellpadding="0">' +
					'<tr>' +
						'<td>' +
							'<div align="center"><img src="../../libs/img/log.png" height="50" /></div>' +
							
						'</td>' +
						'<td>' +
							'<p align="center">' +
						   ' <span style="font-family:Arial; font-size:14px; color:#666; font-weight: bold;"> FORMULARIO SOLICITUD DE MODIFICACIÓN DE DATOS TÉCNICOS</span><br>' +
						'</td>' +
					
					'</tr>' +
				'</table>' +
			'</div>' +
			'<br>' +
			'<center>' +
				'<table width="80%" border="0" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
					'<tr border="1">' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666;  font-weight: bold; text-align: center;">FORM 402 - A</td>' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666;  font-weight: bold; text-align: center;">NUMERO DE INMUEBLE</td>' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666;  font-weight: bold; text-align: center;">FECHA DE LA SOLICITUD</td>' +
					'</tr> ' +
					'<tr border="1">' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666; font-style:bold; text-align: center;">No. '+param.ID+'</td>' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666; font-style:bold; text-align: center;">'+param.NUMERO_INMUEBLE+'</td>' +
						'<td style="width: 33%; font-family:Arial; font-size:15px; color:#666; font-style:bold; text-align: center;">'+fecha1+'</td>' +
					'</tr>' +
					
			   ' </table>' +
				'<table width="80%" border="2" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
					'<tr>' +
					     
						'<td style="width: 40%; font-family:Arial; font-size:11px; color:#666; font-weight: bold; text-align: left; border: 0mm;">NOMBRE Y APELLIDO O RAZÓN SOCIAL: </td>' +
						'<td style="width: 60%; font-family:Arial; font-size:11px; color:#666; font-style:bold; text-align: left; border: 0mm;"> '+param.NOMBRE_RAZON_SOCIAL+'  '+param.PRIMER_APELLIDO+' '+param.SEGUNDO_APELLIDO+' '+param.APELLIDO_ESPOSO+'</td> ' +
					'</tr>' +
					'<tr>' +
						'<td style="width: 40%; font-family:Arial; font-size:11px; color:#666; font-weight: bold; text-align: left; border: 0mm;">C.I./NIT: </td>' +
						'<td style="width: 60%; font-family:Arial; font-size:11px; color:#666; font-style:bold; text-align: left; border: 0mm;"> '+param.CARNET_IDENTIDAD+'</td> ' +
					'</tr>' +					
					'<tr>' +
						'<td style="width: 40%; font-family:Arial; font-size:11px; color:#666; font-weight: bold; text-align: left; border: 0mm;">DIRECCIÓN DEL INMUEBLE: </td>' +
						'<td style="width: 60%; font-family:Arial; font-size:11px; color:#666; font-style:bold; text-align: left; border: 0mm;">Macrodistrito:'+param.MACRO_DISTRITO+' Distrito:'+' '+param.DISTRITO+' Zona:'+param.ZONA+' Calle/Av.:'+param.CALLE_AVENIDA+' Nro:'+param.NUMERO_INMUEBLE+'</td> ' +
					'</tr>' +
				'</table>' +
			'</center>' +
			
			'<br>' +
			'<br>' +
			
			'<center>' +
				'<table width="80%"  cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
					'<tr border="1">' +
						'<td style="width: 100%; font-family:Arial; font-size:15px; color:#666;  font-weight: bold; text-align: center;">INFORMACIÓN DEL INMUEBLE OBJETO DE MODIFICACIÓN</td>' +
					'</tr> ' +
				'</table>' +
				'<br>' +
				'<table>'+
				'<tr>'+
				'</td>rrr'+
				'</td>'+
				'</tr>'+
				'</table>'+
			
				'<table width="80%" border="2" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;"> ' +
					'<tr border="2">' +
						'<table width="20%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
							'<tr>' +
								'<br>' +
								'<td style="width: 50%; font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center; border: 0mm;">DATOS DE LA CONSTRUCCIÓN REGISTRADOS EN EL PMC</td>' +
								'<td style="width: 50%; font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center; border: 0mm;">DATOS A MODIFICAR</td>   ' +
							'</tr> ' +
						'</table>' +
				   '</tr>' +
					'<br>' +
					'<tr>' +
						'<table width="80%" >  ' +
							'<tr style="border: black 2px solid;">' +
								'<td style="border: black 2px solid;">' +
									'<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: left;">SUPERFICIE DE CONSTRUCCIÓN A MODIFICAR mts2 :</td>' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: normal; text-align: center;">'+param.SUPERFICIE_CONSTRUIDA_RUAT+'</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: left;">BLOQUE :</td>' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: normal; text-align: center;">MODIFICAR</td>' +
										'</tr>' +
									'</table>' +
									
								'</td>' +
								'<td style="border: black 2px solid;">' +
									'<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: left;">SUPERFICIE A MODIFICAR m2:</td>' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: normal; text-align: center;">'+param.SUPERFICIE_A_MODIFICAR+'</td> ' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: left;">TIPO DE CONSTRUCCIÓN:</td>' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: normal; text-align: center;">'+param.TIPO_DE_VIVIENDA+'</td> ' +
										'</tr>' +
										
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: left;">TIPOLOGIA DE LA CONSTRUCCIÓN:</td>' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: normal; text-align: center;">'+param.MONTO_DETERMINADO+'</td> ' +
										'</tr>' +
									'</table>' +
								'</td>' +
							'</tr>' +
						'</table>' +
					'</tr>' +
				'</table>' +
				'<br>' +
				'<table width="80%" border="0" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
					'<tr border="1">' +
						'<td style="width: 100%; font-family:Arial; font-size:15px; color:#666;  font-weight: bold; text-align: center;">SUSCRIPCIÓN DE DDJJ</td>' +
					'</tr> ' +
				'</table>' +
				'<br>' +
				'<table width="80%" border="2" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;"> ' +
					'<tr border="2">' +
						'<table width="80%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">  ' +
							'<tr>' +
								'<br>' +
								'<td style="width: 100%; font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center; border: 0mm;">' +
									'La presente declaración jurada se suscribe conforme a lo establecido en el articulo 22,78 y 157de la ley Nro. 2492 <br>' +
									'JURO LA EXACTITUD DE LA INFORMACIÓN DECLARADA EN EL PRESENTE FORMULARIO' +
								'</td> ' +
							'</tr> ' +
						'</table>' +
					'</tr>' +
				   '<br>' +
					'<tr>' +
						'<table width="80%" >  ' +
							'<tr style="border: black 2px solid;">' +
								'<td style="border: black 2px solid;">' +
									'<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">FIRMA:</td></br>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">ACLARACIÓN DE FIRMA :</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">C.I. NRO :</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">CORREO ELECTRONICO :</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style="font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">TELEFONO DE CONTACTO :</td>' +
										'</tr>' +
									'</table>' +
									
								'</td>' +
								'<td style="border: black 2px solid;">' +
									'<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial; font-size:10px; color:#333;">' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
										'</tr>' +
										'<tr style="width: 50%;">' +
											'<td style=" font-family:Arial; font-size:12px; color:#666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
										'</tr>' +
									'</table>' +
								'</td>' +
							'</tr>' +
						'</table>' +
					'</tr>' +
				'</table>' +
			'</center>' ;
			var  printContents1 ='<center>' +
			'<table style="font-family: Arial; font-size: 10px; color: #333333; width: 80%;" border="1" width="80%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr>' +
			'<td rowspan=2 style="width: 21.2979%; font-family: Arial; font-size: 12px; color: #666666; text-align: center;"><br><div align="center"><img src="../../libs/img/log.png" height="50" /></div><br></td>' +
			'<td style="width: 21.1206%; font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: center;">FORMULARIO</td>' +
			'<td style="width: 89.5815%; font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: center;" colspan="2">SOLICITUD DE MODIFICACI&Oacute;N DE DATOS T&Eacute;CNICOS</td>' +
			'</tr>' +
			'<tr>' +
			
			'<td style="width: 21.1206%; font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: center;">FORM 402 - A</td>' +
			'<td style="width: 31.2269%; font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: center;">NUMERO DE INMUEBLE</td>' +
			'<td style="width: 58.3546%; font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: center;">FECHA DE LA SOLICITUD</td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 21.2979%; font-family: Arial; font-size: 8px; color: #666666; text-align: center; font-weight: bold;">SOLICITUD DE MODIFICACI&Oacute;N DE DATOS DE CONSTRUCCI&Oacute;N</td>' +
			'<td style="width: 21.1206%; font-family: Arial; font-size: 12px; color: #666666; text-align: center;">No. '+param.ID+'</td>' +
			'<td style="width: 31.2269%; font-family: Arial; font-size: 12px; color: #666666; text-align: center;">'+param.NUMERO_INMUEBLE+'</td>' +
			'<td style="width: 58.3546%; font-family: Arial; font-size: 12px; color: #666666; text-align: center;">'+fecha1+'</td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 132%;" colspan="4">' +
			'<table>' +
			'<tbody>' +
			'<tr>' +
			'<td style="width: 176.281px;font-family: Arial; font-size: 12px; color: #666666;">NOMBRE Y APELLIDO O RAZ&Oacute;N SOCIAL:</td>' +
			'<td style="width: 353.312px;font-family: Arial; font-size: 12px; color: #666666;">'+param.NOMBRE_RAZON_SOCIAL+'  '+param.PRIMER_APELLIDO+' '+param.SEGUNDO_APELLIDO+' '+param.APELLIDO_ESPOSO+'</td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 176.281px;font-family: Arial; font-size: 12px; color: #666666;">C.I./NIT:</td>' +
			'<td style="width: 353.312px;font-family: Arial; font-size: 12px; color: #666666;"> '+param.CARNET_IDENTIDAD+'</td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 176.281px;font-family: Arial; font-size: 12px; color: #666666;">DIRECCI&Oacute;N DEL INMUEBLE:</td>' +
			'<td style="width: 353.312px;font-family: Arial; font-size: 12px; color: #666666;">'+param.MACRO_DISTRITO+' Distrito:'+' '+param.DISTRITO+' Zona:'+param.ZONA+' Calle/Av.:'+param.CALLE_AVENIDA+' Nro:'+param.NUMERO_INMUEBLE+'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			
			'<table style="font-family: Arial; font-size: 10px; color: #333;"  width="80%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr>' +
			'<td style="width: 100%; font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;"><br>INFORMACI&Oacute;N DEL INMUEBLE OBJETO DE MODIFICACI&Oacute;N</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'<table style="font-family: Arial; font-size: 12px; color: #333333; width: 80%;" border="1" width="80%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr>' +
			'<td style="width: 40%; font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">&nbsp;&nbsp;<br />DATOS DE LA CONSTRUCCI&Oacute;N REGISTRADOS EN EL PMC<br /></td>' +
			'<td style="width: 40%; font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">&nbsp;</td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 40%;">' +
			'<table style="font-family: Arial; font-size: 10px; color: #333;" width="100%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr style="width: 40%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: left;"><br />&nbsp;SUPERFICIE DE CONSTRUCCI&Oacute;N A MODIFICAR mts2 :<br /></td>' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: normal; text-align: center;"><br />'+param.SUPERFICIE_CONSTRUIDA_RUAT+'&nbsp;&nbsp;<br /></td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</td>' +
			'<td style="width: 60%;">' +
			'<table style="font-family: Arial; font-size: 10px; color: #333333; width: 100%;" width="100%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr style="width: 60%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: left; width: 80.8664%;"><br />&nbsp;SUPERFICIE A MODIFICAR m2 :</td>' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: normal; text-align: center; width: 18.4116%;">'+param.SUPERFICIE_A_MODIFICAR+'</td>' +
			'</tr>' +
			'<tr style="width: 60%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: left; width: 80.8664%;">&nbsp;TIPO DE CONSTRUCCI&Oacute;N :</td>' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: normal; text-align: center; width: 18.4116%;">'+param.TIPO_DE_VIVIENDA+'</td>' +
			'</tr>' +
			'<tr style="width: 60%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: left; width: 80.8664%;">&nbsp;TIPOLOGIA DE LA CONSTRUCCI&Oacute;N :</td>' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: normal; text-align: center; width: 18.4116%;">'+param.TIPO_DE_CONSTRUCCION+'</td>' +
			'</tr>' +
			'<tr style="width: 60%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: bold; text-align: left; width: 80.8664%;">&nbsp;MONTO DETERMINADO :</td>' +
			'<td style="font-family: Arial; font-size: 12px; color: #666666; font-weight: normal; text-align: center; width: 18.4116%;">'+param.MONTO_DETERMINADO+'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'<table style="font-family: Arial; font-size: 10px; color: #333;" width="80%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr>' +
			'<td style="width: 100%; font-family: Arial; font-size: 15px; color: #666; font-weight: bold; text-align: center;"><br />SUSCRIPCI&Oacute;N DE DDJJ<br /></td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'<table style="font-family: Arial; font-size: 10px; color: #333333; width: 80%;" border="2" width="80%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr>' +
			'<td style="width: 100%; font-family: Arial; font-size: 12px; color: #666;  text-align: center; border: 0mm;" colspan="2"><br />La presente Declaraci&oacute;n Jurada se suscribe conforme a lo establecido en el Articulo 22,78 y 157 de la Ley Nro. 2492. CONFORME Ley Municipal <br />Autionoma N&ordm; 467, Regularizacion De Edificaciones y Adecuacion NORMATIVA Territorial<br /><br />JURO LA EXACTITUD DE LA INFORMACI&Oacute;N DECLARADA EN EL PRESENTE FORMULARIO<br /><br /></td>' +
			'</tr>' +
			'<tr>' +
			'<td style="width: 100%;">' +
			'<table style="font-family: Arial; font-size: 10px; color: #333;" width="100%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr style="width: 35%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666;  text-align: left;">&nbsp;&nbsp;FIRMA:</td>' +
			'</tr>' +
			'<tr style="width: 35%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666;  text-align: left;">&nbsp;&nbsp;ACLARACI&Oacute;N DE FIRMA :</td>' +
			'</tr>' +
			'<tr style="width: 35%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666;  text-align: left;">&nbsp;&nbsp;C.I. NRO :</td>' +
			'</tr>' +
			'<tr style="width: 35%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666;  text-align: left;">&nbsp;&nbsp;CORREO ELECTRONICO :</td>' +
			'</tr>' +
			'<tr style="width: 35%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666;  text-align: left;">&nbsp;&nbsp;TELEFONO DE CONTACTO :</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</td>' +
			'<td style="width: 68.306%;">' +
			'<table style="font-family: Arial; font-size: 10px; color: #333;" width="100%" cellspacing="0" cellpadding="0">' +
			'<tbody>' +
			'<tr style="width: 65%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
			'</tr>' +
			'<tr style="width: 65%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
			'</tr>' +
			'<tr style="width: 65%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
			'</tr>' +
			'<tr style="width: 65%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
			'</tr>' +
			'<tr style="width: 65%;">' +
			'<td style="font-family: Arial; font-size: 12px; color: #666; font-weight: bold; text-align: center;">_______________________________________________________</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</center>' ;
			//console.log(printContents1);
            var popupWin = window.open('', '_blank', 'width=800,height=550');
            popupWin.document.open()
            popupWin.document.write('<html><head></head><body onload="window.print()">' + printContents1 + '<br><br></html>');
            popupWin.document.close();  
			},
			/*
			establecerDatosTipoServicioyRegistro:function (idCatastroTipoServicio,idCatastroTipoRegistro) {
				$scope.solicitud.idCatastroTipoServicio = idCatastroTipoServicio; //1	CATASTRO MASIVO, 2	SERVICIO MUNICIPAL,3	CATASTRO EXTERNO
				$scope.solicitud.idCatastroTipoRegistro = idCatastroTipoRegistro; // 1 nuevo, 2 actualizacion

			},*/






			
			//Obsoleto
			seguimientoFlujo : function (sol) {
				$.blockUI();
				if(sol.piif)
				{
					var p = {q: sol.piif};
					$http({
						method: 'POST',
						url: CONFIG.SERVICE_SITOLextgen + 'ApiMotorFlujo/FlujoSeguimientoTarea',
						data: Object.toparams(p),
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function (data, status, headers, config) {
						if(data.res)
						{
							swal('', 'Error al consultar seguimiento de trámite', 'error');
						}
						else{
							$('#seguimientoNroSolicitud').val(sol.idCatastroTramiteOL);
							//$('#seguimientoTipoTramite').val($scope.config.tipoTramite.descripcion);
							$scope.listaSeguimientoTareas = data;
							$('#divPopupSeguimiento').modal('show');
						}
						$.unblockUI();
					}).error(function (data, status, headers, config) {
						swal('', 'Error al consultar seguimiento de trámite', 'error');
						$.unblockUI();
					});
				}
				else
				{
					swal('', 'Error al consultar seguimiento de trámite', 'error');
					console.log("No se puede ver el seguimiento, parámetro no valido");
				}
			},
			seguimientoSitram : function (nro, pwd) {
				console.log(nro, pwd);
				$scope.tmpSitram = nro;
				$scope.tmpSitramPwd = pwd;
				$.blockUI();
				var p = {
					"nroTramite":nro,
					"clave": pwd
				};
				$http({
					method: 'POST',
					//url: 'http://serviciosrs.lapaz.bo/wsSTTF/visualizarTramitesSITRAM',
					//url:'https://gamlpmotores.lapaz.bo/gamlp/wsSTTF/visualizarTramitesSITRAM',
					//url:'http://192.168.5.141:9091/wsSTTF/visualizarTramitesSITRAM',
					url:  CONFIG.CONEXION_API_PG_IF_OFICIAL + 'wsSTTF/visualizarTramitesSITRAM',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					console.log("aaa", data);
					$.unblockUI();
					if(data.success)
					{
						$scope.listaSeguimientoSitram = data.success.data;
						//$('#seguimientoNroSolicitud').val(sol.idCatastroTramiteOL);
						$('#divPopupSeguimiento').modal('show');

					}
					else{
						swal('', 'Error al consultar seguimiento de trámite', 'error');
					}

				}).error(function (data, status, headers, config) {
					swal('', 'Error al consultar seguimiento de trámite', 'error');
					$.unblockUI();
				});
			},
			descargar:function (piif) {
				var params = Object();
				params.idoc = $scope.configParametros.documentoSolicitud.idTipoDocIfile;//195;
				params.q = piif;
				//return $http.post("DocumentoFlujo", JSON.stringify(params), { responseType: 'arraybuffer', headers: {} });

				var promise = $http.post(CONFIG.SERVICE_SITOLextgen + 'Catastro/DocumentoFlujo', JSON.stringify(params), { responseType: 'arraybuffer', headers: {} });
				promise.success(function (response) {
					//console.log("response", response);
					var formato = "pdf";
					var nombreArchivo = "Solicitud.pdf";
					var contentType = "";
					if (formato == 'pdf') {
						contentType = "application/pdf";
					}
					else if (formato == "dwg") {
						contentType = "image/vnd.dwg";
					}
					var file = new Blob([response], { type: formato });
					//console.log("file", file);
					var isChrome = !!window.chrome && !!window.chrome.csi;//!!window.chrome.webstore;
					var isIE = /*cc_on!*/false || !!document.documentMode;
					var isEdge = !isIE && !!window.StyleMedia;
					if (isChrome) {
						var url = window.URL || window.webkitURL;

						var downloadLink = angular.element('<a></a>');
						downloadLink.attr('href', url.createObjectURL(file));
						downloadLink.attr('target', '_self');
						downloadLink.attr('download', nombreArchivo);
						downloadLink[0].click();
					}
					else if (isEdge || isIE) {
						window.navigator.msSaveOrOpenBlob(file, nombreArchivo);

					}
					else {
						var fileURL = URL.createObjectURL(file);
						window.open(fileURL);
					}
				})
					.error(function (error) {
						console.log("error", error);
						$rootScope.notificacionError("Error al descargar archivo");
					});
			},
			
			
			
		}
	}

	$scope.tblSolicitudesExterno = new ngTableParams({
		page: 1,
		count: 10,
		filter: {},
		sorting: {
			fechaRegistro: 'desc'
		}
	}, {
		total: $scope.solicitud.listaExterno.length,
		getData: function($defer, params) {
			var filteredData = params.filter() ? $filter('filter')($scope.solicitud.listaExterno, params.filter()) : $scope.solicitud.listaExterno;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : $scope.solicitud.listaExterno;
			params.total($scope.solicitud.listaExterno.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	});


	$scope.tblSolicitudesExternoFormulario402 = new ngTableParams({
		page: 1,
		count: 10,
		filter: {},
		sorting: {
			fechaRegistro: 'desc'
		}
	}, {
		total: $scope.solicitud.listaSolicitudF02.length,
		getData: function($defer, params) {
			var filteredData = params.filter() ? $filter('filter')($scope.solicitud.listaSolicitudF02, params.filter()) : $scope.solicitud.listaSolicitudF02;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : $scope.solicitud.listaSolicitudF02;
			params.total($scope.solicitud.listaSolicitudF02.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	});


	$scope.tblSolicitudesNombres = new ngTableParams({
		page: 1,
		count: 10,
		filter: {}		
	}, {
		total: $scope.solicitud.listaNombres.length,
		getData: function($defer, params) {
			var filteredData = params.filter() ? $filter('filter')($scope.solicitud.listaNombres, params.filter()) : $scope.solicitud.listaNombres;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : $scope.solicitud.listaNombres;
			params.total($scope.solicitud.listaNombres.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	});

	$scope.inicio = function () {
		
		$scope.servicioTerritorio.seleccionado=null;
		setTimeout(function()
		{
			try{
				
				

				//$scope.mapa.acciones.iniciar();
				//$scope.srcTutorial="../Catastro/img/RegistroCatastralNuevoInfograma.png";
				$scope.configParametros.documentoSolicitud.acciones.obtener();
				$scope.configParametros.tasas.acciones.obtener();
				$scope.solicitud.acciones.listarExterno();
				$scope.solicitud.acciones.listarFor402Solitud();
				$scope.solicitud.acciones.establecerDatosSolicitante();
				//$scope.predio.acciones.listar();
				$scope.profesinalExterno.acciones.listar();

				console.log("controlando redireccion de catastro");
				var servicioCatReferer = sessionService.get('servicioCat');
				if(servicioCatReferer){
					console.log("Redireccion desde catastro",servicioCatReferer);
					if(servicioCatReferer == 2){
						$scope.solicitud.acciones.reset();
						$scope.servicioTerritorio.acciones.seleccionar($scope.servicioTerritorio.municipal);
					}
					else if(servicioCatReferer == 3){
						$scope.solicitud.acciones.reset();
						$scope.servicioTerritorio.acciones.seleccionar($scope.servicioTerritorio.externo);
					}
					sessionService.destroy('servicioCat');
				}
				else
				{
					
					$scope.servicioTerritorio.seleccionado=null;
					$scope.servicioTerritorio.acciones.seleccionar($scope.servicioTerritorio.externo);
				}
				
			}catch(e)
			{
				console.log("error", e);
			}
		},500);

		/*
		setTimeout(function()
		{
			try{
				sessionService.destroy('servicioCat');

			}catch(e)
			{
				console.log("error", e);
			}
		},1000);
		*/
	}

	$scope.loading = {
		blockUI: false,
		show:function () {
			$scope.loading.blockUI = true;
		},
		hide:function () {
			$scope.loading.blockUI = false;
		}
	};
	dbg = $scope;



	function getFormattedDate(date) {
		var year = date.getFullYear();

		var month = (1 + date.getMonth()).toString();
		month = month.length > 1 ? month : '0' + month;

		var day = date.getDate().toString();
		day = day.length > 1 ? day : '0' + day;

		return day + '/' + month + '/' + year;
	}

	$scope.profesinalExterno = {
		lista:[],
		filtro:null,
		encontrado:null,
		acciones:{
			listar: function () {
				$scope.profesinalExterno.lista = [];
				var apiSIT = new dataSIT();
				apiSIT.pcListaArquitecto(function(resultado){
					var resApi = JSON.parse(resultado);
					if(resApi.success){
						$scope.profesinalExterno.lista = resApi.success.dataSql;
						var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
						//$scope.tblProfesionalExterno.reload();
					}
					else
					{
						swal('', 'Error al recuperar la data de arquitectos', 'error');
						console.log("Error al recuperar la data de arquitectos",resApi.error.message,resApi.error.code);
					}
				});
			},
			buscarPorNro:function (nro) {
				$scope.solicitud.profesionalNombre=null;
				$scope.solicitud.profesionalEmail=null;
				$scope.solicitud.profesionalTelefono=null;
				$scope.solicitud.profesionalCab=null;
				$scope.profesinalExterno.encontrado = null;
				var encontrado = false;
				angular.forEach($scope.profesinalExterno.lista, function (item) {
					if(item.registroNacionalCAB + '' == nro + ''){
						$scope.profesinalExterno.encontrado = true;
						$scope.solicitud.acciones.establecerDatosProfesional(item.arquitectoNombre,item.registroNacionalCAB,  item.telefonoCelular, item.correoElectronico);
					}
				})
				if($scope.profesinalExterno.encontrado == null){
					$scope.profesinalExterno.encontrado= false;
				}
			},
		}
	}

	


}
