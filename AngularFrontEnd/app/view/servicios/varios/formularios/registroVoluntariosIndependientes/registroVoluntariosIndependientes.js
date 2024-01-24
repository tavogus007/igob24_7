function registroVoluntariosIndependientesController($scope, $q, $timeout, CONFIG, $window, $rootScope, sessionService, ngTableParams, $filter, $route, sweet, $http, FileUploader, $sce, fileUpload, filterFilter, $routeParams, $location, Data, $q, fileUpload1) {
    var ciresp = sessionService.get('CICIUDADANO');
    var sIdCiudadano = sessionService.get('IDSOLICITANTE');
    $scope.datos = {};
    $scope.unido = {};
    $scope.datosV = {};
    $scope.mod = {};
    $scope.datos_responsable = {};
    $scope.datos_asociados_agru = {};
    $scope.trmExperiencia = [];
    $scope.trmVeterinario = [];
    $scope.listaAsociados = [];
    $scope.trmAsociados = [];
    $scope.trmTramites = [];
    $scope.div_rescatistas = false
    $scope.div_otros = false
    $scope.xdeshabilitado = false;
    $scope.div_boton_guardar = false;
    $scope.div_personaria = false;
    div_voluntario_inde = false;
    $scope.div_animalistas_aso = false;
    $scope.div_formulario = false;
    $scope.titulo_datos_valuntariado = "";
    $scope.titulo_boton = "";
    $scope.titulo_observacion_pj = "";
    $scope.titulo_mapa = "";
    var contadorAdjunto = 0;
    var validador_envio = 0;
    var id_tramite = 0;
    $scope.xdato_registro = "";
    $scope.div_agregar_experiencia = true;
    $scope.div_esp_num_pj = false;
    $scope.div_aprobado = false;
    $scope.div_rescatistas_dos = false;
    $scope.div_mts_observacion = false;
    $scope.div_mts_area_cuarentena = false;
    $scope.div_mts_area_maternidad = false;
    $scope.div_mts_area_comunes = false;
    var validarDiasACaducar = 0;
    $scope.y_tramite = "";
    $scope.tiposTramite = [
        /*{ detalle: 'Solicitud de registro Animalista Independiente', descripcion: "INDEPENDIENTE", id: 1 },*/
        { detalle: 'Solicitud de registro Organizaciones Protectoras de Animales', descripcion: "AGRUPADOS", id: 2 }
    ];
    document.getElementById("mapa_mascotas_animalistas").style.display = "none";
    $scope.buscarRep = function () {
        try {
            var buscarRepresentante = new rcNatural();
            buscarRepresentante.tipo_persona = "NATURAL";
            buscarRepresentante.ci = ciresp;
            buscarRepresentante.buscarPersona(function (res) {
                var x = JSON.parse(res);
                $scope.datos_responsable.ci = x[0].dtspsl_ci;
                $scope.datos_responsable.expedido = x[0].dtspsl_expedido;
                $scope.datos_responsable.paterno = x[0].dtspsl_paterno;
                $scope.datos_responsable.materno = x[0].dtspsl_materno;
                $scope.datos_responsable.nombre = x[0].dtspsl_nombres;
                $scope.datos_responsable.apcasada = x[0].dtspsl_tercer_apellido;
                $scope.datos_responsable.movil = x[0].dtspsl_movil;
                $scope.datos_responsable.correo = x[0].dtspsl_correo;
                $scope.datos_responsable.zona = x[0].dtspsl_zona_desc;
                $scope.datos_responsable.tipoVia = x[0].dtspsl_tipo_via;
                $scope.datos_responsable.numCasa = x[0].dtspsl_numero_casa;
                $scope.datos_responsable.nomVia = x[0].dtspsl_nombre_via;
                $scope.datos_responsable.profesion = x[0].dtspsl_profesion;
                $scope.datos_responsable.ocupacion = x[0].dtspsl_ocupacion;
                $scope.datos_responsable.foto_carnet = x[0].dtspsl_file_fotocopia_ci;
                $scope.datos_responsable.foto_carnet_reverso = x[0].dtspsl_file_fotocopia_ci_r;
                $scope.datos_responsable.sexo = x[0].dtspsl_sexo;
                $scope.datos_responsable.id_ciudadano = x[0]._id;
                $scope.datos_responsable.latitud = x[0].dtspsl_latitud;
                $scope.datos_responsable.longitud = x[0].dtspsl_longitud;
                if ($scope.datos_responsable.sexo == 'M') {
                    $scope.datos_responsable.sexo = 'MASCULINO'
                } else {
                    $scope.datos_responsable.sexo = 'FEMENINO'
                }
            });
        } catch (e) {
        };
        $scope.recuperarTramites();
    };
    $scope.modelFecha5 = { endDate: new Date() };
    $scope.modelFecha0 = { endDate: new Date() };
    $scope.startDateOpen5 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened5 = true;
    };
    $scope.f_crear_guardar = function () {
        id_tramite = 0;
        f_crear_guardar = "";
        if ($scope.tramiteId != undefined || $scope.tramiteId != null) {
            var validarElTramite = "";
            if ($scope.tramiteId == "1" || $scope.tramiteId == 1) {
                validarElTramite = "INDEPENDIENTE";
                $scope.xdato_registro = "INDEPENDIENTE";
            } else if ($scope.tramiteId == "2" || $scope.tramiteId == 2) {
                validarElTramite = "AGRUPADOS";
                $scope.xdato_registro = "AGRUPADOS";
            } else {
                swal('', "Hubo un inconveniente vuelva a iniciar sesion", 'error');
            }
            var datosMascota = new reglasnegocioM();
            $scope.unido.datos_voluntario = {};
            $scope.unido.datos_personales = $scope.datos_responsable;
            $scope.unido.datos_experiencia = {};
            $scope.unido.datos_asociados = {};
            $scope.unido.dato_tramiteIgob = "";
            $scope.unido.dato_registro = validarElTramite;
            datosMascota.identificador = 'CASA_MASCOTA-1';
            var x_parametro = '{"data":' + JSON.stringify(JSON.stringify($scope.unido)) + ',"estado":"guardado"}';
            datosMascota.parametros = x_parametro;
            datosMascota.llamarregla(function (results) {
                var res = JSON.parse(results);
                id_tramite = res[0].sp_insertar_voluntario_sierra_igob;
                $scope.codigoTramite = id_tramite; //mag 
                $scope.datos = {};
                $scope.trmExperiencia = [];
                //$scope.trmVeterinario = [];
                $scope.trmAsociados = [];
                $scope.tblAsociados.reload();
                $scope.tblExperiencia.reload();
                validador_envio = 1;
                $scope.recuperarTramites();
                $scope.div_formulario = true;
                $scope.div_boton_guardar = true;
                $scope.titulo_boton = "ENVIAR";
                $scope.xdeshabilitado = false;
                $scope.div_agregar_experiencia = true;
                $scope.div_aprobado = false;
                $scope.f_dinamico_Registro(validarElTramite);
            });
        } else {
            swal('', "Dede seleccionar uno de los servicios", 'warning');
        }
    };
    $scope.startDateOpen3 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startDateOpened3 = true;
    }
    $scope.cambioObservacion = function (data) {
        if (data == 'SI') {
            $scope.div_mts_observacion = true;
        } else {
            $scope.div_mts_observacion = false;
        }
    }
    $scope.seleccionaServicio = function (idTramite) {
        $scope.tramiteId = idTramite;
    }
    $scope.cambioCuarentena = function (data) {
        if (data == 'SI') {
            $scope.div_mts_area_cuarentena = true;
        } else {
            $scope.div_mts_area_cuarentena = false;
        }
    }
    $scope.cambioMaternidad = function (data) {
        if (data == 'SI') {
            $scope.div_mts_area_maternidad = true;
        } else {
            $scope.div_mts_area_maternidad = false;
        }
    }
    $scope.cambioAComunes = function (data) {
        if (data == 'SI') {
            $scope.div_mts_area_comunes = true;
        } else {
            $scope.div_mts_area_comunes = false;
        }
    }
    $scope.calcular_edad_grilla = function (edad) {
        var fecha = new Date();
        var curday = fecha.getDate();
        var curmon = (fecha.getMonth() + 1);
        var curyear = fecha.getFullYear();
        var fecnac = new Date(edad);
        var calday = (fecnac.getDate());
        var calmon = (fecnac.getMonth()) + 1;
        var calyear = fecnac.getFullYear();
        var curd = new Date(curyear, curmon - 1, curday);
        var cald = new Date(calyear, calmon - 1, calday);
        var y1 = curd.getFullYear(), m1 = curd.getMonth(), d1 = curd.getDate(), y2 = cald.getFullYear(), m2 = cald.getMonth(), d2 = cald.getDate();
        if (d1 < d2) {
            m1--;
            with (new Date(y2, m2, 1, 12)) {
                setDate(0);
                d1 += getDate();
            }
        }
        if (m1 < m2) {
            y1--;
            m1 += 12;
        }
        if ((fecnac.getMonth() + 1) < 10) { mes = '0' + (fecnac.getMonth() + 1); } else { mes = (fecnac.getMonth() + 1); }
        if ((fecnac.getDate()) < 10) { dia = '0' + (fecnac.getDate()); } else { dia = (fecnac.getDate()); }
        $scope.mod.fecha_nacimiento = fecnac.getFullYear() + '-' + mes + '-' + dia;
        $scope.mod.edad = (y1 - y2) + " años " + (m1 - m2) + " meses y " + (d1 - d2) + " dias";
    };
    $scope.sumar_moviles = function () {
        if ($scope.datos.caniles_moviles == "" || $scope.datos.caniles_moviles == undefined) {
            $scope.datos.caniles_moviles = 0;
        } else if (($scope.datos.gatiles_moviles == "" || $scope.datos.gatiles_moviles == undefined)) {
            $scope.datos.gatiles_moviles = 0;
        }
        $scope.datos.total_moviles = $scope.datos.caniles_moviles + $scope.datos.gatiles_moviles;
    }
    $scope.sumar_capacidades = function () {
        if ($scope.datos.capacidad_caniles == "" || $scope.datos.capacidad_caniles == undefined) {
            $scope.datos.capacidad_caniles = 0;
        } else if (($scope.datos.capacidad_gatiles == "" || $scope.datos.capacidad_gatiles == undefined)) {
            $scope.datos.capacidad_gatiles = 0;
        }
        $scope.datos.total_capacidad = $scope.datos.capacidad_caniles + $scope.datos.capacidad_gatiles;
    }
    $scope.f_mostrar_Modal = function () {
        $("#myModal").modal("show");
    }
    $scope.f_dinamico_Registro = function (data_ingreso) {
        $scope.xdato_registro = "";
        document.getElementById("mapa_mascotas_animalistas").style.display = "block";
        //$scope.open_mapa_mascotas();
        if (data_ingreso == 'AGRUPADOS') {
            $scope.xdato_registro = "AGRUPADOS";
            $scope.titulo_mapa = "INDICAR EXACTAMENTE EN EL MAPA LA INFRAESTRUCTURA A SER UTILIZADO"
            $scope.div_personaria = true;
            $scope.div_voluntario_inde = false;
            $scope.div_rescatistas = true;
            $scope.div_rescatistas_dos = true;
            $scope.div_animalistas_aso = true;
            $scope.titulo_datos_valuntariado = "DATOS DE PERSONERÍA JURÍDICA:";
        } else if (data_ingreso == 'INDEPENDIENTE') {
            $scope.xdato_registro = "INDEPENDIENTE";
            $scope.titulo_mapa = "INDICAR EXACTAMENTE EN EL MAPA SU DOMICILIO:"
            $scope.div_personaria = false;
            $scope.div_voluntario_inde = true;
            $scope.div_rescatistas = false;
            $scope.div_animalistas_aso = false;
            $scope.div_rescatistas_dos = false;
            $scope.titulo_datos_valuntariado = "DATOS DEL VOLUNTARIADO:";
        }
    }
    $scope.validar = function (datos) {
        if ($scope.xdato_registro == undefined || $scope.xdato_registro == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el tipo de registro que realizara.", "error");
        } else if ($scope.xdato_registro == 'INDEPENDIENTE') {
            if ($scope.datos.latitud_vol_dom == "" || $scope.datos.latitud_vol_dom == undefined || $scope.datos.latitud_vol_dom == "undefined") {
                $scope.mensaje("Alerta", "Confirme la ubicación de su domicilio haciendo click en el mapa.", "error");
            } else if ($scope.datos.longitud_vol_dom == "" || $scope.datos.longitud_vol_dom == undefined || $scope.datos.longitud_vol_dom == "undefined") {
                $scope.mensaje("Alerta", "Confirme la ubicación de su domicilio haciendo click en el mapa.", "error");
            } else if ($scope.datos.tipo_voluntario == "" || $scope.datos.tipo_voluntario == undefined) {
                $scope.mensaje("Alerta", "Ingrese el tipo de voluntariado", "error");
            } else if ($scope.datos.fecha_antirrabica == "" || $scope.datos.fecha_antirrabica == undefined || $scope.datos.fecha_antirrabica == "undefined") {
                $scope.mensaje("Alerta", "Ingrese la fecha en la cual se realizó la vacuna antirrabica", "error");
            } else if ($scope.datos.gestion_inicio == "" || $scope.datos.gestion_inicio == undefined || $scope.datos.gestion_inicio == "undefined") {
                $scope.mensaje("Alerta", "Ingrese la gestión en la cual empezo a ser voluntariado", "error");
            } else if ($scope.datos.lugar_voluntariado == "" || $scope.datos.lugar_voluntariado == undefined || $scope.datos.lugar_voluntariado == "undefined") {
                $scope.mensaje("Alerta", "Ingrese el lugar del voluntariado", "error");
            } else if (($scope.datos.tipo_voluntario == "Otro" && $scope.datos.otros_tipos_voluntariado == "") || ($scope.datos.tipo_voluntario == "Otro" && $scope.datos.otros_tipos_voluntariado == undefined) || ($scope.datos.tipo_voluntario == "Otro" && $scope.datos.otros_tipos_voluntariado == "undefined")) {
                $scope.mensaje("Alerta", "Especifique otro tipo de voluntariado", "error");
            } else if (($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.caniles_moviles == "") || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.caniles_moviles == undefined) || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.caniles_moviles == "undefined")) {
                $scope.mensaje("Alerta", "Especifique cantidad de caniles móviles", "error");
            } else if (($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.gatiles_moviles == "") || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.gatiles_moviles == undefined) || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.gatiles_moviles == "undefined")) {
                $scope.mensaje("Alerta", "Especifique cantidad de gatiles móviles", "error");
            } else if (($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.capacidad_caniles == "") || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.capacidad_caniles == undefined) || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.capacidad_caniles == "undefined")) {
                $scope.mensaje("Alerta", "Especifique capacidad de caniles.", "error");
            } else if (($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.capacidad_gatiles == "") || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.capacidad_gatiles == undefined) || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.capacidad_gatiles == "undefined")) {
                $scope.mensaje("Alerta", "Especifique capacidad de gatiles.", "error");
            } else if (($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.total_comedores == "") || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.total_comedores == undefined) || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.total_comedores == "undefined")) {
                $scope.mensaje("Alerta", "Especifique la cantidad de comedores.", "error");
            } else if (($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.total_bebederos == "") || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.total_bebederos == undefined) || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.total_bebederos == "undefined")) {
                $scope.mensaje("Alerta", "Especifique la cantidad de bebederos.", "error");
            }/*else if (($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.total_superficie == "") || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.total_superficie == undefined) || ($scope.datos.tipo_voluntario == "Rescatista" && $scope.datos.total_superficie == "undefined")) {
                $scope.mensaje("Alerta", "Especifique la superficie total.", "error");
            }*/else if ($scope.trmExperiencia.length == 0) {
                $scope.mensaje("Alerta", "Ingrese al menos una experiencia.", "error");
            }else if ($scope.trmVeterinario.length == 0) {
                $scope.mensaje("Alerta", "Ingrese al menos un veterinario", "error");
            }
            else {
                if (validador_envio == 1) {
                    $scope.crear_tramite(datos)
                    $scope.f_actualizar("Su solicitud fue enviada,su número de trámite es:" + $scope.codigoTramite, 'activo');
                } else if (validador_envio == 2) {
                    $scope.f_actualizar("Su solicitud fue enviadasu número de trámite es:" + $scope.codigoTramite, 'activo');
                } else if (validador_envio == 3) {
                    $scope.crear_tramite(datos)
                    $scope.f_actualizar("Su solicitud fue enviadasu número de trámite es:" + $scope.codigoTramite, 'activo');
                } else if (validador_envio == 4) {
                    $scope.f_actualizar_guardado('Su solicitud fue guardada', 'guardado');
                }
            }
        } else if ($scope.xdato_registro == 'AGRUPADOS') {
            if ($scope.datos.latitud_vol_dom == "" || $scope.datos.latitud_vol_dom == undefined || $scope.datos.latitud_vol_dom == "undefined") {
                $scope.mensaje("Alerta", "Confirme la ubicación de su domicilio haciendo click en el mapa.", "error");
            } else if ($scope.datos.longitud_vol_dom == "" || $scope.datos.longitud_vol_dom == undefined || $scope.datos.longitud_vol_dom == "undefined") {
                $scope.mensaje("Alerta", "Confirme la ubicación de su domicilio haciendo click en el mapa.", "error");
            } else if ($scope.datos.cuenta_personairia_juridica == "" || $scope.datos.cuenta_personairia_juridica == undefined || $scope.datos.cuenta_personairia_juridica == "undefined") {
                $scope.mensaje("Alerta", "Seleccione si cuenta con personería jurídica.", "error");
                
            } else if ($scope.trmVeterinario.length == 0) {
                $scope.mensaje("Alerta", "Registre al menos un Veterinario o Institución Veterinaria", "error");
            } else if ($scope.trmAsociados.length == 0) {
                $scope.mensaje("Alerta", "Registre Asociados", "error");
            } else if (($scope.datos.cuenta_personairia_juridica == "SI" && $scope.datos.numero_personeria_juridica == undefined) || ($scope.datos.cuenta_personairia_juridica == "SI" && $scope.datos.numero_personeria_juridica == 'undefined')) {
                $scope.mensaje("Alerta", "Ingrese el número de la personería jurídica", "error");
            } else if ($scope.datos.caniles_moviles == "" || $scope.datos.caniles_moviles == undefined || $scope.datos.caniles_moviles == "undefined") {
                $scope.mensaje("Alerta", "Especifique cantidad de caniles móviles", "error");
            } else if ($scope.datos.gatiles_moviles == "" || $scope.datos.gatiles_moviles == undefined || $scope.datos.gatiles_moviles == "undefined") {
                $scope.mensaje("Alerta", "Especifique cantidad de gatiles móviles", "error");
            } else if ($scope.datos.capacidad_caniles == "" || $scope.datos.capacidad_caniles == undefined || $scope.datos.capacidad_caniles == "undefined") {
                $scope.mensaje("Alerta", "Especifique capacidad de caniles.", "error");
            } else if ($scope.datos.capacidad_gatiles == "" || $scope.datos.capacidad_gatiles == undefined || $scope.datos.capacidad_gatiles == "undefined") {
                $scope.mensaje("Alerta", "Especifique capacidad de gatiles.", "error");
            } else if ($scope.datos.total_comedores == "" || $scope.datos.total_comedores == undefined || $scope.datos.total_comedores == "undefined") {
                $scope.mensaje("Alerta", "Especifique la cantidad de comedores.", "error");
            } else if ($scope.datos.total_bebederos == "" || $scope.datos.total_bebederos == undefined || $scope.datos.total_bebederos == "undefined") {
                $scope.mensaje("Alerta", "Especifique la cantidad de bebederos.", "error");
            } else if ($scope.datos.total_superficie == "" || $scope.datos.total_superficie == undefined || $scope.datos.total_superficie == "undefined") {
                $scope.mensaje("Alerta", "Especifique la superficie total del refugio.", "error");
            } else if ($scope.datos.caniles_observacion == "" || $scope.datos.caniles_observacion == undefined || $scope.datos.caniles_observacion == "undefined") {
                $scope.mensaje("Alerta", "Especifique si cuenta con caniles de observación.", "error");
            } else if ($scope.datos.area_cuarentena == "" || $scope.datos.area_cuarentena == undefined || $scope.datos.area_cuarentena == "undefined") {
                $scope.mensaje("Alerta", "Especifique si cuenta con área para cuarentena.", "error");
            } else if ($scope.datos.area_maternidad == "" || $scope.datos.area_maternidad == undefined || $scope.datos.area_maternidad == "undefined") {
                $scope.mensaje("Alerta", "Especifique si cuenta con área de maternidad.", "error");
            } else if ($scope.datos.area_comunes == "" || $scope.datos.area_comunes == undefined || $scope.datos.area_comunes == "undefined") {
                $scope.mensaje("Alerta", "Especifique si cuenta con área comunes.", "error");
            } else if (($scope.datos.caniles_observacion == "SI" && $scope.datos.mts_observacion == undefined) || ($scope.datos.caniles_observacion == "SI" && $scope.datos.mts_observacion == 'undefined')) {
                $scope.mensaje("Alerta", "Idique caniles de observacion en mts2.", "error");
            } else if (($scope.datos.area_cuarentena == "SI" && $scope.datos.mts_area_cuarentena == undefined) || ($scope.datos.area_cuarentena == "SI" && $scope.datos.mts_area_cuarentena == 'undefined')) {
                $scope.mensaje("Alerta", "Idique el espacio del área de cuarentena en mts2.", "error");
            } else if (($scope.datos.area_maternidad == "SI" && $scope.datos.mts_area_maternidad == undefined) || ($scope.datos.area_maternidad == "SI" && $scope.datos.mts_area_maternidad == 'undefined')) {
                $scope.mensaje("Alerta", "Idique el espacio del área de maternidad en mts2.", "error");
            } else if (($scope.datos.area_comunes == "SI" && $scope.datos.mts_area_comunes == undefined) || ($scope.datos.area_comunes == "SI" && $scope.datos.mts_area_comunes == 'undefined')) {
                $scope.mensaje("Alerta", "Idique el espacio del área de comunes en mts2.", "error");
            } else if ($scope.trmAsociados.length == 0) {
                $scope.mensaje("Alerta", "Ingrese al menos un asociado.", "error");
            } else {
                if (validador_envio == 1) {
                    $scope.crear_tramite(datos)
                    $scope.f_actualizar("Su solicitud fue enviada, su número de trámite es:" + $scope.codigoTramite, 'activo');
                } else if (validador_envio == 2) {
                    $scope.f_actualizar("Su solicitud fue enviada, su número de trámite es:" + $scope.codigoTramite, 'activo');
                } else if (validador_envio == 3) {
                    $scope.crear_tramite(datos)
                    $scope.f_actualizar("Su solicitud fue enviada,su número de trámite es:" + $scope.codigoTramite, 'activo');
                } else if (validador_envio == 4) {
                    $scope.f_actualizar_guardado('Su solicitud fue guardada', 'guardado');
                }
            }
        }
    };
    $scope.f_guardarSinValidar = function (data) {
        validador_envio = 4;
        $scope.validar(data);
    }
    $scope.f_envio = function (data) {
        validador_envio = 1;
        $scope.validar(data);
    }
    $scope.crear_tramite = function (datos) {
        $.blockUI();
        var fecha = new Date();
        var fechactual = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        var sIdServicio = 60;
        var sIdCiudadano = sIdCiudadano;
        var sFechaTramite = fechactual;
        var datosSerializados = JSON.stringify(datos);
        try {
            var crea = new adicionaTramitesFormulario();
            crea.frm_tra_fecha = sFechaTramite;
            crea.frm_tra_enviado = "NO";
            crea.frm_tra_registrado = fechactual;
            crea.frm_tra_modificado = fechactual;
            crea.id_servicio = sIdServicio;
            crea.data_json = datosSerializados;
            crea.oid_ciudadano = sessionService.get('IDSOLICITANTE');
            crea.id_usuario = 3;
            crea.adiciona_Tramites_Formulario(function (res) {
                x = JSON.parse(res);
                response = x.success;
                if (response.length > 0) {
                    $scope.datoTramite = response[0].sp_insertar_formulario_tramites_datos;
                    sessionService.set('IDTRAMITE', $scope.datoTramite);
                    $scope.idTramiteG = sessionService.get('IDTRAMITE');
                    $scope.y_tramite = sessionService.get('IDTRAMITE');
                    $scope.guardar_tramite(datos);
                    $.unblockUI();
                    alertify.success('Datos de voluntario, creado correctamente');
                }
                else {
                    $.unblockUI();
                }
            });
        } catch (e) {
            $.unblockUI();
        }
    }
    $scope.guardar_tramite = function (datos) {
        $scope.datos.Tipo_tramite_creado = "WEB";
        try {
            var datosSerializados = JSON.stringify(datos);
            var idCiudadano = sessionService.get('IDSOLICITANTE');
            var idTramite = $scope.idTramiteG;
            var idServicio = 60;
            var crear = new datosFormularios();
            crear.frm_tra_dvser_id = idServicio;
            crear.data_json = datosSerializados;
            crear.frm_tra_id_ciudadano = sIdCiudadano;
            crear.frm_tra_id_usuario = 1;
            crear.frm_idTramite = idTramite;
            $.blockUI();
            crear.sp_crear_datos_formulario(function (results) {
                results = JSON.parse(results);
                results = results.success;
                if (results.length > 0) {
                    $scope.validarFormProcesos();
                    alertify.success("Formulario almacenado");
                    $.unblockUI();
                } else {
                    $.unblockUI();
                    sweet.show('', "Formulario no almacenado", 'error');
                }
            });
        } catch (e) {
            $.unblockUI();
        }
    }
    $scope.validarFormProcesos = function () {
        var idTramite = sessionService.get('IDTRAMITE');
        idUsuario = sessionService.get('IDUSUARIO');
        nroTramiteEnviado = sessionService.get('NROTRAMITE');
        idUsuario = 4;
        try {
            var idTramite = sessionService.get('IDTRAMITE');
            idUsuario = 4;
            var tramiteIgob = new datosFormularios();
            tramiteIgob.frm_idTramite = idTramite;
            tramiteIgob.frm_tra_enviado = 'SI';
            tramiteIgob.frm_tra_if_codigo = $scope.codigoTramite;
            tramiteIgob.frm_tra_id_usuario = idUsuario;
            tramiteIgob.validarFormProcesos(function (resultado) {
            });
        } catch (error) {
            swal('', 'Registro no modificado', 'error');
            $.unblockUI();
        }
    };

    $scope.f_registrar = function () {
        $scope.xdeshabilitado = true;
        $scope.div_boton_guardar = false;
        var datosMascota = new reglasnegocioM();
        $scope.unido.datos_voluntario = $scope.datos;
        $scope.unido.datos_personales = $scope.datos_responsable;
        $scope.unido.datos_experiencia = $scope.trmExperiencia;
        //$scope.unido.datos_veterinario = $scope.trmVeterinario;
        $scope.unido.datos_asociados = $scope.trmAsociados;
        $scope.unido.dato_tramiteIgob = $scope.idTramiteG;
        $scope.unido.dato_registro = $scope.xdato_registro;
        datosMascota.identificador = 'CASA_MASCOTA-1';
        var x_parametro = '{"data":' + JSON.stringify(JSON.stringify($scope.unido)) + '}';
        datosMascota.parametros = x_parametro;
        datosMascota.llamarregla(function (results) {
            var res = JSON.parse(results);
            var res2 = res[0].sp_insertar_voluntario_sierra_igob;
            $scope.mensaje("Estimado ciudadano", "Sus datos fueron guardaron correctamente. Ahora debe aguardar la aprobación de su registro por la Casa de la Mascota", "success");
            $.unblockUI();
        });
    }
    $scope.f_actualizar = function (ytitulo, yestado) {
        $scope.xdeshabilitado = true;
        $scope.div_boton_guardar = false;
        var datosMascota = new reglasnegocioM();
        $scope.unido.datos_voluntario = $scope.datos;
        $scope.unido.datos_personales = $scope.datos_responsable;
        $scope.unido.datos_experiencia = $scope.trmExperiencia;
        //$scope.unido.datos_veterinario = $scope.trmVeterinario;
        $scope.unido.datos_asociados = $scope.trmAsociados;
        $scope.unido.dato_tramiteIgob = $scope.y_tramite;
        $scope.unido.dato_registro = $scope.xdato_registro;
        datosMascota.identificador = 'CASA_MASCOTA-6';
        var x_parametro = '{"xanimalista_id":' + id_tramite + ',"xvoluntario_indep_data":' + JSON.stringify(JSON.stringify($scope.unido)) + ',"estado":"' + yestado + '"}';
        datosMascota.parametros = x_parametro;
        datosMascota.llamarregla(function (results) {
            var res = JSON.parse(results);
            var res2 = res[0].sp_actualizar_animalista_igob;
            if (res2 == true) {
                $scope.mensaje("Estimado ciudadano", ytitulo, "success");
                $scope.recuperarTramites();
            } else {
                $scope.mensaje("Error", "Su solicitud no fue exitosa", "error");
            }
            $.unblockUI();
        });
    }
    $scope.f_actualizar_guardado = function (ytitulo, yestado) {
        $scope.xdeshabilitado = false;
        $scope.div_boton_guardar = true;
        $scope.codigoTramite = id_tramite;
        var datosMascota = new reglasnegocioM();
        $scope.unido.datos_voluntario = $scope.datos;
        $scope.unido.datos_personales = $scope.datos_responsable;
        $scope.unido.datos_experiencia = $scope.trmExperiencia;
        $scope.unido.datos_veterinario = $scope.trmVeterinario;
        $scope.unido.datos_asociados = $scope.trmAsociados;
        $scope.unido.dato_tramiteIgob = $scope.y_tramite;
        $scope.unido.dato_registro = $scope.xdato_registro;
        datosMascota.identificador = 'CASA_MASCOTA-6';
        var x_parametro = '{"xanimalista_id":' + id_tramite + ',"xvoluntario_indep_data":' + JSON.stringify(JSON.stringify($scope.unido)) + ',"estado":"' + yestado + '"}';
        datosMascota.parametros = x_parametro;
        datosMascota.llamarregla(function (results) {
            var res = JSON.parse(results);
            var res2 = res[0].sp_actualizar_animalista_igob;
            if (res2 == true) {
                $scope.mensaje("Estimado ciudadano", ytitulo, "success");
                $scope.recuperarTramites();
            } else {
                $scope.mensaje("Error", "Su solicitud no fue exitosa", "error");
            }
            $.unblockUI();
        });
    }
    $scope.f_guardar_asociados = function (data_ingreso) {
        if (JSON.stringify($scope.trmAsociados) == '{}' || $scope.trmAsociados == {}) {
            $scope.trmAsociados = [];
        }
        var separado = ""
        if ($scope.mod.edad == 'undefined' || $scope.mod.edad == undefined) {
            separado = "0";
        } else {
            var poseparar = ($scope.mod.edad).split(' ');
            separado = poseparar[0];
        }
        if ($scope.mod.fecha_vacuna == "" || $scope.mod.fecha_vacuna == undefined || $scope.mod.fecha_vacuna == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese la fecha de la vacuna", "error");
        } else if ($scope.mod.ci == "" || $scope.mod.ci == undefined || $scope.mod.ci == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el carnet", "error");
        } else if ($scope.mod.expedido == "" || $scope.mod.expedido == undefined || $scope.mod.expedido == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el expedido de su carnet", "error");
        } else if ($scope.mod.FILE_CI_ANVERSO_ANIMALISTA == "" || $scope.mod.FILE_CI_ANVERSO_ANIMALISTA == undefined || $scope.mod.FILE_CI_ANVERSO_ANIMALISTA == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el cargado de la imagen del carnet de lado anverso", "error");
        } else if ($scope.mod.FILE_CI_REVERSO_ANIMALISTA == "" || $scope.mod.FILE_CI_REVERSO_ANIMALISTA == undefined || $scope.mod.FILE_CI_REVERSO_ANIMALISTA == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el cargado de la imagen del carnet de lado reverso", "error");
        } else if ($scope.mod.nombre == "" || $scope.mod.nombre == undefined || $scope.mod.nombre == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el nombre del animalista", "error");
        } else if ($scope.mod.paterno == "" || $scope.mod.paterno == undefined || $scope.mod.paterno == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el apellido paterno del animalista", "error");
        } else if ($scope.mod.materno == "" || $scope.mod.materno == undefined || $scope.mod.materno == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el apellido materno del animalista", "error");
        } else if ($scope.mod.fecha_nacimiento == "" || $scope.mod.fecha_nacimiento == undefined || $scope.mod.fecha_nacimiento == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese la fecha de nacimiento del animalista", "error");
        } else if ($scope.mod.genero == "" || $scope.mod.genero == undefined || $scope.mod.genero == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el género del animalista", "error");
        } else if ($scope.mod.estado_civil == "" || $scope.mod.estado_civil == undefined || $scope.mod.estado_civil == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el estado cívil del animalista", "error");
        } else if ($scope.mod.funciones == "" || $scope.mod.funciones == undefined || $scope.mod.funciones == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese la función que desempeña el animalista", "error");
        } else if ($scope.mod.correo == "" || $scope.mod.correo == undefined || $scope.mod.correo == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el correo del animalista", "error");
        } else if ($scope.mod.celular == "" || $scope.mod.celular == undefined || $scope.mod.celular == 'undefined') {
            $scope.mensaje("Alerta", "Ingrese el celular del animalista", "error");
        } else if (separado < 18) {
            $scope.mensaje("Alerta", "Para ser registrado debe ser mayor de edad", "error");
        } else {
            $scope.trmAsociados.push(data_ingreso);
            $scope.tblAsociados.reload();
            $scope.mod = {};
            $("#myModal").modal("hide");
        }
    }
    $scope.adicionarExperiencia = function (data) {
        if (JSON.stringify($scope.trmExperiencia) == '{}' || $scope.trmExperiencia == {}) {
            $scope.trmExperiencia = [];
        }
        if ($scope.datosV.descripcion_exp == 'undefined' || $scope.datosV.descripcion_exp == undefined) {
            $scope.mensaje("Alerta", "Ingrese la descripción antes de agregar", "error");
        } else if ($scope.datosV.FILE_ADJUNTO_EXPERIENCIA == 'undefined' || $scope.datosV.FILE_ADJUNTO_EXPERIENCIA == undefined || $scope.FILE_ADJUNTO_EXPERIENCIA == "") {
            $scope.mensaje("Alerta", "Ingrese el adjunto antes de agregar", "error");
        } else {
            $scope.trmExperiencia.push(data);
            $scope.tblExperiencia.reload();
            $scope.FILE_ADJUNTO_EXPERIENCIA = "";
            $scope.datosV = {};
        }
    }

    $scope.adicionarVeterinario = function (data) {
        if (JSON.stringify($scope.trmVeterinario) == '{}' || $scope.trmVeterinario == {}) {
            $scope.trmVeterinario = [];
        }
        if ($scope.datosV.descripcion_veterinario == 'undefined' || $scope.datosV.descripcion_veterinario == undefined) {
            $scope.mensaje("Alerta", "Ingrese el veterinario antes de agregar", "error");
        } else if ($scope.datosV.FILE_ADJUNTO_VETERINARIO == 'undefined' || $scope.datosV.FILE_ADJUNTO_VETERINARIO == undefined || $scope.FILE_ADJUNTO_VETERINARIO == "") {
            $scope.mensaje("Alerta", "Ingrese el adjunto antes de agregar", "error");
        } else {
            $scope.trmVeterinario.push(data);
            $scope.tblVeterinario.reload();
            $scope.FILE_ADJUNTO_VETERINARIO = "";
            $scope.datosV = {};
        }
    }

    $scope.eliminarExperiencia = function (dataExp) {
        $scope.trmExperiencia.splice($scope.trmExperiencia.indexOf(dataExp), 1);
        $scope.tblExperiencia.reload();
    }
    $scope.eliminarVeterinario = function (dataExp) {
        $scope.trmVeterinario.splice($scope.trmVeterinario.indexOf(dataExp), 1);
        $scope.tblVeterinario.reload();
    }

    $scope.eliminarAsociados = function (dataExp) {
        $scope.trmAsociados.splice($scope.trmAsociados.indexOf(dataExp), 1);
        $scope.tblAsociados.reload();
    }
    $scope.tblExperiencia = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            //  IdActividad: 'desc'
        }
    }, {
        total: $scope.trmExperiencia.length,
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.trmExperiencia, params.filter()) :
                $scope.trmExperiencia;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.trmExperiencia;
            params.total($scope.trmExperiencia.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.tblVeterinario = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            //  IdActividad: 'desc'
        }
    }, {
        total: $scope.trmVeterinario.length,
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.trmVeterinario, params.filter()) :
                $scope.trmVeterinario;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.trmVeterinario;
            params.total($scope.trmVeterinario.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


    $scope.tblListaAsociados = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            //  IdActividad: 'desc'
        }
    }, {
        total: $scope.listaAsociados.length,
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.listaAsociados, params.filter()) :
                $scope.listaAsociados;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.listaAsociados;
            params.total($scope.listaAsociados.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


    $scope.tblTramites = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            //  IdActividad: 'desc'
        }
    }, {
        total: $scope.trmTramites.length,
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.trmTramites, params.filter()) :
                $scope.trmTramites;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.trmTramites;
            params.total($scope.trmTramites.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
    $scope.tblAsociados = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            //  IdActividad: 'desc'
        }
    }, {
        total: $scope.trmAsociados.length,
        getData: function ($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')($scope.trmAsociados, params.filter()) :
                $scope.trmAsociados;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                $scope.trmAsociados;
            params.total($scope.trmAsociados.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.ejecutarFile = function (idfile) {
        var sid = document.getElementById(idfile);
        if (sid) {
            document.getElementById(idfile).click();
        } else {
            alert("Error ");
        }
    };

    $scope.ejecutarFile2 = function (idfile) {
        var sid = document.getElementById(idfile);
        if (sid) {
            document.getElementById(idfile).click();
        } else {
            alert("Error ");
        }
    };

    $scope.cambiarFile = function (obj, valor) {
        var arraydoc = ["pdf", "doc", "docx", ".docx", ".docxlm"];
        $scope.registroAdj = [];
        var fechaNueva = "";
        var fechaserver = new fechaHoraServer();
        fechaserver.fechahora(function (resp) {
            var sfecha = JSON.parse(resp);
            var fechaServ = (sfecha.success.fecha).split(' ');
            var fecha_ = fechaServ[0].split('-');
            var hora_ = fechaServ[1].split(':');
            fechaNueva = fecha_[0] + fecha_[1] + fecha_[2] + '_' + hora_[0] + hora_[1];
        });
        $.blockUI();
        setTimeout(function () {
            contadorAdjunto++;
            var nombre = obj.getAttribute("name");
            var objarchivo = obj.files[0];
            $scope.FILE_ADJUNTO_EXPERIENCIA = obj.files[0];
            $scope.FILE_ADJUNTO_VETERINARIO = obj.files[0];
            $scope.FILE_CI_ANVERSO_ANIMALISTA = obj.files[0];
            $scope.FILE_CI_REVERSO_ANIMALISTA = obj.files[0];
            var oidCiudadano = sessionService.get('IDSOLICITANTE');
            $scope.direccionvirtual = "RC_CLI";
            var sDirTramite = $scope.datos_responsable.ci;
            var uploadUrl = CONFIG.APIURL + "/files/RC_CLI/" + oidCiudadano + "/" + sDirTramite + "/";
            if (nombre == 'FILE_ADJUNTO_VETERINARIO' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                    if (objarchivo.size <= 15000000) {
                        var nombreNuevo = nombre + '_' + contadorAdjunto + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datosV.FILE_ADJUNTO_VETERINARIO = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.FILE_ADJUNTO_VETERINARIO = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover7 = "mostrar";
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_ADJUNTO_VETERINARIO = "";
                        $scope.FILE_ADJUNTO_VETERINARIO = "";
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }
            }

            if (nombre == 'FILE_ADJUNTO_EXPERIENCIA' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                    if (objarchivo.size <= 15000000) {
                        var nombreNuevo = nombre + '_' + contadorAdjunto + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.datosV.FILE_ADJUNTO_EXPERIENCIA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.FILE_ADJUNTO_EXPERIENCIA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover7 = "mostrar";
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_ADJUNTO_EXPERIENCIA = "";
                        $scope.FILE_ADJUNTO_EXPERIENCIA = "";
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }
            }
            if (nombre == 'FILE_CI_ANVERSO_ANIMALISTA' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                    if (objarchivo.size <= 15000000) {
                        var nombreNuevo = nombre + '_' + contadorAdjunto + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.mod.FILE_CI_ANVERSO_ANIMALISTA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.FILE_CI_ANVERSO_ANIMALISTA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover7 = "mostrar";
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_CI_ANVERSO_ANIMALISTA = "";
                        $scope.FILE_CI_ANVERSO_ANIMALISTA = "";
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }
            }
            if (nombre == 'FILE_CI_REVERSO_ANIMALISTA' && (typeof (obj.files[0]) != 'undefined')) {
                var nomdocumento = obj.files[0].name;
                var docextension = nomdocumento.split('.');
                var ext_doc = docextension[docextension.length - 1].toLowerCase();
                if (ext_doc == "pdf" || ext_doc == "png" || ext_doc == "jpg" || ext_doc == "jpeg") {
                    if (objarchivo.size <= 15000000) {
                        var nombreNuevo = nombre + '_' + contadorAdjunto + '_' + fechaNueva + '.' + ext_doc;
                        fileUpload1.uploadFileToUrl1(objarchivo, uploadUrl, nombreNuevo);
                        $scope.mod.FILE_CI_REVERSO_ANIMALISTA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.FILE_CI_REVERSO_ANIMALISTA = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        document.getElementById("txt_" + nombre).value = nombreNuevo;
                        document.getElementById("href_" + nombre).href = uploadUrl + "/" + nombreNuevo + "?app_name=todoangular";
                        $scope.btover7 = "mostrar";
                    } else {
                        swal('Advertencia', 'El tamaño de la imagen es muy grande', 'error');
                        document.getElementById("txt_" + nombre).value = "";
                        document.getElementById("href_" + nombre).href = "";
                        $scope.registroAdj.adjunto = '';
                        $scope.adjunto = '';
                        valor = '';
                        $scope.datos.FILE_CI_REVERSO_ANIMALISTA = "";
                        $scope.FILE_CI_REVERSO_ANIMALISTA = "";
                        $.unblockUI();
                    }
                } else {
                    swal('Advertencia', 'El archivo no es valido, seleccione un archivo de tipo pdf', 'error');
                    document.getElementById("txt_" + nombre).value = "";
                    document.getElementById("href_" + nombre).href = "";
                    $scope.registroAdj.adjunto = '';
                    $scope.adjunto = '';
                    valor = '';
                    $.unblockUI();
                }
            }
        }, 1000);
        $.unblockUI();
    }

    $scope.cambioCombo = function (data) {
        if (data == 'Rescatista' || $scope.xdato_registro == "AGRUPADOS") {
            $scope.div_rescatistas = true;
            $scope.div_otros = false
        } else if (data == 'Otro') {
            $scope.div_rescatistas = false;
            $scope.div_otros = true
        } else {
            $scope.div_rescatistas = false;
            $scope.div_otros = false
        }
    }
    $scope.cambioComboPersoneria = function (data) {
        if (data == 'SI') {
            $scope.div_esp_num_pj = true;
            $scope.titulo_observacion_pj = "Número de personería Jurídica:"
        } else {
            $scope.div_esp_num_pj = true;
            $scope.titulo_observacion_pj = "En que instancia se encuentra el tramite:"
        }
    }
    $scope.recuperarTramites = function () {
        $scope.trmTramites = [];
        $scope.tblTramites.reload();
        $.blockUI({
            css: {
                border: 'none',
                padding: '10px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }, message: "cargando"
        });
        var datosMascota = new reglasnegocioM();
        datosMascota.identificador = 'CASA_MASCOTA-2';
        var x_parametro = '{"xcarnet":"' + $scope.datos_responsable.ci + '"}';
        datosMascota.parametros = x_parametro;
        datosMascota.llamarregla(function (results) {
            var x = JSON.parse(results);
            $.unblockUI();
            for (let i = 0; i < x.length; i++) {
                var estado_obt = x[i].xestado;
                var dias_cadu = x[i].xdias_caduco;
                var color_certificado = "danger";
                var disa_certificado = "true";
                var color_registro = "danger";
                var disa_registro = "true"
                if (estado_obt == 'activo') {
                    estado_obt = 'ENVIADO';
                } else if (estado_obt == 'habilitado' && dias_cadu > validarDiasACaducar) {
                    color_certificado = "primary";
                    disa_certificado = "false";
                    color_registro = "primary";
                    disa_registro = "false"
                } else if (estado_obt == 'habilitado' && dias_cadu <= validarDiasACaducar) {
                    estado_obt = 'CADUCADO'
                    color_certificado = "primary";
                    disa_certificado = "false";
                    color_registro = "danger";
                    disa_registro = "true"
                }
                let var_aux1 = {
                    xdato_registro: x[i].xdato_registro,
                    xdato_tramiteigob: x[i].xdato_tramiteigob,
                    xdatos_asociados: x[i].xdatos_asociados,
                    xdatos_experiencia: x[i].xdatos_experiencia,
                    xdatos_veterinario: x[i].xdatos_veterinario,
                    xdatos_personales: x[i].xdatos_personales,
                    xdatos_voluntario: x[i].xdatos_voluntario,
                    xobservacion: x[i].xobservacion,
                    xdias_caduco: x[i].xdias_caduco,
                    xestado: x[i].xestado,
                    xvoluntario_idm: x[i].xvoluntario_idm,
                    xvoluntario_modificado: x[i].xvoluntario_modificado,
                    xvoluntario_url: x[i].xvoluntario_url,
                    yestado: estado_obt.toUpperCase(),
                    ycolor_certificado: color_certificado,
                    ydisa_certificado: disa_certificado,
                    ycolor_registro: color_registro,
                    ydisa_registro: disa_registro
                }
                $scope.trmTramites.push(var_aux1);
                $scope.tblTramites.reload();

            }
        });
    }

    $scope.listadoAsociados = function (datax) {
        $scope.listaAsociados = JSON.parse(datax.xdatos_asociados);
        $scope.tblListaAsociados.reload();
        $("#myModalAsociados").modal("show");
        $scope.$apply();
    }

    $scope.recuperarInformacion = function (datax) {
        $scope.y_tramite = "";
        $scope.div_formulario = true;
        var x = datax;
        $scope.codigoTramite = x.xvoluntario_idm;
        var x_estado = x.xestado;
        var x_datos_voluntario = x.xdatos_voluntario;
        var x_datos_experiencia = x.xdatos_experiencia;
        var x_datos_veterinario = x.xdatos_veterinario;
        var x_datos_asociados = x.xdatos_asociados;
        var ytipo_registro = x.xdato_registro;
        $scope.y_tramite = x.xdato_tramiteigob;
        $scope.trmAsociados = [];
        $scope.tblAsociados.reload();
        $scope.trmVeterinario = [];
        $scope.tblVeterinario.reload();
        $scope.trmExperiencia = [];
        $scope.tblExperiencia.reload();
        if (x_estado == 'activo') {
            validador_envio = 0;
            $scope.mensaje("Estimado Ciudadano", "Usted ya realizo su registro se esta procesando para la aprobación de su solicitud a continuacion podra observar la informacion enviada.", "warning");
            $scope.f_dinamico_Registro(ytipo_registro);
            $scope.xdeshabilitado = true;
            $scope.div_boton_guardar = false;
            $scope.div_agregar_experiencia = false;
            $scope.div_aprobado = false;
            $scope.titulo_boton = "";
            $scope.datos = JSON.parse(x_datos_voluntario);
            $scope.trmExperiencia = JSON.parse(x_datos_experiencia);
            $scope.trmVeterinario = JSON.parse(x_datos_veterinario);
            $scope.trmAsociados = JSON.parse(x_datos_asociados);
            var envio_tipo = $scope.datos.tipo_voluntario;
            $scope.cambioCombo(envio_tipo);
            var lat_recuperado = $scope.datos.latitud_vol_dom;
            var lon_recuperado = $scope.datos.longitud_vol_dom;
            $scope.open_mapa_animalistas(lat_recuperado, lon_recuperado);
            var per_so_ju = $scope.datos.cuenta_personairia_juridica;
            $scope.cambioComboPersoneria(per_so_ju);
            var y_caniles_observacion = $scope.datos.caniles_observacion;
            var y_area_cuarentena = $scope.datos.area_cuarentena;
            var y_area_maternidad = $scope.datos.area_maternidad;
            var y_area_comunes = $scope.datos.area_comunes;
            $scope.cambioObservacion(y_caniles_observacion);
            $scope.cambioCuarentena(y_area_cuarentena);
            $scope.cambioMaternidad(y_area_maternidad);
            $scope.cambioAComunes(y_area_comunes);
            $scope.tblAsociados.reload();
            $scope.tblVeterinario.reload();
            $scope.tblExperiencia.reload();
        } else if (x_estado == 'no existe') {
            $scope.titulo_boton = "ENVIAR";
            validador_envio = 1;
            $scope.xdeshabilitado = false;
            $scope.div_boton_guardar = true;
            $scope.div_agregar_experiencia = true;
            $scope.div_aprobado = false;
            $scope.mensaje("Estimado Ciudadano", "Para poder proseguir con el registro de Animalista tiene que tener en cuenta que debe contar con la Vacuna Antirrabica y aguardar la aprobación de su registro", "warning");
        } else if (x_estado == 'habilitado') {
            validador_envio = 0;
            $scope.f_dinamico_Registro(ytipo_registro);
            $scope.titulo_boton = "";
            $scope.mensaje("Estimado Ciudadano", "Su registro ya fue validado por la Casa de la Mascota", "success");
            $scope.xdeshabilitado = true;
            $scope.div_boton_guardar = false;
            $scope.div_agregar_experiencia = false;
            $scope.div_aprobado = true;
            $scope.datos = JSON.parse(x_datos_voluntario);
            $scope.trmExperiencia = JSON.parse(x_datos_experiencia);
            $scope.trmVeterinario = JSON.parse(x_datos_veterinario);
            $scope.trmAsociados = JSON.parse(x_datos_asociados);
            var envio_tipo = $scope.datos.tipo_voluntario;
            $scope.cambioCombo(envio_tipo);
            var lat_recuperado = $scope.datos.latitud_vol_dom;
            var lon_recuperado = $scope.datos.longitud_vol_dom;
            $scope.open_mapa_animalistas(lat_recuperado, lon_recuperado);
            var per_so_ju = $scope.datos.cuenta_personairia_juridica;
            $scope.cambioComboPersoneria(per_so_ju);
            var y_caniles_observacion = $scope.datos.caniles_observacion;
            var y_area_cuarentena = $scope.datos.area_cuarentena;
            var y_area_maternidad = $scope.datos.area_maternidad;
            var y_area_comunes = $scope.datos.area_comunes;
            $scope.cambioObservacion(y_caniles_observacion);
            $scope.cambioCuarentena(y_area_cuarentena);
            $scope.cambioMaternidad(y_area_maternidad);
            $scope.cambioAComunes(y_area_comunes);
            $scope.tblAsociados.reload();
            $scope.tblVeterinario.reload();
            $scope.tblExperiencia.reload();
        } else if (x_estado == 'rechazado') {
            $scope.f_dinamico_Registro(ytipo_registro);
            validador_envio = 2;
            id_tramite = x.xvoluntario_idm;
            var x_observacion = x.xobservacion;
            $scope.mensaje("Estimado Ciudadano", "Su registro fue rechazado con la siguiente observacion : " + x_observacion, "warning");
            $scope.div_agregar_experiencia = true;
            $scope.div_aprobado = false;
            $scope.titulo_boton = "ACTUALIZAR";
            $scope.xdeshabilitado = false;
            $scope.div_boton_guardar = true;
            $scope.datos = JSON.parse(x_datos_voluntario);
            $scope.trmExperiencia = JSON.parse(x_datos_experiencia);
            $scope.trmVeterinario = JSON.parse(x_datos_veterinario);
            $scope.trmAsociados = JSON.parse(x_datos_asociados);
            var envio_tipo = $scope.datos.tipo_voluntario;
            $scope.cambioCombo(envio_tipo);
            var lat_recuperado = $scope.datos.latitud_vol_dom;
            var lon_recuperado = $scope.datos.longitud_vol_dom;
            $scope.open_mapa_animalistas(lat_recuperado, lon_recuperado);
            var per_so_ju = $scope.datos.cuenta_personairia_juridica;
            $scope.cambioComboPersoneria(per_so_ju);
            var y_caniles_observacion = $scope.datos.caniles_observacion;
            var y_area_cuarentena = $scope.datos.area_cuarentena;
            var y_area_maternidad = $scope.datos.area_maternidad;
            var y_area_comunes = $scope.datos.area_comunes;
            $scope.cambioObservacion(y_caniles_observacion);
            $scope.cambioCuarentena(y_area_cuarentena);
            $scope.cambioMaternidad(y_area_maternidad);
            $scope.cambioAComunes(y_area_comunes);
            $scope.tblAsociados.reload();
            $scope.tblVeterinario.reload();
            $scope.tblExperiencia.reload();
        } else if (x_estado == 'guardado') {
            $scope.f_dinamico_Registro(ytipo_registro);
            validador_envio = 3;
            id_tramite = x.xvoluntario_idm;
            var x_observacion = x.xobservacion;
            $scope.mensaje("Estimado Ciudadano", "Esta accediendo a una información que guardo", "warning");
            $scope.div_agregar_experiencia = true;
            $scope.div_aprobado = false;
            $scope.titulo_boton = "ENVIAR";
            $scope.xdeshabilitado = false;
            $scope.div_boton_guardar = true;
            $scope.datos = JSON.parse(x_datos_voluntario);
            $scope.trmExperiencia = JSON.parse(x_datos_experiencia);
            if(x_datos_veterinario==null || x_datos_veterinario==undefined ||x_datos_veterinario=='undefined'){
                $scope.trmVeterinario = [];
            }
            else{
                $scope.trmVeterinario = JSON.parse(x_datos_veterinario);
                console.log("ssssssssssss",$scope.trmVeterinario);
            }
            if(x_datos_asociados==null || x_datos_asociados==undefined ||x_datos_asociados=='undefined' || x_datos_asociados=='{}'){
                $scope.trmAsociados = [];
            }
            else{
                $scope.trmAsociados = JSON.parse(x_datos_asociados);
            }
            
            var envio_tipo = $scope.datos.tipo_voluntario;
            $scope.cambioCombo(envio_tipo);
            var lat_recuperado = $scope.datos.latitud_vol_dom;
            var lon_recuperado = $scope.datos.longitud_vol_dom;
            $scope.open_mapa_animalistas(lat_recuperado, lon_recuperado);
            var per_so_ju = $scope.datos.cuenta_personairia_juridica;
            $scope.cambioComboPersoneria(per_so_ju);
            var y_caniles_observacion = $scope.datos.caniles_observacion;
            var y_area_cuarentena = $scope.datos.area_cuarentena;
            var y_area_maternidad = $scope.datos.area_maternidad;
            var y_area_comunes = $scope.datos.area_comunes;
            $scope.cambioObservacion(y_caniles_observacion);
            $scope.cambioCuarentena(y_area_cuarentena);
            $scope.cambioMaternidad(y_area_maternidad);
            $scope.cambioAComunes(y_area_comunes);
            $scope.tblVeterinario.reload();
            $scope.tblAsociados.reload();
            $scope.tblExperiencia.reload();
        }
    }
    $scope.mensaje = function (x_title, x_texto, x_type) {
        swal({
            title: x_title,
            text: x_texto,
            type: x_type,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Aceptar',
            closeOnConfirm: false
        }, function () {
            swal.close();
        });
    }
    $scope.inicioServicios = function () {
        $scope.buscarRep();
        $scope.datos.total_capacidad = 0;
        $scope.datos.total_moviles = 0;
        //$scope.open_mapa_mascotas();
        /////////////////////////////
        
        /////////////////////////////
    }
    var iconStylep = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 40],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: '../../../libs/img/point_icon.png',
            crossOrigin: 'anonymous'
        })
    });
    $scope.open_mapa_animalistas = function (lat, lon) {
        
        $scope.map_mas = null;

        var osm_a = new ol.layer.Tile({
            title: 'Open Street Map',
            visible: true,
            source: new ol.source.OSM()
        });

        var vectorLayerZonas_a = new ol.layer.Vector();

        var vectorSource_a = new ol.source.Vector();
        var vectorLayer_a = new ol.layer.Vector({source: vectorSource_a});

        var view_a = new ol.View({
            center: ol.proj.fromLonLat([ -68.122455, -16.498960]), 
            zoom: 16
        });

        var iconStyle_a = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: 'red'
                })
            })
        });

        var epsg32719 = 'EPSG:32719';
        var epsg4326 = 'EPSG:4326';
        proj4.defs(epsg32719, '+proj=utm +zone=19 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
        proj4.defs(epsg4326,'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');


        setTimeout(function () {
            var latitud = lat;
            var longitud = lon;
            console.log("in pet map");
            $("#mapa_mascotas_animalistas").empty();

            $scope.map_mas = new ol.Map
                ({
                    target: 'mapa_mascotas_animalistas',
                    layers: [
                        new ol.layer.Group({
                            title: 'Mapas Base',
                            layers: [
                                osm_a
                            ]
                        }),
                        new ol.layer.Group({
                            title: 'Capas',
                            layers: [
                                vectorLayerZonas_a,
                                vectorLayer_a
                            ]
                        })
                    ],
                    view: new ol.View({
                        zoom: 16,
                        center: ol.proj.fromLonLat([-68.133555, -16.495687])
                    })
                });

            var layerSwitcher_a = new ol.control.LayerSwitcher({ tipLabel: 'Leyenda' });
            $scope.map_mas.addControl(layerSwitcher_a);
            vectorLayer_a.getSource().clear();
            ////////////////////////////////////////////////////////////////////////
            if (latitud != undefined) {
                var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitud, latitud])));
                feature.setStyle(iconStyle_a);
                vectorSource_a.addFeature(feature);
                $scope.map_mas.getView().setCenter(ol.proj.fromLonLat([longitud, latitud]));
                $scope.map_mas.getView().setZoom(15);
            }
            //////////////////////////////////////////////////////////////////////////
            $scope.map_mas.on('singleclick', function(evento) {
                $scope.datos.latitud_vol_dom = "";
                $scope.datos.longitud_vol_dom = "";
                vectorSource_a.clear();
                var coordinate = evento.coordinate;
                var centro_1_a = ol.proj.transform(coordinate, 'EPSG:3857', epsg4326);
                var latitud_a = centro_1_a[1];
                var longitud_a = centro_1_a[0];
                $scope.datos.latitud_vol_dom = latitud_a;
                $scope.datos.longitud_vol_dom = longitud_a;
                var feature_a = new ol.Feature(
                    new ol.geom.Point(ol.proj.fromLonLat(centro_1_a))
                );
                feature_a.setStyle(iconStyle_a);
                vectorSource_a.addFeature(feature_a);
            });  
        }, 200);
    };

}