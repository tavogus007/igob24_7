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
app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

function DuplicadosController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad,$timeout,$window) 
{
	$scope.NuevoTipoSolicitud=0;
	$scope.diasImpresion=60;
	$scope.varSpin = false;
	$scope.RegistroFUM={
		registrado:null,
		mensaje:null
	};

	$scope.configParametros = {
		documentoSolicitud:{
			idTipoDocIfile : 0,
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
			servicioDuplicado : 0,

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
								if(item.servicio == 'DUPLICADO' && item.tipo == 'DUPLICADO'){
									$scope.configParametros.tasas.servicioDuplicado = item.valor;
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
		duplicado:{
			titulo : "DUPLICADO DE CERTIFICADO CATASTRAL",
			codigo :"duplicado",
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
				//if($scope.servicioCatastral.seleccionado.codigo == $scope.servicioCatastral.externo.codigo){
				//	$scope.solicitud.acciones.establecerDatosTipoServicioyRegistro(3,1);//tipo servicio 3 externo, tipo registro 1 nuevo
				//}
			},
			seleccionarVista:function (vista) {
				$scope.servicioCatastral.seleccionado.vistas.seleccionado =  angular.copy(vista);
			}
		}

	}

	$scope.servicioCatastral.acciones.seleccionar($scope.servicioCatastral.duplicado);
	$scope.configParametros.tasas.acciones.obtener();

	var aReg = { "cedula": "","complemento": "","celular":"","correo":"","direccion":"","estado_civil":"",
		"fecha_nacimiento":"","materno":"","nombre":"","ocupacion":"","paterno":"","sexo":"","telefono":"",
		"cedula2": "","nit2": "","complemento2": "","repLegal": "","nroDocumento": "","nroNotaria": "",
		"nit": "","razonSocial": "","tipoP": "","cestcivil_id": "","expedido":""};
	$scope.recuperarDatosRegistro = function(){
		
		var datosCiudadano=new rcNatural();
		datosCiudadano.oid=sessionService.get('IDCIUDADANO');
		datosCiudadano.datosCiudadanoNatural(function(resultado){
			var response = JSON.parse(resultado);
			console.log("datpos del ciudadano", response);
			if (response.length > 0) {
				var results = response;
				tipoPersona = results[0].dtspsl_tipo_persona;
				if (tipoPersona == 'NATURAL') {
					$scope.datospersonaNatural = null;
					$scope.datospersonaJuridica = "ocultar";
					aReg.nombre = results[0].dtspsl_nombres;
					aReg.paterno = results[0].dtspsl_paterno;
					aReg.materno = results[0].dtspsl_materno;
					aReg.cedula = results[0].dtspsl_ci;
					aReg.expedido = results[0].dtspsl_expedido;
					aReg.sexo=(results[0].dtspsl_sexo=='M')?'MASCULINO':'FEMENINO';
					aReg.fecha_nacimiento = results[0].dtspsl_fec_nacimiento;
					aReg.ocupacion = results[0].dtspsl_ocupacion;
					aReg.direccion = results[0].dtspsl_direccion;
					aReg.correo = results[0].dtspsl_correo;
					aReg.telefono = results[0].dtspsl_telefono;
					aReg.celular = results[0].dtspsl_movil;
					angelNatural = aReg;
				}
				else{
					$scope.datospersonaJuridica = null;
					$scope.datospersonaNatural = "ocultar";
					aReg.nombre = results[0].dtspsl_nombres;
					aReg.paterno = results[0].dtspsl_paterno;
					aReg.materno = results[0].dtspsl_materno;
					aReg.cedula = results[0].dtspsl_ci;
					aReg.repLegal = results[0].dtspsl_poder_replegal;
					aReg.nroNotaria = results[0].dtspsl_nro_notaria;
					aReg.nroDocumento = results[0].dtspsl_nro_documento;
					//DATOS INICIALES REGISTRO CIUDADANO
					aReg.razonSocial   = results[0].dtspsl_razon_social;
					aReg.telefono      = results[0].dtspsl_telefono;
					aReg.celular       = results[0].dtspsl_movil;
					aReg.correo        = results[0].dtspsl_correo;
					aReg.nit           = results[0].dtspsl_nit;
					aReg.direccion     = results[0].dtspsl_direccion;
					aReg.nrocasa       = results[0].dtspsl_numero_casa;
					aReg.nrooficina    = results[0].dtspsl_oficina;
				}
				switch(aReg.expedido) {
					case '1':
						aReg.expedido = 'CHQ';
						break;
					case '2':
						aReg.expedido = 'LPZ';
						break;
					case '3':
						aReg.expedido = 'CBB';
						break;
					case '4':
						aReg.expedido = 'ORU';
						break;
					case '5':
						aReg.expedido = 'PTS';
						break;
					case '6':
						aReg.expedido = 'TJA';
						break;
					case '7':
						aReg.expedido = 'SCZ';
						break;
					case '8':
						aReg.expedido = 'BNI';
						break;
					case '9':
						aReg.expedido = 'PND';
						break;
				}
			}
			else{
				console.log("No se encontraron los datos del ciudadano!!", sessionService.get('IDCIUDADANO'));
			}
		});
	};
	$scope.CargarComboMotivos = function () {
		var lstMotivos = new dataSITOL();
		lstMotivos.dplLstMotivos( function(resultado){
			var resApi = JSON.parse(resultado);
			if(resApi.success)
			{
				$scope.Motivos =   resApi.success.dataSql;
			}
			else
			{
				sweet.show('', 'Error al recuperar datos', 'error');
				console.log("Error en la funcion CargarComboMotivos", resApi.error.message);
			}
		});
	};
	$scope.CargarComboMotivosDetalle = function () {
		$scope.idMotivoDetalle=0;
		var lstMotivosDet = new dataSITOL();
		lstMotivosDet.dplLstMotivosDet( $scope.idMotivo , function(resultado){
			var resApi = JSON.parse(resultado);
			if(resApi.success)
			{
				$scope.MotivosDetalle =   resApi.success.dataSql;
			}
			else
			{
				sweet.show('', 'Error al recuperar datos', 'error');
				console.log("Error en la funcion CargarComboMotivosDetalle", resApi.error.message);
			}
		});
	};
	$scope.CargarLstCC = function () {
		$scope.lstCCciudadano = [];
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
				$scope.lstCCciudadano = resApi.success.dataSql;
			}
			else
			{
				console.log("Error en la funcion lstCC",resApi.error.message);
			}
		});
	};
	$scope.CargarSolicitudesCiudadano = function(){
		var sIdCiudadano = sessionService.get('IDSOLICITANTE');
		var sNroDocCiudadano = sessionService.get('CICIUDADANO');
		if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
		{
			sNroDocCiudadano = sessionService.get('NITCIUDADANO');
		}
		var lstSol = new dataSITOL();
		lstSol.dplLstSol( sNroDocCiudadano, 1, function(resultado){
			var resApi = JSON.parse(resultado);
			if(resApi.success)
			{
				$scope.solicitudesUsuario = resApi.success.dataSql;
				var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
				$scope.tablaSolicitudes.reload();
				$scope.vlFum();
			}
			else
			{
				sweet.show('', 'Error al recuperar datos', 'error');
				console.log("Error en la funcion solicitudesCiudadano", resApi.error.message);
			}
			$.unblockUI();
		});
	};

	$scope.solicitudesUsuario = [];
	//$scope.tablaSolicitudes = {};
	$scope.tablaSolicitudes = new ngTableParams({
		page: 1,
		count: 8,
		filter: {},
		sorting: {
			FechaRegistro: 'desc'
		}
	}, {
		total: $scope.solicitudesUsuario.length,
		getData: function($defer, params) {
			var filteredData = params.filter() ?
				$filter('filter')($scope.solicitudesUsuario, params.filter()) :
				$scope.solicitudesUsuario;
			var orderedData = params.sorting() ?
				$filter('orderBy')(filteredData, params.orderBy()) :
				$scope.solicitudesUsuario;
			params.total($scope.solicitudesUsuario.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	});

	//Imagen tutorial
	$scope.srcTutorial="../catastro/img/Infografia.png";
	$scope.cambiarImagen=function(idImg){
		if(idImg==0){
			$scope.srcTutorial="../catastro/img/Infografia.png";
		}
		else{
			$scope.srcTutorial="../catastro/img/paso"+idImg+".png";
		}
		$scope.idNav=idImg;
	};
	$scope.navegarGuiaTramite=function () {
		switch ($scope.idNav){
			case 1:
				$('#divPopup').modal('show');
				break;
			case 2:
				$('#divPopup7').modal('show');
				break;
			case 3:
				$('#divPopup9').modal('show');
				break;
			case 4:
				$('#divPopupTipoPago').modal('show');
				break;
			case 5:
				$('#divPopup4').modal('show');
				break;
			case 6:
				$('#divPopup7').modal('show');
				break;
			case 7:
				$('#divPopup8').modal('show');
				break;
			default:
		}
	};
	
	$scope.inicioSolicitudes = function (){
		//$('html, body').animate({scrollTop:0}, 'slow');
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
				$scope.loginPagoEnLinea();//Revisar
				$scope.recuperarDatosRegistro();
				$scope.CargarComboMotivos();
				$scope.CargarComboMotivosDetalle();
				$scope.CargarLstCC();
				$scope.registro3 = aReg;
				$scope.CargarSolicitudesCiudadano();
			}catch(e)
			{
				console.log("error", e);
			}
		},500);
	};

	//------------------------  Flujo Registro INICIO -----------------------------------------
	//Paso 1 Seleccion de predio
	$scope.seleccionarPredio = function (cc1) {

		$scope.codigoCatastral={};
		$scope.resultadoBusqueda = {};
		$scope.confirmacionCiudadano = null;
		$scope.observacion.codigoCatastral='';
		$scope.observacion.obs='';
		$scope.cerrarProforma();
		//$scope.getCaptchasX();
		
		console.log("sass",cc1);
		var cc = cc1.CodigoCatastral;
		$scope.codigoCatastral.distrito=cc.substring(0,3);
		$scope.codigoCatastral.manzana=cc.substring(3,7);
		$scope.codigoCatastral.predio=cc.substring(7,11);
		$scope.codigoCatastral.subpredio=cc.substring(11,15);
		//$('#divPopup').modal('hide');
		//$('#divPopup7').modal('show');
		$scope.BuscarCertificado(cc);
	}
	
	//Paso 2 buscador
	$scope.codigoCatastral={
		distrito:null,
		manzana:null,
		predio:null,
		subpredio:null
	};
	$scope.BuscarCertificado = function (codcat){
		var myimage = document.getElementById("pdfView");
		if (myimage.addEventListener) {
			// IE9, Chrome, Safari, Opera
			myimage.addEventListener("mousewheel", MouseWheelHandler, false);
			// Firefox
			myimage.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
		}
		// IE 6/7/8
		else myimage.attachEvent("onmousewheel", MouseWheelHandler);

		$scope.tipoVisor=1;
		$scope.varSpin = true;
		var d = Padleft('000',$scope.codigoCatastral.distrito);
		var m = Padleft('0000',$scope.codigoCatastral.manzana);
		var p = Padleft('0000',$scope.codigoCatastral.predio);
		if($scope.codigoCatastral.subpredio == undefined)
			$scope.codigoCatastral.subpredio = 0;
		var sp = Padleft('0000',$scope.codigoCatastral.subpredio);
		var cc = d+m+p+sp;
		$scope.observacion.codigoCatastral = d + '-' + m + '-' + p + '-' + sp ;
		var nrodoc =  sessionService.get('CICIUDADANO');

		//Verificar tipo personeria
		if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
		{
			nrodoc = sessionService.get('NITCIUDADANO');
		}
		$scope.resetUrl();

		//Verificamos en sitram si el predio tiene tramites pendientes
		console.log("verificar en sitram", cc);
		p = {
			codcat: cc
		};
		$http({
			method: 'POST',
			url: CONFIG.SERVICE_SITOLextgen + 'Servicios/validarDuplicado',
			data: Object.toparams(p),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data, status, headers, config) {
			if (data.res == 'OK') {
				console.log(data);
				if(data.resultado ==""){
					var busCodCat = new dataSIT();
					busCodCat.dplBusCodCat( cc, nrodoc, 1, function(resultado){
						var resApi = JSON.parse(resultado);
						if(resApi.success)
						{
							$scope.resultadoBusqueda = resApi.success.dataSql[0];
							if($scope.resultadoBusqueda)
							{
								if($scope.resultadoBusqueda.res == "OK"){
									//VERIFICAMOS SI ES NUEVO TIPO DE TRAMITE, angel laura
									p = {
										CodCat: cc,nroDoc:nrodoc
									};
									$http({
										method: 'POST',
										url: CONFIG.SERVICE_SITOLextgen + 'DuplicadosPh/verTipoTramiteNuevo',
										data: Object.toparams(p),
										headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
									}).success(function (data, status, headers, config) {
										if (data.res == 'nuevo') {
											$scope.NuevoTipoSolicitud=1;
											$scope.solicitudNueva();
										}
										else {
											$scope.NuevoTipoSolicitud=0;
											$scope.solicitudAntigua();
										}
									}).error(function (data, status, headers, config) {
										sweet.show('', 'Error al registrar proforma de pago', 'error');
										console.log("Error registro fum SIT ext, datos devueltos:", data);
									});
									//-------------------------------------------------------
								}
								else
								{
									$('#visorPreview object').attr("data","");
									$scope.varSpin=false;
								}
							}
							$scope.codigoCatastral={};
						}
						else
						{
							sweet.show('', 'Error al buscar certificado', 'error');
							$scope.spinner = false;
							console.log("Error en la funcion BuscarCertificado", resApi.error.message);
						}
						$.unblockUI();
					});
				}
				else{
					$scope.resultadoBusqueda.res="ERROR";
					$scope.resultadoBusqueda.msg=data.resultado;
					$scope.varSpin=false;
				}
			}
			else {
				sweet.show('', 'Error al verificar tramites Sitram del predio:' + data.resultado, 'error');
				console.log("Error al verificar tramites Sitram del predio:", data);
			}
		}).error(function (data, status, headers, config) {
			sweet.show('', 'Error de conección al verificar tramites Sitram del predio:' + JSON.stringify(data), 'error');
			console.log("Error de conección al verificar tramites Sitram del predio:", data);
		});
	};
	$scope.solicitudAntigua=function() {
		var urlPreview  = CONFIG.SERVICE_SITOLext + 'DesplegarPreviewDpl?Dpl=' + $scope.resultadoBusqueda.Dpl;
		$('#PDFtoPrint').attr('src',urlPreview);
		$scope.RefreshUrl(urlPreview);
		$timeout(function(){$scope.varSpin=false}, 2800);
		$scope.fit();
	};
	$scope.solicitudNueva=function (){
		var urlPreview = CONFIG.SERVICE_SITOLextgen + 'DuplicadosPh/DesplegarPreviewDplNuevo?Dpl=' + $scope.resultadoBusqueda.Dpl;
		$('#PDFtoPrint').attr('src', urlPreview);
		$scope.RefreshUrl(urlPreview);
		$timeout(function () {
			$scope.varSpin = false
		}, 2800);
		$scope.fit();
	};

	//Paso 3 Seleccion Motivos 
	//funciones proforma de pago
	$scope.proforma=false;
	$scope.idMotivo=0;
	$scope.idMotivoDetalle=0;
	$scope.detalle={vista:false,datos:{}};
	$scope.usuario={ap:'',am:'',nombre:'',email:'',ci:'',cel:''};
	$scope.scroll = 0;
	$scope.loading = 'loading';
	$scope.getNavStyle = function(scroll) {
		if(scroll > 100) return 'pdf-controls fixed';
		else return 'pdf-controls';
	};
	$scope.tipoVisor=1;
	$scope.onError = function(error){};
	$scope.onLoad = function() {
		$scope.loading = '';
	};
	$scope.onProgress = function(progress) {};
	$scope.resetUrl=function () {
		$scope.pdfUrl = '../catastro/img/Default.pdf';
		var url = '../catastro/img/Default.pdf';
		$('#PDFtoPrint').attr('src',url);
		$scope.RefreshUrl(url);
		//$scope.servicioCatastral.seleccionado.vistas.seleccionado = angular.copy($scope.servicioCatastral.seleccionado.vistas.solicitar);
		$scope.servicioCatastral.acciones.seleccionarVista($scope.servicioCatastral.seleccionado.vistas.tramites);
	};
	$scope.pdfUrl = '../catastro/img/Default.pdf';

	$scope.ProformaPago=function (resBusquedaDato) {
		$scope.codigoCatastral={};
		$scope.idMotivo=0;
		$scope.idMotivoDetalle=0;
		$scope.descMotivo="";
		$scope.descMotivoDetalle="";
		//$scope.resultadoBusqueda = {};
		if(resBusquedaDato.res == "OK")
		{
			$scope.proforma=true;
		}
	};
	$scope.cerrarProforma=function(){
		$scope.proforma=false;
		$scope.idMotivoDetalle =0;
		$scope.idMotivo =0;
	};
	$scope.cerrarDetalle=function(){
		$scope.detalle.vista=false;
	};
	$scope.verDetalle=function(id){
		$scope.detalle.vista=true;
	};

	//Paso 3.1 Visualizacion de descripcion de motivos
	$scope.cargarDescripcionMotivos=function(){
		for(var i=0; i< $scope.Motivos.length; i++){
			var itemM = $scope.Motivos[i];
			if(itemM.IdMotivo == $scope.idMotivo){
				$scope.descMotivo = itemM.descripcion;
				break;
			}
		}
		for(var i=0; i< $scope.MotivosDetalle.length; i++){
			var itemD = $scope.MotivosDetalle[i];
			if(itemD.IdMotivoDetalle == $scope.idMotivoDetalle){
				$scope.descMotivoDetalle = itemD.Descripcion;
				break;
			}
		}
	};

	//Paso 4 Seleccion tipo pago
	//Se setea la variable de tipo de pago
	//Se registra en IGOB



	//Paso Final Ver Duplicado
	$scope.DeplegarDpl = function (sol)
	{
		//$scope.resetUrl();
		var myimage = document.getElementById("pdfView");
		if (myimage.addEventListener) {
			// IE9, Chrome, Safari, Opera
			myimage.addEventListener("mousewheel", MouseWheelHandler, false);
			// Firefox
			myimage.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
		}
		// IE 6/7/8
		else myimage.attachEvent("onmousewheel", MouseWheelHandler);

		$scope.tipoVisor=2;
		$scope.varSpin = true;
		var url = CONFIG.SERVICE_SITOLext + 'DesplegarDuplicado?a=' + sol.a;
		$scope.RefreshUrl(url);
		$timeout(function(){$scope.varSpin=false}, 1000);

		if(sol.idEstado == 2){
			$scope.dspl = true;
			$('#PDFtoPrint').attr('src',url);
		}
		else{
			$scope.dspl=false;
		}
		//para el adjunto
		$scope.dplUrl = url;
		$scope.fit();
	};


	//------------------------Flujo registro - FIN -----------------------------

	//------------------------ Verificar pago - Inicio ---------------------------
	//Verifica si cada una de las solicitudes fue pagada
	$scope.vlFum = function () {
		if(sessionService.get('TOKEN')){}
		else{ $scope.loginPagoEnLinea(); }
		for(var i = 0; i< $scope.solicitudesUsuario.length; i++)
		{
			if($scope.solicitudesUsuario[i].idEstado == 1 && $scope.solicitudesUsuario[i].idTipoPago == 2)
			{
				$scope.vdplepago($scope.solicitudesUsuario[i]);
			}
			else if($scope.solicitudesUsuario[i].idEstado == 1 && $scope.solicitudesUsuario[i].idTipoPago == 1)
			{
				$scope.vgDpl($scope.solicitudesUsuario[i]);
			}
		}

	};
	//Verifica solicitud pagada por banco y genera duplicado
	$scope.vgDpl=function (objFum) {
		var p = {q: objFum.f};
		$http({
			method: 'POST',
			url: CONFIG.SERVICE_SITOLext + 'vgdpl',
			data: Object.toparams(p),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data, status, headers, config)
		{
			if(data.res == "OK")
			{
				try{
					$scope.updateIGOB(objFum.IdRegistro);
				}catch(e)
				{
					console.log("error al registrar sitram y actualizar en igob", e);
				}

				$scope.lstSolUnico();
			}
		}).error(function (data, status, headers, config) {
			sweet.show('', 'Error al gen dpl', 'error');
			console.log("Error en la funcion vgDpl",data)
		});
	};
	//Verifica solicitud pagada en linea y llama a servicio para generar duplicado
	$scope.vdplepago = function(objFum){
		var idFum = objFum.FUM;
		var formData = {
			'idfum':idFum
		};
		var idtoken =   sessionService.get('TOKEN');
		var stoquen =  'Bearer ' + idtoken ;
		$.ajax({
			"async": true,
			type        : 'POST',
			url         : CONFIG.CONEXION_PAGOS +'api/comprobantedepago',
			data        : formData,
			dataType    : 'json',
			crossDomain : true,
			"headers": {
				"cache-control": "no-cache",
			},
			headers: {
				'authorization': stoquen
			},
			success     : function(data) {
				var res = JSON.stringify(data);
				var res2 = res.replace("Respuesta enviada","Respuestaenviada");
				var res3 = JSON.parse(res2);
				joao = res3;
				if(res3.Respuestaenviada.idFum)
				{
					$scope.gDpl(objFum);
				}
			},error: function (data)
			{
				console.log("Error en funcion vdplepago", data);
			}
		});
	};
	$scope.gDpl=function (objFum) {
		var p = {q: objFum.f};
		$http({
			method: 'POST',
			url: CONFIG.SERVICE_SITOLext + 'gdpl',
			data: Object.toparams(p),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data, status, headers, config) {
			if(data.res == "OK")
			{
				$scope.lstSolUnico();
			}
		}).error(function (data, status, headers, config) {
			sweet.show('', 'Error al gen dpl', 'error');
			console.log("Error gDpl", data);
		});
	};

	$scope.lstSolUnico = function () {
		var sIdCiudadano = sessionService.get('IDSOLICITANTE');
		var sNroDocCiudadano = sessionService.get('CICIUDADANO');
		if(sessionService.get('TIPO_PERSONA') == 'JURIDICO')
		{
			sNroDocCiudadano = sessionService.get('NITCIUDADANO');
		}
		var lstSol = new dataSITOL();
		lstSol.dplLstSol( sNroDocCiudadano, 1, function(resultado){
			var resApi = JSON.parse(resultado);
			if(resApi.success)
			{
				$scope.solicitudesUsuario = resApi.success.dataSql;
				var data = resApi.success.dataSql;//grabamos la respuesta para el paginado
				$scope.tablaSolicitudes.reload();
			}
			else
			{
				sweet.show('', 'Error al recuperar datos', 'error');
				console.log("Error en la funcion lstSolUnico", resApi.error.message);
			}
		});
	};

	//------------------------ Verificar pago - FIN -----------------------------------------------

	//------------------------ Verificacines botones de acciones bandeja - Inicio --------------------
	$scope.VerificarDespliegueFUM = function (sol) {
		//return sol.idEstado == 1;
		return sol.idEstado == 1 & sol.idTipoPago == 1;
	};
	$scope.VerificarDespliegueEpago = function (sol) {
		return sol.idEstado == 1 & sol.idTipoPago == 2;
		//return true;
	};
	$scope.VerificarDespliegueCC = function (sol) {
		return sol.idEstado == 2 || sol.idEstado == 3;
	};

	$scope.VerificarEstadoFacturado = function (sol) {
		
		return sol.idEstado == 2 && sol.urlFactuta !== 'null';
	};
	//------------------------- Verificacines botones de acciones bandeja - FIN  ----------------------

	//------------------------ Observaciones  - Inicio -------------
	$scope.observacion={
		nomCiudadanoOEmpresa:sessionService.get('US_NOMBRE') + ' ' + sessionService.get('US_PATERNO') + ' ' + sessionService.get('US_MATERNO')  ,
		nroDocumento:sessionService.get('CICIUDADANO'),
		tipoPersoneria:sessionService.get('TIPO_PERSONA'),
		email:sessionService.get('US_EMAIL'),
		codigoCatastral:'',
		obs:''
	};
	if(sessionService.get('TIPO_PERSONA') == 'JURIDICO'){
		$scope.observacion.nomCiudadanoOEmpresa = sessionService.get('US_NOMBRE');
		$scope.observacion.nroDocumento = sessionService.get('NITCIUDADANO');
	}
	$scope.EnviarObservacion=function (obs) {
		$http({
			method: 'POST',
			url: CONFIG.SERVICE_SITOLext + 'RegObs',
			data: Object.toparams(obs),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data, status, headers, config) {
		}).error(function (data, status, headers, config) {
			sweet.show('', 'Error al enviar observacion', 'error');
		});
		$scope.observacion.obs='';
		sweet.show('', 'Problemas de visualización enviados', 'success');
	};
	//------------------------ Observaciones  - FIN -------------

	/*********************************** Registro en IGOB *******************************************/
	$scope.GenerarProforma = function () {
		$scope.Imp=false;
		if(	$scope.idMotivo==0 || $scope.idMotivoDetalle==0){
			$scope.RegistroFUM = {
				registrado:null,
				mensaje:'Debe seleccionar motivo y motivo detalle'
			};
		}
		else
		{
			
			//Registro FUM Inicio
			var p;
			if (tipoPersona == 'NATURAL') {
				p = {
					tipoDoc: 'CEDULA DE IDENTIDAD',
					nroDoc: aReg.cedula,
					expedido: aReg.expedido,
					nombres: aReg.nombre,
					paterno: aReg.paterno,
					materno: aReg.materno,
					casada: '',//adefinir por  integra
					fechanac: aReg.fecha_nacimiento,
					razonsocial: 'RSN',
					tkn:$scope.resultadoBusqueda.tkn,
					cc:$scope.resultadoBusqueda.codCat
				};
			}
			else{
				p = {
					tipoDoc: 'NIT',
					nroDoc: aReg.nit,
					expedido: aReg.expedido,//arreglar
					nombres: aReg.razonSocial,
					paterno: '',
					materno: '',
					casada: '',//adefinir por  integra
					fechanac: aReg.fecha_nacimiento,
					razonsocial: 'RSJ',
					tkn:$scope.resultadoBusqueda.tkn,
					cc:$scope.resultadoBusqueda.codCat
				};
			}
			$.blockUI();
			if($scope.idTipoPago == 1) {
				$http({
					method: 'POST',
					url: CONFIG.SERVICE_SITOLext + 'RegFUM',
					data: Object.toparams(p),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (data, status, headers, config) {
					console.log("RegFUM res:",data);
					if(data.res == 'OK')
					{
						//Registro tramite - Inicio
						var fumb = data.fum;
						var fumc = data.msg;
						var ccb = $scope.resultadoBusqueda.codCat;
	
						var xTipoTra=$scope.NuevoTipoSolicitud==1?"DUPLICADO_NUEVO":"DUPLICADO";
						var xIdCiudadano = "0";
						var xOIDCiudadano = sessionService.get('IDUSUARIO');
						var xApellidos = aReg.paterno + ' ' + aReg.materno;
						var xNombres= aReg.nombre;
						var xNumeroDocumento=aReg.cedula;
						var xExpedido = aReg.expedido;
						var xTipoDocumento = "CI";
						var xFUM=fumb;
						var xIdMotivo=$scope.idMotivo;
						var xIdMotivoDetalle=$scope.idMotivoDetalle;
						var xCodigoCatastral=ccb;
						var xNumInmueble="0";
						var xNumCertificado="0";
						var xfumEnc=fumc;
						var xidTipoPago=$scope.idTipoPago;
						var xcodPago="0";
						var xaccion="A";
						if (tipoPersona != 'NATURAL') {
							xApellidos=aReg.razonSocial;
							xNombres=aReg.razonSocial;
							xNumeroDocumento=aReg.nit;
							xExpedido=aReg.expedido;
							xTipoDocumento="NIT";
						}
						var regFum = new dataSITOL();
						regFum.dplRegFum( xTipoTra,xIdCiudadano,xOIDCiudadano,xApellidos,xNombres,xNumeroDocumento,xExpedido,xTipoDocumento,xFUM,xIdMotivo,xIdMotivoDetalle,xCodigoCatastral,xNumInmueble,xNumCertificado,xfumEnc,xidTipoPago,xcodPago,xaccion, function(resultado){ //xtipoPago,xcodPago,
							$.unblockUI();
							var resApi = JSON.parse(resultado);
							console.log("Registro solicitud",resApi);
							if(resApi.success)
							{
	
								$scope.idMotivo=0;
								$scope.idMotivoDetalle=0;
								$scope.RegistroFUM={
									registrado:'OK',
									mensaje:'Señor usuario, debe imprimir esta Proforma de Pago y apersonarse a cualquier entidad financiera autorizada en los siguientes 7 días calendario.'
								};
								try{
									$scope.registrarIGOB(resApi.success.dataSql[0].idRegEnc);
								}catch(e)
								{
									console.log("error al registrar en igob", e);
								}
								setTimeout(function(){
									$scope.CargarSolicitudesCiudadano();
								},100);
	
								if($scope.idTipoPago == 1) {
									$('#divPopup4').modal('show');
									//$scope.genProforma();
									var urlFum2 = CONFIG.SERVICE_SITOLext + 'DesplegarFum?q=' + fumc;
									//$( "object").css('display', 'none');
									//$( "object").attr('data',  urlFum2).css('display', '');
									$('#visorFum object').attr("data",urlFum2);
									$('#visorFum object').load(urlFum2);
								}
								/* else {
									//$scope.genProformaPagoOL();
									$('#divPopupPagoTarjeta').modal('show');
									sessionService.set('IDFUM', fumb);
									window.location.href = "#servicios|epagos";
								} */
							}
							else
							{
								sweet.show('', 'Error al registrar proforma de pago', 'error');
								console.log("Error al registrar proforma de pago", resApi.error.message);
	
								$scope.idMotivoDetalle =0;
								$scope.idMotivo =0;
								$scope.RegistroFUM={
									registrado:null,
									mensaje:'Surgió un error al registrar la solicitud, por favor vuelva a intentar'
								};
							}
						});
	
						$scope.proforma=false;
						$scope.resultadoBusqueda={};
					}
					else
					{
						$.unblockUI();
						$scope.idMotivoDetalle =0;
						$scope.idMotivo =0;
						$scope.RegistroFUM = {
							registrado:null,
							mensaje:'Surgió un error al registrar la proforma de pago, por favor vuelva a intentar'
						};
					}
				}).error(function (data, status, headers, config) {
					$.unblockUI();
					sweet.show('', 'Error al registrar proforma de pago', 'error');
					console.log("Error registro fum SIT ext, datos devueltos:", data);
				});
			
			}else{
				$.unblockUI();
				$scope.datosServicioOnline = "";//datosServicio;  
				$scope.razonSocialFac = sessionService.get('US_PATERNO');
				$scope.nitCiFac       = sessionService.get('CICIUDADANO');
				/*  $scope.loginPagoEnLinea();
					$scope.genProformaPagoOL(); */
				$('#divPopupPagoTarjeta').modal('show');
			}
		}

	}

	$scope.registrarIGOB = function (param) {
		console.log("param",param);
		var p = {q: param};
		$.blockUI();
		$http({
			method: 'POST',
			url: CONFIG.SERVICE_SITOLextgen + 'Servicios/RegistrarIGOBObtenerParam',
			data: Object.toparams(p),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data, status, headers, config) {
			$.unblockUI();
			console.log("Obteniendo parametros igob", data);
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
					console.log("data igob",data );
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
								console.log("dataRegIgob",dataRegIgob);
								var id_form_tra = dataRegIgob.success[0].id_form_tra;
								console.log("id_form_tra",id_form_tra);
								//Actualizar idtramite en sitv2online

								var dataSit= {
									"q": param,
									"idTramite": id_form_tra
								}
								$http({
									method: 'POST',
									url: CONFIG.SERVICE_SITOLextgen + 'Servicios/RegistrarIGOBActualizarIDtramite',
									data: Object.toparams(dataSit),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
								}).success(function (dataActTram, status, headers, config) {
									$.unblockUI();
									console.log("Actualizar tramite en sitol", dataActTram);

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
	}

	$scope.updateIGOB = function (idRegistro) {
		console.log("update Idregistro", idRegistro);
		var p = {
			idRegistro: idRegistro
		};
		$http({
			method: 'POST',
			url: CONFIG.SERVICE_SITOLextgen + 'Servicios/RegSitram',
			data: Object.toparams(p),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data, status, headers, config) {
			console.log("sitram res:",data);
			if(data.res == 'OK')
			{
				var idRegEnc = data.resultado;
				var matValue = data.valor.split('-');
				var idIgob =matValue[0];
				var sitramNro =matValue[1];
				var p1 = {q: idRegEnc};
				$http({
					method: 'POST',
					url: CONFIG.SERVICE_SITOLextgen + 'Servicios/RegistrarIGOBObtenerParam',
					data: Object.toparams(p1),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (dataParam, status, headers, config) {
					$.unblockUI();
					console.log("Obteniendo parametros igob", dataParam);
					if(dataParam.res){
						console.log("error crear en igob",dataParam);
						swal('', 'No se pudo obtener params para actualizar IGOB: ' + dataParam.valor, 'error');
						$.unblockUI();
					}
					else{
						var credentials= {
							"user": dataParam.igobCredentialsUser,
							"password": dataParam.igobCredentialsPwd
						}
						$http({
							method: 'POST',
							url: dataParam.igobCredentialsURL,
							data: Object.toparams(credentials),
							headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
						}).success(function (dataCre, status, headers, config) {
							$.unblockUI();
							console.log("Credentials igob", dataCre);
							/// igob upd
							var dataigobupd = {
								"codigo": dataParam.igobCodigo,
								"id_form_tra":idIgob,
								"codigo_tramite":sitramNro
							}
							$http({
								method: 'POST',
								url: dataParam.igobServActualizacionURL,
								data: Object.toparams(dataigobupd),
								headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + dataCre.token }
							}).success(function (dataRegIgob, status, headers, config) {
								$.unblockUI();
								console.log("Update en igob", dataRegIgob);
								if(dataRegIgob.success){

								}
								else{
									swal('', 'Error al actualizar trámite en IGOB' + JSON.stringify(dataRegIgob), 'error');
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
			}
			else
			{
				console.log("sitram no se pudo registrar",data);
			}
		}).error(function (data, status, headers, config) {
			$.unblockUI();
			sweet.show('', 'Error al registrar en sitram' + JSON.stringify(data), 'error');
			console.log("Error al registrar en sitram", data);
		});
	};

	/*********************************** Registro en IGOB - FIN *******************************************/
	
	//Revisar
	/*********************************** Registro en Integra *******************************************/
	/*
	$scope.ConfIntegra = {
		idServicio : 8, //1
		idProcodigo:'AE-RAJ',
		idTramite : 0
	};
	//Registro en igob
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
		var datosServicio   = new reglasnegocio();
		datosServicio.identificador = 'RCCIUDADANO_68';
		datosServicio.parametros = '{"frm_tra_dvser_id":"'+ sIdServicio +'","frm_tra_id_ciudadano":"'+ sIdCiudadano +'","frm_tra_fecha":"'+ sFechaTramite +'","frm_tra_enviado":"SI","frm_tra_id_usuario":"3"}';	
		$.blockUI();
		if($scope.idTipoPago == 1) {
			datosServicio.llamarregla(function(data){
				data = JSON.parse(data);
				$scope.ConfIntegra.idTramite = data.frm_tra_id;
				$('#divPopup4').modal('show');
				$scope.genProforma();
				$.unblockUI();
			});

		}else{
			$.unblockUI();
			$scope.datosServicioOnline = datosServicio;  
			$scope.razonSocialFac = sessionService.get('US_PATERNO');
			$scope.nitCiFac       = sessionService.get('CICIUDADANO');
			$('#divPopupPagoTarjeta').modal('show');
		}
		
	};
	//Genera proforma para pago en  banco
	$scope.genProforma = function(){
		$scope.Imp=false;
		if(	$scope.idMotivo==0 || $scope.idMotivoDetalle==0){
			$scope.RegistroFUM = {
				registrado:null,
				mensaje:'Debe seleccionar motivo y motivo detalle'
			};
		}
		else
		{
			//Registro FUM Inicio
			var p;
			if (tipoPersona == 'NATURAL') {
				p = {
					tipoDoc: 'CEDULA DE IDENTIDAD',
					nroDoc: aReg.cedula,
					expedido: aReg.expedido,
					nombres: aReg.nombre,
					paterno: aReg.paterno,
					materno: aReg.materno,
					casada: '',//adefinir por  integra
					fechanac: aReg.fecha_nacimiento,
					razonsocial: 'RSN',
					tkn:$scope.resultadoBusqueda.tkn,
					cc:$scope.resultadoBusqueda.codCat
				};
			}
			else{
				p = {
					tipoDoc: 'NIT',
					nroDoc: aReg.nit,
					expedido: aReg.expedido,//arreglar
					nombres: aReg.razonSocial,
					paterno: '',
					materno: '',
					casada: '',//adefinir por  integra
					fechanac: aReg.fecha_nacimiento,
					razonsocial: 'RSJ',
					tkn:$scope.resultadoBusqueda.tkn,
					cc:$scope.resultadoBusqueda.codCat
				};
			}
			$http({
				method: 'POST',
				url: CONFIG.SERVICE_SITOLext + 'RegFUM',
				data: Object.toparams(p),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function (data, status, headers, config) {
				if(data.res == 'OK')
				{
					//Registro tramite - Inicio
					var fumb = data.fum;
					var fumc = data.msg;
					var ccb = $scope.resultadoBusqueda.codCat;

					var xTipoTra=$scope.NuevoTipoSolicitud==1?"DUPLICADO_NUEVO":"DUPLICADO";
					var xIdCiudadano = "0";
					var xOIDCiudadano = sessionService.get('IDUSUARIO');
					var xApellidos = aReg.paterno + ' ' + aReg.materno;
					var xNombres= aReg.nombre;
					var xNumeroDocumento=aReg.cedula;
					var xExpedido = aReg.expedido;
					var xTipoDocumento = "CI";
					var xFUM=fumb;
					var xIdMotivo=$scope.idMotivo;
					var xIdMotivoDetalle=$scope.idMotivoDetalle;
					var xCodigoCatastral=ccb;
					var xNumInmueble="0";
					var xNumCertificado="0";
					var xfumEnc=fumc;
					var xidTipoPago=$scope.idTipoPago;
					var xcodPago="0";
					var xaccion="A";
					if (tipoPersona != 'NATURAL') {
						xApellidos=aReg.razonSocial;
						xNombres=aReg.razonSocial;
						xNumeroDocumento=aReg.nit;
						xExpedido=aReg.expedido;
						xTipoDocumento="NIT";
					}
					var regFum = new dataSITOL();
					regFum.dplRegFum( xTipoTra,xIdCiudadano,xOIDCiudadano,xApellidos,xNombres,xNumeroDocumento,xExpedido,xTipoDocumento,xFUM,xIdMotivo,xIdMotivoDetalle,xCodigoCatastral,xNumInmueble,xNumCertificado,xfumEnc,xidTipoPago,xcodPago,xaccion, function(resultado){ //xtipoPago,xcodPago,
						var resApi = JSON.parse(resultado);
						if(resApi.success)
						{
							$scope.CargarSolicitudesCiudadano();
							$scope.idMotivo=0;
							$scope.idMotivoDetalle=0;
							$scope.RegistroFUM={
								registrado:'OK',
								mensaje:'Señor usuario, debe imprimir esta Proforma de Pago y apersonarse a cualquier entidad financiera autorizada en los siguientes 7 días calendario.'
							};
							var urlFum2 = CONFIG.SERVICE_SITOLext + 'DesplegarFum?q=' + fumc;
							//$( "object").css('display', 'none');
							//$( "object").attr('data',  urlFum2).css('display', '');
							$('#visorFum object').attr("data",urlFum2);
							$('#visorFum object').load(urlFum2);

							//Registrando en integra
							var di={};
							if (tipoPersona != 'NATURAL') {
								di = {
									TipoTra: "DUPLICADO",
									OIDCiudadano: sessionService.get('IDUSUARIO'),
									Apellidos:aReg.razonSocial,
									Nombres: aReg.razonSocial,
									NumeroDocumento: aReg.nit,
									Expedido: aReg.expedido,
									TipoDocumento: "NIT",
									FUM: fumb,
									IdMotivo: $scope.idMotivo,
									IdMotivoDetalle: $scope.idMotivoDetalle,
									CodigoCatastral: ccb
								};
							}
							else{
								di = {
									TipoTra: "DUPLICADO",
									OIDCiudadano: sessionService.get('IDUSUARIO'),
									Apellidos: aReg.paterno + ' ' + aReg.materno,
									Nombres: aReg.nombre,
									NumeroDocumento: aReg.cedula,
									Expedido: aReg.expedido,
									TipoDocumento: "CI",
									FUM: fumb,
									IdMotivo: $scope.idMotivo,
									IdMotivoDetalle: $scope.idMotivoDetalle,
									CodigoCatastral: ccb
								};
							}

							$scope.UpdateIntegra(di);

						}
						else
						{
							sweet.show('', 'Error al registrar proforma', 'error');
							console.log("Error al registrar proforma", resApi.error.message);

							$scope.idMotivoDetalle =0;
							$scope.idMotivo =0;
							$scope.RegistroFUM={
								registrado:null,
								mensaje:'Surgió un error al registrar la solicitud, por favor vuelva a intentar'
							};
						}
					});

					$scope.proforma=false;
					$scope.resultadoBusqueda={};
				}
				else
				{
					$scope.idMotivoDetalle =0;
					$scope.idMotivo =0;
					$scope.RegistroFUM = {
						registrado:null,
						mensaje:'Surgió un error al registrar la proforma de pago, por favor vuelva a intentar'
					};
				}
			}).error(function (data, status, headers, config) {
				sweet.show('', 'Error al registrar proforma de pago', 'error');
				console.log("Error registro fum SIT ext, datos devueltos:", data);
			});
		}
	};

	//Genera proforma para pago en  linea
	$scope.genProformaPagoOL = function(){
		
		$scope.Imp=false;
		if(	$scope.idMotivo==0 || $scope.idMotivoDetalle==0){
			$scope.RegistroFUM = {
				registrado:null,
				mensaje:'Debe seleccionar motivo y motivo detalle'
			};
		}
		else
		{
			//Registro FUM Inicio
			var p;
			if (tipoPersona == 'NATURAL') {
				p = {
					tipoDoc: 'CEDULA DE IDENTIDAD',
					nroDoc: aReg.cedula,
					expedido: aReg.expedido,
					nombres: aReg.nombre,
					paterno: aReg.paterno,
					materno: aReg.materno,
					casada: '',//adefinir por  integra
					fechanac: aReg.fecha_nacimiento,
					razonsocial: 'RSN',
					tkn:$scope.resultadoBusqueda.tkn,
					cc:$scope.resultadoBusqueda.codCat
				};
			}
			else{
				p = {
					tipoDoc: 'NIT',
					nroDoc: aReg.nit,
					expedido: aReg.expedido,//arreglar
					nombres: aReg.razonSocial,
					paterno: '',
					materno: '',
					casada: '',//adefinir por  integra
					fechanac: aReg.fecha_nacimiento,
					razonsocial: 'RSJ',
					tkn:$scope.resultadoBusqueda.tkn,
					cc:$scope.resultadoBusqueda.codCat
				};
			}
			$http({
				method: 'POST',
				url: CONFIG.SERVICE_SITOLext + 'RegFUM',
				data: Object.toparams(p),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function (data, status, headers, config) {
				if(data.res == 'OK')
				{
					//Registro tramite - Inicio
					var fumb = data.fum;
					var fumc = data.msg;
					var ccb = $scope.resultadoBusqueda.codCat;

					var xTipoTra=$scope.NuevoTipoSolicitud==1?"DUPLICADO_NUEVO":"DUPLICADO";
					var xIdCiudadano = "0";
					var xOIDCiudadano = sessionService.get('IDUSUARIO');
					var xApellidos = aReg.paterno + ' ' + aReg.materno;
					var xNombres= aReg.nombre;
					var xNumeroDocumento=aReg.cedula;
					var xExpedido = aReg.expedido;
					var xTipoDocumento = "CI";
					var xFUM=fumb;
					var xIdMotivo=$scope.idMotivo;
					var xIdMotivoDetalle=$scope.idMotivoDetalle;
					var xCodigoCatastral=ccb;
					var xNumInmueble="0";
					var xNumCertificado="0";
					var xfumEnc=fumc;
					var xidTipoPago=$scope.idTipoPago;
					var xcodPago="0";
					var xaccion="A";
					if (tipoPersona != 'NATURAL') {
						xApellidos=aReg.razonSocial;
						xNombres=aReg.razonSocial;
						xNumeroDocumento=aReg.nit;
						xExpedido=aReg.expedido;
						xTipoDocumento="NIT";
					}

					var regFum = new dataSITOL();
					regFum.dplRegFum( xTipoTra,xIdCiudadano,xOIDCiudadano,xApellidos,xNombres,xNumeroDocumento,xExpedido,xTipoDocumento,xFUM,xIdMotivo,xIdMotivoDetalle,xCodigoCatastral,xNumInmueble,xNumCertificado,xfumEnc,xidTipoPago,xcodPago,xaccion, function(resultado){
						var resApi = JSON.parse(resultado);
						if(resApi.success)
						{							
							$scope.idMotivo=0;
							$scope.idMotivoDetalle=0;
							$scope.RegistroFUM={
								registrado:'OK',
								mensaje:'Señor usuario, debe imprimir esta Proforma de Pago y apersonarse a cualquier entidad financiera autorizada en los siguientes 7 días calendario.'
							};
							var di={};
							if (tipoPersona != 'NATURAL') {
								di = {
									TipoTra: "DUPLICADO",
									OIDCiudadano: sessionService.get('IDUSUARIO'),
									Apellidos:aReg.razonSocial,
									Nombres: aReg.razonSocial,
									NumeroDocumento: aReg.nit,
									Expedido: aReg.expedido,
									TipoDocumento: "NIT",
									FUM: fumb,
									IdMotivo: $scope.idMotivo,
									IdMotivoDetalle: $scope.idMotivoDetalle,
									CodigoCatastral: ccb,
									RegistroTramite: resApi.success.dataSql[0].idRegistro
								};
							}
							else{
								di = {
									TipoTra: "DUPLICADO",
									OIDCiudadano: sessionService.get('IDUSUARIO'),
									Apellidos: aReg.paterno + ' ' + aReg.materno,
									Nombres: aReg.nombre,
									NumeroDocumento: aReg.cedula,
									Expedido: aReg.expedido,
									TipoDocumento: "CI",
									FUM: fumb,
									IdMotivo: $scope.idMotivo,
									IdMotivoDetalle: $scope.idMotivoDetalle,
									CodigoCatastral: ccb,
									RegistroTramite: resApi.success.dataSql[0].idRegistro
								};
							}
							//* Revisar funcion 
							//$scope.UpdateIntegra(di);
							sessionService.set('IDFUM', fumb);
							$scope.obtenerFumDatos(di);
							//window.location.href = "#servicios|epagos";
						}
						else
						{
							sweet.show('', 'Error al registrar proforma de pago', 'error');
							console.log("Error al registrar proforma de pago", resApi.error.message);
						
							$scope.idMotivoDetalle =0;
							$scope.idMotivo =0;
							$scope.RegistroFUM={
								registrado:null,
								mensaje:'Surgió un error al registrar la solicitud, por favor vuelva a intentar'
							};
						}
					});

					$scope.proforma=false;
					$scope.resultadoBusqueda={};
				}
				else
				{
					$scope.idMotivoDetalle =0;
					$scope.idMotivo =0;
					$scope.RegistroFUM = {
						registrado:null,
						mensaje:'Surgió un error al registrar la proforma de pago, por favor vuelva a intentar'
					};
				}
			}).error(function (data, status, headers, config) {
				sweet.show('', 'Error al registrar proforma de pago', 'error');
				console.log("Error registro fum SIT ext, datos devueltos:", data);
			});
			//Registro Fum - Fin
		}
	};	

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

	$scope.AddIF = function(paramForm){
		var idProcodigo = $scope.ConfIntegra.idProcodigo;
		var datosSerializados = JSON.stringify(paramForm);
		var serIF = new gCrearCaso();
		serIF.usr_id=1;
		serIF.datos=datosSerializados;
		serIF.procodigo=$scope.ConfIntegra.idProcodigo;
		serIF.crearCasoAeLinea( function(resultado)
		{
			console.log("addif res",resultado);
			$.unblockUI();
		});
	};
	 */



	var motivo1={};
    monthNames = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];

	//Inicio configuracion pago en linea
	$scope.loginPagoEnLinea   =   function(){
		var formData = {
			'usr_usuario'   : 'tecnico',
			'usr_clave'     :   '123456'
		};
		$.ajax({
			dataType: "json",
			type: "POST",
			url : CONFIG.CONEXION_PAGOS + 'api/logueo',
			data: formData,
			async: false,
			success: function(response) {
				sessionService.set('TOKEN', response.token);
			},
			error: function (response, status, error) {
				dataResp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
				console.log("Error login pago en linea", response);
			}
		});
	};
	$scope.continuarPagoOL = function(dataFUMGEN){
		
		sessionService.set('IDFUM', dataFUMGEN.FUM);
		var idtoken =   sessionService.get('TOKEN');
		var stoquen =  'Bearer ' + idtoken;		
		var formData = {
		'idfum'	: dataFUMGEN.FUM
		};	
		var importantStuff1 = window.open('../../../loadingPagosGAMLP.html', '_blank','width=800,height=800,toolbar=no,menubar=no,location=0');	
		$.blockUI();		
		$.ajax({
			type        : 'POST',            
			url         : CONFIG.CONEXION_PAGOS + 'api/datosContribuyente',
			data        : formData,
			crossDomain : true,
			async:false,
			headers: {
				'authorization': stoquen
			},
			success     : function(data) {
				var msg   =   data;
				if (typeof msg.error === 'undefined') {
					data = JSON.parse(data[0]);
					$scope.objPagos = new datahtml();
					$scope.objPagos.odm       = data.idFum;
					$scope.objPagos.total     = data.AcctotalGeneral; 
					$scope.objPagos.nombres   = dataFUMGEN.Nombres;
					$scope.objPagos.apellidos = dataFUMGEN.Apellidos;
					$scope.objPagos.direccion = data.zona + " " +data.nombreVia + " Nro. " + data.numeroPuerta;
					$scope.objPagos.email     = aReg.correo;
					$scope.objPagos.celular   = aReg.celular;
					$scope.objPagos.sistema    = "IGOB";
					$scope.objPagos.ci_nit    = dataFUMGEN.NumeroDocumento;
					$scope.objPagos.oid_ciudadano = dataFUMGEN.OIDCiudadano;
					$scope.objPagos.sucursal_facturacion = 170;
					$scope.objPagos.id_usuario_facturacion = 0;
					$scope.objPagos.servicio = "CATASTRO";
					$scope.objPagos.usuario_fac = "ciudadano.igob";
					$scope.objPagos.clave_fac = "c1ud4d4n0iGob";					
					$scope.objPagos.data_opcional = [{
						"registroTramite": dataFUMGEN.IdRegistro}];
					$scope.objPagos.items = [{
							"concepto": data.descripcion,
							"cantidad": 1,
							"monto": data.AcctotalGeneral,
							"item_genesis":data.idItemRecaudador,
							"item_recaudador":0
						}
					];
					$scope.objPagos.nit_factura    = dataFUMGEN.NumeroDocumento;
					$scope.objPagos.nombre_factura = dataFUMGEN.Apellidos;
					$scope.objPagos.generacionHtml(function(resp){
						$.unblockUI();
						setTimeout(function()
						{
							resp = JSON.parse(JSON.parse(resp));
							var respURLPagos = CONFIG.CONEXION_PAGOS;
							importantStuff1.location.href = respURLPagos + resp.formulario;
						},2000);
						setTimeout(function()
						{	
							$scope.CargarSolicitudesCiudadano();																												
						},40000);
					});					
				} else {
					sweet.show('', 'Proforma pagada !!', 'error');                   
				} 
			},
			error: function (xhr, status, error) {
				$.unblockUI();
				alert("Error Intente de nuevo !!");
			}
		});		
	};

	function MouseWheelHandler(e) {
		var e = window.event || e; // old IE support
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		return false;
	}

	
	/*
	 * Catastro Duplicado visualizar imagen
	 */


	$scope.ImprimirProforma = function (fum) {
		$scope.varSpin = true;
		$scope.RegistroFUM={
			registrado:'OK',
			mensaje:''
		};
		var urlFum = CONFIG.SERVICE_SITOLext + 'DesplegarFum?q=' + fum;
		$('#visorFum object').attr("data",urlFum);
		$('#visorFum object').load(urlFum);
		$timeout(function(){$scope.varSpin=false}, 1000);
	};

	//////////////


	$scope.impDpl= function (elementId) {
		document.getElementById(elementId).focus();
		document.getElementById(elementId).contentWindow.print();
	};
	$scope.ImprimirDpl = function (aa) {
		var url2 = CONFIG.SERVICE_SITOLext + 'DesplegarDuplicado?a=' + aa;
		$('#visorDuplicado object').attr("data",url2);
	};
	$scope.PrevCert = function () {

	};

	$scope.ConfimarcionCiudadano=function () {
		$scope.confirmacionCiudadano = 'OK';
	};
    

	/*
	 $scope.CargarPopupBuscador=function ()
	 {
	 $scope.codigoCatastral={};
	 $scope.resultadoBusqueda = {};
	 $scope.confirmacionCiudadano = null;
	 $scope.observacion.codigoCatastral='';
	 $scope.observacion.obs='';
	 $scope.cerrarProforma();
	 $scope.getCaptchasX();
	 };
    // ******INICIO DE CAPCHA****************
	$scope.ErrorCapcha='';
	$scope.getlimpiareRROR=function(){
		$scope.ErrorCapcha='';
	};
    $scope.getCaptchasX=function(){
		var objCaptcha = new captcha();
		objCaptcha.obtcaptcha(function(resultado){
			json = JSON.parse(resultado);
			partes = json.success[0].sp_captcha_porx1.split(',');
			numero = partes[0].substring(1);
			i1=(partes[2]+ "," + partes[3]);
			i2=(partes[4] + "," + partes[5]);
			document.getElementById('img2').src = i1.substring(1, i1.length - 1);
			document.getElementById('img1').src = i2.substring(1, i2.length - 2);
			var lengua = "";
			if(partes[1] == 'A') {
				lengua = 'AYMARA';
			} else if(partes[1] == 'Q') {
				lengua = 'QUECHUA';
			} else if(partes[1] == 'G'){
				lengua = 'GUARANI';
			} else if(partes[1] == 'C'){
				lengua = 'CASTELLANO';
			} else {
				console.log("Error en get CaptchaX", partes[1]);
			}
			document.getElementById('img1').title = "Palabra en " + lengua;
			document.getElementById('resultadoC').value = "";
			document.getElementById('resultadoC').placeholder = "Ingrese texto: " + lengua + " CASTELLANO";
			document.getElementById('lbllengua').placeholder = "Ingrese texto: " + lengua + " CASTELLANO";
		});
    };
	
    $scope.VerificarCapcha = function(codigoCatastral){
		// var captch  = $("#resultadoC").val();
		// var id = numero;
		// var verCaptcha = new captcha();
		// verCaptcha.identificador = id;
		// verCaptcha.respuesta = captch;
		// verCaptcha.verificarCaptcha(function(resultado){
		// 	json = JSON.parse(resultado);
		// 	if(json.success[0] == undefined){
		// 		$scope.getCaptchasX();
		// 		$scope.codigoCatastral={};
		// 		$scope.resultadoC="";
		// 		//sweet.show('Capcha incorrecto','', 'error');
		// 		$scope.ErrorCapcha='Vuelva registrar el capcha';
		// 	}else{
		// 		$('#divPopup').modal('hide');
		// 		$('#divPopup7').modal('show');
		// 		$scope.BuscarCertificado(codigoCatastral);
		// 	}
		// });

        $('#divPopup').modal('hide');
        $('#divPopup7').modal('show');
        $scope.BuscarCertificado(codigoCatastral);
    };
    
    // ******FIN DE CAPCHA****************
	*/
	

 	/********************************************************************************************/

 	/********************************************************************************************/


	/* Se comento recien
    $scope.$on('api:ready',function(){
		$scope.loginPagoEnLinea();
		$scope.recuperarDatosRegistro();
		$scope.CargarComboMotivos();
		$scope.CargarComboMotivosDetalle();
		$scope.CargarSolicitudesCiudadano();
		$scope.registro3 = aReg;
		console.log("entra al api ready")
    });
	*/

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

	/* PAGOS EN LINEA 2021 */
	$scope.dataFactura = false;	
	$scope.controlDataFac	  = function(valor) {		
		if(!$scope.dataFactura){
			$scope.dataFactura = true;
		}else{
			$scope.dataFactura = false;
		}
	}
	$scope.SpinFactura = false;
	$scope.pagarDuplicado = function(){				
		if (typeof $scope.dataFAC === 'undefined') {
			$scope.razonSocialFac = sessionService.get('US_PATERNO');
			$scope.nitCiFac       = sessionService.get('CICIUDADANO');
		}else{
			if ($scope.dataFAC.checkFac) {
				$scope.razonSocialFac = $scope.dataFAC.razonSocial; 
				$scope.nitCiFac = $scope.dataFAC.nitCi;
			}else{
				$scope.razonSocialFac = sessionService.get('US_PATERNO');
				$scope.nitCiFac       = sessionService.get('CICIUDADANO');
			}
		}
		var p;
		if (tipoPersona == 'NATURAL') {
			p = {
				tipoDoc: 'CEDULA DE IDENTIDAD',
				nroDoc: aReg.cedula,
				expedido: aReg.expedido,
				nombres: aReg.nombre,
				paterno: aReg.paterno,
				materno: aReg.materno,
				casada: '',//adefinir por  integra
				fechanac: aReg.fecha_nacimiento,
				razonsocial: 'RSN',
				tkn:$scope.resultadoBusqueda.tkn,
				cc:$scope.resultadoBusqueda.codCat
			};
		}
		else{
			p = {
				tipoDoc: 'NIT',
				nroDoc: aReg.nit,
				expedido: aReg.expedido,//arreglar
				nombres: aReg.razonSocial,
				paterno: '',
				materno: '',
				casada: '',//adefinir por  integra
				fechanac: aReg.fecha_nacimiento,
				razonsocial: 'RSJ',
				tkn:$scope.resultadoBusqueda.tkn,
				cc:$scope.resultadoBusqueda.codCat
			};
		}
		$http({
			method: 'POST',
			url: CONFIG.SERVICE_SITOLext + 'RegFUM',
			data: Object.toparams(p),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function (data, status, headers, config) {
			console.log("RegFUM res:",data);
			if(data.res == 'OK')
			{
				//Registro tramite - Inicio
				var fumb = data.fum;
				var fumc = data.msg;
				var ccb = $scope.resultadoBusqueda.codCat;

				var xTipoTra=$scope.NuevoTipoSolicitud==1?"DUPLICADO_NUEVO":"DUPLICADO";
				var xIdCiudadano = "0";
				var xOIDCiudadano = sessionService.get('IDUSUARIO');
				var xApellidos = aReg.paterno + ' ' + aReg.materno;
				var xNombres= aReg.nombre;
				var xNumeroDocumento=aReg.cedula;
				var xExpedido = aReg.expedido;
				var xTipoDocumento = "CI";
				var xFUM=fumb;
				var xIdMotivo=$scope.idMotivo;
				var xIdMotivoDetalle=$scope.idMotivoDetalle;
				var xCodigoCatastral=ccb;
				var xNumInmueble="0";
				var xNumCertificado="0";
				var xfumEnc=fumc;
				var xidTipoPago=$scope.idTipoPago;
				var xcodPago="0";
				var xaccion="A";
				if (tipoPersona != 'NATURAL') {
					xApellidos=aReg.razonSocial;
					xNombres=aReg.razonSocial;
					xNumeroDocumento=aReg.nit;
					xExpedido=aReg.expedido;
					xTipoDocumento="NIT";
				}
				var regFum = new dataSITOL();
				regFum.dplRegFum( xTipoTra,xIdCiudadano,xOIDCiudadano,xApellidos,xNombres,xNumeroDocumento,xExpedido,xTipoDocumento,xFUM,xIdMotivo,xIdMotivoDetalle,xCodigoCatastral,xNumInmueble,xNumCertificado,xfumEnc,xidTipoPago,xcodPago,xaccion, function(resultado){ //xtipoPago,xcodPago,
					$.unblockUI();
					var resApi = JSON.parse(resultado);
					console.log("Registro solicitud",resApi);
					if(resApi.success)
					{
						$scope.RegistroFUM={
							registrado:'OK',
							mensaje:'Señor usuario, debe imprimir esta Proforma de Pago y apersonarse a cualquier entidad financiera autorizada en los siguientes 7 días calendario.'
						};
						try{
							$scope.registrarIGOB(resApi.success.dataSql[0].idRegEnc);
							var di={};
							if (tipoPersona != 'NATURAL') {
								di = {
									TipoTra: "DUPLICADO",
									OIDCiudadano: sessionService.get('IDUSUARIO'),
									Apellidos:aReg.razonSocial,
									Nombres: aReg.razonSocial,
									NumeroDocumento: aReg.nit,
									Expedido: aReg.expedido,
									TipoDocumento: "NIT",
									FUM: fumb,
									IdMotivo: $scope.idMotivo,
									IdMotivoDetalle: $scope.idMotivoDetalle,
									CodigoCatastral: ccb,
									RegistroTramite: resApi.success.dataSql[0].idRegistro
								};
							}
							else{
								di = {
									TipoTra: "DUPLICADO",
									OIDCiudadano: sessionService.get('IDUSUARIO'),
									Apellidos: aReg.paterno + ' ' + aReg.materno,
									Nombres: aReg.nombre,
									NumeroDocumento: aReg.cedula,
									Expedido: aReg.expedido,
									TipoDocumento: "CI",
									FUM: fumb,
									IdMotivo: $scope.idMotivo,
									IdMotivoDetalle: $scope.idMotivoDetalle,
									CodigoCatastral: ccb,
									RegistroTramite: resApi.success.dataSql[0].idRegistro
								};
							}
							sessionService.set('IDFUM', fumb);
							$scope.loginPagoEnLinea();

							var dataFUMGEN = di;

							$scope.SpinFactura = true;
							var idfum   =   sessionService.get('IDFUM');
							var idtoken =   sessionService.get('TOKEN');
							var stoquen =  'Bearer ' + idtoken;
							
							var formData = {
							'idfum'	: idfum
							};							
							var importantStuff = window.open('../../../loadingPagosGAMLP.html', '_blank','width=800,height=800,toolbar=no,menubar=no,location=0');
							$.blockUI();							
							$.ajax({
								type        : 'POST',            
								url         : CONFIG.CONEXION_PAGOS + 'api/datosContribuyente',
								data        : formData,
								crossDomain : true,
								async:false,
								headers: {
									'authorization': stoquen
								},
								success     : function(data) {
									var msg   =   data;
									if (typeof msg.error === 'undefined') {
										
										data = JSON.parse(data[0]);
										$scope.objPagos = new datahtml();
										$scope.objPagos.odm       = data.idFum;
										$scope.objPagos.total     = data.AcctotalGeneral; 
										$scope.objPagos.nombres   = dataFUMGEN.Nombres;
										$scope.objPagos.apellidos = dataFUMGEN.Apellidos;
										$scope.objPagos.direccion = data.zona + " " +data.nombreVia + " Nro. " + data.numeroPuerta;
										$scope.objPagos.email     = aReg.correo;
										$scope.objPagos.celular   = aReg.celular;
										$scope.objPagos.sistema    = "IGOB";
										$scope.objPagos.ci_nit    = dataFUMGEN.NumeroDocumento;
										$scope.objPagos.oid_ciudadano = dataFUMGEN.OIDCiudadano;
										$scope.objPagos.sucursal_facturacion = 170;
										$scope.objPagos.id_usuario_facturacion = 0;
										$scope.objPagos.servicio = "CATASTRO";
										$scope.objPagos.usuario_fac = "ciudadano.igob";
										$scope.objPagos.clave_fac = "c1ud4d4n0iGob";										
										$scope.objPagos.data_opcional = [{
											"registroTramite": dataFUMGEN.RegistroTramite}];
										$scope.objPagos.items = [{
												"concepto": data.descripcion,
												"cantidad": 1,
												"monto": data.AcctotalGeneral,
												"item_genesis":data.idItemRecaudador,
												"item_recaudador":0
											}
										];
										$scope.objPagos.nit_factura    = $scope.nitCiFac;
										$scope.objPagos.nombre_factura = $scope.razonSocialFac;
										$scope.objPagos.generacionHtml(function(resp){
											$.unblockUI();
											setTimeout(function()
											{
												resp = JSON.parse(JSON.parse(resp));
												$scope.$apply();
												var respURLPagos = CONFIG.CONEXION_PAGOS;												
												$('#divPopupPagoTarjeta').modal('hide');
												$scope.SpinFactura = false;													
												importantStuff.location.href = respURLPagos + resp.formulario;
											},3000);

											setTimeout(function()
											{	
												$scope.CargarSolicitudesCiudadano();																												
											},40000);											
										});
										
									} else {
										sweet.show('', 'Proforma pagada !!', 'error');                   
									} 
								},
								error: function (xhr, status, error) {
									$.unblockUI();
									alert("Error Intente de nuevo !!");
								}
							});							 													
							$.unblockUI();

						}catch(e)
						{
							console.log("error al registrar en igob", e);
						}

						$scope.idMotivo=0;
						$scope.idMotivoDetalle=0;

						
					}
					else
					{
						sweet.show('', 'Error al registrar proforma de pago', 'error');
						console.log("Error al registrar proforma de pago", resApi.error.message);

						$scope.idMotivoDetalle =0;
						$scope.idMotivo =0;
						$scope.RegistroFUM={
							registrado:null,
							mensaje:'Surgió un error al registrar la solicitud, por favor vuelva a intentar'
						};
					}
				});

				$scope.proforma=false;
				$scope.resultadoBusqueda={};
			}
			else
			{
				$.unblockUI();
				$scope.idMotivoDetalle =0;
				$scope.idMotivo =0;
				$scope.RegistroFUM = {
					registrado:null,
					mensaje:'Surgió un error al registrar la proforma de pago, por favor vuelva a intentar'
				};
			}
		}).error(function (data, status, headers, config) {
			$.unblockUI();
			sweet.show('', 'Error al registrar proforma de pago', 'error');
			console.log("Error registro fum SIT ext, datos devueltos:", data);
		});

		$.blockUI();			

	}
	$scope.mostrarFactura = function (datosFac) {		
		$.blockUI();
		$scope.objFactura = new datafactura();
		$scope.objFactura.operacion = "login";
		$scope.objFactura.usr_usuario = "ciudadano.igob";
		$scope.objFactura.usr_clave = "c1ud4d4n0iGob";
		$scope.objFactura.dataFactura(function(resp){
			$.unblockUI();
			resp = JSON.parse(JSON.parse(resp));
			$scope.objFacturaPdf = new datafactura();
			$scope.objFacturaPdf.operacion = "getFacturaBase64";
			$scope.objFacturaPdf.tokenFactura = resp.dataResp.token;
			$scope.objFacturaPdf.idSucursal = "170";
			$scope.objFacturaPdf.codigo = datosFac.FUM+"PO-DC";
			$scope.objFacturaPdf.dataFactura(function(respPDF){
				respPDF = JSON.parse(JSON.parse(respPDF));
				$('#divPopupfactura').modal('show');
				$scope.cerFactura = respPDF.dataResp.resp.facBase64;
				$scope.resultFactura = "data:application/pdf;base64,"+$scope.cerFactura;
				$.unblockUI();
			});
		});								
	}
}