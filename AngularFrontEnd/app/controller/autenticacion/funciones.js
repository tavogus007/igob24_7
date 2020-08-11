var numero = "";
  var captchaerror=""; 
  var tiemporespuesta = null; 
  var ErrorCapchasXX  = "";
  var SuccesCapchasxx = "";
  var habGuardar1 = ""; 
  var urlImagen = "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";
  function resetPassword()
  {     
    var captch  = $("#resultadoC").val();
    var id = numero;
    var verCaptcha = new captcha();
    verCaptcha.identificador = id;
    verCaptcha.respuesta = captch;
    verCaptcha.verificarCaptcha(function(resultado)
    {
      json = JSON.parse(resultado);
      if(json.success[0] == undefined)
      {
          sweetAlert("", "Error en el captcha intentar de nuevo por favor", "warning");
          obtCaptha();
      }
      else
      {
          subirimagen();
      }
    });
  }
  function noVacio()
  {
    var estadoDenuncia  = $("#detalleDenuncia").val(); 

    if( estadoDenuncia != "" )
    {
      document.getElementById("resultadoC").disabled = false;
    }
    else
    {
      document.getElementById("resultadoC").disabled = true;
    }
  }
  function getlimpiareRROR()
  {   
    //var detalle = $("#detalleDenuncia").val();
    var captch  = $("#resultadoC").val();    
    if( captch != "" )
    {
      document.getElementById("EnvRes").disabled = false;
    }
    else
    {
      document.getElementById("EnvRes").disabled = true;
    }
  }
  function obtCaptha()
  {     
    $("#resultadoC").val('');
    var objCaptcha = new captcha();
    objCaptcha.obtcaptcha(function(resultado)
    {
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
  function verificarKeyPress(captch)
  {
    var id = numero;
    var verCaptcha = new captcha();
    verCaptcha.identificador = id;
    verCaptcha.respuesta = captch;
    verCaptcha.verificarCaptcha(function(resultado)
    {
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
  function VerificarCapchaa (datos)
  {
      document.getElementById("EnvRes").disabled = true;
      var captch  = $("#resultadoC").val();
      if(captch.length == 0)
          ErrorCapchasXX = "";
      if(captch.length > 3)
      {
          clearTimeout(tiemporespuesta);
          tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1500);
      }
  };
  function limpiarCamposRecuperacion()
  {
    document.getElementById("resultadoC").disabled = true;
    document.getElementById("EnvRes").disabled = true;  
    document.getElementById("resultadoC").value = '';
    document.getElementById("resultadoC").value = '';
  }
  function solonumeros(e)
  {
    var key = window.event ? e.which : e.keyCode;
    if(key < 48 || key > 57)
      e.preventDefault();
  }
  $(document).ready(function() {
    setTimeout(llenarlogin(), 500);     
      obtCaptha();     
      getlimpiareRROR(); 
      noVacio();    

    $(document).on('change', 'input[type=file]', function(e) {   
      var TmpPath = URL.createObjectURL(e.target.files[0]);  
      $( "#esLibres" ).val(TmpPath);    
      $('span').html(TmpPath);
      $("#prueba").attr('src', TmpPath);
    });
  }); 
  function tipoOpcion(v){
    if (v.value==1) {
      document.getElementById("datosPersonales").style="display:none;";  
    }
    if (v.value==2) {
      document.getElementById("datosPersonales").style="display:block;";
    }
  }     
  function subirimagen()
  {  
    if($("#prueba2").val() != "")
    {
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
    }
    else
    { 
      var urlDenuncias = " "; 
      guardarDatos2(urlDenuncias);   
    } 
  }
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
    var expedido= "LPZ"; 
    var direccion = $("#direccion").val(); 
    var telefono = $("#telefono").val();
    var correo = $("#correo").val();
    var tipoIdentidad = $("#identidad").val(); 
    var prueba = url;
    var detalleDenuncia = $("#detalleDenuncia").val();  
    if(tipoIdentidad ==  1)
    {
      nombreCompleto = 'Anonimo';
      documento = 0;
      direccion = 's/d';
      telefono = 0;
      correo = 'sin correo';
    }
    if(documento ==  '')
    {   
      documento = 0;  
    }
    if(telefono ==  '')
    {   
      telefono = 0;  
    }
    var xdts_datos = '{  "tipoForm":"'+tipoForm+'", "idUsusario":"'+idUsusario+'", "procedencia": "'+procedencia+'", "asunto":"'+asunto+'",  "nombreCompleto": "'+nombreCompleto+'", "documento":"'+documento+'",  "direccion":"'+direccion+'", "telefono": "'+telefono+'", "correo":"'+correo+'", "tipoIdentidad":"'+tipoIdentidad+'", "prueba": "'+prueba+'", "detalleDenuncia":"'+detalleDenuncia+'" }'; 
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
            llenarlogin();
            setTimeout(function(){
             $.unblockUI();
             swal("Enviado!", "Su denuncia fue enviada correctamente", "success"); 
            }, 500);                         
          },
          error: function(result) {}
        });
      }
    });
  }
  var fechax = new Date();
  function crearCasoLotus(){
    var dataForm = {};
    dataForm['G_CI']          =   "";
    dataForm['Reg_a']         =   "";
    dataForm['Reg_ci']        =   $("#documento").val();
    dataForm['g_tipo']        =   "";
    dataForm['Reg_cor']       =   $("#correo").val();
    dataForm['Reg_dir']       =   $("#direccion").val(); 
    dataForm['Reg_exp']       =   "LPZ"; 
    dataForm['Reg_res']       =   "2";
    dataForm['Reg_tel']       =   $("#telefono").val();
    dataForm['g_fecha']       =   fechax;
    dataForm['Reg_Tipo']      =   "2";
    dataForm['Reg_nodo']      =   "";
    dataForm['Reg_proc']      =   $("#procedencia").val(); 
    dataForm['Reg_fojas']     =   "";
    dataForm['g_usuario']     =   "";
    dataForm['Reg_Asunto']    =   $("#asunto").val();
    dataForm['Reg_Nombre']    =   $("#nombreCompleto").val();
    dataForm['AE_NRO_CASO']   =   "";
    dataForm['Reg_Detalle']   =   $("#detalleDenuncia").val()
    dataForm['Reg_a_VALOR']   =   "";
    dataForm['Reg_ingreso']   =   "7";
    dataForm['Reg_usuario']   =   idUsusario;
    dataForm['Reg_operador']        =   "";
    dataForm['Reg_Tipologia']       = $("#asunto").val();
    dataForm['Reg_exp_VALOR']       =   "";
    dataForm['Reg_res_VALOR']       =   "";
    dataForm['Reg_Tipo_VALOR']      =   "";
    dataForm['Reg_desc_fojas']      =   "";
    dataForm['Reg_proc_VALOR']      =   "";
    dataForm['g_UO_solicitante']    =   "";
    dataForm['Reg_ingreso_VALOR']   =   "";
    dataForm['FORMULARIO']          =   "";
    dataForm['Reg_Tipologia_VALOR'] =   "";
    dataForm['g_datos_solicitante'] =   "";
    var crearCasoL = new gCrearCaso();  
    crearCasoL.usr_id = '1';
    crearCasoL.datos = JSON.stringify(dataForm);
    crearCasoL.procodigo = 'TRA_REG';
    crearCasoL.crearCasoAeLinea( function(resultado){
        //$.unblockUI();
    });
  }
  function limpiar()
  { 
    $("#nombreCompleto").val('');
    $("#documento").val(''); 
    $("#direccion").val(''); 
    $("#telefono").val('');
    $("#correo").val('');  
    $("#prueba2").val('');  
    //$("#esLibres").val('');
    $("#detalleDenuncia").val('');
  }
  var idUsusario = "";
  function llenarlogin()
  {
    if(sessionStorage.getItem("TIPO_PERSONA") == "NATURAL")
    {
      $("#nombreCompleto").val(sessionStorage.getItem("US_NOMBRE"));
      $("#documento").val(sessionStorage.getItem("CICIUDADANO"));
      $("#correo").val(sessionStorage.getItem("US_EMAIL")); 
      idUsusario = sessionStorage.getItem("IDUSUSARIO");
    }
    else
    {
      $("#nombreCompleto").val(sessionStorage.getItem("US_NOMBRE"));
      $("#documento").val(sessionStorage.getItem("NITCIUDADANO"));
      $("#correo").val(sessionStorage.getItem("US_EMAIL")); 
      idUsusario = sessionStorage.getItem("IDUSUSARIO");
    }
  }