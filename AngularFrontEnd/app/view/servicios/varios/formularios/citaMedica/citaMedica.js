function saludController($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, sweet,registroLog,ngTableParams,FileUploader,fileUpload,$sce) {
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
    $scope.vectorMensaje = ['Nro. de Proforma:','Nombres:','Apellidos:','Correo Electrónico:','Ciudad:','País:','Especialidad:','Precio (Bs):'];
    if(jsonURLS){
        //var urlFum = jsonURLS.CONEXION_GENERAR_FUM+"igob247/generarFumOficial.php";
        var urlFum = jsonURLS.CONEXION_GENERAR_FUM+"igob247/generarFumOficial.php";
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
         text: "Favor tomar nota de lo siguiente: \n Con esta ficha debe pasar 30 minutos antes de la atención, directamente por Caja del Hospital y realizar la cancelación del servicio. \n También en el dispensador de fichas del Hospital puede imprimir su ficha con su Carnet de identidad y fecha de nacimiento.",
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
            historiaSIIS.paterno = response.dtspsl_materno;
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
                $.LoadingOverlay("hide");
            }
            else
            {
                $.LoadingOverlay("hide");
            }
        });
    };

  

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

    $scope.volverReserva = function(){
        $scope.FormularioPago = false;
        $scope.final_fichas = true;
    }

    $scope.pagoOnline = function(){
        if($scope.datosPaciente.dtspsl_correo == '' || $scope.datosPaciente.dtspsl_correo == null || $scope.datosPaciente.dtspsl_correo == undefined){
           alertify.error('Para utilizar nuestro servicio de Pago en linea necesitamos su correo electrónico.');
            setTimeout(function () {
            $scope.$apply(function () {
                alertify.error('Debe actualizar su correo electrónico en sus datos personales.');
                 });
             }, 5500); 
        }
        else{
            cargando();
            setTimeout(function () {
            $scope.$apply(function () {
                $.LoadingOverlay("hide");
                 });
             }, 5000); 
            $scope.htmlHospitales2 = "";
            $scope.datosPagoOnline = {};
            $scope.FormularioPago = true;
            $scope.final_fichas = false;
            var UnidadR="";
            var Usuario="";
            switch ($scope.idHospital) {
              case 1:
                UnidadR="43";
                Usuario="50";
              break;
              case 2:
                UnidadR="44";
                Usuario="51";
              break;
              case 3:
                UnidadR="59";
                Usuario="55";
              break;
              case 5:
                UnidadR="58";
                Usuario="54";
              break;
              
            }
            var grupo = $scope.codigoespecialidad;
            //var grupo = 'CE-'+$scope.especialidad_nombre;
            switch (grupo) {
              case "CA"://CARDIOLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000030",descripcion:"CE-CARDIOLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "CG"://CIRUGIA GENERAL
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000031",descripcion:"CE-CIRUGIA GENERAL",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "FI"://FISITOERAPIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000032",descripcion:"CE-FISIOTERAPIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "GO"://GINECO OBSTETRICIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000034",descripcion:"CE-GINECOLOGÍA OBSTETRICIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "MG"://MEDICINA GENERAL
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000035",descripcion:"CE-MEDICINA GENERAL",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "MI"://MEDICINA INTERNA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000036",descripcion:"CE-MEDICINA INTERNA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "NF"://NEFROLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000037",descripcion:"CE-NEFROLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "NU"://NUTRICION
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000038",descripcion:"CE-NUTRICION",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "OD":
                    var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000039",descripcion:"CE-ODONTOLOGÍA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "PE"://PEDIATRIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000040",descripcion:"CE-PEDIATRÍA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "PS"://PSICOLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000041",descripcion:"CE-PSICOLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "TR"://TRAUMATOLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000042",descripcion:"CE-TRAUMATOLOGÍA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};       
              break;
              case "UR"://UROLOGÍA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000043",descripcion:"CE-UROLOGÍA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "GE"://CE-GASTROENTEROLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000044",descripcion:"CE-GASTROENTEROLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "AD"://CE-ATENCIÓN DIFERENCIADA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000045",descripcion:"CE-ATENCION DIFERENCIADA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "MF"://CE- MEDICINA FAMILIAR
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000046",descripcion:"CE-MEDICINA FAMILIAR",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "MFR"://CE - MEDICINA FISICA Y REHABILITACION
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000047",descripcion:"CE-MEDICINA FISICA Y REHABILITACION",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "NE"://CE-NEUMOLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000048",descripcion:"CE-NEUMOLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "RT"://CE - REUMATOLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000049",descripcion:"CE-REUMATOLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "TP"://CE-TRAUMATOLOGIA PEDIATRICA(PROGRAMA PIE EQUINO CAVO VARO)
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000050",descripcion:"CE-TRAUMATOLOGIA PEDIATRICA(PROGRAMA PIE EQUINO CAVO VARO)",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
            }
            var formData = '{"personaId": "-1","clase": "N","gestion": "2018","observaciones": "NINGUNO","UnidadRecaudadoraId": "'+dataFum.idUnidadRecaudadora+'","usuario": "simgep","UsuarioIP": "192.168.5.248.1","equipo": "PAYME","cabecera": "'+dataFum.descripcion+'","itemsCadena": "'+dataFum.idItemRecaudador+'","montosCadena": "'+dataFum.costo+'","tipoActividad": "SIIS"}';
              $.ajax({
               type        : 'POST',            
               url         : urlFum,
               data        : formData,
               dataType    : 'json',
               crossDomain : true,
               headers: {
                 'Content-Type': 'application/json',
               },success: function(dataIN) { 
                    var fum = dataIN.RegistrarFUMMResult;
                    var loginToken = new gLogin();
                    loginToken.login(function(resultado){
                          var resultado1 = JSON.parse(resultado);
                          sessionService.set('TOKEN_SALUD', resultado1.token);
                          var formData = {"ci":$scope.nroCi,"idfum":fum,"nombres":$scope.nombrePersona,"apellidos":$scope.appaternoPersona+' '+$scope.apmaternoPersona,"correo":$scope.email,"total":dataFum.costoPayme,"cabecera":dataFum.descripcion,"direccion":$scope.datosPaciente.dtspsl_direccion,"tipoServicio":"HOSPITAL_IGOB","ci_nit":$scope.nroCi,"idUsuario":Usuario,"idSucursal":UnidadR,"efectivo":dataFum.costo,"cantidad":1,"concepto":dataFum.descripcion,"totalFactura":dataFum.costo,"oid":$scope.idCiudadano,"vidpaciente":$scope.codigoSIIS,"vidservicio":$scope.idServicio,"vfechaatencion":$scope.fechaDisponible,"vhabilitacion":"SI","vnumeroficha":$scope.numero_ficha,"vhospitalid":$scope.idHospital,"vmedicoid":$scope.idDoctorUsuario,"vturnoid":$scope.idTurnoFicha,"vcodigoficha":$scope.codigo_ficha,"vusuario":$scope.nroCi,"vhorainicioficha":$scope.hora_inicio,"vhorafinficha":$scope.hora_fin,"vtipoconsulta":"C","vtipopaciente":"INSTITUCIONAL","vcancelo":"SI","vnro_fila":"0","vhistoria_sice":$scope.historia_clinica,"vcentro_salud":""};
                          var idtoken =   sessionService.get('TOKEN_SALUD');
                          var stoquen =  'Bearer <\\\"' + idtoken + '\\\">';        
                          $.ajax({
                            type        : 'POST',            
                            url         : 'https://pagonline.lapaz.bo/api/consumoWalletEnvioSalud',
                            data        : formData,
                            dataType    : 'json',
                            crossDomain : true,
                            headers: {
                                'authorization': stoquen
                            },             
                            success     : function(data) {
                                 var params = { 'acquirerId' : '35',
                                   'idCommerce' :'6935',
                                   'purchaseOperationNumber':data.DatosCliente.idfum,
                                   'purchaseAmount':data.DatosCliente.purchaseAmount,
                                   'purchaseCurrencyCode':'068',
                                   'language':'SP',
                                   'shippingFirstName':data.DatosCliente.nombres,
                                   'shippingLastName':data.DatosCliente.apellidos,
                                   'shippingEmail':data.DatosCliente.correo,
                                   'shippingAddress':$scope.datosPaciente.dtspsl_direccion,
                                   'shippingZIP':'33',
                                   'shippingCity':'La Paz',
                                   'shippingState':'La Paz',
                                   'shippingCountry':'BO',
                                   'userCommerce':data.DatosCliente.identificacion,
                                   'userCodePayme':data.ConsumoWallet.codAsoCardHolderWallet,
                                   'descriptionProducts':data.DatosCliente.concepto,
                                   'programmingLanguage':'PHP',
                                   'reserved1':data.DatosCliente.idfum,
                                   'reserved2':data.DatosCliente.tipoServicio,
                                   'reserved3':data.DatosCliente.ci_nit,
                                   'reserved4':data.DatosCliente.idUsuario,
                                   'reserved5':data.DatosCliente.idSucursal,
                                   'reserved6':data.DatosCliente.efectivo,
                                   'reserved7':data.DatosCliente.cantidad,
                                   'reserved8':data.DatosCliente.concepto,
                                   'reserved9':data.DatosCliente.totalFactura,
                                   'reserved10':data.DatosCliente.oid,
                                   'reserved11':data.DatosCliente.vidpaciente,
                                   'reserved12':data.DatosCliente.vidservicio,
                                   'reserved13':data.DatosCliente.vfechaatencion,
                                   'reserved14':data.DatosCliente.vhabilitacion,
                                   'reserved15':data.DatosCliente.vnumeroficha,
                                   'reserved16':data.DatosCliente.vhospitalid,
                                   'reserved17':data.DatosCliente.vmedicoid,
                                   'reserved18':data.DatosCliente.vturnoid,
                                   'reserved19':data.DatosCliente.vcodigoficha,
                                   'reserved20':data.DatosCliente.vusuario,
                                   'reserved21':data.DatosCliente.vhorainicioficha,
                                   'reserved22':data.DatosCliente.vhorafinficha,
                                   'reserved23':data.DatosCliente.vtipoconsulta,
                                   'reserved24':data.DatosCliente.vtipopaciente,
                                   'reserved25':data.DatosCliente.vcancelo,
                                   'reserved26':data.DatosCliente.vnro_fila,
                                   'reserved27':data.DatosCliente.vhistoria_sice,
                                   'reserved28':data.DatosCliente.vcentro_salud,
                                   'purchaseVerification':data.DatosCliente.purchaseVerification,
                                };

                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'<form id="frmVPOS2" action="https://vpayment.verifika.com/VPOS2/faces/pages/startPayme.xhtml" class="form-horizontal" method="post" name="frmVPOS2" target="_blank">';
                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'<div style="padding-left:50px;padding-right:50px" class="row">';
                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'<div class="col-md-12">';
                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'<div class="form-group">';
                                var i = 0;
                                angular.forEach(params,function(celda, fila){
                                    
                                    if(fila == 'shippingFirstName' || fila == 'shippingLastName' || fila == 'shippingEmail' || fila == 'descriptionProducts' || fila == 'shippingCity' || fila == 'shippingCountry' || fila == 'purchaseOperationNumber' || fila == 'reserved6'){
                                        $scope.htmlHospitales2 = $scope.htmlHospitales2+'<div class="col-md-6">';
                                        $scope.htmlHospitales2 = $scope.htmlHospitales2+'<label for="title">'+$scope.vectorMensaje[i]+'</label>';
                                        $scope.htmlHospitales2 = $scope.htmlHospitales2+'<div class="controls">';
                                        $scope.htmlHospitales2 = $scope.htmlHospitales2+'<input readOnly = "readonly" value="'+celda+'" id="'+fila+'" name="'+fila+'" class="form-control" type="text">';   
                                        $scope.htmlHospitales2 = $scope.htmlHospitales2+'</div>';
                                        $scope.htmlHospitales2 = $scope.htmlHospitales2+'</div>';
                                        i = i+1;
                                    }
                                    else{
                                    }
                                    
                                });

                                angular.forEach(params,function(celda, fila){
                                    if(fila != 'shippingFirstName' && fila != 'shippingLastName' && fila != 'shippingEmail' && fila != 'descriptionProducts' && fila != 'shippingCity' && fila != 'shippingCountry' && fila != 'purchaseOperationNumber'){
                                        $scope.htmlHospitales2 = $scope.htmlHospitales2+'<div class="col-md-12">';
                                        $scope.htmlHospitales2 = $scope.htmlHospitales2+'<div class="controls">';
                                        $scope.htmlHospitales2 = $scope.htmlHospitales2+'<input style="visibility: hidden;" value="'+celda+'" id="'+fila+'" name="'+fila+'" class="form-control" type="text">';
                                        $scope.htmlHospitales2 = $scope.htmlHospitales2+'</div>';
                                        $scope.htmlHospitales2 = $scope.htmlHospitales2+'</div>';
                                    }
                                    else{
                                    }
                                    
                                });

                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'</div>';
                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'</div>';
                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'</div>';
                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'</form>';
                                $scope.FormularioPago = true;
                                $scope.formularioPago2 = true;
                                $scope.lstatenciones = false;
                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'</div>';
                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'</div>';
                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'</div>';
                                $scope.htmlHospitales2 = $scope.htmlHospitales2+'</form>';
                                $scope.$apply();
                            },
                            error: function (xhr, status, error) {
                                alertify.error('Error Intente de nuevo !!');
                            }
                        });
                    });
               },          
               error: function (xhr, status, error) {
                 }
             });
            }
    }
    
    $scope.pagoOnlineAfuera = function(){
        if($scope.datosPaciente.dtspsl_correo == '' || $scope.datosPaciente.dtspsl_correo == null || $scope.datosPaciente.dtspsl_correo == undefined){
           alertify.error('Para utilizar nuestro servicio de Pago en linea necesitamos su correo electrónico.');
            setTimeout(function () {
            $scope.$apply(function () {
                alertify.error('Debe actualizar su correo electrónico en sus datos personales.');
                 });
             }, 5500); 
        }
        else{
            cargando();
            setTimeout(function () {
            $scope.$apply(function () {
                $.LoadingOverlay("hide");
                 });
             }, 5000); 
            $scope.htmlHospitales = "";
            $scope.datosPagoOnline = {};
            $scope.FormularioPago = true;
            $scope.final_fichas = false;
            var UnidadR="";
            var Usuario="";
            switch ($scope.idHospital) {
              case 1:
                UnidadR="43";
                Usuario="50";
              break;
              case 2:
                UnidadR="44";
                Usuario="51";
              break;
              case 3:
                UnidadR="59";
                Usuario="55";
              break;
              case 5:
                UnidadR="58";
                Usuario="54";
              break;
              
            }
            var grupo = $scope.codigoespecialidad;
            console.log($scope.codigoespecialidad);
            //var grupo = 'CE-'+$scope.especialidad_nombre;
            switch (grupo) {
              case "CA"://CARDIOLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000030",descripcion:"CE-CARDIOLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "CG"://CIRUGIA GENERAL
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000031",descripcion:"CE-CIRUGIA GENERAL",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "FI"://FISITOERAPIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000032",descripcion:"CE-FISIOTERAPIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "GO"://GINECO OBSTETRICIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000034",descripcion:"CE-GINECOLOGÍA OBSTETRICIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "MG"://MEDICINA GENERAL
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000035",descripcion:"CE-MEDICINA GENERAL",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "MI"://MEDICINA INTERNA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000036",descripcion:"CE-MEDICINA INTERNA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "NF"://NEFROLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000037",descripcion:"CE-NEFROLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "NU"://NUTRICION
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000038",descripcion:"CE-NUTRICION",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "OD":
                    var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000039",descripcion:"CE-ODONTOLOGÍA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "PE"://PEDIATRIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000040",descripcion:"CE-PEDIATRÍA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "PS"://PSICOLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000041",descripcion:"CE-PSICOLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "TR"://TRAUMATOLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000042",descripcion:"CE-TRAUMATOLOGÍA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};       
              break;
              case "UR"://UROLOGÍA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000043",descripcion:"CE-UROLOGÍA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "GE"://CE-GASTROENTEROLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000044",descripcion:"CE-GASTROENTEROLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "AD"://CE-ATENCIÓN DIFERENCIADA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000045",descripcion:"CE-ATENCION DIFERENCIADA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "MF"://CE- MEDICINA FAMILIAR
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000046",descripcion:"CE-MEDICINA FAMILIAR",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "MFR"://CE - MEDICINA FISICA Y REHABILITACION
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000047",descripcion:"CE-MEDICINA FISICA Y REHABILITACION",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "NE"://CE-NEUMOLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000048",descripcion:"CE-NEUMOLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "RT"://CE - REUMATOLOGIA
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000049",descripcion:"CE-REUMATOLOGIA",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
              case "TP"://CE-TRAUMATOLOGIA PEDIATRICA(PROGRAMA PIE EQUINO CAVO VARO)
                 var dataFum={idUnidadRecaudadora:UnidadR,unidadRecaudadora:$scope.nombreHospital,idItemRecaudador:"9000050",descripcion:"CE-TRAUMATOLOGIA PEDIATRICA(PROGRAMA PIE EQUINO CAVO VARO)",gestion:"2018",costo:"25.00",costoPayme:"2500",estado:"V",UsuarioFac:Usuario};
              break;
            }

            var formData = '{"personaId": "-1","clase": "N","gestion": "2018","observaciones": "NINGUNO","UnidadRecaudadoraId": "'+dataFum.idUnidadRecaudadora+'","usuario": "simgep","UsuarioIP": "192.168.5.248.1","equipo": "PAYME","cabecera": "'+dataFum.descripcion+'","itemsCadena": "'+dataFum.idItemRecaudador+'","montosCadena": "'+dataFum.costo+'","tipoActividad": "SIIS"}';
              $.ajax({
               type        : 'POST',            
               url         : urlFum,
               data        : formData,
               dataType    : 'json',
               crossDomain : true,
               headers: {
                 'Content-Type': 'application/json',
               },success: function(dataIN) { 
                    var fum = dataIN.RegistrarFUMMResult;
                    var loginToken = new gLogin();
                    loginToken.login(function(resultado){
                          var resultado1 = JSON.parse(resultado);
                          sessionService.set('TOKEN_SALUD', resultado1.token);
                          var formData = {"ci":$scope.nroCi,"idfum":fum,"nombres":$scope.nombrePersona,"apellidos":$scope.appaternoPersona+' '+$scope.apmaternoPersona,"correo":$scope.email,"total":dataFum.costoPayme,"cabecera":dataFum.descripcion,"direccion":$scope.datosPaciente.dtspsl_direccion,"tipoServicio":"HOSPITAL_IGOB_RESERVA","ci_nit":$scope.nroCi,"idUsuario":Usuario,"idSucursal":UnidadR,"efectivo":dataFum.costo,"cantidad":1,"concepto":dataFum.descripcion,"totalFactura":dataFum.costo,"oid":$scope.idCiudadano,"vidpaciente":$scope.codigoSIIS,"vidservicio":$scope.idServicio,"vfechaatencion":$scope.fechaDisponible,"vhabilitacion":"SI","vnumeroficha":$scope.numero_ficha,"vhospitalid":$scope.idHospital,"vmedicoid":$scope.idDoctorUsuario,"vturnoid":$scope.idTurnoFicha,"vcodigoficha":$scope.codigo_ficha,"vusuario":$scope.nroCi,"vhorainicioficha":$scope.hora_inicio,"vhorafinficha":$scope.hora_fin,"vtipoconsulta":"C","vtipopaciente":"INSTITUCIONAL","vcancelo":"SI","vnro_fila":"0","vhistoria_sice":$scope.historia_clinica,"vcentro_salud":"","id_pres":$scope.pres_id};
                          var idtoken =   sessionService.get('TOKEN_SALUD');
                          var stoquen =  'Bearer <\\\"' + idtoken + '\\\">';        
                          $.ajax({
                            type        : 'POST',            
                            url         : 'https://pagonline.lapaz.bo/api/consumoWalletEnvioSalud',
                            data        : formData,
                            dataType    : 'json',
                            crossDomain : true,
                            headers: {
                                'authorization': stoquen
                            },             
                            success     : function(data) {
                                 var params = { 'acquirerId' : '35',
                                   'idCommerce' :'6935',
                                   'purchaseOperationNumber':data.DatosCliente.idfum,
                                   'purchaseAmount':data.DatosCliente.purchaseAmount,
                                   'purchaseCurrencyCode':'068',
                                   'language':'SP',
                                   'shippingFirstName':data.DatosCliente.nombres,
                                   'shippingLastName':data.DatosCliente.apellidos,
                                   'shippingEmail':data.DatosCliente.correo,
                                   'shippingAddress':$scope.datosPaciente.dtspsl_direccion,
                                   'shippingZIP':'33',
                                   'shippingCity':'La Paz',
                                   'shippingState':'La Paz',
                                   'shippingCountry':'BO',
                                   'userCommerce':data.DatosCliente.identificacion,
                                   'userCodePayme':data.ConsumoWallet.codAsoCardHolderWallet,
                                   'descriptionProducts':data.DatosCliente.concepto,
                                   'programmingLanguage':'PHP',
                                   'reserved1':data.DatosCliente.idfum,
                                   'reserved2':data.DatosCliente.tipoServicio,
                                   'reserved3':data.DatosCliente.ci_nit,
                                   'reserved4':data.DatosCliente.idUsuario,
                                   'reserved5':data.DatosCliente.idSucursal,
                                   'reserved6':data.DatosCliente.efectivo,
                                   'reserved7':data.DatosCliente.cantidad,
                                   'reserved8':data.DatosCliente.concepto,
                                   'reserved9':data.DatosCliente.totalFactura,
                                   'reserved10':data.DatosCliente.oid,
                                   'reserved11':data.DatosCliente.vidpaciente,
                                   'reserved12':data.DatosCliente.vidservicio,
                                   'reserved13':data.DatosCliente.vfechaatencion,
                                   'reserved14':data.DatosCliente.vhabilitacion,
                                   'reserved15':data.DatosCliente.vnumeroficha,
                                   'reserved16':data.DatosCliente.vhospitalid,
                                   'reserved17':data.DatosCliente.vmedicoid,
                                   'reserved18':data.DatosCliente.vturnoid,
                                   'reserved19':data.DatosCliente.vcodigoficha,
                                   'reserved20':data.DatosCliente.vusuario,
                                   'reserved21':data.DatosCliente.vhorainicioficha,
                                   'reserved22':data.DatosCliente.vhorafinficha,
                                   'reserved23':data.DatosCliente.vtipoconsulta,
                                   'reserved24':data.DatosCliente.vtipopaciente,
                                   'reserved25':data.DatosCliente.vcancelo,
                                   'reserved26':data.DatosCliente.vnro_fila,
                                   'reserved27':data.DatosCliente.vhistoria_sice,
                                   'reserved28':data.DatosCliente.vcentro_salud,
                                   'reserved29':$scope.pres_id,
                                   'purchaseVerification':data.DatosCliente.purchaseVerification,
                                };

                                $scope.htmlHospitales = $scope.htmlHospitales+'<form id="frmVPOS2" action="https://vpayment.verifika.com/VPOS2/faces/pages/startPayme.xhtml" class="form-horizontal" method="post" name="frmVPOS2" target="_blank">';
                                $scope.htmlHospitales = $scope.htmlHospitales+'<div style="padding-left:50px;padding-right:50px" class="row">';
                                $scope.htmlHospitales = $scope.htmlHospitales+'<div class="col-md-12">';
                                $scope.htmlHospitales = $scope.htmlHospitales+'<div class="form-group">';
                                var i = 0;
                                angular.forEach(params,function(celda, fila){
                                    
                                    if(fila == 'shippingFirstName' || fila == 'shippingLastName' || fila == 'shippingEmail' || fila == 'descriptionProducts' || fila == 'shippingCity' || fila == 'shippingCountry' || fila == 'purchaseOperationNumber' || fila == 'reserved6'){
                                        $scope.htmlHospitales = $scope.htmlHospitales+'<div class="col-md-6">';
                                        $scope.htmlHospitales = $scope.htmlHospitales+'<label for="title">'+$scope.vectorMensaje[i]+'</label>';
                                        $scope.htmlHospitales = $scope.htmlHospitales+'<div class="controls">';
                                        $scope.htmlHospitales = $scope.htmlHospitales+'<input readOnly = "readonly" value="'+celda+'" id="'+fila+'" name="'+fila+'" class="form-control" type="text">';   
                                        $scope.htmlHospitales = $scope.htmlHospitales+'</div>';
                                        $scope.htmlHospitales = $scope.htmlHospitales+'</div>';
                                        i = i+1;
                                    }
                                    else{
                                    }
                                    
                                });

                                angular.forEach(params,function(celda, fila){
                                    if(fila != 'shippingFirstName' && fila != 'shippingLastName' && fila != 'shippingEmail' && fila != 'descriptionProducts' && fila != 'shippingCity' && fila != 'shippingCountry' && fila != 'purchaseOperationNumber'){
                                        $scope.htmlHospitales = $scope.htmlHospitales+'<div class="col-md-12">';
                                        $scope.htmlHospitales = $scope.htmlHospitales+'<div class="controls">';
                                        $scope.htmlHospitales = $scope.htmlHospitales+'<input style="visibility: hidden;" value="'+celda+'" id="'+fila+'" name="'+fila+'" class="form-control" type="text">';
                                        $scope.htmlHospitales = $scope.htmlHospitales+'</div>';
                                        $scope.htmlHospitales = $scope.htmlHospitales+'</div>';
                                    }
                                    else{
                                    }
                                    
                                });

                                $scope.htmlHospitales = $scope.htmlHospitales+'</div>';
                                $scope.htmlHospitales = $scope.htmlHospitales+'</div>';
                                $scope.htmlHospitales = $scope.htmlHospitales+'</div>';
                                $scope.htmlHospitales = $scope.htmlHospitales+'</form>';
                                $scope.formularioPago2 = true;
                                $scope.lstatenciones = false;
                                $scope.htmlHospitales = $scope.htmlHospitales+'</div>';
                                $scope.htmlHospitales = $scope.htmlHospitales+'</div>';
                                $scope.htmlHospitales = $scope.htmlHospitales+'</div>';
                                $scope.htmlHospitales = $scope.htmlHospitales+'</form>';
                                $scope.$apply();
                            },
                            error: function (xhr, status, error) {
                                alertify.error('Error Intente de nuevo !!');
                            }
                        });
                    });
               },          
               error: function (xhr, status, error) {
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

    $scope.pagarCertificado = function(){
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
                $('[name="frmVPOS2"]').submit();
                $scope.limpiarTodo();
                //$scope.formularioPago2 = false;
                //$scope.lstatenciones = true;
                $scope.$apply();
             } else {
              swal.close();
             }
        });
    }

    $scope.pagarCertificado2 = function(){
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
                $('[name="frmVPOS2"]').submit();
                //$scope.limpiarTodo();
                $scope.formularioPago2 = false;
                $scope.lstatenciones = true;
                $scope.$apply();
             } else {
              swal.close();
             }
        });
    }

    $scope.pagoOnlineAfuera2 = function(datos){
        console.log(datos);
        $scope.idHospital = datos.presidhospital;
        $scope.codigoespecialidad = datos.vesp_cod_especialidad;
        $scope.pres_id = datos.presid;
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
                //$('[name="frmVPOS2"]').submit();
                $scope.pagoOnlineAfuera(datos);
                //$scope.formularioPago2 = false;
                //$scope.lstatenciones = true;
                $scope.$apply();
             } else {
              swal.close();
             }
        });
    }

    $scope.pagarOnlinePreguntar = function(){
        swal({
         title: "Atención!!",
         text: "Favor tomar nota de lo siguiente: \n Con esta ficha debe pasar 30 minutos antes, directamente por enfermeria del para su control médico. \n Debe tener activado su tarjeta de crédito o débito para el pago.",
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
                $scope.$apply();
             } else {
              swal.close();
              $scope.$apply();
             }
        });
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
                        console.log(respuesta);
                        $.LoadingOverlay("hide");
                         alertify.success('Se revirtio la ficha con exito');
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

    

    $scope.$on('api:ready',function(){
        $scope.obtenerDatos();
       $scope.verificarRegistroPaciente();
    });

    $scope.inicioSalud = function () {
        $scope.obtenerDatos();
        $scope.verificarRegistroPaciente();
    };
};
