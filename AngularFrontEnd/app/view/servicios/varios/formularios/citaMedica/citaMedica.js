function saludController($scope, $rootScope,$filter, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, sweet,registroLog,ngTableParams,FileUploader,fileUpload, fileUpload1, $sce, $q) {
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
    $scope.dataRechazos = [];
    $scope.hospitales_vista = false;
    $scope.especialidad_vista = false;
    $scope.FormularioPago = false;
    $scope.hoja_referencia = false;
    $scope.img_hoja_referencia = false;
    $scope.lstatencionesvacias = false;
    $scope.lstatenciones = false;
    $scope.mostrarIframe = false;

    $scope.habAcepto = true;
    $scope.habSiguiente = false;
    $scope.obtDatosCiud = [];
    $scope.habPagoQR = false;
    $scope.mensaje = "";
    $scope.abrirmodal = "";
    $scope.qrcodeString = "";

    
    $scope.vectorMensaje = ['Nro. de Proforma:','Nombres:','Apellidos:','Correo Electrónico:','Ciudad:','País:','Especialidad:','Precio (Bs):'];
    if(jsonURLS){
        var urlODM = CONFIG.CONEXION_SIERRA_VALLE + 'v.0.1/sierra/generacion_ODM';
        var urlPagoTarjetaX = CONFIG.CONEXION_PAGOS + 'api/v2/registrarTrx';
        //var urlPagoClick = CONFIG.CONEXION_PAGOS + 'envioPagoClickGamlp';
        var urlPagoQR = CONFIG.CONEXION_PAGOS_QR + 'api/v2/registrarQrBcp';
        var urlCorreo = CONFIG.CONEXION_CORREOS;
        var urlCorreoIgob = CONFIG.CONEXION_CORREOS_IGOB;
        var urlTipDoc = CONFIG.CONEXION_FACTURACION_V2 + 'api/sincronizar/listar';
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
         title: "¿Está seguro de registrarse en el "+ $scope.datosHospital.vhsp_nombre_hospital +" ?",
         text: "Se creará un nuevo historial clínico en este hospital, con los datos que proporcionó.",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#55DD6B",confirmButtonText: "SI",
         closeOnConfirm: false,
         closeOnCancel: false,
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
            historiaSIIS.hospital = $scope.datosHospital.vhsp_id_hospital;
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
            historiaSIIS.vorigen = $scope.datosHospital.vhsp_codigo_hospital;
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
        $scope.datosHospital = datos;
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
                $scope.hospitales = resultadoApi.success.data;
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
        $scope.mensjReferencia = false;
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
        $scope.id_tipopaciente = 1000;
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
                    listaServiciosHospital.idTipoPaciente = 1000;
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
        $scope.precio = "0";
        $scope.precioConsulta = especialidades.precio;
        if(especialidades.cpcodigo_grupo== 'FI'){
            alertify.error('Especialidad No Disponible. \n\n Pase por el Hospital para reservar una ficha');
        }
        else{

            try{
                var sql = new dataDinamic();
                sql.consulta = 'select * from facturacion.sp_lst_datos_servicio('+$scope.datosHospital.vhsp_id_hospital+',$$'+especialidades.hspcatid+'$$,$$1$$)';
                sql.SqlDinamic(function(res){
                    var x = JSON.parse(res);
                    var resultado = x.success.data;
                    if (resultado[0].sp_dinamico != null)
                    {
                        $scope.datosIntermedio = resultado[0].sp_dinamico[0];
                        console.log("monto",$scope.datosIntermedio.vitm_monto);
                        $scope.precio = $scope.datosIntermedio.vitm_monto;
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
                        $scope.fichasAux = resultado[0].fichas;
                        $scope.fichas = [];
                        $scope.position = $scope.fichasAux.length - resultado[0].catidad;
                        for (let i = $scope.position; i <= $scope.fichasAux.length; i++) {
                          $scope.fichas.push($scope.fichasAux[i]);
                        }
                        $scope.fichas_vista = true;
                        $scope.medicos_vista = false;
                        $.LoadingOverlay("hide");
                      });
                      }catch(e){
                        $scope.fichas = [];
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
        $scope.datosFact = {};
        if($scope.institucional){
            $scope.mostrarPrecio = true;
            $scope.precioM = $scope.precioConsulta;
            $scope.mostrarclick = false;
            $scope.mostrartarjeta = false;
            $scope.mostrarqr = false;
            //$scope.institucional = true;
            $scope.institucionalFact = false;
            $scope.datosDelPaciente = true;
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
    $scope.reservaFichaInstitucional = function(){
        $scope.institucional = false;
        $scope.institucionalFact = true;
        $scope.final_fichas = true;
        $scope.datosDelPaciente = false;
        $scope.datosFact = {};
        $scope.tpDocs = [];
        $scope.listarTipDoc();
        $scope.habNit = true;
        $scope.habCi = false;
        $scope.habCEX = false;
        $scope.mensaje = "";
        $scope.datosFact.ci = $scope.datosPaciente.dtspsl_ci;
        $scope.datosFact.nit = $scope.datosPaciente.dtspsl_ci;
        $scope.datosFact.complemento = $scope.datosPaciente.dtspsl_complemento;
        $scope.datosFact.correo = $scope.datosPaciente.dtspsl_correo;
        $scope.datosFact.celular = $scope.datosPaciente.dtspsl_movil;
        $scope.datosFact.razon_social = $scope.datosPaciente.dtspsl_paterno;
    }; 

    $scope.cancelarDatFact = function(){
        $scope.datosFact = {};
    };

    $scope.pagarOnlinePreguntar1 = function(datosFact){
        if (datosFact.tipDoc != null || datosFact.tipDoc != undefined) {
            swal({
                title: "¡Atención!",
                text: "Favor tomar nota de lo siguiente: \n Debe tener activado su tarjeta de crédito o débito para el pago. \n El día de la atención médica usted deberá acudir a su cita: \n * Debe estar 45 minutos antes de la hora programada. \n * Pasar por enfermería para la toma de sus signos vitales.",
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
                       $scope.pagoOnline(datosFact);
                       $scope.$apply();
                    } else {
                     swal.close();
                     $scope.$apply();
                    }
                }
            );
        } else {
            console.log("FALSO");
            alertify.error('Falta llenar los datos para su factura');
        }
    }


    $scope.pagoOnline = function(datosFact){
        if (datosFact.tipDoc == 5) {
            procesando();
            var urlInforCiudd =  CONFIG.CONEXION_FACTURACION_V2 +'api/factura/informacionCiudadano/'+datosFact.nit+'/'+datosFact.tipDoc+'';
            $.ajax({
                type        : 'GET',
                url         : urlInforCiudd,
                data        : {},
                dataType    : 'json',
                crossDomain : true,
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function(data) {
                    respon = data;
                    if (respon.estado == true) {
                        setTimeout(function () {
                            $scope.$apply(function () {
                                if (respon.data.mensaje == 'NIT INEXISTENTE' || respon.data.mensaje == '' || respon.data.mensaje == undefined || respon.data.mensaje == null) {
                                    $scope.mensaje = respon.data.mensaje;
                                    $.LoadingOverlay("hide");
                                    swal({
                                        title: "ERROR!",
                                        text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                                        type: "error",
                                        confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                                        closeOnConfirm: false
                                        },
                                    function(isConfirm){
                                        if (isConfirm) {
                                            swal.close();
                                        }
                                    });
                                    
                                } else {

                                    console.log("GENERAR FACTURA");
                                    $scope.mensaje = respon.data.mensaje;                                    
                                    var ci_nit = "";
                                    if (datosFact.nit != '' && datosFact.nit != null && datosFact.nit != undefined) {
                                        var ci_nit = datosFact.nit;
                                    } else {
                                        
                                        var ci_nit = datosFact.nit;
                                    }
                        
                                    if (datosFact.ci != '' && datosFact.ci != null && datosFact.ci != undefined) {
                                        var ci_nit = datosFact.ci;
                                    } else {
                                        var ci_nit = datosFact.ci;
                                    }
                        
                                    if(datosFact.razon_social != '' && datosFact.razon_social != null && datosFact.razon_social != undefined && datosFact.correo != '' && datosFact.correo != null && datosFact.correo != undefined && datosFact.celular != '' && datosFact.celular != null && datosFact.celular != undefined){
                                        
                                        var vtoken = localStorage.getItem('token_sierra');
                                        $scope.htmlIframe = "";
                                        var det = [
                                            {
                                                "odm_item_recaudador": $scope.datosIntermedio.vitm_cod_item, 
                                                "odm_pre_unitario": $scope.precio, 
                                                "odm_cantidad": 1, 
                                                "odm_sub_total": $scope.precio
                                            }
                                        ];
                                        var formData = {
                                            "razon_social": datosFact.razon_social,
                                            "ci_nit": ci_nit,
                                            "unidad_recaudadora": $scope.datosIntermedio.vitm_cod_ur,
                                            "sucursal": $scope.datosIntermedio.vitm_sucursal,
                                            "monto_total": $scope.precio,
                                            "detalles": det,
                                            "data": {
                                            "gestion_pago": $scope.datosIntermedio.vanio
                                            }
                                        };
                                        
                                        formData = JSON.stringify(formData);
                                        $.ajax({
                                            type        : 'POST',
                                            url         : urlODM,
                                            data        : formData,
                                            dataType    : 'json',
                                            crossDomain : true,
                                            headers: {
                                                'authorization': 'Bearer ' + vtoken,
                                                'Content-Type': 'application/json'
                                            },success: function(dataIN) {
                                                if(dataIN.success.code == 200){
                                                    $scope.nroOdm = dataIN.data.nro_odm;
                                                    var ficha = $scope.codigo_ficha.split('-');
                                                    var formDataPago = {
                                                        "odm": $scope.nroOdm,
                                                        "total": $scope.precio,
                                                        "nombres": $scope.datosPaciente.dtspsl_nombres,
                                                        "apellidos": $scope.datosPaciente.dtspsl_paterno+' '+$scope.datosPaciente.dtspsl_materno,
                                                        "direccion": $scope.datosPaciente.dtspsl_direccion,
                                                        "email": datosFact.correo,
                                                        "celular": datosFact.celular,
                                                        "sistema": "IGOB",
                                                        "ci_nit": ci_nit,
                                                        "oid_ciudadano": $scope.datosPaciente._id,
                                                        "sucursal_facturacion": $scope.datosIntermedio.vitm_sucursal,
                                                        "id_usuario_facturacion": $scope.datosIntermedio.vsucrl_idusu_fact, 
                                                        "reprogramacion": "NO", 
                                                        "servicio": "HOSPITAL_IGOB",
                                                        "nit_factura": ci_nit,
                                                        "nombre_factura": datosFact.razon_social,
                                                        "tipo_documento": datosFact.tipDoc,
                                                        "complemento": datosFact.complemento,
                                                        "data_opcional":[
                                                            {
                                                                "vidpaciente": $scope.datosPacienteSalud[0].idpersona,
                                                                "vidservicio": $scope.idServicio,
                                                                "vfechaatencion": $scope.fechaDisponible,
                                                                "vnumeroficha": $scope.numero_ficha,
                                                                "vhospitalid": $scope.idHospital,
                                                                "vmedicoid": $scope.idDoctorUsuario,
                                                                "vturnoid": $scope.idTurnoFicha,
                                                                "vcodigoficha": ficha[1],
                                                                "vhorainicioficha": $scope.hora_inicio,
                                                                "vhorafinficha": $scope.hora_fin,
                                                                "vtipoconsulta":"C",
                                                                "vorigen_atencion":"IGOB WEB",
                                                                "vnroodm": $scope.nroOdm,
                                                                "vhistoria_sice": $scope.historia_clinica,
                                                                "tipoPago":"TARJETA"
                                                            }
                                                        ],
                                                        "items":[
                                                            {
                                                                "concepto": $scope.datosIntermedio.vitm_desc_item ,
                                                                "cantidad": 1,
                                                                "precio_unitario": $scope.precio,
                                                                "cod_Item_recaudador": $scope.datosIntermedio.vitm_cod_item ,
                                                                "monto_descuento": 0.00,
                                                                "subtotal": $scope.precio,
                                                                "id_item": $scope.datosIntermedio.vitm_siat
                                                            }
                                                        ]
                                                    };
                                                    $.ajax({
                                                        type        : 'POST',
                                                        url         : urlPagoTarjetaX,
                                                        data        : JSON.stringify(formDataPago),
                                                        dataType    : 'json',
                                                        crossDomain : true,
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        },
                                                        success: function(data) {
                                                            var respon = data;
                                                            
                                                            response = respon.formulario;
                                                            var printContenidos = CONFIG.CONEXION_PAGOS + response;
                                                            $.LoadingOverlay("hide");
                                                            var popupWin = window.open(printContenidos, '_blank', 'width=800,height=800');                                                            
                                                            $scope.cargarFichasReservadas();
                                                            $scope.$apply();
                                                            
                                                        },
                                                        error: function (xhr, status, error) {
                                                            alertify.error('Error Intente de nuevo !!');
                                                            $.LoadingOverlay("hide");
                                                        }
                                                    });
                        
                                                }else{
                                                    if (dataIN.error.code == 702) {
                                                        console.log("NO ESTA HABILITADO");
                                                        alertify.error('Unidad recaudadora no habilitada');
                                                        $.LoadingOverlay("hide");
                                                    } else {
                                                        console.log("NO SE SABE");
                                                        alertify.error('Problemas con la generacion del ODM');
                                                        $.LoadingOverlay("hide");
                                                    }
                                                }
                                            },
                                            error: function (xhr, status, error) {
                                            $.LoadingOverlay("hide");
                                            }
                                        });
                                    }else{
                                        alertify.error('Para utilizar nuestro servicio de Pago en linea necesitamos que esten llenados los campos de razon social y correo electrónico.');
                                        setTimeout(function () {
                                        $scope.$apply(function () {
                                            alertify.error('Debe actualizar su correo electrónico en sus datos personales.');
                                            });
                                        }, 5500);
                                        $.LoadingOverlay("hide");
                                    }
                                }
                            });
                        }, 600);

                    } else {
                        $.LoadingOverlay("hide"); 
                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.mensaje = respon.data.mensaje;
                                swal({
                                    title: "ERROR!",
                                    text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                                    type: "error",
                                    confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                                    closeOnConfirm: false
                                    },
                                function(isConfirm){
                                    if (isConfirm) {
                                        swal.close();
                                    }
                                });
                            });
                        }, 600);
                    }               
                },
                error: function (xhr, status, error) {
                    alertify.error('Error Intente de nuevo !!');
                    $.LoadingOverlay("hide");
                }
            });            
        }else{
            console.log("GENERAR FACTURA");                
            procesando();
            var ci_nit = "";
            if (datosFact.nit != '' && datosFact.nit != null && datosFact.nit != undefined) {
                var ci_nit = datosFact.nit;
            } else {
                
                var ci_nit = datosFact.nit;
            }

            if (datosFact.ci != '' && datosFact.ci != null && datosFact.ci != undefined) {
                var ci_nit = datosFact.ci;
            } else {
                var ci_nit = datosFact.ci;
            }

            if(datosFact.razon_social != '' && datosFact.razon_social != null && datosFact.razon_social != undefined && datosFact.correo != '' && datosFact.correo != null && datosFact.correo != undefined && datosFact.celular != '' && datosFact.celular != null && datosFact.celular != undefined){
                var vtoken = localStorage.getItem('token_sierra');
                $scope.htmlIframe = "";
                var det = [
                    {
                        "odm_item_recaudador": $scope.datosIntermedio.vitm_cod_item, 
                        "odm_pre_unitario": $scope.precio, 
                        "odm_cantidad": 1, 
                        "odm_sub_total": $scope.precio
                    }
                ];
                var formData = {
                    "razon_social": datosFact.razon_social,
                    "ci_nit": ci_nit,
                    "unidad_recaudadora": $scope.datosIntermedio.vitm_cod_ur,
                    "sucursal": $scope.datosIntermedio.vitm_sucursal,
                    "monto_total": $scope.precio,
                    "detalles": det,
                    "data": {
                    "gestion_pago": $scope.datosIntermedio.vanio
                    }
                };
                
                formData = JSON.stringify(formData);
                $.ajax({
                    type        : 'POST',
                    url         : urlODM,
                    data        : formData,
                    dataType    : 'json',
                    crossDomain : true,
                    headers: {
                        'authorization': 'Bearer ' + vtoken,
                        'Content-Type': 'application/json'
                    },success: function(dataIN) {
                        if(dataIN.success.code == 200){
                            $scope.nroOdm = dataIN.data.nro_odm;
                            var ficha = $scope.codigo_ficha.split('-');
                            var formDataPago = {
                                "odm": $scope.nroOdm,
                                "total": $scope.precio,
                                "nombres": $scope.datosPaciente.dtspsl_nombres,
                                "apellidos": $scope.datosPaciente.dtspsl_paterno+' '+$scope.datosPaciente.dtspsl_materno,
                                "direccion": $scope.datosPaciente.dtspsl_direccion,
                                "email": datosFact.correo,
                                "celular": datosFact.celular,
                                "sistema": "IGOB",
                                "ci_nit": ci_nit,
                                "oid_ciudadano": $scope.datosPaciente._id,
                                "sucursal_facturacion": $scope.datosIntermedio.vitm_sucursal,
                                "id_usuario_facturacion": $scope.datosIntermedio.vsucrl_idusu_fact, 
                                "reprogramacion": "NO", 
                                "servicio": "HOSPITAL_IGOB",
                                "nit_factura": ci_nit,
                                "nombre_factura": datosFact.razon_social,
                                "tipo_documento": datosFact.tipDoc,
                                "complemento": datosFact.complemento,
                                "data_opcional":[
                                    {
                                        "vidpaciente": $scope.datosPacienteSalud[0].idpersona,
                                        "vidservicio": $scope.idServicio,
                                        "vfechaatencion": $scope.fechaDisponible,
                                        "vnumeroficha": $scope.numero_ficha,
                                        "vhospitalid": $scope.idHospital,
                                        "vmedicoid": $scope.idDoctorUsuario,
                                        "vturnoid": $scope.idTurnoFicha,
                                        "vcodigoficha": ficha[1],
                                        "vhorainicioficha": $scope.hora_inicio,
                                        "vhorafinficha": $scope.hora_fin,
                                        "vtipoconsulta":"C",
                                        "vorigen_atencion":"IGOB WEB",
                                        "vnroodm": $scope.nroOdm,
                                        "vhistoria_sice": $scope.historia_clinica,
                                        "tipoPago":"TARJETA"
                                    }
                                ],
                                "items":[
                                    {
                                        "concepto": $scope.datosIntermedio.vitm_desc_item ,
                                        "cantidad": 1,
                                        "precio_unitario": $scope.precio,
                                        "cod_Item_recaudador": $scope.datosIntermedio.vitm_cod_item ,
                                        "monto_descuento": 0.00,
                                        "subtotal": $scope.precio,
                                        "id_item": $scope.datosIntermedio.vitm_siat
                                    }
                                ]
                            };
                            $.ajax({
                                type        : 'POST',
                                url         : urlPagoTarjetaX,
                                data        : JSON.stringify(formDataPago),
                                dataType    : 'json',
                                crossDomain : true,
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                success: function(data) {
                                    var respon = data;
                                    response = respon.formulario;
                                    var printContenidos = CONFIG.CONEXION_PAGOS + response;
                                    var popupWin = window.open(printContenidos, '_blank', 'width=800,height=800');
                                    $scope.cargarFichasReservadas();
                                    $scope.$apply();
                                    $.LoadingOverlay("hide");
                                },
                                error: function (xhr, status, error) {
                                    alertify.error('Error Intente de nuevo !!');
                                    $.LoadingOverlay("hide");
                                }
                            });

                        }else{
                            if (dataIN.error.code == 702) {
                                console.log("NO ESTA HABILITADO");
                                alertify.error('Unidad recaudadora no habilitada');
                                $.LoadingOverlay("hide");
                            } else {
                                console.log("NO SE SABE");
                                alertify.error('Problemas con la generacion del ODM');
                                $.LoadingOverlay("hide");
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                    $.LoadingOverlay("hide");
                    }
                });
            }else{
                alertify.error('Para utilizar nuestro servicio de Pago en linea necesitamos que esten llenados los campos de razon social y correo electrónico.');
                setTimeout(function () {
                $scope.$apply(function () {
                    alertify.error('Debe actualizar su correo electrónico en sus datos personales.');
                    });
                }, 5500);
                $.LoadingOverlay("hide");
            }
        } 
    }



    $scope.addImage=function(e,idFoto){
        cargando();
        $scope.imagenReferencia = true;
        //$scope.mensjReferencia = false;
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
        $scope.habReferencia = true;
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


/*//////////////////////////////////////////////////////////////////////////////   PAGAR DESPUES DE RESERVAR  /////////////////////////////////////////////////////////////////////////////////*/ 
    $scope.datosparaCobrar = function(dato){
        $scope.datosFichaPaciente = dato;
    };

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
                $scope.pagoOnlineDespues($scope.datosFichaPaciente, dato);
                $scope.$apply();
            } else {
                swal.close();
            }
        });
    }

    $scope.pagoOnlineDespues = function(dato, dato2){
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
                var vtoken = localStorage.getItem('token_sierra');
                var det = [{"odm_item_recaudador": dato.vitm_cod_item, "odm_pre_unitario": dato.vitm_monto, "odm_cantidad": 1, "odm_sub_total": dato.vitm_monto, "odm_concepto": dato.cnsldescripcion}];
                var formData = {
                    "razon_social": dato2.razon_social2,
                    "ci_nit": dato2.nit2,
                    "oidCiudadano": sessionService.get("IDCIUDADANO"),
                    "unidad_recaudadora": dato.vitm_cod_ur,
                    "sucursal": dato.vitm_sucursal,
                    "monto_total": dato.vitm_monto,
                    "detalles": det,
                    "data": {
                      "ID_CIUDADANO": sessionService.get("IDCIUDADANO"),
                      "fecha_recaudacion": dato.vfecha,
                      "nameUsuario": dato.vnombre_supervisor,
                      "idUsuario": dato.vsucrl_idusuario,
                      "tipo_actividad": dato.vactividad,
                      "gestion": dato.vanio,
                      "servicio": "CITA MEDICA"
                    },
                    "odm": 0
                };
                formData = JSON.stringify(formData);
                $.ajax({
                  type        : 'POST',
                  url         : urlODM,
                  data        : formData,
                  dataType    : 'json',
                  crossDomain : true,
                  headers: {
                    'authorization': 'Bearer ' + vtoken,
                    'Content-Type': 'application/json',
                  },success: function(dataIN) {
                      var odm = dataIN.data.nro_odm;
                      try{
                          var sql = new dataDinamic();
                          sql.consulta = 'SELECT * from facturacion.sp_insertar_controlador('+dato.presidhospital+','+dato.presdtspsl_id+',1)';
                          sql.SqlDinamic(function(res){
                              var x = JSON.parse(res);
                              var resultado = x.success.data;
                              if (resultado[0].sp_dinamico != null)
                              {
                                var response = resultado[0].sp_dinamico;
                                var codigoFactura = response[0].codigocontrolador;
                                var formDataPago = '{"odm":"'+odm+'","total":"'+dato.vitm_monto+'","nombres":"'+dato.vnombres+'","apellidos":"'+dato.vapellidos+'","direccion":"'+dato.vdtspsl_direccion+'","email":"'+dato.vdtspsl_correo+'","celular":"'+dato.vhsp_telefono+'","sistema":"IGOB","ci_nit":"'+dato2.nit2+'","oid_ciudadano":"'+$scope.datosPaciente._id+'","sucursal_facturacion":'+dato.vitm_sucursal+',"id_usuario_facturacion":0, "reprogramacion":"SI", "servicio":"HOSPITAL_IGOB","usuario_fac":"'+dato.vsucrl_nomb_usuario+'","clave_fac":"'+dato.vsucrl_contr_usuario+'", "nit_factura":"'+dato2.nit2+'","nombre_factura":"'+dato2.razon_social2+'","data_opcional":[{"vidpaciente":'+dato.presdtspsl_id+',"vidservicio":'+dato.espid+',"vfechaatencion":"'+dato.presfecha_atencion+'","vnumeroficha":'+dato.presnumero_ficha+',"vhospitalid":'+dato.presidhospital+',"vmedicoid":'+dato.vusr_id+',"vturnoid":'+dato.presturno_id+',"vcodigoficha":"'+dato.prescodigo_ficha+'","vhorainicioficha":"'+dato.preshora_inicio_ficha+'","vhorafinficha":"'+dato.preshora_fin_ficha+'","vtipoconsulta":"C","vorigen_atencion":"IGOB WEB","vnroodm":"'+odm+'","vhistoria_sice":"'+dato.vhcl_codigoseg+'","codigo_generado":"'+codigoFactura+'","tipoPago":"TARJETA","id_prestacion_reservada":'+dato.presid+'}],"items":[{"concepto":"'+dato.cnsldescripcion+' ","cantidad":1,"monto":"'+dato.vitm_monto+'","item_recaudador":'+dato.vitm_cod_item+',"unidad_recaudadora":'+dato.vitm_cod_ur+'}]}';
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
                                            var printContenidos = CONFIG.CONEXION_PAGOS + response;
                                            var popupWin = window.open(printContenidos, '_blank', 'width=800,height=800');
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
                 url         : urlODM,
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



    $scope.enviarCorreo = function (){
        //$scope.urlFiles = [{"file":datosFicha.vfact_url_factura, "nombreArchivo":"prueba"}];
        swal({
            title: "¡ENVIO EXISTOSO!",
            text: "Estimado Ciudadano su solicitud está siendo procesada y será validada por personal de Admisiones del Hospital. \n\n\n Le recomendamos revisar su bandeja de mensajes IGob y correo electrónico personal a partir de las 19:00 horas del dia de la reserva. \r\n\n\n Gracias por usar nuestro servicio. \r\n\n ¡Reserva tu Cita y evita la final!",
            type: "success",
            confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
            closeOnConfirm: false
         },
        function(isConfirm){
            if (isConfirm) {
                swal.close();
            }
        });
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
                url         : urlODM,
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
        var fd = new FormData();
        fd.set('de', $scope.nombreHospital);
        fd.set('correo_para', $scope.email);
        fd.set('tipo', 'Recordatorio de reserva de ficha');
        fd.set('nombre_para', $scope.paciente_nombre);
        fd.set('body', 'Se le recuerda que reservo una ficha en el Hospital Los Pinos para el '+$scope.medicos[0].fechasolicitud+' para '+$scope.medicos[0].consultoriodoctor+', con el Medic@: '+$scope.doctor_nombre+' a las. '+$scope.horario_ficha+' , por favor pase por Caja 45 minutos antes de la Hora reservada, en el caso de no asistir le solicitamos pueda revertir su ficha, llamando al '+$scope.datosHospital.vhsp_telefono+', o mediante el Histórico de Atenciones del Módulo Salud del Igob 24/7.');
        fd.set('telefono_de', $scope.datosHospital.vhsp_telefono);
        fd.set('atte', $scope.nombreHospital);
        fd.set('direccion_de', $scope.datosHospital.vhsp_direccion);
        fd.set('files', JSON.stringify([{"base":"data:application/pdf;base64,"+fileEncode,"nombre":"ficha.pdf"}]));
        $.ajax({
            url: urlCorreo,
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
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


    $scope.envioCorreoPacienteSUS = function(){
        var textBody = "<p>Recibiste este mensaje porque realizaste el envio de tu hoja de referencia para su verificacion en el hospital.</p><p>Estar atento a la respuesta de aceptación y asignación de Cita Médica para su atención. por favor</p>";
        var fd = new FormData();
        fd.set('de', $scope.datosHospital.vhsp_nombre_hospital);
        fd.set('correo_para', $scope.datosPaciente.dtspsl_correo);
        fd.set('tipo', 'ENVIO DE HOJA DE REFERENCIA');
        fd.set('nombre_para', $scope.datosPaciente.dtspsl_nombres+' '+$scope.datosPaciente.dtspsl_paterno+' '+$scope.datosPaciente.dtspsl_materno);
        fd.set('body', textBody);
        fd.set('telefono_de', $scope.datosHospital.vhsp_telefono);
        fd.set('atte', $scope.datosHospital.vhsp_nombre_hospital);
        fd.set('direccion_de', $scope.datosHospital.vhsp_direccion);
        fd.set('files', []);
        $.ajax({
            url: urlCorreo,
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                swal({
                    title: "¡ENVIO EXISTOSO!",
                    text: "Estimado Ciudadano su solicitud está siendo procesada y será validada por personal de Admisiones del Hospital. \n\n\n Le recomendamos revisar su bandeja de mensajes IGob y correo electrónico personal a partir de las 19:00 horas del dia de la reserva. \r\n\n\n Gracias por usar nuestro servicio. \r\n\n ¡ Reserva tu Cita y evita la fila !",
                    type: "success",
                    confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                    closeOnConfirm: false
                 },
                function(isConfirm){
                    if (isConfirm) {
                        swal.close();
                    }
                });
            }
        });
    }



    /*  YEISON */

    $scope.getTokenSierraDeportesDefer = function () {
        var data = {
        "usr_usuario":jsonURLS.CREDENCIAL_SIERRA_VALLE.usr_usuario,
        "usr_clave": jsonURLS.CREDENCIAL_SIERRA_VALLE.usr_clave
        };
        var def = $q.defer();
        var urlPagos = jsonURLS.CONEXION_SIERRA_VALLE;
        $.ajax({
        type: 'POST',
        url: urlPagos + "api/apiLogin",
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            def.resolve(response);
        },
        error: function (response, status, error) {
        }
        });
        return def.promise;
    }


    $scope.getTokenSierraServices = async function () {
        var token = await $scope.getTokenSierraDeportesDefer();
        $scope.tokenSierra = token.token;
        localStorage.setItem('token_sierra', token.token)
    }

    /*  YEISON   */
    $scope.pagoQR = function (datosFact) {        
        $scope.imgQR = "";
        var respon = "";
        if (datosFact.tipDoc == 5) {
            procesando();
            var urlInforCiudd =  CONFIG.CONEXION_FACTURACION_V2 +'api/factura/informacionCiudadano/'+datosFact.nit+'/'+datosFact.tipDoc+'';
            $.ajax({
                type        : 'GET',
                url         : urlInforCiudd,
                data        : {},
                dataType    : 'json',
                crossDomain : true,
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function(data) {
                    respon = data;
                    if (respon.estado == true) {
                        setTimeout(function () {
                            $scope.$apply(function () {
                                if (respon.data.mensaje == 'NIT INEXISTENTE' || respon.data.mensaje == '' || respon.data.mensaje == undefined || respon.data.mensaje == null) {
                                    $scope.mensaje = respon.data.mensaje;
                                    swal({
                                        title: "ERROR!",
                                        text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                                        type: "error",
                                        confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                                        closeOnConfirm: false
                                        },
                                    function(isConfirm){
                                        if (isConfirm) {
                                            swal.close();
                                            $.LoadingOverlay("hide");
                                        }
                                    });
                                    
                                } else {

                                    console.log("GENERAR FACTURA");
                                    $scope.mensaje = respon.data.mensaje;
                                    if (datosFact.tipDoc != null || datosFact.tipDoc != undefined) {               
                                        if (datosFact.nit != '' && datosFact.nit != null && datosFact.nit != undefined) {
                                            var ci_nit = datosFact.nit;
                                        } else {     
                                            var ci_nit = datosFact.nit;
                                        }
                                
                                        if (datosFact.ci != '' && datosFact.ci != null && datosFact.ci != undefined) {
                                            var ci_nit = datosFact.ci;
                                        } else {
                                            var ci_nit = datosFact.ci;
                                        }
                        
                                        if(datosFact.razon_social != '' && datosFact.razon_social != null && datosFact.razon_social != undefined && datosFact.correo != '' && datosFact.correo != null && datosFact.correo != undefined && datosFact.celular != '' && datosFact.celular != null && datosFact.celular != undefined){
                                            
                                            console.log("INGRESO POR FACTURA QR NIT");
                                            $scope.qrcodeString = "";                                                                                        
                                            var vtoken = localStorage.getItem('token_sierra');
                                            $scope.abrirmodal = "#modalQr";
                                            var det = [
                                                {
                                                    "odm_item_recaudador": $scope.datosIntermedio.vitm_cod_item, 
                                                    "odm_pre_unitario": $scope.precio, 
                                                    "odm_cantidad": 1, 
                                                    "odm_sub_total": $scope.precio
                                                }
                                            ];
                                            var formData = {
                                                "razon_social": datosFact.razon_social,
                                                "ci_nit": ci_nit,
                                                "unidad_recaudadora": $scope.datosIntermedio.vitm_cod_ur,
                                                "sucursal": $scope.datosIntermedio.vitm_sucursal,
                                                "monto_total": $scope.precio,
                                                "detalles": det,
                                                "data": {
                                                "gestion_pago": $scope.datosIntermedio.vanio
                                                }
                                            };
                                            
                                            formData = JSON.stringify(formData);
                                            $.ajax({
                                                type        : 'POST',
                                                url         : urlODM,
                                                data        : formData,
                                                dataType    : 'json',
                                                crossDomain : true,
                                                headers: {
                                                    'authorization': 'Bearer ' + vtoken,
                                                    'Content-Type': 'application/json'
                                                },success: function(dataIN) {
                                                    if(dataIN.success.code == 200){
                                                        $scope.nroOdm = dataIN.data.nro_odm;
                                                        var ficha = $scope.codigo_ficha.split('-');
                                                        var formDataPago = {
                                                            "odm": $scope.nroOdm,
                                                            "total": $scope.precio,
                                                            "nombres": $scope.datosPaciente.dtspsl_nombres,
                                                            "apellidos": $scope.datosPaciente.dtspsl_paterno+' '+$scope.datosPaciente.dtspsl_materno,
                                                            "direccion": $scope.datosPaciente.dtspsl_direccion,
                                                            "email": datosFact.correo,
                                                            "celular": datosFact.celular,
                                                            "sistema": "IGOB",
                                                            "ci_nit": ci_nit,
                                                            "oid_ciudadano": $scope.datosPaciente._id,
                                                            "sucursal_facturacion": $scope.datosIntermedio.vitm_sucursal,
                                                            "id_usuario_facturacion": $scope.datosIntermedio.vsucrl_idusu_fact, 
                                                            "reprogramacion": "NO", 
                                                            "servicio": "HOSPITAL_IGOB",
                                                            "nit_factura": ci_nit,
                                                            "nombre_factura": datosFact.razon_social,
                                                            "tipo_documento": datosFact.tipDoc,
                                                            "complemento": datosFact.complemento,
                                                            "data_opcional":[
                                                                {
                                                                    "vidpaciente": $scope.datosPacienteSalud[0].idpersona,
                                                                    "vidservicio": $scope.idServicio,
                                                                    "vfechaatencion": $scope.fechaDisponible,
                                                                    "vnumeroficha": $scope.numero_ficha,
                                                                    "vhospitalid": $scope.idHospital,
                                                                    "vmedicoid": $scope.idDoctorUsuario,
                                                                    "vturnoid": $scope.idTurnoFicha,
                                                                    "vcodigoficha": ficha[1],
                                                                    "vhorainicioficha": $scope.hora_inicio,
                                                                    "vhorafinficha": $scope.hora_fin,
                                                                    "vtipoconsulta":"C",
                                                                    "vorigen_atencion":"IGOB WEB",
                                                                    "vnroodm": $scope.nroOdm,
                                                                    "vhistoria_sice": $scope.historia_clinica,
                                                                    "tipoPago":"QR"
                                                                }
                                                            ],
                                                            "items":[
                                                                {
                                                                    "concepto": $scope.datosIntermedio.vitm_desc_item ,
                                                                    "cantidad": 1,
                                                                    "precio_unitario": $scope.precio,
                                                                    "cod_Item_recaudador": $scope.datosIntermedio.vitm_cod_item ,
                                                                    "monto_descuento": 0.00,
                                                                    "subtotal": $scope.precio,
                                                                    "id_item": $scope.datosIntermedio.vitm_siat
                                                                }
                                                            ]
                                                        };
                                                        $.ajax({
                                                            type        : 'POST',
                                                            url         : urlPagoQR,
                                                            data        : JSON.stringify(formDataPago),
                                                            dataType    : 'json',
                                                            crossDomain : true,
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            success: function(data) {
                                                            $scope.imgQR = data.data.qrImage;
                                                                setTimeout(function () {
                                                                    $scope.$apply(function () {
                                                                        $.LoadingOverlay("hide");
                                                                        $scope.qrcodeString = 'data:image/jpeg;base64,'+$scope.imgQR;
                                                                        alertify.success('Se genero el codigo QR correctamente puede realizar el pago.');
                                                                    });
                                                                }, 800);
                                                        
                                                            },
                                                            error: function (xhr, status, error) {
                                                                alertify.error('Error Intente de nuevo !!');
                                                                $.LoadingOverlay("hide");
                                                            }
                                                        });
                                    
                                                    }else{
                                                        if (dataIN.error.code == 702) {
                                                            console.log("NO ESTA HABILITADO");
                                                            alertify.error('Unidad recaudadora no habilitada');
                                                            $.LoadingOverlay("hide");
                                                        } else {
                                                            console.log("NO SE SABE");
                                                            alertify.error('Problemas con la generacion del ODM');
                                                            $.LoadingOverlay("hide");
                                                        }
                                                    }
                                                },
                                                error: function (xhr, status, error) {
                                                $.LoadingOverlay("hide");
                                                }
                                            });
                                        }else{
                                            alertify.error('Para utilizar nuestro servicio de Pago en linea necesitamos Razon social y su correo electrónico.');
                                            setTimeout(function () {
                                                $scope.$apply(function () {
                                                    alertify.error('Debe actualizar su correo electrónico en sus datos personales.');
                                                });
                                            }, 5500);
                                            $.LoadingOverlay("hide");
                                        }
                                    } else {
                                        $scope.qrcodeString = "";
                                        $scope.abrirmodal = "";
                                        alertify.error('Falta Seleccionar el Tipo de Documento');
                                        $.LoadingOverlay("hide");
                                    }
                                }
                            });
                        }, 600);

                    } else { 
                        setTimeout(function () {
                            $scope.$apply(function () {
                                //alertify.error($scope.obtDatosCiud.mensaje);
                                $scope.mensaje = respon.data.mensaje;
                                swal({
                                    title: "ERROR!",
                                    text: "Estimado Ciudadan@ \n\n El NIT que coloco es INEXISTENTE. \n Ingrese un NIT valido por favor.",
                                    type: "error",
                                    confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                                    closeOnConfirm: false
                                    },
                                function(isConfirm){
                                    if (isConfirm) {
                                        swal.close();
                                    }
                                });
                            });
                        }, 600);
                    }               
                },
                error: function (xhr, status, error) {
                    alertify.error('Error Intente de nuevo !!');
                }
            });
        } else {
            console.log("GENERAR FACTURA");
            procesando();
            if (datosFact.tipDoc != null || datosFact.tipDoc != undefined) {               
                if (datosFact.nit != '' && datosFact.nit != null && datosFact.nit != undefined) {
                    var ci_nit = datosFact.nit;
                } else {     
                    var ci_nit = datosFact.nit;
                }
        
                if (datosFact.ci != '' && datosFact.ci != null && datosFact.ci != undefined) {
                    var ci_nit = datosFact.ci;
                } else {
                    var ci_nit = datosFact.ci;
                }

                if(datosFact.razon_social != '' && datosFact.razon_social != null && datosFact.razon_social != undefined && datosFact.correo != '' && datosFact.correo != null && datosFact.correo != undefined && datosFact.celular != '' && datosFact.celular != null && datosFact.celular != undefined){
                    
                    console.log("INGRESO POR FACTURA QR CI");
                    $scope.qrcodeString = "";
                    var vtoken = localStorage.getItem('token_sierra');
                    $scope.abrirmodal = "#modalQr";
                    var det = [
                        {
                            "odm_item_recaudador": $scope.datosIntermedio.vitm_cod_item, 
                            "odm_pre_unitario": $scope.precio, 
                            "odm_cantidad": 1, 
                            "odm_sub_total": $scope.precio
                        }
                    ];
                    var formData = {
                        "razon_social": datosFact.razon_social,
                        "ci_nit": ci_nit,
                        "unidad_recaudadora": $scope.datosIntermedio.vitm_cod_ur,
                        "sucursal": $scope.datosIntermedio.vitm_sucursal,
                        "monto_total": $scope.precio,
                        "detalles": det,
                        "data": {
                        "gestion_pago": $scope.datosIntermedio.vanio
                        }
                    };
                    
                    formData = JSON.stringify(formData);
                    $.ajax({
                        type        : 'POST',
                        url         : urlODM,
                        data        : formData,
                        dataType    : 'json',
                        crossDomain : true,
                        headers: {
                            'authorization': 'Bearer ' + vtoken,
                            'Content-Type': 'application/json'
                        },success: function(dataIN) {
                            if(dataIN.success.code == 200){
                                $scope.nroOdm = dataIN.data.nro_odm;
                                var ficha = $scope.codigo_ficha.split('-');
                                var formDataPago = {
                                    "odm": $scope.nroOdm,
                                    "total": $scope.precio,
                                    "nombres": $scope.datosPaciente.dtspsl_nombres,
                                    "apellidos": $scope.datosPaciente.dtspsl_paterno+' '+$scope.datosPaciente.dtspsl_materno,
                                    "direccion": $scope.datosPaciente.dtspsl_direccion,
                                    "email": datosFact.correo,
                                    "celular": datosFact.celular,
                                    "sistema": "IGOB",
                                    "ci_nit": ci_nit,
                                    "oid_ciudadano": $scope.datosPaciente._id,
                                    "sucursal_facturacion": $scope.datosIntermedio.vitm_sucursal,
                                    "id_usuario_facturacion": $scope.datosIntermedio.vsucrl_idusu_fact, 
                                    "reprogramacion": "NO", 
                                    "servicio": "HOSPITAL_IGOB",
                                    "nit_factura": ci_nit,
                                    "nombre_factura": datosFact.razon_social,
                                    "tipo_documento": datosFact.tipDoc,
                                    "complemento": datosFact.complemento,
                                    "data_opcional":[
                                        {
                                            "vidpaciente": $scope.datosPacienteSalud[0].idpersona,
                                            "vidservicio": $scope.idServicio,
                                            "vfechaatencion": $scope.fechaDisponible,
                                            "vnumeroficha": $scope.numero_ficha,
                                            "vhospitalid": $scope.idHospital,
                                            "vmedicoid": $scope.idDoctorUsuario,
                                            "vturnoid": $scope.idTurnoFicha,
                                            "vcodigoficha": ficha[1],
                                            "vhorainicioficha": $scope.hora_inicio,
                                            "vhorafinficha": $scope.hora_fin,
                                            "vtipoconsulta":"C",
                                            "vorigen_atencion":"IGOB WEB",
                                            "vnroodm": $scope.nroOdm,
                                            "vhistoria_sice": $scope.historia_clinica,
                                            "tipoPago":"QR"
                                        }
                                    ],
                                    "items":[
                                        {
                                            "concepto": $scope.datosIntermedio.vitm_desc_item ,
                                            "cantidad": 1,
                                            "precio_unitario": $scope.precio,
                                            "cod_Item_recaudador": $scope.datosIntermedio.vitm_cod_item ,
                                            "monto_descuento": 0.00,
                                            "subtotal": $scope.precio,
                                            "id_item": $scope.datosIntermedio.vitm_siat
                                        }
                                    ]
                                };
                                $.ajax({
                                    type        : 'POST',
                                    url         : urlPagoQR,
                                    data        : JSON.stringify(formDataPago),
                                    dataType    : 'json',
                                    crossDomain : true,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    success: function(data) {
                                    $scope.imgQR = data.data.qrImage;
                                    setTimeout(function () {
                                        $scope.$apply(function () {
                                            
                                            $scope.qrcodeString = 'data:image/jpeg;base64,'+$scope.imgQR;
                                            alertify.success('Se genero el codigo QR correctamente puede realizar el pago.');
                                            $.LoadingOverlay("hide");
                            
                                            });
                                        }, 300);
                                
                                        setTimeout(function () {
                                            $scope.$apply(function () {
                                                $.LoadingOverlay("hide");
                                            });
                                        }, 30000);
                                    },
                                    error: function (xhr, status, error) {
                                        alertify.error('Error Intente de nuevo !!');
                                        $.LoadingOverlay("hide");
                                    }
                                });
            
                            }else{
                                if (dataIN.error.code == 702) {
                                    console.log("NO ESTA HABILITADO");
                                    alertify.error('Unidad recaudadora no habilitada');
                                    $.LoadingOverlay("hide");
                                } else {
                                    console.log("NO SE SABE");
                                    alertify.error('Problemas con la generacion del ODM');
                                    $.LoadingOverlay("hide");
                                }
                            }
                        },
                        error: function (xhr, status, error) {
                        $.LoadingOverlay("hide");
                        }
                    });
                }else{
                    alertify.error('Para utilizar nuestro servicio de Pago en linea necesitamos Razon social y su correo electrónico.');
                    setTimeout(function () {
                        $scope.$apply(function () {
                            alertify.error('Debe actualizar su correo electrónico en sus datos personales.');
                        });
                    }, 5500);
                    $.LoadingOverlay("hide");
                }
            } else {
                $scope.qrcodeString = "";
                $scope.abrirmodal = "";
                alertify.error('Falta Seleccionar el Tipo de Documento');
                $.LoadingOverlay("hide");
            }
        }
    };


    $scope.startDateOpen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened = true;
    };

    $scope.envioHojaReferencia = function (fecha) {
        $scope.imagenPortada = "";
        $scope.tt = fecha.toString();
        if ($scope.tt.length >= 11) {
            var fec0 = $scope.tt;
            var fecnac = new Date(fec0);
            var mes = fecnac.getMonth() + 1;
            var dia = fecnac.getDate()
            if (fecnac.getDate() < 10) {
                dia = "0" + dia;
            }
            if (fecnac.getMonth() < 9) {
                mes = "0" + mes;
            }
            fechaN = fecnac.getFullYear() + "-" + mes + "-" + dia;
        }
        try{
            var sql = new dataDinamic();
            sql.consulta = 'select now()::Date as fecha, split_part((now()::time)::text,$$.$$,1) as hora';
            sql.SqlDinamic(function(res){
              var x = JSON.parse(res);
              var resultado = x.success.data;
                if (resultado[0].sp_dinamico != null) 
                {
                  $scope.TiempoActual = resultado[0].sp_dinamico;
                  $scope.hora_actual = $scope.TiempoActual[0].hora;
                  $scope.fecha_actual = $scope.TiempoActual[0].fecha;
                  
                }     
            });
        }catch(e){
          sweet.show('', 'Municipio', 'warning');
        }
        $scope.nuevoName = "";
        cargando();
        var variables = $scope.centro.split('-');
        var fechaNuevo = $scope.fecha_actual.split('-');
        var HoraNuevo = $scope.hora_actual.split(':');
        var nameNuevo = $scope.myFile1.name.split('.');
        var nuevoName = "HojaRef_"+fechaNuevo[0]+''+fechaNuevo[1]+''+fechaNuevo[2]+''+HoraNuevo[0]+''+HoraNuevo[1]+''+HoraNuevo[2]+"."+nameNuevo[1]+"";
        var misDocs = new Array();
        misDocs.push($scope.myFile1);
        var uploadUrl = CONFIG.APIURL+"/files/RC_CLI/" + sessionService.get('IDCIUDADANO') + '/salud/' ;
        angular.forEach(misDocs, function(archivo, key) {
            if(typeof(archivo) != 'undefined'){
                fileUpload1.uploadFileToUrl1(archivo, uploadUrl, nuevoName);
            }else{
            }
        });
        var cadenaURL = uploadUrl + nuevoName + '?app_name=' + CONFIG.APP_NAME;
        $scope.hojaReferencia = {
            "DEPARTAMENTO":variables[0],
            "MUNICIPIO":variables[1],
            "CENTRO":variables[0],
            "URL_HOJA":cadenaURL,
            "FECHA_EMISION": fechaN,
            "ORIGEN": "IGOB WEB"
        }
        
        try{
            var sql = new dataDinamic();
            sql.consulta = 'SELECT * from sp_insertar_hoja_referencia('+ $scope.datosHospital.vdtspsl_id +','+ $scope.datosHospital.vhsp_id_hospital +',$$'+ sessionService.get('IDCIUDADANO') +'$$,$$'+ JSON.stringify($scope.hojaReferencia) +'$$)';
            sql.SqlDinamic(function(res){
                var x = JSON.parse(res);
                var resultado = x.success.data;
                if (resultado[0].sp_dinamico != null)
                {
                    alertify.success('¡ENVIO EXISTOSO!. \n Recordarle de pasar por admisiones del hospital y llevar su hoja de referencia para su validación. \n Gracias por usar nuestro servicio.');
                    $.LoadingOverlay("hide");
                    $scope.habReferencia = false;
                    $scope.mensjReferencia = true;
                    //$scope.envioCorreoPacienteSUS();
                    swal({
                        title: "¡ENVIO EXISTOSO!",
                        text: "Estimado Ciudadano su solicitud está siendo procesada y será validada por personal de Admisiones del Hospital. \n\n\n Le recomendamos revisar su bandeja de mensajes IGob y correo electrónico personal a partir de las 19:00 horas del dia de la reserva. \r\n\n\n Gracias por usar nuestro servicio. \r\n\n ¡ Reserva tu Cita y evita la fila !",
                        type: "success",
                        confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                        closeOnConfirm: false
                     },
                    function(isConfirm){
                        if (isConfirm) {
                            swal.close();
                        }
                    });
                }
              });
        }catch(e){
            $.LoadingOverlay("hide");
            alertify.error('Error');
        }
    }


    $scope.tablaRechazos = new ngTableParams({
        page: 1,
        count: 5 ,
        filter: {},
        sorting: {}
    }, {
        total: $scope.dataRechazos.length,
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.dataRechazos, params.filter()) :
                $scope.dataRechazos;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.$scope.dataRechazos;
            params.total(orderedData.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


    $scope.listarFichasRechazadas = function () {
        cargando();
        $scope.mostrarFichasReservadas = true;
        $scope.mostrarHospitales = false;
        $scope.volverPago = false;
        $scope.mostrarqr = false;
        $scope.lstatenciones = true;
        $scope.formularioPago2 = false;
        var data = " ";
        try{
            var sql = new dataDinamic();
            sql.consulta = 'SELECT * from sp_listar_hojas_referencia_rechazadas($$'+ $scope.nroCi +'$$)';
            sql.SqlDinamic(function(res){
                var x = JSON.parse(res);
                var resultado = x.success.data;
                if (resultado[0].sp_dinamico != null)
                {
                    var data = resultado[0].sp_dinamico;
                    $scope.dataRechazos = resultado[0].sp_dinamico;
                    $scope.lstatencionesvacias = false;
                    $scope.lstatenciones = true;
                    $scope.tablaRechazos.reload();
                    $.LoadingOverlay("hide");
                }else
                {
                    $scope.dataRechazos = [];
                    alertify.error('No tiene registros de rechazos');
                    $scope.tablaRechazos.reload();
                    $.LoadingOverlay("hide");
                }
              });
        }catch(e){
            $.LoadingOverlay("hide");
            alertify.error('Error');
        }
    };

    $scope.verHistorico = function (datos) {
        $scope.imgURL = datos.vhjr_datos_referencia.URL_HOJA;
    };

    $scope.interJ = {};

    $scope.inicioDeclaracion = function () {
        $scope.interJ = {uno: false, dos: false, tres: false, cuatro: false};
        $scope.habAcepto = true;
        $scope.habSiguiente = false;
    };

    $scope.acepto = function (interJ) {
        $scope.interJ = {uno: true, dos: true, tres: true, cuatro: true};
        $scope.habAcepto = false;
        $scope.habSiguiente = true;
        $scope.lstHospital();
        $scope.limpiarTodo();
    };


    
    $scope.listarTipDoc = function (){
        $scope.tpDocs = [];
        var formDatatpDoc = '{"dominio":"TipoDocumentoIdentidad"}';
        $.ajax({
            type        : 'POST',
            url         : urlTipDoc,
            data        : formDatatpDoc,
            dataType    : 'json',
            crossDomain : true,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(data) {
                var respon = data;
                if (respon[0] != null || respon[0] != undefined) {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.tpDocs = respon;
                            alertify.success('Listado encontrados !!');
                            $scope.habPagoQR = false;
                        });
                    }, 500);

                } else {
                    $scope.tpDocs = [];
                    alertify.error('Datos no encontrados !!');
                }
                
            },
            error: function (xhr, status, error) {
                alertify.error('Error Intente de nuevo !!');
                //$.LoadingOverlay("hide");
            }
        });
    };



    $scope.seleccionDocumento = function (tipDoc){
        if (tipDoc > 0) {
            $scope.habPagoQR = true;
        } else {
            $scope.habPagoQR = false;
        }

        $scope.mensaje = "";
        $scope.datosFact.ci = "";
        $scope.datosFact.nit = "";
        $scope.datosFact.complemento = "";
        //$scope.datosFact.correo = "";
        //$scope.datosFact.celular = "";
        $scope.datosFact.razon_social = "";

        if (tipDoc == 1) {
            $scope.habNit = false;
            $scope.habCi = true;
            $scope.habCEX = false;
            swal({
                title: "¡ADVERTENCIA!",
                text: "Estimado Ciudadan@ \n\n Una vez colocado el C.I. haga click en el boton BUSCAR, \n para verificar si sus datos son validos",
                type: "warning",
                confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                closeOnConfirm: false
                },
            function(isConfirm){
                if (isConfirm) {
                    swal.close();
                }
            });
        } else {
            if (tipDoc == 2) {
                $scope.habNit = false;
                $scope.habCi = false;
                $scope.habCEX = true;
                swal({
                    title: "¡ADVERTENCIA!",
                    text: "Estimado Ciudadan@ \n\n Una vez colocado el C.I. EXTRANJERO haga click en el boton BUSCAR, \n para verificar si sus datos son validos",
                    type: "warning",
                    confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                    closeOnConfirm: false
                    },
                function(isConfirm){
                    if (isConfirm) {
                        swal.close();
                    }
                });
            } else {
                $scope.habNit = true;
                $scope.habCi = false;
                $scope.habCEX = false;
                swal({
                    title: "¡ADVERTENCIA!",
                    text: "Estimado Ciudadan@ \n\n Una vez colocado el NIT haga click en el boton BUSCAR, \n para verificar si es ACTIVO o INEXISTENTE ",
                    type: "warning",
                    confirmButtonColor: "#55DD6B",confirmButtonText: "CONTINUAR",
                    closeOnConfirm: false
                    },
                function(isConfirm){
                    if (isConfirm) {
                        swal.close();
                    }
                });
            }
        }
        
    };

    $scope.buscarDatosFact = function (evento, tipDoc, nit){
    };

    $scope.buscarDatosFact2 = function (tipDoc, nit){    
        cargando();    
        $scope.obtDatosCiud = [];
        $scope.mensaje = "";
        var urlInforCiudd =  CONFIG.CONEXION_FACTURACION_V2 +'api/factura/informacionCiudadano/'+nit+'/'+tipDoc+'';
        $.ajax({
            type        : 'GET',
            url         : urlInforCiudd,
            data        : {},
            dataType    : 'json',
            crossDomain : true,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(data) {
                var respon = data;
                $scope.obtDatosCiud = respon;
                if (respon.estado == true) {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $.LoadingOverlay("hide");
                            alertify.success($scope.obtDatosCiud.mensaje);
                            $scope.mensaje = $scope.obtDatosCiud.data.mensaje;
                            $scope.datosFact.ci = $scope.obtDatosCiud.data.nit_ci;
                            $scope.datosFact.nit = $scope.obtDatosCiud.data.nit_ci;
                            $scope.datosFact.complemento = $scope.obtDatosCiud.data.complemento;
                            $scope.datosFact.correo = $scope.obtDatosCiud.data.correo;
                            $scope.datosFact.celular = $scope.obtDatosCiud.data.celular;
                            $scope.datosFact.razon_social = $scope.obtDatosCiud.data.razon_social;
                        });
                    }, 600);

                } else { 
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $.LoadingOverlay("hide");
                            alertify.error($scope.obtDatosCiud.mensaje);
                            $scope.mensaje = $scope.obtDatosCiud.data.mensaje;
                            $scope.datosFact.ci = "";
                            $scope.datosFact.nit = "";
                            $scope.datosFact.complemento = "";
                            //$scope.datosFact.correo = "";
                            //$scope.datosFact.celular = "";
                            $scope.datosFact.razon_social = "";
                        });
                    }, 600);
                }
            },
            error: function (xhr, status, error) {
                alertify.error('Error Intente de nuevo !!');
                //alertify.error('Seleccione el Tipo de Documento');
                $.LoadingOverlay("hide");
            }
        });
        
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.$on('api:ready',function(){
        $scope.lstatencionesvacias = true;
        $scope.mostrarFichasReservadas = true;
        $scope.mostrarHospitales = false;
        $scope.obtenerDatos();
        $scope.verificarRegistroPaciente();
        $scope.getTokenSierraServices();
    });

    $scope.inicioSalud = function () {
        $scope.lstatencionesvacias = true;
        $scope.mostrarFichasReservadas = true;
        $scope.mostrarHospitales = false;
        $scope.obtenerDatos();
        $scope.verificarRegistroPaciente();
        $scope.getTokenSierraServices();
    };
};
