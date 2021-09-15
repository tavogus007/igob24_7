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

function RegistrocatastralactController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad,$timeout,$window)
{
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

	$scope.servicioCatastral = {
		seleccionado : null,
		municipal:{
			titulo : "ACTUALIZACIÓN DE DATOS TÉCNICOS MEDIANTE SERVICIO MUNICIPAL DE CATASTRO",
			codigo :"municipal",
			vistas:{
				seleccionado:null,
				guia:{
					titulo:"GUÍA DE TRÁMITE",
					codigo:"guiaE"
				},
			}
		},
		externo:{
			titulo : "ACTUALIZACIÓN DE DATOS TÉCNICOS MEDIANTE PROFESIONAL EXTERNO HABILITADO",
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
				solicitar:{
					titulo:"SOLICITAR TRÁMITE",
					codigo:"solicitarE"
				},
			}
		},
		acciones:{
			seleccionar:function (servicio) {
				$scope.servicioCatastral.seleccionado =  angular.copy(servicio);
				$scope.servicioCatastral.seleccionado.vistas.seleccionado =angular.copy($scope.servicioCatastral.seleccionado.vistas.guia);
				if($scope.servicioCatastral.seleccionado.codigo == $scope.servicioCatastral.externo.codigo){
					$scope.solicitud.acciones.establecerDatosTipoServicioyRegistro(3,2);//tipo servicio 3 externo, tipo registro 2 actualizacion
				}
			},
			seleccionarVista:function (vista) {
				$scope.servicioCatastral.seleccionado.vistas.seleccionado =  angular.copy(vista);
			}
		}
		
	}

	$scope.vistaPreliminar = {
		seleccionado : null,
		inicio:{
			titulo : "ACTUALIZACIÓN DE REGISTRO CATASTRAL",
			codigo :"inicio",
		},
		datosLegales:{
			titulo : "ACTUALIZACIONES INMEDIATAS EN PLATAFORMA",
			codigo :"datoslegales",
		},
		datosTecnicos:{
			titulo : "ACTUALIZACIÓN DE DATOS TÉCNICOS",
			codigo :"datostecnicos",
		},
		acciones:{
			seleccionar:function (vista) {
				$scope.vistaPreliminar.seleccionado =  angular.copy(vista);
			},
			volverInicio:function () {
				$scope.vistaPreliminar.acciones.seleccionar($scope.vistaPreliminar.inicio);
				$scope.servicioCatastral.seleccionado = null;
			},
		}
	}

	
	$scope.solicitud = {

		idCatastroTramiteOL: null,
		idCatastroTramite: null,
		idInsFlujo: null,
		geojson: null,
		wkt: null,
		idTipoRegimen: null, //PU o PH
		idCatastroTipoTramite: null, //1 nuevo, 2 actualziacion 3 reingreso

		oid:null,
		solicitante: null,
		idTipoDocumento: null,
		numDocumento: null,
		idExpedido: null,
		telefonoSolicitante: null,
		emailSolicitante: null,
		tipoPersona:null,
		profesionalNombre:null,
		profesionalEmail:null,
		profesionalTelefono:null,
		profesionalCab:null,

		idMacrodistrito: null,
		iddistritoMunicipal: null,
		codigoCatastral: null,
		direccion: null,
		zona: null,
		nroPuerta: null,
		sector: null,
		edificio: null,
		bloque: null,

		riesgo: null,
		idCodPlanimetria: null,
		descPlanimetria: null,
		idTipoLote: null,
		//superficie: null,
		numeroPisos: null,
		numeroBloques: null,
		tieneSotano: null,
		numeroInmueble: null,
		pmc: null,
		fotoFachada: null,

		carTerrPendiente: null,
		carViaPendiente: null,
		serBasAlcantarillado: null,
		serBasEnergiaElectrica: null,
		serBasTelefono: null,
		serBasAguaPotable: null,
		serBasAlumbradoPublico: null,
		serBasGasDomiciliario: null,
		supTotalConstruida: null,
		supSegunLevantamiento: null,
		supSegunTestimonio: null,

		archivo1: null,
		archivo2: null,
		archivo3: null,
		archivo4: null,

		idRequisitos: null,
		conCertificado: null,
		FUMCertificado: null,

		idEstado: null,
		idTipoAcceso: null,
		correosProcesamiento: null,
		tieneMensura:null,
		idInsFlujoAnterior:null,
		msgReqLevantamiento:null,

		listaExterno:[],
		acciones:{
			reset:function () {
				$scope.solicitud.idCatastroTramiteOL= null;
				$scope.solicitud.idCatastroTramite= null;
				$scope.solicitud.idInsFlujo= null;
				$scope.solicitud.geojson= null;
				$scope.solicitud.wkt= null;
				$scope.solicitud.idTipoRegimen= null; //PU o PH
				$scope.solicitud.idCatastroTipoTramite= null; //1 nuevo; 2 actualziacion 3 reingreso

				//$scope.solicitud.idCatastroTipoServicio = null; //1	CATASTRO MASIVO, 2	SERVICIO MUNICIPAL,3	CATASTRO EXTERNO
				//$scope.solicitud.idCatastroTipoRegistro = null; // 1 nuevo, 2 actualizacion

				//$scope.solicitud.oid = null;
				//$scope.solicitud.solicitante= null;
				//$scope.solicitud.idTipoDocumento= null;
				//$scope.solicitud.numDocumento= null;
				//$scope.solicitud.idExpedido= null;
				//$scope.solicitud.telefonoSolicitante= null;
				//$scope.solicitud.emailSolicitante= null;
				//$scope.solicitud.tipoPersona = null;

				$scope.solicitud.profesionalNombre=null;
				$scope.solicitud.profesionalEmail=null;
				$scope.solicitud.profesionalTelefono=null;
				$scope.solicitud.profesionalCab=null;

				$scope.solicitud.idMacrodistrito= null;
				$scope.solicitud.iddistritoMunicipal= null;
				$scope.solicitud.codigoCatastral= null;
				$scope.solicitud.direccion= null;
				$scope.solicitud.zona= null;
				$scope.solicitud.nroPuerta= null;
				$scope.solicitud.sector= null;
				$scope.solicitud.edificio= null;
				$scope.solicitud.bloque= null;

				$scope.solicitud.riesgo= null;
				$scope.solicitud.idCodPlanimetria= null;
				$scope.solicitud.descPlanimetria= null;
				$scope.solicitud.idTipoLote= null;

				$scope.solicitud.numeroPisos= null;
				$scope.solicitud.numeroBloques= null;
				$scope.solicitud.tieneSotano= null;
				$scope.solicitud.numeroInmueble= null;
				$scope.solicitud.pmc= null;
				$scope.solicitud.fotoFachada= null;

				$scope.solicitud.carTerrPendiente= null;
				$scope.solicitud.carViaPendiente= null;
				$scope.solicitud.serBasAlcantarillado= null;
				$scope.solicitud.serBasEnergiaElectrica= null;
				$scope.solicitud.serBasTelefono= null;
				$scope.solicitud.serBasAguaPotable= null;
				$scope.solicitud.serBasAlumbradoPublico= null;
				$scope.solicitud.serBasGasDomiciliario= null;
				$scope.solicitud.supTotalConstruida= null;
				$scope.solicitud.supSegunLevantamiento= null;
				$scope.solicitud.supSegunTestimonio= null;

				$scope.solicitud.archivo1= null;
				$scope.solicitud.archivo2= null;
				$scope.solicitud.archivo3= null;
				$scope.solicitud.archivo4= null;

				$scope.solicitud.idRequisitos= null;
				$scope.solicitud.conCertificado= null;
				$scope.solicitud.FUMCertificado= null;

				$scope.solicitud.idEstado= null;
				$scope.solicitud.idTipoAcceso= null;
				$scope.solicitud.correosProcesamiento= null;
				$scope.solicitud.tieneMensura = null;
				$scope.solicitud.idInsFlujoAnterior = null;

				$scope.profesinalExterno.encontrado = null;
				$scope.solicitud.msgReqLevantamiento= null;

			},
			listarExterno:function () {
				$scope.solicitud.listaExterno = [];
				$.blockUI();
				var sNroDocCiudadano = sessionService.get('CICIUDADANO');
				if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
				{
					sNroDocCiudadano = sessionService.get('NITCIUDADANO');
				}
				var idCatastroTipoRegistro = 2;//Actualizacion
				var idCatastroTipoServicio = 3;//Profesional externo
				var solicitud = new dataSITOL();
				solicitud.catListaSolicitudes(
					sNroDocCiudadano,idCatastroTipoRegistro,idCatastroTipoServicio
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
			establecerDatosSolicitante:function () {

				$scope.solicitud.idCatastroTipoServicio = 3; //1	CATASTRO MASIVO, 2	SERVICIO MUNICIPAL,3	CATASTRO EXTERNO
				$scope.solicitud.idCatastroTipoRegistro = 2; // 1 nuevo, 2 actualizacion

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
							if(results[0].dtspsl_nombres)
								$scope.solicitud.solicitante = results[0].dtspsl_nombres;
							if(results[0].dtspsl_paterno)
								$scope.solicitud.solicitante = $scope.solicitud.solicitante + ' ' + results[0].dtspsl_paterno;
							if(results[0].dtspsl_materno)
								$scope.solicitud.solicitante = $scope.solicitud.solicitante + ' ' + results[0].dtspsl_materno;

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
							if(results[0].dtspsl_razon_social)
								$scope.solicitud.solicitante = results[0].dtspsl_razon_social;

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
			establecerDatosTipoServicioyRegistro:function (idCatastroTipoServicio,idCatastroTipoRegistro) {
				$scope.solicitud.idCatastroTipoServicio = idCatastroTipoServicio; //1	CATASTRO MASIVO, 2	SERVICIO MUNICIPAL,3	CATASTRO EXTERNO
				$scope.solicitud.idCatastroTipoRegistro = idCatastroTipoRegistro; // 1 nuevo, 2 actualizacion

			},
			establecerDatosBasicosPredio:function (codigoCatastral,descPlanimetria,direccion,edificio,idCodPlanimetria,idMacrodistrito,idPendienteTerreno,idTipoPredio,macrodistrito,nroPuerta,servAguaPotable,servAlcantarillado,servAlumbrado,servEnergiaElec,servGas,servTelefono,wkt,zona,iddistritoMunicipal, idTipoRegimen) {
				$scope.solicitud.codigoCatastral =  codigoCatastral;
				$scope.solicitud.descPlanimetria =  descPlanimetria;
				$scope.solicitud.direccion =  direccion;
				$scope.solicitud.edificio =  edificio;
				$scope.solicitud.idCodPlanimetria =  idCodPlanimetria;
				$scope.solicitud.idMacrodistrito =  idMacrodistrito;
				$scope.solicitud.carTerrPendiente =  idPendienteTerreno;
				$scope.solicitud.idTipoLote =  idTipoPredio;
				$scope.solicitud.macrodistrito =  macrodistrito;
				$scope.solicitud.nroPuerta =  nroPuerta;
				$scope.solicitud.serBasAguaPotable =  servAguaPotable;
				$scope.solicitud.serBasAlcantarillado =  servAlcantarillado;
				$scope.solicitud.serBasAlumbradoPublico =  servAlumbrado;
				$scope.solicitud.serBasEnergiaElectrica =  servEnergiaElec;
				$scope.solicitud.serBasGasDomiciliario =  servGas;
				$scope.solicitud.serBasTelefono =  servTelefono;
				$scope.solicitud.wkt =  wkt;
				$scope.solicitud.zona =  zona;
				$scope.solicitud.iddistritoMunicipal = iddistritoMunicipal;

				$scope.solicitud.idTipoRegimen = idTipoRegimen;
			},
			establecerDatosProfesional:function (nombre, cab, telefono, email) {
				$scope.solicitud.profesionalNombre=nombre;
				$scope.solicitud.profesionalEmail=email;
				$scope.solicitud.profesionalTelefono=telefono;
				$scope.solicitud.profesionalCab=cab;
			},
			establecerTipoTramite:function (idCatastroTipoTramite) {
				$scope.solicitud.idCatastroTipoTramite=idCatastroTipoTramite;
			},
			guardarEnviar: function () {
				$.blockUI();
				//console.log("entro");

				if($scope.solicitud.wkt == null || $scope.solicitud.wkt == undefined)
					$scope.solicitud.wkt ='';
				if($scope.solicitud.idTipoRegimen == null || $scope.solicitud.idTipoRegimen == undefined)
					$scope.solicitud.idTipoRegimen = 0;
				if($scope.solicitud.idCatastroTipoTramite == null || $scope.solicitud.idCatastroTipoTramite == undefined)
					$scope.solicitud.idCatastroTipoTramite =1;
				if($scope.solicitud.idExpedido == null || $scope.solicitud.idExpedido == undefined)
					$scope.solicitud.idExpedido ='11';
				if($scope.solicitud.idMacrodistrito == null || $scope.solicitud.idMacrodistrito == undefined)
					$scope.solicitud.idMacrodistrito =0;
				if($scope.solicitud.iddistritoMunicipal == null || $scope.solicitud.iddistritoMunicipal == undefined)
					$scope.solicitud.iddistritoMunicipal =0;
				if($scope.solicitud.idCodPlanimetria == null || $scope.solicitud.idCodPlanimetria == undefined)
					$scope.solicitud.idCodPlanimetria =0;
				if($scope.solicitud.idTipoLote == null || $scope.solicitud.idTipoLote == undefined)
					$scope.solicitud.idTipoLote =0;
				if($scope.solicitud.conCertificado == null || $scope.solicitud.conCertificado == undefined)
					$scope.solicitud.conCertificado =0;
				if($scope.solicitud.tieneMensura == null || $scope.solicitud.tieneMensura == undefined)
					$scope.solicitud.tieneMensura = 0;
				if($scope.solicitud.carTerrPendiente == null || $scope.solicitud.carTerrPendiente == undefined)
					$scope.solicitud.carTerrPendiente = 0;
				if($scope.solicitud.serBasAlcantarillado == null || $scope.solicitud.serBasAlcantarillado == undefined)
					$scope.solicitud.serBasAlcantarillado =0;
				if($scope.solicitud.serBasEnergiaElectrica == null || $scope.solicitud.serBasEnergiaElectrica == undefined)
					$scope.solicitud.serBasEnergiaElectrica =0;
				if($scope.solicitud.serBasTelefono == null || $scope.solicitud.serBasTelefono == undefined)
					$scope.solicitud.serBasTelefono =0;
				if($scope.solicitud.serBasAguaPotable == null || $scope.solicitud.serBasAguaPotable == undefined)
					$scope.solicitud.serBasAguaPotable =0;
				if($scope.solicitud.serBasAlumbradoPublico == null || $scope.solicitud.serBasAlumbradoPublico == undefined)
					$scope.solicitud.serBasAlumbradoPublico =0;
				if($scope.solicitud.serBasGasDomiciliario == null || $scope.solicitud.serBasGasDomiciliario == undefined)
					$scope.solicitud.serBasGasDomiciliario = 0;
				if($scope.solicitud.idInsFlujoAnterior == null || $scope.solicitud.idInsFlujoAnterior == undefined)
					$scope.solicitud.idInsFlujoAnterior =0;

				if($scope.solicitud.msgReqLevantamiento == null || $scope.solicitud.msgReqLevantamiento == undefined)
					$scope.solicitud.msgReqLevantamiento = '';


				var solicitud = new dataSITOL();
				solicitud.catSolicitudReg(
					$scope.solicitud.idCatastroTramiteOL==null?0:$scope.solicitud.idCatastroTramiteOL,
					$scope.solicitud.wkt,
					$scope.solicitud.idTipoRegimen,
					$scope.solicitud.idCatastroTipoTramite,
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
					$scope.solicitud.idMacrodistrito,
					$scope.solicitud.iddistritoMunicipal,
					$scope.solicitud.codigoCatastral,
					$scope.solicitud.direccion,
					$scope.solicitud.zona,
					$scope.solicitud.nroPuerta,
					$scope.solicitud.edificio,
					$scope.solicitud.idCodPlanimetria,
					$scope.solicitud.descPlanimetria,
					$scope.solicitud.idTipoLote,
					$scope.solicitud.conCertificado,
					$scope.solicitud.carTerrPendiente,
					$scope.solicitud.serBasAlcantarillado,
					$scope.solicitud.serBasEnergiaElectrica,
					$scope.solicitud.serBasTelefono,
					$scope.solicitud.serBasAguaPotable,
					$scope.solicitud.serBasAlumbradoPublico,
					$scope.solicitud.serBasGasDomiciliario,
					$scope.solicitud.tieneMensura,
					$scope.solicitud.idInsFlujoAnterior,
					$scope.solicitud.riesgo,
					$scope.solicitud.oid,
					$scope.solicitud.idCatastroTipoServicio, //1	CATASTRO MASIVO, 2	SERVICIO MUNICIPAL,3	CATASTRO EXTERNO
					$scope.solicitud.idCatastroTipoRegistro, // 1 nuevo, 2 actualizacion
					$scope.solicitud.msgReqLevantamiento
					, function(resultado){
						var resApi = JSON.parse(resultado);
						//console.log(resApi);
						if(resApi.success)
						{
							$.unblockUI();
							if(resApi.success.dataSql[0].d)
							{
								//enviar correo al arquitecto
								$scope.solicitud.acciones.delegarProfesional(resApi.success.dataSql[0].d,$scope.solicitud.profesionalNombre);
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
							console.log("Error al guardar",resApi.error.message,resApi.error.code);
						}
					});

			},
			delegarProfesional:function (param, profesional) {
				var p = {q: param};
				$.blockUI();
				$http({
					method: 'POST',
					//url: CONFIG.SERVICE_SITOLextgen + 'Territorio/EnviarCorreoDelegado',
					url: CONFIG.SERVICE_SITOLextgen + 'Catastro/DelegarSolicitud',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					$.unblockUI();
					if(data.res == "OK")
					{
						$scope.solicitud.acciones.listarExterno();
						swal('', 'Su solicitud fue delegada al profesional '+ profesional +'. \nUsted deberá coordinar con él, para el seguimiento de su trámite.', 'success');
						$scope.solicitud.acciones.reset();
						$scope.servicioCatastral.acciones.seleccionarVista($scope.servicioCatastral.seleccionado.vistas.tramites);
						$.unblockUI();
						$scope.solicitud.acciones.registrarIGOB(param);
					}
					else
					{
						console.log("error email",data);
						$scope.solicitud.acciones.reset();
						$scope.solicitud.acciones.listarExterno();
						$scope.servicioCatastral.acciones.seleccionarVista($scope.servicioCatastral.seleccionado.vistas.tramites);
						swal('', 'Error al enviar correo', 'error');
						$.unblockUI();
					}
				}).error(function (data, status, headers, config) {
					console.log("error email conexion",data, status, headers, config);
					swal('', 'Error al enviar correo', 'error');
					$scope.solicitud.acciones.reset();
					$scope.solicitud.acciones.listarExterno();
					$scope.servicioCatastral.acciones.seleccionarVista($scope.servicioCatastral.seleccionado.vistas.tramites);
					$.unblockUI();
				});
			},
			registrarIGOB:function (param) {
				var p = {q: param};
				$.blockUI();
				$http({
					method: 'POST',
					url: CONFIG.SERVICE_SITOLextgen + 'Catastro/RegistrarIGOBObtenerParam',
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
											url: CONFIG.SERVICE_SITOLextgen + 'Catastro/RegistrarIGOBActualizarIDtramite',
											data: Object.toparams(dataSit),
											headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
										}).success(function (dataActTram, status, headers, config) {
											$.unblockUI();
											console.log("Actualizar tramite en sitol", dataActTram);
											if(dataActTram.res == "OK")
											{
												//Enviar notificacion
												var msj = data.igobServNotificacionMsj.replace('{0}', data.idCatastroTramiteOL);
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
					url:'https://gamlpmotores.lapaz.bo/gamlp/wsSTTF/visualizarTramitesSITRAM',
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
			obtener:function (idCatastroTramiteOL, accion) {
				$.blockUI();
				var solicitud = new dataSITOL();
				solicitud.catObtenerSolicitud(
					idCatastroTramiteOL
					, function(resultado){
						$.unblockUI();
						var resApi = JSON.parse(resultado);
						if(resApi.success)
						{
							//console.log("sss", resApi);
							var data =resApi.success.dataSql[0];
							$scope.solicitud.idCatastroTramiteOL = data.idCatastroTramiteOL;
							$scope.solicitud.wkt  = data.wkt;
							$scope.solicitud.idTipoRegimen  = data.idTipoRegimen;
							$scope.solicitud.idCatastroTipoTramite = data.idCatastroTipoTramite;
							$scope.solicitud.idCatastroTipoServicio = data.idCatastroTipoServicio;
							$scope.solicitud.idCatastroTipoRegistro = data.idCatastroTipoRegistro;

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
							$scope.solicitud.idMacrodistrito = data.idmacroDistrito;
							$scope.solicitud.iddistritoMunicipal = data.iddistritoMunicipal;
							$scope.solicitud.codigoCatastral = data.codigoCatastral;
							$scope.solicitud.direccion = data.direccion;
							$scope.solicitud.zona = data.zona;
							$scope.solicitud.nroPuerta = data.nroPuerta;
							$scope.solicitud.edificio = data.edificio;
							$scope.solicitud.idCodPlanimetria = data.idCodPlanimetria;
							$scope.solicitud.descPlanimetria = data.descPlanimetria;
							$scope.solicitud.idTipoLote = data.idTipoLote;
							$scope.solicitud.conCertificado = 0;//data.conCertificado;
							if(data.conCertificado == true)
								$scope.solicitud.conCertificado;

							$scope.solicitud.carTerrPendiente = data.carTerrPendiente;

							$scope.solicitud.serBasAlcantarillado = 0;
							if(data.serBasAlcantarillado == true)
								$scope.solicitud.serBasAlcantarillado = 1;

							$scope.solicitud.serBasEnergiaElectrica = 0;
							if(data.serBasEnergiaElectrica == true)
								$scope.solicitud.serBasEnergiaElectrica = 1;

							$scope.solicitud.serBasTelefono = 0;
							if(data.serBasTelefono == true)
								$scope.solicitud.serBasTelefono = 1;

							$scope.solicitud.serBasAguaPotable = 0;
							if(data.serBasAguaPotable == true)
								$scope.solicitud.serBasAguaPotable = 1;

							$scope.solicitud.serBasAlumbradoPublico = 0;
							if(data.serBasAlumbradoPublico == true)
								$scope.solicitud.serBasAlumbradoPublico = 1;

							$scope.solicitud.serBasGasDomiciliario = 0;
							if(data.serBasGasDomiciliario == true)
								$scope.solicitud.serBasGasDomiciliario = 1;

							$scope.solicitud.tieneMensura = data.tieneMensura;
							$scope.solicitud.idInsFlujoAnterior = data.idInsFlujoAnterior;
							$scope.solicitud.riesgo = data.riesgo;

							if(accion == "delegar"){
								//$scope.solicitud.idCatastroTipoTramite = data.idCatastroTipoTramite;
								//$scope.solicitud.idCatastroTipoServicio = data.idCatastroTipoServicio;
								if($scope.solicitud.idCatastroTipoServicio == 3){//Externo
									//$scope.flujoSolicitud.acciones.paso1();
									$scope.servicioCatastral.acciones.seleccionar($scope.servicioCatastral.externo)
									$scope.servicioCatastral.acciones.seleccionarVista($scope.servicioCatastral.seleccionado.vistas.solicitar);
								}
							}
						}
						else
						{

							console.log("Error al obtener data",resApi.error.message,resApi.error.code);
						}
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

	$scope.inicio = function () {
		//$("#results").dialog({ autoOpen: false, width: 880, height: 605, zIndex: 3000, modal: true, title: "Ventana Resultados" });
		/*
		 $.blockUI({ css: {
		 border: 'none',
		 padding: '10px',

		 backgroundColor: '#000',
		 '-webkit-border-radius': '10px',
		 '-moz-border-radius': '10px',
		 opacity: .5,
		 color: '#fff'
		 },message: "Espere un momento porfavor..." });
		 */

		//$('html, body').animate({scrollTop:0}, 'slow');

		setTimeout(function()
		{
			try{

				//$scope.mapa.acciones.iniciar();
				//$scope.srcTutorial="../Catastro/img/RegistroCatastralNuevoInfograma.png";
				$scope.vistaPreliminar.acciones.seleccionar($scope.vistaPreliminar.inicio);


				$scope.configParametros.documentoSolicitud.acciones.obtener();
				$scope.configParametros.tasas.acciones.obtener();
				$scope.solicitud.acciones.listarExterno();
				$scope.solicitud.acciones.establecerDatosSolicitante();
				$scope.predio.acciones.listar();
				$scope.profesinalExterno.acciones.listar();

				console.log("controlando redireccion de catastro");
				var servicioCatReferer = sessionService.get('vistaCat');
				if(servicioCatReferer){
					console.log("Redireccion desde catastro",servicioCatReferer);
					if(servicioCatReferer == 1){
						$scope.vistaPreliminar.acciones.seleccionar($scope.vistaPreliminar.datosLegales);
					}
					else if(servicioCatReferer == 2){
						$scope.vistaPreliminar.acciones.seleccionar($scope.vistaPreliminar.datosTecnicos);
					}
					sessionService.destroy('vistaCat');
				}

			}catch(e)
			{
				console.log("error", e);
			}
		},500);
		setTimeout(function()
		{
			try{

				sessionService.destroy('vistaCat');

			}catch(e)
			{
				console.log("error", e);
			}
		},1000);

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
	$scope.flujoSolicitud2222 = {

		paso:'bandeja', //seleccionPredio (ubicacion del predio)

		opcionSeleccionPredio:'B',//A direccion referencial, B: lista de predios, C: ubicacion espacial

		acciones:{
			inicio:function () {
				$scope.flujoSolicitud.paso = "inicio";
				//Mensaje de tipo de actualizacion
				//Setear variables;
				$scope.solicitud.acciones.reset();

				$scope.solicitud.acciones.establecerDatosSolicitante();
				//Por ahora ir a paso siguiente, luego hace manual

				$scope.flujoSolicitud.acciones.paso1();
				//$scope.predio.acciones.listar();

			},
			paso1:function () {
				//Seleccion de predio
				$scope.flujoSolicitud.paso = "seleccionPredio";

				if($scope.mapa.estado != 'OK'){
					setTimeout(function()
					{
						try{
							$scope.mapa.acciones.iniciar();
							$scope.mapa.estado ="OK";
							//$scope.flujoSolicitud.opcionSeleccionPredio ='A';
							$scope.$apply();
						}catch(e){
							console.log("error", e);
						}
					},100);
				}

			},
			//Habra pasos intermedios en servicio municipal
			paso5:function () {
				//Delegar a profesional externo

				if($scope.mapa.estadoView != 'OK'){
					setTimeout(function()
					{
						//try{
							$scope.mapa.acciones.iniciarView();
							$scope.mapa.estadoView ="OK";
							$scope.mapa.acciones.establecerView($scope.solicitud.wkt);
							//$scope.flujoSolicitud.opcionSeleccionPredio ='A';
							//$scope.$apply();
						//}catch(e){
						//	console.log("error", e);
						//}
					},100);
				}
				else{
					$scope.mapa.acciones.establecerView($scope.solicitud.wkt);
				}


				$scope.flujoSolicitud.paso = "delegacionProfesional";
				if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
					$scope.$apply();
				}


			},
			cancelar:function (progreso) {
				$scope.flujoSolicitud.paso = "bandeja";
				$scope.solicitud.acciones.reset();
				//$scope.mapa.acciones.cancelar();
			},
			atras:function (paso) {
				$scope.flujoSolicitud.paso = paso;
				if(paso =='seleccionPredio'){
					$scope.flujoSolicitud.acciones.paso1();
				}
			},
		}
	}
	
	$scope.predio = {
		lista:[],
		acciones:{
			listar:function () {
				$scope.predio.lista = [];
				var sNroDocCiudadano = sessionService.get('CICIUDADANO');
				if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
				{
					sNroDocCiudadano = sessionService.get('NITCIUDADANO');
				}
				var busCodCat = new dataSIT();
				busCodCat.dplLstCC( sNroDocCiudadano,function(resultado){
					var resApi = JSON.parse(resultado);
					console.log("predios", resApi);
					if(resApi.success)
					{
						$scope.predio.lista = resApi.success.dataSql;
					}
					else
					{
						console.log("Error en la funcion lstCC",resApi.error.message);
					}
				});
			},
			obtenerXcodCat:function(codCat){
				//$.blockUI();
				var predio = new dataSIT();
				predio.catObtenerPredioxCodcat( codCat,"C1",function(resultado){
					var resApi = JSON.parse(resultado);
					//console.log("datos por CC",resApi);
					if(resApi.success)
					{
						var datosPredio = resApi.success.dataSql[0];
						//var matrizHabilitada = $scope.predio.acciones.verificarMatrizHabilitada(datosPredio.idTipoPredio);
						//if(matrizHabilitada == false){
						if(true){
							var idTipoRegimen = 0;
							idTipoRegimen = datosPredio.idTipoPredio == "1" || datosPredio.idTipoPredio == "2" ? 1:(datosPredio.idTipoPredio == "4"? 2 : 0 );
							$scope.solicitud.acciones.establecerDatosBasicosPredio(datosPredio.codigoCatastral,datosPredio.descPlanimetria,datosPredio.direccion,datosPredio.edificio,datosPredio.idCodPlanimetria,datosPredio.idMacrodistrito,datosPredio.idPendienteTerreno,datosPredio.idTipoPredio,datosPredio.macrodistrito,datosPredio.nroPuerta,datosPredio.servAguaPotable,datosPredio.servAlcantarillado,datosPredio.servAlumbrado,datosPredio.servEnergiaElec,datosPredio.servGas,datosPredio.servTelefono,datosPredio.wkt,datosPredio.zona, datosPredio.iddistritoMunicipal, idTipoRegimen);
							$scope.predio.acciones.verificarCertificacion($scope.solicitud.codigoCatastral);
							console.log("zona", datosPredio.zona);
							if(datosPredio.zona == null || datosPredio.zona == undefined || datosPredio.zona == ""){
								$scope.mapa.acciones.obtenerZona(datosPredio.wkt, "delegacionProfesional");
							}
							else{
								//Zona de riesgo
								$scope.mapa.acciones.obtenerRiesgo(datosPredio.wkt,"delegacionProfesional");
							}

							//$scope.mapa.acciones.obtenerRiesgo(datosPredio.wkt);
							//$scope.flujoSolicitud.acciones.paso5();
						}
						else{
							$('#divPopupMatrizHabilitada').modal('show');
							$.unblockUI();
						}
					}
					else
					{
						swal('', 'Error al obtener datos del predio', 'error');
						console.log("Error al obtener datos del predio",resApi.error.message,resApi.error.code);
						$.unblockUI();
					}
				});
			},
			obtenerXwkt:function(wkt){
				//$scope.loading.show();
				setTimeout(function(){
					$.blockUI();
				},1);

				//if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
				//	$scope.$apply();
				//}
				setTimeout(function(){
					var predio = new dataSIT();
					predio.catObtenetPredioxWkt( wkt,"C2",function(resultado){
						//$.unblockUI();
						var resApi = JSON.parse(resultado);
						//console.log("datos por wkt--->",resApi);
						if(resApi.success)
						{
							var datosPredio = resApi.success.dataSql[0];
							var predio = new dataSIT();
							predio.catPredioTramiteEnProceso( datosPredio.codigoCatastral,function(resultado){
								//$.unblockUI();
								var resApiTramiteProceso = JSON.parse(resultado);
								if(resApiTramiteProceso.success)
								{
									if(resApiTramiteProceso.success.dataSql.length > 0){
										var fechaRegistro = new Date(resApiTramiteProceso.success.dataSql[0].fechaRegistro);
										var cadFecha = getFormattedDate(fechaRegistro);
										swal('', 'Este predio tiene un trámite en proceso, por lo que no puede continuar.\nFecha de Registro ' + cadFecha, 'error');
										$.unblockUI();
									}
									else{
										var matrizHabilitada = $scope.predio.acciones.verificarMatrizHabilitada(datosPredio.idTipoPredio);
										if(matrizHabilitada == false){
											var idTipoRegimen = 0;
											idTipoRegimen = datosPredio.idTipoPredio == "1" || datosPredio.idTipoPredio == "2" ? 1:(datosPredio.idTipoPredio == "4"? 2 : 0 );
											$scope.solicitud.acciones.establecerDatosBasicosPredio(datosPredio.codigoCatastral,datosPredio.descPlanimetria,datosPredio.direccion,datosPredio.edificio,datosPredio.idCodPlanimetria,datosPredio.idMacrodistrito,datosPredio.idPendienteTerreno,datosPredio.idTipoPredio,datosPredio.macrodistrito,datosPredio.nroPuerta,datosPredio.servAguaPotable,datosPredio.servAlcantarillado,datosPredio.servAlumbrado,datosPredio.servEnergiaElec,datosPredio.servGas,datosPredio.servTelefono,datosPredio.wkt,datosPredio.zona, datosPredio.iddistritoMunicipal, idTipoRegimen);
											$scope.predio.acciones.verificarCertificacion($scope.solicitud.codigoCatastral);
											//console.log("zona", datosPredio.zona);

											if(datosPredio.zona == null || datosPredio.zona == undefined || datosPredio.zona == ""){
												$scope.mapa.acciones.obtenerZona(wkt,"delegacionProfesional");
											}
											else{
												//Zona de riesgo
												$scope.mapa.acciones.obtenerRiesgo(wkt,"delegacionProfesional");
											}

											//
											//$scope.flujoSolicitud.acciones.paso5();
										}
										else{
											//console.log("matriz habilitada");
											$('#divPopupMatrizHabilitada').modal('show');
											$.unblockUI();
										}
									}
								}
								else
								{
									swal('', 'Error al verificar tramite en proceso', 'error');
									console.log("Error al verificar tramite en proceso",resApi.error.message,resApi.error.code);
									$.unblockUI();
								}
							});
						}
						else
						{
							swal('', 'Error al obtener datos', 'error');
							console.log("Error al obtener datos",resApi.error.message,resApi.error.code);
							$.unblockUI();
						}
					});
				},200);


			},
			verificarCertificacion:function(codCat){
				//$.blockUI();
				var predio = new dataSIT();
				predio.catPredioConCertificacion( codCat,function(resultado){
					//$.unblockUI();
					var resApi = JSON.parse(resultado);
					//console.log("verificarCertificacion--->",resApi);
					if(resApi.success)
					{
						var idTipoTramite = 0;
						if(resApi.success.dataSql.length >  0)
						{
							idTipoTramite = 2;//Actualizacion
							$scope.solicitud.conCertificado = 1;
						}
						else{
							idTipoTramite = 1;//Nuevo
							$scope.solicitud.conCertificado = 0;
						}
						$scope.solicitud.acciones.establecerTipoTramite(idTipoTramite);
						$scope.predio.acciones.verificarReingreso($scope.solicitud.codigoCatastral, $scope.solicitud.idTipoRegimen);

					}
					else
					{
						swal('', 'Error al verificar predio', 'error');
						console.log("Error al verificar predio cerificado",resApi.error.message,resApi.error.code);
						$.unblockUI();
					}
				});
			},
			verificarReingreso:function(codCat, idTipoRegimen){
				//$.blockUI();
				$scope.solicitud.msgReqLevantamiento=null;
				var predio = new dataSIT();
				predio.catPredioReingreso( codCat,idTipoRegimen,function(resultado){
					//$.unblockUI();
					var resApi = JSON.parse(resultado);
					console.log("verificarReingreso--->",resApi);
					if(resApi.success)
					{
						$scope.solicitud.tieneMensura =0;
						if(resApi.success.dataSql.length > 0){
							$scope.solicitud.acciones.establecerTipoTramite(4);
							$scope.solicitud.tieneMensura = resApi.success.dataSql[0].tieneMensura;
							$scope.solicitud.idInsFlujoAnterior = resApi.success.dataSql[0].idInsFlujo;
							$scope.solicitud.msgReqLevantamiento = resApi.success.dataSql[0].msgReqLevantamiento;
						}
						else{
							$scope.solicitud.tieneMensura = 0;
							$scope.solicitud.idInsFlujoAnterior = 0;
						}
					}
					else
					{
						swal('', 'Error al obtener datos', 'error');
						console.log("Error al verificar predio",resApi.error.message,resApi.error.code);
						$.unblockUI();
					}
				});
			},
			verificarMatrizHabilitada:function(idTipoPredio){
				var res = false;
				var idTipPredio = parseInt(idTipoPredio);
				if(idTipPredio == 3 || idTipoPredio == 4 ){
					res = true;
				}
				else{
					res = false;
				}
				return res;
			},
			verificarTramiteEnProceso:function(codCat){
				$scope.solicitud.codigoCatastral =  null;
				$scope.solicitud.descPlanimetria =  null;
				$scope.solicitud.direccion =  null;
				$scope.solicitud.edificio =  null;
				$scope.solicitud.idCodPlanimetria =  null;
				$scope.solicitud.idMacrodistrito =  null;
				$scope.solicitud.carTerrPendiente =  null;
				$scope.solicitud.idTipoLote =  null;
				$scope.solicitud.macrodistrito =  null;
				$scope.solicitud.nroPuerta =  null;
				$scope.solicitud.serBasAguaPotable =  null;
				$scope.solicitud.serBasAlcantarillado =  null;
				$scope.solicitud.serBasAlumbradoPublico =  null;
				$scope.solicitud.serBasEnergiaElectrica =  null;
				$scope.solicitud.serBasGasDomiciliario =  null;
				$scope.solicitud.serBasTelefono =  null;
				$scope.solicitud.wkt =  null;
				$scope.solicitud.zona =  null;
				$scope.solicitud.iddistritoMunicipal = null;

				
				//$.blockUI();
				setTimeout(function(){
					$.blockUI();
				},1);
				setTimeout(function(){
					var predio = new dataSIT();
					predio.catPredioTramiteEnProceso( codCat,function(resultado){
						var resApi = JSON.parse(resultado);
						//console.log("verificar en proceso--->",resApi);
						if(resApi.success)
						{
							if(resApi.success.dataSql.length > 0){
								var fechaRegistro = new Date(resApi.success.dataSql[0].fechaRegistro);
								var cadFecha = getFormattedDate(fechaRegistro);
								swal('', 'Este predio tiene un trámite en proceso, por lo que no puede continuar.\nFecha de Registro ' + cadFecha, 'error');
							}
							else{
								$scope.predio.acciones.obtenerXcodCat(codCat);
							}
							$.unblockUI();
						}
						else
						{
							swal('', 'Error al verificar tramite en proceso', 'error');
							console.log("Error al verificar tramite en proceso",resApi.error.message,resApi.error.code);
							$.unblockUI();
						}
					});
				},200);

			},
		}
	}

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
			//Obsoletos
			filtrar : function () {
				var term = $scope.profesinalExterno.filtro;
				if(isNaN(term) == false){
					$scope.tblProfesionalExterno.filter({ registroNacionalCAB: term });
				}
				else{
					$scope.tblProfesionalExterno.filter({ arquitectoNombre: term });
				}
			},
			limpiarFiltro : function () {
				$scope.tblProfesionalExterno.filter({});
				$scope.profesinalExterno.filtro = "";
			},
			seleccionar : function (arqui) {
				//console.log(arqui);
				$scope.solicitud.acciones.establecerDatosProfesional(arqui.arquitectoNombre,arqui.registroNacionalCAB,  arqui.telefonoCelular, arqui.correoElectronico);
				//$scope.cambiarTextoBtnSolicitud();
			},
		}
	}
	$scope.tblProfesionalExterno = new ngTableParams({
		page: 1,
		count: 10,
		filter: {},
		sorting: {
			arquitectoNombre: 'asc'
		}
	}, {
		total: $scope.profesinalExterno.lista.length,
		getData: function($defer, params) {
			var filteredData = params.filter() ? $filter('filter')($scope.profesinalExterno.lista, params.filter()):$scope.profesinalExterno.lista;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) :$scope.profesinalExterno.lista;
			params.total($scope.profesinalExterno.lista.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	});
		
	
	$scope.buscador ={
		
	}
	


	//Mapa
	$scope.mapa = {
		estado:null,
		estadoView:null,
		acciones:{

			iniciar:function () {

				SITUtil.capas.GEOSERVER = "http://sitservicios.lapaz.bo/geoserver";
				$scope.vectorSource = new ol.source.Vector(
					//{
					//features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
					//}
				);
				//$scope.vectorSource.set('name', 'Solicitud');

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
				$scope.vectorLayer = new ol.layer.Vector({
					source: $scope.vectorSource,
					style: styles.Point,
					title: 'Predio seleccionado',
					visible: true,
					//style: search_style,
					displayInLayerSwitcher: false
					//allwaysOnTop: true
				});

				//Mapa
				lays = new SITLayers();
				m_app = new SITMap();
				$scope.map = m_app.build(null, null, [
					lays.getBaseLayers(null, false, true)
					, lays.getCatastroLayers({visible: true, openInLayerSwitcher: true})
					, lays.getOverLayers(null, false, false)
					, $scope.vectorLayer
				]);

				(m_app.createLayerSwitcher()).hide();
				m_app.createControlBar(null);
				//if(idTipo == "1")
				//	m_app.createControlBarCustom(null, $scope.solicitud.acciones.establecerUbicacion);

				//m_app.createControlBarCustom(null, $scope.ubicacion.setGeom, $scope.ubicacion.getData);
				// busquedas
				//var search_app = new SITSearch();

				//var sit_search = new sit.Search();
				//$scope.map.addControl(sit_search);

				//sit_search.addSearch("Zonas Referenciales", search_app.getZonasGU());
				//sit_search.addSearch("Calles avenidas", search_app.getVias());
				//sit_search.addSearch("Lugares, sitios, equip...", search_app.getToponimia(), true);
				//sit_search.addSearch("Código catastral", search_app.getLotes());
				//sit_search.addSearch("Direcciones, puertas", search_app.getDirecciones());

				SITMap.prototype.createControlBarCustom = function (opts, callback) {
					//// barra de herramientas
					var o = opts || {}, fnCallBack = callback,
						self = this;

					var mainbarCustom = new ol.control.Bar();
					this.map.addControl(mainbarCustom);
					mainbarCustom.setPosition(o.position || 'bottom-left');
					mainbarCustom.element.className = "ol-unselectable ol-control ol-bar ol-mainCustom-sit";

					var barra2 = new ol.control.Bar({ toggleOne: true, group: true });
					mainbarCustom.addControl(barra2);

					//
					drawPoint = new ol.interaction.Draw({
						type: 'Point',
						source: self.vectorLayer.getSource()
					});
					drawPoint.on('drawend', function (e) {
						var format = new ol.format.GeoJSON();
						var routeFeature = format.writeFeature(e.feature);
						var g = JSON.parse(routeFeature);
						//callback(e.feature.values_.geometry.flatCoordinates);
						callback(g.geometry);
						var src = self.vectorLayer.getSource();
						src.clear();
						drawPoint.setActive(false);
						tooltip.setInfo('');
					});
					var tooltip = new ol.Overlay.Tooltip();
					this.map.addOverlay(tooltip);
					var togglePoint = new ol.control.Toggle({
						html: '<i class="glyphicon glyphicon-map-marker"></i>',
						title: "Marcar ubicación",
						interaction: drawPoint,
						onToggle: function (active) {
							if (active) {
								tooltip.setInfo('Click en el mapa para marcar ubicación.');
								//console.log("activado ", active);
								var src = self.vectorLayer.getSource();
								src.clear();
								self.click_mode = null;
							} else {
								tooltip.setInfo('');
								//console.log("desactivado", active);
								self.click_mode = null;
								var src = self.vectorLayer.getSource();
								src.clear();
							}
						}
					});

					barra2.addControl(togglePoint);



					//this.map.on('singleclick', function (evt) {
					//    var self2 = this;
					//    switch (self.click_mode) {
					//        case 'atm':
					//            self.showATM(evt, callbackEdit); // self.scheme.showPopup(evt);
					//            break;

					//        default:
					//            console.log('Sin accion definida ...');
					//            break;
					//    }
					//});

					return this;
				};
				//m_app.createControlBarCustom(null, null);

				
			},
			iniciarView:function () {
				$scope.vectorSourceView = new ol.source.Vector(
					//{
					//features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
					//}
				);
				//$scope.vectorSource.set('name', 'Solicitud');

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
				$scope.vectorLayerView = new ol.layer.Vector({
					source: $scope.vectorSourceView,
					style: styles.Point,
					title: 'Predio seleccionado',
					visible: true,
					//style: search_style,
					displayInLayerSwitcher: false
					//allwaysOnTop: true
				});

				//Mapa
				lays2 = new SITLayers();
				$scope.m_app2 = new SITMap({"target":"map2"});
				$scope.map2 = $scope.m_app2.build(null, null, [
					//lays2.getBaseLayers(null, true, true)
					lays2.getCatastroLayers({visible: true, openInLayerSwitcher: true})
					,lays2.getOverLayers(null, true, false)
					,$scope.vectorLayerView
				]);

				//(m_app.createLayerSwitcher()).hide();
				//m_app.createControlBar(null);
				//if(idTipo == "1")
				//	m_app.createControlBarCustom(null, $scope.solicitud.acciones.establecerUbicacion);

				//m_app.createControlBarCustom(null, $scope.ubicacion.setGeom, $scope.ubicacion.getData);
				// busquedas
				//var search_app = new SITSearch();

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


			},
			establecerView: function (wkt) {
				//console.log("vista preview wkt",wkt);
				//{ "type": "Point", "coordinates": [593474.92801991, 8176131.72462349] }

				/*
				var val = wkt;//'GEOMETRYCOLLECTION(MULTIPOLYGON(((-0.12072212703174 51.51899157882951,-0.128597092699465 51.51191439062526,-0.129004788469729 51.51260880491084,-0.129584145616946 51.51374388239237,-0.130120587419924 51.51494569831,-0.130614113878664 51.51653471734371,-0.125507187914309 51.51718900318654,-0.121001076769289 51.519178508517115,-0.12072212703174 51.51899157882951))))';
				var geojson_options = {};
				var wkt_format = new OpenLayers.Format.WKT();
				var testFeature = wkt_format.read(val);
				var wkt_options = {};
				var geojson_format = new OpenLayers.Format.GeoJSON(wkt_options);
				var out = geojson_format.write(testFeature);
*/

/*
				var formato = new ol.format.WKT;
				var wkt = formato.readFeature(wkt);
				//var routeFeature = format.writeFeature(wkt);
				//var g = JSON.parse(routeFeature);
				console.log("g",wkt);
				*/
				if(wkt!= null || wkt != undefined){
					var format = new ol.format.WKT;
					var feature = format.readFeature(wkt, {
						dataProjection: 'EPSG:32719',
						featureProjection: 'EPSG:32719'
					});
					//console.log("feature",feature);

					var formatGeojson = new ol.format.GeoJSON();
					var routeFeature = formatGeojson.writeFeature(feature);
					var g = JSON.parse(routeFeature);
					//console.log("geojson",g, routeFeature);
					$scope.vectorSourceView.clear();
					/*
					 var d = wkt.replace("POINT (","").replace("POINT(","").replace(")","").split(" ");
					 var g1 = { "type": "Point", "coordinates": d }
					 console.log("gg",g1);
					 $scope.vectorSourceView.clear();

					 geojsonObject = {
					 'type': 'FeatureCollection',
					 'crs': {
					 'type': 'name',
					 'properties': {
					 'name': 'EPSG:32719'
					 }
					 },
					 'features': [
					 {
					 'type': 'Feature',
					 'geometry': g1
					 }
					 ]
					 };
					 //console.log("geojsonObject",geojsonObject);
					 $scope.vectorSourceView.addFeatures((new ol.format.GeoJSON()).readFeatures(geojsonObject));
					 */
					$scope.vectorSourceView.addFeatures([feature]);
					$scope.m_app2.zoomItem(g.geometry);
				}

			},
			marcar:function () {
				var src = $scope.vectorLayer.getSource();
				src.clear();
				$scope.drawPoint = new ol.interaction.Draw({
					type: 'Point',
					source: $scope.vectorLayer.getSource()
				});
				$scope.drawPoint.on('drawend', function (e) {
					//var format = new ol.format.GeoJSON();
					//var routeFeature = format.writeFeature(e.feature);
					//var g = JSON.parse(routeFeature);

					var formato = new ol.format.WKT;
					var wkt = formato.writeFeature(e.feature);

					//console.log("--A", wkt);
					//callback(e.feature.values_.geometry.flatCoordinates);
					//callback(g.geometry);

					//$scope.mapa.controlData.contador = 0;
					//$.blockUI();
					//$scope.mapa.acciones.getMacroDistrito(wkt);
					$scope.predio.acciones.obtenerXwkt(wkt);

					var src = $scope.vectorLayer.getSource();
					src.clear();
					//drawPoint.setActive(false);
					//tooltip.setInfo('');
					$scope.mapa.acciones.cancelar();
				});
				$scope.map.addInteraction($scope.drawPoint);

			},
			cancelar:function () {
				$scope.map.removeInteraction($scope.drawPoint);
				var src = $scope.vectorLayer.getSource();
				src.clear();
			},
			getMacroDistrito2: function (wkt) {
				var macro = null;
				var distrito = null;
				var url = SITUtil.capas.GEOSERVER + '/lapaz/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lapaz:distritos_2019&maxFeatures=50&callback=getJson&outputFormat=text%2Fjavascript&format_options=callback%3A+getJson&cql_filter=INTERSECTS(geom,' + wkt + ')';
				$.ajax({
					url: url,
					type: 'GET',
					dataType: 'jsonp',
					jsonpCallback: 'getJson',
					success: function (data) {
						console.log("-.",data);
						/*
						$scope.getRiesgo(wkt, callbackRiesgo, callbackPlani, callbackLote);
						if (data.features.length == 1) {
							macro = data.features[0].properties.cod_macro;
							distrito = data.features[0].properties.distrito;
							callbackDistrito(macro, distrito);
						}
						else if (data.features.length > 1) {
							$scope.notificacionError("Multiples resultados de distritos");
							$.unblockUI();
							$scope.$apply();
						}
						else {
							$scope.notificacionWarning("Sin resultados de distritos");
							$.unblockUI();
							$scope.$apply();
						}
						*/
					},
					error: function (state, msgError, error) {
						console.log("Error state.....  ", state);
						console.log("Error msgError.....  ", msgError);
						console.log("Error.....  ", error);
						//$scope.notificacionError("Error al consultar distritos");
						$.unblockUI();
						//$scope.$apply();
					}
				});
			},
			getMacroDistrito: function (wkt) {
/*
				var featureRequest  = {
				 "service": "WFS",
				 "version":"1.0.0",
				 "request": "GetFeature",
				 "typename": "lapaz:distritos_2019",
				 "outputFormat": "text/javascript",
				 "callback":"getJson",
				 "format_options":"callback%3A+getJson",
				 "srsname": "EPSG:32719",
				 "maxFeatures": 50,
				 "CQL_FILTER": "INTERSECTS(geom," + wkt + ")"
				};
				fetch(SITUtil.capas.GEOSERVER + '/lapaz/ows', {
					method: 'POST',
					dataType: 'jsonp',
					jsonpCallback: 'getJson',
					headers: {
						'Content-Type': 'text/javascript'
					},
					body: JSON.stringify(featureRequest)
				}).then(function (json) {
					console.log("...", json);
					var features = new ol.format.GeoJSON().readFeatures(json);
					console.log("...", features);
					//vectorSource.addFeatures(features);
					//mymap.getView().fit(vectorSource.getExtent());
				});
				*/
				console.log("entro post");
				$.ajax({
					method: 'POST',
					dataType: 'jsonp',
					jsonpCallback: 'getJson',
					//jsonp: false,
					url: SITUtil.capas.GEOSERVER + '/lapaz/ows',
					data: {
						"service": "WFS",
						"version":"1.0.0",
						"request": "GetFeature",
						"typename": "lapaz:distritos_2019",
						"outputFormat": "text/javascript",
						"callback":"getJson",
						"format_options":"callback: getJson",
						"srsname": "EPSG:32719",
						"maxFeatures": 50,
						"CQL_FILTER": "INTERSECTS(geom," + wkt + ")"
					},
					success: function (response) {
						console.log("-----",response);
						//$scope.getRiesgo(wkt, callbackRiesgo, callbackPlani, callbackLote);
						if (response.features.length >= 1) {
							macro = response.features[0].properties.cod_macro;
							distrito = response.features[0].properties.distrito;
							//callbackDistrito(macro, distrito);
						}
						else {
							console.log("Sin resultados de macrdistritos");
						}
						$scope.mapa.controlData.contador = $scope.mapa.controlData.contador + 1;
						if($scope.mapa.controlData.contador == $scope.mapa.controlData.limite){
							$.unblockUI();
						}
					},
					error: function (jqXHR, textStatus) {
						console.log("Request failed: " + textStatus);
					}
				});

			},
			obtenerZona: function (wkt, paso) {
				//console.log("Buscando zona");
				//$.blockUI();
				SITUtil.capas.GEOSERVER = "http://sitservicios.lapaz.bo/geoserver";
				$.ajax({
					method: 'POST',
					dataType: 'jsonp',
					jsonpCallback: 'getJson',
					//jsonp: false,
					url: SITUtil.capas.GEOSERVER + '/catastro/ows',
					data: {
						"service": "WFS",
						"version":"1.0.0",
						"request": "GetFeature",
						"typename": "catastro:zonas",
						"outputFormat": "text/javascript",
						"callback":"getJson",
						"format_options":"callback: getJson",
						"srsname": "EPSG:32719",
						"maxFeatures": 50,
						"CQL_FILTER": "INTERSECTS(Shape," + wkt + ")"
					},
					success: function (response) {
						console.log("zona por wkt",response);
						//$scope.getRiesgo(wkt, callbackRiesgo, callbackPlani, callbackLote);
						if (response.features.length >= 1) {
							$scope.solicitud.zona = response.features[0].properties.GDBSNOMB;
							$scope.$apply();
							$scope.mapa.acciones.obtenerRiesgo(wkt,paso);
						}
						else {
							$scope.solicitud.zona = "ZONA NO IDENTIFICADA";
							$scope.$apply();
							$scope.mapa.acciones.obtenerRiesgo(wkt, paso);
						}
					},
					error: function (jqXHR, textStatus) {
						console.log("Request failed: " + textStatus);
						swal('', 'Error de red. No se pudo obtener la zona', 'error');
						$.unblockUI();
					}
				});

			},
			obtenerRiesgo : function (wkt, paso) {
				console.log("Buscando zona de riesgo");
				SITUtil.capas.GEOSERVER = "http://sitservicios.lapaz.bo/geoserver";
				$.ajax({
					method: 'POST',
					dataType: 'jsonp',
					jsonpCallback: 'getJson',
					url: SITUtil.capas.GEOSERVER + '/lapaz/ows',
					data: {
						"service": "WFS",
						"version":"1.0.0",
						"request": "GetFeature",
						"typename": "lapaz:riesgos2011b",
						"outputFormat": "text/javascript",
						"callback":"getJson",
						"format_options":"callback: getJson",
						"srsname": "EPSG:32719",
						"maxFeatures": 50,
						"CQL_FILTER": "INTERSECTS(wkb_geometry," + wkt + ")"
					},
					success: function (data) {
						$.unblockUI();
						if (data.features.length >= 1) {
							$scope.solicitud.riesgo = data.features[0].properties.grado;
							$scope.$apply();
						}
						else {
							$scope.solicitud.riesgo = "ZONA DE RIESGO NO IDENTIFICADA";
							$scope.$apply();
						}

						/*if(paso == "delegacionProfesional"){
							$scope.flujoSolicitud.acciones.paso5();
						}*/
					},
					error: function (jqXHR, textStatus) {
						console.log("Request failed: " + textStatus);
						swal('', 'Error de red. No se pudo obtener la zona de riesgo', 'error');
						$.unblockUI();
					}
				});

			},

			buscarContenedorCrear:function (data) {
				//console.log("entro");
				var  mapPnlCnt = document.getElementById("mapPnlCnt");
				if(mapPnlCnt){
					var mapPnlCntRes = document.getElementById("mapPnlCntRes");
					if(mapPnlCntRes){
						mapPnlCntRes.remove();
					}

					mapPnlCntRes = document.createElement("div");
					mapPnlCntRes.id = "mapPnlCntRes";
					mapPnlCntRes.classList.add("sitMapPnlCntRes");
					mapPnlCnt.appendChild(mapPnlCntRes);
					isDown =false;
					mapPnlCntRes.addEventListener('mousedown', function(e) {
						isDown = true;
						offset = [
							mapPnlCntRes.offsetLeft - e.clientX,
							mapPnlCntRes.offsetTop - e.clientY
						];
					}, true);
					document.addEventListener('mouseup', function() {
						isDown = false;
					}, true);
					document.addEventListener('mousemove', function(event) {
						event.preventDefault();
						if (isDown) {
							mousePosition = {

								x : event.clientX,
								y : event.clientY

							};
							mapPnlCntRes.style.left = (mousePosition.x + offset[0]) + 'px';
							mapPnlCntRes.style.top  = (mousePosition.y + offset[1]) + 'px';
						}
					}, true);

					var mapPnlCntResHdr = document.getElementById("mapPnlCntResHdr");
					if(!mapPnlCntResHdr){
						mapPnlCntResHdr = document.createElement("div");
						mapPnlCntRes.appendChild(mapPnlCntResHdr);
					}

					var mapPnlCntResBody = document.getElementById("mapPnlCntResBody");
					if(!mapPnlCntResBody){
						mapPnlCntResBody = document.createElement("div");
						mapPnlCntRes.appendChild(mapPnlCntResBody);
					}
					mapPnlCntResBody.classList.add("sitMapPnlCntResBody");

					var mapPnlCntResftr = document.getElementById("mapPnlCntResftr");
					if(!mapPnlCntResftr){
						mapPnlCntResftr = document.createElement("div");
						mapPnlCntRes.appendChild(mapPnlCntResftr);
						mapPnlCntResftr.classList.add("sitMapPnlCntResFtr");
					}

					var mapPnlCntResHdrCerrar = document.createElement("a");
					mapPnlCntResHdrCerrar.setAttribute('href', "javascript:void(0)");
					mapPnlCntResHdrCerrar.innerHTML="X";
					mapPnlCntResHdrCerrar.classList.add("sitMapPnlCntResHdrCerrar");
					mapPnlCntResHdrCerrar.addEventListener("click", function () {
						mapPnlCntRes.remove();
					});
					//mapPnlCntResHdr.innerHTML='<a href="javascript:void(0)" class="sitMapPnlCntResHdrCerrar"><span >X</span></a>Resultado';
					mapPnlCntResHdr.innerHTML='Resultado';
					mapPnlCntResHdr.appendChild(mapPnlCntResHdrCerrar);
					mapPnlCntResHdr.classList.add("sitMapPnlCntResHdr");



					var mapPnlCntResBodyData = document.createElement("div");
					

					//mapPnlCntResBodyData


					//console.log(data);
					if(data == null){
						mapPnlCntResBodyData.classList.add("sitMapPnlCntResBodySinDatos");
						//mapPnlCntResBodyData.innerHTML = "Buscando...";

						$("<div></div>")
							.addClass('loaderMini')
							.appendTo(mapPnlCntResBodyData);
					}
					else if(data.length > 0){
						mapPnlCntResBodyData.classList.add("sitMapPnlCntResBodyOverflow");
						mapPnlCntResftr.innerHTML="Total items: " + data.length;

						var mapPnlCntResBodyDataGrid = $("<table></table>").addClass('table').addClass('table-striped').addClass('table-hover').appendTo(mapPnlCntResBodyData);
						data.forEach( function(valor, indice, array) {

							var tr = $("<tr></tr>").appendTo(mapPnlCntResBodyDataGrid);
							//var col1 = $("<td></td>").text(valor.desc).css("font-weight", "bold").appendTo(tr);
							var html = $.parseHTML( valor.desc )
							var col1 = $("<td></td>").append(html).css("font-weight", "bold").appendTo(tr);
							var col2 = $("<td></td>").text(valor.layer).appendTo(tr);
							var col3 = $("<td></td>").appendTo(tr);

							var az = $("<a></a>").attr({href: 'javascript:void(0)', title: 'Seleccionar'}).appendTo(col3);
							$("<span></span>")
								.addClass('badge')
								.css('cursor', 'pointer')
								.text('Acercar')
								.on("click", { srsName: 'EPSG:32719', geom: valor.geometry}, function (e) {
									//console.log("e---",e);
									clickSelectZoom(e);
									// self._zoom_elem_features(e.data.nodoLi, add, e.data.srsName);
								})
								.appendTo(az);
						});
						//mapPnlCntResBodyData.appendChild(mapPnlCntResBodyDataGrid);
					}
					else{
						mapPnlCntResBodyData.classList.add("sitMapPnlCntResBodySinDatos");
						mapPnlCntResBodyData.innerHTML = "No se encontraron resultados";
					}

					mapPnlCntResBody.appendChild(mapPnlCntResBodyData);

				}


				clickSelectZoom = function(e){

					clear_selections();
					var fts = get_features_from_elem(e.data);
					add_selections(fts);
					zoom_to_selection();
				}

				getSrsName = function(k){
					if($scope.map){
						return $scope.map.getView().getProjection().getCode();
					};
					return null;
				};
				clear_selections = function(){
					//if (!$scope.vlayer) create_search_layer();
					if ($scope.vlayer) {
						var src = $scope.vlayer.getSource();
						if (src) src.clear();
					}
				};

				get_features_from_elem = function(e){
					var mss = getSrsName(),
						srsName = e.srsName,
						opts = srsName ? {dataProjection: srsName, featureProjection:mss} : {},
						fmtjson = new ol.format.GeoJSON();

					//var	featureslist = [e.geom ] || [];
					var	featureslist = [];
					if(Array.isArray(e.geom) == true){
						featureslist = e.geom;
					}
					else{
						featureslist.push(e.geom);
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


				add_selections = function(fts){
					if (!$scope.vlayer) create_search_layer();
					//var src = this.$scope.vlayer.getSource();
					var src = $scope.vlayer.getSource();
					src.addFeatures(fts);
				}
				search_style = [
					new ol.style.Style({
						stroke: new ol.style.Stroke({
							color: 'rgb(255, 255, 0, 0.8)'
							, width: 5

						}),
						// fill: new ol.style.Fill({color: 'rgba(128, 255, 255, 0.2)'}),
						image: new ol.style.Circle({
							// fill: new ol.style.Fill({color: 'rgba(128, 255, 255, 0.4)'}),
							stroke: new ol.style.Stroke({color: 'rgba(255, 255, 0, 0.9)', width: 4}),
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
						fill: new ol.style.Fill({color: 'rgba(255, 255, 0, 0.1)'}),
						image: new ol.style.Circle({
							fill: new ol.style.Fill({color: 'rgba(255, 255, 0, 0.4)'}),
							stroke: new ol.style.Stroke({color: 'rgba(200, 0, 0, 0.9)', width: 1.2}),
							radius: 6
						})
					})
				];

				create_search_layer = function () {
					$scope.vlayer = new ol.layer.Vector({
						title: 'busquedas',
						visible: true,
						style: search_style,
						displayInLayerSwitcher: false,
						allwaysOnTop: true,
						source: new ol.source.Vector({wrapX: false})
					});
					$scope.map.addLayer($scope.vlayer);
				};

				zoom_to_selection = function(){
					if (!$scope.vlayer) return;

					if($scope.map && hasSelections()){
						var src = $scope.vlayer.getSource();
						zoomToExtent(src.getExtent());
					}
				}
				hasSelections = function(){
					if($scope.map && $scope.vlayer){
						var src = $scope.vlayer.getSource();
						return (src && src.getFeatures() && src.getFeatures().length > 0);
					}
					return false;
				}

				zoomToExtent = function (ext) {
					zm = getMaxZoomLevel();
					$scope.map.getView().fit(ext, {size: $scope.map.getSize(), duration: 750, easing: ol.easing.easeOut, maxZoom:zm});
				};
				getMaxZoomLevel = function(){
					//if(typeof this.maxZoom == 'number') return this.maxZoom;

					if(!$scope.map){
						return 12;
					} else {
						return $scope.map.getView().getMaxZoom() - 2;
					}
				}


			},
			busquedaLimpiar:function () {
				var mapPnlCntRes = document.getElementById("mapPnlCntRes");
				if(mapPnlCntRes){
					mapPnlCntRes.remove();
				}
				$scope.busZona='';
				$scope.busCC='';
				$scope.busDir='';
				$scope.busVia ='';
			},

			buscarZona:function (s) {
				var exprs = [];
				exprs.push("zonaref ILIKE '%" + s + "%'");
				exprs.push("zona ILIKE '%" + s + "%'");
				var query = exprs.join(" OR ");
				$scope.mapa.acciones.buscarContenedorCrear(null);
				$.ajax({
					method: 'POST',
					dataType: 'jsonp',
					jsonpCallback: 'getJson',
					url: SITUtil.capas.GEOSERVER + '/sit/ows',
					data: {
						"service": "WFS",
						"version":"1.0.0",
						"request": "GetFeature",
						"typename": "sit:zonasgu2016",
						"outputFormat": "text/javascript",
						"callback":"getJson",
						"format_options":"callback: getJson",
						"srsname": "EPSG:32719",
						"maxFeatures": 50,
						"CQL_FILTER": query
					},
					success: function (data) {
						console.log("zonas",data);
						var lista =[];
						if (data.features.length >= 1) {
							angular.forEach(data.features,function (item) {
								console.log(item);
								lista.push({"layer":"Zona","desc":item.properties.zona, "geometry":item.geometry})
							});
							$scope.mapa.acciones.buscarContenedorCrear(lista);
						}
						else {
							console.log("Sin resultados de zona ");
							$.unblockUI();
							$scope.$apply();
							$scope.mapa.acciones.buscarOtb(s);
						}

					},
					error: function (jqXHR, textStatus) {
						console.log("Request failed: " + textStatus);
					}
				});
			},
			buscarOtb:function (s) {
				var exprs = [];
				exprs.push("nombre ILIKE '%" + s + "%'");
				//exprs.push("zona ILIKE '%" + s + "%'");
				var query = exprs.join(" OR ");

				$.ajax({
					method: 'POST',
					dataType: 'jsonp',
					jsonpCallback: 'getJson',
					url: SITUtil.capas.GEOSERVER + '/sit/ows',
					data: {
						"service": "WFS",
						"version":"1.0.0",
						"request": "GetFeature",
						"typename": "sit:otbs_poa",
						"outputFormat": "text/javascript",
						"callback":"getJson",
						"format_options":"callback: getJson",
						"srsname": "EPSG:32719",
						"maxFeatures": 50,
						"CQL_FILTER": query
					},
					success: function (data) {
						console.log("otbs",data);
						var lista =[];
						if (data.features.length >= 1) {
							angular.forEach(data.features,function (item) {
								console.log(item);
								lista.push({"layer":"Otb","desc":item.properties.nombre, "geometry":item.geometry})
							});
						}
						else {
							console.log("Sin resultados de otb ");
							$.unblockUI();
							$scope.$apply();
						}
						$scope.mapa.acciones.buscarContenedorCrear(lista);
					},
					error: function (jqXHR, textStatus) {
						console.log("Request failed: " + textStatus);
					}
				});
			},
			buscarCC:function (s) {
				var codcat = new sit.CodigoCatastral(s);
				var exprs = "";
				switch(codcat.modo) {
					case "manzana":
						exprs = "distritocatastral = " + codcat.distrito + " AND manzana = " + codcat.manzana;
						break;
					case "predio":
					case "subpredio":
					case "sifca":
						exprs = "distritocatastral = " + codcat.distrito + " AND manzana = " + codcat.manzana + " AND predio = " + codcat.predio;
						break;
					default:
						if (s.indexOf("%") != -1 || s.indexOf("_") != -1)
							exprs = "codigocatastral LIKE '" + s + "'";
						else
							exprs = "codigocatastral LIKE '%" + s + "%'";
				}
				var query=exprs;
				$scope.mapa.acciones.buscarContenedorCrear(null);
				$.ajax({
					method: 'POST',
					dataType: 'jsonp',
					jsonpCallback: 'getJson',
					url: SITUtil.capas.GEOSERVER + '/catastro/ows',
					data: {
						"service": "WFS",
						"version":"1.0.0",
						"request": "GetFeature",
						"typename": "catastro:lotesCertificados",
						"outputFormat": "text/javascript",
						"callback":"getJson",
						"format_options":"callback: getJson",
						"srsname": "EPSG:32719",
						"maxFeatures": 50,
						"CQL_FILTER": query
					},
					success: function (data) {
						console.log("cc",data);
						var lista =[];
						if (data.features.length >= 1) {
							angular.forEach(data.features,function (item) {
								console.log(item);
								lista.push({"layer":"Lote","desc":item.properties.codigocatastral, "geometry":item.geometry})
							});
						}
						else {
							console.log("Sin resultados de cc ");
							$.unblockUI();
							$scope.$apply();
						}
						$scope.mapa.acciones.buscarContenedorCrear(lista);
					},
					error: function (jqXHR, textStatus) {
						console.log("Request failed: " + textStatus);
					}
				});
			},
			buscarDir:function (s) {
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

				$scope.mapa.acciones.buscarContenedorCrear(null);
				$.ajax({
					method: 'POST',
					dataType: 'jsonp',
					jsonpCallback: 'getJson',
					url: SITUtil.capas.GEOSERVER + '/sit/ows',
					data: {
						"service": "WFS",
						"version":"1.0.0",
						"request": "GetFeature",
						"typename": "sit:numeropuertas",
						"outputFormat": "text/javascript",
						"callback":"getJson",
						"format_options":"callback: getJson",
						"srsname": "EPSG:32719",
						"maxFeatures": 50,
						"CQL_FILTER": query
					},
					success: function (data) {
						console.log("dir",data);
						var lista =[];
						if (data.features.length >= 1) {
							angular.forEach(data.features,function (item) {
								//console.log(item);
								lista.push({"layer":"Dirección","desc":item.properties.tipo_via + " " + item.properties.nombre_via + " #"+item.properties.num_puerta + ", " + item.properties.zona , "geometry":item.geometry})
							});
						}
						else {
							console.log("Sin resultados de dir ");
							$.unblockUI();
							$scope.$apply();
						}
						$scope.mapa.acciones.buscarContenedorCrear(lista);
					},
					error: function (jqXHR, textStatus) {
						console.log("Request failed: " + textStatus);
					}
				});
			},
			buscarVia:function (s) {
				var exprs = [];
				exprs.push("gdbsnovi ILIKE '%" + s + "%'");
				exprs.push("alias ILIKE '%" + s + "%'");
				exprs.push("novi_alias ILIKE '%" + s + "%'");
				var query = exprs.join(" OR ");
				//console.log(query);
				$scope.mapa.acciones.buscarContenedorCrear(null);
				$.ajax({
					method: 'POST',
					dataType: 'jsonp',
					jsonpCallback: 'getJson',
					url: SITUtil.capas.GEOSERVER + '/sit/ows',
					data: {
						"service": "WFS",
						"version":"1.0.0",
						"request": "GetFeature",
						"typename": "sit:vias",
						"outputFormat": "text/javascript",
						"callback":"getJson",
						"format_options":"callback: getJson",
						"srsname": "EPSG:32719",
						"maxFeatures": 100,
						"CQL_FILTER": query
					},
					success: function (data) {
						console.log("vias",data);
						var lista =[];
						var tipovia = {"2":"Av.", "3":"Calle","7":"Autopista"};

						if (data.features.length >= 1) {
							angular.forEach(data.features,function (item) {
								//console.log(item);
								var p = item.properties;
								var tipo = tipovia[p["via_tipo"]] || "";
								var titulo =  ( tipo ? "<i class='buscadorTituloLigero'>" + tipo + " </i>" : "") + "<b>" + p["alias"] + "</b>, <i class='buscadorTituloLigero'>"+ p["zonaref"] + "</i>";

								var itemTemp = {
									"layer":"Vias",
									"desc":titulo,
									"geometry":item.geometry
								};
								var idx = arrayObjectIndexOf(lista, titulo, "desc");
								if(idx>=0){
									lista[idx].geometry.push(item.geometry);
									lista[idx].layer="Vías ("+ lista[idx].geometry.length +")";
								}
								else{
									lista.push({"layer":"Vías","desc":titulo, "geometry":[item.geometry]});
								}

							});
						}
						else {
							console.log("Sin resultados de vias ");
							$.unblockUI();
							$scope.$apply();
							
						}
						$scope.mapa.acciones.buscarContenedorCrear(lista);
					},
					error: function (jqXHR, textStatus) {
						console.log("Request failed: " + textStatus);
					}
				});
			},
		}
	}




	//Revisar



    /*********************************** Registro en Integra *******************************************/
    $scope.AddIntegra = function()
    {
    	$scope.RegistroFUM.mensaje = "Generando... espere por favor.";
    	var fecha = new Date();
    	var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    	$scope.day = fecha.getDate();
    	var mes = fecha.getMonth()+2;
    	if(mes>11){mes = mes-12}
    		$scope.month = monthNames[mes];
    	$scope.year = fecha.getFullYear();
    	var sIdServicio = $scope.ConfIntegra.idServicio;
    	var sIdCiudadano = sessionService.get('IDSOLICITANTE');
    	var sFechaTramite = fechactual;
		var aServicio = {};
		var datosServicio   = new reglasnegocio();
		datosServicio.identificador = 'RCCIUDADANO_68';
		datosServicio.parametros = '{"frm_tra_dvser_id":"'+ sIdServicio +'","frm_tra_id_ciudadano":"'+ sIdCiudadano +'","frm_tra_fecha":"'+ sFechaTramite +'","frm_tra_enviado":"SI","frm_tra_id_usuario":"3"}';	
		$.blockUI();
		datosServicio.llamarregla(function(data){
			data = JSON.parse(data);
			$scope.ConfIntegra.idTramite = data.frm_tra_id;
			if($scope.idTipoPago == 1) {
				$('#divPopup4').modal('show');
				$scope.genProforma();
			}
			else {
				$scope.genProformaPagoOL();
				$('#divPopupPagoTarjeta').modal('show');
			}
			$.unblockUI();
		});
	};
 	/********************************************************************************************/
 	$scope.UpdateIntegra = function(obj){ 
        var fechactual          = obtFechaActual.obtenerFechaActual();
        var datosSerializados   =  JSON.stringify(obj);
        var idCiudadano         = sessionService.get('IDSOLICITANTE');
        var idTramite           = $scope.ConfIntegra.idTramite;
        var idServicio          = $scope.ConfIntegra.idServicio;
        var updInt   = new reglasnegocio();
     	updInt.identificador = 'RCCIUDADANO_80';
     	updInt.parametros = '{}';
        updInt.llamarregla(function(results){																																						
        results = JSON.parse(results);
        	$scope.AddIF(obj);
        });
    };
 	/********************************************************************************************/
	$scope.AddIF = function(paramForm)
	{
		var idProcodigo = $scope.ConfIntegra.idProcodigo;
        var datosSerializados = JSON.stringify(paramForm);
        var serIF = new gCrearCaso();
		serIF.usr_id=1;
		serIF.datos=datosSerializados;
		serIF.procodigo=$scope.ConfIntegra.idProcodigo;

		serIF.crearCasoAeLinea( function(resultado)
		{
			$.unblockUI();
		});
    };

	$scope.genAdj = function()
	{
		try{
			var adjunto = new gDocumentos();
			adjunto.doc_sistema = "CATASTRO";
			adjunto.doc_proceso = 1;
			adjunto.doc_id = 1;
			adjunto.doc_ci_nodo = 1;
			adjunto.doc_datos = "";
			adjunto.doc_url = $scope.dplUrl;
			adjunto.doc_version = 0;
			adjunto.doc_tiempo = 2;
			adjunto.doc_firma_digital = "";
			adjunto.doc_usuario = "Ciudadano";
			adjunto.doc_tipo_documento  ="";
			adjunto.doc_tamanio_documento ="";
			adjunto.doc_nombre ="DuplicadoCatastral";
			adjunto.doc_tps_doc_id=0;
			adjunto.doc_url_logica = $scope.dplUrl;
			adjunto.doc_acceso="";
			adjunto.doc_tipo_documento_ext="";
			adjunto.doc_nrotramite_nexo=0;
			adjunto.doc_id_codigo=0;

			adjunto.doc_titulo ="";
			adjunto.doc_palabras="";
			adjunto.doc_registro="";
			adjunto.doc_modificacion="";
			adjunto.doc_estado="";
			adjunto.doc_cuerpo="";
			adjunto.doc_tipo_documentacion="";
			adjunto.doc_tipo_ingreso="";
			adjunto.doc_estado_de_envio="";
			adjunto.doc_correlativo="";
			adjunto.doc_id_carpeta = 0;

			var fecha= new Date();
			var fechactual=fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

				adjunto.insertarDoc(function(resultado){
				//documento.insertarDoc(function(resultado){
				var resultadoApi = JSON.parse(resultado);
				if (resultadoApi.success){} 
				else {
					$.unblockUI();
					sweet.show(resultadoApi.error.message);
				}
				$scope.dplUrl = "";
			});
		}
		catch(e)
		{
			$scope.dplUrl = "";
		}
	};
}
