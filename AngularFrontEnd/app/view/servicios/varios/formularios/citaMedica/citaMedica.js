function saludController($scope, $rootScope,$filter, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, sweet,registroLog,ngTableParams,FileUploader,fileUpload,$sce) {
    $scope.con_central_riesgos = false;
    $scope.con_historial = false;
    $scope.hospitalesMostrar = false;
    $scope.tablaTramites = {};
    $scope.idCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.nroCi = sessionService.get('CICIUDADANO');
    $scope.tipoCiudadano = sessionService.get('TIPO_PERSONA');
    $scope.nombrePersona = sessionService.get('US_NOMBRE');
    $scope.appaternoPersona = sessionService.get('US_PATERNO');
    $scope.apmaternoPersona = sessionService.get('US_MATERNO');
    $scope.email = sessionService.get('US_EMAIL');
    $scope.tramitesUsuario = [];
    $scope.hospitales_vista = false;
    $scope.especialidad_vista = false;
    $scope.FormularioPago = false;
    $scope.hoja_referencia = false;
    $scope.img_hoja_referencia = false;
    $scope.lstatencionesvacias = false;
    $scope.lstatenciones = false;
    $scope.mostrarIframe = false;

    
    $scope.vectorMensaje = ['Nro. de Proforma:','Nombres:','Apellidos:','Correo Electrónico:','Ciudad:','País:','Especialidad:','Precio (Bs):'];
    if(jsonURLS){
        //var urlFum = jsonURLS.CONEXION_GENERAR_FUM+"igob247/generarFumOficial.php";
        //var urlFum = jsonURLS.CONEXION_GENERAR_FUM+"igob247/generarFumOficial.php";
        var urlFum = CONFIG.CONEXION_ODM;
        //var urlPagoTarjetaX = CONFIG.CONEXION_PAGOS + 'registroDataPagoCheckout';
        var urlPagoTarjetaX = CONFIG.SERVICE_PAGOS_TARJETA;
        var urlPagoTarjetaY = CONFIG.CONEXION_PAGOS + 'pago-checkout';
        var urlPagoTarjeta = CONFIG.CONEXION_PAGOS + 'pago-checkoutWeb';
        var urlPagoClick = CONFIG.CONEXION_PAGOS + 'envioPagoClickGamlp';
        var urlPagoQR = CONFIG.CONEXION_PAGOS + 'generarQrBcpGamlp';
        var urlCorreoAdjunto = 'http://200.105.139.183:9090/smsemail/email/mailFileGamlp.php';
        //var urlCorreo = 'http://172.18.26.174/dreamfactory/dist/PROYECTOS/phpmailer/index.php';
        var urlCorreo = 'http://200.105.139.183:9090/smsemail/email/mailSalud2_0_BORRAR.php';
      }
    $scope.get_renderizarHospitales = function(x){
        return $sce.trustAsHtml(x);
        };

    var tiemporespuesta = null;
    var data = $scope.users;
    function cargando(){
        var texto   = $("<div>", {
         text    : "CARGANDO....",
            id      : "myEstilo",
            css     : {
            "font-size" : "30px",
                "position": "relative",
                "width": "500px",
                "height": "300px",
                "left": "180px",
                "top":"50px"
            },
            fontawesome : "fa fa-spinner fa-pulse"
        });
        $.LoadingOverlay("show",{
                custom  : texto,
                color:"rgba(255, 255, 255, 0.8)",
        });
    }

    function procesando(){
        var texto   = $("<div>", {
         text    : "PROCESANDO....",
            id      : "myEstilo",
            css     : {
            "font-size" : "30px",
                "position": "relative",
                "width": "500px",
                "height": "300px",
                "left": "180px",
                "top":"50px"
            },
            fontawesome : "fa fa-spinner fa-pulse"
        });
        $.LoadingOverlay("show",{
                custom  : texto,
                color:"rgba(255, 255, 255, 0.8)",
        });
    }

    $scope.validarNumeroTarjeta = function(nro){
      if(nro.length > 0){
        $scope.datosT.num_tajeta = nro.substring(0, 16);
      }
    }

    $scope.validarMesTarjeta = function (nro) {
      if(nro.length > 0){
        if(nro.length == 2){
          $scope.datosT.mes_tajeta = $scope.datosT.mes_tajeta + '/';
        }
      }
    }

    $scope.validarNumeroCvv = function(nro){
      if(nro.length > 0){
        $scope.datosT.cvn_tarjeta = nro.substring(0, 3);
      }
    }

    $scope.validarTelefono = function(nro){
        if(nro.length > 0){
            var res = nro.substring(0, 1);
            if(res == 2 || res == 3 || res == 4){
                $scope.datosGrupo.telefonoTrabajo = nro.substring(0, 7);
            }
            else{
                if(res == 7 || res == 6){
                    $scope.datosGrupo.telefonoTrabajo = nro.substring(0, 8);
                }
                else{
                    $scope.datosGrupo.telefonoTrabajo = '';
                    alertify.error('El número  es incorrecto');
                }
            }
        }
        else{
        }
    }

    $scope.validarTelefono2 = function(nro){
        if(nro.length > 0){
            var res = nro.substring(0, 1);
            if(res == 2 || res == 3 || res == 4){
                $scope.datosGrupo.telefonoRef = nro.substring(0, 7);
            }
            else{
                if(res == 7 || res == 6){
                    $scope.datosGrupo.telefonoRef = nro.substring(0, 8);
                }
                else{
                    $scope.datosGrupo.telefonoRef = '';
                    alertify.error('El número  es incorrecto');
                }
            }
        }
        else{
        }
    }

    $scope.registrarHistoria = function(datos){
        if(datos.telefonoRef.length > 0){
            var res = datos.telefonoRef.substring(0, 1);
            if(res == 2 || res == 3 || res == 4){
                if(datos.telefonoRef.length == 7){
                    $scope.numeroref = true;
                    $scope.variablem = "modal";
                }
                else{
                    $scope.numeroref = false;
                    $scope.variablem = "";
                    alertify.error('El teléfono de referencia familiar es incorrecto');
                }
            }
            else{
                if(res == 7 || res == 6){
                    if(datos.telefonoRef.length == 8){
                    $scope.numeroref = true
                    $scope.variablem = "modal";
                    }
                    else{
                        $scope.numeroref = false;
                        $scope.variablem = "";
                        alertify.error('El celular de referencia familiar es incorrecto');
                    }
                }
                else{
                    $scope.datosGrupo.telefonoTrabajo = '';
                    alertify.error('El número es incorrecto');
                }
            }
        }

        else{
            $scope.numeroref = true;
            $scope.variablem = "modal";
        }
        if(datos.telefonoTrabajo.length > 0){
            var res = datos.telefonoTrabajo.substring(0, 1);
            if(res == 2 || res == 3 || res == 4){
                if(datos.telefonoTrabajo.length == 7){
                    $scope.numerotrabajo = true;
                    $scope.variablem = "modal";
                }
                else{
                    $scope.numerotrabajo = false;
                    $scope.variablem = "";
                    alertify.error('El teléfono de trabajo es incorrecto');
                }
            }
            else{
                if(res == 7 || res == 6){
                    if(datos.telefonoTrabajo.length == 8){
                    $scope.numerotrabajo = true
                    $scope.variablem = "modal";
                    }
                    else{
                        $scope.numerotrabajo = false;
                        $scope.variablem = "";
                        alertify.error('El celular de trabajo es incorrecto');
                    }
                }
                else{
                    $scope.datosGrupo.telefonoTrabajo = '';
                    alertify.error('El número es incorrecto');
                }
            }
        }
        else{
            $scope.numerotrabajo = true;
            $scope.variablem = "modal";
        }
        if($scope.numerotrabajo && $scope.numeroref){
            $scope.registrarHistoriaConfirmar();
        }
    }

    $scope.registrarHistoriaConfirmar = function(){
        var fec = $scope.datosPaciente.dtspsl_fec_nacimiento;
        swal({
         title: "¿Está seguro de registrarse en el "+$scope.datosHospital.vhsp_nombre_hospital+" ?",
         text: "Se creará un nuevo historial clínico en este hospital, con los datos que proporcionó",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#55DD6B",confirmButtonText: "SI",
         closeOnConfirm: false,
         closeOnCancel: false ,
         cancelButtonText: "green",cancelButtonText:"NO"
         },
      function(isConfirm){
         if (isConfirm) {
            if($scope.datosPaciente.dtspsl_fec_nacimiento == ' ' || $scope.datosPaciente.dtspsl_fec_nacimiento == '' || $scope.datosPaciente.dtspsl_fec_nacimiento == undefined || $scope.datosPaciente.dtspsl_fec_nacimiento == null || fec == 'Invalid Date'){
                alertify.error('Completar su fecha de nacimiento en editar información Por favor');
                swal.close();
            }
            else{
                if($scope.datosPaciente.dtspsl_expedido == '' || $scope.datosPaciente.dtspsl_expedido == undefined || $scope.datosPaciente.dtspsl_expedido == null ){
                alertify.error('Completar el expedido de su carnet en editar información Por favor');
                swal.close();
                }
                else{
                    if($scope.datosPaciente.dtspsl_id_estado_civil == '' || $scope.datosPaciente.dtspsl_id_estado_civil == undefined || $scope.datosPaciente.dtspsl_id_estado_civil == null ){
                    alertify.error('Completar su estado civil en editar información Por favor');
                    swal.close();
                    }
                    else{
                        $scope.crearHistoriaClinicaConfirm($scope.datosHospital.vhsp_id_hospital);
                        swal.close();
                    }
                }
            }
         } else {
          swal.close();
         }
        });
    }

    $scope.reservarFicha = function(){
        swal({
         title: " Atención !!",
         text: "Favor tomar nota de lo siguiente: \n El día de la cita médica programada debe estar 45 minutos antes de la hora de atención reservada, para realizar el pago en el servicio de Cajas del Hospital. Para contar con la ficha en físico desde el Dispensador de Fichas, seleccione la opción Más opciones en la Reimprimir ficha pendiente,  debe ingresar su número de CI y fecha de nacimiento. \n ¿Desea continuar?",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#55DD6B",confirmButtonText: "SI",
         closeOnConfirm: false,
         closeOnCancel: false ,
         cancelButtonText: "green",cancelButtonText:"NO"
         },
      function(isConfirm){
         if (isConfirm) {
            $scope.entregarFicha();
            $scope.$apply();
            swal.close();
         } else {
          swal.close();
         }
        });
    }

    $scope.reservarFichaLey = function(){
        swal({
         title: "Atención",
         text: "Debe apersonarse a Admisiones del Hospital con su Hoja de Referencia original.",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#55DD6B",confirmButtonText: "SI",
         closeOnConfirm: false,
         closeOnCancel: false ,
         cancelButtonText: "green",cancelButtonText:"NO"
         },
      function(isConfirm){
         if (isConfirm) {
            $scope.reservarInternetley();
            swal.close();
            $scope.$apply();
         } else {
          swal.close();
         }
        });
    }


    $scope.crearHistoriaClinicaConfirm = function(idHospital){
    cargando();
    var response = $scope.datosPaciente;
    $scope.datosPaciente.lugarTrabajo = $scope.datosGrupo.lugarTrabajo;
    $scope.datosPaciente.direccionTrabajo = $scope.datosGrupo.direccionTrabajo;
    $scope.datosPaciente.telefonoTrabajo = $scope.datosGrupo.telefonoTrabajo;
    $scope.datosPaciente.responsableFamilia = $scope.datosGrupo.responsableFamilia;
    $scope.datosPaciente.nombrePadreTutor = $scope.datosGrupo.nombrePadreTutor;
    $scope.datosPaciente.nombreMadre = $scope.datosGrupo.nombreMadre;
    $scope.datosPaciente.telefonoRef = $scope.datosGrupo.telefonoRef;
    if(typeof($scope.datosPaciente.dtspsl_nombres) == "undefined" || $scope.datosPaciente.dtspsl_nombres == " " || $scope.datosPaciente.dtspsl_nombres == null) { $scope.datosPaciente.dtspsl_nombres = ""; }
    if(typeof($scope.datosPaciente.dtspsl_paterno) == "undefined" || $scope.datosPaciente.dtspsl_paterno == " " || $scope.datosPaciente.dtspsl_paterno == null) { $scope.datosPaciente.dtspsl_paterno = ""; }
    if(typeof($scope.datosPaciente.dtspsl_materno) == "undefined" || $scope.datosPaciente.dtspsl_materno == " " || $scope.datosPaciente.dtspsl_materno == null) { $scope.datosPaciente.dtspsl_materno = ""; }
    if(typeof($scope.datosPaciente.dtspsl_ci) == "undefined" || $scope.datosPaciente.dtspsl_ci == " " || $scope.datosPaciente.dtspsl_ci == null) { $scope.datosPaciente.dtspsl_ci = ""; }
    if(typeof($scope.datosPaciente.dtspsl_expedido) == "undefined" || $scope.datosPaciente.dtspsl_expedido == "" || $scope.datosPaciente.dtspsl_expedido == null) { $scope.datosPaciente.dtspsl_expedido = 0; }
    if(typeof($scope.datosPaciente.dtspsl_fec_nacimiento) == "undefined" || $scope.datosPaciente.dtspsl_fec_nacimiento == " " || $scope.datosPaciente.dtspsl_fec_nacimiento == null) { $scope.datosPaciente.dtspsl_fec_nacimiento = ""; }
    if(typeof($scope.datosPaciente.dtspsl_lugar_nacimiento) == "undefined" || $scope.datosPaciente.dtspsl_lugar_nacimiento == " " || $scope.datosPaciente.dtspsl_lugar_nacimiento == null) { $scope.datosPaciente.dtspsl_lugar_nacimiento = "";}
    if(typeof($scope.datosPaciente.dtspsl_provincia) == "undefined" || $scope.datosPaciente.dtspsl_provincia == " " || $scope.datosPaciente.dtspsl_provincia == null) { $scope.datosPaciente.dtspsl_provincia = null;}
    if(typeof($scope.datosPaciente.dtspsl_municipio) == "undefined" || $scope.datosPaciente.dtspsl_municipio == " " || $scope.datosPaciente.dtspsl_municipio == null) { $scope.datosPaciente.dtspsl_municipio = null;}
    if(typeof($scope.datosPaciente.dtspsl_pais) == "undefined" || $scope.datosPaciente.dtspsl_pais == " " || $scope.datosPaciente.dtspsl_pais == null) { $scope.datosPaciente.dtspsl_pais = ""; }
    if(typeof($scope.datosPaciente.dtspsl_id_estado_civil) == "undefined" || $scope.datosPaciente.dtspsl_id_estado_civil == " " || $scope.datosPaciente.dtspsl_id_estado_civil == null) { $scope.datosPaciente.dtspsl_id_estado_civil = ""; }
    if(typeof($scope.datosPaciente.dtspsl_sexo) == "undefined" || $scope.datosPaciente.dtspsl_sexo == " " || $scope.datosPaciente.dtspsl_sexo == null) { $scope.datosPaciente.dtspsl_sexo = ""; }
    if(typeof($scope.datosPaciente.dtspsl_telefono) == "undefined" || $scope.datosPaciente.dtspsl_telefono == " " || $scope.datosPaciente.dtspsl_telefono == null) { $scope.datosPaciente.dtspsl_telefono = ""; }
    if(typeof($scope.datosPaciente.dtspsl_correo) == "undefined" || $scope.datosPaciente.dtspsl_correo == " " || $scope.datosPaciente.dtspsl_correo == null) { $scope.datosPaciente.dtspsl_correo = ""; }
    if(typeof($scope.datosPaciente.dtspsl_profesion) == "undefined" || $scope.datosPaciente.dtspsl_profesion == " " || $scope.datosPaciente.dtspsl_profesion == null) { $scope.datosPaciente.dtspsl_profesion = ""; }
    if(typeof($scope.datosPaciente.dtspsl_ocupacion) == "undefined" || $scope.datosPaciente.dtspsl_ocupacion == " " || $scope.datosPaciente.dtspsl_ocupacion == null) { $scope.datosPaciente.dtspsl_ocupacion = ""; }
    if(typeof($scope.datosPaciente.dtspsl_direccion) == "undefined" || $scope.datosPaciente.dtspsl_direccion == " " || $scope.datosPaciente.dtspsl_direccion == null) { $scope.datosPaciente.dtspsl_direccion = ""; }
    if(typeof($scope.datosGrupo.lugarTrabajo) == "undefined" || $scope.datosGrupo.lugarTrabajo == " " || $scope.datosGrupo.lugarTrabajo == null) { $scope.datosPaciente.lugarTrabajo = ""; }
    if(typeof($scope.datosGrupo.direccionTrabajo) == "undefined" || $scope.datosGrupo.direccionTrabajo == " " || $scope.datosGrupo.direccionTrabajo == null) { $scope.datosPaciente.direccionTrabajo = ""; }
    if(typeof($scope.datosGrupo.telefonoTrabajo) == "undefined" || $scope.datosGrupo.telefonoTrabajo == " " || $scope.datosGrupo.telefonoTrabajo == null) { $scope.datosPaciente.telefonoTrabajo = ""; }
    if(typeof($scope.datosGrupo.responsableFamilia) == "undefined" || $scope.datosGrupo.responsableFamilia == " " || $scope.datosGrupo.responsableFamilia == null) { $scope.datosPaciente.responsableFamilia = ""; }
    if(typeof($scope.datosGrupo.nombrePadreTutor) == "undefined" || $scope.datosGrupo.nombrePadreTutor == " " || $scope.datosGrupo.nombrePadreTutor == null) { $scope.datosPaciente.nombrePadreTutor = ""; }
    if(typeof($scope.datosGrupo.nombreMadre) == "undefined" || $scope.datosGrupo.nombreMadre == " " || $scope.datosGrupo.nombreMadre == null) { $scope.datosPaciente.nombreMadre = ""; }
    if(typeof($scope.datosGrupo.telefonoRef) == "undefined" || $scope.datosGrupo.telefonoRef == " " || $scope.datosGrupo.telefonoRef == null) { $scope.datosPaciente.telefonoRef = ""; }
    datos = $scope.datosPaciente;
    $scope.registro_con_carnet(datos);
  }

    $scope.registro_con_carnet = function(datos){
      cargando();
      var response = datos;
      $scope.usuarioCiudadano = "";
      $scope.pinCiudadano = "";
      var datos = {};
      var genero;
      var sNumeroAleatorio = Math.round(Math.random()*100000) + response.cedula;
      if (response.dtspsl_sexo == 'M') {
        genero = 1;
      } else{
        genero = 2;
      };

      var expedido = 0;
      switch(parseInt(response.dtspsl_expedido))
      {
        case  "CHQ": expedido = 1; break;
        case  "LPZ": expedido = 2; break;
        case  "CBB": expedido = 3; break;
        case  "ORU": expedido = 4; break;
        case  "PTS": expedido = 5; break;
        case  "TJA": expedido = 6; break;
        case  "SCZ": expedido = 7; break;
        case  "BNI": expedido = 8; break;
        case  "PND": expedido = 9; break;
        case  "OTR": expedido = 10; break;
      }
      var lugarNacimiento = 0;
      switch(parseInt(response.dtspsl_lugar_nacimiento))
      {
        case  "CHQ": lugarNacimiento = 1; break;
        case  "LPZ": lugarNacimiento = 2; break;
        case  "CBB": lugarNacimiento = 3; break;
        case  "ORU": lugarNacimiento = 4; break;
        case  "PTS": lugarNacimiento = 5; break;
        case  "TJA": lugarNacimiento = 6; break;
        case  "SCZ": lugarNacimiento = 7; break;
        case  "BNI": lugarNacimiento = 8; break;
        case  "PND": lugarNacimiento = 9; break;
        case  "OTR": lugarNacimiento = 10; break;
      }
      var departamento = 0;
      switch(parseInt(response.dtspsl_departamento))
      {
        case  "CHQ": departamento = 1; break;
        case  "LPZ": departamento = 2; break;
        case  "CBB": departamento = 3; break;
        case  "ORU": departamento = 4; break;
        case  "PTS": departamento = 5; break;
        case  "TJA": departamento = 6; break;
        case  "SCZ": departamento = 7; break;
        case  "BNI": departamento = 8; break;
        case  "PND": departamento = 9; break;
        case  "OTR": departamento = 10; break;
      }
      var estadiCivil = 0;
      switch(parseInt(response.dtspsl_id_estado_civil))
      {
        case "SA": estadiCivil = 0; break;
        case "S": estadiCivil = 1; break;
        case "C": estadiCivil = 2; break;
        case "D": estadiCivil = 3; break;
        case "V": estadiCivil = 4; break;
        case "U": estadiCivil = 5; break;


      }
      var datosPaciente = new insertar_actual();
      datosPaciente.idHospital = $scope.datosHospital.vhsp_id_hospital;
      datosPaciente.s_auditoria = null;
      datosPaciente.i_operacion = null;
      datosPaciente.i_tipo = 'D';
      datosPaciente.i_Emp_Codigo = "20101";
      datosPaciente.i_HCL_CODIGO = "";
      datosPaciente.i_HCL_APPAT = response.dtspsl_paterno;
      datosPaciente.i_HCL_APMAT = response.dtspsl_materno;
      datosPaciente.i_HCL_NOMBRE = response.dtspsl_nombres;
      datosPaciente.i_HCL_NUMCI = response.dtspsl_ci;
      datosPaciente.i_HCL_SEXO = genero;
      datosPaciente.i_HCL_FECNAC = response.dtspsl_fec_nacimiento;
      datosPaciente.i_DEP_CODIGO_RES = 0;
      datosPaciente.i_PRO_CODIGO_RES = 0;
      datosPaciente.i_MUN_CODIGO_RES = 0;
      datosPaciente.i_HCL_ESTCIV = estadiCivil;
      datosPaciente.i_HCL_DIRECC = response.dtspsl_direccion;
      datosPaciente.i_HCL_TELDOM = response.dtspsl_telefono;
      datosPaciente.i_PProCodPro = "";
      datosPaciente.i_HCL_LUGTRA = response.lugarTrabajo;
      datosPaciente.i_HCL_DIRTRA = response.direccionTrabajo;
      datosPaciente.i_HCL_TELTRA = response.telefonoTrabajo;
      datosPaciente.i_HCL_NOMFAM = response.responsableFamilia;
      datosPaciente.i_HCL_TELFAM = response.telefonoRef;
      datosPaciente.i_HCL_NOMPAD = response.nombrePadreTutor;
      datosPaciente.i_HCL_NOMMAD = response.nombreMadre;
      datosPaciente.i_HCL_CodCSB = "";
      datosPaciente.i_HCL_CodSegSoc = "";
      datosPaciente.i_HCL_CodFam = "0";
      datosPaciente.i_zon_codigo = "0";
      datosPaciente.i_usuario = "1";
      datosPaciente.i_DEP_CODIGO_NAC = lugarNacimiento;
      datosPaciente.i_PRO_CODIGO_NAC = "0";
      datosPaciente.i_MUN_CODIGO_NAC = "0";
      datosPaciente.i_hc_alfa = "";
      datosPaciente.i_hc_NivelEstudio = "";
      datosPaciente.i_HCL_SUMI = "";
      datosPaciente.i_HCL_SUMI_FECHA = "";
      datosPaciente.i_HCL_TIPODOC = "";
      datosPaciente.i_SegSocial = "N";
      datosPaciente.i_Idioma = "";
      datosPaciente.i_IdiomaMaterno = "";
      datosPaciente.i_Autopertenencia = "";
      datosPaciente.i_LugarExpedicion = expedido;
      datosPaciente.insertar_actualizar(function(res){
        var x = JSON.parse(res);
        var resultado = x.success.data;
        var responseiNSERTA = resultado;
        codigoSeguroSice = responseiNSERTA[0]['codigoHistoria']
        $scope.hclcodigo = responseiNSERTA[0]['codigoHistoria'];
        $scope.codcarpeta = responseiNSERTA[0].codCarpeta;
        $scope.fecha_creacion_sice =  responseiNSERTA[0].fecha_creada;
        var historiaSIIS = new historiaClinica();
            historiaSIIS.nombres = response.dtspsl_nombres;
            historiaSIIS.paterno = response.dtspsl_paterno;
            historiaSIIS.materno = response.dtspsl_materno;
            historiaSIIS.ci = response.dtspsl_ci;
            historiaSIIS.complemento = "";
            historiaSIIS.sexo = genero;
            historiaSIIS.fechanacimiento = response.dtspsl_fec_nacimiento;
            historiaSIIS.estcivil = estadiCivil;
            historiaSIIS.direccion = response.dtspsl_direccion;
            historiaSIIS.telefono = response.dtspsl_telefono;
            historiaSIIS.expedido = expedido;
            historiaSIIS.ocupacion = "0";
            historiaSIIS.usr_id = "1";
            historiaSIIS.zona = response.dtspsl_zona;
            historiaSIIS.correo = response.dtspsl_correo;
            historiaSIIS.hospital = $scope.vhsp_id_hospital;
            historiaSIIS.tp_id = 0;
            historiaSIIS.codigoexp = $scope.codcarpeta;
            historiaSIIS.lugarexpedicion = expedido;
            historiaSIIS.dep_codigo_res = 0;
            historiaSIIS.prov_cod_res = 0;
            historiaSIIS.mun_codigo_res = 0;
            historiaSIIS.estciv = estadiCivil;
            historiaSIIS.nivelestudio = 0;
            historiaSIIS.idioma = 0;
            historiaSIIS.vlugtra = response.lugarTrabajo;
            historiaSIIS.vdirtra = response.direccionTrabajo;
            historiaSIIS.vteltra = response.telefonoTrabajo;
            historiaSIIS.vnomfam = response.responsableFamilia;
            historiaSIIS.vtelfam = response.telefonoRef;
            historiaSIIS.vnompad = response.nombrePadreTutor;
            historiaSIIS.vnommad = response.nombreMadre;
            historiaSIIS.vcodigoseg = $scope.hclcodigo;
            historiaSIIS.vcodigosegsocial = $scope.codcarpeta;
            historiaSIIS.vdep_codigo_nac = 0;
            historiaSIIS.vmun_codigo_nac = 0;
            historiaSIIS.vembarazada = 0;
            historiaSIIS.vtipo_atencion = "D";
            historiaSIIS.vmacrodistrito = "0";
            historiaSIIS.vdistrito = "0";
            historiaSIIS.vorigen = $scope.vhsp_codigo_hospital;
            historiaSIIS.vcelular = response.dtspsl_movil;
            historiaSIIS.vlugarnac = lugarNacimiento;
            historiaSIIS.fecha_creacion_sice = $scope.fecha_creacion_sice;
            historiaSIIS.vconyuge = "";
            historiaSIIS.votras_personas = "";
            historiaSIIS.vpaterno_proximo = "";
            historiaSIIS.vmaterno_proximo = "";
            historiaSIIS.vnombre_proximo = "";
            historiaSIIS.vciudad_proximo = "";
            historiaSIIS.vzona_proximo = "";
            historiaSIIS.vcalle_proximo = "";
            historiaSIIS.vtelefono_proximo = "";
            historiaSIIS.crearHistoriaClinicaWeb(function(res){
                var x = JSON.parse(res);
                var resultado = x.success.data;
                var responseiNSERTA2 = resultado;
                $scope.lstHospital();
                $scope.$apply();
                alertify.success('Felicidades !! Su historia clínica fue creada con éxito, ya puede utilizar nuestros servicios.');
                $.LoadingOverlay("hide");
            });
            $.LoadingOverlay("hide");
        });
        $.LoadingOverlay("hide");
      }


    $scope.limpiarRegistro = function(datos){
        $scope.datosRequeridos = 0;
        var genero;
          var sNumeroAleatorio = Math.round(Math.random()*100000) + $scope.datosPaciente.cedula;
          if ($scope.datosPaciente.dtspsl_sexo == 'M') {
            genero = 1;
          } else{
            genero = 2;
          };

          var expedido = 0;
          switch($scope.datosPaciente.dtspsl_expedido)
          {
            case  "CHQ": expedido = 1; break;
            case  "LPZ": expedido = 2; break;
            case  "CBB": expedido = 3; break;
            case  "ORU": expedido = 4; break;
            case  "PTS": expedido = 5; break;
            case  "TJA": expedido = 6; break;
            case  "SCZ": expedido = 7; break;
            case  "BNI": expedido = 8; break;
            case  "PND": expedido = 9; break;
            case  "OTR": expedido = 10; break;
          }
          var lugarNacimiento = 0;
          switch($scope.datosPaciente.dtspsl_lugar_nacimiento)
          {
            case  "CHQ": lugarNacimiento = 1; break;
            case  "LPZ": lugarNacimiento = 2; break;
            case  "CBB": lugarNacimiento = 3; break;
            case  "ORU": lugarNacimiento = 4; break;
            case  "PTS": lugarNacimiento = 5; break;
            case  "TJA": lugarNacimiento = 6; break;
            case  "SCZ": lugarNacimiento = 7; break;
            case  "BNI": lugarNacimiento = 8; break;
            case  "PND": lugarNacimiento = 9; break;
            case  "OTR": lugarNacimiento = 10; break;
          }
          var departamento = 0;
          switch($scope.datosPaciente.dtspsl_departamento)
          {
            case  "CHQ": departamento = 1; break;
            case  "LPZ": departamento = 2; break;
            case  "CBB": departamento = 3; break;
            case  "ORU": departamento = 4; break;
            case  "PTS": departamento = 5; break;
            case  "TJA": departamento = 6; break;
            case  "SCZ": departamento = 7; break;
            case  "BNI": departamento = 8; break;
            case  "PND": departamento = 9; break;
            case  "OTR": departamento = 10; break;
          }
          var estadiCivil = 0;
          switch($scope.datosPaciente.dtspsl_id_estado_civil)
          {
            case "SA": estadiCivil = 0; break;
            case "S": estadiCivil = 1; break;
            case "C": estadiCivil = 2; break;
            case "D": estadiCivil = 3; break;
            case "V": estadiCivil = 4; break;
            case "U": estadiCivil = 5; break;
          }
          $scope.vdtspsl_fec_nacimiento = false;
          $scope.vdtspsl_direccion = false;
          $scope.vdtspsl_correo = false;
          $scope.vlugarNacimiento = false;
          $scope.vdepartamento = false;
          $scope.vdtspsl_provincia = false;
          $scope.vdtspsl_municipio = false;
          $scope.vdtspsl_macrodistrito = false;

        if($scope.datosPaciente.dtspsl_fec_nacimiento == ' ' || $scope.datosPaciente.dtspsl_fec_nacimiento == '' || $scope.datosPaciente.dtspsl_fec_nacimiento == undefined || $scope.datosPaciente.dtspsl_fec_nacimiento == null){
            $scope.datosRequeridos = 1;
            $scope.vdtspsl_fec_nacimiento = true;
        }
        if($scope.datosPaciente.dtspsl_direccion == ' ' || $scope.datosPaciente.dtspsl_direccion == '' || $scope.datosPaciente.dtspsl_direccion == undefined || $scope.datosPaciente.dtspsl_direccion == null){
            $scope.datosRequeridos = 1;
            $scope.vdtspsl_direccion = true;
        }
        if($scope.datosPaciente.dtspsl_correo == ' ' || $scope.datosPaciente.dtspsl_correo == '' || $scope.datosPaciente.dtspsl_correo == undefined || $scope.datosPaciente.dtspsl_correo == null){
            $scope.datosRequeridos = 1;
            $scope.vdtspsl_correo = true;
        }
        if(lugarNacimiento == ' ' || lugarNacimiento == '' || lugarNacimiento == undefined || lugarNacimiento == null){
            $scope.datosRequeridos = 1;
            $scope.vlugarNacimiento = true;
        }
        if(departamento == ' ' || departamento == '' || departamento == undefined || departamento == null){
            $scope.datosRequeridos = 1;
            $scope.vdepartamento = true;
        }
        if($scope.datosPaciente.dtspsl_provincia == ' ' || $scope.datosPaciente.dtspsl_provincia == '' || $scope.datosPaciente.dtspsl_provincia == undefined || $scope.datosPaciente.dtspsl_provincia == null){
            $scope.datosRequeridos = 1;
            $scope.vdtspsl_provincia = true;
        }
        if($scope.datosPaciente.dtspsl_municipio == ' ' || $scope.datosPaciente.dtspsl_municipio == '' || $scope.datosPaciente.dtspsl_municipio == undefined || $scope.datosPaciente.dtspsl_municipio == null){
            $scope.datosRequeridos = 1;
            $scope.vdtspsl_municipio = true;
        }
        if($scope.datosPaciente.dtspsl_macrodistrito == ' ' || $scope.datosPaciente.dtspsl_macrodistrito == '' || $scope.datosPaciente.dtspsl_macrodistrito == undefined || $scope.datosPaciente.dtspsl_macrodistrito == null){
            $scope.datosRequeridos = 1;
            $scope.vdtspsl_macrodistrito = true;
        }
            if($scope.datosRequeridos == 1){
                $scope.registroHistoriamodal = 'modaldeDatos';
            }
            else{
                $scope.registroHistoriamodal = 'registroHistoria';
                $scope.vhsp_id_hospital = datos.vhsp_id_hospital;
                $scope.vhsp_codigo_hospital = datos.vhsp_codigo_hospital;
                $scope.datosHospital = datos;
                $scope.datosGrupo = [];
                if($scope.datosPaciente.dtspsl_direccion == null || $scope.datosPaciente.dtspsl_direccion == undefined || $scope.datosPaciente.dtspsl_direccion == ""){
                    alertify.error('Por favor complete el dato de dirección en su información personal');
                }
                else{
                    try{
                      var sql = new dataDinamic();
                      sql.consulta = 'SELECT * from sp_obt_datos_laborales($$'+$scope.nroCi+'$$)';
                      sql.SqlDinamic(function(res){
                          var x = JSON.parse(res);
                          var resultado = x.success.data;
                          if (resultado[0].sp_dinamico != null)
                          {
                             alertify.success('Se encontraron Datos de Referencia y Laborales');
                             $scope.datosGrupo.lugarTrabajo = resultado[0].sp_dinamico[0].vhcl_lugtra;
                             $scope.datosGrupo.direccionTrabajo = resultado[0].sp_dinamico[0].vhcl_dirtra;
                             $scope.datosGrupo.telefonoTrabajo = resultado[0].sp_dinamico[0].vhcl_teltra;
                             $scope.datosGrupo.responsableFamilia = resultado[0].sp_dinamico[0].vhcl_nomfam;
                             $scope.datosGrupo.nombrePadreTutor = resultado[0].sp_dinamico[0].vhcl_nompad;
                             $scope.datosGrupo.nombreMadre = resultado[0].sp_dinamico[0].vhcl_nommad;
                             $scope.datosGrupo.telefonoRef = resultado[0].sp_dinamico[0].vhcl_telfam;
                          }
                          else
                          {
                            $scope.datosGrupo = [];
                            alertify.error('No se encontraron Datos de Referencia y Laborales');
                          }
                          $.LoadingOverlay("hide");
                      });
                    }catch(e){
                        $scope.tabla_consultorio = false;
                        $.LoadingOverlay("hide");
                        alertify.error('Error');
                    }
                }
            }
            //
            //$scope.registroHistoriamodal = 'registroHistoria';


    }

     $scope.cargarFichasReservadas = function () {
        cargando();
        $scope.mostrarFichasReservadas = true;
        $scope.mostrarHospitales = false;
        $scope.volverPago = false;
        $scope.mostrarqr = false;
        $scope.lstatenciones = true;
        $scope.formularioPago2 = false;
        $scope.tramitesUsuario = [];
        $scope.tramitesUsuario = " ";
        var data = " ";
        var listaFichasReservadas = new dataSalud();
            listaFichasReservadas.ci = $scope.nroCi;
            listaFichasReservadas.listaAtencion(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {
                respuestaFichas = resultadoApi.success.data;
                if(respuestaFichas.length>0)
                {
                    var data = respuestaFichas;
                    $scope.tramitesUsuario = respuestaFichas;
                    $scope.lstatencionesvacias = false;
                    $scope.lstatenciones = true;
                }
                else{
                    $scope.lstatencionesvacias = true;
                    $scope.lstatenciones = false;
                }
                $scope.tablareservas.reload();
                $.LoadingOverlay("hide");
            }
            else
            {
                $.LoadingOverlay("hide");
            }
        });
    };

    $scope.tablareservas = new ngTableParams({
        page: 1,
        count: 5 ,
        filter: {},
        sorting: {}
    }, {
        total: $scope.tramitesUsuario.length,
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.tramitesUsuario, params.filter()) :
                $scope.tramitesUsuario;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.$scope.tramitesUsuario;
            params.total(orderedData.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });



    $scope.verificarRegistroPaciente = function () {
        var centralRiesgosSalud = new dataSalud();
        centralRiesgosSalud.ci = $scope.nroCi;
        centralRiesgosSalud.centralRiesgos(function(resultado){
        resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {
                results = resultadoApi.success.data;
                if(results[0].contador > 0)
                {
                    $scope.con_historial = false;
                    $scope.con_central_riesgos = true;
                    $scope.lstatencionesvacias = false;
                    $scope.lstatenciones = false;
                }
                else
                {
                    $scope.tituloHospitales = "";
                    if($scope.tipoCiudadano == "NATURAL")
                    {
                       $scope.con_historial = true;
                       $scope.con_central_riesgos = false;
                       $scope.cargarFichasReservadas();
                    }
                    else
                    {
                       alertify.error('Este Servicio es solo para ciudadanos');
                    }
                }
            }
            else
            {
                alertify.error('error');
            }
        });
    };

    $scope.lstHospital = function(){
        $scope.mostrarFichasReservadas = false;
        $scope.mostrarHospitales = true;
         $scope.pagar_tarjeta = false;
        cargando();
        var listaDatosHospital = new dataSalud();
            listaDatosHospital.ci = $scope.nroCi;
            listaDatosHospital.listaHospitalIgob(function(resultado){
            resultadoApi = JSON.parse(resultado);

            if( typeof(resultadoApi.success) != 'undefined')
            {
                $.LoadingOverlay("hide");
                results = resultadoApi.success.data;
                $scope.hospitales = results;
                $scope.hospitales_vista = true;
                $scope.especialidad_vista = false;
                $scope.lstatenciones = false;

            }
            else
            {
                alertify.error('Porfavor Notificar');
                $.LoadingOverlay("hide");
            }

            $.LoadingOverlay("hide");
        });
    }

    $scope.obtenerDatos = function (){
        cargando();
        var datosCiudadano = new rcNatural();
        datosCiudadano.oid = sessionService.get('IDCIUDADANO');
        datosCiudadano.datosCiudadanoNatural(function(resultado){
            resultadoApi = JSON.parse(resultado);
            $scope.datosPaciente = resultadoApi[0];
            $.LoadingOverlay("hide");
        });
    }

    $scope.confirmacionSI = function(){
        $scope.imagenReferencia = false;
        $scope.vdepartamento = false;
        $scope.vmunicipo = false;
        $scope.vcentro = false;
        $scope.vimagen = false;
        $scope.hoja_referencia = true;
        $scope.hospitales_vista = false;
        $scope.desabilitadoMu = true;
        $scope.img_hoja_referencia = false;
        $scope.listarDepartamentos();
        $('#imgSalida').attr("src","");
        $scope.myFile1 = '';
        $scope.myFile1 = null;
        $scope.institucional = false;
        $scope.ley = true;
        $scope.mostrarPrecios = false;
        $scope.mostrarPreciosLey = true;
        //$scope.$apply();
    }

    $scope.confirmacionNO = function(){
        swal.close();
        $scope.especialidad_vistabtn = true;
        $scope.especialidad_vistabtnreferencia = false;
        $scope.institucional = true;
        $scope.ley = false;
        $scope.seleccionarHospital($scope.datosHospital);
        $scope.hoja_referencia = false;
        $scope.mostrarPrecios = true;
        $scope.mostrarPreciosLey = false;
        //$scope.$apply();
    }

    $scope.preguntarHojadeReferencia = function(datosHospital){
        $scope.datosHospital = datosHospital;
    }

    $scope.seleccionarHospital2 = function(){
        cargando();
        if ($scope.datosPaciente.dtspsl_fec_nacimiento) {
        var fecnac = new Date($scope.datosPaciente.dtspsl_fec_nacimiento);
        var mes = fecnac.getMonth() + 1;
        var dia = fecnac.getDate()
        if(fecnac.getDate()<10){
            dia = "0"+ dia;
        }
        if(fecnac.getMonth()<9){
            mes = "0"+ mes;
        }
        var fechadeNacimiento = fecnac.getFullYear()+"-"+mes+"-"+dia;
        $scope.historia_clinica = $scope.datosHospital.vhsp_hcl_codigoseg;
        $scope.idHospital = $scope.datosHospital.vhsp_id_hospital;
        $scope.codigoSIIS = $scope.datosHospital.vdtspsl_id;
        $scope.id_tipopaciente = $scope.datosHospital.vhsp_id_tipopaciente;
        $scope.codCarpeta = $scope.datosHospital.vhsp_codigocarpeta;
        $scope.nombreHospital = $scope.datosHospital.vhsp_nombre_hospital;
        var listaDatosPaciente = new dataSalud();
            listaDatosPaciente.ci = $scope.nroCi;
            listaDatosPaciente.idHospital = $scope.datosHospital.vhsp_id_hospital
            listaDatosPaciente.datosPaciente(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {   response = resultadoApi.success.data;
                if(response[0].vsexo != undefined || response[0].vsexo != null || response[0].vsexo != ''){
                    var genero = 'M';
                    if(response[0].vsexo == 2){
                        genero = 'F';
                    }
                    else
                    {
                        genero = 'M';
                    }
                    $scope.idHospital = $scope.datosHospital.vhsp_id_hospital;
                    $scope.genero_paciente = genero;
                    $scope.id_tipopaciente = response[0].idtipopaciente;
                    $scope.fecha_nacimiento_paciente = response[0].vfechanacimiento;
                    var listaServiciosHospital = new dataSalud();
                    listaServiciosHospital.genero = $scope.genero_paciente;
                    listaServiciosHospital.idHospital = $scope.idHospital;
                    listaServiciosHospital.idTipoPaciente = $scope.id_tipopaciente;
                    listaServiciosHospital.fechaNacimiento =$scope.fecha_nacimiento_paciente;
                    listaServiciosHospital.listaServicios(function(resultado){
                    resultadoApi = JSON.parse(resultado);
                        if( typeof(resultadoApi.success) != 'undefined')
                        {
                            response = resultadoApi.success.data;
                            $scope.especialidades = response;
                            $scope.hospitales_vista = false;
                            $scope.especialidad_vista = true;
                            $scope.hoja_referencia = false;
                            $scope.especialidad_vistabtnreferencia = true;
                            $scope.especialidad_vistabtn = false;
                            $.LoadingOverlay("hide");
                        }
                    });
                }
                else
                {
                     alertify.error( 'Verificar el sexo');
                }
            }
            $.LoadingOverlay("hide");
        });
      }else {
        alertify.error( 'Verificar la Fecha de Nacimiento');
        $.LoadingOverlay("hide");
      }
    }

    $scope.seleccionarHospital = function(datosHospital){
        cargando();
        if ($scope.datosPaciente.dtspsl_fec_nacimiento) {
        var fecnac = new Date($scope.datosPaciente.dtspsl_fec_nacimiento);
        var mes = fecnac.getMonth() + 1;
        var dia = fecnac.getDate()
        if(fecnac.getDate()<10){
            dia = "0"+ dia;
        }
        if(fecnac.getMonth()<9){
            mes = "0"+ mes;
        }
        var fechadeNacimiento = fecnac.getFullYear()+"-"+mes+"-"+dia;
        $scope.historia_clinica = datosHospital.vhsp_hcl_codigoseg;
        $scope.idHospital = datosHospital.vhsp_id_hospital;
        $scope.codigoSIIS = datosHospital.vdtspsl_id;
        $scope.id_tipopaciente = datosHospital.vhsp_id_tipopaciente;
        $scope.codCarpeta = datosHospital.vhsp_codigocarpeta;
        $scope.nombreHospital = datosHospital.vhsp_nombre_hospital;
        var listaDatosPaciente = new dataSalud();
            listaDatosPaciente.ci = $scope.nroCi;
            listaDatosPaciente.idHospital = datosHospital.vhsp_id_hospital
            listaDatosPaciente.datosPaciente(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {   response = resultadoApi.success.data;
                $scope.datosPacienteSalud = response;
                if(response[0].vsexo != undefined || response[0].vsexo != null || response[0].vsexo != ''){
                    var genero = 'M';
                    if(response[0].vsexo == 2){
                        genero = 'F';
                    }
                    else
                    {
                        genero = 'M';
                    }
                    $scope.idHospital = datosHospital.vhsp_id_hospital;
                    $scope.genero_paciente = genero;
                    $scope.id_tipopaciente = response[0].idtipopaciente;
                    $scope.fecha_nacimiento_paciente = response[0].vfechanacimiento;
                    var listaServiciosHospital = new dataSalud();
                    listaServiciosHospital.genero = $scope.genero_paciente;
                    listaServiciosHospital.idHospital = $scope.idHospital;
                    listaServiciosHospital.idTipoPaciente = $scope.id_tipopaciente;
                    listaServiciosHospital.fechaNacimiento =$scope.fecha_nacimiento_paciente;
                    listaServiciosHospital.listaServicios(function(resultado){
                    resultadoApi = JSON.parse(resultado);
                        if( typeof(resultadoApi.success) != 'undefined')
                        {
                            response = resultadoApi.success.data;
                            $scope.especialidades = response;
                            $scope.hospitales_vista = false;
                            $scope.especialidad_vista = true;
                            $.LoadingOverlay("hide");
                        }
                    });
                }
                else
                {
                     alertify.error('Verificar el sexo');
                }
            }
            $.LoadingOverlay("hide");
        });
      }else {
        alertify.error('Verificar la Fecha de Nacimiento');
        $.LoadingOverlay("hide");
      }
    }

    $scope.seleccionarEspecialidad = function(especialidades){
        $scope.precioConsulta = especialidades.precio;
        if(especialidades.cpcodigo_grupo== 'FI'){
            alertify.error('Especialidad No Disponible. \n\n Pase por el Hospital para reservar una ficha');
        }
        else{

            try{
                var sql = new dataDinamic();
                sql.consulta = 'select itm_sucursal,itm_cod_ur,itm_cod_item,itm_monto from facturacion._tabla_intermedia where itm_hospital_id = '+$scope.datosHospital.vhsp_id_hospital+' and itm_estado = $$A$$ and itm_id_esp_siis = $$'+especialidades.hspcatid+'$$ and itm_idmodulo = $$1$$';
                sql.SqlDinamic(function(res){
                    var x = JSON.parse(res);
                    var resultado = x.success.data;
                    if (resultado[0].sp_dinamico != null)
                    {
                        $scope.datosIntermedio = resultado[0].sp_dinamico[0];
                    }
                    else
                    {
                      alertify.error('No se programaron fichas para esta especialidad');
                    }
                    $.LoadingOverlay("hide");
                });
              }catch(e){
                  $scope.tabla_consultorio = false;
                  $.LoadingOverlay("hide");
                  alertify.error('Error');
              }


            $scope.fechaturnos = " ";
            $scope.fechaturnos = [];
            $scope.fechaDisponible = null;
            $scope.fechaDisponible = '';
            $scope.idServicio = especialidades.hspcatid;
            $scope.cuacodigo = especialidades.cpcuacodigo;
            $scope.vgrucodigo = especialidades.cpid;
            $scope.idServicio = especialidades.hspcatid;
            $scope.especialidad_nombre = especialidades.cpgrupo;
            $scope.codigoespecialidad = especialidades.cpcodigo_grupo;
            cargando();
            try{
              var sql = new dataDinamic();
              sql.consulta = 'SELECT * from cbo_fecha_fichas_igob('+parseInt(especialidades.hspcatid)+','+parseInt($scope.idHospital)+')';
              sql.SqlDinamic(function(res){
                  var x = JSON.parse(res);
                  var resultado = x.success.data;
                  if (resultado[0].sp_dinamico != null)
                  {
                    $scope.medicos_vista = true;
                    $scope.especialidad_vista = false;
                    setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.fechaturnos = resultado[0].sp_dinamico;
                        $scope.fechaDisponible = $scope.fechaturnos[0].tfecha;
                        $scope.listar_medicos_turno($scope.fechaDisponible);
                         });
                     }, 500);
                  }
                  else
                  {
                    alertify.error('No se programaron fichas para esta especialidad');
                  }
                  $.LoadingOverlay("hide");
              });
            }catch(e){
                $scope.tabla_consultorio = false;
                $.LoadingOverlay("hide");
                alertify.error('Error');
            }
        }

    }

    $scope.seleccionarMedico = function(medico){
        cargando();
        var z =  medico.tipoturno.split(' ');
        $scope.tipoTurno = z[1];
        $scope.doctor_nombre = medico.nombredoctor +' '+medico.paternodoctor+' '+medico.maternodoctor;
        var x = medico.consultoriodoctor.split('CE');
        $scope.consultorio_nombre = x[1];
        $scope.idDoctorUsuario = medico.idusuario;
        $scope.idTurnoFicha = medico.idturno;
        try{
          var sql = new dataDinamic();
          sql.consulta = 'SELECT * from sp_lst_verifica_pacientesficha_igob('+$scope.idHospital+','+$scope.codigoSIIS+','+$scope.idTurnoFicha+',$$'+$scope.fechaDisponible+'$$)';
          sql.SqlDinamic(function(res){
              var x = JSON.parse(res);
              var resultado = x.success.data;
              if (resultado[0].sp_dinamico != null)
              {
                $scope.existe = resultado[0].sp_dinamico[0].sp_lst_verifica_pacientesficha_igob;
                if($scope.existe > 0){
                    alertify.error('Usted ya solicito una ficha para esta fecha');
                    $.LoadingOverlay("hide");
                }
                else{
                    try{
                      var cronograma = new dataSalud();
                      cronograma.idHospital = $scope.idHospital;
                      cronograma.idTurno = medico.idturno;
                      cronograma.cronogramaServicio(function(res){
                          var x = JSON.parse(res);
                          var resultado = x.success.data;
                          $scope.fichas = resultado[0].fichas;
                          $scope.fichas_vista = true;
                          $scope.medicos_vista = false;
                          $.LoadingOverlay("hide");
                      });
                      }catch(e){
                        $scope.tabla_consultorio = false;
                        $.LoadingOverlay("hide");
                        alertify.error('Error');
                    }
                }
              }
            });
        }catch(e){
            $.LoadingOverlay("hide");
            alertify.error('Error');
        }
    }

    $scope.listar_medicos_turno = function (fechaInicio){
        $scope.objtMedicosServicios = " ";
        $scope.lstmedicosvacias = false;
        try{
        var sql = new dataDinamic();
        sql.consulta = 'SELECT * from listar_doctor_fecha_servicio('+$scope.idHospital+',$$'+fechaInicio+'$$,$$'+$scope.idServicio+'$$)';
        sql.SqlDinamic(function(res){
            var x = JSON.parse(res);
            var resultado = x.success.data;
            if (resultado[0].sp_dinamico != null)
            {
                $scope.lstmedicosvacias = false;
                $scope.medicos = resultado[0].sp_dinamico;
            }
            else
            {
              $scope.lstmedicosvacias = true;
            }
            $.LoadingOverlay("hide");
        });
        }catch(e){
            $scope.tabla_consultorio = false;
            $.LoadingOverlay("hide");
            alertify.error('Error');
        }
    };

    $scope.listar_medicos_turno_combo = function (fechaInicio){
        cargando();
        $scope.medicos = [];
        $scope.medicos = '';
        $scope.objtMedicosServicios = " ";
        try{
          var sql = new dataDinamic();
          sql.consulta = 'SELECT * from listar_doctor_fecha_servicio('+$scope.idHospital+',$$'+fechaInicio+'$$,$$'+$scope.idServicio+'$$)';
          sql.SqlDinamic(function(res){
              var x = JSON.parse(res);
              var resultado = x.success.data;
              if (resultado[0].sp_dinamico != null)
              {
                $scope.medicos = resultado[0].sp_dinamico;
              }
              else
              {

              }
              $.LoadingOverlay("hide");
          });
        }catch(e){
            $scope.tabla_consultorio = false;
            $.LoadingOverlay("hide");
            alertify.error('Error');
        }
    };

    $scope.asignarFicha = function(datos){
        if($scope.institucional){
            $scope.mostrarPrecio = true;
            $scope.precioM = $scope.precioConsulta;
            $scope.mostrarclick = false;
            $scope.mostrartarjeta = false;
            $scope.mostrarqr = false;
        }
        else{
            $scope.mostrarPrecio = false;
            $scope.precioM = '0';
        }
        cargando();
        var horas = datos.Hora.split('a');
        $scope.hora_inicio = horas[0];
        $scope.hora_fin = horas[1];
        var x = datos.Ficha.split('/');
        $scope.numero_ficha = parseInt(x[1]);
        $scope.codigo_ficha2 = datos.Ficha;
        $scope.codigo_ficha = 'C1 - ' + datos.Ficha;
        $scope.descServicio =  $scope.especialidad_nombre;
        $scope.horario_ficha = datos.Hora;
        $scope.paciente_nombre = sessionService.get('US_NOMBRE')+' '+sessionService.get('US_PATERNO')+' '+sessionService.get('US_MATERNO');
        $scope.final_fichas = true;
        $scope.fichas_vista = false;
        $.LoadingOverlay("hide");
    }

    $scope.volverHospitales = function () {
        $scope.hospitales_vista = true;
        $scope.especialidad_vista = false;
    };

    $scope.volverHospitales2 = function(){
        swal({
         title: "¿Está seguro de salir?",
         text: "Se limpiará la hoja de referencia.",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#55DD6B",confirmButtonText: "SI",
         closeOnConfirm: false,
         closeOnCancel: false ,
         cancelButtonText: "green",cancelButtonText:"NO"
         },
          function(isConfirm){
             if (isConfirm) {
                swal.close();
                $scope.hoja_referencia = false;
                $scope.hospitales_vista = true;
                $scope.$apply();
             } else {
                $scope.$apply();
                swal.close();
             }
        });
    }

    $scope.volverEspecialidades = function(){
        $scope.hospitales_vista = false;
        $scope.especialidad_vista = true;
        $scope.medicos_vista = false;
        if($scope.ley){
            $scope.especialidad_vistabtnreferencia = true;
            $scope.especialidad_vistabtn = false;
        }
        else{
            $scope.especialidad_vistabtnreferencia = false;
            $scope.especialidad_vistabtn = true;
        }
        $scope.medicos = [];
    }

    $scope.volverMedicos = function(){
        $scope.fichas_vista = false;
        $scope.medicos_vista = true;
    }

    $scope.volverFichas = function(){
        $scope.final_fichas = false;
        $scope.fichas_vista = true;
    }

    $scope.limpiarTodo = function(){
        $scope.final_fichas = false;
        $scope.fichas_vista = false;
        $scope.medicos_vista = false;
        $scope.hospitales_vista = true;
        $scope.especialidad_vista = false;
        $scope.hoja_referencia = false;
        $scope.FormularioPago = false;
        $scope.lstatencionesvacias = false;
        $scope.lstatenciones = false;

    }

    $scope.volverHospitalesTabla = function(){
        $scope.formularioPago2 = false;
        $scope.lstatenciones = true;
    }

    $scope.volverFormularioReserva = function(){
        $scope.FormularioPago = false;
        $scope.final_fichas = true;
    }



    $scope.volverHojaReferencia = function (){
       $scope.hoja_referencia = true;
       $scope.especialidad_vista = false;
    }

    $scope.lmpCaptcha = function(datos){
        $scope.ErrorCapcha='';
    }

    $scope.VerificarCapcha = function(datos, prsCI) {
        var captch  = $("#resultadoC").val();
        if(captch.length == 0)
            $scope.ErrorCapchasX = "";
        if(captch.length > 4){
            clearTimeout(tiemporespuesta);
            tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1000);
        }
    };



   


    $scope.entregarFicha = function(){
        cargando();
        var x = $scope.codigo_ficha.split('-');
        var salud = new dataSalud();
        salud.vidpaciente = $scope.codigoSIIS;
        salud.vidservicio = $scope.idServicio;
        salud.vfechaatencion = $scope.fechaDisponible;
        salud.vhabilitacion = "NO";
        salud.vnumeroficha = $scope.numero_ficha;
        salud.vhospitalid = $scope.idHospital;
        salud.vmedicoid = $scope.idDoctorUsuario;
        salud.vturnoid = $scope.idTurnoFicha;
        salud.vcodigoficha = x[1];
        salud.vusuario = $scope.nroCi;
        salud.vhorainicioficha = $scope.hora_inicio;
        salud.vhorafinficha = $scope.hora_fin;
        salud.vtipoconsulta = "C";
        salud.vtipopaciente = "INSTITUCIONAL";
        salud.vcancelo = "NO";
        salud.vnro_fila = "0";
        salud.vhistoria_sice = $scope.historia_clinica;
        salud.vcentro_salu = "3600";
        salud.reservarFichaInternet(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {
                respuestaFicha = resultadoApi.success.data;          
                if(respuestaFicha.length>0)
                {
                    alertify.success('Generación de Ficha exitoso Señor ciudadano,su código de Ficha es '+x[1]+'. \n\n Gracias por usar nuestro servicio.');
                    setTimeout(function () {
                    $scope.$apply(function () {
                    alertify.success('Generación de Ficha exitoso Señor ciudadano,su código de Ficha es '+x[1]+'. \n\n Gracias por usar nuestro servicio.');
                         });
                     }, 5500);
                    $scope.envioCorreo();
                    $scope.cargarFichasReservadas();
                }
                $.LoadingOverlay("hide");
            }
            else
            {
                alertify.error(''+resultadoApi.error.message+'');
                $.LoadingOverlay("hide");
            }
            $.LoadingOverlay("hide");
        });
    }

    $scope.volverReserva = function(){
        $scope.FormularioPago = false;
        $scope.final_fichas = true;
    }

/*/////////////////////////////////////////////////////////////////////////////  PAGO EN LINEA  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

    $scope.pagarOnlinePreguntar1 = function(){
        swal({
            title: "¡Atención!",
            text: "Favor tomar nota de lo siguiente: \n El día de la atención médica usted deberá acudir a su cita al menos 45 minutos antes de la hora programada y pasar por enfermería para la toma de sus signos vitales. \n Debe tener activado su tarjeta de crédito o débito para el pago.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#55DD6B",confirmButtonText: "Continuar",
            closeOnConfirm: false,
            closeOnCancel: false ,
            cancelButtonText: "green",cancelButtonText:"Cancelar"
            },
             function(isConfirm){
                if (isConfirm) {
                   swal.close();
                   $scope.pagoOnline();
                   //$scope.$apply();
                } else {
                 swal.close();
                 $scope.$apply();
                }
            }
        );
    }


    $scope.pagoOnline = function(){
      procesando();
        $scope.htmlIframe = "";
        if($scope.datosPaciente.dtspsl_correo == '' || $scope.datosPaciente.dtspsl_correo == null || $scope.datosPaciente.dtspsl_correo == undefined){
           alertify.error('Para utilizar nuestro servicio de Pago en linea necesitamos su correo electrónico.');
            setTimeout(function () {
            $scope.$apply(function () {
                alertify.error('Debe actualizar su correo electrónico en sus datos personales.');
                 });
             }, 5500);
             $.LoadingOverlay("hide");
        }
        else{
            var formData = '{"Tipo": "generarOdm","razon_social": "'+$scope.datosPaciente.dtspsl_paterno+'","ci_nit": "'+$scope.datosPaciente.dtspsl_ci+'","unidad_recaudadora": "'+$scope.datosIntermedio.itm_cod_ur+'","sucursal": "'+$scope.datosIntermedio.itm_sucursal+'","monto_total": "'+$scope.datosIntermedio.itm_monto+'","detalles": [{    "odm_item_recaudador": "'+$scope.datosIntermedio.itm_cod_item+'",    "odm_pre_unitario": "'+$scope.datosIntermedio.itm_monto+'",    "odm_cantidad": "1",    "odm_sub_total": "'+$scope.datosIntermedio.itm_monto+'"  }],"data": [{}]}';
            $.ajax({
                type        : 'POST',
                url         : urlFum,
                data        : formData,
                dataType    : 'json',
                crossDomain : true,
                headers: {
                  'Content-Type': 'application/json',
                },success: function(dataIN) {
                    var odm = dataIN.data[0].nroodm;
                    var ficha = $scope.codigo_ficha.split('-');
                    try{
                        var sql = new dataDinamic();
                        sql.consulta = 'SELECT * from facturacion.sp_insertar_controlador_pruebas('+$scope.idHospital+','+$scope.datosPacienteSalud[0].idpersona+',1)';
                        sql.SqlDinamic(function(res){
                            var x = JSON.parse(res);
                            var resultado = x.success.data;
                            if (resultado[0].sp_dinamico != null)
                            {
                              var response = resultado[0].sp_dinamico;
                              $scope.codigoFactura = response[0].sp_insertar_controlador_pruebas;
                                var formDataPago = '{"odm":"'+odm+'","total":"'+$scope.datosIntermedio.itm_monto+'","nombres":"'+$scope.datosPaciente.dtspsl_nombres+'","apellidos":"'+$scope.datosPaciente.dtspsl_paterno+' '+$scope.datosPaciente.dtspsl_materno+'","direccion":"'+$scope.datosPaciente.dtspsl_direccion+'","email":"'+$scope.email+'","celular":"'+$scope.datosPaciente.dtspsl_movil+'","sistema":"IGOB","ci_nit":"'+$scope.datosPaciente.dtspsl_ci+'","oid_ciudadano":"'+$scope.datosPaciente._id+'","sucursal_facturacion":'+$scope.datosIntermedio.itm_sucursal+',"id_usuario_facturacion":0, "reprogramacion":"NO", "servicio":"HOSPITAL_IGOB","usuario_fac":"'+$scope.datosHospital.vhsp_usuario+'","clave_fac":"'+$scope.datosHospital.vhsp_contrasenia+'", "nit_factura":"'+$scope.datosPaciente.dtspsl_ci+'","nombre_factura":"'+$scope.datosPaciente.dtspsl_ci+' '+$scope.datosPaciente.dtspsl_paterno+' '+$scope.datosPaciente.dtspsl_materno+'","data_opcional":[{"vidpaciente":'+$scope.datosPacienteSalud[0].idpersona+',"vidservicio":'+$scope.idServicio+',"vfechaatencion":"'+$scope.fechaDisponible+'","vnumeroficha":'+$scope.numero_ficha+',"vhospitalid":'+$scope.idHospital+',"vmedicoid":'+$scope.idDoctorUsuario+',"vturnoid":'+$scope.idTurnoFicha+',"vcodigoficha":"'+ficha[1]+'","vhorainicioficha":"'+$scope.hora_inicio+'","vhorafinficha":"'+$scope.hora_fin+'","vtipoconsulta":"C","vorigen_atencion":"IGOB WEB","vnroodm":"'+odm+'","vhistoria_sice":"'+$scope.historia_clinica+'","codigo_generado":"'+$scope.codigoFactura+'","tipoPago":"TARJETA"}],"items":[{"concepto":"CONSULTA EXTERNA '+$scope.especialidad_nombre+' ","cantidad":1,"monto":"'+$scope.datosIntermedio.itm_monto+'","item_recaudador":'+$scope.datosIntermedio.itm_cod_item+',"unidad_recaudadora":'+$scope.datosIntermedio.itm_cod_ur+'}]}'
                                $.ajax({
                                    type        : 'POST',
                                    url         : urlPagoTarjetaX,
                                    data        : formDataPago,
                                    dataType    : 'json',
                                    crossDomain : true,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    success: function(data) {
                                        var respon = data;
                                        response = respon.formulario;
                                        var printContenidos = "<html>" +  response + "</html>";
                                        var popupWin = window.open('', '_blank', 'width=800,height=800');
                                        popupWin.document.open();
                                        popupWin.document.write('<html><head></head><body>' + printContenidos + '<br><br></html>');
                                        popupWin.document.close();
                                        $scope.cargarFichasReservadas();
                                        $scope.$apply();
                                        $.LoadingOverlay("hide");
                                    },
                                    error: function (xhr, status, error) {
                                        alertify.error('Error Intente de nuevo !!');
                                        $.LoadingOverlay("hide");
                                    }
                                });
                            }
                            else
                            {
                              alertify.error('No se programaron fichas para esta especialidad');
                              $.LoadingOverlay("hide");
                            }

                        });
                    }catch(e){
                        $scope.tabla_consultorio = false;
                        $.LoadingOverlay("hide");
                        alertify.error('Error');
                    }
                },
                error: function (xhr, status, error) {
                  $.LoadingOverlay("hide");
                }
            });
        }
    }




    $scope.addImage=function(e,idFoto){
        cargando();
        $scope.imagenReferencia = true;
        $scope.vimagen = true;
        setTimeout(function(){  
            $scope.idFoto=idFoto;
            var file = e.target.files[0],
            imageType = /image.*/;
            if (!file.type.match(imageType))
                return;
            var reader = new FileReader();
            reader.onload = fileOnload;
            reader.readAsDataURL(file);
                $.LoadingOverlay("hide");
                },1000);
        $.LoadingOverlay("hide");
    };

    function fileOnload(e) {
        var result=e.target.result;
        switch($scope.idFoto) {
            case 0:
            $('#imgSalida').attr("src",result);
            var b64_2 = result.split('data:image/jpeg;base64,');
            $scope.labels2 = b64_2[1];
            break;
            case 1:
            $('#imgSalida1').attr("src",result);
            var b64_1 = result.split('data:image/jpeg;base64,');
            $scope.labelºs1 = b64_1[1];
            break;
        }
    }

    $scope.listarDepartamentos = function () {
        cargando();
        $scope.dptos = "";
        $scope.dptos = [];
        $scope.municipios = "";
        $scope.municipios = [];
        $scope.departamento = "";
        $scope.munici = "";
        $scope.centros = "";
        $scope.centros = [];
        $scope.centro = "";
        var departamentos = new dataSalud();
            departamentos.listarDptos(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {
                respuestaDepartamentos = resultadoApi.success.data;
                if(respuestaDepartamentos.length>0)
                {
                    $scope.dptos = respuestaDepartamentos;
                    $scope.desabilitadoMu = true;
                    $scope.desabilitadoCS = true;
                }
                $.LoadingOverlay("hide");
            }
            else
            {
                $.LoadingOverlay("hide");
            }
        });
    };

    $scope.listarMunicipios = function (dpto) {
        cargando();
        $scope.munici = "";
        $scope.municipios = "";
        $scope.municipios = [];
        $scope.centro = "";
        $scope.centro = null;
        $scope.centros = [];
        $scope.img_hoja_referencia = false;
        $scope.vdepartamento = true;
        $scope.vmunicipo = false;
        $scope.vcentro = false;
        var departamentos = new dataSalud();
            departamentos.vdpto_id = dpto;
            departamentos.listarMunicipios(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {
                respuestaMunicipios = resultadoApi.success.data;
                if(respuestaMunicipios.length>0)
                {
                    $scope.municipios = respuestaMunicipios;
                    $scope.desabilitadoMu = false;
                    $scope.desabilitadoCS = true;
                }
                $.LoadingOverlay("hide");
            }
            else
            {
                $.LoadingOverlay("hide");
            }
        });
    };

    $scope.listarCentros = function (dpto,mun) {
        cargando();
        $scope.vmunicipo = true;
        $scope.vcentro = false;
        $scope.centros = [];
        $scope.centro = null;
        var departamentos = new dataSalud();
            departamentos.vdpto_id = dpto;
            departamentos.vmun_id = mun;
            departamentos.listarCentros(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {
                respuestaCentros = resultadoApi.success.data;
                if(respuestaCentros.length > 0)
                {
                    $scope.centros = respuestaCentros;
                    $scope.desabilitadoCS = false;
                }
                $.LoadingOverlay("hide");
            }
            else
            {
                $.LoadingOverlay("hide");
            }
        });
    };

    $scope.seleccionarCentro = function(datos){
        $scope.vcentro = true;
    }

    $scope.reservarInternetley = function () {
        cargando();
        var variables = $scope.centro.split('-');
        var misDocs = new Array();
        misDocs.push($scope.myFile1);
        var uploadUrl = CONFIG.APIURL+"/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + '/' ;
        var nombreFile = $scope.myFile1.name;
        angular.forEach(misDocs, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                fileUpload.uploadFileToUrl(archivo, uploadUrl);
            }else{
            }
        });
        var cadenaURL = uploadUrl + misDocs[0].name + '?app_name=' + CONFIG.APP_NAME;
        $scope.hojaReferencia = {
            "DEPARTAMENTO":variables[0],
            "MUNICIPIO":variables[1],
            "CENTRO":variables[0],
            "URL_HOJA":cadenaURL
        }
        var x = $scope.codigo_ficha.split('-');
        var salud = new dataSalud();
        salud.vidpaciente = $scope.codigoSIIS;
        salud.vidservicio = $scope.idServicio;
        salud.vfechaatencion = $scope.fechaDisponible;
        salud.vhabilitacion = "NO";
        salud.vnumeroficha = $scope.numero_ficha;
        salud.vhospitalid = $scope.idHospital;
        salud.vmedicoid = $scope.idDoctorUsuario;
        salud.vturnoid = $scope.idTurnoFicha;
        salud.vcodigoficha = x[1];
        salud.vusuario = $scope.nroCi;
        salud.vhorainicioficha = $scope.hora_inicio;
        salud.vhorafinficha = $scope.hora_fin;
        salud.vtipoconsulta = "C";
        salud.vtipopaciente = "LEY";
        salud.vcancelo = "NO";
        salud.vnro_fila = JSON.stringify($scope.hojaReferencia);
        salud.vhistoria_sice = $scope.historia_clinica;
        salud.vcentro_salu = $scope.centro;
        salud.reservarFichaInternet(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {
                respuestaFicha = resultadoApi.success.data;
                if(respuestaFicha.length>0)
                {
                    alertify.success('Generación de Ficha exitoso. Señor ciudadano,su código de Ficha es '+x[1]+'. \n\n Recordarle de pasar por admisiones del hospital y llevar su hoja de referencia para su validación. \n\n Gracias por usar nuestro servicio.');
                    setTimeout(function () {
                    $scope.$apply(function () {
                        alertify.success('Generación de Ficha exitoso. Señor ciudadano,su código de Ficha es '+x[1]+'. \n\n Recordarle de pasar por admisiones del hospital y llevar su hoja de referencia para su validación. \n\n Gracias por usar nuestro servicio.');
                         });
                     }, 5500);
                    $scope.limpiarTodo();
                }
                $.LoadingOverlay("hide");
            }
            else
            {
                alertify.error(''+resultadoApi.error.message+'');
                $.LoadingOverlay("hide");
            }
            $.LoadingOverlay("hide");
        });
    }

/*//////////////////////////////////////////////////////////////////////////////   PAGAR DESPUES DE RESERVAR  /////////////////////////////////////////////////////////////////////////////////*/ 
    $scope.pagarCertificado2 = function(dato){
        swal({
         title: "¿Está seguro de realizar el Pago?",
         text: "Recordarle que su tarjeta debe estar habilitada para el pago en linea.",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#55DD6B",confirmButtonText: "SI",
         closeOnConfirm: false,
         closeOnCancel: false ,
         cancelButtonText: "green",cancelButtonText:"NO"
         },
          function(isConfirm){
            if (isConfirm) {
                swal.close();
                $scope.pagoOnlineDespues(dato);
                $scope.$apply();
            } else {
                swal.close();
            }
        });
    }

    $scope.pagoOnlineDespues = function(dato){
        procesando();
          if(dato.vdtspsl_correo == '' || dato.vdtspsl_correo == null || dato.vdtspsl_correo == undefined){
             alertify.error('Para utilizar nuestro servicio de Pago en linea necesitamos su correo electrónico.');
              setTimeout(function () {
              $scope.$apply(function () {
                  alertify.error('Debe actualizar su correo electrónico en sus datos personales.');
                   });
               }, 5500);
               $.LoadingOverlay("hide");
          }
          else{
              
              var formData = '{"Tipo": "generarOdm","razon_social": "'+dato.vdtspsl_paterno+'","ci_nit": "'+dato.vdtspsl_ci+'","unidad_recaudadora": "'+dato.vitm_cod_ur+'","sucursal": "'+dato.vitm_sucursal+'","monto_total": "'+dato.vitm_monto+'","detalles": [{"odm_item_recaudador": "'+dato.vitm_cod_item+'","odm_pre_unitario": "'+dato.vitm_monto+'","odm_cantidad": "1","odm_sub_total": "'+dato.vitm_monto+'"}],"data": [{}]}';
              $.ajax({
                  type        : 'POST',
                  url         : urlFum,
                  data        : formData,
                  dataType    : 'json',
                  crossDomain : true,
                  headers: {
                    'Content-Type': 'application/json',
                  },success: function(dataIN) {
                      var odm = dataIN.data[0].nroodm;
                      try{
                          var sql = new dataDinamic();
                          sql.consulta = 'SELECT * from facturacion.sp_insertar_controlador_pruebas('+dato.presidhospital+','+dato.presdtspsl_id+',1)';
                          sql.SqlDinamic(function(res){
                              var x = JSON.parse(res);
                              var resultado = x.success.data;
                              if (resultado[0].sp_dinamico != null)
                              {
                                var response = resultado[0].sp_dinamico;
                                var codigoFactura = response[0].sp_insertar_controlador_pruebas;
                                var formDataPago = '{"odm":"'+odm+'","total":"'+dato.vitm_monto+'","nombres":"'+dato.vnombres+'","apellidos":"'+dato.vapellidos+'","direccion":"'+dato.vdtspsl_direccion+'","email":"'+dato.vdtspsl_correo+'","celular":"'+dato.vhsp_telefono+'","sistema":"IGOB","ci_nit":"'+dato.vdtspsl_ci+'","oid_ciudadano":"'+$scope.datosPaciente._id+'","sucursal_facturacion":'+dato.vitm_sucursal+',"id_usuario_facturacion":0, "reprogramacion":"SI", "servicio":"HOSPITAL_IGOB","usuario_fac":"'+dato.vsucrl_nomb_usuario+'","clave_fac":"'+dato.vsucrl_contr_usuario+'", "nit_factura":"'+dato.vdtspsl_ci+'","nombre_factura":"'+dato.vdtspsl_paterno+' '+dato.vdtspsl_materno+'","data_opcional":[{"vidpaciente":'+dato.presdtspsl_id+',"vidservicio":'+dato.espid+',"vfechaatencion":"'+dato.presfecha_atencion+'","vnumeroficha":'+dato.presnumero_ficha+',"vhospitalid":'+dato.presidhospital+',"vmedicoid":'+dato.vusr_id+',"vturnoid":'+dato.presturno_id+',"vcodigoficha":"'+dato.prescodigo_ficha+'","vhorainicioficha":"'+dato.preshora_inicio_ficha+'","vhorafinficha":"'+dato.preshora_fin_ficha+'","vtipoconsulta":"C","vorigen_atencion":"IGOB WEB","vnroodm":"'+odm+'","vhistoria_sice":"'+dato.vhcl_codigoseg+'","codigo_generado":"'+codigoFactura+'","tipoPago":"TARJETA","id_prestacion_reservada":'+dato.presid+'}],"items":[{"concepto":"'+dato.cnsldescripcion+' ","cantidad":1,"monto":"'+dato.vitm_monto+'","item_recaudador":'+dato.vitm_cod_item+',"unidad_recaudadora":'+dato.vitm_cod_ur+'}]}'
                                  $.ajax({
                                        type        : 'POST',
                                        url         : urlPagoTarjetaX,
                                        data        : formDataPago,
                                        dataType    : 'json',
                                        crossDomain : true,
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        success: function(data) {
                                            var respon = data;
                                            response = respon.formulario;
                                            var printContenidos = "<html>" +  response + "</html>";
                                            var popupWin = window.open('', '_blank', 'width=800,height=800');
                                            popupWin.document.open();
                                            popupWin.document.write('<html><head></head><body>' + printContenidos + '<br><br></html>');
                                            popupWin.document.close();
                                            $scope.cargarFichasReservadas();
                                            $scope.$apply();
                                            $.LoadingOverlay("hide");
                                        },
                                        error: function (xhr, status, error) {
                                            alertify.error('Error Intente de nuevo !!');
                                            $.LoadingOverlay("hide");
                                        }
                                    });
                                }
                                else
                                {
                                    alertify.error('No se programaron fichas para esta especialidad');
                                    $.LoadingOverlay("hide");
                                }
  
                            });
                        }catch(e){
                            $scope.tabla_consultorio = false;
                            $.LoadingOverlay("hide");
                            alertify.error('Error');
                    }
                },
                    error: function (xhr, status, error) {
                    $.LoadingOverlay("hide");
                }
            });
        }
    }

    $scope.pagoOnlineAfuera2 = function(datos){
        $scope.vfact_url_factura = "https://testsecureacceptance.cybersource.com/silent/payer_authentication/hybrid?ccaAction=load";
        var printContenidos = "<html>" +
            "<head>" +
            "<style>" +
            ".tabla {" +
            "border: 1px solid black;" +
            "font-size:12px;" +
            "border-collapse:collapse;" +
            "}" +
            ".letra {" +
            "font-size:12px;" +
            "border-collapse:collapse;" +
            "}" +
            "tr:first-child { border-top: none; }" +
            "tr:last-child { border-bottom: none; }" +
            "td:first-child { border-left: none; }" +
            "td:last-child { border-right: none; }" +
            "p { font-size: 11px;" +
            "font-size-adjust: 1; " +
            "}" +
            "</style>" +
            "</head>" +
            "<body>" +
            "<div>" +
            "<FONT FACE='arial'>" +
            "<iframe scrolling='auto' src=" + $scope.vfact_url_factura + " frameborder='0' width='100%' height='100%'></iframe>";
            printContenidos = printContenidos + "</font>" +
            "</div>" +
            "</body>" +
            "</html>";
        var popupWin = window.open('', '_blank', 'width=800,height=800');
        popupWin.document.open()
        popupWin.document.write('<html><head></head><body>' + printContenidos + '<br><br></html>');
        popupWin.document.close();
    }

    $scope.volverM = function(){
        $scope.botonesPregunta = true;
        $scope.tarjetaD = false;
        $scope.qrD = false;
    }

    $scope.pagarOnlinePreguntarQR = function(){
        $scope.imgQR = '';
        $scope.mostrarclick = false;
        $scope.mostrartarjeta = false;
        $scope.mostrarqr = true;
        $scope.institucional = false;
        $scope.volverPago = true;

        $scope.tarjetaD = false;
        $scope.qrD = true;
        $scope.botonesPregunta = false;
    }

    $scope.mostrardatosTarjeta1 = function(){
        $scope.tarjetaD = true;
        $scope.qrD = false;
        $scope.botonesPregunta = false;
    }

    $scope.pagarOnlinePreguntarQR1 = function(){
        swal({
            title: "¡Atención!",
            text: "Favor tomar nota de lo siguiente: \n El día de la atención médica usted deberá acudir a su cita al menos 45 minutos antes de la hora programada y pasar por enfermería para la toma de sus signos vitales. \n Debe tener activado su tarjeta de crédito o débito para el pago.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#55DD6B",confirmButtonText: "Continuar",
            closeOnConfirm: false,
            closeOnCancel: false ,
            cancelButtonText: "green",cancelButtonText:"Cancelar"
            },
             function(isConfirm){
                if (isConfirm) {
                   swal.close();
                   $scope.pagoOnlineQR();
                   $scope.$apply();
                } else {
                 swal.close();
                 $scope.$apply();
                }
           });
    }

    $scope.pagoOnlineQR = function(){
      procesando();
        if($scope.datosPaciente.dtspsl_correo == '' || $scope.datosPaciente.dtspsl_correo == null || $scope.datosPaciente.dtspsl_correo == undefined){
            alertify.error('Para utilizar nuestro servicio de Pago en linea necesitamos su correo electrónico.');
             setTimeout(function () {
             $scope.$apply(function () {
                 alertify.error('Debe actualizar su correo electrónico en sus datos personales.');
                  });
              }, 5500);
         }
         else{
            var formData = '{"Tipo": "generarOdm","razon_social": "'+$scope.datosPaciente.dtspsl_paterno+'","ci_nit": "'+$scope.datosPaciente.dtspsl_ci+'","unidad_recaudadora": "'+$scope.datosIntermedio.itm_cod_ur+'","sucursal": "'+$scope.datosIntermedio.itm_sucursal+'","monto_total": "'+$scope.datosIntermedio.itm_monto+'","detalles": [{    "odm_item_recaudador": "'+$scope.datosIntermedio.itm_cod_item+'",    "odm_pre_unitario": "'+$scope.datosIntermedio.itm_monto+'",    "odm_cantidad": "1",    "odm_sub_total": "'+$scope.datosIntermedio.itm_monto+'"  }],"data": [{}]}';
            $.ajax({
                type        : 'POST',
                url         : urlFum,
                data        : formData,
                dataType    : 'json',
                crossDomain : true,
                headers: {
                  'Content-Type': 'application/json',
                },success: function(dataIN) {
                    var odm = dataIN.data[0].nroodm;
                    var ficha = $scope.codigo_ficha.split('-');
                    try{
                        var sql = new dataDinamic();
                        sql.consulta = 'SELECT * from facturacion.sp_insertar_controlador_pruebas('+$scope.idHospital+','+$scope.datosPacienteSalud[0].idpersona+',1)';
                        sql.SqlDinamic(function(res){
                            var x = JSON.parse(res);
                            var resultado = x.success.data;
                            if (resultado[0].sp_dinamico != null)
                            {
                              var response = resultado[0].sp_dinamico;
                              $scope.codigoFactura = response[0].sp_insertar_controlador_pruebas;
                                var formDataPago = '{"odm":"'+odm+'","total":"1","nombres":"'+$scope.datosPaciente.dtspsl_nombres+'","apellidos":"'+$scope.datosPaciente.dtspsl_paterno+' '+$scope.datosPaciente.dtspsl_materno+'","direccion":"'+$scope.datosPaciente.dtspsl_direccion+'","email":"xcampi3570@gmail.com","celular":"'+$scope.datosPaciente.dtspsl_movil+'","sistema":"IGOB WEB","ci_nit":"'+$scope.datosPaciente.dtspsl_ci+'","uid_ciudadano":"'+$scope.datosPaciente._id+'","sucursal_facturacion":'+$scope.datosIntermedio.itm_sucursal+',"id_usuario_facturacion":0,"cantidad_item1":"","descripcion_item1":"","descripcion_item2":"","cantidad_item2":"","monto_item2":"","descripcion_item3":"","cantidad_item3":"","monto_item3":"","codigo_item1":"","codigo_item2":"","codigo_item3":"'+$scope.datosIntermedio.itm_cod_ur+'","estado_facturacion":"","monto_item1":"","reservado18":"",                                             "servicio":"HOSPITAL_IGOB","items":[{"concepto":"CONSULTA EXTERNA '+$scope.especialidad_nombre+' ","cantidad":1,"monto":"1","item_recaudador":'+$scope.datosIntermedio.itm_cod_item+',"unidad_recaudadora":'+$scope.datosIntermedio.itm_cod_ur+'}],"data_opcional":[{"vidpaciente":'+$scope.datosPacienteSalud[0].idpersona+',"vidservicio":'+$scope.idServicio+',"vfechaatencion":"'+$scope.fechaDisponible+'","vnumeroficha":'+$scope.numero_ficha+',"vhospitalid":'+$scope.idHospital+',"vmedicoid":'+$scope.idDoctorUsuario+',"vturnoid":'+$scope.idTurnoFicha+',"vcodigoficha":"'+ficha[1]+'","vhorainicioficha":"'+$scope.hora_inicio+'","vhorafinficha":"'+$scope.hora_fin+'","vtipoconsulta":"C","vtipoconsulta":"C","vorigen_atencion":"IGOB WEB","vnroodm":"'+odm+'","vhistoria_sice":"'+$scope.historia_clinica+'","codigo_generado":"'+$scope.codigoFactura+'","usr_usuario":"'+$scope.datosHospital.vhsp_usuario+'","usr_clave":"'+$scope.datosHospital.vhsp_contrasenia+'","tipoPago":"TARJETA"}]}';
                                $.ajax({
                                    type        : 'POST',
                                    url         : urlPagoQR,
                                    data        : formDataPago,
                                    dataType    : 'json',
                                    crossDomain : true,
                                    headers: {
                                      'Content-Type': 'application/json',
                                    },success: function(dataIN) {
                                        $scope.imgQR = dataIN.data.qrImage;
                                        setTimeout(function () {
                                           $scope.$apply(function () {
                                               $scope.imgQR = 'data:image/jpeg;base64,'+$scope.imgQR;
                                               alertify.success('Se genero el codigo QR correctamente puede realizar el pago.');
                                               $.LoadingOverlay("hide");

                                           });
                                       }, 1000);

                                       setTimeout(function () {
                                          $scope.$apply(function () {
                                              $scope.cargarFichasReservadas();
                                              $.LoadingOverlay("hide");
                                            });
                                        }, 30000);

                                    },
                                    error: function (xhr, status, error) {
                                      }
                                  });
                            }

                            else
                            {
                              alertify.error('No se programaron fichas para esta especialidad');
                              $.LoadingOverlay("hide");
                            }

                        });
                    }catch(e){
                        $scope.tabla_consultorio = false;
                        $.LoadingOverlay("hide");
                        alertify.error('Error');
                    }
                },
                error: function (xhr, status, error) {
                }
              });
            }
    }

    $scope.pagarOnlinePreguntarClick = function(){

        $scope.mostrarclick = true;
        $scope.mostrartarjeta = false;
        $scope.mostrarqr = false;
        $scope.institucional = false;
        $scope.volverPago = true;
    }

    $scope.pagarOnlinePreguntarClick1 = function(){
        swal({
            title: "¡Atención!",
            text: "Favor tomar nota de lo siguiente: \n El día de la atención médica usted deberá acudir a su cita al menos 45 minutos antes de la hora programada y pasar por enfermería para la toma de sus signos vitales. \n Debe tener activado su tarjeta de crédito o débito para el pago.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#55DD6B",confirmButtonText: "Continuar",
            closeOnConfirm: false,
            closeOnCancel: false ,
            cancelButtonText: "green",cancelButtonText:"Cancelar"
            },
             function(isConfirm){
                if (isConfirm) {
                   swal.close();
                   $scope.pagoOnlineClick();
                   $scope.$apply();
                } else {
                 swal.close();
                 $scope.$apply();
                }
           });
    }

    $scope.pagoOnlineClick = function(){
        if($scope.datosPaciente.dtspsl_correo == '' || $scope.datosPaciente.dtspsl_correo == null || $scope.datosPaciente.dtspsl_correo == undefined){
            alertify.error('Para utilizar nuestro servicio de Pago en linea necesitamos su correo electrónico.');
             setTimeout(function () {
             $scope.$apply(function () {
                 alertify.error('Debe actualizar su correo electrónico en sus datos personales.');
                  });
              }, 5500);
         }
         else{
             var formData = '{"Tipo": "generarOdm","razon_social": "SIIS","ci_nit": "8747897","unidad_recaudadora": "179","sucursal": "154","monto_total": "25","detalles": [{    "odm_item_recaudador": "3690",    "odm_pre_unitario": "25",    "odm_cantidad": "1",    "odm_sub_total": "25"  }],"data": [{}]}';
             $.ajax({
                 type        : 'POST',
                 url         : urlFum,
                 data        : formData,
                 dataType    : 'json',
                 crossDomain : true,
                 headers: {
                   'Content-Type': 'application/json',
                 },success: function(dataIN) {
                     var odm = dataIN.data[0].nroodm;
                     var formDataPago = '{"odm":"'+odm+'","total":4,"nombres":"Juan","apellidos":"Flores Cruz","direccion":"Villa Fatima, Calle Yungas, Nro  90","email":"abigail.rodascoria@gmail.com","celular":"73236689","sistema":"app_igob","ci_nit":"7063060","uid_ciudadano":"5ef5fa33d4bdc57c1400030d","sucursal_facturacion":111,"id_usuario_facturacion":69,"cantidad_item1":"","descripcion_item2":"reserva","cantidad_item2":74831,"monto_item2":"","codigo_item2":"","descripcion_item3":"","cantidad_item3":"","monto_item3":"","codigo_item3":"","codigo_item1":"","estado_facturacion":"","monto_item1":"","reservado18":3594,"descripcion_item1":"8907QWE","servicio":"PARQUEOS_IGOB","latitud":"-17.373846","longitud":"-66.156699","items":[{"id":3594,"monto":4}],"data_opcional":[]}';
                     $.ajax({
                         type        : 'POST',
                         url         : urlPagoClick,
                         data        : formDataPago,
                         dataType    : 'json',
                         crossDomain : true,
                         headers: {
                           'Content-Type': 'application/json',
                         },success: function(dataIN) {
                             alertify.success('Se realizó el pago por Click correctamente');
                         },
                         error: function (xhr, status, error) {
                           }
                       });
                 },
                 error: function (xhr, status, error) {
                   }
               });
            }
    }

    $scope.pagarOnlinePreguntar = function(){
        $scope.mostrarclick = false;
        $scope.mostrartarjeta = true;
        $scope.mostrarqr = false;
        $scope.volverPago = true;
        $scope.institucional = false;
    }

    $scope.revertirFicha = function(datos){
        swal({
         title: "Atención!!",
         text: "¿Está seguro de revertir la ficha.?",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#55DD6B",confirmButtonText: "SI",
         closeOnConfirm: false,
         closeOnCancel: false ,
         cancelButtonText: "green",cancelButtonText:"NO"
         },
          function(isConfirm){
             if (isConfirm) {
                cargando();
                swal.close();
                try{
                  var sql = new dataDinamic();
                  sql.consulta = 'select * from sp_lst_verifica_pacientesficha_revertir(0,'+datos.presidhospital+','+datos.presid+','+datos.presturno_id+','+datos.presnumero_ficha+')';
                  sql.SqlDinamic(function(res){
                      var x = JSON.parse(res);
                      var resultado = x.success.data;
                      if (resultado[0].sp_dinamico != null)
                      {
                        var respuesta = resultado[0].sp_dinamico;
                        $.LoadingOverlay("hide");
                        alertify.success('Se revirtio la ficha con exito');
                        $scope.envioCorreoReversion(datos);
                        $scope.cargarFichasReservadas();
                      }
                      else
                      {
                        $.LoadingOverlay("hide");
                        $scope.datosGrupo = [];
                        alertify.error('No se pudo revertir');
                      }
                      $.LoadingOverlay("hide");
                      $.LoadingOverlay("hide");
                  });
                }catch(e){
                    $scope.tabla_consultorio = false;
                    $.LoadingOverlay("hide");
                    alertify.error('Error al Revertir la ficha');
                }
                $scope.$apply();
             } else {
              swal.close();
              $scope.$apply();
             }
        });
    }

    $scope.volverPagar = function(){
        $scope.volverPago = false;
        $scope.mostrarqr = false;
        $scope.mostrartarjeta = false;
        $scope.mostrarclick = false;
        $scope.institucional = true;
        $scope.imgQR = null;
        $scope.imgQR = '';
    }

    $scope.ocultarIframe = function(){
        $scope.mostrarDatos = true;
        $scope.mostrarIframe = false;
        $scope.datosT = "";
        $scope.pagar_tarjeta = true;
        $scope.final_fichas = false;
    }





    $scope.getReimprimir = function (dataFACT) {
        $scope.abrirmodalFactura = "#impresionFactura";
        $scope.factura = "active";
        $('#factura').attr("src", dataFACT);
    };


    $scope.imprimirFactura = function (factura) {
        var printContenidos = "<html>" +
            "<head>" +
            "<style>" +
            ".tabla {" +
            "border: 1px solid black;" +
            "font-size:12px;" +
            "border-collapse:collapse;" +
            "}" +
            ".letra {" +
            "font-size:12px;" +
            "border-collapse:collapse;" +
            "}" +
            "tr:first-child { border-top: none; }" +
            "tr:last-child { border-bottom: none; }" +
            "td:first-child { border-left: none; }" +
            "td:last-child { border-right: none; }" +
            "p { font-size: 11px;" +
            "font-size-adjust: 1; " +
            "}" +
            "</style>" +
            "</head>" +
            "<body>" +
            "<div>" +
            "<FONT FACE='arial'>" +
            "<iframe scrolling='auto' src=" + factura.vfact_url_factura + " frameborder='0' width='100%' height='100%'></iframe>";
        printContenidos = printContenidos + "</font>" +
            "</div>" +
            "</body>" +
            "</html>";
        var popupWin = window.open('', '_blank', 'width=800,height=800');
        popupWin.document.open()
        popupWin.document.write('<html><head></head><body>' + printContenidos + '<br><br></html>');
        popupWin.document.close();
    }



    $scope.enviarCorreo = function (datosFicha){
      $scope.urlFiles = [{"file":datosFicha.vfact_url_factura,"nombreArchivo":"prueba"}];
      if($scope.datosPaciente.dtspsl_correo){
        swal({
         title: "¿Está seguro de Reenviarse a su correo electrónico: "+ $scope.datosPaciente.dtspsl_correo +" la factura mas su cita médica ?",
         text: "Se enviara a su correo que se tiene regisrado en el igob.",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
         closeOnConfirm: false,
         closeOnCancel: false ,
         cancelButtonText: "green",cancelButtonText:"CANCELAR"
         },
      function(isConfirm){
         if (isConfirm) {
            alertify.success('Se envió el mensaje, revise su correo porfavor.');
            var fd = new FormData();
            fd.set('auto', 'xcampi3570@gmail.com');
            fd.set('nombreEnvia', 'FACTURA RESERVA MÉDICA');
            fd.set('para', $scope.datosPaciente.dtspsl_correo);
            fd.set('asunto', 'CITA MÉDICA');
            fd.set('cuerpo', '<h3>Estimad@ Ciudadan@ su ficha fue cancelada y reservada con exito a continuación le mostramos un detalle de su cita medica:'  +
            '<br> <b>- Hospital :</b> ' + datosFicha.vhsp_nombre_hospital +
            '<br> <b>- Especialidad :</b> '+ datosFicha.cnsldescripcion +
            '<br> <b>- Fecha de Atención :</b> '+ datosFicha.presfecha_atencion +
            '<br> <b>- Ficha: </b>'+ datosFicha.prescodigo_ficha +
            '<br> <b>- Turno: </b>'+ datosFicha.trndescripcion+
            '<br> <b>- Hora:  </b>'+ datosFicha.preshora_inicio_ficha + ' ' + datosFicha.preshora_fin_ficha+
            '</h3>');
            fd.set('ciudadano', $scope.datosPaciente.dtspsl_paterno+' '+$scope.datosPaciente.dtspsl_materno+' '+$scope.datosPaciente.dtspsl_paterno+' '+$scope.datosPaciente.dtspsl_nombres);
            fd.set('mensaje', '');
            fd.set('files',JSON.stringify($scope.urlFiles));
            $.ajax({
              url: urlCorreoAdjunto,
              data: fd,
              processData: false,
              contentType: false,
              type: 'POST',
              success: function(data){
              }
            });
            swal.close();
         } else {
            swal.close();
         }
        });
      }
      else{
      }
    }

    $scope.volver = function(){
        $scope.pagar_tarjeta = false;
        $scope.final_fichas = true;
    }

    $scope.limpiarmodal = function(){
        $scope.datosT = "";
        $scope.mostrarIframe = false;
        $scope.pagar_tarjeta = true;
        $scope.final_fichas = false;
    }

    $scope.pagarT = function(){
        if($scope.datosPaciente.dtspsl_correo == '' || $scope.datosPaciente.dtspsl_correo == null || $scope.datosPaciente.dtspsl_correo == undefined){
            alertify.error('Para utilizar nuestro servicio de Pago en linea necesitamos su correo electrónico.');
             setTimeout(function () {
             $scope.$apply(function () {
                 alertify.error('Debe actualizar su correo electrónico en sus datos personales.');
                  });
              }, 5500);
         }
         else{
            var formData = '{"Tipo": "generarOdm","razon_social": "'+$scope.datosPaciente.dtspsl_paterno+'","ci_nit": "'+$scope.datosPaciente.dtspsl_ci+'","unidad_recaudadora": "'+$scope.datosFuera.vitm_cod_ur+'","sucursal": "'+$scope.datosFuera.vitm_sucursal+'","monto_total": "'+$scope.datosFuera.vitm_monto+'","detalles": [{    "odm_item_recaudador": "'+$scope.datosFuera.vitm_cod_item+'",    "odm_pre_unitario": "'+$scope.datosFuera.vitm_monto+'",    "odm_cantidad": "1",    "odm_sub_total": "'+$scope.datosFuera.vitm_monto+'"  }],"data": [{}]}';
            $.ajax({
                type        : 'POST',
                url         : urlFum,
                data        : formData,
                dataType    : 'json',
                crossDomain : true,
                headers: {
                  'Content-Type': 'application/json',
                },success: function(dataIN) {
                    var odm = dataIN.data[0].nroodm;
                    var x = $scope.datosT.mes_tajeta.split('/');
                    var mes = x[0];
                    var anio = '20'+x[1];
                    var ficha = $scope.datosFuera.prescodigo_ficha.split('-');
                },
                error: function (xhr, status, error) {
                }
              });
         }

    }

    //////////////////////////////////////////////////////////////////////////////////////////////////  ENVIO DE CORREOS  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.envioCorreo = function(){
        var doc = new jsPDF('p','mm',[350, 230]);
        doc.setTextColor(0,0,0);
        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.setDrawColor(100, 100, 0);
        doc.setFont("Noto Sans CJK TC Black");
        doc.setFontSize(12);
        doc.setFontType("bold");
        doc.text(95, 30, $scope.nombreHospital);
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text(70, 35,'FICHA DE ATENCIÓN CONSULTA EXTERNA');              
        doc.text(55, 40, '---------------------------------------------------------------------------------');
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text(110, 45, $scope.codigo_ficha2);
        doc.text(95, 50, $scope.especialidad_nombre);
        doc.setFontSize(12);
        doc.setFontType("");
        doc.text(70, 55,  'Doctor: '+ $scope.doctor_nombre);
        doc.text(70, 60, 'Fecha Atencion: ' + $scope.fechaDisponible); 
        doc.text(70, 65, 'Turno: '+ $scope.tipoTurno );
        doc.text(70, 70, 'Hora: ' + $scope.horario_ficha);
        doc.text(70, 75, 'Historia Clínica SICE:' + $scope.historia_clinica);           
        doc.text(70, 80, 'Paciente: '+ $scope.paciente_nombre);
        doc.text(70, 85,'Tipo Paciente: '+$scope.datosPacienteSalud[0].tipopaciente);
        doc.setFontSize(12);
        doc.setFontType("bold");
        doc.text(55, 90, '----------------------------------------------------------------------------------------------');
        doc.text(110, 95, 'CONSULTA: '+ $scope.precioM +' Bs.');
        doc.text(55, 100,'----------------------------------------------------------------------------------------------');
        doc.text(55, 105, 'Se sugiere que todo paciente debe estar como minimo 15 min antes de la ');
        doc.text(55, 110, 'atencion reservada y recomendable al menos 30 min.Para solicitar su Cita ');
        doc.text(55, 115, 'Medica por Internet ingrese al iGob 24/7 en www.lapaz.bo');
        doc.setFontType("normal");
        var fileEncode = btoa(doc.output());
        var data = {
            "de": $scope.nombreHospital,
            "correo_para": $scope.email,
            "tipo":"Recordatorio de reserva de ficha",
            "nombre_para": $scope.paciente_nombre,
            "body": "Se le recuerda que reservo una ficha en el Hospital Los Pinos para el "+$scope.medicos[0].vfechaatencion+" para "+$scope.medicos[0].consultoriodoctor+", con el Medic@: "+$scope.doctor_nombre+" a las. "+$scope.horario_ficha+" , por favor pase por Caja 45 minutos antes de la Hora reservada, en el caso de no asistir le solicitamos pueda revertir su ficha, llamando al "+$scope.datosHospital.vhsp_telefono+", o mediante el Histórico de Atenciones del Módulo Salud del Igob 24/7.",
            "telefono_de": $scope.datosHospital.vhsp_telefono,
            "atte": $scope.nombreHospital,
            "direccion_de": $scope.datosHospital.vhsp_direccion,
            "files":[{"base":"data:application/pdf;base64,"+fileEncode,"nombre":"ficha.pdf"}]    
        };
        $.ajax({
            type: "POST",
            url: urlCorreo,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 0,
            async: false,
            success: function(response) {
              dataResprcp = JSON.stringify(response);
            },
            error: function (response, status, error) {
              dataResprcp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
            }
        });
    }



    $scope.envioCorreoReversion = function(datos){
        var detalle = "Estimado ciudadano su ficha reservada fue revertida con exito";
        var data = {
            "de": datos.vhsp_nombre_hospital,
            "correo_para": $scope.email,
            "tipo":"Recordatorio de reserva de ficha",
            "nombre_para": datos.vpaciente_siis,
            "body": detalle,
            "telefono_de": datos.vhsp_telefono,
            "atte": datos.vhsp_nombre_hospital,
            "direccion_de": datos.vhsp_direccion,
            "files":[]    
        };
        $.ajax({
            type: "POST",
            url: urlCorreo,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 0,
            async: false,
            success: function(response) {
            },
            error: function (response, status, error) {
              dataResprcp = "{\"error\":{\"message\":\""+response.responseText+"\",\"code\":700}}";
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.$on('api:ready',function(){
        $scope.lstatencionesvacias = true;
        $scope.mostrarFichasReservadas = true;
        $scope.mostrarHospitales = false;
        $scope.obtenerDatos();
       $scope.verificarRegistroPaciente();
    });

    $scope.inicioSalud = function () {
      $scope.lstatencionesvacias = true;
      $scope.mostrarFichasReservadas = true;
      $scope.mostrarHospitales = false;
        $scope.obtenerDatos();
        $scope.verificarRegistroPaciente();
    };
};
