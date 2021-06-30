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

function RegistrocatastralController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad,$timeout,$window)
{
	//OK
	joao = $scope;
	$scope.flujoSolicitud = {

		paso:'bandeja', //seleccionPredio (ubicacion del predio)

		opcionSeleccionPredio:'B',

		acciones:{
			inicio:function () {
				$scope.flujoSolicitud.paso = "inicio";
				//Mensaje de tipo de actualizacion
				//Setear variables;
				$scope.solicitud.acciones.reset();
				$scope.solicitud.acciones.establecerDatosSolicitante();
				//Por ahora ir a paso siguiente, luego hace manual
				$scope.flujoSolicitud.acciones.paso1();

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
							$scope.flujoSolicitud.opcionSeleccionPredio ='A';
							$scope.$apply();
						}catch(e){
							console.log("error", e);
						}
					},100);
				}
			},
			paso2:function () {
				//Delegar a profesional externo
				$scope.flujoSolicitud.paso = "delegacionProfesional";
				if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
					$scope.$apply();
				}
			},
			cancelar:function (progreso) {
				$scope.flujoSolicitud.paso = "bandeja";
				$scope.solicitud.acciones.reset();
				$scope.mapa.acciones.cancelar();
			},
			atras:function (paso) {
				$scope.flujoSolicitud.paso = paso;
			}
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
				$.blockUI();
				var predio = new dataSIT();
				predio.catObtenerPredioxCodcat( codCat,"C1",function(resultado){
					var resApi = JSON.parse(resultado);
					//console.log("--->",resApi);
					if(resApi.success)
					{
						var datosPredio = resApi.success.dataSql[0];
						console.log("datos predio--->",resApi.success.dataSql);
						var matrizHabilitada = $scope.predio.acciones.verificarMatrizHabilitada(datosPredio.idTipoPredio);
						if(matrizHabilitada == false){
							var idTipoRegimen = 0;
							idTipoRegimen = datosPredio.idTipoPredio == "1" || datosPredio.idTipoPredio == "2" ? 1:(datosPredio.idTipoPredio == "4"? 2 : 0 );
							$scope.solicitud.acciones.establecerDatosBasicosPredio(datosPredio.codigoCatastral,datosPredio.descPlanimetria,datosPredio.direccion,datosPredio.edificio,datosPredio.idCodPlanimetria,datosPredio.idMacrodistrito,datosPredio.idPendienteTerreno,datosPredio.idTipoPredio,datosPredio.macrodistrito,datosPredio.nroPuerta,datosPredio.servAguaPotable,datosPredio.servAlcantarillado,datosPredio.servAlumbrado,datosPredio.servEnergiaElec,datosPredio.servGas,datosPredio.servTelefono,datosPredio.wkt,datosPredio.zona, datosPredio.iddistritoMunicipal, idTipoRegimen);
							$scope.predio.acciones.verificarCertificacion($scope.solicitud.codigoCatastral);
							$scope.mapa.acciones.obtenerRiesgo(datosPredio.wkt);
							$scope.flujoSolicitud.acciones.paso2();
						}
						else{
							$('#divPopupMatrizHabilitada').modal('show');
						}
						$.unblockUI();
					}
					else
					{
						swal('', 'Error al obtener datos', 'error');
						console.log("Error al obtener datos",resApi.error.message,resApi.error.code);
						$.unblockUI();
					}
				});
			},
			obtenerXwkt:function(wkt){
				$.blockUI();
				var predio = new dataSIT();
				predio.catObtenetPredioxWkt( wkt,"C2",function(resultado){
					$.unblockUI();
					var resApi = JSON.parse(resultado);
					console.log("wkt--->",resApi);
					if(resApi.success)
					{
						var datosPredio = resApi.success.dataSql[0];

						//Verificar tramite en proceso
						var predio = new dataSIT();
						predio.catPredioTramiteEnProceso( datosPredio.codigoCatastral,function(resultado){
							$.unblockUI();
							var resApi = JSON.parse(resultado);
							if(resApi.success)
							{
								if(resApi.success.dataSql.length > 0){
									var fechaRegistro = new Date(resApi.success.dataSql[0].fechaRegistro);
									var cadFecha = getFormattedDate(fechaRegistro);
									swal('', 'Este predio tiene un trámite en proceso, por lo que no puede continuar.\nFecha de Registro ' + cadFecha, 'error');
								}
								else{
									console.log("datos predio--->",resApi.success.dataSql);
									var matrizHabilitada = $scope.predio.acciones.verificarMatrizHabilitada(datosPredio.idTipoPredio);
									if(matrizHabilitada == false){
										var idTipoRegimen = 0;
										idTipoRegimen = datosPredio.idTipoPredio == "1" || datosPredio.idTipoPredio == "2" ? 1:(datosPredio.idTipoPredio == "4"? 2 : 0 );
										$scope.solicitud.acciones.establecerDatosBasicosPredio(datosPredio.codigoCatastral,datosPredio.descPlanimetria,datosPredio.direccion,datosPredio.edificio,datosPredio.idCodPlanimetria,datosPredio.idMacrodistrito,datosPredio.idPendienteTerreno,datosPredio.idTipoPredio,datosPredio.macrodistrito,datosPredio.nroPuerta,datosPredio.servAguaPotable,datosPredio.servAlcantarillado,datosPredio.servAlumbrado,datosPredio.servEnergiaElec,datosPredio.servGas,datosPredio.servTelefono,datosPredio.wkt,datosPredio.zona, datosPredio.iddistritoMunicipal, idTipoRegimen);
										$scope.predio.acciones.verificarCertificacion($scope.solicitud.codigoCatastral);
										$scope.mapa.acciones.obtenerZona(wkt);
										$scope.mapa.acciones.obtenerRiesgo(wkt);
										$scope.flujoSolicitud.acciones.paso2();
									}
									else{
										$('#divPopupMatrizHabilitada').modal('show');
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
			},
			verificarCertificacion:function(codCat){
				$.blockUI();
				var predio = new dataSIT();
				predio.catPredioConCertificacion( codCat,function(resultado){
					$.unblockUI();
					var resApi = JSON.parse(resultado);
					console.log("verificarCertificacion--->",resApi);
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
				$.blockUI();
				var predio = new dataSIT();
				predio.catPredioReingreso( codCat,idTipoRegimen,function(resultado){
					$.unblockUI();
					var resApi = JSON.parse(resultado);
					console.log("verificarReingreso--->",resApi);
					if(resApi.success)
					{
						$scope.solicitud.tieneMensura =0;
						if(resApi.success.dataSql.length > 0){
							$scope.solicitud.acciones.establecerTipoTramite(4);
							$scope.solicitud.tieneMensura = resApi.success.dataSql[0].tieneMensura;
							$scope.solicitud.idInsFlujoAnterior = resApi.success.dataSql[0].idInsFlujo;
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
				$.blockUI();
				var predio = new dataSIT();
				predio.catPredioTramiteEnProceso( codCat,function(resultado){
					var resApi = JSON.parse(resultado);
					console.log("verificar en proceso--->",resApi);
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
			},
		}
	}

	function getFormattedDate(date) {
		var year = date.getFullYear();

		var month = (1 + date.getMonth()).toString();
		month = month.length > 1 ? month : '0' + month;

		var day = date.getDate().toString();
		day = day.length > 1 ? day : '0' + day;

		return month + '/' + day + '/' + year;
	}

	$scope.solicitud = {

		idCatastroTramiteOL: null,
		idCatastroTramite: null,
		idInsFlujo: null,
		geojson: null,
		wkt: null,
		idTipoRegimen: null, //PU o PH
		idCatastroTipoTramite: null, //1 nuevo, 2 actualziacion 3 reingreso

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

		lista:[],
		acciones:{
			reset:function () {
				$scope.solicitud.idCatastroTramiteOL= null;
				$scope.solicitud.idCatastroTramite= null;
				$scope.solicitud.idInsFlujo= null;
				$scope.solicitud.geojson= null;
				$scope.solicitud.wkt= null;
				$scope.solicitud.idTipoRegimen= null; //PU o PH
				$scope.solicitud.idCatastroTipoTramite= null; //1 nuevo; 2 actualziacion 3 reingreso

				$scope.solicitud.solicitante= null;
				$scope.solicitud.idTipoDocumento= null;
				$scope.solicitud.numDocumento= null;
				$scope.solicitud.idExpedido= null;
				$scope.solicitud.telefonoSolicitante= null;
				$scope.solicitud.emailSolicitante= null;
				$scope.solicitud.tipoPersona = null;

				$scope.solicitud.profesionalNombre=null;
				$scope.solicitud.profesionalEmail=null;
				$scope.solicitud.profesionalTelefono=null;
				$scope.solicitud.profesionalCab=null;

				$scope.solicitud.idmacroDistrito= null;
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

			},
			listar:function () {
				$scope.solicitud.lista = [];
				$.blockUI();
				var sNroDocCiudadano = sessionService.get('CICIUDADANO');
				if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
				{
					sNroDocCiudadano = sessionService.get('NITCIUDADANO');
				}
				var solicitud = new dataSITOL();
				solicitud.catListaSolicitudes(
					sNroDocCiudadano
					, function(resultado){
						var resApi = JSON.parse(resultado);
						if(resApi.success)
						{
							$scope.solicitud.lista =resApi.success.dataSql;
							$scope.tblSolicitudes.reload();
						}
						else
						{
							$.unblockUI();
							console.log("Error al listar",resApi.error.message,resApi.error.code);
						}
					});

			},
			establecerDatosSolicitante:function () {
				var datosCiudadano = new rcNatural();
				datosCiudadano.oid = sessionService.get('IDCIUDADANO');
				datosCiudadano.datosCiudadanoNatural(function(resultado){
					var response = JSON.parse(resultado);
					if (response.length > 0) {
						var results = response;
						var tipoPersona = results[0].dtspsl_tipo_persona;
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
							$scope.solicitud.idExpedido= '';
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
				console.log("entro");
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
					$scope.solicitud.idInsFlujoAnterior
					, function(resultado){
						var resApi = JSON.parse(resultado);
						console.log(resApi);
						if(resApi.success)
						{
							$.unblockUI();
							if(resApi.success.dataSql[0].d)
							{
								//enviar correo al arquitecto
								$scope.solicitud.acciones.delegarProfesional(resApi.success.dataSql[0].d);
							}
							else
							{
								swal('', 'Error al guardar', 'error');
							}
						}
						else
						{
							$.unblockUI();
							console.log("Error al guardar",resApi.error.message,resApi.error.code);
						}
					});

			},
			delegarProfesional:function (param) {
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
						$scope.solicitud.acciones.listar();
						$scope.flujoSolicitud.acciones.cancelar();
						swal('', 'Registro guardado y delegado al arquitecto', 'success');
						$.unblockUI();
					}
					else
					{
						console.log("error email",data);
						swal('', 'Error al enviar correo', 'error');
					}
				}).error(function (data, status, headers, config) {
					console.log("error email conexion",data, status, headers, config);
					swal('', 'Error al enviar correo', 'error');
				});
			},


		}
	}
	$scope.tblSolicitudes = new ngTableParams({
		page: 1,
		count: 10,
		filter: {},
		sorting: {
			fechaRegistro: 'desc'
		}
	}, {
		total: $scope.solicitud.lista.length,
		getData: function($defer, params) {
			var filteredData = params.filter() ? $filter('filter')($scope.solicitud.lista, params.filter()) : $scope.solicitud.lista;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : $scope.solicitud.lista;
			params.total($scope.solicitud.lista.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	});
	
	$scope.profesinalExterno = {
		lista:[],
		filtro:null,
		acciones:{
			listar: function () {
				$scope.profesinalExterno.lista = [];
				var apiSIT = new dataSIT();
				apiSIT.pcListaArquitecto(function(resultado){
					var resApi = JSON.parse(resultado);
					if(resApi.success){
						$scope.profesinalExterno.lista = resApi.success.dataSql;
						var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
						$scope.tblProfesionalExterno.reload();
					}
					else
					{
						swal('', 'Error al recuperar la data de arquitectos', 'error');
						console.log("Error al recuperar la data de arquitectos",resApi.error.message,resApi.error.code);
					}
				});
			},
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
				console.log(arqui);
				$scope.solicitud.acciones.establecerDatosProfesional(arqui.arquitectoNombre,arqui.registroNacionalCAB,  arqui.telefonoCelular, arqui.correoElectronico);
				//$scope.cambiarTextoBtnSolicitud();
			}
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
		
	
	$scope.inicio = function () {
		//$("#results").dialog({ autoOpen: false, width: 880, height: 605, zIndex: 3000, modal: true, title: "Ventana Resultados" });
		$.blockUI({ css: {
			border: 'none',
			padding: '10px',

			backgroundColor: '#000',
			'-webkit-border-radius': '10px',
			'-moz-border-radius': '10px',
			opacity: .5,
			color: '#fff'
		},message: "Espere un momento porfavor..." });
		setTimeout(function()
		{
			try{

				//$scope.loginPagoEnLinea();
				//$scope.recuperarDatosRegistro();
				//$scope.CargarComboMotivos();
				//$scope.CargarComboMotivosDetalle();
				$scope.solicitud.acciones.listar();
				$scope.predio.acciones.listar();
				$scope.profesinalExterno.acciones.listar();
				//$scope.registro3 = aReg;
				//$scope.solicitudesCiudadano();

			}catch(e)
			{
				console.log("error", e);
			}
		},500);

	}

	$scope.$on('api:ready',function(){
		//$scope.loginPagoEnLinea();
		//$scope.recuperarDatosRegistro();
		//$scope.CargarComboMotivos();
		//$scope.CargarComboMotivosDetalle();
		//$scope.solicitudesCiudadano();
		//$scope.registro3 = aReg;

	});

	//Mapa
	$scope.mapa = {
		estado:null,
		acciones:{
			iniciar:function () {
				SITUtil.capas.GEOSERVER = "http://sitservicios.lapaz.bo/geoserver";
				$scope.vectorSource = new ol.source.Vector(
					//{
					//features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
					//}
				);
				$scope.vectorSource.set('name', 'Solicitud');

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
					style: styles.Point
				});

				//Mapa
				lays = new SITLayers();
				m_app = new SITMap();
				$scope.map = m_app.build(null, null, [
					lays.getBaseLayers(null, true, true)
					, lays.getOverLayers(null, true, false)
					, $scope.vectorLayer
				]);

				(m_app.createLayerSwitcher()).hide();
				m_app.createControlBar(null);
				//if(idTipo == "1")
				//	m_app.createControlBarCustom(null, $scope.solicitud.acciones.establecerUbicacion);

				//m_app.createControlBarCustom(null, $scope.ubicacion.setGeom, $scope.ubicacion.getData);
				// busquedas
				var search_app = new SITSearch();

				var sit_search = new sit.Search();
				$scope.map.addControl(sit_search);

				sit_search.addSearch("Zonas Referenciales", search_app.getZonasGU());
				sit_search.addSearch("Calles avenidas", search_app.getVias());
				sit_search.addSearch("Lugares, sitios, equip...", search_app.getToponimia(), true);
				sit_search.addSearch("Código catastral", search_app.getLotes());
				sit_search.addSearch("Direcciones, puertas", search_app.getDirecciones());

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

					console.log("--A", wkt);
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
			obtenerZona: function (wkt) {
				console.log("zona wkt");
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
						console.log("-----",response);
						//$scope.getRiesgo(wkt, callbackRiesgo, callbackPlani, callbackLote);
						if (response.features.length >= 1) {
							$scope.solicitud.zona = response.features[0].properties.GDBSNOMB;
							$scope.$apply();
							//distrito = response.features[0].properties.distrito;

						}
						else {
							console.log("Sin resultados de zonas");
						}
					},
					error: function (jqXHR, textStatus) {
						console.log("Request failed: " + textStatus);
					}
				});

			},
			obtenerRiesgo : function (wkt) {

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
						console.log("riesgo wkt",data);
						if (data.features.length >= 1) {
							$scope.solicitud.riesgo = data.features[0].properties.grado;
							$scope.$apply();
						}
						else {
							console.log("Sin resultados de zona riesgo");
							$.unblockUI();
							$scope.$apply();
						}

					},
					error: function (jqXHR, textStatus) {
						console.log("Request failed: " + textStatus);
					}
				});

			},
			buscarZona:function (s) {
				var exprs = [];
				exprs.push("zonaref ILIKE '%" + s + "%'");
				exprs.push("zona ILIKE '%" + s + "%'");
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
						if (data.features.length >= 1) {
							//$scope.solicitud.riesgo = data.features[0].properties.grado;
							//$scope.$apply();
						}
						else {
							console.log("Sin resultados de zona ");
							$.unblockUI();
							$scope.$apply();
						}
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
