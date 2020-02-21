sessionStorage.setItem("Idioma","C");var idioma=sessionStorage.getItem("Idioma");
function MM_swapImgRestore() { 
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { 
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_findObj(n, d) { 
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_swapImage() { 
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
window.onload = function() {
$('.theme-config_icon_5').css('top','195px'); 
};

	var numero = "";
	var captchaerror=""; 
	var tiemporespuesta = null;
	var ErrorCapchasXX  = "";
	var SuccesCapchasxx = "";
	var habGuardar1 = ""; 
	function resetPassword() {    
		var captch  = $("#resultadoC").val();
		var id = numero;
		var verCaptcha = new captcha();
		verCaptcha.identificador = id;
		verCaptcha.respuesta = captch;
		verCaptcha.verificarCaptcha(function(resultado) {
			json = JSON.parse(resultado);
			if(json.success[0] == undefined) {
				sweetAlert("", "Error en el captcha intentar de nuevo por favor", "warning");
				obtCaptha();
			} else {
				subirimagen();
			}
		});
	}
	function subirimagen() {  
		if($("#prueba2").val() != "") {
			formData = '{ "oid": "57798c372f59181eb279fe5f",       "imagen": "'+urlImagen+'",     "ci": "10000000",         "nombre": "denuncia"   }';
			$.ajax({
				type        : 'POST',
				url         : 'http://192.168.5.141/dreamfactory/igob/igob247imagenes.php', 
				data        : formData,
				headers: {
				'Content-type': 'application/json'
				},
				success: function(data) { 
				var urlDenuncias = data;
				guardarDatos2(urlDenuncias);      
				},   
			});  
		} else { 
			var urlDenuncias = " "; 
			guardarDatos2(urlDenuncias);   
		} 
	}
	function resetPasswordC() {    
		console.log(222);
		var captch  = $("#resultadoD").val();
		var id = numeroC;
		var verCaptcha = new captcha();
		verCaptcha.identificador = id;
		verCaptcha.respuesta = captch;
		verCaptcha.verificarCaptcha(function(resultado){
			json = JSON.parse(resultado);
			if(json.success[0] == undefined) {
				alert(222);//sweetAlert("", "Error en el captcha intentar de nuevo por favor", "warning");
				obtCapthaC();
			} else {
				guardarDatosC();
			}
		});
	}
	function noVacio() {
		var estadoDenuncia  = $("#detalleDenuncia").val();    
		if( estadoDenuncia != "" ) {
			document.getElementById("resultadoC").disabled = false;
		} else {
			document.getElementById("resultadoC").disabled = true;
		}
	}
	function noVacioC() {
		document.getElementById('correoC').addEventListener('input', function() {
			campo = event.target;
			valido = document.getElementById('emailOK');
			emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
			if (emailRegex.test(campo.value)) {
				valido.innerText = "válido";
			} else {
				valido.innerText = "incorrecto";
			}
		});
		var correo2  = $("#correoC").val();    
		var estadoDenuncia  = $("#detalleSoporteC").val();      
		if( estadoDenuncia != ""  && valido.innerText == "válido" )	{
			document.getElementById("resultadoD").disabled = false;
		} else {
			document.getElementById("resultadoD").disabled = true;
		}
	}
	function getlimpiareRROR() {
		var captch  = $("#resultadoC").val();
		if( captch != "") {
			document.getElementById("EnvRes").disabled = false;
		} else {
			document.getElementById("EnvRes").disabled = true;
		}
	}
	function getlimpiareRRORC() {
		var captch  = $("#resultadoC").val();
		if( captch != "") {
			document.getElementById("EnvResC").disabled = false;
		} else {
			document.getElementById("EnvResC").disabled = true;
		}
	}
	function obtCaptha() { 
		$("#resultadoC").val('');
		var objCaptcha = new captcha();
		objCaptcha.obtcaptcha(function(resultado) {
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
			}
			document.getElementById('img1').title = "Palabra en " + lengua;
			document.getElementById('resultadoC').placeholder = "Capcha: " + lengua + " CASTELLANO";      
		});
	} 
	function obtCapthaC() { 
		$("#resultadoD").val('');
		var objCaptcha = new captcha();
		objCaptcha.obtcaptcha(function(resultado) {
			json = JSON.parse(resultado);
			partes = json.success[0].sp_captcha_porx1.split(',');
			numeroC = partes[0].substring(1);
			i1=(partes[2]+ "," + partes[3]);
			i2=(partes[4] + "," + partes[5]);
			document.getElementById('img_4').src = i1.substring(1, i1.length - 1);
			document.getElementById('img_3').src = i2.substring(1, i2.length - 2);
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
			}
			document.getElementById('img_3').title = "Palabra en " + lengua;
			document.getElementById('resultadoD').placeholder = "Capcha: " + lengua + " CASTELLANO";      
		});
	} 
	function verificarKeyPress(captch) {
		var id = numero;
		var verCaptcha = new captcha();
		verCaptcha.identificador = id;
		verCaptcha.respuesta = captch;
		verCaptcha.verificarCaptcha(function(resultado) {
		    json = JSON.parse(resultado);
		    var nroregsitros = json.success.length;
		    if(nroregsitros == 0)
		    {
		        habGuardar1 = true;
		        ErrorCapchasXX = "Verifique el Capcha";
		        SuccesCapchasxx="";
		        document.getElementById("msg_capcha").innerHTML = ErrorCapchasXX;            
		        document.getElementById("EnvRes").disabled = true;
		    }
		    else
		    {
		        habGuardar1 = false;
		        ErrorCapchasXX = "";
		        SuccesCapchasxx="Capcha correcto";
		        document.getElementById("msg_capcha").innerHTML = SuccesCapchasxx;           
		        document.getElementById("EnvRes").disabled = false;                     
		    }
		});
	}
	function verificarKeyPressC(captch) {
		var id = numeroC;
		var verCaptcha = new captcha();
		verCaptcha.identificador = id;
		verCaptcha.respuesta = captch;
		verCaptcha.verificarCaptcha(function(resultado) {
		    json = JSON.parse(resultado);
		    var nroregsitros = json.success.length;
		    if(nroregsitros == 0)
		    {
		        habGuardar1 = true;
		        ErrorCapchasXX = "Verifique el Capcha";
		        SuccesCapchasxx="";
		        document.getElementById("msg_capcha_").innerHTML = ErrorCapchasXX;            
		        document.getElementById("EnvResC").disabled = true;
		    }
		    else
		    {
		        habGuardar1 = false;
		        ErrorCapchasXX = "";
		        SuccesCapchasxx="Capcha correcto";
		        document.getElementById("msg_capcha_").innerHTML = SuccesCapchasxx;           
		        document.getElementById("EnvResC").disabled = false;                     
		    }
		});
	}
	function VerificarCapchaa (datos) {
		document.getElementById("EnvRes").disabled = true;
		var captch  = $("#resultadoC").val();
		if(captch.length == 0)
			ErrorCapchasXX = "";
		if(captch.length > 3) {
			clearTimeout(tiemporespuesta);
			tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1500);
		}
	}
	function VerificarCapchab (datos) {
		document.getElementById("EnvResC").disabled = true;
		var captch  = $("#resultadoD").val();
		if(captch.length == 0)
			ErrorCapchasXX = "";
		if(captch.length > 3) {
			clearTimeout(tiemporespuesta);
			tiemporespuesta = setTimeout(verificarKeyPressC.bind(undefined, captch), 1500);
		}
	}
	/*
	function limpiarCamposRecuperacion() {    
		document.getElementById("resultadoC").disabled = true;
		document.getElementById("EnvRes").disabled = true;  
		document.getElementById("resultadoC").value = '';
		document.getElementById("resultadoC").value = '';
	}
	function limpiarCamposRecuperacionC() {    
		document.getElementById("resultadoD").disabled = true;
		document.getElementById("EnvResC").disabled = true;  
		document.getElementById("resultadoD").value = '';
		document.getElementById("resultadoD").value = '';
	}*/
	function guardarDatos2(url){
		setTimeout(function(){  
			$.blockUI({ message: '<h1><img src="img/cargando.gif" width="45" height="45" /></h1>' });
		}, 200);
		var tipoForm = $("#tipoForm").val(); 
		var fromIn = $("#fromIn").val();
		var procedencia = $("#procedencia").val();
		var asunto = $("#asunto").val();
		var nombreCompleto = $("#nombreCompleto").val();
		var documento = $("#documento").val();
		var expedido= $("#expedido").val(); 
		var direccion = $("#direccion").val(); 
		var telefono = $("#telefono").val();
		var correo = $("#correo").val();
		var tipoIdentidad = $("#identidad").val(); 
		var prueba = url;
		var detalleDenuncia = $("#detalleDenuncia").val(); 
		var  idUsusario = '1';
		if(tipoIdentidad ==  1) {
		nombreCompleto = 'Anonimo';
		documento = 0;
		direccion = 's/d';
		telefono = 0;
		correo = 'sin correo';
		}
		if(documento ==  '') {   
		documento = 0;  
		}
		if(telefono ==  '') {   
		telefono = 0;  
		}
		var xdts_datos = '{  "tipoForm":"'+tipoForm+'", "idUsusario":"'+idUsusario+'", "procedencia": "'+procedencia+'", "asunto":"'+asunto+'",  "nombreCompleto": "'+nombreCompleto+'", "documento":"'+documento+'",  "expedido": "'+expedido+'", "direccion":"'+direccion+'", "telefono": "'+telefono+'", "correo":"'+correo+'", "tipoIdentidad":"'+tipoIdentidad+'", "prueba": "'+prueba+'", "detalleDenuncia":"'+detalleDenuncia+'" }'; 
		var xdts_datos = JSON.stringify(xdts_datos);  
		$.ajax({
			type        : 'POST',
			url         : jsonURLS.CONEXION_MOTOR_SERVICIO + 'api/apiLogin', 
			data        : '{"usr_usuario":"administrador", "usr_clave":123456}',
			headers: {
				'Content-type': 'application/json'
			},
			success: function(token) { 
				token = token.token; 
				var formData = {"identificador": 'RCCIUDADANO_INSERTA_CASOS',"parametros": '{"xdts_tipo":"'+tipoForm+'", "xdts_nombre_completo":"'+nombreCompleto+'", "xdts_fono":'+telefono+', "xdts_referencia":"'+asunto+'", "xdts_contenido":"'+procedencia+'", "xdts_url_evidencia":"'+prueba+'", "xdts_usr_id":1, "xdts_tipo_detalle":"'+detalleDenuncia+'", "xdts_datos":'+xdts_datos+'}'};  
				$.ajax({   
						type        : 'POST',
						url         : jsonURLS.CONEXION_MOTOR_SERVICIO + 'api/reglaNegocio/ejecutarWeb',  
						data        : formData,
						dataType    : 'json',
						crossDomain : true,
						headers: {
						'authorization': 'Bearer '+token,
					},
					success: function(dataIN) {  
						limpiar(); 
						obtCaptha();
						document.getElementById("EnvRes").disabled = true;
						noVacio();
						setTimeout(function(){
							$.unblockUI();
							swal("Enviado!", "Su denuncia fue enviada correctamente", "success"); 
						}, 500);
					},
					error: function(result) {
					}
				});
			},   
		});  
	}
  function guardarDatosC(){ 
	  setTimeout(function(){  
	  	$.blockUI({ message: '<h1><img src="img/cargando.gif" width="45" height="45" /></h1>' });
	  }, 200);
	  var tipoForm = $("#tipoForm").val(); 
	  var fromIn = $("#fromIn").val();
	  var procedencia = $("#procedencia").val();  
	  var nombreCompleto = $("#nombreCompleto").val();
	  var documento = $("#documento").val();  
	  var telefono = $("#telefono").val();
	  var correo = $("#correo").val();  
	  var detalleSoporte = $("#detalleSoporte").val();
	  if(documento ==  '') {    
	  	documento = 0;    
	  }
	  if(telefono ==  '') {    
	  	telefono = 0;    
	  }
	  var xdts_datos = '{"tipoForm":"'+tipoForm+'",  "procedencia": "'+procedencia+'",  "nombreCompleto": "'+nombreCompleto+'", "documento":"'+documento+'", "telefono": "'+telefono+'", "correo":"'+correo+'",  "detalleCaso":"'+detalleSoporte+'" }'; 
	  var xdts_datos = JSON.stringify(xdts_datos);  
	  $.ajax({
	  type        : 'POST',
	  url         : jsonURLS.CONEXION_MOTOR_SERVICIO + 'api/apiLogin', 
	  data        : '{"usr_usuario":"administrador", "usr_clave":123456}',
	  headers: {
	  'Content-type': 'application/json'
	  },
	  success: function(token) { 
	  token = token.token; 
	  var formData = {"identificador": 'RCCIUDADANO_INSERTA_CASOS',"parametros": '{"xdts_tipo":"'+tipoForm+'", "xdts_nombre_completo":"'+nombreCompleto+'", "xdts_fono":'+telefono+', "xdts_referencia":"Solicitud Soporte", "xdts_contenido":"Solicitud Soporte", "xdts_url_evidencia":" ", "xdts_usr_id":1, "xdts_tipo_detalle":"'+detalleSoporte+'", "xdts_datos":'+xdts_datos+'}'};    
	  $.ajax({   
	  type        : 'POST',            
	  url         : jsonURLS.CONEXION_MOTOR_SERVICIO + 'api/reglaNegocio/ejecutarWeb',  
	  data        : formData,
	  dataType    : 'json',
	  crossDomain : true,
	  headers: {
	  'authorization': 'Bearer '+token,         
	  },
	  success: function(dataIN) {  
	  limpiarC(); 
	  obtCapthaC();           
	  document.getElementById("EnvResC").disabled = true;
	  noVacioC();         


	  setTimeout(function(){
	  $.unblockUI();
	  swal("Enviado!", "Su solicitud fue enviada correctamente", "success"); 
	  }, 500);                        
	  },
	  error: function(result) {

	  }
	  });     
	  },   
	  });   
  } 
	function limpiarC(){ 
		$("#nombreCompletoC").val('');
		$("#documentoC").val(''); 
		$("#direccionC").val(''); 
		$("#telefonoC").val('');
		$("#correoC").val('');  
		$("#detalleSoporteC").val('');
		}
		function solonumeros(e){
		var key = window.event ? e.which : e.keyCode;
		if(key < 48 || key > 57)
		e.preventDefault();
	}
	function limpiar() { 
		$("#nombreCompleto").val('');
		$("#documento").val(''); 
		$("#direccion").val(''); 
		$("#telefono").val('');
		$("#correo").val('');  
		$("#prueba2").val('');  
		$("#detalleDenuncia").val('');
	}
/*
	if(document.getElementById('correo')){
		document.getElementById('correo').addEventListener('input', function() {
		campo = event.target;
		valido = document.getElementById('emailOK');

		emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
		if (emailRegex.test(campo.value)) {
		valido.innerText = "válido";
		} else {
		valido.innerText = "incorrecto";
		}
		});
	}*/