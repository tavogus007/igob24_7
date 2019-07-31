app.controller('saludController' , function ($scope, $rootScope, $routeParams, $location, $http, Data, sessionService, CONFIG, LogGuardarInfo, sweet, ngTableParams, $filter, $sce) {
    $scope.con_central_riesgos = false;
    $scope.con_historial = false;
    $scope.hospitalesMostrar = false;
    $scope.tablaTramites = {};
    $scope.idCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.nroCi = sessionService.get('CICIUDADANO');
    $scope.tipoCiudadano = sessionService.get('TIPO_PERSONA');
    $scope.tramitesUsuario = [];
    $scope.hospitales_vista = false;
    $scope.especialidad_vista = false;

    $scope.salud_notif1 =function () {
        setTimeout(function() {
            toastr.options = {
            closeButton: true,
            progressBar: false,
            showMethod: 'slideDown',
            timeOut: 20000,
            preventDuplicates: true,
            };
        toastr.info('Deben realizarse con 24 horas de anticipación, si necesita atención inmediata apersonarse al establecimiento de salud más cercano de su zona.', 'Reserva de ficha:');
        }, 2000);
    }

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

    $scope.registrarHistoria = function(datos){
        var fec = $scope.datosPaciente.dtspsl_fec_nacimiento;
        sweet.show({
            title: "Seguro desea registrarse en el "+$scope.datosHospital.vhsp_nombre_hospital,
            text: "Se creara un nuevo historial clinico en este hospital, con los datos que proporciono",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#18C13A',
            confirmButtonText: 'Resgistrarme',
            closeOnConfirm: false,
        }, function() {
            if($scope.datosPaciente.dtspsl_fec_nacimiento == ' ' || $scope.datosPaciente.dtspsl_fec_nacimiento == '' || $scope.datosPaciente.dtspsl_fec_nacimiento == undefined || $scope.datosPaciente.dtspsl_fec_nacimiento == null || fec == 'Invalid Date'){
                sweet.show('Alerta','Completar su fecha de nacimiento Porfavor','warning');
            }
            else{
                if($scope.datosPaciente.dtspsl_expedido == '' || $scope.datosPaciente.dtspsl_expedido == undefined || $scope.datosPaciente.dtspsl_expedido == null ){
                sweet.show('Alerta','Completar su expedido Porfavor','warning');
                }
                else{
                    if($scope.datosPaciente.dtspsl_id_estado_civil == '' || $scope.datosPaciente.dtspsl_id_estado_civil == undefined || $scope.datosPaciente.dtspsl_id_estado_civil == null ){
                    sweet.show('Alerta','Completar su estado civil Porfavor','warning');
                    }
                    else{
                        $scope.crearHistoriaClinicaConfirm($scope.datosHospital.vhsp_id_hospital);
                    }
                }
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
      var estadiCivil = 0;
      switch(parseInt(response.dtspsl_id_estado_civil))
      {
        case "S": estadiCivil = 1; break;
        case "C": estadiCivil = 2; break;
        case "D": estadiCivil = 3; break;
        case "V": estadiCivil = 4; break;
        case "U": estadiCivil = 5; break;

      }
       var datosPaciente = new guardarSalud();
        datosPaciente.idHospital = $scope.datosHospital.vhsp_id_hospital,
        datosPaciente.id_reg_ciudadano = response._id,
        datosPaciente.nombre = response.dtspsl_nombres,
        datosPaciente.paterno = response.dtspsl_paterno,
        datosPaciente.materno = response.dtspsl_materno,
        datosPaciente.cedula = response.dtspsl_ci,
        datosPaciente.complemento = '',
        datosPaciente.sexo = genero,
        datosPaciente.fecha_nacimiento = response.dtspsl_fec_nacimiento,
        datosPaciente.fechaSQL = response.dtspsl_fec_nacimiento ,
        datosPaciente.coddeptoNac = lugarNacimiento ,
        datosPaciente.estado_civil = estadiCivil,
        datosPaciente.direccion = response.dtspsl_direccion,
        datosPaciente.telefono = response.dtspsl_telefono,
        datosPaciente.expedido = expedido,
        datosPaciente.ocupacionid = response.dtspsl_ocupacion,
        datosPaciente.zonacodigoVive = lugarNacimiento,
        datosPaciente.correo = response.dtspsl_correo,
        datosPaciente.tipoSeguroSalud = 0,
        datosPaciente.codigoCarpeta = '',
        datosPaciente.coddeptoVive = lugarNacimiento,
        datosPaciente.codmunicipVive = '',
        datosPaciente.codproVive = '',
        datosPaciente.codigoSeguroSice = '',
        datosPaciente.codmunicipNac = '' ,
        datosPaciente.macrodistritoVive = '',
        datosPaciente.distritoVive = '' ,
        datosPaciente.lugarTrabajo = response.lugarTrabajo ,
        datosPaciente.direccionTrabajo = response.direccionTrabajo ,
        datosPaciente.telefonoTrabajo = response.telefonoTrabajo ,
        datosPaciente.responsableFamilia = response.responsableFamilia ,
        datosPaciente.nombrePadreTutor = response.nombrePadreTutor ,
        datosPaciente.nombreMadre = response.nombreMadre,
        datosPaciente.telefonoRe = response.telefonoRef
        datosPaciente.guardarHistoria(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {   
                respuestaFichas = resultadoApi.success.data;
                if(respuestaFichas.length>0)
                {
                    
                    sweet.show('Su Nro. de Historia Clinica es :'+respuestaFichas[0].idhistorial+'','Paciente Registrado Exitosamente en el : \n\n '+$scope.datosHospital.vhsp_nombre_hospital+' ','success');
                    $scope.lstHospital();
                    $.LoadingOverlay("hide");
                    $scope.$apply();
                }
                $.LoadingOverlay("hide");
            }
            else
            {
                sweet.show('Alerta',''+resultadoApi.error.message+'' ,'warning');
                $.LoadingOverlay("hide");
            }
            $.LoadingOverlay("hide");
        });
      }


    $scope.limpiarRegistro = function(datos){
        $scope.datosHospital = datos;
        $scope.datosGrupo = [];
    }

     $scope.cargarFichasReservadas = function () {
        cargando();
        $scope.tramitesUsuario = [];
        $scope.tramitesUsuario = " ";
        var data = " ";
        $scope.salud_notif1();
        var listaFichasReservadas = new dataSalud();
            listaFichasReservadas.ci = $scope.nroCi;
            listaFichasReservadas.listaAtencion(function(resultado){
            resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {
                respuestaFichas = resultadoApi.success.data;
                if(respuestaFichas.length>0)
                {
                    $scope.tramitesUsuario = respuestaFichas;
                    data = respuestaFichas;
                    $scope.tablaTramites.reload();
                }
                $.LoadingOverlay("hide");
            }
            else
            {
                $.LoadingOverlay("hide");
            }
            $scope.tablaTramites.reload();
        });
    };

    $scope.tablaTramites = new ngTableParams({
        page: 1,
        count: 10,
        filter: {},
        sorting: {
            presestado_prestacion: 'desc'
        }
    }, {
        total: $scope.tramitesUsuario.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.tramitesUsuario, params.filter()) :
            $scope.tramitesUsuario;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.tramitesUsuario;
            params.total($scope.tramitesUsuario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


    $scope.verificarRegistroPaciente = function () {
       cargando();
        var centralRiesgosSalud = new dataSalud();
        centralRiesgosSalud.ci = $scope.nroCi;
        centralRiesgosSalud.centralRiesgos(function(resultado){
        resultadoApi = JSON.parse(resultado);
            if( typeof(resultadoApi.success) != 'undefined')
            {
                results = resultadoApi.success.data;
                if(results[0].contador > 0)
                {
                    $.LoadingOverlay("hide");
                    $scope.con_historial = false;
                    $scope.con_central_riesgos = true;
                }
                else
                {
                    $.LoadingOverlay("hide");
                    $scope.tituloHospitales = "";
                    if($scope.tipoCiudadano == "NATURAL")
                    {
                       $scope.con_historial = true;
                       $scope.con_central_riesgos = false;
                       $scope.lstHospital();
                    }
                    else
                    {
                       sweet.show('Alerta','Este Servicio es solo para ciudadanos','warning');
                    }
                }
                $.LoadingOverlay("hide");
            }
            else
            {
                $.LoadingOverlay("hide");
                sweet.show('Error','','error');
            }
        });
    };

    $scope.lstHospital = function(){
        cargando();
        var listaDatosHospital = new dataSalud();
            listaDatosHospital.ci = $scope.nroCi;
            listaDatosHospital.listaHospital(function(resultado){
            resultadoApi = JSON.parse(resultado);

            if( typeof(resultadoApi.success) != 'undefined')
            {
                $.LoadingOverlay("hide");
                results = resultadoApi.success.data;
                $scope.salud_notif1();
                $scope.hospitales = results;
                $scope.hospitales_vista = true;
                $scope.especialidad_vista = false;
            }
            else
            {
                sweet.show('Alerta','Porfavor Notificar','warning');
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
                     sweet.show('Alerta', 'Verificar el sexo', 'warning');   
                }
            }
            $.LoadingOverlay("hide");
        });
      }else {
        sweet.show('Alerta', 'Verificar la Fecha de Nacimiento', 'warning');
        $.LoadingOverlay("hide");
      }
    }

    $scope.seleccionarEspecialidad = function(especialidades){
        $scope.fechaturnos = " ";
        $scope.fechaturnos = [];
        $scope.fechaDisponible = null;
        $scope.fechaDisponible = '';
        $scope.idServicio = especialidades.hspcatid;
        $scope.cuacodigo = especialidades.cpcuacodigo;
        $scope.vgrucodigo = especialidades.cpid;
        $scope.idServicio = especialidades.hspcatid;
        $scope.especialidad_nombre = especialidades.cpgrupo;
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
                sweet.show('Alerta', 'No se programaron fichas para esta especialidad', 'warning');
              }
              $.LoadingOverlay("hide");
          });
        }catch(e){
            $scope.tabla_consultorio = false;
            $.LoadingOverlay("hide");
            sweet.show('', 'Error', 'error');
        }
    }

    $scope.seleccionarMedico = function(medico){
        cargando();
        $scope.doctor_nombre = medico.nombredoctor +' '+medico.paternodoctor+' '+medico.maternodoctor;
        $scope.consultorio_nombre = medico.consultoriodoctor;
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
                    sweet.show('Alerta', 'Usted puede solicitar una ficha por turno y por fecha', 'warning');
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
                          $scope.fichas = resultado[0].vfichas;
                          $scope.fichas_vista = true;
                          $scope.medicos_vista = false;
                          $.LoadingOverlay("hide");
                      });
                      }catch(e){
                        $scope.tabla_consultorio = false;
                        $.LoadingOverlay("hide");
                        sweet.show('', 'Error', 'error');
                    }    
                }
                
              }
            });
        }catch(e){
            $.LoadingOverlay("hide");
            sweet.show('', 'Error', 'error');
        }
    }

    $scope.listar_medicos_turno = function (fechaInicio){
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
            sweet.show('', 'Error', 'error');
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
            sweet.show('', 'Error', 'error');
        }
    };

    $scope.asignarFicha = function(datos){
        cargando();
        $scope.getCaptchasX();
        $scope.lmpCaptcha();
        var horas = datos.Hora.split('a');
        $scope.hora_inicio = horas[0];
        $scope.hora_fin = horas[1];
        var x = datos.Ficha.split('/');
        $scope.numero_ficha = parseInt(x[1]);
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

    $scope.volverEspecialidades = function(){
        $scope.hospitales_vista = false;
        $scope.especialidad_vista = true;
        $scope.medicos_vista = false;
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

    }

     $scope.getCaptchasX=function(){
        cargando();
        $scope.resultadoC="";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function(resultado){
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero = partes[0].substring(1);
            i1=(partes[2]+ "," + partes[3]);
            i2=(partes[4] + "," + partes[5]);
            $scope.imageLNG = i1.substring(1, i1.length - 1);
            $scope.imageCST = i2.substring(1, i2.length - 2);
            var lengua = "";
            if(partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if(partes[1] == 'Q'){
                lengua = 'QUECHUA';
            } else if(partes[1] == 'G'){
                lengua = 'GUARANI';
            } else if(partes[1] == 'C'){
                lengua = 'CASTELLANO';
            } else {
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });
        $.LoadingOverlay("hide"); 
    };

    $scope.lmpCaptcha = function(datos)
    {
        $scope.ErrorCapcha='';
    }

    var numero = 0;

    $scope.VerificarCapcha = function(response)
    {
        cargando();
        var captch  = $("#resultadoC").val();
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
            if(json.success[0] == undefined){
         $scope.getCaptchasX();
         $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
            }else{
            $scope.entregarFicha();
        }
        $.LoadingOverlay("hide"); 
        });
    };


$scope.VerificarCapchaenter = function (keyEvent,response){
  if (keyEvent.which === 13){
        cargando();
        var captch  = $("#resultadoC").val();
        var id = numero;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function(resultado){
            json = JSON.parse(resultado);
            if(json.success[0] == undefined){
            $scope.getCaptchasX();
            $scope.ErrorCapcha='Error en el captcha intentar de nuevo por favor';
            }else{
            $scope.entregarFicha();
        }
        $.LoadingOverlay("hide"); 
        });
    }
    $.LoadingOverlay("hide");
}

$scope.entregarFicha= function(){
    cargando();
    var insertarFicha = new dataSalud();
    insertarFicha.idPaciente = $scope.codigoSIIS;
    insertarFicha.idServicio = $scope.idServicio;
    insertarFicha.fechaDisponible = $scope.fechaDisponible;
    insertarFicha.habilitacion = 'NO';
    insertarFicha.nroFicha = $scope.numero_ficha;
    insertarFicha.idHospital = $scope.idHospital;
    insertarFicha.idMedico = $scope.idDoctorUsuario;
    insertarFicha.idTurno = $scope.idTurnoFicha;
    insertarFicha.codigoFicha = $scope.codigo_ficha;
    insertarFicha.horaInicio = $scope.hora_inicio;
    insertarFicha.horaFinal = $scope.hora_fin;
    insertarFicha.fechaSql = $scope.fechaDisponible;
    insertarFicha.cuaCodigo = $scope.cuacodigo;
    insertarFicha.codigoMedicoSice = $scope.idDoctorUsuario;
    insertarFicha.idTipoPaciente = $scope.id_tipopaciente;
    insertarFicha.codigoCarpeta = $scope.codCarpeta;
    insertarFicha.idGrupo = $scope.vgrucodigo;
    insertarFicha.idServicioSice = $scope.idServicio;
    insertarFicha.idHorario = $scope.hora_inicio+' a '+$scope.hora_fin;
    insertarFicha.tipoTurno = $scope.idTurnoFicha;
    insertarFicha.guardarFicha(function(resultado){
    resultadoApi = JSON.parse(resultado);
    if( typeof(resultadoApi.success) != 'undefined')
    {
        results = resultadoApi.success.data;
        if(results.length > 0){
            sweet.show('La reserva se realizó con éxito', 'Estimado Ciudadano, tomar nota de los siguientes puntos: \n\n 1) En el Dispensador de Fichas del Hospital puede imprimir su Ficha con su Carnet de Identidad y Fecha de Nacimiento. \n 2) Debe pasar directamente por Caja y realizar la cancelación del servicio. \n 3) En caso de no acudir a su cita médica, ingresará a una central de riesgos y no podrá solicitar la ficha desde internet por 30 días la primera vez, 60 la segunda y 90 la tercera. La reincidencia lleva a la suspención definitiva del servicio, solo podrán acceder a consultas médicas de manera presencial. \n\n * En caso de que el médico especialista no pudiera atender a los ciudadanos que hicieron su reserva, admisiones se comunicará con l@s ciudadan@s, para reprogramar sus fichas.', 'success');
            $scope.limpiarTodo();
            $scope.getCaptchasX();
        }
        else{
            sweet.show('Alerta', 'No se pudo realizar la asignación de ficha', 'alerta');
        }
    }
  });
    $.LoadingOverlay("hide");
}

    $scope.$on('api:ready',function(){
       $scope.verificarRegistroPaciente();
       $scope.cargarFichasReservadas();
       $scope.obtenerDatos();
       $scope.getCaptchasX();
    });

    $scope.inicioSalud = function () {
        $scope.cargarFichasReservadas();
        $scope.verificarRegistroPaciente();
        $scope.obtenerDatos();
        $scope.getCaptchasX();
    };
});
