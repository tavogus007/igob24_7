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

function DuplicadosController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService,CONFIG, LogGuardarInfo, $element, sweet, ngTableParams, $filter, registroLog, filterFilter,FileUploader, fileUpload, obtFechaActual,wsRgistrarPubliciadad,$timeout,$window) 
{
	$scope.tablaSolicitudes   = {};
	$scope.solicitudesUsuario = [];
	$scope.RegistroFUM={
		registrado:null,
		mensaje:null
	};
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
	$scope.ConfIntegra = {
		idServicio : 8, //1
		idProcodigo:'AE-RAJ',
		idTramite : 0
	};
	$scope.varSpin = false;
	var aReg = { "cedula": "","complemento": "","celular":"","correo":"","direccion":"","estado_civil":"",
		"fecha_nacimiento":"","materno":"","nombre":"","ocupacion":"","paterno":"","sexo":"","telefono":"",
		"cedula2": "","nit2": "","complemento2": "","repLegal": "","nroDocumento": "","nroNotaria": "",
		"nit": "","razonSocial": "","tipoP": "","cestcivil_id": "","expedido":""};
	var motivo1={};
    monthNames = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];
    $scope.diasImpresion=60;
	$scope.NuevoTipoSolicitud=0;
	/*$scope.inicioSolicitudes = function () 
	{
		//if (DreamFactory.isReady()) {
			$scope.loginPagoEnLinea();
			$scope.recuperarDatosRegistro();
			$scope.CargarComboMotivos();
			$scope.CargarComboMotivosDetalle();
			$scope.lstCC();
			$scope.registro3 = aReg;
			$scope.solicitudesCiudadano();
		//}
	};*/

    $scope.inicioSolicitudes = function () 
    { 
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
        		//if (DreamFactory.isReady()) {
				$scope.loginPagoEnLinea();
				$scope.recuperarDatosRegistro();
				$scope.CargarComboMotivos();
				$scope.CargarComboMotivosDetalle();
				$scope.lstCC();
				$scope.registro3 = aReg;
				$scope.solicitudesCiudadano();
				//$('#divPopup2').modal('show');
				//}
        	}catch(e)
	        {
	            console.log("error", e);
	        }
         },500);
    };




	//Inicio
	$scope.loginPagoEnLinea   =   function(){
		var formData = {
			'usr_usuario'   : 'tecnico',
			'usr_clave'     :   '123456'
		};
		$.ajax({
			dataType: "json",
			type: "POST",
			url : 'https://pagonline.lapaz.bo/api/logueo',
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

	$scope.vdplepago = function(objFum){
		var idFum = objFum.FUM;
		var formData = {
			'idfum':idFum
		};
		var idtoken =   sessionService.get('TOKEN');
		var stoquen =  'Bearer <\\\"' + idtoken + '\\\">';
		$.ajax({
			"async": true,
			type        : 'POST',
			url         : 'https://pagonline.lapaz.bo/api/comprobantedepago',
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
				$scope.lstSolUnico();
			}
		}).error(function (data, status, headers, config) {
			sweet.show('', 'Error al gen dpl', 'error');
			console.log("Error en la funcion vgDpl",data)
		});
	};

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

	$scope.continuarPagoOL = function(sol)
	{
		sessionService.set('IDFUM', sol.FUM);
		window.location.href = "#servicios|epagos";
	};

	$scope.solicitudesCiudadano = function(){
		//$.blockUI();
		//$('#divPopup2').modal('show');
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

	$scope.tablaSolicitudes = new ngTableParams({
		page: 1,
		count: 4,
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
	//$scope.mot={}; //DEPURAR
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
	$scope.recuperarDatosRegistro = function(){
		var datosCiudadano=new rcNatural();
		datosCiudadano.oid=sessionService.get('IDCIUDADANO');
		datosCiudadano.datosCiudadanoNatural(function(resultado){
			var response = JSON.parse(resultado);
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

	$scope.lstCC = function () {
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

	//Verificacines
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

	function MouseWheelHandler(e) {
		var e = window.event || e; // old IE support
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		return false;
	}
	//Buscador Inicio
	$scope.codigoCatastral={
		distrito:null,
		manzana:null,
		predio:null,
		subpredio:null
	};
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
	/*
	 * Catastro Duplicado visualizar imagen
	 */
	$scope.BuscarCertificado = function (codcat) 
	{
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
	// Buscador Fin

	//Observaciones
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

	$scope.ImprimirProforma = function (fum) {
		$scope.varSpin = true;
		$scope.RegistroFUM={
			registrado:'OK',
			mensaje:''
		};
		var urlFum = CONFIG.SERVICE_SITOLext + 'DesplegarFum?q=' + fum;
		$('#visorFum object').attr("data",urlFum);
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
							$scope.solicitudesCiudadano();
							$scope.idMotivo=0;
							$scope.idMotivoDetalle=0;
							$scope.RegistroFUM={
								registrado:'OK',
								mensaje:'Señor usuario, debe imprimir esta Proforma de Pago y apersonarse a cualquier entidad financiera autorizada en los siguientes 7 días calendario.'
							};
							var urlFum2 = CONFIG.SERVICE_SITOLext + 'DesplegarFum?q=' + fumc;
							$( "object").css('display', 'none');
							$( "object").attr('data',  urlFum2).css('display', '');

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
							$scope.solicitudesCiudadano();
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
							sessionService.set('IDFUM', fumb);
							window.location.href = "#servicios|epagos";
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

    $scope.$on('api:ready',function(){
		$scope.loginPagoEnLinea();
		$scope.recuperarDatosRegistro();
		$scope.CargarComboMotivos();
		$scope.CargarComboMotivosDetalle();
		$scope.solicitudesCiudadano();
		$scope.registro3 = aReg;

    });

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
